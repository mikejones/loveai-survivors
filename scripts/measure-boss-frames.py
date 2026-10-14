"""Measure complete connected boss poses; never modify the artwork."""
from PIL import Image
from collections import deque
from pathlib import Path
import json
im=Image.open('public/game-assets/boss/hallucination-engine-walk.png').convert('RGBA')
w,h=im.size;a=im.getchannel('A');seen=bytearray(w*h);poses=[]
for y in range(h):
 for x in range(w):
  idx=y*w+x
  if seen[idx] or a.getpixel((x,y))<128:continue
  seen[idx]=1;q=deque([(x,y)]);pts=[]
  while q:
   px,py=q.popleft();pts.append((px,py))
   for nx,ny in [(px-1,py),(px+1,py),(px,py-1),(px,py+1)]:
    if 0<=nx<w and 0<=ny<h and not seen[ny*w+nx] and a.getpixel((nx,ny))>=128:
     seen[ny*w+nx]=1;q.append((nx,ny))
  if len(pts)>10000:poses.append(pts)
assert len(poses)==4
poses.sort(key=lambda pts:min(p[0] for p in pts));frames=[]
for pts in poses:
 x=min(p[0] for p in pts);y=min(p[1] for p in pts);r=max(p[0] for p in pts)+1;b=max(p[1] for p in pts)+1
 torso=[p[0] for p in pts if y+70<=p[1]<=y+170]
 anchor=(min(torso)+max(torso))/2
 left=max(0,x-2);top=max(0,y-2);right=min(w,r+2);bottom=min(h,b+2)
 frames.append(dict(x=left,y=top,width=right-left,height=bottom-top,originX=(anchor-left)/(right-left),originY=(b-top)/(bottom-top),opaqueBounds=[x,y,r,b]))
Path('src/boss-frames.json').write_text(json.dumps(dict(width=w,height=h,frames=frames),indent=2)+'\n')
print('Measured four complete boss silhouettes with 2px margins')
