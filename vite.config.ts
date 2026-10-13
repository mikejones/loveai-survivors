import {defineConfig} from 'vite';
import {mkdirSync,copyFileSync} from 'node:fs';
import {dirname} from 'node:path';
import art from './assets/generated-v1/manifest.json';
import characters from './assets/playable-characters-v1/manifest.json';
import merch from './assets/merch-v1/manifest.json';
import overrides from './src/character-art-overrides.json';
export default defineConfig({base:'./',plugins:[{name:'copy-game-assets',closeBundle(){const edits=Object.values(overrides).flatMap(e=>[e.sheet,e.portrait]);const files=[...edits,'assets/generated-v1/sheets/enemies_items.png','assets/generated-v1/sheets/office_props.png',...art.files.map(f=>`assets/generated-v1/${f.file}`),...characters.characters.flatMap(c=>[`assets/playable-characters-v1/original-sheets/${c.id}.png`,`assets/playable-characters-v1/${c.frames[0].file}`]),...merch.files.filter(f=>f.id==='dog-companion').map(f=>`assets/merch-v1/${f.file}`)];for(const f of files){mkdirSync(dirname(`dist/${f}`),{recursive:true});copyFileSync(f,`dist/${f}`);}}}],build:{chunkSizeWarningLimit:1700},server:{host:'0.0.0.0'}});
