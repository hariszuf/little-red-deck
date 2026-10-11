import {build} from 'esbuild';
await build({entryPoints:['src/landing.js'],bundle:true,minify:true,format:'iife',globalName:'LittleRedScene',outfile:'dist/landing.js',legalComments:'linked',target:['es2020']});
