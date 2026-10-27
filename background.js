// Background service worker
// Tracks ad counts per tab for the popup badge

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'AD_COUNT') {
    const count = msg.count;
    if (count > 0) {
      chrome.action.setBadgeText({ text: String(count), tabId: sender.tab.id });
      chrome.action.setBadgeBackgroundColor({ color: '#e63946', tabId: sender.tab.id });
    } else {
      chrome.action.setBadgeText({ text: '', tabId: sender.tab.id });
    }
  }
});
