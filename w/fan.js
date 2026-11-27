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
function overcast(K){const over=K.mp<20;if(!over){K.mp-=20;return{ok:1,t:''}}if(rnd()<fxv('over')){K.mp=0;return{ok:1,t:' · 🛡️ ร่างกายรับเวทเกินพิกัดไว้ได้'}}const r=rnd();if(r<.35){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.3));return{ok:1,t:' · 🩸 เวทเกินพิกัด เลือดไหลออกจากตา'}}if(r<.5){K.endY=Math.max(age()+2,(K.endY||70)-3);return{ok:1,t:' · ⏳ เวทเกินพิกัดกินอายุขัย −3 ปี'}}if(r<.6){return{ok:0,t:' · 💥 เวทย้อนกลับเข้าตัว'+hurt(.35)}}return{ok:1,t:' · ⚠️ มานาหมดแต่ยังฝืนได้'}}
const fight=(ep)=>S.power*(1+fxv('fight'))*(.75+rnd()*.5)>=ep;
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
const mgW=(cb,k)=>{let d=0;return sc=>{if(d)return;d=1;const b=fxv(k)+fxv('luck');if(b&&!auto&&sc<1)try{toast(`🌟 ชะตาช่วย ${b>0?'+':''}${Math.round(b*100)}%`)}catch(e){}cb(cl(sc+b,0,1))}};
// 1) วงเวทหมุน: หยุดเข็มในวงสีทอง (3 รอบ)
function mgRing(title,cb){cb=mgW(cb,'ring');if(auto)return cb(autoSc());let round=0,score=0,ang=0,sp=3.2,zone=0,raf=0,done=0;const ZW=46;
 const newZ=()=>{zone=R(30,300);sp=3.2+round*1.1};newZ();
 const draw=()=>{const z=document.getElementById('fmgZ'),n=document.getElementById('fmgN'),r=document.getElementById('fmgRd');if(!z||!n){cancelAnimationFrame(raf);if(!done){done=1;cb(score/3)}return}
  z.style.background=`conic-gradient(transparent ${zone}deg,#ffd37a ${zone}deg ${zone+ZW}deg,transparent ${zone+ZW}deg)`;n.style.transform=`rotate(${ang+180}deg)`;if(r)r.textContent=`รอบ ${round+1}/3 · คะแนน ${score.toFixed(1)}`};
 const loop=()=>{ang=(ang+sp)%360;draw();raf=requestAnimationFrame(loop)};
 window._fmgHit=()=>{if(done)return;const c=zone+ZW/2,d=Math.abs(((ang-c+540)%360)-180);const s=d<ZW*.22?1:d<ZW/2?.7:d<ZW?.3:0;score+=s;try{navigator.vibrate&&navigator.vibrate(s>=.7?25:60)}catch(e){}round++;if(round>=3){done=1;cancelAnimationFrame(raf);closeM();cb(score/3)}else newZ()};
 modal(`<div class="fmg"><h3>🔮 ${title}</h3><div class="tg">แตะ "ร่าย" ตอนเข็มชี้ในวงสีทอง · ยิ่งตรงกลางยิ่งแรง</div><div class="fmgR"><div class="zn" id="fmgZ"></div><div class="nd" id="fmgN"></div><div class="ct">✴️</div></div><div class="tg" id="fmgRd"></div><div class="fmgB"><button onclick="_fmgHit()" style="min-width:180px;font-size:18px">✨ ร่าย</button></div></div>`,'fanmg');loop()}
// 2) จำลำดับรูน
function mgRune(title,len,cb){cb=mgW(cb,'rune');if(auto)return cb(autoSc());const RU=['ᚠ','ᚱ','ᚦ','ᛉ','ᛟ','ᚹ','ᛞ','ᛗ','ᛒ'],seq=[];for(let i=0;i<len;i++)seq.push(R(0,8));let inp=[],lock=1,done=0;
 const btns=()=>[...document.querySelectorAll('#fmgRG button')];
 const show=i=>{if(i>=seq.length){lock=0;const t=document.getElementById('fmgRT');if(t)t.textContent='ตาคุณแล้ว: กดตามลำดับ';return}const b=btns()[seq[i]];if(!b)return;b.classList.add('lit');setTimeout(()=>{b.classList.remove('lit');setTimeout(()=>show(i+1),180)},520)};
 window._fmgRune=k=>{if(lock||done)return;const b=btns()[k];inp.push(k);const ok=seq[inp.length-1]===k;if(b){b.classList.add(ok?'lit':'bad');setTimeout(()=>b.classList.remove('lit','bad'),220)}
  const s=document.getElementById('fmgRS');if(s)s.textContent=inp.map(i=>RU[i]).join(' ');
  if(!ok||inp.length===seq.length){done=1;const sc=ok?1:(inp.length-1)/seq.length;setTimeout(()=>{closeM();cb(sc)},450)}};
 modal(`<div class="fmg"><h3>ᚱ ${title}</h3><div class="tg" id="fmgRT">จำลำดับรูนที่สว่างขึ้น (${len} ตัว)</div><div class="fmgS" id="fmgRS"></div><div class="fmgG" id="fmgRG">${RU.map((r,i)=>`<button onclick="_fmgRune(${i})">${r}</button>`).join('')}</div></div>`,'fanmg');setTimeout(()=>show(0),700)}
// 3) อ่านใจ: เลือกคำพูดให้ตรงอารมณ์อีกฝ่าย (ในงานเลี้ยง / การเจรจา) — 3 รอบ อีกฝ่ายส่งสัญญาณจากท่าทาง
function mgRead(title,who,cb){cb=mgW(cb,'read');if(auto)return cb(autoSc());const MOOD=[['เบื่อ','ขยับแก้วไวน์ไปมา มองไปทางประตู',0],['ระแวง','ยิ้มแต่ตาไม่ยิ้ม ถอยเท้าครึ่งก้าว',1],['สนใจ','โน้มตัวเข้ามา ถามซ้ำคำที่คุณพูด',2],['โกรธ','กำพัดแน่นจนข้อนิ้วขาว',3]];
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
 K.mp=Math.min(K.mpM,K.mp+Math.round(K.mpM*.45));{const inc=fxv('inc'),hl=fxv('heal');if(inc)S.money=Math.max(0,(S.money||0)+Math.round(inc*(1+age()/40)));if(hl>0)heal(hl);else if(hl<0)S.hp=Math.max(1,S.hp+Math.round(S.maxHp*hl))}
 try{doFocus(K)}catch(e){console.error('fan focus',e)}
 if(school(K)&&age()>=13&&K.exY!==age()){K.exY=age();const ey=age()-WD[K.w].a0;queue(()=>evExam(K,ey))}
 for(const L of K.later.slice()){if(L.at<=age()){K.later.splice(K.later.indexOf(L),1);queue(()=>doLater(K,L))}}
 for(const c of K.con.slice()){if(c.at<=age()&&!c.paid){queue(()=>conDue(K,c))}}
 if(age()>=K.arcAt&&!K.end&&K.arcQ!==K.arc+':'+age()){K.arcQ=K.arc+':'+age();const st=K.arc;queue(()=>arcStep(K,st))}
 if(rnd()<.55+fxv('ev')&&!K.end&&QU.length<1)queue(()=>randEv(K));
 if(!S.spouse&&age()>=18&&rnd()<Math.max(.02,.14+fxv('love'))&&QU.length<2)queue(()=>evLove(K));
 if((K.w==='hero'||K.w==='trash')&&rnd()<.08&&!K.f.homeAsk)queue(()=>evHomesick(K));
 sync();try{render()}catch(e){}checkDeath();saveGame();if(QU.length)flush()}

// =================== สอบปลายปี (อะคาเดมี่) ===================
function evExam(K,y0){const y=y0||age()-WD[K.w].a0;if(!school(K))return;if(y>6){K.grad=1;return}
 const mg=K.w==='noble'?(cb=>mgRead('สอบปากเปล่าต่อหน้าคณะกรรมการ','ประธานกรรมการ',cb)):(y%2?(cb=>mgRune(`สอบปลายปีที่ ${y}`,3+Math.min(3,Math.floor(y/2)),cb)):(cb=>mgRing(`สอบปฏิบัติปีที่ ${y}`,cb)));
 C(`📝 สอบปลายปีที่ ${y}`,`${WD[K.w].sc} · คะแนนสะสมปีนี้ ${Math.round(K.yrS)} · อันดับรุ่น ${K.rank}/60${K.f.fail?' · ⚠️ เคยสอบตกแล้ว 1 ครั้ง ตกอีกครั้งโดนไล่ออก':''}`,[
  O('✍️ สอบตามปกติ',()=>mg(sc=>examRes(K,sc,y)),'มินิเกม',.6),
  O('📜 โกงข้อสอบ',()=>{if(rnd()<.55+(S.int|0)/400){examRes(K,.8,y);feed('📜 แอบดูกระดาษคำตอบสำเร็จ'+dark(4))}else{K.yrS-=30;examRes(K,0,y);feed('📜 กระดาษโกงลุกเป็นไฟกลางห้องสอบ ทุกคนหันมามอง'+rep(-3))}},'เสี่ยง',.15)])}
function examRes(K,sc,y0){if(K.grad)return;const y=y0||age()-WD[K.w].a0,tot=sc*60+K.yrS/2+fxv('exam');K.yrS=0;const d=Math.round((tot-40)/4);K.rank=cl(K.rank-d,1,60);
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
   xFin(K,o);C('🌋 ศึกสุดท้ายที่ปราสาทดำ',`กองทัพของราชาอยู่ข้างหลังคุณ ปราสาทของราชาปีศาจอยู่ข้างหน้า · ความมืด ${K.dark} · ชื่อเสียง ${K.rep} · เบาะแสลับ ${K.clue}/3`,o)}],
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
   xFin(K,o);C('🌋 วันที่เมืองหลวงจะล่ม',t,o)}],
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
   xFin(K,o);C('🕯️ คืนที่อธิการบดีสิ้นลม',t,o)}],
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
   xFin(K,o);if(!o.length)o.push(O('🍵 ใช้ชีวิตต่อไป',()=>{K.arcAt=age()+R(4,6);feed('🍵 คุณรับราชการอย่างเงียบๆ อีกหลายปี')},'',.5));
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

// =================== หน้าสุ่มกำเนิด: 500 ชะตาแฟนตาซี ===================
// 11 หมวด รวม 500 อย่าง · ทุกชิ้นมีผลจริงในเกม (fx) · ระดับ 0–6 = สามัญ หายาก วิเศษ มหากาพย์ ตำนาน เทพนิยาย ต้องห้าม
const TN=['สามัญ','หายาก','วิเศษ','มหากาพย์','ตำนาน','เทพนิยาย','ต้องห้าม'],TW=[100,45,20,9,4,1.4,.4],RVT=[0,1,1,2,3,4,4];
const pl=s=>s.trim().split('\n').map(l=>{const a=l.trim().split('|');return{ic:a[0],n:a[1],d:a[2]||'',t:+a[3]||0,fx:(a[4]||'').trim()}});
const BD={
org_iso:pl(`🎒|นักเรียน ม.5 ห้องท้าย|นั่งริมหน้าต่าง หลับทุกคาบ|0|cha:2
📚|ที่หนึ่งของสายชั้น|จำสูตรได้ทุกตัว แต่ไม่เคยวิ่งเกินร้อยเมตร|1|int:8 hp:-10
⚽|นักกีฬาโรงเรียน|ขาแข็งแรงกว่าใครในห้อง|1|hp:25 pow:4
🎮|เกมเมอร์ติดแรงก์|รู้จักคำว่าสเตตัส สกิล คูลดาวน์ ก่อนใครในห้อง|1|ring:.08 rune:.05
🍳|ลูกเจ้าของร้านข้าวมันไก่|ทำกับข้าวเป็นตั้งแต่ ป.4|0|inc:10 cha:2
🎸|มือกีตาร์วงโรงเรียน|มือไม่สั่นเวลามีคนดู|0|read:.06 cha:3
🩹|อาสาห้องพยาบาล|เคยเห็นเลือดมามากกว่าเพื่อนร่วมห้อง|1|heal:.04
🗞️|ประธานนักเรียน|คนในห้องฟังคุณ อย่างน้อยก็ในโลกเดิม|2|rep:6 read:.08
🌙|เด็กนอนดึกอ่านนิยายต่างโลก|รู้พล็อตแบบนี้หมดแล้ว หรือคิดว่ารู้|2|int:4 ev:.08
🕯️|คนที่ควรตายเมื่อวาน|รถบรรทุกเบรกไม่ทันเมื่อวาน แต่คุณยังยืนอยู่|4|save:1 dark:5`),
org_magic:pl(`🌾|ลูกชาวนาที่เวทตื่นตอนแปดขวบ|ข้าวในนาโตเร็วผิดปกติตั้งแต่คุณเกิด|0|hp:15
⚖️|ลูกพ่อค้าเครื่องเวท|รู้ราคาของทุกอย่าง และรู้ว่าอะไรปลอม|0|gold:250
🧙|หลานแม่มดป่า|วิทยาลัยไม่ชอบหน้าครอบครัวคุณ|1|mp:20 rep:-3
🏰|ลูกตระกูลจอมเวทเก่าแก่|ชื่อสกุลเปิดทุกประตู ยกเว้นประตูที่คุณอยากเข้า|1|mp:10 rep:5 gold:150
⚓|ลูกกะลาสีเรือ|โตมากับพายุ เสียงฟ้าร้องไม่เคยทำให้คุณสะดุ้ง|0|pow:3 hp:10
📖|ลูกบรรณารักษ์หอสมุดหลวง|อ่านหนังสือต้องห้ามตั้งแต่ยังไม่รู้ว่ามันต้องห้าม|2|int:8 rune:.08
⛪|เด็กกำพร้าจากโบสถ์|ไม่มีอะไรจะเสีย และนั่นทำให้น่ากลัว|1|dark:3 fight:.05
🔥|รอดจากไฟไหม้หมู่บ้าน|ไฟไม่เคยแตะผิวคุณ ทั้งที่บ้านทุกหลังมอดไหม้|3|over:.3 dark:4
🦉|ถูกนกฮูกสามตาเลือกตั้งแต่เกิด|จดหมายตอบรับมาถึงก่อนคุณเกิดสามวัน|3|mp:25 ev:.05
👤|ไม่มีบันทึกการเกิด|ไม่มีใครรู้ว่าคุณเป็นลูกใคร รวมถึงตัวคุณเอง|4|clue:1 dark:6`),
org_noble:pl(`📜|เด็กทุนที่สอบได้ที่หนึ่งของแคว้น|คนเดียวในสถาบันที่สอบเข้ามาเอง|0|int:6 exam:4
🗡️|ลูกนอกสมรสของดยุก|ดยุกไม่ยอมรับ แต่จ่ายค่าเทอมให้เงียบๆ|1|dark:5 gold:200
💰|ลูกพ่อค้าที่ซื้อบรรดาศักดิ์มา|รวยกว่าครึ่งห้อง แต่ทุกคนรู้ว่าเงินซื้อมา|0|gold:500 rep:-3
🛡️|ลูกอัศวินชายแดน|ถือดาบก่อนถือส้อม|1|pow:6 fight:.06
🌹|ลูกนางกำนัลในวัง|รู้ข่าวลือในวังก่อนข่าวจริง|1|read:.1 cha:4
🎻|ลูกนักดนตรีราชสำนัก|ได้ยินจังหวะในทุกบทสนทนา|0|read:.06
🏚️|ลูกขุนนางตระกูลล่มสลาย|ชื่อสกุลยังอยู่ แต่บ้านถูกยึด|1|rep:4 gold:-100 dark:3
🐎|ลูกคนเลี้ยงม้าหลวง|เดินเข้าคอกม้าองค์ชายได้ทุกวัน|0|cha:3 love:.05
⛓️|ตัวประกันจากแคว้นศัตรู|ถูกส่งมาเป็นนักเรียน เพื่อให้พ่อไม่กล้าบุก|3|dark:6 read:.12 rep:-4
👑|ทายาทราชวงศ์ที่ถูกลืม|ในห้องเก็บเอกสาร มีชื่อคุณอยู่ในลำดับสืบราชสมบัติ|5|clue:1 rep:8`),
race:pl(`🧑|มนุษย์|ธรรมดาที่สุด และปรับตัวเก่งที่สุด|0|exam:2 luck:.01
🧝|เอลฟ์ป่า|หูยาว ได้ยินเสียงต้นไม้|1|life:25 rune:.05 hp:-10
🧝‍♀️|เอลฟ์ผมเงิน|อายุยืน แต่มนุษย์บางเมืองไม่ต้อนรับ|2|life:40 mp:10 rep:-3
⛏️|คนแคระ|เตี้ย แข็ง และเกลียดการถูกเรียกว่าเตี้ย|1|hp:30 pow:4 life:15
🐺|มนุษย์หมาป่า|คืนจันทร์เต็มดวงคุณหิวผิดปกติ|2|pow:8 fight:.08 cha:-3
🐱|เผ่าหูแมว|ตกจากที่สูงแล้วยืนได้ทุกครั้ง|1|ring:.08 cha:3
🐉|ดราโคเนียน|เกล็ดบนแขนอุ่นเหมือนถ่านไฟ|3|pow:10 hp:20 over:.15
😈|ครึ่งปีศาจ|เขาเล็กๆ ซ่อนอยู่ใต้ผม|3|mp:20 dark:10 cha:-4
👼|ครึ่งเทวดา|มีขนนกสีขาวร่วงจากหลังทุกเช้า|3|heal:.05 rep:5 life:10
🌿|ดรายแอด|ผิวมีลายใบไม้ อยู่ห่างป่านานไม่ได้|2|heal:.06 life:20 pow:-3
🐟|เงือกบนบก|หายใจในน้ำได้ ขาเจ็บถ้าเดินนาน|2|mp:15 hp:-10 cha:5
🦴|ผู้ฟื้นจากความตาย|หัวใจเต้นนาทีละสามครั้ง|4|save:1 life:-10 dark:8
🍄|ฮาล์ฟลิง|ตัวเล็กจนคนลืมว่าคุณอยู่ในห้อง|1|read:.08 luck:.03
🗿|โกเลมที่มีวิญญาณ|ไม่ต้องกินข้าว ไม่ต้องนอน แต่ฝันได้|4|hp:60 pow:8 cha:-6 love:-.1
🦇|แวมไพร์สายเลือดจาง|แดดทำให้ปวดหัว เลือดทำให้ปวดใจ|3|life:30 dark:8 fight:.06
🌫️|ร่างโปร่งแสง|แสงทะลุตัวคุณได้ครึ่งหนึ่ง|3|mp:25 hp:-20 read:.08
🦎|ซาลาแมนเดอร์ร่างคน|ผมติดไฟเวลาโกรธ|2|pow:6 over:.2
❄️|ลูกหลานยักษ์น้ำแข็ง|ตัวสูงกว่าประตูทุกบานในเมือง|2|hp:40 pow:6 cha:-2
🌠|เผ่าดาวตก|เกิดจากหลุมอุกกาบาต ตาเรืองแสงในที่มืด|5|mp:30 luck:.05 ev:.06
⚫|ไร้เผ่าพันธุ์|ไม่มีเครื่องมือวิเศษอันไหนอ่านเผ่าพันธุ์คุณออก|6|clue:1 luck:.06 dark:5`),
el:pl(`🔥|ไฟ|เวทโจมตีแรงที่สุดในหกธาตุ|0|pow:3 el:fire
💧|น้ำ|เวทรักษาและเปลี่ยนรูป|0|heal:.03 el:water
🌪️|ลม|เร็วที่สุด แต่เบาที่สุด|0|ring:.05 el:wind
🪨|ดิน|ช้าแต่ไม่เคยแตก|0|hp:20 el:earth
✨|แสง|โบสถ์อยากได้ตัวคุณ|1|rep:4 heal:.02 el:light
🌑|เงา|ทุกคนระวังคุณ ทั้งที่คุณยังไม่ได้ทำอะไร|1|dark:5 read:.05 el:shadow
⏳|เวลา|ย้อนจังหวะได้ครั้งละไม่กี่วินาที แต่อายุขัยหายทุกครั้งที่ใช้|4|rune:.08 el:time
🌀|มิติ|พับระยะทาง เปิดประตูไปที่ที่เคยเห็น|4|luck:.04 el:space
💀|ความตาย|ได้ยินเสียงคนตาย และคนตายได้ยินคุณ|4|dark:6 mp:10 el:death
🌙|แสงจันทร์|เวทแรงขึ้นตอนกลางคืน มีคนรู้จักธาตุนี้ไม่ถึงสิบคน|5|mp:20 read:.08 el:moon
🩸|เลือด|ร่ายด้วยเลือดตัวเองแทนมานา|5|over:.5 pow:8 dark:6 el:blood
🕳️|ความว่างเปล่า|ลบทุกอย่างที่แตะได้ รวมถึงความทรงจำของตัวเอง|6|pow:12 clue:1 dark:8 el:void`),
mana:pl(`💧|หยดน้ำ|มานาน้อยกว่าคนทั่วไป ต้องร่ายอย่างประหยัด|0|mp:-10
🫗|ลำธาร|มานาเท่าคนทั่วไป|0|mp:0
🪣|บ่อน้ำ|มากกว่าคนทั่วไปนิดหน่อย|1|mp:10
🛶|แม่น้ำ|ร่ายได้ทั้งวันโดยไม่เหนื่อย|2|mp:20
🏞️|ทะเลสาบ|อาจารย์หันมามองตอนวัดมานา|3|mp:35
🌊|ทะเลลึก|เครื่องวัดมานาสั่นจนเข็มหัก|4|mp:55 over:.1
🌌|มหาสมุทร|มานาล้นจนรั่วออกมาเป็นแสงตอนหลับ|5|mp:80 over:.2
🕳️|มหาสมุทรไร้ก้น|ไม่มีเครื่องวัดไหนวัดได้ และร่างกายแบกรับมันไม่ไหวตลอดไป|6|mp:120 over:.3 life:-5`),
omen:pl(`☁️|ไม่มีลางอะไร|เกิดมาเงียบๆ เหมือนเด็กทั่วไป|0|
🌧️|ฝนตกทั้งคืน|ชาวบ้านบอกว่าฟ้าร้องไห้แทนแม่|0|heal:.01
🐓|ไก่ขันตอนเที่ยงคืน|คนเฒ่าคนแก่ส่ายหัว|0|luck:-.02 ev:.04
🌈|รุ้งสองชั้นเหนือบ้าน|วันนั้นทั้งหมู่บ้านได้ปลามากผิดปกติ|1|luck:.03
🕯️|เทียนทุกเล่มดับพร้อมกัน|นักบวชหน้าซีด|2|dark:4 ev:.06
🌠|ดาวตกสองดวงในคืนที่เกิด|ดวงหนึ่งตกทางเหนือ อีกดวงไม่เคยตกถึงพื้น|3|luck:.05 mp:10
🦉|นกฮูกสามตาเกาะหน้าต่าง|มันมองคุณสามวัน แล้วบินไปทางวิทยาลัย|2|rune:.08
🐍|งูขาวขดอยู่ในเปล|มันไม่กัด แค่เฝ้า|2|over:.1 read:.04
🔔|ระฆังวัดดังเองเก้าครั้ง|ไม่มีใครดึงเชือก|3|rep:5 ev:.05
🌑|สุริยุปราคากลางวัน|ฟ้ามืดสามนาทีตอนคุณร้องไห้ครั้งแรก|4|dark:8 mp:20
🌸|ดอกไม้บานกลางฤดูหนาว|ต้นไม้หน้าบ้านออกดอกทั้งที่หิมะตก|2|heal:.03 cha:3
🐦‍⬛|อีกาเกาะหลังคาร้อยตัว|ไม่มีตัวไหนส่งเสียง|2|dark:5 read:.06
💧|บ่อน้ำในหมู่บ้านเอ่อล้น|น้ำเค็มเหมือนน้ำตา|1|mp:8
🔥|ไฟในเตาไม่ยอมดับเจ็ดวัน|ไม่มีใครเติมฟืน|2|pow:4 over:.1
🌕|จันทร์สีเลือด|หมาทั้งเมืองหอนพร้อมกัน|3|fight:.06 dark:5
🦋|ผีเสื้อสีทองเต็มห้องคลอด|หมอตำแยบอกว่าไม่เคยเห็นมาสี่สิบปี|3|luck:.04 cha:4
🗡️|ดาบประจำตระกูลหักเอง|พ่อเก็บเศษดาบไว้ใต้หมอนคุณ|2|fight:.05 dark:3
🌬️|ลมพัดย้อนทิศทั้งวัน|ใบไม้ปลิวกลับขึ้นต้น|2|ring:.06
🐈‍⬛|แมวดำนอนขวางประตู|มันไม่ยอมให้หมอตำแยเข้าจนคุณเกิด|1|luck:.02 read:.03
⭐|ดาวดวงใหม่บนฟ้า|นักดาราศาสตร์หลวงตั้งชื่อดาวตามวันเกิดคุณ|4|rep:8 luck:.04
📜|ชื่อคุณอยู่ในคำทำนายเก่า|แต่หน้าถัดไปถูกฉีกหาย|4|clue:1
🪞|กระจกทุกบานในบ้านร้าว|เป็นรอยร้าวรูปเดียวกันทุกบาน|3|dark:5 read:.05
🐺|หมาป่ามาวางกระต่ายหน้าบ้าน|เหมือนของขวัญ|2|fight:.04 hp:10
🌋|ภูเขาไฟทางใต้ตื่น|แล้วหลับลงตอนคุณหยุดร้องไห้|4|pow:8 over:.15
❄️|หิมะตกกลางฤดูร้อน|ตกแค่ในสวนหลังบ้าน|2|mp:8 hp:5
🎐|เสียงกระดิ่งที่ไม่มีใครแขวน|ดังทุกครั้งที่คุณใกล้อันตราย|3|ring:.05 read:.05
🐢|เต่าอายุร้อยปีคลานเข้าบ้าน|นอนข้างเปลจนคุณหัดเดิน|2|life:8
🍂|ใบไม้ร่วงหมดในคืนเดียว|ทั้งที่เป็นฤดูใบไม้ผลิ|1|dark:2 ev:.03
🏹|นักล่าหลงทางมาขอพัก|เขาทิ้งลูกธนูไว้หนึ่งดอก|1|fight:.04
👁️|ดวงตาบนท้องฟ้า|มีคนเห็นเมฆเป็นรูปตาเพียงครึ่งนาที|5|clue:1 luck:.05
🌊|น้ำลงจนเห็นซากเมืองใต้ทะเล|แค่หนึ่งชั่วโมง|4|rune:.1 ev:.04
🕸️|ใยแมงมุมเป็นรูปวงเวท|ไม่มีใครกล้ากวาด|3|rune:.08 mp:8
🍞|ขนมปังในครัวขึ้นราเป็นตัวอักษร|แม่โยนทิ้งก่อนใครจะอ่านออก|2|ev:.05 int:3
🐴|ม้าขาวไร้เจ้าของยืนหน้าบ้าน|รุ่งเช้าหายไป เหลือรอยเกือกทองคำ|3|gold:200 luck:.03
🎵|มีคนร้องเพลงกล่อมจากในกำแพง|แม่ไม่ได้ร้อง|3|dark:4 read:.06
⚡|ฟ้าผ่าต้นไม้หน้าบ้านเป็นสองซีก|ซีกหนึ่งตาย อีกซีกออกผลทุกปี|3|pow:5 luck:.03
🧊|น้ำในแก้วแข็งตัวทุกครั้งที่คุณร้องไห้|ตอนนี้ยังเป็นอยู่บ้าง|2|mp:10
🌫️|หมอกล้อมบ้านสามวัน|ทหารที่ตามหาเด็กเกิดใหม่หาบ้านคุณไม่เจอ|4|save:1 dark:4
🔮|ลูกแก้วทุกลูกในเมืองขุ่นมัว|หมอดูทั้งเมืองปิดร้านหนึ่งสัปดาห์|5|clue:1 rune:.08 ev:.06
☄️|ไม่มีใครจำวันเกิดคุณได้|เหมือนวันนั้นถูกลบออกจากปฏิทิน|6|clue:1 luck:.08 dark:6`),
tal:pl(`👂|หูไว|ได้ยินเสียงกระซิบข้ามห้อง|0|read:.04
✋|มือนิ่ง|ถือแก้วน้ำเต็มขึ้นบันไดได้ไม่หก|0|ring:.05
🧠|ความจำดีเรื่องไร้สาระ|จำชื่อแมวทุกตัวในเมืองได้|0|rune:.04
🏃|วิ่งเร็ว|หนีเก่งกว่าสู้|0|hp:8
💪|แรงเยอะ|แบกกระสอบข้าวสองกระสอบได้สบาย|0|pow:3
😴|หลับง่าย|หลับได้ทุกที่ แม้ในคุก|0|heal:.02
🍲|กินเก่ง|กินได้เท่าทหารสองคน|0|hp:10
🗣️|พูดเก่ง|ขายหวีให้คนหัวล้านได้|0|cha:4
📏|ละเอียด|เห็นตัวสะกดผิดในป้ายทุกป้าย|0|exam:3
🎯|ปาแม่น|ปาหินโดนนกตั้งแต่ห้าขวบ|0|ring:.04 fight:.02
🧭|ไม่หลงทาง|รู้ทิศเหนือแม้อยู่ในถ้ำ|0|rune:.03
🌡️|ทนหนาว|ใส่เสื้อตัวเดียวกลางหิมะ|0|hp:8
☀️|ทนร้อน|ยืนกลางแดดเที่ยงได้ทั้งวัน|0|hp:8
🐕|สัตว์ชอบ|หมาแมวเดินตามคุณกลับบ้าน|0|cha:2 luck:.01
💸|ต่อราคาเก่ง|ไม่เคยจ่ายราคาเต็ม|0|inc:8
🧹|มือเป็นระเบียบ|ห้องคุณสะอาดที่สุดในหอ|0|exam:2
🎨|วาดรูปเก่ง|วาดวงเวทได้ตรงกว่าใช้วงเวียน|0|rune:.04
🎶|เสียงดี|ร้องเพลงแล้วเด็กหยุดร้อง|0|cha:3
🫖|ใจเย็น|ไม่เคยโกรธใครเกินสามนาที|0|dark:-3
🤥|โกหกหน้าตาย|หน้าไม่เปลี่ยนสีแม้แต่นิดเดียว|0|read:.05 dark:2
📖|อ่านเร็ว|อ่านหนังสือหนึ่งเล่มจบในคืนเดียว|0|int:4
🧵|มือประณีต|เย็บแผลตัวเองได้|0|heal:.02
👃|จมูกไว|ได้กลิ่นยาพิษในไวน์|0|read:.03
🪙|เก็บเงินเก่ง|มีเหรียญซ่อนไว้ในรองเท้าเสมอ|0|gold:80
🕰️|ตรงเวลา|ไม่เคยสายแม้แต่นาทีเดียว|0|exam:2 rep:1
🌿|รู้จักสมุนไพร|แยกเห็ดพิษกับเห็ดกินได้|0|heal:.02
🤹|คล่องแคล่ว|รับของที่ตกได้ก่อนถึงพื้น|0|ring:.04
🙃|ตลก|ทำให้คนหัวเราะได้แม้ในงานศพ|0|cha:3 read:.02
🔧|ซ่อมของเป็น|ซ่อมเกวียนพังได้ด้วยเชือกกับไม้|0|inc:6
🧗|ปีนเก่ง|ปีนกำแพงวังได้ในสามนาที|0|hp:6 luck:.01
🥊|ทนมือ|โดนชกแล้วยังยิ้ม|0|hp:12
🐎|ขี่ม้าเป็น|ม้าพยศยังยอมให้ขี่|0|fight:.02
🗝️|สะเดาะกุญแจเป็น|กิ๊บติดผมหนึ่งอันก็พอ|0|luck:.02 dark:1
🧾|คิดเลขเร็ว|บวกเลขสามหลักในหัวได้ทันที|0|int:3
👀|สายตาดี|มองเห็นเรือก่อนคนอื่นสิบนาที|0|ring:.03
🤝|จับมือแน่น|คนจำคุณได้จากการจับมือ|0|cha:2 rep:1
🌃|ตื่นกลางคืน|ยิ่งดึกยิ่งตาสว่าง|0|mp:5
🪶|เดินเบา|เดินบนพื้นไม้เก่าไม่มีเสียง|0|read:.03
🍀|โชคเล็กๆ|เจอเหรียญบนถนนบ่อยกว่าคนอื่น|0|luck:.02
🦺|ระวังตัว|นั่งหันหลังชนกำแพงเสมอ|0|hp:5 read:.02
🦅|ตาเหยี่ยว|เป้าทองในวงเวทกว้างขึ้นสำหรับคุณ|1|ring:.1
👅|ลิ้นเงิน|รู้ว่าคำไหนที่อีกฝ่ายอยากได้ยิน|1|read:.1
📸|ความจำภาพถ่าย|เห็นครั้งเดียวจำได้ทั้งหน้า|1|rune:.1
🔥|ร่างร้อนแรง|เวทธาตุไฟติดง่ายในมือคุณ|1|pow:5 over:.05
💧|ใจนิ่งดั่งน้ำ|มานาฟื้นเร็วกว่าคนอื่น|1|mp:12
🐾|ภาษาสัตว์|เข้าใจเสียงหมาแมวนกได้ครึ่งหนึ่ง|1|ev:.05 luck:.02
⚔️|ดาบพรสวรรค์|จับดาบครั้งแรกเหมือนจับมาสิบปี|1|fight:.08 pow:3
🛡️|ผิวหนา|แผลหายเร็วกว่าคนทั่วไปสองเท่า|1|heal:.04 hp:10
📚|เรียนรู้ไว|ทำข้อสอบเหมือนเคยเห็นมาก่อน|1|exam:6 int:3
💃|เต้นรำเก่ง|ทุกงานเลี้ยงมีคนรอเต้นกับคุณ|1|cha:6 love:.05
🗡️|มือไวในที่มืด|ล้วงกระเป๋าได้โดยเจ้าของไม่รู้ตัว|1|inc:15 dark:3
🧪|จมูกนักปรุงยา|ได้กลิ่นส่วนผสมผิดก่อนหม้อระเบิด|1|exam:4
🌬️|ร่ายเร็ว|ร่ายคาถาสั้นลงครึ่งหนึ่ง|1|ring:.06 mp:5
🎭|นักแสดง|เปลี่ยนบุคลิกได้ในหนึ่งลมหายใจ|1|read:.08 cha:3
🏹|ยิงธนูแม่น|ลูกธนูคุณไม่เคยตกพื้นเปล่า|1|fight:.06 ring:.04
🍷|คอแข็ง|ดื่มทั้งคืนแล้วยังจำได้ว่าใครพูดอะไร|1|read:.06
⛰️|อึด|เดินทางสามวันไม่พักได้|1|hp:20
🧘|สมาธิสูง|ไม่มีเสียงไหนทำให้วงเวทคุณเพี้ยน|1|rune:.06 over:.1
💎|ตาประเมินราคา|รู้ว่าของชิ้นไหนแพงกว่าที่คนขายคิด|1|inc:18
🕵️|สังเกตเก่ง|รู้ว่าใครโกหกจากการกะพริบตา|1|read:.08
🌱|นิ้วเขียว|ต้นไม้ที่คุณปลูกไม่เคยตาย|1|heal:.03 inc:6
🐴|ผู้ขี่สัตว์|สัตว์ทุกชนิดยอมให้ขี่|1|fight:.04 luck:.02
✍️|ลายมือสวย|จดหมายของคุณทำให้คนอยากตอบ|1|cha:4 rep:2
🧊|เลือดเย็น|ตัดสินใจเร็วในวินาทีอันตราย|1|ring:.05 dark:1
🎲|นักพนันโชคดี|ไพ่ดีมักมาหาคุณตอนเดิมพันสูง|1|luck:.04 dark:2
🔨|ช่างตีเหล็ก|ตีดาบเองได้ ขายได้ราคา|1|inc:15 pow:2
🫀|ใจถึง|ไม่เคยถอยในการต่อสู้|1|fight:.07 hp:5
🕯️|ทนมืด|มองเห็นในที่มืดได้นิดหน่อย|1|read:.04 hp:5
🎓|ศิษย์ที่ครูรัก|อาจารย์ทุกคนจำชื่อคุณได้วันแรก|1|exam:5 rep:2
📯|เสียงดังกังวาน|ตะโกนครั้งเดียวคนทั้งลานหยุดฟัง|1|rep:3 cha:2
🐍|ทนพิษ|โดนงูกัดแล้วแค่ปวดหัว|1|hp:10 heal:.02
⚗️|มือปรุงยา|ยาที่คุณต้มได้ผลดีกว่าตำรา|1|heal:.03 inc:8
🌟|ดวงดี|เรื่องร้ายมักพลาดคุณไปนิดเดียว|1|luck:.04
🧲|ดึงดูดเรื่องแปลก|เหตุการณ์ประหลาดหาคุณเจอเสมอ|1|ev:.1
🤺|ฟันดาบตามธรรมเนียม|รู้ท่าดวลของขุนนางทุกตระกูล|1|fight:.05 rep:2
🫲|ร่ายสองมือ|ร่ายเวทสองบทพร้อมกันได้|2|pow:6 mp:10
🍺|ไม่เมาเวท|ร่ายเกินพิกัดแล้วไม่ค่อยเป็นอะไร|2|over:.4
🗺️|แผนที่ในหัว|ไม่เคยหลงในเขาวงกต|2|rune:.12
🌊|ร่างรับมานา|ยิ่งใช้เวท มานายิ่งขยาย|2|mp:25
💬|พูดได้ทุกภาษา|แม้ภาษาที่ตายไปแล้ว|2|read:.1 rune:.05
🐦|ผู้ส่งสาร|นกทุกตัวยอมส่งจดหมายให้คุณ|2|ev:.06 rep:3
🛐|ที่รักของเทพ|คำอธิษฐานของคุณได้ผลบ่อยผิดปกติ|2|heal:.04 luck:.04
🦁|ออร่าผู้นำ|คนทำตามคำสั่งคุณโดยไม่ทันคิด|2|rep:6 cha:5
🌀|ก้าวเงา|หายตัวไปในเงาได้ครู่หนึ่ง|2|read:.06 fight:.04 luck:.02
🔎|เห็นจุดอ่อน|มองแวบเดียวรู้ว่าศัตรูเจ็บตรงไหน|2|fight:.1
🎻|บทเพลงเวท|ดนตรีของคุณสงบใจคนได้|2|read:.08 heal:.02
🔮|ฝันเห็นล่วงหน้า|ฝันบางคืนเป็นจริงในอีกเจ็ดวัน|2|luck:.04 ev:.05
💰|มือทอง|ทุกกิจการที่คุณแตะได้กำไร|2|inc:30
📐|อัจฉริยะวงเวท|วาดวงเวทซับซ้อนได้ด้วยมือเปล่า|2|rune:.1 exam:4
🧟|ฟื้นตัวไว|บาดแผลหนักหายในไม่กี่วัน|2|heal:.07
😇|หน้าตาไว้ใจได้|คนแปลกหน้าเล่าความลับให้คุณฟัง|2|read:.08 cha:4
🪓|ตัดผ่านเวท|ดาบของคุณฟันม่านเวทขาด|2|fight:.08 pow:4
🌹|เสน่ห์อันตราย|คนที่ตกหลุมรักคุณไม่เคยลืม|2|love:.12 cha:6
🐲|เลือดมังกรเจือจาง|ตอนโกรธตาคุณเป็นสีทอง|2|pow:8 hp:15
🏛️|นักการเมืองโดยกำเนิด|รู้ว่าใครจะชนะก่อนการเลือกข้าง|2|read:.1 rep:3
⏱️|นาฬิกาในใจ|รู้เวลาทุกวินาทีโดยไม่ต้องดู|2|ring:.12
🧿|ตาที่สาม|เห็นเวทที่คนอื่นซ่อนไว้|2|rune:.08 read:.03
🗃️|ห้องสมุดเดินได้|จำเนื้อหาหนังสือได้ทุกเล่มที่เคยอ่าน|2|int:10 exam:4
🍄|ภูมิต้านทานยาพิษ|ยาพิษแค่ทำให้คุณจาม|2|save:1
🌑|เงาเชื่อฟัง|เงาของคุณทำงานบางอย่างแทนได้|2|dark:5 inc:12 read:.04
🔗|ผู้ผูกพันธะ|ทำสัญญากับวิญญาณได้เงื่อนไขดีกว่าคนอื่น|2|read:.08 luck:.03
🐺|สัญชาตญาณนักล่า|รู้ว่ามีคนตามก่อนจะได้ยินเสียง|2|fight:.06 read:.04
🏰|นักวางกลยุทธ์|เห็นสามตาเดินล่วงหน้าเสมอ|2|read:.06 rune:.06
⚡|สายฟ้าในเลือด|ร่ายเร็วจนคนตามไม่ทัน|2|ring:.08 pow:4
🕊️|ผู้รักษาสันติ|ทะเลาะวิวาทหยุดได้เมื่อคุณพูด|2|cha:5 dark:-5
📜|อ่านรูนโบราณโดยไม่ได้เรียน|ตัวอักษรเรียงตัวให้คุณอ่านเอง|3|rune:.15 ev:.03
💀|รอดตายครั้งแรกเสมอ|ความตายพลาดคุณครั้งแรกทุกครั้ง|3|save:1 hp:10
🧭|ดาวนำทาง|มีแสงบอกทางเมื่อคุณหลงทางในชีวิต|3|luck:.06 ev:.05
⚒️|หัวใจเตาหลอม|ร่ายเกินพิกัดได้แทบไม่มีราคา|3|over:.6 pow:5
🧬|ร่างกายปรับตัว|ทุกบาดแผลทำให้แข็งแรงขึ้น|3|hp:30 heal:.04
🎭|ร้อยหน้ากาก|ไม่มีใครจำหน้าจริงของคุณได้|3|read:.12 dark:4
👑|ราศีกษัตริย์|คนแปลกหน้าโค้งให้คุณโดยไม่รู้ตัว|3|rep:10 cha:6
👜|ประตูกระเป๋า|เก็บของในช่องว่างมิติเล็กๆ ได้|3|inc:25 luck:.03
🐉|ผู้คุยกับมังกร|มังกรไม่กินคุณ อย่างน้อยก็ไม่ใช่ทันที|3|ev:.06 fight:.05 luck:.02
⚖️|ตาชั่งความจริง|รู้ทันทีเมื่อมีคนโกหก|3|read:.15
🧠|สองความคิด|คิดสองเรื่องพร้อมกันได้จริง|3|rune:.08 ring:.08
🥋|ศิลปะการต่อสู้ลืมชื่อ|ร่างกายจำท่าที่คุณไม่เคยเรียน|3|fight:.12 pow:6
🌙|ลูกของรัตติกาล|ทุกอย่างดีขึ้นในตอนกลางคืน|3|mp:15 read:.06 dark:3
💠|แกนมานาคู่|มีแหล่งมานาสองแห่งในตัว|3|mp:40
🎓|อัจฉริยะแห่งรุ่น|สอบได้ที่หนึ่งโดยไม่ต้องอ่าน|3|exam:10 int:8
🫂|ผู้ปลอบใจ|ทุกคนที่อยู่ใกล้คุณบาดแผลหายเร็ว|3|heal:.06 cha:4
🔑|กุญแจผี|ประตูที่ล็อกด้วยเวทเปิดให้คุณ|3|luck:.05 rune:.06
🐾|เจ้าแห่งสัตว์ป่า|ฝูงหมาป่าเดินตามคุณ|3|fight:.08 ev:.04
💰|ทองไหลมาเทมา|เงินหาคุณเจอเสมอ|3|inc:45 gold:200
🕰️|จังหวะสมบูรณ์|เวลาของคุณไม่เคยพลาด|3|ring:.18
🏛️|ห้องสมุดในหัว|เห็นคำตอบข้อสอบหนึ่งข้อทุกปี|4|exam:15 rune:.1
👻|โชคของคนถูกลืม|ศัตรูลืมว่าคุณอยู่ในห้อง|4|save:1 luck:.06
🧶|เห็นเส้นด้ายชะตา|บอกได้ว่าตัวเลือกไหนพาไปสู่ความตาย|4|save:1 read:.1 ring:.05
💫|ผู้ถูกเลือกโดยดวงดาว|ดาวตกทุกดวงตกใกล้คุณ|4|luck:.08 mp:20
⚔️|ร่างจุติของวีรชน|ฝีมือของผู้กล้าเมื่อพันปีก่อนอยู่ในตัวคุณ|4|fight:.15 pow:12
🔮|ตามองอนาคต|เห็นภาพอนาคตสามวินาทีล่วงหน้า|4|ring:.15 read:.08
🩸|เลือดเทพโบราณ|เลือดของคุณรักษาคนอื่นได้|4|heal:.1 life:15
🌌|ทะเลมานาส่วนตัว|มานาของคุณไม่เคยหมด|4|mp:60 over:.3
🕊️|พรแห่งชีวิต|อายุขัยยาวกว่าที่ควรเป็น|4|life:25 heal:.04
❤️‍🔥|หัวใจมังกร|ไฟมังกรอบอุ่นอยู่ในอก|4|pow:15 hp:40
🚪|ก้าวข้ามระยะ|ก้าวเดียวไปถึงที่ไกลได้ วันละครั้ง|4|save:1 luck:.05
📖|ผู้จดบันทึกโลก|ทุกอย่างที่เกิดขึ้นถูกจดลงในหัวคุณเอง|4|clue:1 int:10
🎖️|เกียรติยศติดตัว|คนทั้งแผ่นดินรู้ชื่อคุณก่อนพบหน้า|4|rep:20 cha:8
🪡|ผู้ทอชะตา|ดึงเส้นชะตาคนอื่นได้นิดหน่อย|5|luck:.1 read:.12 clue:1
⏳|ย้อนสามวินาที|ย้อนเวลาได้วันละครั้ง|5|save:2 ring:.12
🌑|เงาของเทพที่ตายแล้ว|เทพองค์หนึ่งยังอาศัยอยู่ในเงาคุณ|5|pow:15 mp:30 dark:10
👁️|ตาเห็นความจริง|มองทะลุภาพลวงทุกชนิด|5|read:.2 rune:.12
💎|วิญญาณผลึก|ร่างกายเป็นผลึกเวทครึ่งหนึ่ง|5|mp:50 hp:30 over:.4
🏹|ลูกศรที่ไม่พลาด|สิ่งที่คุณเล็ง จะโดนเสมอ|5|fight:.2 ring:.15
📯|เสียงเรียกวีรชน|ยามคับขัน วิญญาณวีรชนมาช่วย|5|save:2 fight:.08
🌍|ความรักของโลก|ต้นไม้ สัตว์ และลมเข้าข้างคุณ|5|luck:.1 heal:.06 cha:6
🌀|ผู้ถูกเลือกโดยวงเวทอัญเชิญ|เกิดมาพร้อมความจำจากรอบก่อน|6|clue:1 luck:.08 save:1
♾️|ไม่มีจุดจบที่ถูกเขียนไว้|ไม่มีคำทำนายไหนพูดถึงคุณ|6|clue:1 life:20 luck:.1
🕳️|กลืนสกิล|ทุกคนที่คุณฆ่า ทิ้งพรสวรรค์ไว้ให้คุณ|6|pow:20 fight:.15 dark:12
👑|ผู้สืบทอดจอมราชันย์แรก|ทุกอาวุธเวทในโลกจำชื่อคุณได้|6|pow:18 rep:20 mp:40`),
curse:pl(`🩸|โกหกแล้วเลือดกำเดาไหล|แต่ทุกคนเชื่อคุณเวลาพูดจริง|1|read:-.05 rep:3
🎵|ได้ยินเพลงแล้วร่ายไม่ได้|ดนตรีทำให้มานาคุณสับสน|1|mp:-10
👤|เงาเดินช้ากว่าตัวหนึ่งก้าว|คนช่างสังเกตจะกลัวคุณ|1|cha:-3 dark:3
🌧️|ฝนตกทุกครั้งที่คุณร้องไห้|ทั้งเมือง|1|cha:-2 mp:5
🐈|แมวเกลียดคุณ|ทุกตัว ทุกพันธุ์|0|luck:-.02
😪|นอนไม่หลับคืนจันทร์เต็มดวง|ปีละสิบสองคืนที่คุณกลายเป็นคนอื่น|1|heal:-.02 dark:2
🍞|กินขนมปังไม่ได้|ท้องเสียทุกครั้ง|0|hp:-5
🗣️|พูดความจริงตอนเมา|ทุกความลับหลุดหมด|1|read:-.05
🧊|มือเย็นตลอดเวลา|ไม่มีใครอยากจับมือคุณ|0|cha:-3
🪞|ไม่มีเงาในกระจก|ต้องหลบกระจกในงานเลี้ยง|2|cha:-4 dark:4
🔔|ได้ยินระฆังที่ไม่มีใครได้ยิน|ทุกคืนตอนตีสาม|1|heal:-.02 ev:.04
🌸|แพ้ดอกไม้|จามทุกครั้งที่ใครให้ดอกไม้|0|love:-.05
💤|หลับกลางวันโดยไม่ตั้งใจ|บางครั้งกลางการสอบ|1|exam:-4
🦷|ฟันงอกใหม่ทุกปี|เจ็บทุกฤดูหนาว|0|hp:-5
👃|ได้กลิ่นความตาย|รู้ว่าใครจะตายภายในสัปดาห์|2|dark:5 read:.03 cha:-2
🎲|โชคร้ายในการพนัน|ไม่เคยชนะเกินสามตา|0|luck:-.03
🕯️|ไฟดับเมื่อคุณเข้าใกล้|ทุกเตา ทุกเทียน|1|over:-.1
🗝️|ทำกุญแจหายเป็นนิสัย|ทุกสัปดาห์|0|inc:-5
🌕|ตาเปลี่ยนสีตามดวงจันทร์|คนลือว่าคุณเป็นแม่มด|1|rep:-3 mp:5
📛|ชื่อจริงพูดออกมาไม่ได้|เสียงหายทุกครั้งที่พยายาม|2|cha:-3 read:-.03
🕷️|แมงมุมตามคุณ|ห้องคุณเต็มไปด้วยใยทุกเช้า|0|cha:-2
🧂|อาหารทุกอย่างเค็ม|ลิ้นคุณรับรสอื่นไม่ได้|0|heal:-.01
⌛|แก่เร็วกว่าคนอื่น|หนึ่งปีของคุณเท่ากับปีครึ่ง|2|life:-8
🩹|แผลหายช้า|แผลเล็กๆ ก็ใช้เวลาเป็นเดือน|1|heal:-.04
😶|ลืมหน้าคนง่าย|แม้แต่คนที่รัก|1|read:-.06
💫|เวียนหัวเวลาใช้เวท|ทุกคาถาทำให้โลกหมุน|1|ring:-.06
📉|เงินไหลออกจากมือ|เก็บเงินไม่เคยอยู่|1|inc:-10
👂|ได้ยินความคิดตัวเองดังเกินไป|สมาธิสั้น|1|rune:-.06
🥀|ต้นไม้ที่คุณแตะเหี่ยว|ชาวบ้านไม่ให้เข้าสวน|1|heal:-.02 dark:2
🐾|รอยเท้าเป็นรอยสัตว์|ใครตามรอยก็หาคุณเจอ|1|dark:2 hp:-5
⛓️|ถูกตามล่าโดยลัทธิ|พวกเขาเชื่อว่าคุณคือเครื่องสังเวย|3|dark:5 fight:.05 ev:.08
🌑|ครึ่งหนึ่งของวิญญาณหายไป|บางวันคุณไม่รู้สึกอะไรเลย|3|cha:-6 mp:20
💔|คนที่รักคุณโชคร้าย|ทุกคน|3|love:-.08 luck:-.03
🔥|มานาเผาตัวเอง|ทุกเวทที่ร่ายทำให้เจ็บ|2|over:-.3 pow:6
👁️|ถูกเฝ้ามองตลอดเวลา|คุณรู้สึก และมันเป็นเรื่องจริง|3|dark:4 read:.04
🕯️|อายุขัยเหลือน้อย|หมอดูทุกคนเงียบเมื่อเห็นมือคุณ|3|life:-15 pow:8
🐍|พันธสัญญาของบรรพบุรุษ|ลูกคนแรกของคุณเป็นของปีศาจ|3|dark:8 mp:20
🪦|คนตายจำคุณได้|วิญญาณเดินตามคุณกลับบ้าน|2|dark:6 read:.05
🌫️|ความทรงจำรั่ว|ทุกปีลืมเรื่องสำคัญหนึ่งเรื่อง|2|int:-5 exam:-3
🎭|สองบุคลิก|อีกคนในตัวคุณไม่ชอบเพื่อนของคุณ|3|dark:6 fight:.06 cha:-4
⚡|ฟ้าผ่าตามคุณ|ทุกพายุ คุณคือเป้า|2|hp:-10 pow:4
🗡️|ถูกสาปให้ฆ่าคนที่สาบานด้วย|อย่าสาบานกับใคร|3|dark:6 read:-.05
🐦‍⬛|อีกาส่งข่าวร้าย|ทุกข่าวร้ายมาถึงคุณก่อนใคร|2|ev:.08 luck:-.03
🧲|ดึงดูดสัตว์ประหลาด|มอนสเตอร์ได้กลิ่นคุณจากหนึ่งกิโล|2|fight:.05 ev:.06 hp:-5
💀|หัวใจหยุดเต้นทุกปีใหม่|หนึ่งนาทีต่อปี|3|life:-5 dark:5
🪙|หนี้ของชาติก่อน|เจ้าหนี้จากชาติก่อนตามมาทวง|2|inc:-20 gold:-100
🌊|จมน้ำง่ายผิดปกติ|น้ำตื้นแค่เข่าก็อันตราย|2|hp:-10
🔇|ร่ายเวทออกเสียงไม่ได้|ต้องร่ายในใจซึ่งยากกว่ามาก|3|rune:-.08 mp:-10
📜|ชื่ออยู่ในบัญชีดำของโบสถ์|นักบวชทุกคนจับตาคุณ|2|rep:-6 dark:4
😈|ปีศาจรู้ชื่อจริงคุณ|มันเรียกชื่อคุณในฝันทุกคืน|3|dark:8 mp:10
☠️|ถูกกำหนดให้ตายก่อนอายุสามสิบ|เว้นแต่จะหักชะตาได้|4|life:-25 fight:.1 luck:.05
🫥|ร่างกายค่อยๆ หายไป|ทุกปีโปร่งใสขึ้นนิดหนึ่ง|4|life:-12 mp:30 read:.08
👹|มีปีศาจผนึกอยู่ในแขน|ถ้าผนึกแตก ทุกคนรอบตัวตาย|5|pow:15 dark:12 fight:.1
🌍|โลกปฏิเสธคุณ|เวทรักษาไม่ได้ผลกับคุณ|5|heal:-.08 hp:40 pow:8
🔁|ติดอยู่ในวงวน|ทุกครั้งที่ตาย คุณจำได้ว่าเคยตายแบบนี้|5|clue:1 save:1 dark:6
💘|หัวใจเป็นของคนอื่น|ใครถือหัวใจคุณอยู่ คุณไม่รู้|4|love:-.15 dark:6
🔮|ทุกคำทำนายเกี่ยวกับคุณเป็นจริง|รวมถึงคำทำนายร้าย|4|luck:-.05 clue:1
🧪|เลือดเป็นพิษต่อเวท|เวทของคนอื่นที่แตะคุณจะระเบิด|4|over:-.2 fight:.12
👑|บัลลังก์เรียกหาคุณ|ทุกคนที่อยากเป็นกษัตริย์อยากฆ่าคุณ|5|rep:8 dark:6 fight:.06 ev:.08
⚫|ไม่มีชื่อในบันทึกของเทพ|ตายแล้วจะไม่ได้ไปที่ไหนเลย|6|clue:1 dark:10 luck:.06`),
fam:pl(`🐀|หนูในกระเป๋า|ขโมยเศษขนมปังให้คุณ|0|inc:5
🐦|นกกระจอกพูดได้คำเดียว|คำนั้นคือ "ระวัง"|0|read:.02
🐸|กบหัวโต|ร้องทุกครั้งที่ฝนจะตก|0|luck:.01
🦔|เม่นขี้อาย|ขดตัวในกระเป๋าเสื้อ|0|hp:5
🐌|หอยทากเรืองแสง|เป็นตะเกียงในคืนที่มืด|0|read:.02
🦗|จิ้งหรีดร้องเพลง|ร้องจนคุณหลับสบาย|0|heal:.02
🐠|ปลาทองในขวดแก้ว|จำทุกอย่างได้สามวินาที|0|cha:1
🐇|กระต่ายป่า|วิ่งนำทางเวลาหลงป่า|0|rune:.02
🦎|จิ้งจกบนไหล่|เปลี่ยนสีตามอารมณ์คุณ|0|read:.03
🐝|ผึ้งเดี่ยว|ต่อยใครก็ตามที่ทำร้ายคุณ|0|fight:.02
🐛|หนอนไหมทอง|ทอผ้าไหมปีละผืน|0|inc:8
🕊️|นกพิราบส่งจดหมาย|ส่งได้ทุกที่ในแคว้น|0|ev:.03
🐈‍⬛|แมวดำพูดได้|พูดแต่เรื่องปลา แต่รู้ทางลับในวังทุกเส้น|1|read:.06 luck:.02
🦉|นกฮูกปราชญ์|ตอบคำถามได้วันละข้อ|1|exam:4 rune:.04
🐕|หมาจรตาเดียว|ไม่เคยห่างคุณเกินสิบก้าว|1|fight:.04 hp:5
🦊|จิ้งจอกสองหาง|ชอบหลอกคนที่คุณไม่ชอบ|1|read:.05 luck:.02
🐢|เต่าหินพันปี|ช้า แต่ไม่เคยตาย|1|hp:15 life:5
🦇|ค้างคาวเงิน|บอกคุณว่าใครแอบฟังอยู่|1|read:.05
🐍|งูเขียวขดแขน|พิษของมันเป็นยาสำหรับคุณ|1|heal:.03
🐦‍⬛|อีกาเก็บของ|ขโมยของแวววาวมาให้|1|inc:12
🐎|ม้าป่าสีเทา|ไม่ยอมให้ใครขี่นอกจากคุณ|1|fight:.04 hp:8
🐿️|กระรอกนักสะสม|ซ่อนเหรียญไว้ทั่วเมืองเผื่อคุณจน|1|gold:120
🧚|ภูตดอกไม้|รักษาแผลเล็กๆ ให้ได้|2|heal:.05
🔥|ภูตไฟจิ๋ว|จุดไฟให้เวลาคุณร่ายไม่ทัน|2|over:.15 pow:3
💧|ภูตหยดน้ำ|เติมมานาให้คุณยามคับขัน|2|mp:15
🌪️|ภูตลมซน|เป่ากระดาษคำตอบของคนข้างๆ มาให้|2|exam:5 dark:1
🪨|โกเลมหินเท่ากำปั้น|แบกของได้หนักกว่าตัวเองร้อยเท่า|2|hp:12 inc:8
👻|วิญญาณเด็กในตุ๊กตา|เล่นซ่อนหาเก่ง และรู้ว่าทุกคนซ่อนอะไร|2|read:.08 dark:3
🐺|ลูกหมาป่าเงิน|จะโตเป็นหมาป่ายักษ์|2|fight:.07
🦋|ผีเสื้อแห่งฝัน|พาคุณเข้าไปในฝันคนอื่นได้|2|read:.06 ev:.04
🗡️|วิญญาณอัศวินในดาบสนิม|สอนดาบคุณทุกคืน|3|fight:.1 pow:5
🦅|กริฟฟินลูกอ่อน|ยังบินไม่ได้ แต่กัดเจ็บมาก|3|fight:.08 hp:10
🐲|มังกรน้ำจิ๋ว|ขดตัวในถ้วยชาได้|3|mp:20 heal:.03
🪶|ฟีนิกซ์ที่ยังเป็นไข่|ฟักเมื่อคุณตายครั้งแรก|3|save:1
🧞|ยักษ์ในตะเกียงที่ขี้เกียจ|ทำตามคำขอปีละครั้ง ถ้าอารมณ์ดี|3|luck:.05 inc:15
🥚|ไข่มังกรที่ยังไม่ฟัก|มีห้าอาณาจักรอยากได้มัน|4|pow:10 ev:.06 dark:3
🦄|ยูนิคอร์นดำ|ปรากฏเฉพาะตอนคุณใกล้ตาย|4|save:1 heal:.04
👁️|ดวงตาลอยได้|เห็นทุกอย่างที่คุณไม่เห็น|5|read:.12 save:1
🐉|มังกรเงินที่ทำสัญญาด้วย|จะกลืนวิญญาณคุณเมื่อคุณตาย|5|pow:18 fight:.12 dark:6
⭐|เศษเสี้ยวของดวงดาว|ดาวดวงหนึ่งลงมาอยู่ในร่างนกน้อย|6|luck:.1 mp:30 clue:1`),
item:pl(`🔪|มีดทำครัวของแม่|คมกว่ามีดทหาร|0|fight:.02
🧥|เสื้อคลุมเก่า|กันฝนได้ครึ่งหนึ่ง|0|hp:4
🍞|ขนมปังแข็งสามก้อน|อยู่ได้สามวัน|0|hp:3
🪙|เหรียญเงินห้าเหรียญ|ทุนตั้งตัวเล็กๆ|0|gold:50
🕯️|เทียนไขครึ่งเล่ม|จุดแล้วไม่ดับง่าย|0|read:.01
📒|สมุดว่างเปล่า|รอให้คุณเขียน|0|int:2
🧭|เข็มทิศเพี้ยน|ชี้ไปทางที่คุณอยากไป ไม่ใช่ทิศเหนือ|0|luck:.01
🧵|เข็มกับด้าย|เย็บได้ทั้งเสื้อและแผล|0|heal:.01
🥾|รองเท้าคู่ดี|เดินไกลได้ไม่พอง|0|hp:4
🎒|เป้หนังวัว|ใส่ของได้มากกว่าที่เห็น|0|inc:3
📱|มือถือแบต 3%|เปิดได้อีกไม่กี่ครั้งในชีวิต|0|ev:.03
🍬|ลูกอมจากโลกเดิม|รสชาติบ้าน|0|cha:1
🪈|ขลุ่ยไม้ไผ่|เป่าแล้วสัตว์สงบ|0|read:.02
🧂|ถุงเกลือ|ไล่ผีได้ ตามตำนาน|0|heal:.01
🪢|เชือกยาวสิบเมตร|มีประโยชน์กว่าที่คิดเสมอ|0|luck:.01
🧴|ขวดยาสามัญ|รักษาแผลถลอก|0|heal:.01
🗺️|แผนที่ฉีกครึ่ง|อีกครึ่งอยู่ที่ไหนสักแห่ง|0|ev:.02
🎲|ลูกเต๋ากระดูก|ทอยได้หกทุกครั้งที่สำคัญ|0|luck:.02
🧤|ถุงมือหนัง|จับของร้อนได้|0|over:.03
🍶|น้ำเต้าใส่น้ำ|ไม่เคยแห้ง|0|hp:3
💍|แหวนแม่ที่ไม่ยอมหลุด|ถอดไม่ออก และไม่อยากถอด|1|cha:2 heal:.01
📕|ตำราเวทมือสอง|มีโน้ตลายมือคนอื่นเต็มขอบหน้า|1|rune:.06
🪄|ไม้กายสิทธิ์ไม้โอ๊ก|ธรรมดา แต่ไม่เคยพัง|1|mp:8
🗡️|ดาบสั้นเหล็กดี|ตีโดยช่างที่เกษียณแล้ว|1|fight:.04
🧿|เครื่องรางกันตาร้าย|อุ่นเมื่อมีคนคิดร้าย|1|read:.03 hp:5
🎻|ไวโอลินเก่า|เสียงมันทำให้คนร้องไห้|1|cha:3 read:.03
⚗️|ชุดปรุงยาพกพา|ปรุงยาได้ทุกที่|1|heal:.03
🔭|กล้องส่องทางไกล|มองเห็นไกลกว่าคนอื่น|1|ring:.03
✉️|จดหมายแนะนำตัว|เปิดประตูหนึ่งบานในชีวิต|1|rep:4
💎|อัญมณีมานาเล็ก|เก็บมานาสำรองได้|1|mp:12
🪞|กระจกพกพา|บางทีสะท้อนสิ่งที่อยู่ข้างหลังคุณ ก่อนมันมา|1|read:.03 luck:.01
🧥|เสื้อคลุมขนกา|ทำให้มองเห็นยากในเงา|1|read:.04 dark:1
🐚|เปลือกหอยที่ได้ยินเสียงทะเล|และเสียงคนที่คิดถึงคุณ|1|heal:.02
🔑|กุญแจไม่รู้จักประตู|วันหนึ่งคุณจะเจอประตูของมัน|1|luck:.02 ev:.02
📿|ลูกประคำของนักบวช|สวดแล้วใจนิ่ง|1|rune:.04 dark:-2
📓|สมุดที่เขียนเองตอนคุณหลับ|บันทึกความฝันที่คุณจำไม่ได้|2|ev:.05 int:4
🗡️|ดาบที่ร้องเตือน|สั่นเมื่อมีศัตรูใกล้|2|fight:.06 read:.02
🧪|ยาฟื้นชีวิตหนึ่งขวด|ใช้ได้ครั้งเดียว|2|save:1
🎩|หมวกพ่อมดเก่า|ไม่พูด แต่ถอนหายใจเวลาคุณทำผิด|2|exam:5
🛡️|โล่หนังมังกร|ไฟไม่ไหม้|2|hp:20 over:.05
🪶|ขนนกฟีนิกซ์|อุ่นตลอดเวลา|2|heal:.04
💠|แหวนมานา|ขยายมานาของผู้สวม|2|mp:20
🗝️|กุญแจห้องเก็บของวิทยาลัย|ใครให้คุณมา ไม่มีใครรู้|2|rune:.06 ev:.03
📯|แตรเรียกทหาร|เป่าแล้วมีคนมาช่วยหนึ่งครั้ง|2|save:1
🎭|หน้ากากเปลี่ยนหน้า|ใส่แล้วหน้าคุณเป็นคนอื่นหนึ่งชั่วโมง|2|read:.08
🔮|ลูกแก้วขุ่น|บางครั้งเห็นภาพ|2|luck:.04 ev:.03
🏹|ธนูเอลฟ์|เบาเหมือนกิ่งไม้|2|fight:.06 ring:.04
⚔️|ดาบไร้ชื่อจากซากปรักหักพัง|ตัวอักษรบนใบดาบเปลี่ยนทุกคืน|3|fight:.1 pow:6
📖|ตำราต้องห้ามหน้าเดียว|หน้าเดียวก็พอให้เข้าใจเวทสามบท|3|mp:15 rune:.08 dark:4
🌺|มงกุฎดอกไม้ที่ไม่เหี่ยว|ใครสวมก็แก่ช้าลง|3|life:10 cha:4
🫥|เสื้อคลุมล่องหน|ใช้ได้ครั้งละไม่กี่นาที|3|save:1 read:.06
💍|แหวนของจอมเวทคนแรก|ใหญ่เกินนิ้วคุณสองเบอร์|3|mp:30 over:.1
⏳|นาฬิกาทรายไหลขึ้น|ทุกครั้งที่คว่ำ เวลาเดินช้าลง|3|ring:.12
🗺️|แผนที่ดันเจี้ยนที่ไม่มีใครเคยเข้า|ทางเข้าอยู่ใต้เมืองหลวง|3|ev:.06 inc:20
🌙|ดาบจันทร์เสี้ยว|คมขึ้นตามข้างขึ้น|4|fight:.12 mp:15
🔔|ระฆังเรียกวิญญาณ|เรียกวิญญาณมาถามได้ปีละครั้ง|4|clue:1 read:.06
💎|หัวใจกระจกของภูต|มานาไม่เคยหมดเกลี้ยง|4|mp:40 over:.2
🛡️|เกราะของผู้กล้ารุ่นแรก|มีรอยดาบจากราชาปีศาจ|4|hp:50 save:1
📜|คัมภีร์อัญเชิญฉบับจริง|ฉบับที่วังอ้างว่าหายไป|5|clue:1 rune:.12 ev:.06
🌑|เศษมงกุฎของเทพองค์แรก|ทุกคนที่เห็นมันอยากได้|6|pow:15 clue:1 dark:8 ev:.1`),
sec:pl(`🍪|เคยขโมยขนมจากโบสถ์|และไม่เคยสารภาพ|0|dark:1
💌|มีจดหมายรักที่ไม่เคยส่ง|ยังพกติดตัว|0|love:.03
😨|กลัวความมืด|ทุกคืนต้องจุดเทียน|0|heal:-.01
🐕|เคยทิ้งลูกหมาไว้ข้างทาง|คุณยังฝันถึงมัน|0|dark:2
🎂|ไม่รู้วันเกิดตัวเอง|ฉลองวันที่ตัวเองเลือก|0|cha:1
📛|ชื่อที่ใช้อยู่ไม่ใช่ชื่อจริง|แม่เปลี่ยนให้ตอนหนีออกจากบ้าน|0|read:.02
🏚️|บ้านเกิดถูกเผา|คุณรู้ว่าใครเผา|0|dark:2 fight:.02
💸|ติดหนี้คนในตลาดมืด|ยังจ่ายไม่หมด|0|gold:-40 dark:1
🤫|แอบอ่านจดหมายพ่อ|และรู้เรื่องที่ไม่ควรรู้|0|read:.03
🌊|เกือบจมน้ำตอนเด็ก|มีมือดึงคุณขึ้นมา ไม่ใช่มือคน|0|luck:.01
🩸|เคยฆ่าคนมาแล้ว|เป็นอุบัติเหตุ คุณเชื่ออย่างนั้น|1|dark:6 fight:.04
👶|มีพี่น้องฝาแฝดที่หายไป|บางคนเห็นคนหน้าเหมือนคุณในเมืองอื่น|1|ev:.05
📜|ครอบครัวเคยเป็นกบฏ|ชื่อสกุลยังอยู่ในบัญชีดำ|1|rep:-3 dark:3 read:.03
🔥|เป็นลูกของแม่มดที่ถูกเผา|คุณจำกลิ่นควันได้|1|mp:10 dark:4
🗡️|เคยเป็นเด็กรับใช้ของนักฆ่า|รู้วิธีทำให้คนเงียบ|1|fight:.05 dark:3
💰|รู้ที่ซ่อนสมบัติของโจรสลัด|แต่ไปเอาคนเดียวไม่ได้|1|gold:150
👸|เคยช่วยชีวิตเจ้าหญิงโดยไม่รู้ตัว|เธอจำคุณได้ คุณจำเธอไม่ได้|1|rep:4 love:.05
💉|เคยเป็นหนูทดลองของจอมเวท|รอยเข็มยังอยู่ที่แขน|1|mp:12 hp:-5
🐉|เคยเห็นมังกรตาย|มันพูดอะไรบางอย่างกับคุณ|1|ev:.04 rune:.03
🔪|มีคนจ้างให้คุณฆ่าใครสักคน|คุณยังไม่ได้ตอบ|1|dark:4 inc:10
🪦|เคยตายมาแล้วหนึ่งครั้ง|หัวใจหยุดสามนาที แล้วเต้นใหม่|2|save:1 dark:3
🌀|เคยหลงเข้าไปในโลกอื่นตอนเด็ก|สามวันที่หายไป คุณจำได้แค่แสงสีเขียว|2|ev:.06 rune:.04
😈|ชื่อจริงถูกขายให้ปีศาจ|โดยพ่อของคุณ เพื่อแลกกับเงิน|2|dark:8 mp:15
📖|อ่านภาษาเทพออก|ตั้งแต่จำความได้ โดยไม่มีใครสอน|2|rune:.1
👁️|เห็นวิญญาณได้|ตั้งแต่เด็ก และพวกเขารู้ว่าคุณเห็น|2|read:.06 dark:4
🗝️|รู้ทางลับเข้าวัง|ทางที่แม้แต่ราชาก็ไม่รู้|2|luck:.04 read:.04
💔|ทรยศเพื่อนสนิทเพื่อเอาตัวรอด|เขาไม่เคยรู้|2|dark:6 hp:5
👤|มีอีกคนใช้ชื่อคุณ|และทำเรื่องที่คุณไม่ได้ทำ|2|rep:-4 ev:.06
🌍|จำได้ว่าโลกนี้เคยถูกทำลาย|และถูกสร้างใหม่ให้เหมือนเดิมเกือบทุกอย่าง|3|clue:1
⚔️|เป็นลูกของผู้กล้ารุ่นก่อน|ที่วังบอกว่าตายในสงคราม|3|fight:.08 rep:3
🧬|ร่างนี้ไม่ใช่ร่างแรกของคุณ|คุณจำร่างก่อนได้รางๆ|3|int:6 life:5 ev:.03
👑|สายเลือดราชวงศ์ที่ถูกล้าง|ราชาองค์ปัจจุบันฆ่าทุกคนในตระกูลคุณ ยกเว้นคุณ|3|rep:5 dark:6 fight:.05
📜|รู้คำทำนายจุดจบของโลก|และชื่อคุณอยู่ในนั้น|3|clue:1 dark:4
🔮|เคยเห็นตัวเองตอนแก่ในฝัน|ตัวคุณตอนแก่ร้องไห้|3|luck:.05 life:5
🕳️|ใต้บ้านเกิดมีประตูไปที่อื่น|คุณเคยเปิดมันครั้งหนึ่ง|4|clue:1 ev:.08
⏳|อยู่ในรอบที่ 7|คุณจำได้ว่าหกรอบก่อนจบอย่างไร|4|clue:1 save:1
👼|เทพองค์หนึ่งติดหนี้คุณ|จากชาติก่อน|4|luck:.08 heal:.04
🌑|คุณคือคนที่ผนึกราชาปีศาจในชาติก่อน|และผนึกกำลังจะแตก|5|clue:1 pow:10 dark:6
♾️|ไม่เคยเกิด|ไม่มีบันทึก ไม่มีชาติก่อน ไม่มีที่มา|5|clue:1 luck:.08
✏️|คุณเขียนโลกนี้ขึ้นมาเอง|ในชีวิตก่อนหน้า บนกระดาษในห้องเรียน|6|clue:2 luck:.1`),
mark:pl(`👁️|ตาสีน้ำตาลธรรมดา|ไม่มีอะไรพิเศษ|0|
🟤|ไฝใต้ตา|หมอดูบอกว่าน้ำตาจะเยอะ|0|cha:1
🌾|ผมสีฟาง|ตากแดดทั้งปี|0|hp:2
✂️|ผมสั้นเกรียน|ตัดเองด้วยมีด|0|hp:2
🩹|แผลเป็นบนคาง|ตกต้นไม้ตอนเจ็ดขวบ|0|hp:3
🖤|ผมดำขลับ|ดำจนสะท้อนแสงเป็นสีน้ำเงิน|0|cha:1
🌞|ผิวคล้ำแดด|เคยทำงานกลางแจ้ง|0|hp:3
🍂|กระเต็มหน้า|นับได้สามสิบเจ็ดจุด|0|cha:1
👂|หูกาง|ได้ยินชัดกว่าคนอื่นนิดหน่อย|0|read:.01
🦷|ฟันเขี้ยวแหลม|ยิ้มแล้วดูน่ากลัวนิดๆ|0|dark:1
🤚|มือหยาบกร้าน|มือคนทำงาน|0|pow:1
😊|ลักยิ้มข้างเดียว|ทำให้คนยิ้มตาม|0|cha:2
💜|ตาสองสี|ข้างหนึ่งฟ้า ข้างหนึ่งม่วง|1|mp:5 cha:2
⚪|ผมขาวตั้งแต่เกิด|ไม่ใช่เพราะแก่|1|mp:6
🔴|ผมแดงเพลิง|คนในเมืองนี้เชื่อว่าผมแดงนำโชคร้าย|1|pow:2 rep:-1
🐈|ตาเป็นประกายในที่มืด|เหมือนตาแมว|1|read:.03
🌀|ปานรูปวงเวท|ที่ต้นคอ|1|rune:.04
❌|แผลเป็นรูปกากบาทที่ฝ่ามือ|ไม่มีใครรู้ว่ามาจากไหน|1|fight:.02 dark:2
🍃|ผมสีเขียวอ่อน|โดนแดดแล้วเข้มขึ้น|1|heal:.01
❄️|ผิวเย็นเหมือนหิมะ|ไม่เคยเหงื่อออก|1|over:.04
🌙|ไฝรูปจันทร์เสี้ยว|ที่หน้าผาก|1|mp:5 luck:.01
💅|เล็บสีเงิน|ตัดแล้วงอกเป็นสีเงินเหมือนเดิม|1|cha:2
✨|ลายรูนเรืองแสงตอนโกรธ|ทั่วแขนทั้งสองข้าง|2|pow:5 dark:2
🐉|เกล็ดบนหลังมือ|แข็งกว่าเหล็ก|2|hp:12
🟡|ตาข้างหนึ่งเป็นสีทอง|เห็นมานาของคนอื่น|2|read:.05 rune:.04
🪶|ขนนกงอกที่ไหล่|ทุกฤดูใบไม้ผลิ|2|ring:.05
🔥|ผมเป็นประกายไฟเวลาเครียด|ระวังหมอน|2|over:.08
🌊|ลายคลื่นบนผิวหนัง|ขยับได้เหมือนทะเล|2|mp:10
⭐|กระเป็นรูปกลุ่มดาว|กลุ่มดาวที่ไม่มีบนฟ้า|2|luck:.03 ev:.02
🦋|เงาเป็นรูปปีก|ทั้งที่คุณไม่มีปีก|2|dark:4 luck:.02
🌈|ตาเปลี่ยนสีตามอารมณ์|ปิดอารมณ์ไม่ได้เลย|3|read:-.03 cha:6 mp:10
🦌|เขากวางเล็กๆ บนหัว|ซ่อนใต้หมวก|3|heal:.03 life:8
💫|ออร่าที่คนเวทมองเห็น|เด็กๆ ชอบชี้|3|mp:15 rep:3
❤️|หัวใจอยู่ด้านขวา|แทงหัวใจคุณพลาดทุกคน|3|save:1
🐺|เงาเป็นรูปสัตว์|เงาของคุณเป็นหมาป่าตัวใหญ่|3|fight:.06 dark:3
👑|ปานรูปมงกุฎบนหลัง|ปานเดียวกับราชวงศ์เก่า|4|rep:8 ev:.04
🌟|ผิวเรืองแสงจางๆ ในคืนเดือนมืด|ดวงดาวจำคุณได้|4|luck:.06 mp:15
🧿|ม่านตาเป็นวงเวทซ้อนกันเจ็ดชั้น|เห็นได้เมื่อมองใกล้มาก|4|rune:.1 read:.06
🌌|เลือดสีน้ำเงิน|ไม่ใช่ความหมายเปรียบเทียบ|5|mp:30 life:15
⚫|ไม่มีเงาเลย|แสงทุกชนิดผ่านคุณไปเหมือนคุณไม่มีอยู่|6|clue:1 save:1 dark:6`)};

// ---- ผลของชะตา: สตริง fx → ข้อความ ----
const fxP=s=>{const o={};String(s||'').split(/\s+/).forEach(t=>{const i=t.indexOf(':');if(i<1)return;const k=t.slice(0,i),v=t.slice(i+1),n=+v;o[k]=isNaN(n)?v:n});return o};
const FXL={pow:['พลัง',0],int:['ปัญญา',0],cha:['เสน่ห์',0],mp:['มานาสูงสุด',0],hp:['พลังชีวิต',0],life:['อายุขัย',0,' ปี'],gold:['เงิน',0],dark:['ความมืด',0],rep:['ชื่อเสียง',0],clue:['เบาะแสลับ',0],
 ring:['มินิเกมวงเวท',1],rune:['มินิเกมรูน',1],read:['มินิเกมอ่านใจ',1],luck:['ทุกมินิเกม',1],fight:['ชนะการต่อสู้',1],inc:['รายได้',0,'/ปี'],heal:['ฟื้นพลังชีวิต',1,'/ปี'],over:['ร่ายเกินพิกัดปลอดภัย',1],save:['รอดตาย',0,' ครั้ง'],ev:['เจอเรื่องแปลก',1],exam:['คะแนนสอบ',0],love:['โอกาสเจอรัก',1]};
const fxT=s=>{const o=fxP(s);return Object.keys(o).filter(k=>FXL[k]&&o[k]).map(k=>{const L=FXL[k],v=o[k];return `${L[0]} ${v>0?'+':''}${L[1]?Math.round(v*100)+'%':fmt(v)}${L[2]||''}`}).join(' · ')};
const fxv=k=>{try{const K=FN();return (K&&K.fx&&+K.fx[k])||0}catch(e){return 0}};
// ---- โอกาส: ใช้ "ระดับนี้หรือหายากกว่า" (ชีวิตธรรมดาจะไม่กลายเป็น 1 ในล้าน) ----
const cumP=(L,t)=>{let a=0,b=0;for(const x of L){b+=TW[x.t];if(x.t>=t)a+=TW[x.t]}return a/b};
const wPickB=(L,ex)=>{const C=L.filter(x=>!ex||!ex.includes(x.n));let s=C.reduce((a,x)=>a+TW[x.t],0)*rnd();for(const x of C){s-=TW[x.t];if(s<=0)return x}return C[C.length-1]};
const oneIn=p=>'1 ใน '+(p>=.999?'1':fmt(Math.round(1/p*10)/10>100?Math.round(1/p):Math.round(1/p*10)/10));
const EKEY={time:1,space:1,death:1,moon:1,blood:1,void:1};
RARE.moon=['🌙','แสงจันทร์','เวทแรงขึ้นตอนกลางคืน และคุยกับเงาของดวงจันทร์ได้'];RARE.blood=['🩸','เลือด','ร่ายด้วยเลือดตัวเองแทนมานา'];RARE.void=['🕳️','ความว่างเปล่า','ลบสิ่งที่แตะได้ รวมถึงความทรงจำของตัวเอง'];
// ---- คอมโบลับ: ชิ้นที่เข้ากันให้ผลเพิ่ม ----
const COMBO=[[['แสงจันทร์'],['ลูกของรัตติกาล','ไฝรูปจันทร์เสี้ยว','ดาบจันทร์เสี้ยว'],'🌙 จันทร์คู่','mp:20 read:.08'],
 [['ดราโคเนียน','หัวใจมังกร','เลือดมังกรเจือจาง','เกล็ดบนหลังมือ'],['ไข่มังกรที่ยังไม่ฟัก','มังกรน้ำจิ๋ว','มังกรเงินที่ทำสัญญาด้วย','ผู้คุยกับมังกร'],'🐉 สายเลือดมังกรตื่น','pow:10 hp:20'],
 [['ความตาย'],['เคยตายมาแล้วหนึ่งครั้ง','ผู้ฟื้นจากความตาย','คนตายจำคุณได้'],'💀 ผู้กลับจากความตาย','save:1 dark:5'],
 [['ตาเหยี่ยว'],['ลูกศรที่ไม่พลาด','ยิงธนูแม่น','ธนูเอลฟ์'],'🏹 นักแม่นธนูโดยกำเนิด','ring:.1 fight:.05'],
 [['ลิ้นเงิน','โกหกหน้าตาย'],['โกหกแล้วเลือดกำเดาไหล'],'🩸 นักโกหกเลือดออก','read:.1 rep:3'],
 [['จำได้ว่าโลกนี้เคยถูกทำลาย','คุณเขียนโลกนี้ขึ้นมาเอง'],['ผู้ถูกเลือกโดยวงเวทอัญเชิญ','อยู่ในรอบที่ 7','ติดอยู่ในวงวน','ผู้จดบันทึกโลก'],'🌀 ความทรงจำของโลกเก่า','clue:1 luck:.05'],
 [['เลือด'],['แวมไพร์สายเลือดจาง','เลือดเทพโบราณ'],'🩸 เจ้าแห่งเลือด','over:.3 life:15'],
 [['เงา'],['เงาเชื่อฟัง','ก้าวเงา','เงาเป็นรูปปีก','เงาเป็นรูปสัตว์'],'🌑 เงาเป็นของคุณ','read:.08 save:1'],
 [['แมวดำพูดได้','ตาเป็นประกายในที่มืด'],['เผ่าหูแมว'],'🐈‍⬛ เก้าชีวิต','luck:.05 save:1'],
 [['ฟีนิกซ์ที่ยังเป็นไข่'],['ขนนกฟีนิกซ์'],'🔥 เปลวไฟคืนชีพ','save:1 heal:.05'],
 [['มนุษย์หมาป่า','สัญชาตญาณนักล่า'],['จันทร์สีเลือด','ลูกหมาป่าเงิน','เงาเป็นรูปสัตว์'],'🐺 ฝูงหมาป่าใต้จันทร์','fight:.1 pow:6'],
 [['แกนมานาคู่','ทะเลมานาส่วนตัว'],['มหาสมุทร','มหาสมุทรไร้ก้น','ทะเลลึก'],'🌊 ทะเลไร้ขอบ','mp:40 over:.2']];
const combos=items=>{const N=new Set(items.map(x=>x.n));return COMBO.filter(c=>c[0].some(a=>N.has(a))&&c[1].some(b=>N.has(b)))};
// ---- สถานะการสุ่ม ----
let FB=null;
const TOP=[['iso','⚔️','ต่างโลก','ถูกอัญเชิญข้ามโลก · เริ่มอายุ 16'],['magic','🔮','โลกเวทมนตร์','วิทยาลัยเวทอาร์คาเนีย · เริ่มอายุ 12'],['noble','🏰','โลกแห่งอะคาเดมี่','สถาบันหลวง การเมือง งานเลี้ยง · เริ่มอายุ 12']];
const HAIR=['#1f1a17','#3a2a1e','#5b3a24','#c9b27a','#e8e8f0','#6a2a2a','#2a3550','#7a5aa8'],SKIN=['#f1c9a0','#e0ac69','#c68642','#8d5524','#f5d5b8'];
const orgL=()=>BD['org_'+FB.top];
function fbRoll(first){if(!first){if(FB.left<=0)return;FB.left--}
 if(FB.top==='iso')FB.w=rnd()<.7?'hero':'trash';else FB.w=FB.top;
 const b={};b.org=wPickB(orgL());b.race=wPickB(BD.race);b.el=wPickB(BD.el);b.mana=wPickB(BD.mana);b.omen=wPickB(BD.omen);b.mark=wPickB(BD.mark);
 b.tal=[];for(let i=0;i<3;i++)b.tal.push(wPickB(BD.tal,b.tal.map(x=>x.n)));b.curse=wPickB(BD.curse);b.fam=wPickB(BD.fam);b.item=wPickB(BD.item);b.sec=wPickB(BD.sec);FB.b=b;
 FB.sk=FB.w==='hero'||FB.w==='trash'?pick(SK[FB.w])[0]:null;
 if(first||!FB.edited){FB.g=FB.g||(rnd()<.5?'ชาย':'หญิง');FB.name=FB.top==='iso'?pick(TH)+' '+pick(['ใจดี','ศรีสุข','รักไทย','มั่นคง','แสงทอง','บุญมา','สายสุวรรณ','ทองดี']):nm(FB.g==='หญิง'?'f':'m')}
 FB.hair=pick(HAIR);FB.skin=pick(SKIN);FB.seed=R(1,99999);fbDraw()}
const fbItems=b=>[b.org,b.race,b.el,b.mana,b.omen,b.mark,...b.tal,b.curse,b.fam,b.item,b.sec];
const fbCat=b=>[['org',b.org,orgL()],['race',b.race,BD.race],['el',b.el,BD.el],['mana',b.mana,BD.mana],['omen',b.omen,BD.omen],['mark',b.mark,BD.mark],['tal',b.tal[0],BD.tal],['tal',b.tal[1],BD.tal],['tal',b.tal[2],BD.tal],['curse',b.curse,BD.curse],['fam',b.fam,BD.fam],['item',b.item,BD.item],['sec',b.sec,BD.sec]];
function fbParts(){const P=[];if(FB.top==='iso'&&FB.w==='trash')P.push({ic:'🗑️',n:'สกิลขยะ',p:.3});for(const [c,x,L] of fbCat(FB.b))if(x.t>=2)P.push({ic:x.ic,n:x.n,p:cumP(L,x.t)});return P}
function fbN(){return Math.max(1,1/fbParts().reduce((a,x)=>a*x.p,1))}
function fbCss(){if(document.getElementById('fnBcss'))return;let out='';const walk=(L,pre,post)=>{for(const r of L){try{if(r.cssRules&&r.media){walk(r.cssRules,'@media '+r.media.mediaText+'{','}');continue}if(r.selectorText&&r.selectorText.indexOf('#birth')>=0){out+=pre+r.cssText.replace(/#birth/g,'#fnB')+post+'\n'}}catch(e){}}};
 for(const sh of document.styleSheets){let L=null;try{L=sh.cssRules}catch(e){continue}if(L)walk(L,'','')}
 out+=`#fnB.on{display:block!important;width:min(760px,100%)!important;max-width:760px!important;box-sizing:border-box;margin:0 auto!important;grid-template-columns:none!important;padding-bottom:96px}#fnB.on>*{grid-column:auto!important;grid-row:auto!important;width:auto!important;max-width:none!important}#fnB .bwld{justify-content:center}#fnB .bstage canvas{image-rendering:pixelated}
#fnB .fgG{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}#fnB .fgG button{padding:4px 11px;border-radius:14px;border:1px solid var(--line);background:transparent;color:inherit;font:inherit;font-size:12.5px}#fnB .fgG button.on{background:var(--pink,#e8b54a);color:#1a1200;border-color:transparent;font-weight:700}
#fnB .fgIn{width:100%;box-sizing:border-box;font:inherit;font-size:20px;line-height:1.2;background:transparent!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border:0;border-bottom:1px dashed #c9a24a88;padding:2px 0;margin:0}
#fnB .fgOdds{margin:10px 0;padding:12px}#fnB .fnH{font-weight:800;font-size:13px;margin:14px 2px 6px;display:flex;justify-content:space-between;align-items:center}#fnB .fnH small{font-weight:500;opacity:.65;font-size:11.5px}
#fnB .fnFx{display:block;margin-top:3px;font-size:11.5px;color:#b9f0c8}#fnB .fnFx.neg{color:#ffb0b8}#fnB .fnTg{font-size:10px;padding:1px 7px;border-radius:9px;border:1px solid currentColor;margin-left:4px;opacity:.85}
#fnB .fnCb{margin-top:10px;padding:10px 12px;border-radius:14px;border:1.5px solid #b98cff88;background:linear-gradient(160deg,#2a1a48,#160e28)}#fnB .fnCb b{color:#ffd37a}#fnB .fnCb div{font-size:13px;margin-top:4px}
#fnB .fgBar{position:sticky;bottom:0;z-index:5;display:grid;grid-template-columns:1fr 1.3fr;gap:8px;padding:10px 0 calc(10px + env(safe-area-inset-bottom));background:linear-gradient(transparent,var(--bg,#120e18) 30%)}#fnB .fgBar button{min-height:56px;font-size:15px;border-radius:16px}#fnB .fgBar .pbtn{font-size:17px}#fnB .fgBar .rrxB{grid-column:1/-1;margin:0;padding:8px 12px;min-height:0!important;font-size:14px}`;
 out+=`#mwHud.fan{position:relative;background:linear-gradient(165deg,color-mix(in srgb,var(--fa) 22%,#0c0a1c),#0a0816 70%);border:1.5px solid color-mix(in srgb,var(--fa) 70%,transparent);border-radius:12px;padding:9px 11px 8px;color:#eef2ff;box-shadow:0 0 0 1px #ffffff0d inset,0 0 18px color-mix(in srgb,var(--fa) 30%,transparent),0 4px 14px #0008;cursor:pointer;overflow:hidden}
#mwHud.fan:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,#ffffff06 0 1px,transparent 1px 3px);pointer-events:none}
#mwHud.fan .fhT{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;letter-spacing:.6px;color:var(--fa);font-weight:700;text-transform:uppercase}#mwHud.fan .fhT span:last-child{color:#c9c3e6;font-weight:500;letter-spacing:0;text-transform:none}
#mwHud.fan .fhR{display:flex;align-items:baseline;gap:8px;font-weight:800;font-size:15px;margin:3px 0 4px;color:#fff}#mwHud.fan .fhR em{font-style:normal;font-size:11px;padding:1px 7px;border-radius:7px;background:var(--fa);color:#0d0a1c;font-weight:800}#mwHud.fan .fhR small{font-size:11.5px;color:#c9c3e6;font-weight:600;margin-left:auto}
#mwHud.fan .fhB{display:grid;grid-template-columns:24px 1fr auto;align-items:center;gap:6px;font-size:11px;margin:2px 0;color:#dfe3ff}#mwHud.fan .fhB .bar{height:7px;border-radius:2px;background:#ffffff14;overflow:hidden;box-shadow:inset 0 0 0 1px #ffffff12}#mwHud.fan .fhB .bar i{display:block;height:100%}
#mwHud.fan .fhB.hp .bar i{background:linear-gradient(90deg,#ff5a6a,#ff9a7a)}#mwHud.fan .fhB.mp .bar i{background:linear-gradient(90deg,#4a8cff,#9ad0ff)}#mwHud.fan .fhB.dk .bar i{background:linear-gradient(90deg,#5a2a6a,#ff4d8d)}
#mwHud.fan .fhS{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:6px 0 4px}#mwHud.fan .fhS div{text-align:center;padding:3px 0;border-radius:6px;background:#ffffff0a;border:1px solid #ffffff12;font-size:10px;color:#b9b3d8}#mwHud.fan .fhS b{display:block;font-size:13px;color:#fff}
#mwHud.fan .fhC{display:flex;flex-wrap:wrap;gap:4px}#mwHud.fan .fhC span{font-size:10.5px;padding:2px 7px;border-radius:7px;background:#ffffff10;border:1px solid #ffffff1c}#mwHud.fan .fhC span.k{border-color:#ffd37a;color:#ffe6a8}#mwHud.fan .fhC span.c{border-color:#ff7a8a88;color:#ffb8c0}#mwHud.fan .fhC span.t4{border-color:#ffb34a;color:#ffd08a}#mwHud.fan .fhC span.t5{border-color:#ff5ad8;color:#ffb0ee}
.fnSt .it{display:flex;gap:9px;padding:8px;border-radius:11px;background:#ffffff08;border:1px solid #ffffff14;margin-top:6px}.fnSt .it .ic{font-size:20px}.fnSt .it small{display:block;opacity:.75;font-size:12px}.fnSt .it i{font-style:normal;font-size:11.5px;color:#b9f0c8;display:block}.fnSt h4{margin:12px 0 2px}`;
 const st=document.createElement('style');st.id='fnBcss';st.textContent=out;document.head.appendChild(st)}
function fbEl(){let el=document.getElementById('fnB');if(!el){el=document.createElement('div');el.id='fnB';el.className='screen';const b=document.getElementById('birth');if(b&&b.parentNode)b.parentNode.insertBefore(el,b.nextSibling);else document.body.appendChild(el)}fbCss();return el}
const BGW={iso:['#1a1238','#3a2460','#120b22'],magic:['#0c0a24','#2a2060','#100a20'],noble:['#2a1a2a','#6a4058','#1a1018']};
function fbPaint(){try{const cv=document.getElementById('fnAva');if(!cv)return;const ctx=cv.getContext('2d'),sg=g,sp=PS,c=BGW[FB.top];g=ctx;PS=cv.width/28;ctx.setTransform(1,0,0,1,0,0);
 const gr=ctx.createLinearGradient(0,0,0,cv.height);gr.addColorStop(0,c[0]);gr.addColorStop(.6,c[1]);gr.addColorStop(1,c[2]);ctx.fillStyle=gr;ctx.fillRect(0,0,cv.width,cv.height);
 for(let i=0;i<28;i++){ctx.fillStyle=['#ffd37a','#b98cff','#fff'][i%3];ctx.globalAlpha=.55;ctx.fillRect((i*37+FB.seed)%136,(i*23)%100,2,2)}ctx.globalAlpha=1;
 if(FB.top==='iso'){ctx.strokeStyle='#ffd37aaa';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(68,130,52,12,0,0,7);ctx.stroke();ctx.strokeStyle='#b98cff99';ctx.beginPath();ctx.ellipse(68,130,36,8,0,0,7);ctx.stroke();for(let i=0;i<4;i++){ctx.fillStyle='#2a1c4a';ctx.fillRect(6+i*36,22,10,100)}}
 else if(FB.top==='magic'){ctx.fillStyle='#1c1840';ctx.fillRect(88,18,34,120);ctx.fillRect(96,6,18,14);for(let i=0;i<5;i++){ctx.fillStyle='#ffd37a';ctx.fillRect(100,28+i*18,6,8)}ctx.fillStyle='#2a2460';ctx.fillRect(8,50,22,90)}
 else{ctx.fillStyle='#3a2438';ctx.fillRect(0,40,136,110);for(let i=0;i<5;i++){ctx.fillStyle='#ffd9a0';ctx.globalAlpha=.6;ctx.fillRect(8+i*27,52,10,24)}ctx.globalAlpha=1;ctx.fillStyle='#ffd37a';ctx.fillRect(60,30,16,4)}
 ctx.setTransform(PS,0,0,PS,0,0);ctx.imageSmoothingEnabled=false;
 const rc=FB.b.race.n,robe=FB.top==='noble'?'#7a3a5a':FB.top==='magic'?'#3a3a8a':'#4a4f6a';
 try{person(10,30,{robe,trim:FB.top==='noble'?'#ffd37a':null,belt:'#00000055',hat:null,hs:1,mood:'happy',seed:FB.seed,age:FB.top==='iso'?16:12,g:FB.g,skin:/ยักษ์น้ำแข็ง/.test(rc)?'#cfe6f2':FB.skin,hair:/ผมเงิน|ผมขาว/.test(rc+FB.b.mark.n)?'#e8e8f0':/ผมแดง/.test(FB.b.mark.n)?'#c0302a':/ผมสีเขียว/.test(FB.b.mark.n)?'#7ac08a':FB.hair,old:false,beard:null,sword:null,glow:FB.b.el.t>=4,aura:null},'stand')}catch(e){}g=sg;PS=sp}catch(e){}}
const wNow=()=>({iso:{t:'คุณถูกอัญเชิญมาแล้ว',c:['⚔️ ต่างโลก','⛪ อาณาจักรอัลเวิร์น','🌙 ปีจันทร์คู่ที่ 412'],cap:'⛪ วงเวทอัญเชิญ',o:'ชีวิตในโลกเดิม'},magic:{t:'คุณได้ถือกำเนิดขึ้นแล้ว',c:['🔮 โลกเวทมนตร์','🏰 วิทยาลัยอาร์คาเนีย','✴️ ศักราชเวทที่ 1207'],cap:'🦉 หอคอยเวท',o:'ชาติกำเนิด'},noble:{t:'คุณได้ถือกำเนิดขึ้นแล้ว',c:['🏰 โลกแห่งอะคาเดมี่','🏛️ สถาบันหลวงเซนต์ลูเมีย','👑 รัชกาลที่ 9'],cap:'🏛️ ห้องโถงสถาบัน',o:'ชาติกำเนิด'}})[FB.top];
function fbRow(ic,k,x,L,bad,extra){const t=x.t,p=L?cumP(L,t):1,fx=fxT(x.fx),neg=bad||/(^| )-/.test(' '+String(x.fx).replace(/:/g,' ')),rv=RVT[t];
 return `<div class="trait r${Math.min(4,rv)} show" data-rv="${bad?'bad'+rv:rv}"><div><div class="k">${ic} ${k}${t>=1?`<span class="fnTg t${Math.min(5,rv)}">${TN[t]}</span>`:''}${extra||''}</div><div class="v t${Math.min(5,rv)}">${x.ic} ${E(x.n)}</div><div class="d">${E(x.d)}${fx?`<span class="fnFx${bad?' neg':''}">${fx}</span>`:''}</div></div><span class="o t${Math.min(5,rv)}">${t?oneIn(p):'ทั่วไป'}</span></div>`}
function fbDraw(){const el=fbEl(),W=wNow(),b=FB.b,d=WD[FB.w];
 const sk=FB.sk?SK[FB.w].find(x=>x[0]===FB.sk):null,cb=combos(fbItems(b));
 el.innerHTML=`<h2>${W.t}</h2><div class="bwld">${W.c.map(c=>`<span class="bchip">${c}</span>`).join('')}</div>
 <div class="box hcard"><div class="row1"><div class="bstage"><canvas id="fnAva" width="136" height="150"></canvas><div class="bcap">${W.cap}</div></div>
  <div class="bname" style="flex:1;min-width:0"><div class="tag2">ชื่อ</div><input class="fgIn" id="fanNm" maxlength="24" value="${E(FB.name)}" onchange="fanNm(this.value)" aria-label="ชื่อ">
  <div class="fgG">${['ชาย','หญิง'].map(g=>`<button class="${FB.g===g?'on':''}" onclick="fanG('${g}')">${g==='ชาย'?'♂':'♀'} ${g}</button>`).join('')}<button onclick="fanLook()">🎲 สุ่มหน้าตา</button></div>
  <div class="fgG" style="margin-top:4px">${TOP.map(t=>`<button class="${t[0]===FB.top?'on':''}" onclick="fanW('${t[0]}')">${t[1]} ${t[2]}</button>`).join('')}</div></div></div></div>
 <div class="fgTr" style="margin-top:8px">
  ${FB.top==='iso'?`<div class="trait r${FB.w==='trash'?2:0} show" data-rv="${FB.w==='trash'?2:0}"><div><div class="k">📜 ผลประเมินตอนอัญเชิญ</div><div class="v t${FB.w==='trash'?2:0}">${d.ic} ${FB.w==='hero'?'ผู้กล้า':'สกิลขยะ'}</div><div class="d">${FB.w==='hero'?'ลูกแก้วสว่างจ้า วังเลี้ยงดูอย่างดี ... ในตอนแรก':'ราชาหัวเราะ ทหารลากคุณไปทิ้งนอกกำแพง แต่สกิลนี้โตได้'}${sk?`<span class="fnFx">${sk[1]} สกิล「${sk[2]}」 — ${sk[3]}</span>`:''}</div></div><span class="o t${FB.w==='trash'?2:0}">${FB.w==='hero'?'1 ใน 1.4':'1 ใน 3.3'}</span></div>`:''}
  ${fbRow('🏠',W.o,b.org,orgL())}${fbRow('🧬','เผ่าพันธุ์',b.race,BD.race)}${fbRow('✨','ธาตุ',b.el,BD.el)}${fbRow('💠','ปริมาณมานา',b.mana,BD.mana)}${fbRow('🔮','ลางตอนเกิด',b.omen,BD.omen)}${fbRow('🎨','รอยบนร่าง',b.mark,BD.mark)}</div>
 <div class="fnH" style="color:#ffd37a"><span>🌟 พรสวรรค์</span><small>3 ช่อง · มีผลในมินิเกมและเหตุการณ์</small></div>
 <div class="fgTr">${b.tal.map((x,i)=>fbRow('🌟','พรสวรรค์ '+(i+1),x,BD.tal)).join('')}</div>
 <div class="fnH" style="color:#ff9aa8"><span>⚖️ ราคาที่ต้องจ่าย</span><small>คำสาป · ภูต · ของ · ความลับ</small></div>
 <div class="fgTr">${fbRow('🩸','คำสาป',b.curse,BD.curse,1)}${fbRow('🐾','ภูตพันธสัญญา',b.fam,BD.fam)}${fbRow('🎁','ของติดตัว',b.item,BD.item)}${fbRow('👁️','ความลับ',b.sec,BD.sec)}</div>
 <div class="box fgOdds">${window.fateBoxH?fateBoxH(fbParts()):`<div class="tag2">ความหายากของชีวิตนี้</div><div class="n px">1 ใน ${fmt(Math.round(fbN()))}</div>`}</div>
 ${cb.length?`<div class="fnCb"><b>🔗 คอมโบที่ตรวจเจอ</b>${cb.map(c=>`<div>${c[2]} <span class="tag2">${fxT(c[3])}</span></div>`).join('')}</div>`:''}
 <div class="fgBar"><button class="gbtn" ${FB.left<=0?'disabled':''} onclick="fanRe()">🔄 เกิดใหม่ (${FB.left})</button><button class="pbtn" onclick="fanGo()">ใช้ชีวิต ▶</button></div>`;
 if(!el.classList.contains('on'))show('fnB');fbPaint()}
window.fanW=k=>{if(!FB)return;k=k==='hero'||k==='trash'?'iso':k==='aca'?'noble':k;if(!TOP.some(t=>t[0]===k))return;FB.top=k;FB.edited=0;fbRoll(true)};
window.fanNm=v=>{v=String(v||'').trim().slice(0,24);if(v&&FB){FB.name=v;FB.edited=1}};
window.fanG=g=>{if(!FB)return;FB.g=g;if(!FB.edited&&FB.top!=='iso')FB.name=nm(g==='หญิง'?'f':'m');fbDraw()};
window.fanLook=()=>{if(!FB)return;FB.hair=pick(HAIR);FB.skin=pick(SKIN);FB.seed=R(1,99999);fbPaint()};
window.fanRe=()=>{if(!FB||FB.left<=0)return;try{sfx('click')}catch(e){}fbRoll(false)};
window.fanGo=()=>{if(!FB)return;try{const i=document.getElementById('fanNm');if(i)window.fanNm(i.value)}catch(e){}const RR=JSON.parse(JSON.stringify(FB));FB=null;try{const e=document.getElementById('fnB');if(e)e.classList.remove('on')}catch(e){}fanBegin(RR)};
window.fanStart=function(w){window._frS=1;try{closeM()}catch(e){}const tot=Math.max(3,(window.vipTot&&window.vipTot())|0);const tp=w==='hero'||w==='trash'||w==='iso'?'iso':w==='aca'||w==='noble'?'noble':w==='magic'?'magic':'iso';FB={top:tp,w:tp,left:(typeof CFG!=='undefined'&&CFG.chm==1)?0:tot,edited:0};fbRoll(true)};
try{if(window.rrx)window.rrx.reg({id:'fan',
 host(){const e=document.getElementById('fnB');const b=e&&e.classList.contains('on')&&FB?e.querySelector('.fgBar'):null;return b&&b.firstElementChild},
 left(){return FB?FB.left|0:0},spend(){if(FB)FB.left=Math.max(0,FB.left-1)},
 reroll(){const l=FB.left;FB.left=1;const ed=FB.edited;fbRoll(false);FB.left=l;FB.edited=ed},N(){return FB?fbN():1},
 snap(){return JSON.parse(JSON.stringify(FB))},restore(s){FB=JSON.parse(JSON.stringify(s))},draw(){fbDraw()}})}catch(e){console.error('rrx fan',e)}
function fanBegin(RR){window._frS=1;try{closeM()}catch(e){}const w=RR.w,d=WD[w],b=RR.b;
 try{CFG.xian=0;CFG.mw=0;if((CFG.chm|0)>=2)CFG.chm=0;crForce={g:RR.g==='หญิง'?1:0,look:{hair:RR.hair,skin:RR.skin}};goBirth();doRoll(true);startLife()}catch(e){console.error(e);return}
 setTimeout(()=>{try{if(choice._cur)choice._cur=null;if(modalOpen)closeM();
  S.name=RR.name;S.gender=RR.g;S.age=d.a0;S.power=8;S.qi=0;S.money=d.g==='iso'?(w==='trash'?3:40):60;S.maxHp=70;S.hp=70;S.int=18;S.cha=18;S.fame=0;S.karma=0;S.xian=false;S.xt=0;S.faction=null;S.ownSect=null;S.custom=true;S.arts=[];S.sys=null;S.spouse=null;
  S.mw={y:0,sec:0,fame:0,adapt:100,qi:0,lin:0,linMet:0,native:1,rnd:1,cc:'th',uni:0,qlv:0,past:{n:S.name,realm:'',yr:1,how:'native',pow0:8},seen:{e1:1,e2:1,e3:1,e4:1,e5:1,e6:1,e7:1,e8:1,e9:1,e10:1,e11:1,e12:1,e13:1,e14:1,e15:1},q:[],fl:{},end:70,clk:0,hum:1,mon0:0,par:null,ast:{h:0,bike:0,car:0,ins:0,mort:0,mortY:0,save:0},lives:[]};
  const all=fbItems(b).concat(b.wsk||[],b.wcur||[]),cb=combos(all),fx={};all.concat(cb.map(c=>({fx:c[3]}))).forEach(x=>{const o=fxP(x.fx);for(const k in o)if(typeof o[k]==='number')fx[k]=(fx[k]||0)+o[k]});
  const ek=fxP(b.el.fx).el,isR=EKEY[ek],K=S.mw.fan=newK(w,{el:isR?pick(Object.keys(EL)):ek,rare:isR?ek:null,sk:RR.sk,org:null,dark:0,rank:30,pow:8});
  K.fx=fx;K.bt={org:b.org,race:b.race,el:b.el,mana:b.mana,omen:b.omen,mark:b.mark,tal:b.tal,curse:b.curse,fam:b.fam,item:b.item,sec:b.sec,cb:cb.map(c=>[c[2],c[3]]),wsk:b.wsk||[],wcur:b.wcur||[]};
  K.pw=Math.max(4,K.pw+(fx.pow||0));S.int=Math.max(1,S.int+(fx.int||0));S.cha=Math.max(1,S.cha+(fx.cha||0));K.mpM=Math.max(5,K.mpM+(fx.mp||0));K.mp=K.mpM;S.maxHp=Math.max(30,S.maxHp+(fx.hp||0));S.hp=S.maxHp;
  S.money=Math.max(0,S.money+(fx.gold||0));K.dark=cl(fx.dark||0,0,100);K.rep=fx.rep||0;K.clue=Math.min(2,Math.max(0,Math.round(fx.clue||0)));K.save=Math.round(fx.save||0);
  if(w==='hero'&&RR.sk==='sword')K.pw+=6;if(w==='hero'&&RR.sk==='shield')S.maxHp+=30;
  K.endY=Math.max(d.a0+12,R(d.end[0],d.end[1])+Math.round(fx.life||0));S.mw.end=K.endY;
  S.focus=fList(K)[0][0];S.key=[`${d.a0} ปี — ${d.ic} ${d.n}`];try{S.era=null}catch(e){}
  try{const fd=$('feed');if(fd)fd.innerHTML=''}catch(e){}
  try{const T=LS.get('murim_mtried',{})||{};if(!T.fan){T.fan=1;LS.set('murim_mtried',T)}}catch(e){}
  say(`${d.ic} <b>${d.n}</b> · ${d.sc} — ${d.d}`,'myth',true);
  feed(`${b.race.ic} ${E(b.race.n)} · ${b.el.ic} ธาตุ${E(b.el.n)} · ${b.mana.ic} มานา${E(b.mana.n)} · 🌟 ${b.tal.map(x=>E(x.n)).join(' / ')}${RR.sk?` · สกิล「${SK[w].find(x=>x[0]===RR.sk)[2]}」`:''}`);
  feed(`⚖️ คำสาป: ${b.curse.ic} ${E(b.curse.n)} · 🐾 ${E(b.fam.n)} · 🎁 ${E(b.item.n)}`);
  if(K.clue)feed(`🗝️ คุณเกิดมาพร้อมเบาะแสลับ ${K.clue}/3 จาก${E(b.sec.t>=3?b.sec.n:'ชะตาที่สุ่มได้')}`);
  cb.forEach(c=>say(`🔗 <b>คอมโบ ${c[2]}</b> — ${fxT(c[3])}`,'epic'));
  if(RR.god){K.god=RR.god;const cr=RR.carry||{};K.earth=cr;
   say(RR.top==='iso'?`⬜ คุณลืมตากลางวงเวทอัญเชิญ ยังจำรสชาติของ${pick(['ชานมไข่มุก','ข้าวมันไก่','มาม่าตอนตีสอง'])}ได้ชัด · ชีวิตก่อน: ${E(cr.n||'')} อายุ ${cr.age||'?'} ปี`:`⬜ วันเกิดปีที่ 12 ความทรงจำชาติก่อนไหลกลับมาทั้งหมด — ชื่อ ${E(cr.n||'')} อายุ ${cr.age||'?'} ปี ตายเพราะ${E(cr.why||'อุบัติเหตุ')}`,'myth',true);
   if(b.wsk&&b.wsk.length)feed(`⬜ สกิลจาก${E(RR.god.n)}: ${b.wsk.map(x=>x.ic+' '+E(x.n)).join(' · ')}`);
   if(b.wcur&&b.wcur.length)feed(`❓ คุณรู้สึกว่ามีบางอย่างติดมาด้วย ${b.wcur.length} อย่าง (ดูได้ใน 📊 สถานะโลก)`);
   if(RR.god.out==='trash')say('🗑️ เทพรำคาญคุณจนโยนสกิลขยะให้ — แต่สกิลขยะในต่างโลกเคยกลายเป็นตำนานมาแล้ว','bad');
   if(RR.god.fake)K.con.push({id:'god',t:'วิญญาณครึ่งหนึ่ง (สัญญากับ "เทพธิดา")',at:age()+R(8,14),paid:0});
   if(RR.god.knew)K.clue=Math.min(2,K.clue+1)}
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
const FCOL={hero:'#6ad8ff',trash:'#9ad86a',magic:'#c39bff',noble:'#ffd37a'};
function hud(K){const d=WD[K.w],m=Math.round(K.mp),mm=Math.round(K.mpM),B=K.bt||{};
 const sk=K.sk?(K.w==='trash'?`🗑️ ${TRUE_SK[K.sk][K.skL-1]} Lv${K.skL}`:`${SK.hero.find(x=>x[0]===K.sk)[1]} ${SK.hero.find(x=>x[0]===K.sk)[2]}`):'';
 const st=d.g==='aca'?(K.f.expelled?'ถูกไล่ออก':K.grad?'จบการศึกษา':`ปี ${Math.max(1,age()-d.a0)} · อันดับ ${K.rank}/60`):(K.w==='hero'?`อันดับผู้กล้า ${K.rank}/30`:K.f.guild?'นักผจญภัยกิลด์':'คนในสลัม');
 const lv=Math.max(1,Math.round(Math.pow(Math.max(1,K.pw)/6,.62))),hp=Math.max(0,Math.round(S.hp)),hm=Math.max(1,Math.round(S.maxHp)),bar=(c,ic,v,M,t)=>`<div class="fhB ${c}"><span>${ic}</span><div class="bar"><i style="width:${cl(v/M*100,0,100)}%"></i></div><span>${t}</span></div>`;
 const ch=[];if(B.race)ch.push(`<span>${B.race.ic} ${E(B.race.n)}</span>`);ch.push(`<span>${K.rare?RARE[K.rare][0]+' '+RARE[K.rare][1]:EL[K.el][0]+' '+EL[K.el][1]}</span>`);if(sk)ch.push(`<span>${sk}</span>`);
 (B.tal||[]).forEach(x=>ch.push(`<span class="${x.t>=5?'t5':x.t>=3?'t4':''}">${x.ic} ${E(x.n)}</span>`));if(B.curse)ch.push(`<span class="c">${B.curse.ic} ${E(B.curse.n)}</span>`);if(B.fam)ch.push(`<span>${B.fam.ic} ${E(B.fam.n)}</span>`);
 if(B.wsk&&B.wsk.length)ch.push(`<span class="t4">⬜ สกิลจากเทพ ×${B.wsk.length}</span>`);if(K.clue)ch.push(`<span class="k">🗝️ ${K.clue}/3</span>`);if(K.save>0)ch.push(`<span class="k">🪽 รอดตาย ×${K.save}</span>`);if(K.con.some(c=>!c.paid))ch.push('<span class="c">📜 สัญญาค้าง</span>');if(K.f.dragon)ch.push('<span class="t4">🐉 มังกรเงิน</span>');
 return `<div class="fhT"><span>◆ STATUS · ${d.ic} ${d.n}</span><span>${d.sc}</span></div><div class="fhR">${E(S.name)}<em>Lv ${lv}</em><small>${st}</small></div>
 ${bar('hp','❤️',hp,hm,`${fmt(hp)}/${fmt(hm)}`)}${bar('mp','💠',m,mm,`${m}/${mm}`)}${K.dark>=10?bar('dk','🌑',K.dark,100,K.dark):''}
 <div class="fhS"><div><b>${fmt(Math.round(S.power||K.pw))}</b>พลัง</div><div><b>${fmt(S.int|0)}</b>ปัญญา</div><div><b>${fmt(S.cha|0)}</b>เสน่ห์</div><div><b>${K.rep}</b>ชื่อเสียง</div></div>
 <div class="fhC">${ch.join('')}</div>`}
{const _py=passYear;passYear=function(){if(window._wrOn)return;if(on()){try{fanYear()}catch(e){console.error('fanYear',e);S.age++;saveGame()}return}return _py.apply(this,arguments)}}
{const _fo=focusOK;focusOK=function(k){if(on())return fList(FN()).some(f=>f[0]===k);if(/^fa_/.test(String(k)))return false;return _fo.apply(this,arguments)}}
{const _af=autoFocus;autoFocus=function(){if(on()){const K=FN(),L=fList(K).map(f=>f[0]);if(S.hp<S.maxHp*.4)S.focus='fa_rest';else if(K.w==='trash'&&K.skL<5&&rnd()<.4)S.focus='fa_sk';else if(school(K)&&rnd()<.5)S.focus='fa_cls';else S.focus=pick(L.filter(x=>x!=='fa_rest'));return}return _af.apply(this,arguments)}}
{const _lm=lifeMax;lifeMax=function(){if(on())return S.mw.end;return _lm.apply(this,arguments)}}
{const _rn=render;render=function(){const r=_rn.apply(this,arguments);try{document.body.classList.toggle('fanW',on());if(!on())return r;fbCss();const K=FN(),fe=$('focus');
 if(fe){const L=fList(K);fe.innerHTML=L.map(f=>`<button class="fc ${S.focus===f[0]?'on':''}" onclick="setFocus('${f[0]}')">${f[1]} ${f[2]}</button>`).join('');if(L.length&&!L.some(f=>f[0]===S.focus))S.focus=L[0][0];
  let h=$('mwHud');if(!h){h=document.createElement('div');h.id='mwHud';fe.parentNode.insertBefore(h,fe)}h.className='fan';h.style.setProperty('--fa',FCOL[K.w]||'#c39bff');h.onclick=()=>window.fanStat();{const top=document.querySelector('#game .box.top');if(top&&h.previousElementSibling!==top)top.insertAdjacentElement('afterend',h)}h.innerHTML=hud(K)}
 {const gm=$('gMini');if(gm)gm.innerHTML=`🪙 ${fmt(S.money||0)} เหรียญทอง · 💠 ${Math.round(K.mp)}`}{const gr=$('gRealm');if(gr)gr.textContent=`${WD[K.w].ic} ${WD[K.w].n}`}
 }catch(e){console.error('fan render',e)}return r}}
window.fanStat=function(){const K=FN();if(!K)return;const L=Object.values(K.npc).map(p=>`<div class="item"><b>${E(p.n)}</b> <span class="tag2">${E(p.role)}${p.alive?'':' · ✝️ หายไป/ตาย'}</span><div class="tag2">ความสัมพันธ์ ${p.aff}/100${p.mem.length?' · จำได้ว่า: '+E(p.mem.slice(-1)[0][1]):''}</div></div>`).join('');
 const B=K.bt||{},it=(lb,x)=>x?`<div class="it"><span class="ic">${x.ic}</span><div><b>${E(x.n)}</b> <span class="tag2">${lb} · ${TN[x.t]}</span><small>${E(x.d)}</small>${fxT(x.fx)?`<i>${fxT(x.fx)}</i>`:''}</div></div>`:'';const BH=B.race?`<div class="fnSt"><h4>🧬 ชะตาที่ติดตัวมา</h4>${it('ชาติกำเนิด',B.org)}${it('เผ่าพันธุ์',B.race)}${it('ธาตุ',B.el)}${it('มานา',B.mana)}${it('ลางตอนเกิด',B.omen)}${it('รอยบนร่าง',B.mark)}${(B.tal||[]).map(x=>it('พรสวรรค์',x)).join('')}${it('คำสาป',B.curse)}${it('ภูตพันธสัญญา',B.fam)}${it('ของติดตัว',B.item)}${it('ความลับ',B.sec)}${(B.wsk||[]).map(x=>it('สกิลจากเทพ',x)).join('')}${(B.wcur||[]).map(x=>it('❓ ของแถมที่เทพแอบใส่',x)).join('')}${(B.cb||[]).map(c=>`<div class="it"><span class="ic">🔗</span><div><b>${c[0]}</b><i>${fxT(c[1])}</i></div></div>`).join('')}</div>`:'';modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📊 ${WD[K.w].ic} ${WD[K.w].n}</h3><p class="tag2">เบาะแสลับ ${K.clue}/3 · ชื่อเสียง ${K.rep} · ความมืด ${K.dark} · อายุขัยราว ${K.endY} ปี</p>${K.con.filter(c=>!c.paid).map(c=>`<div class="item">📜 สัญญาค้าง: ${E(c.t||'ความช่วยเหลือหนึ่งครั้ง')} · ทวงราวอายุ ${c.at}</div>`).join('')}${BH}<h4 style="margin:12px 0 4px">ผู้คนที่จำคุณได้</h4>${L}`,'fanstat')};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('[data-fa]')){const d=document.createElement('div');d.style.cssText='grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:8px';d.setAttribute('data-fa',1);
 d.innerHTML=`<button class="opt" onclick="fanStat()">📊 สถานะโลก<small>ผู้คน สัญญา เบาะแส</small></button><button class="opt" onclick="fanEnds()">📜 ฉากจบ<small>ที่ปลดล็อกแล้ว</small></button>${isIso(FN())?'<button class="opt" onclick="fanCls()">🎒 รายชื่อห้อง<small>เพื่อน 29 คนที่ถูกอัญเชิญมาด้วย</small></button>':''}${isAca(FN())?'<button class="opt" onclick="fanSchool()">🏫 โรงเรียน<small>คะแนนหอ ชมรม อาจารย์</small></button>':''}`;gd.prepend(d)}}}catch(e){}return r}}

// ####################################################################
// ภาค 2: ต่างโลก + อะคาเดมี่ แบบขยาย — เหตุการณ์ไม่ซ้ำ · มินิเกมใหม่ 5 แบบ · เพื่อนร่วมห้อง 29 คน · ความรู้โลกเก่า · ดันเจี้ยน · กระดานเควสต์
//   ฝั่งปีศาจ · ปฏิทินโรงเรียน · ชมรม 8 · อาจารย์ 6 ความลับ · ข่าวลือ · คะแนนหอ · ฝ่ายการเมือง · ชาติก่อน · บทหลักมีทางแยก · ฉากจบใหม่
// ####################################################################
const X2=K=>{if(!K.x2){K.x2={sn:{},av:{},hp:null,club:null,cs:0,cp:0,tch:null,fac:null,cls:null,know:[],gr:0,gp:0,food:0,cal:{},echo:0}}return K.x2};
const isIso=K=>K.w==='hero'||K.w==='trash',isAca=K=>K.w==='magic'||K.w==='noble';
const SEEN=()=>{try{return LS.get('murim_fanseen',{})||{}}catch(e){return{}}};
const markSeen=(K,id)=>{X2(K).sn[id]=1;try{const s=SEEN();s[id]=(s[id]|0)+1;LS.set('murim_fanseen',s)}catch(e){}};
// เลือกเหตุการณ์: ไม่ซ้ำในชีวิตเดียว · ชอบเหตุการณ์ที่ไม่เคยเจอเลยในทุกชีวิตก่อน (น้ำหนัก 3 เท่า)
const pickEv=(K,L)=>{const s=SEEN(),sn=X2(K).sn,C=L.filter(e=>!sn[e.id]&&(!e.ok||e.ok(K)));if(!C.length)return null;let tot=0;const W=C.map(e=>{const w=s[e.id]?1/(1+s[e.id]):3;tot+=w;return w});let r=rnd()*tot;for(let i=0;i<C.length;i++){r-=W[i];if(r<=0)return C[i]}return C[C.length-1]};
const hp2=(K,d)=>{const X=X2(K);if(!X.hp||!X.mine)return'';X.hp[X.mine]=(X.hp[X.mine]|0)+d;return d?` · 🏆 คะแนนหอ ${d>0?'+':''}${d}`:''};

// =================== มินิเกมใหม่ 5 แบบ ===================
const mg2Css=document.createElement('style');mg2Css.textContent=`
.fmgD{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}.fmgD button{padding:14px 6px;border-radius:14px;border:1.5px solid #6a5a3a;background:linear-gradient(#3a2c1c,#1e160e);color:#f4e2c0;font:inherit;font-size:12.5px;line-height:1.35;cursor:pointer}.fmgD button b{display:block;font-size:30px;margin-bottom:4px}
.fmgD button:active{transform:scale(.96)}.fmgHp{font-size:18px;letter-spacing:2px}.fmgLog{font-size:13px;min-height:38px;margin:6px 0;color:#ffe6a8}
.fmgP{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:8px 0}.fmgP button{height:58px;font-size:26px;border-radius:14px;border:1.5px solid #3a7a5a;background:#12261c;color:#fff;cursor:pointer}.fmgP button.lit{background:#7affc0}
.fmgCa{width:120px;height:70px;margin:6px auto;border-radius:0 0 60px 60px;background:#2a2a2a;border:3px solid #555;position:relative;overflow:hidden}.fmgCa i{position:absolute;left:0;right:0;bottom:0;height:70%;transition:background .3s}
.fmgE{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:8px 0}.fmgE button{padding:12px;border-radius:14px;border:1.5px solid #5a4a8a;background:#1c1633;color:#fff;font:inherit;font-size:15px;cursor:pointer}
.fmgT{position:relative;height:46px;margin:14px 6px;border-radius:23px;background:#1c1633;border:1.5px solid #4a3f70;overflow:hidden}.fmgT .z{position:absolute;top:0;bottom:0;left:42%;width:16%;background:#ffd37a55;border-left:2px solid #ffd37a;border-right:2px solid #ffd37a}.fmgT .m{position:absolute;top:6px;width:30px;height:30px;margin-left:-15px;border-radius:50%;background:#ff7ad8;box-shadow:0 0 12px #ff7ad8;font-size:18px;line-height:30px;text-align:center}
.fmgN{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}.fmgN div{padding:8px;border-radius:10px;background:#1c1633;border:1px solid #4a3f70;font-size:14px}
`;document.head.appendChild(mg2Css);
// 4) ดันเจี้ยนสุ่มห้อง: เลือกประตูจากเสียง/กลิ่น/ลม · ลงลึกได้เรื่อยๆ จะออกเมื่อไหร่ก็ได้ · หัวใจหมด = เสียของครึ่งหนึ่ง
let DUN={fl:0,loot:0,art:0};
function mgDungeon(title,maxF,cb){cb=mgW(cb,'luck');DUN={fl:0,loot:0,art:0};
 if(auto){const f=R(2,Math.min(maxF,6));DUN={fl:f,loot:f*R(20,45),art:0};return cb(cl(f/maxF,0,1))}
 const T={chest:['💰','ได้ยินเสียงเหรียญกระทบกัน'],mimic:['💰','ได้ยินเสียงเหรียญ… และเสียงหายใจ'],trap:['🌬️','ลมเย็นพัดออกมาจากใต้ประตู'],stairs:['🌬️','ลมเย็นพัดขึ้นมาจากข้างล่าง'],rest:['🔥','กลิ่นไฟและขนมปังปิ้ง'],mon:['🔥','กลิ่นไหม้และเสียงคำราม'],shrine:['✨','แสงสีทองลอดรอยประตู'],empty:['🕸️','เงียบ ไม่มีอะไรเลย']};
 let hp=3,done=0,fl=1,doors=[],msg='ประตูสามบานรออยู่ตรงหน้า';
 const roll=()=>{const P=[['chest',22],['mimic',8+fl*2],['trap',12+fl*2],['stairs',16],['rest',10],['mon',12+fl*2],['shrine',fl>=5?6:2],['empty',10]];doors=[0,1,2].map(()=>{let s=P.reduce((a,x)=>a+x[1],0)*rnd();for(const x of P){s-=x[1];if(s<=0)return x[0]}return'empty'});if(!doors.includes('stairs'))doors[R(0,2)]='stairs'};
 const fin=()=>{if(done)return;done=1;DUN={fl,loot:Math.round(DUN.loot),art:DUN.art};closeM();cb(cl((fl-1)/maxF+(DUN.loot>0?.1:0),0,1))};
 const draw=()=>{const H=document.getElementById('fmgDun');if(!H)return fin();
  H.innerHTML=`<div class="fmgHp">${'❤️'.repeat(hp)}${'🖤'.repeat(3-hp)} · ชั้น ${fl}/${maxF} · 💰 ${fmt(Math.round(DUN.loot))}</div><div class="fmgLog">${msg}</div>
  <div class="fmgD">${doors.map((d,i)=>`<button onclick="_fdun(${i})"><b>🚪</b>${T[d][0]} ${T[d][1]}</button>`).join('')}</div>
  <div class="fmgB"><button onclick="_fdunX()">🏃 ออกจากดันเจี้ยน (เก็บของที่ได้)</button></div>`};
 window._fdunX=()=>fin();
 window._fdun=i=>{if(done)return;const d=doors[i];let next=false;
  if(d==='chest'){const g=R(15,40)*fl;DUN.loot+=g;msg=`💰 หีบสมบัติ! +${g} เหรียญ`}
  else if(d==='mimic'){if(rnd()<.45+S.power/(S.power+capOf(FN())*2)*.3){const g=R(30,60)*fl;DUN.loot+=g;msg=`📦 มิมิค! คุณฟันมันขาดทันก่อนมันงับ +${g}`}else{hp--;msg='📦 หีบงับแขนคุณ! −❤️'}}
  else if(d==='trap'){if(rnd()<.35){msg='🕳️ พื้นยุบ แต่คุณกระโดดหลบทัน'}else{hp--;msg='🕳️ พื้นยุบ ตกลงบนหนามแหลม −❤️'}}
  else if(d==='stairs'){next=true;msg=`⬇️ บันไดวน ลงไปชั้น ${fl+1}`}
  else if(d==='rest'){if(hp<3)hp++;msg='🔥 กองไฟของนักผจญภัยคนก่อน พักฟื้น +❤️'}
  else if(d==='mon'){const w=rnd()<.55;if(w){const g=R(20,45)*fl;DUN.loot+=g;msg=`👹 สู้กับ${pick(['ออร์กเฝ้าห้อง','แมงมุมยักษ์','อัศวินโครงกระดูก','สไลม์ทองคำ'])}ชนะ +${g}`}else{hp--;msg='👹 มอนสเตอร์แรงกว่าที่คิด −❤️'}}
  else if(d==='shrine'){if(!DUN.art&&rnd()<.5){DUN.art=1;msg='✨ แท่นบูชาโบราณ มีเศษคริสตัลที่สะท้อนท้องฟ้าของ<b>อีกโลกหนึ่ง</b>'}else{DUN.loot+=80*fl;msg='✨ แท่นบูชา ทองคำกองพะเนิน'}}
  else msg='🕸️ ห้องว่าง มีแต่ใยแมงมุมกับรอยเท้าเก่าๆ';
  try{navigator.vibrate&&navigator.vibrate(/−❤️/.test(msg)?70:20)}catch(e){}
  if(hp<=0){DUN.loot*=.5;msg+=' · 💀 คุณหมดแรง ถูกลากออกมา เสียของไปครึ่งหนึ่ง';setTimeout(fin,900);draw();return}
  if(next){fl++;if(fl>maxF){msg='🏆 ถึงก้นดันเจี้ยน!';DUN.loot+=100*maxF;setTimeout(fin,900)}}
  roll();draw()};
 roll();modal(`<div class="fmg"><h3>🗝️ ${title}</h3><div class="tg">เลือกประตูจากเบาะแส · ลงลึกยิ่งได้มาก แต่เสี่ยงขึ้น · ออกเมื่อไหร่ก็ได้</div><div id="fmgDun"></div></div>`,'fanmg');draw()}
// 5) ปรุงยา: จำสูตร (ลำดับวัตถุดิบ + ระดับไฟ) แล้วทำตาม
function mgPotion(title,n,cb){cb=mgW(cb,'rune');if(auto)return cb(autoSc());const ING=['🌿','🍄','🦎','💎','🪶','🩸','🌙','🐚'],COL=['#4caf50','#a0522d','#7cfc00','#4ab0ff','#e0e0ff','#c0102a','#c8b0ff','#ffb3c8'];
 const rec=[];for(let i=0;i<n;i++)rec.push(R(0,7));const heat=R(1,3);let inp=[],stage=0,done=0;
 const H=()=>document.getElementById('fmgPo');
 const fin=sc=>{if(done)return;done=1;setTimeout(()=>{closeM();cb(sc)},600)};
 const view=()=>{const h=H();if(!h)return fin(0);if(stage===0){h.innerHTML=`<div class="tg">จำสูตร! (หายไปใน 3 วินาที)</div><div class="fmgS" style="font-size:30px">${rec.map(i=>ING[i]).join(' → ')} · ${'🔥'.repeat(heat)}</div>`;return}
  const c=inp.length?COL[inp[inp.length-1]]:'#333';
  h.innerHTML=`<div class="fmgCa"><i style="background:${c}"></i></div><div class="fmgS">${inp.map(i=>ING[i]).join(' ')}</div>${stage===1?`<div class="tg">ใส่วัตถุดิบตามลำดับ (${inp.length}/${n})</div><div class="fmgP">${ING.map((g,i)=>`<button onclick="_fpo(${i})">${g}</button>`).join('')}</div>`:`<div class="tg">ไฟแรงแค่ไหน?</div><div class="fmgB">${[1,2,3].map(k=>`<button onclick="_fpoH(${k})">${'🔥'.repeat(k)}</button>`).join('')}</div>`}`};
 window._fpo=i=>{if(done||stage!==1)return;inp.push(i);if(inp.length>=n)stage=2;view()};
 window._fpoH=k=>{if(done)return;let ok=0;rec.forEach((x,i)=>{if(inp[i]===x)ok++});const sc=(ok/n)*.75+(k===heat?.25:0);const h=H();if(h)h.innerHTML+=`<div class="fmgLog">${sc>=.95?'✨ ยาเปล่งแสงสีทอง สมบูรณ์แบบ!':sc>=.6?'🧪 ยาใช้ได้ สีออกมาเกือบถูก':'💥 หม้อเดือดพลุ่งพล่าน ควันดำเต็มห้อง'}</div>`;fin(sc)};
 modal(`<div class="fmg"><h3>⚗️ ${title}</h3><div id="fmgPo"></div></div>`,'fanmg');view();setTimeout(()=>{if(!done){stage=1;view()}},3000)}
// 6) ดวลเวท: ธาตุชนะธาตุ (น้ำ>ไฟ>ลม>ดิน>น้ำ) อ่านท่าทางคู่ต่อสู้ แต่บางคนหลอก
const DUE={fire:['🔥','ไฟ','wind'],water:['💧','น้ำ','fire'],wind:['🌪️','ลม','earth'],earth:['🪨','ดิน','water']};
function mgDuel(title,foe,cb){cb=mgW(cb,'ring');if(auto)return cb(autoSc());let r=0,sc=0,done=0,nx=null,lie=false;const liar=rnd()<.4;
 const TELL={fire:'มือสั่น ฝ่ามือแดงก่ำ',water:'เสื้อคลุมเปียกชื้นขึ้นมาเอง',wind:'ผมปลิวทั้งที่ไม่มีลม',earth:'เท้ายึดพื้นแน่น ฝุ่นลอยรอบตัว'};
 const nxt=()=>{nx=pick(Object.keys(DUE));lie=liar&&rnd()<.45;const shown=lie?pick(Object.keys(DUE).filter(k=>k!==nx)):nx;const t=document.getElementById('fmgDu');if(t)t.innerHTML=`รอบ ${r+1}/3 · ${E(foe)}: <b>${TELL[shown]}</b>${liar&&r>0?' <span class="tag2">(เขาเคยหลอกคุณแล้ว)</span>':''}`};
 window._fdu=k=>{if(done||!nx)return;const win=DUE[k][2]===nx,lose=DUE[nx][2]===k;sc+=win?1:lose?0:.5;const L=document.getElementById('fmgDuL');if(L)L.innerHTML=`คุณ ${DUE[k][0]} vs ${DUE[nx][0]} ${E(foe)} — <b>${win?'ชนะ':lose?'แพ้':'เสมอ'}</b>${lie?' · ท่าทางเมื่อกี้เป็นของปลอม!':''}`;r++;if(r>=3){done=1;setTimeout(()=>{closeM();cb(sc/3)},900)}else nxt()};
 modal(`<div class="fmg"><h3>⚔️ ${title}</h3><div class="tg">💧 ชนะ 🔥 · 🔥 ชนะ 🌪️ · 🌪️ ชนะ 🪨 · 🪨 ชนะ 💧</div><div class="tg" id="fmgDu" style="font-size:14px;color:#f4ecd8;min-height:38px"></div><div class="fmgE">${Object.keys(DUE).map(k=>`<button onclick="_fdu('${k}')">${DUE[k][0]} ${DUE[k][1]}</button>`).join('')}</div><div class="fmgLog" id="fmgDuL"></div></div>`,'fanmg');nxt()}
// 7) เต้นรำ: แตะตอนลูกบอลอยู่ในโซนทอง 8 จังหวะ เร็วขึ้นเรื่อยๆ
function mgDance(title,who,cb){cb=mgW(cb,'ring');if(auto)return cb(autoSc());let b=0,sc=0,x=0,dir=1,sp=1.1,raf=0,done=0;const EM=['💃','🕺','🌹','✨','🎻','💫','👠','🎶'];
 const loop=()=>{const m=document.getElementById('fmgDm');if(!m){cancelAnimationFrame(raf);if(!done){done=1;cb(sc/8)}return}x+=sp*dir;if(x>=100){x=100;dir=-1}if(x<=0){x=0;dir=1}m.style.left=x+'%';raf=requestAnimationFrame(loop)};
 window._fda=()=>{if(done)return;const d=Math.abs(x-50),s=d<3?1:d<8?.7:d<14?.3:0;sc+=s;b++;sp+=.28;const L=document.getElementById('fmgDaL'),m=document.getElementById('fmgDm');if(m)m.textContent=EM[b%8];if(L)L.innerHTML=`จังหวะ ${b}/8 · ${s>=1?'เป๊ะ! '+E(who)+'ยิ้ม':s>=.7?'ดี':s>0?'เกือบ':'เหยียบเท้า'+E(who)+'!'}`;try{navigator.vibrate&&navigator.vibrate(s>=.7?15:50)}catch(e){}if(b>=8){done=1;cancelAnimationFrame(raf);setTimeout(()=>{closeM();cb(sc/8)},500)}};
 modal(`<div class="fmg"><h3>💃 ${title}</h3><div class="tg">แตะ "ก้าว" ตอนลูกบอลอยู่ในโซนทอง · คู่เต้น: ${E(who)}</div><div class="fmgT"><div class="z"></div><div class="m" id="fmgDm">💃</div></div><div class="fmgLog" id="fmgDaL">จังหวะ 0/8</div><div class="fmgB"><button onclick="_fda()" style="min-width:180px;font-size:18px">👣 ก้าว</button></div></div>`,'fanmg');loop()}
// 8) จำตราตระกูล: ดู 4 ตรา 4 วินาที แล้วตอบว่าตราไหนตระกูลไหน
const CREST=[['🦁','เลออนฮาร์ท'],['🦅','อาควิลา'],['🐍','เซอร์เพนเทีย'],['🌹','โรซาลีน'],['🐺','วูล์ฟแกรม'],['🦌','เซอร์วิน'],['⚓','มาริเนอร์'],['🌙','ลูเนเวล'],['🗝️','คีย์สโตน'],['🐉','เดรเกน']];
function mgNames(title,cb){cb=mgW(cb,'read');if(auto)return cb(autoSc());const S4=shuf(CREST).slice(0,4);let q=0,sc=0,done=0,Q=shuf(S4);
 const H=()=>document.getElementById('fmgNa');
 const ask=()=>{const h=H();if(!h)return;if(q>=4){done=1;h.innerHTML=`<div class="fmgLog">${sc>=4?'👑 จำได้ทุกตระกูล ขุนนางทั้งโต๊ะประทับใจ':sc>=2?'🙂 จำได้บางส่วน':'😰 เรียกชื่อผิดตระกูล ทั้งโต๊ะเงียบกริบ'}</div>`;setTimeout(()=>{closeM();cb(sc/4)},900);return}
  const c=Q[q],opts=shuf([c[1],...shuf(S4.filter(x=>x!==c)).slice(0,2).map(x=>x[1])]);h.innerHTML=`<div class="tg">ข้อ ${q+1}/4 · ตรานี้ของตระกูลไหน?</div><div style="font-size:46px">${c[0]}</div><div class="fmgB">${opts.map(o=>`<button onclick="_fna('${o}')">${o}</button>`).join('')}</div>`;window._fnaC=c[1]};
 window._fna=o=>{if(done)return;if(o===window._fnaC)sc++;q++;ask()};
 modal(`<div class="fmg"><h3>🛡️ ${title}</h3><div id="fmgNa"><div class="tg">จำให้ได้! (4 วินาที)</div><div class="fmgN">${S4.map(c=>`<div>${c[0]} ${c[1]}</div>`).join('')}</div></div></div>`,'fanmg');setTimeout(ask,4000)}

// =================== ⚔️ ต่างโลก: เพื่อนร่วมห้อง 29 คน ===================
const CLN=['ภูมิ','มิว','เจได','ฟ้าใส','ต้นกล้า','พิม','บอส','แพรว','โอม','น้ำหวาน','เก่ง','ปาล์ม','ไอซ์','เฟิร์น','ไบรท์','ข้าวหอม','ก้อง','มายด์','ตั้ม','แบม','กันต์','ปิ่น','เต้ย','อิงฟ้า','นนท์','จูน','ภีม','ใบเตย','ซัน','แป้ง','ธาม','มุก','ฟลุ๊ค','เอิร์น'];
const CSK=['นักดาบศักดิ์สิทธิ์','ปราชญ์แห่งไฟ','ผู้ฝึกสัตว์อสูร','นักบุญรักษา','จอมโจรเงา','ช่างตีเหล็กเทพ','จอมเวทน้ำแข็ง','ผู้อ่านใจ','นักปรุงยา','อัศวินเงา','นักร้องเพลงศึก','นักธนูลม','ผู้ประเมิน','ผู้อัญเชิญภูต','นักเจรจา','ไม่มีสกิล','ผู้คุมพืช','นักค้าขาย','หมอผี','ผู้ทนทาน'];
const CFATE=[['dead','💀','ตายในดันเจี้ยนชั้น '+0,K=>`ตายในดันเจี้ยนชั้น ${R(8,40)} ศพถูกส่งกลับมาในกล่องไม้ที่เล็กเกินไป`],['lord','🏰','',()=>`ได้เป็นเจ้าเมืองชายแดน ${pick(['ทางเหนือ','ริมทะเลทราย','ที่ภูเขาไฟ'])}`],['demon','😈','',()=>'หนีไปอยู่ฝั่งปีศาจ มีคนเห็นเขาสวมเกราะดำนำทัพ'],['wed','💍','',()=>`แต่งงานกับ${pick(['เจ้าหญิงแคว้นข้างเคียง','ลูกสาวพ่อค้ารวยที่สุดในเมือง','เอลฟ์ที่อายุ 300 ปี'])}`],['shop','🍜','',()=>`เปิดร้าน${pick(['ราเมง','ชานมไข่มุก','ข้าวมันไก่','ร้านเกม'])}ในเมืองหลวง คนต่อคิวยาวสามช่วงตึก`],['saint','🙏','',()=>'ได้รับการประกาศเป็นนักบุญโดยโบสถ์ ทั้งที่เขาไม่เคยสวดมนต์'],['lost','❓','',()=>'หายตัวไปกลางทาง เหลือแค่รองเท้านักเรียนข้างหนึ่ง'],['back','🌀','',()=>'หายไปสามปีแล้วกลับมา จำอะไรไม่ได้ นอกจากพูดซ้ำว่า "ประตูอยู่ใต้ทะเล"'],['war','⚔️','',()=>`ได้เป็นแม่ทัพหน่วย${pick(['หน้า','ทลวง','เงา'])} ฆ่าคนไปแล้วเป็นร้อย`],['home','🏠','',()=>'อ้างว่าหาทางกลับบ้านเจอ แล้วก็หายไปจริงๆ ไม่มีใครรู้ว่าสำเร็จหรือตาย']];
function clsInit(K){const X=X2(K);if(X.cls||!isIso(K))return;const used=new Set([npc(K,'rival').n,npc(K,'pal').n,String(S.name||'').split(' ')[0]]);X.cls=[{n:npc(K,'rival').n,sk:'นักดาบศักดิ์สิทธิ์',st:'ok',t:'',id:'rival'},{n:npc(K,'pal').n,sk:pick(CSK),st:'ok',t:'',id:'pal'}];
 for(const n of shuf(CLN)){if(X.cls.length>=29)break;if(used.has(n))continue;used.add(n);X.cls.push({n,sk:pick(CSK),st:'ok',t:''})}}
function clsNews(K){const X=X2(K);if(!X.cls)return;const L=X.cls.filter(c=>c.st==='ok'&&!c.id);if(!L.length)return;const c=pick(L),f=pick(CFATE);c.st=f[0];c.t=f[3](K);c.at=age();
 feed(`🎒 ข่าวเพื่อนร่วมห้อง: <b>${E(c.n)}</b> (${E(c.sk)}) ${c.t}`);
 if(f[0]==='demon')X.dem=(X.dem||[]).concat(c.n);
 if(f[0]==='back'&&K.clue<3&&rnd()<.4)later(K,R(1,3),'x2back',{n:c.n});
 if(f[0]==='shop')X.food++;}
window.fanCls=function(){const K=FN();if(!K||!X2(K).cls)return;const X=X2(K),ic={ok:'🙂',dead:'💀',lord:'🏰',demon:'😈',wed:'💍',shop:'🍜',saint:'🙏',lost:'❓',back:'🌀',war:'⚔️',home:'🏠'};const alive=X.cls.filter(c=>!/dead|lost|home/.test(c.st)).length;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🎒 รายชื่อห้อง ม.5/3 (ถูกอัญเชิญ 30 คน)</h3><p class="tag2">ยังอยู่ ${alive}/29 คน · คุณคือคนที่ 30</p>${X.cls.map(c=>`<div class="item" style="padding:7px 10px"><b>${ic[c.st]||'🙂'} ${E(c.n)}</b> <span class="tag2">${E(c.sk)}</span>${c.t?`<div class="tag2">${E(c.t)}${c.at?` · ตอนคุณอายุ ${c.at}`:''}</div>`:''}</div>`).join('')}`,'fancls')};
function evReunion(K){const X=X2(K);if(!X.cls)return;const alive=X.cls.filter(c=>!/dead|lost|home/.test(c.st));const dem=alive.filter(c=>c.st==='demon');
 C('🍻 งานเลี้ยงรุ่นในต่างโลก',`มีคนส่งจดหมายเขียนด้วยภาษาไทยมาหาคุณ "เลี้ยงรุ่น ม.5/3 ครบ ${age()-16} ปีที่ถูกอัญเชิญ" มาได้ ${alive.length} จาก 29 คน${dem.length?` · ${E(dem[0].n)}มาในชุดเกราะดำ ทุกคนแกล้งทำเป็นไม่เห็น`:''}`,[
  O('🥂 ดื่มให้คนที่ไม่ได้มา',()=>{S.cha=(S.cha||0)+4;feed(`🥂 ทุกคนยกแก้วให้เพื่อนที่จากไป ${X.cls.filter(c=>c.st==='dead').map(c=>E(c.n)).slice(0,4).join(', ')||'— ยังไม่มีใครตาย'} คืนนั้นร้องเพลงชาติไทยกันทั้งร้าน`+rep(3))},'',.4),
  O('🕯️ เล่าความจริงเรื่องวงเวท',()=>{if((K.f.truth|0)>=2||K.clue>=1){K.f.clsTruth=1;feed('🕯️ ห้องเงียบ แล้วมีคนเริ่มเล่าว่าเขาก็เห็นอะไรแปลกๆ เหมือนกัน เพื่อนสิบคนสาบานว่าจะช่วยคุณ'+(K.clue<3?clue(K,'เพื่อน 10 คนจำวันอัญเชิญได้ไม่ตรงกัน'):''))}else feed('🕯️ ไม่มีใครเชื่อ เพราะคุณยังไม่มีหลักฐานอะไรเลย'+rep(-2))},'ต้องมีข้อมูล',.3),
  ...(dem.length?[O(`⚔️ ท้าดวล${E(dem[0].n)}`,()=>duel(dem[0].n,Math.round(S.power*(1+rnd()*.3)),w=>{if(w){dem[0].st='dead';dem[0].t='ตายด้วยมือเพื่อนร่วมห้องในงานเลี้ยงรุ่น';feed('⚔️ คุณชนะ เขายิ้มก่อนสิ้นใจ "ดีแล้วที่เป็นนาย"'+rep(10)+dark(6))}else feed('⚔️ เขาไม่ฆ่าคุณ แค่วางแก้วแล้วเดินออกไป'+hurt(.3))}),'ต่อสู้',.3)]:[])])}

// =================== 💡 ความรู้โลกเก่า ===================
const KNOW={
 soap:['🧼','สบู่','ต้มไขมันกับขี้เถ้า โรคระบาดในเมืองลดลงครึ่งหนึ่ง',K=>{rep(6);heal(.2)},'soapguild'],
 mayo:['🥚','มายองเนส','ขุนนางทั้งเมืองติดใจ ร้านอาหารต่อแถวขอสูตร',K=>{money(300);X2(K).food++},'mayowar'],
 num:['🔢','เลขอารบิก','พ่อค้าคิดบัญชีเร็วขึ้นสิบเท่า สมาคมพ่อค้ายกคุณเป็นที่ปรึกษา',K=>{S.int=(S.int||0)+8;money(200)},'numtax'],
 gun:['💥','ดินปืน','ดินประสิว กำมะถัน ถ่าน ระเบิดครั้งแรกทำกำแพงเมืองพังหนึ่งด้าน',K=>{K.pw+=capOf(K)*.3;K.f.gun=1;dark(10)},'gunwar'],
 print:['📰','แท่นพิมพ์','ใบปลิวหนึ่งพันใบในคืนเดียว ทุกคนอ่านเรื่องเดียวกันพร้อมกัน',K=>{rep(8);K.f.print=1},'printrev'],
 vacc:['💉','วัคซีน','หนองฝีวัวในเข็มไม้ เด็กทั้งหมู่บ้านรอดจากฝีดาษ',K=>{rep(12);S.karma=(+S.karma||0)+20},'vaccchurch'],
 ramen:['🍜','ราเมง','ซุปกระดูกต้มสิบสองชั่วโมง เส้นทำมือ ทหารยามเลิกงานมาต่อแถว',K=>{money(250);X2(K).food++},'ramenking'],
 glass:['👓','แว่นตา','เลนส์ฝนจากคริสตัล นักบวชแก่ๆ อ่านหนังสือได้อีกครั้ง',K=>{money(180);aff(K,'priest',10)},'glasspriest'],
 ball:['⚽','ฟุตบอล','ลูกบอลจากกระเพาะหมู ทั้งเมืองเตะกันทุกเย็น',K=>{S.cha=(S.cha||0)+6;rep(5)},'league'],
 bike:['🚲','จักรยาน','ไม้กับเหล็กดัด ส่งจดหมายเร็วกว่าม้า',K=>{money(220);K.f.bike=1},'bikenet']};
function evKnow(K){const X=X2(K);const L=shuf(Object.keys(KNOW).filter(k=>!X.know.includes(k))).slice(0,3);if(!L.length)return;
 C('💡 ความรู้จากโลกเดิม',`คืนหนึ่งคุณนั่งนึกถึงวิชาในห้องเรียนที่ไม่เคยตั้งใจฟัง แล้วรู้ตัวว่าโลกนี้ยังไม่มีสิ่งเหล่านี้ · นำเข้าแล้ว ${X.know.length}/10`,
  L.map(k=>{const d=KNOW[k];return O(`${d[0]} ${d[1]}`,()=>{X.know.push(k);d[3](K);say(`${d[0]} <b>คุณสร้าง${d[1]}ขึ้นในต่างโลก</b> — ${d[2]}`,'epic');later(K,R(3,6),'x2know',{k})},'',.33)}))}
const KNOWL={soapguild:K=>feed('🧼 สมาคมผู้ผลิตเทียนไขฟ้องศาลว่าสบู่ของคุณ "ทำลายอาชีพ" ศาลตัดสินให้คุณชนะ เพราะผู้พิพากษาเองก็ใช้สบู่ของคุณ'+money(200)),
 mayowar:K=>C('🥚 สงครามมายองเนส','ตระกูลขุนนางสองตระกูลทะเลาะกันว่าใครได้สิทธิ์ขายมายองเนสแต่เพียงผู้เดียว ทั้งคู่ส่งคนมาขอซื้อสูตรจากคุณ',[O('💰 ขายให้ฝ่ายที่จ่ายมากกว่า',()=>feed('💰 รวยขึ้นมาก ฝ่ายที่แพ้จ้างคนมาตามคุณ'+money(800)+dark(4))),O('📢 แจกสูตรให้ทุกคน',()=>{X2(K).food++;feed('📢 มายองเนสกลายเป็นของทุกบ้าน ชาวบ้านเรียกคุณว่า "ท่านไข่"'+rep(10))})]),
 numtax:K=>feed('🔢 กรมคลังใช้เลขอารบิกเก็บภาษีได้แม่นยำขึ้น ชาวนาเก็บภาษีเพิ่มขึ้นสองเท่า และรู้ว่าใครเป็นคนสอน'+rep(-6)),
 gunwar:K=>C('💥 ดินปืนในสงคราม','ราชาสั่งผลิตดินปืนหนึ่งหมื่นถัง ปีศาจหนึ่งพันตนตายในวันเดียว พร้อมหมู่บ้านมนุษย์สามหมู่บ้านที่อยู่ผิดที่',[O('😶 รับเหรียญตรา',()=>feed('😶 คุณได้เหรียญทองคำ และฝันเห็นหมู่บ้านทุกคืน'+money(500)+dark(12))),O('🔥 เผาสูตรทิ้ง',()=>{K.f.gun=0;feed('🔥 คุณเผาโรงงาน ทหารจับคุณขังสามเดือน แต่สูตรหายไปจากโลก'+rep(-4)+hurt(.2))})]),
 printrev:K=>C('📰 ใบปลิวของประชาชน','ใบปลิวจากแท่นพิมพ์ของคุณเริ่มมีข้อความต่อต้านราชา ทหารกำลังตามหาว่าใครเป็นเจ้าของแท่นพิมพ์',[O('✊ พิมพ์ต่อ',()=>{K.f.rev=1;feed('✊ ชาวเมืองรวมตัวหน้าวัง ราชายอมลดภาษี'+rep(15)+aff(K,'king',-25))}),O('🤐 ทุบแท่นพิมพ์',()=>feed('🤐 คุณทุบแท่นพิมพ์เอง ชาวบ้านเรียกคุณว่าคนขี้ขลาด'+rep(-5)))]),
 vaccchurch:K=>feed('💉 โบสถ์ประกาศว่าวัคซีนคือ "เลือดวัวของปีศาจ" แต่บิชอปแอบส่งลูกตัวเองมาฉีดตอนกลางคืน'+aff(K,'priest',-10)+rep(5)),
 ramenking:K=>{X2(K).food++;feed('🍜 ราชาเสด็จมาที่ร้านราเมงโดยปลอมตัว แล้วกลับมาอีกทุกสัปดาห์'+aff(K,'king',15)+money(300))},
 glasspriest:K=>feed(`👓 นักบวชแก่ใส่แว่นแล้วอ่านคัมภีร์อัญเชิญได้ชัดเป็นครั้งแรกในรอบยี่สิบปี เขาหน้าซีดแล้วเผาหน้าหนึ่งทิ้งต่อหน้าคุณ`+(K.clue<3?clue(K,'คัมภีร์อัญเชิญหน้าที่ถูกเผามีชื่อคุณ'):'')),
 league:K=>feed('⚽ เกิดลีกฟุตบอลแห่งชาติ ทีมของเมืองหลวงใช้ชื่อตามคุณ'+rep(8)),
 bikenet:K=>feed('🚲 เครือข่ายส่งจดหมายด้วยจักรยานครอบคลุมทั้งแคว้น ข่าวทุกอย่างผ่านมือคุณก่อน'+money(250)+rep(3))};

// =================== 📋 กระดานเควสต์กิลด์ ===================
const GR=['F','E','D','C','B','A','S'];
const QST=[['🐀','กำจัดหนูในห้องเก็บไวน์','หนูพวกนี้พูดได้ และมันขอให้คุณช่วยหนีจากแมวของเจ้าของ',0],['🐺','ล่าฝูงหมาป่าที่กินแกะ','หมาป่าหิวเพราะมีใครสักคนล่ากวางในป่าจนหมด — ผู้ว่าจ้างเอง',1],['📦','คุ้มกันเกวียนสินค้า','ในเกวียนไม่ใช่สินค้า เป็นเด็กที่ถูกลักพาตัว',2],['👻','ไล่ผีในคฤหาสน์','ผีคือเจ้าของบ้านตัวจริง ผู้ว่าจ้างคือคนที่ฆ่าเขา',2],['🐉','สำรวจถ้ำมังกรร้าง','ถ้ำไม่ร้าง มังกรแค่นอนหลับมาสามร้อยปี',3],['👑','ตามหาแหวนของเจ้าหญิง','เจ้าหญิงโยนแหวนทิ้งเองเพราะไม่อยากแต่งงาน',3],['🏰','ยึดป้อมโจรภูเขา','โจรเป็นทหารที่ถูกวังทิ้งไว้ไม่จ่ายเงินมาสิบปี',4],['🌋','ปิดรอยแยกปีศาจ','รอยแยกเปิดจากฝั่งมนุษย์ ไม่ใช่ฝั่งปีศาจ',5]];
function evQuest(K){const X=X2(K),L=shuf(QST.filter(q=>q[3]<=X.gr+1)).slice(0,3);if(!L.length)return;
 C('📋 กระดานเควสต์กิลด์',`ระดับป้ายของคุณ <b>${GR[X.gr]}</b> · แต้มกิลด์ ${X.gp}/${(X.gr+1)*3} · ทุกเควสต์มีเรื่องที่ผู้ว่าจ้างไม่ได้บอก`,L.map(q=>O(`${q[0]} [${GR[Math.min(6,q[3])]}] ${q[1]}`,()=>{const ep=threat(K)*(.7+q[3]*.18);
  C(`${q[0]} ${q[1]}`,`ระหว่างทำเควสต์ คุณพบว่า: <b>${q[2]}</b>`,[
   O('📜 ทำตามสัญญา',()=>{if(fight(ep)){X.gp+=1+Math.floor(q[3]/2);feed(`📜 เควสต์สำเร็จ${money(R(40,90)*(q[3]+1))}${dark(q[3]>=2?4:1)}`)}else feed('📜 เควสต์ล้มเหลว'+hurt(.25));qUp(K)},'ได้เงิน',.4),
   O('⚖️ ทำสิ่งที่ถูก',()=>{if(rnd()<.6+(S.int|0)/400){X.gp+=1;feed(`⚖️ คุณแก้ปัญหาที่ต้นเหตุ ผู้ว่าจ้างโกรธ แต่คนทั้งเมืองรู้เรื่อง${rep(6)}${money(R(10,30))}`)}else feed('⚖️ ผู้ว่าจ้างฟ้องกิลด์ คุณถูกหักแต้ม'+rep(2));qUp(K)},'ชื่อเสียง',.4),
   O('💰 ขายความลับให้คนที่จ่ายมากกว่า',()=>{feed('💰 คุณได้เงินสองต่อ และเริ่มมีชื่อในตลาดมืด'+money(R(80,160)*(q[3]+1))+dark(8));qUp(K)},'',.2)])},'',.33)))}
function qUp(K){const X=X2(K);if(X.gp>=(X.gr+1)*3&&X.gr<6){X.gp=0;X.gr++;say(`📋 <b>ป้ายกิลด์เลื่อนเป็นระดับ ${GR[X.gr]}</b>${X.gr>=5?' — นักผจญภัยระดับนี้ในแคว้นมีไม่ถึงสิบคน':''}`,'epic');K.rep+=X.gr*2}}

// =================== 😈 ฝั่งปีศาจ ===================
function evDemonOffer(K){K.f.dmOff=1;C('🦇 ทูตจากแดนปีศาจ',`ค้างคาวตัวหนึ่งกลายร่างเป็นหญิงสาวผมเทาบนขอบหน้าต่าง "ท่านราชาปีศาจรู้ว่าท่าน${K.f.spare?'ปล่อยเด็กหูยาวไป':'ไม่ได้อยากอยู่ที่นี่'} ฝั่งเราไม่มีวงเวทที่หลอกใช้คน มีแค่ที่ว่างหนึ่งที่สำหรับผู้กล้า"`,[
 O('🖤 ไปกับเธอ',()=>{K.f.demonSide=1;dark(15);aff(K,'demon',30);aff(K,'king',-50);say('🖤 คุณข้ามแม่น้ำดำในคืนเดือนมืด ผู้กล้าของมนุษย์หายไปหนึ่งคน ผู้กล้าของปีศาจเพิ่มขึ้นหนึ่งคน','myth',true);later(K,R(2,4),'x2hunt')},'ทางที่ไม่มีวันกลับ',.3),
 O('🕊️ ขอเป็นสะพานระหว่างสองฝ่าย',()=>{K.f.peace=(K.f.peace|0)+1;feed('🕊️ เธอหัวเราะ "งั้นท่านต้องเหนื่อยเป็นสองเท่า" แล้วทิ้งขนปีกไว้หนึ่งเส้นเป็นเครื่องหมาย')},'',.4),
 O('🗡️ จับตัวส่งวัง',()=>{rep(8);aff(K,'king',10);feed('🗡️ เธอไม่ขัดขืน ตอนถูกลากไปเธอพูดว่า "ท่านจะเสียใจในอีกสามปี"'+dark(5));later(K,3,'x2dmRev')},'',.3)])}

// =================== 🗝️ ผลดันเจี้ยน ===================
function dunRun(K,title,maxF){mgDungeon(title,maxF,sc=>{const d=DUN;let t=`🗝️ ${title}: ลงถึงชั้น ${d.fl}${money(d.loot)}`;if(d.fl>=3)t+=pw(capOf(K)*.03*d.fl);if(d.art&&!K.f.portal){K.f.portal=1;t+=' · ✨ ได้<b>เศษคริสตัลที่สะท้อนท้องฟ้าอีกโลก</b>';if(K.clue<3&&isIso(K))t+=clue(K,'ใต้ดันเจี้ยนลึกมีช่องมองไปยังโลกเดิม')}if(isAca(K))t+=hp2(K,Math.round(sc*40));feed(t)})}

// =================== 🏫 อะคาเดมี่: คะแนนหอ ===================
const HOUSES={magic:{red:['🔥','เพลิงแดง'],blue:['🌊','ม่านคราม'],green:['🌿','รากหยก'],shadow:['🌑','เงาเงิน']},noble:{rose:['🌹','สภากุหลาบ'],lion:['🦁','สภาสิงห์'],eagle:['🦅','สภาอินทรี'],snake:['🐍','สภาอสรพิษ']}};
function hpInit(K){const X=X2(K);if(X.hp||!isAca(K))return;const H=HOUSES[K.w];X.hp={};for(const k in H)X.hp[k]=0;X.mine=K.w==='magic'?(K.f.house||null):pick(Object.keys(H));if(K.w==='noble')feed(`🏛️ คุณถูกจัดเข้า${H[X.mine][0]} <b>${H[X.mine][1]}</b> — สภาที่${{rose:'ลูกขุนนางเก่าครองมาสามร้อยปี',lion:'อัศวินทุกคนเคยอยู่',eagle:'ทูตและนักการทูตจบออกไป',snake:'ไม่มีใครอยากอยู่ แต่ทุกคนกลัว'}[X.mine]}`)}
function hpYearEnd(K){const X=X2(K);if(!X.hp)return;if(!X.mine&&K.f.house)X.mine=K.f.house;if(!X.mine)return;const H=HOUSES[K.w];for(const k in X.hp)if(k!==X.mine)X.hp[k]+=R(60,190);
 const win=Object.keys(X.hp).sort((a,b)=>X.hp[b]-X.hp[a])[0];
 if(win===X.mine){say(`🏆 <b>${H[win][0]} ${H[win][1]} ชนะถ้วยประจำปี!</b> ผ้าคลุมสีของหอคุณแขวนเต็มห้องโถง${rep(4)}${money(80)}`,'epic');X.cup=(X.cup|0)+1}
 else feed(`🏆 ถ้วยประจำปีเป็นของ${H[win][0]} ${H[win][1]} · หอของคุณได้ ${X.hp[X.mine]} แต้ม`);for(const k in X.hp)X.hp[k]=0}

// =================== 📅 ปฏิทินโรงเรียน ===================
const CAL={
 fest:['🎪','เทศกาลหอ','ซุ้มของหอต้องชนะซุ้มอื่น — ร่ายวงเวทประดับให้สวยที่สุด',(K,cb)=>mgRing('ร่ายวงเวทประดับซุ้ม',cb)],
 ball:['💃','งานเต้นรำประจำปี','เต้นกับคนที่ทั้งโรงเรียนจับตามอง',(K,cb)=>mgDance('งานเต้นรำประจำปี',npc(K,K.w==='noble'?pick(['prince','lady']):'pal').n,cb)],
 dun:['🗝️','ทัศนศึกษาดันเจี้ยน','ครูพาลงดันเจี้ยนฝึกหัด แต่ปีนี้มีประตูที่ไม่อยู่ในแผนที่',(K,cb)=>mgDungeon('ทัศนศึกษาดันเจี้ยน',5,cb)],
 duel:['⚔️','กีฬาสีเวท','ดวลเวทตัวแทนหอ ต่อหน้าทั้งโรงเรียน',(K,cb)=>mgDuel('กีฬาสีเวท รอบชิง',npc(K,'rival').n,cb)],
 pot:['⚗️','ประกวดปรุงยา','กรรมการชิมยาของทุกคน และคนที่แล้วยังนอนห้องพยาบาลอยู่',(K,cb)=>mgPotion('ประกวดปรุงยา',4,cb)],
 star:['🔭','คืนดูดาว','ทั้งชั้นปีขึ้นหอดูดาว ดาวดวงหนึ่งกะพริบเป็นจังหวะ',(K,cb)=>mgRune('ถอดจังหวะดาวกะพริบ',5,cb)],
 tea:['🫖','งานน้ำชาของเจ้าหญิง','ต้องจำตราและชื่อทุกตระกูลบนโต๊ะ ห้ามผิดแม้แต่ตระกูลเดียว',(K,cb)=>mgNames('จำตราตระกูลในงานน้ำชา',cb)],
 deb:['🎙️','ดีเบตสภานักเรียน','ฝ่ายตรงข้ามคือคนที่ไม่เคยแพ้ดีเบต',(K,cb)=>mgRead('ดีเบตสภานักเรียน',npc(K,'rival').n,cb)]};
function evCal(K){const X=X2(K),y=age()-WD[K.w].a0;if(X.cal[y])return;X.cal[y]=1;const pool=Object.keys(CAL).filter(k=>K.w==='noble'||k!=='tea');const L=shuf(pool).slice(0,3);
 C(`📅 ปีการศึกษาที่ ${y}`,`ปีนี้มีงานใหญ่สามงาน แต่คุณทุ่มได้งานเดียว · หอของคุณ: ${X.hp&&X.mine?HOUSES[K.w][X.mine].join(' '):'—'}`,L.map(k=>{const c=CAL[k];return O(`${c[0]} ${c[1]}`,()=>c[3](K,sc=>{const pts=Math.round(sc*120);let t=`${c[0]} ${c[1]}: <b>${grade(sc)}</b>${hp2(K,pts)}`;
  if(sc>=.9){t+=rep(5);if(k==='star'&&K.clue<3&&!K.f.star13){K.f.star13=1;t+=clue(K,'ดาวดวงที่ 13 กะพริบเป็นชื่อคนที่หายไป')}if(k==='ball'&&K.w==='noble')aff(K,'prince',6);if(k==='dun'&&DUN.art)K.f.portal=1}
  else if(sc<.3){t+=rep(-2);if(k==='pot')t+=hurt(.15)}
  feed(t)}),c[2],.33)}))}

// =================== 🎭 ชมรม 8 ชมรม (เรื่องย่อยชมรมละ 3 ตอน) ===================
const CLUB={
 astro:['🔭','ชมรมดูดาวต้องห้าม','ห้องชมรมอยู่บนยอดหอที่ถูกปิดมาสี่สิบปี',[
  K=>C('🔭 ดาวที่ไม่มีในแผนที่','ประธานชมรมชี้กล้องไปที่ดาวดวงหนึ่ง "ดวงนี้ไม่มีในแผนที่ดาวเล่มไหน และมันขยับเข้ามาใกล้ทุกปี"',[O('📐 คำนวณวงโคจร',()=>mgRune('คำนวณวงโคจร',5,sc=>{K.f.astro=(K.f.astro|0)+(sc>.6?2:1);feed(`📐 ${sc>.6?'วงโคจรของมันวนรอบโลกนี้ ไม่ใช่ดวงอาทิตย์':'ตัวเลขไม่ลงตัว แต่คุณจดไว้หมด'}`)}),'มินิเกม'),O('🙈 ไม่อยากรู้',()=>feed('🙈 คุณกลับไปนอน แต่คืนนั้นดาวดวงนั้นสว่างจนส่องเข้าหน้าต่าง'))]),
  K=>C('🔭 ประธานชมรมหายตัว','ประธานชมรมหายไปจากหอดูดาว เหลือแค่สมุดที่หน้าสุดท้ายเขียนว่า "มันไม่ใช่ดาว มันคือตา"',[O('📖 อ่านสมุดต่อ',()=>{K.f.astro=(K.f.astro|0)+1;feed('📖 สมุดบันทึกพิกัดที่ดาวดวงนั้นหันมามอง ทุกพิกัดคือที่ที่มีคนหายตัว'+dark(4))}),O('📢 บอกอาจารย์',()=>feed('📢 อาจารย์ปิดชมรมทันที และขอสมุดคืน'+rep(2)))]),
  K=>C('🔭 คืนที่ดาวลืมตา','ดาวดวงนั้นสว่างที่สุดในรอบพันปี ชมรมเหลือคุณคนเดียว',[O('👁️ มองกลับไป',()=>{if((K.f.astro|0)>=3){K.f.starEnd=1;feed('👁️ ดาวกะพริบช้าๆ เหมือนจำคุณได้ คุณรู้สึกว่าได้รับเชิญไปที่ไหนสักแห่ง'+(K.clue<3?clue(K,'ดาวดวงนั้นคือดวงตาของสิ่งที่สร้างโลกนี้'):''))}else feed('👁️ แสงแรงจนตาพร่าไปสามวัน'+hurt(.15))}),O('🪟 ปิดม่าน',()=>feed('🪟 คุณปิดม่าน ข้างนอกมีเสียงเหมือนใครถอนหายใจ'))])]],
 news:['📰','หนังสือพิมพ์โรงเรียน','กระดาษหนึ่งแผ่นต่อสัปดาห์ที่ทุกคนกลัว',[
  K=>C('📰 ข่าวแรก','บรรณาธิการให้คุณเลือกข่าวหน้าหนึ่ง',[O('🍲 โรงอาหารใช้เนื้ออะไร',()=>{K.f.news=(K.f.news|0)+1;feed('🍲 คำตอบคือเนื้อกริฟฟินแก่ โรงอาหารเปลี่ยนเมนูทั้งเดือน'+rep(3))}),O(`💌 ใครแอบรัก${N(K,K.w==='noble'?'prince':'rival').replace(/<[^>]+>/g,'')}`,()=>{K.f.news=(K.f.news|0)+1;feed('💌 ทั้งโรงเรียนอ่าน คนในข่าวไม่คุยกับคุณอีกเลย'+rep(5)+aff(K,K.w==='noble'?'prince':'rival',-8))})]),
  K=>C('📰 ข่าวที่ถูกห้ามพิมพ์','มีคนส่งเอกสารมาใต้ประตูห้องชมรม: บัญชีเงินบริจาคที่หายไปจากโรงเรียน',[O('🖨️ พิมพ์ทันที',()=>{K.f.news=(K.f.news|0)+2;if(K.w==='noble')K.f.evid=(K.f.evid|0)+1;feed('🖨️ ฉบับนั้นถูกเก็บจนหมดภายในชั่วโมง แต่สำเนาหนึ่งใบไปถึงราชสำนัก'+rep(6)+dark(2))}),O('🔎 สืบก่อน',()=>{K.f.news=(K.f.news|0)+1;feed('🔎 ลายมือในเอกสารเหมือนลายมือของอาจารย์คนหนึ่ง')})]),
  K=>C('📰 ฉบับสุดท้ายก่อนจบ','บรรณาธิการส่งต่อตำแหน่งให้คุณ และกุญแจตู้เอกสารที่ไม่เคยถูกเปิด',[O('🗃️ เปิดตู้',()=>{K.f.press=(K.f.news|0)>=3?1:0;feed('🗃️ ข้างในคือข่าวที่บรรณาธิการทุกรุ่นไม่กล้าพิมพ์ ร้อยปีของความลับ'+(K.f.press?' · คุณรู้ว่าจะทำอะไรต่อหลังเรียนจบ':''))}),O('🔒 ส่งกุญแจคืน',()=>feed('🔒 บางเรื่องปล่อยให้มันอยู่ในตู้'))])]],
 cook:['🍳','ชมรมทำอาหารใต้หอ','ห้องครัวลับที่แม่ครัวโรงเรียนแกล้งทำเป็นไม่รู้',[
  K=>C('🍳 ซุปแรก','รุ่นพี่ให้คุณต้มซุปจากของที่เหลือในครัว',[O('🧪 ปรุงแบบนักเวท',()=>mgPotion('ต้มซุปให้รุ่นพี่',3,sc=>{X2(K).food++;feed(`🍳 ซุป${sc>.7?'อร่อยจนรุ่นพี่ร้องไห้':'กินได้ ถ้าไม่หายใจ'}`)}),'มินิเกม'),O('🍞 ทำของง่ายๆ',()=>feed('🍞 ขนมปังปิ้งกระเทียม ทั้งชมรมเงียบแล้วขอเพิ่ม'))]),
  K=>C('🍳 แม่ครัวโรงเรียนป่วย','แม่ครัวป่วยกะทันหัน นักเรียนสามร้อยคนไม่มีข้าวเย็น',[O('🔥 ทำอาหารให้ทั้งโรงเรียน',()=>{X2(K).food++;feed('🔥 คืนนั้นทั้งโรงเรียนกินสตูว์ของชมรม อธิการบดีกินสองชาม'+rep(8)+hp2(K,60))}),O('🚪 ปล่อยให้ผู้ใหญ่จัดการ',()=>feed('🚪 นักเรียนกินขนมปังแข็งกับน้ำ'))]),
  K=>C('🍳 สูตรลับของรุ่นก่อน','สมุดสูตรเก่าในครัวมีสูตรหนึ่งชื่อ "อาหารที่ทำให้คนตายแล้วกลับมากินอีกคำ"',[O('👩‍🍳 ลองทำ',()=>{X2(K).food+=2;K.endY+=3;feed('👩‍🍳 ไม่มีใครตายกลับมา แต่ทุกคนที่กินรู้สึกเด็กลงสามปี · อายุขัย +3')}),O('📕 เก็บสูตรไว้',()=>feed('📕 คุณเก็บสมุดไว้ใต้หมอนจนจบ'))])]],
 duel:['⚔️','ชมรมดวลเวทใต้ดิน','ไม่มีกฎ ไม่มีครูดู ไม่มีใครฟ้อง',[
  K=>C('⚔️ คืนแรกในสังเวียน','คู่ต่อสู้คนแรกคือรุ่นพี่ที่ไม่เคยแพ้',[O('⚔️ ดวล',()=>mgDuel('ดวลใต้ดิน',`รุ่นพี่${pick(['ตาเดียว','หน้าบาก','ผมแดง'])}`,sc=>{K.pw+=capOf(K)*.05*(1+sc);feed(`⚔️ ${sc>=.6?'คุณชนะ ทั้งห้องใต้ดินเงียบ':'คุณแพ้ แต่รุ่นพี่ยื่นมือดึงคุณลุก'}`)}),'มินิเกม'),O('👀 แค่ดูก่อน',()=>feed('👀 คุณดูจนจำท่าได้สามท่า'))]),
  K=>C('⚔️ เดิมพันใหญ่','มีคนเสนอเงินให้คุณแพ้ในไฟต์คืนวันศุกร์',[O('💰 รับเงิน',()=>feed('💰 คุณล้มในยกแรก คนที่เดิมพันกับคุณจำหน้าคุณได้'+money(300)+dark(5))),O('🔥 ชนะให้ดู',()=>mgDuel('ไฟต์คืนวันศุกร์','นักดวลรับจ้าง',sc=>feed(sc>=.6?'🔥 คุณชนะ คนจ้างหายไปจากโรงเรียน'+rep(4):'🔥 แพ้จริงๆ ทั้งที่ไม่ได้รับเงิน'+hurt(.2))),'มินิเกม')]),
  K=>C('⚔️ ราชาสังเวียน','ประธานชมรมคนเก่าจบไป ทุกคนมองมาที่คุณ',[O('👑 รับตำแหน่ง',()=>{K.pw+=capOf(K)*.15;K.f.duelKing=1;feed('👑 คุณเป็นราชาของห้องใต้ดิน มีคนเรียกชื่อคุณในทางเดินด้วยความกลัว'+rep(5))}),O('🚪 ยุบชมรม',()=>feed('🚪 คุณปิดห้องใต้ดิน คนเจ็บน้อยลงแต่คนเกลียดคุณมากขึ้น'+rep(-2)))])]],
 music:['🎻','ชมรมดนตรี','เปียโนในห้องชมรมเล่นเองตอนตีสาม',[
  K=>C('🎻 เพลงที่ไม่มีใครแต่ง','โน้ตเพลงไม่มีชื่อวางอยู่บนเปียโน',[O('🎹 เล่นดู',()=>mgDance('เล่นเพลงไม่มีชื่อ','เปียโน',sc=>{K.f.song=(K.f.song|0)+1;feed(`🎹 ${sc>.6?'ไฟในห้องหรี่ลงตามจังหวะ':'คุณเล่นผิดตัวหนึ่ง เปียโนปิดฝาเอง'}`)}),'มินิเกม'),O('🔥 เผาโน้ต',()=>feed('🔥 โน้ตไม่ไหม้'))]),
  K=>C('🎻 คอนเสิร์ตกลางภาค','ชมรมได้เล่นในงานกลางภาค และเพลงไม่มีชื่อถูกบรรจุไว้ในรายการโดยไม่มีใครใส่',[O('🎼 เล่นตามรายการ',()=>{K.f.song=(K.f.song|0)+1;feed('🎼 คนดูทั้งห้องหลับพร้อมกันกลางเพลง แล้วตื่นมาจำความฝันเดียวกันได้'+(K.clue<3&&rnd()<.4?clue(K,'ทุกคนฝันถึงห้องที่ 13'):''))}),O('🎵 เปลี่ยนเพลง',()=>feed('🎵 เปียโนเล่นเพลงนั้นต่อเอง'+rep(-2)))]),
  K=>C('🎻 คนแต่งเพลง','คุณเจอชื่อคนแต่งเพลงในทะเบียนนักเรียนเมื่อร้อยปีก่อน สถานะ: ไม่จบการศึกษา',[O('🎶 เล่นเพลงให้เขาฟังจนจบ',()=>{K.f.songDone=1;feed('🎶 เปียโนเงียบเป็นครั้งแรกในรอบร้อยปี มีเสียงปรบมือเบาๆ จากห้องว่าง'+rep(3)+(S.karma=(+S.karma||0)+10,''))}),O('📜 เก็บเพลงไว้เป็นของคุณ',()=>{K.mpM+=20;feed('📜 คุณเล่นเพลงนี้ได้คนเดียวในโลก ทุกครั้งที่เล่นมานาไหลเข้าตัว · มานาสูงสุด +20'+dark(3))})])]],
 garden:['🌿','ชมรมสวนพฤกษ์','เรือนกระจกที่มีป้าย "ห้ามให้อาหารต้นไม้หลังมืด"',[
  K=>C('🌿 ต้นไม้หิว','ต้นไม้ในกระถางที่คุณดูแลกินหนูไปตัวหนึ่ง',[O('🐀 ให้กินต่อ',()=>{K.f.plant=(K.f.plant|0)+1;feed('🐀 มันโตเร็วจนต้องย้ายกระถางสองครั้ง')}),O('✂️ ตัดแต่ง',()=>feed('✂️ มันกัดนิ้วคุณ'+hurt(.05)))]),
  K=>C('🌿 นักเรียนหาย','นักเรียนปีหนึ่งหายตัวไปใกล้เรือนกระจก ต้นไม้ของคุณสูงขึ้นอีกสองเมตร',[O('🔍 ตรวจรากต้นไม้',()=>{if((K.f.plant|0)>=1){feed('🔍 เด็กนอนหลับอยู่ในรากต้นไม้ ปลอดภัย ต้นไม้แค่อยากได้เพื่อน'+rep(5))}else feed('🔍 เด็กหลงอยู่ในตู้เก็บกระถาง')}),O('🪓 โค่นต้นไม้ทิ้ง',()=>feed('🪓 ต้นไม้ร้องไห้เป็นยางสีแดง เด็กคลานออกมาจากราก'+dark(4)))]),
  K=>C('🌿 ดอกไม้ร้อยปี','ต้นไม้ออกดอกครั้งเดียวในรอบร้อยปี ดอกเดียวรักษาโรคได้ทุกโรค',[O('🌸 เก็บไว้ใช้เอง',()=>{K.save=(K.save|0)+1;feed('🌸 คุณตากดอกไม้แห้งไว้ในสมุด · รอดตาย +1')}),O('🎁 มอบให้ห้องพยาบาล',()=>feed('🎁 เด็กสามคนรอดจากไข้ปีศาจ'+rep(8)+hp2(K,50)))])]],
 drama:['🎭','ชมรมละคร','ตู้หน้ากากที่ไม่มีใครกล้าเปิด',[
  K=>C('🎭 บทแรก','คุณได้บทนำในละครเรื่องใหม่ แต่บทเปลี่ยนเองทุกคืน',[O('🎭 เล่นตามบทใหม่',()=>mgRead('ซ้อมบทที่เปลี่ยนเอง','ผู้กำกับ',sc=>{K.f.mask=(K.f.mask|0)+1;feed(`🎭 ${sc>.6?'คุณเล่นได้เหมือนเกิดมาเพื่อบทนี้':'คุณลืมบทกลางเวที แต่คนดูคิดว่าตั้งใจ'}`)}),'มินิเกม'),O('📜 ขอบทเดิม',()=>feed('📜 ผู้กำกับยิ้ม "ไม่มีบทเดิม"'))]),
  K=>C('🎭 หน้ากากที่พูดได้','หน้ากากในตู้กระซิบชื่อคุณตอนคุณซ้อมคนเดียว',[O('😶 สวมดู',()=>{K.f.mask=(K.f.mask|0)+1;feed('😶 คนในกระจกไม่ใช่คุณ แต่ทำท่าตามคุณได้ช้ากว่านิดหนึ่ง'+dark(4)+(K.w==='noble'&&K.clue<3?clue(K,'หน้ากากในชมรมละครเป็นของชายสวมหน้ากาก'):''))}),O('🔒 ล็อกตู้',()=>feed('🔒 ตู้เปิดเองในคืนถัดมา'))]),
  K=>C('🎭 รอบปฐมทัศน์','ละครเรื่องสุดท้ายก่อนจบ คนดูแถวหน้าสุดไม่มีเงา',[O('🎬 เล่นให้จบ',()=>{feed('🎬 เสียงปรบมือดังไปสามนาทีจากเก้าอี้ว่าง'+rep(6)+hp2(K,70))}),O('🚪 หยุดการแสดง',()=>feed('🚪 ไฟดับ พอไฟติด เก้าอี้แถวหน้าว่างเปล่า'))])]],
 ghost:['👻','ชมรมล่าผี','สมาชิกสามคน หนึ่งในนั้นอาจไม่ใช่คน',[
  K=>C('👻 ห้องน้ำชั้นสาม','ลือกันว่ามีเด็กร้องไห้ในห้องน้ำชั้นสาม',[O('🕯️ เข้าไปคุยด้วย',()=>{K.f.ghost=(K.f.ghost|0)+1;feed('🕯️ เธอไม่ได้ร้องไห้ เธอหัวเราะ เพราะไม่มีใครกล้าคุยกับเธอมาห้าสิบปี')}),O('🧂 โรยเกลือ',()=>feed('🧂 เสียงร้องไห้หยุด แล้วย้ายไปห้องน้ำชั้นสี่'))]),
  K=>C('👻 สมาชิกคนที่สาม','คุณเพิ่งสังเกตว่าสมาชิกชมรมคนที่สามไม่เคยกินข้าว และไม่มีชื่อในทะเบียน',[O('❓ ถามตรงๆ',()=>{K.f.ghost=(K.f.ghost|0)+1;feed('❓ เขายิ้ม "ฉันรอให้มีคนถามมาสามสิบปี" แล้วเล่าเรื่องห้องที่ไม่มีประตู'+(K.clue<3?clue(K,'วิญญาณนักเรียนทุกคนติดอยู่ในโรงเรียน'):''))}),O('🤫 แกล้งไม่รู้',()=>feed('🤫 เขาเดินมาส่งคุณที่หอทุกคืน'))]),
  K=>C('👻 ปลดปล่อย','ชมรมพบวิธีส่งวิญญาณในโรงเรียนไปสู่สุคติ แต่ต้องใช้มานาของคุณทั้งหมด',[O('✨ ทำพิธี',()=>{K.mp=0;K.f.ghostFree=1;S.karma=(+S.karma||0)+25;feed('✨ แสงสีเงินลอยขึ้นจากทุกห้อง นับได้สองร้อยดวง โรงเรียนเงียบสนิทเป็นครั้งแรก'+rep(8))}),O('🌙 ปล่อยให้อยู่ต่อ',()=>feed('🌙 วิญญาณบางดวงโบกมือให้คุณจากหน้าต่าง'))])]]};
function evClubPick(K){const X=X2(K);X.club='-';const L=shuf(Object.keys(CLUB)).slice(0,4);C('🎭 งานรับสมัครชมรม','ทุกชมรมตั้งโต๊ะเรียงในลานกลาง เลือกได้ชมรมเดียว',L.map(k=>{const c=CLUB[k];return O(`${c[0]} ${c[1]}`,()=>{X.club=k;X.cs=0;feed(`${c[0]} คุณเข้า<b>${c[1]}</b> — ${c[2]}`)},'',.25)}).concat([O('🚶 ไม่เข้าชมรม',()=>{X.club=null;feed('🚶 คุณใช้เวลาว่างนอนกลางวัน')},'',.1)]))}
function evClubStep(K){const X=X2(K),c=CLUB[X.club];if(!c||X.cs>=3)return;const i=X.cs++;c[3][i](K)}

// =================== 👩‍🏫 อาจารย์ 6 คน ความลับคนละเรื่อง ===================
const TCH=[['ประวัติศาสตร์','ไม่เคยแก่ลงเลยในรูปถ่ายรุ่นเมื่อห้าสิบปีก่อน','เป็นนักเรียนที่หายไปเมื่อห้าสิบปีก่อน และติดอยู่ในอายุเดิม',1],['ปรุงยา','ชอบชิมยาพิษทุกขวดที่นักเรียนทำ','เป็นปีศาจที่ถูกผนึกไว้ให้สอนหนังสือแทนโทษประหาร',0],['ดาบ','มีแผลเป็นรูปมงกุฎที่หลังมือ','เป็นราชวงศ์เก่าที่ถูกโค่นล้ม',1],['ดาราศาสตร์','นอนตอนกลางวัน ตื่นตอนกลางคืนเท่านั้น','เคยมองดาวดวงที่ 13 นานเกินไป ตาข้างหนึ่งเป็นของมันแล้ว',1],['มารยาท','รู้ชื่อเล่นตอนเด็กของนักเรียนทุกคน','เป็นสายลับของราชสำนัก รายงานทุกอย่างที่นักเรียนพูด',0],['ภาษารูน','พูดภาษาที่ไม่มีใครรู้จักตอนละเมอ','มาจากโลกอื่น เหมือนผู้กล้าที่ถูกอัญเชิญ',1],['เวทรักษา','รักษาทุกคนได้ ยกเว้นตัวเอง','กำลังจะตายภายในปีนี้ และไม่บอกใคร',0],['ดนตรี','ไม่ยอมเข้าใกล้เปียโนในห้องชมรม','คือคนแต่งเพลงไม่มีชื่อ และเป็นวิญญาณครึ่งตัว',1]];
function tchInit(K){const X=X2(K);if(X.tch||!isAca(K))return;const ln=new Set();X.tch=shuf(TCH).slice(0,6).map(t=>{let n=nm();for(let i=0;i<12&&ln.has(n.split(' ')[1]);i++)n=nm();ln.add(n.split(' ')[1]);return{n,s:t[0],h:t[1],sec:t[2],cl:t[3],a:0,rv:0}})}
function tchVisit(K){const X=X2(K);if(!X.tch)return;const L=X.tch.filter(t=>!t.rv&&!t.gone);if(!L.length){feed('👩‍🏫 คุณรู้ความลับของอาจารย์ทุกคนแล้ว พวกเขามองคุณต่างไปจากเดิม');return}const t=pick(L);t.a++;S.int=(S.int||0)+R(1,3);
 feed(`👩‍🏫 ช่วยอาจารย์${E(t.n)} (วิชา${t.s}) ยกของหลังเลิกเรียน · สังเกตเห็นว่าเขา${t.h} · ความสนิท ${t.a}/3`);if(t.a>=3)queue(()=>tchReveal(K,t))}
function tchReveal(K,t){const X=X2(K);t.rv=1;X.tr=(X.tr|0)+1;C(`👩‍🏫 ความลับของอาจารย์${E(t.n)}`,`คืนหนึ่งคุณเห็นกับตาว่าอาจารย์${E(t.n)} <b>${t.sec}</b> · เขารู้ว่าคุณเห็น`,[
 O('🤐 เก็บเป็นความลับ',()=>{K.yrS+=20;feed(`🤐 อาจารย์${E(t.n)}พยักหน้าครั้งเดียว ตั้งแต่วันนั้นคะแนนวิชา${t.s}ของคุณไม่เคยต่ำกว่าเต็ม`+(t.cl&&K.clue<3?clue(K,`อาจารย์${t.s}รู้ทางไปห้องที่ไม่มีประตู`):''))},'',.4),
 O('📢 เปิดโปง',()=>{t.gone=1;feed(`📢 อาจารย์${E(t.n)}หายไปจากโรงเรียนในคืนนั้น`+rep(6)+dark(3));if(rnd()<.4)later(K,R(4,8),'x2tchRev',{n:t.n})},'',.3),
 O('🤝 ช่วยเขา',()=>{S.karma=(+S.karma||0)+10;K.pw+=capOf(K)*.08;feed(`🤝 คุณช่วยอาจารย์${E(t.n)}แบกความลับนั้น เขาสอนเวทที่ไม่อยู่ในหลักสูตรให้คุณเป็นการตอบแทน`)},'',.3)])}
window.fanSchool=function(){const K=FN();if(!K)return;const X=X2(K),H=HOUSES[K.w];
 const hp=X.hp?Object.keys(X.hp).map(k=>`<div class="item" style="padding:6px 10px;${k===X.mine?'border-color:#ffd37a':''}">${H[k][0]} ${H[k][1]} <b style="float:right">${X.hp[k]}</b></div>`).join(''):'';
 const cl=X.club&&CLUB[X.club]?`<div class="item">${CLUB[X.club][0]} <b>${CLUB[X.club][1]}</b> <span class="tag2">ตอน ${X.cs}/3</span></div>`:'<div class="tag2">ยังไม่ได้เข้าชมรม</div>';
 const tc=(X.tch||[]).map(t=>`<div class="item" style="padding:6px 10px"><b>${E(t.n)}</b> <span class="tag2">วิชา${t.s}${t.gone?' · หายไปแล้ว':''}</span><div class="tag2">${t.rv?'🔓 '+t.sec:`🔒 ${t.a?t.h:'ยังไม่สนิท'} (${t.a}/3)`}</div></div>`).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏫 ${WD[K.w].sc}</h3><h4 style="margin:6px 0">🏆 คะแนนหอปีนี้ ${X.cup?`<span class="tag2">· ชนะถ้วย ${X.cup} ครั้ง</span>`:''}</h4>${hp}<h4 style="margin:10px 0 4px">🎭 ชมรม</h4>${cl}<h4 style="margin:10px 0 4px">👩‍🏫 อาจารย์ (รู้ความลับ ${X.tr|0}/6)</h4>${tc}${X.fac?`<h4 style="margin:10px 0 4px">👑 ฝ่าย</h4><div class="item">${FAC[X.fac][0]} ${FAC[X.fac][1]}</div>`:''}`,'fansch')};

// =================== 🗣️ กระดานข่าวลือ ===================
function evRumor(K){const X=X2(K);if(rnd()<.5){const tg=pick(K.w==='noble'?['rival','prince','lady']:['rival','pal']);
 C('🗣️ กระดานข่าวลือ','กระดาษแผ่นเล็กๆ ปลิวว่อนทั่วโรงเรียนทุกเช้า ใครเขียนอะไรลงไป ทุกคนเชื่อครึ่งหนึ่ง',[
  O(`✍️ ปล่อยข่าวลือเรื่อง${npc(K,tg).n}`,()=>mgRead('แต่งข่าวลือให้คนเชื่อ','ฝูงชนในโรงอาหาร',sc=>{if(sc>=.6){aff(K,tg,-15);mem(K,tg,'โดนคุณปล่อยข่าวลือ');feed(`✍️ ข่าวลือว่า${E(npc(K,tg).n)}${pick(['แอบกลัวความมืด','ลอกการบ้านมาตลอด','เขียนกลอนรักให้อาจารย์'])}แพร่ไปทั้งโรงเรียน`+dark(3))}else feed('✍️ ทุกคนจำได้ว่าลายมือนี้เป็นของคุณ'+rep(-4))}),'มินิเกม',.3),
  O('🔍 สืบว่าใครเขียน',()=>{feed(`🔍 คนเขียนข่าวลือส่วนใหญ่คือ${pick(['สาวใช้ประจำหอ','ประธานนักเรียน','อาจารย์มารยาท','แมวของภารโรง'])}`);if(K.w==='noble')K.f.evid=(K.f.evid|0)+(rnd()<.3?1:0)},'',.4),
  O('🚶 ไม่ยุ่ง',()=>feed('🚶 คุณเดินผ่านกระดาน'),'',.3)])}
 else C('🗣️ ข่าวลือเรื่องคุณ',`เช้านี้ทั้งโรงเรียนกระซิบกันว่าคุณ${pick(['เป็นลูกนอกสมรสของปีศาจ','โกงข้อสอบเข้า','แอบคบกับคนสองคนพร้อมกัน','เคยฆ่าคนมาแล้ว'])}`,[
  O('🎭 ปฏิเสธต่อหน้าทุกคน',()=>mgRead('ปฏิเสธข่าวลือกลางโรงอาหาร','ฝูงชน',sc=>feed(sc>=.6?'🎭 ทุกคนเชื่อคุณ และหันไปจับผิดคนปล่อยข่าวแทน'+rep(4):'🎭 ยิ่งปฏิเสธ ยิ่งมีคนเชื่อ'+rep(-4))),'มินิเกม',.4),
  O('🔥 ปล่อยข่าวกลับ',()=>feed('🔥 สงครามข่าวลือกินเวลาทั้งเทอม ไม่มีใครชนะ'+dark(5)),'',.3),
  O('😌 ยิ้มรับ',()=>{S.cha=(S.cha||0)+3;feed('😌 คุณยิ้มรับทุกข่าว คนเริ่มกลัวว่ามันอาจเป็นเรื่องจริง')},'',.3)])}

// =================== 👑 ฝ่ายการเมือง (โลกแห่งอะคาเดมี่) ===================
const FAC={prince:['🤴','ฝ่ายองค์ชาย','คนรุ่นใหม่ อยากเปิดสถาบันให้คนธรรมดา'],duke:['🦅','ฝ่ายดยุก','เงิน ทหาร และแผนการที่ไม่มีใครรู้ทั้งหมด'],church:['⛪','ฝ่ายโบสถ์','ศรัทธาของคนทั้งแผ่นดิน และหอจดหมายเหตุที่เก่าที่สุด']};
function evFac(K){const X=X2(K);X.fac='-';C('👑 สามฝ่ายในสถาบัน','ทุกนักเรียนปีสองต้องเลือกข้าง ไม่เลือกก็คือเลือก',Object.keys(FAC).map(k=>O(`${FAC[k][0]} ${FAC[k][1]}`,()=>{X.fac=k;feed(`${FAC[k][0]} คุณเข้า<b>${FAC[k][1]}</b> — ${FAC[k][2]}`);if(k==='prince')aff(K,'prince',10);if(k==='duke')dark(4);if(k==='church')K.endY+=2},FAC[k][2],.33)).concat([O('🚶 อยู่ตรงกลาง',()=>{X.fac=null;feed('🚶 ทั้งสามฝ่ายมองคุณเหมือนศัตรู')},'',.1)]))}
function evFacTask(K){const X=X2(K),f=X.fac;if(!FAC[f])return;X.ft=(X.ft|0)+1;const T={
 prince:['🤴 ภารกิจของฝ่ายองค์ชาย','องค์ชายขอให้คุณร่างกฎหมายให้เด็กยากจนเข้าเรียนได้ ต้องผ่านดีเบตในสภาขุนนาง',()=>mgRead('ดีเบตในสภาขุนนาง','ขุนนางอาวุโส',sc=>{K.f.facPt=(K.f.facPt|0)+(sc>.6?2:1);feed(sc>.6?'🤴 สภาผ่านร่างกฎหมาย เด็กยากจนร้อยคนได้ที่นั่งในสถาบัน'+rep(8):'🤴 ร่างถูกตีตก แต่องค์ชายจำได้ว่าคุณสู้')})],
 duke:['🦅 ภารกิจของฝ่ายดยุก','ดยุกขอให้คุณขนกล่องไม้สามใบผ่านด่านทหารโดยไม่ถูกตรวจ',()=>{if(rnd()<.6+(S.int|0)/300){K.f.facPt=(K.f.facPt|0)+2;feed('🦅 คุณผ่านด่านได้ ในกล่องคือดาบหนึ่งร้อยเล่ม ดยุกยิ้มเป็นครั้งแรก'+money(400)+dark(8))}else feed('🦅 ทหารเปิดกล่อง คุณวิ่งหนีทันแต่ชื่อเริ่มติดบัญชี'+rep(-6))}],
 church:['⛪ ภารกิจของฝ่ายโบสถ์','บิชอปให้คุณถอดรหัสคัมภีร์ต้องห้ามในหอจดหมายเหตุ',()=>mgRune('ถอดรหัสคัมภีร์ต้องห้าม',6,sc=>{K.f.facPt=(K.f.facPt|0)+(sc>.6?2:1);feed(sc>.6?'⛪ คัมภีร์บอกว่าราชวงศ์ปัจจุบันไม่ใช่สายเลือดจริง บิชอปเก็บมันใส่กล่องเหล็ก'+(K.clue<3?clue(K,'ราชวงศ์ปัจจุบันไม่ใช่สายเลือดจริง'):''):'⛪ คุณอ่านได้ครึ่งเดียว แต่ครึ่งนั้นก็ทำให้นอนไม่หลับ')})]}[f];
 C(T[0],T[1],[O('✅ รับภารกิจ',T[2],'',.6),O('❌ ปฏิเสธ',()=>{K.f.facPt=(K.f.facPt|0)-1;feed('❌ คนในฝ่ายเริ่มนินทาว่าคุณไม่จริงใจ')},'',.4)])}
function evBetroth(K){K.f.btOff=1;const X=X2(K),g=S.gender==='หญิง'?'m':'f',n=nm(g),fac=FAC[X.fac]?FAC[X.fac][1]:'ตระกูลใหญ่';
 C('💍 การหมั้นหมายทางการเมือง',`${fac}เสนอให้คุณหมั้นกับ<b>${E(n)}</b> ทายาทตระกูลที่${pick(['รวยที่สุดทางใต้','คุมกองทัพเรือ','ถือกุญแจคลังหลวง'])} คุณไม่เคยคุยกับเขาเกินสามประโยค`,[
  O('💍 ตกลง',()=>{S.spouse=n;try{S.sp=mkLover(n,'คู่หมั้นทางการเมือง',{wed:false,age:S.age})}catch(e){}K.f.betroth=1;K.f.facPt=(K.f.facPt|0)+2;feed('💍 งานหมั้นจัดใหญ่โตที่สุดของปี ในคืนนั้นเขากระซิบว่า "ฉันก็ไม่ได้อยากหมั้นเหมือนกัน เราเป็นพันธมิตรกันได้ไหม"'+money(600))},'',.4),
  O('❤️ ขอเลือกคนที่รักเอง',()=>{K.f.facPt=(K.f.facPt|0)-2;aff(K,'lady',8);feed('❤️ ฝ่ายของคุณโกรธ แต่หัวใจคุณยังเป็นของคุณ'+rep(-3))},'',.4),
  O('🎭 แกล้งรับแล้วถอนหมั้นทีหลัง',()=>{K.f.facPt=(K.f.facPt|0)+1;later(K,2,'x2breakup',{n});feed('🎭 คุณยิ้มรับแหวน และเริ่มวางแผนวันถอนหมั้น'+dark(5))},'',.2)])}

// =================== 🎲 เหตุการณ์สุ่มชุดใหม่ (กันซ้ำ) ===================
const RE2=[
 {id:'iStat',ok:isIso,f:K=>C('📊 หน้าต่างสถานะผิดปกติ','เช้านี้หน้าต่างสถานะของคุณแสดงค่าพลังเป็นเลข 9999 ทุกช่อง และมีบรรทัดใหม่ว่า「ผู้ดูแลระบบ: กำลังตรวจสอบ」',[O('📸 จำตัวเลขไว้',()=>feed('📸 ตอนเที่ยงตัวเลขกลับเป็นเหมือนเดิม แต่คุณจำบรรทัดสุดท้ายได้'+(K.clue<3&&rnd()<.4?clue(K,'มีคนดูแลหน้าต่างสถานะของผู้กล้าทุกคน'):''))),O('😤 ตะโกนใส่หน้าต่าง',()=>{K.pw+=capOf(K)*.05;feed('😤 หน้าต่างสั่นแล้วขึ้นข้อความ「ขออภัยในความไม่สะดวก」 · พลังเพิ่มขึ้นนิดหน่อยเป็นค่าชดเชย')})])},
 {id:'iCoffee',ok:isIso,f:K=>C('☕ เมล็ดกาแฟในตลาดเอลฟ์','พ่อค้าเอลฟ์ขายเมล็ดสีน้ำตาลเข้มที่ "ใช้ไล่ความง่วงของพ่อมด" คุณได้กลิ่นแล้วน้ำตาจะไหล นี่มันกาแฟ',[O('☕ ซื้อทั้งกระสอบแล้วเปิดร้าน',()=>{X2(K).food++;feed('☕ ร้านกาแฟแห่งแรกในต่างโลกมีคิวยาวตั้งแต่ตีห้า ทหารยามติดกาแฟทั้งกรม'+money(250))}),O('🫖 ชงดื่มเงียบๆ คนเดียว',()=>{heal(.3);K.home=cl((K.home|0)+10,0,100);feed('🫖 กลิ่นนี้คือเช้าวันจันทร์ที่บ้าน คุณนั่งนิ่งไปนาน')})])},
 {id:'iSlime',ok:isIso,f:K=>C('🟢 สไลม์ตามกลับบ้าน','สไลม์สีเขียวขนาดเท่าหมอนตามคุณมาจากทุ่ง มันกินขยะทุกอย่างในห้อง แล้วนอนขดอยู่ปลายเตียง',[O('🏠 เลี้ยงไว้ ตั้งชื่อให้',()=>{K.f.slime=1;feed(`🟢 คุณตั้งชื่อมันว่า "${pick(['หมูเด้ง','วุ้นเส้น','เยลลี่','ป๊อปปี้'])}" มันกระโดดดีใจจนเพดานเปียก`);S.cha=(S.cha||0)+2}),O('🧺 ขายให้นักปรุงยา',()=>feed('🧺 ได้เงินมาจำนวนหนึ่ง คืนนั้นห้องเงียบผิดปกติ'+money(60)))])},
 {id:'iPhone',ok:isIso,f:K=>C('📱 มือถือติดหนึ่งขีด','ฟ้าผ่ากลางพายุ มือถือที่ตายไปนานสั่นขึ้นมา มีสัญญาณหนึ่งขีด และข้อความที่ยังไม่ได้อ่าน 1,204 ข้อความ',[O('💬 อ่านข้อความจากแม่',()=>{K.home=cl((K.home|0)+25,0,100);feed('💬 ข้อความล่าสุด: "ลูกกลับมากินข้าวนะ แม่ทำแกงเขียวหวานไว้ทุกวัน" แบตหมดก่อนคุณจะพิมพ์ตอบ')}),O('📤 พิมพ์ส่งออกไปหนึ่งข้อความ',()=>{K.f.sent=1;feed('📤 คุณพิมพ์ว่า "ยังไม่ตาย" ข้อความขึ้นว่า "ส่งแล้ว" ก่อนจอดับ'+(K.clue<3&&rnd()<.5?clue(K,'สัญญาณจากโลกเดิมเข้ามาตอนฟ้าผ่าเท่านั้น'):''))}),O('📍 เปิดแผนที่',()=>feed('📍 จุดสีฟ้าของคุณอยู่กลางทะเลไทย ห่างจากชายฝั่งพัทยาสามกิโล'))])},
 {id:'iSong',ok:isIso,f:K=>C('🎤 เพลงไทยในโรงเตี๊ยม','คนในโรงเตี๊ยมขอให้นักเดินทางร้องเพลงบ้านเกิดคนละเพลง ถึงตาคุณแล้ว',[O('🎤 ร้องเพลงลูกทุ่ง',()=>mgDance('ร้องเพลงลูกทุ่งกลางโรงเตี๊ยม','คนทั้งร้าน',sc=>{S.cha=(S.cha||0)+Math.round(sc*8);feed(sc>.6?'🎤 สามเดือนต่อมา ทั้งเมืองฮัมเพลงที่ไม่มีใครเข้าใจความหมาย'+money(120):'🎤 คีย์หลุดตั้งแต่ท่อนแรก แต่ทุกคนปรบมือให้ความกล้า')}),'มินิเกม'),O('🤐 ขอผ่าน',()=>feed('🤐 คนข้างๆ ร้องแทน เพลงชาติของแคว้นเขามีสิบสองท่อน'))])},
 {id:'iKnight',ok:isIso,f:K=>C('🤺 อัศวินหญิงท้าดวล','อัศวินหญิงผมแดงขวางทาง "ข้าได้ยินว่าผู้กล้าจากต่างโลกเก่ง พิสูจน์ให้ดู"',[O('⚔️ รับคำท้า',()=>mgDuel('ดวลกับอัศวินผมแดง','อัศวินผมแดง',sc=>{if(sc>=.6){feed('⚔️ เธอแพ้แล้วหัวเราะลั่น "ครั้งหน้าข้าจะชนะ" แล้วตามคุณมาดวลทุกปี'+rep(4));if(!S.spouse&&rnd()<.35){S.spouse='เซเลน่า แอชฟอร์ด';feed('💞 ปีที่สามของการดวล เธอวางดาบลงก่อนคุณ')}}else feed('⚔️ เธอชนะ และสอนท่าที่ทำให้เธอชนะให้คุณฟรี'+pw(capOf(K)*.04))}),'มินิเกม'),O('🙇 ยอมแพ้ตั้งแต่ยังไม่ดวล',()=>feed('🙇 เธอผิดหวังจนลืมโกรธ'))])},
 {id:'iGoblin',ok:isIso,f:K=>C('👺 คณะทูตก็อบลิน','ก็อบลินสามตัวใส่เสื้อคลุมยาวเกินตัวมาขอพบคุณ "เราได้ยินว่าโลกท่านปลูกข้าวได้ปีละสามครั้ง สอนเราได้ไหม เราจะเลิกขโมยไก่"',[O('🌾 สอนวิธีทำนา',()=>{K.f.peace=(K.f.peace|0)+1;feed('🌾 สองปีต่อมา หมู่บ้านก็อบลินส่งข้าวมาขายในตลาดมนุษย์ ไม่มีใครเสียไก่อีกเลย'+rep(5))}),O('⚔️ จับส่งกิลด์',()=>feed('⚔️ ได้ค่าหัวก็อบลินสามตัว'+money(45)+dark(5)))])},
 {id:'iTax',ok:isIso,f:K=>C('💸 ภาษีผู้กล้า','ราชสำนักออกกฎใหม่: ผู้ถูกอัญเชิญต้องจ่าย "ค่าวงเวท" คืนวังปีละ 200 เหรียญ เพราะวงเวท "มีค่าใช้จ่าย"',[O('💰 จ่าย',()=>feed('💰 คุณจ่าย และเก็บใบเสร็จไว้'+money(-200))),O('✊ รวมผู้ถูกอัญเชิญประท้วง',()=>{if(X2(K).cls&&rnd()<.6){feed('✊ เพื่อนร่วมห้องสิบสองคนยืนหน้าวัง ราชายกเลิกกฎในวันเดียว'+rep(6))}else feed('✊ มีคุณคนเดียวที่ยืนหน้าวัง ทหารหัวเราะ'+rep(-2))}),O('📜 อ้างกฎหมายของโลกเดิม',()=>feed('📜 "การเกณฑ์คนข้ามโลกโดยไม่ยินยอมผิดอนุสัญญา" ไม่มีใครเข้าใจ แต่เสมียนกลัวจนยกเว้นภาษีให้'))])},
 {id:'iBard',ok:isIso,f:K=>C('🪕 เพลงเรื่องคุณ','นักกวีพเนจรร้องเพลงเรื่อง "ผู้กล้าจากต่างโลก" ที่คุณไม่เคยทำ ฆ่ามังกรเจ็ดตัวด้วยช้อน',[O('🎶 ปล่อยให้ร้องต่อ',()=>feed('🎶 ตำนานคุณโตเร็วกว่าตัวคุณ'+rep(8))),O('✏️ ขอให้แก้เนื้อเพลงให้ตรง',()=>feed('✏️ เพลงเวอร์ชันจริงไม่มีใครฟัง แต่คุณนอนหลับสบาย'+rep(1)))])},
 {id:'iArena',ok:isIso,f:K=>C('🏟️ สนามประลองใต้ดิน','สนามประลองใต้เมืองหลวงจ่ายเงินให้ผู้กล้าที่ยอมลงสนามกับนักสู้สัตว์อสูร',[O('⚔️ ลงสนาม',()=>mgDuel('สนามประลองใต้ดิน','นักสู้ขี่หมาป่า',sc=>feed(sc>=.6?'⚔️ ฝูงชนตะโกนชื่อคุณ'+money(R(150,300))+rep(3):'⚔️ คุณแพ้ ถูกโยนออกทางประตูหลัง'+hurt(.3))),'มินิเกม'),O('🎲 แค่วางเดิมพัน',()=>feed(rnd()<.5?'🎲 ได้'+money(120):'🎲 เสีย'+money(-80)))])},
 {id:'aFam',ok:K=>isAca(K)&&school(K),f:K=>C('🐾 พิธีเรียกสัตว์รับใช้','นักเรียนปีสามต้องวาดวงเวทเรียกสัตว์รับใช้ของตัวเอง สิ่งที่ออกมาขึ้นกับความแม่นของวงเวท',[O('🔮 วาดวงเวท',()=>mgRing('วาดวงเวทเรียกสัตว์รับใช้',sc=>{const f=sc>=.85?['🦅','กริฟฟินลูกอ่อน']:sc>=.55?['🦊','จิ้งจอกเพลิง']:sc>=.3?['🐸','กบพูดได้ที่ชอบด่า']:['🪨','ก้อนหิน… ที่มีตา'];K.f.fam2=f[1];K.pw+=capOf(K)*sc*.1;feed(`🔮 สิ่งที่ก้าวออกจากวงเวทคือ ${f[0]} <b>${f[1]}</b>`+hp2(K,Math.round(sc*50)))}),'มินิเกม')])},
 {id:'aLeak',ok:K=>isAca(K)&&school(K),f:K=>C('📄 ข้อสอบรั่ว','มีคนสอดกระดาษใต้ประตูห้องคุณ เป็นข้อสอบปลายปีทั้งชุด พร้อมเฉลย',[O('📖 อ่าน',()=>{K.yrS+=25;feed('📖 คุณจำได้ทุกข้อ'+dark(5));if(rnd()<.35)later(K,1,'x2leak')}),O('🔥 เผาทิ้ง',()=>feed('🔥 วันสอบ คนครึ่งห้องได้เต็ม คุณได้ตามจริง'+rep(2))),O('🧑‍🏫 ส่งให้อาจารย์',()=>{feed('🧑‍🏫 สอบเลื่อนไปหนึ่งสัปดาห์ ทั้งชั้นปีรู้ว่าใครเป็นคนส่ง'+rep(5));aff(K,'rival',-5)})])},
 {id:'aLib',ok:isAca,f:K=>C('📚 หนังสือบินได้','คุณแอบเข้าห้องสมุดตอนเที่ยงคืน หนังสือทุกเล่มลอยขึ้นและเรียงตัวเป็นลำดับบางอย่าง',[O('ᚱ จำลำดับให้ทัน',()=>mgRune('จำลำดับหนังสือที่บินวน',5,sc=>{S.int=(S.int||0)+Math.round(sc*8);feed(sc>.8?'ᚱ หนังสือวางตัวลงเป็นข้อความ "ใต้เขาวงกต"'+(K.clue<3?clue(K,'ห้องสมุดซ่อนข้อความไว้ในลำดับหนังสือ'):''):'ᚱ หนังสือร่วงลงมาทับคุณ')}),'มินิเกม'),O('🏃 หนี',()=>feed('🏃 หนังสือเล่มหนึ่งบินตามคุณกลับห้อง'))])},
 {id:'aLetter',ok:isAca,f:K=>C('💌 จดหมายรักผิดคน','จดหมายรักที่คุณไม่ได้เขียนแต่ลงชื่อคุณ ถูกส่งไปถึง'+(K.w==='noble'?'องค์ชาย':'อาจารย์ใหญ่'),[O('🙈 ปฏิเสธว่าไม่ได้เขียน',()=>mgRead('อธิบายว่าไม่ได้เขียน',K.w==='noble'?npc(K,'prince').n:'อาจารย์ใหญ่',sc=>feed(sc>.6?'🙈 เขาเชื่อ และหัวเราะไปพร้อมคุณ':'🙈 ยิ่งพูดยิ่งเหมือนเขียนเอง'+rep(-3)))),O('😏 ยอมรับว่าเขียนเอง',()=>{if(K.w==='noble')aff(K,'prince',10);feed('😏 คุณยอมรับหน้าตาเฉย ทั้งโรงเรียนนับถือความกล้า'+rep(3))})])},
 {id:'aPrank',ok:K=>isAca(K)&&school(K),f:K=>C('🎃 คืนแกล้งรุ่นพี่','ธรรมเนียมรุ่น: ปีหนึ่งต้องแกล้งรุ่นพี่ให้สำเร็จก่อนสิ้นเทอม',[O('🐸 เสกกบในหมวกรุ่นพี่',()=>{if(rnd()<.6){feed('🐸 กบสามสิบตัวกระโดดออกมากลางห้องประชุม'+hp2(K,40)+rep(3))}else feed('🐸 คาถาพลาด กบออกมาจากหมวกคุณเอง')}),O('📣 ฟ้องอาจารย์ว่าธรรมเนียมนี้อันตราย',()=>feed('📣 ธรรมเนียมถูกยกเลิก รุ่นพี่แกล้งคุณแทนทั้งปี'+rep(-3)))])},
 {id:'aNew',ok:isAca,f:K=>C('🧳 นักเรียนย้ายมาใหม่','นักเรียนจากแคว้นทางเหนือย้ายเข้าห้องคุณ ผมสีเงิน พูดน้อย และมีองครักษ์ปลอมตัวเป็นคนสวนตามมาสามคน',[O('🤝 ผูกมิตร',()=>{K.f.north=1;feed('🤝 เธอคือเจ้าหญิงที่หนีการลอบสังหาร เธอฝากชีวิตไว้กับความลับของคุณ'+rep(2))}),O('🕵️ สืบว่าเป็นใคร',()=>{if(K.w==='noble')K.f.evid=(K.f.evid|0)+1;feed('🕵️ ชื่อของเธอไม่มีในทะเบียน และมีคนจ่ายเงินให้คุณเงียบ'+money(150))})])},
 {id:'aBoom',ok:isAca,f:K=>C('💥 หม้อยาจะระเบิด','หม้อยาของเพื่อนข้างๆ เปลี่ยนเป็นสีม่วง แล้วเริ่มส่งเสียงหวีด เหลือเวลาไม่กี่วินาที',[O('⚗️ แก้สูตรกลางอากาศ',()=>mgPotion('แก้หม้อยาที่กำลังจะระเบิด',3,sc=>feed(sc>.6?'⚗️ หม้อยาสงบลง กลายเป็นยาที่ดีที่สุดในห้อง'+hp2(K,50):'⚗️ บึ้ม เพดานเป็นสีม่วงทั้งปี'+hurt(.15))),'มินิเกม'),O('🛡️ ร่ายโล่ปกป้องทุกคน',()=>{const o=overcast(K);feed('🛡️ ระเบิดกระแทกโล่ ไม่มีใครเจ็บ'+o.t+rep(4))})])},
 {id:'aSnow',ok:isAca,f:K=>C('❄️ หิมะตกในห้องเรียน','หิมะตกจากเพดานห้องเรียนกลางฤดูร้อน มีคนเวทหลุด และคุณรู้ว่าใคร — เพื่อนที่ร้องไห้อยู่หลังห้อง',[O('🫂 ไปนั่งข้างเขา',()=>{aff(K,'pal',10);feed('🫂 หิมะหยุดตก เขาเล่าเรื่องที่บ้านให้ฟังจนหมดคาบ')}),O('⛄ ปั้นตุ๊กตาหิมะ',()=>feed('⛄ ทั้งห้องหัวเราะ เขาหยุดร้องไห้ หิมะกลายเป็นเกล็ดสีรุ้ง'+rep(2)))])},
 {id:'aDuel',ok:isAca,f:K=>C('🧤 ถุงมือขาวบนพื้น',`${N(K,'rival')}โยนถุงมือใส่หน้าคุณกลางทางเดิน ตามธรรมเนียม นี่คือคำท้าดวล`,[O('⚔️ ดวลเดี๋ยวนี้',()=>mgDuel('ดวลกลางทางเดิน',npc(K,'rival').n,sc=>{aff(K,'rival',sc>=.6?5:-5);feed(sc>=.6?'⚔️ คุณชนะ เขาเก็บถุงมือคืนเงียบๆ'+hp2(K,40):'⚔️ คุณแพ้ ทั้งทางเดินเห็น'+rep(-2))}),'มินิเกม'),O('🧤 เก็บถุงมือคืนให้',()=>feed('🧤 คุณยื่นถุงมือคืน "ทำตกนะ" เขาโกรธจนหน้าแดง'))])},
 {id:'aAnswer',ok:K=>isAca(K)&&school(K),f:K=>C('🗯️ เสียงเฉลยในหัว','ในห้องสอบ มีเสียงกระซิบคำตอบในหัวคุณทุกข้อ เสียงเด็กผู้หญิงที่คุณไม่รู้จัก',[O('✍️ เขียนตามเสียง',()=>{K.yrS+=20;feed('✍️ ถูกทุกข้อ ยกเว้นข้อสุดท้าย เสียงบอกว่า "ช่วยหาฉันด้วย"'+(K.clue<3?clue(K,'มีนักเรียนติดอยู่ในห้องสอบ'):''))}),O('🙉 ไม่ฟัง',()=>feed('🙉 เสียงร้องไห้แล้วเงียบไป'))])},
 {id:'sRace',f:K=>C('🦅 แข่งขี่กริฟฟิน','งานประจำปีของเมือง ผู้ชนะได้ทองหนึ่งถุง ผู้แพ้ได้ร่วงลงทะเลสาบ',[O('🦅 ลงแข่ง',()=>mgDance('แข่งขี่กริฟฟิน (กดตามจังหวะปีก)','กริฟฟินเช่า',sc=>feed(sc>.7?'🦅 เข้าเส้นชัยที่หนึ่ง!'+money(300)+rep(4):sc>.4?'🦅 อันดับกลางๆ กริฟฟินกัดผมคุณเป็นรางวัล':'🦅 ร่วงลงทะเลสาบ ฝูงชนชอบที่สุด'+hurt(.1))),'มินิเกม'),O('🍢 เดินกินของในงาน',()=>{heal(.2);feed('🍢 ไม้เสียบไส้กรอกมังกรรสชาติเหมือนหมูปิ้งหน้าโรงเรียน')})])},
 {id:'sFair',f:K=>C('🎯 ซุ้มยิงเป้าในงานวัด','พ่อค้าบอกว่าถ้ายิงลูกดอกเวทโดนเป้าทองสามครั้ง ได้ตุ๊กตามังกรตัวใหญ่',[O('🎯 เล่น 10 เหรียญ',()=>{money(-10);mgRing('ยิงเป้าเวท',sc=>{if(sc>.8){K.f.doll=1;feed('🎯 ได้ตุ๊กตามังกร! มันกะพริบตาตอนคุณไม่มอง')}else feed('🎯 ได้พวงกุญแจรูปสไลม์')})},'มินิเกม'),O('👀 ดูคนอื่นเล่น',()=>feed('👀 ไม่มีใครได้ตุ๊กตา คุณเห็นพ่อค้าขยับเป้าด้วยเวท'))])},
 {id:'sPotion',f:K=>{const P=[['🧪','ยาขวดแดง'],['🫙','ยาขวดเขียว'],['⚗️','ยาขวดดำ']];C('🧙 พ่อค้ายาเร่','ชายใส่หมวกแหลมวางยาสามขวด "ขวดละ 50 ข้าก็จำไม่ได้ว่าขวดไหนทำอะไร"',P.map(p=>O(`${p[0]} ${p[1]}`,()=>{money(-50);const r=rnd();if(r<.3){K.endY+=2;feed(`${p[0]} อร่อยเหมือนน้ำแดงโซดา · อายุขัย +2`)}else if(r<.55){K.mpM+=10;feed(`${p[0]} ผมคุณเรืองแสงทั้งคืน · มานาสูงสุด +10`)}else if(r<.8){S.cha=(S.cha||0)+5;feed(`${p[0]} เสียงคุณไพเราะขึ้นจนนกเกาะหน้าต่าง`)}else feed(`${p[0]} คุณพูดได้แต่ภาษากบไปสามวัน`)},'',.33)))}},
 {id:'sRhyme',f:K=>C('🪄 คำสาปคล้องจอง','แม่มดที่คุณเหยียบชายกระโปรงโดยไม่ตั้งใจสาปให้คุณพูดคล้องจองทุกประโยคเป็นเวลาหนึ่งปี',[O('📜 ใช้ให้เป็นประโยชน์',()=>{S.cha=(S.cha||0)+5;feed('📜 คุณกลายเป็นกวีที่มีชื่อเสียงที่สุดในเมือง ทั้งที่แค่อยากสั่งข้าว'+rep(5))}),O('🙏 ไปขอโทษแม่มด',()=>feed('🙏 "ข้าขอโทษ ไม่ได้ตั้งใจ ข้าไม่รู้ว่าเป็นกระโปรงใคร" เธอหัวเราะจนลืมโกรธ แล้วถอนคำสาปให้'))])},
 {id:'sTwin',f:K=>C('🪞 คนหน้าเหมือน','ในตลาด มีคนหน้าเหมือนคุณทุกอย่าง ใส่เสื้อเหมือนกัน ถือของเหมือนกัน เขาเห็นคุณแล้วหน้าซีด',[O('🏃 ไล่ตาม',()=>{if(rnd()<.5&&K.clue<3)feed('🏃 เขาวิ่งเข้าซอยตัน แล้วหายไปในกำแพง'+clue(K,'มีคุณอีกคนในโลกนี้'));else feed('🏃 เขาหายไปในฝูงชน ทิ้งกระเป๋าเงินที่หน้าตาเหมือนของคุณไว้'+money(R(30,90)))}),O('👋 โบกมือทักทาย',()=>feed('👋 เขาโบกมือตอบ ช้ากว่าคุณนิดหนึ่ง'+dark(2)))])},
 {id:'sStorm',f:K=>C('🌊 พายุเวทกลางทะเล','เรือที่คุณโดยสารเจอพายุที่ฝนเป็นสีม่วง กัปตันบอกว่าต้องมีคนร่ายเวทขวางลมไว้จนกว่าจะพ้น',[O('🌀 ร่ายเวทขวางพายุ',()=>mgRing('ร่ายเวทขวางพายุ',sc=>feed(sc>.6?'🌀 เรือพ้นพายุ ลูกเรือเลี้ยงเหล้าคุณทั้งคืน'+rep(4)+money(100):'🌀 เรือรอด แต่คุณหมดสติไปสองวัน'+hurt(.3))),'มินิเกม'),O('🛶 ขึ้นเรือชูชีพ',()=>feed('🛶 คุณลอยไปติดเกาะที่มีแต่นกเพนกวินพูดได้ ใช้เวลาครึ่งปีกว่าจะกลับ'))])},
 {id:'sRiddle',f:K=>C('🦁 สฟิงซ์ที่สะพาน','สฟิงซ์นอนขวางสะพาน "ตอบถูก ข้าให้ผ่านพร้อมของขวัญ ตอบผิด ข้าให้ผ่านพร้อมความอับอาย" ปริศนา: <b>อะไรเอ่ย ยิ่งเอาออกยิ่งใหญ่ขึ้น</b>',[O('🕳️ หลุม',()=>{feed('🕳️ สฟิงซ์ยิ้ม แล้วคายเหรียญทองโบราณออกมา'+money(200)+(K.clue<3&&rnd()<.25?clue(K,'สฟิงซ์รู้ชื่อจริงของคุณ'):''))}),O('🎈 ลูกโป่ง',()=>feed('🎈 สฟิงซ์หัวเราะจนน้ำตาไหล "ไม่ใช่" มันเล่าเรื่องนี้ให้นกทุกตัวฟัง'+rep(-1))),O('😶 ความเงียบ',()=>feed('😶 สฟิงซ์คิดอยู่นาน "คำตอบนี้ดีกว่าของข้า" แล้วหลีกทางให้'+rep(2)))])},
 {id:'sKids',f:K=>C('🧒 เด็กหายในถ้ำ','เด็กเจ็ดคนจากหมู่บ้านหายเข้าไปในถ้ำหลังเขา พ่อแม่ร้องไห้อยู่หน้าปากถ้ำ',[O('🗝️ เข้าไปตามหา',()=>mgDungeon('ตามหาเด็กในถ้ำ',4,sc=>feed(sc>.5?`🗝️ คุณพาเด็กออกมาได้ครบเจ็ดคน หมู่บ้านทั้งหมู่บ้านจำชื่อคุณได้`+rep(10):'🗝️ คุณพาออกมาได้สี่คน อีกสามคนออกมาเองในวันรุ่งขึ้น เล่าว่ามีคนแก่หนวดยาวนำทาง'+rep(4))),'มินิเกม'),O('📢 รวบรวมคนช่วยกันหา',()=>feed('📢 ใช้เวลาสามวัน แต่เด็กทุกคนรอด'+rep(5)))])}];
const CMP={pl:['ตลาดปลาที่ไม่มีปลา','หอระฆังร้าง','สะพานหินโค้งริมทะเลสาบ','โรงอาบน้ำสาธารณะ','ทุ่งดอกไม้สีฟ้า','สุสานอัศวินนิรนาม'],who:[['🧓','ช่างทำแผนที่ตาบอด'],['👧','เด็กขายดอกไม้'],['🧝','เอลฟ์ขี้เมา'],['🧔','ทหารผ่านศึกขาเดียว'],['👩‍🍳','แม่ครัวโรงเตี๊ยม'],['🐦‍⬛','อีกาพูดได้']],pr:[['ทำของล้ำค่าหล่นลงคูน้ำ',.2],['ถูกกล่าวหาว่าขโมยของ',.4],['ติดหนี้คนผิดคน',.5],['ถูกสาปให้ลืมชื่อตัวเองทุกเที่ยงคืน',.6],['หาทางกลับบ้านไม่เจอมาสิบปี',.7]]};
function cmpEv(K){for(let i=0;i<6;i++){const p=pick(CMP.pl),w=pick(CMP.who),r=pick(CMP.pr),id='cmp:'+w[1]+r[0];if(X2(K).sn[id])continue;markSeen(K,id);
 C(`${w[0]} ${w[1]}`,`ที่${p} ${w[1]}${r[0]} แล้วมองมาที่คุณเหมือนคุณเป็นความหวังสุดท้าย`,[
  O('🤝 ช่วยเต็มที่',()=>{if(rnd()<.75-r[1]*.3){feed(`🤝 คุณช่วย${w[1]}สำเร็จ`+rep(Math.round(2+r[1]*8))+(rnd()<.3?money(R(20,80)):''));if(rnd()<.2)later(K,R(3,7),'x2cmp',{w:w[1]})}else feed(`🤝 คุณพยายามแล้ว แต่${w[1]}ยังต้องหาทางต่อเอง`+hurt(.05))},'',.5),
  O('💰 ช่วยแบบคิดค่าจ้าง',()=>feed(`💰 ${w[1]}จ่ายทุกเหรียญที่มี`+money(R(30,90))+dark(2)),'',.3),
  O('🚶 เดินผ่าน',()=>feed(`🚶 ${w[1]}มองตามคุณจนลับตา`),'',.2)]);return}feed('🍃 ปีนี้เงียบสงบ')}
{const _re=randEv;randEv=function(K){X2(K);const L=RE2.concat(RE.map((f,i)=>({id:'re'+i,f})));const e=rnd()<.18?null:pickEv(K,L);if(!e)return cmpEv(K);markSeen(K,e.id);try{e.f(K)}catch(x){console.error('fan re2',e.id,x)}}}

// =================== 👻 ชาติก่อน ===================
function pastRec(K){if(K.pastRec)return;K.pastRec=1;try{const L=LS.get('murim_fanpast',[])||[];L.push({n:S.name,w:K.w,k:K.end||'',a:age()});LS.set('murim_fanpast',L.slice(-8))}catch(e){}}
function evEcho(K){const X=X2(K);X.echo=1;let L=[];try{L=LS.get('murim_fanpast',[])||[]}catch(e){}const p=L[L.length-1];if(!p||p.n===S.name)return;const en=ENDS[p.w]&&ENDS[p.w][p.k];const how=en?`${en[0]} ${en[1]}`:'จากไปโดยไม่มีใครบันทึกว่าอย่างไร';
 const T=isAca(K)&&(p.w==='hero'||p.w==='trash')?`ในตำราประวัติศาสตร์บทผู้กล้าจากต่างโลก มีชื่อ <b>${E(p.n)}</b> พร้อมภาพวาดที่หน้าตาเหมือนคุณ ใต้ภาพเขียนว่า「${how}」`
  :isIso(K)&&isAca({w:p.w})?`นักกวีในโรงเตี๊ยมร้องเพลงเรื่อง <b>${E(p.n)}</b> แห่ง${WD[p.w].sc} ที่${how} ทุกคำในเพลงคุณร้องตามได้ ทั้งที่ไม่เคยได้ยิน`
  :`คุณเจอ${pick(['หลุมศพเก่า','ภาพวาดในโบสถ์','ดาบที่สลักชื่อ'])}ของ <b>${E(p.n)}</b> ผู้${how} มือคุณสั่นตอนแตะมัน`;
 C('👻 ความทรงจำที่ไม่ใช่ของคุณ',T,[O('✋ แตะมันอีกครั้ง',()=>{K.pw+=capOf(K)*.1;feed('✋ ภาพชีวิตก่อนไหลเข้ามา ฝีมือบางส่วนกลับมาหาคุณ'+(K.clue<3&&rnd()<.35?clue(K,'คุณเคยมีชีวิตในทวีปนี้มาก่อน'):''))},'',.6),O('🚶 ปล่อยไว้ตรงนั้น',()=>feed('🚶 บางชีวิตควรจบในที่ของมัน'),'',.4)])}

// =================== 🔀 บทหลักทางแยก (สุ่มต่อชีวิต) ===================
const ARCV={
 noble:{0:K=>{C('⚱️ งานศพแทนงานเลี้ยง','งานเลี้ยงต้อนรับถูกยกเลิก เคานต์ผู้อุปถัมภ์สถาบันเสียชีวิตกะทันหัน นักเรียนใหม่ทุกคนต้องไปร่วมพิธี ลูกขุนนางมองเด็กทุนคนเดียวในชุดดำที่ยืมมา',[
  O('🛡️ ทักทายตระกูลผู้ไว้อาลัยให้ถูกทุกตระกูล',()=>mgNames('จำตราตระกูลผู้ไว้อาลัย',sc=>{aff(K,'lady',Math.round(sc*20));aff(K,'prince',Math.round(sc*10));feed(sc>.7?`🛡️ คุณเรียกชื่อตระกูลถูกทุกคน ${N(K,'lady')}หันมามองคุณเป็นครั้งแรก`:'🛡️ คุณเรียกผิดตระกูลหนึ่ง เสียงซุบซิบดังทั่วโบสถ์'+rep(-2));nextArc(K)}),'มินิเกม',.5),
  O('👂 แอบฟังเรื่องพินัยกรรม',()=>{K.f.evid=(K.f.evid|0)+1;feed('👂 ทายาทสองคนทะเลาะกันหลังโบสถ์: "พ่อไม่ได้ตายเพราะหัวใจ" · หลักฐาน +1'+dark(3));nextArc(K)},'',.3),
  O(`🫂 ปลอบ${npc(K,'rival').n}ที่ร้องไห้อยู่คนเดียว`,()=>{aff(K,'rival',25);mem(K,'rival','เห็นเขาร้องไห้ในงานศพ');feed(`🫂 เคานต์คือปู่ของ${N(K,'rival')} เขาไม่ขอบคุณ แต่ไม่แกล้งคุณอีกเลยทั้งเทอม`);nextArc(K)},'',.2)])}},
 hero:{1:K=>{C('🏳️ หมู่บ้านที่ยกธงขาว','หมู่บ้านหูยาวยกธงขาวก่อนกองทัพไปถึง หัวหน้าหมู่บ้านคุกเข่ายื่นกุญแจคลังข้าว แต่แม่ทัพสั่ง "เผาให้หมด เป็นตัวอย่าง"',[
  O('🎭 เจรจาแทนพวกเขา',()=>mgRead('เจรจากับแม่ทัพ','แม่ทัพหลวง',sc=>{if(sc>.6){K.f.spare=1;feed('🎭 แม่ทัพยอมรับกุญแจคลังข้าวแทนชีวิตคน เด็กหูยาวคนหนึ่งจำหน้าคุณไว้'+rep(3));later(K,R(5,8),'elfkid')}else{feed('🎭 แม่ทัพหัวเราะแล้วสั่งจุดไฟ'+dark(8))}nextArc(K)}),'มินิเกม',.5),
  O('🔥 ทำตามคำสั่ง',()=>{feed('🔥 ควันลอยไปสามวัน คุณได้เหรียญตราที่ไม่กล้าติดอก'+dark(16)+rep(4));mem(K,'demon','เผาหมู่บ้านที่ยอมแพ้');nextArc(K)},'',.2),
  O('🌙 แอบเปิดประตูหลังให้หนีตอนกลางคืน',()=>{K.f.spare=1;K.f.rebel=1;feed('🌙 รุ่งเช้า หมู่บ้านว่างเปล่า แม่ทัพสงสัยทุกคน รวมทั้งคุณ'+aff(K,'king',-10));later(K,R(5,8),'elfkid');nextArc(K)},'',.3)])}},
 magic:{1:K=>{C('🌙 เพื่อนละเมอเดิน',`ตีสาม ${N(K,'pal')}ลุกจากเตียงทั้งที่หลับตา เดินตรงไปที่ผนังปลายทางเดินแล้วเอามือแนบ ผนังส่งเสียงคล้ายหัวใจเต้น`,[
  O('👣 เดินตามเขาไป',()=>{K.f.wall=1;feed('👣 ผนังเปิดเป็นช่องเล็กๆ ข้างในเป็นบันไดลงไปข้างล่าง แล้วปิดลงก่อนคุณจะก้าว'+(K.clue<3&&rnd()<.5?clue(K,'ผนังเปิดให้คนที่หลับอยู่'):''));aff(K,'pal',5);nextArc(K)},'',.4),
  O('🛌 ปลุกเขา',()=>{aff(K,'pal',12);feed('🛌 เขาตื่นมาร้องไห้ จำได้ว่าฝันถึงเสียงเรียกชื่อ คุณนั่งเฝ้าจนเช้า');nextArc(K)},'',.4),
  O('🪢 มัดเขาไว้กับเตียงทุกคืน',()=>{feed('🪢 เขาไม่ได้เดินไปไหนอีก แต่ผนังเริ่มเคาะเรียกจากอีกฝั่งทุกคืน'+dark(3));nextArc(K)},'',.2)])}},
 trash:{2:K=>{C('🔥 ไฟไหม้สลัม','ไฟลุกพร้อมกันสามจุดในสลัมตอนเที่ยงคืน ไม่ใช่อุบัติเหตุ ทหารวังยืนดูอยู่ที่ประตูเมืองโดยไม่ขยับ',[
  O('🗝️ ฝ่าไฟเข้าไปช่วยเด็กๆ',()=>mgDungeon('ฝ่าเพลิงในตรอกสลัม',4,sc=>{aff(K,'kid',Math.round(sc*30));if(sc>.5){K.f.slumHero=1;feed('🗝️ คุณพาเด็กออกมาได้ทุกคน หลังมือไหม้เป็นแผลเป็นที่ไม่หายไปตลอดชีวิต'+rep(6))}else{npc(K,'kid').alive=rnd()<.5?1:0;feed('🗝️ คุณช่วยได้ไม่ครบ'+dark(8))}nextArc(K)}),'มินิเกม',.5),
  O('⚔️ ตามจับคนวางเพลิง',()=>duel('มือวางเพลิงสวมหน้ากาก',Math.round(S.power*(1+rnd()*.25)),w=>{if(w){K.f.evid=(K.f.evid|0)+1;feed('⚔️ ใต้หน้ากากคือทหารวัง ในกระเป๋ามีคำสั่งประทับตราราชา "เคลียร์พื้นที่ก่อนขบวนผู้กล้า"'+rep(4))}else feed('⚔️ เขาหนีไปพร้อมรอยมีดของคุณที่แขน'+hurt(.25));nextArc(K)}),'ต่อสู้',.3),
  O('💰 เก็บของที่เจ้าของทิ้งไว้',()=>{money(150);feed('💰 คุณรวยขึ้น และไม่มีใครในสลัมมองหน้าคุณตรงๆ อีก'+dark(12));nextArc(K)},'',.2)])}}};
{const _as=arcStep;arcStep=function(K,st){try{if(st!=null&&st!==K.arc)return;const X=X2(K),alt=ARCV[K.w]&&ARCV[K.w][K.arc];if(alt){if(X.av[K.arc]==null)X.av[K.arc]=rnd()<.45?1:0;if(X.av[K.arc]===1){X.av[K.arc]=2;return alt(K)}}}catch(e){console.error('arcv',e)}return _as.apply(this,arguments)}}

// =================== เหตุการณ์ย้อนกลับชุดใหม่ ===================
{const _dl=doLater;doLater=function(K,L){const d=L.d||{};
 if(L.id==='x2back'){feed(`🌀 ${E(d.n)}ที่หายไปแล้วกลับมาเดินมาหาคุณกลางดึก "ฉันเห็นประตู มันอยู่ใต้ทะเลจริงๆ และข้างหลังประตูเป็นห้องเรียนของเรา"`+(K.clue<3?clue(K,'ประตูกลับบ้านอยู่ใต้ทะเล'):''));return}
 if(L.id==='x2know'){const f=KNOWL[KNOW[d.k]&&KNOW[d.k][4]];if(f)f(K);return}
 if(L.id==='x2hunt'){const X=X2(K),c=X.cls&&X.cls.find(x=>x.st==='ok'&&x.id!=='pal'),nmx=c?c.n:npc(K,'rival').n;C('⚔️ ผู้กล้าที่ถูกส่งมาล่าคุณ',`วังส่งผู้กล้ามาจัดการ "ผู้ทรยศ" — คนที่มาคือ<b>${E(nmx)}</b> เพื่อนร่วมห้องที่เคยนั่งข้างคุณ เขามือสั่น`,[
  O('⚔️ สู้',()=>duel(nmx,Math.round(S.power*(1+rnd()*.3)),w=>{if(w){if(c){c.st='dead';c.t='ตายด้วยมือเพื่อนร่วมห้องที่ไปอยู่ฝั่งปีศาจ'}feed('⚔️ คุณชนะ ปีศาจทั้งปราสาทโห่ร้อง คุณไม่ได้ยินอะไรเลย'+dark(10))}else feed('⚔️ คุณถอยหนีกลับแดนปีศาจ'+hurt(.35))}),'ต่อสู้',.5),
  O('🗣️ ชวนเขามาอยู่ฝั่งนี้',()=>mgRead('ชวนเพื่อนข้ามฝั่ง',nmx,sc=>{if(sc>.6){if(c){c.st='demon';c.t='ข้ามมาอยู่ฝั่งปีศาจพร้อมคุณ'}feed(`🗣️ ${E(nmx)}วางดาบ "จริงๆ ฉันก็ไม่เคยเชื่อวังเหมือนกัน"`);X.dem=(X.dem||[]).concat(nmx)}else feed('🗣️ เขาไม่ฟัง แต่ก็ไม่ฟันคุณ เดินกลับไปเงียบๆ')}),'มินิเกม',.5)]);return}
 if(L.id==='x2dmRev'){C('🦇 ทูตคนเดิมกลับมา','หญิงผมเทาที่คุณเคยจับส่งวังยืนอยู่บนกำแพงเมือง ข้างหลังเธอคือค้างคาวนับพัน "ข้าบอกแล้วว่าสามปี"',[O('⚔️ ป้องกันเมือง',()=>duel('ทูตค้างคาว',Math.round(S.power*1.15),w=>feed(w?'⚔️ คุณขับไล่เธอได้ เธอหายไปพร้อมรอยยิ้ม'+rep(10):'⚔️ เมืองเสียหายครึ่งหนึ่ง'+hurt(.4)+rep(-5))),'ต่อสู้',.5),O('🙇 ขอโทษเธอ',()=>{K.f.peace=(K.f.peace|0)+1;feed('🙇 เธอมองคุณนาน แล้วสั่งค้างคาวถอย "ครั้งนี้ข้าจะจำว่าท่านก้มหัว"')},'',.5)]);return}
 if(L.id==='x2tchRev'){C(`👩‍🏫 อาจารย์${E(d.n)}กลับมา`,`อาจารย์ที่คุณเคยเปิดโปงยืนรอใต้ต้นไม้หน้าหอ "ข้าไม่ได้มาแก้แค้น ข้ามาบอกว่าเจ้าทำถูก แต่ราคามันแพงกว่าที่เจ้าคิด"`,[O('⚔️ ป้องกันตัว',()=>duel(`อาจารย์${d.n}`,Math.round(S.power*1.1),w=>feed(w?'⚔️ เขาไม่สู้จริง แค่อยากรู้ว่าคุณเก่งแค่ไหน':'⚔️ คุณตื่นมาในห้องพยาบาล มีจดหมายขอบคุณวางอยู่'+hurt(.2))),'',.5),O('☕ ชวนนั่งคุย',()=>{S.int=(S.int||0)+6;feed('☕ เขาเล่าเรื่องที่ไม่มีในตำราจนฟ้าสาง')},'',.5)]);return}
 if(L.id==='x2breakup'){S.spouse=null;try{S.sp=null}catch(e){}K.f.facPt=(K.f.facPt|0)-2;feed(`🎭 คุณถอนหมั้นกับ${E(d.n)}กลางงานเลี้ยง ฝ่ายของคุณโกรธจนพูดไม่ออก แต่${E(d.n)}กระซิบว่า "ขอบคุณ"`+dark(3));return}
 if(L.id==='x2leak'){feed('📄 ข้อสอบที่รั่วเป็นของปลอม คนที่อ่านทุกคนสอบตกข้อเดียวกัน อาจารย์ยิ้มตอนประกาศผล'+rep(-4));K.yrS-=20;return}
 if(L.id==='x2cmp'){feed(`🎁 ${E(d.w)}ที่คุณเคยช่วยส่งของขวัญมาให้ พร้อมจดหมายลายมือเบี้ยวๆ`+money(R(60,160)));return}
 return _dl.apply(this,arguments)}}

// =================== ฉากจบใหม่ ===================
Object.assign(ENDS.hero,{cafe:['🍜','ร้านอาหารต่างโลก','เปิดร้านรสชาติบ้านจนทั้งแผ่นดินมาต่อคิว'],bring:['💑','กลับบ้านพร้อมคนรัก','พาคนรักจากต่างโลกกลับไปด้วย'],abyss:['🖤','ผู้กล้าของปีศาจ','ยืนข้างปีศาจจนสงครามจบ'],bridge:['🌉','สองโลกหนึ่งชีวิต','เปิดประตูไปมาระหว่างสองโลก',1]});
Object.assign(ENDS.trash,{cafe:['🍜','ร้านอาหารต่างโลก','สกิลขยะทำให้วัตถุดิบเหลือทิ้งกลายเป็นอาหารชั้นเลิศ'],bring:['💑','กลับบ้านพร้อมคนรัก','พาคนรักจากต่างโลกกลับไปด้วย'],abyss:['🖤','ผู้กล้าของปีศาจ','คนที่ถูกทิ้งไปยืนข้างคนที่ถูกเกลียด'],bridge:['🌉','สองโลกหนึ่งชีวิต','เปิดประตูไปมาระหว่างสองโลก',1]});
Object.assign(ENDS.magic,{teacher:['👩‍🏫','อาจารย์ผู้เฝ้าความลับ','รู้ความลับของอาจารย์ทุกคน แล้วกลายเป็นหนึ่งในนั้น'],star:['🔭','ผู้ตอบรับดวงดาว','ตามคำเชิญของดาวดวงที่ 13 ไป']});
Object.assign(ENDS.noble,{cardinal:['⛪','สังฆราชในเงา','ฝ่ายโบสถ์ครองแผ่นดินผ่านมือคุณ'],press:['📰','หนังสือพิมพ์ที่ราชวงศ์กลัว','ก่อตั้งสื่อที่ไม่มีใครปิดปากได้'],alliance:['🤝','พันธมิตรในชุดแต่งงาน','การหมั้นทางการเมืองกลายเป็นคู่หูที่เปลี่ยนแผ่นดิน']});
function xFin(K,o){try{const X=X2(K);
 if(isIso(K)){if(X.food>=2)o.push(O('🍜 แขวนดาบ เปิดร้านอาหาร',()=>ending(K,'cafe',`คุณเปิดร้านเล็กๆ ที่ประตูเมือง ${X.know.includes('mayo')?'มายองเนส':''}${X.know.includes('ramen')?' ราเมง':''} และรสชาติที่ทุกคนบอกว่า "เหมือนบ้านที่ไม่เคยไป" ผู้กล้าทุกรุ่นหลังจากนี้มากินที่ร้านคุณก่อนออกเดินทาง`,'แก่ตายหลังเคาน์เตอร์ร้านอาหารที่คนต่อคิวทุกวัน'),'ของกินที่คุณสร้างมีมากพอ',.25));
  if(S.spouse&&!K.f.demonSide)o.push(O(`💑 พา${S.spouse}กลับบ้านด้วย`,()=>ending(K,'bring',`คุณจับมือ${E(S.spouse)}ก้าวเข้าวงเวท ฝั่งโน้นเป็นห้องเรียนเดิม ฝนกำลังตก คนรักจากต่างโลกมองไฟนีออนครั้งแรกแล้วหัวเราะทั้งน้ำตา`,'ใช้ชีวิตที่เหลือในโลกเดิมกับคนรักจากต่างโลก'),'',.25));
  if(K.f.demonSide)o.push(O('🖤 ยืนข้างราชาปีศาจจนจบ',()=>ending(K,'abyss',`คุณนำทัพปีศาจไปถึงประตูวัง แล้วยื่นข้อเสนอเดียว: วงเวทอัญเชิญต้องถูกทำลาย ราชายอม สงครามจบในวันนั้น ไม่มีบทเพลงไหนพูดถึงคุณในฝั่งมนุษย์ ส่วนฝั่งปีศาจร้องเพลงถึงคุณทุกปี`,'ตายอย่างสงบในปราสาทดำ ท่ามกลางปีศาจที่เรียกคุณว่าเพื่อน'),'',.3));
  if(K.f.portal&&S.spouse&&K.clue>=2)o.push(O('🌉 ใช้คริสตัลสร้างประตูของคุณเอง',()=>ending(K,'bridge',`เศษคริสตัลจากก้นดันเจี้ยนประกอบกันเป็นประตูบานเล็กในห้องนอน ฝั่งหนึ่งคือบ้านแม่ อีกฝั่งคือบ้านที่คุณสร้างในต่างโลก คุณไม่ต้องเลือกอีกต่อไป วันเสาร์กินข้าวกับแม่ วันอาทิตย์ล่ามังกรกับ${E(S.spouse)}`,'อยู่ได้ทั้งสองโลกจนวันสุดท้าย'),'🗝️ ฉากจบลับ',.1))}
 if(K.w==='magic'){if((X.tr|0)>=4)o.push(O('👩‍🏫 รับตำแหน่งอาจารย์',()=>ending(K,'teacher','คุณได้ห้องสอนที่หน้าต่างมองเห็นหอดูดาว และความลับของตัวเองหนึ่งเรื่อง นักเรียนรุ่นใหม่เริ่มกระซิบว่าอาจารย์คนใหม่ไม่เคยกะพริบตาตอนพระจันทร์เต็มดวง','สอนหนังสือในวิทยาลัยจนวันสุดท้าย และเก็บความลับทุกเรื่องไว้จนตาย'),'รู้ความลับอาจารย์มากพอ',.25));
  if(K.f.starEnd)o.push(O('🔭 ตอบรับคำเชิญของดวงดาว',()=>ending(K,'star','คืนนั้นคุณขึ้นหอดูดาวคนเดียว ดาวดวงที่ 13 ลืมตาเต็มที่ แสงของมันพาคุณขึ้นไปช้าๆ เหมือนคนที่เชิญเพื่อนเข้าบ้าน วิทยาลัยบันทึกว่าคุณหายตัว ส่วนท้องฟ้ามีดาวเพิ่มขึ้นหนึ่งดวง','หายไปกับแสงของดาวดวงที่ 13'),'',.2))}
 if(K.w==='noble'){if(X.fac==='church'&&(K.f.facPt|0)>=3)o.push(O('⛪ รับตำแหน่งในสภาโบสถ์',()=>ending(K,'cardinal','คุณสวมชุดสีแดงของสภาโบสถ์ คัมภีร์ที่คุณถอดรหัสได้ในวัยเรียนกลายเป็นดาบที่จ่ออยู่ที่คอราชวงศ์ ทุกพระราชโองการต้องผ่านตราประทับของคุณก่อน','ปกครองแผ่นดินผ่านแท่นบูชาจนวันสุดท้าย'),'',.25));
  if(K.f.press)o.push(O('📰 ก่อตั้งหนังสือพิมพ์อิสระ',()=>ending(K,'press','ฉบับแรกพิมพ์เรื่องจากตู้เอกสารร้อยปี ทั้งเมืองหลวงอ่านในเช้าเดียว ราชวงศ์สั่งยึดแท่นพิมพ์สามครั้ง แต่ทุกครั้งมีแท่นพิมพ์ใหม่โผล่ขึ้นในอีกเมือง','จากไปโดยทิ้งหนังสือพิมพ์ที่ไม่มีใครปิดได้'),'',.25));
  if(K.f.betroth&&(K.f.facPt|0)>=3)o.push(O('🤝 เปลี่ยนแผ่นดินกับคู่หมั้น',()=>ending(K,'alliance',`การหมั้นที่ไม่มีใครรักกลายเป็นพันธมิตรที่แข็งแรงที่สุดในราชสำนัก คุณกับ${E(S.spouse||'คู่หมั้น')}ล้มขั้วอำนาจเก่าได้ทีละขั้ว และในปีที่สิบ คุณสองคนก็รักกันจริงๆ`,'ใช้ชีวิตจนแก่เฒ่ากับพันธมิตรที่กลายเป็นคนรัก'),'',.25))}
 }catch(e){console.error('xFin',e)}}

// =================== โฟกัสใหม่ ===================
FOK.hero.splice(4,0,['fa_dun','🗝️','ลงดันเจี้ยน']);
FOK.trash.splice(4,0,['fa_dun','🗝️','ลงดันเจี้ยน',K=>K.f.guild]);
FOK.magic.splice(4,0,['fa_club','🎭','กิจกรรมชมรม',K=>school(K)&&!!CLUB[X2(K).club]],['fa_tch','👩‍🏫','ช่วยงานอาจารย์',school]);FOK.magic.push(['fa_dun','🗝️','สำรวจดันเจี้ยน',K=>!school(K)]);
FOK.noble.splice(4,0,['fa_club','🎭','กิจกรรมชมรม',K=>school(K)&&!!CLUB[X2(K).club]],['fa_tch','👩‍🏫','ช่วยงานอาจารย์',school]);
{const _df=doFocus;doFocus=function(K){const f=S.focus;
 if(f==='fa_dun'){queue(()=>dunRun(K,isIso(K)?'ดันเจี้ยนใต้เมืองหลวง':'ดันเจี้ยนโบราณ',isIso(K)?Math.min(10,4+Math.floor((age()-16)/3)):8));return}
 if(f==='fa_club'){const X=X2(K),c=CLUB[X.club];if(c){X.cp++;feed(`${c[0]} ใช้เวลากับ${c[1]} ${pick(['จนดึก','ทั้งวันหยุด','แทนการอ่านหนังสือสอบ'])}${hp2(K,R(10,25))}`);if(rnd()<.3)S.cha=(S.cha||0)+2}return}
 if(f==='fa_tch'){tchVisit(K);return}
 return _df.apply(this,arguments)}}
{const _ex=examRes;examRes=function(K,sc){const r=_ex.apply(this,arguments);try{if(isAca(K)){const p=Math.round(sc*90);if(p)feed(`🏆 ผลสอบทำแต้มให้หอ +${p}`);hp2(K,p)}}catch(e){}return r}}
{const _en=ending;ending=function(K){const r=_en.apply(this,arguments);try{pastRec(K)}catch(e){}return r}}

// =================== ตัวจัดตารางรายปี ===================
{const _fy=fanYear;fanYear=function(){const K=FN();if(K){X2(K);try{clsInit(K);hpInit(K);tchInit(K)}catch(e){console.error('x2init',e)}}
 const a0=S.age;_fy.apply(this,arguments);if(!K)return;if(!S.alive){pastRec(K);return}if(S.age===a0||K.end)return;
 try{const X=X2(K),y=age()-WD[K.w].a0,cand=[];const add=(f,once)=>cand.push(f);
  // ไม่ให้ท่วม: ปีละไม่เกิน 1 เหตุการณ์จากระบบขยาย (เรียงตามความสำคัญ) · ถ้าคิวยังค้างเกิน 1 ข้ามไปก่อน
  if(isIso(K)){if(rnd()<.32)clsNews(K);if(age()>=30&&!X.reun){add(()=>{X.reun=1;evReunion(K)})}
   if(!K.f.dmOff&&age()>=22&&((K.f.peace|0)>=1||K.dark>=40||K.f.spare)&&rnd()<.3)add(()=>evDemonOffer(K));
   if(age()>=18&&rnd()<.3&&X.know.length<10)add(()=>evKnow(K));
   if((K.f.guild||K.w==='hero')&&age()>=17&&rnd()<.3)add(()=>evQuest(K))}
  if(isAca(K)&&school(K)){
   if(y>=1&&X.club===null&&!X.clubAsk)add(()=>{X.clubAsk=1;evClubPick(K)});
   if(CLUB[X.club]&&X.cs<3&&y>=2+X.cs*2-1)add(()=>evClubStep(K));
   if(K.w==='noble'&&y>=2&&X.fac===null)add(()=>evFac(K));
   if(K.w==='noble'&&FAC[X.fac]&&(y===3||y===5)&&X.ftY!==y)add(()=>{X.ftY=y;evFacTask(K)});
   if(y>=1&&y<=6&&!X.cal[y])add(()=>evCal(K));
   if(K.w==='noble'&&y>=5&&!K.f.btOff&&rnd()<.6)add(()=>evBetroth(K));
   if(rnd()<.25)add(()=>evRumor(K));
   hpYearEnd(K)}
  if(isAca(K)&&!school(K)&&K.w==='noble'&&FAC[X.fac]&&rnd()<.2)add(()=>evFacTask(K));
  if(!X.echo&&y>=2&&rnd()<.25){let L=[];try{L=LS.get('murim_fanpast',[])||[]}catch(e){}if(L.length)add(()=>evEcho(K));else X.echo=1}
  if(cand.length&&QU.length<=1)queue(cand[0]);
 }catch(e){console.error('x2year',e)}
 if(QU.length)flush()}}


// ####################################################################
// ภาค 3: ⬜ ห้องสีขาว — ตายในยุคปัจจุบัน/ถูกอัญเชิญ → เจอเทพ → เลือกสกิลจาก 10,000+ แบบ → ไปต่างโลกหรือเกิดใหม่
//   เทพ 6 แบบ · ความอดทนของเทพ · ต่อรอง/ติดสินบน · เทพขี้เกียจให้หมด หรือเรื่องมากจนได้สกิลขยะ · เทพเจ้าเล่ห์ → แก้แค้นเทพ
// ####################################################################
const WCORE=[['🔥','เปลวไฟ','pow:6 over:.05',40],['❄️','น้ำแข็ง','pow:5 hp:10',40],['⚡','สายฟ้า','ring:.08 pow:4',45],['🗡️','ดาบ','fight:.08 pow:3',40],['🏹','ธนู','fight:.06 ring:.05',40],['🛡️','โล่','hp:30',35],['👊','หมัด','pow:7',35],['🌪️','พายุ','pow:5 ring:.05',45],['🪨','ผิวหิน','hp:40',35],['🩸','ดูดเลือด','heal:.06 dark:4',50],
 ['💠','มานา','mp:30',40],['🔮','มองอนาคต','ring:.1 read:.05',55],['🌀','เทเลพอร์ต','luck:.05',60],['⏳','หยุดเวลา','ring:.12 rune:.05',70],['📜','อ่านรูน','rune:.12',40],['💀','ปลุกศพ','pow:5 dark:8',55],['✨','รักษา','heal:.07',45],['🌙','เวทกลางคืน','mp:15 read:.05',40],['🧪','ปรุงยา','heal:.04 inc:10',35],['👁️','ประเมิน','read:.08 rune:.04',40],
 ['💬','เจรจา','read:.1',40],['💖','เสน่ห์','cha:10 love:.08',45],['🎭','ปลอมตัว','read:.08 dark:2',40],['👑','บารมี','rep:10 cha:4',50],['🐾','คุยกับสัตว์','ev:.05 luck:.02',30],['🎵','เพลงสะกดใจ','read:.06 cha:4',40],
 ['💰','หาเงิน','inc:25',45],['🍳','ทำอาหาร','heal:.03 inc:10',30],['🎒','กระเป๋ามิติ','inc:15 luck:.03',50],['🍀','โชค','luck:.06',50],['🧭','ไม่หลงทาง','rune:.06',25],['🌿','ปลูกพืช','heal:.03 inc:8',25],['🔨','สร้างของ','inc:18',35],['🕵️','ซ่อนตัว','read:.06',35],['📚','เรียนเร็ว','exam:8 int:6',40],['❤️','อายุยืน','life:12',55],
 ['🐈','แมว','luck:.03 cha:2',25],['🍜','บะหมี่','heal:.02',15],['📱','สมาร์ตโฟน','int:5 ev:.04',35],['🧻','กระดาษทิชชู่','hp:3',10]];
const WPRE=[['ขั้นต้น',.6,.5,''],['ขั้นสูง',1.4,1.5,''],['เทพ',2.2,2.6,''],['ขี้เกียจ',2,1.1,''],['ต้องสาป',2.4,.8,'dark:8'],['จิ๋ว',.4,.3,''],['ยักษ์',1.8,1.8,'cha:-3'],['สองเท่า',2,2.2,''],['ย้อนกลับ',1.2,.9,'luck:-.02'],['เงียบงัน',1.1,1,'read:.03'],['บ้าคลั่ง',1.9,1.3,'dark:5'],['ศักดิ์สิทธิ์',1.5,1.6,'rep:3'],['มือสอง',.8,.5,''],
 ['ทองคำ',1.3,1.4,'inc:10'],['นิรันดร์',1.7,2,'life:5'],['ครึ่งๆ กลางๆ',.5,.4,''],['ลับ',1.3,1.3,'ev:.02'],['ร้อนแรง',1.3,1.2,'pow:2'],['เยือกเย็น',1.2,1.1,'over:.05'],['ขี้อาย',1.6,.9,'cha:-2'],['ราคาถูก',.9,.4,''],['โบราณ',1.5,1.5,'rune:.03'],['ไร้เทียมทาน',2.6,3,''],['หลอกลวง',1.4,.7,'read:.04 dark:3'],['ธรรมดา',1,1,'']];
const WMOD=[['ไม่มีเงื่อนไข',1,1.3],['ทำงานเฉพาะวันจันทร์',.5,.4],['ใช้ได้วันละครั้ง',.8,.8],['ต้องตะโกนชื่อสกิลทุกครั้งที่ใช้',1,.7],['แรงขึ้นตอนหิว',1.1,.9],['ศัตรูได้ผลด้วยครึ่งหนึ่ง',.7,.6],['แต่ทำให้ผมร่วงทีละเส้น',1.1,.7],['ทำงานเฉพาะตอนมีคนดู',.9,.75],['แรงขึ้นทุกปีที่ผ่านไป',1.3,1.4],['ทำงานเฉพาะกลางคืน',.9,.8]];
const WSP=pl(`🧊|เปิดตู้เย็นแล้วมีของเซเว่น|ทุกตู้เย็นในต่างโลกมีข้าวกล่องรอคุณหนึ่งกล่อง|4|heal:.06 inc:15 cha:3
💾|บันทึกเกม 1 ครั้ง|ตายครั้งแรกแล้วตื่นขึ้นมาใหม่ในเช้าวันเดิม|5|save:2
🐈|แมวทุกตัวเชื่อฟัง|แต่คนในเมืองเริ่มนินทาว่าคุณเป็นแม่มด|3|luck:.06 read:.05 rep:-3
🧾|ใบเสร็จทุกร้านในโลก|คืนของได้ทุกอย่าง แม้แต่ดาบที่ใช้ฟันมังกรไปแล้ว|3|inc:30
♾️|อมตะ|ตายไม่ได้ แต่ทุกคนที่คุณรักจะแก่และตายต่อหน้า|6|save:8 life:120 love:-.3 dark:10
🔍|ค้นหาในอินเทอร์เน็ต|วันละ 3 คำค้น สัญญาณ 4G ตกบ่อยในป่า|4|int:12 rune:.12 exam:10
🗣️|เข้าใจทุกภาษา|รวมถึงภาษาที่ต้นไม้ใช้ด่าคุณ|3|read:.12 ev:.03
📦|ไอเทมบ็อกซ์ไร้ขีดจำกัด|เก็บได้ทุกอย่าง ยกเว้นความทรงจำ|4|inc:35 luck:.04
📊|ดูหน้าต่างสถานะคนอื่น|เห็นตัวเลขทุกคน รวมถึงตัวเลข "วันตาย"|4|read:.15 dark:3
🧒|หน้าเด็กตลอดกาล|อายุ 60 ก็ยังโดนถามว่ามากับผู้ปกครองไหม|2|life:20 cha:4
🎰|เกลือในกาชา|ทุกการสุ่มของคุณออกของดี ยกเว้นเรื่องความรัก|4|luck:.12 love:-.08
🐉|เลี้ยงมังกรตั้งแต่ไข่|ไข่มังกรอยู่ในกระเป๋าตั้งแต่วันแรก|4|pow:12 fight:.06
⚔️|ดาบที่เลือกเจ้าของ|ดาบในตำนานจะหลุดจากหินเมื่อคุณเดินผ่าน|5|fight:.18 pow:10
👶|เกิดใหม่ในตระกูลร่ำรวย|เริ่มชีวิตบนกองเงิน|3|gold:1500 rep:5
😴|ไม่ต้องนอน|มีเวลามากกว่าคนอื่นวันละแปดชั่วโมง|3|exam:8 int:6 inc:10
💸|เงินไม่มีวันหมด|กระเป๋าเงินมีเหรียญเพิ่มเองทุกเช้า|5|inc:90
💘|รู้ว่าใครแอบชอบ|ตัวเลขลอยเหนือหัวทุกคน|2|love:.2 read:.05
💍|ห้ามตายก่อนแต่งงาน|เทพจะไม่ปล่อยให้คุณตายจนกว่าจะได้แต่ง|3|save:2 love:.1
🍳|สูตรอาหารจากโลกเดิมครบทุกสูตร|ราเมง ส้มตำ ข้าวขาหมู ในหัวครบ|3|inc:25 heal:.03
🎮|ความรู้เกมทุกเกมที่เคยเล่น|โลกนี้เหมือนเกมที่คุณเคยเล่นจบ… เกือบทุกอย่าง|4|ring:.08 rune:.08 read:.05
🪞|ร่างแยกหนึ่งร่าง|อีกตัวหนึ่งของคุณทำงานแทนได้ แต่มันเริ่มมีความคิดเอง|4|inc:30 fight:.06 dark:3
🧲|ดึงดูดเหตุการณ์สนุก|ชีวิตไม่น่าเบื่ออีกต่อไป ไม่ว่าคุณจะอยากหรือไม่|2|ev:.2
⭐|ผู้ถูกเลือกโดยคำทำนาย|ทั้งโลกรอคุณอยู่แล้ว กดดันมาก|4|rep:15 clue:1
🦸|ร่างกายนักกีฬาโอลิมปิก|วิ่งเร็ว กระโดดสูง ไม่เคยเจ็บกล้ามเนื้อ|3|hp:40 pow:6
🧠|ไอคิว 300|คิดเร็วจนพูดตามไม่ทัน|4|int:20 exam:15 rune:.08
🌈|ทุกเวทธาตุ|ไฟ น้ำ ลม ดิน แสง เงา ใช้ได้หมด แต่ไม่เก่งสักอย่าง|3|mp:25 pow:4
👼|เทวดาประจำตัว|มีเสียงเตือนในหัวทุกครั้งที่กำลังจะตัดสินใจผิด|4|save:1 read:.08
🧙|อาจารย์ในหัว|จอมเวทแก่ขี้บ่นอาศัยอยู่ในหัวคุณ สอนเวทให้ทุกคืน|4|mp:30 rune:.1
🏠|บ้านพกพา|กางเต็นท์แล้วข้างในเป็นคอนโดสองห้องนอน|3|heal:.06 inc:10
🌍|แผนที่ทั้งโลก|เห็นทุกดันเจี้ยน ทุกสมบัติ ทุกทางลับ|4|luck:.08 inc:20
🔊|เสียงพากย์ในหัว|มีคนพากย์ชีวิตคุณเหมือนกีฬา น่ารำคาญแต่ช่วยได้|2|ring:.06 ev:.05
🍀|โชคดีมหาศาล|ทุกอย่างพลาดคุณไปนิดเดียว ทั้งลูกศรและความรัก|5|luck:.15 save:1 love:-.05
👑|เกิดเป็นเจ้าชาย/เจ้าหญิง|ลำดับที่ 7 ในการสืบราชสมบัติ|4|rep:15 gold:800 dark:3
🕰️|ย้อนเวลาได้ 10 วินาที|วันละครั้ง ปวดหัวทุกครั้ง|5|save:2 ring:.12
💪|แข็งแรงเท่าหมี|และกินเท่าหมีด้วย|2|pow:8 hp:30 inc:-5
🎨|วาดอะไรก็เป็นจริง|แต่คุณวาดรูปไม่เก่งเลย|4|luck:.06 ev:.06
📡|วิทยุรับคลื่นจากโลกเดิม|ฟังข่าวจากบ้านได้ทุกคืน คิดถึงบ้านหนักกว่าเดิม|2|int:4 heal:-.01
🧤|แตะแล้วรู้ประวัติสิ่งของ|รู้ว่ามีดเล่มนี้เคยฆ่าใคร|3|read:.1 clue:0
😇|ทุกคนไว้ใจตั้งแต่แรกเห็น|รวมถึงคนที่ควรระวังคุณ|3|cha:12 read:.06
🐣|ไข่ฟีนิกซ์|ฟักตอนคุณตายครั้งแรก แล้วพาคุณกลับมา|4|save:1 heal:.04
💼|ประสบการณ์ทำงานออฟฟิศ 10 ปี|รายงาน ประชุม ตารางงาน ระบบราชการต่างโลกแพ้คุณหมด|2|int:6 inc:15 rep:3`);
const WTRASH=pl(`🍚|นับเม็ดข้าวได้แม่นยำ|ข้าวหนึ่งจานมี 2,847 เม็ด รู้แล้วยังไงต่อ|0|int:1
🧦|เปลี่ยนสีถุงเท้า|เฉพาะถุงเท้าที่ใส่อยู่ และเฉพาะสีเทา|0|cha:1
🌱|ได้ยินเสียงหญ้าโต|ดังมาก นอนไม่หลับ|0|heal:-.01
🥄|งอช้อนด้วยใจ|ใช้เวลาสามชั่วโมงต่อช้อน|0|
🐌|เดินช้าลงตามใจ|ไม่มีใครขอให้เร็วขึ้นได้|0|
🪥|แปรงฟันได้สะอาดกว่าคนทั่วไป|หมอฟันต่างโลกตกงาน|0|cha:1
📏|รู้ความยาวทุกอย่างเป็นเซนติเมตร|ไม่มีใครในโลกนี้ใช้เซนติเมตร|0|int:1
🦗|เรียกจิ้งหรีดได้หนึ่งตัว|ตัวเดิมทุกครั้ง มันเริ่มรำคาญคุณ|0|
🧊|ทำน้ำแข็งก้อนเล็กเท่าเม็ดถั่ว|วันละก้อน|0|
😐|หน้านิ่งตอนโกหก|แต่หูแดงทุกครั้ง|0|read:.01
🫧|เป่าฟองสบู่ได้ใหญ่มาก|ไม่มีประโยชน์ในการต่อสู้|0|cha:1
🔦|นิ้วเรืองแสงอ่อนๆ|อ่านหนังสือในที่มืดได้ ถ้าตั้งใจมาก|0|`);
// สร้างสกิลจากรหัส 0–9999 (25 × 40 × 10) + สกิลพิเศษ 10000+
function wSkill(id){if(id>=10000){const s=WSP[id-10000];return s?Object.assign({id,cost:[25,45,70,100,140,190,260][s.t]},s):null}
 const p=WPRE[Math.floor(id/400)%25],c=WCORE[Math.floor(id/10)%40],m=WMOD[id%10];if(!p||!c||!m)return null;const sc=p[1]*m[1];
 const t=sc<.45?0:sc<.9?1:sc<1.45?2:sc<2?3:sc<2.6?4:sc<3.2?5:6;const fx=[];
 String(c[2]).split(' ').forEach(tk=>{const [k,v]=tk.split(':');const n=+v;if(!isNaN(n))fx.push(k+':'+(Math.abs(n)<1?Math.round(n*sc*.8*100)/100:Math.round(n*sc*.8)))});if(p[3])fx.push(p[3]);
 return{id,ic:c[0],n:`${c[1]}${p[0]==='ธรรมดา'?'':p[0]}`,d:m[0],t,fx:fx.join(' '),cost:Math.max(5,Math.round(c[3]*p[2]*m[2]/5)*5)}}
const WN=10000+WSP.length;
// ---- เทพ 6 แบบ ----
const GODS={
 lazy:{n:'เทพธิดาเลซี่ฟลอร่า',tag:'😪 ขี้เกียจ · กำลังพักเที่ยง',dr:{re:9,add:7,rm:6},allP:.6,timer:180,bribe:'coffee',
  L:{hi:'"อ้าว… มาตอนพักเที่ยงพอดี เลือกเร็วๆ นะ ฉันให้เวลาสามนาที"',add:['"อันนั้นเหรอ ได้ๆ"','"เอาไปเลย"','"อืม"'],rare:'"ตาถึงนี่… เอาไปเถอะ ขี้เกียจเถียง"',forb:'"แน่ใจนะ? อันนี้มันมีอะไรแนบมาด้วยนะ… ช่างเถอะ"',rm:'"คืนก็ได้ แต่ฉันไม่ไปเก็บให้นะ"',re:['"สุ่มอีกแล้วเหรอ…"','"เธอนี่จุกจิกจัง"','"ข้าวเย็นหมดแล้ว"'],many:'"นี่ฉันเป็นเทพนะ ไม่ใช่บุฟเฟต์"',low:'"อีกอันเดียวพอนะ ฉันจะไปกินข้าว"',nOK:'"โอเคๆ ให้เพิ่มก็ได้ แค่เงียบๆ หน่อย"',nNo:'"ไม่ ต่อรองคือการทำงาน ฉันไม่ทำงานตอนพัก"',bOK:'"กาแฟเย็น? …เธอนี่เข้าใจโลก"',bNo:'"เงินมนุษย์ใช้ที่นี่ไม่ได้หรอก แต่ขอบใจ"',all:'"…รู้อะไรไหม เอาไปหมดเลย ทั้งตะกร้า ทั้งการ์ดบนโต๊ะ ฉันจะไปนอนแล้ว"',trash:'"พอ! เรื่องมากเหลือเกิน เอานี่ไป สกิลที่เหลือในลิ้นชัก บาย"',go:'"ไปดีนะ อย่ากลับมาตอนพักเที่ยงอีก"',inst:'"ไม่อยากคุย ไม่อยากเลือก นี่ ห้าอัน สุ่มเอา ไปได้แล้ว"'}},
 ot:{n:'เทพธิดาแผนกอัญเชิญ ชั้น 7',tag:'💼 ทำ OT · คิวที่ 4,812 ของวันนี้',dr:{re:5,add:5,rm:9},allP:.2,bribe:'coffee',
  L:{hi:'"สวัสดีค่ะ แผนกอัญเชิญ ชั้น 7 กรุณาเลือกสกิลตามแบบฟอร์ม ไม่เกินโควตาแต้มนะคะ"',add:['"บันทึกแล้วค่ะ"','"ปั๊มตราเรียบร้อย"','"ถัดไปค่ะ"'],rare:'"สกิลระดับนี้ต้องให้หัวหน้าเซ็น… เดี๋ยวเซ็นแทนให้ค่ะ"',forb:'"สกิลต้องห้ามต้องแนบเอกสาร 12 ฉบับนะคะ… ช่างเถอะ ดึกแล้ว"',rm:'"ยกเลิกต้องกรอกฟอร์มใหม่ทั้งหมดค่ะ"',re:['"ขอสุ่มใหม่ ฟอร์ม B-7 นะคะ"','"คิวข้างหลังรออยู่นะคะ"'],many:'"เกินโควตามาตรฐานแล้วค่ะ ต้องทำเรื่องขออนุมัติพิเศษ"',low:'"ระบบจะปิดในอีกไม่กี่นาทีนะคะ"',nOK:'"…ก็ได้ค่ะ ถือว่าเป็นกรณีพิเศษ"',nNo:'"ระเบียบคือระเบียบค่ะ"',bOK:'"กาแฟ… กาแฟจริงๆ… ขอบคุณค่ะ เพิ่มแต้มให้แบบไม่ต้องบันทึกนะคะ"',bNo:'"การติดสินบนเจ้าหน้าที่ผิดระเบียบข้อ 44 ค่ะ"',all:'"ระบบล่ม! …เอาไปทั้งหมดเลยค่ะ ไม่มีใครตรวจสอบได้แล้ว"',trash:'"แบบฟอร์มของคุณกรอกไม่ครบค่ะ ระบบจัดสรรสกิลมาตรฐานให้อัตโนมัติ"',go:'"ขอบคุณที่ใช้บริการแผนกอัญเชิญค่ะ"'}},
 old:{n:'พระเจ้าเฒ่าโอลด์เมียร์',tag:'👴 ขี้บ่น · สร้างโลกมาเจ็ดใบแล้ว',dr:{re:7,add:6,rm:4},allP:.3,bribe:'none',
  L:{hi:'"มาอีกแล้วหรือ… สมัยข้าหนุ่มๆ ผู้กล้าขอแค่ดาบเล่มเดียว"',add:['"เฮอะ เอาไป"','"สกิลแบบนี้สมัยก่อนไม่มีหรอก"','"เด็กสมัยนี้…"'],rare:'"รู้ไหมว่าข้าต้องใช้เวลาสร้างอันนี้กี่พันปี"',forb:'"อันนี้… ข้าเคยให้คนหนึ่งไป เขาร้องไห้ทุกคืนหลังจากนั้น"',rm:'"เปลี่ยนใจไปมาเหมือนลมฤดูฝน"',re:['"ไม่พอใจอีกแล้ว?"','"ข้าแก่แล้วนะ"'],many:'"ตะกร้าเธอหนักกว่าภาระที่ข้าแบกมาทั้งชีวิต"',low:'"ข้าเริ่มเหนื่อยแล้วนะ เด็กน้อย"',nOK:'"ฮึ… กล้าดี ข้าชอบ เอาเพิ่มไป"',nNo:'"เถียงคนแก่ระวังจะโดนสาป"',bOK:'"…"',bNo:'"ทองคำ? ข้าเป็นคนสร้างทองคำ"',all:'"พอที! เอาไปหมด! ข้าจะไปนอนสักพันปี!"',trash:'"เด็กเรื่องมาก! เอานี่ไป ให้รู้ว่าความโลภมีราคา"',go:'"ไปเถอะ… ใช้ชีวิตให้ดีกว่าที่ข้าทำ"'}},
 sorry:{n:'เทพหนุ่มเลออน',tag:'🙇 ส่งคุณมาตายผิดคน',dr:{re:2,add:3,rm:2},allP:.7,bribe:'none',
  L:{hi:'"ขอโทษครับ! รถคันนั้นต้องชนคนข้างๆ คุณ ผมดูชื่อผิดบรรทัด ผมชดเชยให้เต็มที่เลยครับ"',add:['"ได้เลยครับ!"','"ไม่เป็นไรครับ เอาไปเลย"','"สมควรแล้วครับ"'],rare:'"อันนี้หายากมาก… แต่ผมผิดเองครับ"',forb:'"แน่ใจนะครับ? ผมไม่อยากทำพลาดซ้ำสอง"',rm:'"ได้ครับ คืนแต้มให้เต็มเลย"',re:['"สุ่มได้ไม่จำกัดครับ"','"เลือกให้พอใจนะครับ"'],many:'"เอ่อ… หัวหน้าผมจะว่าไหมนะ"',low:'"หัวหน้าโทรตามแล้วครับ… ขออีกนิดเดียว"',nOK:'"ได้ครับ! เพิ่มให้อีก!"',nNo:'"ผมให้เท่านี้จริงๆ ครับ ไม่งั้นผมโดนไล่ออก"',bOK:'"ไม่ต้องให้อะไรผมเลยครับ ผมผิดเอง… แต่ขอบคุณครับ"',bNo:'"ไม่ต้องครับ"',all:'"เอาไปทั้งหมดเลยครับ! ผมรู้สึกผิดเกินไป!"',trash:'"ขอโทษครับ หัวหน้าสั่งระงับ ผมให้ได้แค่นี้…"',go:'"ขอให้ชีวิตใหม่ดีกว่าเดิมนะครับ ขอโทษอีกครั้ง"'}},
 fake:{n:'"เทพธิดา" โรสมารี',tag:'💗 ใจดีเกินไป',dr:{re:0,add:1,rm:0},allP:1,bribe:'any',
  L:{hi:'"ยินดีต้อนรับจ้ะ ที่รัก เอาอะไรก็ได้เลย ไม่ต้องจ่ายตอนนี้"',add:['"ดีจัง~"','"เอาเพิ่มสิจ๊ะ"','"ไม่ต้องห่วงเรื่องแต้มหรอก"'],rare:'"เธอนี่ตาถึงจริงๆ"',forb:'"อันนี้ฉันชอบที่สุดเลย…"',rm:'"แน่ใจเหรอ? เธอจะเสียใจนะ"',re:['"ดูได้เรื่อยๆ จ้ะ"'],many:'"มากเท่าไหร่ก็ได้ ยิ่งมาก ยิ่งดี~"',low:'"…"',nOK:'"แน่นอนจ้ะ"',nNo:'"แน่นอนจ้ะ"',bOK:'"เก็บเงินไว้เถอะ ฉันขอแค่… อย่างอื่นทีหลัง"',bNo:'"ไม่ต้องจ้ะ"',all:'"เอาไปหมดเลยจ้ะ ฉันจะไปเก็บค่าตอบแทนทีหลัง~"',trash:'',go:'"แล้วเจอกันนะจ๊ะ อีกไม่กี่ปี"'}},
 scheme:{n:'เทพีออเรลิส ผู้ประทานพร',tag:'🙂 ใจดีที่สุดในสวรรค์',dr:{re:1,add:2,rm:1},allP:1,bribe:'none',
  L:{hi:'"เจ้าผู้น่าสงสาร… ไม่ต้องกลัว ข้าจะมอบพลังให้เจ้าทำสิ่งที่ยิ่งใหญ่"',add:['"ดีมาก"','"ข้าเชื่อในตัวเจ้า"','"หมากตัวที่ 30… เอ่อ เจ้าน่ะ ฉลาดมาก"'],rare:'"ใช่แล้ว เจ้าต้องแข็งแกร่ง"',forb:'"เจ้าเหมาะกับมันที่สุด"',rm:'"ตามใจเจ้า"',re:['"เลือกให้ดี"'],many:'"ยิ่งแข็งแกร่ง ยิ่งดี"',low:'"…"',nOK:'"แน่นอน ข้าต้องการให้เจ้าแข็งแกร่ง"',nNo:'"แน่นอน"',bOK:'"ข้าไม่ต้องการสิ่งใด นอกจากให้เจ้าทำตามที่ข้าบอกในวันหนึ่ง"',bNo:'"เก็บไว้เถิด"',all:'"เอาไปทั้งหมด เจ้าจะเป็นหมากที่… เป็นผู้กล้าที่ดีที่สุด"',trash:'',go:'"ไปเถิด ทำให้ข้าภูมิใจ"',know:'"…เจ้า? ทำไมเจ้าถึงจำ… ไม่ เจ้าต้องจำผิดแน่"'}}};
let WR=null;try{Object.defineProperty(window,'_WR',{get:()=>WR,configurable:true})}catch(e){}
const wrGodPick=()=>{let H={};try{H=LS.get('murim_fangod',{})||{}}catch(e){}const P=[['lazy',22],['ot',20],['old',18],['sorry',16],['fake',9],['scheme',H.killed?0:15]];let s=P.reduce((a,x)=>a+x[1],0)*rnd();for(const x of P){s-=x[1];if(s<=0)return x[0]}return'lazy'};
const wrPts=c=>{let p=100+Math.round((+c.karma||0)/2)+Math.min(80,Math.round(Math.log10(1+Math.max(0,+c.money||0))*12))+Math.min(40,Math.round((c.age||20)/2));if(c.cause==='hero')p+=60;return cl(p,60,420)};
function wrDraw3(){const L=[],q=(WR.q||'').trim();let tries=0;while(L.length<3&&tries<4000){tries++;const id=rnd()<.06?10000+R(0,WSP.length-1):R(0,9999);const s=wSkill(id);if(!s||L.some(x=>x.id===id)||WR.bask.some(x=>x.id===id))continue;if(q&&!(s.n+s.d).includes(q))continue;L.push(s)}while(L.length<3){const s=wSkill(R(0,9999));L.push(s)}WR.cards=L}
const wrLine=(k)=>{const g=GODS[WR.god].L[k];WR.say=Array.isArray(g)?pick(g):g;return WR.say};
function wrPat(d){WR.pat=Math.max(0,WR.pat-d);if(WR.pat<=0&&!WR.done)setTimeout(wrOut,500)}
function wrOut(){if(WR.done)return;const G=GODS[WR.god];WR.done=1;clearInterval(WR.tmr);
 if(rnd()<G.allP){wrLine('all');const extra=[];for(let i=0;i<3;i++)extra.push(wSkill(R(0,9999)));WR.bask=WR.bask.concat(WR.cards,extra);WR.out='all';if(WR.god==='fake')WR.hid=WR.hid.concat(shuf(BD.curse.filter(c=>c.t>=2)).slice(0,2))}
 else{wrLine('trash');WR.hid=WR.hid.slice(0,2);WR.bask=shuf(WTRASH).slice(0,3).map(x=>Object.assign({cost:0},x));WR.out='trash'}
 wrRender();setTimeout(()=>wrGo(true),2200)}
function wrCss(){if(document.getElementById('wrBcss'))return;const st=document.createElement('style');st.id='wrBcss';st.textContent=`
#wrB{position:fixed;inset:0;z-index:9000;overflow-y:auto;font-family:inherit;color:#2a2438;background:radial-gradient(ellipse at 50% 30%,#fff 0%,#f4f1ea 55%,#e6e1d6 100%);display:none}#wrB.on{display:block}
#wrB .in{max-width:400px;margin:0 auto;padding:14px 14px 130px;position:relative}#wrB .dust{position:absolute;width:3px;height:3px;background:#d9c58a;border-radius:50%;opacity:.6;animation:wrF 6s ease-in-out infinite}@keyframes wrF{50%{transform:translateY(-14px)}}
#wrB .top{display:flex;justify-content:space-between;font-size:11px;letter-spacing:1.2px;color:#a49a86}#wrB .stage{display:flex;flex-direction:column;align-items:center;margin-top:4px}#wrB canvas{image-rendering:pixelated;animation:wrF 4s ease-in-out infinite}
#wrB .name{font-weight:700;font-size:19px;margin-top:2px}#wrB .tag{font-size:12px;color:#8a7f6a}#wrB .pat{display:flex;align-items:center;gap:8px;width:100%;margin:8px 0 0;font-size:12px}#wrB .pat .bar{flex:1;height:10px;border-radius:5px;background:#e3ddcf;overflow:hidden;box-shadow:inset 0 1px 2px #0002}#wrB .pat .bar i{display:block;height:100%;background:linear-gradient(90deg,#f2994a,#f2c94c 40%,#7bd389);transition:width .4s}
#wrB .bub{position:relative;margin:12px 0 0;background:#fff;border:2px solid #2a2438;border-radius:16px;padding:10px 13px;font-size:14px;line-height:1.5;box-shadow:4px 4px 0 #2a243822;min-height:50px}#wrB .bub:before{content:'';position:absolute;top:-10px;left:50%;margin-left:-8px;border:8px solid transparent;border-bottom-color:#2a2438;border-top:0}#wrB .bub.pop{animation:wrP .25s}@keyframes wrP{0%{transform:scale(.96)}}
#wrB .pts{display:flex;justify-content:space-between;align-items:center;margin:12px 0 6px;font-size:13px}#wrB .pts b{font-size:16px;color:#b8860b}
#wrB .srch{display:flex;gap:6px}#wrB .srch input{flex:1;min-width:0;border:1.5px solid #cfc7b5;border-radius:12px;padding:8px 11px;font:inherit;font-size:16px;background:#fffdf8;color:#2a2438}#wrB .srch button{border:1.5px solid #cfc7b5;background:#fffdf8;border-radius:12px;padding:0 10px;font:inherit;color:#2a2438}
#wrB .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0 8px}#wrB .cd{position:relative;background:#fff;border:2px solid var(--c);border-radius:14px;padding:9px 6px 8px;text-align:center;box-shadow:0 4px 0 var(--c),0 8px 18px #0001;min-height:176px;display:flex;flex-direction:column;cursor:pointer;color:#2a2438;font:inherit}
#wrB .cd:active{transform:translateY(3px);box-shadow:0 1px 0 var(--c)}#wrB .cd .r{font-size:9.5px;font-weight:700;color:#fff;background:var(--c);border-radius:8px;padding:1px 7px;align-self:center}#wrB .cd .ic{font-size:28px;margin:6px 0 2px}#wrB .cd .n{font-weight:700;font-size:12.5px;line-height:1.3}#wrB .cd .d{font-size:10.5px;color:#7a705c;line-height:1.35;margin-top:4px;flex:1}#wrB .cd .fx{font-size:9.5px;color:#2f8a4a;margin-top:3px}#wrB .cd .cost{font-size:11.5px;color:#b8860b;font-weight:700;margin-top:4px}#wrB .cd.no{opacity:.45}
#wrB .bask{display:flex;flex-wrap:wrap;gap:5px;font-size:11.5px;margin:6px 0}#wrB .bask span{background:#2a2438;color:#fff;border-radius:9px;padding:3px 8px;cursor:pointer}#wrB .bask span.x{background:#c0392b}#wrB .bask small{color:#8a7f6a}
#wrB .bar2{position:fixed;left:0;right:0;bottom:0;padding:10px 14px calc(12px + env(safe-area-inset-bottom));background:linear-gradient(transparent,#f2eee6 35%);display:grid;grid-template-columns:1fr 1fr 1.3fr;gap:8px;max-width:400px;margin:0 auto}
#wrB .bar2 button{min-height:52px;border-radius:15px;border:2px solid #2a2438;background:#fff;font:inherit;font-weight:700;font-size:14px;box-shadow:0 3px 0 #2a2438;color:#2a2438}#wrB .bar2 .go{background:#2a2438;color:#fff8e1}#wrB .bar2 button:disabled{opacity:.4}
#wrB .know{width:100%;margin-top:8px;border:2px dashed #6a3a8a;background:#f6efff;color:#4a2a6a;border-radius:12px;padding:8px;font:inherit;font-weight:700}
@media(min-width:900px){#wrB .in{max-width:1100px;display:grid;grid-template-columns:400px 1fr;gap:36px;padding:34px 40px}#wrB .L{position:sticky;top:30px;align-self:start}#wrB .R{padding-top:36px}#wrB .cd{min-height:200px}#wrB .bar2{position:static;max-width:none;background:none;padding:0;margin-top:14px}}`;document.head.appendChild(st)}
function deity(c,t){const x=c.getContext('2d'),P=c.width/28;x.clearRect(0,0,c.width,c.height);x.imageSmoothingEnabled=false;const r=(a,b,w,h,col,al)=>{x.globalAlpha=al==null?1:al;x.fillStyle=col;x.fillRect(Math.round(a*P),Math.round(b*P),Math.ceil(w*P),Math.ceil(h*P));x.globalAlpha=1};
 const C={lazy:{hair:'#f6d38a',robe:'#ffffff',trim:'#f2c94c',skin:'#ffe3cf',eye:'sleepy'},ot:{hair:'#3a3550',robe:'#e8ecf4',trim:'#4a6fa5',skin:'#ffe3cf',eye:'glass'},old:{hair:'#f4f4f4',robe:'#f6efdc',trim:'#c9a54a',skin:'#f2d2b6',eye:'old'},sorry:{hair:'#8a5a3a',robe:'#fff7f0',trim:'#e8a0a0',skin:'#ffe3cf',eye:'sorry'},fake:{hair:'#2a1a3a',robe:'#fff4fa',trim:'#d4708f',skin:'#fde6e6',eye:'smile'},scheme:{hair:'#f0e6ff',robe:'#ffffff',trim:'#f2c94c',skin:'#ffe8d8',eye:'kind'}}[t];
 if(t==='scheme'){for(let i=0;i<3;i++){r(1+i,10+i*3,6,1,'#5a4a7a',.18);r(21-i,10+i*3,6,1,'#5a4a7a',.18)}}
 if(t==='fake'){r(9,0,2,3,'#3a1a2a',.25);r(17,0,2,3,'#3a1a2a',.25);r(5,24,3,8,'#3a1a2a',.2)}
 [[3,30,10,3],[8,29,12,4],[16,30,9,3]].forEach(a=>r(...a,'#fff'));r(4,32,22,1,'#e3dccb');
 if(t!=='ot'&&t!=='old'){r(2,12,5,9,'#fff');r(1,14,2,6,'#eee8da');r(21,12,5,9,'#fff');r(25,14,2,6,'#eee8da');r(3,13,3,1,'#e7dfcc');r(22,13,3,1,'#e7dfcc')}
 const hc=t==='fake'?'#e8b4c8':'#f2c94c';r(10,1,8,1,hc);r(9,2,1,1,hc);r(18,2,1,1,hc);
 r(9,4,10,4,C.hair);r(8,6,2,t==='old'?4:9,C.hair);r(18,6,2,t==='old'?4:10,C.hair);
 if(t==='lazy'){r(11,3,2,1,C.hair);r(16,3,3,1,C.hair);r(19,8,1,1,C.hair);r(7,9,1,1,C.hair)}if(t==='ot'){r(9,4,10,2,C.hair);r(17,3,3,3,C.hair)}
 r(10,6,8,7,C.skin);const e=C.eye;
 if(e==='sleepy'){r(11,9,2,1,'#2a2438');r(15,9,2,1,'#2a2438');r(11,8,2,1,'#e9c3a8');r(15,8,2,1,'#e9c3a8');r(13,11,2,1,'#c06060')}
 else if(e==='glass'){r(10,8,3,2,'#2a2438');r(15,8,3,2,'#2a2438');r(11,9,1,1,'#bcd');r(16,9,1,1,'#bcd');r(13,8,2,1,'#2a2438');r(13,11,2,1,'#a05050')}
 else if(e==='old'){r(11,8,2,1,'#2a2438');r(15,8,2,1,'#2a2438');r(10,7,3,1,'#fff');r(15,7,3,1,'#fff');r(10,10,8,6,'#f4f4f4');r(11,16,6,3,'#f4f4f4');r(12,18,4,2,'#ececec')}
 else if(e==='sorry'){r(11,9,2,1,'#2a2438');r(15,9,2,1,'#2a2438');r(10,8,2,1,'#5a3a2a');r(16,8,2,1,'#5a3a2a');r(13,11,2,1,'#a05050');r(19,6,1,2,'#7ac8ff')}
 else if(e==='smile'){r(11,9,2,1,'#2a2438');r(15,9,2,1,'#2a2438');r(12,11,4,1,'#c04a6a');r(11,10,1,1,'#f4a6b8',.7);r(16,10,1,1,'#f4a6b8',.7)}
 else{r(11,9,2,1,'#2a2438');r(15,9,2,1,'#2a2438');r(13,11,2,1,'#c07070');r(11,10,1,1,'#f4b6a8',.6);r(16,10,1,1,'#f4b6a8',.6)}
 r(9,13,10,13,C.robe);r(8,15,1,10,C.robe);r(19,15,1,10,C.robe);r(13,13,2,13,C.trim,.5);r(9,25,10,1,C.trim);
 if(t==='ot'){r(13,14,2,6,'#c0392b');r(3,22,22,2,'#8a6a4a');r(4,24,1,6,'#6a4a2a');r(23,24,1,6,'#6a4a2a');r(4,17,6,5,'#f8f8f8');r(5,16,6,1,'#eee');r(18,19,3,3,'#6a3a2a')}
 if(t==='lazy'){r(20,17,3,4,'#7a4a2a');r(23,18,1,2,'#7a4a2a');r(20,16,3,1,'#fff',.6);r(5,20,5,3,'#ffd6e0')}
 if(t==='old'){r(22,6,1,24,'#8a6a3a');r(21,5,3,2,'#c9a54a')}if(t==='sorry'){r(6,15,3,2,C.skin);r(19,15,3,2,C.skin)}if(t==='scheme'){r(6,16,3,2,C.skin);r(5,14,2,2,'#f2c94c')}if(t==='fake'){r(18,16,4,2,C.skin);r(21,13,2,3,'#d4708f')}
 r(8,23,2,2,C.skin);r(18,23,2,2,C.skin);
 if(WR&&WR.pat<35&&t!=='fake'&&t!=='scheme'){r(18,4,2,1,'#e74c3c');r(19,3,1,3,'#e74c3c')}}
const TCOL=['#9aa0a6','#2f8a4a','#2d7dd2','#8e44ad','#e67e22','#d81b60','#c0392b'];
function wrRender(){const el=document.getElementById('wrB');if(!el||!WR)return;const G=GODS[WR.god],q=WR.q||'';
 const timeLeft=WR.end?Math.max(0,Math.round((WR.end-Date.now())/1000)):0;
 el.innerHTML=`<div class="in"><div class="L"><div class="top"><span>◇ ห้องสีขาว · ระหว่างโลก</span><span>${G.timer?`⏱️ ${Math.floor(timeLeft/60)}:${String(timeLeft%60).padStart(2,'0')}`:''}</span></div>
 <div class="stage"><canvas id="wrG" width="168" height="200"></canvas><div class="name">✨ ${G.n}</div><div class="tag">${G.tag}</div>
 ${WR.god==='fake'||WR.god==='scheme'?'':`<div class="pat">😊<div class="bar"><i style="width:${WR.pat}%"></i></div>💢</div>`}
 <div class="bub pop">${WR.say||''}</div>${WR.canKnow&&!WR.knew?`<button class="know" onclick="wrKnow()">👁️ "ข้าจำแกได้"</button>`:''}</div></div>
 <div class="R"><div class="pts"><span>🪙 แต้มวาสนาจากชีวิตก่อน</span><b>${WR.pts} / ${WR.max}</b></div>
 <div class="srch"><input id="wrQ" value="${E(q)}" placeholder="ค้นหาสกิล เช่น ไฟ แมว เงิน" onkeydown="if(event.key==='Enter')wrSearch()"><button onclick="wrSearch()">🔍</button><button onclick="wrRe()">🎲 3 ใบใหม่</button></div>
 <div class="tag2" style="font-size:11px;color:#8a7f6a;margin-top:4px">สกิลทั้งหมด ${fmt(WN)} แบบ · แตะการ์ดเพื่อหยิบใส่ตะกร้า · แตะในตะกร้าเพื่อคืน</div>
 <div class="cards">${WR.cards.map((s,i)=>`<button class="cd ${s.cost>WR.pts||WR.done?'no':''}" style="--c:${TCOL[s.t]}" onclick="wrPick(${i})"><span class="r">${TN[s.t]}</span><div class="ic">${s.ic}</div><div class="n">${E(s.n)}</div><div class="d">${E(s.d)}</div><div class="fx">${fxT(s.fx)}</div><div class="cost">${s.cost} แต้ม</div></button>`).join('')}</div>
 <div class="bask">${WR.bask.length?WR.bask.map((s,j)=>`<span onclick="wrDrop(${j})">${s.ic} ${E(s.n)}</span>`).join(''):'<small>ตะกร้ายังว่าง</small>'}${WR.hid.length?`<span class="x">❓ ของแถมที่${WR.god==='fake'?'เธอ':'เทพ'}แอบใส่ ×${WR.hid.length}</span>`:''}</div>
 <div class="bar2"><button onclick="wrNego()" ${WR.done?'disabled':''}>🎭 ต่อรอง</button><button onclick="wrBribe()" ${WR.done||WR.bribed?'disabled':''}>🙏 ติดสินบน</button><button class="go" onclick="wrGo()">ไปเกิด ▶</button></div></div></div>`;
 for(let i=0;i<20;i++){const d=document.createElement('div');d.className='dust';d.style.left=(i*53%100)+'%';d.style.top=(i*37%80)+'%';d.style.animationDelay=(i%6)+'s';el.firstElementChild.appendChild(d)}
 try{deity(document.getElementById('wrG'),WR.god)}catch(e){}}
window.wrSearch=()=>{if(!WR||WR.done)return;const i=document.getElementById('wrQ');WR.q=i?i.value.trim().slice(0,20):'';wrDraw3();wrPat(GODS[WR.god].dr.re*.5);wrLine('re');wrRender()};
window.wrRe=()=>{if(!WR||WR.done)return;WR.rer++;wrDraw3();wrPat(GODS[WR.god].dr.re*(1+WR.rer*.08));wrLine(WR.pat<30?'low':'re');wrRender()};
window.wrPick=i=>{if(!WR||WR.done||WR.dest)return;const s=WR.cards[i];if(!s)return;if(s.cost>WR.pts){WR.say='"แต้มไม่พอนะ"';return wrRender()}
 WR.pts-=s.cost;WR.bask.push(s);const G=GODS[WR.god],n=WR.bask.length;
 if(n>5&&WR.god!=='sorry'&&rnd()<(WR.god==='fake'?.8:.5))WR.hid.push(pick(BD.curse.filter(c=>c.t<=(WR.god==='old'?4:3))));
 wrLine(s.t>=6?'forb':s.t>=4?'rare':n>=5?'many':'add');if(WR.god==='old'&&rnd()<.25)WR.hid.push(pick(BD.curse.filter(c=>c.t<=1)));
 WR.cards[i]=wSkill(R(0,9999));wrPat(G.dr.add*(1+n*.35));if(n>=12&&WR.god!=='fake'&&WR.god!=='scheme'&&!WR.done){WR.pat=0;setTimeout(wrOut,400)}
 try{navigator.vibrate&&navigator.vibrate(15)}catch(e){}wrRender()};
window.wrDrop=j=>{if(!WR||WR.done)return;const s=WR.bask.splice(j,1)[0];if(!s)return;WR.pts=Math.min(WR.max,WR.pts+Math.round(s.cost*.8));wrLine('rm');wrPat(GODS[WR.god].dr.rm);wrRender()};
window.wrNego=()=>{if(!WR||WR.done)return;const G=GODS[WR.god];if(WR.god==='fake'||WR.god==='scheme'){WR.pts+=60;WR.max+=60;wrLine('nOK');return wrRender()}
 const el=document.getElementById('wrB');el.classList.remove('on');mgRead(`ต่อรองกับ${G.n}`,G.n,sc=>{el.classList.add('on');const ok=sc>=(WR.god==='old'?.7:WR.god==='ot'?.65:.55);if(ok){const g=Math.round(30+sc*50);WR.pts+=g;WR.max+=g;wrLine('nOK');wrPat(4)}else{wrLine('nNo');wrPat(WR.god==='sorry'?8:26)}wrRender()})};
window.wrBribe=()=>{if(!WR||WR.done||WR.bribed)return;const G=GODS[WR.god],m=Math.max(0,+WR.carry.money||0);WR.bribed=1;
 if(G.bribe==='coffee'){const g=60+Math.min(60,Math.round(Math.log10(1+m)*8));WR.pts+=g;WR.max+=g;WR.pat=Math.min(100,WR.pat+20);wrLine('bOK');WR.say+=` <span style="color:#b8860b">(+${g} แต้ม · ใช้เงินจากชีวิตก่อนซื้อกาแฟ)</span>`}
 else if(G.bribe==='any'){WR.pts+=80;WR.max+=80;wrLine('bOK');WR.hid.push(pick(BD.curse.filter(c=>c.t>=2)))}
 else if(WR.god==='old'){wrLine('bNo');wrPat(18)}else{wrLine('bOK');WR.pts+=20;WR.max+=20}wrRender()};
window.wrKnow=()=>{if(!WR)return;WR.knew=1;wrLine('know');WR.say+=' <i style="color:#6a3a8a">(คุณเห็นเงาหลายแขนข้างหลังเธอชัดเจน ครั้งนี้คุณไม่ลืม)</i>';WR.pts+=40;WR.max+=40;wrRender()};
window.wrStart=function(carry){wrCss();window._wrOn=1;try{auto=false}catch(e){}try{choice._cur=null;if(choice._q)choice._q.length=0}catch(e){}let el=document.getElementById('wrB');if(!el){el=document.createElement('div');el.id='wrB';document.body.appendChild(el)}
 let H={};try{H=LS.get('murim_fangod',{})||{}}catch(e){}const god=carry&&carry.god||wrGodPick();const G=GODS[god],p=wrPts(carry||{});
 WR={god,pts:p,max:p,pat:100,cards:[],bask:[],hid:[],q:'',rer:0,carry:carry||{},done:0,canKnow:god==='scheme'&&H.met&&!H.killed};
 wrDraw3();wrLine('hi');if(god==='lazy'&&rnd()<.06){wrLine('inst');WR.bask=[0,1,2,3,4].map(()=>wSkill(R(0,9999)));WR.done=1;WR.out='inst';setTimeout(()=>wrGo(true),2600)}
 if(G.timer){WR.end=Date.now()+G.timer*1000;WR.tmr=setInterval(()=>{if(!WR||WR.done){clearInterval(WR&&WR.tmr);return}if(Date.now()>=WR.end){WR.pat=0;wrOut()}else{const t=document.querySelector('#wrB .top span:last-child');if(t){const s=Math.max(0,Math.round((WR.end-Date.now())/1000));t.textContent=`⏱️ ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}}},1000)}
 try{closeM()}catch(e){}el.classList.add('on');wrRender();try{sfx('magic')}catch(e){}};
function wrGo(forced){if(!WR)return;if(!forced&&!WR.bask.length&&!confirmNoSkill())return;const out=WR.out;clearInterval(WR.tmr);WR.done=1;WR.dest=1;const el=document.getElementById('wrB');if(!el)return;
 const D=[[out==='trash'?'trash':'hero','⚔️','ถูกอัญเชิญไปต่างโลก','ร่างเดิม ชื่อเดิม เริ่มที่อายุ 16 กลางวงเวทของอาณาจักรอัลเวิร์น'],['magic','🔮','เกิดใหม่ในโลกเวทมนตร์','เกิดเป็นทารก ความทรงจำชาติก่อนกลับมาตอนอายุ 12'],['noble','🏰','เกิดใหม่ในโลกแห่งอะคาเดมี่','เกิดเป็นเด็กทุน ความทรงจำกลับมาตอนอายุ 12']];
 const R=el.querySelector('.R');if(R)R.innerHTML=`<div class="pts"><span>🌍 จะไปที่ไหน?</span><b>${WR.bask.length} สกิล${WR.hid.length?` +❓${WR.hid.length}`:''}</b></div>${D.map(d=>`<button class="cd" style="--c:#2a2438;min-height:0;width:100%;flex-direction:row;gap:12px;align-items:center;text-align:left;margin-bottom:10px" onclick="wrBirth('${d[0]}')"><div class="ic" style="margin:0;font-size:34px">${d[1]}</div><div><div class="n" style="font-size:15px">${d[2]}</div><div class="d">${d[3]}</div></div></button>`).join('')}<div class="bask">${WR.bask.map(s=>`<span>${s.ic} ${E(s.n)}</span>`).join('')}</div>`;
 WR.say=GODS[WR.god].L.go;const b=el.querySelector('.bub');if(b)b.innerHTML=WR.say}
window.wrGo=()=>wrGo(false);
function confirmNoSkill(){WR.say='"ไม่เอาสักอันเลยเหรอ? กดอีกครั้งถ้าแน่ใจ"';if(WR.noSk){return true}WR.noSk=1;wrRender();return false}
function wrRollB(top){const L=BD['org_'+top]||BD.org_iso;const b={org:wPickB(L),race:top==='iso'?BD.race[0]:wPickB(BD.race),el:wPickB(BD.el),mana:wPickB(BD.mana),omen:wPickB(BD.omen),mark:wPickB(BD.mark),tal:[],curse:wPickB(BD.curse),fam:wPickB(BD.fam),item:wPickB(BD.item),sec:wPickB(BD.sec)};for(let i=0;i<3;i++)b.tal.push(wPickB(BD.tal,b.tal.map(x=>x.n)));return b}
window.wrBirth=w=>wrBirth(w);
function wrBirth(w){if(!WR)return;window._wrOn=0;try{document.getElementById('wrB').classList.remove('on')}catch(e){}const c=WR.carry||{},top=w==='hero'||w==='trash'?'iso':w;const b=wrRollB(top);
 b.wsk=WR.bask.map(s=>({ic:s.ic,n:s.n,d:s.d,t:s.t,fx:s.fx}));b.wcur=WR.hid.slice();
 const g=c.g||(rnd()<.5?'ชาย':'หญิง');const RR={top,w,g,name:top==='iso'?(c.n||nm()):nm(g==='หญิง'?'f':'m'),b,sk:w==='hero'||w==='trash'?pick(SK[w])[0]:null,hair:pick(HAIR),skin:pick(SKIN),seed:R(1,99999),god:{k:WR.god,n:GODS[WR.god].n,scheme:WR.god==='scheme'?1:0,fake:WR.god==='fake'?1:0,knew:WR.knew?1:0,out:WR.out||''},carry:c};
 try{if(WR.god==='scheme'){const H=LS.get('murim_fangod',{})||{};H.met=(H.met|0)+1;LS.set('murim_fangod',H)}}catch(e){}
 WR=null;fanBegin(RR)}
// ---- หลังเกิด: เทพตามมาในชีวิต ----
for(const w of ['hero','trash','magic','noble'])Object.assign(ENDS[w],{godfree:['⚔️','เทพตาย คุณเป็นอิสระ','ล้มเทพที่ใช้คุณเป็นหมาก แล้วใช้ชีวิตแบบไม่มีสกิลจากใคร'],godthrone:['👑','บัลลังก์ที่ว่าง','ฆ่าเทพแล้วนั่งแทน'],godeal:['⛓️','ข้อเสนอของเทพ','รับข้อเสนอกลางศึก แลกกับความจริงที่ต้องแบกไปตลอด'],godpawn:['🤝','หมากทุกตัวเป็นอิสระ','ปลดปล่อยทุกคนที่ถูกอัญเชิญมาเป็นหมาก'],godrule:['🗝️','กฎข้อใหม่ของสวรรค์','เขียนกฎที่ไม่มีเทพองค์ไหนอัญเชิญใครได้อีก',1]});
const gk=K=>(K.god&&K.god.gk)|0;const gkAdd=(K,t)=>{K.god.gk=gk(K)+1;return ` · ⚔️ อาวุธฆ่าเทพ ${K.god.gk}/3${t?' ('+t+')':''}`};
const GST=[
 K=>C('⛪ โบสถ์ที่ไม่เคยมีมาก่อน',`โบสถ์ของ "${E(K.god.n)}" ผุดขึ้นในเมืองที่คุณเพิ่งผ่านไป รูปปั้นในโบสถ์มีหน้าเหมือนเทพที่ห้องสีขาว และที่ฐานรูปปั้นมีชื่อเมืองทุกเมืองที่คุณเคยชนะศึก`,[O('🔍 สืบว่าใครสร้าง',()=>{K.god.sus=1;feed('🔍 นักบวชบอกว่าทุกครั้งที่ "ผู้ได้รับพร" ชนะ ศรัทธาจะไหลไปหาเทพี — คุณคือผู้ได้รับพรคนนั้น'+(K.clue<3?clue(K,'ทุกชัยชนะของคุณเลี้ยงเทพีออเรลิส'):''))},'',.6),O('🙏 สวดมนต์ขอบคุณ',()=>{K.pw+=capOf(K)*.08;feed('🙏 พลังไหลเข้าตัวคุณ อุ่นเกินไปนิด เหมือนมีคนลูบหัวสุนัข')},'',.4)]),
 K=>C('🧓 ผู้กล้าที่ถูกทิ้ง',`ชายแก่ขาเป๋ขายของในตลาดเรียกชื่อคุณถูก "เจ้าก็ได้สกิลจากเธอเหมือนกันสินะ ข้าคือหมากตัวที่ 29 พอข้าแก่ เธอก็ปิดสกิลข้าทั้งหมดในคืนเดียว"`,[O('🤝 ชวนมาเป็นพวก',()=>{feed('🤝 เขาหัวเราะทั้งน้ำตา "รอคนพูดประโยคนี้มาสามสิบปี" เขารู้ทางไปวิหารลับ'+gkAdd(K,'หมากที่ถูกทิ้ง'))},'',.6),O('💰 ให้เงินแล้วเดินจาก',()=>feed('💰 เขารับเงิน แล้วพูดตามหลังว่า "เจ้าจะเป็นข้าในอีกสามสิบปี"'+money(-50)),'',.4)]),
 K=>C('🌙 คำสั่งในความฝัน',`เทพีมาเข้าฝัน ยิ้มเหมือนวันแรก "ข้าต้องการให้เจ้า${isIso(K)?'ฆ่าราชาปีศาจภายในปีนี้':'เผาหอสมุดต้องห้าม'} ทำแล้วข้าจะให้สกิลเพิ่มอีกสามอย่าง"`,[O('✅ ทำตาม',()=>{K.pw+=capOf(K)*.25;feed('✅ คุณได้พลังเพิ่ม และรู้สึกเหมือนเชือกที่ผูกคอแน่นขึ้นอีกเส้น'+dark(12))},'',.4),O('❌ ขัดคำสั่ง',()=>{K.pw*=.8;S.maxHp=Math.round(S.maxHp*.9);say('⛓️ คืนนั้นสกิลที่เทพีให้ดับไปทีละอย่างเหมือนเทียน · พลังลดลง แต่ครั้งแรกในชีวิตใหม่ คุณรู้สึกว่าตัวเองเป็นเจ้าของร่างนี้','bad',true);feed(gkAdd(K,'เจตจำนงของตัวเอง'))},'สกิลจะถูกปิดบางส่วน',.6)]),
 K=>C('😪 เทพธิดาที่ไม่ชอบหน้าเธอ',`เทพธิดาขี้เกียจที่เคยเห็นในตำราโผล่มาที่ร้านกาแฟข้างทาง "เธอเป็นหมากของออเรลิสสินะ ฉันเกลียดยัยนั่น เพราะมันชอบแย่งคิวพักเที่ยง… อยากรู้ชื่อจริงของมันไหม"`,[O('☕ เลี้ยงกาแฟแลกชื่อ',()=>{feed('☕ เธอเขียนชื่อจริงของเทพีลงบนกระดาษเช็ดปาก ตัวอักษรร้อนจนกระดาษไหม้'+gkAdd(K,'ชื่อจริงของเทพ')+(K.clue<3?clue(K,'ชื่อจริงของออเรลิส'):''))},'',.7),O('🙅 ไม่ไว้ใจเทพองค์ไหนอีก',()=>feed('🙅 เธอยักไหล่ "ฉลาดดี" แล้วกินเค้กของคุณ'),'',.3)]),
 K=>C('🔥 ศรัทธาที่ขโมยกลับ',`โบสถ์ของเทพีเต็มไปด้วยคนที่สวดขอให้ "ผู้ได้รับพร" ปกป้อง ทุกคำสวดคือพลังของเธอ`,[O('📢 บอกความจริงกับทุกคน',()=>mgRead('เทศนาความจริงหน้าโบสถ์','ฝูงชนผู้ศรัทธา',sc=>{if(sc>.55)feed('📢 คนครึ่งเมืองเลิกสวด รูปปั้นเทพีร้าวกลางอก'+rep(5)+gkAdd(K,'ศรัทธาที่หายไป'));else feed('📢 ฝูงชนขว้างหินใส่คุณ'+hurt(.2)+rep(-5))}),'มินิเกม',.6),O('🔥 เผาโบสถ์ตอนกลางคืน',()=>feed('🔥 รูปปั้นละลาย คนเมืองนี้เกลียดคุณ แต่เทพีกรีดร้องในหัวคุณทั้งคืน'+dark(15)+gkAdd(K,'วิหารที่มอดไหม้')),'',.4)])];
function godFinal(K){K.god.fin=(K.god.fin|0)+1;const pawnsOk=isIso(K)?(X2(K).cls||[]).filter(c=>!/dead|lost|home/.test(c.st)).length>=10||gk(K)>=5:gk(K)>=4;
 C('⬜ ห้องสีขาวอีกครั้ง',`คุณเดินกลับเข้าห้องสีขาวด้วยเท้าตัวเอง เทพี${E(K.god.n.replace('เทพี',''))}ไม่ยิ้มแล้ว "หมากไม่ควรเดินเองได้" · อาวุธฆ่าเทพ ${gk(K)}/3`,[
  O('⚔️ สู้',()=>{let tot=0;mgDuel('ดวลกับเทพี',K.god.n,a=>{tot+=a;mgRead('จับคำโกหกของเทพ',K.god.n,b=>{tot+=b;mgRune('ถอดรูนชื่อจริงของเทพ',6,c=>{tot+=c;const sc=tot/3+gk(K)*.06;if(sc<.5){S.hp=Math.max(1,Math.round(S.maxHp*.2));say('⬜ เทพีโยนคุณกลับลงไปในโลก "อีกสักพันปีค่อยกลับมา" · ยังไม่จบ','bad',true);K.god.at=age()+3;return}
   const o=[O('⚔️ ปลิดชีพเทพ แล้วเดินออกไป',()=>godEnd(K,'godfree','ดาบของคุณแทงทะลุแสง เทพีสลายเป็นฝุ่นทอง สกิลทุกอย่างที่เธอให้หายไปพร้อมกัน คุณเดินออกจากห้องสีขาวด้วยร่างกายธรรมดาๆ และรู้สึกเบาที่สุดในชีวิต','ใช้ชีวิตที่เหลือแบบไม่มีสกิลจากเทพองค์ไหน'),'',.4),
    O('👑 นั่งลงบนบัลลังก์ของเธอ',()=>godEnd(K,'godthrone','บัลลังก์ยังอุ่น เบื้องล่างคุณมีห้องสีขาวอีกพันห้อง แต่ละห้องมีคนตายรออยู่ คุณต้องตัดสินใจว่าจะอัญเชิญใครต่อ','กลายเป็นเทพองค์ใหม่ผู้ประทานพร'),'',.2)];
   if(pawnsOk)o.push(O('🤝 ปลดปล่อยหมากทุกตัว',()=>godEnd(K,'godpawn','คุณกระชากเส้นด้ายที่ผูกหมากทุกตัวไว้กับนิ้วเทพี ทั่วทั้งทวีป ผู้ถูกอัญเชิญทุกคนรู้สึกว่าอะไรบางอย่างหลุดออกจากคอ หลายคนร้องไห้โดยไม่รู้ว่าทำไม','ใช้ชีวิตที่เหลือกับเพื่อนที่เป็นอิสระทุกคน'),'',.3));
   if(K.clue>=3)o.push(O('🗝️ เขียนกฎข้อใหม่ลงในคัมภีร์สวรรค์',()=>godEnd(K,'godrule','คุณใช้ชื่อจริงของเทพีเป็นหมึก เขียนกฎข้อเดียว: "ห้ามอัญเชิญผู้ใดโดยไม่ยินยอม" ห้องสีขาวทุกห้องดับไฟพร้อมกัน และในโลกเดิม รถบรรทุกคันหนึ่งเบรกทันพอดี','เขียนกฎใหม่ของสวรรค์ แล้วกลับไปใช้ชีวิตที่ไม่มีใครควบคุม'),'🗝️ ฉากจบลับ',.1));
   C('⬜ เทพีคุกเข่า','แสงรอบตัวเธอแตกเป็นเสี่ยงๆ เธอเงยหน้ามองคุณเป็นครั้งแรกเหมือนมองคน ไม่ใช่หมาก',o)})})})},'มินิเกม 3 ด่าน',.6),
  O('⛓️ ฟังข้อเสนอของเธอ',()=>C('⛓️ ข้อเสนอของเทพ','"วางดาบลง ข้าจะส่งเจ้ากลับโลกเดิม ไปเกิดในบ้านเดิม แม่เดิม และเจ้าจะไม่ต้องจำอะไรเลย"',[O('✅ รับข้อเสนอ',()=>godEnd(K,'godeal','คุณลืมตาบนเตียงในบ้านเดิม แม่เรียกให้ลงมากินข้าว ทุกอย่างปกติ ยกเว้นบางคืนที่คุณฝันถึงห้องสีขาว และรู้ว่ามีคนกำลังถูกอัญเชิญแทนคุณ','กลับไปใช้ชีวิตในโลกเดิม โดยรู้ว่าวงจรยังไม่จบ'),'',.4),O('❌ ปฏิเสธ แล้วยกดาบขึ้น',()=>godFinal(K),'',.6)]),'',.4)])}
function godEnd(K,k,t,c){try{const H=LS.get('murim_fangod',{})||{};if(k!=='godeal')H.killed=(H.killed|0)+1;LS.set('murim_fangod',H)}catch(e){}ending(K,k,t,c)}
const CAMEO={lazy:K=>C('😪 เทพธิดาขี้เกียจแวะมา',`${E(K.god.n)}นั่งอยู่ที่ร้านข้างทาง สวมแว่นดำปลอมตัว "อย่าบอกใครนะว่าฉันโดดงาน… สกิลที่ให้ไปใช้ดีไหม"`,[O('☕ เลี้ยงกาแฟ',()=>{K.save=(K.save|0)+1;feed('☕ เธอดื่มรวดเดียวแล้วแตะหน้าผากคุณ "ของแถม ห้ามบอกหัวหน้า" · รอดตาย +1')},'',.6),O('📢 ฟ้องสวรรค์ว่าเทพโดดงาน',()=>feed('📢 ฟ้าผ่าลงข้างตัวคุณหนึ่งที แล้วเงียบไป'+hurt(.1)),'',.4)]),
 ot:K=>C('💼 ตรวจสอบการใช้สกิลประจำปี',`เทพธิดาแผนกอัญเชิญถือแฟ้มหนาเตอะ "สวัสดีค่ะ มาตรวจสอบการใช้สกิลตามระเบียบ ขอเอกสารยืนยันการทำความดี 12 ฉบับค่ะ"`,[O('📑 กรอกแบบฟอร์มให้ครบ',()=>mgRune('กรอกแบบฟอร์มตรวจสอบ',5,sc=>feed(sc>.6?'📑 ผ่านการตรวจสอบ ได้ตราประทับ "ผู้ถูกอัญเชิญดีเด่น"'+rep(5)+money(200):'📑 กรอกผิดช่อง ถูกปรับ'+money(-150))),'มินิเกม',.6),O('☕ ยื่นกาแฟให้',()=>feed('☕ "…ถือว่าผ่านค่ะ" เธอปั๊มตราโดยไม่เปิดแฟ้ม'),'',.4)]),
 old:K=>C('👴 พระเจ้าเฒ่าบ่นในความฝัน','พระเจ้าเฒ่าโผล่มาในความฝันพร้อมไม้เท้า "ข้าดูเจ้ามาตลอด ใช้สกิลไม่คุ้มเลยสักอย่าง สมัยข้า…"',[O('👂 นั่งฟังจนจบ',()=>{S.int=(S.int||0)+10;feed('👂 เขาบ่นสามชั่วโมง แต่แทรกความรู้ที่ไม่มีในตำราไว้ทุกห้านาที')},'',.6),O('😴 หลับในฝันซ้อน',()=>feed('😴 เขาโกรธจนฝนตกทั้งเมืองสามวัน'),'',.4)]),
 sorry:K=>C('🙇 เทพหนุ่มกลับมาอีกครั้ง','"ขอโทษอีกครั้งครับ! ผมเพิ่งเจอว่าให้สกิลขาดไปหนึ่งอย่าง" เขายื่นกล่องของขวัญมาให้',[O('🎁 รับไว้',()=>{const s=wSkill(R(0,9999));K.bt.wsk=(K.bt.wsk||[]).concat([{ic:s.ic,n:s.n,d:s.d,t:s.t,fx:s.fx}]);const o=fxP(s.fx);for(const k in o)if(typeof o[k]==='number')K.fx[k]=(K.fx[k]||0)+o[k];if(o.pow)K.pw+=o.pow;if(o.mp){K.mpM+=o.mp}feed(`🎁 ได้สกิลใหม่: ${s.ic} <b>${E(s.n)}</b> — ${E(s.d)}`)},'',.7),O('🙂 บอกว่าไม่เป็นไร',()=>{S.karma=(+S.karma||0)+10;feed('🙂 เขาร้องไห้ "คุณเป็นคนดีที่สุดที่ผมเคยฆ่าผิดเลยครับ"')},'',.3)])};
{const _cd2=conDue;conDue=function(K,c){if(c.id!=='god')return _cd2.apply(this,arguments);c.paid=1;C('💗 "เทพธิดา" มาทวงสัญญา',`โรสมารีปรากฏตัวพร้อมเขาสีดำที่ไม่ซ่อนแล้ว และหางที่ปลายเป็นหัวใจ "ถึงเวลาจ่ายแล้วจ้ะที่รัก สกิลทั้งหมดที่ให้ไป ฉันขอวิญญาณครึ่งหนึ่งเป็นค่าตอบแทน"`,[
 O('⚔️ สู้กับปีศาจ',()=>duel('ปีศาจโรสมารี',Math.round(S.power*1.2),w=>{if(w){say('⚔️ เธอสลายเป็นกลีบกุหลาบดำ สัญญาขาดลง สกิลยังอยู่ครบ','epic',true);rep(10)}else{K.pw*=.6;say('⚔️ คุณแพ้ เธอดึงวิญญาณครึ่งหนึ่งออกไป · พลังเหลือ 60%','bad',true)}}),'ต่อสู้',.4),
 O('🧠 หาช่องโหว่ในสัญญา',()=>mgRead('อ่านสัญญาปีศาจ','โรสมารี',sc=>{if(sc>.65)say('🧠 สัญญาเขียนว่า "วิญญาณครึ่งหนึ่งของผู้ทำสัญญา" แต่คุณเกิดใหม่แล้ว วิญญาณนี้ไม่ใช่ของคนที่เซ็น เธอกรีดร้องแล้วหายไป','epic',true);else{K.pw*=.7;feed('🧠 ไม่มีช่องโหว่ เธอเอาไปส่วนหนึ่ง'+dark(10))}}),'มินิเกม',.4),
 O('💔 ยอมจ่าย',()=>{K.endY=Math.max(age()+2,Math.round(K.endY*.7));say('💔 คุณรู้สึกเย็นวาบไปทั้งตัว · อายุขัยหายไปเกือบหนึ่งในสาม','bad',true)},'',.2)])}}
{const _fy2=fanYear;fanYear=function(){const K=FN(),a0=S.age;_fy2.apply(this,arguments);if(!K||!K.god||!S.alive||S.age===a0||K.end)return;
 try{const g=K.god,y=age()-WD[K.w].a0;let ev=null;
  if(g.scheme){g.st=g.st|0;if(g.at==null)g.at=age()+(g.knew?1:R(3,5));
   if(age()>=g.at){if(g.st<GST.length){const i=g.st++;ev=()=>GST[i](K);g.at=age()+R(2,4)}else if(gk(K)>=3||age()>=WD[K.w].a0+40){ev=()=>godFinal(K);g.at=age()+99}}}
  else if(!g.cam&&CAMEO[g.k]&&y>=5&&rnd()<.15){g.cam=1;ev=()=>CAMEO[g.k](K)}
  if(ev&&QU.length<=1){queue(ev);flush()}}catch(e){console.error('godYear',e)}}}

{const _cd=checkDeath;checkDeath=function(){try{if(on()&&S.hp<=0&&!S.deathCause){const K=FN();if(K.save>0){K.save--;S.hp=Math.max(1,Math.round(S.maxHp*.35));say(`🪽 <b>รอดตายอย่างหวุดหวิด</b> — ชะตาที่ติดตัวมาดึงคุณกลับ (เหลือ ${K.save} ครั้ง)`,'epic',true);return false}}}catch(e){}return _cd.apply(this,arguments)}}
try{if(typeof coStart==='function'){const _cs=coStart;coStart=function(id){try{if(on()&&(id==='start'||/^mw_/.test(String(id))))return}catch(e){}return _cs.apply(this,arguments)}}}catch(e){}
try{const st=document.createElement('style');st.textContent='body.fanW #hintBar{display:none!important}';document.head.appendChild(st)}catch(e){}
window._fan={wSkill,godFinal,GST,mgDungeon,mgPotion,mgDuel,mgDance,mgNames,evCal,evClubPick,evQuest,evKnow,evReunion,FN,BD,WD,ENDS,arcStep,randEv,fanYear,ending};
})();try{wReady('fan')}catch(e){}
