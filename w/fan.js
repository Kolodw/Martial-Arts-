// 🔮 ไฟล์โลก "fan" — ทวีปแฟนตาซี เฟส 1 · โหลดผ่าน wLoad('fan') (BLOCK 311 ใน app.js) · ทางเข้า: หมวด 🔮 แฟนตาซี ในหน้าเลือกโลก
// โลกย่อย 4 แบบ: ⚔️ต่างโลก → 🛡️ ถูกอัญเชิญเป็นผู้กล้า · 🗑️ สกิลขยะ   |   🏰อะคาเดมี่ → 🔮 โรงเรียนเวท · 👑 โรงเรียนขุนนาง
// ระบบร่วม: มานา + เกินพิกัด · ธาตุ 6 + ธาตุหายาก · สัญญา (จ่ายทีหลัง) · คนที่จำคุณได้ (เหตุการณ์ย้อนกลับมาหลายปีต่อมา) · มินิเกม 3 แบบ · หลายฉากจบ + ฉากจบลับ
// สถานะอยู่ที่ S.mw.fan (ใช้โครงยุคปัจจุบันแบบเดียวกับนครม่านหมอก) · ห่อ passYear/focusOK/autoFocus/lifeMax/render/drawScene/sceneCap/openMenu ชั้นนอกสุด
(function(){'use strict';
const FN=()=>{try{return S&&S.mw&&S.mw.fan||null}catch(e){return null}};
const on=()=>!!(S&&S.alive&&FN());
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=Math.random,pick=a=>a[Math.floor(rnd()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const say=(t,c,big)=>log(t,c||'',big);
const feed=t=>addFeed('ev',t,'sum');
const O=(t,f,s,ai)=>({t,s:s||'',f,_x:1,ai});
const pc=p=>` <span class="tag2">(~${Math.round(cl(p,0,1)*100)}%)</span>`;
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
const age=()=>S.age|0;
const gold=v=>`${fmt(Math.round(v))} เหรียญทอง`;

// =================== ข้อมูล ===================
const WD={
 hero:{ic:'🛡️',n:'ถูกอัญเชิญเป็นผู้กล้า',g:'iso',a0:16,end:[64,80],d:'คุณกับเพื่อนร่วมห้องอีก 29 คนตื่นมากลางวงเวทในวิหารหินสีขาว นักบวชร้องไห้ด้วยความดีใจ ราชาบอกว่าโลกนี้ต้องการผู้กล้าไปปราบราชาปีศาจ',sc:'⛪ อาณาจักรอัลเวิร์น'},
 trash:{ic:'🗑️',n:'สกิลขยะ',g:'iso',a0:16,end:[60,78],d:'คุณถูกอัญเชิญพร้อมคนอื่น แต่แผ่นประเมินขึ้นสกิลของคุณว่า「เก็บของ」 ราชาหัวเราะ ทหารลากคุณไปทิ้งนอกกำแพงพร้อมเหรียญทองแดงสามเหรียญ',sc:'🏚️ สลัมนอกกำแพง'},
 magic:{ic:'🔮',n:'โลกเวทมนตร์',g:'aca',a0:12,end:[70,96],d:'จดหมายตอบรับมาพร้อมนกฮูกที่มีตาสามดวง วิทยาลัยเวทอาร์คาเนียรับนักเรียนปีละหกสิบคน และทุกปีจะมีคนไม่ได้กลับบ้าน',sc:'🏰 วิทยาลัยอาร์คาเนีย'},
 noble:{ic:'🏰',n:'โลกแห่งอะคาเดมี่',g:'aca',a0:12,end:[62,84],d:'สถาบันหลวงเซนต์ลูเมียรับเฉพาะลูกขุนนาง ปีนี้มีข้อยกเว้นหนึ่งคน คือคุณ เด็กทุนจากหมู่บ้านที่ไม่มีใครรู้จัก',sc:'🏛️ สถาบันหลวงเซนต์ลูเมีย'}};
const EL={fire:['🔥','ไฟ'],water:['💧','น้ำ'],wind:['🌪️','ลม'],earth:['🪨','ดิน'],light:['✨','แสง'],shadow:['🌑','เงา']};
const RARE={time:['⏳','เวลา','ย้อนจังหวะได้ครั้งละไม่กี่วินาที แต่อายุขัยหายทุกครั้งที่ใช้'],space:['🌀','มิติ','พับระยะทาง เปิดประตูไปที่ที่เคยเห็น'],death:['💀','ความตาย','ได้ยินเสียงคนตาย และคนตายได้ยินคุณ']};
const SK={ // สกิลติดตัว (ต่างโลก)
 hero:[['sword','⚔️','ดาบศักดิ์สิทธิ์','ฟันทุกอย่างที่มีความชั่วร้าย'],['shield','🛡️','โล่แห่งพันธสัญญา','รับแทนเพื่อนได้ครั้งละหนึ่งคน'],['appraise','🔍','ประเมินขั้นสูง','เห็นค่าสถานะและความลับของทุกคน'],['charm','💗','เสน่ห์ผู้กล้า','ทุกคนอยากช่วยคุณ ทั้งที่ไม่รู้ว่าทำไม']],
 trash:[['pick','🧺','เก็บของ','เก็บของได้ทุกอย่างที่มือจับได้'],['wait','⌛','รอ','ยิ่งรอนาน ผลยิ่งแรง'],['copy','📋','จดจำ','จำได้ทุกอย่างที่เห็นครั้งเดียว'],['taste','👅','ชิม','ชิมแล้วรู้ว่าสิ่งนั้นทำมาจากอะไร']]};
// สกิลขยะ: ชื่อจริงเมื่อโต (ระดับ 1→5)
const TRUE_SK={pick:['เก็บของ','เก็บของในระยะสายตา','เก็บพลังจากศพ','เก็บสกิลของคนอื่น','เก็บโลก'],wait:['รอ','รอเวลาที่เหมาะ','สะสมเวลา','หยุดเวลารอบตัว','รอให้โลกเปลี่ยน'],copy:['จดจำ','จดจำท่า','จดจำเวท','จดจำชีวิต','จดจำทุกสิ่งที่เคยมีอยู่'],taste:['ชิม','ชิมพิษ','ชิมเวท','ชิมวิญญาณ','กลืนทุกสิ่ง']};
const ORG={ // ชาติกำเนิดของสายอะคาเดมี่
 magic:[['farm','🌾','ลูกชาวนาที่เวทตื่นเองตอนแปดขวบ',{int:4}],['merch','⚖️','ลูกพ่อค้าที่จ่ายค่าเทอมได้',{gold:300}],['witch','🧙','หลานแม่มดป่า ที่วิทยาลัยไม่ชอบหน้า',{mp:20}],['noble','🏰','ลูกตระกูลจอมเวทที่ทุกคนคาดหวังมากเกินไป',{rank:-10}],['orph','🕯️','เด็กกำพร้าจากโบสถ์ ที่ไม่รู้ว่าพ่อแม่เป็นใคร',{luck:1}]],
 noble:[['scholar','📜','เด็กทุนที่สอบได้ที่หนึ่งของแคว้น',{int:6}],['bastard','🗡️','ลูกนอกสมรสของดยุก ที่ดยุกไม่ยอมรับ',{dark:5}],['merchant','💰','ลูกพ่อค้าที่ซื้อบรรดาศักดิ์มา',{gold:600}],['knight','🐎','ลูกอัศวินชั้นต่ำที่ฝึกดาบตั้งแต่เดิน',{pow:6}],['spyk','👁️','เด็กที่ถูกองค์กรลับส่งมาโดยไม่รู้ตัว',{secret:1}]]};
const NM_A=['อลิเซีย','เซเรน','ลิเวีย','เอลวีน','มิเรล','ไอริส','โรวีนา','เฟลิเซีย','ซาเรีย','นีเรีย','เอดิธ','คาเรน','วิโอลา','ลูเนีย'],NM_B=['คาเอล','ดาริอัส','ลูเซียน','โรวาน','เธโอ','เอเดน','ไซลาส','เกเบรียล','อัลริค','วิกเตอร์','เลออน','มาเธียส','ฟินน์','โอเรน'],LN=['แวนเดล','ฟอนเรน','แอชฟอร์ด','ไนท์เวล','สตอร์มเฮลม์','กรีนวูด','ไวท์ฮอลโลว์','ดาร์กมอร์','ซิลเวอร์ลีฟ','บลัดธอร์น','ริเวนเกต'];
const nm=g=>pick(g==='f'?NM_A:g==='m'?NM_B:(rnd()<.5?NM_A:NM_B))+' '+pick(LN);
// ชื่อสหายร่วมโลก (คนไทยที่ถูกอัญเชิญมาด้วย)
const TH=['ภูมิ','มิว','เจได','ฟ้าใส','ต้นกล้า','พิม','บอส','แพรว','โอม','น้ำหวาน','เก่ง','ปาล์ม','ไอซ์','เฟิร์น'];

// =================== สถานะ ===================
function newK(w,o){const K={v:1,w,yr:1,mp:30,mpM:30,el:o.el,rare:o.rare||null,sk:o.sk||null,skL:1,org:o.org||null,rep:0,dark:o.dark||0,rank:o.rank||30,grade:0,yrS:0,grad:0,clue:0,f:{},npc:{},later:[],con:[],arc:0,arcAt:age()+1,end:null,pw:o.pow||8,ends:{}};
 const P=(id,role,g)=>{K.npc[id]={n:nm(g),role,aff:R(30,55),alive:1,mem:[]}};
 if(w==='hero'||w==='trash'){K.npc.rival={n:pick(TH),role:'เพื่อนร่วมห้องที่ได้สกิลดีกว่า',aff:40,alive:1,mem:[]};K.npc.pal={n:pick(TH.filter(x=>x!==K.npc.rival.n)),role:'เพื่อนสนิทจากโลกเดิม',aff:70,alive:1,mem:[]};P('king','ราชาแห่งอัลเวิร์น','m');P('priest','นักบวชผู้อัญเชิญ','f');P('demon','ราชาปีศาจ','m');K.home=100}
 if(w==='trash'){P('fence','พ่อค้าของโจรในสลัม','m');P('kid','เด็กขโมยที่ตามคุณ',null)}
 if(w==='magic'){P('rival','คู่แข่งประจำรุ่น',null);P('mentor','อาจารย์ที่เวทมืดลือกันว่าเคยฆ่าคน','f');P('pal','เพื่อนร่วมห้องพักที่กลัวทุกอย่าง',null);P('head','อธิการบดีที่ไม่เคยมีใครเห็นหน้า','m')}
 if(w==='noble'){P('prince','องค์ชายรัชทายาท','m');P('lady','ธิดาดยุกผู้เป็นคู่หมั้นขององค์ชาย','f');P('rival','ลูกเคานต์ที่เกลียดเด็กทุน','m');P('maid','สาวใช้ประจำหอที่รู้ทุกเรื่อง','f');P('shadow','ชายสวมหน้ากากในงานเลี้ยง','m')}
 return K}
const npc=(K,id)=>K.npc[id]||{n:'ใครบางคน',role:'',aff:0,alive:0,mem:[]};
const N=(K,id)=>`<b>${E(npc(K,id).n)}</b>`;
const aff=(K,id,d)=>{const p=K.npc[id];if(!p)return'';p.aff=cl(p.aff+d,0,100);return d?` <span class="tag2">(${E(p.n.split(' ')[0])} ${d>0?'+':''}${d})</span>`:''};
const mem=(K,id,t)=>{const p=K.npc[id];if(p){p.mem.push([age(),t]);if(p.mem.length>8)p.mem.shift()}};
const later=(K,dy,id,d)=>{K.later.push({at:age()+dy,id,d:d||{}})};
const capOf=K=>Math.round(20+Math.pow(age()-WD[K.w].a0+1,1.35)*6+K.skL*40+(K.grad?120:0));
function sync(){const K=FN();if(!K)return;S.power=Math.round(K.pw);const mh=Math.round(60+K.pw*.25);if(S.maxHp<mh)S.maxHp=mh;S.mw.end=(K.endY||70)+(S.mw.wsL|0);S.money=Math.max(0,Math.round(S.money||0));K.mp=cl(K.mp,0,K.mpM)}
const pw=d=>{const K=FN();const g=Math.max(1,Math.round(d));K.pw+=g;return ` · พลัง +${fmt(g)}`};
const money=d=>{S.money=Math.max(0,(S.money||0)+Math.round(d));return d?` · ${d>0?'+':''}${gold(d)}`:''};
const hurt=f=>{S.hp=Math.max(0,S.hp-Math.round(S.maxHp*f));return ` · บาดเจ็บ −${Math.round(f*100)}%`};
const heal=f=>{S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*f))};
const mana=d=>{const K=FN();K.mp=cl(K.mp+d,0,K.mpM);return ''};
const dark=d=>{const K=FN();K.dark=cl(K.dark+d,0,100);return d>0?` · 🌑 ความมืด +${d}`:d<0?` · ✨ ความมืด ${d}`:''};
const rep=d=>{const K=FN();K.rep+=d;return d?` · ชื่อเสียง ${d>0?'+':''}${d}`:''};
const clue=(K,t)=>{K.clue++;try{encAdd&&0}catch(e){}return ` · 🗝️ <b>เบาะแสลับ ${K.clue}/3</b>${t?': '+t:''}`};
// ใช้เวทเกินพิกัด: ได้ผลแรงขึ้น แต่เสี่ยง
function overcast(K){const over=K.mp<20;if(!over){K.mp-=20;return{ok:1,t:''}}const r=rnd();if(r<.35){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.3));return{ok:1,t:' · 🩸 เวทเกินพิกัด เลือดไหลออกจากตา'}}if(r<.5){K.endY=Math.max(age()+2,(K.endY||70)-3);return{ok:1,t:' · ⏳ เวทเกินพิกัดกินอายุขัย −3 ปี'}}if(r<.6){return{ok:0,t:' · 💥 เวทย้อนกลับเข้าตัว'+hurt(.35)}}return{ok:1,t:' · ⚠️ มานาหมดแต่ยังฝืนได้'}}
const fight=(ep)=>S.power*(.75+rnd()*.5)>=ep;
const winP=ep=>cl((S.power*1.25-ep)/(S.power*.5),0,1);
const threat=K=>Math.max(10,capOf(K)*(.55+rnd()*.35));

// =================== คิวเหตุการณ์ ===================
const QU=[];function queue(f){QU.push(f)}
let FL=0;function flush(){if(!QU.length||FL)return;FL=1;const go=()=>{if(!on()){QU.length=0;FL=0;return}if(choice._cur||modalOpen)return setTimeout(go,700);const f=QU.shift();if(typeof f==='function')try{f()}catch(e){console.error('fan ev',e)}if(QU.length)setTimeout(go,900);else FL=0};setTimeout(go,300)}
const C=(t,x,o)=>{try{setScene('fan')}catch(e){}try{if(window._fanCL)window._fanCL.push(age()+':'+String(t).replace(/<[^>]+>/g,'').slice(0,24))}catch(e){}return choice(t,x,o)};

// =================== มินิเกม ===================
const mgCss=document.createElement('style');mgCss.textContent=`
.fmg{text-align:center;color:#f4ecd8}.fmg h3{margin:4px 0}.fmg .tg{font-size:12px;color:#b9b0d2;margin-bottom:8px}
.fmgR{position:relative;width:220px;height:220px;margin:6px auto;border-radius:50%;background:radial-gradient(circle,#1c1633 55%,#2a2050 56%,#1c1633 70%);box-shadow:0 0 24px #a06cff55}
.fmgR .zn{position:absolute;inset:0;border-radius:50%}.fmgR .nd{position:absolute;left:50%;top:50%;width:4px;height:100px;margin-left:-2px;background:linear-gradient(#ffd37a,#ff6b4a);transform-origin:50% 0;border-radius:2px}
.fmgR .ct{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:34px}
.fmgG{display:grid;grid-template-columns:repeat(3,64px);gap:8px;justify-content:center;margin:8px 0}.fmgG button{height:64px;font-size:28px;border-radius:14px;border:1.5px solid #4a3f70;background:#1c1633;color:#fff;cursor:pointer}
.fmgG button.lit{background:#ffd37a;border-color:#fff;transform:scale(1.06)}.fmgG button.bad{background:#ff4d6d}
.fmgS{display:flex;justify-content:center;gap:6px;margin:6px 0;font-size:22px;min-height:30px}
.fmgB{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px}.fmgB button{min-width:92px;padding:10px;border-radius:12px;border:1.5px solid #c08cff;background:#26163f;color:#fff;font:inherit;cursor:pointer}
`;document.head.appendChild(mgCss);
const autoSc=()=>.45+rnd()*.4;
// 1) วงเวทหมุน: หยุดเข็มในวงสีทอง (3 รอบ)
function mgRing(title,cb){if(auto)return cb(autoSc());let round=0,score=0,ang=0,sp=3.2,zone=0,raf=0,done=0;const ZW=46;
 const newZ=()=>{zone=R(30,300);sp=3.2+round*1.1};newZ();
 const draw=()=>{const z=document.getElementById('fmgZ'),n=document.getElementById('fmgN'),r=document.getElementById('fmgRd');if(!z||!n){cancelAnimationFrame(raf);if(!done){done=1;cb(score/3)}return}
  z.style.background=`conic-gradient(transparent ${zone}deg,#ffd37a ${zone}deg ${zone+ZW}deg,transparent ${zone+ZW}deg)`;n.style.transform=`rotate(${ang+180}deg)`;if(r)r.textContent=`รอบ ${round+1}/3 · คะแนน ${score.toFixed(1)}`};
 const loop=()=>{ang=(ang+sp)%360;draw();raf=requestAnimationFrame(loop)};
 window._fmgHit=()=>{if(done)return;const c=zone+ZW/2,d=Math.abs(((ang-c+540)%360)-180);const s=d<ZW*.22?1:d<ZW/2?.7:d<ZW?.3:0;score+=s;try{navigator.vibrate&&navigator.vibrate(s>=.7?25:60)}catch(e){}round++;if(round>=3){done=1;cancelAnimationFrame(raf);closeM();cb(score/3)}else newZ()};
 modal(`<div class="fmg"><h3>🔮 ${title}</h3><div class="tg">แตะ "ร่าย" ตอนเข็มชี้ในวงสีทอง · ยิ่งตรงกลางยิ่งแรง</div><div class="fmgR"><div class="zn" id="fmgZ"></div><div class="nd" id="fmgN"></div><div class="ct">✴️</div></div><div class="tg" id="fmgRd"></div><div class="fmgB"><button onclick="_fmgHit()" style="min-width:180px;font-size:18px">✨ ร่าย</button></div></div>`,'fanmg');loop()}
// 2) จำลำดับรูน
function mgRune(title,len,cb){if(auto)return cb(autoSc());const RU=['ᚠ','ᚱ','ᚦ','ᛉ','ᛟ','ᚹ','ᛞ','ᛗ','ᛒ'],seq=[];for(let i=0;i<len;i++)seq.push(R(0,8));let inp=[],lock=1,done=0;
 const btns=()=>[...document.querySelectorAll('#fmgRG button')];
 const show=i=>{if(i>=seq.length){lock=0;const t=document.getElementById('fmgRT');if(t)t.textContent='ตาคุณแล้ว: กดตามลำดับ';return}const b=btns()[seq[i]];if(!b)return;b.classList.add('lit');setTimeout(()=>{b.classList.remove('lit');setTimeout(()=>show(i+1),180)},520)};
 window._fmgRune=k=>{if(lock||done)return;const b=btns()[k];inp.push(k);const ok=seq[inp.length-1]===k;if(b){b.classList.add(ok?'lit':'bad');setTimeout(()=>b.classList.remove('lit','bad'),220)}
  const s=document.getElementById('fmgRS');if(s)s.textContent=inp.map(i=>RU[i]).join(' ');
  if(!ok||inp.length===seq.length){done=1;const sc=ok?1:(inp.length-1)/seq.length;setTimeout(()=>{closeM();cb(sc)},450)}};
 modal(`<div class="fmg"><h3>ᚱ ${title}</h3><div class="tg" id="fmgRT">จำลำดับรูนที่สว่างขึ้น (${len} ตัว)</div><div class="fmgS" id="fmgRS"></div><div class="fmgG" id="fmgRG">${RU.map((r,i)=>`<button onclick="_fmgRune(${i})">${r}</button>`).join('')}</div></div>`,'fanmg');setTimeout(()=>show(0),700)}
// 3) อ่านใจ: เลือกคำพูดให้ตรงอารมณ์อีกฝ่าย (ในงานเลี้ยง / การเจรจา) — 3 รอบ อีกฝ่ายส่งสัญญาณจากท่าทาง
function mgRead(title,who,cb){if(auto)return cb(autoSc());const MOOD=[['เบื่อ','ขยับแก้วไวน์ไปมา มองไปทางประตู',0],['ระแวง','ยิ้มแต่ตาไม่ยิ้ม ถอยเท้าครึ่งก้าว',1],['สนใจ','โน้มตัวเข้ามา ถามซ้ำคำที่คุณพูด',2],['โกรธ','กำพัดแน่นจนข้อนิ้วขาว',3]];
 const ANS=[['เล่าเรื่องตลกสั้นๆ',[1,0,.3,0]],['ยอมรับตรงๆ ว่าคุณไม่ได้มาร้าย',[.2,1,.4,.6]],['เปิดเผยข้อมูลที่เขาอยากรู้',[.3,.2,1,.1]],['ขอโทษและถอยหนึ่งก้าว',[0,.4,0,1]]];
 let round=0,score=0,cur=null;const nxt=()=>{cur=pick(MOOD);const t=document.getElementById('fmgMd');if(t)t.innerHTML=`รอบ ${round+1}/3 · ${E(who)} <b>${cur[1]}</b>`};
 window._fmgRead=i=>{if(!cur)return;score+=ANS[i][1][cur[2]];round++;if(round>=3){cur=null;closeM();cb(score/3)}else nxt()};
 modal(`<div class="fmg"><h3>🎭 ${title}</h3><div class="tg">อ่านท่าทางแล้วเลือกคำพูดให้ตรงอารมณ์</div><div class="tg" id="fmgMd" style="font-size:14px;color:#f4ecd8;min-height:40px"></div><div class="fmgB">${ANS.map((a,i)=>`<button onclick="_fmgRead(${i})">${a[0]}</button>`).join('')}</div></div>`,'fanmg');nxt()}
const grade=s=>s>=.85?'สมบูรณ์แบบ':s>=.6?'ดี':s>=.35?'พอใช้':'ล้มเหลว';

// =================== ฉากจบ ===================
const ENDS={
 hero:{home:['🏠','กลับบ้าน','ทำลายราชาปีศาจแล้วใช้วงเวทกลับโลกเดิม'],throne:['👑','ผู้กล้าบนบัลลังก์','ยึดอาณาจักรที่หลอกใช้คุณ'],peace:['🕊️','สันติภาพที่ไม่มีใครเชื่อ','จับมือกับราชาปีศาจ'],betray:['🗡️','มีดจากข้างหลัง','ตายด้วยมือเพื่อนร่วมห้อง'],newking:['😈','ราชาปีศาจองค์ใหม่','สวมมงกุฎของคนที่คุณถูกส่งมาฆ่า'],loop:['🌀','ผู้อัญเชิญคนแรก','???',1]},
 trash:{legend:['🌟','ตำนานจากกองขยะ','สกิลที่ทุกคนหัวเราะ กลายเป็นสกิลที่ทุกคนกลัว'],revenge:['🔥','ราชาเถ้าถ่าน','กลับไปเผาวังที่เคยทิ้งคุณ'],quiet:['🍞','ร้านขนมปังหน้าประตูเมือง','เลือกชีวิตเล็กๆ ที่ไม่มีใครมาทิ้งได้อีก'],eaten:['🕳️','ถูกสกิลกลืน','สกิลโตเร็วกว่าตัวคุณ'],god:['♾️','สิ่งที่ถูกเก็บไว้','???',1]},
 magic:{arch:['🎓','จอมเวทสูงสุด','ขึ้นเป็นอธิการบดีคนใหม่'],hedge:['🌿','แม่มดชายป่า','ถูกไล่ออก แต่หมู่บ้านทั้งหมู่บ้านรักคุณ'],lich:['☠️','ผู้ไม่ยอมตาย','แลกความเป็นคนกับเวลาไม่สิ้นสุด'],maze:['🌫️','ชื่อบนกำแพงเขาวงกต','หนึ่งในคนที่ไม่ได้กลับบ้าน'],heart:['❤️‍🔥','หัวใจของวิทยาลัย','???',1]},
 noble:{crown:['💍','คู่ชีวิตของรัชทายาท','แต่งเข้าราชวงศ์'],savior:['🛡️','ผู้ช่วยแผ่นดิน','เปิดโปงแผนลอบสังหาร'],exec:['⚖️','แท่นประหาร','ถูกใส่ร้ายจนจบชีวิตกลางลาน'],shadow:['🎭','ผู้ปกครองในเงา','ไม่มีใครรู้ว่าใครคุมอาณาจักรจริงๆ'],mask:['🃏','หน้ากากใบสุดท้าย','???',1]}};
function endRec(K,k){try{const L=LS.get('murim_fanend',{})||{};L[K.w+':'+k]=(L[K.w+':'+k]|0)+1;LS.set('murim_fanend',L)}catch(e){}}
function ending(K,k,t,cause){if(K.end)return;K.end=k;endRec(K,k);const e=ENDS[K.w][k];
 say(`${e[0]} <b>ฉากจบ${e[3]?'ลับ':''}: ${e[1]}</b> — ${t}`,'myth',true);try{keyAdd(`${S.age} ปี — ฉากจบ「${e[1]}」`)}catch(x){}try{kAdd(`ฉากจบ${e[3]?'ลับ':''}「${e[1]}」ใน${WD[K.w].n}`)}catch(x){}
 K.endC=cause||t;S.deathCause=K.endC;setTimeout(()=>{try{if(S.alive&&!S.deathCause)S.deathCause=K.endC;checkDeath()}catch(x){}},700)}
window.fanEnds=function(){const L=LS.get('murim_fanend',{})||{};let h='';for(const w in ENDS){const got=Object.keys(ENDS[w]).filter(k=>L[w+':'+k]).length;h+=`<div class="item"><b>${WD[w].ic} ${WD[w].n}</b> <span class="tag2">${got}/${Object.keys(ENDS[w]).length}</span><div style="display:flex;flex-direction:column;gap:3px;margin-top:5px">${Object.keys(ENDS[w]).map(k=>{const e=ENDS[w][k],g=L[w+':'+k];return`<div style="font-size:13px;${g?'':'opacity:.55'}">${g?e[0]+' <b>'+e[1]+'</b> · '+e[2]:(e[3]?'🔒 ฉากจบลับ ???':'🔒 '+e[1]+' · ???')}</div>`}).join('')}</div></div>`}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📜 ฉากจบทวีปแฟนตาซี</h3><p class="tag2">ทุกโลกย่อยมีหลายฉากจบ และมีฉากจบลับที่ต้องเก็บเบาะแสลับให้ครบ 3 ชิ้นในชีวิตเดียว</p>${h}`,'fanend')};

// =================== โฟกัสรายปี ===================
const school=K=>(K.w==='magic'||K.w==='noble')&&!K.grad&&!K.f.expelled;
const FOK={
 hero:[['fa_sw','⚔️','ฝึกดาบกับอัศวิน'],['fa_mg','✨','เรียนเวทกับนักบวช'],['fa_hunt','🐺','ออกล่ามอนสเตอร์'],['fa_truth','🕯️','สืบความลับของวัง'],['fa_pal','🫂','อยู่กับเพื่อนร่วมโลก'],['fa_rest','🍵','พักผ่อน']],
 trash:[['fa_job','🧺','รับจ้างในสลัม'],['fa_sk','🗑️','ฝึกสกิลขยะ'],['fa_hunt','🐀','ล่ามอนสเตอร์อ่อนๆ'],['fa_guild','📜','รับเควสกิลด์',K=>K.f.guild],['fa_spy','👂','ตามข่าวคนที่ทิ้งคุณ'],['fa_rest','🍵','พักผ่อน']],
 magic:[['fa_cls','📚','เข้าเรียน',school],['fa_lib','📖','ขลุกห้องสมุด',school],['fa_prac','✴️','ฝึกเวทในหอคอย'],['fa_soc','☕','คบเพื่อนในหอ',school],['fa_forb','🚪','แอบเข้าเขตต้องห้าม',school],['fa_res','⚗️','วิจัยเวท',K=>!school(K)],['fa_work','💼','รับงานจอมเวท',K=>!school(K)],['fa_hunt','🐉','ล่าสัตว์เวท',K=>!school(K)],['fa_rest','🍵','พักผ่อน']],
 noble:[['fa_cls','📚','เข้าเรียน',school],['fa_ball','💃','งานเลี้ยงและสังคม'],['fa_fence','🤺','ฝึกดาบและมารยาท'],['fa_inv','🕵️','สืบเรื่องลับในวัง'],['fa_ally','🤝','สร้างพันธมิตร'],['fa_court','🏛️','ทำงานราชสำนัก',K=>!school(K)],['fa_rest','🍵','พักผ่อน']]};
const fList=K=>FOK[K.w].filter(f=>!f[3]||f[3](K));
function doFocus(K){const f=S.focus,c=capOf(K),w=K.w;let t='';
 const train=m=>K.pw<c?pw((c-K.pw)*m+R(1,4)):pw(R(1,3));
 if(f==='fa_sw'){t=`⚔️ ฝึกดาบกับ${pick(['อัศวินหลวง','ครูดาบตาเดียว','หัวหน้าองครักษ์'])}จนมือพอง${train(.18)}`;aff(K,'rival',-1)}
 else if(f==='fa_mg'){mana(15);K.mpM+=R(2,5);t=`✨ เรียนเวทกับ${N(K,'priest')} · มานาสูงสุด +`;if(K.sk==='appraise'&&rnd()<.15&&!K.f.prL){K.f.prL=1;t+=` · 🔍 สกิลประเมินเห็นบรรทัดหนึ่งในสถานะของนักบวช: 「ผู้อัญเชิญ: รอบที่ 7」`+clue(K,'นักบวชเคยอัญเชิญมาแล้วหกครั้ง')}}
 else if(f==='fa_hunt'){const ep=threat(K);if(fight(ep)){t=`🐺 ล่า${pick(w==='magic'?['กริฟฟินหลงฝูง','สไลม์เงิน','หมาป่าเงา']:['ก็อบลินสามตัว','หมาป่าตาแดง','ออร์กหลงทาง','แมงมุมยักษ์'])}สำเร็จ${money(R(20,60)*(1+K.skL*.3))}${train(.1)}${rep(1)}`;if(rnd()<.06&&K.clue<3)t+=' · พบหน้ากระดาษบันทึกเก่าในรังมอนสเตอร์ ลายมือเหมือนของคุณเอง'+clue(K,'บันทึกที่เขียนด้วยลายมือคุณ')}else t=`🐺 ล่ามอนสเตอร์พลาดท่า${hurt(.22)}`}
 else if(f==='fa_truth'){K.f.truth=(K.f.truth|0)+1;t=`🕯️ แอบค้นหอจดหมายเหตุของวังตอนกลางคืน · ความจริง ${K.f.truth}`;if(K.f.truth===3)t+=' · พบรายชื่อผู้กล้ารุ่นก่อน ทุกคนตายก่อนอายุ 30';if(K.f.truth>=5&&!K.f.trC){K.f.trC=1;t+=clue(K,'วงเวทอัญเชิญถูกวาดด้วยเลือดของผู้กล้าคนแรก')}}
 else if(f==='fa_pal'){t=`🫂 นั่งคุยกับ${N(K,'pal')}เรื่องบ้าน ${pick(['ร้านหมูกระทะหน้าโรงเรียน','เพลงที่ฟังตอนติดฝน','แม่ที่คงตามหาอยู่'])}${aff(K,'pal',5)}`;K.home=cl((K.home|0)+3,0,100)}
 else if(f==='fa_job'){t=`🧺 รับจ้าง${pick(['ขนศพจากตรอก','ล้างจานโรงเตี๊ยม','ขุดท่อระบายน้ำ','เฝ้าโกดังให้พ่อค้าของโจร'])}${money(R(8,25))}`}
 else if(f==='fa_sk'){K.skx=(K.skx|0)+R(8,15)+(S.int|0)/20;t=`🗑️ ฝึกสกิล「${TRUE_SK[K.sk][K.skL-1]}」${pick(['กับก้อนหินทั้งวัน','จนหัวแทบระเบิด','ทั้งที่คนในสลัมหัวเราะ'])} · ความชำนาญ ${Math.min(100,Math.round(K.skx))}%`;if(K.skx>=100&&K.skL<5)queue(()=>evSkillUp(K))}
 else if(f==='fa_guild'){const ep=threat(K)*1.1;if(fight(ep)){t=`📜 ทำเควสกิลด์${pick(['คุ้มกันกองคาราวาน','กำจัดรังค้างคาว','ตามหาแมวขุนนาง','สำรวจดันเจี้ยนชั้นตื้น'])}สำเร็จ${money(R(40,110))}${rep(2)}${train(.08)}`}else t=`📜 เควสกิลด์ล้มเหลว${hurt(.2)}`}
 else if(f==='fa_spy'){t=`👂 ฟังข่าวในโรงเตี๊ยม: ${N(K,'rival')} ${pick(['ได้รับยศอัศวินแล้ว','ฆ่ามังกรได้ตัวหนึ่ง','กำลังจะแต่งงานกับเจ้าหญิง','บาดเจ็บหนักในสงคราม'])}`;K.f.spy=(K.f.spy|0)+1}
 else if(f==='fa_cls'){S.int=(S.int||0)+R(2,5);K.yrS+=R(8,14)+(S.int|0)/25;t=`📚 เข้าเรียน${pick(w==='magic'?['ทฤษฎีวงเวท','ประวัติศาสตร์สงครามเวท','ปรุงยาขั้นต้น','ภาษารูนโบราณ']:['กฎหมายแผ่นดิน','ประวัติราชวงศ์','การคลัง','ยุทธศาสตร์'])} · ปัญญา +`}
 else if(f==='fa_lib'){S.int=(S.int||0)+R(3,6);K.yrS+=R(5,10);t=`📖 ขลุกห้องสมุดจนบรรณารักษ์ล็อกประตูขังไว้ข้างใน`;if(rnd()<.12&&!K.rare){K.f.rareHint=1;t+=' · เจอหนังสือที่พูดถึงธาตุซึ่งไม่อยู่ในตำราเรียน'}}
 else if(f==='fa_prac'){mana(10);K.mpM+=R(2,6);t=`✴️ ฝึก${EL[K.el][0]}เวทธาตุ${EL[K.el][1]}${train(.16)}`;if(K.mp<15){const o=overcast(K);t+=o.t}}
 else if(f==='fa_soc'){t=`☕ นั่งในห้องนั่งเล่นของหอกับ${N(K,'pal')}${aff(K,'pal',4)}`;if(rnd()<.3)t+=` · ข่าวลือ: ${pick(['ห้องที่ 13 ของปีกตะวันตกไม่มีประตู','อธิการบดีไม่ได้กินข้าวมาสามร้อยปี','รุ่นพี่ที่หายไปปีก่อน ยังมีคนเห็นในกระจก'])}`;K.yrS+=2}
 else if(f==='fa_forb'){const r=rnd();if(r<.4){t=`🚪 แอบเข้าเขตต้องห้ามตอนเที่ยงคืน${pw(capOf(K)*.08)}${dark(3)}`;if(rnd()<.25)t+=clue(K,'ผนังเขตต้องห้ามอุ่นเหมือนผิวคน')}else if(r<.7){K.yrS-=10;t='🚪 ถูกยามรูปปั้นจับได้ หักคะแนนความประพฤติ'}else t='🚪 แอบเข้าเขตต้องห้าม แต่เจอแค่ทางตัน · ได้ยินเสียงหายใจหลังกำแพง'}
 else if(f==='fa_res'){S.int=(S.int||0)+R(2,4);K.f.res=(K.f.res|0)+1;t=`⚗️ วิจัย${pick(['วงเวทเก็บแสงแดด','ยาต่ออายุจากเกล็ดมังกร','ภาษาของต้นไม้','เวทย้อนเงา'])}${money(R(20,70))}`;if(K.f.res%5===0)t+=rep(5)}
 else if(f==='fa_work'){t=`💼 รับงาน${pick(['ไล่ผีปราสาทเก่า','ทำฝนให้หมู่บ้านแล้ง','ปลดคำสาปลูกขุนนาง','ตรวจสอบวงเวทกำแพงเมือง'])}${money(R(60,160))}${rep(1)}`}
 else if(f==='fa_ball'){S.cha=(S.cha||0)+R(1,3);const who=pick(['prince','lady','rival']);t=`💃 งานเลี้ยงที่${pick(['ห้องโถงกระจก','สวนกุหลาบหลวง','เรือสำราญของดยุก'])} เต้นรำกับ${N(K,who)}${aff(K,who,who==='rival'?-3:4)}`;K.yrS+=3}
 else if(f==='fa_fence'){t=`🤺 ฝึกดาบและมารยาทจนรู้ว่าส้อมเล่มไหนใช้แทงคนได้${train(.15)}`}
 else if(f==='fa_inv'){K.f.evid=(K.f.evid|0)+(rnd()<.45?1:0);t=`🕵️ สืบเรื่องลับในวัง · หลักฐาน ${K.f.evid|0}`;if(rnd()<.2)t+=` · ${N(K,'maid')}กระซิบว่ามีคนเห็นชายสวมหน้ากากเข้าห้องดยุกตอนตีสาม${aff(K,'maid',3)}`}
 else if(f==='fa_ally'){K.f.ally=(K.f.ally|0)+1;t=`🤝 ผูกมิตรกับ${pick(['ลูกบารอนชายแดน','ทายาทสมาคมพ่อค้า','อัศวินฝึกหัดผู้ซื่อสัตย์','หมอหลวง'])} · พันธมิตร ${K.f.ally}`}
 else if(f==='fa_court'){t=`🏛️ ทำงานราชสำนัก${money(R(50,130))}${rep(2)}`;K.f.court=(K.f.court|0)+1}
 else if(f==='fa_rest'){heal(.3);mana(30);t=pick(['🍵 นอนกลางวันใต้ต้นไม้ที่มีผลเป็นแสง','🍵 อาบน้ำพุร้อนกลางป่า','🍵 นั่งดูดาวสองดวงจันทร์'])}
 if(t)feed(t)}

// =================== ปีละครั้ง ===================
function fanYear(){const K=FN();if(K.end&&K.endC){S.deathCause=K.endC;try{checkDeath()}catch(e){}if(!S.alive)return}try{if(auto)autoFocus()}catch(e){}S.age++;S.mw.y++;K.yr++;
 K.mp=Math.min(K.mpM,K.mp+Math.round(K.mpM*.45));
 try{doFocus(K)}catch(e){console.error('fan focus',e)}
 if(school(K)&&age()>=13&&K.exY!==age()){K.exY=age();const ey=age()-WD[K.w].a0;queue(()=>evExam(K,ey))}
 for(const L of K.later.slice()){if(L.at<=age()){K.later.splice(K.later.indexOf(L),1);queue(()=>doLater(K,L))}}
 for(const c of K.con.slice()){if(c.at<=age()&&!c.paid){queue(()=>conDue(K,c))}}
 if(age()>=K.arcAt&&!K.end&&K.arcQ!==K.arc+':'+age()){K.arcQ=K.arc+':'+age();const st=K.arc;queue(()=>arcStep(K,st))}
 if(rnd()<.55&&!K.end&&QU.length<1)queue(()=>randEv(K));
 if(!S.spouse&&age()>=18&&rnd()<.14&&QU.length<2)queue(()=>evLove(K));
 if((K.w==='hero'||K.w==='trash')&&rnd()<.08&&!K.f.homeAsk)queue(()=>evHomesick(K));
 sync();try{render()}catch(e){}checkDeath();saveGame();if(QU.length)flush()}

// =================== สอบปลายปี (อะคาเดมี่) ===================
function evExam(K,y0){const y=y0||age()-WD[K.w].a0;if(!school(K))return;if(y>6){K.grad=1;return}
 const mg=K.w==='noble'?(cb=>mgRead('สอบปากเปล่าต่อหน้าคณะกรรมการ','ประธานกรรมการ',cb)):(y%2?(cb=>mgRune(`สอบปลายปีที่ ${y}`,3+Math.min(3,Math.floor(y/2)),cb)):(cb=>mgRing(`สอบปฏิบัติปีที่ ${y}`,cb)));
 C(`📝 สอบปลายปีที่ ${y}`,`${WD[K.w].sc} · คะแนนสะสมปีนี้ ${Math.round(K.yrS)} · อันดับรุ่น ${K.rank}/60${K.f.fail?' · ⚠️ เคยสอบตกแล้ว 1 ครั้ง ตกอีกครั้งโดนไล่ออก':''}`,[
  O('✍️ สอบตามปกติ',()=>mg(sc=>examRes(K,sc,y)),'มินิเกม',.6),
  O('📜 โกงข้อสอบ',()=>{if(rnd()<.55+(S.int|0)/400){examRes(K,.8,y);feed('📜 แอบดูกระดาษคำตอบสำเร็จ'+dark(4))}else{K.yrS-=30;examRes(K,0,y);feed('📜 กระดาษโกงลุกเป็นไฟกลางห้องสอบ ทุกคนหันมามอง'+rep(-3))}},'เสี่ยง',.15)])}
function examRes(K,sc,y0){if(K.grad)return;const y=y0||age()-WD[K.w].a0,tot=sc*60+K.yrS/2;K.yrS=0;const d=Math.round((tot-40)/4);K.rank=cl(K.rank-d,1,60);
 if(tot<25){if(K.f.fail){K.f.expelled=1;say(`📝 สอบตกเป็นครั้งที่สอง · <b>ถูกไล่ออกจาก${WD[K.w].sc}</b> ชื่อคุณถูกขูดออกจากผนังหอ`,'bad',true);mem(K,'rival','เห็นคุณถูกไล่ออก');return}K.f.fail=1;say(`📝 สอบปลายปีที่ ${y}: <b>${grade(sc)}</b> · ตก ต้องซ่อมชั้น · อันดับ ${K.rank}/60`,'bad');return}
 say(`📝 สอบปลายปีที่ ${y}: <b>${grade(sc)}</b> · อันดับรุ่น ${K.rank}/60${K.rank<=3?' 🏅':''}`,sc>=.85?'epic':'');
 if(sc>=.95&&!K.f.perf){K.f.perf=1;say(`✴️ คะแนนเต็มทุกข้อ ครูคนหนึ่งมองคุณนานผิดปกติ แล้วเขียนบางอย่างลงสมุดปกดำ`+clue(K,'สมุดปกดำของครูมีชื่อนักเรียนที่หายไปทุกคน'),'epic')}
 if(y>=6){K.grad=1;queue(()=>evGrad(K))}}
function evGrad(K){const top=K.rank<=5;
 C(`🎓 พิธีจบการศึกษา`,`อันดับสุดท้าย ${K.rank}/60 · ${top?'ชื่อคุณถูกขานเป็นคนแรกๆ':'ชื่อคุณอยู่ท้ายแถว'} · ทุกทางที่เลือกวันนี้จะพาไปคนละชีวิต`,K.w==='magic'?[
  O('🎓 เป็นศิษย์ของอธิการบดี',()=>{K.f.arch=1;K.endY+=8;say('🎓 อธิการบดีส่งจดหมายมาโดยไม่มีคนส่ง: 「มาพบข้าที่ห้องที่ไม่มีประตู」'+(K.clue>=2?clue(K,'ห้องที่ไม่มีประตูคือห้องที่ 13'):''),'epic')},top?'รับเฉพาะ 5 อันดับแรก':'อันดับไม่ถึง (ลองยื่นได้ แต่อาจถูกปฏิเสธ)',top?.5:.1),
  O('🌍 ออกเดินทางเป็นจอมเวทพเนจร',()=>{K.f.wander=1;feed('🌍 คุณเก็บกระเป๋าใบเดียว ออกจากประตูวิทยาลัยโดยไม่หันกลับ')},'อิสระ',.3),
  O('🏛️ รับราชการเป็นจอมเวทหลวง',()=>{K.f.court=1;money(500);feed('🏛️ ได้ตราจอมเวทหลวงและเงินเดือนแรก')},'มั่นคง',.3)]:[
  O('🏛️ รับตำแหน่งในราชสำนัก',()=>{K.f.court=(K.f.court|0)+2;money(400);feed('🏛️ คุณได้ตำแหน่งเลขานุการกรมคลัง ที่ที่เงินของแผ่นดินไหลผ่าน')},'',.4),
  O('🐎 เป็นอัศวินคุ้มกันองค์ชาย',()=>{aff(K,'prince',12);K.f.guard=1;feed('🐎 คุณได้ยืนข้างองค์ชายทุกงานพิธี และเห็นทุกคนที่ยิ้มให้เขาด้วยมีดในแขนเสื้อ')},'ใกล้ชิดราชวงศ์',.4),
  O('🎭 หายตัวไปจากสังคม',()=>{K.f.vanish=1;dark(6);feed('🎭 คุณไม่ไปงานจบการศึกษาของตัวเอง คนลือกันว่าคุณตายไปแล้ว')},'',.2)])
 if(top&&K.w==='magic')null}
// =================== สกิลขยะโตขึ้น ===================
function evSkillUp(K){if(K.skL>=5)return;K.skx=0;K.skL++;const n=TRUE_SK[K.sk][K.skL-1];K.pw+=capOf(K)*.25;
 say(`🗑️ สกิลของคุณสั่นเหมือนหัวใจ ข้อความในหัวขึ้นมาเอง: 「สกิล <b>${n}</b> ปลดล็อก」 (ระดับ ${K.skL}/5)`,'myth',true);
 if(K.skL===4)queue(()=>C('🗑️ สกิลหิว',`ทุกคืนหลังสกิลขึ้นระดับ 4 คุณฝันว่ากำลังกินอะไรสักอย่างที่ไม่มีรูปร่าง ตื่นมาท้องว่างทุกครั้ง`,[
  O('🍖 ให้สกิลกินตามที่มันอยาก',()=>{K.f.feed=(K.f.feed|0)+1;K.pw+=capOf(K)*.3;feed('🍖 คุณปล่อยให้สกิลกินพลังจากสัตว์ป่าทั้งฝูง พลังพุ่ง'+dark(10))},'แรงขึ้นมาก',.4),
  O('🔒 ขังมันไว้ด้วยเจตจำนง',()=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));K.f.lock=1;feed('🔒 คุณกัดฟันจนเลือดออกทุกคืนเป็นปี สกิลเงียบลง')},'เจ็บ แต่ยังเป็นคุณ',.5)]))}

// =================== เนื้อเรื่องหลัก (ไม่เส้นตรง: ทุกบททิ้งธงไว้ให้บทหลังหยิบมาใช้) ===================
const nextArc=(K,gap)=>{K.arc++;K.arcAt=age()+(gap||(WD[K.w].g==='aca'&&K.arc<=(K.w==='magic'?5:6)?1:R(2,4)))};
function arcStep(K,st){if(st!=null&&st!==K.arc)return;const f=ARC[K.w][K.arc];if(!f){K.arcAt=999;return}const y=age()-WD[K.w].a0;if((K.w==='magic'&&K.arc>=4&&K.arc<=5&&y<5&&!K.f.expelled)||(K.w==='noble'&&K.arc===5&&y<6)){K.arcAt=age()+1;return}try{f(K)}catch(e){console.error('fan arc',K.w,K.arc,e);nextArc(K)}}
const ARC={
 hero:[
  K=>{C('⛪ พิธีประเมินผู้กล้า',`ผู้กล้าทั้ง 30 คนต่อแถววางมือบนลูกแก้ว สกิลของคุณคือ <b>${SK.hero.find(s=>s[0]===K.sk)[2]}</b> ${N(K,'rival')}ได้สกิลระดับตำนาน ส่วนเด็กเงียบๆ ท้ายแถวได้สกิลที่ไม่มีใครอ่านออก`,[
   O('✨ ปลดปล่อยพลังเต็มที่ต่อหน้าราชา',()=>mgRing('ปลุกสกิลต่อหน้าราชสำนัก',sc=>{K.rank=cl(Math.round(30-sc*28),1,30);feed(`✨ ลูกแก้วสว่างจน${sc>.7?'แตกร้าว':'คนในห้องหรี่ตา'} · อันดับผู้กล้า ${K.rank}/30${rep(Math.round(sc*10))}${aff(K,'rival',sc>.7?-12:0)}`);if(sc>.7)mem(K,'rival','อับอายเพราะคุณในวันประเมิน');nextArc(K)}),'มินิเกม',.5),
   O('🙈 ซ่อนพลังจริงไว้',()=>{K.f.hide=1;K.rank=24;feed('🙈 คุณแกล้งทำให้ลูกแก้วสว่างแค่ครึ่งเดียว ราชามองข้ามคุณไป และนั่นคือสิ่งที่คุณต้องการ');nextArc(K)},'ไม่มีใครจับตาคุณ',.3),
   O('❓ ถามนักบวชว่ากลับบ้านได้ไหม',()=>{const ap=K.sk==='appraise';feed(`❓ ${N(K,'priest')}ยิ้มแล้วบอกว่า "เมื่อราชาปีศาจตาย วงเวทจะพาท่านกลับ"${ap?' · 🔍 สกิลประเมินขึ้นตัวอักษรสีแดง: 「โกหก」':''}`+(ap?clue(K,'วงเวทไม่ได้สร้างมาเพื่อส่งกลับ'):''));K.f.askHome=1;nextArc(K)},'',.2)])},
  K=>{C('🏘️ ภารกิจแรก: หมู่บ้านริมป่า',`อัศวินบอกว่าหมู่บ้านนี้ถูกมอนสเตอร์ยึด แต่คนที่วิ่งหนีออกมาเป็นเด็กหูยาวกับแม่ที่อุ้มลูกไว้ เธอพูดภาษาคนได้ และกำลังขอชีวิต`,[
   O('⚔️ ทำตามคำสั่ง',()=>{feed('⚔️ คุณทำตามคำสั่ง อัศวินตบไหล่ชม คืนนั้นคุณนอนไม่หลับ'+dark(14)+rep(6));mem(K,'demon','ฆ่าชาวหมู่บ้านหูยาว');nextArc(K)},'',.3),
   O('🌲 ปล่อยพวกเขาหนีเข้าป่า',()=>{K.f.spare=1;feed('🌲 คุณแกล้งไล่ตามแล้วปล่อยให้หนี เด็กหันกลับมามองคุณครั้งหนึ่งก่อนหายไปในป่า'+aff(K,'priest',-8));later(K,R(5,8),'elfkid');nextArc(K)},'ถ้ามีคนรู้จะมีปัญหา',.5),
   O('🗡️ หันดาบใส่อัศวิน',()=>{duel('อัศวินหลวง',Math.round(S.power*(.85+rnd()*.3)),w=>{if(w){K.f.spare=1;K.f.rebel=1;feed('🗡️ อัศวินล้มลง ชาวหมู่บ้านหนีรอดทั้งหมด แต่ข่าวไปถึงวังก่อนคุณกลับ'+rep(-10)+aff(K,'king',-20));later(K,R(5,8),'elfkid')}else feed('🗡️ คุณแพ้ ถูกขังในคุกใต้วังสามเดือน'+hurt(.4));nextArc(K)})},'ต่อสู้',.2)])},
  K=>{const dead=pick(TH.filter(x=>x!==npc(K,'pal').n&&x!==npc(K,'rival').n));C('⚰️ ผู้กล้าคนแรกที่ตาย',`<b>${dead}</b> ตายในดันเจี้ยนชั้นห้า ศพไม่มีรอยมอนสเตอร์ มีแค่รอยมีดเล็กๆ ที่ต้นคอ ${N(K,'rival')}กระซิบว่า "นี่เป็นคนที่สี่แล้ว คนที่สกิลอ่อนทั้งนั้น"`,[
   O('🕯️ สืบว่าใครฆ่า',()=>{K.f.truth=(K.f.truth|0)+2;feed(`🕯️ รอยมีดตรงกับมีดพิธีของนักบวช · ความจริง ${K.f.truth}`);if(K.f.hide)feed('🙈 เพราะคุณซ่อนพลังไว้ คุณจึงอยู่ในรายชื่อ "อ่อนแอ" ของวัง และคุณเพิ่งรู้ตัว');nextArc(K)},'',.5),
   O('🤐 ไม่ยุ่ง ฝึกให้แกร่งกว่านี้',()=>{K.pw+=capOf(K)*.12;feed('🤐 คุณฝึกจนไม่มีใครกล้าเรียกว่าอ่อนแอ');nextArc(K)},'',.3),
   O('📢 ประกาศต่อหน้าผู้กล้าทุกคน',()=>{K.f.voice=1;feed(`📢 ผู้กล้าครึ่งหนึ่งเชื่อคุณ อีกครึ่งคิดว่าคุณบ้า ${N(K,'priest')}มองคุณจากระเบียง`+rep(4)+aff(K,'priest',-15));nextArc(K)},'',.2)])},
  K=>{C('🤝 ข้อเสนอของคู่แข่ง',`${N(K,'rival')}ตอนนี้เป็นผู้กล้าอันดับหนึ่ง เขาเข้ามาหาคุณตอนดึก "วังใช้พวกเราเป็นของทิ้ง ช่วยฉันยึดอำนาจ แล้วเราจะได้กลับบ้านด้วยวิธีของเรา"${npc(K,'rival').mem.length?` · เขายังจำได้ว่าคุณเคย${E(npc(K,'rival').mem[0][1])}`:''}`,[
   O('✊ ร่วมมือ',()=>{K.f.coup=1;aff(K,'rival',20);feed('✊ คุณจับมือกับเขา แผนยึดวังเริ่มนับถอยหลัง');nextArc(K)},'',.35),
   O('🙅 ปฏิเสธ',()=>{aff(K,'rival',-25);mem(K,'rival','ปฏิเสธข้อเสนอ');feed('🙅 เขาพยักหน้าช้าๆ "งั้นอย่ามาขวางทางฉัน"');nextArc(K)},'',.35),
   O('📜 แอบรายงานราชา',()=>{aff(K,'rival',-40);aff(K,'king',15);K.f.snitch=1;feed('📜 ราชาขอบใจคุณ วันรุ่งขึ้นเขาหายไปจากกองทัพ'+dark(8));nextArc(K)},'',.3)])},
  K=>{C('🧥 นักเดินทางที่กองไฟ',`ชายผมขาวนั่งย่างปลาริมทาง เขารู้ชื่อจริงของคุณในโลกเดิม "ราชาปีศาจไม่เคยบุกใคร เขาแค่ไม่ยอมตายเงียบๆ เหมือนคนก่อนๆ"${K.f.spare?' · เด็กหูยาวคนนั้นนั่งอยู่ข้างเขา':''}`,[
   O('⚔️ เขาคือราชาปีศาจ จู่โจมเลย',()=>{duel(npc(K,'demon').n,Math.round(S.power*1.25),w=>{feed(w?'⚔️ คุณฟันโดนแขนเขา เขาหายไปในควันพร้อมรอยยิ้มเศร้าๆ'+rep(8):'⚔️ เขาปัดดาบคุณเหมือนปัดใบไม้ "ยังไม่ใช่เวลา"'+hurt(.3));nextArc(K)})},'',.3),
   O('🔥 นั่งลงฟัง',()=>{K.f.peace=(K.f.peace|0)+1;aff(K,'demon',25);feed('🔥 คุณฟังจนไฟมอด เรื่องที่เขาเล่าไม่ตรงกับหนังสือของวังสักบรรทัด');if(K.f.spare&&!K.f.dmN){K.f.dmN=1;feed('🌲 ก่อนจาก เด็กหูยาวบอกชื่อจริงของราชาปีศาจกับคุณ'+clue(K,'ชื่อจริงของราชาปีศาจคือชื่อของผู้กล้าคนแรก'))}nextArc(K)},'',.5),
   O('🔍 ประเมินเขา',()=>{if(K.sk==='appraise'){feed('🔍 สกิลประเมินขึ้น: 「ผู้กล้ารุ่นที่ 1 · สถานะ: ถูกสาป」'+clue(K,'ราชาปีศาจเคยเป็นผู้กล้า'));K.f.peace=(K.f.peace|0)+1}else feed('🔍 คุณจ้องเขานานจนเขาหัวเราะ');nextArc(K)},'',.2)])},
  K=>{const coup=K.f.coup&&npc(K,'rival').aff>=40,betr=!K.f.coup&&npc(K,'rival').aff<25&&rnd()<.5;
   if(betr){C('🗡️ คืนก่อนศึกสุดท้าย',`${N(K,'rival')}เดินเข้ามาในเต็นท์ มือขวาซ่อนอยู่ข้างหลัง`,[
    O('🛡️ ตั้งรับ',()=>{const save=K.sk==='shield'||npc(K,'pal').aff>=80;if(save){feed(`🛡️ ${K.sk==='shield'?'โล่แห่งพันธสัญญากางออกเอง':N(K,'pal')+'พุ่งเข้ามาขวาง'} มีดหักครึ่ง ${N(K,'rival')}หนีออกไปในความมืด`);K.arcAt=age()+1;K.arc=6}else ending(K,'betray',`${npc(K,'rival').n} แทงมีดเข้าข้างหลังคุณ "ขอโทษ แต่ที่นั่งกลับบ้านมีแค่ที่เดียว"`,'ถูกเพื่อนร่วมห้องแทงข้างหลังคืนก่อนศึกสุดท้าย')},'',.6)]);return}
   K.arc=6;arcStep(K)},
  K=>{const o=[];
   o.push(O('⚔️ ดวลกับราชาปีศาจ',()=>{duel(npc(K,'demon').n,Math.round(S.power*(1.05+rnd()*.25)),w=>{if(!w){S.hp=Math.max(1,Math.round(S.maxHp*.2));feed('⚔️ คุณแพ้ เขาไม่ฆ่าคุณ "กลับไปถามนักบวชของเจ้าดูว่าข้าเป็นใคร"');K.arcAt=age()+R(2,3);return}
    const ch=[O('🏠 ใช้วงเวทกลับบ้าน',()=>ending(K,'home',K.f.askHome&&K.sk==='appraise'?'วงเวทไม่ได้ส่งคุณกลับ แต่คุณแก้มันเองด้วยสิ่งที่สกิลประเมินเคยเห็น คุณลืมตาบนโต๊ะเรียนในห้องเดิม ฝนกำลังตก':'แสงจากวงเวทกลืนคุณ คุณตื่นมาในห้องเรียนเดิม นาฬิกาเดินไปแค่สามนาที','กลับบ้านไปใช้ชีวิตที่เหลือในโลกเดิม'),'',.4)];
    if(K.f.coup||K.rep>=50)ch.push(O('👑 ยึดบัลลังก์',()=>ending(K,'throne','คุณเดินกลับวังพร้อมดาบที่ยังเปื้อนเลือด ราชาก้มหัวให้คุณเป็นครั้งแรก','ครองอาณาจักรที่เคยหลอกใช้คุณจนแก่เฒ่า'),'',.3));
    if(K.dark>=55)ch.push(O('😈 สวมมงกุฎของราชาปีศาจ',()=>ending(K,'newking','มงกุฎยังอุ่น คุณสวมมันโดยไม่คิด เสียงหัวเราะของเขาดังในหัวคุณ "ยินดีต้อนรับ ผู้กล้ารุ่นที่ 30"','กลายเป็นราชาปีศาจองค์ใหม่ รอผู้กล้ารุ่นต่อไปมาฆ่า'),'ความมืดของคุณสูงพอ',.2));
    C('👑 ราชาปีศาจล้มลง','เขาไม่ได้ต่อต้านในวินาทีสุดท้าย วงเวทกลับบ้านเปิดอยู่ตรงหน้า',ch)})},'มินิเกมต่อสู้',.5));
   if((K.f.peace|0)>=2&&K.f.spare)o.push(O('🕊️ จับมือกับเขา',()=>ending(K,'peace','คุณยืนข้างราชาปีศาจหน้ากำแพงวัง ผู้กล้าที่เหลือวางดาบทีละคน ไม่มีใครในประวัติศาสตร์เชื่อว่าเรื่องนี้เกิดขึ้นจริง','ใช้ชีวิตที่เหลือเป็นทูตระหว่างมนุษย์กับปีศาจ'),'มีคนเชื่อคุณพอ',.4));
   if(K.clue>=3)o.push(O('🌀 แตะวงเวทอัญเชิญด้วยมือตัวเอง',()=>ending(K,'loop','ลายเส้นของวงเวทตรงกับลายมือในบันทึกที่คุณเก็บมาทั้งชีวิต คุณเข้าใจในที่สุด คนที่วาดวงเวทอัญเชิญครั้งแรกคือคุณเอง ในรอบที่ 1 คุณยิ้ม แล้ววาดมันใหม่ให้ต่างจากเดิมนิดเดียว','กลายเป็นผู้อัญเชิญคนแรก และปล่อยให้รอบที่ 31 ได้เลือกเอง'),'🗝️ ฉากจบลับ',.1));
   C('🌋 ศึกสุดท้ายที่ปราสาทดำ',`กองทัพของราชาอยู่ข้างหลังคุณ ปราสาทของราชาปีศาจอยู่ข้างหน้า · ความมืด ${K.dark} · ชื่อเสียง ${K.rep} · เบาะแสลับ ${K.clue}/3`,o)}],
 trash:[
  K=>{C('🏚️ คืนแรกในสลัม',`${N(K,'fence')}ยื่นขนมปังแข็งให้ "จะอยู่รอดที่นี่ ต้องมีของมาแลก" ส่วน${N(K,'kid')}ขโมยเหรียญสามเหรียญของคุณไปตั้งแต่ตอนเข้าประตู`,[
   O('🧺 ใช้สกิลกับกองขยะทั้งคืน',()=>mgRune('ใช้สกิลกับกองขยะ',4,sc=>{K.skx=(K.skx|0)+sc*40;money(Math.round(sc*40));feed(`🧺 สกิลของคุณ${sc>.6?'เจอของที่คนอื่นมองไม่เห็น':'ทำงานแบบงูๆ ปลาๆ'} · ความชำนาญ +${Math.round(sc*40)}%`);if(sc>.9&&!K.f.tr1){K.f.tr1=1;feed('🧺 ในกองขยะมีเหรียญที่มีรูปหน้าคนที่ไม่มีใครรู้จัก'+clue(K,'เหรียญจากอาณาจักรที่ไม่เคยมีอยู่'))}nextArc(K)}),'มินิเกม',.5),
   O('🏃 ตามเด็กไปเอาเหรียญคืน',()=>{aff(K,'kid',15);feed(`🏃 คุณตามไปถึงรังของเด็กๆ สิบกว่าคน ${N(K,'kid')}คืนเหรียญให้แล้วถามว่า "พี่สอนพวกเราอ่านหนังสือได้ไหม"`);K.f.kids=1;nextArc(K)},'',.3),
   O('🤝 รับงานพ่อค้าของโจร',()=>{K.f.fence=1;money(30);feed('🤝 งานแรกคือส่งกล่องที่ห้ามเปิด'+dark(6));nextArc(K)},'',.2)])},
  K=>{C('📜 สมัครกิลด์นักผจญภัย',`หัวหน้ากิลด์อ่านแผ่นสถานะของคุณแล้วหัวเราะจนเบียร์หก "สกิล${TRUE_SK[K.sk][K.skL-1]}? ไปเก็บขยะหลังโรงเตี๊ยมไป"`,[
   O('⚔️ ขอสอบด้วยการสู้',()=>duel('ก็อบลินหัวหน้าเผ่า',Math.round(S.power*(.9+rnd()*.3)),w=>{if(w){K.f.guild=1;feed('⚔️ หัวหน้ากิลด์หยุดหัวเราะ ยื่นป้ายระดับ F ให้'+rep(5))}else feed('⚔️ คุณแพ้ แต่ไม่ถอย กลับมาสอบใหม่ทุกเดือนจนเขารำคาญและให้ผ่าน'+hurt(.25)),K.f.guild=1;nextArc(K)}),'มินิเกมต่อสู้',.5),
   O('🧠 แสดงว่าสกิลทำอะไรได้',()=>mgRing('ใช้สกิลต่อหน้ากิลด์',sc=>{if(sc>.55){K.f.guild=1;feed(`🧠 คุณ${K.sk==='pick'?'เก็บมีดที่คนในกิลด์ปาใส่กลางอากาศ':K.sk==='copy'?'ทำท่าดาบของหัวหน้ากิลด์ได้เป๊ะหลังเห็นครั้งเดียว':K.sk==='taste'?'ชิมเบียร์แล้วบอกได้ว่าผสมน้ำกี่ส่วน':'ยืนรออยู่หน้ากิลด์สามวันโดยไม่กินไม่นอน'} · ทั้งกิลด์เงียบ`+rep(8))}else feed('🧠 ไม่มีใครประทับใจ');nextArc(K)}),'มินิเกม',.4)])},
  K=>{const k=npc(K,'kid');C('🩸 เด็กในสลัม',`${N(K,'kid')}วิ่งมาหาคุณทั้งเลือด ทหารวังกวาดล้างสลัมเพื่อเตรียมรับขบวนผู้กล้า ${K.f.kids?'เด็กๆ ที่คุณสอนหนังสือยังอยู่ในนั้น':'คนที่คุณรู้จักยังอยู่ในนั้น'}`,[
   O('🛡️ บุกเข้าไปช่วย',()=>duel('หัวหน้าทหารวัง',Math.round(S.power*(.95+rnd()*.3)),w=>{if(w){aff(K,'kid',30);K.f.slumHero=1;feed('🛡️ คุณพาทุกคนหนีออกทางท่อ ทหารจำหน้าคุณได้'+rep(6))}else{k.alive=0;feed(`🛡️ คุณช่วยได้ครึ่งเดียว ${E(k.n)}ไม่รอด`+hurt(.35)+dark(8))}nextArc(K)}),'ต่อสู้',.5),
   O('🙈 หลบ ไม่ใช่เรื่องของเรา',()=>{k.alive=rnd()<.4?1:0;feed(k.alive?'🙈 คุณหลบอยู่ในโกดังจนเสียงเงียบ เด็กๆ รอดเพราะโชค':'🙈 เช้ามา ไม่มีใครเรียกชื่อคุณในสลัมอีก'+dark(12));nextArc(K)},'',.3)])},
  K=>{C('🎺 ขบวนผู้กล้ากลับมา',`${N(K,'rival')}นั่งบนม้าขาว เกราะทองระยิบ เขาเห็นคุณในฝูงชนแล้วหยุดม้า "ยังไม่ตายอีกเหรอ คนเก็บขยะ"${npc(K,'rival').mem.length?'':''}`,[
   O('😶 ก้มหน้าเดินผ่าน',()=>{K.f.hum=1;mem(K,'rival','เห็นคุณก้มหน้า');feed('😶 คนรอบข้างหัวเราะ คุณจำทุกเสียงไว้ด้วยสกิลที่ไม่มีใครเห็นค่า');nextArc(K)},'',.3),
   O('🗡️ ท้าดวลกลางถนน',()=>duel(npc(K,'rival').n,Math.round(S.power*(1+rnd()*.35)),w=>{if(w){aff(K,'rival',-30);mem(K,'rival','แพ้คุณกลางถนน');feed('🗡️ ผู้กล้าอันดับหนึ่งล้มกลางถนนต่อหน้าคนทั้งเมือง'+rep(15))}else feed('🗡️ เขาถีบคุณลงคูน้ำ'+hurt(.3));nextArc(K)}),'ต่อสู้',.4),
   O('🤝 บอกเขาว่าคุณรู้ความลับของวัง',()=>{aff(K,'rival',10);K.f.rvKnow=1;feed('🤝 เขาจ้องคุณนาน แล้วลงจากม้ามานั่งข้างคุณ "เล่ามา"');nextArc(K)},'',.3)])},
  K=>{C(`🗑️ สกิล「${TRUE_SK[K.sk][Math.max(2,K.skL-1)]}」`,`สกิลของคุณโตถึงจุดที่${K.sk==='pick'||K.sk==='copy'?'แย่งสกิลของคนอื่นมาได้':'บิดกฎของโลกได้นิดหนึ่ง'} มีคนเสนอเงินมหาศาลให้คุณใช้มันกับ${pick(['ดยุกคนหนึ่ง','หัวหน้าโบสถ์','ผู้กล้าคนหนึ่ง'])}`,[
   O('💰 รับงาน',()=>{money(800);K.pw+=capOf(K)*.35;feed('💰 คุณทำงานสำเร็จ พลังของเหยื่อไหลเข้าตัวคุณ'+dark(16));nextArc(K)},'',.3),
   O('🎯 ใช้กับคนที่สมควร',()=>{K.pw+=capOf(K)*.2;feed('🎯 คุณใช้สกิลกับพ่อค้าทาสที่ทุกคนกลัว ทาสร้อยคนได้อิสระ'+rep(12));nextArc(K)},'',.4),
   O('🙅 ไม่ใช้',()=>{K.f.lock=(K.f.lock|0)+1;feed('🙅 คุณเก็บสกิลไว้ในใจ มันเงียบเหมือนรออะไรบางอย่าง');nextArc(K)},'',.3)])},
  K=>{const o=[];const t=`ฝูงปีศาจบุกถึงประตูเมืองหลวง ราชาส่งคนมาตามหาคุณ คนที่เคยทิ้งคุณไว้นอกกำแพงตอนนี้คุกเข่าขอให้ช่วย · ความมืด ${K.dark} · สกิลระดับ ${K.skL}/5 · เบาะแสลับ ${K.clue}/3`;
   o.push(O('🛡️ ปกป้องเมือง',()=>duel('แม่ทัพปีศาจ',Math.round(S.power*(1+rnd()*.3)),w=>{if(w)ending(K,'legend','ปีศาจถอยกลับเพราะสกิลที่ทุกคนเคยหัวเราะ ราชาแกะชื่อคุณบนประตูเมือง พร้อมคำว่า「คนเก็บขยะ」ที่ตอนนี้ไม่มีใครกล้าใช้ล้อเลียน','ใช้ชีวิตบั้นปลายเป็นตำนานของเมืองหลวง');else{S.hp=Math.max(1,Math.round(S.maxHp*.2));feed('🛡️ คุณถอยออกมาพร้อมบาดแผล แต่เมืองยังยืนอยู่');K.arcAt=age()+2}}),'ต่อสู้',.4));
   if(K.dark>=40)o.push(O('🔥 ปล่อยให้มันไหม้',()=>ending(K,'revenge','คุณยืนดูเปลวไฟกินวังจากหอระฆัง ราชาเรียกชื่อคุณจนเสียงแหบ คุณจำเสียงนั้นได้ไปตลอดชีวิต','ครองเถ้าถ่านของอาณาจักรเก่าจนสิ้นอายุ'),'ความมืดของคุณสูงพอ',.2));
   o.push(O('🍞 เดินจากไป',()=>ending(K,'quiet','คุณเดินสวนทางกับฝูงคนที่หนีเข้าเมือง ไปเปิดร้านขนมปังในหมู่บ้านที่ไม่มีใครรู้จักคุณ สกิลของคุณใช้นวดแป้งได้ดีที่สุดในโลก','จากไปอย่างสงบหลังเตาอบขนมปังในเช้าวันหนึ่ง'),'',.3));
   if(K.skL>=5&&(K.f.feed|0)>=1&&!K.f.lock)o.push(O('🕳️ ปล่อยสกิลออกมาเต็มที่',()=>ending(K,'eaten','สกิลกินกองทัพปีศาจ กินกำแพงเมือง แล้วหันมามองคุณ คุณรู้สึกว่าตัวเองถูก「เก็บ」เป็นครั้งสุดท้าย','ถูกสกิลของตัวเองกลืนจนไม่เหลือแม้แต่ชื่อ'),'อันตราย',.1));
   if(K.clue>=3)o.push(O('♾️ ถามสกิลว่ามันเก็บอะไรไว้',()=>ending(K,'god','สกิลตอบเป็นครั้งแรก มันคือกล่องที่เทพองค์แรกใช้เก็บโลกเก่าไว้ก่อนสร้างโลกนี้ คุณเปิดกล่อง เมืองเก่า คนเก่า ดวงดาวเก่าไหลออกมาเต็มท้องฟ้า และทุกคนในโลกนี้ได้เห็นว่าก่อนหน้าพวกเขามีใครอยู่','กลายเป็นผู้เฝ้ากล่องของเทพองค์แรก'),'🗝️ ฉากจบลับ',.1));
   C('🌋 วันที่เมืองหลวงจะล่ม',t,o)}],
 magic:[
  K=>{C('🎩 พิธีคัดหอ',`หมวกพูดได้ไม่มีในที่นี่ วิทยาลัยใช้วิธีเก่ากว่านั้น คือปล่อยให้นักเรียนเดินเข้าเขาวงกตกระจก แล้วดูว่ากระจกบานไหนไม่ยอมสะท้อนเงาคุณ`,[
   O('🔥 หอเพลิงแดง',()=>{K.f.house='red';K.pw+=8;feed('🔥 หอเพลิงแดง หอของคนที่ชนะก่อนแล้วค่อยคิด');nextArc(K)},'พลัง',.3),
   O('🌊 หอม่านคราม',()=>{K.f.house='blue';S.int=(S.int||0)+6;feed('🌊 หอม่านคราม หอของคนที่ไม่เคยพูดสิ่งที่ตัวเองรู้');nextArc(K)},'ปัญญา',.3),
   O('🌿 หอรากหยก',()=>{K.f.house='green';S.maxHp+=20;feed('🌿 หอรากหยก หอของคนที่ชอบเวทรักษา และคนที่อยากให้ทุกคนรอด');nextArc(K)},'ร่างกาย',.2),
   O('🌑 หอเงาเงิน',()=>{K.f.house='shadow';dark(8);K.mpM+=15;feed('🌑 หอเงาเงิน หอที่ทุกปีมีคนหายมากที่สุด และมีคนจบไปเป็นจอมเวทสูงสุดมากที่สุด');nextArc(K)},'มานา · ความมืด',.2)])},
  K=>{C('🧱 เสียงในผนัง',`${N(K,'pal')}ปลุกคุณตอนตีสาม "ได้ยินไหม ผนังมันเรียกชื่อฉัน"`,[
   O('👂 แนบหูฟังกับเขา',()=>{feed('👂 คุณได้ยินจริงๆ เสียงเหมือนคนหายใจ และมันเรียกชื่อคุณด้วย');if(rnd()<.6)feed(clue(K,'ผนังวิทยาลัยหายใจได้').slice(3));aff(K,'pal',10);K.f.wall=1;nextArc(K)},'',.4),
   O('🧑‍🏫 พาไปหาอาจารย์',()=>{feed(`🧑‍🏫 ${N(K,'mentor')}ฟังแล้วยิ้ม "ย้ายห้องให้เขาเถอะ" วันรุ่งขึ้นห้องนั้นถูกปิดตาย`+aff(K,'mentor',5));nextArc(K)},'',.3),
   O('😴 บอกให้เขานอนต่อ',()=>{later(K,R(2,3),'palGone');feed('😴 คุณดึงผ้าห่มคลุมหัว เสียงหายไปตอนเช้ามืด');nextArc(K)},'',.3)])},
  K=>{C('📕 ตำราต้องห้าม',`${N(K,'mentor')}วางหนังสือปกหนังสีดำบนโต๊ะคุณ "อ่านมันแล้วเจ้าจะเก่งกว่าทุกคนในรุ่น มันจะเอาไปแค่ไม่กี่ปีจากชีวิตเจ้า"`,[
   O('📖 อ่าน',()=>{K.f.tome=1;K.pw+=capOf(K)*.4;K.mpM+=25;K.endY=Math.max(age()+5,(K.endY||80)-6);feed('📖 ตัวอักษรคลานขึ้นมาบนผิวหนังคุณ แล้วซึมหายไป · พลังพุ่ง · อายุขัย −6'+dark(15));nextArc(K)},'แรงมาก แต่เสียอายุขัย',.3),
   O('🙅 ไม่อ่าน',()=>{aff(K,'mentor',-5);feed('🙅 อาจารย์เก็บหนังสือคืน "น่าเสียดาย คนที่แล้วก็พูดแบบนี้"');nextArc(K)},'',.4),
   O('📜 รายงานอธิการบดี',()=>{aff(K,'mentor',-40);mem(K,'mentor','ถูกคุณรายงาน');later(K,R(4,6),'mentorRev');feed('📜 จดหมายถึงอธิการบดีหายไปจากโต๊ะคุณเองคืนนั้น');nextArc(K)},'',.3)])},
  K=>{C('🏆 ศึกประลองระหว่างหอ',`รอบชิงชนะเลิศ คุณต้องเจอ${N(K,'rival')} ทั้งวิทยาลัยมาดู${npc(K,'rival').mem.length?` และเขายังจำได้ว่าคุณเคย${E(npc(K,'rival').mem.slice(-1)[0][1])}`:''}`,[
   O('✨ สู้อย่างยุติธรรม',()=>duel(npc(K,'rival').n,Math.round(S.power*(.95+rnd()*.3)),w=>{K.rank=cl(K.rank+(w?-8:4),1,60);feed(w?'✨ คุณชนะ หอของคุณได้ถ้วยประจำปี'+rep(8)+aff(K,'rival',w?5:0):'✨ คุณแพ้แบบสูสี คนทั้งสนามยังปรบมือให้');nextArc(K)}),'ต่อสู้',.5),
   O('🧪 แอบใส่ยาในน้ำของเขา',()=>{K.rank=cl(K.rank-6,1,60);aff(K,'rival',-30);mem(K,'rival','ถูกวางยาก่อนชิง');feed('🧪 เขาล้มกลางสนาม คุณชนะโดยไม่ต้องร่าย'+dark(12));later(K,R(6,10),'rivalRev');nextArc(K)},'',.2)])},
  K=>{C('🌫️ สอบเขาวงกตปีที่หก',`ทุกปีมีคนไม่ได้ออกมาจากเขาวงกตนี้ ปีนี้คุณเข้าไปพร้อมรุ่นเดียวกันหกสิบคน และกำแพงกำลังขยับ${K.f.wall?' · คุณได้ยินเสียงหายใจเดียวกับที่ได้ยินในผนังห้อง':''}`,[
   O('ᚱ ถอดรหัสรูนบนกำแพง',()=>mgRune('ถอดรหัสทางออกเขาวงกต',6,sc=>{if(sc<.25&&rnd()<.5&&!K.f.luck){ending(K,'maze','กำแพงปิดหลังคุณเป็นครั้งสุดท้าย ปีต่อมา นักเรียนใหม่เห็นชื่อคุณสลักอยู่บนกำแพงเขาวงกต ข้างชื่ออื่นอีกนับร้อย','หลงอยู่ในเขาวงกตของวิทยาลัยตลอดกาล');return}
    K.rank=cl(K.rank-Math.round(sc*10),1,60);feed(`ᚱ คุณออกมาได้ ${sc>.8?'เป็นคนแรก':'พร้อมรอยถลอกเต็มตัว'}`);if(sc>.7&&K.clue>=1){feed('🚪 ระหว่างทางคุณเห็นประตูที่ไม่มีลูกบิด มีเลข 13'+clue(K,'ห้องที่ 13 อยู่ใต้เขาวงกต'))}nextArc(K)}),'มินิเกม',.6),
   O('🤝 พาคนที่หลงทางออกมาด้วย',()=>{K.rank=cl(K.rank+3,1,60);aff(K,'pal',20);feed('🤝 คุณออกมาช้าที่สุด แต่มีคนเดินตามหลังคุณออกมาเจ็ดคน'+rep(10));nextArc(K)},'อันดับลด แต่คนรอด',.3)])},
  K=>{K.arc=6;K.arcAt=age()+R(5,8);feed('🎓 ชีวิตนอกกำแพงวิทยาลัยเริ่มต้นแล้ว ข่าวลือเรื่องห้องที่ 13 ยังตามมาในฝัน')},
  K=>{C('🦠 โรคระบาดเงา',`หมู่บ้านทางเหนือเป็นโรคที่ทำให้เงาของคนแยกออกจากตัว คนป่วยเดินไปมาโดยไม่มีเงา แล้วตายในวันที่เงากลับมา`,[
   O('✨ ร่ายเวทรักษาทั้งหมู่บ้าน',()=>{const o=overcast(K);feed('✨ คุณร่ายจนเลือดออกจากจมูก เงากลับเข้าตัวคนป่วยทีละคน'+o.t+rep(15));nextArc(K)},'ใช้มานามาก',.5),
   O('⚗️ ศึกษาโรค',()=>{K.f.res=(K.f.res|0)+3;feed('⚗️ คุณเก็บเงาที่หลุดออกมาใส่ขวด และเริ่มเข้าใจว่าเวทความตายทำงานอย่างไร'+dark(10));if(!K.rare&&rnd()<.4){K.rare='death';feed('💀 ธาตุความตายตื่นขึ้นในตัวคุณ')}nextArc(K)},'',.3),
   O('🚪 ปิดหมู่บ้าน',()=>{feed('🚪 คุณสร้างกำแพงเวทรอบหมู่บ้าน โรคไม่แพร่ออกมา คนข้างในไม่ได้ออกมาเช่นกัน'+dark(18));nextArc(K)},'',.2)])},
  K=>{const o=[];const t=`อธิการบดีคนเก่ากำลังจะตาย วิทยาลัยต้องการคนใหม่ · อันดับรุ่น ${K.rank} · ชื่อเสียง ${K.rep} · ความมืด ${K.dark} · เบาะแสลับ ${K.clue}/3`;
   if((K.f.arch||K.rank<=5)&&!K.f.expelled)o.push(O('🎓 รับตำแหน่งอธิการบดี',()=>ending(K,'arch','คุณนั่งบนเก้าอี้ที่ไม่มีใครเคยเห็นหน้าคนนั่ง และเข้าใจในที่สุดว่าทำไมอธิการบดีไม่เคยออกไปข้างนอก','ปกครองวิทยาลัยอาร์คาเนียจนสิ้นลมหายใจในห้องที่ไม่มีหน้าต่าง'),'',.4));
   if(K.f.tome||K.rare==='death')o.push(O('☠️ ทำพิธีไม่ยอมตาย',()=>ending(K,'lich','คุณถอดหัวใจออกมาใส่โหลแก้ว แล้วยิ้มให้เงาตัวเองในกระจกที่ไม่สะท้อนอะไรอีกแล้ว','กลายเป็นผู้ไม่ยอมตายที่เฝ้าห้องสมุดต้องห้าม'),'',.2));
   o.push(O('🌿 กลับไปอยู่หมู่บ้านชายป่า',()=>ending(K,'hedge',K.f.expelled?'คนที่ถูกไล่ออกจากวิทยาลัยกลายเป็นแม่มดที่ทุกหมู่บ้านในหุบเขามาหา คุณรักษาวัวป่วยได้ดีกว่าจอมเวทหลวงทุกคน':'คุณทิ้งตำแหน่งไว้ข้างหลัง ไปเปิดบ้านไม้ชายป่า เด็กๆ เรียกคุณว่ายายแม่มด','จากไปอย่างสงบในบ้านไม้ชายป่า'),'',.3));
   if(K.clue>=3)o.push(O('❤️‍🔥 เปิดประตูห้องที่ 13',()=>ending(K,'heart','หลังประตูคือหัวใจขนาดเท่าห้อง เต้นช้าๆ วิทยาลัยมีชีวิตมาตลอด และมันกินนักเรียนปีละคนเพื่อไม่ให้ตาย คุณวางมือบนหัวใจ แล้วเสนอตัวเองแทนนักเรียนทุกคนที่จะมาหลังจากนี้','กลายเป็นหัวใจดวงใหม่ของวิทยาลัย ไม่มีนักเรียนคนไหนหายไปอีกเลย'),'🗝️ ฉากจบลับ',.1));
   C('🕯️ คืนที่อธิการบดีสิ้นลม',t,o)}],
 noble:[
  K=>{C('💃 งานเลี้ยงต้อนรับนักเรียนใหม่',`ลูกขุนนางร้อยคนหันมามองเด็กทุนคนเดียวในห้อง ${N(K,'lady')}เดินเข้ามาหาคุณเป็นคนแรก "เธอคือคนที่สอบได้ที่หนึ่งของแคว้นใช่ไหม"`,[
   O('🎭 อ่านใจเธอ',()=>mgRead('บทสนทนาแรก',npc(K,'lady').n,sc=>{aff(K,'lady',Math.round(sc*25));feed(`🎭 บทสนทนาแรก: <b>${grade(sc)}</b>${sc>.7?' · เธอหัวเราะออกมาจริงๆ ครั้งแรกในงาน และองค์ชายเห็น':''}`);if(sc>.7)aff(K,'prince',8);nextArc(K)}),'มินิเกม',.6),
   O('🍷 ยืนเงียบๆ ที่มุมห้อง',()=>{aff(K,'maid',10);feed(`🍷 คนเดียวที่คุยกับคุณทั้งคืนคือ${N(K,'maid')} และเธอรู้ชื่อเล่นของทุกคนในห้อง`);nextArc(K)},'',.4)])},
  K=>{C('💎 สร้อยของเคาน์เตสหาย',`สร้อยมรกตของแม่${N(K,'rival')}หายระหว่างงานเลี้ยง และมันถูกพบในห้องของคุณ ทุกคนรู้ว่าเด็กทุนเป็นคนเดียวที่ "ต้องการเงิน"`,[
   O('🧠 พิสูจน์ความบริสุทธิ์',()=>{const ok=(S.int|0)>R(25,90)||npc(K,'maid').aff>=50;if(ok){feed(`🧠 ${npc(K,'maid').aff>=50?N(K,'maid')+'ยืนยันว่าเห็น'+N(K,'rival')+'เข้าห้องคุณ':'คุณชี้ว่ากลิ่นน้ำหอมบนกล่องสร้อยเป็นของใคร'} ${N(K,'rival')}ถูกพักการเรียน`+aff(K,'rival',-25)+rep(8));mem(K,'rival','ถูกคุณแฉ')}else{K.f.thief=1;feed('🧠 ไม่มีใครเชื่อคุณ ชื่อเสียงของเด็กทุนแปดเปื้อนไปทั้งสถาบัน'+rep(-12))}nextArc(K)},'ใช้ปัญญาหรือพยาน',.5),
   O('🤺 ท้าดวลเพื่อศักดิ์ศรี',()=>duel(npc(K,'rival').n,Math.round(S.power*(.9+rnd()*.3)),w=>{feed(w?'🤺 คุณชนะ ตามธรรมเนียมขุนนาง ผู้แพ้ต้องยอมรับความผิด':'🤺 คุณแพ้ และตามธรรมเนียม ผู้แพ้คือคนผิด'+rep(-8));if(!w)K.f.thief=1;nextArc(K)}),'ต่อสู้',.3)])},
  K=>{C('🎭 ชายสวมหน้ากาก',`${N(K,'shadow')}ยืนข้างคุณบนระเบียงโดยไม่มีใครเห็นเขาเดินมา "ข้ารู้ทุกอย่างที่เจ้าอยากรู้ และขอแค่ความช่วยเหลือเล็กๆ ในอนาคต หนึ่งครั้ง"`,[
   O('✍️ ทำสัญญา',()=>{K.f.shadow=1;K.con.push({id:'mask',at:age()+R(3,5),paid:0});K.f.evid=(K.f.evid|0)+2;feed('✍️ คุณจับมือเขา มือเย็นเหมือนหินอ่อน · หลักฐาน +2'+dark(8));nextArc(K)},'ได้ข้อมูลทันที จ่ายทีหลัง',.4),
   O('🔍 ดึงหน้ากากเขา',()=>{if(rnd()<.35+(S.cha|0)/500){feed('🔍 ใต้หน้ากากคือหน้าที่คุณคุ้นเคย แต่จำไม่ได้ว่าเคยเห็นที่ไหน'+clue(K,'ชายสวมหน้ากากมีหน้าเหมือนคุณ'))}else feed('🔍 มือคุณคว้าได้แค่ลม');nextArc(K)},'',.3),
   O('🙅 เดินหนี',()=>{feed('🙅 เขาหัวเราะเบาๆ "เจ้าจะกลับมาหาข้าเอง"');nextArc(K)},'',.3)])},
  K=>{C('🗡️ บทสนทนาหลังม่าน',`ระหว่างหลบอยู่หลังม่านห้องสมุด คุณได้ยินเสียงดยุกกับคนที่สองคุยกันเรื่อง "คืนพิธีรับปริญญา" และ "ยาที่ไม่มีรส" ชื่อที่ถูกพูดถึงคือองค์ชาย`,[
   O('🏃 ไปบอกองค์ชายทันที',()=>{if(npc(K,'prince').aff>=55){K.f.warned=1;feed('🏃 องค์ชายเชื่อคุณ และขอให้คุณช่วยหาหลักฐาน'+aff(K,'prince',10))}else feed('🏃 องค์ชายหัวเราะ "เด็กทุนอยากเป็นวีรบุรุษ?"'+aff(K,'prince',-5));nextArc(K)},'',.4),
   O('🕵️ แอบเก็บหลักฐานก่อน',()=>{K.f.evid=(K.f.evid|0)+1;feed('🕵️ คุณขโมยขวดยาเล็กๆ จากห้องดยุกได้หนึ่งขวด · หลักฐาน '+K.f.evid);nextArc(K)},'',.4),
   O('💰 ขู่กรรโชกดยุก',()=>{money(1500);K.f.blk=1;feed('💰 ดยุกจ่ายเงินให้คุณเงียบ และจดชื่อคุณไว้ในรายการเดียวกับองค์ชาย'+dark(14));nextArc(K)},'',.2)])},
  K=>{C('🌹 คำขอของธิดาดยุก',`${N(K,'lady')}มาหาคุณกลางดึก "ฉันไม่อยากแต่งกับองค์ชาย และพ่อฉันกำลังทำบางอย่างที่น่ากลัว ช่วยฉันได้ไหม"`,[
   O('💗 สารภาพความรู้สึก',()=>{aff(K,'lady',npc(K,'lady').aff>=55?25:-10);feed(npc(K,'lady').aff>=60?'💗 เธอกุมมือคุณไว้นาน "งั้นเราหนีไปด้วยกัน"':'💗 เธอยิ้มเศร้าๆ "เธอเป็นเพื่อนที่ดีที่สุดของฉัน"');nextArc(K)},'',.4),
   O('🕵️ ขอให้เธอช่วยหาหลักฐานของดยุก',()=>{K.f.evid=(K.f.evid|0)+1;aff(K,'lady',5);feed('🕵️ เธอเอาสมุดบัญชีลับของพ่อมาให้คุณด้วยมือที่สั่น · หลักฐาน '+K.f.evid);nextArc(K)},'',.4)])},
  K=>{const ev=K.f.evid|0;C('🎓 คืนพิธีรับปริญญา',`แก้วไวน์ขององค์ชายวางอยู่บนถาดเงิน ดยุกยิ้มอยู่ข้างบัลลังก์ หลักฐานในมือคุณ ${ev} ชิ้น${K.f.blk?' · ดยุกจ้องคุณตั้งแต่เข้างาน':''}`,[
   O('🍷 ปัดแก้วออกจากมือองค์ชาย',()=>{if(ev>=2||K.f.warned){K.f.saved=1;aff(K,'prince',30);feed('🍷 ไวน์หกลงพรม พรมไหม้เป็นรู คนทั้งห้องหันไปมองดยุก หลักฐานของคุณมัดเขาแน่น'+rep(30));K.grad=1;K.arc=6;K.arcAt=age()+R(4,7)}else{K.f.framed=1;feed('🍷 ไวน์หก แต่ไม่มีใครรู้ว่าทำไม ดยุกชี้มาที่คุณ "เด็กทุนคนนี้แหละที่วางยา"'+rep(-20));K.grad=1;K.arc=6;K.arcAt=age()+1}},'',.6),
   O('🎭 ปล่อยให้เป็นไปตามแผน',()=>{K.f.letdie=1;feed('🎭 องค์ชายล้มลงกลางงาน ประเทศเข้าสู่ความวุ่นวาย และมีที่ว่างให้คนอย่างคุณเติบโต'+dark(25));npc(K,'prince').alive=0;K.grad=1;K.arc=6;K.arcAt=age()+R(3,5)},'',.15)])},
  K=>{const o=[];const t=`ราชสำนักหลังคืนนั้นไม่เหมือนเดิม · องค์ชาย ${npc(K,'prince').alive?'ยังมีชีวิต':'สิ้นพระชนม์'} · ความมืด ${K.dark} · เบาะแสลับ ${K.clue}/3`;
   if(K.f.framed&&!K.f.saved){o.push(O('⚖️ ยอมขึ้นศาล',()=>ending(K,'exec','ศาลตัดสินในสิบนาที ไม่มีใครฟังเด็กทุน กลองดังสามครั้งกลางลานประหาร','ถูกประหารกลางลานเมืองด้วยข้อหาที่ไม่ได้ทำ'),'',.3));o.push(O('🏃 หนีออกจากเมืองหลวง',()=>{K.f.framed=0;K.f.fled=1;feed('🏃 คุณหนีออกทางท่อน้ำทิ้งของวัง มีชื่ออยู่ในประกาศจับทุกเมือง');K.arcAt=age()+R(3,5)},'',.5))}
   else{if(npc(K,'prince').alive&&npc(K,'prince').aff>=70||npc(K,'lady').aff>=75)o.push(O('💍 รับคำขอแต่งงาน',()=>ending(K,'crown',npc(K,'lady').aff>=75?`คุณกับ${npc(K,'lady').n}แต่งงานกันในโบสถ์เล็กๆ นอกเมือง ไม่มีขุนนางคนไหนมา และเป็นงานที่มีความสุขที่สุดในแคว้น`:'เด็กทุนจากหมู่บ้านที่ไม่มีใครรู้จัก เดินเข้าโบสถ์หลวงในชุดเจ้าสาวของราชวงศ์','ใช้ชีวิตจนแก่เฒ่าข้างคนที่รัก'),'',.4));
    if(K.f.saved)o.push(O('🛡️ รับตำแหน่งราชเลขาธิการ',()=>ending(K,'savior','คนที่ปัดแก้วยาพิษในคืนนั้นกลายเป็นคนที่ทั้งแผ่นดินไว้ใจ คุณเขียนกฎหมายที่ให้เด็กทุกคนเข้าเรียนได้','จากไปอย่างสงบในฐานะผู้ช่วยแผ่นดิน'),'',.4));
    if(K.dark>=45&&(K.f.shadow||K.f.blk||K.f.letdie))o.push(O('🎭 ขึ้นไปนั่งหลังบัลลังก์',()=>ending(K,'shadow','ไม่มีใครเห็นคุณบนบัลลังก์ แต่ทุกคำสั่งของกษัตริย์องค์ใหม่ผ่านโต๊ะคุณก่อนเสมอ','ปกครองอาณาจักรจากเงาจนวันสุดท้าย'),'ความมืดสูงพอ',.2))}
   if(K.clue>=3)o.push(O('🃏 สวมหน้ากากของเขา',()=>ending(K,'mask','ชายสวมหน้ากากยื่นหน้ากากให้คุณ ใต้หน้ากากเขาคือคุณในอีกชีวิตหนึ่ง ที่เลือกทุกทางต่างจากคุณ คุณสวมมันแล้วยืนบนระเบียงรอเด็กทุนคนต่อไป','กลายเป็นชายสวมหน้ากากที่ยื่นข้อเสนอให้เด็กทุนทุกรุ่น'),'🗝️ ฉากจบลับ',.1));
   if(!o.length)o.push(O('🍵 ใช้ชีวิตต่อไป',()=>{K.arcAt=age()+R(4,6);feed('🍵 คุณรับราชการอย่างเงียบๆ อีกหลายปี')},'',.5));
   C('👑 ชะตาในราชสำนัก',t,o)}]};

// =================== เหตุการณ์สุ่ม (ประกอบจากชิ้นส่วน ไม่ซ้ำ) ===================
const PLACE=['ตลาดใต้สะพานหิน','โรงเตี๊ยมหมูป่าหัวเราะ','ซากวิหารเทพที่ถูกลืม','ทางแยกที่มีต้นไม้แขวนกระดิ่ง','ท่าเรือที่ไม่มีเรือ','ป่าที่ต้นไม้หันหน้าตามคน'];
const RE=[
 K=>{const n=nm();C('⛓️ ทาสที่หนีมา',`ที่${pick(PLACE)} ชายคนหนึ่งคว้าแขนคุณ ข้อมือเขามีตราเหล็กเผา "ซ่อนฉันที ข้างหลังมีนักล่าทาสสามคน" เขาชื่อ <b>${E(n)}</b>`,[
  O('🫥 ซ่อนเขาไว้',()=>{later(K,R(4,7),'slave',{n,good:1});feed('🫥 คุณยืนบังเขาไว้ในเงาจนนักล่าเดินผ่าน'+rep(2))},'',.5),
  O('💰 ชี้ให้นักล่า',()=>{money(60);later(K,R(4,7),'slave',{n,good:0});feed('💰 นักล่าโยนเหรียญให้คุณ เขามองคุณตอนถูกลากไป'+dark(8))},'',.2),
  O('🪙 ซื้ออิสรภาพให้เขา',()=>{if((S.money||0)<150)return feed('🪙 เงินไม่พอ นักล่าหัวเราะแล้วลากเขาไป');money(-150);later(K,R(4,7),'slave',{n,good:2});feed('🪙 คุณจ่ายเงินแล้วฉีกใบทาสต่อหน้าเขา'+rep(4))},'150 เหรียญ',.3)])},
 K=>{C('🎁 พ่อค้าเร่ไม่มีเงา',`พ่อค้าตัวเตี้ยเปิดกล่องไม้สามใบ "ใบหนึ่งมีของดี ใบหนึ่งมีของร้าย ใบหนึ่งมีของที่เจ้ายังไม่เข้าใจ ราคาเท่ากัน 50 เหรียญ"`,[1,2,3].map(i=>O(`📦 กล่องที่ ${i}`,()=>{if((S.money||0)<50)return feed('📦 คุณไม่มีเงินพอ พ่อค้าหายไปตอนคุณกะพริบตา');money(-50);const r=rnd();if(r<.4){K.mpM+=20;feed('📦 ในกล่องมีหินมานาสีฟ้า · มานาสูงสุด +20')}else if(r<.7){K.endY=(K.endY||70)-2;feed('📦 ในกล่องมีนาฬิกาทรายที่ไหลขึ้น ทุกครั้งที่คุณมองมัน คุณรู้สึกแก่ลง · อายุขัย −2')}else if(r<.85&&K.clue<3){feed('📦 ในกล่องมีกุญแจที่ไม่มีรูกุญแจในโลกนี้ให้ไข'+clue(K,'กุญแจของประตูที่ยังไม่มี'))}else{K.pw+=capOf(K)*.15;feed('📦 ในกล่องมีหัวใจมังกรเล็กเท่าเมล็ดถั่ว คุณกลืนมันโดยไม่รู้ตัว · พลังพุ่ง')}},'',.33)))},
 K=>{const pay=pick([['name','ชื่อของคุณ'],['mem','ความทรงจำเรื่องบ้าน'],['yrs','สิบปีจากอายุขัย'],['kid','ลูกคนแรก']]);C('📜 สัญญาวิญญาณ',`วิญญาณในบ่อน้ำพูดด้วยเสียงคุณเอง "ข้าให้พลังเจ้าได้ตอนนี้เลย แลกกับ<b>${pay[1]}</b> จ่ายเมื่อข้ามาทวง"`,[
  O('✍️ เซ็นสัญญา',()=>{K.pw+=capOf(K)*.5;K.mpM+=20;K.con.push({id:pay[0],t:pay[1],at:age()+R(5,9),paid:0});feed(`✍️ พลังไหลเข้าตัวคุณเหมือนน้ำเย็น · สัญญา: ${pay[1]}`)},'พลังเยอะ จ่ายทีหลัง',.3),
  O('🙅 ไม่เอา',()=>feed('🙅 บ่อน้ำเงียบไป ผิวน้ำสะท้อนหน้าคุณที่กำลังยิ้มอยู่ ทั้งที่คุณไม่ได้ยิ้ม'),'',.5),
  O('🧠 ต่อรองเงื่อนไข',()=>mgRead('ต่อรองกับวิญญาณ','วิญญาณ',sc=>{if(sc>.7){K.pw+=capOf(K)*.35;feed('🧠 คุณหาช่องโหว่ในสัญญาเจอ ได้พลังมาโดยไม่ต้องจ่าย วิญญาณจะจำคุณไปอีกนาน');later(K,R(6,10),'spiritRev')}else{K.con.push({id:pay[0],t:pay[1],at:age()+R(3,5),paid:0});K.pw+=capOf(K)*.3;feed('🧠 วิญญาณหัวเราะ แล้วร่นเวลาทวงให้เร็วขึ้น')}}),'มินิเกม',.2)])},
 K=>{C('🐉 มังกรแก่ใกล้ตาย',`มังกรสีเงินนอนหายใจรวยรินในหุบเขา เกล็ดร่วงเหมือนหิมะ "เจ้าจะเอาไข่ของข้า หรือจะฟังเรื่องที่ข้าไม่เคยเล่าให้ใครฟัง"`,[
  O('🥚 รับไข่',()=>{K.f.egg=age();feed('🥚 ไข่อุ่นเหมือนหัวใจคน มีคนห้าอาณาจักรอยากได้มัน และตอนนี้ทุกคนรู้ว่ามันอยู่ที่คุณ');later(K,R(3,5),'eggHunt')},'',.4),
  O('👂 ฟังเรื่องเล่า',()=>{S.int=(S.int||0)+8;feed('👂 มังกรเล่าเรื่องโลกก่อนมีมนุษย์ จนหลับไปตลอดกาล'+(rnd()<.35?clue(K,'มังกรตัวแรกเห็นโลกนี้ถูกสร้างจากซากโลกเก่า'):''))},'',.4),
  O('⚔️ เก็บเกล็ดและเขาไปขาย',()=>{money(500);feed('⚔️ คุณรวยขึ้นมาก และคืนนั้นฝันว่าถูกมังกรตัวอื่นมอง'+dark(10))},'',.2)])},
 K=>{const b=pick(['หมาป่าเงินสองหัว','นักล่าค่าหัวที่จำคนผิด','อัศวินเมาที่อยากหาเรื่อง','โจรภูเขาเจ็ดคน']);C(`⚔️ ${b}`,`ที่${pick(PLACE)} ${b}ขวางทาง`,[
  O('⚔️ สู้',()=>duel(b,Math.round(threat(K)*1.1),w=>feed(w?`⚔️ ชนะ${b}${money(R(30,90))}${pw(capOf(K)*.04)}`:`⚔️ แพ้${b}${hurt(.3)}`)),'ต่อสู้',.5),
  O(`🔥 ร่ายเวท${EL[K.el][1]}`,()=>{const o=overcast(K);if(o.ok&&fight(threat(K)*.85))feed(`🔥 เวท${EL[K.el][1]}กวาดทุกอย่างตรงหน้า${o.t}${money(R(20,60))}`);else feed('🔥 เวทพลาดเป้า'+o.t+hurt(.2))},'ใช้มานา',.3),
  O('🏃 หนี',()=>feed(rnd()<.7?'🏃 คุณหนีพ้น':'🏃 หนีไม่พ้น'+hurt(.15)),'',.2)])},
 K=>{C('🃏 ไพ่ในโรงเตี๊ยม',`ชายตาเดียวสับไพ่ "เดิมพันขั้นต่ำ 80 เหรียญ หรือเดิมพันด้วยความลับหนึ่งอย่างก็ได้"`,[
  O('🎭 เล่นด้วยเงิน',()=>{if((S.money||0)<80)return feed('🃏 เงินไม่พอ เขาหัวเราะ');mgRead('อ่านหน้าคนเล่นไพ่','ชายตาเดียว',sc=>{const g=Math.round((sc-.5)*400);money(g);feed(`🃏 ${g>=0?'ชนะ':'แพ้'} ${gold(Math.abs(g))}`)})},'มินิเกม',.4),
  O('🤫 เดิมพันด้วยความลับ',()=>{if(rnd()<.5){feed('🤫 คุณชนะ เขาเล่าความลับของเขาให้ฟัง: '+pick(['ราชามีลูกที่ซ่อนไว้ในหอระฆัง','แผนที่ใต้โต๊ะนี้นำไปสู่คลังที่ไม่มีใครเฝ้า','คนที่นั่งข้างคุณเป็นนักฆ่า'])+(rnd()<.2?clue(K,'ชายตาเดียวเคยเห็นคุณมาก่อน ในอีกชีวิต'):''))}else{K.f.secretOut=1;feed('🤫 คุณแพ้ ต้องเล่าความลับให้เขาฟัง เขาจดลงสมุดเล่มหนา'+dark(3))}},'',.3),
  O('🚪 ไม่เล่น',()=>feed('🚪 คุณเดินออกมา ได้ยินเสียงเก้าอี้ล้มข้างหลัง'),'',.3)])},
 K=>{C('🧒 เด็กที่เห็นคุณร่ายเวท',`เด็กยากจนแอบดูคุณร่ายเวทอยู่หลังกองฟาง ตาเป็นประกาย "สอนผมได้ไหม พ่อบอกว่าคนจนใช้เวทไม่ได้"`,[
  O('✨ สอน',()=>{later(K,R(8,12),'student');feed('✨ คุณสอนเวทพื้นฐานให้เด็กทุกเย็นจนเขาจุดไฟบนปลายนิ้วได้'+rep(2))},'',.5),
  O('🙅 ไล่ไป',()=>feed('🙅 เด็กวิ่งหนีไป แต่ยังหันกลับมามองมือคุณ'),'',.5)])},
 K=>{C('🔥 การไต่สวนแม่มด',`ชาวบ้านมัดหญิงชราไว้กับเสาไฟ "นางสาปวัวตาย" นักบวชถือคบไฟรอสัญญาณ หญิงชรามองคุณตรงๆ เหมือนรู้จักคุณมานาน`,[
  O('🛡️ ขวางไว้',()=>{rep(-3);later(K,R(3,6),'witch');feed('🛡️ คุณแก้เชือกให้เธอต่อหน้าฝูงชน นักบวชจำหน้าคุณไว้')},'',.4),
  O('🔍 หาหลักฐานว่าวัวตายเพราะอะไร',()=>{if((S.int|0)>R(20,100)){feed('🔍 วัวกินหญ้าพิษที่ขึ้นหลังฝนกรด ชาวบ้านปล่อยเธอไปอย่างเสียหน้า'+rep(6));later(K,R(3,6),'witch')}else feed('🔍 คุณหาไม่เจอทันเวลา คบไฟถูกโยนลงกองฟาง'+dark(5))},'ใช้ปัญญา',.4),
  O('😶 ดูอยู่เฉยๆ',()=>feed('😶 ไฟลุกท่วม หญิงชราไม่ร้องเลยสักคำ เธอยังมองคุณจนวินาทีสุดท้าย'+dark(10)),'',.2)])},
 K=>{C('🪞 กระจกในซากวิหาร',`กระจกบานใหญ่ไม่สะท้อนตัวคุณ แต่สะท้อนอีกคนที่ใส่ชุดเดียวกับคุณ อายุมากกว่าคุณสามสิบปี เขาเคาะกระจกจากอีกฝั่ง`,[
  O('✋ วางมือบนกระจก',()=>{if(rnd()<.45&&K.clue<3)feed('✋ มือของเขาอุ่น เขาเขียนอักษรหนึ่งตัวบนกระจกด้วยลมหายใจ'+clue(K,'ตัวคุณในอนาคตพยายามเตือนบางอย่าง'));else{K.endY=(K.endY||70)-1;feed('✋ กระจกเย็นจัด คุณรู้สึกเหมือนบางอย่างถูกดูดออกไป · อายุขัย −1')}},'',.5),
  O('💥 ทุบกระจก',()=>{K.pw+=capOf(K)*.1;feed('💥 เศษกระจกทุกชิ้นสะท้อนหน้าคุณที่กำลังกรีดร้อง · พลัง +'+dark(5))},'',.2),
  O('🚶 เดินผ่านไป',()=>feed('🚶 คุณได้ยินเสียงเคาะกระจกตามหลังไปจนพ้นซากวิหาร'),'',.3)])},
 K=>{if(K.rare)return randEv2(K);C('🌀 ธาตุที่ไม่ควรมี',`ในตลาดมืด หญิงตาบอดขายหนังสือที่ "เลือกเจ้าของเอง" หนังสือในตะกร้าสั่นเมื่อคุณเดินผ่าน`,[
  O('📖 เปิดอ่าน (100 เหรียญ)',()=>{if((S.money||0)<100)return feed('📖 เงินไม่พอ หนังสือหยุดสั่น');money(-100);if(rnd()<.45+(K.f.rareHint?.2:0)){K.rare=pick(Object.keys(RARE));const r=RARE[K.rare];K.mpM+=20;say(`${r[0]} ธาตุ<b>${r[1]}</b>ตื่นขึ้นในตัวคุณ — ${r[2]}`,'myth',true)}else feed('📖 หน้ากระดาษว่างเปล่า หญิงตาบอดยิ้ม "ยังไม่ถึงเวลา"')},'',.5),
  O('🚶 ไม่สน',()=>feed('🚶 หนังสือหยุดสั่น'),'',.5)])}];
function randEv2(K){const r=RARE[K.rare];C(`${r[0]} พลัง${r[1]}เรียกร้อง`,`ธาตุ${r[1]}ในตัวคุณกระสับกระส่าย ${K.rare==='time'?'คุณเห็นอุบัติเหตุรถม้าที่จะเกิดในสามวินาทีข้างหน้า':K.rare==='space'?'คุณมองเห็นประตูเล็กๆ ในอากาศที่ไม่มีใครเห็น':'คนตายข้างถนนกระซิบชื่อฆาตกรให้คุณฟัง'}`,[
 O(`${r[0]} ใช้พลัง`,()=>{K.endY=(K.endY||70)-(K.rare==='time'?2:0);K.pw+=capOf(K)*.12;feed(`${r[0]} ${K.rare==='time'?'คุณย้อนเวลาสามวินาที ดึงเด็กออกจากใต้ล้อรถม้า · อายุขัย −2':K.rare==='space'?'คุณก้าวผ่านประตูไปโผล่ในห้องเก็บสมบัติของใครบางคน'+money(R(80,200)):'คุณบอกชื่อฆาตกรกับยาม เขาถูกจับในคืนนั้น'}`+rep(3))},'',.6),
 O('🔒 กดมันไว้',()=>{K.mp=Math.max(0,K.mp-20);feed('🔒 คุณกดพลังไว้จนปวดหัวทั้งวัน')},'',.4)])}
function randEv(K){const L=RE.slice();if(K.w==='magic'||K.w==='noble')L.push(K=>schoolEv(K));pick(L)(K)}
function schoolEv(K){if(!school(K))return pick(RE)(K);const w=K.w;C(w==='magic'?'🧪 คาบปรุงยาที่ไม่มีใครลืม':'📨 จดหมายไม่ลงชื่อ',w==='magic'?`หม้อยาของ${N(K,'rival')}เดือดเป็นสีม่วงแล้วเริ่มส่งเสียงร้อง ทุกคนถอยหนี`:`จดหมายใต้ประตูห้องคุณเขียนว่า "อย่าไปงานเลี้ยงคืนวันศุกร์" ลายมือเหมือนลายมือของ${N(K,'maid')}`,w==='magic'?[
 O('🧯 กระโจนเข้าไปดับ',()=>{const o=overcast(K);feed('🧯 คุณกดฝาหม้อไว้ด้วยเวท'+o.t+aff(K,'rival',10)+rep(4));K.yrS+=8},'',.5),
 O('🏃 หนีพร้อมคนอื่น',()=>{feed('🏃 หม้อระเบิด เพดานห้องเรียนกลายเป็นสีม่วงไปทั้งปี');K.yrS+=1},'',.5)]:[
 O('🏠 ไม่ไป',()=>{feed('🏠 คืนวันศุกร์ เพดานห้องโถงถล่มทับโต๊ะที่คุณควรนั่ง'+aff(K,'maid',10))},'',.5),
 O('💃 ไปตามปกติ',()=>{if(rnd()<.5)feed('💃 ไม่มีอะไรเกิดขึ้น นอกจากมีคนแอบมองคุณตลอดงาน');else feed('💃 เพดานห้องโถงร่วงลงมาข้างคุณ เศษหินบาดแขน'+hurt(.25))},'',.5)])}
// =================== เหตุการณ์ย้อนกลับ (คนที่จำคุณได้) ===================
function doLater(K,L){const d=L.d||{};
 if(L.id==='slave'){if(d.good===0)C('🗡️ คนที่คุณเคยขาย',`ชายที่มีตราเหล็กเผาบนข้อมือยืนอยู่ปลายเตียงคุณกลางดึก <b>${E(d.n)}</b> ตอนนี้เป็นนักฆ่าที่ราคาแพงที่สุดในแคว้น`,[O('⚔️ สู้',()=>duel(d.n,Math.round(S.power*1.1),w=>feed(w?'⚔️ เขาล้มลง ก่อนตายเขาหัวเราะ "ยุติธรรมดี"':'⚔️ เขากรีดแก้มคุณเป็นรอยยาวแล้วหายไป "ครั้งหน้าไม่ใช่แค่แก้ม"'+hurt(.4))),'ต่อสู้',.6),O('🙏 ขอโทษ',()=>feed(rnd()<.4?'🙏 เขาจ้องคุณนาน แล้วเก็บมีด "ข้าอยากรู้ว่าเจ้าจะพูดแบบนี้ไหม"':'🙏 "สายไปสิบปี"'+hurt(.5)),'',.4)]);
  else feed(`🤝 พ่อค้าแปลกหน้านำเกวียนสินค้ามาจอดหน้าบ้าน เขาคือ<b>${E(d.n)}</b> ทาสที่คุณเคย${d.good===2?'ซื้ออิสรภาพให้':'ช่วยซ่อน'} "ข้าไม่เคยลืม"${money(d.good===2?400:200)}`);return}
 if(L.id==='elfkid'){feed(`🌲 คนแปลกหน้าหูยาวทิ้งดอกไม้สีเงินไว้หน้าประตูคุณ พร้อมข้อความ: "หมู่บ้านของเรายังอยู่ เพราะคุณ"${aff(K,'demon',15)}`);K.f.peace=(K.f.peace|0)+1;return}
 if(L.id==='palGone'){const p=npc(K,'pal');p.alive=0;say(`🧱 ${E(p.n)}หายไปจากห้องพักตอนเช้า เตียงยังอุ่น วิทยาลัยบอกว่าเขาลาออกกลับบ้าน แต่จดหมายถึงบ้านเขาถูกตีกลับมาทุกฉบับ`,'bad',true);return}
 if(L.id==='mentorRev'){C('🌑 อาจารย์ที่คุณเคยรายงาน',`${N(K,'mentor')}ยืนรอคุณที่ปลายระเบียงมืด "ข้าไม่โกรธ ข้าแค่อยากให้เจ้าเห็นว่าความซื่อสัตย์ราคาเท่าไหร่"`,[O('⚔️ ดวลเวท',()=>duel(npc(K,'mentor').n,Math.round(S.power*1.15),w=>{feed(w?'⚔️ คุณชนะ อาจารย์หายไปเหลือแค่ผ้าคลุม'+rep(10):'⚔️ คุณแพ้ และตื่นมาโดยจำชื่อแม่ตัวเองไม่ได้'+hurt(.3))}),'ต่อสู้',.6),O('🏃 วิ่งหนี',()=>feed('🏃 คุณวิ่งจนถึงห้องอธิการบดี ประตูเปิดเอง'+(K.clue<3?clue(K,'อธิการบดีไม่มีร่างกาย'):'')),'',.4)]);return}
 if(L.id==='rivalRev'){feed(`🧪 ${N(K,'rival')}ส่งขวดยาเปล่ามาให้คุณพร้อมโน้ต: "ฉันรู้มาตลอด" · ชื่อเสียงของคุณร่วงในวงการจอมเวท`+rep(-15));return}
 if(L.id==='student'){feed(`✨ จอมเวทหนุ่มชื่อดังมาคุกเข่าตรงหน้าคุณกลางตลาด เขาคือเด็กหลังกองฟางคนนั้น "ทุกอย่างที่ผมเป็น เริ่มจากไฟบนปลายนิ้วที่คุณสอน"${rep(10)}${pw(capOf(K)*.05)}`);K.f.student=1;return}
 if(L.id==='witch'){feed(`🧙 หญิงชราที่คุณช่วยจากกองไฟส่งกาน้ำชามาให้ ในกาน้ำชามีตาข้างหนึ่งที่ยังกะพริบได้${K.clue<3?clue(K,'แม่มดชรารู้เรื่องจุดจบของคุณ'):''}`);return}
 if(L.id==='spiritRev'){C('📜 วิญญาณที่คุณเคยหลอก',`ผิวน้ำทุกบ่อในเมืองสะท้อนหน้าวิญญาณที่คุณเคยต่อรองชนะ "เจ้าฉลาด แต่ข้ามีเวลามากกว่า"`,[O('🧠 ต่อรองอีกรอบ',()=>mgRead('ต่อรองกับวิญญาณที่โกรธ','วิญญาณ',sc=>feed(sc>.6?'🧠 คุณชนะอีกครั้ง วิญญาณหัวเราะแล้วจากไปตลอดกาล':'🧠 คุณแพ้ วิญญาณเอาเงาของคุณไปครึ่งหนึ่ง'+hurt(.3))),'มินิเกม',.6),O('🙇 คืนพลังให้',()=>{K.pw=Math.max(8,K.pw*.75);feed('🙇 พลังไหลออกจากตัวคุณกลับลงบ่อ')},'',.4)]);return}
 if(L.id==='eggHunt'){C('🥚 คนที่ตามล่าไข่มังกร',`อัศวินห้าคนจากอาณาจักรเพื่อนบ้านล้อมบ้านคุณ ไข่ในห้องนอนเริ่มร้าว`,[O('⚔️ สู้ปกป้องไข่',()=>duel('หัวหน้าอัศวินล่ามังกร',Math.round(S.power*1.1),w=>{if(w){K.f.dragon=1;K.pw+=capOf(K)*.2;say('🐉 ไข่ฟักออกเป็นมังกรเงินตัวเล็ก มันกัดนิ้วคุณ แล้วไม่ยอมห่างคุณอีกเลย','myth',true)}else{feed('⚔️ พวกเขาเอาไข่ไป คุณได้ยินเสียงมังกรน้อยร้องไกลออกไปทุกคืน'+hurt(.3))}}),'ต่อสู้',.6),O('🤝 ขายไข่ให้',()=>{money(2000);feed('🤝 คุณรวยมาก และไม่เคยนอนหลับสนิทอีกเลย'+dark(12))},'',.4)]);return}}
// =================== สัญญาถึงกำหนด ===================
function conDue(K,c){c.paid=1;const t={name:()=>{const o=S.name;S.name='ผู้ไร้นาม';say(`📜 วิญญาณมาทวงสัญญา ชื่อ「${E(o)}」หายไปจากหัวทุกคนในโลก รวมทั้งของคุณ`,'bad',true)},mem:()=>{K.home=0;say('📜 วิญญาณมาทวงสัญญา คุณจำหน้าแม่ไม่ได้อีกต่อไป','bad',true)},yrs:()=>{K.endY=Math.max(age()+1,(K.endY||70)-10);say('📜 วิญญาณมาทวงสัญญา ผมคุณหงอกขาวในคืนเดียว · อายุขัย −10','bad',true)},kid:()=>{say(`📜 วิญญาณมาทวงสัญญา ${S.kids?'ลูกคนแรกของคุณหายไปจากเปลตอนเช้า':'วิญญาณบอกว่าจะรอ จนกว่าคุณจะมีลูก'}`,'bad',true);if(!S.kids){c.paid=0;c.at=age()+5}},
  mask:()=>C('🎭 ชายสวมหน้ากากมาทวงความช่วยเหลือ',`"ถึงเวลาแล้ว" เขาขอให้คุณ${pick(['ทิ้งจดหมายฉบับหนึ่งไว้ในห้องดยุก','บอกทางลับของหอให้คนแปลกหน้า','เปลี่ยนแก้วไวน์ในงานเลี้ยงหนึ่งใบ'])}`,[O('✅ ทำตาม',()=>{feed('✅ คุณทำตามโดยไม่ถาม เรื่องเล็กๆ นั้นเปลี่ยนตำแหน่งของคนสามตระกูล'+dark(12));K.f.maskDone=1},'',.5),O('❌ ผิดสัญญา',()=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.5));feed('❌ มือขวาของคุณเย็นเฉียบเหมือนหินอ่อนไปตลอดชีวิต · บาดเจ็บหนัก')},'',.5)])}[c.id];if(t)t()}
// =================== ความรัก / คิดถึงบ้าน ===================
function evLove(K){const g=S.gender==='หญิง'?'m':'f',n=nm(g);C('💞 คนที่ใจเต้นด้วย',`<b>${E(n)}</b> ${pick(['นักดาบรับจ้างที่ช่วยคุณจากโจร','บรรณารักษ์ที่ชอบหนังสือเล่มเดียวกับคุณ','นักบวชฝึกหัดที่หัวเราะเสียงดังเกินไป','ลูกสาวช่างตีเหล็กที่ตีดาบให้คุณฟรี'])} ชวนคุณไปดูดวงจันทร์สองดวงในคืนเทศกาล`,[
 O('💞 ไป',()=>{if(rnd()<.6+(S.cha|0)/300){S.spouse=n;try{S.sp=mkLover(n,'คู่ชีวิตจากต่างโลก',{wed:false,age:S.age})}catch(e){}say(`💞 คุณกับ<b>${E(n)}</b>คบกันตั้งแต่คืนนั้น`,'good')}else feed('💞 คืนนั้นสนุก แต่เป็นแค่คืนเดียว')},'',.5),
 O('🙅 ปฏิเสธ',()=>feed('🙅 คุณบอกว่ายังมีเรื่องต้องทำ'),'',.5)])}
function evHomesick(K){K.f.homeAsk=1;C('🏠 คิดถึงบ้าน',`คืนหนึ่งคุณฝันถึงเสียงไมโครเวฟ กลิ่นข้าวมันไก่ และเสียงแม่เรียกให้ลงมากินข้าว ตื่นมาหมอนเปียก`,[
 O('✉️ เขียนจดหมายที่ส่งไม่ได้',()=>{K.home=cl((K.home|0)+15,0,100);feed('✉️ คุณเขียนจดหมายถึงแม่สามหน้า แล้วเก็บไว้ใต้หมอน')},'',.5),
 O('🔥 เผาความทรงจำทิ้ง',()=>{K.home=0;K.pw+=capOf(K)*.1;feed('🔥 คุณตัดสินใจว่าที่นี่คือบ้าน ใจเบาลงอย่างน่ากลัว'+dark(5))},'',.3)])}

// =================== หน้าเกิด ===================
let FB=null;
const ORGW={magic:[34,20,14,22,10],noble:[40,18,22,14,6]};
const TOP=[['iso','⚔️','ต่างโลก','ถูกอัญเชิญข้ามโลก · เริ่มอายุ 16'],['magic','🔮','โลกเวทมนตร์','วิทยาลัยเวทอาร์คาเนีย · เริ่มอายุ 12'],['noble','🏰','โลกแห่งอะคาเดมี่','สถาบันหลวง การเมือง งานเลี้ยง · เริ่มอายุ 12']];
function fbRoll(first){if(!first){if(FB.left<=0)return;FB.left--}if(FB.top==='iso'){FB.w=rnd()<.7?'hero':'trash'}const w=FB.w;
 FB.el=pick(Object.keys(EL));FB.rare=rnd()<.05?pick(Object.keys(RARE)):null;
 if(WD[w].g==='iso'){FB.sk=pick(SK[w])[0];FB.org=null}else{const L=ORG[w],W=ORGW[w]||L.map(()=>1);let t=W.slice(0,L.length).reduce((a,b)=>a+b,0)*rnd(),i=0;for(;i<L.length-1;i++){t-=W[i]||1;if(t<=0)break}FB.org=L[i][0];FB.sk=null}
 if(first||!FB.edited||!FB.name){if(first||!FB.edited)FB.g=rnd()<.5?'ชาย':'หญิง';FB.name=w==='hero'||w==='trash'?pick(TH)+' '+pick(['ใจดี','ศรีสุข','รักไทย','มั่นคง','แสงทอง','บุญมา']):nm(FB.g==='หญิง'?'f':'m')}
 fbDraw()}
const fbCss=()=>{if(document.getElementById('fanBcss'))return;const st=document.createElement('style');st.id='fanBcss';st.textContent=`
.fanB h3{margin:0 0 4px}.fanB .fbW{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:8px 0}
.fanB .fbW button{text-align:left;padding:9px;border-radius:13px;border:1.5px solid #3c2f63;background:#170f2b;color:#efe6ff;font:inherit;font-size:12.5px;cursor:pointer;line-height:1.3}
.fanB .fbW button b{display:block;font-size:14px}.fanB .fbW button.on{border-color:#ffd37a;background:linear-gradient(160deg,#2c1d52,#3a2560);box-shadow:0 0 0 2px #ffd37a33,0 0 18px #b98cff44}
.fanB .fbD{font-size:12.5px;color:#cfc3ea;background:#120b22;border:1px solid #2c2150;border-radius:12px;padding:9px;line-height:1.5}
.fanB .fbT{display:flex;gap:8px;align-items:flex-start;padding:8px;border-radius:12px;background:#1a1130;margin-top:6px;border:1px solid #33265a}
.fanB .fbT .ic{font-size:22px}.fanB .fbT small{display:block;color:#b7a9d8;font-size:11.5px}.fanB .fbT.rare{border-color:#ffd37a;background:linear-gradient(90deg,#2b1e10,#1a1130)}
.fanB input{width:100%;box-sizing:border-box;font:inherit;font-size:17px;padding:8px 10px;border-radius:11px;border:1.5px solid #4a3a7a;background:#0f0a1d;color:#fff}
.fanB .fbG{display:flex;gap:6px;margin:6px 0}.fanB .fbG button{flex:1;padding:6px;border-radius:10px;border:1px solid #4a3a7a;background:transparent;color:#efe6ff;font:inherit}.fanB .fbG button.on{background:#ffd37a;color:#1a1200;font-weight:700;border-color:transparent}
.fanB .fbBar{display:grid;grid-template-columns:1fr 1.4fr;gap:8px;margin-top:10px}.fanB .fbBar button{min-height:50px;border-radius:14px;font-size:15px}
#mwHud.fan{background:linear-gradient(170deg,#1d1236,#120b22);border:1.5px solid #6a4fb0;border-radius:14px;padding:9px 11px;color:#efe6ff;box-shadow:0 2px 14px #0007,inset 0 0 20px #b98cff1f}
#mwHud.fan .fhT{display:flex;justify-content:space-between;font-size:11px;color:#b7a9d8}#mwHud.fan .fhR{font-weight:800;font-size:15px;margin:3px 0;color:#ffe6a8}
#mwHud.fan .fhB{display:flex;align-items:center;gap:6px;font-size:12px;margin:3px 0}#mwHud.fan .fhB .bar{flex:1;height:7px;border-radius:5px;background:#0b0716;overflow:hidden}#mwHud.fan .fhB .bar i{display:block;height:100%;background:linear-gradient(90deg,#5a8cff,#b98cff)}
#mwHud.fan .fhB.dk .bar i{background:linear-gradient(90deg,#3a2a4a,#ff4d6d)}#mwHud.fan .fhC{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}#mwHud.fan .fhC span{font-size:11px;padding:2px 7px;border-radius:9px;background:#2a1c4a;border:1px solid #4a3a7a}
#mwHud.fan .fhC span.k{background:#3a2a10;border-color:#ffd37a;color:#ffe6a8}`;document.head.appendChild(st)};
function fbDraw(){fbCss();const w=FB.w,d=WD[w],e=EL[FB.el],r=FB.rare&&RARE[FB.rare];
 const sk=FB.sk?SK[w].find(x=>x[0]===FB.sk):null,og=FB.org?ORG[w].find(x=>x[0]===FB.org):null;
 const bon=og?Object.entries(og[3]).map(([k,v])=>({int:`ปัญญา +${v}`,gold:`เงิน +${v}`,mp:`มานา +${v}`,dark:`ความมืด +${v}`,pow:`พลัง +${v}`,rank:`อันดับเริ่มดีขึ้น ${-v}`,luck:'โชคดีในเขาวงกต',secret:'มีความลับติดตัว'}[k]||k)).join(' · '):'';
 modal(`<div class="fanB"><button class="xbtn" onclick="closeM()">✕</button><h3>🔮 ทวีปแฟนตาซี</h3><div class="tag2">เลือกโลก แล้วสุ่มชะตา</div>
 <div class="fbW" style="grid-template-columns:1fr">${TOP.map(t=>`<button class="${t[0]===FB.top?'on':''}" onclick="fanW('${t[0]}')"><b>${t[1]} ${t[2]}</b>${t[3]}</button>`).join('')}</div>
 ${FB.top==='iso'?`<div class="fbT${w==='trash'?' rare':''}"><div class="ic">${d.ic}</div><div><b>ผลประเมินตอนถูกอัญเชิญ: ${w==='hero'?'ผู้กล้า':'สกิลขยะ'}</b><small>${w==='hero'?'1 ใน 1.4 · ได้สกิลดี วังเลี้ยงดู':'1 ใน 3.3 · สกิลที่ทุกคนหัวเราะ ถูกทิ้งนอกกำแพง แต่มันโตได้'}</small></div></div>`:''}
 <div class="fbD">${d.d}</div>
 <div style="margin-top:8px"><div class="tag2">ชื่อ</div><input id="fanNm" maxlength="24" value="${E(FB.name)}" onchange="fanNm(this.value)"><div class="fbG">${['ชาย','หญิง'].map(g=>`<button class="${FB.g===g?'on':''}" onclick="fanG('${g}')">${g==='ชาย'?'♂':'♀'} ${g}</button>`).join('')}</div></div>
 <div class="fbT"><div class="ic">${e[0]}</div><div><b>ธาตุ${e[1]}</b><small>ธาตุประจำตัว · เวทธาตุนี้แรงที่สุด</small></div></div>
 ${r?`<div class="fbT rare"><div class="ic">${r[0]}</div><div><b>ธาตุหายาก: ${r[1]}</b><small>${r[2]} · 1 ใน 20</small></div></div>`:''}
 ${sk?`<div class="fbT"><div class="ic">${sk[1]}</div><div><b>สกิล: ${sk[2]}</b><small>${sk[3]}</small></div></div>`:''}
 ${og?`<div class="fbT"><div class="ic">${og[1]}</div><div><b>${og[2]}</b><small>${bon}</small></div></div>`:''}
 <div class="fbBar"><button class="gbtn" ${FB.left<=0?'disabled':''} onclick="fanRe()">🎲 สุ่มใหม่ (${FB.left})</button><button class="pbtn" onclick="fanGo()">เริ่มชีวิต ▶</button></div></div>`,'fanb')}
window.fanW=k=>{if(!FB)return;k=k==='hero'||k==='trash'?'iso':k==='aca'?'noble':k;if(!TOP.some(t=>t[0]===k))return;FB.top=k;FB.w=k==='iso'?'hero':k;FB.edited=0;fbRoll(true)};
window.fanNm=v=>{v=String(v||'').trim().slice(0,24);if(v&&FB){FB.name=v;FB.edited=1}};
window.fanG=g=>{if(!FB)return;FB.g=g;if(!FB.edited&&WD[FB.w].g==='aca')FB.name=nm(g==='หญิง'?'f':'m');fbDraw()};
window.fanRe=()=>{if(!FB||FB.left<=0)return;try{sfx('click')}catch(e){}fbRoll(false)};
window.fanGo=()=>{if(!FB)return;try{const i=document.getElementById('fanNm');if(i)window.fanNm(i.value)}catch(e){}const RR=Object.assign({},FB);FB=null;fanBegin(RR)};
window.fanStart=function(w){window._frS=1;try{closeM()}catch(e){}const tot=Math.max(3,(window.vipTot&&window.vipTot())|0);const tp=w==='hero'||w==='trash'||w==='iso'?'iso':w==='aca'||w==='noble'?'noble':w==='magic'?'magic':'iso';FB={top:tp,w:tp==='iso'?'hero':tp,left:(typeof CFG!=='undefined'&&CFG.chm==1)?0:tot,edited:0};fbRoll(true)};
function fanBegin(RR){window._frS=1;try{closeM()}catch(e){}const w=RR.w,d=WD[w];
 try{CFG.xian=0;CFG.mw=0;if((CFG.chm|0)>=2)CFG.chm=0;crForce={g:RR.g==='หญิง'?1:0};goBirth();doRoll(true);startLife()}catch(e){console.error(e);return}
 setTimeout(()=>{try{if(choice._cur)choice._cur=null;if(modalOpen)closeM();
  S.name=RR.name;S.gender=RR.g;S.age=d.a0;S.power=8;S.qi=0;S.money=d.g==='iso'?(w==='trash'?3:40):60;S.maxHp=70;S.hp=70;S.int=18;S.cha=18;S.fame=0;S.karma=0;S.xian=false;S.xt=0;S.faction=null;S.ownSect=null;S.custom=true;S.arts=[];S.sys=null;S.spouse=null;
  S.mw={y:0,sec:0,fame:0,adapt:100,qi:0,lin:0,linMet:0,native:1,rnd:1,cc:'th',uni:0,qlv:0,past:{n:S.name,realm:'',yr:1,how:'native',pow0:8},seen:{e1:1,e2:1,e3:1,e4:1,e5:1,e6:1,e7:1,e8:1,e9:1,e10:1,e11:1,e12:1,e13:1,e14:1,e15:1},q:[],fl:{},end:70,clk:0,hum:1,mon0:0,par:null,ast:{h:0,bike:0,car:0,ins:0,mort:0,mortY:0,save:0},lives:[]};
  const og=RR.org?ORG[w].find(x=>x[0]===RR.org):null,b=og?og[3]:{};
  const K=S.mw.fan=newK(w,{el:RR.el,rare:RR.rare,sk:RR.sk,org:RR.org,dark:b.dark||0,rank:30+(b.rank||0),pow:8+(b.pow||0)});
  if(b.int)S.int+=b.int;if(b.gold)S.money+=b.gold;if(b.mp){K.mpM+=b.mp;K.mp+=b.mp}if(b.luck)K.f.luck=1;if(b.secret)K.f.secret=1;
  if(w==='hero'&&RR.sk==='sword')K.pw+=6;if(w==='hero'&&RR.sk==='shield')S.maxHp+=30;
  K.endY=R(d.end[0],d.end[1]);S.mw.end=K.endY;
  S.focus=fList(K)[0][0];S.key=[`${d.a0} ปี — ${d.ic} ${d.n}`];try{S.era=null}catch(e){}
  try{const fd=$('feed');if(fd)fd.innerHTML=''}catch(e){}
  try{const T=LS.get('murim_mtried',{})||{};if(!T.fan){T.fan=1;LS.set('murim_mtried',T)}}catch(e){}
  say(`${d.ic} <b>${d.n}</b> · ${d.sc} — ${d.d}`,'myth',true);
  feed(`${EL[RR.el][0]} ธาตุ${EL[RR.el][1]}${RR.rare?` · ${RARE[RR.rare][0]} ธาตุหายาก${RARE[RR.rare][1]}`:''}${RR.sk?` · สกิล「${SK[w].find(x=>x[0]===RR.sk)[2]}」`:''}${og?` · ${og[1]} ${og[2]}`:''}`);
  sync();render();saveGame()}catch(e){console.error('fanBegin',e)}},700)}

// =================== ฉาก ===================
const SKY={hero:['#2a1d4a','#b85a6a','#f0b070'],trash:['#1a1a22','#3a3340','#6a5a4a'],magic:['#0c0a24','#2a2060','#5a48a0'],noble:['#1a1430','#5a3a6a','#d8a070']};
function drawFan(ctx){g=ctx;PS=ctx.canvas.width/SW;ctx.setTransform(PS,0,0,PS,0,0);ctx.imageSmoothingEnabled=false;const K=FN(),f=frame||0,c=SKY[K.w];
 const R2=(x,y,w,h,col,a)=>{if(a!=null)ctx.globalAlpha=a;ctx.fillStyle=col;ctx.fillRect(x,y,w,h);ctx.globalAlpha=1};
 for(let i=0;i<SH;i++)R2(0,i,SW,1,i<SH*.35?c[0]:i<SH*.6?c[1]:c[2],1);
 for(let i=0;i<18;i++)R2((i*37)%SW,(i*13)%22,1,1,'#fff',.3+.4*Math.abs(Math.sin(f*.03+i)));
 R2(SW-30,5,7,7,'#f4ecd8',.9);R2(SW-18,9,4,4,'#c9b0ff',.85);
 if(K.w==='hero'){for(let i=0;i<5;i++)R2(20+i*24,22-(i%2)*6,10,26+(i%2)*6,'#3a2a50');R2(70,10,16,38,'#4a3866');R2(76,6,4,4,'#ffd37a',.6+.4*Math.sin(f*.1))}
 else if(K.w==='trash'){for(let i=0;i<8;i++)R2(i*20,34-(i*7%9),16,20,'#2a252e');R2(0,48,SW,8,'#191519');for(let i=0;i<4;i++)R2(15+i*40,46,3,2,'#ff9a4a',.5+.3*Math.sin(f*.2+i))}
 else if(K.w==='magic'){R2(64,8,22,42,'#1c1840');R2(68,2,14,6,'#2a2460');for(let i=0;i<4;i++)R2(70,14+i*8,3,4,'#ffd37a',.7);R2(110,18,14,32,'#1c1840');for(let i=0;i<10;i++){const x=(i*29+f*.4)%SW,y=10+(i*11)%30;R2(x,y,1,1,['#b98cff','#7ad0ff','#ffd37a'][i%3],.7)}}
 else{R2(30,18,100,30,'#3a2a4a');for(let i=0;i<6;i++)R2(36+i*16,24,6,10,'#ffd9a0',.55+.25*Math.sin(f*.08+i));R2(70,8,20,10,'#4a3866');R2(78,4,4,4,'#ffd37a')}
 R2(0,SH-8,SW,8,'#0d0a14',.8);
 try{const me=meLook();curMe=me;person(34,47,me,'stand')}catch(e){}
 if(K.dark>=50){R2(0,0,SW,SH,'#2a0010',.08+(K.dark-50)/400)}
 if(K.mp>0){ctx.globalAlpha=.3+.2*Math.sin(f*.12);ctx.fillStyle={fire:'#ff7a3a',water:'#4ab0ff',wind:'#9affd0',earth:'#c9a060',light:'#fff2b0',shadow:'#9a6aff'}[K.el]||'#fff';ctx.fillRect(30,40,10,1);ctx.globalAlpha=1}}
{const _ds=drawScene;drawScene=function(ctx,type){try{if(on()&&type!=='death'){drawFan(ctx);return}}catch(e){console.error('fan scene',e)}return _ds.apply(this,arguments)}}
{const _sc=sceneCap;sceneCap=function(t){try{if(on()){const K=FN();return `${WD[K.w].sc}${K.grad&&WD[K.w].g==='aca'?' · หลังจบการศึกษา':''}`}}catch(e){}return _sc.apply(this,arguments)}}

// =================== เชื่อมกับเกม (ชั้นนอกสุด) ===================
function hud(K){const d=WD[K.w],m=Math.round(K.mp),mm=Math.round(K.mpM);
 const sk=K.sk?(K.w==='trash'?`🗑️ ${TRUE_SK[K.sk][K.skL-1]} Lv${K.skL}`:`${SK.hero.find(x=>x[0]===K.sk)[1]} ${SK.hero.find(x=>x[0]===K.sk)[2]}`):'';
 const st=d.g==='aca'?(K.f.expelled?'ถูกไล่ออก':K.grad?'จบการศึกษา':`ปี ${Math.max(1,age()-d.a0)} · อันดับ ${K.rank}/60`):(K.w==='hero'?`อันดับผู้กล้า ${K.rank}/30`:K.f.guild?'นักผจญภัยกิลด์':'คนในสลัม');
 return `<div class="fhT"><span>${d.ic} ${d.n}</span><span>${d.sc}</span></div><div class="fhR">${E(S.name)} <span style="font-size:12px;color:#c9b0ff">· ${st}</span></div>
 <div class="fhB">💠<div class="bar"><i style="width:${mm?Math.round(m/mm*100):0}%"></i></div>${m}/${mm}</div>
 ${K.dark>=10?`<div class="fhB dk">🌑<div class="bar"><i style="width:${K.dark}%"></i></div>${K.dark}</div>`:''}
 <div class="fhC"><span>${EL[K.el][0]} ${EL[K.el][1]}</span>${K.rare?`<span class="k">${RARE[K.rare][0]} ${RARE[K.rare][1]}</span>`:''}${sk?`<span>${sk}</span>`:''}<span>⭐ ${K.rep}</span>${K.clue?`<span class="k">🗝️ ${K.clue}/3</span>`:''}${K.con.some(c=>!c.paid)?'<span>📜 สัญญาค้าง</span>':''}${K.f.dragon?'<span>🐉 มังกรเงิน</span>':''}</div>`}
{const _py=passYear;passYear=function(){if(on()){try{fanYear()}catch(e){console.error('fanYear',e);S.age++;saveGame()}return}return _py.apply(this,arguments)}}
{const _fo=focusOK;focusOK=function(k){if(on())return fList(FN()).some(f=>f[0]===k);if(/^fa_/.test(String(k)))return false;return _fo.apply(this,arguments)}}
{const _af=autoFocus;autoFocus=function(){if(on()){const K=FN(),L=fList(K).map(f=>f[0]);if(S.hp<S.maxHp*.4)S.focus='fa_rest';else if(K.w==='trash'&&K.skL<5&&rnd()<.4)S.focus='fa_sk';else if(school(K)&&rnd()<.5)S.focus='fa_cls';else S.focus=pick(L.filter(x=>x!=='fa_rest'));return}return _af.apply(this,arguments)}}
{const _lm=lifeMax;lifeMax=function(){if(on())return S.mw.end;return _lm.apply(this,arguments)}}
{const _rn=render;render=function(){const r=_rn.apply(this,arguments);try{document.body.classList.toggle('fanW',on());if(!on())return r;fbCss();const K=FN(),fe=$('focus');
 if(fe){const L=fList(K);fe.innerHTML=L.map(f=>`<button class="fc ${S.focus===f[0]?'on':''}" onclick="setFocus('${f[0]}')">${f[1]} ${f[2]}</button>`).join('');if(L.length&&!L.some(f=>f[0]===S.focus))S.focus=L[0][0];
  let h=$('mwHud');if(!h){h=document.createElement('div');h.id='mwHud';fe.parentNode.insertBefore(h,fe)}h.className='fan';{const top=document.querySelector('#game .box.top');if(top&&h.previousElementSibling!==top)top.insertAdjacentElement('afterend',h)}h.innerHTML=hud(K)}
 {const gm=$('gMini');if(gm)gm.innerHTML=`🪙 ${fmt(S.money||0)} เหรียญทอง · 💠 ${Math.round(K.mp)}`}{const gr=$('gRealm');if(gr)gr.textContent=`${WD[K.w].ic} ${WD[K.w].n}`}
 }catch(e){console.error('fan render',e)}return r}}
window.fanStat=function(){const K=FN();if(!K)return;const L=Object.values(K.npc).map(p=>`<div class="item"><b>${E(p.n)}</b> <span class="tag2">${E(p.role)}${p.alive?'':' · ✝️ หายไป/ตาย'}</span><div class="tag2">ความสัมพันธ์ ${p.aff}/100${p.mem.length?' · จำได้ว่า: '+E(p.mem.slice(-1)[0][1]):''}</div></div>`).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📊 ${WD[K.w].ic} ${WD[K.w].n}</h3><p class="tag2">เบาะแสลับ ${K.clue}/3 · ชื่อเสียง ${K.rep} · ความมืด ${K.dark} · อายุขัยราว ${K.endY} ปี</p>${K.con.filter(c=>!c.paid).map(c=>`<div class="item">📜 สัญญาค้าง: ${E(c.t||'ความช่วยเหลือหนึ่งครั้ง')} · ทวงราวอายุ ${c.at}</div>`).join('')}<h4 style="margin:8px 0 4px">ผู้คนที่จำคุณได้</h4>${L}`,'fanstat')};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('[data-fa]')){const d=document.createElement('div');d.style.cssText='grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:8px';d.setAttribute('data-fa',1);
 d.innerHTML=`<button class="opt" onclick="fanStat()">📊 สถานะโลก<small>ผู้คน สัญญา เบาะแส</small></button><button class="opt" onclick="fanEnds()">📜 ฉากจบ<small>ที่ปลดล็อกแล้ว</small></button>`;gd.prepend(d)}}}catch(e){}return r}}
window._fan={FN,WD,ENDS,arcStep,randEv,fanYear,ending};
})();try{wReady('fan')}catch(e){}
