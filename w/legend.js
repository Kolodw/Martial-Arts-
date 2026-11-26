// ============================================================
// /w/legend.js 🌌 ตำนานข้ามชาติ + 🎭 สไตล์ชีวิต + 🖼️ การ์ดตำนาน (ทุกโลก · โหลดเบื้องหลัง 3.6 วิ)
//  1) ตำนานข้ามชาติ: จบชีวิต → เก็บ "รอย" ของชีวิตนั้น (LS murim_lgd ≤15: ชื่อ โลก อายุ ฉายา แลนด์มาร์ก S.scars วิชาเด่น สำนัก สาเหตุตาย ลูก คู่)
//     ชีวิตถัดไป ผ่านปี → สุ่มเจอเหตุการณ์จากชาติก่อน 9 แบบ (≤3/ชีวิต · ไม่ซ้ำแบบ · โอกาสไม่คงที่) แต่ละแบบผลลัพธ์แตกแขนงสุ่ม/หักมุม
//     ตำนานบิดเบือนตามเวลา (ยิ่งนานยิ่งเพี้ยน) · ข้ามโลก = ของ/ความทรงจำจากอีกโลกหลุดเข้ามา · บางแบบมีภาคต่อในปีหลัง
//  2) 🎭 สไตล์ชีวิต (ฟรี): บู๊ / รวย / รัก / สงบ / บำเพ็ญ → ชะตา/ออโต้เลือกตามแนว (ยังมีโอกาสหักมุม 20%) · ล็อกคำตอบ (VIP) มาก่อนเสมอ
//  3) 🖼️ การ์ดตำนาน แนวตั้ง 1080×1350 (โพสต์ Facebook ได้พอดี) ที่หน้าจบชีวิต
// ============================================================
try{(function(){
if(window._lgd)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T_=f=>{try{return f()}catch(e){return null}};
const R=(a,b)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),CH=a=>a[Math.floor(Math.random()*a.length)],P_=p=>Math.random()<p;
const alive=()=>T_(()=>!!(S&&S.alive));
const wk=()=>{if(typeof S==='undefined'||!S)return'murim';const M=S.mw;if(M&&M.sky)return'sky';if(M&&M.fog)return'fog';if(S.beastMode)return'beast';if(S.ch==='soul')return'soul';if(S.rg)return'loop';if(M)return'mw';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
const WN={murim:'ยุทธภพ',xian:'โลกเซียน',god:'แดนเทพ',soul:'จิตวิญญาณยุทธ์',mw:'ยุคปัจจุบัน',sky:'ทะลุฟ้าดารา',fog:'นครม่านหมอก',beast:'สัตว์อสูร',loop:'ผู้ย้อนกาล'};
const MOD=w=>['mw','sky','fog'].includes(w);
const money=n=>T_(()=>fmtM(n))||String(Math.round(n));
const say=(t,c,big)=>T_(()=>log(t,c||'',!!big));
const add=(k,v)=>T_(()=>{S[k]=(S[k]||0)+v});
const pct=f=>T_(()=>{const g=Math.max(1,Math.round((S.power||0)*f));S.power=(S.power||0)+g;return g})||0;
// ---------- 1) บันทึกรอยชีวิต ----------
const LK='murim_lgd',ld=()=>{try{const v=LS.get(LK,[]);return Array.isArray(v)?v:[]}catch(e){return[]}},sv=v=>{try{LS.set(LK,v.slice(0,15))}catch(e){}};
function record(){try{if(!S||S._lgSaved||S.age<6)return;S._lgSaved=1;const best=(S.arts||[]).filter(a=>a&&a.n).sort((a,b)=>(b.r||0)-(a.r||0)||(b.b||0)-(a.b||0))[0];
 const r={id:Date.now().toString(36),n:String(S.name||'นิรนาม').slice(0,30),w:wk(),a:S.age|0,ep:T_(()=>epithet())||'',sc:(S.scars||[]).slice(0,3).map(x=>({n:x.n,sc:x.sc})),art:best?{n:best.n,r:best.r|0}:null,
  fac:T_(()=>S.faction&&S.faction.n)||'',c:String(S.cause||'').replace(/<[^>]+>/g,'').slice(0,60),kids:(S.children||[]).length,sp:T_(()=>S.spouse&&(S.spouse.n||S.spouse.name))||'',fm:S.fame|0,k:S.karma|0,t:Date.now()};
 const L=ld();L.unshift(r);sv(L)}catch(e){console.error('lgRec',e)}}
setInterval(()=>{try{const e=$('end');if(e&&e.classList.contains('on'))record()}catch(x){}},1500);
// ---------- เหตุการณ์จากชาติก่อน ----------
const ago=r=>{const g=Math.max(1,(T_(()=>S.gen)|0)||1),y=RI(40,400)*(1+ld().indexOf(r));return MOD(wk())?`${RI(8,90)} ปีก่อน`:`${y} ปีก่อน`};
const blur=(s,r)=>{const old=(Date.now()-r.t)/864e5;if(old<2||P_(.5))return s;return s.split('').map((c,i)=>i%7===3&&/[ก-ฮ]/.test(c)&&P_(.5)?'…':c).join('')};
function choiceX(t,x,opts){T_(()=>choice(t,x,opts))}
const EV={
 // 1) แลนด์มาร์กจากการปลดปล่อยพลังชาติก่อน
 land:{c:r=>r.sc&&r.sc.length,go(r){const s=CH(r.sc),nm=blur(s.n,r),mod=MOD(wk());
  choiceX('🗺️ สถานที่ที่ชื่อคุ้นหู',`${mod?'ในแอปแผนที่มีหมุดชื่อ':'ระหว่างเดินทาง คุณผ่าน'} <b>「${E(nm)}」</b> — ${mod?'รีวิว 4.7 ดาว คนบอกว่าเป็น “จุดพลังงานลึกลับ”':'ชาวบ้านบอกว่าเกิดจากยอดฝีมือคนหนึ่งเมื่อ'+ago(r)}<br><span class="tag2">หัวใจคุณเต้นแรงโดยไม่รู้สาเหตุ</span>`,[
  {t:'🚶 เดินเข้าไปดูใกล้ๆ',s:'อะไรก็เกิดขึ้นได้',f(){const k=RI(0,4);
   if(k===0){const g=pct(.04+s.sc*.006);say(`✨ กลางหลุมมีพลังตกค้างจากชาติก่อน มันไหลเข้าร่างคุณราวกับจำเจ้าของได้ — พลัง +${T_(()=>fmt(g))||g}`,'myth',true)}
   else if(k===1){add('fame',20+s.sc*8);say(`🙇 คนเฝ้าสถานที่มองหน้าคุณนาน… แล้วคุกเข่าลง “ท่านกลับมาแล้ว” ข่าวลือแพร่ออกไป — ชื่อเสียง +${20+s.sc*8}`,'epic')}
   else if(k===2){const ok=T_(()=>fight(mod?'ผู้คุมจุดศักดิ์สิทธิ์':'ผู้พิทักษ์ตำนาน',(T_(()=>total())||100)*R(.6,1.2)));say(ok?'⚔️ ผู้พิทักษ์ที่นั่นหาว่าคุณมาลบหลู่ ปะทะกันสั้นๆ คุณชนะ เขาเงียบไปเมื่อเห็นท่าของคุณ — “ท่านี้…”':'🩸 ผู้พิทักษ์ที่นั่นไล่คุณออกมาด้วยสภาพสะบักสะบอม แต่คุณมั่นใจว่าเขาจำท่าบางท่าของคุณได้',ok?'epic':'bad')}
   else if(k===3){T_(()=>joy(-8));add('int',4);say('💭 ภาพแวบขึ้นมา — มือคู่หนึ่งที่ไม่ใช่ของคุณ ระเบิดพลังตรงนี้ ความรู้สึกผิดบางอย่างตามมาด้วย · ปัญญา +4 · ความสุขลดลง','')}
   else{say('🍃 ไม่มีอะไรเกิดขึ้น มีแค่ลมพัดผ่าน… และป้ายที่สะกดชื่อนั้นผิด คุณยิ้มโดยไม่รู้ตัว','');T_(()=>joy(4))}}},
  {t:'👂 นั่งฟังคนเล่าตำนาน',s:'ตำนานอาจไม่ตรงความจริง',f(){const v=CH(['ยอดคนผู้ช่วยหมู่บ้านไว้','ปีศาจที่ทำลายทุกอย่างเพราะอกหัก','คนธรรมดาที่บังเอิญล้ม','เทพที่ลงมาลงโทษคนโลภ']);say(`📜 ตำนานเล่าว่าผู้สร้างที่นี่คือ “${v}” — ${/ปีศาจ|ล้ม/.test(v)?'คุณอยากเถียงแต่ไม่รู้จะเถียงยังไง':'คุณรู้สึกอบอุ่นอย่างประหลาด'}`,'');if(/ปีศาจ/.test(v))add('karma',-3);else add('luck',2)}},
  {t:'🙈 เดินผ่านไป',s:'',skip:1,f(){say('คุณเดินผ่านไปเฉยๆ แต่คืนนั้นฝันถึงแสงสว่างจ้า','')}}])}},
 // 2) คัมภีร์ชาติก่อน
 book:{c:r=>r.art,go(r){const a=r.art,mod=MOD(wk());
  choiceX('📖 คัมภีร์ที่คุ้นมือ',`${mod?'ในร้านหนังสือมือสอง มีสมุดบันทึกลายมือเก่าหัวข้อ':'แผงหนังสือเก่าขาย'} <b>《${E(blur(a.n,r))}》</b> ${mod?'— ลายมือเหมือนของคุณเป๊ะ':'— คนขายบอกว่าเป็นของยอดฝีมือเมื่อ'+ago(r)}`,[
  {t:'📚 ซื้อมาฝึก',s:'อาจเป็นของปลอม',f(){const cost=Math.round((T_(()=>S.money)||0)*.08+50);T_(()=>{S.money=Math.max(0,S.money-cost)});const k=RI(0,3);
   if(k<=1&&T_(()=>S.arts.length<artCap())){const x=T_(()=>newArt(Math.max(0,(a.r|0)-1)));if(x){x.n=a.n;x.tier=(x.tier||'')+' · มรดกชาติก่อน';x.lv=Math.max(x.lv|0,1);S.arts.push(x);say(`📜 คุณพลิกอ่านแล้วฝึกได้ราวกับเคยฝึกมาทั้งชีวิต — ได้วิชา <b>《${E(a.n)}》</b> (เริ่มที่ระดับกลาง) · จ่าย ${money(cost)}`,'myth',true);return}}
   if(k===2){const h=Math.round((S.maxHp||100)*.15);S.hp=Math.max(1,(S.hp||1)-h);say(`☠️ ฉบับปลอม! มีคนแก้ท่าไว้ให้ลมปราณตีกลับ พลังชีวิต −${h} · จ่าย ${money(cost)}`,'bad')}
   else{add('int',6);say(`🤔 อ่านจบแล้วฝึกไม่ได้ แต่ในหน้าสุดท้ายมีลายมือเขียนว่า “ถ้าข้าได้อ่านนี่อีก แปลว่าข้ากลับมาแล้ว” · ปัญญา +6 · จ่าย ${money(cost)}`,'epic')}}},
  {t:'💰 ซื้อไปขายต่อ',s:'',f(){const g=RI(80,400)*(1+(a.r|0));add('money',g);say(`💰 นักสะสมแย่งกันประมูล ได้กำไร ${money(g)} — แต่คืนนั้นคุณนอนไม่หลับ`,'good')}},
  {t:'🔥 ขอเผาทิ้ง',s:'แปลกใจตัวเอง',f(){add('karma',4);add('luck',3);say('🔥 คุณเผาคัมภีร์ทิ้งโดยไม่รู้เหตุผล ในกองไฟมีเสียงหัวเราะเบาๆ คล้ายเสียงตัวเอง · บุญ +4 · โชค +3','epic')}}])}},
 // 3) หลุมศพตัวเอง
 grave:{c:r=>r.a>=10,go(r){const mod=MOD(wk());
  choiceX('🪦 หลุมศพของใครบางคน',`${mod?'ในสุสานเก่าหลังวัด':'บนเนินเขาเงียบสงัด'} มีป้ายหินเขียนว่า <b>${E(blur(r.n,r))}</b>${r.ep?' “'+E(r.ep)+'”':''} — อายุ ${r.a} ปี${r.c?'<br><span class="tag2">'+E(blur(r.c,r))+'</span>':''}`,[
  {t:'🕯️ จุดธูปไหว้',s:'',f(){const k=RI(0,2);if(k===0){add('luck',5);say('🕯️ ควันธูปลอยวนรอบตัวคุณสามรอบก่อนลอยขึ้นฟ้า · โชค +5','epic')}else if(k===1){T_(()=>joy(10));say('🕯️ คุณร้องไห้โดยไม่รู้ตัว คนแถวนั้นมองแปลกๆ แต่ใจคุณโล่งอย่างประหลาด · ความสุข +10','good')}else{T_(()=>{S.maxHp=(S.maxHp||100)+8});say('🕯️ มีเสียงกระซิบ “คราวนี้อย่าตายแบบเดิมอีกนะ” · พลังชีวิตสูงสุด +8','epic')}}},
  {t:'⛏️ ขุดดู',s:'ไม่ควรทำ',f(){const k=RI(0,3);if(k===0){const g=RI(300,2500);add('money',g);say(`💎 ในโลงมีหีบเล็กๆ ที่ล็อกด้วยรหัสวันเกิด… ของคุณในชาตินี้ ข้างในมีทรัพย์ ${money(g)}`,'myth',true)}
   else if(k===1){add('karma',-8);const h=Math.round((S.maxHp||100)*.1);S.hp=Math.max(1,(S.hp||1)-h);say(`👻 ลมเย็นพุ่งออกมาจากหลุม คุณล้มหงายหลัง ป่วยไปหลายวัน · บุญ −8 · พลังชีวิต −${h}`,'bad')}
   else if(k===2){add('int',8);say('📝 โลงว่างเปล่า มีแค่กระดาษแผ่นเดียว: “ถ้าเจ้าอ่านอยู่ แปลว่าข้าหนีสำเร็จ อย่าตามหาข้า” — ลายมือของคุณ · ปัญญา +8','myth',true)}
   else say('🦴 มีแค่กระดูกกับดาบหัก… ดาบที่จับแล้วพอดีมือคุณเหลือเกิน','')}},
  {t:'🚶 เดินจากมา',s:'',skip:1,f(){say('คุณเดินจากมา แต่ชื่อบนป้ายหินติดอยู่ในหัวไปหลายปี','')}}])}},
 // 4) ทายาท/สายศิษย์
 heir:{c:r=>r.kids>0||r.fac,go(r){const lin=r.kids>0?'ทายาทรุ่นที่ '+RI(3,9)+' ของ':'ศิษย์สายตรงของสำนัก'+(r.fac?E(r.fac):'')+' ที่';
  choiceX('🧬 คนแปลกหน้าคำนับคุณ',`ชายคนหนึ่งแนะนำตัวว่าเป็น${lin} <b>${E(blur(r.n,r))}</b> — “ทำไมหน้าท่านเหมือนภาพบรรพบุรุษในหอบูชาเหลือเกิน”`,[
  {t:'🤝 ยอมรับไมตรี',s:'',f(){const k=RI(0,2);if(k===0){const g=RI(200,1500);add('money',g);say(`🎁 เขามอบของตกทอดให้ “เผื่อท่านจะจำได้” · ได้ ${money(g)}`,'epic')}else if(k===1){add('fame',30);say('🏯 ทั้งตระกูลเชิญคุณไปกินเลี้ยง และเรียกคุณว่า “ท่านผู้เฒ่า” ทั้งที่คุณยังหนุ่ม · ชื่อเสียง +30','good')}else{say('😨 กลางงานเลี้ยงเขาขอเลือดคุณหนึ่งหยด “เพื่อพิสูจน์” … คุณรีบขอตัวกลับ ตั้งแต่นั้นมีคนแอบตามคุณอยู่บ่อยๆ','bad');S._lgTail=1}}},
  {t:'🧪 ทดสอบเขาก่อน',s:'ใช้ปัญญา',f(){if(P_(.5+(S.int||0)/400)){add('int',3);add('fame',12);say('🧠 คุณถามเรื่องที่มีแต่ “เจ้าของชีวิตก่อน” ที่รู้ เขาตอบถูกหมด… แล้วเขาก็ตอบคำถามสุดท้ายถูกด้วย คำถามที่คุณเพิ่งนึกออก','epic')}else say('🎭 เขาตอบผิดตั้งแต่ข้อแรก — เป็นนักต้มตุ๋นที่ได้ยินตำนานมา คุณไล่เขาไป','')}},
  {t:'🙅 ไม่ใช่ข้า',s:'',f(){say('คุณปฏิเสธ เขาก้มหัวแล้วเดินจากไป สายตาเหมือนคนที่เพิ่งสูญเสียอะไรบางอย่าง','');add('karma',-1)}}])}},
 // 5) ฝันถึงวิธีตาย
 death:{c:r=>r.c,go(r){choiceX('🌘 ฝันซ้ำทุกคืน',`คุณฝันเห็นตัวเองในชาติก่อน — <b>${E(blur(r.c,r))}</b> ฝันเดิมวนซ้ำสามคืนติด`,[
  {t:'🛡️ เตรียมตัวไม่ให้ซ้ำรอย',s:'',f(){T_(()=>{S.maxHp=(S.maxHp||100)+12;S.hp=Math.min(S.maxHp,(S.hp||1)+12)});say('🛡️ คุณเปลี่ยนนิสัยเล็กๆ หลายอย่าง หลีกเลี่ยงทุกอย่างที่คล้ายในฝัน · พลังชีวิตสูงสุด +12','good')}},
  {t:'⚔️ ตามหาต้นเหตุ',s:'อันตราย',f(){const ok=T_(()=>fight(CH(['เงาจากความฝัน','ผู้ที่เคยทำร้ายคุณในชาติก่อน','สิ่งที่รอคุณอยู่']),(T_(()=>total())||100)*R(.7,1.3)));if(ok){const g=pct(.05);say(`⚔️ คุณเผชิญหน้ากับสิ่งเดิมและชนะในครั้งนี้ — วงจรถูกทำลาย พลัง +${T_(()=>fmt(g))||g}`,'myth',true)}else{const h=Math.round((S.maxHp||100)*.2);S.hp=Math.max(1,(S.hp||1)-h);say(`🩸 คุณแพ้อีกครั้ง… แต่รอดมาได้ ต่างจากคราวก่อน · พลังชีวิต −${h}`,'bad')}}},
  {t:'🍵 ปล่อยวาง',s:'',f(){T_(()=>joy(6));add('karma',2);say('🍵 คุณยอมรับว่าเป็นแค่ความฝัน ฝันนั้นไม่กลับมาอีกเลย','')}}])}},
 // 6) ความทรงจำข้ามโลก
 cross:{c:r=>r.w!==wk(),go(r){const from=WN[r.w]||'อีกโลก',to=wk();
  const obj={murim:'กระบี่สนิมเขรอะ',xian:'หินวิญญาณแตกร้าว',god:'ขนนกสีทองที่ไม่มีวันหมอง',soul:'วงแหวนวิญญาณจางๆ',mw:'โทรศัพท์มือถือแบตเหลือ 3%',sky:'ชิ้นส่วนเกราะที่ยังกะพริบ',fog:'นาฬิกาพกที่เดินถอยหลัง',beast:'เขี้ยวอสูรขนาดเท่าแขน',loop:'นาฬิกาทรายที่ทรายไหลขึ้น'}[r.w]||'ของแปลกจากอีกโลก';
  choiceX('🌀 ของหลุดมาจากอีกโลก',`คุณเจอ <b>${obj}</b> ${MOD(to)?'ในกล่องพัสดุที่ไม่มีชื่อผู้ส่ง':'ตกอยู่กลางทาง'} — คุณรู้สึกว่ามันมาจาก<b>${from}</b> และเคยเป็นของคุณ`,[
  {t:'✋ หยิบขึ้นมา',s:'ความทรงจำจะไหลเข้ามา',f(){const k=RI(0,3);
   if(k===0){add('int',8);T_(()=>joy(-6));say(`🌊 ความทรงจำของ${from}ทะลักเข้ามา คุณจำชื่อ <b>${E(r.n)}</b> ได้ชัดเจน · ปัญญา +8 แต่หัวใจหนักอึ้ง`,'myth',true)}
   else if(k===1){const g=pct(.05);say(`⚡ ${obj}เปล่งแสงแล้วสลายเข้าไปในร่าง พลังจาก${from}ยังเหลืออยู่ — พลัง +${T_(()=>fmt(g))||g}`,'epic')}
   else if(k===2){add('fame',25);say(`📰 คุณเอาไปให้ผู้รู้ดู เรื่องราวแพร่ไปไกลว่ามี “ของจากต่างโลก” · ชื่อเสียง +25`,'good')}
   else{say(`💨 พอแตะปุ๊บ ${obj}ก็กลายเป็นฝุ่น ทิ้งไว้แค่กลิ่นที่คุณจำได้ — กลิ่นบ้านในชาติก่อน`,'');T_(()=>joy(5))}}},
  {t:'🙅 อย่าไปยุ่ง',s:'',skip:1,f(){say('คุณเดินผ่าน แต่หันกลับไปมองสามครั้ง — ครั้งที่สามมันหายไปแล้ว','')}}])}},
 // 7) คนแอบอ้าง
 fake:{c:r=>r.fm>=50||r.ep,go(r){choiceX('🎭 มีคนแอบอ้างชื่อ',`ในเมืองมีคนอ้างว่าตัวเองคือ <b>${E(r.n)}</b>${r.ep?' “'+E(r.ep)+'”':''} กลับชาติมาเกิด เก็บเงินคนที่มาขอพร`,[
  {t:'📣 เปิดโปง',s:'',f(){if(P_(.6)){add('fame',20);add('karma',4);say('📣 คุณเล่ารายละเอียดที่มีแต่เจ้าตัวรู้ คนแอบอ้างหน้าซีดแล้วหนีไป ทุกคนหันมามองคุณแทน · ชื่อเสียง +20 · บุญ +4','epic')}else{add('fame',-10);say('😓 ไม่มีใครเชื่อคุณ เขาพูดเก่งกว่า คุณกลายเป็น “คนอิจฉา” ในสายตาชาวเมือง · ชื่อเสียง −10','bad')}}},
  {t:'🤑 ขอร่วมหุ้น',s:'บาป',f(){const g=RI(400,3000);add('money',g);add('karma',-10);say(`🤑 คุณกับเขาแบ่งกันคนละครึ่ง ได้ ${money(g)} — คืนนั้นคุณฝันว่าตัวเองในชาติก่อนจ้องมองอย่างผิดหวัง · บุญ −10`,'bad')}},
  {t:'😶 ปล่อยไป',s:'',skip:1,f(){say('คุณปล่อยไป ชื่อเก่าของคุณกลายเป็นเครื่องมือหากินของคนอื่น… ก็แค่ชื่อเก่า','')}}])}},
 // 8) คนที่จำคุณได้ (ภาคต่อของ heir ที่ตามมา หรือคนแก่ที่เคยรู้จัก)
 known:{c:r=>(Date.now()-r.t)<30*864e5,go(r){choiceX('👁️ หญิงชราจ้องหน้าคุณ',`หญิงชราคนหนึ่งเดินเข้ามาจับมือคุณแน่น “<b>${E(r.n)}</b>… เจ้ายังติดค้างข้าอยู่นะ” — แล้วก็หัวเราะ`,[
  {t:'❓ ติดค้างอะไร',s:'',f(){const k=RI(0,2);if(k===0){add('money',-Math.round((S.money||0)*.05));add('karma',6);say('💸 “หนี้ค่าข้าวเจ็ดมื้อ” นางบอก คุณจ่ายให้ทั้งที่ไม่แน่ใจ นางยิ้มแล้วหายไปในฝูงชน · บุญ +6','good')}else if(k===1){add('luck',6);say('🍀 “คำสัญญาว่าจะกลับมา” นางพูดแล้วลูบหัวคุณ “ครบแล้ว” — นางทิ้งเครื่องรางไว้ในมือคุณ · โชค +6','myth',true)}else{say('🌫️ นางหายไปตอนคุณกะพริบตา คนรอบๆ บอกว่าไม่เห็นหญิงชราคนไหนเลย','');add('int',3)}}},
  {t:'🏃 รีบเดินหนี',s:'',f(){say('คุณรีบเดินหนี ได้ยินเสียงนางตะโกนตามหลัง “ชาติหน้าก็ยังติดค้างอยู่ดี!”','');S._lgDebt=1}}])}},
 // 9) ภาคต่อ: คนที่แอบตาม (จาก heir)
 tail:{c:()=>S._lgTail===1,go(r){S._lgTail=2;choiceX('🕵️ คนที่แอบตามมาหลายปี',`ชายจากตระกูล${E(r.n)}ที่เคยขอเลือดคุณ ดักรอคุณอยู่หน้าบ้าน — “ผลตรวจออกแล้ว”`,[
  {t:'📄 ขอดูผล',s:'',f(){const k=RI(0,2);if(k===0){add('fame',40);const g=RI(500,4000);add('money',g);say(`🧬 “ตรงกันร้อยเปอร์เซ็นต์” ทั้งตระกูลยกย่องคุณเป็นบรรพบุรุษกลับชาติ มอบมรดก ${money(g)} · ชื่อเสียง +40`,'myth',true)}else if(k===1){const ok=T_(()=>fight('ผู้คุมตระกูล',(T_(()=>total())||100)*R(.8,1.3)));say(ok?'⚔️ “ไม่ตรง” — เขาพยายามจับคุณไปเป็นเครื่องเซ่น คุณสู้จนหลุดออกมาได้':'🩸 “ไม่ตรง” — เขาพยายามจับคุณไปเป็นเครื่องเซ่น คุณหนีรอดมาแบบเฉียดตาย',ok?'epic':'bad')}else say('📭 ซองว่างเปล่า เขามองซองแล้วหัวเราะทั้งน้ำตา “ทุกครั้งก็ว่างแบบนี้” แล้วเดินจากไป','')}},
  {t:'🚪 ปิดประตูใส่',s:'',f(){say('คุณปิดประตูใส่ เขาไม่กลับมาอีกเลย… แต่ซองจดหมายถูกสอดไว้ใต้ประตู และคุณไม่เคยกล้าเปิดมันดู','')}}])}}
};
// ---------- จังหวะเกิดเหตุการณ์ (ไม่คงที่) ----------
function tick(){try{if(!alive()||S.age<8||T_(()=>choice._cur))return;const L=ld().filter(r=>r&&r.n!==S.name);if(!L.length&&S._lgTail!==1)return;
 S._lg=S._lg||{n:0,used:[],ny:0};const G=S._lg;if(G.n>=3)return;if(!G.ny)G.ny=S.age+RI(2,14);
 if(S._lgTail===1&&S.age>=G.ny&&P_(.5)){G.ny=S.age+RI(4,12);return EV.tail.go(L[0]||{n:'นิรนาม'})}
 if(S.age<G.ny)return;G.ny=S.age+RI(3,16);if(!P_(.55))return;
 const r=P_(.6)?L[0]:CH(L),K=Object.keys(EV).filter(k=>k!=='tail'&&!G.used.includes(k)&&T_(()=>EV[k].c(r)));if(!K.length)return;
 const k=CH(K);G.used.push(k);G.n++;EV[k].go(r)}catch(e){console.error('lgTick',e)}}
{const _py=passYear;const w=function(){const r=_py.apply(this,arguments);try{setTimeout(tick,600)}catch(e){}return r};try{passYear=w}catch(e){}window.passYear=w}
// ---------- 2) 🎭 สไตล์ชีวิต ----------
const STY={fight:['⚔️','บู๊',/สู้|ประลอง|ท้า|โจมตี|ฝึก|ล่า|ดวล|บุก|ต่อย|ลุย|ปะทะ|ล้างแค้น|ชิง/],rich:['💰','รวย',/เงิน|ค้า|ขาย|ลงทุน|ทอง|ธุรกิจ|ตำลึง|รับจ้าง|ทรัพย์|กำไร|งาน|หุ้น|ร้าน/],love:['💞','รัก',/รัก|แต่ง|จีบ|คู่|หัวใจ|ครอบครัว|ลูก|เพื่อน|ช่วย|ดูแล|ปลอบ|อ่อนโยน/],calm:['🍵','สงบ',/พัก|หลีก|ปฏิเสธ|เงียบ|ปลอดภัย|ถอย|รอ|สงบ|ปล่อย|ไม่ยุ่ง|อยู่บ้าน|เลี่ยง/],xian:['🧘','บำเพ็ญ',/บำเพ็ญ|ลมปราณ|สมาธิ|ทะลวง|ฝึกตน|ยา|คัมภีร์|ศึกษา|เรียน|ปัญญา|ตำรา|ธรรม/]};
const sty=()=>T_(()=>LS.get('murim_afs',''))||'';
{const _fc=fateChoice;const w=function(){try{const st=sty(),c=choice._cur;if(st&&STY[st]&&c&&Array.isArray(c.opts)){const AK=window._AK;const locked=AK&&T_(()=>AK.find(c));const big=AK?T_(()=>AK.big(c)):false;
  if(!locked&&!big&&!fateChoice._force){const re=STY[st][2];const sc=c.opts.map((o,i)=>{if(!o||o.skip||o.noFate)return-1;const t=String(o.t||'')+' '+String(o.s||'');const m=t.replace(/<[^>]+>/g,'').match(new RegExp(re.source,'g'));return(m?m.length:0)+Math.random()*.4});
   const best=Math.max(...sc);if(best>=1&&!P_(.2)){const i=sc.indexOf(best);T_(()=>{clearTimeout(choice._t);clearInterval(choice._cd)});T_(()=>addFeed('ev',`${STY[st][0]} สไตล์${STY[st][1]} — <b>${String(c.title||'').replace(/<[^>]+>/g,'').slice(0,40)}</b>: ${String(c.opts[i].t||'').replace(/<[^>]+>/g,'').slice(0,40)}`,'sum'));return choiceRun(i)}}}}catch(e){console.error('afs',e)}return _fc.apply(this,arguments)};try{fateChoice=w}catch(e){}window.fateChoice=w}
window.afsOpen=function(){const cur=sty();T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🎭 สไตล์ชีวิต</h3><p class="tag2">ให้ชะตา/โหมดอัตโนมัติเลือกตามแนวที่คุณชอบ แทนการสุ่มมั่ว · ยังมีโอกาสหักมุม 1 ใน 5 ครั้ง (ชีวิตไม่ควรเดาได้ทั้งหมด) · เรื่องสำคัญยังหยุดรอให้เลือกเอง · 🔒 ล็อกคำตอบมาก่อนเสมอ</p>
 <div class="afsG">${[['','🎲','สุ่มตามชะตา','แบบเดิม']].concat(Object.entries(STY).map(([k,v])=>[k,v[0],v[1],{fight:'เลือกทางสู้ ฝึก ท้าดวล',rich:'เลือกทางเงิน ค้าขาย ลงทุน',love:'เลือกคน ครอบครัว ความรัก',calm:'เลี่ยงปัญหา อยู่รอดปลอดภัย',xian:'เลือกทางฝึกตน เรียนรู้ ทะลวง'}[k]])).map(x=>`<button class="opt ${cur===x[0]?'afsOn':''}" onclick="LS.set('murim_afs','${x[0]}');closeM();toast('${x[1]} สไตล์ชีวิต: ${x[2]}')">${x[1]} ${x[2]}<small>${x[3]}</small></button>`).join('')}</div>`,'afs'))};
// ---------- ปุ่มในเมนู ☰ ----------
function menuBtn(){try{const m=$('modal');if(!m||m.dataset.k!=='menu'||m.querySelector('.afsMb'))return;const row=m.querySelector('.uxRow');const st=sty();const h=`<button class="gbtn afsMb" onclick="afsOpen()">${st&&STY[st]?STY[st][0]+' สไตล์'+STY[st][1]:'🎭 สไตล์ชีวิต'}</button><button class="gbtn lgdMb" onclick="lgdOpen()">🌌 ตำนานชาติก่อน</button>`;if(row)row.insertAdjacentHTML('beforeend',h)}catch(e){}}
new MutationObserver(()=>menuBtn()).observe($('modal')||document.body,{childList:true});
window.lgdOpen=function(){const L=ld();T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌌 ตำนานชาติก่อน</h3><p class="tag2">ทุกชีวิตที่จบทิ้งรอยไว้ — สถานที่ คัมภีร์ หลุมศพ ทายาท คนที่จำคุณได้ … ชีวิตต่อๆ ไปอาจเจอเข้า (ไม่รู้ว่าเมื่อไหร่ และไม่รู้ว่าผลจะออกมาแบบไหน)</p>
 ${L.length?L.slice(0,10).map(r=>`<div class="item lgdI"><b>${E(r.n)}</b>${r.ep?` <span class="tag2">“${E(r.ep)}”</span>`:''}<br><small class="tag2">${WN[r.w]||''} · อายุ ${r.a} ปี${r.art?` · 《${E(r.art.n)}》`:''}${r.sc&&r.sc.length?' · 🗺️ '+r.sc.map(x=>E(x.n)).join(', '):''}${r.kids?` · ลูก ${r.kids}`:''}</small></div>`).join(''):'<p class="tag2" style="text-align:center">ยังไม่มีตำนาน — จบชีวิตแรก (อายุ 6 ปีขึ้นไป) แล้วรอยจะเริ่มสะสม</p>'}`,'lgd'))};
// ---------- 3) 🖼️ การ์ดตำนาน แนวตั้ง ----------
window.lgdCard=async function(){try{if(typeof S==='undefined'||!S)return;const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
 const w=wk(),PAL={murim:['#2a1208','#6a2a14','#ffb84a'],xian:['#0e1a2e','#2a4a6a','#9ad8ff'],god:['#2a2008','#6a5014','#ffe27a'],soul:['#1a0f33','#3a1f5a','#c8a0ff'],mw:['#0a1020','#1c2a48','#38d6ff'],sky:['#02030a','#14204a','#7aa8ff'],fog:['#141c1a','#2e3a36','#9fe0c8'],beast:['#2a120a','#5a2a14','#ff8a4c'],loop:['#1a1408','#3a2a10','#ffd36a']}[w]||['#1a1030','#3a1d52','#ffc23a'];
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,PAL[0]);g.addColorStop(1,PAL[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
 for(let i=0;i<140;i++){x.globalAlpha=Math.random()*.6;x.fillStyle='#fff';x.fillRect(Math.random()*W,Math.random()*H*.55,2,2)}x.globalAlpha=1;
 x.strokeStyle=PAL[2];x.lineWidth=6;x.strokeRect(30,30,W-60,H-60);x.globalAlpha=.4;x.lineWidth=2;x.strokeRect(46,46,W-92,H-92);x.globalAlpha=1;
 const F=(s,sz,c,y,al)=>{x.font=`bold ${sz}px Itim, Sarabun, sans-serif`;x.fillStyle=c;x.textAlign=al||'center';x.fillText(s,al==='left'?96:W/2,y)};
 F('1 ใน นวนิยาย · ตำนาน',34,PAL[2],120);
 const d=T_(()=>frGet())||{},src=d.av||d.snap;if(src){await new Promise(res=>{const im=new Image();im.onload=()=>{x.save();x.beginPath();x.arc(W/2,330,150,0,7);x.closePath();x.fillStyle='#0008';x.fill();x.clip();x.imageSmoothingEnabled=false;x.drawImage(im,W/2-150,180,300,300);x.restore();x.strokeStyle=PAL[2];x.lineWidth=8;x.beginPath();x.arc(W/2,330,154,0,7);x.stroke();res()};im.onerror=res;im.src=src})}
 else{x.font='200px sans-serif';x.textAlign='center';x.fillText('🧘',W/2,400)}
 F(String(S.name||''),72,'#ffffff',580);const ep=T_(()=>epithet())||'';if(ep)F(`“${ep}”`,40,PAL[2],640);
 F(`${WN[w]||''} · อายุ ${S.age|0} ปี${S.alive?'':' · จบชีวิต'}`,36,'#e8e8f0',700);
 const cz=String(S.cause||'').replace(/<[^>]+>/g,'').slice(0,40);if(cz&&!S.alive)F(cz,30,'#c8c8d4',748);
 let y=830;x.textAlign='left';const line=(ic,t)=>{if(y>H-200)return;x.font='bold 36px Itim, Sarabun, sans-serif';x.fillStyle=PAL[2];x.fillText(ic,96,y);x.fillStyle='#fff';x.font='34px Itim, Sarabun, sans-serif';
  const words=(()=>{try{return[...new Intl.Segmenter('th',{granularity:'word'}).segment(String(t))].map(z=>z.segment)}catch(e){return[...String(t)]}})();let ln='',yy=y;for(const ch0 of words){const tst=ln+ch0;if(x.measureText(tst).width>820){x.fillText(ln,150,yy);ln=ch0;yy+=44}else ln=tst}x.fillText(ln,150,yy);y=yy+64};
 const K=(S.key||[]).slice(-12).map(s=>String(s).replace(/<[^>]+>/g,'')).filter(Boolean);const pick=[];if(K.length){pick.push(K[0]);if(K.length>2)pick.push(K[Math.floor(K.length/2)]);pick.push(K[K.length-1])}
 [...new Set(pick)].slice(0,3).forEach(k=>line('✦',k.slice(0,70)));
 (S.scars||[]).slice(0,2).forEach(s=>line('🗺️',`ทิ้งรอยไว้ที่ 「${s.n}」`));
 const best=(S.arts||[]).filter(a=>a&&a.n).sort((a,b)=>(b.r||0)-(a.r||0))[0];if(best)line('📜',`วิชาเด่น《${best.n}》`);
 x.textAlign='center';F('เกิดใหม่แล้วคุณจะเป็นใคร? → 1inanovel.com',36,PAL[2],H-90);
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));const f=blob&&new File([blob],'1inanovel-legend.png',{type:'image/png'});
 if(f&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:'1 ใน นวนิยาย',text:`ตำนานของ ${S.name} — 1inanovel.com`});return}catch(e){if(e&&e.name==='AbortError')return}}
 const u=cv.toDataURL('image/png');T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🖼️ การ์ดตำนาน</h3><img src="${u}" style="width:100%;border-radius:12px"><a class="gbtn" style="display:block;text-align:center;margin-top:8px" href="${u}" download="1inanovel-legend.png">⬇️ บันทึกภาพ</a><p class="tag2">ขนาด 1080×1350 โพสต์ Facebook/IG ได้พอดี</p>`,'lgcard'))}catch(e){console.error('lgdCard',e);T_(()=>toast('สร้างการ์ดไม่สำเร็จ'))}};
setInterval(()=>{try{const e=$('end');if(!e||!e.classList.contains('on')||e.querySelector('.lgdCB'))return;const b=e.querySelector('.shCardB')||[...e.querySelectorAll('button')].find(x=>/เกิดใหม่/.test(x.textContent));if(!b)return;b.insertAdjacentHTML('afterend','<button class="gbtn lgdCB" onclick="lgdCard()">🖼️ การ์ดตำนาน (โพสต์เฟส)</button>')}catch(x){}},1500);
const st=document.createElement('style');st.textContent=`.afsG{display:grid;grid-template-columns:1fr 1fr;gap:6px}.afsG .opt small{display:block;font-size:11.5px;opacity:.7}.afsG .afsOn{border-color:#e9b949!important;box-shadow:0 0 0 2px #e9b94966 inset}.lgdI{margin-bottom:6px}`;document.head.appendChild(st);
window._lgd={ld,record,tick,EV,sty};
})()}catch(e){console.error('mod-legend',e)}
try{wReady('legend')}catch(e){}
