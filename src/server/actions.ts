"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma as db } from "~/server/db/prisma";

export async function getDashboardStats() {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

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
}
