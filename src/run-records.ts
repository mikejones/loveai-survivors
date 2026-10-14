import type {Difficulty} from './run-design';
type ScoreStorage=Pick<Storage,'getItem'|'setItem'>;
export function bestScore(storage:ScoreStorage,mode:Difficulty){try{const value=Number(storage.getItem(`loveai-best-${mode}`));return Number.isFinite(value)&&value>0?Math.floor(value):0;}catch{return 0;}}
export function saveBest(storage:ScoreStorage,mode:Difficulty,score:number){const best=Math.max(bestScore(storage,mode),score);try{storage.setItem(`loveai-best-${mode}`,String(best));}catch{}return best;}
export function targetOrder(a:{x:number;y:number;boss?:boolean},b:{x:number;y:number;boss?:boolean},x:number,y:number){return Number(!!b.boss)-Number(!!a.boss)||Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y);}
