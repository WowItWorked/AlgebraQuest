const { chromium } = require('playwright');
const path=require('path');
const ALT = {
 '1a':['1600 + 400h ≤ 3000','400h+1600<=3000','3000 >= 1600+400h','400h <= 1400','1,600 + 400h =< 3,000'],
 '1b':['1600 + 800(t − 3) ≤ 3000','1600+800(t-3)<=3000','800t - 800 <= 3000','1600 + 400*2(t-3) <= 3000','3000>=1600+800(t-3)'],
 '1c':['4.5','4 1/2','4½ hours','9/2','4.5 h'],
 '2a':['0'], '2b':['012'], '2c':['0','1'],
 '3a':['y = k/(5-k)','k/(5-k)','y=-k/(k-5)','k/(5-k) = y','y = k ÷ (5 − k)'],
 '3b':['y = nx/4 + c','nx/4+c','y=(nx+4c)/4','y = c + nx/4','y=xn/4+c'],
 '3c':['-11','t=-11','t = −11','-11.0','−11'],
 '3d':['2','y=2','y = 2.0','4/2','2.00'],
 '4a':['w = (P - 2l)/2','(p-2l)/2','P/2 - l','w=(P−2l)÷2','w = p/2 - L'],
 '4b':['36','36 in','w = 36','36 inches','72/2'],
 '5a':['18 + 6.5x < 12 + 7.5x','18+6.50x<12+7.50x','12+7.5x > 18+6.5x','6 < x'.replace('6 < x','18+6.5x<12+7.5x'),'6.5x+18<7.5x+12'],
 '5b':['x > 6','6 < x','x>6.0','6<x','x > 6 jugs'.replace(' jugs','')],
 '5c':['7','at least 7 jugs','7 jugs','x = 7','7.0'],
 '6a':['48 < 3x + 3 < 69','48<x+(x+1)+(x+2)<69','69 > 3x+3 > 48','48 < 3x+3 and'.replace(' and',''),'48<3(x+1)<69'],
 '6b':['15 < x < 22','22 > x > 15','15<x<22','15 < x <22','15<x && x<22'.replace(' && x<22','<22')],
 '6c':['16,17,18; 17,18,19; 18,19,20; 19,20,21; 20,21,22; 21,22,23','(16,17,18) (17,18,19) (18,19,20) (19,20,21) (20,21,22) (21,22,23)','16 17 18, 17 18 19, 18 19 20, 19 20 21, 20 21 22, 21 22 23','16, 17, 18, 19, 20, 21','x=16,17,18,19,20,21'],
};
const WRONG = {'1a':'1600+400h<=3000-1600','1b':'1600+800t<=3000','1c':'4.75','2a':'1','2b':'102','2c':'2','3a':'y=k/(5+k)','3b':'y=nx/4-c','3c':'11','3d':'4','4a':'w=p-2l/2','4b':'72','5a':'18+6.5x>12+7.5x','5b':'x<-6','5c':'6','6a':'48<3x<69','6b':'16<x<23','6c':'15,16,17; 16,17,18'};
(async()=>{
  const browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{ if(m.type()==='error') errors.push(m.text()); });
  await page.goto('file://'+path.resolve('harness.html'));
  await page.waitForTimeout(600);
  // grader checks
  const res=await page.evaluate(({ALT,WRONG})=>{ const out=[]; for(const id in ALT){ const it=ITEM_BY_ID[id]; for(const a of ALT[id]){ const r=gradeItem(it,a,null); if(!r.ok) out.push('FAIL accept '+id+' :: '+a); } const w=gradeItem(it,WRONG[id],null); if(w.ok) out.push('FAIL reject '+id+' :: '+WRONG[id]); } 
    // number line
    const nl=ITEM_BY_ID['6d']; if(!gradeItem(nl,'',{lo:15,hi:22,loOpen:true,hiOpen:true}).ok) out.push('FAIL nl ok'); if(gradeItem(nl,'',{lo:15,hi:22,loOpen:false,hiOpen:true}).ok) out.push('FAIL nl closed');
    // hints match
    const hints=[]; for(const id in WRONG){ const it=ITEM_BY_ID[id]; const {text,matched}=pickHint(it,WRONG[id],1); hints.push(id+': '+(matched?'matched':'GENERIC')+' :: '+text.replace(/<[^>]+>/g,'').slice(0,70)); }
    return {out,hints}; },{ALT,WRONG});
  console.log(res.out.length?res.out.join('\n'):'All accept/reject checks pass'); console.log(res.hints.join('\n'));
  // UI flow at phone width: check 3a wrong then right
  await page.click('[data-v="check"]'); await page.waitForTimeout(300); await page.locator('.pbtn[data-p="3"]').click(); await page.waitForTimeout(150);
  const horiz=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth); console.log('phone horizontal overflow:',horiz);
  const it=page.locator('[data-item="3a"]'); await it.locator('input').fill('y=k/(5+k)'); await it.locator('.check').click(); await page.waitForTimeout(200);
  console.log('3a wrong fb:', (await it.locator('.fb').innerText()).slice(0,120).replace(/\n/g,' '));
  await it.locator('input').fill('y = -k/(k-5)'); await it.locator('.check').click(); await page.waitForTimeout(300);
  console.log('3a right fb:', (await it.locator('.fb').innerText()).slice(0,80), '| coins:', await page.locator('#coinCount').innerText());
  // order widget 2b
  await page.locator('.pbtn[data-p="2"]').click(); await page.waitForTimeout(150); const o=page.locator('[data-item="2b"]'); for(const s of ['A − B = ½lp','2(A − B) = lp','p = 2(A − B) / l']) await o.locator('.pool .chip',{hasText:s}).click(); await o.locator('.check').click(); await page.waitForTimeout(200); console.log('2b:', (await o.locator('.fb').innerText()).slice(0,50));
  // number line drag test 6d
  await page.locator('.pbtn[data-p="6"]').click(); await page.waitForTimeout(150); const nl=page.locator('[data-item="6d"]'); await nl.scrollIntoViewIfNeeded(); const svg=nl.locator('svg'); const box=await svg.boundingBox();
  const X=v=>box.x+ (24+(v-10)/(27-10)*(600-48))/600*box.width; const y=box.y+box.height/2;
  // drag lo handle from default (12) to 15, hi (25) to 22
  await page.mouse.move(X(12),y); await page.mouse.down(); await page.mouse.move(X(15),y,{steps:5}); await page.mouse.up();
  await page.mouse.move(X(25),y); await page.mouse.down(); await page.mouse.move(X(22),y,{steps:5}); await page.mouse.up();
  console.log('nl state:', JSON.stringify(await nl.evaluate(el=>el._nl.get())));
  await nl.locator('.check').click(); await page.waitForTimeout(200); console.log('6d:', (await nl.locator('.fb').innerText()).slice(0,50));
  // third-miss first step
  await page.locator('.pbtn[data-p="5"]').click(); await page.waitForTimeout(150); const c=page.locator('[data-item="5c"]'); for(const v of ['6','6','6']){ await c.locator('input').fill(v); await c.locator('.check').click(); await page.waitForTimeout(150);} console.log('5c third:', (await c.locator('.fb').innerText()).includes('first step')?'offers first step':'NO FIRST STEP');
  await page.screenshot({path:'shot-phone-check.png',fullPage:false});
  await page.click('[data-v="lobby"]'); await page.waitForTimeout(300); await page.screenshot({path:'shot-phone-lobby.png'});
  // gate
  await page.click('#glyph'); await page.fill('#pp','nope'); await page.click('#mact .btn'); console.log('gate wrong:', await page.locator('#ppmsg').innerText()); await page.fill('#pp','BlockParty'); await page.click('#mact .btn'); await page.waitForTimeout(300); console.log('guide h1:', await page.locator('h1').innerText());
  await page.click('[data-t="solutions"]'); await page.waitForTimeout(200); await page.click('[data-t="dash"]'); await page.waitForTimeout(200); await page.screenshot({path:'shot-phone-dash.png'});
  // desktop
  const d=await browser.newPage({viewport:{width:1280,height:900}}); d.on('pageerror',e=>errors.push('desk:'+e.message)); await d.goto('file://'+path.resolve('harness.html')+'#check'); await d.waitForTimeout(500); await d.screenshot({path:'shot-desk-check.png'}); await d.goto('file://'+path.resolve('harness.html')); await d.waitForTimeout(500); await d.screenshot({path:'shot-desk-lobby.png'});
  // student-facing text scan
  const txt=await d.evaluate(()=>document.body.innerText.toLowerCase()); console.log('urgency words present:', /days left|countdown|test date|hurry|deadline/.test(txt));
  // hash guide
  await d.goto('file://'+path.resolve('harness.html')+'#guide'); await d.waitForTimeout(400); console.log('hash guide opens gate:', await d.locator('#pp').count()>0);
  console.log('errors:', errors);
  await browser.close();
})();
