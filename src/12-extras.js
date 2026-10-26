/* ===== Journal, Shop (avatar gear), Rematch Chest, read-aloud ===== */

/* ---- Avatar: parametric blocky figure. State.s.avatar = {skin, hat, face, back, pet} ---- */
const INK='#1d2733';
const SKINS={
  green:{nm:'Grass shirt',fill:'#2fb37a',deco:''},
  blue:{nm:'Ocean shirt',fill:'#3a7bd5',deco:`<path d="M8 29 q3 -3 6 0 t6 0 t6 0" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M8 32 q3 -3 6 0 t6 0 t6 0" fill="none" stroke="#cfe6ff" stroke-width="1.2"/>`},
  red:{nm:'Lava shirt',fill:'#d8383e',deco:`<polyline points="7,31 10,26 13,31 16,26 19,31 22,26 25,31" fill="none" stroke="#f5b800" stroke-width="1.8"/>`},
  purple:{nm:'Portal shirt',fill:'#7c4dff',deco:`<circle cx="17" cy="28" r="4.5" fill="none" stroke="#5bc236" stroke-width="1.8"/><circle cx="17" cy="28" r="1.6" fill="#5bc236"/>`},
  gold:{nm:'Gold star shirt',fill:'#f5b800',deco:`<polygon points="17,23 18.6,26.6 22.5,26.8 19.5,29.3 20.5,33 17,31 13.5,33 14.5,29.3 11.5,26.8 15.4,26.6" fill="#fff" stroke="${INK}" stroke-width="1"/>`},
  black:{nm:'Night shirt',fill:'#2b2f36',deco:`<circle cx="18" cy="28" r="3.5" fill="#fff"/><circle cx="19.5" cy="27" r="3" fill="#2b2f36"/><rect x="9" y="24" width="1.5" height="1.5" fill="#fff"/><rect x="24" y="31" width="1.5" height="1.5" fill="#fff"/>`},
  ref:{nm:'Referee shirt',fill:'#fff',deco:`<rect x="8" y="21" width="3" height="14" fill="${INK}"/><rect x="15.5" y="21" width="3" height="14" fill="${INK}"/><rect x="23" y="21" width="3" height="14" fill="${INK}"/>`},
  camo:{nm:'Pixel camo shirt',fill:'#5bc236',deco:`<rect x="6" y="22" width="4" height="4" fill="#2f7a2a"/><rect x="14" y="26" width="4" height="4" fill="#2f7a2a"/><rect x="22" y="22" width="4" height="4" fill="#2f7a2a"/><rect x="9" y="30" width="4" height="4" fill="#2f7a2a"/><rect x="20" y="30" width="5" height="4" fill="#8fe06a"/><rect x="10" y="26" width="3" height="3" fill="#8fe06a"/>`},
  storm:{nm:'Storm shirt',fill:'#3a3f6b',deco:`<polygon points="18,22 13,29 17,29 15,34 21,27 17,27 19,22" fill="#f5b800" stroke="${INK}" stroke-width=".8"/>`},
  plaid:{nm:'Lumber plaid shirt',fill:'#d8383e',deco:`<rect x="5" y="25" width="24" height="2" fill="${INK}" opacity=".7"/><rect x="5" y="30" width="24" height="2" fill="${INK}" opacity=".7"/><rect x="11" y="21" width="2" height="14" fill="${INK}" opacity=".7"/><rect x="21" y="21" width="2" height="14" fill="${INK}" opacity=".7"/>`},
  rainbow:{nm:'Rainbow shirt',fill:'#d8383e',deco:`<rect x="5" y="24.5" width="24" height="3.5" fill="#f5b800"/><rect x="5" y="28" width="24" height="3.5" fill="#2fb37a"/><rect x="5" y="31.5" width="24" height="3.5" fill="#3a7bd5"/>`},
  pirate:{nm:'Pirate shirt',fill:'#2b2f36',deco:`<circle cx="17" cy="27" r="3.5" fill="#fff"/><rect x="14.5" y="29" width="5" height="2.5" fill="#fff"/><rect x="15.3" y="26" width="1.4" height="1.6" fill="${INK}"/><rect x="17.5" y="26" width="1.4" height="1.6" fill="${INK}"/><rect x="12" y="32" width="10" height="1.2" fill="#fff" transform="rotate(25 17 32.6)"/><rect x="12" y="32" width="10" height="1.2" fill="#fff" transform="rotate(-25 17 32.6)"/>`},
  tux:{nm:'Tuxedo',fill:'#1d2733',deco:`<polygon points="13,21 21,21 17,31" fill="#fff"/><rect x="14" y="22" width="6" height="2.5" fill="#d8383e"/><rect x="16.2" y="21.8" width="1.6" height="3" fill="#8b1e22"/>`},
  hero:{nm:'Hero suit',fill:'#3a7bd5',deco:`<polygon points="17,22 23,25 17,33 11,25" fill="#f5b800" stroke="${INK}" stroke-width="1"/><rect x="15" y="25" width="4" height="4.5" fill="#d8383e"/>`},
  jersey:{nm:'Team jersey',fill:'#7c4dff',deco:`<rect x="5" y="21" width="24" height="3" fill="#f5b800"/><text x="17" y="33" font-size="9" font-weight="900" text-anchor="middle" fill="#fff" font-family="Nunito,sans-serif">11</text>`},
  lab:{nm:'Lab coat',fill:'#eef2f7',deco:`<rect x="16.5" y="21" width="1" height="14" fill="#b8c2cf"/><rect x="8" y="27" width="5" height="5" fill="none" stroke="#b8c2cf" stroke-width="1"/><rect x="9" y="25" width="1.5" height="4" fill="#3a7bd5"/>`},
};
const HATS={
  cap:`<rect x="5" y="0" width="24" height="5" fill="#d8383e" stroke="${INK}" stroke-width="2"/><rect x="24" y="3" width="9" height="3" fill="#d8383e" stroke="${INK}" stroke-width="1.5"/>`,
  crown:`<polygon points="7,4 11,-3 17,3 23,-3 27,4" fill="#f5b800" stroke="${INK}" stroke-width="2"/>`,
  wizard:`<polygon points="17,-10 6,5 28,5" fill="#7c4dff" stroke="${INK}" stroke-width="2"/><circle cx="17" cy="-9" r="2" fill="#f5b800"/>`,
  band:`<rect x="6" y="3" width="22" height="4" fill="#e23c7f" stroke="${INK}" stroke-width="1.5"/>`,
  helmet:`<rect x="5" y="-3" width="24" height="10" rx="2" fill="#9aa4b2" stroke="${INK}" stroke-width="2"/><rect x="9" y="4" width="16" height="2" fill="${INK}"/>`,
  halo:`<ellipse cx="17" cy="-5" rx="9" ry="2.5" fill="none" stroke="#f5b800" stroke-width="2.5"/>`,
  horns:`<polygon points="7,4 5,-6 12,2" fill="#d8383e" stroke="${INK}" stroke-width="1.5"/><polygon points="27,4 29,-6 22,2" fill="#d8383e" stroke="${INK}" stroke-width="1.5"/>`,
  beanie:`<rect x="5" y="-4" width="24" height="9" rx="4" fill="#3a7bd5" stroke="${INK}" stroke-width="2"/><circle cx="17" cy="-5" r="2.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`,
  tophat:`<rect x="8" y="-11" width="18" height="13" fill="#1d2733" stroke="${INK}" stroke-width="2"/><rect x="4" y="2" width="26" height="3" fill="#1d2733" stroke="${INK}" stroke-width="1.5"/><rect x="8" y="-2" width="18" height="2.5" fill="#d8383e"/>`,
  viking:`<rect x="6" y="-2" width="22" height="8" rx="3" fill="#9aa4b2" stroke="${INK}" stroke-width="2"/><polygon points="6,2 1,-7 9,-1" fill="#eef2f7" stroke="${INK}" stroke-width="1.5"/><polygon points="28,2 33,-7 25,-1" fill="#eef2f7" stroke="${INK}" stroke-width="1.5"/>`,
  chef:`<rect x="7" y="-1" width="20" height="6" fill="#fff" stroke="${INK}" stroke-width="2"/><ellipse cx="17" cy="-5" rx="12" ry="6" fill="#fff" stroke="${INK}" stroke-width="2"/>`,
  bucket:`<polygon points="6,6 8,-6 26,-6 28,6" fill="#f5b800" stroke="${INK}" stroke-width="2"/><rect x="6" y="4" width="22" height="3" fill="${INK}"/>`,
};
const FACES={
  glasses:`<rect x="10.5" y="9" width="6" height="5" rx="1" fill="none" stroke="${INK}" stroke-width="1.5"/><rect x="18.5" y="9" width="6" height="5" rx="1" fill="none" stroke="${INK}" stroke-width="1.5"/><rect x="16.5" y="11" width="2" height="1" fill="${INK}"/>`,
  shades:`<rect x="10" y="9" width="7" height="5" rx="1" fill="${INK}"/><rect x="18" y="9" width="7" height="5" rx="1" fill="${INK}"/><rect x="16" y="10.5" width="3" height="1" fill="${INK}"/>`,
  visor:`<rect x="8" y="8" width="19" height="7" rx="2" fill="#5ee0ff" opacity=".75" stroke="${INK}" stroke-width="1.5"/>`,
  patch:`<rect x="19" y="9" width="6" height="5" fill="${INK}"/><rect x="7" y="8" width="20" height="1.2" fill="${INK}" transform="rotate(-8 17 8)"/>`,
  mustache:`<path d="M11 15 q3 -2 6 0 q3 -2 6 0 q-3 3 -6 1 q-3 2 -6 -1z" fill="${INK}"/>`,
  facepaint:`<rect x="9" y="9" width="7" height="5" fill="#d8383e" opacity=".6"/><rect x="19" y="9" width="7" height="5" fill="#3a7bd5" opacity=".6"/>`,
};
const BACKS={
  cape:`<polygon points="5,21 29,21 32,44 2,44" fill="#d8383e" stroke="${INK}" stroke-width="2"/>`,
  wings:`<polygon points="5,22 -10,16 -6,30 5,30" fill="#eef2f7" stroke="${INK}" stroke-width="2"/><polygon points="29,22 44,16 40,30 29,30" fill="#eef2f7" stroke="${INK}" stroke-width="2"/>`,
  jetpack:`<rect x="-3" y="20" width="7" height="14" rx="2" fill="#9aa4b2" stroke="${INK}" stroke-width="2"/><rect x="30" y="20" width="7" height="14" rx="2" fill="#9aa4b2" stroke="${INK}" stroke-width="2"/><polygon points="-2,34 0.5,41 3,34" fill="#f5b800"/><polygon points="31,34 33.5,41 36,34" fill="#f5b800"/>`,
  shield:`<path d="M30 20 h10 v9 q0 6 -5 8 q-5 -2 -5 -8z" fill="#3a7bd5" stroke="${INK}" stroke-width="2"/><rect x="33.5" y="23" width="3" height="7" fill="#f5b800"/>`,
  sword:`<rect x="-6" y="14" width="3" height="22" fill="#9aa4b2" stroke="${INK}" stroke-width="1.5" transform="rotate(-20 -4.5 25)"/><rect x="-9" y="32" width="9" height="2.5" fill="#f5b800" stroke="${INK}" stroke-width="1" transform="rotate(-20 -4.5 33)"/>`,
  backpack:`<rect x="-2" y="20" width="8" height="12" rx="2" fill="#2fb37a" stroke="${INK}" stroke-width="2"/><rect x="0" y="23" width="4" height="3" fill="#1d2733" opacity=".4"/>`,
};
const PETS={
  slime:`<g transform="translate(34,30)"><rect x="0" y="4" width="12" height="10" fill="#5bc236" stroke="${INK}" stroke-width="2"/><rect x="3" y="7" width="2" height="2" fill="${INK}"/><rect x="7" y="7" width="2" height="2" fill="${INK}"/></g>`,
  cat:`<g transform="translate(34,28)"><polygon points="1,4 1,0 4,3" fill="#f0a35e" stroke="${INK}" stroke-width="1"/><polygon points="11,4 11,0 8,3" fill="#f0a35e" stroke="${INK}" stroke-width="1"/><rect x="0" y="3" width="12" height="13" fill="#f0a35e" stroke="${INK}" stroke-width="2"/><rect x="3" y="7" width="2" height="2" fill="${INK}"/><rect x="7" y="7" width="2" height="2" fill="${INK}"/></g>`,
  bee:`<g transform="translate(34,18)"><rect x="0" y="2" width="12" height="8" fill="#f5b800" stroke="${INK}" stroke-width="2"/><rect x="4" y="2" width="2" height="8" fill="${INK}"/><rect x="8" y="2" width="2" height="8" fill="${INK}"/><ellipse cx="6" cy="0" rx="5" ry="2" fill="#cfe6ff" stroke="${INK}" stroke-width="1"/></g>`,
  ghost:`<g transform="translate(34,22)"><path d="M0 6 Q0 0 6 0 Q12 0 12 6 V16 L9 13 L6 16 L3 13 L0 16 Z" fill="#eef2f7" stroke="${INK}" stroke-width="2"/><rect x="3" y="5" width="2" height="2" fill="${INK}"/><rect x="7" y="5" width="2" height="2" fill="${INK}"/></g>`,
  dragon:`<g transform="translate(33,24)"><polygon points="2,6 -4,0 4,2" fill="#2fb37a" stroke="${INK}" stroke-width="1.5"/><rect x="2" y="4" width="12" height="11" rx="2" fill="#2fb37a" stroke="${INK}" stroke-width="2"/><polygon points="14,8 20,6 20,10" fill="#f5b800"/><rect x="5" y="7" width="2" height="2" fill="${INK}"/><rect x="10" y="7" width="2" height="2" fill="${INK}"/><polygon points="4,4 6,0 8,4" fill="#d8383e"/><polygon points="9,4 11,0 13,4" fill="#d8383e"/></g>`,
  robot:`<g transform="translate(34,24)"><rect x="5" y="-4" width="2" height="4" fill="${INK}"/><circle cx="6" cy="-5" r="1.5" fill="#d8383e"/><rect x="0" y="0" width="12" height="11" fill="#9aa4b2" stroke="${INK}" stroke-width="2"/><rect x="2" y="3" width="3" height="3" fill="#5ee0ff"/><rect x="7" y="3" width="3" height="3" fill="#5ee0ff"/><rect x="3" y="8" width="6" height="1.5" fill="${INK}"/><rect x="2" y="11" width="3" height="4" fill="#9aa4b2" stroke="${INK}" stroke-width="1.5"/><rect x="7" y="11" width="3" height="4" fill="#9aa4b2" stroke="${INK}" stroke-width="1.5"/></g>`,
  owl:`<g transform="translate(34,24)"><rect x="0" y="1" width="12" height="14" rx="3" fill="#a06a3a" stroke="${INK}" stroke-width="2"/><circle cx="4" cy="6" r="2.5" fill="#fff"/><circle cx="8" cy="6" r="2.5" fill="#fff"/><circle cx="4" cy="6" r="1" fill="${INK}"/><circle cx="8" cy="6" r="1" fill="${INK}"/><polygon points="5,9 7,9 6,11" fill="#f5b800"/><polygon points="1,1 2,-2 4,1" fill="#a06a3a" stroke="${INK}" stroke-width="1"/><polygon points="8,1 10,-2 11,1" fill="#a06a3a" stroke="${INK}" stroke-width="1"/></g>`,
  dog:`<g transform="translate(34,26)"><rect x="0" y="2" width="12" height="12" rx="2" fill="#c98a4a" stroke="${INK}" stroke-width="2"/><rect x="-2" y="2" width="3" height="7" rx="1" fill="#8a5a2a" stroke="${INK}" stroke-width="1.5"/><rect x="11" y="2" width="3" height="7" rx="1" fill="#8a5a2a" stroke="${INK}" stroke-width="1.5"/><rect x="3" y="5" width="2" height="2" fill="${INK}"/><rect x="7" y="5" width="2" height="2" fill="${INK}"/><rect x="5" y="9" width="2.5" height="2" fill="${INK}"/><rect x="4" y="11.5" width="4" height="1.5" fill="#d8383e"/></g>`,
  fox:`<g transform="translate(34,26)"><polygon points="0,4 1,-2 5,3" fill="#e8742c" stroke="${INK}" stroke-width="1"/><polygon points="12,4 11,-2 7,3" fill="#e8742c" stroke="${INK}" stroke-width="1"/><rect x="0" y="3" width="12" height="12" rx="2" fill="#e8742c" stroke="${INK}" stroke-width="2"/><rect x="2" y="9" width="8" height="6" fill="#fff"/><rect x="3" y="6" width="2" height="2" fill="${INK}"/><rect x="7" y="6" width="2" height="2" fill="${INK}"/><rect x="5.3" y="10" width="1.5" height="1.5" fill="${INK}"/></g>`,
  penguin:`<g transform="translate(34,24)"><rect x="0" y="0" width="12" height="15" rx="4" fill="#1d2733" stroke="${INK}" stroke-width="2"/><rect x="3" y="5" width="6" height="9" rx="2" fill="#fff"/><rect x="3" y="3" width="2" height="2" fill="#fff"/><rect x="7" y="3" width="2" height="2" fill="#fff"/><polygon points="5,6 7,6 6,8" fill="#f5b800"/><rect x="2" y="15" width="3" height="1.5" fill="#f5b800"/><rect x="7" y="15" width="3" height="1.5" fill="#f5b800"/></g>`,
};
const SHOP=[
  {id:'skin:blue',cat:'Shirt',price:30},{id:'skin:red',cat:'Shirt',price:30},{id:'skin:purple',cat:'Shirt',price:40},{id:'skin:ref',cat:'Shirt',price:45},{id:'skin:camo',cat:'Shirt',price:50},{id:'skin:plaid',cat:'Shirt',price:50},{id:'skin:rainbow',cat:'Shirt',price:60},{id:'skin:black',cat:'Shirt',price:60},{id:'skin:storm',cat:'Shirt',price:70},{id:'skin:jersey',cat:'Shirt',price:70},{id:'skin:gold',cat:'Shirt',price:80},{id:'skin:pirate',cat:'Shirt',price:85},{id:'skin:lab',cat:'Shirt',price:90},{id:'skin:hero',cat:'Shirt',price:110},{id:'skin:tux',cat:'Shirt',price:120},
  {id:'hat:band',cat:'Hat',name:'Headband',price:25},{id:'hat:cap',cat:'Hat',name:'Cap',price:40},{id:'hat:beanie',cat:'Hat',name:'Beanie',price:45},{id:'hat:bucket',cat:'Hat',name:'Bucket hat',price:50},{id:'hat:chef',cat:'Hat',name:'Chef hat',price:70},{id:'hat:helmet',cat:'Hat',name:'Knight helmet',price:90},{id:'hat:horns',cat:'Hat',name:'Horns',price:95},{id:'hat:viking',cat:'Hat',name:'Viking helmet',price:110},{id:'hat:wizard',cat:'Hat',name:'Wizard hat',price:120},{id:'hat:tophat',cat:'Hat',name:'Top hat',price:130},{id:'hat:crown',cat:'Hat',name:'Crown',price:150},{id:'hat:halo',cat:'Hat',name:'Halo',price:200},
  {id:'face:glasses',cat:'Face',name:'Glasses',price:35},{id:'face:mustache',cat:'Face',name:'Mustache',price:35},{id:'face:facepaint',cat:'Face',name:'Face paint',price:40},{id:'face:shades',cat:'Face',name:'Shades',price:55},{id:'face:patch',cat:'Face',name:'Eye patch',price:60},{id:'face:visor',cat:'Face',name:'Visor',price:75},
  {id:'back:backpack',cat:'Back',name:'Backpack',price:60},{id:'back:cape',cat:'Back',name:'Cape',price:120},{id:'back:shield',cat:'Back',name:'Shield',price:140},{id:'back:sword',cat:'Back',name:'Sword',price:160},{id:'back:jetpack',cat:'Back',name:'Jetpack',price:220},{id:'back:wings',cat:'Back',name:'Wings',price:250},
  {id:'pet:bee',cat:'Pet',name:'Bee',price:70},{id:'pet:slime',cat:'Pet',name:'Slime',price:90},{id:'pet:cat',cat:'Pet',name:'Cat',price:110},{id:'pet:dog',cat:'Pet',name:'Dog',price:110},{id:'pet:penguin',cat:'Pet',name:'Penguin',price:120},{id:'pet:ghost',cat:'Pet',name:'Ghost',price:130},{id:'pet:fox',cat:'Pet',name:'Fox',price:140},{id:'pet:owl',cat:'Pet',name:'Owl',price:150},{id:'pet:robot',cat:'Pet',name:'Robot',price:180},{id:'pet:dragon',cat:'Pet',name:'Dragon',price:220},
];
SHOP.forEach(s=>{ if(!s.name) s.name=SKINS[s.id.split(':')[1]].nm; });
const SHOP_CATS=[['Shirt','skin'],['Hat','hat'],['Face','face'],['Back','back'],['Pet','pet']];
function avatarSVG(av){
  av=av||(State&&State.s&&State.s.avatar)||{}; const shirt=SKINS[av.skin]||SKINS.green;
  const hat=HATS[av.hat]||'', face=FACES[av.face]||'', back=BACKS[av.back]||'', pet=PETS[av.pet]||'';
  return `<svg viewBox="-2 -12 50 58" aria-hidden="true" style="overflow:visible">${back}<rect x="7" y="2" width="20" height="18" fill="#f3c08a" stroke="${INK}" stroke-width="3"/><rect x="7" y="2" width="20" height="6" fill="#5a3b1e"/><rect x="12" y="10" width="3" height="3" fill="${INK}"/><rect x="20" y="10" width="3" height="3" fill="${INK}"/><rect x="13" y="15" width="8" height="2" fill="${INK}"/>${face}${hat}<rect x="5" y="21" width="24" height="14" fill="${shirt.fill}" stroke="${INK}" stroke-width="3"/>${shirt.deco}<rect x="1" y="21" width="4" height="12" fill="#f3c08a" stroke="${INK}" stroke-width="2"/><rect x="29" y="21" width="4" height="12" fill="#f3c08a" stroke="${INK}" stroke-width="2"/><rect x="7" y="35" width="8" height="9" fill="#3a56a8" stroke="${INK}" stroke-width="2"/><rect x="19" y="35" width="8" height="9" fill="#3a56a8" stroke="${INK}" stroke-width="2"/>${pet}</svg>`;
}
VIEWS.shop=(app)=>{
  const owned=new Set(State.s.owned||[]); const av=State.s.avatar;
  const equipped=id=>{ const [k,v]=id.split(':'); return (av[k]||(k==='skin'?'green':'none'))===v; };
  const preview=(id)=>{ const [k,v]=id.split(':'); return avatarSVG({...av,[k]:v}); };
  app.innerHTML=h`<div class="stack">
   <div class="block"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Coin shop</p><h1>Dress your block.</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div><p class="muted" style="margin-top:6px">Looks only. No gear changes the math. Coins come from checkpoints, correct answers, and boss runs. Each card shows how the item looks on you.</p>
    <div class="row" style="margin-top:14px;align-items:flex-end"><div class="avprev">${avatarSVG(av)}</div><div><div class="pill coins" style="font-size:1.1rem"><span class="coin"></span><span class="num">${State.s.coins}</span> coins</div><p class="muted" style="font-size:.85rem;margin-top:6px">Tap an owned item to wear it. Tap it again to take it off.</p><p class="muted" style="font-size:.85rem">Owned: <b class="num">${owned.size}</b> of ${SHOP.length}</p></div></div></div>
   ${SHOP_CATS.map(([c,k])=>`<div class="block"><h2>${c==='Back'?'Back gear':c+'s'}</h2><div class="shopgrid">${(k==='skin'?[{id:'skin:green',cat:'Shirt',name:'Grass shirt',price:0}]:[{id:k+':none',cat:c,name:'None',price:0}]).concat(SHOP.filter(s=>s.cat===c)).map(s=>{ const own=s.price===0||owned.has(s.id); const eq=equipped(s.id); return `<button type="button" class="shopitem ${own?'own':''} ${eq?'eq':''}" data-id="${s.id}" data-price="${s.price}" ${!own&&State.s.coins<s.price?'disabled':''}><span class="ico">${preview(s.id)}</span><b>${esc(s.name)}</b><span class="muted num">${own?(eq?'wearing':'owned'):s.price+' coins'}</span></button>`; }).join('')}</div></div>`).join('')}
  </div>`;
  app.querySelectorAll('.shopitem').forEach(b=>b.onclick=()=>{ const id=b.dataset.id, price=+b.dataset.price; const [k,v]=id.split(':'); const own=price===0||owned.has(id);
    if(!own){ if(State.s.coins<price) return; modal(`<h2>Buy ${esc(SHOP.find(s=>s.id===id).name)} for ${price} coins?</h2><p class="muted">You have ${State.s.coins}.</p>`,[{label:'Not now',cls:'alt'},{label:'Buy and wear',cls:'gold',fn:()=>{ State.s.coins-=price; (State.s.owned=State.s.owned||[]).push(id); av[k]=v; State.save(); ding(); toast('Bought. Looking sharp.'); render(); }}]); return; }
    av[k]= (av[k]===v && v!=='none' && k!=='skin') ? 'none' : v; State.save(); render(); });
};

/* ---- Journal: every correct answer with his notes, across units ---- */
function journalEntries(){
  const out=[]; for(const uid in UNITS){ const u=UNITS[uid]; const st=US(uid);
    u.ITEMS.forEach(it=>{ const r=st.checks[it.id]; if(r&&r.correct) out.push({unit:u,section:'Check',lesson:(u.PROBLEMS.find(P=>P.n===it.p)||{}),id:it.id,prompt:it.prompt,answer:r.answer||'',work:r.work||'',ts:r.clearedAt||0}); });
    u.LEVELS.forEach(L=>{ const l=st.learn['l'+L.n]||{}; (u.MINI[L.n]||[]).forEach((q,i)=>{ const key='q'+(i+1); if(l[key]) out.push({unit:u,section:'Level '+L.n+' mini-boss',lesson:{title:L.title},id:'L'+L.n+'Q'+(i+1),prompt:q.prompt,answer:l['a'+key]||'✔',work:l['w'+key]||'',ts:l[key]}); }); });
    st.attempts.forEach(a=>(a.items||[]).forEach(x=>{ if(x.ok) out.push({unit:u,section:'Final Boss run '+a.seed,lesson:{title:new Date(a.ts).toLocaleDateString()},id:x.id,prompt:'',answer:x.raw,work:x.work||'',ts:a.ts}); })); }
  return out;
}
let journalUnit='all';
VIEWS.journal=(app)=>{
  const all=journalEntries(); const es=all.filter(e=>journalUnit==='all'||e.unit.id===journalUnit); const groups={};
  es.forEach(e=>{ const k=e.unit.title+' · '+e.section; (groups[k]=groups[k]||[]).push(e); });
  app.innerHTML=h`<div class="stack">
   <div class="block"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Journal</p><h1>Everything you have solved.</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div><p class="muted" style="margin-top:6px">Every correct answer is kept here with your notes, so you can look back at how you did it. ${State.mode==='signed'?'':'On a public link this lasts only while the page is open.'}</p>
    <div class="row" style="margin-top:10px"><button class="tab" data-ju="all" aria-current="${journalUnit==='all'?'page':'false'}">All</button>${Object.values(UNITS).map(u=>`<button class="tab" data-ju="${u.id}" aria-current="${journalUnit===u.id?'page':'false'}">${esc(u.short)}</button>`).join('')}<span class="muted num" style="margin-left:auto">${es.length} entr${es.length===1?'y':'ies'}</span></div></div>
   ${es.length?Object.keys(groups).map(k=>`<div class="block"><h2>${esc(k)}</h2><div class="stack" style="margin-top:10px">${groups[k].sort((a,b)=>String(a.id).localeCompare(String(b.id),undefined,{numeric:true})).map(e=>`<div class="jentry"><div class="tag">${esc(String(e.id).toUpperCase())}${e.lesson.title?` <span class="muted" style="font-family:var(--body);font-size:.8rem;font-weight:700">· ${esc(e.lesson.title)}</span>`:''}</div>${e.prompt?`<div style="font-size:.95rem">${e.prompt}</div>`:''}<div><span class="muted">Answer:</span> <span class="eq" style="white-space:normal">${esc(e.answer)}</span></div>${e.work?`<div class="workbox">${esc(e.work)}</div>`:'<div class="muted" style="font-size:.85rem">No notes written for this one.</div>'}</div>`).join('')}</div></div>`).join(''):'<div class="block soft"><p>Nothing solved yet. Clear a Check item, a mini-boss, or a Final Boss question and it lands here with your notes.</p></div>'}
  </div>`;
  app.querySelectorAll('[data-ju]').forEach(b=>b.onclick=()=>{ journalUnit=b.dataset.ju; render(); });
};

/* ---- Rematch Chest: spaced retrieval of past misses, fresh numbers, once a day ---- */
function missedIds(){ const out=[]; for(const uid in UNITS){ const st=US(uid); for(const id in st.checks){ const r=st.checks[id]; if(r.history&&r.history.some(x=>!x.ok)) out.push(uid+':'+id); } st.attempts.forEach(a=>(a.items||[]).forEach(x=>{ if(!x.ok) out.push(uid+':'+x.id); })); } return [...new Set(out)]; }
function chestToday(){ const today=localDay(0); let c=State.s.chest; const seed=parseInt(today.replace(/-/g,''),10)%100000;
  if(!c||c.date!==today) c=State.s.chest={date:today,seed,ids:[],done:{}};
  // Top the chest up to 5 open rematches from misses it does not hold yet (new misses can appear during the day).
  const open=c.ids.filter(id=>!c.done[id]).length; if(open<5){ const pool=missedIds().filter(id=>!c.ids.includes(id)); if(pool.length){ const r=M.rng(seed+c.ids.length); const add=[...pool].sort(()=>r()-0.5).slice(0,5-open); c.ids.push(...add); State.save(); } }
  return c; }
function chestCount(){ const c=chestToday(); return c.ids.filter(id=>!c.done[id]).length; }
VIEWS.chest=(app)=>{
  const c=chestToday(); const tests={}; const items=c.ids.map(key=>{ const [uid,id]=key.split(':'); const u=UNITS[uid]; if(!u) return null; tests[uid]=tests[uid]||u.genTest(c.seed); const it=tests[uid].items.find(x=>x.id===id); return it?{key,uid,it}:null; }).filter(Boolean);
  const left=items.filter(x=>!c.done[x.key]).length;
  app.innerHTML=h`<div class="stack">
   <div class="block" style="border-color:var(--gold)"><div class="row" style="justify-content:space-between"><div><p class="eyebrow">Rematch Chest</p><h1>${items.length?(left?'Old enemies, new numbers.':'Chest emptied for today.'):'The chest is empty.'}</h1></div><button class="btn alt sm" data-go="map">🗺 Map</button></div>
    <p class="muted" style="margin-top:6px">${items.length?'Questions you missed before come back here with fresh numbers. 15 coins each, and beating one is the best way to make it stick. A new chest appears each day.':'It fills with questions you have missed in Check or the Final Boss. No misses yet means nothing to rematch. Come back after a boss run.'}</p></div>
   ${items.map(({key,uid,it})=>`<div class="item ${c.done[key]?'ok':''}" data-item="${it.id}" data-key="${key}"><div class="tag">${esc(UNITS[uid].short)} · ${it.id.toUpperCase()} ${c.done[key]?'<span class="ck">✔ beaten</span>':''}</div><div>${it.prompt}</div><label class="muted" style="font-size:.85rem">Work it out here</label><textarea class="scratch" placeholder="Steps, scribbles, anything."></textarea>${answerUI(it,'ch')}<div class="row"><button type="button" class="btn sm check" ${c.done[key]?'disabled':''}>Check</button></div><div class="fbwrap"></div></div>`).join('')}
  </div>`;
  items.forEach(({key,uid,it})=>{ const el=app.querySelector(`[data-key="${key}"]`); wireAnswerUI(it,el); let misses=0; $('.check',el).onclick=()=>{ const raw=rawOf(it,el).trim(); if(!raw&&it.kind!=='numberline'){ showFB(el,'info','Type something first.'); return; } const extra=it.kind==='numberline'?el._nl.get():(el._get?el._get():null); const g=gradeItem(it,raw,extra);
      if(g.ok){ el.classList.add('ok'); el.classList.remove('bad'); c.done[key]=Date.now(); State.addCoins(15,'rematch won'); State.checkpoint(); showFB(el,'ok','Rematch won. That one is yours now.'); $('.check',el).disabled=true; $('.tag',el).innerHTML+=' <span class="ck">✔ beaten</span>'; State.save(); }
      else { misses++; thud(); el.classList.add('bad'); const why=diagnose(it,raw,extra)||it.diag; showFB(el,'bad',`<span class="who">Respawn</span>${g.partial?g.partial+' ':''}${esc(why)}${misses>=2?`<br><span class="muted">Correct form: ${esc(it.show)}</span>`:''}<br>${learnLinkFor(uid,it.learn)}`); } }; });
};
function learnLinkFor(uid,n){ const L=UNITS[uid].LEVELS[n-1]; return `<a href="#" data-gounit="${uid}" data-level="${n}">→ ${esc(UNITS[uid].short)} Level ${n}: ${esc(L.title)}</a>`; }
document.addEventListener('click',e=>{ const a=e.target.closest('[data-gounit]'); if(a){ e.preventDefault(); State.unit=a.dataset.gounit; go('level',+a.dataset.level); } });

/* ---- Read-aloud: pre-rendered clip when one exists, browser speech as a fallback ---- */
let raAudio=null;
function raButton(key,text){ return `<button type="button" class="ra" data-ra="${esc(key)}" data-text="${esc(text.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim())}" aria-label="Read aloud" title="Read aloud">🔊</button>`; }
document.addEventListener('click',e=>{ const b=e.target.closest('.ra'); if(!b) return; if(State.s.muted){ toast('Sound is off. Turn it on from the map.'); return; }
  try{ if(raAudio){ raAudio.pause(); } if(window.speechSynthesis) speechSynthesis.cancel(); }catch(x){}
  const key=b.dataset.ra, text=b.dataset.text; const a=new Audio('voices/ra/'+key+'.mp3'); raAudio=a; b.classList.add('on'); a.onended=()=>b.classList.remove('on');
  a.onerror=()=>{ try{ if(!window.speechSynthesis){ b.classList.remove('on'); return; } const u=new SpeechSynthesisUtterance(text.replace(/≤/g,' less than or equal to ').replace(/≥/g,' greater than or equal to ').replace(/</g,' less than ').replace(/>/g,' greater than ').replace(/−/g,' minus ')); u.rate=1; u.onend=()=>b.classList.remove('on'); speechSynthesis.speak(u);}catch(x){ b.classList.remove('on'); } };
  a.play().catch(()=>a.onerror()); });
