// ============================================================
// /w/help.js 🧭 ช่วยผู้เล่นไม่งง — ทุกโลกทุกโหมด
//  1) 🧭 ทำไมไปต่อไม่ได้ (☰ เมนู / แผง 🎯): เป้าหมายตอนนี้ (goalInfo) + ตรวจเกมค้าง แล้วแก้ให้ทันที
//     เกมหยุด · เหตุการณ์รอตอบแต่ไม่ขึ้น · คิวเหตุการณ์ของชีวิตเก่าค้าง · ทะลุฟ้าดาราติดด่าน (_skyUnstick) · หน้าต่างค้าง
//  2) 🐞 แจ้งบั๊กแนบข้อมูลเอง: โลก/ขั้น/เป้าหมาย/เหตุการณ์ค้าง/ออโต้/จอ/error ล่าสุด (ไม่มีข้อมูลส่วนตัว) ต่อหน้า bugInfo เดิม
//  3) 🤖 ออโต้ฉลาดขึ้น (LS murim_autoCfg): เลี่ยงตัวเลือกเสี่ยง · หยุดเมื่อเจอเหตุการณ์สำคัญ · หยุดเมื่อเงินลดต่ำกว่า X% · สรุปตอนหยุด
//  4) 🏬 ร้านสมบัติ: กล่อง "⭐ คุ้มสำหรับคุณตอนนี้" (คิดจากผลจริงต่อเงินที่มี + สิ่งที่ขาด)
//  5) ⭐ ดาวเหนือนิรันดร์ (แดนเทพชั้นสูงสุด): เป้าหมายใหม่ในแผง 🎯 · สถิติข้ามชาติ murim_ovs · ดาวใหม่ = +1 แต้มเส้นทางชะตา
// ============================================================
try{(()=>{
const $$=id=>document.getElementById(id),E=s=>{try{return esc(String(s))}catch(e){return String(s)}};
const LSG=(k,d)=>{try{const v=LS.get(k,d);return v==null?d:v}catch(e){return d}},LSS=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const N=n=>{try{return fmt(n)}catch(e){return String(n)}},M=n=>{try{return fmtM(n)+' '+(typeof curW==='function'?curW():'')}catch(e){return String(n)}};
const strip=t=>String(t||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const alive=()=>!!(S&&S.alive);
const WK=()=>{try{if(!S)return'หน้าแรก';if(S.beastMode)return'สัตว์อสูร';if(S.mw){if(S.mw.fog)return'ม่านหมอก';if(S.mw.sky)return'ทะลุฟ้าดารา';return'ยุคปัจจุบัน'}if(S.ch==='soul')return'จิตวิญญาณยุทธ์';if(S.ch==='regress')return'ผู้ย้อนกาล';if(S.xt)return'แดนเทพ';if(S.xian)return'โลกเซียน'}catch(e){}return'ยุทธภพ'};

// ---------- error ล่าสุด (ไว้แนบตอนแจ้งบั๊ก) ----------
const ERR=[];const er=m=>{try{const t=String(m||'').slice(0,140);if(!t||/Failed to load|ResizeObserver|Script error/.test(t))return;if(ERR[ERR.length-1]===t)return;ERR.push(t);if(ERR.length>5)ERR.shift()}catch(e){}};
addEventListener('error',e=>er(e&&(e.message||e.error)));addEventListener('unhandledrejection',e=>er(e&&e.reason&&(e.reason.message||e.reason)));
{const ce=console.error;console.error=function(){try{er([...arguments].map(x=>x&&x.message||x).join(' '))}catch(e){}return ce.apply(this,arguments)}}

// ---------- 1) ทำไมไปต่อไม่ได้ ----------
function rank(){try{if(!S)return'';if(S.mw&&S.mw.sky&&window._sky){const K=_sky.SK(),R=_sky.RK;if(K&&K.rk>=0)return`ขั้น ${K.rk+1}/36 ${R[K.rk].n} ${K.sub>=10?'สมบูรณ์':'ชั้น '+K.sub+'/9'}`}const r=typeof realmLabel==='function'?realmLabel():null;return r?`${r.base} ${r.sub||''}`:''}catch(e){return''}}
function checks(){const L=[];if(!alive())return L;
 if(paused)L.push(['⏸️','เกมหยุดอยู่','เวลาไม่เดินจนกว่าจะกดเล่นต่อ','▶ เล่นต่อ',()=>{paused=false;render()}]);
 if(choice._cur&&!(modalOpen&&$$('modal')&&$$('modal').dataset.k==='choice'))L.push(['📩','มีเหตุการณ์รอให้ตอบ',`“${strip(choice._cur.title).slice(0,40)}” — ต้องเลือกก่อน เวลาถึงจะเดินต่อ`,'เปิดเหตุการณ์',()=>{choice._min=false;closeM();setTimeout(()=>{try{choiceShow()}catch(e){}},150)}]);
 const st=(choice._q||[]).filter(q=>q&&q[3]!==S).length;if(st)L.push(['🧹',`เหตุการณ์ค้างจากชีวิตก่อน ${st} เรื่อง`,'อยู่ในคิวแต่จะไม่มีวันขึ้น','ล้างคิว',()=>{choice._q=(choice._q||[]).filter(q=>q&&q[3]===S)}]);
 try{if(S.mw&&S.mw.sky&&window._sky){const K=_sky.SK(),R=_sky.RK;if(K&&K.rk>=0&&K.sub>=10&&K.rk<R.length-1){let ok=false;try{ok=R[K.rk].g(K)}catch(e){}if(!ok)L.push(['🔑','ด่านข้ามขั้นยังไม่ผ่าน',`ต้อง: ${R[K.rk].gate}`,'เรียกด่านมาอีกครั้ง',()=>{try{window._skyUnstick&&_skyUnstick();toast('🔑 เรียกด่านแล้ว จะขึ้นในปีถัดไป')}catch(e){}}])}}}catch(e){}
 if(typeof auto!=='undefined'&&auto)L.push(['🤖','ออโต้เปิดอยู่','ออโต้จะเลือกแทนให้ แต่ตัวเลือกย้ายโลก/ตัวเลือกที่ต้องกดเองจะรอคุณ','ตั้งค่าออโต้',()=>aOpen()]);
 return L}
window.whyStuck=function(){try{const g=typeof goalInfo==='function'?goalInfo():null,C=checks();window._wsC=C;
 const bar=x=>{const p=x.n?Math.min(100,Math.round(x.c/x.n*100)):100,ok=x.c>=x.n;return`<div class="wsB"><span>${x.ic} ${E(x.l)} <b style="color:${ok?'#5ad87a':'inherit'}">${N(Math.floor(x.c))}/${N(x.n)}</b>${!ok&&x.h?` <small>← ${x.h}</small>`:ok?' ✅':''}</span><i><u style="width:${p}%"></u></i></div>`};
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🧭 ทำไมไปต่อไม่ได้</h3>
 <p class="tag2">${E(WK())}${rank()?' · '+E(rank()):''}${S?` · อายุ ${N(S.age)} ปี`:''}</p>
 ${g?`<div class="wsG"><b>🎯 ${E(g.t)}</b>${g.note?`<p>${g.note}</p>`:''}${(g.L||[]).map(bar).join('')}${g.L&&g.L.length&&g.L.every(x=>x.c>=x.n)?'<p class="tag2">✅ ค่าครบแล้ว รอเหตุการณ์ทะลวง/ทัณฑ์ ซึ่งจะมาเองระหว่างเล่น</p>':''}</div>`:'<p>ยังไม่ได้อยู่ในชีวิตไหน</p>'}
 <h5>🔧 ตรวจเกมค้าง</h5>${C.length?C.map((c,i)=>`<div class="wsC"><div><b>${c[0]} ${E(c[1])}</b><br><small>${E(c[2])}</small></div><button class="sysb" onclick="window._wsC[${i}][4]();setTimeout(whyStuck,250)">${E(c[3])}</button></div>`).join(''):'<p class="tag2">✅ ไม่พบอะไรค้าง เกมเดินปกติ</p>'}
 <h5>ยังติดอยู่?</h5><button class="gbtn" style="width:100%" onclick="whyBug()">🐞 แจ้งบั๊ก (แนบข้อมูลนี้ให้อัตโนมัติ)</button>`,'whystuck')}catch(e){console.error('whyStuck',e);toast('เปิดไม่ได้')}};
window.whyBug=function(){try{closeM()}catch(e){}setTimeout(()=>{try{BUGK='bug';openReport()}catch(e){}},200)};

// ---------- 2) แจ้งบั๊กแนบข้อมูลเอง ----------
function diag(){try{const L=[`🌍 ${WK()}${S&&S.ch&&S.ch!=='normal'?' · โหมด '+S.ch:''}${rank()?' · '+rank():''}`];
 if(S){L.push(`อายุ ${S.age} · ${S.alive?'มีชีวิต':'จบแล้ว'} · พลัง ${N(Math.round(total()))}${S.xt&&typeof postLv==='function'?' · ชั้นเทพ '+postLv():''}`);
  try{const g=goalInfo();if(g)L.push(`🎯 ${strip(g.t)}${g.note?' — '+strip(g.note).slice(0,80):''}`)}catch(e){}
  if(choice._cur)L.push(`📩 รอตอบ: ${strip(choice._cur.title).slice(0,50)}${choice._min?' (ย่อไว้)':''}`);
  const q=(choice._q||[]).length;if(q)L.push(`คิว ${q} เรื่อง`);
  try{if(S.mw&&S.mw.sky&&window._sky){const K=_sky.SK();if(K)L.push(`sky rk${K.rk} sub${K.sub} xp${Math.round(K.xp)} q:${(window._skyQ?_skyQ():[]).slice(0,5).join(',')}`)}}catch(e){}}
 L.push(`${paused?'⏸':'▶'} ออโต้${typeof auto!=='undefined'&&auto?'เปิด':'ปิด'} · จอ ${innerWidth}×${innerHeight}${modalOpen&&$$('modal')?' · หน้าต่าง '+$$('modal').dataset.k:''}`);
 if(ERR.length)L.push('⚠️ '+ERR.slice(-3).join(' | '));return L.join('\n')}catch(e){return'diag error'}}
{const _bi=bugInfo;bugInfo=function(){let b='';try{b=_bi.apply(this,arguments)}catch(e){}const d=diag();return(d+'\n---\n'+b).slice(0,1500)}}
// หน้าแจ้งบั๊ก: บอกผู้เล่นว่าแนบข้อมูลให้แล้ว
setInterval(()=>{try{const t=$$('bugTx');if(!t||t.dataset.dg)return;t.dataset.dg=1;const p=document.createElement('p');p.className='tag2';p.style.margin='4px 0';p.innerHTML='📎 แนบข้อมูลเกมให้อัตโนมัติ: โลก ขั้น เป้าหมาย เหตุการณ์ที่ค้าง และ error ล่าสุด · ไม่มีข้อมูลส่วนตัว — เขียนแค่ว่าเกิดอะไรขึ้นก็พอ';t.insertAdjacentElement('afterend',p)}catch(e){}},800);

// ---------- 3) ออโต้ฉลาดขึ้น ----------
const AK='murim_autoCfg',AC=()=>Object.assign({risk:1,money:50,sum:1},LSG(AK,{})||{},{stop:!LSG('murim_fa',0)?1:0});
const IMP=/แต่งงาน|ขอแต่ง|ทะลวง|ทัณฑ์|ฉากจบ|ฟ้าสุดท้าย|สืบทอด|ภารกิจชาตินี้|ประตู|รอยแยก|เลือกโลก|ทางแยก|ทายาท|หลงยุค|แปลงกาย/;
const RISK=/เสี่ยง|ดวลจริง|ตาย|อันตราย|เดิมพัน/;
let AS=null;
function aStart(){lastBig='';AS={a:S.age,p:total(),m:S.money||0,k:S.karma||0,f:S.fame||0,h:S.maxHp||0,ev:[],t:Date.now(),why:''}}
function aStop(why){const c=AC();if(AS&&why)AS.why=why;if(typeof auto!=='undefined'&&auto){auto=false;try{render()}catch(e){}}if(why)try{island({big:1,pri:1,ic:'🤖',h:'ออโต้หยุดให้แล้ว',t:why,kind:'gold',ms:5000})}catch(e){}const A=AS;AS=null;if(c.sum&&A&&alive()&&S.age-A.a>=2)setTimeout(()=>aSum(A),why?1200:300)}
function aSum(A){try{if(!A||!alive())return;const d=(x,y,f)=>{const v=x-y;return`<b style="color:${v>=0?'#5ad87a':'#ff7a7a'}">${v>=0?'+':'−'}${f(Math.abs(v))}</b>`};
 const html=`<button class="xbtn" onclick="closeM()">✕</button><h3>🤖 ระหว่างออโต้เกิดอะไรขึ้น</h3>${A.why?`<p class="aWhy">⏸ ${E(A.why)}</p>`:''}
 <div class="aGr"><div>⏳ ผ่านไป<b>${N(S.age-A.a)} ปี</b></div><div>⚔️ พลังรวม${d(total(),A.p,N)}</div><div>💰 เงิน${d(S.money||0,A.m,v=>fmtM(v))}</div><div>☯️ กรรม${d(S.karma||0,A.k,N)}</div><div>📣 ชื่อเสียง${d(S.fame||0,A.f,N)}</div><div>❤️ เลือดสูงสุด${d(S.maxHp||0,A.h,N)}</div></div>
 ${A.ev.length?`<h5>📜 เรื่องสำคัญ</h5><ul class="aEv">${A.ev.slice(-12).map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
 <p class="tag2">ปิดสรุปนี้ได้ที่ 🤖 ตั้งค่าออโต้</p>`;
 const show=()=>{if(!alive())return;if(choice._cur||modalOpen)return setTimeout(show,1500);modal(html,'autosum')};show()}catch(e){console.error('aSum',e)}}
{const _ta=toggleAuto;toggleAuto=function(){const was=auto;const r=_ta.apply(this,arguments);try{if(!was&&auto&&alive()){aStart();if(!LSG('murim_autoTip',0)){LSS('murim_autoTip',1);setTimeout(()=>{try{island({ic:'🤖',h:'ออโต้แบบใหม่',t:'เลี่ยงตัวเลือกเสี่ยง · หยุดเมื่อเจอเรื่องสำคัญ · มีสรุปตอนกลับมา — ตั้งค่าได้ที่ ☰ → 🤖',ms:5000})}catch(e){}},900)}}else if(was&&!auto)aStop('')}catch(e){}return r}}
// เก็บเรื่องสำคัญระหว่างออโต้
{const _lg=log;log=function(t,c){try{if(AS&&auto&&(c==='myth'||c==='epic'||c==='bad')){const x=strip(t).slice(0,110);if(x&&AS.ev[AS.ev.length-1]!==x){AS.ev.push(E(x));if(AS.ev.length>40)AS.ev.shift()}}}catch(e){}return _lg.apply(this,arguments)}}
// เลี่ยงตัวเลือกเสี่ยง (ถ้ามีทางที่ปลอดภัยกว่า) — ใช้ระบบ noFate เดิม: ออโต้/ชะตาจะไม่เลือกให้
{const _c=choice;choice=function(title,text,opts){try{if(typeof auto!=='undefined'&&auto&&AC().risk&&Array.isArray(opts)&&opts.length>1){const rk=o=>o&&RISK.test(strip((o.t||'')+' '+(o.s||'')));if(opts.some(o=>o&&!rk(o)&&!o.skip&&!o.noFate)&&opts.some(rk))opts=opts.map(o=>rk(o)&&!o.noFate?Object.assign({},o,{_risk:1}):o)}}catch(e){}return _c.call(this,title,text,opts)};Object.keys(_c).forEach(k=>{try{choice[k]=_c[k]}catch(e){}})}
// ⚠️ เดิมใช้ noFate → ระบบเดิมถือว่าเป็น "เรื่องสำคัญ" ออโต้เลยหยุดแทบทุกคำถาม · ตอนนี้แค่ซ่อนตัวเลือกเสี่ยงชั่วคราวตอนชะตา/ออโต้เลือก
{const _fc=fateChoice;fateChoice=function(){const c=choice._cur,T=[];try{if(c&&AC().risk&&c.opts.some(o=>o._risk)&&c.opts.some(o=>!o._risk&&!o.skip&&!o.noFate))c.opts.forEach(o=>{if(o._risk&&!o.skip){o.skip=true;T.push(o)}})}catch(e){}try{return _fc.apply(this,arguments)}finally{T.forEach(o=>{o.skip=false})}}}
// หยุดเมื่อเจอเหตุการณ์สำคัญ
// หยุดเมื่อเจอเรื่องสำคัญ = ระบบเดิม murim_fa=0 (afBig) · ออโต้ถูกปิดจากทางไหนก็ตาม → โชว์สรุป
let lastBig='';{const _cs=choiceShow;choiceShow=function(){try{const c=choice._cur;if(c&&IMP.test(strip(c.title)))lastBig=strip(c.title).slice(0,40)}catch(e){}return _cs.apply(this,arguments)}}
setInterval(()=>{try{if(AS&&!(typeof auto!=='undefined'&&auto))aStop(lastBig?`เจอเหตุการณ์สำคัญ “${lastBig}” ให้คุณเลือกเอง`:'')}catch(e){}},1200);
// หยุดเมื่อเงินลดลงมาก
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{const c=AC();if(AS&&auto&&alive()&&c.money>0&&AS.m>1000&&(S.money||0)<AS.m*c.money/100)aStop(`เงินลดเหลือต่ำกว่า ${c.money}% ของตอนเริ่มออโต้`)}catch(e){}return r}}
function aOpen(){const c=AC(),row=(k,on,t,d)=>`<div class="wsC"><div><b>${t}</b><br><small>${d}</small></div><button class="sysb" onclick="aSet('${k}',${on?0:1})">${on?'✅ เปิด':'ปิด'}</button></div>`;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🤖 ตั้งค่าออโต้</h3>
 ${row('risk',c.risk,'🛡️ เลี่ยงตัวเลือกเสี่ยง','ถ้ามีทางที่ปลอดภัยกว่า ออโต้จะไม่เลือกตัวเลือกที่เขียนว่าเสี่ยง/ดวลจริง/อาจตาย')}
 ${row('stop',c.stop,'⏸️ หยุดเมื่อเจอเรื่องสำคัญ','แต่งงาน ทะลวงขั้น ทัณฑ์สวรรค์ ฉากจบ ประตูข้ามโลก สืบทอด — ให้คุณเลือกเอง')}
 ${row('sum',c.sum,'📋 สรุปตอนหยุดออโต้','บอกว่าผ่านไปกี่ปี ได้/เสียอะไร และเรื่องสำคัญที่เกิดขึ้น')}
 <div class="wsC"><div><b>💰 หยุดเมื่อเงินลดต่ำกว่า</b><br><small>เทียบกับเงินตอนเริ่มเปิดออโต้</small></div><span>${[0,30,50,80].map(v=>`<button class="sysb ${c.money===v?'on':''}" style="margin:2px" onclick="aSet('money',${v})">${v?v+'%':'ไม่หยุด'}</button>`).join('')}</span></div>
 <p class="tag2">ตัวเลือกย้ายโลก (รอยแยก/ประตู) ออโต้ไม่เลือกให้เสมอ</p>`,'autocfg')}
window.aOpen=aOpen;window.aSet=(k,v)=>{if(k==='stop'){LSS('murim_fa',v?0:1);return aOpen()}const c=AC();delete c.stop;c[k]=v;LSS(AK,c);aOpen()};

// ---------- 🛟 กันเกมค้าง (เจอจากรายงานผู้เล่น) ----------
// ก) ออโต้เปิดอยู่แต่เกมถูกหยุด (หน้าต่างที่หยุดเวลาถูกปิดโดยไม่คืนค่า) และไม่มีอะไรรอ → เดินเวลาต่อ
// ข) มีเหตุการณ์ค้างคิวแต่ปีไม่เดิน (เช่น ยืนอยู่ขอบกัลป์ อายุถูกตรึง งบเหตุการณ์ต่อปีเต็ม) นานเกิน 8 วิ → เปิดเหตุการณ์นั้นเลย
{let pz=0,qz=0;setInterval(()=>{try{if(!alive()||document.hidden)return;const idle=!choice._cur&&!modalOpen&&!(typeof DU!=='undefined'&&DU)&&!(window._mgBusy&&_mgBusy());
 if(typeof auto!=='undefined'&&auto&&paused&&idle){if(++pz>=2){pz=0;paused=false;try{render()}catch(e){}}}else pz=0;
 if(!paused&&idle&&choice._q&&choice._q.length){if(++qz>=4){qz=0;const q=choice._q.shift();if(q&&q[3]===S){S._chN=0;choice(q[0],q[1],q[2])}}}else qz=0}catch(e){}},2000)}
// ค) หน้าต่างที่หยุดเวลาไว้ (แนะนำโหมด ฉากพิเศษ ฯลฯ) ถูกปิดทางอื่น/ถูกหน้าต่างอื่นทับ → เดิมเกมหยุดค้างไม่มีปุ่มให้กด
//    จับเฉพาะการหยุดที่เกิดขึ้นตอนมีหน้าต่างเปิด (ไม่ยุ่งกับ ⏸ ที่ผู้เล่นกดเอง หรือ "เล่น N ปีแล้วหยุด")
{let pv=false,mp=false,uz=false,n=0;{const _tp=togglePause;togglePause=function(){const r=_tp.apply(this,arguments);uz=!!paused;mp=false;return r}}
 setInterval(()=>{try{if(!alive()){pv=false;mp=false;return}const p=!!paused;if(p&&!pv){mp=!uz&&!!modalOpen}if(!p){uz=false;mp=false}pv=p;
  if(p&&mp&&!modalOpen&&!choice._cur&&!(typeof DU!=='undefined'&&DU)&&!window._scrOpen&&!document.hidden&&!$$('coach')&&!$$('ctOv')){if(++n>=12){n=0;mp=false;paused=false;try{render()}catch(e){}}}else n=0}catch(e){}},250)}
// ---------- 4) ร้านสมบัติ: คุ้มสำหรับคุณตอนนี้ ----------
function pick(){try{if(!alive()||typeof ecoCat!=='function')return[];const w=ECO_W(),m=S.money||0;if(m<=0)return[];const t=total(),lsLeft=(()=>{try{return Math.max(1,(S.lifespan||80)-S.age)}catch(e){return 50}})(),hpR=S.maxHp?S.hp/S.maxHp:1;
 const out=[];for(const it of ecoCat(w)){if(!/^(pow|hp|qi|life)$/.test(it.fx))continue;const p=ecoPrice(it);if(p>m||p<=0)continue;let e;try{e=ecoV(it)}catch(x){continue}if(!e||!e.v)continue;let sc=0,why='';
  if(it.fx==='pow'){const g=typeof ppPeek==='function'?ppPeek(e.v):t*e.v;sc=g/Math.max(1,t);why=`พลังรวม +${N(g)}`}
  else if(it.fx==='hp'){sc=e.v*(hpR<.5?2:1)*.8;why=`เลือดสูงสุด +${Math.round(e.v*100)}%${hpR<.5?' · ตอนนี้เลือดเหลือน้อย':''}`}
  else if(it.fx==='life'){if(S.xt){sc=0}else{sc=e.v/lsLeft*(lsLeft<15?3:1);why=`อายุขัย +${N(e.v)} ปี${lsLeft<15?' · ใกล้สิ้นอายุขัยแล้ว':''}`}}
  else if(it.fx==='qi'){sc=e.v/Math.max(5,S.qi||0)*.5;why=`ลมปราณ +${N(e.v)} ปี`}
  if(sc<=0)continue;const val=sc/Math.sqrt(p/m);out.push({it,p,why,val})}
 out.sort((a,b)=>b.val-a.val);const seen=new Set();return out.filter(x=>{if(seen.has(x.it.fx))return false;seen.add(x.it.fx);return true}).slice(0,4)}catch(e){console.error('shop pick',e);return[]}}
function shopBox(){try{const md=$$('modal');if(!md||md.dataset.k!=='shop2'||md.querySelector('.spRec'))return;const L=pick();if(!L.length)return;
 const d=document.createElement('div');d.className='spRec';d.innerHTML=`<b>⭐ คุ้มสำหรับคุณตอนนี้</b> <small class="tag2">คิดจากผลที่ได้จริงเทียบกับเงินที่มี และสิ่งที่ขาดอยู่</small>${L.map(x=>`<div class="spR"><span>${E(x.it.n)} ${rarTag(x.it.r)}<br><small>${E(x.why)}</small></span><button class="sysb" data-id="${E(x.it.id)}">${fmtM(x.p)}</button></div>`).join('')}`;
 d.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>{try{ecoBuy(b.dataset.id)}catch(e){}});
 const at=md.querySelector('.tabs');if(at)at.insertAdjacentElement('beforebegin',d);else md.appendChild(d)}catch(e){}}
{const _m=modal;modal=function(h,k){const r=_m.apply(this,arguments);if(k==='shop2')setTimeout(shopBox,30);return r};for(const k in _m)try{modal[k]=_m[k]}catch(e){}}

// ---------- 5) ดาวเหนือนิรันดร์ ----------
const OVK='murim_ovs';
function ovNow(){try{return typeof ovStar==='function'?ovStar():0}catch(e){return 0}}
{const _gi=goalInfo;goalInfo=function(){const g=_gi.apply(this,arguments);try{if(g&&alive()&&S.xt&&S.pv2&&typeof postLv==='function'&&postLv()>=RS_MAX){const n=ovNow(),b=postP(RS_MAX),nx=b*(1+(n+1)*.02),best=LSG(OVK,0)|0;
  return{t:`⭐ ดาวเหนือนิรันดร์ ${n} ดวง`,note:`ถึงชั้นสูงสุดของแดนเทพแล้ว พลังรวมเกินเพดานทุก 2% = ดาว 1 ดวง · <b>ดาวใหม่ทุกดวง ของพลังรวมถาวรได้เต็มอีกรอบ</b> · สถิติสูงสุดข้ามชาติ ${best} ดวง · ดาวที่เกินสถิติ = +1 แต้ม🔮`,L:[{ic:'⚔️',l:'พลังรวม',c:total(),n:nx,h:'🏬 ของพลังรวมถาวร · ฝึก · วิชา'}]}}}catch(e){}return g}}
setInterval(()=>{try{if(!alive()||!S.xt)return;const n=ovNow();if(!n)return;const best=LSG(OVK,0)|0;if(n>best){LSS(OVK,n);try{const P=window._hk&&_hk.P();if(P){P.p+=n-best;_hk.SV(P)}}catch(e){}try{island({big:1,ic:'⭐',h:'ดาวเหนือนิรันดร์ดวงใหม่',t:`${n} ดวง · สถิติใหม่ · +${n-best} แต้ม🔮 · ของพลังรวมถาวรได้เต็มอีกรอบ`,kind:'gold',ms:5000})}catch(e){}}}catch(e){}},3000);

// ---------- 🧹 เมนู: หมวด ⭐ ใช้บ่อย ยาวเกิน (ระบบใหม่ถูกดันเข้าหมวดนี้เรื่อยๆ จนเกือบ 30 ปุ่ม) → โชว์ 10 ปุ่ม (ที่คุณกดบ่อยขึ้นก่อน) ที่เหลือพับไว้ ----------
function favTrim(m){try{if(!m||m.dataset.k!=='menu'||m._ft)return;const h=[...m.querySelectorAll('h4')].find(x=>/ใช้บ่อย/.test(x.textContent));let g=h&&h.nextElementSibling;while(g&&!g.matches('.mgrid'))g=g.nextElementSibling;if(!g)return;
 const B=[...g.children].filter(b=>b.tagName==='BUTTON'&&!b.classList.contains('mnMoreB'));if(B.length<=12)return;m._ft=1;
 const cnt=LSG('murim_mnc',{})||{},key=b=>{try{return 'menu|'+mnKey(b)}catch(e){return''}};
 const rank=B.map((b,i)=>({b,i,c:(cnt[key(b)]|0)+(b.classList.contains('wsMB')&&/ทำไม/.test(b.textContent)?99:0)})).sort((x,y)=>y.c-x.c||x.i-y.i);
 const keep=new Set(rank.slice(0,10).map(x=>x.b));B.forEach(b=>{if(!keep.has(b))b.classList.add('mnMoreH')});
 rank.slice(0,10).forEach(x=>g.appendChild(x.b)); // ปุ่มที่โชว์เรียงตามที่กดบ่อย
 const more=document.createElement('button');more.type='button';more.className='opt mnMoreB';more.style.gridColumn='1/-1';more.innerHTML=`▾ อีก ${B.length-10} ระบบในหมวดนี้<small>แตะเพื่อดูทั้งหมด · หรือพิมพ์ค้นหาด้านบน</small>`;
 more.onclick=()=>{g.querySelectorAll('.mnMoreH').forEach(b=>b.classList.remove('mnMoreH'));more.remove()};g.appendChild(more);
 const q=m.querySelector('.mnSearch input');if(q)q.addEventListener('input',()=>{if(q.value)more.click()})}catch(e){console.error('favTrim',e)}}
// ---------- ปุ่มใน ☰ เมนู ----------
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const m=$$('modal'),g=m&&m.querySelector('.mgrid');if(g&&!m.querySelector('.wsMB')){const mk=(t,f)=>{const b=document.createElement('button');b.className='opt wsMB';b.innerHTML=t;b.onclick=f;return b};g.insertBefore(mk('🧭 ทำไมไปต่อไม่ได้<small>เช็คเป้าหมาย · แก้เกมค้าง</small>',()=>whyStuck()),g.children[1]||null);g.insertBefore(mk('🤖 ตั้งค่าออโต้<small>เลี่ยงเสี่ยง · หยุดเรื่องสำคัญ · สรุป</small>',()=>aOpen()),g.children[2]||null)}setTimeout(()=>favTrim($$('modal')),60)}catch(e){}return r}}

const st=document.createElement('style');st.textContent=`
.wsG{padding:10px 12px;border-radius:12px;border:1.5px solid #c9a24a88;background:#c9a24a14;margin:6px 0}.wsG p{margin:4px 0;font-size:13px}
.wsB{margin:6px 0;font-size:13px}.wsB i{display:block;height:7px;border-radius:5px;background:#8884;overflow:hidden;margin-top:3px}.wsB u{display:block;height:100%;background:linear-gradient(90deg,#e0a030,#5ad87a)}
.wsC{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;margin:5px 0;border-radius:10px;border:1px solid var(--line,#5554);font-size:13.5px}.wsC .sysb{white-space:nowrap}.wsC .sysb.on{outline:2px solid #e0a030}
.aGr{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.aGr div{padding:8px;border-radius:10px;border:1px solid var(--line,#5554);font-size:12px;text-align:center}.aGr b{display:block;font-size:15px}
.aEv{margin:4px 0;padding-left:18px;font-size:13px;line-height:1.5}.aWhy{padding:6px 10px;border-radius:10px;background:#e0a03022;font-weight:700}
.mnMoreH{display:none!important}.spRec{margin:6px 0 10px;padding:10px 12px;border-radius:12px;border:1.5px solid #e0a030;background:linear-gradient(160deg,#e0a03022,transparent)}.spR{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-bottom:1px dashed var(--line,#5554);font-size:13px}.spR:last-child{border:0}
@media (max-width:420px){.aGr{grid-template-columns:repeat(2,1fr)}}
`;document.head.appendChild(st);
window._help={diag,checks,pick,AC,aStart,aStop,ovNow};
})()}catch(e){console.error('help',e)}
wReady('help');
