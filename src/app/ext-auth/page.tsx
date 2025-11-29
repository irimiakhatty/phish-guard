"use client";

import { useAuth, useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ExtensionAuthPage() {
    const { isLoaded, userId, getToken } = useAuth();
    const { user } = useUser();
    const [status, setStatus] = useState("Authenticating...");
    const searchParams = useSearchParams();
    const extensionId = searchParams.get("ext_id");

    useEffect(() => {
        async function sendToken() {
            if (!isLoaded) return;

            if (!userId) {
                // RedirectToSignIn component will handle this
                return;
            }

            if (!extensionId) {
                setStatus("Error: Missing Extension ID. Please open this page from the extension.");
                return;
            }

            try {
                const token = await getToken();

                // Send to Extension
                // @ts-ignore
                if (window.chrome && window.chrome.runtime) {
                    // @ts-ignore
                    window.chrome.runtime.sendMessage(extensionId, {
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
    }, [isLoaded, userId, getToken, user, extensionId]);

    if (!isLoaded) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="rounded-lg border p-8 shadow-lg">
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (!userId) {
        const baseUrl = "https://phish-guard-rho.vercel.app";
        const redirectUrl = extensionId ? `${baseUrl}/ext-auth?ext_id=${extensionId}` : `${baseUrl}/ext-auth`;
        return <RedirectToSignIn redirectUrl={redirectUrl} />;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="rounded-lg border p-8 shadow-lg">
                <h1 className="mb-4 text-2xl font-bold">PhishGuard Extension Login</h1>
                <p className="text-lg">{status}</p>
                <p className="mt-4 text-xs text-gray-400">v1.3-debug</p>
            </div>
        </div>
    );
}
