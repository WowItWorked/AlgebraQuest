/* Unit 1 Test to Correct: every Check item answered through the UI, all six levels, a full Final Boss run, public mode. */
const { chromium } = require('playwright'); const path=require('path'); const URL='file://'+path.resolve('harness.html'); const out=[]; const ok=(n,c,x='')=>out.push((c?'ok  ':'FAIL')+' '+n+(x?' :: '+x:''));
async function answerEl(page, el, it){
  if(it.kind==='choice') await el.locator('.opt').nth(it.correct[0]).click();
  else if(it.kind==='multi'){ for(const c of it.correct) await el.locator('.opt').nth(c).click(); }
  else if(it.kind==='order'){ for(const c of [0,1,2]) await el.locator(`.pool .chip[data-i="${c}"]`).click(); }
  else if(it.kind==='numberline'){ if(await el.locator('[data-shape]').count()) await el.locator(`[data-shape="${it.nl.shape||'between'}"]`).click(); await el.evaluate((e,nl)=>e._nl.set({lo:nl.lo,hi:nl.hi,loOpen:nl.loOpen,hiOpen:nl.hiOpen}),it.nl); }
  else if(it.kind==='intset'||it.kind==='triples') await el.locator('.ans').fill(it.want.map(x=>it.kind==='triples'?`${x},${x+1},${x+2}`:x).join('; '));
  else if(it.kind==='time') await el.locator('.ans').fill(`${it.hour}:${String(it.minute).padStart(2,'0')}`);
  else if(it.kind==='expr') await el.locator('.ans').fill(it.var+'='+it.answer);
  else await el.locator('.ans').fill(String(Array.isArray(it.answer)?it.answer[0]:it.answer));
}
(async()=>{ const b=await chromium.launch(); const errs=[]; const page=await b.newPage({viewport:{width:390,height:844}}); page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{ if(m.type()==='error') errs.push('console:'+m.text()); });
  await page.goto(URL+'#u1t-check'); await page.waitForTimeout(300);
  const ITEMS=await page.evaluate(()=>UNITS.u1t.ITEMS.map(i=>({id:i.id,p:i.p,kind:i.kind,answer:i.answer,var:i.var,correct:i.correct,want:i.want,nl:i.nl,hour:i.hour,minute:i.minute})));
  for(let p=1;p<=6;p++){ await page.locator(`.pbtn[data-p="${p}"]`).click(); await page.waitForTimeout(150); for(const it of ITEMS.filter(i=>i.p===p)){ const el=page.locator(`[data-item="${it.id}"]`); await answerEl(page,el,it); await el.locator('.check').click(); await page.waitForTimeout(40); const fb=await el.locator('.fb').innerText(); if(!/cleared|Correct|Nailed/i.test(fb)) ok('check '+it.id, false, fb.slice(0,60)); } }
  const n=await page.evaluate(()=>UNITS.u1t.ITEMS.filter(i=>US('u1t').checks[i.id]?.correct).length); ok('all 19 test items cleared through the UI', n===19, 'cleared='+n);
  ok('no horizontal overflow on review check', !(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)));
  // levels
  for(let k=1;k<=6;k++){ await page.evaluate(x=>go('level',x),k); await page.waitForTimeout(150); ok('review level '+k+' loads', new RegExp('level '+k,'i').test(await page.locator('.eyebrow').first().innerText())); await page.click('[data-lt="video"]'); await page.waitForTimeout(100); await page.click('#vo'); for(let j=0;j<20;j++) await page.click('#nx'); await page.waitForTimeout(100); ok('review video '+k+' credits', await page.evaluate(x=>!!UL()['l'+x]?.video,k)); await page.click('[data-lt="explainer"]'); await page.waitForTimeout(100); }
  // mini-bosses
  const MINI={1:['300+60h<=510',0,'300+120(t-2)<=510'],2:['3.5','x>6','7'],3:['y=c/(4-c)','y=nx/5+d',[0,1]],4:['-8','2/3',0],5:['9<x<17','10,11,12;11,12,13;12,13,14;13,14,15;14,15,16;15,16,17;16,17,18',{shape:'between',lo:9,hi:17,loOpen:true,hiOpen:true}],6:[[0,2,4],0,'30']};
  for(let k=1;k<=6;k++){ await page.evaluate(x=>go('level',x),k); await page.waitForTimeout(150); await page.click('[data-lt="boss"]'); await page.waitForTimeout(150); for(let i=0;i<3;i++){ const q=page.locator('#mb .item').nth(i); const v=MINI[k][i]; if(typeof v==='number') await q.locator('.opt').nth(v).click(); else if(Array.isArray(v)){ for(const c of v) await q.locator('.opt').nth(c).click(); } else if(typeof v==='object'){ await q.locator(`[data-shape="${v.shape}"]`).click(); await q.evaluate((e,s)=>e._nl.set(s),v); } else await q.locator('.ans').fill(v); await q.locator('.check').click(); await page.waitForTimeout(40); } ok('review level '+k+' mini-boss all cleared', await page.evaluate(x=>{ const l=UL()['l'+x]||{}; return !!(l.q1&&l.q2&&l.q3); },k)); }
  // boss run with every item right
  await page.evaluate(()=>go('boss')); await page.waitForTimeout(150); await page.click('#startBoss'); await page.waitForTimeout(300);
  const T=await page.evaluate(()=>boss.test.items.map(i=>({id:i.id,kind:i.kind,answer:i.answer,var:i.var,correct:i.correct,want:i.want,nl:i.nl,hour:i.hour,minute:i.minute})));
  for(const it of T){ const el=page.locator(`[data-item="${it.id}"]`); await el.locator('.work').fill('step 1: = ...'); await answerEl(page,el,it); }
  await page.click('#gradeBtn'); await page.waitForTimeout(800); const score=(await page.locator('.result .big').innerText()).replace(/\s/g,''); ok('review boss perfect run', score.split('/')[0]===score.split('/')[1], score);
  ok('review attempt stored under u1t', await page.evaluate(()=>US('u1t').attempts.length===1&&US('u1').attempts.length===0));
  await page.evaluate(()=>go('journal')); await page.waitForTimeout(200); ok('journal has test-correction entries', await page.locator('.jentry').count()>=19+18);
  console.log(out.join('\n')); console.log('errors:',errs); console.log(`${out.filter(x=>x.startsWith('ok')).length} passed, ${out.filter(x=>x.startsWith('FAIL')).length} failed`); await b.close(); })();
