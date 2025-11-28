// --- CONFIGURATION ---
let lastUrl = location.href;
let scanTimeout = null;

// --- 1. TEXT EXTRACTION ---
function getEmailContent() {
    // Heuristic: Try to find the main email body container
    // Gmail: .a3s.aiL (often used for message body)
    // Outlook: .ReadingPane (generic)

    let bodyText = "";

    // Try Gmail specific selectors
    const gmailBody = document.querySelector('.a3s.aiL');
    if (gmailBody) {
        bodyText = gmailBody.innerText;
    } else {
        // Fallback: Get all visible text, but limit length
        bodyText = document.body.innerText;
    }

    return bodyText.substring(0, 2000); // Limit to 2000 chars
}

// --- 2. SCANNING LOGIC ---
function triggerScan() {
    const text = getEmailContent();
    const url = location.href;

    // Don't scan if text is too short (likely loading or empty)
    if (text.length < 50) return;

    console.log("PhishGuard: Auto-scanning page...");

    chrome.runtime.sendMessage({
        action: "scan_page", // Re-use existing action, or use "auto_scan" if we want distinct logic
        source: "auto",
        text: text,
        url: url
    }, (response) => {
        if (chrome.runtime.lastError) return;
        console.log("PhishGuard Auto-Scan Result:", response);
    });
}

// Debounce scan to avoid multiple calls during render
function scheduleScan() {
    if (scanTimeout) clearTimeout(scanTimeout);
    scanTimeout = setTimeout(triggerScan, 1500); // Wait 1.5s after changes stop
}

// --- 3. OBSERVERS ---

// A. URL Change Observer (for SPA navigation)
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        console.log("PhishGuard: URL Changed detected.");
        scheduleScan();
    }
}).observe(document, { subtree: true, childList: true });

// B. DOM Mutation Observer (for email content loading)
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        // Check if nodes were added (email body loading)
        if (mutation.addedNodes.length > 0) {
            scheduleScan();
            break;
        }
    }
});

// Start observing the body for content changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial Scan
scheduleScan();
