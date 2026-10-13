import {test} from 'node:test';import assert from 'node:assert/strict';
import {FlowField,valid,heal,eligible,xpNeeded} from './logic';
import {GAME,FURNITURE,type UpgradeId} from './config';
const obstacles=FURNITURE.map(([,x,y,,w,h])=>({x,y:y+15,w,h}));
test('chocolate and heart healing cap at maximum',()=>{assert.equal(heal(99,100,.25),100);assert.equal(heal(40,100,.25),65);assert.equal(heal(90,140,.15),111);});
test('furniture and window strip block foot movement',()=>{assert.equal(valid(770,150,obstacles),false);assert.equal(valid(215,295,obstacles),false);assert.equal(valid(770,580,obstacles),true);assert.equal(valid(20,580,obstacles),false);});
test('flow field reaches every valid spawn cell around furniture',()=>{const flow=new FlowField(obstacles);flow.rebuild(770,580);let reachable=0;for(let y=0;y<flow.rows;y++)for(let x=0;x<flow.cols;x++){const i=y*flow.cols+x;if(!flow.blocked[i]){assert.ok(flow.distances[i]>=0,`Unreachable ${x},${y}`);reachable++;}}assert.ok(reachable>700);});
test('upgrade pool excludes maxed weapons and all maxed upgrades',()=>{const levels={eye:5,orbit:5,lightning:5,damage:4,haste:4,count:3,speed:4,magnet:4,health:4} as Record<UpgradeId,number>;assert.equal(eligible(levels).length,0);levels.eye=4;assert.deepEqual(eligible(levels).map(u=>u.id),['eye']);});
test('XP cost grows and queued levels preserve remainder',()=>{let xp=100,level=1;while(xp>=xpNeeded(level)){xp-=xpNeeded(level);level++;}assert.equal(level,5);assert.equal(xp,18);assert.equal(xpNeeded(level),33);assert.equal(GAME.duration,180);});
