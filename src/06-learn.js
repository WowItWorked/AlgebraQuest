/* ===== Learn: six obby levels ===== */
const CHARS={
  coach:{nm:'Coach Block',face:'▣',bg:'var(--grass)',fg:'#fff'},
  vera:{nm:'Vera the Variable',face:'y',bg:'var(--l4)',fg:'#fff'},
  nine:{nm:'Negative Nine',face:'−9',bg:'var(--bad)',fg:'#fff'},
  bar:{nm:'Captain Bar',face:'▬',bg:'var(--gold)',fg:'var(--gold-ink)'},
  checker:{nm:'The Checker',face:'✔',bg:'var(--l6)',fg:'#fff'},
  jug:{nm:'Jug',face:'J',bg:'var(--l1)',fg:'#fff'},
};
const SCENES={
1:[
 {who:'coach',say:'Level 1. A story walks in. Your job: turn it into a symbol sentence.',board:'“The budget is $3,000.”'},
 {who:'vera',say:'Before anything else, somebody has to say what I stand for. Precisely. I am h. I count additional half-hours. Not hours. Not minutes. Half-hours.',board:'h = number of <span class="hl">additional half-hours</span>'},
 {who:'coach',say:'Good. Now build the cost. The DJ charges 1600 up front, then 400 for each of Vera’s half-hours.',board:'1600 + 400h'},
 {who:'coach',say:'That expression is the whole bill. Nobody has solved anything yet. It just describes the party.',board:'Total cost = 1600 + 400h'},
 {who:'coach',say:'Now the magic words. “Budget 3,000.” “At most 3,000.” “No more than 3,000.” All three mean the same thing.',board:'at most · no more than · budget'},
 {who:'coach',say:'Here is the rhyme. At most, no more: the little line goes under the door. Less than, under: no line, no equal.',board:'≤ has a floor. &nbsp; < has none.'},
 {who:'vera',say:'The line under the symbol is a floor the budget can stand on. You are allowed to spend exactly 3,000. So the symbol gets its floor.',board:'1600 + 400h <span class="hl">≤</span> 3000',fx:'hop'},
 {who:'coach',say:'Read it out loud as a sentence. “Sixteen hundred plus four hundred per half-hour is at most three thousand.” If it does not read like the story, it is wrong.',board:'1600 + 400h ≤ 3000'},
 {who:'nine',say:'Boring. Let me speed it up. Subtract 1600 right here in the setup!',board:'1600 + 400h ≤ <span class="bad">3000 − 1600</span>',fx:'shake'},
 {who:'vera',say:'No! That is a solving step stuck inside a setup. Now the sentence says the party costs at most 1,400. That is not the story.',board:'<span class="bad">1600 + 400h ≤ 3000 − 1600</span>'},
 {who:'coach',say:'The setup describes the situation. Solving comes after. Keep them in separate rooms.',board:'Setup first. Solve later.'},
 {who:'coach',say:'One more: which company costs less? Each company has a bill. Put the cheaper bill on the small side of the symbol, with no floor, because a tie is not cheaper.',board:'18 + 6.5x <span class="hl">&lt;</span> 12 + 7.5x'},
 {who:'vera',say:'Define me. Build the cost. Pick the symbol from the magic words. Read it back as a sentence. That is Level 1.',board:'Define → Build → Symbol → Read back',fx:'hop'},
],
2:[
 {who:'coach',say:'Level 2. You have an inequality. Now do the algebra, then ask the real world if it agrees.',board:'1600 + 400h ≤ 3000'},
 {who:'coach',say:'Undo the plus 1600 by subtracting 1600 from both sides.',board:'400h ≤ 1400'},
 {who:'coach',say:'Undo the times 400 by dividing both sides by 400.',board:'h ≤ 3.5'},
 {who:'vera',say:'So I can be 3.5? Three and a half half-hours? The DJ sells whole half-hours. Half of a half-hour is not on the menu.',board:'h ≤ 3.5 … but h is a <span class="hl">whole number</span>'},
 {who:'coach',say:'That is the move. Algebra answers. The world decides. The biggest whole number of half-hours is 3.',board:'h = 3 half-hours = 1.5 hours'},
 {who:'coach',say:'The question asked for total time including the first 3 hours. So: 3 plus 1.5.',board:'Total = 3 + 1.5 = <span class="hl">4.5 hours</span>'},
 {who:'nine',say:'Hi. I am Negative Nine. I live inside inequalities. Divide by me and I turn you around.',board:'−9x &lt; 18',fx:'shake'},
 {who:'coach',say:'Watch. Divide both sides by negative nine. The symbol flips.',board:'x <span class="hl">&gt;</span> −2',fx:'flip'},
 {who:'nine',say:'Multiply or divide by any negative, and the sign flips. Add or subtract a negative? Nothing happens. I only bounce you when you divide.',board:'÷ or × by negative → flip'},
 {who:'coach',say:'Pro move: avoid him. In 18 + 6.5x < 12 + 7.5x, subtract 6.5x instead of 7.5x. Positive x, nobody flips.',board:'18 &lt; 12 + x'},
 {who:'coach',say:'Subtract 12 from both sides.',board:'6 &lt; x'},
 {who:'vera',say:'Six is less than x. Which means x is greater than six. Same sentence, read from the other side.',board:'6 &lt; x &nbsp; means &nbsp; x &gt; 6'},
 {who:'jug',say:'I am a jug. You cannot buy 6.1 of me. The first whole number past 6 is 7. Real-world answer: 7 jugs or more.',board:'x &gt; 6 → <span class="hl">at least 7 jugs</span>',fx:'hop'},
 {who:'coach',say:'Do the algebra. Then ask: whole units? Can time be negative? Does the story agree? Two answers, both written down.',board:'Algebra answer + real-world answer'},
],
3:[
 {who:'vera',say:'Hi. Vera the Variable. My job is to end up alone on one side of the equals sign. I hate it. It is also my whole job.',board:'3y + k = 8y − ky'},
 {who:'coach',say:'Literal equations are full of letters. Treat the other letters like numbers you just do not know yet. k is a number. It is just shy.',board:'k is a number in disguise'},
 {who:'coach',say:'Rule one: undo in reverse order. Whatever was done to the variable last gets undone first.',board:'P = 2l + 2w → subtract 2l first, then ÷ 2'},
 {who:'vera',say:'But look at my equation. I am on both sides. There is a y here, a y there, and a y hiding inside the ky.',board:'3<span class="hl">y</span> + k = 8<span class="hl">y</span> − k<span class="hl">y</span>'},
 {who:'coach',say:'Then the chant. Collect. Factor. Divide. Say it with me. Collect, factor, divide.',board:'<span class="hl">Collect · Factor · Divide</span>'},
 {who:'coach',say:'Collect: get every y term on one side. Subtract 3y from both sides.',board:'k = 8y − ky − 3y'},
 {who:'coach',say:'Combine the plain y terms. 8y minus 3y is 5y.',board:'k = 5y − ky'},
 {who:'vera',say:'I am still in two places on that side. Five of me, and a k-of-me. Pull me out of both!',board:'k = <span class="hl">y</span>(5 − k)',fx:'hop'},
 {who:'coach',say:'Factor: y times the group five minus k. Now y appears exactly once.',board:'k = y(5 − k)'},
 {who:'coach',say:'Divide: y is being multiplied by the whole group. Divide both sides by the whole group.',board:'y = <span class="hl">k / (5 − k)</span>'},
 {who:'nine',say:'Could you divide by just the 5? Asking for a friend.',board:'y = k/5 … <span class="bad">no</span>',fx:'shake'},
 {who:'vera',say:'No. The group is glued. Five minus k, all of it, or nothing. Alone at last. Slightly sweating.',board:'y = k / (5 − k)',fx:'hop'},
 {who:'coach',say:'Collect, factor, divide. Treat letters like numbers. Undo in reverse. That is the whole level.',board:'Collect · Factor · Divide'},
],
4:[
 {who:'bar',say:'Captain Bar reporting. I am the fraction bar. Everything on top of me is one team. Everything under me is one team.',board:'<span class="hl">(t + 2)</span> / 3'},
 {who:'bar',say:'When you see t plus 2 over 3, read it as the whole group t plus 2, divided by 3. I am a grouping symbol in a trench coat.',board:'(t + 2) ÷ 3'},
 {who:'coach',say:'Two fractions equal each other? Cross-multiply. It is a diagonal high-five.',board:'(t + 2)/3 = (t − 4)/5'},
 {who:'coach',say:'Five high-fives the left top. Three high-fives the right top. And the Captain keeps each top together with parentheses.',board:'5<span class="hl">(t + 2)</span> = 3<span class="hl">(t − 4)</span>'},
 {who:'nine',say:'Skip the parentheses. 5t plus 2 equals 3t minus 4. Faster.',board:'<span class="bad">5t + 2 = 3t − 4</span>',fx:'shake'},
 {who:'bar',say:'Treason. The 5 has to reach everyone on my team. Five t AND five times two.',board:'5t + 10 = 3t − 12'},
 {who:'coach',say:'Now it is a normal equation. Collect t: subtract 3t. Then subtract 10.',board:'2t = −22'},
 {who:'coach',say:'Divide by 2.',board:'t = <span class="hl">−11</span>'},
 {who:'bar',say:'Second mission. The bar in the middle of a bigger expression.',board:'2y = (12 − 6y)/3 + 4'},
 {who:'bar',say:'Order of operations with me: finish the top, finish the bottom, then divide. Or divide every term on top by the bottom. The whole top. Not just the 12.',board:'(12 − 6y)/3 = 12/3 − 6y/3'},
 {who:'coach',say:'Twelve over three is four. Six y over three is two y.',board:'2y = 4 − 2y + 4'},
 {who:'coach',say:'Add 2y to both sides. Four y equals eight.',board:'4y = 8 → y = <span class="hl">2</span>'},
 {who:'bar',say:'One team on top. One team on the bottom. When in doubt, draw the parentheses. Captain Bar, out.',board:'Bar = ( ) in disguise',fx:'hop'},
],
5:[
 {who:'coach',say:'Level 5. Compound inequalities. Two conditions, one sentence.',board:'48 &lt; sum &lt; 69'},
 {who:'coach',say:'Three consecutive integers. If the smallest is x, the next one is x plus 1, and the next is x plus 2.',board:'x, x + 1, x + 2'},
 {who:'coach',say:'Add them. Three x plus three.',board:'x + (x + 1) + (x + 2) = 3x + 3'},
 {who:'vera',say:'The sum is trapped. Bigger than 48, smaller than 69. Both at once. That is the word AND.',board:'48 &lt; 3x + 3 &lt; 69'},
 {who:'coach',say:'Here is the hook. It is a sandwich. Whatever you do to the middle, you do to both slices of bread.',board:'🍞 &nbsp;3x + 3&nbsp; 🍞'},
 {who:'nine',say:'Just subtract 3 from the middle. The bread does not care.',board:'48 &lt; <span class="bad">3x</span> &lt; 69',fx:'shake'},
 {who:'coach',say:'The bread cares. Three parts, three treatments. Subtract 3 from all three.',board:'45 &lt; 3x &lt; 66'},
 {who:'coach',say:'Divide all three parts by 3.',board:'15 &lt; x &lt; 22'},
 {who:'nine',say:'If you ever divide all three by me, both symbols flip. Both. I do not do half jobs.',board:'−9 flips both signs'},
 {who:'coach',say:'Now the graph. An open circle means the number fell through the hole: it is not a solution. Strict symbols get open circles.',board:'○ at 15 &nbsp; ○ at 22'},
 {who:'coach',say:'A closed circle means the hole is plugged: the number counts. Symbols with the floor, ≤ or ≥, get closed circles.',board:'● for ≤ and ≥'},
 {who:'coach',say:'Shade between the circles, because x is trapped between them.',board:'○━━━━━━━○'},
 {who:'vera',say:'And if the story wants integers: 16, 17, 18, 19, 20, 21. Not 15. Not 22. They fell through the holes.',board:'x ∈ {16, 17, 18, 19, 20, 21}',fx:'hop'},
 {who:'coach',say:'Sandwich rule. Three parts, three treatments. Open means fell through, closed means plugged.',board:'Three parts · three treatments'},
],
6:[
 {who:'checker',say:'The Checker here. I have one move and I love it. Plug it in. Plug it in.',board:'t = −11 ?'},
 {who:'checker',say:'Take the answer, put it back into the original equation, and see if both sides agree.',board:'(−11 + 2)/3 = (−11 − 4)/5'},
 {who:'checker',say:'Left side: negative nine over three is negative three. Right side: negative fifteen over five is negative three. They agree. Verified.',board:'−3 = −3 ✔',fx:'hop'},
 {who:'nine',say:'What if the answer was 11? Plug it in. Thirteen over three versus seven over five. Those are not friends.',board:'13/3 ≠ 7/5 ✘',fx:'shake'},
 {who:'checker',say:'That is why plugging in matters. The algebra can lie. The original equation never does.',board:'Original never lies'},
 {who:'checker',say:'Second check: the story. The algebra said x is greater than 6. The story sells whole jugs. So the answer is 7 or more, not 6.',board:'x &gt; 6 → at least 7 jugs'},
 {who:'checker',say:'Third skill: find the error in someone else’s work. Tests love this. Read line by line and ask: what changed, and was it legal?',board:'Line 1 → Line 2: what changed?'},
 {who:'coach',say:'Ben solved A equals one-half l p plus B and got p equals 2A minus B over l. Two things went wrong.',board:'p = 2A − B/l'},
 {who:'checker',say:'He cleared the one-half before subtracting B, so the 2 never reached B. Wrong order of undoing.',board:'should be 2(A − B)'},
 {who:'checker',say:'Then he divided only B by l, when the whole side needed dividing. The fraction bar should group everything.',board:'should be 2(A − B) / l'},
 {who:'coach',say:'Chris divided by 2 to undo the one-half. The opposite of multiplying by one-half is multiplying by 2.',board:'(A − B)/(2l) → <span class="bad">÷ 2</span>'},
 {who:'checker',say:'Explain an error like this: name the step, name what should have happened. “In step 2, the 2 should multiply both A and B.”',board:'Step + what should happen'},
 {who:'checker',say:'Plug it in. Check the story. Name the step. Three checks, and the boss cannot touch you.',board:'Plug · Story · Step',fx:'hop'},
],
};

/* ---- Scene player: captions + pre-rendered voice clips (voices/<id>.mp3) ---- */
let player=null;
function scenePlayer(host, frames, onEnd, lvl){
  let i=0, playing=false, timer=null, startedAt=0, left=0;
  const id=k=>`l${lvl}-${String(k+1).padStart(2,'0')}`;
  const DUR=k=>Math.max(3800, 1800+(frames[k].say.length*52), ((typeof VOICE_DUR!=='undefined'&&VOICE_DUR[id(k)])||0)*1000+700);
  const audio=new Audio(); audio.preload='auto';
  host.innerHTML=`<div class="stage" aria-live="off"><div class="board" id="sb"></div><div class="char" id="cL" style="left:6%"></div><div class="char" id="cR" style="right:6%"></div></div><div class="chat" id="chat" aria-live="polite"></div><div class="vbar"><button class="btn sm" id="pp">⏸ Pause</button><button class="btn sm alt" id="rp">↺ Replay</button><button class="btn sm alt" id="vo">${State.s.voice?'🔊 Voice on':'🔇 Voice off'}</button><div class="prog"><i id="pg" style="width:0%"></i></div><span class="muted num" id="fr"></span></div>`;
  const cL=$('#cL',host), cR=$('#cR',host), sb=$('#sb',host), chat=$('#chat',host); let shown=0;
  function addMsg(k){ const f=frames[k], c=CHARS[f.who]; const right=!(f.who==='coach'||f.who==='checker'||f.who==='bar'); chat.querySelectorAll('.msg.now').forEach(m=>m.classList.remove('now')); const m=document.createElement('div'); m.className='msg now'+(right?' r':''); m.innerHTML=`<div class="av" style="background:${c.bg};color:${c.fg}">${c.face}</div><div class="bub"><span class="nm">${c.nm}</span><span class="say">${f.say}</span>${f.board?`<div class="mth">${f.board}</div>`:''}</div>`; chat.appendChild(m); chat.scrollTop=chat.scrollHeight; }
  function setChar(el,who,talk){ const c=CHARS[who]; el.innerHTML=`<div class="face" style="background:${c.bg};color:${c.fg}">${c.face}</div><span class="nm">${c.nm}</span>`; el.classList.toggle('talk',!!talk); }
  function speak(k){ try{ audio.pause(); if(!State.s.voice) return; audio.src='voices/'+id(k)+'.mp3'; audio.currentTime=0; audio.play().catch(()=>{}); }catch(e){} }
  function show(){
    const f=frames[i]; const side = (f.who==='coach'||f.who==='checker'||f.who==='bar')?'L':'R';
    setChar(side==='L'?cL:cR, f.who, true); const other=side==='L'?cR:cL; if(!other.innerHTML) setChar(other, side==='L'?'vera':'coach', false); else other.classList.remove('talk');
    sb.innerHTML=f.board; sb.classList.remove('shake'); if(f.fx==='shake'){ void sb.offsetWidth; sb.classList.add('shake'); }
    const me=side==='L'?cL:cR; me.classList.remove('flip'); if(f.fx==='flip'||f.fx==='hop'){ void me.offsetWidth; me.classList.add('flip'); }
    if(i<shown){ chat.innerHTML=''; shown=0; } while(shown<=i){ addMsg(shown); shown++; } $('.stage',host).classList.toggle('mini',shown>=2); $('#fr',host).textContent=`${i+1}/${frames.length}`; $('#pg',host).style.width=Math.round(100*(i+1)/frames.length)+'%';
    speak(i);
  }
  function schedule(ms){ clearTimeout(timer); startedAt=Date.now(); left=ms; timer=setTimeout(()=>{ if(i<frames.length-1){ i++; show(); schedule(DUR(i)); } else { playing=false; $('#pp',host).textContent='▶ Play'; onEnd&&onEnd(); } }, ms); }
  function play(){ playing=true; $('#pp',host).textContent='⏸ Pause'; if(left>0&&left<DUR(i)){ schedule(left); if(State.s.voice) audio.play().catch(()=>{}); } else { show(); schedule(DUR(i)); } }
  function pause(){ playing=false; clearTimeout(timer); left=Math.max(0,left-(Date.now()-startedAt)); $('#pp',host).textContent='▶ Play'; try{ audio.pause(); }catch(e){} }
  $('#pp',host).onclick=()=>playing?pause():play();
  $('#rp',host).onclick=()=>{ pause(); i=0; left=0; play(); };
  $('#vo',host).onclick=()=>{ State.s.voice=!State.s.voice; State.save(); $('#vo',host).textContent=State.s.voice?'🔊 Voice on':'🔇 Voice off'; if(State.s.voice){ if(playing) speak(i); } else audio.pause(); };
  const stop=()=>{ pause(); audio.src=''; };
  play(); return {stop};
}

/* ---- Explainers ---- */
const EXPLAINERS={
1(host,done){
  const words=[['at most','≤'],['no more than','≤'],['a budget of','≤'],['less than','<'],['under','<'],['fewer than','<'],['at least','≥'],['a minimum of','≥'],['no less than','≥'],['more than','>'],['over','>'],['exceeds','>']];
  const order=[3,7,0,10,5,2,8,1,11,4,6,9]; let sel=null, placed={}, correct=0;
  host.innerHTML=`<p class="eyebrow">Interactive: magic-word sorter</p><h3>Tap a word, then tap the symbol it means.</h3><p class="muted" style="margin-bottom:10px">Rhyme: <b>at most, no more: the line goes under the door.</b> Words with a built-in “equal” get the floor (≤ or ≥).</p><div class="chips" id="pool">${order.map(i=>`<button type="button" class="kw" data-i="${i}">${words[i][0]}</button>`).join('')}</div><div class="grid" style="margin-top:12px;grid-template-columns:repeat(2,1fr)" id="bk">${['≤','<','≥','>'].map(s=>`<div class="bucket" data-s="${s}"><h3>${s} <span class="muted" style="font-size:.75rem;font-family:var(--body)">${{'≤':'at most / floor','<':'strictly less','≥':'at least / floor','>':'strictly more'}[s]}</span></h3></div>`).join('')}</div><p id="msg" class="muted" style="margin-top:8px">0 of 12 sorted.</p>`;
  host.querySelectorAll('.kw').forEach(k=>k.onclick=()=>{ if(k.classList.contains('good')) return; host.querySelectorAll('.kw').forEach(x=>x.classList.remove('sel')); k.classList.add('sel'); sel=k; host.querySelectorAll('.bucket').forEach(b=>b.classList.add('hot')); });
  host.querySelectorAll('.bucket').forEach(b=>b.onclick=()=>{ if(!sel) return; const i=+sel.dataset.i; if(words[i][1]===b.dataset.s){ b.appendChild(sel); sel.classList.remove('sel','badk'); sel.classList.add('good'); correct++; ding(); $('#msg',host).textContent=`${correct} of 12 sorted.`; if(correct===12){ $('#msg',host).innerHTML='<b>All sorted. Checkpoint cleared.</b> Next: the video.'; done(); } } else { thud(); sel.classList.add('badk'); $('#msg',host).innerHTML=`<b>“${words[i][0]}”</b> is not ${b.dataset.s}. Does the phrase let the number be <i>equal</i>? Then it needs a floor.`; setTimeout(()=>sel&&sel.classList.remove('badk'),700); } host.querySelectorAll('.bucket').forEach(x=>x.classList.remove('hot')); sel=null; });
},
2(host,done){
  const seen={lo:false,eq:false,hi:false};
  host.innerHTML=`<p class="eyebrow">Interactive: two plans crossing</p><h3>Slide the number of jugs. Watch which bill is smaller.</h3><p class="muted">ClearSpring: $18 + $6.50 per jug. PureWater: $12 + $7.50 per jug.</p><input type="range" class="range" id="jx" min="0" max="12" value="2" aria-label="jugs"><div class="scale" id="sc"></div><p id="jmsg" style="margin-top:8px"></p><div class="block soft" style="margin-top:12px"><b>Algebra answer:</b> <span class="eq">x &gt; 6</span> &nbsp; <b>Real-world answer:</b> <span class="eq" id="rw">?</span><p class="muted" style="font-size:.9rem;margin-top:4px">Visit a tie, a PureWater win, and a ClearSpring win to clear this checkpoint.</p></div>`;
  const upd=()=>{ const x=+$('#jx',host).value; const a=18+6.5*x, b=12+7.5*x; const who=a<b?'cs':a>b?'pw':'tie'; seen[who==='cs'?'hi':who==='pw'?'lo':'eq']=true;
    $('#sc',host).innerHTML=`<div class="pan ${who==='cs'?'':''}" style="border-color:${who==='cs'?'var(--ok)':'var(--ink)'}"><span class="eyebrow">ClearSpring</span><span class="num">$${a.toFixed(2)}</span><div class="bar" style="width:100%"><i style="width:${Math.min(100,a/1.2)}%;background:var(--l1)"></i></div></div><div style="font-family:var(--disp)">${who==='cs'?'&lt;':who==='pw'?'&gt;':'='}</div><div class="pan" style="border-color:${who==='pw'?'var(--ok)':'var(--ink)'}"><span class="eyebrow">PureWater</span><span class="num">$${b.toFixed(2)}</span><div class="bar" style="width:100%"><i style="width:${Math.min(100,b/1.2)}%;background:var(--l5)"></i></div></div>`;
    $('#jmsg',host).innerHTML=`At <b class="num">${x}</b> jug${x===1?'':'s'}: ${who==='tie'?'<b>a tie.</b> Exactly 6 jugs costs the same either way, so 6 is <i>not</i> a win for ClearSpring.':who==='cs'?'<b>ClearSpring is cheaper.</b>':'<b>PureWater is cheaper.</b>'}`;
    $('#rw',host).textContent = (seen.hi&&seen.eq)?'at least 7 jugs':'?';
    if(seen.lo&&seen.eq&&seen.hi){ done(); } };
  $('#jx',host).addEventListener('input',upd); upd();
},
3(host,done){
  // balance-scale stepper for 3y + k = 8y - ky
  let step=0; const states=[{L:'3y + k',R:'8y − ky'},{L:'k',R:'5y − ky'},{L:'k',R:'y(5 − k)'},{L:'k / (5 − k)',R:'y'}];
  const moves=[
    [{t:'− 3y from both sides',ok:true,say:'Collect. Every y term is now on the right.'},{t:'÷ 8 both sides',ok:false,say:'8 is only attached to one of three y terms. Collect first.'},{t:'− k from both sides',ok:false,say:'Legal, but it moves the wrong thing: we want y terms together, not k alone yet.'}],
    [{t:'factor y out: y(5 − k)',ok:true,say:'Factor. Now y appears exactly once.'},{t:'÷ 5 both sides',ok:false,say:'Dividing by 5 only hits one of the two y terms. The ky is still there.'},{t:'+ ky both sides',ok:false,say:'That sends a y term back to the left. We just collected them!'}],
    [{t:'÷ (5 − k) both sides',ok:true,say:'Divide by the whole group. Vera is alone.'},{t:'÷ 5 then ÷ k',ok:false,say:'5 − k is one glued group. You cannot peel it apart.'},{t:'− 5 both sides',ok:false,say:'5 is inside a product with y, not added on. Subtracting does not undo multiplying.'}],
  ];
  const draw=(msg,bad)=>{ const s=states[step]; host.innerHTML=`<p class="eyebrow">Interactive: the balance scale</p><h3>Keep both pans equal. Pick the move that isolates y.</h3><p class="muted">Chant: <b>Collect · Factor · Divide.</b> Wrong moves just tilt the scale. No penalty.</p><div class="scale" style="margin:12px 0"><div class="pan ${bad?'tilt':''}">${s.L}</div><div style="font-family:var(--disp)">=</div><div class="pan ${bad?'tilt':''}">${s.R}</div></div>${step<3?`<div class="chips">${moves[step].map((m,i)=>`<button type="button" class="chip" data-i="${i}">${m.t}</button>`).join('')}</div>`:'<div class="fb ok"><b>y = k / (5 − k).</b> Alone on one side. Checkpoint cleared.</div>'}<p id="m3" style="margin-top:10px;min-height:1.5em">${msg||''}</p>`;
    host.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{ const m=moves[step][+c.dataset.i]; if(m.ok){ step++; ding(); draw('<b style="color:var(--ok)">'+m.say+'</b>'); if(step===3) done(); } else { thud(); draw('<b style="color:var(--bad)">Tilt!</b> '+m.say,true); } }); };
  draw();
},
4(host,done){
  let hug=false, crossed=false, part2=false;
  const draw=()=>{ host.innerHTML=`<p class="eyebrow">Interactive: the bar is a grouping symbol</p><h3>Tap the fraction to see what Captain Bar is holding.</h3><div style="font-size:1.4rem;margin:12px 0;font-weight:900" id="f1"><span class="fracbar ${hug?'hug':''}" id="fa" role="button" tabindex="0"><span class="top">${hug?'(t + 2)':'t + 2'}</span><span>3</span></span> = <span class="fracbar ${hug?'hug':''}" id="fb" role="button" tabindex="0"><span class="top">${hug?'(t − 4)':'t − 4'}</span><span>5</span></span></div><p class="muted" id="m4">${hug?'Each top is one glued group. Now cross-multiply: 5 high-fives the left top, 3 high-fives the right top.':'Right now the tops look loose. Tap a fraction.'}</p><div class="row" style="margin-top:8px">${hug&&!crossed?'<button class="btn sm" id="cross">Cross-multiply</button>':''}${crossed?'<div class="fb ok" style="width:100%"><b>5(t + 2) = 3(t − 4)</b>. Distribute: 5t + 10 = 3t − 12 → t = −11.</div>':''}</div>
   ${crossed?`<h3 style="margin-top:18px">Mission 2: divide the whole top.</h3><div style="font-size:1.3rem;margin:10px 0;font-weight:900">2y = <span class="fracbar hug"><span class="top">(12 − 6y)</span><span>3</span></span> + 4</div><div class="chips"><button type="button" class="chip" data-k="bad">Divide only the 12 by 3 → 4 − 6y</button><button type="button" class="chip" data-k="good">Divide both terms by 3 → 4 − 2y</button></div><p id="m5" style="margin-top:8px;min-height:1.5em">${part2?'<b style="color:var(--ok)">2y = 4 − 2y + 4 → 4y = 8 → y = 2. Checkpoint cleared.</b>':''}</p>`:''}`;
    const tog=()=>{ hug=!hug; draw(); }; ['#fa','#fb'].forEach(s=>{ const e=$(s,host); e.onclick=tog; e.onkeydown=ev=>{ if(ev.key==='Enter'||ev.key===' ') tog(); }; });
    const cb=$('#cross',host); if(cb) cb.onclick=()=>{ crossed=true; ding(); draw(); };
    host.querySelectorAll('[data-k]').forEach(c=>c.onclick=()=>{ if(c.dataset.k==='good'){ part2=true; ding(); draw(); done(); } else { thud(); $('#m5',host).innerHTML='<b style="color:var(--bad)">Captain Bar objects.</b> The bar is under 12 <i>and</i> 6y. Both get divided.'; } }); };
  draw();
},
5(host,done){
  let step=0; const states=['48 &lt; 3x + 3 &lt; 69','45 &lt; 3x &lt; 66','15 &lt; x &lt; 22']; const moves=[[{t:'− 3 from the middle only',ok:false,say:'The bread cares! Three parts, three treatments.'},{t:'− 3 from all three parts',ok:true,say:'All three parts. 45 < 3x < 66.'}],[{t:'÷ 3 all three parts',ok:true,say:'15 < x < 22. Now graph it.'},{t:'÷ 3 the middle only',ok:false,say:'Same rule: whatever the middle gets, the ends get.'}]];
  let nl=null, graphed=false;
  const draw=(msg,bad)=>{ host.innerHTML=`<p class="eyebrow">Interactive: the sandwich rule, then the number line</p><h3>Solve all three parts at once.</h3><div class="scale" style="grid-template-columns:1fr;margin:10px 0"><div class="pan ${bad?'tilt':''}" style="font-size:1.4rem">${states[step]}</div></div>${step<2?`<div class="chips">${moves[step].map((m,i)=>`<button type="button" class="chip" data-i="${i}">${m.t}</button>`).join('')}</div>`:''}<p id="m6" style="margin-top:8px;min-height:1.5em">${msg||''}</p>${step===2?`<h3 style="margin-top:10px">Now graph 15 &lt; x &lt; 22.</h3><p class="muted">Open circle = the number fell through (strict). Closed = plugged (≤, ≥).</p><div class="nl" id="nl5"></div><div class="row" style="margin-top:8px"><button class="btn sm" id="chk5">Check my graph</button></div><p id="m7" style="margin-top:6px;min-height:1.5em"></p>`:''}`;
    host.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{ const m=moves[step][+c.dataset.i]; if(m.ok){ step++; ding(); draw('<b style="color:var(--ok)">'+m.say+'</b>'); } else { thud(); draw('<b style="color:var(--bad)">Nope.</b> '+m.say,true); } });
    if(step===2){ nl=numberLine($('#nl5',host),10,27,null); $('#chk5',host).onclick=()=>{ const s=nl.get(); if(s.lo===15&&s.hi===22&&s.loOpen&&s.hiOpen){ ding(); $('#m7',host).innerHTML='<b style="color:var(--ok)">Open at 15, open at 22, shaded between. Checkpoint cleared.</b>'; if(!graphed){ graphed=true; done(); } } else { thud(); $('#m7',host).innerHTML='<b style="color:var(--bad)">Not yet.</b> '+(s.lo!==15||s.hi!==22?'Endpoints come from 15 < x < 22.':'Strict symbols: both circles should be open.'); } }; } };
  draw();
},
6(host,done){
  let plugged=false, found=false; const lines=['2y = (12 − 6y)/3 + 4','2y = 4 − 6y + 4','8y = 8','y = 1']; const wrong=1;
  const EXPL=[{id:'ex1',q:'Solving <span class="eq">2y = (12 − 6y)/3 + 4</span>, a student wrote <span class="eq">2y = 4 − 6y + 4</span> as the next line. Explain what went wrong.',rubric:'Only the 12 was divided by 3. The fraction bar groups the whole top, so 6y must be divided by 3 as well, giving 4 − 2y.',keys:[/6y/,/too|also|both|whole|group|bar|each|as well|divid|2y/i]},
   {id:'ex2',q:'Solving <span class="eq">P = 2l + 2w</span> for w, a student wrote <span class="eq">w = P − 2l/2</span>. Explain what went wrong.',rubric:'Only 2l was divided by 2. After subtracting 2l, the whole side (P − 2l) has to be divided by 2, so w = (P − 2l)/2. Parentheses would have prevented it.',keys:[/both|whole|entire|all|group|parenth|p ?[-−] ?2l|everything/i]}];
  const draw=()=>{ host.innerHTML=`<p class="eyebrow">Interactive: plug it in, then spot the error</p><h3>Two answers for (t + 2)/3 = (t − 4)/5. Plug each one in.</h3><div class="chips"><button type="button" class="chip" data-t="11">Plug in t = 11</button><button type="button" class="chip" data-t="-11">Plug in t = −11</button></div><p id="m8" style="margin-top:8px;min-height:1.5em"></p>
   <h3 style="margin-top:16px">Spot the error. Tap the first line that breaks a rule.</h3><div class="opts">${lines.map((l,i)=>`<button type="button" class="opt" data-i="${i}">${i+1}. &nbsp;<span class="eq">${l}</span></button>`).join('')}</div><p id="m9" style="margin-top:8px;min-height:1.5em">${found?'<b style="color:var(--ok)">Line 2: only the 12 was divided by 3. The bar groups the whole top, so 6y ÷ 3 = 2y too. Checkpoint cleared.</b>':''}</p>
   <h3 style="margin-top:18px">Bonus: explain it in words.</h3><p class="muted" style="font-size:.9rem">The test asks you to explain someone else's error. Name the step, then say what should have happened. ${State.sample?'The coach reads your explanation.':'You get a model answer to compare with.'} 10 coins each.</p>
   ${EXPL.map(x=>{ const st6=State.s.learn.l6||{}; return `<div class="item" data-ex="${x.id}" style="margin-top:10px"><div>${x.q}</div><textarea class="expl" placeholder="In step ..., the student ... It should have been ..."></textarea><div class="row"><button type="button" class="btn sm chk">Check my explanation</button>${st6[x.id]?'<span class="ck" style="color:var(--ok);font-weight:900">✔ earned</span>':''}</div><div class="fbwrap"></div></div>`; }).join('')}`;
    host.querySelectorAll('[data-ex]').forEach(box=>{ const x=EXPL.find(e=>e.id===box.dataset.ex); $('.chk',box).onclick=async()=>{ const t=$('.expl',box).value.trim(); if(t.length<12){ showFB(box,'info','Write at least a sentence: which step, and what should have happened?'); return; }
      const st6=State.s.learn.l6||(State.s.learn.l6={}); let ok=false, msg='';
      if(State.sample){ showFB(box,'info','Coach is reading…'); try{ const r=await State.sample.json(`A student (age 11, Algebra 1) was asked to explain an error. Correct explanation: "${x.rubric}" Student wrote: "${t}". Return ONLY JSON {"score":0|1|2,"feedback":"..."} where 2 = names the step and what should have happened, 1 = names one of those, 0 = neither. Feedback: 1-2 sentences, no first person, as a question the student can act on if score < 2.`,{modelTier:'quick',cache:false}); ok=(r&&r.score>=1); msg=esc(String(r&&r.feedback||'')); }catch(e){ msg=''; } }
      if(!State.sample||!msg){ ok = x.keys.every(k=>k.test(t)); msg = ok?'You named the right piece. Compare with the model answer below.':'Does your explanation say <i>which term</i> was handled wrong, and what the whole step should look like? Compare with the model answer.'; }
      showFB(box, ok?'ok':'warn', `${msg}<div class="fb info" style="margin-top:8px"><span class="who">Model answer</span>${x.rubric}</div>`);
      if(ok&&!st6[x.id]){ st6[x.id]=Date.now(); State.addCoins(10,'explained it'); State.checkpoint(); const r=$('.row',box); r.insertAdjacentHTML('beforeend','<span class="ck" style="color:var(--ok);font-weight:900">✔ earned</span>'); } State.save(); }; });
    host.querySelectorAll('[data-t]').forEach(c=>c.onclick=()=>{ const t=+c.dataset.t; const L=(t+2)/3, R=(t-4)/5; const ok=Math.abs(L-R)<1e-9; $('#m8',host).innerHTML=`t = ${t}: left = (${t} + 2)/3 = <b class="num">${M.fmt(L)}</b>, right = (${t} − 4)/5 = <b class="num">${M.fmt(R)}</b>. ${ok?'<b style="color:var(--ok)">They agree. Verified.</b>':'<b style="color:var(--bad)">They disagree. Not a solution.</b>'}`; if(ok) ding(); else thud(); plugged=plugged||ok; if(plugged&&found) done(); });
    host.querySelectorAll('.opt').forEach(o=>o.onclick=()=>{ if(+o.dataset.i===wrong){ found=true; ding(); draw(); if(plugged) done(); } else { thud(); $('#m9',host).innerHTML=`<b style="color:var(--bad)">Line ${+o.dataset.i+1} is fine.</b> Compare it to the line before it: what changed, and was it legal?`; } }); };
  draw();
},
};

/* ---- Mini-boss questions ---- */
const MINI={
1:[{kind:'rel',prompt:'A climbing gym charges <b>$25</b> to get in plus <b>$8 per hour</b>. You have <b>$65</b>. Let <i>h</i> = hours. Write the inequality.',answer:'25+8h<=65',placeholder:'e.g. 25 + 8h ≤ 65',hint:'Build the whole bill first (entry + rate × h). “You have $65” is a ceiling with a floor line: ≤.'},
   {kind:'choice',prompt:'“A team needs <b>at least 12</b> players.” Which inequality?',options:['p < 12','p ≤ 12','p ≥ 12','p > 12'],correct:[2],hint:'“At least” lets 12 itself count. That means a floor line, pointing the right way.'},
   {kind:'rel',prompt:'Plan A costs <b>$10 + $3 per song</b>. Plan B costs <b>$4 + $5 per song</b>. When is Plan A cheaper? (x = songs)',answer:'10+3x<4+5x',placeholder:'e.g. 10 + 3x < …',hint:'Each plan is a whole bill. Put Plan A on the small side with a strict symbol.'}],
2:[{kind:'rel',solved:'h',prompt:'Solve <span class="eq">25 + 8h ≤ 65</span> for <i>h</i>.',answer:'h<=5',placeholder:'h ≤ …',hint:'Subtract 25 from both sides, then divide by 8. No negatives, so no flip.'},
   {kind:'num',prompt:'Cookies cost <b>$2 each</b> and you have <b>$9</b>. What is the most cookies you can buy?',answer:'4',placeholder:'cookies',hint:'The algebra says 4.5. Can you buy half a cookie at this store?'},
   {kind:'rel',solved:'x',prompt:'Solve <span class="eq">10 + 3x &lt; 4 + 5x</span> for <i>x</i>.',answer:'x>3',placeholder:'x > …',hint:'Subtract 3x (not 5x) so x stays positive and Negative Nine stays home. Then subtract 4.'}],
3:[{kind:'expr',var:'a',prompt:'Solve <span class="eq">2a + m = 6a − ma</span> for <i>a</i>.',answer:'m/(4-m)',placeholder:'a = …',hint:'Collect, factor, divide. All a terms to one side: m = 4a − ma. Factor a. Divide by the group.'},
   {kind:'expr',var:'f',prompt:'Solve <span class="eq">C = 5(F − 32) / 9</span> for <i>F</i>.',answer:'9c/5+32',placeholder:'F = …',hint:'Reverse order: ×9, then ÷5, then +32.'},
   {kind:'expr',var:'h',prompt:'Solve <span class="eq">A = ½bh</span> for <i>h</i>.',answer:'2a/b',placeholder:'h = …',hint:'What undoes multiplying by one-half? Then what undoes multiplying by b?'}],
4:[{kind:'num',prompt:'Solve <span class="eq">(t + 1) / 2 = (t − 3) / 4</span> for <i>t</i>.',answer:'-5',placeholder:'t = …',hint:'Cross-multiply with parentheses: 4(t + 1) = 2(t − 3). Distribute to both terms.'},
   {kind:'num',prompt:'Solve <span class="eq">3y = (24 − 6y) / 3 + 2</span> for <i>y</i>.',answer:'2',placeholder:'y = …',hint:'Divide both terms on top by 3: 8 − 2y. Then collect y.'},
   {kind:'choice',prompt:'Which is equal to <span class="eq">(12 − 6y) / 3</span>?',options:['4 − 6y','4 − 2y','12 − 2y','(12 − 6y) − 3'],correct:[1],hint:'The bar is under both terms. Divide each one by 3.'}],
5:[{kind:'rel',solved:'x',prompt:'Solve <span class="eq">10 &lt; 2x + 4 &lt; 20</span> for <i>x</i>.',answer:'3<x<8',placeholder:'__ < x < __',hint:'Subtract 4 from all three parts, then divide all three by 2.'},
   {kind:'triples',want:[10,11,12],prompt:'Three consecutive integers have a sum greater than 30 and less than 42. List every possible set.',placeholder:'a,b,c; d,e,f; …',hint:'30 < 3x + 3 < 42 → 9 < x < 13. Which integers fell through the holes?'},
   {kind:'numberline',nl:{min:0,max:12,lo:3,hi:8,loOpen:true,hiOpen:false},prompt:'Graph <span class="eq">3 &lt; x ≤ 8</span>. Drag the circles; tap to switch open/closed.',hint:'One symbol is strict and one has a floor. Open for strict, closed for the floor.'}],
6:[{kind:'choice',prompt:'A student solved <span class="eq">(t + 2)/3 = (t − 4)/5</span> and got <b>t = 11</b>. Plug it in: left side = 13/3, right side = 7/5. Is the answer right?',options:['Yes, 11 works','No, the sides disagree'],correct:[1],hint:'Do 13/3 and 7/5 equal each other? If not, the original equation has spoken.'},
   {kind:'choice',prompt:'Here is someone’s work for <span class="eq">P = 2l + 2w</span>, solving for w: (1) P − 2l = 2w &nbsp; (2) w = P − 2l/2 &nbsp; (3) w = P − l. Which line has the first error?',options:['Line 1','Line 2','Line 3'],correct:[1],hint:'From line 1 to line 2, what was divided by 2? All of it, or one piece?'},
   {kind:'num',prompt:'Check: a rectangle has perimeter <b>100 in</b> and length <b>30 in</b>. What width makes <span class="eq">2l + 2w = 100</span> true?',answer:'20',placeholder:'inches',hint:'Plug in l = 30: 60 + 2w = 100. Then verify your w by rebuilding 100.'}],
};
const LEVEL_DEFS=LEVELS.map(L=>({n:L.n, boss:MINI[L.n]}));

/* ---- Views ---- */
let levelTab='explainer', lastLevel=null;
VIEWS.learn=(app)=>{
  app.innerHTML=h`<div class="stack"><div class="block"><p class="eyebrow">Learn</p><h1>Six levels. Clear the checkpoints.</h1><p style="margin-top:6px">Each level is an obby, an obstacle course with checkpoints: an interactive, a short video, and a mini-boss. Checkpoints earn coins. Clear all of a level for its badge.</p></div>
  <div class="grid">${LEVELS.map(L=>{ const p=levelProgress(L.n); return `<button class="portal" style="--pc:${L.color}" data-go="level" data-arg="${L.n}"><div class="band"></div><span class="lvl">LEVEL ${L.n}</span><h3>${esc(L.title)}</h3><p class="muted" style="font-size:.9rem">${esc(L.blurb)}</p><div class="prog"><i style="width:${Math.round(100*p.done/p.total)}%"></i></div><span class="muted" style="font-size:.8rem">${p.done}/${p.total} checkpoints</span>${p.done===p.total?'<span class="done">CLEAR</span>':''}</button>`; }).join('')}</div>
  <div class="block soft"><div class="row" style="justify-content:space-between"><div><b>Want a fresh run?</b><p class="muted" style="font-size:.9rem">Resets every Learn checkpoint and level badge so the obbies start over. Coins, Check My Answers, and Final Boss history stay.</p></div><button class="btn alt sm" id="resetLearn">Start the lessons over</button></div></div></div>`;
  $('#resetLearn').onclick=()=>modal('<h2>Start the lessons over?</h2><p class="muted">All six levels go back to the first checkpoint. Level badges are removed. Coins and test history are kept.</p>',[{label:'Keep my progress',cls:'alt'},{label:'Reset lessons',fn:()=>{ State.s.learn={}; ['l1','l2','l3','l4','l5','l6','nine'].forEach(b=>delete State.s.badges[b]); State.save(); toast('Lessons reset. Back to the spawn point.'); render(); }}]);
};
VIEWS.level=(app,n)=>{
  n=+n||1; if(n!==lastLevel){ levelTab='explainer'; lastLevel=n; } const L=LEVELS[n-1]; const D=LEVEL_DEFS[n-1]; const st=State.s.learn['l'+n]||(State.s.learn['l'+n]={});
  if(player){ player.stop(); player=null; }
  const cps=['Explainer','Video',...D.boss.map((_,i)=>'Boss '+(i+1))]; const keys=['explainer','video',...D.boss.map((_,i)=>'q'+(i+1))]; let cleared=0; for(const k of keys){ if(st[k]) cleared++; else break; }
  const tabs=[['explainer','1 · Interactive'],['video','2 · Video'],['boss','3 · Mini-boss']];
  app.innerHTML=h`<div class="stack">
   <div class="block" style="border-color:${L.color}"><div class="row" style="justify-content:space-between"><div><p class="eyebrow" style="color:${L.color}">Level ${n} of 6</p><h1>${esc(L.title)}</h1><p class="muted">${esc(L.blurb)}</p></div><div class="row">${n>1?`<button class="btn alt sm" data-go="level" data-arg="${n-1}">← L${n-1}</button>`:''}${n<6?`<button class="btn alt sm" data-go="level" data-arg="${n+1}">L${n+1} →</button>`:''}</div></div>
    ${courseHTML(cps, keys.filter(k=>st[k]).length, L.color)}
    <div class="steps" style="margin-top:26px">${tabs.map(([k,l])=>`<button class="tab ${(k==='boss'?D.boss.every((_,i)=>st['q'+(i+1)]):st[k])?'done':''}" data-lt="${k}" aria-current="${levelTab===k?'page':'false'}">${l}</button>`).join('')}</div></div>
   <div class="block" id="lbody"></div></div>`;
  app.querySelectorAll('[data-lt]').forEach(b=>b.onclick=()=>{ levelTab=b.dataset.lt; render(); });
  const body=$('#lbody');
  const clear=(k,coins)=>{ if(st[k]) return; st[k]=Date.now(); State.addCoins(coins,'checkpoint'); State.checkpoint(); checkLevelBadge(n); const done=keys.filter(x=>st[x]).length; moveAvatar(app.querySelector('.course'), done, cps.length, L.color); setTimeout(render,1900); };
  if(levelTab==='explainer'){ EXPLAINERS[n](body,()=>clear('explainer',5)); if(st.explainer){ const d=document.createElement('p'); d.className='muted'; d.style.marginTop='10px'; d.textContent='Checkpoint already cleared. Play again anytime.'; body.appendChild(d); } }
  else if(levelTab==='video'){ body.innerHTML='<p class="eyebrow">Video</p>'; const hst=document.createElement('div'); body.appendChild(hst); player=scenePlayer(hst, SCENES[n], ()=>{ clear('video',5); }, n); }
  else {
    body.innerHTML=`<p class="eyebrow">Mini-boss</p><h3>${D.boss.length} questions. Wrong answers respawn you with a hint.</h3><div class="stack" id="mb" style="margin-top:10px"></div>`;
    D.boss.forEach((q,i)=>{ const key='q'+(i+1); const it={...q,id:'L'+n+'Q'+(i+1),learn:n}; const el=document.createElement('div'); el.className='item '+(st[key]?'ok':''); el.innerHTML=`<div class="tag">BOSS ${i+1} ${st[key]?'<span class="ck">✔ cleared</span>':''}</div><div>${q.prompt}</div>${answerUI(it,'m'+n)}<div class="row"><button type="button" class="btn sm check">Check</button></div><div class="fbwrap"></div>`; $('#mb').appendChild(el); wireAnswerUI(it,el);
      let misses=0; $('.check',el).onclick=()=>{ const raw=rawOf(it,el).trim(); if(!raw&&it.kind!=='numberline'){ showFB(el,'info','Type something first.'); return; } const extra=it.kind==='numberline'?el._nl.get():null; const g=gradeItem(it,raw,extra);
        if(g.ok){ el.classList.add('ok'); el.classList.remove('bad'); showFB(el,'ok',pickPraise({id:'L'+n+'Q'+i})); if(!st[key]){ st[key]=Date.now(); State.addCoins(misses?5:10,'mini-boss'); State.checkpoint(); if(misses) State.award('respawn'); checkLevelBadge(n); $('.tag',el).innerHTML=`BOSS ${i+1} <span class="ck">✔ cleared</span>`; } State.save(); }
        else { misses++; thud(); el.classList.add('bad'); showFB(el,'bad',`<span class="who">Respawn</span>${g.partial?g.partial+' ':''}${q.hint}${misses>=3?`<br><span class="muted">Three tries, no penalty. Rewatch this level's video for the move, then come back. The checkpoint stays open.</span>`:''}`); } }; });
  }
};
function checkLevelBadge(n){ const st=State.s.learn['l'+n]||{}; const D=LEVEL_DEFS[n-1]; if(st.explainer&&st.video&&D.boss.every((_,i)=>st['q'+(i+1)])){ State.award('l'+n); if(State.s.badges.l2&&State.s.badges.l5) State.award('nine'); } }
