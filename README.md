# loveAI Survivors

A client-side Phaser + TypeScript + Vite conference survival game set at the loveAI office venue. Choose any of 12 supplied characters and survive **three minutes of active play**. Characters start with one of four weapon/perk archetypes. Original artwork is preserved in `assets/`.

## Run

Requires Node.js 22+ and npm or pnpm.

```sh
npm ci
npm run dev
```

Open the address Vite prints (normally http://localhost:5173). WASD or arrows move; attacks are automatic; Escape pauses. On touch screens, drag anywhere on the arena to steer. Collect lime gems and choose upgrades. The game pauses when the tab loses focus.

```sh
npm test
npm run build
npm run preview
```

The complete deployable game is in `dist/`. The build copies only artwork needed by the game; designer originals and reference photos remain in the source project. No server, account or AI API is required. Fonts match the website’s National 2/Inter stacks with identical local Arial fallbacks, sound uses Web Audio, and best scores use local storage when available.

## Download and share

For source downloads, install Node.js 22 or newer from https://nodejs.org, download and unzip this repository (or clone it), open a terminal in the project folder, then run `npm ci` and `npm run dev`. Open the local address printed in the terminal. No Python, API keys or account setup is needed to play or build. Python/Pillow scripts are only needed when preparing new artwork.

To give testers a ready-built copy, run `npm run release`. This creates `releases/loveai-survivors.zip`, containing the website and a short launch guide. They can unzip it and serve the folder with any static web server. With Node installed, run `npx serve .` inside that folder and open the printed address. Opening `index.html` by double-clicking is not supported because browsers restrict local module loading.

## Website hosting

After approval, run `npm run build` and upload the **contents** of `dist/` to a static folder on your website, for example `/survivors/`. Open `/survivors/` with the trailing slash, or configure a redirect from `/survivors`. All runtime artwork and scripts are included, and URLs work at the root or in a nested folder. No application server is needed. Use HTTPS for clipboard sharing and serve JavaScript with its normal JavaScript MIME type. Replace the whole build together when updating; do not mix files from different builds.

You can link directly to that folder or embed it in an iframe with a useful height, for example:

```html
<iframe src="/survivors/" title="loveAI Survivors"
  style="width:100%;height:850px;border:0" allow="clipboard-write"></iframe>
```

`npm run preview` lets you review the production build locally before uploading. It is a local preview server, not the production hosting service. Scores stay on each player’s device; no shared leaderboard or player data is sent to a backend. The LinkedIn panel prepares text and an image for the player to post manually.

## Play

- Eye: targeted projectiles → piercing beams at level 5.
- Exploding Potions: thrown splash damage and slowing puddles → three throws with Chain Reaction secondary blasts at level 5.
- Lightning: one strike → six-target chains at level 5.
- Hearts and chocolate heal; chocolate restores 25% of maximum health, capped.
- Potions boost damage for 10 seconds.
- Sage caps refresh an eight-second, three-hit shield.
- Blue caps summon or refresh one black-and-tan dachshund for 15 seconds. It follows, collects XP and attacks.
- Upgrade choices pause the entire simulation. Multiple earned levels each receive a choice. The final 30 seconds increase swarm pressure.
- Results include score, survival time, personal best, share/copy and the supplied conference link.

Merchandise effects and the venue layout are fictional. Presenter names are mapped to the official labelled illustrations; no roles, dates or ticket details have been invented.

## Tune

`src/config.ts` contains character baseline stats, weapon stats and maximum levels, upgrade descriptions/caps, healing, drop probabilities, shield and dog settings, difficulty and furniture positions/colliders. Furniture entries are `[asset, x, y, displayWidth, colliderWidth, colliderHeight]`; colliders are placed at the furniture base (`y + 15`). `src/character-alignment.json` contains complete-pose atlas rectangles and measured anchors for all 144 poses in the untouched original sheets. The uniform normalised sheets split some hair and shoes across rows; the runtime uses the original sheets instead. Regenerate them with `scripts/measure-character-alignment.py` using Python and Pillow after any future artwork changes. Detached fragments are excluded from anchor measurements and rendering. Per-frame render crops retain a two-pixel edge margin and preserve the source files. `src/logic.ts` contains the shared grid flow field and XP curve. `src/main.ts` implements the scene and menus; `src/style.css` controls interface layout.

Movement uses a compact foot collider, independent horizontal/vertical sliding and normalised diagonal input. A breadth-first navigation field is shared by all enemies and rebuilt about four times a second. The enemy cap is 260; projectiles and transient effects are destroyed after their lifetimes. The dog is nonblocking and can cross furniture to keep following. Character animations follow the supplied manifest, including the character 04 correction; the dog uses individual 512 × 512 frames. Characters use complete source-pose atlas frames, a constant scale per character, measured torso/foot anchors and no synthetic vertical bounce. Reduced-motion preferences disable knockback and shake.

## Verification

- Forty automated tests cover per-frame alignment plus asset presence and frame layouts, the character 04 correction, dog animation indices, capped healing, collisions, reachable navigation cells, maxed upgrade eligibility and queued XP arithmetic.
- `http://localhost:5173/?qa` enables an explicit development-only QA panel. **Run checks** exercises the actual scene in the browser with accelerated fixed simulation steps; it reports 21 checks for pickups, shield hits/refresh/expiry, dog refresh/following/XP/combat/expiry, paused timers, upgrades, clean restart, defeat, victory and evolved weapons under a full swarm. QA results do not set a personal best. This panel is absent from production builds.
- Browser UI checks exercised selection, character 04's left/right movement, Escape pause, automatic attacks, and pointer steering at a 390 × 844 phone viewport. Desktop layout was checked at 1280 × 900. The phone camera and HUD were corrected after inspection. No missing runtime assets or console errors were observed.
- A 260-enemy automated simulation took approximately 10 ms for 60 update steps on the development machine. A rendered late wave reported approximately 119 FPS on that machine; this is not a guarantee for other devices.
- Three-minute victory and defeat were checked through scene simulation. A full unaided three-minute run and physical phone hardware have **not** been tested. Further playtesting may be useful to refine difficulty and drop rates.

The retained supplied images make the production folder approximately 38 MB. Source likenesses and inferred outfits should be reviewed with the designers before public promotional use, as advised in the asset guides.

## Follow-up fixes

- [x] Align all character animation frames to their visible feet; remove synthetic bounce.
- [x] Exclude neighbouring-frame hair/shoe fragments from all 144 character poses using per-frame render crops. Original PNGs remain untouched.
- [x] Match loveAI website colours, display/body font stacks, rounded buttons and supplied SVG wordmark/heart across every screen.
- [x] Change the premise and interface wording to an overrun loveAI conference, retaining the office venue.
- [x] Map all 12 presenter names to the official labelled artwork; show them in selection, HUD, results and score sharing.

The alignment check in the development QA panel validates all 144 actual Phaser sprite frames against the player and shadow positions.

Brand source: https://loveholidays.ai/loveai (inspected 12 October 2026). Colour and font tokens are in `src/style.css`; original website SVG brand marks are stored in `public/brand/`. The source website declares National 2 and Inter without serving font files, so no substitute font downloads are introduced.

Presenter names and artwork mappings are configured in `src/presenters.ts`, sourced from https://loveholidays.ai/loveai#speakers-title (12 October 2026). `sourcePortrait` records the website’s portrait filename number. It is separate from the game’s character order.

Enemy artwork also uses complete source-sheet poses. `src/enemy-frames.json` records the actual row gaps; regenerate with `scripts/measure-enemy-frames.py`. All eight ghost/orange idle, left, right and hurt frames preserve full silhouettes and intentional hurt particles, without neighbouring-row fragments. Original sheet and individual PNGs remain untouched.

Merchandise runtime PNGs are generated in `public/game-assets/merch` by `scripts/prepare-runtime-assets.py` at 256px wide with nearest-neighbour sampling and preserved transparency. These three files total about 113 KB instead of 2.3 MB. The same script measures complete source rectangles for the partition, sign and planters. `src/office-art.ts` defines the sign’s brand-blue panel and heart placement; the sign is composed by the game from the retained source frame and official brand heart. Enemy hurt poses last 0.22 seconds on surviving hits, with a brief hurt-pose effect on defeat.

Stuart’s ponytail edit is selected via `src/character-art-overrides.json`. His edited sheet and portrait are in `assets/character-edits/stuart-ponytail/`; supplied originals remain unchanged. Built-in image_gen was used, with the full prompt set recorded in `generation-prompts.json`. Complete poses are remeasured from the edited sheet, and all other characters continue using their original artwork.

Runs now begin at 70/100 health. The eye enemy appears from 120 seconds, is larger than the ghosts and oranges, has eight times base enemy health and deals 18 contact damage. Its arrival chance and six-eye limit are configurable in `EYE_ENEMY`.

Results include a LinkedIn sharing panel with editable post text and a downloadable 1200 × 630 score card showing the selected presenter. Players copy the text and attach the card themselves in LinkedIn; the public conference URL is shared rather than a localhost address. Stuart’s `sheet-v3.png` alternates the two down-walking leg poses while retaining his ponytail.

Gameplay design pass: Standard starts at 100 health; Challenge starts at 70 with 20% shorter wave intervals. Presenters cycle through Eye, Potion, Lightning and Fast collector archetypes, configured in `src/run-design.ts`. Six scheduled phases include a coffee-break breather. Orange enemies periodically accelerate; eyes telegraph their direction before charging. Upgrade offers favour owned weapons and include one reroll per run. These timings and loadouts need human playtesting before final balance decisions.

The Hallucination Engine arrives at 2:00 with 8,000 health in Standard or 12,000 in Challenge. It is a single animated boss with no copies. It telegraphs a red charge every three seconds, with a 0.7-second warning and faster attacks below half health. Its core opens for 0.8 seconds after a charge; armour otherwise passes 8% damage. Defeating it awards 500 points. Runs end at exactly three minutes of active play: defeat the boss and survive to win; otherwise the timeout is a defeat. Pause and upgrade choices stop active time.

Orange enemies appear after 25 seconds, eyes after 90 seconds. Later phases have faster spawning and larger batches. The rescue blue cap appears at 1:50. The dog fetches nearby XP, distracts ordinary enemies with its bark, and bites exposed boss cores for bonus damage. Four measured walking poses use constant scale and foot anchoring. Settings are in `src/boss.ts`, `src/run-design.ts` and `src/config.ts`. Balance still needs human playtesting.

Eye and lightning targeting prioritise a living boss within weapon range; otherwise they use nearest-enemy ordering. Characters without the Eye weapon no longer fire eye projectiles. Standard and Challenge personal bests are stored separately under `loveai-best-standard` and `loveai-best-challenge`. The legacy mixed record is retained but not migrated because its mode is unknown. Menu, results and score-sharing text identify the selected difficulty.

UI polish (13 October 2026): reconfirmed the live loveAI colour tokens, National 2/Inter font stacks and pill buttons. Shared presentation rules unify selection, overlays, upgrade cards, HUD, results and score sharing; desktop and 390 × 844 browser layouts were inspected. Fonts use the website stacks with local fallbacks. Gameplay danger indicators retain pink/red for readability.

Boss crop repair: `scripts/measure-boss-frames.py` measures the four complete connected silhouettes instead of assuming equal-width sheet cells. Atlas rectangles include a two-pixel margin and measured torso/foot origins, preserving the source PNG. The development QA command `bossGallery` shows all four corrected poses.

Exploding Potions tuning is in `src/potion-weapon.ts`. Potions arc to target positions over 0.45 seconds, favour the boss, damage enemies in their splash radius and leave 2.2-second slowing puddles. Level five adds up to three secondary blasts per impact, without recursive explosions. Adam’s short-hair sheet is in `assets/character-edits/adam-short-hair/`; source artwork and his original portrait are retained.

Millie’s goth makeover uses the supplied portrait reference, with bangs, septum ring, black jacket and burgundy stripes. George wears jeans and a black band T-shirt with a simplified AMN tree logo. New sheets and portraits are in `assets/character-edits/millie-goth/` and `assets/character-edits/george-amn/`, with exact imagegen prompts retained. The override registry connects the edits to gameplay, selection and score cards. All twelve poses per character are measured from full source silhouettes; original artwork is retained.
