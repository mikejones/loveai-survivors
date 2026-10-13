"""Measure sprite anchors without changing supplied artwork.

Detached pixels are excluded from measurement by selecting the largest connected
opaque component. Feet use its bottom edge; horizontal alignment uses the median
centre of upper torso rows, avoiding swinging hands and raised feet.
"""
from collections import deque
from pathlib import Path
from statistics import median
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'assets/playable-characters-v1/manifest.json').read_text())
result = {}
for character in manifest['characters']:
    sheet = Image.open(ROOT / 'assets/playable-characters-v1' / character['sheet']).convert('RGBA')
    anchors = []
    for frame in range(12):
        x, y = frame % 3 * 384, frame // 3 * 384
        alpha = sheet.crop((x, y, x + 384, y + 384)).getchannel('A')
        opaque = bytearray(1 if a >= 128 else 0 for a in alpha.getdata())
        largest = []
        for start in range(len(opaque)):
            if not opaque[start]:
                continue
            opaque[start] = 0
            queue = deque([start])
            component = []
            while queue:
                i = queue.popleft()
                component.append(i)
                ix, iy = i % 384, i // 384
                for dx, dy in ((-1,0),(1,0),(0,-1),(0,1),(-1,-1),(1,-1),(-1,1),(1,1)):
                    nx, ny = ix + dx, iy + dy
                    if 0 <= nx < 384 and 0 <= ny < 384:
                        n = ny * 384 + nx
                        if opaque[n]:
                            opaque[n] = 0
                            queue.append(n)
            if len(component) > len(largest):
                largest = component
        assert len(largest) > 1000, (character['id'], frame)
        rows = {}
        for i in largest:
            rows.setdefault(i // 384, []).append(i % 384)
        top, bottom = min(rows), max(rows) + 1
        torso_top = top + round((bottom - top) * .35)
        torso_bottom = top + round((bottom - top) * .55)
        center = round(median((min(rows[r]) + max(rows[r]) + 1) / 2
                              for r in range(torso_top, torso_bottom) if r in rows))
        anchors.append({'x': center, 'y': bottom, 'bounds': [min(i % 384 for i in largest), top, max(i % 384 for i in largest) + 1, bottom]})
    result[character['id']] = anchors
    print(character['id'], 'feet:', [a['y'] for a in anchors])
(ROOT / 'src/character-alignment.json').write_text(json.dumps(result, indent=2) + '\n')
