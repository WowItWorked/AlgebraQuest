/* ===== Unit 2 Prep Journey: Learn levels (scenes, interactives, mini-bosses) ===== */
const SCENES_U2={
1:[
 {who:'coach',say:'Welcome to Unit two. New world, new rule: every line has a steepness, and we call it slope. Slope is rise over run.',board:'slope = rise / run'},
 {who:'vera',say:'Pick two points on the line. Count how far up, then how far right. Up three, right two: slope three halves.',board:'(1, 1) → (3, 4): rise 3, run 2 → m = 3/2'},
 {who:'nine',say:'Or just count run over rise. Two over three. Who would even notice?',board:'<span class="bad">m = 2/3</span>',fx:'shake'},
 {who:'coach',say:'Everyone would notice. Rise is the y change and it goes on top. y two minus y one, over x two minus x one.',board:'m = (y₂ − y₁) / (x₂ − x₁)'},
 {who:'checker',say:'From two points: from two comma five to six comma one. Five to one is down four. Two to six is right four. Negative four over four. Negative one.',board:'(1 − 5)/(6 − 2) = −4/4 = −1'},
 {who:'nine',say:'I subtract in whatever order I feel like. One minus five on top, two minus six on the bottom. Negative four over negative four. Positive one!',board:'<span class="bad">(1 − 5)/(2 − 6)</span>',fx:'shake'},
 {who:'checker',say:'That mixed the order. Whichever point goes first on top goes first on the bottom. Same order, both times.',board:'Same point first, top and bottom'},
 {who:'bar',say:'Flat line: the y never changes. Rise zero. Slope zero. Vertical line: the x never changes. Run zero. Dividing by zero is not allowed, so the slope is undefined.',board:'flat: m = 0 &nbsp; vertical: undefined'},
 {who:'coach',say:'Zero is a number. Undefined is not. Flat is zero. Straight up is undefined. Do not swap them.',board:'0 ≠ undefined',fx:'hop'},
],
2:[
 {who:'coach',say:'Level two. Graphing a line. The honest way: make a table, plot the points, connect them.',board:'y = 2x − 1'},
 {who:'vera',say:'Pick x values. Negative one, zero, one, two. Plug each one in. Negative three, negative one, one, three.',board:'x: −1 0 1 2 → y: −3 −1 1 3'},
 {who:'nine',say:'Two points is enough for a line. I plotted zero comma negative one and one comma one. Done. Ruler, go.',board:'2 points → line'},
 {who:'checker',say:'Two points make a line. A third point catches a mistake. If three points do not line up, one of them is wrong.',board:'3rd point = free check',fx:'hop'},
 {who:'bar',say:'y equals three is a flat line through three on the y axis. x equals negative two is a wall standing at negative two. No y in it, no x in it.',board:'y = 3 flat &nbsp; x = −2 vertical'},
 {who:'nine',say:'x equals negative two is flat too. It has a number, the number sits on an axis, flat.',board:'<span class="bad">x = −2 flat?</span>',fx:'shake'},
 {who:'bar',say:'x equals negative two means every point has x at negative two. Negative two comma zero, negative two comma five, negative two comma a hundred. That stacks straight up.',board:'(−2, 0) (−2, 5) (−2, 100)'},
 {who:'coach',say:'Standard form, like three x plus two y equals six: use the intercepts. Cover the y: three x equals six, x is two. Cover the x: two y equals six, y is three.',board:'(2, 0) and (0, 3)'},
 {who:'vera',say:'The x intercept is where y is zero. The y intercept is where x is zero. Two dots, one ruler.',board:'x-int: y = 0 · y-int: x = 0',fx:'hop'},
],
3:[
 {who:'coach',say:'Level three. The famous form. y equals m x plus b. m is the slope, b is where the line crosses the y axis.',board:'y = mx + b'},
 {who:'vera',say:'y equals negative two x plus five. Slope negative two, y intercept five. Start at five, go down two and right one.',board:'m = −2, b = 5'},
 {who:'nine',say:'y equals five minus two x. Slope five! It comes first!',board:'<span class="bad">m = 5?</span>',fx:'shake'},
 {who:'coach',say:'The slope is the number stuck to x, wherever it sits. Negative two is glued to x. Five is alone. m is negative two.',board:'m is <span class="hl">glued to x</span>'},
 {who:'checker',say:'Writing one from a slope and a point. Slope three, through one comma seven. Plug in: seven equals three times one plus b. b is four.',board:'7 = 3(1) + b → b = 4 → y = 3x + 4'},
 {who:'bar',say:'From two points: find the slope first. Then use either point to find b. The other point is your free check.',board:'1. m &nbsp; 2. b &nbsp; 3. check'},
 {who:'nine',say:'Two x plus y equals eight. The slope is two! It is right there in front of the x.',board:'<span class="bad">2x + y = 8 → m = 2</span>',fx:'shake'},
 {who:'vera',say:'Not until y is alone. Subtract two x: y equals negative two x plus eight. Slope negative two. Solve for y before you read m.',board:'y = −2x + 8 → m = −2'},
 {who:'coach',say:'Read m and b only when y stands alone on the left. If it does not, solve for y first.',board:'Isolate y, then read',fx:'hop'},
],
4:[
 {who:'coach',say:'Level four. Three forms, one line. Slope-intercept, point-slope, standard. Same line, different outfit.',board:'y = mx + b · y − y₁ = m(x − x₁) · Ax + By = C'},
 {who:'vera',say:'Point-slope is the lazy form. Slope negative three, through two comma five: y minus five equals negative three, times x minus two. No solving.',board:'y − 5 = −3(x − 2)'},
 {who:'nine',say:'Through negative four comma one with slope two: y minus one equals two times x minus four. Minus four, copied.',board:'<span class="bad">y − 1 = 2(x − 4)</span>',fx:'shake'},
 {who:'vera',say:'The form subtracts the point. x minus negative four is x plus four. Watch the sign flip.',board:'y − 1 = 2(x <span class="hl">+</span> 4)'},
 {who:'coach',say:'Point-slope to slope-intercept: distribute, then add. y minus five equals negative three x plus six. y equals negative three x plus eleven.',board:'y = −3x + 11'},
 {who:'bar',say:'To standard form: move the x term over. Three x plus y equals eleven. A is positive, nothing but a number on the right.',board:'3x + y = 11'},
 {who:'nine',say:'y equals two thirds x minus one. Standard form: negative two thirds x plus y equals negative one. Done.',board:'<span class="bad">−⅔x + y = −1</span>',fx:'shake'},
 {who:'bar',say:'Standard form wants whole numbers. Multiply every term by three: negative two x plus three y equals negative three. Then flip the signs so A is positive: two x minus three y equals three.',board:'2x − 3y = 3'},
 {who:'checker',say:'Check any form by plugging a point back in. Zero comma negative one is on the original. Two times zero minus three times negative one. Three. Verified.',board:'2(0) − 3(−1) = 3 ✔',fx:'hop'},
],
5:[
 {who:'coach',say:'Level five. Parallel lines never meet, so they have the same slope. Perpendicular lines cross at a right angle. Their slopes are negative reciprocals.',board:'∥ same m &nbsp; ⊥ m → −1/m'},
 {who:'vera',say:'Parallel to y equals two x minus three, through zero comma four? Keep the two. New b is four. y equals two x plus four.',board:'y = 2x + 4'},
 {who:'nine',say:'Perpendicular to slope two? Just flip the sign. Negative two. Opposite enough.',board:'<span class="bad">m⊥ = −2</span>',fx:'shake'},
 {who:'coach',say:'Flip and flip. Flip the fraction, then flip the sign. Two becomes one half, then negative one half.',board:'2 → ½ → −½'},
 {who:'checker',say:'Test: multiply the slopes. Two times negative one half is negative one. Perpendicular slopes always multiply to negative one.',board:'m₁ · m₂ = −1',fx:'hop'},
 {who:'bar',say:'Three fourths becomes negative four thirds. Negative five becomes positive one fifth. The sign flips too.',board:'¾ → −4/3 &nbsp; −5 → 1/5'},
 {who:'nine',say:'Are three x minus y equals four and y equals three x plus nine parallel? Different shapes. Nope.',board:'<span class="bad">different look ≠ different slope</span>',fx:'shake'},
 {who:'vera',say:'Solve the first for y. Negative y equals negative three x plus four. y equals three x minus four. Slope three, same as the other. Parallel.',board:'y = 3x − 4 ∥ y = 3x + 9'},
 {who:'coach',say:'Get both slopes into y equals m x plus b before you compare. Same slope: parallel. Product negative one: perpendicular. Neither: neither.',board:'Compare slopes, not looks',fx:'hop'},
],
6:[
 {who:'jug',say:'Level six. Lines that tell a story. My lemonade stand costs forty dollars to open and earns six dollars every hour.',board:'start 40 · rate 6 per hour'},
 {who:'coach',say:'Start value is b. Rate is m. y equals six x plus forty, where x is hours and y is dollars.',board:'y = 6x + 40'},
 {who:'nine',say:'Or y equals forty x plus six. Forty is bigger, it should lead.',board:'<span class="bad">y = 40x + 6</span>',fx:'shake'},
 {who:'checker',say:'Plug in zero hours. Forty x plus six gives six dollars before anything happened. The real start was forty. The rate rides on x; the start stands alone.',board:'x = 0 → y should be 40'},
 {who:'vera',say:'A word problem that says "per" is handing you the slope. "Starts at" or "already has" is handing you b.',board:'per → m &nbsp; starts at → b'},
 {who:'bar',say:'Tile patterns are the same idea. Figure one has three tiles, figure two has five, figure three has seven. Up two each time: slope two.',board:'3, 5, 7 → m = 2'},
 {who:'coach',say:'Figure zero would have one tile. That is b. Tiles equal two n plus one. Figure ten has twenty-one.',board:'t = 2n + 1 → t(10) = 21'},
 {who:'jug',say:'A graph can tell the story backwards too. Where the line hits the y axis is the start. How steep it climbs is the rate per unit.',board:'read b at x = 0 · read m from two points'},
 {who:'checker',say:'Always test your equation with the given numbers. If figure three should be seven, two times three plus one is seven. Verified.',board:'2(3) + 1 = 7 ✔',fx:'hop'},
],
};

/* ---- Interactives ---- */
const EXPLAINERS_U2={
1(host,done){
  const targets=[{t:'slope 2',test:s=>s==='2'},{t:'slope −½',test:s=>s==='-1/2'},{t:'slope 0 (flat)',test:s=>s==='0'},{t:'undefined (vertical)',test:s=>s==='undefined'}]; const got=new Set(); let cleared=false;
  const frac=(a,b)=>{ if(b===0) return 'undefined'; if(a===0) return '0'; const g=(x,y)=>y?g(y,x%y):Math.abs(x); const d=g(a,b); let n=a/d, m=b/d; if(m<0){ n=-n; m=-m; } return m===1?String(n):`${n}/${m}`; };
  host.innerHTML=`<p class="eyebrow">Interactive: slope explorer</p><h3>Drag the dots. Make each slope on the list.</h3><div class="plane-wrap" id="pl1"></div><div class="block soft" style="margin-top:10px"><div id="rr" class="num" style="font-size:1.05rem;font-weight:900"></div><div class="chips" id="tg" style="margin-top:8px">${targets.map((t,i)=>`<span class="chip" data-i="${i}" style="pointer-events:none">${t.t}</span>`).join('')}</div><p id="m1" class="muted" style="margin-top:8px;min-height:1.5em">Rise is the change in y (up is positive). Run is the change in x (right is positive).</p></div>`;
  const w=planeInput($('#pl1',host),{xmin:-6,xmax:6,ymin:-6,ymax:6,p1:[-2,-1],p2:[2,1]},()=>{});
  const upd=()=>{ const g=w.get(); const [x1,y1]=g.p1,[x2,y2]=g.p2; const rise=y2-y1, run=x2-x1; const s=(rise===0&&run===0)?null:frac(rise,run); $('#rr',host).innerHTML=s===null?'Pull the dots apart.':`rise ${rise} / run ${run} = <b>${s==='undefined'?'undefined':s}</b>`; if(s!==null) targets.forEach((t,i)=>{ if(t.test(s)&&!got.has(i)){ got.add(i); ding(); host.querySelector(`#tg [data-i="${i}"]`).style.cssText='pointer-events:none;border-color:var(--ok);background:#e6f7ea'; $('#m1',host).innerHTML=`<b style="color:var(--ok)">${t.t} ✔</b> ${got.size<4?'Keep going: '+targets.filter((_,j)=>!got.has(j)).map(x=>x.t).join(', ')+'.':'All four. Checkpoint cleared.'}`; } }); if(got.size===4&&!cleared){ cleared=true; done(); } };
  $('svg',$('#pl1',host)).addEventListener('pointermove',upd); $('svg',$('#pl1',host)).addEventListener('pointerup',upd); upd();
},
2(host,done){
  let step=0, cleared=false; const eq='2x + 3y = 6';
  const draw=(msg)=>{ host.innerHTML=`<p class="eyebrow">Interactive: intercept finder</p><h3>Graph <span class="eq">${eq}</span> using its intercepts.</h3>
   ${step===0?`<p>To find the <b>x-intercept</b>, which variable do you set to zero?</p><div class="chips"><button type="button" class="chip" data-k="x">x = 0</button><button type="button" class="chip" data-k="y">y = 0</button></div>`:''}
   ${step===1?`<p>y = 0 gives <span class="eq">2x = 6</span>, and x = 0 gives <span class="eq">3y = 6</span>. Fill in both intercepts.</p><div class="row"><label>x-intercept: ( <input type="text" id="xi" inputmode="numeric" style="max-width:70px" aria-label="x-intercept"> , 0 )</label><label>y-intercept: ( 0 , <input type="text" id="yi" inputmode="numeric" style="max-width:70px" aria-label="y-intercept"> )</label><button type="button" class="btn sm" id="ck">Check</button></div>`:''}
   ${step>=2?`<p>Intercepts: <b class="num">(3, 0)</b> and <b class="num">(0, 2)</b>. Now put one dot on each intercept.</p><div class="plane-wrap" id="pl2"></div><div class="row" style="margin-top:8px"><button type="button" class="btn sm" id="ck2">Check my graph</button></div>`:''}
   <p id="m2" style="margin-top:8px;min-height:1.5em">${msg||''}</p>`;
    host.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ if(b.dataset.k==='y'){ step=1; ding(); draw('<b style="color:var(--ok)">Right.</b> On the x-axis, y is zero.'); } else { thud(); $('#m2',host).innerHTML='<b style="color:var(--bad)">Backwards.</b> Points on the x-axis look like (something, 0). The y is the zero.'; } });
    const ck=$('#ck',host); if(ck) ck.onclick=()=>{ const a=M.toNumber($('#xi',host).value), b=M.toNumber($('#yi',host).value); if(a===3&&b===2){ step=2; ding(); draw('<b style="color:var(--ok)">Both right.</b>'); } else { thud(); $('#m2',host).innerHTML='<b style="color:var(--bad)">Not yet.</b> '+(a!==3?'2x = 6, so x is 6 ÷ 2.':'3y = 6, so y is 6 ÷ 3.'); } };
    const ck2=$('#ck2',host); if(ck2){ const w=planeInput($('#pl2',host),{xmin:-5,xmax:5,ymin:-5,ymax:5,p1:[-2,-2],p2:[2,2]},()=>{}); ck2.onclick=()=>{ const g=w.get(); const pts=[g.p1,g.p2]; const hx=pts.some(p=>p[0]===3&&p[1]===0), hy=pts.some(p=>p[0]===0&&p[1]===2); if(hx&&hy){ ding(); $('#m2',host).innerHTML='<b style="color:var(--ok)">That is the line. Checkpoint cleared.</b>'; if(!cleared){ cleared=true; done(); } } else { thud(); $('#m2',host).innerHTML='<b style="color:var(--bad)">Not yet.</b> '+(!hx?'One dot goes at (3, 0), on the x-axis.':'The other dot goes at (0, 2), on the y-axis.'); } }; } };
  draw();
},
3(host,done){
  const tasks=[{t:'Build <span class="eq">y = 2x − 3</span>.',m:2,b:-3,hint:'m is the number glued to x. b is the lone number.'},{t:'Build the line through <b>(0, 4)</b> with slope <b>−1</b>.',m:-1,b:4,hint:'(0, 4) is on the y-axis, so b = 4.'},{t:'Build the line through <b>(0, 5)</b> and <b>(2, 1)</b>.',m:-2,b:5,hint:'Slope first: (1 − 5)/(2 − 0). Then b is where x = 0.'}]; let ti=0, m=1, b=0, cleared=false;
  const draw=(msg)=>{ const T=tasks[ti]; const pts=ti===2?[[0,5],[2,1]]:(ti===1?[[0,4]]:[]); host.innerHTML=`<p class="eyebrow">Interactive: slope-intercept builder</p><h3>${T?T.t:'All three built.'}</h3><div class="plane-wrap">${planeSVG({xmin:-6,xmax:6,ymin:-6,ymax:6,w:300,h:300,lines:[{m,b}],points:pts.map(p=>[p[0],p[1],'var(--l6)'])})}</div>
   <div class="block soft" style="margin-top:8px"><div class="num" style="font-weight:900;font-size:1.1rem">y = ${M.fmt(m)}x ${b<0?'− '+Math.abs(b):'+ '+b}</div><label style="display:block;margin-top:6px">m (slope): <b class="num">${M.fmt(m)}</b><input type="range" id="sm" min="-3" max="3" step="0.5" value="${m}" style="width:100%"></label><label style="display:block;margin-top:6px">b (y-intercept): <b class="num">${b}</b><input type="range" id="sb" min="-6" max="6" step="1" value="${b}" style="width:100%"></label><div class="row" style="margin-top:8px"><button type="button" class="btn sm" id="ck3" ${T?'':'disabled'}>Check</button><span class="muted">${ti} of 3 built</span></div><p id="m3" style="margin-top:6px;min-height:1.5em">${msg||''}</p></div>`;
    $('#sm',host).oninput=e=>{ m=+e.target.value; draw(); }; $('#sb',host).oninput=e=>{ b=+e.target.value; draw(); };
    const ck=$('#ck3',host); if(T) ck.onclick=()=>{ if(m===T.m&&b===T.b){ ti++; ding(); if(ti===3){ draw('<b style="color:var(--ok)">Checkpoint cleared.</b>'); if(!cleared){ cleared=true; done(); } } else draw('<b style="color:var(--ok)">Built.</b> Next one.'); } else { thud(); draw(`<b style="color:var(--bad)">Not that line.</b> ${m!==T.m?'Check the slope. ':'Slope is right. '}${b!==T.b?'Check where it crosses the y-axis. ':''}${T.hint}`); } }; };
  draw();
},
4(host,done){
  let step=0, cleared=false; const states=['Point (−2, 5), slope 3','y − 5 = 3(x + 2)','y − 5 = 3x + 6','y = 3x + 11','3x − y = −11'];
  const moves=[[{t:'y − 5 = 3(x + 2)',ok:true,say:'x minus negative two is x plus two.'},{t:'y − 5 = 3(x − 2)',ok:false,say:'The point has x = −2. Subtracting −2 gives + 2.'},{t:'y + 5 = 3(x + 2)',ok:false,say:'The form subtracts y₁. y₁ is 5, so y − 5.'}],
    [{t:'Distribute the 3',ok:true,say:'3x + 6.'},{t:'Add 5 first',ok:false,say:'Legal, but open the parentheses first so the right side is a plain mx + b.'},{t:'Divide both sides by 3',ok:false,say:'That buries y in a fraction. Distribute instead.'}],
    [{t:'Add 5 to both sides',ok:true,say:'y = 3x + 11. Slope-intercept form.'},{t:'Subtract 5 from both sides',ok:false,say:'To undo − 5, add 5.'},{t:'Subtract 3x from both sides',ok:false,say:'That heads toward standard form without finishing this one. Add 5 first.'}],
    [{t:'Subtract 3x, then multiply by −1',ok:true,say:'−3x + y = 11 → 3x − y = −11. A is positive.'},{t:'Subtract 11 from both sides',ok:false,say:'That puts the number on the left. Standard form keeps the number alone on the right.'},{t:'Leave −3x + y = 11',ok:false,say:'Almost. Standard form prefers A positive: multiply every term by −1.'}]];
  const draw=(msg,bad)=>{ host.innerHTML=`<p class="eyebrow">Interactive: form changer</p><h3>Point-slope → slope-intercept → standard. Pick the next move.</h3><div class="scale" style="grid-template-columns:1fr;margin:12px 0"><div class="pan ${bad?'tilt':''}" style="font-size:1.25rem">${states[step]}</div></div>${step<4?`<div class="chips">${moves[step].map((mv,i)=>`<button type="button" class="chip" data-i="${i}">${mv.t}</button>`).join('')}</div>`:'<div class="fb ok"><b>3x − y = −11.</b> Three forms, one line. Checkpoint cleared.</div>'}<p style="margin-top:10px;min-height:1.5em">${msg||''}</p>`;
    host.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{ const mv=moves[step][+c.dataset.i]; if(mv.ok){ step++; ding(); draw('<b style="color:var(--ok)">'+mv.say+'</b>'); if(step===4&&!cleared){ cleared=true; done(); } } else { thud(); draw('<b style="color:var(--bad)">Tilt!</b> '+mv.say,true); } }); };
  draw();
},
5(host,done){
  const base={m:2,b:1}; const tasks=[{t:'Make a line <b>parallel</b> to <span class="eq">y = 2x + 1</span> through <b>(0, −3)</b>.',m:2,b:-3},{t:'Make a line <b>perpendicular</b> to <span class="eq">y = 2x + 1</span> through <b>(0, 4)</b>.',m:-0.5,b:4}]; let ti=0, m=1, b=0, cleared=false;
  const draw=(msg)=>{ const T=tasks[ti]; host.innerHTML=`<p class="eyebrow">Interactive: parallel and perpendicular</p><h3>${T?T.t:'Both built.'}</h3><div class="plane-wrap">${planeSVG({xmin:-6,xmax:6,ymin:-6,ymax:6,w:300,h:300,lines:[{m:base.m,b:base.b,color:'var(--muted)',width:2,dash:true},{m,b}],points:T?[[0,T.b,'var(--l6)']]:[]})}</div>
   <div class="block soft" style="margin-top:8px"><div class="num" style="font-weight:900;font-size:1.1rem">y = ${M.fmt(m)}x ${b<0?'− '+Math.abs(b):'+ '+b} <span class="muted" style="font-weight:600;font-size:.85rem">(dashed: y = 2x + 1)</span></div><label style="display:block;margin-top:6px">m: <b class="num">${M.fmt(m)}</b><input type="range" id="sm" min="-3" max="3" step="0.5" value="${m}" style="width:100%"></label><label style="display:block;margin-top:6px">b: <b class="num">${b}</b><input type="range" id="sb" min="-6" max="6" step="1" value="${b}" style="width:100%"></label><div class="row" style="margin-top:8px"><button type="button" class="btn sm" id="ck5" ${T?'':'disabled'}>Check</button><span class="muted">m₁ · m₂ = ${M.fmt(base.m*m)}</span></div><p id="m5" style="margin-top:6px;min-height:1.5em">${msg||''}</p></div>`;
    $('#sm',host).oninput=e=>{ m=+e.target.value; draw(); }; $('#sb',host).oninput=e=>{ b=+e.target.value; draw(); };
    const ck=$('#ck5',host); if(T) ck.onclick=()=>{ if(m===T.m&&b===T.b){ ti++; ding(); if(ti===2){ draw('<b style="color:var(--ok)">Checkpoint cleared.</b> Parallel: same slope. Perpendicular: slopes multiply to −1.'); if(!cleared){ cleared=true; done(); } } else draw('<b style="color:var(--ok)">Parallel.</b> Same slope, different b. Now the perpendicular one.'); } else { thud(); draw('<b style="color:var(--bad)">Not yet.</b> '+(m!==T.m?(ti===0?'Parallel means the same slope as the dashed line.':'Perpendicular slope: flip 2 to ½, then flip the sign.'):'Slope is right. The line must pass through the marked point on the y-axis.')); } }; };
  draw();
},
6(host,done){
  let sorted=false, eqOK=false, cleared=false; const slots={m:null,b:null}; let picked=null;
  const draw=(msg)=>{ host.innerHTML=`<p class="eyebrow">Interactive: story to equation</p><h3>Jug's lemonade stand costs <b>$40</b> to open and earns <b>$6 per hour</b>.</h3><p>Tap a number, then tap where it belongs.</p><div class="chips" id="nums"><button type="button" class="chip" data-v="40" ${slots.m===40||slots.b===40?'disabled':''}>40</button><button type="button" class="chip" data-v="6" ${slots.m===6||slots.b===6?'disabled':''}>6</button></div><div class="row" style="margin-top:8px;gap:12px"><button type="button" class="opt" data-s="m" style="flex:1">slope m (rate): <b class="num">${slots.m??'__'}</b></button><button type="button" class="opt" data-s="b" style="flex:1">y-intercept b (start): <b class="num">${slots.b??'__'}</b></button></div><p id="m6" style="margin-top:8px;min-height:1.5em">${msg||''}</p>
   ${sorted?`<h3 style="margin-top:14px">Write the equation (x = hours, y = dollars).</h3><div class="row"><input type="text" id="eq6" class="ans" placeholder="y = …" autocomplete="off"><button type="button" class="btn sm" id="ck6">Check</button></div><p id="m7" style="margin-top:6px;min-height:1.5em">${eqOK?'<b style="color:var(--ok)">y = 6x + 40 ✔</b>':''}</p>`:''}
   ${eqOK?`<h3 style="margin-top:14px">How many dollars after 5 hours?</h3><div class="row"><input type="text" id="n6" class="ans" inputmode="numeric" placeholder="dollars"><button type="button" class="btn sm" id="ck7">Check</button></div><p id="m8" style="margin-top:6px;min-height:1.5em">${cleared?'<b style="color:var(--ok)">6(5) + 40 = 70. Checkpoint cleared.</b>':''}</p>`:''}`;
    host.querySelectorAll('#nums .chip').forEach(c=>c.onclick=()=>{ picked=+c.dataset.v; host.querySelectorAll('#nums .chip').forEach(x=>x.classList.remove('sel')); c.classList.add('sel'); });
    host.querySelectorAll('[data-s]').forEach(s=>s.onclick=()=>{ if(picked===null){ $('#m6',host).textContent='Tap a number first.'; return; } const want=s.dataset.s==='m'?6:40; if(picked===want){ slots[s.dataset.s]=picked; picked=null; ding(); if(slots.m===6&&slots.b===40){ sorted=true; draw('<b style="color:var(--ok)">"Per hour" is the rate, so 6 is m. "To open" is the start, so 40 is b.</b>'); } else draw('<b style="color:var(--ok)">Yes.</b>'); } else { thud(); picked=null; draw(`<b style="color:var(--bad)">Not there.</b> ${want===6?'The slope is the amount per hour. Which number has "per" next to it?':'b is the value when x = 0: what is owed before any hours pass?'}`); } });
    const ck=$('#ck6',host); if(ck) ck.onclick=()=>{ const raw=$('#eq6',host).value; const t=M.tryParse(raw), c=M.tryParse('y=6x+40'); if(t&&t.t==='rel'&&equationEquiv(t,c)&&lineForm(raw)==='si'){ eqOK=true; ding(); draw(); } else { thud(); $('#m7',host).innerHTML='<b style="color:var(--bad)">Not yet.</b> '+(t&&t.t==='rel'&&equationEquiv(t,c)?'Right line; write it as y = mx + b.':'y = (rate)x + (start).'); } };
    const ck7=$('#ck7',host); if(ck7) ck7.onclick=()=>{ if(M.toNumber($('#n6',host).value)===70){ ding(); if(!cleared){ cleared=true; done(); } draw(); } else { thud(); $('#m8',host).innerHTML='<b style="color:var(--bad)">Plug in x = 5:</b> 6 × 5, then add the 40.'; } }; };
  draw();
},
};

/* ---- Mini-bosses: 3 each, fresh numbers ---- */
const MINI_U2={
1:[{kind:'num',prompt:'Find the slope of the line through <b>(1, 2)</b> and <b>(4, 11)</b>.',answer:'3',placeholder:'m = …',hint:'(11 − 2)/(4 − 1).'},
   {kind:'num',prompt:'Find the slope of the line through <b>(−3, 4)</b> and <b>(5, −2)</b>. Fraction or decimal.',answer:'-3/4',placeholder:'m = … (fraction)',hint:'(−2 − 4)/(5 − (−3)) = −6/8.'},
   {kind:'choice',prompt:'The line through <b>(2, 7)</b> and <b>(2, −1)</b> has what slope?',options:['Undefined (the x values are the same, so the run is 0)','0 (flat)','8','−8'],correct:[0],hint:'Run = 2 − 2 = 0. Dividing by zero is undefined.'}],
2:[{kind:'table',xs:[-1,0,1,2],ys:[-5,-2,1,4],prompt:'Fill in the table for <span class="eq">y = 3x − 2</span>.',hint:'Multiply x by 3, then subtract 2.'},
   {kind:'graph',line:'3x+2y=6',needIntercepts:true,plane:{xmin:-5,xmax:5,ymin:-5,ymax:5},prompt:'Graph <span class="eq">3x + 2y = 6</span> using its intercepts (one dot on each intercept).',hint:'y = 0 → 3x = 6 → (2, 0). x = 0 → 2y = 6 → (0, 3).'},
   {kind:'choice',prompt:'Which describes the graph of <span class="eq">x = 4</span>?',options:['A vertical line through 4 on the x-axis','A horizontal line through 4 on the y-axis','A line through the origin with slope 4','A single point at (4, 0)'],correct:[0],hint:'Every point has x = 4: (4, 0), (4, 1), (4, 2)… They stack straight up.'}],
3:[{kind:'choice',prompt:'In <span class="eq">y = 7 − 4x</span>, what is the slope?',options:['−4','7','4','−7'],correct:[0],hint:'The slope is the number glued to x, sign included.'},
   {kind:'line',form:'si',answer:'y=2x-5',prompt:'Write the equation in slope-intercept form of the line with slope <b>2</b> through <b>(3, 1)</b>.',placeholder:'y = …',hint:'1 = 2(3) + b → b = −5.'},
   {kind:'line',form:'si',answer:'y=-3x+4',prompt:'Write the equation in slope-intercept form of the line through <b>(0, 4)</b> and <b>(2, −2)</b>.',placeholder:'y = …',hint:'m = (−2 − 4)/(2 − 0) = −3. (0, 4) is the y-intercept.'}],
4:[{kind:'choice',prompt:'Point-slope form for slope <b>−2</b> through <b>(−1, 6)</b>:',options:['y − 6 = −2(x + 1)','y − 6 = −2(x − 1)','y + 6 = −2(x + 1)','y + 1 = −2(x − 6)'],correct:[0],hint:'y − y₁ = m(x − x₁), and x − (−1) = x + 1.'},
   {kind:'line',form:'si',answer:'y=-2x+4',prompt:'Rewrite <span class="eq">y − 6 = −2(x + 1)</span> in slope-intercept form.',placeholder:'y = …',hint:'Distribute: −2x − 2. Then add 6.'},
   {kind:'line',form:'std',answer:'2x+y=4',prompt:'Rewrite <span class="eq">y = −2x + 4</span> in standard form (A positive).',placeholder:'Ax + By = C',hint:'Add 2x to both sides.'}],
5:[{kind:'num',prompt:'What is the slope of a line <b>perpendicular</b> to <span class="eq">y = ¾x − 2</span>? Fraction or decimal.',answer:'-4/3',placeholder:'m = …',hint:'Flip the fraction, then flip the sign.'},
   {kind:'line',form:'si',answer:'y=-3x+2',prompt:'Write the equation of the line <b>parallel</b> to <span class="eq">y = −3x + 7</span> through <b>(1, −1)</b>.',placeholder:'y = …',hint:'Same slope −3. −1 = −3(1) + b → b = 2.'},
   {kind:'choice',prompt:'Are <span class="eq">2x − y = 5</span> and <span class="eq">y = 2x + 3</span> parallel, perpendicular, or neither?',options:['Parallel (both have slope 2)','Perpendicular','Neither','They are the same line'],correct:[0],hint:'Solve the first for y: y = 2x − 5.'}],
6:[{kind:'line',form:'si',answer:'y=8x+25',prompt:'A gym charges <b>$25</b> to join and <b>$8 per month</b>. Write an equation for the total cost <i>y</i> after <i>x</i> months.',placeholder:'y = …',hint:'"Per month" is the rate (m). "To join" is the start (b).'},
   {kind:'num',prompt:'A pattern has <b>4</b> tiles in figure 1, <b>7</b> in figure 2, and <b>10</b> in figure 3. How many tiles in figure <b>12</b>?',answer:'37',placeholder:'tiles',hint:'Up 3 each figure: t = 3n + 1. Plug in n = 12.'},
   {kind:'choice',prompt:'A line on a cost graph crosses the y-axis at 15 and rises 2 for every 1 to the right. Which story matches?',options:['A $15 start fee plus $2 per unit','A $2 start fee plus $15 per unit','$15 per unit with no start fee','A $15 fee that drops $2 per unit'],correct:[0],hint:'The y-intercept is the value at x = 0, before any units. The slope is the per-unit change.'}],
};
UNITS.u2.SCENES=SCENES_U2; UNITS.u2.EXPLAINERS=EXPLAINERS_U2; UNITS.u2.MINI=MINI_U2;
UNITS.u2.EXPL_HOW={1:'drag the dots to all four slopes',2:'find both intercepts, then graph them',3:'build all three lines',4:'change the form with legal moves',5:'build the parallel and the perpendicular line',6:'sort the numbers, write the equation, plug in 5'};
