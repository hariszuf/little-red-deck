# Project knowledge

## Workshop progress

Stage: Develop — first interactive browser-local prototype implemented. User requested a fresh GitHub project, superseding the downloaded-repo plan, then selected https://github.com/hariszuf/little-red-deck . Owner: hariszuf; visibility: public per GitHub metadata; default branch: main. Working title: Little Red Deck; final branding remains open, with Kaki Cards an earlier option. Active checkout: C:/Users/muhdh/Downloads/common-ground-kit-20261011T033413Z-1-001/common-ground-kit/little-red-deck . Shared Page tools are unavailable; Page creation/save is pending. This local file does not replace the team-facing Page. User explicitly requested the interactive web prototype. Next checkpoint: review the implemented flow, visual design and draft mechanics. Current execution checkout: /workspace/little-red-deck.

## Confirmed idea and audience

Singapore-inspired interactive cards for residents and visitors. Intended aims: encourage tourism, personal connection to Singapore culture, and connection/interaction. These are goals, not measured outcomes. Food, everyday rituals, and arts are the starting themes.

## Confirmed first prototype

- Personal questionnaire → general reading → whole deck shuffles → draw and flip reveal → personal card.
- Place QR → short cultural story → Collect card button → card joins deck.
- Another person's personal-card QR → receive a copy; both keep their cards.
- Six cards, two per theme, with working meanings as listed in README.
- Points for each new card; bonus for completing all six. Repeated acquisition is not a new-card award.
- Collection, further readings, and games are intended uses; detailed reading/game mechanics remain open.

## Open decisions

Questionnaire and matching method; reading text; personal-card initial points; point values; duplicate feedback; story flow for people QR; exact game scope; artwork; physical QR locations and arrangements. No AI interpretation service, location tracking, paid service, sponsor, or government partnership is confirmed.

## Future ideas

Game-based points, vouchers, and possible government-supported incentives. No real redemption scheme exists.

## References and assets

README lists official cultural sources. Related interaction analogies: NHB Heritage Trails; Walking Trails @ CDC; Pokémon GO Routes and postcard/gift collection. Source descriptions do not validate demand or tourism impact. Cultural subjects have regional/community histories. No borrowed imagery or card artwork has been used.

## Actual build and checks

Repository initially contained only its title README. Added the six-card project brief to README and this project-specific knowledge base. No app code, runtime, deployment, QR campaign, cultural venue arrangement, prototype test, or user test exists in this project. No setup command is available yet. Documentation check: diff whitespace and referenced cultural-source links; no runtime tests apply.

## AI and resources actually used

Codex helped conversation, planning, source research, and writing. Web tools consulted official sources. Local file tools saved planning context and these starter files. A previous PowerShell/System.Drawing diagram visualized an earlier concept; it is not card art and is superseded in scope. Exact model identity unavailable. No generative images produced.

## Project continuity

Earlier Parcana source: https://github.com/CheeseBaiKia222/AiArcanaDm . This is background only; user requested a fresh project and no old implementation was copied. Earlier submission and couples-reminder notes belong to other projects and must not be imported as this project's evidence.


## Prototype implementation — 11 October 2026

Implemented `dist/index.html`, `style.css`, `app.js`, `model.js` and vendored QR generation. Three-question matching, six-card animated shuffle, draw/flip, personal readings, original SVG artwork, cultural summaries with source links, place/person camera and demo QR flows, duplicate feedback, persistent browser collection and confirmed reset. Draft rules: 10 points per new card (including initial draw), once-only 50-point all-six bonus. Draft matching uses answer-index sum modulo six; this is a creative prototype rule, not a validated personal assessment.

`npm test`, `npm run check` and diff whitespace checks passed. DOM tests exercise complete acquisition journey and reset; no visual browser QA or physical-camera checks were available. No accounts, backend or owner verification. Person sharing copies card type only and leaves sender unchanged. No physical QR campaign exists. Publication remains incomplete: Sites helper scripts unavailable in this execution environment. Run `npm run dev` for local browser review. Current README supersedes earlier no-implementation status entries.


## Visual redesign — 12 October 2026 (Singapore)

User requested tarot-esque cards with Nanyang style and a Three.js landing page with Persona-inspired game aesthetics. Implemented shared original SVG tarot compositions for all six cards and backs; tropical palettes/foliage, celestial motifs and shophouse details. Landing now uses ink/vermilion panels, condensed self-hosted Anton typography and a real Three.js textured-card fan. Supports drag, pointer selection, accessible preview buttons, reduced motion and a static fallback. Navigation disposes renderer/geometry/material/texture resources. Maximum rendering rate is approximately 30fps; device pixel ratio is capped at 1.5. Collection and reading rules are retained. A browser check exposed the drawn-card click target collapsing due to absolute-positioned child artwork; fixed with explicit button size and static card positioning. Main editable checkout is `/workspace/sites/little-red-deck` for the existing Sites project. Native Git credential-through-stdin workflow used because bundled source helper remains unavailable. Original GitHub checkout receives synced source after the work, without a GitHub push.

Redesign validation passed: automated model/DOM tests; syntax and whitespace checks; Chromium at 1440px desktop and 390px mobile; actual WebGL texture scene; preview selection; questionnaire/shuffle/draw/flip points; drag gesture; reduced motion; no-WebGL fallback with usable questionnaire; no page errors and no mobile document overflow. Browser tests are tracked in `tests/browser-check.mjs`. Physical-camera scan remains unverified.

Redesign deployment succeeded. Source commit: e4e7be341c71a915477c7d059e02907e779b4114. Deployment: appgdep_6acbcacf3a548191979d63ca8e30545d. Private URL: https://little-red-deck.fizzyeel16.chatgpt.site .
