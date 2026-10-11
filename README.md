# Little Red Deck

A Singapore-inspired interactive card-reading and cultural collection prototype. Residents and visitors discover a personal card, explore local stories, and build a six-card deck through places and people.

**[Open the live prototype](https://little-red-deck.fizzyeel16.chatgpt.site)** — currently private and restricted to the site owner.

## The experience

1. Answer three personal questions.
2. Watch all six cards shuffle, draw a card, and flip it to reveal your personal card and reading.
3. Scan a place QR, read a short cultural story, and press **Collect card**.
4. Scan another person’s personal-card QR to receive a copy. Both people keep their cards.
5. Earn **10 points per new card** and a **50-point bonus** for completing all six.

The initial personal card earns points too. Duplicate cards earn no extra points, and the completion bonus is awarded once. A full deck earns **110 points**.

## Design

### Nanyang-inspired tarot cards

The six original SVG cards combine tall tarot compositions, Roman numerals, symbolic titles and celestial borders with tropical foliage, shophouse details and everyday Singapore subjects. Jade, vermilion, ochre and aged-paper tones form the Nanyang-inspired palette. The ornamental card backs carry a matching floral and tile motif.

These are contemporary creative interpretations. The subjects have community and regional histories; the project explores their place in Singapore.

| Theme | Card | Symbolic title | Reading theme |
| --- | --- | --- | --- |
| Food | Hainanese chicken rice | The Nourisher | Comfort |
| Food | Kaya toast | The Beginning | Beginnings |
| Everyday rituals | Kopitiam gathering | The Gathering | Connection |
| Everyday rituals | Wet-market visit | The Exchange | Exchange |
| Arts | Nyonya beadwork | The Maker | Patience |
| Arts | Wayang kulit | The Storyteller | Perspective |

### Three.js landing page

The landing page draws on Persona’s graphic energy: oversized condensed typography, angled panels, dark ink against vermilion, and sharp labels. The content and artwork are original to Little Red Deck.

A Three.js scene renders the illustrated cards as a 3D fan. Drag to turn it, tap a card to select it, or use the six keyboard-accessible preview buttons below. Reduced-motion mode keeps the scene still, and browsers without WebGL receive a static illustrated fan. Rendering pauses when the scene is off-screen or the page is hidden; leaving the landing page disposes its GPU resources.

## Run locally

Use **Node.js 24 or newer** and **Python 3** for the commands below.

```sh
npm ci
npm run dev
```

Open [http://localhost:4173](http://localhost:4173).

The checked-in `dist/` directory is ready to serve with any static HTTP server. Runtime dependencies, artwork and the Anton display font are served locally; the app does not require external scripts, font servers or image services.

After changing the source, rebuild the Three.js bundle and standalone preview:

```sh
npm run build
```

You can also open `prototype.html` directly in a browser. It bundles the app, styles, artwork, font and libraries into one file. If file-origin storage is unavailable, progress lasts for the current tab. Use a served site for camera access and cross-device QR links.

## Try the complete flow

1. Choose **Draw your personal card**, answer the questionnaire, then shuffle, draw and flip.
2. Open **Scan a QR** and select a demo place. Read its story and choose **Collect card**.
3. Switch to **Person’s QR** and collect a copy of a different card type.
4. Collect the remaining cards to receive the completion bonus. Try collecting one again to see duplicate feedback.
5. Open your personal card and choose **Share my card** to generate its QR and copy its link.

You can paste a shared link or a code such as `place:beadwork` or `person:kaya-toast` into the scanner. A shared link works on another device when the site is reachable and the visitor has access. The current private deployment is owner-only; demo codes let you try both QR flows within the prototype.

## Implementation and limits

- **Browser-local progress:** cards and points are stored in local storage in the current browser. The app has no backend or cross-device collection sync. Resetting the deck requires confirmation.
- **Draft matching:** the sum of the three zero-based answer indexes, modulo six, selects the personal card. Readings are creative reflections, not predictions or validated assessments.
- **Copy-based sharing:** person QR links contain a card type, not questionnaire answers. They add a copy without removing the sender’s card. The app does not verify another card owner’s identity.
- **Camera support:** scanning uses the native `BarcodeDetector` API where available and requires HTTPS or localhost, camera permission and hardware. Pasted links/codes and demo encounters are available in other browsers. Physical-camera scanning remains unverified.
- **Illustrative place codes:** no physical QR installation, venue partnership, location verification or reward-redemption scheme is established. Cultural summaries link to credited sources; editorial and community review remains open.

Branding, final matching rules and point values remain open. Further readings, games and real-world QR arrangements are future work. Encouraging exploration and social connection is the project’s aim, rather than a measured outcome.

## Development checks

```sh
npm test
npm run check
```

Model and DOM checks cover questionnaire matching, QR parsing, unique-card awards, duplicates, the one-time completion bonus, copy semantics, the shuffle/draw/flip flow, collection and reset.

For browser checks, keep `npm run dev` running in another terminal, then run:

```sh
npm run test:browser
```

The browser test uses Playwright Core with an existing Chromium binary. The default path is `/usr/bin/chromium`; set `CHROMIUM_PATH` to your executable’s path if needed. It does not download a browser.

The current prototype passed model, DOM, syntax and Chromium checks, including the WebGL scene, card selection and dragging, desktop and mobile layouts, reduced motion, the no-WebGL fallback, and the questionnaire-to-reveal journey. No script errors or mobile document overflow were observed in those checks.

## Project structure

| Path | Purpose |
| --- | --- |
| `dist/index.html` | App shell and navigation |
| `dist/app.js` | Questionnaire, readings, QR flows and collection interface |
| `dist/model.js` | Six-card content, matching, scoring and code parsing |
| `dist/artwork.js` | Shared SVG card illustrations and ornamental backs |
| `dist/style.css` | Responsive visual design |
| `src/landing.js` | Editable Three.js landing scene |
| `scripts/build-scene.js` | Bundles the scene into `dist/landing.js` with esbuild |
| `scripts/package-preview.js` | Generates the standalone `prototype.html` |
| `tests/` | Model, DOM and browser checks |
| `.openai/hosting.json` | Existing Sites identity and static hosting configuration |

Sites serves `dist/`. The hosting manifest retains the existing project ID for future deployments.

## Cultural sources

- [Chicken rice — National Heritage Board](https://www.roots.gov.sg/ich-landing/ich/chicken-rice)
- [Traditional breakfast of kaya and kopi — National Heritage Board](https://www.roots.gov.sg/ich-landing/ich/traditional-breakfast-of-kaya-and-kopi)
- [Beyond Kaya Toast — Roots](https://www.roots.gov.sg/stories-landing/stories/beyond-kaya-toast/story)
- [Singapore’s changing wet markets — National Library Board](https://biblioasia.nlb.gov.sg/all-sections/vol-18-issue-1-apr-to-jun-2022-singapore-changing-wet-markets/)
- [Nyonya beadwork and embroidery — National Heritage Board](https://www.roots.gov.sg/ich-landing/ich/nyonya-beadwork-and-embroidery)
- [Wayang kulit’s intangible cultural heritage — Kaya](https://www.kaya.gov.sg/heritage/light-and-shadow--wayang-kulit-s-intangible-cultural-heritage/)

These references inform the cultural content. No affiliation is implied, and source images have not been reused.

## Credits

Codex assisted concept development, research, implementation, reflective reading text, original SVG artwork and automated checks. No generative image tool was used.

The prototype uses Three.js and qrcode-generator under the MIT license, and the Anton font under the SIL Open Font License. Runtime notices are included in `dist/landing.js.LEGAL.txt`, `dist/vendor/qrcode.js` and `dist/vendor/ANTON-LICENSE.txt`.
