const fs=require('fs'); const g=fs.readFileSync('src/04-check.js','utf8'); const gi='const KIND_EXT={},UI_EXT={};'+g.slice(g.indexOf('function gradeItem'), g.indexOf('function rawOf'));
const eng=fs.readFileSync('src/03-engine.js','utf8'); const eq=eng.slice(eng.indexOf('function equationEquiv'), eng.indexOf('function pickHint'));
const esc=s=>String(s);
eval(fs.readFileSync('src/01-math.js','utf8')+fs.readFileSync('src/02-data.js','utf8')+gi+eq+fs.readFileSync('src/10-u1r.js','utf8')+';globalThis.gen=UNITS.u1r.genTest;globalThis.gradeItem=gradeItem;globalThis.R_ITEMS=R_ITEMS;');
// 1. the real review answers grade as correct
let bad=[]; for(const it of R_ITEMS){ let ok; if(it.kind==='rel'||it.kind==='num'||it.kind==='eqn') ok=gradeItem(it,it.answer,null).ok; else if(it.kind==='expr') ok=gradeItem(it,it.var+'='+it.answer,null).ok; else if(it.kind==='choice') ok=gradeItem(it,String(it.correct[0]),null).ok; else if(it.kind==='intset') ok=gradeItem(it,it.want.join(','),null).ok; else if(it.kind==='time') ok=gradeItem(it,'3:00 PM',null).ok&&gradeItem(it,'3 pm',null).ok&&gradeItem(it,'15:00',null).ok&&!gradeItem(it,'3:00 AM',null).ok; else ok=gradeItem(it,'',{...it.nl,shape:it.nl.shape||'between'}).ok; if(!ok) bad.push(it.id); }
console.log('review answers graded correct:', bad.length?('FAIL '+bad.join(',')):'all 54 ok');
// alt forms
const alt=[['q18','4.375'],['q19','1 11/18'],['q24','-2.333333'],['q27b','b = (4/3)a - 5'],['q29','c = a/3 - 2/(3b)'],['q32','3 >= x >= -1'],['q34','x <= -2.25'],['q39','x<3 or x>4'],['q40','x<=24 and x<=-4'],['q41','x > 4 or x < -1.5'],['q43b','4 5 6'],['q21a','(7/3)c + 5.5 = 26.5'],['q31a','f = i + at']];
for(const [id,a] of alt){ const it=R_ITEMS.find(i=>i.id===id); if(!gradeItem(it,a,null).ok) console.log('FAIL alt',id,a); }
// wrong forms rejected
const wrong=[['q32','-1<x<3'],['q39','x>4 and x<3'],['q40','x<=24'],['q42','x>7/4'],['q43b','3,4,5,6'],['q37a','x>360'],['q43a','50<24.75+6.55c<65']];
for(const [id,a] of wrong){ const it=R_ITEMS.find(i=>i.id===id); if(gradeItem(it,a,null).ok) console.log('FAIL should reject',id,a); }
// 2. generator across seeds
let problems=0; for(let seed=1;seed<=300;seed++){ let T; try{ T=gen(seed);}catch(e){ console.log('seed',seed,'threw',e.message); problems++; continue; } if(T.items.length!==54){ console.log('seed',seed,'count',T.items.length); problems++; }
  for(const it of T.items){ let ok; try{ if(it.kind==='rel'||it.kind==='num'||it.kind==='eqn') ok=gradeItem(it,it.answer,null).ok; else if(it.kind==='expr') ok=gradeItem(it,it.var+'='+it.answer,null).ok; else if(it.kind==='choice') ok=gradeItem(it,String(it.correct[0]),null).ok; else if(it.kind==='intset') ok=gradeItem(it,it.want.join(','),null).ok; else if(it.kind==='time') ok=gradeItem(it,`${it.hour}:${String(it.minute).padStart(2,'0')}`,null).ok; else ok=gradeItem(it,'',{...it.nl,shape:it.nl.shape||'between'}).ok; }catch(e){ ok=false; console.log('seed',seed,it.id,'grade threw',e.message); }
    if(!ok){ problems++; if(problems<15) console.log('seed',seed,'FAIL',it.id,it.answer||it.show); }
    if(it.kind==='num'&&!/^-?\d+(\.\d+)?$|^-?\d+\/\d+$/.test(String(it.answer))){ problems++; console.log('seed',seed,'unclean',it.id,it.answer); }
    if(/NaN|undefined/.test(it.prompt+(it.answer===undefined?'':String(it.answer))+String(it.show))){ problems++; console.log('seed',seed,'NaN/undefined in',it.id); } } }
console.log('generator problems:',problems,'/300 seeds');
