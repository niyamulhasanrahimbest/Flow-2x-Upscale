// background.js - Chrome Extension Service Worker for Google Flow Auto-Upscaler

export const BACKGROUND_SCRIPT_CODE = `/**
 * Background service worker
 * Listens for toolbar icon clicks to open/toggle the floating HUD
 * Listens for download events
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Flow 2X Upscaler Background] Extension installed successfully.");
});

// When user clicks the 2X extension icon on Chrome's toolbar
chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.url && tab.url.includes("flow.google.com")) {
    chrome.tabs.sendMessage(tab.id, { action: "TOGGLE_HUD" }).catch(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      }).catch(() => {});
    });
  } else {
    chrome.tabs.create({ url: "https://flow.google.com" });
  }
});

// Forward download notifications
chrome.downloads.onCreated.addListener((downloadItem) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "DOWNLOAD_CREATED",
        id: downloadItem.id,
        filename: downloadItem.filename,
      }).catch(() => {});
    }
  });
});

chrome.downloads.onChanged.addListener((delta) => {
  if (delta.state && delta.state.current === "complete") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "DOWNLOAD_COMPLETE",
          id: delta.id,
        }).catch(() => {});
      }
    });
  }
});
`;

export const POPUP_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Flow 2X Upscaler</title>
</head>
<body></body>
</html>
`;

export const POPUP_JS_CODE = ``;
