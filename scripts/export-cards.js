import fs from 'node:fs';
import {cards} from '../dist/model.js';
import {cardSVG} from '../dist/artwork.js';
fs.mkdirSync('dist/cards',{recursive:true});
for(const card of cards)fs.writeFileSync(`dist/cards/${card.id}.svg`,cardSVG(card));
fs.writeFileSync('dist/cards/card-back.svg',cardSVG(cards[0],true));
console.log(`Exported ${cards.length} card fronts and the shared back.`);
