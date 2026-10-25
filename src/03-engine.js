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

const DAILY_GOAL=3;
function localDay(off){ const d=new Date(); d.setDate(d.getDate()+off); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function dailyInfo(){ const d=State.s.daily||{}; const today=localDay(0), yest=localDay(-1); const count=d.date===today?d.count:0; const streak=(d.lastMet===today||d.lastMet===yest)?(d.streak||0):0; return {count:Math.min(count,DAILY_GOAL),met:count>=DAILY_GOAL,streak}; }
function U(){ return UNITS[State.unit]||UNITS.u1; }
function US(id){ id=id||State.unit; const u=State.s.units; return u[id]||(u[id]={learn:{},checks:{},attempts:[]}); }
/* Shorthands for the current unit's saved progress */
const UL=()=>US().learn, UC=()=>US().checks, UA=()=>US().attempts;
const State = {
  s:{coins:0, badges:{}, units:{u1:{learn:{},checks:{},attempts:[]}}, muted:false, voice:true, avatar:{skin:'green',hat:'none',pet:'none'}, owned:[], chest:{}},
  unit:'u1',
  mode:'public', uid:null, db:null, sample:null, user:null, ready:false, unlocked:false, earned:0, learnChanged:false,
  listeners:new Set(),
  on(fn){this.listeners.add(fn);}, emit(){this.listeners.forEach(f=>f());},
  _t:null,
  save(){ renderHUD(); if(!this.db||!this.uid) return; clearTimeout(this._t); this._t=setTimeout(()=>this.flush(),700); },
  async flush(){ if(!this.db||!this.uid) return; try{ const {units,...rest}=this.s; const u={}; for(const k in units){ const {attempts,...ur}=units[k]; u[k]=ur; } await this.db.doc('data/users/'+this.uid+'/profile').set({...rest, units:u, updatedAt:Date.now()}); }catch(e){ console.warn('save failed',e); } },
  addCoins(n,why){ this.s.coins+=n; if(!this.ready) this.earned+=n; toast(`+${n} coins${why?' · '+why:''}`); ding(); if(!this.s.badges.first) this.award('first'); this.save(); },
  /* Daily goal: 3 checkpoints a day earns a bonus; consecutive days build a streak. */
  checkpoint(){ const today=localDay(0), yest=localDay(-1); const d=this.s.daily||(this.s.daily={date:today,count:0,streak:0,lastMet:null});
    if(d.date!==today){ d.date=today; d.count=0; } d.count++;
    if(d.count===DAILY_GOAL){ d.streak = d.lastMet===yest ? (d.streak||0)+1 : (d.lastMet===today ? d.streak : 1); d.lastMet=today; this.addCoins(15,'daily goal'); toast(d.streak>1?`🔥 ${d.streak}-day streak`:'🔥 Streak started'); }
    this.save(); },
  award(id){ if(this.s.badges[id]) return; this.s.badges[id]=Date.now(); const b=BADGES.find(x=>x.id===id); toast(`🏅 Badge: ${b?b.name:id}`); this.save(); },
};

/* audio: tiny ding, no assets */
let actx=null; function ding(){ if(State.s.muted) return; try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(), g=actx.createGain(); o.type='square'; o.frequency.setValueAtTime(880,actx.currentTime); o.frequency.setValueAtTime(1320,actx.currentTime+.08); g.gain.setValueAtTime(.06,actx.currentTime); g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.25); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+.26);}catch(e){} }
function thud(){ if(State.s.muted) return; try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(), g=actx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(220,actx.currentTime); o.frequency.exponentialRampToValueAtTime(90,actx.currentTime+.2); g.gain.setValueAtTime(.08,actx.currentTime); g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.25); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+.26);}catch(e){} }

function toast(msg){ const box=$('#toasts'); while(box.children.length>=3) box.firstChild.remove(); const t=document.createElement('div'); t.className='toast'; t.textContent=msg; box.appendChild(t); setTimeout(()=>t.remove(),2600); }
function modal(html, actions){ const m=document.createElement('div'); m.className='modal'; m.innerHTML=`<div class="block" role="dialog" aria-modal="true"><div class="stack">${html}<div class="row" id="mact"></div></div></div>`; actions.forEach(a=>{ const b=document.createElement('button'); b.className='btn '+(a.cls||''); b.textContent=a.label; b.onclick=()=>{ m.remove(); a.fn&&a.fn(); }; $('#mact',m).appendChild(b); }); document.body.appendChild(m); return m; }

/* ---- avatar + course ---- */
function courseX(i,n){ return 8+(84*(i+1))/n; }
/* Walk the existing avatar to checkpoint `cleared` (1-based count), hop on arrival, recolor that flag. */
function moveAvatar(courseEl, cleared, n, color){
  const av=courseEl&&courseEl.querySelector('.avatar'); if(!av) return;
  const x= cleared===0?4:courseX(cleared-1,n); av.classList.add('walk'); av.style.left=x+'%';
  setTimeout(()=>{ av.classList.remove('walk'); av.classList.add('hop'); const flags=courseEl.querySelectorAll('svg rect'); const base=flags[0]; const k=cleared-1; if(flags[1+k*2]){ flags[1+k*2].setAttribute('fill','var(--ok)'); flags[2+k*2].setAttribute('fill',color); } const labs=courseEl.querySelectorAll('span'); if(labs[k]) labs[k].style.color='var(--ok)'; ding(); },950);
}
function courseHTML(checkpoints, clearedCount, color){
  // checkpoints: array of labels. avatar sits at index clearedCount (0 = start)
  const n=checkpoints.length; const xs=checkpoints.map((_,i)=>courseX(i,n));
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
let route = {view:'map', arg:null};
const UNIT_VIEWS=new Set(['hub','learn','level','check','boss']);
function hashFor(view,arg){ if(view==='lobby') view='hub'; if(UNIT_VIEWS.has(view)) return State.unit+(view==='hub'?'':'-'+view+(arg!==null?arg:'')); return view+(arg!==null?arg:''); }
function go(view,arg=null){ if(view==='lobby') view='hub'; route={view,arg}; try{ history.replaceState(null,'', '#'+hashFor(view,arg)); }catch(e){} render(); window.scrollTo({top:0}); }
function openUnit(id){ if(!UNITS[id]){ modal('<h2>Coming soon.</h2><p class="muted">This part of the map opens when the next unit is ready.</p>',[{label:'Back to the map',cls:'alt'}]); return; } State.unit=id; go('hub'); }
function render(){
  const app=$('#app'); const v=VIEWS[route.view]||VIEWS.map; app.innerHTML=''; v(app,route.arg); renderHUD();
}
function renderHUD(){
  $('#coinCount').textContent=State.s.coins; $('#badgeCount').textContent=Object.keys(State.s.badges).length;
  const tabs=[['map','Map'],['hub','Unit'],['learn','Learn'],['check','Check'],['boss','Boss'],['journal','Journal']];
  $('#nav').innerHTML=tabs.map(([k,l])=>`<button class="tab" data-v="${k}" aria-current="${route.view===k||(k==='learn'&&route.view==='level')?'page':'false'}">${l}</button>`).join('');
  $('#nav').querySelectorAll('.tab').forEach(b=>b.onclick=()=>go(b.dataset.v));
}
function learnLink(n){ const L=LEVELS[n-1]; return `<a href="#level${n}" data-go="level" data-arg="${n}">→ Level ${n}: ${esc(L.title)}</a>`; }
document.addEventListener('click',e=>{ const a=e.target.closest('[data-go]'); if(a){ e.preventDefault(); go(a.dataset.go, a.dataset.arg?+a.dataset.arg:null); } });

/* ---- Map (lobby) ---- */
VIEWS.map = (app)=>{
  const d=dailyInfo(); const chest=chestCount();
  app.innerHTML=h`<div class="stack">
   <div class="block" style="background:linear-gradient(135deg,var(--panel),var(--panel2))"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">World map</p><h1>Pick a destination.</h1></div><div class="row"><button class="btn alt sm" data-go="shop">🛒 Shop</button><button class="btn alt sm" data-go="chest">🎁 Rematch Chest${chest?` (${chest})`:''}</button><button class="btn alt sm" id="muteBtn">${State.s.muted?'🔇 Sound off':'🔊 Sound on'}</button></div></div>
    <div class="daily" style="margin-top:12px"><div><span class="eyebrow">Today's goal</span><div class="row" style="gap:6px;margin-top:4px">${[0,1,2].map(i=>`<span class="dot ${i<d.count?'on':''}"></span>`).join('')}<b class="num" style="margin-left:4px">${d.count}/${DAILY_GOAL} checkpoints</b>${d.met?'<span class="muted">· bonus earned</span>':''}</div></div><div><span class="eyebrow">Streak</span><div style="font-family:var(--disp);font-size:1.3rem;font-variant-numeric:tabular-nums">${d.streak>0?`🔥 ${d.streak} day${d.streak===1?'':'s'}`:'—'}</div></div></div></div>
   ${mapHTML()}
   <div class="block soft"><p class="eyebrow">Badges</p><div class="row" style="margin-top:8px">${BADGES.map(b=>`<span class="badge ${State.s.badges[b.id]?'got':''}" title="${esc(b.how)}"><span class="ico">${b.ico}</span>${esc(b.name)}</span>`).join('')}</div></div>
  </div>`;
  $('#muteBtn').onclick=()=>{ State.s.muted=!State.s.muted; State.save(); render(); };
  app.querySelectorAll('[data-unit]').forEach(t=>t.onclick=()=>openUnit(t.dataset.unit));
};
function unitProgress(id){ const u=UNITS[id]; if(!u) return {pct:0,done:false}; const st=US(id); let done=0,total=0; u.LEVELS.forEach(L=>{ const p=levelProgressFor(id,L.n); done+=p.done; total+=p.total; }); const c=u.ITEMS.filter(i=>st.checks[i.id]?.correct).length; done+=c; total+=u.ITEMS.length; const boss=st.attempts.some(a=>a.pct>=80); done+=boss?1:0; total+=1; return {pct:Math.round(100*done/total), done:done===total, boss}; }
/* The map: a winding path over blocky biomes; each stop is a unit. */
function mapHTML(){
  const pts=[[10,80],[28,70],[46,78],[64,68],[84,76],[86,46],[66,40],[46,48],[26,38],[14,16]]; // percent coords, a winding trail
  const path=pts.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join(' ');
  const tiles=MAP_SLOTS.map((sl,i)=>{ const [x,y]=pts[i]; if(sl.soon||!UNITS[sl.id]) return `<button class="stop soon" style="left:${x}%;top:${y}%" data-unit="${sl.id||'soon'+i}" aria-label="${esc(sl.soon||sl.id)} coming soon"><span class="mk">?</span><span class="lb">${esc(sl.soon||'Unit')}<br><i>coming soon</i></span></button>`; const u=UNITS[sl.id]; const pr=unitProgress(sl.id); return `<button class="stop ${State.unit===sl.id?'here':''} ${pr.done?'clear':''}" style="left:${x}%;top:${y}%" data-unit="${sl.id}"><span class="mk">${pr.done?'👑':pr.boss?'⚔':u.n}</span><span class="lb">${esc(u.title)}<br><i class="num">${pr.pct}% explored</i></span></button>`; }).join('');
  const av=pts[MAP_SLOTS.findIndex(s=>s.id===State.unit)]||pts[0];
  return `<div class="block mapblock"><div class="map" role="group" aria-label="World map">
    <svg viewBox="0 0 100 90" preserveAspectRatio="none" aria-hidden="true">
      <defs><pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="none" stroke="rgba(0,0,0,.06)" stroke-width=".3"/></pattern></defs>
      <rect x="0" y="0" width="100" height="90" fill="#7bc95b"/>
      <path d="M0 0 H45 V22 H28 V40 H0 Z" fill="#4e9d3a"/><path d="M60 0 H100 V30 H78 V12 H60 Z" fill="#d9c27a"/><path d="M0 60 H18 V90 H0 Z" fill="#3f8fd6"/><path d="M82 62 H100 V90 H70 V78 H82 Z" fill="#8c8c8c"/><path d="M40 82 H66 V90 H40 Z" fill="#c9a66b"/><path d="M26 44 H44 V58 H26 Z" fill="#5fae4a"/>
      <rect x="0" y="0" width="100" height="90" fill="url(#grid)"/>
      <path d="${path}" fill="none" stroke="#5b3b1f" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#c9a66b" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="3 2"/>
    </svg>
    ${tiles}
    <div class="mapav" style="left:${av[0]}%;top:${av[1]}%">${avatarSVG()}</div>
  </div><p class="muted" style="font-size:.85rem;margin-top:8px">Tap a stop to enter it. Your block stands on the unit you are working in.</p></div>`;
}

/* ---- Unit hub ---- */
VIEWS.hub = (app)=>{
  const u=U(); const st=US(); const ITEMS=u.ITEMS, LEVELS=u.LEVELS;
  const checkDone=ITEMS.filter(i=>st.checks[i.id]&&st.checks[i.id].correct).length;
  const best=st.attempts.length? Math.max(...st.attempts.map(a=>a.pct)) : null;
  app.innerHTML=h`
  <div class="stack">
   <div class="block" style="background:linear-gradient(135deg,var(--panel),var(--panel2))">
    <div class="row" style="justify-content:space-between"><div><p class="eyebrow">Unit ${u.n} · spawn lobby</p><h1>${esc(u.title)}</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div>
    <p style="margin-top:6px">${esc(u.blurb)} Six Learn levels are obbies: clear checkpoints, earn coins. <b>Check My Answers</b> grades the real questions. The <b>Final Boss</b> is a fresh test with new numbers. Wrong answers just respawn you at the last checkpoint. No lives, no penalty.</p>
    <div class="row" style="margin-top:12px">
      <button class="btn" data-go="check">Check My Answers</button>
      <button class="btn gold" data-go="boss">Fight the Final Boss</button>
    </div>
   </div>
   <div class="grid" id="portals">
    ${LEVELS.map(L=>{ const p=levelProgress(L.n); return `<button class="portal" style="--pc:${L.color}" data-go="level" data-arg="${L.n}"><div class="band"></div><span class="lvl">LEVEL ${L.n}</span><h3>${esc(L.title)}</h3><p class="muted" style="font-size:.9rem">${esc(L.blurb)}</p><div class="prog"><i style="width:${Math.round(100*p.done/p.total)}%"></i></div><span class="muted" style="font-size:.8rem">${p.done}/${p.total} checkpoints</span>${p.done===p.total?'<span class="done">CLEAR</span>':''}</button>`; }).join('')}
    <button class="portal big" data-go="check" style="--pc:var(--accent)"><div style="flex:1;min-width:200px"><span class="lvl">CHECK MY ANSWERS</span><h3>${u.n===1?'Your practice test, graded live':'The review questions, graded live'}</h3><p class="muted" style="font-size:.9rem">${ITEMS.length} parts. Type an answer, get coins or a hint. Hints never give the answer.</p></div><div style="min-width:160px;flex:1"><div class="prog"><i style="width:${Math.round(100*checkDone/ITEMS.length)}%"></i></div><span class="muted" style="font-size:.8rem">${checkDone}/${ITEMS.length} cleared</span></div></button>
    <button class="portal big" data-go="boss" style="--pc:var(--gold)"><div style="flex:1;min-width:200px"><span class="lvl" style="color:var(--bad)">FINAL BOSS</span><h3>Fresh test, new numbers, same moves</h3><p class="muted" style="font-size:.9rem">No feedback until you hit Grade. Retake as many times as you like.</p></div><div style="min-width:160px;flex:1"><span class="muted" style="font-size:.85rem">${best===null?'No runs yet':`Best run: <b class="num">${best}%</b> · ${st.attempts.length} run${st.attempts.length===1?'':'s'}`}</span></div></button>
   </div>
  </div>`;
};
VIEWS.lobby=VIEWS.hub;
function levelProgressFor(uid,n){ const u=UNITS[uid]; const L=US(uid).learn['l'+n]||{}; const keys=['explainer','video','q1','q2','q3'].filter(k=>k!=='q3'||u.MINI[n].length>2); return {done:keys.filter(k=>L[k]).length,total:keys.length}; }
function levelProgress(n){ return levelProgressFor(State.unit,n); }

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
function pickHint(item, raw, attempt, extra){
  const H=helperFor(item, raw); H.nl=extra||null; let text=null, matched=false;
  for(const hh of (item.hints||[])){ let ok=false; try{ ok=hh.when(raw,H);}catch(e){} if(ok){ text=hh.text; matched=true; break; } }
  if(!text) text = attempt>=2 ? item.generic[1] : item.generic[0];
  if(attempt>=2 && matched && item.generic[1]) text += ' <br><b>Stronger hint:</b> '+item.generic[1];
  return {text, matched};
}
async function aiHint(item, raw){
  if(!State.sample) return null;
  const P=U().PROBLEMS.find(p=>p.n===item.p)||{stem:''};
  const prompt=`You are a friendly, funny coach for an 11-year-old working on Algebra 1 (treat the reading level as 6th grade, the math as Algebra 1). Never state the final answer or any equivalent form of it. Hint at the single step where the student most likely went wrong, in 1-3 short sentences, ending with a question the student can act on. No praise padding, no first-person "I". Plain text only.
Problem context: ${P.stem.replace(/<[^>]+>/g,'')}
Sub-part: ${item.prompt.replace(/<[^>]+>/g,'')}
Correct answer (secret, do not reveal): ${item.answer||item.show||(item.nl&&JSON.stringify(item.nl))||'see steps'}
Student typed: ${raw}`;
  try{ const r=await State.sample(prompt,{modelTier:'quick',cache:true}); return r.text.trim(); }catch(e){ return null; }
}
