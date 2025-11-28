import { NextResponse } from "next/server";
import { prisma as db } from "~/server/db/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url, textScore, urlScore, source } = body;

        // In a real app, we would validate the Auth Token from headers
        // const token = req.headers.get("authorization");
        // const userId = verifyToken(token);

        // For now, we'll use a dummy ID or one passed in body if we updated extension to send it
        const userId = "user_mock_extension";

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
                // Optional: Map other fields
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
