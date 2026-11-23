// ============================================================
// /w/ghr.js 📜 เกมกฎผี — โลกผีไทย (ยุคปัจจุบัน) · โหลดต่อจาก mw.js (BLOCK 205 ใน app.js)
//  ทุก 3–5 ปี (อายุ 15+) ได้ "ซองแดง" เชิญเข้าด่าน · ไปหรือไม่ไปก็ได้ · ออโต้ = ไม่ไป
//  ด่าน: โรงเรียนเวรดึก · ตึก 3 โรงพยาบาล · ร้านสะดวกซื้อตีสาม · งานสวดคืนที่ 7 · (ลับ) ห้องของผู้เขียนกฎ
//  ใบกฎ: หมึกของ "เรา" ตามข้อ 1 · ข้อที่หมึกต่างคือกฎปลอม · ตีสองใบกฎเปลี่ยน · กฎขัดกันต้องตีความ
//  มินิเกม: ห้ามหันหลัง (กดค้าง) · ห้องเปลี่ยนไป (หาของที่ต่าง) · นับเสียงเคาะ · ห้ามขยับ
//  ระบบ: ค่าความชอบผีรายตัว (ผีจำคุณได้ข้ามด่าน) · เงินผี/ชื่อเสียงโลกผี · ตลาดผีเที่ยงคืน · แผลผี (ติดตัวในชีวิตจริง)
//        เบาะแส "ใครสร้างเกมนี้" ครบ 5 → ด่านลับ + ตอนจบ 3 แบบ · จั้มสแกร (ถามก่อนครั้งแรก เปลี่ยนได้)
//  สถานะ S._ghr · ตั้งค่า LS murim_ghrJS (1 เปิด / 0 ปิด)
// ============================================================
try{(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),rp=a=>a[Math.floor(Math.random()*a.length)],shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const E=s=>{try{return esc(String(s))}catch(e){return String(s)}};
const G=()=>{if(!S._ghr)S._ghr={next:15+rnd(0,2),runs:0,win:0,coin:0,fame:0,fav:{},it:{},scar:0,clue:[],seen:{},end:null,friend:null};const g=S._ghr;g.fav=g.fav||{};g.it=g.it||{};g.clue=g.clue||[];g.seen=g.seen||{};return g};
const JS=()=>{try{return LS.get('murim_ghrJS',null)}catch(e){return null}};
const money=n=>{try{return mwLocal?mwLocal(n*(mwCC?mwCC().rate:1),S.mw):fmt(n)+' บาท'}catch(e){return fmt(n)+' บาท'}};
const wOn=()=>{try{return !!(S&&S.alive&&S.mw&&!S.mw.kid&&window._wld&&window._wld.wOf(S.mw)==='ghost')}catch(e){return false}};
const say=(t,k)=>{try{log(t,k||'')}catch(e){}};

// ---------------- ผีประจำ (จำคุณได้ข้ามด่าน) ----------------
const GH={
 fai:{n:'น้องฝ้าย',ic:'👧',d:'เด็กหญิงชุดนักเรียนรุ่นเก่า ปกเสื้อเหลืองเพราะอายุ ยิ้มไม่เห็นฟัน'},
 lung:{n:'ลุงเสริม',ic:'👴',d:'ยามแก่ถือไฟฉายที่ไม่เคยเปิด เดินตรวจตลอดทั้งที่เกษียณไปสามสิบปีแล้ว'},
 cherd:{n:'พี่เชิด',ic:'👩‍⚕️',d:'พยาบาลเวรดึกที่หมวกพยาบาลแบบที่เลิกใช้ไปตั้งแต่ปี 2530'},
 pa:{n:'ป้าจำเนียร',ic:'🧓',d:'ลูกค้าประจำที่ซื้อธูปกับนมกล่องทุกคืนตอนตีสามสิบห้า'},
};
const favT=v=>v>=60?'ไว้ใจ':v>=30?'เอ็นดู':v>=10?'จำได้':v<=-20?'แค้น':'ไม่รู้จัก';
const fav=(k,d)=>{const g=G();g.fav[k]=Math.max(-50,Math.min(100,(g.fav[k]|0)+d))};

// ---------------- ด่าน ----------------
// กฎ: {id,t} · fake: รายชื่อกฎที่ "อาจ" เป็นกฎปลอม (สุ่ม 1 ข้อต่อรอบ) · late: กฎที่โผล่ตอนตีสอง · gone: กฎที่หายตอนตีสอง
// เหตุการณ์ e(F,R) → {t,x,o:[{t,ok,why,fav,clue,mg}]} · F = กฎปลอมรอบนี้ · ok=true รอด
const ST={
school:{n:'โรงเรียนเวรดึก',ic:'🏫',role:'นักเรียนที่ถูกลงชื่อให้ "อยู่เวรตึกเก่า" หนึ่งคืน',place:'ตึกไม้สามชั้นหลังโรงอาหาร',
 rules:[{id:1,t:'กฎทุกข้อในแผ่นนี้เขียนด้วยหมึกเดียวกับข้อนี้ ข้อที่หมึกต่าง ไม่ใช่ของเรา'},
  {id:2,t:'ครูเวรจะเรียกนักเรียนด้วย "เลขที่" เท่านั้น ถ้ามีเสียงเรียก "ชื่อจริง" ห้ามขานรับ ไม่ว่าเสียงนั้นจะคุ้นแค่ไหน'},
  {id:3,t:'ถ้าได้ยินกริ่งหมดคาบหลังเที่ยงคืน ให้กลับไปนั่งที่โต๊ะของตัวเองทันที'},
  {id:4,t:'ห้องน้ำชั้น 2 ปิดซ่อม ไม่ว่าจะได้ยินเสียงน้ำไหลแค่ไหนก็ตาม'},
  {id:5,t:'ถ้าเจอเด็กผู้หญิงชุดนักเรียนปกเหลือง ให้ทักทายเธออย่างสุภาพ เธอเป็นรุ่นพี่'},
  {id:6,t:'บันไดฝั่งตะวันตกมี 13 ขั้น ถ้านับได้ 14 ให้เดินถอยหลังลงไปจนสุด'},
  {id:7,t:'ห้ามเปิดไฟห้องโสตฯ ต่อให้มีคนขอร้องจากข้างใน'}],
 fake:[3,5,7],late:{id:8,t:'(เพิ่งมี) ถ้าโทรศัพท์คุณดังตอนตีสาม ให้รับ แล้วฟังเฉยๆ ห้ามพูดก่อน'},gone:4,
 ev:[
 (F)=>({t:'📢 เสียงเรียกจากโถงทางเดิน',x:'เสียงผู้หญิงที่ฟังเหมือนครูประจำชั้นเป๊ะ เรียก <b>ชื่อจริงนามสกุล</b> ของคุณดังมาจากปลายโถงมืด "มานี่หน่อย ครูมีเรื่องจะคุย"',
  o:[{t:'🙋 ขานรับ "ค่ะ/ครับ"',ok:false,why:'ครูเวรเรียกด้วยเลขที่เท่านั้น (กฎข้อ 2)'},{t:'🤐 นิ่ง ไม่ตอบ แล้วนั่งอยู่กับที่',ok:true,why:'เสียงเรียกชื่อจริงคือของที่ไม่ใช่ครู'},{t:'🔦 เดินไปดูว่าใคร',ok:false,why:'การเดินเข้าไปหาก็คือการตอบรับ'}]}),
 (F)=>({t:'🔔 กริ่งหมดคาบ',x:'นาฬิกาบอก 00:47 จู่ๆ กริ่งหมดคาบดังลั่นทั้งตึก ทั้งที่โรงเรียนตัดไฟกริ่งไปตั้งแต่สองทุ่ม',
  o:[{t:'🪑 รีบกลับไปนั่งที่โต๊ะตัวเอง',ok:!F.includes(3),why:F.includes(3)?'กฎข้อ 3 หมึกไม่เหมือนข้อ 1 — มันคือกฎของ "อีกฝ่าย" ที่โต๊ะคุณมีคนนั่งรออยู่แล้ว':'กฎข้อ 3 เป็นกฎจริง'},{t:'🚪 อยู่ตรงนี้ ไม่ขยับ',ok:F.includes(3),why:F.includes(3)?'คุณไม่ตามกฎปลอม':'ไม่ทำตามกฎข้อ 3'}]}),
 (F)=>({t:'👧 เด็กผู้หญิงปกเหลือง',x:'เด็กผู้หญิงยืนอยู่หน้าห้อง ม.2/4 ปกเสื้อเหลืองซีด เธอเอียงคอมองคุณ "เห็นกระเป๋าหนูไหม"',gh:'fai',
  o:[{t:'🙏 ทักอย่างสุภาพ "สวัสดีครับพี่ ไม่เห็นเลย"',ok:!F.includes(5),fav:F.includes(5)?0:12,why:F.includes(5)?'กฎข้อ 5 เป็นหมึกปลอม — ใครทักเธอก่อน เธอจะตามไปทั้งคืน':'เธอพยักหน้าแล้วเดินผ่านไป'},
   {t:'🙈 ทำเป็นไม่เห็น เดินผ่าน',ok:F.includes(5),fav:-5,why:F.includes(5)?'คุณไม่ตามกฎปลอม':'เธอเป็นรุ่นพี่ — การเมินคือการเสียมารยาท'},
   {t:'🎒 ช่วยหากระเป๋า',ok:true,fav:20,clue:'school',why:'ใต้โต๊ะครูมีกระเป๋านักเรียนเก่า ป้ายชื่อเขียนว่า "ฝ้าย ม.2/4 ปี 2531" — ในกระเป๋ามีกระดาษกฎแผ่นเดียวกับของคุณ ลายมือเดียวกัน'}]}),
 (F)=>({t:'🪜 บันไดฝั่งตะวันตก',x:'คุณต้องลงไปชั้นล่าง',mg:'count'}),
 (F)=>({t:'💧 ห้องน้ำชั้น 2',x:'เสียงน้ำไหลไม่หยุดจากห้องน้ำชั้น 2 ปนเสียงเด็กร้องไห้ "ช่วยปิดน้ำให้หน่อย น้ำล้นแล้ว"',
  o:[{t:'🚿 เข้าไปปิดน้ำ',ok:false,why:'ห้องน้ำชั้น 2 ปิดซ่อม (กฎข้อ 4) — ถึงกฎข้อ 4 จะหายไปตอนตีสอง แต่ประตูนั้นก็ยังไม่ใช่ประตูให้คนเปิด'},{t:'👂 อยู่นอกห้อง ตะโกนบอกว่าจะไปเรียกยาม',ok:true,fav:4,gh:'lung',why:'ลุงเสริมยามเก่าเดินมาปิดก๊อกให้แทน'}]}),
 (F)=>({t:'📽️ ห้องโสตฯ',x:'มีเสียงเคาะจากในห้องโสตทัศนศึกษา "มืดมาก เปิดไฟให้หน่อยได้ไหม หนูหาทางออกไม่เจอ"',
  o:[{t:'💡 เปิดไฟให้',ok:F.includes(7),why:F.includes(7)?'กฎข้อ 7 หมึกต่าง — เด็กในห้องติดอยู่จริง แสงไฟพาเธอออกมาได้':'กฎข้อ 7: ห้ามเปิดไฟห้องโสตฯ'},{t:'🚫 ไม่เปิด เดินจากมา',ok:!F.includes(7),why:F.includes(7)?'คุณทำตามกฎปลอม เสียงในห้องเงียบไปตลอดกาล':'ปลอดภัย'}]}),
 (F)=>({t:'⏪ ห้ามหันหลัง',x:'เสียงฝีเท้าเดินตามคุณมาตั้งแต่ชั้นสาม มันหยุดเมื่อคุณหยุด',mg:'hold'}),
 ]},
hosp:{n:'ตึก 3 โรงพยาบาล',ic:'🏥',role:'พยาบาลจบใหม่ที่ถูกจัดเวรดึกตึก 3 คืนแรก',place:'ตึกผู้ป่วยในเก่าที่เหลือเตียงเปิดอยู่ 6 เตียง',
 rules:[{id:1,t:'กฎของหอผู้ป่วยเขียนด้วยหมึกเดียวกับข้อนี้ ข้อไหนหมึกต่าง ห้ามทำตาม'},
  {id:2,t:'ตึกนี้มีผู้ป่วย 6 คน ถ้านับได้ 7 คน ให้ปิดม่านเตียงที่ไม่มีชื่อ แล้วอย่าเปิดอีก'},
  {id:3,t:'ถ้าลิฟต์หยุดที่ชั้น 4 ทั้งที่ไม่มีใครกด ห้ามเดินออก ตึกนี้มีแค่ 3 ชั้น'},
  {id:4,t:'พยาบาลที่ใส่หมวกพยาบาล คือหัวหน้าเวร ทำตามที่เธอบอก'},
  {id:5,t:'ห้ามให้ยาผู้ป่วยเตียง 6 หลังตีหนึ่ง ไม่ว่าเขาจะขอร้องแค่ไหน'},
  {id:6,t:'ถ้ามีญาติมาเยี่ยมหลังเที่ยงคืน ให้ถามชื่อผู้ป่วยที่มาเยี่ยม ถ้าตอบไม่ได้ ห้ามให้ผ่าน'},
  {id:7,t:'กริ่งเรียกพยาบาลจากห้องเก็บศพ ให้ไปตอบรับทุกครั้ง'}],
 fake:[4,7],late:{id:8,t:'(เพิ่งมี) ตอนตีสี่ห้ามมองกระจกในห้องพักพยาบาล ถ้าเห็นตัวเองยิ้ม ให้ยิ้มกลับ'},gone:5,
 ev:[
 (F)=>({t:'🛏️ นับผู้ป่วย',x:'ตีหนึ่ง คุณเดินตรวจเตียง',mg:'spot'}),
 (F)=>({t:'👩‍⚕️ พยาบาลใส่หมวก',x:'พยาบาลอาวุโสหมวกพยาบาลแบบโบราณเดินมาหา "น้อง เตียง 6 ปวดมาก ฉีดมอร์ฟีนให้เขาเดี๋ยวนี้ พี่สั่งเอง"',gh:'cherd',
  o:[{t:'💉 ทำตามหัวหน้าเวร',ok:false,why:F.includes(4)?'กฎข้อ 4 หมึกต่าง — เธอไม่ใช่หัวหน้าเวร':'กฎข้อ 4 ให้ทำตามเธอ แต่กฎข้อ 5 ห้ามให้ยาเตียง 6 หลังตีหนึ่ง — กฎที่เจาะจงกว่าชนะ'},
   {t:'🙅 ปฏิเสธอย่างสุภาพ อ้างกฎเตียง 6',ok:true,fav:F.includes(4)?-6:8,why:'เตียง 6 เงียบลงทันที พยาบาลคนนั้นยิ้มแบบแปลกๆ "ผ่าน"'},
   {t:'📋 ขอดูชื่อเธอที่ป้ายชื่อ',ok:true,fav:15,clue:'hosp',why:'ป้ายชื่อเขียน "เชิด รุ่นที่ 14" ด้านหลังป้ายมีตัวอักษรเดียวกับใบกฎของคุณเขียนว่า "ขอโทษนะ เราต้องการคนมาเล่นด้วย"'}]}),
 (F)=>({t:'🛗 ลิฟต์ชั้น 4',x:'ลิฟต์เปิดออก ไฟหน้าจอบอก "4" ข้างนอกเป็นโถงที่สว่างและสะอาดเกินไป มีเสียงเรียกชื่อคุณจากเคาน์เตอร์',
  o:[{t:'🚶 เดินออกไปดู',ok:false,why:'ตึกนี้มีแค่ 3 ชั้น (กฎข้อ 3)'},{t:'⬇️ กดปิดประตู กดชั้น 1 ค้างไว้',ok:true,why:'ประตูปิดช้ามาก… แต่มันปิด'}]}),
 (F)=>({t:'🧑‍🦳 ญาติผู้ป่วย',x:'ชายสวมสูทดำยืนหน้าเคาน์เตอร์ตอน 01:30 "มาเยี่ยมพ่อครับ"',
  o:[{t:'❓ ถามชื่อผู้ป่วยที่มาเยี่ยม',ok:true,why:'เขานิ่งไปนาน แล้วพูดชื่อ "คุณ" ออกมา — คุณไม่ให้ผ่าน เขาหายไปพร้อมไฟกะพริบ'},{t:'✅ ให้ผ่าน คนมาเยี่ยมพ่อคงไม่เป็นไร',ok:false,why:'กฎข้อ 6: ต้องถามชื่อก่อน'}]}),
 (F)=>({t:'🔔 กริ่งจากห้องเก็บศพ',x:'ไฟเรียกพยาบาลห้อง "เก็บศพ" กะพริบสีแดงซ้ำๆ',
  o:[{t:'🏃 ไปตอบรับตามกฎ',ok:!F.includes(7),why:F.includes(7)?'กฎข้อ 7 หมึกต่าง — คนที่กดกริ่งไม่ได้ต้องการพยาบาล':'ในห้องมีแต่ผู้ป่วยที่ขอบคุณที่มาตามสัญญา'},{t:'📵 ปล่อยให้กะพริบ',ok:F.includes(7),why:F.includes(7)?'คุณไม่หลงกฎปลอม':'กฎข้อ 7 สั่งให้ไปทุกครั้ง'}]}),
 (F)=>({t:'🫁 ห้ามขยับ',x:'เตียงที่ 7 ที่ไม่ควรมี เลื่อนผ่านหน้าคุณไปช้าๆ',mg:'still'}),
 ]},
cvs:{n:'ร้านสะดวกซื้อตีสาม',ic:'🏪',role:'พนักงานพาร์ทไทม์กะดึกสาขาปากซอย',place:'ร้านสะดวกซื้อ 24 ชม. ที่ลูกค้าหายไปหลังตีสอง',
 rules:[{id:1,t:'ประกาศถึงพนักงานกะดึก เขียนด้วยหมึกเดียวกับข้อนี้ ข้อที่หมึกต่าง ให้ฉีกทิ้ง'},
  {id:2,t:'ลูกค้าที่ซื้อธูปกับนมกล่องตอนตีสามสิบห้า ให้ทอนเงินเป็นเหรียญเท่านั้น ห้ามทอนแบงก์'},
  {id:3,t:'เสียงต้อนรับ "สวัสดีค่า" ดังโดยไม่มีคนเข้าร้าน ให้ตอบว่า "เชิญค่ะ" หนึ่งครั้ง'},
  {id:4,t:'ห้ามรับสินค้าที่วันหมดอายุเป็นวันในอดีต ไม่ว่าลูกค้าจะยืนยันแค่ไหน'},
  {id:5,t:'ถ้ากล้องวงจรปิดจอที่ 4 เห็นคนยืนในห้องเย็น แต่ห้องเย็นว่าง ให้ปิดจอ ห้ามไปดู'},
  {id:6,t:'ถ้ามีคนเคาะกระจกจากข้างนอกโดยที่ประตูเปิดอยู่ ห้ามมองหน้าเขา'},
  {id:7,t:'ลูกค้าที่จ่ายด้วยแบงก์สีเทา ให้รับไว้ แล้วใส่ลิ้นชักล่าง'}],
 fake:[3,7],late:{id:8,t:'(เพิ่งมี) ถ้าตู้เพลงในร้านเล่นเพลงลูกทุ่งเก่า ห้ามร้องตาม'},gone:2,
 ev:[
 (F)=>({t:'🧓 ป้าลูกค้าประจำ',x:'03:15 ป้าแก่ๆ วางธูปหนึ่งห่อกับนมกล่องบนเคาน์เตอร์ ยื่นแบงก์ร้อยสีซีดให้',gh:'pa',
  o:[{t:'🪙 ทอนเป็นเหรียญทั้งหมด',ok:true,fav:15,why:'ป้ายิ้ม "หนูเป็นเด็กดีนะ" แล้วหยอดเหรียญลงกระป๋องบริจาคหน้าร้านทีละเหรียญ'},{t:'💵 ทอนแบงก์ตามปกติ',ok:false,fav:-10,why:'กฎข้อ 2 — แบงก์ที่ทอนไปจะกลับมาที่ลิ้นชักคุณเปียกน้ำทุกคืน'},
   {t:'🧾 แอบดูชื่อบนใบเสร็จสมาชิกของป้า',ok:true,fav:5,clue:'cvs',why:'ชื่อบนบัตรสมาชิกคือ "จำเนียร" — ที่อยู่ตรงกับบ้านเลขที่ของ "เพื่อนสมัยเด็ก" ที่คุณลืมไปแล้ว'}]}),
 (F)=>({t:'🔔 เสียงต้อนรับลอยๆ',x:'"สวัสดีค่า~" ประตูอัตโนมัติไม่เปิด ไม่มีใครเข้ามา',
  o:[{t:'🗣️ "เชิญค่ะ"',ok:!F.includes(3),why:F.includes(3)?'กฎข้อ 3 หมึกต่าง — คุณเพิ่งเชิญของที่อยู่ข้างนอกเข้ามา':'มันได้คำตอบแล้วก็เงียบ'},{t:'🤫 เงียบ',ok:F.includes(3),why:F.includes(3)?'คุณไม่เชิญ':'เสียงนั้นดังซ้ำๆ จนรุ่งเช้า'}]}),
 (F)=>({t:'🥛 นมหมดอายุ',x:'ชายตัวซีดวางนมที่ฉลากหมดอายุ "12 มี.ค. 2531" "มันยังดีอยู่ ช่วยคิดเงินด้วย"',
  o:[{t:'❌ ปฏิเสธ ชี้วันหมดอายุ',ok:true,why:'เขามองฉลาก แล้วค่อยๆ จางหายไปพร้อมกล่องนม'},{t:'✅ คิดเงินให้',ok:false,why:'กฎข้อ 4'}]}),
 (F)=>({t:'📹 กล้องจอที่ 4',x:'จอกล้องที่ 4 เห็นใครบางคนยืนนิ่งในห้องเย็น หันหน้าเข้าหากล้อง',
  o:[{t:'🖥️ ปิดจอ',ok:true,why:'ตามกฎข้อ 5'},{t:'🚶 ไปดูห้องเย็น',ok:false,why:'ห้ามไปดู (กฎข้อ 5)'},{t:'🔍 ซูมกล้องดูหน้า',ok:false,jump:1,why:'มันยิ้ม'}]}),
 (F)=>({t:'🪟 เสียงเคาะกระจก',x:'ประตูอัตโนมัติเปิดค้าง แต่มีคนเคาะกระจกด้านนอก ก๊อก… ก๊อก…',mg:'knock'}),
 (F)=>({t:'💴 แบงก์สีเทา',x:'ลูกค้าเงียบๆ จ่ายด้วยแบงก์สีเทาหม่นที่ไม่มีหน้าใครพิมพ์อยู่',
  o:[{t:'🗄️ รับไว้ ใส่ลิ้นชักล่าง',ok:!F.includes(7),why:F.includes(7)?'กฎข้อ 7 หมึกต่าง — รับเงินผีคือรับหนี้ผี':'กฎของร้าน'},{t:'🙅 ปฏิเสธ ขอเงินจริง',ok:F.includes(7),why:F.includes(7)?'คุณไม่รับเงินปลอม':'ลูกค้ามองคุณนานมาก'}]}),
 ]},
fun:{n:'งานสวดคืนที่ 7',ic:'🕯️',role:'หลานคนเดียวที่ต้องเฝ้าศพคืนสุดท้ายของงานสวด',place:'ศาลาวัดชานเมือง ผู้ร่วมงานกลับไปหมดแล้ว',
 rules:[{id:1,t:'คำสั่งของคนเฝ้าศพเขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นไม่ใช่คำสั่งของคนเป็น'},
  {id:2,t:'ธูปหน้าโลงต้องไม่ดับจนรุ่งเช้า ถ้าดับให้จุดใหม่ด้วยมือซ้าย'},
  {id:3,t:'ถ้าได้ยินเสียงเคาะจากในโลง อย่าตอบ เขาแค่เคยชิน'},
  {id:4,t:'ถ้ามีแมวดำเดินเข้าศาลา ให้ให้อาหารมัน ห้ามไล่'},
  {id:5,t:'ห้ามนับคนที่นั่งฟังสวดหลังเที่ยงคืน'},
  {id:6,t:'ถ้าผู้ตายเรียกชื่อเล่นของคุณ ให้ตอบ เพราะเขาเป็นคนในครอบครัว'},
  {id:7,t:'ตอนตีสี่ พระจะมาสวด ให้กราบสามครั้ง ถ้าพระไม่มีเงา ให้กราบสี่ครั้ง'}],
 fake:[4,6],late:{id:8,t:'(เพิ่งมี) ถ้ามีคนมาขอบคุณที่มางาน ห้ามรับไหว้'},gone:5,
 ev:[
 (F)=>({t:'🪔 ธูปดับ',x:'ลมพัดวูบ ธูปทั้งสามดอกดับพร้อมกัน',
  o:[{t:'🫲 จุดใหม่ด้วยมือซ้าย',ok:true,why:'ควันลอยตรงขึ้นฟ้า'},{t:'🫱 จุดใหม่ด้วยมือขวา (ถนัดกว่า)',ok:false,why:'กฎข้อ 2 ระบุมือซ้าย'},{t:'😴 ปล่อยไว้ ค่อยจุดตอนเช้า',ok:false,why:'ธูปต้องไม่ดับจนรุ่งเช้า'}]}),
 (F)=>({t:'⚰️ เสียงจากในโลง',x:'ก๊อก ก๊อก ก๊อก จากใต้ฝาโลง แล้วเสียงคุ้นหูกระซิบ "…ตื่นหรือยัง"',
  o:[{t:'🤐 ไม่ตอบ นั่งสวดต่อ',ok:true,why:'กฎข้อ 3'},{t:'🗣️ "ตื่นแล้ว"',ok:false,why:'เขาแค่เคยชิน — แต่คุณไม่ใช่'}]}),
 (F)=>({t:'🐈‍⬛ แมวดำ',x:'แมวดำตัวผอมเดินเข้าศาลา มุ่งตรงไปที่โลง',
  o:[{t:'🍚 ให้อาหารตามกฎ',ok:!F.includes(4),why:F.includes(4)?'กฎข้อ 4 หมึกต่าง — แมวที่อิ่มแล้วจะกระโดดข้ามโลง':'แมวกินแล้วนอนขดหน้าโลงจนเช้า'},{t:'👋 ไล่ออกไป',ok:F.includes(4),why:F.includes(4)?'คุณไม่ให้แมวข้ามโลง':'กฎข้อ 4 ห้ามไล่'}]}),
 (F)=>({t:'👂 ชื่อเล่น',x:'เสียงจากรูปหน้าโลง เรียกชื่อเล่นที่มีแค่คนในบ้านเรียก "…มานี่ลูก"',
  o:[{t:'🙋 ตอบ "ครับ/ค่ะ"',ok:!F.includes(6),why:F.includes(6)?'กฎข้อ 6 หมึกต่าง — คนตายจะไม่เรียกให้ไปหา':'เสียงนั้นสั่งเสียสั้นๆ แล้วเงียบไป'},{t:'🙏 ไม่ตอบ กราบรูป',ok:F.includes(6),why:F.includes(6)?'คุณรู้ว่าไม่ควรตาม':'คนในครอบครัวรอคำตอบอยู่'},
   {t:'📷 ดูรูปหน้าโลงให้ชัดๆ',ok:true,clue:'fun',why:'คนในรูปไม่ใช่ญาติคุณ — เป็นเด็กผู้ชายรุ่นเดียวกับคุณ ใต้รูปเขียน "ด.ช. ที่จากไปปี 2541" ใบหน้าที่คุณเคยเห็นทุกวันตอนป.4'}]}),
 (F)=>({t:'🙇 พระตีสี่',x:'พระรูปหนึ่งเดินเข้ามาสวดตอนตีสี่ ไฟนีออนส่องจากด้านหลัง',mg:'shadow'}),
 (F)=>({t:'⏪ ห้ามหันหลัง',x:'ใครบางคนนั่งลงบนเก้าอี้แถวหลังทีละตัว ทีละตัว',mg:'hold'}),
 ]},
};
const SK=['school','hosp','cvs','fun','condo','train','dorm','cine','win','mkt','rent','live'];

// ---------------- UI ----------------
const css=document.createElement('style');css.textContent=`
#ghr{position:fixed;inset:0;z-index:99980;background:#07060a;color:#e9e2d4;font-family:inherit;display:flex;flex-direction:column;overflow:hidden}
#ghr::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 80% at 50% 30%,transparent 40%,#000 100%),repeating-linear-gradient(0deg,#ffffff05 0 1px,transparent 1px 3px);z-index:3}
#ghr.flk{animation:ghFlk .5s steps(2) 2}@keyframes ghFlk{50%{filter:brightness(.25) contrast(1.4)}}
#ghr .gTop{position:relative;z-index:4;display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top) + 10px) 12px 8px;border-bottom:1px solid #ffffff14}
#ghr .gClk{font-family:ui-monospace,monospace;font-size:20px;letter-spacing:2px;color:#ff6a5a;text-shadow:0 0 8px #ff2a1a88}
#ghr .gTt{flex:1;min-width:0;font-size:13px;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#ghr .gB{border:1px solid #ffffff2a;background:#ffffff0c;color:inherit;border-radius:10px;padding:7px 10px;font:inherit;font-size:13px}
#ghr .gBody{position:relative;z-index:4;flex:1;overflow:auto;padding:16px 14px 24px;max-width:620px;width:100%;margin:0 auto;box-sizing:border-box}
#ghr h2{margin:4px 0 8px;font-size:21px;color:#f3d6c8}#ghr .gx{font-size:15px;line-height:1.7;margin-bottom:14px}
#ghr .gO{display:block;width:100%;text-align:left;margin:8px 0;padding:13px 14px;border-radius:12px;border:1px solid #ffffff22;background:#ffffff08;color:inherit;font:inherit;font-size:15px;cursor:pointer;transition:transform .12s,background .2s}
#ghr .gO:active{transform:scale(.98);background:#ffffff14}#ghr .gO small{display:block;opacity:.6;font-size:12px;margin-top:2px}
#ghr .gMsg{padding:12px;border-radius:12px;margin:10px 0;font-size:14px;line-height:1.6}#ghr .gMsg.ok{background:#1d3a2a;border:1px solid #3a7a52}#ghr .gMsg.bad{background:#3a1414;border:1px solid #8a2a2a}#ghr .gMsg.cl{background:#2a2410;border:1px dashed #c9a24a}
#ghr .gSheet{background:#efe6cf;color:#1a1410;border-radius:6px;padding:16px 16px 12px;font-size:14.5px;line-height:1.7;box-shadow:0 6px 30px #000a;transform:rotate(-.6deg);font-family:'Itim','Sarabun',sans-serif}
#ghr .gSheet h3{margin:0 0 8px;font-size:17px;text-align:center;letter-spacing:1px}
#ghr .gSheet li{margin:6px 0}#ghr .gSheet .ink-k{color:#111}#ghr .gSheet .ink-b{color:#2349b8}#ghr .gSheet .ink-r{color:#a01818}
#ghr .gSheet .new{animation:ghNew 1.2s ease-out}#ghr .gSheet .gone{text-decoration:line-through;opacity:.35}@keyframes ghNew{from{filter:blur(3px);opacity:0}}
#ghr .gHint{font-size:12px;opacity:.65;margin-top:6px}
#ghr .gBar{height:10px;border-radius:6px;background:#ffffff14;overflow:hidden;margin:10px 0}#ghr .gBar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7a1a1a,#ff4a3a)}
#ghr .gGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}#ghr .gGrid button{aspect-ratio:1;font-size:34px;border-radius:12px;border:1px solid #ffffff22;background:#ffffff08;color:inherit}
#ghr .gHold{display:block;margin:18px auto;width:170px;height:170px;border-radius:50%;border:2px solid #ff4a3a88;background:radial-gradient(circle,#3a0a0a,#120404);color:#ffb0a0;font:inherit;font-size:16px;font-weight:700;touch-action:none;user-select:none;-webkit-user-select:none}
#ghr .gHold.on{box-shadow:0 0 0 6px #ff4a3a33,0 0 40px #ff2a1a66}
#ghr .gWhis{min-height:24px;text-align:center;font-style:italic;color:#ff9a8a;opacity:.9}
#ghr .gFake{position:absolute;z-index:6;padding:10px 16px;border-radius:999px;background:#c01818;color:#fff;border:0;font:inherit;font-weight:800;box-shadow:0 0 20px #ff000088;animation:ghPls .6s infinite alternate}@keyframes ghPls{to{transform:scale(1.08)}}
#ghr .gPills{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}#ghr .gPills span{font-size:12px;padding:4px 9px;border-radius:999px;background:#ffffff10;border:1px solid #ffffff1c}
#ghJS{position:fixed;inset:0;z-index:100100;pointer-events:none;background:#000;display:flex;align-items:center;justify-content:center;animation:ghJs .55s steps(6) forwards}
#ghJS canvas{width:min(92vw,92vh);height:min(92vw,92vh);image-rendering:pixelated;animation:ghZ .55s ease-out forwards}
@keyframes ghJs{0%,70%{opacity:1}100%{opacity:0}}@keyframes ghZ{from{transform:scale(.6) rotate(-3deg)}to{transform:scale(1.15) rotate(2deg)}}
body.ghShake{animation:ghSh .35s linear}@keyframes ghSh{20%{transform:translate(-6px,3px)}40%{transform:translate(5px,-4px)}60%{transform:translate(-4px,-2px)}80%{transform:translate(3px,4px)}}
body.hs-ghr :is(#mvBar,#mvRz,#mFloat,#islCards,#islDots,#tipCard){display:none!important}body.hs-ghr:not(.ghLie) #isl{display:none!important}
@media (prefers-reduced-motion:reduce){#ghr.flk,body.ghShake{animation:none}}`;document.head.appendChild(css);

// จั้มสแกร: หน้าผีพิกเซลวาดด้วยโค้ด
function jump(force){if(JS()!==1&&!force)return;try{const d=document.createElement('div');d.id='ghJS';const c=document.createElement('canvas');c.width=c.height=48;d.appendChild(c);document.body.appendChild(d);const g=c.getContext('2d');
 const P=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};let sd=7;const r=()=>(sd=(sd*9301+49297)%233280)/233280;
 P(0,0,48,48,'#020202');
 // หน้าซีดรูปไข่
 for(let y=8;y<44;y++){const w=Math.round(13*Math.sqrt(Math.max(0,1-Math.pow((y-25)/19,2))));const sh=y<20?'#b9bdb6':y<34?'#a7aba3':'#8d918a';P(24-w,y,w*2,1,sh)}
 // เบ้าตาลึก + แก้มตอบ
 P(13,19,8,7,'#3a3c38');P(27,19,8,7,'#3a3c38');P(14,20,6,5,'#0d0d0d');P(28,20,6,5,'#0d0d0d');P(16,22,2,2,'#f2f2f2');P(30,21,1,1,'#f2f2f2');P(17,23,1,1,'#ff1a1a');
 P(12,28,3,5,'#7f837c');P(33,28,3,5,'#7f837c');
 // ปากอ้ากว้างยาวลงคาง
 P(19,32,10,11,'#120202');P(20,33,8,9,'#2a0303');for(let x=20;x<28;x+=2){P(x,32,1,2,'#d9d6c8');P(x+1,41,1,2,'#d9d6c8')}
 // เลือด
 P(18,36,1,7,'#5a0000');P(29,35,1,9,'#5a0000');P(23,43,2,5,'#6a0000');
 // ผมยาวเปียกพาดหน้า
 for(let x=4;x<44;x++){const len=8+Math.floor(r()*36);const cx=Math.abs(x-24);if(cx<9&&r()<.55)continue;P(x,0,1,Math.min(48,len+(cx<14?0:10)),r()<.5?'#050505':'#0f0f10')}
 for(let k=0;k<7;k++){const x=15+Math.floor(r()*18);P(x,6,1,10+Math.floor(r()*24),'#060606')}
 // จอเพี้ยน
 for(let k=0;k<6;k++){const y=Math.floor(r()*48);g.drawImage(c,0,y,48,1,Math.floor(r()*5)-2,y,48,1)}
 try{sfx('bad');sfx('death')}catch(e){}try{navigator.vibrate&&navigator.vibrate([90,40,160])}catch(e){}document.body.classList.add('ghShake');setTimeout(()=>{d.remove();document.body.classList.remove('ghShake')},600)}catch(e){}}

let R=null; // รอบที่กำลังเล่น
const ov=()=>{let o=document.getElementById('ghr');if(!o){try{if(modalOpen&&!choice._cur)closeM()}catch(e){}o=document.createElement('div');o.id='ghr';document.body.appendChild(o)}return o};
const close=()=>{const o=document.getElementById('ghr');if(o)o.remove()};
const clk=h=>{const m=Math.round((h%1)*60);return String(Math.floor(h)%24).padStart(2,'0')+':'+String(m).padStart(2,'0')};
function frame(body){const o=ov();const s=ST[R.k];o.innerHTML=`<div class="gTop"><span class="gClk">${clk(R.h)}</span><span class="gTt">${s.ic} ${E(s.n)} · ${E(s.role)}</span><button class="gB" onclick="ghrSheet()">📜 ใบกฎ</button><button class="gB" onclick="ghrBag()">🎒</button></div><div class="gBody">${body}</div>`;o.querySelector('.gBody').scrollTop=0}
// ใบกฎ: หมึก "ของเรา" สุ่มต่อรอบ · ข้อปลอมใช้อีกสี
function sheetHTML(){const s=ST[R.k],ink=R.ink,fk=R.ink==='k'?'b':'k',late=R.h>=2&&R.h<10,show=s.rules.map(r=>({...r,c:R.F.includes(r.id)?(R.redF?'r':fk):ink,gone:late&&r.id===s.gone}));if(late)show.push({...s.late,c:ink,nw:1});
 const rev=R.rev&&R.F[0];
 return`<div class="gSheet"><h3>กฎของ${E(s.n)}</h3><ol style="margin:0;padding-left:20px">${show.map(r=>`<li class="ink-${r.c}${r.gone?' gone':''}${r.nw?' new':''}">${E(r.t)}${rev===r.id?' <b style="color:#a01818">← สายสิญจน์ขาดตรงนี้</b>':''}</li>`).join('')}</ol>${late?'<div style="font-size:12px;opacity:.6;margin-top:6px;text-align:right">— ใบกฎเปลี่ยนไปตอนตีสอง</div>':''}</div>`}
window.ghrSheet=function(){if(!R)return;const b=document.querySelector('#ghr .gBody');if(!b)return;const keep=b.innerHTML;b.innerHTML=sheetHTML()+`<p class="gHint">ข้อ 1 บอกว่าหมึกไหนคือของจริง · ตีความให้ดี กฎบางข้อชนกัน กฎที่เจาะจงกว่ามักชนะ</p><button class="gO" id="ghBk">↩️ กลับไป</button>`;b.querySelector('#ghBk').onclick=()=>{b.innerHTML=keep;wire()}};
window.ghrBag=function(){if(!R)return;const g=G(),b=document.querySelector('#ghr .gBody');if(!b)return;const keep=b.innerHTML;const I=Object.entries(g.it).filter(([k,v])=>v>0&&IT[k]);
 b.innerHTML=`<h2>🎒 ของติดตัว</h2>${I.length?I.map(([k,v])=>`<button class="gO" data-u="${k}">${IT[k].ic} ${IT[k].n} ×${v}<small>${IT[k].d}</small></button>`).join(''):'<p class="gx">ไม่มีของติดตัว — ไปตลาดผีตอนเที่ยงคืนได้ก่อนเข้าด่านครั้งหน้า</p>'}<button class="gO" id="ghBk">↩️ กลับไป</button>`;
 b.querySelectorAll('[data-u]').forEach(x=>x.onclick=()=>{const k=x.dataset.u;if(k==='sai'){if(R.rev){return toast('สายสิญจน์ขาดไปแล้วในรอบนี้')}g.it.sai--;R.rev=1;toast('🧵 สายสิญจน์ขาดตรงกฎข้อหนึ่ง… ดูในใบกฎ');ghrSheet();return}if(k==='rice'){if(R.skip){return toast('ใช้ไปแล้วในรอบนี้')}g.it.rice--;R.skip=1;toast('🍚 ข้าวก้นบาตร — เรื่องถัดไปจะผ่านไปเอง');b.innerHTML=keep;wire();return}toast('ของชิ้นนี้ทำงานเองเมื่อจำเป็น')});
 b.querySelector('#ghBk').onclick=()=>{b.innerHTML=keep;wire()}};
let wireFn=null;const wire=()=>{try{wireFn&&wireFn()}catch(e){}};
// ของจากตลาดผี
const IT={
 tak:{ic:'🪬',n:'ตะกรุดโบราณ',d:'ผิดกฎ 1 ครั้งไม่ถูกไล่ออก (ใช้เอง)',p:40},
 sai:{ic:'🧵',n:'สายสิญจน์',d:'บอกว่ากฎข้อไหนเป็นของปลอม (กดใช้ในด่าน)',p:30},
 rice:{ic:'🍚',n:'ข้าวก้นบาตร',d:'ข้ามเหตุการณ์ถัดไปโดยปลอดภัย (กดใช้ในด่าน)',p:25},
 nam:{ic:'💧',n:'น้ำมนต์',d:'ล้างแผลผีที่ติดตัว (ใช้ทันทีที่ซื้อ)',p:20},
 thoop:{ic:'🪔',n:'ธูปสามดอก',d:'ผีทุกตนเอ็นดูขึ้น +8 (ใช้ทันทีที่ซื้อ)',p:15},
};

// ---------------- เล่นด่าน ----------------
function start(k){const s=ST[k],g=G();const F=[rp(s.fake)];R={k,F,fl:{},ink:rp(['k','b']),redF:Math.random()<.5,h:22,i:0,ev:shuf(s.ev.map((_,i)=>i)).slice(0,s.climax?4:5),ok:0,tak:(g.it.tak|0)>0,lies:0,clue:null,skip:0,rev:0};
 // ผีที่ชอบคุณมาก แอบบอก
 const friend=Object.keys(g.fav).find(x=>g.fav[x]>=60);
 const late=(()=>{const h=new Date().getHours();return h>=0&&h<5})();
 frame(`<h2>${s.ic} ${E(s.n)}</h2><div class="gx">คุณลืมตาขึ้นใน${E(s.place)} ในฐานะ<b>${E(s.role)}</b><br>กระดาษแผ่นหนึ่งพับอยู่ในกระเป๋าเสื้อ ลายมือที่ไม่รู้ว่าใครเขียน<br><br>ต้องอยู่ให้ถึง <b>06:00</b> โดยไม่ทำผิดกฎ${late?`<br><br><span style="color:#ff8a7a">🕒 ข้างนอกจริงๆ ตอนนี้ก็ ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')} แล้วเหมือนกัน… ทำไมยังไม่นอนล่ะ</span>`:''}</div>
 ${sheetHTML()}${friend?`<div class="gMsg cl">${GH[friend].ic} ${GH[friend].n} กระซิบข้างหู "ข้อ ${F[0]} ไม่ใช่ของพวกเรา"</div>`:''}<button class="gO" id="ghGo">▶ เริ่มคืนนี้</button>`);
 document.getElementById('ghGo').onclick=()=>next()}
function next(){if(!R)return;const s=ST[R.k];if(R.i>=R.ev.length){if(s.climax&&!R.cl){R.cl=1;R.h=5;const c=s.climax(R.F,R);if(c)return show(c)}return finish(true)}R.h=22+(R.i+1)*(7/(R.ev.length+1));
 let e=s.ev[R.ev[R.i]](R.F,R);R.i++;if(!e)return next();const hh=R.h%24;
 // ตีสอง: ใบกฎเปลี่ยน
 if(!R.chg&&hh>=2&&hh<10){R.chg=1;return interlude(`<div class="gMsg cl">📜 กระดาษในกระเป๋าอุ่นขึ้นมาเอง… <b>ใบกฎเปลี่ยนไป</b> มีข้อหนึ่งหายไป และมีข้อใหม่เพิ่มเข้ามา</div>${sheetHTML()}`,()=>show(e))}
 // ระบบโกหก (ไดนามิกไอส์แลนด์ปลอม) ครั้งเดียวต่อรอบ
 if(!R.lie&&R.i===2){R.lie=1;const truthy=s.rules.find(r=>!R.F.includes(r.id)&&r.id>1);document.body.classList.add('ghLie');setTimeout(()=>document.body.classList.remove('ghLie'),4400);try{island({ghr:1,big:1,pri:1,ic:'⚠️',h:'ระบบ',t:`อย่าเชื่อกฎข้อ ${truthy?truthy.id:2} มันถูกแก้ไขแล้ว`,kind:'bad',ms:4200})}catch(x){}}
 show(e)}
function interlude(h,go){frame(h+'<button class="gO" id="ghNx">▶ ต่อ</button>');document.getElementById('ghNx').onclick=go}
function show(e){if(R.skip===1){R.skip=2;return interlude(`<div class="gMsg ok">🍚 ข้าวก้นบาตรในกระเป๋าร่วงหล่น… <b>${E(e.t)}</b> ผ่านไปเฉยๆ เหมือนไม่มีใครเห็นคุณ</div>`,next)}
 if(e.mg)return MG[e.mg](e);
 const gh=e.gh&&GH[e.gh],g=G();const fv=gh?(g.fav[e.gh]|0):0;
 frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}${gh&&fv?`<br><span class="gHint">${gh.ic} ${gh.n} · ${favT(fv)} (${fv})</span>`:''}</div><div id="ghOs">${e.o.map((o,i)=>`<button class="gO" data-i="${i}">${o.t}</button>`).join('')}</div>`);
 const bind=()=>document.querySelectorAll('#ghOs .gO').forEach(b=>b.onclick=()=>pick(e,e.o[+b.dataset.i]));bind();wireFn=bind;
 // ปุ่มสลับที่เอง (ครั้งเดียวต่อรอบ)
 if(!R.swp&&e.o.length>=2&&Math.random()<.35){R.swp=1;setTimeout(()=>{const w=document.getElementById('ghOs');if(!w)return;const bs=[...w.children];if(bs.length<2)return;w.insertBefore(bs[1],bs[0]);document.getElementById('ghr').classList.add('flk');setTimeout(()=>{const o=document.getElementById('ghr');o&&o.classList.remove('flk')},1000)},1400)}}
function pick(e,o){const g=G();if(o.gfl){g.flg=g.flg||{};Object.assign(g.flg,o.gfl)}if(o.fl)Object.assign(R.fl,o.fl);if(o.mate){g.mate=g.mate||{t:0};g.mate.t=(g.mate.t|0)+o.mate}if(typeof o.f==='function'){try{const r=o.f(R,g);if(r&&r.ok!=null){o=Object.assign({},o,r)}}catch(x){console.error(x)}}if(o.fav&&e.gh)fav(e.gh,o.fav);if(o.gh&&o.fav)fav(o.gh,o.fav);if(o.clue&&!g.clue.includes(o.clue)){g.clue.push(o.clue);R.clue=o.clue}
 if(o.jump)jump();
 if(o.ok){R.ok++;interlude(`<div class="gMsg ok">✅ ${E(o.why||'รอด')}</div>${o.clue&&R.clue===o.clue?`<div class="gMsg cl">🧩 <b>เบาะแส ${g.clue.length}/5</b> — ใครเป็นคนเขียนกฎ?</div>`:''}`,next);return}
 fail(o.why||'ผิดกฎ')}
function fail(why){const g=G();if(R.tak&&(g.it.tak|0)>0){g.it.tak--;R.tak=0;return interlude(`<div class="gMsg bad">⚠️ ${E(why)}</div><div class="gMsg ok">🪬 ตะกรุดในกระเป๋าร้อนจนแสบ… แล้วแตกออกเป็นสองท่อน <b>คุณยังไม่ถูกไล่ออก</b></div>`,next)}
 jump();setTimeout(()=>finish(false,why),JS()===1?650:0)}
function finish(win,why){const g=G(),s=ST[R.k];g.runs++;let h='';
 if(win){g.win++;const rw=Math.round((18000+R.ok*6000)*(1+g.win*.08)),cn=rnd(14,24)+R.ok*2,fm=10+R.ok*3;try{S.money=(+S.money||0)+rw}catch(e){}g.coin+=cn;g.fame+=fm;try{if(S.mw)S.mw.fame=(S.mw.fame||0)+fm*40}catch(e){}
  h=`<h2>🌅 06:00</h2><div class="gx">แสงแรกลอดเข้ามา ใบกฎในมือกลายเป็นขี้เถ้าร่วงลงพื้น คุณลืมตาขึ้นบนเตียงของตัวเอง</div><div class="gPills"><span>💰 ${money(rw)}</span><span>🪙 เงินผี +${cn}</span><span>👻 ชื่อเสียงโลกผี +${fm}</span></div>`;
  if(R.fl.mateDead)h+=`<div class="gMsg bad">🕯️ พี่โจ้ไม่ได้กลับมาด้วย…</div>`;else if(R.fl.mate)h+=`<div class="gMsg ok">🤝 พี่โจ้รอดมาด้วย · ความไว้ใจ ${MT().t}</div>`;
  say(`📜 <b>รอดจากเกมกฎผี: ${s.n}</b> ทำตามกฎถูก ${R.ok} เรื่อง · ได้ ${money(rw)} · เงินผี +${cn} · ชื่อเสียงโลกผี +${fm}`,'epic');try{sfx('good')}catch(e){}}
 else{g.scar=Math.max(g.scar,rnd(2,4));const cn=rnd(0,4);g.coin+=cn;h=`<h2>❌ ถูกไล่ออกจากด่าน</h2><div class="gMsg bad">${E(why)}</div><div class="gx">คุณสะดุ้งตื่นตอนตีห้า ใบกฎเปียกเหงื่อ ข้อที่คุณทำผิดถูกวงด้วยหมึกแดง<br>มีบางอย่างตามคุณกลับมาด้วย — <b>🩸 แผลผี ${g.scar} ปี</b> (ฝันร้าย โชคตก) จนกว่าจะล้างด้วยน้ำมนต์</div>`;
  say(`📜 <b>ตกรอบเกมกฎผี: ${s.n}</b> — ${why} · ติด 🩸 แผลผี ${g.scar} ปี`,'bad')}
 g.seen[R.k]=(g.seen[R.k]|0)+1;if(R.fl.mateDead){g.mate=g.mate||{};g.mate.dead=(g.mate.dead|0)+1}
 const fin=g.clue.length>=5&&!g.end;
 frame(h+(fin?`<div class="gMsg cl">🧩 เบาะแสครบแล้ว… ใบกฎแผ่นใหม่ลอยมาตกตรงหน้า มีบรรทัดเดียว <b>"ห้องสุดท้าย เปิดคืนนี้"</b></div><button class="gO" id="ghEnd">🚪 ไปห้องสุดท้ายเลย</button>`:'')+`<button class="gO" id="ghX">🛏️ กลับสู่ชีวิตจริง</button>`);
 document.getElementById('ghX').onclick=()=>{R=null;close();try{render()}catch(e){}};
 const be=document.getElementById('ghEnd');if(be)be.onclick=()=>finale();R.done=1}

// ---------------- มินิเกม ----------------
const MG={
 // ห้ามหันหลัง: กดค้าง 6 วิ · มีเสียงยั่วให้ปล่อย
 hold(e){let t=0,on=0,iv=0,dead=0;const W=['…หันมาสิ','ข้างหลังคุณมีแม่ยืนอยู่นะ','ของคุณหล่นอยู่ข้างหลังแน่ะ','ทำไมไม่มองล่ะ','มองแค่แวบเดียวก็ได้','อีกนิดเดียว…'];
  frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>กดปุ่มค้างไว้จนแถบเต็ม</b> = เดินต่อโดยไม่หันหลัง · ปล่อยมือ = หันไปมอง</div><div class="gBar"><i id="ghHb"></i></div><div class="gWhis" id="ghW"></div><button class="gHold" id="ghH">กดค้าง<br>อย่าหันหลัง</button>`);
  const b=document.getElementById('ghH'),bar=document.getElementById('ghHb'),w=document.getElementById('ghW');
  const tick=()=>{if(!on||dead)return;t+=.1;bar.style.width=Math.min(100,t/6*100)+'%';if(Math.random()<.12)w.textContent=rp(W);if(t>=6){clearInterval(iv);dead=1;R.ok++;interlude('<div class="gMsg ok">✅ เสียงฝีเท้าหยุดอยู่ที่บันไดขั้นสุดท้าย คุณไม่ได้หันไป</div>',next)}};
  const dn=ev=>{ev.preventDefault();if(dead)return;on=1;b.classList.add('on');if(!iv)iv=setInterval(tick,100)};
  const up=()=>{if(dead||!on)return;on=0;b.classList.remove('on');if(t>.3){dead=1;clearInterval(iv);fail('คุณหันไปมอง')}};
  b.addEventListener('pointerdown',dn);addEventListener('pointerup',up,{once:false});b.addEventListener('pointerleave',up);b.addEventListener('pointercancel',up)},
 // ห้องเปลี่ยนไป: จำของ 9 อย่าง แล้วหาชิ้นที่เปลี่ยน
 spot(e){const P=['🛏️','💉','🩺','🪑','🕯️','🧸','📋','🩹','🧴','🪞','🖼️','⏰'],a=shuf(P).slice(0,9),x=rnd(0,8),nw=rp(P.filter(p=>!a.includes(p))),b=a.slice();b[x]=nw;
  frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>จำห้องนี้ไว้</b> — อีกสักครู่จะมีของชิ้นหนึ่งเปลี่ยนไป</div><div class="gGrid" id="ghG">${a.map(p=>`<button disabled>${p}</button>`).join('')}</div><div class="gBar"><i id="ghSb" style="transition:width 4s linear"></i></div>`);
  requestAnimationFrame(()=>{const s=document.getElementById('ghSb');if(s)s.style.width='100%'});
  setTimeout(()=>{const gd=document.getElementById('ghG');if(!gd)return;document.getElementById('ghr').classList.add('flk');gd.innerHTML=b.map((p,i)=>`<button data-i="${i}">${p}</button>`).join('');const t=document.querySelector('#ghr .gx');if(t)t.innerHTML='ไฟกะพริบ… <b>อะไรเปลี่ยนไป?</b> แตะของชิ้นนั้น';
   gd.querySelectorAll('button').forEach(z=>z.onclick=()=>{if(+z.dataset.i===x){R.ok++;interlude(`<div class="gMsg ok">✅ ${b[x]} ไม่เคยอยู่ในห้องนี้ คุณปิดม่านเตียงที่เจ็ดแล้วไม่เปิดอีก</div>`,next)}else fail(`ของที่เปลี่ยนคือ ${b[x]} — คุณปิดม่านผิดเตียง`)})},4000)},
 // นับเสียงเคาะ → ตัดสินใจตามกฎ
 knock(e){const n=rnd(3,6);let i=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>นับเสียงเคาะให้ดี</b></div><div style="text-align:center;font-size:64px;height:90px" id="ghK">🪟</div>`);
  const k=document.getElementById('ghK');const iv=setInterval(()=>{if(!k.isConnected)return clearInterval(iv);if(i>=n){clearInterval(iv);ask();return}i++;k.textContent='💥';try{sfx('click')}catch(x){}setTimeout(()=>{if(k.isConnected)k.textContent='🪟'},260)},620+rnd(0,260));
  const ask=()=>{const os=shuf([n,n+1,n-1,n+2]).slice(0,3);if(!os.includes(n))os[0]=n;frame(`<h2>${E(e.t)}</h2><div class="gx">เสียงเงียบไป… มันเคาะกี่ครั้ง? <br><span class="gHint">ถ้าเลขคู่ เขาคือคนที่หลงมา ให้บอกทางได้โดยไม่มองหน้า · ถ้าเลขคี่ ห้ามมองหน้า (กฎข้อ 6) และห้ามพูด</span></div>${shuf(os).map(v=>`<button class="gO" data-v="${v}">${v} ครั้ง</button>`).join('')}`);
   document.querySelectorAll('#ghr [data-v]').forEach(b=>b.onclick=()=>{if(+b.dataset.v!==n)return fail(`มันเคาะ ${n} ครั้ง — คุณนับพลาด แล้วเงยหน้าขึ้นมองพอดี`);
    frame(`<h2>${E(e.t)}</h2><div class="gx">${n} ครั้ง — ${n%2?'<b>เลขคี่</b>':'<b>เลขคู่</b>'} จะทำยังไง?</div><button class="gO" id="a1">👇 ก้มหน้า ไม่พูดอะไร</button><button class="gO" id="a2">🗣️ ก้มหน้า แล้วบอกทางไปปากซอย</button><button class="gO" id="a3">👀 เงยหน้ามอง</button>`);
    document.getElementById('a1').onclick=()=>{R.ok++;interlude(`<div class="gMsg ok">✅ ${n%2?'เสียงเคาะหยุด แล้วมีลมเย็นพัดผ่านไป':'คนข้างนอกยืนรอสักพัก แล้วเดินจากไปเอง'}</div>`,next)};
    document.getElementById('a2').onclick=()=>n%2?fail('เลขคี่ — ห้ามพูด มันจำเสียงคุณได้แล้ว'):(R.ok++,fav('pa',6),interlude('<div class="gMsg ok">✅ "ขอบใจนะหนู" — เสียงป้าจำเนียร เธอหลงทางมาตั้งแต่ปี 2541</div>',next));
    document.getElementById('a3').onclick=()=>{jump();fail('กฎข้อ 6: ห้ามมองหน้าเขา')}})}},
 // ห้ามขยับ: 5 วิห้ามแตะ · มีปุ่มหลอก "หนี!"
 still(e){let dead=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>ห้ามแตะหน้าจอ</b> จนกว่ามันจะผ่านไป</div><div class="gBar"><i id="ghBb" style="transition:width 5s linear"></i></div><div class="gWhis" id="ghW2">…</div>`);
  requestAnimationFrame(()=>{const s=document.getElementById('ghBb');if(s)s.style.width='100%'});const o=document.getElementById('ghr');
  const tap=ev=>{if(dead)return;dead=1;o.removeEventListener('pointerdown',tap,true);fail(ev.target&&ev.target.classList.contains('gFake')?'ปุ่มนั้นไม่ใช่ของคุณ — คุณขยับ':'คุณขยับ')};
  setTimeout(()=>o.addEventListener('pointerdown',tap,true),150);
  setTimeout(()=>{if(dead)return;const f=document.createElement('button');f.className='gFake';f.textContent='🏃 หนี!';f.style.left=rnd(15,60)+'%';f.style.top=rnd(45,70)+'%';o.appendChild(f);const w=document.getElementById('ghW2');if(w)w.textContent='มันหันมาทางคุณแล้ว!!'},1800);
  setTimeout(()=>{if(dead)return;dead=1;o.removeEventListener('pointerdown',tap,true);R.ok++;interlude('<div class="gMsg ok">✅ เตียงเลื่อนผ่านไป ล้อเหล็กครูดพื้นจนสุดทางเดิน แล้วเงียบ</div>',next)},5200)},
 // บันได: นับขั้น
 count(e){const n=Math.random()<.5?13:14;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br>คุณนับขั้นบันไดทีละขั้นในความมืด…</div><div style="text-align:center;font-size:44px;font-family:monospace" id="ghC">0</div>`);let i=0;const c=document.getElementById('ghC');
  const iv=setInterval(()=>{if(!c.isConnected)return clearInterval(iv);i++;c.textContent=i;if(i>=n){clearInterval(iv);setTimeout(()=>{frame(`<h2>${E(e.t)}</h2><div class="gx">นับได้ <b>${n}</b> ขั้น แล้วเท้าก็แตะพื้น</div><button class="gO" id="b1">🚶 เดินต่อไปตามปกติ</button><button class="gO" id="b2">🔙 เดินถอยหลังลงไปจนสุด</button>`);
   document.getElementById('b1').onclick=()=>n===13?(R.ok++,interlude('<div class="gMsg ok">✅ 13 ขั้น ปกติดี</div>',next)):fail('14 ขั้น — ขั้นที่เกินคือหลังของใครบางคน');
   document.getElementById('b2').onclick=()=>n===14?(R.ok++,interlude('<div class="gMsg ok">✅ คุณถอยหลังลงไปจนสุด ขั้นที่ 14 หายไปตอนเท้าแตะพื้น</div>',next)):fail('13 ขั้น แต่คุณเดินถอยหลัง — สิ่งที่เดินตามหลังมาเลยได้อยู่ข้างหน้าคุณ')},400)}},360)},
 // พระไม่มีเงา
 shadow(e){const sh=Math.random()<.5;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}</div><div style="position:relative;height:150px;border-radius:12px;background:linear-gradient(#2a2418,#0e0c08);overflow:hidden"><div style="position:absolute;left:44%;top:22px;font-size:60px">🧘</div>${sh?'<div style="position:absolute;left:41%;bottom:8px;width:80px;height:16px;border-radius:50%;background:#000c;filter:blur(3px)"></div>':''}</div><div class="gx">ดูให้ดี แล้วกราบ</div><button class="gO" id="c3">🙇 กราบสามครั้ง</button><button class="gO" id="c4">🙇 กราบสี่ครั้ง</button>`);
  document.getElementById('c3').onclick=()=>sh?(R.ok++,interlude('<div class="gMsg ok">✅ พระสวดจบแล้วให้พร "ไปดีมาดี"</div>',next)):fail('พระรูปนั้นไม่มีเงา — ต้องกราบสี่ครั้ง');
  document.getElementById('c4').onclick=()=>!sh?(R.ok++,interlude('<div class="gMsg ok">✅ ครั้งที่สี่ คุณเงยหน้าขึ้น… ไม่มีใครอยู่บนอาสนะแล้ว</div>',next)):fail('พระมีเงา — กราบสี่ครั้งคือกราบศพ')}
};

// ---------------- ด่านเพิ่ม (ชุด 2): คอนโดชั้น 13 · รถไฟสายสุดท้าย · หอพักหญิง · โรงหนังสแตนด์อโลน ----------------
// เพื่อนร่วมชะตา "พี่โจ้" (ผู้เล่นมนุษย์อีกคนที่ติดอยู่ในเกม) โผล่หลายด่าน · ความไว้ใจ g.mate.t ข้ามด่าน · จุดพีคท้ายด่าน (climax) เปลี่ยนตามที่เลือกระหว่างคืน
const MT=()=>{const g=G();g.mate=g.mate||{t:0};return g.mate};
Object.assign(GH,{yai:{n:'ยายผัน',ic:'👵',d:'ยายห้อง 1309 ที่ยืมเกลือทุกคืน ทั้งที่ห้องนั้นว่างมาตั้งแต่ไฟไหม้'},mind:{n:'มายด์',ic:'🧑‍🎓',d:'รูมเมตเสียงเบาที่ตื่นก่อนคุณทุกเช้า แต่ไม่มีใครในหอรู้จักชื่อนี้'},noi:{n:'น้องน้อย',ic:'🧒',d:'เด็กขายพวงมาลัยบนรถไฟสายสุดท้าย ผมเปียกน้ำตลอดเวลา'},chai:{n:'ลุงชัย',ic:'🎞️',d:'คนฉายหนังรุ่นแรกของโรงหนัง ยังนั่งอยู่ในห้องฉายทุกรอบเที่ยงคืน'}});
Object.assign(ST,{
condo:{n:'คอนโดชั้น 13',ic:'🏢',role:'ลูกบ้านใหม่ห้อง 1307 ทั้งที่ลิฟต์ตึกนี้ไม่มีปุ่มชั้น 13',place:'คอนโดเก่าย่านรัชดา ทางเดินไฟเซ็นเซอร์ที่ติดช้ากว่าที่ควร',
 rules:[{id:1,t:'ประกาศนิติบุคคลถึงลูกบ้านชั้น 13 เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นไม่ใช่ประกาศของเรา'},
  {id:2,t:'ถ้าลิฟต์พาคุณมาชั้น 13 เอง ห้ามออก ให้กดชั้นของตัวเองตามลำดับในบัตรคีย์การ์ด'},
  {id:3,t:'ถ้ายายห้อง 1309 เคาะขอเกลือ ให้ส่งผ่านช่องประตูที่คล้องโซ่ไว้ ห้ามปลดโซ่'},
  {id:4,t:'นิติบุคคลไม่โทรหาลูกบ้านหลังสี่ทุ่ม ถ้ามีสายจากนิติ ให้รับ แต่ห้ามพูดก่อน'},
  {id:5,t:'ถ้าน้ำก๊อกเป็นสีแดง ให้ปิดก๊อกทันทีแล้วอย่าเปิดอีกจนเช้า'},
  {id:6,t:'ถ้าได้ยินเสียงเด็กวิ่งบนเพดาน ให้เคาะเพดานตอบสามครั้ง'},
  {id:7,t:'ห้ามมองผ่านตาแมวหลังตีสาม ไม่ว่าเสียงข้างนอกจะเป็นใคร'}],
 fake:[5,6],late:{id:8,t:'(เพิ่งมี) ถ้ามีข้อความในไลน์กลุ่มลูกบ้านจากห้อง 1313 ห้ามกดอ่าน'},gone:3,
 ev:[
 (F)=>({t:'🛗 ลิฟต์ที่ไม่ฟัง',x:'คุณกดชั้น 12 แต่ลิฟต์ขึ้นไปเรื่อยๆ จอบอก "13" ประตูเปิดออกสู่โถงที่ไฟดับ บัตรคีย์การ์ดในมือคุณสลักตัวเลขเล็กๆ ไว้ด้านหลัง',mg:'elev'}),
 (F,R)=>({t:'🧂 ยายห้อง 1309',x:'ก๊อก ก๊อก "หนู… ยายขอเกลือหน่อย ยายจะทำกับข้าวให้หลาน"',gh:'yai',
  o:[{t:'🔗 ส่งเกลือผ่านช่องประตู โซ่ยังคล้องอยู่',ok:true,fav:15,fl:{salt:1},gfl:{yai:1},why:'มือเหี่ยวๆ รับถุงเกลือไป "ขอบใจนะลูก คืนนี้อย่าใช้ลิฟต์ตอนตีห้า"'},
   {t:'🚪 ปลดโซ่ เปิดประตูให้ยายเข้ามา',ok:false,why:'กฎข้อ 3 — ยายไม่ได้อยากได้เกลือ'},
   {t:'🙉 เงียบ ทำเป็นไม่อยู่',ok:true,fav:-8,why:'เสียงเคาะหยุดไปนาน แล้วมีเสียงร้องไห้ค่อยๆ ไกลออกไปตามทางเดิน'}]}),
 (F)=>({t:'☎️ สายจากนิติบุคคล',x:'โทรศัพท์บ้านดังตอน 01:12 หน้าจอขึ้น "นิติบุคคล"',mg:'phone'}),
 (F)=>({t:'🚰 น้ำสีแดง',x:'คุณเปิดก๊อกล้างหน้า น้ำที่ไหลออกมาสีแดงคล้ำ มีกลิ่นสนิม',
  o:[{t:'🔒 ปิดก๊อกทันที',ok:!F.includes(5),why:F.includes(5)?'กฎข้อ 5 หมึกต่าง — น้ำที่ค้างในท่อจะไหลกลับขึ้นมาเองตอนคุณหลับ':'ห้องน้ำเงียบไปจนเช้า'},{t:'💧 ปล่อยให้ไหลจนใส',ok:F.includes(5),why:F.includes(5)?'น้ำค่อยๆ ใสขึ้น เศษผมยาวๆ ไหลลงท่อไปจนหมด':'กฎข้อ 5 ให้ปิดทันที — เสียงไหลกลายเป็นเสียงหัวเราะ'}]}),
 (F)=>({t:'👣 เด็กวิ่งบนเพดาน',x:'ตึก ตึก ตึก เสียงเท้าเล็กๆ วิ่งไปมาบนเพดาน ทั้งที่ห้องคุณอยู่ชั้นบนสุด',
  o:[{t:'✊ เคาะเพดานตอบสามครั้ง',ok:!F.includes(6),why:F.includes(6)?'กฎข้อ 6 หมึกต่าง — มีคนเคาะตอบกลับมาสี่ครั้ง จากใต้เตียงคุณ':'เสียงวิ่งหยุด แล้วมีเสียงหัวเราะคิกคักแบบพอใจ'},{t:'🛌 ไม่ตอบ คลุมโปง',ok:F.includes(6),why:F.includes(6)?'เด็กวิ่งไปเล่นที่อื่น':'เสียงวิ่งดังขึ้นเรื่อยๆ จนเพดานร้าว'}]}),
 (F,R)=>({t:'🧍 พี่โจ้ห้อง 1305',x:'ผู้ชายใส่ชุดพนักงานออฟฟิศเคาะห้องคุณ มือสั่น ถือกระดาษกฎที่หน้าตาเหมือนของคุณ "น้อง… ได้ใบนี้เหมือนกันใช่ไหม พี่อ่านไม่ออกว่าข้อไหนจริง"',
  o:[{t:'🤝 เปิดใบกฎให้ดูด้วยกัน อธิบายเรื่องหมึก',ok:true,mate:2,fl:{mate:1},why:'พี่โจ้ถอนหายใจยาว "ขอบใจนะ พี่ติดอยู่ในเกมนี้มาสามรอบแล้ว"'},
   {t:'🔍 ขอดูใบกฎของพี่ก่อน',ok:true,mate:1,fl:{mate:1},clue:'condo',why:'ท้ายกระดาษของพี่โจ้มีบรรทัดที่ของคุณไม่มี ลายมือเด็ก: "ชั้น 13 ไฟไหม้ ปี 2541 ไม่มีใครมาช่วย"'},
   {t:'🚪 ปิดประตูใส่ อาจเป็นของปลอม',ok:true,mate:-2,why:'คุณได้ยินเขาเดินจากไป เสียงฝีเท้าเดียว… แล้วกลายเป็นสอง'}]}),
 ],
 climax:(F,R)=>{const m=MT();const ok=R.fl.salt||m.t>=2;return{t:'🔥 สัญญาณเตือนไฟไหม้ 05:00',x:`กริ่งไฟไหม้ดังลั่นทั้งตึก ควันลอยมาตามช่องใต้ประตู${R.fl.mate?` พี่โจ้ตะโกนจากทางเดิน "ลงลิฟต์! เร็วกว่า!"`:''}${R.fl.salt?'<br><span class="gHint">👵 คุณจำได้ — ยายบอกว่าอย่าใช้ลิฟต์ตอนตีห้า</span>':''}`,
  o:[{t:'🛗 วิ่งไปลิฟต์',ok:false,f:()=>({why:R.fl.mate?'ลิฟต์ลงไปชั้น 13… ที่ซึ่งไฟยังไม่เคยดับตั้งแต่ปี 2541':'ลิฟต์เปิดออกที่ชั้น 13 ประตูไม่ยอมปิด'})},
   {t:'🪜 ลงบันไดหนีไฟ',ok:true,f:()=>{if(R.fl.mate&&m.t<2){R.fl.mateDead=1;return{why:'คุณลงบันไดมาได้ แต่พี่โจ้วิ่งเข้าลิฟต์ไปแล้ว… ตอนเช้าไม่มีใครในตึกรู้จักลูกบ้านห้อง 1305'}}return{why:R.fl.mate?'คุณดึงแขนพี่โจ้ลงบันไดมาด้วยกัน ไม่มีไฟไหม้จริง ควันหายไปตอนแสงแรกลอดเข้ามา':'ไม่มีไฟไหม้จริง ควันหายไปตอนแสงแรกลอดเข้ามา'}}},
   {t:'🚿 เปิดน้ำราดประตู อยู่ในห้อง',ok:ok,f:()=>({why:ok?'คุณนั่งพิงประตูเปียกจนเช้า ไม่มีอะไรเข้ามาได้':'ควันไม่ใช่ควัน มันมาจากในห้องคุณ'})}]}}},
train:{n:'รถไฟสายสุดท้าย',ic:'🚆',role:'ผู้โดยสารที่หลับเลยสถานีบนรถไฟเที่ยวสุดท้ายจากหัวลำโพง',place:'ตู้ชั้นสามที่ไฟนีออนกะพริบ ปลายทางไม่มีชื่อบนป้าย',
 rules:[{id:1,t:'กฎสำหรับผู้โดยสารเที่ยวสุดท้าย เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นเป็นของคนที่ลงไม่ได้'},
  {id:2,t:'นับผู้โดยสารในตู้ทุกครั้งที่รถจอด ถ้าจำนวนเพิ่ม ห้ามสบตาคนที่เพิ่มมา'},
  {id:3,t:'ห้ามลงสถานีที่ไม่มีชื่อบนแผนที่ในตู้ ต่อให้ประตูเปิดค้างนานแค่ไหน'},
  {id:4,t:'พนักงานตรวจตั๋วที่ไม่มีหน้า ให้ยื่นตั๋วขากลับ ไม่ใช่ตั๋วขาไป'},
  {id:5,t:'ซื้อพวงมาลัยจากเด็กบนรถไฟได้ แต่ห้ามรับเงินทอน'},
  {id:6,t:'เมื่อรถไฟเข้าอุโมงค์ ห้ามขยับตัวจนกว่าจะออกพ้น'},
  {id:7,t:'ถ้าประกาศสถานีเป็นภาษาที่ฟังไม่ออก ให้ลงที่สถานีนั้นทันที'}],
 fake:[5,7],late:{id:8,t:'(เพิ่งมี) ถ้ามีคนนั่งข้างคุณแล้วเอนหัวมาซบ ห้ามผลักออก ปล่อยให้เขาหลับ'},gone:2,
 ev:[
 (F)=>({t:'🧮 นับคนในตู้',x:'รถไฟชะลอเข้าสถานีที่ป้ายเลือนจนอ่านไม่ออก ไฟในตู้กะพริบ',mg:'seats'}),
 (F)=>({t:'🎫 ตรวจตั๋ว',x:'พนักงานเดินมาช้าๆ หมวกต่ำจนเห็นแค่คาง… ไม่สิ ใต้หมวกไม่มีคาง ไม่มีอะไรเลย มือขาวซีดยื่นมาขอตั๋ว',
  o:[{t:'🎟️ ยื่นตั๋วขากลับ',ok:true,why:'เขาเจาะตั๋วแล้วพยักหน้า (ทั้งที่ไม่มีหัวให้พยัก) "เดินทางปลอดภัย"'},{t:'🎟️ ยื่นตั๋วขาไป',ok:false,why:'กฎข้อ 4 — ตั๋วขาไปแปลว่าคุณยังไม่อยากกลับ'},{t:'🙈 ทำเป็นหลับ',ok:false,why:'มือนั้นค่อยๆ ล้วงกระเป๋าคุณเอง'}]}),
 (F)=>({t:'🌼 น้องน้อยขายพวงมาลัย',x:'เด็กผู้ชายผมเปียกโชกเดินมาตามทางเดิน "พวงมาลัยไหมพี่ ห้าบาท" คุณมีแต่แบงก์ยี่สิบ',gh:'noi',
  o:[{t:'💵 ซื้อ แล้วบอกว่าไม่ต้องทอน',ok:!F.includes(5),fav:F.includes(5)?0:15,gfl:F.includes(5)?{}:{noi:1},why:F.includes(5)?'กฎข้อ 5 หมึกต่าง — พวงมาลัยจากเขาคือพวงมาลัยไหว้ศพ คนรับคือคนถัดไป':'น้องน้อยยิ้มครั้งแรก "ขอบคุณครับ แม่ผมรอที่บางซื่อ"'},
   {t:'🙅 ไม่ซื้อ ยิ้มให้',ok:F.includes(5),fav:3,why:F.includes(5)?'คุณไม่รับของจากเขา':'เด็กเดินจากไปเงียบๆ น้ำหยดตามรอยเท้าเป็นทาง'},
   {t:'❓ ถามว่าทำไมตัวเปียก',ok:true,fav:10,clue:'train',why:'"ผมตกจากรถไฟตอนข้ามสะพาน ปี 2541 ครับ" เขาชี้ไปที่ตั๋วเก่าในมือคุณ วันที่บนตั๋วคือวันเดียวกัน'}]}),
 (F)=>({t:'🌑 เข้าอุโมงค์',x:'ไฟดับทั้งตู้ รถไฟเข้าอุโมงค์ยาว มีใครบางคนลุกขึ้นเดินในความมืด',mg:'still'}),
 (F)=>({t:'📢 ประกาศสถานี',x:'ลำโพงดังขึ้น เสียงผู้หญิงพูดภาษาที่คุณไม่เคยได้ยิน เป็นจังหวะเหมือนสวดมนต์ ประตูเปิดออกสู่ชานชาลาที่มีหมอกลอย',
  o:[{t:'🚶 ลงที่สถานีนี้',ok:F.includes(7)?false:true,why:F.includes(7)?'กฎข้อ 7 หมึกต่าง — สถานีนี้ไม่มีชื่อบนแผนที่ (กฎข้อ 3)':'ข้อ 7 กับข้อ 3 ชนกัน… แต่สถานีนี้มีชื่อบนแผนที่จริง "บางซื่อ (เก่า)" คุณลงมาแล้วขึ้นอีกขบวนที่ตรงเวลา'},
   {t:'🪑 นั่งอยู่ที่เดิม',ok:F.includes(7),why:F.includes(7)?'คุณไม่ทำตามกฎปลอม ประตูค่อยๆ ปิด':'ประกาศดังซ้ำ… คราวนี้เรียกชื่อคุณ'}]}),
 (F,R)=>({t:'🧍 พี่โจ้บนรถไฟ',x:'คนที่นั่งตรงข้ามเงยหน้า — พี่โจ้ หน้าซีดกว่าเดิม "อีกแล้วเหรอ… รอบนี้พี่จะลงสถานีหน้า พี่เห็นแม่ยืนรออยู่"',
  o:[{t:'✋ ห้ามไว้ "สถานีหน้าไม่มีบนแผนที่"',ok:true,mate:2,fl:{mate:1,hold:1},why:'พี่โจ้มองแผนที่นาน แล้วนั่งลงช้าๆ'},
   {t:'🤫 ปล่อยให้เขาตัดสินใจเอง',ok:true,mate:-1,fl:{mate:1},why:'พี่โจ้ยิ้มเศร้า "ถ้าพี่ไม่กลับมา ฝากบอกแม่ด้วย"'}]}),
 ],
 climax:(F,R)=>{const m=MT();return{t:'🚉 สถานีปลายทาง 05:40',x:`รถไฟจอดนิ่ง ชานชาลาด้านซ้ายมีแสงเช้า ด้านขวามืดสนิทแต่มีเสียงคนเรียกชื่อคุณเหมือนเสียงแม่${R.fl.mate&&!R.fl.hold?'<br>พี่โจ้ลุกเดินไปทางประตูขวา':''}${R.fl.mate&&R.fl.hold?'<br>พี่โจ้จับแขนคุณ "ซ้ายนะ เชื่อพี่"':''}`,
  o:[{t:'🌅 ลงประตูซ้าย',ok:true,f:()=>{if(R.fl.mate&&!R.fl.hold){R.fl.mateDead=1;return{why:'คุณลงมาเจอแสงเช้าที่หัวลำโพง… หันกลับไป ประตูขวาปิดแล้ว พี่โจ้ยังอยู่บนนั้น'}}return{why:R.fl.mate?'คุณกับพี่โจ้ก้าวลงมาพร้อมกัน พนักงานกวาดชานชาลามองหน้าแปลกๆ "รถไฟเที่ยวนั้นยกเลิกไปตั้งแต่ปี 41 แล้วนะ"':'แสงเช้าที่หัวลำโพง ป้ายบอก 05:41'}}},
   {t:'🌑 ลงประตูขวา ตามเสียงแม่',ok:false,why:'แม่ของคุณยังมีชีวิตอยู่ — เสียงนั้นไม่ใช่แม่'}]}}},
dorm:{n:'หอพักหญิงรุ่นเก่า',ic:'🛏️',role:'นักศึกษาปีหนึ่งที่ย้ายเข้ามาวันแรกของเทอม',place:'หอพักไม้สี่ชั้นหลังมหาวิทยาลัย ประตูหอปิดสี่ทุ่มตรง',
 rules:[{id:1,t:'ระเบียบหอพัก เขียนด้วยหมึกเดียวกับข้อนี้ ข้อที่หมึกต่างไม่ใช่ระเบียบของแม่หอ'},
  {id:2,t:'เที่ยงคืนแม่หอจะเดินนับคน ให้ขานชื่อตัวเองเท่านั้น ห้ามขานแทนเพื่อน'},
  {id:3,t:'ถ้าเพื่อนเคาะเรียกโดยไม่ได้ส่งไลน์มาก่อน ห้ามเปิดประตู'},
  {id:4,t:'กระจกห้องน้ำรวมต้องคลุมผ้าหลังเที่ยงคืน ถ้าผ้าหล่น ห้ามเงยหน้ามอง'},
  {id:5,t:'เตียงที่ 4 ว่างมาสิบปี ถ้ามีคนนอนอยู่ อย่าปลุก'},
  {id:6,t:'รูมเมตของคุณชื่อมายด์ เธอเป็นคนดี ช่วยเธอทุกอย่างที่ขอ'},
  {id:7,t:'ถ้าได้ยินเสียงหวีผมดังมาจากใต้เตียง ให้หยิบหวีของตัวเองซ่อนไว้'}],
 fake:[6,7],late:{id:8,t:'(เพิ่งมี) ถ้าแม่หอยกมือไหว้คุณ ห้ามรับไหว้'},gone:4,
 ev:[
 (F)=>({t:'📋 นับคนเที่ยงคืน',x:'แม่หอถือไฟฉายเดินตามทางเดิน เรียกเลขห้อง "ห้อง 304… สาม คน?" ในห้องมีคุณ มายด์ และใครบางคนบนเตียงที่ 4',
  o:[{t:'🙋 ขานชื่อตัวเองคนเดียว',ok:true,why:'แม่หอจดลงสมุด "สองคน" แล้วเดินผ่านไป'},{t:'🙋 ขานชื่อตัวเอง แล้วขานแทนมายด์ที่หลับอยู่',ok:false,why:'กฎข้อ 2 — แม่หอจด "สามคน" แล้วเตียงที่ 4 ลุกขึ้นนั่ง'},{t:'🤐 ไม่ขานเลย',ok:false,why:'ห้องที่ไม่มีคนขาน แม่หอจะเข้ามาตรวจเอง'}]}),
 (F,R)=>({t:'🧑‍🎓 มายด์ขอร้อง',x:'มายด์นั่งร้องไห้บนเตียง "ช่วยไปเอาหวีของเราที่ห้องน้ำรวมให้หน่อยได้ไหม เราลืมไว้ เรากลัว"',gh:'mind',
  o:[{t:'🚶 ไปเอาให้',ok:!F.includes(6),fav:F.includes(6)?0:15,fl:{comb:1},f:()=>F.includes(6)?{why:'กฎข้อ 6 หมึกต่าง — ห้องน้ำรวมหลังเที่ยงคืนไม่มีใครควรไป'}:null,why:'คุณเอาหวีกลับมา มายด์กอดมันไว้แน่น "เป็นหวีที่แม่ให้"'},
   {t:'🙅 ปฏิเสธ ชวนนอนรอเช้าด้วยกัน',ok:F.includes(6),fav:F.includes(6)?8:-10,why:F.includes(6)?'มายด์เงียบไป แล้วหัวเราะเบาๆ ในความมืด':'มายด์มองคุณด้วยสายตาที่ไม่มีใครควรมองแบบนั้น'},
   {t:'❓ ถามว่าเธอเข้าหอมาตั้งแต่เมื่อไหร่',ok:true,fav:5,clue:'dorm',why:'"ปี 2541 จ้ะ" เธอตอบทันที แล้วชี้รูปรุ่นบนผนัง ในรูปมีเด็กหญิงปกเหลืองชื่อฝ้ายยืนข้างเธอ'}]}),
 (F)=>({t:'🪞 กระจกห้องน้ำ',x:'ผ้าคลุมกระจกหล่นลงพื้นตอนคุณล้างหน้า เงาในกระจกยังไม่ขยับตามคุณ',mg:'mirror'}),
 (F)=>({t:'🔦 ซ่อน',x:'เสียงฝีเท้าเปียกๆ เดินขึ้นบันไดมาชั้นสาม ไฟทางเดินดับทีละดวง',mg:'hide'}),
 (F)=>({t:'🚪 เสียงเคาะ',x:'"เปิดหน่อย เราเอง ลืมกุญแจ" เสียงเพื่อนห้องข้างๆ — แต่ไลน์ไม่มีข้อความใหม่เลย',
  o:[{t:'🔒 ไม่เปิด พิมพ์ไลน์ไปถาม',ok:true,why:'ไลน์ขึ้นว่าเพื่อนอ่านแล้ว ตอบกลับว่า "เรานอนอยู่บ้านนะ ทำไม"'},{t:'🚪 เปิดประตู',ok:false,why:'กฎข้อ 3'}]}),
 (F)=>({t:'🪮 เสียงหวีใต้เตียง',x:'แกรก… แกรก… เสียงหวีผมยาวดังมาจากใต้เตียงของคุณ',
  o:[{t:'🫳 หยิบหวีตัวเองซ่อนใต้หมอน',ok:!F.includes(7),why:F.includes(7)?'กฎข้อ 7 หมึกต่าง — เธอหาหวีไม่เจอเลยเอื้อมมาหวีผมคุณแทน':'เสียงหวีหยุด เหมือนเธอยอมแพ้'},{t:'🛌 ไม่ทำอะไร นอนนิ่ง',ok:F.includes(7),why:F.includes(7)?'เธอหวีผมจนพอใจ แล้วเงียบไป':'เสียงหวีย้ายขึ้นมาบนเตียง'}]}),
 ],
 climax:(F,R)=>{const g=G(),fm=g.fav.mind|0;return{t:'🌄 05:30 เตียงที่ 4',x:`ผ้าห่มบนเตียงที่ 4 ขยับ มายด์ยืนอยู่ข้างเตียงนั้น "ถึงเวลาเราต้องไปแล้ว… มากับเราไหม เราจะไม่เหงาอีก"${R.fl.comb?'<br><span class="gHint">🪮 เธอยังกำหวีของแม่ไว้ในมือ</span>':''}`,
  o:[{t:'🙏 "ไปดีนะมายด์ เราจะจำชื่อเธอไว้"',ok:true,fav:20,f:()=>({why:fm>=20||R.fl.comb?'มายด์ยิ้ม แล้วล้มตัวลงนอนบนเตียงที่ 4 ร่างค่อยๆ จางไปกับแสงเช้า บนเตียงเหลือแค่หวีอันเดียว':'มายด์พยักหน้าช้าๆ แล้วเดินผ่านประตูไปโดยไม่เปิดมัน'})},
   {t:'🤝 จับมือเธอไว้',ok:false,why:'มือของเธอเย็นเหมือนน้ำในบึงหลังหอ — และไม่ยอมปล่อย'},
   {t:'🏃 วิ่งออกจากห้อง',ok:fm>=10,f:()=>({why:fm>=10?'คุณวิ่งลงมาถึงประตูหอตอนมันปลดล็อกพอดี ข้างหลังมีเสียงร้องไห้':'ประตูห้องไม่ยอมเปิด มายด์พูดเบาๆ "ทำไมทุกคนทิ้งเรา"'})}]}}},
cine:{n:'โรงหนังสแตนด์อโลน',ic:'🎞️',role:'คนฉายหนังกะดึกของโรงหนังเก่าที่กำลังจะถูกทุบ',place:'โรงหนังห้าร้อยที่นั่งย่านเก่าในตัวเมือง รอบเที่ยงคืนยังขายตั๋วหมด',
 rules:[{id:1,t:'คู่มือคนฉาย เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นคือคำขอของผู้ชม'},
  {id:2,t:'รอบเที่ยงคืนต้องฉายจนจบ ห้ามหยุดฉายไม่ว่าเกิดอะไรขึ้น'},
  {id:3,t:'ห้ามนับจำนวนคนดูในโรง'},
  {id:4,t:'ถ้าภาพบนจอเป็นตัวคุณเอง ให้เปลี่ยนม้วนฟิล์มทันที'},
  {id:5,t:'ถ้าผู้ชมขอให้ฉายซ้ำ ให้ฉายซ้ำ ผู้ชมคือพระเจ้า'},
  {id:6,t:'ลุงชัยนั่งในห้องฉายทุกรอบ ทักทายแต่ห้ามถามว่าลุงเสียเมื่อไหร่'},
  {id:7,t:'ถ้าภาพเบลอ ให้ปรับโฟกัสด้วยมือ ห้ามเดินลงไปดูหน้าจอ'}],
 fake:[5],late:{id:8,t:'(เพิ่งมี) ถ้าทั้งโรงปรบมือตอนหนังจบ ห้ามโค้งรับ'},gone:3,
 ev:[
 (F)=>({t:'🔭 ภาพเบลอ',x:'กลางเรื่อง ภาพบนจอเบลอจนจับอะไรไม่ได้ ผู้ชมเริ่มส่งเสียงเอะอะพร้อมกันเหมือนคนคนเดียว',mg:'focus'}),
 (F)=>({t:'🎞️ ลุงชัย',x:'ชายแก่ผมขาวนั่งบนเก้าอี้ไม้ในห้องฉาย ยิ้มให้คุณ "มาใหม่เหรอ ฟิล์มม้วนสามระวังหน่อยนะ มันชอบติด"',gh:'chai',
  o:[{t:'🙏 สวัสดีครับ/ค่ะ ลุง ขอบคุณที่เตือน',ok:true,fav:12,fl:{chai:1},why:'ลุงชัยพยักหน้าพอใจ ยื่นไขควงเล็กๆ ให้ "เผื่อใช้"'},
   {t:'❓ "ลุงเสียไปเมื่อไหร่ครับ"',ok:false,fav:-25,why:'กฎข้อ 6 — ลุงชัยลุกขึ้นช้าๆ ใบหน้าไหม้เกรียมเหมือนคืนไฟไหม้โรงหนัง'},
   {t:'🗂️ ถามถึงฟิล์มม้วนเก่าในตู้',ok:true,fav:6,clue:'cine',why:'ลุงชัยหยิบฟิล์มม้วนหนึ่งให้ดู ฉลากเขียน "หนังโรงเรียน ฉายปิดเทอม 2541" ในเฟรมแรกเป็นเด็กผู้ชายยืนริมน้ำ หันมามองกล้อง'}]}),
 (F)=>({t:'🔁 ฉายซ้ำ',x:'หนังจบ ผู้ชมทั้งโรงลุกขึ้นยืนพร้อมกัน หันหน้ามาทางห้องฉาย "อีกรอบ… อีกรอบ… อีกรอบ"',
  o:[{t:'▶️ ฉายซ้ำตามที่ขอ',ok:!F.includes(5),why:F.includes(5)?'กฎข้อ 5 หมึกต่าง — เป็นคำขอของผู้ชม ไม่ใช่คู่มือ ถ้าฉายซ้ำ รอบนี้จะไม่มีวันจบ':'ผู้ชมนั่งลงพร้อมกัน เงียบสนิท'},{t:'⏹️ ปิดเครื่อง เปิดไฟโรง',ok:F.includes(5),why:F.includes(5)?'ไฟเปิด ในโรงไม่มีใครสักคน มีแต่ฝุ่นบนเก้าอี้ห้าร้อยตัว':'กฎข้อ 2 — ห้ามหยุดฉาย'}]}),
 (F)=>({t:'🎬 ภาพบนจอ',x:'ฉากในหนังเปลี่ยนเป็นห้องฉายแห่งนี้ มีคนยืนอยู่หน้าเครื่องฉาย… คนนั้นคือคุณ และค่อยๆ หันมาทางกล้อง',
  o:[{t:'🔄 เปลี่ยนม้วนฟิล์มทันที',ok:true,f:(R)=>({why:R.fl.chai?'ม้วนสามติด — คุณใช้ไขควงของลุงชัยงัดออกได้ทันเวลา':'คุณเปลี่ยนม้วนทัน ก่อนเงาบนจอจะหันมาถึง'})},{t:'👀 ดูต่อว่าจะเกิดอะไร',ok:false,jump:1,why:'คุณบนจอยิ้มให้คุณ'}]}),
 (F)=>({t:'🧍 พี่โจ้ในโรงหนัง',x:'ที่นั่งแถว M มีคนเดียวที่ไม่ได้มองจอ — พี่โจ้ เขาโบกมือให้คุณ แล้วชี้ไปที่ทางออกฉุกเฉินที่มีแสงเขียว',
  o:[{t:'🚪 ลงไปหาพี่โจ้',ok:false,why:'กฎข้อ 7 — ห้ามเดินลงไปหน้าจอ… พี่โจ้ที่แท้จริงไม่มานั่งดูหนังรอบนี้'},{t:'📞 ส่งข้อความหาพี่โจ้',ok:true,mate:1,fl:{mate:1},f:()=>({why:MT().t>=2?'พี่โจ้ตอบทันที "พี่อยู่ห้องฉายข้างๆ น้อง! คนที่นั่งแถว M ไม่ใช่พี่"':'ข้อความขึ้นว่าอ่านแล้ว… คนในแถว M ก้มดูมือถือพร้อมกัน'})}]}),
 ],
 climax:(F,R)=>{const m=MT();return{t:'🔥 ฟิล์มไหม้ 05:20',x:`ฟิล์มติดเครื่องแล้วลุกเป็นไฟเหมือนคืนนั้นในอดีต ลุงชัยลุกขึ้นยืน${R.fl.chai?' "ไปเถอะ ข้าจะดูเอง"':''} ผู้ชมทั้งโรงหันมาทางห้องฉาย${R.fl.mate?'<br>พี่โจ้วิ่งเข้ามา "ทางหนีไฟหลังห้องฉาย!"':''}`,
  o:[{t:'🧯 ดับไฟ ฉายต่อให้จบตามกฎ',ok:true,f:()=>({why:R.fl.chai?'ลุงชัยช่วยคุณดับไฟ เครื่องฉายหมุนต่อจนเครดิตขึ้น "ขอบใจ ไม่มีใครเคยฉายให้จบมาสามสิบปีแล้ว"':'คุณดับไฟด้วยมือเปล่าจนพอง หนังฉายจนจบ ผู้ชมปรบมือเงียบๆ'})},
   {t:'🏃 หนีตามพี่โจ้',ok:!!(R.fl.mate&&m.t>=2),f:()=>(R.fl.mate&&m.t>=2)?{why:'คุณกับพี่โจ้ลงบันไดหนีไฟ ประตูเปิดออกสู่ถนนตอนรุ่งสาง ข้างหลังโรงหนังเงียบสนิท'}:{why:'กฎข้อ 2 — หนังหยุดฉาย และผู้ชมห้าร้อยคนลุกขึ้นพร้อมกัน'}},
   {t:'🔥 ทิ้งทุกอย่าง กระโดดหน้าต่าง',ok:false,why:'หน้าต่างห้องฉายเปิดออกสู่โรงภาพยนตร์อีกโรง ที่รอบเที่ยงคืนเพิ่งเริ่ม'}]}}},
});
// ---------------- มินิเกมชุด 2 ----------------
const ok_=t=>{R.ok++;interlude(`<div class="gMsg ok">✅ ${t}</div>`,next)};
Object.assign(MG,{
 // ลิฟต์: จำลำดับชั้นบนบัตร แล้วกดตาม (ห้ามกด 13)
 elev(e){const L=Array.from({length:4},()=>rnd(1,12));frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>จำลำดับบนบัตรให้ได้</b></div><div style="text-align:center;font-size:34px;font-family:monospace;letter-spacing:6px;margin:16px 0" id="ghEl">${L.join(' · ')}</div><div class="gBar"><i id="ghEb" style="transition:width 3.2s linear"></i></div>`);
  requestAnimationFrame(()=>{const b=document.getElementById('ghEb');if(b)b.style.width='100%'});let k=0;
  setTimeout(()=>{const el=document.getElementById('ghEl');if(!el)return;document.getElementById('ghr').classList.add('flk');el.textContent='? · ? · ? · ?';const t=document.querySelector('#ghr .gx');if(t)t.innerHTML='ไฟในลิฟต์ดับ… กดปุ่มตามลำดับ';
   const gd=document.createElement('div');gd.className='gGrid';gd.style.gridTemplateColumns='repeat(4,1fr)';gd.innerHTML=Array.from({length:13},(_,i)=>`<button data-f="${i+1}" style="font-size:20px;aspect-ratio:1.3;${i===12?'color:#ff4a3a;border-color:#ff4a3a55':''}">${i+1}</button>`).join('');el.after(gd);
   gd.querySelectorAll('button').forEach(b=>b.onclick=()=>{const f=+b.dataset.f;if(f===13)return fail('คุณกดชั้น 13 เอง');if(f!==L[k])return fail(`ลำดับผิด — ลิฟต์เปิดออกที่ชั้น 13 อีกครั้ง และครั้งนี้มีคนยืนรอ`);b.style.background='#2a5a3a';k++;el.textContent=L.slice(0,k).join(' · ')+' · ?'.repeat(4-k);if(k>=4)ok_('ลิฟต์สะดุดหนึ่งที แล้วลงไปชั้น 12 อย่างช้าๆ')})},3200)},
 // โทรศัพท์: ห้ามพูดก่อน — ปุ่ม "ฮัลโหล" ล่อให้กด รอจนอีกฝ่ายพูดก่อน แล้วตัดสินใจ
 phone(e){let dead=0,said=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br>คุณกดรับสาย… ปลายสายเงียบ</div><div class="gWhis" id="ghPh">…ฟืด… ฟืด…</div><button class="gO" id="ghHi">🗣️ "ฮัลโหล?"</button>`);
  const hi=document.getElementById('ghHi');hi.onclick=()=>{if(dead)return;dead=1;fail('กฎข้อ 4: ห้ามพูดก่อน — ปลายสายได้ยินเสียงคุณแล้ว')};
  const w=document.getElementById('ghPh');setTimeout(()=>{if(dead||!w.isConnected)return;w.textContent='…ได้ยินไหม… ตอบหน่อย…'},1800);
  setTimeout(()=>{if(dead||!w.isConnected)return;dead=1;const real=Math.random()<.5;frame(`<h2>${E(e.t)}</h2><div class="gx">ปลายสายพูดขึ้นก่อน: <i>"${real?'ขออภัยค่ะ นิติฯ แจ้งตัดน้ำชั้น 12 พรุ่งนี้เก้าโมงนะคะ':'ห้อง 1307 ใช่ไหมคะ ช่วยเปิดประตูให้เจ้าหน้าที่หน่อย เขายืนอยู่หน้าห้องแล้ว'}"</i></div><button class="gO" id="p1">✅ "รับทราบครับ/ค่ะ" แล้ววางสาย</button><button class="gO" id="p2">🚪 เดินไปเปิดประตู</button><button class="gO" id="p3">📵 วางสายทันทีโดยไม่พูด</button>`);
   document.getElementById('p1').onclick=()=>real?ok_('สายตัดไป… เช้ามาน้ำตัดจริง คนแรกในรอบหลายปีที่นิติโทรมาแล้วเป็นนิติจริง'):fail('คุณตอบรับคำขอให้เปิดประตู — เสียงกุญแจหมุนจากข้างนอก');
   document.getElementById('p2').onclick=()=>fail('นิติบุคคลไม่โทรหาลูกบ้านหลังสี่ทุ่ม');
   document.getElementById('p3').onclick=()=>ok_('คุณวางสาย หน้าประตูมีเสียงถอนหายใจยาว แล้วเงียบไป')},4600)},
 // นับผู้โดยสาร 3 สถานี (คนเพิ่ม/ลด) → ตอบจำนวน · ถ้าเพิ่ม ต้องเลือก "ไม่สบตา"
 seats(e){let n=rnd(3,5);const L=[n];for(let i=0;i<2;i++){n+=rp([-1,0,1,1]);L.push(Math.max(2,n))}let i=0;const draw=c=>`<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;font-size:30px;min-height:90px;margin:12px 0">${Array.from({length:c},()=>rp(['🧍','🧍‍♀️','🧑‍🦳','👤'])).join('')}</div>`;
  const stop=()=>{if(!document.getElementById('ghr'))return;frame(`<h2>${E(e.t)}</h2><div class="gx">สถานีที่ ${i+1}/3 — ไฟกะพริบ นับให้ทัน</div>${draw(L[i])}`);i++;if(i<3)setTimeout(stop,1700);else setTimeout(ask,1700)};
  const ask=()=>{const ans=L[2],op=shuf([ans,ans+1,ans-1]);frame(`<h2>${E(e.t)}</h2><div class="gx">ไฟดับ… ตอนนี้ในตู้มีผู้โดยสารกี่คน (ไม่นับคุณ)?</div>${op.map(v=>`<button class="gO" data-v="${v}">${v} คน</button>`).join('')}`);
   document.querySelectorAll('#ghr [data-v]').forEach(b=>b.onclick=()=>{if(+b.dataset.v!==ans)return fail(`มี ${ans} คน — คุณนับพลาดแล้วเผลอเงยหน้านับใหม่ตรงหน้าคนที่เพิ่งขึ้นมา`);
    if(L[2]>L[0]){frame(`<h2>${E(e.t)}</h2><div class="gx">${ans} คน — เพิ่มขึ้นจากตอนแรก ${ans-L[0]} คน มีใครบางคนนั่งลงตรงข้ามคุณพอดี</div><button class="gO" id="s1">👇 มองพื้น ไม่สบตา</button><button class="gO" id="s2">👀 มองให้รู้ว่าใคร</button>`);document.getElementById('s1').onclick=()=>ok_('คนตรงข้ามลุกออกไปตอนสถานีถัดไป ทิ้งรอยเปียกไว้บนเบาะ');document.getElementById('s2').onclick=()=>{jump();fail('กฎข้อ 2: ห้ามสบตาคนที่เพิ่มมา')}}
    else ok_('จำนวนเท่าเดิม… หรือน้อยลง ไม่มีใครเพิ่มมา')})};stop()},
 // กระจก: รอให้เงากะพริบตาก่อน แล้วค่อยกะพริบตาม (แตะ) ภายใน 1 วิ
 mirror(e){let st=0,dead=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>อย่ากะพริบตาก่อนเงา</b> — พอเงากะพริบ ให้แตะกระจกตามทันที</div><div id="ghMr" style="margin:14px auto;width:200px;height:240px;border-radius:12px;border:6px solid #8a7a5a;background:linear-gradient(160deg,#3a4a52,#1a2226);display:flex;align-items:center;justify-content:center;font-size:96px;cursor:pointer;user-select:none">👁️</div><div class="gWhis" id="ghMw">…</div>`);
  const m=document.getElementById('ghMr'),w=document.getElementById('ghMw');m.onclick=()=>{if(dead)return;dead=1;if(st===1)ok_('คุณกะพริบตามทันพอดี เงาในกระจกเริ่มขยับตามคุณตามปกติ');else{jump();fail(st===0?'คุณกะพริบก่อน — เงาในกระจกยังเปิดตาค้างอยู่':'ช้าไป เงาในกระจกยิ้มที่คุณไม่ทันมัน')}};
  setTimeout(()=>{if(dead||!m.isConnected)return;w.textContent='มันจ้องคุณไม่กะพริบ…'},1200);const t=2600+rnd(0,2400);
  setTimeout(()=>{if(dead||!m.isConnected)return;st=1;m.textContent='😑';w.textContent='!';setTimeout(()=>{if(dead||!m.isConnected)return;st=2;m.textContent='👁️';setTimeout(()=>{if(dead)return;dead=1;fail('ช้าไป เงาในกระจกยิ้มที่คุณไม่ทันมัน')},500)},950)},t)},
 // ซ่อน: ฟังทิศเสียงฝีเท้า 3 รอบ แล้วเลือกที่ซ่อนฝั่งตรงข้าม
 hide(e){const sides=['ซ้าย','ขวา'],D=[];for(let i=0;i<3;i++)D.push(rp(sides));const last=D[2];let i=0;
  frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>ฟังว่าเสียงมาทางไหน</b></div><div class="gWhis" id="ghHd" style="font-size:22px;min-height:60px"></div>`);const w=document.getElementById('ghHd');
  const step=()=>{if(!w.isConnected)return;if(i>=3)return ask();w.innerHTML=`${D[i]==='ซ้าย'?'👣 ตึก… <span style="opacity:.3">ตึก…</span>':'<span style="opacity:.3">…ตึก</span> …ตึก 👣'}<br><small>(${'·'.repeat(i+1)})</small>`;try{sfx('click')}catch(x){}i++;setTimeout(step,1100)};step();
  const ask=()=>{frame(`<h2>${E(e.t)}</h2><div class="gx">เสียงหยุดอยู่หน้าห้อง… ครั้งสุดท้ายมันมาจากทางไหน? เลือกที่ซ่อน</div><button class="gO" data-h="ซ้าย">🚪 ซ่อนหลังประตูฝั่งซ้าย</button><button class="gO" data-h="ขวา">🗄️ ซ่อนในตู้เสื้อผ้าฝั่งขวา</button><button class="gO" data-h="ใต้">🛏️ ซ่อนใต้เตียง</button>`);
   document.querySelectorAll('#ghr [data-h]').forEach(b=>b.onclick=()=>{const h=b.dataset.h;if(h==='ใต้')return fail('ใต้เตียงมีคนนอนรออยู่ก่อนแล้ว');if(h===last){jump();return fail(`เสียงมาจากฝั่ง${last} — คุณซ่อนอยู่ตรงทางที่มันเดินเข้ามา`)}ok_('ประตูเปิดออก… ฝีเท้าเปียกๆ เดินผ่านไปอีกฝั่ง แล้วออกไปเอง')})}},
 // โฟกัส: เลื่อนแถบให้ภาพชัด (ห้ามลงไปดูหน้าจอ)
 focus(e){const tgt=rnd(15,85);let dead=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br>เลื่อนแหวนโฟกัสจนภาพชัด แล้วกดล็อก</div><div id="ghFc" style="margin:12px 0;height:140px;border-radius:10px;background:#111;display:flex;align-items:center;justify-content:center;font-size:60px;filter:blur(8px)">🎬</div><input type="range" min="0" max="100" value="50" id="ghFr" style="width:100%"><button class="gO" id="ghFl">🔒 ล็อกโฟกัส</button><button class="gO" id="ghFd">🚶 เดินลงไปดูหน้าจอเอง</button>`);
  const v=document.getElementById('ghFc'),r=document.getElementById('ghFr');const upd=()=>{const d=Math.abs(+r.value-tgt);v.style.filter=`blur(${Math.min(10,d/5)}px)`;v.textContent=d<6?'👤':'🎬'};r.oninput=upd;upd();
  document.getElementById('ghFd').onclick=()=>{if(dead)return;dead=1;fail('กฎข้อ 7: ห้ามเดินลงไปดูหน้าจอ')};
  document.getElementById('ghFl').onclick=()=>{if(dead)return;dead=1;const d=Math.abs(+r.value-tgt);d<=6?ok_('ภาพคมชัด… คนในจอคือลุงชัยตอนหนุ่ม เขาโบกมือให้กล้อง ผู้ชมเงียบลง'):fail('ภาพยังเบลอ ผู้ชมห้าร้อยคนหันมาทางห้องฉายพร้อมกัน')}},
});

// ---------------- ด่านชุด 3: วินมอเตอร์ไซค์ตีสอง · ตลาดนัดกลางคืน · บ้านเช่าศาลพระภูมิ · ไลฟ์สดขายของ ----------------
// ธงข้ามด่าน g.flg: noi (ซื้อพวงมาลัยน้องน้อย) · yai (ส่งเกลือยายผัน) → ด่านใหม่มีคนจำคุณได้ · ไลฟ์สดเปิดความจริงของพี่โจ้
const FL=()=>{const g=G();g.flg=g.flg||{};return g.flg};
Object.assign(GH,{daeng:{n:'ลุงแดง',ic:'🛵',d:'วินรุ่นแรกของปากซอย เสื้อวินเบอร์ 13 สีซีดจนเกือบขาว'},maenoi:{n:'แม่ของน้องน้อย',ic:'👩',d:'แม่ค้าพวงมาลัยในตลาดนัดที่ตามหาลูกมาตั้งแต่ปี 2541'},jaothi:{n:'เจ้าที่',ic:'🏠',d:'ผู้เฝ้าศาลพระภูมิหน้าบ้านเช่า ไม่ชอบคนลืมเปลี่ยนน้ำ'},admin:{n:'แอดมินเงา',ic:'💬',d:'บัญชีที่คอมเมนต์ในทุกไลฟ์ของคุณ ไม่มีรูปโปรไฟล์ ไม่มีวันที่สมัคร'}});
Object.assign(ST,{
win:{n:'วินมอเตอร์ไซค์ตีสอง',ic:'🛵',role:'วินมอเตอร์ไซค์มือใหม่ที่รับกะดึกแทนลุงแดง',place:'วินปากซอยหน้าโรงพยาบาลเก่า ไฟถนนดับครึ่งซอย',
 rules:[{id:1,t:'กฎวินกะดึก เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นเป็นของผู้โดยสาร'},
  {id:2,t:'ผู้โดยสารที่ไม่บอกปลายทาง ให้ถามสองครั้ง ถ้ายังไม่ตอบ ห้ามรับ'},
  {id:3,t:'ห้ามมองกระจกมองหลังตอนมีผู้โดยสารซ้อน'},
  {id:4,t:'ถ้าผู้โดยสารให้เลี้ยวเข้าซอยตัน ห้ามเลี้ยว ให้จอดแล้วบอกว่าน้ำมันหมด'},
  {id:5,t:'ถ้าผู้โดยสารจ่ายเกินราคา ให้รับไว้ ถือว่าเป็นสินน้ำใจ'},
  {id:6,t:'ห้ามรับผู้โดยสารหน้าโรงพยาบาลหลังตีสอง'},
  {id:7,t:'ถ้าเสื้อวินของคุณกลายเป็นเบอร์ 13 ให้ถอดคืนลุงแดงทันที'}],
 fake:[5,6],late:{id:8,t:'(เพิ่งมี) ถ้าผู้โดยสารถามว่า "ตอนนี้กี่โมงแล้ว" ห้ามบอกเวลาจริง'},gone:2,
 ev:[
 (F)=>({t:'🧍 ผู้โดยสารคนแรก',x:'หญิงสาวชุดดำยืนรอข้างวินโดยไม่มีใครเห็นตอนเดินมา คุณถามว่าไปไหน เธอไม่ตอบ คุณถามอีกครั้ง… เธอยังเงียบ แล้วก้าวขาซ้อนท้ายเอง',
  o:[{t:'🙅 ลงจากรถ บอกว่าไม่รับ',ok:true,why:'เธอค่อยๆ ลงจากรถ น้ำหนักท้ายรถเบาลงหลังจากเธอเดินหายไปแล้วหลายวินาที'},{t:'🛵 ขับออกไปก่อน เดี๋ยวเธอคงบอก',ok:false,why:'กฎข้อ 2 — ถามสองครั้งไม่ตอบ ห้ามรับ'}]}),
 (F)=>({t:'🗺️ ทางลัด',x:'ผู้โดยสารชายแก่บอกทางเป็นช่วงๆ ด้วยเสียงแหบ',mg:'route'}),
 (F)=>({t:'🪞 กระจกมองหลัง',x:'กลางทาง ผู้โดยสารเงียบไปนาน น้ำหนักท้ายรถหนักขึ้นเรื่อยๆ เหมือนมีคนขึ้นมาเพิ่ม',
  o:[{t:'👀 เหลือบดูกระจกมองหลัง',ok:false,jump:1,why:'กฎข้อ 3 — ในกระจกมีหน้าสามหน้า'},{t:'🛵 มองถนนข้างหน้าอย่างเดียว',ok:true,why:'น้ำหนักค่อยๆ เบาลงตอนผ่านศาลเจ้า'}]}),
 (F)=>({t:'💵 ค่าโดยสาร',x:'ถึงปลายทางหน้าบ้านร้าง ผู้โดยสารยื่นแบงก์พันให้ ค่ารถสี่สิบบาท "ไม่ต้องทอนนะลูก"',
  o:[{t:'🙏 รับไว้ ขอบคุณ',ok:!F.includes(5),why:F.includes(5)?'กฎข้อ 5 หมึกต่าง — ตอนเช้าแบงก์พันกลายเป็นกระดาษเงินกระดาษทอง และคุณติดหนี้เขาหนึ่งพันบาท':'สินน้ำใจของคนกะดึก'},{t:'🪙 ทอนให้ครบ',ok:F.includes(5),why:F.includes(5)?'คุณไม่รับเกินราคา เขามองเงินทอนแล้วยิ้ม "เด็กดี"':'เขาไม่รับเงินทอน และไม่ยอมลงจากรถ'}]}),
 (F)=>({t:'🏥 หน้าโรงพยาบาล',x:'02:40 คนไข้ใส่ชุดโรงพยาบาลโบกมือเรียกวินหน้าตึกฉุกเฉิน มือยังมีสายน้ำเกลือห้อยอยู่',
  o:[{t:'🙅 ไม่รับ ชี้ให้รอรถพยาบาล',ok:!F.includes(6),why:F.includes(6)?'กฎข้อ 6 หมึกต่าง — เขาเป็นคนเป็นที่หนีจากเวรดึก เขาล้มลงตรงนั้น':'เขายืนรอต่อไป เหมือนที่รอมาหลายปี'},{t:'🛵 รับไปส่ง',ok:F.includes(6),why:F.includes(6)?'คุณพาเขาไปถึงบ้านทัน ลูกสาวเขาร้องไห้รับตัวไว้':'กฎข้อ 6'}]}),
 (F)=>({t:'🦺 เสื้อวินเบอร์ 13',x:'คุณก้มดูเสื้อวินตัวเอง เบอร์บนหลังเปลี่ยนเป็น "13" ตั้งแต่เมื่อไหร่ไม่รู้ ลุงแดงยืนยิ้มอยู่หน้าวินตรงข้ามถนน',gh:'daeng',
  o:[{t:'🦺 ถอดเสื้อ เดินไปคืนลุงแดง',ok:true,fav:15,clue:'win',why:'ลุงแดงรับเสื้อไป "ขอบใจ เสื้อตัวนี้ข้าใส่วันที่ไปส่งเด็กผู้ชายคนนึงที่ริมน้ำ… ปี 41 เขาไม่ยอมลงจากรถ บอกจะไปเล่นกับเพื่อน"'},{t:'🛵 ใส่ต่อไป ใกล้เช้าแล้ว',ok:false,why:'กฎข้อ 7 — เบอร์ 13 แปลว่าวินนี้เหลือคันเดียว และมันคือคุณ'}]}),
 ],
 climax:(F,R)=>{const g=G();return{t:'🌫️ ผู้โดยสารคนสุดท้าย 05:10',x:`เด็กผู้ชายตัวเปียกยืนรอที่วิน "พาผมไปท่าน้ำหน่อยครับ เพื่อนรออยู่"${FL().noi?'<br><span class="gHint">🌼 คุณจำเขาได้ — น้องน้อยจากรถไฟสายสุดท้าย เขายิ้มให้คุณเหมือนคนรู้จัก</span>':''}`,
  o:[{t:'🛵 ไปส่งที่ท่าน้ำ',ok:!!FL().noi,f:()=>FL().noi?{why:'ถึงท่าน้ำ น้องน้อยลงจากรถ วิ่งไปหาเงาเด็กอีกคนที่ยืนรอบนท่า สองคนจูงมือกันเดินลงน้ำแล้วหายไปพร้อมแสงแรก',fav:0}:{why:'ท่าน้ำไม่มีเพื่อนรอ มีแต่น้ำนิ่งๆ ที่ค่อยๆ สูงขึ้นมาถึงเท้าคุณ'}},
   {t:'🏠 ไปส่งที่บ้านแม่เขาแทน',ok:true,gfl:{noiHome:1},why:'น้องน้อยเงียบไปตลอดทาง หน้าบ้านมีผู้หญิงคนหนึ่งยืนรอ ร้องไห้โดยไม่มีเสียง เด็กลงจากรถไปกอดแม่'},
   {t:'🙅 บอกว่าวินปิดแล้ว',ok:true,why:'เด็กพยักหน้า แล้วเดินไปตามทางเอง รอยเท้าเปียกเรียงยาวไปทางท่าน้ำ'}]}}},
mkt:{n:'ตลาดนัดกลางคืน',ic:'🏮',role:'แม่ค้ามือใหม่ที่เช่าแผงต่อจากคนที่หายตัวไป',place:'ตลาดนัดลานวัดร้าง ไฟหลอดตะเกียบแขวนเป็นแนวยาว คนเดินเยอะผิดปกติหลังเที่ยงคืน',
 rules:[{id:1,t:'ระเบียบตลาด เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นเป็นของลูกค้าที่ไม่ได้มาซื้อ'},
  {id:2,t:'ลูกค้าที่จ่ายด้วยใบไม้ ให้รับไว้แล้วทอนเป็นข้าวสาร ห้ามทอนเงิน'},
  {id:3,t:'ห้ามชิมของที่แผงอื่นยื่นให้หลังเที่ยงคืน'},
  {id:4,t:'ถ้าเห็นคนเดินถอยหลังในตลาด อย่าทักและอย่าหลีกทางให้ ยืนนิ่งจนเขาผ่าน'},
  {id:5,t:'ตาชั่งของแผงต้องตรงเสมอ ชั่งขาดแม้แต่ขีดเดียว เจ้าของตลาดจะมาเก็บส่วนต่างเอง'},
  {id:6,t:'ถ้าแม่ค้าพวงมาลัยถามหาลูก ให้บอกว่าไม่เห็น'},
  {id:7,t:'ปิดแผงตอนตีห้าตรง ห้ามขายให้ลูกค้าคนสุดท้าย'}],
 fake:[6,7],late:{id:8,t:'(เพิ่งมี) ถ้ามีคนซื้อของแล้วเรียกคุณด้วยชื่อแม่ค้าคนเก่า ให้ขานรับ'},gone:4,
 ev:[
 (F)=>({t:'⚖️ ตาชั่ง',x:'ลูกค้าตัวสูงผิดปกติชี้มะม่วงในตะกร้า "เอาครึ่งโล ชั่งให้ตรงนะ เจ้าของตลาดดูอยู่"',mg:'scale'}),
 (F)=>({t:'🍃 จ่ายด้วยใบไม้',x:'เด็กผู้หญิงยื่นใบโพธิ์สามใบมาซื้อขนมครก',
  o:[{t:'🍚 รับใบไม้ ทอนเป็นข้าวสารกำมือหนึ่ง',ok:true,fav:4,why:'เด็กกำข้าวสารไว้แน่นแล้ววิ่งไปหาคนแก่ที่นั่งรอในมุมมืด'},{t:'🪙 รับใบไม้ ทอนเหรียญ',ok:false,why:'กฎข้อ 2 — เงินคนเป็นใช้ในตลาดนี้ไม่ได้ เหรียญที่ทอนไปกลับมาเป็นเหรียญขึ้นสนิมในลิ้นชักคุณ'},{t:'🙅 ไม่รับ บอกให้ไปเอาเงินจริงมา',ok:false,why:'เด็กร้องไห้ เสียงร้องดังขึ้นจากทุกแผงพร้อมกัน'}]}),
 (F)=>({t:'🍢 ของชิมจากแผงข้างๆ',x:'แม่ค้าแผงลูกชิ้นยื่นไม้มาให้ "ชิมดูสิ สูตรใหม่ ของคนกันเอง" ลูกชิ้นยังมีควันกรุ่น',
  o:[{t:'🙏 ขอบคุณ แต่ขอเก็บไว้กินทีหลัง',ok:true,why:'คุณห่อมันไว้ ตอนเช้าในห่อมีแต่ดินเหนียวปั้นเป็นก้อนกลม'},{t:'😋 ชิมคำหนึ่ง',ok:false,why:'กฎข้อ 3 — ของจากตลาดนี้ กินแล้วต้องอยู่ต่อ'}]}),
 (F)=>({t:'🚶 คนเดินถอยหลัง',x:'ผู้ชายคนหนึ่งเดินถอยหลังมาตามทางเดินระหว่างแผง ตรงมาที่คุณ คนในตลาดแหวกทางให้เขาโดยไม่มีใครมอง',mg:'still'}),
 (F,R)=>({t:'🌼 แม่ค้าพวงมาลัย',x:`ผู้หญิงหน้าตาอิดโรยถือพวงมาลัยเดินมาหา "หนูเห็นเด็กผู้ชายผมเปียกๆ ไหม ลูกแม่หายไปตั้งแต่ปีสี่สิบเอ็ด"${FL().noi?'<br><span class="gHint">🌼 คุณเคยซื้อพวงมาลัยจากเด็กคนนั้นบนรถไฟ</span>':''}`,gh:'maenoi',
  o:[{t:'🤐 "ไม่เห็นค่ะ/ครับ"',ok:!F.includes(6),fav:-5,why:F.includes(6)?'กฎข้อ 6 หมึกต่าง — เธอรอคำตอบนี้มาสามสิบปีแล้ว และคำโกหกทำให้เธอต้องรอต่อ':'เธอพยักหน้า เดินไปถามแผงต่อไป'},
   {t:'🚆 "เคยเห็น บนรถไฟสายสุดท้าย เขาบอกว่าแม่รอที่บางซื่อ"',ok:F.includes(6)||!!FL().noi,fav:20,gfl:{maenoi:1},clue:'mkt',f:()=>(F.includes(6)||FL().noi)?{why:'เธอปล่อยพวงมาลัยร่วงจากมือ "บางซื่อ… แม่ไปรอผิดที่มาตลอด" เธอยื่นสมุดบัญชีเก่าให้คุณ หน้าสุดท้ายมีรายชื่อเด็กที่หายในปี 2541 ห้าคน หนึ่งในนั้นคือชื่อเพื่อนสมัยเด็กของคุณ'}:{why:'กฎข้อ 6 สั่งให้บอกว่าไม่เห็น… แต่คุณไม่เคยเห็นเขาจริง เธอรู้ว่าคุณโกหก'}}]}),
 (F)=>({t:'🕯️ ลมกระโชก',x:'ลมแรงพัดไปทั้งตลาด ตะเกียงของแผงคุณจะดับ — ถ้าดับ แผงจะมืดและมีคนเข้ามาหยิบของได้',mg:'candle'}),
 ],
 climax:(F,R)=>{return{t:'🕔 ลูกค้าคนสุดท้าย 04:59',x:`ชายชุดขาวยืนหน้าแผงตอนเข็มนาทีเกือบถึงเลข 12 "ขอซื้อของชิ้นสุดท้าย อะไรก็ได้"${FL().maenoi?'<br><span class="gHint">👩 แม่ค้าพวงมาลัยตะโกนข้ามตลาด "อย่าขาย! เขาคือเจ้าของตลาด"</span>':''}`,
  o:[{t:'🛍️ ขายให้',ok:F.includes(7),f:()=>({why:F.includes(7)?'กฎข้อ 7 หมึกต่าง — เขาจ่ายด้วยเงินจริง ยิ้ม แล้วเดินจากไปพร้อมแสงเช้า':'กฎข้อ 7: ห้ามขายให้ลูกค้าคนสุดท้าย ของที่คุณขายคือปีที่เหลือของชีวิตคุณ'})},
   {t:'🔒 ปิดแผงทันที',ok:!F.includes(7),f:()=>!F.includes(7)?{why:'เข็มนาทีชี้เลข 12 ตลาดทั้งตลาดดับพร้อมกัน คุณยืนอยู่กลางลานวัดร้างคนเดียว'}:{why:'คุณปิดแผงใส่หน้าเขา… กฎข้อนั้นไม่ใช่ของตลาด เขาเสียใจ และตลาดเก็บคุณไว้อีกคืน'}}]}}},
rent:{n:'บ้านเช่าศาลพระภูมิ',ic:'🏠',role:'ผู้เช่าคนใหม่ของบ้านเดี่ยวราคาถูกเกินจริง',place:'บ้านไม้สองชั้นท้ายซอย ศาลพระภูมิหน้าบ้านหันผิดทิศ',
 rules:[{id:1,t:'สัญญาเช่าแนบท้าย เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นเจ้าของบ้านไม่ได้เขียน'},
  {id:2,t:'เปลี่ยนน้ำที่ศาลพระภูมิก่อนเที่ยงคืน ถ้าลืม ห้ามเปลี่ยนหลังเที่ยงคืน ให้จุดธูปขอขมาแทน'},
  {id:3,t:'ของไหว้ศาลต้องวางตามลำดับที่ป้ายบอก ผิดลำดับให้เก็บทั้งหมดแล้ววางใหม่'},
  {id:4,t:'ห้องชั้นบนสุดปิดไว้ ถ้าได้ยินเสียงจักรเย็บผ้า ไม่ต้องไปดู'},
  {id:5,t:'ถ้าเจ้าของบ้านโทรมาถามว่าอยู่คนเดียวไหม ให้ตอบว่า "อยู่กันหลายคน"'},
  {id:6,t:'ถ้าเห็นตุ๊กตาชาวบ้านบนศาลหันหน้าเข้าบ้าน ให้หมุนกลับ'},
  {id:7,t:'ถ้ายายแก่มาขอเกลือ ห้ามให้ ยายคนนั้นไม่ได้อยู่ซอยนี้'}],
 fake:[6,7],late:{id:8,t:'(เพิ่งมี) ถ้าได้ยินเสียงคนเดินบนหลังคา ให้นับก้าว ถ้าเกินเจ็ด ให้ปิดไฟทั้งบ้าน'},gone:4,
 ev:[
 (F)=>({t:'🏮 ของไหว้ศาล',x:'ป้ายไม้ข้างศาลเขียนลำดับการวางของไหว้ แต่ตัวหนังสือลบเลือนบางส่วน',mg:'shrine'}),
 (F)=>({t:'🧵 เสียงจักรเย็บผ้า',x:'เสียงจักรเย็บผ้าดังจากห้องชั้นบนสุด ทั้งที่ประตูห้องนั้นล็อกกุญแจจากข้างนอก',
  o:[{t:'🛌 ไม่ไปดู นอนต่อ',ok:true,why:'เสียงจักรหยุดตอนตีสาม ตอนเช้ามีเสื้อนักเรียนเย็บเสร็จใหม่พับวางหน้าประตูห้องคุณ ปักชื่อคุณไว้ที่อก'},{t:'🔑 ไขกุญแจขึ้นไปดู',ok:false,why:'กฎข้อ 4 — คนที่นั่งเย็บผ้าหันมาวัดตัวคุณ'}]}),
 (F)=>({t:'📞 เจ้าของบ้านโทรมา',x:'"อยู่คนเดียวหรือเปล่า" เสียงเจ้าของบ้านถามสั้นๆ',
  o:[{t:'👥 "อยู่กันหลายคนครับ/ค่ะ"',ok:true,why:'ปลายสายถอนหายใจ "ดีแล้ว อยู่หลายคนเขาไม่กล้าเข้า"'},{t:'🙋 "อยู่คนเดียว"',ok:false,why:'กฎข้อ 5 — มีคนอื่นนอกจากเจ้าของบ้านฟังสายอยู่'}]}),
 (F)=>({t:'🎎 ตุ๊กตาบนศาล',x:'ตุ๊กตาชาวบ้านบนศาลพระภูมิหันหน้าเข้าบ้านทั้งหมด ทั้งที่เมื่อเย็นยังหันออกถนน',
  o:[{t:'🔄 หมุนกลับทุกตัว',ok:!F.includes(6),why:F.includes(6)?'กฎข้อ 6 หมึกต่าง — พวกเขาหันมาเฝ้าคุณ คุณเพิ่งไล่ยามของตัวเองออกไป':'ตุ๊กตาหันออกถนนตามเดิม'},{t:'🙏 ปล่อยไว้ จุดธูปบอกเจ้าที่',ok:F.includes(6),fav:F.includes(6)?10:0,gh:'jaothi',why:F.includes(6)?'ควันธูปลอยเข้าบ้าน เหมือนเจ้าที่พยักหน้า':'กฎข้อ 6 สั่งให้หมุนกลับ'}]}),
 (F)=>({t:'🧂 ยายขอเกลือ',x:`ยายแก่ยืนหน้ารั้ว "หนูๆ ขอเกลือยายหน่อย"${FL().yai?'<br><span class="gHint">👵 หน้าคุ้นๆ… ยายผันจากคอนโดชั้น 13</span>':''}`,gh:'yai',
  o:[{t:'🙅 ไม่ให้ ตามกฎ',ok:!F.includes(7)&&!FL().yai,f:()=>FL().yai?{why:'ยายผันมองคุณนิ่งๆ "ครั้งก่อนหนูยังให้ยายเลย" แล้วเดินจากไปโดยไม่มีเสียงฝีเท้า',ok:false}:F.includes(7)?{why:'กฎข้อ 7 หมึกต่าง — ยายคนนี้เป็นคนเดียวในซอยที่ปกป้องคุณ'}:null,why:'ยายพึมพำอะไรบางอย่างแล้วเดินไปบ้านถัดไป'},
   {t:'🧂 ให้เกลือ',ok:F.includes(7)||!!FL().yai,fav:12,clue:'rent',f:()=>(F.includes(7)||FL().yai)?{why:'ยายรับเกลือแล้วโรยรอบรั้วบ้านคุณ "ตั้งแต่ไฟไหม้ปีนั้น ยายย้ายมาอยู่ทุกที่ที่มีเด็กพวกนั้นตามมา" ยายยื่นรูปเก่าให้ — เด็กห้าคนยืนริมท่าน้ำ คนหนึ่งคือคุณตอน ป.4'}:{why:'กฎข้อ 7 — ยายคนนั้นไม่ได้อยู่ซอยนี้'}}]}),
 (F)=>({t:'👣 ก้าวบนหลังคา',x:'ตึก… ตึก… เสียงคนเดินบนหลังคา คุณนับก้าวไปทีละก้าว',mg:'roof'}),
 ],
 climax:(F,R)=>({t:'🏠 เจ้าที่มาทวง 04:44',x:'ศาลพระภูมิสั่นจนแก้วน้ำล้ม เงาชายร่างใหญ่ยืนบนศาล "บ้านนี้มีเด็กห้าคนติดค้าง ใครจะออกไป ต้องทิ้งของไว้หนึ่งอย่าง"',gh:'jaothi',
  o:[{t:'🧧 ทิ้งเงินผีทั้งหมดไว้',ok:true,f:(R0,g)=>{const c=g.coin;g.coin=0;return{why:`คุณวางเงินผี ${c} ไว้บนศาล เงาพยักหน้า "พอ" ประตูบ้านเปิดเองตอนไก่ขัน`}}},
   {t:'🕯️ ทิ้งความทรงจำวันปิดเทอมปี 41',ok:true,clue:'rent2',f:(R0,g)=>({why:'ภาพเด็กผู้ชายริมน้ำวันนั้นหายไปจากหัวคุณ… แต่เจ้าที่ยื่นกระดาษแผ่นเล็กให้ "เขาไม่ได้โกรธเจ้า เขาแค่เหงา"'})},
   {t:'🏃 ไม่ทิ้งอะไร วิ่งออกประตูหลัง',ok:(G().fav.jaothi|0)>=10,f:(R0,g)=>((g.fav.jaothi|0)>=10)?{why:'เจ้าที่เบี่ยงตัวหลบให้ "ไปเถอะ เจ้าเคารพที่นี่"'}:{why:'ประตูหลังเปิดออกสู่ห้องชั้นบนสุด จักรเย็บผ้ายังเดินอยู่'}}]}),
},
live:{n:'ไลฟ์สดขายของตีสาม',ic:'📱',role:'แม่ค้าออนไลน์ที่ไลฟ์ขายของจนดึกเพราะยอดสั่งพุ่งผิดปกติหลังเที่ยงคืน',place:'ห้องเช่าเล็กๆ ไฟวงแหวน กล้องมือถือ ยอดคนดูขึ้นเลข 4,444 ค้างไว้',
 rules:[{id:1,t:'กฎของเพจ เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นเป็นคอมเมนต์ที่มีคนแอบพิมพ์ใส่'},
  {id:2,t:'ห้ามอ่านชื่อคนที่ไม่มีรูปโปรไฟล์ออกเสียง'},
  {id:3,t:'ถ้ามีคนขอให้หันกล้องไปหลังห้อง ห้ามหัน'},
  {id:4,t:'ออเดอร์ที่ให้ส่งไปบ้านเลขที่ 0 ให้ยกเลิก'},
  {id:5,t:'ถ้าแอดมินเงาบอกให้ปิดไลฟ์ ให้ปิดทันที'},
  {id:6,t:'ถ้าคนดูถามชื่อจริงของคุณ ให้บอกชื่อเล่นแทน'},
  {id:7,t:'แบนคอมเมนต์ที่มีวันที่ปี 2541 ทุกคอมเมนต์'}],
 fake:[5],late:{id:8,t:'(เพิ่งมี) ถ้าเห็นตัวเองในจอเคลื่อนไหวช้ากว่าจริง ห้ามขยับก่อนมัน'},gone:6,
 ev:[
 (F)=>({t:'💬 คอมเมนต์ไหลรัว',x:'คอมเมนต์ขึ้นเร็วจนอ่านไม่ทัน บางชื่อไม่มีรูป บางอันมีวันที่แปลกๆ',mg:'chat'}),
 (F)=>({t:'📷 หันกล้อง',x:'ยอดไลค์พุ่งพร้อมกันทั้งไลฟ์ "หันกล้องไปหลังห้องหน่อยค่ะแม่ค้า ข้างหลังมีคนยืนอยู่"',
  o:[{t:'📱 หันกล้องไปดู',ok:false,jump:1,why:'กฎข้อ 3'},{t:'🙂 ยิ้ม พูดต่อว่าวันนี้มีโปร',ok:true,why:'คอมเมนต์เงียบไปห้าวินาทีเต็ม แล้วกลับมาไหลตามปกติ'}]}),
 (F)=>({t:'📦 ออเดอร์แปลก',x:'ออเดอร์ใหญ่ที่สุดของคืน สั่งเสื้อนักเรียนไซซ์เด็ก 5 ตัว ส่งไป "บ้านเลขที่ 0 ริมท่าน้ำ"',
  o:[{t:'❌ ยกเลิกออเดอร์',ok:true,why:'ข้อความเด้งกลับมา "ไม่เป็นไร เดี๋ยวพวกเขาไปเอาเอง"'},{t:'✅ รับ ยอดดีขนาดนี้',ok:false,why:'กฎข้อ 4 — ตอนเช้ามีรอยเท้าเด็กเปียกๆ ห้าคู่หน้าห้องคุณ'}]}),
 (F)=>({t:'🛑 แอดมินเงาสั่ง',x:'คอมเมนต์ปักหมุดจาก "แอดมินเงา" ไม่มีรูป ไม่มีวันที่สมัคร: "ปิดไลฟ์เดี๋ยวนี้ ถ้าไม่อยากเห็นสิ่งที่จะเกิด"',gh:'admin',
  o:[{t:'⏹️ ปิดไลฟ์ทันที',ok:!F.includes(5),why:F.includes(5)?'กฎข้อ 5 หมึกต่าง — ไลฟ์ปิด แต่กล้องหน้าไม่ดับ จอขึ้นว่า "ไลฟ์ส่วนตัว: ผู้ชม 1 คน"':'จอดำ… แล้วไลฟ์ก็เปิดขึ้นใหม่เองโดยที่คุณปลอดภัย'},{t:'🙈 ไม่สนใจ ขายต่อ',ok:F.includes(5),fav:-5,why:F.includes(5)?'คุณไม่ทำตามคำสั่งปลอม ยอดคนดูกลับมาเป็นเลขปกติ':'กฎข้อ 5'}]}),
 (F,R)=>({t:'👤 คอมเมนต์จาก jo_1305',x:`มีคอมเมนต์จากบัญชีชื่อ <b>jo_1305</b> "น้อง… นี่พี่โจ้เอง พี่ดูไลฟ์น้องอยู่"${MT().t?`<br><span class="gHint">🤝 ความไว้ใจที่มีต่อพี่โจ้: ${MT().t}</span>`:''}`,
  o:[{t:'💬 ตอบกลับ "พี่อยู่ไหน"',ok:true,mate:1,f:()=>({why:`"พี่ไม่เคยออกไปไหนเลยตั้งแต่ปี 41 น้อง… พี่เป็นคนแรกที่ได้ซองแดง ตอนนั้นพี่อายุสิบขวบ" ${MT().t>=3?'บัญชีพิมพ์ต่อ "ถ้าน้องเจอห้องสุดท้าย พาพี่ไปด้วยนะ"':'แล้วบัญชีก็ถูกลบไป'}`,clue:'live'})},
   {t:'🔍 กดเข้าไปดูโปรไฟล์',ok:true,clue:'live',why:'โปรไฟล์ไม่มีโพสต์ มีรูปเดียว — เด็กผู้ชายห้าคนยืนริมท่าน้ำ คนตัวสูงสุดใส่ป้ายชื่อ "โจ้ ป.6"'},
   {t:'🚫 แบน คิดว่าเป็นผีปลอมตัว',ok:true,mate:-3,why:'บัญชีหายไป… คืนนั้นคุณฝันเห็นพี่โจ้ยืนร้องไห้ริมน้ำ'}]}),
 (F)=>({t:'🎙️ เสียงกระซิบในไลฟ์',x:'ระหว่างพูดขายของ ไมค์จับเสียงกระซิบเป็นคำๆ ที่คุณไม่ได้พูด คนดูพิมพ์ว่า "พูดตามสิ"',mg:'whisper'}),
 ],
 climax:(F,R)=>({t:'📱 จอดำ 05:05',x:'ไลฟ์ตัดไปเอง หน้าจอมือถือสะท้อนห้องของคุณ… มีเงาเด็กห้าคนยืนเรียงหลังคุณ คนกลางยื่นมือมาที่ปุ่ม "เริ่มไลฟ์ใหม่"',
  o:[{t:'🗣️ พูดกับพวกเขาตรงๆ "พวกเธออยากให้ใครรู้อะไร"',ok:true,clue:'live2',why:'จอเปิดเอง เป็นคลิปเก่าภาพแตก ปิดเทอมปี 2541 เด็กห้าคนเล่นน้ำ มีเด็กคนที่หกยืนบนฝั่ง — คนนั้นคือคุณ ที่สัญญาว่าจะไปแต่ไปไม่ทัน'},
   {t:'📴 ปิดมือถือ คว่ำจอ',ok:true,why:'เงาค่อยๆ จางไปทีละคน คนสุดท้ายพูดว่า "เจอกันห้องสุดท้ายนะ"'},
   {t:'▶️ กดเริ่มไลฟ์ใหม่',ok:false,why:'ไลฟ์ที่ไม่มีวันจบ ยอดคนดูขึ้นเลข 4,445'}]}),
},
});
// ---------------- มินิเกมชุด 3 ----------------
Object.assign(MG,{
 // เส้นทาง: ผู้โดยสารบอกเลี้ยว 4 ครั้ง (มีหลอกให้เข้าซอยตัน) ต้องตัดสินใจทันใน 3.5 วิ
 route(e){const T=[];for(let i=0;i<4;i++)T.push({d:rp(['ซ้าย','ขวา']),dead:i>=1&&Math.random()<.35});if(!T.some(t=>t.dead))T[rnd(1,3)].dead=1;let i=0,tm=0;
  const step=()=>{if(!document.getElementById('ghr'))return;if(i>=T.length)return ok_('ถึงปลายทาง ผู้โดยสารลงจากรถ… ไม่มีเสียงฝีเท้าตอนเดินจากไป');const t=T[i];
   frame(`<h2>${E(e.t)}</h2><div class="gx">"${t.d==='ซ้าย'?'เลี้ยวซ้าย':'เลี้ยวขวา'}ตรงนี้…"${t.dead?' <span style="color:#ff8a7a">(ซอยนั้นมีป้าย "ทางตัน")</span>':''}</div><div class="gBar"><i id="ghRb" style="transition:width 3.5s linear"></i></div><button class="gO" data-r="ซ้าย">⬅️ เลี้ยวซ้าย</button><button class="gO" data-r="ขวา">➡️ เลี้ยวขวา</button><button class="gO" data-r="stop">⛽ จอด บอกว่าน้ำมันหมด</button>`);
   requestAnimationFrame(()=>{const b=document.getElementById('ghRb');if(b)b.style.width='100%'});clearTimeout(tm);tm=setTimeout(()=>fail('คุณลังเลนานเกินไป รถพาคุณเข้าซอยเองโดยไม่ต้องบิด'),3600);
   document.querySelectorAll('#ghr [data-r]').forEach(b=>b.onclick=()=>{clearTimeout(tm);const v=b.dataset.r;if(t.dead){if(v==='stop'){i++;return step()}return fail('กฎข้อ 4 — คุณเลี้ยวเข้าซอยตัน ปลายซอยมีคนรออยู่')}if(v!==t.d)return fail(`คุณเลี้ยวผิดทาง ผู้โดยสารหัวเราะ "ทางนี้ก็ได้… ทางนี้ไปที่เดียวกัน"`);i++;step()})};step()},
 // ตาชั่ง: เพิ่มตุ้มให้ได้ 500 กรัมพอดี
 scale(e){let w=0;const P=[50,100,200,20];const draw=()=>{const c=document.getElementById('ghSc');if(c)c.innerHTML=`<div style="text-align:center;font-size:42px;font-family:monospace;color:${w===500?'#7cf0a0':w>500?'#ff8a7a':'#e9e2d4'}">${w} g</div><div style="text-align:center;font-size:28px">🥭 ${w>0?'⚖️':''}</div>`};
  frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br>ชั่งให้ได้ <b>500 กรัมพอดี</b> แล้วกดส่ง (ขาดหรือเกินแม้แต่กรัมเดียว ถือว่าตาชั่งไม่ตรง)</div><div id="ghSc"></div><div class="gGrid" style="grid-template-columns:repeat(4,1fr)">${P.map(p=>`<button data-w="${p}" style="font-size:18px;aspect-ratio:1.4">+${p}</button>`).join('')}</div><button class="gO" id="ghSu">↩️ เอาออกหมด</button><button class="gO" id="ghSs">📦 ส่งให้ลูกค้า</button>`);draw();
  document.querySelectorAll('#ghr [data-w]').forEach(b=>b.onclick=()=>{w+=+b.dataset.w;draw()});document.getElementById('ghSu').onclick=()=>{w=0;draw()};
  document.getElementById('ghSs').onclick=()=>w===500?ok_('ลูกค้าตัวสูงรับถุงไป เจ้าของตลาดที่ยืนอยู่หลังเขาพยักหน้าแล้วเดินผ่านไป'):w<500?fail(`ขาด ${500-w} กรัม — เจ้าของตลาดมาเก็บส่วนต่างจากตัวคุณเอง`):fail(`เกิน ${w-500} กรัม — "ตาชั่งต้องตรงเสมอ" ไม่ใช่แค่ห้ามขาด`)},
 // เทียน: แตะบังลมให้ตรงจังหวะที่ลมมา 4 ระลอก (แตะเร็ว/ช้าเกินไปไฟดับ)
 candle(e){let k=0,gust=0,dead=0,tm=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>แตะเพื่อเอามือบังลม เฉพาะตอนที่ลมมา</b> (บังตอนไม่มีลม ไฟจะขาดอากาศดับ)</div><div style="text-align:center;font-size:80px;height:110px" id="ghCd">🕯️</div><div class="gWhis" id="ghCw">…</div><button class="gHold" id="ghCb" style="width:140px;height:140px">✋ บังลม</button>`);
  const c=document.getElementById('ghCd'),w=document.getElementById('ghCw'),b=document.getElementById('ghCb');
  const wave=()=>{if(dead||!c.isConnected)return;if(k>=4){dead=1;return ok_('ลมสงบ ตะเกียงของแผงคุณเป็นดวงเดียวที่ยังสว่างทั้งตลาด')}w.textContent='…';gust=0;setTimeout(()=>{if(dead||!c.isConnected)return;gust=1;w.textContent='🌬️ ลมมา!!';c.style.transform='skewX(-14deg)';tm=setTimeout(()=>{if(dead)return;dead=1;c.textContent='💨';fail('ลมพัดตะเกียงดับ มีมือหลายมือยื่นเข้ามาในแผงที่มืด')},850)},900+rnd(0,1600))};
  b.onclick=()=>{if(dead)return;if(!gust){dead=1;c.textContent='💨';return fail('คุณบังตอนไม่มีลม ไฟขาดอากาศแล้วดับเอง')}clearTimeout(tm);gust=0;k++;c.style.transform='';w.textContent=`กันได้ ${k}/4`;wave()};wave()},
 // ศาลพระภูมิ: วางของไหว้ตามลำดับที่ป้าย (บางคำเลือน ต้องเดาจากเหตุผล)
 shrine(e){const ORD=['💧 น้ำเปล่า','🌼 พวงมาลัย','🍌 ผลไม้','🍬 ขนมหวาน'],hint=['น้ำ…','พวง…','…ไม้','…หวาน'];const blur=rnd(1,2);let got=[];
  frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}</div><div class="gSheet" style="transform:none;margin:10px 0">${ORD.map((o,i)=>`<div>${i+1}. ${i===blur?'<span style="filter:blur(3px)">▒▒▒▒</span> (เลือนจนอ่านไม่ออก)':hint[i]}</div>`).join('')}</div><div id="ghShO" style="min-height:30px;font-size:20px;text-align:center">${'▫️'.repeat(4)}</div>${shuf(ORD).map(o=>`<button class="gO" data-s="${o}">${o}</button>`).join('')}`);
  document.querySelectorAll('#ghr [data-s]').forEach(b=>b.onclick=()=>{const o=b.dataset.s;if(o!==ORD[got.length])return fail(`ลำดับที่ ${got.length+1} ต้องเป็น ${ORD[got.length]} — ศาลสั่นจนแก้วน้ำแตก`);got.push(o);b.disabled=true;b.style.opacity=.4;document.getElementById('ghShO').textContent=got.map(x=>x.split(' ')[0]).join(' ')+'▫️'.repeat(4-got.length);if(got.length===4)ok_('ควันธูปลอยตรงขึ้นฟ้า ตุ๊กตาชาวบ้านบนศาลยิ้มกว้างขึ้นนิดหนึ่ง')})},
 // หลังคา: นับก้าวที่ได้ยิน ถ้าเกิน 7 ต้องปิดไฟ
 roof(e){const n=rnd(5,10);let i=0;frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}</div><div style="text-align:center;font-size:56px;height:80px" id="ghRf">🏠</div>`);const r=document.getElementById('ghRf');
  const iv=setInterval(()=>{if(!r.isConnected)return clearInterval(iv);if(i>=n){clearInterval(iv);return ask()}i++;r.textContent='👣';try{sfx('click')}catch(x){}setTimeout(()=>{if(r.isConnected)r.textContent='🏠'},230)},540+rnd(0,320));
  const ask=()=>{frame(`<h2>${E(e.t)}</h2><div class="gx">เสียงหยุด… มันเดินกี่ก้าว แล้วคุณจะทำอะไร</div><button class="gO" id="r1">💡 ไม่เกินเจ็ด เปิดไฟไว้ตามเดิม</button><button class="gO" id="r2">🌑 เกินเจ็ด ปิดไฟทั้งบ้าน</button>`);
   document.getElementById('r1').onclick=()=>n<=7?ok_(`${n} ก้าว — มันเดินผ่านไปเฉยๆ`):fail(`มันเดิน ${n} ก้าว เกินเจ็ด… มันรู้แล้วว่าบ้านไหนยังเปิดไฟ`);
   document.getElementById('r2').onclick=()=>n>7?ok_(`${n} ก้าว — คุณปิดไฟทันเวลา เสียงบนหลังคาเดินวนหาอยู่นานแล้วจากไป`):fail(`มันเดินแค่ ${n} ก้าว — การปิดไฟกะทันหันบอกมันว่าคุณได้ยิน`)}},
 // แชท: แบนคอมเมนต์ปี 2541 และห้ามแบนลูกค้าจริง
 chat(e){const N=['ป้าแดงขายดี','น้องเมย์','Somchai88','ลูกค้าประจำ','บี๋','มดแดง','KaeW'],ghost=[],real=[];let dead=0,banned=0,need=0,tm=0;
  frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}<br><b>แตะคอมเมนต์ที่มีวันที่ 2541 เพื่อแบน</b> · ห้ามแบนลูกค้าจริง</div><div id="ghCh" style="height:300px;overflow:hidden;border:1px solid #ffffff22;border-radius:12px;padding:6px;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;font-size:13.5px"></div><div class="gHint" id="ghCs">แบนแล้ว 0</div>`);
  const box=document.getElementById('ghCh');let k=0;const add=()=>{if(dead||!box.isConnected)return;if(k>=14){clearTimeout(tm);if(banned>=need){dead=1;return ok_(`แบนครบ ${banned} บัญชี ยอดคนดูลดลงจาก 4,444 เหลือ 12 — ลูกค้าจริงทั้งหมด`)}dead=1;return fail('มีคอมเมนต์ปี 2541 หลุดรอดไปอยู่ในไลฟ์')}k++;const gh=Math.random()<.38;if(gh)need++;
   const d=document.createElement('div');d.style.cssText='padding:6px 8px;border-radius:8px;background:#ffffff0c;cursor:pointer;animation:ghNew .3s';d.innerHTML=gh?`<b>${rp(['เด็กริมน้ำ','ฝ้าย ม.2','jo','ไม่มีชื่อ','น้อย'])}</b> <span style="opacity:.6">· 12/03/2541</span> ${rp(['ข้างหลังพี่มีคน','เล่นด้วยกันไหม','ทำไมไม่มา','หนาว','รออยู่ที่ท่าน้ำ'])}`:`<b>${rp(N)}</b> <span style="opacity:.6">· ${new Date().toLocaleDateString('th-TH')}</span> ${rp(['CF ค่ะ','ตัวนี้มีไซซ์ไหม','ราคาเท่าไหร่','ส่งฟรีไหม','สวยมากก','รอของอยู่นะคะ'])}`;
   d.onclick=()=>{if(dead||d._b)return;if(!gh){dead=1;clearTimeout(tm);return fail('คุณแบนลูกค้าจริง — เขาส่งข้อความมาว่า "ทำไมแบน ฉันเห็นนะว่าข้างหลังเธอมีใคร"')}d._b=1;banned++;d.style.opacity=.25;d.style.textDecoration='line-through';document.getElementById('ghCs').textContent='แบนแล้ว '+banned};
   box.appendChild(d);while(box.children.length>9){const f=box.firstChild;if(f._gh&&!f._b){dead=1;clearTimeout(tm);return fail('คอมเมนต์ปี 2541 ไหลพ้นจอไปก่อนคุณแบนทัน')}f.remove()}d._gh=gh;tm=setTimeout(add,700+rnd(0,350))};add()},
 // กระซิบ: จำคำ 4 คำตามลำดับ แล้วเรียงใหม่ — ถ้าเรียงถูก ประโยคเผยความจริง
 whisper(e){const W=['ปิดเทอม','ท่าน้ำ','รอ','เพื่อน'];frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}</div><div class="gWhis" id="ghWs" style="font-size:24px;min-height:44px"></div>`);let i=0;const w=document.getElementById('ghWs');
  const iv=setInterval(()=>{if(!w.isConnected)return clearInterval(iv);if(i>=W.length){clearInterval(iv);w.textContent='…';return setTimeout(ask,600)}w.textContent='"'+W[i]+'…"';i++},1100);let got=[];
  const ask=()=>{frame(`<h2>${E(e.t)}</h2><div class="gx">เรียงคำที่ได้ยินตามลำดับ</div><div id="ghWo" style="text-align:center;font-size:18px;min-height:28px"></div>${shuf(W).map(x=>`<button class="gO" data-x="${x}">${x}</button>`).join('')}`);
   document.querySelectorAll('#ghr [data-x]').forEach(b=>b.onclick=()=>{const x=b.dataset.x;if(x!==W[got.length])return fail('คุณพูดผิดลำดับ เสียงกระซิบหัวเราะ "ไม่ใช่… ไม่ใช่แบบนั้น"');got.push(x);b.disabled=true;b.style.opacity=.4;document.getElementById('ghWo').textContent=got.join(' · ');if(got.length===4)ok_('"ปิดเทอม… ท่าน้ำ… รอ… เพื่อน" — คนดูทุกคนพิมพ์ประโยคเดียวกันพร้อมกัน: "เธอไม่มา"')})}},
});
// เบาะแสใหม่ (rent2 · live2) นับรวม · ห้องสุดท้ายเพิ่มทางเลือก "พาพี่โจ้ออกไปด้วย" ถ้าความไว้ใจถึง 4 และพี่โจ้ยังไม่ตาย

// ---------------- ด่านจากชีวิตของคุณเอง (อายุ 25+ มีความทรงจำ 4 เรื่องขึ้นไป) ----------------
const MEM=()=>(S.key||[]).filter(x=>/^\d+ ปี — /.test(x));
const fakeOf=m=>{const a=parseInt(m),t=m.replace(/^\d+ ปี — /,'');const sw=[['ได้','เสีย'],['ชนะ','แพ้'],['เข้า','ออกจาก'],['แต่งงาน','เลิกรา'],['ลูก','หลาน'],['พ่อ','แม่'],['แม่','พ่อ'],['เพื่อน','ศัตรู']];const s=sw.find(p=>t.includes(p[0]));return s?`${a} ปี — ${t.replace(s[0],s[1])}`:`${a+rnd(3,9)} ปี — ${t}`};
ST.self={n:'ชีวิตของคุณ (ฉายซ้ำ)',ic:'🎞️',role:'ตัวคุณเอง',place:'บ้านที่คุณโตมา แต่ทุกห้องเป็นห้องจากช่วงชีวิตต่างกัน',
 rules:[{id:1,t:'กฎของบ้านนี้เขียนด้วยหมึกเดียวกับข้อนี้ หมึกอื่นเป็นความทรงจำที่มีคนแต่งเติม'},
  {id:2,t:'ทุกห้องฉายความทรงจำหนึ่งเรื่องของคุณ ถ้าเรื่องไหนไม่ได้เกิดขึ้นจริง ห้ามเดินเข้าห้องนั้น'},
  {id:3,t:'ถ้าเจอตัวคุณตอนเด็ก ห้ามบอกเขาว่าอนาคตจะเป็นยังไง'},
  {id:4,t:'คนในความทรงจำจะพูดกับคุณได้ แต่ห้ามขอโทษคนที่ตายไปแล้ว ไม่งั้นเขาจะอยากให้คุณอยู่ด้วย'},
  {id:5,t:'ถ้ามีห้องที่ไม่มีความทรงจำ ให้เขียนความทรงจำใหม่ลงไป'},
  {id:6,t:'ห้ามมองกระจกในบ้านนี้ เพราะกระจกจะฉายตอนจบของคุณ'},
  {id:7,t:'ประตูหน้าบ้านเปิดได้ตอนตีห้า ห้ามออกก่อน แม้จะได้ยินเสียงคนที่รอคุณอยู่ข้างนอก'}],
 fake:[4,5],late:{id:8,t:'(เพิ่งมี) ถ้าความทรงจำห้องไหนเปลี่ยนไปจากที่จำได้ ให้ยอมรับฉบับใหม่ อย่าเถียง'},gone:3,
 ev:[
 (F)=>{const M=MEM();if(M.length<3)return null;const pick=shuf(M).slice(0,3),fi=rnd(0,2),L=pick.map((m,i)=>i===fi?fakeOf(m):m);return{t:'🚪 ห้องความทรงจำ',x:`ทางเดินมีประตูสามบาน แต่ละบานมีป้ายเขียนเรื่องหนึ่งจากชีวิตคุณ<br>${L.map((m,i)=>`<div class="gMsg cl" style="margin:6px 0">ประตู ${i+1}: ${E(m)}</div>`).join('')}<span class="gHint">ต้องเดินผ่านสองห้องที่เป็นเรื่องจริง</span>`,
  o:L.map((m,i)=>({t:`🚪 ประตู ${i+1} คือเรื่องที่ไม่เคยเกิด — เลี่ยงมัน`,ok:i===fi,why:i===fi?`ถูกต้อง — จริงๆ แล้วคือ "${E(pick[fi])}" มีคนแก้ความทรงจำนี้`:`ประตู ${i+1} เป็นเรื่องจริง… คุณเดินเข้าห้องที่ไม่เคยเกิดขึ้น และในนั้นคุณใช้ชีวิตอีกแบบอยู่`}))}},
 (F)=>({t:'🧒 ตัวคุณตอนเด็ก',x:`เด็กตัวเล็กหน้าตาเหมือนคุณตอนห้าขวบนั่งเล่นอยู่บนพื้น เงยหน้าขึ้นถาม "โตขึ้นเราจะเป็นยังไงเหรอ"`,
  o:[{t:'🤫 ยิ้ม แล้วบอกว่า "เดี๋ยวก็รู้"',ok:true,why:'เด็กหัวเราะแล้ววิ่งไปเล่นต่อ คุณรู้สึกเบาขึ้นอย่างประหลาด'},{t:'🗣️ เล่าทุกอย่างที่จะเกิด',ok:false,why:'กฎข้อ 3 — เด็กหยุดยิ้ม ห้องทั้งห้องเปลี่ยนเป็นสีเทา ความทรงจำวัยเด็กของคุณหายไปหนึ่งเรื่อง'},{t:'🫂 กอดเขาไว้เฉยๆ',ok:true,why:'เด็กกอดตอบ "พี่ดูเหนื่อยจัง" — คุณร้องไห้โดยไม่รู้ตัว'}]}),
 (F)=>{const p=(S.parents||[]).find(x=>x&&!x.alive)||(S.parents||[])[0];const nm=p?`${p.role} ${p.n}`:'คนที่คุณเคยสูญเสีย';return{t:`👤 ${nm}`,x:`${E(nm)}นั่งรออยู่ที่โต๊ะกินข้าวเหมือนทุกเย็นในวัยเด็ก "มากินข้าวสิ วันนี้ทำของที่ชอบ"`,
  o:[{t:'🙇 "ขอโทษนะ ที่ตอนนั้น…"',ok:F.includes(4),why:F.includes(4)?'กฎข้อ 4 หมึกต่าง — คำขอโทษที่ค้างอยู่ คือสิ่งเดียวที่ทำให้ห้องนี้ปล่อยคุณไป':'กฎข้อ 4 — เขายิ้ม "งั้นอยู่กินข้าวกับเรานานๆ นะ" ประตูห้องหายไป'},{t:'🍚 นั่งกินข้าวด้วย คุยเรื่องทั่วไป',ok:!F.includes(4),why:F.includes(4)?'คุณกินจนอิ่ม แต่คำที่ค้างในใจทำให้ลุกไม่ขึ้น':'มื้อนั้นอร่อยเหมือนเดิม คุณลุกจากโต๊ะได้ตอนที่เขาบอกว่า "ไปเถอะ"'}]}},
 (F)=>({t:'📝 ห้องว่าง',x:'ห้องหนึ่งไม่มีอะไรเลย กลางห้องมีปากกากับกระดาษแผ่นเดียว',
  o:[{t:'✍️ เขียนความทรงจำที่อยากให้เกิด',ok:!F.includes(5),why:F.includes(5)?'กฎข้อ 5 หมึกต่าง — ความทรงจำที่เขียนเอง จะลบเรื่องจริงไปหนึ่งเรื่องแทนที่':'ห้องสว่างขึ้นเป็นภาพที่คุณเขียน มันไม่จริง แต่อบอุ่น'},{t:'🚶 เดินผ่านไป',ok:F.includes(5),why:F.includes(5)?'คุณปล่อยห้องว่างไว้แบบนั้น':'กฎข้อ 5 — ห้องว่างดูดเอาเรื่องหนึ่งของคุณไปเติมเอง'}]}),
 (F)=>({t:'🪞 กระจกในโถง',x:'กระจกบานใหญ่สะท้อนภาพคุณ… แก่กว่าตอนนี้มาก นอนอยู่บนเตียง',mg:'still'}),
 ],
 climax:(F,R)=>({t:'🚪 ประตูหน้าบ้าน 04:58',x:'มีเสียงคนที่คุณรักที่สุดเรียกจากหน้าประตู "ออกมาเถอะ เช้าแล้ว" — นาฬิกาบนผนังบอก 04:58',
  o:[{t:'⏳ รอให้ถึงตีห้า',ok:true,why:'สองนาทีที่ยาวที่สุดในชีวิต เสียงข้างนอกเงียบไป ประตูเปิดเองตอน 05:00 ข้างนอกมีแต่แสงเช้า'},{t:'🚪 เปิดประตูเลย',ok:false,why:'กฎข้อ 7 — คนข้างนอกหน้าตาเหมือนคนที่คุณรัก แต่ยิ้มกว้างเกินไป'}]})};

// ---------------- ห้องสุดท้าย (เบาะแสครบ 5) ----------------
function finale(){const g=G();const fr=g.friend||(g.friend=rp(['แบงค์','ต้น','โอ๊ต','บอล','กอล์ฟ']));R={k:'school',F:[],ink:'k',h:4,i:0,ev:[],ok:0};
 frame(`<h2>🚪 ห้องของผู้เขียนกฎ</h2><div class="gx">ห้องเรียน ป.4 ที่คุณจำได้ทุกรายละเอียด กระดานดำเต็มไปด้วยกฎลายมือเดียวกับทุกด่าน<br><br>เด็กผู้ชายคนหนึ่งนั่งเขียนอยู่ที่โต๊ะหลังห้อง — <b>${E(fr)}</b> เพื่อนที่จมน้ำตายตอนปิดเทอมปี 2541 วันที่คุณสัญญาว่าจะไปเล่นด้วยแต่ไม่ได้ไป<br><br>"ทุกคนออกไปหมดแล้ว" เขาพูดโดยไม่เงยหน้า "${E(S.name||'')} อยู่เล่นด้วยกันอีกหน่อยสิ เราเขียนกฎใหม่ไว้เยอะเลย"</div>
 <button class="gO" id="f1">🤝 "ขอโทษนะ ที่วันนั้นไม่ได้มา" — ปล่อยเขาไป<small>เกมจะปิดตลอดกาล</small></button>
 <button class="gO" id="f2">🖊️ รับปากกาแดงมาเขียนต่อ<small>คุณจะเป็นผู้เขียนกฎคนต่อไป</small></button>
 <button class="gO" id="f3">🔥 เผากระดาษกฎทุกแผ่นในห้อง<small>ฝืนทำลายเกมด้วยมือตัวเอง</small></button>${(g.mate&&g.mate.t>=4&&!(g.mate.dead>=2))?'<button class="gO" id="f4" style="border-color:#7cf0a0aa">🤝 "พี่โจ้ ไปด้วยกัน" — เปิดประตูให้ทุกคน<small>ใช้ความไว้ใจที่สะสมมาทั้งหมด</small></button>':''}`);
 const end=(k,t,x)=>{g.end=k;say(t,'myth');try{keyAdd(t.replace(/<[^>]+>/g,''))}catch(e){}frame(`<h2>${t}</h2><div class="gx">${x}</div><button class="gO" id="ghX">🛏️ กลับสู่ชีวิตจริง</button>`);document.getElementById('ghX').onclick=()=>{R=null;close();try{render()}catch(e){}}};
 {const f4=document.getElementById('f4');if(f4)f4.onclick=()=>{g.fame+=200;g.scar=0;g.coin+=60;try{S.karma=(+S.karma||0)+60}catch(e){}end('together','🌅 ทุกคนได้กลับบ้าน',`ประตูห้องเปิดออก พี่โจ้เดินเข้ามา ตัวเล็กลงเรื่อยๆ จนกลายเป็นเด็ก ป.6 ในรูปริมท่าน้ำ เขาจับมือ ${E(fr)} "ไปกันเถอะ ปิดเทอมแล้ว"<br><br>เด็กห้าคนเดินออกจากห้อง ป.4 ทีละคน คนสุดท้ายหันมาโบกมือให้คุณ — คนที่ไปไม่ทันวันนั้น วันนี้ไปส่งทุกคนถึงประตู<br><br>ซองแดงหยุดมาตลอดกาล · ทั่วประเทศมีข่าวพบรอยเท้าเด็กเปียกน้ำห้าคู่เดินจากท่าน้ำเก่าไปทางวัด · กรรมดี +60 · ชื่อเสียงโลกผี +200`)}}
 document.getElementById('f1').onclick=()=>{g.fame+=50;g.scar=0;try{S.karma=(+S.karma||0)+30}catch(e){}end('free','🕊️ เกมกฎผีปิดลงตลอดกาล',`${E(fr)} เงยหน้าขึ้นยิ้มครั้งแรก "ไม่เป็นไร แค่อยากได้ยินคำนี้" กระดานดำค่อยๆ ลบตัวเองจนว่าง<br><br>คืนนั้นทั่วประเทศ ทุกคนที่เคยได้ซองแดงหลับสนิทเป็นครั้งแรกในรอบหลายปี · กรรมดี +30 · ชื่อเสียงโลกผี +50`)};
 document.getElementById('f2').onclick=()=>{g.fame+=120;g.coin+=100;try{S.karma=(+S.karma||0)-20}catch(e){}end('writer','🖊️ ผู้เขียนกฎคนใหม่',`คุณจับปากกา หมึกแดงไหลออกมาเองเหมือนรอคุณมานาน ${E(fr)} ยิ้ม แล้วจางหายไปเป็นคนแรกที่ได้ออกจากเกม<br><br>ตั้งแต่คืนนี้ ซองแดงทุกซองในประเทศเขียนด้วยลายมือของคุณ · เงินผี +100 · ชื่อเสียงโลกผี +120 · กรรม −20`)};
 document.getElementById('f3').onclick=()=>{frame(`<h2>🔥 เผากฎ</h2><div class="gx">กระดาษไม่ยอมติดไฟ ตัวอักษรบนกระดานขยับเข้ามาหาคุณ <b>กดค้างไว้จนไฟติด</b> อย่าปล่อย</div><div class="gBar"><i id="ghHb"></i></div><div class="gWhis" id="ghW"></div><button class="gHold" id="ghH">🔥 กดค้าง</button>`);
  let t=0,on=0,dead=0;const b=document.getElementById('ghH'),bar=document.getElementById('ghHb'),w=document.getElementById('ghW');const iv=setInterval(()=>{if(!b.isConnected)return clearInterval(iv);if(!on||dead)return;t+=.1;bar.style.width=Math.min(100,t/8*100)+'%';if(Math.random()<.15)w.textContent=rp([`${fr} ร้องไห้`,'อย่าทิ้งเราอีกนะ','ไฟร้อน… ร้อน…','ปล่อยมือสิ']);if(t>=8){dead=1;clearInterval(iv);g.fame+=80;g.scar=0;end('burn','🔥 คนที่เผาเกมกฎผี',`กระดาษแผ่นสุดท้ายลุกเป็นไฟ ห้อง ป.4 พังลงรอบตัว คุณตื่นขึ้นมาพร้อมแผลไหม้ที่ฝ่ามือเป็นรูปตัวอักษรตัวเดียว<br><br>ไม่มีซองแดงมาอีกแล้ว แต่บางคืนคุณยังได้ยินเสียงเด็กเคาะกระจก · ชื่อเสียงโลกผี +80`)}},100);
  b.addEventListener('pointerdown',ev=>{ev.preventDefault();on=1;b.classList.add('on')});const up=()=>{if(dead||!on)return;on=0;b.classList.remove('on');if(t>.5){dead=1;clearInterval(iv);jump();g.scar=5;end('lost','🩸 เกมไม่ยอมจบ',`คุณปล่อยมือ ไฟดับ ${E(fr)} ยิ้มกว้างเกินหน้า "งั้นเล่นต่อนะ" · แผลผี 5 ปี · ซองแดงยังมาตามเดิม`);g.end=null}};addEventListener('pointerup',up);b.addEventListener('pointerleave',up)}}

// ---------------- ล็อบบี้ · ตลาดผีเที่ยงคืน ----------------
function lobby(k){const g=G(),s=ST[k];const fv=Object.keys(GH).filter(x=>g.fav[x]).map(x=>`<span>${GH[x].ic} ${GH[x].n} · ${favT(g.fav[x])}</span>`).join('');
 const o=ov();o.innerHTML=`<div class="gTop"><span class="gClk">23:59</span><span class="gTt">📩 ซองแดง · ด่านคืนนี้: ${s.ic} ${E(s.n)}</span><button class="gB" onclick="ghrJSAsk(1)">${JS()===1?'😱 จั้มสแกร: เปิด':'🙂 จั้มสแกร: ปิด'}</button></div><div class="gBody">
 <h2>🕯️ ตลาดผีเที่ยงคืน</h2><div class="gx">ก่อนเข้าด่าน มีแผงลอยเรียงรายใต้สะพานลอยที่ไม่มีบนแผนที่ แม่ค้าไม่มีใครเงยหน้า</div>
 <div class="gPills"><span>🪙 เงินผี ${g.coin}</span><span>👻 ชื่อเสียงโลกผี ${g.fame}</span><span>🏆 รอด ${g.win}/${g.runs}</span><span>🧩 เบาะแส ${g.clue.length}/5</span>${g.scar?`<span style="color:#ff8a7a">🩸 แผลผี ${g.scar} ปี</span>`:''}</div>${fv?`<div class="gPills">${fv}</div>`:''}
 ${Object.entries(IT).map(([k2,v])=>`<button class="gO" data-b="${k2}" ${g.coin<v.p?'disabled style="opacity:.45"':''}>${v.ic} ${v.n} — 🪙 ${v.p}${g.it[k2]?` · มี ${g.it[k2]}`:''}<small>${v.d}</small></button>`).join('')}
 <button class="gO" id="ghIn" style="border-color:#ff4a3a88;background:#3a0a0a">🚪 เข้าด่าน</button></div>`;
 o.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const k2=b.dataset.b,v=IT[k2];if(g.coin<v.p)return;g.coin-=v.p;if(k2==='nam'){g.scar=0;toast('💧 แผลผีหายแล้ว')}else if(k2==='thoop'){Object.keys(GH).forEach(x=>fav(x,8));toast('🪔 ควันธูปลอยไปทุกทิศ')}else g.it[k2]=(g.it[k2]|0)+1;try{sfx('click')}catch(e){}lobby(k)});
 document.getElementById('ghIn').onclick=()=>start(k)}
window.ghrJSAsk=function(again){const o=ov();o.innerHTML=`<div class="gBody" style="display:flex;flex-direction:column;justify-content:center;min-height:100%"><h2>⚠️ ก่อนเข้าเกมกฎผี</h2><div class="gx">ด่านนี้มี <b>ภาพผีโผล่เต็มจอแบบกะทันหัน (จั้มสแกร)</b> พร้อมเสียงและสั่น เมื่อทำผิดกฎหรือเจอบางเหตุการณ์<br><br>ถ้าตกใจง่าย เป็นโรคหัวใจ หรือเล่นใกล้เด็กเล็ก แนะนำให้ปิดไว้ · เปลี่ยนได้ทุกครั้งที่ตลาดผีเที่ยงคืน</div>
 <button class="gO" id="j1">😱 เปิดจั้มสแกร (สะดุ้งแน่)</button><button class="gO" id="j0">🙂 ปิดจั้มสแกร (ยังน่ากลัวแบบเงียบๆ)</button></div>`;
 document.getElementById('j1').onclick=()=>{try{LS.set('murim_ghrJS',1)}catch(e){}if(again&&R0)lobby(R0);else if(R0)lobby(R0)};document.getElementById('j0').onclick=()=>{try{LS.set('murim_ghrJS',0)}catch(e){}if(R0)lobby(R0)}};
let R0=null;
function enter(k){R0=k;if(JS()==null)return ghrJSAsk(0);lobby(k)}

// ---------------- ซองแดง: ทุก 3–5 ปี อายุ 15+ ในโลกผีไทย ----------------
function invite(){const g=G();if(g.end==='free'||g.end==='burn'||g.end==='together')return;const seen=SK.filter(k=>!g.seen[k]);let k=seen.length?rp(seen):rp(SK);if(S.age>=25&&(S.key||[]).length>=5&&g.runs>=2&&!g.seen.self&&Math.random()<.45)k='self';const s=ST[k];
 if(auto){g.next=S.age+rnd(3,5);say('📩 คืนนั้นมีซองกระดาษสีแดงวางอยู่ใต้หมอน แต่คุณหลับลึกเกินกว่าจะตื่นมาเปิด','');return}
 const writer=g.end==='writer';
 choice(writer?'🖊️ ซองแดงที่คุณเขียนเอง':'📩 ซองแดงใต้หมอน',writer?`ซองแดงลายมือของคุณเองวางอยู่ใต้หมอน ด่านคืนนี้คือ <b>${s.ic} ${s.n}</b> — จะลงไปเล่นเองสักรอบไหม`:`ตีห้าทุ่มห้าสิบเก้า ซองกระดาษสีแดงวางอยู่ใต้หมอน ข้างในเขียนว่า<br><b>"คุณถูกเลือก · ${s.ic} ${s.n} · ${s.role}"</b><br><span class="tag2">รอดถึงเช้า = เงินจริง · เงินผี · ชื่อเสียงในโลกผี · ผิดกฎ = ถูกไล่ออก ไม่ได้อะไร และอาจมีบางอย่างตามกลับมา</span>${g.scar?`<br><span class="tag2" style="color:#e0503c">🩸 แผลผียังอยู่อีก ${g.scar} ปี</span>`:''}`,[
  {t:'🚪 เปิดซอง เข้าเกม',s:'เล่นด่านกฎผี',noFate:true,f(){g.next=S.age+rnd(3,5);setTimeout(()=>enter(k),250)}},
  {t:'🔥 เผาซองทิ้ง ไม่ไป',s:'ซองหน้าจะมาใน 3–5 ปี',skip:true,f(){g.next=S.age+rnd(3,5);say('🔥 คุณเผาซองแดงทิ้งในอ่างล้างหน้า ขี้เถ้าเรียงตัวเป็นคำว่า "ไว้คราวหน้า"','')}},
  ...(g.scar?[{t:'🛕 ไปวัด ขอน้ำมนต์ล้างแผลผีแทน',s:'แผลผีหาย · ไม่ได้เข้าเกม',f(){g.scar=0;g.next=S.age+rnd(3,5);say('🛕 หลวงพ่อพรมน้ำมนต์ให้สามครั้ง ฝันร้ายหายไปในคืนนั้น','good')}}]:[])])}
function yearTick(){try{if(!wOn())return;const g=G();
 if(g.scar>0){g.scar--;if(Math.random()<.6){try{S.happy=Math.max(0,(S.happy||50)-6)}catch(e){}say(rp(['🩸 ฝันร้ายทั้งปี ตื่นมาตีสามทุกคืนพร้อมกลิ่นธูป','🩸 กระจกห้องน้ำมีรอยนิ้วมือจากด้านใน','🩸 โทรศัพท์ดังตอนตีสาม ไม่มีเบอร์โทรเข้า']),'bad')}}
 if(S.age>=15&&S.age>=g.next&&!g.pend){g.pend=1;let n=0;const tr=()=>{try{if(!wOn()||!S.alive){g.pend=0;return}if(choice._cur||modalOpen||document.getElementById('ghr')){if(++n<40)return setTimeout(tr,1500);g.pend=0;return}g.pend=0;if(S.age>=g.next)invite()}catch(e){g.pend=0;console.error('ghr',e)}};setTimeout(tr,600)}}catch(e){console.error('ghr tick',e)}}
{const _y=mwYear;mwYear=function(){const r=_y.apply(this,arguments);yearTick();return r};try{window.mwYear=mwYear}catch(e){}}
// เมนู: สมุดเกมกฎผี
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const m=$('modal');if(m&&S&&S._ghr&&!m.querySelector('.ghrEnt')){const a=m.querySelector('.tkEnt')||m.querySelector('.dlyB')||m.querySelector('.svStat');if(a)a.insertAdjacentHTML('afterend','<button class="gbtn ghrEnt" style="width:100%;margin:6px 0" onclick="ghrBook()">📜 สมุดเกมกฎผี</button>')}}catch(e){}return r};window.openMenu=openMenu}
window.ghrBook=function(){const g=G();const sc=SK.map(k=>`<div class="item">${ST[k].ic} <b>${ST[k].n}</b> <span class="tag2">เข้า ${g.seen[k]|0} ครั้ง</span></div>`).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📜 สมุดเกมกฎผี</h3><p class="tag2">ซองแดงครั้งต่อไป: อายุราว ${g.next} ปี${g.end?` · ตอนจบ: ${{free:'🕊️ ปล่อยเพื่อนไป',writer:'🖊️ ผู้เขียนกฎคนใหม่',burn:'🔥 เผาเกม',lost:'🩸 เกมไม่ยอมจบ',together:'🌅 ทุกคนได้กลับบ้าน'}[g.end]||''}`:''}</p>
 <div class="item">🪙 เงินผี <b>${g.coin}</b> · 👻 ชื่อเสียงโลกผี <b>${g.fame}</b> · 🏆 รอด ${g.win}/${g.runs} · 🧩 เบาะแส ${g.clue.length}/5${g.scar?` · 🩸 แผลผี ${g.scar} ปี`:''}</div>
 <h4>ผีที่รู้จัก</h4>${Object.keys(GH).map(x=>`<div class="item">${GH[x].ic} <b>${GH[x].n}</b> — ${favT(g.fav[x]|0)} (${g.fav[x]|0})<br><span class="tag2">${GH[x].d}</span></div>`).join('')}
 <h4>ด่าน</h4>${sc}<p class="tag2">จั้มสแกร: ${JS()===1?'เปิด':'ปิด'} <a href="#" onclick="try{LS.set('murim_ghrJS',${JS()===1?0:1})}catch(e){};ghrBook();return false">เปลี่ยน</a></p>`,'ghrbook')};
{const _is=window.island;if(typeof _is==='function'){window.island=function(n){try{if(document.getElementById('ghr')&&!(n&&n.ghr)){setTimeout(()=>window.island(n),5000);return}}catch(e){}return _is.apply(this,arguments)};try{island=window.island}catch(e){}}}
window._ghr={ST,G,start,enter,invite,jump,finale,MG,show:e=>show(e),get R(){return R}};
})()}catch(e){console.error('ghr.js',e)}
wReady('ghr');
