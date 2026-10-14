export const BOSS={after:120,health:8000,challengeHealth:12000,height:130,bonus:500,pulseRadius:175,warning:.7,pulseDamage:30,contactDamage:32};
export function bossAttack(cycle:number){return 'charge';}
export function runScore(kills:number,level:number,seconds:number,bossDefeated:boolean){return kills*10+level*25+Math.floor(seconds)*2+(bossDefeated?BOSS.bonus:0);}

export function bossVulnerable(clock:number){return clock>.6&&clock<1.4;}

export function bossDamage(amount:number,clock:number){return amount*(bossVulnerable(clock)?1:.08);}
