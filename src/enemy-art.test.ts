import {test} from 'node:test';import assert from 'node:assert/strict';
import {ENEMY_FRAMES,enemyScale} from './enemy-art';
test('all nine enemy atlas frames retain their complete source silhouette',()=>{
 assert.equal(Object.keys(ENEMY_FRAMES).length,9);for(const f of Object.values(ENEMY_FRAMES)){const [l,t,r,b]=f.opaqueBounds;assert.ok(f.x<=l-2&&f.y<=t-2&&f.x+f.width>=r+2&&f.y+f.height>=b+2);assert.ok(f.x>=f.region.left&&f.y>=f.region.top&&f.x+f.width<=f.region.right&&f.y+f.height<=f.region.bottom);}
});
test('ghost tails crossing the old row cut are retained; orange tops exclude them',()=>{
 for(const state of ['idle','left','right','hurt']){const ghost=ENEMY_FRAMES[`ghost-${state}`],orange=ENEMY_FRAMES[`orange-${state}`];assert.ok(ghost.y+ghost.height>314);assert.ok(orange.y>365);assert.ok(ghost.y+ghost.height<orange.y);}
});
test('hurt particles are retained and artwork scale stays consistent',()=>{
 assert.ok(ENEMY_FRAMES['ghost-hurt'].y<100);assert.ok(ENEMY_FRAMES['orange-hurt'].y<390);assert.equal(enemyScale(true),66/314);assert.equal(enemyScale(false),56/314);
});
