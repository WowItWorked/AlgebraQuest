/* ===== Engine: state, persistence, routing, HUD, lobby, gate ===== */
const $ = (s,el=document)=>el.querySelector(s);
const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const h = (strings,...vals)=>strings.reduce((o,s,i)=>o+s+(i<vals.length?vals[i]:''),'');

const BADGES = [
  {id:'first', name:'First Coin', ico:'🪙', how:'Get any answer right.'},
  {id:'respawn', name:'Comeback Kid', ico:'🔁', how:'Get one right after a respawn.'},
  {id:'check_all', name:'Checked Out', ico:'✅', how:'Clear all 19 parts in Check My Answers.'},
  {id:'letters', name:'Letter Wrangler', ico:'🔤', how:'Clear all four parts of Problem 3.'},
  {id:'fraction', name:'Bar Tamer', ico:'➗', how:'Clear 3c and 3d.'},
  {id:'nine', name:'Beat Negative Nine', ico:'🙃', how:'Clear Level 2 and Level 5.'},
  {id:'l1',name:'Level 1 Clear',ico:'🚩',how:'Clear every checkpoint in Level 1.'},{id:'l2',name:'Level 2 Clear',ico:'🚩',how:'Clear every checkpoint in Level 2.'},{id:'l3',name:'Level 3 Clear',ico:'🚩',how:'Clear every checkpoint in Level 3.'},{id:'l4',name:'Level 4 Clear',ico:'🚩',how:'Clear every checkpoint in Level 4.'},{id:'l5',name:'Level 5 Clear',ico:'🚩',how:'Clear every checkpoint in Level 5.'},{id:'l6',name:'Level 6 Clear',ico:'🚩',how:'Clear every checkpoint in Level 6.'},
  {id:'boss', name:'Boss Slayer', ico:'👑', how:'Score 80% or more on the Final Boss.'},
  {id:'perfect', name:'Flawless', ico:'💎', how:'A perfect Final Boss run.'},
];

const State = {
  s:{coins:0, badges:{}, checks:{}, learn:{}, attempts:[], muted:false, voice:true},
  mode:'public', uid:null, db:null, sample:null, user:null, ready:false, unlocked:false,
  listeners:new Set(),
  on(fn){this.listeners.add(fn);}, emit(){this.listeners.forEach(f=>f());},
  _t:null,
  save(){ renderHUD(); if(!this.db||!this.uid) return; clearTimeout(this._t); this._t=setTimeout(()=>this.flush(),700); },
  async flush(){ if(!this.db||!this.uid) return; try{ const {attempts,...rest}=this.s; await this.db.doc('data/users/'+this.uid+'/profile').set({...rest, updatedAt:Date.now()}); }catch(e){ console.warn('save failed',e); } },
  addCoins(n,why){ this.s.coins+=n; toast(`+${n} coins${why?' · '+why:''}`); ding(); if(!this.s.badges.first) this.award('first'); this.save(); },
  award(id){ if(this.s.badges[id]) return; this.s.badges[id]=Date.now(); const b=BADGES.find(x=>x.id===id); toast(`🏅 Badge: ${b?b.name:id}`); this.save(); },
};

/* audio: tiny ding, no assets */
let actx=null; function ding(){ if(State.s.muted) return; try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(), g=actx.createGain(); o.type='square'; o.frequency.setValueAtTime(880,actx.currentTime); o.frequency.setValueAtTime(1320,actx.currentTime+.08); g.gain.setValueAtTime(.06,actx.currentTime); g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.25); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+.26);}catch(e){} }
function thud(){ if(State.s.muted) return; try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(), g=actx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(220,actx.currentTime); o.frequency.exponentialRampToValueAtTime(90,actx.currentTime+.2); g.gain.setValueAtTime(.08,actx.currentTime); g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.25); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+.26);}catch(e){} }

function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; $('#toasts').appendChild(t); setTimeout(()=>t.remove(),2600); }
function modal(html, actions){ const m=document.createElement('div'); m.className='modal'; m.innerHTML=`<div class="block" role="dialog" aria-modal="true"><div class="stack">${html}<div class="row" id="mact"></div></div></div>`; actions.forEach(a=>{ const b=document.createElement('button'); b.className='btn '+(a.cls||''); b.textContent=a.label; b.onclick=()=>{ m.remove(); a.fn&&a.fn(); }; $('#mact',m).appendChild(b); }); document.body.appendChild(m); return m; }

/* ---- avatar + course ---- */
function avatarSVG(){ return `<svg viewBox="0 0 34 46" aria-hidden="true"><rect x="7" y="2" width="20" height="18" fill="#f3c08a" stroke="#1d2733" stroke-width="3"/><rect x="7" y="2" width="20" height="6" fill="#5a3b1e"/><rect x="12" y="10" width="3" height="3" fill="#1d2733"/><rect x="20" y="10" width="3" height="3" fill="#1d2733"/><rect x="13" y="15" width="8" height="2" fill="#1d2733"/><rect x="5" y="21" width="24" height="14" fill="#2fb37a" stroke="#1d2733" stroke-width="3"/><rect x="1" y="21" width="4" height="12" fill="#f3c08a" stroke="#1d2733" stroke-width="2"/><rect x="29" y="21" width="4" height="12" fill="#f3c08a" stroke="#1d2733" stroke-width="2"/><rect x="7" y="35" width="8" height="9" fill="#3a56a8" stroke="#1d2733" stroke-width="2"/><rect x="19" y="35" width="8" height="9" fill="#3a56a8" stroke="#1d2733" stroke-width="2"/></svg>`; }
function courseHTML(checkpoints, clearedCount, color){
  // checkpoints: array of labels. avatar sits at index clearedCount (0 = start)
  const n=checkpoints.length; const xs=checkpoints.map((_,i)=>8+ (84*(i+1))/n);
  let svg=`<svg viewBox="0 0 100 40" preserveAspectRatio="none">`;
  svg+=`<rect x="0" y="30" width="100" height="10" fill="var(--grass)" stroke="var(--ink)" stroke-width=".6"/>`;
  xs.forEach((x,i)=>{ const done=i<clearedCount; svg+=`<rect x="${x-4}" y="${22-(i%2)*3}" width="8" height="${8+(i%2)*3}" fill="${done?'var(--ok)':'var(--dirt)'}" stroke="var(--ink)" stroke-width=".5"/><line x1="${x}" y1="${22-(i%2)*3}" x2="${x}" y2="${12-(i%2)*3}" stroke="var(--ink)" stroke-width=".6"/><rect x="${x}" y="${12-(i%2)*3}" width="6" height="4" fill="${done?color:'var(--line)'}" stroke="var(--ink)" stroke-width=".4"/>`; });
  svg+=`</svg>`;
  const ax = clearedCount===0? 4 : xs[Math.min(clearedCount,n)-1];
  const labels = checkpoints.map((c,i)=>`<span style="position:absolute;left:${xs[i]}%;transform:translateX(-50%);bottom:-2px;font-size:.68rem;font-weight:900;color:${i<clearedCount?'var(--ok)':'var(--muted)'};white-space:nowrap">${esc(c)}</span>`).join('');
  return `<div class="course" aria-hidden="true">${svg}<div class="avatar" style="left:${ax}%">${avatarSVG()}</div>${labels}</div>`;
}

/* ---- routing ---- */
const VIEWS = {};
let route = {view:'lobby', arg:null};
function go(view,arg=null){ route={view,arg}; try{ history.replaceState(null,'', '#'+(arg!==null?view+arg:view)); }catch(e){} render(); window.scrollTo({top:0}); }
function render(){
  const app=$('#app'); const v=VIEWS[route.view]||VIEWS.lobby; app.innerHTML=''; v(app,route.arg); renderHUD();
}
function renderHUD(){
  $('#coinCount').textContent=State.s.coins; $('#badgeCount').textContent=Object.keys(State.s.badges).length;
  const tabs=[['lobby','Lobby'],['learn','Learn'],['check','Check'],['boss','Final Boss']];
  $('#nav').innerHTML=tabs.map(([k,l])=>`<button class="tab" data-v="${k}" aria-current="${route.view===k||(k==='learn'&&route.view==='level')?'page':'false'}">${l}</button>`).join('');
  $('#nav').querySelectorAll('.tab').forEach(b=>b.onclick=()=>go(b.dataset.v));
}
function learnLink(n){ const L=LEVELS[n-1]; return `<a href="#level${n}" data-go="level" data-arg="${n}">→ Level ${n}: ${esc(L.title)}</a>`; }
document.addEventListener('click',e=>{ const a=e.target.closest('[data-go]'); if(a){ e.preventDefault(); go(a.dataset.go, a.dataset.arg?+a.dataset.arg:null); } });

/* ---- Lobby ---- */
VIEWS.lobby = (app)=>{
  const checkDone=ITEMS.filter(i=>State.s.checks[i.id]&&State.s.checks[i.id].correct).length;
  const best=State.s.attempts.length? Math.max(...State.s.attempts.map(a=>a.pct)) : null;
  app.innerHTML=h`
  <div class="stack">
   <div class="block" style="background:linear-gradient(135deg,var(--panel),var(--panel2))">
    <p class="eyebrow">Spawn lobby</p>
    <h1>Pick a portal.</h1>
    <p style="margin-top:6px">Six Learn levels are obbies: clear checkpoints, earn coins. <b>Check My Answers</b> grades your real practice test. The <b>Final Boss</b> is a fresh test with new numbers. Wrong answers just respawn you at the last checkpoint. No lives, no penalty.</p>
    <div class="row" style="margin-top:12px">
      <button class="btn" data-go="check">Check My Answers</button>
      <button class="btn gold" data-go="boss">Fight the Final Boss</button>
      <button class="btn alt sm" id="muteBtn">${State.s.muted?'🔇 Sound off':'🔊 Sound on'}</button>
    </div>
   </div>
   <div class="grid" id="portals">
    ${LEVELS.map(L=>{ const p=levelProgress(L.n); return `<button class="portal" style="--pc:${L.color}" data-go="level" data-arg="${L.n}"><div class="band"></div><span class="lvl">LEVEL ${L.n}</span><h3>${esc(L.title)}</h3><p class="muted" style="font-size:.9rem">${esc(L.blurb)}</p><div class="prog"><i style="width:${Math.round(100*p.done/p.total)}%"></i></div><span class="muted" style="font-size:.8rem">${p.done}/${p.total} checkpoints</span>${p.done===p.total?'<span class="done">CLEAR</span>':''}</button>`; }).join('')}
    <button class="portal big" data-go="check" style="--pc:var(--accent)"><div style="flex:1;min-width:200px"><span class="lvl">CHECK MY ANSWERS</span><h3>Your practice test, graded live</h3><p class="muted" style="font-size:.9rem">19 parts. Type an answer, get coins or a hint. Hints never give the answer.</p></div><div style="min-width:160px;flex:1"><div class="prog"><i style="width:${Math.round(100*checkDone/ITEMS.length)}%"></i></div><span class="muted" style="font-size:.8rem">${checkDone}/${ITEMS.length} cleared</span></div></button>
    <button class="portal big" data-go="boss" style="--pc:var(--gold)"><div style="flex:1;min-width:200px"><span class="lvl" style="color:var(--bad)">FINAL BOSS</span><h3>Fresh test, new numbers, same moves</h3><p class="muted" style="font-size:.9rem">No feedback until you hit Grade. Retake as many times as you like.</p></div><div style="min-width:160px;flex:1"><span class="muted" style="font-size:.85rem">${best===null?'No runs yet':`Best run: <b class="num">${best}%</b> · ${State.s.attempts.length} run${State.s.attempts.length===1?'':'s'}`}</span></div></button>
   </div>
   <div class="block soft"><p class="eyebrow">Badges</p><div class="row" style="margin-top:8px">${BADGES.map(b=>`<span class="badge ${State.s.badges[b.id]?'got':''}" title="${esc(b.how)}"><span class="ico">${b.ico}</span>${esc(b.name)}</span>`).join('')}</div></div>
  </div>`;
  $('#muteBtn').onclick=()=>{ State.s.muted=!State.s.muted; State.save(); render(); };
};
function levelProgress(n){ const L=State.s.learn['l'+n]||{}; const keys=['explainer','video','q1','q2','q3'].filter(k=>k!=='q3'||LEVEL_DEFS[n-1].boss.length>2); return {done:keys.filter(k=>L[k]).length,total:keys.length}; }

/* ---- Parent gate ---- */
function openGate(){
  if(State.unlocked) return go('guide');
  const m=modal(`<p class="eyebrow">Guide</p><h2>Enter the passphrase</h2><p class="muted">This area is for the grown-up who set this up.</p><div class="lock"><input type="text" id="pp" placeholder="passphrase" autocomplete="off" autocapitalize="off"><span id="ppmsg" class="muted"></span></div>`,[{label:'Unlock',fn:null,cls:'gold'},{label:'Back',cls:'alt'}]);
  const btn=$('#mact .btn',m); btn.onclick=()=>{ const v=($('#pp',m).value||'').trim().toLowerCase(); if(v===PARENT_PASSPHRASE.toLowerCase()){ State.unlocked=true; m.remove(); go('guide'); } else { $('#ppmsg',m).textContent='Not it.'; } };
  $('#pp',m).addEventListener('keydown',e=>{ if(e.key==='Enter') btn.click(); }); setTimeout(()=>$('#pp',m).focus(),50);
}

/* ---- Hints: pattern match, escalate, optional AI ---- */
function helperFor(item, raw){
  const H={ raw, has:re=>re.test(raw), rel:s=>M.relEquiv(raw,s), expr:s=>{ const ss=M.solvedSide(raw,item.var); return !!(ss.expr&&M.exprEquiv(ss.expr,s)); }, num:n=>M.numEq(M.toNumber(raw),n), ints:M.integers(raw), status:null, relEq:s=>{ const t=M.tryParse(raw); return !!(t&&t.t==='rel'&&M.tryParse(s)&&equationEquiv(t,M.tryParse(s))); } };
  if(item.kind==='expr') H.status=M.solvedSide(raw,item.var).status;
  return H;
}
// equations A=B and C=D: equivalent if (A-B) is a nonzero constant multiple of (C-D)
function equationEquiv(a,b){
  if(a.ops.length!==1||b.ops.length!==1||a.ops[0]!=='='||b.ops[0]!=='=') return false;
  const vs=[...new Set([...M.vars(a),...M.vars(b)])]; const r=M.rng(77); let ratio=null, n=0;
  for(let i=0;i<30;i++){ const env={}; vs.forEach(v=>env[v]=r()*6-3); let x,y; try{ x=M.ev(a.parts[0],env)-M.ev(a.parts[1],env); y=M.ev(b.parts[0],env)-M.ev(b.parts[1],env);}catch(e){return false;} if(!isFinite(x)||!isFinite(y)||Math.abs(y)<1e-9) continue; const q=x/y; if(ratio===null) ratio=q; else if(Math.abs(q-ratio)>1e-6*Math.max(1,Math.abs(ratio))) return false; n++; }
  return n>=6&&ratio!==null&&Math.abs(ratio)>1e-9;
}
function pickHint(item, raw, attempt){
  const H=helperFor(item, raw); let text=null, matched=false;
  for(const hh of (item.hints||[])){ let ok=false; try{ ok=hh.when(raw,H);}catch(e){} if(ok){ text=hh.text; matched=true; break; } }
  if(!text) text = attempt>=2 ? item.generic[1] : item.generic[0];
  if(attempt>=2 && matched && item.generic[1]) text += ' <br><b>Stronger hint:</b> '+item.generic[1];
  return {text, matched};
}
async function aiHint(item, raw){
  if(!State.sample) return null;
  const P=PROBLEMS.find(p=>p.n===item.p);
  const prompt=`You are a friendly, funny coach for an 11-year-old working on Algebra 1 (treat the reading level as 6th grade, the math as Algebra 1). Never state the final answer or any equivalent form of it. Hint at the single step where the student most likely went wrong, in 1-3 short sentences, ending with a question the student can act on. No praise padding, no first-person "I". Plain text only.
Problem context: ${P.stem.replace(/<[^>]+>/g,'')}
Sub-part: ${item.prompt.replace(/<[^>]+>/g,'')}
Correct answer (secret, do not reveal): ${item.answer||item.nl&&JSON.stringify(item.nl)||'see steps'}
Student typed: ${raw}`;
  try{ const r=await State.sample(prompt,{modelTier:'quick',cache:true}); return r.text.trim(); }catch(e){ return null; }
}
