"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma as db } from "~/server/db/prisma";

export async function getDashboardStats() {
    const { userId } = auth();

    // Return empty stats if no user (don't crash)
    if (!userId) {
        console.warn("getDashboardStats: No userId found");
        return {
            recentScans: [],
            stats: {
                totalScans: 0,
                threatsBlocked: 0,
                detectionRate: "0",
                timeSaved: "0"
            }
        };
    }

    try {
        // Fetch recent scans
        const recentScans = await db.scan.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 5,
        });

        // Calculate stats
        const totalScans = await db.scan.count({
            where: { userId },
        });

        const threatsBlocked = await db.scan.count({
            where: {
                userId,
                isPhishing: true
            },
        });

        // Calculate detection rate (mock logic if 0 scans)
        const detectionRate = totalScans > 0
            ? ((threatsBlocked / totalScans) * 100).toFixed(1)
            : "0";

        return {
            recentScans,
            stats: {
                totalScans,
                threatsBlocked,
                detectionRate,
                timeSaved: (threatsBlocked * 5 / 60).toFixed(1) // Mock calculation: 5 mins saved per threat
            }
        };
    } catch (error) {
        console.error("Dashboard Stats Error (returning default):", error);
        return {
            recentScans: [],
            stats: {
                totalScans: 0,
                threatsBlocked: 0,
                detectionRate: "0",
                timeSaved: "0"
            }
        };
    }
}

export async function scanContent(data: {
    url?: string;
    textScore: number;
    urlScore: number;
    riskLevel: string;
    isPhishing: boolean;
    confidence: number;
}) {
    const { userId } = auth();
    if (!userId) {
        console.warn("scanContent: Unauthorized");
        return { success: false, error: "Unauthorized" };
    }

    const scan = await db.scan.create({
        data: {
            userId,
            contentType: data.url ? "url" : "text",
            content: data.url || "Manual Text Scan",
            riskLevel: data.riskLevel,
            isPhishing: data.isPhishing,
            confidence: data.confidence,
            url: data.url,
            source: "manual_web"
        }
    });

    return { success: true, scanId: scan.id };
}
