// 🧭 ระบบพาผู้เล่นใหม่ (ทุกโลก ทุกโหมด · โหลดเบื้องหลังหลังเปิดเกม)
// - 🧭 เลือกทางเล่น: ถามสไตล์ 1 ข้อ แล้วแนะนำโลกที่เหมาะ
// - 🗺️ ทุกโลก ทุกโหมด: การ์ดอธิบายแต่ละโลกแบบสั้น อ่านง่าย พร้อมปุ่มไปเกิด
// - 🎓 ภารกิจปีแรก: เช็กลิสต์ 5 ข้อ ติ๊กเองเมื่อผู้เล่นทำจริง
// - 💡 คำแนะนำตามจังหวะ: โผล่ครั้งเดียวตอนเจอของจริงครั้งแรก
// - 📘 คู่มือ: ช่องค้นหา + แถบทางลัด
// ข้อมูลโลกอยู่ในตาราง OB_W ด้านล่าง เพิ่มโลกใหม่ = เพิ่มก้อนเดียว
try{(()=>{
const LSG=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSS=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const $$=id=>document.getElementById(id);
const stars=n=>'★'.repeat(n)+'☆'.repeat(4-n);

// ───────── ข้อมูลโลก ─────────
const OB_W=[
 {k:'murim',ic:'⚔️',n:'ยุทธภพ',lv:1,tag:'ง่ายที่สุด · เหมาะเริ่มเล่น',
  what:'โลกจอมยุทธ์แบบคลาสสิก มีสำนักธรรมะ อธรรม และมาร คุณเกิดเป็นคนธรรมดาคนหนึ่ง แล้วชีวิตค่อยๆ พาไปเอง',
  do:'เลือกว่าจะเข้าสำนักไหน ฝึกวิชา ผูกมิตร สร้างศัตรู และตัดสินใจเมื่อมีเรื่องสำคัญ',
  goal:'ไต่ระดับยุทธ์ขึ้นไปจนสูงสุด แล้วเหาะขึ้นสู่โลกเซียน อายุขัยราว 60–200 ปี',
  first:'ปีแรกๆ ยังเป็นเด็ก ไม่ต้องทำอะไรมาก ปล่อยเวลาเดินแล้วอ่านเรื่องที่เกิดขึ้นไปก่อน',
  fit:'คนที่อยากรู้จักเกมก่อน ไม่ต้องรู้ศัพท์อะไรมาก'},
 {k:'xian',ic:'☁️',n:'โลกเทพเซียน',lv:3,tag:'ชีวิตยาว · ระบบเยอะขึ้น',
  what:'โลกของผู้บำเพ็ญตน มีรากวิญญาณ ถ้ำบ่มเพาะ หินวิญญาณ และทัณฑ์สวรรค์ อายุยืนได้หลายร้อยปี',
  do:'เลือกที่บำเพ็ญ สะสมหินวิญญาณ ฝึกจากขั้นต้นขึ้นไป และเตรียมตัวรับทัณฑ์เมื่อถึงขั้นข้ามทัณฑ์',
  goal:'ผ่านทัณฑ์สวรรค์แล้วขึ้นสู่แดนเทพ',
  first:'เปิด 📜 คัมภีร์ดูก่อนว่าตอนนี้อยู่ขั้นไหน และต้องทำอะไรถึงจะขึ้นขั้นต่อไป',
  fit:'คนที่ชอบเรื่องฝึกตนแบบค่อยเป็นค่อยไป และไม่กลัวระบบเยอะ'},
 {k:'mw',ic:'🏙️',n:'ยุคปัจจุบัน',lv:2,tag:'เรื่องใกล้ตัว · มินิเกมเยอะ',
  what:'ใช้ชีวิตปี 2026 ที่มีงาน เงินเดือน บ้าน รถ ความรัก และครอบครัว ไม่ต้องรู้ระบบยุทธ์เลย',
  do:'เรียน ทำงาน ดูแลเงิน เลือกคนที่รัก และรับมือเหตุการณ์ตามวัย พออายุถึงจุดหนึ่งอาจเจอเรื่องแปลกๆ ที่เปลี่ยนโลกของคุณ เช่น ฮันเตอร์ ซอมบี้ ผี วันซ้ำ หอคอย เกมที่มีระบบ กำแพงสุดท้ายของมนุษย์ หรือวงการใต้ดิน',
  goal:'ไม่มีเส้นชัยตายตัว เป้าหมายคือชีวิตที่คุณพอใจ หรือถ้าโลกย่อยโผล่มา ก็ไต่ขั้นของโลกนั้น',
  first:'ลองดูก่อนว่าเลือกเรียนหรือทำอะไร เพราะแต่ละทางไปได้ไกลต่างกัน',
  fit:'คนที่อยากได้เรื่องชีวิตจริง หรืออยากเจอเรื่องหักมุมกลางชีวิต'},
 {k:'soul',ic:'⭕',n:'จิตวิญญาณยุทธ์',lv:3,tag:'เล่นเป็นทีม',
  what:'ทวีปที่ทุกคนปลุกวิญญาณยุทธ์ตอนอายุ 6 ขวบ แล้วล่าวงแหวนวิญญาณเพื่อแกร่งขึ้น',
  do:'ปลุกวิญญาณ ล่าวงแหวน ตั้งทีมหกคน และสู้กับคู่แข่งตลอดกาลของคุณ',
  goal:'ขึ้นเป็นยอดคนของทวีป ผ่านศึกชิงยอดทวีป',
  first:'พออายุ 6 ขวบจะปลุกวิญญาณ ผลตรงนั้นกำหนดทางไปของคุณ ลองดูให้ดี',
  fit:'คนที่ชอบเรื่องพลังพิเศษ ทีม และการสู้'},
 {k:'loop',ic:'🔁',n:'ผู้ย้อนกาล',lv:3,tag:'เรื่องต่อเนื่อง',
  what:'เมื่อตายแล้วคุณย้อนกลับไปตอนอายุ 15 พร้อมความรู้จากรอบที่แล้ว',
  do:'ใช้สิ่งที่รู้ช่วยเพื่อนร่วมชะตา เลี่ยงโศกนาฏกรรมที่เคยเกิด และไขว่าทำไมถึงย้อนกลับมา',
  goal:'พาทุกคนไปให้ถึงตอนจบที่ดีกว่าเดิม',
  first:'จำไว้ว่าอะไรเกิดตอนไหน เพราะรอบหน้าจะมีประโยชน์',
  fit:'คนที่ชอบเรื่องเล่าต่อเนื่อง และชอบวางแผนล่วงหน้า'},
 {k:'beast',ic:'🐾',n:'เกิดเป็นสัตว์',lv:2,tag:'ชีวิตยาวมาก',
  what:'เริ่มจากลูกสัตว์ตัวหนึ่งในป่า ไม่มีใครสอน ต้องเอาตัวรอดเอง',
  do:'หาอาหาร หนีศัตรู บำเพ็ญจนกลายเป็นอสูร',
  goal:'เลือกเอาเองตอนท้าย จะแปลงกายเป็นคน หรือครองป่าเป็นราชาอสูร',
  first:'ช่วงแรกเปราะบางมาก เลือกทางที่ปลอดภัยไว้ก่อนก็ไม่เสียหาย',
  fit:'คนที่อยากลองมุมมองที่ไม่เหมือนใคร'},
 {k:'sky',ic:'🌠',n:'ทะลุฟ้าดารา',lv:3,tag:'โลกใหม่ · มินิเกม',
  what:'ประเทศไทยหลังเกิดมหันตภัยดาวตก คนรอดชีวิตอยู่ในนครกำแพง และบางคนได้ยีนอสูร',
  do:'อยู่รอดในนคร สร้างตัว ฝึกยีน ผ่านด่าน และไต่ระดับ 36 ขั้น',
  goal:'ไต่ขั้นไปถึงดวงดาว',
  first:'อ่านคัมภีร์ของโลกนี้ ในเมนู ☰ จะเห็นทั้ง 36 ขั้นและวิธีขึ้นขั้น',
  fit:'คนที่ชอบโลกวันสิ้นโลกแบบไทยๆ และชอบมินิเกม'},
 {k:'fog',ic:'🌉',n:'นครม่านหมอก',lv:3,tag:'สืบสวน · ลึกลับ',
  what:'เมืองไอน้ำใต้หมอกที่ไม่เคยจาง มีคดีประหลาดเกิดขึ้นเรื่อยๆ',
  do:'สืบคดี เลือกหนึ่งใน 8 เส้นทาง และข้ามธรณีทีละชั้น ยิ่งแกร่งยิ่งเสี่ยงเสียตัวตน',
  goal:'ข้ามธรณีให้ครบ 9 ชั้นโดยยังเป็นตัวเอง',
  first:'เปิดสมุดคดีดูว่ามีคดีไหนรออยู่ แล้วเลือกเส้นทางที่ชอบ',
  fit:'คนที่ชอบเรื่องสืบสวนและบรรยากาศลึกลับ'}
];
const OB_M=[
 ['🙂','ปกติ','เล่นตามปกติ สุ่มเกิดใหม่ได้ 3 ครั้งก่อนเริ่มชีวิต เหมาะที่สุดสำหรับครั้งแรก'],
 ['🔥','นรก','ยากกว่าปกติ ชีวิตโหดกว่าเดิม เก็บไว้เล่นหลังคุ้นมือแล้ว'],
 ['⏳','ชีวิตสั้น','อายุขัยสั้นกว่าเดิม ต้องรีบทำให้ทัน จบเร็ว เหมาะเล่นรอบสั้น'],
 ['🗑️','รากขยะ','เริ่มด้วยพื้นฐานต่ำสุด ต้องใช้ความพยายามและโชคช่วย'],
 ['🔁','ผู้ย้อนกาล','เล่นเรื่องต่อเนื่องข้ามรอบ ดูโลก “ผู้ย้อนกาล” ด้านบน'],
 ['⭕','จิตวิญญาณยุทธ์','ทวีปวิญญาณยุทธ์ ดูโลก “จิตวิญญาณยุทธ์” ด้านบน']
];
const OB_V=[
 {ic:'🌿',n:'ชิลล์ ดูชีวิตเดินไปเอง',d:'ไม่อยากกดเยอะ อยากดูว่าชีวิตจะพาไปไหน',w:['murim','mw'],chill:1},
 {ic:'⚔️',n:'ฝึกวิชา ไต่ระดับ',d:'ชอบเก่งขึ้นเรื่อยๆ และเห็นตัวเลขโตขึ้น',w:['murim','xian','soul']},
 {ic:'🏙️',n:'ชีวิตจริงสมัยนี้',d:'ชอบเรื่องงาน เงิน ความรัก ครอบครัว',w:['mw']},
 {ic:'🔎',n:'เรื่องราว ปริศนา หักมุม',d:'ชอบตามเรื่อง ไขคดี รอดูตอนจบ',w:['fog','sky','loop']},
 {ic:'🐾',n:'อยากลองอะไรแปลกๆ',d:'ไม่อยากเป็นคนธรรมดา',w:['beast','loop','soul']}
];
const wOf=k=>OB_W.find(x=>x.k===k);
const onTitle=()=>{const t=$$('title');return !!(t&&t.classList.contains('on'))};
const inLife=()=>{try{return !!(S&&S.alive&&$$('game')&&$$('game').classList.contains('on'))}catch(e){return false}};
const curW=()=>{try{const M=S&&S.mw;if(M&&M.sky)return'sky';if(M&&M.fog)return'fog';if(S&&(S.ch==='soul'||S.sv&&S.ch==='soul'))return'soul';if(S&&(S.ch==='regress'||S.ch==='loop'))return'loop';if(S&&S.beastMode)return'beast';if(M)return'mw';return S&&S.xian?'xian':'murim'}catch(e){return'murim'}};

// ───────── ไปเกิด ─────────
function goBorn(k){
 try{closeM()}catch(e){}
 if(!onTitle()){toast('กลับหน้าแรกก่อน แล้วกดเลือกโลกนี้อีกครั้ง');return}
 if(k==='mw'){try{if(typeof mwAllowed==='function'&&!mwAllowed())return toast('โลกนี้ปิดปรับปรุงชั่วคราว')}catch(e){}}
 if(typeof window.wpGo==='function')setTimeout(()=>{try{window.wpGo(k)}catch(e){console.error(e);try{goBirthPick()}catch(x){}}},120);
 else{try{goBirthPick()}catch(e){}}
}
window._obGo=goBorn;

// ───────── เลือกทางเล่น ─────────
window._obPath=function(){
 const h=OB_V.map((v,i)=>`<button class="obV" onclick="_obVibe(${i})"><i>${v.ic}</i><span><b>${v.n}</b><small>${v.d}</small></span><em>›</em></button>`).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><div class="obHd"><div class="obIc">🧭</div><h3>วันนี้อยากเล่นแบบไหน</h3><p>เลือกข้อที่ใกล้เคียงที่สุด เดี๋ยวบอกว่าโลกไหนเหมาะกับคุณ เปลี่ยนใจทีหลังได้เสมอ</p></div>${h}<button class="obLn" onclick="obWorlds()">🗺️ ดูทุกโลกทุกโหมดแทน</button>`,'obpath');
};
window._obVibe=function(i){
 const v=OB_V[i];if(!v)return;
 const cards=v.w.map((k,j)=>{const w=wOf(k);return `<div class="obC${j===0?' top':''}">${j===0?'<span class="obBest">เหมาะที่สุด</span>':''}<div class="obCh"><i>${w.ic}</i><div><b>${w.n}</b><small>${w.tag}</small></div></div><p>${w.what}</p><div class="obBt"><button class="obGo" onclick="_obGo('${k}')">🐣 ไปเกิดโลกนี้</button><button class="obGh" onclick="obWorlds('${k}')">อ่านเพิ่ม</button></div></div>`}).join('');
 const chill=v.chill?`<div class="obNote">💡 ถ้าอยากให้เกมเดินเอง กดปุ่มด้านล่างเพื่อให้ชะตาเลือกแทนเมื่อคุณไม่ตอบใน 10 วินาที (เรื่องสำคัญเกมจะรอคุณเสมอ)<button class="obGh" onclick="LS.set('murim_fate',10);this.textContent='✅ ตั้งแล้ว';this.disabled=true">⏳ ตั้งให้เลย</button></div>`:'';
 modal(`<button class="xbtn" onclick="closeM()">✕</button><div class="obHd"><div class="obIc">${v.ic}</div><h3>${v.n}</h3><p>ลองโลกเหล่านี้ดู</p></div>${cards}${chill}<button class="obLn" onclick="obPath()">‹ ย้อนกลับ</button>`,'obpath');
};

// ───────── ทุกโลก ทุกโหมด ─────────
window._obWorlds=function(k){
 k=k||(inLife()?curW():'murim');
 const tabs=OB_W.map(w=>`<button class="obT${w.k===k?' on':''}" onclick="obWorlds('${w.k}')">${w.ic} ${w.n}</button>`).join('')+`<button class="obT${k==='_m'?' on':''}" onclick="obWorlds('_m')">🎯 โหมด</button>`;
 let body;
 if(k==='_m'){
  body=`<div class="obCard"><h4>🎯 โหมดการเล่น</h4><p class="obSm">โหมดคือกติกาเสริมที่ใช้ได้กับโลกส่วนใหญ่ มือใหม่เริ่มที่ “ปกติ” แล้วค่อยลองอย่างอื่น</p>${OB_M.map(m=>`<div class="obMr"><i>${m[0]}</i><div><b>${m[1]}</b><small>${m[2]}</small></div></div>`).join('')}</div>`;
 }else{
  const w=wOf(k)||OB_W[0];
  const go=onTitle()?`<button class="obGo wide" onclick="_obGo('${w.k}')">🐣 ไปเกิดในโลกนี้</button>`:`<div class="obSm">อยากลองโลกนี้ กลับหน้าแรกแล้วเลือกตอนเริ่มชีวิตใหม่</div>`;
  body=`<div class="obCard"><div class="obCh"><i>${w.ic}</i><div><b>${w.n}</b><small>${w.tag}</small></div></div><div class="obLv">ความซับซ้อน <b>${stars(w.lv)}</b></div>
   <h5>เรื่องคร่าวๆ</h5><p>${w.what}</p><h5>คุณทำอะไรได้บ้าง</h5><p>${w.do}</p><h5>เป้าหมาย</h5><p>${w.goal}</p><h5>ปีแรกๆ ควรทำอะไร</h5><p>${w.first}</p><h5>เหมาะกับ</h5><p>${w.fit}</p>${go}</div>`;
 }
 modal(`<button class="xbtn" onclick="closeM()">✕</button><div class="obHd"><div class="obIc">🗺️</div><h3>ทุกโลก ทุกโหมด</h3></div><div class="obTabs">${tabs}</div>${body}<button class="obLn" onclick="obPath()">🧭 ไม่แน่ใจ ช่วยเลือกให้หน่อย</button>`,'obworlds');
 try{const on=document.querySelector('#modal .obT.on');if(on)on.scrollIntoView({inline:'center',block:'nearest'})}catch(e){}
};

// ───────── ภารกิจปีแรก ─────────
const Q=[
 ['ev','🔀','เลือกเรื่องแรกที่เกมถาม','เกมจะหยุดให้เลือกเมื่อเกิดเรื่องสำคัญ ไม่มีถูกผิด'],
 ['yr','⏳','ปล่อยเวลาเดินจนอายุ 3','ชีวิตเดินเองทีละปี'],
 ['menu','☰','เปิดเมนู ☰ ดูสักครั้ง','ทุกอย่างอยู่ในเมนู ทั้งเซฟ ร้านค้า และคัมภีร์'],
 ['realm','📜','เปิดคัมภีร์ของโลกที่คุณอยู่','บอกระดับ และวิธีเพิ่มระดับ'],
 ['guide','📘','เปิดคู่มือ แล้วลองค้นหาคำ','ไม่เข้าใจอะไรก็ค้นหาได้']
];
const QS=()=>LSG('murim_obq',{d:{},off:0});
const qSave=s=>LSS('murim_obq',s);
function qDone(id){try{const s=QS();if(s.off||s.d[id])return;s.d[id]=1;qSave(s);const n=Q.filter(x=>s.d[x[0]]).length;
 try{toast(n>=Q.length?'👴 ครบแล้ว! ข้าสอนหมดแล้ว คุณพร้อมเล่นเองแล้ว':`👴 ${window._obPraise?window._obPraise():'ดีมาก'} (${n}/${Q.length})`)}catch(e){}
 if(n>=Q.length){s.off=1;s.cert=1;qSave(s);try{log('🎓 ผ่านภารกิจมือใหม่ครบทั้งหมด ได้ตราผู้เริ่มต้น','up')}catch(e){}}
 qPaint()}catch(e){}}
function qShow(){try{const s=QS();if(s.off)return false;if(!inLife())return false;if((S.age|0)>14&&Object.keys(s.d).length===0)return false;return true}catch(e){return false}}
function qPaint(){try{const on=qShow();const c=$$('obQc');
 if(!on){try{if(typeof islChipOff==='function')islChipOff('obq')}catch(e){}const o=$$('obQb');if(o)o.remove();if(c)c.remove();return}
 const s=QS(),n=Q.filter(x=>s.d[x[0]]).length;let ok=false;
 try{if(typeof islChipX==='function'&&typeof islOn==='function'&&islOn()){const ch=islChipX('obq','🎓',`${n}/${Q.length}`,qOpen);if(ch){ok=true;ch.style.pointerEvents='auto'}}}catch(e){}
 let b=$$('obQb');
 if(ok){if(b)b.remove()}else{if(!b){b=document.createElement('button');b.id='obQb';b.onclick=()=>qOpen();document.body.appendChild(b)}b.innerHTML=`🎓 ภารกิจมือใหม่ <b>${n}/${Q.length}</b>`}
 if(c)qFill(c)}catch(e){}}
function qFill(c){const s=QS();c.innerHTML=`<div class="obQh"><b>🎓 ภารกิจมือใหม่</b><button onclick="_obQoff()" title="ปิดถาวร">ไม่ต้องแล้ว</button></div>`+Q.map(x=>`<div class="obQr${s.d[x[0]]?' ok':''}"><i>${s.d[x[0]]?'✅':x[1]}</i><div><b>${x[2]}</b><small>${x[3]}</small></div></div>`).join('')}
function qOpen(){let c=$$('obQc');if(c){c.remove();return}c=document.createElement('div');c.id='obQc';qFill(c);document.body.appendChild(c)}
window._obQoff=function(){const s=QS();s.off=1;qSave(s);qPaint();toast('ปิดภารกิจมือใหม่แล้ว เปิดดูคู่มือได้จาก ☰')};

// ───────── คำแนะนำตามจังหวะ (ครั้งเดียว) ─────────
const TP=[
 ['choice','🔀','เลือกตามใจได้เลย','ไม่มีถูกผิด ทางเลือกของคุณคือเรื่องราวของชีวิตนี้ ถ้ายังไม่พร้อม กด “ย่อไว้ก่อน” เพื่อดูหน้าจออื่นได้'],
 ['duel','⚔️','นี่คือการต่อสู้','เลือกท่าตามที่เหมาะกับคู่ต่อสู้ ถ้าแพ้ก็ไม่ได้แปลว่าจบเสมอไป'],
 ['realm','📜','คัมภีร์ = สมุดระดับของโลกนี้','บอกว่าตอนนี้อยู่ขั้นไหน ต้องทำอะไรถึงจะขึ้น และขึ้นแล้วได้อะไร']
];
function tip(id){try{const t=TP.find(x=>x[0]===id);if(!t)return;const seen=LSG('murim_obtip',[])||[];if(seen.includes(id))return;seen.push(id);LSS('murim_obtip',seen);
 const go=()=>{try{if(typeof island==='function'&&typeof islOn==='function'&&islOn())island({big:1,key:'obt'+id,ic:t[1],h:'💡 '+t[2],t:t[3],kind:'info',ms:6500});else toast('💡 '+t[2]+' — '+t[3])}catch(e){}};
 setTimeout(go,id==='choice'?900:300)}catch(e){}}

// ───────── คู่มือ: ช่องค้นหา + ทางลัด ─────────
function guideEnhance(){try{const m=$$('modal');if(!m||m.dataset.k!=='guide'||m.querySelector('.obGs'))return;const tabs=m.querySelector('.cxtabs');if(!tabs)return;
 const w=inLife()?wOf(curW()):null;
 tabs.insertAdjacentHTML('beforebegin',`<div class="obGs"><div class="obGq"><input id="obGi" type="search" placeholder="🔎 พิมพ์ค้นหา เช่น คัมภีร์ ดวล เงิน ออโต้" autocomplete="off"></div><div class="obGl"><button onclick="obPath()">🧭 เลือกทางเล่น</button><button onclick="obWorlds()">🗺️ ทุกโลก ทุกโหมด</button>${w?`<button onclick="obWorlds('${w.k}')">${w.ic} โลกที่คุณอยู่</button>`:''}</div><div class="obGe" id="obGe">ไม่เจอคำนี้ ลองคำสั้นลง หรือเปิดดูทุกหมวดด้านล่าง</div></div>`);
 const inp=$$('obGi');if(!inp)return;
 inp.addEventListener('input',()=>{const q=inp.value.trim().toLowerCase();const body=m.querySelector('.cxbody');if(!body)return;let any=0;
  body.querySelectorAll('.gdc').forEach(c=>{const ok=!q||c.textContent.toLowerCase().includes(q);c.style.display=ok?'':'none';if(ok)any++});
  body.querySelectorAll('.gdsec').forEach(h=>{let n=h.nextElementSibling,vis=0;while(n&&!n.classList.contains('gdsec')){if(n.classList.contains('gdc')&&n.style.display!=='none')vis++;n=n.nextElementSibling}h.style.display=(!q||vis)?'':'none'});
  const e=$$('obGe');if(e)e.style.display=(q&&!any)?'block':'none'});
}catch(e){console.error('obGuide',e)}}

// ───────── ปุ่มบนหน้าแรก ─────────
function titleBtns(){try{if(!onTitle()||$$('obRow'))return;
 const anchor=$$('nbRow')||$$('tStartIn')||document.querySelector('#title .pbtn');if(!anchor)return;
 const r=document.createElement('div');r.id='obRow';r.className='obRow';
 r.innerHTML='<button onclick="obPath()">🧭 เลือกทางเล่น</button><button onclick="obWorlds()">🗺️ ทุกโลก ทุกโหมด</button>';
 anchor.insertAdjacentElement('afterend',r)}catch(e){}}

// ───────── เสียบเข้ากับเกม ─────────
const hook=(name,fn)=>{try{const o=window[name];if(typeof o!=='function')return;const w=function(){try{fn.apply(this,arguments)}catch(e){}return o.apply(this,arguments)};try{Object.assign(w,o)}catch(e){}window[name]=w}catch(e){}};
const hookAfter=(name,fn)=>{try{const o=window[name];if(typeof o!=='function')return;const w=function(){const r=o.apply(this,arguments);try{fn.apply(this,arguments)}catch(e){}return r};try{Object.assign(w,o)}catch(e){}window[name]=w}catch(e){}};
hook('choiceRun',()=>qDone('ev'));
hookAfter('choiceShow',()=>tip('choice'));
hook('duel',()=>tip('duel'));
hookAfter('openMenu',()=>qDone('menu'));hook('modal',()=>{const c=$$('obQc');if(c)c.remove()});
hookAfter('openRealm',()=>{qDone('realm');tip('realm')});
hookAfter('openGuide',()=>{qDone('guide');setTimeout(guideEnhance,30)});
hookAfter('passYear',()=>{try{if(S&&S.alive&&(S.age|0)>=3)qDone('yr');qPaint()}catch(e){}});
hookAfter('show',id=>{if(id==='title'){setTimeout(titleBtns,250);setTimeout(titleBtns,1100)}setTimeout(qPaint,300)});
hookAfter('render',()=>{if(!$$('obQb'))qPaint()});
hookAfter('toTitle',()=>{const b=$$('obQb');if(b)b.remove();const c=$$('obQc');if(c)c.remove()});

try{if(typeof SYS_GUIDE!=='undefined'&&!SYS_GUIDE.some(g=>g.t==='เลือกทางเล่น')){
 SYS_GUIDE.unshift({s:'base',ic:'🧭',t:'เลือกทางเล่น',d:'ตอบคำถามข้อเดียว แล้วเกมจะแนะนำโลกที่เหมาะกับสไตล์ของคุณ',go:'obPath'},{s:'base',ic:'🗺️',t:'ทุกโลก ทุกโหมด',d:'อ่านสั้นๆ ว่าแต่ละโลกเล่นอะไร เป้าหมายคืออะไร และปีแรกควรทำอะไร',go:'obWorlds'})}}catch(e){}

// ───────── 👴 ปู่สอน เวอร์ชันตามโลก/โหมด ─────────
const coOff=()=>!!LSG('murim_coOff',0);
const GP={
 murim:'ข้าเป็นผู้เฒ่าที่จะพาคุณเดินในยุทธภพ ชีวิตจะเดินไปเองทีละปี คุณมีหน้าที่แค่ตัดสินใจเมื่อเกมถาม',
 xian:'ยินดีต้อนรับสู่โลกผู้บำเพ็ญ ข้าจะคอยบอกทางเท่าที่จำเป็น ที่นี่ชีวิตยาวนาน ไม่ต้องรีบร้อน',
 mw:'ที่นี่คือยุคปัจจุบัน ชีวิตแบบคนธรรมดา มีเรียน มีงาน มีเงินต้องดูแล ข้าจะบอกเท่าที่คุณต้องรู้',
 soul:'ทวีปนี้ทุกคนมีวิญญาณยุทธ์ติดตัว ข้าจะอยู่ข้างๆ ตอนถึงวันปลุก',
 loop:'คุณได้โอกาสที่สองแล้ว จำสิ่งที่เคยเกิดไว้ให้ดี ข้าจะช่วยเตือนเท่าที่ทำได้',
 beast:'เริ่มจากตัวเล็กๆ ในป่า ไม่ต้องกลัว ข้าจะบอกว่าอะไรอันตราย',
 sky:'หลังดาวตกโลกเปลี่ยนไปหมดแล้ว ข้าจะพาคุณรู้จักนครกำแพงก่อน',
 fog:'หมอกที่นี่ไม่เคยจาง และคดีก็ไม่เคยหมด ตามข้ามาแล้วจะไม่หลงทาง'
};
function startSteps(){
 const k=curW(),w=wOf(k)||OB_W[0],mode=S&&S.ch,mm={hell:1,short:2,junk:3}[mode];
 const pre=[{t:`${w.ic} ${w.n}`,d:GP[k]||GP.murim}];
 const mid=[{t:'โลกนี้เล่นอะไร',d:`${w.do}<br><br><b>เป้าหมาย:</b> ${w.goal}`},{t:'ปีแรกๆ ทำอะไรดี',d:`${w.first}<br><br>อยากรู้ว่าตอนนี้ระดับไหน เปิด <b>☰ เมนู → 📜 คัมภีร์</b> ได้ทุกเมื่อ`,btn:['🗺️ อ่านเรื่องโลกนี้',`obWorlds('${k}')`]}];
 return{pre,mid}}
function wrapCo(){try{
 const L=window._LESSON;if(!L||!L.start||L.start._obBase)return;
 L.start._obBase=L.start.s.slice();
 OB_W.filter(w=>w.k==='sky'||w.k==='fog').forEach(w=>{L['w_'+w.k]={t:`โลก${w.n}`,s:[{t:`${w.ic} ${w.n}`,d:`${GP[w.k]}<br><br>${w.do}`},{t:'เป้าหมาย',d:`${w.goal}<br><br>${w.first}`,btn:['🗺️ อ่านเรื่องโลกนี้',`obWorlds('${w.k}')`]}]}});
 L.duel={t:'การต่อสู้',s:[{t:'⚔️ นี่คือการต่อสู้',d:'ดูท่าของคู่ต่อสู้แล้วเลือกท่าที่เหมาะ ไม่ต้องรีบ เกมหยุดรอคุณอยู่ · แพ้ก็ไม่ได้แปลว่าชีวิตจบเสมอไป แต่ถ้าอีกฝ่ายแกร่งกว่ามาก การถอยคือทางที่ฉลาด'}]};
 L.realm={t:'คัมภีร์',s:[{t:'📜 คัมภีร์ของโลกนี้',d:'หน้านี้บอกว่าตอนนี้อยู่ขั้นไหน ขั้นต่อไปต้องทำอะไร และขึ้นแล้วได้อะไร · ถ้าติดอยู่ไม่รู้จะไปต่อทางไหน มาเปิดดูหน้านี้ก่อนเสมอ'}]};
 L.danger={t:'ข้อเสี่ยง',s:[{t:'⚠️ ระวังนะ',d:'ตัวเลือกนี้มีทางที่อาจถึงตาย ถ้าไม่แน่ใจ กด <b>ℹ️</b> ดูรายละเอียดก่อน หรือ <b>▾ ย่อไว้ก่อน</b> แล้วไปดูกระเป๋ากับสถานะ พอพร้อมค่อยกลับมาเลือก'}]};
try{if(!LSG('murim_obvet',0)){LSS('murim_obvet',1);if((LSG('murim_legacy',[])||[]).length>=5)['w_sky','w_fog','duel','realm','danger'].forEach(coMark)}}catch(e){}
}catch(e){console.error('obCo',e)}}
function hookCo(){try{
 wrapCo();
 const o=window.coStart;if(typeof o!=='function'||o._ob)return;
 const w=function(id,force){
  try{
   if(coOff()&&!force)return;
   if(id==='start'&&window._LESSON&&window._LESSON.start&&S){const L=window._LESSON.start,b=L._obBase||L.s,st=startSteps();
    const i=b.findIndex(x=>x.sel==='#menuBtn');const head=b.slice(0,i<0?b.length:i),tail=i<0?[]:b.slice(i);
    L.s=st.pre.concat(head,st.mid,tail);}
  }catch(e){console.error(e)}
  return o.apply(this,arguments)};
 w._ob=1;window.coStart=w;
}catch(e){console.error('hookCo',e)}}
hookCo();setTimeout(hookCo,1500);setTimeout(hookCo,5000);

// ปู่โผล่ตามจังหวะ: โลกใหม่ · โหมดพิเศษ · ครั้งแรกที่ต่อสู้ / เปิดคัมภีร์ / เจอตัวเลือกเสี่ยง
function coLater(id,ms){try{if(coOff()||coSeen(id))return;setTimeout(()=>{try{if(coOff()||coSeen(id))return;if(typeof coStart==='function')coStart(id,true)}catch(e){}},ms||600)}catch(e){}}
hookAfter('passYear',()=>{try{if(!S||!S.alive||(S.age|0)<2||coOff())return;if(typeof coCan==='function'&&!coCan())return;
 const k=curW();
 if(!coSeen('start'))return;
 if((k==='sky'||k==='fog')&&!coSeen('w_'+k)){coStart('w_'+k);return}
}catch(e){}});
hook('duel',()=>{if(!coSeen('duel'))coLater('duel',900)});
hookAfter('openRealm',()=>{if(!coSeen('realm'))coLater('realm',700)});

// ⚠️ แถบเตือนเมื่อมีตัวเลือกที่เสี่ยงตาย
const RISK=/เสี่ยงตาย|อาจตาย|ถึงตาย|ตายได้|โอกาสตาย|เสี่ยงชีวิต|เสี่ยงสูง/;
hookAfter('choiceShow',()=>{try{const c=choice._cur,m=$$('modal');if(!c||!m||m.dataset.k!=='choice'||m.querySelector('.obWarn'))return;
 if(!c.opts.some(o=>o&&RISK.test(String(o.t||'')+' '+String(o.s||''))))return;
 const p=m.querySelector('p');if(!p)return;
 p.insertAdjacentHTML('afterend','<div class="obWarn">⚠️ <span>มีทางเลือกที่เสี่ยงตาย ถ้าไม่แน่ใจ ลองกด ℹ️ ดูรายละเอียดก่อน</span></div>');
 if(!coSeen('danger'))coLater('danger',700)}catch(e){}});

// 😴 ถ้าหยุดเกมไว้นานๆ ปู่ถามไถ่ (ไม่เกิน 3 ครั้งต่อชีวิต)
let idle=0;
setInterval(()=>{try{if(!inLife()||coOff()||document.hidden){idle=0;return}
 if(!(typeof paused!=='undefined'&&paused)||modalOpen||choice._cur||(window._CO&&window._CO.id)){idle=0;return}
 idle+=5;if(idle<45||(S._obN|0)>=3||(S.age|0)>30)return;
 idle=0;S._obN=(S._obN|0)+1;
 const L=['ยังอยู่ไหม? กด ▶ ให้ชีวิตเดินต่อได้เลย','ข้านั่งรออยู่ กดเล่นต่อเมื่อพร้อมนะ','ไม่แน่ใจจะทำอะไร? เปิด ☰ เมนู แล้วลองดู 📘 คู่มือ'];
 if(typeof island==='function'&&typeof islOn==='function'&&islOn())island({big:1,key:'obIdle',ic:'👴',h:'ปู่ถาม',t:L[(S._obN-1)%3],kind:'info',ms:5500});else toast('👴 '+L[(S._obN-1)%3])}catch(e){}},5000);

// เสียงปู่ตอนผ่านภารกิจ
try{const praise=['เก่งมาก!','ดีแล้ว!','ถูกต้องเลย','เข้าใจเร็วนี่','ไปต่อได้อีกข้อ'];window._obPraise=()=>praise[Math.floor(Math.random()*praise.length)]}catch(e){}

// ปุ่มปิด/เปิดปู่ (หน้าบทเรียน + ข้างปู่ตอนสอน)
window._obCoOff=function(v){LSS('murim_coOff',v?1:0);try{const c=$$('coach');if(c&&v&&typeof coEnd==='function')coEnd(true)}catch(e){}toast(v?'👴 ปู่จะไม่โผล่เองอีก เปิดใหม่ได้ที่หน้า 🎓 บทเรียน':'👴 ปู่กลับมาช่วยแล้ว')};
hookAfter('openLessons',()=>{try{const m=$$('modal');if(!m||m.dataset.k!=='lessons'||m.querySelector('.obCoT'))return;const off=coOff();m.insertAdjacentHTML('beforeend',`<button class="obGh obCoT" style="width:100%;margin-top:8px" onclick="_obCoOff(${off?0:1});openLessons()">${off?'👴 เปิดให้ปู่ช่วยสอนเอง':'🔇 ปิดไม่ให้ปู่โผล่มาเอง'}</button>`)}catch(e){}});
hookAfter('coStep',()=>{setTimeout(()=>{try{const n=document.querySelector('#coach .cnav');if(!n||document.querySelector('#coach .obCoX'))return;const b=document.createElement('button');b.className='obCoX';b.textContent='ไม่ต้องสอนแล้ว';b.onclick=()=>_obCoOff(1);n.parentNode.appendChild(b)}catch(e){}},80)});

// ───────── สไตล์ ─────────
const st=document.createElement('style');st.textContent=`
.obHd{text-align:center;margin:2px 0 10px}.obHd h3{margin:2px 0 4px}.obHd p{margin:0;font-size:14px;opacity:.8;line-height:1.5}.obIc{font-size:44px;line-height:1.1}
.obV{display:flex;align-items:center;gap:12px;width:100%;text-align:left;font:inherit;color:inherit;padding:12px 14px;margin:0 0 8px;border-radius:16px;border:1px solid rgba(232,181,74,.45);background:linear-gradient(135deg,rgba(232,181,74,.16),rgba(232,181,74,.04));cursor:pointer}
.obV i{font-style:normal;font-size:30px;flex:0 0 auto}.obV span{flex:1;min-width:0}.obV b{display:block;font-size:16px}.obV small{display:block;opacity:.75;font-size:13px;margin-top:2px;line-height:1.4}.obV em{font-style:normal;font-size:24px;opacity:.5}
.obV:active{transform:scale(.98)}
.obC{position:relative;padding:12px 14px;margin:0 0 10px;border-radius:16px;border:1px solid rgba(127,127,127,.35);background:rgba(127,127,127,.1)}
.obC.top{border-color:#e8b54a;background:linear-gradient(135deg,rgba(232,181,74,.2),rgba(232,181,74,.05))}
.obBest{position:absolute;top:-9px;right:12px;background:#e8b54a;color:#2a1a04;font-size:11px;font-weight:800;padding:2px 9px;border-radius:999px}
.obCh{display:flex;gap:10px;align-items:center}.obCh i{font-style:normal;font-size:32px}.obCh b{display:block;font-size:17px}.obCh small{opacity:.75;font-size:12.5px}
.obC p,.obCard p{margin:8px 0;font-size:14.5px;line-height:1.65}
.obBt{display:flex;gap:8px}
.obGo{flex:1;font:inherit;font-weight:800;font-size:15px;padding:10px 12px;border-radius:12px;border:2px solid #7a5410;background:linear-gradient(180deg,#ffe29a,#e8b54a 55%,#c98d22);color:#1d1405;cursor:pointer}
.obGo.wide{width:100%;margin-top:10px;font-size:16px}
.obGh{font:inherit;font-size:13.5px;font-weight:700;padding:9px 13px;border-radius:12px;border:1px solid rgba(127,127,127,.5);background:transparent;color:inherit;cursor:pointer}
.obLn{display:block;margin:10px auto 2px;background:none;border:0;font:inherit;font-size:14px;color:inherit;opacity:.7;text-decoration:underline;cursor:pointer}
.obNote{margin:4px 0 8px;padding:10px 12px;border-radius:12px;background:rgba(127,127,127,.12);font-size:13.5px;line-height:1.6}.obNote .obGh{display:block;margin-top:8px}
.obTabs{display:flex;gap:6px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:none}.obTabs::-webkit-scrollbar{display:none}
.obT{flex:0 0 auto;font:inherit;font-size:13.5px;font-weight:700;padding:7px 12px;border-radius:999px;border:1px solid rgba(127,127,127,.45);background:transparent;color:inherit;cursor:pointer;white-space:nowrap}
.obT.on{background:#e8b54a;color:#2a1a04;border-color:#e8b54a}
.obCard{padding:12px 14px;border-radius:16px;border:1px solid rgba(127,127,127,.35);background:rgba(127,127,127,.08)}.obCard h4{margin:0 0 6px}
.obCard h5{margin:12px 0 0;font-size:13px;color:#d9a334;letter-spacing:.02em}.obCard h5+p{margin-top:3px}
.obLv{margin-top:8px;font-size:13px;opacity:.85}.obLv b{color:#e8b54a;letter-spacing:2px}
.obSm{font-size:13px;opacity:.75;line-height:1.55;margin:6px 0}
.obMr{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid rgba(127,127,127,.25)}.obMr i{font-style:normal;font-size:24px}.obMr b{display:block;font-size:15px}.obMr small{display:block;opacity:.78;font-size:13px;line-height:1.5}
.obRow{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:6px 0}.obRow button{font:inherit;font-size:14px;font-weight:700;padding:9px 14px;border-radius:12px;border:2px solid #8a6d3b;background:#fff7e0;color:#4a3410;cursor:pointer}
.obGs{margin:0 0 8px}.obGq input{width:100%;box-sizing:border-box;font:inherit;font-size:15px;padding:10px 14px;border-radius:12px;border:1px solid rgba(127,127,127,.5);background:rgba(127,127,127,.1);color:inherit}
.obGl{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.obGl button{font:inherit;font-size:13px;font-weight:700;padding:6px 11px;border-radius:999px;border:1px solid #e8b54a;background:rgba(232,181,74,.14);color:inherit;cursor:pointer}
.obGe{display:none;text-align:center;padding:10px;font-size:13.5px;opacity:.75}
#obQb{position:fixed;left:10px;bottom:calc(env(safe-area-inset-bottom) + 150px);z-index:60;font:inherit;font-size:12.5px;font-weight:700;padding:6px 12px;border-radius:999px;border:2px solid #e8b54a;background:rgba(20,14,30,.88);color:#ffe9a8;box-shadow:0 4px 14px #0007;cursor:pointer}#obQb b{color:#fff}
#obQc{position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top) + 100px);z-index:9000;width:min(86vw,320px);padding:10px 12px;border-radius:16px;border:2px solid #e8b54a;background:rgba(20,14,30,.95);color:#f5ead0;box-shadow:0 8px 28px #000a}
.obQh{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.obQh button{font:inherit;font-size:12px;background:none;border:0;color:#bba882;text-decoration:underline;cursor:pointer}
.obQr{display:flex;gap:9px;align-items:flex-start;padding:6px 0;border-top:1px solid #ffffff18}.obQr i{font-style:normal;font-size:18px;width:22px;text-align:center}.obQr b{display:block;font-size:13.5px}.obQr small{display:block;opacity:.7;font-size:12px;line-height:1.4}.obQr.ok{opacity:.55}.obQr.ok b{text-decoration:line-through}
.obWarn{margin:6px 0;padding:8px 12px;border-radius:12px;border:1px solid #ff8a5a;background:rgba(255,120,70,.14);font-size:13.5px;line-height:1.5;display:flex;gap:8px;align-items:flex-start}
#coach .obCoX{display:block;margin:8px auto 0;background:none;border:0;font:inherit;font-size:12px;color:inherit;opacity:.6;text-decoration:underline;cursor:pointer}
`;document.head.appendChild(st);

setTimeout(()=>{titleBtns();qPaint()},400);
})()}catch(e){console.error('onb',e)}
wReady('onb');
