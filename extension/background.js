// importScripts('tf.min.js'); // Moved inside loadResources to prevent startup blocking

// --- CONFIGURATION ---
const TEXT_MAX_LEN = 150;
const URL_MAX_LEN = 150;
const TEXT_OOV = "<OOV>";
const URL_OOV = "<OOV>";

let textModel, urlModel;
let textVocab, urlVocab;
let isModelsLoaded = false;

// --- 1. LOAD RESOURCES (ON DEMAND) ---
async function loadResources() {
    if (isModelsLoaded) return;

    console.log("Background: Loading models...");
    try {
        // Dynamically import TFJS only when needed
        if (typeof tf === 'undefined') {
            try {
                console.log("Background: Importing tf.min.js...");
                importScripts('tf.min.js');
                console.log("Background: tf.min.js imported.");

                // Force CPU backend for Service Worker environment
                await tf.setBackend('cpu');
                console.log("Background: Backend set to CPU.");
            } catch (err) {
                console.error("Failed to import/init tf.min.js", err);
                return;
            }
        }

        // Load Models
        console.log("Background: Loading model files...");
        textModel = await tf.loadLayersModel('assets/text_model/model.json');
        urlModel = await tf.loadLayersModel('assets/url_model/model.json');

        // Load Dictionaries
        const textVocabReq = await fetch('assets/word_index.json');
        textVocab = await textVocabReq.json();

        const urlVocabReq = await fetch('assets/url_char_index.json');
        urlVocab = await urlVocabReq.json();

        isModelsLoaded = true;
        console.log("Background: All resources loaded!");
    } catch (e) {
        console.error("Background: Error loading resources:", e);
    }
}

// --- 2. PRE-PROCESSING FUNCTIONS ---
function preprocessText(text) {
    try {
        const words = text.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);
        const sequence = words.map(w => (textVocab && textVocab[w]) || (textVocab && textVocab[TEXT_OOV]) || 1);

        const padded = new Array(TEXT_MAX_LEN).fill(0);
        for (let i = 0; i < Math.min(sequence.length, TEXT_MAX_LEN); i++) {
            padded[i] = sequence[i];
        }
        return tf.tensor2d([padded]);
    } catch (e) {
        console.error("Preprocess Text Error:", e);
        return null;
    }
}

function preprocessURL(url) {
    try {
        const chars = url.split('');
        const sequence = chars.map(c => (urlVocab && urlVocab[c]) || (urlVocab && urlVocab[URL_OOV]) || 1);

        const padded = new Array(URL_MAX_LEN).fill(0);
        for (let i = 0; i < Math.min(sequence.length, URL_MAX_LEN); i++) {
            padded[i] = sequence[i];
        }
        return tf.tensor2d([padded]);
    } catch (e) {
        console.error("Preprocess URL Error:", e);
        return null;
    }
}

// --- 3. PREDICTION LOGIC ---
async function predict(text, url) {
    // Load resources ONLY when prediction is requested
    if (!isModelsLoaded) {
        await loadResources();
    }

    if (!isModelsLoaded) {
        console.warn("Models not loaded, skipping prediction.");
        return { textScore: 0, urlScore: 0 };
    }

    let textScore = 0;
    let urlScore = 0;

    try {
        if (text) {
            const textTensor = preprocessText(text);
            if (textTensor) {
                const pred = textModel.predict(textTensor);
                textScore = (await pred.data())[0];
                textTensor.dispose();
            }
        }

        if (url) {
            const urlTensor = preprocessURL(url);
            if (urlTensor) {
                const pred = urlModel.predict(urlTensor);
                urlScore = (await pred.data())[0];
                urlTensor.dispose();
            }
        }
    } catch (e) {
        console.error("Prediction Error:", e);
    }

    return { textScore, urlScore };
}

// --- 4. MESSAGE HANDLING ---
async function logIncident(data) {
    try {
        // Retrieve API URL from storage (default to production)
        const { apiUrl } = await chrome.storage.sync.get({ apiUrl: 'https://phish-guard-rho.vercel.app' });

        const response = await fetch(`${apiUrl}/api/incidents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: data.url,
                textScore: data.textScore,
                urlScore: data.urlScore,
                timestamp: new Date().toISOString(),
                source: 'extension'
            })
        });
        // console.log("Incident logged:", await response.json());
    } catch (e) {
        console.error("Failed to log incident:", e);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scan_page") {

        // --- SUBSCRIPTION CHECK ---
        chrome.storage.sync.get(['authToken', 'userPlan', 'scansRemaining'], async (items) => {
            const { authToken, userPlan, scansRemaining } = items;

            // 1. Auth Check
            if (!authToken) {
                if (request.source === 'auto') {
                    sendResponse({ error: "SILENT_FAIL" });
                } else {
                    sendResponse({ error: "UNAUTHORIZED" });
                }
                return;
            }

            // 2. Quota Check
            if (userPlan === 'free') {
                if (scansRemaining <= 0) {
                    if (request.source === 'auto') {
                        sendResponse({ error: "SILENT_FAIL" });
                    } else {
                        sendResponse({ error: "LIMIT_REACHED" });
                    }
                    return;
                }

                // Decrement Quota
                const newRemaining = scansRemaining - 1;
                await chrome.storage.sync.set({ scansRemaining: newRemaining });

                // Proceed with scan...
                processScan(request, sender, sendResponse, newRemaining);
            } else {
                // Paid user - unlimited
                processScan(request, sender, sendResponse, undefined);
            }
        });

        return true; // Keep channel open for async response
    }
});

async function processScan(request, sender, sendResponse, remainingScans) {
    try {
        const result = await predict(request.text, request.url);

        // Update Badge
        const isPhish = result.textScore > 0.5 || result.urlScore > 0.5;

        if (isPhish) {
            chrome.action.setBadgeText({ text: "WARN", tabId: sender.tab.id });
            chrome.action.setBadgeBackgroundColor({ color: "#FF0000", tabId: sender.tab.id });

            logIncident({
                url: request.url,
                textScore: result.textScore,
                urlScore: result.urlScore
            });

            // NOTIFICATION LOGIC
            // If proactive (auto) scan, show a system notification
            if (request.source === 'auto') {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'assets/logo.png', // Use logo.png as icon
                    title: 'PhishGuard Alert',
                    message: `Suspicious email detected!\nConfidence: ${Math.max(result.textScore, result.urlScore).toFixed(2) * 100}%`,
                    priority: 2,
                    buttons: [{ title: "View Details" }]
                });
            } else {
                // Manual scan (popup open) - maybe just the badge is enough, or a notification too?
                // Let's keep notification for manual too, it's good feedback.
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'assets/logo.png',
                    title: 'PhishGuard Alert',
                    message: `Phishing Detected!\nScore: ${Math.max(result.textScore, result.urlScore).toFixed(2)}`,
                    priority: 2
                });
            }
        } else {
            chrome.action.setBadgeText({ text: "SAFE", tabId: sender.tab.id });
            chrome.action.setBadgeBackgroundColor({ color: "#00FF00", tabId: sender.tab.id });
        }

        sendResponse({
            ...result,
            scansRemaining: remainingScans
        });
    } catch (e) {
        console.error("Scan processing error:", e);
        sendResponse({ error: "SCAN_FAILED" });
    }
}

// --- 5. EXTERNAL MESSAGING (AUTH HANDOFF) ---
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.action === "AUTH_HANDOFF") {
        console.log("Background: Received Auth Token");
        const { token, user } = request;

        chrome.storage.sync.set({
            authToken: token,
            userPlan: user.plan || 'free',
            scansRemaining: 10
        }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});

// NOTE: loadResources() is NOT called here. It is called inside predict().
