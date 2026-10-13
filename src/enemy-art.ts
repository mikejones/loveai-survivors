import measurements from './enemy-frames.json';
export type EnemyFrame={x:number;y:number;width:number;height:number;region:{left:number;top:number;right:number;bottom:number};opaqueBounds:number[]};
export const ENEMY_FRAMES:Record<string,EnemyFrame>=measurements;
export const ENEMY_SHEET='./assets/generated-v1/sheets/enemies_items.png';
// Match the previous artwork scale, independent of each pose's visible bounds.
export function enemyScale(tough:boolean){return (tough?66:56)/314;}
export function enemyPreviewStyle(id:string,height:number){
 const f=ENEMY_FRAMES[id],scale=height/f.height;
 return `width:${f.width*scale}px;height:${height}px;background-image:url('${ENEMY_SHEET}');background-repeat:no-repeat;background-size:${1254*scale}px ${1254*scale}px;background-position:${-f.x*scale}px ${-f.y*scale}px;image-rendering:pixelated`;
}
