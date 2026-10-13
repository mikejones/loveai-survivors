"""Build a Phaser atlas of complete poses from untouched original artwork."""
from collections import deque
from pathlib import Path
from statistics import median
import json
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'assets/playable-characters-v1/manifest.json').read_text())
overrides=json.loads((ROOT/'src/character-art-overrides.json').read_text())
result={}
for c in manifest['characters']:
 source=ROOT/overrides[c['id']]['sheet'] if c['id'] in overrides else ROOT/'assets/playable-characters-v1/original-sheets'/f"{c['id']}.png"
 im=Image.open(source).convert('RGBA');w,h=im.size
 mask=bytearray(1 if a>=128 else 0 for a in im.getchannel('A').getdata());components=[]
 for start in range(len(mask)):
  if not mask[start]:continue
  mask[start]=0;q=deque([start]);points=[]
  while q:
   i=q.popleft();points.append(i);x,y=i%w,i//w
   for dx,dy in ((-1,0),(1,0),(0,-1),(0,1),(-1,-1),(1,-1),(-1,1),(1,1)):
    nx,ny=x+dx,y+dy
    if 0<=nx<w and 0<=ny<h:
     n=ny*w+nx
     if mask[n]:mask[n]=0;q.append(n)
  if len(points)>1000:components.append(points)
 components=sorted(components,key=len,reverse=True)[:12];assert len(components)==12,c['id']
 components.sort(key=lambda p:min(i//w for i in p))
 ordered=[]
 for row in range(4):ordered.extend(sorted(components[row*3:row*3+3],key=lambda p:sum(i%w for i in p)/len(p)))
 poses=[]
 for points in ordered:
  left=min(i%w for i in points);right=max(i%w for i in points)+1;top=min(i//w for i in points);bottom=max(i//w for i in points)+1
  sx=max(0,left-2);sy=max(0,top-2);fw=min(w,right+2)-sx;fh=min(h,bottom+2)-sy
  rows={}
  for i in points:rows.setdefault(i//w,[]).append(i%w)
  center=round(median((min(rows[y])+max(rows[y])+1)/2 for y in range(top+round((bottom-top)*.35),top+round((bottom-top)*.55)) if y in rows))
  poses.append({'x':center-sx,'y':bottom-sy,'bounds':[left-sx,top-sy,right-sx,bottom-sy],'source':{'x':sx,'y':sy,'width':fw,'height':fh},'frameWidth':fw,'frameHeight':fh})
 result[c['id']]=poses;print(c['id'], '12 complete poses')
(ROOT/'src/character-alignment.json').write_text(json.dumps(result,indent=2)+'\n')
