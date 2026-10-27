Pokémon Ad Blocker

A Chrome extension that replaces advertisements with animated Pokémon sprites. Instead of seeing ads, you get a random Pokémon doing an idle animation on a little starfield. Click it to swap for a different one, or right-click to reveal the ad underneath.

Show Image

Features
Detects ads using a layered strategy: Google AdSense, GPT slots, ad network iframes, Taboola/Outbrain widgets, and IAB standard ad sizes
No false positives — navigation bars, search fields, and page UI are never covered
Animated Gen 5 sprites from PokeAPI (static fallback if the GIF fails to load)
Click any Pokémon to swap it for a new random one
Right-click to release a Pokémon and reveal the ad underneath
Popup shows how many ads are blocked on the current tab, this session, and all time
Enable/disable toggle that persists across tabs and restarts
Tab badge shows the live blocked count per page
Catches dynamically injected ads via MutationObserver and staggered rescans
Installation

This extension is not on the Chrome Web Store. You load it manually as an unpacked extension.

Download or clone this repo
Open Chrome and go to chrome://extensions
Enable Developer mode (toggle in the top right)
Click Load unpacked
Select the pokemon-ad-blocker folder
The Pokéball icon should appear in your toolbar
Usage
Browse normally — ads are automatically detected and covered
Click a Pokémon to swap it for a different one
Right-click a Pokémon to remove it and see the ad underneath
Open the popup (click the toolbar icon) to:
See how many ads are blocked on the current page
Toggle the extension on or off
Swap all current Pokémon at once
Trigger a manual rescan of the page
How It Works

Ad detection runs in three passes on every page:

CSS selectors — unambiguous patterns like ins.adsbygoogle, [id^="div-gpt-ad"], and iframes with ad network src URLs
iframe src sniffing — checks all iframes against a list of 23 known ad network domains
Structural containers — divs/sections with strong ad signals (data attributes, aria labels, Taboola/Outbrain IDs) or a combination of ad-like naming, IAB standard dimensions, and actual ad markup inside

A safety check walks up to 6 ancestor elements before covering anything — if the element is inside a <nav>, <header>, <form>, or anything that looks like a search bar or navigation menu, it's left alone.

Sprites are pulled from the PokeAPI GitHub CDN, Gen 5 Black/White animated GIFs, covering Pokédex entries #1–649.

Tech Stack
Chrome Extension Manifest V3
Vanilla JS (no build step, no dependencies)
PokeAPI sprites via GitHub raw CDN
Credits

Pokémon sprites from PokeAPI/sprites. Pokémon is © Nintendo / Game Freak. This project is unofficial and unaffiliated.
