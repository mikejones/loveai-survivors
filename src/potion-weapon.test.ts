import {test} from 'node:test';import assert from 'node:assert/strict';import {potionStats,inSplash} from './potion-weapon';
test('potions scale damage, area and throws through evolution',()=>{const base=potionStats(1),evolved=potionStats(5);assert.ok(evolved.damage>base.damage);assert.ok(evolved.radius>base.radius);assert.equal(base.throws,1);assert.equal(evolved.throws,3);assert.ok(base.slow<1);});
test('splash includes near enemies and excludes distant enemies',()=>{assert.equal(inSplash(3,4,0,0,5),true);assert.equal(inSplash(6,0,0,0,5),false);});
