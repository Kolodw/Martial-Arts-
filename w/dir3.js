// ============================================================
// /w/dir3.js 🎲 ชั้นเหตุการณ์ + ข้ามโลก + โลกทับซ้อน (โหลดต่อจาก dir2.js · ทุกโลก ทุกโหมด)
//  ก) ครอบทุกตัวเลือกในเกม (ยกเว้นพีคของผู้ลิขิตและเส้นเรื่อง):
//     ตัวแปรของเรื่อง · ปีพิเศษ · ผลไม่ตายตัว (พลิกผล) · ตัวเลือกตามตัวตน · นิสัยสะสม · จังหวะที่สอง · จับเวลา · ผลของโหมด
//  ข) คนรอบตัวมีแผนของตัวเอง (เพื่อน คู่ปรับ พี่น้อง คู่สมรส ลูก แขกต่างโลก)
//  ค) ข้ามโลกได้ทุกโลก: สลับร่างชั่วคราว · ของจากต่างโลก · แขกต่างโลก · จดหมายจากตัวเองอีกโลก · แรงต้านของโลก · ความรู้ข้ามโลก
//  ง) โลกทับซ้อนทุกคู่ (13 โลก) 3 ระยะ: รอยรั่ว → ทับซ้อน → หลอมรวม/แยกขาด · คู่ประจำสัปดาห์ร่วมกันทั้งเว็บ · โหวต ?a=ovv / ?a=ovg
// ============================================================
(function(){
const DR=window._dir;if(!DR)return;
const {cx,wk,rp,rnd,E,fx,mkOpt,apply,omenLine,busy,stat,strip}=DR.H;
const age=()=>S.age|0;
const D_=()=>{try{return DR.init()}catch(e){return null}};
const skipT=t=>/ผู้ลิขิต|เส้นเรื่อง:|มินิเกม|ด่านที่|บทสอน/.test(strip(t||''));
const chance=p=>Math.random()<p;

// =====================================================================
// โลกทั้งหมด (โลกหลัก 7 + โลกย่อยยุคปัจจุบัน 6) — ใช้ทั้งข้ามโลกและทับซ้อน
// =====================================================================
const WEL={
 murim:{n:'ยุทธภพ',ic:'⚔️',ppl:['จอมยุทธ์พเนจร','ศิษย์สำนักมาร','ขุนนางถือตราประทับ'],pw:'วรยุทธ์',plc:['โรงเตี๊ยมริมทาง','ลานฝึกของสำนัก','ตลาดในเมือง'],thr:['โจรภูเขาทั้งกลุ่ม','มือสังหารสำนักมาร','ยอดฝีมือคลั่งวิชา'],obj:['คัมภีร์ลมปราณ','กระบี่เก่าสนิมเขรอะ','ยาลูกกลอนเพิ่มพลัง'],mg:'strike'},
 loop:{n:'โลกผู้ย้อนกาล',ic:'🔁',ppl:['คนที่จำอนาคตได้','ชายที่ตายมาแล้วเก้าครั้ง','เด็กที่พูดถึงพรุ่งนี้เหมือนเมื่อวาน'],pw:'ความทรงจำจากรอบก่อน',plc:['ทางแยกเดิม','โรงเตี๊ยมที่ทุกอย่างเริ่มต้น','บ้านที่เคยไหม้ในรอบก่อน'],thr:['วันที่ทุกอย่างพังซ้ำ','คนที่อยากหยุดวงวน','ความทรงจำที่เริ่มเลือนหาย'],obj:['สมุดบันทึกจากรอบก่อน','นาฬิกาที่เดินถอยหลัง','จดหมายที่ยังไม่ถูกเขียน'],mg:'future'},
 xian:{n:'โลกเทพเซียน',ic:'☁️',ppl:['เซียนชราขี่กระเรียน','ศิษย์นิกายที่หลงทาง','ภูตจิ้งจอกเก้าหาง'],pw:'พลังบ่มเพาะ',plc:['ถ้ำบ่มเพาะ','ยอดเขาเมฆ','ตลาดเซียน'],thr:['ทัณฑ์สวรรค์หลงทาง','ปีศาจพันปี','เซียนมารกลืนวิญญาณ'],obj:['หินวิญญาณ','น้ำเต้าเก็บลมปราณ','ยันต์ทองคำ'],mg:'trib'},
 mw:{n:'ยุคปัจจุบัน',ic:'🏙️',ppl:['พนักงานออฟฟิศที่หลงทาง','ไรเดอร์ส่งอาหาร','ยูทูบเบอร์ถือกล้อง'],pw:'ความรู้สมัยใหม่',plc:['ร้านสะดวกซื้อ','รถไฟฟ้า','คอนโดชั้นยี่สิบ'],thr:['รถบรรทุกเบรกแตก','แก๊งทวงหนี้','ข่าวปลอมที่ลามทั้งเมือง'],obj:['สมาร์ตโฟนที่แบตใกล้หมด','ยาแก้ปวด','ไฟฉาย'],mg:'typing'},
 soul:{n:'โลกจิตวิญญาณยุทธ์',ic:'⭕',ppl:['ปรมาจารย์วิญญาณ','นักล่าวงแหวน','เด็กที่วิญญาณยุทธ์เพิ่งตื่น'],pw:'วิญญาณยุทธ์',plc:['ป่าวิญญาณ','สถาบัน','ลานประลองวิญญาณ'],thr:['สัตว์วิญญาณหมื่นปี','ทีมล่าที่ทรยศ','วงแหวนที่คลั่ง'],obj:['กระดูกวิญญาณ','วงแหวนแตกร้าว','หญ้าเซียนหลายสี'],mg:'drum'},
 beast:{n:'โลกสัตว์อสูร',ic:'🐾',ppl:['หมาป่าที่พูดภาษาคนได้','จ่าฝูงชรา','จิ้งจอกขี้สงสัย'],pw:'พลังอสูร',plc:['ถ้ำลึก','ลำธารกลางป่า','ทุ่งหญ้าคืนเพ็ญ'],thr:['ฝูงพรานถือคบไฟ','อสูรต่างถิ่น','ไฟป่า'],obj:['เขี้ยวอสูร','แก่นอสูร','ขนวิเศษ'],mg:'pounce'},
 sky:{n:'ทะลุฟ้าดารา',ic:'🌠',ppl:['นักล่ายีน','ทหารกำแพง','ผู้ลี้ภัยนอกกำแพง'],pw:'พลังยีน',plc:['นครกำแพง','หลุมอุกกาบาต','ตลาดมืดใต้กำแพง'],thr:['ฝูงอสูรกลายพันธุ์','เศษดาวตก','ยีนที่คลั่ง'],obj:['แก่นดาว','เข็มฉีดยีน','ชิปของหน่วยล่า'],mg:'dmMeteor'},
 hunter:{n:'โลกฮันเตอร์',ic:'🌀',ppl:['ฮันเตอร์แรงก์ S','ผู้ตื่นพลังมือใหม่','เจ้าหน้าที่สมาคม'],pw:'ค่าสถานะฮันเตอร์',plc:['หน้าเกต','สมาคมฮันเตอร์','ดันเจี้ยนชั้นใต้ดิน'],thr:['เกตแตก','บอสดันเจี้ยน','ฮันเตอร์สายมืด'],obj:['คริสตัลมานา','ดาบแรงก์ A','ใบอนุญาตฮันเตอร์'],mg:'huGate'},
 zombie:{n:'โลกซอมบี้',ic:'🧟',ppl:['ผู้รอดชีวิตถือขวาน','หมอที่ยังไม่ติดเชื้อ','เด็กที่หลงฝูง'],pw:'สัญชาตญาณเอาตัวรอด',plc:['ซูเปอร์ร้าง','หลังคาโรงพยาบาล','ด่านทหาร'],thr:['ฝูงซอมบี้','คนที่ถูกกัดแต่ซ่อนไว้','กลุ่มปล้นเสบียง'],obj:['วัคซีนทดลอง','กระป๋องอาหาร','วิทยุสื่อสาร'],mg:'zbRun'},
 ghost:{n:'โลกผีไทย',ic:'👻',ppl:['หมอผีประจำหมู่บ้าน','แม่นาคที่ยังรอ','กุมารทองหลงทาง'],pw:'วิชาอาคม',plc:['ศาลพระภูมิ','ต้นตะเคียน','วัดร้าง'],thr:['ผีตายโหง','กระสือ','คุณไสยที่ส่งมา'],obj:['ตะกรุด','น้ำมนต์','ผ้ายันต์'],mg:'ghChant'},
 tower:{n:'โลกหอคอย',ic:'🏰',ppl:['นักไต่หอคอย','ผู้คุมชั้น','คนที่ลงมาจากชั้นบนสุด'],pw:'พรจากหอคอย',plc:['ชั้นแรกของหอคอย','ลานพักระหว่างชั้น','ประตูชั้นถัดไป'],thr:['ผู้คุมชั้นคลั่ง','กับดักของหอคอย','นักไต่ที่ฆ่าคนแย่งที่'],obj:['กุญแจชั้น','ม้วนพร','เหรียญหอคอย'],mg:'twBoss'},
 game:{n:'โลกระบบเกม',ic:'🎮',ppl:['ผู้เล่นที่ติดอยู่ในเกม','NPC ที่รู้ตัว','ผู้ดูแลระบบ'],pw:'หน้าต่างสถานะ',plc:['หมู่บ้านเริ่มต้น','กิลด์','จุดเกิดใหม่'],thr:['บั๊กที่กินผู้เล่น','บอสโลก','ผู้เล่นโกง'],obj:['ยาฟื้นพลัง','ไอเทมระดับตำนาน','ม้วนวาร์ป'],mg:'twCombo'},
 doom:{n:'โลกวันสิ้นโลก',ic:'☄️',ppl:['ผู้รอดในหลุมหลบภัย','นักดาราศาสตร์ที่ไม่มีใครฟัง','ทหารคนสุดท้าย'],pw:'ใจที่ยังไม่ยอมแพ้',plc:['หลุมหลบภัย','เมืองร้าง','หอดูดาว'],thr:['อุกกาบาตลูกถัดไป','ฝุ่นพิษ','คนที่หมดหวัง'],obj:['หน้ากากกรองอากาศ','เมล็ดพันธุ์สุดท้าย','แผนที่หลุมหลบภัย'],mg:'dmShare'}};
const WLIST=Object.keys(WEL);
const curW=()=>{try{const w=wk();if(w==='mw'&&S.mw){const M=S.mw;if(M.hw>0)return'hunter';if(M.wx&&M.wx.on&&WEL[M.wx.id])return M.wx.id}return w}catch(e){return'murim'}};
const others=a=>WLIST.filter(x=>x!==a&&!(a==='murim'&&x==='loop')&&!(a==='loop'&&x==='murim'));
const pick=(a,i)=>a[(i==null?Math.floor(Math.random()*a.length):i)%a.length];

// =====================================================================
// ก) ชั้นเหตุการณ์ — วัดผลก่อน/หลังตัวเลือก แล้วปรับตามตัวแปร ปีพิเศษ โหมด นิสัย
// =====================================================================
const KS=['power','qi','money','fame','karma','hp','int','cha'];
const LB={power:'⚡ พลัง',qi:'🌀 ปราณ',money:'💰 เงิน',mwm:'💰 เงิน',fame:'⭐ ชื่อเสียง',karma:'☯ กรรม',hp:'❤️ พลังชีวิต',int:'🧠 ปัญญา',cha:'💬 เสน่ห์'};
function snap(){const o={};KS.forEach(k=>{if(typeof S[k]==='number')o[k]=S[k]});try{if(S.mw&&typeof S.mw.money==='number')o.mwm=S.mw.money}catch(e){}return o}
function delta(a){const b=snap(),d={};for(const k in a){if(b[k]!=null&&Math.abs(b[k]-a[k])>1e-9)d[k]=b[k]-a[k]}return d}
function addK(k,v){if(!v||!isFinite(v))return;if(k==='mwm'){S.mw.money=Math.max(0,S.mw.money+Math.round(v));return}if(typeof S[k]!=='number')return;S[k]+=k==='qi'?+v.toFixed(2):Math.round(v);if(k==='hp')S.hp=Math.max(1,Math.min(S.maxHp||S.hp,S.hp));if(k==='money')S.money=Math.max(0,S.money)}
// ปรับผลตามกฎ: fn(k,v) คืนค่าใหม่ → คืนข้อความสรุปการเปลี่ยน
function remap(d,fn){const ch=[];for(const k in d){const v=d[k];let nv=v;try{nv=fn(k,v)}catch(e){}if(nv===v||!isFinite(nv))continue;const diff=nv-v;if(Math.abs(diff)<(k==='qi'?.05:1))continue;addK(k,diff);ch.push(`${LB[k]||k} ${diff>0?'+':''}${k==='qi'?diff.toFixed(1):Math.round(diff).toLocaleString()}`)}return ch}
const isM=k=>k==='money'||k==='mwm';

// ---------- ตัวแปรของเรื่อง ----------
function knownName(){const L=[];try{if(S.spouse&&typeof S.spouse==='string')L.push(S.spouse)}catch(e){}try{peers.filter(p=>p&&p.alive).slice(0,4).forEach(p=>L.push(p.name))}catch(e){}try{(S.sibs||[]).filter(x=>x.alive&&x.born&&x.n).forEach(x=>L.push(x.n))}catch(e){}try{const D=S._dr;if(D&&D.nem&&D.nem.alive)L.push(D.nem.n)}catch(e){}return L.length?rp(L):null}
const VARS=[
 {ic:'🌧️',t:'ฝนตกหนักทั้งวัน ทุกอย่างยากขึ้น',f:(k,v)=>v<0?v*1.4:v},
 {ic:'👀',t:n=>`${n?`<b>${E(n)}</b> `:'มีคน'}เห็นทุกอย่างกับตา — ชื่อเสียงและกรรมแรงเป็นสองเท่า`,f:(k,v)=>k==='fame'||k==='karma'?v*2:v,n:1},
 {ic:'💰',t:'เดิมพันสูงกว่าที่คิด — ได้มากเสียมาก',f:(k,v)=>v*1.6},
 {ic:'🌙',t:'เกิดกลางดึก ไม่มีใครเห็น — ชื่อเสียงไม่ขยับ',f:(k,v)=>k==='fame'?0:k==='karma'?v*1.5:v},
 {ic:'🍀',t:'วันนี้ฟ้าเข้าข้าง — เรื่องร้ายเบาลงครึ่งหนึ่ง',f:(k,v)=>v<0?v*.5:v},
 {ic:'🤕',t:'คุณยังเจ็บจากเรื่องก่อน — เสียแรงมากกว่าปกติ',f:(k,v)=>k==='hp'&&v<0?v*1.6:k==='power'&&v>0?v*.7:v},
 {ic:'🎭',t:'มีคนจัดฉากเรื่องนี้ไว้ — ผลอาจไม่ใช่อย่างที่เห็น',flip:.35}];
const WVARS={mw:{ic:'📱',t:'มีคนไลฟ์อยู่ — ทั้งประเทศเห็น',f:(k,v)=>k==='fame'?v*2.5:v},sky:{ic:'🧱',t:'เกิดใกล้กำแพง ทหารจับตาอยู่',f:(k,v)=>k==='karma'?v*1.5:k==='fame'?v*1.3:v},xian:{ic:'☯️',t:'ฟ้ากำลังจับตา — กรรมแรงเป็นสองเท่า',f:(k,v)=>k==='karma'?v*2:v},beast:{ic:'🌕',t:'คืนเพ็ญ — พลังอสูรพลุ่งพล่าน',f:(k,v)=>k==='power'&&v>0?v*1.5:v},soul:{ic:'⭕',t:'วงแหวนของคุณสั่นไม่หยุด',f:(k,v)=>k==='power'?v*1.4:v},loop:{ic:'🔁',t:'รอบนี้ไม่เหมือนรอบก่อน',flip:.3},murim:{ic:'🍶',t:'คนทั้งโรงเตี๊ยมกำลังฟังอยู่',f:(k,v)=>k==='fame'?v*1.8:v}};
// ---------- ปีพิเศษ ----------
const YR={
 _:[{k:'drought',ic:'🏜️',n:'ปีแล้ง',om:'ลมร้อนพัดไม่หยุด บ่อน้ำหลายบ่อเริ่มแห้ง',f:(k,v)=>isM(k)&&v>0?v*.6:k==='hp'&&v<0?v*1.2:v},{k:'plague',ic:'🦠',n:'ปีโรคระบาด',om:'คนเริ่มไอกันทั้งตลาด',f:(k,v)=>k==='hp'&&v<0?v*1.5:k==='karma'&&v>0?v*1.4:v},{k:'comet',ic:'☄️',n:'ปีดาวหาง',om:'ดาวหางหางยาวปรากฏทุกคืน ผู้คนลือว่าเป็นลางใหญ่',f:(k,v)=>k==='power'&&v>0?v*1.4:k==='hp'&&v<0?v*1.3:v},{k:'fest',ic:'🏮',n:'ปีเทศกาลใหญ่',om:'ทุกเมืองเตรียมงานฉลองครบรอบร้อยปี',f:(k,v)=>(k==='fame'||k==='cha')&&v>0?v*1.5:v},{k:'war',ic:'🛡️',n:'ปีสงคราม',om:'ทหารเดินทัพผ่านหมู่บ้านทุกสัปดาห์',f:(k,v)=>k==='fame'?v*1.5:k==='hp'&&v<0?v*1.3:v}],
 mw:[{k:'elect',ic:'🗳️',n:'ปีเลือกตั้ง',om:'ป้ายหาเสียงเต็มทุกเสาไฟ',f:(k,v)=>k==='fame'||k==='karma'?v*1.4:v},{k:'flood',ic:'🌊',n:'ปีน้ำท่วม',om:'ฝนตกไม่หยุด กรมอุตุฯ เตือนทุกวัน',f:(k,v)=>isM(k)&&v<0?v*1.5:v},{k:'boom',ic:'📈',n:'ปีเศรษฐกิจดี',om:'ร้านใหม่เปิดทุกสัปดาห์',f:(k,v)=>isM(k)&&v>0?v*1.5:v}]};
function yrList(){return(YR[wk()]||[]).concat(YR._)}
// ---------- นิสัย ----------
const PERS={k:'ใจดี',c:'โหดเหี้ยม',s:'ระวังตัว',b:'บ้าบิ่น'};
function persNote(D,opt,d){const P=D.ps=D.ps||{k:0,c:0,s:0,b:0};const t=strip(opt&&opt.t||'');
 if(d.karma>0)P.k++;else if(d.karma<0)P.c++;if(/สืบ|ระวัง|ถอย|ซ่อน|หลบ|รอ/.test(t))P.s++;if(/บุก|สู้|ท้า|ลุย|ฝ่า|ปล้น/.test(t))P.b++;
 for(const x in P){if(P[x]===6||P[x]===14){try{ensureHeader();addFeed('ev',`👥 คนเริ่มพูดกันว่าคุณเป็นคน<b>${PERS[x]}</b>${P[x]===14?' — ทั้งเมืองรู้กันหมดแล้ว':''}`,'sum')}catch(e){}}}}
const domP=D=>{const P=D&&D.ps;if(!P)return null;let b=null,bv=5;for(const x in P)if(P[x]>bv){b=x;bv=P[x]}return b};

// ---------- ตัวเลือกตามตัวตน ----------
const WN=w=>(WEL[w]||{}).n||w;
function idOpts(D,opts){const L=[],p=D.path,nm=D.nem&&D.nem.alive?D.nem.n:null;
 const add=o=>L.push(o);const moneyK=()=>(S.mw&&typeof S.mw.money==='number'&&typeof S.money!=='number')?'mwm':'money';
 if(p==='official'||p==='gov')add({t:'📜 ใช้อำนาจตามตำแหน่งจัดการ',s:'ตัวเลือกตามตัวตน',mod:(k,v)=>k==='fame'&&v>0?v*1.5:v<0?v*.6:v,pre:'คุณงัดอำนาจตามตำแหน่งออกมาใช้'});
 if(p==='merchant'||p==='biz')add({t:'💰 ใช้เงินแก้ปัญหา',s:'เสียเงิน แต่เรื่องร้ายเบาลง',mod:(k,v)=>v<0&&!isM(k)?v*.3:v,pre:'คุณควักเงินจ่ายให้เรื่องจบเร็วที่สุด',before:()=>{const k=moneyK();addK(k,-Math.round(((k==='mwm'?S.mw.money:S.money)||0)*.08))}});
 if(['hero','star','title','king','ascend'].includes(p))add({t:'⚔️ ใช้ชื่อเสียงข่มให้ถอย',s:'ตัวเลือกตามตัวตน',mod:(k,v)=>v<0?v*.5:k==='fame'?v*1.3:v,pre:'คุณแค่บอกชื่อ ทุกคนก็เงียบ'});
 if(['hermit','simple','wander'].includes(p))add({t:'🍃 ไม่ทำอะไร ปล่อยให้เรื่องคลี่เอง',s:'ผลเบาลงทั้งดีและร้าย',mod:(k,v)=>k==='int'?v+2:v*.35,pre:'คุณนั่งดูเฉย ๆ แล้วเรื่องก็คลี่ไปเอง'});
 if(p==='bandit'||p==='out')add({t:'🏴 ใช้วิธีนอกกฎหมาย',s:'ได้มาก กรรมลด',mod:(k,v)=>isM(k)&&v>0?v*2:k==='karma'?Math.min(v,0)-3:v,pre:'คุณจัดการแบบที่คนในเมืองไม่กล้าทำ'});
 if(nm)add({t:`🗡️ สงสัยว่าเป็นแผนของ ${E(nm)}`,s:'❓ ระแวงหรือรู้ทัน',nemT:1});
 if((D.xk||[]).length){const w=rp(D.xk);add({t:`🌐 ใช้ความรู้จาก${WN(w)}`,s:'ความรู้ข้ามโลก',mod:(k,v)=>v>0?v*1.5:v*.7,pre:`คุณนึกถึงสิ่งที่เรียนรู้ใน${WN(w)} แล้วทำในแบบที่คนที่นี่ไม่เคยเห็น`,after:()=>addK('int',2)})}
 if((D.xi||[]).length){const it=rp(D.xi);add({t:`${it.ic} ใช้${E(it.o)}จาก${WN(it.w)}`,s:'ของต่างโลก · ใช้ได้ครั้งเดียว',mod:(k,v)=>v<0?0:v*1.3,pre:`คุณหยิบ${E(it.o)}ออกมา คนที่นี่ไม่เคยเห็นของแบบนี้`,before:()=>{D.xi=D.xi.filter(x=>x!==it)}})}
 if((+S.int||0)>=150)add({t:'🧠 คิดหาทางที่สาม',s:'ตัวเลือกตามตัวตน',mod:(k,v)=>v<0?v*.6:v*1.15,pre:'คุณคิดหาทางที่ไม่มีในตัวเลือก'});
 if((+S.cha||0)>=150)add({t:'💬 พูดให้ทุกฝ่ายพอใจ',s:'ตัวเลือกตามตัวตน',mod:(k,v)=>k==='cha'||k==='fame'?Math.abs(v)+2:v<0?v*.6:v,pre:'คุณพูดจนทุกฝ่ายยิ้มออก'});
 if(D.md==='tr')add({t:'🐀 ใช้วิธีของคนตัวเล็ก',s:'รากขยะ · ได้มากหรือเสียมาก',mod:(()=>{const lucky=chance(.55);return(k,v)=>lucky?(v>0?v*2.2:v*.4):(v<0?v*1.5:v*.5)})(),pre:'คุณหลอก แอบ และขอความช่วยเหลือ — วิธีที่คนเก่งไม่เคยต้องใช้'});
 const dp=domP(D);
 if(dp==='k')add({t:'🤲 ขอให้คนที่เคยช่วยมายื่นมือ',s:'นิสัยใจดีที่สะสมมา',mod:(k,v)=>v<0?v*.4:v,pre:'คนที่คุณเคยช่วยไว้หลายคนมายืนข้างคุณ'});
 if(dp==='c')add({t:'😠 ข่มขู่ให้ทุกคนยอม',s:'นิสัยโหดที่สะสมมา',mod:(k,v)=>k==='cha'?Math.min(v,0)-3:v<0?v*.5:v,pre:'ไม่มีใครกล้าสบตาคุณ'});
 const base=opts.filter(o=>o&&!o.skip&&typeof o.f==='function');
 return L.sort(()=>Math.random()-.5).slice(0,2).map(x=>({t:x.t,s:x.s,_id:1,f(){
  if(x.nemT){const D2=S._dr;if(chance(.4)){log(`🗡️ คุณสืบจนรู้ว่าศัตรูเก่าอยู่เบื้องหลังจริง — แผนของเขาพังก่อนเริ่ม${fx({fame:12,int:3})}`,'epic');try{if(D2.nem)D2.nem.a=age()}catch(e){}}else log(`🗡️ คุณระแวงจนเสียเวลาทั้งเดือน — ครั้งนี้ศัตรูไม่ได้เกี่ยวเลย${fx({cha:-3})}`,'');return}
  try{x.before&&x.before()}catch(e){}const b=base.length?rp(base):null;if(!b){log(x.pre,'epic');return}
  log(`${x.pre} — แล้วตัดสินใจ「${strip(b.t).slice(0,40)}」ในแบบของคุณ`,'');const a=snap();b.f();const d=delta(a);const ch=x.mod?remap(d,x.mod):[];try{x.after&&x.after()}catch(e){}
  if(ch.length)log(`✨ วิธีของคุณเปลี่ยนผล: ${ch.join(' · ')}`,'sum');try{stat('ido',1)}catch(e){}}}))}

// ---------- ห่อ choice ทุกตัว ----------
let inBeat=0;
function wrapOpts(title,text,opts){const D=S._dr;if(!D||opts.some(o=>o&&(o._id||o._w)))return{text,opts,timed:false};
 const tags=[];const mods=[];let flip=0;
 // ตัวแปร (65%)
 if(chance(.65)){let v=rp(VARS.concat(WVARS[wk()]?[WVARS[wk()],WVARS[wk()]]:[]));const nm=v.n?knownName():null;tags.push(`${v.ic} ${typeof v.t==='function'?v.t(nm):v.t}`);if(v.f)mods.push(v.f);if(v.flip)flip=Math.max(flip,v.flip)}
 // ปีพิเศษ
 if(D.yr&&D.yr.at===age()){const y=yrList().find(x=>x.k===D.yr.k);if(y){tags.push(`${y.ic} ${y.n}`);mods.push(y.f)}}
 // โหมด
 if(D.md==='hl')tags.push('🔥 นรก: ทุกอย่างที่ได้มามีราคา');
 if(D.md==='ab')flip=Math.max(flip,.2);
 // นิสัย
 const dp=domP(D);if(dp==='c')mods.push((k,v)=>k==='fame'&&v>0?v*1.2:k==='cha'&&v>0?v*.5:v);if(dp==='k')mods.push((k,v)=>k==='karma'&&v>0?v*1.2:v);
 // ผลไม่ตายตัว: พลิกผลสุ่มเล็กน้อยเสมอ
 flip=Math.max(flip,.07);
 // ตัวเลือกตามตัวตน
 let extra=[];try{extra=idOpts(D,opts)}catch(e){console.error('dir3 id',e)}
 const all=opts.concat(extra);
 const out=all.map(o=>{if(!o||typeof o.f!=='function'||o._id)return o;const of=o.f;return Object.assign({},o,{_w:1,f(){const a=snap();const r=of.apply(this,arguments);try{const d=delta(a);const ch=mods.length?remap(d,(k,v)=>mods.reduce((x,m)=>m(k,x),v)):[];
   if(ch.length)log(`🎲 ${tags.length?tags[0].replace(/<[^>]+>/g,'').slice(0,30):'สถานการณ์'} → ${ch.join(' · ')}`,'sum');
   if(flip&&chance(flip)){const ks=Object.keys(d).filter(k=>k!=='hp');if(ks.length){const k=rp(ks),v=d[k],bad=v>0;const amt=-v*(bad?.6:.8);addK(k,amt);log(bad?`🎭 พลิกผล: สิ่งที่ได้มามีเจ้าของตัวจริงตามมาทวง (${LB[k]||k} ${Math.round(amt).toLocaleString()})`:`🎭 พลิกผล: เรื่องร้ายกลับมีข้อดีซ่อนอยู่ (${LB[k]||k} +${Math.round(amt).toLocaleString()})`,bad?'bad':'good');try{stat('flip',1)}catch(e){}}}
   if(D.md==='hl'){const gain=Object.keys(d).some(k=>d[k]>0&&k!=='hp');if(gain&&chance(.6)){const c=Math.max(1,Math.round((S.maxHp||100)*.04));S.hp=Math.max(1,S.hp-c);log(`🔥 นรก: ราคาของสิ่งที่ได้มา ❤️ −${c}`,'bad')}}
   persNote(D,o,d);
   if(!inBeat&&!/^🔁/.test(strip(title))&&chance(D.md==='sh'?.24:.12))setTimeout(()=>beat2(strip(title).slice(0,40),strip(o.t).slice(0,40)),900);
  }catch(e){console.error('dir3 wrap',e)}return r}})});
 const tagHtml=tags.length?`<div class="drTag">${tags.join('<br>')}</div>`:'';
 return{text:tagHtml+text,opts:out,timed:!auto&&chance(D.md==='sh'?.25:.14)}}
if(typeof choice==='function'){const _c=choice;choice=function(title,text,opts){
 // ระหว่างสลับร่าง: เรื่องของโลกเดิมเกิดกับร่างคุณ แต่คนที่อยู่ในร่างเป็นคนเลือก
 try{const D=S&&S._dr;if(D&&D.xv&&!/ข้ามโลก|กลับสู่ร่างเดิม|คืนที่ร่างสลับ|โลกทับซ้อน/.test(strip(title)+strip(text))){const r=_c.call(this,title,text,opts);const c=choice._cur;setTimeout(()=>{try{if(choice._cur===c&&c){const V=WEL[D.xv.w]||{};log(`🌀 ระหว่างที่คุณอยู่ใน${V.n||'อีกโลก'} — คนที่อยู่ในร่างคุณเจอเรื่อง「${strip(title).slice(0,40)}」และเลือกแทนคุณ`,'sum');fateChoice(true)}}catch(e){}},350);return r}}catch(e){}
 let tm=false;try{if(S&&S.alive&&S._dr&&Array.isArray(opts)&&opts.length&&!skipT(title)&&!skipT(text)){const r=wrapOpts(title,text,opts);text=r.text;opts=r.opts;tm=r.timed&&opts.length>=2}}catch(e){console.error('dir3 choice',e)}
 const ret=_c.call(this,title,text,opts);if(tm)setTimeout(()=>timed(choice._cur),120);return ret}}
// ---------- ตัวเลือกจับเวลา (ใช้ตัวนับชะตาของเกม) ----------
function timed(c){try{if(!c||choice._cur!==c||!modalOpen||$('modal').dataset.k!=='choice'||(typeof fateSec==='function'&&fateSec()))return;let left=9;const e=$('chCd');if(!e)return;$('modal').classList.add('drHurry');
 const iv=setInterval(()=>{if(choice._cur!==c||$('modal').dataset.k!=='choice'){clearInterval(iv);try{$('modal').classList.remove('drHurry')}catch(x){}return}if(pendModal||!modalOpen)return;left--;const el=$('chCd');if(el)el.innerHTML=`<b style="color:#ff8a6a">⏳ ต้องตัดสินใจเร็ว! เหลือ ${left} วิ</b>`;if(left<=0){clearInterval(iv);$('modal').classList.remove('drHurry');log('⏳ คุณลังเลนานเกินไป — ชะตาเลือกแทน และไม่ได้เลือกทางที่ดีที่สุด','bad');try{S.hp=Math.max(1,S.hp-Math.round((S.maxHp||100)*.03))}catch(x){}fateChoice()}},1000);
 const el=$('chCd');if(el)el.innerHTML=`<b style="color:#ff8a6a">⏳ ต้องตัดสินใจเร็ว! เหลือ ${left} วิ</b>`;try{stat('tmd',1)}catch(x){}}catch(e){}}

// ---------- จังหวะที่สอง ----------
const B2=[
 {x:t=>`เรื่อง「${t}」ยังไม่จบ — คนที่เกี่ยวข้องกลับมาหาคุณในคืนเดียวกัน และเขาไม่ใช่คนที่คุณคิด`,o:[['เผชิญหน้าตรง ๆ',[{p:.5,e:{fame:12,int:3},r:'คุณจับได้ว่าเขาโกหกตั้งแต่ต้น เรื่องจบลงด้วยมือคุณ'},{p:.5,e:{hp:-.15},r:'เขาเร็วกว่าที่คิด คุณได้แผลมาหนึ่งแผล'}]],['ต่อรองให้จบเงียบ ๆ',[{p:1,e:{mp:-.12,karma:2},r:'จ่ายไปนิดหน่อย เรื่องเงียบลง'}]],['หนีไปก่อน',[{p:1,e:{fame:-5},r:'คุณรอด แต่คนเริ่มพูดกันว่าคุณหนี'}]]]},
 {x:t=>`หลังเรื่อง「${t}」มีคนเห็นทุกอย่าง และมาขอส่วนแบ่งเพื่อปิดปาก`,o:[['ให้ไปเงียบ ๆ',[{p:1,e:{mp:-.1},r:'เขารับเงินแล้วหายไป… อย่างน้อยก็ตอนนี้'}]],['ไม่ให้ และท้าให้ไปบอกใครก็ได้',[{p:.5,e:{fame:8},r:'เขาไม่กล้าบอกใคร'},{p:.5,e:{fame:-12},r:'เขาบอกทุกคนในตลาด'}]],['ชวนมาเป็นพวก',[{p:.6,e:{cha:4},r:'ได้พวกเพิ่มหนึ่งคนที่รู้ความลับของคุณ'},{p:.4,e:{mp:-.15},r:'เขารับเงินแล้วขายข่าวให้คนอื่นต่อ'}]]]},
 {x:t=>`สิ่งที่คุณได้จากเรื่อง「${t}」มีเจ้าของตัวจริงตามมาทวง`,o:[['คืนให้',[{p:1,e:{karma:6,mp:-.08},r:'เจ้าของตัวจริงยิ้มทั้งน้ำตา'}]],['ไม่คืน',[{p:.5,e:{mp:.1,karma:-5},r:'เขาเดินจากไปพร้อมสายตาที่คุณจะจำไปอีกนาน'},{p:.5,e:{hp:-.12},r:'เขาไม่ได้มาคนเดียว'}]],['แบ่งกันคนละครึ่ง',[{p:1,e:{cha:3},r:'ไม่มีใครพอใจ แต่ไม่มีใครเจ็บ'}]]]},
 {x:t=>`ข่าวเรื่อง「${t}」ลือไปไกลกว่าที่คิด คนแปลกหน้ามายืนรอหน้าบ้าน`,o:[['ออกไปคุย',[{p:.5,e:{fame:10,cha:3},r:'เขามาเพราะนับถือ ไม่ใช่มาหาเรื่อง'},{p:.5,e:{hp:-.1},r:'เขามาหาเรื่องจริง ๆ'}]],['ไม่เปิดประตู',[{p:1,e:{int:2},r:'เขารอทั้งคืน แล้วเขียนข้อความติดประตูไว้ว่าจะกลับมา'}]]]},
 {x:t=>`คืนนั้นคุณนอนไม่หลับเพราะเรื่อง「${t}」 แล้วก็นึกออกว่าพลาดอะไรไป`,o:[['ย้อนกลับไปแก้',[{p:.6,e:{karma:5,int:3},r:'คุณแก้ทันก่อนเรื่องจะบานปลาย'},{p:.4,e:{fame:-5},r:'สายไปแล้ว'}]],['ปล่อยไว้',[{p:1,e:{joy:-3},r:'มันจะวนกลับมาในฝันอีกหลายคืน'}]]]}];
function beat2(t,p){try{if(!S||!S.alive||busy())return;inBeat=1;const B=rp(B2);const T={n:'จังหวะที่สอง',id:'beat2'},P={n:''};
 choice('🔁 เรื่องยังไม่จบ',`<span class="tag2">🎲 คุณเพิ่งเลือก「${E(p)}」</span><br>${B.x(E(t))}`,B.o.map(o=>mkOpt({t:o[0],rnd:o[1]},P,T)));try{stat('b2',1)}catch(e){}}catch(e){console.error('beat2',e)}finally{setTimeout(()=>{inBeat=0},50)}}

// =====================================================================
// ข) คนรอบตัวมีแผนของตัวเอง
// =====================================================================
function actors(D){const L=[];try{peers.filter(p=>p&&p.alive).forEach(p=>L.push({k:p.rel==='rival'?'rival':p.rel==='friend'?'friend':'peer',n:p.name}))}catch(e){}
 try{(S.sibs||[]).filter(x=>x.alive&&x.born&&x.n&&(x.age|0)>=14).forEach(x=>L.push({k:'sib',n:x.n}))}catch(e){}
 try{if(S.spouse&&typeof S.spouse==='string')L.push({k:'spouse',n:S.spouse})}catch(e){}
 try{(S.children||[]).filter(c=>c.alive&&c.n&&(c.age|0)>=12).forEach(c=>L.push({k:'kid',n:c.n}))}catch(e){}
 if(D.xr&&age()<=D.xr.end)L.push({k:'guest',n:D.xr.n,w:D.xr.w},{k:'guest',n:D.xr.n,w:D.xr.w});return L}
const AG={
 friend:[c=>({t:'💍 เพื่อนจะแต่งงาน',x:`{N} จะแต่งงานกับคนที่คุณรู้ความลับบางอย่างของเขา`,o:[{t:'บอกความจริงกับ {N}',s:'❓',rnd:[{p:.5,e:{cha:5,karma:4},r:'{N} โกรธอยู่สามวัน แล้วกลับมาขอบคุณ'},{p:.5,e:{cha:-6},r:'{N} ไม่เชื่อ และไม่เชิญคุณไปงาน'}]},{t:'เก็บเงียบแล้วไปร่วมงาน',e:{joy:4},r:'งานแต่งสวยมาก คุณยิ้มจนปวดแก้ม'},{t:'ไปคุยกับว่าที่คู่สมรสก่อน',rnd:[{p:.6,e:{int:4},r:'เขาสารภาพเองและสัญญาว่าจะบอก {N}'},{p:.4,e:{fame:-5},r:'เขาฟ้อง {N} ว่าคุณมาข่มขู่'}]}]}),
  c=>({t:'🤝 เพื่อนชวนร่วมทุน',x:`{N} มีแผนเปิดกิจการ และอยากให้คุณเป็นหุ้นส่วน`,o:[{t:'ลงเงินด้วย',rnd:[{p:.5,e:{mp:.5},r:'กิจการไปได้ดีเกินคาด'},{p:.5,e:{mp:-.3},r:'กิจการเจ๊ง แต่ยังเป็นเพื่อนกัน'}]},{t:'ช่วยแรงแต่ไม่ลงเงิน',e:{cha:3,int:2},r:'{N} ขอบคุณที่อยู่ข้างกัน'},{t:'ปฏิเสธ',e:{},r:'{N} เข้าใจ แต่ไม่ชวนคุณอีกเลย'}]})],
 rival:[c=>({t:'🏯 คู่ปรับเปิดสำนักแข่ง',x:`{N} เปิด${c.sect}ใหม่ตรงข้ามที่ของคุณ และเริ่มดึงคนของคุณไป`,o:[{t:'ท้าประลองต่อหน้าทุกคน',s:'มินิเกม',mg:{id:'drTap',t:'ประลองกับ {N}',s:'แตะจุดอ่อนให้ทัน',win:{e:{fame:20},r:'คนของคุณกลับมาทั้งหมด พร้อมคนของ {N} อีกครึ่งหนึ่ง'},lose:{e:{fame:-15},r:'{N} ชนะต่อหน้าทุกคน'}}},{t:'ทำของคุณให้ดีกว่า',e:{int:3,mp:-.08},r:'คุณไม่สนใจ {N} แล้วทำทุกอย่างให้ดีขึ้น — ลูกค้าเลือกเอง'},{t:'ชวนรวมกัน',rnd:[{p:.4,e:{cha:6,mp:.2},r:'{N} หัวเราะแล้วยื่นมือมา'},{p:.6,e:{fame:-5},r:'{N} เอาเรื่องนี้ไปเล่าว่าคุณกลัว'}]}]})],
 sib:[c=>({t:'🎲 พี่น้องติดหนี้',x:`{N} ติดหนี้พนันก้อนใหญ่ เจ้าหนี้ขู่จะมาเอาที่${c.home}ครอบครัว`,o:[{t:'จ่ายแทน',e:{mp:-.3,karma:5},r:'{N} ร้องไห้และสัญญาว่าจะเลิก'},{t:'ไปคุยกับเจ้าหนี้',s:'มินิเกม',mg:{id:'drSnap',t:'อ่านใจเจ้าหนี้',s:'เลือกให้ถูก',win:{e:{fame:8},r:'เจ้าหนี้ยอมลดหนี้ครึ่งหนึ่ง'},lose:{e:{mp:-.2},r:'คุยไม่สำเร็จ ต้องจ่ายเต็ม'}}},{t:'ให้ {N} รับผิดชอบเอง',rnd:[{p:.5,e:{},r:'{N} หาเงินมาใช้หนี้ได้เองในที่สุด'},{p:.5,e:{joy:-6},r:'{N} หนีออกจากบ้านไป'}]}]})],
 spouse:[c=>({t:'💔 คู่ชีวิตอยากเปลี่ยนชีวิต',x:`{N} บอกว่าเบื่อชีวิตแบบนี้ อยากย้ายไปเริ่มใหม่ที่อื่น`,o:[{t:'ย้ายไปด้วยกัน',e:{joy:8,mp:-.15},r:'ที่ใหม่ไม่มีใครรู้จักคุณ — และนั่นคือสิ่งที่ {N} ต้องการ'},{t:'ขอให้อยู่ต่อ',rnd:[{p:.5,e:{cha:3},r:'{N} ยอมอยู่ แต่ขอให้คุณกลับบ้านเร็วขึ้น'},{p:.5,e:{joy:-8},r:'{N} ไปคนเดียวหนึ่งปี แล้วกลับมาเป็นคนที่คุณไม่ค่อยรู้จัก'}]},{t:'พาไปเที่ยวไกล ๆ หนึ่งเดือน',e:{joy:10,mp:-.1},r:'เดือนนั้นเป็นเดือนที่ดีที่สุดของทั้งคู่ในรอบหลายปี'}]})],
 kid:[c=>({t:'🧒 ลูกอยากเลือกทางเอง',x:`{N} บอกว่าไม่อยากเดินทางเดียวกับคุณ อยากไปเรียนสิ่งที่คุณไม่เข้าใจ`,o:[{t:'สนับสนุนเต็มที่',e:{karma:4,mp:-.08},par:1,r:'{N} ยิ้มกว้างที่สุดตั้งแต่เกิด'},{t:'ห้าม',e:{},par:-1,rnd:[{p:.5,r:'{N} ยอมฟัง แต่ไม่พูดกับคุณหลายเดือน'},{p:.5,r:'{N} แอบไปอยู่ดี'}]}]})],
 peer:[c=>({t:'📨 ขอความช่วยเหลือ',x:`{N} คนที่คุณรู้จักมาตั้งแต่เด็กมาขอให้ช่วยเรื่องที่เขาไม่ยอมบอกรายละเอียด`,o:[{t:'ช่วยโดยไม่ถาม',rnd:[{p:.6,e:{karma:5,cha:3},r:'เรื่องเล็กกว่าที่คิด {N} ซึ้งใจมาก'},{p:.4,e:{hp:-.12},r:'คุณถูกลากเข้าไปในเรื่องที่ไม่ควรรู้'}]},{t:'ถามให้ชัดก่อน',e:{int:2},r:'{N} ลังเล แล้วขอไปหาคนอื่นแทน'}]})],
 guest:[c=>({t:'🌐 แขกต่างโลกกับธรรมเนียมที่นี่',x:`{N} จากต่างโลกทำเรื่องที่ไม่มีใครที่นี่ทำ จนชาวบ้านมารวมตัวหน้า${c.home}`,o:[{t:'ออกไปอธิบายแทน',e:{cha:4,karma:3},r:'ชาวบ้านหัวเราะ บางคนเริ่มลองทำตาม'},{t:'ให้ {N} เรียนธรรมเนียมที่นี่',e:{int:2},r:'{N} ตั้งใจเรียน แต่ยังทำพลาดอยู่ดี — แบบน่ารัก ๆ'},{t:'ขอเรียนวิธีของโลก {N}',e:{int:4},xk:1,r:'คุณได้เรียนวิธีคิดที่ไม่มีในโลกนี้'}]})]};
function npcEvent(D){const A=actors(D);if(!A.length)return false;const a=rp(A),L=AG[a.k];if(!L)return false;const B=rp(L)(cx());const T={n:'คนรอบตัว',id:'npc'},P={n:a.n};
 const opts=B.o.map(o=>{const op=mkOpt(o,P,T);if(o.xk&&a.w){const f0=op.f;op.f=function(){f0.apply(this,arguments);(D.xk=D.xk||[]).includes(a.w)||D.xk.push(a.w)}}return op});
 choice(B.t.replace('{N}',E(a.n)),`<span class="tag2">👥 คนรอบตัวมีแผนของตัวเอง</span><br>${B.x.replace(/\{N\}/g,`<b>${E(a.n)}</b>`)}`,opts);try{stat('npc',1)}catch(e){}return true}

// =====================================================================
// ค) ข้ามโลกได้ทุกโลก
// =====================================================================
const vocab=w=>WEL[w]||WEL.murim;
function xwStart(D,w,how){const V=vocab(w);D.xv={w,n:rp(V.ppl),end:age()+rnd(1,3),r:0,s:age()};(D.xk=D.xk||[]).includes(w)||D.xk.push(w);
 log(`🌀 ${how||'คุณตื่นมาในร่างของคนอื่น'} — คุณกลายเป็น<b>${E(D.xv.n)}</b>ใน${V.ic} ${V.n} ตัวคุณในโลกเดิมถูกคนจากโลกนั้นใช้แทน`,'myth',true);try{stat('xv',1)}catch(e){}}
function xwYear(D){const X=D.xv,V=vocab(X.w);X.r++;
 if(age()>=X.end){const RET=[{e:{mp:.2,cha:3},r:'คนที่อยู่ในร่างคุณทำงานหนักแทนคุณ — มีเงินเก็บเพิ่มขึ้น'},{e:{fame:15},r:'คนที่อยู่ในร่างคุณทำเรื่องดังจนทั้งเมืองพูดถึง'},{e:{fame:-10,karma:-4},r:'คนที่อยู่ในร่างคุณสร้างศัตรูไว้ให้หลายคน'},{e:{joy:-5,cha:-3},r:'คนรอบตัวบอกว่าช่วงนั้นคุณ "เหมือนคนแปลกหน้า"'},{e:{int:5},r:'คนที่อยู่ในร่างคุณทิ้งสมุดบันทึกไว้ — เต็มไปด้วยความรู้จากอีกโลก'}];
  const b=rp(RET);D.xv=null;choice(`🌀 กลับสู่ร่างเดิม`,`<span class="tag2">🌐 ข้ามโลก</span><br>คุณตื่นขึ้นในร่างของตัวเอง หลังใช้ชีวิตเป็น<b>${E(X.n)}</b>ใน${V.n}มา ${age()-X.s} ปี — คุณจะทำอะไรเป็นอย่างแรก`,[
   mkOpt({t:'ไล่ดูว่าช่วงที่หายไปเกิดอะไรขึ้นบ้าง',e:b.e,r:b.r},{n:''},{n:'กลับสู่ร่างเดิม',id:'xret'}),
   mkOpt({t:`เขียนทุกอย่างที่จำได้จาก${V.n}ลงสมุด`,e:{int:6},r:`สมุดเล่มนั้นกลายเป็นสิ่งที่มีค่าที่สุดที่คุณมี — ความรู้จาก${V.n}ยังอยู่ในหัว`},{n:''},{n:'กลับสู่ร่างเดิม',id:'xret'}),
   mkOpt({t:'พยายามกลับไปอีกครั้ง',s:'❓',rnd:[{p:.4,e:{},r:'คืนนั้นคุณหลับไปแล้วตื่นในโลกนั้นอีกครั้ง'},{p:.6,e:{joy:-4},r:'ประตูปิดแล้ว เหลือแค่ความฝัน'}]},{n:''},{n:'กลับสู่ร่างเดิม',id:'xret'})]);
  const last=choice._cur&&choice._cur.opts&&choice._cur.opts[2];if(last){const f0=last.f;last.f=function(){f0.apply(this,arguments);if(chance(.4))xwStart(S._dr,X.w,'คุณกลับไปอีกครั้ง')}}
  return true}
 const tpl=[
  ()=>({t:`🌀 ชีวิตใน${V.n}`,x:`ในร่างของ${E(X.n)} คุณเจอ${rp(V.thr)}ที่${rp(V.plc)} คนในโลกนี้รอดูว่าคุณจะทำอย่างไร`,o:[{t:`สู้ด้วย${V.pw}ของร่างนี้`,s:'มินิเกมของโลกนั้น',mg:{id:V.mg,t:`สู้ใน${V.n}`,s:'ทำให้ได้ในแบบของโลกนี้',win:{e:{pw:.06,fame:8},r:`คุณชนะด้วยวิธีที่คนใน${V.n}ไม่เคยเห็น`},lose:{e:{hp:-.15},r:'ร่างนี้ไม่คุ้นมือ คุณพลาด'}}},{t:'ใช้วิธีจากโลกเดิมของคุณ',rnd:[{p:.6,e:{int:4,fame:6},r:'วิธีจากอีกโลกได้ผลเกินคาด'},{p:.4,e:{hp:-.1},r:'กฎของโลกนี้ไม่ยอมให้ทำแบบนั้น'}]},{t:'ซ่อนตัวรอให้ผ่านไป',e:{int:2},r:'คุณรอดโดยไม่มีใครรู้ว่าคนในร่างนี้เปลี่ยนไปแล้ว'}]}),
  ()=>({t:'🌀 แรงต้านของโลก',x:`ยิ่งอยู่นาน${V.n}ยิ่งผลักคุณออก ร่างนี้เริ่มไม่ฟังคำสั่ง และคนรอบตัว${E(X.n)}เริ่มสงสัย (แรงต้าน ${X.r})`,o:[{t:'ยอมกลับโลกเดิมตอนนี้',e:{},r:'คุณปล่อยใจ แล้วตื่นขึ้นในร่างเดิม',f:'ret'},{t:'ฝืนอยู่ต่อ',rnd:[{p:.5,e:{pw:.08,int:4},r:'คุณปรับตัวเข้ากับโลกนี้ได้อีกขั้น'},{p:.5,e:{hp:-.2,mhp:-.04},r:'โลกนี้ผลักคุณแรงจนกระอักเลือด'}]},{t:`ตัดขาดจากโลกเดิม — อยู่ที่${V.n}ไปอีกนาน`,s:'⚠️ อยู่ต่ออีกหลายปี',e:{int:6},r:`คุณตัดสินใจเป็น${E(X.n)}ต่อไป ร่างเดิมในโลกเดิมจะเป็นอย่างไรก็ช่างมัน`,f:'cut'}]})];
 const B=(X.r>=2&&chance(.5)?tpl[1]:tpl[0])();const T={n:'ข้ามโลก',id:'xw'},P={n:X.n};
 choice(B.t,`<span class="tag2">🌐 ข้ามโลก · อยู่ใน${V.ic} ${V.n} ปีที่ ${age()-X.s+1}</span><br>${B.x}`,B.o.map(o=>{const op=mkOpt(o,P,T);if(o.f==='ret'){const f0=op.f;op.f=function(){f0.apply(this,arguments);if(D.xv)D.xv.end=age()}}if(o.f==='cut'){const f0=op.f;op.f=function(){f0.apply(this,arguments);if(D.xv)D.xv.end=age()+rnd(4,8)}}return op}));return true}
function xwEvent(D){const A=curW(),B=rp(others(A)),V=vocab(B);const k=rp(['swap','item','guest','letter']);const T={n:'ข้ามโลก',id:'xw'},P={n:rp(V.ppl)};
 if(k==='swap'){choice('🌀 คืนที่ร่างสลับ',`<span class="tag2">🌐 ข้ามโลก</span><br>ก่อนหลับคุณได้ยินเสียงเรียกชื่อคุณเป็นภาษาที่ไม่รู้จัก ภาพของ${V.ic} ${V.n}แวบเข้ามาในหัว — ประตูกำลังจะเปิด`,[
   {t:`ปล่อยใจไปกับมัน`,s:`ไปใช้ชีวิตใน${V.n} 1–3 ปี`,f(){xwStart(D,B)}},
   mkOpt({t:'ฝืนไว้ไม่ให้หลับ',s:'มินิเกม',mg:{id:'drMash',t:'ฝืนไม่ให้หลับ',s:'แตะรัว ๆ ดึงสติไว้',win:{e:{int:3},r:'ประตูปิดลง คุณยังอยู่ในร่างตัวเอง'},lose:{e:{},r:'คุณหลับไปจนได้'}}},P,T)]);
  const o=choice._cur&&choice._cur.opts[1];if(o){const f0=o.f;o.f=function(){f0.apply(this,arguments);setTimeout(()=>{try{const L=S._dr.hist;if(L&&L.length&&/หลับไปจนได้/.test(String((S.key||[]).slice(-1)[0]||'')))xwStart(D,B)}catch(e){}},1500)}}return true}
 if(k==='item'){const ob=rp(V.obj);choice(`${V.ic} ของที่ตกมาจากอีกโลก`,`<span class="tag2">🌐 ข้ามโลก</span><br>เช้านี้มี<b>${E(ob)}</b>ตกอยู่หน้าบ้าน ของแบบนี้ไม่มีในโลกนี้ มันมาจาก${V.n}`,[
   {t:'เก็บไว้ใช้ยามคับขัน',s:'ปลดตัวเลือกพิเศษในเหตุการณ์ถัดไป',f(){(D.xi=D.xi||[]).push({w:B,o:ob,ic:V.ic});log(`${V.ic} คุณเก็บ<b>${E(ob)}</b>จาก${V.n}ไว้อย่างดี — สักวันมันจะมีประโยชน์`,'epic')}},
   mkOpt({t:'ขายให้นักสะสม',e:{mp:.35},r:`นักสะสมจ่ายแพงจนคุณตกใจ เขาถามว่ามีอีกไหม`},P,T),
   mkOpt({t:'ศึกษาว่ามาจากไหน',e:{int:6},r:`คุณศึกษามันทั้งเดือน จนเข้าใจกฎบางอย่างของ${V.n}`},P,T)]);
  const o=choice._cur&&choice._cur.opts[2];if(o){const f0=o.f;o.f=function(){f0.apply(this,arguments);(D.xk=D.xk||[]).includes(B)||D.xk.push(B)}}return true}
 if(k==='guest'){const n=rp(V.ppl);choice(`${V.ic} แขกจากอีกโลก`,`<span class="tag2">🌐 ข้ามโลก</span><br><b>${E(n)}</b>จาก${V.n}หลุดมาโผล่ในโลกนี้ พูดภาษาเดียวกับคุณได้ครึ่ง ๆ กลาง ๆ และไม่มีที่ไป`,[
   {t:'รับไว้อยู่ด้วย',s:'จะมีเรื่องตามมาอีกหลายปี',f(){D.xr={n,w:B,end:age()+rnd(3,6)};log(`🏠 <b>${E(n)}</b>จาก${V.n}ย้ายมาอยู่กับคุณ`,'epic')}},
   mkOpt({t:'ส่งต่อให้ทางการ',e:{karma:-3},r:'ไม่มีใครรู้ว่าเขาไปอยู่ที่ไหนต่อ'},P,T),
   mkOpt({t:'ช่วยหาทางกลับให้',s:'❓',rnd:[{p:.5,e:{karma:8,int:4},r:`คุณกับเขาหาประตูเจอ ก่อนกลับเขาทิ้งของไว้ให้หนึ่งชิ้น`},{p:.5,e:{joy:-3},r:'หาไม่เจอ เขาเลยอยู่ต่อ — และวันหนึ่งก็หายไปเอง'}]},P,T)]);return true}
 // จดหมายจากตัวเองอีกโลก (อาจโกหก)
 const truth=chance(.6),pl=D.pl;let hint='อย่าไว้ใจคนที่ยิ้มให้คุณมากที่สุดในปีหน้า';
 if(truth&&pl){const Tw=DR.TW.find(t=>t.id===pl.id);if(Tw){try{hint=strip(DR.H.fill(Tw.om[0](cx(),pl),pl)).replace(/^🔮\s*/,'')}catch(e){}}}
 choice('✉️ จดหมายจากตัวคุณในอีกโลก',`<span class="tag2">🌐 ข้ามโลก</span><br>ลายมือในจดหมายเป็นของคุณเอง ส่งมาจาก${V.ic} ${V.n} เขียนว่า: <i>"${E(hint)}"</i>`,[
  mkOpt({t:'เชื่อ แล้วเตรียมตัว',e:{int:3},r:truth?'ทุกอย่างในจดหมายเป็นจริง คุณพร้อมกว่าคนอื่น':'คุณเตรียมตัวเก้อ — ตัวคุณอีกโลกโกหก หรืออาจเป็นคนอื่นที่เลียนลายมือ'},P,T),
  mkOpt({t:'เผาทิ้ง',e:{},r:'คุณเผาจดหมาย แต่ประโยคนั้นยังวนอยู่ในหัว'},P,T),
  mkOpt({t:'เขียนตอบกลับ',s:'❓',rnd:[{p:.5,e:{joy:6},r:'สามเดือนต่อมามีจดหมายตอบ — ตัวคุณอีกโลกสบายดี'},{p:.5,e:{},r:'ไม่มีคำตอบ'}]},P,T)]);if(truth&&pl)pl.rd=(pl.rd|0)+1;return true}

// =====================================================================
// ง) โลกทับซ้อน — ทุกคู่ · คู่ประจำสัปดาห์ร่วมกันทั้งเว็บ
// =====================================================================
const weekN=()=>Math.floor((Date.now()+7*3600e3)/604800e3);
const hashS=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h};
function weekPair(A){const L=others(A);return L[(weekN()*13+hashS(A))%L.length]}
let OVG=null;function ovLoad(){try{if(OVG||typeof api!=='function'||typeof onlineOK==='undefined'||!onlineOK)return;api('ovg',{w:weekN()-1}).then(j=>{OVG=j||{}}).catch(()=>{OVG={}})}catch(e){}}
const OVT=[
 (A,B)=>({t:`${B.ic} ${rp(B.thr)}โผล่ที่${rp(A.plc)}`,x:`คนใน${A.n}ไม่เคยเห็นอะไรแบบนี้ มันมาจาก${B.n}ผ่านรอยต่อของสองโลก`,o:[{t:`สู้ด้วย${A.pw}`,s:'มินิเกม',mg:{id:A.mg,t:'สู้กับสิ่งที่มาจากอีกโลก',s:'ทำให้ได้',win:{e:{fame:18,pw:.05},r:'มันถอยกลับเข้ารอยต่อ ทั้งเมืองเห็นคุณเป็นคนแรกที่สู้มันได้'},lose:{e:{hp:-.2},r:'กฎของโลกคุณใช้กับมันไม่ได้ผลเต็มที่'}}},{t:'ศึกษามันก่อน',e:{int:5},xk:1,r:`คุณเฝ้าดูจนเข้าใจว่ามันกลัวอะไร — ความรู้จาก${B.n}เริ่มซึมเข้าหัว`},{t:'พาคนอพยพ',e:{karma:8},r:'ไม่มีใครตายในวันนั้น'}]}),
 (A,B)=>({t:`${B.ic} ${rp(B.ppl)}หลงมาขอที่พัก`,x:`${rp(B.ppl)}จาก${B.n}เดินออกมาจากรอยต่อ ขอที่พักที่${rp(A.plc)}`,o:[{t:'รับไว้',e:{karma:5},guest:1,r:'แขกจากอีกโลกย้ายมาอยู่ด้วย'},{t:'แลกความรู้กัน',e:{int:4},xk:1,r:`คุณสอนเรื่อง${A.n} เขาสอนเรื่อง${B.n}`},{t:'ส่งตัวให้ทางการ',e:{karma:-4,fame:4},r:'ทางการขอบคุณ แขกมองคุณด้วยสายตาที่เข้าใจยาก'}]}),
 (A,B)=>({t:'🏪 ตลาดรอยต่อ',x:`ตลาดเล็ก ๆ เกิดขึ้นตรงรอยต่อ คน${A.n}เอา${rp(A.obj)}มาแลก${rp(B.obj)}จาก${B.n}`,o:[{t:`แลก${rp(B.obj)}มาเก็บไว้`,e:{mp:-.08},item:1,r:'ของจากอีกโลกอยู่ในมือคุณแล้ว'},{t:`ขายของ${A.n}ให้คน${B.n}`,e:{mp:.3},r:'ของธรรมดาของโลกคุณ กลายเป็นของหายากในอีกโลก'},{t:'ยึดตลาดเก็บค่าคุ้มครอง',e:{mp:.4,karma:-8},r:'เงินไหลเข้าทุกวัน และศัตรูก็เพิ่มทุกวัน'}]}),
 (A,B)=>({t:'⚖️ กฎสองโลกชนกัน',x:`ใกล้รอยต่อ ${A.pw}ของคุณอ่อนลงครึ่งหนึ่ง แต่${B.pw}ของ${B.n}กลับใช้ได้`,o:[{t:`ฝึก${B.pw}`,s:'มินิเกม',mg:{id:B.mg,t:`ฝึก${B.pw}`,s:'ทำให้ได้ในแบบของอีกโลก',win:{e:{pw:.12,int:4},xk:1,r:`คุณใช้${B.pw}ได้ — คนแรกในโลกนี้`},lose:{e:{hp:-.1},r:'ร่างกายยังไม่ยอมรับพลังแบบนี้'}}},{t:'หาจุดสมดุลของสองพลัง',s:'มินิเกม',mg:{id:'drMash',t:'คุมสองพลัง',s:'แตะรัว ๆ ประคองให้สมดุล',win:{e:{pw:.15},r:'สองพลังหมุนวนในตัวคุณอย่างลงตัว'},lose:{e:{hp:-.2},r:'สองพลังตีกันในตัวคุณ'}}},{t:'ถอยห่างจากรอยต่อ',e:{},r:'พลังของคุณกลับมาเต็มเมื่อห่างออกไป'}]}),
 (A,B)=>({t:`💞 คนจาก${B.n}`,x:`${rp(B.ppl)}กับคุณเริ่มสนิทกันจนคนในเมืองเริ่มพูด`,o:[{t:'ไม่สนใจคำพูดใคร',rnd:[{p:.6,e:{cha:6,joy:8},r:'สองโลกอาจต่างกัน แต่คนสองคนไม่ได้ต่างกันขนาดนั้น'},{p:.4,e:{fame:-8},r:'คนในเมืองเริ่มหลบหน้าคุณ'}]},{t:'รักษาระยะ',e:{int:2},r:'เขาเข้าใจ แต่ยังมาทักทายทุกเช้า'}]}),
 (A,B)=>({t:'🔥 กลุ่มที่อยากปิดรอยต่อด้วยกำลัง',x:`คนใน${A.n}กลุ่มหนึ่งจะบุกฆ่าทุกคนที่มาจาก${B.n}คืนนี้`,o:[{t:`ปกป้องคนจาก${B.n}`,s:'มินิเกม',mg:{id:'drTap',t:'ขวางกลุ่มคลั่ง',s:'แตะจุดอ่อนให้ทัน',win:{e:{karma:12,fame:15},r:'ไม่มีใครตายคืนนั้น คนจากสองโลกจำชื่อคุณได้'},lose:{e:{hp:-.25,karma:6},r:'คุณขวางได้ครึ่งเดียว'}}},{t:'เป็นคนกลางเจรจา',rnd:[{p:.5,e:{cha:6,fame:12},r:'สองฝ่ายยอมนั่งคุยกันเป็นครั้งแรก'},{p:.5,e:{fame:-8},r:'สองฝ่ายหาว่าคุณเข้าข้างอีกฝั่ง'}]},{t:'ไม่ยุ่ง',e:{karma:-5},r:'เช้ามาตลาดรอยต่อเงียบผิดปกติ'}]}),
 (A,B)=>({t:`${A.ic}${B.ic} ภัยสองโลกรวมตัว`,x:`${rp(A.thr)}กับ${rp(B.thr)}รวมตัวกันที่รอยต่อ — แข็งแกร่งกว่าภัยของโลกไหนเคยมี`,o:[{t:'รวมคนจากสองโลกสู้',s:'มินิเกม',mg:{id:'drTap',t:'ศึกสองโลก',s:'แตะจุดอ่อนให้ทัน',win:{e:{fame:30,pw:.08},r:'คนจากสองโลกสู้เคียงกันเป็นครั้งแรก — และชนะ'},lose:{e:{hp:-.3},r:'แนวป้องกันแตก รอยต่อกว้างขึ้น'}}},{t:'ปิดรอยต่อจากฝั่งนี้',e:{karma:4,int:3},r:'คุณปิดรอยต่อได้ชั่วคราว แต่ภัยยังรออยู่อีกฝั่ง'}]})];
function ovPlan(D){if(D.ov||D.ovDone)return;const A=curW();const B=weekPair(A);const L=Math.max(40,+(S.lifespan||80));const at=age()+rnd(2,4);D.ov={a:A,b:B,ph:0,at,end:at+rnd(3,6),om:0,w:weekN()};
 const V=vocab(B);omenLine(`🔮 ${rp([`ฝันเห็น${V.ic} ${V.n}ซ้อนทับกับเมืองที่คุณอยู่`,`มีคนพบ${rp(V.obj)}กลางถนน ไม่มีใครรู้ว่ามาจากไหน`,`ท้องฟ้าบางมุมมีภาพของ${V.n}จาง ๆ เหมือนกระจกซ้อน`])}`,'ov')}
function ovYear(D){const O=D.ov;if(!O)return false;const A=vocab(O.a),B=vocab(O.b);
 if(O.ph===0){if(age()<O.at){if(O.om<1){O.om++;omenLine(`🔮 รอยรั่ว: ${rp(B.ppl)}ถูกพบเดินหลงอยู่ใน${rp(A.plc)}`,'ov')}return false}
  O.ph=1;const boost=OVG&&OVG.f>OVG.s;log(`🌐 <b>โลกทับซ้อน</b> — ${A.ic} ${A.n} กับ ${B.ic} ${B.n} รั่วเข้าหากัน กฎของสองโลกใช้ได้พร้อมกัน${boost?' · สัปดาห์ก่อนผู้เล่นทั้งเว็บเลือกหลอมรวม รอยต่อครั้งนี้จึงกว้างกว่าทุกครั้ง':''}`,'myth',true);try{stat('ov',1)}catch(e){}if(boost)O.end+=2;return false}
 if(O.ph===1){if(age()<O.end){if(busy())return false;const B2_=rp(OVT)(A,B);const T={n:'โลกทับซ้อน',id:'ov'},P={n:''};
   choice(B2_.t,`<span class="tag2">🌐 โลกทับซ้อน · ${A.ic} ${A.n} × ${B.ic} ${B.n}</span><br>${B2_.x}`,B2_.o.map(o=>{const op=mkOpt(o,P,T);const f0=op.f;op.f=function(){f0.apply(this,arguments);if(o.xk||(o.mg&&o.mg.win&&o.mg.win.xk)){(D.xk=D.xk||[]).includes(O.b)||D.xk.push(O.b)}if(o.guest)D.xr={n:rp(B.ppl),w:O.b,end:age()+rnd(3,5)};if(o.item)(D.xi=D.xi||[]).push({w:O.b,o:rp(B.obj),ic:B.ic})};return op}));return true}
  O.ph=2;if(busy())return false;
  choice(`🌐 ${A.n} × ${B.n}: จะเป็นอย่างไรต่อ`,`<span class="tag2">🌐 โลกทับซ้อน · บทตัดสิน · ผลรวมของผู้เล่นทั้งเว็บสัปดาห์นี้จะส่งผลถึงสัปดาห์หน้า</span><br>รอยต่อระหว่างสองโลกถึงจุดที่ต้องเลือก — หลอมรวมเป็นโลกเดียว หรือแยกขาดจากกันตลอดไป คุณคือหนึ่งในคนที่ยืนอยู่ตรงกลาง`,[
   mkOpt({t:'🔗 หลอมรวมสองโลก',s:'ความรู้สองโลกติดตัว · เสี่ยง',rnd:[{p:.6,e:{pw:.15,int:6,fame:25},r:`สองโลกค่อย ๆ หลอมเป็นหนึ่ง ${A.pw}กับ${B.pw}ใช้ได้ทุกที่ และคุณคือคนที่รู้ทั้งสองแบบ`},{p:.4,e:{hp:-.25,int:6},r:'การหลอมรวมไม่ราบรื่น เมืองครึ่งหนึ่งพัง แต่โลกใหม่ก็เกิดขึ้นจริง'}]},{n:''},{n:'โลกทับซ้อน',id:'ovf'}),
   mkOpt({t:'✂️ แยกขาดจากกัน',s:'ปลอดภัย',e:{karma:6,int:3},r:'รอยต่อค่อย ๆ ปิดลง เหลือไว้แค่ความทรงจำ — และคนที่ติดค้างอยู่ผิดฝั่ง'},{n:''},{n:'โลกทับซ้อน',id:'ovs'}),
   mkOpt({t:'🚪 ข้ามไปอีกฝั่งก่อนรอยต่อปิด',s:`ไปใช้ชีวิตใน${B.n}สักพัก`,e:{},r:`คุณก้าวผ่านรอยต่อไปยัง${B.n}ในวินาทีสุดท้าย`},{n:''},{n:'โลกทับซ้อน',id:'ovx'})]);
  const C=choice._cur;if(C){const vote=v=>{try{if(typeof api==='function'&&onlineOK)api('ovv',{w:O.w,v}).catch(()=>{})}catch(e){}};const f0=C.opts[0].f,f1=C.opts[1].f,f2=C.opts[2].f;C.opts[0].f=function(){f0.apply(this,arguments);vote('f');(D.xk=D.xk||[]).includes(O.b)||D.xk.push(O.b)};C.opts[1].f=function(){f1.apply(this,arguments);vote('s')};C.opts[2].f=function(){f2.apply(this,arguments);vote('f');xwStart(D,O.b,'คุณข้ามรอยต่อไป')}}
  D.ov=null;D.ovDone=1;return true}
 return false}

// =====================================================================
// ตัวขับประจำปี (หลังผู้ลิขิต · ไม่แย่งพีค)
// =====================================================================
function yearly(){try{if(!S||!S.alive)return;const D=S._dr;if(!D||D.la3===age())return;D.la3=age();
 // ปีพิเศษ: ประกาศล่วงหน้า 1 ปี
 if(!D.yr||D.yr.at<age()){if(chance(.12)){const y=rp(yrList());D.yr={k:y.k,at:age()+1};omenLine(`🔮 ${y.ic} ${y.om} — ปีหน้าจะเป็น<b>${y.n}</b>`,'yr')}}
 else if(D.yr.at===age()){const y=yrList().find(x=>x.k===D.yr.k);if(y){try{ensureHeader();addFeed('ev',`${y.ic} ปีนี้คือ<b>${y.n}</b> — ทุกเรื่องในปีนี้เปลี่ยนไป`,'sum')}catch(e){}}}
 // วางแผนโลกทับซ้อน (ครึ่งหนึ่งของชีวิต) ตั้งแต่อายุ 16
 if(!D.ovRoll&&age()>=16){D.ovRoll=1;if(chance(.55))D.ovAt=age()+rnd(0,Math.max(4,Math.floor((Math.min(100,+(S.lifespan||80)))*.45)))}
 if(D.ovAt!=null&&age()>=D.ovAt&&!D.ov&&!D.ovDone){D.ovAt=null;ovPlan(D)}
 setTimeout(()=>{try{if(!S||!S.alive||busy())return;const D2=S._dr;if(!D2)return;
  if(D2.pl&&age()>=D2.pl.at-0)return; // ปีพีคของผู้ลิขิต
  if(D2.xv){xwYear(D2);return}
  if(D2.ov&&ovYear(D2))return;
  if(age()-D2.lb<1)return;
  const r=Math.random();
  if(r<(D2.md==='sh'?.2:.13)){npcEvent(D2);return}
  if(r<(D2.md==='sh'?.25:.17)&&age()>=14){xwEvent(D2);return}
 }catch(e){console.error('dir3 yearly',e)}},1900)}catch(e){console.error('dir3',e)}}
if(typeof passYear==='function'){const _p=passYear;passYear=function(){const r=_p.apply(this,arguments);try{yearly()}catch(e){}return r}}
// ระหว่างสลับร่างไปอีกโลก: เหตุการณ์สุ่มของโลกเดิมเงียบ (ตัวจริงไม่อยู่ที่นี่)
if(typeof randomEvent==='function'){const _re=randomEvent;randomEvent=function(){try{if(S&&S._dr&&S._dr.xv)return}catch(e){}return _re.apply(this,arguments)}}
setTimeout(ovLoad,4000);

const css=document.createElement('style');css.textContent=`.drTag{margin:0 0 8px;padding:6px 10px;border-radius:10px;background:rgba(255,200,90,.1);border:1px dashed rgba(255,200,90,.45);font-size:.84em;line-height:1.5}
#modal.drHurry{animation:drHurry 1s ease-in-out infinite}@keyframes drHurry{50%{box-shadow:0 0 0 3px #ff8a6a99,0 0 24px #ff5a3a66}}
body.mRM #modal.drHurry{animation:none}`;document.head.appendChild(css);
window._dir3={WEL,xwStart,xwEvent,npcEvent,ovPlan,ovYear,beat2,weekPair,curW};
try{wReady('dir3')}catch(e){}
})();
