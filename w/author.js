// ============================================================
// /w/author.js 🧵 ผู้ประพันธ์ชะตา (เฟส 1) — ทุกโลก
//  1) ทุกตอนจบ = ด้ายชะตา 1 เส้นของโลกนั้น + หมึกชะตา (อายุ 60+ / โลกแรก / ระดับ S·ฉากจบลับ ได้เพิ่ม)
//  2) มีด้ายครบ 4 โลก → ตอนจบมีโอกาสขึ้น "✋ ไม่ยอมรับตอนจบนี้" (ครั้งแรก 50% · ต่อไป 25% · พลาด 4 ครั้งติดได้แน่)
//  3) ฉากด้ายเส้นเวลาของทุกชีวิตที่เคยเล่น → 🪑 บัลลังก์ด้ายกาล: ใช้หมึกเขียนบทนำชีวิตถัดไป
//     (โลก · พรกำเนิด สูงสุด 2 · เส้นเรื่องหลัก story.js · กฎโลกพลิก twist.js)
//  4) เริ่มชีวิตใหม่ในโลกที่เลือก → บทนำทำงาน · ชีวิตที่เขียนเองไม่ขึ้นทำเนียบ (S.custom)
//  ข้อมูล: LS murim_thr {w:{โลก:จำนวน}, ink, log[], miss, seen, pend} · ในเซฟ: S._au
// ============================================================
try{(()=>{
const KEY='murim_thr',NEED=4;
const WN={murim:['⚔️','ยุทธภพ','#e8c86a'],xian:['☁️','เซียน','#8fd3ff'],god:['🌟','แดนเทพ','#ffd76a'],soul:['🔮','จิตวิญญาณยุทธ์','#c79bff'],loop:['⏳','ผู้ย้อนกาล','#7cffd0'],
 mw:['🏙️','ยุคปัจจุบัน','#ff9a6b'],sky:['🌌','ทะลุฟ้าดารา','#6bb8ff'],fog:['🌫️','โลกหมอก','#c6d0da'],beast:['🐺','สัตว์อสูร','#9be37a']};
const CAN=['murim','xian','soul','mw','sky','fog'];/* โลกที่เขียนบทนำได้ */
const STW={murim:'murim',xian:'xian',soul:'soul',mw:'mw',sky:'sky'};/* ชื่อโลกใน story.js */
const TWW={murim:1,xian:1,soul:1};/* โลกที่มีกฎโลกพลิก */
const BOON={int:['🧠','ปัญญาเหนือวัย','ปัญญา +15'],body:['💪','กายาฟ้าประทาน','พลังชีวิตสูงสุด +30%'],life:['⏳','ด้ายยาว','อายุขัย +10 ปี'],rich:['💰','เกิดบนกองทรัพย์','เงินก้อนแรกเกิด']};
const COST={boon:2,arc:3,tw:2};
const $=id=>document.getElementById(id);
const E=t=>{try{return esc(String(t))}catch(e){return String(t).replace(/[<>&"]/g,'')}};
const rp=a=>a[Math.floor(Math.random()*a.length)];
const G=()=>{let d=null;try{d=LS.get(KEY,null)}catch(e){}d=d&&typeof d==='object'?d:{};d.w=d.w&&typeof d.w==='object'?d.w:{};d.ink=Math.max(0,+d.ink||0);d.log=Array.isArray(d.log)?d.log:[];d.miss=d.miss|0;return d};
const SV=d=>{try{LS.set(KEY,d)}catch(e){}};
const WK=()=>{try{if(!S)return'';if(S.beastMode)return'beast';if(S.mw){if(S.mw.fog)return'fog';if(S.mw.sky)return'sky';return'mw'}if(S.ch==='soul')return'soul';if(S.ch==='regress')return'loop';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'};
const nW=d=>Object.keys(d.w).filter(k=>WN[k]&&d.w[k]>0).length;

// ---------------------------------------------------------------- 1) เก็บด้ายตอนจบ
function rec(){try{if(!S||S._auE)return;const E0=$('end');if(!E0)return;S._auE=1;
 const d=G(),w=WK()||'murim',first=!d.w[w],txt=(E0.innerText||'');
 const big=/ระดับ\s*S|ฉากจบลับ|ฉากจบแท้|ฉากจบสูงสุด/.test(txt);
 const gain=1+((S.age|0)>=60?1:0)+(first?1:0)+(big?2:0);
 d.w[w]=(d.w[w]|0)+1;d.ink+=gain;
 d.log.push({w,n:String(S.name||'ไร้นาม').slice(0,24),a:S.age|0,au:S._au?1:0});if(d.log.length>40)d.log=d.log.slice(-40);
 const n=nW(d);let hit=false;
 if(n>=NEED){const p=d.miss>=4?1:(d.seen?.25:.5);hit=Math.random()<p;if(hit)d.miss=0;else d.miss++}
 SV(d);box(E0,d,gain,first,big,hit)}catch(e){console.error('au rec',e)}}
function box(E0,d,gain,first,big,hit){try{E0.querySelector('.auEnd')?.remove();const n=nW(d),el=document.createElement('div');el.className='auEnd'+(hit?' hit':'');
 const why=[first?'โลกใหม่':'',big?'ตอนจบหายาก':'',(S&&S.age|0)>=60?'อายุยืน':''].filter(Boolean).join(' · ');
 const dots=Object.keys(WN).map(k=>`<span class="auDot${d.w[k]?' on':''}" style="--c:${WN[k][2]}" title="${WN[k][1]}">${WN[k][0]}</span>`).join('');
 el.innerHTML=hit?`<div class="auHit">🧵 ด้ายชะตาทุกเส้นสั่นไหวพร้อมกัน…</div><div class="auSub">มีเสียงหนึ่งกระซิบว่า ตอนจบนี้ยังไม่จำเป็นต้องเป็นของคุณ</div>
  <button class="auBtn" type="button">✋ ไม่ยอมรับตอนจบนี้</button><div class="auSm">หมึกชะตา ${d.ink} (+${gain}${why?' · '+why:''})</div>`
 :`<div class="auRow"><b>🧵 ด้ายชะตา</b> ${dots}</div><div class="auSm">${n>=NEED?'ครบแล้ว — ด้ายเงียบในครั้งนี้ ตอนจบหน้าอาจมีโอกาส':`เก็บตอนจบให้ครบ ${NEED} โลก (ตอนนี้ ${n}/${NEED}) แล้วจะมีโอกาสปฏิเสธตอนจบ`} · หมึกชะตา ${d.ink} (+${gain}${why?' · '+why:''})</div>`;
 if(hit)el.querySelector('.auBtn').onclick=()=>{const d2=G();d2.seen=(d2.seen|0)+1;SV(d2);scene()};
 const at=E0.querySelector('.hkEnd')||E0.querySelector('.lfEnd')||E0.querySelector('h2,h3,.big');if(at)at.insertAdjacentElement('afterend',el);else E0.insertBefore(el,E0.firstChild)}catch(e){console.error('au box',e)}}
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);setTimeout(rec,950);return r}}

// ---------------------------------------------------------------- 2) ฉากด้ายเส้นเวลา
function ov(){let o=$('auOv');if(!o){o=document.createElement('div');o.id='auOv';document.body.appendChild(o)}o.classList.add('on');return o}
function shut(){const o=$('auOv');if(o){o.classList.remove('on');o.innerHTML=''}}
function scene(){const d=G(),o=ov(),L=d.log.slice(-14),W0=360,H0=420,cx=W0/2,cy=70;
 const paths=L.map((x,i)=>{const n=L.length,sx=20+(W0-40)*(n<2?.5:i/(n-1)),c=(WN[x.w]||WN.murim)[2],k=(i%2?1:-1)*(30+i*4);
  return`<path d="M${sx.toFixed(1)} ${H0-14} C ${(sx+k).toFixed(1)} ${H0*.62} ${(cx-k).toFixed(1)} ${H0*.34} ${cx} ${cy}" stroke="${c}" style="animation-delay:${(i*.12).toFixed(2)}s"/>`}).join('');
 const lab=L.slice().reverse().map(x=>`<li style="--c:${(WN[x.w]||WN.murim)[2]}">${(WN[x.w]||WN.murim)[0]} <b>${E(x.n)}</b> · ${(WN[x.w]||WN.murim)[1]} · ${x.a} ปี${x.au?' · ✍️':''}</li>`).join('');
 o.innerHTML=`<div class="auBox"><svg class="auSvg" viewBox="0 0 ${W0} ${H0}" aria-hidden="true">${paths}<circle cx="${cx}" cy="${cy}" r="9" class="auKnot"/></svg>
  <div class="auTx"><div class="auT">ทุกชีวิตที่คุณเคยเป็น ไม่เคยขาดจากกัน</div><div class="auSub">ด้าย ${d.log.length} เส้นจาก ${nW(d)} โลก มัดรวมเป็นปมเดียวกลางความว่าง และปลายด้ายทุกเส้นอยู่ในมือคุณ</div>
  <ul class="auL">${lab}</ul><button class="auBtn" type="button" id="auGo">🪑 ขึ้นบัลลังก์ด้ายกาล</button><button class="auX" type="button" id="auNo">ยอมรับตอนจบ</button></div></div>`;
 $('auGo').onclick=throne;$('auNo').onclick=shut}

// ---------------------------------------------------------------- 3) บัลลังก์ด้ายกาล
const F={w:'',b:[],arc:'',tw:''};
function arcsOf(w){try{const st=window._story;if(!st||!STW[w])return[];const k=STW[w];return st.ARCS.filter(a=>!a.need&&(a.w==='*'||(Array.isArray(a.w)?a.w.includes(k):String(a.w).split(/[,\s]/).includes(k))))}catch(e){return[]}}
function rulesOf(w){try{return TWW[w]&&window._tw?Object.entries(window._tw.RULE):[]}catch(e){return[]}}
function cost(){return F.b.length*COST.boon+(F.arc?COST.arc:0)+(F.tw?COST.tw:0)}
function throne(){const d=G(),o=ov();
 Promise.all([wLoad('story').catch(()=>{}),wLoad('twist').catch(()=>{})]).then(()=>{if($('auOv')&&$('auOv').classList.contains('on')&&$('auTh'))draw()});
 const ws=CAN.filter(k=>d.w[k]>0);if(!ws.includes(F.w))F.w=ws[0]||'murim';
 o.innerHTML=`<div class="auBox auTh" id="auTh"></div>`;draw()}
function draw(){const d=G(),el=$('auTh');if(!el)return;const ws=CAN.filter(k=>d.w[k]>0);
 const A=arcsOf(F.w),R=rulesOf(F.w);if(F.arc&&!A.some(a=>a.id===F.arc))F.arc='';if(F.tw&&!R.some(r=>r[0]===F.tw))F.tw='';
 const c=cost(),ok=c<=d.ink&&!!F.w;
 const chip=(on,t,a,dis,tip)=>`<button type="button" class="auC${on?' on':''}" ${dis?'disabled':''} data-a="${a}"${tip?` title="${E(tip)}"`:''}>${t}</button>`;
 el.innerHTML=`<div class="auHd">🪑 บัลลังก์ด้ายกาล <span>หมึกชะตา <b>${d.ink}</b></span></div>
 <div class="auSub">จารึกบทนำของชีวิตถัดไป เมื่อคุณเริ่มชีวิตใหม่ในโลกที่เลือก ด้ายจะถูกถักตามนี้ · ชีวิตที่เขียนเองจะไม่ขึ้นทำเนียบ</div>
 ${d.pend?`<div class="auPend">📜 มีบทนำที่จารึกไว้แล้ว: ${E((WN[d.pend.w]||WN.murim)[1])} — จารึกใหม่จะคืนหมึกเก่าให้ก่อน</div>`:''}
 <h5>1 · โลกที่จะเกิด</h5><div class="auCs">${ws.length?ws.map(k=>chip(F.w===k,`${WN[k][0]} ${WN[k][1]}`,'w:'+k)).join(''):'<span class="auSm">ยังไม่มีด้ายจากโลกที่เขียนบทนำได้</span>'}</div>
 <h5>2 · พรกำเนิด <span>${COST.boon} หมึก · เลือกได้ 2</span></h5><div class="auCs">${Object.entries(BOON).map(([k,b])=>chip(F.b.includes(k),`${b[0]} ${b[1]}<small>${b[2]}</small>`,'b:'+k,!F.b.includes(k)&&F.b.length>=2)).join('')}</div>
 <h5>3 · เส้นเรื่องหลัก <span>${COST.arc} หมึก</span></h5><div class="auCs auScr">${A.length?chip(!F.arc,'🎲 ให้ฟ้าสุ่ม','arc:')+A.map(a=>chip(F.arc===a.id,'🧵 '+E(a.n),'arc:'+a.id)).join(''):`<span class="auSm">${window._story?'โลกนี้ยังไม่มีเส้นเรื่องให้เลือก':'กำลังเปิดม้วนเส้นเรื่อง…'}</span>`}</div>
 ${TWW[F.w]?`<h5>4 · กฎโลกพลิก <span>${COST.tw} หมึก · เกิดช่วงกลางชีวิต</span></h5><div class="auCs">${R.length?chip(!F.tw,'🎲 ให้ฟ้าสุ่ม','tw:')+R.map(([k,r])=>chip(F.tw===k,`${r.ic} ${E(r.n)}`,'tw:'+k,false,r.d)).join(''):'<span class="auSm">กำลังเปิดม้วนกฎโลก…</span>'}</div>`:''}
 <div class="auFt"><span>รวม <b>${c}</b> หมึก${c>d.ink?' · <i>หมึกไม่พอ</i>':''}</span><button type="button" class="auBtn" id="auW" ${ok?'':'disabled'}>✍️ จารึกบทนำ</button></div>
 <button type="button" class="auX" id="auBack">กลับไปที่ตอนจบ</button>`;
 el.querySelectorAll('.auC').forEach(b=>b.onclick=()=>{const [t,v]=b.dataset.a.split(':');if(t==='w'){F.w=v;F.arc='';F.tw=''}else if(t==='b'){F.b=F.b.includes(v)?F.b.filter(x=>x!==v):F.b.concat(v).slice(0,2)}else if(t==='arc')F.arc=v;else if(t==='tw')F.tw=v;draw()});
 $('auBack').onclick=shut;$('auW').onclick=write}
function write(){const d=G();if(d.pend&&d.pend.c)d.ink+=d.pend.c;const c=cost();if(!F.w||c>d.ink){SV(d);return draw()}
 d.ink-=c;d.pend={w:F.w,b:F.b.slice(),arc:F.arc,tw:F.tw,c,t:Date.now()};SV(d);
 const A=arcsOf(F.w).find(a=>a.id===F.arc),R=F.tw&&window._tw&&window._tw.RULE[F.tw];
 const L=[`${WN[F.w][0]} เกิดใน<b>${WN[F.w][1]}</b>`].concat(F.b.map(k=>`${BOON[k][0]} ${BOON[k][1]}`),A?[`🧵 ${E(A.n)}`]:[],R?[`${R.ic} ${E(R.n)}`]:[]);
 const el=$('auTh');if(el)el.innerHTML=`<div class="auHd">📜 บทนำถูกจารึกแล้ว</div><ul class="auL">${L.map(x=>`<li>${x}</li>`).join('')}</ul>
  <div class="auSub">ด้ายถูกถักรอไว้ เริ่มชีวิตใหม่ใน${WN[F.w][1]}เมื่อไหร่ บทนำนี้จะเริ่มทำงานทันที · หมึกคงเหลือ ${d.ink}</div>
  <button type="button" class="auBtn" id="auOk">🏯 ไปเริ่มชีวิตใหม่</button>`;
 const b=$('auOk');if(b)b.onclick=()=>{shut();try{if(typeof toTitle==='function'&&!(S&&S.alive))toTitle()}catch(e){}};
 F.b=[];F.arc='';F.tw=''}

// ---------------------------------------------------------------- 4) บทนำทำงานตอนเริ่มชีวิตใหม่
/* เซฟเก่าที่เปิดตอนโหลดหน้าไม่นับ · ชีวิตใหม่ได้เวลา 25 วินาทีให้ตั้งโลกเสร็จ (ทะลุฟ้า/หมอกตั้ง S.mw ทีหลัง) */
let S0=null;try{S0=S}catch(e){}const T0=new WeakMap();
function apply(){try{if(typeof S==='undefined'||!S||S===S0||S._au)return;const g=$('game');if(!S.alive||!g||!g.classList.contains('on'))return;
 if(!T0.has(S))T0.set(S,Date.now());if(Date.now()-T0.get(S)>25000)return;
 const d=G(),P=d.pend;if(!P||WK()!==P.w||(S.age|0)>30)return;
 d.pend=null;d.done=(d.done|0)+1;SV(d);S._au={w:P.w,b:P.b,arc:P.arc,tw:P.tw};S.custom=true;
 const out=[];
 if(P.b.includes('int')){S.int=(+S.int||0)+15;out.push('🧠 ปัญญา +15')}
 if(P.b.includes('body')){S.maxHp=Math.round((+S.maxHp||100)*1.3);S.hp=S.maxHp;out.push('💪 พลังชีวิตสูงสุด +30%')}
 if(P.b.includes('life')){if(S.mw){S.mw.wsL=(S.mw.wsL|0)+10;S.mw.end=(S.mw.end||80)+10}else S.lifespan=(+S.lifespan||70)+10;out.push('⏳ อายุขัย +10 ปี')}
 if(P.b.includes('rich')){const v=Math.round(300*(S.mw?400:1));S.money=(+S.money||0)+v;out.push('💰 ได้เงินก้อนแรกเกิด')}
 if(P.arc)wLoad('story').then(()=>{try{const st=window._story;st.arcInit();const a=st.ARCS.find(x=>x.id===P.arc);if(!a||!S._arcs||S._arcs.some(x=>x.id===a.id))return;
   const x=S._arcs[0]||{p:[],pt:[],ag:[],npc:'คนแปลกหน้า'};Object.assign(x,{id:a.id,i:0,nx:Math.max((S.age|0)+1,a.min|0),p:[],pt:[],ag:[],f:{hid:rp(a.hid||['x'])}});if(!S._arcs.length)S._arcs.push(x)}catch(e){console.error('au arc',e)}}).catch(()=>{});
 if(P.tw)wLoad('twist').then(()=>{try{window._tw.T().fid=P.tw}catch(e){}}).catch(()=>{});
 const A=P.arc&&window._story&&window._story.ARCS.find(x=>x.id===P.arc),R=P.tw&&window._tw&&window._tw.RULE[P.tw];
 if(A)out.push('🧵 '+E(A.n));if(R)out.push(R.ic+' '+E(R.n));
 setTimeout(()=>{try{log(`📜 <b>บทนำที่คุณจารึกไว้บนบัลลังก์ด้ายกาลเริ่มทำงาน</b>${out.length?'<br>'+out.join(' · '):''}<br><span class="tag2">✍️ ชีวิตที่เขียนเอง · ไม่ขึ้นทำเนียบ</span>`,'myth',true);render&&render()}catch(e){}},600)}catch(e){console.error('au apply',e)}}
setInterval(apply,1500);

const st=document.createElement('style');st.textContent=`
.auEnd{margin:10px 0;padding:10px 14px;border-radius:14px;border:1.5px solid #6b8cff66;background:linear-gradient(160deg,#141a38cc,#0c0f22cc);color:#e6ebff}
.auEnd.hit{border-color:#ffd76a;box-shadow:0 0 22px #ffd76a55,inset 0 0 30px #6b8cff22;text-align:center;animation:auPulse 2.4s ease-in-out infinite}
@keyframes auPulse{50%{box-shadow:0 0 34px #ffd76a88,inset 0 0 40px #6b8cff33}}
.auRow{display:flex;flex-wrap:wrap;align-items:center;gap:4px}.auDot{display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;border-radius:50%;font-size:13px;opacity:.28;filter:grayscale(1);border:1px solid #fff3}
.auDot.on{opacity:1;filter:none;border-color:var(--c);box-shadow:0 0 8px var(--c)}
.auSm{font-size:12px;opacity:.8;margin-top:4px}.auHit{font-size:17px;font-weight:800;color:#ffe9a8}.auSub{font-size:13px;opacity:.85;margin:6px 0;line-height:1.55}
.auBtn{margin:8px 4px 2px;padding:10px 18px;border-radius:12px;border:1.5px solid #ffd76a;background:linear-gradient(180deg,#3a2f12,#1d1708);color:#ffe9a8;font-weight:800;font-size:15px;cursor:pointer}
.auBtn:disabled{opacity:.45;cursor:not-allowed}.auX{display:block;margin:8px auto 0;background:none;border:0;color:#aab3d8;text-decoration:underline;cursor:pointer;font-size:13px}
#auOv{position:fixed;inset:0;z-index:99990;display:none;align-items:center;justify-content:center;padding:12px;background:radial-gradient(ellipse at 50% 20%,#1b2350,#05060f 70%);overflow:auto}
#auOv.on{display:flex}.auBox{width:min(560px,100%);max-height:100%;overflow:auto;color:#eef;text-align:center;animation:auIn .6s ease}
@keyframes auIn{from{opacity:0;transform:translateY(16px) scale(.97);filter:blur(5px)}}
.auSvg{width:min(360px,90%);height:auto;display:block;margin:0 auto -30px}.auSvg path{fill:none;stroke-width:2.2;stroke-linecap:round;stroke-dasharray:700;stroke-dashoffset:700;animation:auDraw 2.2s ease forwards;filter:drop-shadow(0 0 4px currentColor)}
@keyframes auDraw{to{stroke-dashoffset:0}}.auKnot{fill:#fff6d0;filter:drop-shadow(0 0 10px #ffd76a);animation:auPulse2 1.8s ease-in-out infinite}@keyframes auPulse2{50%{opacity:.6}}
.auT{font-size:19px;font-weight:800;color:#fff3c4;margin-top:6px}
.auL{list-style:none;padding:0;margin:8px auto;max-width:420px;text-align:left;font-size:13px}.auL li{padding:3px 8px;margin:2px 0;border-left:3px solid var(--c,#ffd76a);background:#ffffff0a;border-radius:6px}
.auTh{text-align:left;padding:14px;border-radius:16px;border:1.5px solid #ffd76a88;background:linear-gradient(160deg,#151a36f5,#0a0b18f5);box-shadow:0 0 40px #6b8cff33}
.auHd{font-size:18px;font-weight:800;color:#ffe9a8;display:flex;justify-content:space-between;align-items:center;gap:8px}.auHd span{font-size:13px;color:#cfd6ff;font-weight:600}
.auTh h5{margin:12px 0 6px;color:#cdbfff;font-size:14px}.auTh h5 span{font-weight:400;font-size:12px;opacity:.75;margin-left:6px}
.auCs{display:flex;flex-wrap:wrap;gap:6px}.auScr{max-height:170px;overflow:auto}
.auC{padding:6px 10px;border-radius:10px;border:1px solid #8a96d888;background:#ffffff0d;color:#e6ebff;font-size:13px;cursor:pointer;text-align:left}
.auC small{display:block;font-size:11px;opacity:.7}.auC.on{border-color:#ffd76a;background:#ffd76a26;color:#fff3c4;box-shadow:0 0 8px #ffd76a55}.auC:disabled{opacity:.35;cursor:not-allowed}
.auFt{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:12px;border-top:1px solid #ffffff1f;padding-top:8px}.auFt i{color:#ff9a9a;font-style:normal}
.auPend{font-size:12px;margin:6px 0;padding:6px 8px;border-radius:8px;background:#ffd76a1a;border:1px dashed #ffd76a77}`;document.head.appendChild(st);
window._au={G,SV,rec,scene,throne,apply,NEED};
try{wReady('author')}catch(e){}
})()}catch(e){console.error('author.js',e)}
