# loveAI Survivors — starter art pack

41 individual PNG assets: 12 portrait tokens, 8 enemy frames, 8 pickups/weapon effects, 12 office props and one office background. Four complete source sheets are also included.

Made using built-in image generation from the supplied designer artwork and two office reference photos. Generated adaptations are not exact cutouts: review face likenesses, clothing and item details with the designers before using them publicly. The original designer sheet is retained in references/.

## Suggested use

Characters: display at roughly 48–64 pixels high, with bounce and tilt driven by code. Each portrait is a static bust. Ghost and orange enemies each have idle, left, right and hurt states; they are simple pose variants, not a complete directional animation system.

Pickups: lime gem for XP, heart for healing, potion for boosts. Eye and cauldron for weapon/upgrade icons. Energy projectile, lightning and impact for attacks.

Office props: place individually above the floor. Reception and lounge on the wood area; conference props on carpet; desks, tables and plants around the perimeter. Keep the middle open. Define compact collider rectangles around furniture bases. Sprite images include transparent margins; use manifest dimensions and centre anchors.

The background uses a fictional St Paul's view and venue-inspired architecture, not a reconstructed office plan. Keep movement below the window strip (approximately y=180) and within the side walls. It is a fixed backdrop, not a seamless tileset.

## Scope

This pack supports a first playable game. HUD bars, menus, text, lighting, shadows, particle trails and upgrade overlays can be drawn in Phaser. A dedicated boss, full-body walking sprites and a larger modular map would be later additions.

## Generation prompts

1. Characters: reproduce the twelve distinct reference busts on transparent background, four columns by three rows, preserving faces, hair and clothing in pixel art.
2. Enemies/items: four ghost poses, four orange creature poses, heart, potion, cauldron, eye, XP gem, energy projectile, lightning and impact on transparent background.
3. Office props: twelve separately placeable oak, orange/taupe and plant-filled office objects inspired by the photos, viewed from above on transparent background.
4. Background: open office floor with wood reception zone, carpet conference zone, pale tiles and north-facing windows with a stylised St Paul's skyline; no baked-in furniture or characters.

The prompt set above summarises the four generation requests.
