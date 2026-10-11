export const cards = [
 {id:'chicken-rice',name:'Hainanese chicken rice',theme:'Food',word:'Comfort',color:'#e6b967',reading:'You bring warmth to ordinary moments. Let simplicity be your strength: choose one thing that nourishes you, and give it your full attention.',story:'Hainanese migrants brought their food traditions to Singapore. Over time, local cooks shaped the fragrant rice, tender chicken and chilli into a familiar meal enjoyed across communities.',source:'https://www.roots.gov.sg/ich-landing/ich/chicken-rice',place:'A hawker centre'},
 {id:'kaya-toast',name:'Kaya toast',theme:'Food',word:'Beginnings',color:'#d89a70',reading:'A fresh start can be small. A familiar ritual may give you the steadiness to try something new. Make room for a gentle beginning today.',story:'Kaya toast, soft-boiled eggs and kopi form a familiar Singapore breakfast. The coconut-and-egg spread and toasted bread reflect a food culture shaped by exchange and adaptation.',source:'https://www.roots.gov.sg/ich-landing/ich/traditional-breakfast-of-kaya-and-kopi',place:'A breakfast stop'},
 {id:'kopitiam',name:'Kopitiam gathering',theme:'Everyday rituals',word:'Connection',color:'#86a292',reading:'You find possibility in people. Pause long enough to listen, and let a simple conversation become a bridge. Connection grows when you make space for it.',story:'The kopitiam is more than a place for coffee and toast. These everyday coffee shops make space for meals, conversation and the rhythms of neighbourhood life.',source:'https://www.roots.gov.sg/stories-landing/stories/beyond-kaya-toast/story',place:'A neighbourhood kopitiam'},
 {id:'wet-market',name:'Wet-market visit',theme:'Everyday rituals',word:'Exchange',color:'#a0aba0',reading:'You notice what others need. Give thoughtfully, but leave room to receive too. The strongest exchanges make everyday life a little better for both people.',story:'Singapore’s wet markets have changed alongside its neighbourhoods. Fresh produce, familiar stallholders and daily conversations connect the practical work of shopping with community life.',source:'https://biblioasia.nlb.gov.sg/all-sections/vol-18-issue-1-apr-to-jun-2022-singapore-changing-wet-markets/',place:'A wet market'},
 {id:'beadwork',name:'Nyonya beadwork',theme:'Arts',word:'Patience',color:'#a399ba',reading:'Your care lives in the details. A meaningful thing takes time to come together. Trust the small steps, and take pride in the work only you can see.',story:'Nyonya beadwork is part of Peranakan craft traditions. Tiny beads are carefully arranged into intricate patterns, including on beaded slippers known as kasut manek. Skill and patience carry the craft across generations.',source:'https://www.roots.gov.sg/ich-landing/ich/nyonya-beadwork-and-embroidery',place:'A craft encounter'},
 {id:'wayang',name:'Wayang kulit',theme:'Arts',word:'Perspective',color:'#c4a469',reading:'There is more than one way to see a story. Follow your curiosity beyond the first impression. A change of perspective may reveal an unexpected path.',story:'Wayang kulit brings stories to life through puppets, light and shadow. This performance tradition has deep regional roots and continues through the artistry of puppeteers and musicians.',source:'https://www.kaya.gov.sg/heritage/light-and-shadow--wayang-kulit-s-intangible-cultural-heritage/',place:'A storytelling encounter'}
];
export const blank = () => ({personal:null,owned:[],bonus:false});
export function acquire(state,id){
 if(!cards.some(c=>c.id===id)) throw new Error('Unknown card');
 if(state.owned.includes(id)) return {state,award:0,duplicate:true};
 const owned=[...state.owned,id], bonus=owned.length===6&&!state.bonus;
 return {state:{...state,owned,bonus:state.bonus||bonus},award:10+(bonus?50:0),duplicate:false};
}
export const points = state => state.owned.length*10+(state.bonus?50:0);
export function match(answers){return cards[answers.reduce((sum,n)=>sum+n,0)%6].id;}
export function parseCode(input){
 let code=input.trim();
 if (/^https?:\/\//i.test(code)) { try { const url=new URL(code); code=new URLSearchParams(url.hash.slice(1)).get('card')||''; } catch {} }
 const [kind,id]=code.split(':');
 if(!['place','person'].includes(kind)||!cards.some(c=>c.id===id)) throw new Error('That code isn’t part of this deck. Try a demo code below.');
 return {kind,id};
}
