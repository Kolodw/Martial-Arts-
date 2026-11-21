// ============================================================
// /w/nsys6.js — 📱 ชั้นประสบการณ์ของระบบยุคปัจจุบัน (ต่อจาก nsys.js)
// การ์ดระบบใต้ฉาก · แจ้งเตือนแบบมือถือ · ฉากติดตั้ง/เลเวลอัป/เลื่อนขั้น · คำอธิบายครั้งแรก (ทุกระบบ)
// เช็กลิสต์ประจำปี 3 ข้อ (ข้อแรกจำกัดเวลา มีบทลงโทษ) · การันตีเหตุการณ์ระบบปีละครั้ง · เควสวัยเรียน
// แต้มระบบ + ร้านค้า · กล่องสุ่มตอนเลเวลอัป · ช่อง 📱 ระบบในหน้าสุ่มเกิด · ระบบมาตอนชีวิตพัง
// ตั๋วเรียกระบบ · ผู้ใช้ระบบในรัศมี 5 กม. · หอเกียรติยศระบบ + บรรทัดในการ์ดเรื่องสั้น
// ============================================================
(()=>{
const X=window._nsys,W=window._wld;
if(!X||!W){console.warn('nsys6: ไม่มี nsys');try{wReady('nsys6')}catch(e){}return}
const {byId,lvT,ready,mg,nsNew,offer,shared,SYS}=X;const fire=W.wFire,wOf=W.wOf;
const TN=['ต่ำ','กลาง','สูง','เทพ'],TC=['#9fb4c8','#5fd47a','#4aa3ff','#ffcf3a'],TI=['▫️','🔹','🔷','👑'],CAP=[3,6,9,10],XPL=40,LVR=['Lv.1–3','Lv.4–6','Lv.7–9','Lv.10'];
const STN={mon:'💵 เงิน',fame:'📈 ผู้ติดตาม',int:'🧠 สติปัญญา',cha:'✨ เสน่ห์',hp:'❤️ พลังชีวิต',pow:'💪 พลัง',joy:'😊 ความสุข',kar:'🙏 กรรมดี'};
const pk=a=>a[Math.floor(Math.random()*a.length)],RN=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const E=s=>{try{return esc(s)}catch(e){return String(s)}};
const NSo=M=>M&&M.NS&&M.NS.on?M.NS:null;
const busy=()=>{try{return !!(choice._cur||(typeof modalOpen!=='undefined'&&modalOpen))}catch(e){return false}};
const later=(f,ms)=>setTimeout(()=>{try{f()}catch(e){console.error('nsys6',e)}},ms||400);
const whenFree=(f,n)=>{n=n||0;if(busy()&&n<120)return setTimeout(()=>whenFree(f,n+1),700);try{f()}catch(e){console.error('nsys6',e)}};
const say=(t,c)=>{try{mwSay(t,c||'')}catch(e){try{log(t,c||'')}catch(x){}}};
const kAdd=t=>{try{keyAdd(t)}catch(e){}};
const sfxS=k=>{try{sfx(k)}catch(e){}};
const life=()=>{try{return S&&S.alive&&S.mw?S.mw:null}catch(e){return null}};

// ---------- ค่าประสบการณ์ (กฎเดียวกับ nsys) ----------
function addXP(M,N,v){if(!N||v<=0||N.lock>0)return'';if(N.pk==='fast')v=Math.round(v*1.35);const cap=CAP[lvT(N.lv)];N.xp+=v;let up=0;
 while(N.xp>=XPL&&N.lv<cap){N.xp-=XPL;N.lv++;up++}if(N.lv>=cap&&N.lv<10)N.xp=Math.min(N.xp,XPL);
 if(up){const sys=byId(N.id);try{log(`📱 <span class="px">[${E(sys.app)}] เลเวลอัป → Lv.${N.lv}</span>`,'epic')}catch(e){}}return` · ⭐ +${v}`}
const pts=(N,v)=>{N.sp=Math.max(0,(N.sp|0)+v)};

// ---------- 🔔 แจ้งเตือนแบบมือถือ ----------
const PQ=[];let pOn=0;
function push(ic,ti,tx){if(PQ.length>4)PQ.shift();PQ.push([ic,ti,tx]);if(!pOn)pNext()}
function pNext(){const x=PQ.shift();if(!x){pOn=0;return}pOn=1;let el=document.getElementById('nsPush');if(!el){el=document.createElement('div');el.id='nsPush';document.body.appendChild(el)}
 el.innerHTML=`<div class="pI">${x[0]}</div><div class="pB"><div class="pH"><b>${x[1]}</b><span>ตอนนี้</span></div><div class="pT">${x[2]}</div></div>`;el.className='';void el.offsetWidth;el.className='on';
 el.onclick=()=>{el.className='';try{if(life()&&life().NS)nsOpen()}catch(e){}};sfxS('click');
 setTimeout(()=>{el.className='';setTimeout(pNext,350)},3300)}
window.nsPush=push;

// ---------- 🎬 ฉาก ----------
function fx(html,cls,ms,done){let o=document.getElementById('nsFx');if(o)o.remove();o=document.createElement('div');o.id='nsFx';o.className=cls;o.innerHTML=html+'<small class="fxSk">แตะเพื่อข้าม</small>';document.body.appendChild(o);
 let fin=0;const end=()=>{if(fin)return;fin=1;o.classList.add('out');setTimeout(()=>{o.remove();if(done)done()},380)};o.onclick=end;setTimeout(end,ms)}
const THEME=id=>id==='chuuni'?'ch':id==='page'?'pg':'df';
function installFx(sys,done){const th=THEME(sys.id);sfxS('good');
 const msg=th==='ch'?['ผนึกที่ 1 … คลาย','ผนึกที่ 2 … คลาย','สัญญาเลือดลงนามแล้ว']:th==='pg'?['หน้า 1 … เปิด','หน้า 47 … เปิด','ประตูหน้ากระดาษเชื่อมต่อแล้ว']:['กำลังดาวน์โหลด… 23%','กำลังติดตั้ง… 87%','ยืนยันผู้ถูกเลือก… สำเร็จ'];
 fx(`<div class="phone ${th}"><div class="scr"><div class="boot">${msg.map((m,i)=>`<p style="animation-delay:${.25+i*.55}s">${m}</p>`).join('')}</div>
  <div class="app" style="animation-delay:2s"><span class="aic">${sys.ic}</span><b>${E(sys.app)}</b><small>ติดตั้งเสร็จสมบูรณ์</small></div></div></div>
  ${th==='ch'?'<div class="runes">ᚠᚢᚦᚨᚱᚲ ᛉᛊᛏᛒ ᛖᛗᛚᛜ</div>':th==='pg'?'<div class="pages"><i></i><i></i><i></i></div>':'<div class="rays"></div>'}`,'inst '+th,3900,done)}
function lvFx(sys,lv){sfxS('good');fx(`<div class="lvB"><span>${sys.ic}</span><b>LEVEL UP</b><em>Lv.${lv}</em></div>`,'lvup',1500)}
function tierFx(sys,t){sfxS('good');try{vib&&vib(60)}catch(e){}fx(`<div class="tierB" style="--c:${TC[t]}"><small>${E(sys.app)}</small><div class="tI">${TI[t]}</div><b>ขั้น${TN[t]}</b><em>「${E(sys.T[t])}」</em></div>`,'tier',2600)}

// ---------- ❓ คำอธิบายตอนได้ระบบ (สร้างจากข้อมูลของแต่ละระบบ จึงครอบคลุมทุกระบบ) ----------
function guide(sys,first){const st=(sys.st||'mon').split(',').map(k=>STN[k]||k).join(' · ');
 modal(`${first?'':'<button class="xbtn" onclick="closeM()">✕</button>'}<h3>${first?'📲 คุณได้รับระบบ!':'❓ ระบบทำงานยังไง'}</h3><div class="nsApp nsG">
 <div class="hd"><span class="ic">${sys.ic}</span><div><div class="nm px">${E(sys.app)}</div><div class="tt">${E(sys.d)}</div></div></div>
 <div class="row"><b>1 · ระบบคืออะไร</b><br>แอปในมือถือที่ส่ง<b>ภารกิจ</b>ให้คุณทุกปี ทำสำเร็จได้ ⭐ ค่าประสบการณ์ และเพิ่ม ${st} · ทุกปีแอปยังให้ค่าสถานะเล็กน้อยเองด้วย</div>
 <div class="row"><b>2 · ระดับ 4 ขั้น</b><div class="gT">${[0,1,2,3].map(i=>`<div style="color:${TC[i]}">${TI[i]} ${TN[i]}<small>${LVR[i]}<br>「${E(sys.T[i])}」</small></div>`).join('')}</div>เลเวลถึงเพดานของขั้นแล้วต้อง<b>สอบเลื่อนขั้น</b> (มินิเกม ได้ 60% ขึ้นไป): ${(sys.X||[]).slice(0,3).map(x=>'「'+E(x)+'」').join(' → ')}</div>
 <div class="row"><b>3 · ทางแยกตอนขึ้นขั้นกลาง</b> เลือก 1 ทาง เปลี่ยนไม่ได้ เปลี่ยนเควสและตอนจบ<br>${(sys.P||[]).map(p=>`🧭 <b>${E(p[1])}</b> <small>— ${E(p[2])}</small>`).join('<br>')}</div>
 ${sys.meter?`<div class="row"><b>${sys.meter.ic} แถบ${E(sys.meter.n)}</b><br>${E(sys.meter.d||'')}</div>`:''}
 <div class="row"><b>4 · ทุกปีมีเช็กลิสต์ 3 ข้อ</b><br>ทำได้จากชีวิตปกติ (เงิน เรียน ทำงาน ช่วยคน) ไม่ต้องรอเหตุการณ์ · ข้อ ⏱️ <b>จำกัดเวลา</b> ถ้าไม่ทันโดน <b>ช็อตไฟฟ้า</b> (พลังชีวิตและค่าประสบการณ์ลด) · สำเร็จได้ 🪙 แต้มระบบ ไปแลกของในร้านค้าระบบ</div>
 <div class="row"><b>5 · ของรางวัล</b><br>🎁 เลเวลอัปทุกครั้งได้กล่องสุ่ม 1 กล่อง · พลาดภารกิจติดกัน 3 ครั้ง ระบบลงโทษ · ตอนจบมี 4 แบบ: 👑 สุดทาง 🗑️ ถอดระบบ 😈 ด้านมืด 🗝️ ความลับของผู้สร้าง</div>
 <div class="row"><b>6 · เปิดดูระบบได้ที่</b><br>📱 การ์ดระบบใต้ฉาก (แตะได้) หรือ ☰ เมนู → ระบบ · แจ้งเตือนจะเด้งจากด้านบนจอ แตะเพื่อเปิดแอป</div>
 <button class="pbtn" style="width:100%;margin-top:8px" onclick="closeM();nsOpen()">📱 เปิดหน้าระบบ</button></div>`,'nsguide')}
window.nsGuide=()=>{const M=life(),N=M&&M.NS;const sys=N&&byId(N.id);if(sys)guide(sys,false)};

// ---------- ✅ เช็กลิสต์ประจำปี ----------
const MET={mon:()=>+S.money||0,int:()=>+S.int||0,cha:()=>+S.cha||0,hp:()=>+S.maxHp||0,pow:()=>+S.power||0,fame:M=>+M.fame||0,kar:()=>+S.karma||0,wins:(M,N)=>N.wins|0,kind:(M,N)=>N.kind|0,fail:(M,N)=>N.fail|0};
function mkTask(M,N,k,t){const b=MET[k]?MET[k](M,N):0;const T=(n,txt,need,abs)=>({k:n,txt,need,b,abs:abs?1:0});
 switch(k){case'mon':{const need=Math.max(2000,Math.round(Math.max(+S.money||0,15000)*[.06,.08,.1,.12][t]));return T('mon',`💵 หาเงินเพิ่มให้ได้ ${fmt(need)}`,need)}
  case'int':return T('int',`🧠 สติปัญญา +${[2,3,4,6][t]}`,[2,3,4,6][t]);case'cha':return T('cha',`✨ เสน่ห์ +${[2,3,4,6][t]}`,[2,3,4,6][t]);
  case'hp':return T('hp',`❤️ พลังชีวิตสูงสุด +${[4,6,10,16][t]}`,[4,6,10,16][t]);case'pow':{const need=Math.max(1,Math.round((+S.power||0)*.02));return T('pow',`💪 พลัง +${fmt(need)}`,need)}
  case'fame':return T('fame',`📈 ผู้ติดตาม +${fmt([150,1500,15000,150000][t])}`,[150,1500,15000,150000][t]);case'kar':return T('kar',`🙏 กรรมดี +${[2,3,5,8][t]}`,[2,3,5,8][t]);
  case'joy':return{k:'joy',txt:'😊 ความสุขไม่ต่ำกว่า 55 ตอนสิ้นปี',need:55,b:0,abs:1};case'wins':return T('wins','🎯 ทำภารกิจของระบบสำเร็จ 1 ครั้ง',1);case'kind':return T('kind','🤍 เลือกทางใจดี 1 ครั้ง',1);
  case'fail':return{k:'fail',txt:'🛡️ ไม่พลาดภารกิจเลยทั้งปี',need:0,b,abs:2}}return T('wins','🎯 ทำภารกิจของระบบสำเร็จ 1 ครั้ง',1)}
function tDone(M,N,x){if(x.k==='joy')return(+S.happy||0)>=55;if(x.k==='fail')return(N.fail|0)<=x.b&&(N.wins|0)>((N.cl&&N.cl.w0)|0);const v=MET[x.k]?MET[x.k](M,N):0;return v-x.b>=x.need}
function newList(M,N){const sys=byId(N.id),t=lvT(N.lv),L=(sys.st||'mon').split(',');let ks=[L[0],L[1]||pk(['joy','kar']),pk(['wins','kind','fail','joy'])];if(M.kid)ks=ks.map(k=>k==='mon'||k==='fame'||k==='pow'?'wins':k);if(M.kid&&ks.filter(k=>k==='wins').length>1)ks=[ks[0],'joy',L.indexOf('int')>=0?'int':'kar'];const seen={};
 const out=ks.map(k=>{if(seen[k])k='wins';seen[k]=1;return mkTask(M,N,k,t)});out[0].tm=1;N.cl={y:S.age,t:out,w0:N.wins|0,ok:0};
 push(sys.ic,`${E(sys.app)} · เช็กลิสต์ปีนี้`,`⏱️ ${out[0].txt.replace(/^\S+\s/,'')} <small>(จำกัดเวลา 1 ปี)</small> และอีก 2 ข้อ`)}
function judge(M,N){const C=N.cl;if(!C||C.y===S.age&&C.done)return;if(C.done)return;const sys=byId(N.id);let n=0;const L=[];
 C.t.forEach(x=>{x.ok=tDone(M,N,x)?1:0;if(x.ok){n++;addXP(M,N,8);pts(N,1)}else if(x.tm){if(N.shield){N.shield=0;L.push('🛡️ บัตรยกเว้นโทษถูกใช้แทน')}else if(M.kid){N.xp=Math.max(0,N.xp-5);L.push('⚡ ระบบสั่นเตือนเบาๆ (วัยเด็ก) ⭐ −5')}else{const d=Math.round((S.maxHp||100)*.12);S.hp=Math.max(1,(S.hp||1)-d);N.xp=Math.max(0,N.xp-10);try{joy(-4)}catch(e){}L.push(`⚡ <b>ช็อตไฟฟ้า!</b> พลาดภารกิจจำกัดเวลา พลังชีวิต −${d} · ⭐ −10`)}}});
 C.done=1;if(n===3){pts(N,2);addXP(M,N,6);C.ok=1}
 try{log(`📋 <b>สรุปเช็กลิสต์ของ ${E(sys.app)}</b> ${C.t.map(x=>(x.ok?'✅':x.tm?'⏱️❌':'⬜')+' '+x.txt.replace(/^\S+\s/,'')).join(' · ')} <span class="tag2">สำเร็จ ${n}/3 · 🪙 +${n+(n===3?2:0)}${n===3?' · โบนัสครบทุกข้อ':''}</span>${L.length?'<br>'+L.join('<br>'):''}`,n===3?'epic':L.length?'bad':'')}catch(e){}
 push(sys.ic,n===3?'ภารกิจครบทุกข้อ! 🎉':`เช็กลิสต์ปีที่แล้ว ${n}/3`,n===3?'ได้ 🪙 +5 และโบนัส ⭐':L.length?'⚡ พลาดภารกิจจำกัดเวลา โดนลงโทษ':`ได้ 🪙 +${n}`)}

// ---------- 🧒 เควสวัยเรียน (แยกตามสายของระบบ) ----------
const KQ={
 mon:[['🛒 ตลาดนัดในโรงเรียน','ระบบสั่งให้ทำกำไรจากงานวันเด็กของโรงเรียน ทุนคือเงินค่าขนมทั้งสัปดาห์',[['ขายน้ำแข็งใสสูตรตัวเอง','g','ขายหมดก่อนเที่ยง ครูประจำชั้นมาขอสูตร','น้ำแข็งละลายครึ่งถัง ขาดทุนค่าไซรัป'],['รับฝากขายของเพื่อน คิดค่าหัวคิว','s','ได้ค่าหัวคิวมานิดหน่อยแบบไม่เสี่ยง','เพื่อนไม่เอาของมาฝาก'],['ทุ่มซื้อการ์ดสะสมมาขายต่อ','r','การ์ดหายากใบหนึ่งขายได้ราคาสูง','การ์ดตกรุ่นในสัปดาห์เดียว']]],
  ['🐷 กระปุกออมสินแห่งระบบ','ระบบตั้งภารกิจ: เก็บเงินให้ครบ 500 บาทภายในหนึ่งเทอม',[['ทำตารางรายจ่ายใส่สมุด','g','ครบ 500 ก่อนกำหนด ระบบให้ดาวทอง','ซื้อขนมตอนเผลอจนหลุดเป้า'],['ช่วยแม่ขายของหลังเลิกเรียน','s','แม่ให้ค่าแรงวันละสิบบาท ครบพอดี','แม่บอกว่าช่วยแล้วไม่ต้องเอาเงิน']]],
  ['📦 ขายของออนไลน์ครั้งแรก','พี่ข้างบ้านสอนเปิดร้านออนไลน์ ระบบบอกว่า “ลูกค้าคนแรกสำคัญที่สุด”',[['ถ่ายรูปสินค้าให้สวยที่สุด','g','มีคนกดสั่งตั้งแต่คืนแรก','รูปมืดไป ไม่มีใครกดดู'],['ตั้งราคาถูกกว่าตลาด','r','ขายได้ยกล็อตแต่กำไรบาง','ขายได้ แต่ค่าส่งกินกำไรหมด']]]],
 hp:[['🏃 วิ่งรอบสนามตอนเช้า','ระบบปลุกตีห้าครึ่ง: “วิ่งให้ครบ 5 รอบก่อนเข้าแถว”',[['วิ่งให้ครบ','g','ครบ 5 รอบ ครูพละจดชื่อไว้','รอบที่สี่หอบจนต้องเดิน'],['เดินเร็วแทน','s','ไม่เร็วแต่ครบรอบ','ประตูโรงเรียนยังไม่เปิด']]],
  ['🏅 คัดตัวนักกีฬาโรงเรียน','โค้ชคัดตัวทีมโรงเรียน ระบบขึ้นภารกิจ “ติดทีมให้ได้”',[['ลงคัดตัวเต็มที่','g','ติดทีมตั้งแต่ปีแรก','ตกรอบสุดท้าย โค้ชบอกให้มาใหม่ปีหน้า'],['ขอเป็นตัวสำรองก่อน','s','ได้ซ้อมกับรุ่นพี่ทุกวัน','ทีมเต็มแล้ว']]],
  ['🥗 อาหารกลางวันของระบบ','ระบบสแกนกล่องข้าวแล้วขึ้นตัวแดง “โปรตีนไม่พอ”',[['ขอแม่ทำกับข้าวตามที่ระบบบอก','s','แม่งงแต่ทำให้ ร่างกายแข็งแรงขึ้นจริง','แม่บอกว่าอย่าเรื่องมาก'],['แลกขนมกับไข่ต้มของเพื่อน','r','ได้ไข่ต้มทั้งเทอม','เพื่อนฟ้องครู']]]],
 int:[['📚 ติวสอบเข้า ม.1','ระบบเปิดโหมดติว: “ข้อสอบเข้าโรงเรียนประจำจังหวัด ทำให้ได้ 80%”',[['ทำข้อสอบเก่าทุกคืน','g','ติดอันดับต้นของจังหวัด','พลาดไปสองคะแนน'],['ให้ระบบสรุปให้อ่าน','s','อ่านง่ายขึ้นเยอะ','สรุปสั้นไปจนลืมสูตร']]],
  ['🧪 โครงงานวิทยาศาสตร์','ครูให้ทำโครงงาน ระบบเสนอหัวข้อที่ “เกินระดับเด็กประถม”',[['ทำหัวข้อของระบบ','r','ได้รางวัลระดับเขต กรรมการถามว่าใครช่วย','ทดลองไม่ขึ้น ต้องรีบเปลี่ยนหัวข้อ'],['ทำเรื่องง่ายแต่เนี้ยบ','g','ได้เกรดสี่ ครูเอาไปโชว์หน้าห้อง','รายงานพิมพ์ผิดเยอะ']]],
  ['🧩 แข่งตอบปัญหา','โรงเรียนส่งแข่งตอบปัญหา ระบบกระซิบคำตอบได้ 3 ครั้ง',[['ตอบเองทั้งหมด','g','ชนะทั้งที่ไม่ใช้ตัวช่วย ระบบให้โบนัส','ตอบผิดข้อสุดท้าย'],['ใช้ตัวช่วยครบสามครั้ง','s','ได้ที่สองแบบชิลๆ','ตัวช่วยกระซิบช้าไปหนึ่งข้อ']]]],
 cha:[['🎭 ละครวันแม่','ครูหาคนเล่นบทนำในละครวันแม่ ระบบขึ้น “รับบทนำ = เสน่ห์ +”',[['อาสาเล่นบทนำ','g','แม่ร้องไห้ทั้งแถว คนทั้งโรงเรียนจำชื่อได้','ลืมบทกลางเวที'],['ขอเป็นผู้บรรยาย','s','เสียงดี ครูชม','ไมค์เสียตั้งแต่ประโยคแรก']]],
  ['🗳️ เลือกตั้งประธานนักเรียน','ระบบตั้งภารกิจ “ชนะเลือกตั้งประธานนักเรียน”',[['หาเสียงทุกห้อง','g','ชนะขาด เพื่อนต่างห้องรู้จักทั้งรุ่น','แพ้ไปสามคะแนน'],['สัญญาจะขอตู้น้ำเย็น','r','ชนะ แต่ต้องไปขอตู้น้ำจริงๆ','ไม่มีใครเชื่อ']]],
  ['🤝 เพื่อนใหม่ย้ายมา','มีเด็กย้ายมาใหม่นั่งคนเดียว ระบบบอกว่า “ความสัมพันธ์คือทรัพยากร”',[['ชวนกินข้าวด้วยกัน','s','ได้เพื่อนสนิทคนแรกที่รู้เรื่องระบบ','เขาเขินจนไม่กล้าคุย'],['ชวนเข้าแก๊งตัวเอง','g','แก๊งใหญ่ขึ้น คุณเป็นศูนย์กลาง','เพื่อนเก่าบางคนงอน']]]],
 fame:[['📹 คลิปแรกในชีวิต','ระบบสั่ง “โพสต์คลิปแรก ยอดวิวเกินร้อย”',[['ทำคลิปเต้นท่าตัวเอง','g','ยอดวิวทะลุพัน ญาติแชร์ทั้งตระกูล','ไม่มีใครดูเลยนอกจากแม่'],['รีวิวขนมหน้าโรงเรียน','s','ยอดวิวพอผ่านเป้า','แม่ค้าขอให้ลบ']]],
  ['🎤 ประกวดร้องเพลง','โรงเรียนจัดประกวดร้องเพลง ระบบขึ้นแถบ “ชื่อเสียง”',[['ขึ้นเวทีเต็มที่','g','ได้ที่หนึ่ง มีคนขอถ่ายรูปด้วย','เสียงหลงท่อนฮุก'],['ร้องคู่กับเพื่อน','s','ได้รางวัลขวัญใจ','เพื่อนตื่นเต้นจนร้องไม่ออก']]],
  ['📰 ข่าวเด็กเก่ง','ผู้สื่อข่าวท้องถิ่นมาทำข่าว ระบบบอกว่า “โอกาสนี้มีครั้งเดียว”',[['เล่าเรื่องตัวเองแบบมั่นใจ','g','ได้ลงหนังสือพิมพ์จังหวัด','ตื่นกล้องจนพูดวน'],['ให้ครูพูดแทน','s','มีชื่ออยู่ท้ายข่าว','ครูลืมพูดชื่อคุณ']]]],
 kar:[['🐶 หมาหลงหน้าโรงเรียน','ระบบขึ้นภารกิจ “ช่วยชีวิตหนึ่งชีวิต”',[['พาไปหาหมอด้วยเงินเก็บ','s','หมาหายดี เจ้าของตามมาขอบคุณ','เงินไม่พอค่ารักษา ต้องขอแม่'],['ตามหาเจ้าของ','g','เจอเจ้าของในวันเดียว','ติดประกาศทั้งซอยแต่ยังไม่มีใครติดต่อ']]],
  ['🧓 ยายข้างบ้าน','ยายข้างบ้านอยู่คนเดียว ระบบแนะนำ “ช่วยโดยไม่หวังผล”',[['ไปช่วยรดน้ำต้นไม้ทุกเย็น','s','ยายสอนทำขนมไทยเป็นของตอบแทน','ยายเกรงใจ ไม่ให้ช่วย'],['ชวนเพื่อนมาช่วยกันทาสีบ้าน','g','บ้านยายสวยที่สุดในซอย','ทาสีเลอะรั้วเพื่อนบ้าน']]],
  ['🎒 กระเป๋าตังค์ที่เก็บได้','เจอกระเป๋าตังค์ในห้องน้ำ ข้างในมีเงินสองพัน',[['ส่งครูฝ่ายปกครอง','s','ได้เกียรติบัตรเด็กดี','ครูไม่อยู่ ต้องรอทั้งวัน'],['ตามหาเจ้าของเอง','g','เจ้าของเป็นรุ่นพี่ เลี้ยงข้าวคุณหนึ่งมื้อ','หาไม่เจอ ต้องเอาไปให้ครูอยู่ดี']]]]};
const KG={mon:'mon',tycoon:'mon',invest:'mon',luck:'kar',athlete:'hp',muay:'hp',body:'hp',genius:'int',exam:'int',doctor:'int',startup:'mon',star:'fame',influ:'fame',chef:'cha',writer:'int',charm:'cha',parent:'kar',good:'kar',farm:'hp',detect:'int',chuuni:'cha',page:'fame',rich:'mon'};
function kidQ(M){const N=NSo(M);if(!N)return;const sys=byId(N.id);const g=KG[sys.id]||(sys.st||'mon').split(',')[0];const Lq=KQ[g]||KQ[{pow:'hp',joy:'kar'}[g]]||KQ.mon;
 N.kd=N.kd||{};let pool=Lq.map((q,i)=>i).filter(i=>!N.kd[g+i]);if(!pool.length){N.kd={};pool=Lq.map((q,i)=>i)}const i=pk(pool);N.kd[g+i]=1;N.kq=S.age;const q=Lq[i];
 choice(`${sys.ic} ${q[0]}`,`<div class="tag2" style="margin-bottom:4px">📱 ${E(sys.app)} · ภารกิจวัยเรียน · Lv.${N.lv}</div>${q[1]}`,q[2].map(o=>mwC(o[0],()=>{const k=o[1];
  const fin=(win,sc)=>{if(!NSo(M))return;if(win){const g2=addXP(M,N,k==='r'?20:k==='g'?Math.round(10+14*(sc||.6)):8);pts(N,1);N.wins=(N.wins|0)+1;const L=(sys.st||'mon').split(',');try{L.forEach(s=>{if(s==='int')S.int=(S.int||0)+2;else if(s==='cha')S.cha=(S.cha||0)+2;else if(s==='hp'){S.maxHp=(S.maxHp||100)+4}else if(s==='kar')S.karma=(S.karma||0)+2;else if(s==='joy')joy(3);else if(s==='fame')M.fame=(M.fame||0)+120;else if(s==='mon')S.money=(S.money||0)+500;else if(s==='pow')S.power=(S.power||0)+Math.max(1,Math.round((S.power||0)*.01))})}catch(e){}
    say(`${sys.ic} ${o[2]}`,'good');try{log(`<span class="tag2">${g2.replace(/^ · /,'')} · 🪙 +1</span>`,'')}catch(e){}}else{N.fail=(N.fail|0)+1;try{joy(-2)}catch(e){}say(`${sys.ic} ${o[3]}`,'bad')}};
  if(k==='g')later(()=>mg(sys,RN(0,(sys.mg||[1]).length-1),0,q[0].replace(/^\S+\s/,''),(sc)=>fin(sc>=.55,sc)));else fin(Math.random()<(k==='s'?.9:.5))},{s:{g:'🎮 มินิเกม',s:'🛡️ ชัวร์',r:'🎲 เสี่ยง ได้มาก'}[o[1]]||''})))}

// ---------- 🛒 ร้านค้าระบบ + 🎁 กล่องสุ่ม ----------
const SHOP=[['xp','🧪 ยาเพิ่มสมาธิ','⭐ +20 ทันที',3],['shield','🛡️ บัตรยกเว้นโทษ','กันบทลงโทษ/ช็อตไฟฟ้าได้ 1 ครั้ง',2],['heal','💊 ยาฟื้นฟูเต็มหลอด','พลังชีวิตเต็ม · ความสุข +5',2],['exam','📄 ตั๋วสอบซ้ำ','สอบเลื่อนขั้นได้อีกครั้งในปีนี้',3],['box','🎁 กล่องสุ่มระบบ','สุ่มรางวัล ธรรมดา/หายาก/ตำนาน',2],['re','🔄 สุ่มเช็กลิสต์ใหม่','เปลี่ยนเช็กลิสต์ปีนี้ทั้ง 3 ข้อ',1],['life','⏳ ยาต่อชีวิต','อายุขัย +2 ปี',6]];
window.nsShop=function(){const M=life(),N=NSo(M);if(!N)return;const sys=byId(N.id);
 modal(`<button class="xbtn" onclick="closeM();nsOpen()">✕</button><h3>🛒 ร้านค้าระบบ</h3><div class="nsApp"><div class="row">🪙 แต้มระบบของคุณ <b>${N.sp|0}</b> <small>· ได้จากเช็กลิสต์ประจำปี เควสวัยเรียน และกล่องสุ่ม</small></div>
 ${SHOP.map(x=>`<div class="row shR"><div><b>${x[1]}</b><br><small>${x[2]}</small></div><button class="${(N.sp|0)>=x[3]?'pbtn':'gbtn'}" ${(N.sp|0)>=x[3]?'':'disabled'} onclick="nsBuy('${x[0]}')">🪙 ${x[3]}</button></div>`).join('')}</div>`,'nsshop')};
window.nsBuy=function(k){const M=life(),N=NSo(M);if(!N)return;const it=SHOP.find(x=>x[0]===k);if(!it||(N.sp|0)<it[3])return toast('แต้มไม่พอ');const sys=byId(N.id);
 if(k==='exam'&&!ready(N))return toast('ยังไม่ถึงเวลาสอบเลื่อนขั้น');if(k==='shield'&&N.shield)return toast('มีบัตรยกเว้นโทษอยู่แล้ว');if(k==='re'&&(!N.cl||N.cl.done))return toast('ยังไม่มีเช็กลิสต์ปีนี้');
 pts(N,-it[3]);sfxS('good');
 if(k==='xp'){addXP(M,N,20);toast('🧪 ⭐ +20')}else if(k==='shield'){N.shield=1;toast('🛡️ ได้บัตรยกเว้นโทษ')}else if(k==='heal'){S.hp=S.maxHp;try{joy(5)}catch(e){}toast('💊 ฟื้นฟูเต็มหลอด')}
 else if(k==='exam'){N.ey=-9;toast('📄 สอบเลื่อนขั้นได้อีกครั้งปีนี้')}else if(k==='box'){N.box=(N.box|0)+1;return nsBox()}else if(k==='re'){newList(M,N);toast('🔄 สุ่มเช็กลิสต์ใหม่แล้ว')}
 else if(k==='life'){try{M.end=(M.end||80)+2}catch(e){}S.lifespan=(S.lifespan||0)+2;toast('⏳ อายุขัย +2 ปี')}
 try{log(`🛒 ซื้อ ${it[1]} จากร้านค้าระบบ (🪙 −${it[3]})`,'')}catch(e){}try{render()}catch(e){}nsShop()};
const BOXR=[['ธรรมดา','#9fb4c8',60],['หายาก','#4aa3ff',30],['ตำนาน','#ffcf3a',10]];
window.nsBox=function(){const M=life(),N=NSo(M);if(!N)return;if(!(N.box>0))return toast('ไม่มีกล่องสุ่ม');N.box--;const sys=byId(N.id),t=lvT(N.lv);
 let r=Math.random()*100,ri=0;for(;ri<2;ri++){r-=BOXR[ri][2];if(r<0)break}const R=BOXR[ri];
 const P=[[()=>{const v=addXP(M,N,[10,22,45][ri]);return'⭐ '+v.replace(/^ · ⭐ /,'+')}],[()=>{pts(N,[1,3,6][ri]);return`🪙 +${[1,3,6][ri]}`}],[()=>{const v=Math.round(Math.max(3000,(+S.money||0)*[.03,.08,.2][ri]));S.money=(S.money||0)+v;return`💵 +${fmt(v)}`}],
  [()=>{const s=pk((sys.st||'int').split(','));const v=[2,5,10][ri];if(s==='int')S.int=(S.int||0)+v;else if(s==='cha')S.cha=(S.cha||0)+v;else if(s==='hp')S.maxHp=(S.maxHp||100)+v*2;else if(s==='kar')S.karma=(S.karma||0)+v;else if(s==='fame')M.fame=(M.fame||0)+v*300*(t+1);else if(s==='pow')S.power=(S.power||0)+Math.max(1,Math.round((S.power||0)*.01*v));else if(s==='joy')joy(v);else S.money=(S.money||0)+v*1000;return`${STN[s]||s} +${v}`}]];
 const got=[pk(P)[0]()];if(ri===2){got.push(P[1][0]());N.shield=1;got.push('🛡️ บัตรยกเว้นโทษ')}
 sfxS(ri?'good':'click');try{log(`🎁 เปิดกล่องสุ่มของ${E(sys.app)}: <b style="color:${R[1]}">${R[0]}</b> — ${got.join(' · ')}`,ri===2?'epic':'')}catch(e){}
 modal(`<div class="nsBoxO" style="--c:${R[1]}"><div class="bx">🎁</div><div class="rr">${R[0]}</div><div class="gg">${got.join('<br>')}</div>
  <div class="btns" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px">${N.box>0?`<button class="pbtn" onclick="nsBox()">🎁 เปิดอีก (${N.box})</button>`:'<span></span>'}<button class="gbtn" onclick="closeM();nsOpen()">กลับหน้าระบบ</button></div></div>`,'nsbox');try{render()}catch(e){}};

// ---------- 👥 ผู้ใช้ระบบในรัศมี 5 กม. ----------
function near(M,N){if(N.near&&N.near.length)return N.near;const L=SYS.filter(s=>s.id!==N.id);N.near=[0,1,2,3].map(()=>{const s=pk(L);let nm='';try{nm=anyName(Math.random()<.5?'ชาย':'หญิง')}catch(e){nm=pk(['ภูมิ','มายด์','ต้น','แพรว'])}return{n:nm,id:s.id,lv:cl(N.lv+RN(-2,2),1,10),km:(RN(4,49)/10).toFixed(1)}});return N.near}
window.nsDuel=function(){const M=life(),N=NSo(M);if(!N)return;if(N.dy===S.age)return toast('ท้าดวลได้ปีละครั้ง');N.dy=S.age;closeM();later(()=>shared(M,'rival'),200)};

// ---------- 📱 หน้าระบบ: เพิ่มส่วนใหม่ ----------
{const _o=window.nsOpen;window.nsOpen=function(){const r=_o.apply(this,arguments);try{const M=life(),N=NSo(M);const app=document.querySelector('#modal .nsApp');if(!N||!app||app.querySelector('.ns6'))return r;const sys=byId(N.id);
 const C=N.cl&&!N.cl.done?N.cl:null;const nb=near(M,N);
 const h=`<div class="ns6"><div class="row"><b>📋 เช็กลิสต์ปีนี้</b>${C?C.t.map(x=>`<div class="ck${tDone(M,N,x)?' ok':''}${x.tm?' tm':''}"><i>${tDone(M,N,x)?'✓':''}</i><span>${x.txt}${x.tm?'<small>⏱️ จำกัดเวลา · พลาด = ช็อตไฟฟ้า</small>':''}</span></div>`).join(''):'<div class="ck">เช็กลิสต์ใหม่จะมาตอนขึ้นปีใหม่</div>'}</div>
 <div class="row s6"><span>🪙 แต้ม <b>${N.sp|0}</b></span><span>🎁 กล่อง <b>${N.box|0}</b></span><span>${N.shield?'🛡️ มีบัตรยกเว้นโทษ':''}</span></div>
 <div class="btns"><button class="pbtn" onclick="nsShop()">🛒 ร้านค้าระบบ</button><button class="${N.box>0?'pbtn':'gbtn'}" ${N.box>0?'':'disabled'} onclick="nsBox()">🎁 เปิดกล่อง (${N.box|0})</button></div>
 <div class="row"><b>👥 ผู้ใช้ระบบในรัศมี 5 กม.</b>${nb.map(p=>{const s=byId(p.id);return s?`<div class="nr"><span>${s.ic}</span><div><b>${E(p.n)}</b> <small>${E(s.n)} · Lv.${p.lv} · ${p.km} กม.</small></div></div>`:''}).join('')}
 <button class="gbtn" style="width:100%;margin-top:6px" ${N.dy===S.age?'disabled':''} onclick="nsDuel()">⚔️ ${N.dy===S.age?'ท้าดวลปีนี้แล้ว':'ท้าดวลผู้ใช้ระบบ (ปีละครั้ง)'}</button></div>
 <button class="gbtn" style="width:100%;margin-top:6px" onclick="nsGuide()">❓ ระบบทำงานยังไง</button></div>`;
 const b=app.querySelector('.btns');if(b)b.insertAdjacentHTML('beforebegin',h);else app.insertAdjacentHTML('beforeend',h);const t=lvT(N.lv),hd=app.querySelector('.hd');if(hd&&!hd.querySelector('.ring')){app.style.setProperty('--tc',TC[t]);hd.classList.add('hasR');hd.insertAdjacentHTML('beforeend',`<div class="ring" style="--p:${N.lv>=10?100:Math.round(((N.lv-1)*XPL+N.xp)/(9*XPL)*100)}"><b>${N.lv}</b><small>Lv</small></div>`);hd.insertAdjacentHTML('afterend',`<div class="chips"><span style="color:${TC[t]}">${TI[t]} ขั้น${TN[t]}</span><span>「${E(sys.T[t])}」</span>${ready(N)?'<span class="hot">🎓 พร้อมสอบ</span>':''}</div>`)}}catch(e){console.error('nsys6 open',e)}return r}}

// ---------- 📱 การ์ดระบบใต้ฉาก ----------
function hud(){try{const M=life(),N=M&&M.NS;const fd=document.getElementById('feed'),h=fd&&fd.parentElement;let c=document.getElementById('nsHud');
 if(!N||!N.on||!h||wOf(M)!=='normal'&&!M.kid){if(c)c.remove();return}const sys=byId(N.id);if(!sys){if(c)c.remove();return}const t=lvT(N.lv);
 const C=N.cl&&!N.cl.done?N.cl:null,n=C?C.t.filter(x=>tDone(M,N,x)).length:0;
 const tags=[ready(N)?'🎓 พร้อมสอบ':'',N.box>0?`🎁 ${N.box}`:'',(N.sp|0)?`🪙 ${N.sp}`:'',C?`📋 ${n}/3`:''].filter(Boolean).join(' · ');
 const html=`<span class="hI">${sys.ic}</span><div class="hB"><div class="hT"><b>${E(sys.n)}</b> <em style="color:${TC[t]}">${TI[t]} ${TN[t]} · Lv.${N.lv}</em></div><div class="hX"><i style="width:${N.lv>=10?100:N.xp/XPL*100}%"></i></div><small>${tags||'แตะเพื่อเปิดแอป'}</small></div><span class="hG">›</span>`;
 if(!c){c=document.createElement('div');c.id='nsHud';c.onclick=()=>{try{nsOpen()}catch(e){}}}if(c.nextSibling!==fd)h.insertBefore(c,fd);
 if(c._h!==html){c._h=html;c.innerHTML=html}}catch(e){}}
if(typeof render==='function'){const _r=render;render=function(){const r=_r.apply(this,arguments);hud();return r}}

// ---------- 👁️ ตัวเฝ้าดู: ได้ระบบ · เลเวลอัป · เลื่อนขั้น · พร้อมสอบ ----------
let WK='',WP=null;
function watch(){try{const M=life();if(!M){WP=null;return}const N=M.NS;const key=(S.name||'')+'|'+(M.y0||'')+'|'+(S._lid||'');if(key!==WK){WK=key;WP=null}
 if(!N||!N.on){WP=null;return}const sys=byId(N.id);if(!sys)return;
 if(!N._an){if(Math.abs((S.age|0)-(N.y0|0))>1){N._an=1;N._lv=N.lv;return}if(busy())return;N._an=1;N._lv=N.lv;N._rd=ready(N)?1:0;N.box=N.box|0;
  installFx(sys,()=>whenFree(()=>guide(sys,true)));try{bookAll(sys)}catch(e){}if(!N.cl)newList(M,N);return}
 if(N._lv==null)N._lv=N.lv;
 if(N.lv>N._lv){const d=N.lv-N._lv,oldT=lvT(N._lv);N._lv=N.lv;N.box=(N.box|0)+d;
  if(lvT(N.lv)>oldT){tierFx(sys,lvT(N.lv));push(sys.ic,`เลื่อนขั้น${TN[lvT(N.lv)]}!`,`ได้ฉายา「${E(sys.T[lvT(N.lv)])}」 · 🎁 +${d}`)}
  else{lvFx(sys,N.lv);push(sys.ic,`LEVEL UP → Lv.${N.lv}`,`ได้กล่องสุ่ม 🎁 ${d} กล่อง · แตะเพื่อเปิด`)}}
 else if(N.lv<N._lv)N._lv=N.lv;
 const rd=ready(N)?1:0;if(rd&&!N._rd)push(sys.ic,'🎓 พร้อมสอบเลื่อนขั้น',`「${E(sys.X[lvT(N.lv)])}」 · แตะเพื่อเปิดแอป`);N._rd=rd;
 hud()}catch(e){console.error('nsys6 watch',e)}}
setInterval(watch,700);
function bookAll(sys){try{const g=LS.get('murim_nsguide',{})||{};g[sys.id]=1;LS.set('murim_nsguide',g)}catch(e){}}

// ---------- 📆 รายปี ----------
const sig=N=>[N.qy,N.ey,N.path,N.clue,Object.keys(N.tw||{}).length,Object.values(N.sh||{}).reduce((a,b)=>a+(+b||0),0),Object.keys(N.qd||{}).length,N.lv,N.kq,N.dy].join('|');
{const _y=mwYear;mwYear=function(){const M=S&&S.mw;let pre=null;
 try{if(M&&S.alive){const N=NSo(M);if(N&&N.cl&&!N.cl.done&&N.cl.y<S.age+1)judge(M,N);
  pre={h:+S.happy||60,m:+S.money||0,hp:(S.hp||1)/(S.maxHp||100)};}}catch(e){console.error('nsys6 pre',e)}
 const r=_y.apply(this,arguments);
 try{const M2=S&&S.mw;if(!M2||!S.alive)return r;M2.fl=M2.fl||{};const N=NSo(M2);const norm=wOf(M2)==='normal';
  // ช่อง 📱 ในหน้าสุ่มเกิด → ติดตั้งตอน 6 ขวบ
  if(window._nsBirthPick!=null){if(S.age<=1&&!M2.nsPend&&window._nsBirthPick)M2.nsPend=window._nsBirthPick;window._nsBirthPick=null}
  if(M2.nsPend&&!M2.NS&&S.age>=6&&norm){const sy=byId(M2.nsPend);delete M2.nsPend;if(sy){nsNew(M2,sy.id);try{log(`📲 <b>แท็บเล็ตเก่าของพ่อเปิดขึ้นเองกลางดึก</b> — แอปที่ติดตัวคุณมาตั้งแต่เกิดเพิ่งตื่น: <b>${E(sy.app)}</b>`,'myth',true)}catch(e){}kAdd(`ได้รับ${sy.app} (ติดตัวมาตั้งแต่เกิด)`);return r}}
  if(!N){// 💔 ระบบมาตอนชีวิตพัง
   if(pre&&norm&&S.age>=12&&(M2.fl.nsAsk||0)<2&&!M2.fl.nsCr){const crash=(pre.h-(+S.happy||0)>=15)||(pre.m>5000&&(+S.money||0)<pre.m*.5)||((S.hp||1)/(S.maxHp||100)<.35);
    if(crash&&Math.random()<(window._nsCrRate||.15)){M2.fl.nsCr=1;later(()=>whenFree(()=>{try{log('💔 <b>คืนที่ชีวิตพังที่สุด</b> คุณนั่งมองเพดานจนตีสาม แล้วหน้าจอมือถือที่คว่ำไว้ก็สว่างขึ้นเอง…','epic',true)}catch(e){}offer(M2)}),1200)}}
   return r}
  if(N.wc)return r;
  // เช็กลิสต์ปีใหม่
  if(!N.cl||N.cl.done||N.cl.y<S.age-1)newList(M2,N);
  // เควสวัยเรียน + การันตีเหตุการณ์ระบบปีละครั้ง
  const s=sig(N);
  const a0=S.age;if(M2.kid&&S.age>=6&&N.kq!==S.age&&Math.random()<.4){N.kq=S.age;later(()=>whenFree(()=>{if(S.age!==a0||!NSo(M2))return;kidQ(M2)}),900)}
  else if(N._sg===s&&!N.lost&&!(N.lock>0)&&N._gq!==S.age){N._gq=S.age;later(()=>whenFree(()=>{const N2=NSo(M2);if(!N2||S.age!==a0||sig(N2)!==s)return;try{fire('ns_q'+((M2.y|0)%3))}catch(e){try{kidQ(M2)}catch(x){}}}),1100)}
  N._sg=s}catch(e){console.error('nsys6 year',e)}return r}}
// ลายเซ็นกิจกรรมอัปเดตหลังเลือกเสร็จ (กันนับว่าปีนั้นไม่มีเหตุการณ์)
setInterval(()=>{try{const M=life(),N=NSo(M);if(N&&!busy()&&N._sg!=null&&N._sgY!==S.age){N._sgY=S.age;N._sg=sig(N)}}catch(e){}},1500);

// ---------- 🎫 ตั๋วเรียกระบบ ----------
const TK='murim_nstk',tkG=()=>Math.max(0,LS.get(TK,0)|0),tkS=v=>{try{LS.set(TK,Math.max(0,v|0))}catch(e){}};
window.nsSummon=function(){const M=life();if(!M||M.NS||wOf(M)!=='normal'||S.age<5)return toast('ใช้ได้ในโลกปกติ อายุ 5 ปีขึ้นไป และยังไม่มีระบบ');if(tkG()<1)return toast('ไม่มีตั๋วเรียกระบบ');tkS(tkG()-1);closeM();M.fl=M.fl||{};M.fl.nsAsk=0;
 try{log('🎫 คุณกดใช้ตั๋วเรียกระบบ มือถือสั่นสามครั้ง…','epic')}catch(e){}later(()=>offer(M),300)};
if(typeof openMenu==='function'){const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const M=life();if(M&&!M.NS&&wOf(M)==='normal'&&tkG()>0){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.nsTk'))g.insertAdjacentHTML('afterbegin',`<button class="opt nsTk" onclick="nsSummon()">🎫 ใช้ตั๋วเรียกระบบ<small>มีอยู่ ${tkG()} ใบ · เลือกระบบได้ 1 จาก 3</small></button>`)}}catch(e){}return r}}

// ---------- 🏆 หอเกียรติยศระบบ · การ์ดเรื่องสั้น · ตั๋วตอนจบชีวิต ----------
const HK='murim_nshall';
if(typeof endGame==='function'){const _eg=endGame;endGame=function(){let tkMsg='';try{const M=S&&S.mw,N=M&&M.NS;
  if(N&&!N._hl){N._hl=1;const sys=byId(N.id);if(sys){kAdd(`📱 ${sys.app} · Lv.${N.lv} 「${sys.T[lvT(N.lv)]}」`);const H=LS.get(HK,{})||{},o=H[sys.id];if(!o||N.lv>o.lv)H[sys.id]={lv:N.lv,n:S.name,a:S.age,t:Date.now()};LS.set(HK,H)}}
  if(M&&!M._tk&&(S.age|0)>=18&&wOf(M)==='normal'){M._tk=1;let g=0;if(Math.random()<.25)g++;if(N&&N.lv>=10)g++;if(g){tkS(tkG()+g);tkMsg=`🎫 ได้ตั๋วเรียกระบบ ${g} ใบ (ใช้ได้ในชีวิตยุคปัจจุบันถัดไป จาก ☰ เมนู)`}}}catch(e){}
 const r=_eg.apply(this,arguments);if(tkMsg)setTimeout(()=>{try{toast(tkMsg)}catch(e){}},1500);return r}}
{const _b=window.nsBook;if(typeof _b==='function')window.nsBook=function(){const r=_b.apply(this,arguments);try{const m=document.querySelector('#modal .nsBk');if(m&&!document.querySelector('#modal .nsHall')){const H=LS.get(HK,{})||{};const L=Object.keys(H).map(k=>[byId(k),H[k]]).filter(x=>x[0]).sort((a,b)=>b[1].lv-a[1].lv);
 m.insertAdjacentHTML('afterend',`<div class="nsHall"><h4 style="margin:12px 0 6px">🏆 หอเกียรติยศระบบ (สถิติดีที่สุดของคุณ)</h4>${L.length?L.map(([s,h])=>`<div class="row" style="background:#ffffff0d;border-radius:10px;padding:6px 9px;margin:4px 0">${s.ic} <b>${E(s.n)}</b> · Lv.${h.lv} 「${E(s.T[lvT(h.lv)])}」 <small class="tag2">— ${E(h.n)} อายุ ${h.a}</small></div>`).join(''):'<p class="tag2">ยังไม่มีสถิติ จบชีวิตที่มีระบบแล้วจะบันทึกที่นี่</p>'}<p class="tag2">🎫 ตั๋วเรียกระบบที่มี: <b>${tkG()}</b> · ได้จากการจบชีวิตยุคปัจจุบัน (อายุ 18+ มีโอกาส 25%) และพาระบบถึงขั้นเทพ</p></div>`)}}catch(e){}return r}}

// ---------- 🎲 ช่อง 📱 ระบบ ในหน้าสุ่มเกิดยุคปัจจุบัน (โอกาส 5% · ล็อกได้ด้วยตั๋วล็อก) ----------
function birthTile(){try{const M=window._mbGet&&window._mbGet(),o=document.getElementById('mwB');if(!M||!o)return;if(!M.rnd){window._nsBirthPick=null;return}
 const key=[M.name,M.pv,M.bg,M.rr,M.wld].join('|');if(key!==M._nsK){M._nsK=key;if(!(M.lock&&M.lock.sys))M.nsys=Math.random()<(window._nsBirthRate||.05)?pk(SYS).id:''}
 window._nsBirthPick=M.nsys&&M.wld==='normal'?M.nsys:'';
 const sy=M.nsys?byId(M.nsys):null;const g=o.querySelector('.mbGrid');if(!g)return;let t=o.querySelector('.mbT_sys');
 const html=`<div class="mbTh"><span>📱 ระบบ</span></div><div class="mbTv">${sy?`${sy.ic} ${E(sy.app)}`:'ไม่มี'}</div><div class="mbTs">${sy?(M.wld==='normal'?'แอปจะตื่นตอนอายุ 6 ขวบ':'⚠️ ทำงานเฉพาะโลกปกติ'):'โอกาสราว 5% ต่อการสุ่ม · มีระบบแล้วล็อกไว้ได้'}</div>`;
 if(!t){t=document.createElement('div');t.className='mbT mbWide mbT_sys'+(sy?' nsOn':'');const w=o.querySelector('.mbWr');if(w&&w.nextSibling)g.insertBefore(t,w.nextSibling);else g.appendChild(t)}
 t.className='mbT mbWide mbT_sys'+(sy?' nsOn':'');if(t._h!==html){t._h=html;const lk=t.querySelector('.mbLk');t.innerHTML=html;if(lk)t.querySelector('.mbTh').appendChild(lk)}}catch(e){console.error('nsys6 tile',e)}}
{const _h=window._mbHook;window._mbHook=function(){const r=_h?_h.apply(this,arguments):undefined;setTimeout(birthTile,0);setTimeout(birthTile,40);return r}}

// ---------- สไตล์ ----------
const css=document.createElement('style');css.textContent=`
#nsPush{position:fixed;left:50%;top:10px;transform:translate(-50%,-140%);z-index:100000;width:min(92vw,380px);display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:18px;background:rgba(28,32,44,.92);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);color:#eef3ff;box-shadow:0 10px 30px rgba(0,0,0,.45);border:1px solid #ffffff1f;transition:transform .38s cubic-bezier(.2,.9,.3,1.2);cursor:pointer}
#nsPush.on{transform:translate(-50%,0)}#nsPush .pI{font-size:28px;width:40px;height:40px;border-radius:10px;background:#3a86ff33;display:flex;align-items:center;justify-content:center;flex:none}
#nsPush .pB{flex:1;min-width:0}#nsPush .pH{display:flex;justify-content:space-between;font-size:13px}#nsPush .pH span{opacity:.6;font-size:11px}#nsPush .pT{font-size:12.5px;opacity:.88;line-height:1.35;margin-top:1px}
#nsFx{position:fixed;inset:0;z-index:99990;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,#0d1b2aee,#000000f2);animation:nsIn .3s ease;overflow:hidden}#nsFx.out{animation:nsOut .38s ease forwards}
#nsFx .fxSk{position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#ffffff66;font-size:12px}
@keyframes nsIn{from{opacity:0}to{opacity:1}}@keyframes nsOut{to{opacity:0}}
#nsFx .phone{width:210px;height:380px;border-radius:30px;border:6px solid #2b3445;background:#05080d;position:relative;box-shadow:0 0 60px #3a86ff55;animation:nsPh 3.9s ease}
#nsFx .phone.ch{box-shadow:0 0 70px #a050ffaa;border-color:#3a1f55}#nsFx .phone.pg{box-shadow:0 0 70px #ffd98a88;border-color:#4a3a1f}
@keyframes nsPh{0%{transform:scale(.6) rotate(-8deg);opacity:0}12%{transform:scale(1.04);opacity:1}18%{transform:scale(1)}100%{transform:scale(1)}}
#nsFx .scr{position:absolute;inset:10px;border-radius:20px;overflow:hidden;background:linear-gradient(#0b1422,#05080d);display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:monospace}
#nsFx .boot p{margin:6px 0;color:#7cf0c9;font-size:12px;opacity:0;animation:nsTy .4s ease forwards}#nsFx .ch .boot p{color:#c79bff}#nsFx .pg .boot p{color:#ffd98a}
@keyframes nsTy{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
#nsFx .app{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:#05080d;opacity:0;animation:nsAp .6s ease forwards;text-align:center;padding:10px;color:#fff}
#nsFx .app .aic{font-size:64px;animation:nsPop .7s cubic-bezier(.2,1.6,.4,1) both;animation-delay:inherit;filter:drop-shadow(0 0 14px #3a86ff)}#nsFx .app b{font-size:15px}#nsFx .app small{color:#7cf0c9;font-size:11px}
@keyframes nsAp{to{opacity:1}}@keyframes nsPop{0%{transform:scale(0)}100%{transform:scale(1)}}
#nsFx .rays{position:absolute;width:900px;height:900px;background:conic-gradient(from 0deg,#3a86ff00,#3a86ff22,#3a86ff00 20%,#3a86ff22 40%,#3a86ff00 60%,#3a86ff22 80%,#3a86ff00);animation:nsSp 8s linear infinite;z-index:-1;opacity:.7}
#nsFx .runes{position:absolute;top:14%;left:0;right:0;text-align:center;color:#c79bff;font-size:26px;letter-spacing:6px;text-shadow:0 0 12px #a050ff;animation:nsTy 1s ease}
#nsFx .pages i{position:absolute;width:120px;height:160px;background:#fff3d6;border-radius:4px;top:50%;left:50%;opacity:.0;animation:nsPg 2.4s ease infinite}#nsFx .pages i:nth-child(2){animation-delay:.6s}#nsFx .pages i:nth-child(3){animation-delay:1.2s}
@keyframes nsPg{0%{opacity:.5;transform:translate(-160%,-50%) rotate(-20deg)}100%{opacity:0;transform:translate(80%,-90%) rotate(40deg)}}
@keyframes nsSp{to{transform:rotate(360deg)}}
#nsFx.lvup{background:radial-gradient(circle,#3a86ff44,#000000c0)}#nsFx .lvB{text-align:center;color:#fff;animation:nsPop .5s cubic-bezier(.2,1.6,.4,1)}#nsFx .lvB span{font-size:56px;display:block}#nsFx .lvB b{display:block;font:900 42px/1 monospace;letter-spacing:3px;color:#ffe08a;text-shadow:0 0 18px #ffb040}#nsFx .lvB em{font-style:normal;font-size:22px;color:#8ecae6}
#nsFx.tier .tierB{text-align:center;color:#fff;animation:nsPop .7s cubic-bezier(.2,1.6,.4,1)}#nsFx .tierB small{opacity:.7}#nsFx .tierB .tI{font-size:80px;filter:drop-shadow(0 0 24px var(--c))}#nsFx .tierB b{display:block;font-size:34px;color:var(--c);text-shadow:0 0 18px var(--c)}#nsFx .tierB em{font-style:normal;font-size:20px}
#nsHud{display:flex;align-items:center;gap:9px;margin:6px 0;padding:7px 10px;border-radius:14px;background:linear-gradient(90deg,#0d1b2a,#13233a);border:1px solid #3a86ff66;color:#e6f0ff;cursor:pointer;box-shadow:inset 0 0 14px #3a86ff22}
#nsHud .hI{font-size:26px;filter:drop-shadow(0 0 6px #3a86ff)}#nsHud .hB{flex:1;min-width:0}#nsHud .hT{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#nsHud .hT em{font-style:normal;font-size:11.5px}
#nsHud .hX{height:5px;border-radius:3px;background:#ffffff14;overflow:hidden;margin:3px 0 2px}#nsHud .hX i{display:block;height:100%;background:linear-gradient(90deg,#3a86ff,#8ecae6)}#nsHud small{font-size:11px;opacity:.8}#nsHud .hG{opacity:.5;font-size:20px}
.nsApp .ck{font-size:12.5px;padding:2px 0}.nsApp .ck.ok{color:#7de38a}.nsApp .s6{display:flex;gap:12px;flex-wrap:wrap}.nsApp .nr{display:flex;gap:8px;align-items:center;padding:3px 0}.nsApp .nr span{font-size:20px}.nsApp .nr small{opacity:.7}
.nsApp .shR{display:flex;justify-content:space-between;align-items:center;gap:8px}.nsApp .shR button{flex:none;min-width:64px}
.nsG .gT{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:6px 0}.nsG .gT div{text-align:center;background:#ffffff0d;border-radius:8px;padding:4px 2px;font-size:12px}.nsG .gT small{display:block;color:#c9d6e0;font-size:10.5px;line-height:1.3}
.nsBoxO{text-align:center;padding:10px 4px}.nsBoxO .bx{font-size:72px;animation:nsBx .8s ease}.nsBoxO .rr{font-size:26px;font-weight:900;color:var(--c);text-shadow:0 0 14px var(--c);margin:4px 0}.nsBoxO .gg{font-size:15px;line-height:1.7}
@keyframes nsBx{0%{transform:scale(.6) rotate(-10deg)}40%{transform:scale(1.15) rotate(8deg)}70%{transform:rotate(-6deg)}100%{transform:none}}
#mwB .mbT_sys.nsOn{border-color:#3a86ff;box-shadow:0 0 14px #3a86ff55}
#modal[data-k^="ns"]{background:linear-gradient(180deg,#0b1424,#070b14)!important;border:1.5px solid #3a86ff55!important;color:#e6f0ff!important;box-shadow:0 20px 60px #000a,0 0 40px #3a86ff22!important}
#modal[data-k^="ns"] h3{color:#e6f0ff!important;border-color:#3a86ff44!important;letter-spacing:.3px}
#modal[data-k^="ns"] .xbtn{background:#ffffff12!important;color:#e6f0ff!important;border-color:#ffffff22!important}
#modal[data-k^="ns"] .tag2{color:#a9b8cc!important}
.nsApp{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;--tc:#3a86ff}
.nsApp .hd{position:relative;overflow:hidden;background:linear-gradient(135deg,color-mix(in srgb,var(--tc) 30%,#0d1b2a),#0d1b2a 70%);border:1px solid color-mix(in srgb,var(--tc) 45%,transparent);border-radius:20px;padding:14px;box-shadow:0 8px 24px #0006,inset 0 1px 0 #ffffff14}
.nsApp .hd:after{content:"";position:absolute;right:-40px;top:-40px;width:140px;height:140px;border-radius:50%;background:radial-gradient(color-mix(in srgb,var(--tc) 35%,transparent),transparent 70%)}
.nsApp .hd .ic{font-size:42px}.nsApp .hd .nm{font-size:18px;font-weight:800}.nsApp .hd .tt{font-size:12px;opacity:.75;line-height:1.45}
.nsApp .hd.hasR{padding-right:84px}.nsApp .ring{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:62px;height:62px;border-radius:50%;background:conic-gradient(var(--tc) calc(var(--p)*1%),#ffffff14 0);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1}
.nsApp .ring:before{content:"";position:absolute;inset:5px;border-radius:50%;background:#0d1b2a}.nsApp .ring b,.nsApp .ring small{position:relative}.nsApp .ring b{font-size:22px;line-height:1}.nsApp .ring small{font-size:10px;opacity:.7}
.nsApp .chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 2px}.nsApp .chips span{font-size:12px;padding:3px 10px;border-radius:20px;background:#ffffff10;border:1px solid #ffffff1a}.nsApp .chips .hot{background:#ffcf3a22;color:#ffd96a;border-color:#ffcf3a66;animation:nsGl 1.6s ease-in-out infinite}
@keyframes nsGl{50%{box-shadow:0 0 12px #ffcf3a88}}
.nsApp .tiers div{border-radius:12px!important;background:#ffffff08!important;padding:6px 2px!important}.nsApp .tiers div.on{background:color-mix(in srgb,currentColor 14%,transparent)!important}
.nsApp .bar{height:8px!important;background:#ffffff12!important}.nsApp .bar>i{background:linear-gradient(90deg,var(--tc),#8ecae6)!important;box-shadow:0 0 10px var(--tc)}
.nsApp .row{background:#ffffff08!important;border:1px solid #ffffff12;border-radius:16px!important;padding:10px 12px!important;margin:7px 0!important}
.nsApp .row>b:first-child{display:block;font-size:13.5px;margin-bottom:4px;color:#cfe2ff}
.nsApp .ck{display:flex;gap:9px;align-items:flex-start;padding:7px 8px;margin:4px 0;border-radius:12px;background:#ffffff08;font-size:13px}
.nsApp .ck i{flex:none;width:20px;height:20px;border-radius:50%;border:2px solid #ffffff44;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:900}
.nsApp .ck.ok{background:#5fd47a14}.nsApp .ck.ok i{background:#5fd47a;border-color:#5fd47a;color:#06210f}.nsApp .ck.tm{border:1px solid #ff8a5a55}.nsApp .ck small{display:block;color:#ff9a70;font-size:11px;margin-top:1px}
.nsApp .s6{justify-content:space-around;text-align:center}.nsApp .s6 span{font-size:13px}.nsApp .s6 b{font-size:17px;color:#ffe08a}
.nsApp .pbtn,.nsApp .gbtn,#modal[data-k^="ns"] .pbtn,#modal[data-k^="ns"] .gbtn{border-radius:14px!important;padding:10px 8px!important;font-size:14px!important;font-weight:700;min-height:44px;line-height:1.25;transition:transform .12s}
.nsApp .pbtn,#modal[data-k^="ns"] .pbtn{background:linear-gradient(135deg,#3a86ff,#7c5cff)!important;color:#fff!important;border:0!important;box-shadow:0 6px 18px #3a86ff55!important;text-shadow:none!important}
.nsApp .gbtn,#modal[data-k^="ns"] .gbtn{background:#ffffff10!important;color:#e6f0ff!important;border:1px solid #ffffff22!important;box-shadow:none!important}
.nsApp .pbtn:active,.nsApp .gbtn:active{transform:scale(.97)}.nsApp button:disabled{opacity:.45}
.nsApp .nr{padding:6px 4px!important;border-bottom:1px solid #ffffff0d}.nsApp .nr:last-of-type{border-bottom:0}.nsApp .nr span{width:34px;height:34px;border-radius:10px;background:#ffffff0d;display:flex;align-items:center;justify-content:center}
.nsApp .shR b{font-size:14px}.nsApp .shR small{opacity:.75}
.nsBk div{background:#ffffff0a!important;border:1px solid #ffffff12;border-radius:14px!important}
`;document.head.appendChild(css);
window._nsys6={push,guide,newList,judge,kidQ,addXP,watch,birthTile,hud};
})();
try{wReady('nsys6')}catch(e){}
