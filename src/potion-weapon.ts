export function potionStats(level:number){return{damage:48*(1+(level-1)*.4),radius:70+(level-1)*12,throws:level>=5?3:level>=3?2:1,cooldown:1.15,puddleDuration:2.2,slow:.55,chainRadius:48};}
export function inSplash(x:number,y:number,tx:number,ty:number,radius:number){return Math.hypot(x-tx,y-ty)<=radius;}
