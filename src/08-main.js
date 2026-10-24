/* ===== Boot ===== */
function routeFromHash(){ const hsh=(location.hash||'').replace('#',''); if(hsh==='guide') return {view:'lobby',arg:null,gate:true}; const m=hsh.match(/^level([1-6])$/); if(m) return {view:'level',arg:+m[1]}; if(['check','boss','learn','lobby'].includes(hsh)) return {view:hsh,arg:null}; return {view:'lobby',arg:null}; }
function start(hot){
  if(hot&&hot.s){ State.s=Object.assign(State.s,hot.s); State.unlocked=!!hot.unlocked; }
  const r=routeFromHash(); route={view:r.view,arg:r.arg}; if(hot&&hot.route&&!location.hash) route=hot.route;
  render(); if(r.gate) openGate();
  $('#logoBtn').onclick=()=>go('lobby'); $('#glyph').onclick=openGate;
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
  State.ready=true; render();
}
async function loadProfile(){
  try{
    const doc=State.db.doc('data/users/'+State.uid+'/profile'); const snap=await doc.get();
    if(snap.exists){ const d=snap.data()||{}; ['coins','badges','checks','learn','muted','voice','daily'].forEach(k=>{ if(d[k]!==undefined) State.s[k]=d[k]; }); }
    const q=await doc.collection('attempts').orderBy('ts','desc').limit(50).get(); State.s.attempts=q.docs.map(x=>x.data());
  }catch(e){ console.warn('load',e); }
}
async function saveAttempt(a){ State.s.attempts.unshift(a); if(!State.db||!State.uid) return; try{ await State.db.doc('data/users/'+State.uid+'/profile').collection('attempts').doc(a.id).set(a); }catch(e){ console.warn('attempt save',e); } }
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
