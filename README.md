# Little Red Deck

A Singapore-inspired interactive card-reading and cultural collection prototype. Residents and visitors discover a personal card, explore local stories, and build a 22-card deck through places and people.

**[Open the live prototype](https://little-red-deck.fizzyeel16.chatgpt.site)** — currently private and restricted to the site owner.

## The experience

1. Answer three personal questions.
2. Watch all 22 cards shuffle, draw a card, and flip it to reveal your personal card and reading.
3. Scan a place QR, read a short cultural story, and press **Collect card**.
4. Scan another person’s personal-card QR to receive a copy. Both people keep their cards.
5. Earn **10 points per new card** and a **50-point bonus** for completing all 22.

The initial personal card earns points too. Duplicate cards earn no extra points, and the completion bonus is awarded once. A full deck earns **270 points**. Anyone who already earned the original six-card completion bonus keeps those 50 points as a legacy award, in addition to the new completion bonus; their maximum is 320 points.

## Small interactive demonstration

The landing page includes **Three ways to make it yours**:

- **Tactile reveal:** answer the questionnaire, then drag sideways to shuffle and cut, upward to draw, and sideways to turn the card. Buttons provide every action, and **Simple reveal** skips the gestures and animation. Returning participants can replay with their retained personal card without earning duplicate points.
- **Two-person reading:** select two cards in the demo, or scan a person's QR and choose **Read together** once you have a personal card. The combined reflection offers two reciprocal listening prompts, including when both people have the same card. No compatibility score is produced. Reading together does not collect cards or change ownership.
- **Chicken-rice memory:** collect or open the chicken-rice card to save an optional note of up to 600 characters beside its unchanged cultural story. Edit, delete or skip it at any time. The note stays in this browser, is excluded from shared QR links, and is cleared by **Reset my deck**. If storage is unavailable, it lasts only for the current tab.

These are designed prototype activities and original reflections. Personal memories are separate from cultural accounts. Collection routes, community submissions and practitioner audio remain future experiments.

## Design

### Nanyang-inspired tarot cards

The 22 original SVG cards combine tall tarot compositions, Roman numerals, symbolic titles and celestial borders with tropical foliage, shophouse details and everyday Singapore subjects. Jade, vermilion, ochre and aged-paper tones form the Nanyang-inspired palette. The ornamental card backs carry a matching floral and tile motif.

These are contemporary creative interpretations. The subjects have community and regional histories; the project explores their place in Singapore.

| No. | Theme | Card | Symbolic title | Reading theme |
| --- | --- | --- | --- | --- |
| 1 | Food | Hainanese chicken rice | The Nourisher | Comfort |
| 2 | Food | Kaya toast | The Beginning | Beginnings |
| 3 | Everyday rituals | Kopitiam gathering | The Gathering | Connection |
| 4 | Everyday rituals | Wet-market visit | The Exchange | Exchange |
| 5 | Arts | Nyonya beadwork | The Maker | Patience |
| 6 | Arts | Wayang kulit | The Storyteller | Perspective |
| 7 | Food | Roti prata | The Adapter | Flexibility |
| 8 | Food | Laksa | The Blend | Integration |
| 9 | Food | Satay | The Shared Flame | Generosity |
| 10 | Food | Ice kacang | The Small Joy | Delight |
| 11 | Everyday rituals | Community garden | The Nurturer | Care |
| 12 | Everyday rituals | Void deck | The Common Ground | Belonging |
| 13 | Everyday rituals | Pasar malam | The Explorer | Curiosity |
| 14 | Everyday rituals | Five stones | The Rhythm | Focus |
| 15 | Arts | Kolam | The Renewal | Intention |
| 16 | Arts | Lion dance | The Courage | Courage |
| 17 | Arts | Getai | The Presence | Confidence |
| 18 | Arts | Xinyao | The Voice | Expression |
| 19 | Places | Shophouse | The Layers | Identity |
| 20 | Places | Bumboat | The Passage | Transition |
| 21 | Places | Dragon playground | The Wonder | Imagination |
| 22 | Places | Five-foot way | The Shelter | Support |

### Three.js landing page

The landing page draws on Persona’s graphic energy: oversized condensed typography, angled panels, dark ink against vermilion, and sharp labels. The content and artwork are original to Little Red Deck.

A Three.js scene renders a rotating selection from the full collection as a 3D fan. It uses six visible meshes and an eight-texture cache to keep GPU memory bounded as you explore all 22 cards. Drag to turn it, tap a card to select it, or use the keyboard-accessible preview buttons below, with filters for Food, Everyday rituals, Arts and Places. Reduced-motion mode keeps the scene still, and browsers without WebGL receive a static illustrated fan. Rendering pauses when the scene is off-screen or the page is hidden; leaving the landing page disposes its GPU resources.

## Run locally

Use **Node.js 24 or newer** and **Python 3** for the commands below.

```sh
npm ci
npm run dev
```

Open [http://localhost:4173](http://localhost:4173).

The checked-in `dist/` directory is ready to serve with any static HTTP server. Runtime dependencies, artwork and the Anton display font are served locally; the app does not require external scripts, font servers or image services.

After changing the source, rebuild the Three.js bundle, the 23 SVG exports (22 fronts and one back), and the standalone preview:

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
- **Draft matching:** the three zero-based answer indexes are encoded as a base-four number, modulo 22, to select the personal card. All 22 cards are reachable across the 64 possible answer combinations. Readings are creative reflections, not predictions or validated assessments.
- **Copy-based sharing:** person QR links contain a card type, not questionnaire answers. They add a copy without removing the sender’s card. The app does not verify another card owner’s identity. All 22 card types support both place and person QR codes.
- **Camera support:** scanning uses the native `BarcodeDetector` API where available and requires HTTPS or localhost, camera permission and hardware. Pasted links/codes and demo encounters are available in other browsers. Physical-camera scanning remains unverified.
- **Illustrative place codes:** no physical QR installation, venue partnership, location verification or reward-redemption scheme is established. The 16 new cultural notes are marked as drafts and linked to the supplied references. Editorial and practitioner review remains open. Symbolic titles and reading themes are original interpretations, not inherited meanings of the cultural practices.

Branding, final matching rules and point values remain open. Further readings, games and real-world QR arrangements are future work. Encouraging exploration and social connection is the project’s aim, rather than a measured outcome.

## Development checks

```sh
npm test
npm run check
```

Model and DOM checks cover questionnaire matching, QR parsing, unique-card awards, duplicates, the one-time completion bonus, copy semantics, the 22-card shuffle/draw/flip flow, collection and reset. They also verify that every card is reachable, that old progress and points migrate, and that the new completion bonus is awarded only on card 22.

For browser checks, keep `npm run dev` running in another terminal, then run:

```sh
npm run test:browser
node tests/demo-browser.mjs
```

The browser test uses Playwright Core with an existing Chromium binary. The preview defaults to port 4173; set `BASE_URL` to test a server on another port. The Chromium default path is `/usr/bin/chromium`; set `CHROMIUM_PATH` to your executable’s path if needed. It does not download a browser.

The current prototype passed model, DOM, syntax and Chromium checks, including the WebGL scene, card selection and dragging, desktop and mobile layouts, reduced motion, the no-WebGL fallback, and the questionnaire-to-reveal journey. Demonstration checks also cover touch shuffle/cut/draw/turn, keyboard and reduced-motion reveal, interrupted shuffle cleanup, paired readings, and memory persistence, deletion, reset and exclusion from sharing. No script errors or mobile document overflow were observed in those checks.

## Project structure

| Path | Purpose |
| --- | --- |
| `dist/index.html` | App shell and navigation |
| `dist/app.js` | Questionnaire, readings, QR flows and collection interface |
| `dist/model.js` | 22-card content, matching, scoring and code parsing |
| `dist/artwork.js` | Shared SVG card illustrations and ornamental backs |
| `dist/style.css` | Responsive visual design |
| `src/landing.js` | Editable Three.js landing scene |
| `dist/cards/` | Exported SVG artwork: 22 fronts and the shared card back |
| `scripts/export-cards.js` | Regenerates the individual SVG files |
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

Additional references supplied with the 22-card brief:

- [Roti prata — Roots](https://www.roots.gov.sg/ich-landing/ich/roti-prata)
- [Hawker culture — Roots](https://www.roots.gov.sg/ich-landing/ich/hawker-culture)
- [MUSE SG, January 2023 — NHB](https://www.roots.gov.sg/-/media/Roots/Images/resources/muse/MUSE-161/MUSE-SG-January-2023.pdf)
- [Community in Bloom — NParks](https://gardeningsg.nparks.gov.sg/get-involved/cib/about/)
- [Void decks — NHB](https://www.roots.gov.sg/~/media/Roots/Images/resources/e-books/nhb_ebook_void_decks.pdf)
- [Pasar malams in Singapore — SG101](https://www.sg101.gov.sg/resources/archives/pasar-malams-in-singapore/)
- [I Love Museums, July–September 2015 — NHB](https://www.roots.gov.sg/~/media/Roots/Images/resources/publications/i-love-museums/2015-jul-sep-ilm-guide.pdf)
- [Rangoli — Roots](https://www.roots.gov.sg/ich-landing/ich/rangoli)
- [Lion dance — Roots](https://www.roots.gov.sg/ich-landing/ich/lion-dance)
- [Intangible cultural heritage booklet — NHB](https://www.roots.gov.sg/-/media/Roots/ich/ich-booklet/ich-booklet.ashx)
- [Xinyao — Roots](https://www.roots.gov.sg/ich-landing/ich/xinyao)
- [Understanding the shophouse — URA](https://www.ura.gov.sg/conservation/conservation-resources/understanding-the-shophouse/)
- [Singapore River collection reference — Roots](https://www.roots.gov.sg/Collection-Landing/listing/1109499)
- [Toa Payoh Dragon Playground — Roots](https://www.roots.gov.sg/places/places-landing/Places/landmarks/Toa-Payoh-Heritage-Trail/Toa-Payoh-Dragon-Playground)

These references inform the cultural content. No affiliation is implied, and source images have not been reused.

## Credits

Codex assisted concept development, research, implementation, reflective reading text, original SVG artwork and automated checks. No generative image tool was used.

The prototype uses Three.js and qrcode-generator under the MIT license, and the Anton font under the SIL Open Font License. Runtime notices are included in `dist/landing.js.LEGAL.txt`, `dist/vendor/qrcode.js` and `dist/vendor/ANTON-LICENSE.txt`.
