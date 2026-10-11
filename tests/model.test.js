import test from 'node:test';
import assert from 'node:assert/strict';
import {cards,DECK_SIZE,blank,restore,acquire,points,parseCode,match} from '../dist/model.js';
import {cardSVG} from '../dist/artwork.js';
test('only the twenty-second unique card awards the completion bonus',()=>{
 let state=blank();
 for(const [i,c] of cards.entries()){
  const r=acquire(state,c.id);state=r.state;assert.equal(r.award,i===DECK_SIZE-1?60:10);
  const duplicate=acquire(state,c.id);assert.equal(duplicate.award,0);assert.deepEqual(duplicate.state,state);
  if(i===5)assert.equal(state.bonus,false);
 }
 assert.equal(points(state),270);assert.deepEqual(restore(state),state);
});
test('starter deck completion migrates without losing points or prematurely completing the new deck',()=>{
 const legacy={personal:'chicken-rice',owned:cards.slice(0,6).map(c=>c.id),bonus:true};
 let state=restore(legacy);assert.equal(state.version,2);assert.equal(state.bonus,false);assert.equal(state.legacyBonus,50);assert.equal(points(state),110);
 for(const c of cards.slice(6))state=acquire(state,c.id).state;
 assert.equal(points(state),320);assert.equal(state.bonus,true);assert.deepEqual(restore(state),state);
 assert.equal(acquire(restore(state),'five-foot-way').award,0);
});
test('incomplete legacy progress and reset do not gain the old bonus',()=>{
 const state=restore({personal:'kaya-toast',owned:['kaya-toast','kaya-toast','unknown'],bonus:false});
 assert.deepEqual(state.owned,['kaya-toast']);assert.equal(points(state),10);assert.equal(points(restore(blank())),0);assert.equal(restore(null).owned.length,0);
});
test('copying a card keeps the sender and recipient personal cards',()=>{
 const sender={...blank(),personal:'five-foot-way',owned:['five-foot-way']};
 const receiver={...blank(),personal:'kaya-toast',owned:['kaya-toast']};
 const copy=parseCode(`https://example.com/#card=person%3A${sender.personal}`);const result=acquire(receiver,copy.id).state;
 assert.equal(sender.owned.length,1);assert.equal(result.personal,'kaya-toast');assert.deepEqual(result.owned,['kaya-toast','five-foot-way']);
});
test('all 22 cards have distinct art, readable metadata and valid place and person codes',()=>{
 assert.equal(DECK_SIZE,22);assert.equal(new Set(cards.map(c=>c.id)).size,22);
 const art=new Set();for(const c of cards){assert.ok(c.title&&c.reading&&c.story&&c.source);assert.equal(new URL(c.source).protocol,'https:');const svg=cardSVG(c);assert.ok(svg.includes(c.name));assert.ok(!svg.includes('undefined'));art.add(svg);for(const kind of ['place','person'])assert.deepEqual(parseCode(`${kind}:${c.id}`),{kind,id:c.id});}assert.equal(art.size,22);
 assert.throws(()=>cardSVG({id:'unknown'}));
});
test('QR parsing rejects malformed and unknown codes',()=>{for(const s of ['https://example.com/','place:unknown','abc','friend:kaya-toast','person:laksa:extra'])assert.throws(()=>parseCode(s));});
test('every card is reachable through the three-question draft matching rule',()=>{
 const matches=new Set();for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++){const id=match([a,b,c]);assert.ok(cards.some(card=>card.id===id));assert.equal(match([a,b,c]),id);matches.add(id);}
 assert.equal(matches.size,22);assert.equal(match([0,0,0]),'chicken-rice');assert.throws(()=>match([0,0]));
});
