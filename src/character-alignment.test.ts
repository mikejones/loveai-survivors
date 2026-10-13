import {test} from 'node:test';import assert from 'node:assert/strict';
import roster from '../assets/playable-characters-v1/manifest.json';
import {characterAnchors,characterOrigin,characterCrop,characterScale} from './character-alignment';
test('all 144 poses use complete rectangles from the original artwork',()=>{
 for(const c of roster.characters){assert.equal(characterAnchors[c.id].length,12);for(const a of characterAnchors[c.id]){assert.equal(a.y,a.bounds[3]);assert.ok(a.x>a.bounds[0]&&a.x<a.bounds[2]);assert.equal(a.source.width,a.frameWidth);assert.equal(a.source.height,a.frameHeight);assert.ok(a.bounds[1]>=2&&a.frameHeight-a.bounds[3]>=2,'Entire head and feet have transparent padding');}}
});
test('every idle and walking pose keeps its feet and torso at the same world anchor',()=>{
 for(const c of roster.characters)for(const animation of Object.values(c.animations))for(const i of [animation.idle,...animation.walk]){const a=characterAnchors[c.id][i],origin=characterOrigin(c.id,i),scale=characterScale(c.id);assert.equal(580+(a.y-origin.y*a.frameHeight)*scale,580);assert.equal(770+(a.x-origin.x*a.frameWidth)*scale,770);}
});
test('render crops retain the complete pose inside each variable-size frame',()=>{
 for(const c of roster.characters)for(let i=0;i<12;i++){const a=characterAnchors[c.id][i],crop=characterCrop(c.id,i),b=a.bounds;assert.ok(crop.x>=0&&crop.y>=0&&crop.x+crop.width<=a.frameWidth&&crop.y+crop.height<=a.frameHeight);assert.ok(crop.x<=b[0]&&crop.y<=b[1]&&crop.x+crop.width>=b[2]&&crop.y+crop.height>=b[3]);}
});
test('character 08 up-facing hair is recovered above the old row boundary',()=>{
 const a=characterAnchors['08-blue-shirt'][9];assert.ok(a.source.y<1086);assert.ok(a.source.y+a.source.height>1086);assert.ok(a.bounds[1]<5);assert.ok(a.bounds[3]-a.bounds[1]>270);
});
test('character scales remain constant between animation frames',()=>{
 for(const c of roster.characters){assert.ok(characterScale(c.id)>0);const b=characterAnchors[c.id][0].bounds;assert.equal((b[3]-b[1])*characterScale(c.id),68);}
});
