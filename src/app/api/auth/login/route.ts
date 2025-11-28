import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // --- MOCK AUTHENTICATION ---
        // In a real app, verify against Clerk or DB hash.
        // Here, we simulate based on email domain.

        const isPremium = email.includes("premium");
        const plan = isPremium ? "paid" : "free";

        // Mock User ID
        const userId = "user_" + Math.random().toString(36).substring(7);

        return NextResponse.json({
            token: userId, // Using userId as token for simplicity
            user: {
                id: userId,
                email: email,
                plan: plan,
                scansRemaining: isPremium ? 9999 : 10 // Mock quota
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
