// ============================================================
// /w/author.js 🧵 ผู้ประพันธ์ชะตา (เฟส 1) — ทุกโลก
//  1) ทุกตอนจบ = ด้ายชะตา 1 เส้นของโลกนั้น + หมึกชะตา (อายุ 60+ / โลกแรก / ระดับ S·ฉากจบลับ ได้เพิ่ม)
//  2) มีด้ายครบ 4 โลก → ตอนจบมีโอกาสขึ้น "✋ ไม่ยอมรับตอนจบนี้" (ครั้งแรก 50% · ต่อไป 25% · พลาด 4 ครั้งติดได้แน่)
//  3) ฉากด้ายเส้นเวลาของทุกชีวิตที่เคยเล่น → 🪑 บัลลังก์ด้ายกาล: ใช้หมึกเขียนบทนำชีวิตถัดไป
//     (โลก · พรกำเนิด สูงสุด 2 · เส้นเรื่องหลัก story.js · กฎโลกพลิก twist.js)
//  4) เริ่มชีวิตใหม่ในโลกที่เลือก → บทนำทำงาน · ชีวิตที่เขียนเองไม่ขึ้นทำเนียบ (S.custom)
//  เฟส 2: 📌 ปักหมุดชะตา (≤3 หมุด · เหตุการณ์ที่เขียนไว้เกิดตามช่วงวัย) · 💞 แก้ชะตาคนจากชีวิตก่อน (เจอกันอีกครั้งในชีวิตใหม่)
//  เฟส 3: 🌀 รอยแยกกาล (จารึกเพิ่ม = หมึก×3 · ชีวิตธรรมดาลด 8) → ⏳ ผู้ตรวจกาลตามลบด้าย · ≥70% หมุดอาจถักเพี้ยน
//         👁️ ตอนจบแท้: จบชีวิตที่เขียนเองครบ 3 โลก → 👑 อยู่บนบัลลังก์ / 🕊️ ปล่อยด้าย / 🔥 ตัดด้ายทั้งหมด
//  ข้อมูล: LS murim_thr {w:{โลก:จำนวน}, ink, log[], miss, seen, pend} · ในเซฟ: S._au
// ============================================================
try{(()=>{
const KEY='murim_thr',NEED=4;
const WN={murim:['⚔️','ยุทธภพ','#e8c86a'],xian:['☁️','เซียน','#8fd3ff'],god:['🌟','แดนเทพ','#ffd76a'],soul:['🔮','จิตวิญญาณยุทธ์','#c79bff'],loop:['⏳','ผู้ย้อนกาล','#7cffd0'],
 mw:['🏙️','ยุคปัจจุบัน','#ff9a6b'],sky:['🌌','ทะลุฟ้าดารา','#6bb8ff'],fog:['🌫️','โลกหมอก','#c6d0da'],beast:['🐺','สัตว์อสูร','#9be37a']};
const CAN=['murim','xian','soul','mw','sky','fog'];/* โลกที่เขียนบทนำได้ */
const STW={murim:'murim',xian:'xian',soul:'soul',mw:'mw',sky:'sky'};/* ชื่อโลกใน story.js */
const TWW={murim:1,xian:1,soul:1};/* โลกที่มีกฎโลกพลิก */
const BOON={int:['🧠','ปัญญาเหนือวัย','ปัญญา +15'],body:['💪','กายาฟ้าประทาน','พลังชีวิตสูงสุด +30%'],life:['⏳','ด้ายยาว','อายุขัย +10 ปี'],rich:['💰','เกิดบนกองทรัพย์','เงินก้อนแรกเกิด'],dark:['🖤','ด้ายดำ','พลังพื้นฐาน +30% · อายุขัย −10 ปี']};
const COST={boon:2,arc:3,tw:2,pin:2,re:3};
const AGE=[['เด็ก',8,15],['หนุ่มสาว',16,30],['กลางคน',31,50],['บั้นปลาย',51,75]];
const cashV=v=>Math.round(v*(S&&S.mw?400:1));
const pwr=p=>{const g=Math.max(1,Math.round((+S.power||0)*p));S.power=(+S.power||0)+g;try{const K=S.mw&&S.mw.sky&&window._sky&&_sky.SK();if(K){K.tb=(K.tb||0)+p;_sky.sync&&_sky.sync()}}catch(e){}return g};
const add=(k,v)=>{S[k]=Math.max(0,(+S[k]||0)+v)};
const lifeAdd=v=>{if(S.mw){S.mw.wsL=(S.mw.wsL|0)+v;S.mw.end=(S.mw.end||80)+v}else S.lifespan=(+S.lifespan||70)+v};
/* หมุดชะตา: [ไอคอน, ชื่อ, คำอธิบายสั้น, ข้อความเหตุการณ์, ตัวเลือก [ข้อความ, คำอธิบาย, ผล→ข้อความ]] */
const PIN={
 mentor:['🧙','ผู้ชี้ทาง','เจอคนที่จะสอนสิ่งสำคัญ','คนแปลกหน้าคนหนึ่งเรียกชื่อคุณถูกทั้งที่ไม่เคยพบกัน เขาบอกว่า "มีคนฝากให้ข้ามาสอนเจ้า คนที่นั่งอยู่บนบัลลังก์ด้าย"',
  [['📖 ขอเรียนวิชา','พลังพื้นฐาน +15% · ปัญญา +5',()=>{const g=pwr(.15);add('int',5);return`พลัง +${fmtN(g)} · ปัญญา +5`}],['🧠 ขอคำแนะนำเรื่องชีวิต','ปัญญา +12 · อายุขัย +2 ปี',()=>{add('int',12);lifeAdd(2);return'ปัญญา +12 · อายุขัย +2 ปี'}]]],
 luck:['💰','โชคที่ถูกเขียนไว้','ได้ทรัพย์ก้อนใหญ่','ระหว่างทาง คุณเหยียบแผ่นไม้ผุแผ่นหนึ่ง ข้างใต้มีห่อผ้าเก่าซ่อนอยู่ ปมเชือกที่มัดไว้เป็นปมเดียวกับที่คุณผูกเป็นประจำ',
  [['🎒 เก็บไว้เอง','เงินก้อนใหญ่',()=>{const v=cashV(600);add('money',v);return'ได้เงิน '+fmtN(v)}],['🤲 แบ่งให้คนที่ลำบาก','เงินครึ่งหนึ่ง · บุญ +8 · ชื่อเสียงเพิ่ม',()=>{const v=cashV(300);add('money',v);add('karma',8);add('fame',30);return`ได้เงิน ${fmtN(v)} · บุญ +8 · ชื่อเสียง +30`}]]],
 wake:['🌟','ตื่นรู้','ทะลุขีดจำกัดของตัวเอง','คืนหนึ่งคุณตื่นขึ้นกลางดึกพร้อมความเข้าใจบางอย่างที่ไม่เคยมีใครสอน เหมือนมีคนเขียนประโยคนี้ไว้ในหัวคุณนานแล้ว',
  [['⚡ ทุ่มให้พลัง','พลังพื้นฐาน +25%',()=>'พลัง +'+fmtN(pwr(.25))],['❤️ ทุ่มให้ร่างกาย','พลังชีวิตสูงสุด +25% · ฟื้นเต็ม',()=>{S.maxHp=Math.round((+S.maxHp||100)*1.25);S.hp=S.maxHp;return'พลังชีวิตสูงสุด +25%'}]]],
 omen:['🕳️','หายนะที่รู้ล่วงหน้า','รอดจากภัยใหญ่และช่วยคนได้','คุณเคยฝันเห็นวันนี้ซ้ำแล้วซ้ำอีก ไฟ เสียงกรีดร้อง และทางหนีที่มีแค่ทางเดียว วันนี้ความฝันกำลังจะเกิดขึ้นจริง',
  [['🛡️ เตือนทุกคนก่อนเกิดเหตุ','บุญ +12 · ชื่อเสียงเพิ่มมาก',()=>{add('karma',12);add('fame',80);return'คนรอดเพราะคุณนับร้อย · บุญ +12 · ชื่อเสียง +80'}],['🏃 พาคนที่รักหนีออกมา','อายุขัย +5 ปี · พลังชีวิตฟื้นเต็ม',()=>{lifeAdd(5);S.hp=S.maxHp;return'อายุขัย +5 ปี'}]]],
 echo:['🪞','เงาของชีวิตก่อน','เจอเศษเสี้ยวของตัวเองในอดีต','คุณสวนทางกับคนที่หน้าตาเหมือนคุณในอีกชีวิตหนึ่ง เขาหยุด หันมา แล้วยิ้มเหมือนรู้ว่าคุณจะมาถึงวันนี้',
  [['🫴 รับความทรงจำ','ปัญญา +8 · พลังพื้นฐาน +10%',()=>{add('int',8);return'ปัญญา +8 · พลัง +'+fmtN(pwr(.1))}],['🕊️ ปล่อยให้อดีตจากไป','บุญ +10 · พลังชีวิตฟื้นเต็ม',()=>{add('karma',10);S.hp=S.maxHp;return'บุญ +10'}]]],
 duel:['🔥','ศึกที่ถูกลิขิต','ดวลครั้งใหญ่ ชนะได้ชื่อเสียง','คู่ต่อสู้ที่แข็งแกร่งที่สุดในย่านนี้ประกาศท้าคุณต่อหน้าทุกคน ราวกับบทนี้ถูกเขียนรอไว้แล้ว',
  [['⚔️ รับคำท้า','ชนะ ~65% · ชนะได้ชื่อเสียง +120 และพลังพื้นฐาน +12%',()=>{if(Math.random()<.65){add('fame',120);return'🏆 ชนะ! ชื่อเสียง +120 · พลัง +'+fmtN(pwr(.12))}S.hp=Math.max(1,Math.round(S.hp-S.maxHp*.3));add('int',6);return'แพ้ เจ็บหนัก แต่ได้บทเรียน · ปัญญา +6'}],['🙇 ปฏิเสธอย่างสุภาพ','ปัญญา +4 · บุญ +4',()=>{add('int',4);add('karma',4);return'ปัญญา +4 · บุญ +4'}]]]};
const fmtN=v=>{try{return fmt(v)}catch(e){return String(v)}};
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
 d.log.push({w,n:String(S.name||'ไร้นาม').slice(0,24),a:S.age|0,au:S._au?1:0,p:ppl()});if(d.log.length>40)d.log=d.log.slice(-40);
 if(S._au){d.auW=d.auW||{};d.auW[w]=1}else d.rift=Math.max(0,(d.rift|0)-8);
 const n=nW(d);let hit=false;
 if(d.fin==='stay')hit=true;
 else if(n>=NEED){const p=d.miss>=4?1:(d.seen?.25:.5);hit=Math.random()<p;if(hit)d.miss=0;else d.miss++}
 SV(d);box(E0,d,gain,first,big,hit)}catch(e){console.error('au rec',e)}}
function ppl(){const o=[],add=(n,r,pet)=>{n=typeof n==='string'?n:(n&&n.n);n=String(n||'').replace(/<[^>]+>/g,'').trim().slice(0,24);if(n&&n!==S.name&&!o.some(x=>x.n===n)&&o.length<4)o.push(pet?{n,r,pet:1}:{n,r})};
 try{add(S.spouse,'คู่ชีวิต')}catch(e){}try{add(S.disc,'ศิษย์')}catch(e){}try{add(S.nem,'คู่ปรับ')}catch(e){}
 try{const K=S.mw&&S.mw.sky&&window._sky&&_sky.SK();if(K&&K.np){add(K.np.bud,'เพื่อนรัก');add(K.np.mt,'ครูฝึก')}}catch(e){}
 try{add(S.pet,'สัตว์คู่ใจ',1)}catch(e){}return o}
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
const F={w:'',b:[],arc:'',tw:'',pins:[],re:-1};
function arcsOf(w){try{const st=window._story;if(!st||!STW[w])return[];const k=STW[w];return st.ARCS.filter(a=>!a.need&&(a.w==='*'||(Array.isArray(a.w)?a.w.includes(k):String(a.w).split(/[,\s]/).includes(k))))}catch(e){return[]}}
function rulesOf(w){try{return TWW[w]&&window._tw?Object.entries(window._tw.RULE):[]}catch(e){return[]}}
function cost(){return F.b.length*COST.boon+(F.arc?COST.arc:0)+(F.tw?COST.tw:0)+F.pins.length*COST.pin+(F.re>=0?COST.re:0)}
function people(){const d=G(),o=[];d.log.slice(-15).reverse().forEach(x=>(x.p||[]).forEach(q=>{if(!o.some(y=>y.n===q.n))o.push({n:q.n,r:q.r,pet:q.pet,w:x.w,of:x.n})}));return o.slice(0,12)}
function throne(){const d=G(),o=ov();
 Promise.all([wLoad('story').catch(()=>{}),wLoad('twist').catch(()=>{})]).then(()=>{if($('auOv')&&$('auOv').classList.contains('on')&&$('auTh'))draw()});
 const ws=CAN.filter(k=>d.w[k]>0);if(!ws.includes(F.w))F.w=ws[0]||'murim';
 o.innerHTML=`<div class="auBox auTh" id="auTh"></div>`;draw()}
function draw(){const d=G(),el=$('auTh');if(!el)return;const ws=CAN.filter(k=>d.w[k]>0);
 const A=arcsOf(F.w),R=rulesOf(F.w);if(F.arc&&!A.some(a=>a.id===F.arc))F.arc='';if(F.tw&&!R.some(r=>r[0]===F.tw))F.tw='';
 const c=cost(),ok=c<=d.ink&&!!F.w;
 const chip=(on,t,a,dis,tip)=>`<button type="button" class="auC${on?' on':''}" ${dis?'disabled':''} data-a="${a}"${tip?` title="${E(tip)}"`:''}>${t}</button>`;
 const rf=d.rift|0,aw=Object.keys(d.auW||{}).length,ttl=TTL[d.fin]||'';
 el.innerHTML=`<div class="auHd">🪑 บัลลังก์ด้ายกาล <span>หมึกชะตา <b>${d.ink}</b></span></div>${ttl?`<div class="auTtl">${ttl}</div>`:''}
 <div class="auRf"><div class="auRfB"><i style="width:${rf}%"></i></div><span>🌀 รอยแยกกาล <b>${rf}%</b> · ${rf>=90?'⏳ ผู้ตรวจกาลจะตามมา 3 ครั้ง':rf>=60?'⏳ ผู้ตรวจกาลจะตามมา 2 ครั้ง':rf>=30?'⏳ ผู้ตรวจกาลจะตามมา 1 ครั้ง':'เส้นเวลายังนิ่ง'}${rf>=70?' · 📌 หมุดอาจถักเพี้ยน':''}</span></div>
 ${d.fin!=='stay'?(aw>=3?`<div class="auFin"><b>👁️ ปลายด้ายทั้งหมดอยู่ในมือคุณแล้ว</b><div class="auSub">คุณเขียนชีวิตจนครบ ${aw} โลก ถึงเวลาตัดสินว่าจะทำอะไรกับด้ายทั้งหมด</div><button type="button" class="auBtn" id="auFinB">👁️ ไปยังปลายด้าย</button></div>`:`<div class="auSm">👁️ ตอนจบแท้: จบชีวิตที่เขียนเองให้ครบ 3 โลก (ตอนนี้ ${aw}/3)</div>`):''}
 <div class="auSub">จารึกบทนำของชีวิตถัดไป เมื่อคุณเริ่มชีวิตใหม่ในโลกที่เลือก ด้ายจะถูกถักตามนี้ · ชีวิตที่เขียนเองจะไม่ขึ้นทำเนียบ</div>
 ${d.pend?`<div class="auPend">📜 มีบทนำที่จารึกไว้แล้ว: ${E((WN[d.pend.w]||WN.murim)[1])} — จารึกใหม่จะคืนหมึกเก่าให้ก่อน</div>`:''}
 <h5>1 · โลกที่จะเกิด</h5><div class="auCs">${ws.length?ws.map(k=>chip(F.w===k,`${WN[k][0]} ${WN[k][1]}`,'w:'+k)).join(''):'<span class="auSm">ยังไม่มีด้ายจากโลกที่เขียนบทนำได้</span>'}</div>
 <h5>2 · พรกำเนิด <span>${COST.boon} หมึก · เลือกได้ 2</span></h5><div class="auCs">${Object.entries(BOON).filter(([k])=>k!=='dark'||d.dark).map(([k,b])=>chip(F.b.includes(k),`${b[0]} ${b[1]}<small>${b[2]}</small>`,'b:'+k,!F.b.includes(k)&&F.b.length>=2)).join('')}</div>
 <h5>3 · เส้นเรื่องหลัก <span>${COST.arc} หมึก</span></h5><div class="auCs auScr">${A.length?chip(!F.arc,'🎲 ให้ฟ้าสุ่ม','arc:')+A.map(a=>chip(F.arc===a.id,'🧵 '+E(a.n),'arc:'+a.id)).join(''):`<span class="auSm">${window._story?'โลกนี้ยังไม่มีเส้นเรื่องให้เลือก':'กำลังเปิดม้วนเส้นเรื่อง…'}</span>`}</div>
 ${TWW[F.w]?`<h5>4 · กฎโลกพลิก <span>${COST.tw} หมึก · เกิดช่วงกลางชีวิต</span></h5><div class="auCs">${R.length?chip(!F.tw,'🎲 ให้ฟ้าสุ่ม','tw:')+R.map(([k,r])=>chip(F.tw===k,`${r.ic} ${E(r.n)}`,'tw:'+k,false,r.d)).join(''):'<span class="auSm">กำลังเปิดม้วนกฎโลก…</span>'}</div>`:''}
 <h5>5 · 📌 ปักหมุดชะตา <span>${COST.pin} หมึก/หมุด · สูงสุด 3 · เกิดแน่นอนในช่วงวัยที่เลือก</span></h5><div class="auCs">${Object.entries(PIN).map(([k,v])=>{const on=F.pins.findIndex(x=>x.k===k);return chip(on>=0,`${v[0]} ${v[1]}<small>${v[2]}</small>`,'p:'+k,on<0&&F.pins.length>=3)}).join('')}</div>
 ${F.pins.map((x,i)=>`<div class="auPin">${PIN[x.k][0]} ${PIN[x.k][1]} · ${AGE.map((a,j)=>chip(x.a===j,`${a[0]} <small>${a[1]}–${a[2]} ปี</small>`,'pa:'+i+'.'+j)).join('')}</div>`).join('')}
 <h5>6 · 💞 แก้ชะตาคนจากชีวิตก่อน <span>${COST.re} หมึก · จะได้เจอกันอีกครั้ง</span></h5><div class="auCs auScr">${(()=>{const P=people();return P.length?chip(F.re<0,'— ไม่แก้','re:-1')+P.map((q,i)=>chip(F.re===i,`${q.pet?'🐾':'🕯️'} ${E(q.n)}<small>${E(q.r)} ของ${E(q.of)} · ${(WN[q.w]||WN.murim)[1]}</small>`,'re:'+i)).join(''):'<span class="auSm">ยังไม่มีคนจากชีวิตก่อนที่บันทึกไว้ (จะเริ่มเก็บตั้งแต่ตอนจบครั้งถัดไป เช่น คู่ชีวิต ศิษย์ คู่ปรับ)</span>'})()}</div>
 <div class="auFt"><span>รวม <b>${c}</b> หมึก${c?` · 🌀 +${c*3}%`:''}${c>d.ink?' · <i>หมึกไม่พอ</i>':''}</span><button type="button" class="auBtn" id="auW" ${ok?'':'disabled'}>✍️ จารึกบทนำ</button></div>
 <button type="button" class="auX" id="auBack">กลับไปที่ตอนจบ</button>`;
 el.querySelectorAll('.auC').forEach(b=>b.onclick=()=>{const [t,v]=b.dataset.a.split(':');if(t==='w'){F.w=v;F.arc='';F.tw=''}else if(t==='b'){F.b=F.b.includes(v)?F.b.filter(x=>x!==v):F.b.concat(v).slice(0,2)}else if(t==='arc')F.arc=v;else if(t==='tw')F.tw=v;else if(t==='p'){const i=F.pins.findIndex(x=>x.k===v);if(i>=0)F.pins.splice(i,1);else if(F.pins.length<3)F.pins.push({k:v,a:1})}else if(t==='pa'){const [i,j]=v.split('.').map(Number);if(F.pins[i])F.pins[i].a=j}else if(t==='re')F.re=+v;draw()});
 $('auBack').onclick=shut;$('auW').onclick=write;const fb=$('auFinB');if(fb)fb.onclick=finale}
function write(){const d=G();if(d.pend&&d.pend.c)d.ink+=d.pend.c;const c=cost();if(!F.w||c>d.ink){SV(d);return draw()}
 const RE=F.re>=0?people()[F.re]:null;d.ink-=c;d.rift=Math.min(100,(d.rift|0)+c*3);d.pend={w:F.w,b:F.b.slice(),arc:F.arc,tw:F.tw,pins:F.pins.map(x=>({k:x.k,a:x.a})),re:RE?{n:RE.n,r:RE.r,pet:RE.pet?1:0,of:RE.of}:null,c,t:Date.now()};SV(d);
 const A=arcsOf(F.w).find(a=>a.id===F.arc),R=F.tw&&window._tw&&window._tw.RULE[F.tw];
 const L=[`${WN[F.w][0]} เกิดใน<b>${WN[F.w][1]}</b>`].concat(F.b.map(k=>`${BOON[k][0]} ${BOON[k][1]}`),A?[`🧵 ${E(A.n)}`]:[],R?[`${R.ic} ${E(R.n)}`]:[],F.pins.map(x=>`📌 ${PIN[x.k][0]} ${PIN[x.k][1]} · วัย${AGE[x.a][0]}`),RE?[`💞 พบ <b>${E(RE.n)}</b> อีกครั้ง`]:[]);
 const el=$('auTh');if(el)el.innerHTML=`<div class="auHd">📜 บทนำถูกจารึกแล้ว</div><ul class="auL">${L.map(x=>`<li>${x}</li>`).join('')}</ul>
  <div class="auSub">ด้ายถูกถักรอไว้ เริ่มชีวิตใหม่ใน${WN[F.w][1]}เมื่อไหร่ บทนำนี้จะเริ่มทำงานทันที · หมึกคงเหลือ ${d.ink}</div>
  <button type="button" class="auBtn" id="auOk">🏯 ไปเริ่มชีวิตใหม่</button>`;
 const b=$('auOk');if(b)b.onclick=()=>{shut();try{if(typeof toTitle==='function'&&!(S&&S.alive))toTitle()}catch(e){}};
 F.b=[];F.arc='';F.tw='';F.pins=[];F.re=-1}

// ---------------------------------------------------------------- 4) บทนำทำงานตอนเริ่มชีวิตใหม่
/* เซฟเก่าที่เปิดตอนโหลดหน้าไม่นับ · ชีวิตใหม่ได้เวลา 25 วินาทีให้ตั้งโลกเสร็จ (ทะลุฟ้า/หมอกตั้ง S.mw ทีหลัง) */
let S0=null;try{S0=S}catch(e){}const T0=new WeakMap();
function apply(){try{if(typeof S==='undefined'||!S||S===S0||S._au)return;const g=$('game');if(!S.alive||!g||!g.classList.contains('on'))return;
 if(!T0.has(S))T0.set(S,Date.now());if(Date.now()-T0.get(S)>25000)return;
 const d=G(),P=d.pend;
 if(d.fin==='free'&&!S._auF&&(S.age|0)<=30&&(!P||WK()!==P.w)){S._auF=1;add('int',5);lifeAdd(5);setTimeout(()=>{try{log('🕊️ <b>ความทรงจำเลือนรางจากผู้ปล่อยด้าย</b> · ปัญญา +5 · อายุขัย +5 ปี','myth')}catch(e){}},700)}
 if(!P||WK()!==P.w||(S.age|0)>30)return;
 d.pend=null;d.done=(d.done|0)+1;SV(d);const ag=S.age|0,rA=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 S._au={w:P.w,b:P.b,arc:P.arc,tw:P.tw,pins:(P.pins||[]).map(x=>{const A=AGE[x.a]||AGE[1];return{k:x.k,age:Math.max(ag+1,rA(A[1],A[2])),done:0}}),re:P.re?Object.assign({},P.re,{age:Math.max(ag+1,rA(16,26)),done:0}):null,
  aud:Array.from({length:(d.rift|0)>=90?3:(d.rift|0)>=60?2:(d.rift|0)>=30?1:0},()=>({age:ag+rA(6,40),done:0})).sort((a,b)=>a.age-b.age)};S.custom=true;
 const out=[];
 if(P.b.includes('int')){S.int=(+S.int||0)+15;out.push('🧠 ปัญญา +15')}
 if(P.b.includes('body')){S.maxHp=Math.round((+S.maxHp||100)*1.3);S.hp=S.maxHp;out.push('💪 พลังชีวิตสูงสุด +30%')}
 if(P.b.includes('life')){if(S.mw){S.mw.wsL=(S.mw.wsL|0)+10;S.mw.end=(S.mw.end||80)+10}else S.lifespan=(+S.lifespan||70)+10;out.push('⏳ อายุขัย +10 ปี')}
 if(P.b.includes('dark')){const g=pwr(.3);lifeAdd(-10);out.push('🖤 ด้ายดำ: พลัง +'+fmtN(g)+' · อายุขัย −10 ปี')}
 if(P.b.includes('rich')){const v=Math.round(300*(S.mw?400:1));S.money=(+S.money||0)+v;out.push('💰 ได้เงินก้อนแรกเกิด')}
 if(P.arc)wLoad('story').then(()=>{try{const st=window._story;st.arcInit();const a=st.ARCS.find(x=>x.id===P.arc);if(!a||!S._arcs||S._arcs.some(x=>x.id===a.id))return;
   const x=S._arcs[0]||{p:[],pt:[],ag:[],npc:'คนแปลกหน้า'};Object.assign(x,{id:a.id,i:0,nx:Math.max((S.age|0)+1,a.min|0),p:[],pt:[],ag:[],f:{hid:rp(a.hid||['x'])}});if(!S._arcs.length)S._arcs.push(x)}catch(e){console.error('au arc',e)}}).catch(()=>{});
 if(P.tw)wLoad('twist').then(()=>{try{window._tw.T().fid=P.tw}catch(e){}}).catch(()=>{});
 const A=P.arc&&window._story&&window._story.ARCS.find(x=>x.id===P.arc),R=P.tw&&window._tw&&window._tw.RULE[P.tw];
 if(A)out.push('🧵 '+E(A.n));if(R)out.push(R.ic+' '+E(R.n));if(S._au.pins.length)out.push(`📌 หมุดชะตา ${S._au.pins.length} หมุด`);if(S._au.re)out.push(`💞 ด้ายของ ${E(S._au.re.n)}`);
 setTimeout(()=>{try{log(`📜 <b>บทนำที่คุณจารึกไว้บนบัลลังก์ด้ายกาลเริ่มทำงาน</b>${out.length?'<br>'+out.join(' · '):''}<br><span class="tag2">✍️ ชีวิตที่เขียนเอง · ไม่ขึ้นทำเนียบ</span>`,'myth',true);render&&render()}catch(e){}},600)}catch(e){console.error('au apply',e)}}
setInterval(apply,1500);

// ---------------------------------------------------------------- 5) หมุดชะตา + คนจากชีวิตก่อน (ตรวจทุก 1.5 วิ · รอให้ไม่มีตัวเลือก/หน้าต่างค้าง)
function busy(){try{return !!(choice._cur||modalOpen||(typeof DU!=='undefined'&&DU)||$('auOv')&&$('auOv').classList.contains('on'))}catch(e){return true}}
function tick(){try{if(typeof S==='undefined'||!S||!S.alive||!S._au||busy())return;const U=S._au,ag=S.age|0;
 const p=(U.pins||[]).find(x=>!x.done&&ag>=x.age);if(p){p.done=1;return pinGo(p)}
 const r=U.re;if(r&&!r.done&&ag>=r.age){r.done=1;return reGo(r)}
 const q=(U.aud||[]).find(x=>!x.done&&ag>=x.age);if(q){q.done=1;return audGo()}
 if(U.ally&&U.allyY!==ag){U.allyY=ag;S.hp=Math.min(S.maxHp,Math.round(S.hp+S.maxHp*.05))}}catch(e){console.error('au tick',e)}}
function pinGo(p){const v=PIN[p.k];if(!v)return;
 choice(`📌 หมุดชะตา: ${v[0]} ${v[1]}`,`${v[3]}<br><span class="tag2">หมุดชะตาที่คุณปักไว้บนบัลลังก์ด้ายกาล</span>`,v[4].map(([t,sub,f])=>({t,s:sub,f(){let r='';try{r=f()}catch(e){console.error('au pin',e)}try{if((G().rift|0)>=70&&Math.random()<.25){S.hp=Math.max(1,Math.round(S.hp-S.maxHp*.2));add('karma',-3);r+=' · 🌀 แต่ด้ายถูกถักเพี้ยน พลังชีวิต −20% · บุญ −3'}}catch(e){}try{log(`📌 <b>${v[1]}</b> — ${t.replace(/^\S+\s/,'')}${r?' · '+r:''}`,'myth');render&&render()}catch(e){}}})))}
function reGo(r){const n=E(r.n),R0=E(r.r),can=!r.pet&&!S.spouse&&!S.mw&&!S.beastMode&&(S.age|0)>=16;
 const o=[];
 if(can)o.push({t:'💞 ใช้ชีวิตร่วมกันอีกครั้ง',s:`${n}จะเป็นคู่ชีวิตของคุณในชาตินี้`,f(){S.spouse=String(r.n);try{keyAdd&&keyAdd(`ได้พบ${r.n}อีกครั้ง`)}catch(e){}log(`💞 คุณกับ<b>${n}</b>ใช้ชีวิตร่วมกันอีกครั้ง ด้ายสองเส้นที่เคยขาด ถูกถักกลับมาเป็นเส้นเดียว`,'myth',true)}});
 o.push({t:r.pet?'🐾 พามันกลับบ้าน':'🤝 เดินทางร่วมกัน',s:'อยู่ข้างกาย · พลังชีวิตฟื้นเพิ่มทุกปี',f(){S._au.ally=String(r.n);add('int',3);try{keyAdd&&keyAdd(`ได้พบ${r.n}อีกครั้ง`)}catch(e){}log(`🤝 <b>${n}</b>อยู่ข้างคุณอีกครั้ง ไม่มีใครจำชีวิตก่อนได้นอกจากคุณ แต่บางคืน${n}ก็เผลอเรียกชื่อเก่าของคุณออกมา`,'myth',true)}});
 o.push({t:'🕊️ แค่ยิ้มให้ แล้วปล่อยไป',s:'บุญ +10 · ปัญญา +5',f(){add('karma',10);add('int',5);log(`🕊️ คุณยิ้มให้<b>${n}</b> แล้วเดินจากมา ชาตินี้${n}จะมีชีวิตที่ยาวนาน เพราะคุณเป็นคนแก้ด้ายเส้นนั้นเอง`,'myth',true)}});
 choice(`💞 ด้ายที่ถูกแก้: คนที่คุณเคยเสียไป`,`ท่ามกลางผู้คน คุณสบตากับ<b>${n}</b> ชาตินี้${r.pet?'มัน':'เขา'}ไม่ได้เป็น${R0}ของคุณ แต่คุณจำได้ทันที<br><span class="tag2">ด้ายเส้นนี้คุณเป็นคนแก้เองบนบัลลังก์ด้ายกาล</span>`,o)}
setInterval(tick,1500);

// ---------------------------------------------------------------- 6) ⏳ ผู้ตรวจกาล
const rfAdd=v=>{const d=G();d.rift=Math.max(0,Math.min(100,(d.rift|0)+v));SV(d);return d.rift};
function erase(){const U=S._au;if(!U)return'';const p=(U.pins||[]).find(x=>!x.done);if(p){p.done=1;p.cut=1;return`หมุด ${PIN[p.k][0]} ${PIN[p.k][1]} ถูกลบ`}
 if(U.re&&!U.re.done){U.re.done=1;U.re.cut=1;return`ด้ายของ ${E(U.re.n)} ถูกลบ ชาตินี้จะไม่ได้พบกัน`}
 if(U.ally){const n=U.ally;U.ally=null;return`${E(n)}จำคุณไม่ได้อีกต่อไป แล้วเดินจากไป`}
 lifeAdd(-5);return'อายุขัย −5 ปี'}
function audGo(){const rf=G().rift|0,pF=Math.max(.3,Math.min(.7,.75-rf/200)),pT=Math.max(.3,Math.min(.75,.3+(+S.int||0)/400)),L=(t,c)=>{try{log(t,c||'',true);render&&render()}catch(e){}};
 choice(`⏳ ผู้ตรวจกาล`,`เวลารอบตัวคุณหยุดนิ่ง ผู้คนค้างกลางก้าว เงาสวมเสื้อคลุมสีเทาก้าวออกมาจากรอยแยกกลางอากาศ <b>"ชีวิตนี้มีคนเขียนไว้ล่วงหน้า และมันผิดกฎของเส้นเวลา"</b><br><span class="tag2">🌀 รอยแยกกาล ${rf}%</span>`,[
  {t:'⚔️ สู้เพื่อรักษาด้าย',s:`ชนะ ~${Math.round(pF*100)}% · แพ้: ด้าย 1 เส้นถูกลบ และเจ็บหนัก`,f(){if(Math.random()<pF){add('fame',60);const v=rfAdd(-12);L(`⚔️ <b>คุณฟันผู้ตรวจกาลจนร่างแตกเป็นเศษเวลา</b> · ชื่อเสียง +60 · รอยแยก ${v}%`,'myth')}else{const x=erase();S.hp=Math.max(1,Math.round(S.hp-S.maxHp*.35));L(`⏳ ผู้ตรวจกาลชนะ · ${x} · พลังชีวิต −35%`,'bad')}}},
  {t:'🎭 หลอกล่อด้วยไหวพริบ',s:`สำเร็จ ~${Math.round(pT*100)}% (ยิ่งปัญญาสูงยิ่งง่าย) · พลาด: ด้ายถูกลบ`,f(){if(Math.random()<pT){add('int',3);const v=rfAdd(-6);L(`🎭 คุณชี้ไปที่เส้นเวลาอื่น ผู้ตรวจกาลหันไปตามแล้วหายวับ · ปัญญา +3 · รอยแยก ${v}%`,'good')}else{const x=erase();S.hp=Math.max(1,Math.round(S.hp-S.maxHp*.2));L(`⏳ ผู้ตรวจกาลมองทะลุแผน · ${x} · พลังชีวิต −20%`,'bad')}}},
  {t:'📜 ยอมให้ลบด้าย 1 เส้น',s:'ปลอดภัย · รอยแยก −8%',f(){const x=erase();const v=rfAdd(-8);L(`📜 ผู้ตรวจกาลตัดด้ายไปหนึ่งเส้นอย่างสุภาพ · ${x} · รอยแยก ${v}%`,'')}}])}

// ---------------------------------------------------------------- 7) 👁️ ตอนจบแท้
const TTL={stay:'👑 ผู้ประพันธ์นิรันดร์',free:'🕊️ ผู้ปล่อยด้าย',cut:'🔥 ผู้ตัดด้าย'};
const FIN={
 stay:['👑','อยู่บนบัลลังก์ตลอดไป','คุมทุกเส้นเวลา แต่จะไม่ได้ใช้ชีวิตของตัวเองอีก',['บัลลังก์เปิดให้ทุกครั้งที่จบชีวิต (ไม่ต้องลุ้น)','ฉายา 👑 ผู้ประพันธ์นิรันดร์'],
  'คุณนั่งลงบนบัลลังก์ แล้วด้ายนับล้านเส้นก็พันรอบข้อมือ คุณได้ยินทุกชีวิตในทุกโลกพร้อมกัน เสียงหัวเราะ เสียงร้องไห้ เสียงดาบ เสียงฝน คุณรู้ว่าจะไม่มีวันได้ลุกจากที่นี่ และนั่นคือราคาของการเป็นคนเขียน'],
 free:['🕊️','ปล่อยด้าย','คืนชะตาให้ทุกคนเลือกเอง แล้วเกิดใหม่เป็นคนธรรมดา',['ทุกชีวิตต่อจากนี้เริ่มด้วยปัญญา +5 · อายุขัย +5 ปี','รอยแยกกาลกลับเป็น 0','ฉายา 🕊️ ผู้ปล่อยด้าย'],
  'คุณคลายมือ ด้ายทุกเส้นค่อยๆ ลอยออกไปหาเจ้าของ บางเส้นสั่นเพราะไม่เคยต้องเลือกเองมาก่อน บางเส้นพุ่งออกไปอย่างมีความสุข บัลลังก์ว่างลง และคุณก็ลืมตาขึ้นเป็นทารกที่ไม่รู้ว่าพรุ่งนี้จะเป็นอย่างไร เป็นครั้งแรกในรอบหลายชีวิต'],
 cut:['🔥','ตัดด้ายทั้งหมด','ลบทุกเส้นเวลา แล้วเริ่มจักรวาลใหม่',['ด้ายชะตาและบันทึกทุกชีวิตถูกลบ (ต้องเก็บใหม่ 4 โลก)','ได้หมึกชะตาตั้งต้น 15','ปลดล็อกพรกำเนิด 🖤 ด้ายดำ (พลังพื้นฐาน +30% แต่อายุขัย −10 ปี)','ฉายา 🔥 ผู้ตัดด้าย'],
  'คุณดึงกรรไกรออกจากความว่าง แล้วตัด เส้นแรกเงียบ เส้นที่สิบเริ่มมีเสียงกรีดร้อง เส้นที่ร้อยไม่มีใครเหลือให้ร้องอีก เมื่อด้ายเส้นสุดท้ายขาด ความมืดก็กลายเป็นความเงียบที่สมบูรณ์ แล้วจากความเงียบนั้น ด้ายเส้นใหม่สีดำเส้นแรกก็เริ่มงอกออกมา']};
function finale(){const o=ov();o.innerHTML=`<div class="auBox auTh"><div class="auHd">👁️ ปลายด้าย</div><div class="auSub">ด้ายทุกเส้นที่คุณเคยเขียน มาบรรจบกันตรงนี้ เลือกได้ทางเดียว</div>
 ${Object.entries(FIN).map(([k,f])=>`<div class="auFc"><b>${f[0]} ${f[1]}</b><div class="auSub">${f[2]}</div><ul class="auL">${f[3].map(x=>`<li>${x}</li>`).join('')}</ul><button type="button" class="auBtn" data-k="${k}">${f[0]} เลือกทางนี้</button></div>`).join('')}
 <button type="button" class="auX" id="auFinX">ยังไม่ตัดสินใจ</button></div>`;
 o.querySelectorAll('.auFc .auBtn').forEach(b=>b.onclick=()=>{if(b.dataset.c){finGo(b.dataset.k);return}o.querySelectorAll('.auFc .auBtn').forEach(x=>{x.dataset.c='';x.textContent=FIN[x.dataset.k][0]+' เลือกทางนี้'});b.dataset.c='1';b.textContent='แตะอีกครั้งเพื่อยืนยัน (ย้อนกลับไม่ได้)'});
 $('auFinX').onclick=throne}
function finGo(k){const d=G(),f=FIN[k];d.fin=k;d.fins=(d.fins|0)+1;d.auW={};
 if(k==='free')d.rift=0;
 if(k==='cut'){d.w={};d.log=[];d.ink=15;d.rift=0;d.miss=0;d.pend=null;d.dark=1}
 SV(d);try{keyAdd&&keyAdd('ตอนจบแท้: '+f[1])}catch(e){}
 const o=ov();o.innerHTML=`<div class="auBox auEndF auE_${k}"><div class="auBig">${f[0]}</div><div class="auT">${f[1]}</div><p class="auStory">${f[4]}</p><div class="auTtl">${TTL[k]}</div><div class="auSm">— ตอนจบแท้ของด้ายกาล —</div><button type="button" class="auBtn" id="auFinOk">${k==='stay'?'🪑 กลับสู่บัลลังก์':'🌱 เริ่มต้นใหม่'}</button></div>`;
 $('auFinOk').onclick=()=>{if(k==='stay')throne();else shut()}}

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
.auPin{margin:6px 0 2px;padding:6px 8px;border-radius:10px;background:#ffffff08;font-size:13px;display:flex;flex-wrap:wrap;gap:5px;align-items:center}.auPin .auC{padding:3px 8px;font-size:12px}
.auRf{margin:8px 0 4px;font-size:12px}.auRfB{height:6px;border-radius:4px;background:#ffffff14;overflow:hidden;margin-bottom:3px}.auRfB i{display:block;height:100%;background:linear-gradient(90deg,#6bb8ff,#c79bff,#ff6b8a)}
.auTtl{display:inline-block;margin:4px 0;padding:2px 10px;border-radius:10px;background:#ffd76a26;border:1px solid #ffd76a88;color:#ffe9a8;font-size:12px;font-weight:700}
.auFin{margin:8px 0;padding:10px;border-radius:12px;border:1.5px solid #c79bff;background:#c79bff1a;text-align:center;animation:auPulse 2.4s ease-in-out infinite}
.auFc{margin:10px 0;padding:10px;border-radius:12px;border:1px solid #ffffff2a;background:#ffffff08}.auFc .auBtn{display:block;margin:8px auto 0}
.auEndF{text-align:center;padding:24px 16px}.auBig{font-size:64px;line-height:1.1;animation:auIn 1.2s ease}.auStory{font-size:14px;line-height:1.8;margin:14px auto;max-width:460px;opacity:.92}
.auE_cut .auBig{filter:drop-shadow(0 0 18px #ff5a3a)}.auE_free .auBig{filter:drop-shadow(0 0 18px #bfe8ff)}.auE_stay .auBig{filter:drop-shadow(0 0 18px #ffd76a)}
.auPend{font-size:12px;margin:6px 0;padding:6px 8px;border-radius:8px;background:#ffd76a1a;border:1px dashed #ffd76a77}`;document.head.appendChild(st);
window._au={G,SV,rec,scene,throne,apply,tick,PIN,NEED,audGo,finale,finGo};
try{wReady('author')}catch(e){}
})()}catch(e){console.error('author.js',e)}
