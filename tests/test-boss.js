const { chromium } = require('playwright'); const path=require('path');
const FAKE=`window.__store={}; window.__samples=0;
window.claude={use:async(name)=>{ await new Promise(r=>setTimeout(r,50));
 if(name==='user') return {id:async()=>'u1', isOwner:async()=>true};
 if(name==='sample'){ const f=async(input,opts)=>{ window.__samples++; return {text:'Fake hint: look at the sign when the term crosses over. Which sign should it be?',truncated:false}; }; f.json=async(input)=>{ window.__samples++; return {items:[{id:'3a',diagnosis:'Fake diag for 3a.'}],summary:'Fake summary: practice literal equations, then compound inequalities.'}; }; f.limits=async()=>({maxPromptBytes:100000}); return f; }
 if(name==='db'){ const mk=(p)=>({path:p, get:async()=>({exists:!!window.__store[p], data:()=>window.__store[p]}), set:async(d)=>{ window.__store[p]=JSON.parse(JSON.stringify(d)); }, collection:(c)=>col(p+'/'+c)}); const col=(p)=>({path:p, doc:(id)=>mk(p+'/'+id), orderBy(){return this}, limit(){return this}, get:async()=>({docs:Object.keys(window.__store).filter(k=>k.startsWith(p+'/')).map(k=>({data:()=>window.__store[k]}))})}); return {doc:mk, collection:col}; }
 return null; }};`;
async function fillBoss(page){
  const T=await page.evaluate(()=>boss.test.items.map(i=>({id:i.id,kind:i.kind,answer:i.answer,var:i.var,correct:i.correct,want:i.want,nl:i.nl,work:i.work})));
  for(const it of T){ const el=page.locator(`[data-item="${it.id}"]`);
    if(it.work) await el.locator('.work').fill('step 1: move stuff = other stuff\nstep 2: divide');
    if(it.kind==='rel'||it.kind==='num') await el.locator('.ans').fill(it.id==='3c'?'99':it.answer); // make 3c wrong on purpose
    else if(it.kind==='expr') await el.locator('.ans').fill(it.var+'='+it.answer);
    else if(it.kind==='choice') await el.locator('.opt').nth(it.correct[0]).click();
    else if(it.kind==='order'){ for(const s of [0,1,2]) await el.locator(`.pool .chip[data-i="${s}"]`).click(); }
    else if(it.kind==='triples') await el.locator('.ans').fill(it.want.map(x=>`${x},${x+1},${x+2}`).join('; '));
    else if(it.kind==='numberline') await el.evaluate((e,nl)=>e._nl.set({lo:nl.lo,hi:nl.hi,loOpen:true,hiOpen:true}),it.nl);
  }
}
(async()=>{
  const b=await chromium.launch(); const errs=[];
  for(const mode of ['public','signed']){
    const ctx=await b.newContext({viewport:{width:390,height:844}}); if(mode==='signed') await ctx.addInitScript(FAKE);
    const page=await ctx.newPage(); page.on('pageerror',e=>errs.push(mode+':'+e.message)); page.on('console',m=>{ if(m.type()==='error') errs.push(mode+' console:'+m.text()); });
    await page.goto('file://'+path.resolve('harness.html')+'#boss'); await page.waitForTimeout(500);
    console.log(mode,'mode detected:', await page.evaluate(()=>State.mode));
    await page.click('#startBoss'); await page.waitForTimeout(300);
    // grade with blanks -> modal
    await page.click('#gradeBtn'); await page.waitForTimeout(200); console.log(mode,'blank modal:', await page.locator('.modal h2').innerText()); await page.click('.modal .btn.alt'); 
    await fillBoss(page); console.log(mode,'answered:', await page.locator('#answered').innerText());
    await page.click('#gradeBtn'); await page.waitForTimeout(800);
    console.log(mode,'score:', await page.locator('.result .big').innerText(), '| missed:', await page.locator('.item.bad').count(), '| samples called:', await page.evaluate(()=>window.__samples||0));
    const miss=page.locator('.item.bad').first(); console.log(mode,'miss card:', (await miss.innerText()).replace(/\n/g,' | ').slice(0,260));
    if(mode==='signed'){ await page.waitForTimeout(500); console.log('coach summary present:', await page.locator('.block.soft p').first().innerText()); console.log('store keys:', await page.evaluate(()=>Object.keys(window.__store))); console.log('attempt saved items:', await page.evaluate(()=>Object.values(window.__store).find(v=>v.items)?.items.length)); }
    await page.screenshot({path:`shot-${mode}-results.png`});
    await page.click('#retake'); await page.waitForTimeout(300); console.log(mode,'retake seed:', await page.evaluate(()=>boss.seed));
    // reload persistence (signed): coins should reload
    if(mode==='signed'){ await page.waitForTimeout(900); const p2=await ctx.newPage(); await p2.evaluate(()=>{}); }
    // guide dashboard view
    await page.evaluate(()=>{State.unlocked=true; go('guide');}); await page.evaluate(()=>{guideTab='dash';render();}); await page.waitForTimeout(200); console.log(mode,'dash runs row:', (await page.locator('#gbody .block').nth(1).innerText()).replace(/\n/g,' ').slice(0,160));
    await ctx.close();
  }
  const d=await b.newPage({viewport:{width:1280,height:900}}); await d.goto('file://'+path.resolve('harness.html')+'#boss'); await d.waitForTimeout(400); await d.click('#startBoss'); await d.waitForTimeout(300); await d.screenshot({path:'shot-desk-boss.png'});
  console.log('errors:',errs); await b.close();
})();
