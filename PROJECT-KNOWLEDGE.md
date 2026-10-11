# Project knowledge

Updated 12 October 2026 (Singapore).

## Current scope

Little Red Deck is an implemented Singapore-inspired interactive card collection for residents and visitors. The aims are cultural exploration, personal reflection and social connection; these are intended outcomes, not measured results.

The first prototype had six cards. The participant subsequently requested the rest of the cards and supplied the proposed 22-card collection. All 16 additions are now implemented alongside the original six. This supersedes the earlier six-card implementation scope and the proposal's historical “awaiting participant selection” status. Editorial and practitioner review of the new cultural notes remains open.

## The 22-card collection

| No. | Card | Symbolic title | Reading theme |
| --- | --- | --- | --- |
| 1 | Hainanese chicken rice | The Nourisher | Comfort |
| 2 | Kaya toast | The Beginning | Beginnings |
| 3 | Kopitiam gathering | The Gathering | Connection |
| 4 | Wet-market visit | The Exchange | Exchange |
| 5 | Nyonya beadwork | The Maker | Patience |
| 6 | Wayang kulit | The Storyteller | Perspective |
| 7 | Roti prata | The Adapter | Flexibility |
| 8 | Laksa | The Blend | Integration |
| 9 | Satay | The Shared Flame | Generosity |
| 10 | Ice kacang | The Small Joy | Delight |
| 11 | Community garden | The Nurturer | Care |
| 12 | Void deck | The Common Ground | Belonging |
| 13 | Pasar malam | The Explorer | Curiosity |
| 14 | Five stones | The Rhythm | Focus |
| 15 | Kolam | The Renewal | Intention |
| 16 | Lion dance | The Courage | Courage |
| 17 | Getai | The Presence | Confidence |
| 18 | Xinyao | The Voice | Expression |
| 19 | Shophouse | The Layers | Identity |
| 20 | Bumboat | The Passage | Transition |
| 21 | Dragon playground | The Wonder | Imagination |
| 22 | Five-foot way | The Shelter | Support |

Each card has a distinct original SVG illustration, Roman numeral, reflective reading, cultural note and reference link. The shared back and 22 fronts are exported into `dist/cards/` when building. Themes are Food (6), Everyday rituals (6), Arts (6), and Places (4).

The tarot-esque compositions and Nanyang-inspired palette use jade, vermilion, ochre, aged paper, foliage and architectural motifs. Symbolic meanings are original creative interpretations, not inherited meanings of these cultural practices. The subjects have community and regional histories; the deck does not imply exclusive Singapore origins. The 16 new cultural notes are explicitly marked as drafts in the interface.

## Implemented experience and draft rules

1. Answer three personal questions, watch all 22 cards shuffle, draw and flip to reveal a personal card and general reading.
2. Scan a place QR, read its cultural note, then press **Collect card**.
3. Scan another person's personal-card QR to receive a copy. Both retain their cards.
4. Earn 10 points for each unique card, including the first personal card, and a once-only 50-point bonus for all 22: 270 points total. Duplicates earn no additional points.

Matching encodes the three zero-based answer indexes as a base-four number, then takes modulo 22. Every card is reachable across the 64 possible responses. This is a draft creative rule, not a validated assessment or prediction.

Progress is browser-local under the existing `lrd-v1` storage key, with version 2 data. Existing owned cards and personal cards are retained. People who already earned the old six-card bonus keep those 50 points as a legacy award and can earn the new 22-card bonus, for a maximum of 320. Reset requires confirmation and removes both current and legacy progress.

Place and person codes support all 22 IDs. Person links contain a card type, not questionnaire answers; there is no owner identity verification or backend. Camera scanning uses native BarcodeDetector where supported and needs HTTPS/localhost, permission and camera hardware. Manual codes and demo encounters provide alternatives. Physical camera scanning remains unverified.

## Landing and accessibility

The Three.js landing uses original artwork with Persona-inspired graphic energy, angled ink/vermilion panels and self-hosted Anton typography. A six-mesh fan and an eight-texture cache bound GPU usage while allowing selection of any card. Preview and collection filters expose all four themes.

The scene supports dragging, card selection, keyboard-accessible preview buttons, reduced motion and an illustrated no-WebGL fallback. Rendering pauses off-screen or when the page is hidden, runs at approximately 30fps, and caps device pixel ratio at 1.5. Navigation disposes its GPU resources. The mobile gallery scrolls horizontally, while the collection uses two columns.

## Repository, hosting and development

- Canonical repository: https://github.com/hariszuf/little-red-deck (public; default branch `main`).
- Current GitHub checkout: `/workspace/little-red-deck`.
- Separate Sites checkout: `/workspace/sites/little-red-deck`.
- Sites project: `appgprj_6acbc598f50c819183c8428c82557c84`.
- Existing private owner-only site: https://little-red-deck.fizzyeel16.chatgpt.site .
- Sites serves `dist/` using `.openai/hosting.json`; its project identity must be preserved.
- `npm ci`, then `npm run dev` serves the prototype at http://localhost:4173 .
- `npm run build` bundles the Three.js scene, exports the SVGs and generates the standalone `prototype.html`.
- The participant has requested committing and pushing work to GitHub. Keep the GitHub and Sites repositories separate when syncing source.

The original six-card visual redesign was deployed successfully on 12 October. The current 22-card expansion is ready for publication after final build/export checks; consult Git history and Sites deployment status for the published revision. Shared Page tools are unavailable, so the team-facing Page update remains pending. This file and README provide local project continuity.

## Validation

The 22-card expansion passed model, DOM, syntax and Chromium checks: all 22 cards reachable; valid place/person codes; unique awards, duplicates and copying; bonus awarded on card 22; saved six-card progress migration; full questionnaire/shuffle/draw/flip; theme filters; WebGL selection and dragging; reduced motion; no-WebGL fallback; desktop at 1440px and mobile at 390px. No browser script errors or mobile document overflow were observed. Physical camera and participant usability studies have not been conducted.

## Open decisions and limits

Final branding, matching rules, reading copy, point values, practitioner review, physical QR locations and arrangements, future reading/game mechanics and reward incentives remain open. There is no account service, cross-device collection sync, paid service, location tracking, AI interpretation service, venue partnership, government sponsorship or redemption scheme.

## References and assets

README retains all cultural links from the six-card prototype and the participant's 22-card proposal, including NHB Roots, NLB, URA, NParks and SG101. The new short cultural notes use the supplied references as editorial context; they are drafts pending review. Source images were not reused. Artwork is original SVG authored in code; no generative image tool was used.

Codex assisted concept development, research, implementation, reflective text, illustrations, documentation and automated checks. Runtime dependencies are Three.js and qrcode-generator (MIT), plus the Anton font (SIL Open Font License), with notices distributed in `dist/`.

Earlier Parcana source (https://github.com/CheeseBaiKia222/AiArcanaDm) is background only. The participant requested a fresh project; no earlier implementation was copied. Unrelated submission or reminders notes must not be imported into this project's evidence.
