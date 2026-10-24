/* ===== Math engine: parse, evaluate, compare ===== */
const M = (() => {
  const UNI = [[/≤/g,'<='],[/≥/g,'>='],[/[×·•]/g,'*'],[/÷/g,'/'],[/[−–—]/g,'-'],[/½/g,'(1/2)'],[/¼/g,'(1/4)'],[/¾/g,'(3/4)'],[/⅓/g,'(1/3)'],[/⅔/g,'(2/3)'],[/²/g,'^2'],[/³/g,'^3'],[/\$/g,''],[/\*\*/g,'^'],[/\[/g,'('],[/\]/g,')'],[/\{/g,'('],[/\}/g,')']];
  function clean(s){
    s = String(s||'').trim().toLowerCase();
    for (const [a,b] of UNI) s = s.replace(a,b);
    s = s.replace(/(\d),(\d{3})(?!\d)/g,'$1$2');   // 1,600 -> 1600
    s = s.replace(/=<|=</g,'<=').replace(/=>/g,'>=').replace(/==/g,'=');
    return s;
  }
  function tokenize(s){
    const t=[]; let i=0;
    while(i<s.length){
      const c=s[i];
      if(/\s/.test(c)){i++;continue;}
      if(/[0-9.]/.test(c)){ let j=i; while(j<s.length&&/[0-9.]/.test(s[j]))j++; t.push({k:'n',v:parseFloat(s.slice(i,j))}); i=j; continue; }
      if(/[a-z]/.test(c)){ t.push({k:'v',v:c}); i++; continue; }
      if(c==='<'||c==='>'){ if(s[i+1]==='='){t.push({k:'c',v:c+'='});i+=2;} else {t.push({k:'c',v:c});i++;} continue; }
      if(c==='='){ t.push({k:'c',v:'='}); i++; continue; }
      if('+-*/^()'.includes(c)){ t.push({k:'o',v:c}); i++; continue; }
      throw new Error('bad char '+c);
    }
    return t;
  }
  // AST: {t:'n',v} {t:'v',v} {t:'op',op,a,b} {t:'neg',a} {t:'rel',parts:[expr...],ops:[...]}
  function parse(str){
    const tok = tokenize(clean(str)); let p=0;
    const peek=()=>tok[p], next=()=>tok[p++];
    function startsAtom(tk){ return tk && (tk.k==='n'||tk.k==='v'||(tk.k==='o'&&tk.v==='(')); }
    function atom(){
      const tk=next(); if(!tk) throw new Error('unexpected end');
      if(tk.k==='n') return {t:'n',v:tk.v};
      if(tk.k==='v') return {t:'v',v:tk.v};
      if(tk.k==='o'&&tk.v==='('){ const e=expr(); const cl=next(); if(!cl||cl.v!==')') throw new Error('missing )'); return e; }
      throw new Error('unexpected '+tk.v);
    }
    function power(){ let a=atom(); if(peek()&&peek().k==='o'&&peek().v==='^'){ next(); const b=unary(); a={t:'op',op:'^',a,b}; } return a; }
    function unary(){ if(peek()&&peek().k==='o'&&(peek().v==='-'||peek().v==='+')){ const s=next().v; const a=unary(); return s==='-'?{t:'neg',a}:a; } return power(); }
    function term(){
      let a=unary();
      for(;;){
        const tk=peek();
        if(tk&&tk.k==='o'&&(tk.v==='*'||tk.v==='/')){ next(); const b=unary(); a={t:'op',op:tk.v,a,b}; }
        else if(startsAtom(tk)){ const b=unary(); a={t:'op',op:'*',a,b}; } // implicit multiplication
        else break;
      }
      return a;
    }
    function expr(){
      let a=term();
      for(;;){ const tk=peek(); if(tk&&tk.k==='o'&&(tk.v==='+'||tk.v==='-')){ next(); const b=term(); a={t:'op',op:tk.v,a,b}; } else break; }
      return a;
    }
    function rel(){
      const parts=[expr()], ops=[];
      while(peek()&&peek().k==='c'){ ops.push(next().v); parts.push(expr()); }
      if(p<tok.length) throw new Error('trailing');
      return ops.length? {t:'rel',parts,ops} : parts[0];
    }
    return rel();
  }
  function ev(n,env){
    switch(n.t){
      case 'n': return n.v;
      case 'v': if(!(n.v in env)) throw new Error('unbound '+n.v); return env[n.v];
      case 'neg': return -ev(n.a,env);
      case 'op': { const a=ev(n.a,env), b=ev(n.b,env);
        switch(n.op){case '+':return a+b;case '-':return a-b;case '*':return a*b;case '/':return a/b;case '^':return Math.pow(a,b);} }
    }
    throw new Error('eval');
  }
  function truth(rel,env){
    const vals=rel.parts.map(x=>ev(x,env));
    if(vals.some(v=>!isFinite(v))) return null;
    for(let i=0;i<rel.ops.length;i++){
      const a=vals[i], b=vals[i+1], o=rel.ops[i]; const eq=Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(a),Math.abs(b));
      const ok = o==='='?eq : o==='<'?(a<b&&!eq) : o==='>'?(a>b&&!eq) : o==='<='?(a<b||eq) : (a>b||eq);
      if(!ok) return false;
    }
    return true;
  }
  function vars(n,set=new Set()){ if(!n) return set; if(n.t==='v') set.add(n.v); if(n.t==='rel') n.parts.forEach(x=>vars(x,set)); if(n.a) vars(n.a,set); if(n.b) vars(n.b,set); return set; }
  function tryParse(s){ try{ return parse(s);}catch(e){ return null; } }
  // seeded sampler for determinism
  function rng(seed){ let a=seed>>>0; return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  function exprEquiv(A,B){
    const a=typeof A==='string'?tryParse(A):A, b=typeof B==='string'?tryParse(B):B;
    if(!a||!b||a.t==='rel'||b.t==='rel') return false;
    const vs=[...new Set([...vars(a),...vars(b)])]; const r=rng(1234); let good=0;
    for(let i=0;i<40&&good<10;i++){
      const env={}; vs.forEach(v=>{ env[v]=(r()*8-4); });
      let x,y; try{ x=ev(a,env); y=ev(b,env);}catch(e){return false;}
      if(!isFinite(x)||!isFinite(y)||Math.abs(x)>1e8||Math.abs(y)>1e8) continue;
      if(Math.abs(x-y)>1e-6*Math.max(1,Math.abs(x),Math.abs(y))) return false;
      good++;
    }
    return good>=6;
  }
  // grid for truth sets: quarter steps near the action plus wider sweep
  function grid(){ const g=[]; for(let x=-40;x<=130;x+=0.25) g.push(x); for(let x=150;x<=1200;x+=37) g.push(x); g.push(-500,-120,2000); return g; }
  function relEquiv(A,B){
    const a=typeof A==='string'?tryParse(A):A, b=typeof B==='string'?tryParse(B):B;
    if(!a||!b||a.t!=='rel'||b.t!=='rel') return false;
    const va=[...vars(a)], vb=[...vars(b)];
    if(va.length!==vb.length||va.some(v=>!vb.includes(v))) return false;
    if(va.length===0){ return truth(a,{})===truth(b,{}); }
    if(va.length===1){ const v=va[0]; let n=0; for(const x of grid()){ const ta=truth(a,{[v]:x}), tb=truth(b,{[v]:x}); if(ta===null||tb===null) continue; if(ta!==tb) return false; n++; } return n>50; }
    const r=rng(99); let n=0;
    for(let i=0;i<400;i++){ const env={}; va.forEach(v=>env[v]=Math.round((r()*60-20)*4)/4); const ta=truth(a,env), tb=truth(b,env); if(ta===null||tb===null) continue; if(ta!==tb) return false; n++; }
    return n>100;
  }
  // numeric answer: "4.5", "4 1/2", "4½ hours", "-11", "7 jugs", "$36"
  function toNumber(s){
    s=clean(s); if(s.includes('=')) s=s.slice(s.lastIndexOf('=')+1);
    s=s.replace(/\b(hours?|hrs?|h|in|inches|jugs?|units?|total|at least|about|approximately|is|x|t|y|w|p)\b/g,' ').replace(/[a-z]/g,' ').trim();
    let m=s.match(/^(-?)\s*(\d+)\s+(\d+)\s*\/\s*(\d+)$/); if(m){ const v=+m[2]+ +m[3]/+m[4]; return m[1]?-v:v; }
    m=s.match(/^(-?)\s*(\d+)\s*\(1\/2\)$/); if(m){ const v=+m[2]+0.5; return m[1]?-v:v; }
    const t=tryParse(s); if(!t||t.t==='rel') return null;
    try{ const v=ev(t,{}); return isFinite(v)?v:null; }catch(e){ return null; }
  }
  function numEq(a,b,tol=1e-6){ return a!==null&&b!==null&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)); }
  // solved-for check: returns {expr, status:'ok'|'not-solved'|'bad'}
  function solvedSide(str,v){
    const t=tryParse(str); if(!t) return {status:'bad'};
    if(t.t!=='rel') return vars(t).has(v)?{status:'not-solved',expr:t}:{status:'ok',expr:t};
    if(t.ops.length!==1||t.ops[0]!=='=') return {status:'bad'};
    const [L,R]=t.parts; const isBare=n=>n.t==='v'&&n.v===v;
    if(isBare(L)&&!vars(R).has(v)) return {status:'ok',expr:R};
    if(isBare(R)&&!vars(L).has(v)) return {status:'ok',expr:L};
    if(isBare(L)||isBare(R)) return {status:'circular',expr:isBare(L)?R:L};
    return {status:'not-solved',rel:t};
  }
  function integers(s){ return (String(s).match(/-?\d+/g)||[]).map(Number); }
  function hasOp(str,op){ const t=tryParse(str); return !!(t&&t.t==='rel'&&t.ops.includes(op)); }
  function fmt(n){ return Number.isInteger(n)?String(n):String(Math.round(n*1000)/1000); }
  return {clean,parse,tryParse,ev,truth,vars,exprEquiv,relEquiv,toNumber,numEq,solvedSide,integers,hasOp,fmt,rng};
})();
