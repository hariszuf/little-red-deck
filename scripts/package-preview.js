import fs from 'node:fs';
const read=path=>fs.readFileSync(path,'utf8');
const model=read('dist/model.js').replace(/^export /gm,'');
const app=read('dist/app.js').replace(/^import .*\n/gm,'');
const artwork=read('dist/artwork.js').replace(/^import .*\n/gm,'').replace(/^export /gm,'');
const html=read('dist/index.html').replace('<link rel="stylesheet" href="style.css">',`<style>${read('dist/style.css').replace('url(\"vendor/anton.woff2\")','url(\"data:font/woff2;base64,'+fs.readFileSync('dist/vendor/anton.woff2').toString('base64')+'\")')}</style>`).replace('<script src="vendor/qrcode.js"></script><script src="landing.js"></script><script type="module" src="app.js"></script>',`<script>${read('dist/vendor/qrcode.js')}</script><script>${read('dist/landing.js')}</script><script type="module">${model}\n${artwork}\n${app}</script>`);
fs.writeFileSync('prototype.html',html);
console.log('Created standalone prototype.html');
