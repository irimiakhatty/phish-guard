/**
 * PhishGuard Heuristics Engine
 * Rule-based analysis for detecting high-confidence phishing attempts.
 */

export interface HeuristicResult {
    score: number; // 0.0 to 1.0 (1.0 = Definite Phishing)
    reasons: string[];
    riskLevel: 'safe' | 'warning' | 'high' | 'critical';
}

const SUSPICIOUS_TLDS = ['.xyz', '.top', '.gq', '.tk', '.ml', '.cf', '.ga', '.cn', '.ru', '.work', '.click', '.loan'];
const BRAND_DOMAINS: Record<string, string[]> = {
    'paypal': ['paypal.com', 'paypal.me'],
    'google': ['google.com', 'google.co.uk', 'gmail.com', 'accounts.google.com'],
    'microsoft': ['microsoft.com', 'live.com', 'office.com', 'outlook.com', 'azure.com'],
    'apple': ['apple.com', 'icloud.com'],
    'facebook': ['facebook.com', 'fb.com', 'messenger.com'],
    'instagram': ['instagram.com'],
    'netflix': ['netflix.com'],
    'amazon': ['amazon.com', 'amazon.co.uk', 'amazon.de'],
    'dhl': ['dhl.com'],
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

    // --- URL ANALYSIS ---
    if (lowerUrl) {
        try {
            // Parse URL first to get the hostname reliably
            // If it fails to parse, it might be an invalid URL, but we try to construct it if missing protocol
            const urlToParse = lowerUrl.startsWith('http') ? lowerUrl : `http://${lowerUrl}`;
            const urlObj = new URL(urlToParse);
            const domain = urlObj.hostname;

            // 1. IP Address Detection
            // Matches explicit IP v4 addresses (e.g. 192.168.1.1)
            // We check the domain part specifically
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipRegex.test(domain)) {
                score += 1.0;
                reasons.push("Critical: URL uses an IP address instead of a domain name.");
            }

            // 2. Credential Embedding / Obfuscation
            if (lowerUrl.includes('@')) {
                score += 0.8;
                reasons.push("High Risk: URL contains '@' symbol, possibly hiding true destination.");
            }

            // 3. Homograph / Mixed Script Attacks
            // Check for non-ascii in domain
            if (/[^\u0000-\u007F]+/.test(domain)) {
                score += 0.2;
                reasons.push("Warning: Domain contains special/non-Latin characters.");
            }

            // 4. Suspicious TLDs
            const tldParts = domain.split('.');
            if (tldParts.length > 1) {
                const tld = tldParts.pop(); // safe because length > 1
                if (tld && SUSPICIOUS_TLDS.includes(`.${tld}`)) {
                    score += 0.3;
                    reasons.push(`Suspicious TLD detected: .${tld}`);
                }
            }

            // 5. Brand Impersonation (Domain Spoofing)
            Object.entries(BRAND_DOMAINS).forEach(([brand, officialDomains]) => {
                if (lowerUrl.includes(brand) || lowerText.includes(brand)) {
                    // It mentions the brand. Is it an official domain?
                    // Check if the current domain ENDS with any of the official domains
                    // e.g. domain = "paypal.com.evil.com" -> endsWith("paypal.com") is False.
                    // domain = "secure.paypal.com" -> endsWith("paypal.com") is True.
                    const isOfficial = officialDomains.some(od => domain === od || domain.endsWith(`.${od}`));

                    if (!isOfficial) {
                        // Only flag if it's not official BUT mentions the brand
                        score += 0.8;
                        reasons.push(`High Risk: URL impersonates ${brand.toUpperCase()} but is not an official domain.`);
                    }
                }
            });

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

    return { score, reasons, riskLevel };
}
