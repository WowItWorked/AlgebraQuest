/* ===== Final Boss: seeded practice-test generator ===== */
const NAMES=['Avery','Blake','Casey','Devin','Emery','Finley','Harper','Jordan','Kai','Lennon','Morgan','Quinn','Reese','Rowan','Sage','Tatum'];
const F2=n=>Number.isInteger(n)?String(n):n.toFixed(2).replace(/0$/,'');
const money=n=>'$'+(Number.isInteger(n)?n.toLocaleString('en-US'):n.toFixed(2));
function genTest(seed){
  const r=M.rng(seed); const ri=(a,b)=>a+Math.floor(r()*(b-a+1)); const pick=a=>a[Math.floor(r()*a.length)]; const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const probs=[], items=[];
  /* P1 */
  { const v=pick([{who:'A DJ',ev:'party'},{who:'A bounce-house company',ev:'block party'},{who:'A photo-booth company',ev:'dance'},{who:'A magician',ev:'birthday'},{who:'A food truck',ev:'fundraiser'}]);
    const H0=pick([2,3,4]), R=pick([200,250,300,400,500]), n=ri(2,6), F=pick([800,1000,1200,1500,1600,2000]); const B=F+R*(n+0.5); const tot=H0+n/2;
    probs.push({n:1,title:'The '+v.ev.replace(/^\w/,c=>c.toUpperCase())+' Budget',stem:`${v.who} charges <b>${money(F)}</b> for the first <b>${H0} hours</b> of a ${v.ev}, then <b>${money(R)}</b> for each <b>additional half-hour</b>. The budget is <b>${money(B)}</b>.`});
    items.push({id:'1a',p:1,skill:'setup',learn:1,kind:'rel',setup:true,work:false,prompt:'Let <i>h</i> = the number of additional half-hours. Write an inequality that describes the situation. (The setup only; solving is part c.)',answer:`${F}+${R}h<=${B}`,show:`${F} + ${R}h ≤ ${B}`,placeholder:'e.g. fixed cost + ___h ≤ budget',
      variants:[{form:`${F}+${R}h<${B}`,why:'Used a strict symbol; "budget" allows spending exactly the budget, so it needs ≤.'},{form:`${F}+${R}h>=${B}`,why:'Symbol points the wrong way; a budget is a ceiling, not a floor.'},{form:`${R}h<=${B}`,why:'Left out the fixed cost for the first hours.'},{form:`${F}+${R}h<=${B-F}`,why:'Fused a solving step into the setup; the inequality has to describe the situation before anything is moved.'}],
      diag:'Build the total cost (fixed part + rate × h), then compare it to the budget with ≤.'});
    items.push({id:'1b',p:1,skill:'setup',learn:1,kind:'rel',setup:true,work:false,prompt:`Now let <i>t</i> = the <b>total</b> time in hours (including the first ${H0}). Write a new inequality using <i>t</i>.`,answer:`${F}+${2*R}(t-${H0})<=${B}`,show:`${F} + ${2*R}(t − ${H0}) ≤ ${B}`,placeholder:'e.g. ___ + ___(t − __) ≤ ___',
      variants:[{form:`${F}+${2*R}t<=${B}`,why:`Charged for all t hours, but the first ${H0} are already covered by the fixed cost: extra hours are t − ${H0}.`},{form:`${F}+${R}(t-${H0})<=${B}`,why:`Used the half-hour price for a whole hour; one extra hour has two half-hours, so it costs ${2*R}.`},{form:`${F}+${R}t<=${B}`,why:'Mixed up the variable: t is total hours, not extra half-hours.'}],
      diag:`Extra hours = t − ${H0}; each costs 2 × ${R} = ${2*R}. Then compare to the budget with ≤.`});
    items.push({id:'1c',p:1,skill:'solve',learn:2,kind:'num',work:true,prompt:`Solve your inequality from (a). What is the <b>maximum total time</b> for the ${v.ev}, including the first ${H0} hours? (Answer in hours.)`,answer:String(tot),show:`${F2(tot)} hours`,placeholder:'hours',partial:{[String(H0+(n+0.5)/2)]:'The algebra was right, but only whole half-hours can be bought.'},
      variants:[{num:n+0.5,why:'Stopped at the algebra answer for h (half-hours), not the total hours.'},{num:n,why:'Reported whole half-hours; the question asks for total time in hours.'},{num:n/2,why:'Found the extra hours but forgot to add the first '+H0+' hours.'}],
      diag:`${F}+${R}h ≤ ${B} gives h ≤ ${n+0.5}; only ${n} whole half-hours fit, which is ${n/2} hours; total = ${H0} + ${n/2} = ${F2(tot)} hours.`});
  }
  /* P2 */
  { const L=pick([['A','l','p','B'],['S','a','p','C'],['T','q','v','W'],['V','r','s','D'],['K','m','n','E']]); const [T,q,v,W]=L; const names=shuffle(NAMES).slice(0,3); const ci=ri(0,2);
    const forms=[`${v} = 2(${T} − ${W}) / ${q}`,`${v} = 2${T} − ${W}/${q}`,`${v} = (${T} − ${W}) / (2${q})`]; // correct, ben-type, chris-type
    const order=[0,1,2]; const arrange=shuffle([1,2]); const slots=[]; slots[ci]=0; const others=[0,1,2].filter(i=>i!==ci); slots[others[0]]=arrange[0]; slots[others[1]]=arrange[1];
    const studs=names.map((nm,i)=>({nm,form:forms[slots[i]],kind:slots[i]}));
    probs.push({n:2,title:'Three Students, One Formula',stem:`A formula says <span class="eq">${T} = ½${q}${v} + ${W}</span>. Three students solved it for <i>${v}</i>:<div class="students">${studs.map(s=>`<div><b>${s.nm}:</b> <span class="eq">${s.form}</span></div>`).join('')}</div>`});
    items.push({id:'2a',p:2,skill:'verify',learn:6,kind:'choice',work:false,prompt:`Which student solved for <i>${v}</i> correctly?`,options:studs.map(s=>s.nm),correct:[ci],show:studs[ci].nm,diag:'Test each formula with easy numbers that make the original true; only one returns the right value.'});
    items.push({id:'2b',p:2,skill:'literal',learn:3,kind:'order',work:false,prompt:'Put the steps of the correct solution in order (tap a step to add it).',steps:[`${T} − ${W} = ½${q}${v}`,`2(${T} − ${W}) = ${q}${v}`,`${v} = 2(${T} − ${W}) / ${q}`],show:'subtract, double, divide',diag:`Undo in reverse order: subtract ${W}, multiply both sides by 2, divide by ${q}.`});
    const benN=studs.find(s=>s.kind===1).nm, chrisN=studs.find(s=>s.kind===2).nm, anaN=studs[ci].nm;
    const opts=shuffle([{t:`${benN} cleared the ½ before subtracting ${W}, and then divided only ${W} by ${q} instead of the whole side.`,ok:true},{t:`${chrisN} divided by 2 instead of multiplying by 2 to undo the ½.`,ok:true},{t:`${anaN} forgot to distribute the 2 to both ${T} and ${W}.`,ok:false},{t:`${benN} and ${chrisN} both treated ${q} as a number instead of a variable.`,ok:false}]);
    items.push({id:'2c',p:2,skill:'verify',learn:6,kind:'choice',work:false,prompt:'Which statement correctly explains an error? (Two are true; pick one.)',options:opts.map(o=>o.t),correct:opts.map((o,i)=>o.ok?i:-1).filter(i=>i>=0),show:'either true statement',diag:'Compare each wrong answer to the correct undo order; name the exact step that broke.'});
  }
  /* P3 */
  { const y=pick(['y','m','w']), k=pick(['k','c','d'].filter(x=>x!==y)); const a=ri(2,4), b=a+ri(4,7);
    const x=pick(['x','z']), yy=pick(['y','v'].filter(t=>t!==x)), c=ri(2,5), d=pick(['c','d','b'].filter(t=>t!==yy&&t!==x)), n=pick(['n','m'].filter(t=>t!==yy&&t!==x&&t!==d));
    let q,s,p,rr,t; for(let i=0;i<200;i++){ q=ri(2,6); s=ri(2,6); if(q===s) continue; p=ri(1,9); rr=ri(1,9); const num=-(q*rr+s*p); if(num%(s-q)!==0) continue; t=num/(s-q); if(t===0||Math.abs(t)>20) continue; break; }
    const dd=pick([2,3,4]), aa=ri(2,5), cc=ri(1,3), y0=ri(1,5), e=ri(1,6); const bb=(aa+cc)*y0-e; const bnum=bb*dd, cnum=cc*dd; // aa*y = (bnum - cnum*y)/dd + e
    probs.push({n:3,title:'Solve for the Letter',stem:'Solve each equation for the indicated variable.'});
    items.push({id:'3a',p:3,skill:'literal',learn:3,kind:'expr',var:y,work:true,prompt:`Solve <span class="eq">${a}${y} + ${k} = ${b}${y} − ${k}${y}</span> for <i>${y}</i>.`,answer:`${k}/(${b-a}-${k})`,show:`${y} = ${k} / (${b-a} − ${k})`,placeholder:`${y} = …`,
      variants:[{form:`${k}/(${b-a}+${k})`,why:`Sign slipped when ${k}${y} crossed the equals sign.`},{form:`${k}/${b-a}`,why:`Lost the ${k}${y} term; it has a ${y} in it, so it belongs with the other ${y} terms.`},{form:`${k}/(${b+a}-${k})`,why:`${a}${y} and ${b}${y} are on opposite sides: moving one changes its sign, so they subtract, not add.`}],
      diag:`Collect every ${y} term on one side (${k} = ${b-a}${y} − ${k}${y}), factor (${k} = ${y}(${b-a} − ${k})), then divide by the group.`});
    items.push({id:'3b',p:3,skill:'literal',learn:3,kind:'expr',var:yy,work:true,prompt:`Solve <span class="eq">${x} = ${c}(${yy} − ${d}) / ${n}</span> for <i>${yy}</i>.`,answer:`${n}${x}/${c}+${d}`,show:`${yy} = ${n}${x}/${c} + ${d}`,placeholder:`${yy} = …`,
      variants:[{form:`${n}${x}/${c}-${d}`,why:`Last step: undoing "− ${d}" means adding ${d}, not subtracting.`},{form:`(${n}${x}+${d})/${c}`,why:`Added ${d} inside the division by ${c}; undo the ÷${n}, then the ×${c}, then the −${d}.`},{form:`${c}${x}/${n}+${d}`,why:`${c} and ${n} swapped roles: multiply by ${n} to clear the division, then divide by ${c}.`}],
      diag:`Multiply by ${n}, divide by ${c}, add ${d}: ${yy} = ${n}${x}/${c} + ${d}.`});
    items.push({id:'3c',p:3,skill:'fractions',learn:4,kind:'num',work:true,prompt:`Solve <span class="eq">(t + ${p}) / ${q} = (t − ${rr}) / ${s}</span> for <i>t</i>.`,answer:String(t),show:`t = ${t}`,placeholder:'t = …',
      variants:[{num:-t,why:'Sign slip after cross-multiplying; recheck the move of the constant.'},{num:(-(q*rr+s*p))/(s-q)*-1===t?null:(q*p+s*rr)/(s-q),why:'Cross-multiplied the wrong pairs; each denominator multiplies the opposite top.'},{num:(s*p-q*rr)/(q-s)!==t?(s*p-q*rr)/(q-s):null,why:`Did not distribute to the second term; ${s}(t + ${p}) means ${s}t and ${s}·${p}.`}].filter(v=>v.num!==null&&isFinite(v.num)),
      diag:`Cross-multiply with the bar grouping each top: ${s}(t + ${p}) = ${q}(t − ${rr}); distribute; collect t.`});
    items.push({id:'3d',p:3,skill:'fractions',learn:4,kind:'num',work:true,prompt:`Solve <span class="eq">${aa}${y} = (${bnum} − ${cnum}${y}) / ${dd} + ${e}</span> for <i>${y}</i>.`,answer:String(y0),show:`${y} = ${y0}`,placeholder:`${y} = …`,
      variants:[{num:(bb+e)/(aa+cnum),why:`Divided only ${bnum} by ${dd}; the bar is under the whole top, so ${cnum}${y} ÷ ${dd} = ${cc}${y} too.`},{num:(bnum+e)/(aa*dd+cnum)===y0?null:(bnum+e)/(aa*dd+cnum),why:`Multiplied by ${dd} but forgot the + ${e} outside the fraction.`}].filter(v=>v.num!==null),
      diag:`Simplify the fraction first: (${bnum} − ${cnum}${y})/${dd} = ${bb} − ${cc}${y}. Then ${aa}${y} + ${cc}${y} = ${bb} + ${e}.`});
  }
  /* P4 */
  { const l=ri(20,60), w=ri(8,50); const P=2*l+2*w;
    probs.push({n:4,title:'The Rectangle',stem:`A rectangle has perimeter <b>${P} in</b> and length <b>${l} in</b>. Perimeter is <span class="eq">P = 2l + 2w</span>.`});
    items.push({id:'4a',p:4,skill:'literal',learn:3,kind:'expr',var:'w',work:false,prompt:'Solve <span class="eq">P = 2l + 2w</span> for <i>w</i>.',answer:'(p-2l)/2',show:'w = (P − 2l)/2  or  P/2 − l',placeholder:'w = …',
      variants:[{form:'p-2l/2',why:'Divided only one term by 2; the whole side (P − 2l) gets divided.'},{form:'p-2l',why:'Subtracted 2l but never divided by 2.'},{form:'(p+2l)/2',why:'Added 2l instead of subtracting it.'}],diag:'Subtract 2l from both sides, then divide the whole side by 2.'});
    items.push({id:'4b',p:4,skill:'verify',learn:6,kind:'num',work:true,prompt:'Find the width (in inches).',answer:String(w),show:`${w} in`,placeholder:'inches',
      variants:[{num:2*w,why:'Found 2w, not w.'},{num:(P-l)/2,why:'Subtracted l once; the rectangle has two lengths, so subtract 2l.'}],diag:`w = (${P} − 2·${l})/2 = ${w}.`});
  }
  /* P5 */
  { const pair=pick([['BlueBucket','SpringDrop'],['RiverJug','HilltopWater'],['CloudCask','DeepWell Co.'],['FreshFlow','AquaCart']]); let x0,b,dd,a,c,diff; for(let i=0;i<100;i++){ x0=ri(4,12); diff=pick([0.5,1,1.5,2]); if(!Number.isInteger(x0*diff)) continue; b=pick([4.5,5,5.5,6,6.5,7]); dd=b+diff; c=ri(8,15); a=c+x0*diff; break; }
    probs.push({n:5,title:'Water Delivery',stem:`<b>${pair[0]}</b> charges <b>${money(a)}</b> plus <b>${money(b)} per jug</b>. <b>${pair[1]}</b> charges <b>${money(c)}</b> plus <b>${money(dd)} per jug</b>. Let <i>x</i> = number of jugs. <b>When does ${pair[0]} cost less?</b>`});
    items.push({id:'5a',p:5,skill:'setup',learn:1,kind:'rel',setup:true,work:false,prompt:`Write the inequality that compares the two bills and says ${pair[0]} costs less than ${pair[1]}. (The setup only; solving is part b.)`,answer:`${a}+${b}x<${c}+${dd}x`,show:`${a} + ${F2(b)}x < ${c} + ${F2(dd)}x`,placeholder:'fee + rate·x < fee + rate·x',
      variants:[{form:`x>${x0}`,why:'Gave the solved answer; part (a) asks for the inequality comparing the two bills.'},{form:`${a}+${b}x>${c}+${dd}x`,why:`Direction reversed: ${pair[0]}'s total should be on the smaller side.`},{form:`${a}+${b}x<=${c}+${dd}x`,why:'"Costs less" is strict: a tie is not cheaper.'}],diag:`Each bill is fee + rate·x. Put ${pair[0]}'s bill on the small side with <.`});
    items.push({id:'5b',p:5,skill:'solve',learn:2,kind:'rel',solved:'x',work:true,prompt:'Solve your inequality from (a).',answer:`x>${x0}`,show:`x > ${x0}`,placeholder:'x > …',
      variants:[{form:`x<${x0}`,why:'Direction flipped without dividing by a negative (or did not flip when it was needed).'},{form:`x<-${x0}`,why:'Divided by a negative without flipping the symbol.'},{form:`x>=${x0}`,why:'Added "or equal"; solving keeps the strict symbol from (a).'}],diag:`Subtract ${F2(b)}x and ${c} from both sides: ${a-c} < ${F2(diff)}x, so x > ${x0}.`});
    items.push({id:'5c',p:5,skill:'solve',learn:2,kind:'num',work:true,prompt:`In real-world terms, what is the smallest number of jugs for which ${pair[0]} is the cheaper plan?`,answer:String(x0+1),show:`${x0+1} jugs`,placeholder:'jugs',
      variants:[{num:x0,why:`Reported the algebraic boundary; at exactly ${x0} jugs the plans cost the same.`}],diag:`x > ${x0} and jugs are whole, so the first one is ${x0+1}.`});
  }
  /* P6 */
  { const m=ri(8,30), gap=ri(5,8); const L=3*m+3, U=3*(m+gap)+3; const want=[]; for(let x=m+1;x<m+gap;x++) want.push(x);
    probs.push({n:6,title:'Three in a Row',stem:`Three consecutive integers have a sum <b>greater than ${L}</b> and <b>less than ${U}</b>. Let <i>x</i> = the smallest integer.`});
    items.push({id:'6a',p:6,skill:'compound',learn:5,kind:'rel',setup:true,work:false,prompt:'Write a compound inequality for the sum of the three integers. (The setup only; solving is part b.)',answer:`${L}<3x+3<${U}`,show:`${L} < 3x + 3 < ${U}`,placeholder:`${L} < ___ < ${U}`,
      variants:[{form:`${L}<3x<${U}`,why:'Summed to 3x; the integers are x, x + 1, x + 2, so the sum is 3x + 3.'},{form:`${L}<=3x+3<=${U}`,why:'"Greater than" and "less than" are strict; no "or equal".'},{form:`${L}<x<${U}`,why:'Trapped x instead of the sum of the three integers.'}],diag:'Sum = x + (x+1) + (x+2) = 3x + 3, trapped strictly between the two numbers.'});
    items.push({id:'6b',p:6,skill:'compound',learn:5,kind:'rel',solved:'x',work:true,prompt:'Solve the compound inequality for <i>x</i>.',answer:`${m}<x<${m+gap}`,show:`${m} < x < ${m+gap}`,placeholder:'__ < x < __',
      variants:[{form:`${m+1}<x<${m+gap+1}`,why:'Subtracted 3 from the middle only; all three parts get the same move.'},{form:`${m}<=x<=${m+gap}`,why:'Symbols stay strict.'},{form:`${L-3}<3x<${U-3}`,why:'Stopped before dividing all three parts by 3.'}],diag:`Subtract 3 everywhere (${L-3} < 3x < ${U-3}), then divide everywhere by 3.`});
    items.push({id:'6c',p:6,skill:'compound',learn:5,kind:'triples',work:true,want,prompt:'List every possible set of three consecutive integers. (Like 16,17,18; 17,18,19; …)',show:want.map(x=>`(${x},${x+1},${x+2})`).join(' '),placeholder:'a,b,c; d,e,f; …',
      diag:`x can be ${want.join(', ')}; each starts a triple. The endpoints ${m} and ${m+gap} are not solutions.`});
    items.push({id:'6d',p:6,skill:'compound',learn:5,kind:'numberline',work:false,prompt:'Graph the solution to (b). Drag the circles; tap one to switch open/closed.',nl:{min:m-4,max:m+gap+4,lo:m,hi:m+gap,loOpen:true,hiOpen:true},show:`open circles at ${m} and ${m+gap}, shaded between`,diag:'Endpoints from (b), open circles for strict, shade between.'});
  }
  items.forEach(it=>{ if(it.variants) it.variants=it.variants.filter(v=>{ const raw=v.form?(it.kind==='expr'?it.var+'='+v.form:v.form):String(v.num); return !gradeItem(it,raw,null).ok; }); });
  return {seed, probs, items};
}
function diagnose(it, raw, extra){
  if(!raw && !extra) return 'Left blank. Any attempt with work shown is worth more than a blank.';
  for(const v of (it.variants||[])){ try{ if(v.form&&it.kind==='rel'&&M.relEquiv(raw,v.form)) return v.why; if(v.form&&it.kind==='expr'){ const ss=M.solvedSide(raw,it.var); if(ss.expr&&M.exprEquiv(ss.expr,v.form)) return v.why; } if(v.num!==undefined&&it.kind==='num'&&M.numEq(M.toNumber(raw),v.num)) return v.why; }catch(e){} }
  if(it.kind==='expr'){ const st=M.solvedSide(raw,it.var).status; if(st==='not-solved'||st==='circular') return `Not finished: ${it.var} still appears on both sides or inside the answer.`; if(st==='bad') return 'Could not read the answer as an expression; check parentheses.'; }
  if(it.kind==='numberline'&&extra){ const w=it.nl; if(extra.lo===w.lo&&extra.hi===w.hi) return 'Endpoints right, but strict inequalities need open circles.'; return 'Endpoints do not match the solution to (b).'; }
  if(it.kind==='triples'){ const ints=M.integers(raw); if(ints.includes(it.want[0]-1)||ints.includes(it.want[it.want.length-1]+1)) return 'Included a boundary value; the endpoints are not solutions when the symbols are strict.'; if(ints.length<it.want.length*3) return 'Missing some sets; every integer strictly between the endpoints starts one.'; }
  return null;
}
function workPoint(txt){ const t=(txt||'').trim(); return t.length>=6 && /\d/.test(t) && /[=<>+\-*/÷×−·()]/.test(t); }

/* ===== Boss view ===== */
let boss={test:null, seed:null, result:null};
VIEWS.boss=(app)=>{
  if(boss.result) return bossResults(app);
  if(!boss.test){ app.innerHTML=h`<div class="stack"><div class="block" style="border-color:var(--bad)"><p class="eyebrow" style="color:var(--bad)">Final Boss</p><h1>Same moves. New numbers.</h1><p style="margin-top:6px">Six problems, 19 answers, and work lines on the hard ones. The boss says nothing until you hit <b>Grade</b> at the very end. Then you get a score out of <b class="num">29</b> (19 answers + 10 work lines), a breakdown, and what to practice.</p>
    <div class="row" style="margin-top:12px"><button class="btn gold" id="startBoss">Start a fresh run</button>${State.s.attempts.length?`<span class="muted">Runs so far: <b class="num">${State.s.attempts.length}</b> · best <b class="num">${Math.max(...State.s.attempts.map(a=>a.pct))}%</b></span>`:''}</div>
    <details style="margin-top:12px"><summary>Replay a specific run (seed)</summary><div class="lock" style="margin-top:8px"><input type="text" id="seedIn" inputmode="numeric" placeholder="seed number"><button class="btn alt sm" id="seedBtn">Load</button></div></details></div>
    ${State.s.attempts.length?`<div class="block soft"><p class="eyebrow">Past runs</p><div class="tablewrap"><table><thead><tr><th>When</th><th class="n">Score</th><th>Missed</th></tr></thead><tbody>${[...State.s.attempts].sort((a,b)=>b.ts-a.ts).slice(0,10).map(a=>`<tr><td>${new Date(a.ts).toLocaleDateString()}</td><td class="n"><b>${a.score}/${a.total}</b> (${a.pct}%)</td><td>${a.items.filter(x=>!x.ok).map(x=>x.id).join(', ')||'nothing!'}</td></tr>`).join('')}</tbody></table></div></div>`:''}</div>`;
    $('#startBoss').onclick=()=>{ boss.seed=Math.floor(Math.random()*90000)+10000; boss.test=genTest(boss.seed); boss.answers={}; render(); };
    $('#seedBtn').onclick=()=>{ const s=parseInt($('#seedIn').value,10); if(s>0){ boss.seed=s; boss.test=genTest(s); boss.answers={}; render(); } };
    return;
  }
  const T=boss.test; const hpPct=100;
  app.innerHTML=h`<div class="stack">
   <div class="block" style="border-color:var(--bad)"><div class="bossbar"><div><p class="eyebrow" style="color:var(--bad)">Final Boss · run ${T.seed}</p><h2>Answer everything, then Grade.</h2></div><div class="row"><span class="muted" id="answered">0/19 answered</span><button class="btn alt sm" id="quitBoss">Leave</button></div></div></div>
   ${T.probs.map(P=>`<div class="block"><p class="eyebrow">Problem ${P.n}</p><h2>${esc(P.title)}</h2><p style="margin:8px 0 14px">${P.stem}</p><div class="stack">${T.items.filter(i=>i.p===P.n).map(it=>`<div class="item" data-item="${it.id}"><div class="tag">${it.id.toUpperCase()}</div><div>${it.prompt}</div><label class="muted" style="font-size:.85rem">${it.work?'Show your work (worth a point)':'Work it out here (not graded)'}</label><textarea class="work" placeholder="Write the steps here. Messy is fine."></textarea>${answerUI(it,'b')}</div>`).join('')}</div></div>`).join('')}
   <div class="block" style="border-color:var(--bad)"><div class="row" style="justify-content:space-between"><p>Done? The boss only grades once you say so.</p><button class="btn gold" id="gradeBtn">Grade my test</button></div></div>
  </div>`;
  const count=()=>{ let n=0; T.items.forEach(it=>{ const el=app.querySelector(`[data-item="${it.id}"]`); const r=rawOf(it,el); if(it.kind==='numberline'?true:r.trim()) n++; }); $('#answered').textContent=`${n}/19 answered`; };
  T.items.forEach(it=>wireAnswerUI(it, app.querySelector(`[data-item="${it.id}"]`), count));
  $('#quitBoss').onclick=()=>modal('<h2>Leave the boss fight?</h2><p class="muted">This run will not be graded or saved.</p>',[{label:'Stay',cls:'alt'},{label:'Leave',fn:()=>{ boss={test:null,seed:null,result:null}; go('lobby'); }}]);
  $('#gradeBtn').onclick=()=>{
    const blanks=T.items.filter(it=>{ const el=app.querySelector(`[data-item="${it.id}"]`); return it.kind!=='numberline' && !rawOf(it,el).trim(); });
    const doGrade=()=>gradeBoss(app);
    if(blanks.length) modal(`<h2>${blanks.length} part${blanks.length===1?' is':'s are'} blank.</h2><p class="muted">${blanks.map(b=>b.id).join(', ')}. Grade anyway, or go back and try them. A guess with work shown beats a blank.</p>`,[{label:'Go back',cls:'alt'},{label:'Grade anyway',cls:'gold',fn:doGrade}]);
    else doGrade();
  };
};
async function gradeBoss(app){
  const T=boss.test; const items=T.items.map(it=>{ const el=app.querySelector(`[data-item="${it.id}"]`); const raw=rawOf(it,el).trim(); const extra=it.kind==='numberline'?el._nl.get():null; const work=($('.work',el).value||'').trim(); const g=gradeItem(it,raw,extra); const wp=it.work?workPoint(work):false; return {id:it.id,p:it.p,skill:it.skill,learn:it.learn,ok:g.ok,partial:g.partial||null,raw:it.kind==='numberline'?`${extra.loOpen?'open':'closed'} at ${extra.lo}, ${extra.hiOpen?'open':'closed'} at ${extra.hi}`:(it.kind==='choice'&&raw!==''?it.options[+raw]:raw),work,workPt:wp,hasWork:!!it.work,show:it.show,diag:g.ok?null:(diagnose(it,raw,extra)||it.diag),skillDiag:it.diag}; });
  const score=items.filter(x=>x.ok).length+items.filter(x=>x.workPt).length; const total=items.length+items.filter(x=>x.hasWork).length;
  const att={id:'a'+Date.now(),ts:Date.now(),seed:T.seed,score,total,pct:Math.round(100*score/total),items,ai:null};
  boss.result=att; render();
  if(att.pct>=80) State.award('boss'); if(score===total) State.award('perfect'); State.addCoins(Math.round(score*2),'boss run');
  if(State.sample){ try{ await aiBossFeedback(att); }catch(e){} } att.aiDone=true;
  await saveAttempt(att); State.save(); if(route.view==='boss') render();
}
async function aiBossFeedback(att){
  const T=boss.test; const missed=att.items.filter(x=>!x.ok||(x.hasWork&&x.work));
  const payload=missed.map(x=>{ const it=T.items.find(i=>i.id===x.id); return {id:x.id, question:it.prompt.replace(/<[^>]+>/g,''), correct:x.show, student_answer:x.raw, student_work:x.work||'(none)', rubric:it.diag, result:x.ok?'correct':'missed'}; });
  const prompt=`You are a coach reviewing an 11-year-old's Algebra 1 practice test (reading level: 6th grade; do not simplify the math). Return ONLY JSON: {"items":[{"id":"...","diagnosis":"..."}],"summary":"..."}.
For each item below, write "diagnosis": 1-2 sentences naming the specific step where the work goes wrong (or, if correct, one sentence on what the work shows), based on the student's work and answer. Never use first person. Do not just restate the rubric.
Then "summary": 3-5 sentences on what to focus on next, ordered by impact, referring to skills not item numbers. No dates, no urgency language, no mention of the test being soon.
Problems: ${JSON.stringify(payload)}`;
  const out=await State.sample.json(prompt,{modelTier:'default',cache:false});
  if(out&&Array.isArray(out.items)) out.items.forEach(d=>{ const x=att.items.find(i=>i.id===d.id); if(x&&d.diagnosis) x.aiDiag=String(d.diagnosis); });
  if(out&&out.summary) att.ai=String(out.summary);
}
function bossResults(app){
  const a=boss.result; const byP={}; a.items.forEach(x=>{ (byP[x.p]=byP[x.p]||{ok:0,n:0,w:0,wn:0}); byP[x.p].n++; if(x.ok) byP[x.p].ok++; if(x.hasWork){ byP[x.p].wn++; if(x.workPt) byP[x.p].w++; } });
  const missedSkills=[...new Set(a.items.filter(x=>!x.ok).map(x=>x.skill))];
  app.innerHTML=h`<div class="stack">
   <div class="block" style="border-color:var(--gold)"><p class="eyebrow">Final Boss · run ${a.seed} · results</p>
    <div class="result"><div class="big">${a.score} / ${a.total}</div><div><h2>${a.pct>=90?'Boss defeated. Clean run.':a.pct>=80?'Boss defeated.':a.pct>=60?'Boss staggered. Rematch?':'Boss took the round. Respawn and go again.'}</h2><p class="muted">${a.items.filter(x=>x.ok).length} of 19 answers correct, plus ${a.items.filter(x=>x.workPt).length} of 10 work points. Total possible: 29.</p></div></div>
    <div class="row" style="margin-top:12px"><button class="btn gold" id="retake">Retake with new numbers</button><button class="btn alt" data-go="learn">Train in Learn</button><button class="btn alt" data-go="lobby">Lobby</button></div></div>
   ${a.ai?`<div class="block soft"><p class="eyebrow">Coach: what to focus on next</p><p>${esc(a.ai)}</p></div>`:(State.sample&&!a.aiDone?`<div class="block soft"><p class="eyebrow">Coach</p><p class="muted">Reading your work…</p></div>`:'')}
   ${missedSkills.length?`<div class="block soft"><p class="eyebrow">Skills to practice</p><div class="row" style="margin-top:6px">${missedSkills.map(s=>`<a class="btn sm alt" href="#level${LEVELS.find(L=>L.skill===s).n}" data-go="level" data-arg="${LEVELS.find(L=>L.skill===s).n}">Level ${LEVELS.find(L=>L.skill===s).n}: ${SKILL_NAMES[s]}</a>`).join('')}</div></div>`:''}
   <div class="block"><h2>Problem by problem</h2><div class="tablewrap"><table><thead><tr><th>Problem</th><th class="n">Answers</th><th class="n">Work</th></tr></thead><tbody>${boss.test.probs.map(P=>`<tr><td>${P.n}. ${esc(P.title)}</td><td class="n">${byP[P.n].ok}/${byP[P.n].n}</td><td class="n">${byP[P.n].wn?`${byP[P.n].w}/${byP[P.n].wn}`:'—'}</td></tr>`).join('')}</tbody></table></div></div>
   ${boss.test.probs.map(P=>`<div class="block"><p class="eyebrow">Problem ${P.n}</p><h2>${esc(P.title)}</h2><p class="muted" style="margin:6px 0 12px;font-size:.95rem">${P.stem}</p><div class="stack">${a.items.filter(x=>x.p===P.n).map(x=>`<div class="item ${x.ok?'ok':'bad'}"><div class="tag">${x.id.toUpperCase()} ${x.ok?'<span class="ck">✔ correct</span>':'<span style="color:var(--bad)">✘ missed</span>'}${x.hasWork?`<span class="muted" style="font-family:var(--body);font-size:.8rem;font-weight:700">· work ${x.workPt?'✔ +1':'✘ 0'}</span>`:''}</div><div><span class="muted">Your answer:</span> <span class="eq" style="white-space:normal">${esc(x.raw||'(blank)')}</span></div>${x.ok?'':`<div><span class="muted">Correct:</span> <span class="eq" style="white-space:normal">${esc(x.show)}</span></div><div class="fb bad"><span class="who">What went wrong</span>${esc(x.diag)}<br><span class="who" style="margin-top:6px">Skill to practice</span>${SKILL_NAMES[x.skill]} · ${learnLink(x.learn)}</div>`}${x.aiDiag?`<div class="fb info"><span class="who">Coach on your work</span>${esc(x.aiDiag)}</div>`:''}${x.work?`<div class="workbox">${esc(x.work)}</div>`:''}</div>`).join('')}</div></div>`).join('')}
  </div>`;
  $('#retake').onclick=()=>{ boss={test:null,seed:null,result:null}; const seed=Math.floor(Math.random()*90000)+10000; boss.seed=seed; boss.test=genTest(seed); render(); };
}
