import measurements from './character-alignment.json';

export type FrameAnchor = {x:number;y:number;bounds:number[];frameWidth:number;frameHeight:number;source:{x:number;y:number;width:number;height:number}};
export const characterAnchors: Record<string,FrameAnchor[]> = measurements;

// These are coordinates inside variable-sized atlas rectangles from untouched original sheets.
// Anchor the main silhouette, never detached fragments from adjacent sheet rows.
export function characterOrigin(id:string,frame:number){
 const anchor=characterAnchors[id]?.[frame];
 if(!anchor)throw new Error(`Missing character anchor: ${id}, frame ${frame}`);
 return {x:anchor.x/anchor.frameWidth,y:anchor.y/anchor.frameHeight};
}

// Crop rendering, not source pixels. Two pixels preserve the soft outer edge
// without showing detached pieces of the preceding/following sprite-sheet row.
export function characterCrop(id:string,frame:number){
 const bounds=characterAnchors[id]?.[frame]?.bounds;
 if(!bounds)throw new Error(`Missing character crop: ${id}, frame ${frame}`);
 const x=Math.max(0,bounds[0]-2),y=Math.max(0,bounds[1]-2);
 return {x,y,width:Math.min(characterAnchors[id][frame].frameWidth,bounds[2]+2)-x,height:Math.min(characterAnchors[id][frame].frameHeight,bounds[3]+2)-y};
}

export function characterScale(id:string){const b=characterAnchors[id][0].bounds;return 68/(b[3]-b[1]);}
