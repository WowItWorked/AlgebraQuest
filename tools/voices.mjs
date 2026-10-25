// Renders every scene line in src/06-learn.js to voices/<level>-<frame>.mp3 with Piper + ffmpeg,
// and writes src/09-voices.js (clip durations the player uses for timing).
// Usage: node tools/voices.mjs            (needs `piper` and `ffmpeg` on PATH)
// Models: set PIPER_VOICES to a folder holding the .onnx/.onnx.json files listed in CAST.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import {execFileSync} from 'node:child_process';
const ROOT=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const MODELS=process.env.PIPER_VOICES||path.join(ROOT,'tools','piper-models');
const OUT=path.join(ROOT,'voices'); fs.mkdirSync(OUT,{recursive:true});
const WARM='bass=g=4:f=140,equalizer=f=2500:t=q:w=1.2:g=2,acompressor=threshold=-20dB:ratio=3:attack=8:release=150:makeup=4,aecho=0.7:0.3:25:0.12,alimiter=limit=0.95';
const BOSS='bass=g=7:f=110,acompressor=threshold=-20dB:ratio=4:makeup=6,aecho=0.8:0.5:50|90:0.25|0.15,alimiter=limit=0.95';
const ROBOT='bass=g=2:f=160,equalizer=f=3200:t=q:w=1:g=3,acompressor=threshold=-20dB:ratio=3:makeup=4,aecho=0.6:0.25:14:0.28,alimiter=limit=0.95';
const CAST={
  coach:  {model:'en_US-norman-medium', pitch:0,  ls:0.97, fx:WARM},
  vera:   {model:'en_US-amy-medium',    pitch:2,  ls:0.95, fx:WARM},
  nine:   {model:'en_GB-alan-medium',   pitch:-5, ls:1.12, fx:BOSS},
  bar:    {model:'en_GB-northern_english_male-medium', pitch:-1, ls:1.0, fx:WARM},
  checker:{model:'en_US-ryan-high',     pitch:-1, ls:0.95, fx:ROBOT},
  jug:    {model:'en_US-kusal-medium',  pitch:1,  ls:0.95, fx:WARM},
};
// Load the content modules without the page: math, unit data, and the scene/mini-boss tables.
const read=f=>fs.readFileSync(path.join(ROOT,'src',f),'utf8');
const learn=read('06-learn.js'); const head=learn.slice(0,learn.indexOf('/* ---- Scene player'));
const mini1=learn.slice(learn.indexOf('const MINI='), learn.indexOf('UNITS.u1.SCENES='));
const r=read('11-u1r-learn.js'); const rhead=r.slice(0,r.indexOf('const EXPLAINERS_U1R')); const rmini=r.slice(r.indexOf('const MINI_U1R='), r.indexOf('UNITS.u1r.SCENES='));
const stubs='const esc=s=>String(s); const $=()=>null; const ding=()=>{}, thud=()=>{}; const numberLine=()=>null; var EXPLAINERS={}; const genTestU1=()=>null; const EXAMPLES_=null;';
const t=read('13-u1t.js');
const ctx=new Function(stubs+read('01-math.js')+read('02-data.js')+head.replace(/const (CHARS|SCENES)=/g,'var $1=')+mini1+read('10-u1r.js')+rhead+rmini+`UNITS.u1.EXPLAINERS=EXPLAINERS;`+t+`; return {UNITS, SCENES:{u1:SCENES,u1r:SCENES_U1R,u1t:SCENES_U1T}, MINI:{u1:MINI,u1r:MINI_U1R,u1t:MINI_U1T}};`)();
const {UNITS,SCENES:SCENESBY,MINI:MINIBY}=ctx;
function spoken(s){ return s.replace(/<sub>([^<]*)<\/sub>/g,' $1').replace(/<span class="fracbar[^"]*"[^>]*><span class="top">([^<]*)<\/span><span>([^<]*)<\/span><\/span>/g,' $1 over $2 ').replace(/<svg[\s\S]*?<\/svg>/g,' (see the graph) ').replace(/<[^>]+>/g,' ').replace(/½/g,' one half ').replace(/⅔/g,' two thirds ').replace(/¾/g,' three fourths ').replace(/¼/g,' one fourth ').replace(/⅓/g,' one third ').replace(/\bA\.M\./g,'A M').replace(/\bP\.M\./g,'P M').replace(/²/g,' squared ').replace(/π/g,' pi ').replace(/≤/g,' less than or equal to ').replace(/≥/g,' greater than or equal to ').replace(/&lt;|</g,' less than ').replace(/&gt;|>/g,' greater than ').replace(/[−–]/g,' minus ').replace(/÷/g,' divided by ').replace(/[·×]/g,' times ').replace(/½/g,' one half ').replace(/\bky\b/g,'k y').replace(/\bC\.F\.D\./g,'C F D').replace(/\s+/g,' ').trim(); }
const manifestPath=path.join(OUT,'manifest.json'); const manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{};
const durs={}; let made=0;
function render(id,text,c,outDir){
    const key=crypto.createHash('sha1').update(JSON.stringify([text,c])).digest('hex'); const mp3=path.join(outDir,id+'.mp3');
    if(manifest[id]?.key!==key||!fs.existsSync(mp3)){
      const raw=path.join(outDir,id+'.raw.wav');
      execFileSync('piper',['-m',path.join(MODELS,c.model+'.onnx'),'--length-scale',String(c.ls),'--noise-w-scale','0.9','--sentence-silence','0.25','-f',raw],{input:text+'\n',stdio:['pipe','ignore','ignore']});
      const chain=`asetrate=22050*2^(${c.pitch}/12),aresample=22050,atempo=1/2^(${c.pitch}/12),${c.fx}`;
      execFileSync('ffmpeg',['-loglevel','error','-y','-i',raw,'-af',chain,'-ac','1','-c:a','libmp3lame','-b:a','40k',mp3]);
      fs.unlinkSync(raw); made++;
    }
    const d=parseFloat(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',mp3]).toString());
    manifest[id]={key,sec:Math.round(d*100)/100}; return manifest[id].sec;
}
for(const uid of Object.keys(SCENESBY)){ const SCENES=SCENESBY[uid]; const prefix=UNITS[uid].voice||'';
 for(const lvl of Object.keys(SCENES)){
  SCENES[lvl].forEach((f,i)=>{
    const id=`${prefix}l${lvl}-${String(i+1).padStart(2,'0')}`; const c=CAST[f.who]; const text=spoken(f.say); durs[id]=render(id,text,c,OUT); });
 } }
/* Read-aloud: every Check item (with its problem stem) and every mini-boss question, read by Coach. */
const RA=path.join(OUT,'ra'); fs.mkdirSync(RA,{recursive:true}); const readText=s=>spoken(s).replace(/\b(\d+)\.\s/g,'$1. ').replace(/\(continued\)/g,'continued.').replace(/\(graph\)/g,'graph.');
for(const uid of Object.keys(UNITS)){ const u=UNITS[uid];
  u.ITEMS.forEach(it=>{ const P=u.PROBLEMS.find(x=>x.n===it.p)||{stem:''}; const stem=it.p? ((u.id==='u1'||u.id==='u1t')?P.stem:'') : ''; render(`ra-${uid}-${it.id}`, readText((stem?stem+' ':'')+it.prompt), CAST.coach, RA); });
  const MINI=MINIBY[uid]; for(const n of Object.keys(MINI)) MINI[n].forEach((q,i)=>render(`ra-${uid}-m${n}-${i+1}`, readText(q.prompt), CAST.coach, RA)); }
if(false){ for(const lvl of []){ [].forEach((f,i)=>{ const id='', c=null, text='';
  }); } }
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,1));
fs.writeFileSync(path.join(ROOT,'src','09-voices.js'),'/* generated by tools/voices.mjs: clip length in seconds per scene frame */\nconst VOICE_DUR='+JSON.stringify(durs)+';\n');
const total=Object.values(durs).reduce((a,b)=>a+b,0);
const sizeOf=d=>fs.readdirSync(d).filter(f=>f.endsWith('.mp3')).reduce((a,f)=>a+fs.statSync(path.join(d,f)).size,0);
console.log(`${Object.keys(durs).length} scene clips, ${fs.readdirSync(RA).length} read-aloud clips, ${made} rendered this run, ${Math.round(total)}s of scene audio, ${((sizeOf(OUT)+sizeOf(RA))/1024/1024).toFixed(2)} MB total`);
