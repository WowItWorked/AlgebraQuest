/* ===== Journal, Shop (avatar gear), Rematch Chest, read-aloud ===== */

/* ---- Avatar: parametric blocky figure. State.s.avatar = {skin, hat, pet} ---- */
const SKINS={green:'#2fb37a',blue:'#3a7bd5',red:'#d8383e',purple:'#7c4dff',gold:'#f5b800',black:'#2b2f36'};
const SHOP=[
  {id:'skin:blue',cat:'Shirt',name:'Ocean shirt',price:30,ico:'👕'},{id:'skin:red',cat:'Shirt',name:'Lava shirt',price:30,ico:'👕'},{id:'skin:purple',cat:'Shirt',name:'Portal shirt',price:40,ico:'👕'},{id:'skin:gold',cat:'Shirt',name:'Gold shirt',price:80,ico:'👕'},{id:'skin:black',cat:'Shirt',name:'Night shirt',price:60,ico:'👕'},
  {id:'hat:cap',cat:'Hat',name:'Cap',price:40,ico:'🧢'},{id:'hat:crown',cat:'Hat',name:'Crown',price:150,ico:'👑'},{id:'hat:wizard',cat:'Hat',name:'Wizard hat',price:120,ico:'🎩'},{id:'hat:band',cat:'Hat',name:'Headband',price:25,ico:'🎀'},
  {id:'pet:slime',cat:'Pet',name:'Slime',price:90,ico:'🟩'},{id:'pet:cat',cat:'Pet',name:'Cat',price:110,ico:'🐱'},{id:'pet:bee',cat:'Pet',name:'Bee',price:70,ico:'🐝'},{id:'pet:ghost',cat:'Pet',name:'Ghost',price:130,ico:'👻'},
];
function avatarSVG(av){
  av=av||(State&&State.s&&State.s.avatar)||{}; const shirt=SKINS[av.skin]||SKINS.green;
  const hat={cap:`<rect x="5" y="0" width="24" height="5" fill="#d8383e" stroke="#1d2733" stroke-width="2"/><rect x="24" y="3" width="9" height="3" fill="#d8383e" stroke="#1d2733" stroke-width="1.5"/>`,
    crown:`<polygon points="7,4 11,-3 17,3 23,-3 27,4" fill="#f5b800" stroke="#1d2733" stroke-width="2"/>`,
    wizard:`<polygon points="17,-10 6,5 28,5" fill="#7c4dff" stroke="#1d2733" stroke-width="2"/><circle cx="17" cy="-9" r="2" fill="#f5b800"/>`,
    band:`<rect x="6" y="3" width="22" height="4" fill="#e23c7f" stroke="#1d2733" stroke-width="1.5"/>`}[av.hat]||'';
  const pet={slime:`<g transform="translate(34,30)"><rect x="0" y="4" width="12" height="10" fill="#5bc236" stroke="#1d2733" stroke-width="2"/><rect x="3" y="7" width="2" height="2" fill="#1d2733"/><rect x="7" y="7" width="2" height="2" fill="#1d2733"/></g>`,
    cat:`<g transform="translate(34,28)"><polygon points="1,4 1,0 4,3" fill="#f0a35e" stroke="#1d2733" stroke-width="1"/><polygon points="11,4 11,0 8,3" fill="#f0a35e" stroke="#1d2733" stroke-width="1"/><rect x="0" y="3" width="12" height="13" fill="#f0a35e" stroke="#1d2733" stroke-width="2"/><rect x="3" y="7" width="2" height="2" fill="#1d2733"/><rect x="7" y="7" width="2" height="2" fill="#1d2733"/></g>`,
    bee:`<g transform="translate(34,18)"><rect x="0" y="2" width="12" height="8" fill="#f5b800" stroke="#1d2733" stroke-width="2"/><rect x="4" y="2" width="2" height="8" fill="#1d2733"/><rect x="8" y="2" width="2" height="8" fill="#1d2733"/><ellipse cx="6" cy="0" rx="5" ry="2" fill="#cfe6ff" stroke="#1d2733" stroke-width="1"/></g>`,
    ghost:`<g transform="translate(34,22)"><path d="M0 6 Q0 0 6 0 Q12 0 12 6 V16 L9 13 L6 16 L3 13 L0 16 Z" fill="#eef2f7" stroke="#1d2733" stroke-width="2"/><rect x="3" y="5" width="2" height="2" fill="#1d2733"/><rect x="7" y="5" width="2" height="2" fill="#1d2733"/></g>`}[av.pet]||'';
  return `<svg viewBox="-2 -12 50 58" aria-hidden="true" style="overflow:visible"><rect x="7" y="2" width="20" height="18" fill="#f3c08a" stroke="#1d2733" stroke-width="3"/><rect x="7" y="2" width="20" height="6" fill="#5a3b1e"/>${hat}<rect x="12" y="10" width="3" height="3" fill="#1d2733"/><rect x="20" y="10" width="3" height="3" fill="#1d2733"/><rect x="13" y="15" width="8" height="2" fill="#1d2733"/><rect x="5" y="21" width="24" height="14" fill="${shirt}" stroke="#1d2733" stroke-width="3"/><rect x="1" y="21" width="4" height="12" fill="#f3c08a" stroke="#1d2733" stroke-width="2"/><rect x="29" y="21" width="4" height="12" fill="#f3c08a" stroke="#1d2733" stroke-width="2"/><rect x="7" y="35" width="8" height="9" fill="#3a56a8" stroke="#1d2733" stroke-width="2"/><rect x="19" y="35" width="8" height="9" fill="#3a56a8" stroke="#1d2733" stroke-width="2"/>${pet}</svg>`;
}
VIEWS.shop=(app)=>{
  const owned=new Set(State.s.owned||[]); const av=State.s.avatar; const cats=['Shirt','Hat','Pet'];
  const equipped=id=>{ const [k,v]=id.split(':'); return av[k]===v; };
  app.innerHTML=h`<div class="stack">
   <div class="block"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Coin shop</p><h1>Dress your block.</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div><p class="muted" style="margin-top:6px">Looks only. No gear changes the math. Coins come from checkpoints, correct answers, and boss runs.</p>
    <div class="row" style="margin-top:14px;align-items:flex-end"><div class="avprev">${avatarSVG(av)}</div><div><div class="pill coins" style="font-size:1.1rem"><span class="coin"></span><span class="num">${State.s.coins}</span> coins</div><p class="muted" style="font-size:.85rem;margin-top:6px">Tap an owned item to wear it. Tap it again to take it off.</p></div></div></div>
   ${cats.map(c=>`<div class="block"><h2>${c}s</h2><div class="shopgrid">${(c==='Shirt'?[{id:'skin:green',cat:'Shirt',name:'Grass shirt',price:0,ico:'👕'}]:[{id:(c==='Hat'?'hat':'pet')+':none',cat:c,name:'None',price:0,ico:'∅'}]).concat(SHOP.filter(s=>s.cat===c)).map(s=>{ const own=s.price===0||owned.has(s.id); const eq=equipped(s.id); return `<button type="button" class="shopitem ${own?'own':''} ${eq?'eq':''}" data-id="${s.id}" data-price="${s.price}" ${!own&&State.s.coins<s.price?'disabled':''}><span class="ico">${s.ico}</span><b>${esc(s.name)}</b><span class="muted num">${own?(eq?'wearing':'owned'):s.price+' coins'}</span></button>`; }).join('')}</div></div>`).join('')}
  </div>`;
  app.querySelectorAll('.shopitem').forEach(b=>b.onclick=()=>{ const id=b.dataset.id, price=+b.dataset.price; const [k,v]=id.split(':'); const own=price===0||owned.has(id);
    if(!own){ if(State.s.coins<price) return; modal(`<h2>Buy ${esc(SHOP.find(s=>s.id===id).name)} for ${price} coins?</h2><p class="muted">You have ${State.s.coins}.</p>`,[{label:'Not now',cls:'alt'},{label:'Buy and wear',cls:'gold',fn:()=>{ State.s.coins-=price; (State.s.owned=State.s.owned||[]).push(id); av[k]=v; State.save(); ding(); toast('Bought. Looking sharp.'); render(); }}]); return; }
    av[k]= (av[k]===v && v!=='none' && k!=='skin') ? 'none' : v; State.save(); render(); });
};

/* ---- Journal: every correct answer with his notes, across units ---- */
function journalEntries(){
  const out=[]; for(const uid in UNITS){ const u=UNITS[uid]; const st=US(uid);
    u.ITEMS.forEach(it=>{ const r=st.checks[it.id]; if(r&&r.correct) out.push({unit:u,section:'Check',lesson:(u.PROBLEMS.find(P=>P.n===it.p)||{}),id:it.id,prompt:it.prompt,answer:r.answer||'',work:r.work||'',ts:r.clearedAt||0}); });
    u.LEVELS.forEach(L=>{ const l=st.learn['l'+L.n]||{}; (u.MINI[L.n]||[]).forEach((q,i)=>{ const key='q'+(i+1); if(l[key]) out.push({unit:u,section:'Level '+L.n+' mini-boss',lesson:{title:L.title},id:'L'+L.n+'Q'+(i+1),prompt:q.prompt,answer:l['a'+key]||'✔',work:l['w'+key]||'',ts:l[key]}); }); });
    st.attempts.forEach(a=>(a.items||[]).forEach(x=>{ if(x.ok) out.push({unit:u,section:'Final Boss run '+a.seed,lesson:{title:new Date(a.ts).toLocaleDateString()},id:x.id,prompt:'',answer:x.raw,work:x.work||'',ts:a.ts}); })); }
  return out;
}
let journalUnit='all';
VIEWS.journal=(app)=>{
  const all=journalEntries(); const es=all.filter(e=>journalUnit==='all'||e.unit.id===journalUnit); const groups={};
  es.forEach(e=>{ const k=e.unit.title+' · '+e.section; (groups[k]=groups[k]||[]).push(e); });
  app.innerHTML=h`<div class="stack">
   <div class="block"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Journal</p><h1>Everything you have solved.</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div><p class="muted" style="margin-top:6px">Every correct answer is kept here with your notes, so you can look back at how you did it. ${State.mode==='signed'?'':'On a public link this lasts only while the page is open.'}</p>
    <div class="row" style="margin-top:10px"><button class="tab" data-ju="all" aria-current="${journalUnit==='all'?'page':'false'}">All</button>${Object.values(UNITS).map(u=>`<button class="tab" data-ju="${u.id}" aria-current="${journalUnit===u.id?'page':'false'}">${esc(u.short)}</button>`).join('')}<span class="muted num" style="margin-left:auto">${es.length} entr${es.length===1?'y':'ies'}</span></div></div>
   ${es.length?Object.keys(groups).map(k=>`<div class="block"><h2>${esc(k)}</h2><div class="stack" style="margin-top:10px">${groups[k].sort((a,b)=>String(a.id).localeCompare(String(b.id),undefined,{numeric:true})).map(e=>`<div class="jentry"><div class="tag">${esc(String(e.id).toUpperCase())}${e.lesson.title?` <span class="muted" style="font-family:var(--body);font-size:.8rem;font-weight:700">· ${esc(e.lesson.title)}</span>`:''}</div>${e.prompt?`<div style="font-size:.95rem">${e.prompt}</div>`:''}<div><span class="muted">Answer:</span> <span class="eq" style="white-space:normal">${esc(e.answer)}</span></div>${e.work?`<div class="workbox">${esc(e.work)}</div>`:'<div class="muted" style="font-size:.85rem">No notes written for this one.</div>'}</div>`).join('')}</div></div>`).join(''):'<div class="block soft"><p>Nothing solved yet. Clear a Check item, a mini-boss, or a Final Boss question and it lands here with your notes.</p></div>'}
  </div>`;
  app.querySelectorAll('[data-ju]').forEach(b=>b.onclick=()=>{ journalUnit=b.dataset.ju; render(); });
};

/* ---- Rematch Chest: spaced retrieval of past misses, fresh numbers, once a day ---- */
function missedIds(){ const out=[]; for(const uid in UNITS){ const st=US(uid); for(const id in st.checks){ const r=st.checks[id]; if(r.history&&r.history.some(x=>!x.ok)) out.push(uid+':'+id); } st.attempts.forEach(a=>(a.items||[]).forEach(x=>{ if(!x.ok) out.push(uid+':'+x.id); })); } return [...new Set(out)]; }
function chestToday(){ const today=localDay(0); let c=State.s.chest; const seed=parseInt(today.replace(/-/g,''),10)%100000;
  if(!c||c.date!==today) c=State.s.chest={date:today,seed,ids:[],done:{}};
  // Top the chest up to 5 open rematches from misses it does not hold yet (new misses can appear during the day).
  const open=c.ids.filter(id=>!c.done[id]).length; if(open<5){ const pool=missedIds().filter(id=>!c.ids.includes(id)); if(pool.length){ const r=M.rng(seed+c.ids.length); const add=[...pool].sort(()=>r()-0.5).slice(0,5-open); c.ids.push(...add); State.save(); } }
  return c; }
function chestCount(){ const c=chestToday(); return c.ids.filter(id=>!c.done[id]).length; }
VIEWS.chest=(app)=>{
  const c=chestToday(); const tests={}; const items=c.ids.map(key=>{ const [uid,id]=key.split(':'); const u=UNITS[uid]; if(!u) return null; tests[uid]=tests[uid]||u.genTest(c.seed); const it=tests[uid].items.find(x=>x.id===id); return it?{key,uid,it}:null; }).filter(Boolean);
  const left=items.filter(x=>!c.done[x.key]).length;
  app.innerHTML=h`<div class="stack">
   <div class="block" style="border-color:var(--gold)"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Rematch Chest</p><h1>${items.length?(left?'Old enemies, new numbers.':'Chest emptied for today.'):'The chest is empty.'}</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div>
    <p class="muted" style="margin-top:6px">${items.length?'Questions you missed before come back here with fresh numbers. 15 coins each, and beating one is the best way to make it stick. A new chest appears each day.':'It fills with questions you have missed in Check or the Final Boss. No misses yet means nothing to rematch. Come back after a boss run.'}</p></div>
   ${items.map(({key,uid,it})=>`<div class="item ${c.done[key]?'ok':''}" data-item="${it.id}" data-key="${key}"><div class="tag">${esc(UNITS[uid].short)} · ${it.id.toUpperCase()} ${c.done[key]?'<span class="ck">✔ beaten</span>':''}</div><div>${it.prompt}</div><label class="muted" style="font-size:.85rem">Work it out here</label><textarea class="scratch" placeholder="Steps, scribbles, anything."></textarea>${answerUI(it,'ch')}<div class="row"><button type="button" class="btn sm check" ${c.done[key]?'disabled':''}>Check</button></div><div class="fbwrap"></div></div>`).join('')}
  </div>`;
  items.forEach(({key,uid,it})=>{ const el=app.querySelector(`[data-key="${key}"]`); wireAnswerUI(it,el); let misses=0; $('.check',el).onclick=()=>{ const raw=rawOf(it,el).trim(); if(!raw&&it.kind!=='numberline'){ showFB(el,'info','Type something first.'); return; } const extra=it.kind==='numberline'?el._nl.get():(el._get?el._get():null); const g=gradeItem(it,raw,extra);
      if(g.ok){ el.classList.add('ok'); el.classList.remove('bad'); c.done[key]=Date.now(); State.addCoins(15,'rematch won'); State.checkpoint(); showFB(el,'ok','Rematch won. That one is yours now.'); $('.check',el).disabled=true; $('.tag',el).innerHTML+=' <span class="ck">✔ beaten</span>'; State.save(); }
      else { misses++; thud(); el.classList.add('bad'); const why=diagnose(it,raw,extra)||it.diag; showFB(el,'bad',`<span class="who">Respawn</span>${g.partial?g.partial+' ':''}${esc(why)}${misses>=2?`<br><span class="muted">Correct form: ${esc(it.show)}</span>`:''}<br>${learnLinkFor(uid,it.learn)}`); } }; });
};
function learnLinkFor(uid,n){ const L=UNITS[uid].LEVELS[n-1]; return `<a href="#" data-gounit="${uid}" data-level="${n}">→ ${esc(UNITS[uid].short)} Level ${n}: ${esc(L.title)}</a>`; }
document.addEventListener('click',e=>{ const a=e.target.closest('[data-gounit]'); if(a){ e.preventDefault(); State.unit=a.dataset.gounit; go('level',+a.dataset.level); } });

/* ---- Read-aloud: pre-rendered clip when one exists, browser speech as a fallback ---- */
let raAudio=null;
function raButton(key,text){ return `<button type="button" class="ra" data-ra="${esc(key)}" data-text="${esc(text.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim())}" aria-label="Read aloud" title="Read aloud">🔊</button>`; }
document.addEventListener('click',e=>{ const b=e.target.closest('.ra'); if(!b) return; if(State.s.muted){ toast('Sound is off. Turn it on from the map.'); return; }
  try{ if(raAudio){ raAudio.pause(); } if(window.speechSynthesis) speechSynthesis.cancel(); }catch(x){}
  const key=b.dataset.ra, text=b.dataset.text; const a=new Audio('voices/ra/'+key+'.mp3'); raAudio=a; b.classList.add('on'); a.onended=()=>b.classList.remove('on');
  a.onerror=()=>{ try{ if(!window.speechSynthesis){ b.classList.remove('on'); return; } const u=new SpeechSynthesisUtterance(text.replace(/≤/g,' less than or equal to ').replace(/≥/g,' greater than or equal to ').replace(/</g,' less than ').replace(/>/g,' greater than ').replace(/−/g,' minus ')); u.rate=1; u.onend=()=>b.classList.remove('on'); speechSynthesis.speak(u);}catch(x){ b.classList.remove('on'); } };
  a.play().catch(()=>a.onerror()); });
