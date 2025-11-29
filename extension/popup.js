// --- POPUP LOGIC ---

// DOM Elements
const loginSection = document.getElementById('login-section');
const scanSection = document.getElementById('scan-section');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginError = document.getElementById('loginError');
const subscriptionInfo = document.getElementById('subscriptionInfo');
const dashboardBtn = document.getElementById('dashboardBtn');
const scanBtn = document.getElementById('scanBtn');

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
  if (loginSection) loginSection.classList.remove('hidden');
  if (scanSection) scanSection.classList.add('hidden');
}

function showScanUI(plan, scans) {
  if (loginSection) loginSection.classList.add('hidden');
  if (scanSection) scanSection.classList.remove('hidden');

  // Update Info Box
  if (subscriptionInfo) {
    if (plan === 'free') {
      subscriptionInfo.innerText = `Plan: Free Trial | Scans Remaining: ${scans !== undefined ? scans : 10}`;
    } else if (plan === 'paid') {
      subscriptionInfo.innerText = `Plan: Premium | Unlimited Scans`;
    } else {
      subscriptionInfo.innerText = `Plan: Unknown`;
    }
  }
}

async function login() {
  // Open the Web App Auth Page with Extension ID
  chrome.storage.sync.get({ apiUrl: 'https://phish-guard-rho.vercel.app' }, (items) => {
    const extId = chrome.runtime.id;
    chrome.tabs.create({ url: `${items.apiUrl}/ext-auth?ext_id=${extId}` });
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
    if (resultDiv) resultDiv.innerHTML = "<span class='warning'>Please enter text or a URL.</span>";
    return;
  }

  if (loader) loader.style.display = "block";
  if (resultDiv) resultDiv.innerHTML = "";

  // Send message to background script for analysis
  chrome.runtime.sendMessage({
    action: "scan_page",
    text: textInput,
    url: urlInput
  }, (response) => {
    if (loader) loader.style.display = "none";

    if (chrome.runtime.lastError) {
      if (resultDiv) resultDiv.innerText = "Error connecting to background service.";
      console.error(chrome.runtime.lastError);
      return;
    }

    // Handle Subscription Errors
    if (response.error === "LIMIT_REACHED") {
      if (resultDiv) {
        resultDiv.innerHTML = `
          <div class="limit-reached">
            <div class="limit-title">Limit Reached</div>
            <div class="limit-desc">You have used all your free scans.</div>
            <button class="btn btn-primary" style="background-color: #16a34a;">Upgrade to Premium</button>
          </div>
        `;
      }
      // Update UI count to 0 just in case
      if (subscriptionInfo) subscriptionInfo.innerText = `Plan: Free Trial | Scans Remaining: 0`;
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
        if (items.userPlan === 'free' && subscriptionInfo) {
          subscriptionInfo.innerText = `Plan: Free Trial | Scans Remaining: ${response.scansRemaining}`;
        }
      });
    }

    const { textScore, urlScore } = response;
    console.log(`Text Score: ${textScore}, URL Score: ${urlScore}`);

    if (resultDiv) {
      if (textScore > 0.5 || urlScore > 0.5) {
        resultDiv.innerHTML = "<span class='phish'>PHISHING DETECTED!</span>";
        if (textScore > 0.5) resultDiv.innerHTML += "<br><small>Suspicious Text Content</small>";
        if (urlScore > 0.5) resultDiv.innerHTML += "<br><small>Malicious URL Link</small>";
      } else {
        resultDiv.innerHTML = "<span class='safe'>LOOKS SAFE</span>";
      }
    }
  });
}

// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
  // Attach listeners
  if (loginBtn) loginBtn.addEventListener('click', login);
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
  if (scanBtn) scanBtn.addEventListener('click', scan);

  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
      chrome.storage.sync.get({ apiUrl: 'https://phish-guard-rho.vercel.app' }, (items) => {
        chrome.tabs.create({ url: `${items.apiUrl}/dashboard` });
      });
    });
  }

  // Initial Auth Check
  checkAuth();

  // Auto-fill URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      const urlInput = document.getElementById('urlText');
      if (urlInput) urlInput.value = tabs[0].url;
    }
  });
});