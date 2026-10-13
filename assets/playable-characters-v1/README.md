# loveAI playable characters

12 full-body pixel characters extrapolated from the original designer sheet using built-in image generation. The portraits remain for the selection screen. Outfits below the waist are inferred.

Each character has front/down, left, right and back/up views, with idle and two movement pose variants per direction. These are starter animation poses rather than hand-authored, perfectly alternating gait cycles. Some step variants are very similar. Use the supplied short idle/step sequence, plus a small game-driven bounce if desired.

## Files

- sheets/: 12 transparent PNG sheets, all normalised to 1152 × 1536; three columns by four rows; frame size 384 × 384.
- frames/: 144 individual transparent frame PNGs.
- original-sheets/: untouched generated sheets.
- all-characters.png: roster preview.
- manifest.json: character IDs, portrait mapping, frame files and directional animation indices.
- generation-prompts.json: exact prompts used.

## Integration

Load sheets as Phaser spritesheets with frameWidth and frameHeight 384. Rows are down, left, right, up. Columns are idle, step-a, step-b. Set the sprite origin to (0.5, 0.958333) so world coordinates align with the feet. Display at approximately 72–96 pixels high initially, and tune camera zoom to match the office props. Add a small foot collider rather than a whole-body collider.

The fourth character has one optional left movement pose facing right; its animation mapping deliberately skips that frame. Review likenesses and animation in-game before promotional release.

No held weapons are baked in: eye attacks, lightning, potions and upgraded effects can be independent objects, so any selected character can use any ability.
