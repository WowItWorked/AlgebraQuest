/* ===== Unit 1 Review: scenes, interactives, mini-bosses ===== */
const SCENES_U1R={
1:[
 {who:'coach',say:'Review level one. Seven words and one big idea. The idea first: an equation is a balance. Whatever you do to one side, you do to the other.',board:'Same move, both sides'},
 {who:'checker',say:'Those moves have names. Add the same thing to both sides: Addition Property of Equality. Subtract, multiply, divide: same deal, different names.',board:'Addition · Subtraction · Multiplication · Division <span class="hl">Property of Equality</span>'},
 {who:'coach',say:'Then two helpers: the Distributive Property to open parentheses, and combining like terms to tidy up. That is the whole strategy for simple equations.',board:'Distribute · Combine · Undo'},
 {who:'nine',say:'And for inequalities, me. Multiply or divide by a negative, and the symbol turns around. Nothing else changes.',board:'÷ negative → flip',fx:'shake'},
 {who:'checker',say:'Now the words. A formula is an equation rule for a relationship between quantities. Area equals length times width. Rule.',board:'<span class="hl">formula</span>: A = lw'},
 {who:'checker',say:'A literal equation uses letters for constants and variables. P equals two l plus two w. Letters everywhere.',board:'<span class="hl">literal equation</span>: P = 2l + 2w'},
 {who:'vera',say:'An identity is an equation that is true for every value of the variable. Two times x plus one equals two x plus two. Try any x. It always works. Even I cannot break it.',board:'<span class="hl">identity</span>: 2(x + 1) = 2x + 2'},
 {who:'checker',say:'A compound inequality is two or more inequalities joined by the word and, or the word or.',board:'<span class="hl">compound inequality</span>: x > 3 or x < −1'},
 {who:'coach',say:'Set words. A set is a well-defined collection. An element is one object in it. Three is an element of the set one, two, three.',board:'<span class="hl">set</span> {1, 2, 3} · <span class="hl">element</span> 3'},
 {who:'coach',say:'A subset is a set whose elements all belong to another set. One and two, as a set, is a subset of one, two, three.',board:'<span class="hl">subset</span>: {1, 2} ⊆ {1, 2, 3}'},
 {who:'checker',say:'Element is one thing. Subset is a smaller collection. That pair trips people up on tests.',board:'element = one · subset = a smaller set'},
 {who:'vera',say:'Key words to remember: rule means formula. Letters means literal. Always true means identity. And-or means compound. Object means element. Smaller set means subset.',board:'rule · letters · always true · and/or · object · smaller set',fx:'hop'},
],
2:[
 {who:'coach',say:'Lesson one-two. Solving linear equations. The book example: two-thirds of six x minus fifteen, plus five x, equals twenty-six.',board:'⅔(6x − 15) + 5x = 26'},
 {who:'bar',say:'Parentheses first. Distribute the two-thirds to both terms inside. Two-thirds of six x is four x. Two-thirds of fifteen is ten.',board:'<span class="hl">4x − 10</span> + 5x = 26'},
 {who:'coach',say:'Combine like terms. Four x and five x are both x terms. Together: nine x.',board:'<span class="hl">9x</span> − 10 = 26'},
 {who:'vera',say:'Now get me alone. Something is subtracting ten from my nine. Add ten to both sides.',board:'9x = 36'},
 {who:'coach',say:'Nine is multiplying x. Divide both sides by nine.',board:'x = <span class="hl">4</span>'},
 {who:'checker',say:'Plug it in. Two-thirds of six times four minus fifteen is two-thirds of nine, which is six. Plus five times four, twenty. Six plus twenty is twenty-six. Verified.',board:'⅔(9) + 20 = 26 ✔',fx:'hop'},
 {who:'nine',say:'Shortcut! Combine six x and five x before distributing. Eleven x!',board:'<span class="bad">6x + 5x = 11x</span>',fx:'shake'},
 {who:'bar',say:'Illegal. The six x is inside parentheses being multiplied by two-thirds. It is not free to combine until the parentheses are gone.',board:'Distribute before you combine'},
 {who:'coach',say:'Decimals and fractions do not change the plan. One point zero four five s plus point zero six eight equals fifteen point seven four three. Subtract, then divide.',board:'1.045s + 0.068 = 15.743 → s = 15'},
 {who:'coach',say:'Fractions: five-eighths equals three-quarters b minus seven-twelfths. Add seven-twelfths to both sides with a common denominator, then multiply by four-thirds.',board:'¾b = 29/24 → b = 29/18'},
 {who:'vera',say:'The order: distribute, combine, then undo in reverse. Add or subtract first, multiply or divide last.',board:'Distribute · Combine · Undo',fx:'hop'},
],
3:[
 {who:'coach',say:'Lesson one-three. A variable on both sides. Five x minus forty-eight equals negative three x plus eight.',board:'5x − 48 = −3x + 8'},
 {who:'vera',say:'There are two of me, one on each side. First job: get all my terms together on one side, and all the plain numbers on the other.',board:'x terms left · numbers right'},
 {who:'coach',say:'Add three x to both sides. The negative three x on the right disappears. On the left, five x plus three x is eight x.',board:'<span class="hl">8x</span> − 48 = 8'},
 {who:'coach',say:'Add forty-eight to both sides. Eight x equals fifty-six.',board:'8x = 56'},
 {who:'coach',say:'Divide both sides by eight. x equals seven.',board:'x = <span class="hl">7</span>'},
 {who:'checker',say:'Plug it in. Five times seven minus forty-eight is negative thirteen. Negative three times seven plus eight is negative thirteen. Verified.',board:'−13 = −13 ✔',fx:'hop'},
 {who:'nine',say:'Pro tip from a villain: subtract five x instead. Then you get negative eight x. More negatives, more chances for me to confuse you.',board:'−48 = −8x + 8',fx:'shake'},
 {who:'coach',say:'Legal, but messier. Move the smaller x term so the x that remains is positive. Less to flip, fewer sign slips.',board:'Move the smaller x term'},
 {who:'bar',say:'Decimals on both sides? You may multiply by a power of ten to clear them, but both sides get the same multiplier. Multiplying one side by one hundred and the other by ten breaks the balance.',board:'×100 on <span class="hl">both</span> sides'},
 {who:'coach',say:'Error analysis problems love that mistake. Check each line against the one above it: what changed, and did both sides get the same treatment?',board:'Same move on both sides?'},
 {who:'vera',say:'Collect my terms on one side. Numbers on the other. Then one undo at a time. Same as always, just one more move at the start.',board:'Collect · Undo · Check',fx:'hop'},
],
4:[
 {who:'coach',say:'Lesson one-four. Literal equations and formulas. The cylinder: volume equals pi r squared h.',board:'V = πr²h'},
 {who:'vera',say:'This time the star is h. Everything else, pi, r squared, is just a number wearing a costume. Treat the letters like numbers.',board:'Letters are numbers in costume'},
 {who:'coach',say:'h is multiplied by pi r squared. Divide both sides by pi r squared.',board:'h = <span class="hl">V / (πr²)</span>'},
 {who:'coach',say:'Now it is a formula for h. Plug in: volume sixteen fifty, radius six, pi about three point one four.',board:'h = 1650 / (3.14 · 36)'},
 {who:'checker',say:'Three point one four times thirty-six is one hundred thirteen point zero four. Sixteen fifty divided by that is about fourteen point six. The height is about fourteen point six centimeters.',board:'h ≈ 14.60 cm',fx:'hop'},
 {who:'coach',say:'Rewrite first, then plug in. That order keeps the arithmetic clean and the formula reusable.',board:'Rewrite → Plug in'},
 {who:'bar',say:'When the variable is under a fraction bar, multiply both sides by the bottom. Acceleration a equals final velocity minus initial velocity, all over t.',board:'a = (V<sub>f</sub> − V<sub>i</sub>) / t'},
 {who:'coach',say:'Multiply both sides by t: a t equals V f minus V i. Add V i: V f equals a t plus V i.',board:'V<sub>f</sub> = <span class="hl">at + V<sub>i</sub></span>'},
 {who:'nine',say:'Here is a classic from the error analysis: four-thirds a equals b plus five. The student wrote b equals four-thirds a PLUS five.',board:'<span class="bad">b = ⁴⁄₃a + 5</span>',fx:'shake'},
 {who:'vera',say:'Five is being added to me. To undo adding five, subtract five. b equals four-thirds a minus five. Signs flip when they cross, not when they feel like it.',board:'b = ⁴⁄₃a <span class="hl">−</span> 5'},
 {who:'coach',say:'Letters like numbers. Undo in reverse. Rewrite, then plug in. That is formulas.',board:'Undo in reverse · Rewrite · Plug in',fx:'hop'},
],
5:[
 {who:'coach',say:'Lesson one-five. Inequalities in one variable. Same strategies as equations, with one rule from a certain villain.',board:'−2(6x + 5) ≤ 74'},
 {who:'bar',say:'Distribute the negative two to both terms. Negative twelve x minus ten, at most seventy-four.',board:'−12x − 10 ≤ 74'},
 {who:'coach',say:'Add ten to both sides. Negative twelve x at most eighty-four.',board:'−12x ≤ 84'},
 {who:'nine',say:'Now you have to divide by negative twelve. By me, basically. Watch the symbol.',board:'÷ (−12)',fx:'shake'},
 {who:'coach',say:'Dividing by a negative reverses the inequality symbol. Less-than-or-equal becomes greater-than-or-equal. x is at least negative seven.',board:'x <span class="hl">≥</span> −7',fx:'flip'},
 {who:'checker',say:'Check with a number bigger than negative seven, like zero. Negative two times five is negative ten, which is at most seventy-four. True. Verified.',board:'x = 0: −10 ≤ 74 ✔',fx:'hop'},
 {who:'coach',say:'Graph it. x at least negative seven: a closed circle at negative seven, because equal counts, and a ray to the right.',board:'● at −7, ray →'},
 {who:'vera',say:'Reading a graph backwards works too. Closed circles at negative one and three, shaded between: negative one at most x at most three.',board:'−1 ≤ x ≤ 3'},
 {who:'coach',say:'Variable on both sides? Two point four x minus nine, less than one point eight x plus six. Subtract one point eight x so x stays positive. No flip needed.',board:'0.6x − 9 < 6 → x < 25'},
 {who:'nine',say:'If you insist on subtracting the bigger one, you get negative point six x, and then you meet me. Your choice.',board:'Avoid the negative, avoid the flip'},
 {who:'coach',say:'Word problems: write what each person has done at time x, compare with the right symbol, solve, then convert back to the story. Minutes become a time of day.',board:'60(x − 90) > 45x → x > 360 → 3:00 P.M.'},
 {who:'vera',say:'Same moves as equations. Flip only for a negative multiply or divide. Open circle for strict, closed for equal.',board:'Flip for negatives · ○ strict · ● equal',fx:'hop'},
],
6:[
 {who:'coach',say:'Lesson one-six. Compound inequalities. Two inequalities, one word between them: and, or or.',board:'and · or'},
 {who:'checker',say:'AND means both must be true. OR means at least one must be true. That one word decides the whole graph.',board:'<span class="hl">and</span> = both · <span class="hl">or</span> = at least one'},
 {who:'coach',say:'The example: negative twenty-four, less than four x minus four, less than four. That is an and-statement written as a sandwich.',board:'−24 < 4x − 4 < 4'},
 {who:'bar',say:'Three parts, three treatments. Add four to all three. Negative twenty, less than four x, less than eight.',board:'−20 < 4x < 8'},
 {who:'coach',say:'Divide all three parts by four. Negative five, less than x, less than two.',board:'−5 < x < 2'},
 {who:'coach',say:'Graph: open circles at negative five and two, shaded between. Between is what and looks like.',board:'○━━━○ between'},
 {who:'nine',say:'Now an or. x greater than three, or x less than negative one. A student shaded between with closed circles. Delicious.',board:'<span class="bad">●━━━●</span>',fx:'shake'},
 {who:'checker',say:'Wrong on two counts. Or shades outward, away from each circle. And strict symbols get open circles. Pick a number between, like one: it is not bigger than three and not less than negative one. Not a solution.',board:'←○&nbsp;&nbsp;&nbsp;○→ outward'},
 {who:'coach',say:'Solving an or: solve each part separately and keep both. Two x minus three greater than five gives x greater than four. Three x minus one less than eight gives x less than three.',board:'x > 4 or x < 3'},
 {who:'coach',say:'Solving an and: solve each part, then keep only what satisfies both. x at most twenty-four, and x at most negative four, is just x at most negative four.',board:'x ≤ 24 and x ≤ −4 → x ≤ −4'},
 {who:'nine',say:'Divide all three parts by me, and both symbols flip. I never do half a job.',board:'÷ negative → both flip'},
 {who:'vera',say:'And means both: between, or the stricter one. Or means at least one: outward. Three parts, three treatments.',board:'and → between · or → outward',fx:'hop'},
],
};
const EXPLAINERS_U1R={
1(host,done){
  const pairs=[['formula','an equation rule for a relationship between quantities'],['compound inequality','two or more inequalities joined by and / or'],['element','one of the distinct objects of a set'],['subset','a set whose elements all belong to another set'],['set','a well-defined collection of elements'],['literal equation','an equation where letters stand for constants and variables'],['identity','an equation true for every value of the variable']];
  const order=[3,0,5,1,6,2,4]; let sel=null, got=0;
  host.innerHTML=`<p class="eyebrow">Interactive: word match</p><h3>Tap a word, then tap its meaning.</h3><div class="chips" id="terms">${order.map(i=>`<button type="button" class="kw" data-i="${i}">${pairs[i][0]}</button>`).join('')}</div><div class="opts" style="margin-top:12px" id="defs">${pairs.map((p,i)=>`<button type="button" class="opt" data-d="${i}">${p[1]}</button>`).join('')}</div><p id="msg" class="muted" style="margin-top:8px">0 of 7 matched.</p>`;
  host.querySelectorAll('.kw').forEach(k=>k.onclick=()=>{ if(k.classList.contains('good')) return; host.querySelectorAll('.kw').forEach(x=>x.classList.remove('sel')); k.classList.add('sel'); sel=k; });
  host.querySelectorAll('.opt').forEach(d=>d.onclick=()=>{ if(!sel||d.disabled) return; if(+sel.dataset.i===+d.dataset.d){ sel.classList.remove('sel'); sel.classList.add('good'); d.disabled=true; d.innerHTML=`<b>${pairs[+d.dataset.d][0]}</b> — ${pairs[+d.dataset.d][1]}`; d.style.borderColor='var(--ok)'; got++; ding(); $('#msg',host).textContent=`${got} of 7 matched.`; if(got===7){ $('#msg',host).innerHTML='<b>All matched. Checkpoint cleared.</b>'; done(); } } else { thud(); $('#msg',host).innerHTML=`Not <b>${sel.textContent}</b>. Look for its key word: rule, and/or, object, smaller set, collection, letters, always true.`; } sel=null; host.querySelectorAll('.kw').forEach(x=>x.classList.remove('sel')); });
},
2(host,done){
  let step=0; const states=['⅔(6x − 15) + 5x = 26','4x − 10 + 5x = 26','9x − 10 = 26','9x = 36','x = 4'];
  const moves=[[{t:'Distribute the ⅔',ok:true,say:'⅔ × 6x = 4x and ⅔ × 15 = 10.'},{t:'Combine 6x + 5x first',ok:false,say:'6x is locked inside the parentheses until you distribute.'},{t:'Divide both sides by ⅔',ok:false,say:'That would hit the 5x and the 26 too. Open the parentheses first.'}],
    [{t:'Combine like terms: 4x + 5x',ok:true,say:'Nine x.'},{t:'Divide both sides by 4',ok:false,say:'4 is only on one of the x terms. Combine first.'},{t:'Add 10 to both sides',ok:false,say:'Legal, but tidy first: combine the x terms, then undo.'}],
    [{t:'Add 10 to both sides',ok:true,say:'Undo the −10.'},{t:'Divide both sides by 9',ok:false,say:'The −10 is still attached. Undo adding/subtracting before multiplying/dividing.'},{t:'Subtract 10 from both sides',ok:false,say:'That makes it −20. To undo −10, add 10.'}],
    [{t:'Divide both sides by 9',ok:true,say:'x = 4. Plug it in: ⅔(9) + 20 = 26 ✔'},{t:'Subtract 9 from both sides',ok:false,say:'9 is multiplying x, not added.'},{t:'Multiply both sides by 9',ok:false,say:'That is the wrong direction. Divide to undo a multiply.'}]];
  const draw=(msg,bad)=>{ host.innerHTML=`<p class="eyebrow">Interactive: distribute, combine, undo</p><h3>Pick the next legal move.</h3><div class="scale" style="grid-template-columns:1fr;margin:12px 0"><div class="pan ${bad?'tilt':''}" style="font-size:1.3rem">${states[step]}</div></div>${step<4?`<div class="chips">${moves[step].map((m,i)=>`<button type="button" class="chip" data-i="${i}">${m.t}</button>`).join('')}</div>`:'<div class="fb ok"><b>x = 4.</b> Distribute, combine, undo in reverse. Checkpoint cleared.</div>'}<p style="margin-top:10px;min-height:1.5em">${msg||''}</p>`;
    host.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{ const m=moves[step][+c.dataset.i]; if(m.ok){ step++; ding(); draw('<b style="color:var(--ok)">'+m.say+'</b>'); if(step===4) done(); } else { thud(); draw('<b style="color:var(--bad)">Tilt!</b> '+m.say,true); } }); };
  draw();
},
3(host,done){
  let step=0, dec=false; const states=['5x − 48 = −3x + 8','8x − 48 = 8','8x = 56','x = 7'];
  const moves=[[{t:'Add 3x to both sides',ok:true,say:'All x terms on the left, and x stays positive.'},{t:'Subtract 5x from both sides',ok:false,say:'Legal, but it leaves −8x. Move the smaller x term so x stays positive.'},{t:'Divide both sides by 5',ok:false,say:'There is an x term on the right too. Collect first.'}],
    [{t:'Add 48 to both sides',ok:true,say:'Numbers to the right.'},{t:'Divide both sides by 8',ok:false,say:'The −48 is still attached to 8x.'}],
    [{t:'Divide both sides by 8',ok:true,say:'x = 7. Check: 35 − 48 = −13 and −21 + 8 = −13 ✔'},{t:'Subtract 8 from both sides',ok:false,say:'8 is multiplying x.'}]];
  const draw=(msg,bad)=>{ host.innerHTML=`<p class="eyebrow">Interactive: collect, then undo</p><h3>Variable on both sides. Pick the next move.</h3><div class="scale" style="margin:12px 0"><div class="pan ${bad?'tilt':''}">${states[step].split(' = ')[0]}</div><div style="font-family:var(--disp)">=</div><div class="pan ${bad?'tilt':''}">${states[step].split(' = ')[1]}</div></div>${step<3?`<div class="chips">${moves[step].map((m,i)=>`<button type="button" class="chip" data-i="${i}">${m.t}</button>`).join('')}</div>`:''}<p style="margin-top:10px;min-height:1.5em">${msg||''}</p>
   ${step===3?`<h3 style="margin-top:14px">Bonus: clearing decimals.</h3><p class="muted">To clear <span class="eq">0.6y − 0.12 = 3.2 − 0.2y</span>, which move keeps the balance?</p><div class="chips"><button type="button" class="chip" data-k="bad">×100 on the left, ×10 on the right</button><button type="button" class="chip" data-k="good">×100 on both sides</button></div><p id="m3" style="margin-top:8px;min-height:1.5em">${dec?'<b style="color:var(--ok)">60y − 12 = 320 − 20y → 80y = 332 → y = 4.15. Checkpoint cleared.</b>':''}</p>`:''}`;
    host.querySelectorAll('.chip[data-i]').forEach(c=>c.onclick=()=>{ const m=moves[step][+c.dataset.i]; if(m.ok){ step++; ding(); draw('<b style="color:var(--ok)">'+m.say+'</b>'); } else { thud(); draw('<b style="color:var(--bad)">Tilt!</b> '+m.say,true); } });
    host.querySelectorAll('.chip[data-k]').forEach(c=>c.onclick=()=>{ if(c.dataset.k==='good'){ dec=true; ding(); draw(); done(); } else { thud(); $('#m3',host).innerHTML='<b style="color:var(--bad)">That is the error from problem 22.</b> Different multipliers break the equality.'; } }); };
  draw();
},
4(host,done){
  let solved=false, computed=false;
  const draw=()=>{ host.innerHTML=`<p class="eyebrow">Interactive: rewrite, then plug in</p><h3>The cylinder: <span class="eq">V = πr²h</span>. Solve for h.</h3><div class="chips"><button type="button" class="chip" data-k="sub">Subtract πr² from both sides</button><button type="button" class="chip" data-k="div">Divide both sides by πr²</button><button type="button" class="chip" data-k="mul">Multiply both sides by πr²</button></div><p id="m4" style="margin-top:8px;min-height:1.5em">${solved?'<b style="color:var(--ok)">h = V / (πr²). Now use it.</b>':''}</p>
   ${solved?`<div class="block soft"><div class="row"><label>V = <input type="text" id="vin" value="1650" inputmode="decimal" style="max-width:110px"></label><label>r = <input type="text" id="rin" value="6" inputmode="decimal" style="max-width:80px"></label><button type="button" class="btn sm" id="calc">Compute h (π ≈ 3.14)</button></div><p id="m5" style="margin-top:8px;min-height:1.5em">${computed?'<b style="color:var(--ok)">Checkpoint cleared.</b>':''}</p></div>`:''}`;
    host.querySelectorAll('[data-k]').forEach(c=>c.onclick=()=>{ if(c.dataset.k==='div'){ solved=true; ding(); draw(); } else { thud(); $('#m4',host).innerHTML=c.dataset.k==='sub'?'<b style="color:var(--bad)">πr² is multiplying h, not added.</b> What undoes multiplying?':'<b style="color:var(--bad)">Wrong direction.</b> h is already being multiplied by πr².'; } });
    const cb=$('#calc',host); if(cb) cb.onclick=()=>{ const V=parseFloat($('#vin',host).value), R=parseFloat($('#rin',host).value); if(!isFinite(V)||!isFinite(R)||R===0){ $('#m5',host).textContent='Enter numbers for V and r.'; return; } const hv=V/(3.14*R*R); $('#m5',host).innerHTML=`h = ${V} / (3.14 · ${R}²) = ${V} / ${M.fmt(3.14*R*R)} ≈ <b class="num">${hv.toFixed(2)}</b>${V===1650&&R===6?' cm. Matches the book. ':'. '}${computed?'':'<b style="color:var(--ok)">Checkpoint cleared.</b>'}`; if(!computed){ computed=true; ding(); done(); } }; };
  draw();
},
5(host,done){
  let step=0; const states=['−2(6x + 5) ≤ 74','−12x − 10 ≤ 74','−12x ≤ 84','x ≥ −7'];
  const moves=[[{t:'Distribute the −2',ok:true,say:'−12x − 10 ≤ 74.'},{t:'Add 5 to both sides',ok:false,say:'The 5 is inside the parentheses. Distribute first.'}],
    [{t:'Add 10 to both sides',ok:true,say:'−12x ≤ 84.'},{t:'Divide by −12 now',ok:false,say:'Undo the −10 first.'}],
    [{t:'Divide by −12: x ≤ −7',ok:false,say:'Negative Nine objects: dividing by a negative flips the symbol.'},{t:'Divide by −12 and flip: x ≥ −7',ok:true,say:'Flipped. x ≥ −7.'}]];
  let nl=null, graphed=false;
  const draw=(msg,bad)=>{ host.innerHTML=`<p class="eyebrow">Interactive: solve with Negative Nine watching</p><h3>Pick the next move.</h3><div class="scale" style="grid-template-columns:1fr;margin:12px 0"><div class="pan ${bad?'tilt':''}" style="font-size:1.3rem">${states[step]}</div></div>${step<3?`<div class="chips">${moves[step].map((m,i)=>`<button type="button" class="chip" data-i="${i}">${m.t}</button>`).join('')}</div>`:''}<p id="m6" style="margin-top:8px;min-height:1.5em">${msg||''}</p>${step===3?`<h3 style="margin-top:10px">Graph x ≥ −7.</h3><div class="nl" id="nl5"></div><div class="row" style="margin-top:8px"><button class="btn sm" id="chk5">Check my graph</button></div><p id="m7" style="margin-top:6px;min-height:1.5em"></p>`:''}`;
    host.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{ const m=moves[step][+c.dataset.i]; if(m.ok){ step++; ding(); draw('<b style="color:var(--ok)">'+m.say+'</b>'); } else { thud(); draw('<b style="color:var(--bad)">Nope.</b> '+m.say,true); } });
    if(step===3){ nl=numberLine($('#nl5',host),-10,2,null,null,{chooseShape:true,shape:'between'}); $('#chk5',host).onclick=()=>{ const s=nl.get(); if(s.shape==='right'&&s.lo===-7&&!s.loOpen){ ding(); $('#m7',host).innerHTML='<b style="color:var(--ok)">Closed circle at −7, ray right. Checkpoint cleared.</b>'; if(!graphed){ graphed=true; done(); } } else { thud(); $('#m7',host).innerHTML='<b style="color:var(--bad)">Not yet.</b> '+(s.shape!=='right'?'x ≥ −7 is one ray toward bigger numbers.':s.lo!==-7?'The circle goes at −7.':'≥ includes −7: closed circle.'); } }; } };
  draw();
},
6(host,done){
  let mode='and', seen={and:false,or:false}; let graphed=false;
  const draw=()=>{ host.innerHTML=`<p class="eyebrow">Interactive: and versus or</p><h3>Toggle the word and watch the graph.</h3><div class="chips"><button type="button" class="chip" data-m="and" aria-pressed="${mode==='and'}">x > −2 <b>and</b> x < 3</button><button type="button" class="chip" data-m="or" aria-pressed="${mode==='or'}">x < −2 <b>or</b> x > 3</button></div>
   <div style="margin-top:10px">${nlSVG({min:-6,max:7,lo:-2,hi:3,loOpen:true,hiOpen:true,shape:mode==='and'?'between':'outside',alt:mode})}</div><p class="muted">${mode==='and'?'AND: both must be true, so only the numbers between −2 and 3 work. Shade between.':'OR: at least one must be true, so everything below −2 plus everything above 3 works. Shade outward.'}</p>
   <h3 style="margin-top:14px">Now graph the book example: <span class="eq">−5 < x < 2</span>.</h3><div class="nl" id="nl6"></div><div class="row" style="margin-top:8px"><button class="btn sm" id="chk6">Check my graph</button></div><p id="m8" style="margin-top:6px;min-height:1.5em">${graphed?'<b style="color:var(--ok)">Checkpoint cleared.</b>':''}</p>`;
    host.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{ mode=b.dataset.m; seen[mode]=true; draw(); });
    const nl=numberLine($('#nl6',host),-7,4,null,null,{chooseShape:true,shape:'outside'}); $('#chk6',host).onclick=()=>{ const s=nl.get(); if(s.shape==='between'&&s.lo===-5&&s.hi===2&&s.loOpen&&s.hiOpen){ ding(); $('#m8',host).innerHTML='<b style="color:var(--ok)">Open at −5 and 2, shaded between. Checkpoint cleared.</b>'; if(!graphed){ graphed=true; done(); } } else { thud(); $('#m8',host).innerHTML='<b style="color:var(--bad)">Not yet.</b> '+(s.shape!=='between'?'It is an "and" sandwich: shade between.':(s.lo!==-5||s.hi!==2)?'Endpoints are −5 and 2.':'Strict symbols: open circles.'); } }; };
  draw();
},
};
const MINI_U1R={
1:[{kind:'choice',prompt:'Which term means two or more inequalities joined by <i>and</i> or <i>or</i>?',options:['compound inequality','literal equation','identity','subset'],correct:[0],hint:'The key word is and/or.'},
   {kind:'choice',prompt:'Which equation is an <b>identity</b>?',options:['3(x + 2) = 3x + 6','3x + 2 = 8','x + 1 = x + 2','x² = 9'],correct:[0],hint:'An identity is true for every x. Try x = 0 and x = 5 in each.'},
   {kind:'choice',prompt:'Which property justifies going from <span class="eq">x − 4 = 10</span> to <span class="eq">x = 14</span>?',options:['Addition Property of Equality','Distributive Property','Division Property of Equality','Subtraction Property of Equality'],correct:[0],hint:'What was done to both sides to undo the − 4?'}],
2:[{kind:'num',prompt:'Solve <span class="eq">2(3x − 4) = 10</span>.',answer:'3',placeholder:'x = …',hint:'Distribute: 6x − 8 = 10. Then add 8, then divide by 6.'},
   {kind:'num',prompt:'Solve <span class="eq">1.5s + 0.25 = 7.75</span>.',answer:'5',placeholder:'s = …',hint:'Subtract 0.25 first, then divide by 1.5.'},
   {kind:'num',prompt:'Solve <span class="eq">¼x − 3 = 2</span>.',answer:'20',placeholder:'x = …',hint:'Add 3 to both sides, then multiply by 4 (the reciprocal of ¼).'}],
3:[{kind:'num',prompt:'Solve <span class="eq">7x − 10 = 2x + 25</span>.',answer:'7',placeholder:'x = …',hint:'Subtract 2x (the smaller x term), then add 10, then divide by 5.'},
   {kind:'num',prompt:'Solve <span class="eq">3(y − 2) = 5y + 4</span>.',answer:'-5',placeholder:'y = …',hint:'Distribute: 3y − 6 = 5y + 4. Subtract 3y, subtract 4, divide by 2.'},
   {kind:'num',prompt:'Solve <span class="eq">0.5(t + 6) = 0.2(t + 9)</span>.',answer:'-4',placeholder:'t = …',hint:'Distribute both sides: 0.5t + 3 = 0.2t + 1.8. Subtract 0.2t and 3.'}],
4:[{kind:'expr',var:'b',prompt:'Solve <span class="eq">A = ½bh</span> for <i>b</i>.',answer:'2a/h',placeholder:'b = …',hint:'Multiply by 2 to undo the ½, then divide by h.'},
   {kind:'expr',var:'a',prompt:'Solve <span class="eq">F = ma</span> for <i>a</i>.',answer:'f/m',placeholder:'a = …',hint:'a is multiplied by m. Divide both sides by m.'},
   {kind:'expr',var:'x',prompt:'Solve <span class="eq">y = mx + b</span> for <i>x</i>.',answer:'(y-b)/m',placeholder:'x = …',hint:'Subtract b from both sides first, then divide the whole side by m.'}],
5:[{kind:'rel',solved:'x',prompt:'Solve <span class="eq">−3x + 4 > 19</span>.',answer:'x<-5',placeholder:'x < …',hint:'Subtract 4: −3x > 15. Dividing by −3 flips the symbol.'},
   {kind:'rel',solved:'x',prompt:'Solve <span class="eq">2(x − 3) ≤ 4x + 2</span>.',answer:'x>=-4',placeholder:'x ≥ …',hint:'Distribute: 2x − 6 ≤ 4x + 2. Subtract 2x (keeps x positive): −6 ≤ 2x + 2.'},
   {kind:'numberline',nl:{min:-10,max:0,lo:-5,loOpen:true,shape:'left',chooseShape:true},prompt:'Graph <span class="eq">x < −5</span>. Choose the shape, place the circle, tap for open/closed.',hint:'Less than: ray to the left. Strict: open circle.'}],
6:[{kind:'rel',solved:'x',prompt:'Solve <span class="eq">1 < 2x + 3 < 9</span>.',answer:'-1<x<3',placeholder:'__ < x < __',hint:'Subtract 3 from all three parts, then divide all three by 2.'},
   {kind:'rel',solved:'x',prompt:'Solve <span class="eq">x + 2 > 5 or 3x < −6</span>. (Type "or" between the parts.)',answer:'x>3 or x<-2',placeholder:'x > … or x < …',hint:'Solve each part on its own and keep the word "or".'},
   {kind:'numberline',nl:{min:-6,max:7,lo:-2,hi:3,loOpen:true,hiOpen:true,shape:'outside',chooseShape:true},prompt:'Graph <span class="eq">x > 3 or x < −2</span>.',hint:'"Or" shades outward from both circles. Strict symbols: open.'}],
};
UNITS.u1r.SCENES=SCENES_U1R; UNITS.u1r.EXPLAINERS=EXPLAINERS_U1R; UNITS.u1r.MINI=MINI_U1R;
UNITS.u1r.EXPL_HOW={1:'match all 7 words',2:'solve the example with legal moves',3:'solve the example, then clear the decimals',4:'solve for h, then compute the height',5:'solve the example, then graph it',6:'graph the example'};
