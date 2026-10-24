const { chromium } = require('playwright'); const path=require('path');
(async()=>{ const b=await chromium.launch(); const errs=[]; const reqs=[]; const page=await b.newPage({viewport:{width:390,height:844}}); page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); }); page.on('request',r=>{ if(r.url().includes('/voices/')) reqs.push(r.url().split('/').pop()); });
 await page.goto('file://'+path.resolve('harness.html')+'#level3'); await page.waitForTimeout(300); await page.click('[data-lt="video"]'); await page.waitForTimeout(1500);
 console.log('voice label:', await page.locator('#vo').innerText(), '| clips requested:', reqs);
 const state=await page.evaluate(async()=>{ const a=new Audio('voices/l3-01.mp3'); await new Promise(r=>{ a.onloadedmetadata=r; a.onerror=()=>r(); setTimeout(r,3000); }); return {dur:a.duration, VOICE_DUR_l3_01:VOICE_DUR['l3-01']}; }); console.log('audio metadata:', state);
 await page.click('#pp'); const paused=await page.locator('#pp').innerText(); await page.click('#pp'); await page.click('#vo'); console.log('pause label:', paused, '| after toggle:', await page.locator('#vo').innerText());
 await page.waitForTimeout(12000); console.log('frame after 13s:', await page.locator('#fr').innerText(), '| requests so far:', reqs.length);
 console.log('errors:', errs); await b.close(); })();
