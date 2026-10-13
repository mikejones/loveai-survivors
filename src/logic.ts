import { GAME,UPGRADES, type UpgradeId } from './config';
export type Rect={x:number,y:number,w:number,h:number};
export function valid(x:number,y:number,obstacles:Rect[],padding=12){return x>=GAME.left+padding&&x<=GAME.right-padding&&y>=GAME.top+padding&&y<=GAME.bottom-padding&&!obstacles.some(r=>Math.abs(x-r.x)<r.w/2+padding&&Math.abs(y-r.y)<r.h/2+padding);}
export function heal(hp:number,max:number,fraction:number){return Math.min(max,hp+max*fraction);}
export function xpNeeded(level:number){return 8+level*5;}
export function eligible(levels:Record<UpgradeId,number>){return UPGRADES.filter(u=>levels[u.id]<u.max);}
// A shared breadth-first flow field makes swarm navigation linear, rather than one path search per enemy.
export class FlowField {
 cols=Math.ceil(GAME.width/GAME.grid); rows=Math.ceil(GAME.height/GAME.grid); distances=new Int16Array(this.cols*this.rows); blocked=new Uint8Array(this.cols*this.rows);
 constructor(obstacles:Rect[]){for(let y=0;y<this.rows;y++)for(let x=0;x<this.cols;x++)this.blocked[y*this.cols+x]=valid((x+.5)*GAME.grid,(y+.5)*GAME.grid,obstacles,20)?0:1;}
 index(x:number,y:number){return Math.max(0,Math.min(this.rows-1,Math.floor(y/GAME.grid)))*this.cols+Math.max(0,Math.min(this.cols-1,Math.floor(x/GAME.grid)));}
 rebuild(x:number,y:number){this.distances.fill(-1);const start=this.index(x,y),queue=[start];this.distances[start]=0;for(let head=0;head<queue.length;head++){const i=queue[head];for(const n of [i-1,i+1,i-this.cols,i+this.cols]){if(n<0||n>=this.distances.length||Math.abs(n%this.cols-i%this.cols)>1||this.blocked[n]||this.distances[n]>=0)continue;this.distances[n]=this.distances[i]+1;queue.push(n);}}}
 target(x:number,y:number,px:number,py:number){const i=this.index(x,y);let best=i;for(const n of [i-1,i+1,i-this.cols,i+this.cols])if(n>=0&&n<this.distances.length&&Math.abs(n%this.cols-i%this.cols)<=1&&this.distances[n]>=0&&(this.distances[best]<0||this.distances[n]<this.distances[best]))best=n;return this.distances[i]<3?{x:px,y:py}:{x:(best%this.cols+.5)*GAME.grid,y:(Math.floor(best/this.cols)+.5)*GAME.grid};}
}
