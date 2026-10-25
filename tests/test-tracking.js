/* Progress tracking end to end in signed-in mode: slow sign-in, every checkpoint type, reload between stages. */
const { chromium } = require('playwright'); const path=require('path');
// Fake claude: store persists in localStorage across reloads; use() answers after a delay (like the real viewer).
const FAKE=`window.__samples=0; const LS=k=>JSON.parse(localStorage.getItem('store')||'{}')[k]; const LSset=(k,v)=>{ const s=JSON.parse(localStorage.getItem('store')||'{}'); if(v===undefined) delete s[k]; else s[k]=v; localStorage.setItem('store',JSON.stringify(s)); };
window.claude={use:async(name)=>{ await new Promise(r=>setTimeout(r,window.__delay||2500));
 if(name==='user') return {id:async()=>'u1', isOwner:async()=>true};
 if(name==='sample'){ const f=async()=>{ window.__samples++; return {text:'Fake hint',truncated:false}; }; f.json=async(i)=>{ window.__samples++; return i.includes('"score"')?{score:2,feedback:'ok'}:{items:[],summary:'Fake summary.'}; }; f.limits=async()=>({}); return f; }
 if(name==='db'){ const mk=(p)=>({path:p, get:async()=>({exists:LS(p)!==undefined, data:()=>LS(p)}), set:async(d)=>LSset(p,JSON.parse(JSON.stringify(d))), delete:async()=>LSset(p,undefined), collection:(c)=>col(p+'/'+c)}); const col=(p)=>({path:p, doc:(id)=>mk(p+'/'+id), orderBy(){return this}, limit(){return this}, get:async()=>{ const s=JSON.parse(localStorage.getItem('store')||'{}'); return {docs:Object.keys(s).filter(k=>k.startsWith(p+'/')).map(k=>({data:()=>s[k]}))}; }}); return {doc:mk, collection:col}; }
 return null; }};`;
const URL='file://'+path.resolve('harness.html'); const out=[]; const ok=(n,c,x='')=>out.push((c?'ok  ':'FAIL')+' '+n+(x?' :: '+x:''));
const ANS={ '1a':'1600 + 400h ≤ 3000','1b':'1600+800(t-3)<=3000','1c':'4.5','2a':0,'2b':'012','2c':1,'3a':'y=k/(5-k)','3b':'y = nx/4 + c','3c':'-11','3d':'2','4a':'w=(P-2l)/2','4b':'36','5a':'18+6.5x<12+7.5x','5b':'x>6','5c':'7','6a':'48<3x+3<69','6b':'15<x<22','6c':'16,17,18; 17,18,19; 18,19,20; 19,20,21; 20,21,22; 21,22,23','6d':{lo:15,hi:22,loOpen:true,hiOpen:true} };
const MINI={1:['25+8h<=65',2,'10+3x<4+5x'],2:['h<=5','4','x>3'],3:['a=m/(4-m)','F=9C/5+32','h=2A/b'],4:['-5','2',1],5:['3<x<8','10,11,12; 11,12,13; 12,13,14',{lo:3,hi:8,loOpen:true,hiOpen:false}],6:[1,1,'20']};
async function explainer(page,n){
  if(n===1){ const W={'at most':'≤','no more than':'≤','a budget of':'≤','less than':'<','under':'<','fewer than':'<','at least':'≥','a minimum of':'≥','no less than':'≥','more than':'>','over':'>','exceeds':'>'}; for(const w in W){ await page.locator('.kw',{hasText:new RegExp('^'+w+'$')}).click(); await page.locator(`.bucket[data-s="${W[w]}"]`).click(); } }
  if(n===2){ await page.click('#jm'); await page.click('#jp'); await page.click('#jp'); for(let k=0;k<8;k++) await page.click('#jp'); }
  if(n===3){ for(const t of ['− 3y','factor','÷ (5 − k)']) await page.locator('.chip',{hasText:t}).click(); }
  if(n===4){ await page.click('#fa'); await page.click('#cross'); await page.locator('.chip[data-k="good"]').click(); }
  if(n===5){ await page.locator('.chip',{hasText:'all three parts'}).first().click(); await page.locator('.chip',{hasText:'÷ 3 all three'}).click(); await page.evaluate(()=>{ /* set via the widget api */ }); const nl=await page.evaluateHandle(()=>document.querySelector('#nl5')); await page.evaluate(()=>{ const host=document.querySelector('#nl5'); }); await page.locator('#nl5 .dot[data-h="lo"]').evaluate(()=>{}); await page.evaluate(()=>{ const s=document.querySelector('#chk5'); }); 
    // drive the number line through pointer events
    const svg=page.locator('#nl5 svg'); await svg.scrollIntoViewIfNeeded(); const box=await svg.boundingBox(); const X=v=>box.x+(24+(v-10)/17*552)/600*box.width; const y=box.y+box.height/2; await page.mouse.move(X(12),y); await page.mouse.down(); await page.mouse.move(X(15),y,{steps:8}); await page.mouse.up(); await page.mouse.move(X(25),y); await page.mouse.down(); await page.mouse.move(X(22),y,{steps:8}); await page.mouse.up(); await page.click('#chk5'); }
  if(n===6){ await page.locator('.chip[data-t="-11"]').click(); await page.locator('.opt[data-i="1"]').click(); }
}
async function mini(page,n){ for(let i=0;i<3;i++){ const q=page.locator('#mb .item').nth(i); const v=MINI[n][i]; const kind=await q.evaluate(e=>e.querySelector('.opts')?'choice':e.querySelector('.nl')?'nl':'text'); if(kind==='choice') await q.locator('.opt').nth(v).click(); else if(kind==='nl') await q.evaluate((e,s)=>e._nl.set(s),v); else await q.locator('.ans').fill(v); await q.locator('.check').click(); await page.waitForTimeout(60); } }
(async()=>{
  const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:390,height:844}}); await ctx.addInitScript(FAKE); const errs=[];
  const page=await ctx.newPage(); page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{ if(m.type()==='error') errs.push('console: '+m.text()); });
  // 1. Race: act before the account data arrives (first open, empty store)
  await page.goto(URL+'#level1'); await page.waitForTimeout(150); ok('starts in public mode before store answers', (await page.evaluate(()=>State.mode))==='public');
  await page.click('[data-lt="boss"]'); const q1=page.locator('#mb .item').nth(0); await q1.locator('.ans').fill('25+8h<=65'); await q1.locator('.check').click();
  await page.waitForTimeout(3200); ok('signed in after delay', (await page.evaluate(()=>State.mode))==='signed');
  ok('pre-load mini-boss kept after load', await page.evaluate(()=>!!State.s.learn.l1?.q1&&State.s.coins===10), await page.evaluate(()=>JSON.stringify({l:State.s.learn,c:State.s.coins})));
  await page.waitForTimeout(900); ok('flushed to store', await page.evaluate(()=>!!JSON.parse(localStorage.getItem('store')||'{}')['data/users/u1/profile']?.learn?.l1?.q1));
  // 2. Reload: still there; lobby reflects it
  await page.goto(URL); await page.reload(); await page.waitForTimeout(3200); ok('reload restores mini-boss + coins', await page.evaluate(()=>!!State.s.learn.l1?.q1&&State.s.coins===10));
  ok('lobby shows 1/5 for level 1', (await page.locator('.portal').first().innerText()).includes('1/5'));
  // 3. Race with existing store: progress made before load must merge, not be overwritten
  await page.evaluate(()=>{ window.__delay=2500; }); await page.goto(URL+'#level1'); await page.waitForTimeout(150); await page.click('[data-lt="boss"]'); const q2=page.locator('#mb .item').nth(1); await q2.locator('.opt').nth(2).click(); await q2.locator('.check').click(); await page.waitForTimeout(3200);
  ok('merge keeps both stored q1 and fresh q2', await page.evaluate(()=>!!State.s.learn.l1?.q1&&!!State.s.learn.l1?.q2&&State.s.coins===20), await page.evaluate(()=>JSON.stringify({l:State.s.learn.l1,c:State.s.coins})));
  ok('open level still interactive after load (no reset)', await page.locator('#mb .item').nth(1).locator('.ck').count()===1);
  // after load, clearing q3 on the same (pre-load) screen must register
  const q3=page.locator('#mb .item').nth(2); await q3.locator('.ans').fill('10+3x<4+5x'); await q3.locator('.check').click(); await page.waitForTimeout(900);
  ok('post-load clear on pre-load screen registers + stored', await page.evaluate(()=>!!State.s.learn.l1?.q3 && !!JSON.parse(localStorage.getItem('store'))['data/users/u1/profile'].learn.l1.q3));
  ok('header open list updates live', !(await page.locator('#openList').innerText()).includes('Mini-boss'));
  // 4. Full walk of every level with a reload after each
  for(let n=1;n<=6;n++){
    await page.goto(URL+'#level'+n); await page.reload(); await page.waitForTimeout(3000);
    await explainer(page,n); await page.waitForTimeout(2200);
    await page.click('[data-lt="video"]'); await page.waitForTimeout(100); await page.click('#vo'); for(let k=0;k<20;k++) await page.click('#nx'); await page.waitForTimeout(2200);
    await page.click('[data-lt="boss"]'); await page.waitForTimeout(100); await mini(page,n); await page.waitForTimeout(1000);
    const st=await page.evaluate(k=>State.s.learn['l'+k],n); const full=st&&st.explainer&&st.video&&st.q1&&st.q2&&st.q3; ok(`level ${n} all 5 checkpoints`, !!full, JSON.stringify(Object.keys(st||{})));
    await page.goto(URL); await page.reload(); await page.waitForTimeout(3000); ok(`level ${n} persists after reload`, (await page.locator('.portal').nth(n-1).innerText()).includes('5/5'));
  }
  const b1=await page.evaluate(()=>Object.keys(State.s.badges)); ok('level badges + Negative Nine', ['l1','l2','l3','l4','l5','l6','nine'].every(x=>b1.includes(x)), b1.join(','));
  // 5. Check: all 19, reload, lobby + guide
  await page.goto(URL+'#check'); await page.reload(); await page.waitForTimeout(3000); const ITEMS_=await page.evaluate(()=>ITEMS.map(i=>({id:i.id,p:i.p,kind:i.kind})));
  for(let p=1;p<=6;p++){ await page.locator(`.pbtn[data-p="${p}"]`).click(); await page.waitForTimeout(120); for(const it of ITEMS_.filter(i=>i.p===p)){ const el=page.locator(`[data-item="${it.id}"]`); const v=ANS[it.id]; if(it.kind==='choice') await el.locator('.opt').nth(v).click(); else if(it.kind==='order'){ for(const c of String(v)) await el.locator(`.pool .chip[data-i="${c}"]`).click(); } else if(it.kind==='numberline') await el.evaluate((e,s)=>e._nl.set(s),v); else await el.locator('.ans').fill(String(v)); if(it.id==='3a') await el.locator('.scratch').fill('k = y(5 - k)'); await el.locator('.check').click(); await page.waitForTimeout(60); } }
  await page.waitForTimeout(1000); await page.goto(URL); await page.reload(); await page.waitForTimeout(3000);
  const c=await page.evaluate(()=>({n:ITEMS.filter(i=>State.s.checks[i.id]?.correct).length, work:State.s.checks['3a']?.work, daily:dailyInfo(), coins:State.s.coins}));
  ok('19/19 persists after reload', c.n===19, JSON.stringify(c)); ok('scratch work persists', c.work==='k = y(5 - k)'); ok('daily goal + streak persist', c.daily.met&&c.daily.streak===1, JSON.stringify(c.daily));
  // 6. Boss run persists
  await page.evaluate(()=>go('boss')); await page.waitForTimeout(150); await page.click('#startBoss'); await page.waitForTimeout(150);
  const T=await page.evaluate(()=>boss.test.items.map(i=>({id:i.id,kind:i.kind,answer:i.answer,var:i.var,correct:i.correct,want:i.want,nl:i.nl})));
  for(const it of T){ const el=page.locator(`[data-item="${it.id}"]`); await el.locator('.work').fill('step 1: = stuff\nstep 2: divide'); if(it.kind==='rel'||it.kind==='num') await el.locator('.ans').fill(it.answer); else if(it.kind==='expr') await el.locator('.ans').fill(it.var+'='+it.answer); else if(it.kind==='choice') await el.locator('.opt').nth(it.correct[0]).click(); else if(it.kind==='order'){ for(const s of [0,1,2]) await el.locator(`.pool .chip[data-i="${s}"]`).click(); } else if(it.kind==='triples') await el.locator('.ans').fill(it.want.map(x=>`${x},${x+1},${x+2}`).join('; ')); else await el.evaluate((e,nl)=>e._nl.set({lo:nl.lo,hi:nl.hi,loOpen:true,hiOpen:true}),it.nl); }
  await page.click('#gradeBtn'); await page.waitForTimeout(1200); await page.goto(URL); await page.reload(); await page.waitForTimeout(3000);
  const a=await page.evaluate(()=>({n:State.s.attempts.length, pct:State.s.attempts[0]?.pct, badges:Object.keys(State.s.badges)})); ok('boss attempt persists after reload', a.n===1&&a.pct===100, JSON.stringify(a)); ok('boss + perfect badges', a.badges.includes('boss')&&a.badges.includes('perfect'));
  // 7. Guide dashboard reflects everything
  await page.evaluate(()=>{State.unlocked=true; go('guide');}); await page.evaluate(()=>{guideTab='dash';render();}); await page.waitForTimeout(200); const g=await page.locator('#gbody').innerText();
  ok('guide: storage signed-in + learn table all ✔', (await page.locator('#app').innerText()).includes('signed in') && (g.match(/✔/g)||[]).length>=30, 'ticks='+(g.match(/✔/g)||[]).length);
  // 8. Reset all, reload: empty
  await page.evaluate(()=>{guideTab='summary';render();}); await page.click('#resetAll'); await page.locator('.modal .btn',{hasText:'Reset all'}).click(); await page.waitForTimeout(500); await page.goto(URL); await page.reload(); await page.waitForTimeout(3000);
  ok('reset all persists (empty after reload)', await page.evaluate(()=>State.s.coins===0&&Object.keys(State.s.learn).length===0&&State.s.attempts.length===0));
  console.log(out.join('\n')); console.log('errors:',errs); console.log(`${out.filter(x=>x.startsWith('ok')).length} passed, ${out.filter(x=>x.startsWith('FAIL')).length} failed`); await b.close();
})();
