// ============================================================
// /w/love.js — 🌸 สมุดคนงาม · 👁️ ดวงตาระบบ · 💰 อวดรวย · 🥊 คู่แข่งหัวใจ · 🏯 บริหารตำหนักใน
//              🏙️ ยุคปัจจุบัน: 💘 แอปหาคู่ · 🌃 คืนนี้ไปไหน (ผับ / ซื้อบริการ / อยู่บ้าน) · 📋 เควสระบบ
// โหลดจาก BLOCK 141 · สถานะ S.lv = {L:[คนในสมุด], ap, y, rv, q, nite}
// ทุกอย่างอายุ 18+ · ไม่มีเนื้อหาโจ่งแจ้ง (ตัดฉากทุกครั้ง)
// ============================================================
(()=>{
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pk=a=>a[Math.floor(Math.random()*a.length)];
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const E=t=>{try{return esc(t)}catch(e){return String(t)}};
const MW=()=>!!(S&&S.mw);
const cash=v=>Math.round(v*(MW()?400:1));
const M$=v=>{try{return fmtM(v)}catch(e){return String(v)}};
const OG=()=>{try{return oppG()}catch(e){return'หญิง'}};
const P=()=>OG()==='หญิง'?'เธอ':'เขา';
const L=(t,c,b)=>{try{log(t,c||'',b)}catch(e){}};
const J=d=>{try{joy(d)}catch(e){}};
const busy=()=>!!(choice._cur||modalOpen||(typeof DU!=='undefined'&&DU)||document.getElementById('sysPop'));
const ok=()=>S&&S.alive&&S.age>=18&&!(S.beastMode&&!S.beastMode.human)&&S.ch!=='soul';
const sysOn=()=>!!((S.sys&&S.sys.t)||S.wsy);
const sysPts=()=>S.sys&&S.sys.t?(S.sys.pts|0):S.wsy?(S.wsy.pts|0):0;
const sysPay=n=>{if(S.sys&&S.sys.t&&(S.sys.pts|0)>=n){S.sys.pts-=n;return true}if(S.wsy&&(S.wsy.pts|0)>=n){S.wsy.pts-=n;return true}return false};
const pwr=()=>{try{return total()}catch(e){return S.power||1}};
const LV=()=>{if(!S.lv)S.lv={L:[],ap:2,y:S.age,rv:null,q:null,nite:-1,br:0};return S.lv};
const apMax=()=>2+((S.sys&&S.sys.t==='lust')?1:0)+(S.wsy?1:0);

// ---------------------------------------------------------------- ข้อมูลคน
const JOB=[['หมอเทวดาสาว','หมอเทวดาหนุ่ม'],['ธิดาเจ้าสำนักกระบี่','บุตรเจ้าสำนักกระบี่'],['แม่ค้าผ้าไหมตลาดเหนือ','พ่อค้าผ้าไหมตลาดเหนือ'],['นักพรตหญิงวัดเขาเมฆ','นักพรตหนุ่มวัดเขาเมฆ'],['แม่ทัพหญิงชายแดน','แม่ทัพหนุ่มชายแดน'],['นักพิณหอบุปผา','นักขลุ่ยหอบุปผา'],['องค์หญิงแคว้นตะวันตก','องค์ชายแคว้นตะวันตก'],['มือสังหารที่เกษียณแล้ว','มือสังหารที่เกษียณแล้ว'],['ศิษย์หอโอสถ','ศิษย์หอโอสถ'],['เจ้าของโรงเตี๊ยมริมน้ำ','เจ้าของโรงเตี๊ยมริมน้ำ']];
const JOBM=[['หมอฟันคลินิกหน้าปากซอย','หมอฟันคลินิกหน้าปากซอย'],['บาริสต้าร้านกาแฟเปิดใหม่','บาริสต้าร้านกาแฟเปิดใหม่'],['อินฟลูสายรีวิวอาหาร','ยูทูบเบอร์สายเกม'],['ตำรวจจราจร','ตำรวจจราจร'],['นักศึกษาปริญญาโทฟิสิกส์','นักศึกษาปริญญาโทฟิสิกส์'],['ทายาทบริษัทอสังหา','ทายาทบริษัทอสังหา'],['พยาบาลเวรดึก','พยาบาลเวรดึก'],['ครูสอนพิเศษคณิต','ครูสอนพิเศษคณิต'],['นักแข่งรถทางเรียบ','นักแข่งรถทางเรียบ'],['ดีเจผับย่านทองหล่อ','ดีเจผับย่านทองหล่อ']];
// นิสัย: brag = ผลของการอวดรวย
const QK={greedy:['💎','ชอบของแพง',18],ascetic:['🍃','สมถะ เกลียดคนอวด',-20],proud:['🦚','หยิ่ง ไม่ยอมใครง่ายๆ',4],shy:['🌷','ขี้อาย',-3],wild:['🔥','ชอบความตื่นเต้น',8],jeal:['🖤','ขี้หึง',6]};
// วิธีชนะใจ (ต้องเดาให้ถูก หรือใช้ดวงตาระบบดู)
const WT={duel:['⚔️','ต้องชนะ'+'การประลอง','ประลองฝีมือ'],poem:['📜','ชอบคนมีปัญญา','แต่งกลอน/คุยเรื่องลึก'],help:['🤝','อยากให้ช่วยเรื่องครอบครัว','ช่วยปัญหาที่บ้าน'],laugh:['😂','ชอบคนตลก','ทำให้หัวเราะ']};
const WTM={duel:['🏎️','ชอบคนกล้า','ชวนทำอะไรเสี่ยงๆ'],poem:['🧠','ชอบคนฉลาด','คุยเรื่องลึกถึงตีสาม'],help:['🤝','อยากให้ช่วยเรื่องที่บ้าน','ช่วยปัญหาที่บ้าน'],laugh:['😂','ชอบคนตลก','ทำให้หัวเราะ']};
const wt=()=>MW()?WTM:WT;
// สิ่งที่รับไม่ได้
const DL={player:['🚫','เกลียดคนเจ้าชู้'],poor:['🚫','ไม่เอาคนจน'],weak:['🚫','ไม่เอาคนอ่อนแอกว่า'],none:['✅','ไม่มี']};
// ความลับ (ชั้นที่ 3)
const SC={spy:'เป็นสายลับของศัตรู ส่งมาสืบคุณ',engaged:'มีคู่หมั้นที่ครอบครัวจัดให้แล้ว',rich:'ที่จริงรวยกว่าคุณหลายเท่า',royal:'มีสายเลือดราชวงศ์ที่ซ่อนไว้',ex:'เคยเป็นศิษย์ของสำนักมาร',none:'ไม่มีความลับ'};
const SCM={spy:'ถูกบริษัทคู่แข่งจ้างมาตีสนิทคุณ',engaged:'มีแฟนอยู่แล้ว แต่กำลังจะเลิก',rich:'ที่จริงเป็นลูกมหาเศรษฐีที่ปลอมตัว',royal:'เป็นดาราที่ปลอมตัวมาใช้ชีวิตปกติ',ex:'เคยติดหนี้พนันออนไลน์ก้อนใหญ่',none:'ไม่มีความลับ'};
const NMF=['หลิวอวี่','ซูเหมย','หลินเยว่','ไป๋เสวี่ย','เซี่ยหลาน','เฉินซิน','หวังเหยียน','จ้าวหลิง','ถังอี','เยว่เอ๋อร์','ฉินซวง','มู่หรง'],NMM=['หลิวเฟิง','ซูหาน','หลินเซียว','ไป๋อวิ๋น','เซี่ยหยาง','เฉินหลง','หวังเจี้ยน','จ้าวอวี๋','ถังเฉิง','มู่ไป๋'];
function mkName(){const og=OG();if(MW())try{return anyName(og)}catch(e){}return pk(og==='หญิง'?NMF:NMM)}
function mkP(src){const lv=LV(),og=OG(),J0=pk(MW()?JOBM:JOB);let n,g=0;do{n=mkName()}while(++g<20&&(lv.L.some(x=>x.n===n)||(S.harem||[]).some(x=>x.n===n)||S.spouse===n));
 const rar=Math.random()<.12?3:Math.random()<.3?2:Math.random()<.5?1:0;
 const p={id:'p'+Date.now().toString(36)+R(10,99),n,age:cl(S.age+R(-6,4),18,90),job:J0[og==='หญิง'?0:1],qk:pk(Object.keys(QK)),wt:pk(Object.keys(WT)),dl:pk(['player','poor','weak','none','none']),sc:Math.random()<.45?pk(['spy','engaged','rich','royal','ex']):'none',rar,af:src==='app'?30:src==='pub'?25:R(5,20),lay:0,pw:Math.round(pwr()*(.6+Math.random()*.8+rar*.15)),st:'free',src:src||'book',brg:0,met:S.age};
 if(rar>=2&&Math.random()<.35){p.fake=pk(Object.keys(WT).filter(k=>k!==p.wt))}
 if(p.sc==='engaged'||(rar>=2&&Math.random()<.4))p.rvN=MW()?anyName('ชาย'):pk(['คุณชายตระกูลหลี่','คุณชายตระกูลมู่','บุตรเจ้าเมือง','ศิษย์เอกสำนักกระบี่']);
 return p}
const RARN=['','✨','💠','👑'];
function fill(){const lv=LV();lv.L=lv.L.filter(x=>x.st==='free');while(lv.L.length<5)lv.L.push(mkP('book'))}

// ---------------------------------------------------------------- UI
const css=`
#modal[data-k="love"]{background:transparent!important;box-shadow:none!important;border:0!important;padding:0!important;overflow:visible!important}
body:has(#modal[data-k="love"]) #mFloat{display:none!important}
.lvP{position:relative;border-radius:18px;padding:2px;background:linear-gradient(135deg,#ff5fa2,#ffb86b,#b46bff,#ff5fa2);background-size:300% 300%;animation:lvBg 6s ease infinite,lvIn .35s cubic-bezier(.2,1.4,.4,1);box-shadow:0 0 26px #ff5fa288}
@keyframes lvBg{50%{background-position:100% 100%}}@keyframes lvIn{from{transform:scale(.88);opacity:0}}
.lvI{border-radius:16px;padding:12px;background:linear-gradient(170deg,rgba(28,10,26,.97),rgba(14,8,24,.97));color:#fbeaf3;max-height:80vh;overflow:auto}
.lvH{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.lvH b{font-size:16px;color:#ffd1e6;text-shadow:0 0 10px #ff5fa2}
.lvX{background:rgba(255,255,255,.1);border:0;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer}
.lvS{font-size:11.5px;opacity:.75}
.lvTabs{display:flex;gap:5px;margin:6px 0 8px;flex-wrap:wrap}.lvTabs button{flex:1;min-width:70px;padding:6px;border-radius:10px;border:1px solid #ff5fa255;background:rgba(255,95,162,.08);color:#fff;font:inherit;font-size:12.5px;cursor:pointer}.lvTabs button.on{background:#ff5fa2;border-color:#ff5fa2}
.lvC{border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:9px;margin:6px 0;background:rgba(255,255,255,.03)}
.lvC.r2{border-color:#6bd5ff88}.lvC.r3{border-color:#ffd04ccc;box-shadow:0 0 10px #ffd04c44}
.lvN{display:flex;justify-content:space-between;gap:6px}.lvN b{font-size:14.5px}
.lvBar{height:6px;border-radius:6px;background:rgba(255,255,255,.08);margin:5px 0;overflow:hidden}.lvBar>i{display:block;height:100%;background:linear-gradient(90deg,#ff5fa2,#ffb86b)}
.lvTg{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}.lvTg span{font-size:11.5px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,.07)}
.lvTg span.q{opacity:.45}.lvTg span.fk{animation:wsGl 1.6s infinite steps(1)}
.lvA{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.lvA button{flex:1;min-width:62px;padding:6px 4px;border-radius:9px;border:1px solid #ffffff22;background:rgba(255,255,255,.06);color:#fff;font:inherit;font-size:12px;cursor:pointer}
.lvA button.pk{background:linear-gradient(90deg,#ff5fa2,#ff8f6b);border:0}.lvA button[disabled]{opacity:.35;pointer-events:none}
.lvO{display:block;width:100%;text-align:left;margin:6px 0 0;padding:9px 12px;border-radius:12px;border:1px solid #ff5fa266;background:linear-gradient(90deg,rgba(255,95,162,.18),rgba(255,255,255,.03));color:#fff;font:inherit;font-size:14px;cursor:pointer}
.lvO small{display:block;opacity:.7;font-size:11.5px}.lvO[disabled]{opacity:.35;pointer-events:none}
.lvB{font-size:14px;line-height:1.6;margin:6px 0}
.lvCard{border-radius:16px;padding:14px;margin:8px 0;background:linear-gradient(160deg,#3a1236,#1a0d2a);border:1px solid #ff5fa255;text-align:center}
.lvCard .av{font-size:44px}
`;
try{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}catch(e){}
let H={};window._lvH=i=>{const f=H[i];if(f)try{f()}catch(e){console.error('love',e)}};
const btn=(f)=>{const i=Object.keys(H).length;H[i]=f;return`_lvH(${i})`};
function show(title,sub,body){H={};const b=body();modal(`<div class="lvP"><div class="lvI"><div class="lvH"><div><b>${title}</b><div class="lvS">${sub||''}</div></div><button class="lvX" onclick="closeM()">✕</button></div>${b}</div></div>`,'love')}
function pop(title,body,opts){H={};const o=opts.map(x=>`<button class="lvO" ${x.dis?'disabled':''} onclick="${btn(()=>{closeM();x.f&&x.f()})}">${x.t}${x.s?`<small>${x.s}</small>`:''}</button>`).join('');modal(`<div class="lvP"><div class="lvI"><div class="lvH"><b>${title}</b></div><div class="lvB">${body}</div>${o}</div></div>`,'love')}
function ask(title,body,opts){let n=0;const me=S;const go=()=>{if(S!==me||!ok())return;if(busy()){if(++n<60)setTimeout(go,900);return}pop(title,body,opts)};setTimeout(go,600)}
const res=(t,c)=>{if(t)L(t,c);setTimeout(()=>{try{if(!busy())openLove(tab)}catch(e){}},60)};

// ---------------------------------------------------------------- 🌸 สมุดคนงาม
let tab='book';
function card(p){const W=wt(),lay=p.lay|0,shW=p.fake&&!p.fakeX?p.fake:p.wt,tag=[];
 tag.push(`<span>${p.age} ปี</span>`);
 tag.push(lay>=1?`<span>${QK[p.qk][0]} ${QK[p.qk][1]}</span>`:`<span class="q">❔ นิสัย</span>`);
 tag.push(lay>=2?`<span class="${p.fake&&!p.fakeX?'fk':''}">${W[shW][0]} ${W[shW][1]}</span><span>${DL[p.dl][0]} ${DL[p.dl][1]}</span>`:`<span class="q">❔ วิธีชนะใจ</span><span class="q">❔ สิ่งที่รับไม่ได้</span>`);
 tag.push(lay>=3?`<span>🔒 ${(MW()?SCM:SC)[p.sc]}</span>`:`<span class="q">🔒 ความลับ</span>`);
 if(lay>=1)tag.push(`<span>💪 ${fmt(p.pw)}</span>`);
 if(p.rvN&&p.rvOn)tag.push(`<span>🥊 คู่แข่ง: ${E(p.rvN)}</span>`);
 const lv=LV(),ap=lv.ap|0,lc=lensCost(p);
 return`<div class="lvC r${p.rar}"><div class="lvN"><b>${RARN[p.rar]} ${E(p.n)}</b><span class="lvS">${E(p.job)}</span></div>
 <div class="lvBar"><i style="width:${cl(p.af,0,100)}%"></i></div><div class="lvS">💗 ความชอบ ${p.af|0}/100</div>
 <div class="lvTg">${tag.join('')}</div>
 <div class="lvA"><button ${lay>=3||!lc.can?'disabled':''} onclick="${btn(()=>lens(p))}">👁️ ดูสถานะ<br><small>${lay>=3?'ครบแล้ว':lc.t}</small></button>
 <button ${ap<1?'disabled':''} onclick="${btn(()=>approach(p))}">💬 จีบ</button>
 <button ${ap<1?'disabled':''} onclick="${btn(()=>gift(p))}">🎁 ของขวัญ</button>
 <button ${ap<1?'disabled':''} onclick="${btn(()=>brag(p))}">${MW()?'🏎️ อวดรวย':'💰 อวดรวย'}</button>
 ${p.af>=70?`<button class="pk" ${ap<1?'disabled':''} onclick="${btn(()=>confess(p))}">💍 สารภาพ</button>`:''}</div></div>`}
function lensCost(p){const n=(p.lay|0)+1;if(sysOn()){return n===1?{t:'ระบบ: ฟรี',can:true,sys:0}:{t:`ระบบ ${n-1} แต้ม (มี ${sysPts()})`,can:sysPts()>=n-1,sys:n-1}}const c=cash(30*n);return{t:`จ้างสืบ ${M$(c)}`,can:(S.money||0)>=c,c}}
function lens(p){const c=lensCost(p);if(!c.can)return;if(c.sys)sysPay(c.sys);else if(c.c)S.money-=c.c;p.lay=(p.lay|0)+1;
 if(p.lay===2&&p.fake&&sysOn()&&Math.random()<.5){p.fakeX=1;L(`👁️ หน้าต่างสถานะของ${E(p.n)}กระตุกแรงจนภาพปลอมแตก ของจริงคือ <b>${wt()[p.wt][1]}</b>`,'epic')}
 else L(`👁️ ${sysOn()?'ดวงตาระบบ':'คนสืบข่าว'}เปิดเผยข้อมูลชั้นที่ ${p.lay} ของ <b>${E(p.n)}</b>`,'');openLove('book')}
function spend(){const lv=LV();if((lv.ap|0)<1)return false;lv.ap--;return true}
function hurtDeal(p,why){p.af=cl(p.af-15,0,100);L(`💔 ${E(p.n)}หน้าบึ้ง — ${why}`,'bad')}
function dealCheck(p){if(p.dl==='player'&&((S.harem||[]).length||S.spouse)){if(Math.random()<.5){hurtDeal(p,`ได้ยินว่าคุณมี${S.spouse?'คนรักอยู่แล้ว':'ตำหนักใน'}`);return false}}
 if(p.dl==='poor'&&(S.money||0)<cash(200)){if(Math.random()<.5){hurtDeal(p,'เห็นกระเป๋าเงินคุณแฟบ');return false}}
 if(p.dl==='weak'&&pwr()<p.pw){if(Math.random()<.5){hurtDeal(p,`รู้ว่าคุณอ่อนกว่า${P()}`);return false}}return true}
function approach(p){const W=wt();show(`💬 จีบ ${E(p.n)}`,`เลือกวิธี · เหลือแรง ${LV().ap} ครั้งปีนี้`,()=>Object.keys(W).map(k=>`<button class="lvO" onclick="${btn(()=>{closeM();doApp(p,k)})}">${W[k][0]} ${W[k][2]}</button>`).join(''))}
function doApp(p,k){if(!spend())return;if(!dealCheck(p))return res('');if(rivalHit(p))return;
 const hit=k===p.wt;let g=0,t='';
 if(k==='duel'){const won=Math.random()<pwr()/(pwr()+p.pw*.9);if(hit){g=won?28:8;t=won?(MW()?`คุณพา${P()}ไปปีนหน้าผาจำลองแล้วขึ้นถึงยอดก่อน ${P()}หัวเราะเสียงดัง`:`คุณปลดกระบี่จากมือ${P()}ในกระบวนท่าที่สิบ ${P()}มองคุณนานกว่าปกติ`):`คุณแพ้ แต่${P()}ชอบที่คุณไม่ถอย`}else{g=won?-4:-8;t=`${P()}ไม่ได้อยากประลองกับคุณเลย`}}
 if(k==='poem'){const sm=(S.int||0)>R(20,120);if(hit){g=sm?26:6;t=sm?`คุณพูดเรื่องดวงดาวจนถึงเช้า ${P()}ลืมว่าต้องกลับบ้าน`:`กลอนคุณไม่สัมผัส แต่${P()}เก็บกระดาษไว้`}else{g=sm?3:-5;t=`${P()}หาวกลางประโยคที่สามของคุณ`}}
 if(k==='help'){const c=cash(R(30,90));S.money=Math.max(0,(S.money||0)-c);if(hit){g=30;S.karma=(S.karma||0)+4;t=`คุณจ่าย ${M$(c)} ปิดหนี้ให้ที่บ้าน${P()} แม่${P()}เรียกคุณว่า "ลูก"`}else{g=5;t=`${P()}ขอบคุณ แต่บอกว่าที่บ้านไม่ได้มีปัญหาอะไร`}}
 if(k==='laugh'){const fn=(S.cha||0)>R(10,90);if(hit){g=fn?24:7;t=fn?`${P()}หัวเราะจนน้ำตาไหล แล้วตีแขนคุณเบาๆ`:`มุกคุณแป้ก แต่${P()}ขำที่คุณหน้าแดง`}else{g=fn?2:-6;t=`${P()}ยิ้มแบบมารยาท`}}
 if(p.qk==='shy')g=Math.round(g*.7);if(p.qk==='proud'&&g>0&&pwr()<p.pw)g=Math.round(g*.6);
 p.af=cl(p.af+g,0,100);J(g>0?2:-1);questTick('date');
 res(`${g>=20?'💞':g>0?'💗':'💢'} ${E(p.n)}: ${t} <span class="tag2">(ความชอบ ${g>0?'+':''}${g})</span>`,g>=20?'good':g<0?'bad':'')}
function gift(p){if(!spend())return;const c=cash(R(20,70)*(1+p.rar*.5));if((S.money||0)<c){LV().ap++;return toast&&toast('เงินไม่พอ')}S.money-=c;
 let g=p.qk==='greedy'?16:p.qk==='ascetic'?3:8;if(p.sc==='rich')g=Math.round(g*.4);if(p.wt==='help')g+=4;p.af=cl(p.af+g,0,100);
 res(`🎁 คุณให้${pk(MW()?['กระเป๋าแบรนด์','ดอกไม้ร้อยดอก','ตั๋วคอนเสิร์ตแถวหน้า','นาฬิกาคู่']:['ปิ่นหยกขาว','ผ้าไหมม่วง','ตลับแป้งจากเมืองหลวง','พิณไม้จันทน์'])}แก่${E(p.n)} (${M$(c)})${p.sc==='rich'&&p.lay>=3?' — ของแบบนี้'+P()+'มีเต็มบ้าน':''} <span class="tag2">(+${g})</span>`,g>=12?'good':'')}
function brag(p){if(!spend())return;const lv=LV();lv.br=(lv.br||0)+1;const c=cash(R(40,120));S.money=Math.max(0,(S.money||0)-c);
 let g=QK[p.qk][2]+R(-4,4);if(p.sc==='rich')g=Math.min(g,-5);p.af=cl(p.af+g,0,100);p.brg=(p.brg|0)+1;S.fame=(S.fame||0)+5;
 const act=MW()?pk(['ขับซูเปอร์คาร์สีส้มไปรับหน้าที่ทำงาน','เหมาร้านอาหารทั้งร้านให้กินกันสองคน','โพสต์รูปคู่บนเรือยอชต์']):pk(['เหมาโรงเตี๊ยมทั้งเมืองเลี้ยงชาวบ้าน','จ้างคณะงิ้วมาเล่นหน้าบ้าน'+P(),'ประมูลกำไลหยกราคาเท่าบ้านหนึ่งหลัง']);
 let t=`💰 คุณ${act} (${M$(c)}) — ${g>8?P()+'ตาเป็นประกาย':g<0?P()+'มองคุณเหมือนมองคนโง่':P()+'ยิ้มนิดๆ'} <span class="tag2">(${g>0?'+':''}${g})</span>`;
 if(lv.br>=3&&Math.random()<.35){lv.br=0;const loss=Math.round((S.money||0)*.15);S.money-=loss;t+=MW()?`<br>📱 คลิปอวดรวยของคุณไวรัล มีคนตามมาขอเงินหน้าบ้าน และสรรพากรส่งจดหมายมา (−${M$(loss)})`:`<br>🗡️ ข่าวความรวยของคุณลือไปไกล คืนนั้นโจรปีนกำแพงบ้าน (−${M$(loss)})`}
 res(t,g>8?'good':g<0?'bad':'')}
function confess(p){if(!spend())return;if(!dealCheck(p))return res('');if(rivalHit(p))return;
 const ch0=cl(.25+(p.af-70)/40+(S.cha||0)/800,.15,.95);
 if(Math.random()<ch0)win(p);else{p.af=cl(p.af-20,0,100);res(`💔 ${E(p.n)}ขอเวลาคิด แล้วก็ไม่ตอบอีกเลยทั้งปี <span class="tag2">(−20)</span>`,'bad')}}
function win(p){p.st='won';const lv=LV();lv.L=lv.L.filter(x=>x!==p);questTick('win');
 let extra='';if(p.lay>=3||true){if(p.sc==='rich'){const g=cash(R(300,900));S.money=(S.money||0)+g;extra=`<br>💰 ครอบครัว${P()}ส่งสินเดิมมาให้ ${M$(g)} — ที่แท้${P()}รวยกว่าคุณ`}
  if(p.sc==='royal'){S.fame=(S.fame||0)+60;extra=`<br>👑 ${MW()?'นักข่าวตามถ่ายคุณทั้งเดือน':'ราชสำนักส่งราชโองการมาแสดงความยินดี'}`}
  if(p.sc==='ex'&&!MW()){S.power=Math.round((S.power||0)*1.05);extra=`<br>🌑 ${P()}สอนวิชามารให้คุณหนึ่งกระบวนท่า (พลัง +5%)`}}
 if(!S.spouse){S.spouse=p.n;S.spouseP=null;try{S.sp=mkLover(p.n,p.job,{wed:false,age:p.age})}catch(e){}J(10);L(`💞 <b>${E(p.n)}</b> ตอบตกลงเป็นคนรักของคุณ${extra}`,'epic',true)}
 else{const g=Object.assign(hmMember(p.n,p.job),{qk:p.qk,sc:p.sc,role:null,care:70,from:'lv'});g.age=p.age;S.harem=S.harem||[];S.harem.push(g);S.haremOK=S.haremOK==null?1:S.haremOK;J(8);if(S.sp)S.sp.aff=Math.max(0,(S.sp.aff||70)-6);L(`🏯 <b>${E(p.n)}</b> ย้ายเข้าตำหนักใน (${S.harem.length} คน)${extra}`,'epic',true)}
 setTimeout(()=>{try{if(!busy())openLove('harem')}catch(e){}},80)}

// ---------------------------------------------------------------- 🥊 คู่แข่งหัวใจ
function rivalHit(p){if(!p.rvN||p.rvDone||p.af<40||Math.random()>.55)return false;p.rvOn=1;
 const n=p.rvN;pop(`🥊 ${E(n)} ขวางทาง`,`${E(n)}${MW()?'ขับรถสปอร์ตมาจอดขวางหน้าคุณ':'ยืนกอดอกขวางประตูบ้าน'+P()} "${E(p.n)}เป็นของข้า ${MW()?'เลิกยุ่งซะ':'ถอยไปซะ'}"`,[
  {t:'⚔️ ดวลกันตรงนี้',s:'ชนะ = '+P()+'ประทับใจ · แพ้ = เสีย'+P()+'ไป',f:()=>{try{duel(n,Math.round(pwr()*(.9+Math.random()*.35)),w=>{p.rvDone=1;if(w){p.af=cl(p.af+25,0,100);L(`🥊 คุณชนะ${E(n)}ต่อหน้า${E(p.n)} ${P()}เดินมาเช็ดเลือดที่มุมปากให้คุณ`,'epic')}else{p.st='lost';LV().L=LV().L.filter(x=>x!==p);L(`🥊 คุณแพ้ ${E(p.n)}เดินจากไปกับ${E(n)} สามปีต่อมามีการ์ดแต่งงานส่งมาที่บ้าน`,'bad',true)}})}catch(e){p.rvDone=1}}},
  {t:`💸 ประมูลของขวัญแข่ง (${M$(cash(250))})`,s:'ต้องมีเงิน',dis:(S.money||0)<cash(250),f:()=>{S.money-=cash(250);p.rvDone=1;if(Math.random()<.7){p.af=cl(p.af+15,0,100);L(`💸 คุณประมูลชนะ${E(n)} ${P()}หัวเราะใส่หน้าคู่แข่ง`,'good')}else{p.af=cl(p.af-5,0,100);L(`💸 ${E(n)}ทุ่มหนักกว่า คุณเสียเงินฟรี`,'bad')}}},
  {t:'🕵️ ขุดความลับมาแฉ',s:sysOn()?'ระบบช่วยสืบ (1 แต้ม)':'ใช้ปัญญา',dis:sysOn()&&sysPts()<1,f:()=>{if(sysOn())sysPay(1);p.rvDone=1;if(sysOn()||(S.int||0)>R(30,140)){p.af=cl(p.af+20,0,100);L(`🕵️ คุณแฉว่า${E(n)}มีคนรักซ่อนอยู่อีกสามคน ${E(p.n)}ตบหน้าเขากลางงานเลี้ยง`,'epic')}else{p.af=cl(p.af-15,0,100);L(`🕵️ ข้อมูลผิด ${E(p.n)}มองว่าคุณใส่ร้ายคนอื่น`,'bad')}}},
  {t:'🚶 ถอย',f:()=>{p.rvDone=1;p.af=cl(p.af-10,0,100);L(`🚶 คุณหลีกทางให้${E(n)} ${E(p.n)}เห็นตอนคุณเดินจากไป`,'')}}]);return true}

// ---------------------------------------------------------------- 🏯 ตำหนักใน (บริหาร)
const ROLE={vault:['💰','ดูแลคลัง','เงิน +3%/ปี'],guard:['🛡️','องครักษ์','ฟื้นพลังชีวิต +10%/ปี'],doc:['🩺','หมอประจำตัว','ฟื้นพลังชีวิต +15% เมื่อบาดเจ็บ'],spy:['🕵️','สายข่าว','ปัญญา +2/ปี'],spar:['⚔️','คู่ฝึก','พลัง +2%/ปี']};
function haremView(){const Hm=S.harem||[];if(!Hm.length)return`<p class="lvS">ยังไม่มีคนในตำหนักใน · ชนะใจคนในสมุดเพิ่มอีกคนหลังจากมีคนรักแล้ว จะย้ายเข้ามาที่นี่</p>`;
 const lv=LV();return Hm.map((g,i)=>{if(g.care==null)g.care=60;const r=g.role&&ROLE[g.role];return`<div class="lvC"><div class="lvN"><b>${E(g.n)}</b><span class="lvS">${E(g.t||'')} · ${g.age|0} ปี</span></div>
 <div class="lvBar"><i style="width:${cl(g.care,0,100)}%;background:linear-gradient(90deg,#6bd5ff,#b46bff)"></i></div><div class="lvS">🌙 ความใส่ใจ ${g.care|0}/100 ${g.care<30?'· <b style="color:#ff8080">กำลังคิดจะไป</b>':''}${g.qk&&QK[g.qk]?` · ${QK[g.qk][0]} ${QK[g.qk][1]}`:''}</div>
 <div class="lvTg"><span>${r?r[0]+' '+r[1]+' · '+r[2]:'ยังไม่มีหน้าที่'}</span></div>
 <div class="lvA"><button ${(lv.ap|0)<1?'disabled':''} onclick="${btn(()=>visit(g))}">🌙 ไปหา</button><button onclick="${btn(()=>roleSel(g))}">📋 มอบหน้าที่</button></div></div>`}).join('')}
function visit(g){if(!spend())return;g.care=cl((g.care||50)+30,0,100);J(3);res(`🌙 ${pk(['คุณนั่งดูพระจันทร์กับ','คุณทำอาหารเย็นให้','คุณฟัง'+P()+'บ่นเรื่องคนในตำหนักทั้งคืนกับ','คุณสอนกระบวนท่าใหม่ให้'])}<b>${E(g.n)}</b> (ความใส่ใจ +30)`,'good')}
function roleSel(g){show(`📋 หน้าที่ของ ${E(g.n)}`,'หนึ่งหน้าที่ต่อคน · เปลี่ยนได้ตลอด',()=>Object.keys(ROLE).map(k=>{const who=(S.harem||[]).find(x=>x.role===k&&x!==g);return`<button class="lvO" onclick="${btn(()=>{if(who)who.role=null;g.role=k;openLove('harem')})}">${ROLE[k][0]} ${ROLE[k][1]}<small>${ROLE[k][2]}${who?' · แทนที่ '+E(who.n):''}</small></button>`}).join('')+`<button class="lvO" onclick="${btn(()=>{g.role=null;openLove('harem')})}">❌ ไม่มีหน้าที่</button>`)}
function haremYear(){const Hm=S.harem||[];if(!Hm.length)return;
 for(const g of Hm.slice()){if(g.care==null)g.care=60;g.care=cl(g.care-R(6,12)-(g.qk==='jeal'?4:0),0,100);
  const r=g.role;if(r==='vault')S.money=Math.round((S.money||0)*1.03);if(r==='guard')S.hp=Math.min(S.maxHp,S.hp+S.maxHp*.1);if(r==='doc'&&S.hp<S.maxHp*.6)S.hp=Math.min(S.maxHp,S.hp+S.maxHp*.15);if(r==='spy')S.int=(S.int||0)+2;if(r==='spar')S.power=Math.round((S.power||0)*1.02);
  if(g.care<15){Hm.splice(Hm.indexOf(g),1);if(g.sc==='spy'){const t=Math.round((S.money||0)*.25);S.money-=t;L(`🕵️ <b>${E(g.n)}</b> หายไปกลางดึก พร้อมเงิน ${M$(t)} และแผนที่บ้านคุณ — ${P()}คือสายลับมาตลอด`,'bad',true)}else L(`🥀 <b>${E(g.n)}</b> เก็บของออกจากตำหนักใน ทิ้งจดหมายไว้ว่า "คุณไม่เคยมาหาฉันเลย"`,'bad',true);J(-6)}}
 if(Hm.length>=3&&Math.random()<.22)jealous();
 const sp=Hm.find(g=>g.sc==='spy'&&!g.spyEv);if(sp&&Math.random()<.18){sp.spyEv=1;ask(`🕵️ จดหมายในห้อง${E(sp.n)}`,`คนรับใช้เจอจดหมายรหัสลับในห้อง <b>${E(sp.n)}</b> ลายมือ${P()}เอง`,[
  {t:'🗣️ เผชิญหน้า',s:'อาจเปลี่ยนใจ'+P()+'ได้',f:()=>{if(sp.care>=60){sp.sc='none';sp.role='spy';L(`🗣️ ${E(sp.n)}ร้องไห้แล้วบอกทุกอย่าง ตอนนี้${P()}เป็นสายข่าวสองหน้าให้คุณ`,'epic')}else{Hm.splice(Hm.indexOf(sp),1);L(`🗣️ ${E(sp.n)}หนีออกทางหน้าต่างก่อนคุณพูดจบ`,'bad')}}},
  {t:'🤫 ทำเป็นไม่รู้ ป้อนข้อมูลปลอม',s:'ใช้'+P()+'หลอกศัตรู',f:()=>{S.int=(S.int||0)+4;S.fame=(S.fame||0)+15;L(`🤫 คุณแกล้งพูดแผนปลอมต่อหน้า${E(sp.n)} ศัตรูหลงกลไปทั้งกระบวน`,'good')}},
  {t:'🚪 ไล่ออกเงียบๆ',f:()=>{Hm.splice(Hm.indexOf(sp),1);L(`🚪 ${E(sp.n)}ออกจากตำหนักโดยไม่มีใครรู้เหตุผล`,'')}}])}}
function jealous(){const Hm=S.harem||[];const a=Hm.find(g=>g.qk==='jeal')||pk(Hm),b=pk(Hm.filter(g=>g!==a));if(!a||!b)return;
 const why=pk(MW()?['แย่งที่นั่งข้างคุณในรถ','อีกคนแอบใช้น้ำหอมขวดเดียวกัน','ไลก์รูปผู้ชายคนอื่นในไอจี']:['แย่งห้องที่ติดสวนดอกบ๊วย','อีกคนได้ปิ่นที่สวยกว่า','ใส่ชุดสีเดียวกันในงานเลี้ยง']);
 ask(`🖤 ตำหนักในร้อนระอุ`,`<b>${E(a.n)}</b> กับ <b>${E(b.n)}</b> ทะเลาะกันเพราะ${why} ทั้งตำหนักรอดูว่าคุณจะเข้าข้างใคร`,[
  {t:`👉 เข้าข้าง${E(a.n)}`,f:()=>{a.care=cl(a.care+20,0,100);b.care=cl(b.care-25,0,100);L(`🖤 ${E(b.n)}ขังตัวเองในห้องสามวัน`,'bad')}},
  {t:`👉 เข้าข้าง${E(b.n)}`,f:()=>{b.care=cl(b.care+20,0,100);a.care=cl(a.care-25,0,100);L(`🖤 ${E(a.n)}ทุบถ้วยชาทิ้งทั้งชุด`,'bad')}},
  {t:'🍲 พาทั้งคู่ไปกินข้าวด้วยกัน',s:'เสี่ยง แต่ถ้าสำเร็จทั้งคู่ดีขึ้น',f:()=>{if((S.cha||0)>R(20,100)){a.care=cl(a.care+12,0,100);b.care=cl(b.care+12,0,100);L('🍲 มื้อแรกเงียบกริบ มื้อที่สามทั้งคู่หัวเราะใส่กันเรื่องนิสัยแย่ๆ ของคุณ','good')}else{a.care-=15;b.care-=15;L('🍲 ตะเกียบลอยข้ามโต๊ะ คุณกินข้าวคนเดียว','bad')}}},
  {t:'🙈 ไม่ยุ่ง',f:()=>{Hm.forEach(g=>g.care=cl(g.care-6,0,100));L('🙈 คุณออกไปข้างนอกทั้งวัน ทุกคนในตำหนักรู้สึกว่าคุณไม่สนใจ','')}}])}

// ---------------------------------------------------------------- 🏙️ ยุคปัจจุบัน: แอปหาคู่ / คืนนี้
function appView(){const lv=LV();if(!lv.deck||lv.deckY!==S.age){lv.deck=[0,1,2].map(()=>Object.assign(mkP('app'),{scam:Math.random()<.18}));lv.deckY=S.age}
 const d=lv.deck;if(!d.length)return`<p class="lvS">ปัดหมดแล้วปีนี้ · ปีหน้ามีคนใหม่</p>`;const p=d[0];
 const star=S.wsy&&S.wsy.id==='star'?`<div class="lvS">⭐ ${(2.5+Math.random()*2.4).toFixed(1)} ดาว (ระบบรีวิวดาว)</div>`:'';
 const flag=p.scam&&sysOn()?`<div class="lvS wsG" style="color:#ff8fb8">⚠ ระบบ: รูปโปรไฟล์นี้ถูกใช้ใน 14 บัญชี</div>`:'';
 return`<div class="lvCard"><div class="av">${OG()==='หญิง'?'👩':'👨'}</div><b>${E(p.n)}, ${p.age}</b><div class="lvS">${E(p.job)}</div><div class="lvS">${pk(['"หาคนไปกินหมูกระทะด้วย"','"ไม่คุยกับคนไม่มีรูปหมา"','"ชอบทะเล เกลียดคนตอบช้า"','"ขอคนคุยยาวๆ ไม่เอาวันไนท์"','"สายมู ดูดวงก่อนนัด"'])}</div>${star}${flag}</div>
 <div class="lvA"><button onclick="${btn(()=>{d.shift();openLove('app')})}">❌ ปัดซ้าย</button><button class="pk" onclick="${btn(()=>swipe(p))}">💘 ปัดขวา</button></div>`}
function swipe(p){const lv=LV();lv.deck.shift();if(Math.random()>.55+(S.cha||0)/400){L(`💘 ปัดขวา${E(p.n)}แล้ว ไม่แมตช์`,'');return openLove('app')}
 if(p.scam){closeM();return pop('💘 แมตช์แล้ว!',`${E(p.n)}ทักมาก่อน คุยกันดีสามอาทิตย์ แล้ววันหนึ่ง${P()}ส่งข้อความว่า "แม่เข้าโรงพยาบาล ขอยืม ${M$(cash(150))} ก่อนได้ไหม"`,[
  {t:'💸 โอนให้',f:()=>{S.money=Math.max(0,(S.money||0)-cash(150));L(`💸 หลังโอน บัญชีของ${E(p.n)}หายไปจากแอปทันที — แก๊งหลอกรักออนไลน์`,'bad',true)}},
  {t:'📹 ขอวิดีโอคอลก่อน',f:()=>{L(`📹 ${E(p.n)}บอกว่ากล้องเสีย แล้วบล็อกคุณ`,'good')}},
  {t:'👮 แจ้งความ',f:()=>{S.karma=(S.karma||0)+3;L('👮 ตำรวจไซเบอร์ขอบคุณ บอกว่าเป็นบัญชีที่ 40 ของแก๊งนี้','good')}}])}
 lv.L.push(p);questTick('num');L(`💘 แมตช์กับ <b>${E(p.n)}</b> (${E(p.job)}) — เพิ่มลงสมุดแล้ว`,'good');openLove('app')}
function nightView(){const lv=LV(),done=lv.nite===S.age;if(done)return`<p class="lvS">คืนนี้ออกไปแล้ว · ปีหน้าค่อยว่ากัน</p>`;
 return[['🍸','ไปผับ','เจอคนใหม่ หรือเจอเรื่อง',()=>pub()],['💋','ซื้อบริการ',`${M$(cash(40))} ขึ้นไป · ชิวๆ แต่มีความเสี่ยง`,()=>buy()],['🛋️','อยู่บ้านคนเดียว','ปิดไฟ ดูหนัง ปลดปล่อยตัวเอง',()=>home()]].map(x=>`<button class="lvO" onclick="${btn(()=>{lv.nite=S.age;closeM();x[3]()})}">${x[0]} ${x[1]}<small>${x[2]}</small></button>`).join('')}
function pub(){const r=Math.random();
 if(r<.5){const p=mkP('pub');LV().L.push(p);questTick('num');return pop('🍸 ไฟสลัว เพลงดัง',`คนข้างโต๊ะชวนคุยเรื่องเพลงที่ดีเจเปิด — <b>${E(p.n)}</b> ${E(p.job)} ขอไอจีคุณก่อนกลับ`,[{t:'💗 เพิ่มลงสมุด',f:()=>{}}])}
 if(r<.7)return pop('🍸 มีคนส่งเหล้ามาให้',`แก้วค็อกเทลสีฟ้าวางอยู่ตรงหน้า "จากโต๊ะโน้นค่ะ" แต่ไม่มีใครที่โต๊ะโน้น`,[
  {t:'🍹 ดื่ม',f:()=>{if(Math.random()<.5){const t=Math.round((S.money||0)*.1);S.money-=t;S.hp=Math.max(1,S.hp-S.maxHp*.2);L(`🍹 คุณตื่นมาในแท็กซี่ กระเป๋าตังค์หายไป ${M$(t)}`,'bad',true)}else{J(4);L('🍹 แค่มีคนขี้อายส่งมาจริงๆ คุณได้เพื่อนใหม่','good')}}},
  {t:'🙅 ไม่แตะ',f:()=>L('🙅 คุณเลื่อนแก้วออก ห้านาทีต่อมามีคนถูกหามออกจากห้องน้ำ','')}]);
 if(r<.85){const n=anyName('ชาย');return pop('🍸 มีเรื่อง',`${E(n)}เมาแล้วมาหาเรื่องคนที่คุณคุยด้วย`,[{t:'👊 ต่อย',f:()=>{try{duel(n,Math.round(pwr()*.7),w=>{if(w){S.fame=(S.fame||0)+8;L('👊 คนทั้งผับปรบมือ','good')}else{S.hp=Math.max(1,S.hp-S.maxHp*.25);L('👊 คุณหน้าแตก ยามลากออกทั้งคู่','bad')}})}catch(e){}}},{t:'🚪 พาออกไปก่อน',f:()=>{J(2);L('🚪 คุณพาคนตรงหน้าเดินออกมาหน้าร้าน คุยกันริมถนนจนเช้า','good')}}])}
 J(5);L('🍸 คืนนั้นไม่มีอะไรเกิดขึ้น แต่คุณเต้นจนเหงื่อท่วม ความเครียดหายเกลี้ยง','good')}
function buy(){const c=cash(R(40,90));if((S.money||0)<c){L('💋 เงินไม่พอ คุณเดินผ่านป้ายไฟไปเงียบๆ','');return}
 const hasP=!!(S.spouse&&S.sp&&S.sp.alive!==false),lie=sysOn()&&Math.random()<.5;
 pop('💋 ซอยไฟสีชมพู',`ป้ายไฟกะพริบ ราคาเริ่มต้น ${M$(c)}${lie?`<br><span class="lvS wsG" style="color:#ffb3d0">📟 ระบบ: "ร้านนี้ปลอดภัย 100%" (ระบบเคยโกหกคุณมาก่อน)</span>`:''}${hasP?`<br><span class="lvS">💭 ${E(S.spouse)}คิดว่าคุณทำงานดึก</span>`:''}`,[
  {t:'🚪 เข้าไป',s:'ตัดฉาก',f:()=>{S.money-=c;const r=Math.random();
   if(hasP&&Math.random()<.2){S.sp.aff=Math.max(0,(S.sp.aff||70)-35);J(-12);return L(`📱 ${E(S.spouse)}เจอใบเสร็จในกระเป๋ากางเกง บ้านเงียบไปทั้งเดือน (ความรัก −35)`,'bad',true)}
   if(r<.6){J(10);S.hp=Math.min(S.maxHp,S.hp+S.maxHp*.1);return L('💋 …คุณเดินออกมาตอนตีสอง ลมเย็นมาก ความเครียดทั้งปีหายไปหมด','good')}
   if(r<.72){const x=cash(R(60,150));S.money=Math.max(0,S.money-x);return L(`💋 ตอนจ่ายเงิน บิลยาวกว่าที่ตกลงไว้สองเท่า มีชายตัวใหญ่สองคนยืนข้างประตู (−${M$(x)})`,'bad')}
   if(r<.82){const x=cash(R(80,200));S.money=Math.max(0,S.money-x);S.fame=Math.max(0,(S.fame||0)-15);return L(`🚨 ตำรวจบุกตรวจ คุณเสียค่าปรับ ${M$(x)} และหน้าคุณติดข่าวท้องถิ่นแบบเบลอครึ่งเดียว`,'bad',true)}
   if(r<.92){const b=pk(['หัวหน้าแผนก','ลุงข้างบ้าน','อาจารย์ที่ปรึกษาเก่า']);return pop('😳 เจอคนรู้จัก',`ตอนเดินออกมา คุณสบตากับ<b>${b}</b>ที่กำลังเดินเข้าไป`,[{t:'🤝 พยักหน้าให้กัน',s:'เป็นความลับร่วม',f:()=>{S.money=(S.money||0)+cash(60);L(`🤝 ปีนั้น${b}ดีกับคุณผิดปกติ โบนัสคุณมาก่อนใคร`,'good')}},{t:'🙈 ทำเป็นไม่เห็น',f:()=>L(`🙈 ${b}ทำเป็นไม่เห็นเหมือนกัน แต่ไม่เคยมองหน้าคุณตรงๆ อีกเลย`,'')}])}
   const n=anyName(OG());return pop(`💬 ${E(n)}`,`ก่อนคุณกลับ ${P()}กระซิบว่า "ช่วยฉันออกจากที่นี่ได้ไหม ฉันติดหนี้เขาอยู่ ${M$(cash(300))}"`,[{t:`💸 จ่ายหนี้ให้ ${M$(cash(300))}`,dis:(S.money||0)<cash(300),f:()=>{S.money-=cash(300);S.karma=(S.karma||0)+10;const p=Object.assign(mkP('book'),{n,af:55,job:'คนที่คุณช่วยออกมา'});LV().L.push(p);L(`💸 สามเดือนต่อมา${E(n)}ส่งข้อความมาว่าได้งานใหม่แล้ว และอยากเลี้ยงข้าวคุณ — เพิ่มลงสมุดแล้ว`,'epic')}},{t:'😔 ช่วยไม่ได้',f:()=>L(`😔 คุณเดินออกมาโดยไม่หันกลับไป`,'')}])}},
  {t:'🚶 เปลี่ยนใจ กลับบ้าน',f:()=>{L('🚶 คุณซื้อข้าวเหนียวหมูปิ้งกลับบ้านแทน','')}}])}
function home(){const lv=LV();lv.hm=(lv.hm|0)+1;if(lv.hm>=4&&Math.random()<.4){lv.hm=0;J(-4);return L('🛋️ คืนที่สี่ของเดือน คุณรู้สึกว่างเปล่าแปลกๆ แล้วนั่งไถมือถือจนเช้า','')}
 J(6);S.hp=Math.min(S.maxHp,S.hp+S.maxHp*.05);L(pk(['🛋️ ปิดไฟ เปิดเว็บที่ไม่ควรเปิด จบแล้วหลับสนิทที่สุดในรอบเดือน','🛋️ คืนนี้ของคุณคนเดียว ไม่มีใครให้ต้องเอาใจ ชิวกว่าที่คิด','🛋️ คุณสั่งพิซซ่า ดูหนังผู้ใหญ่ แล้วหลับคาโซฟา']),'good')}

// ---------------------------------------------------------------- 📋 เควสระบบ (มีระบบเท่านั้น)
const QT={num:['ได้ช่องทางติดต่อคนใหม่',2],date:['ออกเดท/จีบ',3],win:['ชนะใจใครสักคน',1]};
function questNew(){const lv=LV();if(!sysOn()){lv.q=null;return}const k=pk(Object.keys(QT));lv.q={k,need:QT[k][1],got:0,y:S.age}}
function questTick(k){const q=LV().q;if(!q||q.k!==k||q.done)return;q.got++;if(q.got>=q.need){q.done=1;const g=k==='win'?3:2;if(S.sys&&S.sys.t)S.sys.pts=(S.sys.pts|0)+g;else if(S.wsy)S.wsy.pts=(S.wsy.pts|0)+g;else return;L(`📋 เควสระบบสำเร็จ: ${QT[k][0]} — แต้มระบบ +${g}`,'epic')}}
function questView(){const q=LV().q;if(!sysOn())return'';if(!q)return'';return`<div class="lvC" style="border-color:#6bd5ff88"><b>📋 เควสระบบปีนี้</b><div class="lvS">${QT[q.k][0]} ${q.got}/${q.need} ${q.done?'✅':''} · รางวัล ${q.k==='win'?3:2} แต้ม · ล้มเหลว = ระบบเยาะเย้ย</div></div>`}

// ---------------------------------------------------------------- หน้าหลัก
window.openLove=function(t){if(!ok())return toast&&toast('ต้องอายุ 18 ขึ้นไป');const lv=LV();fill();tab=t||tab||'book';
 const tabs=[['book',MW()?'💗 คนที่คุยอยู่':'🌸 สมุดคนงาม'],['harem',`🏯 ตำหนักใน (${(S.harem||[]).length})`]].concat(MW()?[['app','💘 แอป'],['nite','🌃 คืนนี้']]:[]);
 if(!tabs.some(x=>x[0]===tab))tab='book';
 show(MW()?'💘 ชีวิตรัก':'🌸 สมุดคนงาม',`แรงจีบปีนี้ ${lv.ap|0}/${apMax()}${sysOn()?' · 📟 ระบบช่วย (แต้ม '+sysPts()+')':''}${S.spouse?' · 💞 '+E(S.spouse):''}`,()=>`<div class="lvTabs">${tabs.map(x=>`<button class="${x[0]===tab?'on':''}" onclick="${btn(()=>openLove(x[0]))}">${x[1]}</button>`).join('')}</div>`+questView()+
  (tab==='book'?lv.L.filter(x=>x.st==='free').map(card).join(''):tab==='harem'?haremView():tab==='app'?appView():nightView()))};

// ---------------------------------------------------------------- รายปี + เมนู
function yearly(){if(!ok())return;const lv=LV();
 if(lv.q&&!lv.q.done&&lv.q.y<S.age){L(`📋 ระบบ: "เควสง่ายแค่นี้ยังทำไม่ได้ ${pk(['น่าสงสาร','ข้าเริ่มสงสัยว่าเลือกโฮสต์ผิด','ปีหน้าพยายามหน่อย'])}"`,'');J(-2)}
 if(!lv.q||lv.q.y<S.age)questNew();
 lv.ap=apMax();lv.br=Math.max(0,(lv.br||0)-1);
 lv.L.forEach(p=>{if(p.st!=='free')return;p.age++;p.af=cl(p.af-R(2,5),0,100);if(p.af<=0&&Math.random()<.5)p.st='gone'});
 lv.L=lv.L.filter(p=>p.st==='free');if(S.age%6===0)lv.L=lv.L.filter(p=>p.af>=20);
 try{haremYear()}catch(e){console.error('love harem',e)}}
let lastK='';
{const _p=passYear;passYear=function(){const me=S,a0=S&&S.age;const r=_p.apply(this,arguments);try{if(S&&S===me&&S.alive&&S.age!==a0){const k=S.age+':'+S.name;if(k!==lastK){lastK=k;yearly()}}}catch(e){console.error('love',e)}return r}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(ok()){const m=$('modal'),g=m.querySelector('.mgrid')||m;if(!m.querySelector('.lvM'))g.insertAdjacentHTML('afterbegin',`<button class="opt lvM" onclick="closeM();openLove()">${MW()?'💘 ชีวิตรัก':'🌸 สมุดคนงาม'}<small>${MW()?'จีบ · แอป · คืนนี้':'จีบ · ดูสถานะ · ตำหนักใน'}</small></button>`)}}catch(e){}return r}}
window._love={mkP,fill,yearly,win,jealous,rivalHit,buy,pub,home,swipe,haremYear,LV};
})();
try{wReady('love')}catch(e){}
