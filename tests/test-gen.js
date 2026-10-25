const fs=require('fs'); const g=fs.readFileSync('src/04-check.js','utf8'); const gi='const KIND_EXT={},UI_EXT={};'+g.slice(g.indexOf('function gradeItem'), g.indexOf('function rawOf'));
eval(fs.readFileSync('src/01-math.js','utf8')+fs.readFileSync('src/02-data.js','utf8')+gi+fs.readFileSync('src/05-practice.js','utf8').replace(/VIEWS\.boss[\s\S]*/,'')+';globalThis.genTest=genTest;globalThis.gradeItem=gradeItem;globalThis.diagnose=diagnose;');
let allbad=0;
for(let seed=1;seed<=300;seed++){ const T=genTestU1(seed); const bad=[];
 for(const it of T.items){
   let ok; if(it.kind==='rel') ok=gradeItem(it,it.answer,null).ok; else if(it.kind==='expr') ok=gradeItem(it,it.var+'='+it.answer,null).ok; else if(it.kind==='num') ok=gradeItem(it,it.answer,null).ok; else if(it.kind==='choice') ok=gradeItem(it,String(it.correct[0]),null).ok; else if(it.kind==='order') ok=gradeItem(it,'012',null).ok; else if(it.kind==='triples') ok=gradeItem(it,it.want.map(x=>x+','+(x+1)+','+(x+2)).join(';'),null).ok; else ok=gradeItem(it,'',{lo:it.nl.lo,hi:it.nl.hi,loOpen:true,hiOpen:true}).ok;
   if(!ok) bad.push(it.id+' '+it.answer);
   for(const v of (it.variants||[])){ const raw=v.form?(it.kind==='expr'?it.var+'='+v.form:v.form):String(v.num); if(gradeItem(it,raw,null).ok) bad.push('variant==answer '+it.id+' '+raw); else if(!diagnose(it,raw,null)) bad.push('variant undiagnosed '+it.id+' '+raw); }
   if(it.kind==='num'&&!/^-?\d+(\.5)?$/.test(it.answer)) bad.push('unclean '+it.id+' '+it.answer);
   if(it.kind==='triples'&&(it.want.length<4||it.want.length>7)) bad.push('6c count '+it.want.length);
 }
 if(bad.length){ allbad++; console.log(seed, bad.join(' | ')); }
 if(seed<=3){ const T=genTestU1(seed); console.log('seed',seed, T.items.map(i=>i.id+'='+(i.show||'')).join(' ; ')); }
}
console.log('seeds with problems:',allbad,'/300');
