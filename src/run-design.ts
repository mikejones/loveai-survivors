import {UPGRADES,type UpgradeId} from './config';
export type Difficulty='standard'|'challenge';
export const LOADOUTS=[
 {name:'Eye specialist',weapon:'eye',perk:'Starts with Eye level 2',stat:null},
 {name:'Potion specialist',weapon:'orbit',perk:'Starts with Exploding Potions and +20% damage',stat:'damage'},
 {name:'Lightning specialist',weapon:'lightning',perk:'Starts with Lightning and faster attacks',stat:'haste'},
 {name:'Fast collector',weapon:'eye',perk:'Starts with +10% speed and wider collection',stat:'magnet'}
] as const;
export function loadout(index:number){return LOADOUTS[index%LOADOUTS.length];}
export function startingLevels(index:number):Record<UpgradeId,number>{const levels:Record<UpgradeId,number>={eye:0,orbit:0,lightning:0,damage:0,haste:0,count:0,speed:0,magnet:0,health:0};const kit=loadout(index);levels[kit.weapon]=kit.weapon==='eye'&&kit.stat===null?2:1;if(kit.stat)levels[kit.stat]=1;if(kit.name==='Fast collector')levels.speed=1;return levels;}
export function wave(seconds:number){if(seconds<30)return{name:'WELCOME SWARM',interval:.65,count:1};if(seconds<60)return{name:'FIRST RUSH',interval:.34,count:2};if(seconds<75)return{name:'COFFEE BREAK',interval:.65,count:1};if(seconds<120)return{name:'IDEAS MULTIPLY',interval:.25,count:3};if(seconds<150)return{name:'THE EYES ARRIVE',interval:.22,count:3};return{name:'FINAL WAVE',interval:.17,count:4};}
export function upgradeChoices(levels:Record<UpgradeId,number>,random= Math.random){const pool=UPGRADES.filter(u=>levels[u.id]<u.max);const chosen:typeof pool=[];while(pool.length&&chosen.length<3){const weights=pool.map(u=>['eye','orbit','lightning'].includes(u.id)&&levels[u.id]>0?4:1),total=weights.reduce((a,b)=>a+b,0);let roll=random()*total,index=0;for(;index<weights.length-1;index++){roll-=weights[index];if(roll<0)break;}chosen.push(pool.splice(index,1)[0]);}return chosen;}
