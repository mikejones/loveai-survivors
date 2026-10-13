"""Measure complete enemy poses inside the original sheet's actual row gaps.
No pixels or supplied files are modified. Hurt bubbles belong to their pose.
"""
from pathlib import Path
import json
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
im=Image.open(ROOT/'assets/generated-v1/sheets/enemies_items.png').convert('RGBA')
result={}
for row,(species,y0,y1) in enumerate([('ghost',0,365),('orange',365,655)]):
 for column,state in enumerate(['idle','left','right','hurt']):
  x0=round(column*im.width/4);x1=round((column+1)*im.width/4)
  alpha=im.crop((x0,y0,x1,y1)).getchannel('A')
  mask=alpha.point(lambda a:255 if a>=128 else 0);bbox=mask.getbbox();assert bbox
  left=max(x0,x0+bbox[0]-2);top=max(y0,y0+bbox[1]-2)
  right=min(x1,x0+bbox[2]+2);bottom=min(y1,y0+bbox[3]+2)
  result[f'{species}-{state}']={'x':left,'y':top,'width':right-left,'height':bottom-top,'region':{'left':x0,'top':y0,'right':x1,'bottom':y1},'opaqueBounds':[x0+bbox[0],y0+bbox[1],x0+bbox[2],y0+bbox[3]]}
  print(f'{species}-{state}',[left,top,right,bottom])
# The supplied eye item doubles as the larger late-run enemy. Its whole row is intact.
x0,y0,x1,y1=941,655,1254,950
box=im.crop((x0,y0,x1,y1)).getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox()
left=x0+box[0]-2;top=y0+box[1]-2;right=x0+box[2]+2;bottom=y0+box[3]+2
result['eye-idle']={'x':left,'y':top,'width':right-left,'height':bottom-top,'region':{'left':x0,'top':y0,'right':x1,'bottom':y1},'opaqueBounds':[x0+box[0],y0+box[1],x0+box[2],y0+box[3]]}
(ROOT/'src/enemy-frames.json').write_text(json.dumps(result,indent=2)+'\n')
