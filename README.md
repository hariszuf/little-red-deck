# Little Red Deck

Working title for a Singapore-inspired card-reading and cultural collection prototype. Final branding remains open.

Residents and visitors begin with a general personal reading, then grow a six-card deck by exploring Singapore and meeting other card holders. The intended aims are tourism, personal cultural connection, and social interaction.

## Planned experience

1. Answer a personal questionnaire.
2. Watch the whole deck shuffle, then draw and flip a card to reveal a personal card and general reading.
3. Scan a place QR, read a short cultural story, and press **Collect card**.
4. Scan another person's personal-card QR to receive a copy. Both people keep their cards.
5. Earn points for each new card and a bonus for completing all six.

## Confirmed prototype deck

| Theme | Card | Working reading theme |
| --- | --- | --- |
| Food | Hainanese chicken rice | Comfort, simplicity, affordability |
| Food | Kaya toast | Familiarity and beginnings |
| Everyday rituals | Kopitiam gathering | Connection and taking a pause |
| Everyday rituals | Wet-market visit | Exchange and providing |
| Arts | Nyonya beadwork | Patience and craft |
| Arts | Wayang kulit | Perspective and storytelling |

The reading themes are creative prototype interpretations. Cultural stories will be grounded in credited sources. These subjects have community and regional histories; the project explores their place in Singapore.

## Interactive prototype

The first browser-local prototype is implemented in `dist/`. It contains three questionnaire questions, a visible six-card shuffle, draw and flip reveal, a personal reading, place and person QR flows, a six-card collection, and points. Six original SVG illustrations accompany the confirmed deck.

For an immediate preview, open `prototype.html` directly in a browser. It bundles the styles, artwork, logic and QR library. If file-origin storage is unavailable, progress lasts for the current tab. Regenerate it after changes with `npm run build`. For camera access and shareable links, serve the prototype instead.

Run from this repository:

```sh
npm run dev
```

Then open http://localhost:4173 in your browser. Serving `dist/` with any static HTTP server also works; the checked-in `dist/` output is ready to serve. Run `npm run build` after source changes to bundle the Three.js scene and regenerate the standalone preview. The runtime bundles Three.js locally, vendors QR generation and self-hosts the Anton display font, so it needs no external scripts, font servers or image services.

### Try the complete flow

1. Choose **Find my personal card**, answer three questions, shuffle, draw and flip.
2. Open **Scan a QR** and choose a demo place. Read the story, then choose **Collect card**.
3. Switch to **Person’s QR** to receive a copy of another personal-card type. The original stays with its owner.
4. Collect all six to see the completion bonus. Try the same code again to verify duplicate feedback.
5. Open your personal card and choose **Share my card** for a real QR containing its link. A second browser can receive the copy when the site is reachable there. Codes such as `person:kaya-toast` and `place:beadwork` can also be pasted into the scanner.

### Prototype choices and limits

- Draft scoring: 10 points per unique card, including the initial personal card; 50 bonus points once all six are collected. Maximum: 110. No redemption scheme.
- Draft matching: the sum of the three answer indexes selects one of the six cards. Creative reading text is a reflection, not a prediction or validated assessment.
- Progress stays in local storage in the current browser. No accounts, backend, location verification, owner registry or answer transmission. Reset requires a confirmation in the interface.
- Person QR links share a card type. They neither transfer nor remove the sender’s card; they do not contain questionnaire answers. Demo person codes simulate encounters, rather than proving another owner exists.
- Camera scanning uses the native BarcodeDetector API where supported and requires a secure origin (HTTPS or localhost), permission and camera hardware. Other browsers can paste links/codes or use demos.
- Place codes are illustrative; no physical QR installation or venue partnership exists. Cultural summaries link to the sources below; editorial/community review remains open.
- Private Sites URL: https://little-red-deck.fizzyeel16.chatgpt.site . Access is restricted to the owner. Source is maintained in `/workspace/sites/little-red-deck`; the original GitHub checkout is mirrored without pushing GitHub.

### Checks

```sh
npm ci
npm test
npm run check
```

Model and DOM interface checks cover matching, unique awards, duplicate handling, one-time completion, copy semantics, QR parsing, the questionnaire/shuffle/flip journey, collection and reset. They passed. The redesign also includes Chromium checks for the Three.js scene, card selection, the questionnaire/flip flow, mobile page overflow and reduced motion. Physical camera scanning remains unverified.

Collection, further readings, and games are intended future deck uses. Detailed game mechanics, branding, actual point values and physical QR arrangements remain open.

## Cultural sources

- [Chicken rice — National Heritage Board](https://www.roots.gov.sg/ich-landing/ich/chicken-rice)
- [Traditional breakfast of kaya and kopi — National Heritage Board](https://www.roots.gov.sg/ich-landing/ich/traditional-breakfast-of-kaya-and-kopi)
- [Beyond Kaya Toast — Roots](https://www.roots.gov.sg/stories-landing/stories/beyond-kaya-toast/story)
- [Singapore's changing wet markets — National Library Board](https://biblioasia.nlb.gov.sg/all-sections/vol-18-issue-1-apr-to-jun-2022-singapore-changing-wet-markets/)
- [Nyonya beadwork and embroidery — National Heritage Board](https://www.roots.gov.sg/ich-landing/ich/nyonya-beadwork-and-embroidery)
- [Wayang kulit's intangible cultural heritage — Kaya](https://www.kaya.gov.sg/heritage/light-and-shadow--wayang-kulit-s-intangible-cultural-heritage/)

References inform content; no affiliation is implied and no source images have been reused.

## AI and tool attribution

Codex assisted concept development, source research, brief writing, and repository preparation. Web tools consulted cultural sources and related exploration experiences. Codex implemented this prototype, draft reflective readings, original SVG card artwork and automated checks. No generative image tool was used. QR generation uses the MIT-licensed qrcode-generator package.


## Visual direction — Everyday Arcana

All six cards use original tarot-inspired SVG art: numbered borders, symbolic reading titles, celestial framing, tropical foliage and shophouse details. Jade, vermilion, ochre and paper tones draw on a Nanyang-inspired palette. These are contemporary interpretations, rather than reproductions of a particular artist’s work.

The landing page takes visual cues from Persona’s graphic energy: oversized condensed typography, angular panels, dark ink against vermilion and sharp labels. Original content and artwork express the Singapore concept. Three.js renders textured 3D cards, supports drag-to-turn and selection, and disposes its GPU resources when leaving the landing page. Keyboard users can select the same six cards from the buttons below the scene. Reduced-motion mode keeps the scene still; lack of WebGL leaves a static illustrated fan available. Animations pause rendering when off-screen or hidden.

`src/landing.js` is the editable Three.js source; `dist/artwork.js` supplies the shared SVG card art. `npm run build` bundles the scene with esbuild. Three.js is MIT licensed; Anton uses the SIL Open Font License. Included runtime license notices are in `dist/landing.js.LEGAL.txt` and `dist/vendor/ANTON-LICENSE.txt`.

Browser checks: start `npm run dev` in one terminal, then run `npm run test:browser`. The test uses an existing Chromium binary (default `/usr/bin/chromium`; override with `CHROMIUM_PATH`). No browser download is required.
