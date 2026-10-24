#!/bin/bash
# Concatenates src/ into the single-file artifact algebra-quest.html and syntax-checks the script.
cd "$(dirname "$0")"
{ cat src/00-head.html; echo '<script>'; cat src/01-math.js src/02-data.js src/03-engine.js src/04-check.js src/05-practice.js src/06-learn.js src/07-parent.js src/08-main.js; echo '</script>'; } > algebra-quest.html
node -e "
const fs=require('fs');const src=fs.readFileSync('algebra-quest.html','utf8');const m=src.match(/<script>([\s\S]*)<\/script>/);
try{ new Function(m[1]); console.log('JS parses OK,', (src.length/1024).toFixed(0)+' KB'); }catch(e){ console.error('PARSE ERROR',e.message); process.exit(1); }"
