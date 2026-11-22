// ============================================================
// 🕳️ สากลภพ (Universal Ascension) — เบต้า
//  ทัวร์นาเมนต์ข้ามโลก 4 คน (คุณ + เงาจักรวาล 3 ตน) · ด่าน 4 แบบ (กู้ภัย/ชิงสมบัติ/ประลอง/เขาวงกต)
//  ด่านละ 3 จังหวะ เลือกภายใน 12 วิ · ตัวเลือกตามโลกของตัวละคร · ท่าที 4 แบบตีกันแบบเป่ายิ้งฉุบ
//  เบต้า: เล่นในเครื่องอย่างเดียว ยังไม่ลบเซฟจริง ไม่ขึ้นทำเนียบ ไม่ได้รางวัล
//  ทุกอย่างสุ่มจากเลขเมล็ดเดียว (rng) เพื่อให้ต่อยอดเป็นเล่นพร้อมกันหลายเครื่องได้
// ============================================================
(function(){
const $$=id=>document.getElementById(id);
const E=s=>{try{return esc(String(s))}catch(e){return String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]))}};
const LSg=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSs=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const vb=ms=>{try{vib(ms)}catch(e){}};
function rngOf(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let R=Math.random;const pick=a=>a[Math.floor(R()*a.length)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

// ---------- โลก ----------
const WD={
 murim:{ic:'⚔️',n:'ยุทธภพ',c:'#e8b54a'},xian:{ic:'☁️',n:'โลกเทพเซียน',c:'#b49aff'},mw:{ic:'🏙️',n:'ยุคปัจจุบัน',c:'#7ad0ff'},
 soul:{ic:'⭕',n:'จิตวิญญาณยุทธ์',c:'#3ad0b0'},beast:{ic:'🐾',n:'สัตว์อสูร',c:'#6ad08a'},sky:{ic:'🌠',n:'ทะลุฟ้าดารา',c:'#ff8a3d'}};
// ท่าที: r=เร่ง g=ระวัง s=ขัดขวาง h=ช่วย
const ST={r:{ic:'⚡',n:'เร่ง'},g:{ic:'🛡️',n:'ระวัง'},s:{ic:'🗡️',n:'ขัดขวาง'},h:{ic:'🤝',n:'ช่วย'}};
// ตัวเลือกตามโลก × ท่าที (แต่ละด่านเติมบริบทเอง)
const CH={
 murim:{r:['ใช้วิชาตัวเบาพุ่งนำไปก่อน','ระเบิดลมปราณเปิดทางตรง','กระโดดข้ามหลังคาไปทางลัด'],g:['ตั้งท่ารับ อ่านจังหวะก่อนขยับ','โคจรลมปราณคุ้มกายแล้วค่อยไป','ฟังเสียงลม หาทางที่ปลอดภัย'],s:['ดีดก้อนหินตัดเส้นทางคู่แข่ง','ซัดอาวุธลับปักทางเดินเขา','แย่งเส้นทางแคบไว้คนเดียว'],h:['ยื่นมือดึงคู่แข่งขึ้นมาด้วยกัน','ถ่ายลมปราณช่วยประคอง','แบ่งเส้นทางให้ไปพร้อมกัน']},
 xian:{r:['เหยียบกระบี่เหาะพุ่งไป','ใช้ยันต์เคลื่อนย้ายพริบตา','เผาโลหิตแก่นเร่งความเร็ว'],g:['กางค่ายกลป้องกันรอบตัว','นั่งสมาธิรับรู้ด้วยจิต','ส่งหุ่นกระดาษไปลองทางก่อน'],s:['วางค่ายกลมายาลวงทาง','ปล่อยหมอกพิษปิดเส้นทาง','ผนึกกระบี่คู่แข่งชั่วคราว'],h:['แบ่งโอสถให้คู่แข่ง','กางค่ายกลคลุมทั้งสองคน','ส่งกระแสจิตบอกทางรอด']},
 mw:{r:['เรียกเฮลิคอปเตอร์มารับ','ขับมอเตอร์ไซค์ซิ่งทางลัด','เปิด GPS วิ่งตามเส้นทางเร็วสุด'],g:['เช็กข่าวและแผนที่ก่อนตัดสินใจ','ใส่ชุดป้องกันแล้วค่อยเดิน','โทรถามผู้เชี่ยวชาญ'],s:['ไลฟ์สดแฉคู่แข่งให้คนรุมกดดัน','แจ้งเจ้าหน้าที่ให้กั้นทางคู่แข่ง','ปล่อยข่าวปลอมให้คู่แข่งหลงทาง'],h:['ไลฟ์สดเรียกคนมาช่วยทั้งสองฝั่ง','แชร์โลเคชันให้คู่แข่ง','โยนเชือกให้คู่แข่งจับ']},
 soul:{r:['ปลดปล่อยวงแหวนที่ 1 พุ่งทะยาน','ผสานวิญญาณยุทธ์เร่งความเร็ว','ให้สัตว์วิญญาณแบกวิ่ง'],g:['กางวงแหวนป้องกันรอบกาย','ใช้วิญญาณยุทธ์สายรับรู้สำรวจ','รอวงแหวนชาร์จเต็มก่อน'],s:['ปล่อยวงแหวนควบคุมใส่คู่แข่ง','ให้วิญญาณยุทธ์พันขาคู่แข่ง','ปิดทางด้วยกำแพงวิญญาณ'],h:['แบ่งพลังวิญญาณให้คู่แข่ง','วิญญาณยุทธ์สายรักษาช่วยฟื้นฟู','ผสานวงแหวนคู่ฝ่าไปด้วยกัน']},
 beast:{r:['วิ่งสี่ขาเต็มกำลัง','กระโจนข้ามเหวด้วยแรงสัตว์อสูร','ดมกลิ่นหาทางลัด'],g:['หมอบนิ่ง ฟังเสียงรอบตัว','ห่มเกราะเกล็ดรับแรงกระแทก','ปีนที่สูงดูสถานการณ์'],s:['คำรามขู่ให้คู่แข่งชะงัก','ข่วนดินถล่มทับทาง','ส่งฝูงไปขวางคู่แข่ง'],h:['คาบคู่แข่งข้ามจุดอันตราย','แบ่งเหยื่อให้มีแรง','นำทางด้วยสัญชาตญาณป่า']},
 sky:{r:['เปิดบูสเตอร์ชุดเกราะพุ่งตรง','ขี่โดรนบรรทุกบินข้าม','โอเวอร์คล็อกยีนอสูรเร่งร่างกาย'],g:['สแกนพื้นที่ด้วยดาวเทียม','กางโล่พลังงานรอบตัว','ให้ AI คำนวณเส้นทางปลอดภัย'],s:['แฮ็กดาวเทียมปิดแผนที่คู่แข่ง','ส่งโดรนกวนสัญญาณ','วางทุ่นระเบิด EMP ดักทาง'],h:['แชร์สัญญาณนำทางให้คู่แข่ง','ส่งโดรนพยาบาลไปช่วย','เชื่อมโล่พลังงานคลุมสองคน']}};
// ด่าน
const SETS={
 res:[[['เขื่อนเหนือหุบเขาแตก น้ำทะลักลงมา','ชาวบ้าน 60 คนติดอยู่บนหลังคา'],['กระแสน้ำพัดบ้านทั้งหลังลอยไป','มีแม่ลูกเกาะขอนไม้อยู่กลางน้ำ'],['น้ำระลอกใหญ่สุดกำลังมา','เหลือคนสุดท้ายบนยอดหอระฆัง']],[['เมืองทั้งเมืองลุกเป็นไฟกลางดึก','เสียงคนร้องจากหอสมุดชั้นบน'],['ควันดำปกคลุมจนมองไม่เห็นทาง','มีคนชราเป็นลมอยู่ในตรอก'],['หลังคาหอสมุดกำลังถล่ม','เด็กกอดคัมภีร์โบราณไม่ยอมทิ้ง']]],
 tre:[[['เรือผีโผล่กลางหมอกทะเล','สมบัติอยู่ในห้องกัปตันใต้ท้องเรือ'],['ลูกเรือโครงกระดูกตื่นขึ้นมา','ทางเดินไม้ผุพังทีละแผ่น'],['เรือกำลังจม หีบสมบัติลอยห่างออกไป','ใครคว้าได้ก่อนคือผู้ชนะ']],[['ตลาดมืดใต้ดินเปิดประมูลของต้องห้าม','ของชิ้นเอกจะขายให้คนแรกที่ถึงโต๊ะ'],['ยามตลาดมืดเริ่มไล่จับคนแปลกหน้า','ทางลับมีให้ผ่านแค่คนเดียว'],['ไฟดับทั้งตลาด','มือของใครจะถึงของก่อน']]],
 duel:[[['ลานประลองบนหลังมังกรหินที่ลอยอยู่','ลมแรงจนยืนแทบไม่อยู่'],['มังกรหินพลิกตัว พื้นเอียง','ทั้งคู่ต้องหาจังหวะยืนให้มั่น'],['มังกรหินดิ่งลงทะเลเมฆ','จังหวะสุดท้ายก่อนตกถึงพื้น']],[['สนามประลองในกระจกพันบาน','เงาสะท้อนเลียนแบบท่าของทั้งคู่'],['กระจกแตก เศษคมลอยว่อน','มองไม่ออกว่าตัวจริงอยู่ตรงไหน'],['กระจกบานสุดท้าย','ใครหาตัวจริงเจอก่อนได้ฟันก่อน']]],
 maze:[[['เขาวงกตในห้องสมุดที่ชั้นหนังสือเดินได้','ป้ายบอกทางเขียนด้วยภาษาที่ไม่มีใครอ่านออก'],['หนังสือบินโจมตีคนที่ส่งเสียงดัง','มีทางลัดผ่านห้องเก็บคัมภีร์ต้องห้าม'],['ประตูทางออกถามปริศนา','ตอบผิดจะถูกส่งกลับจุดเริ่ม']],[['เขาวงกตใต้ทะเลสาบน้ำแข็ง','อากาศหายใจเหลือไม่มาก'],['น้ำแข็งเริ่มร้าวใต้เท้า','ได้ยินเสียงคู่แข่งเคาะผนังอีกฝั่ง'],['เห็นแสงทะลุน้ำแข็งด้านบน','ทุบออกได้แค่ช่องเดียว']]]};
const STG=[
 {k:'res',ic:'🌋',n:'กู้ภัย',rule:'ใครช่วยคนได้มากกว่าชนะ · ช่วยกันได้ แต่ระวังโดนแย่งผลงาน',ax:['p','c'],unit:'คนที่รอด',
  beats:[['ภูเขาไฟปะทุ ลาวาไหลลงหมู่บ้านเชิงเขา','มีคนติดอยู่ในบ้าน 40 คน'],['สะพานข้ามลำธารลาวากำลังพัง','ฝั่งตรงข้ามมีเด็กร้องให้ช่วย'],['ปากปล่องระเบิดซ้ำ ฝนหินตกลงมา','เหลือเวลาอีกนิดเดียวก่อนหมู่บ้านจมทั้งหมด']]},
 {k:'tre',ic:'🏺',n:'ชิงสมบัติ',rule:'ใครถึงสมบัติก่อนชนะ · แทงข้างหลังกันได้',ax:['b','c'],unit:'ก้าวใกล้สมบัติ',
  beats:[['สุสานโบราณกลางทะเลทรายเปิดประตู','ทางเข้ามีสองทาง ทางหนึ่งมีกับดัก'],['ห้องโถงเต็มไปด้วยรูปปั้นที่ขยับได้','สมบัติลอยอยู่บนแท่นกลางห้อง'],['เพดานเริ่มถล่ม สมบัติเหลือแค่ชิ้นเดียว','คนที่คว้าได้ก่อนคือผู้ชนะ']]},
 {k:'duel',ic:'⚔️',n:'ประลองตรง',rule:'ใครทำแต้มบาดแผลใส่อีกฝ่ายได้มากกว่าชนะ',ax:['b','b'],unit:'แต้มประลอง',
  beats:[['ลานหินกลางทะเลเมฆ ทั้งสองเผชิญหน้ากัน','ผู้ประกาศโบกมือ เริ่ม!'],['ฝุ่นตลบ ทั้งคู่ได้แผลคนละนิด','ต่างฝ่ายต่างอ่านทางกันออก'],['จังหวะสุดท้าย','ทั้งคู่รวบรวมพลังทั้งหมด']]},
 {k:'maze',ic:'🧭',n:'เขาวงกต',rule:'ใครออกจากเขาวงกตก่อนชนะ · วางกับดักใส่กันได้',ax:['p','p'],unit:'ก้าวสู่ทางออก',
  beats:[['เขาวงกตกระจกที่สะท้อนอดีตของแต่ละคน','ทางแยกสามทางอยู่ตรงหน้า'],['กำแพงเลื่อนได้ ทางที่เพิ่งเดินมาหายไป','ได้ยินเสียงคู่แข่งอยู่หลังกำแพง'],['เห็นแสงทางออกแล้ว','ทางเดินแคบพอให้ผ่านได้ทีละคน']]}];
// ผลของท่าที [ท่าเรา][ท่าเขา] → แต้มเรา
const MX={r:{r:2,g:3,s:0,h:3},g:{r:1,g:1,s:3,h:2},s:{r:3,g:0,s:1,h:4},h:{r:1,g:2,s:-1,h:3}};
const WHY={r:{g:'เร่งตัดหน้าตอนอีกฝ่ายยังระวังอยู่',s:'เร่งเข้าไปเจอกับดักพอดี'},g:{s:'ระวังไว้ก่อน กับดักไม่โดน',r:'ระวังจนช้าเกินไป'},s:{r:'ดักคนที่วิ่งเข้ามาพอดี',g:'อีกฝ่ายระวังอยู่ กับดักเสียเปล่า',h:'หักหลังคนที่ยื่นมือมาช่วย'},h:{s:'ยื่นมือช่วย แต่โดนหักหลัง',h:'ช่วยกันทั้งคู่ ได้ผลดีทั้งสองฝั่ง'}};

// ---------- ตัวละคร ----------
function worldOf(s){try{if(s.beast)return'beast';if(typeof skyOn==='function'&&skyOn())return'sky';if(s.sky||s.ch==='sky')return'sky';if(s.mw)return'mw';if(s.ch==='soul')return'soul';if(s.xian)return'xian'}catch(e){}return'murim'}
function pctOf(v,mid){v=Math.max(0,+v||0);return clamp(Math.round(100*(1-1/(1+Math.pow(v/Math.max(1,mid),.6)))),8,97)}
function fromS(){try{if(typeof S==='undefined'||!S||!S.alive)return null;const w=worldOf(S);let pw=0;try{pw=typeof total==='function'?total():(S.power||0)}catch(e){pw=S.power||0}
  const b=pctOf(pw,w==='mw'?60:w==='xian'?3000:300),p=clamp(Math.round(20+(+S.int||0)*.7),10,95),c=pctOf(S.fame||(S.mw&&S.mw.fame)||0,200);
  return{me:1,name:S.name||'ไร้นาม',w,age:S.age|0,b,p,c,hab:'g',real:1,adult:(S.age|0)>=18}}catch(e){return null}}
const NM={murim:['หลี่ เทียนหยาง','จาง หลิงเฟิง','หมี เสวี่ยฮวา','ซ่ง ไป๋อวิ๋น'],xian:['เซียวเฉิน','ฮั่วหลิงเอ๋อร์','มู่ชิงอวิ๋น','เย่ฟาน'],mw:['ธนกร ใจกล้า','พิมพ์ชนก แสงทอง','กิตติ วงศ์ดี','ณัฐ ศรีสุข'],soul:['ถังซาน','เสี่ยวอู่','ไต้มู่ไป๋','หนิงหรงหรง'],beast:['เขี้ยวเงิน','ปีกพายุ','เกล็ดนิล','อัสนีขาว'],sky:['ไอริน ฟ้าคราม','ภพ เหล็กกล้า','นภา ดาวตก','ยศ เกราะทอง']};
const HAB=['r','g','s','h'],HABN={r:'ใจร้อน ชอบบุก',g:'รอบคอบ',s:'เจ้าเล่ห์',h:'ใจดี ชอบช่วย'};
function ghost(w,lv){const n=pick(NM[w]);const base=lv==null?40+R()*35:lv;return{name:n,w,age:18+Math.floor(R()*300),b:clamp(Math.round(base+R()*16-8),10,92),p:clamp(Math.round(base+R()*20-10),10,92),c:clamp(Math.round(base+R()*20-10),10,92),hab:pick(HAB),ghost:1}}
function testChar(){const w=pick(Object.keys(WD));const g=ghost(w,55);g.ghost=0;g.me=1;g.test=1;g.hab='g';g.name=g.name+' (ตัวทดลอง)';return g}

// ---------- CSS ----------
const css=document.createElement('style');css.textContent=`
#uaS{position:fixed;inset:0;z-index:9500;overflow-y:auto;overflow-x:hidden;background:radial-gradient(120% 80% at 50% 0%,#2a1458 0%,#120a2a 45%,#07041a 100%);color:#efe6ff;font-family:inherit;-webkit-tap-highlight-color:transparent;overscroll-behavior:contain}
#uaS .uw{max-width:560px;margin:0 auto;padding:calc(12px + env(safe-area-inset-top)) 14px calc(28px + env(safe-area-inset-bottom));min-height:100%;box-sizing:border-box;position:relative}
#uaS .uaX{position:absolute;right:12px;top:calc(10px + env(safe-area-inset-top));z-index:5;width:38px;height:38px;border-radius:50%;border:1px solid #ffffff33;background:#0006;color:#fff;font-size:16px;cursor:pointer}
#uaS h2{margin:4px 44px 4px 0;font-size:22px;line-height:1.25}#uaS h2 .bt{font-size:10px;vertical-align:4px;margin-left:6px;padding:2px 7px;border-radius:999px;background:#c8204a}
#uaS .sub{opacity:.75;font-size:12.5px;margin-bottom:10px}
#uaS .ban{width:100%;aspect-ratio:3/2;max-height:260px;border-radius:16px;image-rendering:pixelated;display:block;box-shadow:0 0 0 2px #b49aff66,0 10px 30px #000a;object-fit:cover;background:#07041a}
#uaS .card{background:linear-gradient(160deg,#ffffff10,#ffffff05);border:1px solid #ffffff1f;border-radius:16px;padding:12px 13px;margin:10px 0}
#uaS .stp{display:flex;gap:10px;align-items:flex-start;margin:9px 0;font-size:13px;line-height:1.5}#uaS .stp i{font-style:normal;flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#b49aff33;border:1px solid #b49aff88;font-size:14px}
#uaS .mxg{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;font-size:12px;margin-top:6px}#uaS .mxg div{padding:7px 9px;border-radius:10px;background:#0004;line-height:1.4}
#uaS .btn{display:block;width:100%;border:0;border-radius:14px;padding:13px;font:inherit;font-weight:900;font-size:15.5px;cursor:pointer;margin-top:10px;color:#1a0a30;background:linear-gradient(180deg,#e8dcff,#b49aff 55%,#7a5ad0);box-shadow:0 3px 0 #3a2470}
#uaS .btn.red{color:#fff;background:linear-gradient(180deg,#ff6a8a,#c8204a 60%,#8a1030);box-shadow:0 3px 0 #4a0818,0 0 18px #ff3a6a55}
#uaS .btn.gh{color:#efe6ff;background:#ffffff12;box-shadow:none;border:1px solid #ffffff26;font-weight:700}
#uaS .btn:disabled{opacity:.4}
#uaS .who{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:#0005;border:1px solid var(--c,#fff3)}
#uaS .who .ic{font-size:26px}#uaS .who b{display:block;font-size:14.5px}#uaS .who small{opacity:.75;font-size:11.5px}
#uaS .ax{display:flex;gap:6px;margin-top:8px}#uaS .ax span{flex:1;text-align:center;padding:5px 2px;border-radius:10px;background:#0004;font-size:11.5px}#uaS .ax b{display:block;font-size:15px}
#uaS input.cf{width:100%;box-sizing:border-box;margin-top:8px;padding:11px 12px;border-radius:12px;border:1.5px solid #ff6a8a88;background:#0006;color:#fff;font:inherit;font-size:16px;text-align:center}
/* ห้อง */
#uaS .room{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
#uaS .slot{padding:9px;border-radius:12px;background:#0005;border:1px dashed #ffffff33;min-height:54px;font-size:12px;display:flex;gap:8px;align-items:center;transition:all .3s}
#uaS .slot.on{border-style:solid;border-color:var(--c);box-shadow:0 0 12px color-mix(in srgb,var(--c) 40%,transparent);animation:uaIn .35s cubic-bezier(.2,1.3,.4,1)}
#uaS .slot .ic{font-size:22px}#uaS .slot b{display:block;font-size:12.5px}#uaS .slot.me{background:#b49aff22}
#uaS .slot.dead{opacity:.35;filter:grayscale(1);text-decoration:line-through}
#uaS .brk{display:grid;grid-template-columns:1fr 26px 1fr;align-items:center;gap:6px;margin:8px 0;font-size:12px}#uaS .brk .vs{text-align:center;font-weight:900;color:#ffd86a}
#uaS .brk div{padding:6px 8px;border-radius:10px;background:#0005;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#uaS .brk .w{box-shadow:0 0 0 1.5px #ffd86a}#uaS .brk .l{opacity:.35;text-decoration:line-through}
/* ผู้ประกาศ */
#uaS .ann{text-align:center;padding:18px 12px;border-radius:18px;background:radial-gradient(100% 120% at 50% 0%,#4a2a90,#1a0e3a);border:2px solid #ffd86a;box-shadow:0 0 30px #b49aff55;animation:uaIn .45s cubic-bezier(.2,1.3,.4,1)}
#uaS .ann .eye{font-size:34px;animation:uaBl 3s infinite}#uaS .ann .q{font-size:11.5px;opacity:.8;letter-spacing:.5px}
#uaS .ann .m{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px 0;font-size:15px;font-weight:900}#uaS .ann .m span{flex:1;min-width:0}#uaS .ann .m i{font-style:normal;color:#ffd86a;font-size:20px}
#uaS .ann .st{font-size:17px;font-weight:900;color:#ffd86a;margin-top:4px}#uaS .ann .rl{font-size:12.5px;opacity:.9;margin-top:4px}
/* ด่าน */
#uaS .sc{display:flex;gap:8px;align-items:center;margin:8px 0}#uaS .sc .pl{flex:1;min-width:0}#uaS .sc .pl b{font-size:12px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#uaS .sc .bar{height:10px;border-radius:6px;background:#0006;overflow:hidden;margin-top:3px}#uaS .sc .bar i{display:block;height:100%;width:0;transition:width .6s cubic-bezier(.2,1.2,.4,1)}
#uaS .sc .pl.r{text-align:right}#uaS .sc .pl.r .bar i{margin-left:auto}#uaS .sc .num{font-size:18px;font-weight:900;color:#ffd86a;min-width:30px;text-align:center}
#uaS .beat{font-size:12px;opacity:.8;margin-top:6px}#uaS .sit{font-size:15px;line-height:1.5;margin:6px 0 2px;font-weight:700}#uaS .sit small{display:block;font-weight:normal;opacity:.8;font-size:12.5px}
#uaS .tm{position:relative;height:6px;border-radius:4px;background:#0006;overflow:hidden;margin:10px 0 4px}#uaS .tm i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#ff3a6a,#ffd86a);transition:width .2s linear}
#uaS .tmT{font-size:12px;text-align:right;opacity:.85}#uaS .tmT.hot{color:#ff6a8a;font-weight:900;animation:uaBl .5s infinite}
#uaS .opt2{display:flex;gap:10px;align-items:center;width:100%;text-align:left;border:1.5px solid #ffffff26;border-radius:14px;padding:11px 12px;margin:7px 0;background:#ffffff0c;color:inherit;font:inherit;font-size:14px;cursor:pointer;animation:uaIn .3s both;animation-delay:calc(var(--d)*60ms)}
#uaS .opt2 .s{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-size:17px;background:#0005}#uaS .opt2 small{display:block;font-size:11px;opacity:.7}
#uaS .opt2.pk{border-color:#ffd86a;background:#ffd86a22;box-shadow:0 0 14px #ffd86a55}#uaS .opt2:disabled:not(.pk){opacity:.4}
#uaS .rv{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}#uaS .rv>div{padding:10px;border-radius:14px;background:#0005;font-size:12.5px;line-height:1.45;animation:uaFl .5s both}#uaS .rv>div:nth-child(2){animation-delay:.25s}
#uaS .rv .tg{font-size:20px}#uaS .rv .pt{font-size:18px;font-weight:900;color:#ffd86a}#uaS .rv .pt.neg{color:#ff6a8a}#uaS .rv .ok{color:#9affc8}#uaS .rv .ng{color:#ff9a9a}
#uaS .why{text-align:center;font-size:12.5px;padding:8px;border-radius:12px;background:#ffd86a18;border:1px solid #ffd86a44;animation:uaIn .4s .5s both}
#uaS .mx{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;font-size:11px;opacity:.75;margin-top:8px}
/* จบ */
#uaS .big{text-align:center;padding:20px 10px}#uaS .big .e{font-size:58px;animation:uaIn .6s cubic-bezier(.2,1.4,.4,1)}#uaS .big h3{margin:8px 0 4px;font-size:21px}
#uaS .note{font-size:11.5px;opacity:.7;text-align:center;margin-top:10px;line-height:1.5}
#uaS .gv{display:flex;gap:8px;align-items:center;padding:8px 10px;border-radius:12px;background:#0004;margin:6px 0;font-size:12.5px}#uaS .gv i{font-style:normal;font-size:18px}
#uaShat{position:fixed;inset:0;z-index:9600;pointer-events:none;image-rendering:pixelated}
#uaS .rmsg{position:fixed;left:0;right:0;top:40%;z-index:9610;text-align:center;padding:0 20px;color:#fff;font-size:17px;font-weight:900;text-shadow:0 2px 12px #ff3a6a,0 0 2px #000;animation:uaIn .6s 1s both;pointer-events:none}
@keyframes uaIn{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
@keyframes uaFl{from{opacity:0;transform:rotateY(80deg)}to{opacity:1;transform:none}}
@keyframes uaBl{50%{opacity:.55}}
body.mRM #uaS *{animation:none!important;transition:none!important}`;document.head.appendChild(css);

// ---------- สถานะ ----------
let G=null,T=null,AT=null;
function root(){let s=$$('uaS');if(!s){s=document.createElement('div');s.id='uaS';s.innerHTML='<div class="uw" id="uaMain"></div>';document.body.appendChild(s);chatMount()}return s}
function scr(h,noX){const s=root();const m=$$('uaMain');m.innerHTML=`${noX?'':'<button class="uaX" onclick="uaClose()">✕</button>'}${h}`;s.scrollTop=0;try{chatMode()}catch(e){}return s}
function stopT(){clearInterval(T);T=null;clearTimeout(AT);AT=null}
window.uaClose=function(){if(G&&G.phase==='play'&&G.cur&&(G.ps[G.cur.a].me||G.ps[G.cur.b].me)&&!confirm('ออกตอนนี้ = ยอมแพ้ (เบต้า: ชีวิตจริงไม่ถูกลบ) ออกเลยไหม?'))return;try{if(G&&G.ps&&!G.sent)statSend(0)}catch(e){}stopT();G=null;CHT.list=[];clearTimeout(CHT.t);const s=$$('uaS');if(s)s.remove();const c=$$('uaShat');if(c)c.remove()};
const wdot=w=>`<span style="color:${WD[w].c}">${WD[w].ic}</span>`;
const who=(p,extra)=>`<div class="who" style="--c:${WD[p.w].c}"><span class="ic">${WD[p.w].ic}</span><div style="flex:1;min-width:0"><b>${E(p.name)}</b><small>${WD[p.w].n} · อายุ ${p.age} ปี${p.ghost?' · 👻 เงาจักรวาล':''}${p.test?' · ตัวทดลอง':''}</small>${extra||''}</div></div>`;
const axH=p=>`<div class="ax"><span>💪 กาย<b>${p.b}</b></span><span>🧠 ปัญญา<b>${p.p}</b></span><span>👑 บารมี<b>${p.c}</b></span></div>`;

// ---------- 1) หน้าแรก: วิธีเล่น ----------
window.uaOpen=function(){stopT();G=null;R=Math.random;const me=fromS();
 const s=scr(`<h2>🕳️ สากลภพ<span class="bt">BETA</span></h2><div class="sub">ทัวร์นาเมนต์ข้ามโลก · ผู้ชนะกลืนกินจักรวาล ผู้แพ้ถูกลบ</div>
 <canvas class="ban" id="uaBan" width="96" height="64"></canvas>
 <div class="card"><b>📖 วิธีเล่น</b>
  <div class="stp"><i>1</i><div>ส่ง<b>ตัวละครที่กำลังเล่นอยู่</b> (อายุ 18 ปีขึ้นไป) จากโลกไหนก็ได้ เข้าห้อง 4 คน ที่ว่างจะมี <b>👻 เงาจักรวาล</b> มาเติม</div></div>
  <div class="stp"><i>2</i><div>📢 ผู้ประกาศบอกคู่ ด่าน และกติกาชนะ ทั้งคู่ลงไปเจอเหตุการณ์เดียวกัน <b>3 จังหวะ</b></div></div>
  <div class="stp"><i>3</i><div>ทุกจังหวะเลือกภายใน <b>12 วินาที</b> ตัวเลือกมาจากโลกของคุณเอง ไม่ทันกด = ตัวละครเลือกเองตามนิสัย</div></div>
  <div class="stp"><i>4</i><div>ทุกตัวเลือกมี<b>ท่าที</b> ซ่อนอยู่ ท่าทีตีกันแบบเป่ายิ้งฉุบ ค่าตัวละครช่วยแค่นิดหน่อย <b>อ่านใจคู่ต่อสู้สำคัญกว่า</b></div></div>
  <div class="mxg"><div>⚡ <b>เร่ง</b> ชนะ 🛡️ ระวัง<br><small>ระวังจนช้าเกินไป</small></div><div>🛡️ <b>ระวัง</b> ชนะ 🗡️ ขัดขวาง<br><small>กับดักไม่โดน</small></div><div>🗡️ <b>ขัดขวาง</b> ชนะ ⚡ เร่ง<br><small>วิ่งเข้ากับดักพอดี</small></div><div>🤝 <b>ช่วย</b> ได้ทั้งคู่<br><small>แต่ถ้าโดน 🗡️ = เสียหนัก</small></div></div>
  <div class="stp"><i>✴️</i><div><b>ท่าไม้ตายประจำโลก</b> ใช้ได้ครั้งเดียวต่อคู่ เปิดก่อนกดตัวเลือก · ชนะจังหวะนั้น = แต้ม <b>×2</b> · แพ้จังหวะ = <b>−2</b> · เลือกจังหวะใช้ให้ดี</div></div>
  <div class="stp"><i>5</i><div>ชนะ 2 คู่ = แชมป์ <b>"ผู้ข้ามพ้นสากลภพ"</b> · แพ้ = จอแตกเป็นพิกเซล <b>จักรวาลถูกลบ</b></div></div>
 </div>
 <div class="card" style="border-color:#ff6a8a66;background:#ff3a6a12"><b>🧪 ช่วงเบต้า</b><div style="font-size:12.5px;line-height:1.55;margin-top:4px">เล่นกับเงาจักรวาลในเครื่องคุณ ยังไม่มีผู้เล่นจริง · <b>แพ้แล้วชีวิตจริงยังไม่ถูกลบ</b> · ยังไม่ขึ้นทำเนียบและไม่มีรางวัล · เล่นได้ไม่จำกัด</div></div>
 <div class="card"><b>🧍 ตัวละครที่จะส่งไป</b><div id="uaWho" style="margin-top:8px"></div></div>
 <button class="btn red" id="uaNext">⚔️ เดิมพันจักรวาล</button>
 <button class="btn gh" onclick="uaGrave()">🕳️ สุสานจักรวาล</button>`);
 try{const c=$$('uaBan');let f=0;uaArt(c,0);clearInterval(AT);const iv=setInterval(()=>{if(!c.isConnected)return clearInterval(iv);f^=1;uaArt(c,f)},700)}catch(e){}
 let P=me&&me.adult?me:null;const wb=$$('uaWho');
 const draw=()=>{if(P){wb.innerHTML=who(P,axH(P))+`<div class="note" style="text-align:left">ค่าทั้ง 3 คือ<b>อันดับเทียบในโลกตัวเอง</b> (0–100) ต่างโลกจึงสู้กันได้ · ช่วยโอกาสสำเร็จได้ไม่เกิน ±15%</div>`}
  else wb.innerHTML=`<div style="font-size:12.5px;line-height:1.55;opacity:.9">${me?`ตัวละครตอนนี้ <b>${E(me.name)}</b> อายุ ${me.age} ปี ยังไม่ถึง 18 ปี`:'ตอนนี้ไม่มีตัวละครที่ยังมีชีวิตอยู่'} · ช่วงเบต้าลองเล่นด้วย<b>ตัวทดลอง</b>ได้</div><button class="btn gh" id="uaTest">🎲 สุ่มตัวทดลองจากโลกไหนก็ได้</button>`;
  const t=$$('uaTest');if(t)t.onclick=()=>{P=testChar();draw()};$$('uaNext').disabled=!P};
 draw();$$('uaNext').onclick=()=>{if(P)confirmBet(P)}};

// ---------- 2) ยืนยัน 2 ชั้น ----------
function confirmBet(P){scr(`<h2>⚠️ ยืนยันการเดิมพัน</h2>${who(P,axH(P))}
 <div class="card" style="font-size:13px;line-height:1.6">ถ้าแพ้ในสากลภพ <b>จักรวาล${WD[P.w].n}ของ ${E(P.name)} จะถูกลบ</b> ชีวิตนี้จบทันทีและนับเป็นการตายแบบพิเศษ<br><small style="opacity:.75">ห้ามใช้ของกันตายหรือชุบชีวิต · เน็ตหลุดหรือพับจอ ระบบเลือกแทน</small><br><br><b style="color:#9affc8">🧪 เบต้า: ตอนนี้ยังไม่ลบจริง</b></div>
 <div style="font-size:13px;text-align:center;margin-top:6px">พิมพ์คำว่า <b style="color:#ff9ab0">เดิมพัน</b> เพื่อยืนยัน</div><input class="cf" id="uaCf" placeholder="เดิมพัน" autocomplete="off">
 <button class="btn red" id="uaGo" disabled>🕳️ เข้าสากลภพ</button><button class="btn gh" onclick="uaOpen()">‹ กลับ</button>`);
 const i=$$('uaCf'),g=$$('uaGo');i.oninput=()=>{g.disabled=i.value.trim()!=='เดิมพัน'};g.onclick=()=>{vb(30);lobby(P)}}

// ---------- 3) ห้อง ----------
function lobby(P){const seed=(Date.now()^Math.floor(Math.random()*1e9))>>>0;R=rngOf(seed);
 const ws=Object.keys(WD).filter(w=>w!==P.w);const lv=(P.b+P.p+P.c)/3;const ps=[Object.assign({},P,{me:1})];
 for(let i=0;i<3;i++){const w=ws.splice(Math.floor(R()*ws.length),1)[0];ps.push(ghost(w,clamp(lv-6+R()*10,20,85)))}
 for(let i=ps.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[ps[i],ps[j]]=[ps[j],ps[i]]}
 G={seed,ps,phase:'lobby',m:[[0,1],[2,3]],win:[],hist:[],st:{to:0,s_:{},sw_:{}}};CHT.list=[];CHT.view=14+Math.floor(Math.random()*20);{const l=$$('uaCl');if(l)l.innerHTML=''}
 const WAIT=30;const t0=Date.now();const at=ps.map(p=>p.me?400:3000+Math.random()*17000);
 scr(`<h2>🕳️ ห้องสากลภพ</h2><div class="sub">รหัสทัวร์ #${(seed%100000).toString().padStart(5,'0')} · รอจักรวาลอื่นเข้าห้อง · คุยกับคนดูได้ที่แชทด้านล่าง</div>
 <div class="room" id="uaRoom">${ps.map((_,i)=>`<div class="slot" id="uaSl${i}">⏳ รอจักรวาล…</div>`).join('')}</div>
 <div class="lbW"><div class="lbT" id="uaLbT">เริ่มใน ${WAIT} วิ</div><div class="tm"><i id="uaLbB" style="width:100%"></i></div></div>
 <div class="card" id="uaBk" style="display:none"></div><button class="btn" id="uaB1" disabled>⏳ รอคนครบ…</button>`);
 chatSys(`🕳️ เปิดห้องสากลภพ #${(seed%100000).toString().padStart(5,'0')} · ${CHT.view} คนกำลังดู`);
 const shown=ps.map(()=>0);let iv=null;const start=()=>{clearInterval(iv);if(G&&G.phase==='lobby')nextMatch()};
 iv=setInterval(()=>{if(!G||G.phase!=='lobby'||!$$('uaRoom')){clearInterval(iv);return}const el=Date.now()-t0;
  ps.forEach((p,i)=>{if(!shown[i]&&el>=at[i]){shown[i]=1;const e=$$('uaSl'+i);e.className='slot on'+(p.me?' me':'');e.style.setProperty('--c',WD[p.w].c);e.innerHTML=`<span class="ic">${WD[p.w].ic}</span><div><b>${E(p.name)}${p.me?' (คุณ)':''}</b>${WD[p.w].n}${p.ghost?' · 👻':''}<br><small style="opacity:.7">${p.ghost?'นิสัย: '+HABN[p.hab]:''}</small></div>`;vb(8);if(!p.me){chatSys(`${WD[p.w].ic} ${p.name} เข้าห้องแล้ว`);setTimeout(()=>ghostSay(p,'join'),900+Math.random()*1500)}}});
  const all=shown.every(Boolean);const left=Math.max(0,WAIT-Math.floor(el/1000));const tt=$$('uaLbT'),bb=$$('uaLbB');if(tt)tt.textContent=all?`ครบ 4 จักรวาลแล้ว · เริ่มใน ${left} วิ`:`รอจักรวาลอื่น… เริ่มใน ${left} วิ`;if(bb)bb.style.width=(left/WAIT*100)+'%';
  const bk=$$('uaBk'),b1=$$('uaB1');if(all&&bk&&bk.style.display==='none'){bk.style.display='';bk.innerHTML=`<b>🏆 สายการแข่ง</b>${brk()}`;b1.disabled=false;b1.textContent='⚡ พร้อมแล้ว เริ่มเลย';b1.onclick=start;chatSys('🏆 จับคู่เรียบร้อย · ทายกันหน่อยใครจะรอด?')}
  if(el>=WAIT*1000&&all)start()},250)}
function brk(){const ps=G.ps;const cell=(i,r)=>{const lost=G.hist.some(h=>h.l===i),won=G.hist.some(h=>h.w===i&&h.r===r);return`<div class="${won?'w':lost&&G.hist.find(h=>h.l===i).r===r?'l':''}">${wdot(ps[i].w)} ${E(ps[i].name)}${ps[i].me?' ⭐':''}</div>`};
 let h=`<div class="brk">${cell(0,0)}<div class="vs">VS</div>${cell(1,0)}</div><div class="brk">${cell(2,0)}<div class="vs">VS</div>${cell(3,0)}</div>`;
 if(G.win.length===2)h+=`<div style="text-align:center;font-size:11px;opacity:.7;margin-top:6px">— รอบชิง —</div><div class="brk">${cell(G.win[0],1)}<div class="vs">VS</div>${cell(G.win[1],1)}</div>`;return h}

// ---------- 4) ผู้ประกาศ ----------
function nextMatch(){stopT();let a,b,r;if(G.win.length<2){const i=G.hist.filter(h=>h.r===0).length;[a,b]=G.m[i];r=0}else{[a,b]=G.win;r=1}
 const st=STG[Math.floor(R()*STG.length)];const A=G.ps[a],B=G.ps[b];const mine=A.me||B.me;
 const sets=[st.beats].concat(SETS[st.k]||[]);const bs=sets[Math.floor(R()*sets.length)];
 G.cur={a,b,r,st,bs,beat:0,sc:[0,0],log:[],ult:[0,0]};if(mine){G.st.s_[st.k]=(G.st.s_[st.k]||0)+1}G.phase='ann';
 const meDead=G.hist.some(h=>G.ps[h.l].me);
 scr(`<div class="ann"><div class="eye">👁️</div><div class="q">ผู้จดบันทึกสากลภพ ประกาศ</div>
  <div style="margin-top:6px;font-size:13px">${r?'🏆 รอบชิงแชมป์':'⚔️ คู่ที่ '+(G.hist.filter(h=>h.r===0).length+1)}</div>
  <div class="m"><span>${wdot(A.w)} ${E(A.name)}</span><i>VS</i><span>${wdot(B.w)} ${E(B.name)}</span></div>
  <div class="st">${st.ic} ด่าน${st.n}</div><div class="rl">${st.rule}</div></div>
  <div class="card" style="font-size:12.5px;line-height:1.55">${annLine(A,B)}</div>
  ${mine?`<button class="btn red" id="uaGo2">ลงสนาม ›</button>`:`<button class="btn" id="uaGo2">👀 ${meDead?'ดูต่อ':'นั่งดูคู่นี้'}</button>`}${!mine&&meDead?'<button class="btn gh" onclick="uaClose()">ออกจากสากลภพ</button>':''}`,mine);
 $$('uaGo2').onclick=()=>{G.phase='play';beat()};vb(20)}
function annLine(A,B){const L=[];const g=[A,B].find(p=>p.ghost);if(g)L.push(`👻 ${E(g.name)} คือเงาของจักรวาล${WD[g.w].n}ที่เคยถูกลบ นิสัย<b>${HABN[g.hab]}</b>`);
 const ax=G.cur.st.ax;const nm={b:'💪 กาย',p:'🧠 ปัญญา',c:'👑 บารมี'};L.push(`ด่านนี้วัด <b>${[...new Set(ax)].map(x=>nm[x]).join(' + ')}</b>`);
 const sa=(A[ax[0]]+A[ax[1]])/2,sb=(B[ax[0]]+B[ax[1]])/2;L.push(Math.abs(sa-sb)<6?'สองฝั่งสูสีกันมาก':`ค่าตัวเปรียบ ${E((sa>sb?A:B).name)} ได้เปรียบเล็กน้อย แต่จังหวะสำคัญกว่า`);return L.join('<br>')}

// ---------- 5) จังหวะ ----------
const statOf=(p,st)=>(p[st.ax[0]]+p[st.ax[1]])/2;
function optsFor(p,bi){const all=HAB.slice();for(let i=all.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[all[i],all[j]]=[all[j],all[i]]}const sel=all.slice(0,3);
 return sel.map(s=>({s,t:pick(CH[p.w][s])}))}
function aiPick(p,opts,foe,hist){const has=s=>opts.find(o=>o.s===s);let w={r:1,g:1,s:1,h:1};w[p.hab]+=2;if(p.ghost&&p.prom){if(p.prom==='h')w.h+=4;else w.s+=4}
 // อ่านจังหวะก่อนของคู่: ถ้าคู่ชอบเร่ง → ขัดขวาง
 const last=hist.length?hist[hist.length-1]:null;if(last){const fs=last[foe];const ctr={r:'s',g:'r',s:'g',h:'s'}[fs];w[ctr]+=1.2}
 let tot=0;const c=opts.map(o=>{const v=w[o.s];tot+=v;return v});let x=R()*tot;for(let i=0;i<opts.length;i++){x-=c[i];if(x<=0)return opts[i]}return opts[0]}
function beat(){stopT();const C=G.cur,A=G.ps[C.a],B=G.ps[C.b],st=C.st,bi=C.beat;const meSide=A.me?0:B.me?1:-1;
 const oa=optsFor(A,bi),ob=optsFor(B,bi);C.opt=[oa,ob];C.pk=[null,null];C.buf=[0,0];const evH=npcEvent(C,A,B,meSide);
 const [l1,l2]=(C.bs||st.beats)[bi];
 const myO=meSide<0?null:(meSide?ob:oa);const me=meSide<0?null:(meSide?B:A);const canU=me&&!C.ult[meSide];C.uOn=0;
 scr(`${scoreH()}<div class="beat">${st.ic} ด่าน${st.n} · จังหวะ ${bi+1}/3</div><div class="sit">${l1}<small>${l2}</small></div>
  ${evH}<div class="tm"><i id="uaTm" style="width:100%"></i></div><div class="tmT" id="uaTmT">12 วิ</div>
  ${canU?`<button class="ultB" id="uaUlt" type="button"><span>✴️</span><span><b>ท่าไม้ตาย: ${E(ULT[me.w])}</b><small>ใช้ได้ครั้งเดียวต่อคู่ · ชนะจังหวะนี้ = แต้ม ×2 · ถ้าแพ้จังหวะ = −2</small></span><i>ปิด</i></button>`:me?`<div class="ultU">✴️ ใช้ท่าไม้ตายไปแล้วในคู่นี้</div>`:''}<div id="uaOp">${myO?myO.map((o,i)=>`<button class="opt2" style="--d:${i}" data-i="${i}"><span class="s">${ST[o.s].ic}</span><span>${E(o.t)}<small>${ST[o.s].n}</small></span></button>`).join(''):`<div class="card" style="text-align:center;font-size:13px">👀 ทั้งคู่กำลังเลือก… ตัวเลือกจะเปิดเผยหลังจบจังหวะ</div>`}</div>
  <div class="mx">⚡>🛡️ · 🛡️>🗡️ · 🗡️>⚡ · 🤝 ได้ทั้งคู่ แต่แพ้ 🗡️</div>`,meSide>=0);
 const hist=C.log.map(l=>[l.a.s,l.b.s]);
 // AI ฝั่งที่ไม่ใช่เรา เลือกไว้ (ตัดสินพร้อมกัน)
 if(meSide!==0)C.pk[0]=aiPick(A,oa,1,hist);if(meSide!==1)C.pk[1]=aiPick(B,ob,0,hist);
 {const u=$$('uaUlt');if(u)u.onclick=()=>{if(C.pk[meSide])return;C.uOn=!C.uOn;u.classList.toggle('on',!!C.uOn);u.querySelector('i').textContent=C.uOn?'เปิด':'ปิด';vb(15)}}
 // เงาใช้ท่าไม้ตาย: จังหวะสุดท้ายถ้าตามหลัง หรือสุ่ม 20%
 [0,1].forEach(sd=>{if(sd===meSide||C.ult[sd])return;const behind=C.sc[sd]<C.sc[1-sd];if((bi===2&&behind)||R()<.2){C.ult[sd]=1;C.uNow=C.uNow||[0,0];C.uNow[sd]=1}});
 if(myO)document.querySelectorAll('#uaOp .opt2').forEach(b=>b.onclick=()=>{if(C.pk[meSide])return;C.pk[meSide]=myO[+b.dataset.i];if(C.uOn){C.ult[meSide]=1;C.uNow=C.uNow||[0,0];C.uNow[meSide]=1}const uB=$$('uaUlt');if(uB)uB.disabled=true;b.classList.add('pk');document.querySelectorAll('#uaOp .opt2').forEach(x=>x.disabled=true);vb(12);$$('uaTmT').textContent='✔ เลือกแล้ว · รอเปิดเผย…';setTimeout(()=>{if(G&&G.cur===C&&C.beat===bi)reveal()},700)});
 const dur=meSide>=0?12000:3200,t0=Date.now();
 T=setInterval(()=>{const left=Math.max(0,dur-(Date.now()-t0));const i=$$('uaTm');if(i)i.style.width=(left/dur*100)+'%';const tt=$$('uaTmT');if(tt&&!(meSide>=0&&C.pk[meSide])){tt.textContent=Math.ceil(left/1000)+' วิ';tt.classList.toggle('hot',left<4000&&meSide>=0)}
  if(left<=0){clearInterval(T);T=null;if(meSide>=0&&!C.pk[meSide]){const me=meSide?B:A;C.pk[meSide]=aiPick(Object.assign({},me,{hab:me.hab||'g'}),myO,1-meSide,hist);C.auto=1;G.st.to++;if(C.uOn){C.ult[meSide]=1;C.uNow=C.uNow||[0,0];C.uNow[meSide]=1}toast('⏳ ไม่ทันกด — ตัวละครเลือกเองตามนิสัย')}reveal()}},150)}
function roll(p,o,st,buf){const bonus=clamp((statOf(p,st)-50)*.3,-15,15);const ch=clamp(60+bonus+(buf||0),20,95);return{ok:R()*100<ch,ch:Math.round(ch)}}
function reveal(){stopT();const C=G.cur,A=G.ps[C.a],B=G.ps[C.b],st=C.st;const pa=C.pk[0],pb=C.pk[1];if(!pa||!pb)return;
 let xa=MX[pa.s][pb.s],xb=MX[pb.s][pa.s];const bf=C.buf||[0,0];const ra=roll(A,pa,st,bf[0]),rb=roll(B,pb,st,bf[1]);
 if(!ra.ok)xa=Math.floor(xa/2)-(pa.s==='s'?1:0);if(!rb.ok)xb=Math.floor(xb/2)-(pb.s==='s'?1:0);
 const uN=C.uNow||[0,0];const cl=[xa-xb,xb-xa];if(uN[0])xa=cl[0]>0?xa*2:xa-2;if(uN[1])xb=cl[1]>0?xb*2:xb-2;C.uNow=[0,0];
 C.sc[0]+=xa;C.sc[1]+=xb;const why=(WHY[pa.s]&&WHY[pa.s][pb.s])||(WHY[pb.s]&&WHY[pb.s][pa.s])||'ท่าทีเหมือนกัน วัดกันที่ฝีมือ';
 C.log.push({a:pa,b:pb,xa,xb,ra,rb,auto:C.auto,ua:uN[0],ub:uN[1]});statBeat(C,A,B,pa,pb,cl,uN);C.auto=0;vb(25);try{reactReveal(A,B,pa,pb,ra,rb,xa,xb)}catch(e){}
 const side=(p,o,x,r,u)=>`<div style="border:1.5px solid ${WD[p.w].c}66${u?';box-shadow:0 0 16px #ffd86a88':''}"><div class="tg">${ST[o.s].ic}${u?' ✴️':''}</div><b>${E(p.name)}</b><br>${u?`<b style="color:#ffd86a">✴️ ${E(ULT[p.w])}</b><br>`:''}${E(o.t)}<br><span class="${r.ok?'ok':'ng'}">${r.ok?'✓ สำเร็จ':'✗ พลาด'}</span> <small style="opacity:.6">(${r.ch}%)</small><div class="pt ${x<0?'neg':''}">${x>=0?'+':''}${x}</div></div>`;
 const last=C.beat>=2;const meIn=A.me||B.me;
 scr(`${scoreH()}<div class="beat">${st.ic} จังหวะ ${C.beat+1}/3 · เปิดเผย!</div><div class="rv">${side(A,pa,xa,ra,uN[0])}${side(B,pb,xb,rb,uN[1])}</div><div class="why">${ST[pa.s].ic} vs ${ST[pb.s].ic} — ${why}</div>
  <button class="btn ${last?'red':''}" id="uaNx" style="margin-top:14px">${last?'⚖️ ตัดสินผล':'จังหวะถัดไป ›'}</button>`,meIn);
 const go=()=>{if(!G||G.cur!==C||C.adv===C.beat)return;C.adv=C.beat;if(last)judge();else{C.beat++;beat()}};$$('uaNx').onclick=go;if(!meIn)AT=setTimeout(go,2600)}
function scoreH(){const C=G.cur,A=G.ps[C.a],B=G.ps[C.b];const m=Math.max(6,C.sc[0],C.sc[1]);
 return`<div class="sc"><div class="pl"><b>${wdot(A.w)} ${E(A.name)}${A.me?' (คุณ)':''}</b><div class="bar"><i style="width:${Math.max(0,C.sc[0])/m*100}%;background:${WD[A.w].c}"></i></div></div><div class="num">${C.sc[0]}</div><div class="num">${C.sc[1]}</div><div class="pl r"><b>${E(B.name)}${B.me?' (คุณ)':''} ${wdot(B.w)}</b><div class="bar"><i style="width:${Math.max(0,C.sc[1])/m*100}%;background:${WD[B.w].c}"></i></div></div></div>`}

// ---------- 6) ตัดสิน ----------
function judge(){stopT();const C=G.cur;if(!C||C.done)return;C.done=1;const A=G.ps[C.a],B=G.ps[C.b];let w=C.sc[0]>C.sc[1]?0:C.sc[1]>C.sc[0]?1:(statOf(A,C.st)>=statOf(B,C.st)?0:1);const tie=C.sc[0]===C.sc[1];
 const wi=w?C.b:C.a,li=w?C.a:C.b;G.hist.push({w:wi,l:li,r:C.r,st:C.st,sc:C.sc.slice(),log:C.log,tie});if(C.r===0)G.win.push(wi);
 const W=G.ps[wi],L=G.ps[li];try{reactEnd(W,L)}catch(e){}if(W.me)G.st.sw_[C.st.k]=(G.st.sw_[C.st.k]||0)+1;if(L.me){G.st[C.r?'out2':'out1']=1}
 if(L.me)return erased(W,L,C,tie);
 if(W.me&&C.r===1)return champion(W,L);
 // คนอื่นแพ้ หรือเราชนะรอบแรก
 const gain=Math.min(35,Math.round(20*Math.max(.5,statOf(L,C.st)/Math.max(1,statOf(W,C.st)))));
 scr(`<div class="big"><div class="e">${W.me?'🌀':'💥'}</div><h3>${W.me?'คุณกลืนกินจักรวาล!':E(W.name)+' ชนะ'}</h3>
  <div style="font-size:13px;line-height:1.6">${tie?'แต้มเสมอ ตัดสินด้วยค่าตัว · ':''}${C.sc[0]} : ${C.sc[1]}<br>จักรวาล${WD[L.w].n}ของ <b>${E(L.name)}</b> ถูกลบออกจากสากลภพ</div>
  ${W.me?`<div class="card" style="text-align:left;font-size:12.5px;line-height:1.6">🌀 ถ้าเป็นของจริง: ได้พลัง <b>+${gain}%</b> ของหลอดขั้นถัดไป (ไม่ทะลวงทันที) + 🧩 เศษจักรวาล${WD[L.w].n} 1 ชิ้น<br><small style="opacity:.7">🧪 เบต้า: ยังไม่ได้รับจริง</small></div>`:''}</div>
  <div class="card"><b>🏆 สายการแข่ง</b>${brk()}</div><button class="btn" id="uaNm">${G.hist.some(h=>h.r===1)?'👑 ดูผู้ข้ามพ้นสากลภพ':G.win.length<2?'📢 คู่ต่อไป':'📢 รอบชิงแชมป์'}</button>`);
 $$('uaNm').onclick=()=>nextMatch();vb(W.me?40:15)}
function mistake(C,side){let worst=null,wi=-1;C.log.forEach((l,i)=>{const mine=side?l.xb:l.xa,his=side?l.xa:l.xb;const d=mine-his;if(worst===null||d<worst){worst=d;wi=i}});const l=C.log[wi];if(!l)return'';const mo=side?l.b:l.a,ho=side?l.a:l.b,r=side?l.rb:l.ra;
 const why=!r.ok?`เลือก ${ST[mo.s].ic} ถูกทาง แต่ทำพลาด (โอกาส ${r.ch}%)`:(WHY[mo.s]&&WHY[mo.s][ho.s])||'อีกฝ่ายอ่านทางออก';return`จังหวะ ${wi+1}: คุณ ${ST[mo.s].ic} ${E(mo.t)} · อีกฝ่าย ${ST[ho.s].ic} ${E(ho.t)} — ${why}${l.auto?' (ไม่ทันกด)':''}`}
function erased(W,L,C,tie){const side=C.a===G.ps.indexOf(L)?0:1;G.phase='dead';statSend(1);
 const g=LSg('murim_uagrave',[]);g.unshift({n:L.name,w:L.w,by:W.name,bw:W.w,st:C.st.n,t:Date.now(),beta:1});LSs('murim_uagrave',g.slice(0,30));
 shatter(WD[L.w].c,()=>{scr(`<div class="big"><div class="e">🕳️</div><h3>จักรวาล${WD[L.w].n}ของ ${E(L.name)}<br>ถูกลบออกจากสากลภพ</h3></div>
  <div class="card" style="font-size:13px;line-height:1.65"><b>📜 สรุป</b><br>แพ้ ${wdot(W.w)} <b>${E(W.name)}</b>${W.ghost?' (เงาจักรวาล)':''} · ${C.st.ic} ด่าน${C.st.n} · ${C.sc[side]} : ${C.sc[1-side]}${tie?' (เสมอ ตัดสินด้วยค่าตัว)':''}<br>❌ จุดพลาด: ${mistake(C,side)}</div>
  <div class="card" style="font-size:12.5px;line-height:1.6">ถ้าเป็นของจริง: ชีวิตนี้จบ สาเหตุ "ถูกลบในสากลภพ" · ชื่อจารึกใน 🕳️ สุสานจักรวาล · ชีวิตต่อไปได้ของปลอบใจเล็กน้อย<br><b style="color:#9affc8">🧪 เบต้า: ชีวิตจริงของคุณยังอยู่ครบ</b></div>
  <button class="btn" id="uaW">👀 ดูคู่ที่เหลือต่อ</button><button class="btn gh" onclick="uaOpen()">🔁 เล่นอีกรอบ</button><button class="btn gh" onclick="uaClose()">ออก</button>`);
  $$('uaW').onclick=()=>nextMatch()})}
function final(){statSend(1);const h=G.hist.find(x=>x.r===1);const W=G.ps[h.w];scr(`<div class="big"><div class="e">👑</div><h3>${E(W.name)}</h3><div>ผู้ข้ามพ้นสากลภพ คนใหม่</div></div><div class="card"><b>🏆 สายการแข่ง</b>${brk()}</div><button class="btn" onclick="uaOpen()">🔁 เล่นอีกรอบ</button><button class="btn gh" onclick="uaClose()">ออก</button>`)}
function champion(W,L){G.phase='end';G.st.champ=1;statSend(1);const n=(LSg('murim_uawins',0)|0)+1;LSs('murim_uawins',n);
 scr(`<div class="big"><div class="e">👑</div><h3>ผู้ข้ามพ้นสากลภพ</h3><div style="font-size:14px">${wdot(W.w)} <b>${E(W.name)}</b> กลืนกิน 2 จักรวาล</div></div>
 <div class="card" style="font-size:12.5px;line-height:1.65">ถ้าเป็นของจริง: ได้ฉายา <b>"ผู้ข้ามพ้นสากลภพ"</b> + กรอบโปรไฟล์ + ชื่อขึ้นป้ายบนสุดของทุกโลกจนกว่าจะมีแชมป์ใหม่ · สถิติ "ลบจักรวาลไปแล้ว N จักรวาล"<br><small style="opacity:.7">🧪 เบต้า: ชนะในเครื่องนี้แล้ว ${n} ครั้ง (ยังไม่ขึ้นทำเนียบ)</small></div>
 <div class="card"><b>🏆 สายการแข่ง</b>${brk()}</div><button class="btn" onclick="uaOpen()">🔁 เล่นอีกรอบ</button><button class="btn gh" onclick="uaClose()">ออก</button>`);vb(80);confetti()}
// รอบชิงที่เราไม่ได้อยู่ → judge จะไปทางคนอื่นแพ้ แล้วปุ่ม "คู่ต่อไป" ต้องพาไปหน้าแชมป์
{const _n=nextMatch;nextMatch=function(){if(G&&G.hist.some(h=>h.r===1))return final();return _n.apply(this,arguments)}}

// ---------- เอฟเฟกต์ ----------
function shatter(col,done){try{if(document.body.classList.contains('mRM'))return done();const c=document.createElement('canvas');c.id='uaShat';const W=Math.ceil(innerWidth/12),H=Math.ceil(innerHeight/12);c.width=W;c.height=H;c.style.width='100%';c.style.height='100%';document.body.appendChild(c);
 const msg=document.createElement('div');msg.className='rmsg';msg.textContent='จักรวาลกำลังถูกลบ…';($$('uaS')||document.body).appendChild(msg);
 const x=c.getContext('2d');const ps=[];const pal=[col,'#ffffff','#b49aff','#22104c','#ff3a6a','#07041a'];for(let y=0;y<H;y++)for(let a=0;a<W;a++)ps.push({x:a,y,vx:(a-W/2)/W*(.4+Math.random()),vy:-Math.random()*.6,d:Math.random()*40+((H-y)/H)*30,c:pal[(a*7+y*3)%pal.length]});
 let t=0;const step=()=>{t++;x.fillStyle='#000';x.fillRect(0,0,W,H);for(const p of ps){if(t>p.d){p.vy+=.06;p.x+=p.vx;p.y+=p.vy}if(p.y<H+2){x.fillStyle=t>p.d?p.c:'#00000000';if(t>p.d)x.fillRect(Math.round(p.x),Math.round(p.y),1,1)}}
  if(t<20){x.fillStyle=`rgba(255,255,255,${(20-t)/40})`;x.fillRect(0,0,W,H)}if(t<130)requestAnimationFrame(step);else{c.remove();msg.remove();done()}};vb(200);step()}catch(e){done()}}
function confetti(){try{if(document.body.classList.contains('mRM'))return;for(let i=0;i<40;i++){const d=document.createElement('div');d.textContent=pick(['✨','⭐','🌀','💫']);d.style.cssText=`position:fixed;z-index:9700;left:${Math.random()*100}%;top:-20px;font-size:${14+Math.random()*14}px;pointer-events:none;transition:transform ${1.5+Math.random()*1.5}s cubic-bezier(.3,.6,.6,1),opacity 3s`;document.body.appendChild(d);requestAnimationFrame(()=>{d.style.transform=`translate(${(Math.random()-.5)*120}px,${innerHeight+40}px) rotate(${Math.random()*720}deg)`;d.style.opacity='.2'});setTimeout(()=>d.remove(),3200)}}catch(e){}}

// ---------- สุสาน ----------
window.uaGrave=function(){const g=LSg('murim_uagrave',[]);scr(`<h2>🕳️ สุสานจักรวาล</h2><div class="sub">จักรวาลที่ถูกลบในเครื่องนี้ (เบต้า) · ของจริงจะเห็นของทุกคนทั้งเว็บ</div>
 ${g.length?g.map(x=>`<div class="gv"><i>${WD[x.w]?WD[x.w].ic:'❔'}</i><div style="flex:1;min-width:0"><b>${E(x.n)}</b> · ${WD[x.w]?WD[x.w].n:''}<br><small style="opacity:.7">ถูกลบโดย ${E(x.by)} · ด่าน${E(x.st)} · ${new Date(x.t).toLocaleDateString('th-TH')}</small></div></div>`).join(''):'<div class="card" style="text-align:center;opacity:.75">ยังว่างเปล่า… ขอให้เป็นแบบนี้ตลอดไป</div>'}
 <button class="btn gh" onclick="uaOpen()">‹ กลับ</button>`)};

// พับจอระหว่างเล่น = ระบบเลือกแทนตามกติกา (ไม่หยุดเวลา)


// ---------- ✴️ ท่าไม้ตายประจำโลก ----------
const ULT={murim:'เคล็ดวิชาลับสุดท้าย',xian:'กระบี่หมื่นเล่มคืนสู่หนึ่ง',mw:'โทรหาเส้นสายระดับประเทศ',soul:'ปลดปล่อยวงแหวนทั้งหมด',beast:'คืนร่างอสูรดึกดำบรรพ์',sky:'โอเวอร์ไดรฟ์ยีนอสูร 300%'};
const ucss=document.createElement('style');ucss.textContent=`#uaS .ultB{display:flex;align-items:center;gap:10px;width:100%;text-align:left;margin:8px 0 2px;padding:9px 12px;border-radius:14px;border:1.5px dashed #ffd86a88;background:#ffd86a0d;color:inherit;font:inherit;cursor:pointer;transition:all .2s}
#uaS .ultB>span:first-child{font-size:22px}#uaS .ultB b{font-size:13px;display:block}#uaS .ultB small{font-size:10.5px;opacity:.75}#uaS .ultB i{margin-left:auto;font-style:normal;font-size:11px;font-weight:900;padding:3px 9px;border-radius:999px;background:#0005}
#uaS .ultB.on{border-style:solid;border-color:#ffd86a;background:linear-gradient(90deg,#ffd86a33,#ff8a3d22);box-shadow:0 0 18px #ffd86a66;animation:uaUl 1s infinite}#uaS .ultB.on i{background:#ffd86a;color:#2a1a04}#uaS .ultB:disabled{opacity:.6}
#uaS .ultU{font-size:11.5px;opacity:.6;text-align:center;margin:6px 0}@keyframes uaUl{50%{box-shadow:0 0 28px #ffd86aaa}}`;document.head.appendChild(ucss);
// ---------- 📊 สถิติเบต้า (ส่ง 1 ครั้งต่อทัวร์ ไม่เก็บตัวตน) ----------
function statBeat(C,A,B,pa,pb,cl,uN){const ms=A.me?0:B.me?1:-1;if(ms<0)return;const o=ms?pb:pa,S2=G.st;S2.beats=(S2.beats||0)+1;S2['p_'+o.s]=(S2['p_'+o.s]||0)+1;if(cl[ms]>0)S2['w_'+o.s]=(S2['w_'+o.s]||0)+1;else if(cl[ms]<0)S2['l_'+o.s]=(S2['l_'+o.s]||0)+1;
 if(uN[ms]){S2.uu=(S2.uu||0)+1;if(cl[ms]>0)S2.uw=(S2.uw||0)+1;else S2.ul=(S2.ul||0)+1}const f=ms?A:B;if(f.prom&&!S2._pr){S2._pr=1;S2.pr=1}if(f.prom==='s'&&o.s==='h'&&(ms?pa:pb).s==='s')S2.pb=1}
function statSend(fin){try{if(!G||G.sent)return;G.sent=1;const me=G.ps.find(p=>p.me);const s2=G.st,c={t:1};if(fin)c.fin=1;else c.quit=1;
 ['champ','out1','out2','to','beats','uu','uw','ul','pr','pb'].forEach(k=>{if(s2[k])c[k]=s2[k]});['r','g','s','h'].forEach(k=>['p_','w_','l_'].forEach(q=>{if(s2[q+k])c[q+k]=s2[q+k]}));
 for(const k in s2.s_)c['s_'+k]=s2.s_[k];for(const k in s2.sw_)c['sw_'+k]=s2.sw_[k];if(me){c['pw_'+me.w]=1;if(s2.champ)c['pc_'+me.w]=1;c[me.test?'test':'real']=1}
 Promise.resolve().then(()=>api('ua',{c})).catch(()=>{})}catch(e){}}
// ============================================================
// 💬 แชทห้องรอ + 👀 คนดูจากโลกต่างๆ (NPC) + เหตุการณ์จากอัฒจันทร์
//  เบต้า: แชทอยู่ในเครื่อง คนดูเป็น NPC ตอบตามที่คุณพิมพ์ · พิมพ์ชวนคู่แข่ง "ช่วยกันนะ" ได้ แต่เงาอาจโกหก
// ============================================================
const CHT={list:[],open:true,view:20,t:null,n:0};
const SPN={murim:['ศิษย์สำนักภูผาขาว','จอมยุทธ์พเนจร','เถ้าแก่โรงเตี๊ยม','ขอทานพรรคกระยาจก'],xian:['ศิษย์นอกนิกาย','เซียนเร่ร่อน','นางฟ้าเฝ้าสระบัว','เด็กเลี้ยงกระเรียน'],mw:['สตรีมเมอร์ตัวตึง','นักศึกษาปี 2','พี่วินมอเตอร์ไซค์','ป้าขายส้มตำ'],soul:['ปรมาจารย์วิญญาณ','ศิษย์สถาบันซื่อไหล','พ่อค้าวงแหวนเถื่อน'],beast:['ลิงเฒ่าบนต้นไม้','หมาป่าหนุ่ม','นกฮูกพยากรณ์'],sky:['ช่างซ่อมโดรน','ทหารกำแพงชั้นนอก','AI นักพากย์ v2.1','เด็กเก็บเศษดาวตก']};
const LN={
 lobby:['ห้องนี้กลิ่นจักรวาลแตกชัดๆ','วันนี้จะมีจักรวาลหายไปกี่อันนะ','ข้ามาเชียร์ ไม่ได้มาลงแข่ง 555','ใครมาจากโลกไหนบ้าง แนะนำตัวหน่อย','ที่นั่งแถวหน้าว่างอยู่ จองไว้แล้วนะ','เคยเห็นจักรวาลถูกลบสดๆ ครั้งนึง ขนลุกมาก'],
 ann:['ข้าเดิมพันฝั่ง {A}','{B} หน้าตาดูไม่ธรรมดา','ด่าน{ST}อีกแล้ว ปีนี้ออกบ่อยจัง','ระวังเงาจักรวาลนะ มันจำเจ้าของเดิมได้','คู่นี้น่าจะสูสี','ข้าว่า {B} รอด'],
 play:['เลือกดีๆ!','อย่ารีบ อ่านใจมันก่อน','ใจเย็นๆ เหลือเวลาอีกนิด','เร่งเลย!!','ระวังกับดัก!'],
 betray:['หักหลังกันซึ่งๆ หน้า!!','โหดเกิน ยื่นมือไปแล้วโดนแทง','ไว้ใจใครไม่ได้จริงๆ ในสากลภพ','{X} เจ้าเล่ห์มาก 😈'],
 mutual:['ซึ้ง ช่วยกันทั้งคู่ 🥹','นี่มันมิตรภาพข้ามจักรวาล','อย่าเพิ่งไว้ใจกันนะ จังหวะหน้ายังมี'],
 trap:['เข้ากับดักเต็มๆ!','อ่านทางขาด!','{X} วางกับดักสวยมาก'],
 fail:['อ้าว พลาดซะงั้น','มือสั่นรึเปล่า','โชคไม่เข้าข้าง'],
 big:['{X} เก็บแต้มเต็มๆ!','สวยยยย','นี่แหละตัวจริง'],
 win:['{W} กลืนกินจักรวาลไปแล้ว!','จักรวาล{LW}เงียบไปตลอดกาล','ขอไว้อาลัยให้ {L} 🕯️','{W} น่ากลัวมาก'],
 rip:['🕯️','RIP {L}','จอแตกเป็นพิกเซลเลย…','ไม่นะ!!']};
const GH={join:{r:'อย่ามาขวางทางข้าก็แล้วกัน',g:'สวัสดีทุกคน ขอให้ทุกจักรวาลโชคดี',s:'ยินดีที่ได้รู้จัก… ก่อนจักรวาลของพวกเจ้าจะหายไป',h:'ใครอยากร่วมมือ ทักข้าได้นะ'},
 start:{r:'เร็วเข้า ข้าไม่ชอบรอ',g:'ข้าจะดูทางเจ้าก่อน',s:'ข้าเห็นจุดอ่อนเจ้าแล้ว 😏',h:'ไม่ว่าใครชนะ ขอให้สู้กันอย่างเกียรติ'},
 yes:['ตกลง ข้าจะเลือก 🤝 ช่วย','ได้สิ ช่วยกันรอดไปด้วยกัน','สัญญา ข้าจะไม่หักหลัง'],
 no:['ฝันไปเถอะ','ช่วยเจ้า? แล้วใครจะช่วยข้า','ข้าไม่ทำสัญญากับคนแปลกหน้า']};
const EVP={
 murim:[['👴','ผู้เฒ่าสำนักภูผาขาวตะโกนบอกจังหวะให้ {X}',7],['🍶','ขี้เมาจากโรงเตี๊ยมขว้างไหเหล้าเข้ามาในลาน {X} เสียสมาธิ',-6]],
 xian:[['🌸','เซียนเร่ร่อนโปรยกลีบดอกไม้มงคลใส่ {X}',6],['⚡','ทัณฑ์สวรรค์ลูกเล็กหลงฟ้าผ่าลงข้าง {X}',-7]],
 mw:[['📱','สตรีมเมอร์ไลฟ์เชียร์ {X} คนดูพุ่ง 10,000',5],['📸','แฟลชกล้องมือถือรัวใส่หน้า {X}',-5]],
 soul:[['⭕','ปรมาจารย์วิญญาณส่งพลังวิญญาณให้ {X}',6],['🐍','สัตว์วิญญาณหลุดเข้ามาพัน {X}',-6]],
 beast:[['🐺','ฝูงหมาป่าหอนเชียร์ {X} ก้องลาน',5],['🦅','นกอินทรีโฉบแย่งของจาก {X}',-6]],
 sky:[['🛰️','AI นักพากย์คำนวณเส้นทางให้ {X} ฟรี',6],['🚁','โดรนนักข่าวปี 2054 บินบังหน้า {X}',-5]]};
const rp=a=>a[Math.floor(Math.random()*a.length)];
const fill=(t,o)=>t.replace(/\{(\w+)\}/g,(m,k)=>o[k]!=null?o[k]:m);
const ccss=document.createElement('style');ccss.textContent=`
#uaS .uw{padding-bottom:calc(150px + env(safe-area-inset-bottom))!important}
#uaChat{position:fixed;left:0;right:0;bottom:0;z-index:9550;max-width:560px;margin:0 auto;background:linear-gradient(180deg,#120a2af0,#07041af8);border-top:1.5px solid #b49aff66;border-radius:18px 18px 0 0;box-shadow:0 -10px 30px #000a;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:6px 10px calc(8px + env(safe-area-inset-bottom));transition:transform .3s cubic-bezier(.2,1.2,.4,1)}
#uaChat .ch{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:800;cursor:pointer;padding:2px 2px 6px}#uaChat .ch .v{margin-left:auto;font-weight:600;opacity:.75}#uaChat .ch .tg{font-size:14px;opacity:.8}
#uaChat .cl{overflow-y:auto;max-height:21vh;display:flex;flex-direction:column;gap:5px;padding-right:2px;scrollbar-width:none}
#uaChat.min .cl{max-height:44px;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent,#000 45%);mask-image:linear-gradient(180deg,transparent,#000 45%);justify-content:flex-end}
#uaChat .m{font-size:12.5px;line-height:1.45;animation:uaIn .3s both;word-break:break-word}#uaChat .m b{font-weight:800;margin-right:4px}#uaChat .m .w{font-size:10.5px;opacity:.6;margin-right:3px}
#uaChat .m.me{align-self:flex-end;background:#b49aff33;border:1px solid #b49aff66;padding:4px 10px;border-radius:12px 12px 2px 12px;max-width:85%}
#uaChat .m.sys{text-align:center;font-size:11px;opacity:.65}
#uaChat .m.gh b{color:#ff9ab0}
#uaChat .m.ev{padding:7px 10px;border-radius:12px;background:linear-gradient(90deg,#ffd86a22,#ffd86a0a);border:1px solid #ffd86a66;font-weight:700}
#uaChat .ci{display:flex;gap:6px;margin-top:7px}#uaChat .ci input{flex:1;min-width:0;padding:9px 12px;border-radius:999px;border:1px solid #ffffff2a;background:#0006;color:#fff;font:inherit;font-size:16px}
#uaChat .ci button{flex:none;border:0;border-radius:999px;min-width:40px;padding:0 10px;font-size:16px;background:#ffffff14;color:#fff;cursor:pointer}#uaChat .ci .sd{background:linear-gradient(180deg,#e8dcff,#b49aff);color:#1a0a30;font-weight:900;font-size:13px}
#uaChat.min .ci,#uaChat.busy .ci{display:none}
#uaS .lbW{margin:10px 0}#uaS .lbT{font-size:12.5px;text-align:center;opacity:.85}
#uaS .evB{margin:8px 0 2px;padding:8px 11px;border-radius:12px;font-size:12.5px;line-height:1.45;animation:uaIn .4s both}#uaS .evB.up{background:#3aa86a26;border:1px solid #3aa86a88}#uaS .evB.dn{background:#ff3a6a1f;border:1px solid #ff6a8a77}`;document.head.appendChild(ccss);
function chatMount(){if($$('uaChat'))return;const c=document.createElement('div');c.id='uaChat';c.innerHTML=`<div class="ch" onclick="uaChatTog()"><span>💬 แชทห้องสากลภพ</span><span class="v" id="uaView"></span><span class="tg" id="uaTg">▾</span></div><div class="cl" id="uaCl"></div>
 <div class="ci"><button type="button" onclick="uaCheer('🔥')">🔥</button><button type="button" onclick="uaCheer('😱')">😱</button><input id="uaIn" maxlength="80" placeholder="พิมพ์คุยกับคนดู / คู่แข่ง…" enterkeyhint="send"><button class="sd" type="button" onclick="uaSend()">ส่ง</button></div>`;
 $$('uaS').appendChild(c);const i=$$('uaIn');i.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();uaSend()}});tick()}
function chatMode(){const c=$$('uaChat');if(!c)return;c.style.display=G?'':'none';const busy=!!document.querySelector('#uaOp .opt2');c.classList.toggle('busy',busy);c.classList.toggle('min',!CHT.open||busy);const t=$$('uaTg');if(t)t.textContent=c.classList.contains('min')?'▴':'▾';const v=$$('uaView');if(v)v.textContent=`👀 ${CHT.view} คนดู`;const l=$$('uaCl');if(l)l.scrollTop=l.scrollHeight;const m=$$('uaMain');if(m)m.style.setProperty('padding-bottom',(G&&c.offsetHeight?c.offsetHeight+18:28)+'px','important')}
window.uaChatTog=function(){CHT.open=!CHT.open;chatMode()};
function push(m){CHT.list.push(m);if(CHT.list.length>80)CHT.list.shift();const l=$$('uaCl');if(!l)return;const d=document.createElement('div');d.className='m '+(m.cls||'');d.innerHTML=m.h;l.appendChild(d);while(l.children.length>80)l.removeChild(l.firstChild);l.scrollTop=l.scrollHeight}
const RC=[];function npcSay(t,w){if(RC.includes(t)&&Math.random()<.85)return;RC.push(t);if(RC.length>8)RC.shift();w=w||rp(Object.keys(WD));push({h:`<span class="w">${WD[w].ic}</span><b style="color:${WD[w].c}">${E(rp(SPN[w]))}</b>${E(t)}`})}
function chatSys(t){push({cls:'sys',h:E(t)})}
function ghostSay(p,k,t){if(!p||!p.ghost)return;push({cls:'gh',h:`<span class="w">👻</span><b>${E(p.name)}</b>${E(t||GH[k][p.hab]||'')}`})}
const lat=(f,a,b)=>setTimeout(f,a+Math.random()*(b-a));
function ctx(){const C=G&&G.cur;if(!C)return{};const A=G.ps[C.a],B=G.ps[C.b];return{A:A.name,B:B.name,ST:C.st.n}}
function tick(){clearTimeout(CHT.t);CHT.t=setTimeout(()=>{if(!$$('uaS'))return;if(G){CHT.view=Math.max(5,CHT.view+Math.round(Math.random()*4-1.5));const ph=G.phase;const pool=ph==='lobby'?LN.lobby:ph==='ann'?LN.ann:ph==='play'?LN.play:LN.lobby;if(Math.random()<.85)npcSay(fill(rp(pool),ctx()));chatMode()}tick()},ph2ms())}
function ph2ms(){const ph=G&&G.phase;return ph==='lobby'?2200+Math.random()*2200:ph==='play'?4200+Math.random()*3000:3200+Math.random()*2800}
window.uaCheer=function(e){const me=G&&G.ps.find(p=>p.me);push({cls:'me',h:e});vb(8);lat(()=>npcSay(rp(['555','เชียร์ด้วยคน '+e,e+e,'ใจสู้มาก','ฝั่งนี้ครับ!'])),500,1600)};
window.uaSend=function(){const i=$$('uaIn');if(!i)return;const t=i.value.trim();if(!t)return;i.value='';push({cls:'me',h:E(t)});vb(6);reply(t)};
function foeOf(){if(!G)return null;const C=G.cur;let me=G.ps.findIndex(p=>p.me);if(C&&!C.done&&(C.a===me||C.b===me))return G.ps[C.a===me?C.b:C.a];
 // ยังไม่ถึงคู่เรา → คู่แรกของเรา
 const m=G.m.find(x=>x.includes(me));if(m&&!G.hist.some(h=>h.l===me||h.w===me))return G.ps[m[0]===me?m[1]:m[0]];return null}
function reply(t){const f=foeOf();
 if(/ช่วย|ร่วมมือ|พันธมิตร|สัญญา|จับมือ|ดีล/.test(t)&&f&&f.ghost){const honest=f.hab==='h'?Math.random()<.85:f.hab==='s'?Math.random()<.2:Math.random()<.5;const agree=f.hab==='h'||f.hab==='s'||Math.random()<.5;
  f.prom=agree?(honest?'h':'s'):null;lat(()=>ghostSay(f,'',agree?rp(GH.yes):rp(GH.no)),900,2200);lat(()=>npcSay(agree?rp(['เชื่อได้ไหมนั่น 🤔','ระวังโดนหลอกนะ','เงาจักรวาลโกหกเก่งนะเพื่อน']):'โดนเทซะแล้ว 555'),2400,3800);return}
 if(/สวัสดี|หวัดดี|ดีครับ|ดีค่ะ|hello|hi\b/i.test(t))return lat(()=>npcSay(rp(['สวัสดีนักรบ!','ยินดีต้อนรับสู่สากลภพ','หวัดดี ขอให้จักรวาลเจ้ารอด 🙏'])),700,1800);
 if(/กลัว|เครียด|ตื่นเต้น|ไม่กล้า/.test(t))return lat(()=>npcSay(rp(['หายใจลึกๆ อ่านใจมันให้ออก','กลัวได้ แต่อย่ากดพลาดนะ','ข้าเชียร์เจ้าอยู่']),'xian'),700,1800);
 if(/ชนะ|แชมป์|ไม่แพ้|ง่าย|สบาย/.test(t)){lat(()=>npcSay(rp(['มั่นใจจังนะ','พูดแบบนี้ทุกคนก่อนจอแตก 555','ขอดูฝีมือหน่อย'])),700,1800);if(f)lat(()=>ghostSay(f,'',rp(['เดี๋ยวก็รู้','ปากดีนักนะ','จะได้เห็นกัน'])),1800,3000);return}
 if(/แพ้|ยอม|ตาย|ถูกลบ/.test(t))return lat(()=>npcSay(rp(['ยังไม่จบจนกว่าจอจะแตก!','สู้ๆ อย่าเพิ่งยอม','ถ้าแพ้จะจุดธูปให้ 🕯️'])),700,1800);
 if(f&&/\?|ไง|ยังไง|เลือกอะไร|จะเลือก/.test(t)){const lie=f.hab==='s'&&Math.random()<.7;const real=f.hab;const say=lie?rp(['r','g','h'].filter(x=>x!==real)):real;return lat(()=>ghostSay(f,'',`ข้าชอบ${ST[say].ic} ${ST[say].n}… เชื่อหรือไม่ก็แล้วแต่`),1000,2400)}
 lat(()=>npcSay(rp(['555555','จริง','+1','เห็นด้วย','ว่าแต่ใครจะรอด','พูดดี','👀'])),700,2200)}
// เหตุการณ์จากอัฒจันทร์ (มีผลกับโอกาสสำเร็จของจังหวะนี้)
function npcEvent(C,A,B,meSide){if(Math.random()>(meSide>=0?(C.beat?.55:.3):.35))return'';const w=rp(Object.keys(WD));const e=rp(EVP[w]);const side=Math.random()<.5?0:1;const P=side?B:A;C.buf[side]+=e[2];
 const txt=fill(e[1],{X:P.name});push({cls:'ev',h:`${e[0]} ${E(txt)} <small style="opacity:.75">(${e[2]>0?'+':''}${e[2]}% โอกาสสำเร็จ)</small>`});lat(()=>npcSay(rp(e[2]>0?['ได้ตัวช่วยด้วย!','โกงชัดๆ 555','อัฒจันทร์เข้าข้าง '+P.name]:['เวรกรรม','ใครปล่อยของเข้ามาเนี่ย','ซวยไป '+P.name])),900,2000);
 return`<div class="evB ${e[2]>0?'up':'dn'}">${e[0]} <b>เหตุการณ์จากอัฒจันทร์</b> · ${E(txt)} → ${P.me?'คุณ':E(P.name)} โอกาสสำเร็จ <b>${e[2]>0?'+':''}${e[2]}%</b> จังหวะนี้</div>`}
function reactReveal(A,B,pa,pb,ra,rb,xa,xb){let k=null,X='';if(pa.s==='s'&&pb.s==='h'){k='betray';X=A.name}else if(pb.s==='s'&&pa.s==='h'){k='betray';X=B.name}else if(pa.s==='h'&&pb.s==='h')k='mutual';else if(pa.s==='s'&&pb.s==='r'){k='trap';X=A.name}else if(pb.s==='s'&&pa.s==='r'){k='trap';X=B.name}else if(!ra.ok||!rb.ok)k='fail';else{k='big';X=xa>=xb?A.name:B.name}
 lat(()=>npcSay(fill(rp(LN[k]),{X})),300,900);if(Math.random()<.6)lat(()=>npcSay(fill(rp(LN[k]),{X})),1100,2200);
 const g=[A,B].find(p=>p.ghost&&p.prom);if(g&&k==='betray'&&X===g.name)lat(()=>ghostSay(g,'',rp(['ข้าเคยบอกว่าจะช่วยเหรอ? 😏','สัญญาในสากลภพ… ไม่มีค่าหรอก','ขอโทษนะ แต่จักรวาลข้าสำคัญกว่า'])),1500,2600)}
function reactEnd(W,L){CHT.view+=3;lat(()=>npcSay(fill(rp(LN.win),{W:W.name,L:L.name,LW:WD[L.w].n})),400,1200);lat(()=>npcSay(fill(rp(LN.rip),{L:L.name})),1500,2600);if(W.ghost)lat(()=>ghostSay(W,'',rp(['อีกหนึ่งจักรวาล','ขอบคุณสำหรับพลัง','ข้าจะจดชื่อเจ้าไว้'])),2000,3200);if(L.me)lat(()=>chatSys('🕳️ ชื่อของคุณถูกจารึกในสุสานจักรวาล'),2600,3400)}
{const _n=nextMatch;nextMatch=function(){const r=_n.apply(this,arguments);try{const C=G&&G.cur;if(C&&G.phase==='ann'){const A=G.ps[C.a],B=G.ps[C.b];chatSys(`📢 ${A.name} VS ${B.name} · ด่าน${C.st.n}`);[A,B].forEach((p,i)=>{if(p.ghost)lat(()=>ghostSay(p,'start'),800+i*900,1600+i*900)})}}catch(e){}return r}}
try{wReady('ua')}catch(e){}
})();
