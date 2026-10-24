/* ===== Shared widgets: grading, number line, order, choice ===== */
function gradeItem(item, raw, extra){
  // returns {ok:boolean, partial?:string}
  switch(item.kind){
    case 'rel': { if(item.setup){ const t=M.tryParse(raw); if(t&&t.t==='rel'&&t.parts.some(x=>x.t==='v')&&t.parts.filter(x=>x.t!=='v').every(x=>M.vars(x).size===0)) return {ok:false,partial:'That is the solved form. This part asks for the setup: the inequality that describes the situation before any solving.'}; }
      if(!M.relEquiv(raw,item.answer)){ if(M.toNumber(raw)!==null&&!/[<>=]/.test(M.clean(raw))) return {ok:false,partial:'An inequality needs a symbol (<, ≤, >, ≥) and the variable. Which symbol, and which side is the variable on?'}; return {ok:false}; } if(item.solved){ const t=M.tryParse(raw); const bare=t.parts.filter(x=>x.t==='v'&&x.v===item.solved).length; const others=t.parts.filter(x=>!(x.t==='v'&&x.v===item.solved)); if(bare!==1||others.some(x=>M.vars(x).has(item.solved))) return {ok:false,partial:'That is true, but not finished: get '+item.solved+' alone in its own part.'}; } return {ok:true}; }
    case 'expr': { const ss=M.solvedSide(raw,item.var); return {ok: ss.status==='ok' && M.exprEquiv(ss.expr,item.answer)}; }
    case 'num': { const n=M.toNumber(raw); const want=M.toNumber(item.answer); if(M.numEq(n,want)) return {ok:true}; if(item.partial&&n!==null){ for(const k in item.partial) if(M.numEq(n,+k)) return {ok:false,partial:item.partial[k]}; } return {ok:false}; }
    case 'choice': return {ok:item.correct.includes(+raw)};
    case 'order': return {ok: raw===item.steps.map((_,i)=>i).join('')};
    case 'numberline': { const nl=extra; const w=item.nl; return {ok: !!nl && nl.lo===w.lo && nl.hi===w.hi && nl.loOpen===w.loOpen && nl.hiOpen===w.hiOpen}; }
    case 'triples': { const ints=M.integers(raw); const want=item.want||[16,17,18,19,20,21]; const set=new Set(ints);
      const allTriples = ints.length===want.length*3 && want.every(x=>set.has(x)&&set.has(x+1)&&set.has(x+2)) && ints.every(v=>v>=want[0]&&v<=want[want.length-1]+2);
      const starts = ints.length===want.length && want.every(x=>set.has(x)) && ints.every(v=>want.includes(v));
      return {ok: allTriples||starts}; }
  }
  return {ok:false};
}
function rawOf(item, el){
  if(item.kind==='choice') return el.dataset.choice ?? '';
  if(item.kind==='order') return el.dataset.order ?? '';
  if(item.kind==='numberline') return JSON.stringify(el._nl.get());
  return ($('.ans',el)||{}).value||'';
}
/* Math keypad: inserts symbols and this item's letters at the cursor. */
function keypadFor(item){
  const letters=[...new Set(((item.var||'')+(item.kind==='num'?'':(item.answer||''))).replace(/[^a-z]/gi,'').split(''))];
  const syms = item.kind==='num' ? ['−','/','.'] : item.kind==='triples' ? [',',';'] : ['≤','≥','<','>','(',')','/','−','+','='];
  return [...syms,...letters];
}
function keypadHTML(item){ return `<div class="kp" role="toolbar" aria-label="Math keys">${keypadFor(item).map(k=>`<button type="button" class="key" data-k="${k}" tabindex="-1">${k}</button>`).join('')}</div>`; }
function wireKeypad(el){ const inp=$('.ans',el); if(!inp) return; el.querySelectorAll('.key').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); const k=b.dataset.k; const st=inp.selectionStart??inp.value.length, en=inp.selectionEnd??st; inp.value=inp.value.slice(0,st)+k+inp.value.slice(en); inp.focus(); inp.setSelectionRange(st+k.length,st+k.length); inp.dispatchEvent(new Event('input',{bubbles:true})); })); }
function answerUI(item, idx){
  const id=`in-${idx}-${item.id}`;
  switch(item.kind){
    case 'choice': return `<div class="opts" role="group">${item.options.map((o,i)=>`<button type="button" class="opt" data-i="${i}" aria-pressed="false">${o}</button>`).join('')}</div>${item.explain?`<label for="${id}x" class="muted" style="font-size:.9rem">Optional: explain the error in your own words</label><textarea id="${id}x" placeholder="Ben… Chris…"></textarea>`:''}`;
    case 'order': return `<div class="chips pool">${item.steps.map((s,i)=>i).sort((a,b)=>((a*7+3)%5)-((b*7+3)%5)).map(i=>`<button type="button" class="chip" data-i="${i}">${item.steps[i]}</button>`).join('')}</div><p class="muted" style="font-size:.85rem">Your solution (tap a step to remove it):</p><div class="seq"></div>`;
    case 'numberline': return `<div class="nl" data-min="${item.nl.min}" data-max="${item.nl.max}"></div>`;
    case 'triples': return `<textarea class="ans" id="${id}" placeholder="${esc(item.placeholder||'')}" autocomplete="off"></textarea>${keypadHTML(item)}`;
    default: return `<input type="text" class="ans" id="${id}" placeholder="${esc(item.placeholder||'')}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${item.kind==='num'?'decimal':'text'}">${keypadHTML(item)}`;
  }
}
function wireAnswerUI(item, el, onChange){
  if(item.kind==='choice'){ el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ el.querySelectorAll('.opt').forEach(x=>x.setAttribute('aria-pressed','false')); b.setAttribute('aria-pressed','true'); el.dataset.choice=b.dataset.i; onChange&&onChange(); }); }
  if(item.kind==='order'){ const pool=$('.pool',el), seq=$('.seq',el); const upd=()=>{ el.dataset.order=[...seq.children].map(c=>c.dataset.i).join(''); onChange&&onChange(); };
    pool.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{ seq.appendChild(c); upd(); }); seq.addEventListener('click',e=>{ const c=e.target.closest('.chip'); if(c){ pool.appendChild(c); upd(); } }); }
  if(item.kind==='numberline'){ el._nl=numberLine($('.nl',el), item.nl.min, item.nl.max, onChange); }
  if(item.kind==='num'||item.kind==='rel'||item.kind==='expr'||item.kind==='triples'){ const i=$('.ans',el); i.addEventListener('input',()=>onChange&&onChange()); i.addEventListener('keydown',e=>{ if(e.key==='Enter'&&i.tagName==='INPUT'){ e.preventDefault(); const b=$('.check',el); b&&b.click(); } }); wireKeypad(el); }
}
/* Draggable number line: two handles, tap to toggle open/closed, shade between. */
function numberLine(host, min, max, onChange, init){
  const W=600, H=80, pad=24; const st={lo:init?init.lo:min+2, hi:init?init.hi:max-2, loOpen:init?init.loOpen:true, hiOpen:init?init.hiOpen:true};
  const X=v=>pad+(v-min)/(max-min)*(W-2*pad); const V=x=>Math.round(min+(x-pad)/(W-2*pad)*(max-min));
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Number line from ${min} to ${max}"><line x1="${pad-14}" y1="40" x2="${W-pad+14}" y2="40" class="tick"/>`;
  for(let v=min;v<=max;v++){ s+=`<line x1="${X(v)}" y1="33" x2="${X(v)}" y2="47" class="tick"/><text x="${X(v)}" y="66" class="lab">${v}</text>`; }
  s+=`<line class="shade" y1="40" y2="40"/><circle class="dot" data-h="lo" cy="40" r="11"/><circle class="dot" data-h="hi" cy="40" r="11"/></svg>
  <div class="row" style="font-size:.85rem;justify-content:space-between"><span class="muted">Drag a circle to move it. Tap it to switch open ○ / closed ●.</span><span class="num readout"></span></div>`;
  host.innerHTML=s;
  const svg=$('svg',host), shade=$('.shade',host), dots={lo:$('[data-h=lo]',host), hi:$('[data-h=hi]',host)}, ro=$('.readout',host);
  function sync(){ shade.setAttribute('x1',X(st.lo)); shade.setAttribute('x2',X(st.hi)); for(const k of ['lo','hi']){ dots[k].setAttribute('cx',X(st[k])); dots[k].classList.toggle('open',st[k+'Open']); dots[k].classList.toggle('closed',!st[k+'Open']); } ro.textContent=`${st.loOpen?'(':'['}${st.lo}, ${st.hi}${st.hiOpen?')':']'}`; }
  let drag=null, moved=false;
  const pt=e=>{ const r=svg.getBoundingClientRect(); return (e.clientX-r.left)/r.width*W; };
  for(const k of ['lo','hi']) dots[k].addEventListener('pointerdown',e=>{ drag=k; moved=false; try{ svg.setPointerCapture(e.pointerId);}catch(x){} e.preventDefault(); });
  svg.addEventListener('pointermove',e=>{ if(!drag) return; const v=Math.max(min,Math.min(max,V(pt(e)))); if(v!==st[drag]){ moved=true; st[drag]=v; if(st.lo>st.hi){ const t=st.lo; st.lo=st.hi; st.hi=t; drag=drag==='lo'?'hi':'lo'; } sync(); } });
  const up=()=>{ if(drag&&!moved){ st[drag+'Open']=!st[drag+'Open']; sync(); } if(drag){ drag=null; onChange&&onChange(); } };
  svg.addEventListener('pointerup',up); svg.addEventListener('pointercancel',up);
  sync();
  return {get:()=>({...st}), set:(o)=>{Object.assign(st,o);sync();}};
}

/* ===== Check My Answers: one problem at a time ===== */
let checkProb=null;
function firstOpenProblem(){ for(const P of PROBLEMS){ if(ITEMS.some(i=>i.p===P.n&&!State.s.checks[i.id]?.correct)) return P.n; } return 1; }
VIEWS.check = (app)=>{
  if(checkProb===null) checkProb=firstOpenProblem();
  const cleared=ITEMS.filter(i=>State.s.checks[i.id]?.correct).length; const P=PROBLEMS.find(x=>x.n===checkProb); const its=ITEMS.filter(i=>i.p===P.n);
  const pdone=n=>ITEMS.filter(i=>i.p===n&&State.s.checks[i.id]?.correct).length, pn=n=>ITEMS.filter(i=>i.p===n).length;
  app.innerHTML=h`<div class="stack">
   <div class="block"><div class="row" style="justify-content:space-between;align-items:flex-start"><div><p class="eyebrow">Check my answers</p><h1>Your practice test, one problem at a time.</h1></div><span class="pill badges num">${cleared}/${ITEMS.length} cleared</span></div>
    <p style="margin-top:6px">Type an answer and tap <b>Check</b>. Right: coins. Wrong: you respawn with a hint about <i>your</i> answer, never the answer itself. Stuck? Every part has a worked example with different numbers.</p>
    <nav class="pnav" aria-label="Problems">${PROBLEMS.map(x=>`<button class="pbtn ${x.n===checkProb?'cur':''} ${pdone(x.n)===pn(x.n)?'done':''}" data-p="${x.n}" aria-current="${x.n===checkProb?'page':'false'}"><b>${x.n}</b><span class="num">${pdone(x.n)}/${pn(x.n)}</span></button>`).join('')}</nav></div>
   <div class="block" id="probBlock"><p class="eyebrow">Problem ${P.n} of 6</p><h2>${esc(P.title)}</h2><p style="margin:8px 0 14px">${P.stem}</p><div class="stack">${its.map(it=>itemHTML(it,'c')).join('')}</div>
    <div class="row" style="justify-content:space-between;margin-top:18px"><button class="btn alt" id="prevP" ${P.n===1?'disabled':''}>← Problem ${P.n-1||1}</button><span class="muted num">${pdone(P.n)}/${pn(P.n)} cleared here</span><button class="btn" id="nextP" ${P.n===6?'disabled':''}>Problem ${Math.min(6,P.n+1)} →</button></div></div>
  </div>`;
  its.forEach(it=>wireCheckItem(it, app.querySelector(`[data-item="${it.id}"]`)));
  const jump=n=>{ checkProb=n; render(); const pb=$('#probBlock'); if(pb) pb.scrollIntoView({block:'start'}); };
  app.querySelectorAll('.pbtn').forEach(b=>b.onclick=()=>jump(+b.dataset.p));
  $('#prevP').onclick=()=>jump(Math.max(1,checkProb-1)); $('#nextP').onclick=()=>jump(Math.min(6,checkProb+1));
};
function refreshPnav(){ const pdone=n=>ITEMS.filter(i=>i.p===n&&State.s.checks[i.id]?.correct).length, pn=n=>ITEMS.filter(i=>i.p===n).length; document.querySelectorAll('.pbtn').forEach(b=>{ const n=+b.dataset.p; b.querySelector('.num').textContent=`${pdone(n)}/${pn(n)}`; b.classList.toggle('done',pdone(n)===pn(n)); }); const here=document.querySelector('#probBlock .row .muted.num'); if(here&&checkProb) here.textContent=`${pdone(checkProb)}/${pn(checkProb)} cleared here`; const pill=document.querySelector('.pill.badges.num'); if(pill) pill.textContent=`${ITEMS.filter(i=>State.s.checks[i.id]?.correct).length}/${ITEMS.length} cleared`; }
function itemHTML(it, prefix){
  const rec=State.s.checks[it.id]; const done=rec&&rec.correct; const ex=EXAMPLES[it.id];
  return `<div class="item ${done?'ok':''}" data-item="${it.id}"><div class="tag">${it.id.toUpperCase()} ${done?'<span class="ck">✔ cleared</span>':''}<span class="muted" style="font-family:var(--body);font-size:.8rem;font-weight:700">· ${SKILL_NAMES[it.skill]}</span></div><div>${it.prompt}</div>
   <label class="muted" style="font-size:.85rem" for="w-${it.id}">Work it out here (not graded${State.mode==='signed'?', saved for later':''})</label><textarea class="scratch" id="w-${it.id}" placeholder="Steps, scribbles, anything.">${esc(rec?.work||'')}</textarea>
   ${answerUI(it,prefix)}<div class="row"><button type="button" class="btn sm check">${done?'Check again':'Check'}</button><span class="muted tries" style="font-size:.85rem">${rec&&rec.attempts?`${rec.attempts} tr${rec.attempts===1?'y':'ies'}`:''}</span></div><div class="fbwrap"></div>
   ${ex?`<details class="ex"><summary>Show me a similar one, worked out</summary><p class="muted" style="margin:6px 0">${esc(ex.stem)}</p><ol class="exsteps">${ex.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></details>`:''}</div>`;
}
function wireCheckItem(it, el){
  wireAnswerUI(it, el);
  const sc=$('.scratch',el); let st=null; sc.addEventListener('input',()=>{ clearTimeout(st); st=setTimeout(()=>{ const rec=State.s.checks[it.id]||(State.s.checks[it.id]={attempts:0,correct:false,firstTry:false,history:[]}); rec.work=sc.value.slice(0,2000); State.save(); },600); });
  $('.check',el).onclick=async()=>{
    const raw=rawOf(it,el).trim(); if(!raw||raw==='{}'){ showFB(el,'info','Type something first. Any attempt is free.'); return; }
    const extra = it.kind==='numberline'? el._nl.get() : null;
    const res=gradeItem(it, raw, extra);
    const rec=State.s.checks[it.id]||(State.s.checks[it.id]={attempts:0,correct:false,firstTry:false,history:[]});
    rec.attempts++; rec.history.push({raw: it.kind==='numberline'?`${extra.loOpen?'open':'closed'} at ${extra.lo}, ${extra.hiOpen?'open':'closed'} at ${extra.hi}`:raw, ok:res.ok, ts:Date.now()}); if(rec.history.length>25) rec.history.shift();
    $('.tries',el).textContent=`${rec.attempts} tr${rec.attempts===1?'y':'ies'}`;
    if(res.ok){
      const first=!rec.correct; const hadMiss=rec.history.some(x=>!x.ok);
      if(first){ rec.correct=true; rec.firstTry=rec.attempts===1; rec.clearedAt=Date.now(); State.addCoins(rec.firstTry?10:5,'checkpoint cleared'); if(hadMiss) State.award('respawn'); State.checkpoint(); refreshPnav(); }
      else State.save();
      el.classList.add('ok'); el.classList.remove('bad'); $('.tag',el).innerHTML=`${it.id.toUpperCase()} <span class="ck">✔ cleared</span>`;
      showFB(el,'ok',first?pickPraise(it):'Still right. Checkpoint stays cleared.');
      if(it.explain && State.sample){ const x=$('textarea',el); if(x&&x.value.trim().length>8) aiExplainFeedback(it,x.value.trim(),el); }
      checkBadges();
    } else {
      thud(); el.classList.add('bad'); State.save();
      const n=rec.history.filter(x=>!x.ok).length;
      if(res.partial){ showFB(el,'warn',`<span class="who">Partially correct</span>${res.partial} ${learnLink(it.learn)}`); return; }
      const {text,matched}=pickHint(it, raw, n);
      let html=`<span class="who">Respawn · hint ${Math.min(n,3)}</span>${text}`;
      if(n>=3) html+=`<br><button type="button" class="btn ghost sm firststep">Show me the first step</button>`;
      html+=`<br>${learnLink(it.learn)}`;
      showFB(el,'bad',html);
      const fs=$('.firststep',el); if(fs) fs.onclick=()=>{ fs.outerHTML=`<div class="fb info" style="margin-top:6px"><span class="who">First step</span>${it.firstStep}</div>`; };
      if(!matched && State.sample && it.kind!=='choice' && it.kind!=='order' && it.kind!=='numberline'){
        const box=$('.fb',el); const ai=document.createElement('div'); ai.className='muted'; ai.style.marginTop='6px'; ai.textContent='Coach is thinking…'; box.appendChild(ai);
        const t=await aiHint(it, raw); if(t) ai.innerHTML=`<span class="who">Coach</span>${esc(t)}`; else ai.remove();
      }
    }
  };
}
async function aiExplainFeedback(it, text, el){
  try{ const r=await State.sample(`A student (11 years old, Algebra 1) was asked to explain the error in these solutions for p from A = ½lp + B. Ben: p = 2A − B/l (error: cleared the ½ before subtracting B, and divided only B by l). Chris: p = (A − B)/(2l) (error: divided by 2 instead of multiplying by 2). The student wrote: "${text}". In 2 short sentences, say what the explanation gets right and what it is missing, as questions the student can answer. Do not use first person. Plain text.`,{modelTier:'quick',cache:true}); const d=document.createElement('div'); d.className='fb info'; d.innerHTML=`<span class="who">Coach on your explanation</span>${esc(r.text.trim())}`; $('.fbwrap',el).appendChild(d);}catch(e){}
}
const PRAISE=['Checkpoint cleared. Vera the Variable is finally alone and only slightly panicking.','Correct. Negative Nine just flipped his own sign in frustration.','Cleared. The fraction bar sends its regards (it is a grouping symbol, after all).','Nailed it. Respawn point moved forward.','Correct. The Checker plugged it back in and it holds.','Cleared. That is real Algebra 1 you just did.'];
function pickPraise(it){ return PRAISE[(it.id.charCodeAt(0)+it.id.charCodeAt(1))%PRAISE.length]; }
function showFB(el,kind,html){ $('.fbwrap',el).innerHTML=`<div class="fb ${kind}">${html}</div>`; }
function checkBadges(){
  const c=State.s.checks; const ok=id=>c[id]&&c[id].correct;
  if(ITEMS.every(i=>ok(i.id))) State.award('check_all');
  if(['3a','3b','3c','3d'].every(ok)) State.award('letters');
  if(ok('3c')&&ok('3d')) State.award('fraction');
}
