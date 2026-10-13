export const GAME = { width:1536,height:1024,left:65,right:1470,top:205,bottom:960,duration:180,speed:210,health:100,startingHealth:70,invulnerability:1,collectRadius:100,enemyLimit:260,grid:32 };
export const WEAPONS = {eye:{max:5,damage:25,cooldown:.78,speed:520,range:520},orbit:{max:5,damage:17,cooldown:.6,radius:82},lightning:{max:5,damage:42,cooldown:1.6,range:420}};
export const PICKUPS={heart:{heal:.15,drop:.035},chocolate:{heal:.25,drop:.025},potion:{duration:10,damageMultiplier:1.5,drop:.025},shield:{duration:8,hits:3,drop:.012},dog:{duration:15,damage:24,cooldown:.85,collectRadius:105,drop:.012}};
export const DIFFICULTY={initialInterval:.9,minimumInterval:.15,orangeAfter:35,finalWave:150,enemySpeed:65,enemyHealth:30,contactDamage:10,enemyHurtDuration:.22,enemyDefeatEffectDuration:.14};
export const UPGRADES=[
 {id:'eye',name:'All-seeing eye',icon:'eye',max:5,description:'Stronger, faster targeted shots. At level 5: piercing beam.'},
 {id:'orbit',name:'Potion satellites',icon:'potion',max:5,description:'Unlock an orbiting potion. At level 5: a four-potion constellation.'},
 {id:'lightning',name:'Bright idea',icon:'lightning',max:5,description:'Strike nearby enemies. At level 5: chain lightning.'},
 {id:'damage',name:'More conviction',icon:'impact',max:4,description:'+20% damage across every weapon.'},
 {id:'haste',name:'Quick thinking',icon:'energy-projectile',max:4,description:'Attack cooldowns reduced by 12%.'},
 {id:'count',name:'Second opinion',icon:'eye',max:3,description:'+1 eye projectile and evolved beam target.'},
 {id:'speed',name:'Coffee break',icon:'potion',max:4,description:'+10% movement speed.'},
 {id:'magnet',name:'Networking',icon:'xp-gem',max:4,description:'+35 pixels of XP collection radius.'},
 {id:'health',name:'Staying power',icon:'heart',max:4,description:'+20 maximum health. Also restores 20 health.'}
] as const;
export type UpgradeId=typeof UPGRADES[number]['id'];
export const FURNITURE: [string,number,number,number,number,number][] = [
 ['reception-desk',215,280,210,155,65],['taupe-sofa',180,490,160,120,44],['orange-armchair',300,440,88,55,40],['cafe-table',270,575,95,60,48],
 ['coffee-counter',480,260,150,110,55],['work-desk',550,880,155,115,55],['work-desk',1020,880,155,115,55],
 ['conference-stage',1340,270,205,155,65],['conference-chairs',1310,435,115,75,70],['conference-chairs',1400,540,115,75,70],
 ['square-planter',90,725,85,48,40],['square-planter',1440,740,85,48,40],['long-planter',800,240,140,105,35],['event-sign',1130,250,90,45,35],['glass-partition',390,790,130,105,26]
];

export const EYE_ENEMY={after:120,maxAlive:6,initialChance:.10,finalChance:.24,hpMultiplier:8,speedMultiplier:.85,contactDamage:18,radius:38,xp:12,height:72};
