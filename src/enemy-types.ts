import {DIFFICULTY,EYE_ENEMY} from './config';
import {ENEMY_FRAMES,enemyScale} from './enemy-art';
export type EnemyKind='ghost'|'orange'|'eye';
export function chooseEnemyKind(seconds:number,roll:number,eyesAlive:number):EnemyKind{
 const eyeChance=seconds>=EYE_ENEMY.after&&eyesAlive<EYE_ENEMY.maxAlive?Math.min(EYE_ENEMY.finalChance,EYE_ENEMY.initialChance+(seconds-EYE_ENEMY.after)/60*(EYE_ENEMY.finalChance-EYE_ENEMY.initialChance)):0;
 if(roll<eyeChance)return 'eye';
 if(seconds>DIFFICULTY.orangeAfter&&roll<eyeChance+Math.min(.4,.1+seconds/600))return 'orange';
 return 'ghost';
}
export function enemyFrame(kind:EnemyKind,hurt=false){return kind==='eye'?'eye-idle':`${kind}-${hurt?'hurt':'idle'}`;}
export function enemyStats(kind:EnemyKind){
 if(kind==='eye')return{hpMultiplier:EYE_ENEMY.hpMultiplier,speedMultiplier:EYE_ENEMY.speedMultiplier,contactDamage:EYE_ENEMY.contactDamage,radius:EYE_ENEMY.radius,xp:EYE_ENEMY.xp,scale:EYE_ENEMY.height/ENEMY_FRAMES['eye-idle'].height};
 return{hpMultiplier:kind==='orange'?2.6:1,speedMultiplier:kind==='orange'?.8:1,contactDamage:DIFFICULTY.contactDamage,radius:26,xp:kind==='orange'?4:2,scale:enemyScale(kind==='orange')};
}
