// --- POPUP LOGIC ---

// DOM Elements
const loginSection = document.getElementById('login-section');
const scanSection = document.getElementById('scan-section');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginError = document.getElementById('loginError');
const subscriptionInfo = document.getElementById('subscriptionInfo');

// --- AUTHENTICATION ---

async function checkAuth() {
  const { authToken, userPlan, scansRemaining } = await chrome.storage.sync.get(['authToken', 'userPlan', 'scansRemaining']);

  if (authToken) {
    showScanUI(userPlan, scansRemaining);
  } else {
    showLoginUI();
  }
}

function showLoginUI() {
  loginSection.classList.remove('hidden');
  scanSection.classList.add('hidden');
}

function showScanUI(plan, scans) {
  loginSection.classList.add('hidden');
  scanSection.classList.remove('hidden');

  // Update Info Box
  if (plan === 'free') {
    subscriptionInfo.innerText = `Plan: Free Trial | Scans Remaining: ${scans !== undefined ? scans : 10}`;
  } else if (plan === 'paid') {
    subscriptionInfo.innerText = `Plan: Premium | Unlimited Scans`;
  } else {
    subscriptionInfo.innerText = `Plan: Unknown`;
  }
}

async function login() {
  // Open the Web App Auth Page
  chrome.storage.sync.get({ apiUrl: 'https://phish-guard-rho.vercel.app' }, (items) => {
    chrome.tabs.create({ url: `${items.apiUrl}/ext-auth` });
  });
}

async function logout() {
  await chrome.storage.sync.remove(['authToken', 'userPlan', 'scansRemaining']);
  checkAuth();
}

// Listen for storage changes to auto-login in popup
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.authToken) {
    checkAuth();
  }
});

// --- SCANNING ---

async function scan() {
  const textInput = document.getElementById('emailText').value;
  const urlInput = document.getElementById('urlText').value;
  const resultDiv = document.getElementById('result');
  const loader = document.getElementById('loader');

  if (!textInput && !urlInput) {
    resultDiv.innerHTML = "<span style='color:orange'>Please enter text or a URL.</span>";
    return;
  }

  loader.style.display = "block";
  resultDiv.innerHTML = "";

  // Send message to background script for analysis
  chrome.runtime.sendMessage({
    action: "scan_page",
    text: textInput,
    url: urlInput
  }, (response) => {
    loader.style.display = "none";

    if (chrome.runtime.lastError) {
      resultDiv.innerText = "Error connecting to background service.";
      console.error(chrome.runtime.lastError);
      return;
    }

    // Handle Subscription Errors
    if (response.error === "LIMIT_REACHED") {
      resultDiv.innerHTML = `
        <div style="color: #e74c3c; font-weight: bold;">⚠️ Limit Reached</div>
        <div style="font-size: 13px; margin-top: 5px;">You have used all your free scans.</div>
        <button class="btn" style="background: #27ae60; margin-top: 10px;">Upgrade to Premium</button>
      `;
      // Update UI count to 0 just in case
      subscriptionInfo.innerText = `Plan: Free Trial | Scans Remaining: 0`;
      return;
    }

    // Handle Auth Errors
    if (response.error === "UNAUTHORIZED") {
      logout(); // Force logout
      return;
    }

    // Update UI with new remaining count if provided
    if (response.scansRemaining !== undefined) {
      chrome.storage.sync.get(['userPlan'], (items) => {
        if (items.userPlan === 'free') {
          subscriptionInfo.innerText = `Plan: Free Trial | Scans Remaining: ${response.scansRemaining}`;
        }
      });
    }

    const { textScore, urlScore } = response;
    console.log(`Text Score: ${textScore}, URL Score: ${urlScore}`);

    if (textScore > 0.5 || urlScore > 0.5) {
      resultDiv.innerHTML = "<span class='phish'>⚠️ PHISHING DETECTED!</span>";
      if (textScore > 0.5) resultDiv.innerHTML += "<br><small>Suspicious Text Content</small>";
      if (urlScore > 0.5) resultDiv.innerHTML += "<br><small>Malicious URL Link</small>";
    } else {
      resultDiv.innerHTML = "<span class='safe'>✅ LOOKS SAFE</span>";
    }
  });
}

// --- EVENT LISTENERS ---

loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);
document.getElementById('scanBtn').addEventListener('click', scan);

document.getElementById('dashboardBtn').addEventListener('click', () => {
  chrome.storage.sync.get({ apiUrl: 'https://phish-guard-rho.vercel.app' }, (items) => {
    chrome.tabs.create({ url: items.apiUrl });
  });
});

// Auto-fill URL
window.addEventListener('DOMContentLoaded', () => {
  checkAuth(); // Initial Auth Check

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      document.getElementById('urlText').value = tabs[0].url;
    }
  });
});