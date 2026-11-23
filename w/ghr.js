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
const SK=['school','hosp','cvs','fun'];

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
body:has(#ghr) :is(#mvBar,#mvRz,#mFloat,#islCards){display:none!important}
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
function start(k){const s=ST[k],g=G();const F=[rp(s.fake)];R={k,F,ink:rp(['k','b']),redF:Math.random()<.5,h:22,i:0,ev:shuf(s.ev.map((_,i)=>i)).slice(0,5),ok:0,tak:(g.it.tak|0)>0,lies:0,clue:null,skip:0,rev:0};
 // ผีที่ชอบคุณมาก แอบบอก
 const friend=Object.keys(g.fav).find(x=>g.fav[x]>=60);
 const late=(()=>{const h=new Date().getHours();return h>=0&&h<5})();
 frame(`<h2>${s.ic} ${E(s.n)}</h2><div class="gx">คุณลืมตาขึ้นใน${E(s.place)} ในฐานะ<b>${E(s.role)}</b><br>กระดาษแผ่นหนึ่งพับอยู่ในกระเป๋าเสื้อ ลายมือที่ไม่รู้ว่าใครเขียน<br><br>ต้องอยู่ให้ถึง <b>06:00</b> โดยไม่ทำผิดกฎ${late?`<br><br><span style="color:#ff8a7a">🕒 ข้างนอกจริงๆ ตอนนี้ก็ ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')} แล้วเหมือนกัน… ทำไมยังไม่นอนล่ะ</span>`:''}</div>
 ${sheetHTML()}${friend?`<div class="gMsg cl">${GH[friend].ic} ${GH[friend].n} กระซิบข้างหู "ข้อ ${F[0]} ไม่ใช่ของพวกเรา"</div>`:''}<button class="gO" id="ghGo">▶ เริ่มคืนนี้</button>`);
 document.getElementById('ghGo').onclick=()=>next()}
function next(){if(!R)return;if(R.i>=R.ev.length)return finish(true);R.h=22+(R.i+1)*(8/(R.ev.length+1));if(R.h>=24)R.h-=0;
 const s=ST[R.k],e=s.ev[R.ev[R.i]](R.F);R.i++;const hh=R.h%24;
 // ตีสอง: ใบกฎเปลี่ยน
 if(!R.chg&&hh>=2&&hh<10){R.chg=1;return interlude(`<div class="gMsg cl">📜 กระดาษในกระเป๋าอุ่นขึ้นมาเอง… <b>ใบกฎเปลี่ยนไป</b> มีข้อหนึ่งหายไป และมีข้อใหม่เพิ่มเข้ามา</div>${sheetHTML()}`,()=>show(e))}
 // ระบบโกหก (ไดนามิกไอส์แลนด์ปลอม) ครั้งเดียวต่อรอบ
 if(!R.lie&&R.i===2){R.lie=1;const truthy=s.rules.find(r=>!R.F.includes(r.id)&&r.id>1);try{island({ghr:1,big:1,pri:1,ic:'⚠️',h:'ระบบ',t:`อย่าเชื่อกฎข้อ ${truthy?truthy.id:2} มันถูกแก้ไขแล้ว`,kind:'bad',ms:4200})}catch(x){}}
 show(e)}
function interlude(h,go){frame(h+'<button class="gO" id="ghNx">▶ ต่อ</button>');document.getElementById('ghNx').onclick=go}
function show(e){if(R.skip===1){R.skip=2;return interlude(`<div class="gMsg ok">🍚 ข้าวก้นบาตรในกระเป๋าร่วงหล่น… <b>${E(e.t)}</b> ผ่านไปเฉยๆ เหมือนไม่มีใครเห็นคุณ</div>`,next)}
 if(e.mg)return MG[e.mg](e);
 const gh=e.gh&&GH[e.gh],g=G();const fv=gh?(g.fav[e.gh]|0):0;
 frame(`<h2>${E(e.t)}</h2><div class="gx">${e.x}${gh&&fv?`<br><span class="gHint">${gh.ic} ${gh.n} · ${favT(fv)} (${fv})</span>`:''}</div><div id="ghOs">${e.o.map((o,i)=>`<button class="gO" data-i="${i}">${o.t}</button>`).join('')}</div>`);
 const bind=()=>document.querySelectorAll('#ghOs .gO').forEach(b=>b.onclick=()=>pick(e,e.o[+b.dataset.i]));bind();wireFn=bind;
 // ปุ่มสลับที่เอง (ครั้งเดียวต่อรอบ)
 if(!R.swp&&e.o.length>=2&&Math.random()<.35){R.swp=1;setTimeout(()=>{const w=document.getElementById('ghOs');if(!w)return;const bs=[...w.children];if(bs.length<2)return;w.insertBefore(bs[1],bs[0]);document.getElementById('ghr').classList.add('flk');setTimeout(()=>{const o=document.getElementById('ghr');o&&o.classList.remove('flk')},1000)},1400)}}
function pick(e,o){const g=G();if(o.fav&&e.gh)fav(e.gh,o.fav);if(o.gh&&o.fav)fav(o.gh,o.fav);if(o.clue&&!g.clue.includes(o.clue)){g.clue.push(o.clue);R.clue=o.clue}
 if(o.jump)jump();
 if(o.ok){R.ok++;interlude(`<div class="gMsg ok">✅ ${E(o.why||'รอด')}</div>${o.clue&&R.clue===o.clue?`<div class="gMsg cl">🧩 <b>เบาะแส ${g.clue.length}/5</b> — ใครเป็นคนเขียนกฎ?</div>`:''}`,next);return}
 fail(o.why||'ผิดกฎ')}
function fail(why){const g=G();if(R.tak&&(g.it.tak|0)>0){g.it.tak--;R.tak=0;return interlude(`<div class="gMsg bad">⚠️ ${E(why)}</div><div class="gMsg ok">🪬 ตะกรุดในกระเป๋าร้อนจนแสบ… แล้วแตกออกเป็นสองท่อน <b>คุณยังไม่ถูกไล่ออก</b></div>`,next)}
 jump();setTimeout(()=>finish(false,why),JS()===1?650:0)}
function finish(win,why){const g=G(),s=ST[R.k];g.runs++;let h='';
 if(win){g.win++;const rw=Math.round((18000+R.ok*6000)*(1+g.win*.08)),cn=rnd(14,24)+R.ok*2,fm=10+R.ok*3;try{S.money=(+S.money||0)+rw}catch(e){}g.coin+=cn;g.fame+=fm;try{if(S.mw)S.mw.fame=(S.mw.fame||0)+fm*40}catch(e){}
  h=`<h2>🌅 06:00</h2><div class="gx">แสงแรกลอดเข้ามา ใบกฎในมือกลายเป็นขี้เถ้าร่วงลงพื้น คุณลืมตาขึ้นบนเตียงของตัวเอง</div><div class="gPills"><span>💰 ${money(rw)}</span><span>🪙 เงินผี +${cn}</span><span>👻 ชื่อเสียงโลกผี +${fm}</span></div>`;
  say(`📜 <b>รอดจากเกมกฎผี: ${s.n}</b> ทำตามกฎถูก ${R.ok} เรื่อง · ได้ ${money(rw)} · เงินผี +${cn} · ชื่อเสียงโลกผี +${fm}`,'epic');try{sfx('good')}catch(e){}}
 else{g.scar=Math.max(g.scar,rnd(2,4));const cn=rnd(0,4);g.coin+=cn;h=`<h2>❌ ถูกไล่ออกจากด่าน</h2><div class="gMsg bad">${E(why)}</div><div class="gx">คุณสะดุ้งตื่นตอนตีห้า ใบกฎเปียกเหงื่อ ข้อที่คุณทำผิดถูกวงด้วยหมึกแดง<br>มีบางอย่างตามคุณกลับมาด้วย — <b>🩸 แผลผี ${g.scar} ปี</b> (ฝันร้าย โชคตก) จนกว่าจะล้างด้วยน้ำมนต์</div>`;
  say(`📜 <b>ตกรอบเกมกฎผี: ${s.n}</b> — ${why} · ติด 🩸 แผลผี ${g.scar} ปี`,'bad')}
 g.seen[R.k]=(g.seen[R.k]|0)+1;
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

// ---------------- ห้องสุดท้าย (เบาะแสครบ 5) ----------------
function finale(){const g=G();const fr=g.friend||(g.friend=rp(['แบงค์','ต้น','โอ๊ต','บอล','กอล์ฟ']));R={k:'school',F:[],ink:'k',h:4,i:0,ev:[],ok:0};
 frame(`<h2>🚪 ห้องของผู้เขียนกฎ</h2><div class="gx">ห้องเรียน ป.4 ที่คุณจำได้ทุกรายละเอียด กระดานดำเต็มไปด้วยกฎลายมือเดียวกับทุกด่าน<br><br>เด็กผู้ชายคนหนึ่งนั่งเขียนอยู่ที่โต๊ะหลังห้อง — <b>${E(fr)}</b> เพื่อนที่จมน้ำตายตอนปิดเทอมปี 2541 วันที่คุณสัญญาว่าจะไปเล่นด้วยแต่ไม่ได้ไป<br><br>"ทุกคนออกไปหมดแล้ว" เขาพูดโดยไม่เงยหน้า "${E(S.name||'')} อยู่เล่นด้วยกันอีกหน่อยสิ เราเขียนกฎใหม่ไว้เยอะเลย"</div>
 <button class="gO" id="f1">🤝 "ขอโทษนะ ที่วันนั้นไม่ได้มา" — ปล่อยเขาไป<small>เกมจะปิดตลอดกาล</small></button>
 <button class="gO" id="f2">🖊️ รับปากกาแดงมาเขียนต่อ<small>คุณจะเป็นผู้เขียนกฎคนต่อไป</small></button>
 <button class="gO" id="f3">🔥 เผากระดาษกฎทุกแผ่นในห้อง<small>ฝืนทำลายเกมด้วยมือตัวเอง</small></button>`);
 const end=(k,t,x)=>{g.end=k;say(t,'myth');try{keyAdd(t.replace(/<[^>]+>/g,''))}catch(e){}frame(`<h2>${t}</h2><div class="gx">${x}</div><button class="gO" id="ghX">🛏️ กลับสู่ชีวิตจริง</button>`);document.getElementById('ghX').onclick=()=>{R=null;close();try{render()}catch(e){}}};
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
function invite(){const g=G();if(g.end==='free'||g.end==='burn')return;const seen=SK.filter(k=>!g.seen[k]),k=seen.length?rp(seen):rp(SK),s=ST[k];
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
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📜 สมุดเกมกฎผี</h3><p class="tag2">ซองแดงครั้งต่อไป: อายุราว ${g.next} ปี${g.end?` · ตอนจบ: ${{free:'🕊️ ปล่อยเพื่อนไป',writer:'🖊️ ผู้เขียนกฎคนใหม่',burn:'🔥 เผาเกม',lost:'🩸 เกมไม่ยอมจบ'}[g.end]||''}`:''}</p>
 <div class="item">🪙 เงินผี <b>${g.coin}</b> · 👻 ชื่อเสียงโลกผี <b>${g.fame}</b> · 🏆 รอด ${g.win}/${g.runs} · 🧩 เบาะแส ${g.clue.length}/5${g.scar?` · 🩸 แผลผี ${g.scar} ปี`:''}</div>
 <h4>ผีที่รู้จัก</h4>${Object.keys(GH).map(x=>`<div class="item">${GH[x].ic} <b>${GH[x].n}</b> — ${favT(g.fav[x]|0)} (${g.fav[x]|0})<br><span class="tag2">${GH[x].d}</span></div>`).join('')}
 <h4>ด่าน</h4>${sc}<p class="tag2">จั้มสแกร: ${JS()===1?'เปิด':'ปิด'} <a href="#" onclick="try{LS.set('murim_ghrJS',${JS()===1?0:1})}catch(e){};ghrBook();return false">เปลี่ยน</a></p>`,'ghrbook')};
{const _is=window.island;if(typeof _is==='function'){window.island=function(n){try{if(document.getElementById('ghr')&&!(n&&n.ghr)){setTimeout(()=>window.island(n),5000);return}}catch(e){}return _is.apply(this,arguments)};try{island=window.island}catch(e){}}}
window._ghr={ST,G,start,enter,invite,jump,finale};
})()}catch(e){console.error('ghr.js',e)}
wReady('ghr');
