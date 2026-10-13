import overrides from './character-art-overrides.json';
import {characterAnchors} from './character-alignment';
export const CHARACTER_ART_OVERRIDES:Record<string,{sheet:string;portrait:string;sheetWidth:number;sheetHeight:number}>=overrides;
export function characterSheet(id:string){return `./${CHARACTER_ART_OVERRIDES[id]?.sheet??`assets/playable-characters-v1/original-sheets/${id}.png`}`;}
export function editedCharacterPreviewStyle(id:string,size:number){
 const edit=CHARACTER_ART_OVERRIDES[id],a=characterAnchors[id][0],scale=size/Math.max(a.frameWidth,a.frameHeight);
 return `display:block;width:${a.frameWidth*scale}px;height:${a.frameHeight*scale}px;background-image:url('${characterSheet(id)}');background-repeat:no-repeat;background-size:${edit.sheetWidth*scale}px ${edit.sheetHeight*scale}px;background-position:${-a.source.x*scale}px ${-a.source.y*scale}px;image-rendering:pixelated`;
}
