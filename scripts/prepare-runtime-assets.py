"""Generate small runtime merchandise copies and office frame metadata.
Supplied source artwork is read-only. Resize with nearest-neighbour sampling.
"""
from pathlib import Path
import json
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'public/game-assets/merch';out.mkdir(parents=True,exist_ok=True)
stats={}
for name in ['chocolate-bar','blue-cap','sage-cap']:
 source=ROOT/'assets/merch-v1'/f'{name}.png';im=Image.open(source).convert('RGBA');size=(256,round(im.height*256/im.width));target=out/f'{name}.png';im.resize(size,Image.Resampling.NEAREST).save(target,optimize=True)
 stats[name]={'width':size[0],'height':size[1],'sourceBytes':source.stat().st_size,'runtimeBytes':target.stat().st_size};print(name,stats[name])
(out/'manifest.json').write_text(json.dumps(stats,indent=2)+'\n')
sheet=Image.open(ROOT/'assets/generated-v1/sheets/office_props.png').convert('RGBA')
regions={'square-planter':(0,380,330,720),'long-planter':(330,380,730,720),'glass-partition':(770,720,1180,1086),'event-sign':(1180,700,1448,1086)}
frames={}
for name,(l,t,r,b) in regions.items():
 box=sheet.crop((l,t,r,b)).getchannel('A').point(lambda a:255 if a>=128 else 0).getbbox();assert box
 x=max(l,l+box[0]-2);y=max(t,t+box[1]-2);right=min(r,l+box[2]+2);bottom=min(b,t+box[3]+2)
 frames[name]={'x':x,'y':y,'width':right-x,'height':bottom-y};print(name,frames[name])
(ROOT/'src/office-frames.json').write_text(json.dumps(frames,indent=2)+'\n')
