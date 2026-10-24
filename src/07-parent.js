/* ===== Parent guide (passphrase-gated) ===== */
let guideTab='summary';
VIEWS.guide = (app)=>{
  if(!State.unlocked){ go('lobby'); openGate(); return; }
  const tabs=[['summary','What the test shows'],['solutions','Worked solutions'],['dash','Attempt dashboard']];
  app.innerHTML=h`<div class="stack">
   <div class="block"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Parent guide</p><h1>Behind the curtain.</h1></div><button class="btn alt sm" id="lockBtn">Lock & return to lobby</button></div>
   <p class="muted" style="margin-top:6px">${State.mode==='signed'?'Signed in: saved attempts load from this account.':'Public link: nothing is saved here, so the dashboard shows only this browser session.'}</p>
   <div class="steps" style="margin-top:12px">${tabs.map(([k,l])=>`<button class="tab" data-t="${k}" aria-current="${guideTab===k?'page':'false'}">${l}</button>`).join('')}</div></div>
   <div id="gbody"></div></div>`;
  $('#lockBtn').onclick=()=>{ State.unlocked=false; go('lobby'); };
  app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ guideTab=b.dataset.t; render(); });
  const body=$('#gbody'); ({summary:guideSummary, solutions:guideSolutions, dash:guideDash})[guideTab](body);
};
function guideSummary(el){
  el.innerHTML=h`<div class="block stack">
   <h2>One page: what the practice test shows</h2>
   <p>Pattern across the test: <b>setup and interpretation are within reach; algebraic manipulation is the gap.</b> Problems 1 and 2 drew real attempts with partial understanding. Problems 3 through 6 were left blank, and Problem 3 (literal equations with the variable on both sides, plus fractions) is both the biggest gap and the largest share of the test. The blank pages matter more than the wrong answers: avoidance costs every point, while a wrong attempt with work shown often earns some.</p>
   <div class="tablewrap"><table><thead><tr><th>Part</th><th>Observed</th></tr></thead><tbody>${OBSERVED.map(o=>`<tr><td><b>${o.id}</b></td><td>${esc(o.note)}</td></tr>`).join('')}</tbody></table></div>
   <h3>Three priorities, in order</h3>
   <ol style="padding-left:22px;display:grid;gap:8px">
    <li><b>Make attempting cheap.</b> The app respawns with no penalty. At home, the matching move is to reward visible work over correct answers for a week. Ask "show me one step" rather than "what did you get?"</li>
    <li><b>Literal equations with the variable on both sides (3a).</b> The sequence to drill is: collect every term containing the variable on one side, factor the variable out, divide by the group. Level 3 animates exactly this with the character Vera the Variable.</li>
    <li><b>Setup discipline (1a, 1b).</b> Before solving, the inequality must read as a sentence about the situation. Ask him to read his inequality aloud as a sentence; the fused solving step in 1a becomes obvious when spoken.</li>
   </ol>
   <h3>Talking points that work better than explanations</h3>
   <ul style="padding-left:22px;display:grid;gap:6px">
    <li>"What was done to the variable <i>last</i>? Undo that first."</li>
    <li>"Which terms have the variable hiding in them? Even the sneaky one with a letter in front?"</li>
    <li>"The fraction bar is a grouping symbol. What is the whole top? Put parentheses around it."</li>
    <li>"Three parts, three treatments. Did all three parts get it?"</li>
    <li>"That is the algebra answer. What does the real world say? Can you buy half a jug?"</li>
    <li>"Plug it back in. Does the original equation hold?"</li>
   </ul>
  </div>`;
}
function guideSolutions(el){
  el.innerHTML=h`<div class="block stack"><h2>Worked solutions, step by step</h2><p class="muted">For each part: the answer, every step, the misconception most likely at that step, and a question to ask instead of a lecture.</p>
   ${PROBLEMS.map(P=>`<h3 style="margin-top:10px">Problem ${P.n}: ${esc(P.title)}</h3><p class="muted" style="font-size:.92rem">${P.stem}</p>${ITEMS.filter(i=>i.p===P.n).map(it=>{ const g=GUIDE[it.id]; const rec=State.s.checks[it.id]; return `<details><summary>${it.id.toUpperCase()} · ${it.prompt.replace(/<[^>]+>/g,'').slice(0,80)}${rec?` <span class="muted" style="font-family:var(--body);font-size:.8rem">(${rec.correct?'cleared':'not yet'}, ${rec.attempts} tr${rec.attempts===1?'y':'ies'})</span>`:''}</summary><p><b>Answer:</b> <span class="eq" style="white-space:normal">${esc(g.answer)}</span></p>${g.steps.map((s,i)=>`<div class="gstep"><span class="k">${i+1}</span><div><div>${esc(s.s)}</div><span class="lbl">Likely misconception</span><div class="m">${esc(s.m)}</div><span class="lbl">Ask</span><div class="ask">${esc(s.ask)}</div></div></div>`).join('')}${rec&&rec.work?`<span class="lbl" style="font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);display:block;margin-top:8px">His scratch work</span><div class="workbox">${esc(rec.work)}</div>`:''}${rec&&rec.history.length?`<span class="lbl" style="font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);display:block;margin-top:8px">His attempts here</span><div class="row" style="gap:6px">${rec.history.map(x=>`<span class="badge ${x.ok?'got':''}" style="font-size:.8rem">${x.ok?'✔':'✘'} ${esc(x.raw).slice(0,40)}</span>`).join('')}</div>`:''}</details>`; }).join('')}`).join('')}
  </div>`;
}
function skillStats(){
  const S={}; Object.keys(SKILL_NAMES).forEach(k=>S[k]={checkOk:0,checkTried:0,checkFirst:0,pracOk:0,pracN:0});
  ITEMS.forEach(it=>{ const r=State.s.checks[it.id]; if(r&&r.attempts){ S[it.skill].checkTried++; if(r.correct) S[it.skill].checkOk++; if(r.firstTry) S[it.skill].checkFirst++; } });
  State.s.attempts.forEach(a=>(a.items||[]).forEach(x=>{ if(S[x.skill]){ S[x.skill].pracN++; if(x.ok) S[x.skill].pracOk++; } }));
  return S;
}
function guideDash(el){
  const S=skillStats(); const A=[...State.s.attempts].sort((a,b)=>b.ts-a.ts);
  const pct=(a,b)=>b?Math.round(100*a/b):null; const bar=(a,b)=>{ const p=pct(a,b); return p===null?'<span class="muted">—</span>':`<div class="row" style="gap:8px;flex-wrap:nowrap"><div class="bar" style="flex:1"><i style="width:${p}%"></i></div><span class="num" style="min-width:3.5em;text-align:right">${p}% <span class="muted" style="font-size:.8rem">(${a}/${b})</span></span></div>`; };
  el.innerHTML=h`<div class="stack">
   <div class="block"><h2>Per-skill accuracy</h2><p class="muted">Check = his real test items (cleared on first try / attempted). Final Boss = every graded sub-part across all runs.</p>
    <div class="tablewrap"><table><thead><tr><th>Skill</th><th>Check: first-try</th><th>Check: cleared</th><th>Final Boss</th></tr></thead><tbody>
    ${Object.keys(SKILL_NAMES).map(k=>`<tr><td><b>${SKILL_NAMES[k]}</b><br><span class="muted" style="font-size:.8rem">Level ${LEVELS.find(L=>L.skill===k).n}</span></td><td>${bar(S[k].checkFirst,S[k].checkTried)}</td><td>${bar(S[k].checkOk,S[k].checkTried)}</td><td>${bar(S[k].pracOk,S[k].pracN)}</td></tr>`).join('')}
    </tbody></table></div></div>
   <div class="block"><h2>Final Boss runs</h2>${A.length?`<div class="tablewrap"><table><thead><tr><th>When</th><th class="n">Score</th><th>Missed</th><th>Seed</th></tr></thead><tbody>${A.map(a=>`<tr><td>${new Date(a.ts).toLocaleString()}</td><td class="n"><b>${a.score}/${a.total}</b> (${a.pct}%)</td><td>${(a.items||[]).filter(x=>!x.ok).map(x=>x.id).join(', ')||'none'}</td><td class="num">${a.seed}</td></tr>`).join('')}</tbody></table></div>
    ${A[0]&&A[0].ai?`<h3 style="margin-top:14px">Latest coach summary</h3><p>${esc(A[0].ai)}</p>`:''}
    ${A[0]?`<details style="margin-top:12px"><summary>Latest run: his work, item by item</summary>${(A[0].items||[]).map(x=>`<div class="gstep"><span class="k">${x.id}</span><div><div>${x.ok?'<b style="color:var(--ok)">✔ correct</b>':'<b style="color:var(--bad)">✘ missed</b>'} · answer: <span class="eq" style="white-space:normal">${esc(x.raw||'(blank)')}</span></div>${x.work?`<div class="workbox">${esc(x.work)}</div>`:''}${x.diag?`<div class="muted" style="font-size:.9rem">${esc(x.diag)}</div>`:''}</div></div>`).join('')}</details>`:''}`
    :`<p class="muted">No Final Boss runs yet${State.mode==='signed'?'.':' (and in public mode runs are not saved).'}</p>`}</div>
   <div class="block"><h2>Check My Answers log</h2><div class="tablewrap"><table><thead><tr><th>Part</th><th>Skill</th><th class="n">Tries</th><th>Status</th><th>Last typed</th></tr></thead><tbody>${ITEMS.map(it=>{ const r=State.s.checks[it.id]; return `<tr><td><b>${it.id}</b></td><td>${SKILL_NAMES[it.skill]}</td><td class="n">${r?r.attempts:0}</td><td>${r?(r.correct?(r.firstTry?'✔ first try':'✔ after respawn'):'✘ open'):'—'}</td><td class="muted" style="font-size:.85rem">${r&&r.history.length?esc(r.history[r.history.length-1].raw).slice(0,40):''}</td></tr>`; }).join('')}</tbody></table></div></div>
  </div>`;
}
