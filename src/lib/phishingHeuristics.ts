/**
 * PhishGuard Heuristics Engine
 * Rule-based analysis for detecting high-confidence phishing attempts.
 */

export interface HeuristicResult {
    score: number; // 0.0 to 1.0 (1.0 = Definite Phishing)
    reasons: string[];
    riskLevel: 'safe' | 'warning' | 'high' | 'critical';
    isSafeDomain?: boolean; // New flag to override AI
}

const SUSPICIOUS_TLDS = ['.xyz', '.top', '.gq', '.tk', '.ml', '.cf', '.ga', '.cn', '.ru', '.work', '.click', '.loan'];
const BRAND_DOMAINS: Record<string, string[]> = {
    'paypal': ['paypal.com', 'paypal.me', 'www.paypal.com'],
    'google': ['google.com', 'google.co.uk', 'gmail.com', 'accounts.google.com', 'www.google.com'],
    'microsoft': ['microsoft.com', 'live.com', 'office.com', 'outlook.com', 'azure.com', 'www.microsoft.com'],
    'apple': ['apple.com', 'icloud.com', 'www.apple.com'],
    'facebook': ['facebook.com', 'fb.com', 'messenger.com', 'www.facebook.com'],
    'instagram': ['instagram.com', 'www.instagram.com'],
    'netflix': ['netflix.com', 'www.netflix.com'],
    'amazon': ['amazon.com', 'amazon.co.uk', 'amazon.de', 'www.amazon.com'],
    'dhl': ['dhl.com', 'www.dhl.com'],
    'yahoo': ['yahoo.com', 'mail.yahoo.com'],
    'linkedin': ['linkedin.com', 'www.linkedin.com']
};

const URGENCY_KEYWORDS = [
    "immediately", "24 hours", "suspend", "lock", "unauthorized", "verify identity",
    "account limited", "action required", "urgent", "security alert", "compromised",
    "closing your account", "deactivation", "terminating"
];

export function analyzeHeuristics(text: string, url: string): HeuristicResult {
    let score = 0;
    const reasons: string[] = [];
    const lowerText = text.toLowerCase();
    const lowerUrl = url.toLowerCase().trim();
    let isSafeDomain = false;

    // --- URL ANALYSIS ---
    if (lowerUrl) {
        try {
            // Parse URL first to get the hostname reliably
            // If it fails to parse, it might be an invalid URL, but we try to construct it if missing protocol
            const urlToParse = lowerUrl.startsWith('http') ? lowerUrl : `http://${lowerUrl}`;
            const urlObj = new URL(urlToParse);
            const domain = urlObj.hostname;

            // 0. WHITESLIST CHECK (Safety Net)
            // Check if it matches any official domain exactly or is a subdomain
            for (const [_, officialDomains] of Object.entries(BRAND_DOMAINS)) {
                if (officialDomains.some(od => domain === od || domain.endsWith(`.${od}`))) {
                    isSafeDomain = true;
                    // If it's a known safe domain, we can skip other URL checks or force score low
                    // But we continue to check for hacking attempts (like XSS in text) just in case,
                    // mostly we want to prevent Brand Impersonation flags.
                }
            }

            if (isSafeDomain) {
                // If explicitly whitelisted, we don't flag for IP/TLD/etc potentially, 
                // OR we just ensure the score doesn't get high from brand detection.
                // For now, let's keep checks but use the flag to cap score later.
            } else {
                // 1. IP Address Detection
                const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
                if (ipRegex.test(domain)) {
                    score += 1.0;
                    reasons.push("Critical: URL uses an IP address instead of a domain name.");
                }

                // 4. Suspicious TLDs
                const tldParts = domain.split('.');
                if (tldParts.length > 1) {
                    const tld = tldParts.pop();
                    if (tld && SUSPICIOUS_TLDS.includes(`.${tld}`)) {
                        score += 0.3;
                        reasons.push(`Suspicious TLD detected: .${tld}`);
                    }
                }
            }

            // 2. Credential Embedding / Obfuscation
            if (lowerUrl.includes('@')) {
                score += 0.8;
                reasons.push("High Risk: URL contains '@' symbol, possibly hiding true destination.");
            }

            // 3. Homograph / Mixed Script Attacks
            if (/[^\u0000-\u007F]+/.test(domain)) {
                score += 0.2;
                reasons.push("Warning: Domain contains special/non-Latin characters.");
            }

            // 5. Brand Impersonation (Domain Spoofing)
            if (!isSafeDomain) {
                Object.entries(BRAND_DOMAINS).forEach(([brand, officialDomains]) => {
                    if (lowerUrl.includes(brand) || lowerText.includes(brand)) {
                        const isOfficial = officialDomains.some(od => domain === od || domain.endsWith(`.${od}`));
                        if (!isOfficial) {
                            score += 0.8;
                            reasons.push(`High Risk: URL impersonates ${brand.toUpperCase()} but is not an official domain.`);
                        }
                    }
                });
            }

        } catch (e) {
            // Invalid URL format
            score += 0.5;
            reasons.push("Warning: Invalid URL format.");
        }
    }

    // --- TEXT ANALYSIS ---
    if (lowerText) {
        // 1. Urgency & Panic
        let urgencyCount = 0;
        URGENCY_KEYWORDS.forEach(word => {
            if (lowerText.includes(word)) {
                urgencyCount++;
            }
        });

        if (urgencyCount > 0) {
            score += Math.min(urgencyCount * 0.15, 0.45);
            reasons.push(`Suspicious language: Detected ${urgencyCount} urgency/panic keywords.`);
        }

        // 2. Generic Greetings
        if (lowerText.includes("dear customer") || lowerText.includes("dear user") || lowerText.includes("dear member")) {
            score += 0.2;
            reasons.push("Warning: Generic greeting ('Dear Customer') is common in phishing.");
        }

        // 3. Provider Mismatch (Microsoft on Gmail, etc.)
        // Only run this if NOT a safe domain (prevents flagging real emails from these providers if we had headers, 
        // but here we just have text/url. Safest to run it.)
        if ((lowerText.includes("microsoft") || lowerText.includes("office 365")) &&
            (lowerText.includes("@gmail.com") || lowerText.includes("@yahoo.com"))) {
            score += 0.7;
            reasons.push("High Risk: Corporate security alert sent to a personal email address.");
        }
    }

    // --- HTML/Script Analysis (Basic) ---
    if (lowerText.includes("<script>") || lowerText.includes("javascript:")) {
        score += 0.9;
        reasons.push("Critical: Detected potential XSS script injection attempt.");
    }


    // Final Score Cap
    score = Math.min(score, 1.0);

    let riskLevel: HeuristicResult['riskLevel'] = 'safe';
    if (score > 0.8) riskLevel = 'critical';
    else if (score > 0.5) riskLevel = 'high';
    else if (score > 0.2) riskLevel = 'warning';

    return { score, reasons, riskLevel, isSafeDomain };
}
