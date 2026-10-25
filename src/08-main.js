/* ===== Boot ===== */
function routeFromHash(){ const hsh=(location.hash||'').replace('#',''); if(hsh==='guide') return {view:'lobby',arg:null,gate:true}; const m=hsh.match(/^level([1-6])$/); if(m) return {view:'level',arg:+m[1]}; if(['check','boss','learn','lobby'].includes(hsh)) return {view:hsh,arg:null}; return {view:'lobby',arg:null}; }
function start(hot){
  if(hot&&hot.s){ State.s=Object.assign(State.s,hot.s); State.unlocked=!!hot.unlocked; }
  const r=routeFromHash(); route={view:r.view,arg:r.arg}; if(hot&&hot.route&&!location.hash) route=hot.route;
  render(); if(r.gate) openGate();
  $('#logoBtn').onclick=()=>go('lobby'); $('#glyph').onclick=openGate;
  // Full screen: optional, desktop browsers mostly; hidden where the browser refuses it.
  const fsb=$('#fsBtn'); const root=document.documentElement;
  if(document.fullscreenEnabled&&root.requestFullscreen){ fsb.hidden=false; fsb.onclick=()=>{ if(document.fullscreenElement) document.exitFullscreen().catch(()=>{}); else root.requestFullscreen().catch(()=>{ fsb.hidden=true; }); };
    document.addEventListener('fullscreenchange',()=>{ fsb.textContent=document.fullscreenElement?'⛶':'⛶'; fsb.title=document.fullscreenElement?'Exit full screen':'Full screen'; fsb.setAttribute('aria-label',fsb.title); }); }
  try{ window.claude?.hot?.snapshot?.(()=>({s:State.s, route, unlocked:State.unlocked})); }catch(e){}
  connect();
  window.addEventListener('hashchange',()=>{ const r=routeFromHash(); route={view:r.view,arg:r.arg}; render(); if(r.gate) openGate(); });
}
async function connect(){
  if(!window.claude||typeof window.claude.use!=='function'){ State.ready=true; return; }
  try{
    const [user,db,sample]=await Promise.all([claude.use('user'),claude.use('db'),claude.use('sample')]);
    State.sample=sample||null;
    if(user&&db){ const uid=await user.id(); if(uid){ State.uid=uid; State.db=db; State.mode='signed'; await loadProfile(); } }
  }catch(e){ console.warn('capabilities',e); }
  State.ready=true;
  // Re-render data views; leave an in-progress level alone unless the merge changed it.
  if(route.view!=='level'||State.learnChanged) render(); else renderHUD();
}
/* Merge the stored profile INTO the live objects (never replace them: open views hold references),
   and keep anything earned before the store answered. */
async function loadProfile(){
  try{
    const doc=State.db.doc('data/users/'+State.uid+'/profile'); const snap=await doc.get();
    const before=JSON.stringify(State.s.learn);
    if(snap.exists){ const d=snap.data()||{}; const S=State.s;
      S.coins=(d.coins||0)+(State.earned||0);
      Object.assign(S.badges, d.badges||{});
      for(const id in (d.checks||{})){ const st=d.checks[id], lo=S.checks[id]; if(!lo||!lo.attempts) S.checks[id]=st; else { S.checks[id]={...st,...lo, attempts:(st.attempts||0)+(lo.attempts||0), correct:!!(st.correct||lo.correct), firstTry:!!(st.firstTry||lo.firstTry), history:[...(st.history||[]),...(lo.history||[])].slice(-25), work:lo.work||st.work}; } }
      for(const l in (d.learn||{})){ S.learn[l]=Object.assign(S.learn[l]||{}, d.learn[l], S.learn[l]||{}); }
      if(d.daily){ const lo=S.daily; if(!lo||lo.date!==d.daily.date) S.daily=lo&&lo.date>d.daily.date?lo:d.daily; else S.daily={...d.daily, count:Math.max(lo.count||0,d.daily.count||0), streak:Math.max(lo.streak||0,d.daily.streak||0), lastMet:lo.lastMet||d.daily.lastMet}; }
      if(d.muted!==undefined) S.muted=d.muted; if(d.voice!==undefined) S.voice=d.voice;
    }
    const q=await doc.collection('attempts').orderBy('ts','desc').limit(50).get(); const stored=q.docs.map(x=>x.data()); const ids=new Set(stored.map(a=>a.id)); State.s.attempts=[...State.s.attempts.filter(a=>!ids.has(a.id)),...stored];
    if(State.earned||before!==JSON.stringify(State.s.learn)) State.save();
    State.learnChanged = before!==JSON.stringify(State.s.learn);
  }catch(e){ console.warn('load',e); }
}
async function saveAttempt(a){ State.s.attempts.unshift(a); if(!State.db||!State.uid) return; try{ await State.db.doc('data/users/'+State.uid+'/profile').collection('attempts').doc(a.id).set(a); }catch(e){ console.warn('attempt save',e); } }
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
