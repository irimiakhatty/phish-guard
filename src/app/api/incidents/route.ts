import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma as db } from "~/server/db/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { url, textScore, urlScore, source } = body;

        // Validate required fields (basic validation)
        if (typeof textScore !== 'number' || typeof urlScore !== 'number') {
            return NextResponse.json({ message: "Invalid input: scores must be numbers" }, { status: 400 });
        }

        const isPhishing = textScore > 0.5 || urlScore > 0.5;
        const confidence = Math.max(textScore, urlScore);
        const riskLevel = isPhishing ? "high" : "safe";

        // Save to Database
        const scan = await db.scan.create({
            data: {
                userId: userId,
                contentType: url ? "url" : "text",
                content: url || "Text Content",
                riskLevel: riskLevel,
                isPhishing: isPhishing,
                confidence: confidence,
                url: url,
                source: "extension"
            }
        });

        return NextResponse.json({ success: true, scanId: scan.id });

    } catch (error) {
        console.error("Incident log error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
