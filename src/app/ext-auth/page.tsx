"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// REPLACE WITH YOUR ACTUAL EXTENSION ID FROM CHROME://EXTENSIONS
const EXTENSION_ID = "YOUR_EXTENSION_ID_HERE";

export default function ExtensionAuthPage() {
    const { isLoaded, userId, getToken } = useAuth();
    const { user } = useUser();
    const [status, setStatus] = useState("Authenticating...");

    useEffect(() => {
        async function sendToken() {
            if (!isLoaded || !userId) {
                setStatus("Please sign in to continue.");
                return;
            }

            try {
                const token = await getToken();

                // Send to Extension
                // @ts-ignore
                if (window.chrome && window.chrome.runtime) {
                    // @ts-ignore
                    window.chrome.runtime.sendMessage(EXTENSION_ID, {
                        action: "AUTH_HANDOFF",
                        token: token,
                        user: {
                            id: userId,
                            email: user?.primaryEmailAddress?.emailAddress,
                            plan: "free" // Fetch real plan from DB if needed
                        }
                    }, (response: any) => {
                        if (response && response.success) {
                            setStatus("Success! You can close this tab.");
                        } else {
                            setStatus("Extension not found or connection failed. Make sure the extension is installed.");
                        }
                    });
                } else {
                    setStatus("Chrome Extension API not found.");
                }

            } catch (e) {
                console.error(e);
                setStatus("Error generating token.");
            }
        }

        sendToken();
    }, [isLoaded, userId, getToken, user]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="rounded-lg border p-8 shadow-lg">
                <h1 className="mb-4 text-2xl font-bold">PhishGuard Extension Login</h1>
                <p className="text-lg">{status}</p>
            </div>
        </div>
    );
}
