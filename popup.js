const TOTAL_POKEMON = 649;

function rand() {
  return Math.floor(Math.random() * TOTAL_POKEMON) + 1;
}

function animatedUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
}

function staticUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

// Header sprite
const headerSprite = document.getElementById('headerSprite');
let currentId = rand();

function loadSprite(id) {
  headerSprite.src = animatedUrl(id);
  headerSprite.onerror = () => { headerSprite.src = staticUrl(id); };
}

loadSprite(currentId);

// Stats
chrome.storage.local.get({ sessionCount: 0, totalCount: 0 }, (res) => {
  document.getElementById('countSession').textContent = res.sessionCount;
  document.getElementById('countTotal').textContent = res.totalCount;
});

// Get current tab's blocked count via badge text
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    chrome.action.getBadgeText({ tabId: tabs[0].id }, (text) => {
      document.getElementById('countAds').textContent = text || '0';
    });
  }
});

// Toggle
const toggle = document.getElementById('enableToggle');
chrome.storage.sync.get({ enabled: true }, (res) => {
  toggle.checked = res.enabled;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

// New Pokémon button — swaps popup sprite AND sends message to active tab
document.getElementById('btnNew').addEventListener('click', () => {
  currentId = rand();
  loadSprite(currentId);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'SWAP_ALL' }).catch(() => {});
    }
  });
});

// Rescan button
document.getElementById('btnRescan').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'RESCAN' }).catch(() => {});
    }
  });
  // Brief visual feedback
  const btn = document.getElementById('btnRescan');
  btn.textContent = 'Scanning...';
  setTimeout(() => { btn.textContent = 'Rescan Page'; }, 1200);
});
