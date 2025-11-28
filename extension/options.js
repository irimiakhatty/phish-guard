// Save options to chrome.storage
function save_options() {
    var autoScan = document.getElementById('autoScan').checked;
    var apiUrl = document.getElementById('apiUrl').value;

    // Remove trailing slash if present
    if (apiUrl.endsWith('/')) {
        apiUrl = apiUrl.slice(0, -1);
    }

    chrome.storage.sync.set({
        autoScan: autoScan,
        apiUrl: apiUrl
    }, function () {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        autoScan: true,
        apiUrl: 'http://localhost:3000'
    }, function (items) {
        document.getElementById('autoScan').checked = items.autoScan;
        document.getElementById('apiUrl').value = items.apiUrl;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
