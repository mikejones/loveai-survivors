export const CONFERENCE_URL='https://loveholidays.ai/loveai';
export const LINKEDIN_SHARE_URL=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CONFERENCE_URL)}`;
export type RunScore={score:number;seconds:number;kills:number;level:number;character:string;victory:boolean;difficulty?:string;bossBonus?:number};
export function scorePost(run:RunScore){const time=`${Math.floor(run.seconds/60)}:${Math.floor(run.seconds%60).toString().padStart(2,'0')}`;return `I scored ${run.score.toLocaleString('en-GB')} in loveAI Survivors, playing as ${run.character}!\n\n${time} survived · ${run.kills} enemies cleared · Level ${run.level} · ${run.difficulty??'standard'}${run.victory?' · Conference saved!':''}${run.bossBonus?` · Boss defeated (+${run.bossBonus})`:''}\n\nCan you survive the overrun loveAI conference?\n${CONFERENCE_URL}\n\n#loveAI #AI`;}
export function scoreCard(run:RunScore,source:CanvasImageSource,frame:{x:number;y:number;width:number;height:number}){
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;const ctx=canvas.getContext('2d')!;
 ctx.fillStyle='#0374da';ctx.fillRect(0,0,1200,630);ctx.fillStyle='#024e94';ctx.fillRect(850,0,350,630);
 ctx.fillStyle='#dbf58a';ctx.font='900 64px "National 2", "Arial Black", Inter, Arial, sans-serif';ctx.fillText('loveAI Survivors',55,100);
 ctx.fillStyle='#fff';ctx.font='24px Inter, Arial, sans-serif';ctx.fillText(run.victory?'CONFERENCE SAVED':'MY CONFERENCE SURVIVAL RUN',58,151);
 ctx.fillStyle='#dbf58a';ctx.font='900 140px "National 2", "Arial Black", Inter, Arial, sans-serif';ctx.fillText(run.score.toLocaleString('en-GB'),52,322);
 ctx.fillStyle='#fff';ctx.font='30px Inter, Arial, sans-serif';ctx.fillText(`Playing as ${run.character}`,58,380);
 const time=`${Math.floor(run.seconds/60)}:${Math.floor(run.seconds%60).toString().padStart(2,'0')}`;
 ctx.font='25px Inter, Arial, sans-serif';ctx.fillText(`${time} survived  ·  ${run.kills} cleared  ·  Level ${run.level}`,58,429);
 ctx.fillStyle='#fff';ctx.font='24px Inter, Arial, sans-serif';ctx.fillText(`${(run.difficulty??'standard').toUpperCase()} MODE`,58,478);
 if(run.bossBonus){ctx.fillStyle='#dbf58a';ctx.font='24px Inter, Arial, sans-serif';ctx.fillText(`BOSS DEFEATED · +${run.bossBonus} BONUS`,58,519);}
 ctx.fillStyle='#dbf58a';ctx.font='24px Inter, Arial, sans-serif';ctx.fillText('loveholidays.ai/loveai',58,565);
 ctx.imageSmoothingEnabled=false;const height=340,width=height*frame.width/frame.height;ctx.drawImage(source,frame.x,frame.y,frame.width,frame.height,1025-width/2,180,width,height);
 ctx.fillStyle='#fff';ctx.font='23px Inter, Arial, sans-serif';ctx.textAlign='center';ctx.fillText(run.character,1025,562,300);
 return canvas;
}
