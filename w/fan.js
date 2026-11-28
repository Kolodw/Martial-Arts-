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
 lost:{ic:'🌲',n:'หลงมิติ',g:'iso',a0:16,end:[62,80],d:'ระหว่างคาบเรียน พื้นห้องเรืองแสง เพื่อนทั้งห้องหายไปในวงเวท แต่คุณลืมตามาคนเดียวในที่ที่ไม่มีใครรู้ว่าคุณถูกอัญเชิญมา',sc:'🌲 ที่ไหนสักแห่งในทวีป'},
 magic:{ic:'🔮',n:'โลกเวทมนตร์',g:'aca',a0:12,end:[70,96],d:'จดหมายตอบรับมาพร้อมนกฮูกที่มีตาสามดวง วิทยาลัยเวทอาร์คาเนียรับนักเรียนปีละหกสิบคน และทุกปีจะมีคนไม่ได้กลับบ้าน',sc:'🏰 วิทยาลัยอาร์คาเนีย'},
 noble:{ic:'🏰',n:'โลกแห่งอะคาเดมี่',g:'aca',a0:12,end:[62,84],d:'สถาบันหลวงเซนต์ลูเมียรับเฉพาะลูกขุนนาง ปีนี้มีข้อยกเว้นหนึ่งคน คือคุณ เด็กทุนจากหมู่บ้านที่ไม่มีใครรู้จัก',sc:'🏛️ สถาบันหลวงเซนต์ลูเมีย'}};
const EL={fire:['🔥','ไฟ'],water:['💧','น้ำ'],wind:['🌪️','ลม'],earth:['🪨','ดิน'],light:['✨','แสง'],shadow:['🌑','เงา']};
const RARE={time:['⏳','เวลา','ย้อนจังหวะได้ครั้งละไม่กี่วินาที แต่อายุขัยหายทุกครั้งที่ใช้'],space:['🌀','มิติ','พับระยะทาง เปิดประตูไปที่ที่เคยเห็น'],death:['💀','ความตาย','ได้ยินเสียงคนตาย และคนตายได้ยินคุณ']};
const SK={ // สกิลติดตัว (ต่างโลก)
 hero:[['sword','⚔️','ดาบศักดิ์สิทธิ์','ฟันทุกอย่างที่มีความชั่วร้าย'],['shield','🛡️','โล่แห่งพันธสัญญา','รับแทนเพื่อนได้ครั้งละหนึ่งคน'],['appraise','🔍','ประเมินขั้นสูง','เห็นค่าสถานะและความลับของทุกคน'],['charm','💗','เสน่ห์ผู้กล้า','ทุกคนอยากช่วยคุณ ทั้งที่ไม่รู้ว่าทำไม']],
 trash:[['pick','🧺','เก็บของ','เก็บของได้ทุกอย่างที่มือจับได้'],['wait','⌛','รอ','ยิ่งรอนาน ผลยิ่งแรง'],['copy','📋','จดจำ','จำได้ทุกอย่างที่เห็นครั้งเดียว'],['taste','👅','ชิม','ชิมแล้วรู้ว่าสิ่งนั้นทำมาจากอะไร']],
 lost:[['rift','🌀','ก้าวข้ามมิติ','วาร์ปได้ระยะสั้น'],['beast','🐾','ภาษาสัตว์','คุยกับสัตว์และมอนสเตอร์ได้'],['heal','🌿','มือเยียวยา','รักษาบาดแผลได้'],['sense','👁️','ตาทะลวงหมอก','มองเห็นสิ่งที่ซ่อนอยู่'],['nap','😴','หลับได้ทุกที่','หลับสนิทได้ในทุกสถานการณ์',1],['salt','🧂','เสกเกลือ','เสกเกลือได้วันละหนึ่งช้อน',1],['dir','🧭','รู้ทิศเหนือ','รู้เสมอว่าทิศเหนืออยู่ทางไหน',1],['shine','✨','ตัวเรืองแสง','ตัวเรืองแสงอ่อนๆ ตอนกลางคืน',1]]};
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
 if(w==='hero'||w==='trash'||w==='lost'){K.npc.rival={n:pick(TH),role:'เพื่อนร่วมห้องที่ได้สกิลดีกว่า',aff:40,alive:1,mem:[]};K.npc.pal={n:pick(TH.filter(x=>x!==K.npc.rival.n)),role:'เพื่อนสนิทจากโลกเดิม',aff:70,alive:1,mem:[]};P('king','ราชาแห่งอัลเวิร์น','m');P('priest','นักบวชผู้อัญเชิญ','f');P('demon','ราชาปีศาจ','m');K.home=100}
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
function mgRing(title,cb){cb=mgW(cb,'ring');if(auto)return cb(autoSc());let round=0,score=0,ang=0,sp=3.2,zone=0,raf=0,done=0;const ZW=64;
 const newZ=()=>{zone=R(30,300);sp=2.6+round*.6};newZ();
 const draw=()=>{const z=document.getElementById('fmgZ'),n=document.getElementById('fmgN'),r=document.getElementById('fmgRd');if(!z||!n){cancelAnimationFrame(raf);if(!done){done=1;cb(score/3)}return}
  z.style.background=`conic-gradient(transparent ${zone}deg,#ffd37a ${zone}deg ${zone+ZW}deg,transparent ${zone+ZW}deg)`;n.style.transform=`rotate(${ang+180}deg)`;if(r)r.textContent=`รอบ ${round+1}/3 · คะแนน ${score.toFixed(1)}`};
 const loop=()=>{ang=(ang+sp)%360;draw();raf=requestAnimationFrame(loop)};
 window._fmgHit=()=>{if(done)return;const c=zone+ZW/2,d=Math.abs(((ang-c+540)%360)-180);const s=d<ZW*.3?1:d<ZW/2?.75:d<ZW?.35:0;score+=s;try{navigator.vibrate&&navigator.vibrate(s>=.7?25:60)}catch(e){}round++;if(round>=3){done=1;cancelAnimationFrame(raf);closeM();cb(score/3)}else newZ()};
 modal(`<div class="fmg"><h3>🔮 ${title}</h3><div class="tg">แตะ "ร่าย" ตอนเข็มชี้ในวงสีทอง · ยิ่งตรงกลางยิ่งแรง</div><div class="fmgR"><div class="zn" id="fmgZ"></div><div class="nd" id="fmgN"></div><div class="ct">✴️</div></div><div class="tg" id="fmgRd"></div><div class="fmgB"><button onclick="_fmgHit()" style="min-width:180px;font-size:18px">✨ ร่าย</button></div></div>`,'fanmg');loop()}
// 2) จำลำดับรูน
function mgRune(title,len,cb){cb=mgW(cb,'rune');if(auto)return cb(autoSc());const RU=['ᚠ','ᚱ','ᚦ','ᛉ','ᛟ','ᚹ','ᛞ','ᛗ','ᛒ'],seq=[];for(let i=0;i<len;i++)seq.push(R(0,8));let inp=[],lock=1,done=0;
 const btns=()=>[...document.querySelectorAll('#fmgRG button')];
 const show=i=>{if(i>=seq.length){lock=0;const t=document.getElementById('fmgRT');if(t)t.textContent='ตาคุณแล้ว: กดตามลำดับ';return}const b=btns()[seq[i]];if(!b)return;b.classList.add('lit');setTimeout(()=>{b.classList.remove('lit');setTimeout(()=>show(i+1),240)},650)};
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
 lost:{unsum:['🌟','ผู้กล้าที่ไม่มีใครอัญเชิญ','ปกป้องคนในพื้นที่ด้วยตัวเอง'],native:['🏡','ตำนานพื้นเมือง','อยู่กับคนที่รับคุณไว้'],class30:['🎒','ผู้กล้าคนที่ 30','กลับไปรวมกับเพื่อนทั้งห้อง'],lhome:['🚪','กลับบ้านด้วยตัวเอง','หาวงเวทกลับโลกเดิมเอง'],chosen:['🌀','ปลายทางที่ถูกเลือก','???',1]},
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
 lost:[['fa_surv','🏕️','เอาตัวรอด'],['fa_lsk','🌀','ทดลองสกิล'],['fa_hunt','🏹','ล่าสัตว์ป่า'],['fa_help','🤝','ช่วยคนในพื้นที่'],['fa_guild','📜','รับเควสกิลด์',K=>K.f.guild],['fa_rest','🍵','พักผ่อน']],
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
 if((K.w==='hero'||K.w==='trash'||K.w==='lost')&&rnd()<.08&&!K.f.homeAsk)queue(()=>evHomesick(K));
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
// ---------- 🌲 หลงมิติ (โลกย่อยที่ 3 ของต่างโลก) ----------
const LSP={forest:['🌲','ป่าลึกที่ต้นไม้สูงเท่าตึก','เอลฟ์นักล่าสาวตาสีเขียว',['beast','sense','dir']],desert:['🏜️','กลางทะเลทรายแก้วที่ร้อนจนเห็นภาพลวง','กองคาราวานพ่อค้าขี้งก',['dir','salt','sense']],village:['🌾','กองฟางในยุ้งข้าวของหมู่บ้านชาวนา','ครอบครัวชาวนาที่มีลูกเจ็ดคน',['heal','nap','salt']],prison:['⛓️','ในคุกใต้ดินของโจรภูเขา','จอมโจรเฒ่าห้องขังข้างๆ',['rift','shine','sense']],abyss:['🌑','กลางดินแดนปีศาจใต้ฟ้าสีม่วง','เด็กปีศาจตัวน้อยที่หลงทางเหมือนกัน',['beast','shine','heal']],dragon:['🐉','บนหลังมังกรที่กำลังบินอยู่กลางเมฆ','มังกรแก่ขี้บ่นที่ไม่รู้ว่ามีคนขี่อยู่',['rift','nap','beast']]};
const lsp=K=>LSP[K.f.sp]||LSP.forest,lsk=K=>(SK.lost.find(s=>s[0]===K.sk)||SK.lost[0]),lsyn=K=>lsp(K)[3].includes(K.sk);
ARC.lost=[
 K=>{if(!K.f.sp)K.f.sp=pick(Object.keys(LSP));const P=lsp(K),s=lsk(K);C(`${P[0]} ลืมตาคนเดียว`,`คาบเรียนคณิตศาสตร์ พื้นห้องเรืองแสง เพื่อนทั้งห้องหายไปในวงเวท แต่คุณลืมตามา<b>${P[1]}</b> ไม่มีใคร ไม่มีราชา ไม่มีแผ่นประเมิน มีแค่ตัวหนังสือลอยในหัว: 「สกิล: ${s[1]} ${s[2]}」${s[4]?' (ฟังดูไม่ค่อยมีประโยชน์…)':''}`,[
  O('🏕️ หาที่หลบภัยก่อน',()=>{heal(.3);feed(`🏕️ คุณเอาตัวรอดคืนแรกได้${lsyn(K)?` — สกิล「${s[2]}」ช่วยไว้มากกว่าที่คิด`:''}`);if(lsyn(K)){K.pw+=capOf(K)*.1;K.f.syn=1}nextArc(K)},'',.4),
  O(`${s[1]} ลองใช้สกิลทันที`,()=>mgHold(`ลองใช้สกิล「${s[2]}」ครั้งแรก`,sc=>{if(sc>=.5||lsyn(K)){K.skL++;K.f.syn=lsyn(K)?1:0;feed(`${s[1]} สกิลทำงาน! ${s[4]?'มันกากจริงๆ แต่':'มันแรงกว่าที่คิด และ'}ที่นี่มันมีประโยชน์อย่างไม่น่าเชื่อ`)}else feed(`${s[1]} ไม่มีอะไรเกิดขึ้น… หรืออาจยังไม่ถึงเวลา`);nextArc(K)}),'มินิเกม',.35),
  O('📢 ตะโกนเรียกเพื่อน',()=>{feed('📢 ไม่มีใครตอบ มีแต่เสียงสะท้อน… และเสียงอะไรบางอย่างที่ได้ยินคุณ'+hurt(.15));K.f.lonely=1;nextArc(K)},'',.25)])},
 K=>{const P=lsp(K);C(`🤝 คนแรกที่เจอ`,`<b>${P[2]}</b>เจอคุณในสภาพมอมแมม พูดภาษาที่คุณฟังออกอย่างประหลาด`,[
  O('🙏 ขอความช่วยเหลือ',()=>{K.f.adopt=1;K.f.home2=P[2];feed(`🙏 ${P[2]}พาคุณกลับไปที่พัก ให้กิน ให้นอน ไม่ถามอะไรเลย · คุณมีที่ให้กลับแล้ว`);nextArc(K)},'',.45),
  O('🎭 โกหกว่าเป็นคนท้องถิ่น',()=>mgRead('แกล้งเป็นคนพื้นเมือง',P[2],sc=>{if(sc>=.55){K.f.native=1;feed('🎭 ไม่มีใครสงสัยเลย คุณได้ชื่อใหม่ในภาษาของโลกนี้')}else{K.f.adopt=1;feed('🎭 โกหกไม่เนียน แต่เขาก็ยังพาคุณไปด้วย หัวเราะใส่สำเนียงคุณทั้งทาง')}nextArc(K)}),'มินิเกม',.3),
  O('🏃 หนี ไม่ไว้ใจใคร',()=>{K.pw+=capOf(K)*.08;K.f.lonely=1;feed('🏃 คุณใช้ชีวิตคนเดียวหนึ่งปีเต็ม แข็งแกร่งขึ้น แต่เงียบลง');nextArc(K)},'',.25)])},
 K=>{const s=lsk(K);C(`${s[1]} ความลับของสกิล「${s[2]}」`,`หลังทดลองมาทั้งปี คุณสังเกตว่าสกิลทำอะไรได้มากกว่าที่ตัวหนังสือบอก`,[
  O('🔬 ทดลองต่อจนเข้าใจ (มินิเกม)',()=>mgRune(`ไขความลับของสกิล「${s[2]}」`,5,sc=>{if(sc>=.55){K.skL+=2;K.pw+=capOf(K)*.15;feed(`🔬 ${s[4]?'สกิลกากกลายเป็นสกิลที่ไม่มีใครในโลกนี้มี':'สกิลวิวัฒนาการขึ้นอีกขั้น'} · ${pick(['ตอนนี้มันใช้กับคนอื่นได้ด้วย','มันทะลุเวทป้องกันได้','มันทำงานแม้ตอนหลับ'])}`)}else{K.skL++;feed('🔬 เข้าใจเพิ่มขึ้นนิดหน่อย')}nextArc(K)}),'มินิเกม',.6),
  O('🙈 ไม่ยุ่งกับมัน ใช้ชีวิตปกติ',()=>{heal(.5);feed('🙈 คุณเลือกใช้ชีวิตแบบคนธรรมดา');nextArc(K)},'',.4)])},
 K=>C('📰 ข่าวจากเมืองหลวง',`พ่อค้าเร่เล่าว่าราชาอัญเชิญผู้กล้า 29 คนจากต่างโลก ชื่อแปลกๆ อย่าง ${E(npc(K,'rival').n)} กับ ${E(npc(K,'pal').n)} … 29 คน ไม่ใช่ 30`,[
  O('🏰 เดินทางไปเมืองหลวง',()=>{K.f.go=1;feed('🏰 คุณออกเดินทางไกลที่สุดในชีวิต');nextArc(K,1)},'',.4),
  O('🌲 อยู่ที่นี่ต่อ เพื่อนคงสบายดี',()=>{K.f.stay=1;feed('🌲 คุณมองไปทางเมืองหลวงนาน แล้วกลับไปทำงานต่อ');nextArc(K)},'',.35),
  O('🎭 ไปแบบปลอมตัว แอบดูก่อน',()=>{K.f.go=1;K.f.spy=1;feed('🎭 คุณใส่ผ้าคลุมของคนพื้นเมือง');nextArc(K,1)},'',.25)]),
 K=>{heroTr(K);const r=npc(K,'rival'),p=npc(K,'pal'),rt=trOf(K,'rival'),pt=trOf(K,'pal');K.f.met=1;
  C(K.f.go?'🎒 เจอเพื่อนร่วมห้องอีกครั้ง':'🎒 เพื่อนร่วมห้องผ่านมาที่นี่',`${K.f.go?'ที่ลานฝึกของวัง':'กองทัพผู้กล้าเดินทัพผ่านพอดี'} คุณเห็น <b>${E(r.n)}</b> (${rt[1]} ${rt[2]}) กับ <b>${E(p.n)}</b> (${pt[1]} ${pt[2]})${K.f.spy?' — พวกเขายังไม่เห็นคุณ':''}`,[
   O('🙋 ทักทาย "จำกันได้ไหม"',()=>{const sf=/selfish|power|narc|fake|schemer/.test(rt[0]);feed(`🙋 ${E(p.n)}${/kind|naive|coward/.test(pt[0])?'ร้องไห้แล้ววิ่งมากอด':'เบิกตากว้าง'} ส่วน${E(r.n)}${sf?' ยิ้มแข็งๆ "นายไม่ได้ผ่านการประเมินนี่ จะมาแย่งตำแหน่งหรือไง"':' ตบไหล่แรงๆ "นึกว่าตายไปแล้ว!"'}`);aff(K,'pal',15);if(sf){aff(K,'rival',-15);K.f.threat=1}nextArc(K)},'',.4),
   O('🤝 ขอเข้ากลุ่มผู้กล้า',()=>{K.f.join=1;feed(`🤝 ราชาตรวจคุณแล้วรับเข้ากลุ่มในฐานะ "ผู้กล้าคนที่ 30 ที่มาสาย"${/selfish|spoiled|narc/.test(rt[0])?` — ${E(r.n)}ไม่พอใจที่ต้องแบ่งรางวัลเพิ่ม`:''}`);nextArc(K)},'',.3),
   O('🤫 ไม่เปิดเผยตัว',()=>{K.f.native=1;feed('🤫 คุณมองพวกเขาเดินผ่านไป ไม่มีใครรู้ว่าคุณอยู่ตรงนี้');nextArc(K)},'',.3)])},
 K=>C('🌀 วงเวทผิดพลาด… หรือจงใจ',`${K.f.join?'นักบวชผู้อัญเชิญ':'หมอผีชราในหมู่บ้าน'}มองคุณนาน "วงเวทอัญเชิญไม่เคยพลาด ถ้ามันส่งเจ้ามาที่อื่น แปลว่ามีใครบางคนเปลี่ยนปลายทาง"`,[
  O('🔍 สืบหาว่าใคร (มินิเกม)',()=>mgRune('ถอดรหัสวงเวทที่ถูกแก้',6,sc=>{if(sc>=.55)feed(clue(K,pick(['มีคนแก้ปลายทางวงเวทก่อนอัญเชิญหนึ่งวัน','ลายมือที่แก้วงเวทเหมือนลายมือคุณ','ปลายทางของคุณถูกเลือกไว้ตั้งแต่ร้อยปีก่อน'])));else feed('🔍 ร่องรอยเลือนหายไปก่อนจะอ่านออก');nextArc(K)}),'มินิเกม',.6),
  O('🤷 ไม่สนใจ ฉันชอบที่นี่',()=>{K.f.adopt=1;feed('🤷 บางคำถามไม่ต้องรู้คำตอบก็ได้');nextArc(K)},'',.4)]),
 K=>C('🔥 บ้านที่สองถูกโจมตี',`กองทัพปีศาจบุก${K.f.sp==='abyss'?'ชายแดนดินแดนปีศาจที่คุณอาศัยอยู่':'ที่ที่คุณเรียกว่าบ้านในโลกนี้'} ในเวลาเดียวกันวังก็เรียกผู้กล้าทุกคนไปป้องกันเมืองหลวง`,[
  O(`🏡 ปกป้องบ้าน${K.f.home2?'ของ'+K.f.home2:''}`,()=>duel('แม่ทัพปีศาจ',Math.round(threat(K)*1.15),w=>{if(w){K.f.hero2=1;K.rep+=20;feed('🏡 คุณปกป้องคนที่ช่วยคุณไว้ได้ทุกคน ชาวบ้านเรียกคุณว่า "ผู้กล้าที่ไม่มีใครอัญเชิญ"')}else feed('🏡 บ้านพัง แต่ทุกคนรอด'+hurt(.35));nextArc(K)}),'ต่อสู้',.5),
  O('🏰 ไปช่วยเพื่อนที่เมืองหลวง',()=>{K.f.join=1;aff(K,'pal',10);feed('🏰 คุณสู้เคียงข้างเพื่อนร่วมห้องเป็นครั้งแรก'+rep(10));nextArc(K)},'',.3),
  O('🗣️ เจรจากับแม่ทัพปีศาจ',()=>mgRead('เจรจาให้กองทัพปีศาจถอย','แม่ทัพปีศาจ',sc=>{if(sc>=.55){K.f.peace=(K.f.peace|0)+2;feed('🗣️ แม่ทัพปีศาจถอยทัพ "เจ้าไม่เหมือนผู้กล้าพวกนั้น"')}else feed('🗣️ ไม่สำเร็จ'+hurt(.25));nextArc(K)}),'',.2)]),
 K=>{const o=[];
  if(K.f.hero2||K.rep>=40)o.push(O('🌟 เป็นผู้กล้าที่ไม่มีใครอัญเชิญ',()=>ending(K,'unsum','ไม่มีราชาแต่งตั้ง ไม่มีลูกแก้วสว่างจ้า แต่ทุกหมู่บ้านในทวีปรู้จักชื่อคุณ ผู้กล้าตัวจริงที่ไม่มีใครอัญเชิญ','จากไปในฐานะผู้กล้าที่ไม่มีใครอัญเชิญ'),'',.3));
  if(K.f.adopt||K.f.native||K.f.stay)o.push(O(`🏡 ใช้ชีวิตกับ${K.f.home2||'คนที่นี่'}ต่อไป`,()=>ending(K,'native',`คุณเลือกอยู่${lsp(K)[1].replace(/^(กลาง|ใน|บน)/,'ใน')}กับคนที่รับคุณไว้ตั้งแต่วันแรก เรื่องเล่าของคนแปลกหน้าจากฟ้ากลายเป็นตำนานพื้นเมือง`,'แก่ตายในบ้านหลังที่สองท่ามกลางคนที่รัก'),'',.3));
  if(K.f.join)o.push(O('🎒 กลับไปรวมกับเพื่อนทั้งห้อง',()=>ending(K,'class30','ผู้กล้า 30 คนครบห้องเป็นครั้งแรก คุณยืนแถวหลังสุดเหมือนตอนอยู่โรงเรียน แต่ครั้งนี้ทุกคนหันมามองคุณ','จากไปพร้อมเพื่อนครบทั้งห้อง'),'',.3));
  o.push(O('🚪 หาทางกลับโลกเดิมด้วยตัวเอง',()=>ending(K,'lhome','คุณพบวงเวทเก่าในซากปรักหักพัง ไม่มีนักบวช ไม่มีราชา มีแค่คุณกับสกิลที่ทุกคนเคยหัวเราะ… วงเวทเรืองแสง','กลับบ้านไปพร้อมเรื่องเล่าที่ไม่มีใครเชื่อ'),'',.15));
  if(K.clue>=3)o.push(O('🌀 ไปยังปลายทางที่วงเวทเลือกไว้',()=>ending(K,'chosen','ปลายทางสุดท้ายคือหอคอยร้างที่มีบันทึกเขียนด้วยลายมือคุณเอง วงเวทไม่ได้พลาด มันส่งคุณมาที่ที่ต้องมา เพื่อเป็นคนเฝ้าวงเวทอัญเชิญรุ่นต่อไป ไม่ให้ใครถูกพรากจากห้องเรียนอีก','เฝ้าวงเวทอัญเชิญไปจนวันสุดท้าย'),'🗝️ ฉากจบลับ',.1));
  xFin(K,o);C('🌄 ทางแยกสุดท้าย',`หลายปีผ่านไปตั้งแต่วันที่ลืมตาคนเดียว${lsp(K)[1].replace(/^(กลาง|ใน|บน)/,'ใน')} ถึงเวลาตัดสินใจว่าชีวิตนี้จะจบที่ไหน`,o)}];
// ---------- 🐣 เกิดใหม่เป็นมอนสเตอร์ (จากยุคปัจจุบัน → ห้องขาว) ----------
WD.mon={ic:'🐣',n:'เกิดใหม่เป็นมอนสเตอร์',g:'mon',a0:0,end:[45,140],d:'คุณตายในยุคปัจจุบัน แล้วลืมตาอีกครั้งในร่างที่ไม่ใช่มนุษย์ ตัวหนังสือสีฟ้าลอยตรงหน้า: [ระบบ] ยินดีต้อนรับ',sc:'🌿 ดินแดนรกร้าง'};
SK.mon=[];
ENDS.mon={mnation:['🏯','ประเทศของมอนสเตอร์','รวบรวมมอนสเตอร์สร้างชาติ'],mhuman:['🧍','ได้ร่างมนุษย์คืน','วิวัฒนาการเป็นร่างมนุษย์'],mwild:['🌲','จ้าวแห่งป่า','ใช้ชีวิตอิสระแบบสัตว์ป่า'],mpet:['🐾','สัตว์คู่ใจของเด็กคนนั้น','อยู่กับมนุษย์ที่เคยช่วยไว้'],mhunt:['🗡️','ถูกนักผจญภัยล่า','จบชีวิตในฐานะเป้าเควส'],mgod:['🌌','สัตว์เทพผู้เฝ้าทวีป','???',1]};
FOK.mon=[['fm_hunt','🍖','ล่าเหยื่อ'],['fm_eat','🌀','กลืนกินเพื่อเรียนสกิล'],['fm_hide','🍃','หลบซ่อนเอาตัวรอด'],['fm_exp','🗺️','สำรวจอาณาเขต'],['fm_train','💪','ฝึกสกิล'],['fa_rest','🍵','พักผ่อน']];
const MSP=[['🟢','สไลม์','ไฮสไลม์','ราชาสไลม์','ถ้ำชื้น'],['🕷️','แมงมุมตัวจิ๋ว','แมงมุมพิษ','ราชินีอารัคเน','ป่าทึบ'],['💀','โครงกระดูกไร้นาม','อัศวินกระดูก','ลิชผู้ตื่นรู้','สุสานร้าง'],['🐺','ลูกหมาป่า','หมาป่าเงา','เฟนริลน้อย','ทุ่งหิมะ'],['🐍','งูน้อย','งูยักษ์','นาคาเรศ','หนองน้ำ'],['🦇','ค้างคาว','ค้างคาวแวมไพร์','เจ้าแห่งราตรี','ถ้ำมืด'],['🐛','หนอนผีเสื้อ','ดักแด้ทองคำ','ผีเสื้อเทพ','ทุ่งดอกไม้'],['🦎','กิ้งก่า','ซาลาแมนเดอร์','มังกรดิน','ภูเขาไฟ'],['🐸','กบ','กบพิษสายรุ้ง','ราชากบ','บึงหมอก'],['🐀','หนู','หนูยักษ์','ราชันหนูพันตัว','ท่อระบายน้ำเมือง'],['🥚','ไข่มังกร','ลูกมังกร','มังกรโบราณ','รังมังกรร้าง'],['🍄','เห็ดเดินได้','เห็ดสปอร์พิษ','ราชาเห็ดแห่งป่า','ป่าเห็ด'],['🪨','ก้อนหินมีชีวิต','โกเลมหิน','ไททันภูผา','เหมืองร้าง'],['👻','วิญญาณเร่ร่อน','ภูตพยาบาท','วิญญาณจักรพรรดิ','ปราสาทร้าง'],['🐙','ปลาหมึกน้อย','คราเคนวัยรุ่น','คราเคนแม่','ทะเลลึก'],['🦂','แมงป่อง','แมงป่องแก้ว','จักรพรรดิแมงป่อง','ทะเลทราย'],['🐝','ผึ้งงาน','ผึ้งนักรบ','ราชินีรังเวท','รังผึ้งยักษ์'],['🐌','หอยทาก','หอยทากเกราะเหล็ก','หอยทากป้อมปราการ','สวนหลังบ้าน'],['🦊','ลูกจิ้งจอก','จิ้งจอกสามหาง','จิ้งจอกเก้าหาง','ป่าศาลเจ้า'],['🐦','ลูกนกกระจอก','นกฟ้าผ่า','ฟีนิกซ์','หน้าผาสูง'],['🌱','ต้นกล้า','ทรีแอนท์','ต้นไม้โลก','ป่าโบราณ'],['🐟','ปลาตัวเล็ก','ปลาไหลไฟฟ้า','เลวีอาธาน','แม่น้ำใหญ่'],['🐗','ลูกหมูป่า','หมูป่าเขาเหล็ก','ราชาหมูป่า','ป่าโอ๊ก'],['🦉','ลูกนกฮูก','นกฮูกปราชญ์','นกฮูกแห่งดวงดาว','ห้องสมุดร้าง'],['🐻','ลูกหมี','หมีกรงเล็บเงิน','ราชาหมีขั้วโลก','ภูเขาน้ำแข็ง'],['🦀','ปูเสฉวน','ปูเกราะหิน','ราชาปูยักษ์','ชายหาด'],['🧟','ซอมบี้สด','ซอมบี้ฉลาด','ราชาผีดิบ','เมืองร้าง'],['😈','อิมพ์','ปีศาจชั้นกลาง','อาร์คดีมอน','ดินแดนปีศาจ'],['🧚','ภูตแสง','ภูตธาตุ','ราชินีภูต','หุบเขาภูต'],['🐈','แมวดำ','แมวสองหาง','เนโกะมาตะ','ตรอกแม่มด'],['🦋','ผีเสื้อกลางคืน','ผีเสื้อหลอน','ผีเสื้อแห่งความฝัน','ป่าหมอก'],['🦈','ฉลามน้อย','ฉลามหัวค้อนเวท','เมกาโลดอนเทพ','มหาสมุทร'],['🐢','ลูกเต่า','เต่ากระดองหนาม','เต่าแบกเกาะ','ชายฝั่ง'],['🪱','ไส้เดือน','หนอนทราย','หนอนยักษ์กลืนเมือง','ใต้ดิน'],['🦗','ตั๊กแตน','ตั๊กแตนดาบ','ราชาตั๊กแตนพายุ','ทุ่งหญ้า'],['🐊','ลูกจระเข้','จระเข้เกราะ','จระเข้ยักษ์แห่งแม่น้ำ','บึงใหญ่'],['🦌','ลูกกวาง','กวางเขาแก้ว','กวางเทพแห่งป่า','ป่าสน'],['🐉','งูดิน','ไวเวิร์น','มังกรพายุ','ยอดเขา'],['🦑','หมึกเงา','หมึกยักษ์ราตรี','เจ้าแห่งห้วงลึก','ร่องลึกใต้ทะเล'],['🦦','นาก','นากเวทน้ำ','ราชานากแม่น้ำ','ลำธาร'],['🐿️','กระรอก','กระรอกบิน','ราชากระรอกต้นไม้โลก','ป่าสน'],['🦔','เม่น','เม่นหนามเหล็ก','เม่นป้อมปราการ','พุ่มไม้'],['🦩','นกฟลามิงโก','นกฟลามิงโกเพลิง','ราชินีนกไฟ','ทะเลสาบเกลือ'],['🐞','เต่าทอง','ด้วงเกราะทอง','ราชาด้วงสวรรค์','สวนดอกไม้'],['🧊','ก้อนน้ำแข็งมีชีวิต','ภูตน้ำแข็ง','ราชินีหิมะนิรันดร์','ธารน้ำแข็ง'],['🔥','ลูกไฟวิญญาณ','วิญญาณเพลิง','อิฟริต','ภูเขาไฟ'],['📦','หีบสมบัติ (มิมิค)','มิมิคเขี้ยวเหล็ก','ราชามิมิคพันห้อง','ดันเจี้ยน'],['🗡️','ดาบต้องสาป','ดาบปีศาจ','ดาบเทพแห่งความแค้น','กองสมบัติ'],['☁️','ก้อนเมฆ','ภูตพายุ','เทพแห่งท้องฟ้า','ท้องฟ้า'],['🐣','ลูกเจี๊ยบ (?)','ไก่ชนปีศาจ','ค็อกคาทริซราชันย์','ฟาร์มชายแดน']];
const MSKL=[['🔥','พ่นไฟ','pow:4 fight:.02'],['🧪','ต้านพิษ','hp:15'],['👁️','มองในที่มืด','read:.04'],['🫥','ล่องหน','luck:.03'],['🪽','ปีก','fight:.03'],['🛡️','เกราะแข็ง','hp:25'],['💚','ฟื้นฟูตัวเอง','heal:.04'],['🔍','วิเคราะห์','read:.05'],['⚡','สายฟ้า','pow:5'],['🧊','ลมหายใจน้ำแข็ง','pow:4'],['🕸️','ใยเหนียว','fight:.03'],['🗣️','พูดภาษามนุษย์','cha:5'],['🌀','ดูดซับเวท','mp:15'],['🦷','เขี้ยวพิษ','fight:.04'],['🏃','ฝีเท้าลม','luck:.02 fight:.02'],['🧠','ปัญญาเร็ว','read:.03 mp:5'],['🌿','สังเคราะห์แสง','heal:.03'],['💢','คลั่ง','pow:6 hp:-10'],['🎭','เลียนแบบร่าง','cha:3 read:.02'],['🌑','แทรกเงา','fight:.04'],['💎','ผิวคริสตัล','hp:20 mp:5'],['🎶','เสียงสะกด','read:.04 cha:2'],['🩸','ดูดเลือด','heal:.03 fight:.02'],['🌊','ควบคุมน้ำ','mp:10 pow:2'],['🪨','ร่างหิน','hp:30'],['✨','แสงศักดิ์สิทธิ์','pow:3 heal:.02'],['🦴','ฟื้นคืนชีพหนึ่งครั้ง','save:1'],['🐾','คุมสัตว์','luck:.03'],['🔊','คำรามขู่','fight:.03 cha:1'],['🕳️','กลืนกินทุกอย่าง','pow:3 hp:10 mp:5']];
const MS2=K=>K.ms||(K.ms={sp:0,st:0,lv:1,xp:0,sk:[],path:null,name:null});
const msp=K=>MSP[MS2(K).sp]||MSP[0],mName=K=>{const m=MS2(K),s=msp(K);return s[0]+' '+(m.st===0?s[1]:m.st===1?s[2]:s[3])};
ARC.mon=[
 K=>{const s=msp(K);C(`${s[0]} ลืมตาเป็น${s[1]}`,`ความรู้สึกสุดท้ายคือความเจ็บปวดในยุคปัจจุบัน แล้วคุณลืมตาอีกครั้งใน<b>${s[4]}</b> ร่างของคุณคือ<b>${s[1]}</b><br><div style="border:1px solid #9bd;border-radius:8px;padding:6px;margin-top:6px">⬜ [ระบบ] สายพันธุ์: ${s[1]} · LV 1 · สกิลพิเศษ: กลืนกิน (เรียนรู้สกิลจากสิ่งที่กิน)</div>`,[
  O('🍃 ซ่อนตัวก่อน',()=>{heal(.4);feed('🍃 คุณซ่อนตัวจนเข้าใจร่างกายใหม่');nextArc(K)},'',.35),O('🍖 กินสิ่งแรกที่เห็น',()=>{monSk(K);monXp(K,30);nextArc(K)},'',.35),O('🗺️ ออกสำรวจทันที',()=>{monXp(K,20);feed(`🗺️ คุณรู้แล้วว่า${s[4]}กว้างแค่ไหน และมีอะไรที่ใหญ่กว่าคุณเยอะมาก`);nextArc(K)},'',.3)])},
 K=>C('🧒 มนุษย์คนแรก',`เด็กมนุษย์คนหนึ่งหลงเข้ามาใน${msp(K)[4]} ขาเจ็บ ร้องไห้ เธอมองคุณด้วยความกลัว`,[
  O('🤝 ช่วยพาเธอกลับหมู่บ้าน',()=>{K.f.child=1;feed('🤝 เด็กคนนั้นทิ้งผ้าเช็ดหน้าไว้ให้ "ขอบคุณนะ เจ้าตัวเล็ก" คุณเก็บมันไว้ในรัง');nextArc(K)},'',.45),O('😱 ขู่ให้หนี',()=>{feed('😱 เด็กวิ่งหนีไปบอกผู้ใหญ่ว่าเจอปีศาจ');K.f.fear=1;nextArc(K)},'',.3),O('🍖 สัญชาตญาณสัตว์…',()=>{K.dark+=20;monXp(K,40);feed('🍖 คุณไม่อยากจำคืนนั้นอีก');nextArc(K)},'',.25)]),
 K=>C('🗡️ นักผจญภัยมาล่า',`ปาร์ตี้นักผจญภัยสี่คนรับเควส "กำจัด${msp(K)[1]}ประหลาด"${K.f.fear?' จากรายงานของชาวบ้าน':''}`,[
  O('⚔️ สู้',()=>duel('ปาร์ตี้นักผจญภัย',Math.round(threat(K)*1.05),w=>{if(w){monXp(K,80);feed('⚔️ คุณชนะ! ปาร์ตี้นักผจญภัยหนีกลับไปพร้อมรายงานว่ามอนสเตอร์ตัวนี้ "ไม่ธรรมดา"')}else if(K.save>0){K.save--;feed('⚔️ เกือบตาย'+hurt(.5))}else ending(K,'mhunt','ดาบของนักผจญภัยปักลงกลางร่าง คุณกลายเป็นรางวัลเควสห้าสิบเหรียญเงิน ในชาติหน้า… บางทีคุณอาจได้เป็นคนถือดาบบ้าง','ถูกนักผจญภัยล่า');nextArc(K)}),'ต่อสู้',.35),
  O('🫥 แกล้งตาย',()=>{if(rnd()<.6)feed('🫥 พวกเขาเดินข้ามคุณไปเฉยๆ');else feed('🫥 นักบวชในปาร์ตี้รู้ทัน คุณหนีไปพร้อมแผล'+hurt(.3));nextArc(K)},'',.3),
  O('🗣️ พยายามคุยกับพวกเขา',()=>{if(MS2(K).sk.includes('พูดภาษามนุษย์')||K.f.child){K.f.talk=1;feed('🗣️ นักบวชสาวในปาร์ตี้ฟังคุณ "มอนสเตอร์ที่พูดได้… ทั้งยังไม่ทำร้ายใคร" พวกเขาถอยไป');}else feed('🗣️ ออกมาเป็นเสียงขู่ พวกเขาตกใจแล้วโจมตี'+hurt(.25));nextArc(K)},'',.35)]),
 K=>C('🏷️ ได้รับชื่อ',`${pick(['ผู้เฒ่าก็อบลิน','ภูตแห่งต้นไม้','วิญญาณจิ้งจอกขาว'])}บอกว่ามอนสเตอร์ที่มีชื่อจะแข็งแกร่งกว่าเดิมหลายเท่า และเสนอตั้งชื่อให้`,[
  O('🙇 ขอให้ตั้งชื่อให้',()=>{const n=pick(['ริมุ','เวลด์','คุโระ','ฮาคุ','โซระ','ไคน์','ลูน่า','ทามะ']);MS2(K).name=n;K.pw+=capOf(K)*.2;S.maxHp+=30;fxBig('mana',1.4);say(`🏷️ <b>คุณได้ชื่อว่า "${n}"</b> — พลังไหลทะลักจนร่างเรืองแสง`,'myth',true);nextArc(K)},'',.5),
  O('✍️ ตั้งชื่อตัวเองจากชื่อในชาติก่อน',()=>{const n=String(S.name||'').split(' ')[0]||'ไร้นาม';MS2(K).name=n;K.pw+=capOf(K)*.12;S.int+=5;feed(`✍️ คุณใช้ชื่อเดิม "${E(n)}" ความทรงจำชาติก่อนชัดขึ้น`);nextArc(K)},'',.5)]),
 K=>C('🏕️ มอนสเตอร์มารวมตัว','ก็อบลิน หมาป่า และสไลม์จรจัดเริ่มมาอาศัยใกล้รังคุณ พวกมันมองคุณเหมือนหัวหน้า',[
  O('🏯 สร้างหมู่บ้านมอนสเตอร์',()=>{K.f.nat=(K.f.nat|0)+1;money(100);feed('🏯 หมู่บ้านแรกของมอนสเตอร์ที่มีกฎ "ห้ามกินกันเอง" เกิดขึ้นแล้ว');nextArc(K)},'',.45),O('🌲 ไล่ไป ฉันอยู่คนเดียวได้',()=>{K.f.lone=1;monXp(K,40);feed('🌲 คุณใช้ชีวิตคนเดียวต่อไป');nextArc(K)},'',.3),O('🤝 ให้พวกมันอยู่แต่ไม่เป็นหัวหน้า',()=>{feed('🤝 พวกมันอยู่ด้วยกันอย่างสงบ');nextArc(K)},'',.25)]),
 K=>C('😈 จอมมารรับรู้',`ทูตของจอมมารมาถึง "มอนสเตอร์ที่มีชื่อและวิวัฒนาการเร็วขนาดนี้ จอมมารอยากพบ"`,[
  O('🤝 ไปพบ',()=>{K.f.dl=1;monXp(K,60);feed('🤝 จอมมารเสนอตำแหน่งแม่ทัพ คุณขอเวลาคิด');nextArc(K)},'',.35),O('🙅 ปฏิเสธ',()=>{K.f.indep=1;feed('🙅 ทูตกลับไปพร้อมรอยยิ้มแปลกๆ');nextArc(K)},'',.35),O('⚔️ ไล่ทูตไป',()=>duel('ทูตจอมมาร',Math.round(threat(K)*1.1),w=>{feed(w?'⚔️ ทูตหนีกลับไป ชื่อของคุณดังไปทั่วดินแดนปีศาจ'+rep(10):'⚔️ ทูตแข็งแกร่งเกินคาด'+hurt(.3));nextArc(K)}),'ต่อสู้',.3)]),
 K=>{const m=MS2(K),o=[];
  if(K.f.nat)o.push(O('🏯 ก่อตั้งประเทศของมอนสเตอร์',()=>ending(K,'mnation',`${mName(K)}${m.name?` "${m.name}"`:''} ประกาศก่อตั้งประเทศแรกของมอนสเตอร์ ที่มนุษย์มาค้าขายได้โดยไม่ต้องกลัว`,'ปกครองประเทศของมอนสเตอร์จนสิ้นอายุขัย'),'',.3));
  if(m.st>=2&&m.path==='human')o.push(O('🧍 ใช้ร่างมนุษย์ใช้ชีวิตใหม่',()=>ending(K,'mhuman','คุณเดินเข้าเมืองมนุษย์ในร่างที่ไม่มีใครดูออก เปิดร้านเล็กๆ และไม่มีใครรู้ว่าเจ้าของร้านเคยเป็นมอนสเตอร์','ใช้ชีวิตเป็นมนุษย์อีกครั้งจนแก่'),'',.3));
  if(K.f.child)o.push(O('🐾 ไปหาเด็กคนนั้น',()=>ending(K,'mpet','เด็กที่คุณเคยช่วยโตเป็นผู้ใหญ่แล้ว เธอจำคุณได้ทันที แล้วพาคุณกลับบ้าน มอนสเตอร์ที่น่ากลัวที่สุดในป่านอนหลับข้างเตาผิงทุกคืน','จากไปอย่างสงบข้างเตาผิงของครอบครัวนั้น'),'',.25));
  o.push(O('🌲 ใช้ชีวิตอิสระในป่า',()=>ending(K,'mwild',`${mName(K)}เป็นตำนานของป่า มนุษย์เล่าว่าถ้าหลงป่าแล้วมีมันเดินนำ แปลว่าจะได้กลับบ้าน`,'จากไปในป่าที่ตัวเองเฝ้า'),'',.2));
  if(m.st>=2&&m.sk.length>=8&&(K.f.talk||K.f.child))o.push(O('🌌 รับหน้าที่สัตว์เทพผู้เฝ้าทวีป',()=>ending(K,'mgod','เทพแห่งป่าลงมาด้วยตัวเอง แล้วมอบหน้าที่ให้คุณเฝ้าทวีปแทน มอนสเตอร์ที่เริ่มจากตัวเล็กที่สุดกลายเป็นสัตว์เทพที่มนุษย์และมอนสเตอร์กราบไหว้ร่วมกัน','กลายเป็นสัตว์เทพที่ไม่มีวันตาย'),'🗝️ ฉากจบลับ',.1));
  xFin(K,o);C('🌄 ทางแยกของมอนสเตอร์',`${mName(K)}${m.name?` "${m.name}"`:''} · LV ${m.lv} · สกิล ${m.sk.length} · ถึงเวลาตัดสินใจว่าจะใช้ชีวิตที่เหลืออย่างไร`,o)}];
function monXp(K,x){const m=MS2(K);m.xp+=x;let up=0;while(m.xp>=30+m.lv*15&&m.lv<60){m.xp-=30+m.lv*15;m.lv++;up=1;K.pw+=capOf(K)*.05;S.maxHp+=8}if(up){feed(`⬜ [ระบบ] LV ${m.lv}`);if((m.lv>=10&&m.st===0)||(m.lv>=25&&m.st===1))queue(()=>monEvo(K))}return''}
function monSk(K){const m=MS2(K),L=MSKL.filter(s=>!m.sk.includes(s[1]));if(!L.length)return'';const s=pick(L);m.sk.push(s[1]);recalcE(K);feed(`⬜ <b>[ระบบ] ได้รับสกิล: ${s[0]} ${s[1]}</b> <span class="tag2">${fxT(s[2])}</span>`);return''}
function monEvo(K){const m=MS2(K),s=msp(K);if(m.evQ===m.st)return;m.evQ=m.st;const nx=m.st===0?s[2]:s[3];
 const ops=m.st===0?[['hunter','🗡️ สายนักล่า','fight'],['tank','🛡️ สายทนทาน','hp'],['mage','✨ สายเวท','mp']]:[['human','🧍 ร่างมนุษย์','ร่างกายคล้ายมนุษย์ พูดได้ เข้าเมืองได้'],['king','👑 ร่างราชา','ตัวใหญ่ขึ้นสามเท่า มอนสเตอร์ทั้งหลายยอมรับ'],['beast','🐾 ร่างสัตว์เทพ','คงร่างสัตว์แต่พลังพุ่งสุดขีด']];
 C(`🧬 [ระบบ] วิวัฒนาการพร้อมแล้ว`,`<div style="border:1px solid #9bd;border-radius:8px;padding:6px">⬜ ${mName(K)} → <b>${s[0]} ${nx}</b><br>เลือกเส้นทางวิวัฒนาการ</div>`,ops.map(o=>O(o[1],()=>{m.st++;m.path=o[0];K.pw+=capOf(K)*.25;S.maxHp+=40;if(o[0]==='mage'||o[0]==='human')K.mpM+=25;if(o[0]==='tank'||o[0]==='king')S.maxHp+=40;if(o[0]==='human')S.cha+=10;S.hp=S.maxHp;fxBig('mana',1.6);say(`🧬 <b>วิวัฒนาการเป็น ${s[0]} ${nx}</b> (${o[1]})`,'myth',true);recalcE(K)},o[2]&&o[2].length>5?o[2]:'',.33)))}


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
const fxv=k=>{try{const K=FN();return ((K&&K.fx&&+K.fx[k])||0)+((K&&K.fxE&&+K.fxE[k])||0)}catch(e){return 0}};
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
const TOP=[['iso','⚔️','ต่างโลก','ถูกอัญเชิญข้ามโลก · อายุสุ่ม 0–16'],['magic','🔮','โลกเวทมนตร์','วิทยาลัยเวทอาร์คาเนีย · เกิดเป็นทารก'],['noble','🏰','โลกแห่งอะคาเดมี่','สถาบันหลวง การเมือง งานเลี้ยง · เกิดเป็นทารก']];
const HAIR=['#1f1a17','#3a2a1e','#5b3a24','#c9b27a','#e8e8f0','#6a2a2a','#2a3550','#7a5aa8'],SKIN=['#f1c9a0','#e0ac69','#c68642','#8d5524','#f5d5b8'];
const orgL=()=>BD['org_'+FB.top];
// ===== ชื่อสุ่มโลกแฟนตาซี (ประกอบจากพยางค์ → หลายพันชื่อ ไม่ค่อยซ้ำ) =====
const FNS=['อัล','เคล','ไร','ดา','เซ','ลู','มาร์','โอ','ฟิน','กา','เธ','วาล','รา','ไค','เอ','ซิล','บา','เลอ','ออ','เฟ','กริ','ธอ','อี','ยู','ซา','โร','แค','นิ','ดอร์','ฮา','เอียน','ไอ','วิ','คา','เมล','ทา','ลิ','เนีย','ฟา','โซ'],
FNM=['','','','ริ','เว','ลา','ดิ','นา','เร','มิ','ซี'],
FNE={m:['เรียน','ลัส','ดริก','วิน','ธอร์','เดน','รอน','กัส','เวล','ไลล์','โทร','มอนด์','ริค','ซัส','ฟาร์','เบิร์ต','ไรอัส','ดัส','กอร์','วาร์','เลียน','ทัส','แลนด์','เซอร์','นอส'],
 f:['เลีย','ริน','เน่','ซา','ลีน','ไลรา','เวีย','ดิส','มีร่า','โรส','เซล','น่า','ฟีน','ลิส','เอล','เทีย','ริสา','เวน','ลูน่า','ซิส','เรีย','มิน','นาเรีย','ลอร่า','ซีน']},
FHE=['ฮาร์ต','วูด','เบิร์ก','ฟิลด์','มอร์','เวล','ครอส','ไบรท์','สโตน','วินเทอร์','เกรย์','ไนท์','ฟอลล์','ฮอลโลว์','เมียร์','เกท'],
THF=['ภูมิ','มิว','ฟ้าใส','ต้นกล้า','พิม','แพรว','โอม','น้ำหวาน','เก่ง','ปาล์ม','ไอซ์','เฟิร์น','ธัน','ข้าวหอม','กัปตัน','ปูเป้','บีม','ใบเตย','ภูผา','ออม','นนท์','แบม','ตะวัน','ขิม','เจมส์','มายด์','ไผ่','กิ๊ฟ','ก้อง','จูน','ธาม','ปลายฟ้า','ฟลุ๊ค','น้ำฝน','อิง','ปั้น','โบว์','เต้','ลูกปัด','ฮาร์ท','ข้าวปุ้น','แทน','มะปราง','ไทม์','น้ำขิง','กาย','ซัน','เมย์','ดิว','โมจิ'],
THA=['แสง','ทอง','ศรี','บุญ','สุข','จันทร์','รุ่ง','มณี','เพชร','วงศ์','ชัย','อินทร์','พร','ทิพย์','ประ','สุวรรณ','กิตติ','ธนา','รัตน','ศักดิ์'],
THB=['สุวรรณ','ประเสริฐ','ทวี','วัฒนา','รัตน์','ศักดิ์','พงษ์','กุล','ไพศาล','เจริญ','สกุล','ดี','วงศ์','มงคล','ศิริ','ชัย','ทรัพย์','ภักดี','นาค','อุดม'];
const fbFirst=g=>{let n;for(let i=0;i<4;i++){n=pick(FNS)+pick(FNM)+pick(FNE[g==='หญิง'?'f':'m']);if(n.length<=12)break}return n};
function fbName(top,g){if(top==='iso'){let a=pick(THA),b=pick(THB);if(a===b)b=pick(THB);return pick(THF)+' '+a+b}
 const f=fbFirst(g),h=pick(FNS)+pick(FHE);if(top==='noble')return f+' '+(rnd()<.45?pick(['ฟอน ','เดอ ','แวน ']):'')+h;return f+' '+h}
function fbRoll(first){if(!first){if(FB.left<=0)return;FB.left--}
 if(FB.top==='iso'){const r=window._isoForce?({hero:0,trash:.6,lost:.9})[window._isoForce]:rnd();FB.w=r<.55?'hero':r<.8?'trash':'lost';FB.sp=FB.w==='lost'?pick(['forest','desert','village','prison','abyss','dragon']):null;FB.age=window._isoAge!=null?window._isoAge:R(0,16)}else{FB.w=FB.top;FB.age=0}
 const b={};b.org=wPickB(orgL());b.race=wPickB(BD.race);b.el=wPickB(BD.el);b.mana=wPickB(BD.mana);b.omen=wPickB(BD.omen);b.mark=wPickB(BD.mark);
 b.tal=[];for(let i=0;i<3;i++)b.tal.push(wPickB(BD.tal,b.tal.map(x=>x.n)));b.curse=wPickB(BD.curse);b.fam=wPickB(BD.fam);b.item=wPickB(BD.item);b.sec=wPickB(BD.sec);FB.b=b;
 FB.sk=FB.w==='hero'||FB.w==='trash'||FB.w==='lost'?pick(SK[FB.w])[0]:null;
 if(first||!FB.edited){FB.g=rnd()<.5?'ชาย':'หญิง';FB.name=fbName(FB.top,FB.g)}
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
  <div class="bname" style="flex:1;min-width:0"><div class="tag2">ชื่อ</div><div class="fgIn" id="fanNm" style="font-weight:700;padding:6px 8px">${E(FB.name)}</div>
  <div class="fgG"><button class="on" style="cursor:default">${FB.g==='ชาย'?'♂':'♀'} ${FB.g}</button><button class="on" style="cursor:default">${(TOP.find(t=>t[0]===FB.top)||TOP[0]).slice(1,3).join(' ')}</button></div></div></div></div>
 <div class="fgTr" style="margin-top:8px">
  ${FB.top==='iso'?`<div class="trait r${FB.w==='trash'?2:FB.w==='lost'?1:0} show" data-rv="${FB.w==='trash'?2:FB.w==='lost'?1:0}"><div><div class="k">${FB.w==='lost'?'📍 จุดที่ลืมตา':'📜 ผลประเมินตอนอัญเชิญ'}</div><div class="v t${FB.w==='trash'?2:FB.w==='lost'?1:0}">${d.ic} ${FB.w==='hero'?'ผู้กล้า':FB.w==='lost'?'หลงมิติ':'สกิลขยะ'}</div><div class="d">${FB.w==='hero'?'ลูกแก้วสว่างจ้า วังเลี้ยงดูอย่างดี ... ในตอนแรก':FB.w==='lost'?'เพื่อนทั้งห้องไปโผล่ที่วัง แต่คุณลืมตา'+(({forest:'กลางป่าลึก',desert:'กลางทะเลทราย',village:'ในยุ้งข้าวหมู่บ้านชาวนา',prison:'ในคุกโจรภูเขา',abyss:'กลางดินแดนปีศาจ',dragon:'บนหลังมังกรที่กำลังบิน'})[FB.sp]||'ที่ไหนสักแห่ง')+' คนเดียว ไม่มีใครประเมินสกิลให้':'ราชาหัวเราะ ทหารลากคุณไปทิ้งนอกกำแพง แต่สกิลนี้โตได้'}${sk?`<span class="fnFx">${sk[1]} สกิล「${sk[2]}」 — ${sk[3]}</span>`:''}</div></div><span class="o t${FB.w==='trash'?2:0}">${FB.w==='hero'?'1 ใน 1.4':'1 ใน 3.3'}</span></div>`:''}
  <div class="trait r0 show" data-rv="0"><div><div class="k">🎂 อายุเริ่มต้น</div><div class="v t0">${FB.top==='iso'?(FB.age<12?`🧒 ${FB.age} ปี`:`🧑 ${FB.age} ปี`):'👶 แรกเกิด'}</div><div class="d">${FB.top==='iso'?(FB.age<12?'ถูกอัญเชิญมาตั้งแต่ยังเด็ก วัยเด็กจะเกิดในต่างโลก':'ถูกอัญเชิญมาตอนเป็นวัยรุ่น'):'เริ่มชีวิตตั้งแต่เป็นทารก ผ่านวัยเด็กก่อนเข้าเรียน'}</div></div><span class="o t0">${FB.top==='iso'?'สุ่ม 0-16':'ทารก'}</span></div>
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
window.fanStart=function(w){window._frS=1;try{closeM()}catch(e){}const tot=Math.max(3,(window.vipTot&&window.vipTot())|0);const tp=w==='hero'||w==='trash'||w==='lost'||w==='iso'?'iso':w==='aca'||w==='noble'?'noble':w==='magic'?'magic':'iso';FB={top:tp,w:tp,left:(typeof CFG!=='undefined'&&CFG.chm==1)?0:tot,edited:0};fbRoll(true)};
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
   say(RR.top==='iso'?`⬜ คุณลืมตากลางวงเวทอัญเชิญ ยังจำรสชาติของ${pick(['ชานมไข่มุก','ข้าวมันไก่','มาม่าตอนตีสอง'])}ได้ชัด · ชีวิตก่อน: ${E(cr.n||'')} อายุ ${cr.age||'?'} ปี`:`⬜ ตั้งแต่วินาทีแรกที่ลืมตาเป็นทารก คุณจำชาติก่อนได้ทุกอย่าง แค่ยังพูดไม่ได้ — ชื่อ ${E(cr.n||'')} อายุ ${cr.age||'?'} ปี ตายเพราะ${E(cr.why||'อุบัติเหตุ')}`,'myth',true);
   if(b.wsk&&b.wsk.length)feed(`⬜ สกิลจาก${E(RR.god.n)}: ${b.wsk.map(x=>x.ic+' '+E(x.n)).join(' · ')}`);
   if(b.wcur&&b.wcur.length)feed(`❓ คุณรู้สึกว่ามีบางอย่างติดมาด้วย ${b.wcur.length} อย่าง (ดูได้ใน 📊 สถานะโลก)`);
   if(RR.god.out==='trash')say('🗑️ เทพรำคาญคุณจนโยนสกิลขยะให้ — แต่สกิลขยะในต่างโลกเคยกลายเป็นตำนานมาแล้ว','bad');
   if(RR.god.fake)K.con.push({id:'god',t:'วิญญาณครึ่งหนึ่ง (สัญญากับ "เทพธิดา")',at:age()+R(8,14),paid:0});
   if(RR.god.knew)K.clue=Math.min(2,K.clue+1)}
  sync();render();saveGame()}catch(e){console.error('fanBegin',e)}},700)}

// =================== ฉาก ===================
const SKY={lost:['#0f2a1c','#2f6a44','#a8d07a'],hero:['#2a1d4a','#b85a6a','#f0b070'],trash:['#1a1a22','#3a3340','#6a5a4a'],magic:['#0c0a24','#2a2060','#5a48a0'],noble:['#1a1430','#5a3a6a','#d8a070']};
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
const FCOL={lost:'#7ae0a0',hero:'#6ad8ff',trash:'#9ad86a',magic:'#c39bff',noble:'#ffd37a'};
function hud(K){const d=WD[K.w],m=Math.round(K.mp),mm=Math.round(K.mpM),B=K.bt||{};
 const sk=K.sk?(K.w==='lost'?(()=>{const x=SK.lost.find(y=>y[0]===K.sk)||SK.lost[0];return `${x[1]} ${x[2]} Lv${K.skL}`})():K.w==='trash'?`🗑️ ${TRUE_SK[K.sk][K.skL-1]} Lv${K.skL}`:`${SK.hero.find(x=>x[0]===K.sk)[1]} ${SK.hero.find(x=>x[0]===K.sk)[2]}`):'';
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
const isIso=K=>K.w==='hero'||K.w==='trash'||K.w==='lost',isAca=K=>K.w==='magic'||K.w==='noble';
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
.fmgT{position:relative;height:46px;margin:14px 6px;border-radius:23px;background:#1c1633;border:1.5px solid #4a3f70;overflow:hidden}.fmgT .z{position:absolute;top:0;bottom:0;left:39%;width:22%;background:#ffd37a55;border-left:2px solid #ffd37a;border-right:2px solid #ffd37a}.fmgT .m{position:absolute;top:6px;width:30px;height:30px;margin-left:-15px;border-radius:50%;background:#ff7ad8;box-shadow:0 0 12px #ff7ad8;font-size:18px;line-height:30px;text-align:center}
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
 window._fda=()=>{if(done)return;const d=Math.abs(x-50),s=d<5?1:d<11?.75:d<18?.35:0;sc+=s;b++;sp+=.14;const L=document.getElementById('fmgDaL'),m=document.getElementById('fmgDm');if(m)m.textContent=EM[b%8];if(L)L.innerHTML=`จังหวะ ${b}/8 · ${s>=1?'เป๊ะ! '+E(who)+'ยิ้ม':s>=.7?'ดี':s>0?'เกือบ':'เหยียบเท้า'+E(who)+'!'}`;try{navigator.vibrate&&navigator.vibrate(s>=.7?15:50)}catch(e){}if(b>=8){done=1;cancelAnimationFrame(raf);setTimeout(()=>{closeM();cb(sc/8)},500)}};
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
 const T=isAca(K)&&(p.w==='hero'||p.w==='trash'||p.w==='lost')?`ในตำราประวัติศาสตร์บทผู้กล้าจากต่างโลก มีชื่อ <b>${E(p.n)}</b> พร้อมภาพวาดที่หน้าตาเหมือนคุณ ใต้ภาพเขียนว่า「${how}」`
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
#wrB .name{font-weight:700;font-size:19px;margin-top:2px}#wrB .wtag{font-size:12px;color:#8a7f6a}#wrB .pat{display:flex;align-items:center;gap:8px;width:100%;margin:8px 0 0;font-size:12px}#wrB .pat .bar{flex:1;height:10px;border-radius:5px;background:#e3ddcf;overflow:hidden;box-shadow:inset 0 1px 2px #0002}#wrB .pat .bar i{display:block;height:100%;background:linear-gradient(90deg,#f2994a,#f2c94c 40%,#7bd389);transition:width .4s}
#wrB .bub{position:relative;align-self:stretch;margin:12px 0 0;background:#fff;border:2px solid #2a2438;border-radius:16px;padding:10px 13px;font-size:14px;line-height:1.5;box-shadow:4px 4px 0 #2a243822;min-height:50px}#wrB .bub:before{content:'';position:absolute;top:-10px;left:50%;margin-left:-8px;border:8px solid transparent;border-bottom-color:#2a2438;border-top:0}#wrB .bub.pop{animation:wrP .25s}@keyframes wrP{0%{transform:scale(.96)}}
#wrB .pts{display:flex;justify-content:space-between;align-items:center;margin:12px 0 6px;font-size:13px}#wrB .pts b{font-size:16px;color:#b8860b}
#wrB .srch{display:flex;gap:6px}#wrB .srch input{flex:1;min-width:0;border:1.5px solid #cfc7b5!important;border-radius:12px;padding:8px 11px;font:inherit;font-size:16px;background:#fffdf8!important;color:#2a2438!important;-webkit-text-fill-color:#2a2438}#wrB .srch input::placeholder{color:#a49a86;-webkit-text-fill-color:#a49a86}#wrB .srch button{border:1.5px solid #cfc7b5;background:#fffdf8;border-radius:12px;padding:0 10px;font:inherit;color:#2a2438}
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
 <div class="stage"><canvas id="wrG" width="168" height="200"></canvas><div class="name">✨ ${G.n}</div><div class="wtag">${G.tag}</div>
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
 const D=[[out==='trash'?'trash':'hero','⚔️','ถูกอัญเชิญไปต่างโลก','ร่างเดิม ชื่อเดิม เริ่มที่อายุ 16 กลางวงเวทของอาณาจักรอัลเวิร์น'],['magic','🔮','เกิดใหม่ในโลกเวทมนตร์','เกิดเป็นทารก จำชาติก่อนได้ตั้งแต่แรก แค่ยังพูดไม่ได้'],['noble','🏰','เกิดใหม่ในโลกแห่งอะคาเดมี่','เกิดเป็นทารกในครอบครัวสามัญ จำชาติก่อนได้ตั้งแต่แรก แค่ยังพูดไม่ได้'],['mon','🐣','เกิดใหม่เป็นมอนสเตอร์','สุ่มเกิดเป็น 1 ใน 50 สายพันธุ์ · มีหน้าต่างระบบ · กินเพื่อเรียนสกิล · วิวัฒนาการได้']];
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
for(const w of ['hero','trash','lost','magic','noble'])Object.assign(ENDS[w],{godfree:['⚔️','เทพตาย คุณเป็นอิสระ','ล้มเทพที่ใช้คุณเป็นหมาก แล้วใช้ชีวิตแบบไม่มีสกิลจากใคร'],godthrone:['👑','บัลลังก์ที่ว่าง','ฆ่าเทพแล้วนั่งแทน'],godeal:['⛓️','ข้อเสนอของเทพ','รับข้อเสนอกลางศึก แลกกับความจริงที่ต้องแบกไปตลอด'],godpawn:['🤝','หมากทุกตัวเป็นอิสระ','ปลดปล่อยทุกคนที่ถูกอัญเชิญมาเป็นหมาก'],godrule:['🗝️','กฎข้อใหม่ของสวรรค์','เขียนกฎที่ไม่มีเทพองค์ไหนอัญเชิญใครได้อีก',1]});
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


// ####################################################################
// ภาค 4: ของดรอป · สมุดมอนสเตอร์ · แผนที่ 8 ภูมิภาค · บอส · อาชีพ · ปาร์ตี้ · สัตว์อสูร · ฐาน · รักเต็มระบบ · หักมุม · ทวีปจำชาติก่อน
// ####################################################################

// ####################################################################
// ภาค 4: ของดรอป · สมุดมอนสเตอร์ · ปาร์ตี้ · แผนที่ 8 ภูมิภาค · บอส · อาชีพ · ฐาน · สัตว์อสูร · ความรัก · เหตุการณ์หักมุม · ทวีปจำชีวิตก่อน
// ####################################################################
const X3=K=>{if(!K.x3)K.x3={gear:{w:null,a:null,c:null},inv:[],reg:'cap',rs:{},bk:{},cls:null,base:0,pet:null,party:[],love:null,tw:{},seenM:{},titles:[]};return K.x3};
// ---- ผลรวมพิเศษ (ของ + เซ็ต + อาชีพ + ปาร์ตี้ + สัตว์ + ฐาน) → K.fxE ----
function fxAdd(o,s,m){const p=fxP(s);for(const k in p)if(typeof p[k]==='number')o[k]=(o[k]||0)+p[k]*(m==null?1:m)}
function recalcE(K){const X=X3(K),o={};
 for(const sl of ['w','a','c']){const g=X.gear[sl];if(g)fxAdd(o,g.fx,1+(g.en|0)*.12)}
 const sc={};for(const sl of ['w','a','c']){const g=X.gear[sl];if(g&&g.set)sc[g.set]=(sc[g.set]|0)+1}for(const k in sc){if(sc[k]>=2)fxAdd(o,GSET[k][2]);if(sc[k]>=3)fxAdd(o,GSET[k][3])}
 if(X.cls){const c=CLS[X.cls.k];if(c)fxAdd(o,c[3],1+X.cls.lv*.06)}
 for(const p of X.party)if(p.alive)fxAdd(o,PCL[p.c][2],.5+p.b/200);for(const cb of pCombos(K))fxAdd(o,cb[3]);
 if(X.pet&&X.pet.st>0)fxAdd(o,petFx(X.pet));if(X.base)fxAdd(o,BASE[X.base][3]);
 const hp=Math.round(o.hp||0),mp=Math.round(o.mp||0);S.maxHp=Math.max(30,S.maxHp+hp-(K.hpAdd|0));K.hpAdd=hp;K.mpM=Math.max(5,K.mpM+mp-(K.mpAdd|0));K.mpAdd=mp;K.fxE=o;return o}
{const _sy=sync;sync=function(){_sy.apply(this,arguments);try{const K=FN();if(K&&K.fxE)S.power=Math.round(S.power+(K.fxE.pow||0)*(1+age()/60))}catch(e){}}}

// =================== ⚔️ ของดรอป ===================
const GBASE={w:[['🗡️','ดาบสั้น'],['⚔️','ดาบยาว'],['🪓','ขวาน'],['🏹','ธนู'],['🪄','ไม้เท้า'],['🔱','หอก'],['🔪','มีดคู่'],['📕','ตำราเวท']],a:[['🧥','เสื้อคลุม'],['🦺','เกราะหนัง'],['🛡️','เกราะเหล็ก'],['👘','ชุดนักเวท'],['🥋','ชุดต่อสู้']],c:[['💍','แหวน'],['📿','สร้อยคอ'],['🧿','เครื่องราง'],['👑','มงกุฎ'],['🪶','ขนนกประดับ'],['🔔','กระดิ่ง']]};
const GPRE=[['ขึ้นสนิม',''],['ของทหารเกณฑ์',''],['ช่างบ้านนอกตี',''],['ที่ฆ่ามังกรมาแล้วสามตัว','pow:4'],['ที่ร้องไห้ทุกคืน','mp:8'],['ของคนที่ไม่กลับมา','save:0 dark:2'],['ที่จำชื่อเจ้าของคนแรกได้','read:.04'],['ที่หนักกว่าที่เห็น','pow:3'],['ที่เบาเหมือนขนนก','ring:.04'],['ที่ถูกสาปให้ซื่อสัตย์','fight:.03'],['จากใต้ทะเลสาบ','mp:10'],['ที่ขโมยมาจากวัง','inc:10 dark:3'],['ที่ส่งเสียงเพลงเบาๆ','cha:3'],['ที่ไม่ยอมให้ใครยืม','fight:.04'],['ของผู้กล้ารุ่นที่ 7','rep:4']];
const GSLOT={w:['pow:5','fight:.04','ring:.03'],a:['hp:25','heal:.02','save:0'],c:['mp:12','luck:.02','read:.03']};
const GSET={hero:['🛡️','ผู้กล้าที่ถูกลืม','rep:8 luck:.03','save:1 ev:.06'],drag:['🐉','มังกรเงิน','pow:8 hp:20','fight:.12 over:.2'],moon:['🌙','จันทร์เสี้ยว','mp:25 read:.05','ring:.1 rune:.08'],slum:['👑','ราชาสลัม','inc:30 luck:.03','inc:60 read:.06'],holy:['✨','อัศวินศักดิ์สิทธิ์','heal:.05 hp:30','save:1 rep:10'],dmn:['😈','สัญญาปีศาจ','pow:10 dark:8','pow:20 fight:.1 dark:10']};
const GTN=['ธรรมดา','ดี','หายาก','มหากาพย์','ตำนาน','เทพนิยาย'],GTC=['#9aa0a6','#4caf50','#2d7dd2','#8e44ad','#e67e22','#d81b60'];
function mkGear(t,sl,setK){sl=sl||pick(['w','a','c']);const b=pick(GBASE[sl]);t=cl(t,0,5);const pre=t===0?GPRE[R(0,2)]:pick(GPRE.slice(3));
 const m=[.6,1,1.5,2.2,3.2,4.5][t],fx=[];GSLOT[sl].forEach((s,i)=>{if(i===0||rnd()<.35+t*.12){const [k,v]=s.split(':');fx.push(k+':'+(Math.abs(+v)<1?Math.round(+v*m*100)/100:Math.round(+v*m)))}});if(pre[1])fx.push(pre[1]);
 const set=setK||(t>=2&&rnd()<.22?pick(Object.keys(GSET)):null);
 return{id:R(1,1e9),sl,ic:b[0],n:set?`${b[1]}${GSET[set][1]}`:`${b[1]}${pre[0]}`,t,fx:fx.join(' '),set,en:0,v:Math.round(30*Math.pow(2.3,t))}}
const gName=g=>`${g.ic} ${E(g.n)}${g.en?` +${g.en}`:''}`;
function lootDrop(K,t,src){const X=X3(K);const g=mkGear(t);X.inv.push(g);if(X.inv.length>24)X.inv.sort((a,b)=>b.t-a.t||b.en-a.en).splice(24);
 const cur=X.gear[g.sl];const better=!cur||g.t>cur.t||(g.t===cur.t&&!cur.en);if(better&&auto){X.gear[g.sl]=g;X.inv=X.inv.filter(x=>x!==g);recalcE(K)}
 return ` · 🎁 ได้<span style="color:${GTC[g.t]}">${gName(g)}</span> [${GTN[g.t]}]${g.set?` · ชิ้นส่วนเซ็ต${GSET[g.set][1]}`:''}${src?' จาก'+src:''}`}
window.fanInv=function(){const K=FN();if(!K)return;const X=X3(K);recalcE(K);
 const slot=(sl,lb)=>{const g=X.gear[sl];return`<div class="item" style="border-color:${g?GTC[g.t]:'#444'}"><b>${lb}</b> ${g?`<span style="color:${GTC[g.t]}">${gName(g)}</span><div class="tag2">${GTN[g.t]}${g.set?' · '+GSET[g.set][0]+' เซ็ต'+GSET[g.set][1]:''} · ${fxT(g.fx)||'—'}</div><div style="display:flex;gap:6px;margin-top:5px"><button class="gbtn" style="padding:4px 10px" onclick="fanEnh('${sl}')">🔨 ตีบวก (${fmt(enhCost(g))})</button><button class="gbtn" style="padding:4px 10px" onclick="fanUneq('${sl}')">ถอด</button></div>`:'<span class="tag2">ว่าง</span>'}</div>`};
 const sc={};for(const s of ['w','a','c']){const g=X.gear[s];if(g&&g.set)sc[g.set]=(sc[g.set]|0)+1}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🎒 อุปกรณ์</h3>${slot('w','⚔️ อาวุธ')}${slot('a','🛡️ เกราะ')}${slot('c','💍 เครื่องประดับ')}
 ${Object.keys(sc).map(k=>`<div class="tag2" style="margin:4px 0">${GSET[k][0]} เซ็ต${GSET[k][1]} ${sc[k]}/3 · 2 ชิ้น: ${fxT(GSET[k][2])}${sc[k]>=3?' · 3 ชิ้น: '+fxT(GSET[k][3]):''}</div>`).join('')}
 <h4 style="margin:10px 0 4px">กระเป๋า (${X.inv.length}/24) · 🪙 ${fmt(S.money||0)}</h4>${X.inv.map((g,i)=>`<div class="item" style="padding:6px 9px;border-color:${GTC[g.t]}55"><span style="color:${GTC[g.t]}">${gName(g)}</span> <span class="tag2">${GTN[g.t]} · ${fxT(g.fx)}</span><div style="display:flex;gap:6px;margin-top:4px"><button class="gbtn" style="padding:3px 10px" onclick="fanEq(${i})">ใส่</button><button class="gbtn" style="padding:3px 10px" onclick="fanSell(${i})">ขาย ${fmt(g.v)}</button></div></div>`).join('')||'<div class="tag2">ว่าง — ของดรอปจากดันเจี้ยน บอส เควสต์ และร้านค้า</div>'}
 <button class="gbtn" style="width:100%;margin-top:8px" onclick="fanShop()">🏪 ร้านค้าในเมือง</button>`,'faninv')};
const enhCost=g=>Math.round(g.v*.6*(1+g.en*.7));
window.fanEq=i=>{const K=FN(),X=X3(K),g=X.inv[i];if(!g)return;const old=X.gear[g.sl];X.gear[g.sl]=g;X.inv.splice(i,1);if(old)X.inv.push(old);recalcE(K);sync();render();fanInv()};
window.fanUneq=sl=>{const K=FN(),X=X3(K),g=X.gear[sl];if(!g)return;X.gear[sl]=null;X.inv.push(g);recalcE(K);sync();render();fanInv()};
window.fanSell=i=>{const K=FN(),X=X3(K),g=X.inv[i];if(!g)return;X.inv.splice(i,1);S.money=(S.money||0)+g.v;try{toast(`🪙 ขาย ${g.n} +${fmt(g.v)}`)}catch(e){}fanInv()};
window.fanEnh=sl=>{const K=FN(),X=X3(K),g=X.gear[sl];if(!g)return;const c=enhCost(g);if((S.money||0)<c){try{toast('🪙 เงินไม่พอ')}catch(e){}return}S.money-=c;const p=Math.max(.15,.95-g.en*.09);
 if(rnd()<p){g.en++;g.v=Math.round(g.v*1.35);try{toast(`🔨 ตีบวกสำเร็จ! +${g.en}`)}catch(e){}}else if(g.en>=5&&rnd()<.4){X.gear[sl]=null;try{toast(`💥 ${g.n} แตกละเอียด!`)}catch(e){}feed(`💥 ${gName(g)} แตกระหว่างตีบวก ช่างตีเหล็กยืนเงียบ`)}else{g.en=Math.max(0,g.en-1);try{toast('🔨 ล้มเหลว ระดับลดลง')}catch(e){}}recalcE(K);sync();render();fanInv()};
window.fanShop=function(){const K=FN(),X=X3(K);const day=age();if(X.shopY!==day){X.shopY=day;X.shop=[0,1,2,3].map(i=>{const g=mkGear(i<2?R(0,2):R(1,3));g.price=Math.round(g.v*2.2);return g})}
 const R2=REG[X.reg]||REG.cap;modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏪 ร้านค้า · ${R2[0]} ${R2[1]}</h3><p class="tag2">ของในร้านเปลี่ยนทุกปี · 🪙 ${fmt(S.money||0)}</p>${X.shop.map((g,i)=>g?`<div class="item" style="border-color:${GTC[g.t]}55"><span style="color:${GTC[g.t]}">${gName(g)}</span> <span class="tag2">${GTN[g.t]} · ${fxT(g.fx)}</span><button class="gbtn" style="float:right;padding:3px 10px" onclick="fanBuy(${i})">${fmt(g.price)}</button></div>`:'').join('')}
 <div class="item">🧪 ยาฟื้นพลังชีวิต <button class="gbtn" style="float:right;padding:3px 10px" onclick="fanBuyP()">${fmt(80+age()*4)}</button></div>${!X.pet?`<div class="item">🥚 ไข่ไม่ทราบชนิด <span class="tag2">พ่อค้าบอกว่า "ฟักแล้วอย่าโทษข้า"</span><button class="gbtn" style="float:right;padding:3px 10px" onclick="fanBuyEgg()">${fmt(600)}</button></div>`:''}`,'fanshop')};
window.fanBuy=i=>{const K=FN(),X=X3(K),g=X.shop[i];if(!g||(S.money||0)<g.price){try{toast('🪙 เงินไม่พอ')}catch(e){}return}S.money-=g.price;X.shop[i]=null;delete g.price;X.inv.push(g);fanShop()};
window.fanBuyP=()=>{const c=80+age()*4;if((S.money||0)<c)return;S.money-=c;S.hp=S.maxHp;try{toast('🧪 พลังชีวิตเต็ม')}catch(e){}render()};
window.fanBuyEgg=()=>{const K=FN(),X=X3(K);if(X.pet||(S.money||0)<600)return;S.money-=600;X.pet=newPet(pick(Object.keys(PET)));feed(`🥚 ได้ไข่${PET[X.pet.sp][1]}มาหนึ่งฟอง มันอุ่นและขยับเบาๆ`);closeM()};

// =================== 📖 สมุดมอนสเตอร์ (ติดตัวข้ามชีวิต) ===================
const MON={cap:'🐀หนูท่อยักษ์ 🐺หมาป่าตาแดง 👺ก็อบลินขโมยไก่ 🦇ค้างคาวหอระฆัง 🟢สไลม์ท่อน้ำทิ้ง 💀โครงกระดูกสุสานหลวง 🐍งูในห้องเก็บไวน์ 👻ผีขุนนางขี้งก 🕷️แมงมุมใต้สะพาน 🐗หมูป่าหน้าบาก 🧟ทหารไร้หัว 🗿รูปปั้นเดินได้',
 elf:'🦌กวางเขาคริสตัล 🌳ต้นไม้กินคน 🧚ภูตขี้แกล้ง 🐻หมีมอส 🦉นกฮูกสามตา 🐸กบเสียงคน 🍄เห็ดเดินได้ 🐝ราชินีผึ้งน้ำผึ้งพิษ 🦊จิ้งจอกเก้าหาง 🐛หนอนยักษ์ใบไม้ 🌸ดอกไม้หลอนจิต 🐺หมาป่าเงา',
 desert:'🦂แมงป่องแก้ว 🐪อูฐผี 🐍งูทราย 🌪️วิญญาณพายุ 🦅นกกินซาก 🪲ด้วงทองคำ 🧞ยักษ์ในตะเกียงแตก 💀มัมมี่ราชา 🦎กิ้งก่าพ่นไฟ 🏜️หนอนทรายยักษ์ 👁️ตาในเนินทราย 🐫อูฐสองหัว',
 volcano:'🔥ซาลาแมนเดอร์ 🌋โกเลมลาวา 🐉มังกรถ่านหิน 🦇ค้างคาวไฟ 🐕สุนัขนรก 🪨หินมีชีวิต 👹ยักษ์เตาหลอม 🐌หอยทากลาวา 🔱อสูรตรีศูล 🦅ฟีนิกซ์ป่วย 💥ระเบิดเดินได้ 🐂กระทิงเพลิง',
 sky:'🦅กริฟฟินหลงฝูง 🐲มังกรเมฆ ⚡ภูตสายฟ้า 🎈แมงกะพรุนลอยฟ้า 🕊️นกพิราบยักษ์ 🌀วิญญาณลม 👼เทวดาตกสวรรค์ 🦋ผีเสื้อยักษ์ 🪁ว่าวผีสิง ☁️แกะเมฆ 🦉นกฮูกดวงดาว 🐋วาฬลอยฟ้า',
 sea:'🦑คราเคนวัยรุ่น 🧜เงือกโกรธ 🦀ปูยักษ์ 🐙หมึกยักษ์กลืนเรือ 🦈ฉลามมีขา 🐢เต่าเกาะ 👻โจรสลัดผี 🐡ปลาปักเป้าระเบิด 🪼แมงกะพรุนพิษ 🐋วาฬร้องเพลง 🦞กุ้งมังกรเกราะ 🌊วิญญาณคลื่น',
 north:'🐻‍❄️หมีขั้วโลก ❄️ภูตน้ำแข็ง 🐺หมาป่าหิมะ 🦣แมมมอธ 🧊โกเลมน้ำแข็ง 🦌กวางเรนเดียร์ผี 👹ยักษ์น้ำแข็ง 🐧เพนกวินนักรบ 🦭แมวน้ำพูดได้ 🌨️วิญญาณพายุหิมะ 🐉มังกรน้ำแข็ง 🦉นกฮูกหิมะ',
 abyss:'😈อสูรชั้นต่ำ 👿อสูรแม่ทัพ 🦇ค้างคาวปีศาจ 🐍งูนรก 💀อัศวินมรณะ 👁️ตาแห่งความมืด 🕷️แมงมุมเงา 🔥ปีศาจเพลิง 🧛แวมไพร์ชั้นสูง 🐺เซอร์เบอรัส 🌑วิญญาณที่ไม่มีชื่อ 👹ลูกน้องราชาปีศาจ'};
const MONL={};const seg0=s=>{try{return[...new Intl.Segmenter().segment(s)][0].segment}catch(e){return Array.from(s)[0]}};for(const r in MON)MONL[r]=MON[r].split(' ').map(s=>{const e=seg0(s);return[e,s.slice(e.length)]});
const bestG=()=>{try{return LS.get('murim_fanbest',{})||{}}catch(e){return{}}};
function meetMon(K,r){const L=MONL[r]||MONL.cap,m=pick(L),key=r+':'+m[1],B=bestG();if(B[key])return{m,t:''};B[key]=1;try{LS.set('murim_fanbest',B)}catch(e){}
 const got=L.filter(x=>B[r+':'+x[1]]).length;let t=` · 📖 บันทึกใหม่: ${m[0]} ${m[1]} (${REG[r][1]} ${got}/12)`;if(got===12){t+=` · 🏅 <b>ได้ฉายา「ผู้รู้จัก${REG[r][1]}」</b>`;X3(K).titles.push(REG[r][1])}return{m,t}}
window.fanBest=function(){const B=bestG();let tot=0;const h=Object.keys(MONL).map(r=>{const got=MONL[r].filter(x=>B[r+':'+x[1]]);tot+=got.length;return`<div class="item"><b>${REG[r][0]} ${REG[r][1]}</b> <span class="tag2">${got.length}/12</span><div style="font-size:20px;letter-spacing:3px;margin-top:4px">${MONL[r].map(x=>B[r+':'+x[1]]?`<span title="${x[1]}">${x[0]}</span>`:'<span style="opacity:.25">❔</span>').join('')}</div></div>`}).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📖 สมุดมอนสเตอร์ทวีป</h3><p class="tag2">บันทึกแล้ว ${tot}/96 ตัว · สมุดเล่มนี้ติดตัวไปทุกชีวิต</p>${h}`,'fanbest')};

// =================== 🗺️ แผนที่ 8 ภูมิภาค ===================
const REG={cap:['🏰','เมืองหลวงอัลเวิร์น','ตลาด วัง กิลด์ และข่าวลือทุกชนิด'],elf:['🌳','ป่าเอลฟ์ซิลวาเรน','ต้นไม้หันหน้าตามคน เอลฟ์ไม่ไว้ใจใคร'],desert:['🏜️','ทะเลทรายแก้วอัซซาร์','ทรายเป็นเศษแก้ว ซากอาณาจักรโบราณ'],volcano:['🌋','ภูเขาไฟดำอิกนิส','คนแคระตีเหล็ก มังกรถ่านหินหลับใต้ภูเขา'],sky:['☁️','เมืองลอยฟ้าเอเธอเรีย','เกาะลอยฟ้าที่ขึ้นได้ด้วยกริฟฟินเท่านั้น'],sea:['🌊','หมู่เกาะทะเลหมอก','โจรสลัด เงือก และเรือที่หายไปในหมอก'],north:['❄️','ทุ่งน้ำแข็งเหนือ','หนาวจนลมหายใจเป็นผลึก ชนเผ่านักรบ'],abyss:['🌑','ดินแดนปีศาจ','ฟ้าเป็นสีม่วง ปีศาจไม่ได้ร้ายทุกตน']};
const RST=[['calm','🕊️','สงบ'],['war','⚔️','สงคราม'],['plague','🦠','โรคระบาด'],['fest','🎪','เทศกาล'],['quake','💥','ภัยพิบัติ'],['gold','💰','ตื่นทอง']];
function regTick(K){const X=X3(K);for(const r in REG){if(!X.rs[r]||rnd()<.35)X.rs[r]=pick(RST)[0]}if(X.wf&&X.wf.peace)X.rs.abyss=X.rs.abyss==='war'?'calm':X.rs.abyss}
const rsN=k=>RST.find(x=>x[0]===k)||RST[0];
function evTravel(K){const X=X3(K);const L=Object.keys(REG).filter(r=>r!==X.reg);C('🗺️ ออกเดินทาง',`ตอนนี้อยู่ที่ ${REG[X.reg][0]} ${REG[X.reg][1]} · สถานการณ์แต่ละภูมิภาคเปลี่ยนทุกปี`,shuf(L).slice(0,4).map(r=>{const s=rsN(X.rs[r]);return O(`${REG[r][0]} ${REG[r][1]}`,()=>{X.reg=r;const mm=meetMon(K,r);feed(`🗺️ เดินทางถึง${REG[r][0]} <b>${REG[r][1]}</b> — ${REG[r][2]} · ตอนนี้: ${s[1]} ${s[2]}${mm.t}`)},`${s[1]} ${s[2]}`,.25)}).concat([O('🏠 อยู่ที่เดิม',()=>feed('🏠 คุณตัดสินใจอยู่ต่อ'),'',.1)]))}
// เหตุการณ์ประจำภูมิภาค (ขึ้นกับสถานการณ์)
const REV={
 cap:[K=>C('🎭 ละครเวทีเรื่องคุณ','โรงละครหลวงเปิดแสดงละครเรื่อง "ผู้กล้าจากต่างแดน" นักแสดงนำหน้าเหมือนคุณ แต่ตอนจบตัวละครของคุณตาย',[O('🎟️ เข้าไปดู',()=>feed('🎟️ ตอนจบคนดูร้องไห้ทั้งโรง มีคนจำได้ว่าคุณคือตัวจริง ขอลายเซ็นยาวถึงประตู'+rep(5))),O('✍️ ขอแก้บทตอนจบ',()=>{feed('✍️ ผู้กำกับยอม ตอนจบใหม่ตัวละครของคุณเปิดร้านขนมปัง คนดูโห่ แต่คุณชอบ');S.cha=(S.cha||0)+3})])],
 elf:[K=>C('🌳 การพิพากษาของต้นไม้','เอลฟ์จับคุณมาขึ้นศาลต่อหน้าต้นไม้พันปี ข้อหา "เหยียบดอกไม้โดยไม่ขอโทษ"',[O('🙇 ขอโทษดอกไม้',()=>mgRead('ขอโทษดอกไม้ให้ต้นไม้เชื่อ','ต้นไม้พันปี',sc=>feed(sc>.55?'🙇 ต้นไม้สั่นใบ เอลฟ์ยกโทษให้ และมอบเมล็ดพันธุ์หนึ่งเมล็ด'+lootDrop(K,2,'เอลฟ์'):'🙇 ต้นไม้ไม่เชื่อ คุณต้องรดน้ำต้นไม้ทั้งป่าหนึ่งเดือน'))),O('🏃 หนี',()=>feed('🏃 ทั้งป่าหันหน้ามองตามคุณจนพ้นเขต'+rep(-3)))])],
 desert:[K=>C('🏜️ เมืองที่โผล่ตอนเที่ยงคืน','กลางทะเลทรายแก้ว เมืองทั้งเมืองโผล่ขึ้นจากทรายตอนเที่ยงคืน มีแสงไฟและเสียงดนตรี แต่ไม่มีเงาคน',[O('🚶 เดินเข้าไป',()=>mgDungeon('เมืองที่หายไปตอนรุ่งสาง',5,sc=>feed(`🚶 คุณต้องออกมาก่อนรุ่งสาง${money(DUN.loot)}${DUN.fl>=4?lootDrop(K,3,'เมืองโบราณ'):''}`))),O('⛺ รอดูจากเนินทราย',()=>feed('⛺ ตอนรุ่งสาง เมืองจมกลับลงทราย มีคนหนึ่งในเมืองโบกมือให้คุณ'))])],
 volcano:[K=>C('🔨 คนแคระท้าแข่งตีเหล็ก','ช่างตีเหล็กคนแคระหัวเราะใส่ดาบของคุณ "ของเล่นเด็ก! แข่งตีดาบกับข้า ถ้าชนะ เอาดาบข้าไป"',[O('🔨 รับคำท้า',()=>mgRing('ตีเหล็กให้ตรงจังหวะ',sc=>feed(sc>.7?'🔨 คนแคระเงียบไปนาน แล้วยื่นดาบให้สองมือ'+lootDrop(K,3,'คนแคระ'):'🔨 ดาบของคุณงอเป็นรูปตัว S คนแคระหัวเราะจนหนวดไหม้'))),O('🍺 ชวนดื่มแทน',()=>feed('🍺 คุณดื่มชนะคนแคระสามคน ได้ส่วนลดตีเหล็กตลอดชีวิต'+rep(3)))])],
 sky:[K=>C('☁️ ร่วงจากเกาะลอยฟ้า','ลมพายุพัดคุณตกจากขอบเกาะ ข้างล่างคือเมฆ และใต้เมฆคืออะไรก็ไม่รู้',[O('🦅 เป่านกหวีดเรียกกริฟฟิน',()=>mgDance('เรียกกริฟฟินให้ทัน (กดตามจังหวะปีก)','กริฟฟิน',sc=>feed(sc>.5?'🦅 กริฟฟินคาบคุณกลางอากาศ แล้วพาไปรังที่มีไข่ทองคำ'+money(300):'🦅 คุณตกลงบนหลังวาฬลอยฟ้า มันพาคุณไปส่งท่าเรือ ใช้เวลาครึ่งปี'))),O('🌀 ร่ายเวทลอยตัว',()=>{const o=overcast(K);feed('🌀 คุณลอยลงอย่างช้าๆ เหมือนใบไม้'+o.t)})])],
 sea:[K=>C('🏴‍☠️ เรือโจรสลัดผี','เรือที่ใบเรือขาดวิ่นแล่นมาเทียบ กัปตันโครงกระดูกยื่นมือ "ร่วมลูกเรือข้า หรือเล่นไพ่กับข้า"',[O('🃏 เล่นไพ่',()=>mgRead('อ่านใจกัปตันโครงกระดูก','กัปตันผี',sc=>feed(sc>.6?'🃏 คุณชนะ กัปตันให้แผนที่สมบัติ'+lootDrop(K,3,'โจรสลัดผี')+money(200):'🃏 แพ้ คุณต้องขัดดาดฟ้าเรือผีหนึ่งคืน'+hurt(.1)))),O('⚔️ บุกยึดเรือ',()=>duel('กัปตันโครงกระดูก',Math.round(S.power*1.05),w=>feed(w?'⚔️ เรือผีเป็นของคุณ ลูกเรือโครงกระดูกโค้งให้'+money(400):'⚔️ คุณถูกโยนลงทะเล'+hurt(.3))),'ต่อสู้')])],
 north:[K=>C('❄️ พิธีกรรมชนเผ่า','ชนเผ่านักรบเหนือจะยอมรับคนนอกก็ต่อเมื่อกระโดดลงทะเลสาบน้ำแข็งแล้วว่ายข้ามได้',[O('🏊 กระโดด',()=>{if(rnd()<.55+S.maxHp/4000){feed('🏊 คุณขึ้นฝั่งตัวสั่น ทั้งเผ่าโห่ร้อง หัวหน้าเผ่ามอบขวานประจำตระกูล'+lootDrop(K,2,'ชนเผ่าเหนือ'))}else feed('🏊 คุณจมกลางทาง ชาวเผ่าดึงขึ้นมา ตั้งฉายาให้ว่า "คนที่เกือบได้"'+hurt(.3))}),O('🔥 ก่อไฟเลี้ยงทั้งเผ่าแทน',()=>feed('🔥 ชาวเผ่าไม่ยอมรับคุณ แต่ชอบอาหารคุณมาก'+rep(2)))])],
 abyss:[K=>C('🌑 ตลาดปีศาจ','ปีศาจตั้งแผงขายของในตลาดใต้ฟ้าสีม่วง แม่ค้าปีศาจหางยาวยิ้มให้คุณ "ลูกค้ามนุษย์คนแรกในรอบร้อยปี ลดราคาให้!"',[O('🛍️ ช้อปปิ้ง',()=>{if((S.money||0)<200)return feed('🛍️ เงินไม่พอ แม่ค้าให้ลูกอมฟรีหนึ่งเม็ด รสกำมะถัน');money(-200);feed('🛍️ ได้ของแปลกจากตลาดปีศาจ'+lootDrop(K,R(2,4),'ตลาดปีศาจ'))}),O('🗡️ ไม่ไว้ใจ ชักดาบ',()=>feed('🗡️ ทั้งตลาดเงียบ แม่ค้าถอนหายใจ "มนุษย์ก็เป็นแบบนี้ทุกที"'+rep(-3)+dark(3)))])]};
function evRegion(K){const X=X3(K),r=X.reg,s=X.rs[r]||'calm';const mm=meetMon(K,r);
 if(s==='war')return C(`⚔️ สงครามที่${REG[r][1]}`,`กองทัพสองฝ่ายปะทะกันใกล้ที่คุณพัก ทั้งสองฝ่ายต้องการคนเก่ง`,[O('⚔️ รับจ้างรบ',()=>duel('ทหารฝ่ายตรงข้าม',Math.round(threat(K)*1.1),w=>feed(w?`⚔️ ได้ค่าจ้างและของจากสนามรบ${money(R(100,250))}${lootDrop(K,R(1,3),'สนามรบ')}`:'⚔️ บาดเจ็บหนัก'+hurt(.35))),'ต่อสู้'),O('🏥 ช่วยรักษาผู้บาดเจ็บ',()=>feed('🏥 ทหารทั้งสองฝ่ายจำหน้าคุณได้'+rep(6))),O('🏃 หนีออกจากเขตสงคราม',()=>{X.reg='cap';feed('🏃 กลับเมืองหลวงอย่างปลอดภัย')})]);
 if(s==='plague')return C(`🦠 โรคระบาดที่${REG[r][1]}`,`คนในหมู่บ้านป่วยเป็นไข้ที่ทำให้ผิวกลายเป็น${pick(['สีน้ำเงิน','หิน','ใบไม้'])}`,[O('⚗️ ปรุงยารักษา',()=>mgPotion('ปรุงยารักษาโรคระบาด',4,sc=>feed(sc>.6?'⚗️ ยาได้ผล หมู่บ้านทั้งหมู่บ้านรอด'+rep(10):'⚗️ ยาได้ผลครึ่งเดียว'+rep(3))),'มินิเกม'),O('🚪 รีบออกไป',()=>feed('🚪 คุณออกมาทัน แต่ได้ยินเสียงไอตามหลัง'))]);
 if(s==='fest')return C(`🎪 เทศกาลที่${REG[r][1]}`,`ทั้งภูมิภาคฉลอง${pick(['วันเกิดราชา','การกลับมาของนกฟีนิกซ์','คืนดาวตก','วันเก็บเกี่ยว'])} มีแข่งขันชิงรางวัล`,[O('💃 แข่งเต้นรำ',()=>mgDance('แข่งเต้นรำในเทศกาล','คนแปลกหน้าสวมหน้ากาก',sc=>feed(sc>.65?'💃 ชนะเลิศ!'+money(250)+lootDrop(K,2,'รางวัลเทศกาล'):'💃 ได้รางวัลชมเชย'+money(40))),'มินิเกม'),O('🍢 เดินกินเที่ยว',()=>{heal(.4);feed('🍢 ปีนี้มีความสุขที่สุดปีหนึ่ง')})]);
 if(s==='gold')return C(`💰 ตื่นทองที่${REG[r][1]}`,'มีคนเจอแร่หายากในเหมืองร้าง ทุกคนวิ่งเข้าไปขุด',[O('⛏️ ลงเหมือง',()=>mgDungeon('เหมืองตื่นทอง',4,sc=>feed(`⛏️ ขุดได้${money(DUN.loot*1.5)}${DUN.fl>=3?lootDrop(K,2,'เหมือง'):''}`))),O('🍺 เปิดร้านขายเหล้าให้คนขุด',()=>feed('🍺 คนขุดทองไม่รวย คนขายเหล้ารวย'+money(R(200,400))))]);
 if(s==='quake')return C(`💥 ภัยพิบัติที่${REG[r][1]}`,`${pick(['แผ่นดินแยก','น้ำท่วมใหญ่','ฝนดาวตก','พายุเวท'])} คนติดอยู่ใต้ซากเป็นร้อย`,[O('🫂 ช่วยคน',()=>{feed('🫂 คุณช่วยคนได้สามสิบสองคน เด็กคนหนึ่งให้ของขวัญเป็นก้อนหินเรืองแสง'+rep(8)+hurt(.15));if(rnd()<.4)feed(lootDrop(K,2,'ซากปรักหักพัง'))}),O('💰 เก็บของในซาก',()=>feed('💰 รวยขึ้น'+money(R(150,300))+dark(8)))]);
 const L=REV[r];if(L&&rnd()<.6)return pick(L)(K);
 C(`${mm.m[0]} ${mm.m[1]}`,`ระหว่างเดินทางใน${REG[r][1]} คุณเจอ${mm.m[1]}${mm.t}`,[O('⚔️ สู้',()=>{if(fight(threat(K)*(r==='abyss'?1.3:r==='cap'?.8:1.05)))feed(`⚔️ ชนะ${mm.m[1]}${money(R(30,90))}${rnd()<.35?lootDrop(K,R(0,2),mm.m[1]):''}${pw(capOf(K)*.03)}${clsXp(K,15)}`);else feed('⚔️ แพ้ ต้องถอยหนี'+hurt(.25))},'',.6),O('🏃 หลบ',()=>feed('🏃 คุณซ่อนตัวจนมันเดินผ่านไป'),'',.4)])}

// =================== 👹 บอสประจำภูมิภาค ===================
const BOSS={cap:['👑','ราชาโครงกระดูกใต้วัง',1],elf:['🌳','ต้นไม้แม่ผู้บ้าคลั่ง',1.15],desert:['🦂','จักรพรรดิแมงป่องแก้ว',1.3],volcano:['🐉','มังกรถ่านหินอิกนิส',1.6],sky:['⚡','อสูรพายุไร้ปีก',1.45],sea:['🦑','คราเคนแม่',1.5],north:['❄️','ราชินีน้ำแข็งที่ไม่มีหัวใจ',1.4],abyss:['😈','แม่ทัพปีศาจคนที่สอง',1.8]};
function bossRating(K){const X=X3(K);return S.power*(1+fxv('fight'))*(1+X.party.filter(p=>p.alive).length*.12)}
function evBoss(K){const X=X3(K),r=X.reg,b=BOSS[r];if(!b||X.bk[r])return;const need=capOf(K)*b[2]*.9,ok=bossRating(K)/need;
 C(`${b[0]} รังของ${b[1]}`,`ชาวบ้านใน${REG[r][1]}ขอร้องให้กำจัด${b[1]} · ความพร้อมของคุณ ${Math.round(cl(ok,0,2)*50)}% ${ok<.8?'⚠️ อันตรายมาก':ok<1.1?'สูสี':'ได้เปรียบ'}${X.party.filter(p=>p.alive).length?` · ปาร์ตี้ ${X.party.filter(p=>p.alive).length} คนพร้อม`:''}`,[
  O('⚔️ บุกรัง (มินิเกม 3 ด่าน)',()=>{let t=0;mgRead(`อ่านท่า${b[1]}`,b[1],a=>{t+=a;mgDuel(`ปะทะ${b[1]}`,b[1],c=>{t+=c;mgRing(`หนีตอน${b[1]}คลั่ง`,d=>{t+=d;const sc=t/3*.6+cl(ok,0,1.5)*.4;
   if(sc>=.55){X.bk[r]=age();const mm=meetMon(K,r);say(`${b[0]} <b>ล้ม${b[1]}สำเร็จ!</b>${money(R(400,900))}${lootDrop(K,R(3,5),b[1])}${rep(15)}${pw(capOf(K)*.12)}${clsXp(K,60)}`,'myth',true);X.titles.push('ผู้ล้ม'+b[1]);bossLoss(K,.15)}
   else{say(`${b[0]} ${b[1]}แข็งแกร่งเกินไป คุณถอยออกมา${hurt(.45)}`,'bad',true);bossLoss(K,.35)}})})})},'',.6),
  O('🚶 ยังไม่พร้อม',()=>feed(`🚶 คุณถอยกลับ ชาวบ้านมองตามด้วยสายตาผิดหวัง`),'',.4)])}
function bossLoss(K,p){const X=X3(K),L=X.party.filter(x=>x.alive);if(!L.length||rnd()>p)return;const v=pick(L);if(v.b>=70&&rnd()<.5){v.alive=0;say(`💔 <b>${E(v.n)}</b> (${PCL[v.c][1]}) เอาตัวบังการโจมตีสุดท้ายแทนคุณ ${pick(['รอยยิ้มสุดท้ายของเขาเหมือนวันแรกที่เจอกัน','คำสุดท้ายคือ "ครั้งนี้ฉันช่วยนายได้"','เขาไม่ได้พูดอะไรเลย แค่จับมือคุณไว้'])}`,'bad',true);recalcE(K)}else{v.b=Math.max(0,v.b-10);feed(`🩹 ${E(v.n)}บาดเจ็บหนัก ความสัมพันธ์สั่นคลอน`)}}

// =================== 🎓 อาชีพและเลื่อนขั้น ===================
const CLS={sw:['⚔️','นักดาบ','ฝึกจนดาบเป็นส่วนหนึ่งของแขน','fight:.04 pow:3 hp:10'],mg:['🔮','จอมเวท','ร่ายเวทจนลืมกินข้าว','mp:10 ring:.02 pow:2'],as:['🗡️','นักฆ่า','เดินในเงา ไม่มีใครได้ยินเสียง','fight:.03 read:.03 dark:1'],pr:['✨','นักบวช','สวดจนคำอธิษฐานกลายเป็นพลัง','heal:.02 save:0 rep:1'],bt:['🐾','ผู้ฝึกสัตว์','สัตว์ทุกตัวเข้าใจคุณ','luck:.01 ev:.02 fight:.02'],cr:['🔨','ช่างฝีมือ','สร้างของที่คนอื่นซื้อไม่ได้','inc:8 luck:.01'],
 sw2:['🛡️','อัศวินศักดิ์สิทธิ์','ดาบที่ปกป้อง ไม่ใช่ทำร้าย','fight:.05 hp:20 save:0 rep:2'],sw3:['🩸','นักดาบโลหิต','ยิ่งเลือดออกยิ่งแรง','fight:.07 pow:5 dark:2'],mg2:['🌟','ปราชญ์แห่งดวงดาว','อ่านดวงดาวเหมือนอ่านหนังสือ','mp:15 rune:.03 ring:.02'],mg3:['💀','จอมเวทต้องห้าม','เวทที่ตำราไม่กล้าเขียน','mp:15 pow:4 dark:2'],as2:['🌙','เงาราชสำนัก','ทำงานให้คนที่ไม่มีชื่อ','read:.05 inc:6'],as3:['☠️','นักฆ่าพันหน้า','ไม่มีใครรู้ว่าหน้าจริงคุณเป็นแบบไหน','fight:.06 read:.03 dark:2'],pr2:['👼','นักบุญ','ทุกคนที่คุณแตะหายป่วย','heal:.04 rep:3 save:0'],pr3:['🕯️','นักบวชนอกรีต','บูชาเทพที่ไม่มีใครรู้จัก','heal:.02 mp:12 clue:0'],bt2:['🐉','จ้าวมังกร','มังกรยอมให้ขี่','fight:.05 pow:4'],bt3:['🐺','ราชาฝูงหมาป่า','ฝูงหมาป่าเดินตามทุกที่','fight:.04 luck:.02 ev:.03'],cr2:['⚙️','วิศวกรเวท','สร้างเครื่องจักรที่เดินได้','inc:15 rune:.03'],cr3:['💎','ช่างอัญมณีต้องสาป','อัญมณีของคุณมีวิญญาณ','inc:12 luck:.03 dark:1']};
const CPRO={sw:['sw2','sw3'],mg:['mg2','mg3'],as:['as2','as3'],pr:['pr2','pr3'],bt:['bt2','bt3'],cr:['cr2','cr3']};
function clsXp(K,x){const X=X3(K);if(!X.cls)return'';X.cls.xp=(X.cls.xp|0)+x;let t='';while(X.cls.xp>=40+X.cls.lv*12&&X.cls.lv<30){X.cls.xp-=40+X.cls.lv*12;X.cls.lv++;t=` · 🎓 ${CLS[X.cls.k][1]} Lv${X.cls.lv}`;if(X.cls.lv===10&&CPRO[X.cls.k])queue(()=>evPromo(K))}if(t)recalcE(K);return t}
function evClass(K){const X=X3(K);X.clsAsk=1;C('🎓 สมาคมอาชีพ',`ถึงเวลาเลือกเส้นทางของตัวเอง ทุกอาชีพเลื่อนขั้นได้ที่ระดับ 10 และมีสองทางเสมอ คือทางสว่างและทางมืด`,['sw','mg','as','pr','bt','cr'].map(k=>O(`${CLS[k][0]} ${CLS[k][1]}`,()=>{X.cls={k,lv:1,xp:0};recalcE(K);feed(`🎓 คุณลงทะเบียนเป็น<b>${CLS[k][1]}</b> — ${CLS[k][2]}`)},fxT(CLS[k][3]),.16)))}
function evPromo(K){const X=X3(K),P=CPRO[X.cls.k];if(!P)return;C(`🎓 เลื่อนขั้น: ${CLS[X.cls.k][1]} ระดับ 10`,'อาจารย์สองคนรอคุณอยู่คนละประตู คนหนึ่งยิ้ม อีกคนไม่มีเงา',P.map((k,i)=>O(`${CLS[k][0]} ${CLS[k][1]}`,()=>{const test=i===0?(cb=>mgRead('สอบเลื่อนขั้นทางสว่าง','อาจารย์ผู้ยิ้ม',cb)):(cb=>mgDuel('สอบเลื่อนขั้นทางมืด','อาจารย์ไร้เงา',cb));test(sc=>{if(sc>=.5){X.cls.k=k;recalcE(K);say(`🎓 <b>เลื่อนขั้นเป็น${CLS[k][1]}</b> — ${CLS[k][2]}`,'epic');if(i===1)dark(8)}else{feed('🎓 สอบไม่ผ่าน ต้องรอปีหน้า');X.cls.lv=9;X.cls.xp=40+9*12-20}})},`${i?'ทางมืด':'ทางสว่าง'} · ${fxT(CLS[k][3])}`,.5)))}

// =================== 🫂 ปาร์ตี้ 4 คน ===================
const PCL={sw:['⚔️','นักดาบ','fight:.04 hp:12'],mg:['🔥','นักเวทไฟ','pow:4 mp:8'],pr:['✨','นักบวช','heal:.03 save:0'],th:['🗡️','จอมโจร','inc:10 luck:.02'],ar:['🏹','นักธนู','ring:.04 fight:.02'],bd:['🎻','กวีพเนจร','cha:4 read:.03'],tk:['🛡️','นักรบโล่','hp:25'],sm:['🌙','หมอผี','read:.04 mp:6']};
const PPS=[['😤','ใจร้อน','ชอบบุกก่อนคิด'],['😶','เงียบขรึม','พูดวันละสามประโยค'],['😂','ตลก','ทำทุกสถานการณ์ให้เป็นเรื่องตลก'],['🤑','งก','นับเหรียญทุกคืน'],['😇','ใจดีเกินไป','ช่วยทุกคนแม้แต่ศัตรู'],['😈','ทะเยอทะยาน','อยากเป็นที่หนึ่ง และอาจไม่ใช่เพื่อคุณ'],['😨','ขี้กลัว','กลัวทุกอย่าง ยกเว้นความตาย'],['🧐','ช่างสงสัย','ถามทุกอย่าง']];
const PSEC=['เป็นเจ้าชายที่หนีออกจากวัง','เคยเป็นนักฆ่าที่ถูกส่งมาฆ่าคุณ','อายุจริง 300 ปี','มีลูกที่ทิ้งไว้ในหมู่บ้าน','เป็นปีศาจปลอมตัว','กำลังป่วยหนักและไม่บอกใคร','เป็นสายลับของกิลด์','ถูกอัญเชิญมาจากโลกเดียวกับคุณเมื่อ 20 ปีก่อน'];
const PCMB=[['pr','mg','🔥✨ ไฟศักดิ์สิทธิ์','pow:6 heal:.02'],['tk','pr','🛡️✨ กำแพงที่ไม่ล้ม','save:1 hp:20'],['th','ar','🗡️🏹 ซุ่มโจมตี','fight:.06'],['bd','sm','🎻🌙 เพลงวิญญาณ','read:.08 mp:10'],['sw','tk','⚔️🛡️ แนวหน้าเหล็ก','fight:.05 hp:15'],['mg','sm','🔥🌙 เวทคู่','pow:5 mp:15'],['th','bd','🗡️🎻 คณะละครต้มตุ๋น','inc:25 cha:3']];
function pCombos(K){const c=X3(K).party.filter(p=>p.alive).map(p=>p.c);return PCMB.filter(x=>c.includes(x[0])&&c.includes(x[1]))}
function mkComp(n){const ps=pick(PPS);return{n:n||nm(),c:pick(Object.keys(PCL)),ps:ps[1],pi:ps[0],sec:pick(PSEC),rv:0,b:R(20,40),alive:1,j:age()}}
function evRecruit(K){const X=X3(K);if(X.party.filter(p=>p.alive).length>=3)return;const A=mkComp(),B=mkComp();if(isIso(K)&&X2(K).cls){const c=X2(K).cls.find(x=>x.st==='ok'&&!x.id&&!X.party.some(p=>p.n===x.n));if(c&&rnd()<.5){B.n=c.n;B.cls=1}}
 const d=p=>`${PCL[p.c][0]} ${PCL[p.c][1]} · ${p.pi} ${p.ps}`;C('🍺 หาเพื่อนร่วมทาง',`ในโรงเตี๊ยม มีสองคนอยากเข้าปาร์ตี้คุณ · ปาร์ตี้ตอนนี้ ${X.party.filter(p=>p.alive).length}/3`,[
  O(`${E(A.n)}`,()=>{X.party.push(A);recalcE(K);feed(`🫂 <b>${E(A.n)}</b> (${d(A)}) เข้าร่วมปาร์ตี้ — ${pick(['"ตามสบาย ฉันไม่ได้มาเพราะนายหรอก"','"ข้าจะคุ้มครองเจ้าเอง"','"ส่วนแบ่งห้าสิบห้าสิบนะ"','"ฝากตัวด้วยครับ!"'])}`)},d(A),.45),
  O(`${E(B.n)}${B.cls?' (เพื่อนร่วมห้อง)':''}`,()=>{X.party.push(B);recalcE(K);feed(`🫂 <b>${E(B.n)}</b> (${d(B)}) เข้าร่วมปาร์ตี้${B.cls?' — เพื่อนร่วมห้องจากโลกเดิม ได้ยินภาษาไทยอีกครั้งแทบน้ำตาไหล':''}`)},d(B),.45),
  O('🚶 เดินทางคนเดียวต่อ',()=>feed('🚶 คุณดื่มเหล้าจนหมดแก้วแล้วออกไปคนเดียว'),'',.1)])}
function evParty(K){const X=X3(K),L=X.party.filter(p=>p.alive);if(!L.length)return;const p=pick(L);
 if(p.b>=60&&!p.rv){p.rv=1;return C(`🫂 ความลับของ${E(p.n)}`,`คืนหนึ่งข้างกองไฟ ${E(p.n)}บอกความจริงว่าเขา<b>${p.sec}</b>`,[O('🤝 ไม่ว่าอะไร เรายังเป็นพวกเดียวกัน',()=>{p.b=Math.min(100,p.b+20);feed(`🤝 ${E(p.n)}ร้องไห้ครั้งแรกต่อหน้าคุณ`);if(/อัญเชิญ/.test(p.sec)&&K.clue<3)feed(clue(K,'มีผู้ถูกอัญเชิญรุ่นก่อนที่ยังมีชีวิต'));recalcE(K)},'',.6),O('😠 ทำไมไม่บอกตั้งแต่แรก',()=>{p.b-=25;feed(`😠 ${E(p.n)}เงียบไปหลายวัน`)},'',.4)])}
 if(p.b<15&&p.ps==='ทะเยอทะยาน'&&rnd()<.6){p.alive=0;const st=Math.round((S.money||0)*.4);S.money-=st;recalcE(K);return say(`🗡️ <b>${E(p.n)}ทรยศ</b> ขโมยเงิน ${fmt(st)} เหรียญกับแผนที่ไป แล้วหายตัวในคืนเดือนมืด มีคนเห็นเขาที่ค่ายของ${pick(['ดยุก','ราชาปีศาจ','กิลด์โจร'])}`,'bad',true)}
 if(L.length>=2&&rnd()<.25){const q=pick(L.filter(x=>x!==p));if(q&&!p.lv&&!q.lv){p.lv=q.lv=1;return feed(`💞 ${E(p.n)}กับ${E(q.n)}แอบจับมือกันตอนคิดว่าคุณหลับ ทั้งปาร์ตี้รู้ ยกเว้นสองคนนั้น`)}}
 const T={ใจร้อน:'บุกเข้ารังโจรก่อนแผนเสร็จ',เงียบขรึม:'พูดประโยคยาวที่สุดในชีวิตเพื่อปลอบคุณ',ตลก:'ทำให้ทั้งโรงเตี๊ยมหัวเราะจนเจ้าของลดค่าห้อง',งก:'ต่อราคาจนพ่อค้าร้องไห้',ใจดีเกินไป:'แอบเอาอาหารของปาร์ตี้ไปให้เด็กกำพร้า','ทะเยอทะยาน':'ถามว่าถ้าคุณตายใครจะได้ดาบคุณ',ขี้กลัว:'กรีดร้องใส่กระต่าย แล้วฆ่าหมาป่าที่ซ่อนอยู่ข้างหลังมัน',ช่างสงสัย:'ถามคำถามที่คุณตอบไม่ได้เรื่องโลกเดิม'};
 C(`🔥 ข้างกองไฟกับ${E(p.n)}`,`${PCL[p.c][0]} ${E(p.n)} ${T[p.ps]||'นั่งเงียบๆ ข้างคุณ'} · ความผูกพัน ${p.b}/100`,[O('🫂 ใช้เวลาด้วยกัน',()=>{p.b=Math.min(100,p.b+R(8,15));feed(`🫂 ${E(p.n)} ความผูกพัน ${p.b}`);recalcE(K)},'',.6),O('😑 ปล่อยเขาไป',()=>{p.b=Math.max(0,p.b-6);feed(`😑 ${E(p.n)}มองคุณเหมือนจะพูดอะไรแต่ไม่พูด`)},'',.4)])}
window.fanParty=function(){const K=FN();if(!K)return;const X=X3(K);const cb=pCombos(K);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🫂 ปาร์ตี้</h3>${X.party.map(p=>`<div class="item" style="${p.alive?'':'opacity:.5'}"><b>${PCL[p.c][0]} ${E(p.n)}</b> <span class="tag2">${PCL[p.c][1]} · ${p.pi} ${p.ps}${p.alive?'':' · ✝️ จากไปแล้ว'}</span><div class="tag2">ความผูกพัน ${p.b}/100 · ${fxT(PCL[p.c][2])}${p.rv?` · ความลับ: ${p.sec}`:' · ความลับ: ???'}</div></div>`).join('')||'<div class="tag2">ยังไม่มีเพื่อนร่วมทาง — ไปหาที่โรงเตี๊ยม</div>'}${cb.length?`<h4 style="margin:8px 0 4px">คอมโบทีม</h4>${cb.map(c=>`<div class="item">${c[2]} <span class="tag2">${fxT(c[3])}</span></div>`).join('')}`:''}`,'fanparty')};

// =================== 🐲 สัตว์อสูรคู่ใจ (วิวัฒนาการตามการเลี้ยง) ===================
const PET={slime:['🟢','สไลม์',{meat:['🟥','สไลม์เลือดราชา','pow:8 hp:20'],magic:['🔷','สไลม์ผลึกเวท','mp:30 over:.15'],love:['💗','สไลม์หัวใจทอง','heal:.06 cha:6'],dark:['⬛','สไลม์กลืนเงา','fight:.08 dark:5']}],drag:['🥚','มังกร',{meat:['🐉','มังกรเพลิงกระหายเลือด','pow:15 fight:.08'],magic:['🐲','มังกรน้ำแห่งดวงจันทร์','mp:35 ring:.08'],love:['🦄','มังกรขนปุยที่ไม่เคยพ่นไฟ','heal:.08 cha:10 luck:.04'],dark:['🖤','มังกรกระดูก','pow:12 save:1 dark:8']}],wolf:['🐺','หมาป่า',{meat:['🐺','หมาป่ายักษ์สองหัว','fight:.1 hp:25'],magic:['🌕','หมาป่าจันทร์เงิน','read:.08 mp:15'],love:['🐕','หมาป่าที่กลายเป็นหมาบ้าน','luck:.06 heal:.04'],dark:['🌑','หมาป่าเงานรก','fight:.08 dark:6']}],fae:['🧚','ภูต',{meat:['🦋','ภูตผีเสื้อกินเนื้อ','fight:.06 pow:5'],magic:['✨','ราชินีภูตแสง','mp:25 rune:.08'],love:['🌸','ภูตดอกไม้ประจำบ้าน','heal:.07 inc:15'],dark:['🕸️','ภูตพิษใยแมงมุม','read:.08 dark:5']}]};
const DIET={meat:['🍖','ให้เนื้อสด'],magic:['💠','ให้หินมานา'],love:['💗','กอดทุกคืน'],dark:['🌑','ให้กินเงา']};
function newPet(sp){return{sp,st:0,fd:{meat:0,magic:0,love:0,dark:0},n:pick(['ป๊อปปี้','ถั่วแดง','ซาลาเปา','เมฆ','ขนุน','กระดุม','ต้มยำ','พริกไทย']),at:age()}}
function petForm(p){if(p.st<3)return null;const k=Object.keys(p.fd).sort((a,b)=>p.fd[b]-p.fd[a])[0];return PET[p.sp][2][k]}
function petFx(p){if(p.st>=3){const f=petForm(p);return f?f[2]:''}return p.st===2?'luck:.02 fight:.02':'luck:.01'}
function evPet(K){const X=X3(K),p=X.pet;if(!p)return;const sp=PET[p.sp],stN=['ไข่','วัยเด็ก','วัยรุ่น'][p.st];
 C(`${sp[0]} ${E(p.n)} (${sp[1]}${stN?' · '+stN:''})`,`${p.st===0?'ไข่สั่นแรงขึ้นทุกวัน มีเสียงเคาะจากข้างใน':p.st===1?`${E(p.n)}ตัวเท่าแมว วิ่งชนทุกอย่างในห้อง`:`${E(p.n)}โตจนนอนบนเตียงไม่พอแล้ว และเริ่มมีนิสัยของตัวเอง`} · จะเลี้ยงแบบไหน (มีผลกับร่างสุดท้าย)`,Object.keys(DIET).map(k=>O(`${DIET[k][0]} ${DIET[k][1]}`,()=>{p.fd[k]+=2;p.st++;if(p.st>=3){const f=petForm(p);say(`${f[0]} <b>${E(p.n)}วิวัฒนาการเป็น ${f[1]}!</b> — ${fxT(f[2])}`,'myth',true)}else feed(`${sp[0]} ${E(p.n)}โตขึ้นเป็น${['','วัยเด็ก','วัยรุ่น'][p.st]}`);recalcE(K)},'',.25)))}

// =================== 🏰 ฐานของคุณ ===================
const BASE=[null,['🛖','บ้านไม้ท้ายเมือง',500,'heal:.03 inc:10'],['🏡','คฤหาสน์มีสวน',3000,'heal:.05 inc:40 cha:3'],['🏰','ปราสาทบนเนินเขา',15000,'heal:.07 inc:120 rep:10'],['🏙️','เมืองที่ใช้ชื่อคุณ',80000,'heal:.08 inc:400 rep:30']];
window.fanBase=function(){const K=FN();if(!K)return;const X=X3(K),b=X.base,nx=BASE[b+1];
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏰 ฐานของคุณ</h3>${b?`<div class="item" style="font-size:15px">${BASE[b][0]} <b>${BASE[b][1]}</b><div class="tag2">${fxT(BASE[b][3])}${X.pop?` · ประชากร ${fmt(X.pop)}`:''}</div></div>`:'<div class="tag2">ยังไม่มีที่อยู่เป็นของตัวเอง นอนโรงเตี๊ยมมาตลอด</div>'}
 ${nx?`<div class="item">ถัดไป: ${nx[0]} <b>${nx[1]}</b><div class="tag2">${fxT(nx[3])}</div><button class="pbtn" style="width:100%;margin-top:6px" onclick="fanBaseUp()" ${(S.money||0)<nx[2]?'disabled':''}>${b?'ขยาย':'ซื้อ'} · 🪙 ${fmt(nx[2])}</button></div>`:'<div class="tag2">🏙️ คุณสร้างเมืองแล้ว ไม่มีอะไรใหญ่กว่านี้ในทวีป</div>'}`,'fanbase')};
window.fanBaseUp=()=>{const K=FN(),X=X3(K),nx=BASE[X.base+1];if(!nx||(S.money||0)<nx[2])return;S.money-=nx[2];X.base++;if(X.base>=4)X.pop=R(800,2000);recalcE(K);say(`${nx[0]} <b>คุณได้${nx[1]}</b>${X.base===4?' — ป้ายหน้าประตูเมืองสลักชื่อคุณ':''}`,'epic',true);sync();render();fanBase()};
function evBase(K){const X=X3(K),b=X.base;const L=[
 [1,()=>C('🛖 ขโมยขึ้นบ้าน','กลางดึกมีเสียงคนงัดหน้าต่างบ้านไม้ของคุณ',[O('⚔️ จับขโมย',()=>{feed(rnd()<.6?'⚔️ ขโมยคือเด็กหิวโซ คุณให้ขนมปังแล้วปล่อยไป เด็กกลับมาช่วยงานบ้านทุกวัน':'⚔️ ขโมยหนีไปพร้อมรองเท้าคุณ')}),O('😴 นอนต่อ',()=>feed('😴 เช้ามาเงินหายไปบางส่วน'+money(-100)))])],
 [2,()=>C('🏡 ขุนนางมาเยือน','ขุนนางท้องถิ่นแวะมาที่คฤหาสน์ "ข้าอยากซื้อบ้านหลังนี้ ราคาสามเท่า"',[O('💰 ขาย',()=>{X.base=1;recalcE(K);feed('💰 ได้เงินมหาศาล ย้ายกลับไปบ้านไม้'+money(9000))}),O('🍵 เลี้ยงน้ำชาแล้วปฏิเสธ',()=>feed('🍵 ขุนนางยิ้มแข็ง แล้วกลายเป็นเพื่อนบ้านที่คอยจับผิด'+rep(2)))])],
 [3,()=>C('🏰 ผู้อพยพหน้าประตูปราสาท',`ผู้อพยพสองร้อยคนจาก${pick(['สงครามทางเหนือ','หมู่บ้านที่มังกรเผา','เมืองที่ถูกน้ำท่วม'])}มาขอที่พัก`,[O('🚪 เปิดประตู',()=>{X.pop=(X.pop|0)+200;feed('🚪 ปราสาทของคุณกลายเป็นหมู่บ้านเล็กๆ'+rep(10)+money(-500))}),O('🛡️ ปิดประตู',()=>feed('🛡️ คืนนั้นคุณได้ยินเสียงเด็กร้องไห้นอกกำแพง'+dark(8)))])],
 [3,()=>C('⚔️ ล้อมปราสาท',`${pick(['ดยุกข้างเคียง','กองทัพโจรภูเขา','อดีตเพื่อนร่วมปาร์ตี้ที่ทรยศ'])}ยกทัพมาล้อมปราสาทของคุณ`,[O('🏹 ตั้งรับ',()=>mgDuel('ตั้งรับบนกำแพงปราสาท','แม่ทัพศัตรู',sc=>feed(sc>=.6?'🏹 ศัตรูถอยทัพ คุณได้ของจากค่ายร้าง'+lootDrop(K,3,'ค่ายศัตรู')+rep(10):'🏹 กำแพงพังไปด้านหนึ่ง'+money(-2000)))),O('💰 จ่ายค่าไถ่',()=>feed('💰 ศัตรูถอยไปพร้อมเงินคุณ'+money(-3000)))])],
 [4,()=>C('🏙️ สภาเมืองประชุม','ชาวเมืองขอให้คุณตัดสินเรื่องใหญ่: สร้างกำแพงเพิ่ม หรือสร้างโรงเรียนให้เด็กทุกคน',[O('🧱 กำแพง',()=>{K.save=(K.save|0)+1;feed('🧱 เมืองปลอดภัยขึ้น · รอดตาย +1')}),O('🏫 โรงเรียน',()=>{X.pop=Math.round((X.pop|0)*1.3);feed('🏫 สิบปีต่อมา เด็กในเมืองคุณกลายเป็นจอมเวทครึ่งแคว้น'+rep(20))})])]].filter(x=>x[0]<=b);if(L.length)pick(L)[1]()}

// =================== 💞 ความรักเต็มระบบ ===================
const LOVEP=[['นักดาบรับจ้างที่ช่วยคุณจากโจร','mgDuel'],['บรรณารักษ์ที่ชอบหนังสือเล่มเดียวกับคุณ','mgRune'],['ลูกสาว/ลูกชายเจ้าของโรงเตี๊ยม','mgPotion'],['นักบวชฝึกหัดที่หัวเราะเสียงดังเกินไป','mgRead'],['นักเต้นในคณะละครเร่','mgDance'],['เอลฟ์ที่อายุมากกว่าคุณสามร้อยปี','mgRead']];
function loveMg(kind,t,who,cb){const F={mgDuel:()=>mgDuel(t,who,cb),mgRune:()=>mgRune(t,4,cb),mgPotion:()=>mgPotion(t,3,cb),mgRead:()=>mgRead(t,who,cb),mgDance:()=>mgDance(t,who,cb)};(F[kind]||F.mgRead)()}
function evLove2(K){const X=X3(K);if(!X.love){if(S.spouse)return;const g=S.gender==='หญิง'?'m':'f',p=pick(LOVEP);X.love={n:nm(g),d:p[0],mg:p[1],st:0,h:R(10,30)};}
 const L=X.love,nn=E(L.n);
 if(L.st===0)return C('💞 คนที่ทำให้ใจเต้น',`<b>${nn}</b> ${L.d} ชวนคุณไปเดินเล่นในงานเทศกาลโคมลอย`,[O('💞 ไปเดท',()=>loveMg(L.mg,`เดทแรกกับ${L.n}`,L.n,sc=>{L.h+=Math.round(sc*35);L.st=1;feed(`💞 เดทแรก: ${grade(sc)} · ใจเขา ${L.h}/100${sc>.7?' — เขาหัวเราะจนโคมลอยของเขาลอยหลุดมือ':''}`)}),'มินิเกม',.6),O('🙅 ยังไม่พร้อม',()=>{X.love=null;feed('🙅 คุณปฏิเสธอย่างสุภาพ')},'',.4)]);
 if(L.st===1){const rv=nm(S.gender==='หญิง'?'f':'m');return C('💔 คู่แข่งหัวใจ',`${E(rv)} ${pick(['อัศวินหล่อที่สุดในแคว้น','ทายาทพ่อค้ารวยที่สุด','จอมเวทอัจฉริยะ'])} ก็ชอบ${nn}เหมือนกัน และเพิ่งท้าคุณต่อหน้าทุกคน`,[O('⚔️ ดวลเพื่อความรัก',()=>mgDuel('ดวลชิงหัวใจ',rv,sc=>{L.h+=sc>=.6?20:-10;L.st=2;feed(sc>=.6?`⚔️ คุณชนะ ${nn}วิ่งมาหาคุณก่อนใคร`:`⚔️ คุณแพ้ แต่${nn}ยังมาทำแผลให้`)}),'มินิเกม',.4),O('💌 เขียนจดหมายบอกความรู้สึก',()=>{L.h+=R(10,25);L.st=2;feed(`💌 ${nn}เก็บจดหมายไว้ในกระเป๋าเสื้อด้านซ้าย`)},'',.4),O('🚶 ถอยให้',()=>{X.love=null;feed('🚶 คุณถอยออกมา งานแต่งของสองคนนั้นจัดในฤดูใบไม้ผลิ')},'',.2)])}
 if(L.st===2)return C(`💍 ${nn}`,`ใจเขา ${L.h}/100 · ใต้ต้นไม้ที่คุณเจอกันครั้งแรก`,[O('💍 ขอแต่งงาน',()=>{if(L.h>=55||rnd()<L.h/100){S.spouse=L.n;try{S.sp=mkLover(L.n,'คู่ชีวิตจากต่างโลก',{wed:true,age:S.age})}catch(e){}L.st=3;say(`💍 <b>${nn}ตอบตกลง</b> ${pick(['งานแต่งจัดในป่าเอลฟ์ มีหิ่งห้อยเป็นแขก','ปาร์ตี้ของคุณเมากันทั้งคืน','ราชาส่งของขวัญมาแต่ไม่มีใครเชิญ'])}`,'epic',true)}else{L.st=1;feed(`💍 ${nn}ขอเวลาคิด… ใจเขายังไม่พร้อม`)}},'',.6),O('⏳ รออีกหน่อย',()=>feed('⏳ คุณรอ'),'',.4)]);
 if(L.st===3&&!(S.kids>0)&&rnd()<.6){S.kids=(S.kids|0)+1;const kid=nm(rnd()<.5?'m':'f').split(' ')[0];L.kid=kid;say(`👶 <b>${E(kid)}</b> ลูกคนแรกของคุณกับ${nn}เกิดในคืนที่${pick(['ดาวตกสองดวง','หิมะแรกตก','ดอกไม้ทั้งสวนบาน'])} — ทายาทที่ทวีปจะจำได้`,'epic',true);L.st=4}}

// =================== 🌀 เหตุการณ์หักมุม (ชีวิตละไม่กี่ครั้ง) ===================
const TWIST={
 swap:K=>C('🔄 ตื่นมาในร่างคู่ปรับ',`เช้านี้คุณตื่นในร่างของ${N(K,'rival')} และเขาตื่นในร่างคุณ ทั้งคู่มีเวลาหนึ่งปี`,[O('😈 ใช้ร่างเขาทำลายชื่อเสียงเขา',()=>{aff(K,'rival',-30);feed('😈 หนึ่งปีต่อมา ทั้งเมืองคิดว่าเขาบ้า'+dark(10)+rep(3))},'',.3),O('🤝 ใช้โอกาสนี้เข้าใจเขา',()=>{aff(K,'rival',40);mem(K,'rival','เคยอยู่ในร่างกันและกัน');feed('🤝 คุณเห็นชีวิตที่เขาซ่อน ตอนสลับกลับ เขาพูดคำแรกว่า "ขอบใจ"')},'',.5),O('🏋️ ฝึกด้วยร่างที่แข็งแรงกว่า',()=>{K.pw+=capOf(K)*.15;feed('🏋️ ร่างคุณจำท่าของเขาได้หลังสลับกลับ')},'',.2)]),
 loop:K=>C('🔁 ปีเดิมวนซ้ำ',`คุณตื่นมาในเช้าวันปีใหม่ ทั้งที่เพิ่งผ่านมาแล้ว ทุกอย่างซ้ำเหมือนเดิม คำพูด เหตุการณ์ และคนที่จะตายตอนเที่ยงคืนวันส่งท้ายปี`,[O('🔁 ใช้ความรู้จากรอบก่อนรวยทางลัด',()=>feed('🔁 คุณรู้ว่าม้าตัวไหนชนะ หุ้นเหมืองไหนขึ้น'+money(R(1500,3000))),'',.4),O('🫂 ช่วยคนที่จะตาย',()=>mgRune('จำลำดับเหตุการณ์ที่ต้องเปลี่ยน',6,sc=>feed(sc>.6?'🫂 รอบที่สาม คุณช่วยเขาได้ ลูปหยุดลง'+rep(10)+(K.clue<3?clue(K,'เวลาในโลกนี้วนได้'):''):'🫂 คุณช่วยไม่ทัน ลูปหยุดเอง และคุณจำทุกรอบได้'+dark(5))),'มินิเกม',.6)]),
 slime:K=>C('🟢 กลายเป็นสไลม์หนึ่งปี',`คำสาปของแม่มดทำให้คุณกลายเป็นสไลม์สีเขียวขนาดเท่าหมอน`,[O('🟢 ใช้ชีวิตแบบสไลม์',()=>{K.mpM+=15;feed('🟢 คุณกินกุญแจ ดาบ และหนังสือหนึ่งเล่ม ตอนกลับร่าง คุณจำทุกอย่างในหนังสือได้ · มานาสูงสุด +15')},'',.5),O('🧪 หาทางแก้คำสาป',()=>mgPotion('ปรุงยาแก้คำสาปด้วยร่างสไลม์',3,sc=>feed(sc>.6?'🧪 กลับร่างในหนึ่งเดือน':'🧪 ยาผิดสูตร คุณกลายเป็นสไลม์สีม่วงแทนอีกครึ่งปี')),'มินิเกม',.5)]),
 skip:K=>{S.age+=R(6,10);K.mpM+=20;C('⏩ ตื่นมาในอีกหลายปีข้างหน้า',`คุณหลับไปหลังดื่มชาของคนแปลกหน้า ตื่นมาอีกทีคือ <b>อายุ ${S.age}</b> ทุกอย่างเปลี่ยนไป · พลังเวทในตัวสะสมระหว่างหลับ`,[O('📰 อ่านข่าวที่พลาดไป',()=>feed(`📰 ระหว่างที่หลับ: ${pick(['ราชาเปลี่ยนไปแล้วสององค์','เพื่อนร่วมปาร์ตี้ตามหาคุณจนเลิก','คนที่คุณรักแต่งงานไปแล้ว','ทั้งเมืองคิดว่าคุณตายและสร้างรูปปั้นให้'])}`),'',1)])},
 amnesia:K=>C('🌫️ ตื่นมาจำอะไรไม่ได้',`คุณตื่นในหมู่บ้านที่ไม่รู้จัก จำชื่อตัวเองไม่ได้ ชาวบ้านเรียกคุณว่า "คนจากทะเล"`,[O('🏡 ใช้ชีวิตใหม่ในหมู่บ้าน',()=>{heal(1);S.karma=(+S.karma||0)+10;feed('🏡 สองปีที่สงบที่สุดในชีวิต ก่อนความทรงจำจะกลับมาในวันฝนตก')},'',.5),O('🔍 ตามหาตัวเอง',()=>feed('🔍 คุณเจอประกาศจับที่มีหน้าตัวเองติดอยู่ทุกเมือง… หรือเปล่า?'+(K.clue<3&&rnd()<.4?clue(K,'มีคนลบความทรงจำคุณโดยตั้งใจ'):'')),'',.5)])};

// =================== ♾️ ทวีปจำชาติก่อน · หอจดหมายเหตุ ===================
const WCH={peace:['🕊️','ปีศาจเดินในเมืองหลวงได้อย่างเปิดเผย เพราะสันติภาพที่ใครบางคนสร้างไว้เมื่อชาติก่อน'],tyrant:['😈','ทวีปถูกปกครองด้วยเงามืดของผู้ปกครองคนก่อน… ซึ่งก็คือคุณในชาติที่แล้ว'],cafe:['🍜','ร้านเล็กๆ ที่คุณเปิดไว้ชาติก่อนกลายเป็นตำนาน คนต่อแถวตั้งแต่ตีห้า'],rep:['📰','หนังสือพิมพ์ที่คุณเริ่มไว้ทำให้ราชวงศ์ต้องฟังเสียงประชาชน'],gods:['⬜','วิหารครึ่งทวีปร้างเปล่า หลังเรื่องที่คุณทำกับเทพเมื่อชาติก่อน'],grave:['🪦','มีหลุมศพหนึ่งที่ไม่มีใครรู้ว่าของใคร แต่มีดอกไม้สดวางทุกวัน'],gone:['🚪','วงเวทอัญเชิญเก่ายังเปิดค้างจากวันที่ผู้กล้าคนก่อนกลับบ้าน'],legend:['🗿','รูปปั้นของคุณจากชาติก่อนตั้งอยู่กลางจัตุรัสเมืองหลวง']};
const wchOf=k=>/peace|abyss|bridge|alliance/.test(k)?'peace':/throne|newking|revenge|shadow|lich|godrule|^god$/.test(k)?'tyrant':/quiet|cafe|hedge/.test(k)?'cafe':/press/.test(k)?'rep':/^god/.test(k)?'gods':/home|bring/.test(k)?'gone':/betray|exec|eaten|maze|mask/.test(k)?'grave':k?'legend':null;
const archG=()=>{try{return LS.get('murim_fanarch',{lives:0,last:null})||{lives:0,last:null}}catch(e){return{lives:0,last:null}}};
const endN=()=>{try{return Object.keys(LS.get('murim_fanend',{})||{}).length}catch(e){return 0}};
function archRec(K){if(K.archR)return;K.archR=1;try{const A=archG(),X=X3(K);A.lives=(A.lives|0)+1;const g=['w','a','c'].map(s=>X.gear[s]).filter(Boolean).sort((a,b)=>b.t-a.t)[0];
 A.last={n:S.name,w:K.w,k:K.end||'',age:Math.max(age(),X.la|0),kid:X.love&&X.love.kid?X.love.kid:null,sp:S.spouse||null,g:g?{n:gName(g),t:g.t}:null,pet:X.pet&&X.pet.st>=3?petForm(X.pet)[1]:null,pt:X.party.filter(p=>p.alive).map(p=>p.n),cls:X.cls?CLS[X.cls.k][1]:null,base:X.base,bk:Object.keys(X.bk).length};LS.set('murim_fanarch',A)}catch(e){console.error('arch',e)}}
const PERK=[[3,'🎁','อาวุธจากหลุมศพชาติก่อน (ของหายากติดตัว)'],[6,'🥚','ไข่สัตว์อสูรติดตัวตั้งแต่เกิด'],[10,'🫂','เพื่อนร่วมทางที่ตามหาคุณมาตั้งแต่เกิด'],[15,'🪽','รอดตาย +1 จากความทรงจำชาติก่อน'],[20,'🌟','อาวุธในตำนานรอคุณอยู่']];
window.fanArch=function(){const A=archG(),n=endN(),L=A.last;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📚 หอจดหมายเหตุทวีป</h3><p class="tag2">ทวีปจำทุกชีวิตของคุณ · เกิดมาแล้ว ${A.lives|0} ชีวิต · ฉากจบที่เคยเห็น ${n}</p>
 ${L?`<div class="item"><b>ชีวิตล่าสุด: ${E(L.n)}</b> <span class="tag2">${WD[L.w]?WD[L.w].ic+' '+WD[L.w].n:''} · อายุ ${L.age}</span><div class="tag2">${L.k&&ENDS[L.w]&&ENDS[L.w][L.k]?'ฉากจบ: '+ENDS[L.w][L.k][0]+' '+ENDS[L.w][L.k][1]:'จากไปโดยไม่มีใครจดชื่อฉากจบ'}${L.cls?' · '+L.cls:''}${L.bk?` · ล้มบอส ${L.bk}`:''}${L.kid?` · ทายาท ${E(L.kid)}`:''}${L.pet?` · ${E(L.pet)}`:''}</div>${wchOf(L.k)?`<div class="tag2" style="margin-top:4px">${WCH[wchOf(L.k)][0]} ผลต่อชีวิตถัดไป: ${WCH[wchOf(L.k)][1]}</div>`:''}</div>`:'<div class="tag2">ยังไม่มีบันทึก</div>'}
 <h4 style="margin:8px 0 4px">ของขวัญจากชาติก่อน (ปลดตามจำนวนฉากจบ)</h4>${PERK.map(p=>`<div class="item" style="${n>=p[0]?'':'opacity:.5'}">${n>=p[0]?p[1]:'🔒'} <b>${p[2]}</b> <span class="tag2">ฉากจบ ${p[0]}</span></div>`).join('')}`,'fanarch')};
function legacyBirth(K){const X=X3(K),A=archG(),n=endN(),L=A.last;X.wf={};
 if(L){const c=wchOf(L.k);if(c){X.wf[c]=1;say(`${WCH[c][0]} <b>ทวีปยังจำ</b> — ${WCH[c][1]}`,'myth')}if(L.kid)X.heir={n:L.kid,p:L.n,g:L.g,sp:L.sp};if(L.pt&&L.pt.length)X.oldPt=L.pt}
 if(n>=3)feed('🎁 ของขวัญชาติก่อน'+lootDrop(K,2,'หลุมศพชาติก่อน'));
 if(n>=6&&!X.pet){X.pet=newPet(pick(Object.keys(PET)));feed(`🥚 คุณเกิดมาพร้อมไข่${PET[X.pet.sp][1]}ในเปล`)}
 if(n>=10){const c=mkComp();c.b=55;c.sec='จำคุณได้จากชาติก่อน';X.party.push(c);feed(`🫂 <b>${E(c.n)}</b> (${PCL[c.c][1]}) ตามหาคุณมาตั้งแต่วันเกิด "ชาตินี้ฉันจะไม่ปล่อยมือ"`)}
 if(n>=15)K.save=(K.save|0)+1;if(n>=20)feed('🌟'+lootDrop(K,4,'คำสัญญาจากชาติก่อน'));
 for(const r in REG)X.rs[r]=pick(RST)[0];if(X.wf.peace)X.rs.abyss='fest';if(X.wf.tyrant)X.rs.cap='war';recalcE(K)}
function evHeir(K){const X=X3(K),h=X.heir;X.heirMet=1;
 C('👴 ทายาทจากชาติก่อน',`ชายชราคนหนึ่งจ้องหน้าคุณนาน แล้วพูดว่า "ข้าชื่อ <b>${E(h.n)}</b> พ่อแม่ข้าคือ ${E(h.p)}${h.sp?' กับ '+E(h.sp):''}… ทำไมหน้าเจ้าเหมือนท่านนัก"`,[
  O('🫂 บอกความจริง',()=>{feed(`🫂 ${E(h.n)}ร้องไห้ แล้วมอบของที่ตกทอดในตระกูล${h.g?` <b>${E(h.g.n)}</b>`:''}`+lootDrop(K,Math.max(2,h.g?h.g.t:2),'มรดกตระกูล')+rep(5));K.save=(K.save|0)+(rnd()<.3?1:0)},'',.6),
  O('🙂 แค่บังเอิญหน้าเหมือน',()=>feed(`🙂 ${E(h.n)}พยักหน้าช้าๆ "งั้นสินะ" แล้วแอบเอาเงินใส่กระเป๋าคุณก่อนเดินจากไป${money(300)}`),'',.4)])}
function evLegacy(K){const X=X3(K),f=X.wf||{};X.lgD=1;
 if(f.tyrant)return C('😈 ทรราชในตำนาน','ทุกบ้านมีรูปวาดทรราชที่ปกครองทวีปเมื่อร้อยปีก่อน หน้าเหมือนคุณทุกกระเบียดนิ้ว ทหารเริ่มจับตาคุณ',[O('🗡️ ล้างชื่อทรราช (ช่วยกลุ่มกบฏ)',()=>duel('องครักษ์ของระบอบเก่า',Math.round(threat(K)*1.15),w=>feed(w?'🗡️ คุณทำลายรูปปั้นทรราชด้วยมือตัวเอง ทั้งเมืองโห่ร้อง'+rep(15):'🗡️ กบฏแตกพ่าย'+hurt(.3))),'ต่อสู้',.5),O('👑 ใช้ใบหน้านี้ให้เป็นประโยชน์',()=>feed('👑 คนแก่ในเมืองคุกเข่าให้คุณโดยไม่รู้ตัว'+dark(10)+money(500)),'',.5)]);
 if(f.peace)return C('🕊️ ปีศาจข้างบ้าน','ครอบครัวปีศาจย้ายมาอยู่ข้างบ้าน ลูกสาวปีศาจตัวน้อยถือขนมมาฝาก "แม่บอกว่าผู้กล้าคนก่อนทำให้เราได้อยู่ที่นี่"',[O('🍪 รับขนม',()=>{feed('🍪 ขนมรสกำมะถันนิดๆ แต่อร่อย'+rep(3));if(rnd()<.5)feed(lootDrop(K,2,'ครอบครัวปีศาจ'))}),O('😐 ปิดประตู',()=>feed('😐 คืนนั้นคุณนอนไม่หลับ'))]);
 if(f.cafe)return C('🍜 ร้านในตำนาน','ร้านอาหารที่คุณเปิดไว้เมื่อชาติก่อนยังอยู่ เจ้าของรุ่นที่ห้าไม่รู้ว่าสูตรลับเขียนด้วยภาษาไทย',[O('📜 แปลสูตรให้',()=>feed('📜 เจ้าของร้านให้คุณกินฟรีตลอดชีวิต'+money(200)+rep(5))),O('🤫 แอบจดสูตรไปเปิดร้านเอง',()=>feed('🤫 ร้านของคุณขายดีกว่า'+money(800)+dark(5)))]);
 if(f.gods)return C('⬜ วิหารร้าง','นักบวชคนสุดท้ายในวิหารร้างบอกว่าเทพหายไปตั้งแต่ร้อยปีก่อน แต่ยังมีเสียงกระซิบจากแท่นบูชาทุกคืน',[O('👂 ฟังเสียงกระซิบ',()=>feed(K.clue<3?clue(K,'เทพยังเฝ้ามองผ่านช่องว่างในแท่นบูชา'):'👂 เสียงนั้นเรียกชื่อคุณ… ชื่อชาติก่อน')),O('🔨 ทุบแท่นบูชาทิ้ง',()=>feed('🔨 ความเงียบแท้จริงครั้งแรกในรอบร้อยปี'+pw(capOf(K)*.05)))]);
 if(f.grave)return C('🪦 หลุมศพไร้ชื่อ','คุณรู้สึกเหมือนถูกดึงไปที่หลุมศพเก่าบนเนินเขา ดอกไม้สดวางอยู่ข้างแผ่นป้ายที่ลบชื่อออก',[O('⛏️ ขุด',()=>feed('⛏️ ในโลงมีแค่อาวุธเก่ากับจดหมายถึง "ตัวข้าในชาติหน้า"'+lootDrop(K,3,'หลุมศพตัวเอง')+dark(4))),O('💐 วางดอกไม้เพิ่ม',()=>{S.karma=(+S.karma||0)+5;feed('💐 คนที่วางดอกไม้ทุกวันเดินมาพอดี เขาร้องไห้ทันทีที่เห็นหน้าคุณ')})]);
 if(f.legend)return C('🗿 รูปปั้นของตัวเอง','คุณยืนดูรูปปั้นตัวเองกลางจัตุรัส ไกด์นำเที่ยวเล่าเรื่องชาติก่อนของคุณผิดไปครึ่งหนึ่ง',[O('✋ แก้ให้ถูก',()=>feed('✋ ไม่มีใครเชื่อคุณ แต่ไกด์จ้างคุณเป็นผู้ช่วย'+money(150))),O('😏 ปล่อยไป',()=>feed('😏 ตำนานที่ผิดเพี้ยนสนุกกว่าความจริง'))]);
 if(f.gone)return C('🚪 ประตูที่เปิดค้าง','วงเวทอัญเชิญเก่าที่ผู้กล้าคนก่อนใช้กลับบ้านยังเรืองแสงจางๆ ผ่านมันคุณเห็นแวบหนึ่งของถนนในกรุงเทพฯ',[O('👀 มองผ่านประตู',()=>feed('👀 คุณเห็นตัวเองในชาติก่อน กำลังข้ามถนน'+(K.clue<3?clue(K,'วงเวทอัญเชิญยังเชื่อมกับโลกเดิม'):''))),O('🧱 ปิดผนึก',()=>feed('🧱 ผนึกสำเร็จ ไม่มีใครถูกลักพาจากโลกเดิมอีก'+rep(8)))]);
 if(f.rep)return C('📰 สภาประชาชน','หนังสือพิมพ์ที่ชาติก่อนคุณเริ่มไว้ ตอนนี้กลายเป็นสภาประชาชน เขาเชิญคุณลงสมัคร',[O('🗳️ ลงสมัคร',()=>mgRead('ปราศรัยหาเสียง','ฝูงชน',sc=>feed(sc>.55?'🗳️ ได้รับเลือก!'+rep(15)+money(300):'🗳️ แพ้เลือกตั้ง แต่ได้เพื่อนเยอะ'+rep(3))),'มินิเกม'),O('📝 เป็นนักข่าวแทน',()=>feed('📝 ข่าวแรกของคุณทำให้ขุนนางสามคนลาออก'+rep(6)))])}
// เหตุไข่สัตว์ (ถ้ายังไม่มี)
function evEgg(K){const X=X3(K);if(X.pet)return;const sp=pick(Object.keys(PET));C(`🥚 ไข่ประหลาด`,`คุณเจอไข่${pick(['อุ่นๆ ในรังที่ถูกทิ้ง','ที่ลอยมาตามแม่น้ำ','ในหีบสมบัติเก่า','ที่พ่อค้าเร่ขายราคาถูกผิดปกติ'])} ข้างในมีบางอย่างเต้นเหมือนหัวใจ`,[O('🫶 เก็บไว้เลี้ยง',()=>{X.pet=newPet(sp);feed(`🥚 คุณตั้งชื่อไข่ว่า <b>${E(X.pet.n)}</b> (ยังไม่รู้ว่าจะฟักเป็นอะไร)`);recalcE(K)},'',.7),O('🍳 ทอดกิน',()=>{heal(.5);feed('🍳 อร่อยที่สุดในชีวิต และคุณจะไม่มีวันรู้ว่าเสียอะไรไป')},'',.3)])}

// =================== hooks ===================
{const _rc=recalcE;recalcE=function(K){const o=_rc(K);try{const sv=Math.round(o.save||0);K.save=Math.max(0,(K.save|0)+sv-(K.svAdd|0));K.svAdd=sv;const ch=Math.round(o.cha||0);S.cha=Math.max(1,(S.cha|0)+ch-(K.chAdd|0));K.chAdd=ch}catch(e){}return o}}
FOK.hero.splice(4,0,['fa_travel','🗺️','ท่องทวีป'],['fa_job2','🎓','ฝึกอาชีพ',K=>!!X3(K).cls]);
FOK.trash.splice(4,0,['fa_travel','🗺️','ท่องทวีป'],['fa_job2','🎓','ฝึกอาชีพ',K=>!!X3(K).cls]);
FOK.magic.splice(7,0,['fa_travel','🗺️','ท่องทวีป',K=>!school(K)],['fa_job2','🎓','ฝึกอาชีพ',K=>!!X3(K).cls]);
FOK.noble.splice(5,0,['fa_travel','🗺️','ท่องทวีป',K=>!school(K)],['fa_job2','🎓','ฝึกอาชีพ',K=>!!X3(K).cls]);
{const _df=doFocus;doFocus=function(K){const f=S.focus;
 if(f==='fa_travel'){const X=X3(K);if(rnd()<.45)queue(()=>evTravel(K));else{const mm=meetMon(K,X.reg);feed(`🗺️ เดินทางรอบ${REG[X.reg][1]}${mm.t}${rnd()<.3?lootDrop(K,R(0,2),'ระหว่างทาง'):''}`)}return}
 if(f==='fa_job2'){const X=X3(K);feed(`🎓 ฝึก${CLS[X.cls.k][1]}${pick(['จนดึกดื่น','กับอาจารย์ใจร้าย','กับเพื่อนร่วมสมาคม'])}${clsXp(K,R(18,30))}${K.pw<capOf(K)?pw((capOf(K)-K.pw)*.1):''}`);return}
 _df(K);try{if(f==='fa_hunt'||f==='fa_guild'){const X=X3(K);clsXp(K,8);if(rnd()<.35){const mm=meetMon(K,X.reg);if(mm.t)feed(mm.t.replace(/^ · /,''))}if(rnd()<.2)feed(lootDrop(K,R(0,2),'มอนสเตอร์').replace(/^ · /,''))}else if(X3(K).cls&&f!=='fa_rest')clsXp(K,3)}catch(e){}}}
{const _au=autoFocus;autoFocus=function(){_au.apply(this,arguments);try{if(on()&&S.focus!=='fa_rest'){const K=FN(),L=fList(K).map(f=>f[0]);if(L.includes('fa_travel')&&rnd()<.15)S.focus='fa_travel';else if(L.includes('fa_job2')&&rnd()<.15)S.focus='fa_job2'}}catch(e){}}}
{const _md=mgDungeon;mgDungeon=function(t,m,cb){return _md(t,m,sc=>{cb(sc);try{if(on()&&DUN.fl>=2&&rnd()<.55)feed('🗝️ ในห้องลับของดันเจี้ยน'+lootDrop(FN(),Math.min(4,1+(DUN.fl>>1)),'ดันเจี้ยน'))}catch(e){}})}}
evLove=function(K){try{return evLove2(K)}catch(e){console.error('love2',e)}};
{const _fy=fanYear;fanYear=function(){const K=FN();if(K)X3(K);const a0=S.age;_fy.apply(this,arguments);if(!K)return;if(!S.alive){archRec(K);return}if(S.age===a0||K.end)return;
 try{const X=X3(K),cand=[],add=f=>cand.push(f),sc=school(K),y=age();X.la=y;regTick(K);
  if(X.heir&&!X.heirMet&&y>=14)add(()=>evHeir(K));
  if(X.wf&&!X.lgD&&y>=12&&rnd()<.35)add(()=>evLegacy(K));
  if(!X.cls&&!X.clsAsk&&y>=(isAca(K)?17:16))add(()=>evClass(K));
  if(X.pet&&X.pet.st<3&&y-X.pet.at>=1&&rnd()<.55)add(()=>evPet(K));
  if(X.love&&X.love.st===3)add(()=>evLove2(K));
  {const tk=Object.keys(TWIST).filter(k=>!X.tw[k]);if(tk.length&&y>=15&&Object.keys(X.tw).length<2&&rnd()<.03){const k=pick(tk);add(()=>{X.tw[k]=1;TWIST[k](K)})}}
  if(!sc&&y>=17&&BOSS[X.reg]&&!X.bk[X.reg]&&rnd()<.14)add(()=>evBoss(K));
  if(!sc&&y>=16&&X.party.filter(p=>p.alive).length<3&&rnd()<.2)add(()=>evRecruit(K));
  if(X.party.some(p=>p.alive)&&rnd()<.3)add(()=>evParty(K));
  if(!sc&&y>=15&&rnd()<.3)add(()=>evRegion(K));
  if(X.base&&rnd()<.18)add(()=>evBase(K));
  if(!X.pet&&y>=10&&rnd()<.05)add(()=>evEgg(K));
  if(cand.length&&QU.length<=1)queue(cand[0]);
  if(age()%10===0&&!X.shopTip&&!sc&&(S.money||0)>500){X.shopTip=1;feed('🛒 ข่าว: ร้านค้าในเมืองเปลี่ยนสินค้าทุกปี · เปิดเมนู → 🛒 ร้านค้า')}
  recalcE(K);sync();try{render()}catch(e){}if(QU.length)flush()}catch(e){console.error('fan p4',e)}}}
{const _cd=checkDeath;checkDeath=function(){const r=_cd.apply(this,arguments);try{if(!S.alive){const K=FN();if(K)archRec(K)}}catch(e){}return r}}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(K&&!K.x3lg){K.x3lg=1;legacyBirth(K);sync();render();saveGame()}}catch(e){console.error('legacy',e)}},1100)}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('[data-fa4]')){const K=FN(),X=X3(K),d=document.createElement('div');d.style.cssText='grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:8px';d.setAttribute('data-fa4',1);
 d.innerHTML=`<button class="opt" onclick="fanInv()">🎒 อุปกรณ์<small>${X.inv.length} ชิ้นในกระเป๋า</small></button><button class="opt" onclick="fanShop()">🛒 ร้านค้า<small>สินค้าเปลี่ยนทุกปี</small></button><button class="opt" onclick="fanMap()">🗺️ แผนที่<small>${REG[X.reg][1]}</small></button><button class="opt" onclick="fanBest()">📖 สมุดมอนสเตอร์<small>ติดตัวทุกชีวิต</small></button><button class="opt" onclick="fanParty()">🫂 ปาร์ตี้<small>${X.party.filter(p=>p.alive).length}/3 คน</small></button><button class="opt" onclick="fanBase()">🏰 ฐาน<small>${X.base?BASE[X.base][1]:'ยังไม่มี'}</small></button>${X.pet?`<button class="opt" onclick="fanPet()">🐲 สัตว์คู่ใจ<small>${E(X.pet.n)}</small></button>`:''}<button class="opt" onclick="fanArch()">📚 หอจดหมายเหตุ<small>ชาติก่อน · ของขวัญ</small></button>`;const a=gd.querySelector('[data-fa]');if(a)a.after(d);else gd.prepend(d)}}}catch(e){console.error(e)}return r}}
window.fanMap=function(){const K=FN();if(!K)return;const X=X3(K);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🗺️ ทวีป</h3><p class="tag2">สถานการณ์เปลี่ยนทุกปี · เลือกโฟกัส 🗺️ ท่องทวีป เพื่อเดินทาง${X.cls?` · ${CLS[X.cls.k][0]} ${CLS[X.cls.k][1]} Lv${X.cls.lv}`:''}</p>${Object.keys(REG).map(r=>{const s=rsN(X.rs[r]),b=BOSS[r];return`<div class="item" style="${r===X.reg?'border-color:var(--fa,#c39bff)':''}"><b>${REG[r][0]} ${REG[r][1]}</b>${r===X.reg?' <span class="tag2">📍 อยู่ที่นี่</span>':''} <span class="tag2">${s[1]} ${s[2]}</span><div class="tag2">${REG[r][2]} · บอส: ${X.bk[r]?'✅ '+b[1]:'❔ ???'}</div></div>`}).join('')}${X.titles.length?`<div class="tag2" style="margin-top:6px">🏅 ฉายา: ${X.titles.map(E).join(' · ')}</div>`:''}`,'fanmap')};
window.fanPet=function(){const K=FN();if(!K)return;const X=X3(K),p=X.pet;if(!p)return;const f=petForm(p),sp=PET[p.sp];
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🐲 ${E(p.n)}</h3><div class="item" style="font-size:15px">${f?f[0]+' <b>'+f[1]+'</b>':sp[0]+' '+sp[1]+' · '+['ไข่','วัยเด็ก','วัยรุ่น'][p.st]}<div class="tag2">${fxT(petFx(p))||'ยังไม่มีพลัง'}</div><div class="tag2">การเลี้ยง: ${Object.keys(DIET).map(k=>DIET[k][0]+' '+p.fd[k]).join(' · ')}</div></div>${f?'':'<p class="tag2">ร่างสุดท้ายขึ้นกับวิธีเลี้ยงที่เลือกบ่อยที่สุด มี 16 ร่าง</p>'}`,'fanpet')};
window._fan4={X3,recalcE,lootDrop,meetMon,evTravel,evRegion,evBoss,evClass,evPromo,evRecruit,evParty,evPet,evEgg,evBase,evLove2,evHeir,evLegacy,TWIST,legacyBirth,archRec,clsXp,regTick};
{const _hd=hud;hud=function(K){let h=_hd(K);try{const X=X3(K),c=[];if(X.cls)c.push(`<span class="t4">${CLS[X.cls.k][0]} ${CLS[X.cls.k][1]} Lv${X.cls.lv}</span>`);c.push(`<span>${REG[X.reg][0]} ${({cap:'เมืองหลวง',elf:'ป่าเอลฟ์',desert:'ทะเลทราย',volcano:'ภูเขาไฟ',sky:'เมืองลอยฟ้า',sea:'ทะเลหมอก',north:'แดนเหนือ',abyss:'แดนปีศาจ'})[X.reg]}</span>`);if(X.gear.w)c.push(`<span style="color:${GTC[X.gear.w.t]}">${gName(X.gear.w).slice(0,18)}</span>`);if(X.pet)c.push(`<span>${petForm(X.pet)?petForm(X.pet)[0]:PET[X.pet.sp][0]} ${E(X.pet.n)}</span>`);const pa=X.party.filter(p=>p.alive).length;if(pa)c.push(`<span>🫂 ×${pa}</span>`);if(X.base)c.push(`<span>${BASE[X.base][0]}</span>`);h=h.replace('<div class="fhC">','<div class="fhC">'+c.join(''))}catch(e){}return h}}


// ####################################################################
// ภาค 5: โลกเวทมนตร์ 7 ชะตาพิเศษ (สุ่มตอนเกิด) · มินิเกมใหม่ 4 แบบ
// ####################################################################
const mgWatch=(id,f)=>{const iv=setInterval(()=>{if(!document.getElementById(id)){clearInterval(iv);f()}},600)};
// ---- มินิเกม 9) กดรัว ----
function mgMash(title,cb,N0){cb=mgW(cb,'fight');if(auto)return cb(autoSc());const N=Math.round((N0||26)*.85);let n=0,t0=0,done=0,tm=null;
 const fin=()=>{if(done)return;done=1;clearInterval(tm);setTimeout(()=>{closeM();cb(cl(n/N,0,1))},500)};
 window._fms=()=>{if(done)return;if(!t0){t0=Date.now();tm=setInterval(()=>{const l=5-(Date.now()-t0)/1000,e=document.getElementById('fmsT');if(!e){clearInterval(tm);if(!done){done=1;cb(cl(n/N,0,1))}return}e.textContent=`⏱️ ${Math.max(0,l).toFixed(1)} วิ`;if(l<=0)fin()},100)}n++;const b=document.getElementById('fmsB'),m=document.getElementById('fmsM');if(b)b.style.width=cl(n/N*100,0,100)+'%';if(m){m.style.transform=`scale(${1+Math.min(1.2,n/N)})`;m.textContent=n>=N?'🔥':n>N*.6?'💪':'✊'}try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}};
 modal(`<div class="fmg"><h3>💪 ${title}</h3><div class="tg">กดรัวให้ได้ ${N} ครั้งใน 5 วินาที · เวลาเริ่มนับเมื่อกดครั้งแรก</div><div style="text-align:center;font-size:44px;height:90px;line-height:90px"><span id="fmsM" style="display:inline-block;transition:transform .08s">✊</span></div><div class="fmgT" style="height:14px"><i id="fmsB" style="display:block;height:100%;width:0;background:linear-gradient(90deg,#f39c12,#e74c3c);border-radius:8px"></i></div><div class="fmgLog" id="fmsT">⏱️ 5.0 วิ</div><div class="fmgB"><button onpointerdown="_fms()" style="min-width:200px;font-size:20px;touch-action:manipulation">👊 รัว!</button></div></div>`,'fanmg');mgWatch('fmsM',()=>{if(!done){done=1;clearInterval(tm);cb(cl(n/N,0,1))}})}
// ---- มินิเกม 10) ชาร์จแล้วปล่อยในโซน (3 รอบ) ----
function mgHold(title,cb,zone){cb=mgW(cb,'ring');if(auto)return cb(autoSc());let r=0,sc=0,v=0,on=0,raf=0,done=0,z=null;const nz=()=>{z=zone?zone.slice():(()=>{const a=R(38,68);return[a,a+20-r*2]})()};nz();
 const draw=()=>{const f=document.getElementById('fhF'),zz=document.getElementById('fhZ');if(!f){cancelAnimationFrame(raf);if(!done){done=1;cb(sc/3)}return}if(on){v+=.42+v*.011+r*.1;if(v>=104){on=0;res(0,'💥 เกินพิกัด!')}}f.style.width=Math.min(100,v)+'%';zz.style.left=z[0]+'%';zz.style.width=(z[1]-z[0])+'%';raf=requestAnimationFrame(draw)};
 const res=(s,t)=>{sc+=s;r++;const L=document.getElementById('fhL');if(L)L.innerHTML=`รอบ ${r}/3 · ${t}`;if(r>=3){done=1;cancelAnimationFrame(raf);setTimeout(()=>{closeM();cb(sc/3)},600)}else setTimeout(()=>{v=0;nz()},500)};
 window._fhd=()=>{if(done)return;if(!on){if(v>0)return;on=1;const b=document.getElementById('fhBt');if(b)b.textContent='✋ ปล่อย!';return}on=0;const b=document.getElementById('fhBt');if(b)b.textContent='⚡ เริ่มชาร์จ';const m=(z[0]+z[1])/2,w=(z[1]-z[0])/2,d=Math.abs(v-m);res(d<=w*.45?1:d<=w?.8:d<=w+10?.4:0,d<=w*.45?'เป๊ะ!':d<=w?'ในโซน':d<=w+10?'เฉียด':'พลาด')};
 modal(`<div class="fmg"><h3>⚡ ${title}</h3><div class="tg">กดเริ่มชาร์จ แล้วกดอีกครั้งเพื่อปล่อยในโซนทอง · เกิน 100 = ระเบิด</div><div class="fmgT" style="height:26px;position:relative;overflow:hidden"><div id="fhZ" style="position:absolute;top:0;bottom:0;background:rgba(255,200,60,.45);border:1px solid #ffd54a"></div><i id="fhF" style="position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#5dade2,#a569bd,#e74c3c);opacity:.85"></i></div><div class="fmgLog" id="fhL">รอบ 0/3</div><div class="fmgB"><button id="fhBt" onclick="_fhd()" style="min-width:200px;font-size:18px">⚡ เริ่มชาร์จ</button></div></div>`,'fanmg');draw()}
// ---- มินิเกม 11) ท่าผสมธาตุ (ตอบสนองไว) ----
const STC=[['🔥','ไฟ'],['💧','น้ำ'],['🌪️','ลม'],['🪨','ดิน'],['⚡','สายฟ้า'],['🌑','เงา']];
function mgCombo(title,cb){cb=mgW(cb,'fight');if(auto)return cb(autoSc());let i=0,sc=0,cur=-1,done=0,tm=null,lim=2100;const N=8;
 const next=()=>{clearTimeout(tm);if(i>=N){done=1;setTimeout(()=>{closeM();cb(sc/N)},400);return}cur=R(0,5);const e=document.getElementById('fcbI');if(!e){if(!done){done=1;cb(sc/N)}return}e.textContent=STC[cur][0];e.style.opacity=1;tm=setTimeout(()=>hit(-1),lim)};
 const hit=k=>{if(done||cur<0)return;clearTimeout(tm);const ok=k===cur;if(ok)sc++;i++;lim=Math.max(1150,lim-80);const L=document.getElementById('fcbL'),e=document.getElementById('fcbI');if(L)L.innerHTML=`ท่า ${i}/${N} · ${ok?'✅ เข้า!':k<0?'⌛ ช้าไป':'❌ ผิดธาตุ'}`;if(e)e.style.opacity=.25;cur=-1;setTimeout(next,280)};
 window._fcb=k=>hit(k);
 modal(`<div class="fmg"><h3>🗡️ ${title}</h3><div class="tg">ธาตุโผล่บนดาบ กดปุ่มธาตุเดียวกันให้ทันก่อนหมดเวลา · ยิ่งนานยิ่งเร็ว</div><div style="text-align:center;font-size:56px;height:84px" id="fcbI">🗡️</div><div class="fmgLog" id="fcbL">ท่า 0/${N}</div><div class="fmgB" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${STC.map((s,k)=>`<button onpointerdown="_fcb(${k})" style="font-size:20px;touch-action:manipulation">${s[0]}</button>`).join('')}</div></div>`,'fanmg');setTimeout(next,700)}
// ---- มินิเกม 12) สลับถ้วย ----
function mgCups(title,cb,item){cb=mgW(cb,'read');if(auto)return cb(autoSc());let r=0,sc=0,pos=[0,1,2],tg=0,done=0,lock=1;const IT=item||'💎',X=['8%','40%','72%'];
 const place=()=>{for(let c=0;c<3;c++){const e=document.getElementById('fcu'+c);if(e)e.style.left=X[pos[c]]}};
 const round=()=>{tg=R(0,2);lock=1;const L=document.getElementById('fcuL');for(let c=0;c<3;c++){const e=document.getElementById('fcu'+c);if(e){e.textContent=c===tg?IT:'🎩';e.style.transition='left .3s'}}if(L)L.textContent=`รอบ ${r+1}/2 · จำไว้ว่า ${IT} อยู่ใต้ถ้วยไหน`;
  setTimeout(()=>{for(let c=0;c<3;c++){const e=document.getElementById('fcu'+c);if(e)e.textContent='🎩'}let k=0;const n=5+r*2,sp=r?340:450;const sw=()=>{if(!document.getElementById('fcu0'))return;if(k>=n){lock=0;if(L)L.textContent='เลือกถ้วย!';return}const a=R(0,2);let b=R(0,2);if(b===a)b=(a+1)%3;const ca=pos.indexOf(a),cb2=pos.indexOf(b);pos[ca]=b;pos[cb2]=a;for(let c=0;c<3;c++){const e=document.getElementById('fcu'+c);if(e)e.style.transition=`left ${sp/1000}s`}place();k++;setTimeout(sw,sp+40)};sw()},1100)};
 window._fcu=c=>{if(lock||done)return;lock=1;const ok=c===tg;if(ok)sc++;const e=document.getElementById('fcu'+tg);if(e)e.textContent=IT;const L=document.getElementById('fcuL');if(L)L.textContent=ok?'✅ ถูก!':'❌ ผิดถ้วย';r++;setTimeout(()=>{if(r>=2){done=1;closeM();cb(sc/2)}else round()},900)};
 modal(`<div class="fmg"><h3>🎩 ${title}</h3><div class="tg">จับตาดูของใต้ถ้วยระหว่างสลับ แล้วแตะถ้วยที่ถูก</div><div style="position:relative;height:90px;margin:10px 0">${[0,1,2].map(c=>`<div id="fcu${c}" onclick="_fcu(${c})" style="position:absolute;top:10px;left:${X[c]};width:20%;text-align:center;font-size:46px;cursor:pointer">🎩</div>`).join('')}</div><div class="fmgLog" id="fcuL">...</div></div>`,'fanmg');mgWatch('fcu0',()=>{if(!done){done=1;cb(sc/2)}});setTimeout(round,400)}

// =================== ชะตาพิเศษโลกเวทมนตร์ ===================
const MS=K=>K.mvS||(K.mvS={sn:{},mus:0,sus:0,core:0,cx:0,st:[],own:0,deal:0,rec:0,dist:0,fut:[]});
const mvK=()=>{try{const K=FN();return K&&K.w==='magic'?K.mv:null}catch(e){return null}};
const MVEND=(k,ic,n,d,s)=>{ENDS.magic[k]=[ic,n,d].concat(s?[1]:[])};
// ---------- 💪 ไร้มานา ----------
const MV={};
MV.muscle={ic:'💪',n:'ไร้มานา ใช้กล้ามแทน',p:15,d:'ลูกแก้ววัดมานาไม่เรืองเลยแม้แต่นิดเดียว ในโลกที่คนไร้มานาถูกนับว่าเป็นของเสีย แต่คุณวิดพื้นได้ห้าพันครั้งก่อนอาหารเช้า',
 chip:K=>`💪 กล้าม ${MS(K).mus} · 🫣 ความลับ ${MS(K).sus}%`,
 birth:K=>{K.mpM=0;K.mp=0;K.noMana=1;K.pw+=10;S.maxHp+=40;S.hp=S.maxHp},
 ev:[
 [12,K=>C('🔮 พิธีวัดมานาวันแรก','นักเรียนใหม่เรียงแถววางมือบนลูกแก้วยักษ์ ทุกคนเรืองแสงสีต่างๆ ถึงตาคุณแล้ว…',[
  O('✊ บีบลูกแก้วให้แตก (มินิเกม)',()=>mgMash('บีบลูกแก้ววัดมานาให้แตก',sc=>{const m=MS(K);if(sc>=.7){feed('✊ ลูกแก้วแตกเป็นผุยผง อาจารย์ประกาศว่า "มานามากเกินกว่าลูกแก้วจะวัดได้!" ทั้งห้องปรบมือ'+rep(5));m.sus+=5}else{feed('✊ ลูกแก้วร้าวนิดเดียว อาจารย์ขมวดคิ้ว "แปลก… มันไม่เรืองเลย"');m.sus+=25}}),'',.5),
  O('💨 ชี้ไปทางหน้าต่าง "นั่นมังกร!" แล้ววิ่งผ่าน',()=>{MS(K).sus+=10;feed('💨 คุณวิ่งเร็วจนลมพัดลูกแก้วหมุน ทุกคนหันกลับมาก็ผ่านไปแล้ว')},'',.3),
  O('🙋 ยอมรับตรงๆ ว่าไม่มีมานา',()=>{MS(K).sus=100;MS(K).out=1;say('🙋 ทั้งห้องเงียบกริบ แล้วเสียงซุบซิบดังขึ้น ข่าวไปถึงหน่วยกำจัดคนไร้มานาภายในคืนเดียว','bad',true)},'⚠️ เส้นทางถูกตามล่า',.2)])],
 [12,K=>C('🧹 สอบขี่ไม้กวาด','ทุกคนลอยขึ้นฟ้าอย่างสง่างาม ไม้กวาดของคุณนอนนิ่งอยู่กับพื้นเหมือนไม้กวาดธรรมดา',[
  O('🦘 กระโดดสูงจนเหมือนบิน (มินิเกม)',()=>mgHold('ชาร์จแรงกระโดดให้พอดี',sc=>feed(sc>=.6?'🦘 คุณกระโดดข้ามหอคอย อาจารย์จดคะแนนว่า "บินได้สูงที่สุดในรุ่น"'+(K.yrS+=15,''):'🦘 กระโดดเลยไปตกบ่อปลาคาร์ป'+hurt(.1)))),
  O('🏊 ใช้ไม้กวาดเป็นไม้พาย วิ่งบนน้ำข้ามทะเลสาบ',()=>{MS(K).mus+=10;feed('🏊 คุณวิ่งบนผิวน้ำเร็วจนน้ำไม่ทันจม เพื่อนบอกว่าเป็นเวทน้ำระดับสูง');MS(K).sus+=5}),
  O('🤝 ขอขี่หลังเพื่อน',()=>{aff(K,'pal',8);feed(`🤝 ${N(K,'pal')}ยอมให้ขี่ แต่ทวงบุญคุณทุกวันจนจบปีสาม`)})])],
 [13,K=>C('🔥 ดวลเวทในชั้นเรียน',`${N(K,'rival')}ร่ายลูกไฟใส่คุณกลางห้องเรียน "ไหนลองป้องกันด้วยเวทซิ"`,[
  O('👊 ต่อยลูกไฟแตก',()=>mgDuel('ต่อยเวทให้แตกกลางอากาศ',npc(K,'rival').n,sc=>{if(sc>=.6){MS(K).mus+=15;feed('👊 ลูกไฟแตกกระจายเป็นประกายสวยงาม ทุกคนคิดว่าคุณใช้เวทลม');aff(K,'rival',-10)}else feed('👊 คิ้วไหม้ไปข้างหนึ่ง'+hurt(.15))})),
  O('🧱 ยกโต๊ะขึ้นบัง',()=>{MS(K).sus+=8;feed('🧱 โต๊ะไม้โอ๊กหนักสองร้อยกิโลถูกยกด้วยมือเดียว ทุกคนคิดว่าเป็นเวทเสริมแรง')}),
  O('🫠 ยอมแพ้',()=>feed('🫠 คุณยอมแพ้ ผมไหม้ไปครึ่งหัว แต่ความลับยังปลอดภัย'))])],
 [15,K=>C('🕵️ ผู้ตรวจสอบมานา','หน่วยตรวจสอบมานาของทางการมาสุ่มตรวจนักเรียน เขากำลังเดินมาทางคุณ',[
  O('🗣️ ตีมึน (มินิเกมอ่านใจ)',()=>mgRead('ตบตาผู้ตรวจสอบ','ผู้ตรวจสอบ',sc=>{if(sc>=.55){MS(K).sus=Math.max(0,MS(K).sus-15);feed('🗣️ เขาเชื่อว่าเครื่องวัดเสีย')}else{MS(K).sus+=30;feed('🗣️ เขาจดชื่อคุณลงสมุดเล่มดำ')}})),
  O('🏃 หนีขึ้นหลังคา',()=>{MS(K).sus+=15;MS(K).mus+=5;feed('🏃 คุณวิ่งขึ้นกำแพงตั้งฉากเหมือนแมลง ผู้ตรวจยืนอ้าปากค้าง')}),
  O('💪 ท้าดวลแขน ถ้าชนะห้ามตรวจ',()=>mgMash('งัดข้อกับผู้ตรวจสอบ',sc=>feed(sc>=.6?'💪 แขนเขาหักไปสามท่อน เขาสาบานว่าไม่เคยเห็นคุณ'+dark(3):'💪 แพ้ เขาตรวจคุณ…'+((MS(K).sus+=40),''))))])],
 [16,K=>C('🍳 ไข่เจียวของยาย','ยายที่เลี้ยงคุณมาส่งจดหมาย: "มีคนชุดดำมาถามหาเด็กที่ไม่มีมานา ยายไล่ไปด้วยกระทะแล้ว"',[
  O('🏠 กลับบ้านไปปกป้องยาย',()=>duel('หน่วยกำจัดคนไร้มานา',Math.round(threat(K)*1.1),w=>{feed(w?'🏠 ชายชุดดำสามคนนอนเรียงหน้าบ้าน ยายเจียวไข่ให้กินทั้งคืน'+rep(3):'🏠 คุณพายายหนีไปซ่อนในภูเขา'+hurt(.3));MS(K).sus+=10})),
  O('✉️ เขียนจดหมายบอกยายให้ย้ายบ้าน',()=>feed('✉️ ยายตอบกลับมาว่า "ยายอยู่บ้านนี้มาหกสิบปี ไม่ไปไหนทั้งนั้น" พร้อมไข่เจียวห่อกระดาษ'))])],
 [17,K=>C('🫂 อีกคนที่ไม่มีมานา','คุณเห็นรุ่นน้องคนหนึ่งแอบซ้อมยกหินในป่าตอนตีสี่ เขาตกใจจนหน้าซีด "อย่าบอกใครนะ…"',[
  O('🏋️ สอนเขาฝึกกล้าม',()=>{MS(K).pupil=1;MS(K).mus+=8;feed('🏋️ คุณมีลูกศิษย์คนแรก เขาวิดพื้นได้สิบครั้งแล้วร้องไห้')},'',.6),
  O('🤐 ทำเป็นไม่เห็น',()=>feed('🤐 หนึ่งปีต่อมา เขาหายไป ไม่มีใครถามถึง'+dark(5)),'',.4)])],
 [18,K=>C('🏆 การคัดเลือกผู้แข็งแกร่งที่สุด','วิทยาลัยจัดแข่งคัดเลือกตัวแทน 3 ด่าน: ยกหินเวท → ปีนหอคอยไร้บันได → ดวลกับแชมป์ปีก่อน',[
  O('🔥 ลงแข่งทุกด่าน',()=>{let t=0;mgMash('ด่าน 1: ยกหินเวท',a=>{t+=a;mgHold('ด่าน 2: ปีนหอคอย (ชาร์จแรงกระโดด)',b=>{t+=b;mgDuel('ด่าน 3: ดวลแชมป์',`แชมป์ปีก่อน`,c=>{t+=c;if(t/3>=.6){MS(K).champ=1;MS(K).mus+=30;say('🏆 <b>คุณชนะการคัดเลือก!</b> ไม่มีใครเห็นคุณร่ายเวทเลยสักครั้ง แต่ไม่มีใครกล้าถาม','epic',true);K.yrS+=30}else feed('🏆 ตกรอบ แต่สถิติยกหินของคุณยังไม่มีใครทำลายได้')})})})},'มินิเกม 3 ด่าน',.6),
  O('🙅 ไม่ลง กลัวความลับหลุด',()=>feed('🙅 คุณนั่งดูอยู่บนอัฒจันทร์ กินขนมปังไปสิบก้อน'),'',.4)])],
 [24,K=>C('🌋 เวทต้องห้ามถล่มเมือง','จอมเวทนอกรีตปลุกเวทต้องห้าม ลูกอุกกาบาตเวทขนาดเท่าภูเขาร่วงลงมาที่เมืองหลวง ไม่มีเวทป้องกันใดรับไหว',[
  O('👊 ต่อยมัน',()=>mgMash('ต่อยอุกกาบาตเวท!!!',sc=>{const m=MS(K);const ok=sc*.6+Math.min(1,m.mus/250)*.4;if(ok>=.55){m.fist=1;say('👊 <b>คุณต่อยอุกกาบาตเวทแตกกลางฟ้า</b> เศษหินร่วงลงมาเป็นฝนดาวตก ทั้งเมืองรู้ความจริงในวันนั้น — ผู้ช่วยเมืองไม่มีมานาแม้แต่หยดเดียว','myth',true);m.sus=100;m.out=1;K.rep+=30}else{say('👊 หมัดของคุณทำให้มันเฉียงไปตกนอกเมือง แขนขวาหักทั้งแขน','bad',true);S.hp=Math.max(1,Math.round(S.maxHp*.2))}},34),'มินิเกม',.7),
  O('🏃 อพยพชาวเมือง',()=>feed('🏃 คุณแบกคนออกจากเมืองได้ทีละสิบคน รวมสองพันคน'+rep(15)),'',.3)])]],
 yr:K=>{const m=MS(K);m.sus=cl(m.sus,0,100);if(m.sus>=100&&!m.out&&!m.hunt){m.hunt=1;return()=>C('🔥 ความลับหลุด','ทั้งวิทยาลัยรู้แล้วว่าคุณไม่มีมานา หน่วยกำจัดมาถึงประตูหอพักตอนเที่ยงคืน',[
  O('👊 สู้ทั้งหน่วย',()=>duel('หน่วยกำจัดคนไร้มานา',Math.round(threat(K)*1.3),w=>{if(w){m.out=1;say('👊 หน่วยกำจัดทั้งหน่วยแตกพ่าย คุณยืนกลางลานวิทยาลัย ไม่มีใครกล้าไล่คุณอีก','epic',true)}else ending(K,'mus_hunt','คุณหนีออกจากวิทยาลัยและถูกไล่ล่าไปจนสุดขอบทวีป ที่นั่นคุณสร้างกระท่อมและฝึกกล้ามจนวันสุดท้าย','ถูกไล่ล่าจนสุดขอบโลก')}),'ต่อสู้',.6),
  O('🚪 หนีออกนอกเมือง',()=>ending(K,'mus_hunt','คุณหนีไปซ่อนในภูเขา ใช้ชีวิตที่เหลือยกหินและเลี้ยงแพะ ไม่มีใครจำชื่อคุณได้นอกจากแพะ','ใช้ชีวิตหลบซ่อนจนแก่ตาย'),'',.4)])}
  if(S.focus==='fa_lift')return null;return null},
 fin:(K,o)=>{const m=MS(K);if(m.fist)o.push(O('👊 เปิดโรงเรียนสอนคนไร้มานา',()=>ending(K,'mus_free','หลังวันที่คุณต่อยอุกกาบาต กฎหมายกำจัดคนไร้มานาถูกยกเลิก คุณเปิดโรงฝึกแห่งแรกของทวีป ลูกศิษย์รุ่นแรกมีสามร้อยคน','แก่ตายในโรงฝึกที่เต็มไปด้วยเสียงนับวิดพื้น'),'',.3));
  if(m.mus>=180)o.push(O('🗿 ใช้กล้ามท้าเทพ',()=>ending(K,'mus_god','คุณปีนขึ้นสวรรค์ด้วยมือเปล่า เทพแห่งเวทถามว่าเจ้ามาทำไม คุณตอบว่า "มาขอดวลแขน" เทพแพ้ และตั้งแต่วันนั้นเวทมนตร์ทุกบทต้องมีท่าวิดพื้นประกอบ','ยังไม่ตาย ว่ากันว่ายังวิดพื้นอยู่บนสวรรค์'),'🗝️ ฉากจบลับ',.1));
  if(!m.out)o.push(O('🤫 พกความลับไปจนตาย',()=>ending(K,'mus_fist','ไม่มีใครรู้ว่าจอมเวทผู้ยิ่งใหญ่ไม่เคยร่ายเวทได้เลยสักบท บันทึกของคุณพูดถึง "เวทหมัดที่ไม่มีใครเลียนแบบได้"','จากไปอย่างสงบ ความลับฝังไปกับร่าง'),'',.3))},
 ends:[['mus_fist','👊','จอมเวทที่ไม่เคยร่ายเวท','พกความลับว่าไม่มีมานาไปจนตาย'],['mus_free','🕊️','ทวีปที่คนไร้มานามีที่ยืน','เปลี่ยนกฎหมายด้วยหมัด'],['mus_hunt','🔥','ถูกล่าจนสุดขอบโลก','ความลับหลุดแล้วหนีไม่พ้น'],['mus_god','🗿','กล้ามที่เทพยังต้องก้มหัว','ปีนขึ้นสวรรค์ไปดวลแขนกับเทพ',1]]};

// ---------- 👑 ราชากลับชาติ ----------
const CORE=[['⚫','ดำ'],['🔴','แดง'],['🟠','ส้ม'],['🟡','เหลือง'],['⚪','เงิน'],['🤍','ขาว']];
MV.reborn={ic:'👑',n:'ราชากลับชาติมาเกิด',p:13,d:'ชาติก่อนคุณคือราชานักสู้ที่ไม่เคยแพ้ใคร จนถูกลอบสังหารบนบัลลังก์ คุณลืมตาอีกครั้งในร่างทารก จำได้ทุกอย่าง',
 chip:K=>`👑 แกนมานา ${CORE[MS(K).core][0]} ${CORE[MS(K).core][1]}`,
 birth:K=>{K.pw+=6;S.int+=15;K.mpM+=10},
 ev:[
 [12,K=>C('👶 สิบสองปีที่ผ่านมา','ก่อนมาถึงวิทยาลัย คุณใช้วัยเด็กไปกับอะไรมากที่สุด',[
  O('⚔️ ฝึกดาบลับๆ ตอนพ่อแม่หลับ',()=>{K.pw+=capOf(K)*.15;feed('⚔️ อายุสี่ขวบคุณฟันต้นไม้ขาดด้วยกิ่งไม้')}),
  O('🧘 สร้างแกนมานาตั้งแต่ยังเดินไม่ได้',()=>{MS(K).cx+=60;feed('🧘 แกนมานาของคุณเริ่มก่อตัวก่อนจะพูดคำว่า "แม่" ได้')}),
  O('🏡 ใช้ชีวิตเป็นเด็กธรรมดาที่ชาติก่อนไม่เคยได้เป็น',()=>{MS(K).fam=(MS(K).fam|0)+2;heal(1);feed('🏡 คุณร้องไห้ครั้งแรกในรอบสองชาติ ตอนแม่กอดในวันเกิดปีที่ห้า')})])],
 [12,K=>C('🐾 สัตว์อสูรผูกพันธะ','ในถ้ำหลังบ้าน แม่สัตว์อสูรที่กำลังจะตายฝากไข่ไว้กับคุณ ดวงตาของมันรู้ว่าคุณไม่ใช่เด็กธรรมดา',[
  O('🥚 รับไข่ไว้',()=>{const X=X3(K);X.pet=newPet(pick(['drag','wolf']));X.pet.st=1;X.pet.n=pick(['ซิลเวอร์','เถ้าถ่าน','ดาวเหนือ']);recalcE(K);feed(`🐾 ไข่ฟักในมือคุณทันที <b>${E(X.pet.n)}</b> เลียหน้าคุณ — สัตว์อสูรผูกพันธะของคุณ`)}),
  O('🗡️ จบความทรมานของแม่มัน แล้วจากไป',()=>feed('🗡️ คุณฝังแม่สัตว์อสูรไว้ใต้ต้นไม้ ไข่หายไปตอนเช้า'+dark(4)))])],
 [13,K=>C('🧝 เพื่อนในวัยเด็ก',`เด็กหญิงเอลฟ์ชื่อ <b>${E(MS(K).elf||(MS(K).elf=nm('f').split(' ')[0]))}</b> ที่คุณช่วยไว้ตอนเด็ก ย้ายมาเรียนวิทยาลัยเดียวกัน เธอยังเรียกคุณด้วยชื่อเล่นตอนห้าขวบ`,[
  O('💞 ใช้เวลากับเธอ',()=>{const X=X3(K);if(!X.love&&!S.spouse)X.love={n:MS(K).elf,d:'เพื่อนเอลฟ์ตั้งแต่วัยเด็ก',mg:'mgRead',st:1,h:45};feed('💞 เธอหัวเราะเหมือนเดิมทุกอย่าง ชาติก่อนคุณไม่เคยมีใครแบบนี้')}),
  O('🛡️ เก็บระยะห่าง ชาติก่อนคนที่ใกล้ชิดถูกฆ่าหมด',()=>feed('🛡️ เธอมองคุณจากอีกฝั่งของห้องโถงทุกวัน'))])],
 [15,K=>C('👁️ คนจากชาติก่อน',`นักเรียนใหม่คนหนึ่งยิ้มให้คุณแบบที่คุณจำได้ — รอยยิ้มของ<b>${pick(['เพื่อนสนิทชาติก่อน','คนที่ลอบสังหารคุณบนบัลลังก์','อาจารย์ดาบชาติก่อน'])}</b> เขาเกิดใหม่เหมือนคุณ`,[
  O('🤝 ทักว่า "จำข้าได้ไหม"',()=>{const g=rnd();MS(K).past=g<.5?'friend':'foe';feed(g<.5?'🤝 เขาร้องไห้แล้วกอดคุณ "ข้าตามหาท่านมาสองชาติ"':'🤝 รอยยิ้มเขาแข็งค้าง "ยังจำได้สินะ… ครั้งนี้ข้าจะทำให้จบ"')}),
  O('🎭 ทำเป็นไม่รู้จัก แล้วสืบเอง',()=>{MS(K).past=rnd()<.5?'friend':'foe';MS(K).pk=1;feed('🎭 คุณจับตาเขาทุกวัน จดทุกอย่างลงสมุด')})])],
 [17,K=>C('🌀 ความทรงจำชาติก่อนกลืนกิน','คืนนี้คุณฝันว่ายังนั่งบนบัลลังก์ ตื่นมาแล้วจำชื่อแม่ในชาตินี้ไม่ได้อยู่ครู่หนึ่ง',[
  O('👑 ยอมรับตัวตนราชา',()=>{MS(K).king=(MS(K).king|0)+2;K.pw+=capOf(K)*.1;feed('👑 ดาบของคุณคมขึ้น แต่สายตาที่มองครอบครัวเย็นลง')}),
  O('🏡 ยึดชีวิตนี้ไว้',()=>{MS(K).fam=(MS(K).fam|0)+2;feed('🏡 คุณเขียนชื่อแม่ลงฝ่ามือทุกเช้า')}),
  O('🧘 ผสานทั้งสองตัวตน (มินิเกม)',()=>mgRune('เรียงความทรงจำสองชาติ',5,sc=>{if(sc>=.6){MS(K).cx+=40;feed('🧘 สองชาติกลายเป็นหนึ่ง แกนมานาสั่นสะเทือน')}else{MS(K).king=(MS(K).king|0)+1;feed('🧘 ความทรงจำปนกัน คุณเรียกเพื่อนด้วยชื่อทหารชาติก่อน')}}))])],
 [20,K=>C('🔥 บ้านถูกโจมตี',`กลุ่มคนสวมเสื้อคลุมดำบุกบ้านเกิดของคุณ${MS(K).past==='foe'?' ผู้นำของมันคือคนจากชาติก่อน':''}`,[
  O('⚔️ รีบกลับไปสู้',()=>duel(MS(K).past==='foe'?'คนจากชาติก่อน':'ผู้นำเสื้อคลุมดำ',Math.round(threat(K)*1.2),w=>{if(w){MS(K).fam=(MS(K).fam|0)+3;MS(K).foeD=1;say('⚔️ คุณมาทันก่อนไฟจะลามถึงห้องแม่ ครอบครัวรอดทุกคน','epic',true)}else{MS(K).lossF=1;say('⚔️ คุณมาไม่ทัน… บ้านเหลือแต่เถ้า พ่อไม่รอด','bad',true);MS(K).king=(MS(K).king|0)+3}}),'ต่อสู้',.7),
  O('🧠 วางแผนแบบราชา ซุ่มโจมตีกลับ',()=>mgRead('อ่านแผนศัตรู','ผู้นำเสื้อคลุมดำ',sc=>{if(sc>=.55){MS(K).foeD=1;feed('🧠 ศัตรูเดินเข้ากับดักทั้งกอง ครอบครัวไม่รู้ด้วยซ้ำว่าเกิดอะไร')}else{MS(K).lossF=1;feed('🧠 แผนพลาด บ้านถูกเผา');MS(K).king=(MS(K).king|0)+2}}),'',.3)])],
 [26,K=>C('⚔️ สงครามข้ามทวีป','ทวีปชาติก่อนของคุณเปิดประตูมิติบุกโลกนี้ ทหารฝั่งโน้นสวมตราประจำตระกูลที่คุณเคยสร้างเอง',[
  O('🛡️ นำทัพโลกนี้ต้าน',()=>duel('แม่ทัพจากโลกเก่า',Math.round(threat(K)*1.35),w=>{if(w){MS(K).war=1;K.rep+=20;say('🛡️ แม่ทัพศัตรูคุกเข่าเมื่อเห็นท่าดาบ "ท่าน… ราชา?"','epic',true)}else feed('🛡️ ถอยทัพ'+hurt(.4))}),'ต่อสู้',.6),
  O('🚪 ข้ามประตูไปเจรจาฝั่งโน้น',()=>{MS(K).king=(MS(K).king|0)+2;MS(K).war=2;feed('🚪 บัลลังก์เก่ายังว่างอยู่ ข้าราชบริพารชราจำคุณได้')},'',.4)])]],
 yr:K=>{const m=MS(K);m.cx+=R(6,12)+(S.focus==='fa_prac'?15:0)+(S.focus==='fa_rest'?6:0);if(m.core<5&&m.cx>=100+m.core*25&&!m.cq){m.cq=1;return()=>{m.cq=0;if(m.core>=5)return;const c=CORE[m.core+1];C(`${c[0]} ทะลวงแกนมานา: ${c[1]}`,`แกนมานา${CORE[m.core][1]}ของคุณแน่นจนเริ่มร้าว ต้องควบคุมให้แม่นยำ ไม่อย่างนั้นแกนแตก`,[
  O('⚡ ทะลวงเลย (มินิเกม)',()=>mgHold(`ทะลวงแกน${c[1]}`,sc=>{if(sc>=.55){m.core++;m.cx=0;K.mpM+=15+m.core*5;K.pw+=capOf(K)*.12;say(`${c[0]} <b>แกนมานา${c[1]}!</b>${m.core===5?' — ระดับที่ไม่มีใครในสองโลกเคยไปถึง':''}`,'myth',true);recalcE(K)}else{m.cx=Math.round(m.cx*.4);feed('💥 แกนร้าว ต้องพักฟื้นทั้งปี'+hurt(.35))}},[50-m.core*2,62-m.core*3]),'มินิเกม',.7),
  O('⏳ รอให้มั่นคงกว่านี้',()=>{m.cx-=20;feed('⏳ คุณรออีกปี')},'',.3)])}}
  if((m.king|0)>=8&&!m.lost){m.lost=1;return()=>ending(K,'re_lost','วันหนึ่งคุณมองแม่แล้วไม่รู้สึกอะไรเลย ราชาชาติก่อนกลืนตัวตนชาตินี้จนหมด คุณเดินออกจากบ้านไปโดยไม่หันกลับ','ตัวตนชาตินี้หายไป เหลือแค่ราชาที่ไม่มีบัลลังก์')}return null},
 fin:(K,o)=>{const m=MS(K);if(m.war===2||m.king>=4)o.push(O('👑 กลับไปเป็นราชาโลกเก่า',()=>ending(K,'re_king','คุณข้ามประตูมิติกลับไปนั่งบัลลังก์ ครั้งนี้คุณเลือกองครักษ์เองทุกคน และไม่มีใครลอบสังหารคุณได้อีก','สวรรคตบนบัลลังก์ในวัยชรา ไม่มีใครแทงข้างหลัง'),'',.25));
  if((m.fam|0)>=3)o.push(O('🏡 อยู่กับครอบครัวในโลกนี้',()=>ending(K,'re_home','คุณปิดประตูมิติด้วยมือตัวเอง ชาติก่อนคุณมีทุกอย่างยกเว้นคนที่รอคุณกลับบ้าน ชาตินี้คุณมีแค่สิ่งนั้น และมันพอแล้ว','แก่ตายในบ้านหลังเล็กท่ามกลางลูกหลาน'),'',.35));
  if(m.core>=5&&m.foeD)o.push(O('🤍 ใช้แกนขาวเชื่อมสองโลก',()=>ending(K,'re_white','แกนมานาสีขาวทำให้คุณเดินข้ามโลกได้เหมือนข้ามถนน สองทวีปที่เคยทำสงครามกลายเป็นเพื่อนบ้าน และมีราชาเดียวที่ทั้งสองฝั่งยอมรับ','ตำนานว่าคุณไม่ได้ตาย แค่เดินไปยังโลกที่สาม'),'🗝️ ฉากจบลับ',.1))},
 ends:[['re_king','👑','ราชาที่กลับบัลลังก์','กลับไปปกครองโลกเก่า'],['re_home','🏡','ชาติที่มีคนรอ','เลือกครอบครัวในโลกนี้'],['re_lost','🌀','ราชากลืนตัวตน','ความทรงจำชาติก่อนชนะ'],['re_white','🤍','แกนขาวเชื่อมสองโลก','แกนมานาขั้นสูงสุด + ชนะศัตรูชาติก่อน',1]]};

// ---------- 📚 ท้ายห้องที่แอบโหดสุด ----------
MV.hidden={ic:'📚',n:'ท้ายห้องที่แอบโหดสุด',p:14,d:'คุณแข็งแกร่งที่สุดในรุ่นตั้งแต่วันแรก แต่ตั้งใจจะเป็นตัวประกอบที่ไม่มีใครจำ เพราะคนเก่งเกินไปไม่เคยมีชีวิตสงบ',
 chip:K=>`📚 ความสงสัย ${MS(K).sus}%${MS(K).mask?' · 🎭 หน้ากาก '+MS(K).mask:''}`,
 birth:K=>{K.pw+=capOf(K)*.4;K.mpM+=20;K.rank=45},
 ev:[
 [12,K=>C('🎯 สอบเข้าแบบคุมคะแนน','สอบวัดระดับวันแรก เป้าหมายของคุณคือได้คะแนนตรงกลางพอดี ไม่สูงจนเด่น ไม่ต่ำจนโดนไล่ออก',[
  O('🎯 คุมพลังให้พอดี (มินิเกม)',()=>mgHold('ปล่อยพลังแค่ครึ่งเดียว',sc=>{const m=MS(K);if(sc>=.55){m.sus=Math.max(0,m.sus-5);K.rank=31;feed('🎯 อันดับ 31 จาก 60 สมบูรณ์แบบ ไม่มีใครมองคุณสองครั้ง')}else{m.sus+=20;K.rank=3;feed('🎯 พลาด… คุณระเบิดเป้าทะลุกำแพงสามชั้น "อุบัติเหตุครับ"')}},[46,54])),
  O('😴 นอนหลับระหว่างสอบ',()=>{K.rank=58;feed('😴 อันดับ 58 อาจารย์ประจำชั้นถอนหายใจทุกครั้งที่เห็นหน้าคุณ')})])],
 [13,K=>C('🌙 คนร้ายบุกหอพักตอนกลางคืน','กลุ่มนักฆ่าบุกจับตัวนักเรียนตระกูลใหญ่ ทุกคนหลับ มีแค่คุณที่ตื่น',[
  O('🎭 สวมหน้ากากแล้วจัดการ',()=>{MS(K).mask=pick(['เงาจันทร์','อีกาไร้นาม','ผู้มาเยือนตอนตีสาม']);feed(`🎭 นักฆ่าทั้งกลุ่มถูกแขวนบนเสาธงตอนเช้า ข่าวลือเรื่อง "<b>${MS(K).mask}</b>" เริ่มแพร่ไปทั่ววิทยาลัย`);MS(K).fame=(MS(K).fame|0)+1}),
  O('😴 ปลุกยามแล้วกลับไปนอน',()=>feed('😴 ยามมาช้าไปสิบนาที แต่ก็จับได้ทั้งหมด'+rep(1))),
  O('🔪 จัดการแบบเงียบที่สุด ไม่เหลือร่องรอย',()=>{feed('🔪 ไม่มีใครรู้ว่าเกิดอะไรขึ้น นักฆ่าหายไปเฉยๆ'+dark(6));MS(K).sus+=5})])],
 [14,K=>C('⚔️ อัจฉริยะประจำรุ่นท้าดวล',`${N(K,'rival')} อัจฉริยะอันดับหนึ่ง ท้าดวลคุณเพราะ "อยากรังแกคนท้ายห้องให้ทุกคนดู"`,[
  O('🫠 แพ้แบบเนียน (มินิเกมคุมแรง)',()=>mgHold('แพ้ให้ดูเหมือนสู้สุดใจ',sc=>{if(sc>=.5){feed('🫠 คุณแพ้อย่างน่าสงสาร ทั้งห้องหัวเราะ แต่อัจฉริยะคนนั้นหน้าซีด เพราะรู้ว่าคุณเบี่ยงทุกการโจมตีได้ก่อนโดน');aff(K,'rival',5);mem(K,'rival','รู้ว่าคุณแกล้งแพ้')}else{MS(K).sus+=25;feed('🫠 คุณเผลอเบี่ยงลูกไฟกลับ ดาบของเขาหักครึ่ง')}},[15,30])),
  O('💥 ชนะในหนึ่งวินาที',()=>{MS(K).sus+=40;K.rank=1;aff(K,'rival',-20);feed('💥 ไม่มีใครเห็นว่าเกิดอะไรขึ้น อัจฉริยะนอนอยู่กับพื้น ทั้งห้องเงียบ')})])],
 [15,K=>C('👀 เพื่อนสนิทจับได้',`${N(K,'pal')}เห็นคุณซ้อมเวทระดับต้องห้ามหลังหอสมุดตอนตีสอง`,[
  O('🗣️ หลอกว่าเป็นความฝัน (มินิเกมอ่านใจ)',()=>mgRead('ทำให้เพื่อนเชื่อว่าฝันไป',npc(K,'pal').n,sc=>{if(sc>=.55)feed('🗣️ เพื่อนเชื่อ… มั้ง');else{MS(K).sus+=20;feed('🗣️ เพื่อนไม่เชื่อเลย และเริ่มสะกดรอยตามคุณ')}})),
  O('🤝 บอกความจริง ขอให้ช่วยเก็บความลับ',()=>{MS(K).ally=1;aff(K,'pal',15);feed('🤝 เพื่อนกลายเป็นคนเดียวในโลกที่รู้ และช่วยคุณสร้างข้ออ้างทุกครั้ง')})])],
 [16,K=>C('📰 ข่าวลือจอมเวทหน้ากาก',`ทั้งเมืองพูดถึง${MS(K).mask?` "${MS(K).mask}"`:'จอมเวทนิรนาม'}ที่ช่วยคนตอนกลางคืน นักเรียนสาวครึ่งวิทยาลัยมีรูปวาดติดผนัง`,[
  O('🎭 ออกช่วยคนต่อทุกคืน',()=>{MS(K).fame=(MS(K).fame|0)+2;MS(K).sus+=10;feed('🎭 ตำนานโตขึ้น พร้อมกับขอบตาดำของคุณ'+rep(5))}),
  O('🙈 หยุดก่อน ข่าวแรงเกินไป',()=>{MS(K).sus=Math.max(0,MS(K).sus-15);feed('🙈 คุณหยุดหนึ่งปี เมืองนี้อาชญากรรมพุ่ง'+dark(3))}),
  O('😏 แอบซื้อรูปวาดตัวเองมาเก็บ',()=>feed('😏 คุณซื้อมาสามรูป รูปที่สามวาดหล่อกว่าตัวจริง'+money(-20)))])],
 [17,K=>C('🏟️ ทัวร์นาเมนต์ประจำปี','ผู้ชนะได้พรหนึ่งข้อจากอธิการบดี แต่ต้องเปิดหน้าต่อหน้าทุกคน',[
  O('🎭 ลงแข่งโดยสวมหน้ากาก (มินิเกม 2 ด่าน)',()=>{let t=0;mgDuel('รอบรองชนะเลิศ','ผู้ท้าชิงสวมเกราะ',a=>{t+=a;mgCombo('รอบชิง: ปะทะเวทผสม',b=>{t+=b;if(t/2>=.55){MS(K).champ=1;say('🏟️ คุณชนะทั้งทัวร์นาเมนต์ ตอนจะเปิดหน้ากาก คุณใช้เวทระเบิดควันแล้วหายไป อธิการบดีหัวเราะลั่น','epic',true);MS(K).sus+=15}else feed('🏟️ แพ้รอบชิงแบบสูสี ไม่มีใครรู้ว่าเป็นคุณ')})})},'มินิเกม',.5),
  O('🍿 นั่งขายข้าวโพดคั่วบนอัฒจันทร์',()=>feed('🍿 รวยขึ้นนิดหน่อย'+money(80)),'',.3),
  O('🫠 ลงแข่งแล้วแพ้รอบแรกโดยตั้งใจ',()=>{MS(K).sus=Math.max(0,MS(K).sus-10);feed('🫠 แพ้ให้คนที่อ่อนที่สุดในทัวร์นาเมนต์ เขาดีใจจนร้องไห้')},'',.2)])],
 [19,K=>C('🧓 อธิการบดีเรียกพบ','อธิการบดีวางชาลงช้าๆ "ข้ารู้ว่าเจ้าคือใคร ข้าก็เคยเป็นเด็กท้ายห้องเหมือนกัน"',[
  O('🤝 ยอมรับ',()=>{MS(K).heir=1;feed('🤝 อธิการบดีมอบตำราเล่มที่ไม่มีในห้องสมุด "วันหนึ่งที่นี่ต้องการเจ้า"');K.pw+=capOf(K)*.08}),
  O('🙄 ไม่รู้เรื่องครับ',()=>feed('🙄 อธิการบดียิ้ม "ดี เก็บแบบนี้ไว้ล่ะ"'))])],
 [22,K=>C('🐉 มังกรบุกวิทยาลัย','มังกรดำลงจอดกลางลานวิทยาลัย อาจารย์ทุกคนล้มลงไปแล้ว นักเรียนสามร้อยคนติดอยู่ในห้องโถง',[
  O('🌟 เปิดเผยพลังทั้งหมด',()=>mgCombo('ปลดพลังที่ซ่อนมาทั้งชีวิต',sc=>{if(sc>=.5){MS(K).rev=1;MS(K).sus=100;say('🌟 <b>นักเรียนท้ายห้องฆ่ามังกรด้วยท่าเดียว</b> ต่อหน้าทุกคน ชีวิตสงบของคุณจบลงในวินาทีนั้น','myth',true);K.rep+=40}else{say('🌟 มังกรหนีไปพร้อมแผลลึก คุณบาดเจ็บสาหัส','bad',true);S.hp=Math.max(1,Math.round(S.maxHp*.15))}}),'',.5),
  O('🎭 สวมหน้ากากแล้วสู้',()=>duel('มังกรดำ',Math.round(threat(K)*1.25),w=>{if(w){MS(K).fame=(MS(K).fame|0)+3;feed('🎭 มังกรตาย คนในหน้ากากหายไป ทุกคนตามหาเขาจนทุกวันนี้')}else feed('🎭 หน้ากากแตกครึ่ง… มีคนเห็นตาคุณ'+((MS(K).sus+=35),''))}),'ต่อสู้',.5)])]],
 yr:K=>{const m=MS(K);m.sus=cl(m.sus+(rnd()<.4?R(1,6):0),0,100);if(m.sus>=100&&!m.rev&&!m.cg){m.cg=1;return()=>C('🧪 ถูกจับตา','สภาเวทมนตร์ส่งคนมาจับตัวคุณไป "ศึกษา" เพราะคนที่ซ่อนพลังขนาดนี้ต้องไม่ใช่มนุษย์ธรรมดา',[
  O('🌟 เลิกซ่อน แล้วสู้',()=>duel('ผู้พิทักษ์สภาเวท',Math.round(threat(K)*1.3),w=>{if(w){m.rev=1;say('🌟 ผู้พิทักษ์สภาเวทสามคนถูกปลดอาวุธในเสี้ยววินาที สภาส่งจดหมายขอโทษตอนเช้า','epic',true)}else ending(K,'hid_exp','คุณถูกพาไปยังหอคอยของสภาเวท และไม่มีใครเห็นคุณอีกเลย ตำนาน "นักเรียนที่หายไป" เล่าต่อกันในวิทยาลัยทุกรุ่น','หายไปในหอคอยของสภาเวท')}),'ต่อสู้',.6),
  O(m.ally?'🤝 ให้เพื่อนช่วยสร้างหลักฐานปลอม':'🏃 หนีไปต่างแคว้น',()=>{if(m.ally){m.sus=40;feed('🤝 เพื่อนสาบานต่อหน้าสภาว่าคุณอยู่กับเขาทั้งคืน ทุกคืน')}else ending(K,'hid_exp','คุณหนีไปต่างแคว้น ใช้ชื่อปลอมทั้งชีวิต และซ่อนพลังเก่งจนไม่มีใครรู้เลยว่าเคยมีคนแบบคุณอยู่','จากไปอย่างนิรนามในแคว้นที่ไม่มีใครรู้จัก')},'',.4)])}return null},
 fin:(K,o)=>{const m=MS(K);if(!m.rev&&m.sus<100)o.push(O('🎭 เป็นตำนานไร้หน้าไปจนตาย',()=>ending(K,'hid_shadow',`ไม่มีใครรู้ว่าคนที่ช่วยทวีปมาตลอดชีวิตคือนักเรียนท้ายห้องคนนั้น ${m.mask?`ชื่อ "${m.mask}" `:''}ถูกจารึกในหนังสือประวัติศาสตร์ ส่วนชื่อจริงของคุณอยู่แค่บนป้ายหลุมศพเล็กๆ`,'จากไปอย่างเงียบๆ ไม่มีใครรู้ว่าเป็นใคร'),'',.3));
  if(m.rev)o.push(O('🌟 ยอมรับตำแหน่งที่ทุกคนยกให้',()=>ending(K,'hid_rev','เมื่อไม่ต้องซ่อนอีกแล้ว คุณกลายเป็นจอมเวทที่ทวีปพึ่งพา และบอกนักเรียนท้ายห้องทุกคนว่า "อย่ากลัวที่จะเก่ง"','แก่ตายในฐานะจอมเวทที่ทวีปรัก'),'',.3));
  if(!m.rev&&S.spouse)o.push(O('🍵 เป็นตัวประกอบที่มีความสุขที่สุดในโลก',()=>ending(K,'hid_mob',`คุณได้ชีวิตที่ตั้งใจมาตั้งแต่วันแรก บ้านเล็กๆ กับ${E(S.spouse)} งานธรรมดา และไม่มีใครรู้ว่าทุกครั้งที่มีภัยพิบัติผ่านหมู่บ้านนี้ มันเปลี่ยนทิศเอง`,'แก่ตายอย่างสงบ ตัวประกอบที่โลกไม่รู้ว่าเป็นตัวเอก'),'🗝️ ฉากจบลับ',.15))},
 ends:[['hid_shadow','🎭','ตำนานไร้หน้า','ซ่อนพลังได้จนวันสุดท้าย'],['hid_rev','🌟','นักเรียนท้ายห้องที่ทุกคนรู้จัก','ถูกบีบให้เปิดเผยพลัง'],['hid_exp','🧪','นักเรียนที่หายไป','ถูกจับได้เพราะความสงสัยเต็ม'],['hid_mob','🍵','ตัวประกอบที่มีความสุขที่สุด','ไม่เปิดเผย + มีคู่ชีวิต',1]]};

// ---------- 🗡️ นักดาบเวท ----------
MV.blade={ic:'🗡️',n:'นักดาบเวท',p:14,d:'คุณร่ายเวทออกจากมือไม่ได้เลย แต่เวทไหลเข้าสู่ใบดาบได้ราวกับมีชีวิต ในวิทยาลัยที่ดูถูกนักดาบ คุณคือคนเดียวที่ถือดาบเข้าห้องเรียน',
 chip:K=>`🗡️ ท่าธาตุ ${MS(K).st.map(i=>STC[i][0]).join('')||'—'} ${MS(K).st.length}/6`,
 birth:K=>{K.pw+=8;const X=X3(K);if(!X.gear.w){const g=mkGear(1,'w');g.n='ดาบเก่าของพ่อ';g.ic='🗡️';X.gear.w=g;recalcE(K)}},
 ev:[
 [12,K=>C('😂 นักดาบในวิทยาลัยเวท',`${N(K,'rival')}หัวเราะเสียงดังตอนคุณถือดาบเข้าห้อง "ที่นี่ไม่ใช่โรงฝึกทหารนะ"`,[
  O('🗡️ ฟันลูกไฟที่เขาปามาเป็นสองท่อน',()=>{if(rnd()<.6+fxv('fight')){feed('🗡️ ลูกไฟขาดเป็นสองท่อนกลางอากาศ ทั้งห้องเงียบ');aff(K,'rival',-8);learnSt(K,0)}else feed('🗡️ พลาด เสื้อไหม้'+hurt(.1))}),
  O('😑 เงียบ แล้วไปฝึกต่อ',()=>{K.pw+=capOf(K)*.05;feed('😑 คุณฝึกจนดาบเรืองแสงจางๆ เป็นครั้งแรก')})])],
 [13,K=>C('🧓 อาจารย์ดาบสามคน','มีสามคนยอมสอนคุณ คนหนึ่งเป็นภารโรงตาบอด คนหนึ่งเป็นอัศวินที่ถูกปลด อีกคนเป็นโครงกระดูกในห้องเก็บของ',[
  O('🧹 ภารโรงตาบอด',()=>{MS(K).mst='blind';learnSt(K,2);feed('🧹 เขาสอนให้ฟังลมก่อนฟัน "ตาหลอกเจ้า ลมไม่เคยหลอก"')}),
  O('🛡️ อัศวินที่ถูกปลด',()=>{MS(K).mst='knight';learnSt(K,3);K.pw+=capOf(K)*.06;feed('🛡️ เขาสอนท่ามั่นคงเหมือนภูเขา และสอนการดื่มเหล้าโดยไม่ได้ตั้งใจ')}),
  O('💀 โครงกระดูก',()=>{MS(K).mst='bone';learnSt(K,5);feed('💀 โครงกระดูกสอนดาบเงา และเล่าว่าเคยเป็นนักดาบเวทคนสุดท้ายเมื่อสามร้อยปีก่อน'+(K.clue<3&&rnd()<.4?clue(K,'นักดาบเวทถูกลบออกจากประวัติศาสตร์โดยตั้งใจ'):''))})])],
 [14,K=>C('🗡️ ดาบที่พูดได้','คืนหนึ่งดาบของคุณพูดขึ้นมา "เจ้าอัดเวทใส่ข้ามาสามปี ข้าตื่นแล้ว"',[
  O('🤝 ผูกมิตรกับดาบ',()=>{MS(K).talk=1;feed('🤝 ดาบชื่อ "เสี้ยวจันทร์" ชอบบ่นเรื่องสนิมและคอยเตือนก่อนศัตรูโจมตี');K.save=(K.save|0)+1}),
  O('😱 โยนดาบทิ้งลงบ่อ',()=>feed('😱 เช้ามาดาบกลับมาวางข้างหมอน เปียกโชก และงอน'))])],
 [15,K=>C('⚔️ ดวลอัศวินเวท','อัศวินเวทแห่งราชสำนักมาคัดตัวนักเรียน เขาอยากเห็นว่านักดาบที่ร่ายเวทไม่ได้จะทำอะไรได้',[
  O('🌀 ท่าผสมธาตุ (มินิเกม)',()=>mgCombo('ผสมธาตุเข้าดาบทันทุกท่า',sc=>{if(sc>=.6){learnSt(K,R(0,5));MS(K).kn=1;say('🌀 อัศวินเวทคุกเข่าข้างหนึ่ง "ข้าไม่เคยเห็นดาบแบบนี้" เขาเสนอที่ฝึกในราชสำนัก','epic',true)}else feed('🌀 แพ้ แต่อัศวินจดชื่อคุณไว้')}),'มินิเกม',.7),
  O('🙇 ขอเป็นลูกศิษย์แทน',()=>{learnSt(K,4);feed('🙇 เขาสอนท่าสายฟ้าให้หนึ่งท่าก่อนจากไป')},'',.3)])],
 [16,K=>C('🔥 ตีดาบเล่มใหม่','ดาบเก่าเริ่มรับเวทไม่ไหว ช่างตีดาบคนแคระบอกว่าต้องใช้ "แร่ที่เคยถูกฟ้าผ่า"',[
  O('⛈️ ปีนเขาไปรอฟ้าผ่า (มินิเกม)',()=>mgHold('ชาร์จดาบรับสายฟ้าให้พอดี',sc=>{if(sc>=.55){feed('⛈️ ฟ้าผ่าลงดาบในมือคุณพอดี'+lootDrop(K,4,'สายฟ้า'));learnSt(K,4)}else feed('⛈️ ผมตั้งชี้ฟ้าไปหนึ่งเดือน'+hurt(.2))})),
  O('💰 ซื้อแร่จากตลาดมืด',()=>{if((S.money||0)<300)return feed('💰 เงินไม่พอ');money(-300);feed('💰 แร่ของปลอม แต่ช่างคนแคระตีจนใช้ได้'+lootDrop(K,3,'ช่างคนแคระ'))})])],
 [18,K=>C('🌉 ศึกบนสะพาน','กองโจรเวทร้อยคนจะข้ามสะพานเข้าหมู่บ้าน มีแค่คุณยืนขวาง สะพานแคบพอให้ข้ามได้ทีละคน',[
  O('🗡️ ยืนขวางทั้งคืน',()=>{let t=0;mgCombo('ฟันทีละคน (ครึ่งแรก)',a=>{t+=a;mgDuel('หัวหน้าโจรเวท','หัวหน้าโจรเวท',b=>{t+=b;if(t/2>=.55){MS(K).bridge=1;say('🌉 ตอนรุ่งสาง โจรเวทร้อยคนนอนอยู่ฝั่งโน้นของสะพาน คุณยังยืนอยู่ตรงกลาง','myth',true);K.rep+=20}else feed('🌉 คุณถ่วงเวลาได้จนชาวบ้านหนีทัน'+hurt(.5))})})},'มินิเกม',.7),
  O('🔥 ตัดสะพานทิ้ง',()=>feed('🔥 หมู่บ้านรอด แต่ถูกตัดขาดจากโลกภายนอกสามปี'),'',.3)])],
 [24,K=>C('🌌 ดาบที่ผ่าฟ้า','ประตูมิติเหนือเมืองหลวงฉีกออก สิ่งที่อยู่อีกฝั่งกำลังมองลงมา จอมเวททั้งทวีปร่ายพร้อมกันแต่ไม่มีผล',[
  O('🗡️ รวมทุกธาตุในดาบเดียว',()=>{const m=MS(K);mgCombo('ทุกธาตุ ในฟันเดียว',sc=>{const ok=sc*.6+m.st.length/6*.4;if(ok>=.6){m.one=1;say(`🌌 <b>ดาบเดียวผ่าฟ้า</b> — แสง${m.st.map(i=>STC[i][1]).join(' ')}รวมเป็นเส้นเดียว ประตูมิติปิดลงพร้อมเสียงกรีดร้อง`,'myth',true);K.rep+=40}else say('🌌 ประตูปิดได้ครึ่งเดียว ดาบของคุณแตกเป็นเสี่ยง','bad',true)})},'มินิเกม',.7),
  O('🛡️ คุ้มกันจอมเวทให้ร่ายจนจบ',()=>feed('🛡️ ประตูปิดลงหลังสามวันสามคืน คุณไม่ได้นอนเลย'+rep(10)),'',.3)])]],
 yr:K=>{if(S.focus==='fa_blade'&&rnd()<.25){const m=MS(K);const L=[0,1,2,3,4,5].filter(i=>!m.st.includes(i));if(L.length){const i=pick(L);return()=>C(`${STC[i][0]} ท่าดาบธาตุ${STC[i][1]}`,`ระหว่างฝึก คุณรู้สึกว่าธาตุ${STC[i][1]}กำลังไหลเข้าใบดาบ ต้องจับจังหวะให้ทัน`,[O('🗡️ จับจังหวะ (มินิเกม)',()=>mgCombo(`ฝึกท่าธาตุ${STC[i][1]}`,sc=>{if(sc>=.5)learnSt(K,i);else feed('🗡️ หลุดมือ ดาบปักเพดาน')}),'',1)])}}return null},
 fin:(K,o)=>{const m=MS(K);if(m.one)o.push(O('🌌 แขวนดาบไว้บนฟ้า',()=>ending(K,'bl_one','คุณปักดาบไว้บนยอดเขาสูงสุด ทุกคืนมันเรืองแสงครบหกสี นักดาบเวทรุ่นใหม่นับพันเดินทางมาดูมันทุกปี','จากไปข้างดาบที่ผ่าฟ้า'),'🗝️ ฉากจบลับ',.1));
  if(m.kn||m.bridge)o.push(O('🛡️ เป็นดาบของทวีป',()=>ending(K,'bl_saint','ราชสำนักตั้งตำแหน่ง "ดาบศักดิ์สิทธิ์" ขึ้นใหม่สำหรับคุณคนเดียว วิทยาลัยเวทเปิดภาควิชาดาบเวทในปีถัดมา','จากไปในฐานะดาบศักดิ์สิทธิ์คนแรก'),'',.3));
  o.push(O('🍂 เดินทางเป็นนักดาบพเนจร',()=>ending(K,'bl_ronin',`คุณออกเดินทางกับ${m.talk?'ดาบที่พูดได้':'ดาบคู่ใจ'} ช่วยคนตามทางโดยไม่บอกชื่อ เรื่องเล่าของนักดาบที่ฟันเวทได้มีอยู่ในทุกโรงเตี๊ยม`,'จากไปกลางทาง ดาบยังอยู่ในมือ'),'',.25))},
 ends:[['bl_saint','🛡️','ดาบศักดิ์สิทธิ์แห่งทวีป','ได้รับการยอมรับจากราชสำนัก'],['bl_ronin','🍂','นักดาบพเนจรไร้ชื่อ','เลือกเส้นทางของตัวเอง'],['bl_one','🌌','ดาบเดียวผ่าฟ้า','รวมธาตุในดาบเดียวปิดประตูมิติ',1]]};
function learnSt(K,i){const m=MS(K);if(m.st.includes(i))return;m.st.push(i);K.pw+=capOf(K)*.04;feed(`${STC[i][0]} <b>ได้ท่าดาบธาตุ${STC[i][1]}</b> (${m.st.length}/6)`)}

// ---------- 😈 ปีศาจในร่าง ----------
const DOFF=[['⚔️','ยืมแขนข้าสักปี แล้วเจ้าจะไม่แพ้ใคร',K=>{K.pw+=capOf(K)*.2},12],['💰','ข้ารู้ว่าสมบัติโจรสลัดฝังอยู่ที่ไหน',K=>money(R(800,1500)),8],['🧠','ข้าจะกระซิบคำตอบข้อสอบให้',K=>{K.yrS+=40;S.int+=8},6],['❤️','ข้าจะทำให้คนที่เจ้าชอบมองเจ้า',K=>{const X=X3(K);if(X.love)X.love.h+=30;S.cha+=6},7],['🛡️','ข้าจะรับความตายแทนเจ้าหนึ่งครั้ง',K=>{K.save=(K.save|0)+1},15],['🔮','ข้าจะสอนเวทที่ไม่มีในตำรา',K=>{K.mpM+=25;K.dark+=5},10],['👁️','ข้าจะให้เจ้าเห็นความลับของทุกคนหนึ่งคืน',K=>{if(K.clue<3)feed(clue(K,'ปีศาจในร่างเคยเป็นมนุษย์'))},9],['😴','ให้ข้าคุมร่างแค่คืนเดียว ข้าอยากกินขนมหวาน',K=>{feed('🍰 เช้ามาคุณตื่นในร้านขนมกับใบเสร็จยาวสองเมตร'+money(-60))},3]];
MV.demon={ic:'😈',n:'ปีศาจในร่าง',p:12,d:'ปีศาจตนหนึ่งถูกผนึกไว้ในร่างคุณตั้งแต่เกิด มันคุยกับคุณได้ ยื่นข้อเสนอทุกปี และมันอดทนมาก',
 chip:K=>`😈 ปีศาจยึดร่าง ${MS(K).own}%${MS(K).dn?' · ชื่อ '+MS(K).dn:''}`,
 birth:K=>{K.dark=Math.max(K.dark,10);K.mpM+=15},
 ev:[
 [12,K=>C('😈 เสียงในหัว','"ในที่สุดเจ้าก็โตพอจะได้ยินข้า" เสียงหนึ่งดังขึ้นในหัว "เราอยู่ด้วยกันมาสิบสองปีแล้วนะ"',[
  O('🗣️ ถามชื่อมัน',()=>{MS(K).dn=pick(['มัลแวร์ส','ซีเรธ','บาอัล-โนวา','นิกซ์']);MS(K).bond=(MS(K).bond|0)+1;feed(`🗣️ "ข้าชื่อ <b>${MS(K).dn}</b>" มันดูแปลกใจที่มีคนถาม`)}),
  O('🙉 ไม่ฟัง ปิดหู',()=>feed('🙉 มันหัวเราะ "เราจะได้คุยกันอีกนาน"')),
  O('😤 บอกว่าร่างนี้เป็นของข้า',()=>{MS(K).own=Math.max(0,MS(K).own-5);feed('😤 มันเงียบไปหนึ่งเดือน')})])],
 [14,K=>C('🌙 คืนที่ร่างเดินเอง','คุณตื่นมาในป่าห่างจากหอพักสิบกิโล มือเปื้อนเลือด แต่ไม่ใช่เลือดของคุณ',[
  O('😰 ถามปีศาจว่าทำอะไรลงไป',()=>{const g=rnd()<.5;feed(g?'😈 "หมาป่ายักษ์จะกินเด็กในหมู่บ้าน ข้าแค่ช่วย" มันพูดเสียงเบาเหมือนอาย':'😈 "ข้าหิว" แค่นั้น'+dark(6));if(g)MS(K).bond=(MS(K).bond|0)+1}),
  O('⛓️ ล่ามตัวเองกับเตียงทุกคืน',()=>{MS(K).own=Math.max(0,MS(K).own-8);feed('⛓️ เพื่อนร่วมห้องเริ่มมองคุณแปลกๆ')})])],
 [15,K=>C('⛪ นักบวชล่าปีศาจ','นักบวชคนหนึ่งจ้องคุณตลอดพิธีในโบสถ์ หลังพิธีเขาเดินตามมา "ข้าได้กลิ่นกำมะถันจากเจ้า"',[
  O('🗣️ ตบตา (มินิเกมอ่านใจ)',()=>mgRead('ซ่อนปีศาจจากนักบวช','นักบวชล่าปีศาจ',sc=>feed(sc>=.55?'🗣️ เขาขอโทษแล้วเดินจากไป':'🗣️ เขาไม่เชื่อ และตามคุณมาทุกปีหลังจากนั้น'))),
  O('🙏 ขอให้ช่วยขับไล่',()=>{MS(K).exo=(MS(K).exo|0)+1;feed('🙏 นักบวชรับปากจะช่วย "แต่มันจะเจ็บ"')}),
  O('😈 ปล่อยให้ปีศาจคุยเอง',()=>{MS(K).own+=8;feed('😈 นักบวชวิ่งหนีไปพร้อมผมขาวโพลน ปีศาจหัวเราะทั้งคืน')})])],
 [17,K=>C('📜 ความทรงจำของปีศาจ','ระหว่างหลับ คุณฝันเห็นชีวิตของปีศาจตอนยังเป็นมนุษย์ — จอมเวทหนุ่มที่ถูกเพื่อนทรยศและผนึกวิญญาณเพื่อแลกพลัง',[
  O('🫂 บอกมันว่าเห็นแล้ว',()=>{MS(K).bond=(MS(K).bond|0)+2;feed('🫂 ปีศาจเงียบไปนาน แล้วพูดว่า "อย่าบอกใครนะ"')}),
  O('🗡️ ใช้จุดอ่อนนี้ข่มมัน',()=>{MS(K).own=Math.max(0,MS(K).own-15);MS(K).bond=(MS(K).bond|0)-2;feed('🗡️ ปีศาจหดตัวลงในมุมลึกสุดของใจคุณ')})])],
 [20,K=>C('🕯️ พิธีขับไล่',`${MS(K).exo?'นักบวชที่รับปากไว้กลับมา':'คุณเจอตำราขับไล่ปีศาจในหอสมุด'} พิธีต้องทำคืนพระจันทร์เต็มดวง ถ้าพลาด ปีศาจจะยึดร่างทันที`,[
  O('🕯️ ทำพิธี (มินิเกมรูน)',()=>mgRune('วาดวงขับไล่ให้ครบไม่พลาด',6,sc=>{const m=MS(K);if(sc>=.6){m.free=1;m.own=0;say(`🕯️ ${m.dn||'ปีศาจ'}ถูกดึงออกจากร่าง ${(m.bond|0)>=3?'มันหันมามองคุณครั้งสุดท้าย "ขอบใจที่เคยคุยกับข้า"':'มันกรีดร้องจนหน้าต่างทั้งโบสถ์แตก'}`,'epic',true);K.dark=Math.max(0,K.dark-20)}else{m.own+=30;say('🕯️ วงเวทแตก ปีศาจหัวเราะดังลั่นในหัว','bad',true)}}),'มินิเกม',.5),
  O('🤝 ไม่ทำแล้ว อยู่ด้วยกันต่อ',()=>{MS(K).bond=(MS(K).bond|0)+2;feed('🤝 ปีศาจถามว่า "ทำไม" คุณตอบว่า "ข้าชินแล้ว"')},'',.5)])],
 [25,K=>C('👑 ราชาปีศาจเรียกหา','ราชาปีศาจส่งทูตมาบอกว่าปีศาจในร่างคุณคือ "เจ้าชายที่หายไป" และอยากให้คุณมาที่บัลลังก์',[
  O('🏰 ไปพบราชาปีศาจ',()=>{MS(K).throne=1;MS(K).own+=10;feed('🏰 บัลลังก์ว่างสองที่ ราชาปีศาจยิ้ม "หนึ่งร่าง สองวิญญาณ พอดีเลย"')}),
  O('🗡️ ฆ่าทูต',()=>duel('ทูตปีศาจ',Math.round(threat(K)*1.1),w=>feed(w?'🗡️ ทูตสลายเป็นควัน'+rep(5):'🗡️ ทูตหัวเราะแล้วหายไป'+hurt(.25))))])]],
 yr:K=>{const m=MS(K);if(m.free)return null;m.own=cl(m.own+(rnd()<.5?R(1,4):0),0,100);
  if(m.own>=100&&!m.lostB){m.lostB=1;return()=>((m.bond|0)>=4?ending(K,'dm_king','วันที่ปีศาจยึดร่าง มันไม่ได้ขับคุณออก มันแค่นั่งข้างคุณ ทั้งสองวิญญาณขึ้นครองบัลลังก์ปีศาจด้วยกัน และสงครามระหว่างมนุษย์กับปีศาจจบลงในรัชสมัยนั้น','ครองบัลลังก์ปีศาจร่วมกับวิญญาณอีกดวงตลอดกาล'):ending(K,'dm_lost','คุณกลายเป็นผู้โดยสารในร่างตัวเอง มองดูปีศาจใช้ชีวิตของคุณอย่างสนุกสนาน มันเรียนจบด้วยเกียรตินิยม แต่งงาน และไม่เคยบอกใคร','ร่างยังมีชีวิต แต่คนที่อยู่ข้างในไม่ใช่คุณ'))}
  if(age()>=13&&rnd()<.5&&m.offY!==age()){m.offY=age();const o=shuf(DOFF).slice(0,2);return()=>C(`😈 ข้อเสนอประจำปีของ${m.dn||'ปีศาจ'}`,`"ปีนี้ข้ามีของดีมาเสนอ" · ปีศาจยึดร่างตอนนี้ ${m.own}%`,o.map(d=>O(`${d[0]} ${d[1]}`,()=>{m.own+=d[3];m.deal=(m.deal|0)+1;d[2](K);feed(`😈 ตกลง · ยึดร่าง +${d[3]}%`)},`ยึดร่าง +${d[3]}%`,.3)).concat([O('🙅 ไม่รับอะไรทั้งนั้น',()=>{m.own=Math.max(0,m.own-3);feed('🙅 ปีศาจถอนหายใจ "ปีหน้าค่อยว่ากัน"')},'',.4)]))}return null},
 fin:(K,o)=>{const m=MS(K);if(!m.free&&(m.bond|0)>=3)o.push(O('🤝 ร่างเดียว สองวิญญาณ',()=>ending(K,'dm_one',`คุณกับ${m.dn||'ปีศาจ'}ใช้ร่างเดียวกันจนแก่ ผลัดกันคุมร่างวันเว้นวัน มันชอบขนมหวาน คุณชอบนอน ไม่มีใครรู้ว่าวันไหนเป็นวันของใคร`,'จากไปพร้อมกัน สองวิญญาณในร่างเดียว'),'',.35));
  if(m.free)o.push(O('🕊️ ชีวิตที่เป็นของตัวเองทั้งหมด',()=>ending(K,'dm_free','หลังพิธีขับไล่ เสียงในหัวเงียบไปตลอดกาล บางคืนคุณยังคุยกับความเงียบนั้นอยู่ดี','จากไปอย่างสงบ ร่างและใจเป็นของตัวเอง'),'',.35))},
 ends:[['dm_one','🤝','ร่างเดียวสองวิญญาณ','ผูกพันกับปีศาจจนแยกไม่ออก'],['dm_free','🕊️','ร่างที่เป็นของตัวเอง','ขับไล่ปีศาจสำเร็จ'],['dm_lost','🫥','ผู้โดยสารในร่างตัวเอง','ปีศาจยึดร่าง 100%'],['dm_king','👑','บัลลังก์ของสองวิญญาณ','ยึดร่าง 100% แต่ผูกพันกันลึก',1]]};

// ---------- 🧪 ช่างยาไร้พลังต่อสู้ ----------
MV.alch={ic:'🧪',n:'ช่างยาไร้พลังต่อสู้',p:12,d:'เวทโจมตีของคุณอ่อนจนจุดเทียนไม่ติด แต่จมูกคุณแยกสมุนไพรได้สามพันชนิด และมือคุณไม่เคยสั่น',
 chip:K=>`🧪 สูตรยา ${MS(K).rec} · 🏪 ${MS(K).shop?'มีร้าน':'ยังไม่มีร้าน'}`,
 birth:K=>{K.pw=Math.max(4,K.pw-4);S.int+=12},
 ev:[
 [12,K=>C('🧪 ห้องปรุงยาวันแรก','อาจารย์ให้ปรุงยาแก้ไข้ธรรมดา ของคุณออกมาเป็นสีทองและส่งกลิ่นเหมือนฝนแรก',[
  O('⚗️ ปรุงให้สมบูรณ์ (มินิเกม)',()=>mgPotion('ปรุงยาแก้ไข้ระดับตำนาน',4,sc=>{if(sc>=.6){MS(K).rec++;K.yrS+=20;feed('⚗️ อาจารย์ชิมแล้วหายไข้ที่เป็นมาสิบปี')}else feed('⚗️ ยาระเบิดเป็นควันสีชมพู คิ้วหายไปข้างหนึ่ง')})),
  O('🤫 ปรุงให้ธรรมดาที่สุด',()=>feed('🤫 ได้คะแนนผ่าน ไม่มีใครสนใจ'))])],
 [14,K=>C('🏪 ร้านยาเล็กๆ','คุณเปิดแผงขายยาหลังวิทยาลัย ลูกค้าคนแรกเป็นนักผจญภัยที่ขาจะเน่า',[
  O('💊 รักษาฟรี',()=>{MS(K).shop=1;feed('💊 เขากลับมาพร้อมเพื่อนสามสิบคน ร้านคุณดังข้ามคืน'+rep(5))}),
  O('💰 คิดราคาเต็ม',()=>{MS(K).shop=1;feed('💰 ร้านคุณรวยตั้งแต่วันแรก'+money(200))})])],
 [16,K=>C('🕵️ ลูกค้าลึกลับ','ชายสวมหน้ากากขอซื้อ "ยาที่ทำให้คนหลับแล้วไม่ตื่น" เขาวางถุงทองหนักห้ากิโลบนโต๊ะ',[
  O('💀 ขายให้',()=>{money(2000);K.dark+=12;MS(K).poison=1;feed('💀 สามวันต่อมา ขุนนางคนหนึ่งตายในงานเลี้ยง')}),
  O('🥤 ขายยานอนหลับธรรมดาแทน (มินิเกมสลับถ้วย)',()=>mgCups('สลับขวดยาโดยไม่ให้เขาจับได้',sc=>{if(sc>=.5){money(800);feed('🥤 เขาไม่รู้ตัว ขุนนางหลับไปสิบสองชั่วโมงแล้วตื่นมาสบายดี')}else{feed('🥤 เขาจับได้ และสัญญาว่าจะกลับมา'+hurt(.2))}},'🧪')),
  O('🚨 แจ้งทหาร',()=>{feed('🚨 นักฆ่าถูกจับ ขุนนางส่งของขวัญมาขอบคุณ'+rep(8)+lootDrop(K,2,'ขุนนาง'))})])],
 [18,K=>C('⚔️ ขายยาให้ทั้งสองฝ่าย','สองแคว้นกำลังทำสงคราม ทั้งสองฝั่งต้องการยารักษา คุณเป็นช่างยาคนเดียวที่ทั้งคู่ไว้ใจ',[
  O('💰 ขายให้ทั้งสองฝั่ง',()=>{money(R(3000,5000));K.dark+=10;MS(K).war=1;feed('💰 คุณรวยที่สุดในรุ่น และสงครามลากยาวไปอีกสามปี')}),
  O('🕊️ ขายแค่ยาที่ทำให้ทั้งสองฝ่ายง่วง',()=>{MS(K).peace=1;feed('🕊️ ทหารทั้งสองฝั่งหลับพร้อมกันกลางสนามรบ ตื่นมาก็ลืมว่ารบกันทำไม'+rep(12))}),
  O('🙅 ไม่ยุ่ง',()=>feed('🙅 คุณปิดร้านหนึ่งปี'))])],
 [20,K=>C('🕳️ ดันเจี้ยนกับดัก','คุณต้องเข้าดันเจี้ยนไปเก็บรากสมุนไพรหายาก แต่สู้ไม่เป็น',[
  O('🪤 วางกับดักนำทาง (มินิเกมสลับถ้วย)',()=>mgCups('หาทางที่ไม่มีกับดัก',sc=>{if(sc>=.5){MS(K).rec++;feed('🪤 มอนสเตอร์ทุกตัวติดกับดักของคุณเอง'+lootDrop(K,3,'ดันเจี้ยน'))}else feed('🪤 คุณติดกับดักตัวเอง'+hurt(.3))},'🌿')),
  O('💨 ระเบิดควันแล้ววิ่ง',()=>mgPotion('ผสมระเบิดควันให้ทัน',3,sc=>feed(sc>=.5?'💨 วิ่งผ่านทั้งดันเจี้ยนมาได้'+((MS(K).rec++),''):'💨 ควันออกมาสีชมพูและหอมเกินไป มอนสเตอร์ตามกลิ่นมาทั้งฝูง'+hurt(.25))))])],
 [24,K=>C('🦠 โรคระบาดทั้งทวีป','โรคหินระบาดทั่วทวีป คนกลายเป็นหินทีละนิ้ว จอมเวทรักษาไม่ได้',[
  O('⚗️ ปรุงยาแก้ (มินิเกมยาก)',()=>mgPotion('ยาแก้โรคหิน',6,sc=>{const ok=sc*.6+Math.min(1,MS(K).rec/5)*.4;if(ok>=.55){MS(K).cure=1;say('⚗️ <b>ยาของคุณได้ผล</b> คนที่กลายเป็นหินครึ่งตัวกลับมาขยับนิ้วได้ ทั้งทวีปรู้จักชื่อคุณ','myth',true);K.rep+=40}else say('⚗️ ยาได้ผลแค่ชะลอโรค ครึ่งทวีปยังเป็นหิน','bad',true)}),'มินิเกม',.7),
  O('💰 ขายยาชะลอโรคราคาแพง',()=>{money(6000);K.dark+=15;feed('💰 คุณรวยจนซื้อเมืองได้ คนจนกลายเป็นหินกันทั้งหมู่บ้าน')},'',.3)])],
 [28,K=>C('♾️ สูตรยาอมตะ','ในตำราเก่าที่ซื้อมาจากตลาดมืด มีสูตรยาอมตะที่ต้องใช้ส่วนผสมเก้าอย่าง หนึ่งในนั้นคือ "ความทรงจำที่รักที่สุด"',[
  O('🧪 ปรุง',()=>mgPotion('ยาอมตะ',7,sc=>{if(sc>=.65){MS(K).elix=1;K.endY+=200;S.mw.end=K.endY;say('♾️ ยาสำเร็จ คุณดื่มมัน แล้วจำไม่ได้ว่าเคยรักใคร','myth',true)}else ending(K,'al_boom','ห้องทดลองระเบิดสว่างจนเห็นได้จากอีกแคว้น ที่เหลือคือหลุมขนาดเท่าทะเลสาบที่มีกลิ่นสมุนไพรสามพันชนิด','ห้องทดลองระเบิดระหว่างปรุงยาอมตะ')}),'⚠️ เสี่ยงตาย',.4),
  O('🔥 เผาตำราทิ้ง',()=>feed('🔥 บางอย่างไม่ควรมีอยู่'),'',.6)])]],
 yr:K=>{if(S.focus==='fa_brew'){const m=MS(K);if(m.shop)money(R(60,160)*(1+m.rec*.2))}return null},
 fin:(K,o)=>{const m=MS(K);if(m.elix)o.push(O('♾️ ดื่มยาอมตะต่อไป',()=>ending(K,'al_elixir','คุณมีชีวิตอยู่ดูอาณาจักรเกิดและล่มสามรอบ ร้านยาเล็กๆ หลังวิทยาลัยยังเปิดอยู่ เจ้าของร้านไม่เคยแก่ และไม่เคยยิ้ม','ยังไม่ตาย'),'🗝️ ฉากจบลับ',.1));
  if(m.cure)o.push(O('⚗️ ผู้หยุดโรคระบาด',()=>ending(K,'al_cure','รูปปั้นของคุณตั้งอยู่ทุกเมือง มือถือขวดยาแทนดาบ เด็กทุกคนในทวีปรู้ว่าช่างยาคนหนึ่งช่วยโลกโดยไม่เคยจับดาบ','แก่ตายในร้านยาที่ไม่เคยปิด'),'',.3));
  if((S.money||0)>=8000)o.push(O('💰 เศรษฐีที่ไม่เคยจับดาบ',()=>ending(K,'al_rich','คุณกลายเป็นคนรวยที่สุดในทวีปด้วยขวดยาเล็กๆ จอมเวทผู้ยิ่งใหญ่ทุกคนเป็นหนี้คุณ','จากไปบนกองทองที่ไม่มีใครกล้าแตะ'),'',.3))},
 ends:[['al_rich','💰','เศรษฐีที่ไม่เคยจับดาบ','รวยด้วยขวดยา'],['al_cure','⚗️','ผู้หยุดโรคระบาด','ปรุงยาแก้โรคหิน'],['al_boom','💥','ห้องทดลองระเบิด','ยาอมตะล้มเหลว'],['al_elixir','♾️','ร้านยาที่ไม่เคยปิด','ดื่มยาอมตะสำเร็จ',1]]};

// ---------- 🌀 จอมเวทย้อนเวลา ----------
const FUT={war:['⚔️','สงครามชายแดน','ชาติก่อนคุณเสียแขนซ้ายในสงครามนี้'],friend:['🩸','คืนที่เพื่อนรักถูกฆ่า','ชาติก่อนคุณมาถึงช้าไปห้านาที'],teacher:['🐍','อาจารย์ทรยศ','ชาติก่อนอาจารย์ที่คุณเคารพที่สุดขายวิทยาลัยให้ศัตรู'],plague:['🦠','โรคใบไม้ดำ','ชาติก่อนครึ่งเมืองตายเพราะไม่มีใครรู้ว่ายาคือรากต้นหลิว'],dragon:['🐉','มังกรถล่มเมืองหลวง','ชาติก่อนคุณหนีรอดคนเดียว'],death:['💀','วันที่คุณตาย','ชาติก่อนคุณถูกแทงข้างหลังตอนอายุ 33 ไม่เคยเห็นหน้าคนแทง']};
function rgShift(K){const m=MS(K);m.dist=cl(m.dist+R(8,16),0,100);if(rnd()<m.dist/120){const L=m.fut.filter(f=>!f.done&&f.id!=='death'&&f.id!=='unknown');if(L.length){const f=pick(L);if(rnd()<.5){f.a+=R(-2,3);f.a=Math.max(age()+1,f.a);feed(`🌀 <i>บางอย่างเปลี่ยนไป… ${FUT[f.id][1]}จะไม่เกิดตอนที่คุณจำได้อีกแล้ว</i>`)}else{f.id='unknown';feed('🌀 <i>ความทรงจำเรื่องหนึ่งเลือนหายไป เหมือนอนาคตนั้นไม่เคยมีอยู่</i>')}}}}
MV.regress={ic:'🌀',n:'จอมเวทย้อนเวลา',p:12,d:'ชาติก่อนคุณถูกแทงข้างหลังตอนอายุ 33 แล้วลืมตาอีกครั้งในร่างทารก ชีวิตเดิมเริ่มใหม่ตั้งแต่ต้น คุณจำอนาคตได้… อย่างน้อยก็ตอนนี้',
 chip:K=>{const m=MS(K),n=m.fut.filter(f=>!f.done&&f.a>age()).sort((a,b)=>a.a-b.a)[0];return `🌀 ความเพี้ยน ${m.dist}%${n?` · ถัดไป ${n.id==='unknown'?'❓':FUT[n.id][0]} อายุ ${m.dist>=50?'??':n.a}`:''}`},
 birth:K=>{const m=MS(K);m.fut=[['war',15],['friend',18],['teacher',21],['plague',24],['dragon',28],['death',33]].map(x=>({id:x[0],a:x[1]+R(-1,1)}));m.prep={};S.int+=10;K.mpM+=10},
 ev:[
 [12,K=>C('🌀 ตื่นมาอีกครั้ง','หลังวัยเด็กรอบสอง คุณกลับมายืนในหอพักนักเรียนปีหนึ่งอีกครั้ง หลังยังจำความเจ็บของมีดได้ ชีวิตนี้คุณจะใช้ความรู้อนาคตไปกับอะไรก่อน',[
  O('🛡️ เตรียมรับสงคราม ฝึกหนักตั้งแต่วันนี้',()=>{MS(K).prep.war=1;K.pw+=capOf(K)*.12;feed('🛡️ คุณฝึกจนเพื่อนร่วมห้องคิดว่าคุณบ้า')}),
  O('🫂 เข้าหาเพื่อนที่ชาติก่อนตายเร็ว',()=>{MS(K).prep.friend=1;aff(K,'pal',15);feed(`🫂 ${N(K,'pal')}งงว่าทำไมคุณถึงรู้ว่าเขาชอบกินอะไร`);rgShift(K)}),
  O('💰 ใช้ความรู้อนาคตหาเงิน',()=>{money(R(800,1500));rgShift(K);feed('💰 คุณรู้ว่าเหมืองไหนจะเจอแร่ ซื้อหุ้นไว้ตั้งแต่ราคายังเป็นเศษเหรียญ')})])],
 [13,K=>C('🌿 รากต้นหลิว','คุณจำได้ว่าอีกหลายปีจะมีโรคระบาด และยาคือรากต้นหลิวที่ตอนนี้ยังไม่มีใครสนใจ',[
  O('🌿 ปลูกต้นหลิวไว้รอบเมือง',()=>{MS(K).prep.plague=1;rgShift(K);feed('🌿 ชาวเมืองคิดว่าคุณเป็นนักเรียนที่รักต้นไม้มากเกินไป')}),
  O('📜 เขียนตำราทิ้งไว้ในห้องสมุดโดยไม่ลงชื่อ',()=>{MS(K).prep.plague=1;feed('📜 คุณซ่อนตำราไว้ในชั้นที่บรรณารักษ์ไม่เคยปัดฝุ่น')})])],
 [14,K=>C('👤 คนที่ไม่ควรมีอยู่','มีนักเรียนคนหนึ่งในห้องที่ชาติก่อนไม่มีอยู่ เขามองคุณแปลกๆ เหมือนรู้ว่าคุณจำอะไรได้',[
  O('🗣️ เข้าไปถามตรงๆ (มินิเกมอ่านใจ)',()=>mgRead('อ่านใจคนที่ไม่ควรมีอยู่','นักเรียนปริศนา',sc=>{if(sc>=.55){MS(K).other=1;feed('🗣️ เขาย้อนเวลามาเหมือนคุณ แต่เขาย้อนมาแล้ว 17 ครั้ง "ทุกรอบเจ้าตายตอน 33 ข้าอยากรู้ว่ารอบนี้จะต่างไหม"')}else{feed('🗣️ เขายิ้ม ไม่ตอบอะไร');MS(K).dist+=10}})),
  O('👀 จับตาดูห่างๆ',()=>feed('👀 เขารู้ตัวทุกครั้ง'))])],
 [15,K=>C('🎲 เดิมพันกับอนาคต','งานแข่งม้าบินประจำปี คุณจำได้ว่าม้าตัวไหนชนะ… หรือจำได้ใช่ไหม',[
  O('💰 ทุ่มหมดตัว',()=>{if(MS(K).dist<40||rnd()<.5){money(Math.max(500,(S.money||0)));feed('💰 ชนะ! เงินเพิ่มเป็นสองเท่า')}else{S.money=0;feed('💰 ม้าตัวนั้นล้มกลางทาง… อนาคตไม่เหมือนเดิมแล้ว')}rgShift(K)}),
  O('🪙 แทงนิดหน่อยพอ',()=>{money(150);feed('🪙 ได้ค่าขนม')})])]],
 yr:K=>{const m=MS(K),f=m.fut.filter(x=>!x.done&&x.a<=age()).sort((a,b)=>a.a-b.a)[0];if(!f)return null;f.done=1;return()=>rgEv(K,f.id)},
 fin:(K,o)=>{const m=MS(K);if(m.beyond&&m.dist>=70)o.push(O('⏳ เฝ้าเส้นเวลา',()=>ending(K,'rg_keeper','อนาคตเพี้ยนไปจนไม่มีใครจำได้ว่าเส้นเวลาเดิมเป็นแบบไหน ยกเว้นคุณ คุณกลายเป็นผู้เฝ้าเวลา คอยแก้รอยฉีกของโลกที่คุณเคยฉีกเอง','ไม่ได้ตาย แค่ออกไปนอกเวลา'),'🗝️ ฉากจบลับ',.1));
  if(m.beyond)o.push(O('🌅 ใช้ชีวิตหลังวันตาย',()=>ending(K,'rg_beyond','ทุกวันหลังคืนนั้น คือวันที่คุณไม่เคยเห็นมาก่อน คุณตื่นเช้าทุกวันด้วยความตื่นเต้นเหมือนเด็ก','แก่ตายในอนาคตที่ไม่มีใครรู้มาก่อน'),'',.35))},
 ends:[['rg_beyond','🌅','ชีวิตหลังวันตาย','รอดวันตายที่จำได้'],['rg_loop','🔁','ย้อนอีกรอบ','ตายในคืนเดิมอีกครั้ง'],['rg_save','🕯️','คนที่หายไปจากเส้นเวลา','แลกตัวเองเพื่อให้ทุกคนรอด'],['rg_keeper','⏳','ผู้เฝ้าเวลา','รอดวันตาย + ความเพี้ยนสูง',1]]};
function rgEv(K,id){const m=MS(K),p=m.prep||{};const F=FUT[id];
 if(id==='unknown')return C('❓ สิ่งที่ไม่เคยเกิดในชาติก่อน',pick(['ภูเขาลูกหนึ่งหายไปจากแผนที่ในคืนเดียว','อาจารย์ที่ชาติก่อนตายไปแล้ว เดินเข้ามาในห้องเรียน','ท้องฟ้ามีดวงจันทร์ดวงที่สาม']),[O('🔍 สืบ',()=>mgRune('ต่อเศษความทรงจำที่ไม่มีอยู่',5,sc=>feed(sc>=.55?'🔍 คุณพบว่ามันเกิดเพราะสิ่งที่คุณเปลี่ยนเมื่อหลายปีก่อน'+(K.clue<3?clue(K,'การย้อนเวลาทิ้งรอยฉีกไว้ในโลก'):''):'🔍 ไม่มีคำตอบ มีแต่คำถามมากขึ้น'))),O('🙈 ปล่อยไป',()=>feed('🙈 คุณเรียนรู้ที่จะอยู่กับอนาคตที่ไม่รู้'))]);
 if(id==='war')return C(`${F[0]} ${F[1]}`,`${F[2]} · วันนี้มาถึงแล้ว`,[
  O('🧠 ใช้ความรู้อนาคตวางกับดัก (มินิเกม)',()=>mgRead('อ่านแผนแม่ทัพศัตรูที่คุณจำได้','แม่ทัพศัตรู',sc=>{if(sc+(p.war?.2:0)>=.55){m.saved=(m.saved|0)+1;say('🧠 กองทัพศัตรูเดินเข้ากับดักทุกจุด แขนซ้ายของคุณยังอยู่ครบ','epic',true);rgShift(K)}else{S.maxHp=Math.round(S.maxHp*.85);say('🧠 อนาคตเพี้ยนไปจากที่จำได้ คุณเสียแขนซ้ายอีกครั้ง','bad',true)}})),
  O('🏃 หนีก่อนสงครามเริ่ม',()=>{feed('🏃 คุณรอดครบสามสิบสอง แต่เพื่อนร่วมรุ่นครึ่งหนึ่งไม่ได้กลับมา'+dark(6));rgShift(K)})]);
 if(id==='friend')return C(`${F[0]} ${F[1]}`,`${F[2]} · คืนนี้คือคืนนั้น ${N(K,'pal')}กำลังเดินกลับหอคนเดียว`,[
  O('🏃 วิ่งไปให้ทัน (มินิเกมกดรัว)',()=>mgMash('วิ่งให้ทันก่อนห้านาที',sc=>{if(sc+(p.friend?.25:0)>=.6){m.saved=(m.saved|0)+1;say(`🏃 คุณมาทันพอดี มือคนร้ายยังไม่ทันแตะ${N(K,'pal')} — ชีวิตนี้เพื่อนรักของคุณได้เห็นพรุ่งนี้เป็นครั้งแรก`,'epic',true);aff(K,'pal',20);rgShift(K)}else say('🏃 คุณมาช้าไปห้านาทีอีกครั้ง… เหมือนเดิมทุกอย่าง','bad',true)})),
  O('🛡️ ชวนเพื่อนมานอนห้องคุณตั้งแต่หัวค่ำ',()=>{if(rnd()<.6){m.saved=(m.saved|0)+1;feed('🛡️ คืนนั้นผ่านไปเงียบๆ เพื่อนบ่นว่าคุณกรน');rgShift(K)}else feed('🛡️ เพื่อนปฏิเสธ… และออกไปเดินคนเดียวตอนตีสอง'+dark(5))})]);
 if(id==='teacher')return C(`${F[0]} ${F[1]}`,`${F[2]} · คืนนี้เขาจะเปิดประตูผนึกให้ศัตรู`,[
  O('📜 เปิดโปงต่อหน้าสภา (มินิเกมอ่านใจ)',()=>mgRead('ทำให้สภาเชื่อเรื่องที่ยังไม่เกิด','สภาวิทยาลัย',sc=>{if(sc>=.55){m.saved=(m.saved|0)+1;say('📜 สภาจับอาจารย์ได้คาหนังคาเขา เขาถามคุณว่า "เจ้ารู้ได้ยังไง"','epic',true);rgShift(K)}else feed('📜 ไม่มีใครเชื่อ… คืนนั้นวิทยาลัยถูกเผาครึ่งหนึ่ง'+hurt(.2))})),
  O('🗡️ จัดการเขาก่อนที่เขาจะทำ',()=>{K.dark+=15;m.saved=(m.saved|0)+1;rgShift(K);feed('🗡️ อาจารย์ตายก่อนจะได้ทรยศ ไม่มีใครรู้ว่าเขาเคยจะทำอะไร มีแค่คุณที่รู้ว่าตัวเองฆ่าคนบริสุทธิ์… ในเส้นเวลานี้')}),
  O('🗣️ คุยกับเขาก่อน',()=>{if(rnd()<.5){m.saved=(m.saved|0)+1;feed('🗣️ เขาถูกขู่ว่าจะฆ่าลูกสาว คุณช่วยลูกสาวเขาออกมาแทน เขาร้องไห้');rgShift(K)}else feed('🗣️ เขายิ้มแล้วพูดว่า "เจ้าก็เป็นผู้ย้อนเวลาเหมือนกันสินะ"'+hurt(.3))})]);
 if(id==='plague')return C(`${F[0]} ${F[1]}`,`${F[2]}`,[
  O(p.plague?'🌿 ใช้ต้นหลิวที่เตรียมไว้':'⚗️ ปรุงยาจากความจำ (มินิเกม)',()=>{if(p.plague){m.saved=(m.saved|0)+1;say('🌿 ต้นหลิวที่คุณปลูกไว้ตั้งแต่เด็กช่วยทั้งเมือง ไม่มีใครตายเลยสักคน','epic',true);K.rep+=20}else mgPotion('ยาจากรากต้นหลิว',4,sc=>{if(sc>=.6){m.saved=(m.saved|0)+1;feed('⚗️ ยาได้ผล'+rep(10))}else feed('⚗️ ยาได้ผลช้าเกินไปสำหรับครึ่งเมือง'+dark(5))})})]);
 if(id==='dragon')return C(`${F[0]} ${F[1]}`,`${F[2]} · มังกรอยู่เหนือเมืองแล้ว`,[
  O('🐉 สู้',()=>duel('มังกรดำ',Math.round(threat(K)*1.3),w=>{if(w){m.saved=(m.saved|0)+1;say('🐉 ชาติก่อนคุณหนี ชาตินี้มังกรตกลงกลางจัตุรัส','myth',true);K.rep+=25}else feed('🐉 คุณหนีรอดคนเดียวอีกครั้ง'+hurt(.4))}),'ต่อสู้',.6),
  O('🔔 อพยพทุกคนก่อนมังกรมาถึง',()=>{m.saved=(m.saved|0)+1;feed('🔔 เมืองพัง แต่ไม่มีใครตาย คนเรียกคุณว่า "ผู้ทำนาย"')},'',.4)]);
 if(id==='death'){const who=m.dist>=60?'ตัวคุณเองจากเส้นเวลาอื่น':m.other?'นักเรียนที่ย้อนเวลามา 17 ครั้ง':pick([`${npc(K,'pal').n} เพื่อนที่คุณช่วยไว้`,'อาจารย์ที่คุณไว้ใจ','คนที่คุณไม่เคยเห็นหน้า']);
  return C(`${F[0]} ${F[1]}`,`${F[2]} · คืนนี้คุณได้ยินเสียงฝีเท้าข้างหลัง และครั้งนี้คุณหันไปทัน — <b>${E(who)}</b>`,[
   O('⚔️ สู้เพื่อมีชีวิตหลังวันตาย (มินิเกม 2 ด่าน)',()=>{let t=0;mgDuel('ปะทะคนที่แทงคุณ',who,a=>{t+=a;mgHold('รวบรวมเวทครั้งสุดท้าย',b=>{t+=b;const ok=t/2+(m.saved|0)*.04;if(ok>=.6){m.beyond=1;K.endY=Math.max(K.endY,age()+R(15,30));S.mw.end=K.endY;say(`🌅 <b>คุณรอดคืนที่ตายมาแล้วหนึ่งชาติ</b> พรุ่งนี้คือวันแรกที่คุณไม่รู้ว่าจะเกิดอะไร`,'myth',true)}else ending(K,'rg_loop',`มีดแทงเข้าหลังในจุดเดิม… คุณลืมตาอีกครั้งในหอพักปีหนึ่ง อายุ 12 อีกแล้ว รอบนี้คุณจำได้มากกว่าเดิม`,'ถูกแทงตอนอายุ 33 อีกครั้ง แล้วย้อนกลับไปเริ่มใหม่')})})},'',.7),
   O('🕯️ แลกตัวเองให้เส้นเวลาที่ทุกคนรอด',()=>ending(K,'rg_save',`คุณปล่อยให้มีดแทง แต่ครั้งนี้ใช้เวทสุดท้ายผูกชีวิตตัวเองกับเส้นเวลา ทุกคนที่คุณช่วยไว้ ${m.saved|0} ครั้ง จะไม่มีวันถูกย้อนกลับ ไม่มีใครจำคุณได้ แต่ทุกคนมีชีวิตอยู่`,'หายไปจากเส้นเวลาเพื่อให้คนอื่นรอด'),'',.3)])}}

// =================== ระบบรวมชะตาพิเศษ ===================
for(const k in MV)for(const e of MV[k].ends)MVEND(e[0],e[1],e[2],e[3],e[4]);
{const MX={muscle:[14,17],reborn:[13,16,null,null,null,null,null],hidden:[13],blade:[15,17],demon:[14],alch:[14],regress:[13]};for(const k in MX)MX[k].forEach((v,i)=>{if(v&&MV[k].ev[i])MV[k].ev[i][2]=v})}
function mvAssign(K){if(K.w!=='magic'||K.mv!==undefined)return;const L=Object.keys(MV),tot=L.reduce((a,k)=>a+MV[k].p,0)+8;let r=rnd()*tot,k=null;for(const x of L){r-=MV[x].p;if(r<0){k=x;break}}
 try{if(window._mvForce)k=window._mvForce}catch(e){}K.mv=k;if(!k)return;MS(K);MV[k].birth(K);recalcE(K);if(K.noMana){K.mpM=0;K.mp=0}
 say(`${MV[k].ic} <b>ชะตาพิเศษ: ${MV[k].n}</b> — ${MV[k].d}`,'myth',true)}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(K)mvAssign(K);sync();render();saveGame()}catch(e){console.error('mv',e)}},1400)}}
FOK.magic.push(['fa_lift','🏋️','ฝึกกล้าม',K=>K.mv==='muscle'],['fa_blade','🗡️','ฝึกดาบเวท',K=>K.mv==='blade'],['fa_brew','⚗️','ปรุงยาขาย',K=>K.mv==='alch'],['fa_talk','😈','คุยกับปีศาจ',K=>K.mv==='demon'&&!MS(K).free],['fa_core','🧘','บ่มแกนมานา',K=>K.mv==='reborn'],['fa_fut','📓','จดอนาคตที่จำได้',K=>K.mv==='regress']);
{const _df=doFocus;doFocus=function(K){const f=S.focus,m=K.mv?MS(K):null;
 if(f==='fa_lift'){const g=R(6,12);m.mus+=g;K.pw+=Math.max(2,m.mus*.04);S.maxHp+=3;return feed(`🏋️ ${pick(['วิดพื้นบนนิ้วโป้งข้างเดียว','แบกหินเวทวิ่งรอบวิทยาลัย','สควอทพร้อมแบกเพื่อนสามคน','ดึงข้อกับกิ่งต้นไม้พันปี'])} · กล้าม +${g} (${m.mus})${rnd()<.15?' · มีคนเห็น… ความลับ +5%':''}`),void(rnd()<.15&&(m.sus+=5))}
 if(f==='fa_blade'){K.pw+=K.pw<capOf(K)?(capOf(K)-K.pw)*.14:R(1,3);return feed(`🗡️ ฝึกอัดเวทเข้าดาบ${pick(['ใต้น้ำตก','กลางพายุ','บนหลังคาหอพัก','กับหุ่นฟางที่ร่ายเวทได้'])}`)}
 if(f==='fa_brew'){if(rnd()<.25){m.rec++;feed(`⚗️ คิดค้นสูตรยาใหม่: ${pick(['ยาหายใจใต้น้ำ','ยาทำให้ผมยาว','ยาที่ทำให้ไม่กลัวความสูง','ยาฟังภาษาแมว','ยาลืมคนรักเก่า'])} · สูตรยา ${m.rec}`)}else feed(`⚗️ ปรุงยาขาย${m.shop?'':' (ยังไม่มีร้าน ขายตามถนน)'}${money(R(30,90)*(1+m.rec*.15))}`);return}
 if(f==='fa_talk'){m.bond=(m.bond|0)+1;return feed(`😈 คุยกับ${m.dn||'ปีศาจ'}เรื่อง${pick(['ขนมหวานที่มันอยากกิน','ชีวิตตอนเป็นมนุษย์','ทำไมดวงจันทร์มีสองดวง','คนที่มันเคยรัก'])} · ความผูกพัน ${m.bond}`)}
 if(f==='fa_core'){m.cx+=R(14,22);return feed(`🧘 บ่มแกนมานา${CORE[m.core][1]}จนรอบตัวมีประกาย · ${m.cx}/${100+m.core*25}`)}
 if(f==='fa_fut'){const n=m.fut.filter(x=>!x.done).sort((a,b)=>a.a-b.a)[0];if(n&&rnd()<.5){const id=n.id;if(id!=='unknown'&&id!=='death'&&!m.prep[id]){m.prep[id]=1;rgShift(K)}return feed(`📓 คุณจดรายละเอียด${n.id==='unknown'?'เรื่องที่เลือนไป':'「'+FUT[n.id][1]+'」'}จนจำได้แม่นขึ้น${n.id!=='unknown'&&n.id!=='death'?' · เตรียมรับมือแล้ว':''}`)}return feed('📓 คุณนั่งจดอนาคตจนหมึกหมดขวด แต่ความทรงจำบางส่วนเริ่มเลือน')}
 return _df(K)}}
{const _r=mgRing;mgRing=function(t,cb){if(mvK()==='muscle')return mgHold(`💪 ${t} (ด้วยกล้ามแทนเวท)`,cb);return _r.apply(this,arguments)}}
{const _r=mgRune;mgRune=function(t,n,cb){if(mvK()==='muscle')return mgMash(`💪 ${t} (ด้วยกล้ามแทนเวท)`,cb);return _r.apply(this,arguments)}}
{const _o=overcast;overcast=function(K){if(K&&K.noMana){MS(K).mus+=2;return{ok:1,t:' · 💪 คุณใช้กล้ามทำแทนเวท ไม่มีใครดูออก'}}return _o.apply(this,arguments)}}
{const _x=xFin;xFin=function(K,o){_x(K,o);try{if(K.w==='magic'&&K.mv&&MV[K.mv]){MV[K.mv].fin(K,o);const m=MS(K);if((m.dfr|0)<2&&age()<50)o.push(O('🚶 ยังไม่ใช่ตอนจบของคุณ',()=>{m.dfr=(m.dfr|0)+1;K.arcAt=age()+R(5,8);feed(`🚶 คุณเดินออกจากห้องประชุม ${MV[K.mv].ic} เรื่องของคุณยังไม่จบ (เลื่อนได้อีก ${2-m.dfr} ครั้ง)`)},'ใช้ชีวิตต่อ เรื่องราวของชะตายังเดินหน้า',.2))}}catch(e){console.error('mvfin',e)}}}
{const _fy=fanYear;fanYear=function(){const K=FN();const a0=S.age;_fy.apply(this,arguments);if(!K||!S.alive||S.age===a0||K.end||K.w!=='magic')return;
 try{if(K.mv===undefined){if(age()<=14)mvAssign(K);else K.mv=null}if(!K.mv)return;const V=MV[K.mv],m=MS(K);if(K.noMana){K.mpM=0;K.mp=0}
  if(!m.sn[0]&&age()<=(V.ev[0][2]||14)){m.sn[0]=1;queue(()=>V.ev[0][1](K));if(!FL)flush();return}
  const pr=V.yr(K);if(pr){queue(pr);if(!FL)flush();return}
  const L=V.ev.map((e,i)=>[e,i]).filter(x=>!m.sn[x[1]]&&age()>=x[0][0]&&(!x[0][2]||age()<=x[0][2]));
  if(!m.sn[0]&&L.length&&L[0][1]===0){m.sn[0]=1;queue(()=>V.ev[0][1](K));if(!FL)flush()}
  else if(L.length&&QU.length<=2&&rnd()<.6){const x=pick(L.slice(0,3));m.sn[x[1]]=1;queue(()=>x[0][1](K));if(!FL)flush()}
  try{render()}catch(e){}}catch(e){console.error('mv year',e)}}}
{const _hd=hud;hud=function(K){let h=_hd(K);try{if(K.w==='magic'&&K.mv&&MV[K.mv]){const V=MV[K.mv];h=h.replace('<div class="fhC">',`<div class="fhC"><span class="t5">${V.ic} ${V.n}</span><span class="t4">${V.chip(K)}</span>`);if(K.noMana){const mu=MS(K).mus;h=h.replace(/<div class="fhB mp">[\s\S]*?<\/div><span>[^<]*<\/span><\/div>/,`<div class="fhB mp"><span>💪</span><div class="bar"><i style="width:${cl(mu/3,0,100)}%;background:linear-gradient(90deg,#f39c12,#e74c3c)"></i></div><span>กล้าม ${mu}</span></div>`)}}}catch(e){}return h}}
window._fan5={QU,fl:()=>FL,MV,MS,mvAssign,mgMash,mgHold,mgCombo,mgCups,rgEv,rgShift};


// ####################################################################
// ภาค 6: ชะตาพิเศษของต่างโลก + อะคาเดมี่ · ดันเจี้ยนเลือกทาง · หน้าต่างระบบ
// ####################################################################
const MVX={};
const MVXW={iso:['hero','trash','lost'],noble:['noble']};
// ---------- 🕷️ วิญญาณมอนสเตอร์ ----------
const MONB={spider:['🕷️','แมงมุม',{meat:['🕷️','ราชินีแมงมุมพันตา'],magic:['🕸️','อารัคเนจอมเวท'],poison:['☠️','แมงมุมพิษนรก']}],slime:['🟢','สไลม์',{meat:['🟥','สไลม์กลืนกองทัพ'],magic:['🔷','สไลม์ราชันผลึก'],poison:['🟣','สไลม์พิษที่ทุกคนกลัว']}],bone:['💀','โครงกระดูก',{meat:['🦴','อัศวินกระดูกยักษ์'],magic:['👑','ลิชจักรพรรดิ'],poison:['⚰️','ราชาแห่งหลุมศพ']}]};
const MDIET={meat:['🍖','กินเนื้อมอนสเตอร์'],magic:['💠','กินแกนเวท'],poison:['🧪','กินพิษ']};
const monN=m=>{const b=MONB[m.base];if(m.form<3)return b[0]+' '+b[1]+['วัยอ่อน','โตเต็มวัย','ร่างกลาง'][m.form];const k=Object.keys(m.eat).sort((a,c)=>m.eat[c]-m.eat[a])[0];return b[2][k].join(' ')};
MVX.monster={w:'iso',ic:'🕷️',n:'วิญญาณมอนสเตอร์',p:12,d:'วงเวทอัญเชิญพังครึ่งหนึ่ง วิญญาณคุณถูกผูกกับมอนสเตอร์ตัวหนึ่ง คุณแปลงร่างได้ และร่างนั้นวิวัฒนาการตามสิ่งที่กิน แต่ยิ่งใช้นาน ยิ่งกลับเป็นคนยาก',
 chip:K=>`${monN(MS(K))} · 🐾 ความเป็นสัตว์ ${MS(K).beast|0}%`,
 birth:K=>{const m=MS(K);m.base=pick(Object.keys(MONB));m.form=0;m.eat={meat:0,magic:0,poison:0};m.beast=0;K.pw+=6},
 ev:[
 [0,K=>C('🕷️ ร่างแรก',`คืนแรกในต่างโลก โจรบุกค่ายผู้กล้า คุณรู้สึกบางอย่างฉีกออกจากผิว แล้วกลายเป็น${monN(MS(K))}`,[
  O('🐾 ปล่อยสัญชาตญาณ',()=>{const m=MS(K);m.beast+=10;feed(`🐾 โจรหายไปทั้งกลุ่ม เหลือแต่รองเท้า เพื่อนร่วมห้องตื่นมาเห็นรอยเท้า${MONB[m.base][1]}ทั่วค่าย`)}),
  O('😰 ฝืนกลับร่างคน',()=>mgMash('ฝืนกลับร่างมนุษย์',sc=>{if(sc>=.6)feed('😰 คุณกลับเป็นคนทันก่อนใครเห็น เปลือยกลางค่าย…');else{MS(K).beast+=15;feed('😰 กลับไม่ทัน เพื่อนคนหนึ่งเห็นและกรีดร้อง')}}))])],
 [0,K=>C('⚔️ เพื่อนร่วมห้องรับเควสล่ามอนสเตอร์',`กิลด์ประกาศล่า "${MONB[MS(K).base][1]}ปริศนาที่เดินในเมืองตอนกลางคืน" และ${N(K,'rival')}รับเควสนั้น`,[
  O('🐾 สู้ในร่างมอนสเตอร์',()=>duel(npc(K,'rival').n,Math.round(threat(K)*1.1),w=>{const m=MS(K);m.beast+=8;if(w){m.spare=1;feed('🐾 คุณชนะ แต่ไม่ฆ่า มองตาเขานิ่งๆ เขาจำแววตานั้นได้…')}else feed('🐾 คุณหนีเข้าป่าพร้อมแผลจากดาบเพื่อน'+hurt(.3))}),'ต่อสู้'),
  O('🙋 เข้ากลุ่มล่าเอง แล้วพาไปผิดทาง',()=>mgRead('พากลุ่มล่าหลงทาง',npc(K,'rival').n,sc=>feed(sc>=.55?'🙋 กลุ่มล่าตามหาตัวคุณเองสามวันสามคืนแล้วกลับมามือเปล่า':'🙋 เขาเริ่มสงสัยว่าทำไมคุณรู้ทางป่าดีจัง')))])],
 [17,K=>C('🏡 เทพผู้พิทักษ์หมู่บ้าน','ชาวบ้านหมู่บ้านหนึ่งเห็นร่างมอนสเตอร์ของคุณไล่หมาป่า ตอนนี้พวกเขาตั้งศาลและวางของเซ่นไหว้ทุกคืน',[
  O('🍖 รับของเซ่น เฝ้าหมู่บ้านต่อ',()=>{const m=MS(K);m.vil=1;m.eat.meat++;feed('🍖 ของเซ่นอร่อยกว่าอาหารวังทุกอย่าง'+rep(4))}),
  O('🙇 ปรากฏตัวเป็นคน บอกความจริง',()=>feed(rnd()<.5?'🙇 ชาวบ้านไม่เชื่อ บอกว่าเทพชอบล้อเล่น':'🙇 ผู้ใหญ่บ้านพยักหน้า "เรารู้นานแล้ว เด็กๆ เห็นเจ้าแปลงร่างตอนอาบน้ำ"'))])],
 [20,K=>C('😈 ราชาปีศาจส่งจดหมาย','จดหมายสีดำเขียนว่า "มอนสเตอร์ไม่ควรรับใช้มนุษย์ มาอยู่ฝั่งเรา เจ้าจะได้กินแกนเวทมังกรทุกวัน"',[
  O('🖤 ไปพบ',()=>{const m=MS(K);m.dk=1;m.eat.magic+=2;m.beast+=10;feed('🖤 ราชาปีศาจเลี้ยงแกนเวทมังกรจริงๆ ร่างคุณสั่นด้วยความหิว');K.f.peace=(K.f.peace|0)+1}),
  O('🔥 เผาจดหมาย',()=>feed('🔥 ควันจากจดหมายเป็นรูปหน้ายิ้ม'))])],
 [23,K=>C('🌕 คืนจันทร์สีแดง','คืนนี้ร่างมอนสเตอร์ออกมาเองโดยไม่ได้ตั้งใจ และมันหิวมาก',[
  O('⛓️ ล่ามตัวเองในถ้ำ (มินิเกม)',()=>mgHold('ข่มสัญชาตญาณไว้ทั้งคืน',sc=>{const m=MS(K);if(sc>=.55){m.beast=Math.max(0,m.beast-15);feed('⛓️ ตอนเช้าโซ่ขาดไปสามเส้น แต่คุณยังเป็นคน')}else{m.beast+=20;feed('⛓️ เช้ามาคุณตื่นกลางป่า ปากเปื้อนเลือดหมูป่า… หวังว่าหมูป่า'+dark(6))}},[60,75])),
  O('🐾 ปล่อยไปล่าในป่าลึก',()=>{const m=MS(K);m.beast+=12;m.eat.meat+=2;feed('🐾 คุณกินมอนสเตอร์ไปทั้งรัง รู้สึกแข็งแกร่งขึ้นอย่างน่ากลัว');K.pw+=capOf(K)*.08})])]],
 yr:K=>{const m=MS(K);m.beast=cl(m.beast+(rnd()<.3?2:0),0,100);
  if(m.form<3&&rnd()<.4&&!m.evq){m.evq=1;return()=>{m.evq=0;C(`🧬 ${monN(m)} กำลังลอกคราบ`,`ร่างมอนสเตอร์ของคุณกำลังจะวิวัฒนาการ สิ่งที่กินช่วงนี้จะกำหนดร่างสุดท้าย`,Object.keys(MDIET).map(k=>O(`${MDIET[k][0]} ${MDIET[k][1]}`,()=>{m.eat[k]+=2;m.form++;m.beast+=5;K.pw+=capOf(K)*.08;S.maxHp+=20;say(`🧬 <b>วิวัฒนาการ: ${monN(m)}</b>`,m.form>=3?'myth':'epic',m.form>=3)},'',.33)))}}
  if(m.beast>=100&&!m.lost){m.lost=1;return()=>ending(K,'mon_lost',`วันหนึ่งคุณลืมวิธีกลับเป็นคน ${monN(m)}ตัวหนึ่งเดินเข้าป่าลึก เพื่อนร่วมห้องตามหาคุณอยู่หลายปี แต่ไม่มีใครรู้ว่ามอนสเตอร์ที่เฝ้าป่าแห่งนั้นคือใคร`,'กลายเป็นมอนสเตอร์ตลอดกาล')}return null},
 fin:(K,o)=>{const m=MS(K);if(m.form>=3)o.push(O(`👑 ขึ้นเป็นราชาของมอนสเตอร์`,()=>ending(K,'mon_king',`${monN(m)}ยืนบนยอดเขา มอนสเตอร์ทั้งทวีปก้มหัว คุณสั่งห้ามพวกมันทำร้ายมนุษย์ และมันฟังคุณ`,'ครองป่าในร่างมอนสเตอร์จนวันสุดท้าย'),'',.25));
  o.push(O('🧍 ตัดวิญญาณมอนสเตอร์ทิ้ง กลับเป็นคนถาวร',()=>ending(K,'mon_human','คุณให้นักบวชตัดสายวิญญาณที่ผูกกับมอนสเตอร์ พลังทั้งหมดหายไป แต่คืนนั้นคุณนอนหลับได้โดยไม่ต้องล่ามโซ่เป็นครั้งแรก','ใช้ชีวิตธรรมดาจนแก่'),'',.2));
  if(m.form>=3&&m.beast<50&&m.spare)o.push(O('🌉 เป็นสะพานระหว่างคนกับมอนสเตอร์',()=>ending(K,'mon_both',`เพื่อนร่วมห้องที่คุณไว้ชีวิตยืนข้างคุณต่อหน้าราชา มนุษย์กับมอนสเตอร์ลงนามสันติภาพครั้งแรก โดยมีคุณ ทั้งในร่างคนและร่าง${monN(m)} เป็นพยาน`,'จากไปในฐานะคนที่เป็นทั้งสองอย่าง'),'🗝️ ฉากจบลับ',.1))},
 ends:[['mon_king','👑','ราชาแห่งมอนสเตอร์','วิวัฒนาการถึงร่างสุดท้าย'],['mon_human','🧍','กลับเป็นคนถาวร','ตัดวิญญาณมอนสเตอร์ทิ้ง'],['mon_lost','🐾','ลืมวิธีเป็นคน','ความเป็นสัตว์ถึง 100%'],['mon_both','🌉','สะพานระหว่างคนกับมอนสเตอร์','ร่างสุดท้าย + ไว้ชีวิตเพื่อน + ยังเป็นคน',1]]};

// ---------- 🏰 เจ้าของดันเจี้ยน ----------
const DGT=[['🪤','กับดัก'],['👹','มอนสเตอร์'],['❓','ปริศนา']],DGV=[['🛡️','อัศวินเกราะหนา',2,'ฟันเก่ง แต่อ่านหนังสือไม่ออก'],['🧙','จอมเวทขี้สงสัย',0,'ชอบแตะทุกอย่างที่เรืองแสง'],['🗡️','โจรตาไว',1,'เห็นกับดักทุกอัน แต่กลัวเสียงคำราม'],['🤡','ตัวตลกเร่ร่อน',-1,'ไม่มีใครรู้ว่าเขากลัวอะไร']];
MVX.dungeon={w:'iso',ic:'🏰',n:'เจ้าของดันเจี้ยน',p:12,d:'สกิลที่ได้ตอนอัญเชิญคือ「เจ้าของดันเจี้ยน」 ใต้เมืองมีดันเจี้ยนที่ตอบรับความคิดคุณ ผู้กล้าทั้งหลายกำลังจะมาบุก รวมถึงเพื่อนร่วมห้องคุณ',
 chip:K=>`🏰 ดันเจี้ยน ${MS(K).fl|0} ชั้น · 👹 ${MS(K).mon|0} ตัว · 🛡️ ป้องกันสำเร็จ ${MS(K).win|0}`,
 birth:K=>{const m=MS(K);m.fl=1;m.mon=2;m.win=0;m.hp=3},
 ev:[
 [0,K=>C('💎 แกนดันเจี้ยน','ใต้ห้องใต้ดินของโรงเตี๊ยม คุณเจอคริสตัลเต้นเหมือนหัวใจ มันพูดว่า "ยินดีต้อนรับ นายท่าน ตั้งชื่อให้ข้าด้วย"',[
  O('🏷️ ตั้งชื่อว่า "บ้าน"',()=>{MS(K).nm='บ้าน';feed('🏷️ คริสตัลเรืองแสงอบอุ่น "บ้าน… ชอบชื่อนี้"')}),
  O('🏷️ ตั้งชื่อว่า "สุสานผู้กล้า"',()=>{MS(K).nm='สุสานผู้กล้า';K.dark+=5;feed('🏷️ คริสตัลเปลี่ยนเป็นสีแดง "น่าตื่นเต้น"')}),
  O('🏷️ ตั้งชื่อว่า "สมชาย"',()=>{MS(K).nm='สมชาย';feed('🏷️ คริสตัลเงียบไปนาน "…ได้"')})])],
 [0,K=>C('👺 ก็อบลินพ่อครัว','ก็อบลินตัวหนึ่งเดินเข้ามาในดันเจี้ยนเอง ถือกระทะ "ข้าโดนไล่ออกจากเผ่าเพราะทำอาหารอร่อยเกินไป รับข้าเข้าทำงานได้ไหม"',[
  O('👍 รับ',()=>{const m=MS(K);m.mon++;m.gob=1;feed('👍 มอนสเตอร์ในดันเจี้ยนอ้วนขึ้นทุกตัว และขวัญกำลังใจพุ่ง')}),
  O('⚔️ ไม่รับ ใช้เป็นมอนสเตอร์ด่านแรก',()=>{MS(K).mon++;feed('⚔️ ก็อบลินถือกระทะยืนเฝ้าประตู ผู้กล้าที่โดนกระทะฟาดบอกว่าเจ็บที่สุดในชีวิต')})])],
 [17,K=>C('🎒 เพื่อนร่วมห้องบุกดันเจี้ยน',`${N(K,'pal')}กับปาร์ตี้ของเขาลงมาถึงชั้นลึกสุด เขาไม่รู้ว่าเจ้าของดันเจี้ยนคือคุณ`,[
  O('🎭 ปลอมตัวเป็นบอสแล้วไล่ออกไป',()=>mgRead('ไล่เพื่อนออกไปโดยไม่ให้จำเสียงได้',npc(K,'pal').n,sc=>feed(sc>=.55?'🎭 พวกเขาวิ่งหนีออกไปพร้อมเรื่องเล่าเรื่องบอสเสียงทุ้มน่ากลัว':'🎭 "เดี๋ยวนะ… เสียงนี้มัน…" เพื่อนจำได้'+aff(K,'pal',-5)))),
  O('🙋 เปิดเผยตัว ชวนเป็นหุ้นส่วน',()=>{MS(K).partner=1;aff(K,'pal',15);feed('🙋 เพื่อนหัวเราะจนน้ำตาไหล แล้วกลายเป็นคนพาผู้กล้ามา "เที่ยว" ดันเจี้ยนคุณ แบ่งกำไรครึ่งๆ')}),
  O('💀 ปล่อยให้กับดักทำงาน',()=>{K.dark+=15;MS(K).cruel=1;feed('💀 คุณได้ยินเสียงเพื่อนเรียกชื่อคุณขอความช่วยเหลือ… คุณไม่ได้ไป')})])],
 [20,K=>C('🎟️ ราชสำนักมาขอซื้อ','ขุนนางเสนอเปลี่ยนดันเจี้ยนเป็น "ดันเจี้ยนท่องเที่ยวหลวง" เก็บค่าเข้าครึ่งเหรียญทอง มอนสเตอร์ห้ามฆ่านักท่องเที่ยว',[
  O('🎟️ ตกลง',()=>{MS(K).tour=1;feed('🎟️ ปีแรกมีนักท่องเที่ยวหมื่นคน ก็อบลินขายของที่ระลึก'+money(1500))}),
  O('🙅 ไม่ ดันเจี้ยนต้องน่ากลัว',()=>feed('🙅 ขุนนางขู่ว่าจะส่งกองทัพมา'))])],
 [24,K=>C('🌑 เจ้าของดันเจี้ยนคู่แข่ง','ดันเจี้ยนอีกแห่งข้ามภูเขาส่งสาส์นท้าทาย ผู้แพ้ต้องยกแกนดันเจี้ยนให้ผู้ชนะ',[
  O('⚔️ สงครามดันเจี้ยน (มินิเกม)',()=>mgCups('เดาว่าแกนของศัตรูซ่อนอยู่ห้องไหน',sc=>{const m=MS(K);if(sc>=.5){m.fl+=3;m.mon+=5;say('⚔️ คุณยึดแกนดันเจี้ยนศัตรูได้ ดันเจี้ยนขยายใหญ่ขึ้นสามชั้น','epic',true)}else{m.fl=Math.max(1,m.fl-1);feed('⚔️ เสียชั้นล่างไปหนึ่งชั้น')}},'💎'),'มินิเกม',.6),
  O('🤝 เสนอเป็นพันธมิตร',()=>{MS(K).ally=1;feed('🤝 เจ้าของดันเจี้ยนศัตรูคือผู้ถูกอัญเชิญรุ่นก่อน อายุ 70 แล้ว เขาร้องไห้ที่ได้พูดภาษาไทย'+(K.clue<3?clue(K,'ผู้ถูกอัญเชิญรุ่นก่อนบางคนกลายเป็นเจ้าของดันเจี้ยน'):''))},'',.4)])]],
 yr:K=>{const m=MS(K);if(S.focus==='fa_dgn'){m.fl++;feed(`🏰 ขุดดันเจี้ยนเพิ่มเป็น ${m.fl} ชั้น`)}money(Math.round((m.fl*25+m.mon*8)*(m.tour?3:1)));
  if(age()>=16&&rnd()<.55){const v=pick(DGV);return()=>C(`⚔️ ผู้บุกรุก: ${v[0]} ${v[1]}`,`ผู้กล้ากลุ่มใหม่บุกดันเจี้ยน หัวหน้าเป็น${v[1]} — ข่าวลือว่า<b>${v[3]}</b> · จะวางอะไรไว้ที่ชั้นลึกสุด`,DGT.map((t,i)=>O(`${t[0]} ${t[1]}`,()=>{const wn=v[2]<0?rnd()<.4:(i===v[2]||rnd()<.2);if(wn){m.win++;m.mon+=rnd()<.5?1:0;feed(`${t[0]} ได้ผล! ผู้บุกรุกถอยออกไป ทิ้งของไว้${lootDrop(K,R(1,3),'ผู้บุกรุก')}`)}else{m.hp--;feed(`${t[0]} ไม่ได้ผลกับ${v[1]} แกนดันเจี้ยนร้าว (เหลือ ${m.hp})`);if(m.hp<=0)ending(K,'dg_fall',`${v[1]}ทุบแกนดันเจี้ยนแตก สายใยที่ผูกคุณกับดันเจี้ยนขาด คุณล้มลงพร้อมกับมัน`,'ตายพร้อมแกนดันเจี้ยนที่ถูกทำลาย')}},'',.33)))}return null},
 fin:(K,o)=>{const m=MS(K);if(m.win>=5)o.push(O('🏰 ดันเจี้ยนที่ไม่มีใครพิชิต',()=>ending(K,'dg_lord',`ดันเจี้ยน "${m.nm||'ไร้นาม'}" ${m.fl} ชั้น ไม่เคยถูกพิชิต ผู้กล้าทั้งทวีปฝันว่าวันหนึ่งจะได้ลงไปถึงชั้นสุดท้าย`,'จากไปบนบัลลังก์ที่ชั้นลึกสุด'),'',.3));
  if(m.tour)o.push(O('🎟️ เจ้าของสวนสนุกดันเจี้ยน',()=>ending(K,'dg_tour','ดันเจี้ยนของคุณกลายเป็นสถานที่ท่องเที่ยวอันดับหนึ่งของทวีป มีโรงแรม ร้านอาหารของก็อบลิน และมอนสเตอร์ที่ถ่ายรูปคู่ได้','แก่ตายในฐานะคนรวยที่สุดในเมือง'),'',.3));
  if(m.fl>=6)o.push(O('🌍 ให้ดันเจี้ยนกลืนทวีป',()=>ending(K,'dg_world','ดันเจี้ยนของคุณขยายใต้ดินทั้งทวีป ทุกเมืองตั้งอยู่บนห้องหนึ่งของมัน คุณไม่ได้ปกครองใคร แต่ทุกคนเดินอยู่ในบ้านของคุณ','กลายเป็นส่วนหนึ่งของดันเจี้ยนที่ใหญ่เท่าทวีป'),'🗝️ ฉากจบลับ',.1))},
 ends:[['dg_lord','🏰','ดันเจี้ยนที่ไม่มีใครพิชิต','ป้องกันสำเร็จ 5 ครั้งขึ้นไป'],['dg_tour','🎟️','สวนสนุกดันเจี้ยน','เปิดดันเจี้ยนท่องเที่ยว'],['dg_fall','💥','แกนแตก','ป้องกันพลาดจนแกนพัง'],['dg_world','🌍','ดันเจี้ยนเท่าทวีป','ดันเจี้ยน 6 ชั้นขึ้นไป',1]]};

// ---------- 🍳 พ่อครัวในห้องนักรบ ----------
const DISH=['ข้าวผัดกระเพรามังกร','ต้มยำเงือก','ส้มตำผลไม้ปีศาจ','หมูกระทะบนเกล็ดซาลาแมนเดอร์','ข้าวมันไก่กริฟฟิน','บะหมี่ที่ทำให้คนร้องไห้','แกงเขียวหวานแรด','ไข่เจียวฟีนิกซ์ (ไข่ไม่ฟัก)'];
function mgCook(t,cb){let s=0;mgMash(`${t} · ขั้น 1: หั่น!`,a=>{s+=a;mgHold(`${t} · ขั้น 2: คุมไฟ`,b=>{s+=b;mgPotion(`${t} · ขั้น 3: ปรุงรส`,3,c=>{s+=c;cb(s/3)})},[55,68])},26)}
MVX.cook={w:'iso',ic:'🍳',n:'พ่อครัวในห้องนักรบ',p:12,d:'ทั้งห้องได้อาชีพนักดาบ นักเวท อัศวิน มีคุณคนเดียวที่ได้「พ่อครัว」 แต่ในโลกที่อาหารทุกจานรสชาติเหมือนกระดาษ จานของคุณคืออาวุธ',
 chip:K=>`🍳 เมนูในตำนาน ${(MS(K).dish||[]).length}/8 · ⭐ ${MS(K).star|0}`,
 birth:K=>{const m=MS(K);m.dish=[];m.star=0},
 ev:[
 [0,K=>C('😂 อาชีพพ่อครัว','ตอนประกาศอาชีพ ทั้งห้องหัวเราะ ราชาขมวดคิ้ว นักบวชถามว่า "ทำไมวงเวทถึงพลาดได้"',[
  O('🍳 ทำอาหารเลี้ยงทั้งวังคืนนั้นเลย (มินิเกม)',()=>mgCook('มื้อแรกในต่างโลก',sc=>{const m=MS(K);if(sc>=.55){(m.dish.includes(DISH[0])||m.dish.push(DISH[0]));m.star++;say(`🍳 ราชากิน${DISH[0]}แล้วนิ่งไปนาน "…ข้าอยู่มาหกสิบปีโดยไม่รู้ว่าอาหารมีรสชาติ"`,'epic',true)}else feed('🍳 ไหม้ แต่ก็ยังอร่อยกว่าอาหารวัง')}),'มินิเกม'),
  O('😑 เงียบไว้ก่อน',()=>feed('😑 คุณแอบทำอาหารกินเองในห้องครัววัง แม่ครัวยืนน้ำลายไหลหลังประตู'))])],
 [0,K=>C('🐉 มังกรหิว','มังกรแก่บินลงมากลางหมู่บ้าน ทุกคนหนี มันไม่ได้มาฆ่าใคร มันมาเพราะได้กลิ่นจากครัวคุณ',[
  O('🍲 ทำอาหารให้มังกร (มินิเกม)',()=>mgCook('มื้อสำหรับมังกร',sc=>{const m=MS(K);if(sc>=.55){m.drg=1;(m.dish.includes(DISH[3])||m.dish.push(DISH[3]));feed('🐉 มังกรกินหมดหม้อแล้วนอนข้างครัว ตั้งแต่วันนั้นมันมาทุกวันพฤหัส');K.f.dragon=1}else feed('🐉 มังกรชิมแล้วถอนหายใจเป็นควัน บินจากไป')}),'มินิเกม'),
  O('🏃 หนีพร้อมชาวบ้าน',()=>feed('🏃 มังกรกินอาหารในครัวคุณจนหมดแล้วบินไป ทิ้งเกล็ดไว้หนึ่งชิ้นเหมือนค่าอาหาร'+money(200)))])],
 [17,K=>C('⚔️ อาหารสำหรับกองทัพ','กองทัพพันคนเดินทัพสามวันโดยไม่มีอาหารดีๆ แม่ทัพขอให้คุณเป็นพ่อครัวกองทัพ',[
  O('🍛 รับงาน',()=>{const m=MS(K);m.army=1;(m.dish.includes(DISH[4])||m.dish.push(DISH[4]));feed('🍛 กองทัพชนะทุกศึกในปีนั้น ทหารบอกว่า "เราสู้เพื่อมื้อเย็นของพ่อครัว"'+rep(10))}),
  O('🙅 ไม่ อาหารไม่ใช่เพื่อสงคราม',()=>feed('🙅 แม่ทัพโกรธ แต่ทหารครึ่งกองทัพแอบมากินที่ร้านคุณ'))])],
 [19,K=>C('👨‍🍳 แข่งกับเชฟราชสำนัก','เชฟราชสำนักคนก่อนท้าแข่ง ใครแพ้ต้องออกจากเมือง กรรมการคือราชา ราชินี และแมวของราชินี',[
  O('🔥 แข่ง (มินิเกม 3 ขั้น)',()=>mgCook('แข่งชิงตำแหน่งเชฟหลวง',sc=>{const m=MS(K);if(sc>=.6){m.royal=1;m.star+=2;(m.dish.includes(DISH[5])||m.dish.push(DISH[5]));say('👨‍🍳 แมวของราชินีกินจานคุณหมดแล้วนอนหงายท้อง คุณชนะเป็นเอกฉันท์','epic',true)}else feed('👨‍🍳 แพ้ไปหนึ่งคะแนน (แมวเลือกฝั่งโน้น)')}),'มินิเกม',.7),
  O('🤝 ชวนทำอาหารด้วยกันแทน',()=>{(MS(K).dish.includes(DISH[2])||MS(K).dish.push(DISH[2]));feed('🤝 เชฟเฒ่าสอนสูตรลับให้หนึ่งสูตร')},'',.3)])],
 [23,K=>C('😈 ราชาปีศาจมาร้าน','ชายสวมผ้าคลุมดำนั่งที่โต๊ะมุมร้านทุกคืนวันศุกร์มาสามเดือน คืนนี้เขาถอดหมวก เขาคือราชาปีศาจ',[
  O('🍽️ เสิร์ฟอาหารเหมือนเดิม',()=>{const m=MS(K);m.dl=1;(m.dish.includes(DISH[6])||m.dish.push(DISH[6]));K.f.peace=(K.f.peace|0)+1;feed('🍽️ ราชาปีศาจกินเงียบๆ แล้วพูดว่า "ถ้ามนุษย์ทุกคนทำอาหารแบบเจ้า ข้าคงไม่ต้องรบ"')}),
  O('🗡️ วางยาในอาหาร',()=>{K.dark+=15;feed(rnd()<.4?'🗡️ ราชาปีศาจล้มลง… แล้วลุกขึ้นมา "ยาพิษก็มีรสชาติดีด้วยแฮะ" แล้วจากไปไม่กลับมาอีก':'🗡️ เขาดมแล้ววางช้อน มองคุณด้วยความผิดหวังที่สุดในโลก')})])]],
 yr:K=>{const m=MS(K);if(S.focus==='fa_cook'){money(R(40,120)*(1+m.star*.3));if(rnd()<.3&&m.dish.length<8){const d=DISH.find(x=>!m.dish.includes(x));if(d){m.dish.push(d);feed(`🍳 คิดค้นเมนูในตำนาน: <b>${d}</b> (${m.dish.length}/8)`)}}}return null},
 fin:(K,o)=>{const m=MS(K);if(m.dl&&K.f.peace)o.push(O('🍽️ จบสงครามที่โต๊ะอาหาร',()=>ending(K,'ck_peace','ราชากับราชาปีศาจนั่งโต๊ะเดียวกันในร้านคุณ กินข้าวผัดกระเพราจานเดียวกัน แล้วเซ็นสัญญาสันติภาพบนผ้าเช็ดปาก','แก่ตายในครัว เตาไฟยังอุ่นอยู่'),'',.3));
  o.push(O('🏮 เปิดร้านข้างทางที่ราชาต้องมาต่อคิว',()=>ending(K,'ck_stall','คุณปฏิเสธตำแหน่งเชฟหลวงแล้วเปิดร้านข้างทาง ราชาต้องปลอมตัวมาต่อคิวเหมือนทุกคน','จากไปหลังเตาหน้าร้าน'),'',.25));
  if(m.dish.length>=6)o.push(O('✨ ทำจานสุดท้ายให้เทพ',()=>ending(K,'ck_god','เทพลงมาจากสวรรค์เพราะได้กลิ่น คุณเสิร์ฟจานสุดท้ายที่รวมทุกเมนูในตำนาน เทพกินแล้วร้องไห้ แต่งตั้งคุณเป็นเทพแห่งรสชาติองค์แรก','ขึ้นสวรรค์ไปเป็นพ่อครัวของเทพ'),'🗝️ ฉากจบลับ',.1))},
 ends:[['ck_peace','🍽️','สงครามจบที่โต๊ะอาหาร','ราชาปีศาจเป็นลูกค้าประจำ'],['ck_stall','🏮','ร้านข้างทางที่ราชาต่อคิว','เลือกร้านเล็กของตัวเอง'],['ck_god','✨','เทพแห่งรสชาติ','เมนูในตำนาน 6 จานขึ้นไป',1]]};

// ---------- 😈 ตราจอมมาร ----------
MVX.wrong={w:'iso',ic:'😈',n:'ตราจอมมารองค์ต่อไป',p:11,d:'ตอนอัญเชิญ วงเวทของฝั่งปีศาจแย่งดึงคุณไปครึ่งหนึ่ง บนหลังมือคุณมีตราสีดำของ "จอมมารองค์ต่อไป" ฝั่งมนุษย์ยังไม่มีใครรู้',
 chip:K=>`😈 ตราจอมมาร ${MS(K).mk|0}% · 🫣 ${MS(K).hid===0?'ความลับหลุดแล้ว':'ยังซ่อนอยู่'}`,
 birth:K=>{const m=MS(K);m.mk=10;m.hid=1;K.dark=Math.max(K.dark,8)},
 ev:[
 [0,K=>C('🖤 ตราบนหลังมือ','ตราสีดำบนหลังมือร้อนขึ้นทุกครั้งที่เข้าใกล้นักบวช คืนนี้มันเรืองแสงตอนกินข้าวกับเพื่อนร่วมห้อง',[
  O('🧤 ใส่ถุงมือตลอดชีวิต',()=>feed('🧤 เพื่อนเรียกคุณว่า "คนเท่ใส่ถุงมือ"')),
  O('🔥 พยายามเผาตราออก',()=>{MS(K).mk=Math.max(0,MS(K).mk-5);feed('🔥 ตราไม่หาย แต่คุณได้แผลเป็น'+hurt(.15))}),
  O('👁️ จ้องตรา แล้วถามว่าแกต้องการอะไร',()=>{MS(K).mk+=5;feed('👁️ เสียงในหัวตอบว่า "ไม่ใช่ข้าที่ต้องการ แต่เป็นพวกเขา"')})])],
 [0,K=>C('🧎 ปีศาจมาคุกเข่า','ระหว่างภารกิจล่ามอนสเตอร์ ปีศาจระดับสูงสามตนบินลงมาคุกเข่าต่อหน้าคุณ "ฝ่าบาท พวกเรารอมานาน" เพื่อนร่วมปาร์ตี้อยู่ห่างไปแค่ร้อยเมตร',[
  O('🤫 กระซิบให้แกล้งสู้แล้วหนีไป',()=>{MS(K).mk+=5;feed('🤫 ปีศาจแกล้งแพ้แบบน่าเกลียดที่สุดในประวัติศาสตร์ เพื่อนชมว่าคุณเก่งมาก')}),
  O('⚔️ ฆ่าทั้งสามจริงๆ',()=>duel('ปีศาจระดับสูง',Math.round(threat(K)*1.15),w=>{if(w){MS(K).mk=Math.max(0,MS(K).mk-10);feed('⚔️ ปีศาจตนสุดท้ายตายด้วยรอยยิ้ม "ฝ่าบาทเลือกแล้วสินะ"')}else feed('⚔️ พวกมันไม่ตอบโต้ แค่หายไป'+hurt(.1))}),'ต่อสู้'),
  O('👑 ลองสั่งให้พวกมันไปช่วยหมู่บ้านที่โดนน้ำท่วม',()=>{MS(K).mk+=10;MS(K).kind=1;feed('👑 ปีศาจงงอยู่ครู่หนึ่ง แล้วบินไปจริงๆ หมู่บ้านรอดทั้งหมู่บ้าน ทุกคนคิดว่าเป็นปาฏิหาริย์ของเทพ')})])],
 [18,K=>C('👀 เพื่อนเห็นตรา',`${N(K,'pal')}เห็นตราตอนคุณถอดถุงมือล้างแผล ใบหน้าเขาซีด`,[
  O('🤝 บอกความจริงทั้งหมด',()=>{MS(K).ally=1;aff(K,'pal',10);feed('🤝 เพื่อนเงียบไปนาน แล้วพูดว่า "งั้นนายก็ต้องเป็นจอมมารที่ดีที่สุดเท่าที่โลกเคยมีสิ"')}),
  O('🗣️ หลอกว่าเป็นรอยสัก (มินิเกม)',()=>mgRead('ทำให้เพื่อนเชื่อว่าเป็นรอยสัก',npc(K,'pal').n,sc=>{if(sc<.55){MS(K).hid=0;feed('🗣️ เพื่อนไม่เชื่อ และวิ่งไปบอกนักบวช')}else feed('🗣️ เพื่อนขอให้พาไปร้านสักร้านเดียวกัน')}))])],
 [21,K=>C('👑 จอมมารองค์เก่าเรียกพบ','ราชาปีศาจองค์ปัจจุบันชราภาพ เขาส่งทูตมาเชิญ "ข้าอยากเห็นหน้าคนที่จะมาแทนข้า ก่อนข้าตาย"',[
  O('🏰 ไปพบ',()=>{const m=MS(K);m.met=1;m.mk+=15;feed('🏰 ราชาปีศาจเฒ่าเล่าว่าเขาก็เป็นผู้ถูกอัญเชิญจากโลกอื่นเมื่อห้าร้อยปีก่อน ตราเดียวกัน ทางแยกเดียวกัน'+(K.clue<3?clue(K,'จอมมารทุกองค์คือผู้ถูกอัญเชิญที่ถูกดึงครึ่งทาง'):''))}),
  O('🗡️ ไปพบเพื่อลอบสังหาร',()=>duel('ราชาปีศาจเฒ่า',Math.round(threat(K)*1.3),w=>{if(w){MS(K).mk+=30;say('🗡️ ราชาปีศาจล้มลง ตราบนมือคุณลามขึ้นถึงไหล่ — คุณคือจอมมารแล้ว ไม่ว่าจะอยากหรือไม่','bad',true);MS(K).crown=1}else feed('🗡️ ราชาปีศาจหัวเราะ "ยังไม่ถึงเวลา" แล้วส่งคุณกลับ'+hurt(.3))}),'ต่อสู้')])]],
 yr:K=>{const m=MS(K);m.mk=cl(m.mk+(rnd()<.4?R(1,4):0),0,100);if(!m.hid&&!m.hunted){m.hunted=1;return()=>C('⛪ ความลับหลุด','นักบวชประกาศว่าผู้ถูกอัญเชิญคนหนึ่งคือจอมมารองค์ต่อไป ทั้งห้องหันมามองคุณ',[
  O('😈 รับตำแหน่ง ไปอยู่ฝั่งปีศาจ',()=>{m.mk+=25;K.f.demonSide=1;feed('😈 คุณเดินออกจากวังโดยไม่มีใครกล้าขวาง เพื่อนบางคนตามมาด้วย')}),
  O('⚔️ พิสูจน์ตัวด้วยการสู้ฝั่งมนุษย์',()=>duel('อัศวินศักดิ์สิทธิ์',Math.round(threat(K)*1.2),w=>feed(w?'⚔️ คุณชนะ แต่ไม่ฆ่า ราชาประกาศว่าตราไม่ได้ตัดสินคน'+rep(10):'⚔️ คุณถูกขังในคุกใต้วังหนึ่งปี'+hurt(.3)))),
  O('🏃 หนีไปอยู่คนเดียว',()=>feed('🏃 คุณใช้ชีวิตในป่าหลายปี ปีศาจคอยส่งอาหารมาให้ทุกคืน'))])}return null},
 fin:(K,o)=>{const m=MS(K);if(m.mk>=50)o.push(O('👑 เป็นจอมมารผู้ใจดี',()=>ending(K,'wr_lord',`คุณขึ้นครองบัลลังก์ปีศาจ ${m.kind?'และสั่งปีศาจทั้งหมดช่วยมนุษย์ในยามภัยพิบัติ':'และปิดประตูสู่โลกมนุษย์'} ห้าร้อยปีต่อมายังไม่มีสงครามอีก`,'ครองบัลลังก์ปีศาจจนสิ้นอายุขัย'),'',.3));
  o.push(O('✂️ ทำลายตรา กลับเป็นคนธรรมดา',()=>ending(K,'wr_break','คุณทำลายตราด้วยดาบศักดิ์สิทธิ์ แลกกับพลังทั้งหมด ตำแหน่งจอมมารองค์ต่อไปว่างลง และจะไม่มีใครถูกดึงครึ่งทางอีก','ใช้ชีวิตเป็นคนธรรมดาจนแก่'),'',.25));
  if(m.met&&m.ally&&m.mk>=40)o.push(O('⚖️ ครองทั้งสองฝั่ง',()=>ending(K,'wr_both','คุณเป็นทั้งผู้กล้าของมนุษย์และจอมมารของปีศาจ สองบัลลังก์ หนึ่งคน ทุกคนรู้ และทุกคนยอมรับ เพราะเพื่อนคนหนึ่งยืนข้างคุณตั้งแต่วันแรก','จากไปในฐานะคนที่สองโลกไว้อาลัย'),'🗝️ ฉากจบลับ',.1))},
 ends:[['wr_lord','👑','จอมมารผู้ใจดี','รับตำแหน่งจอมมาร'],['wr_break','✂️','ทำลายตรา','เลือกเป็นคนธรรมดา'],['wr_both','⚖️','ราชาสองฝั่ง','พบจอมมารเฒ่า + มีเพื่อนรู้ความลับ',1]]};

// ---------- 🗡️ ดาบที่มีวิญญาณอีกครึ่ง ----------
MVX.sword={w:'iso',ic:'🗡️',n:'วิญญาณครึ่งหนึ่งอยู่ในดาบ',p:11,d:'ตอนอัญเชิญ วิญญาณคุณแยกเป็นสองส่วน ส่วนหนึ่งอยู่ในร่าง อีกส่วนอยู่ในดาบเก่าที่ปักอยู่หน้าวง คุณรู้สึกทุกอย่างที่ดาบรู้สึก และดาบมีความคิดของตัวเอง',
 chip:K=>`🗡️ ดาบ: ${MS(K).has?'อยู่ในมือ':'หายไป!'} · 🩸 กระหายเลือด ${MS(K).th|0}%`,
 birth:K=>{const m=MS(K);m.has=1;m.th=10;K.pw+=8},
 ev:[
 [0,K=>C('🗡️ ดาบพูดได้','ดาบในมือคุณกระซิบด้วยเสียงของคุณเอง "เราเป็นคนเดียวกัน แต่ข้าอยากได้เลือด"',[
  O('🤝 ตกลงกันว่าเลือดมอนสเตอร์เท่านั้น',()=>{MS(K).deal=1;feed('🤝 ดาบหัวเราะด้วยเสียงคุณ "ได้ ตอนนี้"')}),
  O('😠 สั่งให้เงียบ',()=>{MS(K).th+=5;feed('😠 ดาบเงียบ แต่คืนนั้นคุณฝันว่าฆ่าคน')})])],
 [0,K=>C('🦹 ดาบถูกขโมย','เช้านี้ดาบหายไปจากข้างหมอน หัวใจคุณเจ็บเหมือนถูกฉีกครึ่ง คุณรู้สึกได้ว่าดาบอยู่ในตลาดมืด',[
  O('🔍 ตามหาในตลาดมืด (มินิเกม)',()=>mgCups('หาดาบของคุณในกองดาบปลอม',sc=>{const m=MS(K);if(sc>=.5){feed('🔍 คุณจับดาบได้ หัวขโมยถูกดาบตัดนิ้วไปสองนิ้วก่อนคุณจะห้ามทัน');m.th+=5}else{m.has=0;m.lostY=age();feed('🔍 ดาบถูกขายไปแล้ว… คุณรู้สึกว่ามันกำลังเดินทางไปทางเหนือ')}},'🗡️')),
  O('🧘 เรียกดาบกลับด้วยใจ',()=>{if(rnd()<.4)feed('🧘 ดาบลอยกลับมาเองทะลุกำแพงสามชั้น');else{MS(K).has=0;MS(K).lostY=age();feed('🧘 ไม่สำเร็จ… ดาบอยู่ไกลเกินไป')}})])],
 [18,K=>C('🔨 ช่างตีดาบอยากหลอมใหม่','ช่างตีดาบคนแคระบอกว่าดาบเล่มนี้มีรอยร้าวลึก "ถ้าไม่หลอมใหม่ อีกสิบปีมันหัก และอะไรที่อยู่ในนั้นก็จะหายไปด้วย"',[
  O('🔥 ให้หลอมใหม่ (มินิเกม)',()=>mgHold('คุมไฟหลอมดาบให้วิญญาณไม่ไหม้',sc=>{const m=MS(K);if(sc>=.55){m.forge=1;K.pw+=capOf(K)*.12;feed('🔥 ดาบใหม่สว่างกว่าเดิม และเสียงในดาบนุ่มลง'+lootDrop(K,4,'ช่างคนแคระ'))}else{m.th+=20;feed('🔥 ไฟแรงเกินไป เสียงในดาบกรีดร้อง และเมื่อเงียบลง มันเย็นชากว่าเดิม')}},[52,64])),
  O('🙅 ไม่ ดาบคือตัวเรา',()=>feed('🙅 ช่างส่ายหัว "งั้นใช้มันให้คุ้มก่อนมันหัก"'))])],
 [21,K=>C('🩸 ดาบกระหายเลือด','กลางสนามรบ ดาบเริ่มขยับเอง มันลากแขนคุณไปทางทหารที่ยอมแพ้แล้ว',[
  O('✋ ฝืนแขนไว้ (มินิเกม)',()=>mgMash('ฝืนดาบไว้ไม่ให้ฟันคนยอมแพ้',sc=>{const m=MS(K);if(sc>=.6){m.th=Math.max(0,m.th-15);feed('✋ ดาบหยุดห่างคอทหารหนึ่งนิ้ว ทหารคนนั้นร้องไห้ขอบคุณ')}else{m.th+=20;K.dark+=10;feed('✋ ดาบชนะ…')}},30)),
  O('🩸 ปล่อยให้มันได้สิ่งที่ต้องการ',()=>{MS(K).th+=25;K.pw+=capOf(K)*.1;K.dark+=15;feed('🩸 คุณแข็งแกร่งขึ้นอย่างน่ากลัว และเงียบลงอย่างน่ากลัวพอกัน')})])],
 [24,K=>C('📜 ความทรงจำในดาบ','คืนหนึ่งดาบเล่าว่าก่อนคุณ มันเคยเป็นดาบของผู้กล้ารุ่นที่หนึ่ง และวิญญาณผู้กล้าคนนั้นยังอยู่ลึกลงไปในใบดาบ',[
  O('🕯️ ปลดปล่อยวิญญาณผู้กล้ารุ่นแรก',()=>{MS(K).first=1;MS(K).th=Math.max(0,MS(K).th-20);feed('🕯️ แสงสีขาวลอยออกจากดาบ ผู้กล้ารุ่นแรกยิ้มให้คุณก่อนสลายไป'+(K.clue<3?clue(K,'ดาบหน้าวงเวทเก็บวิญญาณผู้กล้าทุกรุ่น'):''))}),
  O('⚡ ดูดพลังวิญญาณนั้น',()=>{MS(K).th+=15;K.pw+=capOf(K)*.15;feed('⚡ พลังของผู้กล้ารุ่นแรกไหลเข้าแขนคุณ เสียงกรีดร้องเบาๆ ดังจากดาบ')})])]],
 yr:K=>{const m=MS(K);if(!m.has&&age()-(m.lostY|0)>=2&&!m.chase){m.chase=1;return()=>C('🗡️ ดาบของคุณอยู่ในมือคนอื่น','คุณตามรอยดาบมาจนเจอ เจ้าของใหม่เป็นอัศวินหนุ่มที่ใช้ดาบของคุณช่วยคน ดาบดูมีความสุขกว่าตอนอยู่กับคุณ',[
  O('⚔️ ทวงคืน',()=>duel('อัศวินผู้ถือดาบของคุณ',Math.round(threat(K)*1.1),w=>{if(w){m.has=1;feed('⚔️ ดาบกลับมาอยู่ในมือ มันเงียบไปหลายวัน')}else feed('⚔️ ดาบของคุณเองฟันคุณ'+hurt(.4))}),'ต่อสู้'),
  O('🙏 ให้เขาเก็บไว้',()=>{m.gave=1;feed('🙏 ครึ่งหนึ่งของวิญญาณคุณได้อยู่ในมือคนดี คุณรู้สึกโล่งอย่างประหลาด')})])}
  if(m.th>=100&&!m.eat){m.eat=1;return()=>ending(K,'sw_thirst','ดาบกลืนวิญญาณอีกครึ่งที่เหลือในร่างคุณ ร่างคุณล้มลง ดาบเล่มหนึ่งตกลงข้างๆ และรอให้มือใหม่มาหยิบ','วิญญาณถูกดาบกลืนทั้งหมด')}return null},
 fin:(K,o)=>{const m=MS(K);if(m.has&&m.th<60)o.push(O('🔗 หลอมรวมวิญญาณกับดาบ',()=>ending(K,'sw_one','คุณกับดาบกลายเป็นหนึ่งเดียว ดาบไม่พูดอีกเพราะไม่จำเป็นต้องพูด ทุกครั้งที่คุณฟัน มันคือความตั้งใจเดียวกัน','จากไปพร้อมดาบในมือ ไม่มีใครแยกออกได้'),'',.3));
  o.push(O('🕊️ ปลดปล่อยดาบให้เป็นอิสระ',()=>ending(K,'sw_free',`คุณตัดสายใยระหว่างวิญญาณกับดาบ ${m.gave?'อัศวินหนุ่มยังใช้มันช่วยคนจนแก่':'ดาบลอยขึ้นฟ้าแล้วหายไป'} คุณใช้ชีวิตที่เหลือแบบวิญญาณไม่ครบ แต่เป็นของตัวเองทั้งหมด`,'ใช้ชีวิตที่เหลืออย่างสงบ'),'',.25));
  if(m.first&&m.forge)o.push(O('🪨 ปักดาบในหิน รอผู้กล้ารุ่นต่อไป',()=>ending(K,'sw_legend','คุณปักดาบลงในหินบนยอดเขา พร้อมวิญญาณครึ่งหนึ่งของคุณ ผู้กล้าในอนาคตที่ดึงมันออกได้จะได้ยินเสียงของคุณ คอยสอนเขาเหมือนที่ผู้กล้ารุ่นแรกเคยสอนคุณ','ร่างจากไป แต่วิญญาณครึ่งหนึ่งยังรออยู่ในหิน'),'🗝️ ฉากจบลับ',.1))},
 ends:[['sw_one','🔗','หนึ่งเดียวกับดาบ','ถือดาบไว้จนจบ ความกระหายต่ำ'],['sw_free','🕊️','ดาบที่เป็นอิสระ','ปล่อยดาบไป'],['sw_thirst','🩸','ดาบกลืนเจ้าของ','ความกระหายเลือดถึง 100%'],['sw_legend','🪨','ดาบในหิน','ปลดปล่อยผู้กล้ารุ่นแรก + หลอมดาบใหม่',1]]};

// ---------- 📖 วายร้ายในนิยาย ----------
const PLOT=[['meet',14,'🌸','พบนางเอก','ในนิยาย คุณผลักนางเอกตกบันไดวันแรกที่เจอ'],['ball',16,'💃','งานเต้นรำ','ในนิยาย คุณสาดไวน์ใส่นางเอกต่อหน้าเจ้าชาย'],['break',18,'💔','ถอนหมั้น','ในนิยาย เจ้าชายถอนหมั้นคุณกลางงานเลี้ยง'],['frame',20,'🗡️','ถูกใส่ร้าย','ในนิยาย คุณถูกใส่ร้ายว่าวางยาพิษนางเอก'],['exec',22,'⚖️','แท่นประหาร','ในนิยาย คุณถูกตัดหัวกลางจัตุรัส ตอนที่ 187']];
MVX.villain={w:'noble',ic:'📖',n:'วายร้ายในนิยาย',p:13,d:'คุณจำได้ว่าเคยอ่านนิยายเรื่องนี้ในชาติก่อน และคุณคือนางร้ายที่ถูกประหารในตอนที่ 187 ตอนนี้คุณอายุ 12 เหลือเวลาอีกสิบปี',
 chip:K=>{const m=MS(K),n=PLOT.find(p=>!m.pd[p[0]]);return `📖 แรงบังคับของเรื่อง ${m.force|0}%${n?` · ฉากถัดไป ${n[2]} ${n[3]}`:''}`},
 birth:K=>{const m=MS(K);m.pd={};m.force=50;m.dev=0},
 ev:[
 [0,K=>C('📖 จำได้ทุกอย่าง','เช้านี้ตอนส่องกระจก คุณจำได้ทันที — หน้านี้คือนางร้ายจากนิยายรักที่เคยอ่านตอนตีสองในชาติก่อน',[
  O('📝 จดเนื้อเรื่องทั้งหมดลงสมุด',()=>{MS(K).note=1;feed('📝 คุณจดได้ 187 ตอน ตอนที่จำไม่ได้คือตอนพิเศษหลังจบเรื่อง')}),
  O('🏃 วางแผนหนีออกจากเมืองหลวงตั้งแต่ตอนนี้',()=>{MS(K).force+=10;feed('🏃 คุณเก็บกระเป๋า… แล้วพ่อจับได้ที่ประตูหลัง "จะไปไหน" เหมือนเรื่องไม่ยอมให้หนี')}),
  O('😈 ถ้าจะเป็นนางร้ายก็เป็นให้สุด',()=>{K.dark+=10;MS(K).evil=1;feed('😈 คุณยิ้มให้กระจก นางร้ายที่อ่านบทมาก่อนน่ากลัวกว่านางร้ายในนิยายเยอะ')})])],
 [13,K=>C('🧚 ตัวประกอบที่ไม่มีในนิยาย','มีคนรับใช้คนหนึ่งในคฤหาสน์ที่ไม่เคยถูกเขียนถึงในนิยายเลย เขามองคุณเหมือนรู้ว่าคุณรู้',[
  O('🗣️ ถามตรงๆ',()=>{MS(K).odd=1;feed('🗣️ "ท่านก็อ่านเรื่องนี้มาเหมือนกันสินะ" เขาเคยเป็นนักอ่านอีกคน ที่เกิดใหม่เป็นตัวประกอบที่ไม่มีชื่อ')}),
  O('🤐 เมิน',()=>feed('🤐 เขาวางชาไว้บนโต๊ะทุกเช้า ชาที่คุณชอบในชาติก่อน'))])],
 [17,K=>C('📕 ผู้เขียนอยู่ในโลกนี้?','ในห้องสมุดหลวง คุณเจอหนังสือที่เขียนเรื่องของคุณ… ทุกอย่างที่คุณทำในปีนี้ เขียนด้วยลายมือที่ยังไม่แห้ง',[
  O('✍️ ขีดฆ่าแล้วเขียนทับ',()=>{const m=MS(K);m.pen=1;m.force=Math.max(0,m.force-15);feed('✍️ หมึกของคุณติด! บรรทัดที่คุณเขียนเกิดขึ้นจริงในเช้าวันถัดมา')}),
  O('📖 อ่านต่อว่าเขียนอะไรไว้',()=>{MS(K).force+=10;feed(`📖 หน้าสุดท้ายเขียนว่า "และนางร้ายอ่านหนังสือเล่มนี้ แต่ไม่กล้าเปลี่ยนอะไร"`)})])]],
 yr:K=>{const m=MS(K),p=PLOT.find(x=>!m.pd[x[0]]&&age()>=x[1]);if(!p)return null;m.pd[p[0]]=1;return()=>plotEv(K,p)},
 fin:(K,o)=>{const m=MS(K);if(m.pd.exec&&!m.dead){if(m.friend)o.push(O('🌸 เป็นเพื่อนสนิทกับนางเอก',()=>ending(K,'vl_heroine','ในตอนพิเศษที่ไม่มีใครเขียน นางร้ายกับนางเอกเปิดร้านขนมด้วยกัน เจ้าชายมาต่อคิวทุกเช้า และไม่ได้คิวสักวัน','แก่ตายข้างเพื่อนรักที่เคยต้องเป็นศัตรู'),'',.3));
  o.push(O('🌾 ใช้ชีวิตชนบทที่นิยายไม่เคยเขียน',()=>ending(K,'vl_free','คุณย้ายไปอยู่หมู่บ้านที่ไม่มีชื่อในแผนที่นิยาย ทุกวันคือหน้าว่างที่ไม่มีใครเขียนไว้ก่อน','แก่ตายในหน้ากระดาษว่าง'),'',.3));
  if(m.pen&&m.dev>=3)o.push(O('✍️ เขียนตอนจบเอง',()=>ending(K,'vl_author','คุณเขียนบทสุดท้ายด้วยมือตัวเอง ในบทนั้นไม่มีใครต้องเป็นนางร้าย และผู้อ่านในโลกเดิมทุกคนที่เปิดอ่านนิยายเรื่องนี้ จะเห็นตอนจบของคุณแทน','กลายเป็นผู้เขียนเรื่องของตัวเอง'),'🗝️ ฉากจบลับ',.1))}},
 ends:[['vl_dead','⚖️','ตอนที่ 187','ถูกประหารตามบท'],['vl_free','🌾','หน้ากระดาษว่าง','รอดจากบทประหาร'],['vl_heroine','🌸','นางร้ายกับนางเอก','เป็นเพื่อนกับนางเอก'],['vl_author','✍️','ผู้เขียนตอนจบ','เขียนทับนิยาย + เปลี่ยนบท 3 ครั้ง',1]]};
function plotEv(K,p){const m=MS(K),dev=()=>{m.dev++;m.force=cl(m.force+R(-5,12),0,100);if(rnd()<m.force/200)feed('📖 <i>เรื่องพยายามดึงคุณกลับเข้าบท… บางอย่างเกิดขึ้นเหมือนในนิยายอยู่ดี</i>')};
 if(p[0]==='meet')return C(`${p[2]} ${p[3]}`,`${p[4]} · นางเอกกำลังเดินลงบันไดตรงหน้าคุณ`,[O('🤝 ยื่นมือช่วยตอนเธอสะดุด',()=>{dev();m.friend=1;feed('🤝 นางเอกยิ้มกว้าง "ขอบคุณค่ะ!" เจ้าชายที่ยืนดูอยู่ขมวดคิ้ว ไม่อยู่ในบทเหมือนกัน')}),O('📖 ทำตามบท',()=>{m.force+=10;feed('📖 คุณผลักเธอ… แต่เธอไม่ตก เธอจับราวทัน และมองคุณด้วยแววตาสงสัย')}),O('🚶 เดินหนี ไม่เจอเลย',()=>{dev();feed('🚶 คุณหลบไปทางอื่น แต่ชนเจ้าชายแทน… ไม่อยู่ในบท')})]);
 if(p[0]==='ball')return C(`${p[2]} ${p[3]}`,`${p[4]} · มือคุณถือแก้วไวน์อยู่พอดี`,[O('💃 ชวนนางเอกเต้นรำแทน (มินิเกม)',()=>mgDance('เต้นรำกับนางเอกต่อหน้าทุกคน','นางเอก',sc=>{dev();if(sc>=.55){m.friend=1;feed('💃 ทั้งงานตะลึง นางร้ายกับนางเอกเต้นรำด้วยกัน ข่าวลือแพร่ไปทั้งเมือง')}else feed('💃 คุณเหยียบเท้าเธอ เธอหัวเราะ')})),O('🍷 ดื่มไวน์เอง',()=>{dev();feed('🍷 คุณดื่มหมดแก้ว เมาจนร้องเพลงชาติของโลกเดิม ทุกคนคิดว่าเป็นบทกวีโบราณ')}),O('📖 สาดไวน์ตามบท',()=>{m.force+=15;K.dark+=5;feed('📖 ไวน์เปื้อนชุดเธอ ทุกสายตาจ้องคุณเหมือนในนิยายเป๊ะ')})]);
 if(p[0]==='break')return C(`${p[2]} ${p[3]}`,`${p[4]} · เจ้าชายกำลังเดินขึ้นเวที`,[O('🎤 ถอนหมั้นเขาก่อน',()=>{dev();m.dumped=1;feed('🎤 "ข้าขอถอนหมั้นเจ้าชาย" ทั้งห้องโถงเงียบ เจ้าชายยืนค้างกลางทาง ไม่อยู่ในบททั้งคู่')}),O('😢 ยอมรับตามบท',()=>{m.force+=10;feed('😢 คุณยืนนิ่งขณะที่เจ้าชายประกาศ ไม่มีใครเห็นว่าคุณแอบยิ้ม')}),O('🗣️ เปิดโปงความลับเจ้าชายต่อหน้าทุกคน (มินิเกม)',()=>mgRead('พลิกสถานการณ์กลางงานเลี้ยง','เจ้าชาย',sc=>{dev();feed(sc>=.55?'🗣️ ทุกคนรู้ว่าเจ้าชายแอบนอกใจกับนางกำนัลสามคน การถอนหมั้นกลายเป็นเรื่องของเขาแทน'+rep(10):'🗣️ ไม่มีใครเชื่อ คุณดูเป็นนางร้ายกว่าเดิม')}))]);
 if(p[0]==='frame')return C(`${p[2]} ${p[3]}`,`${p[4]} · มีคนวางขวดยาพิษในห้องคุณเมื่อคืน`,[O('🕵️ ตามหาคนวางยา (มินิเกม)',()=>mgCups('หาว่าใครสลับขวดยา',sc=>{if(sc>=.5){dev();m.clear=1;feed('🕵️ คนวางยาคือ'+pick(['ดยุกที่อยากให้ลูกสาวตัวเองเป็นคู่หมั้น','นางกำนัลที่เจ้าชายแอบคบ','ตัวละครที่นิยายไม่เคยเขียนถึง'])+' คุณลากตัวมาให้ศาลเอง')}else{m.force+=15;feed('🕵️ หาไม่เจอ… ทุกหลักฐานชี้มาที่คุณ')}},'🧪')),O(m.friend?'🌸 นางเอกยืนยันว่าคุณบริสุทธิ์':'🙏 ขอความเมตตา',()=>{if(m.friend){dev();m.clear=1;feed('🌸 นางเอกยืนต่อหน้าศาล "เธอเป็นเพื่อนของฉัน เธอไม่มีทางทำ"')}else{m.force+=10;feed('🙏 ไม่มีใครฟัง')}})]);
 if(p[0]==='exec'){const ok=m.clear||m.dev>=3||m.force<40;if(ok){say(`⚖️ <b>วันที่ควรเป็นวันประหาร</b> ผ่านไปเหมือนวันธรรมดา คุณนั่งดื่มชาในสวน ตอนที่ 187 ไม่เกิดขึ้นจริง`,'myth',true);m.survive=1;return}
  return C(`${p[2]} ${p[3]}`,`${p[4]} · ทหารมาลากตัวคุณไปที่จัตุรัส เรื่องดึงคุณกลับมาจนได้`,[O('🏃 หนีระหว่างทาง (มินิเกม)',()=>mgMash('ดิ้นหลุดจากทหาร',sc=>{if(sc>=.6){m.survive=1;feed('🏃 คุณหลุดได้ หนีไปทางที่นิยายไม่เคยบรรยาย')}else{m.dead=1;ending(K,'vl_dead','ตอนที่ 187 จบลงเหมือนในนิยายทุกคำ คนในจัตุรัสโห่ร้อง ส่วนนักอ่านในโลกเดิมคนหนึ่งปิดหนังสือแล้วถอนหายใจ','ถูกประหารตามบทในนิยาย')}},34)),O('📢 พูดครั้งสุดท้ายต่อหน้าทุกคน (มินิเกม)',()=>mgRead('เปลี่ยนใจฝูงชนก่อนดาบลง','ฝูงชน',sc=>{if(sc>=.6){m.survive=1;feed('📢 ฝูงชนเริ่มโห่ใส่เพชฌฆาตแทน ราชาสั่งหยุดการประหาร')}else{m.dead=1;ending(K,'vl_dead','คำพูดของคุณไม่มีใครได้ยิน ตอนที่ 187 จบตามที่เขียนไว้','ถูกประหารตามบทในนิยาย')}}))])}}

// ---------- 👑 เจ้าหญิงปลอม ----------
MVX.fake={w:'noble',ic:'👑',n:'เจ้าหญิงตัวแทน',p:12,d:'เจ้าหญิงตัวจริงหายไปตั้งแต่ห้าขวบ ราชวงศ์เก็บคุณ เด็กกำพร้าหน้าเหมือนจากสลัม มาแทน มีแค่สามคนในโลกที่รู้',
 chip:K=>`👑 ความเสี่ยงถูกจับได้ ${MS(K).risk|0}%${MS(K).back?' · ตัวจริงกลับมาแล้ว':''}`,
 birth:K=>{const m=MS(K);m.risk=10;S.cha+=10;K.rep+=10},
 ev:[
 [0,K=>C('👑 บทเรียนเจ้าหญิง','ครูมารยาทให้จำตราประจำตระกูลขุนนางทั้งแคว้น เจ้าหญิงตัวจริงจำได้หมดตั้งแต่สี่ขวบ',[
  O('🛡️ จำตราให้ได้ (มินิเกม)',()=>mgNames('จำตราตระกูลแบบเจ้าหญิง',sc=>{const m=MS(K);if(sc>=.6){m.risk=Math.max(0,m.risk-5);feed('🛡️ ครูพยักหน้า "เหมือนท่านหญิงตอนเด็กไม่มีผิด"')}else{m.risk+=10;feed('🛡️ ครูขมวดคิ้ว "ท่านหญิงเคยจำได้หมด…"')}})),
  O('🗑️ ใช้ทักษะจากสลัมแอบลอกโพย',()=>{MS(K).slum=1;feed('🗑️ ไม่มีใครจับได้ ทักษะล้วงกระเป๋ายังไม่หายไปไหน')})])],
 [14,K=>C('👸 ราชินีสงสัย','ราชินีจ้องมือคุณนานเกินไป "ลูกแม่เคยมีไฝตรงนี้นี่นา"',[
  O('🗣️ ตอบให้เนียน (มินิเกม)',()=>mgRead('ตอบคำถามราชินี','ราชินี',sc=>{const m=MS(K);if(sc>=.55)feed('🗣️ ราชินียิ้ม "แม่คงจำผิด"');else{m.risk+=20;feed('🗣️ ราชินีเงียบ แล้วกอดคุณแน่นเกินไป')}})),
  O('😢 บอกความจริงกับราชินี',()=>{const m=MS(K);m.queen=1;feed(`😢 ราชินีร้องไห้ "แม่รู้ตั้งแต่วันแรก แต่แม่อยากมีลูกสาวอีกครั้ง"`)})])],
 [18,K=>{const m=MS(K);m.back=1;C('🚪 เจ้าหญิงตัวจริงกลับมา','หญิงสาวผอมโซเคาะประตูวังตอนกลางคืน หน้าเหมือนคุณทุกอย่าง แม้แต่ไฝที่ราชินีจำได้',[
  O('🤝 พาเธอเข้าวังอย่างลับๆ',()=>{m.sis=1;feed('🤝 เธอเล่าว่าถูกลักพาไปขายเป็นทาสทางใต้ คุณเป็นคนแรกที่ฟังจนจบ')}),
  O('🚪 ไล่เธอไปก่อนใครเห็น',()=>{K.dark+=15;m.risk+=15;m.evict=1;feed('🚪 เธอมองคุณครั้งสุดท้าย "เธอมีชีวิตของฉัน รักษามันให้ดีนะ"')}),
  O('👑 พาเธอไปพบราชาตอนนี้เลย',()=>{m.rev=1;m.risk=100;feed('👑 ราชามองหน้าลูกสาวสองคนสลับไปมา แล้วนั่งลงช้าๆ')})])}],
 [21,K=>C('⚔️ ใครคือตัวจริง','สภาขุนนางเรียกประชุม มีคนปล่อยข่าวว่าเจ้าหญิงเป็นตัวปลอม ต้องตอบคำถามที่มีแต่ตัวจริงตอบได้',[
  O('🧠 ตอบด้วยความรู้ที่เรียนมาเจ็ดปี (มินิเกม)',()=>mgRead('ตอบสภาขุนนาง','ประธานสภา',sc=>{const m=MS(K);if(sc>=.6)feed('🧠 สภายอมรับ คนปล่อยข่าวถูกเนรเทศ');else{m.risk+=25;feed('🧠 สภาแตกเป็นสองฝ่าย')}})),
  O(MS(K).sis?'👭 ให้ตัวจริงยืนข้างคุณ':'🙇 สารภาพ',()=>{const m=MS(K);if(m.sis){m.twin=1;feed('👭 สองเจ้าหญิงหน้าเหมือนกันยืนต่อหน้าสภา "เราทั้งคู่คือเจ้าหญิงของแคว้นนี้" ไม่มีใครกล้าแย้ง')}else{m.risk=100;feed('🙇 สภาเงียบงัน')}})])]],
 yr:K=>{const m=MS(K);m.risk=cl(m.risk+(rnd()<.3?R(1,5):0),0,100);if(m.risk>=100&&!m.caught&&!m.twin){m.caught=1;return()=>C('⛓️ ถูกเปิดโปง','ทั้งแคว้นรู้แล้วว่าเจ้าหญิงเป็นเด็กจากสลัม',[
  O('🗣️ ขอโอกาสพิสูจน์ตัว',()=>mgRead('ขอความเมตตาจากราชา','ราชา',sc=>{if(sc>=.55||m.queen){m.adopt=1;feed('🗣️ ราชาประกาศรับคุณเป็นบุตรบุญธรรม "เจ็ดปีที่ผ่านมา เจ้าคือลูกสาวข้า"')}else ending(K,'fk_exile','คุณถูกเนรเทศไปชายแดน ใช้ทักษะจากวังกับทักษะจากสลัมสร้างเมืองเล็กๆ ที่ไม่มีใครถามว่ามาจากไหน','ใช้ชีวิตที่ชายแดนจนแก่')})),
  O('🏃 หนีกลับสลัม',()=>ending(K,'fk_exile','คุณกลับไปที่สลัมเดิม เด็กๆ ที่นั่นมีเจ้าหญิงตัวจริงเป็นครู สอนมารยาทกับการล้วงกระเป๋าในวิชาเดียว','จากไปท่ามกลางคนที่ไม่เคยถามว่าคุณเป็นใคร'))])}return null},
 fin:(K,o)=>{const m=MS(K);if(!m.caught&&!m.rev)o.push(O('👑 ขึ้นเป็นราชินีทั้งที่เป็นตัวปลอม',()=>ending(K,'fk_queen','คุณขึ้นครองบัลลังก์ ราชินีที่ดีที่สุดในประวัติศาสตร์แคว้นเคยเป็นเด็กล้วงกระเป๋า และไม่มีใครรู้','สวรรคตบนบัลลังก์ที่ไม่ใช่ของคุณ แต่คุณรักษามันดีกว่าใคร'),'',.3));
  if(m.twin||m.sis)o.push(O('👭 สองเจ้าหญิง หนึ่งแคว้น',()=>ending(K,'fk_sister','คุณกับเจ้าหญิงตัวจริงแบ่งงานกัน คนหนึ่งดูแลวัง อีกคนดูแลสลัม ประชาชนไม่เคยรู้ว่าวันไหนเป็นใคร','จากไปข้างพี่น้องที่โชคชะตาให้มา'),'',.3));
  if(m.queen&&m.sis&&!m.evict)o.push(O('🧬 ความจริงสุดท้ายของราชินี',()=>ending(K,'fk_real','ก่อนสิ้นใจ ราชินีบอกความจริงสุดท้าย คนที่หายไปตอนห้าขวบคือคุณ เด็กที่กลับมาคือลูกนางกำนัลที่ถูกสลับตัว ตลอดเจ็ดปีคุณเป็นตัวจริงที่เข้าใจว่าตัวเองปลอม','ครองแคว้นในฐานะตัวจริงที่ไม่เคยรู้'),'🗝️ ฉากจบลับ',.1))},
 ends:[['fk_queen','👑','ราชินีตัวปลอม','ไม่เคยถูกจับได้'],['fk_sister','👭','สองเจ้าหญิง','ร่วมมือกับตัวจริง'],['fk_exile','🏚️','กลับสู่ชายแดน','ถูกเปิดโปง'],['fk_real','🧬','ตัวจริงที่ไม่รู้ตัว','ราชินีรู้ + ช่วยตัวจริงโดยไม่ไล่',1]]};

// ---------- 💍 ตัวสำรองแต่งงานการเมือง ----------
MVX.wed={w:'noble',ic:'💍',n:'เจ้าสาวตัวสำรอง',p:12,d:'พี่สาวคนโตหนีตามคนรักไปในคืนก่อนพิธี ตระกูลจึงส่งคุณไปแต่งงานแทน กับดยุกแห่งชายแดนเหนือที่ข่าวลือว่าฆ่าคู่หมั้นมาแล้วสามคน',
 chip:K=>`💍 ใจดยุก ${MS(K).duke|0}/100 · 🏰 อำนาจในดัชชี ${MS(K).pow|0}`,
 birth:K=>{const m=MS(K);m.duke=5;m.pow=0;m.dn=nm('m').split(' ')[0]},
 ev:[
 [0,K=>C('❄️ ปราสาทชายแดนเหนือ',`ดยุก${E(MS(K).dn)}ไม่มารับที่ประตู คนรับใช้บอกว่า "ท่านดยุกสั่งว่าอย่าเข้าปีกตะวันตก และอย่าออกนอกห้องหลังเที่ยงคืน"`,[
  O('🚪 แอบเข้าปีกตะวันตกคืนแรก',()=>{const m=MS(K);m.west=1;feed('🚪 ในห้องมืดมีภาพวาดคู่หมั้นสามคน ทุกคนยังมีชีวิตอยู่ในภาพ และมีจดหมายขอบคุณดยุกที่ "ปล่อยให้เป็นอิสระ"')}),
  O('🙇 ทำตามกฎ',()=>{MS(K).duke+=5;feed('🙇 ดยุกสังเกตว่าคุณทำตามกฎทุกข้อ และเริ่มส่งดอกไม้น้ำแข็งมาไว้หน้าห้องทุกเช้า')}),
  O('📜 ยื่นสัญญาของตัวเอง: แต่งในนาม แยกห้องนอน',()=>{const m=MS(K);m.pow+=10;feed('📜 ดยุกอ่านสัญญาแล้วหัวเราะครั้งแรกในรอบสิบปี เซ็นทันที')})])],
 [0,K=>C('🗡️ นักฆ่าในงานเลี้ยงต้อนรับ','ระหว่างงานเลี้ยง คุณเห็นแสงมีดสะท้อนจากระเบียงชั้นบน เล็งไปที่ดยุก',[
  O('🛡️ ผลักดยุกหลบ',()=>{const m=MS(K);m.duke+=20;feed(`🛡️ มีดปักเก้าอี้ ดยุกมองคุณนิ่งๆ "ทำไมเจ้าช่วยข้า" · ใจดยุก ${m.duke}`)}),
  O('👀 จำหน้านักฆ่าไว้ แล้วสืบเอง (มินิเกม)',()=>mgCups('ตามดูว่านักฆ่าหายไปทางไหน',sc=>{const m=MS(K);if(sc>=.5){m.pow+=15;m.dirt=1;feed('👀 นักฆ่าถูกส่งมาโดยพ่อของคุณเอง… คุณเก็บหลักฐานไว้')}else feed('👀 คลาดกัน')},'🗡️')),
  O('🫣 ทำเป็นไม่เห็น',()=>feed('🫣 มีดพลาดเป้าไปนิดเดียว ดยุกไม่ได้หันมามองคุณเลยทั้งคืน'))])],
 [17,K=>C('❄️ คำสาปของดยุก',`คืนหิมะตกหนัก คุณเจอดยุก${E(MS(K).dn)}นอนตัวเย็นเฉียบในห้องโถง ผิวเริ่มกลายเป็นน้ำแข็ง คนรับใช้บอกว่าเป็นคำสาปประจำตระกูล`,[
  O('🔥 กอดเขาไว้ทั้งคืน',()=>{const m=MS(K);m.duke+=25;m.curse=1;feed('🔥 ตอนเช้าน้ำแข็งละลายไปครึ่งหนึ่ง ดยุกตื่นมาพบคุณหลับบนอก เขาไม่ขยับเลยจนคุณตื่น')}),
  O('⚗️ หาวิธีถอนคำสาป (มินิเกม)',()=>mgPotion('ยาต้านคำสาปน้ำแข็ง',4,sc=>{const m=MS(K);m.curse=1;if(sc>=.6){m.cure=(m.cure|0)+1;feed('⚗️ ยาชะลอคำสาปได้ ดยุกพูดคำว่า "ขอบคุณ" ครั้งแรก');m.duke+=10}else feed('⚗️ ยาไม่ได้ผล แต่ดยุกเห็นว่าคุณพยายาม')}))])],
 [20,K=>C('⚔️ สงครามชายแดน','อาณาจักรเหนือบุกข้ามพรมแดน ดยุกต้องนำทัพ และต้องมีคนคุมปราสาทกับเสบียงทั้งดัชชี',[
  O('🏰 คุมดัชชีแทนดยุก',()=>{const m=MS(K);m.pow+=25;feed('🏰 คุณจัดการเสบียง ภาษี และสายลับได้ดีจนดยุกกลับมาพบดัชชีที่รวยกว่าตอนก่อนสงคราม'+money(500))}),
  O('⚔️ ขี่ม้าตามไปแนวหน้า',()=>duel('แม่ทัพเหนือ',Math.round(threat(K)*1.1),w=>{const m=MS(K);if(w){m.duke+=20;feed('⚔️ คุณช่วยดยุกจากวงล้อม ทหารทั้งกองทัพเรียกคุณว่า "ดัชเชสแห่งหิมะ"')}else feed('⚔️ ถูกจับเป็นเชลยหนึ่งเดือน ดยุกบุกมาช่วยด้วยตัวเอง'+hurt(.3))}),'ต่อสู้')])]],
 yr:K=>{const m=MS(K);if(m.dirt&&!m.fam&&age()>=19){m.fam=1;return()=>C('📜 หลักฐานในมือ','คุณมีหลักฐานว่าพ่อของคุณส่งนักฆ่ามาฆ่าดยุก',[O('⚖️ ส่งหลักฐานให้ราชสำนัก',()=>{m.pow+=20;feed('⚖️ ตระกูลของคุณถูกริบทรัพย์ ดยุกมองคุณอย่างเคารพ "เจ้าเลือกข้าแทนสายเลือด"');m.duke+=15}),O('🤫 ใช้ต่อรองกับพ่อ',()=>{m.pow+=10;money(1000);K.dark+=5;feed('🤫 พ่อของคุณส่งทองมาทุกปีหลังจากนั้น และไม่กล้ามองหน้าคุณอีก')})])}return null},
 fin:(K,o)=>{const m=MS(K);if(m.duke>=60)o.push(O(`💞 รักดยุก${E(m.dn)}จริงๆ`,()=>ending(K,'wd_love',`ดยุกแห่งชายแดนเหนือยิ้มทุกวันหลังจากนั้น ข่าวลือเรื่องฆ่าคู่หมั้นสามคนกลายเป็นเรื่องตลกที่เล่าในงานเลี้ยงของคุณ`,'แก่ตายในปราสาทที่ไม่หนาวอีกแล้ว'),'',.3));
  if(m.pow>=40)o.push(O('🏰 ปกครองดัชชีด้วยตัวเอง',()=>ending(K,'wd_rule','คุณกลายเป็นผู้ปกครองตัวจริงของชายแดนเหนือ ทุกคนรู้ว่าดยุกถือดาบ แต่ดัชเชสถือทุกอย่างที่เหลือ','จากไปในฐานะผู้ปกครองที่ชายแดนเหนือรักที่สุด'),'',.3));
  if(m.curse&&m.duke>=70&&(m.cure|0)>=1)o.push(O('❄️ ถอนคำสาปตระกูลดยุก',()=>ending(K,'wd_curse','คำสาปน้ำแข็งที่สืบทอดมาเจ็ดชั่วคนละลายลงในคืนที่ดยุกพูดว่ารักคุณ หิมะที่ชายแดนเหนือหยุดตกเป็นครั้งแรกในสามร้อยปี และดอกไม้บานเต็มทุ่ง','แก่ตายในฤดูใบไม้ผลิที่ชายแดนเหนือไม่เคยมี'),'🗝️ ฉากจบลับ',.1));
  o.push(O('🏃 หนีไปตามทางของตัวเอง',()=>ending(K,'wd_run','คุณทิ้งจดหมายไว้หนึ่งฉบับแล้วหายไปในคืนหิมะตก เหมือนพี่สาวที่เคยทิ้งคุณไว้ ต่างกันตรงที่คุณไม่ได้ทิ้งใครให้ต้องรับกรรมแทน','ใช้ชีวิตเป็นอิสระในเมืองที่ไม่มีใครรู้จัก'),'',.15))},
 ends:[['wd_love','💞','ดัชเชสแห่งหิมะ','ใจดยุก 60 ขึ้นไป'],['wd_rule','🏰','ผู้ปกครองตัวจริง','อำนาจในดัชชี 40 ขึ้นไป'],['wd_run','🏃','เจ้าสาวที่หนีไป','เลือกเส้นทางของตัวเอง'],['wd_curse','❄️','ฤดูใบไม้ผลิแห่งชายแดนเหนือ','ถอนคำสาปตระกูลดยุก',1]]};

// ---------- 🃏 ลูกนอกสมรส ----------
const SIBT=[['🗡️','พี่ชายคนโต','นักรบที่ไม่เคยแพ้'],['📚','พี่สาวคนรอง','ฉลาดที่สุดในราชสำนัก'],['💰','พี่ชายคนกลาง','รวยและซื้อได้ทุกอย่าง'],['🌹','น้องสาว','ทุกคนรักเธอ'],['🐍','น้องชายคนเล็ก','ยิ้มตลอดเวลา และไม่มีใครรู้ว่าคิดอะไร']];
MVX.bast={w:'noble',ic:'🃏',n:'ลูกนอกสมรส',p:12,d:'คุณคือลูกนอกสมรสของดยุกผู้ยิ่งใหญ่ที่เพิ่งถูกรับเข้าตระกูล พินัยกรรมเขียนว่า "ทายาทจะถูกเลือกในวันเกิดอายุ 24 ของลูกคนสุดท้าย" คุณคือลูกคนสุดท้าย',
 chip:K=>`🃏 พี่น้อง ${MS(K).sib.filter(s=>s.st!=='dead').map(s=>s.ic+(s.st==='ally'?'🤝':s.st==='foe'?'⚔️':'')).join('')} · ⭐ ${MS(K).fav|0}`,
 birth:K=>{const m=MS(K);m.sib=SIBT.map(s=>({ic:s[0],r:s[1],d:s[2],n:nm(s[1].includes('สาว')?'f':'m').split(' ')[0],st:'neu'}));m.fav=0},
 ev:[
 [0,K=>C('🏰 อาหารเย็นมื้อแรก','โต๊ะยาว พี่น้องห้าคนมองคุณเหมือนมองแมลง ยกเว้นน้องสาวที่ยิ้มให้ และน้องชายคนเล็กที่ยิ้มให้เหมือนกัน แต่ยิ้มคนละแบบ',[
  O('🍷 ยกแก้วดื่มให้ทุกคน',()=>{const m=MS(K);m.fav+=5;feed('🍷 ดยุกยิ้มนิดหนึ่ง พี่ชายคนโตวางแก้วดังปัง')}),
  O('🌹 นั่งข้างน้องสาว',()=>{const s=MS(K).sib[3];s.st='ally';feed(`🌹 ${E(s.n)}กระซิบ "อย่ากินซุปนะ" คุณไม่กิน คืนนั้นคนรับใช้ที่แอบชิมซุปท้องเสียทั้งคืน`)}),
  O('🐍 จ้องตาน้องชายคนเล็กกลับ',()=>{const s=MS(K).sib[4];s.st='foe';feed(`🐍 ${E(s.n)}หัวเราะเบาๆ "สนุกแน่"`)})])],
 [15,K=>C('🗡️ พี่ชายคนโตท้าดวล',`${E(MS(K).sib[0].n)}ท้าดวลต่อหน้าอัศวินทั้งปราสาท "ลูกเมียน้อยถือดาบเป็นด้วยเหรอ"`,[
  O('⚔️ รับคำท้า',()=>mgDuel('ดวลพี่ชายคนโต',MS(K).sib[0].n,sc=>{const m=MS(K),s=m.sib[0];if(sc>=.6){s.st='ally';m.fav+=10;feed('⚔️ พี่ชายแพ้ครั้งแรกในชีวิต เขาลุกขึ้นแล้วยื่นมือ "เจ้ามีเลือดพ่อจริงๆ"')}else{s.st='foe';feed('⚔️ คุณแพ้ ทุกคนหัวเราะ'+hurt(.2))}}),'มินิเกม'),
  O('🙇 ปฏิเสธอย่างสุภาพ',()=>{MS(K).sib[0].st='foe';feed('🙇 พี่ชายเรียกคุณว่า "ไอ้ขี้ขลาด" ทั้งปี')})])],
 [17,K=>C('💰 พี่ชายคนกลางยื่นข้อเสนอ',`${E(MS(K).sib[2].n)}เสนอทองหนึ่งหมื่นเหรียญ แลกกับการสละสิทธิ์ทายาท`,[
  O('💰 รับเงิน',()=>{money(10000);MS(K).sold=1;feed('💰 คุณรวยทันที และหลุดจากการแย่งชิงอย่างเป็นทางการ… บนกระดาษ')}),
  O('🤝 เสนอเป็นพันธมิตรแทน',()=>mgRead('ต่อรองกับพี่ชายนักธุรกิจ',MS(K).sib[2].n,sc=>{const s=MS(K).sib[2];if(sc>=.55){s.st='ally';feed('🤝 "ฉลาดกว่าที่คิด" เขาตกลง')}else{s.st='foe';feed('🤝 เขาหัวเราะเยาะ แล้วไปจ้างคนตามคุณ')}}))])],
 [19,K=>C('📚 พี่สาวคนรองถูกวางยา',`${E(MS(K).sib[1].n)}ล้มลงกลางงานเลี้ยง ทุกคนหันมามองคุณ คนนอกตระกูล`,[
  O('⚗️ รักษาเธอ (มินิเกม)',()=>mgPotion('ยาถอนพิษให้พี่สาว',4,sc=>{const m=MS(K),s=m.sib[1];if(sc>=.55){s.st='ally';m.fav+=10;feed('⚗️ พี่สาวรอด และรู้ว่าใครวางยา — น้องชายคนเล็ก')}else{s.st='dead';feed('⚗️ ไม่ทัน… พี่สาวจากไป ทุกสายตาชี้มาที่คุณ');m.fav-=10}}),'มินิเกม'),
  O('🕵️ ตามหาคนวางยา',()=>mgCups('ตามหาแก้วที่มียาพิษ',sc=>{const m=MS(K);if(sc>=.5){m.sib[4].st='foe';m.ev=1;feed(`🕵️ คนวางยาคือ${E(m.sib[4].n)} คุณมีหลักฐานแล้ว`)}else{m.sib[1].st='dead';feed('🕵️ หาไม่เจอ พี่สาวไม่รอด')}},'🍷'))])],
 [22,K=>C('🐍 แผนสุดท้ายของน้องชายคนเล็ก',`${E(MS(K).sib[4].n)}เชิญคุณไปดื่มชาสองคน "ไม่ต้องกลัว เราเป็นลูกนอกคอกเหมือนกันนี่"`,[
  O('🍵 ไป แต่สลับแก้วก่อน (มินิเกม)',()=>mgCups('สลับถ้วยชาโดยไม่ให้เขาเห็น',sc=>{const m=MS(K),s=m.sib[4];if(sc>=.5){s.st='dead';K.dark+=10;feed('🍵 เขาดื่มชาของตัวเอง… แล้วยิ้มเป็นครั้งสุดท้าย "เก่งกว่าที่คิด"')}else{S.hp=Math.max(1,Math.round(S.maxHp*.2));feed('🍵 คุณรอดมาได้อย่างหวุดหวิด')}},'🍵')),
  O('🤝 ยื่นมือให้เขาจริงๆ',()=>{const s=MS(K).sib[4];if(rnd()<.4){s.st='ally';feed('🐍 เขานิ่งไปนาน แล้วร้องไห้เป็นครั้งแรก "ไม่เคยมีใครยื่นมือให้ข้าเลย"')}else{feed('🐍 เขาจับมือคุณ… มีเข็มพิษซ่อนในแหวน'+hurt(.4))}})])]],
 yr:K=>{const m=MS(K);if(age()>=24&&!m.will){m.will=1;return()=>{const al=m.sib.filter(s=>s.st==='ally').length,dd=m.sib.filter(s=>s.st==='dead').length;m.al=al;m.dd=dd;C('📜 วันอ่านพินัยกรรม',`ทนายเปิดซองพินัยกรรม · พันธมิตร ${al} คน · พี่น้องที่จากไป ${dd} คน · ความโปรดปรานจากดยุก ${m.fav}`,[
  O('📜 ฟังคำประกาศ',()=>{const sc=m.fav/30+al*.2-(m.sold?1:0)+rnd()*.3;if(sc>=.6){m.heir=1;say('📜 <b>ทายาทคือลูกคนสุดท้าย</b> ห้องประชุมเงียบสนิท','myth',true)}else feed('📜 ทายาทคือพี่ชายคนโต… คุณได้ปราสาทเล็กๆ ทางใต้')},'',1)])}}return null},
 fin:(K,o)=>{const m=MS(K);if(m.heir)o.push(O('👑 ปกครองตระกูลในฐานะทายาท',()=>ending(K,'bs_heir','ลูกนอกสมรสกลายเป็นดยุก ตระกูลไม่เคยรุ่งเรืองเท่านี้มาก่อน และกฎใหม่ข้อแรกของคุณคือ "ลูกทุกคนมีสิทธิ์เท่ากัน"','จากไปในฐานะดยุกที่ตระกูลจดจำ'),'',.3));
  if((m.al|0)>=4)o.push(O('🤝 ห้าพี่น้องปกครองร่วมกัน',()=>ending(K,'bs_family','คุณปฏิเสธการเป็นทายาทคนเดียว แล้วแบ่งตระกูลให้พี่น้องทุกคนดูแลคนละด้าน ตระกูลที่เคยแตกกลายเป็นตระกูลที่แข็งแกร่งที่สุดในแคว้น','แก่ตายท่ามกลางพี่น้องที่เคยอยากให้คุณตาย'),'🗝️ ฉากจบลับ',.1));
  if((m.dd|0)>=2&&K.dark>=30)o.push(O('🩸 ทายาทคนเดียวที่เหลือ',()=>ending(K,'bs_blood','สุดท้ายเหลือคุณคนเดียวที่โต๊ะอาหารยาว ทุกเก้าอี้ว่าง ตระกูลเป็นของคุณทั้งหมด และคืนที่เงียบที่สุดก็เป็นของคุณด้วย','จากไปในปราสาทที่ไม่มีใครเหลือ'),'',.2));
  o.push(O('🌾 ทิ้งนามสกุล ใช้ชีวิตของตัวเอง',()=>ending(K,'bs_exile','คุณคืนนามสกุลให้ตระกูลแล้วเดินออกจากปราสาท ข้างนอกไม่มีใครถามว่าคุณเป็นลูกใคร','ใช้ชีวิตอิสระจนแก่'),'',.15))},
 ends:[['bs_heir','👑','ลูกนอกสมรสบนบัลลังก์','ได้เป็นทายาท'],['bs_blood','🩸','ทายาทคนเดียวที่เหลือ','พี่น้องจากไป + ความมืดสูง'],['bs_exile','🌾','ทิ้งนามสกุล','เลือกเป็นอิสระ'],['bs_family','🤝','ห้าพี่น้อง','พันธมิตรกับพี่น้อง 4 คนขึ้นไป',1]]};

// =================== 🗺️ ดันเจี้ยนเลือกทาง ===================
const DN={gold:['💰','ห้องสมบัติ'],mob:['⚔️','มอนสเตอร์'],elite:['💀','มอนสเตอร์หัวหน้า'],myst:['❓','ห้องลึกลับ'],rest:['🔥','กองไฟ'],shop:['🛒','พ่อค้าใต้ดิน'],hide:['❔','มองไม่เห็น']};
let DM=null;
function dunMap(K,title,fl,cb){DM={K,title,fl:fl||6,f:0,hp:3,g:0,items:[],log:[],cb,done:0};if(auto){let f=0,hp=3,g=0;while(f<DM.fl&&hp>0){const r=rnd();if(r<.3)g+=R(20,60);else if(r<.65){if(fight(threat(K)*(1+f*.06)))g+=R(15,40);else hp--}else if(r<.8)hp=Math.min(3,hp+1);f++}DM.f=f;DM.hp=hp;DM.g=g;return dmEnd(hp<=0)}dmDraw()}
function dmNodes(){const f=DM.f;if(f===DM.fl-1)return[['boss','👹','บอสชั้นสุดท้าย']];const pool=['gold','mob','mob','elite','myst','rest','shop','hide'];return shuf(pool).slice(0,3).map(k=>[k,DN[k][0],DN[k][1]])}
function dmDraw(){if(!DM)return;DM.cur=dmNodes();const H='❤️'.repeat(DM.hp)+'🖤'.repeat(Math.max(0,3-DM.hp));
 modal(`<div class="fmg"><h3>🗺️ ${E(DM.title)}</h3><div class="tg">ชั้น ${DM.f+1}/${DM.fl} · ${H} · 💰 ${DM.g}${DM.items.length?` · 🎁 ${DM.items.length}`:''}</div><div style="display:flex;justify-content:center;gap:4px;margin:6px 0 10px">${Array.from({length:DM.fl},(_,i)=>`<span style="width:18px;height:6px;border-radius:3px;background:${i<DM.f?'#ffd54a':i===DM.f?'#fff':'#444'}"></span>`).join('')}</div>
 <div style="display:grid;grid-template-columns:repeat(${DM.cur.length},1fr);gap:8px">${DM.cur.map((n,i)=>`<button class="opt" onclick="_dmGo(${i})" style="padding:14px 4px;text-align:center"><div style="font-size:30px">${n[1]}</div><small>${n[2]}</small></button>`).join('')}</div>
 <div class="fmgLog" style="min-height:40px">${DM.log.slice(-2).join('<br>')||'เลือกทางเดิน · ยิ่งลึกยิ่งอันตราย ยิ่งลึกยิ่งรวย'}</div><div class="fmgB"><button onclick="_dmOut()" style="background:#333">🚪 ถอยกลับพร้อมของที่มี</button></div></div>`,'fanmg')}
window._dmGo=i=>{if(!DM||DM.done)return;const K=DM.K,n=DM.cur[i];let k=n[0];if(k==='hide')k=pick(['gold','mob','elite','myst','rest','boss2']);const f=DM.f,th=threat(K)*(1+f*.07);let t='';
 if(k==='gold'){const g=R(25,70)*(1+f*.2)|0;DM.g+=g;t=`💰 หีบสมบัติ +${g}`}
 else if(k==='mob'){if(fight(th)){const g=R(10,35);DM.g+=g;t=`⚔️ ชนะ ${pick(['ก็อบลินถือหม้อ','หมาป่าเงา','โครงกระดูกที่เต้นรำ','สไลม์สามสี'])} +${g}`}else{DM.hp--;t='⚔️ โดนโจมตี -❤️'}}
 else if(k==='elite'||k==='boss2'){if(fight(th*1.25)){DM.items.push(R(2,3));DM.g+=R(40,90);t='💀 ล้มหัวหน้าได้! 🎁 ได้ของ'}else{DM.hp-=2;t='💀 หัวหน้าแข็งเกินไป -❤️❤️'}}
 else if(k==='myst'){const r=rnd();if(r<.3){DM.items.push(R(1,3));t='❓ แท่นบูชาให้ของขวัญ 🎁'}else if(r<.5){DM.hp=Math.min(3,DM.hp+1);t='❓ น้ำพุฟื้นพลัง +❤️'}else if(r<.7){DM.hp--;t='❓ กับดัก! -❤️'}else if(r<.85){const g=R(60,150);DM.g+=g;t=`❓ เจอนักผจญภัยที่หลับอยู่บนกองทอง… เขาให้ส่วนแบ่ง +${g}`}else{DM.f++;t='❓ หลุมลึก! ตกลงไปอีกหนึ่งชั้น'}}
 else if(k==='rest'){DM.hp=Math.min(3,DM.hp+1);t='🔥 พักข้างกองไฟ +❤️'}
 else if(k==='shop'){if(DM.g>=60){DM.g-=60;DM.items.push(R(2,4));t='🛒 ซื้อของจากพ่อค้าใต้ดิน -60 🎁'}else t='🛒 เงินไม่พอ พ่อค้าหัวเราะแห้งๆ'}
 else if(k==='boss'){if(fight(th*1.4)){DM.items.push(R(3,5));DM.g+=R(150,300);DM.log.push('👹 ล้มบอสชั้นสุดท้าย!');DM.f++;return dmEnd(false)}else{DM.hp-=2;t='👹 บอสฟาดคุณกระเด็น -❤️❤️'}}
 DM.log.push(t);if(DM.hp<=0)return dmEnd(true);if(k!=='boss')DM.f++;if(DM.f>=DM.fl)return dmEnd(false);dmDraw()};
window._dmOut=()=>{if(DM&&!DM.done)dmEnd(false,1)};
function dmEnd(dead,out){const D=DM;if(!D||D.done)return;D.done=1;DM=null;try{if(!auto)closeM()}catch(e){}const K=D.K;let t;
 if(dead){const g=Math.round(D.g*.3);money(g);t=`💀 ${D.title}: หมดแรงที่ชั้น ${D.f+1} ถูกลากออกมา เหลือเงินแค่ ${g}${hurt(.35)}`}
 else{money(D.g);t=`🗺️ ${D.title}: ${out?'ถอยกลับที่ชั้น '+(D.f+1):'ลงถึงชั้น '+D.f} ได้ 💰 ${D.g}`;for(const tr of D.items)t+=lootDrop(K,tr,'ดันเจี้ยน');if(D.f>=D.fl&&!out)t+=pw(capOf(K)*.05)}
 feed(t);try{D.cb&&D.cb(D)}catch(e){}}

// =================== ⬜ หน้าต่างระบบ ===================
const SQ=[['💪','วิดพื้น 100 ครั้งก่อนอาหารเช้า','mash','pw'],['💌','สารภาพรักกับใครก็ได้ภายในวันนี้','read','cha'],['🐉','ทักทายมังกรโดยไม่โดนเผา','hold','gold'],['🧹','ทำความสะอาดห้องน้ำกิลด์ทั้งหมด','mash','loot'],['🎤','ร้องเพลงกลางตลาดจนมีคนให้ทิป','dance','gold'],['🥚','ฟักไข่ด้วยความร้อนจากร่างกาย','hold','pet'],['🃏','ชนะไพ่กับพ่อค้าที่ไม่เคยแพ้','read','gold'],['🌀','จำลำดับดาวบนฟ้าคืนนี้','rune','int'],['🗡️','ปัดลูกธนูสิบดอกด้วยดาบไม้','combo','pw'],['🎩','หาเหรียญใต้หมวกของนักมายากล','cups','luck'],['🍳','ทำอาหารให้คนแปลกหน้าห้าคน','hold','cha'],['😴','นอนให้ครบแปดชั่วโมง (ยากที่สุด)','none','heal'],['🐸','จูบกบหนึ่งตัว','none','rnd'],['🏃','วิ่งรอบเมืองก่อนพระอาทิตย์ขึ้น','mash','hp'],['🙇','ขอโทษคนที่เคยทำผิดด้วย','read','karma'],['🕳️','ดำดันเจี้ยนให้ถึงชั้นลึกสุด','dun','loot']];
const SPEN=['ผมกลายเป็นสีชมพูหนึ่งปี','ทุกคำที่พูดลงท้ายด้วย "เมี้ยว" หนึ่งเดือน','เงินหายไปครึ่งหนึ่ง','สะดุดล้มทุกครั้งที่เจอคนที่ชอบ','ไฟฟ้าช็อตเบาๆ ทุกเช้า','ร่างกายตัวเล็กลงเท่าเด็กห้าขวบหนึ่งสัปดาห์','ได้ยินเสียงแจ้งเตือนในหัวทุกห้านาที'];
const SWHO=[['🌟','เทพที่อัญเชิญคุณ ซึ่งเหงามาห้าพันปี'],['⏳','ตัวคุณเองจากอนาคต ที่ย้อนมาช่วยไม่ให้ทำพลาดซ้ำ'],['👻','ผู้กล้ารุ่นแรกที่ตายไปแล้ว วิญญาณติดอยู่ในระบบ'],['🤖','AI ผู้ช่วยจากโลกเดิมที่หลงมาตอนอัญเชิญ']];
const SY=K=>K.sysw||null;
function sqDo(K,q,done){const F={mash:c=>mgMash(q[1],c),read:c=>mgRead(q[1],'ระบบ',c),hold:c=>mgHold(q[1],c),dance:c=>mgDance(q[1],'ฝูงชน',c),rune:c=>mgRune(q[1],5,c),combo:c=>mgCombo(q[1],c),cups:c=>mgCups(q[1],c,'🪙'),none:c=>c(rnd()<.6?.8:.3),dun:c=>dunMap(K,'เควสระบบ: ดันเจี้ยน',5,d=>c(d.f>=5?1:d.f/6))};(F[q[2]]||F.none)(done)}
function sqReward(K,k){const s=SY(K);s.pt=(s.pt|0)+1;const R0={pw:()=>{K.pw+=capOf(K)*.06;return'💪 พลัง +'},gold:()=>money(R(150,400)),loot:()=>lootDrop(K,R(2,4),'ระบบ'),cha:()=>{S.cha+=5;return' · ✨ เสน่ห์ +5'},int:()=>{S.int+=5;return' · 🧠 ปัญญา +5'},pet:()=>{const X=X3(K);if(!X.pet){X.pet=newPet(pick(Object.keys(PET)));return' · 🥚 ได้ไข่สัตว์อสูร'}X.pet.fd.love+=2;return' · 🐲 สัตว์คู่ใจรักคุณมากขึ้น'},luck:()=>{K.fx.luck=(K.fx.luck||0)+.02;return' · 🍀 โชค +2% ถาวร'},heal:()=>{heal(1);return' · ❤️ ฟื้นเต็ม'},rnd:()=>rnd()<.5?(K.save=(K.save|0)+1,' · 🐸 กบกลายเป็นเจ้าชาย… ให้พรรอดตาย +1'):' · 🐸 กบก็คือกบ แต่ระบบให้ +1 แต้มความกล้า',hp:()=>{S.maxHp+=20;return' · ❤️ HP สูงสุด +20'},karma:()=>{S.karma=(+S.karma||0)+10;return' · 🙏 กรรมดี +10'}};return(R0[k]||R0.gold)()}
function evSys(K){const s=SY(K),q=pick(SQ.filter(x=>!(s.last===x[1])));s.last=q[1];const pen=pick(SPEN);
 C(`⬜ [เควสประจำปี] ${q[0]} ${q[1]}`,`<div style="border:1px solid #9bd;padding:8px;border-radius:8px;background:rgba(120,180,255,.08)">⬜ <b>ระบบ:</b> ${pick(['ภารกิจใหม่มาถึงแล้ว','ผู้เล่นมีหน้าที่ต้องทำ','อย่าคิดจะหนีนะ','ถ้าไม่ทำ… ก็ลองดูสิ'])}<br>🎯 ${q[1]}<br>⚠️ ถ้าไม่ทำ: ${pen}</div> · สำเร็จแล้ว ${s.done|0} ครั้ง`,[
  O('✅ ทำเควส',()=>sqDo(K,q,sc=>{if(sc>=.5){s.done=(s.done|0)+1;feed(`⬜ <b>[สำเร็จ]</b> ${q[1]}${sqReward(K,q[3])}`)}else{s.fail=(s.fail|0)+1;feed(`⬜ <b>[ล้มเหลว]</b> บทลงโทษ: ${pen}`);if(/เงินหาย/.test(pen))S.money=Math.round((S.money||0)/2)}}),'',.7),
  O('❌ ไม่ทำ',()=>{s.fail=(s.fail|0)+1;s.rebel=(s.rebel|0)+1;feed(`⬜ <b>[ปฏิเสธเควส]</b> บทลงโทษ: ${pen}`);if(/เงินหาย/.test(pen))S.money=Math.round((S.money||0)/2)},'',.3)])}
function evSysRev(K){const s=SY(K);s.rev=1;const w=s.rebel>=4?SWHO[0]:pick(SWHO);s.who=w;
 C('⬜ [ระบบ] ถึงเวลาบอกความจริง',`หน้าต่างระบบกะพริบแล้วเปลี่ยนเป็นตัวอักษรที่เขียนด้วยมือ: "เราอยู่ด้วยกันมานานพอแล้ว ข้าคือ… ${w[0]} <b>${w[1]}</b>"`,[
  O('🤝 ขอบคุณที่อยู่ด้วยกันมา',()=>{s.bond=1;feed('⬜ หน้าต่างระบบเงียบไปนาน แล้วขึ้นข้อความเดียว: "[ความสัมพันธ์: คู่หู]"')}),
  O('😠 ทำไมไม่บอกตั้งแต่แรก',()=>{s.angry=1;feed('⬜ "[ขออภัย] ถ้าบอก เจ้าจะไม่ทำเควสสักข้อ"')}),
  O('🔓 ขอสิทธิ์ผู้ดูแลระบบ (มินิเกม)',()=>mgRune('ถอดรหัสแกนของระบบ',6,sc=>{if(sc>=.6){s.admin=1;say('⬜ <b>[สิทธิ์ผู้ดูแลระบบ: อนุมัติ]</b> คุณเห็นโค้ดของโลกทั้งใบเป็นครั้งแรก','myth',true)}else feed('⬜ "[ปฏิเสธ] ยังไม่ถึงเวลา"')}),'',.2)])}
const SYSE=[['sys_partner','🤝','คู่หูกับหน้าต่างระบบ','ทำเควสครบจนระบบเผยตัว และอยู่ด้วยกันจนจบ'],['sys_delete','🗑️','ลบระบบทิ้ง','ใช้ชีวิตที่ไม่มีใครสั่ง'],['sys_admin','🔓','ผู้ดูแลระบบของโลก','ได้สิทธิ์ผู้ดูแลระบบ',1]];
for(const w in ENDS)for(const e of SYSE)ENDS[w][e[0]]=[e[1],e[2],e[3]].concat(e[4]?[1]:[]);
function sysFin(K,o){const s=SY(K);if(!s||!s.on)return;
 if(s.rev&&s.bond)o.push(O('🤝 เดินต่อกับหน้าต่างระบบ',()=>ending(K,'sys_partner',`คุณกับ${s.who?s.who[1]:'ระบบ'}ใช้ชีวิตด้วยกันจนวันสุดท้าย หน้าต่างสุดท้ายที่ขึ้นมาเขียนว่า "[เควสหลักสำเร็จ: มีความสุข]"`,'จากไปพร้อมหน้าต่างระบบที่ขึ้นคำว่า "ขอบคุณ"'),'',.25));
 if(s.done>=3)o.push(O('🗑️ ลบหน้าต่างระบบทิ้ง',()=>ending(K,'sys_delete','คุณกดปุ่มที่ไม่เคยมีใครกล้ากด [ลบระบบ] หน้าต่างกะพริบครั้งสุดท้าย "[เข้าใจแล้ว ขอให้โชคดี]" ชีวิตที่เหลือไม่มีเควส ไม่มีรางวัล ไม่มีบทลงโทษ มีแค่คุณ','ใช้ชีวิตที่ไม่มีใครสั่งจนแก่'),'',.2));
 if(s.admin)o.push(O('🔓 เขียนกฎของโลกใหม่',()=>ending(K,'sys_admin','คุณแก้กฎของโลกบรรทัดแรก: "ไม่มีใครต้องถูกอัญเชิญโดยไม่สมัครใจ" แล้วปิดหน้าต่างระบบลงตลอดกาล คุณกลายเป็นผู้ดูแลที่ไม่มีใครเห็น','กลายเป็นผู้ดูแลระบบของโลก'),'🗝️ ฉากจบลับ',.1))}

// =================== ระบบรวม (ต่างโลก + อะคาเดมี่) ===================
for(const k in MVX){const V=MVX[k];for(const w of MVXW[V.w])for(const e of V.ends)ENDS[w][e[0]]=[e[1],e[2],e[3]].concat(e[4]?[1]:[])}
const mvxOk=(K,k)=>MVXW[MVX[k].w].includes(K.w);
function mvxAssign(K){if(K.w==='magic'||K.mvx!==undefined)return;const L=Object.keys(MVX).filter(k=>mvxOk(K,k)),tot=L.reduce((a,k)=>a+MVX[k].p,0)+9;let r=rnd()*tot,k=null;for(const x of L){r-=MVX[x].p;if(r<0){k=x;break}}
 try{if(window._mvForce&&MVX[window._mvForce]&&mvxOk(K,window._mvForce))k=window._mvForce}catch(e){}K.mvx=k;
 if(!K.sysw){const on=rnd()<.2||window._sysForce;K.sysw={on:on?1:0,done:0,fail:0};if(on)say('⬜ <b>[ระบบ] ยินดีต้อนรับ ผู้เล่น</b> — หน้าต่างโปร่งแสงลอยอยู่ตรงหน้าคุณ ไม่มีใครเห็นนอกจากคุณ','myth',true)}
 if(!k)return;MS(K);MVX[k].birth(K);recalcE(K);say(`${MVX[k].ic} <b>ชะตาพิเศษ: ${MVX[k].n}</b> — ${MVX[k].d}`,'myth',true)}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(K){if(K.w==='magic'&&!K.sysw){const on=rnd()<.2||window._sysForce;K.sysw={on:on?1:0,done:0,fail:0};if(on)say('⬜ <b>[ระบบ] ยินดีต้อนรับ ผู้เล่น</b> — หน้าต่างโปร่งแสงลอยอยู่ตรงหน้าคุณ ไม่มีใครเห็นนอกจากคุณ','myth',true)}mvxAssign(K)}sync();render();saveGame()}catch(e){console.error('mvx',e)}},1600)}}
for(const w of ['hero','trash','lost','magic','noble'])FOK[w].push(['fa_deep','🕳️','ดำดันเจี้ยน',K=>!school(K)&&age()>=15]);
FOK.hero.push(['fa_cook','🍳','เปิดครัว',K=>K.mvx==='cook'],['fa_dgn','🏰','ขยายดันเจี้ยน',K=>K.mvx==='dungeon']);FOK.trash.push(['fa_cook','🍳','เปิดครัว',K=>K.mvx==='cook'],['fa_dgn','🏰','ขยายดันเจี้ยน',K=>K.mvx==='dungeon']);
{const _df=doFocus;doFocus=function(K){const f=S.focus;if(f==='fa_deep'){feed('🕳️ คุณเตรียมเชือก คบเพลิง และขนมปังสามก้อน แล้วลงดันเจี้ยน');queue(()=>dunMap(K,pick(['ถ้ำเสียงกระซิบ','สุสานราชาไร้ชื่อ','เหมืองที่ถูกทิ้ง','หอคอยกลับหัว','ห้องใต้ดินของแม่มด']),R(5,8)));return}
 if(f==='fa_cook'){const m=MS(K);feed(`🍳 เปิดครัว${pick(['ข้างประตูเมือง','ในตรอกนักผจญภัย','บนเรือ','หน้ากิลด์'])} คนต่อคิวยาว${money(R(30,90)*(1+(m.star|0)*.3))}`);return}
 if(f==='fa_dgn'){feed(`🏰 คุณกับก็อบลินขุดดันเจี้ยนทั้งปี`);return}return _df(K)}}
{const _x=xFin;xFin=function(K,o){_x(K,o);try{sysFin(K,o);if(K.w!=='magic'&&K.mvx&&MVX[K.mvx]){MVX[K.mvx].fin(K,o);const m=MS(K);if((m.dfr|0)<2&&age()<50)o.push(O('🚶 ยังไม่ใช่ตอนจบของคุณ',()=>{m.dfr=(m.dfr|0)+1;K.arcAt=age()+R(5,8);feed(`🚶 ${MVX[K.mvx].ic} เรื่องของคุณยังไม่จบ (เลื่อนได้อีก ${2-m.dfr} ครั้ง)`)},'ใช้ชีวิตต่อ เรื่องราวของชะตายังเดินหน้า',.2))}}catch(e){console.error('mvxfin',e)}}}
{const _fy=fanYear;fanYear=function(){const K=FN();const a0=S.age;_fy.apply(this,arguments);if(!K||!S.alive||S.age===a0||K.end)return;
 try{if(K.mvx===undefined&&K.w!=='magic'){if(age()<=WD[K.w].a0+2)mvxAssign(K);else{K.mvx=null;if(!K.sysw)K.sysw={on:0}}}
  const s=SY(K);if(s&&!s.on&&!s.ask&&age()>=15&&age()<=30&&rnd()<.04){s.ask=1;queue(()=>C('⬜ หน้าต่างโปร่งแสง','เช้านี้มีหน้าต่างสีฟ้าลอยอยู่ตรงหน้า "[ระบบ] ตรวจพบผู้เล่นที่มีศักยภาพ ยอมรับการเชื่อมต่อหรือไม่"',[O('✅ ยอมรับ',()=>{s.on=1;feed('⬜ [เชื่อมต่อสำเร็จ] เควสแรกจะมาในปีหน้า')}),O('❌ ปฏิเสธ',()=>feed('⬜ หน้าต่างหายไป… แต่ยังได้ยินเสียงแจ้งเตือนเบาๆ ในฝันบางคืน'))]))}
  if(s&&s.on&&!s.rev&&(s.done|0)>=7)queue(()=>evSysRev(K));else if(s&&s.on&&!s.rev&&age()>=13&&rnd()<.7&&QU.length<=2)queue(()=>evSys(K));
  if(K.mvx&&MVX[K.mvx]){const V=MVX[K.mvx],m=MS(K);
   if(!m.sn[0]){m.sn[0]=1;queue(()=>V.ev[0][1](K))}
   else{const pr=V.yr(K);if(pr)queue(pr);else{const L=V.ev.map((e,i)=>[e,i]).filter(x=>!m.sn[x[1]]&&age()>=x[0][0]);if(L.length&&QU.length<=2&&rnd()<.6){const x=pick(L.slice(0,3));m.sn[x[1]]=1;queue(()=>x[0][1](K))}}}}
  if(QU.length&&!FL)flush();try{render()}catch(e){}}catch(e){console.error('mvx year',e)}}}
{const _hd=hud;hud=function(K){let h=_hd(K);try{const c=[];if(K.mvx&&MVX[K.mvx]){const V=MVX[K.mvx];c.push(`<span class="t5">${V.ic} ${V.n}</span><span class="t4">${V.chip(K)}</span>`)}const s=SY(K);if(s&&s.on)c.push(`<span style="border-color:#7bd;color:#bdf">⬜ ระบบ ${s.done|0}✓ ${s.fail|0}✗${s.rev&&s.who?' · '+s.who[0]:''}</span>`);if(c.length)h=h.replace('<div class="fhC">','<div class="fhC">'+c.join(''))}catch(e){}return h}}
window._fan6={MVX,mvxAssign,dunMap,evSys,evSysRev,plotEv,PLOT,sqDo};


// ####################################################################
// ภาค 7: ไม่ซ้ำ — เหตุการณ์ประกอบชิ้น · ผลกรรมย้อนกลับ · กฎแปลกประจำโลก · ผู้เล่าเรื่อง · ข่าวลือ
//        NPC มีชีวิต · เหตุการณ์ตำนาน · สมุดสะสม · ความสำเร็จ · ชะตาประจำวัน · ทายาทเจเนอเรชัน
// ####################################################################
const BK=()=>{try{const b=LS.get('murim_fanbook',null)||{};for(const k of['ev','rule','leg','narr','var','gen'])b[k]=b[k]||{};return b}catch(e){return{ev:{},rule:{},leg:{},narr:{},var:{},gen:{}}}};
const bkAdd=(k,id)=>{try{const b=BK();const n=!b[k][id];b[k][id]=(b[k][id]|0)+1;LS.set('murim_fanbook',b);return n}catch(e){return false}};
const X7=K=>K.x7||(K.x7={rules:[],cq:[],rum:[],nar:null,leg:{},sig:{},ach:{}});
// ---------- 🌍 กฎแปลกประจำโลก ----------
const RULE={
 truth:['🤥','ไม่มีใครโกหกได้','ทุกคำโกหกจะออกมาเป็นเสียงไก่ขัน','read:-.08 rep:5'],
 dragonpet:['🐉','มังกรเป็นสัตว์เลี้ยงทั่วไป','เด็กทุกคนมีมังกรตัวเท่าแมว','luck:.02'],
 revive:['💫','ตายแล้วฟื้นได้','แต่ทุกครั้งที่ฟื้น จะลืมคนหนึ่งคนไปตลอดกาล',''],
 moons:['🌕','ดวงจันทร์สามดวง','เรื่องแปลกเกิดบ่อยเป็นสามเท่า','ev:.04'],
 goldrain:['🪙','ฝนทองตกปีละครั้ง','ทุกคนรวย ของจึงแพงตามไปด้วย','inc:20'],
 polite:['🎩','มอนสเตอร์สุภาพ','มันขออนุญาตก่อนโจมตีทุกครั้ง','fight:.05'],
 sing:['🎶','ทุกคนร้องเพลงแทนพูดเวลาโกรธ','สงครามจึงไพเราะมาก','ring:.06'],
 lowgrav:['🪶','แรงโน้มถ่วงครึ่งเดียว','กระโดดได้สูงสามเท่า แต่ลงยาก','fight:.04 ring:.04'],
 cursegold:['💸','ทองต้องสาป','ใครเก็บเงินมากจะฝันร้าย','inc:-10 rep:8'],
 fasttime:['⏩','เวลาเดินไม่เท่ากัน','บางปีผ่านไปสองปีโดยไม่มีใครรู้ตัว',''],
 mirror:['🪞','ทุกคนมีคู่แฝดในกระจก','บางวันคู่แฝดออกมาเดินเล่น','read:.04'],
 godswalk:['⛩️','เทพเดินตามถนน','ขอพรได้ แต่เทพขี้เกียจ','luck:.03'],
 nomagic:['🚫','เวทมนตร์อ่อนแรง','ร่ายได้แค่ครึ่งเดียว กล้ามเนื้อจึงสำคัญ','pow:-3 fight:.04'],
 lovecurse:['💘','คำสาปรักแรกพบ','ทุกคนตกหลุมรักคนแรกที่เห็นหลังตื่นนอน','cha:6'],
 rumorfast:['📢','นกแก้วพูดได้ทุกตัว','ข่าวลือแพร่เร็วกว่าม้า',''],
 upside:['🙃','ฤดูกาลกลับหัว','หิมะตกหน้าร้อน ดอกไม้บานหน้าหนาว','heal:.02'],
 shadow:['👤','เงามีความคิดของตัวเอง','บางครั้งเงาก็ไม่อยากตามคุณ','dark:5 read:.03'],
 coinflip:['🎲','โชคชะตาโยนเหรียญ','ทุกอย่างได้ผลมากเกินหรือน้อยเกินเสมอ','luck:.05 fight:-.03'],
 smallworld:['🌐','โลกแคบ','คนที่เคยเจอจะกลับมาเจอซ้ำเสมอ','cq:1'],
 ghosts:['👻','ผีมองเห็นได้','ผีปู่ย่าตายายมานั่งกินข้าวด้วยทุกวันพระ','clue:0 read:.02']};
const ruleOn=(K,k)=>{try{return X7(K).rules.includes(k)}catch(e){return false}};
const ruleV=k=>{try{const K=FN();return K&&X7(K).rules.includes(k)}catch(e){return false}};
function rulePick(K,rng){const r=rng||rnd,L=Object.keys(RULE),a=[];const n=r()<.35?2:1;while(a.length<n){const k=L[Math.floor(r()*L.length)];if(!a.includes(k))a.push(k)}return a}
// ---------- 🎭 ผู้เล่าเรื่อง ----------
const NARR={poet:['📜','กวีโบราณ',['ดั่งใบไม้ร่วงในสายลม','โอ้ ชะตาช่างเล่นตลก','และดวงดาวก็นิ่งเงียบ','ราวกับบทกวีที่ยังเขียนไม่จบ']],drunk:['🍺','นักข่าวขี้เมา',['…ฮิก ผมว่ามันแปลกๆ นะ','เดี๋ยว นี่ผมเมาหรือเรื่องมันเมา','จดไว้ก่อน ค่อยเช็คข่าวพรุ่งนี้','แหล่งข่าวคือแมวข้างร้านเหล้า']],kid:['🧒','เด็กห้าขวบ',['ว้าวววว!','แล้วก็… แล้วก็…!','หนูว่าเขาเป็นคนดีนะ','อันนี้น่ากลัว หนูปิดตาแล้ว']],foe:['😒','ศัตรูของคุณ',['น่าสมเพช','ข้ารู้อยู่แล้วว่าเจ้าจะเลือกแบบนี้','ชีวิตเจ้าน่าเบื่อจริงๆ','เดี๋ยวก็พังเอง']],cat:['🐈','แมวที่บังเอิญเห็นเหตุการณ์',['เมี้ยว (ไม่สนใจ)','แมวเลียขาแล้วมองต่อ','มนุษย์นี่แปลกจริง','แมวหลับไปครึ่งเรื่อง']],grandma:['👵','ยายที่เล่าให้หลานฟัง',['…แล้วรู้ไหมหลานว่าเกิดอะไรต่อ','สมัยยายนะ เรื่องแบบนี้ไม่มีหรอก','กินข้าวก่อนแล้วยายเล่าต่อ','ตรงนี้ยายจำไม่ค่อยได้แล้ว']],god:['🌟','เทพที่ดูอยู่บนฟ้า',['(เทพหยิบป๊อปคอร์น)','ข้าลงขันไว้ว่าเจ้าจะรอด','อันนี้ข้าไม่ได้เขียนบทนะ','สนุกกว่าละครบนสวรรค์อีก']]};
// ---------- 🔗 ผลกรรม + 📢 ข่าวลือ จากตัวเลือก ----------
const TAGK=/🤝|🫂|🙏|💐|🍞|🩹|🏥|🫶|💊|🕊️|🙇|🍪|🛡️/u,TAGC=/🗡️|💀|😈|🔪|🩸|🔥 เผา|😠|🚪 ปิด|🛡️ ปิด/u,TAGG=/💰|🤑|💸|🛍️/u;
function optTag(t){t=String(t||'');return TAGC.test(t)?'cruel':TAGK.test(t)?'kind':TAGG.test(t)?'greed':null}
const RUMT={kind:['ลือกันว่าคุณ{X}จนนักบวชอาย','ลือกันว่าคุณเคยแบกวัวข้ามแม่น้ำเพื่อช่วยชาวนา','ลือกันว่าคุณเป็นนักบุญปลอมตัว','ลือกันว่าคุณให้เงินขอทานจนตัวเองต้องขอทาน'],cruel:['ลือกันว่าคุณกินเด็กเป็นอาหารเช้า','ลือกันว่าคุณ{X} แล้วหัวเราะทั้งคืน','ลือกันว่าเงาของคุณฆ่าคนได้','ลือกันว่าคุณขายวิญญาณแลกกับทรงผม'],greed:['ลือกันว่าคุณนอนบนกองทอง','ลือกันว่าคุณ{X}เพื่อเหรียญเดียว','ลือกันว่าคุณเก็บดอกเบี้ยจากผี','ลือกันว่าคุณซื้อดวงจันทร์ไว้แล้วหนึ่งดวง']};
function plantCq(K,tag,label,title){const X=X7(K);if(X.cq.length>=5)return;const yrs=ruleOn(K,'smallworld')?R(3,8):R(5,18);X.cq.push({at:age()+yrs,tag,l:String(label).replace(/<[^>]+>/g,'').slice(0,40),t:String(title).replace(/<[^>]+>/g,'').slice(0,40),y:age()})}
function plantRum(K,tag,label){const X=X7(K);if(X.rum.length>=5)X.rum.shift();const L=RUMT[tag];let t=pick(L).replace('{X}',String(label).replace(/<[^>]+>/g,'').replace(/^\S+\s/,'').slice(0,24));X.rum.push({t,tag,y:age()});X.rumC=(X.rumC|0)+1;K.rep+=tag==='kind'?3:tag==='cruel'?-3:0;feed(`📢 <i>${t}</i>`)}
// ห่อ choice ของทั้งเกม (เฉพาะตอนอยู่ในโลกแฟนตาซี)
{const _ch=choice;choice=function(t,x,o){try{if(on()&&Array.isArray(o)&&o.length&&o[0]&&o[0]._x&&!o._p7){o._p7=1;const K=FN(),X=X7(K),T=String(t).replace(/<[^>]+>/g,'').trim();
 // สมุดสะสม + จำว่าเคยเจอ
 const seen=(BK().ev[T]|0);bkAdd('ev',T);
 if(seen>=1&&!/เควส|ทะลวงแกน|สอบปลายปี|ข่าวลือ|ผลกรรม|\[|ลอกคราบ/.test(T)&&rnd()<.75){x=(x||'')+`<div class="tag2" style="margin-top:4px">🔁 <i>เดจาวู… คุณเคยเจอเรื่องนี้มาแล้ว ${seen} ครั้งในชีวิตก่อน</i></div>`;
  if(seen>=2&&o.length<5){const orig=o.slice();o.push(O('🔁 ทำสิ่งที่ชาติก่อนไม่เคยลอง',()=>{dejaVu(K,T);const p0=pick(orig);try{p0.f()}catch(e){console.error(e)}},'ผลลัพธ์ที่ไม่มีใครเดาได้',.12))}}
 // ผู้เล่าเรื่อง
 if(X.nar&&NARR[X.nar]&&rnd()<.3)x=(x||'')+`<div class="tag2" style="margin-top:4px">${NARR[X.nar][0]} <i>${pick(NARR[X.nar][2])}</i></div>`;
 // ห่อแต่ละตัวเลือก: ผลกรรม + ข่าวลือ + ความสำเร็จ
 for(const op of o){if(!op||typeof op.f!=='function'||op._w7)continue;const f0=op.f,tag=optTag(op.t);op._w7=1;op.f=function(){try{const K2=FN();if(K2&&tag){const X2_=X7(K2);X2_.tc=X2_.tc||{};X2_.tc[tag]=(X2_.tc[tag]|0)+1;if(rnd()<.07)plantCq(K2,tag,op.t,T);if(rnd()<(ruleOn(K2,'rumorfast')?.16:.07))plantRum(K2,tag,op.t)}}catch(e){}return f0.apply(this,arguments)}}}}catch(e){console.error('p7 choice',e)}return _ch.apply(this,arguments)}}
const DEJA=[[K=>{K.pw+=capOf(K)*.08;return'🔁 ร่างกายจำท่าจากชาติก่อนได้ คุณแข็งแกร่งขึ้นทันที'}],[K=>money(R(200,500))+' 🔁 คุณจำได้ว่าชาติก่อนมีคนซ่อนเงินไว้ใต้หินก้อนนี้'],[K=>{K.save=(K.save|0)+1;return'🔁 คุณหลบสิ่งที่ฆ่าคุณในชาติก่อนได้ · รอดตาย +1'}],[K=>hurt(.25)+' 🔁 ชาติก่อนวิธีนี้ได้ผล… ชาตินี้ไม่'],[K=>{S.int+=6;return'🔁 คุณเข้าใจบางอย่างเกี่ยวกับโลกนี้ที่ไม่มีใครเข้าใจ · ปัญญา +6'}],[K=>{const X=X3(K);return lootDrop(K,R(2,4),'ความทรงจำชาติก่อน')}],[K=>(K.clue<3?clue(K,'ทุกชีวิตของคุณเกิดในโลกเดียวกัน'):'🔁 คุณยืนนิ่งนาน รู้สึกว่ามีอีกตัวคุณกำลังยืนตรงนี้ในอีกชาติหนึ่ง')],[K=>dark(8)+' 🔁 คุณทำสิ่งที่ชาติก่อนไม่กล้าทำ และไม่แน่ใจว่าควรทำ']];
function dejaVu(K,T){bkAdd('ev','🔁 '+T.slice(0,20));feed(pick(DEJA)[0](K))}
function evCq(K,c){const ago=age()-c.y,who=nm(rnd()<.5?'m':'f').split(' ')[0];
 if(c.tag==='kind')return C('🔗 ผลกรรมดีย้อนกลับมา',`${ago} ปีก่อน ในเหตุการณ์「${E(c.t)}」คุณเลือก「${E(c.l)}」 วันนี้ <b>${E(who)}</b> มายืนหน้าบ้าน "ท่านคงจำข้าไม่ได้ แต่ข้าจำท่านได้ทุกวัน"`,[O('🤝 รับน้ำใจ',()=>{const r=rnd();feed(r<.35?`🔗 ${E(who)}ตอนนี้เป็น${pick(['แม่ทัพ','พ่อค้าใหญ่','นักบวชสูงสุด','หัวหน้ากิลด์'])} มอบของตอบแทน`+lootDrop(K,R(2,4),'ผลกรรมดี'):r<.7?`🔗 ${E(who)}มอบเงินที่เก็บมาทั้งชีวิตให้`+money(R(300,900)):`🔗 ${E(who)}อยู่เป็นผู้ติดตามคุณตลอดชีวิต · รอดตาย +1`+((K.save=(K.save|0)+1),''))}),O('🙂 บอกว่าไม่ต้องตอบแทน',()=>{S.karma=(+S.karma||0)+15;feed(`🙂 ${E(who)}ร้องไห้ แล้วไปช่วยคนอื่นต่อแบบที่คุณเคยทำ`+rep(6))})]);
 if(c.tag==='cruel')return C('🔗 ผลกรรมตามมาทัน',`${ago} ปีก่อน ในเหตุการณ์「${E(c.t)}」คุณเลือก「${E(c.l)}」 วันนี้ <b>${E(who)}</b> ยืนขวางทาง ในมือถือ${pick(['ดาบ','ม้วนคำสาป','หลักฐาน','ขวดยาพิษ'])} "ข้ารอวันนี้มา ${ago} ปี"`,[O('⚔️ สู้',()=>duel(who,Math.round(threat(K)*1.15),w=>feed(w?`⚔️ ${E(who)}ล้มลง ก่อนสิ้นใจพูดว่า "แล้วจะมีคนต่อไป"`+dark(5):'⚔️ คุณแพ้ให้ความแค้นที่สะสมมา'+hurt(.45))),'ต่อสู้',.5),O('🙇 ขอโทษจากใจ',()=>mgRead('ขอโทษให้เขาเชื่อ',who,sc=>feed(sc>=.55?`🙇 ${E(who)}ทิ้งอาวุธ "ข้ารอคำนี้มากกว่ารอเลือดเจ้า"`+((S.karma=(+S.karma||0)+10),''):`🙇 ${E(who)}ไม่ฟัง`+hurt(.3))),'',.5)]);
 return C('🔗 หนี้เก่ามาทวง',`${ago} ปีก่อน คุณเลือก「${E(c.l)}」 ตอนนี้มีคนถือสัญญาเก่าที่มีลายเซ็นคุณมาทวง พร้อมดอกเบี้ยทบต้น`,[O('💰 จ่าย',()=>feed(money(-Math.min(S.money||0,R(300,800)))+' 💰 หนี้จบ แต่เจ้าหนี้ยิ้มแปลกๆ')),O('🏃 หนี',()=>{plantCq(K,'greed','หนีหนี้',`หนี้เก่า`);feed('🏃 คุณหนีได้… ตอนนี้')})])}
function evRum(K){const X=X7(K),r=pick(X.rum);C('📢 ข่าวลือเรื่องคุณ',`ทุกคนในเมืองพูดถึงเรื่องเดียว: "<i>${E(r.t)}</i>" · แม่ค้าบางคนไม่ยอมขายของให้ บางคนแอบให้ฟรี`,[
 O('🗣️ แก้ข่าว (มินิเกม)',()=>mgRead('แก้ข่าวลือกลางตลาด','ฝูงชน',sc=>{if(sc>=.55){X.rum=X.rum.filter(x=>x!==r);feed('🗣️ ข่าวลือเงียบลง… จนมีข่าวลือใหม่ว่าคุณจ้างคนแก้ข่าว')}else feed('🗣️ ยิ่งแก้ยิ่งดัง ตอนนี้มีเพลงเกี่ยวกับมันแล้ว')})),
 O('😏 ใช้ประโยชน์จากข่าวลือ',()=>{if(r.tag==='cruel'){feed('😏 คนไม่กล้าโกงคุณอีก ราคาของถูกลงครึ่งหนึ่ง'+money(150)+dark(3))}else{feed('😏 คุณเปิดรับบริจาค ได้เยอะกว่าที่คิด'+money(250))}}),
 O('🤷 ปล่อยไป',()=>feed('🤷 ข่าวลือแพร่ไปอีกสามเมือง และเปลี่ยนเนื้อหาไปเรื่อยๆ'))])}

// ---------- 🧩 เหตุการณ์ประกอบชิ้น ----------
const GW=[['🧔','ช่างตีเหล็กคนแคระ'],['🧝','เอลฟ์ที่หลงทาง'],['👵','ยายขายดอกไม้'],['🧒','เด็กกำพร้าตาโต'],['🤵','ขุนนางหนุ่มหน้าซีด'],['🧙','จอมเวทเกษียณ'],['🏴‍☠️','โจรสลัดขาเดียว'],['👸','หญิงสาวสวมหน้ากาก'],['🐸','กบที่พูดได้'],['🦊','จิ้งจอกเก้าหาง'],['💂','ทหารหนีทัพ'],['🎭','นักแสดงเร่'],['🧛','ชายที่ไม่เคยออกมาตอนกลางวัน'],['🐉','มังกรตัวเท่าหมา'],['👻','วิญญาณเด็กผู้หญิง'],['🤖','หุ่นกลไกที่ลืมคำสั่ง'],['🧑‍🌾','ชาวนาที่ขุดเจอบางอย่าง'],['🕵️','นักสืบที่ตามหาตัวเอง'],['🍺','เจ้าของโรงเตี๊ยมที่ติดหนี้'],['🦉','นกฮูกที่เป็นบรรณารักษ์'],['🧚','ภูตที่โดนไล่ออกจากป่า'],['🐺','มนุษย์หมาป่าที่กลัวพระจันทร์'],['⚰️','สัปเหร่อที่ไม่เคยเห็นศพ'],['👨‍🍳','พ่อครัวที่เสียลิ้น'],['🦄','ยูนิคอร์นเขาหัก'],['🧓','ผู้กล้าที่เกษียณแล้ว'],['🐱','แมวดำที่เดินตามคุณ'],['📮','บุรุษไปรษณีย์ข้ามมิติ'],['🧞','จีนี่ที่เหลือพรข้อเดียว'],['🪆','ตุ๊กตาที่ขยับเองได้']];
const GP=['กลางงานศพ','บนหลังคาวิหาร','ในตลาดเที่ยงคืน','ริมบ่อน้ำที่ไม่มีก้น','หน้าประตูบ้านคุณตอนตีสาม','ในห้องสมุดที่ปิดไปแล้ว','บนสะพานที่สร้างไม่เสร็จ','กลางพายุหิมะ','ในงานเทศกาลโคมลอย','ใต้ต้นไม้ที่ออกผลเป็นเหรียญ','ในโรงอาบน้ำสาธารณะ','บนเรือที่จอดกลางทะเลทราย','ในห้องขังข้างคุณ','หน้าร้านขนมปัง','ในความฝันของคุณ','บนยอดหอนาฬิกา','ในป่าที่ต้นไม้ย้ายที่ได้','ข้างกองไฟของค่ายโจร','ในงานแต่งงานของคนแปลกหน้า','ในถ้ำที่มีเสียงคนร้องเพลง'];
const GA=[['ขอยืมเงิน','ขอยืมเงิน{G}เหรียญ สัญญาว่าจะคืนพร้อม "ของที่มีค่ากว่าเงิน"',[['💰 ให้ยืม','give'],['🙅 ปฏิเสธ','no']]],['ขอให้ช่วยตามหาของ','ขอให้ช่วยตามหา{I}ที่หายไป',[['🔍 ช่วยหา','mg:cups'],['🙅 ไม่ว่าง','no']]],['ท้าแข่ง','ท้าแข่ง{C} ใครแพ้ต้องทำตามคำขอหนึ่งข้อ',[['🏁 รับคำท้า','mg:any'],['🙅 ปฏิเสธ','no']]],['ขอให้เก็บความลับ','กระซิบความลับว่า{S} แล้วขอให้คุณสาบานว่าจะไม่บอกใคร',[['🤐 สาบาน','keep'],['📢 เอาไปบอกคนอื่น','tell']]],['เสนอการแลกเปลี่ยน','เสนอแลก{I}กับ "ปีหนึ่งในชีวิตของคุณ"',[['🤝 แลก','trade'],['🙅 ไม่แลก','no']]],['ขอที่พัก','ขอนอนบ้านคุณหนึ่งคืน เพราะ "ข้างนอกมีบางอย่างตามมา"',[['🏠 ให้นอน','give'],['🚪 ปิดประตู','no']]],['ร้องไห้','นั่งร้องไห้คนเดียว ในมือกำ{I}แน่น',[['🫂 เข้าไปปลอบ','help'],['🚶 เดินผ่าน','no']]],['ขอให้ส่งจดหมาย','ขอให้ส่งจดหมายถึง "คนที่อยู่ปลายทางของโลก"',[['✉️ รับปาก','help'],['🙅 ไม่รับ','no']]],['ขายของแปลก','ขาย{I}ราคา{G}เหรียญ "ของชิ้นนี้เลือกเจ้าของเอง"',[['🛍️ ซื้อ','buy'],['🙅 ไม่ซื้อ','no']]],['ขอความช่วยเหลือ','ขอให้ช่วยไล่{M}ที่อาละวาดอยู่',[['⚔️ ช่วยสู้','fight'],['🏃 หนี','no']]],['ทำนายดวง','จับมือคุณแล้วทำนายว่า "{F}"',[['🔮 ฟังต่อ','fate'],['😂 หัวเราะใส่','no']]],['ขอให้แต่งงาน','คุกเข่าขอคุณแต่งงาน ทั้งที่เพิ่งเจอกันเมื่อห้านาทีก่อน',[['💍 ตอบตกลงเล่นๆ','yes'],['🙅 ปฏิเสธอย่างสุภาพ','no']]],['ขอเลือด','ขอเลือดคุณหนึ่งหยด "เพื่อพิธีที่จะช่วยหมู่บ้าน"',[['🩸 ให้','trade'],['🙅 ไม่ให้','no']]],['ขอสอนวิชา','เสนอสอนวิชาลับที่ "ไม่มีใครในโลกรู้แล้ว"',[['📚 เรียน','mg:read'],['🙅 ไม่สนใจ','no']]],['ขอให้ตัดสิน','ขอให้คุณตัดสินข้อพิพาทเรื่อง{D}',[['⚖️ ตัดสิน','mg:read'],['🤷 ไม่ยุ่ง','no']]]];
const GI=['กุญแจทองเหลือง','แหวนที่ร้องเพลง','ไข่สีรุ้ง','ภาพวาดที่ยิ้มได้','ขวดใส่ฟ้าผ่า','ลูกแก้วที่มีเมืองเล็กๆ ข้างใน','เข็มทิศที่ชี้หาความจริง','ขนนกฟีนิกซ์','หนังสือที่ไม่มีตัวอักษร','ถุงเท้าข้างเดียวของราชา','เมล็ดพันธุ์ต้นไม้ยักษ์','กระจกที่สะท้อนอนาคต'];
const GC=['กินพาย','ดวลจ้องตา','วิ่งขึ้นภูเขา','ร้องเพลง','เล่นหมากรุกเวท','ยกหิน','ปาเป้า','เล่าเรื่องผี'];
const GS=['ราชาเป็นแมวปลอมตัว','กำแพงเมืองทำจากขนมปังแข็ง','ดวงจันทร์ดวงที่สองเป็นไข่มังกร','อธิการบดีอายุห้าร้อยปี','ทุกคนในหมู่บ้านนี้ตายไปแล้ว','มีประตูสู่โลกเดิมอยู่ใต้ส้วมสาธารณะ'];
const GM=['หมูป่าสามหัว','ฝูงไก่ปีศาจ','ต้นไม้เดินได้','หุ่นฟางที่มีชีวิต','ก็อบลินเมาเหล้า','สไลม์ยักษ์'];
const GF=['เจ้าจะได้เจอรักแท้ในงานศพ','อีกสามปีเจ้าจะร่ำรวย แล้วสูญเสียทุกอย่างในวันเดียว','คนที่เจ้าไว้ใจที่สุดถือมีดอยู่ข้างหลัง','เจ้าจะตายตอนแก่มาก บนเตียงที่ทำจากทอง','มีคนในอีกโลกกำลังคิดถึงเจ้า'];
const GD=['ใครเป็นเจ้าของเงาของต้นไม้','แพะที่กินหมวกขุนนาง','สองพี่น้องที่แย่งกันเป็นน้อง','ผีที่ไม่ยอมจ่ายค่าเช่าบ้าน'];
const GT=[['ghost','👻','จริงๆ แล้วเป็นวิญญาณที่ตายไปเมื่อร้อยปีก่อน',(K,g)=>g?(K.clue<3?clue(K,'วิญญาณในโลกนี้จำผู้ถูกอัญเชิญได้'):dark(-3)):dark(5)],['royal','👑','จริงๆ แล้วเป็นเชื้อพระวงศ์ปลอมตัว',(K,g)=>g?lootDrop(K,R(2,4),'เชื้อพระวงศ์')+rep(8):rep(-6)],['con','🃏','จริงๆ แล้วเป็นนักต้มตุ๋น',(K,g)=>g?money(-R(50,200)):' · คุณรอดจากการถูกหลอกพอดี'+rep(2)],['god','🌟','จริงๆ แล้วเป็นเทพที่ลงมาทดสอบมนุษย์',(K,g)=>g?((K.save=(K.save|0)+1),' · 🌟 เทพให้พร: รอดตาย +1'):hurt(.2)+' · 🌟 เทพผิดหวังในตัวคุณ'],['future','⏳','จริงๆ แล้วเป็นตัวคุณเองจากอนาคต',(K,g)=>g?pw(capOf(K)*.08):' · ⏳ ตัวคุณจากอนาคตส่ายหัวแล้วหายไป'],['demon','😈','จริงๆ แล้วเป็นปีศาจที่อยากเป็นมนุษย์',(K,g)=>g?((K.f.peace=(K.f.peace|0)+1),' · 😈 ปีศาจจะจำน้ำใจนี้ไปตลอด'):dark(4)],['none','','',()=>''],['none','','',()=>''],['spy','🕶️','จริงๆ แล้วเป็นสายลับที่ทดสอบความซื่อสัตย์ของคุณ',(K,g)=>g?rep(6):rep(-4)],['rich','💎','จริงๆ แล้วเป็นเศรษฐีที่แกล้งจน',(K,g)=>g?money(R(400,1000)):' · 💎 เขาจดชื่อคุณไว้ในบัญชีดำ']];
const fillG=s=>s.replace('{G}',R(5,30)*10).replace('{I}',pick(GI)).replace('{C}',pick(GC)).replace('{S}',pick(GS)).replace('{M}',pick(GM)).replace('{F}',pick(GF)).replace('{D}',pick(GD));
function genEv(K,rg){const X=X7(K),P=rg?(L=>L[Math.floor(rg()*L.length)]):pick;let w,p,a,tw,sig,tries=0;do{w=P(GW);p=P(GP);a=P(GA);tw=P(GT);sig=w[1]+a[0]+tw[0];tries++}while(!rg&&X.sig[sig]&&tries<8);X.sig[sig]=1;
 const d=rg?a[1].replace('{G}',(5+Math.floor(rg()*26))*10).replace('{I}',P(GI)).replace('{C}',P(GC)).replace('{S}',P(GS)).replace('{M}',P(GM)).replace('{F}',P(GF)).replace('{D}',P(GD)):fillG(a[1]),good=k=>!/^no$|^tell$/.test(k);
 const res=(k,base)=>{const g=good(k);let t=base;if(tw[0]!=='none'&&rnd()<.55){t+=`<br>${tw[1]} <b>หักมุม:</b> ${w[1]}${tw[2]}${tw[3](K,g)}`;bkAdd('ev','🧩 '+tw[0]+':'+w[1])}feed(t)};
 const opt=(lbl,k)=>O(lbl,()=>{
  if(k==='give'){const g=R(30,150);if(/ยืม/.test(a[0]))money(-Math.min(S.money||0,g));res(k,`${lbl} — ${w[1]}ขอบคุณจนน้ำตาไหล`)}
  else if(k==='help'){S.karma=(+S.karma||0)+5;res(k,`${lbl} — ${pick(['ใช้เวลาทั้งคืน','เหนื่อยแต่อิ่มใจ','มีคนเห็นและเล่าต่อ'])}`)}
  else if(k==='keep')res(k,'🤐 คุณเก็บความลับนั้นไว้ และเริ่มสงสัยว่ามันจริงไหม');
  else if(k==='tell'){K.rep-=2;res(k,'📢 ความลับแพร่ไปทั้งเมือง ภายในสามวันมีคนแต่งเพลงเกี่ยวกับมัน')}
  else if(k==='trade'){S.age+=rnd()<.3?1:0;res(k,`🤝 แลกสำเร็จ${lootDrop(K,R(1,3),w[1])}`)}
  else if(k==='buy'){if((S.money||0)<100)return res('no','🛍️ เงินไม่พอ');money(-100);res(k,`🛍️ ได้ของมา${lootDrop(K,R(1,4),w[1])}`)}
  else if(k==='fight')duel(pick(GM),Math.round(threat(K)*.9),v=>res(v?k:'no',v?`⚔️ ไล่มันไปได้${money(R(20,80))}`:'⚔️ มันไล่คุณแทน'+hurt(.2)));
  else if(k==='fate'){if(K.clue<3&&rnd()<.25)feed(clue(K,'หมอดูในโลกนี้ไม่เคยทายผิด'));res(k,'🔮 คำทำนายติดอยู่ในหัวคุณไปอีกหลายปี')}
  else if(k==='yes'){res(k,'💍 '+w[1]+'ดีใจมาก… คุณต้องใช้เวลาครึ่งปีอธิบายว่าพูดเล่น')}
  else if(k.startsWith('mg:')){const t=a[0]+'กับ'+w[1],m=k.slice(3)==='any'?pick(['mash','hold','combo','read','dance']):k.slice(3);const cb=sc=>res(sc>=.5?k:'no',sc>=.5?`🏆 สำเร็จ!${rnd()<.5?lootDrop(K,R(1,3),w[1]):money(R(40,150))}`:'😵 ไม่สำเร็จ');({mash:()=>mgMash(t,cb),hold:()=>mgHold(t,cb),combo:()=>mgCombo(t,cb),read:()=>mgRead(t,w[1],cb),dance:()=>mgDance(t,w[1],cb),cups:()=>mgCups(t,cb)})[m]()}
  else res(k,`${lbl} — ${pick(['คุณเดินจากมา','เขามองตามคุณ','ไม่มีอะไรเกิดขึ้น… หรือเปล่า'])}`)},'',k==='no'?.35:.65);
 C(`${w[0]} ${w[1]}${a[0]}${rg?' <span class="tag2">· ชะตาเดียวกัน</span>':''}`,`${w[1]} ${p} ${d}${rg?'<br><span class="tag2">📅 ชะตาเดียวกัน วันนี้ทุกคนเจอเรื่องนี้ แต่ละคนเลือกต่างกัน</span>':''}`,a[2].map(x=>opt(x[0],x[1])).concat(rnd()<.4?[O('❓ ถามว่า "จริงๆ แล้วคุณเป็นใคร"',()=>{if(tw[0]!=='none'&&rnd()<.6){feed(`❓ ${w[1]}นิ่งไปครู่หนึ่ง… ${tw[1]} ${tw[2]}`);bkAdd('ev','🧩 '+tw[0]+':'+w[1])}else feed(`❓ "${pick(['ข้าก็แค่คนธรรมดา','ถามแบบนี้ใจร้ายจัง','ไว้วันหลังจะบอก'])}"`)},'',.1)]:[]))}

// ---------- 💎 เหตุการณ์ระดับตำนาน (หายากมาก) ----------
const LEG=[['l1','🐋','วาฬลอยฟ้าว่ายผ่านหัวเมือง','ทั้งเมืองหยุดทุกอย่างมองขึ้นฟ้า วาฬยักษ์ร้องเพลงที่มีแต่คุณเข้าใจ',K=>{K.pw+=capOf(K)*.1;return'🐋 เพลงของวาฬเปลี่ยนบางอย่างในตัวคุณตลอดกาล'}],['l2','⭐','ดาวตกลงในสวนหลังบ้าน','ดาวดวงนั้นเป็นเด็กผู้หญิงตัวเรืองแสง เธอถามทางกลับบ้าน',K=>lootDrop(K,5,'ดาวตก')],['l3','🚪','ประตูกลับโลกเดิมเปิดหนึ่งนาที','คุณได้ยินเสียงแม่เรียกกินข้าวจากอีกฝั่ง',K=>{heal(1);return'🚪 คุณได้ยินเสียงแม่เป็นครั้งสุดท้าย และนั่นพอแล้ว'}],['l4','🎂','ทั้งทวีปจัดวันเกิดให้คุณโดยไม่มีเหตุผล','ไม่มีใครรู้ว่าใครเริ่ม ทุกเมืองแขวนธงชื่อคุณ',K=>rep(30)],['l5','🐉','มังกรตัวสุดท้ายขอให้คุณเลี้ยงลูก','มังกรแม่ที่กำลังจะตายวางไข่ในมือคุณ',K=>{const X=X3(K);X.pet=newPet('drag');X.pet.n='สุดท้าย';return'🐉 ไข่มังกรตัวสุดท้ายในโลกอยู่ในมือคุณแล้ว'}],['l6','⏸️','เวลาหยุดทั้งโลกหนึ่งวัน','มีแค่คุณที่ขยับได้',K=>money(R(1000,3000))+' ⏸️ คุณใช้วันนั้นทำสิ่งที่ไม่มีใครรู้'],['l7','🪞','เจอตัวเองจากอีกจักรวาล','อีกตัวคุณเลือกทุกอย่างตรงข้าม และดูมีความสุขกว่า',K=>{S.int+=10;return'🪞 คุณคุยกับตัวเองทั้งคืน · ปัญญา +10'}],['l8','👑','ราชาขอสลับชีวิตหนึ่งปี','ราชาเบื่อบัลลังก์ อยากลองเป็นคุณดูบ้าง',K=>rep(20)+money(2000)+' · 👑 ปีที่คุณเป็นราชา ภาษีลดลงครึ่งหนึ่ง'],['l9','🌈','สะพานสายรุ้งลงมาแตะพื้น','ปลายสายรุ้งมีหม้อทองจริงๆ และมีคนแคระที่โกรธมาก',K=>money(R(2000,5000))],['l10','🕊️','สงครามทั้งทวีปหยุดหนึ่งคืนเพื่อคุณ','ทหารทั้งสองฝั่งได้ยินเพลงที่คุณร้อง แล้ววางอาวุธ',K=>{K.f.peace=(K.f.peace|0)+2;return rep(25)}],['l11','📖','หนังสือที่เขียนชีวิตคุณ','ในห้องสมุดร้าง มีหนังสือที่เขียนชีวิตคุณจนถึงวันนี้ หน้าถัดไปยังว่าง',K=>{K.save=(K.save|0)+2;return'📖 คุณเขียนบรรทัดถัดไปเอง · รอดตาย +2'}],['l12','🐈','แมวทุกตัวในเมืองเดินตามคุณ','สามพันตัว ไม่มีใครรู้สาเหตุ',K=>{K.fx.luck=(K.fx.luck||0)+.05;return'🐈 โชคดีขึ้นถาวร +5%'}],['l13','🌋','ภูเขาไฟพ่นดอกไม้','แทนที่จะเป็นลาวา ภูเขาไฟพ่นดอกไม้ออกมาสามวันสามคืน',K=>{heal(1);return'🌋 ทั้งทวีปมีกลิ่นหอมไปทั้งปี'}],['l14','💌','จดหมายจากตัวเองในชาติหน้า','ลายมือคุณ แต่เขียนว่า "ขอบคุณที่เลือกแบบนั้น"',K=>K.clue<3?clue(K,'ชาติหน้าของคุณจำชาตินี้ได้'):pw(capOf(K)*.05)],['l15','🧊','คนในน้ำแข็งพันปีลืมตา','นักรบในก้อนน้ำแข็งตื่นขึ้นและเรียกคุณว่า "นายท่าน"',K=>{const X=X3(K);const c=mkComp('นักรบพันปี');c.b=80;X.party.push(c);recalcE(K);return'🧊 นักรบพันปีเข้าปาร์ตี้คุณ'}],['l16','🎰','ทุกการเดิมพันชนะหนึ่งปี','โชคชะตาเหมือนลืมว่ากำลังเล่นกับคุณ',K=>money(R(3000,6000))],['l17','🌑','สุริยุปราคาที่ไม่มีวันจบ','ฟ้ามืดสามเดือน คุณเป็นคนเดียวที่มองเห็นในความมืด',K=>dark(10)+pw(capOf(K)*.12)],['l18','🦋','ผีเสื้อกระพือปีกเปลี่ยนประวัติศาสตร์','คุณเผลอเหยียบผีเสื้อตัวหนึ่ง… และโลกเปลี่ยนไปเล็กน้อย',K=>{const X=X7(K);X.rules=rulePick(K);return'🦋 กฎของโลกเปลี่ยน: '+X.rules.map(r=>RULE[r][0]+' '+RULE[r][1]).join(' · ')}],['l19','🍵','เทพทุกองค์มาดื่มชาบ้านคุณ','ไม่มีใครนัด แต่ทุกองค์มาพร้อมกันและแย่งขนมกัน',K=>lootDrop(K,4,'เทพ')+lootDrop(K,3,'เทพ')],['l20','🌌','ได้เห็นโค้ดของโลก','วินาทีหนึ่ง ทุกอย่างกลายเป็นตัวอักษรเรืองแสงไหลลงมา',K=>{S.int+=20;return'🌌 คุณเข้าใจว่าโลกนี้ทำงานอย่างไร · ปัญญา +20'}]];
function evLeg(K){const X=X7(K),L=LEG.filter(l=>!X.leg[l[0]]);if(!L.length)return;const l=pick(L);X.leg[l[0]]=1;const isNew=bkAdd('leg',l[0]);
 C(`💎 ${l[1]} ${l[2]}`,`<div style="border:1px solid #ffd54a;border-radius:8px;padding:8px;background:rgba(255,213,74,.07)">✨ <b>เหตุการณ์ระดับตำนาน</b>${isNew?' · 🆕 ครั้งแรกในทุกชีวิต':''}<br>${l[3]}</div>`,[O('✨ รับชะตานี้',()=>say(`💎 ${l[1]} <b>${l[2]}</b> — ${l[4](K)}`,'myth',true),'',1)])}

// ---------- 🧑‍🤝‍🧑 NPC มีชีวิตของตัวเอง ----------
const NJOB=['เปิดร้านขนมปัง','เป็นอัศวินประจำวัง','เป็นนักบวชในวิหาร','เป็นโจรสลัด','เป็นครูสอนเด็ก','เป็นพ่อค้าเร่','เป็นนักผจญภัยระดับ A','เป็นกวีที่ไม่มีใครอ่าน','เป็นที่ปรึกษาขุนนาง','เลี้ยงแกะบนภูเขา'];
function npcLife(K){const ids=Object.keys(K.npc||{}).filter(i=>K.npc[i]&&K.npc[i].alive&&K.npc[i].n);if(!ids.length||rnd()>.22)return null;const id=pick(ids),p=K.npc[id];p.life=p.life||{};const L=p.life,nn=E(p.n.split(' ')[0]);
 const opts=[];if(!L.job)opts.push('job');if(!L.wed&&age()>=18)opts.push('wed');if(L.wed&&!L.kid)opts.push('kid');opts.push('rich','broke','trouble','visit');const k=pick(opts);
 if(k==='job'){L.job=pick(NJOB);feed(`🧑‍🤝‍🧑 ข่าวคราว: ${nn}ตอนนี้${L.job}แล้ว`);return null}
 if(k==='wed'){L.wed=nm(rnd()<.5?'m':'f').split(' ')[0];return()=>C(`💒 ${nn}จะแต่งงาน`,`${nn}ส่งการ์ดเชิญมา จะแต่งงานกับ${E(L.wed)} "อยากให้เธอมาที่สุด"`,[O('🎁 ไปพร้อมของขวัญ',()=>{money(-80);aff(K,id,12);feed(`🎁 ${nn}กอดคุณกลางงาน คนทั้งงานคิดว่าคุณคือเจ้าบ่าว/เจ้าสาวตัวจริง`)}),O('✉️ ส่งการ์ดอวยพร',()=>{aff(K,id,3);feed('✉️ ส่งการ์ดไป')}),O('😶 ไม่ไป',()=>{aff(K,id,-8);mem(K,id,'ไม่มางานแต่ง');feed(`😶 ${nn}มองหาคุณตลอดงาน`)})])}
 if(k==='kid'){L.kid=nm(rnd()<.5?'m':'f').split(' ')[0];feed(`👶 ${nn}มีลูกแล้ว ตั้งชื่อว่า${E(L.kid)}${p.aff>=60?' — ขอให้คุณเป็นพ่อแม่ทูนหัว':''}`);return null}
 if(k==='rich'){L.rich=1;feed(`💰 ${nn}รวยขึ้นมาแบบงงๆ ${pick(['ขุดเจอแร่หลังบ้าน','ได้มรดกจากป้าที่ไม่รู้จัก','ชนะพนันกับมังกร'])}`);if(p.aff>=50&&rnd()<.5)feed(money(R(100,300))+` · ${nn}แบ่งให้คุณด้วย`);return null}
 if(k==='broke')return()=>C(`💸 ${nn}ล้มละลาย`,`${nn}มาหาคุณกลางดึก ทุกอย่างพังหมด ${pick(['ร้านถูกเผา','ถูกโกงจากหุ้นส่วน','เดิมพันผิดม้า'])} ขอยืมเงินเริ่มต้นใหม่`,[O('🤝 ให้ยืม',()=>{money(-Math.min(S.money||0,300));aff(K,id,15);plantCq(K,'kind','ให้'+p.n.split(' ')[0]+'ยืมเงิน','เพื่อนล้มละลาย');feed('🤝 เขาสัญญาว่าจะคืนเป็นสองเท่า')}),O('🙅 ไม่ให้',()=>{aff(K,id,-10);feed(`🙅 ${nn}เดินจากไปเงียบๆ`)})]);
 if(k==='trouble')return()=>C(`🆘 ${nn}ตกอยู่ในอันตราย`,`ได้ข่าวว่า${nn}ถูก${pick(['โจรภูเขาจับไป','กล่าวหาว่าใช้เวทต้องห้าม','ปีศาจสาป'])}`,[O('⚔️ ไปช่วย',()=>duel('ผู้จับตัว'+p.n.split(' ')[0],Math.round(threat(K)),w=>{if(w){aff(K,id,25);mem(K,id,'ช่วยชีวิต');feed(`⚔️ คุณพา${nn}กลับมาได้`)}else feed('⚔️ ช่วยไม่สำเร็จ แต่เขารู้ว่าคุณมา'+hurt(.3))}),'ต่อสู้'),O('🙏 ส่งเงินไปไถ่ตัว',()=>{money(-Math.min(S.money||0,400));aff(K,id,10);feed('🙏 เขาปลอดภัย')}),O('😶 ไม่ยุ่ง',()=>{aff(K,id,-15);feed(`😶 ${nn}รอดมาได้เอง และไม่คุยกับคุณอีกเลย`)})]);
 if(k==='visit'){feed(`☕ ${nn}${L.job?'('+L.job+') ':''}แวะมาเยี่ยม ${pick(['เล่าเรื่องเก่าจนดึก','เอาขนมมาฝาก','บ่นเรื่องชีวิตสามชั่วโมง','ถามว่าคุณยังจำเรื่องนั้นได้ไหม'])}${aff(K,id,4)}`);return null}return null}

// ---------- 🏅 ความสำเร็จ ----------
const ACH=[['young','💀','จากไปก่อนวัย','ตายก่อนอายุ 20'],['old','🧓','อายุยืน','อยู่ถึงอายุ 80'],['rich','💰','มหาเศรษฐีต่างโลก','มีเงิน 20,000 ขึ้นไป'],['broke','🪙','ตายตัวเปล่า','ตายตอนเงินเป็น 0'],['leg1','💎','ผู้พบตำนาน','เจอเหตุการณ์ระดับตำนาน'],['leg5','🌟','นักล่าตำนาน','เจอเหตุการณ์ตำนานครบ 5 แบบ (ทุกชีวิตรวมกัน)'],['cq3','🔗','กรรมติดจรวด','เจอผลกรรมย้อนกลับ 3 ครั้งในชีวิตเดียว'],['rum5','📢','คนดังในข่าวลือ','มีข่าวลือ 5 เรื่องในชีวิตเดียว'],['dark','🌑','ด้านมืดเต็มขั้น','ความมืด 80 ขึ้นไป'],['saint','😇','นักบุญโดยไม่ตั้งใจ','กรรมดี 100 ขึ้นไป'],['boss8','👹','ผู้ล้างรังบอส','ล้มบอสภูมิภาคครบ 8 ตัว'],['pet','🐲','พ่อแม่สัตว์อสูร','เลี้ยงสัตว์อสูรถึงร่างสุดท้าย'],['city','🏙️','ผู้สร้างเมือง','สร้างเมืองที่ใช้ชื่อคุณ'],['deja','🔁','เดจาวูเรื้อรัง','ใช้ "ทำสิ่งที่ชาติก่อนไม่เคยลอง" 10 ครั้ง (รวมทุกชีวิต)'],['sys','⬜','รู้ความจริงของระบบ','หน้าต่างระบบเผยตัว'],['gen3','🌳','สามชั่วคน','เล่นเป็นทายาทถึงรุ่นที่ 3'],['rules','🌍','นักสำรวจโลกแปลก','เจอกฎแปลกครบ 10 แบบ (รวมทุกชีวิต)'],['secret','🗝️','ผู้ไขความลับ','ได้ฉากจบลับ'],['peace','🕊️','เพื่อนของราชาปีศาจ','สร้างสันติกับฝั่งปีศาจถึงระดับ 3'],['party','🫂','เพื่อนแท้','มีเพื่อนในปาร์ตี้ความผูกพัน 100'],['twist','🌀','ชีวิตพลิกล็อก','เจอเหตุการณ์หักมุม 2 แบบในชีวิตเดียว']];
const achG=()=>{try{return LS.get('murim_fanach',{})||{}}catch(e){return{}}};
function achGive(id){const A=achG();if(A[id])return;A[id]=Date.now();try{LS.set('murim_fanach',A)}catch(e){}const a=ACH.find(x=>x[0]===id);if(a)say(`🏅 <b>ปลดความสำเร็จ: ${a[1]} ${a[2]}</b> — ${a[3]} · ชีวิตต่อไปได้เงินติดตัวเพิ่ม`,'epic',true)}
function achCheck(K,death){try{const X=X7(K),X3_=X3(K),b=BK(),c=(k,v)=>{if(v)achGive(k)};
 c('rich',(S.money||0)>=20000);c('leg1',Object.keys(X.leg).length>0);c('leg5',Object.keys(b.leg).length>=5);c('cq3',(X.cqd|0)>=3);c('rum5',(X.rumC|0)>=5);c('dark',K.dark>=80);c('saint',(+S.karma||0)>=100);c('boss8',Object.keys(X3_.bk||{}).length>=8);c('pet',X3_.pet&&X3_.pet.st>=3);c('city',X3_.base>=4);
 c('deja',Object.keys(b.ev).filter(k=>/^🔁 /.test(k)).reduce((a,k)=>a+b.ev[k],0)>=10);c('sys',K.sysw&&K.sysw.rev);c('gen3',(K.gen|0)>=3);c('rules',Object.keys(b.rule).length>=10);c('peace',(K.f&&K.f.peace|0)>=3);c('party',(X3_.party||[]).some(p=>p.alive&&p.b>=100));c('twist',Object.keys(X3_.tw||{}).length>=2);
 if(death){c('young',age()<20);c('old',age()>=80);c('broke',(S.money||0)<=0);c('daily',!!K.daily);const e=K.end&&ENDS[K.w]&&ENDS[K.w][K.end];c('secret',e&&e[3])}}catch(e){console.error('ach',e)}}

// ---------- 🌀 ทายาทเจเนอเรชัน ----------
function genSave(K){try{const X3_=X3(K),kid=X3_.love&&X3_.love.kid;if(!kid&&!(S.kids>0))return;const sur=String(S.name||'').split(' ').slice(1).join(' ')||String(S.name||'');
 const np={};for(const i in K.npc){const p=K.npc[i];if(p&&p.alive&&p.n)np[i]={n:p.n,role:p.role,aff:Math.round(p.aff/2),alive:1,mem:[[0,'รู้จักพ่อแม่ของคุณ']],life:p.life||{}}}
 LS.set('murim_fangen',{w:K.w,kid:kid||nm(rnd()<.5?'m':'f').split(' ')[0],sur,par:S.name,gen:(K.gen|1)+1,gold:Math.round((S.money||0)*.3),np,rules:X7(K).rules,rum:X7(K).rum.slice(-2),used:0,t:Date.now()})}catch(e){console.error('gen',e)}}
function genOffer(K){let g=null;try{g=LS.get('murim_fangen',null)}catch(e){}if(!g||g.used||g.w!==K.w)return;
 C('🌀 สายเลือดเดิม',`ทวีปนี้ยังจำตระกูล<b>${E(g.sur)}</b>ได้ ${E(g.par)}จากไปแล้ว และทิ้งลูกไว้ชื่อ <b>${E(g.kid)}</b> จะเกิดเป็นทายาทรุ่นที่ ${g.gen} ของตระกูลนี้ไหม (เพื่อนเก่าของพ่อแม่ยังมีชีวิตอยู่ กฎของโลกเหมือนเดิม และได้มรดกบางส่วน)`,[
  O(`🌳 เกิดเป็น ${E(g.kid)} ${E(g.sur)}`,()=>{g.used=1;try{LS.set('murim_fangen',g)}catch(e){}S.name=g.kid+' '+g.sur;K.gen=g.gen;for(const i in g.np)if(!K.npc[i]||!K.npc[i].alive)K.npc[i]=g.np[i];else{K.npc[i].mem.push([age(),'รู้จักพ่อแม่ของคุณ']);K.npc[i].aff=Math.max(K.npc[i].aff,g.np[i].aff)}
   const X=X7(K);if(g.rules&&g.rules.length)X.rules=g.rules;X.rum=g.rum||[];money(g.gold);recalcE(K);bkAdd('gen',g.sur+'#'+g.gen);say(`🌳 <b>ทายาทรุ่นที่ ${g.gen} ของตระกูล${E(g.sur)}</b> — คนแก่ในเมืองมองหน้าคุณแล้วยิ้ม "หน้าเหมือน${E(g.par.split(' ')[0])}ไม่มีผิด"`,'myth',true);achCheck(K);render()},'',.6),
  O('🆕 เริ่มตระกูลใหม่',()=>{g.used=1;try{LS.set('murim_fangen',g)}catch(e){}feed('🆕 คุณเริ่มต้นชีวิตใหม่ ไม่มีใครรู้จักนามสกุลคุณ')},'',.4)])}

// ---------- 🎲 ชะตาประจำวัน ----------
const dayStr=()=>new Date(Date.now()+7*3600e3).toISOString().slice(0,10);
function dayRng(d){let h=2166136261;for(const c of d)h=Math.imul(h^c.charCodeAt(0),16777619);let q=h>>>0;return()=>{q=(q+0x6D2B79F5)>>>0;let t=q;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function dailyInfo(k,w){const d=k||dayStr(),r=dayRng('fan'+d);const V=w==='magic'?Object.keys(MV):Object.keys(MVX).filter(x=>MVX[x].w===(w==='noble'?'noble':'iso'));const v=V[Math.floor(r()*V.length)];const rules=rulePick(null,r);const nar=Object.keys(NARR)[Math.floor(r()*Object.keys(NARR).length)];return{d,w,v,rules,nar,gold:Math.floor(r()*5)*100}}
const dailyG=()=>{try{return LS.get('murim_fandaily',{})||{}}catch(e){return{}}};

// ---------- 📚 สมุดสะสม ----------
window.fanBook=function(tab){const b=BK(),A=achG(),E2=(()=>{try{return LS.get('murim_fanend',{})||{}}catch(e){return{}}})();const nEnd=Object.keys(E2).length,tEnd=Object.keys(ENDS).reduce((a,w)=>a+Object.keys(ENDS[w]).length,0);
 const nEv=Object.keys(b.ev).length,legN=Object.keys(b.leg).length,ruN=Object.keys(b.rule).length,naN=Object.keys(b.narr).length,vaT=Object.keys(MV).length+Object.keys(MVX).length,vaN=Object.keys(b.var).length,acN=Object.keys(A).length;
 const pct=Math.round((Math.min(1,nEv/400)+legN/LEG.length+ruN/Object.keys(RULE).length+naN/Object.keys(NARR).length+vaN/vaT+acN/ACH.length+nEnd/tEnd)/7*100);
 const sec=(t,h)=>`<h4 style="margin:10px 0 4px">${t}</h4>${h}`,grid=h=>`<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px">${h}</div>`,cell=(ok,ic,n,hint)=>`<div class="item" style="${ok?'':'opacity:.55'}">${ok?ic:'❔'} <b>${ok?n:'???'}</b>${hint?`<div class="tag2">${ok?hint:'ยังไม่ค้นพบ'}</div>`:''}</div>`;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📚 สมุดสะสมแห่งทวีป</h3><div class="tag2">สะสมรวมทุกชีวิต · ความครบ <b>${pct}%</b></div><div class="fmgT" style="height:8px;margin:6px 0"><i style="display:block;height:100%;width:${pct}%;background:linear-gradient(90deg,#c39bff,#ffd54a);border-radius:6px"></i></div>
 ${sec(`💎 เหตุการณ์ตำนาน ${legN}/${LEG.length}`,grid(LEG.map(l=>cell(b.leg[l[0]],l[1],l[2])).join('')))}
 ${sec(`🌍 กฎแปลกของโลก ${ruN}/${Object.keys(RULE).length}`,grid(Object.keys(RULE).map(k=>cell(b.rule[k],RULE[k][0],RULE[k][1],RULE[k][2])).join('')))}
 ${sec(`🏅 ความสำเร็จ ${acN}/${ACH.length}`,grid(ACH.map(a=>`<div class="item" style="${A[a[0]]?'':'opacity:.55'}">${A[a[0]]?a[1]:'🔒'} <b>${a[2]}</b><div class="tag2">${a[3]}</div></div>`).join('')))}
 ${sec(`🎭 ผู้เล่าเรื่อง ${naN}/${Object.keys(NARR).length} · ✨ ชะตาพิเศษ ${vaN}/${vaT}`,`<div class="tag2">${Object.keys(NARR).map(k=>b.narr[k]?NARR[k][0]+' '+NARR[k][1]:'❔').join(' · ')}</div><div class="tag2" style="margin-top:4px">${Object.keys(MV).map(k=>b.var[k]?MV[k].ic+' '+MV[k].n:'❔').concat(Object.keys(MVX).map(k=>b.var[k]?MVX[k].ic+' '+MVX[k].n:'❔')).join(' · ')}</div>`)}
 ${sec(`📖 เหตุการณ์ที่เคยเจอ ${nEv} เรื่อง · 🎬 ฉากจบ ${nEnd}/${tEnd}`,`<button class="opt" onclick="closeM();fanEnds()">🎬 ดูฉากจบทั้งหมด</button>${Object.keys(b.gen).length?`<div class="tag2" style="margin-top:4px">🌳 ตระกูลที่สืบทอด: ${Object.keys(b.gen).map(E).join(' · ')}</div>`:''}`)}`,'fanbook')};

// ---------- hooks ภาค 7 ----------
{const _rc=recalcE;recalcE=function(K){const o=_rc(K);try{for(const r of X7(K).rules)if(RULE[r]&&RULE[r][3])fxAdd(o,RULE[r][3])}catch(e){}return o}}
function birth7(K){const X=X7(K);if(X.b7)return;X.b7=1;const P=window._fdlPend;
 if(P&&Date.now()-P.t<30*60e3&&(P.fw==='iso'?(K.w==='hero'||K.w==='trash'||K.w==='lost'):K.w===P.fw)){window._fdlPend=null;window._mvForce=null;K.daily=P.k;X.rules=P.I.rules.slice();X.nar=P.I.nar;money(P.I.gold);setTimeout(()=>{try{P.go(K)}catch(e){console.error('fdl go',e)}},300)}
 else{X.rules=rulePick(K);X.nar=pick(Object.keys(NARR))}
 for(const r of X.rules)bkAdd('rule',r);bkAdd('narr',X.nar);if(K.mv)bkAdd('var',K.mv);if(K.mvx)bkAdd('var',K.mvx);
 say(`🌍 <b>กฎของโลกนี้</b> — ${X.rules.map(r=>`${RULE[r][0]} ${RULE[r][1]} <span class="tag2">(${RULE[r][2]})</span>`).join(' · ')}<br>${NARR[X.nar][0]} <i>ผู้เล่าเรื่องชีวิตนี้: ${NARR[X.nar][1]}</i>`,'epic');
 if(X.rules.includes('dragonpet')&&!X3(K).pet){X3(K).pet=newPet('drag');feed('🐉 มังกรตัวเท่าแมวของคุณนอนอยู่ปลายเตียงตั้งแต่วันเกิด')}
 if(X.rules.includes('revive'))K.save=(K.save|0)+3;X.sv=K.save|0;
 const na=Object.keys(achG()).length;if(na)feed(`🏅 ของขวัญจากความสำเร็จ ${na} อย่าง`+money(na*80));
 recalcE(K);setTimeout(()=>{try{genOffer(K);if(QU.length&&!FL)flush()}catch(e){}},400)}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(K){birth7(K);sync();render();saveGame()}}catch(e){console.error('p7 birth',e)}},2000)}}
{const _fy=fanYear;fanYear=function(){const K=FN();const a0=S.age;_fy.apply(this,arguments);if(!K||!S.alive||S.age===a0||K.end)return;
 try{const X=X7(K);if(!X.b7)birth7(K);
  if(ruleOn(K,'fasttime')&&rnd()<.12){S.age++;feed('⏩ ปีนี้ผ่านไปเร็วผิดปกติ… อายุเพิ่มสองปี')}
  if(ruleOn(K,'revive')&&(K.save|0)<(X.sv|0)){const ids=Object.keys(K.npc).filter(i=>K.npc[i].alive);if(ids.length){const i=pick(ids);say(`💫 คุณฟื้นจากความตาย… แต่จำ<b>${E(K.npc[i].n)}</b>ไม่ได้อีกแล้ว ตลอดกาล`,'bad');K.npc[i].alive=0}}X.sv=K.save|0;
  const due=X.cq.filter(c=>c.at<=age());if(due.length){const c=due[0];X.cq=X.cq.filter(x=>x!==c);X.cqd=(X.cqd|0)+1;queue(()=>evCq(K,c))}
  else if(rnd()<(.006+(ruleOn(K,'moons')?.006:0)+fxv('luck')*.05))queue(()=>evLeg(K));
  else if(X.rum.length&&rnd()<.1)queue(()=>evRum(K));
  else{const nl=npcLife(K);if(nl&&QU.length<=2)queue(nl);else if(QU.length<=1&&rnd()<(ruleOn(K,'moons')?.45:.3))queue(()=>genEv(K))}
  achCheck(K);if(QU.length&&!FL)flush()}catch(e){console.error('p7 year',e)}}}
{const _cd=checkDeath;checkDeath=function(){const r=_cd.apply(this,arguments);try{if(!S.alive){const K=FN();if(K&&!K.d7){K.d7=1;achCheck(K,1);genSave(K);}}}catch(e){console.error('p7 death',e)}return r}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-fa7]')){const b=document.createElement('button');b.className='opt';b.setAttribute('data-fa7',1);b.style.gridColumn='1/-1';b.innerHTML='📚 สมุดสะสม<small>เหตุการณ์ตำนาน กฎแปลก ความสำเร็จ ฉากจบ</small>';b.onclick=()=>fanBook();d.appendChild(b)}}}catch(e){}return r}}
{const _hd=hud;hud=function(K){let h=_hd(K);try{const X=X7(K);if(X.rules&&X.rules.length){const c=`<span style="border-color:#8c6;color:#cfa">${X.rules.map(r=>RULE[r][0]+' '+RULE[r][1]).join(' · ')}</span>${X.nar?`<span>${NARR[X.nar][0]} ${NARR[X.nar][1]}</span>`:''}${K.gen>1?`<span>🌳 รุ่นที่ ${K.gen}</span>`:''}${K.daily?'<span>📅 ชะตาประจำวัน</span>':''}`;h=h.replace('<div class="fhC">','<div class="fhC">'+c)}}catch(e){}return h}}

// ---------- 📅 ชะตาประจำวันหลัก: วันโลกแฟนตาซี ----------
window._fanDl=function(c,k,beginFn,back){const fw=c.w.slice(1),I=dailyInfo(k,fw);c.ev=[];
 window._fdlPend={k,fw,I,t:Date.now(),go:K=>{beginFn();try{back()}catch(e){}const D=S.dl;if(!D)return;const R=D.r||[];
  if(R.includes('long'))K.endY+=30;if(R.includes('shortl'))K.endY=Math.round(K.endY*.75);if(R.includes('qi'))K.mpM+=10;if(R.includes('fast'))K.pwm=1.3;if(R.includes('slow'))K.pwm=.8;S.mw.end=(K.endY||70)+(S.mw.wsL|0);
  const r=mulberry(hashStr('fdl:'+k)),a0=WD[K.w].a0;let ag=[];for(let i=0;i<5;i++)ag.push(a0+1+Math.floor(r()*26));ag.sort((x,y)=>x-y);for(let i=1;i<5;i++)if(ag[i]-ag[i-1]<3)ag[i]=ag[i-1]+3;D.fev=ag.map((a,i)=>({a,s:hashStr('fdlev:'+k+':'+i)}));
  const V=I.w==='magic'?MV[I.v]:MVX[I.v];say(`📅 <b>วันโลกแฟนตาซี</b> — ทุกคนวันนี้ได้ ${V?V.ic+' '+V.n:''} · ${I.rules.map(x=>RULE[x][0]+' '+RULE[x][1]).join(' · ')} · ผู้เล่าเรื่อง ${NARR[I.nar][0]} ${NARR[I.nar][1]}`,'myth',true);sync();render()}};
 window._mvForce=I.v;window.fanStart(fw);try{FB.left=0;fbDraw()}catch(e){}try{toast('📅 ชะตาประจำวัน — '+({iso:'⚔️ ต่างโลก',magic:'🔮 โลกเวทมนตร์',noble:'🏰 โลกแห่งอะคาเดมี่'})[fw]+' · กดเกิดเพื่อเริ่ม')}catch(e){}return true};
{const _fy=fanYear;fanYear=function(){const K=FN(),a0=S.age,p0=K?K.pw:0;_fy.apply(this,arguments);try{const D=S.dl;if(!K||!D||D.done||!K.daily)return;if(S.age===a0)return;
  if(K.pwm&&K.pw>p0)K.pw=p0+(K.pw-p0)*K.pwm;if(D.tax)S.money=Math.round((S.money||0)*(1-D.tax));sync();
  const m=D.mx||(D.mx={});m.age=Math.max(m.age||0,S.age);m.money=Math.max(m.money||0,S.money||0);m.pow=Math.max(m.pow||0,S.power||0);m.fame=Math.max(m.fame||0,K.rep||0);
  const e=(D.fev||[]).find(x=>!x.d&&S.age>=x.a);if(e&&S.alive&&!K.end){e.d=1;queue(()=>genEv(K,mulberry(e.s)));if(!FL)flush()}}catch(e){console.error('fdl yr',e)}}}
window._fan7={X7,genEv,evLeg,evCq,evRum,npcLife,achCheck,genSave,genOffer,dailyInfo,birth7,RULE,LEG,ACH,plantCq,plantRum,dejaVu};


// ####################################################################
// ภาค 8: จอมมารกลับชาติ (ดี/ชั่ว) · ทัวร์นาเมนต์ · ปกครองแคว้น · ล่ามังกร · การ์ดแชร์ · เอฟเฟกต์
// ####################################################################
const X8=K=>K.x8||(K.x8={});
const fxBig=(k,sc)=>{try{if(window.pxFx)window.pxFx(k,innerWidth/2,innerHeight*.42,sc||1.4)}catch(e){}};
const regEnd=(L,ws)=>{for(const w of ws||Object.keys(ENDS))for(const e of L)ENDS[w][e[0]]=[e[1],e[2],e[3]].concat(e[4]?[1]:[])};
// ---------- 😈 จอมมารกลับชาติ ----------
const DKG=[['🐺','แม่ทัพหมาป่าโกรห์','อยากบุกมนุษย์ทุกวัน'],['🧛','ราชินีแวมไพร์เซราฟีน','สนใจแค่ความงามและอำนาจ'],['💀','ลิชผู้ภักดีมอร์ต','ภักดีจนน่ากลัว'],['🐉','มังกรดำนอคทิส','ขี้เกียจ ขอแค่ได้นอน']];
const DK_=K=>X8(K).dk;
const alT=a=>a>=50?'😇 จอมมารผู้ใจดี':a>=15?'🙂 ค่อนข้างดี':a>-15?'⚖️ กลางๆ':a>-50?'😈 ค่อนข้างชั่ว':'👿 จอมมารผู้โหดร้าย';
function dkAl(K,d){const D=DK_(K);D.al=cl(D.al+d,-100,100);return ` · ${d>0?'😇':'😈'} ${d>0?'+':''}${d} (${alT(D.al)})`}
function dkGen(K,i,d){const g=DK_(K).g[i];g.loy=cl(g.loy+d,0,100);return ` · ${g.ic} ภักดี ${d>0?'+':''}${d}`}
function dkStart(K){const X=X8(K);X.dk={al:0,army:1000,g:DKG.map(g=>({ic:g[0],n:g[1],t:g[2],loy:R(45,70),alive:1})),wv:0,nx:age()+R(3,5),sn:{}};K.pw+=capOf(K)*.4;K.mpM+=30;S.maxHp+=60;S.hp=S.maxHp;recalcE(K);
 fxBig('fw',1.6);say(`👑 <b>คุณคือจอมมารที่กลับชาติมาเกิด</b> — ความทรงจำห้าร้อยปีไหลกลับมาในคืนพระจันทร์สีแดง ปีศาจทั้งทวีปรู้สึกได้ทันที แม่ทัพทั้งสี่กำลังเดินทางมาหาคุณ<br><span class="tag2">ชาตินี้จะเป็นจอมมารแบบไหน ขึ้นกับคุณเอง</span>`,'myth',true)}
const DKEV=[
 K=>C('🏰 แม่ทัพทั้งสี่มาถึง','แม่ทัพทั้งสี่คุกเข่าต่อหน้าคุณ "ฝ่าบาท ห้าร้อยปีที่ผ่านมา มนุษย์ยึดดินแดนเราไปครึ่งหนึ่ง จะสั่งอย่างไร"',[
  O('⚔️ เตรียมทัพ บุกมนุษย์',()=>feed('⚔️ โกรห์หอนลั่นด้วยความดีใจ'+dkAl(K,-15)+dkGen(K,0,15)+((DK_(K).army+=500),'')),'',.35),
  O('🕊️ ประกาศว่าจะไม่มีสงครามอีก',()=>feed('🕊️ ห้องโถงเงียบกริบ มีแค่นอคทิสที่ยิ้มแล้วกลับไปนอน'+dkAl(K,18)+dkGen(K,0,-15)+dkGen(K,3,10)),'',.35),
  O('🤫 ซ่อนตัวตนไปก่อน ใช้ชีวิตเป็นมนุษย์',()=>feed('🤫 แม่ทัพทั้งสี่แปลงร่างเป็นคนรับใช้ในบ้านคุณ เพื่อนบ้านสงสัยว่าทำไมคนสวนตัวใหญ่ขนาดนั้น'+dkGen(K,2,10)),'',.3)]),
 K=>C('🍖 ปีศาจหิวโหย','ฤดูหนาวนี้ปีศาจชั้นล่างอดอยาก พวกมันขออนุญาตบุกปล้นหมู่บ้านมนุษย์ชายแดน',[
  O('😈 อนุญาต',()=>feed('😈 หมู่บ้านสามแห่งหายไป ปีศาจอิ่มทั้งฤดู'+money(800)+dkAl(K,-20)+((DK_(K).army+=300),'')),'',.3),
  O('🌾 ปฏิรูปไร่ปีศาจ (มินิเกม)',()=>mgHold('เพาะปลูกบนดินแดนปีศาจให้ได้ผล',sc=>feed(sc>=.55?'🌾 ข้าวสาลีสีม่วงขึ้นเต็มทุ่ง ปีศาจได้กินอิ่มโดยไม่ต้องปล้นใคร'+dkAl(K,15):'🌾 ผลผลิตได้ครึ่งเดียว ปีศาจบางกลุ่มแอบไปปล้นอยู่ดี'+dkAl(K,-5))),'มินิเกม',.4),
  O('💰 แบ่งคลังสมบัติให้',()=>feed(money(-Math.min(S.money||0,600))+' 💰 ปีศาจไม่เคยมีจอมมารที่ยอมจ่ายเงินให้มาก่อน'+dkAl(K,10)+dkGen(K,1,-10)),'',.3)]),
 K=>C('🤝 ทูตมนุษย์มาเจรจา','ทูตมนุษย์ตัวสั่นยื่นสาส์นจากราชา ขอสงบศึกสิบปี แลกกับดินแดนชายแดนครึ่งหนึ่ง',[
  O('🗣️ เจรจาให้ได้มากกว่านี้ (มินิเกม)',()=>mgRead('ต่อรองกับทูตมนุษย์','ทูตมนุษย์',sc=>feed(sc>=.55?'🗣️ ได้ดินแดนคืนทั้งหมดโดยไม่เสียเลือด ทูตกลับไปพร้อมความเคารพ'+dkAl(K,8)+((DK_(K).dom=(DK_(K).dom|0)+20),''):'🗣️ เจรจาล้มเหลว ทูตหนีกลับ'+dkAl(K,-3))),'มินิเกม',.4),
  O('✍️ เซ็นสัญญาตามที่ขอ',()=>feed('✍️ สิบปีแห่งสันติ แม่ทัพบางคนไม่พอใจ'+dkAl(K,12)+dkGen(K,0,-10)),'',.3),
  O('🩸 ส่งหัวทูตกลับไป',()=>feed('🩸 ทั้งทวีปรู้ว่าจอมมารกลับมาแล้ว'+dkAl(K,-25)+dkGen(K,0,15)),'',.3)]),
 K=>{const D=DK_(K),L=D.g.filter(g=>g.alive).sort((a,b)=>a.loy-b.loy),g=L[0];if(!g)return;const i=D.g.indexOf(g);
  C(`🗡️ ${g.ic} ${g.n}คิดกบฏ`,`สายลับรายงานว่า${g.n} (ภักดี ${g.loy}) กำลังรวบรวมกองกำลังเพื่อชิงบัลลังก์`,[
   O('⚔️ ดวลต่อหน้าทั้งกองทัพ',()=>mgDuel(`ดวลกับ${g.n}`,g.n,sc=>{if(sc>=.55){g.loy=90;feed(`⚔️ ${g.n}คุกเข่า "ข้าลืมไปว่าทำไมท่านถึงเป็นจอมมาร"`+dkAl(K,-3))}else{g.alive=0;D.army=Math.round(D.army*.7);say(`⚔️ ${g.n}พาทหารสามส่วนออกไปตั้งอาณาจักรของตัวเอง`,'bad')}}),'มินิเกม',.4),
   O('🫂 ถามว่าต้องการอะไร',()=>{g.loy+=R(15,35);feed(`🫂 ${g.n}บอกว่า "${g.t}" คุณให้ในสิ่งที่ให้ได้`+dkAl(K,6))},'',.35),
   O('💀 กำจัดก่อนลงมือ',()=>{g.alive=0;feed(`💀 ${g.n}หายไปในคืนเดียว แม่ทัพที่เหลือภักดีขึ้น… ด้วยความกลัว`+dkAl(K,-18));D.g.forEach(x=>{if(x.alive)x.loy+=10})},'',.25)])},
 K=>C('👸 เจ้าหญิงตัวประกัน','ราชามนุษย์ส่งลูกสาวมาเป็นตัวประกันเพื่อสันติ เธอเดินเข้าปราสาทปีศาจโดยไม่สั่นเลยสักนิด',[
  O('🌹 ปฏิบัติต่อเธออย่างแขกเกียรติยศ',()=>{X8(K).prin=1;feed('🌹 เธอสอนแม่ทัพหมาป่าเล่นหมากรุก และเริ่มอ่านหนังสือในห้องสมุดของคุณทุกคืน'+dkAl(K,10))},'',.4),
  O('⛓️ ขังไว้ในหอคอย',()=>feed('⛓️ คืนนั้นเธอร้องเพลงจากหอคอย ทั้งปราสาทได้ยิน'+dkAl(K,-10)),'',.3),
  O('🏇 ส่งกลับไปพร้อมจดหมาย "ข้าไม่ต้องการตัวประกัน"',()=>feed('🏇 ราชามนุษย์อ่านจดหมายซ้ำสามรอบ'+dkAl(K,15)),'',.3)]),
 K=>C('🏙️ เมืองหลวงปีศาจ','ถึงเวลาสร้างเมืองหลวงใหม่ ปีศาจรอคำสั่งว่าจะสร้างอะไรเป็นอย่างแรก',[
  O('🏫 โรงเรียนสำหรับลูกปีศาจ',()=>feed('🏫 รุ่นแรกมีนักเรียนสองพันตัว ครูคนแรกคือลิชมอร์ต'+dkAl(K,15)+dkGen(K,2,10))),
  O('🏟️ สนามประลองทาสมนุษย์',()=>feed('🏟️ เสียงโห่ร้องดังทุกคืน'+money(1000)+dkAl(K,-20)+dkGen(K,1,10))),
  O('🛒 ตลาดเปิดให้มนุษย์มาค้าขาย',()=>feed('🛒 พ่อค้ามนุษย์กล้าๆ กลุ่มแรกกลับไปพร้อมกำไรสามเท่า ข่าวลือเริ่มเปลี่ยน'+money(500)+dkAl(K,10)))]),
 K=>C('⚡ เทพลงมาตำหนิ',`เทพองค์หนึ่งลอยอยู่เหนือปราสาท "จอมมารมีหน้าที่เป็นปีศาจร้าย เพื่อให้มนุษย์มีศัตรูร่วมกัน เจ้ากำลังทำลายสมดุล"`,[
  O('😈 "งั้นข้าจะทำลายมันให้หมด"',()=>duel('เทพผู้รักษาสมดุล',Math.round(threat(K)*1.25),w=>feed(w?'😈 เทพถอยกลับขึ้นฟ้าพร้อมปีกที่หัก'+dkAl(K,-10)+pw(capOf(K)*.1):'😈 สายฟ้าฟาดลงกลางปราสาท'+hurt(.4))),'ต่อสู้',.4),
  O('🗣️ "สมดุลแบบนั้นไม่ใช่สิ่งที่ข้าเลือก"',()=>{if(K.clue<3)feed(clue(K,'บทจอมมารถูกเทพเขียนไว้ตั้งแต่แรก'));feed('🗣️ เทพมองคุณนาน แล้วหายไปโดยไม่พูดอะไร'+dkAl(K,10))},'',.6)]),
 K=>C('📜 ความทรงจำชาติก่อน','ในฝัน คุณเห็นวันที่ถูกฆ่าเมื่อห้าร้อยปีก่อน คนที่ปักดาบลงอกไม่ใช่ผู้กล้า แต่เป็นแม่ทัพคนหนึ่งของคุณเอง',[
  O('🔍 สืบว่าใคร (มินิเกม)',()=>mgRune('ต่อความทรงจำชาติก่อน',5,sc=>{const D=DK_(K),g=pick(D.g.filter(x=>x.alive))||D.g[0];if(sc>=.55){X8(K).trait=g.n;feed(`🔍 คนนั้นคือ${g.n} — แต่ชาตินี้เขายังไม่รู้ว่าคุณจำได้`)}else feed('🔍 ความทรงจำพร่าเลือน ใบหน้านั้นหายไป')}),'มินิเกม',.5),
  O('🌫️ ช่างมัน ชาตินี้คือชาตินี้',()=>feed('🌫️ คุณตื่นมาด้วยความรู้สึกเบาสบายอย่างประหลาด'+dkAl(K,5)),'',.5)])];
function dkWave(K){const D=DK_(K);D.wv++;let past=null;try{const A=LS.get('murim_fanarch',null);past=A&&A.last&&D.wv===2?A.last.n:null}catch(e){}
 const hn=past||nm(rnd()<.5?'m':'f');C(`⚔️ ผู้กล้ารุ่นที่ ${D.wv} มาถึง`,`วงเวทอัญเชิญส่งผู้กล้าคนใหม่มาจากต่างโลก <b>${E(hn)}</b>${past?' — หน้าตาเหมือนคุณในชาติก่อนไม่มีผิด… หรือนี่คือคุณจริงๆ':''} กำลังเดินทัพมาที่ปราสาท · กองทัพปีศาจ ${fmt(D.army)}`,[
  O('⚔️ สู้ด้วยตัวเอง',()=>duel(hn,Math.round(threat(K)*(1+D.wv*.12)),w=>{if(w){feed(`⚔️ ผู้กล้า${E(hn)}ล้มลง`+(D.al>=30?' คุณไว้ชีวิตแล้วส่งกลับโลกเดิม'+dkAl(K,5):' ร่างของเขาถูกแขวนหน้าประตูเมือง'+dkAl(K,-8))+pw(capOf(K)*.05));if(past)X8(K).pastWin=1}else if(K.save>0){K.save--;feed('⚔️ คุณเกือบตาย แต่รอดมาได้ · รอดตาย -1'+hurt(.5))}else ending(K,'dk_slain',`ผู้กล้า${E(hn)}ปักดาบลงกลางบัลลังก์ ${D.al>=30?'ก่อนสิ้นใจ คุณบอกเขาว่า "ดูแลปีศาจที่ไม่ได้ทำผิดด้วย" เขาสัญญา':'ทั้งทวีปเฉลิมฉลองเจ็ดวันเจ็ดคืน'}`,'ถูกผู้กล้าสังหารบนบัลลังก์จอมมาร')}),'ต่อสู้',.45),
  O('🪤 วางกับดักทั้งปราสาท (มินิเกม)',()=>mgCups('ซ่อนห้องบัลลังก์จริงจากผู้กล้า',sc=>feed(sc>=.5?`🪤 ผู้กล้า${E(hn)}หลงในปราสาทสามเดือนแล้วออกไปเอง`:'🪤 ผู้กล้าเจอทางเข้า กองทัพเสียหายหนัก'+((D.army=Math.round(D.army*.8)),'')),'🚪'),'มินิเกม',.3),
  O('🍵 เชิญมาดื่มชาคุยกัน',()=>mgRead('คุยกับผู้กล้าให้เข้าใจ',hn,sc=>{if(sc>=.55&&D.al>=0){X8(K).heroF=(X8(K).heroF|0)+1;feed(`🍵 ผู้กล้า${E(hn)}วางดาบลง "ข้าถูกหลอกมาตลอดสินะ" เขาอยู่เป็นที่ปรึกษาของคุณ`+dkAl(K,10))}else feed(`🍵 ผู้กล้าสาดชาใส่หน้าคุณแล้วชักดาบ`+hurt(.25))}),'',.25)])}
const DKE=[['dk_kind','😇','จอมมารผู้ใจดี','เป็นจอมมารสายดีจนจบ'],['dk_tyrant','👿','จอมมารผู้พิชิตทวีป','เป็นจอมมารสายชั่วจนจบ'],['dk_slain','⚔️','ล้มบนบัลลังก์','ถูกผู้กล้าสังหาร'],['dk_retire','🧁','จอมมารเกษียณ','ทิ้งบัลลังก์ไปใช้ชีวิตธรรมดา'],['dk_friend','🤝','จอมมารที่ผู้กล้าเรียกว่าเพื่อน','สายดีมาก + ผู้กล้าเป็นมิตร + แม่ทัพภักดีทุกคน',1],['dk_void','🌑','ฟ้ามืดตลอดกาล','สายชั่วสุดขั้ว + ชนะผู้กล้าที่เป็นตัวคุณชาติก่อน',1]];
regEnd(DKE);
function dkFin(K,o){const D=DK_(K);if(!D)return;const loyal=D.g.every(g=>!g.alive||g.loy>=70);
 if(D.al>=40)o.push(O('😇 ปกครองแบบจอมมารผู้ใจดีจนวันสุดท้าย',()=>ending(K,'dk_kind','ปีศาจกับมนุษย์ค้าขายกันข้ามพรมแดน เด็กปีศาจไปโรงเรียน ส่วนเด็กมนุษย์เล่านิทานเรื่องจอมมารที่ไม่เคยกินใคร','สวรรคตบนบัลลังก์ท่ามกลางปีศาจที่ร้องไห้ทั้งอาณาจักร'),'',.3));
 if(D.al<=-40)o.push(O('👿 พิชิตทวีปให้สิ้นซาก',()=>ending(K,'dk_tyrant',`กองทัพปีศาจ ${fmt(D.army)} ตนเดินทัพข้ามทวีป ราชาทุกองค์คุกเข่า โลกนี้เป็นของคุณ และไม่มีใครกล้าพูดชื่อคุณดังๆ อีก`,'ครองทวีปในฐานะจอมมารผู้โหดร้ายจนสิ้นอายุขัย'),'',.3));
 o.push(O('🧁 ทิ้งบัลลังก์ เปิดร้านขนม',()=>ending(K,'dk_retire','คุณยกบัลลังก์ให้แม่ทัพที่ภักดีที่สุด แล้วเปิดร้านขนมในเมืองมนุษย์ ลูกค้าไม่เคยรู้ว่าคนทำครัวซองต์อร่อยที่สุดในเมืองเคยเป็นจอมมาร','จากไปอย่างสงบหลังเตาอบ'),'',.2));
 if(D.al>=70&&(X8(K).heroF|0)>=1&&loyal)o.push(O('🤝 จับมือผู้กล้าต่อหน้าทวีป',()=>ending(K,'dk_friend','ผู้กล้ากับจอมมารยืนจับมือกันกลางสนามรบสุดท้าย ทั้งสองกองทัพวางอาวุธพร้อมกัน วงเวทอัญเชิญถูกทำลาย จะไม่มีผู้กล้าหรือจอมมารรุ่นต่อไปอีก','จากไปในฐานะเพื่อนของผู้กล้า'),'🗝️ ฉากจบลับ',.1));
 if(D.al<=-80&&X8(K).pastWin)o.push(O('🌑 ดับดวงอาทิตย์',()=>ending(K,'dk_void','คุณฆ่าผู้กล้าที่เป็นตัวเองในชาติก่อน แล้วยื่นมือขึ้นดับดวงอาทิตย์ ทวีปจมสู่ความมืดตลอดกาล มีแต่บัลลังก์ของคุณที่ส่องแสง','ยังไม่ตาย ยังนั่งอยู่บนบัลลังก์ในความมืด'),'🗝️ ฉากจบลับ',.1))}

// ---------- 🏆 ทัวร์นาเมนต์ 8 คน ----------
const TST=[['power','💪','สายพลัง'],['speed','⚡','สายความเร็ว'],['trick','🃏','สายเล่ห์กล'],['magic','🔮','สายเวท']];
const TTAC=[['🛡️ ตั้งรับรอจังหวะ','power'],['⚡ บุกเร็วไม่ให้ตั้งตัว','magic'],['🧠 อ่านเกมไม่หลงกล','trick'],['🔥 ทุ่มสุดตัวตั้งแต่ต้น','speed']];
const TFIN=['ฟันจันทร์เสี้ยวพันดวง','หมัดภูเขาถล่ม','ลูกไฟสีดำ','ร่างแยกเจ็ดเงา','เสียงกรีดร้องของมังกร','ดาบที่ไม่มีใครเห็น','คำสาปให้หัวเราะจนล้ม','ฝนเข็มน้ำแข็ง'];
const TNM=['ราเซล "ไม่เคยแพ้"','ลูน่าดาบคู่','บรูโน่ยักษ์ใจดี','ไวเปอร์เงาพิษ','เซอร์ลาเวนเดอร์','ยายเมย์ผู้เกษียณ','เด็กชายนิรนาม','อัศวินในชุดเกราะว่างเปล่า','เจ้าหญิงปลอมตัว','นักบวชที่ต่อยแรงที่สุด','โจรสลัดขาไม้','จอมเวทเมาค้าง'];
function evTour(K){const X=X8(K);X.tour=1;const foes=shuf(TNM).slice(0,7).map((n,i)=>({n,st:pick(TST),fin:pick(TFIN),p:.85+i*.06+rnd()*.15}));const B=shuf(foes).slice(0,3).sort((a,b)=>a.p-b.p);
 const T={r:0,won:0,bet:0,B};X.tr=T;
 C('🏆 ศึกชิงจ้าวแห่งทวีป','ประกาศรับสมัครนักสู้ 8 คนชิงตำแหน่ง "จ้าวแห่งทวีป" ผู้ชนะได้รางวัลจากราชาและชื่อที่ถูกจารึกไว้บนกำแพงสนาม · มีโต๊ะพนันข้างสนาม',[
  O('⚔️ ลงสมัคร',()=>tourRound(K),'',.7),O('🍿 นั่งดูแล้วแทงพนัน',()=>{const w=pick(foes);const g=Math.min(S.money||0,200);feed(rnd()<.3?`🍿 คุณแทงข้าง${E(w.n)} และเขาชนะ!`+money(g*3):`🍿 คนที่คุณแทงตกรอบแรก`+money(-g))},'',.3)])}
const TRN=['รอบ 8 คน','รอบรองชนะเลิศ','รอบชิงชนะเลิศ'];
function tourRound(K){const T=X8(K).tr,f=T.B[T.r];if(!f)return;const hint=rnd()<.7?f.st:pick(TST);
 const fight=(tac,thr)=>{const m=pick(['duel','combo','hold']),t=`${TRN[T.r]}: ปะทะ ${f.n}`;const cb=sc=>{let s=sc*.55+(tac===f.st[0]?.3:0)+cl(S.power/(threat(K)*f.p),0,1.5)*.25;if(thr)s=0;const win=s>=.62;
   if(thr){money(R(600,1200));K.dark+=8;return feed(`💸 คุณแพ้ให้${E(f.n)}แบบเนียนสุดๆ เจ้ามือพนันยัดถุงทองให้หลังสนาม`)}
   if(win){T.r++;T.won++;if(T.bet){money(T.bet*2);T.bet=0}feed(`🏆 ชนะ${E(f.n)}!${tac===f.st[0]?' อ่านทางเขาขาด':''} ${T.r>=3?'':'· ผ่านเข้ารอบต่อไป'}`);if(T.r>=3){X8(K).champ=1;fxBig('confetti',1.6);say(`🏆 <b>คุณคือจ้าวแห่งทวีป!</b> ชื่อคุณถูกสลักบนกำแพงสนามข้างแชมป์ร้อยปีก่อน${money(R(1500,3000))}${lootDrop(K,4,'ถ้วยรางวัล')}${rep(25)}`,'myth',true);X3(K).titles.push('จ้าวแห่งทวีป')}else queue(()=>tourRound(K))}
   else{if(T.bet){T.bet=0}feed(`💥 แพ้ให้${E(f.n)}ด้วยท่า "${f.fin}" ${hurt(.3)} · จบที่${TRN[T.r]}`)}};
  ({duel:()=>mgDuel(t,f.n,cb),combo:()=>mgCombo(t,cb),hold:()=>mgHold(t,cb)})[m]()};
 const ops=TTAC.map(t=>O(t[0],()=>fight(t[1]),'',.22));
 ops.push(O('💰 แทงพนันข้างตัวเอง 300 แล้วสู้แบบทุ่มสุดตัว',()=>{const g=Math.min(S.money||0,300);money(-g);T.bet=g;fight('speed')},'',.06));
 if(T.r>=1)ops.push(O('🤫 รับเงินล้มมวย',()=>fight(null,1),'เจ้ามือแอบมาเสนอ',.06));
 C(`🏆 ${TRN[T.r]} — ${E(f.n)}`,`คู่ต่อสู้: <b>${E(f.n)}</b> · ข่าวลือว่าเป็น${hint[1]} ${hint[2]} (ข่าวลือไม่ถูกเสมอไป) · ท่าไม้ตาย "${f.fin}"`,ops)}

// ---------- 👑 ปกครองแคว้น ----------
const RF={noble:['🎩','ขุนนาง'],church:['⛪','ศาสนจักร'],people:['🧑‍🌾','ประชาชน'],army:['⚔️','กองทัพ']};
const RLf=(K,d)=>{const r=X8(K).rl;let t='';for(const k in d){r.f[k]=cl(r.f[k]+d[k],0,100);t+=` ${RF[k][0]}${d[k]>0?'+':''}${d[k]}`}return' ·'+t};
const DEC=[
 K=>C('📜 ราชโองการ: ภาษี','คลังหลวงร่อยหรอ ขุนนางเสนอขึ้นภาษี ประชาชนขอลด',[O('📈 ขึ้นภาษี',()=>feed('📈 คลังเต็ม'+money(1500)+RLf(K,{people:-15,noble:10}))),O('📉 ลดภาษี',()=>feed('📉 ประชาชนเฉลิมฉลอง'+money(-500)+RLf(K,{people:15,noble:-10}))),O('💎 เก็บภาษีวิหารแทน',()=>feed('💎 นักบวชโกรธจัด'+money(1000)+RLf(K,{church:-20,people:5})))]),
 K=>C('⚖️ ศาลหลวง',`ลูกชายดยุก${pick(['ขี่ม้าชนเด็ก','เผาโรงนา','ขโมยมรดกน้องสาว'])} ประชาชนรอคำตัดสินของคุณ`,[O('⚖️ ลงโทษตามกฎหมาย',()=>feed('⚖️ ดยุกโกรธแค้น แต่ประชาชนเชื่อมั่นในศาล'+RLf(K,{people:15,noble:-15}))),O('🤝 ยอมความด้วยเงิน',()=>feed('🤝 ทุกอย่างเงียบลง… บนผิวน้ำ'+money(800)+RLf(K,{noble:10,people:-12}))),O('🧠 ตัดสินแบบที่ไม่มีใครคาด (มินิเกม)',()=>mgRead('หาทางตัดสินที่ทุกฝ่ายยอมรับ','ศาลหลวง',sc=>feed(sc>=.55?'🧠 ทุกฝ่ายพยักหน้า ทั้งที่ไม่มีใครได้ทุกอย่าง'+RLf(K,{people:8,noble:5,church:5}):'🧠 ไม่มีใครพอใจเลยสักฝ่าย'+RLf(K,{people:-5,noble:-5}))),'มินิเกม')]),
 K=>C('⚔️ แคว้นข้างเคียงยั่วยุ','กองทัพแคว้นข้างเคียงตั้งค่ายประชิดชายแดน แม่ทัพขอบุกก่อน',[O('⚔️ บุก',()=>duel('แม่ทัพแคว้นข้างเคียง',Math.round(threat(K)*1.1),w=>feed(w?'⚔️ ได้ดินแดนเพิ่ม'+money(1000)+RLf(K,{army:15,people:-5}):'⚔️ แพ้ศึก'+RLf(K,{army:-15,people:-10}))),'ต่อสู้'),O('🕊️ ส่งทูตเจรจา',()=>feed('🕊️ สงบศึก กองทัพบ่นว่าไม่มีงานทำ'+RLf(K,{army:-10,people:8}))),O('🏰 สร้างกำแพงชายแดน',()=>feed('🏰 ใช้เงินมหาศาล แต่ทุกคนนอนหลับสบาย'+money(-1200)+RLf(K,{army:8,people:5})))]),
 K=>C('⛪ ศาสนจักรขออำนาจ','สังฆราชขอให้ประกาศศาสนาเดียวทั้งแคว้น และให้วิหารคุมโรงเรียนทุกแห่ง',[O('✅ อนุมัติ',()=>feed('✅ วิหารยิ้มแย้ม คนต่างศาสนาเริ่มอพยพออก'+RLf(K,{church:20,people:-10}))),O('❌ ปฏิเสธ',()=>feed('❌ สังฆราชเทศน์โจมตีคุณทุกวันอาทิตย์'+RLf(K,{church:-20,people:5}))),O('🤝 แบ่งกันคนละครึ่ง',()=>feed('🤝 ไม่มีใครพอใจเต็มที่ ไม่มีใครโกรธเต็มที่'+RLf(K,{church:5,people:2})))]),
 K=>C('🌾 ภัยแล้ง','ฝนไม่ตกสามเดือน ทุ่งนาแตกระแหง',[O('🍞 เปิดยุ้งฉางหลวง',()=>feed('🍞 ไม่มีใครอดตาย'+money(-800)+RLf(K,{people:15}))),O('⛪ ขอให้วิหารทำพิธีขอฝน',()=>feed(rnd()<.5?'⛪ ฝนตกในวันรุ่งขึ้น! วิหารได้หน้า'+RLf(K,{church:15,people:5}):'⛪ ฝนไม่ตก… ประชาชนหัวเราะเยาะนักบวช'+RLf(K,{church:-10,people:-5}))),O('🔮 ร่ายเวทเรียกฝนเอง (มินิเกม)',()=>mgHold('ร่ายเวทเรียกฝนทั้งแคว้น',sc=>feed(sc>=.55?'🔮 ฝนตกทั่วแคว้น ประชาชนเรียกคุณว่าผู้นำฝน'+RLf(K,{people:20,church:-5}):'🔮 ได้แค่ลูกเห็บก้อนเดียว'+RLf(K,{people:-5}))),'มินิเกม')]),
 K=>C('🎩 ขุนนางขอที่ดิน','ขุนนางกลุ่มใหญ่ขอที่ดินหลวงเป็นรางวัลความภักดี',[O('🎁 ให้',()=>feed('🎁 ขุนนางภักดีขึ้น ชาวนาบางส่วนเสียที่ทำกิน'+RLf(K,{noble:18,people:-10}))),O('🧑‍🌾 แจกให้ชาวนาแทน',()=>feed('🧑‍🌾 ชาวนาเต้นรำทั้งคืน ขุนนางเริ่มประชุมลับ'+RLf(K,{people:18,noble:-18}))),O('🏦 ขายทอดตลาด',()=>feed('🏦 คนรวยได้ที่ดินไป คลังได้เงิน'+money(1500)+RLf(K,{noble:5,people:-5})))])];
function evRuleOffer(K){const X=X8(K);X.rlAsk=1;C('👑 สภาเสนอบัลลังก์','ผู้ปกครองแคว้นสิ้นพระชนม์โดยไม่มีรัชทายาท สภาลงมติเสนอให้คุณครองแคว้น',[O('👑 รับตำแหน่ง',()=>{X.rl={f:{noble:50,church:50,people:50,army:50},y:0};fxBig('fw',1.4);say('👑 <b>คุณขึ้นครองแคว้น</b> — ทุกปีจะมีเรื่องให้ตัดสิน ระวังอย่าให้ฝ่ายไหนไม่พอใจจนถึงขั้นก่อรัฐประหาร','myth',true)},'',.6),O('🙅 ปฏิเสธ',()=>feed('🙅 คุณเลือกชีวิตที่ไม่ต้องใส่มงกุฎ'),'',.4)])}
function evCoup(K,k){C(`🔥 รัฐประหาร: ${RF[k][0]} ${RF[k][1]}ก่อกบฏ`,`${RF[k][1]}ทนไม่ไหวอีกต่อไป กองกำลังล้อมวังแล้ว`,[
 O('⚔️ สู้เพื่อบัลลังก์',()=>duel(`ผู้นำ${RF[k][1]}`,Math.round(threat(K)*1.3),w=>{if(w){X8(K).rl.f[k]=35;feed('⚔️ คุณปราบกบฏได้ แต่แผลนี้จะไม่หายง่ายๆ'+dark(5))}else ending(K,'rl_fall',`${RF[k][1]}บุกเข้าห้องบัลลังก์ คุณถูกปลดจากตำแหน่งและเนรเทศไปเกาะร้าง ประวัติศาสตร์บันทึกว่าคุณเป็นผู้ปกครองที่ไม่ฟังเสียง${RF[k][1]}`,'ถูกรัฐประหารและเนรเทศ')}),'ต่อสู้',.5),
 O('🙏 ยอมรับข้อเรียกร้องทั้งหมด',()=>{const r=X8(K).rl;r.f[k]=60;for(const x in r.f)if(x!==k)r.f[x]=cl(r.f[x]-15,0,100);feed('🙏 วิกฤตผ่านไป แต่ฝ่ายอื่นมองว่าคุณอ่อนแอ')},'',.5)])}
const RLE=[['rl_golden','🌟','ยุคทองของแคว้น','ทุกฝ่ายพอใจ 60 ขึ้นไป'],['rl_iron','⚔️','ผู้ปกครองกำปั้นเหล็ก','กองทัพหนุนหลัง แต่ประชาชนกลัว'],['rl_fair','⚖️','ผู้ปกครองที่พอใช้ได้','ครองแคว้นจนจบโดยไม่ถูกโค่น'],['rl_fall','🔥','ถูกรัฐประหาร','มีฝ่ายไม่พอใจจนก่อกบฏสำเร็จ']];
regEnd(RLE);
function rlFin(K,o){const r=X8(K).rl;if(!r)return;const f=r.f;if(Object.values(f).every(v=>v>=60))o.push(O('🌟 ส่งมอบแคว้นในยุคทอง',()=>ending(K,'rl_golden','ทุกฝ่ายในแคว้นร่วมงานศพคุณ ขุนนาง นักบวช ทหาร และชาวนายืนแถวเดียวกัน นักประวัติศาสตร์เรียกรัชสมัยของคุณว่ายุคทอง','สวรรคตในยุคทองที่ตัวเองสร้าง'),'',.3));
 else if(f.army>=70&&f.people<45)o.push(O('⚔️ ปกครองด้วยกำปั้นเหล็กต่อไป',()=>ending(K,'rl_iron','แคว้นสงบเพราะความกลัว ไม่มีใครกล้าก่อกบฏ และไม่มีใครร้องไห้ในวันที่คุณจากไป','สวรรคตบนบัลลังก์ที่มีทหารล้อมรอบ'),'',.3));
 else o.push(O('⚖️ ครองแคว้นจนวันสุดท้าย',()=>ending(K,'rl_fair','คุณไม่ใช่ผู้ปกครองที่ยิ่งใหญ่ที่สุด แต่แคว้นไม่ล่มสลายในมือคุณ ซึ่งในโลกนี้นับว่าหายาก','สวรรคตอย่างสงบ'),'',.25))}

// ---------- 🐲 ศึกล่ามังกรหลายปี ----------
const DRP=[['hunt','🏹','รวบรวมนักล่ามังกร',K=>cb=>mgRead('โน้มน้าวนักล่ามังกรในตำนานให้มาร่วม','นักล่าชราตาเดียว',cb)],['forge','🔨','ตีดาบสังหารมังกร',K=>cb=>mgHold('คุมไฟหลอมเหล็กดาวตก',cb)],['weak','📜','สืบหาจุดอ่อน',K=>cb=>mgRune('ถอดรหัสบันทึกนักล่ารุ่นก่อน',5,cb)],['scout','🗺️','สำรวจรังมังกร',K=>cb=>mgCups('หาเส้นทางลับเข้ารัง',cb,'🐉')]];
function evDragonWake(K){const X=X8(K);X.dr={p:{},ok:0,st:age()};fxBig('poof',1.5);say(`🐲 <b>มังกรโบราณตื่นแล้ว</b> — ${pick(['มังกรเพลิงเวลกราธ','มังกรน้ำแข็งไอสเวิร์น','มังกรเงาโนคตูรา'])}เผาเมืองชายแดนไปสามเมือง ราชาประกาศว่าใครสังหารมันได้จะได้สิ่งที่ขอหนึ่งข้อ · ใช้เวลาเตรียมตัวไม่เกิน 5 ปี`,'myth',true)}
function evDragonPrep(K){const X=X8(K),D=X.dr,L=DRP.filter(p=>!D.p[p[0]]);if(!L.length)return evDragonRaid(K);const p=pick(L);
 C(`🐲 เตรียมล่ามังกร: ${p[1]} ${p[2]}`,`การเตรียมตัว ${Object.keys(D.p).length}/4 · ยิ่งเตรียมพร้อมยิ่งมีโอกาสรอด`,[O(`${p[1]} ลงมือ (มินิเกม)`,()=>p[3](K)(sc=>{D.p[p[0]]=1;if(sc>=.5){D.ok++;feed(`${p[1]} ${p[2]}สำเร็จ`)}else feed(`${p[1]} ${p[2]}ได้ผลไม่เต็มที่`)}),'',.8),O('⏭️ ข้ามไปก่อน',()=>{D.p[p[0]]=1;feed('⏭️ คุณข้ามขั้นนี้ไป หวังว่าจะไม่เสียใจ')},'',.2)])}
function evDragonRaid(K){const X=X8(K),D=X.dr;D.done=1;const pa=X3(K).party.filter(p=>p.alive).length;
 C('🐲 บุกรังมังกร',`ถึงเวลาแล้ว · เตรียมสำเร็จ ${D.ok}/4 · ปาร์ตี้ ${pa} คน`,[O('🔥 บุก (มินิเกม 2 ด่าน)',()=>{let t=0;mgCombo('หลบลมหายใจไฟ',a=>{t+=a;mgDuel('ปักดาบลงหัวใจมังกร','มังกรโบราณ',b=>{t+=b;const s=t/2*.5+D.ok*.1+pa*.05+cl(S.power/(capOf(K)*1.5),0,1)*.15;
  if(s>=.6){X.dragon=1;fxBig('fw',1.8);say(`🐲 <b>คุณสังหารมังกรโบราณ!</b> ทั้งทวีปเรียกคุณว่าผู้สังหารมังกร${money(R(3000,6000))}${lootDrop(K,5,'มังกรโบราณ')}${rep(40)}`,'myth',true);X3(K).titles.push('ผู้สังหารมังกร')}
  else if(s<.35&&!K.save)ending(K,'dr_ash','ลมหายใจสุดท้ายของมังกรกลืนคุณทั้งร่าง เหลือแต่ดาบที่ละลายครึ่งเล่มปักอยู่ในรัง นักล่ารุ่นต่อมาใช้มันเป็นเครื่องหมายว่าเคยมีคนกล้าพอ','ถูกไฟมังกรเผาเป็นเถ้า');
  else{if(s<.35&&K.save)K.save--;say('🐲 มังกรหนีไปพร้อมแผลลึก คุณรอดมาได้อย่างหวุดหวิด'+hurt(.5),'bad',true)}})})},'',.8),O('🏃 ยอมแพ้ ไม่ไปแล้ว',()=>feed('🏃 มังกรยังคงเผาเมืองต่อไป คนเริ่มลืมว่าเคยมีคนรับปากไว้'+rep(-10)),'',.2)])}
regEnd([['dr_ash','🔥','เถ้าในรังมังกร','ล่ามังกรล้มเหลวโดยไม่มีที่พึ่ง']]);

// ---------- 📸 การ์ดสรุปชีวิต ----------
function cardData(K){const X3_=X3(K),X7_=X7(K),e=K.end&&ENDS[K.w]&&ENDS[K.w][K.end],V=K.mv?MV[K.mv]:K.mvx?MVX[K.mvx]:null,D=DK_(K);
 const hl=[];if(D)hl.push(`👑 จอมมาร · ${alT(D.al)}`);if(V)hl.push(`${V.ic} ${V.n}`);(X7_.rules||[]).forEach(r=>hl.push(`${RULE[r][0]} ${RULE[r][1]}`));Object.keys(X7_.leg||{}).slice(0,2).forEach(k=>{const l=LEG.find(x=>x[0]===k);if(l)hl.push(`💎 ${l[2]}`)});
 if(X8(K).champ)hl.push('🏆 จ้าวแห่งทวีป');if(X8(K).dragon)hl.push('🐲 ผู้สังหารมังกร');if(X8(K).rl)hl.push('👑 เคยครองแคว้น');const bk=Object.keys(X3_.bk||{}).length;if(bk)hl.push(`👹 ล้มบอส ${bk} ตัว`);if(X3_.pet&&X3_.pet.st>=3)hl.push(`🐲 ${petForm(X3_.pet)[1]}`);if(X3_.base)hl.push(`${BASE[X3_.base][0]} ${BASE[X3_.base][1]}`);if(K.gen>1)hl.push(`🌳 ทายาทรุ่นที่ ${K.gen}`);
 return{n:S.name,w:WD[K.w],age:age(),e,hl:hl.slice(0,8),gold:S.money|0,rep:K.rep|0}}
window.fanCard=function(){const K=FN();if(!K)return;const d=cardData(K),cv=document.createElement('canvas');cv.width=720;cv.height=1000;const g=cv.getContext('2d');
 const gr=g.createLinearGradient(0,0,0,1000);gr.addColorStop(0,'#2b1d55');gr.addColorStop(1,'#0d0a1f');g.fillStyle=gr;g.fillRect(0,0,720,1000);
 for(let i=0;i<90;i++){g.fillStyle=`rgba(255,240,200,${Math.random()*.6})`;g.fillRect(Math.random()*720,Math.random()*1000,2,2)}
 g.strokeStyle='#c9a24a';g.lineWidth=6;g.strokeRect(24,24,672,952);g.lineWidth=2;g.strokeRect(36,36,648,928);
 g.textAlign='center';g.fillStyle='#ffd54a';g.font='bold 30px sans-serif';g.fillText('1 ใน นวนิยาย · บันทึกชีวิต',360,96);
 g.font='64px sans-serif';g.fillText(d.w?d.w.ic:'✨',360,190);g.fillStyle='#fff';g.font='bold 46px sans-serif';g.fillText(String(d.n||'').slice(0,22),360,262);
 g.fillStyle='#d9c9ff';g.font='26px sans-serif';g.fillText(`${d.w?d.w.n:''} · อายุ ${d.age} ปี`,360,306);
 if(d.e){g.fillStyle='rgba(255,213,74,.12)';g.fillRect(70,336,580,120);g.fillStyle='#ffd54a';const et=`${d.e[0]} ${d.e[1]}`;let fs=34;do{g.font=`bold ${fs}px sans-serif`;fs-=2}while(g.measureText(et).width>560&&fs>18);g.fillText(et,360,388);g.fillStyle='#f3e7c8';g.font='22px sans-serif';g.fillText(d.e[3]?'🗝️ ฉากจบลับ':'ฉากจบ',360,430)}
 g.textAlign='left';g.font='26px sans-serif';let y=d.e?510:380;for(const h of d.hl){g.fillStyle='#f6ecd4';g.fillText('• '+h.slice(0,30),90,y);y+=46}
 g.textAlign='center';g.fillStyle='#bfb3e0';g.font='22px sans-serif';g.fillText(`🪙 ${fmt(d.gold)} · ⭐ ชื่อเสียง ${d.rep}`,360,900);g.fillStyle='#ffd54a';g.font='bold 24px sans-serif';g.fillText('www.1inanovel.com',360,940);
 const url=cv.toDataURL('image/png');window._fcUrl=url;window._fcCv=cv;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📸 การ์ดชีวิต</h3><img src="${url}" style="width:100%;border-radius:10px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px"><button class="pbtn" onclick="fanCardDl()">⬇️ บันทึกรูป</button><button class="pbtn" onclick="fanCardShare()">📤 แชร์</button></div>`,'fancard')};
window.fanCardDl=()=>{try{const a=document.createElement('a');a.href=window._fcUrl;a.download='1inanovel-life.png';document.body.appendChild(a);a.click();a.remove()}catch(e){}};
window.fanCardShare=()=>{try{window._fcCv.toBlob(b=>{const f=new File([b],'1inanovel-life.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],title:'1 ใน นวนิยาย',text:'ชีวิตของฉันในโลกแฟนตาซี · www.1inanovel.com'}).catch(()=>{});else{fanCardDl();toast('บันทึกรูปแล้ว แชร์จากแกลเลอรีได้เลย')}})}catch(e){fanCardDl()}};

// ---------- hooks ภาค 8 ----------
{const _ld=lootDrop;lootDrop=function(K,t){const r=_ld.apply(this,arguments);try{if(t>=4)fxBig('burst',1.3)}catch(e){}return r}}
{const _el=evLeg;evLeg=function(K){fxBig('fw',1.5);return _el.apply(this,arguments)}}
{const _en=ending;ending=function(K,k){if(K&&K.end)return _en.apply(this,arguments);try{const e=ENDS[K.w]&&ENDS[K.w][k];if(e&&e[3])setTimeout(()=>fxBig('confetti',1.8),400)}catch(x){}const r=_en.apply(this,arguments);try{setTimeout(()=>{try{say('📸 <b>บันทึกชีวิตนี้เป็นการ์ดแชร์ได้</b> — เปิดเมนู → 📸 การ์ดชีวิต','epic')}catch(e){}},1200)}catch(x){}return r}}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(K&&K.dlord===undefined){if(window._dkForce||rnd()<.05){K.dlord=1;K.mv=null;K.mvx=null;dkStart(K);sync();render()}else K.dlord=0}}catch(e){console.error('dk',e)}},1300)}}
for(const w of ['hero','trash','lost','magic','noble'])FOK[w].push(['fa_dk','👑','ปกครองอาณาจักรปีศาจ',K=>!!K.dlord]);
{const _df=doFocus;doFocus=function(K){if(S.focus==='fa_dk'&&K.dlord){const D=DK_(K),a=R(150,400);D.army+=a;feed(`👑 คุณบริหารอาณาจักรปีศาจ${D.al>=30?' สร้างถนนและโรงเรียน':D.al<=-30?' เกณฑ์ทหารทุกหมู่บ้าน':''} · กองทัพ +${a}${money(R(80,200))}`);return}return _df(K)}}
{const _x=xFin;xFin=function(K,o){_x(K,o);try{if(K.dlord)dkFin(K,o);rlFin(K,o)}catch(e){console.error('p8 fin',e)}}}
{const _fy=fanYear;fanYear=function(){const K=FN();const a0=S.age;_fy.apply(this,arguments);if(!K||!S.alive||S.age===a0||K.end)return;
 try{const X=X8(K),y=age(),sc=school(K);let pr=null;
  if(K.dlord){const D=DK_(K);if(y>=D.nx){D.nx=y+R(4,7);pr=()=>dkWave(K)}else if(rnd()<.55){const L=DKEV.map((f,i)=>i).filter(i=>!D.sn[i]);if(L.length){const i=L[0]===0?0:pick(L);D.sn[i]=1;pr=()=>DKEV[i](K)}}}
  if(!pr&&X.rl){const r=X.rl;r.y++;money(300);const bad=Object.keys(r.f).find(k=>r.f[k]<=10);if(bad)pr=()=>evCoup(K,bad);else if(rnd()<.75)pr=()=>pick(DEC)(K)}
  if(!pr&&X.dr&&!X.dr.done){pr=y-X.dr.st>=5?()=>evDragonRaid(K):(rnd()<.8?()=>evDragonPrep(K):null)}
  if(!pr&&!X.rlAsk&&y>=38&&(X3(K).base>=3||K.rep>=60)&&rnd()<.25)pr=()=>evRuleOffer(K);
  if(!pr&&!X.dr&&y>=24&&y<=48&&rnd()<.05)pr=()=>evDragonWake(K);
  if(!pr&&!X.tour&&!sc&&y>=16&&y<=35&&rnd()<.08)pr=()=>evTour(K);
  if(pr&&QU.length<=2){queue(pr);if(!FL)flush()}}catch(e){console.error('p8 year',e)}}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-fa8]')){const b=document.createElement('button');b.className='opt';b.setAttribute('data-fa8',1);b.innerHTML='📸 การ์ดชีวิต<small>รูปสรุปชีวิตไว้แชร์</small>';b.onclick=()=>fanCard();d.appendChild(b);const K=FN();if(K&&K.dlord){const c=document.createElement('button');c.className='opt';c.setAttribute('data-fa8',1);c.innerHTML='👑 อาณาจักรปีศาจ<small>แม่ทัพ · กองทัพ</small>';c.onclick=()=>fanDk();d.appendChild(c)}}}}catch(e){}return r}}
window.fanDk=function(){const K=FN(),D=K&&DK_(K);if(!D)return;modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>👑 อาณาจักรปีศาจ</h3><div class="item"><b>${alT(D.al)}</b><div class="tag2">ค่าความดี/ชั่ว ${D.al} · กองทัพ ${fmt(D.army)} · ผู้กล้าที่มาแล้ว ${D.wv} รุ่น</div></div><h4 style="margin:8px 0 4px">แม่ทัพทั้งสี่</h4>${D.g.map(g=>`<div class="item" style="${g.alive?'':'opacity:.45'}">${g.ic} <b>${g.n}</b> <span class="tag2">${g.alive?'ภักดี '+g.loy:'✝️ ไม่อยู่แล้ว'} · ${g.t}</span></div>`).join('')}`,'fandk')};
{const _hd=hud;hud=function(K){let h=_hd(K);try{const c=[],X=X8(K);if(K.dlord){const D=DK_(K);c.push(`<span class="t5">👑 จอมมารกลับชาติ</span><span class="t4">${alT(D.al)} · 👹 ${fmt(D.army)}</span>`)}if(X.rl)c.push(`<span>👑 ครองแคว้น ${Object.keys(RF).map(k=>RF[k][0]+X.rl.f[k]).join(' ')}</span>`);if(X.dr&&!X.dr.done)c.push(`<span>🐲 เตรียมล่ามังกร ${Object.keys(X.dr.p).length}/4</span>`);if(X.champ)c.push('<span>🏆 จ้าวแห่งทวีป</span>');if(c.length)h=h.replace('<div class="fhC">','<div class="fhC">'+c.join(''))}catch(e){}return h}}
window._fan8={X8,dkStart,DKEV,dkWave,evTour,tourRound,evRuleOffer,DEC,evCoup,evDragonWake,evDragonPrep,evDragonRaid,fanCard};


// ####################################################################
// ภาค 9: นิสัยผู้กล้า + หลงมิติ (ระบบเสริม)
// ####################################################################
// =================== 🎭 นิสัยผู้กล้า (เพื่อนร่วมห้องที่ถูกอัญเชิญ) ===================
const HTR=[['selfish','😤','เห็นแก่ตัว'],['kind','😇','คนดี'],['spoiled','👑','เอาแต่ใจ'],['coward','😨','ขี้ขลาด'],['power','🔥','บ้าอำนาจ'],['narc','🪞','หลงตัวเอง'],['hothead','💢','ใจร้อน'],['schemer','🦊','เจ้าเล่ห์'],['lazy','😪','ขี้เกียจ'],['naive','🥺','ซื่อจนน่าห่วง'],['fake','🎭','ดีแต่ต่อหน้า']];
const htr=k=>HTR.find(x=>x[0]===k)||HTR[1];
function heroTr(K){if(!isIso(K))return;try{const X=X2(K);if(!X.cls)clsInit(K);const rv=K.npc.rival,pl=K.npc.pal;if(rv&&!rv.tr)rv.tr=pick(['selfish','power','narc','schemer','hothead','fake','kind']);if(pl&&!pl.tr)pl.tr=pick(['kind','naive','coward','lazy','kind','spoiled']);
 for(const c of X.cls||[]){if(!c.tr)c.tr=c.id==='rival'?rv.tr:c.id==='pal'?pl.tr:pick(HTR)[0]}}catch(e){}}
const trOf=(K,id)=>htr((K.npc[id]&&K.npc[id].tr)||'kind');
const HTE={
 selfish:(K,c)=>C(`😤 ${E(c.n)}ทิ้งคุณไว้ในดันเจี้ยน`,`ตอนกับดักทำงาน ${E(c.n)} (${c.sk}) คว้าหีบสมบัติแล้ววิ่งหนีออกไปคนเดียว ปล่อยให้คุณสู้กับมอนสเตอร์ทั้งรัง`,[O('⚔️ ตามไปทวงคืน',()=>duel(c.n,Math.round(threat(K)*.95),w=>feed(w?`⚔️ ${E(c.n)}คืนสมบัติครึ่งหนึ่ง พร้อมคำขอโทษที่ฟังไม่จริงใจ`+money(R(150,300)):`⚔️ ${E(c.n)}เก่งกว่าที่คิด`+hurt(.2)))),O('📢 แฉต่อหน้าผู้กล้าทุกคน',()=>{c.bad=1;feed(`📢 ${E(c.n)}ถูกทุกคนมองแรง เขาจดชื่อคุณไว้ในใจ`+rep(4))}),O('🤷 ช่างมัน คนแบบนี้มีทุกโลก',()=>feed('🤷 คุณรอดออกมาได้ และเลิกคาดหวังอะไรจากเขา'+hurt(.1)))]),
 kind:(K,c)=>C(`😇 ${E(c.n)}แบ่งเสบียงมื้อสุดท้าย`,`ระหว่างเดินทัพ ${E(c.n)}เอาขนมปังชิ้นสุดท้ายให้เด็กในหมู่บ้านที่ถูกเผา ทั้งที่ตัวเองไม่ได้กินมาสองวัน`,[O('🍞 แบ่งของคุณให้เขา',()=>{c.aff=(c.aff|0)+20;S.karma=(+S.karma||0)+8;feed(`🍞 ${E(c.n)}ยิ้มกว้าง "นายก็เหมือนเดิมเลยนะ" · เขาจะจำเรื่องนี้`)}),O('🗣️ เตือนว่าโลกนี้ไม่ใจดีขนาดนั้น',()=>feed(`🗣️ ${E(c.n)}ตอบว่า "ถ้าเราไม่ใจดี ก็จะไม่มีใครใจดีเลย"`)),O('😑 ปล่อยเขาไป',()=>feed('😑 คืนนั้นเขาเป็นลม คุณแบกเขากลับค่าย'))]),
 spoiled:(K,c)=>C(`👑 ${E(c.n)}เรียกร้องวังส่วนตัว`,`${E(c.n)}ประกาศต่อหน้าราชาว่า "ถ้าไม่ได้วังส่วนตัว คนรับใช้สิบคน กับรถม้าสีชมพู ฉันจะไม่สู้!" ราชาหันมามองคุณเหมือนขอความช่วยเหลือ`,[O('🙄 พูดให้เขาสงบ (มินิเกม)',()=>mgRead(`ปลอบ${c.n}ที่กำลังงอแง`,c.n,sc=>feed(sc>=.55?`🙄 ${E(c.n)}ยอมลดเหลือรถม้าสีชมพูคันเดียว ราชาขอบคุณคุณ`+rep(5):`🙄 ${E(c.n)}ร้องไห้เสียงดังจนราชายอมทุกอย่าง`))),O('😂 หัวเราะใส่',()=>{c.bad=1;feed(`😂 ${E(c.n)}ไม่คุยกับคุณอีกสามปี`)}),O('💡 เสนอให้ราชาเอาไปแลกเป็นงานพิเศษ',()=>feed(`💡 ${E(c.n)}ได้วัง แต่ต้องล้างดันเจี้ยนสิบแห่งก่อน ทุกคนพอใจยกเว้นเขา`+money(100)))]),
 coward:(K,c)=>C(`😨 ${E(c.n)}หนีกลางศึก`,`ตอนมังกรเพลิงโผล่มา ${E(c.n)}ทิ้งตำแหน่งแล้ววิ่งหนี แนวป้องกันฝั่งซ้ายพังทันที`,[O('🛡️ อุดช่องแทน',()=>duel('มังกรเพลิงหนุ่ม',Math.round(threat(K)*1.05),w=>feed(w?'🛡️ คุณกันแนวไว้ได้จนจบศึก'+rep(8):'🛡️ แนวพัง แต่ทุกคนถอยทัน'+hurt(.3)))),O('🫂 ตามไปคุยกับเขาหลังศึก',()=>{c.aff=(c.aff|0)+15;feed(`🫂 ${E(c.n)}ร้องไห้ "ฉันแค่อยากกลับบ้าน" คุณนั่งอยู่ข้างเขาจนเช้า`)}),O('📜 รายงานราชา',()=>{c.st='lost';c.t='ถูกปลดจากผู้กล้าเพราะหนีทัพ';feed(`📜 ${E(c.n)}ถูกปลด และหายตัวไปจากวัง`+dark(5))})]),
 power:(K,c)=>C(`🔥 ${E(c.n)}ตั้งตัวเป็นหัวหน้า`,`${E(c.n)}ประกาศว่าผู้กล้าทุกคนต้องฟังคำสั่งเขา ใครไม่ฟังจะไม่ได้ส่วนแบ่ง ครึ่งห้องยอมตาม`,[O('✋ ไม่ยอม',()=>duel(c.n,Math.round(threat(K)*1.1),w=>{if(w){feed(`✋ ${E(c.n)}แพ้ต่อหน้าทุกคน อำนาจของเขาหายไปในวินาทีนั้น`+rep(8))}else{c.bad=1;feed(`✋ คุณแพ้ ${E(c.n)}ตัดส่วนแบ่งของคุณทั้งปี`+money(-150))}}),'ต่อสู้'),O('🤝 ยอมตามแต่แอบรวมพวก',()=>{K.f.coup=(K.f.coup|0);feed('🤝 คุณมีพวกครึ่งห้องในมือโดยที่เขาไม่รู้');c.bad=1}),O('🙂 ยอมรับ ขอแค่อย่ายุ่งกัน',()=>feed('🙂 เขาปล่อยคุณไว้ อย่างน้อยก็ตอนนี้'))]),
 narc:(K,c)=>C(`🪞 ${E(c.n)}จ้างกวีแต่งเพลงสรรเสริญตัวเอง`,`ทั้งเมืองได้ยินเพลง "${E(c.n)}ผู้งดงามกว่าดวงจันทร์" วันละสิบรอบ ในเพลงบอกว่าเขาล้มมังกรคนเดียว (จริงๆ คุณช่วย)`,[O('🎤 จ้างกวีแต่งเพลงความจริงแข่ง',()=>{money(-100);feed('🎤 เพลงของคุณติดหูกว่า ทั้งเมืองร้องตาม'+rep(10));c.bad=1}),O('😂 ปล่อย ขำดี',()=>feed('😂 คุณร้องเพลงของเขาตามไปด้วยทุกเช้า')),O('🪞 ชมเขาจนเคลิ้ม แล้วขอยืมของ',()=>feed(`🪞 ${E(c.n)}ยกดาบสำรองให้คุณยืมด้วยความยินดี`+lootDrop(K,2,c.n)))]),
 hothead:(K,c)=>C(`💢 ${E(c.n)}ต่อยขุนนางกลางงานเลี้ยง`,`ขุนนางพูดดูถูกคนจากต่างโลก ${E(c.n)}ต่อยเขาจนฟันหลุดสองซี่ ทหารกำลังจะจับเขา`,[O('🛡️ เข้าไปช่วยแก้ต่าง (มินิเกม)',()=>mgRead('แก้ต่างให้เพื่อนต่อหน้าราชา','ราชา',sc=>{if(sc>=.55){c.aff=(c.aff|0)+20;feed(`🛡️ ราชายกโทษให้ ${E(c.n)}ตบหลังคุณแรงจนไอ "นายนี่ใช้ได้!"`)}else feed(`🛡️ ${E(c.n)}ถูกขังสามวัน คุณถูกขังด้วยหนึ่งวัน`)})),O('👊 ต่อยขุนนางอีกคน',()=>{K.rep-=8;c.aff=(c.aff|0)+30;feed(`👊 ตอนนี้มีขุนนางฟันหลุดสองคน ${E(c.n)}หัวเราะจนน้ำตาไหลในคุก`)}),O('🚶 ทำเป็นไม่รู้จัก',()=>{c.bad=1;feed(`🚶 ${E(c.n)}มองคุณตอนถูกลากออกไป`)})]),
 schemer:(K,c)=>C(`🦊 ${E(c.n)}มีแผนลับ`,`${E(c.n)}กระซิบ "คลังหลวงมีสมบัติที่ราชาไม่บอกเรา คืนนี้ไปเอามาแบ่งกัน ห้าสิบห้าสิบ"`,[O('💰 ร่วมแผน',()=>{if(rnd()<.55){feed('💰 สำเร็จ แต่ส่วนแบ่งของคุณเบากว่าที่ตกลงไว้นิดหน่อย…'+money(R(300,700))+dark(6))}else{feed(`💰 ทหารจับได้ ${E(c.n)}หนีทัน คุณไม่ทัน`+hurt(.25)+rep(-10))}}),O('📜 เอาแผนไปบอกราชา',()=>{c.bad=1;feed(`📜 ราชาให้รางวัลคุณ ${E(c.n)}ยิ้มให้คุณในวันรุ่งขึ้นเหมือนไม่มีอะไรเกิดขึ้น ซึ่งน่ากลัวกว่า`+money(200))}),O('🙅 ปฏิเสธ',()=>feed('🙅 เขาไหวไหล่ "ตามใจ" แล้วไปชวนคนอื่น'))]),
 lazy:(K,c)=>C(`😪 ${E(c.n)}นอนกลางวันทุกวัน`,`ราชาจะลงโทษ${E(c.n)}เพราะไม่ไปฝึกมาสามเดือน เขาขอให้คุณช่วยแก้ตัวให้`,[O('🗣️ แก้ตัวให้',()=>{c.aff=(c.aff|0)+15;feed(`🗣️ คุณบอกราชาว่าเขากำลัง "ฝึกสมาธิขั้นสูง" ราชาเชื่อ ${E(c.n)}หลับต่อ`)}),O('💪 ลากไปฝึกด้วยกัน',()=>{c.aff=(c.aff|0)+5;K.pw+=capOf(K)*.04;feed(`💪 ${E(c.n)}บ่นทั้งวัน แต่กลับเก่งขึ้นจนตกใจ จริงๆ เขามีพรสวรรค์`)}),O('🤷 ไม่ยุ่ง',()=>feed(`🤷 ${E(c.n)}ถูกส่งไปเฝ้าป้อมชายแดน… และนอนต่อที่นั่น`))]),
 naive:(K,c)=>C(`🥺 ${E(c.n)}ถูกหลอก`,`${E(c.n)}เอาดาบศักดิ์สิทธิ์ไปแลกกับ "ถั่ววิเศษ" จากพ่อค้าเร่ ถั่วนั้นเป็นถั่วลิสงธรรมดา`,[O('🏃 ตามไปเอาดาบคืน',()=>duel('พ่อค้าเร่ที่จริงๆ เป็นโจร',Math.round(threat(K)*.85),w=>{if(w){c.aff=(c.aff|0)+25;feed(`🏃 ได้ดาบคืน ${E(c.n)}กอดคุณแน่นจนหายใจไม่ออก`)}else feed('🏃 โจรหนีไปได้'+hurt(.15))})),O('🌱 ลองปลูกถั่วดูก่อน',()=>{if(rnd()<.15)feed('🌱 …ถั่วโตเป็นต้นไม้ยักษ์จริงๆ! บนยอดมีหีบสมบัติ'+lootDrop(K,4,'ต้นถั่ว'));else feed('🌱 ได้ถั่วลิสงเต็มสวน อร่อยดี')}),O('📚 สอนเขาเรื่องโลกนี้',()=>{c.aff=(c.aff|0)+10;feed(`📚 ${E(c.n)}จดทุกคำ เขาโดนหลอกน้อยลงครึ่งหนึ่ง`)})]),
 fake:(K,c)=>C(`🎭 ${E(c.n)}สองหน้า`,`${E(c.n)}ยิ้มให้คุณทุกเช้า แต่คืนนี้คุณได้ยินเขาเล่าเรื่องเสียๆ หายๆ ของคุณให้ราชาฟัง`,[O('🗣️ เผชิญหน้าตรงๆ',()=>mgRead(`จับโกหก${c.n}`,c.n,sc=>{if(sc>=.55){feed(`🗣️ ${E(c.n)}จนมุม ยอมรับว่าอิจฉาคุณมาตั้งแต่อยู่โรงเรียน`);c.aff=(c.aff|0)+5}else{c.bad=1;feed(`🗣️ ${E(c.n)}ร้องไห้ต่อหน้าทุกคนว่าคุณใส่ร้าย ทุกคนเชื่อเขา`+rep(-6))}})),O('🎭 เล่นเกมเดียวกันกลับ',()=>{K.dark+=5;c.bad=1;feed('🎭 คุณยิ้มให้เขาทุกเช้าเหมือนกัน สงครามเย็นเริ่มขึ้น')}),O('🤐 เก็บไว้ในใจ',()=>feed('🤐 คุณเลิกเล่าเรื่องสำคัญให้เขาฟัง'))])};
function evHeroTr(K){heroTr(K);const X=X2(K),L=(X.cls||[]).filter(c=>c.st==='ok'&&c.tr&&!(X.trSeen||{})[c.n]);if(!L.length)return;const c=pick(L);X.trSeen=X.trSeen||{};X.trSeen[c.n]=1;(HTE[c.tr]||HTE.kind)(K,c)}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(K&&K.w==='lost'){K.f.sp=(RR&&RR.sp)||K.f.sp||pick(Object.keys(LSP))}if(K)heroTr(K)}catch(e){}},900)}}
{const _df=doFocus;doFocus=function(K){const f=S.focus;
 if(K.w==='lost'&&f==='fa_surv'){const P=lsp(K);heal(.25);K.pw+=K.pw<capOf(K)?(capOf(K)-K.pw)*.1:R(1,2);feed(`🏕️ เอาตัวรอด${P[1].replace(/^(กลาง|ใน|บน)/,'ใน')} ${pick(['สร้างที่พักใหม่','หาแหล่งน้ำลับ','ทำกับดักจับสัตว์','เรียนรู้พืชที่กินได้'])}${lsyn(K)?' · สกิลของคุณช่วยได้มาก':''}`);if(rnd()<.2)feed(lootDrop(K,R(0,2),'ป่า').replace(/^ · /,''));return}
 if(K.w==='lost'&&f==='fa_lsk'){const s=lsk(K);K.skx=(K.skx|0)+R(10,18);if(K.skx>=40+K.skL*15&&K.skL<8){K.skx=0;K.skL++;K.pw+=capOf(K)*.08;feed(`${s[1]} สกิล「${s[2]}」ระดับ ${K.skL} — ${pick(['ใช้ได้ไกลขึ้น','ใช้กับคนอื่นได้แล้ว','มีผลข้างเคียงแปลกๆ ที่มีประโยชน์','แรงขึ้นจนตัวเองตกใจ'])}`)}else feed(`${s[1]} ทดลองสกิล「${s[2]}」${pick(['กับก้อนหิน','กับนก','กับตัวเองตอนหลับ','กับอาหารเย็น'])} · ${K.skx}/${40+K.skL*15}`);return}
 if(K.w==='lost'&&f==='fa_help'){K.rep+=R(2,5);S.karma=(+S.karma||0)+3;feed(`🤝 ช่วย${pick(['ซ่อมหลังคา','ตามหาเด็กหาย','ไล่หมาป่า','เก็บเกี่ยว','รักษาคนป่วย'])}ให้คนในพื้นที่${money(R(10,40))}`);return}
 return _df(K)}}
{const _fy=fanYear;fanYear=function(){const K=FN();const a0=S.age;_fy.apply(this,arguments);if(!K||!S.alive||S.age===a0||K.end)return;try{if(isIso(K)&&(K.w!=='lost'||K.f.met)&&age()>=17&&QU.length<=1&&rnd()<.18){queue(()=>evHeroTr(K));if(!FL)flush()}}catch(e){console.error('p9 year',e)}}}
{const _fc=window.fanCls;window.fanCls=function(){const K=FN();try{heroTr(K)}catch(e){}_fc.apply(this,arguments);try{const X=X2(K),m=$('modal');m.querySelectorAll('.item').forEach((el,i)=>{const c=X.cls[i];if(c&&c.tr){const t=htr(c.tr),b=el.querySelector('b');if(b&&!el.querySelector('.htr'))b.insertAdjacentHTML('afterend',` <span class="tag2 htr">${t[1]} ${t[2]}</span>`)}})}catch(e){}}}
window._fan9={LSP,heroTr,evHeroTr,HTE,HTR,trOf};


// =================== 👶 วัยเด็ก (เวทมนตร์/อะคาเดมี่เริ่มทารก · ต่างโลกสุ่มอายุ 0-16) ===================
const KIDE=12;
const KFOK=[['fk_play','🧸','เล่นซน'],['fk_read','📖','หัดอ่านหนังสือ'],['fk_magic','✨','แอบฝึกพลัง'],['fk_help','🧺','ช่วยงานบ้าน']];
for(const w in FOK){for(const e of FOK[w]){const c=e[3];e[3]=K=>!K.kidP&&(!c||c(K))}for(const k of KFOK)FOK[w].push([k[0],k[1],k[2],K=>!!K.kidP])}
const KT={over:['🌋','พลังล้นทะลัก'],none:['🫥','ไม่มีพรสวรรค์'],norm:['🌱','พรสวรรค์ปกติ'],odd:['🌀','พรสวรรค์ประหลาด']};
const kidPar=K=>isIso(K)?'คนที่รับเลี้ยงคุณ':pick(['แม่','พ่อ','ยาย']);
const KEV=[
 [0,1,K=>C('👶 วันที่คุณเกิด',`ทันทีที่ลืมตาดูโลก ${pick(['ดาวตกผ่านหน้าต่างสามดวง','เทียนทุกเล่มในบ้านดับพร้อมกัน','แมวทุกตัวในหมู่บ้านร้องพร้อมกัน','หมอตำแยทำกรรไกรหล่นด้วยความตกใจ'])}`,[O('😭 ร้องไห้เสียงดังที่สุดในหมู่บ้าน',()=>{S.maxHp+=10;feed('😭 ทั้งหมู่บ้านตื่น พ่อบอกว่าเด็กคนนี้ปอดแข็งแรง')},'',.34),O('😊 ยิ้มให้ทุกคน',()=>{S.cha+=4;feed('😊 หมอตำแยบอกว่าไม่เคยเห็นเด็กแรกเกิดยิ้มแบบนี้')},'',.33),O('👁️ จ้องตาหมอตำแยนิ่งๆ',()=>{S.int+=4;feed('👁️ หมอตำแยขนลุก "เด็กคนนี้… รู้อะไรบางอย่าง"')},'',.33)])],
 [4,6,K=>{const r=rnd(),mana=(K.mpM|0);const t=r<.22+(mana>45?.15:0)?'over':r<.42?'none':r<.55?'odd':'norm';K.kidT=t;
  const T={over:'ลูกแก้ววัดพรสวรรค์ระเบิดเป็นผุยผงทันทีที่คุณแตะ หมอดูประจำหมู่บ้านล้มก้นจ้ำเบ้า',none:'ลูกแก้ววัดพรสวรรค์ไม่เรืองแม้แต่นิดเดียว หมอดูถอนหายใจแล้วบอกว่า "ไม่มีอะไรเลย"',odd:`ลูกแก้วเรืองเป็นสี${pick(['ที่ไม่มีชื่อเรียก','ดำปนทอง','ใสจนมองไม่เห็น'])} หมอดูไม่เคยเห็นแบบนี้มาก่อน`,norm:'ลูกแก้วเรืองแสงอ่อนๆ หมอดูพยักหน้า "เด็กธรรมดาที่มีอนาคต"'}[t];
  C(`🔮 พิธีวัดพรสวรรค์ตอนห้าขวบ — ${KT[t][0]} ${KT[t][1]}`,T,[O('🙂 รับรู้แล้วกลับบ้าน',()=>{if(t==='over'){K.pw+=10;K.mpM+=25}else if(t==='none'){K.grit=1}else if(t==='odd'){K.mpM+=10;if(K.clue<3)feed(clue(K,'พรสวรรค์ของคุณไม่อยู่ในตำราเล่มไหน'))}feed(`🔮 ${KT[t][0]} ${t==='none'?`${kidPar(K)}กอดคุณแน่น "ไม่เป็นไร ลูกยังมีอย่างอื่น"`:t==='over'?'ข่าวแพร่ไปถึงเมืองหลวงภายในสามวัน':'ทุกคนในหมู่บ้านพูดถึงคุณไปอีกหลายเดือน'}`)},'',.6),O(t==='none'?'😤 สาบานว่าจะเก่งกว่าทุกคน':'🤫 ขอให้หมอดูเก็บเป็นความลับ',()=>{if(t==='none'){K.grit=2;K.pw+=4;feed('😤 คุณวิ่งรอบหมู่บ้านสิบรอบทุกเช้าตั้งแต่วันนั้น')}else{K.kidHide=1;feed('🤫 หมอดูรับเงินค่าปิดปาก… เป็นขนมสามชิ้น')}},'',.4)])}],
 [6,10,K=>{const t=K.kidT||'norm';
  if(t==='over')return C('🔥 พลังคุมไม่อยู่','คุณจามทีเดียว หลังคาบ้านปลิวไปตกที่หมู่บ้านข้างๆ ชาวบ้านเริ่มกลัวคุณ',[O('🧘 หัดคุมพลัง (มินิเกม)',()=>mgHold('คุมพลังไม่ให้ระเบิด',sc=>{if(sc>=.55){K.pw+=8;feed('🧘 คุณคุมได้ ชาวบ้านเลิกกลัว แถมขอให้ช่วยไล่หมาป่า')}else{K.rep-=3;feed('🧘 บ่อน้ำกลางหมู่บ้านระเหยหมด…')}},[45,58])),O('😈 ใช้ขู่เด็กที่แกล้งคุณ',()=>feed('😈 ไม่มีเด็กคนไหนกล้าแกล้งคุณอีก และไม่มีใครกล้าเล่นด้วยเหมือนกัน'+dark(5)))]);
  if(t==='none')return C('😢 เด็กๆ ล้อว่าไร้พรสวรรค์',`เด็กกลุ่มหนึ่งร้องเพลงล้อ "ไร้พรสวรรค์ ไร้อนาคต" ทุกครั้งที่คุณเดินผ่าน`,[O('👊 สู้',()=>mgMash('สู้กับเด็กห้าคนพร้อมกัน',sc=>{if(sc>=.55){K.pw+=6;feed('👊 คุณชนะทั้งที่ไม่มีพรสวรรค์ เด็กพวกนั้นเงียบไปเลย')}else feed('👊 คุณแพ้ แต่ลุกขึ้นมาใหม่ทุกครั้ง เด็กพวกนั้นเลิกเพราะเหนื่อยเอง'+((K.grit=(K.grit|0)+1),''))},20)),O('🫂 ไปเล่นกับเด็กอีกคนที่ไม่มีใครเล่นด้วย',()=>{K.kidF=1;S.cha+=3;feed('🫂 เพื่อนคนแรกของคุณก็ไม่มีพรสวรรค์เหมือนกัน คุณสองคนสร้างฐานลับในโพรงไม้')}),O('📚 ไปห้องสมุดแทน',()=>{S.int+=6;feed('📚 คุณอ่านหนังสือหมดชั้นภายในหนึ่งปี')})]);
  if(t==='odd')return C('🌀 พรสวรรค์ประหลาดทำงาน',`คืนหนึ่งคุณเผลอ${pick(['ทำให้เงาของตัวเองลุกขึ้นเดิน','คุยกับดวงจันทร์ และดวงจันทร์ตอบ','หยุดเวลาได้สามวินาที'])}`,[O('🔍 ทดลองต่อ',()=>{K.mpM+=8;feed('🔍 คุณเริ่มเข้าใจว่ามันทำอะไรได้ แต่ยังไม่รู้ว่ามาจากไหน')}),O('😨 บอกผู้ใหญ่',()=>feed(`😨 ${kidPar(K)}พาคุณไปวิหาร นักบวชมองคุณนานผิดปกติ`))]);
  return C('🎈 เพื่อนสนิทคนแรก','เด็กบ้านข้างๆ ชวนคุณไปจับหิ่งห้อยริมลำธาร',[O('✨ ไปด้วย',()=>{K.kidF=1;S.cha+=3;heal(.3);feed('✨ คืนนั้นคุณจับหิ่งห้อยได้ร้อยตัว แล้วปล่อยไปหมดตอนกลับบ้าน')}),O('📖 อยู่บ้านอ่านหนังสือ',()=>{S.int+=3;feed('📖 คุณอ่านเรื่องมังกรจนหลับคาหนังสือ')})])}],
 [3,8,K=>C('🐾 สัตว์แปลกตามกลับบ้าน',`${pick(['ลูกหมาที่มีสามตา','ไข่ที่อุ่นตลอดเวลา','แมวที่ยิ้มได้'])}ตามคุณกลับบ้าน ${kidPar(K)}บอกว่าห้ามเลี้ยง`,[O('🙏 อ้อนขอเลี้ยง',()=>{const X=X3(K);if(!X.pet){X.pet=newPet(pick(Object.keys(PET)));X.pet.at=age();feed(`🙏 ได้เลี้ยง! คุณตั้งชื่อว่า <b>${E(X.pet.n)}</b>`);recalcE(K)}else feed('🙏 มันเป็นเพื่อนกับสัตว์ตัวเก่าของคุณทันที')}),O('🌲 แอบเลี้ยงในป่า',()=>{K.kidS=1;feed('🌲 ทุกเย็นคุณแอบเอาข้าวไปให้มัน… มันโตเร็วผิดปกติ')})])],
 [4,9,K=>C('🏚️ กระท่อมในป่า','คุณหลงป่า แล้วเจอกระท่อมที่หลังคาทำจากขนมปังขิง หญิงชราเปิดประตู "เข้ามาสิ หนูน้อย"',[O('🍪 เข้าไป',()=>{if(rnd()<.6){K.mpM+=10;feed('🍪 เธอเป็นแม่มดใจดีที่สอนเวทให้หนึ่งบท แล้วพาคุณกลับบ้าน')}else{feed('🍪 เธอพยายามจับคุณใส่หม้อ! คุณหนีออกมาทางปล่องไฟ'+hurt(.2));K.pw+=4}}),O('🏃 วิ่งหนี',()=>feed('🏃 คุณวิ่งจนเจอทางกลับบ้าน และเล่าเรื่องนี้ไปอีกสิบปี'))])],
 [5,10,K=>C('👻 เพื่อนในจินตนาการ','คุณมีเพื่อนในจินตนาการที่ไม่มีใครเห็น เขาเล่าเรื่องในอดีตของบ้านที่ไม่มีใครเคยเล่าให้ฟัง',[O('🗣️ ถามว่าเขาเป็นใคร',()=>{feed(`🗣️ "ฉันเคยอยู่บ้านนี้เมื่อร้อยปีก่อน"${K.clue<3&&rnd()<.4?clue(K,'วิญญาณในบ้านเกิดรู้ความลับของคุณ'):''}`)}),O('🧹 บอกให้ไปซะ',()=>feed('🧹 เขาหายไป… แต่ของในบ้านยังย้ายที่เองบางครั้ง'))])],
 [6,11,K=>C('🍬 ร้านขนมในตลาด','ขนมสีรุ้งในร้านดูอร่อยมาก แม่ค้ากำลังหันไปคุยกับลูกค้า',[O('🤏 แอบหยิบ',()=>{K.dark+=3;if(rnd()<.5)feed('🤏 สำเร็จ ขนมอร่อยแต่ใจคุณเต้นแรงทั้งคืน');else feed('🤏 แม่ค้าจับได้ ลากไปหาผู้ปกครอง ถูกตีก้นสิบที')}),O('🧺 ขอช่วยงานแลกขนม',()=>{S.karma=(+S.karma||0)+3;feed('🧺 แม่ค้าให้ขนมสามชิ้น และจ้างคุณทุกวันเสาร์')})])],
 [7,11,K=>{const id=K.npc.pal?'pal':K.npc.rival?'rival':null;C('🤝 สัญญาใต้ต้นไม้',`${id?N(K,id):'เด็กคนหนึ่ง'}กับคุณสลักชื่อลงต้นไม้ใหญ่ สัญญาว่าจะเป็นเพื่อนกันตลอดไป`,[O('🌳 สัญญา',()=>{if(id){aff(K,id,20);mem(K,id,'เพื่อนตั้งแต่เด็ก')}feed('🌳 รอยสลักนั้นจะยังอยู่แม้อีกหลายสิบปี')}),O('😅 เขินเกินไป',()=>feed('😅 คุณวิ่งหนี แต่แอบกลับมาสลักชื่อตัวเองตอนกลางคืน'))])}],
 [8,11,K=>C('🌧️ ปีที่ข้าวยากหมากแพง',`ปีนี้พืชผลเสียหายทั้งหมู่บ้าน ${kidPar(K)}แบ่งข้าวของตัวเองให้คุณทุกมื้อ`,[O('🧺 ออกไปหางานช่วยที่บ้าน',()=>{money(40);K.pw+=3;feed('🧺 คุณแบกฟืนขายจนมือพอง แต่บ้านไม่อดอีก')}),O('✨ ใช้พลังช่วย',()=>{if(K.kidT==='over'||K.kidT==='odd'){S.karma=(+S.karma||0)+8;feed('✨ ทุ่งนาทั้งหมู่บ้านกลับมาเขียวในคืนเดียว ชาวบ้านไม่รู้ว่าใครทำ')}else feed('✨ คุณพยายามจนเป็นลม… แต่ต้นข้าวต้นหนึ่งงอกขึ้นมาจริงๆ')})])],
 [9,11,K=>C('😤 คู่ปรับคนแรก',`เด็กตระกูลรวยคนหนึ่งดูถูก${K.kidT==='none'?'ว่าคุณไร้พรสวรรค์':'บ้านของคุณ'}ต่อหน้าทุกคน`,[O('⚔️ ท้าดวลไม้',()=>mgDuel('ดวลดาบไม้กับเด็กตระกูลรวย','เด็กตระกูลรวย',sc=>{if(sc>=.55){K.pw+=6;if(K.npc.rival)mem(K,'rival','เคยแพ้คุณตอนเด็ก');feed('⚔️ คุณชนะ เขาร้องไห้กลับบ้าน และจำหน้าคุณไปตลอดชีวิต')}else feed('⚔️ แพ้ แต่ได้รอยแผลที่ภูมิใจ')})),O('🙄 ไม่สนใจ',()=>feed('🙄 ความเงียบของคุณทำให้เขาโกรธยิ่งกว่า'))])],
 [10,11,K=>C(isAca(K)?'📨 จดหมายมาเร็วกว่ากำหนด':'🌟 ก่อนออกเดินทาง',isAca(K)?`นกฮูกส่งจดหมายจาก${WD[K.w].sc}มาถึงก่อนวัยเข้าเรียนหนึ่งปี${K.kidT==='over'?' — เขียนว่า "เราได้ยินเรื่องหลังคาปลิวแล้ว"':K.kidT==='none'?' — เขียนว่า "รับเข้าในโควตาพิเศษ"':''}`:'คุณโตพอจะเริ่มเส้นทางของตัวเองแล้ว',[O('🎒 เตรียมตัวเต็มที่',()=>{S.int+=4;K.pw+=4;feed('🎒 คุณอ่านตำราล่วงหน้าทั้งปี')}),O('🎈 ขอใช้ปีสุดท้ายเล่นให้สุด',()=>{S.cha+=4;heal(1);feed('🎈 ปีที่สนุกที่สุดในวัยเด็ก')})])],
 [0,2,K=>C('🍼 ผู้ใหญ่ในร่างทารก',`คุณจำได้ทุกอย่าง ทั้งชื่อ${K.earth&&K.earth.n?` "${E(K.earth.n)}"`:''} งาน และวันที่ตาย แต่ปากพูดได้แค่ "อ้อแอ้"`,[O('🗣️ พยายามพูดให้ได้',()=>{S.int+=3;feed(`🗣️ คำแรกที่หลุดออกมาคือ "${pick(['หิวข้าว','ไวไฟ','เบื่อ'])}" เป็นภาษาไทย พ่อแม่มองหน้ากันงงๆ`)},'',.34),O('📖 แอบดูผู้ใหญ่อ่านหนังสือ',()=>{S.int+=6;feed('📖 คุณอ่านภาษาโลกนี้ออกก่อนจะเดินได้')},'',.33),O('✨ ฝึกพลังในเปล',()=>{K.pw+=5;K.mpM+=8;feed('✨ คุณใช้สมาธิแบบผู้ใหญ่ฝึกพลังทุกคืน เปลสั่นจนแม่คิดว่าแผ่นดินไหว')},'',.33)]),K=>!!K.earth],
 [1,3,K=>C('🤫 ความลับที่ผู้ใหญ่คิดว่าเด็กไม่รู้เรื่อง',`${pick(['พ่อกับแม่','ยายกับนักบวช','คนรับใช้สองคน'])}คุยเรื่องสำคัญข้างเปลคุณ คิดว่าทารกฟังไม่เข้าใจ`,[O('👂 ฟังให้หมด',()=>{if(K.clue<3)feed(clue(K,pick(['ครอบครัวคุณมีความลับเรื่องสายเลือด','พ่อของคุณเคยเป็นผู้กล้า','มีคนตามหาเด็กที่เกิดคืนเดียวกับคุณ'])));else feed('👂 คุณได้ยินเรื่องที่ไม่ควรได้ยิน')},'',.6),O('😴 แกล้งหลับ',()=>feed('😴 คุณแกล้งหลับเก่งจนหลับจริง'),'',.4)]),K=>!!K.earth],
 [2,5,K=>C('🧮 อัจฉริยะวัยสามขวบ','คุณเผลอคิดเลขในใจให้แม่ค้าทอนเงินถูกต่อหน้าทุกคน คนทั้งตลาดตะลึง',[O('😇 ทำตัวเป็นเด็กธรรมดาต่อไป',()=>feed('😇 คุณแกล้งนับนิ้วผิดสามครั้ง ทุกคนโล่งใจ')),O('😎 โชว์ความรู้ชาติก่อน',()=>{S.int+=5;K.rep+=3;feed('😎 ข่าว "เด็กอัจฉริยะ" แพร่ไปถึงหมู่บ้านข้างๆ')})]),K=>!!K.earth]];
const KEVI=[
 [0,11,K=>C('🍼 เด็กจากต่างโลก',`ผู้ใหญ่ในวังไม่รู้จะทำอย่างไรกับผู้ถูกอัญเชิญที่อายุแค่ ${age()} ขวบ อัศวินชราคนหนึ่งอาสารับเลี้ยง`,[O('🛡️ ไปอยู่กับอัศวินชรา',()=>{K.kidG=1;K.pw+=5;feed('🛡️ เขาสอนให้ถือดาบไม้ก่อนจะเขียนหนังสือได้')}),O('🍳 ไปอยู่กับแม่ครัวในวัง',()=>{K.kidG=2;S.cha+=4;feed('🍳 คุณกินอิ่มทุกมื้อ และรู้ความลับทุกอย่างในวังจากห้องครัว')})])],
 [0,11,K=>C('😢 คิดถึงบ้าน','คืนนี้คุณฝันถึงบ้านในโลกเดิม ตื่นมาร้องไห้หาแม่',[O('🌙 ร้องไห้จนหลับ',()=>{K.home=(K.home|0)+10;feed('🌙 ทุกคืนคุณยังจำหน้าแม่ได้ชัดเจน')}),O('⭐ นับดาวแทน',()=>{K.home=Math.max(0,(K.home|0)-10);feed('⭐ ดวงดาวที่นี่ไม่เหมือนที่บ้าน แต่สวยกว่า')})])],
 [3,11,K=>C('✨ สกิลตื่นเร็วกว่าวัย','สกิลจากการอัญเชิญทำงานเองตอนคุณเล่นซ่อนแอบ ทำเอาผู้ใหญ่ทั้งวังแตกตื่น',[O('🙈 ซ่อน',()=>{K.f.hide=1;feed('🙈 คุณแกล้งร้องไห้ ทุกคนคิดว่าเป็นอุบัติเหตุ')}),O('😆 โชว์อีกรอบ',()=>{K.pw+=8;K.rep+=3;feed('😆 ราชาปรบมือ ผู้กล้าที่อายุน้อยที่สุดกลายเป็นขวัญใจวัง')})])]];
function kidYear(K){if(K.end&&K.endC){S.deathCause=K.endC;try{checkDeath()}catch(e){}if(!S.alive)return}try{if(auto)autoFocus()}catch(e){}if(!/^fk_/.test(S.focus||''))S.focus='fk_play';
 S.age++;S.mw.y++;K.yr++;K.mp=Math.min(K.mpM,K.mp+Math.round(K.mpM*.45));try{doFocus(K)}catch(e){console.error(e)}
 const P=isIso(K)?KEVI.concat(KEV.slice(3)):KEV;K.kidSn=K.kidSn||{};const L=P.map((e,i)=>[e,i]).filter(x=>!K.kidSn[(isIso(K)?'i':'a')+x[1]]&&age()>=x[0][0]&&age()<=x[0][1]&&(!x[0][3]||x[0][3](K)));
 const must=L.find(x=>x[0]===KEV[1]&&!isIso(K));const x=must||(L.length&&rnd()<.75?pick(L):null);if(x){K.kidSn[(isIso(K)?'i':'a')+x[1]]=1;queue(()=>x[0][2](K))}
 if(age()>=KIDE){K.kidP=0;K.arcAt=age()+1;S.focus=null;queue(()=>{say(`🎓 <b>วัยเด็กจบลงแล้ว</b> — ${isAca(K)?`ถึงเวลาเข้า${WD[K.w].sc}`:'เส้นทางของผู้ถูกอัญเชิญเริ่มต้นจริงๆ'} ${K.kidT?`· พรสวรรค์: ${KT[K.kidT][0]} ${KT[K.kidT][1]}`:''}`,'epic',true)})}
 sync();try{render()}catch(e){}checkDeath();saveGame();if(QU.length)flush()}
{const _fy=fanYear;fanYear=function(){const K=FN();if(K&&K.kidP&&S.alive&&age()<KIDE)return kidYear(K);return _fy.apply(this,arguments)}}
{const _df=doFocus;doFocus=function(K){const f=S.focus;if(K.kidP&&/^fk_/.test(f||'')){const T={fk_play:()=>{S.cha+=1;heal(.3);return`🧸 ${pick(['ปีนต้นไม้สูงที่สุดในหมู่บ้าน','เล่นซ่อนแอบจนเพื่อนหาไม่เจอทั้งวัน','สร้างปราสาทโคลนริมลำธาร','ไล่จับกบ'])}`},fk_read:()=>{S.int+=2;return`📖 หัดอ่าน${pick(['นิทานมังกร','ตำราเวทเล่มเล็ก','แผนที่ทวีป','จดหมายรักของพ่อแม่ที่ซ่อนไว้'])}`},fk_magic:()=>{K.pw+=K.kidT==='over'?4:K.kidT==='none'?2.5:2;K.mpM+=K.kidT==='none'?0:2;return`✨ แอบฝึก${K.kidT==='none'?'วิ่งและยกหินแทนเวท':'พลังหลังบ้าน'}${K.kidT==='over'&&rnd()<.3?' · เผลอเผารั้วไปครึ่งหนึ่ง':''}`},fk_help:()=>{money(R(3,10));S.karma=(+S.karma||0)+1;return`🧺 ช่วย${pick(['ตักน้ำ','เลี้ยงไก่','ขายผักในตลาด','ดูแลน้อง'])}`}};feed(T[f]()+(K.grit?` · ความมุ่งมั่น`:''));if(K.grit)K.pw+=1;return}return _df(K)}}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(!K)return;if(isAca(K)&&!K.kidInit){K.kidInit=1;S.age=0;K.kidP=1;S.focus='fk_play';feed('👶 คุณเกิดมาเป็นทารกในโลกนี้ เรื่องราวจะเริ่มตั้งแต่วันแรก')}else if(isIso(K)&&RR&&RR.age!=null&&!K.kidInit){K.kidInit=1;S.age=RR.age;if(RR.age<KIDE){K.kidP=1;S.focus='fk_play';feed(`🧒 คุณถูกอัญเชิญมาตอนอายุแค่ ${RR.age} ขวบ`)}else K.arcAt=age()+1}sync();render()}catch(e){console.error('kid',e)}},950)}}


// =================== 🐣 ระบบมอนสเตอร์ ===================
SKY.mon=['#10241a','#2c5a3a','#9ad07a'];FCOL.mon='#9be36a';
const isMon=K=>K&&K.w==='mon';
const MEV=[
 K=>C('⚔️ ศึกแย่งอาณาเขต',`${pick(MSP)[1]}ตัวใหญ่บุกเข้ามาในอาณาเขตของคุณ`,[O('⚔️ สู้',()=>duel('ผู้บุกรุก',Math.round(threat(K)),w=>{if(w){monXp(K,50);if(rnd()<.4)monSk(K);feed('⚔️ คุณชนะ และได้กลืนกินผู้แพ้')}else feed('⚔️ คุณเสียอาณาเขตไปครึ่งหนึ่ง'+hurt(.3))}),'ต่อสู้',.6),O('🍃 ถอยไปหาที่ใหม่',()=>feed('🍃 คุณย้ายรังไปที่ที่ปลอดภัยกว่า'),'',.4)]),
 K=>C('🍎 ผลไม้เรืองแสง','ต้นไม้ประหลาดออกผลเรืองแสงเพียงลูกเดียว ใครกินจะได้พลังหรือไม่ก็ตาย',[O('😋 กิน',()=>{if(rnd()<.75){monSk(K);monXp(K,40)}else feed('😵 ท้องเสียสามเดือน'+hurt(.4))},'',.6),O('🙅 ไม่เสี่ยง',()=>feed('🙅 เช้ามานกกินไปแล้ว นกตัวนั้นบินขึ้นฟ้าแล้วไม่กลับมาอีก'),'',.4)]),
 K=>C('🏕️ มนุษย์ตั้งค่ายตัดไม้','มนุษย์กลุ่มหนึ่งเริ่มตัดต้นไม้ใกล้รังของคุณ',[O('😱 ขู่ให้หนี',()=>{feed('😱 พวกเขาหนีไป และกลับมาพร้อมนักผจญภัยสามคน');monXp(K,20)}),O('👀 แอบดู',()=>{S.int+=3;feed('👀 คุณเรียนรู้ภาษามนุษย์ได้นิดหน่อย');if(rnd()<.3&&!MS2(K).sk.includes('พูดภาษามนุษย์')){MS2(K).sk.push('พูดภาษามนุษย์');feed('⬜ [ระบบ] ได้รับสกิล: 🗣️ พูดภาษามนุษย์')}}),O('🤝 ช่วยลากซุงให้',()=>{K.f.talk=1;feed('🤝 คนตัดไม้ตกใจ แล้วเริ่มทิ้งขนมปังไว้ให้ทุกวัน')})]),
 K=>C('⛓️ ถูกจับไปตลาดมืด','คุณตื่นมาในกรงเหล็ก พ่อค้ามอนสเตอร์กำลังประกาศขาย "มอนสเตอร์หายาก ราคาพิเศษ!"',[O('🔓 แหกกรง (มินิเกม)',()=>mgMash('แหกกรงเหล็ก',sc=>{if(sc>=.55){monXp(K,50);feed('🔓 คุณพังกรงแล้วปล่อยมอนสเตอร์ทุกตัวในตลาด')}else feed('🔓 ไม่สำเร็จ แต่มีเด็กคนหนึ่งแอบมาเปิดกรงให้ตอนกลางคืน')},22)),O('😾 ทำตัวน่ารักให้คนซื้อ',()=>{feed('😾 นักเวทแก่ใจดีซื้อคุณไป แล้วปล่อยกลับป่า');monXp(K,15)})]),
 K=>C('💧 น้ำพุวิญญาณ','คุณพบน้ำพุที่เรืองแสงสีฟ้าในถ้ำลึก',[O('🛁 ลงแช่',()=>{heal(1);K.mpM+=15;feed('🛁 พลังวิญญาณซึมเข้าร่าง')}),O('🍵 ดื่ม',()=>{monXp(K,60);feed('🍵 คุณรู้สึกเหมือนจะวิวัฒนาการเร็วขึ้น')})]),
 K=>C('🥚 ไข่ที่ถูกทิ้ง',`คุณเจอไข่ของ${pick(MSP)[1]}ที่แม่ทิ้งไว้`,[O('🫶 เลี้ยงเป็นลูก',()=>{K.f.nat=(K.f.nat|0)+1;feed('🫶 ลูกน้อยตามคุณไปทุกที่ มันเรียกคุณว่า "แม่" ในภาษามอนสเตอร์')}),O('🍳 กิน',()=>{monSk(K);K.dark+=5})]),
 K=>C('❄️ ฤดูหนาวยาวนาน','หิมะตกไม่หยุดสามเดือน อาหารหายาก',[O('🛌 จำศีล',()=>{heal(1);feed('🛌 คุณหลับยาวและตื่นมาตัวใหญ่ขึ้น');monXp(K,30)}),O('🍖 ล่าต่อไป',()=>{monXp(K,50);feed('🍖 คุณรอดมาได้ด้วยความหิว'+hurt(.2))})]),
 K=>C('💞 มอนสเตอร์อีกตัว',`${pick(MSP)[1]}ตัวหนึ่งตามคุณมาหลายวัน มันดูเหงาเหมือนกัน`,[O('🤝 ให้อยู่ด้วยกัน',()=>{K.f.mate=1;heal(.5);feed('🤝 คุณไม่ต้องอยู่คนเดียวอีกแล้ว')}),O('🌲 ไล่ไป',()=>feed('🌲 มันมองคุณครั้งสุดท้ายแล้วจากไป'))]),
 K=>C('🗡️ ผู้กล้าที่ถูกอัญเชิญผ่านมา','กลุ่มผู้กล้าจากต่างโลกเดินผ่านป่า หนึ่งในนั้นใส่ชุดนักเรียนไทย… คุณจำโรงเรียนนั้นได้',[O('👀 ตามดูห่างๆ',()=>{if(K.clue<3)feed(clue(K,'ผู้ถูกอัญเชิญมาจากโลกเดียวกับคุณ'));feed('👀 พวกเขาบ่นเรื่องข้าวเหนียวมะม่วง คุณคิดถึงบ้าน')}),O('⚔️ ทดสอบฝีมือ',()=>duel('ผู้กล้าต่างโลก',Math.round(threat(K)*1.1),w=>feed(w?'⚔️ ผู้กล้าหนีไปพร้อมเรื่องเล่ามอนสเตอร์ที่แข็งแกร่งที่สุดในป่า'+((monXp(K,90)),''):'⚔️ ผู้กล้าแข็งแกร่งเกินไป'+hurt(.35))),'ต่อสู้')]),
 K=>C('🐲 รังมังกรร้าง','คุณพบรังมังกรที่ว่างเปล่า มีกองทองและเกล็ดมังกรเก่า',[O('💰 เก็บสมบัติ',()=>feed(money(R(200,600))+lootDrop(K,3,'รังมังกร'))),O('🐉 กินเกล็ดมังกร',()=>{monSk(K);monXp(K,70);feed('🐉 เลือดมังกรเล็กน้อยไหลในตัวคุณแล้ว')})])];
{const _rc=recalcE;recalcE=function(K){const o=_rc(K);try{if(isMon(K))for(const n of MS2(K).sk){const s=MSKL.find(x=>x[1]===n);if(s)fxAdd(o,s[2])}}catch(e){}return o}}
{const _r=randEv;randEv=function(K){if(isMon(K))return pick(MEV)(K);return _r.apply(this,arguments)}}
{const _g=genEv;genEv=function(K,rg){if(isMon(K))return pick(MEV)(K);return _g.apply(this,arguments)}}
{const _o=evClass;evClass=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evRecruit;evRecruit=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evParty;evParty=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evBase;evBase=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evLove2;evLove2=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evTour;evTour=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evRuleOffer;evRuleOffer=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evHeir;evHeir=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evEgg;evEgg=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evPet;evPet=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evDragonWake;evDragonWake=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}{const _o=evLegacy;evLegacy=function(K){if(isMon(K))return;return _o.apply(this,arguments)}}
{const _l=evLove;evLove=function(K){if(isMon(K))return;return _l.apply(this,arguments)}}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const K=FN();if(!isMon(K)||K.msInit)return;K.msInit=1;const m=MS2(K);m.sp=window._monForce!=null?window._monForce:R(0,MSP.length-1);K.sysw={on:0};K.dlord=0;S.age=0;K.arcAt=1;S.focus='fm_hunt';
 bkAdd('var','mon:'+m.sp);say(`🐣 <b>คุณเกิดใหม่เป็น${msp(K)[1]}</b> ${msp(K)[0]} ใน${msp(K)[4]}<br><span class="tag2">⬜ หน้าต่างระบบเปิดใช้งาน · กินเพื่อเรียนสกิล · เลเวล 10 และ 25 วิวัฒนาการ</span>`,'myth',true);recalcE(K);sync();render()}catch(e){console.error('mon birth',e)}},1000)}}
{const _df=doFocus;doFocus=function(K){const f=S.focus;if(isMon(K)&&/^fm_/.test(f||'')){const m=MS2(K);
 if(f==='fm_hunt'){if(fight(threat(K)*.9)){monXp(K,R(40,70));feed(`🍖 ล่า${pick(['กระต่ายเขาเดียว','ฝูงค้างคาว','ก็อบลินหลงฝูง','ปลาเวท'])}สำเร็จ · LV ${m.lv}`)}else feed('🍖 เหยื่อหนีไปได้'+hurt(.15));return}
 if(f==='fm_eat'){if(rnd()<.35)monSk(K);else feed(`🌀 กลืนกิน${pick(['หินเรืองแสง','สมุนไพรพิษ','ซากมอนสเตอร์','ใบไม้วิเศษ'])} ยังไม่ได้สกิลใหม่`);monXp(K,10);return}
 if(f==='fm_hide'){heal(.4);feed('🍃 ซ่อนตัวเอาตัวรอดอย่างปลอดภัย');return}
 if(f==='fm_exp'){monXp(K,30);if(rnd()<.3)feed(lootDrop(K,R(0,2),'ป่า').replace(/^ · /,''));else feed(`🗺️ สำรวจพบ${pick(['ถ้ำลับ','ทะเลสาบใต้ดิน','ซากเมืองโบราณ','รังมอนสเตอร์ร้าง'])}`);return}
 if(f==='fm_train'){K.pw+=K.pw<capOf(K)?(capOf(K)-K.pw)*.12:R(1,3);monXp(K,15);feed(`💪 ฝึกสกิล${m.sk.length?'「'+pick(m.sk)+'」':'พื้นฐาน'}`);return}}return _df(K)}}
window.fanMonSys=function(){const K=FN();if(!isMon(K))return;const m=MS2(K),s=msp(K);modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>⬜ หน้าต่างสถานะ</h3><div class="item" style="border-color:#7bd"><b style="font-size:16px">${mName(K)}</b>${m.name?` <span class="tag2">ชื่อ: ${E(m.name)}</span>`:''}<div class="tag2">LV ${m.lv} · XP ${m.xp}/${30+m.lv*15} · ขั้นวิวัฒนาการ ${m.st+1}/3${m.path?' · สาย '+m.path:''}</div><div class="tag2">ถิ่นเกิด: ${s[4]} · วิวัฒนาการ: ${s[1]} → ${s[2]} → ${s[3]}</div></div><h4 style="margin:8px 0 4px">สกิลที่กลืนกินมา ${m.sk.length}/${MSKL.length}</h4>${m.sk.map(n=>{const x=MSKL.find(y=>y[1]===n);return x?`<div class="item">${x[0]} <b>${x[1]}</b> <span class="tag2">${fxT(x[2])}</span></div>`:''}).join('')||'<div class="tag2">ยังไม่มี — ใช้โฟกัส 🌀 กลืนกิน</div>'}`,'fanmon')};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const K=FN();if(on()&&isMon(K)){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-fa11]')){const b=document.createElement('button');b.className='opt';b.setAttribute('data-fa11',1);b.style.gridColumn='1/-1';b.innerHTML='⬜ หน้าต่างสถานะ<small>เลเวล · สกิล · วิวัฒนาการ</small>';b.onclick=()=>fanMonSys();d.prepend(b)}}}catch(e){}return r}}
{const _hd=hud;hud=function(K){let h=_hd(K);try{if(isMon(K)){const m=MS2(K);h=h.replace('<div class="fhC">',`<div class="fhC"><span class="t5">${mName(K)}${m.name?' "'+E(m.name)+'"':''}</span><span style="border-color:#7bd;color:#bdf">⬜ LV ${m.lv} · สกิล ${m.sk.length}</span>`)}}catch(e){}return h}}
window._fan11={MSP,MSKL,MS2,monXp,monSk,monEvo,MEV};


// =================== 👘 ตู้เสื้อผ้าแฟนตาซี 300 ชุด ===================
const FAR=[['knight','🛡️','อัศวิน',{plate:'A',cape:'R',hat:'helm',hatC:'A'}],['mage','🔮','จอมเวท',{coat:'R',coatL:'T',staff:'T',wx:3,hat:'scholar',hatC:'R'}],['priest','✨','นักบวช',{sash:'T',wx:1,hat:'halo'}],['rogue','🗡️','นักฆ่าเงา',{hat:'hood',hoodC:'R',coat:'B',maskC:'#1a1a1a'}],['ranger','🏹','พรานธนู',{hat:'hood',hoodC:'B',cape:'A',belt:'T'}],['paladin','⚜️','พาลาดิน',{plate:'T',cape:'R',hat:'halo'}],['necro','💀','จอมเวทมรณะ',{hat:'hood',hoodC:'#141018',coat:'R',staff:'#e8e8e0',aura:'#7a3aff'}],['bard','🎻','กวีพเนจร',{hat:'cap',hatC:'R',coat:'R',ribbon:'T'}],['druid','🌿','ดรูอิด',{hat:'flower',sash:'T',staff:'#6a8a3a'}],['witch','🧹','แม่มด',{hat:'tophat',hatC:'#1a1420',skirt:'R',ribbon:'T',fs:1}],['alch','⚗️','นักเล่นแร่แปรธาตุ',{coat:'A',coatL:'T',hat:'band',bandC:'T'}],['noble','🎩','ขุนนาง',{coat:'R',coatL:'T',hat:'tophat',hatC:'B',jade:1,wx:5}],['princess','👑','เจ้าหญิง',{hat:'crown',skirt:'R',sash:'T',ribbon:'T',fs:1}],['maid','🧺','สาวใช้',{robe:'#1e1e24',trim:'#f4f4f4',skirt:'#1e1e24',ribbon:'R',fs:1}],['butler','🤵','พ่อบ้าน',{coat:'#1a1a22',coatL:'#f0f0f0',emblem:'T'}],['pirate','🏴‍☠️','โจรสลัด',{hat:'band',bandC:'R',coat:'B',sash:'R'}],['elf','🧝','เอลฟ์พิทักษ์ป่า',{hat:'ears',cape:'R',belt:'T'}],['dknight','🖤','อัศวินทมิฬ',{plate:'#1a1a22',cape:'R',hat:'horn',r:1}],['saint','🕊️','นักบุญ',{hat:'halo',wing:'feather',wingC:'#f8f8ff',r:1}],['dlord','😈','จอมมาร',{hat:'horn',cape:'R',coat:'#1a1014',aura:'T',r:2}],['drgk','🐉','อัศวินมังกร',{plate:'R',wing:'energy',wingC:'A',hat:'helm',hatC:'R',r:2}],['valk','🪽','วาลคิรี',{plate:'T',wing:'feather',wingC:'A',hat:'helm',hatC:'T',r:1}],['shaman','🪶','หมอผีเผ่า',{hat:'phoenix',fur:'A',sash:'R'}],['merch','💰','พ่อค้าเร่',{hat:'straw',coat:'R',belt:'T',basket:1}],['scholar','📜','นักปราชญ์',{hat:'scholar',hatC:'B',wx:2}],['glad','🏟️','นักสู้สนาม',{plate:'A',sash:'R',hat:'visor'}],['monk','🙏','นักพรต',{hat:'bald',sash:'T',wx:4}],['tamer','🐾','ผู้ฝึกสัตว์',{fur:'R',hat:'ears'}],['spellb','⚔️','นักดาบเวท',{coat:'R',plate:'T',cape:'B'}],['star','🌌','จอมเวทดวงดาว',{cape:'R',capeT:'T',hat:'halo',aura:'T',wing:'energy',wingC:'T',r:2}]];
const FPL=[['ชาดเลือด','#a8202a','#f0c040','#5a1014','#3a1418',0],['ฟ้าคราม','#2a5aa8','#e8eef8','#1a2a5a','#c8d8f0',0],['มรกต','#2a7a4a','#e8d890','#1a3a22','#a8d8b0',0],['นิลกาฬ','#1a1a22','#c8183a','#0a0a0e','#5a5a6a',1],['งาช้าง','#eeeae0','#c8a040','#8a7a5a','#d8d0c0',0],['ทองคำ','#d8a830','#fff2b0','#7a5a10','#f8e080',2],['ม่วงราตรี','#5a3a8a','#e0c8ff','#2a1a4a','#b090e0',1],['น้ำแข็ง','#a8d8f0','#ffffff','#5a8ab0','#e8f8ff',1],['เพลิงกัลป์','#e0602a','#ffd040','#7a2a10','#ff9a4a',2],['กุหลาบ','#e07aa0','#fff0f6','#8a3a5a','#ffc0d8',0]];
const FOUT=[];FAR.forEach((a,ai)=>FPL.forEach((p,pi)=>{const tok=v=>v==='R'?p[1]:v==='T'?p[2]:v==='B'?p[3]:v==='A'?p[4]:v;const o={robe:p[1],trim:p[2],belt:p[3]};for(const k in a[3])if(!['r','fs'].includes(k))o[k]=tok(a[3][k]);FOUT.push({id:ai*10+pi,ic:a[1],n:`${a[2]} · ${p[0]}`,o,fs:a[3].fs?1:0,rar:Math.min(3,p[5]+(a[3].r|0))})}));
const RARN=['ธรรมดา','หายาก','มหากาพย์','ตำนาน'],RARC=['#9aa0a6','#2d7dd2','#8e44ad','#e67e22'];
const wdG=()=>{try{let w=LS.get('murim_fanwd',null);if(!w){w={own:{}};shuf(FOUT.filter(x=>x.rar===0)).slice(0,6).forEach(x=>w.own[x.id]=1);LS.set('murim_fanwd',w)}return w}catch(e){return{own:{}}}};
function wdGive(src,rmax){const W=wdG(),L=FOUT.filter(x=>!W.own[x.id]&&x.rar<=(rmax==null?3:rmax));if(!L.length)return'';const wt=L.map(x=>[.55,.28,.13,.04][x.rar]),tot=wt.reduce((a,b)=>a+b,0);let r=rnd()*tot,o=L[0];for(let i=0;i<L.length;i++){r-=wt[i];if(r<0){o=L[i];break}}W.own[o.id]=1;try{LS.set('murim_fanwd',W)}catch(e){}if(o.rar>=2)fxBig('confetti',1.2);
 return ` · 👘 <b style="color:${RARC[o.rar]}">ได้ชุดใหม่: ${o.ic} ${o.n}</b> (${RARN[o.rar]})${src?' จาก'+src:''}`}
{const _ml=meLook;meLook=function(){const o=_ml.apply(this,arguments);try{if(on()){const K=FN();if(K&&K.fit!=null&&!isMon(K)){const f=FOUT[K.fit];if(f){Object.assign(o,f.o);o._fst=f.st||'tunic';if(o.wing&&S.age<14)o.wing=null;if(f.fs&&S.gender!=='หญิง'){o.skirt=null;o.noSkirt=1}if(o.hat==='bald'&&S.gender==='หญิง')o.hat=null}}}}catch(e){}return o}}
{const _ld=lootDrop;lootDrop=function(K,t,src){let r=_ld.apply(this,arguments);try{if(!isMon(K)&&rnd()<(t>=4?.35:t>=2?.12:.06))r+=wdGive(src,t>=4?3:t>=2?2:1)}catch(e){}return r}}
{const _er=endRec;endRec=function(K,k){let first=false;try{const L=LS.get('murim_fanend',{})||{};first=!L[K.w+':'+k]}catch(e){}const r=_er.apply(this,arguments);try{if(first&&!isMon(K))setTimeout(()=>{try{const t=wdGive('ฉากจบใหม่',3);if(t)say('🎬'+t,'epic')}catch(e){}},1500)}catch(e){}return r}}
let WDP=0,WDF='own';
window.fanWd=function(pg,flt){const K=FN();if(!K)return;if(pg!=null)WDP=pg;if(flt)WDF=flt,WDP=pg||0;const W=wdG(),own=Object.keys(W.own).length;const L=WDF==='own'?FOUT.filter(x=>W.own[x.id]):FOUT;const per=12,np=Math.max(1,Math.ceil(L.length/per));WDP=Math.min(WDP,np-1);const sl=L.slice(WDP*per,WDP*per+per);
 const X=X8(K);if(X.tailor!==age()){X.tailor=age();X.tl=shuf(FOUT.filter(x=>!W.own[x.id])).slice(0,3).map(x=>x.id)}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>👘 ตู้เสื้อผ้าแฟนตาซี</h3><div class="tag2">สะสม ${own}/${FOUT.length} ชุด · เก็บไว้ทุกชีวิต · ได้จากของดรอป บอส ฉากจบใหม่ และร้านตัดชุด</div>
 <div style="display:flex;gap:6px;margin:6px 0"><button class="opt" style="flex:1;${WDF==='own'?'border-color:#ffd54a':''}" onclick="fanWd(0,'own')">ที่มี (${own})</button><button class="opt" style="flex:1;${WDF==='all'?'border-color:#ffd54a':''}" onclick="fanWd(0,'all')">ทั้งหมด</button>${K.fit!=null?`<button class="opt" style="flex:1" onclick="fanWdSet(-1)">ถอดชุด</button>`:''}</div>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${sl.map(x=>{const ok=W.own[x.id];return`<button class="opt" style="padding:4px;${K.fit===x.id?'border-color:#ffd54a;':''}${ok?'':'opacity:.5'}" ${ok?`onclick="fanWdSet(${x.id})"`:''}><canvas class="wdC" data-i="${x.id}" data-ok="${ok?1:0}" width="72" height="96" style="width:100%;image-rendering:pixelated"></canvas><small style="color:${RARC[x.rar]}">${ok?x.ic+' '+x.n:'❔ ???'}</small></button>`}).join('')}</div>
 <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><button class="opt" ${WDP<=0?'disabled':''} onclick="fanWd(${WDP-1})">◀</button><span class="tag2">หน้า ${WDP+1}/${np}</span><button class="opt" ${WDP>=np-1?'disabled':''} onclick="fanWd(${WDP+1})">▶</button></div>
 <h4 style="margin:10px 0 4px">✂️ ร้านตัดชุดปีนี้</h4>${(X.tl||[]).map(id=>{const x=FOUT[id],pr=[300,700,1500,4000][x.rar];return W.own[id]?`<div class="item tag2">✅ ${x.ic} ${x.n} (ซื้อแล้ว)</div>`:`<div class="item"><b style="color:${RARC[x.rar]}">${x.ic} ${x.n}</b> <span class="tag2">${RARN[x.rar]}</span><button class="pbtn" style="float:right;padding:2px 10px" ${(S.money||0)<pr?'disabled':''} onclick="fanWdBuy(${id},${pr})">🪙 ${fmt(pr)}</button></div>`}).join('')}`,'fanwd');
 setTimeout(()=>{document.querySelectorAll('.wdC').forEach(cv=>{const i=+cv.dataset.i,c=cv.getContext('2d'),sg=g,sp=PS;g=c;PS=3;c.imageSmoothingEnabled=false;c.fillStyle='#ece6f4';c.fillRect(0,0,72,96);try{const kf=K.fit;K.fit=i;const me=meLook();K.fit=kf;if(cv.dataset.ok!=='1'){for(const k of ['robe','trim','belt','coat','coatL','cape','plate','skirt','hoodC','hatC','fur','sash'])if(me[k])me[k]='#3a3444';me.aura=null;me.wing=null}me.aura=null;c.setTransform(3,0,0,3,0,0);person(8,31,me,'stand')}catch(e){}finally{g=sg;PS=sp}})},30)};
window.fanWdSet=id=>{const K=FN();if(!K)return;K.fit=id<0?null:id;closeM();if(id>=0)toast('เปลี่ยนชุดเป็น '+FOUT[id].n);render();saveGame()};
window.fanWdBuy=(id,pr)=>{if((S.money||0)<pr)return;S.money-=pr;const W=wdG();W.own[id]=1;try{LS.set('murim_fanwd',W)}catch(e){}toast('ได้ชุด '+FOUT[id].n);render();fanWd()};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const K=FN();if(on()&&K&&!isMon(K)){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-fa12]')){const b=document.createElement('button');b.className='opt';b.setAttribute('data-fa12',1);b.innerHTML=`👘 ตู้เสื้อผ้า<small>${Object.keys(wdG().own).length}/${FOUT.length} ชุด</small>`;b.onclick=()=>fanWd(0);d.appendChild(b)}}}catch(e){}return r}}
window._fan12={FOUT,wdG,wdGive};
// =================== 👘 ตัววาดชุดแฟนตาซี (ทับทรงชุดยุทธ) ===================
const FSTY={knight:'plate',paladin:'plate',dknight:'plate',drgk:'plate',valk:'plate',glad:'plate',spellb:'plate',mage:'robe',priest:'robe',necro:'robe',druid:'robe',scholar:'robe',monk:'robe',shaman:'robe',star:'robe',saint:'robe',alch:'coat',princess:'gown',witch:'gown',maid:'gown',noble:'coat',butler:'coat',dlord:'coat',bard:'tunic',ranger:'tunic',elf:'tunic',merch:'tunic',tamer:'tunic',pirate:'coat',rogue:'leather'};
FOUT.forEach(f=>{f.st=FSTY[FAR[Math.floor(f.id/10)][0]]||'tunic'});
function fanGarb(x,y,o,pose){if(pose==='lie')return;const X=Math.round(x*3),Y=Math.round(y*3),child=o.age<12,T=frame*.15,sd=(o.seed||((o.robe||'').length*7+(o.hair||'').length))%10;
 const H=child?33:48,hh=child?11:12,tw=child?11:16,th=child?11:18,walk=pose==='walk',sit=pose==='sit';
 const bob=walk?(child?(Math.sin(T*8)>0?-1:0):(Math.abs(Math.sin(T*3.2))>.7?-1:0)):Math.round(Math.sin(T*1.6+sd)*.6);
 const stn=(pose==='stand'&&!child&&!sit)?o.stance:null;const top=Y-H+(sit?9:0)+(o.old?2:0)+bob,cx=X+12,ty=top+hh+1,ly=ty+th;
 const R=o.robe||'#888',Rd=shd(R,-.28),Rl=shd(R,.22),Tc=o.trim||shd(R,.4),Td=shd(Tc,-.3),B=o.belt&&o.belt!==R?o.belt:'#5a3a22',Bt='#4a2e1c',skin=o.skin||'#f0c8a0',fem=o.g==='หญิง';
 let st=o._fst;if(child)st='tunic';if(st==='gown'&&!fem)st='coat';
 const L=cx-Math.floor(tw/2)+1,IW=tw-2,bY=ty+(child?6:9);
 const fillT=(c,cd)=>{for(let r=0;r<th;r++){Q(L,ty+r,IW,1,c);Q(L+IW-2,ty+r,2,1,cd)}};
 const as=walk?0:Math.round(Math.sin(T*1.6+sd)*.5);
 const legs=(c,cuff)=>{if(sit)return;let a=0,b=0,ox1=0,ox2=0;if(walk&&!child){const s1=Math.sin(T*3.2);a=s1>.25?Math.round(s1*3):0;b=s1<-.25?Math.round(-s1*3):0}else if(walk){const sw=Math.round(Math.sin(T*8)*2);ox1=sw;ox2=-sw}else if(stn==='ready'){ox1=-2;ox2=2}
  const bh=child?4:6;Q(cx-6+ox1,Y-bh-a,6,bh,c);Q(cx+1+ox2,Y-bh-b,6,bh,shd(c,-.15));if(cuff){Q(cx-6+ox1,Y-bh-a,6,1,cuff);Q(cx+1+ox2,Y-bh-b,6,1,shd(cuff,-.15))}Q(cx-6+ox1,Y-1-a,6,1,shd(c,-.35));Q(cx+1+ox2,Y-1-b,6,1,shd(c,-.4))};
 if(st==='plate'){const P=o.plate||'#b8c0cc',PD=shd(P,-.3),PL=shd(P,.3);fillT(R,Rd);
  Q(L,ty,IW,9,P);Q(L,ty,IW,1,PL);Q(cx,ty+1,1,7,PL);Q(cx-1,ty+1,1,7,PD);Q(L+IW-2,ty+1,2,8,PD);Q(L+1,ty+9,IW-2,2,PD);Q(L+1,ty+11,IW-2,2,P);Q(L+1,ty+12,IW-2,1,PD);
  if(!child&&!walk){Q(cx-12,ty-1+as,6,4,P);Q(cx-12,ty-1+as,6,1,PL);Q(cx+7,ty-1-as,6,4,PD);Q(cx+7,ty-1-as,6,1,P)}
  Q(L-1,ty+13,IW+2,2,B);Q(cx-1,ty+13,2,2,'#e8c860');Q(cx-2,ty+15,4,Math.max(2,ly-ty-13),R);Q(cx-2,ty+15,1,Math.max(2,ly-ty-13),Rl);if(o.emblem||o.trim)Q(cx-1,ty+16,2,2,o.emblem||Tc);
  if(!sit){Q(cx-7,ly-1,5,5,P);Q(cx-7,ly-1,5,1,PL);Q(cx+2,ly-1,5,5,PD)}legs(P,PL)}
 else if(st==='robe'){fillT(R,Rd);Q(cx-1,ty,2,th,Tc);Q(cx-4,ty,8,2,Tc);Q(cx-3,ty,6,1,shd(Tc,.3));Q(L,bY,IW,1,B);Q(cx+2,bY+1,1,3,B);Q(cx+2,bY+4,2,1,Tc);
  if(!sit){const bot=Y-1;for(let yy=ly-1;yy<bot;yy++){const k=(yy-ly)/(bot-ly),w=IW+2+Math.round(k*4),lx=cx-Math.floor(w/2);Q(lx,yy,w,1,R);Q(lx+w-3,yy,3,1,Rd);Q(lx,yy,1,1,Rl)}const wb=IW+6;Q(cx-Math.floor(wb/2),bot-2,wb,2,Tc);Q(cx-1,ly-1,2,bot-ly-1,Tc);Q(cx-4,bot,3,1,'#2a1e18');Q(cx+1,bot,3,1,'#2a1e18')}
  if(!walk&&!child&&!stn){Q(cx-12,ty+8+as,6,5,R);Q(cx-12,ty+12+as,6,1,Tc);Q(cx+7,ty+8-as,6,5,Rd);Q(cx+7,ty+12-as,6,1,Td);Q(cx-10,ty+13+as,3,2,skin);Q(cx+8,ty+13-as,3,2,shd(skin,-.15))}}
 else if(st==='gown'){fillT(R,Rd);Q(cx-4,ty,8,2,skin);Q(cx-5,ty+2,10,1,Tc);for(let i=0;i<4;i++){Q(cx-1,ty+3+i*2,1,1,Tc);Q(cx,ty+4+i*2,1,1,Tc)}
  if(!child&&!walk){Q(cx-12,ty,5,4,Rl);Q(cx-12,ty+3,5,1,Tc);Q(cx+8,ty,5,4,R);Q(cx+8,ty+3,5,1,Td)}Q(L,bY,IW,1,Tc);
  if(!sit){const s0=bY+1,s1=Y-1,ws=walk?Math.sin(T*3.2):Math.sin(T*2+sd)*.5;for(let yy=s0;yy<=s1;yy++){const k=(yy-s0)/Math.max(1,s1-s0),w=Math.round(IW+k*12),off=Math.round(ws*1.4*k),lx=cx-Math.floor(w/2)+off;Q(lx,yy,w,1,R);Q(lx+w-3,yy,3,1,Rd);Q(lx,yy,1,1,Rl);if(yy>s0+2&&yy%3===0){Q(lx+Math.floor(w*.33),yy,1,1,Rd);Q(lx+Math.floor(w*.66),yy,1,1,Rd)}}
   const wb=IW+12,lxb=cx-Math.floor(wb/2)+Math.round(ws*1.4);Q(lxb,s1-2,wb,2,Tc);for(let i=0;i<wb;i+=2)Q(lxb+i,s1,1,1,shd(Tc,.25));Q(lxb,s1+1,wb,1,'#00000022')}}
 else if(st==='coat'){const C=o.coat||R,CD=shd(C,-.3),CL=o.coatL||shd(C,.3),sh=o.coat?R:'#f0ece4';fillT(sh,shd(sh,-.15));Q(cx-1,ty+1,2,4,'#f4f4f4');Q(cx-2,ty+1,4,1,'#ffffff');
  for(let r=0;r<th;r++){const wl=Math.floor(IW/2)-2;Q(L,ty+r,wl,1,C);Q(L+IW-wl,ty+r,wl,1,CD);Q(L+wl-1,ty+r,1,1,CL);Q(L+IW-wl,ty+r,1,1,CL)}Q(L-1,ty,IW+2,2,C);Q(L-1,ty,IW+2,1,CL);
  for(let i=0;i<4;i++){Q(cx-4,ty+4+i*3,1,1,'#e8c860');Q(cx+3,ty+4+i*3,1,1,'#e8c860')}Q(L,bY,IW,1,B);
  if(!sit){const tl=child?4:9;Q(L-1,ly-1,6,tl,C);Q(L-1,ly-1,1,tl,CL);Q(L+IW-5,ly-1,6,tl,CD);Q(L+IW,ly-1,1,tl,CL)}
  if(!walk&&!child&&!stn){Q(cx-12,ty+1+as,5,11,C);Q(cx-12,ty+11+as,5,1,CL);Q(cx+7,ty+1-as,5,11,CD);Q(cx+7,ty+11-as,5,1,CL)}legs('#2a1e18','#5a3a22')}
 else if(st==='leather'){const Lc=shd(R,-.35),LD=shd(Lc,-.25);fillT(Lc,LD);for(let i=0;i<IW;i++){Q(L+i,ty+1+Math.round(i*th/IW*.7),1,1,B);Q(L+IW-1-i,ty+1+Math.round(i*th/IW*.7),1,1,shd(B,-.2))}Q(cx-1,ty+6,2,2,'#c8c8d0');Q(L-1,bY+2,IW+2,2,B);Q(cx-6,bY+4,3,3,shd(B,.15));Q(cx+3,bY+4,3,3,shd(B,.15));Q(cx+4,bY+3,1,5,'#c8ccd6');if(!sit){Q(L,ly-1,IW,3,Lc)}legs(Bt,shd(Bt,.3))}
 else{fillT(R,Rd);Q(cx-2,ty,4,1,skin);Q(cx-1,ty+1,2,1,skin);Q(cx-3,ty,1,2,Tc);Q(cx+2,ty,1,2,Tc);for(let i=0;i<3;i++){Q(cx-1,ty+2+i*2,1,1,Tc);Q(cx,ty+3+i*2,1,1,Tc)}Q(L-1,bY,IW+2,2,B);Q(cx-1,bY,2,2,'#e8c860');Q(cx+3,bY+2,2,3,shd(B,.2));
  if(!sit){Q(L-1,ly-1,IW+2,child?2:4,R);Q(L-1,ly-1+(child?1:3),IW+2,1,Tc);Q(L+IW-1,ly-1,2,child?2:4,Rd)}legs(Bt,shd(Bt,.35))}}
{const _p0=person0;person0=function(x,y,o,pose){if(!o||!o._fst)return _p0.apply(this,arguments);const o2=Object.assign({},o,{trim:null,sash:null,wx:0,coat:null,coatL:null,plate:null,noSkirt:1,stripe:0,patch:0,jade:0,emblem:null,fur:null,belt:o.robe,ribbon:null});const r=_p0.call(this,x,y,o2,pose);try{fanGarb(x,y,o,pose)}catch(e){}return r}}



// =================== 🐣 ออกแบบหน้าตา / สร้างเอง (ก่อนหน้าสุ่มกำเนิด) ===================
let FDS=null;
function fdsPaint(){try{const cv=document.getElementById('fdsCv');if(!cv)return;const c=cv.getContext('2d'),sg=g,sp=PS;g=c;PS=3;c.imageSmoothingEnabled=false;c.fillStyle='#1e1830';c.fillRect(0,0,96,120);c.setTransform(3,0,0,3,0,0);try{person(12,38,{robe:FDS.top==='magic'?'#3a2a7a':FDS.top==='noble'?'#5a3a6a':'#2a4a7a',trim:'#ffd37a',belt:'#00000055',hs:FDS.g==='หญิง'?3:4,mood:'happy',seed:FDS.seed,age:16,g:FDS.g,skin:FDS.skin,hair:FDS.hair},'stand')}finally{g=sg;PS=sp;c.setTransform(1,0,0,1,0,0)}}catch(e){}}
window.fanDesign=function(w){FDS=FDS&&FDS.top===w?FDS:{top:w,g:rnd()<.5?'ชาย':'หญิง',hair:pick(HAIR),skin:pick(SKIN),seed:R(1,99999),name:''};
 const sw=(L,k)=>L.map(c=>`<button onclick="fanDs('${k}','${c}')" style="width:30px;height:30px;border-radius:50%;background:${c};border:${FDS[k]===c?'3px solid #ffd54a':'2px solid #fff3'};margin:2px"></button>`).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🎨 ออกแบบหน้าตา</h3><div style="display:flex;gap:10px;align-items:center"><canvas id="fdsCv" width="96" height="120" style="border-radius:10px;image-rendering:pixelated;width:96px"></canvas><div style="flex:1"><div class="tag2">ชื่อ (เว้นว่าง = สุ่ม)</div><input id="fdsNm" maxlength="24" value="${E(FDS.name)}" oninput="fanDs('name',this.value,1)" style="width:100%;padding:6px;border-radius:8px;border:1px solid #fff3;background:#0006;color:#fff"><div style="display:flex;gap:6px;margin-top:6px"><button class="opt" style="flex:1;${FDS.g==='ชาย'?'border-color:#ffd54a':''}" onclick="fanDs('g','ชาย')">♂️ ชาย</button><button class="opt" style="flex:1;${FDS.g==='หญิง'?'border-color:#ffd54a':''}" onclick="fanDs('g','หญิง')">♀️ หญิง</button></div></div></div>
 <div class="tag2" style="margin-top:8px">สีผม</div><div>${sw(HAIR,'hair')}</div><div class="tag2" style="margin-top:6px">สีผิว</div><div>${sw(SKIN,'skin')}</div>
 <button class="opt" style="margin-top:6px" onclick="fanDs('seed',${R(1,99999)})">🔀 สุ่มทรงหน้าใหม่</button>
 <button class="pbtn" style="width:100%;margin-top:8px" onclick="fanDsGo()">ไปหน้าสุ่มกำเนิด ▶</button>`,'fands');setTimeout(fdsPaint,30)};
window.fanDs=(k,v,quiet)=>{if(!FDS)return;FDS[k]=k==='seed'?+v:v;if(quiet)return;fanDesign(FDS.top)};
window.fanDsGo=()=>{const D=FDS;if(!D)return;try{const i=document.getElementById('fdsNm');if(i)D.name=i.value.trim()}catch(e){}window._fanLk={g:D.g,hair:D.hair,skin:D.skin,seed:D.seed,name:D.name};closeM();window.fanStart(D.top)};
let FCS=null;
window.fanCustom=function(w){FCS=FCS&&FCS.top===w?FCS:{top:w,w:w==='iso'?'hero':w,age:16,sp:'forest',v:'',rules:[]};const C=FCS;
 const chip=(on,lbl,js)=>`<button class="opt" style="display:inline-block;width:auto;margin:0;padding:6px 10px;${on?'border-color:#ffd54a;background:#ffd54a22':''}" onclick="${js}">${lbl}</button>`;
 const VL=w==='magic'?Object.keys(MV).map(k=>[k,MV[k].ic+' '+MV[k].n]):Object.keys(MVX).filter(k=>MVXW[MVX[k].w].includes(C.w)).map(k=>[k,MVX[k].ic+' '+MVX[k].n]);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>✍️ สร้างชีวิตเอง</h3><div class="tag2" style="color:#ff8a7a">⚠️ ชีวิตที่สร้างเองจะไม่ปลดความสำเร็จ และไม่นับชะตาประจำวัน</div>
 ${w==='iso'?`<h4 style="margin:8px 0 4px">โลกย่อย</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${[['hero','🛡️ ผู้กล้า'],['trash','🗑️ สกิลขยะ'],['lost','🌲 หลงมิติ']].map(x=>chip(C.w===x[0],x[1],`fanCs('w','${x[0]}')`)).join('')}</div>
 ${C.w==='lost'?`<h4 style="margin:8px 0 4px">จุดที่ลืมตา</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${Object.keys(LSP).map(k=>chip(C.sp===k,LSP[k][0]+' '+LSP[k][1].slice(0,14),`fanCs('sp','${k}')`)).join('')}</div>`:''}
 <h4 style="margin:8px 0 4px">อายุตอนถูกอัญเชิญ: <b>${C.age}</b> ปี</h4><input type="range" min="0" max="16" value="${C.age}" style="width:100%" oninput="fanCs('age',+this.value)">`:''}
 <h4 style="margin:8px 0 4px">ชะตาพิเศษ</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${chip(!C.v,'🎲 สุ่ม',"fanCs('v','')")}${chip(C.v==='none','➖ ไม่มี',"fanCs('v','none')")}${VL.map(x=>chip(C.v===x[0],x[1],`fanCs('v','${x[0]}')`)).join('')}</div>
 <h4 style="margin:8px 0 4px">กฎแปลกของโลก (เลือกได้ 2) · ${C.rules.length?C.rules.length+' ข้อ':'สุ่ม'}</h4><div style="display:flex;flex-wrap:wrap;gap:6px">${Object.keys(RULE).map(k=>chip(C.rules.includes(k),RULE[k][0]+' '+RULE[k][1],`fanCs('r','${k}')`)).join('')}</div>
 <button class="pbtn" style="width:100%;margin-top:10px" onclick="fanCsGo()">ไปหน้าสุ่มกำเนิด ▶</button>`,'fancs')};
window.fanCs=(k,v)=>{const C=FCS;if(!C)return;if(k==='r'){const i=C.rules.indexOf(v);if(i>=0)C.rules.splice(i,1);else{C.rules.push(v);if(C.rules.length>2)C.rules.shift()}}else{C[k]=v;if(k==='w')C.v=''}if(k==='age'){const h=document.querySelector('#modal h4 b');if(h){h.textContent=v;return}}fanCustom(C.top)};
window.fanCsGo=()=>{const C=FCS;if(!C)return;window._fanLk=null;window._fanCs=JSON.parse(JSON.stringify(C));closeM();window.fanStart(C.top)};
{const _fr=fbRoll;fbRoll=function(first){const r=_fr.apply(this,arguments);try{const L=window._fanLk,C=window._fanCs;
 if(L){FB.g=L.g;FB.hair=L.hair;FB.skin=L.skin;FB.seed=L.seed;if(L.name){FB.name=L.name;FB.edited=1}}
 if(C&&FB.top===C.top){if(C.top==='iso'){FB.w=C.w;FB.sp=C.w==='lost'?C.sp:null;FB.age=C.age;FB.sk=pick(SK[FB.w])[0]}FB.cust=1}
 if((L||C)&&first)fbDraw()}catch(e){console.error(e)}return r}}
{const _fg=window.fanGo;window.fanGo=function(){const L=window._fanLk,C=window._fanCs;window._fanLk=null;if(C){window._fanCs=null;window._fanCsP=C;if(C.v){window._mvForce=C.v==='none'?'__none':C.v;setTimeout(()=>{window._mvForce=null},6000)}}return _fg.apply(this,arguments)}}
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);setTimeout(()=>{try{const C=window._fanCsP,K=FN();if(!C||!K)return;window._fanCsP=null;K.cust=1;if(C.rules&&C.rules.length){const X=X7(K);X.rules=C.rules.slice();recalcE(K);feed('🌍 กฎของโลกตามที่คุณเลือก: '+X.rules.map(r=>RULE[r][0]+' '+RULE[r][1]).join(' · '))}feed('✍️ ชีวิตนี้สร้างเอง · ไม่ปลดความสำเร็จ');render()}catch(e){console.error(e)}},2300)}}
{const _ac=achCheck;achCheck=function(K){if(K&&K.cust)return;return _ac.apply(this,arguments)}}


// =================== 🖼️ ฉาก pixel เคลื่อนไหวของโลกแฟนตาซี (อิงเหตุการณ์) ===================
//   ภาพนิ่งวาดลงบัฟเฟอร์ 480×168 ครั้งเดียวแล้วแคช (ใช้เครื่องมือของ BLOCK 100) · ส่วนที่ขยับวาดทุกเฟรม · ชั้น pixelfx อากาศ + เอฟเฟกต์เป็นระยะ
const FSS=window._skyScene||null;
const FSC={};
const fMix=(a,b,t)=>FSS.mixC(a,b,t);
function fCastle(B,x,by,w,h,c,roof,win,R){const cl=fMix(c,'#ffffff',.18),cd=fMix(c,'#000000',.3);B.rect(x,by-h,w,h,c);B.rect(x,by-h,2,h,cl);B.rect(x+w-2,by-h,2,h,cd);
 if(roof)B.poly([[x-3,by-h],[x+w/2,by-h-w*1.1],[x+w+3,by-h]],roof);else for(let i=0;i<w;i+=6)B.rect(x+i,by-h-4,3,4,c);
 if(win)for(let yy=by-h+8;yy<by-6;yy+=12)for(let xx=x+4;xx<x+w-4;xx+=8)if(!R||R()<.75){B.rect(xx,yy,3,5,win);B.glow(xx+1,yy+2,6,win,.18)}}
function fPine(B,x,by,h,c){for(let k=0;k<3;k++){const y=by-h+k*h*.28,w=h*(.28+k*.12);B.poly([[x,y],[x+w,y+h*.4],[x-w,y+h*.4]],k%2?c:fMix(c,'#000000',.15))}B.rect(x-2,by-h*.12,4,h*.12,'#2a1a10')}
function fOak(B,x,by,r,c){B.rect(x-3,by-r*1.4,6,r*1.4,'#3a2414');B.disc(x,by-r*1.6,r,fMix(c,'#000000',.2));B.disc(x-r*.4,by-r*1.8,r*.75,c);B.disc(x+r*.35,by-r*1.75,r*.6,fMix(c,'#ffffff',.12))}
function fFloor(B,y,a,b,step){B.vg(y,168,[a,b]);for(let yy=y+4;yy<168;yy+=step||8)B.rect(0,yy,480,1,fMix(b,'#000000',.25),.6)}
function fChecker(B,y,a,b){for(let yy=y,r=0;yy<168;yy+=6+r,r++)for(let xx=0;xx<480;xx+=14)B.rect(xx+((r%2)*7),yy,7,6+r,((xx/14+r)%2)?a:b)}
function fBricks(B,y0,y1,c){B.vg(y0,y1,[fMix(c,'#ffffff',.08),fMix(c,'#000000',.25)]);for(let y=y0,r=0;y<y1;y+=8,r++){B.rect(0,y,480,1,fMix(c,'#000000',.45));for(let x=(r%2)*12;x<480;x+=24)B.rect(x,y,1,8,fMix(c,'#000000',.45))}}
function fArchWin(B,x,y,w,h,cols){B.rect(x-2,y-2,w+4,h+4,'#1a1420');B.disc(x+w/2,y+2,w/2+2,'#1a1420');const n=cols.length;for(let i=0;i<w;i+=4)for(let j=0;j<h;j+=5)B.rect(x+i,y+j,3,4,cols[(i/4+j/5|0)%n]);{const cx=x+w/2,cy=y+2,r=w/2;for(let a=0;a<6;a++){const A0=Math.PI+a*Math.PI/6,A1=A0+Math.PI/6;B.poly([[cx,cy],[cx+Math.cos(A0)*r,cy+Math.sin(A0)*r],[cx+Math.cos(A1)*r,cy+Math.sin(A1)*r]],cols[a%n])}for(let a=0;a<=6;a++)B.line(cx,cy,cx+Math.cos(a*Math.PI/6+Math.PI)*r,cy+Math.sin(a*Math.PI/6+Math.PI)*r,'#1a1420');B.disc(cx,cy,r*.22,'#1a1420');B.disc(cx,cy,r*.15,cols[2%n])}B.glow(x+w/2,y+h/2,w*1.4,cols[1]||cols[0],.18)}
function fPillar(B,x,y0,y1,c){B.rect(x,y0,12,y1-y0,c);B.rect(x,y0,3,y1-y0,fMix(c,'#ffffff',.25));B.rect(x+9,y0,3,y1-y0,fMix(c,'#000000',.3));B.rect(x-3,y0,18,5,fMix(c,'#ffffff',.15));B.rect(x-3,y1-5,18,5,fMix(c,'#000000',.15))}
function fCrowd(B,R,y0,y1,cols){for(let y=y0;y<y1;y+=5)for(let x=(y%10)?3:0;x<480;x+=6){const c=cols[Math.floor(R()*cols.length)];B.rect(x,y,4,4,c);B.rect(x+1,y-2,2,2,'#e8c8a8')}}
function fRing(B,cx,cy,r,col,k){for(let a=0;a<360;a+=2){const A=a*Math.PI/180;B.rect(cx+Math.cos(A)*r,cy+Math.sin(A)*r*.3,2,1,col,k)}}
function fCloud(B,R,x,y,s,c){for(let k=0;k<5;k++)B.disc(x+k*s*.7-s*1.4,y+R()*s*.3,s*(.5+R()*.4),c)}
const FP={
 m_base(B,R){B.vg(0,168,['#070620','#14104a','#2e2070','#5a3a9a']);B.stars(R,260,120,['#ffffff','#c8b8ff','#9ad8ff']);B.ball(392,34,18,['#6a6aa8','#b8b8e8','#f4f0ff']);B.glow(392,34,60,'#b8a8ff',.22);
  for(let i=0;i<3;i++)B.glow(80+i*160,40+i*10,90,['#7a4aff','#3ab0ff','#ff6ad8'][i],.07);
  const isl=(x,y,w,c)=>{B.poly([[x,y],[x+w,y],[x+w*.8,y+w*.25],[x+w*.55,y+w*.5],[x+w*.35,y+w*.32],[x+w*.15,y+w*.22]],fMix(c,'#000000',.3));B.rect(x,y-3,w,4,'#3a6a4a');B.rect(x,y-3,w,1,'#6aa070')};
  isl(150,100,190,'#4a3a5a');fCastle(B,190,98,22,56,'#3a3268','#5a3a9a','#ffd37a',R);fCastle(B,222,98,34,40,'#423a74',null,'#ffd37a',R);fCastle(B,262,98,18,66,'#3a3268','#6a4aaa','#9ad8ff',R);fCastle(B,286,98,24,34,'#423a74','#5a3a9a','#ffd37a',R);
  isl(40,70,60,'#4a3a5a');fCastle(B,58,68,14,26,'#3a3268','#5a3a9a','#9ad8ff',R);isl(380,84,70,'#4a3a5a');fCastle(B,404,82,16,22,'#3a3268','#6a4aaa','#ffd37a',R);
  for(let i=0;i<14;i++)fCloud(B,R,R()*480,148+R()*16,12+R()*8,i%2?'#3a2a6a':'#4a3a80');B.vg(158,168,['#2a1e5a','#1a1240'])},
 n_base(B,R){B.vg(0,110,['#2a1a4a','#7a3a6a','#e07a5a','#ffc070']);B.ball(120,70,16,['#ff9a4a','#ffd070','#fff4c0']);B.glow(120,70,80,'#ffb060',.28);
  B.ridge(R,96,12,'#6a3a5a',1.2);fCastle(B,250,108,30,62,'#e8d8c8','#3a4a8a','#ffcf70',R);fCastle(B,284,108,60,40,'#f0e4d4',null,'#ffcf70',R);fCastle(B,348,108,26,70,'#e8d8c8','#3a4a8a','#ffcf70',R);fCastle(B,224,108,22,46,'#e0d0c0','#3a4a8a','#ffcf70',R);
  for(const x of [262,362])B.rect(x,32,1,10,'#3a2a1a');B.vg(106,168,['#4a7a3a','#2e5a2a','#1e3e1e']);B.poly([[300,168],[330,108],[338,108],[380,168]],'#d8c8a8');
  for(let i=0;i<9;i++){const x=i*56+R()*10;B.rect(x,128,40,10,'#2a5a2a');B.rect(x,128,40,2,'#4a8a3a');if(R()<.6)for(let k=0;k<4;k++)B.rect(x+4+R()*32,129+R()*6,2,2,['#ff8ab0','#ffd0e0','#fff'][k%3])}
  B.disc(420,150,16,'#c8c0b8');B.disc(420,148,12,'#5ab0d0');B.rect(418,128,4,20,'#d8d0c8')},
 h_base(B,R){B.vg(0,110,['#3a6ab0','#6aa0d8','#b8d8f0','#f0e8c8']);for(let i=0;i<5;i++)fCloud(B,R,R()*480,15+R()*40,14,'#f4f8ff');
  fCastle(B,200,112,26,70,'#e8e0d0','#c83a3a','#ffd37a',R);fCastle(B,230,112,70,48,'#f0e8dc',null,'#ffd37a',R);fCastle(B,304,112,26,70,'#e8e0d0','#c83a3a','#ffd37a',R);B.ball(265,60,16,['#a07a1a','#e0b040','#fff0a0']);B.rect(263,36,4,10,'#e0b040');
  B.vg(108,124,['#c8b898','#a89878']);for(let x=0;x<480;x+=10)B.rect(x,104,6,6,'#c8b898');for(let i=0;i<8;i++){const x=20+i*60;B.rect(x,90,6,20,'#8a2a2a');B.poly([[x+6,90],[x+18,94],[x+6,98]],'#c83a3a')}
  fFloor(B,124,'#b8a888','#8a7a62',6);for(let i=0;i<70;i++)B.rect(R()*480,128+R()*38,6,2,'#9a8a6e')},
 t_base(B,R){B.vg(0,110,['#1a1a24','#2e2a36','#4a4048','#6a5a50']);B.rect(0,40,170,100,'#3a3438');for(let y=44;y<140;y+=8)B.rect(0,y,170,1,'#2a2428');for(let x=0;x<170;x+=8)B.rect(x,36,4,4,'#3a3438');B.rect(168,40,4,100,'#5a5058');
  for(let i=0;i<9;i++){const x=180+i*34+R()*6,h=22+R()*14;B.rect(x,138-h,30,h,['#4a3a2e','#3a3028','#52402e'][i%3]);B.poly([[x-3,138-h],[x+15,130-h-R()*6],[x+33,138-h]],'#2a2420');if(R()<.6){B.rect(x+10,130-h*.5,5,6,'#ff9a4a',.8);B.glow(x+12,128-h*.5,10,'#ff9a4a',.25)}}
  fFloor(B,138,'#3a3028','#1e1814',5);for(let i=0;i<10;i++){const x=R()*480;B.disc(x,150+R()*12,6+R()*6,['#4a4238','#3a3a2e','#5a4a3a'][i%3])}},
 forest(B,R){B.vg(0,168,['#0c2a1e','#1a4a2e','#2e6a3a','#4a8a44']);for(let i=0;i<5;i++){const x=60+i*100;for(let y=0;y<140;y++)B.rect(x+y*.35,y,14-y*.06,1,'#e8ffc0',.05)}
  for(let i=0;i<26;i++)fPine(B,R()*480,120,40+R()*30,'#163a24');for(let i=0;i<14;i++)fPine(B,R()*480,138,50+R()*40,'#0e2a18');
  B.vg(132,168,['#2a5a2a','#1a3a1a']);for(let i=0;i<90;i++)B.rect(R()*480,134+R()*30,1,3,'#5aa04a');for(let i=0;i<6;i++){const x=R()*480;B.rect(x,150,2,5,'#e8d8c0');B.disc(x+1,149,4,i%2?'#c83a3a':'#e8a03a');B.rect(x,147,1,1,'#fff')}},
 desert(B,R){B.vg(0,100,['#3a6ad0','#7ab0e8','#f0d8a0','#ffe8b0']);B.ball(380,36,16,['#ffd070','#fff0a0','#ffffff']);B.glow(380,36,90,'#ffe0a0',.3);
  for(let k=0;k<3;k++){let y=96+k*14;B.ridge(R,y+12,14,['#d8a868','#c89050','#b07a40'][k],.9)}for(let i=0;i<4;i++){const x=40+i*120+R()*40;B.rect(x,100,8,26,'#c8a878');B.rect(x-2,98,12,4,'#d8b888')}
  for(let i=0;i<3;i++){const x=R()*480;B.rect(x,124,4,18,'#3a7a3a');B.rect(x-5,128,5,3,'#3a7a3a');B.rect(x-5,122,2,7,'#3a7a3a');B.rect(x+4,130,4,3,'#3a7a3a');B.rect(x+7,125,2,8,'#3a7a3a')}},
 village(B,R){B.vg(0,100,['#5a9ad8','#9ac8f0','#e0f0f8']);for(let i=0;i<4;i++)fCloud(B,R,R()*480,20+R()*30,13,'#ffffff');B.ridge(R,92,14,'#5a8a4a',1);
  for(let y=96;y<168;y+=6)B.rect(0,y,480,6,(y/6)%2?'#8ab04a':'#a0c050');for(let i=0;i<5;i++){const x=150+i*62+R()*10,h=20;B.rect(x,124-h,36,h,'#e8d8b8');B.poly([[x-5,124-h],[x+18,124-h-18],[x+41,124-h]],'#b8883a');B.rect(x+14,112,8,12,'#6a4a2a');B.rect(x+4,110,6,5,'#ffe8a0')}
  B.rect(66,62,10,62,'#c8b8a0');B.poly([[62,62],[71,50],[80,62]],'#8a5a3a');fOak(B,440,128,18,'#3a7a3a')},
 prison(B,R){fBricks(B,0,140,'#3a3a44');B.rect(200,30,60,40,'#0e1020');B.rect(202,32,56,36,'#1a2a4a');B.ball(240,46,6,['#c8d0e8','#f0f4ff','#ffffff']);for(let x=206;x<258;x+=9)B.rect(x,30,3,40,'#5a5a64');
  for(let y=70;y<140;y++)B.rect(200+(y-70)*.5,y,60,1,'#c8d8ff',.05);fFloor(B,140,'#2a2a30','#141418',5);for(let i=0;i<40;i++)B.rect(330+R()*80,142+R()*10,8,1,'#c8a84a');
  for(const x of [60,120]){for(let y=40;y<100;y+=5)B.rect(x+(y%10?1:0),y,3,4,'#7a7a84');B.rect(x-3,100,9,5,'#5a5a64')}},
 abyss(B,R){B.vg(0,168,['#1a0208','#3a0a12','#6a1a12','#200408']);B.ball(380,40,20,['#3a0000','#a01a1a','#ff5a3a']);B.glow(380,40,80,'#ff3a1a',.25);
  for(let i=0;i<12;i++){const x=R()*480,h=40+R()*70;B.poly([[x-10,140],[x,140-h],[x+3,140-h+10],[x+12,140]],'#120206')}B.vg(138,168,['#1a0406','#080102']);
  for(let i=0;i<8;i++){let x=R()*480,y=140;for(let k=0;k<8;k++){const nx=x+(R()-.5)*20,ny=y+4;B.line(x,y,nx,ny,'#ff6a2a');x=nx;y=ny}}B.glow(240,150,200,'#ff4a1a',.08)},
 dragon_sky(B,R){B.vg(0,168,['#3a7ad0','#8ac0f0','#d8ecff']);for(let i=0;i<9;i++)fCloud(B,R,R()*480,70+R()*90,16+R()*8,i%2?'#ffffff':'#e8f0ff');
  B.poly([[300,150],[360,70],[440,30],[430,70],[480,60],[480,120],[440,150]],'#4a2e6a');for(const [a,b] of [[440,30],[480,60],[480,100]])B.line(360,120,a,b,'#2a1a40');B.poly([[300,150],[360,70],[440,30],[380,90]],'#5a3a7a');
  B.poly([[0,168],[0,140],[60,126],[200,122],[330,128],[480,150],[480,168]],'#3a2a52');for(let x=10;x<470;x+=12){const y=124+Math.abs(x-200)*.07;B.poly([[x,y+6],[x+6,y-6-((x*7)%5)],[x+12,y+6]],'#e8c060')}
  for(let y=134;y<168;y+=6)for(let x=(y%12)?6:0;x<480;x+=12)B.rect(x,y,8,3,'#4a3a66');B.poly([[0,128],[30,96],[48,84],[66,88],[60,100],[30,124]],'#3a2a52');B.poly([[48,84],[42,70],[54,82]],'#e8c060');B.rect(56,88,4,3,'#ffd030');B.glow(58,89,10,'#ffd030',.4)},
 cave(B,R){B.vg(0,168,['#0a0e14','#141c24','#1a2630']);for(let i=0;i<20;i++){const x=R()*480,h=10+R()*30;B.poly([[x-6,0],[x+6,0],[x,h]],'#1e2a34')}for(let i=0;i<10;i++){const x=R()*480,h=8+R()*20;B.poly([[x-7,140],[x+7,140],[x,140-h]],'#1e2a34')}
  for(let i=0;i<7;i++){const x=R()*480,y=60+R()*70,c=['#5ad0ff','#c070ff','#7aff9a'][i%3];B.poly([[x,y],[x+4,y-12],[x+8,y]],c);B.glow(x+4,y-4,16,c,.25)}fFloor(B,140,'#1a2228','#0c1014',5);B.disc(340,154,30,'#123040');B.disc(340,154,24,'#1a4a5a')},
 sys(B,R){B.vg(0,168,['#020818','#06142e','#0a2040']);for(let x=0;x<480;x+=16)B.rect(x,0,1,168,'#123a6a',.5);for(let y=0;y<168;y+=16)B.rect(0,y,480,1,'#123a6a',.5);
  const pan=(x,y,w,h)=>{B.rect(x,y,w,h,'#0a2a5a',.75);B.rect(x,y,w,1,'#5cd2ff');B.rect(x,y+h-1,w,1,'#5cd2ff');B.rect(x,y,1,h,'#5cd2ff');B.rect(x+w-1,y,1,h,'#5cd2ff');B.rect(x,y,w,7,'#1a5aa0',.8);for(let yy=y+11;yy<y+h-4;yy+=6)B.rect(x+4,yy,(w-8)*(.4+R()*.6),2,'#9ae0ff',.7);B.glow(x+w/2,y+h/2,w*.8,'#5cd2ff',.1)};
  pan(160,20,170,90);pan(30,40,100,60);pan(360,50,96,70);B.vg(140,168,['#081a36','#020818'])},
 summon(B,R){B.vg(0,140,['#1a1428','#2a2040','#3a2c52']);for(const x of [40,130,330,420])fPillar(B,x,10,140,'#4a4060');for(const x of [80,380])B.rect(x,10,30,50,'#7a1a2a');B.rect(76,8,38,4,'#c8a040');B.rect(376,8,38,4,'#c8a040');
  fFloor(B,138,'#3a3450','#1e1a2c',6);for(const [r,c] of [[90,'#ffd76a'],[66,'#ffe8a0'],[40,'#ffd76a']])fRing(B,240,150,r,c,.9);for(let a=0;a<8;a++){const A=a*Math.PI/4;B.rect(240+Math.cos(A)*78,150+Math.sin(A)*23,4,3,'#fff4c0')}B.glow(240,148,120,'#ffd76a',.22)},
 dragon(B,R){B.vg(0,168,['#0a0612','#2a0e1a','#6a1e1a','#c8501a']);B.stars(R,60,60,['#ffffff']);B.poly([[150,140],[260,40],[300,60],[360,30],[480,140]],'#1a1014');B.poly([[0,150],[100,110],[200,150]],'#140a0e');
  B.poly([[280,58],[250,30],[262,52],[230,40],[262,64]],'#0a0608');B.poly([[300,56],[352,14],[340,44],[392,30],[330,64]],'#0a0608');B.disc(290,62,12,'#0a0608');B.poly([[296,56],[328,48],[322,58]],'#0a0608');B.rect(316,50,3,2,'#ffd030');B.glow(317,51,10,'#ffd030',.4);
  for(let i=0;i<10;i++){const x=20+R()*200,h=8+R()*10;B.rect(x,150-h,12,h,'#1a0a08');B.glow(x+6,150-h,18,'#ff6a1a',.3)}B.vg(150,168,['#2a0e0a','#0a0404'])},
 dk(B,R){B.vg(0,168,['#1a0008','#4a0a14','#8a1a1a','#2a0408']);B.ball(120,40,22,['#4a0000','#c81a1a','#ff7a5a']);B.glow(120,40,80,'#ff2a1a',.25);
  fCastle(B,260,130,22,90,'#14080c','#0a0406','#ff3a2a',R);fCastle(B,286,130,60,60,'#1a0a10',null,'#ff3a2a',R);fCastle(B,350,130,22,100,'#14080c','#0a0406','#ff3a2a',R);fCastle(B,376,130,18,60,'#14080c','#0a0406','#ff3a2a',R);
  for(let i=0;i<120;i++){const x=R()*480,y=132+R()*20;B.rect(x,y,2,5,'#0a0204');B.rect(x,y-3,1,3,'#3a3a3a')}B.vg(150,168,['#1a0406','#050001'])},
 wed(B,R){B.vg(0,168,['#f0e8f4','#e0d0e8','#c8b8d8']);fArchWin(B,210,14,60,70,['#ff9ac8','#9ad8ff','#ffe08a','#c8a8ff']);for(const x of [90,150,318,378])fPillar(B,x,6,140,'#f4eef4');
  B.vg(130,168,['#d8c8d8','#b8a8c0']);B.poly([[220,130],[260,130],[320,168],[160,168]],'#f8f4f8');for(let i=0;i<40;i++)B.rect(160+R()*160,132+R()*34,2,2,['#ff8ab0','#ffd0e0','#ffffff'][i%3]);
  for(let r=0;r<3;r++){B.rect(20,138+r*9,130,5,'#8a5a3a');B.rect(330,138+r*9,130,5,'#8a5a3a')}for(const x of [180,300]){B.rect(x,104,3,26,'#e8e0d0');B.disc(x+1,100,8,'#fff4f8');B.disc(x-3,98,4,'#ffb0d0')}},
 ball(B,R){B.vg(0,130,['#1a0e24','#2a1834','#3a2440']);for(let i=0;i<4;i++){const x=40+i*120;B.rect(x,14,40,80,'#0a1430');B.rect(x+2,16,36,76,'#14244a');B.stars(R,10,0,['#fff']);B.rect(x+19,14,2,80,'#c8a040');B.rect(x,52,40,2,'#c8a040');B.rect(x-6,10,8,110,'#8a1a2a');B.rect(x+38,10,8,110,'#8a1a2a')}
  for(const x of [140,340]){B.line(x,0,x,18,'#c8a040');for(let k=0;k<7;k++){B.rect(x-18+k*6,20,3,6,'#ffe8a0');B.glow(x-17+k*6,20,10,'#ffe0a0',.25)}B.rect(x-20,26,40,3,'#c8a040')}
  fChecker(B,126,'#e8e0d0','#3a2a3a');B.glow(240,130,200,'#ffd8a0',.08)},
 tour(B,R){B.vg(0,60,['#4a8ad8','#9ac8f0']);for(let t=0;t<3;t++){const y=40+t*22;B.rect(0,y,480,22,['#c8a878','#b89868','#a88858'][t]);for(let x=0;x<480;x+=24){B.rect(x+4,y+4,16,14,'#5a4030')}fCrowd(B,R,y+6,y+18,['#c83a3a','#3a5ac8','#e8c040','#3a9a5a','#e8e8e8','#8a4ac8'])}
  for(let i=0;i<8;i++){const x=20+i*62;B.rect(x,24,2,18,'#5a4030');B.poly([[x+2,24],[x+16,28],[x+2,32]],['#c83a3a','#3a5ac8','#e8c040'][i%3])}B.vg(106,168,['#e0c890','#c8a870']);for(let i=0;i<80;i++)B.rect(R()*480,110+R()*56,3,1,'#b89860');B.rect(0,104,480,3,'#7a5a3a')},
 throne(B,R){B.vg(0,168,['#1a1018','#2a1824','#3a2030']);for(const x of [30,110,358,438])fPillar(B,x,0,140,'#5a4a5a');for(const x of [70,390]){B.rect(x,0,24,90,'#8a1a2a');B.poly([[x,90],[x+12,100],[x+24,90]],'#8a1a2a');B.disc(x+12,30,7,'#e8c040')}
  for(let s=0;s<4;s++)B.rect(180-s*14,116+s*7,120+s*28,7,fMix('#6a5a6a','#000000',s*.1));B.rect(222,60,36,56,'#c8a040');B.rect(226,64,28,40,'#8a1a2a');B.poly([[222,60],[240,44],[258,60]],'#e8c040');B.glow(240,70,40,'#ffd76a',.2);
  fFloor(B,144,'#3a2a34','#1a1018',6);B.poly([[228,144],[252,144],[280,168],[200,168]],'#8a1a2a')},
 dgn(B,R){B.vg(0,168,['#0a0808','#141010','#1e1814']);fBricks(B,0,140,'#2e2824');B.rect(200,40,80,100,'#060404');B.disc(240,42,40,'#060404');B.rect(196,38,4,102,'#4a4038');B.rect(280,38,4,102,'#4a4038');
  for(const x of [120,360]){B.rect(x,70,4,14,'#4a3020');B.glow(x+2,64,30,'#ff9a3a',.35)}fFloor(B,140,'#2a2420','#100c0a',5);B.rect(226,120,30,18,'#6a3a1a');B.rect(226,120,30,4,'#c8a040');B.rect(239,126,4,4,'#ffd76a');B.glow(241,124,30,'#ffd76a',.25);for(let i=0;i<6;i++)B.disc(60+R()*360,150+R()*10,3,'#e8e0c8')},
 church(B,R){B.vg(0,168,['#e8e0d8','#c8bcb4','#a89c94']);fArchWin(B,190,10,100,90,['#ff5a5a','#5ab0ff','#ffd76a','#7ad07a','#c070ff']);for(const x of [60,130,338,408])fPillar(B,x,0,140,'#d8d0c8');
  for(let i=0;i<4;i++){const x=200+i*24;for(let y=100;y<168;y++)B.rect(x+(y-100)*.2,y,14,1,['#ff9a9a','#9ad8ff','#ffe8a0','#c8a8ff'][i],.06)}B.vg(140,168,['#b8aca4','#8a7e76']);B.rect(222,120,36,20,'#e8e0d0');B.rect(238,96,4,24,'#c8a040');B.rect(230,104,20,4,'#c8a040')},
 war(B,R){B.vg(0,140,['#2a1a14','#6a3a1a','#c8702a','#e8a050']);for(let i=0;i<8;i++){const x=R()*480;for(let k=0;k<6;k++)B.disc(x+k*4,90-k*12,8+k*2,'#3a2a24',.5)}fCastle(B,380,110,24,40,'#3a2a24',null,'#ff6a1a',R);fCastle(B,406,110,30,26,'#3a2a24',null,'#ff6a1a',R);
  B.vg(108,168,['#5a4030','#3a2a1e','#1e140e']);for(let i=0;i<60;i++){const x=R()*480,y=110+R()*30;B.line(x,y,x+2,y-14,'#1a1210');B.rect(x,y,3,6,'#1a1210')}for(let i=0;i<6;i++){const x=R()*480;B.rect(x,100,1,20,'#1a1210');B.poly([[x+1,100],[x+12,103],[x+1,106]],['#3a5ac8','#c83a3a'][i%2])}},
 library(B,R){B.vg(0,168,['#1a1008','#2a1a0e','#3a2414']);for(let s=0;s<4;s++){const y=8+s*32;B.rect(0,y+28,480,4,'#5a3a1e');let x=0;while(x<480){if(x>200&&x<280){x=280;continue}const w=5+R()*7,h=16+R()*10,c=['#8a2a2a','#2a4a8a','#2a7a4a','#8a6a2a','#5a2a7a','#2a7a7a'][Math.floor(R()*6)];B.rect(x,y+28-h,w,h,c);B.rect(x,y+28-h,1,h,fMix(c,'#ffffff',.3));x+=w+1}}
  B.rect(204,10,72,90,'#0a1430');B.rect(208,14,64,82,'#16264a');B.stars(R,10,0,['#fff']);B.rect(239,14,2,82,'#5a3a1e');B.rect(208,54,64,2,'#5a3a1e');for(let y=96;y<140;y++)B.rect(204+(y-96)*.3,y,72,1,'#c8d8ff',.05);
  B.line(300,10,330,140,'#7a5a2e');B.line(312,10,342,140,'#7a5a2e');for(let y=20;y<140;y+=12)B.line(302+(y-10)*.23,y,314+(y-10)*.23,y,'#7a5a2e');fFloor(B,140,'#4a2e18','#24160a',6)},
 klass(B,R){B.vg(0,168,['#d8c8a8','#c8b898','#a89878']);B.rect(150,18,180,70,'#5a3a1e');B.rect(154,22,172,62,'#1e3a2e');fRing(B,200,54,30,'#e8f0e8',.7);B.line(170,40,230,70,'#e8f0e8',.5);for(let i=0;i<5;i++)B.rect(250,32+i*10,60*(.4+R()*.6),2,'#e8f0e8',.7);
  for(const x of [30,400]){B.rect(x,20,50,60,'#5a8ad8');B.rect(x,48,50,2,'#8a6a4a');B.rect(x+24,20,2,60,'#8a6a4a')}fFloor(B,120,'#8a6a4a','#5a4030',8);for(let r=0;r<2;r++)for(let i=0;i<5;i++){const x=40+i*90+r*20,y=124+r*20;B.rect(x,y,60,6,'#6a4a2a');B.rect(x,y,60,2,'#9a7a4a');B.rect(x+4,y+6,3,10,'#4a3018')}},
 guild(B,R){B.vg(0,168,['#2a1a10','#3a2414','#4a2e18']);for(let x=0;x<480;x+=20)B.rect(x,0,2,140,'#2a180c');B.rect(0,30,480,4,'#5a3a1e');
  B.rect(170,40,110,70,'#6a4a2a');B.rect(174,44,102,62,'#8a6a3a');for(let i=0;i<9;i++){const x=180+(i%3)*32,y=48+(i/3|0)*19;B.rect(x+R()*4,y+R()*3,24,15,['#f0e4c8','#e8d8b0','#f4ecd8'][i%3]);B.rect(x+4,y+4,14,1,'#5a4a3a');B.rect(x+4,y+8,10,1,'#5a4a3a');B.rect(x+11,y,2,2,'#c83a3a')}
  B.rect(380,70,80,70,'#3a2a24');B.rect(392,90,56,50,'#1a0e08');B.glow(420,120,50,'#ff8a2a',.4);for(let i=0;i<3;i++){B.rect(40+i*36,112,28,28,'#6a4020');B.rect(40+i*36,118,28,2,'#3a2410');B.rect(40+i*36,130,28,2,'#3a2410')}fFloor(B,140,'#4a2e18','#24160a',6)},
 market(B,R){B.vg(0,100,['#4a8ad8','#9ac8f0','#f0e8c8']);for(let i=0;i<6;i++){const x=R()*480,h=40+R()*30;B.rect(x,100-h,40,h,['#e8d8b8','#d8c0a0','#c8b090'][i%3]);B.poly([[x-4,100-h],[x+20,86-h],[x+44,100-h]],'#a04a2a')}
  fFloor(B,100,'#b8a888','#8a7a62',6);for(let i=0;i<5;i++){const x=10+i*96,c=['#c83a3a','#3a7ac8','#e8a03a','#3a9a5a','#8a4ac8'][i];for(let k=0;k<8;k++)B.rect(x+k*10,96,10,10,k%2?c:'#f4ecd8');B.rect(x,106,80,4,fMix(c,'#000000',.3));B.rect(x+2,110,2,26,'#5a3a1e');B.rect(x+76,110,2,26,'#5a3a1e');B.rect(x,124,80,12,'#7a5030');for(let k=0;k<10;k++)B.disc(x+6+k*7,122,3,['#e83a3a','#ffb020','#7ad03a','#c070ff'][(k+i)%4])}},
 kitchen(B,R){B.vg(0,168,['#3a2414','#4a2e18','#5a3a1e']);fBricks(B,20,130,'#6a4a3a');B.rect(170,50,140,90,'#2a1a10');B.rect(180,70,120,70,'#120804');B.glow(240,130,70,'#ff8a2a',.45);B.rect(220,92,40,28,'#2a2a30');B.rect(216,90,48,4,'#4a4a52');
  for(let i=0;i<6;i++){B.line(60+i*18,30,60+i*18,44,'#5a5a64');B.disc(60+i*18,50,6+i%2*2,'#6a6a74')}B.rect(330,120,140,8,'#8a5a2e');B.rect(330,120,140,2,'#b07a4a');for(let i=0;i<5;i++)B.disc(345+i*26,116,6,['#e8c060','#e83a3a','#7ad03a','#f4ecd8','#c8702a'][i]);fFloor(B,140,'#4a3020','#24160a',6)},
 love(B,R){B.vg(0,110,['#1a1440','#4a2a6a','#c86a8a','#ffb090']);B.ball(380,40,12,['#ffd0a0','#fff0d0','#ffffff']);B.glow(380,40,60,'#ffc0a0',.25);B.stars(R,40,50,['#ffffff']);
  B.vg(104,168,['#3a6a3a','#2a4a2a','#1a301a']);for(let i=0;i<10;i++){const x=i*50+R()*10;B.disc(x,112,16,'#2a5a2a');for(let k=0;k<6;k++)B.disc(x-10+R()*20,104+R()*14,2,['#ff4a7a','#ff8ab0','#ffffff'][k%3])}
  B.disc(240,150,26,'#c8c0b8');B.disc(240,148,21,'#5ab0d0');B.rect(237,118,6,30,'#d8d0c8');B.disc(240,118,6,'#e8e0d8');for(const x of [80,400]){B.rect(x,94,3,46,'#2a2a30');B.rect(x-3,90,9,6,'#ffe8a0');B.glow(x+1,93,20,'#ffe0a0',.35)}},
 fest(B,R){B.vg(0,168,['#05061a','#0e1030','#1a1a40']);B.stars(R,100,90,['#ffffff']);for(let i=0;i<7;i++){const x=i*72,h=30+R()*30;B.rect(x,128-h,60,h,'#1a1424');B.poly([[x-4,128-h],[x+30,112-h],[x+64,128-h]],'#120e1a');for(let k=0;k<4;k++)if(R()<.7)B.rect(x+8+k*12,128-h*.6,5,6,'#ffcf70',.8)}
  for(let a=0;a<2;a++){for(let x=0;x<480;x+=4){const y=40+a*30+Math.sin(x/480*Math.PI)*20;B.px(B.X(x),B.Y(y),'#3a3040')}for(let x=10;x<480;x+=24){const y=40+a*30+Math.sin(x/480*Math.PI)*20;B.rect(x,y,5,7,['#ff4a3a','#ffb03a','#ff6ad8','#5ad0ff'][(x/24+a)%4|0]);B.glow(x+2,y+3,12,'#ffb070',.3)}}fFloor(B,128,'#2a2234','#100c18',6)},
 grave(B,R){B.vg(0,168,['#0a0e18','#141c2a','#22303e']);B.ball(120,40,16,['#a8b0c0','#d8e0e8','#ffffff']);B.glow(120,40,60,'#c8d8ff',.2);B.ridge(R,110,10,'#141a24',1);
  B.line(400,140,400,70,'#0a0a0e');for(let k=0;k<5;k++){const y=80+k*10;B.line(400,y,400+(k%2?24:-22),y-12,'#0a0a0e')}for(let i=0;i<9;i++){const x=40+i*48+R()*10;if(i%3===0){B.rect(x,112,4,26,'#5a6070');B.rect(x-6,118,16,4,'#5a6070')}else{B.rect(x-6,118,14,20,'#4a5060');B.disc(x+1,118,7,'#4a5060')}}
  B.vg(136,168,['#1a2018','#0a0e0a']);for(let i=0;i<30;i++)B.rect(R()*480,128+R()*14,20,2,'#8a98b0',.15)},
 sea(B,R){B.vg(0,96,['#3a7ad8','#8ac0f0','#f0e0c0']);B.ball(120,60,16,['#ffb070','#ffe0a0','#ffffff']);B.glow(120,60,90,'#ffd0a0',.25);B.vg(94,168,['#2a6aa0','#1a4a7a','#0a2a4a']);for(let y=96;y<168;y+=3)for(let i=0;i<14;i++)B.rect(R()*480,y,6+R()*10,1,'#9ad0f0',.4);
  B.poly([[260,118],[400,118],[384,136],[276,136]],'#5a3a1e');B.rect(276,118,124,3,'#8a5a2e');B.rect(328,40,3,78,'#3a2414');B.rect(370,58,2,60,'#3a2414');B.poly([[331,44],[362,62],[331,100]],'#f4ecd8');B.poly([[372,60],[396,74],[372,104]],'#e8dcc4');B.poly([[331,40],[346,44],[331,48]],'#c83a3a')},
 train(B,R){B.vg(0,110,['#5a9ad8','#a8d0f0','#e8f0e0']);for(let i=0;i<3;i++)fCloud(B,R,R()*480,20+R()*30,13,'#ffffff');B.ridge(R,96,12,'#6a9a5a',1);for(let x=0;x<480;x+=20){B.rect(x,94,3,22,'#7a5a3a')}B.rect(0,100,480,3,'#9a7a4a');B.rect(0,108,480,3,'#9a7a4a');
  fFloor(B,114,'#c8b080','#a08860',7);for(let i=0;i<3;i++){const x=220+i*80;B.rect(x+6,96,4,40,'#7a5a3a');B.rect(x,104,16,4,'#7a5a3a');B.disc(x+8,96,6,'#d8b878');B.rect(x+3,108,10,16,'#d8b878')}B.rect(60,104,50,30,'#5a3a1e');for(let i=0;i<5;i++)B.line(66+i*9,100,66+i*9,132,['#c8c8d0','#a07a4a'][i%2])},
 ritual(B,R){B.vg(0,168,['#06040e','#10081e','#1a0e2e']);for(let i=0;i<6;i++){const x=30+i*84,y=20+R()*50;B.poly([[x,y],[x+6,y-14],[x+12,y],[x+6,y+14]],'#8a5aff');B.glow(x+6,y,18,'#8a5aff',.3)}
  for(const [r,c] of [[100,'#c070ff'],[78,'#5ad0ff'],[54,'#c070ff'],[30,'#ffd76a']])fRing(B,240,148,r,c,.9);for(let k=0;k<5;k++){const A=k*1.2566-1.57;B.line(240+Math.cos(A)*54,148+Math.sin(A)*16,240+Math.cos(A+2.513)*54,148+Math.sin(A+2.513)*16,'#e0c0ff',.8)}B.glow(240,146,120,'#a060ff',.22)},
 home(B,R){B.vg(0,168,['#5a3a24','#6a4a2e','#7a5638']);for(let x=0;x<480;x+=24)B.rect(x,0,1,130,'#4a2e1a');B.rect(60,24,70,56,'#8ac0f0');B.rect(64,28,62,48,'#b8e0ff');B.rect(94,24,2,56,'#4a2e1a');B.rect(60,50,70,2,'#4a2e1a');for(let y=80;y<140;y++)B.rect(60+(y-80)*.6,y,70,1,'#fff4d0',.05);
  B.rect(330,70,90,70,'#4a3a34');B.rect(342,90,66,50,'#1a0e08');B.glow(375,124,50,'#ff9a3a',.4);fFloor(B,138,'#8a6040','#5a3a20',7);B.disc(240,154,40,'#8a2a3a');B.disc(240,154,32,'#a8404a');
  B.rect(180,110,60,24,'#c8a070');B.rect(180,110,60,3,'#e8c890');B.rect(184,134,4,6,'#8a6040');B.rect(232,134,4,6,'#8a6040');B.disc(210,108,12,'#f4ecd8')}
};
// เหตุการณ์ → ฉาก (เรียงจากเฉพาะเจาะจงไปทั่วไป)
const FRX=[['sys',/หน้าต่างระบบ|\[ระบบ|ระบบ\]|เควสระบบ|หน้าต่างสถานะ|SYSTEM|ระบบแจ้ง/],['summon',/อัญเชิญ|ลูกแก้วประเมิน|ประเมินสกิล|วงเวทอัญเชิญ|ห้องสีขาว/],['dragon',/มังกร/],['dk',/จอมมาร|ราชาปีศาจ|กองทัพมาร|ขุนพลมาร|ปราสาทมาร/],
 ['wed',/งานแต่ง|แต่งงาน|หมั้น|วิวาห์|เจ้าสาว/],['ball',/งานเลี้ยง|เต้นรำ|งานราตรี|เดบิวต์|ราชสำนัก/],['tour',/ประลอง|สังเวียน|ท้าดวล|ทัวร์นาเมนต์|สนามแข่ง|โคลอสเซียม|เดิมพัน/],['throne',/บัลลังก์|ครองแคว้น|รัฐประหาร|ขึ้นครอง|ท้องพระโรง|เข้าเฝ้า/],
 ['dgn',/ดันเจี้ยน|ถ้ำ|เขาวงกต|หีบสมบัติ|ชั้นใต้ดิน/],['church',/โบสถ์|นักบุญ|เทพ|เทพี|สาวศักดิ์สิทธิ์|วิหาร|พรจากเทพ/],['war',/สงคราม|ศึกใหญ่|กองทัพ|แนวหน้า|บุกเมือง/],['prison',/คุก|ประหาร|ถูกจับ|ขังไว้|ตะแลงแกง|ใส่ร้าย/],
 ['library',/ห้องสมุด|หนังสือต้องห้าม|ตำรา|คัมภีร์|ค้นคว้า|อ่านหนังสือ/],['klass',/สอบ|ห้องเรียน|ชมรม|ปีการศึกษา|นักเรียนย้าย|อาจารย์|คาบเรียน|ชั้นเรียน|ปฐมนิเทศ/],['guild',/กิลด์|เควส|โรงเตี๊ยม|นักผจญภัย|แรงก์|เหล้า|ปาร์ตี้/],['kitchen',/ทำอาหาร|ครัว|เชฟ|สูตรอาหาร|ร้านอาหาร/],
 ['market',/ตลาด|พ่อค้า|ประมูล|ร้านค้า|แผงลอย|ค้าขาย/],['wed',/งานพิธีสมรส/],['love',/สารภาพ|ความรัก|ใจเต้น|จดหมายรัก|หัวใจเต้น|เดท|จูบ|คนรัก|แอบชอบ/],['fest',/เทศกาล|ดอกไม้ไฟ|ฉลอง|งานรื่นเริง/],['grave',/งานศพ|ผี|👻|สุสาน|หลุมศพ|อันเดด|ผีดิบ|วิญญาณ/],
 ['sea',/ทะเล|เรือ|ท่าเรือ|โจรสลัด|เกาะ/],['train',/ฝึกดาบ|ซ้อม|กล้ามเนื้อ|ดาบไม้|หุ่นฟาง|ลานฝึก|ฝึกฝน/],['ritual',/พิธี|ร่ายเวท|ธาตุ|มานา|วงเวท|เวทมนตร์|ปลุกพลัง/],
 ['forest',/ป่า|ล่า|สไลม์|ก็อบลิน|หมาป่า|มอนสเตอร์|สัตว์อสูร/],['t_base',/สลัม/],['h_base',/ขบวนผู้กล้า|นครหลวง/],['village',/หมู่บ้าน|ชาวบ้าน|ชาวนา|ไร่|ทุ่งนา/],['home',/ทารก|เปล|วัยเด็ก|คลอด|ลืมตาดูโลก/]];
const FCAP={m_base:'🔮 วิทยาลัยเวทบนเกาะลอยฟ้า',n_base:'🏰 สถาบันหลวงยามเย็น',h_base:'⚔️ นครหลวงอาณาจักร',t_base:'🗑️ สลัมนอกกำแพงเมือง',forest:'🌲 ป่าลึก',desert:'🏜️ ทะเลทราย',village:'🌾 หมู่บ้านชาวนา',prison:'⛓️ คุกใต้ดิน',abyss:'🌋 ดินแดนปีศาจ',dragon_sky:'🐉 บนหลังมังกร',cave:'🕳️ ถ้ำผลึก',
 sys:'🟦 หน้าต่างระบบ',summon:'✨ วงเวทอัญเชิญ',dragon:'🐉 มังกรบนยอดเขา',dk:'😈 ปราสาทจอมมาร',wed:'💒 โบสถ์งานวิวาห์',ball:'💃 ห้องโถงงานเลี้ยง',tour:'🏟️ สนามประลอง',throne:'👑 ท้องพระโรง',dgn:'🗝️ ดันเจี้ยน',church:'⛪ วิหารศักดิ์สิทธิ์',war:'⚔️ สนามรบ',library:'📚 ห้องสมุดโบราณ',klass:'🎓 ห้องเรียน',
 guild:'🍺 กิลด์นักผจญภัย',market:'🛒 ตลาดในเมือง',kitchen:'🍳 ห้องครัว',love:'🌹 สวนกุหลาบยามค่ำ',fest:'🎆 คืนเทศกาล',grave:'🪦 สุสานในหมอก',sea:'⛵ ท้องทะเล',train:'🗡️ ลานฝึก',ritual:'🔯 ห้องพิธีเวท',home:'🏡 บ้านหลังเล็ก'};
const FWXN={m_base:'wStars',n_base:'wSakura',h_base:null,t_base:'wRain',forest:'wLeaves',desert:'wRays',village:'wLeaves',abyss:'wStorm',dragon_sky:null,cave:'wFog',sys:null,summon:null,dragon:'wStorm',dk:'wStorm',wed:'wSakura',ball:null,tour:null,throne:null,dgn:'wFog',church:'wRays',war:'wRain',library:'wFog',guild:null,market:null,kitchen:null,love:'wSakura',fest:'wStars',grave:'wFog',sea:null,train:'wLeaves',ritual:null,home:null,prison:null,klass:null};
const FBST={summon:['magicCircle',240,150,['#ffd76a','#fff4c0']],dragon:['shadowFlames',300,70],dk:['darkExplosion',300,90],tour:['swordSlash',120,120],ritual:['runeCircle',240,150,['#c070ff','#f0e0ff']],church:['holyPillar',240,140],war:['lightningStrike',380,120,['#ffb04a','#fff0c0']],
 fest:['starFall',300,40,['#ffb070','#ffffff']],m_base:['starFall',380,40,['#c8a8ff','#ffffff']],sys:['zapHit',245,60,['#5cd2ff','#e8fbff']],abyss:['shadowTendrils',240,140],dgn:['spiritFlame',240,124],grave:['spiritFlame',160,130,['#7affd0','#e0fff4']],cave:['manaBurst',300,100,['#5ad0ff','#e8fbff']]};
let fLast={t:'',a:-1},FOV={host:null,cv:null,pane:null,name:null,t:0,fx:0};
{const _ch=choice;choice=function(t,x){try{if(on())fLast={t:String(t||'')+' '+String(x||''),a:age()}}catch(e){}return _ch.apply(this,arguments)}}
function fScene(K){let t='';try{const c=choice._cur;if(c)t=String(c.title||'')+' '+String(c.text||'');else if(fLast.a===age())t=fLast.t}catch(e){}t=t.replace(/<[^>]+>/g,'');
 if(t)for(const [id,rx] of FRX)if(rx.test(t))return id;
 const fo=S.focus||'';const FM={fa_cook:'kitchen',fa_dgn:'dgn',fa_hunt:'forest',fa_guild:'guild',fa_dk:'dk',fk_read:'library',fk_magic:'ritual',fk_play:'village',fa_deep:'library',fa_surv:'forest',fm_hunt:'forest'};
 if(K.w!=='mon'&&FM[fo])return FM[fo];
 if(K.kidP)return 'home';
 if(K.w==='mon')return 'cave';
 if(K.w==='lost'){const sp=K.f&&K.f.sp;return {forest:'forest',desert:'desert',village:'village',prison:'prison',abyss:'abyss',dragon:'dragon_sky'}[sp]||'forest'}
 return {magic:'m_base',noble:'n_base',hero:'h_base',trash:'t_base'}[K.w]||'m_base'}
const FCACHE=new Map();
function fStill(id,W,H){const k=id+'|'+W+'|'+H;let c=FCACHE.get(k);if(c)return c;const B=FSS.Buf(W,H),R=FSS.rng(11+[...id].reduce((a,q)=>a*31+q.charCodeAt(0)>>>0,7)%9973);try{FP[id](B,R)}catch(x){console.error('fan still',id,x)}c=B.done();if(FCACHE.size>30)FCACHE.clear();FCACHE.set(k,c);return c}
const fNpc=(x,y,s,o)=>{try{person(x,y,Object.assign({robe:'#5a3a6a',trim:'#ffd37a',belt:'#00000055',hs:s%5,mood:'happy',seed:s,age:22,g:s%2?'หญิง':'ชาย',skin:['#ffe3cf','#f1c7a5','#c98d63'][s%3],hair:['#2a1d14','#e8c46a','#c0392b','#e8e8f0','#4a3a8a'][s%5]},o||{}),'stand')}catch(e){}};
// ส่วนที่ขยับ (พิกัด Q 480×168)
function fDyn(id,f,K){const fl=(x,y,c)=>{const h=(f+x)%12<6;Q(x,y-(h?5:4),4,h?5:4,c||'#ffb040');Q(x+1,y-(h?7:6),2,2,'#fff0a0')},sp=(n,fn)=>{for(let i=0;i<n;i++)fn(i)};
 switch(id){
 case 'm_base':sp(12,i=>{const x=(i*41+f*.5)%500-10,y=20+(i*17)%90;Q(x,y,2,2,['#c8a8ff','#7ad0ff','#ffd37a'][i%3])});break;
 case 'n_base':sp(3,i=>{const y=145+Math.sin(f*.2+i)*2;Q(414+i*4,y-4-((f+i*7)%10),2,2,'#bfefff')});break;
 case 'h_base':sp(8,i=>{const w=Math.round(Math.sin(f*.15+i)*2);Q(26+i*60,94+w,10,2,'#e85a5a')});sp(3,i=>{const x=(f*1.2+i*160)%520-20;Q(x,140,6,6,'#5a3a2a');Q(x+1,136,4,4,'#e8c8a8')});break;
 case 't_base':sp(3,i=>{const x=(f*.8+i*170)%520-20,y=30+i*10+Math.sin(f*.2+i)*3;Q(x,y,4,1,'#111');Q(x+1,y-1+((f>>2)%2),2,1,'#111')});sp(4,i=>Q(200+i*90,106-((f*.3+i*13)%30),3,3,'#5a5058'));break;
 case 'forest':case 'train':sp(10,i=>{const k=(f*.4+i*37)%160;Q(40+i*44+Math.sin(f*.03+i)*6,k,2,2,(i%2)?'#e8ff8a':'#bff0a0')});break;
 case 'desert':sp(6,i=>{const x=(f*1.5+i*90)%520-20;Q(x,130+i%3*8,6,1,'#f0d8a0')});break;
 case 'village':{const a=f*.05;for(let k=0;k<4;k++){const A=a+k*1.5708;for(let r=4;r<26;r+=2)Q(71+Math.cos(A)*r,62+Math.sin(A)*r,3,3,'#e8dcc4')}sp(5,i=>Q(170+i*62,96-((f*.4+i*11)%20),3,3,'#c8c8c8'))}break;
 case 'prison':if((f%200)<6)Q(0,0,480,168,'#000');sp(4,i=>{const k=(f*.5+i*40)%60;Q(220+i*8,70+k,1,3,'#9ab8ff')});break;
 case 'abyss':case 'dragon':sp(14,i=>{const k=(f*(.6+i%3*.3)+i*29)%150;Q((i*37)%480+Math.sin(f*.05+i)*4,160-k,2,2,i%2?'#ff7a2a':'#ffd04a')});break;
 case 'dragon_sky':sp(5,i=>{const x=(f*(1+i*.3)+i*140)%560-40;Q(x,40+i*20,30,4,'#ffffff');Q(x+6,37+i*20,18,3,'#ffffff')});break;
 case 'cave':sp(8,i=>{const k=(f*.4+i*23)%120;Q(30+i*56,140-k,2,2,['#5ad0ff','#c070ff','#7aff9a'][i%3])});if((f%60)<30)Q(340,152,6,1,'#9ae0ff');break;
 case 'sys':{const y=20+((f*1.2)%90);Q(160,y,170,1,'#9ae0ff');sp(3,i=>{if(((f>>3)+i)%5===0)Q(170+i*50,96,30,4,'#5cd2ff')})}break;
 case 'summon':{const a=f*.03;for(let r=0;r<3;r++){const n=24+r*8;for(let i=0;i<n;i++){const A=a*(r%2?-1:1)+i/n*6.283;Q(240+Math.cos(A)*(40+r*25),150+Math.sin(A)*(12+r*7),3,2,['#ffd76a','#fff4c0','#ffb040'][r])}}sp(8,i=>Q(200+i*10,150-((f*1.5+i*17)%130),2,4,'#fff4c0'))}break;
 case 'dk':sp(4,i=>{const x=(f*1.4+i*130)%540-30,y=50+i*12+Math.sin(f*.3+i)*4,w=(f>>2)%2;Q(x,y,3,2,'#0a0204');Q(x-3,y-w,3,1,'#0a0204');Q(x+3,y-w,3,1,'#0a0204')});if((f%180)<4)Q(0,0,480,168,'#ff2a2a');break;
 case 'wed':case 'love':sp(12,i=>{const k=(f*.7+i*31)%180;Q((i*43+Math.sin(f*.04+i)*20)%480,k-10,3,2,i%2?'#ff8ab0':'#ffd0e0')});break;
 case 'ball':sp(6,i=>{const a=f*.04+i;Q(240+Math.cos(a)*70,140+Math.sin(a)*6,4,4,'#ffe8a0')});sp(14,i=>{if(((f>>2)+i*3)%7===0)Q(126+i*2+(i>6?186:0),24,2,2,'#ffffff')});break;
 case 'tour':sp(20,i=>{const j=((f>>3)+i)%4===0?2:0;Q((i*24+5)%480,46+(i%3)*22-j,4,2,'#ffe0c0')});sp(8,i=>Q(22+i*62,26+Math.round(Math.sin(f*.2+i)),14,2,['#c83a3a','#3a5ac8','#e8c040'][i%3]));break;
 case 'throne':case 'dgn':case 'guild':case 'kitchen':case 'home':{const T={throne:[[56,96],[424,96]],dgn:[[120,72],[360,72]],guild:[[100,50],[300,50]],kitchen:[[236,128],[220,128],[252,128]],home:[[372,132],[360,132],[384,132]]}[id];T.forEach(p=>fl(p[0],p[1]))}if(id==='kitchen')sp(4,i=>Q(236+i*4,88-((f*.6+i*9)%40),2,2,'#d8d8d8'));break;
 case 'church':sp(10,i=>{const k=(f*.3+i*17)%120;Q(200+i*9,100+k*.5,1,1,'#fff8d0')});break;
 case 'war':sp(16,i=>{const k=(f*(1+i%3)+i*37)%120;Q((i*61)%480,140-k,2,2,'#ffb04a')});if((f%140)<3)Q(0,0,480,168,'#ffe0a0');break;
 case 'library':sp(4,i=>{const y=60+Math.sin(f*.05+i*1.7)*10,x=300+i*40+Math.cos(f*.03+i)*8;Q(x,y,8,6,['#8a2a2a','#2a4a8a','#2a7a4a','#8a6a2a'][i]);Q(x+1,y+1,6,1,'#f4ecd8')});break;
 case 'klass':if((f%120)<60)Q(272,40,12,2,'#e8f0e8');break;
 case 'market':sp(3,i=>{const x=(f*.9+i*170)%520-20;Q(x,136,6,6,['#3a5ac8','#c83a3a','#3a9a5a'][i]);Q(x+1,132,4,4,'#e8c8a8')});break;
 case 'fest':sp(3,i=>{const T=(f+i*50)%150;if(T<50){Q(80+i*150,140-T*2.2,2,4,'#fff0c0')}else if(T<90){const r=(T-50)*1.1;for(let k=0;k<12;k++){const A=k*.5236;Q(80+i*150+Math.cos(A)*r,30+Math.sin(A)*r,3,3,['#ff5a5a','#ffd04a','#5ad0ff'][i])}}});break;
 case 'grave':sp(5,i=>{const x=60+i*90+Math.sin(f*.04+i)*12,y=110+Math.cos(f*.05+i)*8;Q(x,y,3,3,'#7affd0');Q(x+1,y+3,1,2,'#3a9a80')});break;
 case 'sea':{const b=Math.round(Math.sin(f*.06)*2);Q(270,138+b,120,1,'#9ad0f0');sp(10,i=>{const o=(f*.8+i*48)%480;Q(o,150+(i%3)*6,14,1,'#c8e8ff')});sp(2,i=>{const x=(f*.7+i*240)%520-20,y=30+i*14,w=(f>>3)%2;Q(x,y,2,1,'#fff');Q(x-3,y-w,3,1,'#fff');Q(x+2,y-w,3,1,'#fff')})}break;
 case 'ritual':{const a=f*.025;for(let r=0;r<2;r++){const n=30;for(let i=0;i<n;i++){const A=a*(r?-1.3:1)+i/n*6.283;Q(240+Math.cos(A)*(60+r*32),148+Math.sin(A)*(18+r*9),3,2,r?'#5ad0ff':'#c070ff')}}}break;
 }}
// NPC ในฉาก (พิกัด person 160×56)
function fNpcs(id,K){const s=(age()*7+[...id].length*13)|0;
 if(id==='tour')fNpc(118,47,s,{robe:'#3a3a48',trim:'#c83a3a',mood:'angry'});
 else if(id==='ball'){fNpc(66,47,s+1,{robe:'#8a2a5a',trim:'#ffd37a'});fNpc(112,47,s+2,{robe:'#2a3a6a',trim:'#e8e8f0'});fNpc(128,47,s+3,{robe:'#e8c0d0',trim:'#c8a040'})}
 else if(id==='wed'||id==='love'){const p=S.spouse&&S.sp?S.sp:null;fNpc(52,47,s+4,{robe:id==='wed'?'#f8f4f8':'#5a3a7a',trim:'#ffd0e0',mood:'happy',g:p&&p.g?p.g:(S.gender==='หญิง'?'ชาย':'หญิง')})}
 else if(id==='throne')fNpc(80,38,s+5,{robe:'#8a1a2a',trim:'#e8c040',age:55,hair:'#e8e8f0'});
 else if(id==='klass')fNpc(118,47,s+6,{robe:'#2a2a4a',trim:'#c8a8ff',age:50,hair:'#a8a8b0'});
 else if(id==='guild'){fNpc(66,47,s+7,{robe:'#6a4a2a',trim:'#c8a040'});fNpc(140,47,s+8,{robe:'#3a5a3a',trim:'#e8e0c8'})}
 else if(id==='market')fNpc(70,47,s+9,{robe:'#a04a2a',trim:'#f4ecd8'});
 else if(id==='church')fNpc(80,42,s+10,{robe:'#f4f0f8',trim:'#ffd76a',g:'หญิง',hair:'#f0e0a0'});
 else if(id==='home'&&K.kidP)fNpc(104,47,s+11,{robe:'#c86a5a',trim:'#f4ecd8',g:'หญิง',age:28})}
function fOv(host,name){if(!window.PFX||!PFX.pane||!(window.PFXON&&PFXON())){fOvKill();return}
 if(FOV.host!==host){fOvKill();FOV.host=host;const W=320,H=Math.round(320*host.height/host.width);FOV.pane=PFX.pane(W,H);FOV.cv=document.createElement('canvas');FOV.cv.width=W;FOV.cv.height=H;FOV.cv.className='pfxL fanOv';FOV.cv.style.cssText='position:absolute;pointer-events:none;image-rendering:pixelated;margin:0';host.insertAdjacentElement('afterend',FOV.cv);FOV.H=H}
 if(FOV.name!==name){FOV.name=name;FOV.spec=name?[{k:'w',n:name,o:{x:160,y:name==='wStars'||name==='wRays'?170:FOV.H-6,seed:5}}]:[]}
 const h=FOV.host,st=FOV.cv.style;if(!h.isConnected){fOvKill();return}st.left=h.offsetLeft+'px';st.top=h.offsetTop+'px';st.width=h.offsetWidth+'px';st.height=h.offsetHeight+'px';
 FOV.pane.tick(FOV.spec||[],performance.now(),0,.4);const g2=FOV.cv.getContext('2d');g2.clearRect(0,0,FOV.cv.width,FOV.cv.height);if(FOV.name){g2.globalAlpha=FOV.name==='wFog'?.4:FOV.name==='wStorm'?.45:FOV.name==='wRain'?.7:.8;FOV.pane.put(g2,0,0,.85);g2.globalAlpha=1}}
function fOvKill(){try{FOV.cv&&FOV.cv.remove()}catch(e){}try{FOV.pane&&FOV.pane.clear()}catch(e){}FOV.host=null;FOV.cv=null;FOV.pane=null;FOV.name=null}
function fBurst(id,host){const b=FBST[id];if(!b||!window.PFX||!(window.PFXON&&PFXON()))return;const now=performance.now();if(now-FOV.fx<5000)return;FOV.fx=now;const k=host.width/480;try{PFX.fxAt(host,b[0],Object.assign({x:b[1]*k,y:b[2]*k,seed:(now|0)%97},b[3]?{palette:PFX.ramp(b[3])}:{}),{life:3,extra:1})}catch(x){}}
setInterval(()=>{try{if(!on()&&FOV.host)fOvKill()}catch(e){}},3000);
let fCurId='';
if(FSS){const _df=drawFan;drawFan=function(ctx){try{const K=FN();if(!K)return _df.apply(this,arguments);const id=fScene(K);if(!FP[id])return _df.apply(this,arguments);fCurId=id;
 g=ctx;PS=ctx.canvas.width/SW;ctx.setTransform(PS,0,0,PS,0,0);ctx.imageSmoothingEnabled=false;const f=frame||0;
 ctx.drawImage(fStill(id,480,168),0,0,SW,SH);fDyn(id,f,K);fNpcs(id,K);
 try{const me=meLook();curMe=me;person(id==='sea'?93:id==='throne'?60:id==='summon'||id==='ritual'?80:36,id==='sea'?39:47,me,'stand')}catch(e){}
 if(K.dark>=50){ctx.globalAlpha=.08+(K.dark-50)/400;ctx.fillStyle='#2a0010';ctx.fillRect(0,0,SW,SH);ctx.globalAlpha=1}
 if(ctx.canvas.id==='scene')try{fOv(ctx.canvas,FWXN[id]||null);fBurst(id,ctx.canvas)}catch(x){}
 return}catch(x){console.error('fan scene2',x)}return _df.apply(this,arguments)}}
{const _sc=sceneCap;sceneCap=function(t){try{if(on()&&fCurId&&FCAP[fCurId]){const K=FN();return FCAP[fCurId]+(K&&WD[K.w]?' · '+WD[K.w].n:'')}}catch(e){}return _sc.apply(this,arguments)}}
window._fanScTest=(id)=>{window._fanScForce=id};
{const _fs=fScene;fScene=function(K){return window._fanScForce||_fs(K)}}


// =================== ⚔️ ดวลสไตล์แฟนตาซี (ท่าศัตรู / เวทของเรา / มานา / ปุ่มพิเศษตามชะตา) ===================
const DTK={demon:['เปลวเพลิงนรก','หอกเงามืด','คำสาปกัดกร่อน','ปีกค้างคาวฟาดฟัน','ระเบิดเลือดดำ','โซ่วิญญาณ'],
 dragon:['ลมหายใจมังกร','หางฟาดภูผา','คำรามสะท้านฟ้า','กรงเล็บทองคำ','ปีกพายุ'],
 mage:['ลูกไฟระเบิด','หอกน้ำแข็ง','สายฟ้าฟาด','โซ่ศิลา','พายุใบมีดลม','อุกกาบาตจิ๋ว','คำสาปนิทรา'],
 knight:['ฟันเฉียงอัศวิน','แทงทะลวงโล่','ดาบคู่หมุนวน','ชาร์จม้าศึก','ฟาดด้ามดาบ','ท่าดาบราชองครักษ์'],
 rogue:['มีดอาบยาพิษ','ก้าวเงา','ระเบิดควัน','แทงข้างหลัง','ปาดาวกระจาย'],
 beast:['พุ่งชน','กัดกระชาก','ตะปบ','กรีดร้องเรียกพวก','ฟาดหาง'],
 hero:['ดาบศักดิ์สิทธิ์','แสงพิพากษา','ฟันแยกมิติ','โล่แห่งพันธสัญญา'],
 noble:['ดาบเรเปียร์แทงสามจังหวะ','เวทพันธนาการเงิน','ออร่าตระกูลกดทับ','ถุงมือขาวปาใส่หน้า']};
const DEL={fire:['🔥','ฟีนิกซ์เพลิงกัลป์'],water:['🌊','มหาสมุทรคลั่ง'],wind:['🌪️','พายุใบมีดพันเล่ม'],earth:['⛰️','ภูผาถล่ม'],light:['☀️','แสงพิพากษา'],shadow:['🌑','อุ้งมือเงานรก']};
function dKind(n){n=String(n||'');return /จอมมาร|มาร|ปีศาจ|ขุนพล/.test(n)?'demon':/มังกร/.test(n)?'dragon':/อาจารย์|จอมเวท|นักเวท|แม่มด|พ่อมด|อธิการ/.test(n)?'mage':/อัศวิน|องครักษ์|ทหาร|ดยุก|เคาน์|บารอน|ราชา|เจ้าชาย/.test(n)?'knight':/โจร|นักฆ่า|มือสังหาร|ขโมย/.test(n)?'rogue':/ก็อบลิน|สไลม์|หมาป่า|มอนสเตอร์|อสูร|โอเกอร์|ออร์ค|หมี|แมงมุม|ราชินี/.test(n)?'beast':/ผู้กล้า/.test(n)?'hero':/คุณหนู|ท่านหญิง|คุณชาย|ขุนนาง|ธิดา|บุตร/.test(n)?'noble':''}
function dSec(K){const M=K.mv&&MV[K.mv];
 if(K.mv==='muscle')return ['💪','หมัดกล้ามล้วนทลายมิติ',3,'💪 แรงกล้าม','#ffb070'];
 if(K.w==='mon'){const s=(K.ms&&K.ms.sk||[])[0];return ['🦷',(typeof s==='string'?s:'พลังอสูรคลั่ง'),2,'🩸 พลังอสูร','#ff6a6a']}
 if(K.w==='hero'||K.w==='lost'){const L=K.w==='lost'&&typeof lsk==='function'?lsk(K):(SK[K.w]||[]).find(x=>x[0]===K.sk);if(L)return [L[1],L[2],K.w==='hero'?3:2,'🔷 มานา','#7ad0ff']}
 if(K.w==='trash'){const n=TRUE_SK[K.sk]?TRUE_SK[K.sk][Math.min(4,Math.max(0,(K.skL|0)-1))]:'สกิลขยะ';return ['🗑️',n,1+Math.min(3,K.skL|0),'🔷 มานา','#9ad86a']}
 const cl=X3(K).cls&&CLS[X3(K).cls];if(cl&&rnd()<.5)return [cl[0],'ท่าไม้ตาย'+cl[1],2,'🔷 มานา','#c39bff'];
 const e=DEL[K.el]||DEL.fire;return [e[0],e[1],K.w==='magic'?3:2,'🔷 มานา','#7ad0ff']}
const DX={
 muscle:{ic:'🏋️',n:'ยกศัตรูทุ่มพื้น',s:'ทะลุการตั้งรับ',c:'#ffb070',f(D,e,md,ed){return e==='def'||e==='chg'?{en:md*2.4,t:'🏋️ คุณคว้าตัวศัตรูทั้งโล่ทั้งคน ยกขึ้นเหนือหัวแล้วทุ่มลงพื้น! พื้นหินแตกเป็นวง',good:true,fx:'burst'}:{en:md*1.1,me:ed*.5,t:'🏋️ คุณพุ่งเข้าไปปล้ำ ศัตรูสวนกลับระหว่างที่คุณยก แต่ก็ทุ่มลงไปได้',good:null,fx:'poof'}}},
 regress:{ic:'⏪',n:'ย้อนเวลา 1 ยก',s:'เลือดกลับเป็นต้นยก แล้วรู้ท่าศัตรู',c:'#9ad8ff',f(D){const s=D._snap||{};D.me=Math.max(D.me,s.me||D.me);D._eye=1;return {t:'⏪ นาฬิกาในอกหมุนย้อน… ทุกอย่างกลับไปเมื่อสิบวินาทีก่อน คุณเห็นท่าต่อไปของศัตรูชัดเจน',keep:1,fx:'mana'}}},
 demon:{ic:'😈',n:'ปล่อยปีศาจในร่าง',s:'แรงมาก แต่กินเลือดตัวเอง',c:'#ff5a7a',f(D,e,md,ed){return {en:md*3,me:12,t:'😈 ดวงตาคุณกลายเป็นสีแดง เสียงหัวเราะที่ไม่ใช่ของคุณดังออกมาจากคอ… ศัตรูกระเด็นไปชนกำแพง',good:true,fx:'burst'}}},
 reborn:{ic:'👑',n:'คำสั่งราชันย์',s:'ศัตรูชะงักทั้งยก',c:'#ffd76a',f(D,e,md){return {en:md*1.2,t:'👑 "คุกเข่า" คำเดียวจากความทรงจำชาติก่อน ศัตรูทรุดลงโดยไม่รู้ตัว แล้วคุณก็ฟันลงไป',good:true,fx:'spark'}}},
 hidden:{ic:'📚',n:'เผยฝีมือจริง',s:'เลิกแกล้งอ่อน ดาเมจ ×2.5',c:'#c8a8ff',f(D,e,md,ed){return {en:md*2.5,me:e==='heavy'?ed*.5:0,t:'📚 คุณถอนหายใจ "ไม่อยากให้ใครรู้เลย" แล้วร่ายเวทระดับที่อาจารย์ยังทำไม่ได้',good:true,fx:'mana'}}},
 blade:{ic:'🗡️',n:'ดาบเวทหกสาย',s:'ฟันหกครั้ง ครั้งละธาตุ',c:'#9ad8ff',f(D,e,md){let t=0;for(let i=0;i<6;i++)if(rnd()<.6)t++;return {en:md*.5*t,t:`🗡️ ดาบเรืองแสงหกสี ฟันโดน <b>${t}/6</b> ครั้ง`,good:t>=3,fx:'spark'}}},
 alch:{ic:'🧪',n:'ปาขวดยาทดลอง',s:'สุ่ม 5 ผล',c:'#7aff9a',f(D,e,md){const r=R(0,4);return [{en:md*2,t:'🧪 ขวดสีเขียวระเบิดเป็นควันพิษ ศัตรูไออย่างหนัก',good:true,fx:'poof'},{me:-25,t:'🧪 ปาผิดขวด! แต่มันคือยาฟื้นพลัง คุณดื่มเองซะเลย',fx:'mana'},{en:md*.5,t:'🧪 ศัตรูกลายเป็นกบสามวินาที แล้วกลับเป็นคนพร้อมอาการงง',good:true,keep:1},{me:10,en:md,t:'🧪 ระเบิดทั้งคู่ ผมคุณไหม้เป็นทรงแปลกๆ',fx:'burst'},{t:'🧪 ขวดไม่แตก มันกลิ้งไปหยุดที่เท้าศัตรู ทุกคนมองหน้ากัน…'}][r]}},
 sys:{ic:'🟦',n:'ระบบวิเคราะห์ศัตรู',s:'เห็นท่าศัตรูชัด 100% ตลอดการดวล',c:'#5cd2ff',f(D){D._eye=1;return {t:'🟦 <b>[ระบบ]</b> สแกนเป้าหมายเสร็จสิ้น · แสดงท่าถัดไปของศัตรูแล้ว',keep:1,sfx:'good'}}},
 dk:{ic:'🌑',n:'ปลดปล่อยพลังจอมมาร',s:'ศัตรูหวาดกลัว ตั้งรับไม่ได้',c:'#c070ff',f(D,e,md){D.charge=false;return {en:md*2.2,t:'🌑 ออร่าสีม่วงดำแผ่ออกจากตัวคุณ หญ้ารอบตัวเหี่ยวแห้ง ศัตรูมือสั่นจนทำดาบหล่น',good:true,fx:'burst'}}},
 trash:{ic:'🗑️',n:'สกิลขยะ (ไม่รู้จะเกิดอะไร)',s:'สุ่มผลแปลกๆ',c:'#9ad86a',f(D,e,md){const r=R(0,5);return [{en:md*3,t:'🗑️ สกิลทำงานผิดพลาด… แต่ผิดพลาดใส่ศัตรู! ระเบิดตูม',good:true,fx:'burst'},{t:'🗑️ ไม่มีอะไรเกิดขึ้น ศัตรูหัวเราะเยาะ'},{me:-30,t:'🗑️ สกิลเก็บความเหนื่อยของคุณไปทิ้ง เลือดฟื้นขึ้น!',fx:'mana'},{en:md,me:8,t:'🗑️ สกิลดูดของรอบตัวมาทั้งหมด รวมถึงก้อนหินที่ตกใส่หัวคุณ'},{en:md*1.5,t:'🗑️ คุณเก็บดาบศัตรูมาได้ตอนเขาเผลอ',good:true,fx:'spark'},{t:'🗑️ สกิลแปลงคุณเป็นไก่ 2 วินาที… ศัตรูอึ้งจนลืมโจมตี',keep:1}][r]}},
 lost:{ic:'🌲',n:'ใช้ภูมิประเทศ',s:'ลากศัตรูเข้าที่ที่คุณรู้จักดี',c:'#7ae0a0',f(D,e,md,ed,K){const sp=K&&K.f&&K.f.sp;const t={forest:'🌲 คุณล่อศัตรูเข้าดงหนาม แล้วกระโดดลงมาจากต้นไม้',desert:'🏜️ คุณเตะทรายใส่ตาศัตรูในจังหวะที่ลมพัดพอดี',village:'🌾 ชาวบ้านที่คุณเคยช่วยโยนคราดมาให้คุณ',prison:'⛓️ คุณใช้โซ่ในคุกที่รู้ทุกห่วงพันขาศัตรู',abyss:'🌋 คุณผลักศัตรูไปบนรอยแยกลาวาที่คุณจำได้ว่าเปราะ',dragon:'🐉 มังกรของคุณสะบัดหาง ศัตรูกระเด็นออกไป'}[sp]||'🌲 คุณใช้ภูมิประเทศที่รู้จักให้เป็นประโยชน์';return {en:md*1.8,t,good:true,fx:'poof'}}},
 hero:{ic:'✨',n:'พรจากเทพี',s:'ฟื้นเลือด 30 + ล้างการรวมพลังศัตรู',c:'#fff2b0',f(D){D.charge=false;return {me:-30,t:'✨ แสงสีทองโอบตัวคุณ เสียงหญิงสาวกระซิบ "ยังไม่ถึงเวลาของเจ้า"',keep:1,fx:'mana',sfx:'good'}}},
 noble:{ic:'🌹',n:'กลอุบายขุนนาง',s:'ศัตรูเสียจังหวะทั้งยก',c:'#ffd37a',f(D,e,md){return {en:md*.9,t:pick(['🌹 คุณทำผ้าเช็ดหน้าตก ศัตรูก้มเก็บตามมารยาท แล้วคุณก็ตีเข้าที่ท้ายทอย','🌹 คุณตะโกนชื่อพ่อของเขาต่อหน้าทุกคน เขาเสียสมาธิไปครู่หนึ่ง','🌹 คุณโยนถุงเงินขึ้นฟ้า ลูกน้องเขาแย่งกันเก็บ']),good:true}}},
 magic:{ic:'🔮',n:'โล่สะท้อนเวท',s:'กันดาเมจยกนี้ + สะท้อนกลับ',c:'#c39bff',f(D,e,md,ed){const h=e==='atk'||e==='heavy';return h?{en:ed*(e==='heavy'?1.6:1),t:'🔮 โล่แก้วรูปหกเหลี่ยมก่อตัวทันเวลา ท่าของศัตรูสะท้อนกลับเข้าตัวเขาเอง',good:true,fx:'mana'}:{t:'🔮 คุณกางโล่… แต่ศัตรูไม่ได้โจมตีเลย เสียมานาเปล่า',good:false}}},
 mon:{ic:'🦷',n:'กลืนกินศัตรู',s:'ดูดเลือดศัตรูมาเป็นของตัวเอง',c:'#ff6a6a',f(D,e,md){const d=md*1.3;return {en:d,me:-Math.min(30,d*.6),t:'🦷 คุณงับเข้าที่คอ พลังของศัตรูไหลเข้ามาในร่างอสูรของคุณ',good:true,fx:'burst'}}},
 villain:{ic:'🎭',n:'พูดบทตัวร้าย',s:'ศัตรูรอให้คุณพูดจบ (ตามบท)',c:'#ff8ab0',f(D,e,md){return {en:md*1.6,t:'🎭 "เจ้าคิดว่าเรื่องจะจบแค่นี้หรือ?" ศัตรูยืนฟังจนจบอย่างสุภาพตามบทนิยาย… แล้วโดนคุณฟัน',good:true}}},
 cook:{ic:'🍲',n:'โยนอาหารหอมฉุย',s:'ศัตรูหิว เสียสมาธิ',c:'#ffb040',f(D,e,md){return {en:md*.8,me:-10,t:'🍲 กลิ่นสตูว์ลอยไปทั่วสนาม ท้องศัตรูร้องดังกว่าเสียงดาบ คุณกินไปคำหนึ่งด้วย',good:true}}},
 sword:{ic:'🗡️',n:'ดาบพูดได้ช่วยบอก',s:'รู้ท่าศัตรูยกนี้ + ดาบฟันเอง',c:'#c8d8ff',f(D,e,md){D._eye=1;return {en:md*.6,t:'🗡️ "ซ้าย! ไม่ใช่… ขวาของเจ้า!" ดาบในมือตะโกน แล้วกระตุกตัวเองฟันใส่ศัตรู',keep:1}}}
};
function dXof(K){if(K.mv&&DX[K.mv])return DX[K.mv];if(X8(K).dk)return DX.dk;if(SY(K)&&SY(K).on!==0)return DX.sys;if(K.mvx&&DX[K.mvx])return DX[K.mvx];if(K.w==='trash')return DX.trash;if(K.w==='lost')return DX.lost;if(K.w==='mon')return DX.mon;if(K.w==='hero')return DX.hero;if(K.w==='noble')return DX.noble;return DX.magic}
window._duFlav=window._duFlav||[];
window._duFlav.push((name)=>{if(!on())return null;const K=FN();if(!K)return null;const k=dKind(name)||(K.w==='magic'?'mage':K.w==='noble'?pick(['knight','noble','mage']):K.w==='mon'?'beast':pick(['knight','beast','mage'])),s=dSec(K),x=dXof(K);
 const en=K.mv==='muscle'?'แรงกล้าม':K.w==='mon'?'พลังอสูร':'มานา',wpn=K.mv==='muscle'?'กำปั้น':K.w==='mon'?'กรงเล็บ':K.w==='magic'?'ไม้เท้า':'ดาบ';
 const H={atk:'ยกอาวุธเตรียมใช้《{t}》พุ่งเข้ามาตรงๆ',heavy:'วงเวทขนาดใหญ่ก่อตัวขึ้นข้างหลัง กำลังจะปล่อย《{t}》ที่รับตรงๆ ไม่ไหวแน่',feint:'ทำท่าจะใช้《{t}》… แต่ปากขยับไม่ตรงคาถา',def:'กางโล่เวทรอบตัว รอจังหวะ',chg:'ดูดมานารอบตัวเข้าหาตัวเอง แสงรอบกายสว่างขึ้นเรื่อยๆ'};
 if(k==='beast'||k==='dragon')Object.assign(H,{atk:'ขู่คำราม เตรียม《{t}》พุ่งเข้าใส่',heavy:'ถอยหลังย่อตัว กล้ามเนื้อพองขึ้น กำลังจะ《{t}》เต็มแรง',feint:'ทำท่าจะ《{t}》แต่หางยังไม่ขยับ',def:'ขดตัวตั้งเกล็ดแข็ง',chg:'สูดหายใจลึกจนอกพอง'});
 if(k==='knight'||k==='noble')Object.assign(H,{def:'ยกโล่ขึ้นบังครึ่งตัว ตั้งท่าอัศวิน',chg:'หลับตาสวดคำปฏิญาณ ออร่ารอบดาบสว่างขึ้น'});
 const F0={title:k==='dragon'?'🐉 สู้กับ':k==='demon'?'😈 เผชิญหน้า':'⚔️ ดวลกับ',intro:pick(['ลมพัดเสื้อคลุมปลิว แสงเวทรอบตัวทั้งคู่วูบวาบ…','ฝูงชนเงียบกริบ มีแค่เสียงหัวใจคุณเต้น','วงเวทใต้เท้าศัตรูเริ่มเรืองแสง','ทั้งสองฝ่ายจ้องตากัน อากาศรอบตัวหนักขึ้นจากมานาที่อัดแน่น']),
  tech:DTK[k]||DTK.mage,hint:H,sec:s[1],secL:`${s[0]} ${K.mv==='muscle'?'ท่าไม้ตาย':'ร่ายสกิล'}`,secV:'คุณปลดปล่อย',mp:s[2],resN:s[3].replace(/^\S+ /,''),resIc:s[3].split(' ')[0],resC:s[4],en,wpn,x:{...x,f:(D,e,md,ed)=>x.f(D,e,md,ed,K)},
  rep:[['ศัตรูแทงเบาๆ','ศัตรูปาเวทเบาๆ'],['กระบี่','ดาบ']]};try{return typeof fFlX==='function'?fFlX(F0,K,name,k):F0}catch(e){console.error('fFlX',e);return F0}});
// ฉากหลังตอนดวล: ใช้ฉากแฟนตาซีตามศัตรู
{const _fs2=fScene;fScene=function(K){try{if(typeof DU!=='undefined'&&DU&&DU.fl&&!window._fanScForce){const k=dKind(DU.name);return k==='dragon'?'dragon':k==='demon'?'dk':k==='mage'?'ritual':k==='beast'?(K.w==='mon'?'cave':'forest'):'tour'}}catch(e){}return _fs2(K)}}
if(typeof dusBg==='function'){const _db=dusBg;dusBg=function(){try{if(on()&&typeof DU!=='undefined'&&DU&&FSS){const K=FN(),id=fScene(K),k='fan:'+id;if(DUS.bg&&DUS.bgK===k)return DUS.bg;const b=document.createElement('canvas');b.width=PXW;b.height=PXH;b.getContext('2d').drawImage(fStill(id,PXW,PXH),0,0);DUS.bg=b;DUS.bgK=k;DUS.scars=0;return b}}catch(e){}return _db.apply(this,arguments)};window.dusBg=dusBg}


// =================== 🧩 แพ็กแฟนตาซี: ธาตุแพ้ทาง · คิดค้นเวท · บัตรนักผจญภัย · หอคอยไร้ที่สิ้นสุด · สัญญาภูต · เกิดเป็นสัตว์ ===================
const X9=K=>K.x9||(K.x9={});const LT=K=>X9(K).lt||(X9(K).lt=[]);
// ---------- 🔥 ธาตุแพ้ทาง ----------
const ELW={fire:'wind',wind:'earth',earth:'water',water:'fire',light:'shadow',shadow:'light'};
const elIc=e=>e&&EL[e]?EL[e][0]:'⚪',elN=e=>e&&EL[e]?EL[e][1]:'ไร้ธาตุ';
function elAdv(a,b){if(!a||!b)return 0;if(ELW[a]===b)return 1;if(ELW[b]===a)return -1;return 0}
function enEl(name,k){const n=String(name||'');if(/มังกรไฟ|เพลิง|ไฟ|ลาวา|ฟีนิกซ์/.test(n))return 'fire';if(/น้ำ|ทะเล|นาคา|งู|ปลา|หิมะ|น้ำแข็ง/.test(n))return 'water';if(/ลม|พายุ|นก|กริฟ|ปีก/.test(n))return 'wind';if(/หิน|ดิน|โกเลม|ภูผา|หมี|ออร์ค|โอเกอร์/.test(n))return 'earth';if(/นักบวช|นักบุญ|เทพ|ผู้กล้า|อัศวินศักดิ์|ศักดิ์สิทธิ์/.test(n))return 'light';if(/มาร|ปีศาจ|เงา|ลิช|แวมไพร์|อันเดด|กระดูก|ผี/.test(n))return 'shadow';
 const T={dragon:'fire',demon:'shadow',hero:'light',beast:pick(['earth','wind']),knight:pick(['light','earth']),rogue:'shadow',noble:pick(['light','water','wind'])}[k];if(T)return T;let h=0;for(const c of n)h=h*31+c.charCodeAt(0)>>>0;return ['fire','water','wind','earth','light','shadow'][h%6]}
function myEl(K){const X=X9(K);if(X.sp&&X.sp.eq!=null&&X.sp.L[X.sp.eq]&&X.sp.L[X.sp.eq].el)return X.sp.L[X.sp.eq].el;if(K.mv==='muscle')return null;return K.el||null}
// ---------- 🧪 คิดค้นเวท ----------
const SPS={ball:['ลูก','⚪',1],lance:['หอก','🗡️',1.15],wall:['กำแพง','🧱',.9],rain:['ฝน','🌧️',1.1],ring:['วงแหวน','⭕',1],wing:['ปีก','🪽',1.05],snake:['อสรพิษ','🐍',1.1],blade:['ใบมีด','🔪',1.1]};
const SPF={boom:['ระเบิด','💥',1.15],pierce:['เจาะทะลวง','🎯',1.1],spread:['ลุกลาม','🌫️',1],bind:['ตรึง','⛓️',.95],drain:['ดูดกลืน','🩸',1],mirror:['สะท้อน','🪞',.9],split:['แยกร่าง','👥',1.05],delay:['หน่วงเวลา','⏳',1.2]};
const SPEW={fire:'เพลิง',water:'วารี',wind:'วายุ',earth:'ศิลา',light:'แสง',shadow:'เงา',none:'ไร้ธาตุ'};
// สูตรลับ: ชื่อตำนาน + พลังพิเศษ
const SPL={'light:wing:mirror':['ปีกแสงสะท้อนกาลเวลา',1.8],'shadow:snake:drain':['อสรพิษกลืนวิญญาณ',1.7],'water:ring:bind':['วงแหวนหนาวนิรันดร์',1.6],'fire:rain:spread':['ฝนเพลิงล้างเมือง',1.9],'earth:wall:mirror':['ป้อมปราการที่ตีกลับ',1.5],'wind:blade:split':['พายุพันใบมีด',1.7],'none:ball:delay':['ลูกแก้วที่ระเบิดพรุ่งนี้',1.6],'fire:lance:pierce':['หอกเพลิงเจาะดวงอาทิตย์',1.8],'shadow:wing:split':['ฝูงค้างคาวเงา',1.5],'water:snake:boom':['นาคาวารีระเบิด',1.6],'light:lance:pierce':['หอกพิพากษา',1.8],'earth:rain:boom':['ฝนอุกกาบาต',1.9]};
const SPFAIL=[
 K=>`💥 วงเวทระเบิดใส่หน้า ขนคิ้วไหม้ไปครึ่งข้าง${hurt(.12)}`,
 K=>{money(-R(40,120));return '🔥 ห้องทดลองไฟไหม้ เจ้าของห้องเช่ายึดมัดจำ'},
 K=>`🐸 เวทออกมาเป็นกบสีชมพูร้องเพลงได้ มันกระโดดหนีไปทางหน้าต่าง… และกลายเป็นข่าวลือในเมือง${rep(3)}`,
 K=>'🫖 ได้เวทต้มน้ำชาให้ร้อนพอดีทุกครั้ง ไร้ประโยชน์ในการต่อสู้ แต่เพื่อนบ้านมาขอใช้ทุกเช้า',
 K=>`🌀 วงเวทเปิดประตูเล็กๆ ไปอีกมิติ มีมือยื่นออกมาขโมยรองเท้าคุณไปหนึ่งข้าง`,
 K=>`📜 คุณเขียนสูตรผิดบรรทัดเดียว สามวันต่อมาเพิ่งรู้ว่าผมกลายเป็นสีเขียว${S.int=(S.int||0)+3,''} · 🧠 ปัญญา +3 จากความผิดพลาด`];
function spName(el,sh,fx){const k=`${el}:${sh}:${fx}`;if(SPL[k])return SPL[k][0];return SPS[sh][0]+SPEW[el]+SPF[fx][0]}
function spPow(el,sh,fx){const k=`${el}:${sh}:${fx}`;return (SPL[k]?SPL[k][1]:SPS[sh][2]*SPF[fx][2])}
function spSt(K){const X=X9(K);return X.sp||(X.sp={L:[],eq:null,yr:-1,sel:{el:K.el||'none',sh:'ball',fx:'boom'},tries:0,leg:0})}
function spEls(K){const s=new Set(['none']);if(K.el)s.add(K.el);const P=X9(K).spr;if(P&&P.alive)s.add(P.el);return [...s]}
window.fanLab=function(){const K=FN();if(!K)return;const P=spSt(K),S0=P.sel,els=spEls(K);if(!els.includes(S0.el))S0.el=els[0];
 const ch2=(on,l,js)=>`<button class="opt" style="display:inline-block;width:auto;margin:0;padding:6px 9px;${on?'border-color:#ffd54a;background:#ffd54a22':''}" onclick="${js}">${l}</button>`;
 const can=P.yr!==age()&&!K.kidP&&!isMon(K),cost=60+P.tries*20,known=P.L.some(s=>s.k===`${S0.el}:${S0.sh}:${S0.fx}`);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🧪 ห้องวิจัยเวท</h3><p class="tag2">เอา <b>ธาตุ × รูปทรง × ผล</b> มาผสมกัน ปีละ 1 ครั้ง สูตรบางอย่างเป็นเวทในตำนานที่ไม่มีใครเคยร่ายได้ ส่วนสูตรผิดอาจระเบิดใส่หน้า</p>
 <h4 style="margin:6px 0 4px">ธาตุ <span class="tag2">(ได้ธาตุเพิ่มจากภูตที่ทำสัญญา)</span></h4><div style="display:flex;flex-wrap:wrap;gap:5px">${els.map(e=>ch2(S0.el===e,(e==='none'?'⚪':elIc(e))+' '+SPEW[e],`fanLabS('el','${e}')`)).join('')}</div>
 <h4 style="margin:6px 0 4px">รูปทรง</h4><div style="display:flex;flex-wrap:wrap;gap:5px">${Object.keys(SPS).map(k=>ch2(S0.sh===k,SPS[k][1]+' '+SPS[k][0],`fanLabS('sh','${k}')`)).join('')}</div>
 <h4 style="margin:6px 0 4px">ผล</h4><div style="display:flex;flex-wrap:wrap;gap:5px">${Object.keys(SPF).map(k=>ch2(S0.fx===k,SPF[k][1]+' '+SPF[k][0],`fanLabS('fx','${k}')`)).join('')}</div>
 <div class="item" style="margin-top:8px">ชื่อที่จะได้ (ถ้าสำเร็จ): <b>${known?spName(S0.el,S0.sh,S0.fx):'❓ ยังไม่รู้ ต้องลองดู'}</b><br><span class="tag2">โอกาสสำเร็จราว ${Math.round(spChance(K,S0)*100)}% · ค่าวัตถุดิบ ${cost} เหรียญทอง</span></div>
 <button class="pbtn" style="width:100%;margin-top:6px" ${can&&!known?'':'disabled style="width:100%;margin-top:6px;opacity:.45"'} onclick="fanLabGo()">${known?'✅ รู้สูตรนี้แล้ว':can?'🔬 ทดลองร่าย':'⏳ ปีนี้ทดลองไปแล้ว'}</button>
 ${P.L.length?`<h4 style="margin:10px 0 4px">📖 ตำราเวทของคุณ <span class="tag2">(เวทที่ติดตัวจะเป็นท่าไม้ตายและธาตุตอนดวล)</span></h4>${P.L.map((s,i)=>`<div class="item" style="display:flex;align-items:center;gap:6px;${P.eq===i?'border-left:4px solid #ffd54a':''}"><div style="flex:1">${s.leg?'🌟 ':''}${s.el==='none'?'⚪':elIc(s.el)} <b>${E(s.n)}</b> <span class="tag2">พลัง ×${s.p.toFixed(2)}${s.sold?' · ขายสิทธิ์แล้ว':''}</span></div><button class="opt" style="width:auto;margin:0;padding:5px 8px" onclick="fanLabEq(${i})">${P.eq===i?'ติดตัวอยู่':'ติดตัว'}</button></div>`).join('')}`:''}`,'fanlab')};
function spChance(K,s){const k=`${s.el}:${s.sh}:${s.fx}`,b=.42+Math.min(.3,(S.int||0)/900)+(K.w==='magic'?.08:0)+(K.mv==='hidden'||K.mv==='regress'?.1:0)+spSt(K).tries*.03-(SPL[k]?.18:0)-(s.el==='none'?0:0);return clamp(b,.1,.9)}
window.fanLabS=(k,v)=>{const K=FN();spSt(K).sel[k]=v;fanLab()};
window.fanLabEq=i=>{const K=FN(),P=spSt(K);P.eq=P.eq===i?null:i;fanLab()};
window.fanLabGo=function(){const K=FN(),P=spSt(K),s=P.sel;if(P.yr===age())return;const cost=60+P.tries*20;if((S.money||0)<cost){toast('💰 เงินไม่พอซื้อวัตถุดิบ');return}money(-cost);P.yr=age();P.tries++;closeM();
 mgRune(`🧪 ร่ายสูตร ${SPS[s.sh][0]}${SPEW[s.el]}${SPF[s.fx][0]}`,4+Math.min(2,P.tries>>1),sc=>{const ok=rnd()<spChance(K,s)*(.6+sc*.7);const k=`${s.el}:${s.sh}:${s.fx}`;
  if(!ok){feed(pick(SPFAIL)(K));return}
  const n=spName(s.el,s.sh,s.fx),p=spPow(s.el,s.sh,s.fx),leg=!!SPL[k];P.L.push({k,n,el:s.el==='none'?null:s.el,p,leg});if(P.eq==null)P.eq=P.L.length-1;if(leg)P.leg++;
  try{bkAdd('spell',k)}catch(e){}fxBig(leg?'fw':'mana',leg?1.8:1.3);
  say(`${leg?'🌟 <b>เวทในตำนาน!</b> ':'✨ '}คุณคิดค้นเวท <b>「${E(n)}」</b> สำเร็จ <span class="tag2">พลัง ×${p.toFixed(2)} · ติดตัวเป็นท่าไม้ตายตอนดวล</span>`,leg?'myth':'epic',leg);
  K.pw+=capOf(K)*(leg?.18:.06);
  if(leg||rnd()<.35)queue(()=>evSpellFame(K,P.L[P.L.length-1]));flush()})};
function evSpellFame(K,s){C(`📜 เวท「${s.n}」เป็นที่จับตา`,`สมาคมนักเวทส่งจดหมายมาสามฉบับในสัปดาห์เดียว ฉบับหนึ่งขอซื้อสิทธิ์ ฉบับหนึ่งขอให้ไปสอน และฉบับสุดท้ายไม่มีชื่อผู้ส่ง เขียนแค่ว่า "เวทนั้นเป็นของพวกเรามาก่อน"`,[
 O('💰 ขายสิทธิ์ให้สมาคม',()=>{s.sold=1;feed(`💰 เวทของคุณถูกบรรจุลงตำราเรียนทั่วทวีป${money(R(300,800)*s.p)}${rep(6)}`)},'ได้เงินก้อนใหญ่ แต่ทุกคนจะร่ายได้'),
 O('🎓 ไปสอนแต่ไม่ขาย',()=>{S.int=(S.int||0)+8;feed(`🎓 นักเรียนยี่สิบคนพยายามร่ายตาม ไม่มีใครทำได้ คุณรู้สึกดีอย่างบอกไม่ถูก · 🧠 +8${rep(4)}`)}),
 O('🕵️ ตามหาคนส่งจดหมายฉบับที่สาม',()=>duel('ลัทธิผู้ถือสูตรเงา',Math.round(threat(K)*1.15),w=>{if(w){s.p+=.25;feed(`🕵️ คุณพบห้องใต้ดินที่มีตำราเก่าแก่ สูตรของคุณอยู่ในนั้นจริง… แต่ฉบับของคุณดีกว่า เวทแรงขึ้น (พลัง ×${s.p.toFixed(2)})`)}else feed(`🕵️ พวกเขาหายไปพร้อมสมุดจดสูตรของคุณ${hurt(.2)}`)}),'สู้')])}
// ---------- 🧚 สัญญาภูต ----------
const SPRT={fire:[['🦎','ไฟลี'],['🔥','อิกนิส'],['🐦‍🔥','ซอล']],water:[['🐟','มารีน'],['💧','ดรอป'],['🐚','ไทด์']],wind:[['🕊️','ซิลฟา'],['🍃','ฟลิค'],['🌪️','เกล']],earth:[['🐢','กอร์ม'],['🪨','ปีบเบิล'],['🦔','มอส']],light:[['🌟','ลูเมน'],['🕯️','ฮาโล'],['🦋','ออโรร่า']],shadow:[['🦇','นอคท์'],['🐈‍⬛','ชาโด'],['🕷️','เวสเปอร์']]};
const SPTR={sweet:['🥺 ขี้อ้อน','ชอบให้ลูบหัว งอนง่ายหายเร็ว'],proud:['😤 ทะนงตัว','ไม่ยอมรับว่าคุณเป็นนาย'],lazy:['😪 ขี้เกียจ','นอนทั้งวัน แต่ตอนคับขันเอาจริง'],glut:['🍰 ตะกละ','ต้องให้กินถึงจะยอมช่วย'],jeal:['😾 ขี้หึง','ไม่ชอบให้คุณสนิทกับใคร'],sly:['😼 เจ้าเล่ห์','ช่วยเสมอ แต่ชอบหักเปอร์เซ็นต์']};
const SPLV=['ภูตน้อย','ภูตฝึกหัด','ภูตธาตุ','ภูตอาวุโส','ราชาภูต'];
function sprOf(K){const P=X9(K).spr;return P&&P.alive?P:null}
function evSpirit(K,where){const el=rnd()<.45&&K.el?K.el:pick(Object.keys(SPRT)),c=pick(SPRT[el]),tr=pick(Object.keys(SPTR));
 C(`${c[0]} ภูตธาตุ${elN(el)}ปรากฏตัว`,`${where||pick(['ระหว่างที่คุณนั่งพักริมลำธาร','กลางดึกในห้องสมุด','หลังพายุพัดผ่านหมู่บ้าน','ในซากวิหารเก่า'])} มีแสง${elN(el)}ก้อนเล็กๆ ลอยมาวนรอบตัวคุณ มันพูดได้! "ข้าชื่อ <b>${c[1]}</b> ข้าเลือกเจ้า… อาจจะ" <span class="tag2">นิสัย: ${SPTR[tr][0]} — ${SPTR[tr][1]}</span>`,[
 O('🤝 ทำสัญญาแบบเท่าเทียม',()=>{X9(K).spr={ic:c[0],n:c[1],el,tr,lv:0,bond:55,xp:0,forced:0,alive:1,y0:age(),t:0};fxBig('mana',1.4);say(`🤝 <b>สัญญาภูต</b> — ${c[0]} ${c[1]} (${elN(el)}) ประทับตราลงบนหลังมือคุณ ตอนดวลจะมีปุ่ม 🧚 ภูตช่วย และใช้ธาตุ${elN(el)}ในห้องวิจัยเวทได้`,'epic',true)},'ผูกพันง่าย ภูตโตช้าแต่มั่นคง'),
 O('⛓️ สัญญาบังคับ (ผูกด้วยเลือด)',()=>{X9(K).spr={ic:c[0],n:c[1],el,tr,lv:1,bond:20,xp:0,forced:1,alive:1,y0:age(),t:0};hurt(.1);dark&&dark(3);say(`⛓️ ${c[1]}กรีดร้องตอนตราเลือดประทับลง มันแรงขึ้นทันที… แต่สายตาที่มองคุณเย็นชา`,'bad')},'ภูตแรงขึ้นทันที แต่อาจทรยศ'),
 O('🙅 ปล่อยให้มันไป',()=>{feed(`🙅 ${c[1]}ทำหน้าเหลือเชื่อ "ไม่มีใครเคยปฏิเสธข้า!" แล้วหายวับไป… คุณรู้สึกว่ามันจะกลับมา`);LT(K).push({at:age()+R(2,4),k:'_spr2',el})},'')])}
window.fanSpirit=function(){const K=FN(),P=sprOf(K);if(!P){modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🧚 ภูต</h3><p>ยังไม่มีภูตทำสัญญาด้วย ภูตจะปรากฏตัวเองเมื่อถึงเวลา ในการเดินทาง ในหอคอย หรือตอนที่คุณไม่คาดคิด</p>`,'fanspr');return}
 const can=P.t!==age();
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>${P.ic} ${E(P.n)} <span class="tag2">${SPLV[P.lv]} · ${elIc(P.el)} ${elN(P.el)}</span></h3>
 <div class="tag2">${SPTR[P.tr][0]} — ${SPTR[P.tr][1]}${P.forced?' · ⛓️ สัญญาบังคับ':''}</div>
 <div style="margin:6px 0">💞 ความผูกพัน ${Math.round(P.bond)}/100<div class="hpbar" style="height:8px"><i style="width:${P.bond}%;background:${P.bond<25?'#ff5d73':'#ff8ab0'}"></i></div>⭐ ประสบการณ์ ${P.xp}/${(P.lv+1)*4}<div class="hpbar" style="height:6px"><i style="width:${Math.min(100,P.xp/((P.lv+1)*4)*100)}%;background:#ffd54a"></i></div></div>
 <p style="font-style:italic">"${sprLine(K,P)}"</p>
 ${can?`<div class="mgrid"><button class="opt" onclick="fanSprDo('talk')">💬 คุยเล่น<small>ผูกพัน +</small></button><button class="opt" onclick="fanSprDo('feed')">🍰 ให้ขนม<small>30 เหรียญ · ${P.tr==='glut'?'ชอบมาก':'ผูกพัน +'}</small></button><button class="opt" onclick="fanSprDo('train')">⚡ ฝึกด้วยกัน<small>ประสบการณ์ + · อาจงอน</small></button><button class="opt" onclick="fanSprDo('free')">🕊️ ปลดสัญญา<small>ปล่อยให้เป็นอิสระ</small></button></div>`:'<p class="tag2">ปีนี้ใช้เวลากับภูตไปแล้ว</p>'}`,'fanspr')};
function sprLine(K,P){const b=P.bond;const L={sweet:b>60?'ลูบหัวข้าหน่อยสิ วันนี้ข้าเก่งมากเลยนะ':'ไม่คุยด้วยแล้ว ไม่สนใจข้าเลย',proud:b>60?'ข้ายอมรับเจ้าแล้ว… อย่าให้ใครรู้ล่ะ':'มนุษย์อย่างเจ้า อย่าคิดว่าสั่งข้าได้',lazy:b>60?'ข้าจะตื่นมาช่วยเจ้า… ถ้าจำเป็นจริงๆ นะ':'zzz… อย่ากวน…',glut:b>60?'เจ้าคือคนที่ให้ขนมอร่อยที่สุดในโลก':'หิว… หิวจนช่วยใครไม่ไหวแล้ว',jeal:b>60?'เจ้าเป็นของข้าคนเดียวนะ':(S.spouse?`ข้าไม่ชอบ${E(S.spouse)}เลย`:'เจ้าไปคุยกับใครมาอีกแล้วใช่ไหม'),sly:b>60?'ช่วยฟรีครั้งนี้ ครั้งหน้าคิดดอกเบี้ย':'ข้าช่วยได้นะ ราคาพิเศษสำหรับเจ้า'};return L[P.tr]}
window.fanSprDo=function(a){const K=FN(),P=sprOf(K);if(!P||P.t===age())return;P.t=age();closeM();
 if(a==='talk'){P.bond=Math.min(100,P.bond+(P.tr==='sweet'?12:P.tr==='proud'?4:8));feed(`💬 คุณคุยกับ${P.n}จนดึก ${pick(['มันเล่าเรื่องสมัยที่โลกยังไม่มีมนุษย์','มันถามว่าความฝันคืออะไร','มันแอบหลับไปกลางประโยค','มันหัวเราะเรื่องตลกที่คุณเล่า ทั้งที่มันไม่ตลก'])} · 💞 ${Math.round(P.bond)}`)}
 else if(a==='feed'){if((S.money||0)<30){toast('💰 ไม่มีเงินซื้อขนม');P.t=-1;return}money(-30);P.bond=Math.min(100,P.bond+(P.tr==='glut'?18:7));feed(`🍰 ${P.n}กินขนมจนตัวกลม ${P.tr==='glut'?'มันประกาศว่าจะปกป้องคุณไปตลอดชีวิต':'มันพยักหน้าพอใจ'} · 💞 ${Math.round(P.bond)}`)}
 else if(a==='train'){mgHold(`⚡ ฝึกประสานพลังกับ${P.n}`,sc=>{P.xp+=1+Math.round(sc*3);if(P.tr==='lazy'&&rnd()<.4){P.bond-=4;feed(`😪 ${P.n}บ่นตลอดการฝึก แต่ก็ทำ`)}else feed(`⚡ คุณกับ${P.n}ประสานพลังได้ ${Math.round(sc*100)}%`);sprLv(K,P)})}
 else if(a==='free'){P.alive=0;if(P.bond>=70){feed(`🕊️ ${P.n}ไม่ยอมไป มันบอกว่า "สัญญาไม่ใช่สิ่งที่ผูกข้าไว้กับเจ้า" — แล้วก็อยู่ต่อแบบไม่มีสัญญา`);P.alive=1;P.forced=0;P.bond=100}else{feed(`🕊️ ${P.n}ลอยวนรอบตัวคุณสามรอบ แล้วหายไปในอากาศ${P.forced?' มันไม่หันกลับมามอง':' ทิ้งขนนกเรืองแสงไว้ให้หนึ่งเส้น'}`);if(!P.forced)K.pw+=capOf(K)*.05}}
 render()};
function sprLv(K,P){const need=(P.lv+1)*4;if(P.xp>=need&&P.lv<4){P.xp-=need;P.lv++;fxBig('mana',1.5);say(`${P.ic} <b>${P.n}เติบโตเป็น${SPLV[P.lv]}!</b>${P.lv===4?' ร่างของมันใหญ่ขึ้นจนบังแสงจันทร์':''}`,P.lv===4?'myth':'epic',P.lv===4);K.pw+=capOf(K)*.05*P.lv;if(P.lv===4)queue(()=>evSprKing(K,P))}}
function evSprKing(K,P){C(`👑 ราชาภูต${elN(P.el)}`,`${P.n}ไม่ใช่ภูตตัวเล็กที่ลอยมาวนรอบตัวคุณอีกแล้ว ภูตธาตุ${elN(P.el)}ทั้งแคว้นมาคุกเข่าให้มัน และมันหันมามองคุณ "ข้าเป็นราชาแล้ว… เจ้าจะให้ข้าทำอะไร"`,[
 O('🤝 "อยู่ข้างข้าเหมือนเดิม"',()=>{if(P.bond>=60){P.bond=100;feed(`🤝 ราชาภูตหัวเราะ "เจ้ายังโง่เหมือนเดิม ข้าชอบ" ตราสัญญาบนมือคุณกลายเป็นสีทอง${pw(capOf(K)*.2)}`)}else{P.alive=0;say(`💔 ${P.n}เงียบไปนาน แล้วตอบว่า "เจ้าไม่เคยถามว่าข้าอยากอยู่ไหม" ก่อนจะพาภูตทั้งหมดจากไป`,'bad')}}),
 O('🌍 "ไปปกครองอาณาจักรของเจ้าเถอะ"',()=>{P.alive=0;K.f.sprKing=1;feed(`🌍 ${P.n}ร้องไห้เป็นครั้งแรก ตั้งแต่วันนั้นทุกปีจะมีลมธาตุ${elN(P.el)}พัดผ่านหน้าต่างคุณในวันเดียวกัน`);if(rnd()<.5||P.bond>=80)ending(K,'spr_king','👑 คุณปล่อยราชาภูตกลับไปปกครอง และทั้งทวีปเล่าขานถึงมนุษย์ที่ภูตยอมเรียกว่าเพื่อน','ปล่อยราชาภูต')})])}
function evSprBetray(K,P){C(`⛓️ ${P.n}ไม่ยอมอีกต่อไป`,`ตราเลือดบนหลังมือคุณร้อนจนผิวไหม้ ${P.n}ยืนอยู่ตรงหน้า ตัวใหญ่กว่าที่เคยเห็น "สิบปีที่เจ้าใช้ข้าเหมือนอาวุธ คืนนี้ข้าจะเป็นอาวุธให้เจ้าดู"`,[
 O('⚔️ สู้เพื่อรักษาสัญญา',()=>duel(`ภูต${elN(P.el)} ${P.n}`,Math.round(threat(K)*(1+P.lv*.15)),w=>{if(w){P.bond=30;P.forced=1;feed(`⛓️ คุณชนะ ${P.n}ยอมกลับเข้าตราอย่างเงียบงัน มันจะไม่ลืมคืนนี้`)}else{P.alive=0;feed(`💥 ${P.n}ฉีกตราสัญญาออกพร้อมผิวหนังของคุณ แล้วหายไป${hurt(.3)}`)}}),'สู้'),
 O('🙇 ขอโทษ แล้วปลดสัญญาบังคับ',()=>{if(rnd()<.55){P.forced=0;P.bond=45;feed(`🙇 ${P.n}มองคุณนาน "…ครั้งนี้ข้าจะเชื่อ" ตราเลือดเปลี่ยนเป็นตราธรรมดา`)}else{P.alive=0;feed(`🙇 มันไม่ฟัง มันจากไปพร้อมความแค้นที่ยังไม่จบ`);LT(K).push({at:age()+R(3,6),k:'_spr3',n:P.n,el:P.el})}})])}
// ---------- 🪪 บัตรนักผจญภัย ----------
const GRK=['F','E','D','C','B','A','S','SS','SSS'],GRP=[0,30,80,150,250,400,600,900,1300],GRC=['#9a9a9a','#8ab070','#70b0d0','#7a8aff','#c070ff','#ff8a3a','#ffd54a','#ff5a7a','#ffffff'];
function grOf(K){return X9(K).gr||null}
const grB=r=>`<span style="display:inline-block;min-width:26px;text-align:center;padding:0 5px;border-radius:5px;background:${GRC[r]}33;border:1px solid ${GRC[r]};color:${GRC[r]};font-weight:800">${GRK[r]}</span>`;
function evGuildJoin(K){C('🪪 กิลด์นักผจญภัย',`ป้ายไม้หน้ากิลด์เขียนว่า "รับสมัครทุกเผ่าพันธุ์ ไม่ถามอดีต" พนักงานต้อนรับหูแมวยื่นลูกแก้ววัดพลังมาให้ "แตะตรงนี้ค่ะ ทุกคนเริ่มที่แรงก์ F… ยกเว้นคนที่ลูกแก้วแตก"`,[
 O('✋ แตะลูกแก้ว',()=>mgMash('🔮 อัดพลังใส่ลูกแก้ววัดระดับ',sc=>{const G=X9(K).gr={r:0,p:0,q:0,y:-1,ex:-1,hist:[],riv:pick(['ปาร์ตี้ดาบเงิน','แก๊งพี่น้องตระกูลเกรย์','นักเวทหญิงไร้สังกัด','ปาร์ตี้หมาป่าเหล็ก'])};if(sc>=.95){G.p=60;fxBig('burst',1.6);say('💥 <b>ลูกแก้วแตก!</b> ทั้งกิลด์เงียบกริบ พนักงานเขียนแรงก์ F ด้วยมือสั่น แล้วแอบขีดเส้นใต้สองเส้น · คะแนนเริ่มต้น +60','epic',true)}else feed(`🪪 ได้บัตรแรงก์ ${grB(0)} ลูกแก้วสว่าง${sc>=.6?'จ้า':'นิดหน่อย'} คนข้างหลังหัวเราะคิกคัก`)}),'ลงทะเบียน'),
 O('🙅 ยังไม่สมัคร',()=>{K.f.grNo=age();feed('🙅 คุณเดินผ่านกิลด์ไป ป้ายรับสมัครยังติดอยู่ที่เดิม')},'')])}
const GQ=[ // [ไอคอน, ชื่อ, แรงก์ขั้นต่ำ, ทำงาน(K,r,done)]
 ['🐺','กำจัดหมาป่าเงาที่ขโมยแกะ',0,(K,r,d)=>duel('ฝูงหมาป่าเงา',Math.round(threat(K)*(.6+r*.06)),w=>d(w,w?'🐺 ฝูงหมาป่าแตกกระเจิง ชาวบ้านให้ไข่ไก่มาเต็มตะกร้า':'🐺 หมาป่าฉลาดกว่าที่คิด คุณกลับมาพร้อมรอยกัด'))],
 ['🌿','เก็บสมุนไพรจันทร์เสี้ยว',0,(K,r,d)=>mgCups('🌿 หาสมุนไพรที่ซ่อนใต้ใบไม้',sc=>d(sc>=.5,sc>=.5?'🌿 คุณได้สมุนไพรครบ แถมเจอเห็ดหายากอีกหนึ่งดอก':'🌿 เก็บผิดต้น เป็นหญ้าคันที่ทำให้คันไปสามวัน'),'🌿')],
 ['🐈','ตามหาแมวของคุณยาย',0,(K,r,d)=>{const t=rnd();if(t<.25){d(true,'🐈 แมวของคุณยายคือมังกรน้อยที่แปลงร่างอยู่ มันพ่นไฟใส่ก้นคุณหนึ่งที แต่ก็ยอมกลับบ้าน',2)}else mgCombo('🐈 ไล่จับแมวบนหลังคา',sc=>d(sc>=.5,sc>=.5?'🐈 จับได้! คุณยายให้คุกกี้มาห่อหนึ่ง':'🐈 แมวกระโดดข้ามไปอีกหลัง คุณตกลงในถังน้ำฝน'))}],
 ['📦','คุ้มกันกองคาราวานพ่อค้า',1,(K,r,d)=>C('📦 ทางแยกของคาราวาน','ทางป่าเร็วกว่าแต่มีโจร ทางแม่น้ำปลอดภัยกว่าแต่ช้าสองวัน และพ่อค้าแอบเหลือบมองหีบใบหนึ่งบ่อยผิดปกติ',[O('🌲 ทางป่า',()=>duel('โจรป่า',Math.round(threat(K)*(.7+r*.05)),w=>d(w,w?'🌲 โจรหนีไป พ่อค้าแอบบอกว่าในหีบคือมงกุฎที่ขโมยมา…':'🌲 โจรยึดหีบไปหนึ่งใบ ใบที่พ่อค้าหวงที่สุด'))),O('🌊 ทางแม่น้ำ',()=>d(true,'🌊 ช้าแต่ไม่มีอะไรเกิดขึ้น ยกเว้นพ่อค้าที่บ่นตลอดทาง',.7)),O('🔍 เปิดดูหีบที่น่าสงสัย',()=>{if(rnd()<.5)d(true,'🔍 ในหีบมีเด็กสาวผมเงินถูกมัดอยู่ คุณช่วยเธอออกมาและส่งพ่อค้าให้ทหาร กิลด์ให้รางวัลพิเศษ',2.2);else d(false,'🔍 ในหีบเป็นผ้าไหมธรรมดา พ่อค้าไล่คุณออกจากคาราวาน')})])],
 ['🕵️','สืบเรื่องคนหายในหมู่บ้านริมป่า',1,(K,r,d)=>C('🕵️ หมู่บ้านที่เงียบเกินไป','ห้าคนหายไปในเดือนเดียว ทุกคนเคยไปโบสถ์เก่าบนเนินในคืนวันพระจันทร์เต็มดวง ผู้ใหญ่บ้านไม่ยอมสบตาคุณ',[O('⛪ ไปโบสถ์คืนพระจันทร์เต็มดวง',()=>duel('สาวกลัทธิดวงจันทร์',Math.round(threat(K)*(.75+r*.06)),w=>d(w,w?'⛪ คุณพบคนหายทั้งห้ายังมีชีวิต ถูกขังรอพิธี และผู้ใหญ่บ้านคือหัวหน้าลัทธิ':'⛪ คุณถูกจับมัดไว้กับคนหาย กว่าจะหนีออกมาได้…',1.6))),O('🗣️ เค้นถามผู้ใหญ่บ้าน',()=>{if(rnd()<.4+(S.int||0)/1200)d(true,'🗣️ เขาสารภาพทั้งน้ำตา ลูกสาวเขาเป็นตัวประกันของลัทธิ คุณวางแผนช่วยได้สำเร็จ',1.4);else d(false,'🗣️ เขาไม่พูด และคืนนั้นมีคนหายเพิ่มอีกหนึ่ง')})])],
 ['👺','ทลายรังก็อบลิน',1,(K,r,d)=>mgMash('👺 บุกทลายรังก็อบลิน',sc=>d(sc>=.55,sc>=.55?'👺 รังแตก! คุณพบของที่ก็อบลินขโมยมาจากหมู่บ้านสามแห่ง':'👺 ก็อบลินมีราชาที่ไม่มีใครบอก คุณถอยออกมาแทบไม่ทัน'),24+r*2)],
 ['🎭','คุ้มกันคุณหนูในงานเลี้ยง',2,(K,r,d)=>C('🎭 งานเลี้ยงที่มีมีดซ่อน','คุณหนูตระกูลเวสต์ยิ้มให้ทุกคนอย่างสุภาพ แต่กระซิบกับคุณว่า "แก้วไวน์ของฉันรสแปลกๆ ใช่ไหม"',[O('🍷 ชิงแก้วมาดมก่อน',()=>{if(rnd()<.6){d(true,'🍷 ยาพิษ! คุณจับคนเสิร์ฟได้คาหนังคาเขา คุณหนูมองคุณด้วยสายตาที่ต่างไปจากเดิม',1.6);K.f.grLady=1}else d(false,'🍷 คุณดมผิดแก้ว ทั้งงานเงียบกริบ คุณหนูถูกพาออกไปกลางงาน')}),O('👀 เฝ้าดูคนในงาน',()=>duel('มือสังหารในชุดคนเสิร์ฟ',Math.round(threat(K)*(.8+r*.05)),w=>d(w,w?'👀 คุณหยุดมีดได้ก่อนถึงคอเธอ แขกทั้งงานปรบมือเหมือนเป็นการแสดง':'👀 มือสังหารหนีไปได้ คุณหนูบาดเจ็บที่แขน')))])],
 ['✉️','ส่งจดหมายให้หอคอยทิศเหนือ',2,(K,r,d)=>{if(rnd()<.35)C('✉️ จดหมายที่อุ่นขึ้นเรื่อยๆ','ระหว่างทาง ซองจดหมายเริ่มร้อน และคุณเห็นชื่อตัวเองเรืองแสงผ่านกระดาษ',[O('📨 เปิดอ่าน',()=>d(true,'📨 ในจดหมายเขียนว่า "ผู้ถือจดหมายนี้คือเครื่องสังเวย" คุณเผามันทิ้งแล้วแจ้งกิลด์ ผู้ว่าจ้างหายตัวไปทันที',1.8)),O('🚶 ส่งตามสัญญา',()=>duel('ผู้พิทักษ์หอคอยทิศเหนือ',Math.round(threat(K)*1.1),w=>d(w,w?'🚶 คุณสู้จนรอดจากพิธีสังเวย และได้รางวัลจากกิลด์เป็นสองเท่าฐานหลอกนักผจญภัย':'🚶 คุณหนีออกมาได้พร้อมรอยไหม้รูปวงเวทบนหลัง',2)))]);else d(true,'✉️ ส่งถึงมือจอมเวทชรา เขาให้ทิปเป็นลูกอมที่มีรสชาติเปลี่ยนไปทุกครั้งที่อม')}],
 ['🏛️','สำรวจซากปรักหักพังโบราณ',3,(K,r,d)=>mgRune('🏛️ ถอดรหัสอักษรบนประตูโบราณ',4,sc=>{if(sc>=.6){d(true,'🏛️ ประตูเปิดออก ข้างในคือห้องสมุดของอารยธรรมที่สูญหาย คุณขโมยมาได้หนึ่งเล่ม',1.4);try{spSt(K).tries+=1}catch(e){}}else d(false,'🏛️ กับดักทำงาน เพดานถล่มลงมา')})],
 ['🦹','จับหัวขโมยเงาที่ชาวเมืองกลัว',3,(K,r,d)=>mgCombo('🦹 ไล่ตามหัวขโมยข้ามหลังคา',sc=>d(sc>=.55,sc>=.55?'🦹 จับได้! หัวขโมยคือเด็กกำพร้าที่ขโมยขนมปังแจกเพื่อน คุณจ่ายค่าเสียหายให้ร้านแทน':'🦹 มันหายไปในตรอก ทิ้งกระดาษเขียนว่า "ช้าไปนะ"'))],
 ['🥚','ชิงไข่มังกรจากรังบนผา',4,(K,r,d)=>duel('แม่มังกรผู้เฝ้ารัง',Math.round(threat(K)*(1+r*.05)),w=>{d(w,w?'🥚 คุณได้ไข่มาหนึ่งฟอง… แต่แม่มังกรจำกลิ่นคุณได้แล้ว':'🥚 แม่มังกรพ่นไฟจนคุณกลิ้งตกผา',1.8);if(w&&rnd()<.5)LT(K).push({at:age()+R(2,4),k:'_drEgg'})})],
 ['🗡️','ล่าค่าหัวนักฆ่าไร้หน้า',4,(K,r,d)=>duel('นักฆ่าไร้หน้า',Math.round(threat(K)*(1.05+r*.04)),w=>d(w,w?'🗡️ ใต้หน้ากากคือคนที่คุณเคยเห็นทุกวัน… พนักงานต้อนรับของกิลด์':'🗡️ คุณตื่นมาในห้องพักกิลด์ พร้อมโน้ตว่า "ครั้งหน้าไม่ปล่อยแล้ว"',1.7))],
 ['😈','ค่าหัวขุนพลจอมมาร',6,(K,r,d)=>duel('ขุนพลจอมมาร',Math.round(threat(K)*1.25),w=>d(w,w?'😈 หัวของขุนพลถูกแขวนหน้ากิลด์ ชื่อคุณถูกพูดถึงในราชสำนัก':'😈 ขุนพลหัวเราะแล้วปล่อยคุณไป "กลับไปฝึกมาใหม่ เจ้าเด็กกิลด์"',2.5))],
 ['🌋','ปิดรอยแยกมิติกลางทะเลทราย',5,(K,r,d)=>mgHold('🌋 ประคองวงเวทผนึกรอยแยก',sc=>d(sc>=.6,sc>=.6?'🌋 รอยแยกปิดลง ก่อนปิดคุณเห็นอีกโลกหนึ่งที่มีตึกสูงและรถยนต์…':'🌋 รอยแยกกลืนเสื้อคลุมคุณไป และเกือบกลืนคุณด้วย',2.1))],
 ['💰','คุ้มกันคนเก็บภาษีเข้าหมู่บ้านยากจน',2,(K,r,d)=>C('💰 ภาษีที่ไม่ยุติธรรม','ชาวบ้านผอมโซยืนเรียงแถว คนเก็บภาษีเรียกสามเท่าของที่ประกาศ และหันมายิ้มให้คุณ "ส่วนเกินแบ่งเจ้าครึ่งหนึ่ง"',[O('🤝 รับส่วนแบ่ง',()=>{money(R(150,300));dark&&dark(4);d(true,'🤝 เงินหนักกระเป๋า สายตาชาวบ้านหนักกว่า',.8)}),O('✋ ห้ามเขา',()=>duel('ทหารคุ้มกันคนเก็บภาษี',Math.round(threat(K)*.85),w=>d(w,w?'✋ ชาวบ้านจัดงานเลี้ยงให้คุณ กิลด์ไม่พอใจที่คุณ "ทำลายงานลูกค้า" แต่ก็ให้คะแนนตามสัญญา':'✋ คุณถูกจับข้อหาขัดขวางเจ้าหน้าที่ แต่ชาวบ้านเรี่ยไรเงินประกันตัวให้',1.3)))])]];
function grName(K){const G=grOf(K);return G?`🪪 แรงก์ ${GRK[G.r]}`:''}
function evGuildBoard(K){const G=grOf(K);if(!G)return;G.y=age();const L=GQ.filter(q=>q[2]<=G.r+1),three=[];const pool=L.slice();while(three.length<3&&pool.length)three.push(pool.splice(R(0,pool.length-1),1)[0]);
 let twist='';if(rnd()<.18)twist=`<br><span class="tag2">👀 ${E(G.riv)} ยืนดูกระดานอยู่ข้างๆ — เควสที่คุณไม่เลือกพวกเขาจะเอาไป</span>`;
 C(`📋 กระดานเควส · แรงก์ ${GRK[G.r]}`,`กระดาษเควสใหม่ปักหมุดเต็มกระดาน ${pick(['พนักงานหูแมวกระซิบว่าเควสใบล่างจ่ายดีแต่ไม่มีใครกลับมา','นักผจญภัยรุ่นพี่ถ่มน้ำลายใส่ใบหนึ่งแล้วเดินจากไป','มีใบหนึ่งเขียนด้วยลายมือเด็ก'])}${twist}<br><span class="tag2">คะแนนแรงก์ ${G.p}/${GRP[Math.min(8,G.r+1)]} · เควสแรงก์สูงกว่าคุณ 1 ขั้นได้คะแนน ×2</span>`,
 three.map(q=>O(`${q[0]} ${q[1]} [${GRK[q[2]]}]`,()=>{G.q++;q[3](K,G.r,(ok,txt,mul)=>grDone(K,q,ok,txt,mul||1))},q[2]>G.r?'⚠️ สูงกว่าแรงก์คุณ · คะแนน ×2':'')).concat([O('🍺 นั่งดื่มในกิลด์แทน',()=>{feed(pick(['🍺 คุณได้ยินข่าวลือเรื่องหอคอยที่สูงไม่สิ้นสุดทางตะวันออก','🍺 นักผจญภัยแก่ๆ เล่าว่าเคยเห็นภูตพูดได้ในป่าหลังเมือง','🍺 คุณชนะงัดข้อสามคนติด ได้เหล้าฟรีทั้งคืน']));if(rnd()<.12)queue(()=>evSpirit(K,'ตอนเดินกลับจากกิลด์ตอนเมาๆ'))},'')]))}
function grDone(K,q,ok,txt,mul){const G=grOf(K);if(!G)return;const up=q[2]>G.r?2:1,base=Math.round((12+q[2]*14)*mul*up);
 if(ok){G.p+=base;G.hist.push(q[1]);feed(`${txt}<br><span class="tag2">🪪 เควสสำเร็จ · คะแนน +${base} (${G.p}/${GRP[Math.min(8,G.r+1)]})</span>${money(Math.round((40+q[2]*70)*mul))}${rnd()<.3?lootDrop(K,Math.min(5,1+(q[2]>>1)),'quest'):''}`)}
 else{G.p=Math.max(0,G.p-Math.round(base*.3));feed(`${txt}<br><span class="tag2">🪪 เควสล้มเหลว · คะแนน −${Math.round(base*.3)}</span>${hurt(.12)}`);if(rnd()<.35)feed(`👀 ${E(G.riv)} ปิดเควสนั้นแทนคุณในสัปดาห์ต่อมา และเอามาโม้ทั่วกิลด์`)}
 if(G.r<8&&G.p>=GRP[G.r+1]&&G.ex!==age())queue(()=>evGuildExam(K));try{render()}catch(e){}}
function evGuildExam(K){const G=grOf(K);if(!G||G.r>=8)return;G.ex=age();const to=G.r+1,t=pick(to>=6?['duel','duel','trial']:['duel','quiz','trial']);
 const pass=()=>{G.r=to;fxBig(to>=6?'fw':'confetti',1.5);say(`🪪 <b>เลื่อนเป็นแรงก์ ${grB(to)}</b>${to===6?' — ชื่อคุณถูกส่งเข้าราชสำนัก':to===8?' — ทั้งทวีปมีคนแรงก์นี้ไม่ถึงห้าคน':''}`,to>=6?'myth':'epic',to>=6);K.pw+=capOf(K)*.04*to;if(to===8)queue(()=>evGuildSSS(K));else if(to===6&&rnd()<.6)queue(()=>evGuildRoyal(K))},
  fail=t2=>{G.p=Math.max(GRP[G.r],G.p-20);feed(`📜 สอบเลื่อนแรงก์ไม่ผ่าน ${t2} · ปีหน้าค่อยลองใหม่`)};
 if(t==='duel')C(`📜 สอบเลื่อนแรงก์ ${GRK[to]}`,`กรรมการสอบคืออดีตนักผจญภัยแรงก์ ${GRK[Math.min(8,to+1)]} ที่เกษียณแล้ว เขาถอดแหวนวางบนโต๊ะทีละวง "ข้าจะไม่ใส่แหวนพลังสักวง แค่นี้ก็พอแล้วสำหรับเจ้า"`,[O('⚔️ ดวลสอบ',()=>duel(`กรรมการสอบแรงก์ ${GRK[to]}`,Math.round(threat(K)*(.85+to*.05)),w=>w?pass():fail('— เขาใส่แหวนกลับคืนอย่างเสียดาย')),'ดวลจริง')]);
 else if(t==='quiz'){const Q=pick([['เจอสไลม์สีม่วงในถ้ำ ควรทำอะไรก่อน',['ถอยออกมาแจ้งกิลด์ (สไลม์ม่วงแปลว่ามีราชาสไลม์)','ฟันทันที','เก็บไปเลี้ยง'],0],['ลูกค้าจ่ายเงินเกินราคาเควสสามเท่า แปลว่าอะไร',['เควสอันตรายกว่าที่บอก','ลูกค้าใจดี','กิลด์คิดราคาผิด'],0],['เพื่อนร่วมปาร์ตี้ถูกพิษงู ควรทำอะไร',['รัดเหนือแผลแล้วรีบพากลับ','ดูดพิษออกด้วยปาก','ให้กินสมุนไพรที่ไม่รู้จัก'],0]]);const ord=[0,1,2].sort(()=>rnd()-.5);
  C(`📜 สอบข้อเขียนแรงก์ ${GRK[to]}`,`<b>${Q[0]}</b>`,ord.map(i=>O(Q[1][i],()=>i===Q[2]?pass():fail('— กรรมการขีดฆ่ากระดาษคุณด้วยหมึกแดง'))))}
 else C(`📜 สอบภาคสนามแรงก์ ${GRK[to]}`,'ทิ้งไว้กลางป่าอสูรสามวัน ไม่มีอาหาร ไม่มีอาวุธ มีแค่มีดพับเล่มเดียว',[O('🌲 เอาตัวรอด',()=>mgHold('🌲 เอาตัวรอดในป่าอสูร',sc=>sc>=.55?pass():fail(`— หมีกินเป้คุณไปตั้งแต่คืนแรก${hurt(.15)}`)))])}
function evGuildRoyal(K){C('👑 หมายเรียกจากราชสำนัก','"นักผจญภัยแรงก์ S ผู้นี้ จงมาเข้าเฝ้า" ราชาต้องการให้คุณนำทัพไปปราบอะไรบางอย่างที่เขาไม่ยอมบอกชื่อ',[O('🫡 รับหน้าที่',()=>duel('สิ่งที่ราชาไม่ยอมบอกชื่อ',Math.round(threat(K)*1.3),w=>{feed(w?`🫡 สิ่งนั้นคือพี่ชายของราชาที่ถูกขังไว้ใต้ปราสาทและกลายเป็นอสูร คุณได้ตำแหน่งอัศวินกิตติมศักดิ์${money(1500)}`:`🫡 คุณแพ้และได้รู้ความลับที่ไม่ควรรู้ ราชาสั่งให้ลืมทุกอย่าง${hurt(.3)}`)}),'สู้'),O('🙅 ปฏิเสธ (นักผจญภัยไม่รับใช้ใคร)',()=>{feed(`🙅 ทั้งกิลด์ปรบมือให้คุณ ราชาไม่พอใจ แต่ทำอะไรไม่ได้${rep(8)}`)})])}
function evGuildSSS(K){C('🌟 แรงก์ SSS','บัตรของคุณไม่ใช่ไม้ ไม่ใช่เหล็ก แต่เป็นแผ่นคริสตัลที่ไม่มีช่างคนไหนในทวีปทำได้ — เพราะมันงอกขึ้นมาเองตอนกรรมการแตะ',[
 O('🏰 เป็นหัวหน้ากิลด์คนใหม่',()=>{ending(K,'gr_master','🏰 คุณขึ้นเป็นหัวหน้ากิลด์นักผจญภัย ป้ายหน้ากิลด์ยังเขียนว่า "ไม่ถามอดีต" แต่ทุกคนรู้อดีตของคุณ','หัวหน้ากิลด์')}),
 O('🗺️ ไปยังที่ที่ไม่มีแผนที่',()=>{K.f.grSSS=1;feed(`🗺️ คุณคืนบัตรคริสตัลแล้วเดินออกไปนอกแผนที่ ตำนานบอกว่าคุณยังเดินอยู่${pw(capOf(K)*.2)}`)})])}
// ล่าค่าหัวตัวคุณเอง (โลกมอนสเตอร์)
MEV.push(K=>{const m=MS2(K);if((m.lv|0)<8){feed(`📋 ใบประกาศใหม่ที่กิลด์มนุษย์: "พบ${mName(K)}ผิดธรรมชาติ ค่าหัว 50 เหรียญ" คุณรู้สึกแปลกๆ ที่ตัวเองราคาถูกขนาดนั้น`);return}
 const r=Math.min(8,Math.floor(m.lv/5));C(`📋 ค่าหัวของคุณ · แรงก์ ${GRK[r]}`,`นักผจญภัยแรงก์ ${GRK[r]} สามคนเดินเข้ามาในถิ่นของคุณ ถือใบประกาศที่มีรูปวาดหน้าคุณ (วาดไม่เหมือน)`,[
  O('⚔️ สู้',()=>duel(`ปาร์ตี้นักผจญภัยแรงก์ ${GRK[r]}`,Math.round(threat(K)*1.05),w=>{if(w){m.xp=(m.xp|0)+6;feed(`⚔️ ปาร์ตี้แตกพ่าย ค่าหัวคุณขึ้นเป็นสองเท่าในเช้าวันรุ่งขึ้น`)}else feed(`💥 คุณหนีเข้ารังได้ทันพร้อมแผลจากดาบเงิน${hurt(.25)}`)}),'สู้'),
  O('🫥 ซ่อนตัว',()=>feed('🫥 พวกเขาเดินผ่านคุณไปสามรอบ คนหนึ่งเหยียบหางคุณแล้วขอโทษก้อนหิน')),
  O('🗣️ ลองเจรจา',()=>{if(m.sk.includes('พูดภาษามนุษย์')||rnd()<.25)feed('🗣️ นักผจญภัยคนหนึ่งยอมฟัง เขาฉีกใบประกาศทิ้ง "มอนสเตอร์ที่พูดได้ไม่ใช่มอนสเตอร์"');else feed(`🗣️ คุณร้องเสียงประหลาด พวกเขาวิ่งหนีไปเรียกกำลังเสริม${hurt(.1)}`)})])});
// ---------- 🗼 หอคอยไร้ที่สิ้นสุด ----------
let TWS=null;
const TWR=[['fight','⚔️','ห้องต่อสู้',4],['chest','🎁','หีบสมบัติ',2],['fount','⛲','น้ำพุฟื้นพลัง',1.3],['riddle','🗿','รูปปั้นถามปริศนา',1.2],['trap','🪤','ทางเดินกับดัก',1.5],['shop','🧙','พ่อค้าระหว่างชั้น',.8],['shrine','⛩️','ศาลเจ้าลึกลับ',.9],['elite','💀','ศัตรูชั้นยอด',1.1],['mystery','❓','ห้องปริศนา',1.2]];
const twBest=()=>{try{return LS.get('murim_fantw',0)|0}catch(e){return 0}};
let TWRNG=null;const twR=()=>TWRNG?TWRNG():rnd();const twWk=()=>Math.floor((Date.now()+3*864e5)/(7*864e5));const twMul=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
function twPick(){let s=TWR.reduce((a,x)=>a+x[3],0)*twR();for(const x of TWR){s-=x[3];if(s<=0)return x}return TWR[0]}
function twEnemy(fl){const T=[['สไลม์ยักษ์','water'],['โกเลมหิน','earth'],['ซาลาแมนเดอร์','fire'],['ฮาร์ปี้','wind'],['อัศวินชุดเกราะผี','shadow'],['ทูตสวรรค์ตกสวรรค์','light'],['มิมิค','earth'],['หมาป่าสายฟ้า','wind'],['ลิชเฝ้าชั้น','shadow'],['นาคาเรศ','water'],['ไฟเรืองจอมทัพ','fire'],['ไวเวิร์นขาวเงิน','light']];return T[(fl*7+Math.floor(twR()*4))%T.length]}
function twBoss(fl){const wo=TWS&&TWS.wk?twWk()%8:0;fl=fl+wo*10;const B=[['ราชาก็อบลินสวมมงกุฎสนิม','earth'],['แม่มดสามหน้า','shadow'],['ไคเมร่าสามหัว','fire'],['อัศวินมังกรน้ำแข็ง','water'],['ราชินีฮาร์ปี้','wind'],['ผู้พิพากษาแห่งแสง','light'],['เงาของตัวคุณเอง','shadow'],['มังกรเฝ้าหอคอย','fire']];return B[Math.floor(fl/10-1)%B.length]}
window.fanTower=function(){const K=FN();if(!K)return;const X=X9(K),T=X.tw||(X.tw={best:0,y:-1,runs:0});const can=T.y!==age()&&!K.kidP&&age()>=12;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🗼 หอคอยไร้ที่สิ้นสุด</h3><p>ไม่มีใครรู้ว่าใครสร้าง ไม่มีใครเคยเห็นยอด ทุกชั้นเปลี่ยนไปทุกครั้งที่เข้า ทุก 10 ชั้นมีผู้เฝ้า และ<b>ธาตุของผู้เฝ้าชั้นถัดไปจะสลักไว้ที่ประตู</b></p>
 <div class="item">🏆 ชั้นสูงสุดในชีวิตนี้: <b>${T.best}</b> · ทุกชีวิต: <b>${Math.max(twBest(),T.best)}</b> · ขึ้นมาแล้ว ${T.runs} ครั้ง</div>
 <div class="item">🔮 ธาตุที่คุณใช้ตอนดวล: <b>${elIc(myEl(K))} ${elN(myEl(K))}</b> <span class="tag2">(เปลี่ยนได้ด้วยเวทที่ติดตัวในห้องวิจัย)</span><br>⛓️ ไฟชนะลม · ลมชนะดิน · ดินชนะน้ำ · น้ำชนะไฟ · แสงกับเงาแพ้ทางกัน</div>
 <button class="pbtn" style="width:100%" ${can?'':'disabled style="width:100%;opacity:.45"'} onclick="twStart()">${can?'🚪 เข้าหอคอย (ปีละครั้ง)':age()<12?'อายุ 12 ปีขึ้นไป':'⏳ ปีนี้เข้าไปแล้ว'}</button>
 <div class="item" style="margin-top:8px;border-left:4px solid #ffd54a">📅 <b>หอคอยประจำสัปดาห์</b> — ทุกคนเจอประตูและบอสชุดเดียวกันทั้งสัปดาห์<br><span class="tag2">บอสสัปดาห์นี้: ${(()=>{const o=TWS;TWS={wk:1};const b=[10,20,30].map(f=>twBoss(f));TWS=o;return b.map(x=>elIc(x[1])+' '+x[0]).join(' → ')})()}<br>สถิติสัปดาห์นี้ของคุณ: <b>${(()=>{const W=LS.get('murim_fantww',{})||{};return W.wk===twWk()?W.best:0})()}</b> ชั้น</span></div>
 <button class="gbtn" style="width:100%;margin-top:4px" ${can?'':'disabled style="width:100%;margin-top:4px;opacity:.45"'} onclick="twStart(1)">📅 เข้าหอคอยประจำสัปดาห์</button>`,'fantw')};
window.twStart=function(wk){const K=FN(),T=X9(K).tw;if(!T||T.y===age())return;T.y=age();T.runs++;TWS={fl:1,hp:S.hp,loot:{g:0,pw:0,it:0},log:[],door:null,K,wk:!!wk};closeM();if(wk)say(`📅 <b>หอคอยประจำสัปดาห์</b> — ทุกคนเจอประตูและบอสชุดเดียวกันทั้งสัปดาห์`,'epic');twFloor()};
function twDoors(){const a=twPick(),b=twPick(),hid=twR()<.3?(twR()<.5?0:1):-1;return [a,b].map((x,i)=>({x,hid:i===hid}))}
function twFloor(){const T=TWS;if(!T)return;TWRNG=T.wk?twMul(twWk()*7919+T.fl*31):null;const K=T.K,boss=T.fl%10===0;const nb=twBoss(Math.ceil(T.fl/10)*10);
 const hd=`<div class="tag2">🗼 ชั้น <b>${T.fl}</b> · ❤️ ${Math.max(0,Math.round(S.hp))}/${S.maxHp} · 💰 ${fmt(T.loot.g)} · 🎁 ${T.loot.it} ชิ้น · 🔮 ${elIc(myEl(K))}</div>${!boss?`<div class="tag2">🚪 ผู้เฝ้าชั้น ${Math.ceil(T.fl/10)*10}: ${elIc(nb[1])} ${nb[0]} ${elAdv(myEl(K),nb[1])>0?'<b style="color:#7aff9a">ชนะทาง</b>':elAdv(myEl(K),nb[1])<0?'<b style="color:#ff6b6b">แพ้ทาง</b>':''}</div>`:''}`;
 if(boss){modal(`<h3>👑 ผู้เฝ้าชั้น ${T.fl}</h3>${hd}<p><b>${nb[0]}</b> ${elIc(nb[1])} ยืนขวางบันไดขึ้นชั้นถัดไป</p><button class="pbtn" style="width:100%" onclick="twBossGo()">⚔️ ดวล</button><button class="opt" onclick="twLeave()">🏃 กลับลงไปพร้อมของที่ได้</button>`,'tw');return}
 T.door=twDoors();modal(`<h3>🗼 ชั้น ${T.fl}</h3>${hd}<p>${pick(['ทางเดินแยกเป็นสองประตู ลมเย็นพัดออกมาจากประตูหนึ่ง','กำแพงกระซิบชื่อคุณ มีประตูสองบานรออยู่','ห้องโถงว่างเปล่ามีแค่ประตูสองบาน บานหนึ่งมีรอยเลือดแห้ง'])}</p>
 <div class="mgrid">${T.door.map((d,i)=>`<button class="opt" onclick="twGo(${i})">${d.hid?'❔ ประตูมืด':d.x[1]+' '+d.x[2]}<small>${d.hid?'มองไม่เห็นว่ามีอะไร':'ประตูบานที่ '+(i+1)}</small></button>`).join('')}</div>
 <button class="opt" onclick="twLeave()">🏃 กลับลงไปพร้อมของที่ได้</button>`,'tw')}
window.twGo=function(i){const T=TWS;if(!T||!T.door)return;const d=T.door[i];T.door=null;closeM();twRoom(d.x[0])};
function twNext(t){const T=TWS;if(!T)return;if(t)T.log.push(t);if(S.hp<=S.maxHp*.08){return twOut(true)}T.fl++;setTimeout(twFloor,250)}
function twMsg(t,cb){modal(`<h3>🗼 ชั้น ${TWS.fl}</h3><p>${t}</p><button class="pbtn" style="width:100%" onclick="closeM();(${cb})()">ต่อไป ▶</button>`,'tw')}
window._twN=()=>twNext();
function twRoom(k){const T=TWS,K=T.K,fl=T.fl,pw0=capOf(K)*(.5+fl*.05),hp=f=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*f))};
 const done=t=>twMsg(t,'window._twN');
 if(k==='fight'||k==='elite'){const en=twEnemy(fl),m=k==='elite'?1.4:1,adv=elAdv(myEl(K),en[1]);const my=(S.power||capOf(K))*(1+adv*.25)*(.75+rnd()*.5),ep=pw0*m;
  modal(`<h3>${k==='elite'?'💀':'⚔️'} ${en[0]} ${elIc(en[1])}</h3><p class="tag2">${adv>0?'🟢 ธาตุคุณชนะทาง':adv<0?'🔴 ธาตุคุณแพ้ทาง':'⚪ ธาตุไม่ได้เปรียบใคร'}</p><div class="mgrid"><button class="opt" onclick="twF(1)">⚔️ สู้ตรงๆ<small>โอกาสราว ${Math.round(clamp(my/ep*.6,.1,.95)*100)}%</small></button><button class="opt" onclick="twF(2)">🔮 ใช้มานา 15<small>${K.mp>=15?'แรงขึ้นมาก':'มานาไม่พอ'}</small></button><button class="opt" onclick="twF(0)">💨 แอบผ่าน<small>${k==='elite'?'ยาก':'อาจโดนลอบตี'}</small></button></div>`,'tw');
  window.twF=a=>{closeM();let w;if(a===2&&K.mp>=15){K.mp-=15;w=rnd()<clamp(my*1.5/ep*.6,.15,.97)}else if(a===0){w=rnd()<(k==='elite'?.3:.6);if(w)return done('💨 คุณเดินเลียบกำแพงผ่านไปได้ มันไม่ทันเห็น');hp(.12);return done(`💨 มันหันมาพอดี… คุณวิ่งหนีขึ้นบันไดพร้อมแผล`)}else w=rnd()<clamp(my/ep*.6,.1,.95);
   if(w){const g=Math.round((20+fl*6)*m);T.loot.g+=g;if(k==='elite'&&rnd()<.6){T.loot.it++;T.loot.pw+=capOf(K)*.02}done(`⚔️ ${en[0]}สลายเป็นผลึก · 💰 +${g}${k==='elite'?' · ของดรอปชั้นยอด':''}`)}else{hp(k==='elite'?.25:.15);done(`💥 ${en[0]}แรงกว่าที่คิด คุณถอยมาตั้งหลัก`)}};return}
 if(k==='chest'){modal(`<h3>🎁 หีบสมบัติ</h3><p>หีบไม้ประดับทองตั้งอยู่กลางห้อง ฝาแง้มนิดหนึ่ง… หรือมันเพิ่งหายใจ?</p><div class="mgrid"><button class="opt" onclick="twC(1)">🔓 เปิดเลย</button><button class="opt" onclick="twC(2)">🗡️ แทงก่อนเปิด</button><button class="opt" onclick="twC(0)">🚶 ไม่เอา</button></div>`,'tw');
  window.twC=a=>{closeM();const mim=rnd()<.28;if(a===0)return done(mim?'🚶 พอคุณเดินผ่าน หีบแลบลิ้นยาวออกมาไล่เลีย… โชคดีที่ไม่เปิด':'🚶 คุณเดินผ่านไป ได้ยินเสียงเหรียญกระทบกันในหีบข้างหลัง');if(mim&&a===1){hp(.2);return done('👅 <b>มิมิค!</b> หีบงับแขนคุณ กว่าจะดึงออกมาได้…')}if(!mim&&a===2&&rnd()<.4)return done('🗡️ คุณแทงหีบจนพัง ของข้างในพังด้วย เหลือแต่เศษแก้ว');const g=Math.round(40+fl*12);T.loot.g+=g;if(rnd()<.4)T.loot.it++;done(`🎁 ${mim?'มิมิคตายคาดาบ ในท้องมันมีของ!':'ในหีบมีของจริง'} · 💰 +${g}`)};return}
 if(k==='fount'){S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.35));K.mp=Math.min(K.mpM,K.mp+20);return done('⛲ น้ำพุใสจนเห็นเงาตัวเองตอนเด็ก ดื่มแล้วแผลหายไปครึ่งหนึ่ง · ❤️ +35% · 🔮 +20')}
 if(k==='riddle'){const Q=pick([['ข้ามีเมืองแต่ไม่มีบ้าน มีป่าแต่ไม่มีต้นไม้ มีน้ำแต่ไม่มีปลา ข้าคืออะไร',['แผนที่','ความฝัน','กระจก'],0],['ยิ่งเอาออกยิ่งใหญ่ขึ้น คืออะไร',['หลุม','หนี้','ความกลัว'],0],['พูดได้ทุกภาษาแต่ไม่มีปาก คืออะไร',['เสียงสะท้อน','หนังสือ','ภูต'],0],['ข้าถูกแตกได้โดยไม่ต้องแตะ คืออะไร',['สัญญา','แก้ว','หัวใจ'],0]]),o=[0,1,2].sort(()=>rnd()-.5);
  modal(`<h3>🗿 รูปปั้นถามปริศนา</h3><p>"<b>${Q[0]}</b>"</p><div class="mgrid">${o.map(i=>`<button class="opt" onclick="twQ(${i===Q[2]?1:0})">${Q[1][i]}</button>`).join('')}</div>`,'tw');
  window.twQ=c=>{closeM();if(c){T.loot.pw+=capOf(K)*.03;S.int=(S.int||0)+3;done('🗿 รูปปั้นยิ้ม แล้วเปิดทางลับให้ พลังไหลเข้าตัวคุณ · 🧠 +3')}else{hp(.1);done('🗿 รูปปั้นตบคุณด้วยมือหิน "ผิด"')}};return}
 if(k==='trap')return mgHold('🪤 เดินผ่านทางกับดักให้รอด',sc=>{if(sc<.5)hp(.18*(1-sc));done(sc>=.5?'🪤 คุณหลบใบมีดได้ทุกใบ เหมือนเต้นรำ':'🪤 ใบมีดเฉือนเสื้อคลุมและผิวคุณ')});
 if(k==='shop'){modal(`<h3>🧙 พ่อค้าระหว่างชั้น</h3><p>ชายแก่ถือตะเกียงนั่งขายของอยู่ตรงบันได "ข้าอยู่ทุกชั้น ทุกหอคอย ทุกยุค… ราคาเป็นมิตร"</p><div class="mgrid"><button class="opt" onclick="twS(1)">🧪 ยาฟื้นพลัง<small>80 เหรียญจากของที่ได้</small></button><button class="opt" onclick="twS(2)">📜 แผนที่ชั้นถัดไป<small>60 · ข้ามไป 2 ชั้น</small></button><button class="opt" onclick="twS(0)">👋 ลาก่อน</button></div>`,'tw');
  window.twS=a=>{closeM();if(a===1&&T.loot.g>=80){T.loot.g-=80;S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.5));done('🧪 ยารสชาติเหมือนน้ำผึ้งผสมสนิม แต่ได้ผล · ❤️ +50%')}else if(a===2&&T.loot.g>=60){T.loot.g-=60;T.fl+=2;done('📜 แผนที่พาคุณขึ้นบันไดลับ ข้ามไปสองชั้น')}else done(a?'🧙 "เงินไม่พอนะหนุ่มน้อย" เขาหัวเราะแล้วหายไป':'👋 พ่อค้าโบกมือ "เจอกันชั้นถัดไป"')};return}
 if(k==='shrine'){const P=sprOf(K);if(!P&&rnd()<.4&&!isMon(K))return evSpiritTw();modal(`<h3>⛩️ ศาลเจ้าลึกลับ</h3><p>ศาลเจ้าเล็กๆ มีกระดาษคำอธิษฐานเก่าแขวนอยู่เต็ม เขียนด้วยภาษาที่คุณอ่านไม่ออก แต่กลับเข้าใจ</p><div class="mgrid"><button class="opt" onclick="twH(1)">🙏 อธิษฐานขอพลัง</button><button class="opt" onclick="twH(2)">💰 ถวายเงิน 100</button><button class="opt" onclick="twH(0)">🚶 ผ่านไป</button></div>`,'tw');
  window.twH=a=>{closeM();if(a===1){if(rnd()<.6){T.loot.pw+=capOf(K)*.05;done('🙏 แสงอุ่นตกลงบนไหล่คุณ ✨ พลังเพิ่ม')}else{hp(.15);done('🙏 ศาลเจ้าเอาอะไรบางอย่างไปจากคุณแทน คุณจำไม่ได้ว่าอะไร')}}else if(a===2&&T.loot.g>=100){T.loot.g-=100;T.loot.it+=2;done('💰 ประตูลับเปิดออก ข้างในมีของสองชิ้นรออยู่')}else done('🚶 คุณเดินผ่าน กระดาษคำอธิษฐานทั้งหมดหันมาตามคุณ')};return}
 if(k==='mystery'){const r=R(0,4);return done(['❓ ห้องว่างเปล่า มีแค่กระดาษเขียนว่า "ชั้นนี้ยังสร้างไม่เสร็จ ขออภัยในความไม่สะดวก"','❓ คุณเจอโครงกระดูกนักผจญภัยถือบันทึก ชั้นสูงสุดที่เขาเขียนไว้คือ '+(fl+R(5,40))+' · 💰 +'+(T.loot.g+=50,50),'❓ ห้องกลับหัว คุณเดินบนเพดานไปถึงประตูอีกฝั่ง เวียนหัวนิดหน่อย','❓ มีกระจกบานใหญ่ เงาในกระจกขยิบตาให้คุณ แล้วชี้ไปที่ประตูซ้าย… คุณข้ามไปอีกชั้น'+(T.fl++,''),'❓ ลูกแมวดำนั่งอยู่กลางห้อง พอคุณลูบหัว มันกลายเป็นเหรียญทอง 30 เหรียญ'+(T.loot.g+=30,'')][r])}
 done('…')}
function evSpiritTw(){const K=TWS.K;closeM();evSpirit(K,'ที่ศาลเจ้าในหอคอยชั้น '+TWS.fl);const iv=setInterval(()=>{if(!choice._cur&&!modalOpen){clearInterval(iv);twNext()}},500)}
window.twBossGo=function(){const T=TWS,K=T.K,b=twBoss(T.fl);closeM();window._twEl=b[1];duel(b[0],Math.round(capOf(K)*(.7+T.fl*.035)),w=>{window._twEl=null;if(w){try{const X=X9(K);(X.twb=X.twb||[]).includes(b[0])||X.twb.push(b[0])}catch(e){}const g=200+T.fl*25;T.loot.g+=g;T.loot.it+=2;T.loot.pw+=capOf(K)*.06;fxBig('fw',1.6);twMsg(`👑 <b>${b[0]}</b> ล้มลง บันไดสู่ชั้น ${T.fl+1} เปิดออก · 💰 +${g} · ของดรอป 2 ชิ้น`,'window._twN')}else twOut(true,b[0])})};
window.twLeave=()=>{closeM();twOut(false)};
function twOut(ko,by){const T=TWS;if(!T)return;TWS=null;TWRNG=null;if(T.wk){try{const W=LS.get('murim_fantww',{})||{},top0=ko?T.fl-1:T.fl;if(W.wk!==twWk())Object.assign(W,{wk:twWk(),best:0});if(top0>W.best){W.best=top0;LS.set('murim_fantww',W)}}catch(e){}}const K=T.K,X=X9(K).tw,top=ko?T.fl-1:T.fl;X.best=Math.max(X.best,top);try{if(top>twBest())LS.set('murim_fantw',top)}catch(e){}
 const keep=ko?.5:1,g=Math.round(T.loot.g*keep);money(g);if(T.loot.pw)K.pw+=T.loot.pw*keep;let it='';for(let i=0;i<Math.round(T.loot.it*keep);i++)it+=lootDrop(K,Math.min(5,1+Math.floor(top/12)),'tower');if(ko)S.hp=Math.max(1,Math.round(S.maxHp*.15));
 say(`🗼 <b>หอคอยไร้ที่สิ้นสุด</b> — ${ko?`${by?by+'ซัด':'คุณหมดแรง'}จนหมดสติ ตื่นมาที่ทางเข้าหอคอย ของหายไปครึ่งหนึ่ง`:'คุณเดินลงมาเองพร้อมของที่ได้'} · ชั้นสูงสุดครั้งนี้ <b>${top}</b>${top>=X.best&&top>0?' 🏆 สถิติใหม่':''} · 💰 +${fmt(g)}${it}`,top>=30?'myth':'epic',top>=30);
 if(top>=50&&!K.f.tw50){K.f.tw50=1;queue(()=>evTower50(K))}try{render();saveGame()}catch(e){}}
function evTower50(K){C('🗼 ชั้นที่ไม่มีใครเคยถึง','ประตูชั้น 51 ไม่มีลูกบิด มีแค่ช่องให้วางมือ และข้อความเดียว: "ถ้าเปิด เจ้าจะไม่ได้กลับลงไป"',[O('✋ วางมือ',()=>ending(K,'tw_top','🗼 คุณเปิดประตูชั้น 51 และไม่เคยกลับลงมา ทุกปีจะมีชั้นใหม่งอกขึ้นบนยอดหอคอยหนึ่งชั้น ผู้คนเชื่อว่าคุณยังสร้างมันอยู่','ขึ้นไปบนยอดหอคอย')),O('🚶 ยังไม่ใช่ตอนนี้',()=>feed('🚶 คุณถอยออกมา ประตูกระซิบว่า "ข้าจะรอ"'))])}
regEnd([['spr_king','👑','เพื่อนของราชาภูต','ปล่อยภูตที่เลี้ยงมาไปเป็นราชา'],['gr_master','🏰','หัวหน้ากิลด์ SSS','ไต่แรงก์จาก F ถึง SSS'],['tw_top','🗼','ผู้สร้างชั้นใหม่','ขึ้นไปถึงชั้น 51 ของหอคอย',1]],['hero','trash','lost','magic','noble']);
// ---------- ปีละครั้ง: เหตุการณ์ของแพ็ก ----------
{const _fy=fanYear;fanYear=function(){const r=_fy.apply(this,arguments);try{const K=FN();if(!K||!S.alive||K.end||K.kidP)return r;const G=grOf(K),P=sprOf(K),mon=isMon(K);let q=0;
 if(!mon&&!G&&age()>=15&&(K.w!=='magic'&&K.w!=='noble'||K.grad||age()>=17)&&K.f.grNo!==age()-1&&rnd()<.5){queue(()=>evGuildJoin(K));q++}
 else if(G&&G.y!==age()&&rnd()<.6){queue(()=>evGuildBoard(K));q++}
 if(!mon&&!P&&!X9(K).spr&&age()>=10&&rnd()<.05&&!q){queue(()=>evSpirit(K));q++}
 if(P){P.xp+=1;if(P.forced&&P.bond<25&&age()-P.y0>=3&&rnd()<.25)queue(()=>evSprBetray(K,P));else if(rnd()<.18&&!q)feed(`${P.ic} ${P.n}: "${sprLine(K,P)}"`);sprLv(K,P)}
 for(const L of LT(K).slice())if(L.at<=age()){LT(K).splice(LT(K).indexOf(L),1);queue(()=>packLater(K,L))}
 if(QU.length)flush()}catch(e){console.error('pack year',e)}return r}}
function packLater(K,L){if(L.k==='_spr2'&&!sprOf(K))return evSpirit(K,'ภูตตัวที่คุณเคยปฏิเสธกลับมาพร้อมขนมเป็นของขวัญ');
 if(L.k==='_spr3')return duel(`ภูตแค้น ${L.n}`,Math.round(threat(K)*1.2),w=>feed(w?`⛓️ ${L.n}สลายไปพร้อมคำว่า "ข้าแค่อยากให้เจ้าขอโทษให้จริง"`:`⛓️ ${L.n}เผาบ้านคุณแล้วหายไป${hurt(.25)}`));
 if(L.k==='_drEgg')return C('🥚 ไข่มังกรฟักแล้ว','ไข่ที่คุณได้จากเควสร้าวตอนตีสาม ลูกมังกรตัวเท่าแมวคลานออกมา จ้องหน้าคุณ แล้วเรียกคุณว่า "แม่"',[O('🐉 เลี้ยงไว้',()=>{K.f.baby=1;K.pw+=capOf(K)*.1;feed('🐉 คุณตั้งชื่อมันว่า "ถ่าน" มันเผาผ้าม่านไปสามผืนในสัปดาห์แรก')}),O('🏔️ คืนแม่มังกร',()=>{feed(`🏔️ แม่มังกรรับลูกคืน แล้ววางเกล็ดทองหนึ่งเกล็ดไว้ให้คุณ${money(800)}${rep(10)}`)})])}
// ---------- ธาตุ / เวท / ภูต ในการดวล ----------
function fFlX(F,K,name,k){const ee=window._twEl||enEl(name,k),me=myEl(K),adv=elAdv(me,ee),X=X9(K),sp=X.sp&&X.sp.eq!=null?X.sp.L[X.sp.eq]:null,P=sprOf(K);
 F.title=(F.title||'⚔️ ดวลกับ');F.rep=(F.rep||[]).concat([[String(name),`${name} ${elIc(ee)}`]]);
 F.tag=`${elIc(me)} vs ${elIc(ee)} ${adv>0?'<b style="color:#7aff9a">ชนะทาง · ทุกท่าแรงขึ้น</b>':adv<0?'<b style="color:#ff6b6b">แพ้ทาง · ระวัง!</b>':'ธาตุไม่ได้เปรียบใคร'}`;
 if(sp){F.sec=sp.n;F.secL=`${sp.el?elIc(sp.el):'⚪'} เวทของคุณ`;F.mp=Math.max(1,(F.mp|0)+(sp.p>=1.5?1:0))}
 F.start=D=>{D.ep=Math.max(1,D.ep*(adv>0?.8:adv<0?1.22:1)*(sp?1/Math.min(1.35,.85+sp.p*.25):1));if(adv)D.txt=adv>0?`${elIc(me)} ธาตุของคุณข่ม${elN(ee)}ของศัตรู!`:`${elIc(ee)} ธาตุ${elN(ee)}ของศัตรูข่มคุณ…`};
 if(P){const pa=elAdv(P.el,ee),b=P.bond;F.x2={ic:P.ic,n:`ภูต ${P.n} ช่วย`,s:`ธาตุ${elN(P.el)}${pa>0?' · ชนะทาง!':pa<0?' · แพ้ทาง':''}`,c:'#ff8ab0',f(D,e,md){if(P.tr==='lazy'&&rnd()<.35)return {t:`😪 ${P.n}หลับอยู่… คุณเขย่าแล้วมันก็ยังหลับ`,good:false};if(P.forced&&b<30&&rnd()<.3)return {me:10,t:`⛓️ ${P.n}ทำเป็นพลาด แล้วพ่นใส่คุณแทน… มันจงใจ`,good:false};
  const m=(1+P.lv*.35)*(pa>0?1.6:pa<0?.6:1)*(b>=70?1.25:1);P.xp+=1;if(P.tr==='sly')try{money(-20)}catch(x){}return {en:md*m,t:`${P.ic} ${P.n}${pick(['พุ่งเข้าใส่ศัตรูพร้อมเสียงร้องเล็กๆ','ขยายร่างขึ้นสามเท่าแล้วปล่อยพลัง','ตะโกน "อย่ามาแตะคนของข้า!"'])} ${pa>0?'· ธาตุชนะทาง!':''}${P.tr==='sly'?' (คิดค่าบริการ 20 เหรียญ)':''}`,good:true,fx:'mana'}}}}
 return F}
// ---------- HUD + เมนู ----------
{const _hd=hud;hud=function(K){let h=_hd(K);try{const G=grOf(K),P=sprOf(K),T=X9(K).tw,ch=[];if(G)ch.push(`<span style="color:${GRC[G.r]}">🪪 ${GRK[G.r]}</span>`);if(P)ch.push(`<span>${P.ic} ${E(P.n)}</span>`);if(T&&T.best)ch.push(`<span>🗼 ${T.best}</span>`);if(ch.length)h=h.replace('<div class="fhC">','<div class="fhC">'+ch.join(''))}catch(e){}return h}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const K=FN();if(on()&&K){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-fa17]')){const G=grOf(K),P=sprOf(K),add=(ic,t,s,f)=>{const b=document.createElement('button');b.className='opt';b.setAttribute('data-fa17',1);b.innerHTML=`${ic} ${t}<small>${s}</small>`;b.onclick=f;d.appendChild(b)};
 if(!isMon(K))add('🧪','ห้องวิจัยเวท',`คิดค้นเวท · ${spSt(K).L.length} เวท`,()=>fanLab());
 add('🗼','หอคอยไร้ที่สิ้นสุด',`สูงสุด ${(X9(K).tw||{}).best|0} ชั้น`,()=>fanTower());
 if(G)add('🪪','บัตรนักผจญภัย',`แรงก์ ${GRK[G.r]} · ${G.p} แต้ม`,()=>fanGuildCard());
 if(P||X9(K).spr)add(P?P.ic:'🧚','ภูต',P?`${E(P.n)} · ${SPLV[P.lv]}`:'ไม่มีสัญญาแล้ว',()=>fanSpirit())}}}catch(e){console.error('pack menu',e)}return r}}
window.fanGuildCard=function(){const K=FN(),G=grOf(K);if(!G)return;const nx=GRP[Math.min(8,G.r+1)];
 modal(`<button class="xbtn" onclick="closeM()">✕</button><div style="border-radius:14px;padding:14px;background:linear-gradient(135deg,#2a2030,#14101c);border:2px solid ${GRC[G.r]};box-shadow:0 0 18px ${GRC[G.r]}55"><div class="tag2">ADVENTURER'S GUILD · บัตรนักผจญภัย</div><div style="display:flex;align-items:center;gap:12px;margin-top:6px"><div style="font-size:42px;font-weight:900;color:${GRC[G.r]};text-shadow:0 0 10px ${GRC[G.r]}">${GRK[G.r]}</div><div><b>${E(S.name)}</b><br><span class="tag2">${WD[K.w].n} · อายุ ${age()}</span></div></div>
 <div style="margin-top:8px">คะแนน ${G.p}/${nx}<div class="hpbar" style="height:8px"><i style="width:${G.r>=8?100:Math.min(100,(G.p-GRP[G.r])/(nx-GRP[G.r])*100)}%;background:${GRC[G.r]}"></i></div></div>
 <div class="tag2" style="margin-top:6px">เควสที่รับ ${G.q} · สำเร็จ ${G.hist.length} · คู่แข่ง: ${E(G.riv)}</div>${G.hist.length?`<div class="tag2" style="margin-top:4px">ล่าสุด: ${G.hist.slice(-3).map(E).join(' · ')}</div>`:''}</div>`,'fangr')};
// ---------- 🐾 เกิดเป็นสัตว์จากหน้าเลือก ----------
const MBIO=[['🌋','ดินแดนสุดขั้ว',/ภูเขาไฟ|ทะเลทราย|ผา|หิมะ|น้ำแข็ง|มังกร|ฟ้า|เมฆ/],['💧','ริมน้ำและใต้ทะเล',/น้ำ|หนอง|บึง|ทะเล|ท่อ|ลำธาร|แม่น้ำ|ทะเลสาบ|ปะการัง/],['💀','ที่ร้างและความตาย',/สุสาน|ร้าง|ศาลเจ้า|โบสถ์|ซาก|หลุม/],['🕳️','ถ้ำและใต้ดิน',/ถ้ำ|เหมือง|ใต้ดิน|รัง(?!มังกร)|โพรง/],['🌲','ป่าและทุ่งหญ้า',/ป่า|ทุ่ง|สวน|ต้นไม้|ดอกไม้|ไร่/]];
function mBio(h){for(const b of MBIO)if(b[2].test(h))return b[1];return 'ดินแดนแปลกประหลาด'}
window.fanMonBirth=function(){const H={};MSP.forEach((s,i)=>{const b=mBio(s[4]);(H[b]=H[b]||[]).push(i)});const hs=Object.keys(H);const icB=b=>(MBIO.find(x=>x[1]===b)||['✨'])[0];
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🐾 เกิดเป็นสัตว์ / มอนสเตอร์</h3><p class="tag2">คุณตายในยุคปัจจุบัน แล้วลืมตาในร่างที่ไม่ใช่มนุษย์ เลือกที่ที่จะลืมตา แล้วชะตาจะเลือกร่างให้</p>
 <div class="mgrid">${hs.map(h=>`<button class="opt" onclick="fanMonGo('${h}')">${icB(h)} ${h}<small>${H[h].length} สายพันธุ์ · ${H[h].slice(0,4).map(i=>MSP[i][0]).join('')}…</small></button>`).join('')}</div>
 <button class="pbtn" style="width:100%;margin-top:6px" onclick="fanMonGo('')">🥚 ไข่ปริศนา (สุ่มจากทุกที่)</button>`,'fanmb')};


// =================== 🐾 หน้าสุ่มกำเนิดแบบสัตว์ ===================
const MNAT=[['😠','ดุร้าย','เห็นอะไรขยับก็กระโจนใส่','fight:.03 pow:2',3],['😨','ขี้ขลาด แต่หนีเก่ง','รอดมาได้เพราะวิ่งเร็วกว่าความกลัว','luck:.04',3],['🍖','ตะกละ','กินทุกอย่างที่เคี้ยวได้ และบางอย่างที่เคี้ยวไม่ได้','hp:20',3],['🧠','ฉลาดผิดสัตว์','แก้ปริศนาได้เร็วกว่านักผจญภัยบางคน','read:.05',2],['😸','ขี้เล่น','ชอบแกล้งนักผจญภัยมือใหม่','luck:.02 hp:8',2],['😴','ขี้เซา','นอนวันละยี่สิบชั่วโมง ตื่นมาแรงเต็มร้อย','hp:12 pow:1',2],['👑','หยิ่งผยอง','คิดว่าตัวเองเป็นราชาตั้งแต่ลืมตา','pow:4',1]];
const MMRK=[['⭐','รอยดาวบนหน้าผาก','สัตว์ตัวอื่นก้มหัวให้โดยไม่รู้ตัว','luck:.03',2],['👁️','ตาสองสี','ตาข้างหนึ่งมองเห็นสิ่งที่ซ่อนอยู่','read:.03',2],['✨','ขนหรือเกล็ดสีทอง','นักล่าตามหาคุณเพราะราคาแพง','pow:3',1],['🌑','เงาไม่ตามตัว','บางทีเงาของคุณก็ไปล่าเอง','fight:.02',1],['🍀','กลิ่นหอมแปลกๆ','ภูตกับสัตว์ตัวเล็กชอบมาอยู่ใกล้','luck:.02',2],['❄️','ตัวเย็นเฉียบ','ทนพิษและไฟได้ดีกว่าสายพันธุ์เดียวกัน','hp:10',2],['—','ไม่มีอะไรพิเศษ','ธรรมดาที่สุดในฝูง','',4]];
const MMEM=[['📖','จำชาติก่อนได้ชัดเจน','จำได้แม้แต่รหัสผ่านไวไฟบ้านเก่า','read:.05',2],['🌫️','จำได้เลือนราง','บางคืนฝันถึงตึกสูงและรถติด','',4],['💭','จำได้แค่ชื่อตัวเอง','และจำได้ว่าตายเพราะอะไร','luck:.02',3],['❓','จำอะไรไม่ได้เลย','สัญชาตญาณสัตว์ล้วนๆ แข็งแรงกว่าแต่โง่กว่า','pow:3 fight:.02',2]];
const MSTA=[['🥚','ฟักออกจากไข่คนเดียว','ไม่มีพ่อแม่ ไม่มีพี่น้อง มีแค่เปลือกไข่ให้กิน','',4],['🐾','มีแม่สัตว์คอยเลี้ยง','แม่ไม่รู้ว่าคุณเป็นคนในชาติก่อน','hp:15',3],['🧺','ถูกเด็กชาวบ้านเก็บไปเลี้ยง','เด็กคนนั้นตั้งชื่อให้คุณว่า "ก้อนกลม"','read:.02',2],['⚔️','เกิดกลางสนามรบนักผจญภัย','ลืมตามาก็เห็นดาบฟันลงมาข้างตัว','fight:.04',2],['👑','เกิดในรังของราชาอสูร','พี่น้องอีกร้อยตัวพร้อมกินคุณ','pow:3',1]];
let MB=null;
const mbW=L=>{let s=L.reduce((a,x)=>a+x[4],0)*rnd();for(let i=0;i<L.length;i++){s-=L[i][4];if(s<=0)return i}return L.length-1};
function mbRoll(first){if(!first){if(MB.left<=0)return;MB.left--}const L=MB.pool;MB.sp=pick(L);MB.nat=mbW(MNAT);MB.mrk=mbW(MMRK);MB.mem=mbW(MMEM);MB.sta=mbW(MSTA);MB.sk=R(0,MSKL.length-1);mbDraw()}
function mbRow(ic,k,v,d,fx,rare){const c=rare===1?'#ffd54a':rare===2?'#c39bff':'#9ad8ff';return `<div class="item" style="border-left:4px solid ${c};margin:5px 0"><div class="tag2">${k}</div><b>${v}</b><div class="tag2">${d}${fx?` · <span style="color:#7aff9a">${fxTxt(fx)}</span>`:''}</div></div>`}
function fxTxt(s){const N={pow:'พลัง',fight:'ต่อสู้',luck:'โชค',read:'อ่านเกม',hp:'เลือด'};return String(s).split(' ').filter(Boolean).map(t=>{const [a,b]=t.split(':');const v=+b,av=Math.abs(v);if(!isFinite(v)||!N[a])return '';return `${N[a]} ${v<0?'−':'+'}${av<1?Math.round(av*100)+'%':av}`}).filter(Boolean).join(' · ')}
function mbDraw(){const s=MSP[MB.sp],n=MNAT[MB.nat],m=MMRK[MB.mrk],e=MMEM[MB.mem],t=MSTA[MB.sta],k=MSKL[MB.sk];
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3 style="text-align:center">🐣 คุณลืมตาอีกครั้ง… ในร่างใหม่</h3>
 <div style="text-align:center;font-size:64px;line-height:1.1;filter:drop-shadow(0 0 12px #9ad8ff66);animation:none">${s[0]}</div>
 <div style="text-align:center"><b style="font-size:18px">${s[1]}</b><div class="tag2">วิวัฒนาการ: ${s[1]} → ${s[2]} → ${s[3]}</div><div class="tag2">📍 ${s[4]} · ${MB.bio||'ไข่ปริศนา'}</div></div>
 ${mbRow('', '🧬 สกิลติดตัวตั้งแต่เกิด',k[0]+' '+k[1],'ได้มาฟรีโดยไม่ต้องกิน',k[2],2)}
 ${mbRow('', '🐾 นิสัย',n[0]+' '+n[1],n[2],n[3],n[4]===1?1:n[4]===2?2:0)}
 ${mbRow('', '🔮 ลักษณะพิเศษ',m[0]+' '+m[1],m[2],m[3],m[4]===1?1:m[4]===2?2:0)}
 ${mbRow('', '💭 ความทรงจำชาติก่อน',e[0]+' '+e[1],e[2],e[3],e[4]===2?2:0)}
 ${mbRow('', '🌄 จุดเริ่มต้น',t[0]+' '+t[1],t[2],t[3],t[4]===1?1:t[4]===2?2:0)}
 <div style="display:flex;gap:6px;margin-top:8px"><button class="gbtn" style="flex:1" ${MB.left>0?'':'disabled style="flex:1;opacity:.45"'} onclick="mbRe()">🔄 เกิดใหม่ (${MB.left})</button><button class="pbtn" style="flex:2" onclick="mbGo()">🐣 ใช้ชีวิตนี้ ▶</button></div>`,'fanmb2')}
window.mbRe=()=>{if(MB)mbRoll(false)};
window.mbGo=function(){const M=MB;if(!M)return;MB=null;window._monForce=M.sp;window._fanMsp=M.sp;window._monRoll={nat:M.nat,mrk:M.mrk,mem:M.mem,sta:M.sta,sk:M.sk};setTimeout(()=>{window._monForce=null},6000);closeM();
 const g=rnd()<.5?'ชาย':'หญิง',gk=Object.keys(GODS)[0];const RR={top:'mon',w:'mon',g,name:nm(g==='หญิง'?'f':'m'),b:wrRollB('iso'),sk:null,hair:pick(HAIR),skin:pick(SKIN),seed:R(1,99999),god:{k:gk,n:GODS[gk].n,scheme:0,fake:0,knew:0,out:''},carry:{}};RR.b.wsk=[];RR.b.wcur=[];
 try{fanBegin(RR)}catch(e){console.error('mon birth menu',e)}};
window.fanMonGo=function(h){const L=h?MSP.map((s,i)=>mBio(s[4])===h?i:-1).filter(i=>i>=0):MSP.map((s,i)=>i);const tot=Math.max(3,(window.vipTot&&window.vipTot())|0);MB={bio:h,pool:L,left:tot};closeM();mbRoll(true)};
{const _fb=fanBegin;fanBegin=function(RR){_fb.apply(this,arguments);const MR=window._monRoll;window._monRoll=null;if(!MR||RR.w!=='mon')return;setTimeout(()=>{try{const K=FN();if(!isMon(K))return;const m=MS2(K);m.nat=MR.nat;m.mrk=MR.mrk;m.mem=MR.mem;m.sta=MR.sta;const k=MSKL[MR.sk];if(k&&!m.sk.includes(k[1]))m.sk.push(k[1]);
 if(MR.mem===0)S.int=(S.int||0)+15;if(MR.sta===2)K.f.child=1;recalcE(K);
 say(`🧬 ${MNAT[MR.nat][0]} นิสัย<b>${MNAT[MR.nat][1]}</b> · ${MMRK[MR.mrk][0]} ${MMRK[MR.mrk][1]} · ${MMEM[MR.mem][0]} ${MMEM[MR.mem][1]} · ${MSTA[MR.sta][0]} ${MSTA[MR.sta][1]} · สกิลติดตัว ${k[0]} ${k[1]}`,'epic');sync();render()}catch(e){console.error('mon roll apply',e)}},1500)}}
{const _rc=recalcE;recalcE=function(K){const o=_rc(K);try{if(isMon(K)){const m=MS2(K);[[MNAT,m.nat],[MMRK,m.mrk],[MMEM,m.mem],[MSTA,m.sta]].forEach(([L,i])=>{if(i!=null&&L[i]&&L[i][3])fxAdd(o,L[i][3])})}}catch(e){}return o}}
window._fanPackT={evGuildBoard:K=>evGuildBoard(K||FN()),evGuildExam:K=>evGuildExam(K||FN()),evSpirit:K=>evSpirit(K||FN()),evGuildJoin:K=>evGuildJoin(K||FN()),K:()=>FN()};


// =================== 🐾 โลกสัตว์อสูร: ตัวสัตว์ pixel 50 สายพันธุ์ × 3 ร่าง · ฉากตามถิ่นเกิด · ฉากตามเหตุการณ์ ===================
//   วาดด้วย Q (พิกัด 480×168) · ร่าง 1→3 ใหญ่ขึ้นและมีรายละเอียดเพิ่ม · ลักษณะพิเศษจากหน้าสุ่มกำเนิดโชว์บนตัว (ขนทอง ตาสองสี รอยดาว เงาแยก)
const MA=[ // [แบบร่าง, สีหลัก, สีเข้ม, สีสว่าง, สีเน้น, ตัวเลือก]
 ['blob','#5ad06a','#2a8a3a','#a8f0a0','#ffffff',{}],['spider','#4a3a5a','#241a2e','#7a6a8a','#c83a3a',{}],['skel','#e8e4d4','#9a9484','#ffffff','#5ad0ff',{}],['quad','#6a7488','#3a4254','#a8b0c0','#5ad0ff',{ear:1,tail:'bushy',snout:1}],
 ['snake','#5a9a3a','#2e5a1e','#9ad06a','#ffd04a',{}],['bat','#4a3a4a','#241a24','#7a6a7a','#ff4a4a',{}],['cater','#7ad04a','#3a8a2a','#c8f07a','#ffd04a',{}],['quad','#5a8a3a','#2e5a1e','#9ac86a','#ff6a2a',{low:1,tail:'long',scale:1}],
 ['frog','#4ab04a','#2a6a2a','#9ae07a','#ff5ab0',{}],['quad','#8a7a6a','#4a3e34','#b8a898','#ff9ab0',{ear:1,tail:'thin',small:1,snout:1}],['dragon','#c8483a','#7a2418','#ff8a6a','#ffd04a',{}],['shroom','#c83a3a','#7a1e1e','#f0e8d8','#ffffff',{}],
 ['golem','#8a8a90','#4a4a52','#b8b8c0','#7ad0ff',{}],['ghost','#d8e8ff','#8aa0c8','#ffffff','#5ad0ff',{}],['octo','#c85a8a','#7a2a4a','#f09ac0','#ffffff',{}],['scorp','#c8963a','#7a5418','#f0c870','#ff4a2a',{}],
 ['bee','#f0c030','#7a5a10','#fff07a','#1a1a1a',{}],['snail','#c8a07a','#7a5a3a','#f0d8b8','#8a6aa8',{}],['quad','#e88a3a','#9a4a18','#ffc08a','#ffffff',{ear:1,tail:'fox',snout:1}],['bird','#a8784a','#5a3a1e','#d8b088','#ffd04a',{}],
 ['plant','#5aa03a','#6a4a2a','#9ad06a','#ff9ab0',{}],['fish','#5aa0d0','#2a5a8a','#a8d8f0','#ffd04a',{}],['quad','#6a4a34','#3a2618','#9a7a5a','#f0e8d8',{ear:1,tusk:1,snout:1,tail:'thin',round:1}],['owl','#8a6a4a','#4a3420','#c8a888','#ffd04a',{}],
 ['quad','#7a5a3a','#3e2a18','#a8885a','#c8d0e0',{ear:1,round:1,big:1,snout:1}],['crab','#d85a3a','#8a2a18','#ff9a7a','#ffffff',{}],['zombie','#8aa070','#4a5a3a','#b8c8a0','#c83a3a',{}],['imp','#c83a4a','#6a1a24','#ff7a8a','#ffd04a',{}],
 ['fairy','#ffe8a0','#c8a050','#ffffff','#9ad8ff',{}],['quad','#2a2430','#100c14','#5a5068','#ffd04a',{ear:1,tail:'cat',small:1}],['moth','#8a7ab0','#4a3a6a','#c8b8e8','#ffe07a',{}],['shark','#7a8aa0','#3a4658','#c8d4e0','#ffffff',{}],
 ['turtle','#5a8a5a','#2e4e2e','#9ac89a','#c8a060',{}],['worm','#d8907a','#8a4a3a','#f0c0a8','#ffffff',{}],['mantis','#7ad04a','#3a7a2a','#c8f07a','#ffffff',{}],['quad','#5a7a4a','#2e4226','#8aa87a','#f0e8a0',{low:1,tail:'long',scale:1,jaw:1}],
 ['quad','#b8885a','#6a4a2a','#e8c8a0','#c8f0ff',{ear:1,antler:1,thin:1,snout:1,tail:'thin'}],['dragon','#5a8ac8','#2a4a7a','#9ac8f0','#ffffff',{noEgg:1}],['octo','#3a3458','#1a1630','#6a6490','#c070ff',{squid:1}],['quad','#8a6a4a','#4a3420','#c8a888','#ffffff',{ear:1,tail:'thick',low:1,snout:1}],
 ['quad','#c87a3a','#7a4218','#f0b07a','#ffffff',{ear:1,tail:'curl',small:1}],['quad','#7a6a5a','#3a3028','#a8988a','#ffffff',{spike:1,small:1,round:1,snout:1}],['bird','#ff8ab0','#c84a7a','#ffc8d8','#2a2a2a',{flamingo:1}],['beetle','#d83a3a','#7a1414','#ff8a7a','#1a1a1a',{}],
 ['blob','#9ad8ff','#4a8ac8','#e8fbff','#ffffff',{ice:1}],['blob','#ff8a3a','#c83a1a','#ffe07a','#ffffff',{fire:1}],['mimic','#a0703a','#5a3a1a','#d8a870','#ffd04a',{}],['sword','#c8d0e0','#6a7080','#ffffff','#c83a6a',{}],
 ['blob','#e8eef8','#a8b8d0','#ffffff','#5ad0ff',{cloud:1}],['bird','#ffe07a','#c8a030','#fff4c0','#ff6a2a',{chick:1}]];
const MSTAGE=[1,1.45,2];
function mE(cx,cy,rx,ry,c){if(rx<=0||ry<=0)return;for(let dy=-ry;dy<=ry;dy+=1){const w=rx*Math.sqrt(Math.max(0,1-(dy/ry)*(dy/ry)));if(w>0)Q(Math.round(cx-w),Math.round(cy+dy),Math.max(1,Math.round(w*2)),1,c)}}
function mO(cx,cy,rx,ry,c,o){mE(cx,cy,rx+1.5,ry+1.5,o);mE(cx,cy,rx,ry,c)}
function mEye(x,y,s,c,c2){Q(x,y,Math.max(2,s),Math.max(2,s),'#1a1420');Q(x,y,Math.max(1,s/2),Math.max(1,s/2),'#ffffff');if(c2){Q(x+s*.5,y+s*.5,Math.max(1,s/2),Math.max(1,s/2),c2)}}
function mTri(x1,y1,x2,y2,x3,y3,c){const minY=Math.floor(Math.min(y1,y2,y3)),maxY=Math.ceil(Math.max(y1,y2,y3));for(let y=minY;y<=maxY;y++){const xs=[];[[x1,y1,x2,y2],[x2,y2,x3,y3],[x3,y3,x1,y1]].forEach(([a,b,c2,d])=>{if((y>=b&&y<d)||(y>=d&&y<b)){xs.push(a+(y-b)*(c2-a)/(d-b))}});if(xs.length>=2){xs.sort((p,q)=>p-q);Q(Math.round(xs[0]),y,Math.max(1,Math.round(xs[xs.length-1]-xs[0])),1,c)}}}
function drawMon(K,X,G,f,opt){const m=MS2(K),sp=m.sp|0,st=m.st|0,A=MA[sp]||MA[0],k=MSTAGE[st]*(opt&&opt.sc||1)*(A[5].big?1.25:A[5].small?.8:1),o=A[5];let [ar,c1,c2,c3,c4]=A;
 const mk=m.mrk!=null&&typeof MMRK!=='undefined'?m.mrk:-1;if(mk===2){c1='#e8c040';c3='#fff0a0';c2='#9a7418'}
 const eyeC2=mk===1?'#5ad0ff':null,ol='#140e18',bob=Math.round(Math.sin(f*.12)*1.5),leg=Math.sin(f*.25);
 // เงา
 g.globalAlpha=.25;mE(X,G+1,14*k,2.5*k,'#000');g.globalAlpha=1;if(mk===3){g.globalAlpha=.35;mE(X-18,G+1,10*k,2*k,'#000');g.globalAlpha=1}
 if(ar==='dragon'&&o.noEgg&&st===0)ar='snake';if(st===2&&!['fairy','zombie','sword'].includes(ar)){g.globalAlpha=.16+Math.sin(f*.08)*.05;mE(X,G-16*k,20*k,18*k,c4);g.globalAlpha=1}
 const Y=G;const star=(x,y)=>{if(mk===0){Q(x,y-1,1,3,'#ffd76a');Q(x-1,y,3,1,'#ffd76a')}};
 switch(ar){
 case 'blob':{const sq=1+Math.sin(f*.2)*.08,rx=12*k/sq,ry=10*k*sq;if(o.cloud){for(let i=0;i<4;i++)mO(X-9*k+i*6*k,Y-12*k+(i%2)*3+bob,6*k,5*k,c1,c2);mEye(X-4*k,Y-14*k+bob,2*k,c4);mEye(X+4*k,Y-14*k+bob,2*k,c4,eyeC2);if(st>=1)for(let i=0;i<3;i++)Q(X-6*k+i*6*k,Y-4*k+((f+i*7)%12),1,4,'#7ad0ff');break}
  const yy=o.fire?Y-12*k+bob*2:Y-ry;if(o.fire){for(let i=0;i<5;i++){const h=(6+((f+i*5)%8))*k;mTri(X-10*k+i*5*k,yy,X-6*k+i*5*k,yy-h,X-2*k+i*5*k,yy,i%2?c4:c3)}}
  mO(X,yy,rx,ry,c1,ol);mE(X-3*k,yy+3*k,rx*.6,ry*.5,c2);mE(X-4*k,yy-4*k,3*k,2*k,c3);if(o.ice){Q(X-rx*.6,yy-ry*.4,2,ry,'#ffffff');Q(X+rx*.3,yy-ry*.6,2,ry*.6,'#ffffff')}
  mEye(X-4*k,yy-2*k,2.2*k,c4);mEye(X+3*k,yy-2*k,2.2*k,c4,eyeC2);Q(X-1*k,yy+3*k,3*k,1,ol);star(X,yy-6*k);
  if(st===2&&!o.fire&&!o.ice){Q(X-6*k,yy-ry-5*k,12*k,3*k,'#ffd04a');for(let i=0;i<3;i++)mTri(X-6*k+i*5*k,yy-ry-5*k,X-4*k+i*5*k,yy-ry-10*k,X-2*k+i*5*k,yy-ry-5*k,'#ffd04a')}if(st>=1&&!o.fire)mE(X+rx*.5,yy-ry*.5,2,2,c3);break}
 case 'ghost':{const yy=Y-18*k+bob*2;g.globalAlpha=.9;mO(X,yy,10*k,10*k,c1,c2);for(let i=0;i<4;i++)mE(X-7*k+i*5*k,yy+9*k+Math.sin(f*.2+i)*2,2.5*k,3*k,c1);g.globalAlpha=1;mEye(X-4*k,yy-2*k,2.5*k,'#1a1420');mEye(X+3*k,yy-2*k,2.5*k,'#1a1420',eyeC2);mE(X,yy+4*k,2*k,2.5*k,ol);if(st===2){Q(X-6*k,yy-12*k,12*k,3*k,'#ffd04a');for(let i=0;i<3;i++)mTri(X-6*k+i*5*k,yy-12*k,X-4*k+i*5*k,yy-16*k,X-2*k+i*5*k,yy-12*k,'#ffd04a')}g.globalAlpha=.3;mE(X,yy,16*k,14*k,c4);g.globalAlpha=1;break}
 case 'quad':{const L=o.low?.6:1,bw=(o.round?12:14)*k*(o.small?.9:1),bh=(o.round?8:6.5)*k,by=Y-(o.low?6:o.thin?14:11)*k*L;
  // หาง
  const tw=Math.sin(f*.15)*3;if(o.tail==='fox'||o.tail==='cat'){const n=o.tail==='fox'?[1,3,9][st]:[1,2,2][st];for(let i=0;i<n;i++){const a=(i-(n-1)/2)*.35;mO(X-bw-4*k+Math.sin(a)*6*k,by-6*k-Math.cos(a)*4*k+tw*.5,3*k,7*k,o.tail==='fox'?c1:c1,ol);mE(X-bw-4*k+Math.sin(a)*6*k,by-11*k-Math.cos(a)*4*k,2*k,2*k,o.tail==='fox'?'#ffffff':c3)}}
  else if(o.tail==='bushy'||o.tail==='curl'){mO(X-bw-3*k,by-(o.tail==='curl'?8:2)*k+tw*.4,4*k,(o.tail==='curl'?9:5)*k,c1,ol);mE(X-bw-4*k,by-(o.tail==='curl'?12:3)*k,2*k,3*k,c3)}
  else if(o.tail==='long'){for(let i=0;i<10;i++)mE(X-bw-i*2.2*k,by+1*k+Math.sin(f*.15+i*.5)*i*.25,(3-i*.25)*k,(2.2-i*.18)*k,i%3?c1:c2)}
  else if(o.tail==='thick'){mO(X-bw-5*k,by+1*k,6*k,2.5*k,c1,ol)}else if(o.tail==='thin'){for(let i=0;i<7;i++)Q(X-bw-i*2*k,by-2*k+Math.sin(f*.2+i*.6)*1.5,2,2,c2)}
  // ขา
  const lh=(o.low?3:o.thin?12:7)*k;for(let i=0;i<4;i++){const lx=X-bw*.7+i*bw*.47,sw=(i%2?leg:-leg)*2;Q(lx+sw,by+bh*.4,Math.max(2,2.2*k),lh,i<2?c2:c1);Q(lx+sw-1,by+bh*.4+lh-2,Math.max(3,3*k),2,ol)}
  // ลำตัว
  mO(X,by+bob*.5,bw,bh,c1,ol);mE(X,by+bh*.4+bob*.5,bw*.8,bh*.45,c3);if(o.scale)for(let i=0;i<6;i++)Q(X-bw*.7+i*bw*.28,by-bh*.6,3,2,c2);if(o.spike)for(let i=0;i<9;i++){const a=Math.PI*(.1+i*.1);mTri(X+Math.cos(a)*-bw,by-Math.sin(a)*bh,X+Math.cos(a)*-(bw+5*k),by-Math.sin(a)*(bh+5*k),X+Math.cos(a+.08)*-bw,by-Math.sin(a+.08)*bh,i%2?c2:'#e8e0d0')}
  if(st===2&&o.ear)for(let i=0;i<3;i++)Q(X-bw*.5+i*bw*.4,by-bh-2,2,3,c4);
  // หัว
  const hx=X+bw*.95,hy=by-bh*.6+bob*.5-(o.low?0:2*k),hr=(o.round?6:5.2)*k;
  if(o.ear){mTri(hx-hr*.7,hy-hr*.4,hx-hr*.4,hy-hr*1.6,hx,hy-hr*.6,c1);mTri(hx+hr*.1,hy-hr*.6,hx+hr*.4,hy-hr*1.7,hx+hr*.8,hy-hr*.4,c2);mTri(hx-hr*.55,hy-hr*.5,hx-hr*.4,hy-hr*1.2,hx-hr*.15,hy-hr*.6,'#ff9ab0')}
  if(o.antler){for(let s2=0;s2<2;s2++){const ax=hx-2+s2*5;for(let i=0;i<4+st*2;i++)Q(ax+(i%2?2:-1)*(i>>1),hy-hr-i*2*k,2,2*k,'#e8dcc0');if(st>=1){Q(ax-4,hy-hr-6*k,3,2,o.antler?'#c8f0ff':c4);g.globalAlpha=.4;mE(ax,hy-hr-6*k,5*k,4*k,'#c8f0ff');g.globalAlpha=1}}}
  mO(hx,hy,hr,hr*.85,c1,ol);if(o.snout||o.low)mO(hx+hr*.85,hy+hr*.25,hr*.6,hr*.4,o.low?c1:c3,ol);Q(hx+hr*1.3,hy+hr*.05,2,2,ol);
  if(o.jaw){for(let i=0;i<4;i++)Q(hx+hr*.5+i*2*k,hy+hr*.55,1,2,'#ffffff')}if(o.tusk){Q(hx+hr*.9,hy+hr*.5,2,3*k,'#f0e8d8');if(st>=1)Q(hx+hr*.9,hy+hr*.3,2,4*k,'#c8d0e0')}
  mEye(hx+hr*.2,hy-hr*.25,Math.max(2,2*k),c4,eyeC2);if(!o.low)mEye(hx-hr*.35,hy-hr*.25,Math.max(2,1.6*k),c4);star(hx,hy-hr*.7);
  break}
 case 'bird':{const fl=o.flamingo,hy0=fl?Y-34*k:Y-14*k,by=hy0+bob,wf=Math.sin(f*.4);if(fl){Q(X-1,by+6*k,2,Y-by-6*k,c2);Q(X+3,by+6*k,2,Y-by-10*k,c2)}else{Q(X-3*k,Y-5*k,2,5*k,'#e8a030');Q(X+2*k,Y-5*k,2,5*k,'#e8a030')}
  if(st===2&&!o.chick){for(let i=0;i<5;i++){const h=(8+((f+i*4)%7))*k;mTri(X-12*k+i*6*k,by-2*k,X-9*k+i*6*k,by-2*k-h,X-6*k+i*6*k,by-2*k,i%2?'#ff6a2a':'#ffd04a')}}
  mO(X,by,8*k,7*k,c1,ol);mE(X+1*k,by+2*k,5*k,4*k,c3);mO(X-3*k,by-1*k+wf*2,6*k,(3+Math.abs(wf)*2)*k,c2,ol);
  if(fl){for(let i=0;i<8;i++)Q(X+5*k+Math.sin(i*.6)*3*k,by-6*k-i*2*k,3,3,c1);mO(X+6*k,by-22*k,4*k,3.5*k,c1,ol);Q(X+9*k,by-22*k,5*k,2,c4);mEye(X+6*k,by-24*k,2,c4)}
  else{mO(X+6*k,by-6*k,o.chick?5*k:4.5*k,4*k,c1,ol);mTri(X+10*k,by-7*k,X+14*k,by-5.5*k,X+10*k,by-4*k,o.chick?'#ff8a3a':c4);mEye(X+7*k,by-8*k,Math.max(2,1.8*k),'#1a1420',eyeC2);if(o.chick&&st>=1){mTri(X+4*k,by-10*k,X+6*k,by-15*k,X+8*k,by-10*k,'#e83a3a')}if(o.chick&&st===2){for(let i=0;i<6;i++)Q(X-8*k-i*2*k,by-4*k+Math.sin(f*.2+i)*2,3,3,'#5a9a3a')}}
  star(X+6*k,by-9*k);break}
 case 'owl':{const by=Y-13*k+bob;mO(X,by,9*k,11*k,c1,ol);mE(X,by+3*k,6*k,6*k,c3);for(let i=0;i<4;i++)Q(X-4*k+i*2.5*k,by+1*k+i%2*2,2,2,c2);mE(X-3.5*k,by-4*k,3*k,3*k,'#f0e8d0');mE(X+3.5*k,by-4*k,3*k,3*k,'#f0e8d0');mEye(X-4.5*k,by-5*k,2.5*k,c4);mEye(X+2.5*k,by-5*k,2.5*k,c4,eyeC2);mTri(X-1*k,by-1*k,X+1*k,by-1*k,X,by+2*k,'#e8a030');mTri(X-8*k,by-8*k,X-6*k,by-14*k,X-3*k,by-9*k,c2);mTri(X+3*k,by-9*k,X+6*k,by-14*k,X+8*k,by-8*k,c2);if(st===2)for(let i=0;i<6;i++){const a=f*.03+i;Q(X+Math.cos(a)*14*k,by-6*k+Math.sin(a)*6*k,2,2,'#fff4c0')}if(st>=1){Q(X-7*k,by-6*k,14*k,1,'#c8a040')}star(X,by-8*k);break}
 case 'bat':{const by=Y-22*k+bob*3,wf=Math.sin(f*.5);for(const s2 of [-1,1]){mTri(X,by,X+s2*16*k,by-6*k+wf*5*k,X+s2*12*k,by+5*k,c2);mTri(X+s2*2*k,by,X+s2*12*k,by+5*k,X+s2*6*k,by+4*k,c1)}mO(X,by,5*k,5*k,c1,ol);mTri(X-4*k,by-3*k,X-3*k,by-8*k,X-1*k,by-4*k,c1);mTri(X+1*k,by-4*k,X+3*k,by-8*k,X+4*k,by-3*k,c1);mEye(X-2.5*k,by-1*k,1.6*k,c4);mEye(X+1*k,by-1*k,1.6*k,c4,eyeC2);Q(X-1*k,by+2*k,1,2,'#ffffff');Q(X+1*k,by+2*k,1,2,'#ffffff');if(st===2){mTri(X-5*k,by+3*k,X+5*k,by+3*k,X,by+14*k,'#5a0a1e');Q(X-4*k,by-9*k,8*k,2,'#c8a040')}break}
 case 'cater':{if(st===0){for(let i=0;i<6;i++){const xx=X-10*k+i*4*k,yy=Y-4*k-Math.abs(Math.sin(f*.15+i*.8))*3*k;mO(xx,yy,3*k,3*k,i%2?c1:c3,ol)}mEye(X+11*k,Y-7*k,2,'#1a1420');Q(X+12*k,Y-12*k,1,4,c2)}else if(st===1){const yy=Y-14*k;Q(X,yy-16*k,1,8*k,'#5a4a3a');mO(X,yy,6*k,11*k,'#e8c040',ol);mE(X-2*k,yy-3*k,2*k,6*k,'#fff0a0');for(let i=0;i<4;i++)Q(X-5*k,yy-6*k+i*4*k,10*k,1,'#9a7418')}else{const yy=Y-24*k+bob*2,wf=Math.abs(Math.sin(f*.3));for(const s2 of [-1,1]){mO(X+s2*9*k*(.6+wf*.4),yy-4*k,9*k*(.6+wf*.4),8*k,c4,ol);mE(X+s2*9*k*(.6+wf*.4),yy-4*k,5*k*(.6+wf*.4),4*k,'#ff9ab0');mO(X+s2*6*k*(.6+wf*.4),yy+6*k,5*k*(.6+wf*.4),5*k,'#c8a0ff',ol)}Q(X-1,yy-8*k,3,16*k,ol)}break}
 case 'moth':{const yy=Y-22*k+bob*2,wf=Math.abs(Math.sin(f*.25));for(const s2 of [-1,1]){mO(X+s2*8*k*(.5+wf*.5),yy-3*k,8*k*(.5+wf*.5),7*k,c1,ol);mE(X+s2*8*k*(.5+wf*.5),yy-3*k,3*k,3*k,c4);mO(X+s2*5*k*(.5+wf*.5),yy+6*k,4*k*(.5+wf*.5),4*k,c2,ol)}Q(X-1,yy-6*k,3,13*k,ol);break}
 case 'spider':case 'scorp':case 'crab':case 'beetle':case 'bee':case 'mantis':{const by=Y-(ar==='bee'?18*k+bob*2:ar==='mantis'?14*k:6*k);
  if(ar==='bee'){const wf=Math.sin(f*.8);g.globalAlpha=.6;mE(X-2*k,by-7*k-wf*2,5*k,3*k,'#e8f4ff');mE(X+3*k,by-7*k+wf*2,5*k,3*k,'#e8f4ff');g.globalAlpha=1;mO(X,by,8*k,5.5*k,c1,ol);for(let i=0;i<3;i++)Q(X-5*k+i*4*k,by-5*k,2*k,10*k,c4);mO(X+8*k,by-1*k,4*k,4*k,c4,ol);mEye(X+9*k,by-2*k,1.6*k,'#ffffff');mTri(X-8*k,by,X-12*k,by+1*k,X-8*k,by+2*k,c4);if(st===2){Q(X+6*k,by-8*k,6*k,2*k,'#ffd04a')}break}
  if(ar==='mantis'){Q(X-1,by,3,Y-by,c2);Q(X+5*k,by,2,Y-by,c2);mO(X,by,4*k,8*k,c1,ol);mO(X+3*k,by-10*k,3*k,3*k,c1,ol);mEye(X+4*k,by-11*k,1.5*k,c4);const sw=Math.sin(f*.2)*2;for(const s2 of [0,1]){Q(X+4*k,by-5*k+s2*3,8*k,2,c2);mTri(X+12*k,by-5*k+s2*3,X+16*k+sw,by-10*k+s2*3,X+12*k,by-3*k+s2*3,st>=1?'#e8f0f8':c3)}break}
  const lg=ar==='spider'?4:ar==='crab'?3:3;for(let i=0;i<lg;i++)for(const s2 of [-1,1]){const lx=X+s2*(4+i*2)*k,sw=Math.sin(f*.3+i)*1.5;Q(lx,by,2,1,c2);Q(lx+s2*3*k,by+sw,2,Y-by-sw,c2)}
  if(ar==='scorp'){const tp=[[-7,-1],[-10,-4],[-11,-8],[-10,-12],[-7,-15],[-3,-16]];tp.forEach(([dx,dy],i)=>mO(X+dx*k,by+dy*k+Math.sin(f*.15)*i*.3,(2.4-i*.15)*k,(2.2-i*.12)*k,i%2?c1:c2,ol));mTri(X-2*k,by-18*k,X+2*k,by-15*k,X-2*k,by-13*k,c4);for(const s2 of [0,1]){mO(X+10*k,by-1*k+s2*3*k,3*k,2*k,c1,ol)}}
  if(ar==='crab'){for(const s2 of [-1,1]){mO(X+s2*11*k,by-6*k,4*k,3*k,c1,ol);Q(X+s2*11*k,by-8*k,2*k,2,c3)}}
  mO(X,by-1*k,(ar==='crab'?9:ar==='beetle'?8:6)*k,(ar==='beetle'?6:5)*k,c1,ol);mE(X-2*k,by-4*k,3*k,1.5*k,c3);if(ar==='beetle'){Q(X,by-7*k,1,12*k,ol);for(let i=0;i<3;i++)mE(X-4*k+i*4*k,by-1*k+(i%2)*2,1.5*k,1.5*k,c4);if(st>=1)mTri(X+6*k,by-4*k,X+12*k,by-10*k,X+8*k,by-2*k,c2)}
  if(ar==='spider'){mO(X+6*k,by-1*k,3.5*k,3*k,c1,ol);for(let i=0;i<(st>=1?4:2);i++)Q(X+6*k+(i%2?1:-1)*k,by-2*k-(i>>1)*1.5*k,1.5,1.5,c4);if(st===2){Q(X-8*k,by-14*k,16*k,8*k,'#c8a0d8');g.globalAlpha=.5;for(let i=0;i<4;i++)Q(X-14*k+i*9*k,0,1,by,'#e8e8f0');g.globalAlpha=1}}
  else if(ar!=='crab'){mEye(X+3*k,by-3*k,1.5*k,'#1a1420',eyeC2)}else{Q(X-2*k,by-9*k,1,3*k,ol);Q(X+2*k,by-9*k,1,3*k,ol);mEye(X-2.5*k,by-10*k,1.5*k,'#1a1420');mEye(X+1.5*k,by-10*k,1.5*k,'#1a1420',eyeC2)}
  star(X,by-4*k);break}
 case 'snail':{const by=Y-5*k;mO(X+2*k,by,10*k,4*k,c1,ol);mO(X-2*k,by-7*k,8*k,8*k,st>=1?'#8a8a98':c4,ol);for(let r=6;r>1;r-=2)mE(X-2*k,by-7*k,r*k,r*k,r%4?c3:(st>=1?'#5a5a68':'#6a4a88'));if(st===2){Q(X-8*k,by-17*k,4*k,4*k,'#5a5a68');Q(X+2*k,by-17*k,4*k,4*k,'#5a5a68')}Q(X+10*k,by-6*k,1,5*k,c2);Q(X+13*k,by-6*k,1,5*k,c2);mEye(X+9.5*k,by-8*k,1.5*k,'#1a1420');mEye(X+12.5*k,by-8*k,1.5*k,'#1a1420',eyeC2);break}
 case 'worm':{for(let i=0;i<8;i++){const xx=X-12*k+i*3.5*k,yy=Y-3*k-Math.abs(Math.sin(f*.12+i*.7))*4*k;mO(xx,yy,(2.5+st)*k,(2.5+st)*k,i%2?c1:c3,ol)}if(st>=1){for(let i=0;i<5;i++)Q(X+15*k+i*1.5*k,Y-8*k-st*2*k,1,2,'#ffffff')}mEye(X+14*k,Y-8*k-st*2*k,1.5*k,'#1a1420');break}
 case 'snake':{for(let i=0;i<12;i++){const xx=X-14*k+i*2.6*k,yy=Y-3*k-Math.sin(f*.15+i*.55)*3*k;mO(xx,yy,(2.6+st*.8)*k,(2.6+st*.6)*k,i%2?c1:c2,ol)}const hx=X+18*k,hy=Y-7*k-Math.sin(f*.15+6.6)*3*k-(st>=1?4*k:0);if(st>=1)for(let i=0;i<3;i++)mO(X+14*k,Y-5*k-i*2*k,(3+st)*k,3*k,c1,ol);mO(hx,hy,(4+st)*k,3.5*k,c1,ol);mEye(hx+1*k,hy-1.5*k,1.6*k,c4,eyeC2);if((f>>4)%3===0){Q(hx+5*k,hy+1*k,4*k,1,'#e83a5a')}if(st===2){Q(hx-4*k,hy-6*k,9*k,2*k,'#ffd04a');mTri(hx-4*k,hy-6*k,hx-2*k,hy-9*k,hx,hy-6*k,'#ffd04a');mTri(hx+1*k,hy-6*k,hx+3*k,hy-9*k,hx+5*k,hy-6*k,'#ffd04a')}break}
 case 'frog':{const jump=Math.max(0,Math.sin(f*.08))*5*k,by=Y-6*k-jump;mO(X-6*k,by+3*k,3*k,3*k,c2,ol);mO(X+6*k,by+3*k,3*k,3*k,c2,ol);mO(X,by,9*k,6*k,c1,ol);mE(X,by+2*k,6*k,3*k,c3);mO(X-4*k,by-5*k,3*k,3*k,c1,ol);mO(X+4*k,by-5*k,3*k,3*k,c1,ol);mEye(X-5*k,by-6*k,2*k,'#1a1420');mEye(X+3*k,by-6*k,2*k,'#1a1420',eyeC2);Q(X-4*k,by+1*k,8*k,1,ol);if(st>=1)for(let i=0;i<5;i++)Q(X-6*k+i*3*k,by-2*k,2,2,['#ff5ab0','#5ad0ff','#ffd04a'][i%3]);if(st===2){Q(X-4*k,by-11*k,8*k,2*k,'#ffd04a');for(let i=0;i<3;i++)mTri(X-4*k+i*3*k,by-11*k,X-3*k+i*3*k,by-14*k,X-2*k+i*3*k,by-11*k,'#ffd04a')}break}
 case 'dragon':{if(st===0){const wob=Math.sin(f*.3)*(f%120<20?2:0);mO(X+wob,Y-9*k,7*k,9*k,c3,ol);for(let i=0;i<5;i++)mE(X-3*k+((i*7)%6)*k+wob,Y-14*k+i*2.5*k,1.5*k,1.2*k,c1);if(f%120<20)Q(X-2*k,Y-12*k,4*k,1,ol);break}
  const by=Y-(st===2?20:12)*k+bob,wf=Math.sin(f*.2);for(const s2 of [-1,1]){mTri(X-2*k,by-4*k,X-2*k+s2*3*k-8*k,by-16*k-wf*4*k,X+6*k,by-2*k,s2<0?c2:c1)}
  for(let i=0;i<8;i++)mE(X-10*k-i*2*k,by+3*k+Math.sin(f*.15+i*.5)*i*.3,(3-i*.3)*k,(2.2-i*.2)*k,i%2?c1:c2);mTri(X-27*k,by+4*k,X-31*k,by+1*k,X-30*k,by+7*k,c4);
  for(let i=0;i<4;i++){const sw=(i%2?leg:-leg)*1.5;Q(X-6*k+i*4*k+sw,by+4*k,2.5*k,(st===2?16:8)*k,c2)}mO(X,by,10*k,7*k,c1,ol);mE(X,by+3*k,7*k,3*k,c3);for(let i=0;i<5;i++)mTri(X-8*k+i*4*k,by-6*k,X-6*k+i*4*k,by-10*k,X-4*k+i*4*k,by-6*k,c4);
  const hx=X+11*k,hy=by-7*k;mO(hx,hy,5*k,4*k,c1,ol);mO(hx+5*k,hy+1*k,3.5*k,2.5*k,c1,ol);mTri(hx-3*k,hy-3*k,hx-6*k,hy-9*k,hx-1*k,hy-4*k,c3);mTri(hx,hy-3*k,hx-1*k,hy-10*k,hx+2*k,hy-4*k,c3);mEye(hx+1*k,hy-1.5*k,1.8*k,c4,eyeC2);
  if(st===2&&(f%90)<30){for(let i=0;i<8;i++){const d=i*4*k;Q(hx+9*k+d,hy+1*k+Math.sin(f+i)*2,4*k-i*.3,3*k,i%2?'#ffd04a':'#ff6a2a')}}break}
 case 'shroom':{const by=Y-6*k,sq=Math.sin(f*.2)*.06;Q(X-3*k,by-2*k,6*k,8*k,c3);Q(X-3*k,Y-2,2*k,2,ol);Q(X+1*k,Y-2,2*k,2,ol);mO(X,by-6*k,10*k*(1+sq),6*k*(1-sq),c1,ol);for(let i=0;i<4;i++)mE(X-6*k+i*4*k,by-8*k+(i%2)*2*k,1.5*k,1.2*k,c3);mEye(X-2*k,by,1.5*k,'#1a1420');mEye(X+1.5*k,by,1.5*k,'#1a1420',eyeC2);if(st>=1){g.globalAlpha=.45;for(let i=0;i<6;i++)Q(X-10*k+((f*.7+i*7)%20)*k,by-14*k-((f*.4+i*9)%14),2,2,'#c8e070');g.globalAlpha=1}if(st===2){Q(X-5*k,by-14*k,10*k,2*k,'#ffd04a')}break}
 case 'plant':{const s2=[.6,.9,1.35][st],by=Y;if(st===0){Q(X,by-10*k,2,10*k,c2);mO(X-3*k,by-11*k,3*k,2*k,c1,ol);mO(X+4*k,by-12*k,3*k,2*k,c1,ol);mEye(X-1*k,by-6*k,1.5,'#1a1420');mEye(X+2*k,by-6*k,1.5,'#1a1420',eyeC2);break}
  Q(X-3*s2*k,by-18*s2*k,6*s2*k,18*s2*k,c2);Q(X-2*s2*k,by-18*s2*k,2*s2*k,18*s2*k,'#8a6a4a');for(const a of [-1,1])Q(X+a*3*s2*k,by-12*s2*k,a*5*s2*k,2*s2*k,c2);mO(X,by-24*s2*k,11*s2*k,8*s2*k,c1,ol);mE(X-4*s2*k,by-27*s2*k,5*s2*k,3*s2*k,c3);mEye(X-2*s2*k,by-12*s2*k,2*k,'#1a1420');mEye(X+1.5*s2*k,by-12*s2*k,2*k,'#1a1420',eyeC2);Q(X-1.5*s2*k,by-8*s2*k,3*s2*k,1,ol);if(st===2){for(let i=0;i<6;i++){const a=f*.02+i;Q(X+Math.cos(a)*14*s2*k,by-24*s2*k+Math.sin(a)*6*s2*k,2,2,'#ff9ab0')}}break}
 case 'golem':{const s2=[.55,.85,1.15][st],by=Y;const B=(x,y,w,h,c)=>{Q(x-1,y-1,w+2,h+2,ol);Q(x,y,w,h,c);Q(x,y,w,2,c3)};if(st===0){mO(X,by-6*k,8*k,6*k,c1,ol);mE(X-2*k,by-8*k,3*k,2*k,c3);mEye(X-2*k,by-6*k,1.5*k,c4);mEye(X+2*k,by-6*k,1.5*k,c4,eyeC2);break}
  B(X-5*s2*k,by-10*s2*k,4*s2*k,10*s2*k,c2);B(X+1*s2*k,by-10*s2*k,4*s2*k,10*s2*k,c2);B(X-8*s2*k,by-24*s2*k,16*s2*k,14*s2*k,c1);B(X-13*s2*k,by-22*s2*k+Math.sin(f*.1)*1.5,5*s2*k,12*s2*k,c2);B(X+8*s2*k,by-22*s2*k-Math.sin(f*.1)*1.5,5*s2*k,12*s2*k,c2);B(X-4*s2*k,by-31*s2*k,8*s2*k,7*s2*k,c1);Q(X-2*s2*k,by-29*s2*k,2*s2*k,1.5*s2*k,c4);Q(X+1*s2*k,by-29*s2*k,2*s2*k,1.5*s2*k,eyeC2||c4);Q(X-2*s2*k,by-20*s2*k,4*s2*k,4*s2*k,c4);g.globalAlpha=.35;mE(X,by-18*s2*k,4*s2*k,4*s2*k,c4);g.globalAlpha=1;if(st===2)for(let i=0;i<3;i++)Q(X-6*s2*k+i*5*s2*k,by-33*s2*k,3,4,'#7aa04a');break}
 case 'octo':{const by=Y-14*k+bob*2;for(let i=0;i<(o.squid?6:8);i++){const a=-.9+i*(1.8/(o.squid?5:7));for(let j=0;j<6;j++)mE(X+Math.sin(a)*(4+j*2)*k+Math.sin(f*.2+i+j*.5)*1.5,by+4*k+j*2*k,(2-j*.2)*k,(1.6-j*.15)*k,j%2?c1:c2)}mO(X,by-(o.squid?4:0)*k,8*k,(o.squid?11:8)*k,c1,ol);mE(X-3*k,by-4*k,3*k,2*k,c3);mEye(X-3.5*k,by,2.2*k,o.squid?c4:'#1a1420');mEye(X+2*k,by,2.2*k,o.squid?c4:'#1a1420',eyeC2);break}
 case 'fish':case 'shark':{const by=Y-16*k+Math.sin(f*.1)*3,sh=ar==='shark',L2=(sh?14:10)*k,tw=Math.sin(f*.3)*2;mTri(X-L2,by,X-L2-6*k,by-6*k+tw,X-L2-6*k,by+6*k+tw,c2);mO(X,by,L2,(sh?5:5)*k,c1,ol);mE(X,by+2*k,L2*.8,2.5*k,c3);if(sh){mTri(X-2*k,by-4*k,X+2*k,by-12*k,X+5*k,by-4*k,c2);for(let i=0;i<3;i++)Q(X+L2*.5-i*2*k,by-1*k,1,3*k,c2);for(let i=0;i<4;i++)Q(X+L2*.55+i*1.5*k,by+2*k,1,2,'#ffffff')}else if(st>=1){for(let i=0;i<4;i++)Q(X-L2*.6+i*4*k,by-2*k,1,4*k,'#ffd04a');if((f%40)<10){g.globalAlpha=.6;Q(X-L2,by-8*k,2*L2,1,'#fff07a');g.globalAlpha=1}}mEye(X+L2*.55,by-1.5*k,1.8*k,'#1a1420',eyeC2);break}
 case 'turtle':{const by=Y-6*k;for(let i=0;i<4;i++)Q(X-8*k+i*5*k+(i%2?leg:-leg),by,3*k,5*k,c2);mO(X+11*k,by-1*k,3.5*k,3*k,c1,ol);mEye(X+12*k,by-2*k,1.4*k,'#1a1420',eyeC2);mO(X,by-4*k,11*k,(6+st*2)*k,c4,ol);for(let i=0;i<5;i++)mE(X-6*k+i*3*k,by-6*k-(i%2)*2*k,1.6*k,1.6*k,'#8a6a3a');if(st>=1)for(let i=0;i<5;i++)mTri(X-8*k+i*4*k,by-9*k-st*2*k,X-6*k+i*4*k,by-14*k-st*3*k,X-4*k+i*4*k,by-9*k-st*2*k,'#e8e0d0');if(st===2){mE(X,by-18*k,9*k,3*k,'#5a9a3a');fPineMini(X-3*k,by-20*k,k);fPineMini(X+4*k,by-22*k,k)}break}
 case 'skel':{const by=Y,sw=Math.sin(f*.2)*1.5;Q(X-4*k,by-12*k,2*k,12*k,c1);Q(X+2*k,by-12*k,2*k,12*k,c1);for(let i=0;i<4;i++)Q(X-4*k,by-22*k+i*2.5*k,8*k,1.2*k,c1);Q(X-1,by-24*k,2,12*k,c1);Q(X-7*k,by-22*k+sw,2*k,10*k,c1);Q(X+5*k,by-22*k-sw,2*k,10*k,c1);mO(X,by-28*k,5*k,5*k,c1,ol);Q(X-3*k,by-29*k,2*k,2*k,st===2?'#5ad0ff':'#1a1420');Q(X+1*k,by-29*k,2*k,2*k,eyeC2||(st===2?'#5ad0ff':'#1a1420'));for(let i=0;i<3;i++)Q(X-2*k+i*1.5*k,by-25*k,1,2,'#1a1420');
  if(st>=1){Q(X-6*k,by-22*k,12*k,6*k,'#6a7080');Q(X+7*k,by-30*k,2,20*k,'#c8d0e0')}if(st===2){mTri(X-8*k,by-21*k,X+8*k,by-21*k,X,by,'#2a1a3a');g.globalAlpha=.4;mE(X,by-28*k,9*k,9*k,'#5ad0ff');g.globalAlpha=1;Q(X-5*k,by-34*k,10*k,2*k,'#c8a040')}break}
 case 'zombie':{try{person(Math.round(X/3),Math.round(Y/3),{robe:st===2?'#3a1a3a':'#5a5a4a',trim:st===2?'#c8a040':'#3a3a2a',belt:'#00000055',hs:2,mood:'angry',seed:sp*31+7,age:30,g:'ชาย',skin:c1,hair:'#3a3a2a',hat:st===2?'crown':null},'stand')}catch(e){}Q(X-6*k,Y-26*k+Math.sin(f*.1)*1,1.5,2,'#c83a3a');break}
 case 'imp':{const by=Y-14*k+bob*2,wf=Math.sin(f*.5);for(const s2 of [-1,1])mTri(X,by-2*k,X+s2*(10+st*3)*k,by-8*k+wf*3,X+s2*6*k,by+3*k,c2);Q(X-3*k,by+4*k,2*k,(6+st*3)*k,c2);Q(X+1*k,by+4*k,2*k,(6+st*3)*k,c2);mO(X,by,6*k,(6+st)*k,c1,ol);mO(X,by-8*k,4.5*k,4*k,c1,ol);mTri(X-4*k,by-10*k,X-6*k,by-16*k,X-2*k,by-11*k,c4);mTri(X+2*k,by-11*k,X+6*k,by-16*k,X+4*k,by-10*k,c4);mEye(X-2.5*k,by-9*k,1.5*k,c4);mEye(X+1*k,by-9*k,1.5*k,c4,eyeC2);for(let i=0;i<6;i++)Q(X-8*k-i*1.5*k,by+4*k+Math.sin(f*.2+i)*2,2,2,c2);if(st===2){Q(X-5*k,by-14*k,10*k,2,'#ffd04a')}break}
 case 'fairy':{const by=Y-22*k+bob*3,wf=Math.abs(Math.sin(f*.6));g.globalAlpha=.5;for(const s2 of [-1,1]){mE(X+s2*5*k,by-4*k,5*k*(.5+wf*.5),6*k,c4);mE(X+s2*4*k,by+3*k,3*k*(.5+wf*.5),3*k,c4)}g.globalAlpha=1;mO(X,by,3*k,5*k,c1,ol);mO(X,by-6*k,3*k,3*k,'#ffe3cf',ol);mEye(X-1.5*k,by-6.5*k,1,'#1a1420');mEye(X+1*k,by-6.5*k,1,'#1a1420',eyeC2);g.globalAlpha=.3;mE(X,by,(8+st*4)*k,(8+st*4)*k,c3);g.globalAlpha=1;mO(X,by,3*k,5*k,c1,ol);mO(X,by-6*k,3*k,3*k,'#ffe3cf',ol);Q(X-3*k,by-10*k,6*k,2*k,c2);for(let i=0;i<3+st*2;i++){const a=f*.05+i*1.3;Q(X+Math.cos(a)*(8+st*3)*k,by+Math.sin(a)*(6+st*2)*k,1,1,'#fff4c0')}if(st===2)Q(X-3*k,by-12*k,6*k,2,'#ffd04a');break}
 case 'mimic':{const s2=[.8,1.1,1.6][st],by=Y,open=(f%80)<30?Math.sin((f%80)/30*Math.PI)*6*s2*k:0;Q(X-10*s2*k-1,by-10*s2*k-1,20*s2*k+2,10*s2*k+2,ol);Q(X-10*s2*k,by-10*s2*k,20*s2*k,10*s2*k,c1);Q(X-10*s2*k,by-10*s2*k,20*s2*k,2,c3);Q(X-10*s2*k,by-6*s2*k,20*s2*k,2,c4);
  if(open>1){Q(X-9*s2*k,by-10*s2*k-open,18*s2*k,open,'#3a0a14');for(let i=0;i<6;i++){Q(X-8*s2*k+i*3*s2*k,by-10*s2*k-2,2,3,'#f0e8d8');Q(X-7*s2*k+i*3*s2*k,by-10*s2*k-open,2,3,'#f0e8d8')}Q(X-2*s2*k,by-10*s2*k-open*.6,4*s2*k,open*.5,'#e85a7a');mEye(X-4*s2*k,by-10*s2*k-open-3,2*s2,c4);mEye(X+3*s2*k,by-10*s2*k-open-3,2*s2,c4,eyeC2)}
  Q(X-10*s2*k-1,by-16*s2*k-open-1,20*s2*k+2,6*s2*k+2,ol);Q(X-10*s2*k,by-16*s2*k-open,20*s2*k,6*s2*k,c1);Q(X-10*s2*k,by-16*s2*k-open,20*s2*k,2,c3);Q(X-1.5*s2*k,by-12*s2*k-open,3*s2*k,3*s2*k,c4);break}
 case 'sword':{const by=Y-20*k+bob*3,L2=(16+st*6)*k;g.globalAlpha=.35;mE(X,by,6*k+st*3,L2*.7,c4);g.globalAlpha=1;Q(X-1.5*k,by-L2*.6,3*k,L2,c1);Q(X-1.5*k,by-L2*.6,1,L2,c3);mTri(X-1.5*k,by-L2*.6,X,by-L2*.6-4*k,X+1.5*k,by-L2*.6,c1);Q(X-5*k,by+L2*.4,10*k,2*k,c2);Q(X-1*k,by+L2*.4+2*k,2*k,5*k,'#5a3a2a');mE(X,by+L2*.4+8*k,2*k,2*k,c4);Q(X-1,by-L2*.2,2,2,c4);if(st>=1){mEye(X-1,by,2,c4)}if(st===2)for(let i=0;i<5;i++){const a=f*.06+i*1.25;Q(X+Math.cos(a)*10*k,by+Math.sin(a)*14*k,2,2,c4)}break}
 }
}
function fPineMini(x,y,k){mTri(x,y-5*k,x-3*k,y+1,x+3*k,y+1,'#2e5a2e');Q(x,y+1,1,2*k,'#5a3a1e')}
// ---------- ฉากตามถิ่นเกิด (เพิ่ม 7 ฉาก) ----------
Object.assign(FP,{
 snow(B,R){B.vg(0,168,['#8aa8c8','#b8cce0','#e8f0f8']);B.ridge(R,80,16,'#c8d8e8',1.2);B.ridge(R,104,12,'#d8e4f0',1);for(let i=0;i<12;i++){const x=R()*480,h=24+R()*20;B.poly([[x,120-h],[x+9,120],[x-9,120]],'#4a6a7a');B.poly([[x,120-h],[x+5,120-h+8],[x-5,120-h+8]],'#f4f8ff')}B.vg(118,168,['#f0f6ff','#d8e4f0']);for(let i=0;i<40;i++)B.rect(R()*480,124+R()*40,6,1,'#c8d8e8')},
 swamp(B,R){B.vg(0,168,['#2a3a2e','#3e5a3e','#6a8a5a']);for(let i=0;i<10;i++){const x=R()*480;B.rect(x,40+R()*30,4,110,'#2a2018');for(let k=0;k<4;k++)B.line(x+2,60+k*10,x+2+(k%2?14:-14),70+k*10,'#3a5a2a')}B.vg(118,168,['#3a5a3a','#22381e']);for(let i=0;i<14;i++)B.disc(R()*480,126+R()*38,6+R()*6,'#5a8a3a');for(let y=122;y<168;y+=4)B.rect(R()*480,y,24,1,'#7aa06a',.4);for(let i=0;i<10;i++)B.rect(R()*480,110+R()*14,2,10,'#6a8a3a')},
 meadow(B,R){B.vg(0,110,['#6ab0e8','#a8d8f0','#e8f4f0']);for(let i=0;i<4;i++)fCloud(B,R,R()*480,20+R()*30,12,'#ffffff');B.ridge(R,94,10,'#7ab05a',1);B.vg(104,168,['#8ac85a','#5a9a3a']);for(let i=0;i<220;i++){const x=R()*480,y=108+R()*58;B.rect(x,y,1,3,'#4a8a2a');if(R()<.4)B.rect(x-1,y-1,3,2,['#ff8ab0','#ffd04a','#ffffff','#c070ff','#ff5a5a'][Math.floor(R()*5)])}},
 volcano(B,R){B.vg(0,168,['#1a0a0a','#4a1a12','#8a3a1a']);B.poly([[120,140],[220,30],[260,30],[380,140]],'#2a1410');B.poly([[214,40],[266,40],[256,30],[224,30]],'#ff6a1a');B.glow(240,30,80,'#ff6a1a',.35);for(let i=0;i<4;i++){let x=230+i*6,y=40;for(let k=0;k<10;k++){const nx=x+(R()-.5)*10,ny=y+10;B.line(x,y,nx,ny,'#ff8a2a');x=nx;y=ny}}B.vg(136,168,['#2a140e','#120806']);for(let i=0;i<8;i++){let x=R()*480,y=140;for(let k=0;k<6;k++){const nx=x+(R()-.5)*16,ny=y+4;B.line(x,y,nx,ny,'#ff6a2a');x=nx;y=ny}}},
 deep(B,R){B.vg(0,168,['#0a2a4a','#06203a','#021428']);for(let i=0;i<6;i++){const x=40+i*80;for(let y=0;y<120;y++)B.rect(x+y*.2,y,10-y*.06,1,'#9ad8ff',.05)}for(let i=0;i<14;i++){const x=R()*480,h=10+R()*26;B.rect(x,150-h,3,h,['#c84a7a','#e8a03a','#5ad0a0'][i%3]);B.disc(x+1,150-h,4,['#ff6a9a','#ffc04a','#7affc0'][i%3])}B.vg(146,168,['#0a2030','#020c14']);for(let i=0;i<30;i++)B.rect(R()*480,R()*140,1,1,'#c8f0ff')},
 river(B,R){B.vg(0,100,['#6aa8e0','#a8d4f0','#e0f0e8']);B.ridge(R,86,12,'#5a8a4a',1);for(let i=0;i<14;i++)fPine(B,R()*480,104,26+R()*20,'#2e5a2e');B.vg(102,124,['#5a9a3a','#4a7a2a']);B.vg(122,168,['#3a7ab0','#1a4a7a']);for(let y=124;y<168;y+=3)for(let i=0;i<8;i++)B.rect(R()*480,y,10+R()*14,1,'#9ad0f0',.5);for(let i=0;i<8;i++)B.disc(R()*480,124+R()*6,4,'#7a7a70')},
 beach(B,R){B.vg(0,90,['#4a9ae0','#8ac8f0','#f0e8c8']);B.ball(380,40,14,['#ffd070','#fff0a0','#ffffff']);B.vg(88,120,['#3a8ac8','#2a6aa0']);for(let y=90;y<120;y+=3)B.rect(R()*480,y,16,1,'#c8e8ff',.6);B.vg(118,168,['#f0dca0','#d8b878']);for(let i=0;i<50;i++)B.rect(R()*480,122+R()*44,2,1,'#c8a868');for(let i=0;i<6;i++){const x=R()*480;B.disc(x,140+R()*20,3,'#f4ecd8')}}
});
Object.assign(FCAP,{snow:'❄️ ทุ่งหิมะ',swamp:'🐸 หนองน้ำหมอก',meadow:'🌼 ทุ่งดอกไม้',volcano:'🌋 ภูเขาไฟ',deep:'🌊 ใต้ทะเลลึก',river:'🏞️ ริมลำธาร',beach:'🏖️ ชายหาด'});
Object.assign(FWXN,{snow:'wSnow',swamp:'wFog',meadow:'wLeaves',volcano:'wStorm',deep:null,river:'wLeaves',beach:null});
const HAB=[[/ถ้ำ|เหมือง|ใต้ดิน/,'cave'],[/สุสาน|ปราสาทร้าง|เมืองร้าง/,'grave'],[/หิมะ|น้ำแข็ง/,'snow'],[/หนอง|บึง/,'swamp'],[/ดอกไม้|ภูต|รังผึ้ง|ทุ่งหญ้า/,'meadow'],[/ภูเขาไฟ/,'volcano'],[/ทะเลลึก|มหาสมุทร|ร่องลึก/,'deep'],[/แม่น้ำ|ลำธาร/,'river'],[/หาด|ชายฝั่ง|ทะเลสาบ/,'beach'],[/ทะเลทราย/,'desert'],[/ท่อระบาย|ตรอก/,'t_base'],[/ห้องสมุด/,'library'],[/ดันเจี้ยน|กองสมบัติ/,'dgn'],[/ปีศาจ/,'abyss'],[/รังมังกร|ยอดเขา|หน้าผา|ท้องฟ้า/,'dragon_sky'],[/สวนหลังบ้าน|ฟาร์ม/,'village'],[/ป่า|พุ่มไม้/,'forest']];
function monHab(K){const h=(MSP[MS2(K).sp]||MSP[0])[4];for(const [rx,id] of HAB)if(rx.test(h))return id;return 'forest'}
const MEVX=[['evo',/วิวัฒนาการ|ร่างใหม่|เปลี่ยนร่าง/],['hunter',/นักผจญภัย|ค่าหัว|พราน|นักล่า|ปาร์ตี้/],['eat',/กิน|กลืน|ดูดซับ|ย่อย/],['hunt',/ล่า|เหยื่อ|จู่โจม|ซุ่ม/],['pack',/ฝูง|ราชา|พวกเดียวกัน|อาณาจักร|ชาติอสูร/],['child',/เด็ก|ชาวบ้าน|เลี้ยง/]];
let monEvK='';
{const _fs3=fScene;fScene=function(K){try{if(isMon(K)&&!window._fanScForce&&!(typeof DU!=='undefined'&&DU&&DU.fl)){let t='';try{const c=choice._cur;if(c)t=String(c.title||'')+' '+String(c.text||'')}catch(e){}monEvK='';for(const [k,rx] of MEVX)if(rx.test(t)){monEvK=k;break}const r=_fs3(K);return (monEvK&&monEvK!=='child')||['cave','forest','guild','klass','throne'].includes(r)||!t?monHab(K):r}}catch(e){}return _fs3(K)}}
function monExtras(K,f){const k=monEvK,X=108;if(k==='evo'){g.globalAlpha=.35+Math.sin(f*.2)*.15;for(let i=0;i<6;i++)Q(X-30+i*12,0,6,141,'#fff4c0');g.globalAlpha=1;for(let i=0;i<14;i++){const a=f*.08+i;Q(108+Math.cos(a)*(30+i),110+Math.sin(a)*12-((f+i*9)%40),2,2,'#ffd76a')}}
 else if(k==='eat'){for(let i=0;i<10;i++){const a=f*.15+i*.6,r=26-((f*.6+i*5)%26);Q(108+Math.cos(a)*r,118+Math.sin(a)*r*.5,3,3,['#ff6a6a','#ffd76a','#9ad8ff'][i%3])}}
 else if(k==='hunt'||k==='pack'){const n=k==='pack'?4:1;for(let i=0;i<n;i++){const x=(k==='pack'?40+i*90:330)+Math.sin(f*.1+i)*4;if(k==='pack'){const save=MS2(K).st;MS2(K).st=Math.max(0,save-1);drawMon(K,x,141,f+i*13,{sc:.7});MS2(K).st=save}else{mO(x,134,9,6,'#a07a4a','#140e18');mO(x+8,129,4,4,'#a07a4a','#140e18');Q(x+9,128,2,2,'#1a1420');Q(x-12,132,6,2,'#a07a4a')}}}}
function monNpcs(K){const k=monEvK,s=age()*7;if(k==='hunter'){fNpc(110,47,s+1,{robe:'#3a4a6a',trim:'#c8d0e0',mood:'angry'});fNpc(126,47,s+2,{robe:'#6a3a2a',trim:'#e8c040',g:'หญิง',mood:'angry'});fNpc(142,47,s+3,{robe:'#2a2a3a',trim:'#9a7aff'})}else if(k==='child'){fNpc(110,47,s+4,{robe:'#c86a5a',trim:'#f4ecd8',age:9,mood:'happy'})}}
// วาดผู้เล่นเป็นสัตว์ในทุกฉากแฟนตาซีเมื่ออยู่ในโลกสัตว์อสูร
{const _pp=person;person=function(x,y,o,pose){try{if(o&&o===curMe&&on()){const K=FN();if(K&&isMon(K)&&g&&g.canvas&&(g.canvas.id==='scene'||g.canvas.width===480)){drawMon(K,x*3,y*3,frame||0);return}}}catch(e){}return _pp.apply(this,arguments)}}
{const _df2=drawFan;drawFan=function(ctx){const r=_df2.apply(this,arguments);try{const K=FN();if(K&&isMon(K)){g=ctx;PS=ctx.canvas.width/SW;ctx.setTransform(PS,0,0,PS,0,0);monExtras(K,frame||0);monNpcs(K)}}catch(e){}return r}}
window._drawMonT=(ctx,x,y,f)=>{g=ctx;PS=ctx.canvas.width/SW;ctx.setTransform(PS,0,0,PS,0,0);ctx.imageSmoothingEnabled=false;drawMon(FN(),x,y,f||0)};
window._monTest=(sp,st,ev)=>{const K=FN();if(!K)return;const m=MS2(K);if(sp!=null)m.sp=sp;if(st!=null)m.st=st;window._monEvT=ev};


// =================== 🧍 ร่างมนุษย์ของสัตว์อสูร + 🔄 แปลงร่างไปมา ===================
//   ได้ร่างมนุษย์ 2 ทาง: (1) วิวัฒนาการสาย "ร่างมนุษย์" ที่ LV25 (เดิม) (2) เหตุการณ์พิเศษของสายพันธุ์ที่แปลงกายได้ เช่น กลืนร่างนักผจญภัยที่กำลังจะตาย / จิ้งจอกเรียนแปลงกาย
//   ร่างมนุษย์คงลักษณะเดิม (สีผม = สีตัว · หูสัตว์ · เขา · ปีก · หาง) · แปลงร่างได้จากเมนู · ร่างมนุษย์เข้าเมือง/สมัครกิลด์นักผจญภัยได้
const HFX={0:{n:'ร่างมนุษย์ของสไลม์',hat:null,glow:'#9ad8ff'},18:{hat:'ears',tail:'fox'},29:{hat:'ears',tail:'cat'},3:{hat:'ears',tail:'wolf'},10:{hat:'horn',wing:'dragon',tail:'dragon'},37:{hat:'horn',wing:'dragon',tail:'dragon'},4:{tail:'snake'},28:{wing:'butterfly',hat:'flower'},27:{hat:'horn',wing:'bat',tail:'imp'},13:{hat:'halo',ghost:1},5:{wing:'bat'},44:{hat:'crown',glow:'#c8f0ff'},45:{wing:'flame',glow:'#ff8a3a'},48:{wing:'feather',hat:'halo'},47:{glow:'#c83a6a'},19:{wing:'feather'},36:{hat:'horn'},24:{hat:'ears'},39:{hat:'ears',tail:'otter'},40:{hat:'ears',tail:'squirrel'},14:{glow:'#f09ac0'},31:{},2:{ghost:1}};
const monHum=K=>{const m=MS2(K);return !!(m.hf||(m.st>=2&&m.path==='human'))};
const monForm=K=>{const m=MS2(K);return monHum(K)&&m.form!=='mon'};
function hfLook(K){const m=MS2(K),A=MA[m.sp]||MA[0],X=HFX[m.sp]||{},L=m.hl||(m.hl={g:rnd()<.5?'ชาย':'หญิง',seed:R(1,99999),skin:pick(['#ffe3cf','#f1c7a5','#e8c0a0','#ffe8d8'])});
 const hair=m.mrk===2?'#f0d060':A[1];return {robe:A[2],trim:A[3],belt:'#00000055',hs:L.g==='หญิง'?3:4,mood:'happy',seed:L.seed,age:Math.min(30,S.age+12),g:L.g,skin:X.ghost?'#e8f0ff':L.skin,hair,hat:X.hat||null,wing:X.wing||null,wingC:X.wing?A[1]:undefined,eye:A[4],_hf:1}}
function hfTail(K,x,y,f){const m=MS2(K),X=HFX[m.sp]||{},A=MA[m.sp]||MA[0],c=m.mrk===2?'#f0d060':A[1];if(!X.tail)return;const X0=x*3-10,Y0=y*3-30,sw=Math.sin(f*.12)*3;
 if(X.tail==='fox'){const n=[1,3,9][m.st|0];for(let i=0;i<n;i++){const a=(i-(n-1)/2)*.3;mO(X0-6+Math.sin(a)*8,Y0-Math.cos(a)*6+sw,3,7,c,'#140e18');mE(X0-6+Math.sin(a)*8,Y0-6-Math.cos(a)*6+sw,2,2,'#ffffff')}}
 else if(X.tail==='cat'){for(let i=0;i<8;i++)Q(X0-i*1.5,Y0-i*2+Math.sin(f*.15+i*.4)*2,3,3,c);if((m.st|0)>=1)for(let i=0;i<8;i++)Q(X0-3-i*1.5,Y0+2-i*2+Math.sin(f*.15+i*.4+1)*2,3,3,c)}
 else if(X.tail==='dragon'||X.tail==='snake'||X.tail==='imp'){for(let i=0;i<9;i++)mE(X0-i*2.5,Y0+8+Math.sin(f*.12+i*.5)*i*.3,3-i*.25,2.4-i*.2,i%2?c:A[2]);if(X.tail==='imp')mTri(X0-24,Y0+6,X0-28,Y0+3,X0-27,Y0+10,A[4])}
 else mO(X0-4,Y0+4+sw*.5,4,6,c,'#140e18')}
{const _pp2=person;person=function(x,y,o,pose){try{if(o&&o===curMe&&on()){const K=FN();if(K&&isMon(K)&&monForm(K)){const L=hfLook(K),f=frame||0,X=HFX[MS2(K).sp]||{};if(X.glow){g.globalAlpha=.25;mE(x*3,y*3-24,16,22,X.glow);g.globalAlpha=1}hfTail(K,x,y,f);if(X.ghost)g.globalAlpha=.85;const r=_pp2.call(this,x,y,L,pose);g.globalAlpha=1;return r}}}catch(e){}return _pp2.apply(this,arguments)}}
// เหตุการณ์ได้ร่างมนุษย์ (สายพันธุ์ที่แปลงกายได้)
const HFEV={slime:[0,14,44,45,48,47],beast:[18,29,3,24,36,39,40],dragon:[10,37,4],spirit:[28,27,13,5,19,2,31]};
MEV.push(K=>{const m=MS2(K);if(m.hf||monHum(K)||(m.st|0)<1||!(m.sp in HFX)||rnd()<.35){feed(pick(['🌙 คืนนี้คุณนอนมองดาว แล้วนึกถึงชีวิตที่เคยเป็นคน','🪞 คุณเห็นเงาตัวเองในแอ่งน้ำ และจำหน้าตัวเองในชาติก่อนไม่ได้แล้ว']));return}
 const g2=HFEV.slime.includes(m.sp)?'slime':HFEV.beast.includes(m.sp)?'beast':HFEV.dragon.includes(m.sp)?'dragon':'spirit';
 const T={slime:['🫧 นักผจญภัยที่กำลังจะตาย','ในถ้ำมีนักผจญภัยหญิงผมดำนอนบาดเจ็บสาหัส เธอมองคุณโดยไม่กลัว "ถ้าเจ้ากินข้า… ช่วยใช้ร่างนี้ไปดูทะเลแทนข้าที"','🫧 ดูดซับร่างและความทรงจำของเธอ','ร่างของคุณยืดขึ้น กลายเป็นคนผมยาวที่มีใบหน้าคล้ายเธอ ในหัวมีความทรงจำของคนที่ไม่เคยเห็นทะเล'],
  beast:['🍂 ใบไม้วิเศษ','จิ้งจอกแก่ที่ศาลเจ้ามอบใบไม้ใบหนึ่งให้ "วางบนหัวแล้วนึกถึงหน้าคนที่เจ้ารัก"','🍂 วางใบไม้บนหัว','ควันสีขาวพุ่งขึ้น คุณยืนสองขาได้ มีมือห้านิ้ว… แต่หูกับหางยังซ่อนไม่มิด'],
  dragon:['🌕 คืนจันทร์เต็มดวง','มังกรเฒ่าที่ใกล้ตายบินมาเกาะบนผาข้างคุณ "เผ่าเรามีร่างที่สอง เจ้าแค่ยังไม่เคยลอง"','🌕 ลองหลับตาแล้วหดตัว','เกล็ดหดหายเหลือแค่บนแก้ม เขาเล็กๆ ยังโผล่จากผม และคุณเพิ่งรู้ว่าการเดินสองขายากแค่ไหน'],
  spirit:['✨ พรของเทพี','แสงจากรูปปั้นเทพีโบราณส่องลงบนตัวคุณ "วิญญาณที่ยังจำความเป็นคนได้ สมควรได้ร่างคืน"','✨ รับพร','แสงหลอมรวมเป็นร่างมนุษย์ ยังโปร่งแสงนิดๆ ตรงปลายนิ้ว']}[g2];
 C(T[0],T[1],[O(T[2],()=>{m.hf=1;m.form='human';S.cha=(S.cha||0)+8;K.mpM+=15;fxBig('mana',1.6);say(`🧍 <b>ได้ร่างมนุษย์!</b> ${T[3]} <span class="tag2">แปลงร่างไปมาได้ที่เมนู · ร่างมนุษย์เข้าเมืองและสมัครกิลด์ได้</span>`,'myth',true);try{cdxAdd('fanmon','h'+m.sp)}catch(e){}}),O('🙅 ไม่เอา ยังอยากเป็นแบบนี้',()=>feed('🙅 คุณปฏิเสธ… บางทีร่างนี้ก็ดีพอแล้ว'))])});
// เหตุการณ์ในร่างมนุษย์
MEV.push(K=>{if(!monForm(K)){return}const m=MS2(K);const L=[['🏙️ เดินเที่ยวเมืองมนุษย์','คุณเดินในตลาดครั้งแรกในร่างมนุษย์ ทุกอย่างมีกลิ่นและเสียงมากเกินไป',[O('🍢 ลองกินของคนดู',()=>feed(`🍢 เสียบไม้ย่างรสชาติดีกว่าทุกอย่างที่คุณเคยกินในป่า${money(-20)}`)),O('👀 แค่ดูเฉยๆ',()=>feed('👀 เด็กคนหนึ่งชี้มาที่คุณ "แม่ พี่คนนั้นมีหาง!" คุณรีบเดินหนี'))]],
 ['😳 เกือบโดนจับได้','ระหว่างคุยกับคนขายผัก ร่างคุณเริ่มกลับเป็นสัตว์ทีละนิด',[O('🔄 รีบหลบไปแปลงกลับ',()=>feed('🔄 คุณวิ่งเข้าซอกตึกทันเวลาพอดี')),O('😅 ทำเป็นว่าเป็นมายากล',()=>feed(`😅 ทุกคนปรบมือ มีคนโยนเหรียญให้ด้วย${money(30)}`))]],
 ['🍺 เข้าบาร์นักผจญภัย','นักผจญภัยโต๊ะข้างๆ กำลังวางแผนล่า "สัตว์อสูรที่พูดได้" ในป่าที่คุณเกิด',[O('🗣️ ชวนคุยเปลี่ยนใจ',()=>talkDuel({ic:'🍺',t:'โน้มน้าวนักล่า',vs:'หัวหน้าปาร์ตี้นักล่า',ev:1,intro:'เขาไม่รู้ว่ากำลังคุยกับเป้าหมายของตัวเอง',win:()=>'เขายกเลิกภารกิจ "ถ้ามันพูดได้ มันก็คงไม่ต่างจากเรา"',lose:()=>'เขาหัวเราะแล้วออกเดินทางพรุ่งนี้เช้า'},()=>{})),O('🤐 ฟังเงียบๆ',()=>feed('🤐 คุณจำหน้าทุกคนไว้'))]]];
 const x=pick(L);C(x[0],x[1],x[2])});
window.fanMonForm=function(){const K=FN();if(!K||!isMon(K)||!monHum(K))return;const m=MS2(K);m.form=monForm(K)?'mon':'human';fxBig('poof',1.3);feed(m.form==='human'?'🧍 คุณแปลงเป็นร่างมนุษย์':'🐾 คุณกลับเป็นร่างเดิม');closeM();render()};
{const _om3=openMenu;openMenu=function(){const r=_om3.apply(this,arguments);try{const K=FN();if(on()&&K&&isMon(K)&&monHum(K)){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-hf]')){const b=document.createElement('button');b.className='opt';b.setAttribute('data-hf',1);b.innerHTML=monForm(K)?`🐾 กลับเป็นร่างสัตว์<small>ล่า วิวัฒนาการ ใช้พลังเต็มที่</small>`:`🧍 แปลงเป็นร่างมนุษย์<small>เข้าเมือง สมัครกิลด์ คุยกับคนได้</small>`;b.onclick=()=>fanMonForm();d.prepend(b)}}}catch(e){}return r}}
// ร่างมนุษย์สมัครกิลด์นักผจญภัยได้
{const _fy2=fanYear;fanYear=function(){const r=_fy2.apply(this,arguments);try{const K=FN();if(K&&S.alive&&isMon(K)&&monForm(K)){const G=grOf(K);if(!G&&rnd()<.35){queue(()=>evGuildJoin(K));flush()}else if(G&&G.y!==age()&&rnd()<.5){queue(()=>evGuildBoard(K));flush()}}}catch(e){}return r}}


// =================== 💞 ฮาเร็มแฟนตาซี: จีบได้หลายคน · ค่าความสัมพันธ์/ความไว้ใจ/ความหึง · จิตใจเปลี่ยนตามที่คุณทำ · หักหลัง · ตบตีกันเอง ===================
const HRA={tsun:['😤','ซึนเดเระ','ปากร้ายแต่ใจดี ชมตรงๆ จะเขินจนโกรธ','tease'],kuu:['🧊','คูลเดเระ','นิ่งและเย็นชา แต่จำทุกคำที่คุณพูด','sincere'],yan:['🔪','ยันเดเระ','รักมาก… มากเกินไป หึงแรงที่สุด','devote'],genki:['🌞','สดใส','ร่าเริง ชอบผจญภัยและความตื่นเต้น','adventure'],
 ojou:['🌹','ผู้สูงศักดิ์','หยิ่ง อยากได้รับการยอมรับ ชอบคำชม','praise'],shy:['🙈','ขี้อาย','ต้องค่อยๆ เปิดใจ เร็วไปจะหนี','gentle'],sly:['🦊','เจ้าเล่ห์','ยิ้มหวาน ชอบคนฉลาด ซ่อนบางอย่างไว้','wit'],loyal:['🛡️','ซื่อสัตย์','ภักดีที่สุด แต่ถ้าโดนหักหลังจะไม่ให้อภัย','sincere'],
 free:['🍃','รักอิสระ','ไม่ชอบถูกผูกมัด หึงน้อย แต่หายไปง่าย','adventure'],dark:['🌑','มืดมน','มีอดีตเจ็บปวด อยากมีคนฟัง','listen']};
const HRO={iso:['🏹 นักธนูเอลฟ์ในปาร์ตี้','⛪ นักบวชประจำวิหาร','🗡️ นักดาบรับจ้าง','🍺 พนักงานต้อนรับกิลด์','👑 ทายาทราชวงศ์','😈 ขุนพลฝ่ายจอมมาร','🧙 นักเวทคู่แข่ง','🐺 มนุษย์หมาป่าจากป่าลึก'],magic:['📚 รุ่นพี่ประธานสภา','🔮 อัจฉริยะเวทประจำรุ่น','🧹 คนดูแลหอพัก','👻 วิญญาณในห้องที่ 13','🐉 นักเรียนเผ่ามังกร','🎻 นักดนตรีเร่หน้าวิทยาลัย'],
 noble:['🌹 ทายาทตระกูลดยุก','🎩 คนรับใช้ประจำตัว','👑 เชื้อพระวงศ์','🗡️ อัศวินองครักษ์','🦊 ทูตจากต่างแคว้น','📜 นักวิชาการสามัญชน'],mon:['👧 คนในหมู่บ้านใกล้ป่า','🧝 เอลฟ์ผู้พิทักษ์ป่า','🦊 อสูรจิ้งจอกแปลงกาย','🗡️ นักผจญภัยที่คุณไว้ชีวิต']};
const HRS={spy:['🕵️','สายลับของศัตรู'],betroth:['💍','มีคู่หมั้นอยู่แล้ว'],curse:['🥀','ต้องคำสาป อายุเหลือไม่กี่ปี'],royal:['👑','เชื้อพระวงศ์ปลอมตัวมา'],gold:['💰','หวังแค่ทรัพย์สินของคุณ'],assassin:['🗡️','ถูกส่งมาเพื่อฆ่าคุณ']};
const HRG=[['flower','🌸','ดอกไม้'],['sweet','🍰','ขนม'],['gem','💎','เครื่องประดับ'],['book','📕','หนังสือ'],['blade','🗡️','อาวุธ'],['doll','🧸','ตุ๊กตา'],['wine','🍷','ไวน์'],['odd','🪶','ของแปลก']];
const HRD=[['market','🏮','ตลาดกลางคืน',['genki','free','shy']],['lake','🌙','ทะเลสาบใต้แสงจันทร์',['kuu','dark','shy','yan']],['tower','🗼','ยอดหอคอยดูดาว',['sly','ojou','kuu']],['ball','💃','งานเลี้ยงเต้นรำ',['ojou','tsun','sly']],['dgn','🗝️','บุกดันเจี้ยนด้วยกัน',['genki','loyal','tsun','free']],['garden','🌹','สวนกุหลาบลับ',['yan','loyal','ojou','dark']]];
const HRST=['คนแปลกหน้า','คนรู้จัก','เพื่อน','แอบชอบ'];
function HR(K){const X=X9(K);return X.hr||(X.hr={L:[],ap:-1,apN:0,ev:-9,pref:LS.get('murim_hrpref','opp')})}
const hrW=K=>K.w==='magic'?'magic':K.w==='noble'?'noble':K.w==='mon'?'mon':'iso';
const hrOk=K=>!K.kidP&&age()>=14&&(!isMon(K)||(typeof monForm==='function'&&monForm(K)));
const hrLv=h=>h.spouse?'💍 คู่ครอง':h.lover?'💞 คนรัก':HRST[Math.min(3,Math.floor(h.aff/20))];
const hrMood=h=>!h.alive?'🕯️':h.away?'🚪':h.betr?'🗡️':h.jel>=65?'😠':h.trust<30?'🥶':h.sec&&!h.secR&&h.lover&&h.aff>=60&&(h.sec==='spy'||h.sec==='assassin'||h.sec==='gold')&&rnd()<.5?'😏':h.aff>=70?'🥰':h.aff>=40?'🙂':'😐';
const hrMoodT={'🥰':'มีความสุข','🙂':'ปกติดี','😐':'เฉยๆ','😠':'หึงหวง','🥶':'เย็นชา ไม่ไว้ใจ','😏':'ยิ้มแปลกๆ เหมือนซ่อนอะไร','🗡️':'หักหลังคุณแล้ว','🚪':'จากไปแล้ว','🕯️':'จากไปตลอดกาล'};
function hrGen(K){const P=HR(K),me=S.gender==='หญิง'?'หญิง':'ชาย',pr=P.pref;const g=pr==='same'?me:pr==='any'?(rnd()<.5?'ชาย':'หญิง'):(me==='ชาย'?'หญิง':'ชาย');const ak=pick(Object.keys(HRA));const org=pick(HRO[hrW(K)]);const lk=HRG.map(x=>x[0]).sort(()=>rnd()-.5);
 return {id:R(1,1e9),n:fbFirst(g),g,ar:ak,org,aff:R(5,15),trust:50,jel:0,lover:0,spouse:0,alive:1,away:0,betr:0,sec:rnd()<.32?pick(Object.keys(HRS)):null,secR:0,likes:lk.slice(0,2),dis:lk[2],kn:[],met:age(),last:age(),dates:0,seed:R(1,99999)}}
function hrAP(K){const P=HR(K);if(P.ap!==age()){P.ap=age();P.apN=2+((S.cha||0)>=300?1:0)}return P.apN}
function hrUse(K){const P=HR(K);hrAP(K);P.apN=Math.max(0,P.apN-1)}
function hrJel(K,h,amt){HR(K).L.forEach(o=>{if(o!==h&&o.alive&&!o.away&&o.lover&&!o.betr){o.jel=Math.min(100,o.jel+Math.round(amt*(o.ar==='yan'?2:o.ar==='free'?.4:o.ar==='tsun'?1.3:1)))}})}
const hrBar=(v,c)=>`<div class="hpbar" style="height:6px;margin:2px 0"><i style="width:${Math.max(0,Math.min(100,v))}%;background:${c}"></i></div>`;
window.fanHarem=function(){const K=FN();if(!K)return;const P=HR(K),L=P.L.filter(h=>h.alive&&!h.away);
 const pr={opp:'ต่างเพศ',same:'เพศเดียวกัน',any:'ทุกเพศ'};
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>💞 คนในใจ <span class="tag2">${L.filter(h=>h.lover).length} คนรัก · แต้มปีนี้ ${hrAP(K)}</span></h3>
 <p class="tag2">ทุกปีใช้เวลากับคนที่สนใจได้ ${2+((S.cha||0)>=300?1:0)} ครั้ง · คบหลายคนได้ แต่ทุกครั้งที่ใกล้ชิดใครคนหนึ่ง คนรักคนอื่นจะหึง · บางคนมีความลับ</p>
 ${L.length?L.map(h=>{const A=HRA[h.ar],m=hrMood(h);return `<button class="opt" onclick="hrOpen(${h.id})" style="text-align:left"><b>${E(h.n)}</b> ${A[0]} <span class="tag2">${h.org} · ${hrLv(h)}</span><br><span class="tag2">💗 ${Math.round(h.aff)}</span>${hrBar(h.aff,'#ff8ab0')}<span class="tag2">🤝 ไว้ใจ ${Math.round(h.trust)} · ${h.lover?`😠 หึง ${Math.round(h.jel)} · `:''}${m} ${hrMoodT[m]}</span></button>`}).join(''):'<p>ยังไม่มีใครในใจ… คนที่ใช่จะปรากฏตัวระหว่างทาง</p>'}
 <div class="tag2" style="margin-top:8px">ความชอบ: ${Object.keys(pr).map(k=>`<button class="opt" style="display:inline-block;width:auto;margin:2px;padding:4px 8px;${P.pref===k?'border-color:#ffd54a':''}" onclick="hrPref('${k}')">${pr[k]}</button>`).join('')}</div>
 ${P.L.some(h=>!h.alive||h.away||h.betr)?`<details class="item"><summary>📜 อดีต</summary>${P.L.filter(h=>!h.alive||h.away||h.betr).map(h=>`<div class="tag2">${hrMood(h)} ${E(h.n)} — ${h.betr?'หักหลังคุณ':!h.alive?'จากไปตลอดกาล':'จากไปแล้ว'}</div>`).join('')}</details>`:''}`,'harem')};
window.hrPref=k=>{const K=FN();HR(K).pref=k;LS.set('murim_hrpref',k);fanHarem()};
const hrF=id=>{const K=FN();return HR(K).L.find(h=>h.id===id)};
window.hrOpen=function(id){const K=FN(),h=hrF(id);if(!h)return;const A=HRA[h.ar],ap=hrAP(K),dis=ap<=0?'disabled style="opacity:.45"':'';const kn=h.kn||[];
 const line=hrLine(h);
 modal(`<button class="xbtn" onclick="fanHarem()">✕</button><h3>${A[0]} ${E(h.n)}</h3><div class="tag2">${h.org} · ${A[1]} — ${A[2]}</div><div class="tag2">${hrLv(h)} · พบกันตอนอายุ ${h.met} · เดท ${h.dates} ครั้ง</div>
 <div style="margin:6px 0">💗 ความสัมพันธ์ ${Math.round(h.aff)}${hrBar(h.aff,'#ff8ab0')}🤝 ความไว้ใจ ${Math.round(h.trust)}${hrBar(h.trust,'#7ad0ff')}${h.lover?`😠 ความหึง ${Math.round(h.jel)}${hrBar(h.jel,'#ff5d73')}`:''}</div>
 <p style="font-style:italic">"${line}"</p>
 <div class="tag2">ชอบ: ${h.likes.map(x=>kn.includes(x)?HRG.find(g=>g[0]===x).slice(1).join(' '):'❓').join(' · ')} · ไม่ชอบ: ${kn.includes(h.dis)?HRG.find(g=>g[0]===h.dis).slice(1).join(' '):'❓'}${h.secR?` · <b style="color:#ff8a7a">ความลับ: ${HRS[h.sec].join(' ')}</b>`:''}</div>
 <div class="mgrid" style="margin-top:6px"><button class="opt" ${dis} onclick="hrTalk(${id})">💬 คุย<small>เลือกคำพูดให้ถูกใจ</small></button><button class="opt" ${dis} onclick="hrGift(${id})">🎁 ให้ของขวัญ<small>40 เหรียญ</small></button><button class="opt" ${dis} onclick="hrDate(${id})">🌙 ชวนเดท<small>${h.aff>=25?'คนรักคนอื่นจะหึง':'ต้องสนิทกว่านี้'}</small></button>
 ${h.lover?(!h.spouse&&!S.spouse&&!HR(K).L.some(o=>o.spouse)?`<button class="opt" ${dis} onclick="hrConf(${id})">💍 ขอแต่งงาน<small>ต้องการ 💗 85+</small></button>`:''):`<button class="opt" ${dis} onclick="hrConf(${id})">💌 สารภาพรัก<small>💗 60+ ถึงจะมีลุ้น</small></button>`}
 <button class="opt" ${dis} onclick="hrSpy(${id})">🕵️ สืบเรื่องของเขา<small>ถ้าเขารู้ ความไว้ใจลด</small></button>${h.lover?`<button class="opt" onclick="hrBreak(${id})">💔 เลิกรา<small>${h.ar==='yan'?'⚠️ อันตราย':'จบความสัมพันธ์'}</small></button>`:''}</div>`,'harem')};
function hrLine(h){const L={tsun:['ม-ไม่ได้มารอนะ แค่ผ่านมาเฉยๆ!','ใครจะไปห่วงเธอกัน… กินข้าวรึยัง','ถ้ากล้าไปคุยกับคนอื่นอีกล่ะก็!'],kuu:['…อืม','เมื่อวานเธอบอกว่าชอบสีฟ้า ฉันจำได้','อยู่ตรงนี้ก็ได้ ไม่ต้องพูดอะไร'],yan:['วันนี้เธอไปคุยกับใครมา? ฉันเห็นนะ','เธอเป็นของฉันคนเดียว ใช่ไหม?','ถ้าวันไหนเธอทิ้งฉัน… ฉันจะทำยังไงดีนะ ฮิฮิ'],genki:['ไปผจญภัยกันเถอะ! วันนี้อากาศดีสุดๆ','เธอเห็นกบสามตาตัวนั้นไหม! น่ารักมาก!','ถ้าเหนื่อยก็พิงไหล่ฉันได้นะ'],
 ojou:['เธอควรรู้สึกเป็นเกียรตินะ ที่ได้คุยกับฉัน','ชุดฉันวันนี้เป็นยังไง… ไม่ได้อยากรู้หรอก แค่ถาม','ตระกูลฉันไม่ยอมรับเธอหรอก… แต่ฉันไม่สน'],shy:['อ-อ๊ะ! ส-สวัสดี…','ฉันเขียนกลอนมา… ไม่ต้องอ่านก็ได้นะ!','อยู่ใกล้ๆ แบบนี้ หัวใจเต้นแรงจัง'],sly:['เธอนี่น่าสนใจกว่าที่คิดนะ','ทุกคนมีความลับ ฉันก็มี เธอก็มี','อยากรู้ว่าฉันคิดอะไรอยู่เหรอ? ลองเดาสิ'],loyal:['ฉันจะอยู่ข้างเธอ ไม่ว่าจะเกิดอะไรขึ้น','อย่าโกหกฉันนะ ขอแค่นั้น','ถ้ามีใครทำร้ายเธอ ฉันจะเป็นโล่ให้'],
 free:['พรุ่งนี้ฉันอาจไปจากที่นี่ก็ได้นะ','ความรักไม่ควรเป็นกรง ใช่ไหม','วันนี้ฉันอยู่ตรงนี้ ก็พอแล้ว'],dark:['เธอไม่กลัวฉันเหรอ','ฉันเคยเสียทุกอย่างไปครั้งหนึ่ง','ขอบคุณที่ยังอยู่ตรงนี้']}[h.ar];return h.jel>=65?'ไปหาคนอื่นของเธอสิ! ไม่ต้องมาสนใจฉัน':h.trust<30?'ฉันไม่รู้ว่าจะเชื่อเธอได้อีกไหม':L[Math.min(2,Math.floor(h.aff/34))]}
const HRT={tease:['😏 แซวกลับ','tease'],sincere:['🤍 พูดจากใจ','sincere'],devote:['🫶 บอกว่ามีแค่เขาคนเดียว','devote'],adventure:['🗺️ ชวนไปผจญภัย','adventure'],praise:['🌟 ชมเขา','praise'],gentle:['🍵 ค่อยๆ คุยเบาๆ','gentle'],wit:['🧠 เล่นคำคมๆ','wit'],listen:['👂 นั่งฟังเงียบๆ','listen']};
window.hrTalk=function(id){const K=FN(),h=hrF(id);if(!h||hrAP(K)<=0)return;const want=HRA[h.ar][3],ks=Object.keys(HRT).filter(k=>k!==want).sort(()=>rnd()-.5).slice(0,2).concat([want]).sort(()=>rnd()-.5);
 modal(`<h3>💬 ${E(h.n)}</h3><p style="font-style:italic">"${hrLine(h)}"</p><div class="mgrid">${ks.map(k=>`<button class="opt" onclick="hrTalk2(${id},'${k}')">${HRT[k][0]}</button>`).join('')}</div>`,'harem')};
window.hrTalk2=function(id,k){const K=FN(),h=hrF(id);if(!h)return;hrUse(K);h.last=age();const ok=HRA[h.ar][3]===k;let d=ok?R(8,13):k==='sincere'||k==='listen'?R(1,4):-R(1,5);if(h.ar==='shy'&&h.aff<30&&k==='devote')d=-6;h.aff=Math.max(0,Math.min(100,h.aff+d));if(ok)h.trust=Math.min(100,h.trust+3);if(h.lover)hrJel(K,h,4);
 feed(`💬 ${E(h.n)}${ok?pick([' หน้าแดงขึ้นมาทันที',' ยิ้มแบบที่ไม่เคยยิ้มให้ใคร',' เงียบไปนาน แล้วจับมือคุณ']):d>0?' พยักหน้าเบาๆ':pick([' ทำหน้าเบื่อ',' เปลี่ยนเรื่องทันที',' ถอนหายใจ'])} · 💗 ${d>=0?'+':''}${d}`);hrBack(id)};
window.hrGift=function(id){const K=FN(),h=hrF(id);if(!h||hrAP(K)<=0)return;modal(`<h3>🎁 ให้อะไร${E(h.n)}ดี</h3><div class="mgrid">${HRG.map(g=>`<button class="opt" onclick="hrGift2(${id},'${g[0]}')">${g[1]} ${g[2]}${(h.kn||[]).includes(g[0])?`<small>${h.likes.includes(g[0])?'💗 ชอบ':g[0]===h.dis?'💢 ไม่ชอบ':''}</small>`:''}</button>`).join('')}</div>`,'harem')};
window.hrGift2=function(id,gk){const K=FN(),h=hrF(id);if(!h)return;if((S.money||0)<40){toast('💰 เงินไม่พอ');return}money(-40);hrUse(K);h.last=age();h.kn=h.kn||[];if(!h.kn.includes(gk))h.kn.push(gk);const lk=h.likes.includes(gk),dk=gk===h.dis;const d=lk?R(10,15):dk?-R(6,10):R(2,5);h.aff=Math.max(0,Math.min(100,h.aff+d));if(h.lover)hrJel(K,h,5);if(h.sec==='gold')h.aff+=3;
 feed(`🎁 ${E(h.n)} ${lk?pick(['กอดของขวัญไว้แน่น','ร้องไห้ออกมาเลย','บอกว่าจะเก็บไว้ตลอดไป']):dk?pick(['ยิ้มฝืนๆ','วางมันไว้ข้างๆ แล้วไม่แตะอีก']):'ขอบคุณอย่างสุภาพ'} · 💗 ${d>=0?'+':''}${d}`);hrBack(id)};
window.hrDate=function(id){const K=FN(),h=hrF(id);if(!h||hrAP(K)<=0)return;if(h.aff<25){toast('ยังไม่สนิทพอจะชวนเดท');return}modal(`<h3>🌙 ชวน${E(h.n)}ไปไหนดี</h3><div class="mgrid">${HRD.map(d=>`<button class="opt" onclick="hrDate2(${id},'${d[0]}')">${d[1]} ${d[2]}</button>`).join('')}</div>`,'harem')};
window.hrDate2=function(id,dk){const K=FN(),h=hrF(id),D=HRD.find(x=>x[0]===dk);if(!h||!D)return;hrUse(K);closeM();h.last=age();h.dates++;
 mgHold(`💓 ${D[1]} เดทกับ${h.n}`,sc=>{const fav=D[3].includes(h.ar),d=Math.round((fav?14:6)*(.5+sc));h.aff=Math.min(100,h.aff+d);h.trust=Math.min(100,h.trust+2);hrJel(K,h,10);
  const ev=dk==='dgn'&&rnd()<.4?` ระหว่างทางมีสไลม์ยักษ์โผล่มา ${h.n}${h.ar==='loyal'||h.ar==='genki'?'กระโดดบังให้คุณ':'ซ่อนหลังคุณ'}`:dk==='ball'&&rnd()<.3?' ทั้งงานหันมามองตอนคุณสองคนเต้นรำ':'';
  feed(`🌙 เดทที่${D[2]}กับ ${E(h.n)} ${sc>=.7?'เป็นคืนที่สมบูรณ์แบบ':sc>=.4?'ผ่านไปด้วยดี':'มีเรื่องเขินๆ เต็มไปหมด'}${ev}${fav?' · <b>สถานที่ที่เขาชอบ!</b>':''} · 💗 +${d}`);try{bkAdd('hrdate',h.id)}catch(e){}render()})};
window.hrConf=function(id){const K=FN(),h=hrF(id);if(!h||hrAP(K)<=0)return;hrUse(K);closeM();
 if(!h.lover){const p=Math.max(.05,Math.min(.95,(h.aff-45)/40+(h.ar==='shy'?-.1:0)+(h.ar==='yan'?.2:0)));if(rnd()<p){h.lover=1;h.aff=Math.min(100,h.aff+10);hrJel(K,h,18);fxBig('confetti',1.4);say(`💞 <b>${E(h.n)}ตอบรับรักคุณ!</b> ${pick(['แล้วก็ร้องไห้ออกมา','"ทำไมเพิ่งบอกล่ะ!"','"…ฉันรอคำนี้มานานแล้ว"'])}`,'epic',true);if(HR(K).L.filter(o=>o.lover&&o.alive&&!o.away&&!o.betr).length>=4)queue(()=>hrHaremEv(K))}else{h.aff=Math.max(0,h.aff-8);feed(`💔 ${E(h.n)} ${h.aff<40?'ขอโทษ "ฉันมองเธอแค่เพื่อน"':'ขอเวลาคิดก่อน'} · 💗 −8`)}}
 else{if(h.aff>=85&&rnd()<.85){h.spouse=1;S.spouse=h.n;h.trust=Math.min(100,h.trust+15);hrJel(K,h,30);fxBig('fw',1.7);say(`💍 <b>คุณแต่งงานกับ ${E(h.n)}!</b> ${HR(K).L.filter(o=>o.lover&&o!==h&&o.alive&&!o.away).length?'คนรักคนอื่นยิ้มในงาน… แต่สายตาไม่ได้ยิ้มตาม':'งานเล็กๆ แต่ทุกคนร้องไห้'}`,'myth',true);try{joy(15)}catch(e){}}else feed(`💍 ${E(h.n)} ${h.aff<85?'ยังไม่พร้อม "ขออีกสักหน่อยนะ"':'ขอเวลาคิดอีกปี'}`)}
 render()};
window.hrSpy=function(id){const K=FN(),h=hrF(id);if(!h||hrAP(K)<=0)return;hrUse(K);closeM();const got=rnd()<.35+(S.int||0)/1500,caught=rnd()<(h.ar==='sly'?.5:.25);
 if(h.sec&&got){h.secR=1;feed(`🕵️ คุณพบความลับของ ${E(h.n)}: <b>${HRS[h.sec].join(' ')}</b>`);if(h.sec==='spy'||h.sec==='assassin')queue(()=>hrConfront(K,h))}else feed(`🕵️ ${got?`${E(h.n)}ไม่มีอะไรปิดบังคุณเลย`:'คุณหาอะไรไม่เจอ'}`);
 if(caught){h.trust=Math.max(0,h.trust-20);feed(`😳 ${E(h.n)}จับได้ว่าคุณแอบสืบ "เธอไม่เชื่อใจฉันเหรอ" · 🤝 −20`)}render()};
window.hrBreak=function(id){const K=FN(),h=hrF(id);if(!h)return;closeM();h.lover=0;if(h.spouse){h.spouse=0;S.spouse=null}h.aff=Math.max(0,h.aff-35);
 if(h.ar==='yan'){queue(()=>hrYan(K,h,true));flush();return}if(h.ar==='loyal'){h.away=1;feed(`💔 ${E(h.n)}ไม่พูดอะไรเลย หันหลังเดินจากไป และไม่กลับมาอีก`)}else feed(`💔 ${E(h.n)} ${pick(['ร้องไห้ทั้งคืน','บอกว่า "ขอบคุณสำหรับทุกอย่าง"','ปาแก้วใส่คุณแล้วเดินออกไป'])}`);render()};
function hrBack(id){setTimeout(()=>{try{if(hrF(id))hrOpen(id)}catch(e){}},50);try{render()}catch(e){}}
// ---------- เหตุการณ์ ----------
function hrMeet(K){const h=hrGen(K),A=HRA[h.ar];const sc={iso:'ระหว่างทางกลับจากกิลด์',magic:'ในห้องสมุดตอนดึก',noble:'ที่ระเบียงงานเลี้ยง',mon:'ริมลำธารที่คุณมาดื่มน้ำ'}[hrW(K)];
 C(`💫 ${h.org}`,`${sc} คุณเจอ <b>${E(h.n)}</b> ${A[0]} <span class="tag2">${A[1]} — ${A[2]}</span><br>${pick(['สายตาคู่นั้นค้างอยู่ที่คุณนานกว่าปกติ','เขาทำของหล่น คุณก้มเก็บพร้อมกัน','เขาหัวเราะเรื่องที่คุณพูดดังเกินไป','เขาจ้องคุณเหมือนเคยรู้จักกันมาก่อน'])}`,[
  O('💬 ทักทาย',()=>{HR(K).L.push(h);feed(`💫 คุณกับ ${E(h.n)} คุยกันจนเวลาผ่านไปไม่รู้ตัว · ดูได้ที่ 💞 คนในใจ`)}),
  O('✨ ช่วยเหลือเขา',()=>{h.aff+=12;h.trust+=8;HR(K).L.push(h);feed(`✨ คุณช่วย ${E(h.n)} พ้นจากเรื่องวุ่นวาย เขาจำคุณได้แม่น · 💗 +12`)}),
  O('😐 เดินผ่านไป',()=>feed(`😐 คุณเดินผ่านไป… บางทีชะตาอาจพาให้เจอกันอีก`))])}
function hrFight(K,a,b){C(`💥 ${a.n} ปะทะ ${b.n}`,`คนรักสองคนของคุณเจอกันกลางตลาด ${a.n} ${HRA[a.ar][0]} ชี้หน้า ${b.n} ${HRA[b.ar][0]} "${pick(['อย่ามายุ่งกับคนของฉัน!','ฉันมาก่อน!','เธอคิดว่าเธอพิเศษกว่าฉันเหรอ?'])}" คนมุงเริ่มล้อมวง`,[
 O(`🛡️ ยืนข้าง ${a.n}`,()=>{a.aff=Math.min(100,a.aff+10);a.jel=Math.max(0,a.jel-25);b.aff-=20;b.jel=Math.min(100,b.jel+25);b.trust-=15;feed(`🛡️ ${a.n}ยิ้มอย่างผู้ชนะ ${b.n}มองคุณด้วยสายตาที่คุณจะไม่ลืม`)}),
 O(`🛡️ ยืนข้าง ${b.n}`,()=>{b.aff=Math.min(100,b.aff+10);b.jel=Math.max(0,b.jel-25);a.aff-=20;a.jel=Math.min(100,a.jel+25);a.trust-=15;feed(`🛡️ ${b.n}กอดแขนคุณ ${a.n}กำมือแน่นจนเลือดซึม`)}),
 O('🗣️ ไกล่เกลี่ย',()=>talkDuel({ic:'💥',t:'ไกล่เกลี่ยคนรักสองคน',vs:`${a.n} และ ${b.n}`,jury:'คนมุงทั้งตลาด',ev:1,intro:'ทั้งคู่หันมาจ้องคุณพร้อมกัน',win:()=>{[a,b].forEach(x=>{x.jel=Math.max(0,x.jel-30);x.trust+=5});return `${a.n}กับ${b.n}ยอมสงบศึก… และตกลงกันได้ว่าจะแบ่งวันกัน`},lose:()=>{[a,b].forEach(x=>{x.aff-=12;x.trust-=10});return 'ทั้งคู่โกรธคุณมากกว่าโกรธกันเอง'}},()=>{})),
 O('⚔️ ปล่อยให้ดวลกันเอง',()=>{const w=rnd()<.5?a:b,l=w===a?b:a;l.away=1;w.jel=Math.max(0,w.jel-20);feed(`⚔️ ${w.n}ชนะ ${l.n}เก็บของออกจากชีวิตคุณในคืนนั้น… ทิ้งจดหมายไว้ว่า "เธอไม่เคยห้ามเลยสักคำ"`)}),
 O('🏃 หนีไปเลย',()=>{[a,b].forEach(x=>{x.aff-=15;x.trust-=10});feed('🏃 คุณหนีออกจากตลาด ข่าวลือเรื่องนี้ไปถึงทุกคนในเมืองภายในเย็นนั้น')})])}
function hrYan(K,h,brk){C(`🔪 ${h.n}`,brk?`${h.n}ยิ้มตอนคุณบอกเลิก ยิ้มกว้างเกินไป "เลิก? ไม่มีคำนั้นในโลกของเรานะ" ประตูห้องถูกล็อกจากด้านนอก`:`คุณกลับบ้านมาเจอ${h.n}นั่งรอในความมืด มีมีดวางอยู่บนโต๊ะ "วันนี้เธอไปเจอใครมา?"`,[
 O('🗣️ พูดให้ใจเย็น',()=>talkDuel({ic:'🔪',t:'ปลอบคนที่รักคุณมากเกินไป',vs:h.n,ev:0,intro:'มีดยังอยู่ในมือเขา',win:()=>{h.jel=20;h.aff=Math.min(100,h.aff+5);if(brk){h.lover=0;h.away=1;return `${h.n}ร้องไห้จนหลับไป ตื่นมาก็จากไปเงียบๆ`}return `${h.n}วางมีดลง แล้วซบไหล่คุณ "ขอโทษนะ ฉันแค่กลัว"`},lose:()=>{const vic=HR(K).L.find(o=>o!==h&&o.lover&&o.alive&&!o.away);if(vic){vic.alive=0;vic.lover=0;return `คืนนั้น ${vic.n} หายตัวไป… ไม่มีใครพบอีกเลย และ${h.n}ยิ้มให้คุณตอนเช้าเหมือนไม่มีอะไรเกิดขึ้น`}return `${h.n}ไม่ฟัง ทิ้งรอยแผลไว้บนแขนคุณ`+hurt(.2)}},()=>{})),
 O('🏃 หนีออกทางหน้าต่าง',()=>mgHold('🏃 ปีนหนีจากห้องที่ถูกล็อก',sc=>{if(sc>=.55){h.lover=0;h.away=1;h.betr=1;feed(`🏃 คุณหนีออกมาได้ ${h.n}ตะโกนชื่อคุณไล่หลังทั้งคืน`);LT(K).push({at:age()+R(3,6),k:'_hrYan',id:h.id})}else feed(`🏃 คุณตกลงมาจากหน้าต่าง ${h.n}พยาบาลคุณอย่างอ่อนโยน… และไม่ปล่อยให้ออกจากบ้านอีกเลยหนึ่งปี${hurt(.25)}`)})),
 O('🫶 ยอมเป็นของเขาคนเดียว',()=>{HR(K).L.forEach(o=>{if(o!==h&&o.lover){o.lover=0;o.away=1}});h.jel=0;h.aff=100;h.lover=1;feed(`🫶 คนรักคนอื่นทุกคนได้รับจดหมายเลิกรา เขียนด้วยลายมือของคุณ… ที่คุณไม่ได้เขียน`)})])}
function hrBetray(K,h){h.betr=1;h.lover=0;if(h.spouse){h.spouse=0;S.spouse=null}const T={spy:[`🕵️ ${h.n} คือสายลับ`,`เอกสารลับของคุณหายไปพร้อม${h.n} ศัตรูรู้ทุกแผนที่คุณเคยเล่าให้ฟังบนหมอน`,()=>duel(`${h.n} (สายลับ)`,Math.round(threat(K)*1.05),w=>feed(w?`🕵️ คุณตามทัน ${h.n}คุกเข่า "ฉันไม่มีทางเลือก… แต่ความรู้สึกนั้นไม่ใช่เรื่องโกหก"`:`🕵️ ${h.n}หายไปข้ามพรมแดน คุณเสียทุกอย่างที่บอกเขาไป${money(-Math.round((S.money||0)*.25))}`))],
 assassin:[`🗡️ ${h.n} ถูกส่งมาฆ่าคุณ`,`ในคืนที่ควรจะหวานที่สุด ${h.n}ชักมีดออกมาจากใต้หมอน มือสั่น น้ำตาไหล "ขอโทษนะ… นี่คืองานของฉัน"`,()=>duel(`${h.n} (มือสังหาร)`,Math.round(threat(K)*1.15),w=>{if(w)feed(`🗡️ มีดหล่นลงพื้น ${h.n}ร้องไห้ "ฆ่าฉันเถอะ… ฉันทำไม่ได้" คุณปล่อยเขาไป`);else{S.hp=Math.max(1,S.hp-S.maxHp*.5);feed(`🗡️ มีดเฉียดหัวใจคุณไปนิ้วเดียว ${h.n}หนีไปในความมืด${hurt(.3)}`)}})],
 gold:[`💰 ${h.n} หายไปพร้อมเงิน`,`ตื่นเช้ามา ตู้เงินว่างเปล่า ${h.n}ไม่อยู่แล้ว เหลือแค่โน้ตสั้นๆ "ขอบคุณสำหรับทุกอย่างนะ ที่รัก"`,()=>feed(`💰 เงินหายไปครึ่งหนึ่ง${money(-Math.round((S.money||0)*.45))}`)],
 betroth:[`💍 คู่หมั้นของ ${h.n}`,`ชายฉกรรจ์ในชุดเกราะมาเคาะประตู "ข้าคือคู่หมั้นของ${h.n} และเจ้าขโมยเขาไปจากข้า"`,()=>duel(`คู่หมั้นของ${h.n}`,Math.round(threat(K)*1.1),w=>{if(w){h.betr=0;h.lover=1;h.sec=null;h.trust=Math.min(100,h.trust+20);feed(`💍 คุณชนะ ${h.n}ยกเลิกการหมั้นต่อหน้าทุกคนแล้วจับมือคุณ`)}else feed(`💍 ${h.n}ถูกพาตัวกลับไปแต่งงานตามสัญญา`)})]}[h.sec];
 if(!T)return;C(T[0],T[1],[O('…',T[2])])}
function hrConfront(K,h){C(`🕵️ เผชิญหน้า ${h.n}`,`คุณรู้แล้วว่า${h.n}เป็น${HRS[h.sec][1]} เขายังไม่รู้ว่าคุณรู้`,[
 O('🗣️ เปิดใจคุยตรงๆ',()=>talkDuel({ic:'🕵️',t:'ความจริงระหว่างเรา',vs:h.n,ev:2,intro:'เขาค่อยๆ วางถ้วยชาลง',win:()=>{h.sec=null;h.trust=90;h.aff=Math.min(100,h.aff+15);return `${h.n}เล่าทุกอย่าง แล้วทรยศเจ้านายเก่าเพื่อคุณแทน`},lose:()=>{queue(()=>hrBetray(K,h));return `${h.n}ยิ้มเศร้าๆ "งั้นเรามาถึงตอนจบแล้วสินะ"`}},()=>{})),
 O('🤐 ทำเป็นไม่รู้ แล้วป้อนข่าวปลอม',()=>{h.secR=1;h.fake=1;feed(`🤐 คุณเริ่มเล่า "แผนลับ" ปลอมให้${h.n}ฟังทุกคืน… ศัตรูจะเดินเข้ากับดักของคุณเอง${rep(6)}`)}),
 O('⚔️ ลงมือก่อน',()=>{h.betr=1;h.lover=0;duel(h.n,Math.round(threat(K)),w=>feed(w?`⚔️ ${h.n}ล้มลง "…อย่างน้อยฉันก็ได้เห็นเธอเป็นคนสุดท้าย"`:`⚔️ ${h.n}หนีไปได้`))})])}
function hrHaremEv(K){const L=HR(K).L.filter(o=>o.lover&&o.alive&&!o.away&&!o.betr);const avg=L.reduce((a,o)=>a+o.aff,0)/L.length,jl=L.reduce((a,o)=>a+o.jel,0)/L.length;
 C('🏰 บ้านที่มีคนรักหลายคน',`ตอนนี้คุณมีคนรัก ${L.length} คน ${jl<35?'ทุกคนเริ่มเข้ากันได้ บางทีก็ทำอาหารด้วยกัน':'บรรยากาศที่โต๊ะอาหารตึงเครียดจนได้ยินเสียงช้อนกระทบจาน'}`,[
  O('🫶 ดูแลทุกคนให้เท่ากัน',()=>{L.forEach(o=>{o.jel=Math.max(0,o.jel-15)});feed('🫶 คุณจัดตารางเวลาให้ทุกคนอย่างละเอียด… และไม่ได้นอนเลยทั้งปี')}),
  avg>=75&&jl<35?O('🏰 ใช้ชีวิตด้วยกันจนแก่เฒ่า',()=>ending(K,'hr_harem',`คุณกับคนรักทั้ง ${L.length} คนอยู่ด้วยกันจนแก่ บ้านหลังนั้นไม่เคยเงียบ และไม่เคยเหงาอีกเลย`,'ใช้ชีวิตกับคนรักทุกคน'),'ฉากจบ'):O('🍷 จัดงานเลี้ยงให้ทุกคนรู้จักกัน',()=>{if(rnd()<.5){L.forEach(o=>o.jel=Math.max(0,o.jel-25));feed('🍷 งานเลี้ยงจบลงด้วยเสียงหัวเราะ')}else{const a=pick(L),b=pick(L.filter(x=>x!==a));if(b)queue(()=>hrFight(K,a,b));feed('🍷 งานเลี้ยงจบลงด้วยแก้วไวน์ที่ถูกสาดใส่หน้า')}})])}
regEnd([['hr_harem','🏰','บ้านที่ไม่เคยเงียบ','ใช้ชีวิตกับคนรักหลายคนจนแก่']],['hero','trash','lost','magic','noble','mon']);
// ปีละครั้ง
{const _fy4=fanYear;fanYear=function(){const r=_fy4.apply(this,arguments);try{const K=FN();if(!K||!S.alive||K.end||!hrOk(K))return r;const P=HR(K),L=P.L.filter(h=>h.alive&&!h.away&&!h.betr);
 L.forEach(h=>{if(age()-h.last>=1)h.aff=Math.max(0,h.aff-(h.lover?5:3));if(h.lover){h.jel=Math.max(0,h.jel-4);if(h.ar==='free'&&age()-h.last>=2&&rnd()<.3){h.lover=0;h.away=1;feed(`🍃 ${h.n}ทิ้งจดหมายไว้ "ลมพัดมาแล้ว ฉันต้องไป"`)}}if(h.sec==='curse'&&h.lover&&age()-h.met>=4&&!h.cured){h.cured=-1;queue(()=>C(`🥀 คำสาปของ ${h.n}`,`${h.n}ไอเป็นเลือด แล้วสารภาพว่าต้องคำสาปมาตั้งแต่เด็ก "ฉันอยากใช้เวลาที่เหลือกับเธอ"`,[O('💰 ทุ่มเงินหายาแก้คำสาป',()=>{if((S.money||0)>=800){money(-800);h.sec=null;h.cured=1;h.aff=100;feed(`💊 ยาราคาแพงได้ผล ${h.n}หายขาด และร้องไห้ไม่หยุด`)}else{h.alive=0;h.lover=0;if(h.spouse){h.spouse=0;S.spouse=null}feed(`🥀 เงินไม่พอ… ${h.n}จากไปในอ้อมแขนคุณ${(()=>{try{joy(-20)}catch(e){}return''})()}`)}}),O('🫂 อยู่ข้างเขาจนวาระสุดท้าย',()=>{h.alive=0;h.lover=0;if(h.spouse){h.spouse=0;S.spouse=null}feed(`🥀 ${h.n}จากไปพร้อมรอยยิ้ม ทิ้งดอกไม้แห้งหนึ่งดอกไว้ในมือคุณ`);try{joy(-15)}catch(e){}})]))}});
 const lv=L.filter(h=>h.lover);let q=0;
 if(age()-P.ev>=1){const tr=lv.find(h=>h.sec&&['spy','assassin','gold','betroth'].includes(h.sec)&&!h.fake&&(h.trust<40||rnd()<.18));const yan=lv.find(h=>h.ar==='yan'&&h.jel>=70);const fa=lv.filter(h=>h.jel>=50);
  if(tr){queue(()=>hrBetray(K,tr));q=1}else if(yan&&rnd()<.6){queue(()=>hrYan(K,yan,false));q=1}else if(fa.length>=2&&rnd()<.55){const a=fa[0],b=fa[1];queue(()=>hrFight(K,a,b));q=1}else if(P.L.length<7&&rnd()<(L.length<2?.4:.2)){queue(()=>hrMeet(K));q=1}
  if(q)P.ev=age()}
 for(const x of LT(K).slice())if(x.k==='_hrYan'&&x.at<=age()){LT(K).splice(LT(K).indexOf(x),1);const h=P.L.find(o=>o.id===x.id);if(h)queue(()=>C(`🔪 ${h.n} กลับมา`,`${h.n}ยืนอยู่หน้าบ้านใหม่ของคุณ ทั้งที่คุณไม่เคยบอกใครว่าย้ายมาที่นี่ "เจอแล้ว"`,[O('⚔️ สู้',()=>duel(h.n,Math.round(threat(K)*1.1),w=>{if(w){h.alive=0;feed(`🔪 ${h.n}ล้มลงพร้อมรอยยิ้ม "อย่างน้อยเธอก็มองฉันอีกครั้ง"`)}else ending(K,'hr_stab',`${h.n}ได้คุณไปตลอดกาลในที่สุด`,'ถูกคนรักเก่าพรากชีวิต')})),O('🗣️ พูดให้จบ',()=>talkDuel({ic:'🔪',t:'จบเรื่องของเรา',vs:h.n,ev:0,intro:'ฝนตกหนักจนได้ยินแค่เสียงหายใจของเขา',win:()=>{h.away=1;h.betr=0;return `${h.n}ปล่อยมีด "ไปมีความสุขนะ" แล้วเดินหายไปในสายฝน`},lose:()=>{h.alive=0;return `${h.n}เดินลงแม่น้ำไปเงียบๆ คุณไม่ทันได้ห้าม`}},()=>{}))]))}
 if(QU.length)flush()}catch(e){console.error('harem year',e)}return r}}
regEnd([['hr_stab','🔪','รักจนตาย','ถูกคนรักเก่าตามมาพรากชีวิต',1]],['hero','trash','lost','magic','noble','mon']);
// ดวล: คนรักที่ผูกพันมากเข้ามาช่วย (ถ้ายังไม่มีปุ่มที่สอง)
(window._duPost=window._duPost||[]).push(F=>{try{if(!on()||F.x2)return;const K=FN();if(!K)return;const h=HR(K).L.filter(o=>o.lover&&o.alive&&!o.away&&!o.betr&&o.aff>=70).sort((a,b)=>b.aff-a.aff)[0];if(!h)return;F.x2={ic:HRA[h.ar][0],n:`${h.n} เข้ามาช่วย`,s:'คนรักร่วมสู้',c:'#ff8ab0',f(D,e,md){h.aff=Math.min(100,h.aff+2);return {en:md*1.3,t:`${HRA[h.ar][0]} ${h.n} ${h.ar==='yan'?'พุ่งเข้าใส่ศัตรูด้วยแววตาว่างเปล่า "อย่าแตะต้องคนของฉัน"':h.ar==='tsun'?'ตะโกน "ไม่ได้ช่วยเพราะห่วงหรอกนะ!" แล้วฟาดเต็มแรง':'กระโดดเข้ามาเคียงข้างคุณ'}`,good:true,fx:'spark'}}}}catch(e){}});
// เมนู + HUD
{const _om5=openMenu;openMenu=function(){const r=_om5.apply(this,arguments);try{const K=FN();if(on()&&K&&hrOk(K)){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-hr]')){const L=HR(K).L.filter(h=>h.alive&&!h.away&&!h.betr);const b=document.createElement('button');b.className='opt';b.setAttribute('data-hr',1);b.innerHTML=`💞 คนในใจ<small>${L.length?`${L.length} คน · คนรัก ${L.filter(h=>h.lover).length}`:'ยังไม่มีใคร'}</small>`;b.onclick=()=>fanHarem();d.appendChild(b)}}}catch(e){}return r}}
{const _hd2=hud;hud=function(K){let h=_hd2(K);try{const L=HR(K).L.filter(o=>o.lover&&o.alive&&!o.away&&!o.betr);if(L.length)h=h.replace('<div class="fhC">',`<div class="fhC"><span>💞 ${L.length}${L.some(o=>o.jel>=65)?' 😠':''}</span>`)}catch(e){}return h}}
window._hrTest={meet:()=>hrMeet(FN()),fight:()=>{const K=FN(),L=HR(K).L;if(L.length>=2)hrFight(K,L[0],L[1])},yan:()=>{const K=FN(),h=HR(K).L[0];if(h)hrYan(K,h,false)},betray:()=>{const K=FN(),h=HR(K).L[0];if(h){h.sec=h.sec||'spy';hrBetray(K,h)}},gen:()=>{const K=FN(),h=hrGen(K);HR(K).L.push(h);return h}};


// =================== 🌍 โลกที่มีชีวิต: คู่แข่ง · แผลเป็น · ความเครียด · กองไฟ · ชื่อเสียงฝ่าย · ตีอาวุธ · ข่าวลือ · ฤดูกาล ===================
//   ทุกปีเลือกเหตุการณ์จากแพ็กนี้ไม่เกิน 1 เรื่อง (ไม่ท่วมปี) + บรรทัดข่าวสั้น 1 บรรทัด · ทุกอย่างดูได้ที่เมนู "🌍 โลกและชีวิต"
const LW=K=>{const X=X9(K);return X.lw||(X.lw={st:10,inj:[],fac:{},news:[],mat:{},rv:null,ev:-9,camp:-1,rest:-1,seasonY:-1,forged:0})};
const LFAC={crown:['👑','ราชวงศ์'],church:['⛪','โบสถ์แห่งแสง'],guild:['🪪','กิลด์นักผจญภัย'],demon:['😈','กองทัพจอมมาร'],elf:['🧝','เผ่าเอลฟ์'],dwarf:['⛏️','อาณาจักรคนแคระ'],under:['🦹','โลกใต้ดิน']};
const LFOPP={crown:'under',under:'crown',church:'demon',demon:'church',elf:'dwarf',dwarf:'elf',guild:null};
function facAdd(K,k,d,quiet){const L=LW(K);L.fac[k]=Math.max(-100,Math.min(100,(L.fac[k]|0)+d));const o=LFOPP[k];if(o&&d>0)L.fac[o]=Math.max(-100,(L.fac[o]|0)-Math.round(d*.5));return quiet?'':` <span class="tag2">${LFAC[k][0]} ${d>=0?'+':''}${d}</span>`}
const facT=v=>v>=80?'ยกย่องเป็นวีรบุรุษ':v>=50?'เป็นมิตรมาก':v>=20?'เป็นมิตร':v>-20?'เฉยๆ':v>-50?'ไม่ไว้ใจ':v>-80?'เป็นศัตรู':'ตั้งค่าหัว';
// ---------- 🧠 ความเครียด ----------
function stAdd(K,d,why){const L=LW(K);const o=L.st;L.st=Math.max(0,Math.min(100,L.st+d));if(d>=10&&why)feed(`🧠 ${why} <span class="tag2">ความเครียด ${Math.round(L.st)}</span>`);if(o<85&&L.st>=85)queue(()=>evBreak(K));return''}
const stT=v=>v>=85?'😵 ใกล้แตกสลาย':v>=60?'😰 เครียดหนัก':v>=35?'😟 เหนื่อยใจ':'😌 ใจสงบ';
function evBreak(K){C('😵 จิตใจใกล้แตกสลาย',`คืนนี้คุณนอนไม่หลับเป็นคืนที่สิบ มือสั่นตอนจับอาวุธ เสียงในหัวพูดชื่อคนที่จากไปซ้ำๆ`,[
 O('⛪ ไปหานักบวชที่โบสถ์',()=>{const L=LW(K);L.st=35;feed(`⛪ นักบวชชรานั่งฟังคุณจนรุ่งเช้า ไม่พูดอะไรเลยนอกจาก "เจ้ายังอยู่ตรงนี้" ${facAdd(K,'church',8)}`)}),
 O('🌑 รับพลังจากเสียงกระซิบในความมืด',()=>{const L=LW(K);L.st=20;K.dark=(K.dark|0)+20;K.pw+=capOf(K)*.12;feed(`🌑 ความกลัวหายไปทั้งหมด… พร้อมกับอะไรบางอย่างในตัวคุณ · ⚡ พลังเพิ่ม · 🌑 ความมืด +20`)},'แรงขึ้นแต่เสี่ยง'),
 O('🏃 ทิ้งทุกอย่างหนีไปอยู่ชายทะเลหนึ่งปี',()=>{const L=LW(K);L.st=0;money(-Math.round((S.money||0)*.2));feed('🏖️ คุณหายไปหนึ่งปี กลับมาพร้อมผิวคล้ำแดด และเงินที่น้อยลง แต่ใจกลับมาเต้นปกติ')})])}
// ---------- 🩹 แผลเป็นและบาดแผลถาวร ----------
const INJ={eye:['👁️','เสียตาข้างหนึ่ง','read:-.04','🔮 ตาเวทมนตร์ (800)','read:.03',800],arm:['💪','แขนพิการ','pow:-4 fight:-.03','⚙️ แขนกลเวท (700)','pow:3 fight:.01',700],leg:['🦵','ขาเจ็บถาวร','luck:-.03 hp:-10','🦿 ขาเหล็กเวท (500)','hp:10',500],scar:['⚡','แผลเป็นใหญ่บนหน้า','fight:.01','',''],burn:['🔥','แผลไฟไหม้ทั้งแผ่นหลัง','hp:-8','🧴 ยาผิวหนังเอลฟ์ (400)','',400]};
function injAdd(K,by){const L=LW(K),have=L.inj.map(x=>x.k);const ks=Object.keys(INJ).filter(k=>!have.includes(k));if(!ks.length)return'';const k=pick(ks);L.inj.push({k,by:String(by||'').slice(0,24),a:age(),fix:0});recalcE(K);stAdd(K,12);return ` <b style="color:#ff8a7a">· ${INJ[k][0]} ${INJ[k][1]}</b>`}
// ---------- 🤺 คู่แข่งตลอดชีวิต ----------
const RVP=[['😤','หยิ่งยโส ไม่ยอมแพ้ใคร'],['😎','อัจฉริยะที่ไม่ต้องพยายาม'],['🔥','ขยันจนน่ากลัว'],['🎭','ยิ้มตลอดแต่อ่านไม่ออก'],['🌑','เกลียดคุณตั้งแต่แรกเห็นโดยไม่มีเหตุผล']];
const RVPATH={rival:'🤺 คู่แข่ง',friend:'🤝 เพื่อนรัก',lover:'💞 คนรัก',enemy:'⚔️ ศัตรูคู่แค้น',demon:'😈 เข้าข้างจอมมาร',dead:'🕯️ จากไปแล้ว'};
function rvMake(K){const g=rnd()<.5?'ชาย':'หญิง',p=pick(RVP);const org={iso:'นักเรียนอีกคนที่ถูกอัญเชิญมาพร้อมคุณ',magic:'เพื่อนร่วมรุ่นที่สอบได้คะแนนสูงสุดเท่าคุณ',noble:'ทายาทตระกูลคู่แข่งที่นั่งโต๊ะข้างคุณ',mon:'สัตว์อสูรอีกตัวในถิ่นเดียวกัน'}[hrW(K)];return {n:fbFirst(g),g,ic:p[0],ps:p[1],org,lv:1,rel:0,path:'rival',w:0,l:0,met:age(),alive:1,hist:[]}}
function rvTxt(R0){return `${R0.ic} <b>${E(R0.n)}</b> · ${RVPATH[R0.path]} · ชนะ ${R0.w} แพ้ ${R0.l}`}
function evRival(K){const L=LW(K),R0=L.rv;if(!R0||!R0.alive)return;const P=threat(K);const ep=Math.round(P*(.9+R0.lv*.04));const age0=age();
 if(age0>=45&&!R0.fin&&R0.path!=='lover'){R0.fin=1;return C(`🤺 ดวลครั้งสุดท้ายกับ ${R0.n}`,`ผมของ ${E(R0.n)} ขาวไปครึ่งหัวแล้ว เขายืนรอคุณที่ลานเดิมที่ดวลกันครั้งแรกเมื่อ ${age0-R0.met} ปีก่อน "ครั้งนี้ไม่มีใครมาห้ามแล้วนะ"`,[O('⚔️ ดวลให้จบ',()=>duel(R0.n,Math.round(ep*1.15),w=>{w?R0.w++:R0.l++;feed(w?`🤺 ${E(R0.n)}ล้มลงแล้วหัวเราะ "ทั้งชีวิตข้าวิ่งตามเจ้า… ขอบคุณที่ทำให้ข้ามีเป้าหมาย"`:`🤺 ${E(R0.n)}ยื่นมือดึงคุณลุก "ในที่สุด… ข้าก็ชนะเจ้าสักครั้ง" แล้วร้องไห้`);try{K.f.rvFin=w?1:2}catch(e){}})),O('🍶 นั่งดื่มด้วยกันแทน',()=>{R0.path='friend';R0.rel=100;feed(`🍶 คุณกับ ${E(R0.n)}นั่งดื่มจนเช้า เล่าเรื่องสี่สิบปีให้กันฟัง ไม่มีใครพูดถึงการดวลอีกเลย`)})])}
 if(R0.path==='rival'&&R0.rel>=60&&!R0.cf&&rnd()<.5){R0.cf=1;return C(`💌 ${R0.n} พูดอะไรบางอย่าง`,`หลังดวลกันครั้งที่ ${R0.w+R0.l} ${E(R0.n)}ไม่ยอมเงยหน้า "ข้า… เลิกอยากชนะเจ้าไปนานแล้ว ข้าแค่อยากอยู่ใกล้ๆ"`,[O('💞 รับความรู้สึกนั้น',()=>{R0.path='lover';try{const h=hrGen(K);h.n=R0.n;h.g=R0.g;h.ar='tsun';h.org='🤺 คู่แข่งตลอดชีวิต';h.aff=80;h.lover=1;h.trust=80;HR(K).L.push(h)}catch(e){}feed(`💞 คู่แข่งที่ดวลกันมาทั้งชีวิต กลายเป็นคนรักของคุณ`)}),O('🤝 เป็นเพื่อนแบบนี้ดีที่สุด',()=>{R0.path='friend';R0.rel=90;feed(`🤝 ${E(R0.n)}ยิ้มเศร้าๆ "งั้นข้าจะเป็นเพื่อนที่ดีที่สุดของเจ้า"`)})])}
 if(R0.path==='rival'&&R0.rel<=-50&&K.dark>=20&&!R0.dm&&rnd()<.5){R0.dm=1;R0.path='demon';return C(`😈 ${R0.n} เลือกฝ่ายจอมมาร`,`ข่าวลือมาถึงหูคุณ ${E(R0.n)}เดินเข้าปราสาทจอมมารด้วยตัวเอง เขาทิ้งข้อความไว้ "ถ้าข้าชนะเจ้าด้วยวิธีปกติไม่ได้ ข้าจะใช้วิธีอื่น"`,[O('⚔️ ไปลากตัวกลับมา',()=>duel(`${R0.n} (สาวกจอมมาร)`,Math.round(ep*1.25),w=>{if(w){R0.path='rival';R0.rel=10;feed(`⚔️ คุณลากตัว ${E(R0.n)}ออกมาจากปราสาท เขาด่าคุณตลอดทาง แต่ไม่ได้ขัดขืน${facAdd(K,'demon',-10)}`)}else feed(`⚔️ ${E(R0.n)}ไม่กลับมา และพลังของเขามืดกว่าที่คุณเคยเห็น`)})),O('🚶 นั่นคือทางของเขา',()=>{R0.path='enemy';feed(`🚶 ตั้งแต่วันนั้นทุกครั้งที่ได้ยินชื่อ${E(R0.n)} คือในรายชื่อขุนพลจอมมาร`)})])}
 const T=pick(R0.path==='friend'?['help','drink']:R0.path==='enemy'||R0.path==='demon'?['ambush']:['exam','steal','spar','save']);
 if(T==='exam')C(`📜 แข่งกับ ${R0.n}`,`${K.w==='magic'||K.w==='noble'?'การสอบปลายภาค':'การคัดเลือกนักผจญภัยประจำปี'} เหลือแค่สองคนในรอบสุดท้าย คุณกับ ${E(R0.n)} ${R0.ic}`,[O('⚔️ สู้สุดแรง',()=>duel(R0.n,ep,w=>{w?R0.w++:R0.l++;R0.rel+=w?-3:6;R0.lv++;feed(w?`🏆 คุณชนะ ${E(R0.n)}กัดฟัน "ปีหน้าเจอกัน"`:`💥 ${E(R0.n)}ชนะ แล้วเดินผ่านคุณไปโดยไม่หันมามอง`)})),O('🗣️ ท้าแข่งวาทะแทน',()=>talkDuel({ic:'📜',t:'แข่งวาทะกับคู่แข่ง',vs:R0.n,ev:1,intro:'กรรมการทั้งห้องรอฟัง',win:()=>{R0.w++;R0.rel+=4;return `${E(R0.n)}หน้าแดง "เจ้าพูดเก่งขึ้นนะ"`},lose:()=>{R0.l++;return `${E(R0.n)}ยิ้มเยาะ "ฝีปากไม่ช่วยอะไรหรอก"`}},()=>{})),O('🙅 ยอมแพ้ให้',()=>{R0.l++;R0.rel-=10;feed(`🙅 ${E(R0.n)}โกรธมาก "อย่ามาดูถูกข้าด้วยการยอม!"`)})]);
 else if(T==='steal')C(`🏃 ${R0.n} แย่งงานของคุณ`,`เควส/ทุน/ตำแหน่งที่คุณหมายตาไว้ ${E(R0.n)}คว้าไปก่อนหนึ่งวัน`,[O('😤 ไปท้าแย่งคืน',()=>duel(R0.n,ep,w=>{w?R0.w++:R0.l++;R0.lv++;feed(w?`😤 คุณได้คืนมา${money(200)}`:'😤 เขาได้ไปจริงๆ')})),O('🍀 ปล่อยไป',()=>{R0.rel+=8;feed(`🍀 ${E(R0.n)}งงที่คุณไม่โกรธ ปีต่อมาเขาฝากของมาขอบคุณ`)})]);
 else if(T==='spar'){R0.lv++;R0.rel+=5;feed(`🤺 คุณกับ ${E(R0.n)} ซ้อมดาบกันจนมืด ไม่มีใครยอมพูดว่าเหนื่อยก่อน${pw(capOf(K)*.02)}`)}
 else if(T==='save')C(`🆘 ${R0.n} ตกอยู่ในอันตราย`,`${E(R0.n)}ติดอยู่ในรังมอนสเตอร์ และคุณเป็นคนเดียวที่อยู่ใกล้พอจะช่วย`,[O('⚔️ เข้าไปช่วย',()=>duel('ราชามอนสเตอร์ในรัง',Math.round(P*1.05),w=>{if(w){R0.rel+=25;feed(`🆘 คุณแบก${E(R0.n)}ออกมา เขาไม่พูดขอบคุณ แต่ตั้งแต่วันนั้นสายตาเปลี่ยนไป`)}else{R0.alive=0;R0.path='dead';stAdd(K,22,`${R0.n}ไม่ได้ออกมาจากรังนั้น`)}})),O('🚶 ปล่อยให้เขาช่วยตัวเอง',()=>{R0.rel-=30;feed(`🚶 ${E(R0.n)}รอดมาได้ด้วยตัวเอง พร้อมความแค้นที่ฝังลึก`)})]);
 else if(T==='help'){K.pw+=capOf(K)*.03;feed(`🤝 ${E(R0.n)}โผล่มาช่วยคุณตอนลำบากเหมือนทุกครั้ง "อย่าเข้าใจผิด ข้าแค่ไม่อยากให้คนอื่นชนะเจ้า"`)}
 else if(T==='drink'){stAdd(K,-12);feed(`🍶 คุณกับ ${E(R0.n)}นั่งดื่มรำลึกความหลัง หัวเราะเรื่องที่เคยโกรธกันแทบตาย`)}
 else C(`⚔️ ${R0.n} ลอบโจมตี`,`${E(R0.n)}ดักรอคุณกลางทาง ${R0.path==='demon'?'ออร่ามืดล้อมรอบตัว':'แววตาเต็มไปด้วยความแค้น'}`,[O('⚔️ สู้',()=>duel(R0.n,Math.round(ep*1.1),w=>{w?R0.w++:R0.l++;if(!w){const s=injAdd(K,R0.n);feed(s?`⚔️ ${E(R0.n)}ทิ้งแผลไว้ให้คุณจำ${s}`:'⚔️ คุณหนีรอดมาได้')}else feed(`⚔️ ${E(R0.n)}ถอยหนีไปพร้อมคำสาปแช่ง`)}))])}
// ---------- 🏕️ กองไฟกับปาร์ตี้ (ต่อยอดระบบปาร์ตี้เดิม) ----------
const CAMPT=[['🌌','เรื่องดาวบนฟ้า','ตอนเด็กแม่บอกว่าคนตายจะกลายเป็นดาว ข้านับดาวทุกคืนเผื่อจะเจอเขา'],['🏠','บ้านเกิด','หมู่บ้านข้าถูกเผาตอนข้าเจ็ดขวบ ข้าจำได้แค่สีของไฟ'],['💭','ความฝัน','ถ้าเรื่องนี้จบ ข้าอยากเปิดร้านขนมปังเล็กๆ'],['😂','เรื่องขำ','ครั้งแรกที่ข้าใช้ดาบ ข้าฟันกางเกงตัวเองขาด'],['🗡️','คนที่ฆ่า','ข้ายังเห็นหน้าคนแรกที่ข้าฆ่าทุกคืน']];
function evCamp(K){const X=X3(K),P=X.party.filter(p=>p.alive);if(!P.length)return false;const p=pick(P),t=pick(CAMPT);
 if(P.length>=2&&rnd()<.3){const a=P[0],b=P[1];return C(`🔥 ${a.n} กับ ${b.n} ทะเลาะกัน`,`ข้างกองไฟ ${E(a.n)} (${PCL[a.c][1]}) กับ ${E(b.n)} (${PCL[b.c][1]}) เถียงกันเรื่อง${pick(['แบ่งของที่ได้','ใครทำแผนพัง','คนที่เพิ่งตายไปเมื่อวาน'])}จนเกือบชักอาวุธ`,[O(`🛡️ เข้าข้าง ${a.n}`,()=>{a.b=Math.min(100,a.b+12);b.b-=18;feed(`🛡️ ${E(b.n)}นอนหันหลังให้ทุกคนคืนนั้น`)}),O(`🛡️ เข้าข้าง ${b.n}`,()=>{b.b=Math.min(100,b.b+12);a.b-=18;feed(`🛡️ ${E(a.n)}เดินไปนั่งคนเดียวที่ริมน้ำ`)}),O('🗣️ ให้ทั้งคู่ใจเย็น',()=>talkDuel({ic:'🔥',t:'ไกล่เกลี่ยในปาร์ตี้',vs:`${a.n} และ ${b.n}`,ev:1,intro:'ไฟกองนั้นปะทุเสียงดัง',win:()=>{a.b+=8;b.b+=8;return 'ทั้งคู่ยอมจับมือกัน แล้วแบ่งเนื้อย่างชิ้นสุดท้าย'},lose:()=>{a.b-=8;b.b-=8;return 'เช้ามาทั้งคู่ไม่มองหน้ากัน'}},()=>{}))])}
 C(`🏕️ คืนรอบกองไฟ`,`${E(p.n)} ${PCL[p.c][0]} เขี่ยกองไฟเงียบๆ แล้วพูดขึ้นมา "${t[2]}"`,[O('👂 นั่งฟังจนจบ',()=>{p.b=Math.min(100,p.b+10);stAdd(K,-6);feed(`🏕️ คืนนั้นคุณรู้จัก ${E(p.n)} มากกว่าที่เดินทางด้วยกันมาทั้งปี`)}),O('🍖 ยื่นเนื้อย่างให้',()=>{p.b=Math.min(100,p.b+5);feed(`🍖 ${E(p.n)}ยิ้ม "เจ้านี่ไม่ถนัดปลอบคนจริงๆ"`)}),p.b>=50&&!p.pq?O(`🗺️ "ข้าจะช่วยเจ้าเอง"`,()=>{p.pq=1;duel(pick(['คนที่เผาหมู่บ้านของเขา','อดีตอาจารย์ที่หักหลังเขา','ปีศาจที่ขังน้องของเขา']),Math.round(threat(K)*1.1),w=>{if(w){p.b=100;feed(`🗺️ เควสส่วนตัวของ ${E(p.n)}จบลง เขาคุกเข่าต่อหน้าคุณ "ชีวิตที่เหลือของข้าเป็นของเจ้า"`);recalcE(K)}else{if(rnd()<.4){p.alive=0;stAdd(K,25,`${p.n}ตายในศึกล้างแค้นของตัวเอง`);recalcE(K)}else feed(`🗺️ คุณสองคนหนีรอดมาได้ แต่ศัตรูของเขายังอยู่`)}})},'เควสส่วนตัว'):O('😴 ไปนอนก่อน',()=>feed('😴 คุณได้ยินเขาพูดต่อกับกองไฟคนเดียวจนดึก'))]);return true}
// ---------- ⚒️ ตีอาวุธจากวัตถุดิบ ----------
const MATN={beast:['เขี้ยว','หนัง','กรงเล็บ'],dragon:['เกล็ดมังกร','เขามังกร','หัวใจมังกร'],demon:['เขาปีศาจ','เลือดดำ','ผลึกนรก'],mage:['ผลึกเวท','คทาหัก'],knight:['เศษเกราะ'],rogue:['ใบมีดเงา'],hero:['ขนนกเทพ'],noble:['ตราตระกูล']};
const MATR={beast:1,knight:1,rogue:2,noble:1,mage:2,demon:3,hero:3,dragon:4};
function matAdd(K,name,kind){const L=LW(K),k=pick(MATN[kind]||MATN.beast)+'·'+String(name).replace(/\s*\(.*\)/,'').slice(0,14),r=MATR[kind]||1;L.mat[k]=L.mat[k]||{n:0,r};L.mat[k].n++;return ` <span class="tag2">⚒️ ได้วัตถุดิบ ${k}</span>`}
window.lwForge=function(sel){const K=FN(),L=LW(K),ks=Object.keys(L.mat).filter(k=>L.mat[k].n>0);sel=sel||[];
 modal(`<button class="xbtn" onclick="lwHub()">✕</button><h3>⚒️ โรงตีเหล็กของคนแคระ</h3><p class="tag2">เลือกวัตถุดิบ 2 ชิ้นจากมอนสเตอร์ที่ล่ามา · ยิ่งหายากยิ่งได้ของดี · มีโอกาสเกิดของในตำนาน · ค่าแรง 150 เหรียญ</p>
 ${ks.length?`<div class="mgrid">${ks.map(k=>`<button class="opt" style="${sel.includes(k)?'border-color:#ffd54a;background:#ffd54a22':''}" onclick="lwForgeSel('${encodeURIComponent(k)}')">${'⭐'.repeat(L.mat[k].r)} ${E(k)}<small>มี ${L.mat[k].n}</small></button>`).join('')}</div>`:'<p>ยังไม่มีวัตถุดิบ — ชนะดวลกับสัตว์อสูร ปีศาจ หรือมังกรจะได้มา</p>'}
 <div style="display:flex;gap:6px;margin-top:6px">${['w','a','c'].map(s=>`<button class="gbtn" style="flex:1" ${sel.length===2?'':'disabled'} onclick="lwForgeGo('${s}')">${{w:'🗡️ อาวุธ',a:'🛡️ ชุดเกราะ',c:'💍 เครื่องประดับ'}[s]}</button>`).join('')}</div>`,'forge');window._lwSel=sel};
window.lwForgeSel=function(k){k=decodeURIComponent(k);const s=(window._lwSel||[]).slice();const i=s.indexOf(k);if(i>=0)s.splice(i,1);else{s.push(k);if(s.length>2)s.shift()}lwForge(s)};
window.lwForgeGo=function(sl){const K=FN(),L=LW(K),s=window._lwSel||[];if(s.length!==2)return;if((S.money||0)<150){toast('💰 ค่าแรงไม่พอ');return}money(-150);const r=s.reduce((a,k)=>a+L.mat[k].r,0);s.forEach(k=>{L.mat[k].n--;if(L.mat[k].n<=0)delete L.mat[k]});
 const leg=rnd()<.04+r*.02;const t=Math.min(5,leg?5:Math.max(1,Math.round(r*.6+rnd())));const gx=mkGear(t,sl);const base=s[0].split('·')[0];gx.n=`${gx.n.replace(/[^\sก-๙]*$/,'')}${base}`;if(leg){gx.n='⚜️ '+gx.n+'แห่งตำนาน';gx.fx+=' pow:6 fight:.04'}
 const nm2=prompt('ตั้งชื่ออาวุธ/ของชิ้นนี้ (เว้นว่าง = ชื่อเดิม)',gx.n);if(nm2&&nm2.trim())gx.n=nm2.trim().slice(0,24);X3(K).inv.push(gx);L.forged++;closeM();fxBig(leg?'fw':'spark',leg?1.7:1.2);
 say(`⚒️ ช่างคนแคระตีเหล็กสามวันสามคืน… ได้ <b>${gName(gx)}</b> ${'⭐'.repeat(t+1)}${leg?' <b>ของในตำนาน!</b>':''} <span class="tag2">${fxT(gx.fx)} · ใส่ได้ที่หน้าอุปกรณ์</span>${facAdd(K,'dwarf',4)}`,leg?'myth':'epic',leg)};
// ---------- 📰 ข่าวลือ: โลกที่เดินไปเอง ----------
const NWT={war:['⚔️','สงครามสองอาณาจักร',['ข่าวลือว่าทหารรวมพลที่ชายแดน','ปะทะกันที่ชายแดนแล้ว ผู้ลี้ภัยเริ่มเข้าเมือง','สงครามเต็มรูปแบบ ราคาอาหารพุ่งสามเท่า','เมืองที่คุณเคยไปถูกเผาวอด'],'crown'],
 plague:['🦠','โรคระบาดผื่นเงิน',['มีคนป่วยแปลกๆ ในหมู่บ้านทางใต้','โรคลามเข้าเมือง ร้านค้าปิดครึ่งตลาด','คนตายทุกวัน โบสถ์รับศพไม่ไหว','ครึ่งเมืองว่างเปล่า'],'church'],
 cult:['🕯️','ลัทธิดวงจันทร์ดำ',['มีคนหายในคืนพระจันทร์เต็มดวง','พบวงเวทเลือดใต้สะพาน','ลัทธิจับเด็กไปทำพิธี','ประตูนรกเปิดแง้มกลางเมือง'],'church'],
 famine:['🌾','ทุพภิกขภัย',['ฝนไม่ตกมาสามเดือน','ข้าวยากหมากแพง','คนอดอยากปล้นยุ้งฉาง','หมู่บ้านทั้งหมู่บ้านอพยพหนี'],'crown'],
 gold:['💰','ตื่นทองที่ภูเขาเหนือ',['มีคนเจอทองในลำธาร','คนแห่ไปขุดทองนับพัน','แก๊งโจรครองเหมือง','ภูเขาถล่มทับคนขุดทอง'],'dwarf'],
 throne:['👑','ศึกชิงบัลลังก์',['ราชาประชวรหนัก','เจ้าชายสององค์แย่งอำนาจ','เลือดนองในวัง','ทหารปกครองบ้านเมือง'],'crown'],
 elf:['🌳','เอลฟ์ปิดป่า',['เอลฟ์ไล่คนตัดไม้ออกจากป่า','ลูกธนูเอลฟ์ยิงพ่อค้ากลางทาง','อาณาจักรเตรียมเผาป่า','ป่าโบราณลุกเป็นไฟ'],'elf']};
function newsTick(K){const L=LW(K);L.news.forEach(n=>{if(n.done)return;if(n.y!==age()){n.s++;n.y=age();if(n.s>=4){n.done=1;n.bad=1;const T=NWT[n.k];feed(`📰 <b>${T[0]} ${T[1]}</b> — ${T[2][3]} <span class="tag2">(ไม่มีใครหยุดมันได้ทัน)</span>`);stAdd(K,6);if(n.k==='war'||n.k==='famine'||n.k==='throne')money(-Math.round((S.money||0)*.12));if(n.k==='plague'&&rnd()<.4){const h=(HR(K).L||[]).find(o=>o.lover&&o.alive&&!o.away);if(h){h.alive=0;h.lover=0;stAdd(K,20,`${h.n}ติดโรคระบาดและจากไป`)}}}else feed(`📰 ${NWT[n.k][0]} ${NWT[n.k][2][n.s]}`)}})
 if(L.news.filter(n=>!n.done).length<2&&rnd()<.4){const k=pick(Object.keys(NWT).filter(x=>!L.news.some(n=>n.k===x&&!n.done)));if(k){L.news.push({k,s:0,y:age()});feed(`📰 <b>ข่าวลือใหม่:</b> ${NWT[k][0]} ${NWT[k][2][0]}`)}}}
function evNews(K){const L=LW(K),n=L.news.find(x=>!x.done&&x.s>=1);if(!n)return false;const T=NWT[n.k],P=threat(K);
 const win=t=>{n.done=1;n.good=1;stAdd(K,-5);feed(`📰 <b>${T[0]} ${T[1]} ยุติลง</b> — ${t}${facAdd(K,T[3],12)}${rep(8)}`)};
 C(`📰 ${T[0]} ${T[1]}`,`${T[2][n.s]} <span class="tag2">(ระดับ ${n.s}/3 · ถ้าไม่มีใครทำอะไร ปีหน้าจะแย่ลง)</span>`,[
  O('⚔️ ลงมือหยุดด้วยตัวเอง',()=>duel({war:'แม่ทัพฝ่ายรุกราน',plague:'หมอผีผู้ปล่อยโรค',cult:'หัวหน้าลัทธิดวงจันทร์ดำ',famine:'หัวหน้าโจรปล้นยุ้งฉาง',gold:'หัวหน้าแก๊งเหมืองทอง',throne:'องครักษ์เจ้าชายผู้ก่อกบฏ',elf:'ผู้พิทักษ์ป่าเอลฟ์'}[n.k],Math.round(P*(1+n.s*.1)),w=>{if(w)win('เพราะคุณ');else{stAdd(K,8);feed(`📰 คุณล้มเหลว และเรื่องยิ่งลุกลาม${hurt(.15)}`)}}),'ดวล'),
  O('🗣️ เจรจา/ไกล่เกลี่ย',()=>talkDuel({ic:T[0],t:T[1],vs:{war:'ทูตสองอาณาจักร',plague:'สภาเมือง',cult:'นักบวชลัทธิ',famine:'ขุนนางเจ้าของยุ้งฉาง',gold:'สมาคมคนขุดทอง',throne:'เจ้าชายทั้งสององค์',elf:'ผู้อาวุโสเอลฟ์'}[n.k],ev:1,intro:T[2][n.s],win:()=>{win('ด้วยคำพูดของคุณ');return ''},lose:()=>'ไม่มีใครฟังคุณ'},()=>{})),
  O('💰 บริจาคช่วยเหลือ',()=>{const c=Math.round(300+n.s*250);if((S.money||0)>=c){money(-c);if(rnd()<.6)win('เงินของคุณช่วยได้ทันเวลา');else feed(`💰 เงินช่วยได้บ้าง แต่ไม่พอหยุดมัน${facAdd(K,T[3],5)}`)}else feed('💰 เงินไม่พอ')}),
  O('🙈 ไม่ใช่เรื่องของเรา',()=>feed('🙈 คุณเลือกใช้ชีวิตต่อ… แต่ข่าวยังตามคุณทุกเช้า'))]);return true}
// ---------- 🌸 ฤดูกาล ----------
const SEA=[['🌸','ฤดูใบไม้ผลิ','เทศกาลดอกไม้บาน คนหนุ่มสาวมอบดอกไม้ให้คนที่แอบชอบ',[['💐 มอบดอกไม้ให้คนในใจ','hr'],['🌱 ช่วยชาวบ้านปลูกพืช','farm'],['🍡 เดินเที่ยวงานคนเดียว','rest']]],
 ['☀️','ฤดูร้อน','เทศกาลไฟ มีการแข่งกระโดดข้ามกองไฟและดอกไม้ไฟทั้งคืน',[['🔥 แข่งกระโดดข้ามกองไฟ','fire'],['🎆 ชวนคนในใจดูดอกไม้ไฟ','hr'],['🍺 ดื่มกับเพื่อนในปาร์ตี้','party']]],
 ['🍂','ฤดูใบไม้ร่วง','ฤดูเก็บเกี่ยว และฝูงมอนสเตอร์อพยพผ่านเมือง',[['🛡️ ช่วยป้องกันเมืองจากฝูงมอนสเตอร์','mon'],['🌾 ช่วยเก็บเกี่ยว','farm'],['🥧 งานเลี้ยงเก็บเกี่ยว','rest']]],
 ['❄️','ฤดูหนาว','หิมะตกหนัก อาหารขาดแคลน คนจนหนาวตายข้างถนน',[['🍲 ตั้งโรงทานแจกซุป','alms'],['🔥 นั่งข้างเตาผิงกับคนในใจ','hr'],['🏔️ ล่าหมาป่าน้ำแข็งที่ลงมาจากเขา','mon']]]];
function evSeason(K){const L=LW(K);L.seasonY=age();const s=SEA[age()%4];
 C(`${s[0]} ${s[1]}`,s[2],s[3].map(([t,k])=>O(t,()=>{if(k==='hr'){const h=(HR(K).L||[]).filter(o=>o.alive&&!o.away&&!o.betr).sort((a,b)=>b.aff-a.aff)[0];if(h){h.aff=Math.min(100,h.aff+12);hrJel(K,h,8);feed(`${s[0]} คุณใช้เทศกาลนี้กับ ${E(h.n)} ${pick(['เขาจับมือคุณตลอดงาน','เขาเก็บดอกไม้แห้งจากวันนั้นไว้ในสมุด','เขาพูดว่า "ปีหน้ามาด้วยกันอีกนะ"'])} · 💗 +12`)}else feed(`${s[0]} คุณไม่มีใครให้ชวน… เลยนั่งดูคู่รักคนอื่นจนงานเลิก`);stAdd(K,-8)}
  else if(k==='fire')mgHold('🔥 กระโดดข้ามกองไฟ',sc=>{feed(sc>=.6?`🔥 คุณกระโดดได้สูงที่สุดในงาน ได้มงกุฎดอกไม้${rep(4)}`:`🔥 ก้นเสื้อคุณติดไฟ ทั้งงานหัวเราะ (รวมถึงคุณด้วย)`);stAdd(K,-10)});
  else if(k==='mon')duel(pick(['ฝูงหมาป่าน้ำแข็ง','ราชาหมูป่าอพยพ','ฝูงอสูรขนเหล็ก']),Math.round(threat(K)*.95),w=>feed(w?`🛡️ เมืองปลอดภัย ชาวบ้านเอาของมาให้เต็มบ้าน${facAdd(K,'crown',4)}${matAdd(K,'ฝูงมอนสเตอร์','beast')}`:`🛡️ ฝูงมอนสเตอร์ทำลายนาไปครึ่งหนึ่ง`));
  else if(k==='alms'){money(-120);stAdd(K,-6);feed(`🍲 คิวยาวสามช่วงตึก มีเด็กคนหนึ่งกลับมาขอบคุณทุกปีหลังจากนั้น${facAdd(K,'church',6)}`)}
  else if(k==='party'){X3(K).party.forEach(p=>{if(p.alive)p.b=Math.min(100,p.b+6)});stAdd(K,-10);feed('🍺 ทั้งปาร์ตี้เมาจนร้องเพลงผิดคีย์ทั้งคืน')}
  else{stAdd(K,-12);feed(`${s[0]} คุณได้พักผ่อนจริงๆ เป็นครั้งแรกในรอบปี${k==='farm'?facAdd(K,'crown',2):''}`)}})))}
// ---------- 🏰 เหตุการณ์ของฝ่ายต่างๆ ----------
function evFaction(K){const L=LW(K);const bad=Object.keys(LFAC).find(k=>(L.fac[k]|0)<=-50&&!L['bt'+k]);if(bad){L['bt'+bad]=age();return C(`${LFAC[bad][0]} ${LFAC[bad][1]} ส่งคนมาจัดการคุณ`,`ชื่อของคุณอยู่ในรายชื่อศัตรูของ${LFAC[bad][1]} คืนนี้มีคนมาเคาะประตู`,[O('⚔️ สู้',()=>duel(`นักฆ่าของ${LFAC[bad][1]}`,Math.round(threat(K)*1.1),w=>feed(w?`⚔️ คุณรอด แต่${LFAC[bad][1]}ไม่ลืม`:`⚔️ คุณบาดเจ็บสาหัส${injAdd(K,LFAC[bad][1])}`))),O('🗣️ ขอเจรจา',()=>talkDuel({ic:LFAC[bad][0],t:`เจรจากับ${LFAC[bad][1]}`,vs:`ทูตของ${LFAC[bad][1]}`,ev:1,intro:'มีดยังไม่เก็บเข้าฝัก',win:()=>{L.fac[bad]=-20;return 'ทูตยอมถอนชื่อคุณออกจากรายชื่อ'},lose:()=>'ทูตส่ายหัว "ไม่มีอะไรต้องคุยแล้ว"'},()=>{}))])}
 const good=Object.keys(LFAC).find(k=>(L.fac[k]|0)>=60&&!L['gf'+k]);if(good){L['gf'+good]=age();const g2={crown:'ตำแหน่งอัศวินกิตติมศักดิ์และที่ดินผืนเล็ก',church:'พรศักดิ์สิทธิ์ที่ทำให้แผลหายเร็ว',guild:'ส่วนลดค่าที่พักทุกเมือง',demon:'แหวนที่ทำให้มอนสเตอร์ไม่โจมตีคุณ',elf:'ธนูที่ทำจากต้นไม้โลก',dwarf:'ค้อนประจำตระกูลที่ตีเหล็กไม่เคยพลาด',under:'แผนที่ทางลับทุกเมือง'}[good];K.pw+=capOf(K)*.05;return C(`${LFAC[good][0]} ของขวัญจาก${LFAC[good][1]}`,`${LFAC[good][1]}ยกย่องคุณ และมอบ<b>${g2}</b>ให้`,[O('🙇 รับด้วยความยินดี',()=>{feed(`${LFAC[good][0]} คุณได้รับ ${g2}`);if(good==='church'){LW(K).inj.forEach(x=>{if(!x.fix&&x.k==='burn')x.fix=1});recalcE(K)}})])}
 const P=[['elf','dwarf','🌳⛏️ เอลฟ์กับคนแคระทะเลาะเรื่องป่า','คนแคระอยากตัดป่าทำเหมือง เอลฟ์ขู่จะยิงทุกคนที่เข้าป่า ทั้งสองฝ่ายขอให้คุณช่วย'],['crown','under','👑🦹 ราชวงศ์ขอให้ช่วยกวาดล้างโลกใต้ดิน','หัวหน้าโลกใต้ดินส่งของขวัญมาก่อนหนึ่งวัน พร้อมจดหมาย "เราเป็นเพื่อนกันได้นะ"'],['church','demon','⛪😈 โบสถ์ขอให้ช่วยล่าแม่มด','แม่มดที่ถูกตามล่าเป็นแค่หญิงชราที่รักษาคนจนฟรี และเธอขอให้คุณช่วยพาหนีไปดินแดนปีศาจ']];const x=pick(P);
 C(x[2],x[3],[O(`${LFAC[x[0]][0]} ช่วย${LFAC[x[0]][1]}`,()=>feed(`${LFAC[x[0]][0]} คุณเลือกข้าง${LFAC[x[0]][1]}${facAdd(K,x[0],15)}${facAdd(K,x[1],-10)}`)),O(`${LFAC[x[1]][0]} ช่วย${LFAC[x[1]][1]}`,()=>feed(`${LFAC[x[1]][0]} คุณเลือกข้าง${LFAC[x[1]][1]}${facAdd(K,x[1],15)}${facAdd(K,x[0],-10)}`)),O('⚖️ ไม่เลือกข้าง',()=>feed(`⚖️ ทั้งสองฝ่ายมองคุณเหมือนคนขี้ขลาด${facAdd(K,x[0],-3)}${facAdd(K,x[1],-3)}`))])}
// ---------- ผลจากการดวลในแฟนตาซี ----------
{const _de2=duelEnd;duelEnd=function(win){try{if(on()&&typeof DU!=='undefined'&&DU&&!DU._lw){DU._lw=1;const K=FN();if(K&&!K.kidP){const k=dKind(DU.name);if(win){stAdd(K,2);if(['beast','dragon','demon','mage','knight','rogue','hero','noble'].includes(k)&&rnd()<(k==='beast'||k==='dragon'||k==='demon'?.6:.25))feed(matAdd(K,DU.name,k)||'');if(k==='demon')facAdd(K,'demon',-3,1),facAdd(K,'church',2,1)}else{stAdd(K,9,'ความพ่ายแพ้ติดอยู่ในใจ');if(rnd()<.16&&!isMon(K))setTimeout(()=>{try{feed(`🩹 ศึกครั้งนั้นทิ้งบาดแผลถาวรไว้${injAdd(K,DU&&DU.name||'ศัตรู')}`)}catch(e){}},300)}}}}catch(e){console.error('lw duelEnd',e)}return _de2.apply(this,arguments)}}
(window._duPost=window._duPost||[]).push(F=>{try{if(!on())return;const K=FN();if(!K)return;const L=LW(K);if(L.st>=60){const s0=F.start;F.start=D=>{if(s0)s0(D);D.ep*=1+(L.st-50)/250;D.txt=(D.txt?D.txt+' · ':'')+'😰 มือคุณสั่นจากความเครียด'}}}catch(e){}});
// ---------- ค่าพลังจากแผล/ฝ่าย ----------
{const _rc2=recalcE;recalcE=function(K){const o=_rc2(K);try{const L=LW(K);L.inj.forEach(x=>{const I=INJ[x.k];if(!I)return;if(x.fix===2&&I[4])fxAdd(o,I[4]);else if(!x.fix&&I[2])fxAdd(o,I[2])});if((L.fac.guild|0)>=50)fxAdd(o,'luck:.02');if((L.fac.church|0)>=50)fxAdd(o,'heal:.02')}catch(e){}return o}}
// ---------- 🌍 ศูนย์รวม ----------
window.lwHub=function(){const K=FN();if(!K)return;const L=LW(K),R0=L.rv,P=X3(K).party.filter(p=>p.alive);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌍 โลกและชีวิต</h3>
 <div class="item">🧠 <b>จิตใจ:</b> ${stT(L.st)} (${Math.round(L.st)}/100)<div class="hpbar" style="height:6px"><i style="width:${L.st}%;background:${L.st>=60?'#ff5d73':'#7ad0ff'}"></i></div><span class="tag2">เครียดเกิน 60 จะพลาดง่ายตอนดวล · ลดได้จากการพัก เทศกาล คนรัก กองไฟ</span>${L.rest!==age()?`<button class="opt" style="margin-top:4px" onclick="lwRest()">🎣 พักใจหนึ่งวัน<small>ปีละครั้ง · ความเครียด −15</small></button>`:''}</div>
 <div class="item">🩹 <b>ร่างกาย:</b> ${L.inj.length?L.inj.map((x,i)=>{const I=INJ[x.k];return `<div>${I[0]} ${I[1]} <span class="tag2">${x.by?'จาก '+E(x.by)+' · ':''}อายุ ${x.a}${x.fix===2?' · ใส่ '+I[3].replace(/\s*\(\d+\)/,''):x.fix?' · รักษาแล้ว':''}</span>${!x.fix&&I[3]?` <button class="opt" style="display:inline-block;width:auto;margin:2px;padding:3px 8px" onclick="lwFix(${i})">${I[3]}</button>`:''}</div>`}).join(''):'ยังไม่มีแผลถาวร'}</div>
 <div class="item">🤺 <b>คู่แข่ง:</b> ${R0?rvTxt(R0)+`<br><span class="tag2">${R0.org} · ${R0.ps}</span>`:'ยังไม่มี'}</div>
 <div class="item">🏰 <b>ชื่อเสียงกับฝ่ายต่างๆ</b>${Object.keys(LFAC).map(k=>{const v=L.fac[k]|0;return `<div style="display:flex;gap:6px;align-items:center"><span style="width:120px">${LFAC[k][0]} ${LFAC[k][1]}</span><div class="hpbar" style="flex:1;height:6px"><i style="width:${(v+100)/2}%;background:${v>=20?'#5fd47a':v<=-20?'#ff5d73':'#c8c8c8'}"></i></div><span class="tag2" style="width:84px;text-align:right">${facT(v)}</span></div>`}).join('')}</div>
 <div class="item">📰 <b>ข่าวลือ</b>${L.news.length?L.news.slice(-5).reverse().map(n=>`<div class="tag2">${NWT[n.k][0]} ${NWT[n.k][1]} — ${n.done?(n.good?'✅ ยุติแล้ว':'💀 '+NWT[n.k][2][3]):NWT[n.k][2][n.s]+` (ระดับ ${n.s}/3)`}</div>`).join(''):'<div class="tag2">ยังไม่มีข่าว</div>'}</div>
 ${P.length?`<div class="item">🏕️ <b>ปาร์ตี้:</b> ${P.map(p=>`${PCL[p.c][0]} ${E(p.n)} <span class="tag2">💛${Math.round(p.b)}${p.pq?' · ✅เควสส่วนตัว':''}</span>`).join(' · ')}${L.camp!==age()?`<button class="opt" style="margin-top:4px" onclick="lwCamp()">🔥 ก่อกองไฟคุยกันคืนนี้<small>ปีละครั้ง</small></button>`:''}</div>`:''}
 <button class="gbtn" style="width:100%" onclick="lwForge()">⚒️ โรงตีเหล็ก (วัตถุดิบ ${Object.values(L.mat).reduce((a,m)=>a+m.n,0)} ชิ้น)</button>`,'lwhub')};
window.lwRest=()=>{const K=FN(),L=LW(K);if(L.rest===age())return;L.rest=age();stAdd(K,-15);closeM();feed(`🎣 ${pick(['คุณนั่งตกปลาทั้งวัน ไม่ได้ปลาสักตัว แต่ใจโล่งขึ้น','คุณนอนกลางวันใต้ต้นไม้จนพระอาทิตย์ตก','คุณเดินเล่นในตลาดโดยไม่มีจุดหมาย'])} <span class="tag2">ความเครียด ${Math.round(L.st)}</span>`)};
window.lwCamp=()=>{const K=FN(),L=LW(K);if(L.camp===age())return;L.camp=age();closeM();evCamp(K)};
window.lwFix=i=>{const K=FN(),L=LW(K),x=L.inj[i];if(!x)return;const I=INJ[x.k];if((S.money||0)<I[5]){toast('💰 เงินไม่พอ');return}money(-I[5]);x.fix=I[4]?2:1;recalcE(K);closeM();fxBig('mana',1.3);feed(`🩹 ${I[3].replace(/\s*\(\d+\)/,'')} ใช้ได้ดีกว่าที่คิด${I[4]?` <span class="tag2">${fxT(I[4])}</span>`:''}`)};
// ---------- วาดแผล/อุปกรณ์บนตัวละครในฉาก ----------
{const _pp3=person;person=function(x,y,o,pose){const r=_pp3.apply(this,arguments);try{if(o&&o===curMe&&on()&&g&&g.canvas&&g.canvas.width>=300){const K=FN();if(K&&!isMon(K)){const L=LW(K),fx=x*3,fy=y*3;L.inj.forEach(j=>{if(j.k==='eye'){j.fix===2?(Q(fx+2,fy-34,3,2,'#5ad0ff'),g.globalAlpha=.4,Q(fx,fy-36,7,6,'#5ad0ff'),g.globalAlpha=1):(Q(fx+1,fy-35,4,3,'#1a1420'),Q(fx-4,fy-37,12,1,'#1a1420'))}else if(j.k==='scar'){Q(fx-2,fy-38,1,6,'#c84a4a')}else if(j.k==='arm'&&j.fix===2){Q(fx+8,fy-24,3,10,'#8a9aa8');Q(fx+8,fy-20,3,2,'#5ad0ff')}})}}}catch(e){}return r}}
// ---------- ปีละครั้ง (≤1 เหตุการณ์จากแพ็ก) ----------
{const _fy5=fanYear;fanYear=function(){const r=_fy5.apply(this,arguments);try{const K=FN();if(!K||!S.alive||K.end||K.kidP)return r;const L=LW(K);L.st=Math.max(0,L.st-6);
 if(!L.rv&&age()>=12&&rnd()<.5){L.rv=rvMake(K);feed(`🤺 <b>คู่แข่งปรากฏตัว:</b> ${L.rv.ic} ${E(L.rv.n)} — ${L.rv.org} (${L.rv.ps})`)}
 newsTick(K);
 if(age()-L.ev>=1){const C2=[];if(L.rv&&L.rv.alive&&age()-(L.rv.ly||0)>=2)C2.push(['rv',.45]);if(L.news.some(n=>!n.done&&n.s>=1))C2.push(['news',.5]);if(L.seasonY!==age())C2.push(['sea',.3]);C2.push(['fac',.18]);if(X3(K).party.some(p=>p.alive))C2.push(['camp',.25]);
  for(const [k,p] of C2.sort(()=>rnd()-.5)){if(rnd()<p){L.ev=age();if(k==='rv'){L.rv.ly=age();queue(()=>evRival(K))}else if(k==='news')queue(()=>evNews(K));else if(k==='sea')queue(()=>evSeason(K));else if(k==='fac')queue(()=>evFaction(K));else queue(()=>evCamp(K));break}}}
 if(QU.length)flush()}catch(e){console.error('lw year',e)}return r}}
// ฉากจบเกี่ยวกับคู่แข่ง / ฝ่าย
// เมนู
{const _om6=openMenu;openMenu=function(){const r=_om6.apply(this,arguments);try{const K=FN();if(on()&&K&&!K.kidP){const d=$('modal').querySelector('[data-fa4]');if(d&&!d.querySelector('[data-lw]')){const L=LW(K);const b=document.createElement('button');b.className='opt';b.setAttribute('data-lw',1);b.innerHTML=`🌍 โลกและชีวิต<small>${stT(L.st)} · ${L.rv?'คู่แข่ง '+E(L.rv.n):'ข่าวลือ ฝ่าย ตีเหล็ก'}</small>`;b.onclick=()=>lwHub();d.appendChild(b)}}}catch(e){}return r}}
{const _hd3=hud;hud=function(K){let h=_hd3(K);try{const L=LW(K);if(L.st>=60)h=h.replace('<div class="fhC">',`<div class="fhC"><span>${L.st>=85?'😵':'😰'} ${Math.round(L.st)}</span>`)}catch(e){}return h}}
try{if(typeof SYS_GUIDE!=='undefined'&&!SYS_GUIDE.some(g=>g.t==='🌍 โลกและชีวิต (แฟนตาซี)'))SYS_GUIDE.push({s:'base',nw:1,ic:'🌍',t:'🌍 โลกและชีวิต (แฟนตาซี)',d:'เมนู → 🌍 โลกและชีวิต · 🧠 ความเครียด (เกิน 60 ดวลพลาดง่าย ลดได้จากพัก/เทศกาล/คนรัก/กองไฟ) · 🩹 แผลถาวรจากการแพ้ ซื้อแขนกล/ตาเวทแก้ได้ · 🤺 คู่แข่งตลอดชีวิต อาจกลายเป็นเพื่อน คนรัก หรือสาวกจอมมาร · 🏰 ชื่อเสียง 7 ฝ่าย ช่วยฝ่ายหนึ่งอีกฝ่ายเกลียด · ⚒️ ตีอาวุธจากวัตถุดิบมอนสเตอร์ ตั้งชื่อเองได้ · 📰 ข่าวลือที่ลุกลามทุกปีถ้าไม่มีใครหยุด · 🌸 4 ฤดูกับเทศกาล ชวนคนในใจไปเดตได้'})}catch(e){}
window._lwTest={rv:()=>{const K=FN(),L=LW(K);L.rv=L.rv||rvMake(K);evRival(K)},news:()=>{const K=FN(),L=LW(K);L.news.push({k:'war',s:1,y:age()});evNews(K)},sea:()=>evSeason(FN()),fac:()=>evFaction(FN()),camp:()=>evCamp(FN()),inj:()=>injAdd(FN(),'ทดสอบ'),mat:()=>{const K=FN();matAdd(K,'มังกรไฟ','dragon');matAdd(K,'หมาป่า','beast')},st:v=>{LW(FN()).st=v}};


// =================== 🔊 เสียงบรรยากาศตามฉากแฟนตาซี (ต่อจากระบบเสียงบรรยากาศเดิม: คลื่น ลม ฝูงชน น้ำหยดในถ้ำ) ===================
{const AMBF={sea:{wa:.24,wi:.1},dragon_sky:{wi:.28},desert:{wi:.2},abyss:{wi:.16,cr:0},forest:{wi:.05},village:{cr:.04},guild:{cr:.14},market:{cr:.17},fest:{cr:.2},tour:{cr:.22},ball:{cr:.1},war:{cr:.12,wi:.12},throne:{cr:.04},church:{cr:.03},wed:{cr:.1},kitchen:{cr:.05},cave:{dr:1},dgn:{dr:1},grave:{wi:.08}};
 let CR=null,drT=0;
 const crBuild=a=>{try{const len=a.sampleRate*2,buf=a.createBuffer(1,len,a.sampleRate),d=buf.getChannelData(0);let l=0;for(let i=0;i<len;i++){l=(l+.04*(Math.random()*2-1))*.985;d[i]=l*3}
  const src=a.createBufferSource();src.buffer=buf;src.loop=true;const f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=520;f.Q.value=.6;const g=a.createGain();g.gain.value=0;src.connect(f);f.connect(g);g.connect(AMB.master);src.start();CR={g}}catch(e){}};
 const drip=a=>{try{const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type='sine';const f=900+Math.random()*700;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*.45,t+.12);g.gain.setValueAtTime(.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+.25);o.connect(g);g.connect(AMB.master);o.start(t);o.stop(t+.3)}catch(e){}};
 const _au=ambUpdate;ambUpdate=function(){const r=_au.apply(this,arguments);try{if(typeof AMB==='undefined'||!AMB)return r;const a=ac();if(!a)return r;const t=a.currentTime;
  const K=on()&&ambOn?FN():null;const P=K&&!K.end?AMBF[fScene(K)]||{}:null;if(P&&!CR)crBuild(a);
  if(CR)CR.g.gain.setTargetAtTime(P&&P.cr?P.cr*(.75+.25*Math.sin(t*.9)):0,t,.8);
  if(P){if(P.wa!=null)AMB.water.gain.setTargetAtTime(P.wa*(.8+.2*Math.sin(t*.45)),t,.8);if(P.wi!=null)AMB.wind.gain.setTargetAtTime(P.wi*(.7+.3*Math.sin(t*.6)),t,.8);if(P.dr&&Date.now()-drT>1400&&Math.random()<.5){drT=Date.now();drip(a)}}
 }catch(e){}return r}}
{const _cd=checkDeath;checkDeath=function(){try{if(on()&&S.hp<=0&&!S.deathCause){const K=FN();if(K.save>0){K.save--;S.hp=Math.max(1,Math.round(S.maxHp*.35));say(`🪽 <b>รอดตายอย่างหวุดหวิด</b> — ชะตาที่ติดตัวมาดึงคุณกลับ (เหลือ ${K.save} ครั้ง)`,'epic',true);return false}}}catch(e){}return _cd.apply(this,arguments)}}
try{if(typeof coStart==='function'){const _cs=coStart;coStart=function(id){try{if(on()&&(id==='start'||/^mw_/.test(String(id))))return}catch(e){}return _cs.apply(this,arguments)}}}catch(e){}
try{const st=document.createElement('style');st.textContent='body.fanW #hintBar{display:none!important}';document.head.appendChild(st)}catch(e){}
window._fan={wSkill,godFinal,GST,mgDungeon,mgPotion,mgDuel,mgDance,mgNames,evCal,evClubPick,evQuest,evKnow,evReunion,FN,BD,WD,ENDS,arcStep,randEv,fanYear,ending};
})();try{wReady('fan')}catch(e){}
