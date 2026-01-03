import React from 'react';
import { Button } from "~/components/ui/button";
import { Shield } from "lucide-react";

export default function PromoPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="bg-blue-600 p-3 rounded-2xl mb-8">
                    <Shield className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                    PhishGuard <span className="text-blue-600">Pro</span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
                    The ultimate protection for your digital life. Detect scams before they happen with our advanced AI engine.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="text-lg px-10 py-7 rounded-full bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105">
                        Get Started Now
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-10 py-7 rounded-full border-2 transition-all transform hover:scale-105">
                        Learn More
                    </Button>
                </div>
            </main>

            {/* Footer or extra info can go here */}
        </div>
    );
}