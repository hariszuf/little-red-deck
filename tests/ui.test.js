import {JSDOM} from 'jsdom';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const dom=new JSDOM(fs.readFileSync('dist/index.html','utf8'),{url:'https://example.com/',pretendToBeVisual:true});
const {window}=dom;for(const key of ['window','document','localStorage','location','history'])globalThis[key]=window[key];
window.scrollTo=()=>{};
window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
window.HTMLDialogElement.prototype.close=function(){this.open=false;};
vm.runInThisContext(fs.readFileSync('dist/vendor/qrcode.js','utf8'));
const pending=[];globalThis.setTimeout=(fn,delay)=>{if(delay===3100)pending.push(fn);return 1;};globalThis.clearTimeout=()=>{};
await import('../dist/app.js');
const click=s=>{const el=document.querySelector(s);assert.ok(el,`Missing ${s}`);el.click();};
click('#begin');for(let i=0;i<3;i++){click('[data-answer="0"]');click('#next');}
assert.match(document.querySelector('h1').textContent,/possibilities/);
assert.equal(document.querySelectorAll('.deck-stage .playing-card').length,6);
click('#draw-action');assert.ok(document.querySelector('#draw-action').disabled);pending.shift()();
click('#draw-action');assert.equal(document.querySelectorAll('#flip').length,1);click('#flip');
assert.equal(document.querySelector('#points').textContent,'10');assert.ok(JSON.parse(localStorage.getItem('lrd-v1')).personal);
click('#share');assert.ok(document.querySelector('.qr svg'));click('.close');
click('[data-nav="scan"]');click('[data-demo="kaya-toast"]');click('#collect');assert.equal(document.querySelector('#points').textContent,'20');
click('[data-nav="scan"]');click('[data-demo="kaya-toast"]');assert.match(document.querySelector('#collect').textContent,/Already/);click('#collect');assert.equal(document.querySelector('#points').textContent,'20');
for(const id of ['kopitiam','wet-market','beadwork','wayang']){click('[data-nav="scan"]');click('[data-kind="person"]');click(`[data-demo="${id}"]`);assert.match(document.querySelector('#modal-body').textContent,/Their card stays with them/);click('#collect');}
assert.equal(document.querySelector('#points').textContent,'110');assert.equal(document.querySelector('#count').textContent,'6/6');assert.ok(document.querySelector('.banner'));
click('[data-nav="scan"]');document.querySelector('#code').value='nonsense';click('#code-go');assert.match(document.querySelector('#scan-error').textContent,/isn’t part/);
click('#reset');click('#cancel-reset');assert.equal(document.querySelector('#points').textContent,'110');click('#reset');click('#confirm-reset');assert.equal(document.querySelector('#points').textContent,'0');
console.log('Interface checks passed: questionnaire, six-card shuffle, flip, QR sharing, place/person collection, duplicates, bonus, invalid code and reset.');
