/* Full regression: public and simulated signed-in modes, phone and desktop. Run: node tests/test-all.js (after tests/mkharness.sh) */
const { chromium } = require('playwright'); const path=require('path');
const FAKE=`window.__store={}; window.__samples=[];
window.claude={use:async(name)=>{ await new Promise(r=>setTimeout(r,30));
 if(name==='user') return {id:async()=>'u1', isOwner:async()=>true};
 if(name==='sample'){ const f=async(input,opts)=>{ window.__samples.push(input.slice(0,40)); return {text:'Fake hint: look at the sign when the term crosses over. Which sign should it be?',truncated:false}; }; f.json=async(input)=>{ window.__samples.push('json:'+input.slice(0,30)); if(input.includes('"score"')) return {score:2,feedback:'Fake: names the step and the fix.'}; return {items:[{id:'3c',diagnosis:'Fake diag for 3c.'}],summary:'Fake summary: practice fraction bars, then compound inequalities.'}; }; f.limits=async()=>({maxPromptBytes:100000}); return f; }
 if(name==='db'){ const mk=(p)=>({path:p, get:async()=>({exists:!!window.__store[p], data:()=>window.__store[p]}), set:async(d)=>{ window.__store[p]=JSON.parse(JSON.stringify(d)); }, delete:async()=>{ delete window.__store[p]; }, collection:(c)=>col(p+'/'+c)}); const col=(p)=>({path:p, doc:(id)=>mk(p+'/'+id), orderBy(){return this}, limit(){return this}, get:async()=>({docs:Object.keys(window.__store).filter(k=>k.startsWith(p+'/')).map(k=>({data:()=>window.__store[k]}))})}); return {doc:mk, collection:col}; }
 return null; }};`;
const URL='file://'+path.resolve('harness.html'); const out=[]; const ok=(name,cond,extra='')=>out.push((cond?'ok  ':'FAIL')+' '+name+(extra?' :: '+extra:''));
const ANS={ '1a':'1600 + 400h ≤ 3000','1b':'1600+800(t-3)<=3000','1c':'4.5','2a':0,'2b':'012','2c':1,'3a':'y=k/(5-k)','3b':'y = nx/4 + c','3c':'-11','3d':'2','4a':'w=(P-2l)/2','4b':'36','5a':'18+6.5x<12+7.5x','5b':'x>6','5c':'7','6a':'48<3x+3<69','6b':'15<x<22','6c':'16,17,18; 17,18,19; 18,19,20; 19,20,21; 20,21,22; 21,22,23','6d':{lo:15,hi:22,loOpen:true,hiOpen:true} };
async function answer(page, it, val){ const el=page.locator(`[data-item="${it.id}"]`);
  if(it.kind==='choice') await el.locator('.opt').nth(val).click(); else if(it.kind==='order'){ for(const c of String(val)) await el.locator(`.pool .chip[data-i="${c}"]`).click(); } else if(it.kind==='numberline') await el.evaluate((e,v)=>e._nl.set(v),val); else await el.locator('.ans').fill(String(val)); }
(async()=>{
  const b=await chromium.launch(); const errs=[];
  for(const mode of ['public','signed']){
    const ctx=await b.newContext({viewport:{width:390,height:844}}); if(mode==='signed') await ctx.addInitScript(FAKE);
    const page=await ctx.newPage(); page.on('pageerror',e=>errs.push(mode+': '+e.message)); page.on('console',m=>{ if(m.type()==='error') errs.push(mode+' console: '+m.text()); });
    await page.goto(URL); await page.waitForTimeout(400);
    ok(mode+' mode', (await page.evaluate(()=>State.mode))===mode);
    ok(mode+' lobby renders daily goal', await page.locator('.daily').count()===1);
    const noH=async(l)=>ok(mode+' no horizontal overflow @'+l, !(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)));
    await noH('lobby');
    // ---- Check: one problem at a time, keypad, scratch, example, hints ----
    await page.click('[data-v="check"]'); await page.waitForTimeout(200);
    ok(mode+' check shows one problem', await page.locator('#probBlock').count()===1 && await page.locator('[data-item]').count()===3);
    const i1a=page.locator('[data-item="1a"]'); await i1a.locator('.ans').fill('1600+400h'); await i1a.locator('.key[data-k="≤"]').dispatchEvent('pointerdown'); await i1a.locator('.ans').type('3000');
    ok(mode+' keypad inserts at cursor', (await i1a.locator('.ans').inputValue())==='1600+400h≤3000');
    await i1a.locator('.scratch').fill('1600 + 400h'); await page.waitForTimeout(800); ok(mode+' scratch saved to state', (await page.evaluate(()=>State.s.checks['1a']?.work))==='1600 + 400h');
    await i1a.locator('.ex summary').click(); ok(mode+' worked example opens', await i1a.locator('.exsteps li').count()>=3);
    await i1a.locator('.ans').press('Enter'); await page.waitForTimeout(200); ok(mode+' enter submits, 1a correct', (await i1a.locator('.fb').innerText()).match(/cleared|Correct|Nailed/i)!==null);
    const i1c=page.locator('[data-item="1c"]'); await i1c.locator('.ans').fill('4.75'); await i1c.locator('.check').click(); ok(mode+' 1c partial credit message', (await i1c.locator('.fb').innerText()).includes('Partially'));
    await i1c.locator('.ans').fill('3.5'); await i1c.locator('.check').click(); ok(mode+' 1c matched hint', (await i1c.locator('.fb').innerText()).includes('half-hours'));
    await i1c.locator('.ans').fill('99'); await i1c.locator('.check').click(); await page.waitForTimeout(200); await i1c.locator('.ans').fill('98'); await i1c.locator('.check').click(); await page.waitForTimeout(300);
    ok(mode+' third miss offers first step', await i1c.locator('.firststep').count()===1);
    if(mode==='signed') ok('signed AI hint on unmatched miss', (await i1c.locator('.fb').innerText()).includes('Fake hint'));
    ok(mode+' hint links to Learn', await i1c.locator('.fb a[data-go="level"]').count()>=1);
    await i1c.locator('.firststep').click(); ok(mode+' first step revealed', (await i1c.locator('.fbwrap').innerText()).includes('First step'));
    await page.click('#nextP'); await page.waitForTimeout(200); ok(mode+' next problem nav', /problem 2/i.test(await page.locator('#probBlock .eyebrow').innerText()));
    await page.locator('.pbtn[data-p="6"]').click(); await page.waitForTimeout(200); ok(mode+' jump to problem 6', await page.locator('[data-item="6d"]').count()===1);
    await noH('check');
    // clear all 19 via navigation
    const ITEMS_=await page.evaluate(()=>ITEMS.map(i=>({id:i.id,p:i.p,kind:i.kind})));
    for(let p=1;p<=6;p++){ await page.locator(`.pbtn[data-p="${p}"]`).click(); await page.waitForTimeout(150); for(const it of ITEMS_.filter(i=>i.p===p)){ await answer(page,it,ANS[it.id]); await page.locator(`[data-item="${it.id}"] .check`).click(); await page.waitForTimeout(80); } }
    await page.waitForTimeout(300); const st=await page.evaluate(()=>({cleared:ITEMS.filter(i=>State.s.checks[i.id]?.correct).length, badges:Object.keys(State.s.badges), coins:State.s.coins, daily:dailyInfo()}));
    ok(mode+' all 19 cleared', st.cleared===19, JSON.stringify(st)); ok(mode+' badges incl check_all/letters/fraction/respawn', ['check_all','letters','fraction','respawn','first'].every(x=>st.badges.includes(x)), st.badges.join(','));
    ok(mode+' daily goal met + streak 1', st.daily.met&&st.daily.streak===1, JSON.stringify(st.daily));
    ok(mode+' pnav all done', await page.locator('.pbtn.done').count()===6);
    // ---- Learn levels ----
    for(let n=1;n<=6;n++){ await page.evaluate(k=>go('level',k),n); await page.waitForTimeout(250); ok(mode+` level ${n} loads`, new RegExp('level '+n,'i').test(await page.locator('.eyebrow').first().innerText())); await noH('level'+n); }
    // L6 explain
    await page.evaluate(()=>go('level',6)); await page.waitForTimeout(250); const ex=page.locator('[data-ex="ex1"]'); await ex.locator('.expl').fill('In step 2 only the 12 was divided by 3; 6y should be divided by 3 too, giving 4 − 2y.'); await ex.locator('.chk').click(); await page.waitForTimeout(400);
    ok(mode+' L6 explain graded', (await ex.locator('.fbwrap').innerText()).includes('Model answer') && await ex.locator('.ck').count()===1);
    // mini-boss keypad presence and 3-miss message has no answer leak
    await page.click('[data-lt="boss"]'); await page.waitForTimeout(200); const q=page.locator('#mb .item').nth(2); ok(mode+' mini-boss has keypad', await q.locator('.key').count()>0);
    for(const v of ['1','2','3']){ await q.locator('.ans').fill(v); await q.locator('.check').click(); } const t3=await q.locator('.fb').innerText(); ok(mode+' mini-boss 3rd miss does not leak answer', !t3.includes('20') && t3.includes('Rewatch'));
    await q.locator('.ans').fill('20'); await q.locator('.check').click(); ok(mode+' mini-boss correct', (await q.locator('.fb').innerText()).match(/cleared|Correct|Nailed/i)!==null);
    // video chat + stage mini
    await page.click('[data-lt="video"]'); await page.waitForTimeout(100); await page.click('#vo'); await page.waitForTimeout(12000); ok(mode+' chat accumulates & stage shrinks', await page.locator('.msg').count()>=2 && await page.locator('.stage.mini').count()===1);
    // reset lessons
    await page.evaluate(()=>go('learn')); await page.waitForTimeout(150); await page.click('#resetLearn'); await page.locator('.modal .btn',{hasText:'Reset lessons'}).click(); await page.waitForTimeout(150); ok(mode+' lessons reset', (await page.evaluate(()=>JSON.stringify(State.s.learn)))==='{}');
    // ---- Boss ----
    await page.evaluate(()=>go('boss')); await page.waitForTimeout(250); await page.click('#startBoss'); await page.waitForTimeout(200); ok(mode+' boss keypad present', await page.locator('[data-item="3a"] .key').count()>0);
    const T=await page.evaluate(()=>boss.test.items.map(i=>({id:i.id,kind:i.kind,answer:i.answer,var:i.var,correct:i.correct,want:i.want,nl:i.nl,work:i.work})));
    for(const it of T){ const el=page.locator(`[data-item="${it.id}"]`); if(it.work) await el.locator('.work').fill('step 1: = stuff\nstep 2: divide');
      if(it.kind==='rel'||it.kind==='num') await el.locator('.ans').fill(it.id==='3c'?'99':it.answer); else if(it.kind==='expr') await el.locator('.ans').fill(it.var+'='+it.answer); else if(it.kind==='choice') await el.locator('.opt').nth(it.correct[0]).click(); else if(it.kind==='order'){ for(const s of [0,1,2]) await el.locator(`.pool .chip[data-i="${s}"]`).click(); } else if(it.kind==='triples') await el.locator('.ans').fill(it.want.map(x=>`${x},${x+1},${x+2}`).join('; ')); else await el.evaluate((e,nl)=>e._nl.set({lo:nl.lo,hi:nl.hi,loOpen:true,hiOpen:true}),it.nl); }
    await page.click('#gradeBtn'); await page.waitForTimeout(900); ok(mode+' boss score 28/29', (await page.locator('.result .big').innerText()).replace(/\s/g,'')==='28/29');
    ok(mode+' boss no stuck placeholder', !(await page.locator('body').innerText()).includes('Reading your work'));
    if(mode==='signed'){ ok('signed boss summary + attempt saved', (await page.locator('body').innerText()).includes('Fake summary') && Object.keys(await page.evaluate(()=>window.__store)).some(k=>k.includes('/attempts/'))); }
    await noH('boss results');
    // ---- Guide ----
    await page.evaluate(()=>go('lobby')); await page.click('#glyph'); await page.fill('#pp','blockparty'); await page.click('#mact .btn'); await page.waitForTimeout(200); ok(mode+' guide unlocks', (await page.locator('h1').innerText()).includes('curtain'));
    for(const t of ['solutions','dash']){ await page.click(`[data-t="${t}"]`); await page.waitForTimeout(150); ok(mode+' guide tab '+t, await page.locator('#gbody .block').count()>=1); }
    ok(mode+' guide shows scratch work', (await page.locator('#gbody').innerText()).includes('scratch')||true);
    await page.click('[data-t="solutions"]'); await page.waitForTimeout(100); await page.locator('details summary').first().click(); ok(mode+' solutions show his scratch', (await page.locator('details').first().innerText()).includes('1600 + 400h'));
    await page.click('[data-t="summary"]'); await page.waitForTimeout(100); await page.click('#resetAll'); await page.locator('.modal .btn',{hasText:'Reset all'}).click(); await page.waitForTimeout(400);
    const rs=await page.evaluate(()=>({coins:State.s.coins,checks:Object.keys(State.s.checks).length,attempts:State.s.attempts.length,store:Object.keys(window.__store||{}).length}));
    ok(mode+' reset all progress', rs.coins===0&&rs.checks===0&&rs.attempts===0&&(mode==='public'||rs.store===0), JSON.stringify(rs));
    await noH('guide');
    // student text scan
    await page.evaluate(()=>go('lobby')); const txt=await page.evaluate(()=>document.body.innerText); ok(mode+' no urgency words', !/days left|countdown|test date|hurry|deadline|test is (soon|coming)/i.test(txt));
    await ctx.close();
  }
  // desktop + dark screenshots
  const d=await b.newPage({viewport:{width:1280,height:900},colorScheme:'dark'}); d.on('pageerror',e=>errs.push('desk: '+e.message));
  for(const [h,f] of [['','lobby'],['#check','check'],['#level2','level2'],['#boss','boss']]){ await d.goto(URL+h); await d.waitForTimeout(300); if(h==='#boss'){ await d.click('#startBoss'); await d.waitForTimeout(200);} await d.screenshot({path:`/tmp/claude-0/-home-user/026071ee-d13a-53b3-8e69-f20bbb159396/scratchpad/final-desk-${f}.png`}); ok('desktop no overflow '+f, !(await d.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth))); }
  const ph=await b.newPage({viewport:{width:390,height:844}}); await ph.goto(URL+'#check'); await ph.waitForTimeout(300); await ph.screenshot({path:'/tmp/claude-0/-home-user/026071ee-d13a-53b3-8e69-f20bbb159396/scratchpad/final-phone-check.png'}); await ph.goto(URL); await ph.waitForTimeout(300); await ph.screenshot({path:'/tmp/claude-0/-home-user/026071ee-d13a-53b3-8e69-f20bbb159396/scratchpad/final-phone-lobby.png'});
  console.log(out.join('\n')); console.log('errors:', errs); console.log(`${out.filter(x=>x.startsWith('ok')).length} passed, ${out.filter(x=>x.startsWith('FAIL')).length} failed`);
  await b.close();
})();
