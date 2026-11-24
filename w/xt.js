// ============================================================
// /w/xt.js 🌟 พรสวรรค์ลิขิต 200 แบบ + 🎯 ปณิธานชะตา + 🎯 ปณิธานทะลุฟ้าดารา (โหลดต่อจาก xp.js) — ทุกโลก
//  การ์ด "🌟 พรสวรรค์ลิขิต" โผล่ในหน้าสุ่มกำเนิดทุกโลก (เปิดการ์ดมีอนิเมชัน) · สุ่มใหม่ตามการสุ่มกำเนิด
//  ประเภท: สองคม · วิวัฒน์ (อายุ 30 แตกเป็น 3 ร่างตามวิธีใช้ชีวิต) · ซ่อน ??? (เผยตามเงื่อนไข) · เปลี่ยนกติกา · ผูกกับคนอื่น · ชิ้นส่วนคอมโบ
//  คอมโบ 35 คู่ · เสียงสะท้อนจากชาติก่อน · สมุดสะสม · ปณิธานชะตา 16 แบบ (ลับ ขัดกัน ถูกตั้งให้ กลายพันธุ์ เดิมพัน ค้างข้ามชาติ)
//  ข้อมูลอยู่ใน /w/xt_data.js · สถานะ S._xt · ข้อความสองภาษา L(ไทย, อังกฤษ)
// ============================================================
try{(()=>{
if(!window.XT_RAW)return;
const EN=()=>{try{return LANG==='en'}catch(e){return false}};
const L=(th,en)=>EN()?en:th;
const rnd=()=>Math.random(),pick=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),Ri=(a,b)=>a+Math.floor(rnd()*(b-a+1)),shuf=a=>a.slice().sort(()=>rnd()-.5);
const say=(t,c,big)=>{try{log(t,c||'',big)}catch(e){}};
const es=v=>{try{return esc(v)}catch(e){return String(v)}};
const fm=v=>{try{return fmt(v)}catch(e){return String(v)}};
const pw=p=>{try{const g=pctPow(p);S.power+=g;return g}catch(e){return 0}};
const kA=t=>{try{keyAdd(t)}catch(e){}};
const isl=(ic,h,t,kind)=>{try{island({big:1,pri:1,ic,h,t,kind:kind||'gold'})}catch(e){}};
const LSg=(k,d)=>{try{const v=LS.get(k,d);return v==null?d:v}catch(e){return d}},LSs=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const WK=()=>{try{if(window._xl&&window._xl.WK)return window._xl.WK()}catch(e){}return'murim'};
const WC={murim:'m',xian:'x',mw:'w',soul:'s',sbeast:'b',beast:'b',sky:'k',fog:'f',rg:'r'};
const modern=()=>['mw','sky','fog'].includes(WK());const cash=n=>Math.round(n*(modern()?3:1));
const bkh=()=>new Date(Date.now()+7*3600e3).getUTCHours(),bkd=()=>new Date(Date.now()+7*3600e3).getUTCDay();

// =================== ข้อมูล ===================
const pfx=s=>(s||'').split(',').filter(Boolean).map(t=>{const[a,c]=t.split('@');const[k,v]=a.split('=');return{k,v:+v,c:c||''}});
const T={},BASE=[];
XT_RAW.trim().split('\n').forEach(l=>{const p=l.split('|');if(p.length<9)return;const o={id:p[0],w:p[1],r:+p[2],ty:+p[3],n:[p[4],p[5]],d:[p[6],p[7]],fx:pfx(p[8]),ext:p[9]||''};if(o.ext.startsWith('ev:'))o.ev=o.ext.slice(3).split(',');if(o.ext.startsWith('hd:')){const[c,f]=o.ext.slice(3).split('>');o.hd={c,f}}T[o.id]=o;BASE.push(o)});
XT_FORMS.trim().split('\n').forEach(l=>{const p=l.split('|');if(p.length<5)return;const par=p[0].replace(/[kmph]$/,'');const P=T[par]||{};T[p[0]]={id:p[0],w:P.w||'a',r:Math.max(2,P.r===9?9:(P.r||1)+1),ty:P.ty||3,n:[p[1],p[2]],d:[p[3],''],fx:pfx(p[4]),form:1,par}});
const CB=XT_COMBO.trim().split('\n').map(l=>{const p=l.split('|');return{a:p[0],b:p[1],n:[p[2],p[3]],d:[p[4],p[5]],fx:pfx(p[6]),id:p[0]+'+'+p[1]}}).filter(c=>T[c.a]&&T[c.b]);
const VW=XT_VOW.trim().split('\n').map(l=>{const p=l.split('|');return{id:p[0],ty:p[1],n:[p[2],p[3]],d:[p[4],p[5]],chk:p[6],dl:+p[7]}});
window.XT_COUNT={base:BASE.length,forms:Object.keys(T).length-BASE.length,combos:CB.length,vows:VW.length};
const RN={1:['ธรรมดา','Common','#c9c9d6'],2:['หายาก','Rare','#6aa8ff'],3:['ตำนาน','Legendary','#ffcf4d'],9:['ต้องสาป','Cursed','#ff5a6a']};
const TY={2:['⚖️','สองคม','Double-edged'],3:['🌱','วิวัฒน์','Evolving'],4:['❔','ซ่อนอยู่','Hidden'],5:['🎲','เปลี่ยนกติกา','Rule-bender'],6:['🤝','ผูกกับคนอื่น','Bonded'],7:['🧩','ชิ้นส่วนคอมโบ','Combo piece']};
const tN=t=>L(t.n[0],t.n[1]);
// คำอธิบายผลอัตโนมัติ (ให้ตัวเลขตรงกับที่เกิดขึ้นจริงเสมอ)
const CND={odd:['ปีคี่','odd years'],even:['ปีคู่','even years'],lt30:['ก่อนอายุ 30','before 30'],gt30:['หลังอายุ 30','after 30'],gt50:['หลังอายุ 50','after 50'],kp:['ตอนกรรมดี','with good karma'],kn:['ตอนกรรมชั่ว','with bad karma'],mar:['ตอนมีคู่','when married'],sgl:['ตอนโสด','when single'],rich:['ตอนรวย','when rich'],poor:['ตอนจน','when poor'],night:['ตอนเล่นกลางคืนจริง (19:00–05:00)','when you play at night (7pm–5am)'],day:['ตอนเล่นกลางวันจริง','when you play by day'],wkend:['วันเสาร์อาทิตย์จริง','on real weekends'],kid:['ตอนมีลูก','with children'],nokid:['ตอนไม่มีลูก','without children'],p30:['บางปี (30%)','some years (30%)'],p10:['นานๆ ที (10%)','rarely (10%)']};
const fxTxt=f=>{const s=f.v>0?'+':'',c=f.c?` (${L(CND[f.c][0],CND[f.c][1])})`:'';switch(f.k){
 case'pw':return L(`พลัง ${s}${f.v}%/ปี`,`power ${s}${f.v}%/yr`)+c;case'mon':return L(`เงิน ${s}${fm(f.v)}/ปี`,`money ${s}${fm(f.v)}/yr`)+c;case'int':return L(`ปัญญา ${s}${f.v}/ปี`,`INT ${s}${f.v}/yr`)+c;case'cha':return L(`เสน่ห์ ${s}${f.v}/ปี`,`CHA ${s}${f.v}/yr`)+c;case'kar':return L(`กรรม ${s}${f.v}/ปี`,`karma ${s}${f.v}/yr`)+c;case'fame':return L(`ชื่อเสียง ${s}${f.v}/ปี`,`fame ${s}${f.v}/yr`)+c;
 case'life':return L(`อายุขัย ${s}${f.v} ปี`,`lifespan ${s}${f.v} yrs`)+c;case'hp':return L(`พลังชีวิตสูงสุด ${s}${f.v}`,`max HP ${s}${f.v}`)+c;case'pwx':return L(`พลัง +${f.v}% ทันที`,`power +${f.v}% at once`);
 case'duel':return L(`ศัตรูในการดวล ${f.v<1?'อ่อนลง':'แข็งขึ้น'} ${Math.round(Math.abs(1-f.v)*100)}%`,`duel foes ${f.v<1?'weaker':'stronger'} by ${Math.round(Math.abs(1-f.v)*100)}%`)+c;
 case'mgz':return L(`มินิเกม${f.v>=1?'ช้าลง':'เร็วขึ้น'} ${Math.round(Math.abs(f.v-1)*100)}%`,`minigames ${f.v>=1?'slower':'faster'} by ${Math.round(Math.abs(f.v-1)*100)}%`)+c;case'mgs':return L(`คะแนนมินิเกม +${Math.round(f.v*100)}%`,`minigame score +${Math.round(f.v*100)}%`)+c;
 case'heal':return L(`ใกล้ตายแล้วฟื้นเป็น ${f.v}% (ทุก 8 ปี)`,`revive to ${f.v}% near death (every 8 yrs)`)+c;case'dmg':return f.v>0?L(`เสียเลือด ${f.v}%/ปี`,`lose ${f.v}% HP/yr`)+c:L(`บาดเจ็บน้อยลง`,`fewer wounds`)+c;case'seer':return L('เห็นโอกาสชนะก่อนดวล','see win odds before duels')+c}return''};
const fxAll=fx=>fx.map(fxTxt).filter(Boolean).join(' · ');
const cOK=c=>{try{if(!c)return true;const a=S.age|0;switch(c){case'odd':return a%2===1;case'even':return a%2===0;case'lt30':return a<30;case'gt30':return a>=30;case'gt50':return a>=50;case'kp':return(S.karma||0)>0;case'kn':return(S.karma||0)<0;case'mar':return!!S.spouse;case'sgl':return!S.spouse;case'rich':return(S.money||0)>=cash(50000);case'poor':return(S.money||0)<cash(2000);case'night':{const h=bkh();return h>=19||h<5}case'day':{const h=bkh();return h>=5&&h<19}case'wkend':{const d=bkd();return d===0||d===6}case'kid':return(S.kids|0)>0;case'nokid':return!(S.kids|0);case'p30':return rnd()<.3;case'p10':return rnd()<.1}}catch(e){}return false};

// =================== สุ่มตอนเกิด ===================
const W8={1:55,2:30,3:12,9:3};
let BW=null;function pool(){const c=BW||WC[WK()]||'m';return BASE.filter(t=>t.w==='a'||t.w===c||(c==='r'&&t.w==='m'))}
function roll1(ex){const P=pool().filter(t=>!(ex||[]).includes(t.id));const tw=P.reduce((s,t)=>s+(W8[t.r]||1),0);let q=rnd()*tw;for(const t of P){q-=W8[t.r]||1;if(q<=0)return t.id}return P[0]&&P[0].id}
function rollSet(){const a=[roll1()];if(rnd()<.18){const cb=CB.filter(c=>c.a===a[0]||c.b===a[0]);if(cb.length&&rnd()<.45){const c=pick(cb);a.push(c.a===a[0]?c.b:c.a)}else a.push(roll1(a))}
 // เสียงสะท้อนจากชาติก่อน
 const echo=LSg('murim_xtEcho',null);let e=null;if(echo&&T[echo]&&rnd()<.14&&!a.includes(echo))e=echo;return{t:a.filter(Boolean),echo:e}}
const combosOf=ids=>CB.filter(c=>ids.includes(c.a)&&ids.includes(c.b));

// =================== การ์ดในหน้าสุ่มกำเนิด ===================
const HOST=[['#birth #traits','#birth'],['#brB .brtr','#brB'],['#fgB .fgTr','#fgB'],['#skTr','#skB'],['#mwB .mbGrid','#mwB']];
const birthW=root=>{try{if(root==='#skB')return'k';if(root==='#fgB')return'f';if(root==='#brB')return'b';if(root==='#mwB')return'w';const ck=(typeof CH_KEYS!=='undefined'&&CFG)?CH_KEYS[CFG.chm]:'';if(CFG&&CFG.xian)return'x';if(ck==='soul')return's';if(ck==='regress')return'r';return'm'}catch(e){return'm'}};
let cur=null,lastSig='',cand='',candN=0;
const sigOf=h=>[...h.querySelectorAll(':scope>.trait:not(.xtCard) .v,:scope>* .v,:scope .mbTh')].filter(e=>!e.closest('.xtCard')).map(e=>e.textContent).join('|').slice(0,800);
const cardHTML=(id,anim,i)=>{const t=T[id],rr=RN[t.r],hid=t.ty===4;const ty=TY[t.ty]||TY[2];
 return`<div class="trait show xtCard xr${t.r}${hid?' xtHid':''}${anim?' xtAn':''}" data-xt="${id}" style="--xc:${rr[2]};--xd:${(i||0)*.22}s"><div><div class="k">🌟 ${L('พรสวรรค์ลิขิต','Fated Gift')} <span class="xtTy">${ty[0]} ${L(ty[1],ty[2])}</span></div><div class="v" style="color:var(--xc)">${hid?'❔ ???':es(tN(t))}</div><div class="d">${hid?L('ซ่อนอยู่ในชะตา — จะเผยเมื่อถึงเวลา','Hidden in your fate — revealed in time'):es(L(t.d[0],t.d[1]))}${!hid&&t.fx.length?`<br><b class="xtFx">${es(fxAll(t.fx))}</b>`:''}${t.ev?`<br><small>🌱 ${L('อายุ 30 จะวิวัฒน์เป็น 1 ใน 3 ร่าง ตามวิธีที่คุณใช้ชีวิต','At 30 it evolves into one of 3 forms, by how you live')}</small>`:''}</div></div><span class="o" style="border-color:var(--xc);color:var(--xc)">${L(rr[0],rr[1])}</span>${anim?'<i class="xtShine"></i>':''}</div>`};
const comboHTML=(c,anim)=>`<div class="trait show xtCard xtCmb${anim?' xtAn xtMerge':''}" data-xtc="${c.id}" style="--xc:#ff9ad8;--xd:.5s"><div><div class="k">🔗 ${L('คอมโบพรสวรรค์','Gift Combo')}</div><div class="v" style="color:#ff9ad8">${es(L(c.n[0],c.n[1]))}</div><div class="d">${es(L(c.d[0],c.d[1]))}<br><b class="xtFx">${es(fxAll(c.fx))}</b></div></div><span class="o" style="border-color:#ff9ad8;color:#ff9ad8">✦ ${tN(T[c.a])} + ${tN(T[c.b])}</span>${anim?'<i class="xtShine"></i>':''}</div>`;
function draw(h,anim){h.querySelectorAll(':scope>.xtCard').forEach(e=>e.remove());if(!cur)return;let html=cur.t.map((id,i)=>cardHTML(id,anim,i)).join('');combosOf(cur.t).forEach(c=>html+=comboHTML(c,anim));if(cur.echo)html+=`<div class="trait show xtCard xtHid${anim?' xtAn':''}" style="--xc:#9a9aff;--xd:.6s"><div><div class="k">👻 ${L('เสียงสะท้อนจากชาติก่อน','Echo of a Past Life')}</div><div class="v" style="color:#9a9aff">❔ ???</div><div class="d">${L('พรสวรรค์จากชาติที่แล้วตามมาด้วย — จะตื่นตอนอายุ 20','A gift from your last life followed you — it wakes at 20')}</div></div><span class="o">👻</span></div>`;
 h.insertAdjacentHTML('beforeend',html);if(anim)try{snd&&snd(cur.t.some(id=>T[id].r>=3)?'ach':'coin')}catch(e){}}
setInterval(()=>{try{for(const[q,root]of HOST){const h=document.querySelector(q),R=document.querySelector(root);if(!h||!R||!h.offsetParent)continue;const sg=sigOf(h);if(!sg)continue;
  if(sg!==cand){cand=sg;candN=0;continue}candN++;if(candN<2)continue;
  if(sg!==lastSig){lastSig=sg;BW=birthW(root);cur=rollSet();BW=null;cur.at=Date.now();window._xtPend=cur;draw(h,1)}else if(!h.querySelector(':scope>.xtCard')&&cur){draw(h,0)}break}}catch(e){}},300);

// =================== เริ่มชีวิต ===================
const X=()=>S._xt||(S._xt={t:[],h:{},cb:[],hl:-99,ev:0,v:null});
const has=id=>{const x=X();return x.t.includes(id)};
function active(){const x=X(),A=[];x.t.forEach(id=>{const t=T[id];if(!t)return;if(t.ty===4&&!x.h[id])return;A.push(x.h[id]&&T[x.h[id]]?T[x.h[id]]:t)});x.cb.forEach(cid=>{const c=CB.find(z=>z.id===cid);if(c)A.push(c)});return A}
const fxs=()=>{const o=[];active().forEach(t=>t.fx.forEach(f=>o.push(f)));return o};
const book=ids=>{try{const B=LSg('murim_xtBook',{})||{};let n=0;ids.forEach(i=>{if(!B[i]){B[i]=1;n++}});if(n)LSs('murim_xtBook',B)}catch(e){}};
function startApply(){const x=X();active().forEach(t=>t.fx.forEach(f=>{if(!cOK(f.c))return;if(f.k==='life')S.lifespan=Math.max(S.age+5,(S.lifespan||70)+f.v);else if(f.k==='hp'){S.maxHp=Math.max(10,S.maxHp+f.v);S.hp=S.maxHp}else if(f.k==='pwx')pw(f.v/100)}))}
function begin(p){const x=X();x.t=p&&p.t?p.t.slice():[roll1()].filter(Boolean);x.echo=p&&p.echo||null;x.h={};x.cb=combosOf(x.t).map(c=>c.id);book(x.t.filter(id=>T[id].ty!==4).concat(x.cb));
 setTimeout(()=>{try{if(!S||!S.alive)return;startApply();const vis=x.t.map(id=>T[id].ty===4?'❔ ???':`${tN(T[id])}`).join(' · ');say(`🌟 <b>${L('พรสวรรค์ลิขิต','Fated Gifts')}</b>: ${vis}${x.cb.length?` · 🔗 ${x.cb.map(c=>L(CB.find(z=>z.id===c).n[0],CB.find(z=>z.id===c).n[1])).join(', ')}`:''}`,x.t.some(id=>T[id].r>=3)?'myth':'epic');x.cb.forEach(c=>kA(L('คอมโบพรสวรรค์ ','Gift combo ')+L(CB.find(z=>z.id===c).n[0],CB.find(z=>z.id===c).n[1])))}catch(e){console.error('xt begin',e)}},400)}
{const _sl=startLife;startLife=function(){const r=_sl.apply(this,arguments);try{if(S&&S.alive){const p=window._xtPend&&Date.now()-window._xtPend.at<20*60e3?window._xtPend:null;window._xtPend=null;lastSig='';begin(p)}}catch(e){console.error('xt sl',e)}return r}}

// =================== ทุกปี ===================
function evolve(){const x=X();x.t.forEach((id,i)=>{const t=T[id];if(!t||!t.ev||x.h[id]||S.age<30)return;const br=(S.karma||0)>=60?0:(S.money||0)>=cash(30000)?1:2;const f=t.ev[br];if(!T[f])return;x.h[id]=f;const F=T[f];startOne(F);book([f]);
  say(`🌱 <b>${L('พรสวรรค์วิวัฒน์','Gift evolved')}</b>: ${es(tN(t))} → <b style="color:${RN[F.r][2]}">${es(tN(F))}</b> — ${es(L(F.d[0],F.d[1]))} · ${es(fxAll(F.fx))}`,'myth',true);isl('🌱',L('พรสวรรค์วิวัฒน์','Gift evolved'),tN(F));kA(L('พรสวรรค์วิวัฒน์เป็น ','Gift evolved into ')+tN(F));comboCheck()})}
const startOne=F=>F.fx.forEach(f=>{if(f.k==='life')S.lifespan=(S.lifespan||70)+f.v;else if(f.k==='hp'){S.maxHp+=f.v;S.hp=Math.min(S.maxHp,S.hp+f.v)}else if(f.k==='pwx')pw(f.v/100)});
const hdOK=c=>{const a=S.age|0;if(/^a\d+$/.test(c))return a>=+c.slice(1);if(c==='low')return S.hp<=S.maxHp*.25;if(c==='mar')return!!S.spouse;if(c==='kid')return(S.kids|0)>0;if(c==='rich')return(S.money||0)>=cash(50000);if(/^p\d+$/.test(c))return rnd()<+c.slice(1)/100;return false};
function reveal(){const x=X();x.t.forEach(id=>{const t=T[id];if(!t||t.ty!==4||x.h[id])return;if(!hdOK(t.hd.c))return;const F=T[t.hd.f];if(!F)return;x.h[id]=t.hd.f;startOne(F);book([t.hd.f]);
  say(`❔→✨ <b>${L('พรสวรรค์ที่ซ่อนอยู่เผยออกมา','A hidden gift reveals itself')}</b>: <b style="color:${RN[F.r][2]}">${es(tN(F))}</b> — ${es(L(F.d[0],F.d[1]))} · ${es(fxAll(F.fx))}`,F.r===9?'bad':'myth',true);isl('✨',L('พรสวรรค์ซ่อนเผยตัว','Hidden gift revealed'),tN(F),F.r===9?'bad':'gold');kA(L('พรสวรรค์ซ่อน: ','Hidden gift: ')+tN(F));comboCheck()});
 if(x.echo&&!x.echoOn&&S.age>=20){x.echoOn=1;if(!x.t.includes(x.echo)){x.t.push(x.echo);const E=T[x.echo];startOne(E);say(`👻 <b>${L('เสียงสะท้อนจากชาติก่อนตื่นขึ้น','The echo of a past life awakens')}</b>: ${es(tN(E))} · ${es(fxAll(E.fx))}`,'myth',true);isl('👻',L('เสียงสะท้อนจากชาติก่อน','Echo of a past life'),tN(E));comboCheck()}}}
function comboCheck(){const x=X();const ids=x.t.concat(Object.values(x.h));CB.forEach(c=>{if(x.cb.includes(c.id))return;if(ids.includes(c.a)&&ids.includes(c.b)){x.cb.push(c.id);book([c.id]);startOne(c);say(`🔗 <b>${L('คอมโบพรสวรรค์','Gift combo')}: ${es(L(c.n[0],c.n[1]))}</b> — ${es(L(c.d[0],c.d[1]))} · ${es(fxAll(c.fx))}`,'myth',true);isl('🔗',L('คอมโบพรสวรรค์','Gift combo'),L(c.n[0],c.n[1]),'gold');kA(L('คอมโบพรสวรรค์ ','Gift combo ')+L(c.n[0],c.n[1]))}})}
function yearly(){const x=X();let p=0,m=0;fxs().forEach(f=>{if(!cOK(f.c))return;switch(f.k){case'pw':p+=f.v;break;case'mon':m+=f.v;break;case'int':S.int=(S.int||0)+f.v;break;case'cha':S.cha=(S.cha||0)+f.v;break;case'kar':S.karma=(S.karma||0)+f.v;break;case'fame':S.fame=Math.max(0,(S.fame||0)+f.v);break;case'dmg':if(f.v>0)S.hp=Math.max(1,S.hp-Math.round(S.maxHp*f.v/100));break}});
 if(p)pw(p/100);if(m)S.money=Math.max(0,(S.money||0)+cash(m));
 // ฟื้นตอนใกล้ตาย
 if(S.hp<=S.maxHp*.25&&S.age-x.hl>=8){const h=fxs().filter(f=>f.k==='heal'&&cOK(f.c)).reduce((a,f)=>Math.max(a,f.v),0);if(h){x.hl=S.age;S.hp=Math.max(S.hp,Math.round(S.maxHp*h/100));say(`💫 ${L('ร่างกายฟื้นขึ้นมาเองจากปากเหว','Your body pulls itself back from the brink')} (${h}%)`,'good');isl('💫',L('รอดตาย','Survived'),L('พรสวรรค์ปกป้องคุณไว้','Your gift saved you'))}}}
{const _py=passYear;passYear=function(){const a0=S&&S.alive?S.age:null;const r=_py.apply(this,arguments);try{if(S&&S.alive&&S._xt&&S.age!==a0){yearly();reveal();evolve();vowYear()}else if(S&&S.alive&&!S._xt&&S.age!==a0){begin(null)}}catch(e){console.error('xt py',e)}return r}}
// ดวล: ตัวคูณ + เห็นโอกาส
{const _d=duel;duel=function(n,ep,cb){try{if(S&&S.alive&&S._xt&&typeof ep==='number'){let k=1,seer=0;fxs().forEach(f=>{if(!cOK(f.c))return;if(f.k==='duel')k*=f.v;if(f.k==='seer')seer=1});k=cl(k,.65,1.3);ep*=k;if(seer){const me=Math.max(1,total()),pc=Math.round(cl(me/(me+ep)*100+ (me>ep?10:-10),3,97));setTimeout(()=>{try{toast(`🔮 ${L('โอกาสชนะ','Win chance')} ~${pc}%`)}catch(e){}},150)}}}catch(e){}return _d.apply(this,[n,ep,cb].concat([].slice.call(arguments,3)))}}
// มินิเกม: ช้าลง/คะแนน
{const _mp=window.mg2Play;if(_mp)window.mg2Play=function(id,o,cb){try{if(S&&S.alive&&S._xt){let z=1,s=0;fxs().forEach(f=>{if(!cOK(f.c))return;if(f.k==='mgz')z*=f.v;if(f.k==='mgs')s+=f.v});z=cl(z,.8,1.6);s=cl(s,0,.25);if(z!==1||s){o=Object.assign({},o||{});o.ez=(o.ez||1)*z;const c0=cb;cb=function(sc,sk){return c0.call(this,sk?sc:cl((+sc||0)+s,0,1),sk)}}}}catch(e){}return _mp.call(this,id,o,cb)}}
// เสียงสะท้อน: เก็บพรสวรรค์ที่หายากที่สุดไว้ให้ชาติหน้า
{const _eg=endGame;endGame=function(){try{const x=S&&S._xt;if(x&&x.t.length){const best=x.t.filter(id=>T[id]&&T[id].ty!==4).sort((a,b)=>(T[b].r%9)-(T[a].r%9))[0];if(best)LSs('murim_xtEcho',best)}vowEnd()}catch(e){}return _eg.apply(this,arguments)}}

// =================== 🎯 ปณิธานชะตา ===================
const vv=k=>{switch(k){case'kar':return S.karma||0;case'fame':return S.fame||0;case'mon':return(S.money||0)/(modern()?3:1);case'kid':return S.kids|0;case'mar':return S.spouse?1:0;case'kw':return(S._xl&&S._xl.kw)|0;case'age':return S.age|0}return 0};
const vChk=s=>s.split('&&').every(p=>{const m=p.match(/^(\w+)(>=|<=)(-?\d+)$/);if(!m)return false;const a=vv(m[1]),b=+m[3];return m[2]==='>='?a>=b:a<=b});
const MUT={v10:['หมู่บ้านทรยศเจ้า — ล้างแค้นให้สาสม','The village betrayed you — make them pay','kar<=-40'],v11:['ทรัพย์คือโซ่ตรวน — ทิ้งให้หมด','Wealth is a chain — give it all away','mon<=1000']};
function vowOffer(){const x=X();if(x.v||x.vOff||S.age<8||S.age>22)return false;const carry=LSg('murim_xtVowCarry',null);if(!carry&&rnd()>.06)return false;x.vOff=1;
 let V=carry?VW.find(v=>v.id===carry):null,dbl=!!V;if(!V){const ty=pick(['sec','con','imp','mut','wag','sec','imp']);V=pick(VW.filter(v=>v.ty===ty))}if(!V)return false;
 if(V.ty==='con'&&!dbl){const A=VW.find(v=>v.id==='v05'),B=VW.find(v=>v.id==='v06');choice(L('⚔️ สองคำสาบานที่อยู่ด้วยกันไม่ได้','⚔️ Two oaths that cannot coexist'),L('แม่ให้คุณสัญญาว่า "จะไม่ฆ่าใคร" ส่วนพ่อก่อนตายสั่งให้ "ล้างแค้นให้พ่อ" — คุณรับทั้งสองไว้ แต่ทำสำเร็จได้แค่ข้อเดียว','Your mother made you swear "kill no one." Your dying father ordered "avenge me." You keep both — only one can be fulfilled'),[{t:L('🕊️ รับทั้งสองไว้','🕊️ Carry both'),s:'',f(){x.v={id:A.id,alt:B.id,st:S.age,dbl:0};say(L('⚖️ คุณแบกสองคำสาบานไว้บนบ่า','⚖️ You carry two oaths on your shoulders'),'epic');kA(L('ปณิธานขัดกัน','Conflicting oaths'))}},{t:L('🙅 ไม่รับทั้งคู่','🙅 Refuse both'),s:'',f(){S.cha=(S.cha||0)+5}}]);return true}
 const intro={sec:L('เสียงในความฝันบอกว่าชาตินี้คุณเกิดมาเพื่อบางอย่าง แต่ไม่ยอมบอกตรงๆ','A dream voice says you were born for something — but won\'t say what'),imp:L('ผู้ใหญ่คนหนึ่งยัดเยียดปณิธานให้คุณ "เจ้าต้องทำสิ่งนี้"','An elder forces a vow upon you: "You must do this."'),mut:L('คุณตั้งปณิธานด้วยใจบริสุทธิ์…ไม่รู้ว่ามันอาจเปลี่ยนไป','You make a vow with a pure heart… unaware it may change'),wag:L('ชายแปลกหน้าเสนอเดิมพัน "ทำได้ ข้าให้ทั้งโลก ทำไม่ได้ ข้าเอาบางอย่างไป"','A stranger offers a wager: "Succeed and I give you the world. Fail and I take something."'),con:''}[V.ty];
 const shown=V.ty==='sec'?L(`คำใบ้: "${V.n[0]}"`,`Hint: "${V.n[1]}"`):L(`「${V.n[0]}」 — ${V.d[0]} ก่อนอายุ ${V.dl}`,`"${V.n[1]}" — ${V.d[1]} by age ${V.dl}`);
 choice(dbl?L('👻 ปณิธานค้างจากชาติก่อน','👻 A vow left over from a past life'):L('🎯 ปณิธานชะตา','🎯 A vow of fate'),`${dbl?L('ชาติก่อนคุณทำไม่สำเร็จ ชาตินี้มันกลับมาหา — รางวัลสองเท่า','You failed it last life; it returns — double reward')+'<br>':''}${intro}<br><b>${shown}</b>`,[
  {t:L('✋ รับปณิธาน','✋ Accept'),s:V.ty==='wag'?L('สำเร็จได้มาก ล้มเหลวเสียบางอย่าง','Big reward — or a loss'):'',f(){x.v={id:V.id,st:S.age,dbl:dbl?1:0};LSs('murim_xtVowCarry',null);if(V.ty==='wag'){S.fame+=100}say(`🎯 ${L('รับปณิธาน','Vow accepted')}: ${V.ty==='sec'?'❔ '+es(L(V.n[0],V.n[1])):es(L(V.n[0],V.n[1]))}`,'epic');kA(L('รับปณิธานชะตา','Accepted a vow of fate'))}},
  {t:L('🙅 ปฏิเสธ','🙅 Refuse'),s:V.ty==='imp'?L('ได้อิสระ','Freedom'):'',f(){if(V.ty==='imp'){S.cha=(S.cha||0)+6;S.karma=(S.karma||0)-5;say(L('คุณปฏิเสธ ผู้ใหญ่ผิดหวัง แต่คุณรู้สึกเป็นตัวของตัวเอง','You refuse. The elder is disappointed, but you feel like yourself'),'')}LSs('murim_xtVowCarry',null)}}]);return true}
function vowDone(v,V){const m=v.dbl?2:1;S.fame+=600*m;const p=pw(.05*m);S.karma=(S.karma||0)+(V.ty==='wag'?0:15);if(V.ty==='wag'){S.money+=cash(20000*m)}say(`🏅 <b>${L('ปณิธานชะตาสำเร็จ','Vow of fate fulfilled')}: ${es(L(V.n[0],V.n[1]))}</b>${v.dbl?' ×2':''} · ${L('พลัง','power')} +${fm(p)}`,'myth',true);isl('🏅',L('ปณิธานชะตาสำเร็จ','Vow fulfilled'),L(V.n[0],V.n[1]));kA(L('ปณิธานชะตาสำเร็จ: ','Vow fulfilled: ')+L(V.n[0],V.n[1]));try{const B=LSg('murim_xtVowBook',{})||{};B[V.id]=1;LSs('murim_xtVowBook',B)}catch(e){}}
function vowFail(v,V){if(V.ty==='wag'){S.lifespan=Math.max(S.age+2,(S.lifespan||70)-5);S.fame=Math.round((S.fame||0)*.6);say(`💀 <b>${L('แพ้เดิมพัน','Wager lost')}: ${es(L(V.n[0],V.n[1]))}</b> — ${L('อายุขัย −5 ชื่อเสียงหายไปครึ่งหนึ่ง','lifespan −5, fame cut deeply')}`,'bad',true)}else{LSs('murim_xtVowCarry',V.id);say(`💔 ${L('ปณิธานไม่สำเร็จ','Vow unfulfilled')}: ${es(L(V.n[0],V.n[1]))} — ${L('มันจะตามไปหาคุณในชาติหน้า','it will follow you into your next life')}`,'bad')}}
function vowYear(){const x=X();if(!x.v){if(!(S._xl&&S._xl.cd===S.age))setTimeout(()=>{try{if(S&&S.alive&&!choice._cur&&!modalOpen)vowOffer()}catch(e){}},5600);return}const v=x.v;if(v.done)return;const V=VW.find(z=>z.id===v.id);if(!V)return;
 if(V.ty==='mut'&&!v.mt&&S.age>=v.st+12&&MUT[V.id]){v.mt=1;const M=MUT[V.id];v.chk=M[2];say(`🌀 <b>${L('ปณิธานกลายพันธุ์','Your vow mutates')}</b>: 「${es(L(V.n[0],V.n[1]))}」 → <b>${es(L(M[0],M[1]))}</b>`,'myth',true);isl('🌀',L('ปณิธานกลายพันธุ์','Vow mutated'),L(M[0],M[1]))}
 if(V.ty==='sec'&&!v.sh&&S.age>=V.dl-15){v.sh=1;say(`❔→🎯 ${L('ปณิธานลับเผยตัว','Your secret vow is revealed')}: ${es(L(V.d[0],V.d[1]))} ${L('ก่อนอายุ','by age')} ${V.dl}`,'epic')}
 const ok=vChk(v.chk||V.chk);if(ok){v.done=1;vowDone(v,V);if(v.alt){const A=VW.find(z=>z.id===v.alt);say(`⚖️ ${L('อีกคำสาบานหนึ่งแตกสลาย','The other oath shatters')}: ${es(L(A.n[0],A.n[1]))}`,'bad')}return}
 if(v.alt){const A=VW.find(z=>z.id===v.alt);if(A&&vChk(A.chk)){v.done=1;vowDone(v,A);say(`⚖️ ${L('อีกคำสาบานหนึ่งแตกสลาย','The other oath shatters')}: ${es(L(V.n[0],V.n[1]))}`,'bad');return}}
 if(S.age>=V.dl){v.done=1;vowFail(v,V)}}
function vowEnd(){const x=S&&S._xt;if(!x||!x.v||x.v.done)return;const V=VW.find(z=>z.id===x.v.id);if(V&&V.ty!=='wag')LSs('murim_xtVowCarry',V.id)}

// =================== 🌠 ปณิธานทะลุฟ้าดารา (ใส่เข้าระบบปณิธานเดิม: ขั้นทองแดง/เงิน/ทอง · สมุดปณิธาน) ===================
const SKG=[['skGene','ปลุกยีนถึงขั้น 5 ก่อนอายุ 30','Reach gene rank 5 before 30',3,()=>{const K=S.mw&&S.mw.sky;return K?((K.rk|0)+1)/5:0},()=>{const K=S.mw&&S.mw.sky;return`${L('ขั้นยีน','gene rank')} ${K?(K.rk|0)+1:0} / 5`},()=>S.age>30&&!((S.mw&&S.mw.sky&&S.mw.sky.rk|0)>=4)],
 ['skRich','ลืมตาอ้าปากจากสลัม','Rise out of the slums',2,()=>(S.money||0)/300000,()=>`${fm(S.money||0)} / 300,000`],
 ['skVoice','เสียงของคนนอกกำแพง','Voice of Those Outside the Wall',2,()=>(S.karma||0)/120,()=>`${L('กรรม','karma')} ${Math.round(S.karma||0)} / 120`],
 ['skLong','รอดถึงอายุ 80 ในโลกหลังดาวตก','Survive to 80 after the meteor',2,()=>S.age/80,()=>`${S.age} / 80`],
 ['skFame','ชื่อสลักบนกำแพง','Your Name Carved on the Wall',3,()=>(S.fame||0)/4000,()=>`${fm(S.fame||0)} / 4,000`],
 ['skHunt','หัวหน้าหน่วยล่าอุกกาบาต','Captain of the Meteor Hunters',3,()=>((S._xl&&S._xl.sk&&S._xl.sk.hr)|0)/5,()=>`${L('ยศหน่วยล่า','hunter rank')} ${(S._xl&&S._xl.sk&&S._xl.sk.hr)|0} / 5`],
 ['skFree','ไม่พึ่งใคร','Answer to No One',2,()=>S.spouse?0:S.age/60,()=>S.spouse?L('❌ มีคู่แล้ว','❌ married'):`${S.age} / 60 ${L('ปี ตัวคนเดียว','years alone')}`,()=>!!S.spouse]];
try{if(typeof GOALS!=='undefined')SKG.forEach(g=>{if(GOALS.find(z=>z.id===g[0]))return;GOALS.push({id:g[0],lv:g[3],sp:()=>false,sky:1,n:g[1],d:g[1],c:()=>g[4]()>=1,pr:()=>cl(g[4](),0,1),p:g[5],brk:g[6]})})}catch(e){}
let skSel=null,skOpts=null;
setInterval(()=>{try{const R=document.querySelector('#skB .skR');if(!R||!R.offsetParent){skOpts=null;return}if(R.querySelector('.xtSkG'))return;if(!skOpts){skOpts=shuf(SKG).slice(0,3).map(g=>g[0]);skSel=null}
 const act=R.querySelector('.sdAct');const h=`<div class="box xtSkG" style="padding:10px 12px;margin:0 0 10px"><div class="tag2" style="margin-bottom:6px">🎯 ${L('ปณิธานแรกเกิด — สำเร็จได้คะแนนและบันทึกในสมุดปณิธาน','Birth vow — counts toward score and your vow book')}</div>${skOpts.map(id=>{const g=SKG.find(z=>z[0]===id);return`<button class="opt${skSel===id?' sel':''}" data-skg="${id}" style="width:100%;text-align:left;margin:3px 0">${'⭐'.repeat(g[3])} ${es(L(g[1],g[2]))}</button>`}).join('')}<button class="opt${skSel==='none'?' sel':''}" data-skg="none" style="width:100%;text-align:left;margin:3px 0">🍃 ${L('ไม่ตั้งปณิธาน','No vow')}</button></div>`;
 if(act)act.insertAdjacentHTML('beforebegin',h);else R.insertAdjacentHTML('beforeend',h);R.querySelectorAll('[data-skg]').forEach(b=>b.onclick=()=>{skSel=b.dataset.skg;R.querySelectorAll('[data-skg]').forEach(z=>z.classList.toggle('sel',z.dataset.skg===skSel))})}catch(e){}},400);
setInterval(()=>{try{if(typeof window.skyOrgGo!=='function'||window.skyOrgGo._xt)return;const _g=window.skyOrgGo;const f=function(){const sel=skSel&&skSel!=='none'?skSel:null;skOpts=null;const r=_g.apply(this,arguments);if(sel)setTimeout(()=>{try{if(S&&S.alive&&S.mw&&S.mw.sky){S.goal=sel;S.gT=0;S.goalDone=false;S.gBrk=0;const g=SKG.find(z=>z[0]===sel);say(`🎯 ${L('ปณิธานแรกเกิด','Birth vow')}: <b>${es(L(g[1],g[2]))}</b>`,'epic')}}catch(e){}},1800);return r};f._xt=1;window.skyOrgGo=f;try{skyOrgGo=f}catch(e){}}catch(e){}},500);

// =================== 📖 แผง ===================
window.xtPanel=function(){const x=S&&S._xt;const B=LSg('murim_xtBook',{})||{};const nb=BASE.filter(t=>B[t.id]).length,nc=CB.filter(c=>B[c.id]).length;let h='';
 if(x){h+=x.t.map(id=>{const t=T[id],F=x.h[id]&&T[x.h[id]];const show=F||(t.ty===4?null:t);const ty=TY[t.ty]||TY[2];return`<div class="item" style="border-left:4px solid ${RN[(show||t).r][2]}"><b>${ty[0]} ${show?es(tN(show)):'❔ ???'}</b> <small class="tag2">${L(ty[1],ty[2])} · ${L(RN[(show||t).r][0],RN[(show||t).r][1])}</small><br><small>${show?es(L(show.d[0],show.d[1])):L('ซ่อนอยู่ — จะเผยเมื่อถึงเวลา','Hidden — reveals in time')}${show?'<br>'+es(fxAll(show.fx)):''}${t.ev&&!F?`<br>🌱 ${L('อายุ 30 วิวัฒน์ — กรรมดี 60+ / เงินมาก / อื่นๆ ได้ร่างต่างกัน','Evolves at 30 — good karma 60+ / wealth / otherwise, each a different form')}`:''}</small></div>`}).join('');
  if(x.cb.length)h+=x.cb.map(cid=>{const c=CB.find(z=>z.id===cid);return`<div class="item" style="border-left:4px solid #ff9ad8"><b>🔗 ${es(L(c.n[0],c.n[1]))}</b><br><small>${es(fxAll(c.fx))}</small></div>`}).join('');
  if(x.echo&&!x.echoOn)h+=`<div class="item">👻 ${L('เสียงสะท้อนจากชาติก่อน — ตื่นตอนอายุ 20','Echo of a past life — wakes at 20')}</div>`;
  if(x.v){const V=VW.find(z=>z.id===x.v.id);if(V)h+=`<div class="item" style="border-left:4px solid #ffcf4d">🎯 <b>${L('ปณิธานชะตา','Vow of fate')}</b>: ${V.ty==='sec'&&!x.v.sh?'❔ '+es(L(V.n[0],V.n[1])):es(L(V.d[0],V.d[1]))} ${x.v.done?'✅':`· ${L('ก่อนอายุ','by age')} ${V.dl}`}${x.v.mt?' 🌀':''}${x.v.dbl?' ×2':''}</div>`}}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌟 ${L('พรสวรรค์ลิขิต','Fated Gifts')}</h3><p class="tag2">${L('สุ่มมาพร้อมกำเนิดทุกโลก · สองคม · วิวัฒน์ · ซ่อน · เปลี่ยนกติกา · ผูกกับคนอื่น · คอมโบ','Rolled at birth in every world · double-edged · evolving · hidden · rule-bending · bonded · combos')}</p>${h||`<div class="item tag2">${L('ยังไม่มี','None yet')}</div>`}
 <div class="item">📖 ${L('สมุดพรสวรรค์','Gift book')}: <b>${nb}/${BASE.length}</b> · 🔗 ${L('คอมโบที่ค้นพบ','combos found')}: <b>${nc}/${CB.length}</b><div style="height:8px;background:#0005;border-radius:4px;margin-top:6px"><div style="height:8px;width:${Math.round(nb/BASE.length*100)}%;background:linear-gradient(90deg,#6aa8ff,#ffcf4d);border-radius:4px"></div></div></div>`,'xtp')};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const m=$('modal');if(S&&S.alive&&m&&!m.querySelector('.xtB')){const b=document.createElement('button');b.className='gbtn xtB';b.style.cssText='width:100%;margin-top:6px';b.textContent='🌟 '+L('พรสวรรค์ลิขิต','Fated Gifts');b.onclick=()=>xtPanel();m.appendChild(b)}}catch(e){}return r}}

// =================== 🎨 อนิเมชัน ===================
const st=document.createElement('style');st.textContent=`
.xtCard{position:relative;overflow:hidden;border-color:var(--xc)!important;box-shadow:0 0 0 1px var(--xc) inset}
.xtCard .xtTy{font-size:10px;padding:1px 6px;border-radius:8px;background:#ffffff14;margin-left:4px}
.xtCard .xtFx{font-size:11px;color:var(--xc);font-weight:600}
.xtCard.xtAn{animation:xtIn .75s cubic-bezier(.2,1.4,.4,1) both;animation-delay:var(--xd)}
@keyframes xtIn{0%{opacity:0;transform:perspective(600px) rotateY(95deg) scale(.85)}55%{opacity:1;transform:perspective(600px) rotateY(-10deg) scale(1.04)}100%{opacity:1;transform:none}}
.xtCard .xtShine{position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,#ffffff55 50%,transparent 65%);transform:translateX(-120%);animation:xtSh 1.3s ease-out both;animation-delay:calc(var(--xd) + .45s);pointer-events:none}
@keyframes xtSh{to{transform:translateX(120%)}}
.xtCard.xr3{background:linear-gradient(135deg,#3a2a08,#1a1424 60%)!important;box-shadow:0 0 18px #ffcf4d55,0 0 0 1px var(--xc) inset}
.xtCard.xr3.xtAn{animation:xtIn .75s cubic-bezier(.2,1.4,.4,1) both,xtGlow 2.4s ease-in-out infinite;animation-delay:var(--xd),calc(var(--xd) + .8s)}
@keyframes xtGlow{50%{box-shadow:0 0 30px #ffcf4daa,0 0 0 1px var(--xc) inset}}
.xtCard.xr9{background:linear-gradient(135deg,#3a0a14,#1a1018 60%)!important}
.xtCard.xr9.xtAn{animation:xtIn .75s both,xtCurse 1.8s steps(2) infinite;animation-delay:var(--xd),calc(var(--xd) + .8s)}
@keyframes xtCurse{50%{box-shadow:0 0 16px #ff2a4a88,0 0 0 1px #ff5a6a inset}}
.xtCard.xtHid .v{animation:xtGl 1.6s steps(3) infinite;letter-spacing:3px}
@keyframes xtGl{0%{opacity:1;transform:none}33%{opacity:.5;transform:translateX(2px) skewX(-8deg)}66%{opacity:.9;transform:translateX(-2px)}}
.xtCard.xtCmb{background:linear-gradient(135deg,#3a1030,#1a1424 60%)!important}
.xtCard.xtMerge{animation:xtMg 1s cubic-bezier(.2,1.5,.4,1) both;animation-delay:var(--xd)}
@keyframes xtMg{0%{opacity:0;transform:scale(.4);filter:blur(6px) brightness(3)}60%{opacity:1;transform:scale(1.08);filter:none}100%{transform:none}}
#traits>.xtCard,#skTr>.xtCard,.brtr>.xtCard{grid-column:1/-1}
`;document.head.appendChild(st);
window._xt={T,BASE,CB,VW,X,roll1,rollSet,begin,active,reveal,evolve,comboCheck,vowOffer,vowYear};
})()}catch(e){console.error('xt.js',e)}
wReady('xt');
