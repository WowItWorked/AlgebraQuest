/* ===== Boot ===== */
function routeFromHash(){ const hsh=(location.hash||'').replace('#',''); if(hsh==='guide') return {view:'map',arg:null,gate:true};
  if(['map','journal','shop','chest'].includes(hsh)) return {view:hsh,arg:null};
  let m=hsh.match(/^(u[0-9a-z]+)(?:-(hub|learn|check|boss|level([1-6])))?$/); if(m&&UNITS[m[1]]){ State.unit=m[1]; const v=m[2]||'hub'; return v.startsWith('level')?{view:'level',arg:+m[3]}:{view:v,arg:null}; }
  m=hsh.match(/^level([1-6])$/); if(m) return {view:'level',arg:+m[1]}; if(['check','boss','learn','lobby','hub'].includes(hsh)) return {view:hsh==='lobby'?'hub':hsh,arg:null}; return {view:'map',arg:null}; }
/* Older profiles kept learn/checks/attempts at the top level; move them under units.u1. */
function migrate(s){ if(!s.units) s.units={}; if(s.learn||s.checks||s.attempts){ const u=s.units.u1||(s.units.u1={learn:{},checks:{},attempts:[]}); Object.assign(u.learn,s.learn||{}); Object.assign(u.checks,s.checks||{}); u.attempts=[...(u.attempts||[]),...(s.attempts||[])]; delete s.learn; delete s.checks; delete s.attempts; } for(const k in s.units){ const u=s.units[k]; u.learn=u.learn||{}; u.checks=u.checks||{}; u.attempts=u.attempts||[]; } if(!s.avatar) s.avatar={skin:'green',hat:'none',pet:'none'}; if(!s.owned) s.owned=[]; if(!s.chest) s.chest={}; return s; }
function start(hot){
  if(hot&&hot.s){ State.s=Object.assign(State.s,hot.s); State.unlocked=!!hot.unlocked; if(hot.unit&&UNITS[hot.unit]) State.unit=hot.unit; } migrate(State.s);
  const r=routeFromHash(); route={view:r.view,arg:r.arg}; if(hot&&hot.route&&!location.hash) route=hot.route;
  render(); if(r.gate) openGate();
  $('#logoBtn').onclick=()=>go('map'); $('#glyph').onclick=openGate;
  // Full screen: optional, desktop browsers mostly; hidden where the browser refuses it.
  const fsb=$('#fsBtn'); const root=document.documentElement;
  if(document.fullscreenEnabled&&root.requestFullscreen){ fsb.hidden=false; fsb.onclick=()=>{ if(document.fullscreenElement) document.exitFullscreen().catch(()=>{}); else root.requestFullscreen().catch(()=>{ fsb.hidden=true; }); };
    document.addEventListener('fullscreenchange',()=>{ fsb.textContent=document.fullscreenElement?'⛶':'⛶'; fsb.title=document.fullscreenElement?'Exit full screen':'Full screen'; fsb.setAttribute('aria-label',fsb.title); }); }
  try{ window.claude?.hot?.snapshot?.(()=>({s:State.s, route, unlocked:State.unlocked, unit:State.unit})); }catch(e){}
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
    const before=JSON.stringify(State.s.units);
    if(snap.exists){ const d=migrate(snap.data()||{}); const S=State.s;
      S.coins=(d.coins||0)+(State.earned||0);
      Object.assign(S.badges, d.badges||{}); if(d.avatar) S.avatar=Object.assign(S.avatar||{},d.avatar); if(d.owned) S.owned=[...new Set([...(S.owned||[]),...d.owned])]; if(d.chest) S.chest=Object.assign(d.chest, S.chest||{});
      for(const uid in d.units){ const du=d.units[uid]; const su=US(uid);
        for(const id in (du.checks||{})){ const st=du.checks[id], lo=su.checks[id]; if(!lo||!lo.attempts) su.checks[id]=st; else { su.checks[id]={...st,...lo, attempts:(st.attempts||0)+(lo.attempts||0), correct:!!(st.correct||lo.correct), firstTry:!!(st.firstTry||lo.firstTry), history:[...(st.history||[]),...(lo.history||[])].slice(-25), work:lo.work||st.work}; } }
        for(const l in (du.learn||{})){ su.learn[l]=Object.assign(su.learn[l]||{}, du.learn[l], su.learn[l]||{}); } }
      if(d.daily){ const lo=S.daily; if(!lo||lo.date!==d.daily.date) S.daily=lo&&lo.date>d.daily.date?lo:d.daily; else S.daily={...d.daily, count:Math.max(lo.count||0,d.daily.count||0), streak:Math.max(lo.streak||0,d.daily.streak||0), lastMet:lo.lastMet||d.daily.lastMet}; }
      if(d.muted!==undefined) S.muted=d.muted; if(d.voice!==undefined) S.voice=d.voice;
    }
    const q=await doc.collection('attempts').orderBy('ts','desc').limit(100).get(); const stored=q.docs.map(x=>x.data()); const ids=new Set(stored.map(a=>a.id));
    for(const uid in State.s.units){ US(uid).attempts=US(uid).attempts.filter(a=>!ids.has(a.id)); } stored.forEach(a=>US(a.unit||'u1').attempts.push(a));
    if(State.earned||before!==JSON.stringify(State.s.units)) State.save();
    State.learnChanged = before!==JSON.stringify(State.s.units);
  }catch(e){ console.warn('load',e); }
}
async function saveAttempt(a){ US(a.unit||State.unit).attempts.unshift(a); if(!State.db||!State.uid) return; try{ await State.db.doc('data/users/'+State.uid+'/profile').collection('attempts').doc(a.id).set(a); }catch(e){ console.warn('attempt save',e); } }
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
