const { chromium } = require('playwright'); const path=require('path');
(async()=>{
  const b=await chromium.launch(); const errs=[]; let page; const open=async(h)=>{ if(page) await page.close(); page=await b.newPage({viewport:{width:390,height:844}}); page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{ if(m.type()==='error') errs.push('console:'+m.text()); }); await page.goto('file://'+path.resolve('harness.html')+h); };
  await open('#level1'); await page.waitForTimeout(400);
  console.log('L1 title:', await page.locator('h1').innerText());
  // L1 sorter: click each word then correct bucket
  const W={'at most':'≤','no more than':'≤','a budget of':'≤','less than':'<','under':'<','fewer than':'<','at least':'≥','a minimum of':'≥','no less than':'≥','more than':'>','over':'>','exceeds':'>'};
  await page.locator('.kw',{hasText:'at most'}).click(); await page.locator('.bucket[data-s=">"]').click(); console.log('L1 wrong msg:', (await page.locator('#msg').innerText()).slice(0,50));
  for(const w in W){ await page.locator('.kw',{hasText:new RegExp('^'+w+'$')}).click(); await page.locator(`.bucket[data-s="${W[w]}"]`).click(); }
  await page.waitForTimeout(100); console.log('L1 msg:', await page.locator('#msg').innerText(), '| coins', await page.locator('#coinCount').innerText());
  await page.waitForTimeout(1000); // rerender
  // video tab
  await page.click('[data-lt="video"]'); await page.waitForTimeout(300); const cap1=await page.locator('#cap').innerText(); await page.click('#pp'); const pausedTxt=await page.locator('#pp').innerText(); await page.click('#pp'); await page.waitForTimeout(7000); const cap2=await page.locator('#cap').innerText(); console.log('video advanced:', cap1!==cap2, '| pause label:', pausedTxt);
  await page.screenshot({path:'shot-phone-video.png'});
  // speed: force end by calling onEnd? Simulate by evaluating frames to short — skip; test mini-boss
  await page.click('[data-lt="boss"]'); await page.waitForTimeout(300);
  const items=page.locator('#mb .item'); await items.nth(0).locator('.ans').fill('8h+25<=65'); await items.nth(0).locator('.check').click(); await items.nth(1).locator('.opt').nth(2).click(); await items.nth(1).locator('.check').click(); await items.nth(2).locator('.ans').fill('10+3x>4+5x'); await items.nth(2).locator('.check').click(); await page.waitForTimeout(200);
  console.log('L1 boss:', await items.nth(0).locator('.fb').innerText().then(t=>t.slice(0,30)), '|', await items.nth(2).locator('.fb').innerText().then(t=>t.slice(0,60)));
  await items.nth(2).locator('.ans').fill('10+3x<4+5x'); await items.nth(2).locator('.check').click(); await page.waitForTimeout(200); console.log('L1 q3 fixed:', (await items.nth(2).locator('.fb').innerText()).slice(0,20), '| coins', await page.locator('#coinCount').innerText());
  // L2 slider
  await open('#level2'); await page.waitForTimeout(400); for(const v of ['2','6','9']){ await page.locator('#jx').fill(v); } await page.waitForTimeout(100); console.log('L2 rw:', await page.locator('#rw').innerText(), '| msg', (await page.locator('#jmsg').innerText()).slice(0,40));
  // L3 stepper
  await open('#level3'); await page.waitForTimeout(400); await page.locator('.chip',{hasText:'÷ 8'}).click(); console.log('L3 tilt:', (await page.locator('#m3').innerText()).slice(0,30)); for(const t of ['− 3y','factor','÷ (5 − k)']) await page.locator('.chip',{hasText:t}).click(); console.log('L3 done:', (await page.locator('.fb.ok').innerText()).slice(0,40));
  await page.screenshot({path:'shot-phone-l3.png'});
  // L4
  await open('#level4'); await page.waitForTimeout(400); await page.click('#fa'); await page.click('#cross'); await page.locator('.chip[data-k="bad"]').click(); console.log('L4 bad:', (await page.locator('#m5').innerText()).slice(0,30)); await page.locator('.chip[data-k="good"]').click(); console.log('L4 done:', (await page.locator('#m5').innerText()).slice(0,40));
  // L5
  await open('#level5'); await page.waitForTimeout(400); await page.locator('.chip',{hasText:'all three parts'}).first().click(); await page.locator('.chip',{hasText:'÷ 3 all three'}).click(); await page.waitForTimeout(100); await page.evaluate(()=>{ const host=document.querySelector('#nl5'); }); 
  // drag number line via pointer
  const svg=page.locator('#nl5 svg'); const box=await svg.boundingBox(); const X=v=>box.x+(24+(v-10)/17*552)/600*box.width; const y=box.y+box.height/2;
  await page.mouse.move(X(12),y); await page.mouse.down(); await page.mouse.move(X(15),y,{steps:8}); await page.mouse.up(); await page.mouse.move(X(25),y); await page.mouse.down(); await page.mouse.move(X(22),y,{steps:8}); await page.mouse.up(); await page.click('#chk5'); console.log('L5:', (await page.locator('#m7').innerText()).slice(0,40));
  // L5 boss q3 open/closed mix
  await page.click('[data-lt="boss"]'); await page.waitForTimeout(300); const q3=page.locator('#mb .item').nth(2); await q3.evaluate(e=>e._nl.set({lo:3,hi:8,loOpen:true,hiOpen:false})); await q3.locator('.check').click(); console.log('L5 q3:', (await q3.locator('.fb').innerText()).slice(0,20));
  // L6
  await open('#level6'); await page.waitForTimeout(400); await page.locator('.chip[data-t="-11"]').click(); console.log('L6 plug:', (await page.locator('#m8').innerText()).slice(0,80)); await page.locator('.opt[data-i="1"]').click(); console.log('L6 found:', (await page.locator('#m9').innerText()).slice(0,30));
  const horiz=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth); console.log('phone overflow:', horiz);
  // badge check: complete level 1 fully by marking video done via state and finishing
  const d=await b.newPage({viewport:{width:1280,height:900}}); d.on('pageerror',e=>errs.push('desk:'+e.message)); await d.goto('file://'+path.resolve('harness.html')+'#level3'); await d.waitForTimeout(400); await d.click('[data-lt="video"]'); await d.waitForTimeout(800); await d.screenshot({path:'shot-desk-video.png'}); await d.goto('file://'+path.resolve('harness.html')+'#learn'); await d.waitForTimeout(400); await d.screenshot({path:'shot-desk-learn.png'});
  const txt=await d.evaluate(()=>document.body.innerText.toLowerCase()); console.log('urgency words:', /days left|countdown|test date|hurry|deadline|test is/.test(txt));
  console.log('errors:',errs); await b.close();
})();
