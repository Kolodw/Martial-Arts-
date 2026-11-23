// 🌍 ไฟล์โลก "soul" — แยกจาก app.js ด้วย tools/split-out.mjs · โหลดผ่าน wLoad('soul') (BLOCK 117)
// ⚠️ แก้โค้ดของโลกนี้ที่ไฟล์นี้เท่านั้น · ห้ามประกาศชื่อระดับบนสุดใหม่นอกฟังก์ชัน

// ---- ท่อน soul1 (เดิมอยู่ app.js บรรทัด 32637) · ห่อ: passYear, openMenu, lifeDetail, chStart, openSoul, openSoulBook ----
(function(){const SL=globalThis.__wSlots['soul1'];let passYear=SL.base.passYear;let openMenu=SL.base.openMenu;let lifeDetail=SL.base.lifeDetail;let chStart=SL.base.chStart;let openSoul=SL.base.openSoul;let openSoulBook=SL.base.openSoulBook;const __G={passYear:()=>passYear,openMenu:()=>openMenu,lifeDetail:()=>lifeDetail,chStart:()=>chStart,openSoul:()=>openSoul,openSoulBook:()=>openSoulBook},__S={passYear:v=>{passYear=v},openMenu:v=>{openMenu=v},lifeDetail:v=>{lifeDetail=v},chStart:v=>{chStart=v},openSoul:v=>{openSoul=v},openSoulBook:v=>{openSoulBook=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
if(typeof CH_KEYS==='undefined')return;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const on=()=>!!(S&&S.alive&&S.ch==='soul');
const free=()=>!(choice._cur||modalOpen);
// ---------- ดวงจิต: [id, ไอคอน, ชื่อ, สาย, คำบรรยาย, ความหายาก 0-3, ร่างแท้ที่ซ่อนอยู่?] ----------
const TY={atk:['⚔️','สายโจมตี'],def:['🛡️','สายป้องกัน'],sup:['🌿','สายสนับสนุน'],ctrl:['🌀','สายควบคุม'],agi:['💨','สายว่องไว']};
const SP=[
 ['hoe','⛏️','จอบทำนา','def','จอบเก่าที่พ่อใช้ทำนามาทั้งชีวิต',0,['🌋','จอบเปิดแผ่นดิน','atk','ทุกครั้งที่ฟาดลง แผ่นดินแยกออกเป็นร่อง']],
 ['candle','🕯️','เทียนไข','sup','แสงริบหรี่ที่ไม่เคยดับแม้ลมแรง',0,['🔥','เทียนนำวิญญาณ','sup','แสงเทียนพาวิญญาณที่หลงทางกลับบ้าน และพาศัตรูไปที่ที่ไม่มีทางกลับ']],
 ['cat','🐈','แมวจร','agi','แมวผอมที่ตามคุณมาตั้งแต่จำความได้',0,null],
 ['broom','🧹','ไม้กวาด','ctrl','ไม้กวาดลานวัด',0,['🌪️','ไม้กวาดพายุ','ctrl','กวาดทีเดียว ทั้งสนามรบปลิวเป็นใบไม้']],
 ['reed','🌾','ต้นอ้อ','sup','อ้อริมบึงที่ลู่ลมแต่ไม่เคยหัก',0,null],
 ['stone','🪨','ก้อนหินริมน้ำ','def','หินกลมเกลี้ยงที่น้ำเซาะมาพันปี',0,null],
 ['needle','🪡','เข็มเย็บผ้า','atk','เข็มของแม่ที่ใช้ปะเสื้อให้ทุกคืน',0,['✨','เข็มร้อยดวงดาว','atk','เข็มเล่มเดียวแยกเป็นพันเล่มกลางอากาศ']],
 ['bamboo','🎋','ไผ่','def','ลำไผ่ที่โตวันละศอก',0,null],
 ['frog','🐸','กบนา','agi','กระโดดไกลกว่าที่ใครคิด',0,null],
 ['lotus','🪷','บัวสาย','sup','บัวที่บานแม้ในน้ำโคลน',0,null],
 ['ladle','🥄','ทัพพี','sup','ทัพพีทองเหลืองในครัวยาย',0,['🍲','ทัพพีจักรพรรดิครัว','sup','อาหารที่ปรุงด้วยทัพพีนี้ฟื้นพลังได้เท่ายาวิเศษ']],
 ['rope','🪢','เชือกป่าน','ctrl','เชือกผูกควายที่คุณเล่นตอนเด็ก',0,null],
 ['crow','🐦‍⬛','อีกา','ctrl','กาที่จำหน้าคนได้ทุกคน',0,null],
 ['shadow','👤','เงาตัวเอง','agi','ดวงจิตที่คนหัวเราะเยาะ แค่เงาของตัวเอง',0,['🌑','เงาที่ไม่ใช่ของเรา','atk','เงานั้นขยับก่อนคุณครึ่งวินาที และมันโหดกว่าคุณมาก']],
 ['rain','🌧️','ละอองฝน','sup','เย็นชื่นเหมือนฝนแรกของปี',0,null],
 ['wolf','🐺','หมาป่าเงิน','atk','เขี้ยวสีเงินกับหัวใจที่ภักดีต่อฝูง',1,null],
 ['tort','🐢','เต่าหินเขียว','def','กระดองที่ดาบธรรมดาฟันไม่เข้า',1,null],
 ['vine','🌿','เถาวัลย์เหล็ก','ctrl','รัดแน่นจนหินแตก',1,null],
 ['hawk','🦅','เหยี่ยวลม','agi','สายตาที่มองเห็นจากยอดเขา',1,null],
 ['spear','🔱','ทวนทองแดง','atk','ทวนที่สั่นทุกครั้งที่มีภัย',1,null],
 ['bell','🔔','ระฆังวัด','ctrl','เสียงระฆังที่ทำให้ศัตรูหยุดนิ่ง',1,null],
 ['mirror','🪞','กระจกโบราณ','ctrl','สะท้อนท่าของศัตรูกลับไปหาเจ้าของ',1,null],
 ['tiger','🐅','เสือลายเพลิง','atk','ลายบนตัวลุกเป็นไฟเมื่อโกรธ',1,null],
 ['bear','🐻','หมีดำภูเขา','def','ทนทานจนน่ากลัว',1,null],
 ['bfly','🦋','ผีเสื้อพิษ','ctrl','ผงจากปีกทำให้หลับฝันร้าย',1,null],
 ['herb','🌱','สมุนไพรร้อยปี','sup','กลิ่นของมันทำให้แผลปิดเร็วกว่าปกติสามเท่า',1,null],
 ['thund','🔨','ค้อนฟ้าคำราม','atk','ฟาดลงเมื่อไหร่ ฟ้าผ่าตามมา',2,null],
 ['icephx','🐦','หงส์น้ำแข็ง','agi','ปีกเย็นยะเยือกที่บินเร็วกว่าเสียง',2,null],
 ['jade','🐍','งูหยกเก้ารอบ','ctrl','ขดเก้ารอบ รอบสุดท้ายไม่มีใครหลุด',2,null],
 ['sunl','🌸','บัวสุริยะ','sup','กลีบบัวที่ส่องแสงเหมือนดวงอาทิตย์ยามเช้า',2,null],
 ['night','🗡️','ดาบราตรี','atk','ใบดาบที่มองไม่เห็นในความมืด',2,null],
 ['mount','⛰️','ภูผาค้ำฟ้า','def','แบกน้ำหนักทั้งภูเขาไว้บนไหล่',2,null],
 ['glass','⏳','นาฬิกาทราย','ctrl','ทรายไหลช้าลงรอบตัวคุณ และรอบตัวศัตรูไหลเร็วขึ้น',2,null],
 ['fox','🦊','จิ้งจอกเก้าหาง','agi','หางทั้งเก้าคือภาพลวงทั้งเก้า',2,null],
 ['dbone','🐉','กระดูกมังกรบรรพกาล','atk','กระดูกที่ยังจำได้ว่าเคยเป็นราชันแห่งฟ้า',3,null],
 ['wtree','🌳','ต้นไม้โลก','sup','รากหยั่งถึงใจกลางทวีป',3,null],
 ['void','⚫','ความว่างเปล่า','ctrl','ไม่มีรูปร่าง ไม่มีสี สิ่งที่มันแตะหายไป',3,null],
 ['sunb','☀️','ปักษาตะวัน','atk','ไฟที่ไม่มีวันมอด',3,null],
 ['moon','🌙','จันทราสีเลือด','agi','คืนเดือนเพ็ญ คุณเร็วจนเงาตามไม่ทัน',3,null]];
const RAR=[['ธรรมดา','#bbb'],['หายาก','#4aa3ff'],['ล้ำค่า','#b47bff'],['ตำนาน','#ffcf3a']];
// ---------- วงแหวน ----------
const TIER=[['สิบปี','⚪','#e8e8e8'],['ร้อยปี','🟡','#f2c94c'],['พันปี','🟣','#a66bff'],['หมื่นปี','⚫','#3a3a3a'],['แสนปี','🔴','#e03a3a'],['ล้านปี','🌟','#ffd84a'],['สิบล้านปี','💠','#6ad8ff'],['ร้อยล้านปี','✴️','#ffffff'],['พันล้านปี','🌈','#ff7ae0']];
const BEAST=[
 [['กระต่ายเขาเดียว','เขาพุ่งทะลวง'],['หนูหิน','ฟันบดศิลา'],['งูหญ้า','เลื้อยไร้เงา'],['นกกระจอกไฟ','ขนไฟพราว'],['กบตาแดง','ลิ้นพิษ'],['ลิงขโมย','มือไวไร้ร่องรอย']],
 [['หมาป่าหลังเงิน','เขี้ยวจันทร์'],['หมูป่าเขาเหล็ก','ชนทลายกำแพง'],['เหยี่ยวพายุ','กรงเล็บลม'],['ตะขาบพิษร้อยปี','ร้อยขาพันพิษ'],['ลิงดำภูเขา','หมัดภูผา'],['จระเข้บึง','ขากรรไกรมรณะ']],
 [['เสือดาวเงา','ก้าวเงาสังหาร'],['งูเหลือมหยก','รัดหยกบดกระดูก'],['หมีเกราะหิน','เกราะศิลาพันชั้น'],['กวางเขาฟ้าผ่า','เขาสายฟ้า'],['นกฮูกราตรี','ตาแห่งราตรี'],['แมงป่องทราย','หางทรายมรณะ']],
 [['ราชสีห์เพลิง','คำรามเผาฟ้า'],['งูยักษ์ทะเลสาบ','วังวนมรณะ'],['ช้างศิลา','ย่ำแผ่นดินถล่ม'],['พญาอินทรีทอง','ปีกทองตัดฟ้า'],['แมงมุมราชินี','ใยกักวิญญาณ'],['กระทิงฟ้าร้อง','พุ่งชนพันฟ้าร้อง']]];
const RANK=['ผู้ปลุกจิต','นักจิตยุทธ์','ปรมาจารย์จิต','จ้าวจิต','ราชันจิต','จักรพรรดิจิต','ปราชญ์จิต','มหาจิตยุทธ์','จิตอมตะ','ผู้ครองดวงจิต'];
const SAFE=[1,1,2,2,2,3,3,3,3,4];
const V=()=>S.sv;
const spOf=id=>SP.find(x=>x[0]===id);window._svSpOf=spOf;
const spNow=s=>{const p=spOf(s.id);return s.rev&&p[6]?{ic:p[6][0],n:p[6][1],t:p[6][2],d:p[6][3],r:Math.max(2,p[5])}:{ic:p[1],n:p[2],t:p[3],d:p[4],r:p[5]}};
const rankOf=lv=>RANK[cl(Math.floor((Math.max(1,lv)-1)/10),0,9)];
const capOf=G=>G.rings.length>=9?100:(G.rings.length+1)*10;
const svInit=()=>{if(!S.sv)S.sv={aw:0,sp:[],lv:0,rings:[],seen:{},hy:-9};return S.sv};
function roll(){const r=Math.random(),rr=r<.02?3:r<.12?2:r<.4?1:0;const L=SP.filter(x=>x[5]===rr);return ch(L)[0]}
// ---------- พิธีปลุกดวงจิต (อายุ 6) ----------
function awaken(){const G=svInit();if(G.aw)return;G.aw=1;if(window._svFail&&window._svFail(G))return;const ids=[roll()];if(Math.random()<.05){let b=roll(),n=0;while(b===ids[0]&&n++<9)b=roll();ids.push(b)}
 G.sp=ids.map(id=>({id,rev:0}));const best=Math.max(...G.sp.map(s=>spNow(s).r));
 const inn=[[1,4],[3,6],[5,8],[8,10]][best];G.lv=Math.min(10,R(inn[0],inn[1])+(ids.length>1?1:0));
 try{const B=LS.get('murim_svbook',{})||{};ids.forEach(id=>B[id]=1);LS.set('murim_svbook',B)}catch(e){}
 const t=G.sp.map(s=>{const p=spNow(s);return`${p.ic} <b style="color:${RAR[p.r][1]}">${p.n}</b> <span class="tag2">(${TY[p.t][0]} ${TY[p.t][1]} · ${RAR[p.r][0]})</span>`}).join(' และ ');
 const hidden=G.sp.some(s=>spOf(s.id)[6]&&!s.rev);
 const cls=ids.length>1||best>=3||G.lv>=10?'myth':best>=2?'epic':'';
 choice('⭕ พิธีปลุกดวงจิต',`อายุหกขวบ ผู้ปลุกจิตประจำหมู่บ้านวางลูกแก้วหกลูกรอบตัวคุณ แสงพุ่งขึ้นจากฝ่ามือ —<br><br>${t}<br><br>พลังจิตแต่กำเนิด <b>ระดับ ${G.lv}</b>${G.lv>=10?' — <b>เต็มแต่กำเนิด!</b>':''}${ids.length>1?'<br><b>👯 ดวงจิตคู่!</b> ราวหนึ่งในยี่สิบคนเท่านั้นที่ได้ดวงจิตสองดวง':''}${hidden&&best===0?'<br><span class="tag2">เด็กคนอื่นหัวเราะ… แต่ดวงจิตคุณสั่นเบาๆ เหมือนมีอะไรซ่อนอยู่ข้างใน</span>':''}`,[
  {t:'✊ ตั้งใจจะเป็นผู้ฝึกจิต',s:'เริ่มฝึกทันที',f(){G.lv=Math.min(capOf(G),G.lv+1);log(`⭕ คุณกำดวงจิตไว้ในมือ ทางของผู้ฝึกจิตเริ่มต้นที่นี่ (ระดับ ${G.lv})`,cls,true)}},
  {t:'🏡 ใช้ชีวิตธรรมดาไปก่อน',s:'ฝึกช้าลงช่วงแรก',f(){G.slow=S.age+4;S.cha+=3;log('🏡 คุณเลือกเล่นกับเพื่อนในหมู่บ้านอีกสักพัก ดวงจิตยังรอคุณอยู่','',true)}}])}
// ---------- ฝึกรายปี ----------
function svYear(){const G=svInit();if(!G.aw){if(S.age>=6)G.wa=1;return}if(G.aw===2)return;
 const cap=capOf(G);if(G.lv<cap){const best=Math.max(...G.sp.map(s=>spNow(s).r));let g=R(1,3)+(best>=2?1:0)+(G.sp.length>1?1:0);g=Math.max(1,Math.round(g*Math.sqrt((S.talent&&S.talent.m)||1)*(G.slow&&S.age<G.slow?.5:1)*(window._svGrow?window._svGrow(G):1)));
  const b=G.lv;G.lv=Math.min(cap,G.lv+g);if(Math.floor((G.lv-1)/10)>Math.floor((b-1)/10)&&G.lv>10){S.fame+=10*Math.floor(G.lv/10);log(`⭕ <b>ทะลวงสู่${rankOf(G.lv)}</b> — ระดับจิต ${G.lv}`,'epic',true)}
  if(G.lv>=cap&&cap<100)log(`⭕ ระดับจิต ${G.lv} <b>ถึงคอขวด</b> ต้องหลอมวงแหวนวงที่ ${G.rings.length+1} ก่อนจึงจะไปต่อได้`,'')}
 // ปลดร่างแท้ของดวงจิตที่ดูไร้ค่า
 if(G.lv>=30&&!(window._svTFq&&window._svTFq(G)))G.sp.forEach(s=>{const p=spOf(s.id);if(p[6]&&!s.rev){s.rev=1;S.power+=pctPow(.08);S.fame+=40;log(`🌋 ดวงจิต <b>${p[2]}</b> ที่ทุกคนเคยหัวเราะเยาะ แตกเปลือกออก <b>${p[6][0]} ${p[6][1]}</b>! ${p[6][3]}`,'myth',true)}});
 // ถึงคอขวด → เสนอออกล่า
 if(G.lv>=cap&&cap<100&&S.age>=8&&S.age-G.hy>=1&&!G.retired)G.wh=1}
setInterval(()=>{try{if(!on()||!free()||(typeof DU!=='undefined'&&DU))return;const G=svInit();if(G.wa&&!G.aw){G.wa=0;awaken();return}if(G.wh){G.wh=0;G.hy=S.age;hunt()}}catch(e){}},700);
// ---------- ล่าวงแหวน ----------
function hunt(){const G=V(),i=G.rings.length,safe=SAFE[i],maxT=Math.min(3,safe+1);
 const opts=[];for(let t=0;t<=maxT;t++){const over=t-safe,b=ch(BEAST[t]);const risk=over<=0?'ปลอดภัย':over===1?'⚠️ เกินขีดร่างกาย เสี่ยงบาดเจ็บหนัก':'☠️ เสี่ยงตาย';
  opts.push({t:`${TIER[t][1]} ${b[0]} · ${TIER[t][0]}`,s:risk,f(){goHunt(t,b)}})}
 try{if(window._svHuntX)window._svHuntX(G,i,safe,opts)}catch(e){console.error(e)}
 opts.push({t:'⏳ ยังไม่ออกล่า',s:'ฝึกรากฐานรอไปก่อน',skip:true,f(){S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.1));log('⏳ คุณเลือกรอ ระดับจิตยังติดอยู่ที่คอขวด','')}});
 choice(`⭕ ออกล่าวงแหวนวงที่ ${i+1}`,`ระดับจิตคุณถึง ${G.lv} แล้ว ต้องหลอมวงแหวนจากสัตว์อสูรจึงจะไปต่อได้<br><span class="tag2">วงแหวนวงที่ ${i+1} ร่างกายรับได้อย่างปลอดภัยถึง ${TIER[safe][0]} · วงแหวนแก่กว่าแรงกว่าและให้ท่าที่ดีกว่า แต่ถ้าเกินขีด ร่างกายอาจแตกสลาย</span>`,opts)}
function goHunt(t,b){const mult=[.35,.65,.95,1.25][t];const nm=`${b[0]} (${TIER[t][0]})`;
 duel(nm,Math.max(5,Math.round(total()*mult)),w=>{try{if(!S||!S.alive)return;if(!w){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15*(window._svHurt?window._svHurt():1)));log(`🩸 ${b[0]}หนีไปพร้อมรอยแผลบนตัวคุณ ลองใหม่ปีหน้า`,'bad');return}if(window._svWin)window._svWin(t,b,()=>absorb(t,b));else absorb(t,b)}catch(e){console.error('sv hunt',e)}})}
function absorb(t,b){const G=V(),i=G.rings.length,over=t-SAFE[i],best=Math.max(...G.sp.map(s=>spNow(s).r));
 const pBad=over<=0?0:cl((over===1?.38:.72)-best*.04-(S.hp/S.maxHp-.5)*.2-(window._svRisk?window._svRisk(G,t,over):0),.08,.9);
 if(Math.random()<pBad){if(over>=2&&Math.random()<.45&&!(window._svDodge&&window._svDodge(G))){S.deathCause=`หลอมวงแหวน${TIER[t][0]}ของ${b[0]}เกินขีดร่างกาย ดวงจิตแตกสลาย`;log(`💥 พลังของวงแหวน${TIER[t][0]}ทะลักเกินกว่าร่างกายจะรับไหว…`,'bad',true);setTimeout(()=>{try{checkDeath()}catch(e){}},200);return}
  S.maxHp=Math.max(30,Math.round(S.maxHp*.85));S.hp=Math.max(1,Math.round(S.hp*.4));G.lv=Math.max(1,G.lv-3);log(`💥 วงแหวนแตกกลางทางหลอม คุณรอดมาได้ แต่เส้นจิตฉีกขาด (พลังชีวิตสูงสุด −15% · ระดับจิต −3)`,'bad',true);return}
 const ring={t,b:b[0],sk:b[1]};G.rings.push(ring);G.lv=Math.min(100,G.lv+1+(over>0?2:0));
 const pw=[.03,.06,.1,.16,.25,.4,.6,.85,1.2][t]*(over>0?1.5:1);S.power+=pctPow(pw);S.fame+=[2,6,15,40,100,300,800,2000,5000][t];if(t>=2)S.maxHp+=[0,0,15,30,60,120,200,320,500][t];
 try{const B=LS.get('murim_svring',{})||{};B[b[0]]=Math.max(B[b[0]]||0,t+1);LS.set('murim_svring',B)}catch(e){}
 const sp=spNow(G.sp[0]);
 log(`${TIER[t][1]} <b>หลอมวงแหวนวงที่ ${G.rings.length} สำเร็จ</b> — ${TIER[t][0]}ของ${b[0]} · ได้ท่า <b>「${sp.n}·${b[1]}」</b>${over>0?' · <b>หลอมเกินขีดสำเร็จ!</b>':''}`,over>0||t>=3?'myth':'epic',true)}
// ---------- หน้าดวงจิต ----------
window.openSoul=function(){if(!S||S.ch!=='soul')return toast('ใช้ได้เฉพาะชีวิตในทวีปจิตวิญญาณยุทธ์');const G=svInit();
 const sp=G.aw===2?'<div class="item">🌑 <b>ไร้ดวงจิต</b> ลูกแก้วทั้งหกไม่เรืองแสง</div>':G.aw?G.sp.map(s=>{const p=spNow(s),h=spOf(s.id)[6]&&!s.rev;return`<div class="item"><b>${p.ic} <span style="color:${RAR[p.r][1]}">${p.n}</span></b> <span class="tag2">${TY[p.t][0]} ${TY[p.t][1]} · ${RAR[p.r][0]}</span><br><span class="tag2">${p.d}${h?' · <i>มีบางอย่างซ่อนอยู่ข้างใน…</i>':''}</span></div>`}).join(''):'<div class="item">ยังไม่ได้ปลุกดวงจิต พิธีปลุกจัดขึ้นตอนอายุ 6 ขวบ</div>';
 const rg=G.rings.map((g,i)=>`<div style="display:flex;align-items:center;gap:8px;margin:3px 0"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;border:4px solid ${TIER[g.t][2]};box-shadow:0 0 8px ${TIER[g.t][2]}"></span><span><b>วงที่ ${i+1}</b> · ${TIER[g.t][0]} · ${esc(g.b)}<br><span class="tag2">「${esc(spNow(G.sp[0]).n)}·${esc(g.sk)}」</span></span></div>`).join('')||'<p class="tag2">ยังไม่มีวงแหวน</p>';
 const cap=capOf(G);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>⭕ ดวงจิตของ ${esc(S.name)}</h3>${sp}
 <div class="item"><b>${G.aw?rankOf(G.lv):'—'}</b> · ระดับจิต <b>${G.lv}</b>/100<div style="height:8px;background:#0004;border-radius:4px;margin-top:4px"><div style="height:8px;width:${G.lv}%;background:linear-gradient(90deg,#6fd8ff,#b47bff);border-radius:4px"></div></div>${G.aw&&G.lv>=cap&&cap<100?`<span class="tag2">ถึงคอขวด ต้องหลอมวงแหวนวงที่ ${G.rings.length+1}</span>`:''}</div>
 <h4>วงแหวนวิญญาณ ${G.rings.length}/9</h4>${rg}
 ${G.aw===1&&!G.retired&&G.lv>=cap&&cap<100&&S.age>=8?`<button class="pbtn" style="width:100%;margin-top:8px" onclick="closeM();setTimeout(()=>{if(!choice._cur)window._svHunt()},150)">🏹 ออกล่าวงแหวนตอนนี้</button>`:''}
 <button class="gbtn" style="width:100%;margin-top:6px" onclick="openSoulBook()">📖 สมุดดวงจิต</button>`)};
window._svHunt=()=>{try{if(on())hunt()}catch(e){}};
window.openSoulBook=function(){const B=LS.get('murim_svbook',{})||{},RB=LS.get('murim_svring',{})||{};const got=SP.filter(x=>B[x[0]]).length,rgot=BEAST.flat().filter(b=>RB[b[0]]).length;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📖 สมุดดวงจิต</h3><p class="tag2">ดวงจิตที่เคยปลุก ${got}/${SP.length} · สัตว์ที่เคยหลอมวงแหวน ${rgot}/${BEAST.flat().length}</p>
 ${[3,2,1,0].map(r=>`<h4 style="color:${RAR[r][1]}">${RAR[r][0]}</h4><div style="line-height:1.9">${SP.filter(x=>x[5]===r).map(x=>B[x[0]]?`${x[1]} ${x[2]}`:'<span style="opacity:.45">❔ ???</span>').join(' · ')}</div>`).join('')}
 <h4>สัตว์อสูร</h4>${BEAST.map((L,t)=>`<div style="margin:3px 0">${TIER[t][1]} ${L.map(b=>RB[b[0]]?b[0]:'<span style="opacity:.45">???</span>').join(' · ')}</div>`).join('')}`)};
// ---------- ผูกเข้าเกม ----------
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(on())svYear()}catch(e){console.error('sv year',e)}return r}}
// ข้อมูลใต้ชื่อ + ปุ่มลัด
setInterval(()=>{try{let b=$('svPill');if(!on()){if(b)b.style.display='none';return}const a=$('brkPill')||$('ascPill');if(!b&&a){a.insertAdjacentHTML('afterend','<button id="svPill" class="ascpill" style="margin-right:6px;border-color:#b47bff;background:linear-gradient(180deg,#2a1a4a,#4a2a7a)" onclick="openSoul()"></button>');b=$('svPill')}if(!b)return;const G=svInit();b.style.display='';const t=G.aw===2?'🌑 ไร้ดวงจิต':G.aw?`⭕ ${G.lv} · ${'●'.repeat(G.rings.length)||'○'}`:'⭕ รอปลุก';if(b.textContent!==t)b.textContent=t}catch(e){}},1200);
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.svM'))g.insertAdjacentHTML('afterbegin',`<button class="opt svM" onclick="closeM();openSoul()">⭕ ดวงจิตและวงแหวน<small>ระดับจิต · วงแหวน · สมุดดวงจิต</small></button>`)}}catch(e){}return r}}
{const _ld=lifeDetail;lifeDetail=function(){const d=_ld.apply(this,arguments);try{if(d&&S&&S.sv&&S.ch==='soul'){d.sv={lv:S.sv.lv,sp:S.sv.sp.map(s=>spNow(s).n),rg:S.sv.rings.map(g=>g.t)}}}catch(e){}return d}}
// ---------- ลงทะเบียนโหมด ----------
try{CH_N.soul='⭕ จิตวิญญาณยุทธ์';if(!CH_KEYS.includes('soul'))CH_KEYS.push('soul');const ix=CH_KEYS.indexOf('soul');
 OPT_INFO.chm[ix]=()=>['⭕','ทวีปจิตวิญญาณยุทธ์','อายุหกขวบทุกคนจะได้ปลุก <b>ดวงจิต</b> ติดตัว จอบ เทียน แมว หรือมังกร ทุกสิบระดับต้องออกล่าสัตว์อสูรมาหลอม <b>วงแหวนวิญญาณ</b> ยิ่งแก่ยิ่งแรง แต่ถ้าเกินขีดร่างกายอาจแตกสลาย ไต่ให้ถึง <b>ผู้ครองดวงจิต</b>',[['ดวงจิต 40 แบบ','g'],['วงแหวน 9 วง','g'],['หลอมเกินขีด = เสี่ยงตาย','r']]];
 const add=()=>{const sg=document.querySelector('.seg[data-k="chm"]');if(!sg||sg.querySelector('[data-v="'+ix+'"]'))return;const b=document.createElement('button');b.dataset.v=String(ix);b.textContent='⭕ จิตวิญญาณยุทธ์';sg.appendChild(b);b.onclick=()=>{sg.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');CFG.chm=ix;updateHints()};sg.classList.add('seg5');if(CFG.chm===ix)b.classList.add('on')};add();setTimeout(add,1500);
 if(typeof QM_CH!=='undefined'&&QM_CH.length===ix)QM_CH.push(['⭕','จิตวิญญาณยุทธ์']);
 if(typeof MODE_I!=='undefined')MODE_I.soul={ic:'⭕',n:'จิตวิญญาณยุทธ์',c:'#8a5ad8',chm:ix,p:'ปลุกดวงจิตตอนหกขวบ ล่าสัตว์อสูรหลอมวงแหวน ไต่ถึงผู้ครองดวงจิต'};
 const _cs=chStart;chStart=function(){const r=_cs.apply(this,arguments);try{if(S.ch==='soul'){svInit();log('⭕ <b>ทวีปจิตวิญญาณยุทธ์</b> ที่นี่ทุกคนจะได้ปลุกดวงจิตตอนอายุหกขวบ บางคนได้ดาบ บางคนได้จอบ และไม่มีใครรู้ว่าอะไรซ่อนอยู่ข้างใน','myth',true)}}catch(e){}return r}}catch(e){console.error('sv reg',e)}
window._blk34={SP,BEAST,TIER,RANK,awaken,svYear,hunt,absorb,spNow,capOf};
})()}catch(e){console.error('block34',e)}
__done=1;SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};SL.impl.lifeDetail=lifeDetail;lifeDetail=function(){return globalThis.lifeDetail.apply(this,arguments)};SL.impl.chStart=chStart;chStart=function(){return globalThis.chStart.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};SL.impl.openSoulBook=openSoulBook;openSoulBook=function(){return globalThis.openSoulBook.apply(this,arguments)};})();

// ---- ท่อน soul2 (เดิมอยู่ app.js บรรทัด 32775) · ห่อ: fight, duel, passYear ----
(function(){const SL=globalThis.__wSlots['soul2'];let fight=SL.base.fight;let duel=SL.base.duel;let passYear=SL.base.passYear;
try{(()=>{
const B=window._blk34;if(!B||typeof EVENTS==='undefined')return;
const {SP,BEAST,TIER,spNow,capOf}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv);
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU);
const A1=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1);
const A2=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===2);
const X=()=>{const g=S.sv;g.f=g.f||{};if(g.bond==null)g.bond=50;g.q=g.q||[];g.spared=g.spared||[];g.kill=g.kill||0;return g};
const F=k=>X().f[k];
const mark=k=>{X().f[k]=S.age};
const gap=(k,n)=>F(k)!=null&&S.age-F(k)>=n;
const no=k=>F(k)==null;
const act=g=>(g.dorm&&g.sp.length>1)?g.sp.slice(0,1):g.sp;
const tp=k=>{const g=S&&S.sv;return!!(g&&g.aw===1&&(act(g).some(s=>spNow(s).t===k)||(window._svTy&&window._svTy(g)===k)))};
const main=()=>{const g=S.sv;return g&&g.sp.length?spNow(g.sp[0]):null};
const nm=()=>{const g=S.sv,p=main();if(!p)return'ดวงจิต';return g.fused&&g.sp[1]?`${p.n}×${spNow(g.sp[1]).n}`:p.n};
const ic=()=>{const p=main();return p?p.ic:'⭕'};
const HP=p=>{const d=Math.round(S.maxHp*p/100);S.hp=Math.max(1,S.hp-d);return d};
const heal=p=>{S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*p/100))};
const bond=d=>{const g=X();g.bond=cl(g.bond+d,0,100)};
const O=(t,s,f)=>({t,s,f});
const ev=(w,cd,c,f,once)=>EVENTS.push({w,cd,once:once?1:0,c:s=>{try{return!!c(s)}catch(e){return false}},f(){try{f()}catch(e){console.error('sv2 ev',e)}}});
const nmP=()=>anyName(Math.random()<.5?'ชาย':'หญิง');
const TY={atk:'⚔️ สายโจมตี',def:'🛡️ สายป้องกัน',sup:'🌿 สายสนับสนุน',ctrl:'🌀 สายควบคุม',agi:'💨 สายว่องไว'};

// =================== 1) สายมีผลจริง + ท่าวงแหวน ===================
const RF=[.01,.015,.025,.035,.05,.08,.11,.15,.2];
const ringOne=t=>RF[t]*(tp('atk')?2:1)*(S.sv.fused?1.2:1);
function ringF(){const g=S&&S.sv;if(!g||g.aw!==1||g.retired)return 0;let v=g.rings.reduce((a,r)=>a+ringOne(r.slp?Math.max(0,(r.t|0)-3):r.t)*(r.seal?.5:1),0);if(g.bond>=80)v+=.03;if(g.pet)v+=.05;if(g.mate&&g.mate.alive)v+=.04;return cl(v,0,g.rings.some(r=>r.t>=5&&!r.slp)?.6:.4)}
let inDuel=0;
{const _f=fight;fight=function(n,ep){try{if(!inDuel&&on())ep=ep*(1-ringF())}catch(e){}return _f.call(this,n,ep)}}
{const _d=duel;duel=function(n,ep,cb){try{if(on())ep=ep*(1-ringF())}catch(e){}inDuel=1;try{return _d.call(this,n,ep,cb)}finally{inDuel=0}}}
const EFX={atk:'วงแหวนกดพลังศัตรูได้ 2 เท่า',def:'หลอมเกินขีดเสี่ยงน้อยลง · ล่าพลาดเจ็บครึ่งเดียว',sup:'ฟื้นพลังชีวิต 8% ทุกปี · สยบสัตว์ง่ายขึ้น',ctrl:'สยบสัตว์อสูรง่ายขึ้นมาก · มีทางเลือกพิเศษในเหตุการณ์',agi:'รอดตายจากวงแหวนระเบิดได้หนึ่งครั้ง · ล่าพลาดแทบไม่เจ็บ'};
// ตะขอที่ Block 34 เรียก
window._svGrow=g=>{if(g.retired)return 0;let m=1;const b=g.bond==null?50:g.bond;if(b>=80)m*=1.2;else if(b<=20)m*=.6;if(g.acad)m*=1.2;if(g.fused)m*=1.3;if(g.sp.length>1&&!g.dual&&S.age>=12)m*=.8;if(g.job)m*=.9;return m};
window._svRisk=(g,t,over)=>(tp('def')?.12:0)+((g.bond||50)>=80?.06:0)+(g.theory?.08:0);
window._svDodge=g=>{if(tp('agi')&&!g.dodged){g.dodged=1;log(`💨 วินาทีที่วงแหวนระเบิด <b>${nm()}</b> ลากคุณหลุดออกมาจากกลางแรงระเบิด รอดตายได้ครั้งเดียวในชีวิต`,'myth',true);return true}
 if((g.bond||0)>=95&&!g.sac){g.sac=1;g.bond=60;log(`${ic()} <b>${nm()}</b> เอาตัวเข้ารับพลังที่ทะลักแทนคุณ มันเงียบไปทั้งปี… แต่คุณยังมีชีวิตอยู่`,'myth',true);return true}return false};
window._svHurt=()=>Math.min(tp('agi')?.4:1,tp('def')?.5:1,tp('sup')?.6:1);
window._svFail=g=>{if(Math.random()>=.04)return false;g.aw=2;g.sp=[];g.lv=0;X().q.push('np');
 log('🌑 <b>ลูกแก้วทั้งหกไม่เรืองแสง</b> ผู้ปลุกจิตลองซ้ำสามรอบ แล้วส่ายหน้า คุณคือหนึ่งในร้อยที่ <b>ไร้ดวงจิต</b>','myth',true);return true};

// =================== 3) ทางเลือกนอกการฆ่า ===================
const tameP=s=>cl(.3+(tp('ctrl')?.25:0)+(tp('sup')?.1:0)+(X().bond-50)/250+(S.karma>50?.05:0)-s*.04,.1,.8);
function giftRing(t,n,sk,mult){const g=X();if(g.rings.length>=9)return;g.rings.push({t,b:n,sk});g.lv=Math.min(100,g.lv+1);
 S.power+=pctPow([.03,.06,.1,.16,.25,.4,.6,.85,1.2][t]*(mult||1));S.fame+=[2,6,15,40,100,300,800,2000,5000][t];if(t>=2)S.maxHp+=[0,0,15,30,60,120,200,320,500][t];
 try{const RB=LS.get('murim_svring',{})||{};RB[n]=Math.max(RB[n]||0,t+1);LS.set('murim_svring',RB)}catch(e){}
 log(`${TIER[t][1]} <b>หลอมวงแหวนวงที่ ${g.rings.length} สำเร็จ</b> — ${TIER[t][0]}ของ${esc(n)} · ได้ท่า <b>「${nm()}·${esc(sk)}」</b>`,t>=3?'myth':'epic',true)}
window._svHuntX=(g0,i,safe,opts)=>{const g=X(),st=Math.min(3,safe),b=ch(BEAST[st]),p=tameP(st);
 if(!g.pet&&S.age>=10)opts.push(O(`🤝 สยบ${b[0]}ให้เชื่อง`,`ได้สัตว์คู่ใจแทนวงแหวน (สำเร็จราว ${Math.round(p*100)}%)`,()=>{if(Math.random()<p){g.pet={n:b[0],t:st,y:0};S.karma+=5;log(`🤝 ${b[0]}ก้มหัวลงแตะมือคุณ จากนี้มันคือ <b>สัตว์คู่ใจ</b> ช่วยคุณรบ และวันหนึ่งอาจมอบวงแหวนให้ด้วยใจ`,'epic',true)}else{HP(12);log(`🩸 ${b[0]}ไม่ยอมให้ใครสยบ มันฝากรอยเขี้ยวไว้แล้ววิ่งหายเข้าป่า`,'bad')}}));
 const pr=[300,1200,5000,20000,60000][safe]||60000;
 if(S.money>=pr)opts.push(O(`💰 ซื้อวงแหวนจากตลาดมืด (${fmt(pr)} ตำลึง)`,'ไม่ต้องล่า · อาจเป็นของปลอม · แรงน้อยกว่าวงแหวนที่ล่าเอง',()=>{S.money-=pr;const fake=Math.random()<cl(.35-(S.int||0)/600,.1,.35);
  if(fake){HP(20);g.f.scammed=S.age;log('💸 วงแหวนที่ซื้อมาเป็นหินย้อมสีห่อพลังจิตบางๆ หลอมไปได้ครึ่งทางก็แตกคามือ เงินหายและเส้นจิตช้ำ','bad',true)}
  else{S.karma-=4;giftRing(st,'วงแหวนไร้นาม','เงาที่ซื้อมา',.7);log('🕳️ ไม่มีใครรู้ว่าสัตว์ตัวนั้นตายยังไง และคุณก็ไม่ได้ถาม','')}}))};
window._svWin=(t,b,go)=>{if(t<1||!on())return go();
 choice(`🏹 ${b[0]}ล้มลงตรงหน้า`,`${b[0]}${TIER[t][0]}หายใจรวยริน ดวงตาของมันจ้องคุณ วงแหวนสีจางๆ เริ่มลอยขึ้นจากร่าง รอให้คุณดูดซับ`,[
  O('⭕ ดูดซับวงแหวน','ไปต่อบนเส้นทางผู้ฝึกจิต',()=>{if(t>=2)X().kill++;go()}),
  O('🕊️ ไว้ชีวิตมัน','กรรม + · ยังติดคอขวด · มันอาจจำคุณได้',()=>{const g=X();S.karma+=8;g.spared.push({n:b[0],t,a:S.age});log(`🕊️ คุณลดอาวุธลง ${b[0]}ลุกขึ้นช้าๆ จ้องคุณครู่หนึ่ง แล้วหายเข้าไปในป่าลึก`,'good',true)})])};

// =================== คิวเหตุการณ์ที่ต้องเกิดแน่ๆ ===================
const NP={smith:['⚒️','ช่างตีอาวุธให้ผู้ฝึกจิต',['เด็กฝึกงาน','ช่างฝีมือ','ช่างใหญ่ประจำเมือง','ปรมาจารย์ช่าง','ช่างผู้หลอมอาวุธเทพ'],'S.fame'],
 doc:['🌿','หมอรักษาเส้นจิต',['เด็กเก็บยา','หมอฝึกหัด','หมอประจำศาลา','หมอเทวดา','ผู้ต่อเส้นจิตที่แตกได้'],'S.karma'],
 trade:['💰','พ่อค้าของผู้ฝึกจิต',['เด็กขายของ','พ่อค้าเร่','เจ้าของร้าน','นายห้างใหญ่','ผู้ถือเส้นทางการค้าทั้งทวีป'],'S.money'],
 sch:['📚','นักวิชาการดวงจิต',['ลูกศิษย์อาลักษณ์','ผู้คัดตำรา','อาจารย์','ปราชญ์','ผู้เขียนตำราที่เปลี่ยนทวีป'],'S.int']};
const npRank=g=>NP[g.np.k][2][cl(Math.floor(g.np.x/12),0,4)];
const Q={
 np(){const g=X();choice('🌑 ไร้ดวงจิต',`เด็กคนอื่นวิ่งกลับบ้านพร้อมดวงจิตในมือ มีแต่คุณที่มือเปล่า แม่กอดคุณแน่นตลอดทางกลับ<br><br>ทวีปนี้ไม่ได้เหลือที่ให้คนไร้ดวงจิตมากนัก แต่ก็ยังเหลืออยู่ <span class="tag2">(ไม่มีทางได้ดวงจิตทีหลัง)</span>`,[
  ...Object.entries(NP).map(([k,v])=>O(`${v[0]} ${v[1]}`,'เส้นทางของคนไร้ดวงจิต',()=>{g.np={k,x:0};log(`${v[0]} คุณตัดสินใจเป็น <b>${v[1]}</b> ถ้าถือดวงจิตไม่ได้ ก็จะเป็นคนที่ผู้ถือดวงจิตต้องพึ่ง`,'epic',true)})),
  O('🌾 ใช้ชีวิตเรียบง่าย','ไม่ไล่ตามอะไร · ใจสงบกว่า',()=>{g.np={k:null,x:0};joy(10);log('🌾 คุณช่วยพ่อทำนา ไม่มีใครถามเรื่องดวงจิตอีก และคุณก็ไม่ได้อยากให้ถาม','',true)})])},
 dual(){const g=X(),a=spNow(g.sp[0]).n,b=spNow(g.sp[1]).n;choice('🌀 ดวงจิตทั้งสองแย่งร่าง',`ตั้งแต่อายุสิบสอง <b>${a}</b> กับ <b>${b}</b> เริ่มดึงพลังจิตไปคนละทาง กลางคืนคุณฝันว่าตัวเองถูกฉีกเป็นสองซีก ผู้ปลุกจิตบอกว่าต้องตัดสินใจก่อนร่างจะรับไม่ไหว`,[
  O(`🔒 กด${b}ให้หลับ`,'ปลอดภัย · ใช้ได้แค่ดวงแรก',()=>{g.dual='dorm';g.dorm=1;log(`🔒 ${b}หลับลึกอยู่ในฝ่ามือซ้าย บางคืนคุณยังได้ยินมันหายใจ`,'',true)}),
  O('🔥 หลอมรวมเป็นดวงเดียว',`สำเร็จราว ${Math.round((.45+g.bond/400)*100)}% · พลาด = บาดเจ็บถาวร`,()=>{if(Math.random()<.45+g.bond/400){g.dual='fuse';g.fused=1;S.power+=pctPow(.15);S.fame+=60;log(`🔥 <b>${a}×${b}</b> ดวงจิตหลอมรวมที่ไม่เคยมีบันทึกในทวีป ฝึกเร็วขึ้น วงแหวนแรงขึ้น`,'myth',true)}else{S.maxHp=Math.max(30,Math.round(S.maxHp*.8));HP(40);g.dual='dorm';g.dorm=1;log(`💥 การหลอมล้มเหลว ${b}ถอยกลับไปหลับลึก ทิ้งรอยร้าวในเส้นจิต (พลังชีวิตสูงสุด −20%)`,'bad',true)}}),
  O(`✂️ ปล่อย${b}ไป`,'เสียดวงจิตหนึ่งดวง · จิตนิ่ง ฝึกเร็วขึ้นทันที',()=>{g.sp.pop();g.dual='cut';g.lv=Math.min(capOf(g),g.lv+5);S.maxHp+=20;joy(-8);log(`✂️ ${b}ค่อยๆ จางหายจากฝ่ามือ คุณร้องไห้ทั้งคืนโดยไม่รู้ว่าทำไม แต่เช้าวันต่อมาจิตใจนิ่งที่สุดในชีวิต`,'epic',true)})])},
 gift(){const g=X(),p=g.pet;if(!p)return;const t=Math.min(4,p.t+1);choice('🐾 ของขวัญจากสัตว์คู่ใจ',`${p.n}ที่อยู่กับคุณมา ${p.y} ปีแก่ตัวลงแล้ว คืนนี้มันวางหัวลงบนตักคุณ แล้วปล่อยวงแหวนของตัวเองออกมา <b>ด้วยความเต็มใจ</b>`,[
  O('⭕ รับวงแหวนที่มันมอบให้',`วงแหวน${TIER[t][0]} · ไม่มีความเสี่ยงเลย`,()=>{giftRing(t,p.n,'ใจภักดี');g.pet=null;bond(10);log(`🐾 ${p.n}หลับตาลงอย่างสงบในอ้อมแขนคุณ`,'epic',true)}),
  O('🌳 พามันกลับไปตายในป่าที่เกิด','กรรม + · ไม่ได้วงแหวน',()=>{S.karma+=12;joy(5);g.pet=null;log(`🌳 คุณเดินไปส่ง${p.n}ถึงต้นไม้ที่เจอกันครั้งแรก มันไม่หันกลับมา`,'good',true)})])},
 end(){const g=X();choice('⭕ ปลายทางของผู้ครองดวงจิต',`วงแหวนเก้าวงหมุนรอบตัวคุณ ทั้งทวีปเหลือคนที่ยืนระดับเดียวกันได้ไม่ถึงสิบคน มีเสียงหนึ่งดังมาจากฟ้า และอีกเสียงดังมาจากในใจ`,[
  O('🌟 มุ่งสู่ประตูเทวา','ฝึกต่อจนระดับจิต 100 · ประตูเทวาจะเปิดให้ทดสอบ 3 บท · ผ่าน = เป็นเทพอมตะ',()=>{g.endq=0;g.endWait=S.age+5;log('🌟 คุณตั้งใจไปให้ถึงประตูเทวา เมื่อระดับจิตถึง 100 แสงจากเหนือฟ้าจะลงมาเรียก','epic',true)}),
  O('💔 ทุบวงแหวนทิ้งทั้งเก้าวง','เลิกเป็นผู้ฝึกจิต · พลังลด อายุยืนขึ้น ใจเบาลง',()=>{g.retired=1;g.lock=g.lv;S.power=Math.round(S.power*.6);S.lifespan+=25;S.karma+=20;joy(25);log(`💔 วงแหวนเก้าวงแตกเป็นผงแสง ปลิวกลับไปหาป่าที่มันจากมา คุณกลับไปทำสิ่งที่${main().n}เคยทำตอนคุณหกขวบ`,'myth',true)}),
  O('📜 ถ่ายทอดให้ลูกศิษย์','พลังลด ชื่อเสียงยืนยาว · ชีวิตถัดไปในทวีปนี้ได้มรดก',()=>{LS.set('murim_svlegacy',{n:S.name});S.power=Math.round(S.power*.8);S.fame+=250;g.heir=1;log(`📜 คุณถ่ายพลังวงแหวนส่วนหนึ่งให้ลูกศิษย์ ร่องรอยของมันจะติดไปถึงผู้ฝึกจิตรุ่นหลัง`,'myth',true)}),
  O('⏳ ยังไม่ตัดสินใจ','ถามใหม่อีกห้าปี',()=>{g.endq=0;g.endWait=S.age+5})])}};
setInterval(()=>{try{if(!on()||!free())return;const g=X();if(!g.q.length)return;const k=g.q.shift();if(Q[k])Q[k]()}catch(e){console.error('sv2 q',e)}},900);

// =================== รายปี ===================
const JOBS={hoe:['ไถนาให้ทั้งหมู่บ้าน',40,90],candle:['จุดไฟให้ตลาดกลางคืน',30,80],ladle:['เปิดร้านข้าวต้ม',60,140],needle:['รับเย็บชุดให้ผู้ฝึกจิต',50,120],broom:['ดูแลลานวัดใหญ่',20,50],rope:['ลากซุงให้โรงเลื่อย',40,90],crow:['ส่งจดหมายข้ามเมือง',40,100],cat:['จับหนูในโกดังหลวง',30,70],frog:['ขนของข้ามบึง',20,60],lotus:['ปลูกบัวขายตลาด',30,70],rain:['เรียกฝนให้ไร่อ้อย',60,150],stone:['ก่อกำแพงเมือง',40,90],bamboo:['สร้างสะพานไผ่',40,90],reed:['ทำขลุ่ยขาย',20,60],shadow:['สืบข่าวให้ร้านน้ำชา',60,140]};
const JOBT={atk:['คุ้มกันกองคาราวาน',80,180],def:['เฝ้าประตูเมือง',50,110],sup:['ผู้ช่วยหมอ',50,120],ctrl:['จับสัตว์อสูรส่งสวนหลวง',70,160],agi:['ผู้ส่งสารด่วน',60,130]};
function npYear(g){if(!g.np||!g.np.k)return;const b=g.np.x;g.np.x+=R(1,3)+(S.int>80?1:0);const lv=cl(Math.floor(g.np.x/12),0,4),k=g.np.k;
 if(k==='smith'){S.money+=inc(R(20,50)*(lv+1));S.fame+=lv}else if(k==='doc'){S.karma+=1;S.money+=inc(R(10,30)*(lv+1));heal(5)}else if(k==='trade'){S.money+=inc(R(40,90)*(lv+1))}else if(k==='sch'){S.int+=1+lv;S.fame+=lv>=3?2:0}
 if(Math.floor(g.np.x/12)>Math.floor(b/12)&&lv<=4)log(`${NP[k][0]} <b>เลื่อนเป็น${NP[k][2][lv]}</b> — ${lv>=4?'ผู้ฝึกจิตระดับราชันยังต้องมาต่อคิว':'งานของคนไร้ดวงจิตที่ไม่มีใครกล้าดูถูกอีก'}`,lv>=4?'myth':'epic',true)}
function yr(){const g=X();
 if(g.aw===2){npYear(g);return}if(g.aw!==1)return;
 if(g.retired&&g.lock!=null)g.lv=g.lock;
 if(!g.lgc){g.lgc=1;const L=LS.get('murim_svlegacy',null);if(L&&L.n){LS.del('murim_svlegacy');g.lv=Math.min(capOf(g),g.lv+3);S.fame+=30;log(`📜 ผู้ปลุกจิตเห็น <b>ร่องรอยวงแหวนของ${esc(L.n)}</b> ในดวงจิตคุณ มรดกจากผู้ฝึกจิตรุ่นก่อน (ระดับจิต +3)`,'myth',true)}}
 if(tp('sup'))heal(8);
 if(g.job)S.money+=inc(R(g.job.lo,g.job.hi));
 if(g.sp.length>1&&!g.dual&&S.age>=12){if(!g.dq){g.dq=1;g.q.push('dual')}else if(Math.random()<.35){HP(8);log('🌀 ดวงจิตทั้งสองแย่งร่างกันอีกแล้ว ปวดหัวจนลุกไม่ขึ้นหลายวัน','bad')}}
 if(g.pet){g.pet.y++;if(!g.pet.gift&&g.pet.y>=6&&g.rings.length<9&&Math.random()<.35){g.pet.gift=1;g.q.push('gift')}}
 if(g.rings.length>=9&&g.lv>=95&&!g.endq&&!g.retired&&!g.god&&!g.heir&&S.age>=(g.endWait||0)){g.endq=1;g.q.push('end')}}
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(on())yr()}catch(e){console.error('sv2 year',e)}return r}}

// =================== 2) เหตุการณ์เฉพาะทวีป ===================
// --- ดวงจิตขยะ / แก้แค้น ---
ev(5,0,s=>A1(s)&&s.age>=7&&s.age<=13&&no('bully')&&main().r===0,()=>{const g=X(),by=ch(['ลูกชายผู้ใหญ่บ้าน','เด็กที่ได้ดวงจิตหมาป่า','หลานเจ้าสำนักในเมือง']);g.bullyN=by;mark('bully');
 choice('😤 "ดวงจิตขยะ!"',`${by}กับพวกล้อมคุณไว้หลังลานฝึก "ได้${nm()}เนี่ยนะ? เอาไว้ทำอะไร ทำนาเหรอ" ทุกคนหัวเราะ`,[
  O('👊 สู้','เสี่ยงเจ็บ',()=>{if(fight(by,total()*1.1)){S.fame+=5;log(`👊 ${by}ล้มก้นจ้ำเบ้า ไม่มีใครหัวเราะอีก`,'good')}else log('🩸 โดนรุมจนเลือดกำเดาไหล แต่คุณไม่ร้องไห้','bad')}),
  O('😶 เดินผ่านไป','จำไว้ในใจ',()=>{joy(-5);log(`😶 คุณกำ${nm()}ไว้แน่นจนมือสั่น แล้วเดินกลับบ้าน`)}),
  (tp('ctrl')||tp('agi'))?O(`${ic()} ใช้ดวงจิตแกล้งกลับเงียบๆ`,'สายควบคุม/ว่องไว',()=>{S.cha+=2;joy(4);log(`${ic()} เช้าวันต่อมา ${by}ตื่นมาพบว่ารองเท้าตัวเองไปอยู่บนหลังคาศาลา ไม่มีใครรู้ว่าใครทำ`,'good')}):null].filter(Boolean))},1);
ev(8,0,s=>A1(s)&&F('bully')!=null&&no('bully2')&&s.sv.sp.some(x=>x.rev),()=>{const g=X(),by=g.bullyN||'เด็กคนนั้น';mark('bully2');
 choice('🌋 คนที่เคยหัวเราะ',`ข่าวที่${nm()}แตกเปลือกลือไปทั้งเมือง วันหนึ่ง${by}ยืนอยู่หน้าบ้านคุณ หน้าซีด มือถือของฝาก`,[
  O('🤝 ให้อภัย','กรรม + · ได้คนรู้จักที่ภักดี',()=>{S.karma+=10;g.ally=by;log(`🤝 ${by}ร้องไห้ คุณรู้แค่ว่าตั้งแต่วันนั้นเขาจะยืนข้างคุณเสมอ`,'epic',true)}),
  O('📣 ทวงคืนต่อหน้าทุกคน','ชื่อเสียง + · กรรม −',()=>{S.fame+=30;S.karma-=6;log(`📣 คุณให้${by}ก้มหัวกลางลานฝึก ทุกคนเงียบ รวมถึงคนที่เคยหัวเราะด้วย`,'epic',true)}),
  O('🙂 ยิ้มแล้วปิดประตู','ไม่ติดค้างอะไรกัน',()=>{joy(6);log('🙂 คุณไม่ได้โกรธแล้ว แค่ไม่อยากคุยด้วย')})])},1);
// --- สถาบัน · ทะเบียน · หนี้ ---
ev(5,0,s=>A1(s)&&s.age>=12&&s.age<=16&&no('acad'),()=>{const g=X(),fee=400;mark('acad');
 choice('🏫 สถาบันจิตยุทธ์เปิดรับนักเรียน','สถาบันในเมืองหลวงรับปีละร้อยคน มีที่นั่งทุนสิบที่ ค่าเล่าเรียนแพงจนพ่อแม่เงียบไปทั้งมื้อ',[
  O('📝 สอบชิงทุน','ต้องชนะการประลอง',()=>{if(fight('ผู้สมัครคู่แข่ง',total()*1.05)){g.acad=1;S.fame+=15;log('🏫 คุณได้ที่นั่งทุน ฝึกเร็วขึ้นตลอดชีวิต','epic',true)}else{joy(-6);log('📝 แพ้คะแนนไปนิดเดียว คุณกลับบ้านพร้อมชื่อของคนที่ชนะ','bad')}}),
  S.money>=fee?O(`💰 จ่ายค่าเล่าเรียน (${fee} ตำลึง)`,'ฝึกเร็วขึ้น',()=>{S.money-=fee;g.acad=1;log('🏫 คุณได้เข้าสถาบัน แต่พ่อขายควายไปตัวหนึ่ง','good',true)}):null,
  O('🏡 ฝึกเองที่บ้าน','ปัญญา + · ประหยัด',()=>{S.int+=4;log(`🏡 คุณอ่านตำราที่ยืมมาจนขาด แล้วฝึกกับ${nm()}ในทุ่ง`)})].filter(Boolean))},1);
ev(3,10,s=>A1(s)&&s.age>=16&&s.sv.lv>=20&&!s.sv.retired,()=>{const g=X(),fee=R(100,250)*(g.rings.length+1);
 choice('📜 ศาลาดวงจิตเก็บค่าขึ้นทะเบียน',`เจ้าหน้าที่ศาลาเคาะประตู "ผู้ฝึกจิตระดับ ${g.lv} ต้องขึ้นทะเบียนทุกสิบปี ค่าธรรมเนียม ${fmt(fee)} ตำลึง"`,[
  S.money>=fee?O('💰 จ่าย','ชื่อเสียง +',()=>{S.money-=fee;S.fame+=8;log('📜 ชื่อคุณอยู่ในทะเบียนศาลาแล้ว')}):null,
  O('🙅 ไม่จ่าย','อาจโดนตามล่า',()=>{mark('unreg');log('🙅 คุณปิดประตูใส่หน้าเจ้าหน้าที่','bad')})].filter(Boolean))});
ev(6,0,s=>A1(s)&&gap('unreg',3)&&no('unreg2'),()=>{mark('unreg2');const g=X();
 choice('⚖️ ศาลาส่งคนมาจับ','ผู้ฝึกจิตสามคนในชุดศาลาล้อมบ้านคุณ "ผู้ฝึกจิตเถื่อน ต้องไปรับโทษ"',[
  O('⚔️ สู้','',()=>{if(fight('ผู้คุมศาลาดวงจิต',total()*1.2)){S.fame+=20;S.karma-=5;log('⚔️ ทั้งสามถอยกลับไปพร้อมรอยช้ำ ตอนนี้คุณเป็นคนที่ศาลาจำชื่อได้','epic',true)}else{S.money=Math.round(S.money*.6);log('⛓️ คุณถูกคุมตัวไปสามเดือน และต้องจ่ายค่าปรับก้อนใหญ่','bad',true)}}),
  O('💰 ยอมจ่ายค่าปรับสองเท่า','',()=>{S.money=Math.round(S.money*.75);log('💰 จ่ายไปจนกระเป๋าแฟบ','bad')}),
  tp('agi')?O('💨 หนีข้ามแคว้น','สายว่องไว',()=>{S.fame-=5;log('💨 คืนนั้นคุณอยู่อีกแคว้นแล้ว ศาลาแห่งนั้นตามคุณไม่เจออีกเลย','good')}):null].filter(Boolean))},1);
ev(3,0,s=>A1(s)&&s.age>=10&&s.age<=25&&no('loan')&&s.money<300,()=>{const g=X(),a=R(300,700);
 choice('🪙 เงินกู้ซื้ออุปกรณ์ล่า','ร้านใต้สะพานปล่อยกู้ให้ผู้ฝึกจิตหนุ่มสาว "ชุดเกราะดีๆ ช่วยให้รอดจากเขี้ยวสัตว์อสูรนะ ดอกแค่นิดเดียว"',[
  O(`💰 กู้ ${a} ตำลึง`,'ได้เงินก้อน · ต้องคืนเป็นสองเท่า',()=>{mark('loan');S.money+=a;g.loan=a*2;log(`🪙 คุณเซ็นชื่อลงในสมุดเล่มหนา`)}),
  O('🙅 ไม่กู้','',()=>{S.int+=1;log('🙅 คุณเห็นแววตาของคนที่นั่งรอคิวอยู่หน้าร้าน แล้วตัดสินใจเดินกลับ')})])},1);
ev(7,0,s=>A1(s)&&gap('loan',3)&&no('loan2'),()=>{const g=X(),a=g.loan||600;mark('loan2');
 choice('👊 คนทวงหนี้มาถึงบ้าน',`ชายร่างใหญ่ที่มีดวงจิตเป็นกระบองหนามยืนขวางประตู "${fmt(a)} ตำลึง วันนี้"`,[
  S.money>=a?O('💰 จ่ายให้จบ','',()=>{S.money-=a;g.loan=0;log('💰 หนี้หมดแล้ว ปีนี้นอนหลับสนิทที่สุด','good')}):null,
  O('⚔️ ไล่ไป','',()=>{if(fight('นักทวงหนี้ดวงจิตกระบอง',total()*1.15)){g.loan=0;S.karma-=3;log('⚔️ เขาไม่กลับมาอีก แต่เจ้าของร้านใต้สะพานจำชื่อคุณได้แล้ว','')}else{HP(20);S.money=Math.round(S.money*.5);log('🩸 คุณถูกซ้อม และของมีค่าในบ้านหายไปครึ่งหนึ่ง','bad',true)}}),
  O('🔨 ขอทำงานใช้หนี้','เสียเวลาฝึกหนึ่งปี',()=>{g.loan=0;g.lv=Math.max(1,g.lv-2);S.cha+=2;log('🔨 คุณยกของในโกดังของเขาทั้งปี ได้เพื่อนเป็นคนแบกของมาสามคน','')})].filter(Boolean))},1);
// --- ใช้ดวงจิตทำมาหากิน ---
ev(4,12,s=>A1(s)&&s.age>=13&&!s.sv.job&&!s.sv.retired,()=>{const g=X(),p=main(),j=JOBS[g.sp[0].rev?'':g.sp[0].id]||JOBT[p.t];
 choice('🧺 งานของคนมีดวงจิต',`ไม่มีใครบอกเด็กตอนปลุกจิตว่า ผู้ฝึกจิตส่วนใหญ่ในทวีปไม่ได้ออกล่าสัตว์ แต่ใช้ดวงจิตทำมาหากิน มีคนมาเสนองาน <b>${j[0]}</b> ให้คุณ เพราะ${nm()}ของคุณเหมาะพอดี`,[
  O('🧺 รับงาน',`ได้เงิน ${j[1]}–${j[2]} ตำลึงต่อปี · ฝึกช้าลงนิดหน่อย`,()=>{g.job={n:j[0],lo:j[1],hi:j[2]};mark('job');S.cha+=2;joy(5);log(`🧺 คุณเริ่ม${j[0]}ด้วย${nm()} คนในเมืองเริ่มรู้จักคุณจากงาน ไม่ใช่จากระดับจิต`,'good',true)}),
  O('⚔️ ไม่รับ จะฝึกอย่างเดียว','',()=>log('⚔️ คุณปฏิเสธ คนเสนองานยักไหล่ "ส่วนใหญ่ก็พูดแบบนี้ตอนอายุเท่าเธอ"'))])});
ev(4,0,s=>A1(s)&&s.sv.job&&gap('job',5)&&no('job2'),()=>{const g=X(),j=g.job;mark('job2');
 choice('🧺 งานเริ่มใหญ่กว่าที่คิด',`งาน${j.n}ของคุณขึ้นชื่อจนพ่อค้าจากเมืองหลวงมาขอร่วมหุ้น "ขยายเป็นสิบสาขา แต่คุณต้องดูแลเองทั้งหมด"`,[
  O('📈 ขยายกิจการ','เงินเยอะขึ้นมาก · เวลาฝึกน้อยลง',()=>{j.lo*=2;j.hi*=2;g.lv=Math.max(1,g.lv-2);S.fame+=10;log(`📈 ${j.n}ของคุณมีสาขาในสามเมือง`,'epic',true)}),
  O('🗡️ ยกงานให้คนอื่น กลับไปฝึก','ฝึกเต็มเวลาอีกครั้ง',()=>{g.job=null;S.karma+=4;log('🗡️ คุณยกงานให้ลูกมือที่ทำงานด้วยกันมาห้าปี แล้วกลับไปฝึกเต็มเวลา','')}),
  O('🙂 ทำต่อแบบเดิม','',()=>{joy(4);log('🙂 คุณบอกว่าแค่นี้ก็พอแล้ว')})])},1);
// --- ประลอง · เพื่อนร่วมทีม ---
ev(4,6,s=>A1(s)&&s.age>=14&&s.age<=24&&s.sv.lv>=15,()=>{const g=X(),foe=ch(['อัจฉริยะดวงจิตหงส์ไฟ','ลูกชายเจ้าศาลา','เด็กสาวดวงจิตเงา','ศิษย์สถาบันหลวง']);
 choice('🏟️ งานประลองจิตยุทธ์เยาวชน',`รอบชิงพบกับ<b>${foe}</b> คนดูหลายพันคน${g.rings.length?` วงแหวน ${g.rings.length} วงคุณสว่างขึ้นพร้อมกัน`:''}`,[
  O('⚔️ ลงประลอง','',()=>duel(foe,Math.round(total()*1.05),w=>{if(w){S.fame+=40;joy(8);log(`🏟️ <b>แชมป์ประลองเยาวชน</b> ท่า「${nm()}」ถูกพูดถึงไปทั้งเมือง`,'epic',true)}else{S.fame+=8;log('🏟️ แพ้ในรอบชิง แต่คนดูจำท่าสุดท้ายของคุณได้','')}})),
  O('🙇 สละสิทธิ์','',()=>{joy(-3);log('🙇 คุณดูรอบชิงจากอัฒจันทร์')})])});
ev(5,0,s=>A1(s)&&s.age>=13&&s.age<=25&&!s.sv.mate&&no('mate'),()=>{const g=X();mark('mate');const my=main().t;const L=Object.keys(TY).filter(k=>k!==my).sort(()=>Math.random()-.5).slice(0,3);
 choice('👥 หาเพื่อนร่วมทีมล่าวงแหวน','ผู้ฝึกจิตส่วนใหญ่ล่าเป็นทีม คนสามคนสนใจจะทีมกับคุณ แต่ละคนเติมสิ่งที่คุณขาดคนละแบบ',[
  ...L.map(k=>{const n=nmP();return O(`${TY[k]} — ${n}`,'ร่วมทีมระยะยาว',()=>{g.mate={n,t:k,alive:true};log(`👥 คุณกับ<b>${n}</b> (${TY[k]}) ตกลงเป็นทีมเดียวกัน ศัตรูอ่อนลงเมื่อสู้ด้วยกัน`,'good',true)})}),
  O('🚶 ล่าคนเดียว','',()=>log('🚶 คุณชอบเงียบมากกว่า'))])},1);
ev(5,0,s=>A1(s)&&s.sv.mate&&s.sv.mate.alive&&gap('mate',4)&&no('mate2'),()=>{const g=X(),m=g.mate;mark('mate2');
 choice('🆘 เพื่อนร่วมทีมขอความช่วยเหลือ',`${m.n}ติดคอขวด อยากล่าวงแหวนที่เกินขีดตัวเอง "ไปด้วยกันนะ ถ้าไม่มีเธอฉันไม่รอดแน่"`,[
  O('🏹 ไปด้วย','เสี่ยงเจ็บ',()=>{if(fight('สัตว์อสูรเกินขีด',total()*1.25)){S.karma+=5;m.debt=1;log(`🏹 ${m.n}หลอมวงแหวนสำเร็จ แล้วร้องไห้กอดคุณกลางป่า`,'epic',true)}else{HP(25);m.alive=false;joy(-20);log(`🩸 ${m.n}ไม่ได้กลับออกมาจากป่านั้น`,'bad',true)}}),
  O('🙅 ห้ามเขาไว้','',()=>{if(Math.random()<.5){g.mate=null;log(`🙅 ${m.n}ไปคนเดียว และไม่ได้คุยกับคุณอีก`,'bad')}else log(`🙅 ${m.n}โกรธอยู่สามวัน แล้วยอมรอไปอีกปี`)})])},1);
ev(4,0,s=>A1(s)&&s.sv.mate&&s.sv.mate.alive&&gap('mate',10)&&no('mate3'),()=>{const g=X(),m=g.mate;mark('mate3');const r=Math.random();
 if(r<.3){g.mate=null;S.money=Math.round(S.money*.7);log(`🗡️ <b>${m.n}หายไปพร้อมเงินกองกลางของทีม</b> สิบปีที่ล่าด้วยกันไม่ได้แปลว่ารู้จักกัน`,'bad',true);joy(-12);return}
 choice('💍 สิบปีกับเพื่อนร่วมทีม',`คืนหนึ่งหลังล่าเสร็จ ${m.n}นั่งข้างกองไฟนานกว่าปกติ "ฉันไม่อยากล่ากับใครอื่นอีกแล้ว ทั้งชีวิตเลย"`,[
  O('💍 ใช้ชีวิตด้วยกัน','',()=>{mark('married');g.spouse=m.n;joy(15);log(`💍 คุณกับ${m.n}แต่งงานกันในศาลาเล็กๆ กลางป่า`,'epic',true)}),
  O('🤝 เป็นทีมกันต่อ แค่นั้น','',()=>log(`🤝 ${m.n}พยักหน้า แล้วไม่พูดถึงเรื่องนี้อีก`))])},1);
// --- รักและลูก ---
ev(3,0,s=>A1(s)&&s.age>=18&&s.age<=35&&no('married')&&no('love'),()=>{mark('love');const n=nmP(),k=ch(Object.keys(TY));
 choice('🌸 คนที่ดวงจิตเข้ากัน',`ในงานเทศกาล <b>${n}</b> ผู้ถือดวงจิต${TY[k]} มาขอยืมไฟจาก${nm()}ของคุณ ดวงจิตทั้งสองสั่นพร้อมกันเหมือนรู้จักกันมาก่อน`,[
  O('💍 คบหาจนแต่งงาน','',()=>{mark('married');X().spouse=n;joy(12);log(`💍 คุณแต่งงานกับ${n}`,'epic',true)}),
  O('🙂 แค่เพื่อน','',()=>log('🙂 คุณส่งเขากลับบ้าน แล้วไม่เจอกันอีก'))])},1);
ev(6,0,s=>A1(s)&&gap('married',7)&&no('kid'),()=>{mark('kid');const p=SP[Math.floor(Math.random()*SP.length)],kn=nmP();
 choice('👶 ลูกถึงวัยปลุกจิต',`${kn}ลูกคุณอายุหกขวบ ในพิธีปลุก แสงพุ่งขึ้นจากฝ่ามือเล็กๆ <b>${p[1]} ${p[2]}</b>${p[5]===0?' เด็กคนอื่นหัวเราะ':p[5]>=2?' ทั้งลานเงียบกริบ':''}`,[
  O('🫂 "ดวงจิตอะไรก็ได้ พ่อแม่ภูมิใจ"','ลูกใจแข็ง',()=>{joy(8);S.karma+=5;log(`🫂 ${kn}หยุดร้องไห้ แล้วถือ${p[2]}เหมือนเป็นของมีค่าที่สุดในโลก`,'good',true)}),
  O('🔥 "เริ่มฝึกพรุ่งนี้ ตีห้า"','ลูกเก่งเร็ว แต่ห่างเหิน',()=>{S.fame+=10;joy(-4);log(`🔥 ${kn}ฝึกหนักกว่าเด็กทุกคน และเรียกคุณว่า "อาจารย์" แทน "พ่อแม่"`,'',true)})])},1);
// --- สืบทอดพิธีปลุก ---
ev(3,0,s=>A1(s)&&s.age>=30&&s.sv.lv>=30&&no('awk'),()=>{mark('awk');
 choice('🔮 ผู้ปลุกจิตชราขอให้สืบทอด','ผู้ปลุกจิตที่วางลูกแก้วรอบตัวคุณเมื่อหลายสิบปีก่อนเดินไม่ไหวแล้ว "เด็กในหมู่บ้านต้องมีคนปลุก รับลูกแก้วหกลูกนี้ไปได้ไหม"',[
  O('🔮 รับสืบทอด','ปลุกจิตให้เด็กทุกปี',()=>{g_awk();}),
  O('🙇 ปฏิเสธ','',()=>log('🙇 ปีต่อมาหมู่บ้านต้องพาเด็กเดินทางสามวันไปปลุกจิตที่เมือง'))])},1);
function g_awk(){const g=X();g.awk=1;S.karma+=8;S.fame+=10;log('🔮 ปีแรกที่คุณปลุกจิต เด็กผู้หญิงผอมๆ คนหนึ่งได้ <b>👤 เงาตัวเอง</b> ทุกคนหัวเราะ ยกเว้นคุณ','epic',true)}
ev(6,0,s=>A1(s)&&s.sv.awk&&gap('awk',12)&&no('awk2'),()=>{mark('awk2');S.fame+=60;S.karma+=10;joy(10);
 log('🌑 จ้าวจิตหญิงคนหนึ่งขี่ม้ามาถึงหมู่บ้าน เงาของเธอขยับก่อนตัวเธอครึ่งวินาที "ตอนหกขวบ ทุกคนหัวเราะ มีแต่ท่านที่บอกว่ามันมีอะไรซ่อนอยู่" เธอคุกเข่าให้คุณต่อหน้าทั้งหมู่บ้าน','myth',true)},1);
// --- ผลจากการไว้ชีวิต / ฆ่า ---
ev(8,8,s=>A1(s)&&s.sv.spared&&s.sv.spared.some(x=>!x.back&&s.age-x.a>=3),()=>{const g=X(),x=g.spared.find(y=>!y.back&&S.age-y.a>=3);x.back=1;const atCap=g.lv>=capOf(g)&&g.rings.length<9;
 choice(`🐾 ${x.n}กลับมา`,`คุณหลงป่าอยู่สามวัน ขาเจ็บ ไม่มีน้ำ แล้ว${x.n}ตัวที่คุณเคยไว้ชีวิตก็ก้าวออกมาจากพุ่มไม้ มันจำคุณได้`,[
  atCap?O('⭕ ยอมรับวงแหวนที่มันยื่นให้','มันเลือกมอบให้เอง · ไม่มีความเสี่ยง',()=>{giftRing(Math.min(4,x.t),x.n,'หนี้ชีวิต');S.karma+=5}):null,
  O('🫂 ให้มันพาออกจากป่า','ฟื้นพลังชีวิต · กรรม +',()=>{heal(50);S.karma+=6;log(`🫂 ${x.n}เดินนำคุณออกจากป่า แล้วหันหลังกลับไปโดยไม่รอคำขอบคุณ`,'epic',true)})].filter(Boolean))});
ev(6,8,s=>A1(s)&&s.sv.kill>=3,()=>{const g=X();
 choice('🐺 ป่าทั้งป่าจำคุณได้',`คุณฆ่าสัตว์อสูรอายุพันปีขึ้นไปมาแล้ว ${g.kill} ตัว คืนนี้เสียงหอนดังรอบหมู่บ้าน สัตว์อสูรทั้งเผ่ามาทวงคืน`,[
  O('⚔️ ออกไปสู้','',()=>duel('ฝูงสัตว์อสูรผู้ทวงแค้น',Math.round(total()*1.2),w=>{if(w){S.fame+=40;g.kill=Math.max(0,g.kill-2);log('⚔️ ฝูงสัตว์ถอยกลับเข้าป่า แต่ป่าไม่เคยลืม','epic',true)}else{HP(30);S.karma-=3;log('🔥 ไฟไหม้ไปสามหลังคาเรือน ชาวบ้านมองคุณด้วยสายตาอีกแบบ','bad',true)}})),
  (tp('ctrl')||tp('sup')||S.karma>=40)?O('🕊️ ออกไปคุยกับจ่าฝูง','สายควบคุม/สนับสนุน หรือกรรมดี',()=>{g.kill=0;S.karma+=15;log('🕊️ คุณวางวงแหวนแห่งความเคารพไว้หน้าป่า จ่าฝูงดมกลิ่นอยู่นาน แล้วพาฝูงกลับไป','myth',true)}):null,
  O('🏃 อพยพหนีไปอีกเมือง','',()=>{S.money=Math.round(S.money*.7);g.kill=Math.max(0,g.kill-1);joy(-6);log('🏃 คุณย้ายหนีกลางดึก ทิ้งบ้านไว้ข้างหลัง','bad')})].filter(Boolean))});
// --- 5) ดวงจิตมีนิสัย ---
const PER={atk:['ใจร้อน','"ไอ้คนนั้นมองเราแปลกๆ ไปท้าเลย!"','⚔️ ไปท้าตามที่มันขอ','🙅 "ไม่ใช่ตอนนี้"'],
 def:['ขี้กังวล','"ปีนี้อย่าออกไปไหนเลยนะ ข้ารู้สึกไม่ดี"','🏡 อยู่บ้านพักหนึ่งปี','🚪 "ไม่เป็นไรหรอก"'],
 sup:['ใจดี','"เด็กข้างทางนั่นป่วย ช่วยเขาหน่อยได้ไหม"','🌿 ช่วยรักษา','🚶 เดินผ่านไป'],
 ctrl:['เจ้าเล่ห์','"พ่อค้าคนนั้นโกงตาชั่ง ข้ามีวิธีเอาคืน…"','🌀 ทำตามแผนของมัน','🙅 "อย่าเลย"'],
 agi:['ซน','"เบื่อแล้ว! ไปดูทะเลกันเถอะ"','🌊 ออกเดินทาง','📚 "ฝึกก่อน"']};
ev(5,3,s=>A1(s)&&s.age>=8&&!s.sv.retired,()=>{const g=X(),p=main(),P=PER[p.t],first=!g.f.talk;mark('talk');
 choice(`${p.ic} ${nm()}กระซิบ`,`${first?`คืนหนึ่งคุณได้ยินเสียงในหัว ไม่ใช่ความคิดตัวเอง <b>${nm()}พูดได้</b> และนิสัย<b>${P[0]}</b><br><br>`:''}${P[1]}<br><span class="tag2">ใจของดวงจิต ${g.bond}/100 ใจตรงกันมาก ฝึกเร็วและหลอมวงแหวนปลอดภัยขึ้น</span>`,[
  O(P[2],'ใจของดวงจิต +',()=>{bond(12);const t=p.t;
   if(t==='atk'){if(fight('คนที่มันอยากให้ท้า',total()*1.1)){S.fame+=12;log(`${p.ic} ${nm()}สั่นด้วยความพอใจ`,'good')}else log(`${p.ic} แพ้ แต่${nm()}บอกว่า "สนุกดี"`,'')}
   else if(t==='def'){heal(40);g.lv=Math.max(1,g.lv-1);log(`${p.ic} ปีนั้นมีโจรปล้นทางที่คุณมักเดินผ่าน${nm()}ไม่พูดอะไร แต่คุณรู้สึกว่ามันยิ้ม`,'good')}
   else if(t==='sup'){S.karma+=6;S.money=Math.max(0,S.money-R(10,40));log(`${p.ic} เด็กหายป่วย แม่ของเขาเอาไข่มาให้ทุกเดือน`,'good')}
   else if(t==='ctrl'){S.money+=inc(R(60,160));S.karma-=3;log(`${p.ic} พ่อค้าคนนั้นไม่รู้ตัวเลยว่าตาชั่งตัวเองหมุนกลับด้าน`,'')}
   else{S.int+=3;joy(10);log(`${p.ic} คุณเห็นทะเลครั้งแรก ${nm()}วิ่งเล่นริมคลื่นทั้งวัน`,'good')}}),
  O(P[3],'ใจของดวงจิต −',()=>{bond(-10);log(`${p.ic} ${nm()}เงียบไปหลายวัน`)})])});
ev(7,5,s=>A1(s)&&s.sv.bond!=null&&s.sv.bond<=20,()=>{const g=X();
 choice(`😤 ${nm()}งอน`,`${nm()}ไม่ยอมออกมาจากฝ่ามือคุณมาสามเดือนแล้ว ระดับจิตแทบไม่ขยับ`,[
  O('🙏 ทำพิธีขอขมาดวงจิต','เสียเงิน · ใจดวงจิต ++',()=>{S.money=Math.max(0,S.money-R(50,150));bond(25);log(`🙏 คุณนั่งคุยกับ${nm()}ทั้งคืน ตอนเช้ามันออกมาเกาะไหล่คุณเหมือนตอนหกขวบ`,'good',true)}),
  O('😠 บังคับให้มันออกมา','พลัง + เล็กน้อย · ใจดวงจิต −',()=>{bond(-8);S.power+=pctPow(.02);log(`😠 ${nm()}ออกมา แต่ไม่ได้มองหน้าคุณ`,'bad')})])});
// --- วงแหวน · อันตรายของผู้ฝึกจิต ---
ev(3,8,s=>A1(s)&&s.sv.rings.length>=2&&!s.sv.retired,()=>{const g=X(),r=ch(g.rings);
 choice('🌙 ฝันของวงแหวน',`คืนเดือนมืด วงแหวน${TIER[r.t][0]}ของ${esc(r.b)}สั่น คุณฝันว่าตัวเองเป็นมัน วิ่งในป่ากับลูกตัวเล็กๆ จนถึงวันที่เจอคุณ`,[
  O('🕯️ จุดธูปให้มัน','กรรม + · ใจดวงจิต +',()=>{S.karma+=5;bond(6);log(`🕯️ วงแหวนของ${esc(r.b)}หยุดสั่น และสว่างขึ้นนิดหนึ่ง`,'good')}),
  O('😶 ช่างมัน','',()=>{joy(-3);log('😶 คุณตื่นมาพร้อมหมอนเปียก แต่ไม่ได้เล่าให้ใครฟัง')})])});
ev(4,10,s=>A1(s)&&s.sv.lv>=40&&!s.sv.retired,()=>{const g=X();
 choice('🦴 นักล่ากระดูกวิญญาณ','คนกลุ่มหนึ่งไม่ล่าสัตว์อสูร <b>พวกมันล่าผู้ฝึกจิต</b> เพื่อเอากระดูกที่ซึมวงแหวนไปขาย คืนนี้มันตามคุณมาถึงที่พัก',[
  O('⚔️ สู้','',()=>duel('นักล่ากระดูกวิญญาณ',Math.round(total()*1.15),w=>{if(w){S.fame+=30;S.money+=inc(R(200,600));log('⚔️ คุณยึดค่าหัวผู้ฝึกจิตที่พวกมันพกมาได้ทั้งเล่ม มีชื่อคนรู้จักอยู่ในนั้นด้วย','epic',true)}else{HP(25);log('🩸 คุณหนีรอดมาได้แบบเลือดท่วม','bad',true)}})),
  tp('agi')?O('💨 หายตัวก่อนพวกมันจะรู้ตัว','สายว่องไว',()=>log('💨 พวกมันพังประตูเข้ามาเจอแต่ห้องว่าง','good')):null,
  tp('ctrl')?O('🌀 ล่อให้พวกมันฆ่ากันเอง','สายควบคุม',()=>{S.fame+=20;S.karma-=2;log('🌀 เช้าวันต่อมาเหลือรอดแค่คนเดียว และมันไม่กล้ามองหน้าคุณ','epic')}):null].filter(Boolean))});
ev(3,0,s=>A1(s)&&s.age>=18&&s.sv.lv>=20&&no('war'),()=>{mark('war');
 choice('🚩 สองจักรวรรดิประกาศสงคราม','ราชโองการเกณฑ์ผู้ฝึกจิตระดับยี่สิบขึ้นไปทุกคนไปแนวหน้า',[
  O('🚩 ไปรบ','',()=>{if(fight('ทัพผู้ฝึกจิตข้าศึก',total()*1.2)){S.fame+=50;S.money+=inc(R(300,800));log('🚩 คุณกลับมาพร้อมเหรียญตรา และฝันร้ายที่ไม่เล่าให้ใครฟัง','epic',true);joy(-6)}else{HP(35);S.maxHp=Math.max(30,Math.round(S.maxHp*.9));log('🩸 คุณกลับมาด้วยแผลเป็นยาวทั้งหลัง','bad',true)}}),
  O('🫥 ซ่อนระดับจิต','กรรม −',()=>{S.karma-=5;log('🫥 คุณกดระดับจิตให้ดูต่ำกว่ายี่สิบ เพื่อนบ้านสองคนไม่ได้กลับมา')}),
  tp('sup')?O('🌿 ไปเป็นหมอแนวหลัง','สายสนับสนุน',()=>{S.karma+=12;S.fame+=25;log('🌿 คุณรักษาทหารทั้งสองฝ่าย ทั้งสองจักรวรรดิส่งจดหมายขอบคุณมา','epic',true)}):null].filter(Boolean))},1);
ev(4,0,s=>A1(s)&&s.sv.lv>=15&&no('elder'),()=>{mark('elder');
 choice('🧓 ผู้เฒ่าวงแหวนแตก','ชายแก่นั่งขายถ่านข้างตลาด แขนข้างหนึ่งไม่มีเรี่ยวแรง เขาเห็นวงแหวนคุณแล้วพูดเบาๆ "ข้าเคยมีเจ็ดวง วงที่แปดฆ่าข้าไปครึ่งตัว"',[
  O('🍵 ดูแลเขาจนวันสุดท้าย','เสียเงินทุกปีสักพัก · ได้ทฤษฎีคอขวด',()=>{X().theory=1;S.money=Math.max(0,S.money-R(80,200));S.karma+=8;log('🍵 ก่อนตาย เขาเขียนวิธีอ่านคอขวดของร่างกายไว้ให้ การหลอมเกินขีดคุณปลอดภัยขึ้น','epic',true)}),
  O('🪙 ซื้อถ่านแล้วเดินต่อ','',()=>log('🪙 ถ่านของเขาติดไฟดีกว่าเจ้าอื่น'))])},1);
ev(3,6,s=>A1(s)&&s.age>=8&&s.age<=22&&s.sv.lv<capOf(s.sv),()=>{const g=X();
 choice('🌧️ ฝึกกลางพายุ',`ฤดูมรสุม ครูฝึกบอกว่าพลังจิตไหลแรงที่สุดตอนฟ้าผ่า`,[
  O('⚡ ออกไปฝึกกลางพายุ','ระดับจิต +2 · เสี่ยงเจ็บ',()=>{g.lv=Math.min(capOf(g),g.lv+2);HP(R(5,18));log(`⚡ ฟ้าผ่าห่างไปสามก้าว แต่${nm()}ดูดพลังไว้ทัน`,'good')}),
  O('🏠 ฝึกในบ้าน','',()=>log('🏠 คุณนั่งสมาธิฟังเสียงฝน'))])});
ev(3,0,s=>A1(s)&&s.age>=16&&no('plague'),()=>{mark('plague');
 choice('🤒 โรคระบาดในเมืองท่า','คนป่วยเป็นพัน ศาลาดวงจิตขอให้ผู้ฝึกจิตทุกคนช่วย ใครดวงจิตแบบไหนก็ช่วยได้คนละแบบ',[
  tp('sup')?O('🌿 รักษาด้วยดวงจิต','สายสนับสนุน',()=>{S.karma+=15;S.fame+=40;log(`🌿 ${nm()}ของคุณรักษาคนได้สามร้อยคน ชาวเมืองท่าตั้งศาลให้`,'myth',true)}):null,
  tp('def')?O('🛡️ เฝ้าด่านกักโรค','สายป้องกัน',()=>{S.karma+=8;S.fame+=15;log('🛡️ คุณยืนเฝ้าด่านสี่สิบวัน ไม่มีใครฝ่าออกไปแพร่เชื้อได้','epic')}):null,
  O('📦 ขนยาจากเมืองหลวง','เสี่ยงติดโรค',()=>{S.karma+=6;if(Math.random()<.3)HP(25);log('📦 คุณขนยามาสามเที่ยว เที่ยวสุดท้ายแทบเดินไม่ไหว','good')}),
  O('🚪 ปิดประตูอยู่บ้าน','',()=>log('🚪 ปลอดภัยดี'))].filter(Boolean))},1);

// =================== 6) ไร้ดวงจิต ===================
ev(5,6,s=>A2(s)&&s.age>=10,()=>{const by=ch(['ผู้ฝึกจิตหนุ่มดวงจิตเสือ','ลูกเจ้าศาลา','เด็กรุ่นเดียวกันที่ได้ดวงจิตงู']);
 choice('😒 "คนไร้ดวงจิต"',`${by}เดินชนคุณกลางตลาดแล้วหัวเราะ "หลบหน่อยสิ คนไร้ค่า"`,[
  O('🙇 ก้มหน้าหลบ','',()=>{joy(-5);log('🙇 คุณหลบ แล้วรู้สึกเหมือนตัวเล็กลงหนึ่งนิ้ว')}),
  O('🗣️ ตอบกลับด้วยคำพูด','ใช้เสน่ห์',()=>{if(S.cha>=40){S.fame+=6;log('🗣️ คนทั้งตลาดหัวเราะ แต่หัวเราะใส่เขา','good')}else{HP(10);log('🩸 เขาไม่ชอบคำตอบคุณ','bad')}}),
  O('🧠 จำหน้าไว้','ปัญญา +',()=>{S.int+=2;log('🧠 วันหนึ่งเขาจะต้องมาซื้อของจากคุณ')})])});
ev(6,0,s=>A2(s)&&s.sv.np&&s.sv.np.k&&s.sv.np.x>=12&&no('np1'),()=>{const g=X(),k=g.np.k;mark('np1');
 const T={smith:['⚒️ อาวุธที่เข้ากับดวงจิต','จ้าวจิตดวงจิตมังกรสั่งดาบที่ "ไม่ทะเลาะกับดวงจิต" ช่างทุกคนในเมืองปฏิเสธ',[['🔥 รับงาน ทำสามเดือนไม่หลับ',()=>{S.fame+=40;S.money+=inc(R(400,900));log('⚒️ ดาบเล่มนั้นทำให้ทั้งทวีปรู้ว่ามีช่างคนหนึ่งที่ไม่มีดวงจิต แต่เข้าใจดวงจิตดีกว่าใคร','myth',true)}],['🙅 ปฏิเสธ',()=>log('🙅 ไม่ใช่งานที่คุ้มเสี่ยง')]]],
  doc:['🌿 ผู้ฝึกจิตหลอมเกินขีด','มีคนหามผู้ฝึกจิตหนุ่มที่หลอมวงแหวนเกินขีดมาที่ร้าน เส้นจิตแตกกระจาย หมอคนอื่นบอกว่าหมดหวัง',[['🌿 ลองต่อเส้นจิต',()=>{if(Math.random()<.55+S.int/400){S.fame+=40;S.karma+=15;log('🌿 เขารอด และดวงจิตยังอยู่ ข่าวลือไปทั่วว่าหมอไร้ดวงจิตต่อเส้นจิตได้','myth',true)}else{S.karma+=3;joy(-10);log('🕯️ คุณพยายามทั้งคืน แต่ไม่ทัน','bad',true)}}],['🙅 ส่งต่อให้ศาลา',()=>log('🙅 คุณได้ยินทีหลังว่าเขาไม่รอด')]]],
  trade:['💰 วงแหวนปลอม','คนรู้จักเสนอให้ร่วมขายวงแหวนปลอมให้ผู้ฝึกจิตมือใหม่ "กำไรสิบเท่า ไม่มีใครตรวจได้"',[['💰 ร่วมด้วย',()=>{S.money+=inc(R(800,2000));S.karma-=15;log('💰 กำไรมหาศาล คุณเลิกถามว่าเด็กที่ซื้อไปเป็นยังไงบ้าง','bad',true)}],['📢 แฉให้ศาลารู้',()=>{S.fame+=35;S.karma+=10;log('📢 ทั้งแก๊งโดนจับ ศาลาดวงจิตให้คุณเป็นผู้ค้าที่ได้รับรอง','epic',true)}]]],
  sch:['📚 ทฤษฎีคอขวด','คุณค้นพบว่าคอขวดทุกสิบระดับไม่ได้ตายตัว ขึ้นกับร่างกาย ไม่ใช่ดวงจิต ถ้าเผยแพร่ ผู้ฝึกจิตจะตายตอนหลอมวงแหวนน้อยลงมาก',[['📖 ตีพิมพ์',()=>{S.fame+=60;S.karma+=12;log('📖 ศาลาดวงจิตเกือบสั่งเผาตำรา แต่ผู้ฝึกจิตทั่วทวีปแอบคัดลอกไปหมดแล้ว','myth',true)}],['🗝️ เก็บไว้ขายเฉพาะคนจ่ายได้',()=>{S.money+=inc(R(1000,2500));log('🗝️ ลูกค้าคุณมีแต่ตระกูลใหญ่','')}]]]}[k];
 choice(T[0],T[1],T[2].map(x=>O(x[0],'',x[1])))},1);
ev(4,0,s=>A2(s)&&s.age>=30&&no('np2'),()=>{mark('np2');const p=SP[Math.floor(Math.random()*SP.length)];
 choice('👶 ลูกของคนไร้ดวงจิต',`ลูกคุณวิ่งกลับมาจากพิธีปลุก ชู<b>${p[1]} ${p[2]}</b>ให้ดู "แม่/พ่อ ดูสิ! หนูมีแล้ว!"`,[
  O('🫂 กอดลูกไว้','',()=>{joy(15);log('🫂 คุณกอดลูกนานกว่าปกติ ลูกไม่รู้ว่าทำไม','epic',true)}),
  O('📏 สอนลูกว่าดวงจิตไม่ใช่ทุกอย่าง','',()=>{S.int+=2;S.karma+=4;log(`📏 ลูกพยักหน้า แล้วถาม "แต่${p[2]}เอาไว้ทำอะไรได้บ้าง" คุณตอบได้ดีกว่าผู้ฝึกจิตทุกคนในเมือง`,'good',true)})])},1);
ev(5,0,s=>A2(s)&&s.sv.np&&s.sv.np.k&&s.sv.np.x>=40&&no('np3'),()=>{mark('np3');S.fame+=80;S.karma+=8;
 log(`🙇 ผู้ครองดวงจิตคนหนึ่งเดินเข้ามาในร้าน คนทั้งร้านลุกยืน แต่เขาตรงมาที่คุณแล้วก้มหัว "ตอนข้าอายุสิบหก ท่านช่วยข้าไว้ ท่านคงจำไม่ได้" คุณจำไม่ได้จริงๆ`,'myth',true)},1);

// =================== หน้าดวงจิต: ผลของสาย · ท่าวงแหวน · ใจดวงจิต ===================
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!S||S.ch!=='soul'||!S.sv)return r;const g=X(),m=$('modal');if(!m)return r;let h='';
 if(g.aw===2){h=`<div class="item">🌑 <b>ไร้ดวงจิต</b><br><span class="tag2">${g.np&&g.np.k?`${NP[g.np.k][0]} ${NP[g.np.k][1]} · ${npRank(g)}`:'ใช้ชีวิตเรียบง่าย'}</span></div>`}
 else if(g.aw===1){const types=[...new Set(act(g).map(s=>spNow(s).t))];
  h+=`<h4>ผลของสาย</h4>${types.map(t=>`<div class="item">${TY[t]}<br><span class="tag2">${EFX[t]}</span></div>`).join('')}`;
  if(g.rings.length)h+=`<h4>ท่าวงแหวน</h4><div class="tag2" style="line-height:1.8">${g.rings.map((x,i)=>`วงที่ ${i+1} 「${esc(x.sk)}」 — ศัตรูอ่อนลง ${Math.round(ringOne(x.t)*100)}%`).join('<br>')}<br><b>รวมตอนต่อสู้: ศัตรูอ่อนลง ${Math.round(ringF()*100)}%</b>${g.retired?' (ทุบวงแหวนแล้ว)':''}</div>`;
  const P=main()?PER[main().t]:null;
  h+=`<div class="item">💞 ใจของดวงจิต <b>${g.bond}</b>/100${P?` · นิสัย${P[0]}`:''}<div style="height:6px;background:#0004;border-radius:3px;margin-top:4px"><div style="height:6px;width:${g.bond}%;background:#ff7ab8;border-radius:3px"></div></div></div>`;
  const ex=[g.fused?'🔥 ดวงจิตหลอมรวม':null,g.dorm?'🔒 ดวงจิตที่สองหลับอยู่':null,(g.sp.length>1&&!g.dual)?'🌀 ดวงจิตคู่ยังแย่งร่าง':null,g.pet?`🐾 สัตว์คู่ใจ: ${esc(g.pet.n)} (${g.pet.y} ปี)`:null,g.mate&&g.mate.alive?`👥 เพื่อนร่วมทีม: ${esc(g.mate.n)}`:null,g.job?`🧺 งาน: ${esc(g.job.n)}`:null,g.acad?'🏫 นักเรียนสถาบันจิตยุทธ์':null,g.theory?'📜 รู้ทฤษฎีคอขวด':null,g.spared.length?`🕊️ เคยไว้ชีวิตสัตว์อสูร ${g.spared.length} ตัว`:null,g.kill>=3?`🐺 เผ่าสัตว์อสูรผูกใจเจ็บ (${g.kill})`:null,g.god?'⚡ ผ่านการทดสอบเทพ':null,g.retired?'💔 วางมือแล้ว':null,g.heir?'📜 ถ่ายทอดให้ลูกศิษย์แล้ว':null].filter(Boolean);
  if(ex.length)h+=`<div class="tag2" style="line-height:1.8;margin-top:6px">${ex.join('<br>')}</div>`}
 if(h)m.insertAdjacentHTML('beforeend',`<div class="svX">${h}</div>`)}catch(e){console.error('sv2 ui',e)}return r}}
window._blk35={ringF,tp,Q,giftRing,X,yr};
})()}catch(e){console.error('block35',e)}
SL.impl.fight=fight;fight=function(){return globalThis.fight.apply(this,arguments)};SL.impl.duel=duel;duel=function(){return globalThis.duel.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul3 (เดิมอยู่ app.js บรรทัด 33053) · ห่อ: passYear ----
(function(){const SL=globalThis.__wSlots['soul3'];let passYear=SL.base.passYear;
try{(()=>{
const B=window._blk34;if(!B||typeof EVENTS==='undefined')return;
const {TIER,spNow,capOf}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const A1=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&!s.sv.retired);
const O=(t,s,f)=>({t,s,f});
const pick=a=>a[Math.floor(Math.random()*a.length)];
const ev=(w,cd,c,f,once)=>EVENTS.push({w,cd,once:once?1:0,c:s=>{try{return!!c(s)}catch(e){return false}},f(){try{f()}catch(e){console.error('svG ev',e)}}});
const BX=()=>{const g=S.sv;g.bx=g.bx||{af:0,met:{},keep:0,brk:0};g.spared=g.spared||[];g.kill=g.kill||0;if(g.bond==null)g.bond=50;return g.bx};
const tp=k=>{const g=S.sv;return!!(g&&g.sp&&g.sp.some(s=>spNow(s).t===k))};
const nm=()=>{const g=S.sv;return g&&g.sp&&g.sp[0]?spNow(g.sp[0]).n:'ดวงจิต'};
const HP=p=>{const d=Math.round(S.maxHp*p/100);S.hp=Math.max(1,S.hp-d);return d};
const die=why=>{S.deathCause=why;setTimeout(()=>{try{checkDeath()}catch(e){}},200)};
const nmP=()=>{try{return anyName(Math.random()<.5?'ชาย':'หญิง')}catch(e){return pick(['หลินเยว่','ซูหาน','ม่อชิง','เฟิงหลาน'])}};

// ---------- ความผูกพันกับสัตว์วิญญาณ (ซ่อน — เหตุการณ์บอกเป็นนัย) ----------
function afOf(){const g=S.sv,x=BX();return cl(30+g.spared.length*7+(g.pet?12:0)+(+S.karma||0)/8-g.kill*6+((tp('sup')||tp('ctrl'))?6:0)+((g.bond||50)-50)/5+x.af-(x.curse?25:0),0,100)}
window._svAf=()=>{try{return on()?Math.round(afOf()):0}catch(e){return 0}};

// ---------- สัตว์วิญญาณระดับสูง [ชื่อ, ไอคอน, สาย, ท่า, สัญญา, ถิ่น] ----------
const GB={
 5:[['หมาป่าหิมะเหนือภูน้ำแข็ง','🐺','agi','เขี้ยวหิมะพันลี้','kin','ภูน้ำแข็งเหนือสุด'],['พญางูเก้าเศียรแห่งบึงมรณะ','🐍','ctrl','เก้าเศียรกลืนฟ้า','body','บึงมรณะ'],['เต่าดำแบกภูผา','🐢','def','กระดองค้ำแผ่นดิน','dream','ก้นทะเลสาบใหญ่'],['หงส์เพลิงอมตะ','🔥','atk','เพลิงคืนชีพ','dream','ปากภูเขาไฟ'],['กิเลนหยกฟ้า','🦄','sup','ก้าวหยกรักษาพันแผล','kin','ทุ่งหมอกหยก'],['ราชินีผีเสื้อแสงจันทร์','🦋','ctrl','ผงจันทร์หลับใหล','nohunt','หุบเขาดอกไม้ราตรี'],['เสือขาวพยัคฆ์สวรรค์','🐅','atk','กรงเล็บทลายฟ้า','nohunt','ป่าดึกดำบรรพ์'],['วาฬเงินแห่งทะเลลึก','🐋','def','คลื่นเงินหมื่นลี้','dream','ทะเลลึกไร้แสง'],['ม้าขาวเหยียบเมฆ','🐎','agi','กีบเมฆเหยียบฟ้า','kin','ที่ราบลมหวน']],
 6:[['แมงป่องน้ำแข็งเหมันต์นิรันดร์','🦂','ctrl','หางเหมันต์ตรึงวิญญาณ','body','ทุ่งน้ำแข็งขั้วโลก'],['มังกรทองนิทรา','🐉','atk','ลมหายใจทองทลายภพ','dream','ถ้ำทองใต้ภูเขา'],['วานรเพลิงพันกร','🐒','atk','พันกรถล่มภูผา','kin','ภูเขาผลไม้เพลิง'],['จิ้งจอกเงาเก้าหาง','🦊','agi','เก้าหางลวงฟ้า','body','ป่าหมอกลวงตา'],['ต้นไผ่เทพพันข้อ','🎋','sup','ข้อไผ่ต่อชีวิต','nohunt','ทะเลไผ่']],
 7:[['ต้นไม้สวรรค์ผู้มีจิต','🌳','sup','รากหยั่งทวีป','kin','ใจกลางป่าต้องห้าม'],['วาฬดาวกลืนฟ้า','🌌','def','กลืนดาวทั้งราตรี','dream','ทะเลเหนือเมฆ'],['ปักษาเพลิงบรรพกาล','☀️','atk','อาทิตย์ดวงแรก','body','ยอดเขาที่ใกล้ตะวันที่สุด']],
 8:[['เทพมังกรต้นกำเนิด','🐲','atk','ลมหายใจแรกของโลก','dream','ใต้รากของทวีป'],['จิตแห่งทวีป','🌍','sup','ทวีปตอบรับ','kin','ทุกที่และไม่มีที่ใด']]};
const LIKE={atk:['atk','agi'],def:['def','sup'],sup:['sup','def'],ctrl:['ctrl','agi'],agi:['agi','ctrl']};
const PACT={kin:'คุ้มครองเผ่าพันธุ์ของมันในป่า',nohunt:'ไม่ล่าสัตว์วิญญาณตามอำเภอใจอีก',dream:'พามันไปทำสิ่งที่มันฝันมาทั้งชีวิต',body:'ให้มันได้ออกมาใช้ร่างคุณในบางคืน'};
const DREAM=['เห็นทะเลที่ไม่มีวันหมด','ชนะคู่อาฆาตที่มันแพ้เมื่อนานมาแล้ว','ดูมนุษย์ฉลองปีใหม่ในเมืองหลวง','ยืนบนยอดเขาที่สูงที่สุดของทวีป','ได้ยินเพลงของมนุษย์อีกครั้ง','กลับไปดูรังเกิดของตัวเอง'];
const NEED={5:50,6:68,7:84,8:95},LVB={5:3,6:5,7:8,8:12};
const tName=t=>TIER[t]?TIER[t][0]:'?';
const beastFor=(t,pref)=>{const own=new Set(((S&&S.sv&&S.sv.rings)||[]).map(r=>r.b)),L0=GB[t]||GB[5],L=L0.filter(b=>!own.has(b[0])).length?L0.filter(b=>!own.has(b[0])):L0,m=L.filter(b=>pref&&LIKE[pref]&&LIKE[pref].includes(b[2]));return pick(m.length&&Math.random()<.7?m:L)};

// ---------- หลอมวงแหวนระดับสูง ----------
function bump(t,mult){S.power+=pctPow([.03,.06,.1,.16,.25,.4,.6,.85,1.2][t]*(mult||1));S.fame+=[2,6,15,40,100,300,800,2000,5000][t];S.maxHp+=[0,0,15,30,60,120,200,320,500][t]}
function addRing(t,b,o){const g=S.sv;if(g.rings.length>=9)return null;const r=Object.assign({t,b:b[0],sk:b[3],gr:1,ic:b[1]},o||{});g.rings.push(r);
 g.lv=Math.min(100,Math.min(Math.max(capOf(g),g.lv),g.lv+(LVB[t]||1)));bump(t,(r.seal?.5:1)*((o&&o.mult)||1));
 try{const RB=LS.get('murim_svring',{})||{};RB[b[0]]=Math.max(RB[b[0]]||0,t+1);LS.set('murim_svring',RB)}catch(e){}
 try{const x=BX();x.top=Math.max(x.top||0,t)}catch(e){}
 log(`${TIER[t][1]} <b>หลอมวงแหวนวงที่ ${g.rings.length} — ${tName(t)}ของ${esc(b[0])}</b> · ได้ท่า <b>「${esc(nm())}·${esc(b[3])}」</b>${r.seal?' <span class="tag2">(ผนึกพลังไว้ครึ่งหนึ่ง)</span>':''}${r.slp?' <span class="tag2">(วงแหวนยังหลับ)</span>':''}`,'myth',true);return r}
// ร่างกายรับไม่ไหว: willing = สัตว์ยอมเอง (ลดความต้องการระดับ)
function crisis(t,b,o){const g=S.sv,need=NEED[t]-(o.willing?25:0)-(g.sp.length>1?5:0)-((g.bond||50)>=80?5:0),gap=need-g.lv;
 if(gap<=0)return addRing(t,b,o);
 const pOk=cl(.78-gap*.022+(tp('def')?.08:0)+(o.willing?.1:0),.05,.85);
 const intro=pick([`พลังของ${esc(b[0])}ไหลเข้าสู่ร่าง เส้นจิตคุณร้องลั่นเหมือนเชือกที่ถูกดึงจนสุด`,`วงแหวน${tName(t)}ลอยลงมาครอบตัวคุณ แสงของมันแรงจนผิวหนังเริ่มปริ`,`ร่างกายระดับ ${g.lv} ของคุณเล็กเกินกว่าจะใส่พลังขนาดนี้ ${esc(b[0])}รู้ดี มันกระซิบถามว่าจะเอายังไง`]);
 choice(`💥 ร่างกายรับไม่ไหว`,`${intro}<br><br><span class="tag2">ระดับที่ควรมีราว ${need} · ตอนนี้ ${g.lv}</span>`,[
  O('💪 กัดฟันรับทั้งหมด',`สำเร็จราว ${Math.round(pOk*100)}% · พลาดแล้วอาจถึงตาย`,()=>{if(Math.random()<pOk){addRing(t,b,Object.assign({},o,{mult:1.15}));log('🔥 คุณทนผ่านคืนที่ยาวที่สุดในชีวิตมาได้ ร่างกายถูกหลอมใหม่ทั้งร่าง','myth',true);S.maxHp+=40;return}
   if(gap>28&&Math.random()<.55){die(`ดูดซับวงแหวน${tName(t)}ของ${b[0]}ด้วยร่างกายที่ยังเล็กเกินไป`);log(`💥 แสงของวงแหวน${tName(t)}กลืนร่างคุณทั้งร่าง…`,'bad',true);return}
   S.maxHp=Math.max(30,Math.round(S.maxHp*.8));S.hp=Math.max(1,Math.round(S.hp*.3));g.lv=Math.max(1,g.lv-5);addRing(t,b,Object.assign({},o,{seal:1}));log(`🩸 คุณรอด แต่เส้นจิตฉีกขาดไปครึ่งหนึ่ง ${esc(b[0])}ต้องผนึกตัวเองไว้ไม่ให้ฆ่าคุณ (พลังชีวิตสูงสุด −20% · ระดับ −5)`,'bad',true)}),
  O('🔒 ขอให้มันผนึกพลังไว้ครึ่งหนึ่ง','ปลอดภัย · พลังครึ่งเดียวจนกว่าระดับจะถึง',()=>addRing(t,b,Object.assign({},o,{seal:1,need:NEED[t]-(o.willing?15:0)}))),
  O('🌙 ให้วงแหวนหลับอยู่ในตัว','ตอนนี้ได้พลังแค่เศษเสี้ยว · ตื่นเองเมื่อคุณโตพอ ตื่นแล้วแรงกว่าเดิม',()=>{const r=addRing(t,b,Object.assign({},o,{slp:1,need:NEED[t]-(o.willing?20:0),mult:.25}));if(r)r.slpT=t})])}
window._svGreat={crisis,addRing,afOf,GB};

// ---------- พลังวงแหวน: ผนึก/หลับ ----------
// ringF ใน Block 35 ใช้ r.t → วงแหวนที่หลับคิดเป็นขั้นต่ำกว่า, ผนึกคิดครึ่งเดียว (ผ่าน effT)
{const _yr=passYear;passYear=function(){const r=_yr.apply(this,arguments);try{if(!on())return r;const g=S.sv,x=BX();
 for(const q of g.rings){if(!q.gr)continue;
  if(q.slp&&g.lv>=(q.need||0)){q.slp=0;bump(q.slpT!=null?q.slpT:q.t,1.25);log(`${TIER[q.t][1]} <b>วงแหวน${tName(q.t)}ของ${esc(q.b)}ตื่นแล้ว</b> มันหลับรอคุณมาตลอด ตอนนี้ร่างคุณใหญ่พอให้มันยืดตัวได้ทั้งตัว`,'myth',true)}
  else if(q.seal&&q.need&&g.lv>=q.need&&!q.slp){q.seal=0;bump(q.t,.5);log(`🔓 <b>ผนึกบนวงแหวน${tName(q.t)}ของ${esc(q.b)}คลายออก</b> พลังอีกครึ่งที่มันกดไว้ไหลกลับมาหาคุณ`,'myth',true)}
  // วงแหวนที่รักษาสัญญามานาน เติบโตได้เองครั้งหนึ่ง
  if(q.aw&&!q.ev&&q.t<8&&x.keep>=4&&Math.random()<.06){q.ev=1;q.t++;bump(q.t,.6);log(`🌠 <b>วงแหวนของ${esc(q.b)}เติบโต</b> — จาก${tName(q.t-1)}กลายเป็น<b>${tName(q.t)}</b> มันบอกว่าการได้อยู่กับคุณทำให้มันแก่ขึ้นแบบที่ป่าไม่เคยให้`,'myth',true)}}
 if(x.inner){x.inner.y++;if(x.inner.y%4===0)S.int+=2}
 if(x.rb&&x.rb.st===1)x.rb.y=(x.rb.y||0)+1}catch(e){console.error('svG yr',e)}return r}}
{const _g=window._svGrow;window._svGrow=g=>{let m=_g?_g(g):1;try{const x=g.bx;if(x&&x.inner)m*=1.25;if(x&&x.rb&&x.rb.st===2)m*=1.1;if(x&&x.curse)m*=.9}catch(e){}return m}}

// ---------- ล่าราชาสัตว์ (ทางนักล่า) ----------
{const _hx=window._svHuntX;window._svHuntX=(g0,i,safe,opts)=>{if(_hx)_hx(g0,i,safe,opts);try{const g=S.sv;if(g.lv<60||g.rings.length>=9||S.age<18)return;const t=g.lv>=88?6:5,b=beastFor(t);
 opts.push(O(`🗡️ บุกล่า${b[0]} · ${tName(t)}`,'☠️ เสี่ยงตายสูงมาก · เผ่าของมันจะไม่ลืม',()=>huntGreat(t,b)))}catch(e){console.error(e)}}}
function huntGreat(t,b){const g=S.sv,x=BX();
 const go=team=>duel(`${b[0]} (${tName(t)})`,Math.round(total()*(t===6?1.75:1.45)*(team?.8:1)),w=>{try{if(!S||!S.alive)return;
  if(!w){if(Math.random()<(t===6?.4:.25)){die(`ถูก${b[0]}${tName(t)}ฆ่าระหว่างล่า`);log(`🩸 ${b[0]}ไม่ได้แค่ป้องกันตัว มันล่าคุณกลับ`,'bad',true);return}HP(60);g.lv=Math.max(1,g.lv-3);log(`🩸 คุณถูกลากออกจาก${b[5]}ทั้งที่เลือดเต็มตัว ${team?'เพื่อนร่วมทีมสองคนไม่ได้กลับมาด้วย':'ไม่มีใครรู้ว่ารอดมาได้ยังไง'}`,'bad',true);return}
  g.kill+=3;x.af-=25;x.curse={n:b[0],a:S.age,k:0};S.karma-=15;
  log(`🏹 <b>${b[0]}ล้มลง</b> ป่าทั้งผืนเงียบกริบ แม้แต่ลมก็หยุดพัด`,'epic',true);crisis(t,b,{willing:0,mult:1.2,kill:1})}catch(e){console.error(e)}});
 choice(`🗡️ ล่า${b[0]}`,`${b[0]}อายุ${tName(t)} ใช้ชีวิตอยู่ที่${b[5]} ทั้งทวีปมีคนที่เคยล่าสัตว์ระดับนี้สำเร็จนับคนได้`,[
  O('⚔️ ลุยคนเดียว','',()=>go(0)),
  O(`👥 จ้างทีมนักล่า (${fmt(t===6?40000:12000)} ตำลึง)`,'ง่ายขึ้น · แต่ต้องแบ่งชื่อเสียง',()=>{const c=t===6?40000:12000;if(S.money<c){log('💸 เงินไม่พอจ้างใคร','bad');return go(0)}S.money-=c;go(1)}),
  O('🔙 เปลี่ยนใจ','',()=>{x.af+=3;log(`🍃 คุณยืนดู${b[0]}จากไกลๆ แล้วถอยออกมา มันรู้ว่าคุณอยู่ตรงนั้นตั้งแต่แรก`,'')})])}

// ---------- 1) สัตว์วิญญาณเลือกคน ----------
const SCN=[
 b=>[`🌫️ ${b[0]}ที่กำลังจะหมดอายุ`,`${b[1]} ${b[0]}ลากร่างชราออกจาก${b[5]} มาหยุดตรงหน้าคุณ "ข้าอยู่มา${'{T}'} ไม่อยากให้ทุกอย่างจบในดิน ให้ข้าไปต่อในตัวเจ้า"`],
 b=>[`🩸 ${b[0]}หนีนักล่า`,`คืนฝนตก ${b[1]} ${b[0]}บาดเจ็บหนักล้มลงใกล้ที่พักคุณ มีเสียงนักล่าไล่ตามมาไม่ไกล มันมองคุณด้วยตาที่ไม่ได้ขอความช่วยเหลือ แต่เลือกแล้ว`],
 b=>[`👁️ ${b[0]}เฝ้ามองคุณมานาน`,`ตลอดหลายปี คุณรู้สึกว่ามีอะไรตามดูอยู่ในป่า วันนี้ ${b[1]} ${b[0]}ก้าวออกมา "ข้าดูเจ้ามาตั้งแต่เจ้ายังตัวเท่านี้ เจ้าไม่ล่าเพราะอยากล่า ข้าชอบแบบนั้น"`],
 b=>[`⚡ ${b[0]}หนีทัณฑ์สวรรค์`,`ฟ้าเหนือ${b[5]}แตกเป็นรอยสายฟ้า ${b[1]} ${b[0]}ถึงวาระต้องรับทัณฑ์สวรรค์ซึ่งมันรู้ว่ารอดไม่ได้ ทางเดียวคือหลบเข้าไปอยู่ในดวงจิตมนุษย์ และมันเลือกคุณ`],
 b=>[`🎐 ${b[0]}ได้ยินเสียง${'{SP}'}`,`ดวงจิตคุณสั่นทั้งคืนเหมือนมีใครเรียก เช้ามา ${b[1]} ${b[0]}นั่งรออยู่หน้าประตู "ดวงจิตของเจ้าร้องเพลงที่ข้าไม่ได้ยินมาหลายพันปี"`]];
function chosen(t,pre){const g=S.sv,x=BX(),b=pre||beastFor(t,spNow(g.sp[0]).t);x.met[b[0]]=S.age;x.lastC=S.age;
 const [ti0,tx0]=pick(SCN)(b),fx=v=>v.replace('{T}',tName(t)).replace('{SP}',esc(nm())),ti=fx(ti0),tx=fx(tx0);
 const kid=g.rings.length===0,pk=b[4],dr=pick(DREAM);
 const opts=[
  O(`⭕ รับมันเป็นวงแหวน${kid?'วงแรก':''}`,`สัญญา: ${PACT[pk]}${pk==='dream'?` (${dr})`:''}`,()=>{x.pact={k:pk,n:b[0],dr,a:S.age};crisis(t,b,{willing:1,pact:pk})}),
  O('🫂 ให้มันสถิตอยู่ในดวงจิต','ยังไม่เป็นวงแหวน · โตไปด้วยกัน · วันหนึ่งอาจกลายเป็นวงแหวนที่แรงกว่าเดิม',()=>{x.inner={n:b[0],ic:b[1],ty:b[2],sk:b[3],t,y:0,b};log(`${b[1]} <b>${b[0]}หลอมตัวเข้าไปอยู่ในดวงจิตคุณ</b> ไม่ใช่วงแหวน ไม่ใช่สัตว์คู่ใจ แต่คือเสียงที่สองในหัวคุณ`,'myth',true)}),
  O('🙅 ปฏิเสธอย่างสุภาพ','มันอาจทิ้งอะไรไว้ให้',()=>{S.karma+=10;x.af+=6;const r=Math.random();
   if(r<.35){S.power+=pctPow(.12);log(`🦴 ${b[0]}หัวเราะเบาๆ แล้วทิ้งกระดูกวิญญาณชิ้นหนึ่งไว้ให้ "คนที่ไม่โลภ ควรได้อะไรบ้าง"`,'epic',true)}
   else if(r<.65&&!g.pet){g.pet={n:'ลูกของ'+b[0],t:Math.min(3,t-2),y:0};log(`🐾 ${b[0]}จากไป แต่ลูกตัวเล็กของมันไม่ยอมไปด้วย มันเดินตามคุณกลับบ้าน`,'epic',true)}
   else{S.maxHp+=60;log(`🌿 ${b[0]}เป่าลมหายใจใส่หน้าผากคุณก่อนจากไป ร่างกายเบาขึ้นอย่างประหลาด (พลังชีวิตสูงสุด +60)`,'epic',true)}})];
 if(g.rings.length>=9)opts.splice(0,1);
 if(g.kill>=3||tp('atk'))opts.push(O('🗡️ ฆ่ามันเอาวงแหวนเต็มพลัง','ทรยศ · ได้วงแหวนแรงกว่า · ป่าทั้งทวีปจะรู้',()=>{g.kill+=3;x.af-=40;S.karma-=30;x.curse={n:b[0],a:S.age,k:0};log(`🩸 ${b[0]}ไม่ได้สู้กลับ มันแค่มองคุณจนวินาทีสุดท้าย`,'bad',true);crisis(t,b,{willing:0,mult:1.3,kill:1})}));
 choice(ti,`${tx}<br><br><span class="tag2">${TIER[t][1]} สัตว์วิญญาณ${tName(t)} · ${b[1]} สาย${{atk:'โจมตี',def:'ป้องกัน',sup:'สนับสนุน',ctrl:'ควบคุม',agi:'ว่องไว'}[b[2]]}${kid?' · ถ้ารับ นี่จะเป็นวงแหวนวงแรกของคุณ':''}</span>`,opts)}
const chT=()=>{const a=afOf(),g=S.sv,r=Math.random();if(a>=90&&g.lv>=60&&r<.04)return 7;if(a>=78&&g.lv>=35&&r<.22)return 6;return 5};
// เด็ก (ยังไม่มีวงแหวน): โอกาสได้วงแรกล้านปี
ev(2,20,s=>A1(s)&&s.age>=6&&s.age<=13&&s.sv.rings.length===0&&!(s.sv.bx&&s.sv.bx.lastC!=null)&&(afOf()>=48||s.sv.sp.length>1||s.sv.sp.some(z=>z.rev===0&&B.SP.find(p=>p[0]===z.id)&&B.SP.find(p=>p[0]===z.id)[6]))&&Math.random()<.35,()=>chosen(Math.random()<.12?6:5));
// ผู้ใหญ่: ความผูกพันสูงพอ
ev(2,8,s=>A1(s)&&s.age>=14&&s.sv.rings.length<9&&afOf()>=60&&(s.sv.bx==null||s.sv.bx.lastC==null||s.age-s.sv.bx.lastC>=12)&&!(s.sv.bx&&s.sv.bx.inner),()=>chosen(chT()));

// ---------- 2) ป่าต้องห้าม ----------
const FOREST={
 kings(){const g=S.sv,x=BX(),A=beastFor(5),Bb=beastFor(5);
  choice('⚔️ ราชาสองตนสู้กัน',`กลาง${A[5]} ${A[1]} ${A[0]}กับ ${Bb[1]} ${Bb[0]}สู้กันมาสามวันสามคืน ต้นไม้รอบตัวล้มเป็นวง ทั้งคู่บาดเจ็บหนัก`,[
   O(`🛡️ ช่วย${A[0]} (ฝ่ายได้เปรียบ)`,'',()=>{x.af+=10;S.fame+=60;x.owe=A;log(`🤝 ${A[0]}ชนะ มันมองคุณนานกว่าที่สัตว์ควรมองมนุษย์ แล้วจากไปโดยไม่พูดอะไร`,'epic',true)}),
   O(`🩹 ช่วย${Bb[0]} (ฝ่ายกำลังแพ้)`,'ต้องสู้กับราชาอีกตนเอง',()=>duel(A[0],Math.round(total()*1.3),w=>{if(!S.alive)return;if(w){x.af+=20;x.owe=Bb;S.fame+=150;log(`🌟 คุณยืนขวาง${A[0]}จนมันถอย ${Bb[0]}ที่รอดมาได้ก้มหัวให้คุณครั้งแรกในชีวิตมัน`,'myth',true)}else{HP(55);log(`🩸 ${A[0]}ปัดคุณกระเด็นเหมือนใบไม้ แต่${Bb[0]}ก็อาศัยจังหวะนั้นหนีไปได้`,'bad',true);x.af+=8}})),
   O('🗡️ รอให้ตัวหนึ่งตาย แล้วเก็บวงแหวน','ฉวยโอกาส',()=>{x.af-=20;g.kill+=2;const L=Math.random()<.5?A:Bb;if(g.rings.length<9)crisis(5,L,{willing:0,kill:1});else{S.power+=pctPow(.2);log(`🦴 คุณได้กระดูกวิญญาณของ${L[0]}มาแทน`,'epic',true)}}),
   O('🍃 ถอยออกมา','',()=>log('🍃 บางเรื่องไม่ใช่เรื่องของมนุษย์',''))])},
 old(){const g=S.sv,x=BX(),b=beastFor(Math.random()<.2?6:5);
  choice(`🌫️ ${b[0]}ชรา`,`ลึกเข้าไปใน${b[5]} ${b[1]} ${b[0]}นอนนิ่งอยู่ใต้ต้นไม้ใหญ่ ลมหายใจของมันช้าลงทุกครั้ง มันลืมตาข้างเดียวมองคุณ`,[
   O('🪑 นั่งเป็นเพื่อนมันจนวาระสุดท้าย','',()=>{x.af+=12;S.karma+=8;if(g.rings.length<9&&afOf()>=55&&Math.random()<.6){log(`🌙 คืนที่สาม ${b[0]}พูดขึ้นมาว่า "ข้าไม่อยากหายไปเฉยๆ"`,'epic',true);setTimeout(()=>{try{chosen(GB[6].includes(b)?6:5,b)}catch(e){}},400)}else log(`🕯️ ${b[0]}จากไปตอนรุ่งสาง ร่างของมันกลายเป็นแสงกระจายไปทั่วป่า คุณไม่ได้อะไรเลย และไม่ได้เสียใจที่อยู่`,'good',true)}),
   O('🗡️ ปลิดชีพให้จบเร็ว แล้วรับวงแหวน','',()=>{x.af-=10;g.kill++;if(g.rings.length<9)crisis(GB[6].includes(b)?6:5,b,{willing:0,mult:.8});}),
   O('🍃 ปล่อยมันไว้อย่างสงบ','',()=>{x.af+=4;log(`🍃 คุณเดินจากมา ข้างหลังมีเสียงถอนหายใจยาว เหมือนขอบคุณ`,'')})])},
 cub(){const g=S.sv,x=BX(),b=beastFor(5),money=R(20000,60000);
  choice('🪤 ลูกสัตว์ในกับดัก',`กับดักเหล็กของนักล่าจับลูกของ ${b[1]} ${b[0]}ไว้ มันยังเล็กแต่อายุเกินพันปีแล้ว ตลาดมืดให้ราคาลูกสัตว์ระดับนี้ราว ${fmt(money)} ตำลึง`,[
   O('🔓 ปล่อยมัน','',()=>{x.af+=20;x.mom={b,a:S.age};S.karma+=10;log(`🐾 ลูกของ${b[0]}วิ่งหายเข้าป่า ไกลออกไปมีเสียงคำรามต่ำๆ ตอบรับ`,'good',true)}),
   O(`💰 ขายตลาดมืด (+${fmt(money)})`,'',()=>{S.money+=money;x.af-=30;S.karma-=20;x.curse={n:b[0],a:S.age,k:0};log(`💰 เงินก้อนโต และคืนนั้นป่าทั้งป่าส่งเสียงหอนพร้อมกัน`,'bad',true)}),
   O('🐾 เลี้ยงไว้เอง','ได้สัตว์คู่ใจ · แม่ของมันอาจตามมา',()=>{if(!g.pet)g.pet={n:'ลูก'+b[0],t:3,y:0};x.mom={b,a:S.age,took:1};log(`🐾 ลูกของ${b[0]}กัดมือคุณจนเลือดออก แล้วหลับไปในอ้อมแขน`,'epic',true)})])},
 tide(){const g=S.sv,x=BX();
  choice('🌊 คลื่นสัตว์วิญญาณ',`ป่าทั้งป่าเคลื่อนตัว สัตว์หลายพันตัวพุ่งออกไปทางหมู่บ้านชายป่า มีบางอย่างที่ใหญ่กว่าไล่หลังพวกมันมา`,[
   O('⚔️ ขวางไว้หน้าหมู่บ้าน','',()=>duel('คลื่นสัตว์วิญญาณ',Math.round(total()*1.2),w=>{if(!S.alive)return;if(w){S.fame+=200;x.af-=5;log('🏘️ หมู่บ้านรอด ชาวบ้านสร้างศาลเล็กๆ ให้คุณ','epic',true)}else{HP(45);S.fame+=40;log('🩸 คุณถ่วงเวลาได้พอให้คนหนีทัน','')}})),
   O('🔍 ตามหาว่าอะไรไล่พวกมันมา','',()=>{x.af+=8;const b=beastFor(6);log(`👁️ ใจกลางป่า ${b[1]} ${b[0]}ระดับ${tName(6)}กำลังตื่นจากนิทรา สัตว์ทั้งหลายแค่กลัว คุณพูดกับมันจนมันกลับไปหลับ`,'myth',true);x.saw6=b}),
   O('🏃 พาชาวบ้านหนี','',()=>{S.karma+=8;S.fame+=60;log('🏃 ไม่มีใครตาย แต่บ้านหายไปครึ่งหมู่บ้าน','good')})])},
 fruit(){const g=S.sv,x=BX();
  choice('🍑 ผลไม้วิญญาณหมื่นปี',`ต้นไม้ประหลาดออกผลเพียงลูกเดียว สัตว์วิญญาณหลายตัวนั่งล้อมรอบเฝ้ารอให้มันสุก พวกมันเห็นคุณแล้ว`,[
   O('😋 แย่งกินเอง','',()=>{if(Math.random()<.6){g.lv=Math.min(capOf(g),g.lv+R(3,6));log(`🍑 พลังจิตพุ่งพรวด ระดับ ${g.lv}`,'epic',true)}else{HP(40);log('🩸 คุณกินได้ครึ่งลูกก่อนโดนรุม','bad')}x.af-=8}),
   O('🔪 แบ่งให้ทุกตัวเท่ากัน','',()=>{x.af+=12;g.lv=Math.min(capOf(g),g.lv+1);log('🍑 สัตว์ทั้งหลายมองหน้ากัน แล้วรับส่วนของตัวเองไปเงียบๆ ข่าวเรื่องมนุษย์ที่แบ่งผลไม้จะไปถึงหูสัตว์ที่ใหญ่กว่านี้','good',true)}),
   O('🍃 ปล่อยให้พวกมัน','',()=>{x.af+=6;log('🍃 คุณเดินผ่านไป มีบางตัวพยักหน้าให้','')})])}};
ev(2,8,s=>A1(s)&&s.age>=16&&s.sv.lv>=35,()=>{const k=pick(Object.keys(FOREST));
 choice('🌲 ขอบป่าต้องห้าม',pick(['หมอกสีเงินลอยออกมาจากแนวไม้ ทุกคนในทวีปรู้ว่าข้างในมีสัตว์ที่อายุเก่ากว่าอาณาจักร','ป้ายไม้ผุๆ เขียนว่า "ผู้ฝึกจิตต่ำกว่าระดับหกสิบ ห้ามผ่าน" ใครบางคนขีดฆ่าเลขหกสิบทิ้ง','เสียงป่าข้างในเงียบผิดปกติ เหมือนทั้งป่ากำลังกลั้นหายใจ']),[
  O('🌲 เดินเข้าไป','ไม่รู้จะเจออะไร',()=>FOREST[k]()),
  O('🏕️ ตั้งแคมป์ดูอยู่ข้างนอก','',()=>{BX().af+=2;log('🏕️ คืนนั้นมีดวงตาขนาดเท่าโคมไฟลอยผ่านแนวไม้ไปอย่างช้าๆ','')}),
  O('🔙 กลับ','',()=>{})])});
// ราชาที่เคยช่วย · แม่ของลูกสัตว์ กลับมา
ev(4,0,s=>A1(s)&&s.sv.bx&&s.sv.bx.owe&&s.sv.rings.length<9&&!s.sv.bx.oweDone,()=>{const x=BX();x.oweDone=1;chosen(5,x.owe)});
ev(4,0,s=>A1(s)&&s.sv.bx&&s.sv.bx.mom&&!s.sv.bx.mom.done&&s.age-s.sv.bx.mom.a>=2,()=>{const x=BX(),m=x.mom;m.done=1;
 if(m.took){choice(`😠 แม่ของลูก${m.b[0]}`,`${m.b[1]} ${m.b[0]}ยืนขวางทางกลับบ้าน ลูกของมันวิ่งออกจากตัวคุณไปหาแม่ แล้ว… วิ่งกลับมาหาคุณ`,[
  O('🫂 คืนลูกให้แม่','',()=>{S.sv.pet=null;x.af+=15;log(`🐾 ${m.b[0]}ใช้จมูกดุนลูกกลับเข้าป่า ก่อนไปมันหันมามองคุณ ไม่ใช่ศัตรูอีกแล้ว`,'good',true);x.owe=m.b}),
  O('⚔️ ไม่ยอมคืน','',()=>duel(m.b[0],Math.round(total()*1.35),w=>{if(!S.alive)return;if(w){x.af-=20;log('🩸 แม่ของมันถอยไปพร้อมแผลเต็มตัว ลูกในอ้อมแขนคุณร้องทั้งคืน','bad',true)}else{S.sv.pet=null;HP(50);log(`🩸 ${m.b[0]}เอาลูกคืนไป และเกือบเอาชีวิตคุณไปด้วย`,'bad',true)}}))])}
 else{log(`🐾 ${m.b[1]} ${m.b[0]}มาหาคุณถึงหน้าบ้านพร้อมลูกที่โตขึ้น มันวางของบางอย่างไว้ที่ธรณีประตูแล้วจากไป`,'epic',true);x.af+=10;if(S.sv.rings.length<9&&Math.random()<.55)setTimeout(()=>{try{chosen(5,m.b)}catch(e){}},400);else{S.power+=pctPow(.1);log('🦴 เป็นกระดูกวิญญาณที่ยังอุ่นอยู่','epic')}}});

// ---------- 3) สัญญากับวงแหวน ----------
const keep=(r,why)=>{const x=BX();x.keep++;x.af+=4;if(x.keep>=2&&r&&!r.aw){r.aw=1;bump(r.t,.35);r.sk='ตื่นรู้·'+String(r.sk).replace(/^ตื่นรู้·/,'');log(`✨ <b>วงแหวน${tName(r.t)}ของ${esc(r.b)}ตื่นรู้</b> — ${why||'มันเชื่อใจคุณแล้ว'} ท่า「${esc(r.sk)}」เปลี่ยนไป`,'myth',true)}else log(`🤝 ${why||'คุณรักษาสัญญา'}`,'good',true)};
const brk=r=>{const g=S.sv,x=BX();x.brk++;x.af-=20;x.pact=null;const p=Math.random();
 if(r&&p<.18+r.t*.02&&g.rings.length){const i=g.rings.indexOf(r);g.rings.splice(i,1);g.lv=Math.max(1,g.lv-10);S.power=Math.max(0,S.power-pctPow(.3));log(`💔 <b>วงแหวนของ${esc(r.b)}แตกออกจากตัวคุณ</b> มันไม่ได้ตาย มันแค่ไม่อยากอยู่กับคุณอีก (ระดับ −10)`,'bad',true)}
 else if(r&&p<.55){r.seal=1;r.need=200;log(`🔒 วงแหวนของ${esc(r.b)}มืดลงครึ่งหนึ่ง มันยังอยู่ แต่ไม่ยอมให้พลังเต็มที่อีกต่อไป`,'bad',true)}
 else{HP(40);g.lv=Math.max(1,g.lv-4);log(`🩸 วงแหวนของ${esc(r?r.b:'มัน')}พลิกพลังกลับเข้าหาคุณ คุณกระอักเลือดอยู่ครึ่งคืน (ระดับ −4)`,'bad',true)}};
const pRing=()=>{const x=BX();return x.pact&&S.sv.rings.find(r=>r.b===x.pact.n)};
const TEST={
 kin(r,P){choice(`🏹 นักล่ามาที่ถิ่นของ${P.n}`,`ทีมผู้ฝึกจิตหกคนตั้งค่ายล่าเผ่าพันธุ์ของ${esc(P.n)} วงแหวนในตัวคุณร้อนจนแสบ`,[
  O('⚔️ ไล่พวกมันออกไป','',()=>duel('หัวหน้าทีมนักล่า',Math.round(total()*1.1),w=>{if(!S.alive)return;if(w){S.fame+=50;keep(r,'คุณขวางนักล่าไว้ได้')}else{HP(35);keep(r,'คุณแพ้ แต่ถ่วงเวลาให้เผ่าของมันหนีทัน')}})),
  O('💰 จ่ายให้พวกมันไปล่าที่อื่น',`${fmt(5000)} ตำลึง`,()=>{if(S.money>=5000){S.money-=5000;keep(r,'เงินซื้อเวลาได้อีกหลายปี')}else brk(r)}),
  O('🙈 ทำเป็นไม่รู้','',()=>brk(r))])},
 nohunt(r,P){choice('🤔 ทางลัด',`เพื่อนร่วมทีมเจอ${pick(['หมาป่าหลังเงิน','กวางเขาฟ้าผ่า','หมีเกราะหิน'])}ที่อ่อนแอ "ฆ่าเลย ได้วงแหวนฟรีๆ" ${esc(P.n)}ในตัวคุณเงียบ รอดูว่าคุณจะทำยังไง`,[
  O('🙅 ไม่ล่า','',()=>keep(r,'คุณเดินผ่านไป')),
  O('🗡️ ล่าแค่ครั้งเดียว','',()=>{S.sv.kill++;brk(r)})])},
 dream(r,P){choice(`🌠 ความฝันของ${P.n}`,`"เจ้าจำได้ไหมว่าสัญญาอะไรไว้" เสียงในดวงจิตถาม มันอยาก<b>${esc(P.dr)}</b>`,[
  O('🎒 ออกเดินทางให้มัน','เสียเวลาฝึกสองปี · เสียเงิน',()=>{S.sv.slow=S.age+2;S.money=Math.max(0,S.money-R(1000,4000));joy(10);keep(r,`คุณพามันไป${P.dr}`)}),
  O('⏳ ขออีกสักพัก','',()=>{P.wait=(P.wait||0)+1;if(P.wait>=2)brk(r);else log('⏳ วงแหวนเงียบไปทั้งปี','')}),
  O('🙅 ข้าไม่ว่าง','',()=>brk(r))])},
 body(r,P){choice('🌕 คืนเดือนเต็ม',`${esc(P.n)}ขอออกมาใช้ร่างคุณคืนนี้`,[
  O('🫴 ยอมให้','ไม่รู้มันจะทำอะไร',()=>{const q=Math.random();if(q<.33){S.fame+=60;log(`🌕 คุณตื่นมาพบโจรภูเขายี่สิบคนนอนกองอยู่หน้าบ้าน ไม่มีใครตาย`,'epic',true)}else if(q<.66){S.karma-=5;S.money=Math.max(0,S.money-800);log('🐄 คุณตื่นมากลางทุ่ง ปากเปื้อนเลือดวัว ต้องจ่ายค่าเสียหายให้ชาวนา','bad',true)}else{joy(12);log('🌕 ชาวบ้านเล่าว่าเห็นคุณเต้นอยู่บนหลังคาทั้งคืน','good',true)}keep(r,'มันกลับเข้าไปในวงแหวนอย่างพอใจ')}),
  O('🙅 ไม่ใช่คืนนี้','',()=>{P.no=(P.no||0)+1;BX().af-=4;if(P.no>=3)brk(r);else log('😤 วงแหวนสั่นทั้งคืนด้วยความไม่พอใจ','')})])}};
ev(3,5,s=>A1(s)&&s.sv.bx&&s.sv.bx.pact&&s.age-s.sv.bx.pact.a>=2,()=>{const r=pRing(),x=BX();if(!r){x.pact=null;return}(TEST[x.pact.k]||TEST.kin)(r,x.pact)});

// ---------- 4) สัตว์สถิตจิต ----------
ev(3,4,s=>A1(s)&&s.sv.bx&&s.sv.bx.inner&&s.sv.bx.inner.y>=1,()=>{const x=BX(),I=x.inner,g=S.sv;
 if(I.y>=7&&g.rings.length<9&&!I.ask){I.ask=1;const up=I.y>=14&&I.t<7?1:0,t=I.t+up;
  choice(`${I.ic} ${I.n}: "ข้าพร้อมแล้ว"`,`${I.y} ปีที่${esc(I.n)}อยู่ในดวงจิตคุณ ${up?`มันโตขึ้นจน<b>เกิน${tName(I.t)}</b>ไปแล้ว `:''}วันนี้มันบอกว่า "ให้ข้าเป็นวงแหวนของเจ้า"`,[
   O(`⭕ รับเป็นวงแหวน${tName(t)}`,'',()=>{x.inner=null;crisis(t,I.b,{willing:1,mult:1.15})}),
   O('🫂 อยู่ด้วยกันแบบนี้ต่อ','ถามใหม่ทีหลัง',()=>{I.ask=0;I.y=Math.max(0,I.y-4);S.int+=3;log(`${I.ic} ${I.n}หัวเราะ "ก็ได้ ข้าไม่รีบ"`,'good')}),
   O('🕊️ คืนร่างให้มันได้เกิดใหม่เป็นคน','มันจะจากดวงจิตไป',()=>{x.inner=null;x.rb={n:nmP(),b:I.b,st:2,y:0,fromIn:1};x.af+=25;S.karma+=15;log(`🌸 แสงพุ่งออกจากหน้าอกคุณ แล้วกลายเป็นเด็กคนหนึ่งที่ยิ้มให้คุณ ${esc(x.rb.n)} คือชื่อที่คุณตั้งให้`,'myth',true)})]);return}
 const q=pick(['warn','fight','talk','scare']);
 if(q==='warn'){S.int+=2;log(`${I.ic} ${esc(I.n)}กระซิบเตือนก่อนคุณจะก้าวลงสะพานเก่า สะพานพังลงตามหลังคุณ`,'good',true)}
 else if(q==='fight'){S.fame+=40;log(`${I.ic} โจรล้อมคุณกลางทาง ตาคุณเปลี่ยนเป็นสีของ${esc(I.n)} คุณจำอะไรไม่ได้อีก ตื่นมาก็เหลือแต่คุณยืนอยู่`,'epic',true)}
 else if(q==='talk'){joy(6);log(`${I.ic} คืนนี้${esc(I.n)}เล่าให้ฟังเรื่องทวีปเมื่อหลายพันปีก่อน ตอนที่ยังไม่มีมนุษย์`,'good')}
 else{S.cha=Math.max(0,(S.cha||0)-2);log(`${I.ic} ${esc(I.n)}โผล่ออกมาทางสายตาตอนคุณคุยกับคนอื่น เขาวิ่งหนีไปไม่หันกลับมา`,'')}});

// ---------- 5) สัตว์กลับชาติเป็นคน ----------
ev(1,0,s=>A1(s)&&s.age>=16&&s.sv.lv>=45&&!(s.sv.bx&&s.sv.bx.rb)&&Math.random()<.5,()=>{const x=BX(),b=beastFor(6),n=nmP();x.rb={n,b,st:1,y:0};
 log(`👁️ คุณพบ<b>${esc(n)}</b> ผู้ฝึกจิตแปลกหน้าที่ตาเป็นสีของป่า ${pick(['เขาไม่ยอมกินเนื้อ','เธอพูดกับนกได้','เขาไม่เคยเข้าเมืองใหญ่','เธอนอนบนต้นไม้'])} และมองคุณเหมือนเคยรู้จักกันมานาน`,'epic',true)},1);
ev(4,0,s=>A1(s)&&s.sv.bx&&s.sv.bx.rb&&s.sv.bx.rb.st===1&&s.sv.bx.rb.y>=3,()=>{const x=BX(),P=x.rb,b=P.b,g=S.sv;P.st=3;
 const o=[O('🤝 สาบานเป็นพี่น้อง','',()=>{P.st=2;S.fame+=120;joy(15);log(`🤝 คุณกับ${esc(P.n)}ดื่มเหล้าจอกเดียวกัน สัตว์${tName(6)}กับมนุษย์ เป็นพี่น้องกันครั้งแรกในประวัติศาสตร์ทวีป`,'myth',true)}),
  O('⚔️ ท้าประลอง','ดูว่าสัตว์ระดับนี้แรงแค่ไหน',()=>duel(P.n,Math.round(total()*1.4),w=>{if(!S.alive)return;if(w){S.fame+=250;P.st=2;log(`🏆 ${esc(P.n)}ล้มลงแล้วหัวเราะ "ข้าแพ้มนุษย์ครั้งแรก" กลายเป็นเพื่อนกันตั้งแต่วันนั้น`,'myth',true)}else{HP(40);P.st=4;log(`🩸 ${esc(P.n)}ชนะแล้วเดินจากไป "ยังไม่ถึงเวลา"`,'bad',true)}}))];
 if(g.rings.length<9)o.unshift(O('⭕ รับข้อเสนอของมัน','มันจะทิ้งร่างมนุษย์เพื่อเป็นวงแหวน',()=>{log(`🕯️ ${esc(P.n)}ยิ้มเป็นครั้งสุดท้ายในร่างคน`,'myth',true);crisis(6,b,{willing:1,mult:1.25})}));
 choice(`🌲 ความลับของ${esc(P.n)}`,`${esc(P.n)}พาคุณมาที่${b[5]}แล้วบอกความจริง เขาคือ ${b[1]} <b>${b[0]}</b> สัตว์วิญญาณ${tName(6)}ที่ทิ้งร่างเดิมมาเกิดเป็นคน "ข้าเลือกเดินทางนี้เพื่อตามหาคนที่จะเป็นเจ้าของข้า ข้าเลือกเจ้า"`,o)});

// ---------- 6) แค้นเผ่าสัตว์ ----------
ev(3,5,s=>A1(s)&&s.sv.bx&&s.sv.bx.curse&&s.age-s.sv.bx.curse.a>=2,()=>{const x=BX(),C=x.curse;C.k++;C.a=S.age;
 choice(`🐾 เผ่าของ${C.n}`,pick([`กลางดึก ฝูงสัตว์วิญญาณล้อมบ้านคุณไว้ทั้งหลัง พวกมันจำกลิ่นเลือดของ${esc(C.n)}ได้`,`ระหว่างเดินทาง ทั้งขบวนม้าหยุดนิ่ง มีอะไรบางอย่างขวางอยู่บนถนน มันมาแก้แค้นแทน${esc(C.n)}`,`ลูกของ${esc(C.n)}โตแล้ว และมันมาหาคุณ`]),[
  O('⚔️ สู้','',()=>duel(`เผ่าของ${C.n}`,Math.round(total()*(1+C.k*.12)),w=>{if(!S.alive)return;if(w){S.fame+=60;if(C.k>=3){x.curse=null;log('🩸 ครั้งนี้ไม่มีตัวไหนกลับไป ความแค้นจบลงพร้อมเผ่าทั้งเผ่า','bad',true);S.karma-=20}else log('🩸 พวกมันถอยไป แต่จะกลับมาอีก','bad')}else{HP(50);if(Math.random()<.2){die(`ถูกเผ่าของ${C.n}ล้างแค้น`);return}log('🩸 คุณรอดมาได้เพราะพวกมันอยากให้คุณจำ','bad',true)}})),
  O('🙇 คุกเข่าขอขมา','สละพลังส่วนหนึ่ง',()=>{S.power=Math.max(0,S.power-pctPow(.15));x.af+=15;S.karma+=15;x.curse=null;log('🙇 คุณกรีดเลือดตัวเองลงดินแทนคำขอโทษ จ่าฝูงดมเลือดนั้นนาน แล้วพาเผ่าจากไป','good',true)}),
  O('🏃 หนีย้ายเมือง','',()=>{S.money=Math.max(0,S.money-R(2000,6000));log('🏃 คุณย้ายบ้านกลางดึก รู้ดีว่าย้ายกี่ครั้งก็ไม่พ้น','')})])});

// ---------- 7) ร้อยล้านปี · พันล้านปี — ลิขิตของทวีป ----------
ev(1,0,s=>A1(s)&&s.age>=30&&s.sv.lv>=80&&s.sv.rings.length>=6&&!(s.sv.bx&&s.sv.bx.t7)&&(afOf()>=82||Math.random()<.04),()=>{const x=BX();x.t7=S.age;
 if(S.sv.rings.length>=9){S.power+=pctPow(.5);S.fame+=1500;log('🌳 ต้นไม้สวรรค์ผู้มีจิตเรียกคุณไปพบ แต่วงแหวนเก้าวงคุณเต็มแล้ว มันมอบกระดูกวิญญาณร้อยล้านปีให้แทน','myth',true);return}
 chosen(7)},1);
ev(1,0,s=>A1(s)&&s.age>=50&&s.sv.lv>=93&&s.sv.bx&&(s.sv.bx.top||0)>=6&&!s.sv.bx.t8&&(afOf()>=88||Math.random()<.015),()=>{const x=BX(),g=S.sv,b=pick(GB[8]);x.t8=S.age;
 const o=[O('🏞️ ปฏิเสธ ขอเป็นผู้พิทักษ์ทวีปแทน','ได้ฉายาถาวร · สัตว์ทั้งทวีปเป็นมิตร',()=>{x.af=200;S.fame+=8000;S.karma+=60;try{S.title='ผู้พิทักษ์ทวีปจิตวิญญาณ'}catch(e){}log(`🏞️ <b>${b[0]}ก้มลงแตะหน้าผากคุณ</b> นับจากวันนี้ ไม่มีสัตว์วิญญาณตัวไหนในทวีปจะทำร้ายคุณอีก`,'myth',true)}),
  O('👶 ขอให้ไปเลือกลูกหลานของข้า','สืบทอดให้รุ่นต่อไป',()=>{S.karma+=30;S.fame+=3000;log(`🌱 ${b[0]}หัวเราะดังจนภูเขาสั่น "มนุษย์ที่ไม่เอาเอง ตกลง ข้าจะรอดูเด็กคนนั้น"`,'myth',true)})];
 if(g.rings.length<9)o.unshift(O(`⭕ รับเป็นวงแหวน${tName(8)}`,'พลังสูงสุดในทวีป · ร่างกายอาจรับไม่ไหว',()=>crisis(8,b,{willing:1,mult:1.2})));
 else o.unshift(O(`🔁 แทนที่วงแหวนวงที่อ่อนที่สุด`,'วงแหวนเดิมจะสลายไป',()=>{let k=0;g.rings.forEach((r,i)=>{if(r.t<g.rings[k].t)k=i});const old=g.rings.splice(k,1)[0];log(`🍂 วงแหวน${tName(old.t)}ของ${esc(old.b)}ค่อยๆ จางหายไป เปิดทางให้สิ่งที่ใหญ่กว่า`,'');crisis(8,b,{willing:1,mult:1.2})}));
 choice(`${b[1]} ${b[0]}`,`ทวีปทั้งทวีปเงียบลงในวินาทีเดียว น้ำในแม่น้ำหยุดไหล ${b[1]} <b>${b[0]}</b> สิ่งที่อยู่มาตั้งแต่ก่อนทวีปจะมีชื่อ ลืมตาขึ้น และมองมาที่คุณ<br><br>"<i>${pick(['ข้าดูมนุษย์มาพันล้านปี เจ้าเป็นคนแรกที่ทำให้ข้าอยากลงมาเดินด้วย','ข้าจะหลับอีกครั้ง ก่อนหลับ ข้าอยากรู้ว่าโลกผ่านตามนุษย์เป็นยังไง','ทุกตัวในป่าพูดถึงเจ้า ข้าเลยต้องมาดูเอง'])}</i>"<br><br><span class="tag2">${TIER[8][1]} วงแหวน${tName(8)} ทั้งทวีปมีได้แค่หนึ่ง</span>`,o)},1);

// ---------- หน้าดวงจิต: วงแหวนระดับสูง / สัญญา / สัตว์สถิตจิต ----------
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const g=S.sv,x=g.bx,m=$('modal');if(!m||!x)return r;const L=[];
 const gr=g.rings.filter(q=>q.gr);if(gr.length)L.push(...gr.map(q=>`${TIER[q.t][1]} ${tName(q.t)} · ${esc(q.b)}${q.aw?' ✨ตื่นรู้':''}${q.slp?' 🌙หลับอยู่':''}${q.seal?' 🔒ผนึกครึ่งหนึ่ง':''}${q.ev?' 🌠เติบโตแล้ว':''}`));
 if(x.pact)L.push(`📜 สัญญากับ${esc(x.pact.n)}: ${PACT[x.pact.k]}${x.pact.k==='dream'?` (${esc(x.pact.dr)})`:''} · รักษาแล้ว ${x.keep} ครั้ง`);
 if(x.inner)L.push(`${x.inner.ic} สัตว์สถิตจิต: ${esc(x.inner.n)} (${x.inner.y} ปี)`);
 if(x.rb&&x.rb.st===2)L.push(`🤝 พี่น้องร่วมสาบาน: ${esc(x.rb.n)}`);
 if(x.curse)L.push(`🐾 เผ่าของ${esc(x.curse.n)}ยังตามล่าคุณ`);
 const a=afOf();L.push(a>=85?'🌲 ป่าทั้งทวีปพูดถึงคุณ':a>=65?'🌿 สัตว์วิญญาณชอบกลิ่นคุณ':a>=40?'🍃 ป่ายังไม่แน่ใจในตัวคุณ':'🥀 สัตว์วิญญาณหลบเมื่อคุณเดินผ่าน');
 m.insertAdjacentHTML('beforeend',`<div class="svX"><h4>🌌 สัตว์วิญญาณระดับสูง</h4><div class="tag2" style="line-height:1.8">${L.join('<br>')}</div></div>`)}catch(e){console.error(e)}return r}}
})()}catch(e){console.error('block35g',e)}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul4 (เดิมอยู่ app.js บรรทัด 33547) · ห่อ: fight, duel, passYear ----
(function(){const SL=globalThis.__wSlots['soul4'];let fight=SL.base.fight;let duel=SL.base.duel;let passYear=SL.base.passYear;
try{(()=>{
const B=window._blk34,N=window._blk35;if(!B||!N||typeof EVENTS==='undefined')return;
const {SP,BEAST,TIER,spNow,capOf}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv);
const A1=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1);
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU);
const O=(t,s,f)=>({t,s,f});
const ev=(w,c,f)=>EVENTS.push({w,cd:0,once:0,c:s=>{try{return!!c(s)}catch(e){return false}},f(){try{f()}catch(e){console.error('b40 ev',e)}}});
const nmP=()=>anyName(Math.random()<.5?'ชาย':'หญิง');
const TYP={atk:['⚔️','นักรบหน้า'],def:['🛡️','โล่ใหญ่'],sup:['🌿','หมอประจำทีม'],ctrl:['🌀','ผู้คุมสนาม'],agi:['💨','สอดแนม']};
const TK=Object.keys(TYP);
const T=()=>{const g=S.sv;if(!g.tm)g.tm={m:[],rv:[],last:-99,titles:0,hist:[],cd:0,lost:0};return g.tm};
const alive=()=>T().m.filter(x=>x.al);
// ---------- โบนัสทีม ----------
function teamF(){if(!on()||S.sv.aw!==1)return 0;const L=alive();if(!L.length)return 0;let v=L.reduce((a,m)=>a+.012*(.6+m.bd/100),0);const ty=new Set(L.map(m=>m.t));if(ty.size>=3)v+=.03;if(ty.size>=5)v+=.05;return cl(v,0,.2)}
const COMBO=()=>{const ty=new Set(alive().map(m=>m.t));return ty.size>=5?'💠 ท่าประสานห้าสาย':ty.size>=3?'🔷 ท่าประสานสามสาย':null};
let in2=0;
{const _f=fight;fight=function(n,ep){try{if(!in2&&on())ep=ep*(1-teamF())}catch(e){}return _f.call(this,n,ep)}}
{const _d=duel;duel=function(n,ep,cb){try{if(on())ep=ep*(1-teamF())}catch(e){}in2=1;try{return _d.call(this,n,ep,cb)}finally{in2=0}}}
window._svTeamF=teamF;
// ---------- สร้างคน ----------
const ROLEN={atk:['เฉียว','บะ','ฉิน'],def:['ทับ','หม่า','แท่น'],sup:['หลิน','อุ่น','ใบบัว'],ctrl:['ยวี่','ซื่อ','เมฆา'],agi:['เหยี่ยว','ลม','ตะวัน']};
function mkMember(){const t=ch(TK),sp=ch(SP);const q=ch(['ชาวนาที่ได้ดวงจิตแปลกๆ','ลูกศิษย์ที่ถูกสำนักไล่ออก','นักเดินทางไร้สังกัด','เด็กกำพร้าจากหมู่บ้านที่ถูกบุก','อดีตทหารรับจ้าง','ผู้หลบหนีจากสำนักใหญ่']);return{n:nmP(),ic:sp[1],sp:sp[2],t,bd:R(30,55),al:1,q,y:S.age}}
function mkRival(i){const sp=ch(SP);return{n:nmP(),ic:sp[1],sp:sp[2],k:ch(['proud','kind','dark','proud','kind']),lv:R(2,6),rel:R(-20,20),al:1,pace:.6+Math.random()*1.0,stuck:0,i}}
function ensure(){const t=T(),g=S.sv;if(!t.init&&S.age>=8&&g.aw===1){t.init=1;t.rv=[mkRival(0),mkRival(1)];if(Math.random()<.6)t.rv.push(mkRival(2));
 log(`🎭 รุ่นเดียวกับคุณ มีเด็กที่ปลุกจิตพร้อมกันอีกหลายคน <b>${t.rv.map(r=>r.n).join(' · ')}</b> ชื่อพวกนี้จะตามคุณไปอีกนาน`,'',true)}}
const RK={proud:'ทะนงตัว',kind:'ใจดี',dark:'เจ้าเล่ห์'};
const relT=r=>r>=50?'เพื่อนสนิท':r>=20?'เป็นมิตร':r>-20?'คนรู้จัก':r>-50?'ไม่ถูกกัน':'ศัตรูคู่แค้น';
// ---------- รายปี ----------
function yr(){if(!on())return;const g=S.sv;if(g.aw!==1)return;ensure();const t=T();
 t.rv.forEach(r=>{if(!r.al)return;
  if(r.stuck>0)r.stuck--;else{r.lv=Math.min(100,r.lv+r.pace*(Math.random()<.5?1.4:.7));if(r.lv%10<r.pace&&r.lv>=10&&Math.random()<.5)r.stuck=R(1,4)}
  if(r.k==='kind'){if(g.kill>3)r.rel-=2;if(g.spared&&g.spared.length>=2)r.rel+=1}if(r.k==='dark'&&g.kill>3)r.rel+=1;if(r.k==='proud'&&g.lv>r.lv+15)r.rel-=1;
  r.rel=cl(r.rel,-100,100);
  if(r.lv>=30&&Math.random()<.025){r.al=0;t.hist.push(`${r.n} ตายในป่าตอนอายุ ${S.age}`);log(`🕯️ ข่าวมาถึงว่า <b>${r.n}</b> ${r.rel>=20?'เพื่อนเก่าคุณ':'คู่แข่งรุ่นเดียวกัน'}ตายระหว่างล่าวงแหวน — ${r.rel>=20?'คุณนั่งนิ่งอยู่นาน':'แปลกที่ไม่รู้สึกดีใจเลย'}`,'bad',true)}});
 alive().forEach(m=>{m.bd=cl(m.bd+(S.karma>=0?1:-1)+(Math.random()<.3?R(-2,2):0),0,100);
  if(m.bd<22&&Math.random()<.25){m.al=0;m.gone='betray';const r=t.rv.find(x=>x.al&&x.rel<0);if(r)r.lv=Math.min(100,r.lv+3);t.hist.push(`${m.n} ทรยศ`);log(`🗡️ <b>${m.n}</b> หายไปพร้อมแผนที่ป่าของทีม${r?` มีคนเห็นเขาเดินเข้าค่ายของ${r.n}`:''} คุณไม่ได้ดูแลเขาดีพอ`,'bad',true)}
  else if(Math.random()<.015&&S.age>=25){m.al=0;m.gone='old';log(`🕯️ <b>${m.n}</b> จากไปอย่างสงบ ทีมเหลือเก้าอี้ว่างหนึ่งตัว`,'',true)}});
 if(!t.cd&&alive().length<6&&S.age>=9&&Math.random()<.2&&!choice._cur)t.cd=0;
 if(t.cd>0)t.cd--}
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{yr()}catch(e){console.error('b40 yr',e)}return r}}
// ---------- รับสมาชิก ----------
ev(6,s=>A1(s)&&s.age>=9&&s.age<=70&&T().m.filter(x=>x.al).length<6&&!T().cd&&s.sv.lv>=3,()=>{const t=T(),m=mkMember(),ty=TYP[m.t];t.cd=3;
 choice(`🤝 ${m.ic} ${m.n} ขอร่วมทีม`,`${m.q} — ถือ <b>${m.sp}</b> (${ty[0]} ${ty[1]}) เขาบอกว่าได้ยินชื่อคุณมา ${alive().length?`ทีมคุณมี ${alive().length}/6 คน`:'คุณยังไม่มีทีมเลย'}`,[
  O('✅ รับเข้าทีม',`${ty[1]} · ความผูกพันเริ่มต้น ${m.bd}`,()=>{t.m.push(m);log(`🤝 ${m.ic} <b>${m.n}</b> เข้าร่วมทีม (${ty[1]}) ${alive().length===6?'— ครบหกคนแล้ว':''}`,'good',true)}),
  O('🧪 ทดสอบก่อน','เสี่ยงเสียใจเขา · ได้คนที่ภักดีกว่า',()=>{if(Math.random()<.65){m.bd+=18;t.m.push(m);log(`🧪 ${m.n}ผ่านการทดสอบโดยไม่บ่น คุณเห็นแววตาที่ไม่ยอมแพ้ และรับเขาเข้าทีม`,'good',true)}else{S.fame-=2;log(`🧪 ${m.n}เดินจากไปทั้งที่ยังไม่ได้พูดอะไร บางคนก็แค่ไม่ชอบถูกทดสอบ`)}}),
  O('🙅 ปฏิเสธ','ไม่เสียอะไร',()=>{log(`🙅 ${m.n}พยักหน้าแล้วเดินไปทางอื่น`)})])});
// ---------- วิกฤตทีม ----------
ev(4,s=>A1(s)&&alive().length>=2&&s.age>=14&&!T().cr||(A1(s)&&alive().length>=2&&s.age-(T().cr||0)>=8),()=>{const t=T(),L=alive(),m=ch(L);t.cr=S.age;const ty=TYP[m.t];
 choice(`${m.ic} ${m.n} มีเรื่องร้อนใจ`,ch([`${m.n}ถูกสำนักเก่าตามมาทวงหนี้ เขาไม่กล้าบอกคุณตรงๆ`,`${m.n}ติดอยู่ในป่าลึกและส่งสัญญาณขอความช่วยเหลือ`,`${m.n}กับ${ch(L.filter(x=>x!==m).concat([m])).n}ทะเลาะกันหนักจนทีมแตกเป็นสองฝั่ง`]),[
  O('🛟 ไปช่วยด้วยตัวเอง','ผูกพัน + · เสี่ยงเจ็บ',()=>{m.bd=cl(m.bd+20,0,100);S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15));log(`🛟 คุณไปถึงทันที ${m.n}ไม่พูดอะไรนอกจากกุมแขนคุณแน่น ตั้งแต่วันนั้นเขาไม่เคยเรียกคุณว่า "หัวหน้า" อีก`,'good',true)}),
  O('💰 จ่ายเงินแก้ปัญหา','เสียเงิน · ผูกพันเล็กน้อย',()=>{const c=Math.max(100,Math.round(S.money*.1));S.money=Math.max(0,S.money-c);m.bd=cl(m.bd+6,0,100);log(`💰 คุณเสียไป ${fmt(c)} ตำลึง ${m.n}พยักหน้ารับ แต่ไม่ได้ยิ้ม`)}),
  O('🎲 ให้เขาจัดการเอง','ผูกพัน − · อาจเก่งขึ้น',()=>{if(Math.random()<.5){m.bd=cl(m.bd+8,0,100);log(`🎲 ${m.n}จัดการเรื่องนั้นได้เองและกลับมาพร้อมแผลใหม่ที่ภูมิใจ`,'good',true)}else{m.bd=cl(m.bd-14,0,100);log(`🎲 ${m.n}กลับมาเงียบๆ ไม่มีใครถามว่าเกิดอะไรขึ้น`,'bad')}})])});
// ---------- ล่าร่วมทีม / สละชีพ ----------
{const _hx=window._svHuntX;window._svHuntX=function(g,i,safe,opts){if(_hx)_hx.apply(this,arguments);try{const L=alive();if(L.length>=2&&opts){const t=Math.min(3,safe),b=ch(BEAST[t]);
 opts.push(O(`👥 พาทีมไปล่า${b[0]}`,`ใช้ทีม ${L.length} คน · ศัตรูอ่อนลง · เสี่ยงเสียเพื่อน`,()=>{const ep=Math.max(5,Math.round(total()*[.35,.65,.95,1.25][t]*.8));
  duel(b[0],ep,w=>{if(w){const go=()=>B.absorb(t,b);if(window._svWin)window._svWin(t,b,go);else go();L.forEach(m=>m.bd=cl(m.bd+3,0,100))}
  else{const m=ch(L);if(Math.random()<.22+t*.04){m.al=0;m.gone='hunt';T().hist.push(`${m.n} ตายในป่า (${S.age})`);log(`🕯️ <b>${m.n}</b> ไม่ได้กลับมาจากป่า ทีมเหลือ ${alive().length} คน คุณไม่มีวันลืมสายตาที่เขามองคุณก่อนล้มลง`,'bad',true)}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));log(`🩸 ทีมถอยกลับอย่างทุลักทุเล ทุกคนเจ็บแต่ไม่มีใครตาย`,'bad')}}})}))}}catch(e){console.error('b40 hx',e)}}}
{const _dg=window._svDodge;window._svDodge=function(g){let r=false;try{r=_dg?_dg.apply(this,arguments):false}catch(e){}if(r)return true;try{const m=alive().filter(x=>x.bd>=80)[0];if(m){m.al=0;m.gone='sac';T().hist.push(`${m.n} สละชีพ (${S.age})`);log(`${m.ic} <b>${m.n}</b> พุ่งเข้ามาขวางระหว่างคุณกับแรงระเบิดของวงแหวน เขาหันมายิ้มครั้งสุดท้าย แล้วทุกอย่างก็ขาวโพลน`,'myth',true);S.karma+=4;return true}}catch(e){}return false}}
// ---------- ศึกชิงยอดทวีป ----------
const FIL=['ผู้ท้าชิงจากสำนักเขาเมฆ','เจ้าของฉายาหมาป่าใต้','ศิษย์เอกแห่งหอเหล็ก','นักสู้จากเมืองท่า','หญิงสาวผู้ถือดวงจิตลึกลับ','ราชันนักสู้แห่งลุ่มน้ำ','ผู้ชนะปีก่อนของแคว้นตะวันตก','ลูกชายเจ้าเมือง'];
function bracket(){const t=T(),rv=t.rv.filter(r=>r.al).sort((a,b)=>b.lv-a.lv),f=FIL.slice().sort(()=>Math.random()-.5);
 // 3 รอบ: รอบแรกคนทั่วไป รอบสองคู่แข่งหรือตัวเต็ง รอบชิงคู่แข่งอันดับหนึ่งหรือแชมป์เก่า
 const r1={n:f[0],lv:Math.max(3,S.sv.lv-R(8,18)),rv:0},r2=rv[1]?{n:rv[1].n,lv:rv[1].lv,rv:rv[1]}:{n:f[1],lv:S.sv.lv-R(0,8),rv:0},r3=rv[0]?{n:rv[0].n,lv:Math.max(rv[0].lv,S.sv.lv-6),rv:rv[0]}:{n:f[2],lv:S.sv.lv+R(-3,6),rv:0};
 return[r1,r2,r3]}
const RN=['รอบแปดคน','รอบรองชนะเลิศ','รอบชิงชนะเลิศ'];
function ep(o,i){const base=total()*(.7+i*.22+cl((o.lv-S.sv.lv)/60,-.25,.5));return Math.max(5,Math.round(base))}
function champ(){const t=T(),g=S.sv;t.last=S.age;const br=bracket();let rd=0;const years=t.titles;
 const fin=(win,top)=>{if(win){t.titles++;const f=[200,400,900,2000][Math.min(3,t.titles-1)];S.fame+=f;S.money+=Math.round(f*20);S.karma+=2;
  try{const c=LS.get('murim_svchamp',0)||0;LS.set('murim_svchamp',c+1)}catch(e){}
  t.hist.push(`ชนะศึกชิงยอดทวีป (${S.age})`);log(`🏆 <b>แชมป์ศึกชิงยอดทวีป!</b> คุณชูมือขึ้นกลางสนามที่คนเต็มทุกที่นั่ง ชื่อคุณถูกแกะลงเสาหิน ${t.titles>1?`ครั้งที่ ${t.titles}`:'เป็นครั้งแรก'} · ชื่อเสียง +${f}`,'myth',true)}
  else{S.fame+=top?60:15;log(`🥈 คุณตกรอบที่ ${rd}${top?' — ห่างจากถ้วยแค่ลมหายใจ':''} ผู้ชนะปีนี้คือ ${top?br[2].n:'ใครสักคนที่คุณไม่รู้จัก'}`,'',true)}};
 const round=()=>{const o=br[rd],r=o.rv;
  const run=mult=>{duel(o.n,Math.max(5,Math.round(ep(o,rd)*mult)),w=>{if(w){rd++;if(r){r.rel+=r.k==='proud'?-6:8;if(rd===3&&r.k==='dark'&&Math.random()<.3){r.rel-=30}}
    S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.08));if(rd>=3)fin(true);else{log(`⚔️ ชนะ${o.n} ผ่านเข้า<b>${RN[rd]}</b>`,'good');setTimeout(()=>{try{round()}catch(e){console.error('b40 round',e)}},350)}}
   else{if(r)r.rel+=r.k==='kind'?10:-8;S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15));rd++;rd=rd-1;fin(false,rd===2);}})};
  const opts=[O('⚔️ ลงสนาม','สู้ตามปกติ',()=>run(1))];
  if(r&&r.rel>=45&&rd===2)opts.push(O(`🤝 ${r.n}ขอแพ้ให้`,'เขาเป็นเพื่อนคุณ · ชนะง่ายแต่ชื่อเสียงลด',()=>{r.rel+=15;S.fame-=40;rd=3;log(`🤝 ${r.n}วางอาวุธกลางสนาม "คราวนี้ถ้วยเป็นของเจ้า ครั้งหน้าข้าไม่ยอมนะ"`,'good',true);fin(true)}));
  if(g.lv>=40&&COMBO())opts.push(O(`${COMBO()} ประสานทีม`,'ทีมช่วยส่งท่า · ศัตรูอ่อนลงเพิ่ม · ทีมเหนื่อย',()=>{alive().forEach(m=>m.bd=cl(m.bd+2,0,100));run(.78)}));
  opts.push(O('🚪 ถอนตัว','เสียหน้า',()=>{S.fame-=10;log('🚪 คุณเดินออกจากสนามก่อนระฆังดัง ผู้ชมโห่','bad')}));
  choice(`🏟️ ศึกชิงยอดทวีป · ${RN[rd]}`,`คู่ต่อไป: <b>${o.n}</b> ${o.rv?`(${relT(o.rv.rel)} · ${RK[o.rv.k]})`:''} ระดับจิตราว ${Math.round(o.lv)} ${rd?`<br>คุณผ่านมาแล้ว ${rd} รอบ เจ็บตัวสะสม`:''}`,opts)};
 round()}
ev(14,s=>A1(s)&&s.age>=20&&s.age-T().last>=10&&s.sv.lv>=15,()=>{const t=T();
 choice('🏟️ ศึกชิงยอดทวีป เปิดรับสมัคร',`สิบปีหนึ่งครั้ง ผู้ฝึกจิตทั่วทวีปมารวมกันที่เมืองกลาง ${t.titles?`คุณเคยได้แชมป์มาแล้ว ${t.titles} ครั้ง`:'คุณยังไม่เคยได้ถ้วย'} ${t.rv.filter(r=>r.al).length?`<br>ชื่อที่คุณรู้จักอยู่ในรายชื่อ: ${t.rv.filter(r=>r.al).map(r=>r.n).join(' · ')}`:''}`,[
  O('📝 ลงชื่อแข่ง','สามรอบ · เจ็บตัว · ชื่อเสียงสูง',()=>champ()),
  O('👀 ไปนั่งดู','ได้เห็นคู่แข่ง · ไม่เสี่ยง',()=>{t.last=S.age;t.rv.filter(r=>r.al).forEach(r=>r.rel+=r.k==='kind'?3:0);log('👀 คุณนั่งดูจากที่นั่งสูง จดจำท่วงท่าของคนที่คุณจะต้องเจอในสิบปีข้างหน้า',''); S.int+=1}),
  O('🙈 ไม่สน','',()=>{t.last=S.age-4})])});
// ---------- เจอคู่แข่ง ----------
ev(5,s=>{if(!A1(s)||s.age<13)return false;const t=T();return t.rv.some(r=>r.al&&!r.met)&&(s.age-(t.lastMeet||0)>=7)},()=>{const t=T(),r=t.rv.filter(x=>x.al&&!x.met).sort((a,b)=>b.lv-a.lv)[0];if(!r)return;r.met=1;t.lastMeet=S.age;const g=S.sv;
 const stage=r.lv>g.lv+5?'ผู้ที่ทิ้งคุณไปไกล':r.lv<g.lv-5?'ผู้ที่ตามคุณไม่ทัน':'คู่คี่คุณพอดี';
 choice(`${r.ic} เจอ ${r.n} อีกครั้ง`,`${r.n} (${RK[r.k]}) — ${stage} ระดับจิตราว ${Math.round(r.lv)} ถือ <b>${r.sp}</b> สายตาของเขามองคุณเหมือนเคย`,[
  O('⚔️ ประลองเป็นการฝึก','ผูกพัน/ความเกลียดขึ้นกับผลลัพธ์',()=>{duel(r.n,Math.max(5,Math.round(total()*(.7+cl((r.lv-g.lv)/50,-.3,.5)))),w=>{if(w){r.rel+=r.k==='proud'?-10:5;S.fame+=15;log(`⚔️ คุณชนะ${r.n} เขาเงียบแล้วพูดว่า "ครั้งหน้า"`,'good')}else{r.rel+=r.k==='proud'?-5:8;S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.1));log(`⚔️ ${r.n}ชนะ แต่ยื่นมือมาให้ลุก`,'')}})}),
  O('🍶 ชวนดื่ม คุยกัน','ความสัมพันธ์ + · ได้ข่าวป่า',()=>{r.rel=cl(r.rel+15,-100,100);S.int+=1;log(`🍶 ${r.n}เล่าเรื่องวงแหวนที่เขาล่ามา คุณเล่าเรื่องคุณ ทั้งคู่ต่างไม่ได้พูดความจริงทั้งหมด`,'',true)}),
  O('😒 ไม่คุยด้วย','ความสัมพันธ์ −',()=>{r.rel=cl(r.rel-12,-100,100);log(`😒 คุณเดินผ่านไป ${r.n}ไม่ได้ตามมา`)}),
  (r.rel<-30?O('🗡️ ซุ่มกำจัดเขาตอนนี้','ฆ่าคู่แข่ง · กรรม −−',()=>{if(Math.random()<.5){r.al=0;S.karma-=20;t.hist.push(`${r.n} ถูกคุณปลิดชีพ`);log(`🗡️ ${r.n}ล้มลงที่ทางเปลี่ยว คุณกลับบ้านโดยไม่มีใครเห็น`,'bad',true)}else{r.rel=-100;S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.25));log(`🗡️ ${r.n}รอดและรู้ว่าเป็นฝีมือคุณ ตั้งแต่วันนั้นเขาไม่เคยลืม`,'bad',true)}}):null)].filter(Boolean))});
// ---------- หน้าทีม ----------
window.openSvTeam=function(){if(!on())return toast('ใช้ได้เฉพาะชีวิตในทวีปจิตวิญญาณยุทธ์');ensure();const t=T(),L=t.m;
 const bar=v=>`<div style="height:5px;background:#0004;border-radius:3px"><div style="height:5px;width:${v}%;background:linear-gradient(90deg,#6fd8ff,#b47bff);border-radius:3px"></div></div>`;
 const mem=L.length?L.map(m=>`<div class="item" style="opacity:${m.al?1:.5}"><b>${m.ic} ${esc(m.n)}</b> <span class="tag2">${TYP[m.t][0]} ${TYP[m.t][1]} · ${esc(m.sp)}${m.al?'':' · ✝ '+({betray:'ทรยศ',sac:'สละชีพ',hunt:'ตายในป่า',old:'จากไป'}[m.gone]||'')}</span>${m.al?bar(m.bd):''}</div>`).join(''):'<p class="tag2">ยังไม่มีทีม รอใครสักคนเดินเข้ามา</p>';
 const rv=t.rv.map(r=>`<div class="item" style="opacity:${r.al?1:.5}"><b>${r.ic} ${esc(r.n)}</b> <span class="tag2">${RK[r.k]} · ${r.al?'ระดับจิต ~'+Math.round(r.lv):'✝ เสียชีวิต'} · ${relT(r.rel)}</span></div>`).join('')||'<p class="tag2">—</p>';
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>👥 ทีมและคู่แข่ง</h3><p class="tag2">โบนัสทีม: ศัตรูอ่อนลง ${Math.round(teamF()*100)}%${COMBO()?' · '+COMBO():''} · แชมป์ศึกชิงยอดทวีป ${t.titles} ครั้ง</p><h4>ทีม ${alive().length}/6</h4>${mem}<h4>คู่แข่งรุ่นเดียวกัน</h4>${rv}${t.hist.length?`<h4>บันทึก</h4><div class="tag2" style="line-height:1.7">${t.hist.slice(-6).map(esc).join('<br>')}</div>`:''}<button class="gbtn" style="width:100%;margin-top:8px" onclick="openSoul()">⭕ กลับหน้าดวงจิต</button>`)};
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(on()){const m=$('modal');if(m&&!m.querySelector('.svTm'))m.querySelector('.gbtn')&&m.querySelector('.gbtn').insertAdjacentHTML('beforebegin','<button class="gbtn svTm" style="width:100%;margin-top:6px" onclick="openSvTeam()">👥 ทีม · คู่แข่ง · ศึกชิงยอด</button>')}}catch(e){}return r}}
window._blk40={T,teamF,alive,champ,mkMember,mkRival,ensure};
})()}catch(e){console.error('block40',e)}
SL.impl.fight=fight;fight=function(){return globalThis.fight.apply(this,arguments)};SL.impl.duel=duel;duel=function(){return globalThis.duel.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul5 (เดิมอยู่ app.js บรรทัด 35014) · ห่อ: fight, render, openSoul ----
(function(){const SL=globalThis.__wSlots['soul5'];let fight=SL.base.fight;let render=SL.base.render;let openSoul=SL.base.openSoul;const __G={fight:()=>fight,render:()=>render,openSoul:()=>openSoul},__S={fight:v=>{fight=v},render:v=>{render=v},openSoul:v=>{openSoul=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B||typeof EVENTS==='undefined')return;
const {SP,spNow,capOf}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pk=a=>a[Math.floor(Math.random()*a.length)];
const A1=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const O=(t,s,f)=>({t,s,f});
const G=()=>S.sv;
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const pw=p=>{S.power+=Math.max(1,Math.round(total()*p))};
const X=()=>{const g=G();if(!g.x)g.x={ac:{on:0,dec:0,tier:0,yr:0,best:99,N:40,grad:0,tc:''},arc:null,done:[],sr:[],city:{rep:0,lic:0},bal:0,god:0,cd:{}};return g.x};
// ---------- 1) สถาบันวิญญาณ ----------
const TIERS=[['สถาบันวิญญาณชั้นต้น','🏫',0,200],['สถาบันวิญญาณชั้นกลาง','🏛️',12,800],['สถาบันหลวงแห่งทวีป','🎓',25,2500]];
const TCH=['อาจารย์ใจดีที่สอนช้าแต่แน่น','ครูหนวดแพะผู้เข้มงวด','อาจารย์หญิงอดีตนักล่าที่เหลือแขนข้างเดียว','ผู้สอนหนุ่มที่ยังฝันอยากเป็นแชมป์'];
function acEnter(){const g=G(),x=X(),a=x.ac;const maxT=g.lv>=25?2:g.lv>=12?1:0;const o=[];
 for(let t=maxT;t>=0;t--){const T=TIERS[t];o.push(O(`${T[1]} เข้า${T[0]}`,`ค่าเล่าเรียน ${T[3]} ตำลึง · ฝึกได้ถึงอายุ 18`,()=>{if(S.money<T[3]){log('🏫 เงินไม่พอจ่ายค่าเล่าเรียน');a.dec=1;return}S.money-=T[3];a.on=1;a.dec=1;a.tier=t;a.yr=0;a.N=40+t*25;a.tc=pk(TCH);log(`${T[1]} คุณเข้า<b>${T[0]}</b> ครูประจำชั้นคือ ${a.tc}`,'good')}))}
 o.push(O('⛰️ ฝึกเองนอกสถาบัน','ไม่เสียเงิน · ได้อิสระ',()=>{a.dec=1;S.cha+=2;log('⛰️ คุณปฏิเสธใบสมัครและฝึกเอง')}));
 choice('🏫 สถาบันวิญญาณเปิดรับ',`ผู้ปลุกจิตวัยสิบสองเข้าสถาบันได้ ระดับจิตคุณ ${g.lv} ${maxT===2?'สถาบันหลวงเปิดประตูให้คุณ':maxT===1?'— พอเข้าชั้นกลางได้':'— เข้าได้แค่ชั้นต้น'}`,o)}
function acExam(){const g=G(),a=X().ac,T=TIERS[a.tier];
 const run=b=>{const z=(g.lv*1.1+S.int*.4+b+R(0,30))/(50+a.tier*40);const rk=cl(Math.round(a.N*(1.15-z*.9)),1,a.N);a.best=Math.min(a.best,rk);
  log(`📝 สอบประจำปี ${a.yr}: <b>อันดับ ${rk}/${a.N}</b> ของ${T[0]}${rk<=3?' 🏅':''}`,rk<=3?'good':'');if(rk<=3){S.fame+=300;S.int+=1}};
 choice(`📝 สอบประจำปี · ${T[0]}`,`ปีที่ ${a.yr} ผู้เข้าสอบ ${a.N} คน ข้อสอบมีทั้งทฤษฎีวงแหวนและภาคสนาม`,[
  O('📖 ติวหนักทั้งคืน','คะแนน +',()=>{run(14);S.int+=1}),O('😎 ใช้ฝีมือล้วน','ปกติ',()=>run(0)),
  O('📋 แอบดูข้อสอบ (เสี่ยง)','คะแนน ++ · ถ้าโดนจับเสียชื่อ',()=>{if(roll01(.35)){S.fame-=200;S.karma-=4;a.best=Math.max(a.best,a.N);log('📋 โดนจับได้ ผลสอบถูกยกเลิก','bad')}else run(30)})])}
function acGrad(){const a=X().ac;a.on=0;a.grad=1;const r=a.best,top=r<=3,hi=r<=Math.ceil(a.N*.1);
 log(`🎓 คุณจบจาก<b>${TIERS[a.tier][0]}</b> ที่ดีที่สุดคืออันดับ ${r<99?r:'—'}${top?' — บัณฑิตเกียรตินิยม':''}`,top?'epic':'good',true);
 if(top){S.fame+=1500;S.money+=5000;pw(.06);X().city.rep+=15}else if(hi){S.fame+=600;S.money+=1500;pw(.03);X().city.rep+=6}else{S.fame+=100;X().city.rep+=1}}
const ACE=[
 {id:'acT',c:()=>X().ac.on,w:1,cd:5,t:'🧑‍🏫 ครูเรียกพบ',tx:()=>`${X().ac.tc} เรียกคุณไปพบหลังเลิกเรียน แววตาจริงจัง`,o:[
  O('ขอเรียนพิเศษ','ฝึกเร็วขึ้น',()=>{if(G().lv<capOf(G()))G().lv++;S.int+=2;log('🧑‍🏫 ครูสอนท่าที่ไม่มีในตำรา','good')}),O('ปฏิเสธ ไม่อยากเด่น','',()=>log('🧑‍🏫 ครูถอนหายใจแล้วปล่อยไป'))]},
 {id:'acR',c:()=>X().ac.on,w:1,cd:6,t:'⚔️ รุ่นเดียวกันท้า',tx:()=>'นักเรียนอันดับต้นๆ ของรุ่นท้าคุณประลองหลังหอพัก',o:[
  O('รับคำท้า','',()=>{if(fight('คู่แข่งในสถาบัน',Math.round(total()*.9))){S.fame+=250;X().ac.best=Math.max(1,X().ac.best-1);log('⚔️ คุณชนะต่อหน้าเพื่อนทั้งรุ่น','good')}else{hurt(.1);log('⚔️ คุณแพ้ แต่เห็นช่องว่างที่ต้องปิด');S.int+=1}}),O('ปฏิเสธ','',()=>{S.fame-=30})]}];
// ---------- 2) ทีม: เคมีบทบาท + การตัดสินใจร่วม ----------
const SYN=[['def','sup'],['atk','ctrl'],['agi','atk'],['ctrl','sup'],['def','agi']];
const tm=()=>{const t=G().tm;return t?t.m.filter(m=>m.al):[]};
const chem=()=>{const ty=new Set(tm().map(m=>m.t));let n=0;for(const[a,b]of SYN)if(ty.has(a)&&ty.has(b))n++;return n};
{const _f=fight;fight=function(n,ep){try{if(A1()&&tm().length>=2)ep=ep*(1-Math.min(.08,.02*chem()))}catch(e){}return _f.call(this,n,ep)}}
const TME=[
 {id:'tmRing',c:()=>A1()&&tm().length>=2&&G().lv>=20,w:1,cd:15,t:'💍 ถ้ำสัตว์อสูรล้ำค่า',tx:()=>'ทีมพบถ้ำสัตว์หมื่นปีที่ตายแล้ว เหลือแก่นวิญญาณเพียงชิ้นเดียว ทุกคนมองมาที่คุณ',o:[
  O('เก็บไว้ใช้เอง','พลัง +8% · ทีมเสียใจ',()=>{pw(.08);tm().forEach(m=>{m.bd=cl(m.bd-12,0,100)});log('💍 คุณหลอมแก่นนั้นเอง ทีมเงียบไปหลายวัน')}),
  O('ยกให้สมาชิกที่ใกล้ตัน','ผูกพัน ++ · ทีมแกร่งขึ้นถาวร',()=>{const m=pk(tm());m.bd=cl(m.bd+30,0,100);G().tm.m.forEach(z=>{});S.fame+=100;log(`💍 ${m.n}ร้องไห้และรับไว้ คำสัตย์ของเขาจะอยู่กับคุณ`,'good')}),
  O('แบ่งกันตามผลงาน','ผูกพัน +',()=>{tm().forEach(m=>{m.bd=cl(m.bd+8,0,100)});pw(.03);log('💍 ทุกคนได้ส่วนที่พอใจ')})]},
 {id:'tmOp',c:()=>A1()&&tm().length>=2&&G().lv>=10,w:1,cd:10,t:'📜 ภารกิจทีม',tx:()=>{const ty=new Set(tm().map(m=>m.t));return`ภารกิจคุ้มกันขบวนค้าผ่านป่าอันตราย ทีมคุณมี ${[...ty].map(k=>({atk:'นักรบ',def:'โล่',sup:'หมอ',ctrl:'ผู้คุม',agi:'สอดแนม'}[k])).join(' · ')}`},o:[
  O('วางแผนตามบทบาท','ได้เปรียบถ้ามีหลายสาย',()=>{const n=new Set(tm().map(m=>m.t)).size;if(roll01(.4+n*.1)){S.money+=2500;S.fame+=250;tm().forEach(m=>{m.bd=cl(m.bd+4,0,100)});log('📜 ภารกิจสำเร็จ ทุกบทบาททำหน้าที่ได้ครบ','good')}else{hurt(.12);S.money+=600;log('📜 ภารกิจพลาดช่วงกลาง แต่ทีมถอนตัวได้ครบ')}}),
  O('ลุยตรงๆ','เสี่ยงกว่า ได้มากกว่า',()=>{if(fight('โจรป่า',Math.round(total()*1.0*(1-Math.min(.08,.02*chem()))))){S.money+=3500;S.fame+=200;log('📜 คุณฝ่าโจรเข้าไป ขบวนค้าปลอดภัย','good')}else{hurt(.2);log('📜 ขบวนถูกปล้นไปครึ่งหนึ่ง')}})]}];
// ---------- 3) ดวงจิตคู่ + วงแหวนพิเศษ ----------
const DUE=[
 {id:'dual2',c:()=>A1()&&G().sp.length===1&&G().lv>=30&&Math.random()<.12,w:1,cd:40,once:1,t:'⭕⭕ ดวงจิตดวงที่สองตื่น',tx:()=>'ระหว่างฝึก มีแสงที่สองสว่างขึ้นในอกคุณ ดวงจิตอีกดวงที่ซ่อนอยู่มาตลอด',o:[
  O('ต้อนรับมัน','ได้พลังสองสาย · ดวงจิตจะขัดกันจนกว่าจะปรับสมดุล',()=>{const id=pk(SP.filter(z=>!G().sp.some(q=>q.id===z[0])))[0];G().sp.push({id,rev:0});X().bal=0;const p=spNow(G().sp[1]);log(`⭕⭕ ดวงจิตที่สองคือ <b>${p.ic} ${p.n}</b> แต่พลังสองดวงเริ่มกระทบกันในร่าง`,'myth')}),
  O('ข่มมันไว้','ปลอดภัย',()=>log('⭕ คุณกดแสงนั้นลงไป ร่างกายสงบอีกครั้ง'))]},
 {id:'bal',c:()=>A1()&&G().sp.length>1&&!X().bal&&S.age>=12,w:3,cd:4,t:'☯️ ปรับสมดุลดวงจิตคู่',tx:()=>'ดวงจิตสองดวงในร่างคุณยังขัดกัน ทำให้พลังสะดุดเป็นบางครั้ง',o:[
  O('นั่งสมาธิสามเดือน','ใช้ปัญญา',()=>{if(roll01(.3+S.int/220)){X().bal=1;pw(.1);log('☯️ แสงสองสายหมุนรวมเป็นหนึ่ง พลังคุณนิ่งและหนาแน่นขึ้น','epic')}else{S.int+=2;log('☯️ ยังไม่ลงตัว แต่เข้าใจมากขึ้น')}}),
  O('จ้างผู้ชำนาญ (3,000)','แน่นอนกว่า',()=>{if(S.money<3000)return log('☯️ เงินไม่พอ');S.money-=3000;X().bal=1;pw(.1);log('☯️ ผู้ชำนาญช่วยจัดเส้นพลังให้ลงตัว','good')}),O('ปล่อยไว้ก่อน','',()=>{})]}];
// ---------- 4) ศัตรูหลายตอน ----------
const ARCS={
 tyrant:{n:'ทรราชวิญญาณ',ic:'👁️',boss:'หลีโข่ว ทรราชวิญญาณ',min:20,c:()=>G().lv>=20,
  ch:['มีข่าวลือว่าผู้ครองดวงจิตนามหลีโข่ววางแผนกวาดต้อนผู้ปลุกจิตหนุ่มสาวไปเป็นเชื้อเพลิงฝึกพลัง','สมุนของหลีโข่วเข้ามาในเมืองคุณ ถามหาชื่อคุณตรงๆ','หลีโข่วส่งสารนัดคุณที่หุบเขาร้าง เขาบอกว่ามีเรื่องจะคุยกัน อาจเป็นกับดักหรือโอกาสสุดท้าย'],rw:['วงแหวนผู้ล้มทรราช','พลังที่ดึงมาจากเชื้อเพลิงของเขา',.12]},
 temple:{n:'วิหารผู้ตัดสิน',ic:'⚖️',boss:'ผู้ตัดสินแห่งวิหาร',min:25,c:()=>S.karma<-8||S.fame>=3000,
  ch:['องค์กรวิหารผู้ตัดสินส่งผู้สังเกตการณ์มาจับตาคุณ พวกเขาบันทึกทุกอย่างที่คุณทำ','วิหารยื่นเงื่อนไข: จ่ายค่าไถ่หรือยอมให้ตรวจดวงจิต ทีมของพวกเขาเริ่มกั้นเส้นทางคุณ','ผู้ตัดสินตัวจริงมาเอง ท่ามกลางผู้คนที่ต่างรอดูว่าคุณจะยืนหรือคุกเข่า'],rw:['วงแหวนผู้ไม่ถูกตัดสิน','พลังจากการยืนหยัดต่อวิหาร',.1]},
 mad:{n:'ผู้ครองดวงจิตที่เสียสติ',ic:'🌀',boss:'จักรพรรดิจิตผู้เสียสติ',min:50,c:()=>G().lv>=50,
  ch:['มีหมู่บ้านถูกทำลายในคืนเดียว ไร้ร่องรอยศัตรู ผู้รอดชีวิตพูดซ้ำเดียวว่า "แสงนั้นกำลังร้องไห้"','ร่องรอยนำไปสู่ผู้ครองดวงจิตอาวุโสที่พลังทะลักจนควบคุมไม่ได้ เขาจำชื่อคุณได้ในบางวินาที','เขาขอให้คุณจบเรื่องนี้ก่อนที่จะสายเกินไป ในขณะที่พลังเขากำลังโหมครั้งสุดท้าย'],rw:['วงแหวนผู้ปลดปล่อย','พลังที่เขาส่งต่อก่อนสิ้นสติ',.15]}};
function arcStep(){const x=X(),a=x.arc,d=ARCS[a.id];a.y=S.age;
 if(a.ch<3&&d.cs&&d.cs[a.ch]){d.cs[a.ch](a,d);return}
 if(a.ch>=3&&d.fin&&d.fin(a,d))return;
 if(a.ch<3){const tx=d.ch[a.ch];choice(`${d.ic} ${d.n} · ตอนที่ ${a.ch+1}/4`,tx,[
  O('🔍 สืบหาข้อมูล','ใช้ปัญญา · ได้เปรียบตอนจบ',()=>{if(roll01(.4+S.int/250)){a.k++;log('🔍 คุณได้ข้อมูลสำคัญที่คนอื่นไม่รู้','good')}else{a.p++;log('🔍 คุณไม่ได้อะไร และอีกฝ่ายรู้ตัวว่ามีคนสอดแนม')}a.ch++}),
  O('⚔️ ปะทะตรงๆ','เสี่ยงเจ็บ',()=>{if(fight(`สมุนของ${d.n}`,Math.round(total()*(.8+a.ch*.12)))){a.k++;S.fame+=200;log('⚔️ คุณชนะ และข่าวแพร่ไปเร็ว','good')}else{a.p++;hurt(.15);log('⚔️ คุณพ่ายแพ้และบาดเจ็บ ศัตรูแกร่งขึ้น')}a.ch++}),
  O('🤝 ขอความช่วยเหลือ','ทีม/เมืองช่วยได้ถ้ามี',()=>{const hp=tm().length>=2||X().city.rep>=10;if(hp){a.k++;log('🤝 ทีมและผู้รู้จักช่วยกันปิดทางหนีของฝ่ายตรงข้าม','good')}else{a.p++;log('🤝 ไม่มีใครกล้ายื่นมือ คุณต้องแบกเรื่องนี้ลำพัง')}a.ch++})]);return}
 const m=1.15+.1*a.p-.08*a.k;
 choice(`${d.ic} ${d.n} · ตอนจบ`,`<b>${d.boss}</b> ยืนอยู่ตรงหน้า${a.k>=2?' คุณมีข้อมูลและพันธมิตรพอที่จะต่อกรได้':a.p>=2?' คุณรู้ว่ามันสายไปแล้วสำหรับการเตรียมตัว':''}`,[
  O('⚔️ ดวลตัดสิน','ผู้ชนะได้ทุกอย่าง',()=>{duel(d.boss,Math.max(5,Math.round(total()*m)),w=>{if(w){x.arc=null;x.done.push(a.id);x.sr.push({n:d.rw[0],d:d.rw[1]});pw(d.rw[2]);S.fame+=3000;S.karma+=a.id==='tyrant'||a.id==='mad'?20:0;log(`${d.ic} <b>${d.boss}</b> ล้มลง คุณได้ <b>${d.rw[0]}</b>`,'myth')}else{hurt(.3);a.ch=3;a.y=S.age+6;log(`${d.ic} คุณแพ้ แต่รอดมาได้ ${d.boss}ยังรออยู่`,'bad')}})}),
  O('🏃 ถอยก่อน','รอเวลาอีก 6 ปี',()=>{a.y=S.age+6})])}
// ---------- 5) เมืองและสังคม ----------
const CE=[
 {id:'lic',c:()=>A1()&&S.age>=15&&!X().city.lic&&S.money>=1500,w:2,cd:8,t:'🪪 ใบอนุญาตล่าวิญญาณ',tx:()=>'สภาเมืองประกาศระเบียบใหม่ ใครล่าสัตว์วิญญาณโดยไม่มีใบอนุญาตมีโทษปรับ',o:[
  O('ซื้อใบอนุญาต (1,500)','ชื่อเสียงในเมือง +',()=>{S.money-=1500;X().city.lic=1;X().city.rep+=5;log('🪪 คุณได้ใบอนุญาตตัวจริง','good')}),O('ไม่สน','',()=>{})]},
 {id:'insp',c:()=>A1()&&S.age>=15&&!X().city.lic&&G().rings.length>=1,w:2,cd:9,t:'🕵️ ผู้ตรวจล่าวิญญาณ',tx:()=>'เจ้าหน้าที่หยุดคุณ ขอดูใบอนุญาตล่าที่คุณไม่มี',o:[
  O('จ่ายค่าปรับ (800)','',()=>{S.money=Math.max(0,S.money-800);S.fame-=30;log('🕵️ คุณจ่ายแล้วเดินต่อ')}),
  O('ติดสินบน (400)','เสี่ยงโดนจับ',()=>{if(S.money>=400&&roll01(.6)){S.money-=400;S.karma-=3;log('🕵️ เขารับเงินแล้วหันหลังให้')}else{S.fame-=100;S.money=Math.max(0,S.money-1200);log('🕵️ เขาไม่รับ และปรับหนักกว่าเดิม','bad')}}),
  O('หนี','ลุ้น',()=>{if(roll01(.5+(S.agi||0)/300)){log('🕵️ คุณหายเข้าตรอกก่อนใครทัน')}else{hurt(.1);S.money=Math.max(0,S.money-1500);log('🕵️ คุณถูกจับได้','bad')}})]},
 {id:'auc',c:()=>A1()&&S.money>=2000&&G().lv>=15,w:1,cd:10,t:'🔨 ประมูลถูกกฎหมาย',tx:()=>'งานประมูลวัสดุวิญญาณของสภาเมืองเปิดขึ้น ของที่ประมูลมีใบรับรองที่มา',o:[
  O('ประมูลชิ้นเล็ก (2,000)','พลัง +4%',()=>{S.money-=2000;pw(.04);X().city.rep+=2;log('🔨 คุณประมูลได้ของแท้','good')}),
  O('ประมูลชิ้นใหญ่ (5,000)','พลัง +10% · ถ้าเงินพอ',()=>{if(S.money<5000)return log('🔨 เงินไม่พอ');S.money-=5000;pw(.1);X().city.rep+=6;log('🔨 ชิ้นนี้แพงที่สุดของงาน และคุ้ม','epic')}),O('ดูเฉยๆ','',()=>{})]},
 {id:'law',c:()=>A1()&&S.age>=18,w:1,cd:14,t:'⚖️ กฎหมายใหม่ของทวีป',tx:()=>'สภาออกกฎห้ามผู้ปลุกจิตระดับสูงใช้ท่าทำลายล้างในเขตเมือง บางคนเห็นด้วย บางคนโวย',o:[
  O('ยืนข้างสภา','ชื่อเสียงในเมือง +',()=>{X().city.rep+=6;S.karma+=3;log('⚖️ คุณขึ้นพูดสนับสนุนต่อหน้าคนจำนวนมาก')}),
  O('คัดค้านพร้อมกลุ่มผู้ฝึก','ชื่อเสียง +',()=>{S.fame+=300;X().city.rep-=4;log('⚖️ คุณชูมือพร้อมกลุ่มผู้ฝึกที่เบื่อกฎ')}),O('นิ่งเฉย','',()=>{})]}];
// ---------- 6) ปลายทาง: สงครามอเวจี + ทดสอบเทพ ----------
function warGo(){const x=X();let k=0;const ph=['แนวหน้า','กลางสนาม','ศึกสุดท้าย'];let i=0;
 const step=()=>choice(`🛡️ สงครามอเวจี · ${ph[i]}`,'กองทัพอสูรจากอเวจีบุกทวีป ผู้ครองดวงจิตทั่วแผ่นดินถูกเรียกรวมพล',[
  O('⚔️ นำหน้าด้วยตัวเอง','เสี่ยงมาก',()=>{duel(`กองพลอสูร ${ph[i]}`,Math.round(total()*(1+i*.15)),w=>{if(w){k++;S.fame+=800}else hurt(.25);i++;if(i<3)setTimeout(step,300);else warEnd(k)})}),
  O('🧠 บัญชาการจากด้านหลัง','ปลอดภัย · ผลขึ้นกับปัญญา',()=>{if(roll01(.35+S.int/260))k++;i++;if(i<3)setTimeout(step,300);else warEnd(k)})]);step()}
function warEnd(k){const x=X();x.war=S.age;if(k>=2){x.done.push('war');x.sr.push({n:'วงแหวนวีรบุรุษแห่งทวีป',d:'ได้จากการปกป้องแผ่นดินจากอเวจี'});S.fame+=10000;S.money+=50000;pw(.15);log('🛡️ ทวีปรอดจากอเวจี ชื่อคุณถูกจารึกบนกำแพงเมือง','myth')}else{S.fame+=1500;hurt(.3);log('🛡️ ทวีปรอดมาได้ แต่ผู้คนล้มตายมาก คุณมีส่วนร่วมเพียงน้อยนิด')}}
function godTrial(){const x=X();x.tt=S.age;let ok=0;
 choice('🌟 ทดสอบเทพ · บทที่ 1: หัวใจ','ในความมืดไม่มีทางไป มีเพียงเสียงของตัวคุณเองที่เคยทำผิด',[
  O('ยอมรับทุกอย่าง','ผ่านถ้ากรรมไม่ต่ำเกินไป',()=>{if(S.karma>=-10){ok++;log('🌟 เงาคุณจางลงเมื่อคุณยอมรับมัน','good')}else log('🌟 เงานั้นหนักเกินกว่าจะยอมรับได้');next2()}),
  O('สู้กับเงา','ดวลกับตัวเอง',()=>{duel('เงาแห่งหัวใจ',Math.round(total()*1.1),w=>{if(w)ok++;next2()})})]);
 function next2(){choice('🌟 ทดสอบเทพ · บทที่ 2: พลัง','ผู้พิทักษ์ศาลเทพยืนขวางประตูแห่งเทวา',[
  O('ดวลเต็มกำลัง','ต้องชนะ',()=>{duel('ผู้พิทักษ์ศาลเทพ',Math.round(total()*1.5),w=>{if(w)ok++;next3()})})])}
 function next3(){choice('🌟 ทดสอบเทพ · บทที่ 3: การเสียสละ','ประตูสุดท้ายเรียกร้องสิ่งที่คุณยึดไว้แน่นที่สุด',[
  O('สละเงินและชื่อเสียงทั้งหมด','ผ่านแน่นอน',()=>{S.money=0;S.fame=Math.round(S.fame*.3);ok++;fin()}),
  O('สละพลังชีวิตไป 40%','ผ่านแน่นอน',()=>{S.maxHp=Math.round(S.maxHp*.6);S.hp=Math.min(S.hp,S.maxHp);ok++;fin()}),
  O('ปฏิเสธ','ไม่ผ่านบทนี้',()=>fin())])}
 function fin(){if(ok>=3){x.god=1;x.done.push('god');pw(.5);S.lifespan+=100;S.fame+=20000;x.sr.push({n:'ตำแหน่งเทพวิญญาณ',d:'ผู้ผ่านการทดสอบทั้งสามบท'});log('🌟 <b>คุณก้าวผ่านประตูเทวา</b> ระดับจิตไม่ใช่ปลายทางอีกต่อไป','myth')}else{S.fame+=500;hurt(.4);log(`🌟 คุณผ่านเพียง ${ok}/3 บท ประตูปิด กลับมาได้อีกครั้งใน 20 ปี`,'bad')}}}
const END=[
 {id:'war',c:()=>A1()&&G().lv>=70&&!X().done.includes('war')&&S.age-(X().war||-99)>=25,w:3,cd:0,t:'🛡️ อเวจีเปิดประตู',tx:()=>'ระฆังเตือนภัยดังทั่วทวีป ผู้ครองดวงจิตทุกคนถูกเรียกชื่อ',o:[O('ออกรบ','เลือกยุทธศาสตร์ก่อน',()=>(window._warGo2||warGo)()),O('ไม่ไป','เสียชื่อ',()=>{S.fame-=800;X().war=S.age})]},
 {id:'god',c:()=>A1()&&G().lv>=100&&!X().done.includes('god')&&S.age-(X().tt||-99)>=20,w:5,cd:0,t:'🌟 ประตูเทวาเปิด',tx:()=>'ระดับจิตคุณถึงขีดสุดแล้ว แสงจากเหนือฟ้าลงมาเรียกชื่อคุณ',o:[O('ก้าวเข้าไป','ทดสอบสามบท',()=>godTrial()),O('ยังไม่พร้อม','เลื่อนไป 20 ปี',()=>{X().tt=S.age})]}];
// ---------- ตัวสุ่ม ----------
const ALL=[...ACE,...TME,...DUE,...CE,...END];
const MSG=e=>typeof e.tx==='function'?e.tx():e.tx;
{const _rd=render;render=function(){const r=_rd.apply(this,arguments);try{if(A1()&&S._r3Y!==S.age&&!choice._cur&&!modalOpen&&!(typeof DU!=='undefined'&&DU)){S._r3Y=S.age;const g=G(),x=X(),a=x.ac;
  // ปีของสถาบัน
  if(a.on&&S.age>=18){acGrad();return r}
  if(a.on){a.yr++;if(g.lv<capOf(g)&&Math.random()<.5+a.tier*.15)g.lv++;S.int+=Math.random()<.4?1:0}
  // ดวงจิตคู่ขัดกัน
  if(g.sp.length>1&&!x.bal&&Math.random()<.1){hurt(.08);log('⭕⭕ ดวงจิตสองดวงกระทบกันในร่าง คุณเสียสมาธิไปครู่หนึ่ง')}
  // เข้าสถาบัน
  if(!a.dec&&S.age>=12&&S.age<=15){acEnter();return r}
  // สอบประจำปี
  if(a.on&&a.yr>=1&&S.age>=13&&S.age<=17){acExam();return r}
  // ตอนของศัตรู
  if(x.arc&&S.age>=x.arc.y+(x.arc.ch<3?4:0)&&S.age>=x.arc.y){arcStep();return r}
  if(!x.arc&&g.lv>=20&&Math.random()<.04){const ids=Object.keys(ARCS).filter(k=>!x.done.includes(k)&&ARCS[k].c());if(ids.length){const id=pk(ids);x.arc={id,ch:0,k:0,p:0,y:S.age};arcStep();return r}}
  // ปลายทางมีลำดับก่อน
  for(const e of END){let ok=false;try{ok=e.c()}catch(_){}if(ok&&Math.random()<.5){choice(e.t,MSG(e),e.o);return r}}
  // เหตุการณ์ทั่วไป
  if(Math.random()<.14){const pool=ALL.filter(e=>!END.includes(e)&&(!e.once||!x.cd[e.id])&&(x.cd[e.id]==null||S.age-x.cd[e.id]>=(e.cd||8))&&(()=>{try{return e.c()}catch(_){return false}})());if(pool.length){const e=pk(pool);x.cd[e.id]=S.age;choice(e.t,MSG(e),e.o)}}}}catch(e){console.error('sv3',e)}return r}}
// ---------- หน้าสรุป ----------
window.openSvMore=function(){if(!A1())return toast('ใช้ได้เฉพาะชีวิตในทวีปจิตวิญญาณยุทธ์');const g=G(),x=X(),a=x.ac;
 const ac=a.on?`${TIERS[a.tier][1]} ${TIERS[a.tier][0]} ปีที่ ${a.yr} · ดีที่สุดอันดับ ${a.best<99?a.best:'—'}/${a.N}`:a.grad?`🎓 จบจาก${TIERS[a.tier][0]} · ดีที่สุดอันดับ ${a.best<99?a.best:'—'}`:a.dec?'⛰️ ฝึกเอง':'ยังไม่ถึงวัยเข้าสถาบัน (12-15 ปี)';
 const arc=x.arc?`${ARCS[x.arc.id].ic} กำลังเผชิญ ${ARCS[x.arc.id].n} (ตอน ${Math.min(4,x.arc.ch+1)}/4)`:'ไม่มี';
 modal(`<button class="xbtn" onclick="openSoul()">←</button><h3>🌏 ชีวิตในทวีป</h3>
 <div class="item">🏫 <b>สถาบัน</b><br>${ac}</div>
 <div class="item">👥 <b>เคมีทีม</b><br>สมาชิก ${tm().length}/6 · คู่บทบาทเสริมกัน ${chem()}</div>
 <div class="item">⭕ <b>ดวงจิต</b><br>${g.sp.length>1?`ดวงจิตคู่ · ${x.bal?'ปรับสมดุลแล้ว (พลัง +10%)':'ยังขัดกัน มีเหตุการณ์ให้ปรับสมดุล'}`:'ดวงเดียว'}</div>
 <div class="item">🌠 <b>วงแหวนพิเศษ</b><br>${x.sr.length?x.sr.map(z=>`${z.n} — ${z.d}`).join('<br>'):'ยังไม่มี (ได้จากการล้มศัตรูหลายตอน/ศึกใหญ่)'}</div>
 <div class="item">⚔️ <b>ศัตรูหลายตอน</b><br>${arc}${x.done.length?'<br>ผ่านแล้ว: '+x.done.map(k=>(ARCS[k]&&ARCS[k].n)||({war:'สงครามอเวจี',god:'ทดสอบเทพ'}[k])).join(' · '):''}</div>
 <div class="item">🏙️ <b>เมือง</b><br>ชื่อเสียงในเมือง ${x.city.rep} · ใบอนุญาตล่า ${x.city.lic?'มี':'ไม่มี'}</div>
 <div class="item">🌟 <b>ปลายทาง</b><br>${x.god?'ผ่านการทดสอบเทพแล้ว':'ระดับจิต 100 → ประตูเทวา · ระดับ 70+ → สงครามอเวจี'}</div>`,'svmore')};
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{const m=$('modal');if(m&&A1()&&!m.querySelector('.svMore')){const e=document.createElement('button');e.className='gbtn svMore';e.style.cssText='width:100%;margin:6px 0';e.textContent='🌏 สถาบัน · ศัตรู · เมือง · ปลายทาง';e.onclick=()=>openSvMore();const h=m.querySelector('h3');if(h&&h.nextSibling)h.parentNode.insertBefore(e,h.nextSibling);else m.appendChild(e)}}catch(e){}return r}}
try{const g=window._guide2;if(g)g.add('world','🌏','ชีวิตในทวีปจิตวิญญาณยุทธ์ (ครบวงจร)','อายุ 12-15 เข้า<b>สถาบันวิญญาณ</b> (3 ชั้น) สอบประจำปีจนจบตอนอายุ 18 · ทีมที่มีบทบาทเสริมกันได้โบนัสเพิ่ม · ดวงจิตคู่ต้องปรับสมดุล · ศัตรู 3 กลุ่มที่มาเป็นตอนๆ ได้ <b>วงแหวนพิเศษ</b> · ใบอนุญาตล่า/ประมูล/กฎหมายของเมือง · Lv.70+ สงครามอเวจี · Lv.100 ประตูเทวา (ทดสอบ 3 บท) ดูสรุปที่ปุ่ม 🌏 ในหน้าดวงจิต','openSoul',()=>!!(S&&S.ch==='soul'))}catch(e){}
window._sv3={X,ARCS,acGrad,acExam,arcStep,godTrial,warGo};
})()}catch(e){console.error('sv3 block',e)}
__done=1;SL.impl.fight=fight;fight=function(){return globalThis.fight.apply(this,arguments)};SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};})();

// ---- ท่อน soul6 (เดิมอยู่ app.js บรรทัด 35158) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['soul6'];let render=SL.base.render;
try{(()=>{
const V3=window._sv3,B=window._blk34;if(!V3||!B)return;
const {X,ARCS}=V3;const {SP,spNow}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pk=a=>a[Math.floor(Math.random()*a.length)];
const A1=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const O=(t,s,f)=>({t,s,f});
const G=()=>S.sv;
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const pw=p=>{S.power+=Math.max(1,Math.round(total()*p))};
const tm=()=>{const t=G().tm;return t?t.m.filter(m=>m.al):[]};
const has=id=>G().sp.some(z=>z.id===id);
const hasT=t=>G().sp.some(z=>spNow(z).t===t);
const nm=()=>anyName(Math.random()<.5?'ชาย':'หญิง');
// ---------- 1) เรื่องของเพื่อนร่วมทีม ----------
const DR={heal:['อยากเป็นหมอที่รักษาโรคของแม่ให้หาย','แม่ของ{n}ล้มป่วยหนักขึ้น ยาในเมืองไม่พอ เขาขอยืมเงินและเวลา','{n}ถูกหมอหลวงปฏิเสธรักษาเพราะไม่มีเส้นสาย เขาเริ่มคิดทำเรื่องเสี่ยง','{n}เปิดร้านยาเล็กๆ ได้สำเร็จ','แม่ของ{n}หายป่วยแล้ว'],
 bro:['อยากเอาชนะพี่ชายที่ทิ้งบ้านไป','{n}ได้ข่าวพี่ชายถูกพบในเมืองท่า เขาเงียบไปทั้งคืน','{n}เจอพี่ชายแล้ว แต่พี่ชายเข้าร่วมกลุ่มที่คุณไม่ไว้ใจ','{n}และพี่ชายดวลกันครั้งสุดท้ายจนกว่าฝ่ายใดฝ่ายหนึ่งจะยอม','{n}และพี่ชายคืนดีกันได้แล้ว'],
 sis:['ตามหาน้องสาวที่พลัดหลงตอนสงคราม','{n}พบเบาะแสว่าน้องสาวอยู่ในหมู่บ้านทางเหนือ','{n}พบว่าน้องสาวจำเขาไม่ได้ และมีชีวิตใหม่แล้ว','{n}ต้องตัดสินใจว่าจะเข้าไปในชีวิตเธอหรือไม่','{n}ได้เจอน้องสาวและเธอจำเขาได้ในที่สุด'],
 prove:['อยากพิสูจน์ว่าดวงจิตของตนไม่ใช่ขยะ','{n}ถูกคนในสถาบันดูถูกต่อหน้า เขาหน้าแดงแต่ไม่พูดอะไร','{n}ฝึกหนักจนร่างพัง เขาไม่ยอมหยุด','{n}ขอให้คุณเป็นพยานการประลองที่เขารอมานาน','{n}ชนะการประลองที่รอมานาน'],
 school:['อยากสร้างโรงเรียนเล็กๆ ให้เด็กยากจนที่ปลุกจิตแล้วไม่มีใครสอน','{n}เก็บเด็กสามคนมาสอนในโรงนา เงินหมดแล้ว','{n}ถูกเจ้าที่ดินไล่ที่ เขาขอคำปรึกษา','{n}ตัดสินใจเปิดรับเด็กรุ่นแรกอย่างเป็นทางการ','โรงเรียนของ{n}เปิดรับเด็กรุ่นแรกแล้ว']};
const mst=m=>{if(!m.dr)m.dr=pk(Object.keys(DR));return m.dr};
const END_OK={heal:()=>{S.maxHp+=30;S.fame+=200},bro:()=>pw(.03),sis:()=>{S.karma+=8},prove:()=>pw(.04),school:()=>{S.fame+=500;X().city.rep+=10}};
function storyStep(){const L=tm().filter(m=>m.bd>=40&&(m.stc||0)<3&&S.age-(m.sty||-99)>=5);if(!L.length)return false;const m=pk(L),k=mst(m),d=DR[k],c=m.stc|0;m.sty=S.age;
 const tx=d[c+1].split('{n}').join(m.n);m.sc=m.sc|0;
 choice(`${m.ic} เรื่องของ ${m.n} · ${c+1}/3`,(c===0?`${m.n} ${d[0]} — `:'')+tx,[
  O('🤝 ช่วยเต็มที่','เสียเงิน/เวลา · ผูกพัน +',()=>{S.money=Math.max(0,S.money-500*(c+1));m.bd=cl(m.bd+10,0,100);m.sc+=2;log(`🤝 คุณช่วย ${m.n} เต็มกำลัง`,'good');m.stc=c+1;fin()}),
  O('💬 ให้กำลังใจ','ผูกพัน เล็กน้อย',()=>{m.bd=cl(m.bd+3,0,100);m.sc+=1;m.stc=c+1;fin()}),
  O('🙅 เรื่องส่วนตัวของเขา','ผูกพัน −',()=>{m.bd=cl(m.bd-10,0,100);m.sc-=1;m.stc=c+1;fin()})]);
 function fin(){if(m.stc<3)return;if(m.sc>=4&&m.bd>=50){m.dr_done=1;END_OK[k]();m.bd=100;log(`🌟 <b>${m.n}</b> ทำตามฝันสำเร็จ — ${d[4].split('{n}').join(m.n)} เขาขอบคุณคุณด้วยน้ำตา`,'epic')}else if(m.sc<=0||m.bd<35){m.al=0;m.gone='old';log(`🕯️ ${m.n}ไม่เหลือแรงใจ เขาเก็บของแล้วจากทีมไปเงียบๆ`,'bad')}else{log(`💭 ฝันของ${m.n}ยังไม่จบ แต่เขาเดินต่อ ทีมยังเป็นทีมเดิม`)}}
 return true}
function memoStep(){const t=G().tm;if(!t)return false;const m=t.m.find(z=>!z.al&&!z.mm&&(z.gone==='hunt'||z.gone==='sac'||z.gone==='betray'));if(!m)return false;m.mm=1;
 choice(`🕯️ ถึง ${m.n}`,{hunt:'ตายในป่า',sac:'สละชีพแทนคุณ',betray:'ทรยศทีม'}[m.gone]===undefined?'':`${m.n}${{hunt:'ตายในป่า',sac:'สละชีพแทนคุณ',betray:'ทรยศทีมและหายไป'}[m.gone]} ทีมที่เหลือมองมาที่คุณ รอคำตอบว่าจะทำอย่างไร`,[
  O('🕯️ จัดพิธีลา (500)','ทีมผูกพัน +',()=>{S.money=Math.max(0,S.money-500);tm().forEach(z=>{z.bd=cl(z.bd+6,0,100)});S.karma+=2;log(`🕯️ คุณจัดพิธีลา ${m.n} ให้สมเกียรติ`)}),
  O('⚔️ สาบานแก้แค้น','พลัง + · กรรม −',()=>{pw(.03);S.karma-=3;log('⚔️ คุณสาบานต่อหน้าทีมว่าจะไม่ปล่อยเรื่องนี้ไว้')}),
  O('🌫️ เก็บไว้ในใจ','ปัญญา +',()=>{S.int+=2;log('🌫️ คุณไม่พูดอะไร แต่จดจำทุกอย่าง')})]);return true}
function rvStep(){const t=G().tm;if(!t)return false;const r=t.rv.find(z=>z.al&&z.met&&!z.st&&G().lv>=15);if(!r)return false;r.st=1;
 if(r.k==='kind')choice(`${r.ic} ${r.n} ขอความช่วย`,`${r.n} คู่แข่งที่ใจดีที่สุดที่คุณเคยเจอ ส่งสารขอยืมเงินและแรงคุณ หมู่บ้านของเขาถูกสัตว์อสูรคุกคาม`,[
  O('ช่วยเต็มที่','ผูกพัน ++ · เสี่ยงเจ็บ',()=>{r.rel=cl(r.rel+25,-100,100);hurt(.12);S.karma+=8;S.fame+=200;log(`🤝 ${r.n}ไม่ลืมเรื่องนี้`,'good')}),O('ส่งเงินแทน (1,000)','',()=>{S.money=Math.max(0,S.money-1000);r.rel=cl(r.rel+10,-100,100)}),O('ปฏิเสธ','ผูกพัน −',()=>{r.rel=cl(r.rel-20,-100,100)})]);
 else if(r.k==='proud')choice(`${r.ic} ${r.n} ท้าตัดสิน`,`${r.n} คู่แข่งที่ทะนงที่สุด ประกาศท้าคุณต่อหน้าคนทั้งสถาบันเก่า ดวลเพื่อศักดิ์ศรี ไม่ใช่เพื่ออะไรอื่น`,[
  O('⚔️ รับคำท้า','ผลลัพธ์ตัดความสัมพันธ์',()=>{duel(r.n,Math.round(total()*(.8+cl((r.lv-G().lv)/60,-.3,.5))),w=>{if(w){r.rel=cl(r.rel-5,-100,100);S.fame+=500;log(`⚔️ ${r.n}ยอมรับความพ่ายแพ้ด้วยสีหน้าแข็งทื่อ`,'good')}else{r.rel=cl(r.rel+10,-100,100);hurt(.15);log(`⚔️ ${r.n}จับมือคุณหลังชนะ เป็นครั้งแรกที่เขายิ้ม`)}})}),
  O('🙅 ปฏิเสธอย่างสุภาพ','',()=>{r.rel=cl(r.rel-10,-100,100);S.fame-=50})]);
 else choice(`${r.ic} ${r.n} เสนอข้อตกลง`,`${r.n} คู่แข่งที่เจ้าเล่ห์ มาหาคุณคนเดียวตอนดึก เสนอจับมือกันขึ้นเป็นยอดทวีป โดยแลกกับการละเว้นเรื่องบางอย่างที่เขาเคยทำ`,[
  O('🤝 ตกลง','พลัง + · กรรม −',()=>{pw(.05);S.karma-=6;r.rel=cl(r.rel+15,-100,100);log('🤝 คุณจับมือเขา โดยรู้ว่ามือนั้นไม่เคยเป็นมิตรเลย')}),O('🚫 ปฏิเสธ','',()=>{r.rel=cl(r.rel-15,-100,100)}),
  O('📣 แฉเรื่องของเขา','ชื่อเสียง + · เขากลายเป็นศัตรู',()=>{S.fame+=300;r.rel=-80;log('📣 ข่าวแพร่ไปทั่ว และเขาไม่มีวันให้อภัย')})]);return true}
// ---------- 2) ศัตรูแต่ละกลุ่มมีกลไกเฉพาะ ----------
const fa=(a,d)=>choice;
ARCS.tyrant.cs=[
 (a,d)=>choice(`👁️ ทรราชวิญญาณ · ตอนที่ 1/4`,d.ch[0],[
  O('📣 เตือนคนในเมือง','ชื่อเสียงเมือง +',()=>{X().city.rep+=6;a.k++;log('📣 คนในเมืองเตรียมตัวทัน');a.ch++}),
  O('🔍 สืบหาที่ซ่อนตัว','ใช้ปัญญา',()=>{if(roll01(.4+S.int/250)){a.k++;log('🔍 คุณรู้ตำแหน่งฐานของเขาแล้ว','good')}else a.p++;a.ch++}),
  O('🙈 ไม่ยุ่ง','เขาแข็งแกร่งขึ้น',()=>{a.p++;a.ch++})]),
 (a,d)=>{const L=tm(),h=L.length?pk(L):null,hn=h?h.n:'เด็กน้อยที่คุณเคยช่วยไว้';
  choice(`👁️ ทรราชวิญญาณ · ตอนที่ 2/4`,`สมุนของหลีโข่วลักพา <b>${hn}</b> ไปเป็นตัวประกัน พร้อมจดหมายขู่`,[
   O('⚔️ บุกช่วยคนเดียว','เสี่ยงทั้งคู่',()=>{if(fight('ผู้คุมตัวประกัน',Math.round(total()*1.05))){a.k++;if(h)h.bd=cl(h.bd+20,0,100);log(`⚔️ คุณช่วย ${hn} ออกมาได้`,'good')}else{a.p++;hurt(.2);if(h&&Math.random()<.5){h.al=0;h.gone='sac';log(`🕯️ ${hn}ไม่รอด`,'bad')}else log('⚔️ คุณช่วยไม่สำเร็จ แต่เขายังมีชีวิตอยู่')}a.ch++}),
   O('💰 จ่ายค่าไถ่ (3,000)','ปลอดภัย · ศัตรูได้เงิน',()=>{if(S.money>=3000){S.money-=3000;a.p++;log(`💰 ${hn}กลับมาอย่างปลอดภัย แต่เงินเหล่านั้นเป็นเชื้อเพลิงของเขา`)}else{a.p++;log('💰 เงินไม่พอ ต้องปล่อยให้เวลาล่วงไป')}a.ch++}),
   O('👥 พาทีมเข้าไปด้วยกัน','ต้องมีทีม',()=>{if(tm().length>=2){a.k+=2;tm().forEach(z=>{z.bd=cl(z.bd+5,0,100)});log('👥 ทีมแยกกันเข้าไปแล้วช่วยได้ครบ','good')}else{a.p++;log('👥 คุณไม่มีทีมพอจะแยกกันเข้าไป')}a.ch++})])},
 (a,d)=>choice(`👁️ ทรราชวิญญาณ · ตอนที่ 3/4`,d.ch[2],[
  O('🪤 วางกับดักซ้อนกับดัก','ใช้ปัญญา',()=>{if(roll01(.35+S.int/230)){a.k+=2;log('🪤 กับดักของเขาถูกใช้กลับ','good')}else{a.p++;hurt(.15)}a.ch++}),
  O('👥 พาทีมไปรอบนอก','ทีม/เมืองช่วย',()=>{if(tm().length>=2||X().city.rep>=10){a.k++}else a.p++;a.ch++}),
  O('🚶 ไปคนเดียว','ชื่อเสียงสูงแต่เสี่ยง',()=>{S.fame+=300;a.p++;a.ch++})])];
ARCS.temple.cs=[
 (a,d)=>{a.ev=Math.max(0,Math.round(-S.karma/2+(G().kill||0)/2+(X().city.lic?0:5)));
  choice(`⚖️ วิหารผู้ตัดสิน · ตอนที่ 1/4`,`${d.ch[0]}<br>หลักฐานที่พวกเขามีต่อคุณตอนนี้: <b>${a.ev}</b>`,[
   O('📑 ซื้อพยานเท็จ (2,000)','หลักฐาน −8 · กรรม −',()=>{if(S.money>=2000){S.money-=2000;a.ev=Math.max(0,a.ev-8);S.karma-=3;log('📑 ปากคำที่ซื้อมา อาจช่วยหรืออาจเป็นหลักฐานใหม่')}else log('📑 เงินไม่พอ');a.ch++}),
   O('🏙️ ขอให้เมืองเป็นพยาน','ต้องมีชื่อเสียงเมือง',()=>{if(X().city.rep>=10){a.ev=Math.max(0,a.ev-10);a.k++;log('🏙️ สภาเมืองยืนยันความดีคุณ','good')}else log('🏙️ ไม่มีใครรู้จักคุณพอ');a.ch++}),
   O('🌫️ ไม่สนใจ','หลักฐานไม่ลด',()=>{a.ch++})])},
 (a,d)=>choice(`⚖️ วิหารผู้ตัดสิน · ตอนที่ 2/4`,`ศาลไต่สวนเปิดขึ้น หลักฐาน <b>${a.ev}</b> — ${a.ev>=12?'มากพอจะตัดสินให้คุณผิด':a.ev>=6?'ก้ำกึ่ง':'น้อยจนฝ่ายผู้ตัดสินหงุดหงิด'}`,[
  O('🧑‍⚖️ ต่อสู้คดี','ผลขึ้นกับหลักฐานและปัญญา',()=>{if(roll01(cl(.75-a.ev*.04+S.int/400,.1,.9))){a.k+=2;S.fame+=600;log('🧑‍⚖️ ศาลยกฟ้องเกือบทั้งหมด','epic')}else{a.p+=2;S.money=Math.round(S.money*.8);log('🧑‍⚖️ ศาลสั่งปรับหนัก','bad')}a.ch++}),
  O('💰 จ่ายค่าปรับยอมความ','เสียเงิน ศัตรูยังรออยู่',()=>{S.money=Math.round(S.money*.85);a.p++;a.ch++}),
  O('🏃 หนีก่อนศาลสั่ง','ถูกประกาศจับ',()=>{S.fame-=400;a.p+=2;a.ch++})]),
 (a,d)=>choice(`⚖️ วิหารผู้ตัดสิน · ตอนที่ 3/4`,d.ch[2],[
  O('🛡️ ยืนหยัด','ศักดิ์ศรี',()=>{a.k++;S.fame+=200;a.ch++}),O('🕊️ ยอมให้ตรวจดวงจิตจริงๆ','กรรมดี +',()=>{S.karma+=5;a.k++;a.ch++}),O('🥷 เตรียมแผนหนี','ปลอดภัยกว่า แต่ชื่อเสียงลด',()=>{S.fame-=100;a.ch++})])];
ARCS.mad.cs=[
 (a,d)=>{a.mad=1;choice(`🌀 ผู้ครองดวงจิตที่เสียสติ · ตอนที่ 1/4`,d.ch[0],[
  O('🔍 ตามรอยพลัง','ใช้ปัญญา',()=>{if(roll01(.4+S.int/250)){a.k++}else a.p++;a.ch++}),O('📖 หาตำราเรื่องดวงจิตแตก','ปัญญา +',()=>{S.int+=3;a.cure=(a.cure||0)+1;a.ch++}),O('🚪 ปล่อยให้ผู้อื่นจัดการ','เขาเสียสติหนักขึ้น',()=>{a.mad++;a.p++;a.ch++})])},
 (a,d)=>choice(`🌀 ผู้ครองดวงจิตที่เสียสติ · ตอนที่ 2/4`,d.ch[1],[
  O('🧘 พยายามปลอบและปรับสมดุลให้เขา','ได้ผลถ้ามีปัญญาหรือสมดุล',()=>{if(X().bal||S.int>=80||roll01(.3+S.int/300)){a.cure=(a.cure||0)+2;a.k++;log('🧘 เขาจำชื่อตัวเองได้ชั่วขณะ','epic')}else{a.mad++;hurt(.1);log('🧘 พลังของเขากระชากกลับมา')}a.ch++}),
  O('⚔️ ข่มด้วยกำลัง','เสี่ยงเจ็บ',()=>{if(fight('ผู้ครองดวงจิตที่เสียสติ',Math.round(total()*1.1))){a.k++;a.mad++}else{a.p++;hurt(.2)}a.ch++}),
  O('🛡️ อพยพชาวบ้านก่อน','ผู้คนปลอดภัย',()=>{S.karma+=10;X().city.rep+=4;a.ch++})]),
 (a,d)=>choice(`🌀 ผู้ครองดวงจิตที่เสียสติ · ตอนที่ 3/4`,d.ch[2],[
  O('🕯️ เตรียมพิธีปลดปล่อย','ใช้ได้ถ้าเตรียมมาแล้ว',()=>{if((a.cure||0)>=2)a.k++;else a.p++;a.ch++}),O('⚔️ เตรียมสู้ให้ถึงที่สุด','',()=>{a.k++;a.ch++}),O('🏃 ถอยให้พ้นวงพลัง','',()=>{a.p++;a.ch++})])];
ARCS.mad.fin=(a,d)=>{if((a.cure||0)<3)return false;
 choice('🌀 ผู้ครองดวงจิตที่เสียสติ · ตอนจบ','คุณมาถึงตรงหน้าเขาพร้อมวิธีที่ไม่ต้องฆ่า แสงในอกของเขากำลังร้องไห้',[
  O('🕯️ ปลดปล่อยดวงจิตของเขา','ไม่ต้องดวล · ตอบแทนมหาศาล',()=>{if(roll01(.55+S.int/400+(X().bal?.1:0))){X().arc=null;X().done.push('mad');X().sr.push({n:d.rw[0]+' (ช่วยชีวิต)',d:'เขายังมีชีวิตและกลายเป็นมิตร'});pw(.18);S.karma+=30;S.fame+=4000;log('🌀 เขาหลับตาอย่างสงบ แล้วลืมตาขึ้นเป็นคนใหม่ เขาเป็นมิตรคุณตลอดไป','myth')}else{hurt(.3);a.cure=0;log('🌀 พิธีไม่สำเร็จ เขากลับไปเป็นเหมือนเดิม','bad')}}),
  O('⚔️ ดวลจบเรื่องนี้','ทางปกติ',()=>{a.cure=0;a.y=S.age;arcStepFinal()})]);return true};
function arcStepFinal(){const x=X(),a=x.arc;if(!a)return;a.cure=0;V3.arcStep()}
// ---------- 3) ความรัก / ครอบครัว ----------
const LV=()=>X().lv;
const LE=[
 {id:'love1',c:()=>A1()&&S.age>=16&&S.age<=34&&!X().lv&&!X().lvDone,t:'💞 คนที่ทำให้หัวใจเต้นแรง',tx:()=>'ในวันธรรมดาๆ มีใครคนหนึ่งช่วยเก็บของที่คุณทำตก แล้วยิ้มให้โดยไม่รู้ว่าเขาทำให้ใจคุณเต้นเร็วแค่ไหน',o:[
  O('ทักทายและขอชื่อ','เริ่มความสัมพันธ์',()=>{X().lv={n:nm(),st:1,bd:20,y:S.age};log(`💞 เขาชื่อ <b>${X().lv.n}</b> และเขาดูเขินกว่าคุณเสียอีก`)}),O('เดินผ่านไป','',()=>{X().lvDone=1;log('💞 คุณคิดถึงเรื่องนั้นอีกหลายวัน')})]},
 {id:'love2',c:()=>A1()&&LV()&&LV().st===1&&S.age-LV().y>=2,t:'💞 นัดกับ',tx:()=>`${LV().n} ชวนไปเดินเล่นริมน้ำ`,cd:3,o:[
  O('พาไปที่ที่ชอบ','ผูกพัน +',()=>{LV().bd=cl(LV().bd+18,0,100);LV().y=S.age;log(`💞 ${LV().n}หัวเราะ และเล่าเรื่องที่ไม่เคยเล่าให้ใคร`)}),
  O('ซื้อของขวัญ (300)','ผูกพัน ++',()=>{if(S.money<300)return log('💞 เงินไม่พอ');S.money-=300;LV().bd=cl(LV().bd+22,0,100);LV().y=S.age}),O('ผัดไปก่อน (ฝึกอยู่)','ผูกพัน −',()=>{LV().bd=cl(LV().bd-8,0,100);LV().y=S.age;S.int+=1;if(LV().bd<=0){X().lv=null;X().lvDone=1}})]},
 {id:'love3',c:()=>A1()&&LV()&&LV().st===1&&LV().bd>=60&&S.age>=20,t:'💍 ถึงเวลาตัดสินใจ',tx:()=>`${LV().n} เงียบไปนานก่อนจะเอ่ยว่าอยากอยู่ข้างคุณไปนานกว่านี้`,o:[
  O('ตกลง แต่งงานกัน','พลังชีวิต + · ผูกมัด',()=>{LV().st=2;LV().y=S.age;S.maxHp+=30;S.fame+=200;S.karma+=3;log(`💍 คุณและ ${LV().n} แต่งงานกันท่ามกลางเพื่อนไม่กี่คน`,'epic')}),O('ขอเวลาอีกหน่อย','ผูกพัน −',()=>{LV().bd=cl(LV().bd-15,0,100)}),O('ปฏิเสธ','จบความสัมพันธ์',()=>{X().lv=null;X().lvDone=1;S.int+=1;log('💞 ทั้งสองแยกกันเดินอย่างเงียบๆ')})]},
 {id:'kid',c:()=>A1()&&LV()&&LV().st===2&&S.age-LV().y>=3&&!LV().kid,t:'👶 เสียงร้องแรก',tx:()=>`${LV().n} คลอดลูกในคืนที่ฝนตก`,o:[O('ตั้งชื่อลูก','ชีวิตเปลี่ยนไป',()=>{LV().kid=S.age;LV().kn=nm();S.karma+=3;S.maxHp+=10;log(`👶 ลูกชื่อ <b>${LV().kn}</b>`,'epic')})]},
 {id:'kid6',c:()=>A1()&&LV()&&LV().kid&&S.age-LV().kid>=6&&!LV().ka,t:'⭕ ลูกปลุกดวงจิต',tx:()=>`${LV().kn} อายุหกขวบแล้ว ลูกแก้วหกลูกวางรอบเด็กน้อย`,o:[
  O('อยู่เคียงข้าง','พิธีสำคัญ',()=>{LV().ka=1;const r=Math.random();if(r<.1){S.fame+=1500;log(`⭕ ลูกคุณปลุกดวงจิตระดับตำนาน ทั้งสถาบันพูดถึง`,'myth')}else if(r<.5){S.fame+=200;log('⭕ ลูกคุณปลุกดวงจิตระดับดี')}else log('⭕ ลูกคุณปลุกดวงจิตธรรมดา แต่ยิ้มกว้าง คุณกอดเขาแน่น')}),O('ไม่ได้ไป (ติดภารกิจ)','ผูกพัน −',()=>{LV().ka=1;LV().bd=cl(LV().bd-20,0,100);log('⭕ คุณกลับมาทีหลังและเห็นลูกนั่งรอที่ประตู')})]},
 {id:'par',c:()=>A1()&&S.age>=35&&!X().par,t:'🏡 จดหมายจากบ้าน',tx:()=>'พ่อแม่ที่ยังอยู่ในหมู่บ้านเดิมป่วยหนัก จดหมายเขียนด้วยลายมือที่สั่น',o:[
  O('กลับบ้านไปดูแล','ใช้เวลา · กรรมดี',()=>{X().par=1;S.karma+=12;S.int+=2;log('🏡 คุณกลับไปนั่งข้างเตียงสามคืน และได้ฟังเรื่องที่ไม่เคยรู้','epic')}),O('ส่งเงินและหมอ (2,000)','',()=>{X().par=1;S.money=Math.max(0,S.money-2000);S.karma+=4}),O('ไม่ว่าง','กรรมลด',()=>{X().par=1;S.karma-=6;log('🏡 คุณบอกตัวเองว่าจะไปทีหลัง')})]}];
// ---------- 4) เหตุการณ์ตามดวงจิต ----------
const SE=[
 {id:'s_hoe',c:()=>has('hoe'),t:'⛏️ ทุ่งนาแล้ง',tx:()=>'หมู่บ้านทางใต้แล้งจนน้ำบ่อแห้ง คนแก่เล่าว่าจอบอย่างของคุณเคยเปิดตาน้ำได้',o:[O('ตีลงดินทั้งวัน','เหนื่อย · กรรมดี',()=>{hurt(.1);S.karma+=10;S.fame+=300;log('⛏️ น้ำพุ่งขึ้นจากดินที่ยกขึ้น คนทั้งหมู่บ้านวิ่งมาดู','epic')}),O('เก็บค่าตอบแทน (1,500)','',()=>{S.money+=1500;S.karma-=2})]},
 {id:'s_candle',c:()=>has('candle'),t:'🕯️ แสงเทียนในสุสาน',tx:()=>'ค่ำคืนหนึ่ง เปลวเทียนคุณเอียงไปทางสุสานเก่า เหมือนมีบางอย่างเรียก',o:[O('ตามแสงไป','เสี่ยง · อาจได้ของล้ำค่า',()=>{if(roll01(.6)){S.karma+=8;pw(.04);log('🕯️ วิญญาณที่หลงทางมานาน ได้กลับบ้านในที่สุด และทิ้งของขวัญไว้ให้','epic')}else{hurt(.15);log('🕯️ มีบางอย่างในสุสานไม่ยอมให้คุณจากไปง่ายๆ')}}),O('ปล่อยไว้','',()=>{})]},
 {id:'s_cat',c:()=>has('cat'),t:'🐈 แมวพาไป',tx:()=>'แมวจรคุณ (หรือดวงจิต) กระโดดนำเข้าตรอกแล้วหยุดหน้ากำแพงหนึ่ง',o:[O('ทุบกำแพง','ได้ของลับหรือเรื่องใหญ่',()=>{if(roll01(.5)){S.money+=6000;log('🐈 หลังกำแพงมีกล่องของโจรเก่า','good')}else{S.fame-=100;log('🐈 หลังกำแพงคือบ้านของคนอื่น')}}),O('นั่งดูแมว','',()=>{S.int+=1})]},
 {id:'s_shadow',c:()=>has('shadow'),t:'👤 เงาที่พูดกับคุณ',tx:()=>'ในคืนเดือนมืด เงาคุณไม่ได้ขยับตามคุณ มันนั่งมองอยู่เฉยๆ',o:[O('คุยกับมัน','ปัญญา +',()=>{S.int+=4;log('👤 มันบอกว่ารู้ทุกเรื่องที่คุณเคยกลัวที่จะยอมรับ')}),O('ฟันมัน','ต่อสู้กับตัวเอง',()=>{if(fight('เงาตัวเอง',Math.round(total()*.95))){pw(.04);log('👤 เงานั้นสลายไป และคุณรู้สึกเบาขึ้น')}else{hurt(.15)}})]},
 {id:'s_mirror',c:()=>has('mirror'),t:'🪞 กระจกที่แสดงสิ่งที่ยังไม่เกิด',tx:()=>'กระจกโบราณคุณสั่นแล้วเงาในนั้นไม่ใช่คุณ',o:[O('มองให้ลึก','ได้ข้อมูลอนาคต',()=>{S.int+=3;X().cd.mir=1;log('🪞 คุณเห็นฉากหนึ่งที่ยังไม่เกิด และรู้ว่าต้องเตรียมตัวอย่างไร','epic')}),O('ปิดผ้า','',()=>{})]},
 {id:'s_fox',c:()=>has('fox'),t:'🦊 เก้าหางกับเกมหลอกลวง',tx:()=>'ดวงจิตจิ้งจอกคุณเสนอเกม: หลอกเจ้าหน้าที่ภาษีสักเรื่อง',o:[O('เล่นด้วย','เสี่ยง',()=>{if(roll01(.55)){S.money+=3000;log('🦊 เจ้าหน้าที่ไม่ทันสังเกตเลย','good')}else{S.fame-=150;S.money=Math.max(0,S.money-1000);log('🦊 เจ้าหน้าที่หน้าบึ้ง และค่าปรับมาถึงมือ')}}),O('ปฏิเสธ','กรรมดี +',()=>{S.karma+=2})]},
 {id:'s_bamboo',c:()=>has('bamboo'),t:'🎋 ลมพัดไม่ล้ม',tx:()=>'พายุใหญ่พัดผ่านเมือง ผู้คนหลบเข้าที่กำบัง ไผ่ในอกคุณสั่นไหวแต่ไม่หัก',o:[O('ยืนรับพายุเพื่อปกป้องคนอื่น','กรรมดี ++ · เจ็บ',()=>{hurt(.15);S.karma+=12;S.fame+=400;log('🎋 คุณยืนกลางลมและไม่ล้ม เด็กๆ จดจำภาพนั้นไปนาน')}),O('หลบเข้าที่กำบัง','',()=>{})]},
 {id:'t_atk',c:()=>hasT('atk')&&G().lv>=10,t:'⚔️ ศึกล้างตา',tx:()=>'ผู้ท้าชิงจากเมืองอื่นมาถึงพร้อมวงแหวนที่แรงกว่า',o:[O('รับศึก','พลัง + ถ้าชนะ',()=>{if(fight('ผู้ท้าชิงต่างเมือง',Math.round(total()*1.15))){pw(.04);S.fame+=300}else hurt(.2)}),O('เลี่ยง','',()=>{})]},
 {id:'t_def',c:()=>hasT('def')&&G().lv>=10,t:'🛡️ รับแทนผู้อื่น',tx:()=>'ผู้ปลุกจิตเด็กๆ ถูกสัตว์อสูรไล่ตามมาทางคุณ',o:[O('เป็นโล่ให้เด็กๆ','กรรมดี · เจ็บ',()=>{hurt(.2);S.karma+=10;S.maxHp+=15;log('🛡️ คุณยืนขวาง จนแผลที่หลังกลายเป็นเกียรติ')}),O('หนีไปก่อน','กรรมลด',()=>{S.karma-=5})]},
 {id:'t_sup',c:()=>hasT('sup')&&G().lv>=10,t:'🌿 โรคระบาดในหมู่บ้าน',tx:()=>'ไข้ร้อนแพร่ในหมู่บ้านใกล้เคียง ผู้คนเริ่มหนีเข้าเมือง',o:[O('ใช้ดวงจิตรักษา','เหนื่อย · กรรมดี +++',()=>{hurt(.12);S.karma+=15;S.fame+=500;log('🌿 คุณใช้เวลาสามวันสามคืนโดยไม่หลับ','epic')}),O('ส่งยาให้ผู้ดูแลเมือง','ปลอดภัย',()=>{S.money=Math.max(0,S.money-500);S.karma+=3})]},
 {id:'t_ctrl',c:()=>hasT('ctrl')&&G().lv>=10,t:'🌀 ฝูงสัตว์อสูรอาละวาด',tx:()=>'ฝูงหมาป่าเงินหลุดจากป่าลึก ใกล้เมืองเข้ามาแล้ว',o:[O('ใช้ดวงจิตควบคุมฝูง','ปัญญาเป็นตัวตัดสิน',()=>{if(roll01(.4+S.int/250)){S.fame+=500;pw(.03);log('🌀 ฝูงหมาป่านั่งลงเรียงแถวหน้าคุณ','epic')}else{hurt(.15);log('🌀 ควบคุมได้ไม่ครบ มีคนบาดเจ็บ')}}),O('ไล่ให้กลับเข้าป่า','',()=>{S.karma+=2})]},
 {id:'t_agi',c:()=>hasT('agi')&&G().lv>=10,t:'💨 ถ้ำใต้ผา',tx:()=>'มีถ้ำที่เข้าได้เฉพาะคนที่ตัวเบาพอจะเกาะหน้าผา',o:[O('ลอบสำรวจ','ได้ของล้ำค่า',()=>{if(roll01(.55+(S.agi||0)/300)){S.money+=5000;S.qi+=3;log('💨 คุณกลับขึ้นมาพร้อมของที่ไม่เคยมีใครเห็น','good')}else{hurt(.15)}}),O('ไม่เสี่ยง','',()=>{})]}];
// ---------- 5) ปลายทางแตกแขนง ----------
window._warGo2=function(){const x=X();
 choice('🛡️ สงครามอเวจี · เลือกยุทธศาสตร์','ผู้บัญชาการสภาทวีปให้คุณเลือกบทบาทของตัวเอง',[
  O('🧱 ตั้งรับที่กำแพงเมือง','ชื่อเสียงเมือง + · ปลอดภัยกว่า',()=>{x.city.rep+=12;x.warS='def';const w=Math.min(3,1+Math.floor(x.city.rep/15));endWar(w>=2?2:1,'กำแพงเมืองยืนหยัดจนผู้เสียหายน้อยที่สุด')}),
  O('🤝 รวมกำลังสามเมือง','ต้องมีชื่อเสียงเมือง',()=>{x.warS='ally';if(x.city.rep>=15){endWar(3,'สามเมืองรวมกำลังกันได้ทันเวลา')}else{endWar(1,'สามเมืองไม่ไว้ใจกัน ศึกยืดเยื้อ')}}),
  O('🗡️ ลอบสังหารผู้นำอสูร','เสี่ยงสุด ได้ผลที่สุด',()=>{x.warS='ass';duel('ผู้นำอสูรอเวจี',Math.round(total()*1.6),w=>{if(w){S.karma-=3;endWar(3,'ผู้นำอสูรล้มลงกลางค่าย กองทัพที่เหลือแตกพ่าย')}else{hurt(.35);endWar(1,'ภารกิจลอบสังหารล้มเหลว คุณหนีรอดมาได้')}})})])};
function endWar(k,tx){const x=X();x.war=S.age;
 if(k>=2){x.done.push('war');x.sr.push({n:'วงแหวนวีรบุรุษแห่งทวีป',d:tx});S.fame+=10000;S.money+=50000;pw(.15);log(`🛡️ ${tx} ชื่อคุณถูกจารึกบนกำแพงเมือง`,'myth')}else{S.fame+=1500;hurt(.3);log(`🛡️ ${tx} ทวีปรอดมาได้ แต่เสียหายหนัก`)}}
const GE={id:'godEnd',c:()=>A1()&&X().god&&!X().ge,t:'🌟 หลังประตูเทวา',tx:()=>'ประตูเปิดแล้ว แต่เส้นทางที่เหลือเป็นของคุณเลือก ภพเทพ ทวีปเดิม หรือชีวิตธรรมดา',o:[
  O('☁️ ก้าวสู่ภพเทพ','ตัดขาดจากทวีป',()=>{X().ge='ascend';S.lifespan+=500;pw(.4);S.fame+=30000;log('☁️ คุณก้าวผ่านแสง ทวีปเบื้องหลังเป็นแค่ความทรงจำ','myth')}),
  O('🛡️ เป็นผู้พิทักษ์ทวีป','อยู่ต่อ · โบนัสรายปี',()=>{X().ge='guard';X().city.rep+=50;S.karma+=30;log('🛡️ คุณปฏิเสธแสงนั้น และยืนอยู่บนกำแพงเมืองต่อไป','epic')}),
  O('🌾 ใช้ชีวิตธรรมดา','อายุยืนขึ้น · ใจสงบ',()=>{X().ge='mortal';S.lifespan+=80;S.maxHp+=100;S.karma+=20;log('🌾 คุณวางพลังลงและเดินกลับไปที่หมู่บ้านเดิม','epic')})]};
// ---------- ตัวสุ่ม ----------
const POOL=[...LE,...SE];
const mkTx=e=>typeof e.tx==='function'?e.tx():e.tx;
{const _rd=render;render=function(){const r=_rd.apply(this,arguments);try{if(A1()&&S._r4Y!==S.age&&!choice._cur&&!modalOpen&&!(typeof DU!=='undefined'&&DU)){S._r4Y=S.age;const x=X();x.cd=x.cd||{};
 if(x.ge==='guard'){S.karma+=1;S.fame+=100}
 if(x.ge&&x.ge==='ascend'){return r}
 if(!x.god&&false){}
 if(x.done&&x.done.includes('god')&&!x.ge&&Math.random()<.5){const e=GE;choice(e.t,mkTx(e),e.o);return r}
 if(Math.random()<.13){if(Math.random()<.4&&(storyStep()||memoStep()||rvStep()))return r;
  const pool=POOL.filter(e=>(!e.once||!x.cd[e.id])&&(x.cd[e.id]==null||S.age-x.cd[e.id]>=(e.cd||9))&&(()=>{try{return e.c()}catch(_){return false}})());if(pool.length){const e=pk(pool);x.cd[e.id]=S.age;choice(e.t,mkTx(e),e.o)}}}}catch(e){console.error('sv4',e)}return r}}
window._sv4={storyStep,memoStep,rvStep,POOL,GE,endWar};
})()}catch(e){console.error('sv4 block',e)}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน soul7 (เดิมอยู่ app.js บรรทัด 36745) · ห่อ: openSoul, drawDuel, passYear ----
(function(){const SL=globalThis.__wSlots['soul7'];let openSoul=SL.base.openSoul;let drawDuel=SL.base.drawDuel;let passYear=SL.base.passYear;const __G={openSoul:()=>openSoul,drawDuel:()=>drawDuel,passYear:()=>passYear},__S={openSoul:v=>{openSoul=v},drawDuel:v=>{drawDuel=v},passYear:v=>{passYear=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;const {BEAST,TIER,spNow}=B;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU);
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pk=a=>a[R2(0,a.length-1)];
const TY={atk:['⚔️','สายโจมตี'],def:['🛡️','สายป้องกัน'],sup:['🌿','สายสนับสนุน'],ctrl:['🌀','สายควบคุม'],agi:['💨','สายว่องไว']};
const tc=t=>TIER[Math.max(0,Math.min(TIER.length-1,t|0))][2];
// สายของสัตว์ (เดาจากชื่อ) — วงแหวนใหม่ได้สายของสัตว์ที่ล่ามา
function beastTy(n){n=String(n||'');if(/งู|ใย|แมงมุม|ผีเสื้อ|เถา|ตะขาบ|แมงป่อง|ปลาหมึก|หมอก|วังวน/.test(n))return'ctrl';if(/เต่า|หมี|หิน|ศิลา|ช้าง|เกราะ|แรด|ภู|กระดอง/.test(n))return'def';if(/นก|เหยี่ยว|อินทรี|กระต่าย|เสือดาว|ลม|หงส์|จิ้งจอก|ค้างคาว|ม้า/.test(n))return'agi';if(/สมุนไพร|บัว|ต้นไม้|กวาง|ดอก|กระเรียน|วาฬ|ปลา/.test(n))return'sup';return'atk'}
// สายหลัก = นับคะแนน ดวงจิตละ 2 · วงแหวนละ 1
function svTy(g){if(!g||g.aw!==1||!g.sp.length)return null;const v={};g.sp.forEach(s=>{const t=spNow(s).t;v[t]=(v[t]||0)+2});(g.rings||[]).forEach(r=>{if(r.ty)v[r.ty]=(v[r.ty]||0)+1});let best=spNow(g.sp[0]).t,bv=v[best]||0;for(const k in v)if(v[k]>bv){best=k;bv=v[k]}return best}
window._svTy=svTy;
// ---- แอนิเมชันวงแหวน ----
const css=document.createElement('style');css.textContent=`.svFx{position:fixed;inset:0;z-index:99980;pointer-events:none;display:flex;align-items:center;justify-content:center;flex-direction:column}
.svFx .rg{position:absolute;width:150px;height:150px;border-radius:50%;border:8px solid var(--c);box-shadow:0 0 30px var(--c),inset 0 0 20px var(--c);animation:svIn 1.6s cubic-bezier(.3,.9,.3,1) forwards}
.svFx .rg:nth-child(2){animation-delay:.15s;opacity:.6}.svFx .ic{font-size:64px;animation:svPulse 1.6s ease;filter:drop-shadow(0 0 16px var(--c))}.svFx .tx{position:absolute;bottom:22%;background:#000c;color:#fff;padding:8px 16px;border-radius:12px;font-weight:700;border:2px solid var(--c);animation:svTx 2.2s ease forwards;text-align:center}
@keyframes svIn{0%{transform:scale(3) rotateX(70deg);opacity:0}40%{opacity:1}100%{transform:scale(.55) rotateX(70deg);opacity:0}}@keyframes svPulse{50%{transform:scale(1.3)}}@keyframes svTx{0%{opacity:0;transform:translateY(20px)}15%,80%{opacity:1;transform:none}100%{opacity:0}}
.svStrip{display:flex;justify-content:center;gap:5px;margin:2px 0 6px;perspective:300px}.svStrip i{width:22px;height:22px;border-radius:50%;border:4px solid var(--c);box-shadow:0 0 8px var(--c);animation:svUp .5s cubic-bezier(.2,1.5,.4,1) both;animation-delay:calc(var(--k)*90ms);transition:transform .2s,box-shadow .2s}.svStrip i.hit{transform:scale(1.6);box-shadow:0 0 22px var(--c),0 0 6px #fff}
@keyframes svUp{from{transform:translateY(30px) scale(.2);opacity:0}}.svSk{text-align:center;font-weight:700;font-size:13.5px;min-height:18px;color:#b47bff;transition:opacity .3s}
@media (prefers-reduced-motion:reduce){.svFx,.svStrip i{animation:none!important}}`;document.head.appendChild(css);
function fx(t,ic,txt){try{const d=document.createElement('div');d.className='svFx';d.style.setProperty('--c',tc(t));d.innerHTML=`<div class="rg"></div><div class="rg"></div><div class="ic">${ic||'⭕'}</div><div class="tx">${txt}</div>`;document.body.appendChild(d);setTimeout(()=>d.remove(),2300)}catch(e){}}
// ---- กระดูกวิญญาณ ----
const BP=[['head','กะโหลก','🧠','ปัญญา +','int'],['body','ลำตัว','🫀','พลังชีวิตสูงสุด +','hp'],['la','แขนซ้าย','💪','พลังยุทธ์ +','pow'],['ra','แขนขวา','🦾','พลังยุทธ์ +','pow'],['ll','ขาซ้าย','🦵','ว่องไว (หลบ) +','pow'],['rl','ขาขวา','🦿','ว่องไว (หลบ) +','pow']];
const BDROP=[0,0,.05,.1,.16,.24,.32,.4,.5];
function boneGive(t,beast){const g=S.sv;g.bone=g.bone||{};const free=BP.filter(b=>!g.bone[b[0]]||g.bone[b[0]].t<t);if(!free.length)return;const b=pk(free),old=g.bone[b[0]];g.bone[b[0]]={t,n:`กระดูก${b[1]}${beast}`};
 const m=(t+1)*(old?.5:1);let eff='';if(b[4]==='int'){const v=Math.round(5*m);S.int+=v;eff=`ปัญญา +${v}`}else if(b[4]==='hp'){const v=Math.round(S.maxHp*.04*m);S.maxHp+=v;S.hp+=v;eff=`พลังชีวิตสูงสุด +${fmt(v)}`}else{const v=pctPow(.015*m);S.power+=v;eff=`พลังยุทธ์ +${fmt(v)}`}
 log(`🦴 <b>ได้กระดูกวิญญาณ${b[1]}</b> จาก${beast} (${TIER[t][0]}) — ${eff}${old?' · แทนที่กระดูกเดิม':''}`,'myth',true);setTimeout(()=>fx(t,'🦴',`🦴 กระดูกวิญญาณ${b[1]}<br><small>${TIER[t][0]}ของ${esc(beast)}</small>`),2400)}
// ---- เฝ้าดูวงแหวนใหม่: ใส่สาย · แอนิเมชันดูดซับ · ลุ้นกระดูก ----
setInterval(()=>{try{if(!on())return;const g=S.sv;if(!g._tyMig){g._tyMig=1;const st=spNow(g.sp[0]).t;g.rings.forEach(r=>{if(!r.ty)r.ty=st});g._rc=g.rings.length;return}
 if(g._rc==null)g._rc=g.rings.length;if(g.rings.length>g._rc){for(let i=g._rc;i<g.rings.length;i++){const r=g.rings[i];if(!r.ty)r.ty=beastTy(r.b);const sp=spNow(g.sp[0]);fx(r.t,sp.ic,`⭕ หลอมวงแหวนวงที่ ${i+1}<br><small>${TIER[r.t|0][0]} · ${TY[r.ty][0]} ${TY[r.ty][1]} · 「${esc(r.sk||'')}」</small>`);if(Math.random()<(BDROP[r.t|0]||0))boneGive(r.t|0,r.b)}
  const nt=svTy(g);if(g._lastTy&&nt!==g._lastTy)log(`🔄 วงแหวนคุณเปลี่ยนแนวทางพลัง สายหลักตอนนี้คือ <b>${TY[nt][0]} ${TY[nt][1]}</b>`,'epic',true);g._lastTy=nt}g._rc=g.rings.length;if(!g._lastTy)g._lastTy=svTy(g)}catch(e){}},900);
// ---- ล่าวงแหวน: บอกสายของสัตว์ + มีตัวเลือกสัตว์ต่างสายในขั้นปลอดภัย ----
{const _hx=window._svHuntX;window._svHuntX=(g0,i,safe,opts)=>{if(_hx)_hx(g0,i,safe,opts);try{
 opts.forEach(o=>{const m=/^(\S+)\s(.+?)\s·\s/.exec(o.t||'');if(m&&!o._ty){const ty=beastTy(m[2]);o._ty=1;o.s=`${TY[ty][0]} ${TY[ty][1]} · ${o.s||''}`}});
 const st=Math.min(3,safe),have=new Set(opts.filter(o=>o._ty).map(o=>beastTy((/^(\S+)\s(.+?)\s·\s/.exec(o.t)||[])[2])));
 const alt=BEAST[st].filter(b=>!have.has(beastTy(b[0]))).sort(()=>Math.random()-.5).slice(0,2);
 alt.forEach(b=>{const ty=beastTy(b[0]);opts.splice(Math.max(0,opts.length-1),0,{t:`${TIER[st][1]} ${b[0]} · ${TIER[st][0]}`,s:`${TY[ty][0]} ${TY[ty][1]} · ปลอดภัย · ทางเลือกต่างสาย`,_ty:1,f(){const mult=[.35,.65,.95,1.25][st];duel(`${b[0]} (${TIER[st][0]})`,Math.max(5,Math.round(total()*mult)),w=>{if(!S||!S.alive)return;if(!w){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15));log(`🩸 ${b[0]}หนีไป — ลองใหม่ปีหน้า`,'bad');return}const go=()=>B.absorb(st,b);if(window._svWin)window._svWin(st,b,go);else go()})}})})}catch(e){console.error('svhx3',e)}}}
// ---- หน้าดวงจิต: สายหลัก · สายของแต่ละวง · กระดูก · แคว้น · คู่แข่ง ----
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const g=S.sv,m=$('modal');const ty=svTy(g);
 const h=m.querySelector('h4');const rows=[...m.querySelectorAll('h4 ~ div')].filter(d=>/วงที่ \d/.test(d.textContent));rows.forEach((d,i)=>{const rg=g.rings[i];if(rg&&rg.ty&&!d.querySelector('.svT'))d.querySelector('span:last-child').insertAdjacentHTML('beforeend',` <span class="tag2 svT">· ${TY[rg.ty][0]} ${TY[rg.ty][1]}</span>`)});
 const box=`<div class="item"><b>สายหลักตอนนี้: ${TY[ty][0]} ${TY[ty][1]}</b><br><span class="tag2">ดวงจิตนับ 2 เสียง วงแหวนนับวงละ 1 เสียง เลือกวงแหวนต่างสายเพื่อเปลี่ยนแนวทางได้ ได้ผลพิเศษของทั้งสายดวงจิตและสายหลัก</span></div>`;
 const bones=`<h4>🦴 กระดูกวิญญาณ ${Object.keys(g.bone||{}).length}/6</h4><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px">${BP.map(b=>{const x=(g.bone||{})[b[0]];return`<div class="item" style="text-align:center;padding:5px;margin:0;${x?`border-color:${tc(x.t)};box-shadow:0 0 8px ${tc(x.t)}`:'opacity:.5'}"><div style="font-size:20px">${b[2]}</div><small>${b[1]}</small>${x?`<br><small class="tag2">${TIER[x.t][0]}</small>`:''}</div>`}).join('')}</div><p class="tag2">ได้จากการหลอมวงแหวนพันปีขึ้นไป ยิ่งวงแก่ยิ่งมีโอกาส</p>`;
 const RG=REG.find(x=>x[0]===g.reg)||REG[0];const rv=(g.rv||[]).map(x=>`<div style="margin:2px 0">${x.ic} <b>${esc(x.n)}</b> <span class="tag2">· ${esc(x.sp)} · ระดับจิต ${x.lv}${x.w||x.l?` · ชนะ ${x.w|0} แพ้ ${x.l|0}`:''}</span></div>`).join('');
 const wv=`<h4>🗺️ ${RG[1]} ${RG[2]}</h4><p class="tag2">${RG[3]}</p>${rv?`<h4>⚔️ คู่แข่งรุ่นเดียวกัน</h4>${rv}`:''}`;
 if(h)h.insertAdjacentHTML('beforebegin',box);const bk=m.querySelector('button[onclick="openSoulBook()"]');if(bk)bk.insertAdjacentHTML('beforebegin',bones+wv)}catch(e){console.error('svos3',e)}return r}}
// ---- ปลดปล่อยวงแหวนตอนดวล + วงแหวนสว่างตอนใช้ท่า ----
{const _dd=drawDuel;drawDuel=function(fin){const r=_dd.apply(this,arguments);try{if(!on()||!S.sv.rings.length)return r;const m=$('modal');if(!m||m.dataset.k!=='duel')return r;const g=S.sv;
 let st=m.querySelector('.svStrip');if(!st){const h=m.querySelector('h3');if(!h)return r;h.insertAdjacentHTML('afterend',`<div class="svStrip">${g.rings.map((x,k)=>`<i style="--c:${tc(x.t)};--k:${k}"></i>`).join('')}</div><div class="svSk"></div>`);return r}
 if(!fin&&Math.random()<.55){const k=R2(0,g.rings.length-1),x=g.rings[k],I=st.children[k],sk=m.querySelector('.svSk');if(I){I.classList.add('hit');setTimeout(()=>I.classList.remove('hit'),600)}if(sk){sk.style.color=tc(x.t);sk.textContent=`วงที่ ${k+1} 「${spNow(g.sp[0]).n}·${x.sk||''}」`;sk.style.opacity=1;clearTimeout(sk._t);sk._t=setTimeout(()=>sk.style.opacity=0,900)}}}catch(e){}return r}}
// ===== ระลอก 1: แคว้น · สมุนไพรวิเศษ (เนื้อหาของเกมเอง · คู่แข่งใช้ระบบ 👥 ทีมและคู่แข่งที่มีอยู่แล้ว) =====
const REG=[['north','❄️','แคว้นหมอกเหนือ','ภูเขาหิมะและหมาป่าเงิน คนที่นี่อดทนเหมือนน้ำแข็ง'],['gold','🌾','ที่ราบตะวันทอง','ทุ่งกว้างที่ตั้งของสถาบันจิตยุทธ์ชื่อดังหลายแห่ง'],['isle','🌊','หมู่เกาะคลื่นคราม','สัตว์วิญญาณทะเลและพ่อค้าข้ามสมุทร'],['wood','🌳','ป่าต้องห้ามพันพฤกษ์','สมุนไพรวิเศษเกิดที่นี่ แต่สัตว์วิญญาณพันปีก็เช่นกัน'],['jade','🏯','นครหลวงหยกขาว','ราชสำนักและตระกูลใหญ่ ที่ที่ชื่อเสียงมีค่ากว่าทอง']];
const HERB=[['🌺','ดอกจันทร์กลืนจิต','ระดับจิต +3 (ไม่เกินคอขวด)',g=>{g.lv=Math.min(B.capOf(g),g.lv+3)}],['🍀','หญ้าเก้าใบน้ำค้าง','พลังชีวิตสูงสุด +8%',()=>{const v=Math.round(S.maxHp*.08);S.maxHp+=v;S.hp+=v}],['🍄','เห็ดเงาราตรี','ความผูกพันกับดวงจิต +12',g=>{g.bond=Math.min(100,(g.bond||50)+12)}],['🌸','บัวหิมะพันปี','หลอมเกินขีดครั้งหน้าเสี่ยงน้อยลงมาก',g=>{g.herbSafe=1}],['🔥','ผลไฟพันปี','พลังยุทธ์ +5%',()=>{S.power+=pctPow(.05)}],['🌿','รากหยกเขียว','ฟื้นพลังชีวิตเต็ม · กรรม +3',()=>{S.hp=S.maxHp;S.karma+=3}]];
{const _rk=window._svRisk;window._svRisk=(g,t,over)=>{let v=_rk?_rk(g,t,over):0;if(g&&g.herbSafe&&over>0){g.herbSafe=0;v+=.25;log('🌸 พลังบัวหิมะพันปีประคองเส้นจิตไว้','good')}return v}}
const RVN=['ไป๋อวี่','หลิงเฟิง','ซูเหยียน','หานเซียว','มู่ชิง','เยี่ยหลาน','ฉินโม่','เสวี่ยอิ๋ง'];
function init3(){const g=S.sv;if(!g.reg)g.reg=pk(REG)[0];if(false&&!g.rv){const n=RVN.slice().sort(()=>Math.random()-.5).slice(0,4);g.rv=n.map(x=>{const sp=pk(B.SP.filter(p=>p[5]>=1));return{n:x,ic:sp[1],sp:sp[2],lv:Math.max(1,g.lv+R2(-2,3)),w:0,l:0}})}}
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(on()){init3();const g=S.sv;if(g.rv)g.rv.forEach(x=>{if(x.dead)return;x.lv=Math.min(100,x.lv+R2(0,3))});if(g.rv&&S.age%7===0){const x=pk(g.rv);log(`📰 ข่าวจากรุ่นเดียวกัน: <b>${esc(x.n)}</b> (${x.ic} ${esc(x.sp)}) ไต่ถึงระดับจิต ${x.lv} แล้ว${x.lv>g.lv?' — นำหน้าคุณอยู่':''}`,'')}}}catch(e){}return r}}
const ok=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&s.age>=10);
EVENTS.push({w:2.5,cd:5,c:ok,f(){init3();const g=S.sv,hb=pk(HERB),RG=REG.find(x=>x[0]===g.reg)||REG[0],risk=g.reg==='wood'?.35:.5;
 choice(`${hb[0]} ${hb[1]}`,`ใน${RG[2]} คุณพบ <b>${hb[1]}</b> ขึ้นอยู่กลางรังสัตว์วิญญาณ<br><span class="tag2">${hb[2]}</span>`,[
 {t:'🌿 ลอบเก็บ',s:`เสี่ยงถูกพบราว ${Math.round(risk*100)}%`,noFate:1,f(){if(Math.random()<risk){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));log(`🩸 สัตว์เฝ้ารังตื่นขึ้น คุณหนีออกมามือเปล่าพร้อมแผล`,'bad')}else{hb[3](g);log(`${hb[0]} ได้ <b>${hb[1]}</b> — ${hb[2]}`,'epic',true)}}},
 {t:'⚔️ สู้กับสัตว์เฝ้ารัง',s:'ดวลแล้วเก็บแน่นอน',noFate:1,f(){duel('สัตว์วิญญาณเฝ้ารัง',Math.round(total()*.9),w=>{if(w){hb[3](g);log(`${hb[0]} ปราบสัตว์เฝ้ารังได้ ได้ <b>${hb[1]}</b>`,'epic',true)}else log('🩸 สัตว์เฝ้ารังไล่คุณออกมา','bad')})}},
 {t:'🙏 ปล่อยไว้',s:'กรรม +',noFate:1,f(){S.karma+=3;log('🙏 คุณปล่อยให้มันเติบโตต่อไป','')}}])}});
EVENTS.push({w:1.2,cd:10,c:s=>ok(s)&&s.age>=14,f(){init3();const g=S.sv,L=REG.filter(x=>x[0]!==g.reg).sort(()=>Math.random()-.5).slice(0,3);
 choice('🗺️ ออกเดินทางข้ามแคว้น','กองคาราวานกำลังจะออกเดินทาง มีที่ว่างให้คุณหนึ่งที่',L.map(x=>({t:`${x[1]} ${x[2]}`,s:x[3],noFate:1,f(){g.reg=x[0];S.int+=3;log(`🗺️ คุณย้ายไปอยู่ที่ <b>${x[2]}</b> — ${x[3]}`,'good',true)}})).concat([{t:'🏡 อยู่ที่เดิม',s:'',noFate:1,f(){log('🏡 คุณเลือกอยู่ที่เดิม','')}}]))}});
})()}catch(e){console.error('sv3',e)}
__done=1;SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};SL.impl.drawDuel=drawDuel;drawDuel=function(){return globalThis.drawDuel.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul8 (เดิมอยู่ app.js บรรทัด 36812) · ห่อ: passYear, openSoul ----
(function(){const SL=globalThis.__wSlots['soul8'];let passYear=SL.base.passYear;let openSoul=SL.base.openSoul;const __G={passYear:()=>passYear,openSoul:()=>openSoul},__S={passYear:v=>{passYear=v},openSoul:v=>{openSoul=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pk=a=>a[R2(0,a.length-1)];
const TYN={atk:'⚔️ โจมตี',def:'🛡️ ป้องกัน',sup:'🌿 สนับสนุน',ctrl:'🌀 ควบคุม',agi:'💨 ว่องไว'};
const AC={north:['❄️','สถาบันหิมะเงิน','def','เข้มงวด เน้นความอดทน ศิษย์สายป้องกันเติบโตเร็ว',1.1],gold:['🌾','สถาบันตะวันทองหลวง','atk','สถาบันเก่าแก่ที่สุดของทวีป รับยากที่สุด',1.3],isle:['🌊','สถาบันคลื่นสมุทร','agi','สอนกลางทะเล เน้นความเร็วและการเอาตัวรอด',1],wood:['🌳','สถาบันพันพฤกษ์','sup','อยู่ชายป่าต้องห้าม เด่นเรื่องสมุนไพรและการสยบสัตว์',.95],jade:['🏯','สถาบันหยกขาวราชสำนัก','ctrl','ลูกหลานขุนนางเรียนที่นี่ เส้นสายสำคัญพอ ๆ กับฝีมือ',1.2]};
const RK=['🎒 นักเรียนใหม่','📘 นักเรียนอาวุโส','🎽 ทีมตัวแทนสถาบัน','👑 หัวหน้าทีมตัวแทน'];
const X=()=>S.sv;const tm=()=>X().tm;
const regOf=()=>X().reg||'gold';
function rvAc(){const t=tm();if(!t||!t.rv)return;const ks=Object.keys(AC);t.rv.forEach(r=>{if(!r.ac)r.ac=pk(ks)})}
// ---- สอบเข้า (อายุ 11–16) ----
function examOffer(){const g=X();const home=regOf(),ks=Object.keys(AC).filter(k=>k!==home);const L=[home,pk(ks)];
 choice('🏫 ฤดูสอบเข้าสถาบัน',`ประกาศรับสมัครติดอยู่ทั่วเมือง ผู้ฝึกจิตรุ่นเยาว์ทั้งแคว้นแห่ไปสอบ<br><span class="tag2">สอบภาคปฏิบัติ: อ่านท่าแล้วตอบโต้ (มินิเกม) · ผ่านแล้วฝึกเร็วขึ้น และได้ผลพิเศษถ้าสายตรงกับสถาบัน</span>`,L.map(k=>{const a=AC[k];return{t:`${a[0]} ${a[1]}`,s:`ถนัด${TYN[a[2]]} · ${a[3]}`,noFate:1,f(){exam(k)}}}).concat([{t:'🏡 ฝึกเองที่บ้าน',s:'อิสระ แต่ช้ากว่า',noFate:1,f(){g.acSkip=S.age;log('🏡 คุณเลือกฝึกเองตามทางของตัวเอง','')}}]))}
function exam(k){const a=AC[k],g=X();const need=.45+(a[4]-1)*.5-(g.lv-10)/100;
 const wf=fn=>{let n=0;const t=setInterval(()=>{if(++n>40){clearInterval(t);return}if(choice._cur||modalOpen)return;clearInterval(t);fn()},150)};
 wf(()=>{const ok=window.mg2Play&&window.mg2Play('strike',{noSkip:1,title:`สอบเข้า${a[1]}`,sub:'กรรมการสาธิตท่า จำแล้วตอบโต้ตามลำดับ'},(sc)=>{const pass=sc>=need;if(pass){g.ac={id:k,y:S.age,rk:0,pt:0};g.acad=1;S.fame+=10;log(`${a[0]} <b>สอบผ่าน!</b> คุณได้เป็นนักเรียนของ <b>${a[1]}</b> (คะแนน ${Math.round(sc*100)}%)`,'epic',true)}else{g.acSkip=S.age;log(`${a[0]} สอบ${a[1]}ไม่ผ่าน (คะแนน ${Math.round(sc*100)}% · ต้องการ ${Math.round(need*100)}%) — ปีหน้าค่อยลองใหม่`,'bad')}try{render()}catch(e){}});
  if(!ok){g.ac={id:k,y:S.age,rk:0,pt:0};g.acad=1}})}
// ---- ผลของสถาบัน: ฝึกเร็วขึ้น · สายตรงกับสถาบันเร็วขึ้นอีก ----
{const _g=window._svGrow;window._svGrow=g=>{let m=_g?_g(g):1;try{if(g.ac&&!g.ac.done){const a=AC[g.ac.id];if(a&&window._svTy&&window._svTy(g)===a[2])m*=1.15;m*=1+g.ac.rk*.04}}catch(e){}return m}}
// ---- รายปี ----
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(!on())return r;const g=X();rvAc();
 if(!g.ac&&S.age>=11&&S.age<=16&&(g.acSkip==null||S.age-g.acSkip>=1)&&!choice._cur&&!g._exQ){g._exQ=1;setTimeout(()=>{g._exQ=0;if(on()&&!g.ac&&!choice._cur)examOffer()},600)}
 if(g.ac&&!g.ac.done){g.ac.pt+=R2(1,3)+(g.ac.rk>=2?1:0);const need=[6,14,24][g.ac.rk];if(need&&g.ac.pt>=need){g.ac.rk++;S.fame+=10*g.ac.rk;log(`🏫 เลื่อนชั้นเป็น <b>${RK[g.ac.rk]}</b> แห่ง${AC[g.ac.id][1]}`,'epic',true)}
  if(S.age-g.ac.y>=8||S.age>=24)grad()}}catch(e){console.error('sv4 yr',e)}return r}}
function grad(){const g=X(),a=AC[g.ac.id];g.ac.done=1;const t=['ผู้สำเร็จการศึกษา','ศิษย์เกียรตินิยม','ศิษย์ดีเด่นแห่งรุ่น','ศิษย์อันดับหนึ่งแห่งรุ่น'][g.ac.rk];
 S.fame+=[20,50,120,300][g.ac.rk];S.power+=pctPow([.02,.04,.07,.12][g.ac.rk]);if(g.ac.rk>=2){try{const d=LS.get('murim_ttl',{});const tt=`${t}${a[1]}`;if(!d[tt]){d[tt]={n:S.name,t:Date.now(),c:1};LS.set('murim_ttl',d)}}catch(e){}}
 log(`🎓 <b>จบการศึกษาจาก${a[1]}</b> — ${t}${g.ac.cups?` · ถ้วยศึกระหว่างสถาบัน ${g.ac.cups} ใบ`:''}`,'myth',true)}
const ok=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&s.sv.ac&&!s.sv.ac.done);
// ---- ศึกระหว่างสถาบัน (ทีมตัวแทนขึ้นไป ทุก ~3 ปี) ----
EVENTS.push({w:4,cd:3,c:s=>ok(s)&&s.sv.ac.rk>=2&&S.age-(s.sv.ac.cy||0)>=3,f(){const g=X(),me=AC[g.ac.id];g.ac.cy=S.age;rvAc();const others=Object.keys(AC).filter(k=>k!==g.ac.id).sort(()=>Math.random()-.5).slice(0,3);const t=tm(),rv=t&&t.rv?t.rv.filter(r=>r.al):[];
 const opp=others.map((k,i)=>{const r=rv.find(x=>x.ac===k&&!x._used);if(r)r._used=1;return{k,n:r?r.n:`ตัวแทน${AC[k][1].replace('สถาบัน','')}`,r,lv:r?r.lv:g.lv+R2(-3,4)+i*2}});if(t&&t.rv)t.rv.forEach(x=>delete x._used);
 let rd=0;const RN=['รอบแรก','รอบรองชนะเลิศ','รอบชิงชนะเลิศ'];
 const go=()=>{const o=opp[rd],a=AC[o.k],ep=Math.max(5,Math.round(total()*(.75+rd*.2+Math.max(-.2,Math.min(.4,(o.lv-g.lv)/60)))));
  choice(`🏟️ ศึกระหว่างสถาบัน · ${RN[rd]}`,`${me[0]} ${me[1]} พบ ${a[0]} ${a[1]}<br>คู่ต่อสู้: <b>${esc(o.n)}</b>${o.r?' <span class="tag2">(คู่แข่งที่คุณรู้จัก)</span>':''} ระดับจิตราว ${Math.round(o.lv)}`,[
   {t:'⚔️ ลงสนาม',s:'ดวล',noFate:1,f(){duel(o.n,ep,w=>{if(!S||!S.alive)return;if(w){if(o.r)o.r.rel=(o.r.rel||0)+(o.r.k==='kind'?6:-4);S.fame+=20+rd*20;if(rd>=2){g.ac.cups=(g.ac.cups||0)+1;g.ac.pt+=6;S.fame+=150;S.power+=pctPow(.04);log(`🏆 <b>${me[1]}คว้าแชมป์ศึกระหว่างสถาบัน!</b> คุณคือคนที่ทั้งทวีปจับตามอง`,'myth',true);return}log(`🏟️ ชนะ${RN[rd]} — ${esc(o.n)} ยอมรับความพ่ายแพ้`,'epic');rd++;setTimeout(go,500)}else{if(o.r)o.r.rel=(o.r.rel||0)+(o.r.k==='kind'?3:-2);S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15));log(`🏟️ ตกรอบ${RN[rd]} — ${me[1]}จบที่${['รอบแรก','อันดับสาม','รองแชมป์'][rd]}`,'bad',true);if(rd>=1)S.fame+=30*rd}})}},
   {t:'🏳️ ถอนตัว',s:'ไม่เสี่ยงบาดเจ็บ · ชื่อเสียงลด',noFate:1,f(){S.fame=Math.max(0,S.fame-20);log('🏳️ คุณถอนตัว อาจารย์มองคุณด้วยสายตาผิดหวัง','')}}])};go()}});
// ---- อาจารย์ในสถาบัน ----
EVENTS.push({w:2.5,cd:4,c:ok,f(){const g=X(),a=AC[g.ac.id];const nm=anyName(Math.random()<.5?'ชาย':'หญิง');
 choice(`👨‍🏫 อาจารย์${nm}แห่ง${a[1]}`,`อาจารย์${nm}เรียกคุณไปพบหลังเลิกเรียน "เจ้ามีแวว อยากฝึกเพิ่มแบบไหน?"`,[
  {t:'🔥 ฝึกหนักจนล้มทั้งยืน',s:'ระดับจิต +2 · พลังชีวิตลด',noFate:1,f(){g.lv=Math.min(B.capOf(g),g.lv+2);S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));g.ac.pt+=2;log(`🔥 อาจารย์${nm}ฝึกคุณหนักจนเดินแทบไม่ไหว ระดับจิต ${g.lv}`,'good')}},
  {t:'📚 ศึกษาทฤษฎีวงแหวน',s:'หลอมเกินขีดเสี่ยงน้อยลง',noFate:1,f(){g.theory=1;S.int+=5;g.ac.pt+=1;log('📚 คุณเข้าใจโครงสร้างวงแหวนลึกขึ้น หลอมเกินขีดเสี่ยงน้อยลง','good')}},
  {t:'🤝 ฝึกทำงานเป็นทีม',s:'ความผูกพันดวงจิต + · ชื่อเสียง +',noFate:1,f(){g.bond=Math.min(100,(g.bond||50)+8);S.fame+=15;g.ac.pt+=1;log('🤝 คุณได้เพื่อนร่วมทีมที่ไว้ใจได้','good')}}])}});
// ---- เหตุการณ์ชีวิตในสถาบัน ----
EVENTS.push({w:2,cd:5,c:ok,f(){const g=X(),a=AC[g.ac.id];const E=[
 ['📜 สอบกลางภาค','ข้อสอบวันนี้ยากผิดปกติ',[['✍️ ตั้งใจทำ',()=>{const p=Math.random()<.55+(S.int||0)/400;g.ac.pt+=p?3:0;S.int+=2;log(p?'📜 ได้คะแนนสูงสุดของชั้น':'📜 สอบได้แค่พอผ่าน',p?'good':'')}],['👀 ลอกเพื่อน',()=>{if(Math.random()<.4){g.ac.pt=Math.max(0,g.ac.pt-4);S.fame-=20;log('👀 ถูกจับได้ ถูกหักคะแนนและประจาน','bad')}else{g.ac.pt+=2;S.karma-=3;log('👀 รอดไปได้… ครั้งนี้','')}}]]],
 ['🌲 ฝึกภาคสนามในป่า','อาจารย์พาทั้งชั้นเข้าป่าล่าวงแหวนสิบปีให้รุ่นน้อง',[['🛡️ คุ้มกันรุ่นน้อง',()=>{g.ac.pt+=2;S.karma+=4;S.fame+=10;log('🛡️ รุ่นน้องทุกคนกลับมาครบ อาจารย์ชมต่อหน้าทั้งชั้น','good')}],['🏹 แยกไปล่าเอง',()=>{if(Math.random()<.5){S.power+=pctPow(.02);log('🏹 คุณเจอสัตว์วิญญาณแก่กว่าที่คิดและเอาชนะได้','good')}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));g.ac.pt=Math.max(0,g.ac.pt-1);log('🏹 คุณหลงป่าและบาดเจ็บ อาจารย์ต้องออกตามหา','bad')}}]]],
 ['🎐 งานเทศกาลสถาบัน','ทั้งสถาบันจัดงานประจำปี มีแข่งโชว์ดวงจิต',[['✨ ขึ้นโชว์ดวงจิต',()=>{const p=Math.random()<.5+(S.cha||0)/300;S.fame+=p?40:5;log(p?'✨ ดวงจิตคุณเรียกเสียงปรบมือทั้งลาน':'✨ โชว์ผ่านไปเงียบ ๆ',p?'good':'')}],['🍡 เดินเที่ยวกับเพื่อน',()=>{S.happy=Math.min(100,(S.happy||60)+8);log('🍡 คืนนั้นสนุกจนลืมเรื่องฝึกไปชั่วคราว','good')}]]]];
 const e=pk(E);choice(`${e[0]} · ${a[1]}`,e[1],e[2].map(o=>({t:o[0],s:'',noFate:1,f:o[1]})))}});
// ---- หน้าดวงจิต: แสดงสถาบัน + สังกัดของคู่แข่ง ----
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const g=X(),m=$('modal');rvAc();
 const h=[...m.querySelectorAll('h4')].find(x=>/^🗺️/.test(x.textContent));const c=g.ac?AC[g.ac.id]:null;
 const html=`<div class="item"><b>🏫 ${c?`${c[0]} ${c[1]}`:'ยังไม่มีสถาบัน'}</b><br><span class="tag2">${c?`${g.ac.done?'🎓 จบการศึกษาแล้ว':RK[g.ac.rk]+` · คะแนนสะสม ${g.ac.pt}`} · ถนัด${TYN[c[2]]}${g.ac.cups?` · 🏆 ×${g.ac.cups}`:''}`:'สอบเข้าได้ช่วงอายุ 11–16 · ฝึกเร็วขึ้นและได้ผลพิเศษถ้าสายตรงกับสถาบัน'}</span>${tm()&&tm().rv&&tm().rv.length?`<br><span class="tag2">คู่แข่ง: ${tm().rv.map(x=>`${x.ic||''}${esc(x.n)} (${(AC[x.ac]||['',''])[1].replace('สถาบัน','')})`).join(' · ')}</span>`:''}</div>`;
 if(h)h.insertAdjacentHTML('beforebegin',html)}catch(e){console.error('sv4 os',e)}return r}}
window._sv4={AC,examOffer,grad};
})()}catch(e){console.error('sv4',e)}
__done=1;SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};})();

// ---- ท่อน soul9 (เดิมอยู่ app.js บรรทัด 36927) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['soul9'];
try{(()=>{
const B=window._blk34;if(!B)return;const {TIER}=B;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pk=a=>a[R2(0,a.length-1)];
const TYN={atk:'⚔️ สายโจมตี',def:'🛡️ สายป้องกัน',sup:'🌿 สายสนับสนุน',ctrl:'🌀 สายควบคุม',agi:'💨 สายว่องไว'};
const RN={north:'แคว้นหมอกเหนือ',gold:'ที่ราบตะวันทอง',isle:'หมู่เกาะคลื่นคราม',wood:'ป่าต้องห้ามพันพฤกษ์',jade:'นครหลวงหยกขาว'};
// [ชื่อ, ท่า, สาย] ตามขั้น สิบปี→หมื่นปี
const RB={north:[['จิ้งจอกหิมะ','หางเกล็ดน้ำแข็ง','agi'],['หมีขาวภูเขา','อ้อมกอดเยือกแข็ง','def'],['หมาป่าพายุหิมะ','หอนเรียกพายุ','atk'],['มังกรน้ำแข็งน้อย','ลมหายใจเหมันต์','ctrl']],
 gold:[['ตั๊กแตนทองคำ','ขาเคียวทอง','atk'],['วัวป่าเขาทอง','ชนทะลวงทุ่ง','def'],['อินทรีตะวันทอง','กรงเล็บอาทิตย์','agi'],['สิงโตแผงทอง','คำรามราชันทุ่ง','atk']],
 isle:[['ปูเปลือกคราม','ก้ามหนีบคลื่น','def'],['ปลาโลมาคลื่น','ว่ายทะลุคลื่น','agi'],['ปลาหมึกยักษ์หมอกทะเล','หมึกพรางวิญญาณ','ctrl'],['เต่ามหาสมุทร','กระดองค้ำทะเล','def']],
 wood:[['กวางดาวพราว','เขาเรืองแสงรักษา','sup'],['งูเถาวัลย์','รัดเถาพันชั้น','ctrl'],['ลิงภูตไม้','ปีนพันกิ่ง','agi'],['ต้นไม้เดินได้พันปี','รากเรียกชีวิต','sup']],
 jade:[['นกยูงหยก','รำพรางตา','ctrl'],['เสือขาวราชวัง','คำรามพิทักษ์วัง','atk'],['กิเลนหยก','มงคลคุ้มภัย','sup'],['หงส์ขาวราชสำนัก','ปีกพันธนาการ','ctrl']]};
window._svRB=RB;window._svRN=RN;
{const _hx=window._svHuntX;window._svHuntX=(g0,i,safe,opts)=>{if(_hx)_hx(g0,i,safe,opts);try{const g=S.sv,reg=g.reg||'gold',L=RB[reg];if(!L)return;const st=Math.min(3,safe),b=L[st];
 opts.splice(Math.max(0,opts.length-1),0,{t:`${TIER[st][1]} ${b[0]} · ${TIER[st][0]}`,s:`${TYN[b[2]]} · สัตว์ประจำ${RN[reg]} · ปลอดภัย`,_ty:1,f(){const mult=[.35,.65,.95,1.25][st];duel(`${b[0]} (${TIER[st][0]})`,Math.max(5,Math.round(total()*mult)),w=>{if(!S||!S.alive)return;if(!w){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15));log(`🩸 ${b[0]}หนีไป — ลองใหม่ปีหน้า`,'bad');return}const go=()=>{const n0=g.rings.length;B.absorb(st,b);const r=g.rings[g.rings.length-1];if(g.rings.length>n0&&r)r.ty=b[2]};if(window._svWin)window._svWin(st,b,go);else go()})}})}catch(e){console.error('sv5hx',e)}}}
// ---- เหตุการณ์เฉพาะแคว้น ----
const C=(reg,a)=>s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&(s.sv.reg||'gold')===reg&&s.age>=(a||10));
const O=(t,s,f)=>({t,s,noFate:1,f});
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};const lvUp=n=>{const g=S.sv;g.lv=Math.min(B.capOf(g),g.lv+n)};
const EV=[
 [C('north'),()=>choice('🌨️ พายุหิมะปิดช่องเขา','กองคาราวานติดอยู่กลางพายุ เด็กและคนแก่เริ่มหนาวสั่น',[O('🔥 ใช้พลังจิตก่อไฟให้ทุกคน','กรรม + · เหนื่อยหนัก',()=>{S.karma+=10;S.fame+=25;hurt(.1);log('🔥 คุณประคองไฟไว้ทั้งคืน ทุกคนรอดถึงเช้า','good',true)}),O('🏔️ ฝ่าพายุฝึกจิตคนเดียว','ระดับจิต + · เสี่ยงหนาวจัด',()=>{if(Math.random()<.65){lvUp(2);log('🏔️ ความหนาวขัดเกลาเส้นจิตให้แกร่งขึ้น','good')}else{hurt(.25);log('🏔️ คุณเกือบแข็งตายกลางพายุ','bad')}})])],
 [C('north',14),()=>choice('🏕️ เผ่าหิมะเร่ร่อน','ชาวเผ่าที่อาศัยบนภูเขาหิมะเชิญคุณร่วมพิธีล่าประจำปี',[O('🏹 ร่วมล่ากับเผ่า','ได้ของแลกเปลี่ยน · เป็นมิตรกับเผ่า',()=>{const m=inc(R2(200,800));S.money+=m;S.cha+=3;log(`🏹 ล่าสำเร็จ เผ่าแบ่งหนังและเขี้ยวให้ ขายได้ ${fmt(m)}`,'good')}),O('📜 ขอฟังตำนานของเผ่า','ปัญญา +',()=>{S.int+=6;log('📜 ผู้เฒ่าเล่าถึงมังกรน้ำแข็งที่หลับอยู่ใต้ธารน้ำแข็ง','')})])],
 [C('gold'),()=>choice('🌾 ฤดูเก็บเกี่ยวที่ราบตะวันทอง','ฝูงตั๊กแตนวิญญาณบุกนาข้าวทั้งตำบล ชาวนาร้องขอความช่วยเหลือ',[O('⚔️ ไล่ฝูงตั๊กแตน','ดวลกับฝูง',()=>{duel('ฝูงตั๊กแตนวิญญาณ',Math.round(total()*.8),w=>{if(w){S.karma+=8;S.fame+=30;S.money+=inc(300);log('🌾 นาข้าวรอด ชาวนาเลี้ยงฉลองให้คุณทั้งคืน','good',true)}else{hurt(.15);log('🌾 ฝูงมากเกินกว่าจะต้านไหว','bad')}})}),O('💰 รับจ้างเฝ้านาเป็นงานประจำ','เงิน +',()=>{S.money+=inc(R2(400,900));log('💰 ได้ค่าจ้างพอใช้ไปทั้งปี','')})])],
 [C('gold',13),()=>choice('🏮 ตลาดใหญ่ประจำปี','ตลาดที่ใหญ่ที่สุดของทวีปเปิดเพียงเจ็ดวัน มีของแปลกจากทุกแคว้น',[O('🌸 ซื้อบัวหิมะพันปี','เงิน − · หลอมเกินขีดครั้งหน้าเสี่ยงน้อยลง',()=>{const c=inc(1500);if(S.money<c)return log('💸 เงินไม่พอ แม่ค้าโบกมือไล่','');S.money-=c;S.sv.herbSafe=1;log('🌸 ได้บัวหิมะพันปีมาเก็บไว้','good')}),O('🔍 ตามหาของปลอมแฉพ่อค้า','กรรม + · ชื่อเสียง +',()=>{const ok=Math.random()<.4+(S.int||0)/300;if(ok){S.fame+=35;S.karma+=5;log('🔍 คุณจับพ่อค้าวงแหวนปลอมได้กลางตลาด','good',true)}else log('🔍 หาหลักฐานไม่เจอ','')}),O('🚶 เดินดูเฉย ๆ','',()=>{S.happy=Math.min(100,(S.happy||60)+4);log('🚶 แค่เดินดูก็สนุกแล้ว','')})])],
 [C('isle',12),()=>choice('⛵ ออกเรือล่าสัตว์ทะเล','ชาวประมงชวนออกเรือไปถิ่นของสัตว์วิญญาณทะเลที่คนบนบกไม่เคยเห็น',[O('🌊 ลงไปใต้น้ำเอง','พลัง + · เสี่ยงจมน้ำ',()=>{if(Math.random()<.6){S.power+=pctPow(.03);S.fame+=20;log('🌊 คุณดำลงไปปราบสัตว์ทะเลได้ ชาวประมงตะลึง','good')}else{hurt(.3);log('🌊 กระแสน้ำวนดึงคุณลงลึก รอดมาได้อย่างหวุดหวิด','bad')}}),O('🎣 ช่วยงานบนเรือ','เงิน + · ปลอดภัย',()=>{S.money+=inc(R2(300,700));log('🎣 ได้ส่วนแบ่งจากการล่า','')})])],
 [C('isle',16),()=>choice('🏴‍☠️ โจรสลัดผู้ฝึกจิต','เรือโจรสลัดที่มีผู้ฝึกจิตคุมแล่นเข้ามาปล้นหมู่เกาะ',[O('⚔️ สู้กับหัวหน้าโจรสลัด','ดวล',()=>{duel('หัวหน้าโจรสลัดผู้ฝึกจิต',Math.round(total()*1.05),w=>{if(w){S.fame+=60;S.money+=inc(R2(800,2000));log('🏴‍☠️ หัวหน้าโจรสลัดถูกจับ หมู่เกาะยกย่องคุณเป็นวีรบุรุษ','epic',true)}else{hurt(.2);log('🏴‍☠️ โจรสลัดหนีไปพร้อมของปล้น','bad')}})}),O('🛶 พาชาวบ้านหลบหนี','กรรม +',()=>{S.karma+=8;log('🛶 คุณพาเด็กและคนแก่หนีไปเกาะข้าง ๆ ได้ทันเวลา','good')})])],
 [C('wood',12),()=>choice('🌲 เงายักษ์ในป่าลึก','ทั้งป่าเงียบสนิท สัตว์วิญญาณแสนปีกำลังเดินผ่านมาไม่ไกล',[O('🙇 หมอบนิ่งแสดงความเคารพ','กรรม + · มันอาจจำคุณได้',()=>{S.karma+=6;S.sv.bond=Math.min(100,(S.sv.bond||50)+5);log('🙇 มันหยุดมองคุณครู่หนึ่ง แล้วเดินจากไป ทิ้งออร่าอุ่น ๆ ไว้ในอก','myth',true)}),O('👀 แอบตามไปดู','ปัญญา + · เสี่ยง',()=>{if(Math.random()<.55){S.int+=8;lvUp(1);log('👀 คุณเห็นมันดูดซับแสงจันทร์ เข้าใจบางอย่างเกี่ยวกับพลังจิตขึ้นมาก','good')}else{hurt(.35);log('👀 มันรู้ตัว แค่กระแทกหางทีเดียวคุณก็ปลิวไปหลายวา','bad')}})])],
 [C('wood',10),()=>choice('🧚 ภูตไม้นำทาง','แสงสีเขียวลอยวนรอบตัวคุณ ราวกับอยากพาไปที่ไหนสักแห่ง',[O('🌿 ตามไป','พบสมุนไพรประจำถิ่น',()=>{const h=pk([['🍃','ใบเงินร้อยปี',()=>{const v=Math.round(S.maxHp*.06);S.maxHp+=v;S.hp+=v},'พลังชีวิตสูงสุด +6%'],['🌼','ดอกตื่นจิต',()=>lvUp(2),'ระดับจิต +2'],['🍇','องุ่นหยดน้ำค้าง',()=>{S.hp=S.maxHp;S.sv.bond=Math.min(100,(S.sv.bond||50)+6)},'ฟื้นเต็ม · ผูกพัน +6']]);h[2]();log(`${h[0]} ภูตไม้พาไปพบ <b>${h[1]}</b> — ${h[3]}`,'epic',true)}),O('🚶 ไม่ตาม','',()=>log('🚶 แสงสีเขียวค่อย ๆ จางหายไปในความมืด',''))])],
 [C('jade',14),()=>choice('🏯 งานเลี้ยงราชสำนัก','ขุนนางผู้ใหญ่เชิญผู้ฝึกจิตรุ่นใหม่ร่วมงานเลี้ยงในวังหยกขาว',[O('✨ โชว์ดวงจิตต่อหน้าขุนนาง','ชื่อเสียง + · อาจถูกจับตา',()=>{const p=Math.random()<.5+(S.cha||0)/300;S.fame+=p?60:10;log(p?'✨ ทั้งท้องพระโรงเงียบกริบ ชื่อคุณถูกจดไว้ในบัญชีผู้มีแวว':'✨ ไม่มีใครสนใจ เพราะลูกขุนนางคนหนึ่งเพิ่งโชว์ดวงจิตมังกร',p?'epic':'')}),O('🍶 ผูกมิตรกับลูกขุนนาง','เส้นสาย · เงิน +',()=>{S.money+=inc(R2(500,1500));S.cha+=4;log('🍶 คุณได้เพื่อนในตระกูลใหญ่ที่อาจช่วยได้ในวันหน้า','good')})])],
 [C('jade',18),()=>choice('📜 ขุนนางเสนอเป็นผู้อุปถัมภ์','ขุนนางผู้มีอำนาจเสนอทุนฝึกไม่จำกัด แลกกับการรับใช้ตระกูลของเขา',[O('🤝 รับข้อเสนอ','เงิน ++ · กรรม −',()=>{S.money+=inc(R2(3000,6000));S.karma-=8;log('🤝 คุณกลายเป็นคนของตระกูลใหญ่ ทุนมาพร้อมคำสั่ง','')}),O('🙅 ปฏิเสธ','อิสระ · ชื่อเสียง +',()=>{S.fame+=20;log('🙅 คุณขอเดินทางของตัวเอง ขุนนางยิ้มบาง ๆ แต่สายตาไม่ยิ้ม','')})])]];
EVENTS.push({w:3.5,cd:3,c:s=>EV.some(e=>{try{return e[0](s)}catch(x){return false}}),f(){const L=EV.filter(e=>{try{return e[0](S)}catch(x){return false}});if(L.length){const e=L[R2(0,L.length-1)];e[1]()}}});
})()}catch(e){console.error('sv5',e)}
})();

// ---- ท่อน soul10 (เดิมอยู่ app.js บรรทัด 37030) · ห่อ: startLife, fight, duel, passYear, choice, openSoul ----
(function(){const SL=globalThis.__wSlots['soul10'];let startLife=SL.base.startLife;let fight=SL.base.fight;let duel=SL.base.duel;let passYear=SL.base.passYear;let choice=SL.base.choice;let openSoul=SL.base.openSoul;const __G={startLife:()=>startLife,fight:()=>fight,duel:()=>duel,passYear:()=>passYear,choice:()=>choice,openSoul:()=>openSoul},__S={startLife:v=>{startLife=v},fight:v=>{fight=v},duel:v=>{duel=v},passYear:v=>{passYear=v},choice:v=>{choice=v},openSoul:v=>{openSoul=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;const {SP,spNow}=B;
const soul=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv);
const on=()=>soul()&&S.sv.aw===1;
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const SW='skysw';
if(!SP.some(x=>x[0]===SW))SP.push([SW,'🗡️','กระบี่ผ่าฟ้า','atk','กระบี่ที่ว่ากันว่าเคยผ่าทวีปเป็นสองซีก ดวงจิตอันดับหนึ่งของทวีป',3,null]);
const hasSW=()=>on()&&S.sv.sp.some(s=>s.id===SW);
// ตระกูลลับ: เกิดในตระกูลราว 1% (เฉพาะโหมดนี้) → ปลุกได้กระบี่ผ่าฟ้าแน่นอน
{const _sl=startLife;startLife=function(){const r=_sl.apply(this,arguments);try{if(S&&S.ch==='soul'&&!S.flags.swC0){S.flags.swC0=1;if(Math.random()<.01){S.flags.swClan=1;setTimeout(()=>{try{log('🗡️ คุณเกิดในตระกูลที่ไม่มีใครรู้จัก ปู่ทวดไม่เคยพูดถึงอดีต และในห้องใต้ดินมีกระบี่สนิมเขรอะเล่มหนึ่งถูกล่ามโซ่ไว้','myth',true)}catch(e){}},700)}}}catch(e){}return r}}
setInterval(()=>{try{if(!on())return;const g=S.sv;if(g._swc)return;g._swc=1;
 if(S.flags&&S.flags.swClan&&!g.sp.some(s=>s.id===SW)){const old=spNow(g.sp[0]);g.sp[0]={id:SW,rev:0};g.lv=Math.min(B.capOf(g),Math.max(g.lv,8));log(`🗡️ ทันทีที่ <b>${old.n}</b> ปรากฏ แสงสีเงินก็ผ่ามันออกเป็นสองซีก <b>กระบี่ผ่าฟ้า</b> ดวงจิตที่แท้จริงของสายเลือดคุณตื่นขึ้น ผู้ปลุกจิตทรุดลงกับพื้น`,'myth',true)}
 if(g.sp.some(s=>s.id===SW))try{const Bk=LS.get('murim_svbook',{})||{};Bk[SW]=1;LS.set('murim_svbook',Bk)}catch(e){}}catch(e){}},1000);
// กระบี่ผ่าฟ้ามีได้แค่สายเลือดเดียว — คู่แข่ง/สมาชิกที่สุ่มได้จะถูกเปลี่ยนเป็นดาบราตรี
setInterval(()=>{try{if(!soul()||!S.sv.tm)return;['rv','m'].forEach(k=>(S.sv.tm[k]||[]).forEach(x=>{if(x.sp==='กระบี่ผ่าฟ้า'){x.sp='ดาบราตรี';x.ic='🗡️'}}))}catch(e){}},2000);
// พลังของกระบี่: ศัตรูอ่อนลง · หลอมเกินขีดง่ายขึ้น · แต่พลังย้อนถ้าใจไม่นิ่ง · มีคนไล่ล่า
{const _r=window._svRisk;window._svRisk=(g,t,o)=>(_r?_r(g,t,o):0)+(hasSW()?.15:0)}
{const _f=fight;fight=function(n,ep){try{if(hasSW())ep*=.9}catch(e){}return _f.call(this,n,ep)}}
{const _d=duel;duel=function(n,ep,cb){try{if(hasSW())ep*=.9}catch(e){}return _d.call(this,n,ep,cb)}}
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(!hasSW())return r;const g=S.sv;
 if((g.bond==null?50:g.bond)<40&&Math.random()<.06){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));log('🗡️ กระบี่ผ่าฟ้าสั่นในมือ ใจที่ไม่นิ่งทำให้คมของมันย้อนกลับมาเฉือนตัวคุณ (พลังชีวิต −20%)','bad')}
 if(g.lv>=70&&!g.swTrue){g.swTrue=1;S.power+=pctPow(.2);S.fame+=500;log('⚔️ <b>ร่างแท้ของกระบี่ผ่าฟ้า</b> คุณยกกระบี่ขึ้นครั้งเดียว เมฆทั้งท้องฟ้าแยกเป็นสองซีกไปจนสุดขอบฟ้า','myth',true);try{const d=LS.get('murim_ttl',{});const t='ผู้ถือกระบี่ผ่าฟ้า';if(!d[t]){d[t]={n:S.name,t:Date.now(),c:1};LS.set('murim_ttl',d)}}catch(e){}}}catch(e){}return r}}
EVENTS.push({w:3,cd:8,c:s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&s.sv.sp.some(x=>x.id===SW)&&s.age>=12),f(){const n=R2(0,2);const T=[['🥷 นักล่าสายเลือด','กลุ่มชุดดำตามหาผู้ถือกระบี่ผ่าฟ้ามาหลายรุ่น วันนี้พวกมันเจอคุณ',1],['🏯 ตระกูลใหญ่ต้องการกระบี่','ประมุขตระกูลใหญ่ส่งคนมาขอ "เชิญ" คุณเข้าตระกูล หรือไม่ก็…',1.05],['👁️ ผู้อาวุโสลึกลับ','ชายชราที่รู้จักชื่อปู่ทวดของคุณ ขอประลองดูว่ากระบี่ยังคมอยู่ไหม',1.15]][n];
 choice(T[0],T[1],[{t:'🗡️ ชักกระบี่',s:'ดวล',noFate:1,f(){duel(T[0].replace(/^\S+\s/,''),Math.round(total()*T[2]),w=>{if(w){S.fame+=60;S.sv.bond=Math.min(100,(S.sv.bond||50)+5);log(n===2?'👁️ ชายชราหัวเราะ "ยังคมเหมือนเดิม" แล้วสอนเคล็ดลับของตระกูลให้หนึ่งท่า':'🗡️ คุณชนะ ข่าวว่าผู้ถือกระบี่ผ่าฟ้ายังมีชีวิตแพร่ไปทั่วทวีป','epic',true);if(n===2)S.power+=pctPow(.05)}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.3));log('🩸 คุณถอยหนีมาพร้อมบาดแผลลึก','bad')}})}},
  {t:'🌫️ ซ่อนตัว',s:'ปลอดภัย · ความผูกพันดวงจิตลด',noFate:1,f(){S.sv.bond=Math.max(0,(S.sv.bond||50)-5);log('🌫️ คุณซ่อนกระบี่ไว้ในเงา มันส่งเสียงครางเบา ๆ อย่างไม่พอใจ','')}}])}});
// ---------- 🎯 แนวทางการเล่น ----------
const PS={solo:['🗡️','สายเดี่ยว (โซโล่)','ไม่รับสมาชิกทีม · ศัตรูอ่อนลง 10% · ระดับจิตโตเร็วขึ้น 15% · หลอมเกินขีดเสี่ยงน้อยลง'],duo:['👥','สายคู่ (ดูโอ)','มีคู่หูได้ 1 คน · ความผูกพันโตเร็ว · ศัตรูอ่อนลงเพิ่ม 6% เมื่อมีคู่หู'],team:['🛡️','สายทีม','รับสมาชิกได้ถึง 6 คน · โบนัสทีมตามจำนวนและความหลากหลายของสาย (แบบเดิม)']};
const tm=()=>S.sv.tm,mem=()=>tm()&&tm().m?tm().m.filter(x=>x.al):[];
const ps=()=>(S.sv&&S.sv.ps)||'team';
// บังคับเพดานสมาชิกตามแนวทาง (ห่อเงื่อนไขของเหตุการณ์รับสมาชิกเดิม)
const capM=()=>ps()==='solo'?0:ps()==='duo'?1:6;
function patchRec(){}
{const _ch=choice;choice=function(t){try{if(on()&&/ขอร่วมทีม/.test(String(t||''))&&mem().length>=capM())return}catch(e){}return _ch.apply(this,arguments)};Object.assign(choice,_ch)}
{const _g=window._svGrow;window._svGrow=g=>(_g?_g(g):1)*(g&&g.ps==='solo'?1.15:1)}
{const _r=window._svRisk;window._svRisk=(g,t,o)=>(_r?_r(g,t,o):0)+(g&&g.ps==='solo'?.06:0)}
{const _f=fight;fight=function(n,ep){try{if(on()){if(ps()==='solo')ep*=.9;else if(ps()==='duo'&&mem().length===1)ep*=.94}}catch(e){}return _f.call(this,n,ep)}}
{const _d=duel;duel=function(n,ep,cb){try{if(on()){if(ps()==='solo')ep*=.9;else if(ps()==='duo'&&mem().length===1)ep*=.94}}catch(e){}return _d.call(this,n,ep,cb)}}
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{patchRec();if(on()&&ps()==='duo'){const m=mem()[0];if(m)m.bd=Math.min(100,(m.bd||50)+2)}
 if(on()&&!S.sv.ps&&S.age>=9&&!S.sv._psW){S.sv._psW=1;let n=0;const t=setInterval(()=>{if(++n>60||!on()||S.sv.ps){clearInterval(t);if(S&&S.sv)S.sv._psW=0;return}if(globalThis.choice._cur||modalOpen)return;clearInterval(t);S.sv._psW=0;psPick(1)},500)}}catch(e){}return r}}
function psSet(k,first){const g=S.sv;g.ps=k;g.psY=S.age;if(k!=='team'&&tm()&&tm().m){const L=mem();const keep=capM();L.slice(keep).forEach(x=>{x.al=0;x.gone='part';(tm().hist=tm().hist||[]).push(`${x.n} แยกทางกันด้วยดี (${S.age})`)});if(L.length>keep)log(`👋 สมาชิก ${L.length-keep} คนแยกทางไปด้วยดี ตามแนวทางที่คุณเลือก`,'')}
 log(`${PS[k][0]} คุณเลือกเดินบน<b>${PS[k][1]}</b> — ${PS[k][2]}`,first?'epic':'')}
function psPick(first){const g=S.sv;choice('🎯 จะเดินบนเส้นทางแบบไหน',`ผู้ฝึกจิตบางคนเดินคนเดียว บางคนมีคู่หูคนเดียวที่ไว้ใจ บางคนสร้างทีม${first?'':'<br><span class="tag2">เปลี่ยนได้ทุก 5 ปี</span>'}`,Object.entries(PS).map(([k,v])=>({t:`${v[0]} ${v[1]}${g.ps===k?' (ตอนนี้)':''}`,s:v[2],noFate:1,f(){psSet(k,first)}})))}
window.svPsPick=function(){if(!on())return;const g=S.sv;if(g.psY!=null&&S.age-g.psY<5)return toast(`เปลี่ยนแนวทางได้อีกครั้งตอนอายุ ${g.psY+5}`);closeM();setTimeout(()=>psPick(0),200)};
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const m=$('modal'),bk=m.querySelector('button[onclick="openSoulBook()"]');if(bk&&!m.querySelector('.svPs')){const k=ps(),v=PS[k];bk.insertAdjacentHTML('beforebegin',`<div class="item svPs"><b>🎯 แนวทาง: ${v[0]} ${v[1]}</b><br><span class="tag2">${v[2]}${hasSW()?'<br>🗡️ กระบี่ผ่าฟ้า: ศัตรูอ่อนลง 10% · หลอมเกินขีดง่ายขึ้น · ใจไม่นิ่ง (ผูกพันต่ำกว่า 40) พลังย้อน · ระดับจิต 70 ปลดร่างแท้':''}</span><button class="gbtn" style="width:100%;margin-top:6px" onclick="svPsPick()">เปลี่ยนแนวทาง</button></div>`)}}catch(e){}return r}}
})()}catch(e){console.error('svsw',e)}
__done=1;SL.impl.startLife=startLife;startLife=function(){return globalThis.startLife.apply(this,arguments)};SL.impl.fight=fight;fight=function(){return globalThis.fight.apply(this,arguments)};SL.impl.duel=duel;duel=function(){return globalThis.duel.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};})();

// ---- ท่อน soul11 (เดิมอยู่ app.js บรรทัด 37235) · ห่อ: openSoul, choice ----
(function(){const SL=globalThis.__wSlots['soul11'];let openSoul=SL.base.openSoul;let choice=SL.base.choice;const __G={openSoul:()=>openSoul,choice:()=>choice},__S={openSoul:v=>{openSoul=v},choice:v=>{choice=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pk=a=>a[R2(0,a.length-1)];
const O=(t,s,f)=>({t,s,noFate:1,f});
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const A=()=>{const g=S.sv;if(!g.arc4)g.arc4={ch:0,y:-99,fl:{}};return g.arc4};
const ac=()=>{const g=S.sv;return g.ac&&window._sv4?window._sv4.AC[g.ac.id]:null};
const rv=()=>{const t=S.sv.tm;return t&&t.rv?t.rv.filter(r=>r.al):[]};
const team=()=>{const t=S.sv.tm;return t&&t.m?t.m.filter(x=>x.al).length:0};
const pst=()=>S.sv.ps||'team';
const regN=()=>{try{return(window._svRN||{})[S.sv.reg||'gold']||'ทวีป'}catch(e){return'ทวีป'}};
const done=(ch,why)=>{const a=A();a.ch=ch;a.y=S.age;if(why)(a.log=a.log||[]).push(why)};
// ---- บทที่ 1: เด็กหายในแคว้น ----
const C1=()=>{const a=A(),t=ac();choice('📜 ลัทธิกลืนดวงจิต · บทที่ 1: เด็กที่หายไป',`ใน${regN()}มีผู้ฝึกจิตรุ่นเยาว์หายตัวไปสามคนในเดือนเดียว ทุกคนถูกพบอีกครั้ง… ยังมีชีวิต แต่<b>ดวงจิตหายไป</b>`,[
 O('🔍 สืบเองเงียบ ๆ','มินิเกมจำร่องรอย',()=>{const go=()=>window.mg2Play&&window.mg2Play('future',{noSkip:1,title:'ปะติดปะต่อร่องรอย',sub:'จำลำดับเหตุการณ์ที่พยานเล่า'},sc=>{if(sc>=.5){a.fl.clue=1;S.int+=6;log('🔍 คุณพบสัญลักษณ์งูกลืนหางสลักไว้ทุกที่ที่เด็กหายตัว <b>ลัทธิกลืนดวงจิต</b>','myth',true)}else log('🔍 ร่องรอยขาดหาย แต่คุณรู้แน่ว่ามีคนอยู่เบื้องหลัง','');done(1);try{render()}catch(e){}});setTimeout(go,300)}),
 O(t?`🏫 แจ้ง${t[1]}`:'🏛️ แจ้งทางการ','ปลอดภัย · ชื่อเสียง +',()=>{S.fame+=20;a.fl.told=1;log(t?`🏫 อาจารย์ใหญ่แห่ง${t[1]}ฟังแล้วหน้าซีด "เรื่องนี้ห้ามบอกใคร"`:'🏛️ ทางการรับเรื่องไว้ แล้วก็เงียบหายไป','');done(1)}),
 O('🙈 ไม่ใช่เรื่องของเรา','',()=>{log('🙈 คุณหันหลังให้ข่าวลือ แต่ข่าวลือไม่หันหลังให้คุณ','');done(1)})])};
// ---- บทที่ 2: เพื่อนหายตัว ----
const C2=()=>{const a=A(),r=pk(rv())||null,nm=r?r.n:anyName(Math.random()<.5?'ชาย':'หญิง');a.fl.fr=nm;
 choice('📜 ลัทธิกลืนดวงจิต · บทที่ 2: คนที่คุณรู้จัก',`<b>${esc(nm)}</b>${r?' คู่แข่งรุ่นเดียวกันคุณ':' เพื่อนสมัยเด็ก'} หายตัวไป เหลือไว้แค่ป้ายผ้าสีดำลายงูกลืนหาง`,[
 O('🗡️ บุกฐานลับ','ดวลกับผู้คุมลัทธิ',()=>{duel('ผู้คุมลัทธิกลืนดวงจิต',Math.round(total()*1),w=>{if(w){a.fl.saved=1;S.fame+=60;S.karma+=8;if(r)r.rel=(r.rel||0)+30;log(`🗡️ คุณพัง${'ประตูฐานลับ'}และพา <b>${esc(nm)}</b> ออกมาได้ก่อนพิธีกลืนดวงจิตจะเริ่ม`,'epic',true)}else{a.fl.lost=1;hurt(.3);log(`🩸 คุณมาช้าไป — <b>${esc(nm)}</b> รอด แต่ดวงจิตถูกกลืนไปแล้ว`,'bad',true);if(r)r.lv=Math.max(1,Math.round(r.lv*.3))}done(2)})}),
 O('🕵️ ปลอมตัวแฝงเข้าไป','เสี่ยงถูกจับได้ · ได้ข้อมูลมาก',()=>{if(Math.random()<.5+(S.int||0)/400){a.fl.inside=1;S.int+=8;log('🕵️ คุณแฝงตัวได้สามคืน รู้ว่าลัทธินี้กลืนดวงจิตเพื่อ "ปลุกบางสิ่ง" ในป่าต้องห้าม','myth',true)}else{hurt(.35);log('🕵️ ถูกจับได้ คุณหนีออกมาได้ด้วยแผลเต็มตัว','bad')}done(2)})])};
// ---- บทที่ 3: สัตว์แสนปีตื่นก่อนเวลา ----
const C3=()=>{const a=A();choice('📜 ลัทธิกลืนดวงจิต · บทที่ 3: ป่าลุกเป็นไฟ','ลัทธิใช้ดวงจิตที่ขโมยมาปลุก <b>สัตว์วิญญาณแสนปี</b> ในป่าต้องห้ามก่อนเวลา มันคลั่งและกำลังมุ่งหน้าเข้าเมือง',[
 O('🛡️ ตั้งแนวป้องกันหมู่บ้าน','ดวล · ช่วยชาวบ้าน',()=>{duel('สัตว์วิญญาณแสนปีที่คลั่ง',Math.round(total()*1.15),w=>{if(w){S.karma+=15;S.fame+=150;a.fl.vill=1;log('🛡️ แนวป้องกันของคุณยื้อมันไว้ได้จนรุ่งเช้า มันสงบลงและหันกลับเข้าป่า','myth',true)}else{hurt(.35);S.fame+=40;log('🛡️ แนวป้องกันแตก แต่ชาวบ้านส่วนใหญ่หนีทัน','bad',true)}done(3)})}),
 O('🎯 ตามล่าผู้ทำพิธี','ตัดต้นตอ · ชาวบ้านเสี่ยง',()=>{duel('นักบวชลัทธิผู้ทำพิธี',Math.round(total()*1.05),w=>{if(w){a.fl.priest=1;S.power+=pctPow(.04);log('🎯 คุณหยุดพิธีได้ สัตว์แสนปีหลับลงกลางป่า แต่หมู่บ้านชายป่าพังไปครึ่งหนึ่ง','epic',true);S.karma-=3}else{hurt(.3);log('🎯 นักบวชหนีไปได้','bad')}done(3)})})])};
// ---- บทที่ 4: ผู้อยู่เบื้องหลัง ----
const C4=()=>{const a=A(),t=ac();const who=t&&Math.random()<.5?`อาจารย์ใหญ่แห่ง${t[1]}`:'ขุนนางชั้นสูงในนครหลวงหยกขาว';a.fl.who=who;
 choice('📜 ลัทธิกลืนดวงจิต · บทที่ 4: หน้ากากหลุด',`หลักฐานทั้งหมดชี้ไปที่คนคนเดียว <b>${who}</b> ผู้ที่ทุกคนเคารพ`,[
 O('📣 เปิดโปงต่อหน้าทุกคน','เสี่ยงคนไม่เชื่อ · ชื่อเสียงมาก',()=>{const p=.45+(a.fl.clue?.15:0)+(a.fl.inside?.15:0)+(S.fame>2000?.1:0);if(Math.random()<p){S.fame+=300;a.fl.exp=1;log(`📣 หลักฐานคุณมัดแน่น <b>${who}</b> ถูกปลด ลัทธิสูญเสียที่กำบัง`,'myth',true)}else{S.fame=Math.max(0,S.fame-200);a.fl.disb=1;log('📣 ไม่มีใครเชื่อ คุณถูกตราหน้าว่าใส่ร้ายผู้ใหญ่','bad',true)}done(4)}),
 O('🕸️ เก็บไว้เป็นไพ่ตาย','ไม่เสี่ยงตอนนี้ · ได้เปรียบในศึกสุดท้าย',()=>{a.fl.card=1;S.int+=5;log('🕸️ คุณเก็บหลักฐานไว้เงียบ ๆ รอวันที่มันจะมีค่าที่สุด','');done(4)})])};
// ---- บทที่ 5: ศึกปกป้องทวีป (3 รอบ) ----
const C5=()=>{const a=A();const ally=pst()==='solo'?'คุณเลือกเดินคนเดียว แต่ความโดดเดี่ยวทำให้คุณแกร่งกว่าใคร':pst()==='duo'?'คู่หูคุณยืนอยู่ข้างกาย':`ทีมของคุณ ${team()} คนพร้อมแล้ว`;
 const help=(a.fl.vill?.04:0)+(a.fl.exp?.06:0)+(a.fl.card?.05:0)+(a.fl.saved?.04:0)+(pst()==='team'?Math.min(.08,team()*.015):pst()==='duo'&&team()?.05:0);
 const F=[['กองทัพสาวกลัทธิ',.95],['ผู้พิทักษ์สามตนของลัทธิ',1.1],['เจ้าลัทธิกลืนดวงจิต',1.35]];let i=0;
 choice('📜 ลัทธิกลืนดวงจิต · บทที่ 5: ศึกปกป้องทวีป',`ลัทธิเปิดศึกกลางทวีป ดวงจิตนับพันที่ถูกขโมยไปหมุนวนเหนือหัวเจ้าลัทธิ<br>${ally}<br><span class="tag2">สิ่งที่คุณทำในบทก่อน ๆ ช่วยให้ศัตรูอ่อนลงราว ${Math.round(help*100)}%</span>`,[
 O('⚔️ ออกศึก','ดวล 3 รอบ',()=>{const go=()=>{const f=F[i];duel(f[0],Math.round(total()*f[1]*(1-help)),w=>{if(!S||!S.alive)return;if(w){i++;if(i>=3){a.win=1;S.fame+=3000;S.power+=pctPow(.15);S.karma+=20;try{const d=LS.get('murim_ttl',{});const tt='ผู้ปกป้องทวีปวิญญาณ';if(!d[tt]){d[tt]={n:S.name,t:Date.now(),c:1};LS.set('murim_ttl',d)}}catch(e){}log(`🌅 <b>เจ้าลัทธิกลืนดวงจิตพ่ายแพ้</b> ดวงจิตนับพันดวงถูกปลดปล่อยกลับไปหาเจ้าของ${a.fl.lost&&a.fl.fr?` รวมถึงดวงจิตของ <b>${esc(a.fl.fr)}</b>`:''} · ได้ฉายา 「ผู้ปกป้องทวีปวิญญาณ」`,'myth',true);done(5,'win');return}log(`⚔️ ผ่าน${f[0]}แล้ว`,'epic');setTimeout(go,500)}else{hurt(.4);log(`🩸 คุณพ่ายให้${f[0]} ลัทธิหนีไปตั้งหลัก อีกสิบปีมันจะกลับมา`,'bad',true);a.ch=4;a.y=S.age+6}})};go()}),
 O('⏳ ยังไม่พร้อม','ลัทธิจะรอ… แต่ไม่นาน',()=>{a.y=S.age;log('⏳ คุณถอยไปฝึกต่อ ข่าวการรุกคืบของลัทธิดังมาทุกปี','')})])};
const CH=[[1,12,15,C1],[2,13,30,C2],[3,15,45,C3],[4,17,60,C4],[5,19,75,C5]];
EVENTS.push({w:6,cd:2,c:s=>{if(!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1))return false;const a=A();if(a.win)return false;const c=CH[a.ch];return!!(c&&s.age>=c[1]&&s.sv.lv>=c[2]&&s.age-a.y>=3)},f(){const a=A();const c=CH[a.ch];if(c)c[3]()}});
// แสดงความคืบหน้าในหน้าดวงจิต
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const a=A(),m=$('modal'),bk=m.querySelector('button[onclick="openSoulBook()"]');if(bk&&!m.querySelector('.svArc')){const nx=CH[a.ch];bk.insertAdjacentHTML('beforebegin',`<div class="item svArc"><b>📜 ลัทธิกลืนดวงจิต</b> · ${a.win?'🌅 จบแล้ว คุณปกป้องทวีปได้':`บทที่ ${a.ch}/5`}<br><span class="tag2">${a.win?'ได้ฉายา ผู้ปกป้องทวีปวิญญาณ':nx?`บทถัดไปเปิดเมื่ออายุ ${nx[1]}+ และระดับจิต ${nx[2]}+`:''}</span></div>`)}}catch(e){}return r}}
// ---- สมุดดวงจิต: นับสัตว์ประจำแคว้น ----
{const _ob=window.openSoulBook;window.openSoulBook=function(){const r=_ob.apply(this,arguments);try{const RB=window._svRB,RN=window._svRN||{};if(!RB)return r;const got=LS.get('murim_svring',{})||{};const all=Object.values(RB).flat();const n=all.filter(b=>got[b[0]]).length;const m=$('modal');
 m.insertAdjacentHTML('beforeend',`<h4>🗺️ สัตว์ประจำแคว้น ${n}/${all.length}</h4>${Object.entries(RB).map(([k,L])=>`<div style="margin:3px 0"><b>${esc(RN[k]||k)}</b>: ${L.map(b=>got[b[0]]?b[0]:'<span style="opacity:.45">???</span>').join(' · ')}</div>`).join('')}`)}catch(e){}return r}}
// ---- รวมสอบชิงทุนเก่าเข้าระบบสถาบัน ----
{const _ch=choice;choice=function(t){try{if(on()&&/สถาบันจิตยุทธ์เปิดรับนักเรียน/.test(String(t||''))&&window._sv4){const g=S.sv;if(!g.ac&&S.age>=11&&S.age<=16)setTimeout(()=>{if(on()&&!globalThis.choice._cur)window._sv4.examOffer()},300);return}}catch(e){}return _ch.apply(this,arguments)};Object.assign(choice,_ch)}
window._sv6={A,CH};
})()}catch(e){console.error('sv6',e)}
__done=1;SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};})();

// ---- ท่อน soul12 (เดิมอยู่ app.js บรรทัด 37287) · ห่อ: openSoul, drawDuel, openMenu ----
(function(){const SL=globalThis.__wSlots['soul12'];let openSoul=SL.base.openSoul;let drawDuel=SL.base.drawDuel;let openMenu=SL.base.openMenu;const __G={openSoul:()=>openSoul,drawDuel:()=>drawDuel,openMenu:()=>openMenu},__S={openSoul:v=>{openSoul=v},drawDuel:v=>{drawDuel=v},openMenu:v=>{openMenu=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;const {TIER,spNow}=B;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const twin=g=>!!(g&&g.sp&&g.sp.length>1&&!g.fused&&!g.dorm);
const TYN={atk:'⚔️ โจมตี',def:'🛡️ ป้องกัน',sup:'🌿 สนับสนุน',ctrl:'🌀 ควบคุม',agi:'💨 ว่องไว'};
// วงแหวนใหม่ของคนมีดวงจิตคู่ → เลือกว่าจะหลอมเข้าดวงไหน
let asking=0;
setInterval(()=>{try{if(!on()||asking)return;const g=S.sv;if(!twin(g)){g.rings.forEach(r=>{if(r.sp==null)r.sp=0});return}
 if(g._spMig==null){g._spMig=1;g.rings.forEach((r,i)=>{if(r.sp==null)r.sp=i%2})}
 const i=g.rings.findIndex(r=>r.sp==null);if(i<0||choice._cur||modalOpen)return;const r=g.rings[i];asking=1;
 const P=g.sp.map(spNow),cnt=k=>g.rings.filter(x=>x.sp===k).length;
 choice(`⭕ วงแหวนวงที่ ${i+1} — หลอมเข้าดวงจิตไหน`,`${TIER[r.t|0][1]} ${TIER[r.t|0][0]}ของ${esc(r.b||'')} ลอยอยู่ระหว่างดวงจิตทั้งสองของคุณ<br><span class="tag2">วงแหวนจะใช้ชื่อท่าตามดวงจิตที่รับไว้ · ทั้งสองดวงมีวงแหวนครบ 3 วงจะปลด <b>ท่าผสานคู่</b></span>`,
  P.map((p,k)=>({t:`${p.ic} ${p.n} (มี ${cnt(k)} วง)`,s:`${TYN[p.t]||''} · ท่า「${p.n}·${r.sk||''}」`,noFate:1,f(){r.sp=k;asking=0;log(`⭕ วงแหวนวงที่ ${i+1} หลอมเข้า <b>${p.ic} ${p.n}</b> — ได้ท่า 「${p.n}·${esc(r.sk||'')}」`,'epic');combo()}})));
 setTimeout(()=>{asking=0},60000)}catch(e){asking=0}},1500);
function combo(){const g=S.sv;if(g.twinCombo||!twin(g))return;if([0,1].every(k=>g.rings.filter(x=>x.sp===k).length>=3)){g.twinCombo=1;const P=g.sp.map(spNow);S.power+=pctPow(.12);S.fame+=300;log(`🌀 <b>ท่าผสานคู่ปลดล็อก</b> ${P[0].ic}${P[0].n} กับ ${P[1].ic}${P[1].n} หมุนวนเป็นหนึ่งเดียว 「${P[0].n}×${P[1].n}·สองดวงหนึ่งใจ」`,'myth',true);try{const d=LS.get('murim_ttl',{});const t='ผู้ครองดวงจิตคู่';if(!d[t]){d[t]={n:S.name,t:Date.now(),c:1};LS.set('murim_ttl',d)}}catch(e){}}}
// หน้าดวงจิต: แยกวงแหวนตามดวงจิต
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const g=S.sv;if(!twin(g))return r;const m=$('modal'),bk=m.querySelector('button[onclick="openSoulBook()"]');if(!bk||m.querySelector('.svTw'))return r;const P=g.sp.map(spNow);
 bk.insertAdjacentHTML('beforebegin',`<div class="item svTw"><b>👯 วงแหวนแยกตามดวงจิต</b>${P.map((p,k)=>{const L=g.rings.map((x,i)=>[x,i]).filter(([x])=>x.sp===k);return`<div style="margin-top:4px">${p.ic} <b>${p.n}</b> · ${L.length} วง ${L.map(([x,i])=>`<span title="วงที่ ${i+1}" style="display:inline-block;width:14px;height:14px;border-radius:50%;border:3px solid ${TIER[x.t|0][2]};vertical-align:middle;margin-left:2px"></span>`).join('')}</div>`}).join('')}<span class="tag2">${g.twinCombo?'🌀 ท่าผสานคู่ปลดแล้ว':'ทั้งสองดวงมีครบ 3 วง → ปลดท่าผสานคู่'}</span></div>`)}catch(e){}return r}}
// ท่าตอนดวล: วงแหวนของดวงไหน ใช้ชื่อดวงนั้น
{const _dd=drawDuel;drawDuel=function(fin){const r=_dd.apply(this,arguments);try{if(!on()||!twin(S.sv))return r;const m=$('modal'),sk=m&&m.querySelector('.svSk');if(sk&&sk.textContent){const mm=/^วงที่ (\d+)/.exec(sk.textContent);if(mm){const x=S.sv.rings[+mm[1]-1];if(x&&x.sp!=null){const p=spNow(S.sv.sp[x.sp]);sk.textContent=`วงที่ ${mm[1]} 「${p.n}·${x.sk||''}」`}}}}catch(e){}return r}}
// ซ่อนเมนูยุทธภพในโหมดล้วน (สำนัก · ทำเนียบสิบสำนัก · สุ่มคัมภีร์ยุทธ์ · ยุทธภพของฉัน)
const HIDE=/^(openFaction|openRanking|gachaArt|openWuxia)\(/;
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(!(window._dlPure&&window._dlPure()))return r;const m=$('modal');m.querySelectorAll('button').forEach(b=>{const oc=(b.getAttribute('onclick')||'').replace(/^closeM\(\);/,'');if(HIDE.test(oc))b.style.display='none'})}catch(e){}return r}}
})()}catch(e){console.error('sv7',e)}
__done=1;SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};SL.impl.drawDuel=drawDuel;drawDuel=function(){return globalThis.drawDuel.apply(this,arguments)};SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน soul13 (เดิมอยู่ app.js บรรทัด 37313) · ห่อ: openSoul ----
(function(){const SL=globalThis.__wSlots['soul13'];let openSoul=SL.base.openSoul;const __G={openSoul:()=>openSoul},__S={openSoul:v=>{openSoul=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34,X6=window._sv6;if(!B||!X6)return;const {A,CH}=X6;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pk=a=>a[R2(0,a.length-1)];
const O=(t,s,f)=>({t,s,noFate:1,f});
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const title=t=>{try{const d=LS.get('murim_ttl',{});if(!d[t]){d[t]={n:S.name,t:Date.now(),c:1};LS.set('murim_ttl',d)}}catch(e){}};
const regN=()=>{try{return(window._svRN||{})[S.sv.reg||'gold']||'ทวีป'}catch(e){return'ทวีป'}};
const team=()=>{const t=S.sv.tm;return t&&t.m?t.m.filter(x=>x.al).length:0};
// ---- เลือกเนื้อเรื่องหลักของชีวิตนี้ ----
const ARCN={cult:'📜 ลัทธิกลืนดวงจิต',war:'⚔️ สงครามระหว่างแคว้น',beast:'🐾 สัตว์วิญญาณทวงคืนป่า',heir:'👑 ทายาทราชสำนักลับ'};
const arcK=()=>{const g=S.sv;if(!g.arcK){const a=g.arc4;g.arcK=a&&a.ch>0?'cult':pk(['cult','war','beast','heir'])}return g.arcK};
// ลัทธิเดิมขึ้นเฉพาะชีวิตที่สุ่มได้เรื่องนี้
for(const e of EVENTS){try{if(String(e.f).includes('CH[a.ch]')&&!e._arcW){e._arcW=1;const c=e.c;e.c=function(s){if(s&&s.sv&&s.ch==='soul'&&s.sv.aw===1&&arcK()!=='cult')return false;return c.apply(this,arguments)}}}catch(x){}}
// ---- สายมืดในเรื่องลัทธิ: บทที่ 2 เข้าร่วมลัทธิได้ ----
const c2=CH[1][3];
CH[1][3]=function(){const a=A();if(a.dark)return;const nm=anyName(Math.random()<.5?'ชาย':'หญิง');
 choice('📜 ลัทธิกลืนดวงจิต · บทที่ 2: ข้อเสนอในเงามืด',`ระหว่างตามรอยคนหาย ชายสวมหน้ากากงูยื่นข้อเสนอ "เข้าร่วมกับเรา แล้วเจ้าจะได้พลังจากดวงจิตนับร้อย"`,[
 O('🗡️ ปฏิเสธแล้วสืบต่อ','ไปตามเส้นทางของวีรบุรุษ',()=>{setTimeout(()=>{if(on())c2()},300)}),
 O('🐍 รับข้อเสนอ','สายมืด · พลัง ++ · กรรม −−',()=>{a.dark=1;a.ch=2;a.y=S.age;S.power+=pctPow(.08);S.karma-=25;log('🐍 คุณรับหน้ากากงูมาสวม ดวงจิตที่ถูกขโมยมาไหลเข้าเส้นจิตคุณเหมือนไฟ','myth',true)})])};
const D3=()=>{const a=A();choice('🐍 สายมืด · บทที่ 3: พิธีปลุก','ลัทธิสั่งให้คุณนำพิธีปลุกสัตว์วิญญาณแสนปี หมู่บ้านชายป่าจะต้องถูกสังเวย',[
 O('🔥 ทำพิธีตามคำสั่ง','พลัง + · กรรม −−',()=>{S.power+=pctPow(.06);S.karma-=20;log('🔥 สัตว์แสนปีตื่นขึ้นท่ามกลางเปลวไฟ ชื่อคุณถูกจารึกในบัญชีลับของลัทธิ','bad',true);a.ch=3;a.y=S.age}),
 O('🕊️ แอบเตือนชาวบ้านให้หนี','เสี่ยงถูกจับได้',()=>{if(Math.random()<.55){S.karma+=10;a.fl.mercy=1;log('🕊️ ชาวบ้านหนีทัน ลัทธิยังไม่รู้ว่าเป็นฝีมือคุณ','good')}else{hurt(.3);log('🩸 ผู้คุมลัทธิจับได้ คุณโดนลงทัณฑ์','bad')}a.ch=3;a.y=S.age})])};
const D4=()=>{const a=A();choice('🐍 สายมืด · บทที่ 4: ข้างในลัทธิ','เจ้าลัทธิเรียกคุณไปพบเป็นการส่วนตัว "เจ้าคือผู้สืบทอดที่ข้ารอมานาน"',[
 O('👑 รับเป็นผู้สืบทอด','เตรียมยึดลัทธิ',()=>{a.fl.heirC=1;S.fame+=100;log('👑 คุณได้เห็นห้องที่เก็บดวงจิตนับพัน และรู้ว่าเจ้าลัทธิกลัวคุณ','myth',true);a.ch=4;a.y=S.age}),
 O('🗝️ แอบส่งหลักฐานให้ทางการ','หักหลังจากข้างใน',()=>{a.fl.mole=1;S.karma+=15;log('🗝️ คุณส่งแผนที่ฐานลับทั้งหมดออกไป ศึกสุดท้ายใกล้เข้ามาแล้ว','epic',true);a.ch=4;a.y=S.age})])};
const D5=()=>{const a=A();const L=a.fl.mole?[['ผู้พิทักษ์สามตน',1.05],['เจ้าลัทธิกลืนดวงจิต',1.25]]:[['เจ้าลัทธิกลืนดวงจิต',1.3]];let i=0;
 choice('🐍 สายมืด · บทที่ 5: ชิงบัลลังก์งู',a.fl.mole?'กองกำลังทางการบุกเข้ามาตามแผนที่ที่คุณส่งไป ตอนนี้แหละที่ต้องเลือกข้าง':'คืนนี้คือคืนที่คุณจะยึดลัทธิทั้งหมด',[
 O('⚔️ ลงมือ','ดวล',()=>{const go=()=>{const f=L[i];duel(f[0],Math.round(total()*f[1]),w=>{if(!S||!S.alive)return;if(w){i++;if(i>=L.length){a.win=1;a.ch=5;if(a.fl.mole){S.fame+=2500;S.karma+=30;title('ผู้หักหลังเงามืด');log('🌅 คุณทำลายลัทธิจากข้างใน ทวีปไม่มีวันรู้ทั้งหมดว่าคุณเคยยืนข้างไหน แต่ดวงจิตนับพันได้กลับบ้าน','myth',true)}else{S.power+=pctPow(.25);S.fame+=1500;S.karma-=30;title('เจ้าลัทธิงูกลืนหาง');log('🐍 <b>คุณคือเจ้าลัทธิคนใหม่</b> ดวงจิตนับพันหมุนรอบตัวคุณ ทวีปทั้งทวีปเริ่มกลัวชื่อคุณ','myth',true)}return}setTimeout(go,500)}else{hurt(.4);a.y=S.age+5;log('🩸 คุณพลาด ต้องซ่อนตัวรอจังหวะใหม่','bad',true)}})};go()}),
 O('⏳ รอจังหวะ','',()=>{a.y=S.age;log('⏳ คุณยังไม่ลงมือ','')})])};
[[2,D3],[3,D4],[4,D5]].forEach(([k,fd])=>{const f0=CH[k][3];CH[k][3]=function(){if(A().dark)return fd();return f0()}});
// ---- เนื้อเรื่องหลักอีก 3 เรื่อง (4 บท) ----
const AR={
 war:[[12,15,()=>choice('⚔️ สงครามระหว่างแคว้น · บทที่ 1: ปะทะที่ชายแดน',`ทหารสองแคว้นปะทะกันที่ชายแดน${regN()} ไม่มีใครรู้ว่าใครเริ่มก่อน`,[O('🛡️ ปกป้องแคว้นบ้านเกิด','ดวล',()=>duel('ทหารแคว้นศัตรู',Math.round(total()*.9),w=>{const X=wx();X.side='home';if(w){S.fame+=50;log('🛡️ คุณยันแนวชายแดนไว้ได้','epic')}else hurt(.2);nx()})),O('🕊️ เป็นคนกลางเจรจา','กรรม + · ชื่อเสียง +',()=>{const X=wx();X.side='peace';S.karma+=10;S.fame+=30;log('🕊️ คุณหยุดการปะทะได้ชั่วคราว แต่ไฟยังคุอยู่','good');nx()})])],
  [14,35,()=>choice('⚔️ สงครามระหว่างแคว้น · บทที่ 2: สายลับ','มีคนในแคว้นคุณส่งข่าวให้ศัตรู คุณถูกขอให้หาตัวคนทรยศ',[O('🔍 สืบหาด้วยตัวเอง','มินิเกม',()=>{const go=()=>window.mg2Play&&window.mg2Play('future',{noSkip:1,title:'จับสายลับ'},sc=>{const X=wx();if(sc>=.5){X.spy=1;S.fame+=80;log('🔍 คุณจับสายลับได้ มันคือคนที่ทุกคนไว้ใจที่สุด','epic',true)}else log('🔍 สายลับหนีไปได้','');nx();try{render()}catch(e){}});setTimeout(go,300)}),O('💰 ซื้อข่าวจากตลาดมืด','เงิน −',()=>{S.money=Math.max(0,S.money-inc(800));wx().spy=1;log('💰 ข่าวที่ซื้อมาตรงเป๊ะ','');nx()})])],
  [17,55,()=>choice('⚔️ สงครามระหว่างแคว้น · บทที่ 3: ศึกใหญ่','สงครามเต็มรูปแบบปะทุขึ้น ผู้ฝึกจิตทุกคนถูกเรียกตัว',[O('⚔️ นำทัพหน้า','ดวล · แรงมาก',()=>duel('แม่ทัพผู้ฝึกจิตฝ่ายศัตรู',Math.round(total()*(wx().spy?1:1.15)),w=>{if(w){wx().won=1;S.fame+=300;S.power+=pctPow(.05);log('⚔️ แม่ทัพศัตรูพ่าย ทั้งสนามรบตะโกนชื่อคุณ','myth',true)}else{hurt(.35);log('⚔️ ทัพคุณถอยร่น','bad',true)}nx()})),O('🏥 ดูแลผู้บาดเจ็บ','กรรม ++',()=>{S.karma+=20;log('🏥 คุณช่วยชีวิตคนได้หลายร้อย ทั้งสองฝ่าย','good',true);wx().heal=1;nx()})])],
  [20,70,()=>{const X=wx();choice('⚔️ สงครามระหว่างแคว้น · บทที่ 4: หลังสงคราม',X.won?'ฝ่ายคุณชนะ ผู้นำแคว้นถามว่าจะทำอย่างไรกับแคว้นที่แพ้':'ทั้งสองฝ่ายเหนื่อยล้า โต๊ะเจรจาว่างอยู่หนึ่งที่สำหรับคุณ',[O('📜 สนธิสัญญาสันติภาพ','จบแบบผู้สร้างสันติ',()=>{S.karma+=25;S.fame+=1500;title('ผู้ยุติสงครามแห่งทวีป');log('📜 คุณร่างสนธิสัญญาที่ทำให้ทวีปสงบไปอีกร้อยปี ได้ฉายา 「ผู้ยุติสงครามแห่งทวีป」','myth',true);fin()}),O('👑 ผนวกแคว้นที่แพ้','จบแบบผู้พิชิต · กรรม −',()=>{S.karma-=15;S.fame+=2000;S.money+=inc(5000);title('ผู้พิชิตสองแคว้น');log('👑 แผนที่ทวีปถูกวาดใหม่ด้วยมือคุณ ได้ฉายา 「ผู้พิชิตสองแคว้น」','myth',true);fin()})])}]],
 beast:[[12,15,()=>choice('🐾 สัตว์วิญญาณทวงคืนป่า · บทที่ 1: ป่าโกรธ','สัตว์วิญญาณเริ่มบุกหมู่บ้านชายป่าทุกคืน ราวกับมีอะไรสั่งให้มันมา',[O('🏹 ไล่ล่ากลับ','ดวล',()=>duel('ฝูงสัตว์วิญญาณ',Math.round(total()*.85),w=>{const X=wx();X.hunt=(X.hunt||0)+1;if(w){S.fame+=40;log('🏹 คุณไล่ฝูงกลับเข้าป่า','epic')}else hurt(.2);nx()})),O('🔍 ตามรอยเข้าป่า','อยากรู้ว่าทำไม',()=>{wx().why=1;S.int+=6;log('🔍 คุณพบว่าป่าถูกตัดจนแหว่ง สัตว์ไม่มีที่อยู่','');nx()})])],
  [14,35,()=>choice('🐾 สัตว์วิญญาณทวงคืนป่า · บทที่ 2: ทูตจากป่า','จิ้งจอกขาวพูดภาษาคนได้มาหาคุณ "ราชาแห่งป่าอยากพบเจ้า"',[O('🤝 ไปพบราชาแห่งป่า','เสี่ยง · ได้คุยกับอีกฝ่าย',()=>{wx().met=1;S.sv.bond=Math.min(100,(S.sv.bond||50)+10);log('🤝 ราชาแห่งป่าเป็นสัตว์แสนปีที่จำได้ว่ามนุษย์เคยเป็นมิตร','myth',true);nx()}),O('⚔️ ฆ่าทูต','ศึกจะรุนแรงขึ้น',()=>{wx().blood=1;S.karma-=10;S.power+=pctPow(.03);log('⚔️ คุณฆ่าทูต ป่าส่งเสียงคำรามทั้งคืน','bad',true);nx()})])],
  [17,55,()=>choice('🐾 สัตว์วิญญาณทวงคืนป่า · บทที่ 3: เลือกข้าง','ราชสำนักประกาศล้างป่าทั้งผืน สัตว์วิญญาณเตรียมบุกเมือง',[O('🏯 ยืนข้างมนุษย์','ดวลกับสัตว์ระดับสูง',()=>duel('ขุนพลสัตว์วิญญาณ',Math.round(total()*1.1),w=>{wx().side='human';if(w){S.fame+=200;log('🏯 แนวหน้าของสัตว์ถูกตีแตก','epic',true)}else hurt(.3);nx()})),O('🌳 ยืนข้างป่า','กรรม + · ถูกคนเกลียด',()=>{wx().side='beast';S.karma+=15;S.fame=Math.max(0,S.fame-100);log('🌳 คุณยืนขวางกองทัพมนุษย์ไว้หน้าป่า','myth',true);nx()})])],
  [20,70,()=>{const X=wx();choice('🐾 สัตว์วิญญาณทวงคืนป่า · บทที่ 4: ปลายทาง',X.side==='beast'?'ราชาแห่งป่ายื่นอุ้งเท้ามาให้คุณ':'ราชาแห่งป่าออกมาจากป่าด้วยตัวเอง',[O('🤝 ทำพันธสัญญาแบ่งเขต','จบแบบผู้เชื่อมสองโลก',()=>{S.karma+=25;S.fame+=1500;S.sv.bond=Math.min(100,(S.sv.bond||50)+15);title('ผู้เชื่อมมนุษย์กับป่า');log('🤝 ป่ากับเมืองมีเส้นแบ่งที่ทั้งสองฝ่ายเคารพ ได้ฉายา 「ผู้เชื่อมมนุษย์กับป่า」','myth',true);fin()}),O('⚔️ ดวลราชาแห่งป่า','จบแบบผู้ปราบ · ได้วงแหวนแสนปีถ้าชนะ',()=>duel('ราชาแห่งป่า (แสนปี)',Math.round(total()*1.4),w=>{if(w){S.fame+=2500;S.power+=pctPow(.2);title('ผู้ปราบราชาแห่งป่า');log('⚔️ ราชาแห่งป่าล้มลง วงแหวนแสนปีสีแดงลอยขึ้นจากร่างมัน','myth',true);fin()}else{hurt(.45);log('🩸 ราชาแห่งป่าปล่อยคุณไป "กลับมาเมื่อเจ้าแกร่งพอ"','bad',true);wx().y=S.age+5}}))])}]],
 heir:[[12,15,()=>choice('👑 ทายาทราชสำนักลับ · บทที่ 1: รอยปานมังกร','ผู้ปลุกจิตชราจ้องรอยปานบนหลังมือคุณนานผิดปกติ แล้วกระซิบ "รอยนี้… มีแต่สายเลือดราชวงศ์เก่า"',[O('❓ ถามต่อ','อยากรู้ความจริง',()=>{wx().know=1;S.int+=5;log('❓ ราชวงศ์เก่าถูกโค่นเมื่อยี่สิบปีก่อน ทายาทคนสุดท้ายหายตัวไปตอนยังเป็นทารก','myth',true);nx()}),O('🙊 ซ่อนรอยปานไว้','ปลอดภัยไว้ก่อน',()=>{wx().hide=1;log('🙊 คุณพันมือไว้ตลอด ไม่มีใครเห็นอีก','');nx()})])],
  [14,35,()=>choice('👑 ทายาทราชสำนักลับ · บทที่ 2: มือสังหาร','คืนหนึ่งมีคนบุกเข้าห้องคุณพร้อมมีด ใครบางคนรู้ความลับแล้ว',[O('⚔️ สู้','ดวล',()=>duel('มือสังหารราชสำนัก',Math.round(total()*(wx().hide?.9:1)),w=>{if(w){wx().clue=1;S.fame+=30;log('⚔️ มือสังหารล้มลง ในกระเป๋ามีตราของขุนนางในนครหลวง','epic',true)}else{hurt(.35);log('🩸 คุณรอดมาได้อย่างหวุดหวิด','bad')}nx()})),O('🏃 หนีไปแคว้นอื่น','ย้ายแคว้น',()=>{S.sv.reg=pk(['north','isle','wood'].filter(x=>x!==S.sv.reg));log('🏃 คุณหนีข้ามแคว้นในคืนนั้น','');nx()})])],
  [17,55,()=>choice('👑 ทายาทราชสำนักลับ · บทที่ 3: ผู้ภักดีเก่า','ขุนนางชราผู้ภักดีต่อราชวงศ์เก่าตามหาคุณจนเจอ "ทัพเก่ายังรอเจ้าอยู่"',[O('🏯 รวบรวมผู้ภักดี','เตรียมทวงบัลลังก์',()=>{wx().army=1;S.fame+=150;log('🏯 คนนับพันคุกเข่าต่อหน้าคุณในหุบเขาลับ','myth',true);nx()}),O('🙅 ปฏิเสธ','ใช้ชีวิตแบบผู้ฝึกจิตธรรมดา',()=>{wx().no=1;S.karma+=5;log('🙅 "ข้าไม่ใช่คนที่พวกท่านรอ" คุณบอกแล้วเดินจากไป','');nx()})])],
  [20,70,()=>{const X=wx();choice('👑 ทายาทราชสำนักลับ · บทที่ 4: บัลลังก์',X.army?'ทัพผู้ภักดีพร้อมแล้ว จักรพรรดิองค์ปัจจุบันส่งคนมาท้าดวลตัดสิน':'ราชสำนักรู้ตัวตนคุณแล้ว จักรพรรดิเชิญคุณเข้าวัง',[O('👑 ทวงบัลลังก์','ดวลกับองครักษ์จักรพรรดิ',()=>duel('องครักษ์ผู้ฝึกจิตของจักรพรรดิ',Math.round(total()*(X.army?1.1:1.3)),w=>{if(w){S.fame+=3000;S.money+=inc(10000);title('จักรพรรดิแห่งทวีปวิญญาณ');log('👑 <b>คุณขึ้นครองบัลลังก์</b> ราชวงศ์เก่ากลับมาอีกครั้ง','myth',true);fin()}else{hurt(.4);log('🩸 การทวงบัลลังก์ล้มเหลว คุณต้องหนีอีกครั้ง','bad',true);wx().y=S.age+5}})),O('📜 สละสิทธิ์ต่อหน้าทุกคน','จบแบบอิสระ',()=>{S.karma+=20;S.fame+=1000;title('ทายาทผู้สละบัลลังก์');log('📜 คุณเผาตราราชวงศ์ต่อหน้าจักรพรรดิ นับจากวันนี้ไม่มีใครต้องตายเพราะสายเลือดคุณอีก','myth',true);fin()})])}]]};
const wx=()=>{const g=S.sv;if(!g.arcX)g.arcX={ch:0,y:-99};return g.arcX};
const nx=()=>{const X=wx();X.ch++;X.y=S.age};
const fin=()=>{const X=wx();X.ch=99;X.win=1};
EVENTS.push({w:6,cd:2,svOk:1,c:s=>{if(!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1))return false;const k=arcK();if(k==='cult'||!AR[k])return false;const X=wx(),c=AR[k][X.ch];return!!(c&&s.age>=c[0]&&s.sv.lv>=c[1]&&s.age-X.y>=3)},f(){const c=AR[arcK()][wx().ch];if(c)c[2]()}});
// หน้าดวงจิต: แสดงเรื่องหลักของชีวิตนี้แทนกล่องลัทธิ
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const k=arcK();const box=$('modal').querySelector('.svArc');if(!box)return r;if(k==='cult'){if(A().dark)box.querySelector('b').textContent='🐍 ลัทธิกลืนดวงจิต (สายมืด)';return r}const X=wx(),L=AR[k],nx2=L[X.ch];box.innerHTML=`<b>${ARCN[k]}</b> · ${X.win?'🌅 จบแล้ว':`บทที่ ${Math.min(X.ch,4)}/4`}<br><span class="tag2">${X.win?'เรื่องหลักของชีวิตนี้จบลงแล้ว':nx2?`บทถัดไปเปิดเมื่ออายุ ${nx2[0]}+ และระดับจิต ${nx2[1]}+`:''}</span>`}catch(e){}return r}}
// ---- เหตุการณ์เปลี่ยนจังหวะการเติบโต ----
EVENTS.push({w:1.6,cd:6,svOk:1,c:s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&s.age>=10&&!s.sv.retired),f(){const g=S.sv,k=R2(0,2);
 if(k===0&&g.rings.length<9){const t=Math.min(3,Math.max(0,Math.floor(g.rings.length/3)));const b=pk(B.BEAST[t]);choice('🍀 วงแหวนไร้เจ้าของ',`กลางป่าคุณพบ${b[0]}ที่เพิ่งสิ้นใจด้วยวัยชรา วงแหวน${B.TIER[t][0]}ลอยค้างอยู่ ไม่มีใครครอบครอง`,[O('⭕ ดูดซับเลย','ได้วงแหวนโดยไม่ต้องรอคอขวด',()=>{B.absorb(t,b)}),O('🙏 ปล่อยให้มันกลับสู่ป่า','กรรม +',()=>{S.karma+=6;log('🙏 วงแหวนค่อย ๆ จางหายไปในแสงจันทร์','')})])}
 else if(k===1){const d=R2(2,4);choice('💥 เส้นจิตฉีกขาด','การฝึกพลาดจังหวะ เส้นจิตคุณฉีกขาดกลางการโคจร',[O('🧘 พักรักษาให้หาย','ระดับจิต −'+d,()=>{g.lv=Math.max(1,g.lv-d);S.hp=S.maxHp;log(`🧘 คุณพักรักษาทั้งปี ระดับจิตตกลง ${d} แต่ร่างกายกลับมาแข็งแรง`,'')}),O('🔥 ฝืนฝึกต่อ','เสี่ยง · อาจทะลวงหรือแย่ลง',()=>{if(Math.random()<.4){g.lv=Math.min(B.capOf(g),g.lv+3);log('🔥 เส้นจิตที่ฉีกขาดประสานกลับแข็งแรงกว่าเดิม ระดับจิต +3','epic')}else{g.lv=Math.max(1,g.lv-d-2);hurt(.25);log(`💥 อาการแย่ลง ระดับจิต −${d+2}`,'bad')}})])}
 else{choice('🌟 ตรัสรู้ชั่วพริบตา','คืนหนึ่งคุณเข้าใจบางอย่างเกี่ยวกับดวงจิตของตัวเองแบบที่ไม่เคยเข้าใจมาก่อน',[O('🧘 นั่งสมาธิต่อจนรุ่งเช้า','ระดับจิต +4 (ไม่เกินคอขวด)',()=>{g.lv=Math.min(B.capOf(g),g.lv+4);log('🌟 พอแสงแรกส่อง ระดับจิตคุณพุ่งขึ้น','epic')}),O('📝 จดบันทึกไว้สอนคนอื่น','ปัญญา + · ชื่อเสียง +',()=>{S.int+=8;S.fame+=30;log('📝 บันทึกของคุณกลายเป็นตำราที่รุ่นหลังคัดลอกต่อ','good')})])}}});
})()}catch(e){console.error('svarcs',e)}
__done=1;SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};})();

// ---- ท่อน soul14 (เดิมอยู่ app.js บรรทัด 37443) · ห่อ: render, duel, checkDeath, mg2Pick, passYear, openSoul ----
(function(){const SL=globalThis.__wSlots['soul14'];let render=SL.base.render;let duel=SL.base.duel;let checkDeath=SL.base.checkDeath;let mg2Pick=SL.base.mg2Pick;let passYear=SL.base.passYear;let openSoul=SL.base.openSoul;const __G={render:()=>render,duel:()=>duel,checkDeath:()=>checkDeath,mg2Pick:()=>mg2Pick,passYear:()=>passYear,openSoul:()=>openSoul},__S={render:v=>{render=v},duel:v=>{duel=v},checkDeath:v=>{checkDeath=v},mg2Pick:v=>{mg2Pick=v},passYear:v=>{passYear=v},openSoul:v=>{openSoul=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34,G=window._mg2G,H=window._mg2H,M3=window._mg3;if(!B||!G||!H)return;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1&&!(S.beastMode&&!S.beastMode.human));
const R2=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pk=a=>a[R2(0,a.length-1)];
const O=(t,s,f)=>({t,s,noFate:1,f});
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const lvUp=n=>{const g=S.sv,b=g.lv;g.lv=Math.min(B.capOf(g),g.lv+n);return g.lv-b};
const ri=()=>{try{return realmIdx()}catch(e){return 0}};
const price=k=>Math.max(300,Math.round(k*300*Math.pow(1+ri(),1.6)));
const wf=fn=>{let n=0;const t=setInterval(()=>{if(++n>60){clearInterval(t);return}if(!S||!S.alive||choice._cur||modalOpen)return;clearInterval(t);fn()},150)};
const play=(id,o,cb)=>wf(()=>{if(!on())return;window.mg2Play(id,Object.assign({noSkip:1},o||{}),(sc,sk)=>{try{cb(sk?.3:sc)}catch(e){console.error('sv6p',e)}try{render()}catch(e){}})});
const bag=()=>{const g=S.sv;g.bag=g.bag||{xh:{},hw:null,dev:{},gt:0};return g.bag};
const team=()=>{const t=S.sv.tm;return t&&t.m?t.m.filter(x=>x.al).length:0};
const col=(k,id)=>{try{const C=LS.get('murim_svcol',{})||{};C[k]=C[k]||{};if(!C[k][id]){C[k][id]=1;LS.set('murim_svcol',C)}}catch(e){}};
const isl=(ic,h,t,k)=>{try{island({big:1,pri:1,ic,h,t,kind:k||'gold'})}catch(e){}};

// ===== 1) ชื่อระดับแบบในเรื่อง =====
const RK=['นักวิญญาณฝึกหัด','จอมวิญญาณ','มหาจอมวิญญาณ','ผู้อาวุโสวิญญาณ','บรรพชนวิญญาณ','ราชาวิญญาณ','จักรพรรดิวิญญาณ','นักบุญวิญญาณ','มหาปราชญ์วิญญาณ','จอมจิตฉายา'];
try{B.RANK.splice(0,B.RANK.length,...RK)}catch(e){}
const ttlOf=g=>g.lv>=100?'เทพ':g.lv>=91&&g.ttl?g.ttl:null;
const fixTxt=root=>{try{const g=S&&S.sv;if(!g||!root)return;const t=ttlOf(g);if(!t)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())if(n.nodeValue.includes('จอมจิตฉายา'))n.nodeValue=n.nodeValue.split('จอมจิตฉายา').join(t)}catch(e){}};
{const _rd=render;render=function(){const r=_rd.apply(this,arguments);try{if(on())fixTxt($('game'))}catch(e){}return r}}

// ===== 2) ของ =====
const XH={x1:['🌸','บัวเก้าดวงแสนปี','ระดับจิต +5 (ไม่เกินคอขวด)',()=>`ระดับจิต +${lvUp(5)}`],
 x2:['🍄','เห็ดหลินจือเลือดมังกร','พลังชีวิตสูงสุด +15%',()=>{const v=Math.round(S.maxHp*.15);S.maxHp+=v;S.hp+=v;return`พลังชีวิตสูงสุด +${fmt(v)}`}],
 x3:['🌿','หญ้าเงินคราม','พลังยุทธ์ +10%',()=>{const v=pctPow(.10);S.power+=v;return`พลังยุทธ์ +${fmt(v)}`}],
 x4:['🌼','ดอกเบญจมาศน้ำแข็งไฟ','ปัญญา +15',()=>{S.int=(S.int||0)+15;return'ปัญญา +15'}],
 x5:['🍑','ท้อพันปีแห่งหุบลึก','อายุขัย +10 ปี',()=>{S.lifespan=(S.lifespan||60)+10;return'อายุขัย +10 ปี'}],
 x6:['🪷','เมล็ดบัวจิตกระจ่าง','ซับวงแหวนครั้งหน้าปลอดภัยขึ้นมาก',()=>{S.sv.herbSafe=1;return'เส้นจิตมั่นคงขึ้น'}]};
function giveXH(id,src){id=id||pk(Object.keys(XH));const b=bag();b.xh[id]=(b.xh[id]||0)+1;col('xh',id);const h=XH[id];log(`${h[0]} <b>ได้สมุนไพรเซียน「${h[1]}」</b>${src?' จาก'+src:''} เก็บไว้ในถุงวิญญาณ <span class="tag2">(${h[2]} · กินได้จากหน้า ⭕ ดวงจิต)</span>`,'myth',true);isl(h[0],'สมุนไพรเซียน',h[1])}
window.svEat=function(id){if(!on())return;const b=bag(),h=XH[id];if(!h||!(b.xh[id]>0))return;b.xh[id]--;const t=h[3]();log(`${h[0]} กิน「${h[1]}」 — ${t}`,'epic',true);try{closeM();openSoul()}catch(e){}try{render()}catch(e){}};
const HW=[['🪡','เข็มพิรุณ',.88],['🌸','ดอกเหมยพันกลีบ',.82],['🌀','จักรพายุเงา',.75]];
function giveHW(t,n){const b=bag();if(!b.hw||b.hw.t<t)b.hw={t,n:0};b.hw.n+=n;col('hw',t);const w=HW[b.hw.t];log(`${w[0]} <b>อาวุธลับ「${w[1]}」</b> ×${n} ใช้เองอัตโนมัติตอนดวล (เหลือ ${b.hw.n})`,'epic',true)}
const DEV={bag:['👜','ถุงเก็บวิญญาณ','หาสมุนไพรเซียนได้มากขึ้น',10],can:['💥','ปืนใหญ่วิญญาณ','ศัตรูอ่อนลง 8% ทุกการดวล',14],fly:['🪽','ปีกวิญญาณ','หนีรอดจากความตายได้ 1 ครั้ง',12]};
function giveDev(k){const b=bag();b.dev[k]=1;col('dev',k);const d=DEV[k];log(`⚙️ <b>ได้เครื่องมือวิญญาณ ${d[0]}「${d[1]}」</b> — ${d[2]}`,'myth',true);isl(d[0],'เครื่องมือวิญญาณ',d[1])}
// ดวล: อาวุธลับ + ปืนใหญ่ + ขอบเขตสังหาร
{const _d=duel;duel=function(name,ep,cb){try{if(on()&&typeof ep==='number'){const b=bag();let m=1;const tg=[];
 if(b.hw&&b.hw.n>0){const w=HW[b.hw.t];m*=w[2];b.hw.n--;tg.push(`${w[0]} ${w[1]}`)}if(b.dev.can){m*=.92;tg.push('💥 ปืนใหญ่')}if(b.kcD){m*=.95;tg.push('🩸 ขอบเขตสังหาร')}
 if(m<1){ep=Math.max(1,Math.round(ep*m));addFeed('ev',`${tg.join(' · ')} — ศัตรูอ่อนลง ${Math.round((1-m)*100)}%`,'sum')}}}catch(e){}return _d.call(this,name,ep,cb)}}
// ปีกวิญญาณ: กันตาย 1 ครั้ง (เฉพาะตายจากบาดแผล ไม่ใช่ตายตามอายุ)
{const _cd=checkDeath;checkDeath=function(){try{if(on()&&S.hp<=0&&!S.deathCause&&S.age<lifeMax()){const b=bag();if(b.dev.fly&&!b.flyU){b.flyU=1;S.hp=Math.max(1,Math.round(S.maxHp*.2));log('🪽 <b>ปีกวิญญาณกางออกเอง</b> พาร่างที่ใกล้ตายบินหนีออกมาได้ทัน (ใช้ได้ครั้งเดียว)','myth',true)}}}catch(e){}return _cd.apply(this,arguments)}}

// ===== 3) มินิเกม 5 แบบ =====
const rwP=x=>{const v=pctPow(.02+.05*x);S.power+=v;return`พลังยุทธ์ +${fmt(v)}`};
Object.assign(G,{
 svAbsorb:{n:'ซับพลังวงแหวน',ic:'💍',mt:'ผู้หลอมวงแหวน',how:'กดค้างดึงพลังให้อยู่ในโซนทอง 3 ครั้ง ปล่อยเกินโซน เส้นจิตปริ',t:14,
  rw:x=>{if(x<.35){hurt(.12);return'เส้นจิตปริ พลังชีวิตลด'}const n=lvUp(x>=.9?2:1);return n?`ระดับจิต +${n}`:rwP(x)},
  init:(B2,api)=>H.hold(B2,api,{n:3,lo:.6,hi:.8,ms:1500,ic:'💍',label:'ดึงพลัง',col:'linear-gradient(#ffe08a,#a66bff)'})},
 svNeedle:{n:'ซัดเข็มตระกูลลับ',ic:'🪡',mt:'มือพันเข็ม',how:'แตะตอนเข็มขึ้นถึงโซนทอง 5 ครั้ง',t:12,
  rw:x=>{let t=rwP(x);const b=bag();if(x>=.7&&b.hw){b.hw.n++;t+=` · ${HW[b.hw.t][0]} +1`}return t},
  init:(B2,api)=>M3?M3.peak(B2,api,{ic:'🪡',label:'ซัด!',n:5}):H.hold(B2,api,{n:3,lo:.6,hi:.8,ms:1200})},
 svCombo:{n:'ผสานทักษะทีม',ic:'🌀',mt:'หัวใจของทีม',how:'จำลำดับท่าของเพื่อนร่วมทีมแล้วกดตาม',t:16,
  rw:x=>{const f=Math.round(30+150*x);S.fame+=f;return rwP(x)+` · ชื่อเสียง +${f}`},
  init:(B2,api)=>H.simon(B2,api,{syms:['⚔️','🛡️','🌿','🌀','💨','🔥'],cols:3,len:5,show:430,title:'จำลำดับท่าผสาน'})},
 svTrack:{n:'ตามรอยสัตว์วิญญาณ',ic:'🐾',mt:'นักตามรอย',how:'จำว่ารอยเท้าอยู่ทางไหน แล้วเลือกทางนั้นหลังหมอกลง',t:16,
  rw:x=>{let t=rwP(x);if(x>=.75&&Math.random()<.3){giveXH(null,'รังสัตว์ที่ตามไปเจอ');t+=' · พบสมุนไพรเซียน'}return t},
  init(B2,api){let r=0,ok=0;const N=4;const draw=()=>{if(!api.live())return;if(r>=N){api.end();return}const k=R2(0,2);
   B2.innerHTML=`<div class="tag2" style="text-align:center">รอยที่ ${r+1}/${N} จำทางที่มีรอยเท้า</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px">${[0,1,2].map(i=>`<button class="pbtn" data-i="${i}" style="font-size:30px;padding:18px 0">${i===k?'🐾':'🌲'}</button>`).join('')}</div>`;
   const bs=[...B2.querySelectorAll('button')];bs.forEach(b=>b.disabled=true);
   setTimeout(()=>{if(!api.live())return;bs.forEach(b=>{b.textContent='🌫️';b.disabled=false;b.onpointerdown=e=>{e.preventDefault();if(b.dataset.d)return;bs.forEach(x=>x.dataset.d=1);const hit=+b.dataset.i===k;if(hit)ok++;b.textContent=hit?'✅':'❌';if(!hit)bs[k].textContent='🐾';r++;setTimeout(draw,450)}})},Math.max(280,Math.round(700*api.ez)-r*100))};
   draw();return{sc:()=>ok/N}}},
 svHerb:{n:'แยกสมุนไพรเซียน',ic:'🌿',mt:'ตาทิพย์สมุนไพร',how:'แตะเฉพาะสมุนไพร ห้ามแตะหญ้าพิษ',t:10,
  rw:x=>{if(x>=.7&&Math.random()<x*.6){giveXH(null,'การแยกสมุนไพร');return'พบสมุนไพรเซียน'}const g=Math.round(price(.5)*x);S.money+=g;return`ขายสมุนไพรธรรมดา +${fmt(g)}`},
  init:(B2,api)=>M3?M3.tapGood(B2,api,{good:['🌸','🍄','🌿','🪷','🍑'],bad:['☠️','🍂','🕷️'],N:10,bg:'#0f2a18'}):H.hold(B2,api,{n:3,lo:.6,hi:.8,ms:1200})}});
const MGS=['svAbsorb','svNeedle','svCombo','svTrack','svHerb'];
{const _pk=window.mg2Pick;window.mg2Pick=function(){try{if(on()&&Math.random()<.6){const L=MGS.filter(k=>k!==S.mgLast&&(k!=='svCombo'||S.age>=12));const k=pk(L);S.mgLast=k;S.mgA=S.age;return window._mg2Y(k)}}catch(e){console.error('sv6pick',e)}return _pk.apply(this,arguments)}}

// ===== 4) รายปี: ฉายาจอมจิต · ชุดกระดูก =====
{const _py=passYear;passYear=function(){const a0=S&&S.age;const r=_py.apply(this,arguments);try{if(!on()||S.age===a0)return r;const g=S.sv;
 if(g.lv>=91&&!g.ttl){g.ttl='จอมจิต'+B.spNow(g.sp[0]).n;S.fame+=5000;log(`👑 <b>ได้รับฉายา「${g.ttl}」</b> ทั้งทวีปรู้จักชื่อนี้ ผู้คนเรียกคุณด้วยฉายาแทนชื่อจริง`,'myth',true);isl('👑','ได้รับฉายา',g.ttl)}
 if(Object.keys(g.bone||{}).length>=6&&!bag().bset){bag().bset=1;const p=pctPow(.2),h=Math.round(S.maxHp*.2);S.power+=p;S.maxHp+=h;S.hp+=h;log(`🦴 <b>ชุดกระดูกวิญญาณครบ 6 ชิ้น</b> กระดูกทั้งหกสั่นพ้องกัน · พลังยุทธ์ +${fmt(p)} · พลังชีวิตสูงสุด +${fmt(h)}`,'myth',true);isl('🦴','ชุดกระดูกวิญญาณ','ครบ 6 ชิ้น')}
}catch(e){console.error('sv6y',e)}return r}}

// ===== 5) เหตุการณ์ =====
const ev=(w,cd,c,f)=>EVENTS.push({w,cd,c:s=>{try{return!!(s===S&&on()&&c(S.sv,bag()))}catch(e){return false}},f(){try{f(S.sv,bag())}catch(e){console.error('sv6ev',e)}}});
// 🌿 หุบเขาสมุนไพร
ev(1.6,7,g=>S.age>=12,(g,b)=>choice('🌿 หุบเขาสมุนไพรเซียน','หมอกจางลงเผยให้เห็นหุบเขาที่เต็มไปด้วยพืชวิญญาณ ปะปนกับหญ้าพิษที่หน้าตาเหมือนกันไม่ผิด',[
 O('🌿 เข้าไปเก็บ','มินิเกมแยกสมุนไพร',()=>play('svHerb',{title:'แยกสมุนไพรเซียน'},sc=>{const n=(sc>=.9?2:sc>=.6?1:0)+(b.dev.bag&&sc>=.6?1:0);if(n)for(let i=0;i<n;i++)giveXH(null,'หุบเขาสมุนไพร');else{hurt(.1);log('☠️ แตะโดนหญ้าพิษ มือชาไปหลายวัน','bad')}})),
 O('👀 สังเกตจากขอบหุบ','ปลอดภัย ได้ความรู้',()=>{S.int=(S.int||0)+3;log('👀 คุณจดจำลักษณะสมุนไพรไว้ ปัญญา +3','good')})]));
// 🪡 ช่างอาวุธลับ
ev(1.5,6,g=>S.age>=10,(g,b)=>{const p1=price(6),p2=price(14);choice('🪡 ช่างอาวุธลับในตรอกแคบ','ชายชราตาเดียวนั่งตะไบเข็มเล่มเล็กจนแทบมองไม่เห็น "อาวุธลับไม่ต้องมีวงแหวน แค่ต้องแม่น"',[
 O('🪡 ขอฝึกทำและซัดเอง','มินิเกมซัดเข็ม',()=>play('svNeedle',{title:'ฝึกซัดเข็ม'},sc=>{if(sc>=.5)giveHW(sc>=.9&&(!b.hw||b.hw.t<1)?1:0,sc>=.9?5:3);else log('🪡 เข็มปักผนังแทนเป้า ชายชราส่ายหน้า','')})),
 O(`🌸 ซื้อ「${HW[1][1]}」`,`${fmt(p1)} ตำลึง · ×4`,()=>{if(S.money<p1)return log('💸 เงินไม่พอ','bad');S.money-=p1;giveHW(1,4)}),
 ...(S.age>=28?[O(`🌀 ซื้อ「${HW[2][1]}」`,`${fmt(p2)} ตำลึง · ×4 · แรงที่สุด`,()=>{if(S.money<p2)return log('💸 เงินไม่พอ','bad');S.money-=p2;giveHW(2,4)})]:[]),
 O('🚶 เดินผ่านไป','',()=>{})])});
// ⚙️ โรงงานเครื่องมือวิญญาณ
ev(1.1,8,(g,b)=>S.age>=16&&Object.keys(DEV).some(k=>!b.dev[k]),(g,b)=>{const L=Object.keys(DEV).filter(k=>!b.dev[k]);choice('⚙️ โรงงานเครื่องมือวิญญาณ','ช่างเครื่องมือวิญญาณกำลังทดลองของประหลาดที่ใช้พลังจิตแทนวงแหวน ทั้งส่งเสียงดังและควันโขมง',[
 ...L.map(k=>{const d=DEV[k],p=price(d[3]);return O(`${d[0]} ซื้อ「${d[1]}」`,`${fmt(p)} ตำลึง · ${d[2]}`,()=>{if(S.money<p)return log('💸 เงินไม่พอ','bad');S.money-=p;giveDev(k)})}),
 O('🔧 ช่วยประกอบแลกค่าแรง','มินิเกมผสานท่า · ถ้าเก่งได้ของฟรี',()=>play('svCombo',{title:'ประกอบเครื่องมือวิญญาณ'},sc=>{if(sc>=.9)giveDev(pk(L));else{const m=Math.round(price(1)*sc);S.money+=m;log(`🔧 ได้ค่าแรง +${fmt(m)}`,'good')}})),
 O('🚶 ไว้วันหลัง','',()=>{})])});
// 🏆 การแข่งขันนักวิญญาณชั้นยอดทั่วทวีป (ครั้งเดียวต่อชีวิต)
ev(3,4,(g,b)=>S.age>=16&&S.age<=26&&g.lv>=25&&!b.tour,(g,b)=>{b.tour=1;const RN=['รอบแบ่งกลุ่ม','รอบแปดทีม','รอบรองชนะเลิศ','รอบชิงชนะเลิศ'],MU=[.8,.95,1.1,1.25],tb=Math.min(.25,team()*.04);
 const prize=i=>{const f=[300,900,2500][i]||0;S.fame+=f;log(`🏆 จบการแข่งขันที่ <b>${RN[i]}</b> — ชื่อเสียง +${f}`,'good')};
 const champ=()=>{b.tourW=1;S.fame+=6000;const p=pctPow(.2);S.power+=p;log(`🏆 <b>แชมป์การแข่งขันนักวิญญาณชั้นยอดทั่วทวีป!</b> ชื่อทีมถูกจารึก · พลังยุทธ์ +${fmt(p)} · ชื่อเสียง +6000`,'myth',true);isl('🏆','แชมป์ทั่วทวีป','ทีมของคุณ');giveXH(null,'รางวัลแชมป์')};
 const round=i=>{if(!on())return;if(i>=RN.length)return champ();choice(`🏆 การแข่งขันทั่วทวีป · ${RN[i]}`,`ทีมเจ็ดคนจากทุกสถาบันมารวมกัน${team()?` · เพื่อนร่วมทีมคุณ ${team()} คนพร้อมลงสนาม`:' · คุณเข้าร่วมกับทีมรวมของเมือง'}`,[
  O('⚔️ ลงสนามเดี่ยว','ดวลกับตัวเก่งของอีกทีม',()=>duel(`ตัวแทนทีมคู่แข่ง · ${RN[i]}`,Math.round(total()*MU[i]),w=>{if(!S||!S.alive)return;if(w)wf(()=>round(i+1));else prize(Math.max(0,i-1))})),
  O('🌀 ใช้ทักษะผสานทีม','มินิเกม · เพื่อนยิ่งเยอะยิ่งง่าย',()=>play('svCombo',{title:`ทักษะผสาน · ${RN[i]}`},sc=>{if(sc+tb+Math.random()*.2>=.55+i*.07){log(`🌀 ทักษะผสานทะลวงแนวป้องกัน ชนะ${RN[i]}`,'good');round(i+1)}else{hurt(.15);prize(Math.max(0,i-1))}})),
  O('🏳️ ถอนตัว','',()=>prize(Math.max(0,i-1)))])};
 choice('🏆 การแข่งขันนักวิญญาณชั้นยอดทั่วทวีป','ทุกห้าปีจะมีการแข่งขันระหว่างสถาบันทั่วทวีป ผู้ชนะได้รางวัลจากราชสำนักและชื่อเสียงไปตลอดชีวิต',[O('🔥 ลงแข่ง','สี่รอบ แพ้รอบไหนจบรอบนั้น',()=>round(0)),O('👀 ดูอยู่ข้างสนาม','ปัญญา +4',()=>{S.int=(S.int||0)+4;log('👀 คุณดูการแข่งขันและจดจำทักษะของทุกทีม','')})])});
// 🩸 เมืองสังหาร (ครั้งเดียวต่อชีวิต)
ev(1.3,6,(g,b)=>S.age>=20&&g.lv>=30&&!b.kc,(g,b)=>{const ST=[['ถนนโลหิต',1],['ลานประหาร',1.2],['บัลลังก์โลหิต',1.45]];let lost=0;
 const fail=why=>{lost++;if(lost>=2){if(b.dev.fly&&!b.flyU){b.flyU=1;S.hp=1;log('🪽 ปีกวิญญาณพาคุณบินข้ามกำแพงเมืองสังหารออกมาได้ทัน','myth',true);return}die('ในเมืองสังหาร');return}hurt(.35);log(`🩸 ${why} บาดเจ็บหนัก (พลาดได้อีกครั้งเดียว)`,'bad')};
 const win=()=>{b.kcD=1;const p=pctPow(.25);S.power+=p;S.fame+=3000;log(`🩸 <b>รอดออกจากเมืองสังหาร</b> ได้「ขอบเขตสังหาร」ติดตัว ศัตรูอ่อนลงทุกการดวล · พลังยุทธ์ +${fmt(p)}`,'myth',true);isl('🩸','รอดจากเมืองสังหาร','ขอบเขตสังหาร')};
 const step=i=>{if(!on())return;if(i>=ST.length)return win();const s=ST[i];choice(`🩸 เมืองสังหาร · ${s[0]}`,'ที่นี่ไม่มีกฎ มีแต่ผู้ฆ่ากับผู้ถูกฆ่า ทุกสายตาจับจ้องคุณ',[
  O('⚔️ สู้ฝ่าไป','ดวล',()=>duel(`นักฆ่าแห่ง${s[0]}`,Math.round(total()*s[1]),w=>{if(!S||!S.alive)return;if(w){S.money+=price(2);wf(()=>step(i+1))}else{fail('แพ้กลางเมืองสังหาร');if(S&&S.alive&&lost<2)wf(()=>step(i+1))}})),
  O('🌫️ ซ่อนตัวรอจังหวะ','เสี่ยงถูกลอบโจมตี 40%',()=>{if(Math.random()<.4){fail('ถูกลอบแทงจากเงามืด');if(S&&S.alive&&lost<2)wf(()=>step(i+1))}else wf(()=>step(i+1))}),
  ...(b.dev.fly?[O('🪽 บินหนีออกจากเมือง','ยอมแพ้ ปลอดภัย',()=>log('🪽 คุณบินหนีออกมา ยังไม่พร้อมสำหรับที่นี่',''))]:[])])};
 choice('🩸 ประตูเมืองสังหาร','เมืองที่คนบาปและนักฆ่ามาซ่อนตัว ใครรอดออกมาได้จะติดกลิ่นอายสังหารไปตลอดชีวิต แต่ส่วนใหญ่ไม่ได้ออกมา',[
  O('🚪 ก้าวเข้าไป','3 ด่าน · พลาด 2 ครั้ง = ตาย',()=>{b.kc=1;step(0)}),O('🚶 หันหลังกลับ','',()=>log('🚶 คุณยังไม่อยากเสี่ยงชีวิตตอนนี้',''))])});
// 🌊 บททดสอบเทพ 9 ขั้น (ปีละหนึ่งขั้น · เส้นทางที่สองสู่เทพ)
const GTN=['ใจไม่หวั่น','ทะเลเพลิง','ภูเขากดทับ','ภาพลวงของคนรัก','พายุใต้สมุทร','ศึกเงาตนเอง','ความโดดเดี่ยวพันปี','เลือกผู้รอด','ประตูเทวา'];
const GTG=['svAbsorb','svTrack','svNeedle','svCombo'];
ev(4,1,(g,b)=>g.lv>=80&&!(g.x&&g.x.god)&&!b.gtNo&&(b.gt||0)<9&&S.age-(b.gtY==null?-9:b.gtY)>=1,(g,b)=>{b.gtY=S.age;const k=b.gt||0;
 if(!b.gtOn)return choice('🌊 เสียงเรียกจากเทพ','ในฝันมีเสียงเรียกจากใต้ท้องทะเลลึก "ผ่านเก้าบททดสอบของเรา แล้วเจ้าจะได้เป็นเทพ"',[O('🙏 รับบททดสอบ','ปีละหนึ่งบท · ผ่านครบเก้า = เป็นเทพ',()=>{b.gtOn=1;log('🌊 คุณรับบททดสอบเทพ บทแรกจะมาถึงในปีหน้า','epic',true)}),O('✋ ปฏิเสธ','จะไม่ถูกเรียกอีก',()=>{b.gtNo=1})]);
 const pass=()=>{b.gt=k+1;lvUp(1);S.lifespan=(S.lifespan||60)+5;log(`🌊 <b>ผ่านบททดสอบเทพ ${k+1}/9 「${GTN[k]}」</b> ระดับจิต +1 · อายุขัย +5`,'epic',true);
  if(b.gt>=9){g.x=g.x||{};g.x.done=g.x.done||[];g.x.god=1;if(!g.x.done.includes('god'))g.x.done.push('god');S.lifespan+=100;S.fame+=20000;log('🌊 <b>ผ่านเก้าบททดสอบ คุณกลายเป็นเทพ</b>','myth',true);isl('🌊','เป็นเทพ','ผ่านเก้าบททดสอบ','gold')}};
 const failT=()=>{hurt(.2);log(`🌊 ไม่ผ่านบท「${GTN[k]}」 — ลองใหม่ปีหน้า`,'bad')};
 choice(`🌊 บททดสอบเทพ ${k+1}/9 · ${GTN[k]}`,'แสงสีครามห่อหุ้มร่าง คุณถูกดึงเข้าไปในบททดสอบอีกครั้ง',[
  O('⚔️ ผ่านด้วยพลัง','ดวลกับผู้พิทักษ์',()=>duel(`ผู้พิทักษ์บทที่ ${k+1}`,Math.round(total()*(.9+k*.08)),w=>{if(!S||!S.alive)return;w?pass():failT()})),
  O('🧠 ผ่านด้วยใจ','มินิเกม',()=>play(GTG[k%GTG.length],{title:`บททดสอบ · ${GTN[k]}`},sc=>sc>=.55+k*.03?pass():failT())),
  O('🕊️ ขอพักไว้ก่อน','',()=>log('🕊️ บททดสอบรอคุณอยู่เสมอ',''))])});
// 🐉 สัตว์วิญญาณบุกเมือง
ev(1.1,12,g=>S.age>=14,(g,b)=>choice('🐉 สัตว์วิญญาณบุกเมือง','ระฆังเตือนภัยดังทั่วเมือง ฝูงสัตว์วิญญาณนับพันพุ่งเข้าหากำแพง นำโดยตัวที่อายุนับหมื่นปี',[
 O('🛡️ ประจำกำแพง ซัดอาวุธใส่ฝูง','มินิเกมซัดเข็ม',()=>play('svNeedle',{title:'ป้องกันกำแพงเมือง'},sc=>{if(sc>=.5){S.fame+=800;const p=pctPow(.06);S.power+=p;log(`🛡️ กำแพงไม่แตก ชื่อเสียง +800 · พลังยุทธ์ +${fmt(p)}`,'good')}else{hurt(.25);log('🛡️ ฝูงสัตว์ทะลวงกำแพงได้บางส่วน คุณบาดเจ็บ','bad')}})),
 O('⚔️ บุกหัวขบวน','ดวลกับจ่าฝูง · เสี่ยงสูง',()=>duel('จ่าฝูงสัตว์วิญญาณหมื่นปี',Math.round(total()*1.3),w=>{if(!S||!S.alive)return;if(w){S.fame+=2500;log('⚔️ <b>จ่าฝูงล้ม ฝูงสัตว์แตกกระเจิง</b> ชาวเมืองยกย่องคุณเป็นวีรบุรุษ','epic',true);if(Math.random()<.5)giveXH(null,'รังของจ่าฝูง')}else hurt(.4)})),
 O('🏃 พาชาวบ้านอพยพ','กรรม +',()=>{S.karma+=15;S.fame+=200;log('🏃 คุณพาเด็กและคนแก่ออกทางประตูหลังได้หลายร้อยคน กรรม +15','good')})]));
// ⚔️ สงครามสองจักรวรรดิ
ev(1,15,g=>S.age>=20,(g,b)=>{const big=g.lv>=60,fine=Math.round(S.money*.2);choice('⚔️ สงครามสองจักรวรรดิ',big?'ราชสำนักส่งสาส์นเชิญคุณไปบัญชาการทัพแนวหน้า':'ทางการเกณฑ์นักวิญญาณทุกคนที่อายุถึงไปแนวหน้า',[
 ...(big?[O('🎖️ บัญชาการทัพ','มินิเกมจับจังหวะบุก',()=>play('svNeedle',{title:'สั่งทัพบุกตามจังหวะ'},sc=>{if(sc>=.6){const m=price(8);S.money+=m;S.fame+=4000;log(`🎖️ <b>ชนะศึกใหญ่</b> ได้บำเหน็จ +${fmt(m)} · ชื่อเสียง +4000`,'epic',true)}else{S.fame=Math.max(0,S.fame-500);hurt(.2);log('🎖️ ทัพแตก คุณถูกตำหนิจากราชสำนัก','bad')}}))]:[]),
 O('⚔️ ออกรบแนวหน้า','ดวล',()=>duel('ทหารวิญญาณฝ่ายศัตรู',Math.round(total()*1.05),w=>{if(!S||!S.alive)return;if(w){const m=price(3);S.money+=m;S.fame+=600;log(`⚔️ รอดกลับมาพร้อมความดีความชอบ +${fmt(m)}`,'good')}else hurt(.35)})),
 O('💰 จ่ายเงินแทนการไปรบ',`${fmt(fine)} ตำลึง`,()=>{S.money-=fine;log('💰 คุณจ่ายเงินและอยู่บ้านต่อ','')})])});

// ===== 6) หน้าดวงจิต: ถุงวิญญาณ =====
{const _os=window.openSoul;if(_os)window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const m=$('modal');fixTxt(m);if(m.querySelector('.sv6Bag'))return r;const b=bag(),g=S.sv;
 const xs=Object.keys(XH).filter(k=>b.xh[k]>0).map(k=>{const h=XH[k];return`<div style="display:flex;align-items:center;gap:6px;margin:3px 0"><span style="flex:1">${h[0]} <b>${h[1]}</b> ×${b.xh[k]}<br><span class="tag2">${h[2]}</span></span><button class="sysb" onclick="svEat('${k}')">กิน</button></div>`}).join('')||'<span class="tag2">ยังไม่มี หาได้จากหุบเขาสมุนไพร มินิเกม และรางวัลใหญ่</span>';
 const hw=b.hw&&b.hw.n>0?`${HW[b.hw.t][0]} <b>${HW[b.hw.t][1]}</b> เหลือ ${b.hw.n} ครั้ง <span class="tag2">(ศัตรูอ่อนลง ${Math.round((1-HW[b.hw.t][2])*100)}%)</span>`:'<span class="tag2">ไม่มี หาช่างอาวุธลับ</span>';
 const dv=Object.keys(DEV).map(k=>`<span style="opacity:${b.dev[k]?1:.35}">${DEV[k][0]} ${DEV[k][1]}${k==='fly'&&b.flyU?' (ใช้แล้ว)':''}</span>`).join(' · ');
 let C={};try{C=LS.get('murim_svcol',{})||{}}catch(e){}const cn=['xh','hw','dev'].reduce((a,k)=>a+Object.keys(C[k]||{}).length,0),ct=Object.keys(XH).length+HW.length+Object.keys(DEV).length;
 const st=[b.tourW?'🏆 แชมป์ทั่วทวีป':b.tour?'🏆 เคยลงแข่งทั่วทวีป':null,b.kcD?'🩸 รอดจากเมืองสังหาร':null,b.gtOn&&!(g.x&&g.x.god)?`🌊 บททดสอบเทพ ${b.gt||0}/9`:null,b.bset?'🦴 ชุดกระดูกครบ':null,g.ttl?`👑 ${g.ttl}`:null].filter(Boolean).join(' · ');
 const html=`<div class="sv6Bag"><h4>🎒 ถุงวิญญาณ</h4><div class="item">${xs}</div><div class="item">🗡️ อาวุธลับ: ${hw}</div><div class="item">⚙️ ${dv}</div>${st?`<div class="item">${st}</div>`:''}<p class="tag2">📖 สะสมข้ามชาติ ${cn}/${ct} ชิ้น</p></div>`;
 const bk=m.querySelector('button[onclick="openSoulBook()"]');if(bk)bk.insertAdjacentHTML('beforebegin',html);else m.insertAdjacentHTML('beforeend',html)}catch(e){console.error('sv6os',e)}return r}}
window._sv7={XH,HW,DEV,giveXH,giveHW,giveDev,bag,MGS};
})()}catch(e){console.error('sv6',e)}
__done=1;SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};SL.impl.duel=duel;duel=function(){return globalThis.duel.apply(this,arguments)};SL.impl.checkDeath=checkDeath;checkDeath=function(){return globalThis.checkDeath.apply(this,arguments)};SL.impl.mg2Pick=mg2Pick;mg2Pick=function(){return globalThis.mg2Pick.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};})();

// ---- ท่อน soul15 (เดิมอยู่ app.js บรรทัด 38552) · ห่อ: genRoll, doRoll, startLife, choice, goalOffer ----
(function(){const SL=globalThis.__wSlots['soul15'];let genRoll=SL.base.genRoll;let doRoll=SL.base.doRoll;let startLife=SL.base.startLife;let choice=SL.base.choice;let goalOffer=SL.base.goalOffer;
try{(()=>{
const B=window._blk34;if(!B)return;
const isSoul=()=>{try{return CH_KEYS[CFG.chm]==='soul'&&!CFG.mw&&!CFG.daily}catch(e){return false}};
const rw=a=>{let t=a.reduce((x,o)=>x+o.w,0),r=Math.random()*t;for(const o of a){r-=o.w;if(r<=0)return o}return a[a.length-1]};
const REG=[['north','❄️','แคว้นหมอกเหนือ','ภูเขาหิมะและหมาป่าเงิน คนที่นี่อดทนเหมือนน้ำแข็ง'],['gold','🌾','ที่ราบตะวันทอง','ทุ่งกว้าง ที่ตั้งของสถาบันจิตยุทธ์ชื่อดังหลายแห่ง'],['isle','🌊','หมู่เกาะคลื่นคราม','สัตว์วิญญาณทะเลและพ่อค้าข้ามสมุทร'],['wood','🌳','ป่าต้องห้ามพันพฤกษ์','สมุนไพรวิเศษเกิดที่นี่ แต่สัตว์วิญญาณพันปีก็เช่นกัน'],['jade','🏯','นครหลวงหยกขาว','ราชสำนักและตระกูลใหญ่ ที่ที่ชื่อเสียงมีค่ากว่าทอง']];
const TYN={atk:['⚔️','สายโจมตี'],def:['🛡️','สายป้องกัน'],sup:['🌿','สายสนับสนุน'],ctrl:['🌀','สายควบคุม'],agi:['💨','สายว่องไว']};
const OMT={atk:'ฝันเห็นอาวุธเปล่งแสงกลางลานบ้าน',def:'ฝันเห็นกำแพงหินโบราณที่ไม่มีวันพัง',sup:'ฝันเห็นต้นไม้ใหญ่ออกดอกกลางหิมะ',ctrl:'ฝันเห็นวังวนกลางทะเลสาบที่หยุดนิ่ง',agi:'ฝันว่าวิ่งเร็วกว่าลม'};
const OTIER=[{w:60,n:'ลางเลือนราง',bias:.4,up:0,dual:0},{w:30,n:'ลางชัดเจน',bias:.6,up:.3,dual:0},{w:8,n:'ลางสว่างจ้า',bias:.8,up:.6,dual:0},{w:2,n:'ลางแฝด',bias:.6,up:.3,dual:.5}];
const RARN=['ธรรมดา','หายาก','ล้ำค่า','ตำนาน'],RARP=[.6,.28,.1,.02];
const spRoll=sh=>{const r=Math.random(),k=r<.02+sh*.04?3:r<.12+sh*.12?2:r<.4+sh*.15?1:0;const L=B.SP.filter(x=>x[5]===k);return L[Math.floor(Math.random()*L.length)]};
const spOf=id=>B.SP.find(x=>x[0]===id);
// ครอบครัว: ป้ายของทวีป + ผลเสริม (พลังแต่กำเนิด/ลาง) — ค่าพื้นฐานเดิม (เงิน พลัง) ยังเหมือนเดิม
function famOf(fv){const n=fv.n||'';if(fv.demon)return['🌑','สายเลือดลัทธิวิญญาณมืด','ดวงจิตมักออกสายโจมตี · ทั้งทวีปจับตามอง',{inn:1,sh:.3}];
 if(fv.heirType)return['👑','ทายาทราชสำนัก','ได้ผู้ปลุกจิตประจำวังดูแลตั้งแต่เกิด',{inn:1,sh:.5}];
 if(/ขุนนาง/.test(n))return['🏛️','ตระกูลขุนนางนครหลวง','มีทรัพย์ซื้อสมุนไพรวิญญาณให้ตั้งแต่เด็ก',{inn:0,sh:.25}];
 if(fv.clan||/ใหญ่/.test(n))return['🏯','ตระกูลนักวิญญาณใหญ่','สายเลือดผู้ฝึกจิตหลายรุ่น · พลังแต่กำเนิดสูงขึ้น',{inn:1,sh:.35}];
 if(/ท้องถิ่น/.test(n))return['⭕','ตระกูลนักวิญญาณท้องถิ่น','ได้ฝึกพื้นฐานพลังจิตตั้งแต่เด็ก · ลางชัดขึ้น',{inn:0,sh:.2}];
 if(fv.orphan)return['🥀','เด็กกำพร้า','ไร้ที่พึ่ง แต่ไม่มีใครกำหนดทางให้',{inn:0,sh:0}];
 if(/พ่อค้า/.test(n))return['💰','ลูกพ่อค้าในเมือง','มีทุนตั้งต้น · ได้เห็นสัตว์วิญญาณจากกองคาราวาน',{inn:0,sh:.05}];
 return['🌾','ลูกชาวนา','ร่างกายแข็งแรง · ผู้ปลุกจิตประจำหมู่บ้านคอยดูแล',{inn:0,sh:0}]}
// พลังวิญญาณแต่กำเนิด ← ระดับพรสวรรค์เดิม (ความเร็วฝึกเท่าเดิม แต่ตอนนี้กำหนดระดับตอนปลุกด้วย)
const INN=[[.6,'พลังวิญญาณอ่อน',[1,2]],[1,'พลังวิญญาณปกติ',[2,5]],[1.4,'พลังวิญญาณดี',[4,7]],[2,'พลังวิญญาณสูง',[7,9]],[3,'พลังวิญญาณเต็มเปี่ยมแต่กำเนิด',[10,10]]];
const innOf=m=>{let o=INN[0];INN.forEach(x=>{if((m||1)>=x[0])o=x});return o};
// ---------- สุ่มช่องใหม่ (ล็อกได้ผ่านระบบล็อกเดิม) ----------
{const _gr=genRoll;genRoll=function(){let r=_gr.apply(this,arguments);try{if(isSoul()&&r){for(let i=0;i<30&&r&&((r.f&&r.f.v&&r.f.v.oid)||(r.t&&r.t.v&&r.t.v.id));i++)r=_gr.apply(this,arguments)}}catch(e){}try{if(isSoul()&&r){const L=window._LK;if(L&&L.inRoll){if(L.undo&&L.prev&&L.prev.svO){r.svR=L.prev.svR;r.svO=L.prev.svO;r.svP=L.prev.svP}else['svR','svO','svP'].forEach(k=>{if(L.on[k])r[k]=JSON.parse(JSON.stringify(L.on[k].v))})}
 if(r.svR==null)r.svR=REG[Math.floor(Math.random()*REG.length)][0];
 if(r.svO==null){const ks=Object.keys(TYN),t=ks[Math.floor(Math.random()*ks.length)],ti=OTIER.indexOf(rw(OTIER));r.svO={t,ti}}
 if(r.svP==null){const sh=famOf(r.f.v)[3].sh,a=spRoll(sh),b=spRoll(sh);r.svP=[a[0],b[0]]}
 if(r.f&&r.f.svC==null)r.f.svC=Math.random()<.01?1:0}}catch(e){console.error('svB',e)}return r}}
// ---------- แสดงการ์ด ----------
const rarOfP=p=>{try{return rarOf(p)}catch(e){return 0}};
function cards(){const r=roll,fm=famOf(r.f.v),inn=innOf(r.t.v.m),reg=REG.find(x=>x[0]===r.svR)||REG[1],O=r.svO,ot=OTIER[O.ti],pa=r.svP.map(spOf);
 const innR=[Math.min(10,inn[2][0]+fm[3].inn),Math.min(10,inn[2][1]+fm[3].inn)];
 const T=[['🗺️ แคว้นที่เกิด',`${reg[1]} ${reg[2]}`,reg[3],.2],['เพศ',r.g.v.n,'',r.g.p],
  r.f.svC?['🏠 ครอบครัว','❓ ตระกูลที่ไม่มีใครรู้จัก','ปู่ทวดไม่เคยพูดถึงอดีต · ในห้องใต้ดินมีกระบี่สนิมเขรอะถูกโซ่พันไว้',r.f.p*.01]:['🏠 ครอบครัว',`${fm[0]} ${fm[1]}`,fm[2],r.f.p],
  ['💠 พลังวิญญาณแต่กำเนิด',inn[1],`ตอนปลุกดวงจิตได้ระดับ ${innR[0]===innR[1]?innR[0]:innR[0]+'–'+innR[1]}${fm[3].inn?' (ครอบครัว +'+fm[3].inn+')':''} · ความเร็วฝึก ×${(r.t.v.m||1).toFixed(1)}`,r.t.p],
  ['🔮 ลางดวงจิต',`${TYN[O.t][0]} ${OMT[O.t]}`,`${ot.n} — เอนไปทาง${TYN[O.t][1]} ${Math.round(ot.bias*100)}%${ot.up?` · ลุ้นความหายากขึ้น ${Math.round(ot.up*100)}%`:''}${ot.dual?` · ลุ้นดวงจิตคู่ ${Math.round(ot.dual*100)}%`:''}`,.2*ot.w/100],
  ['🧬 ดวงจิตของพ่อแม่',`พ่อ ${pa[0][1]} ${pa[0][2]} · แม่ ${pa[1][1]} ${pa[1][2]}`,`${RARN[pa[0][5]]} / ${RARN[pa[1][5]]} มีโอกาสสืบทอด หรือได้ดวงจิตคู่จากสายเลือด`,RARP[pa[0][5]]*RARP[pa[1][5]]*2]];
 if(r.isOw)T.push(['วิญญาณ','ผู้ข้ามมิติ','ความทรงจำจากอีกโลกจะตื่นขึ้นช่วงอายุ 4–8 ขวบ',r.op]);
 {const L=r.trs.list.map(trOf),tw=TRAITS.reduce((a,x)=>a+x.w,0);if(!L.length)T.push(['พรสวรรค์พิเศษ','ไม่มี','เกิดมาเป็นคนธรรมดา',.45]);else L.forEach(t=>T.push([t.bad?'⚠️ พรสวรรค์พิเศษ (ด้านร้าย)':'✨ พรสวรรค์พิเศษ',t.n,t.d,t.w/tw*.55]))}
 try{if(r.body)bodyRows(r.body,T,false)}catch(e){}
 return T}
function soulPs(){const era=pickW(ERAS),r=genRoll(Math.min(.6,era.v.ow)),tw=TRAITS.reduce((a,x)=>a+x.w,0),bd=bodyGen(false),O=r.svO,pa=r.svP.map(spOf);
 const ps=[.2,r.g.p,r.f.svC?r.f.p*.01:r.f.p,r.t.p,.2*OTIER[O.ti].w/100,RARP[pa[0][5]]*RARP[pa[1][5]]*2,bd.lkP,bd.cP];if(r.isOw)ps.push(r.op);const L=r.trs.list.map(trOf).filter(Boolean);if(!L.length)ps.push(.45);else L.forEach(t=>ps.push(t.w/tw*.55));return ps}
function svGacha(){try{const rr=roll;if(!rr||!rr.svO)return;const G=p=>p<.004?['UR','#ff3df0']:p<.012?['SSR','#ffcf3a']:null;const L=[];
 cards().forEach(c=>{if(!/ครอบครัว|พลังวิญญาณแต่กำเนิด|ลางดวงจิต|ดวงจิตของพ่อแม่/.test(c[0]))return;const g=G(c[3]);if(g)L.push({k:c[0].replace(/^\S+\s/,''),n:c[1],d:c[2],gr:g,p:c[3]})});
 if(!L.length||typeof gachaShow!=='function')return;L.sort((a,b)=>a.p-b.p);const n=document.querySelectorAll('#traits .trait').length;
 setTimeout(()=>{const bs=$('birth');if(bs&&bs.classList.contains('on')&&roll===rr&&isSoul())gachaShow(L)},220*n+300)}catch(e){}}
function paint(){try{if(!isSoul()||!roll||!roll.svO)return;const T=cards();try{if(typeof RARE_DIST!=='undefined'&&!RARE_DIST.h5){const A=[];for(let i=0;i<2000;i++){try{A.push(Math.log10(rareN(soulPs())))}catch(e){A.push(0)}}A.sort((x,y)=>x-y);RARE_DIST.h5=A}}catch(e){}roll.rare=rareCalc(T,'h5');
 $('traits').innerHTML=T.map(c=>{const r=rarOfP(c[3]);return`<div class="trait sv"><div><div class="k">${c[0]}</div><div class="v t${r}">${c[1]}</div>${c[2]?`<div class="d">${c[2]}</div>`:''}</div><span class="o t${r}">${oddsTxt(c[3])}</span></div>`}).join('');
 [...document.querySelectorAll('#traits .trait')].forEach((e,i)=>setTimeout(()=>e.classList.add('show'),90*i+40));
 const h=document.querySelector('#birth h2');if(h)h.innerHTML='⭕ ถือกำเนิดในทวีปวิญญาณ';$('birth').classList.add('svB')}catch(e){console.error('svPaint',e)}}
{const _dr=doRoll;doRoll=function(){const r=_dr.apply(this,arguments);try{if(isSoul()){paint();try{heads()}catch(e){}try{fateApply()}catch(e){}queueMicrotask(()=>{try{heads()}catch(e){}});svGacha()}else{const b=$('birth');if(b&&b.classList.contains('svB')){b.classList.remove('svB');const h=b.querySelector('h2');if(h)h.textContent='คุณได้ถือกำเนิดขึ้นแล้ว'}}}catch(e){}return r}}
// ---------- 🔒 ล็อกชะตา (ตั๋วล็อก): เพิ่มช่องของทวีป · ซ่อนยุคสมัย · ชื่อช่องเดิมเป็นแบบทวีป ----------
const LKS={svR:['🗺️','แคว้น'],svO:['🔮','ลางดวงจิต'],svP:['🧬','ดวงจิตพ่อแม่']};
const svVal=(k,r)=>{r=r||roll;try{if(k==='svR'){const g=REG.find(x=>x[0]===r.svR);return g?g[1]+' '+g[2]:''}if(k==='svO')return TYN[r.svO.t][0]+' '+OTIER[r.svO.ti].n;if(k==='svP')return r.svP.map(id=>(spOf(id)||[])[1]).join(' ')}catch(e){}return''};
window.svLkTap=function(k){const L=window._LK;if(!L||!roll)return;if(L.on[k])return toast('🔒 ล็อกไว้แล้ว อยู่ไปจนเริ่มชีวิต');if(Object.keys(L.on).length>=2)return toast('ล็อกได้สูงสุด 2 อย่าง');if(L.c==null){try{lkLoad()}catch(e){}return toast('กำลังโหลดตั๋วล็อก…')}if(L.c<1)return lkMenu();
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🔒 ล็อก${LKS[k][1]}</h3><div class="item" style="text-align:center"><div class="tag2">${LKS[k][0]} ${LKS[k][1]}ตอนนี้</div><b style="font-size:18px">${esc(svVal(k))}</b></div><p class="tag2">ใช้ตั๋วล็อก 1 ใบ (เหลือ ${fmt(L.c)}) · สุ่มใหม่กี่ครั้งก็ได้${LKS[k][1]}นี้เสมอ จนกว่าจะกดเริ่มชีวิต</p><button class="pbtn" style="width:100%" onclick="svLkDo('${k}')">🔒 ล็อกเลย (1 ใบ)</button><button class="gbtn" style="width:100%;margin-top:6px" onclick="closeM()">ยังก่อน</button>`)};
window.svLkDo=async function(k){closeM();const L=window._LK;if(!L||!roll||L.on[k]||L.busy)return;const v=JSON.parse(JSON.stringify(roll[k])),n=svVal(k);L.busy=1;try{const j=await api('lkuse',{n:1});L.c=Math.max(0,+j.c||0)}catch(e){L.busy=0;if(e.message==='none'){L.c=0;toast('ตั๋วล็อกไม่พอ');lkMenu()}else toast('ใช้ตั๋วไม่สำเร็จ');return}L.busy=0;L.on[k]={v,n};L.w=(CFG.xian?'x':'m')+':'+CFG.chm;try{sfx('good')}catch(e){}toast(`🔒 ล็อก${LKS[k][1]}「${n}」แล้ว`);lkDeco(1)};
function lkDeco(force){try{if(!isSoul()||!roll||!roll.svO)return;const el=$('lkRow');if(!el)return;const L=window._LK||{on:{}};
 el.querySelectorAll('.lkb').forEach(b=>{const oc=b.getAttribute('onclick')||'';if(/lkTap\('era'\)/.test(oc)){b.style.display='none';return}
  const st=(n,v)=>{if(n&&n.nodeValue!==v)n.nodeValue=v},stx=(e,v)=>{if(e&&e.textContent!==v)e.textContent=v};
  if(/lkTap\('t'\)/.test(oc)){const f=b.firstChild;if(f&&f.nodeType===3&&/🦴|พรสวรรค์/.test(f.nodeValue))st(f,f.nodeValue.replace('🦴','💠').replace('พรสวรรค์','พลังวิญญาณ'));if(!L.on.t)stx(b.querySelector('small'),innOf(roll.t.v.m)[1])}
  if(/lkTap\('f'\)/.test(oc)){const f=b.firstChild;if(f&&f.nodeType===3&&/ชาติกำเนิด/.test(f.nodeValue))st(f,f.nodeValue.replace('ชาติกำเนิด','ครอบครัว'));if(!L.on.f)stx(b.querySelector('small'),roll.f.svC?'❓ ตระกูลลับ':famOf(roll.f.v)[1])}});
 try{const x=el.querySelector('.lkx small'),P=L.prev;if(x&&P&&P.t&&P.f){const v=`— ${innOf(P.t.v.m)[1]} · ${P.f.svC?'❓ ตระกูลลับ':famOf(P.f.v)[1]}`;if(x.textContent!==v)x.textContent=v}}catch(e){}
 Object.keys(LKS).forEach(k=>{let b=el.querySelector(`[data-svk="${k}"]`);const on=!!L.on[k];if(!b){b=document.createElement('button');b.className='lkb';b.dataset.svk=k;b.onclick=()=>svLkTap(k);const x=el.querySelector('.lkx');x?el.insertBefore(b,x):el.appendChild(b)}
  const h=`${on?'🔒':LKS[k][0]} ${LKS[k][1]}<small>${esc(on?L.on[k].n:svVal(k))}</small>`;if(b._h!==h){b._h=h;b.innerHTML=h}if(b.classList.contains('on')!==on)b.classList.toggle('on',on)})}catch(e){console.error('svLk',e)}}
{let q=0;try{new MutationObserver(()=>{if(q||!isSoul())return;q=1;requestAnimationFrame(()=>{try{lkDeco()}finally{setTimeout(()=>{q=0},50)}})}).observe($('birth'),{childList:true,subtree:true})}catch(e){}}
// หัวการ์ดตัวละคร + ชิปบนสุด: เปลี่ยนคำของยุทธภพเป็นของทวีป
function heads(){try{if(!isSoul()||!roll||!roll.svO)return;const B0=$('birth');if(!B0)return;const reg=REG.find(x=>x[0]===roll.svR)||REG[1];
 const map=new Map([['⚔️ ยุทธภพ','⭕ ทวีปวิญญาณ'],[roll.era&&roll.era.v?'🕰️ '+roll.era.v.n:'#',`${reg[1]} ${reg[2]}`],[roll.f.v.n,roll.f.svC?'❓ ตระกูลลับ':famOf(roll.f.v)[1]],[roll.t.v.n,innOf(roll.t.v.m)[1]]]);
 B0.querySelectorAll('.bchip,.hcard span').forEach(e=>{if(e.closest('#traits,#lkRow'))return;const t=e.textContent.trim();if(map.has(t))e.textContent=map.get(t)})}catch(e){}}
setInterval(heads,500);
// ---------- เริ่มชีวิต: ส่งต่อค่าทั้งหมดเข้าเกม ----------
{const _sl=startLife;startLife=function(){const r0=roll;const r=_sl.apply(this,arguments);try{if(S&&S.ch==='soul'&&r0&&r0.svO&&!S.svB){
 S.svB={reg:r0.svR,o:r0.svO,p:r0.svP,fam:famOf(r0.f.v),inn:innOf(r0.t.v.m)[2],c:r0.f.svC?1:0};
 if(!S.sv)S.sv={aw:0,sp:[],lv:0,rings:[],seen:{},hy:-9};S.sv.reg=r0.svR;
 if(r0.f.svC){S.flags.swC0=1;S.flags.swClan=1;setTimeout(()=>{try{log('🗡️ คุณเกิดในตระกูลที่ไม่มีใครรู้จัก ปู่ทวดไม่เคยพูดถึงอดีต และในห้องใต้ดินมีกระบี่สนิมเขรอะเล่มหนึ่งถูกโซ่พันไว้','myth',true)}catch(e){}},600)}
 const reg=REG.find(x=>x[0]===r0.svR);setTimeout(()=>{try{addFeed('ev',`⭕ เกิดที่ <b>${reg?reg[1]+' '+reg[2]:'ทวีปวิญญาณ'}</b> · ${S.svB.fam[0]} ${S.svB.fam[1]} · 🔮 ${OMT[r0.svO.t]}`,'sum')}catch(e){}},900)}}catch(e){console.error('svStart',e)}return r}}
// ---------- พิธีปลุก: ลาง · สายเลือดพ่อแม่ · พลังแต่กำเนิด มีผลจริง ----------
const pickT=(t,rr)=>{for(let d=0;d<4;d++){const L=B.SP.filter(x=>x[3]===t&&(x[5]===rr+d||x[5]===rr-d));if(L.length)return L[Math.floor(Math.random()*L.length)]}return null};
{const _ch=choice;choice=function(title,text,opts){try{if(title==='⭕ พิธีปลุกดวงจิต'&&S&&S.ch==='soul'&&S.svB&&S.sv&&S.sv.aw===1&&!S.svB.done){const X=S.svB,G=S.sv,ot=OTIER[X.o.ti],notes=[];X.done=1;
 const cur=()=>spOf(G.sp[0].id);let m=cur(),inh=0;
 const pa=X.p.map(spOf).filter(Boolean).sort((a,b)=>b[5]-a[5]);
 if(pa[0]&&m&&pa[0][5]>m[5]&&Math.random()<.15){G.sp[0]={id:pa[0][0],rev:0};inh=1;notes.push(`🧬 สายเลือดตื่น คุณได้ดวงจิตเดียวกับ${X.p[0]===pa[0][0]?'พ่อ':'แม่'}`)}
 m=cur();if(!inh&&m&&m[3]!==X.o.t&&Math.random()<ot.bias){const n=pickT(X.o.t,m[5]);if(n){G.sp[0]={id:n[0],rev:0};notes.push(`🔮 ลางในฝันเป็นจริง ดวงจิตออกมาเป็น${TYN[X.o.t][1]}`)}}
 m=cur();if(!inh&&m&&m[5]<3&&Math.random()<ot.up+(X.fam[3].sh||0)*.3){const L=B.SP.filter(x=>x[3]===m[3]&&x[5]===m[5]+1);if(L.length){const n=L[Math.floor(Math.random()*L.length)];G.sp[0]={id:n[0],rev:0};notes.push('✨ แสงลางสว่างจ้าจนดวงจิตยกระดับขึ้นอีกขั้น')}}
 if(!inh&&G.sp.length===1&&pa[0]&&pa[0][0]!==G.sp[0].id&&Math.random()<.05){G.sp.push({id:pa[0][0],rev:0});notes.push(`🧬 ดวงจิตของ${X.p[0]===pa[0][0]?'พ่อ':'แม่'}ตื่นขึ้นในตัวคุณด้วย ดวงจิตคู่!`)}
 if(G.sp.length===1&&ot.dual&&Math.random()<ot.dual){let n=null,k=0;while(k++<9){const c=spRoll(.2);if(c[0]!==G.sp[0].id){n=c;break}}if(n){G.sp.push({id:n[0],rev:0});notes.push('👯 ลางแฝดเป็นจริง ดวงจิตคู่!')}}
 const old=G.lv,lo=X.inn[0]+(X.fam[3].inn||0),hi=X.inn[1]+(X.fam[3].inn||0);G.lv=Math.max(0,Math.min(10,lo+Math.floor(Math.random()*(hi-lo+1))+(G.sp.length>1?1:0)));
 try{const Bk=LS.get('murim_svbook',{})||{};G.sp.forEach(s=>Bk[s.id]=1);LS.set('murim_svbook',Bk)}catch(e){}
 const desc=G.sp.map(s=>{const p=B.spNow?B.spNow(s):null,q=spOf(s.id);const ic=p?p.ic:q[1],n=p?p.n:q[2],t=p?p.t:q[3],rr=p?p.r:q[5];return`${ic} <b>${n}</b> <span class="tag2">(${TYN[t][0]} ${TYN[t][1]} · ${RARN[rr]||''})</span>`}).join(' และ ');
 const i1=text.indexOf('<br><br>'),i2=text.indexOf('<br><br>',i1+8);if(i1>=0&&i2>i1)text=text.slice(0,i1+8)+desc+text.slice(i2);
 text=text.replace(new RegExp('พลังจิตแต่กำเนิด <b>ระดับ '+old+'</b>'),`พลังจิตแต่กำเนิด <b>ระดับ ${G.lv}</b>`);
 if(notes.length)text+='<br><br>'+notes.join('<br>')}}catch(e){console.error('svAw',e)}return _ch.call(this,title,text,opts)}}
// ---------- 🎯 ปณิธานของทวีป ----------
const sv=()=>S&&S.sv||{lv:0,rings:[]};
const SG=[['sv_r9','หลอมวงแหวนครบ 9 วง','วงแหวนวิญญาณครบทุกวงในชีวิตเดียว',5,()=>(sv().rings||[]).length>=9,()=>(sv().rings||[]).length/9,()=>`วงแหวน ${(sv().rings||[]).length}/9`],
 ['sv_r5','หลอมวงแหวน 5 วง','ผ่านคอขวดห้าครั้ง',3,()=>(sv().rings||[]).length>=5,()=>(sv().rings||[]).length/5,()=>`วงแหวน ${(sv().rings||[]).length}/5`],
 ['sv_91','ได้ฉายาของตัวเอง (ระดับจิต 91)','ทั้งทวีปเรียกคุณด้วยฉายา',5,()=>sv().lv>=91,()=>sv().lv/91,()=>`ระดับจิต ${sv().lv}/91`],
 ['sv_50','ไต่ถึงระดับจิต 50','กลายเป็นบรรพชนวิญญาณ',3,()=>sv().lv>=50,()=>sv().lv/50,()=>`ระดับจิต ${sv().lv}/50`],
 ['sv_10k','วงแหวนหมื่นปีขึ้นไป','ล่าและดูดซับสัตว์วิญญาณหมื่นปีได้สำเร็จ',4,()=>(sv().rings||[]).some(g=>(g.t|0)>=3),()=>Math.min(1,Math.max(0,...(sv().rings||[{t:0}]).map(g=>g.t|0))/3),()=>{const m=Math.max(-1,...(sv().rings||[]).map(g=>g.t|0));return m<0?'ยังไม่มีวงแหวน':'วงแหวนสูงสุด '+['สิบปี','ร้อยปี','พันปี','หมื่นปี','แสนปี','ล้านปี','สิบล้านปี','ร้อยล้านปี','พันล้านปี'][m]}],
 ['sv_r3y','หลอมวงแหวน 3 วงก่อนอายุ 30','พรสวรรค์ที่ทั้งสถาบันจับตา',4,()=>(sv().rings||[]).length>=3&&(S.age|0)<30,()=>(sv().rings||[]).length/3,()=>`วงแหวน ${(sv().rings||[]).length}/3 · อายุ ${S.age|0}/29`]];
SG.forEach(x=>{const g={id:x[0],soul:1,sp:()=>false,c:()=>{try{return!!x[4]()}catch(e){return false}},pr:()=>{try{return Math.max(0,Math.min(1,x[5]()))}catch(e){return 0}},p:()=>{try{return x[6]()}catch(e){return''}},lv:x[3]};Object.defineProperty(g,'n',{get:()=>x[1],enumerable:true});Object.defineProperty(g,'d',{get:()=>x[2],enumerable:true});GOALS.push(g)});
{const _go=goalOffer;goalOffer=function(){if(isSoul()){const L=GOALS.filter(g=>g.soul).sort(()=>Math.random()-.5);const out=L.slice(0,3);if(!out.some(g=>g.lv>=5)){const h=L.find(g=>g.lv>=5&&!out.includes(g));if(h)out[2]=h}const ids=out.map(g=>g.id);if(GOALS.some(g=>g.id==='slow'))ids.push('slow');return ids}return _go.apply(this,arguments)}}
// ชื่อฉายาเดิมในเซฟ → ชื่อใหม่
setInterval(()=>{try{const g=S&&S.sv;if(g&&g.ttl&&/^โต้วหลัว/.test(g.ttl))g.ttl=g.ttl.replace(/^โต้วหลัว/,'จอมจิต')}catch(e){}},3000);
// หน้าตาการ์ดของทวีป
const css=document.createElement('style');css.textContent=`#birth.svB h2{color:#bfe8ff;text-shadow:0 0 14px #6ad8ff66}
#birth.svB .trait{border-color:#6a8aff66!important;background:linear-gradient(150deg,#1c2246,#141026)!important;position:relative;overflow:hidden}
#birth.svB .trait:before{content:'';position:absolute;right:-26px;top:-26px;width:70px;height:70px;border-radius:50%;border:2px solid #8ab4ff33;box-shadow:0 0 0 8px #b07aff14,0 0 0 16px #8ab4ff0d;pointer-events:none}
#birth.svB .box.hcard{border-color:#8ab4ff88!important;background:radial-gradient(120% 90% at 50% 0%,#2a2a6a,#141026)!important}`;document.head.appendChild(css);
})()}catch(e){console.error('block69',e)}
SL.impl.genRoll=genRoll;genRoll=function(){return globalThis.genRoll.apply(this,arguments)};SL.impl.doRoll=doRoll;doRoll=function(){return globalThis.doRoll.apply(this,arguments)};SL.impl.startLife=startLife;startLife=function(){return globalThis.startLife.apply(this,arguments)};SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};SL.impl.goalOffer=goalOffer;goalOffer=function(){return globalThis.goalOffer.apply(this,arguments)};})();

// ---- ท่อน soul16 (เดิมอยู่ app.js บรรทัด 41379) · ห่อ: openSoul, endGame, doRoll, passYear ----
(function(){const SL=globalThis.__wSlots['soul16'];let openSoul=SL.base.openSoul;let endGame=SL.base.endGame;let doRoll=SL.base.doRoll;let passYear=SL.base.passYear;const __G={openSoul:()=>openSoul,endGame:()=>endGame,doRoll:()=>doRoll,passYear:()=>passYear},__S={openSoul:v=>{openSoul=v},endGame:v=>{endGame=v},doRoll:v=>{doRoll=v},passYear:v=>{passYear=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&!S.mw);
const free=()=>!choice._cur&&!modalOpen&&!(typeof DU!=='undefined'&&DU);
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const O=(t,s,f)=>({t,s,f});
const pw=p=>{const g=Math.max(1,Math.round(total()*p));S.power+=g;return g};
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const G=()=>S.sv;
// ---------- 1) ร่างแท้ของดวงจิตที่ยังไม่มี ----------
const TF={cat:['🐆','ราชินีแมวเงาเก้าชีวิต','agi','ตายแทนเจ้าของได้แปดครั้ง ครั้งที่เก้าคือครั้งที่ศัตรูไม่มีวันลืม'],reed:['🎐','ขลุ่ยอ้อเรียกลม','sup','เสียงขลุ่ยทำให้ทั้งทีมเบาเหมือนใบไม้และหายใจได้ลึกขึ้นสองเท่า'],stone:['🗿','ศิลาเฝ้าแม่น้ำ','def','หินที่น้ำเซาะมาพันปี ตอนนี้แม้แต่สายน้ำก็ต้องแยกทางให้'],bamboo:['🎍','ไผ่ทะลวงฟ้า','atk','ลำไผ่พุ่งขึ้นจากดินพันลำในพริบตาเดียว'],frog:['🐸','ราชากบจันทรา','ctrl','ร้องครั้งเดียว ฝนตกทั้งสนามรบ และศัตรูขยับช้าลงครึ่งหนึ่ง'],lotus:['🪷','บัวพันกลีบบริสุทธิ์','sup','กลีบบัวล้างพิษ ล้างคำสาป และล้างความกลัวออกจากใจคนในทีม'],rope:['⛓️','โซ่ตรวนสวรรค์','ctrl','เชือกที่เคยผูกควาย กลายเป็นโซ่ที่ผูกได้แม้กระทั่งเงา'],crow:['🐦‍⬛','อีกาจดจำพันหน้า','ctrl','จำทุกท่าที่เคยเห็น และส่งเสียงเตือนก่อนศัตรูขยับครึ่งก้าว'],rain:['⛈️','มรสุมแรกของปี','atk','ละอองฝนกลายเป็นพายุที่ฟ้าผ่าลงตามใจเจ้าของ'],
 wolf:['🐺','จ้าวหมาป่าจันทร์เต็มดวง','atk','ฝูงหมาป่าเงาวิ่งตามทุกครั้งที่เขี้ยวสีเงินพุ่งออกไป'],tort:['🐢','เต่าแบกภูผา','def','กระดองรับได้แม้แต่การฟาดของภูเขาทั้งลูก'],vine:['🌿','รากไม้โลกใต้ดิน','ctrl','เถาวัลย์กลายเป็นรากที่แผ่ไปทั้งสนามรบ'],hawk:['🦅','พญาอินทรีพายุหมุน','agi','กระพือปีกครั้งเดียวเกิดพายุหมุนตามหลัง'],spear:['🔱','ทวนสามง่ามทะเลคราม','atk','ทวนทองแดงกลายเป็นทวนที่เรียกคลื่นได้'],bell:['🛎️','ระฆังปลุกวิญญาณ','ctrl','เสียงระฆังหยุดได้แม้กระทั่งวิญญาณที่กำลังจะออกจากร่าง'],mirror:['🔮','กระจกพันโลก','ctrl','สะท้อนท่าศัตรูกลับไปแรงกว่าเดิมสองเท่า'],tiger:['🐅','พยัคฆ์เพลิงนรก','atk','ลายบนตัวกลายเป็นเปลวไฟที่เผาได้แม้แต่วงแหวนของศัตรู'],bear:['🐻','หมีเกราะทองแดง','def','ยิ่งเจ็บ ยิ่งแข็ง ยิ่งโกรธ'],bfly:['🦋','ผีเสื้อฝันนิรันดร์','ctrl','ผงจากปีกพาศัตรูเข้าไปในฝันที่ไม่อยากตื่น'],herb:['🌳','สมุนไพรหมื่นปี','sup','กลิ่นของมันฟื้นคนที่เกือบตายให้ลุกขึ้นสู้ได้อีกครั้ง']};
let nTF=0;B.SP.forEach(p=>{const t=TF[p[0]];if(t&&!p[6]){p[6]=t;nTF++}});
// ---------- 2) สัตว์วิญญาณแปลงร่าง: ดวงจิตร่างเดิม ----------
const BST=[['b9rab','🐇','กระต่ายหยกจันทรา','sup','ขนสีเงินที่เรืองแสงยามจันทร์เต็มดวง',3,null],['b9snk','🐍','อสรพิษราตรีเก้าเกล็ด','ctrl','เกล็ดแต่ละเกล็ดเก็บความมืดของหนึ่งหมื่นปี',3,null],['b9ape','🦍','วานรศิลาค้ำเขา','def','เคยยืนค้ำภูเขาที่กำลังถล่มไว้ทั้งคืน',3,null],['b9crn','🕊️','กระเรียนเมฆาพันลี้','agi','บินรอบทวีปได้ในหนึ่งวัน',3,null],['b9tig','🐯','พยัคฆ์อัสนีขาว','atk','สายฟ้าตามรอยเท้าทุกก้าว',3,null]];
BST.forEach(b=>{if(!B.SP.some(x=>x[0]===b[0]))B.SP.push(b)});
// ---------- ทำเนียบทวีป ----------
const ENDS={b9_rev:['A','ล้างแค้นนักล่าวงแหวน','สัตว์วิญญาณในร่างคน'],b9_forgive:['S','ให้อภัยนักล่าที่เคยปล่อยไป','สัตว์วิญญาณในร่างคน'],b9_reunion:['S','พบเด็กที่เคยพาออกจากป่า','สัตว์วิญญาณในร่างคน'],b9_ring:['S','มอบตัวเองเป็นวงแหวนให้คนที่รัก','สัตว์วิญญาณในร่างคน'],b9_bridge:['S','ราชันสองเผ่า','สัตว์วิญญาณในร่างคน'],b9_hidden:['B','ใช้ชีวิตเป็นคนจนวันสุดท้าย','สัตว์วิญญาณในร่างคน'],b9_hunted:['C','ถูกเปิดโปงและถูกล่า','สัตว์วิญญาณในร่างคน'],b9_back:['A','กลับคืนสู่ป่า','สัตว์วิญญาณในร่างคน'],
 svo_judge:['S','ประมุขหอตุลาการผู้ปฏิรูป','หอตุลาการวิญญาณ'],svo_free:['S','ทุกคนได้ปลุกดวงจิตโดยไม่ต้องขออนุญาต','หอตุลาการวิญญาณ'],svo_shield:['A','ผู้ซ่อนเด็กดวงจิตต้องห้าม','หอตุลาการวิญญาณ'],svo_net:['A','เครือข่ายปลุกจิตใต้ดิน','หอตุลาการวิญญาณ'],svo_archive:['A','ผู้รักษาบันทึกของเด็กทุกคน','หอตุลาการวิญญาณ'],svo_mid:['B','ตุลาการธรรมดาคนหนึ่ง','หอตุลาการวิญญาณ'],svo_fire:['B','หอจดหมายเหตุที่มอดไหม้','หอตุลาการวิญญาณ'],svo_chain:['C','ตุลาการผู้ไร้หัวใจ','หอตุลาการวิญญาณ'],svo_exile:['C','ถูกเนรเทศออกจากทวีป','หอตุลาการวิญญาณ'],
 ge_ascend:['S','ก้าวสู่ภพเทพ','ปลายทางของทวีป'],ge_guard:['A','ผู้พิทักษ์ทวีป','ปลายทางของทวีป'],ge_mortal:['A','วางพลัง ใช้ชีวิตธรรมดา','ปลายทางของทวีป'],war:['A','วีรบุรุษสงครามอเวจี','ปลายทางของทวีป'],god:['A','ผ่านประตูเทวา','ปลายทางของทวีป'],tf_rev:['B','ปลุกร่างแท้ของดวงจิตที่คนหัวเราะเยาะ','ปลายทางของทวีป']};
const TC={S:'#f5c542',A:'#c07cff',B:'#5bb4ff',C:'#9aa0a6'};
const rec=k=>{try{const c=LS.get('murim_svend',{})||{};if(!c[k]){c[k]=1;LS.set('murim_svend',c);const e=ENDS[k];if(e)addFeed('ev',`📖 ฉากจบใหม่ในทำเนียบทวีป: <b>${e[0]} · ${esc(e[1])}</b>`,'sum')}}catch(e){}};
window.svCodex=function(){const c=LS.get('murim_svend',{})||{},gr={};Object.keys(ENDS).forEach(k=>{const g=ENDS[k][2];(gr[g]=gr[g]||[]).push(k)});const n=Object.keys(ENDS).filter(k=>c[k]).length;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📖 ทำเนียบทวีป <span class="tag2">${n}/${Object.keys(ENDS).length}</span></h3><p class="tag2">ฉากจบในทวีปจิตวิญญาณยุทธ์ · สะสมข้ามทุกชีวิต · S ยากที่สุด</p>${Object.keys(gr).map(g=>`<div class="item"><b>${g}</b><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:5px">${gr[g].map(k=>{const e=ENDS[k];return c[k]?`<span class="tag2" style="padding:2px 8px;border-radius:99px;border:1px solid ${TC[e[0]]}">${e[0]} · ${e[1]}</span>`:`<span class="tag2" style="padding:2px 8px;border-radius:99px;border:1px dashed #8886;opacity:.6">${e[0]} · ???</span>`}).join('')}</div></div>`).join('')}`,'svcodex')};
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{const m=$('modal');if(m&&!m.querySelector('.svCdx')){const b=document.createElement('button');b.className='gbtn svCdx';b.style.cssText='width:100%;margin-top:6px';b.textContent='📖 ทำเนียบทวีป (ฉากจบ)';b.onclick=()=>svCodex();m.appendChild(b);const bs=S&&S.sv&&S.sv.bst;if(bs&&bs.sp){const d=document.createElement('div');d.className='item';d.innerHTML=`🐾 <b>ร่างเดิม: ${esc(bs.nm||'')}</b> · อายุบำเพ็ญ ${fmt(bs.yr||100000)} ปี<br><span class="tag2">ความสงสัยของคนรอบตัว</span><div style="height:6px;border-radius:9px;background:#8883;overflow:hidden"><div style="width:${cl(bs.sus||0,0,100)}%;height:100%;background:${(bs.sus||0)>=70?'#e5484d':'#f5a623'}"></div></div>`;const h=m.querySelector('h3');if(h)h.insertAdjacentElement('afterend',d)}}}catch(e){}return r}}
// จบชีวิต: บันทึกปลายทางเดิมของทวีปลงทำเนียบ
{const _eg=endGame;endGame=function(){try{if(S&&S.ch==='soul'&&S.sv){const x=S.sv.x||{};if(x.ge)rec('ge_'+x.ge);if(x.done&&x.done.includes('war'))rec('war');if(x.done&&x.done.includes('god'))rec('god');if((S.sv.sp||[]).some(s=>s.rev))rec('tf_rev')}}catch(e){}return _eg.apply(this,arguments)}}
// ---------- 3) หน้าสุ่มกำเนิด: ปุ่มเลือกเกิดเป็นสัตว์วิญญาณ ----------
const isSoulB=()=>{try{return CH_KEYS[CFG.chm]==='soul'&&!CFG.mw&&!CFG.daily}catch(e){return false}};
const bOn=()=>!!LS.get('murim_svbst',0);
window.svBstTog=function(){LS.set('murim_svbst',bOn()?0:1);paintB()};
function paintB(){try{const t=$('traits');if(!t)return;let b=$('svBstB');if(!isSoulB()){if(b)b.remove();return}if(!b){t.insertAdjacentHTML('afterend','<div id="svBstB" style="margin:8px 0"></div>');b=$('svBstB')}
 b.innerHTML=`<button class="${bOn()?'pbtn':'gbtn'}" style="width:100%" onclick="svBstTog()">🐾 ${bOn()?'เกิดเป็นสัตว์วิญญาณแสนปีที่แปลงร่าง เปิดอยู่':'เกิดเป็นสัตว์วิญญาณแสนปี แล้วแปลงร่างเป็นมนุษย์'}</button><div class="tag2" style="margin-top:3px">${bOn()?'เริ่มชีวิตด้วยความทรงจำแสนปีในป่า · ได้ดวงจิตร่างเดิมระดับตำนาน · ต้องซ่อนตัวตนจากนักล่าวงแหวน':'แตะเพื่อเลือกเส้นทางนี้ (ใช้กับชีวิตถัดไปในทวีป)'}</div>`}catch(e){}}
{const _dr=doRoll;doRoll=function(){const r=_dr.apply(this,arguments);try{paintB()}catch(e){}return r}}
// ---------- 4) บทนำแสนปี ----------
const FN=['หลิว','เสี่ยวหลาน','อาเจิ้ง','หมิงเยว่','ต้าหู','ซานซาน'];
const HN=['นักล่าวงแหวนหน้าแผลเป็น','ปรมาจารย์ธนูเงิน','หัวหน้ากองล่าตระกูลเหล็ก'];
function bst(){return G().bst}
function pro(i){const b=bst();if(!b||!on())return;const nx=()=>setTimeout(()=>{if(on()&&bst())pro(i+1)},500);
 if(i===0)return choice('🐾 หนึ่งแสนปีก่อน','ในป่าต้องห้ามพันพฤกษ์ มีสัตว์ตัวหนึ่งลืมตาขึ้นใต้รากไม้โลก ยังไม่มีชื่อ ยังไม่มีพลัง มีแค่ความหิว และฟ้าที่กว้างเกินกว่าจะมองเห็นขอบ นั่นคือคุณ<br><br><b>คุณเกิดมาเป็นอะไร</b>',BST.map(x=>O(`${x[1]} ${x[2]}`,{sup:'สายสนับสนุน',ctrl:'สายควบคุม',def:'สายป้องกัน',agi:'สายว่องไว',atk:'สายโจมตี'}[x[3]],()=>{b.sp=x[0];b.nm=x[2];b.ic=x[1];log(`${x[1]} ลูก${x[2]}ตัวหนึ่งคลานออกจากใต้รากไม้โลก`,'epic',true);nx()})));
 if(i===1)return choice(`${b.ic} หนึ่งร้อยปี: อาณาเขต`,`คุณโตพอจะมีอาณาเขตของตัวเอง ทางเหนือมีถ้ำของราชาหมีแก่ที่กำลังจะตาย ทางตะวันออกมีฝูงพวกเดียวกับคุณที่ยินดีรับเข้าฝูง`,[
  O('⚔️ ท้าราชาหมีแก่ ชิงถ้ำ','แข็งแกร่งขึ้น · มีแผล',()=>{b.str=1;b.scar=1;log(`${b.ic} คุณชนะราชาหมีในคืนพระจันทร์เต็มดวง ถ้ำเป็นของคุณ แผลที่ไหล่ไม่เคยหาย`,'epic');nx()}),
  O('🐾 เข้าฝูง','มีพวก',()=>{b.pack=1;log(`${b.ic} ฝูงรับคุณเหมือนลูกหลาน ทุกฤดูหนาวคุณนอนเบียดกันใต้หิมะ`,'good');nx()}),
  O('🌫️ ซ่อนตัวบำเพ็ญเงียบๆ','รู้จักเก็บกลิ่นอาย',()=>{b.calm=1;log(`${b.ic} คุณเรียนรู้ที่จะหายใจให้เบาจนนกบินมาเกาะบนหลัง`,'good');nx()})]);
 if(i===2){const fn=FN[Math.floor(Math.random()*FN.length)];return choice(`${b.ic} หนึ่งพันปี: เด็กที่หลงป่า`,`เด็กมนุษย์อายุราวเจ็ดขวบหลงเข้ามาในอาณาเขตคุณ ตัวสั่น เท้าเปื้อนเลือด เธอบอกว่าชื่อ "${fn}" และพ่อของเธอเป็นนักล่าวงแหวนที่ไม่กลับบ้านมาสามวัน`,[
  O('🤲 พาเด็กออกไปส่งที่ขอบป่า','ผูกพัน',()=>{b.friend=fn;log(`${b.ic} คุณให้${fn}ขี่หลังออกไปถึงขอบป่า เธอผูกด้ายแดงไว้ที่${b.sp==='b9snk'?'หาง':'ขา'}ของคุณก่อนวิ่งกลับหมู่บ้าน`,'epic');nx()}),
  O('🌲 ปล่อยให้ป่าตัดสินชะตาของเธอ','ไม่ยุ่งกับมนุษย์',()=>{b.cold=1;log(`${b.ic} คุณหันหลังให้เสียงร้องไห้ เช้าวันรุ่งขึ้นป่าเงียบสนิท`,'');nx()})])}
 if(i===3){const hn=HN[Math.floor(Math.random()*HN.length)];b.foe=hn;return choice(`${b.ic} หนึ่งหมื่นปี: กองล่าวงแหวน`,`กองล่าหกคนนำโดย<b>${hn}</b> บุกเข้าป่าเพื่อล่าวงแหวนหมื่นปี ${b.pack?'ฝูงคุณล้มไปทีละตัว':'ถ้ำคุณถูกล้อม'} ${b.friend?'คุณเห็นด้ายแดงจางๆ ที่ข้อมือของนักล่าคนหนึ่ง':''}`,[
  O('🌑 หนีลึกเข้าไปในป่าต้องห้าม','รอด · แค้นติดตัว',()=>{b.hate=1;log(`${b.ic} คุณหนีรอด แต่จำใบหน้าของ${hn}ได้ทุกรอยย่น`,'bad');nx()}),
  O('🩸 สู้จนนักล่าบาดเจ็บ','เขาจะจำคุณได้',()=>{b.hate=1;b.scar=(b.scar||0)+1;b.str=(b.str||0)+1;log(`${b.ic} ${hn}เสียตาไปข้างหนึ่ง คุณเสียฝูง/ถ้ำทั้งหมด`,'epic');nx()}),
  O('👁️ ยอมให้เขาเห็น แล้วปล่อยให้เขาไป','เมตตา',()=>{b.mercy=1;log(`${b.ic} ${hn}ยกธนูค้างไว้นาน แล้วลดลง เขาพาคนของเขาออกจากป่าในคืนนั้น`,'epic');nx()})])}
 if(i===4)return choice(`${b.ic} หนึ่งแสนปี: ทัณฑ์แปลงกาย`,'อายุบำเพ็ญครบหนึ่งแสนปี ฟ้ามืดลงทั้งป่า สัตว์วิญญาณแสนปีมีสองทาง ถูกล่าเป็นวงแหวนสักวันหนึ่ง หรือทิ้งร่างนี้แล้วเกิดใหม่เป็นทารกมนุษย์ ไม่มีพลัง ไม่มีใครรู้ว่าคุณเคยเป็นอะไร<br><br><b>คุณเลือกเป็นมนุษย์เพราะอะไร</b>',[
  O('🔥 เพื่อแก้แค้นนักล่า','ตามหา'+b.foe,()=>{b.aim='rev';go()}),
  ...(b.friend?[O(`🧵 เพื่อตามหา${b.friend}`,'ด้ายแดงยังอยู่',()=>{b.aim='find';go()})]:[]),
  O('📖 เพื่อเรียนรู้ว่ามนุษย์คืออะไร','อยากเข้าใจ',()=>{b.aim='learn';go()}),
  O('🫥 เพื่อหนีจากการถูกล่าตลอดกาล','อยากเงียบสงบ',()=>{b.aim='hide';go()})]);
 function go(){b.yr=100000;b.sus=b.calm?5:15;b.pro=9;log(`🌩️ ฟ้าผ่าลงกลางป่าเก้าครั้ง ร่างของ${b.nm}สลายเป็นแสง <b>คุณลืมตาขึ้นในร่างทารกมนุษย์</b> ที่ถูกวางไว้หน้าบ้านคนในหมู่บ้าน ความทรงจำแสนปียังอยู่ครบ`,'myth',true);try{isl&&0}catch(e){}}}
// ---------- พิธีปลุกจิต: ได้ร่างเดิม ----------
{const _sf=window._svFail;window._svFail=function(g){try{const b=g&&g.bst;if(b&&b.sp&&b.pro===9){g.sp=[{id:b.sp,rev:0}];g.lv=Math.min(10,8+(b.str?1:0)+(b.calm?1:0));try{const Bk=LS.get('murim_svbook',{})||{};Bk[b.sp]=1;LS.set('murim_svbook',Bk)}catch(e){}
 try{if(S.svB)S.svB.done=1}catch(e){}
 setTimeout(()=>choice('⭕ พิธีปลุกดวงจิต · ร่างเดิมตื่น',`ลูกแก้วทั้งหกแตกพร้อมกัน แสงที่พุ่งขึ้นเป็นรูปร่าง<b>${b.ic} ${b.nm}</b> ผู้ปลุกจิตประจำหมู่บ้านหน้าซีด เขาเคยเห็นดวงจิตแบบนี้ในตำราเท่านั้น ระดับพลังแต่กำเนิด <b>${g.lv}</b> และกลิ่นอายที่แผ่ออกมาไม่ใช่กลิ่นของเด็กหกขวบ`,[
  O('🌫️ กดกลิ่นอายไว้ แกล้งทำเป็นเด็กธรรมดา','ความสงสัยต่ำ',()=>{b.sus=Math.max(0,b.sus-8);log(`${b.ic} คุณหายใจเบาแบบที่เคยทำในป่า แสงจางลง ผู้ปลุกจิตขยี้ตาแล้วบอกว่าคงตาฝาด`,'good')}),
  O('🌟 ปล่อยให้ทุกคนเห็นเต็มที่','ชื่อเสียง · ความสงสัยสูง',()=>{b.sus=Math.min(100,b.sus+25);S.fame+=800;log(`${b.ic} ทั้งหมู่บ้านคุกเข่า ข่าวไปถึงเมืองหลวงในสามวัน และไปถึงหูนักล่าวงแหวนด้วย`,'myth')})]),300);return true}}catch(e){console.error('b9aw',e)}return _sf?_sf.apply(this,arguments):false}}
// ---------- 5) ชีวิตในร่างคน: เหตุการณ์ + ฉากจบ ----------
function bEnd(k,txt,cls,die){rec(k);const e=ENDS[k];log(`🐾 <b>${e[1]}</b> — ${txt}`,cls||'myth',true);bst().fin=k;S.fame+=e[0]==='S'?20000:e[0]==='A'?6000:500;if(die){S.deathCause=die;setTimeout(()=>{try{checkDeath()}catch(x){}},400)}}
const BE=[
 {id:'sniff',c:b=>S.age>=9&&S.age<=17,t:'👃 ครูที่ได้กลิ่นป่า',x:b=>'ครูฝึกในสถาบันเป็นอดีตนักล่า เขาเดินผ่านโต๊ะคุณแล้วหยุด ดมอากาศสองครั้ง "เธอไปเล่นในป่ามาเหรอ"',o:b=>[O('😊 ตอบว่าใช่ ไปเก็บเห็ดกับยาย','โกหก',()=>{b.sus+=Math.random()<.5?-4:8;log('👃 ครูพยักหน้าช้าๆ แต่สายตาของเขายังตามคุณไปทั้งคาบ','')}),O('🌫️ กดกลิ่นอายลงจนตัวเย็น','เจ็บ แต่ได้ผล',()=>{b.sus=Math.max(0,b.sus-6);hurt(.08);log('🌫️ ตัวคุณเย็นเฉียบ ครูขมวดคิ้วแล้วเดินต่อ','good')})]},
 {id:'kin',c:b=>S.age>=12,t:'🐾 สัตว์วิญญาณที่คุกเข่า',x:b=>`ระหว่างล่าวงแหวนกับทีม สัตว์วิญญาณพันปีตัวหนึ่งหยุดวิ่ง แล้วก้มหัวให้คุณต่อหน้าทุกคน มันรู้ว่าคุณคือ${b.nm}`,o:b=>[O('🗡️ ฆ่ามันต่อหน้าทีม ปกปิดตัวตน','เลือดพวกเดียวกัน',()=>{b.sus=Math.max(0,b.sus-10);b.kinK=(b.kinK||0)+1;pw(.03);log('🗡️ ทีมโห่ร้องชื่นชม คุณไม่ได้กินข้าวคืนนั้น','bad')}),O('🙅 ไล่มันไป บอกทีมว่ามันป่วย','ทีมสงสัย',()=>{b.sus+=12;b.kinS=(b.kinS||0)+1;log('🐾 มันวิ่งหายเข้าป่า ทีมมองหน้ากันโดยไม่พูดอะไร','')})]},
 {id:'rumor',c:b=>b.sus>=40,t:'📜 ประกาศของกองล่า',x:b=>'กระดานประกาศในเมืองมีใบใหม่ "รางวัลนำจับ: สัตว์วิญญาณแสนปีที่แปลงร่างเป็นคน มีคนเห็นในแคว้นนี้" ภาพวาดในใบประกาศคล้ายคุณตอนเด็กเกินไป',o:b=>[O('🔥 แอบดึงประกาศทิ้งทั้งเมือง','ลดข่าว',()=>{b.sus=Math.max(0,b.sus-10);log('🔥 คุณดึงใบประกาศสามร้อยใบในคืนเดียว','good')}),O('🧳 ย้ายไปแคว้นอื่น','เริ่มใหม่',()=>{b.sus=Math.max(0,b.sus-18);S.money=Math.max(0,S.money-Math.round(S.money*.2));S.fame=Math.round(S.fame*.8);log('🧳 คุณเริ่มชีวิตใหม่ในเมืองที่ไม่มีใครรู้จัก','')})]}];
function bYear(){const b=bst();if(!b||b.pro!==9||b.fin||!G().aw)return false;const g=G();b.sus=cl((b.sus||0)+(g.lv>=50?1:0),0,100);
 // ถูกเปิดโปง
 if(b.sus>=85){choice('🏹 ถูกเปิดโปง','กองล่าวงแหวนหกสิบคนล้อมบ้านคุณตอนรุ่งสาง ประกาศชัดๆ ว่า "สัตว์วิญญาณแสนปี ออกมาซะ วงแหวนของเจ้ามีค่าเท่าเมืองทั้งเมือง"',[
  O('⚡ คืนร่างเดิม สู้ทั้งกองทัพ',`ระดับจิต ${g.lv}`,()=>{if(Math.random()<cl(.15+g.lv/140,.15,.85)){b.sus=30;S.fame+=8000;pw(.1);log(`${b.ic} ${b.nm}คำรามกลางเมือง กองล่าแตกกระเจิง แต่ชีวิตแบบคนธรรมดาคุณจบลงตรงนั้น`,'myth',true);bEnd('b9_back','คุณเดินกลับเข้าป่าต้องห้ามโดยไม่มีใครกล้าตาม และกลายเป็นราชาของป่าที่คุณเคยหนีออกมา','myth')}else bEnd('b9_hunted','วงแหวนแสนปีของคุณกลายเป็นวงที่เก้าของนักล่าคนหนึ่ง','bad','ถูกกองล่าวงแหวนล่าเมื่อตัวตนสัตว์วิญญาณถูกเปิดโปง')}),
  O('🏃 หนีไปตามทางใต้ดิน','รอดแต่เสียทุกอย่าง',()=>{b.sus=35;S.money=Math.round(S.money*.3);S.fame=Math.round(S.fame*.5);hurt(.3);rec('b9_hunted');log('🏃 คุณรอดมาได้ บ้าน ชื่อ และเพื่อนทั้งหมดถูกทิ้งไว้ข้างหลัง','bad',true)})]);return true}
 // ล้างแค้น / ให้อภัย
 if(b.foe&&!b.foeD&&g.lv>=35&&Math.random()<.35){b.foeD=1;choice(`🏹 ${b.foe}`,`งานเลี้ยงที่เมืองหลวง ชายชราที่นั่งหัวโต๊ะคือ<b>${b.foe}</b> ${b.scar?'ตาข้างหนึ่งของเขาเป็นแผลเป็น':''} เขาเป็นผู้อาวุโสของสภาทวีปแล้ว และหลานสาวของเขานั่งอยู่ข้างๆ`,[
  O('🔥 ตามไปถึงบ้าน ล้างแค้นคืนนี้','จบความแค้นแสนปี',()=>{duel(b.foe,Math.round(total()*1.1),w=>{if(w){S.karma-=10;bEnd('b9_rev',`${b.foe}รู้ว่าคุณคือใครในวินาทีสุดท้าย เขาไม่ขอชีวิต แค่ขอให้ปล่อยหลาน`,'epic')}else{hurt(.35);b.sus+=25;log(`🩸 ${b.foe}ยังแข็งแกร่งกว่าที่คิด คุณหนีออกมาพร้อมแผล และตอนนี้เขารู้แล้วว่าคุณคือใคร`,'bad',true)}})}),
  O(b.mercy?'🕊️ เดินไปนั่งข้างเขา บอกว่าเราเคยพบกันในป่า':'🍶 ยกจอกให้เขา แล้วปล่อยวาง',b.mercy?'เขาเคยลดธนู':'ปล่อยวาง',()=>{if(b.mercy){b.sus=Math.max(0,b.sus-30);bEnd('b9_forgive',`${b.foe}มือสั่นจนจอกตก เขาบอกว่าคืนนั้นเป็นคืนเดียวในชีวิตที่เขาไม่เสียใจ และใช้ตำแหน่งในสภาลบชื่อคุณออกจากบัญชีล่าตลอดกาล`,'myth')}else{S.karma+=8;b.hate=0;log('🍶 คุณยกจอกให้คนที่ฆ่าฝูงของคุณ แล้วเดินออกมาโดยไม่หันกลับ ความแค้นแสนปีเบาลงเหมือนขนนก','epic',true)}})]);return true}
 // เพื่อนจากป่า
 if(b.friend&&!b.frD&&S.age>=16&&Math.random()<.3){b.frD=1;choice(`🧵 ${b.friend}`,`หญิงสาวในชุดผู้ฝึกจิตเดินชนคุณที่ตลาด ข้อมือเธอผูกด้ายแดงเส้นเดิม เธอมองหน้าคุณนานผิดปกติ "ขอโทษนะ เราเคยเจอกันไหม คุณมีกลิ่นเหมือนป่าที่ฉันหลงตอนเด็ก"`,[
  O('🫂 บอกความจริงทั้งหมด','เดิมพันกับความไว้ใจ',()=>{if(Math.random()<.7){b.fr=2;b.sus=Math.max(0,b.sus-10);bEnd('b9_reunion',`${b.friend}ร้องไห้กลางตลาด เธอตามหา${b.nm}มาตลอดชีวิต ตั้งแต่วันนั้นเธอเป็นคนเดียวที่รู้ความลับของคุณ และไม่เคยบอกใคร`,'myth')}else{b.sus+=30;log(`😨 ${b.friend}ถอยหนีแล้ววิ่งไปหาหน่วยลาดตระเวน`,'bad',true)}}),
  O('🙂 บอกว่าคงจำคนผิด','เก็บความลับ',()=>{b.fr=1;log(`🧵 คุณยิ้มแล้วเดินผ่าน ${b.friend}ยังยืนมองตามหลังคุณจนลับตา`,'')})]);return true}
 // เสียสละเป็นวงแหวน
 if(b.fr===2&&!b.ringD&&g.lv>=60&&Math.random()<.25){b.ringD=1;choice('⭕ คอขวดของ'+b.friend,`${b.friend}ติดคอขวดวงแหวนวงที่เก้ามาสิบปี เธอบาดเจ็บหนักจากการล่าสัตว์แสนปีที่ล้มเหลว หมอบอกว่าถ้าไม่ได้วงแหวนแสนปีในหนึ่งปี ดวงจิตเธอจะแตก`,[
  O(`💫 มอบตัวเองเป็นวงแหวนให้${b.friend}`,'จบชีวิตนี้ · ฉากจบระดับ S',()=>{bEnd('b9_ring',`${b.nm}กลายเป็นวงแหวนสีแดงที่สวยที่สุดที่ทวีปเคยเห็น ${b.friend}มีชีวิตต่อไปอีกหลายร้อยปี และทุกครั้งที่เธอใช้ท่าวงแหวนวงที่เก้า ด้ายแดงที่ข้อมือจะเรืองแสง`,'myth','มอบตัวเองเป็นวงแหวนแสนปีให้คนที่รัก')}),
  O('🌿 ออกตามหาสมุนไพรหมื่นปีแทน','เสี่ยง',()=>{if(Math.random()<.5){S.qi+=5;log(`🌿 คุณกลับมาพร้อมสมุนไพรทันเวลา ${b.friend}รอด`,'epic',true)}else{log(`🕯️ คุณกลับมาช้าไปหนึ่งวัน`,'bad',true)}})]);return true}
 // ราชันสองเผ่า / ใช้ชีวิตเป็นคน
 if(g.lv>=80&&!b.endD&&Math.random()<.35){b.endD=1;const ok=(b.kinS||0)>=1&&b.sus<50;choice('👑 ทางแยกของสองเผ่า',`ระดับจิต ${g.lv} คุณแข็งแกร่งพอจะเลือกเองแล้วว่าจะเป็นอะไร สภาทวีปกำลังร่างกฎหมายล่าสัตว์วิญญาณฉบับใหม่ ส่วนสัตว์วิญญาณในป่าต้องห้ามเริ่มรวมตัวกันจะบุกเมือง`,[
  O('🤝 เปิดเผยตัวตน แล้วเจรจาให้สองเผ่าหยุดรบ',ok?'สัตว์ในป่าจำความเมตตาคุณได้':'⚠️ ยังไม่มีใครเชื่อใจคุณพอ',()=>{if(ok||Math.random()<.25){bEnd('b9_bridge','สภาทวีปกับราชาสัตว์ป่าต้องห้ามลงนามสนธิสัญญาฉบับแรกต่อหน้าคุณ การล่าวงแหวนต้องได้รับความยินยอมจากเผ่าสัตว์ และคุณเป็นผู้ค้ำประกันของทั้งสองฝ่าย','myth')}else{b.sus=100;log('🔥 ทั้งสองฝ่ายไม่ไว้ใจสิ่งที่ยืนอยู่ตรงกลาง','bad',true)}}),
  O('🏡 ใช้ชีวิตเป็นคนต่อไปจนวันสุดท้าย','เก็บความลับถึงหลุม',()=>{bEnd('b9_hidden','ไม่มีใครรู้ว่าผู้อาวุโสใจดีของหมู่บ้านเคยเป็นสัตว์วิญญาณแสนปี จนวันที่คุณจากไปและร่างสลายเป็นแสงกลางงานศพ','epic')})]);return true}
 // เหตุการณ์ทั่วไป
 if(Math.random()<.16){const L=BE.filter(e=>{try{return e.c(b)&&!(b.cd&&b.cd[e.id]!=null&&S.age-b.cd[e.id]<6)}catch(x){return false}});if(L.length){const e=L[Math.floor(Math.random()*L.length)];b.cd=b.cd||{};b.cd[e.id]=S.age;choice(e.t,e.x(b),e.o(b));return true}}
 return false}
// ---------- 6) หอตุลาการวิญญาณ (3 องก์ แตกแขนง) ----------
const ORG={a0:['⚖️ จดหมายจากหอตุลาการวิญญาณ','หอตุลาการวิญญาณคือองค์กรที่อยู่เหนือทุกจักรวรรดิ ทุกพิธีปลุกจิตในทวีปต้องได้รับอนุญาตจากที่นี่ ทุกดวงจิตถูกบันทึกในหอจดหมายเหตุ และดวงจิตที่ถูกตัดสินว่า "อันตราย" จะถูกผนึกตั้งแต่เด็ก วันนี้ตราประทับสีเงินของหอส่งมาถึงคุณ พร้อมคำเชิญเป็นผู้ตรวจการดวงจิต',[
  ['🎖️ รับตำแหน่งผู้ตรวจการ','อำนาจ · เงินเดือนดี','j'],['🚫 ปฏิเสธ','หอไม่ชอบคำว่าไม่','r'],['🕶️ รับตำแหน่ง แต่ทำงานให้กลุ่มต่อต้าน','สองหน้า','i']]],
 a1:{j:['เด็กดวงจิตต้องห้าม','ภารกิจแรกของคุณคือรับตัวเด็กชายวัยหกขวบที่ปลุกดวงจิต "ความว่างเปล่า" มาผนึกที่หอ แม่ของเขายืนขวางประตูบ้านด้วยมีดทำครัว',[['📜 ทำตามคำสั่ง พาเด็กไป','กฎคือกฎ','t'],['🫣 รายงานว่าไม่พบตัวเด็ก แล้วซ่อนเขาไว้','ทรยศหอ','h']]],
  r:['ครอบครัวถูกขึ้นบัญชีดำ','หนึ่งเดือนหลังคุณปฏิเสธ คำร้องขอปลุกจิตของน้องคุณถูกปฏิเสธโดยไม่มีเหตุผล น้องเหลือเวลาอีกหนึ่งปีก่อนจะเลยวัยปลุกจิต',[['📨 ยื่นอุทธรณ์ตามระบบ','ช้า','a'],['🕯️ หาผู้ปลุกจิตใต้ดิน','ผิดกฎหมาย','u']]],
  i:['แผนเผาหอจดหมายเหตุ','กลุ่มต่อต้านวางแผนเผาหอจดหมายเหตุ ที่เก็บบันทึกดวงจิตของคนทั้งทวีป ถ้าไม่มีบันทึก หอก็ตามล่าใครไม่ได้อีก แต่บันทึกพวกนั้นก็เป็นสิ่งเดียวที่บอกพ่อแม่ว่าลูกที่ถูกผนึกอยู่ที่ไหน',[['🔥 ช่วยกลุ่มต่อต้านเผา','ลบทุกอย่าง','s'],['📦 แอบขนบันทึกออกมาก่อนไฟไหม้','เสี่ยงสองเท่า','p']]]},
 a2:{t:'⚖️ ห้องพิจารณาชั้นบนสุด',x:{jt:'ประมุขหอเรียกคุณขึ้นห้องชั้นบนสุด เด็กชายที่คุณพามานั่งอยู่ในกรงผนึก ประมุขบอกว่าดวงจิตของเขาจะถูกใช้เป็นอาวุธในสงครามอเวจี',jh:'หอส่งผู้ตรวจการอีกคนมาตรวจบ้านที่คุณซ่อนเด็กไว้ และผู้ตรวจการคนนั้นคือเพื่อนร่วมรุ่นคุณ',ra:'การพิจารณาอุทธรณ์เริ่มขึ้น คุณมีเวลาพูดสามนาทีต่อหน้าตุลาการเจ็ดคน',ru:'ผู้ปลุกจิตใต้ดินเป็นหญิงชราที่ปลุกจิตให้เด็กถูกปฏิเสธมาแล้วสามร้อยคน คืนนี้หอส่งคนมาล้อมบ้านเธอ',is:'ไฟลุกท่วมหอจดหมายเหตุ คุณได้ยินเสียงผู้ดูแลหอติดอยู่ชั้นบน',ip:'คุณแบกหีบบันทึกสามหีบออกทางท่อระบายน้ำ ยามเห็นแสงตะเกียงคุณ'},
  risk:['เดิมพันทุกอย่างกับสิ่งที่ถูกต้อง','อาจเสียทุกอย่าง'],safe:['เลือกทางที่ยังอยู่รอดได้','ประนีประนอม'],
  p:{jt:['svo_judge','svo_mid','svo_chain'],jh:['svo_shield','svo_shield','svo_exile'],ra:['svo_free','svo_mid','svo_exile'],ru:['svo_net','svo_net','svo_exile'],is:['svo_free','svo_fire','svo_exile'],ip:['svo_archive','svo_fire','svo_exile']}},
 tx:{svo_judge:'คุณปล่อยเด็กออกจากกรงต่อหน้าประมุข แล้วยื่นหลักฐานการผนึกเด็กสามพันคนต่อสภาทวีป ประมุขถูกปลด และคุณถูกเลือกเป็นประมุขคนใหม่ กฎข้อแรกคือไม่มีดวงจิตใดต้องห้าม',svo_mid:'คุณทำงานในหอต่อไปอีกสามสิบปี ช่วยเด็กได้บ้างเมื่อทำได้ และไม่เคยเล่าเรื่องห้องชั้นบนสุดให้ใครฟัง',svo_chain:'คุณผนึกเด็กชายด้วยมือตัวเอง ได้เลื่อนตำแหน่งในปีถัดไป และไม่มีใครในหมู่บ้านเดิมพูดกับคุณอีก',svo_shield:'เพื่อนร่วมรุ่นมองเด็กแล้วมองหน้าคุณ แล้วเขียนรายงานว่า "ไม่พบ" เด็กชายโตขึ้นเป็นผู้ฝึกจิตที่ใช้ความว่างเปล่าปกป้องเมืองแทนทำลาย',svo_exile:'หอตัดสินว่าคุณเป็นภัยต่อทวีป คุณถูกเนรเทศพร้อมตราบาปที่ผนึกวงแหวนไว้ครึ่งหนึ่ง',svo_free:'สามนาทีของคุณถูกจดเป็นคำพิพากษาที่ถูกอ้างถึงมากที่สุดในประวัติศาสตร์ทวีป การขออนุญาตปลุกจิตถูกยกเลิกทั้งทวีป',svo_net:'คุณพาหญิงชราออกทางหลังคา เครือข่ายของเธอกลายเป็นของคุณ เด็กที่ถูกปฏิเสธอีกห้าพันคนได้ปลุกจิตในยี่สิบปีต่อมา',svo_fire:'หอจดหมายเหตุมอดไหม้ หอตามล่าใครไม่ได้อีก แต่พ่อแม่หลายพันคนก็ไม่มีวันรู้ว่าลูกถูกผนึกไว้ที่ไหน',svo_archive:'หีบสามหีบรอดออกมา คุณส่งจดหมายถึงพ่อแม่ทุกคนที่มีชื่อในบันทึก เด็กที่ถูกผนึกถูกตามหาเจอทีละคน'}};
function oStep(){const g=G();g.o9=g.o9||{c:0,k:'',y:S.age};const a=g.o9;
 if(a.c===0){const s=ORG.a0;choice(s[0],s[1],s[2].map(o=>O(o[0],o[1],()=>{a.k=o[2];a.c=1;a.y=S.age;log('⚖️ คุณตัดสินใจแล้ว หอตุลาการจำทุกอย่าง','')})));return}
 if(a.c===1){const s=ORG.a1[a.k];choice('⚖️ '+s[0],s[1],s[2].map(o=>O(o[0],o[1],()=>{a.k+=o[2];a.c=2;a.y=S.age;log('⚖️ เรื่องเดินต่อไปตามทางที่คุณเลือก','')})));return}
 const z=ORG.a2,P=z.p[a.k],p=cl(.38+g.lv/250+(S.fame>50000?.08:0),.15,.85);
 const fin=k=>{a.c=3;rec(k);const e=ENDS[k];log(`⚖️ <b>${e[1]}</b> — ${ORG.tx[k]}`,e[0]==='S'?'myth':e[0]==='A'?'epic':e[0]==='B'?'good':'bad',true);S.fame+=e[0]==='S'?15000:e[0]==='A'?5000:e[0]==='B'?1000:0;if(k==='svo_exile'){S.money=Math.round(S.money*.3)}};
 choice(z.t,z.x[a.k],[O(z.risk[0],`${z.risk[1]} · สำเร็จ ~${Math.round(p*100)}%`,()=>fin(Math.random()<p?P[0]:P[2])),O(z.safe[0],z.safe[1],()=>fin(P[1]))])}
// ---------- ตัวสุ่มรายปี ----------
{const _py=passYear;passYear=function(){const a0=S&&S.age;const r=_py.apply(this,arguments);try{if(!on()||!S||S.age===a0)return r;const g=G();if(!g)return r;
 if(!g._b9){g._b9=1;if(S.age<=1&&LS.get('murim_svbst',0)){g.bst={pro:0}}}
 const b=g.bst;
 setTimeout(()=>{try{if(!on()||!free())return;
  if(b&&b.pro===0&&!b.sp){b.pro=1;pro(0);return}
  if(b&&b.pro===9&&bYear())return;
  if(g.aw===1&&g.lv>=25&&S.age>=16){const a=g.o9;if(!a&&Math.random()<.08){oStep();return}if(a&&a.c<3&&S.age-a.y>=(a.c===1?2:3)){oStep();return}}}catch(e){console.error('b91y',e)}},900)}catch(e){console.error('b91',e)}return r}}
// เริ่มชีวิตในทวีปตอนอายุ 0 ด้วยบทนำแสนปีทันที (ไม่ต้องรอปีแรกผ่าน)
setInterval(()=>{try{if(!on()||!free())return;const g=G();if(!g||g._b9)return;g._b9=1;if(S.age<=1&&LS.get('murim_svbst',0)){g.bst={pro:1};pro(0)}}catch(e){}},1200);
window._b91={TF,BST,ENDS,rec,oStep,pro,bYear};
})()}catch(e){console.error('block91',e)}
__done=1;SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};SL.impl.endGame=endGame;endGame=function(){return globalThis.endGame.apply(this,arguments)};SL.impl.doRoll=doRoll;doRoll=function(){return globalThis.doRoll.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul17 (เดิมอยู่ app.js บรรทัด 44103) · ห่อ: passYear, duel, chStart, openSoul ----
(function(){const SL=globalThis.__wSlots['soul17'];let passYear=SL.base.passYear;let duel=SL.base.duel;let chStart=SL.base.chStart;let openSoul=SL.base.openSoul;const __G={passYear:()=>passYear,duel:()=>duel,chStart:()=>chStart,openSoul:()=>openSoul},__S={passYear:v=>{passYear=v},duel:v=>{duel=v},chStart:v=>{chStart=v},openSoul:v=>{openSoul=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34,T40=window._blk40;if(!B||typeof EVENTS==='undefined')return;
const {SP,BEAST,TIER,spNow}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const A1=s=>!!(s&&s.alive&&s.ch==='soul'&&s.sv&&s.sv.aw===1&&!s.sv.retired);
const O=(t,s,f)=>({t,s,f});
const ev=(w,c,f)=>EVENTS.push({w,cd:0,once:0,c:s=>{try{return!!c(s)}catch(e){return false}},f(){try{f()}catch(e){console.error('b121 ev',e)}}});
const G=()=>{const g=S.sv;if(g.bond==null)g.bond=50;g.eco=g.eco||{k:{},ld:{},cub:[],cy:-9};g.cb=g.cb||[];return g};
const main=()=>{const g=S.sv;return g&&g.sp&&g.sp.length?spNow(g.sp[0]):null};
const nm=()=>{const p=main();return p?p.n:'ดวงจิต'};const ic=()=>{const p=main();return p?p.ic:'⭕'};
const ty=()=>{const p=main();return p?p.t:'atk'};

// ---------- 1) ดวงจิตมีเสียงของตัวเอง ----------
// เสียงประจำปี แยกตามสาย × ใจของดวงจิต (สนิท / เฉยๆ / ห่างเหิน)
const VO={
 atk:[['"วันนี้ไม่มีใครให้ตีเลยเหรอ… น่าเบื่อจัง"','"เจ้าเหวี่ยงแขนช้าลงนะ ข้ารู้สึกได้"','"ตัวที่แล้วเกือบได้แล้ว ปีนี้ต้องเอาให้ได้"'],['"ข้าจะเป็นคมให้เจ้า ตราบที่เจ้ายังไม่หันหลังหนี"','"ศัตรูของเจ้า คือศัตรูของข้า"'],['"…"','"เจ้าเรียกข้าออกมาแค่ตอนจะใช้งานนะ รู้ตัวไหม"']],
 def:[['"หลังคาบ้านรั่วนะ ซ่อมก่อนหน้าฝน"','"คืนนี้ข้าเฝ้าเอง นอนเถอะ"','"แผลเก่าที่ไหล่ยังไม่หายดี อย่าเพิ่งฝืน"'],['"ตราบใดที่ข้ายังอยู่ จะไม่มีอะไรแตะเจ้าได้"','"ข้าจำทุกแผลที่ข้ากันไว้ให้เจ้าได้"'],['"ข้ากันได้ แต่ข้าเหนื่อยนะ"','"เจ้าไม่เคยถามเลยว่าข้าเจ็บไหม"']],
 sup:[['"กินข้าวหรือยัง"','"ดอกไม้ริมทางบานแล้ว ไปดูกันไหม"','"เด็กบ้านข้างๆ ไอทั้งคืน…"'],['"ข้าจะรักษาทุกแผลของเจ้า แม้แต่แผลที่มองไม่เห็น"','"เจ้าเปลี่ยนไปเยอะนะ ในทางที่ดี"'],['"ข้ารักษาตัวเจ้าได้ แต่ใจเจ้าข้ารักษาไม่ได้"','"เจ้าเก็บข้าไว้ใช้ตอนจะตายเท่านั้นสินะ"']],
 ctrl:[['"คนที่ยิ้มให้เจ้าเมื่อวาน ข้าไม่ไว้ใจ"','"ข้ารู้ว่าพ่อค้าคนนั้นซ่อนอะไรไว้ใต้เคาน์เตอร์"','"เดินอ้อมทางนั้นไป ข้าเห็นรอยเท้าแปลกๆ"'],['"ทั้งกระดานนี้ ข้าจะจัดให้เจ้าชนะ"','"เจ้าเป็นคนเดียวที่ข้าไม่เคยคิดจะหลอก"'],['"เจ้าคิดว่าข้าจะทำตามไปตลอดเหรอ"','"วันหนึ่งข้าอาจหาเจ้าของที่ฉลาดกว่านี้"']],
 agi:[['"เบื่อ! ไปไหนกันสักที่สิ"','"ลมวันนี้ดีนะ วิ่งแข่งกันไหม"','"เมื่อคืนข้าแอบไปดูทะเลมา"'],['"ไม่ว่าเจ้าจะวิ่งไปไหน ข้าจะไปถึงก่อนรอเจ้า"','"ข้าเร็วขึ้นเพราะอยากตามเจ้าให้ทัน"'],['"ข้าวิ่งหนีได้นะ ถ้าข้าอยาก"','"ทำไมข้าต้องอยู่กับคนที่ไม่เคยพาไปไหน"']]};
// เสียงเฉพาะดวงจิตบางดวง (ใช้แทนเสียงทั่วไปเป็นครั้งคราว)
const SIG={hoe:'"พ่อเจ้าเคยฟาดข้าลงดินวันละพันครั้ง เจ้ายังไม่ถึงครึ่ง"',candle:'"ลมแรงแค่ไหนข้าก็ไม่ดับ เจ้าก็อย่าดับ"',cat:'"เมี้ยว… (มันนอนทับหนังสือที่คุณกำลังอ่าน)"',broom:'"ลานวัดสะอาดแล้ว ใจเจ้ายังไม่สะอาด"',
 shadow:'"เจ้าก้าวช้ากว่าข้าครึ่งจังหวะเสมอ… ใครกันแน่ที่เป็นเงา"',crow:'"ข้าจำหน้าคนที่ทำร้ายเจ้าได้ทุกคน ทุกคน"',needle:'"แม่เจ้าเคยใช้ข้าปะเสื้อตัวนี้ ระวังอย่าให้ขาดอีก"',ladle:'"ข้าวต้มของยายเจ้าอร่อยกว่านี้"',
 mirror:'"เจ้ามองข้าทีไร ข้าก็เห็นตัวเจ้าชัดกว่าที่เจ้าเห็นตัวเอง"',glass:'"เวลาของเจ้าเหลือเท่าไหร่ ข้ารู้ แต่ข้าจะไม่บอก"',void:'"…ข้าไม่ได้หิว ข้าแค่ว่างเปล่า"',moon:'"คืนนี้เพ็ญ อย่าหลับ"',dbone:'"เมื่อก่อนข้าบินอยู่เหนือเมฆ ตอนนี้อยู่ในตัวมนุษย์ตัวเล็กๆ… ก็ดีเหมือนกัน"',wtree:'"รากข้าได้ยินเสียงร้องไห้ใต้ดิน ไกลออกไปทางตะวันออก"',frog:'"เจ้ากระโดดได้ไกลกว่าที่คิด ลองดูสิ"',rope:'"ข้าเคยผูกควายตัวที่เจ้าขี่ตอนห้าขวบ มันชื่อดำ"'};
const SEC={atk:['💥','คมสุดท้ายที่ไม่เคยใช้'],def:['🏯','กำแพงที่ไม่มีวันพัง'],sup:['🌸','ลมหายใจที่สอง'],ctrl:['🕸️','กระดานที่ล้มทั้งกระดาน'],agi:['⚡','ก้าวที่ไม่มีใครเห็น']};
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(on()&&!S.sv.retired&&S.age>=8){const g=G();const id=g.sp[0]&&g.sp[0].id,b=g.bond;
  if(Math.random()<.32){const L=VO[ty()]||VO.atk,set=b>=70?L[1]:b<=25?L[2]:L[0];const line=SIG[id]&&Math.random()<.35?SIG[id]:set[Math.floor(Math.random()*set.length)];
   log(`${ic()} <i>${nm()}:</i> ${line} <span class="tag2">ใจ ${Math.round(b)}</span>`,b>=70?'good':b<=25?'bad':'')}
  if(b>=90&&!g.secK){g.secK=1;const s=SEC[ty()];log(`${s[0]} <b>${nm()}สอนท่าลับให้คุณ「${s[1]}」</b> — ท่าที่มันไม่เคยให้ใครเห็น ใช้ได้ทุกสามปีในยามคับขัน`,'myth',true)}
  if(b<20&&!g.defW){g.defW=1;log(`${ic()} ${nm()}เริ่มไม่ฟังคุณ ใจที่ห่างกันมากเกินไป ทำให้บางครั้งมันไม่ยอมออกแรงในศึก`,'bad',true)}else if(b>=35)g.defW=0}}catch(e){console.error('b121 voice',e)}return r}}
// ในศึก: ใจห่าง = ดวงจิตดื้อ · ใจสนิทสุด = ท่าลับ · ท่าประสานวิญญาณ
{const _d=duel;duel=function(n,ep,cb){try{if(on()&&!S.sv.retired&&isFinite(ep)){const g=G();
  if(g.bond<20&&Math.random()<.3){ep=ep*1.3;log(`${ic()} <b>${nm()}ไม่ยอมออกแรง</b> "เรียกข้าทำไม ตอนอื่นไม่เห็นสน" — ศึกนี้หนักขึ้น`,'bad')}
  else if(g.secK&&g.bond>=90&&S.age-(g.secY==null?-9:g.secY)>=3&&ep>total()*.7){g.secY=S.age;const s=SEC[ty()];ep=ep*.6;log(`${s[0]} <b>${nm()}ปล่อยท่าลับ「${s[1]}」</b> ศัตรูชะงักไปครึ่งลมหายใจ`,'myth')}
  else if(g.cb.length&&Math.random()<.22){const c=g.cb[Math.floor(Math.random()*g.cb.length)];if(c&&partnerOk(c)){ep=ep*.82;c.u=(c.u||0)+1;log(`🔗 <b>ท่าประสาน「${c.n}」</b> — ${esc(c.w)}ส่งพลังเข้ามาพร้อมกับคุณ`,'epic')}}}}catch(e){}return _d.call(this,n,ep,cb)}}

// ---------- 2) ป่าล่าวงแหวนมีความจำ ----------
const lead=n=>'จ่าฝูง'+n.replace(/^(ราชสีห์|พญา)/,'');
{const _w=window._svWin;window._svWin=function(t,b,go){const go2=()=>{try{if(on()){const g=G(),k=b[0];g.eco.k[k]=(g.eco.k[k]||0)+1;if(t>=1&&S.age-g.eco.cy>=2&&Math.random()<.4)g.eco.cubQ={n:k,t,a:S.age}}}catch(e){}return go()};
 return _w?_w.call(this,t,b,go2):go2()}}
{const _hx=window._svHuntX;window._svHuntX=function(g0,i,safe,opts){if(_hx)_hx.apply(this,arguments);try{if(!opts||!S.sv)return;const g=G();
  opts.forEach(o=>{if(!o||!o.t)return;const k=Object.keys(g.eco.k).find(n=>g.eco.k[n]>=3&&o.t.indexOf(n)>=0);if(!k)return;o.s=(o.s?o.s+' · ':'')+`🍂 ${k}แถบนี้เหลือน้อย ต้องเข้าป่าลึก (เจ็บตัวก่อนเจอ)`;const f=o.f;o.f=function(){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.08));log(`🍂 ${k}ที่เคยชุกชุมหายไปจากชายป่า คุณต้องเดินลึกเข้าไปอีกสองวันกว่าจะเจอรอย`,'');return f.apply(this,arguments)}})}catch(e){console.error('b121 hx',e)}}}
// ลูกสัตว์ที่กำพร้า
ev(9,s=>A1(s)&&!!(s.sv.eco&&s.sv.eco.cubQ),()=>{const g=G(),q=g.eco.cubQ;g.eco.cubQ=null;g.eco.cy=S.age;
 choice(`🐾 ลูกของ${q.n}`,`ขากลับจากป่า คุณได้ยินเสียงร้องเล็กๆ ในโพรงไม้ใกล้ที่${q.n}ล้มลง ลูกมันสองตัวตัวสั่น ยังไม่ลืมตาเต็มที่ ไม่มีแม่แล้ว`,[
  O('🌲 พาไปปล่อยในป่าลึก','กรรม + · ป่าจะจำคุณ',()=>{S.karma+=7;g.eco.cub.push({n:q.n,t:q.t,a:S.age});if(g.eco.k[q.n])g.eco.k[q.n]=Math.max(0,g.eco.k[q.n]-1);log(`🌲 คุณเดินเข้าป่าลึกครึ่งวัน วางลูก${q.n}ไว้ใกล้ฝูงอื่น หันกลับมาอีกทีพวกมันหายไปแล้ว`,'good',true)}),
  ...(!g.pet?[O('🏡 เลี้ยงไว้เอง','ได้สัตว์คู่ใจ · ใจของดวงจิต +',()=>{g.pet={n:'ลูก'+q.n,t:Math.max(0,q.t-1),y:0};g.bond=cl(g.bond+5,0,100);log(`🏡 ลูก${q.n}ตัวเล็กนอนขดบนตักคุณ ${nm()}ทำเป็นไม่สนใจ แต่แอบมองทั้งคืน`,'good',true)})]:[]),
  O('💰 ขายให้ตลาดมืด',`ได้เงินก้อน · กรรม −`,()=>{const m=[150,800,3500,12000][q.t]||150;S.money+=m;S.karma-=8;g.eco.k[q.n]=(g.eco.k[q.n]||0)+1;g.bond=cl(g.bond-6,0,100);log(`💰 พ่อค้าจ่าย ${fmt(m)} ตำลึงโดยไม่ถามอะไร ${nm()}เงียบไปหลายวัน`,'bad',true)})])});
// ลูกที่ปล่อยไป โตแล้วกลับมา
ev(7,s=>A1(s)&&!!(s.sv.eco&&s.sv.eco.cub.some(c=>!c.back&&s.age-c.a>=6)),()=>{const g=G(),c=g.eco.cub.find(x=>!x.back&&S.age-x.a>=6);c.back=1;
 const rs=(g.rings||[]).filter(r=>r.y!=null&&!r.cr).sort((a,b)=>(a.y||0)-(b.y||0)),r=rs[0];
 choice(`🌲 ${c.n}ตัวเต็มวัยยืนขวางทาง`,`${c.n}ตัวใหญ่ยืนนิ่งกลางทางเดินป่า มันไม่คำราม ไม่ถอย แค่จ้องคุณ แผลเป็นเล็กๆ ที่หูทำให้คุณจำได้ — ลูกตัวที่คุณเคยพามาปล่อยเมื่อ ${S.age-c.a} ปีก่อน`,[
  O('🤲 ยื่นมือออกไป','ให้มันตัดสินใจเอง',()=>{S.karma+=5;S.fame+=20*(c.t+1);if(r){const y0=r.y;r.y=Math.round(r.y*2.2+3e2*(c.t+1));log(`✨ ${c.n}ก้มหัวแตะฝ่ามือคุณ พลังป่าไหลเข้าวงแหวน<b>${esc(r.b||'')}</b> วงแหวนแก่ขึ้นจาก ${fmt(Math.round(y0))} เป็น <b>${fmt(r.y)} ปี</b> (จะเปลี่ยนสีเมื่อถึงเกณฑ์)`,'myth',true)}else{S.power+=pctPow(.04);log(`✨ ${c.n}ก้มหัวแตะฝ่ามือคุณ แล้วหันหลังกลับเข้าป่า คุณรู้สึกถึงพลังอุ่นๆ ที่ฝ่ามือ`,'myth',true)}
   try{const L=LS.get('murim_svcub',0)||0;LS.set('murim_svcub',L+1)}catch(e){}}),
  O('🙇 ก้มหัวให้แล้วถอยไป','กรรม +',()=>{S.karma+=3;log(`🙇 คุณก้มหัวแล้วถอยไปทางอื่น ${c.n}มองตามจนลับตา`,'good')})])});
// จ่าฝูงตามล่ากลับ
ev(8,s=>{if(!A1(s)||s.age<12)return false;const e=s.sv.eco;return!!(e&&Object.keys(e.k).some(n=>e.k[n]>=3&&!e.ld[n]))},()=>{const g=G(),n=Object.keys(g.eco.k).find(x=>g.eco.k[x]>=3&&!g.eco.ld[x]),cnt=g.eco.k[n];g.eco.ld[n]=1;
 const t0=Math.max(0,BEAST.findIndex(L=>L.some(b=>b[0]===n))),L=lead(n),ep=Math.round(total()*(.9+.12*cnt+t0*.08));
 const win=w=>{if(w){g.eco.ld[n]=2;S.fame+=40*(t0+1)*cnt;S.power+=pctPow(.03*(t0+1));log(`🏹 <b>${L}ล้มลง</b> หลังศึกยาวจนพระจันทร์เคลื่อนไปครึ่งฟ้า ทั้งแคว้นพูดถึงคนที่ล้มจ่าฝูงได้ด้วยตัวคนเดียว`,'myth',true)}
  else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.35));g.bond=cl(g.bond-4,0,100);log(`🩸 ${L}ฝากรอยเขี้ยวไว้ที่ไหล่คุณ แล้วหายกลับเข้าความมืด มันจะจำคุณไปจนตาย`,'bad',true)}};
 choice(`🐺 ${L}ตามรอยคุณมา`,`คุณล่า${n}ไปแล้ว ${cnt} ตัว คืนนี้มีบางอย่างเดินวนรอบที่พักอยู่สามรอบ ตัวใหญ่กว่า${n}ที่เคยเห็นเกือบเท่าตัว ตามันสะท้อนแสงไฟ — <b>${L}</b>`,[
  O('⚔️ ออกไปเผชิญหน้า',`ศึกหนัก · ชนะ = ชื่อเสียงมาก`,()=>duel(L,ep,win)),
  O('🔥 จุดไฟล้อมที่พักทั้งคืน','ไม่สู้ · เสียเวลาฝึก',()=>{g.lv=Math.max(1,g.lv-1);g.eco.ld[n]=3;log(`🔥 คุณนั่งเฝ้ากองไฟจนเช้า ${L}หายไปตอนฟ้าสาง ทิ้งรอยเท้าลึกไว้รอบที่พัก`,'')}),
  O(`🕊️ ปล่อยวง ย้ายไปล่าที่อื่น`,`${n}ในป่าจะกลับมา · กรรม +`,()=>{g.eco.k[n]=0;S.karma+=4;g.eco.ld[n]=0;log(`🕊️ คุณย้ายที่พักไปอีกฝั่งเขา ตั้งใจว่าจะไม่ล่า${n}อีกสักพัก`,'good')})])});

// ---------- 3) ท่าประสานวิญญาณ (กับคู่ชีวิต / เพื่อนในทีม) ----------
const W1={atk:['คม','ค้อน','เขี้ยว','หอก'],def:['ภูผา','กำแพง','กระดอง','โล่'],sup:['บัว','น้ำค้าง','รากไม้','แสงเทียน'],ctrl:['ตาข่าย','วังวน','โซ่','หมอก'],agi:['ลม','เงา','สายฟ้า','ปีก']};
const W2={atk:['ผ่าฟ้า','ทะลวงใจ','สังหาร','ล้างแผ่นดิน'],def:['ค้ำโลก','พันชั้น','ไม่แตก','คุ้มภัย'],sup:['คืนชีพ','ชำระแผล','ฟื้นป่า','อุ่นใจ'],ctrl:['ตรึงวิญญาณ','กลืนแสง','ล่ามมังกร','หยุดกาล'],agi:['พันเงา','ไร้รอย','ข้ามฟ้า','ทะยานลม']};
const tyOfSp=n=>{const x=SP.find(p=>p[2]===n||(p[6]&&p[6][1]===n));return x?x[3]:'atk'};
function partners(){const L=[];try{if(S.spouse&&S.spouse.n){if(!S.spouse.svp){const p=SP[Math.floor(Math.random()*SP.length)];S.spouse.svp=p[2];S.spouse.svi=p[1]}L.push({k:'sp',w:'คู่ชีวิต '+S.spouse.n,sp:S.spouse.svp,ic:S.spouse.svi||'💞'})}}catch(e){}
 try{if(T40)T40.alive().filter(m=>m.bd>=55).forEach(m=>L.push({k:'m:'+m.n,w:m.n,sp:m.sp,ic:m.ic,real:m.real}))}catch(e){}return L}
function partnerOk(c){return partners().some(p=>p.k===c.k)}
function comboName(a,b){const t1=tyOfSp(a),t2=tyOfSp(b),h=[...(a+b)].reduce((x,y)=>x+y.charCodeAt(0),0);return W1[t1][h%4]+W2[t2][(h>>2)%4]}
ev(6,s=>{if(!A1(s)||s.age<14||s.sv.lv<20)return false;const g=s.sv;if(s.age-(g.cbY==null?-9:g.cbY)<5)return false;return partners().some(p=>!(g.cb||[]).some(c=>c.k===p.k))},()=>{const g=G();g.cbY=S.age;
 const P=partners().filter(p=>!g.cb.some(c=>c.k===p.k)),p=P[Math.floor(Math.random()*P.length)],my=nm(),n=comboName(my,p.sp),pr=cl(.45+g.bond/300+(p.k==='sp'?.08:0),.3,.85);
 choice(`🔗 ${p.ic} ${esc(p.w)} อยากลองประสานดวงจิต`,`ระหว่างฝึกด้วยกัน ${esc(p.w)} (${esc(p.sp)}) สังเกตว่าพลังของ${my}กับของเขาสั่นจังหวะเดียวกัน ถ้าปล่อยออกพร้อมกันได้ อาจเกิดท่าที่ไม่มีในตำรา<br><span class="tag2">สำเร็จราว ${Math.round(pr*100)}% · ท่าประสานลดพลังศัตรูในศึก (เมื่อคนคู่ยังอยู่ข้างคุณ)</span>`,[
  O('🔥 ฝึกจนกว่าจะได้','เจ็บตัว · ได้ท่าใหม่ถ้าสำเร็จ',()=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.1));if(Math.random()<pr){g.cb.push({k:p.k,w:p.w,a:my,b:p.sp,n,y:S.age,u:0});
    try{const C=LS.get('murim_svcombo',{})||{};if(!C[n])C[n]={a:my,b:p.sp,w:p.k==='sp'?'คู่ชีวิต':p.real?'ผู้เล่นจริง':'เพื่อนร่วมทีม',t:Date.now()};LS.set('murim_svcombo',C)}catch(e){}
    S.fame+=30;log(`🔗 <b>ท่าประสานวิญญาณ「${n}」</b> — ${my} × ${esc(p.sp)} พลังสองสายบิดเป็นเกลียวเดียว ต้นไม้หลังสนามฝึกล้มไปสามต้น <span class="tag2">บันทึกลงตำราท่าประสานแล้ว</span>`,'myth',true)}
   else log(`💫 พลังสองสายชนกันกลางอากาศแล้วแตกกระจาย ทั้งคู่ล้มลงหัวเราะ ไว้ลองใหม่ในอีกไม่กี่ปี`,'')}),
  O('🙅 ไว้ก่อน','',()=>{g.cbY=S.age-2})])});
window.openSvCombo=function(){const C=LS.get('murim_svcombo',{})||{},K=Object.keys(C),g=S&&S.sv,mine=(g&&g.cb)||[];
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🔗 ตำราท่าประสานวิญญาณ</h3><p class="tag2">ท่าที่เกิดจากดวงจิตสองดวงปล่อยพลังพร้อมกัน ทุกคู่ได้ท่าไม่ซ้ำกัน ค้นพบแล้ว ${K.length} ท่า</p>
 ${mine.length?`<h4>ชีวิตนี้</h4>${mine.map(c=>`<div class="item"><b>🔗 ${esc(c.n)}</b> <span class="tag2">${esc(c.a)} × ${esc(c.b)} · กับ${esc(c.w)} · ใช้ในศึก ${c.u||0} ครั้ง${partnerOk(c)?'':' · ⚠️ คู่ไม่อยู่แล้ว ใช้ไม่ได้'}</span></div>`).join('')}`:''}
 <h4>ทุกชีวิต</h4>${K.length?K.map(n=>`<div class="item">🔗 <b>${esc(n)}</b> <span class="tag2">${esc(C[n].a)} × ${esc(C[n].b)} · ${esc(C[n].w)}</span></div>`).join(''):'<p class="tag2">ยังไม่มี — มีคู่ชีวิต หรือเพื่อนในทีมที่ผูกพันสูง แล้วระดับจิต 20 ขึ้นไป จะมีโอกาสได้ลอง</p>'}`,'svcombo')};

// ---------- 4) เพื่อนร่วมทีมจากทำเนียบผู้เล่นจริง ----------
let RP=null;const RPK='murim_svreal';
function realLoad(){try{const c=LS.get(RPK,null);if(c&&Date.now()-c.t<3*3600e3){RP=c.l;return Promise.resolve(RP)}}catch(e){}
 return api('board',{p:'w',cm:'l'}).then(j=>{const me=(()=>{try{return pname()}catch(e){return''}})();const L=[].concat(j&&j.ctop||[],j&&j.cprev||[]).filter(x=>x&&x.n&&x.n!==me).slice(0,30).map(x=>({n:String(x.n).replace(/[<>]/g,'').slice(0,20),lv:+x.sl||0,sr:x.sr==null?-1:+x.sr,a:+x.age||0}));
  RP=L;try{LS.set(RPK,{t:Date.now(),l:L})}catch(e){}return L}).catch(()=>RP||[])}
setTimeout(()=>{try{if(S&&S.ch==='soul')realLoad()}catch(e){}},5000);
{const _cs=chStart;chStart=function(){const r=_cs.apply(this,arguments);try{if(S&&S.ch==='soul')setTimeout(()=>{realLoad()},2500)}catch(e){}return r}}
const used=()=>{const t=T40&&T40.T();return new Set(((t&&t.m)||[]).filter(m=>m.real).map(m=>m.n))};
ev(5,s=>{if(!A1(s)||!T40||s.age<12||s.sv.lv<10||!RP||!RP.length)return false;const t=T40.T(),al=T40.alive();return al.length<6&&!al.some(m=>m.real)&&s.age-(s.sv.rpY==null?-9:s.sv.rpY)>=6},()=>{const g=G();g.rpY=S.age;const u=used(),L=RP.filter(x=>!u.has(x.n));if(!L.length)return;
 const x=L[Math.floor(Math.random()*Math.min(L.length,12))],m=T40.mkMember();m.n=x.n;m.real=1;m.bd=cl(m.bd+10,0,100);m.q=`ดวงวิญญาณจากทำเนียบทวีป — ชีวิตจริงของผู้เล่นคนหนึ่งที่เคยไปถึงระดับจิต ${x.lv||'?'}${x.sr>=0?` วงแหวนสูงสุด${TIER[Math.min(TIER.length-1,x.sr)][0]}`:''}`;
 if(x.sr>=0)m.ic=TIER[Math.min(TIER.length-1,x.sr)][1];const t=T40.T();
 choice(`🌐 ${m.ic} เงาของ ${esc(m.n)} จากทำเนียบ`,`ที่ศาลจารึกนามกลางเมือง หินสลักชื่อ <b>${esc(m.n)}</b> เรืองแสงขึ้นตอนคุณเดินผ่าน เงาของผู้ฝึกจิตคนนั้นก้าวออกมา ${esc(m.q)}<br>"ทวีปนี้ยังมีเรื่องที่ข้าค้างไว้ ให้ข้าเดินไปกับเจ้าสักช่วงได้ไหม"<br><span class="tag2">ชื่อนี้มาจากผู้เล่นจริงในทำเนียบทวีปจิตวิญญาณยุทธ์</span>`,[
  O('🤝 รับเข้าทีม',`ถือ ${esc(m.sp)} · ช่วยล่า/ประลอง/ประสานท่าได้`,()=>{t.m.push(m);log(`🌐 <b>${esc(m.n)}</b> (ผู้เล่นจริงจากทำเนียบ) เข้าร่วมทีม ${m.ic} ${esc(m.sp)}`,'epic',true)}),
  O('🙏 คารวะแล้วเดินต่อ','',()=>{S.karma+=1;log(`🙏 คุณคารวะหินสลักชื่อ${esc(m.n)} เงานั้นพยักหน้าแล้วจางหายไป`)})])});
// ล่าวงแหวนกับผู้เล่นจริงจากทำเนียบ (แม้ไม่มีในทีม)
{const _hx=window._svHuntX;window._svHuntX=function(g0,i,safe,opts){if(_hx)_hx.apply(this,arguments);try{if(!opts||!RP||!RP.length||S.age<10)return;const g=G();if(S.age-(g.rhY==null?-9:g.rhY)<3)return;
  const x=RP[Math.floor(Math.random()*Math.min(RP.length,15))],t=Math.min(3,safe),b=BEAST[t][Math.floor(Math.random()*BEAST[t].length)];
  opts.splice(Math.max(0,opts.length-1),0,O(`🌐 ชวนเงาของ ${x.n} (ทำเนียบ) ล่า${b[0]}`,`ผู้เล่นจริง ระดับจิต ${x.lv||'?'} · ศัตรูอ่อนลงมาก · เขาขอส่วนแบ่งชื่อเสียง`,()=>{g.rhY=S.age;const ep=Math.max(5,Math.round(total()*[.35,.65,.95,1.25][t]*.7));
   log(`🌐 เงาของ<b>${esc(x.n)}</b>จากทำเนียบเดินนำเข้าป่า เขารู้ทางเหมือนเคยมาที่นี่มาแล้วหลายชาติ`,'epic');
   duel(b[0],ep,w=>{if(w){S.fame=Math.max(0,S.fame-10);const go=()=>B.absorb(t,b);if(window._svWin)window._svWin(t,b,go);else go()}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.12));log(`🩸 ${b[0]}หนีไปได้ เงาของ${esc(x.n)}ส่ายหน้าแล้วจางหายไป`,'bad')}})}))}catch(e){console.error('b121 rh',e)}}}
// ปุ่มในหน้าดวงจิต
{const _os=window.openSoul;const put=()=>{try{if(S&&S.ch==='soul'&&S.sv){const m=$('modal'),g=G();if(m&&m.querySelector('.gbtn')&&!m.querySelector('.sv121')){const e=g.eco,hk=Object.keys(e.k).filter(n=>e.k[n]>0);
  const h=`<div class="item sv121"><b>${ic()} ใจของ${esc(nm())} ${Math.round(g.bond)}/100</b> <span class="tag2">${g.bond>=90?'สนิทที่สุด · '+(g.secK?'สอนท่าลับแล้ว':'ใกล้สอนท่าลับ'):g.bond<20?'ห่างเหิน · อาจไม่ยอมออกแรงในศึก':g.bond>=70?'สนิทกัน':'ปกติ'}</span>
  ${hk.length?`<br><span class="tag2">🌲 ป่าจำคุณได้: ${hk.map(n=>`${esc(n)} ×${e.k[n]}${e.ld[n]===2?' (ล้มจ่าฝูงแล้ว)':e.k[n]>=3?' ⚠️':''}`).join(' · ')}${e.cub.length?` · ปล่อยลูกสัตว์ ${e.cub.length} ตัว`:''}</span>`:''}</div>
  <button class="gbtn" style="width:100%;margin-top:6px" onclick="openSvCombo()">🔗 ตำราท่าประสานวิญญาณ${g.cb.length?` (${g.cb.length})`:''}</button>`;
  const b=m.querySelector('.gbtn');if(b)b.insertAdjacentHTML('beforebegin',h);else m.insertAdjacentHTML('beforeend',h)}}}catch(e){console.error('b121 os',e)}};
 window.openSoul=function(){const r=_os.apply(this,arguments);put();setTimeout(put,300);setTimeout(put,1200);try{if(r&&r.then)r.then(()=>setTimeout(put,30))}catch(e){}return r}}
window._b121={partners,comboName,realLoad,G,getRP:()=>RP};
})()}catch(e){console.error('block121',e)}
__done=1;SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.duel=duel;duel=function(){return globalThis.duel.apply(this,arguments)};SL.impl.chStart=chStart;chStart=function(){return globalThis.chStart.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};})();

// ---- ท่อน soul18 (เดิมอยู่ app.js บรรทัด 44669) · ห่อ: duel, fight, passYear ----
(function(){const SL=globalThis.__wSlots['soul18'];let duel=SL.base.duel;let fight=SL.base.fight;let passYear=SL.base.passYear;
try{(()=>{
const B=window._blk34;if(!B||!B.SP)return;const SP=B.SP,spNow=B.spNow;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU);
const hpPct=()=>S.maxHp?S.hp/S.maxHp:1;
const Q={}; // id → {m:()=>ตัวคูณตอนดวล, yr:G=>ข้อความ|undefined, f:ตระกูล}
const add=(id,ic,n,t,d,r,q)=>{if(SP.some(x=>x[0]===id))return;SP.push([id,ic,n,t,d+(q.tx?' · ⚙️ '+q.tx:''),r,null]);Q[id]=q};
const wxR=()=>{try{return wxNow()}catch(e){return'clear'}};
const lvl=()=>S.sv.lv||1;
// ---------- ธรรมดา 40 ตัว: นิสัยเล็กๆ ----------
// A ฝน/อากาศ
add('q_umb','☂️','ร่มกระดาษ','def','ร่มกระดาษน้ำมันที่ยายใช้ไปตลาด',0,{m:()=>wxR()==='rain'?1.2:1,tx:'ปีที่ฝนตก ดวลแรงขึ้น 20%'});
add('q_snail','🐌','หอยทาก','def','หอยทากที่เกาะกำแพงบ้านหลังฝนตก',0,{m:()=>wxR()==='rain'?1.25:.95,tx:'ฝนตกแรงขึ้น 25% · ฟ้าโปร่งช้าลงนิด'});
add('q_puddle','💧','แอ่งน้ำ','ctrl','แอ่งน้ำหน้าบ้านที่สะท้อนฟ้า',0,{m:()=>wxR()==='rain'?1.2:1,tx:'ปีที่ฝนตก ดวลแรงขึ้น 20%'});
add('q_mud','🟤','โคลนท้องนา','ctrl','โคลนที่ติดเท้าทุกฤดูไถนา',0,{m:()=>wxR()==='rain'?1.15:1,yr:()=>{if(wxR()==='rain'){S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.05))}},tx:'ฝนตก ดวลแรงขึ้น 15% และฟื้นพลังชีวิตเล็กน้อย'});
add('q_coat','🧥','เสื้อกันฝนฟาง','def','เสื้อฟางของชาวนา กันได้ทั้งฝนและหิมะ',0,{m:()=>/rain|snow/.test(wxR())?1.18:1,tx:'ฝนหรือหิมะ ดวลแรงขึ้น 18%'});
// B ยามจน
const poor=()=>(S.money||0)<120;
add('q_bowl','🥣','ชามบิ่น','sup','ชามข้าวบิ่นที่ใช้มาตั้งแต่เด็ก',0,{m:()=>poor()?1.2:1,tx:'ตอนเงินน้อยกว่า 120 ดวลแรงขึ้น 20%'});
add('q_sandal','🩴','รองเท้าแตะขาด','agi','รองเท้าแตะคู่เดียวที่มี หูหลุดไปข้างหนึ่ง',0,{m:()=>poor()?1.22:1,tx:'ตอนจน ดวลแรงขึ้น 22%'});
add('q_sack','👝','กระสอบป่าน','def','กระสอบข้าวเปล่าที่ใช้ห่มนอน',0,{m:()=>poor()?1.25:.97,tx:'ตอนจน ดวลแรงขึ้น 25% · รวยแล้วอ่อนลงนิด'});
add('q_rat','🐀','หนูท่อ','agi','หนูท่อที่รอดมาได้ทุกหน้าหนาว',0,{m:()=>poor()?1.2:1,yr:()=>{if(poor())S.money=(S.money||0)+R(5,20)},tx:'ตอนจน ดวลแรงขึ้น 20% และคุ้ยหาเศษเงินได้ทุกปี'});
add('q_rag','🧣','ผ้าขี้ริ้ว','ctrl','ผ้าขี้ริ้วที่แม่ใช้เช็ดโต๊ะ',0,{m:()=>poor()?1.18:1,tx:'ตอนจน ดวลแรงขึ้น 18%'});
// C ชนะติด
const stk=()=>S.sv.qs||0;
add('q_cock','🐓','ไก่ชน','atk','ไก่ชนหงอนแดงของลุงข้างบ้าน',0,{m:()=>1+Math.min(.2,stk()*.04),tx:'ชนะดวลติดกันยิ่งแรง (สูงสุด +20%) แพ้แล้วนับใหม่'});
add('q_ant','🐜','มดแดง','atk','มดแดงที่กัดเจ็บจนน้ำตาไหล',0,{m:()=>1+Math.min(.15,stk()*.05),tx:'ชนะติดกันยิ่งแรง (สูงสุด +15%)'});
add('q_sling','🎯','หนังสติ๊ก','atk','หนังสติ๊กง่ามไม้ฝรั่ง',0,{m:()=>1+Math.min(.18,stk()*.03),tx:'ชนะติดกันยิ่งแรง (สูงสุด +18%)'});
add('q_goat','🐐','แพะดื้อ','atk','แพะที่ไม่เคยยอมใครแม้แต่เจ้าของ',0,{m:()=>1+Math.min(.25,stk()*.05)-(S.sv.ql?.08:0),tx:'ชนะติดกันแรงขึ้นถึง 25% · แต่ดวลหลังแพ้อ่อนลง'});
add('q_wasp','🐝','ต่อหัวเสือ','atk','รังต่อใต้ชายคาที่ไม่มีใครกล้าแตะ',0,{m:()=>1+Math.min(.2,stk()*.04),tx:'ชนะติดกันยิ่งแรง (สูงสุด +20%)'});
// D บาดเจ็บ
add('q_cactus','🌵','กระบองเพชร','def','กระบองเพชรในกระถางแตกบนหน้าต่าง',0,{m:()=>hpPct()<.4?1.3:1,tx:'พลังชีวิตต่ำกว่า 40% ดวลแรงขึ้น 30%'});
add('q_crab','🦀','ปูนา','def','ปูนาที่หนีบนิ้วไม่ยอมปล่อย',0,{m:()=>hpPct()<.4?1.28:1,tx:'บาดเจ็บหนัก ดวลแรงขึ้น 28%'});
add('q_coal','♨️','ถ่านไฟเก่า','atk','ถ่านในเตาที่ไม่ยอมมอด',0,{m:()=>hpPct()<.5?1.25:1,tx:'พลังชีวิตต่ำกว่าครึ่ง ดวลแรงขึ้น 25%'});
add('q_tdog','🐕','หมาวัด','atk','หมาวัดขาเป๋ที่เฝ้าประตูโบสถ์',0,{m:()=>hpPct()<.4?1.35:1,tx:'บาดเจ็บหนัก ดวลแรงขึ้น 35%'});
add('q_hedge','🦔','เม่น','def','เม่นที่ม้วนตัวกลมเมื่อถูกแหย่',0,{m:()=>hpPct()<.4?1.3:1,tx:'บาดเจ็บหนัก ดวลแรงขึ้น 30%'});
// E วัย
add('q_kite','🪁','ว่าวจุฬา','agi','ว่าวที่ทำเองกับพ่อตอนหน้าลม',0,{m:()=>S.age<20?1.2:1,tx:'อายุต่ำกว่า 20 ดวลแรงขึ้น 20%'});
add('q_marble','🔵','ลูกแก้ว','ctrl','ลูกแก้วสีฟ้าที่ชนะมาจากเพื่อน',0,{m:()=>S.age<20?1.18:1,tx:'อายุต่ำกว่า 20 ดวลแรงขึ้น 18%'});
add('q_top','🪀','ลูกข่าง','agi','ลูกข่างไม้ที่หมุนได้นานที่สุดในซอย',0,{m:()=>S.age<25?1.15:1,tx:'อายุต่ำกว่า 25 ดวลแรงขึ้น 15%'});
add('q_cane','🦯','ไม้เท้าไผ่','def','ไม้เท้าของปู่ที่ยังวางอยู่ข้างประตู',0,{m:()=>S.age>=55?1.25:.97,tx:'อายุ 55 ขึ้นไป ดวลแรงขึ้น 25%'});
add('q_teapot','🫖','กาน้ำชาเก่า','sup','กาน้ำชาดินเผาคราบชาหนาเป็นนิ้ว',0,{m:()=>S.age>=55?1.2:1,yr:()=>{if(S.age>=40)S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.04))},tx:'อายุ 55 ขึ้นไป ดวลแรงขึ้น 20% · หลัง 40 ฟื้นตัวทุกปี'});
// F ฟื้นฟู
const hl=p=>{S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*p))};
add('q_mortar','🥢','ครกบดยา','sup','ครกหินที่หมอยาประจำหมู่บ้านทิ้งไว้',0,{yr:()=>hl(.1),tx:'ฟื้นพลังชีวิต 10% ทุกปี'});
add('q_leaf','🍃','ใบตองสด','sup','ใบตองที่ใช้ห่อข้าวไปไร่',0,{yr:()=>hl(.08),tx:'ฟื้นพลังชีวิต 8% ทุกปี'});
add('q_salt','🧂','เกลือทะเล','sup','เกลือเม็ดจากนาเกลือริมทะเล',0,{yr:()=>hl(.1),tx:'ฟื้นพลังชีวิต 10% ทุกปี'});
add('q_ginger','🫚','ขิงแก่','sup','ขิงแก่ที่แม่ต้มให้ตอนไม่สบาย',0,{yr:()=>hl(hpPct()<.5?.18:.05),tx:'ฟื้นพลังชีวิตทุกปี ยิ่งบาดเจ็บยิ่งฟื้นมาก'});
add('q_bucket','🪣','ถังตักน้ำบ่อ','sup','ถังสังกะสีบุบที่ใช้ตักน้ำทุกเช้า',0,{yr:()=>{hl(.06);S.maxHp+=1},tx:'ฟื้นพลังชีวิตทุกปี พลังชีวิตสูงสุดค่อยๆ เพิ่ม'});
// G เงิน
add('q_abacus','🧮','ลูกคิด','ctrl','ลูกคิดไม้ของเถ้าแก่ร้านโชห่วย',0,{yr:()=>{S.money=(S.money||0)+R(10,30)+Math.round(lvl()*1.5)},tx:'ได้เงินทุกปี ยิ่งระดับจิตสูงยิ่งได้มาก'});
add('q_scale','⚖️','ตาชั่งตลาด','ctrl','ตาชั่งสปริงที่แม่ค้าไม่เคยโกง',0,{yr:()=>{S.money=(S.money||0)+R(12,28);S.karma=(S.karma||0)+.5},tx:'ได้เงินทุกปี กรรมดีขึ้นทีละนิด'});
add('q_key','🗝️','กุญแจสนิม','ctrl','กุญแจที่ไม่มีใครรู้ว่าไขอะไร',0,{yr:()=>{if(Math.random()<.15){const v=R(60,200);S.money=(S.money||0)+v;return`🗝️ กุญแจสนิมไขหีบเก่าใต้พื้นบ้านร้างได้ เจอ ${v}`}},tx:'บางปีไขหีบสมบัติเจอ'});
add('q_lamp','🏮','โคมกระดาษ','sup','โคมแดงที่แขวนหน้าร้านตอนตรุษ',0,{yr:()=>{S.money=(S.money||0)+R(8,25);S.fame=(S.fame||0)+1},tx:'ได้เงินและชื่อเสียงเล็กน้อยทุกปี'});
add('q_coin','🪙','เหรียญรูจีน','sup','เหรียญทองแดงมีรูตรงกลาง ร้อยเชือกแดงไว้',0,{yr:()=>{S.money=(S.money||0)+Math.round((S.money||0)*.03)+R(5,15)},tx:'เงินงอกเงยทุกปี (3% ของที่มี)'});
// H ผู้คน
add('q_flute','🪈','ขลุ่ยไม้ไผ่','sup','ขลุ่ยที่เป่าได้เพลงเดียว',0,{yr:()=>{S.cha=(S.cha||0)+1},tx:'เสน่ห์ +1 ทุกปี'});
add('q_fan','🪭','พัดกระดาษ','ctrl','พัดกระดาษลายดอกเหมยของย่า',0,{yr:()=>{S.cha=(S.cha||0)+1;S.fame=(S.fame||0)+1},tx:'เสน่ห์และชื่อเสียงขึ้นทุกปี'});
add('q_parrot','🦜','นกแก้วพูดได้','ctrl','นกแก้วที่จำคำด่าของทุกคนในบ้าน',0,{yr:()=>{S.fame=(S.fame||0)+2;if(Math.random()<.1)return'🦜 นกแก้วในดวงจิตพูดประโยคเดียวกับคู่ปรับคุณเมื่อวานเป๊ะ คนทั้งลานหัวเราะ'},tx:'ชื่อเสียง +2 ทุกปี'});
add('q_comb','🪮','หวีไม้','sup','หวีไม้จันทน์ซี่หักไปสองซี่',0,{yr:()=>{S.cha=(S.cha||0)+(S.age<40?1:0)},tx:'ก่อนอายุ 40 เสน่ห์ +1 ทุกปี'});
add('q_dove','🕊️','นกพิราบสื่อสาร','agi','นกพิราบที่บินกลับบ้านถูกทุกครั้ง',0,{yr:()=>{S.fame=(S.fame||0)+1;S.cha=(S.cha||0)+.5},tx:'ชื่อเสียงและเสน่ห์ค่อยๆ ขึ้น'});

// ---------- แปลก 35 ตัว ----------
const G=()=>S.sv;
const fam={debt:'🧾 ตระกูลหนี้',echo:'🪞 ตระกูลเวลาเหลื่อม',luck:'🎲 ตระกูลดวง',know:'👁️ ตระกูลรู้มากเกินไป',life:'🔥 ตระกูลแลกชีวิต',home:'🏠 ตระกูลผูกสถานที่',gone:'🫥 ตระกูลตัวตนหาย'};
// 🧾 หนี้: แรงขึ้นทันที ทุก 5 ปีมีคนมาทวง
const DEBT={
 x_receipt:['🧾','ใบเสร็จค้างจ่าย','ctrl','ใบเสร็จยาวเป็นวา ตัวหนังสือเขียนเองทุกครั้งที่คุณใช้ท่า',1.3,'จ่ายเงิน 40%',()=>{S.money=Math.round((S.money||0)*.6)},'ไม่จ่าย ระดับจิต −6',()=>{G().lv=Math.max(1,G().lv-6)}],
 x_deed:['📜','โฉนดจำนอง','def','โฉนดที่ดินที่ไม่ใช่ของคุณ แต่ชื่อคุณอยู่ท้ายสัญญา',1.28,'จ่ายด้วยร่างกาย (พลังชีวิตสูงสุด −8%)',()=>{S.maxHp=Math.max(30,Math.round(S.maxHp*.92))},'ไม่จ่าย ระดับจิต −8',()=>{G().lv=Math.max(1,G().lv-8)}],
 x_blood:['🩸','สัญญาเลือด','atk','สัญญาที่ลงชื่อด้วยเลือดตั้งแต่ก่อนเกิด',1.4,'จ่ายเลือด (พลังชีวิตสูงสุด −12%)',()=>{S.maxHp=Math.max(30,Math.round(S.maxHp*.88))},'ไม่จ่าย พลังชีวิตเหลือ 1',()=>{S.hp=1}],
 x_match:['🧨','ไม้ขีดยืม','atk','กล่องไม้ขีดที่ยืมใครมาก็จำไม่ได้ เหลือสามก้าน',1.32,'คืนด้วยอายุขัย 3 ปี',()=>{S.lifespan=(S.lifespan||60)-3},'ไม่คืน อ่อนลง 5 ปี',()=>{G().qw=S.age+5}],
 x_pawn:['🏦','ตั๋วโรงจำนำ','sup','ตั๋วจำนำที่ไม่ได้บอกว่าจำนำอะไรไว้',1.25,'ไถ่คืนด้วยเงิน 60%',()=>{S.money=Math.round((S.money||0)*.4)},'ไม่ไถ่ ชื่อเสียงหายครึ่ง',()=>{S.fame=Math.round((S.fame||0)*.5)}]};
Object.entries(DEBT).forEach(([id,d])=>add(id,d[0],d[1],d[2],d[3],1,{f:'debt',m:()=>d[4]*(G().qw&&S.age<G().qw?.75:1),tx:`${fam.debt} · ดวลแรงขึ้น ${Math.round((d[4]-1)*100)}% · ทุก 5 ปีมีคนมาทวงหนี้`,yr:g=>{g.qd=(g.qd||0)+1;if(g.qd>=5){g.qd=0;g.qdue=id}}}));
// 🪞 เวลาเหลื่อม: ผลของปีก่อนย้อนกลับมาซ้ำ
const ECHO={
 x_shade:['👥','เงาช้าครึ่งจังหวะ','agi','เงาที่ขยับตามคุณช้ากว่าครึ่งจังหวะเสมอ','ปีก่อนได้พลังเท่าไหร่ ปีนี้ได้ซ้ำอีกครึ่ง · ปีก่อนเจ็บเท่าไหร่ ปีนี้เจ็บซ้ำครึ่งหนึ่ง',(p,c)=>{if(p.dp>0)S.power+=Math.round(p.dp*.5);if(p.dh<0)S.hp=Math.max(1,S.hp+Math.round(p.dh*.5));if(p.dp>0)return`👥 เงาทำซ้ำการฝึกเมื่อปีก่อน พลัง +${fmt(Math.round(p.dp*.5))}`}],
 x_echo:['🗣️','เสียงสะท้อนในถ้ำ','ctrl','เสียงที่ตะโกนออกไปเมื่อปีก่อนเพิ่งย้อนกลับมา','ชื่อเสียงที่ได้ปีก่อน ปีนี้ได้ซ้ำอีกรอบ (ชื่อเสียหายก็ซ้ำ)',(p)=>{if(p.df)S.fame=Math.max(0,(S.fame||0)+p.df);if(Math.abs(p.df)>=20)return`🗣️ เรื่องของคุณเมื่อปีก่อนสะท้อนกลับมาให้คนพูดถึงอีกรอบ (ชื่อเสียง ${p.df>0?'+':''}${Math.round(p.df)})`}],
 x_rclock:['🕰️','นาฬิกาเดินถอยหลัง','sup','นาฬิกาพกที่เข็มหมุนทวนเสมอ','แผลของปีก่อนหายเป็นปลิดทิ้ง แต่พลังที่ได้ปีก่อนถูกดึงคืน 15%',(p)=>{if(p.dh<0)S.hp=Math.min(S.maxHp,S.hp-p.dh);if(p.dp>0)S.power=Math.max(1,S.power-Math.round(p.dp*.15))}],
 x_scar:['🩹','แผลเป็นที่ไม่หาย','def','แผลที่หายแล้วแต่กลับมาเจ็บทุกปี','ความเจ็บของปีก่อนย้อนมาครึ่งหนึ่ง แต่ร่างกายหนาขึ้น (พลังชีวิตสูงสุดเพิ่มตามแผล)',(p)=>{if(p.dh<0){S.hp=Math.max(1,S.hp+Math.round(p.dh*.5));S.maxHp+=Math.round(-p.dh*.2)}}],
 x_letter:['✉️','จดหมายที่ส่งช้า','sup','จดหมายที่เขียนถึงตัวเองเมื่อปีก่อนเพิ่งมาถึง','เงินที่ได้ปีก่อน ปีนี้ได้ซ้ำอีก 60%',(p)=>{if(p.dm>0){const v=Math.round(p.dm*.6);S.money=(S.money||0)+v;if(v>=50)return`✉️ จดหมายจากตัวเองเมื่อปีก่อนมาถึง ข้างในมีเงิน ${fmt(v)}`}}]};
Object.entries(ECHO).forEach(([id,d])=>add(id,d[0],d[1],d[2],d[3],1,{f:'echo',tx:`${fam.echo} · ${d[4]}`,yr:g=>{const p=g.qe;let t;if(p&&p.a===S.age-1)t=d[5](p);return t}}));
// 🎲 ดวง: ผลแกว่งแรงทุกครั้งที่ดวล
const LUCK={
 x_dice:['🎲','ลูกเต๋าหกหน้า','ctrl','ลูกเต๋ากระดูกที่ไม่เคยทอยได้หน้าเดิมสองครั้ง','ทุกดวลทอยหนึ่งลูก: 1 = อ่อนลงเหลือ 1/4 · 6 = แรงขึ้น 4 เท่า · หน้าอื่นปกติ',()=>{const f=R(1,6);return[f===1?.25:f===6?4:1,f===1||f===6?`🎲 ทอยได้ <b>${f}</b>${f===6?' — ทุกอย่างเข้าทาง':' — ไม่มีอะไรเข้าทางสักอย่าง'}`:null]}],
 x_toss:['🟡','เหรียญหัวก้อย','agi','เหรียญที่โยนขึ้นไปแล้วไม่เคยตกลงมาตะแคง','ทุกดวลโยนเหรียญ: หัว แรงขึ้น 70% · ก้อย อ่อนลง 40%',()=>{const h=Math.random()<.5;return[h?1.7:.6,null]}],
 x_card:['🃏','ไพ่ใบสุดท้าย','atk','ไพ่ใบที่เหลืออยู่ในมือเสมอ ไม่ว่าจะแจกกี่รอบ','ทุกดวลสุ่มแรง 80%–150%',()=>[.8+Math.random()*.7,null]],
 x_seam:['🔖','เซียมซีวัด','sup','ใบเซียมซีที่เขย่าออกมาก่อนพิธีปลุกจิต','ต้นปีเสี่ยงเซียมซี ทั้งปีแรง 70%–160% ตามดวง',()=>[G().qy||1,null]],
 x_gfish:['🐠','ปลาทองตาบอด','agi','ปลาทองที่ว่ายชนโหลทุกวันแต่ไม่เคยตาย','ทุกดวลแรง 50%–220% ไม่มีใครเดาได้ แม้แต่ตัวคุณ',()=>[.5+Math.random()*1.7,null]]};
Object.entries(LUCK).forEach(([id,d])=>add(id,d[0],d[1],d[2],d[3],1,{f:'luck',luck:d[5],tx:`${fam.luck} · ${d[4]}`,yr:g=>{if(id==='x_seam'){const v=+(.7+Math.random()*.9).toFixed(2);g.qy=v;return`🔖 เซียมซีปีนี้: ${v>=1.3?'<b>ใบที่ ๑ เฮงทั้งปี</b>':v>=1?'ใบกลางๆ ค่อยเป็นค่อยไป':'ใบที่ ๒๘ ระวังตัวทั้งปี'} (ดวลแรง ${Math.round(v*100)}%)`}}}));
// 👁️ รู้มากเกินไป: ไม่เก่งต่อสู้ (−10%) แต่รู้สิ่งที่คนอื่นไม่รู้
add('x_lifeeye','👁️','ตาเห็นอายุขัย','sup','ดวงตาที่เห็นตัวเลขลอยอยู่เหนือหัวทุกคน',1,{f:'know',m:()=>.9,tx:`${fam.know} · ดวลอ่อนลง 10% · เห็นอายุขัยคน รับดูดวงได้เงิน · เตือนพ่อแม่ให้รอดได้หนึ่งครั้ง`,yr:g=>{S.money=(S.money||0)+R(15,40)+Math.round(lvl()*2);const P=(S.parents||[]).filter(p=>p.alive!==false&&p.life&&p.age!=null);const near=P.find(p=>p.life-p.age<=3);if(near&&!g.qsv){g.qsv=1;near.life+=8;return`👁️ คุณเห็นเลขเหนือหัว${near.role||'พ่อแม่'}เหลือแค่ ${near.life-8-near.age} ปี คุณลากไปหาหมอทั้งที่เขาบอกว่าไม่เป็นไร — หมอเจอโรคทัน (อายุขัย +8 ปี)`}}});
add('x_liarear','👂','หูได้ยินคำโกหก','ctrl','หูที่ได้ยินเสียงแหลมทุกครั้งที่มีคนโกหก',1,{f:'know',m:()=>.9,tx:`${fam.know} · ดวลอ่อนลง 10% · ไม่เคยโดนโกง ได้เงินทุกปี · คนรอบตัวเกร็งเวลาคุยด้วย`,yr:()=>{S.money=(S.money||0)+Math.round((S.money||0)*.04)+R(10,30);S.karma=(S.karma||0)+1;S.cha=Math.max(0,(S.cha||0)-.3)}});
add('x_fearnose','👃','จมูกได้กลิ่นความกลัว','agi','จมูกที่ได้กลิ่นเหงื่อเย็นของคนที่กำลังกลัว',1,{f:'know',m:()=>.9,dodge:.5,tx:`${fam.know} · ดวลอ่อนลง 10% · ได้กลิ่นอันตรายก่อนตาย 50% ที่จะรอดจากการหลอมวงแหวนพลาด`});
add('x_selfmap','🗺️','แผนที่ที่วาดตัวเอง','ctrl','แผนที่กระดาษเปล่าที่เส้นทางค่อยๆ โผล่ขึ้นมาเอง',1,{f:'know',m:()=>.9,risk:.12,yr:()=>{S.int=(S.int||0)+1},tx:`${fam.know} · ดวลอ่อนลง 10% · หาสัตว์อสูรที่เหมาะเจอ หลอมวงแหวนเสี่ยงน้อยลง 12% · ปัญญา +1 ทุกปี`});
add('x_poisontg','👅','ลิ้นรู้รสพิษ','sup','ลิ้นที่ชาทุกครั้งที่แตะของมีพิษ',1,{f:'know',m:()=>.9,hurt:.65,yr:()=>hl(.08),tx:`${fam.know} · ดวลอ่อนลง 10% · ไม่เคยโดนวางยา บาดเจ็บจากการล่าเบาลง ฟื้นตัวทุกปี`});
// 🔥 แลกชีวิต: แรงมาก แต่อายุขัยหด
const LIFE={
 x_wick:['🪔','ไส้ตะเกียงสั้น','atk','ไส้ตะเกียงที่ลุกสว่างกว่าทุกดวงในหมู่บ้าน แต่สั้นกว่ามาก',1.8,2,'ดวลแรงขึ้น 80% · อายุขัย −2 ทุกปี'],
 x_incense:['🧧','ธูปดอกสุดท้าย','sup','ธูปดอกเดียวที่เหลือในกระถางหน้าหิ้ง',1.5,1,'ดวลแรงขึ้น 50% · อายุขัย −1 ทุกปี'],
 x_bcandle:['🎂','เทียนวันเกิด','atk','เทียนบนขนมวันเกิดที่เป่าไม่ดับ',1.45,1,'ดวลแรงขึ้น 45% · อายุขัย −1 ทุกปี · ปีที่อายุลงท้ายด้วย 0 แรงขึ้นเป็น 2.5 เท่า'],
 x_ice:['🧊','น้ำแข็งก้อนเดียว','def','น้ำแข็งก้อนเล็กในมือที่ไม่ละลายจนกว่าคุณจะอายุสามสิบ',2,0,'ก่อนอายุ 30 ดวลแรง 2 เท่า · หลัง 30 ละลาย อ่อนลง 30%'],
 x_bloom:['🌺','ดอกไม้บานคืนเดียว','agi','ดอกตูมที่รอบานมาทั้งชีวิต',1,0,'ครั้งแรกที่ดวลกับคนแข็งกว่าหลังอายุ 16 แรงขึ้น 5 เท่า แล้วดอกโรย อ่อนลง 10% ตลอดไป']};
Object.entries(LIFE).forEach(([id,d])=>add(id,d[0],d[1],d[2],d[3],1,{f:'life',tx:`${fam.life} · ${d[6]}`,
 m:(ep)=>{const g=G();if(id==='x_ice')return S.age<30?2:.7;if(id==='x_bloom'){if(g.qbl)return .9;if(S.age>=16&&ep>(typeof total==='function'?total():0)){g.qbl=S.age;setTimeout(()=>{try{log('🌺 <b>ดอกไม้ในดวงจิตบานเต็มที่ในคืนนั้นคืนเดียว</b> พลังทั้งชีวิตระเบิดออกมาในดวลเดียว เช้ามากลีบร่วงหมด','myth',true)}catch(e){}},50);return 5}return 1}if(id==='x_bcandle'&&S.age%10===0)return 2.5;return d[4]},
 yr:()=>{if(d[5]){S.lifespan=(S.lifespan||60)-d[5]}}}));
// 🏠 ผูกสถานที่: อยู่ใกล้บ้านแรง ออกเดินทางอ่อน
const HOME={x_wall:['🧱','กำแพงบ้านเก่า','def','กำแพงดินเหนียวที่ปู่ก่อเองกับมือ',1.5,.7],x_tpwell:['⛲','บ่อน้ำหลังวัด','sup','บ่อน้ำที่ว่ากันว่าไม่เคยแห้งแม้ปีแล้ง',1.4,.8],x_bridge:['🌉','สะพานไม้ข้ามคลอง','ctrl','สะพานไม้ที่เดินข้ามทุกเช้าไปโรงเรียน',1.45,.75],x_banyan:['🌳','ต้นไทรกลางหมู่บ้าน','def','ต้นไทรที่มีผ้าแดงผูกรอบโคนเต็มไปหมด',1.55,.65],x_cgate:['🚪','ประตูเมือง','def','ประตูไม้บานใหญ่ที่ปิดทุกคืนตอนตีกลอง',1.5,.7]};
Object.entries(HOME).forEach(([id,d])=>add(id,d[0],d[1],d[2],d[3],1,{f:'home',m:()=>S.focus==='adv'?d[5]:d[4],tx:`${fam.home} · อยู่บ้าน (ไม่ได้เลือกท่องยุทธภพ) ดวลแรงขึ้น ${Math.round((d[4]-1)*100)}% · ออกเดินทาง อ่อนลง ${Math.round((1-d[5])*100)}%`}));
// 🫥 ตัวตนหาย: แรงและหลบเก่ง แต่ทุกปีมีคนลืมคุณ
const GONE={x_noname:['📛','ชื่อที่ไม่มีใครจำได้','agi','ป้ายชื่อที่ตัวหนังสือจางลงทุกครั้งที่มีคนอ่าน'],x_nomask:['🎭','หน้ากากไม่มีหน้า','ctrl','หน้ากากขาวเรียบที่ใส่แล้วไม่มีใครจำหน้าคุณได้'],x_loose:['🌫️','เงาที่ไม่ติดตัว','agi','เงาที่ชอบไปยืนอยู่ห่างจากตัวคุณสองก้าว'],x_noprint:['👣','รอยเท้าที่ไม่มี','agi','เดินบนทรายแล้วไม่มีรอยเท้าตามหลัง'],x_mute:['🔇','เสียงที่ไม่มีใครได้ยิน','ctrl','ตะโกนสุดเสียงก็ไม่มีใครหันมา']};
Object.entries(GONE).forEach(([id,d])=>add(id,d[0],d[1],d[2],d[3],1,{f:'gone',m:()=>1.3,dodge:.35,tx:`${fam.gone} · ดวลแรงขึ้น 30% · หลบความตายจากการหลอมวงแหวนได้ 35% · ทุกปีชื่อเสียงหาย 10% และคนรู้จักอาจลืมคุณ`,
 yr:()=>{S.fame=Math.round((S.fame||0)*.9);if(Math.random()<.18){const L=(typeof peers!=='undefined'?peers:[]).filter(p=>p&&p.alive&&!p.forgot);const p=L.length?L[Math.floor(Math.random()*L.length)]:null;if(p){p.forgot=1;p.rel=null;return`${d[0]} ${esc(p.name)} เดินสวนคุณกลางตลาดโดยไม่หันมามอง เมื่อวานเขายังทักคุณอยู่เลย`}}}}));

// ---------- กลไกร่วม ----------
const mine=()=>{try{const g=G();return(g.dorm&&g.sp.length>1?g.sp.slice(0,1):g.sp).map(s=>Q[s.id]).filter(Boolean)}catch(e){return[]}};
const mult=(ep)=>{let m=1,msg=null;for(const q of mine()){try{if(q.m)m*=q.m(ep)||1;if(q.luck){const r=q.luck();m*=r[0];if(r[1])msg=r[1]}}catch(e){}}return[cl(m,.1,6),msg]};
// ดวล/ปะทะ: ปรับพลังศัตรูแทน
{const _d=duel;duel=function(name,ep,cb){if(!on()||!mine().length)return _d.apply(this,arguments);const[m,msg]=mult(ep);if(msg)try{log(msg,m>=1?'good':'bad')}catch(e){}
 const g=G();const cb2=function(w){try{if(w){g.qs=(g.qs||0)+1;g.ql=0}else{g.qs=0;g.ql=1}}catch(e){}return cb&&cb.apply(this,arguments)};return _d.call(this,name,Math.max(1,Math.round(ep/m)),cb2)}}
{const _f=fight;fight=function(name,ep){if(!on()||!mine().length)return _f.apply(this,arguments);const[m]=mult(ep);const w=_f.call(this,name,Math.max(1,Math.round(ep/m)));try{const g=G();if(w){g.qs=(g.qs||0)+1;g.ql=0}else{g.qs=0;g.ql=1}}catch(e){}return w}}
// ล่าวงแหวน: ความเสี่ยง/บาดเจ็บ/รอดตาย
{const _r=window._svRisk;window._svRisk=(g,t,o)=>(_r?_r(g,t,o):0)+mine().reduce((a,q)=>a+(q.risk||0),0)}
{const _h=window._svHurt;window._svHurt=function(){let v=_h?_h.apply(this,arguments):1;mine().forEach(q=>{if(q.hurt)v*=q.hurt});return v}}
{const _dg=window._svDodge;window._svDodge=function(g){let r=false;try{r=_dg?_dg.apply(this,arguments):false}catch(e){}if(r)return true;try{const q=mine().find(q=>q.dodge&&Math.random()<q.dodge);if(q&&!g.qdg){g.qdg=1;log('🫥 วินาทีที่วงแหวนระเบิด ความตายมองหาคุณไม่เจอ — คุณรอดมาได้อย่างไม่น่าเชื่อ','myth',true);return true}}catch(e){}return false}}
// รายปี
function qYear(){const g=G();if(!g||g.aw!==1)return;const out=[];
 mine().forEach(q=>{try{const t=q.yr&&q.yr(g);if(t)out.push(t)}catch(e){console.error('sv100 yr',e)}});
 g.qe={a:S.age,dp:S.power-(g.qe0?g.qe0.p:S.power),dh:S.hp-(g.qe0?g.qe0.h:S.hp),dm:(S.money||0)-(g.qe0?g.qe0.m:(S.money||0)),df:(S.fame||0)-(g.qe0?g.qe0.f:(S.fame||0))};
 g.qe0={p:S.power,h:S.hp,m:S.money||0,f:S.fame||0};
 out.forEach(t=>{try{log(t,'')}catch(e){}});
 if(g.qdue)debtAsk()}
function debtAsk(){const g=G(),id=g.qdue,d=DEBT[id];if(!d){g.qdue=null;return}let n=0;const go=()=>{if(!on()||G()!==g)return;if(!free()){if(++n<60)setTimeout(go,900);return}g.qdue=null;
 const who=['ชายใส่หมวกฟางที่ไม่มีเงา','หญิงชราถือสมุดบัญชีเล่มหนา','เด็กหน้าตาเหมือนคุณตอนหกขวบ','คนที่ยืนอยู่ปลายเตียงตอนตีสาม'][Math.floor(Math.random()*4)];
 choice(`${d[0]} ถึงเวลาทวงหนี้`,`${who}มายืนรอหน้าบ้าน ในมือมี${d[1]}ที่คุณใช้มาห้าปี ‘ท่าทุกท่าที่ใช้ไป จดไว้หมดแล้ว’`,[
  {t:'💸 '+d[5],s:'จ่ายให้จบ',f(){d[6]();log(`${d[0]} คุณจ่ายหนี้ ${who}ขีดฆ่าบรรทัดสุดท้ายแล้วเดินหายไปในหมอก`,'')}},
  {t:'🙅 '+d[7],s:'ไม่จ่าย',f(){d[8]();log(`${d[0]} คุณปิดประตูใส่ ${who}ไม่เถียง แค่จดอะไรบางอย่างเพิ่มแล้วจากไป`,'bad')}}])};setTimeout(go,700)}
{const _py=passYear;passYear=function(){const a0=S&&S.age,me=S;const r=_py.apply(this,arguments);try{if(on()&&S===me&&S.age!==a0)qYear()}catch(e){console.error('sv100',e)}return r}}
window._sv100={Q,fam,mult,qYear};
})()}catch(e){console.error('block129',e)}
SL.impl.duel=duel;duel=function(){return globalThis.duel.apply(this,arguments)};SL.impl.fight=fight;fight=function(){return globalThis.fight.apply(this,arguments)};SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul19 (เดิมอยู่ app.js บรรทัด 44852) · ห่อ: passYear ----
(function(){const SL=globalThis.__wSlots['soul19'];let passYear=SL.base.passYear;
try{(()=>{
const B=window._blk34,Q100=window._sv100;if(!B||!Q100)return;const SP=B.SP;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU);
const G=()=>S.sv;const br=id=>(G().qb||{})[id];
const hp=p=>{S.hp=cl(S.hp+Math.round(S.maxHp*p),1,S.maxHp)};
const kids=()=>(S.children||[]).filter(c=>c&&c.alive!==false).length;
const spouse=()=>!!(S.spouse&&S.spouse.alive!==false);
const mom=()=>(S.parents||[]).some(p=>p&&p.alive!==false&&/แม่/.test(p.role||p.r||''));
const nmP=g=>{try{return anyName(g||(Math.random()<.5?'ชาย':'หญิง'))}catch(e){return'ใครบางคน'}};
const R2={}; // id → {m,yr,risk,hurt,dodge, br:[ชื่อจุดแตก, ข้อความ, [[t,s,key,log]...]], ev:[[title,text,[[t,s,fn]]] x2]}
const add=(id,ic,n,t,d,tx,q)=>{if(SP.some(x=>x[0]===id))return;SP.push([id,ic,n,t,d+' · ⚙️ '+tx,2,null]);R2[id]=q;Q100.Q[id]=q};
const L=(t,c)=>()=>{try{log(t,c||'')}catch(e){}};

add('r_larva','🐛','ตัวอ่อนที่ไม่ยอมโต','agi','หนอนตัวเล็กที่คนทั้งสถาบันหัวเราะใส่','ห้าวงแหวนแรกอ่อนลง 30% · ครบวงที่หกจะลอกคราบ เลือกร่างใหม่',{
 m:()=>{const b=br('r_larva');return b==='bfly'?2:b==='beetle'?1.6:b==='wasp'?2.3:G().rings.length>=6?1.3:.7},hurt:()=>br('r_larva')==='beetle'?.5:1,dodge:()=>br('r_larva')==='bfly'?.5:0,
 bc:g=>g.rings.length>=6,br:['🐛 ลอกคราบ','คืนหลังหลอมวงแหวนวงที่หก ผิวหนังของดวงจิตปริออกทั้งตัว สิ่งที่อยู่ข้างในรอให้คุณเลือกว่าจะเป็นอะไร',[
  ['🦋 ผีเสื้อ','ว่องไว ดวลแรง 2 เท่า หลบความตายได้','bfly','🦋 ปีกบางใสกางออกเต็มลานฝึก คนที่เคยเรียกคุณว่าหนอนเงียบกริบ'],
  ['🪲 ด้วงเกราะ','แรง 60% บาดเจ็บจากการล่าเหลือครึ่ง','beetle','🪲 เปลือกแข็งสีดำเงาปิดทุกจุดอ่อน หมัดแรกที่ซัดใส่คุณทำให้คนต่อยข้อมือหัก'],
  ['🐝 ตัวต่อ','แรง 2.3 เท่า แต่ทุกปีกรรมลด','wasp','🐝 เหล็กในยาวเท่านิ้วโผล่จากปลายดวงจิต คุณรู้สึกอยากต่อยใครสักคนตลอดเวลา']]],
 yr:()=>{if(br('r_larva')==='wasp')S.karma=(S.karma||0)-2},
 ev:[['🐛 หนอนในห้องเรียน','เด็กในสถาบันเอาใบไม้มาวางบนโต๊ะคุณทุกเช้า "อาหารของหนอน" ครูเห็นแต่ไม่พูดอะไร',[['ทนไว้ รอวันลอกคราบ','',()=>{S.int=(S.int||0)+2;G().lv=Math.min(100,G().lv+1);return'🐛 คุณกินใบไม้ใบหนึ่งต่อหน้าทุกคนแล้วยิ้ม ไม่มีใครเอามาวางอีก'}],['ท้าคนเอามาวางดวล','',()=>fight('เด็กหัวโจกสถาบัน',Math.round(total()*.9))?'🐛 คุณชนะแบบเฉียดฉิว เด็กหัวโจกเลิกล้อ':(hp(-.15),'🩸 คุณแพ้ ใบไม้บนโต๊ะเพิ่มเป็นสองใบ')]]],
     ['🐛 ครูแนะนำให้ทิ้งดวงจิต','อาจารย์ประจำชั้นบอกว่ามีพิธีลอกดวงจิตทิ้งแล้วปลุกใหม่ได้ เสี่ยงตายหนึ่งในสาม แต่อาจได้ดวงจิตที่ดีกว่า',[['ไม่ทิ้ง','',()=>{S.karma=(S.karma||0)+3;return'🐛 คุณบอกครูว่าหนอนก็มีวันของมัน ครูถอนหายใจแต่ไม่บังคับ'}],['ทิ้ง ลองปลุกใหม่','เสี่ยง',()=>{if(Math.random()<.33){S.hp=1;S.maxHp=Math.round(S.maxHp*.7);return'💥 พิธีล้มเหลว ร่างกายเกือบพัง ดวงจิตเดิมยังอยู่ที่เดิม'}const L0=SP.filter(x=>x[5]===1);const p=L0[Math.floor(Math.random()*L0.length)];G().sp[0]={id:p[0],rev:0};return`🔄 ดวงจิตใหม่ตื่นขึ้น: ${p[1]} <b>${p[2]}</b>`}]]]]});
add('r_silence','🔇','ความเงียบ','def','ความเงียบที่ทำให้แม้แต่วงแหวนของศัตรูก็ไม่เปล่งแสง','ดวลแบบไม่มีใครใช้ท่าได้ ร่างกายยิ่งทนยิ่งได้เปรียบ (พลังชีวิตสูงสุดสูง ดวลแรงขึ้นถึง 60%)',{
 m:()=>{const b=br('r_silence');let m=1+cl((S.maxHp-150)/1500,0,.6);if(b==='abs')m+=.25;if(b==='storm'){const g=G();if(g.qst!==S.age){g.qst=S.age;return m*2.5}}return m},
 bc:g=>g.lv>=40,br:['🔇 ความเงียบแบบไหน','ระดับจิตสี่สิบ ความเงียบในตัวคุณหนาจนนกเลิกร้องเวลาคุณเดินผ่าน มันกำลังจะกลายเป็นอะไรบางอย่าง',[
  ['ความเงียบสัมบูรณ์','แรงขึ้นถาวร แต่เสน่ห์ลด','abs','🔇 เสียงหัวใจคนข้างๆ ยังดังกว่าเสียงฝีเท้าคุณ'],
  ['ความเงียบก่อนพายุ','ดวลแรกของทุกปีแรง 2.5 เท่า','storm','⛈️ ความเงียบสะสมทั้งปีแล้วระเบิดในครั้งเดียว']]],
 yr:()=>{if(br('r_silence')==='abs')S.cha=Math.max(0,(S.cha||0)-1)},
 ev:[['🔇 เปิดสอนแต่ไม่มีใครมา','คุณติดป้ายรับศิษย์หน้าบ้านมาสามเดือน มีคนมาคนเดียว เป็นเด็กหูหนวก',[['รับไว้','สอนด้วยมือ',()=>{S.fame=(S.fame||0)+30;S.karma=(S.karma||0)+6;return'🤟 คุณกับศิษย์คุยกันด้วยมือ สามปีต่อมาเด็กคนนั้นชนะศึกเยาวชนโดยไม่มีใครได้ยินเสียงฝีเท้า'}],['ปิดป้าย','',()=>'🔇 คุณเก็บป้ายเข้าบ้าน ความเงียบกลับมาเหมือนเดิม']]],
     ['🔇 วัดเงียบบนเขา','วัดที่พระไม่พูดมาสามร้อยปีส่งจดหมายมา ขอให้คุณขึ้นไปช่วยเฝ้าประตูหนึ่งปี',[['ขึ้นไป','',()=>{G().lv=Math.min(100,G().lv+3);hp(.3);return'🏔️ หนึ่งปีบนเขา ระดับจิต +3 คุณลงมาแล้วลืมไปว่าเสียงตัวเองเป็นยังไง'}],['ปฏิเสธ','',()=>'📜 คุณเผาจดหมายทิ้ง ควันลอยขึ้นไปทางเขาโดยไม่มีเสียงไฟ']]]]});
add('r_pot','🍚','หม้อข้าวแตก','sup','หม้อดินร้าวที่หุงข้าวได้หอมกว่าหม้อใหม่ทุกใบ','ไม่เก่งต่อสู้ (อ่อนลง 15%) · ทุกวงแหวนกลายเป็นสูตรอาหาร ได้เงินทุกปีตามจำนวนวงแหวน',{
 m:()=>.85,yr:()=>{const g=G(),b=br('r_pot');const v=Math.round((20+g.rings.length*35)*(b==='court'?3:1));S.money=(S.money||0)+v;if(b==='alms'){S.karma=(S.karma||0)+2;S.fame=(S.fame||0)+5}},
 bc:g=>g.lv>=40,br:['🍚 ครัวของใคร','ฝีมือทำอาหารของคุณดังไปถึงสองที่ในเวลาเดียวกัน',[
  ['👑 ครัวราชสำนัก','เงิน 3 เท่า แต่จะมีคนจ้างวางยา','court','👑 คุณได้หมวกพ่อครัวหลวงกับห้องเครื่องที่มีทหารเฝ้าสองชั้น'],
  ['🍲 โรงทาน','กรรมและชื่อเสียงขึ้นทุกปี','alms','🍲 หม้อร้าวใบเดิมตั้งอยู่หน้าวัด คนรอคิวยาวถึงตีนเขา']]],
 ev:[['🍚 มีคนจ้างวางยา','ขุนนางคนหนึ่งยื่นห่อผงขาวกับทองสิบแท่ง "ใส่ลงในซุปของท่านอัครเสนาบดีคืนนี้"',[['รับทอง แล้วเททิ้ง','เสี่ยงถูกจับได้',()=>{S.money=(S.money||0)+600;if(Math.random()<.4){hp(-.4);return'🗡️ ขุนนางรู้ ส่งคนมาดักทำร้ายคุณกลางทาง'}return'🍚 ซุปคืนนั้นอร่อยที่สุดในชีวิต ทองสิบแท่งอยู่ใต้เตียง'}],['ไปบอกอัครเสนาบดี','',()=>{S.fame=(S.fame||0)+80;S.karma=(S.karma||0)+10;return'📜 อัครเสนาบดีมอบป้ายหยกให้ ขุนนางคนนั้นหายไปในคืนเดียว'}],['ใส่จริง','กรรมหนัก',()=>{S.money=(S.money||0)+1000;S.karma=(S.karma||0)-40;return'☠️ งานศพจัดเจ็ดวันเจ็ดคืน คุณเป็นคนทำอาหารงานศพด้วย'}]]],
     ['🍚 แข่งกับพ่อครัวหลวง','พ่อครัวหลวงท้าแข่ง ผู้แพ้ต้องหักตะหลิวทิ้ง',[['แข่งด้วยข้าวต้มธรรมดา','',()=>{if(Math.random()<.6){S.fame=(S.fame||0)+60;return'🥣 กรรมการชิมแล้วร้องไห้ บอกว่านึกถึงแม่'}S.fame=Math.max(0,(S.fame||0)-20);return'🥢 แพ้ ตะหลิวอันเดียวของคุณถูกหักต่อหน้าคนทั้งตลาด'}],['ไม่แข่ง','',()=>'🍚 คุณเดินกลับไปหุงข้าวต่อ คนเรียกคุณว่าขี้ขลาดอยู่ครึ่งเดือน']]]]});
add('r_magnet','🧲','แม่เหล็กดำ','ctrl','ก้อนหินดำที่ตะปูทั้งบ้านวิ่งเข้าหา','ดึงอาวุธจากมือศัตรู ดวลแรงขึ้น 30% · บางปีดึงเศษโลหะมาขายได้',{
 m:()=>br('r_magnet')==='iron'?1.6:1.3,yr:()=>{const b=br('r_magnet');if(b==='gold'){const v=50+G().lv*4;S.money=(S.money||0)+v}else if(Math.random()<.3)S.money=(S.money||0)+30},
 bc:g=>g.lv>=40,br:['🧲 ดึงอะไร','แม่เหล็กในดวงจิตแรงจนดึงได้แค่อย่างเดียว ต้องเลือก',[['⚔️ เหล็ก','ดวลแรงขึ้น 60%','iron','🧲 ดาบทั้งลานฝึกสั่นพร้อมกันตอนคุณเดินเข้าไป'],['🪙 ทอง','ได้เงินทุกปีตามระดับจิต','gold','🪙 เหรียญทองในกระเป๋าคนแปลกหน้าค่อยๆ ไหลมาหาคุณ คุณพยายามไม่คิดมาก']]],
 ev:[['🧲 ช่างตีเหล็กขอยืม','ช่างตีเหล็กประจำเมืองขอให้คุณช่วยดูดเศษเหล็กจากแม่น้ำที่ปนเปื้อน',[['ช่วย','',()=>{S.fame=(S.fame||0)+25;S.karma=(S.karma||0)+4;return'🌊 สามวันคุณดูดเศษเหล็กได้เป็นเกวียน ปลากลับมาในแม่น้ำ'}],['คิดค่าแรง','',()=>{S.money=(S.money||0)+150;return'🪙 ช่างจ่ายแบบหน้าบึ้ง'}]]],
     ['🧲 ศพในบ่อเหมือง','ดวงจิตคุณดึงอะไรบางอย่างขึ้นมาจากบ่อเหมืองร้าง เป็นศพสวมเกราะเหล็กทั้งตัว ในมือกำแผ่นหยก',[['เอาแผ่นหยก','',()=>{S.int=(S.int||0)+4;G().lv=Math.min(100,G().lv+2);return'📜 แผ่นหยกบันทึกวิชาดึงโลหะชั้นสูง ระดับจิต +2'}],['ฝังศพให้','',()=>{S.karma=(S.karma||0)+8;return'🪦 คุณฝังเขาพร้อมเกราะ คืนนั้นฝันว่ามีคนมาขอบคุณ'}]]]]});
add('r_nest','🪺','รังนกร้าง','sup','รังนกบนกิ่งไม้ที่ไม่มีนกกลับมาอีก','ยิ่งมีลูกยิ่งแรง (ลูกละ 10% สูงสุด 50%)',{
 m:()=>br('r_nest')==='empty'?1.5:1+Math.min(.5,kids()*.1),bc:g=>g.lv>=40,br:['🪺 รังของใคร','ระดับจิตสี่สิบ รังในดวงจิตเริ่มมีขนนกเส้นใหม่',[['🐣 รอนกกลับรัง','ยังแรงตามจำนวนลูก','wait','🐣 คุณสร้างรังเพิ่มอีกชั้นเผื่อไว้'],['🍂 รังว่างตลอดไป','แรงขึ้น 50% ไม่ขึ้นกับลูก','empty','🍂 คุณยอมรับว่าบางรังมีไว้ให้ลมพัดผ่าน']]],
 ev:[['🪺 นกกระจอกบาดเจ็บ','นกกระจอกปีกหักตกลงมาหน้าบ้าน ดวงจิตของคุณสั่นเหมือนอยากรับมันไว้',[['เลี้ยงไว้','',()=>{S.cha=(S.cha||0)+2;hp(.1);return'🐦 นกกระจอกหายดีแล้วไม่ยอมไปไหน มันนอนในรังของดวงจิตคุณทุกคืน'}],['ปล่อยตามธรรมชาติ','',()=>'🍃 พรุ่งนี้นกตัวนั้นหายไป']]],
     ['🪺 เด็กกำพร้าหน้าประตู','เด็กสามขวบนั่งหลับอยู่หน้าประตูบ้าน ในมือกำรังนกแห้งๆ',[['รับเลี้ยง','ได้ลูก',()=>{(S.children=S.children||[]).push({n:nmP(),age:3,alive:true,adopt:1});S.karma=(S.karma||0)+10;return'🪺 รังที่ว่างมานานมีเสียงหัวเราะ'}],['ส่งไปสถานเลี้ยงเด็ก','',()=>'🏚️ คุณเดินไปส่งเด็กเองตอนเช้า เด็กไม่ร้องไห้']]]]});
add('r_rosary','📿','ลูกประคำ 108 เม็ด','sup','ลูกประคำที่นับเองทุกครั้งที่คุณทำดีหรือทำชั่ว','กรรมยิ่งดียิ่งแรง (สูงสุด +50%) · กรรมติดลบอ่อนลง',{
 m:()=>{const k=S.karma||0;return br('r_rosary')==='mara'?1+cl(-k/200,-.2,.7):1+cl(k/200,-.3,.5)},bc:g=>g.lv>=40,br:['📿 เม็ดที่ 108','ลูกประคำเม็ดสุดท้ายแตกออก ข้างในว่างเปล่า มันรอให้คุณใส่อะไรลงไป',[['☸️ พุทธะ','กรรมดีแรงขึ้นต่อไป','bud','☸️ เม็ดสุดท้ายกลายเป็นสีขาวนวล'],['😈 มาร','กลับข้าง: กรรมยิ่งติดลบยิ่งแรง (สูงสุด +70%)','mara','😈 ลูกประคำทั้งพวงเปลี่ยนเป็นกระดูกสีดำ คุณนับถอยหลังแทน']]],
 ev:[['📿 คนตายขอให้สวด','ครอบครัวยากจนขอให้คุณช่วยสวดหน้าศพ เพราะไม่มีเงินนิมนต์พระ',[['สวดให้ทั้งคืน','',()=>{S.karma=(S.karma||0)+12;return'🕯️ คุณสวดจนลูกประคำร้อนในมือ เช้ามาญาติผู้ตายกราบเท้าคุณ'}],['ไม่ว่าง','',()=>{S.karma=(S.karma||0)-3;return'📿 ลูกประคำหนักขึ้นหนึ่งเม็ดในคืนนั้น'}]]],
     ['📿 ลูกประคำหาย','ตื่นมาลูกประคำในดวงจิตหายไปเม็ดหนึ่ง มีรอยเท้าเล็กๆ ไปทางป่าช้า',[['ตามไปเอาคืน','ดวล',()=>fight('ผีเด็กในป่าช้า',Math.round(total()*.8))?(S.karma=(S.karma||0)+5,'👻 ผีเด็กคืนเม็ดประคำให้ แลกกับให้คุณจุดธูปให้ทุกปี'):(hp(-.2),'👻 ผีเด็กหนีไปพร้อมเม็ดประคำ')],['ปล่อยให้เขาเก็บไว้','',()=>{S.karma=(S.karma||0)+3;return'📿 คุณเหลือ 107 เม็ด และนับไม่เคยครบอีกเลย'}]]]]});
add('r_trap','🪤','กับดักหนู','ctrl','กับดักไม้ที่ไม่เคยดักพลาด แต่ใช้ได้ครั้งเดียวต่อคืน','ดวลแรกของทุกปีแรง 2 เท่า ดวลถัดไปอ่อนลง 10%',{
 m:()=>{const g=G(),b=br('r_trap');if(g.qtp!==S.age){g.qtp=S.age;return b==='bear'?3:2}return b==='many'?1.1:.9},bc:g=>g.lv>=40,br:['🪤 กับดักแบบไหน','คุณต้องเลือกว่าจะดักใหญ่ครั้งเดียว หรือดักเล็กหลายจุด',[['🐻 กับดักหมี','ดวลแรกของปีแรง 3 เท่า','bear','🐻 กับดักในดวงจิตใหญ่จนกลืนครึ่งลานฝึก'],['🕸️ กับดักหลายจุด','ดวลอื่นแรงขึ้น 10% แทนที่จะอ่อน','many','🕸️ กับดักเล็กๆ กระจายเต็มสนาม ศัตรูก้าวไม่ถูกสักก้าว']]],
 ev:[['🪤 หนูยักษ์ในยุ้งข้าว','ยุ้งข้าวของหมู่บ้านถูกหนูยักษ์กินไปครึ่ง ผู้ใหญ่บ้านขอให้ช่วย',[['วางกับดัก','',()=>{S.fame=(S.fame||0)+20;S.money=(S.money||0)+60;return'🐀 หนูยักษ์ตัวเท่าหมาติดกับดักในคืนเดียว ผู้ใหญ่บ้านแจกข้าวให้คุณหนึ่งกระสอบ'}],['ไม่ยุ่ง','',()=>'🌾 ข้าวในยุ้งหมดก่อนหน้าหนาว']]],
     ['🪤 ศิษย์พี่ติดกับดัก','ศิษย์พี่ที่ชอบรังแกคุณเดินเหยียบกับดักที่คุณวางไว้ซ้อมหลังสำนัก',[['ช่วยแกะ','',()=>{S.karma=(S.karma||0)+5;return'🦶 ศิษย์พี่เดินกะเผลกไปครึ่งเดือนแต่เลิกรังแกคุณ'}],['ปล่อยไว้ทั้งคืน','',()=>{S.karma=(S.karma||0)-6;S.fame=(S.fame||0)+10;return'🌙 เช้ามาทั้งสำนักรู้ว่าใครวางกับดัก ไม่มีใครกล้ามายุ่งกับคุณอีก'}]]]]});
add('r_thread','🧵','ด้ายแดง','sup','ด้ายแดงเส้นหนึ่งผูกนิ้วก้อยไว้ ปลายอีกด้านหายไปในหมอก','มีคู่ชีวิตอยู่ ดวลแรงขึ้น 40% · ไม่มีคู่ อ่อนลง 20%',{
 m:()=>{const b=br('r_thread');if(b==='cut')return 1.8;return spouse()?1.4:.8},bc:g=>g.lv>=40&&!!S.spouse&&S.spouse.alive===false,br:['🧵 ด้ายขาด','ปลายด้ายแดงอีกด้านหย่อนลงพื้น ไม่มีใครถืออยู่แล้ว',[['✂️ ปล่อยให้ขาด','แรง 1.8 เท่าตลอดไป แค้นแทนรัก','cut','✂️ คุณกัดด้ายขาดด้วยฟัน มันเป็นสีดำ'],['🪡 ผูกปลายไว้ที่ข้อมือตัวเอง','กลับไปเหมือนเดิม','tie','🪡 คุณผูกปลายด้ายเป็นห่วงรอบข้อมือ เผื่อวันหนึ่งจะมีใครมาจับ']]],
 ev:[['🧵 ด้ายดึงไปทางไหน','คืนหนึ่งด้ายแดงตึงขึ้นแล้วดึงคุณไปทางทิศเหนือ',[['ตามไป','',()=>{S.cha=(S.cha||0)+3;return`🧵 ปลายทางคือร้านน้ำชาที่ <b>${esc(nmP())}</b> นั่งอยู่คนเดียว ด้ายไม่ได้ผูกกับเขา แต่เขามองด้ายเห็น`}],['ตัดใจนอนต่อ','',()=>'🧵 ด้ายหย่อนลงตอนตีสาม']]],
     ['🧵 คู่ชีวิตเห็นด้าย','คู่ชีวิตถามว่าทำไมนิ้วก้อยของคุณมีรอยแดงเหมือนถูกผูกไว้',[['บอกความจริง','',()=>{if(spouse()){S.cha=(S.cha||0)+2;return'💞 เขาเอานิ้วก้อยตัวเองมาแตะ รอยแดงขึ้นที่นิ้วเขาด้วย'}return'🧵 ไม่มีใครถามแล้ว'}],['บอกว่าโดนเชือกบาด','',()=>'🧵 คืนนั้นด้ายรัดแน่นจนนิ้วชา']]]]});
add('r_pit','🕳️','หลุมไร้ก้น','def','หลุมดำเล็กๆ ที่โยนอะไรลงไปก็ไม่เคยได้ยินเสียงตกถึง','หลอมวงแหวนเกินขีดได้ปลอดภัยกว่า 20% · แต่หิว ทุกปีกินเงินไป',{
 risk:()=>br('r_pit')==='deep'?.35:.2,yr:()=>{if(br('r_pit')!=='full')S.money=Math.max(0,(S.money||0)-Math.round((S.money||0)*.04))},m:()=>br('r_pit')==='full'?1.3:1,
 bc:g=>g.lv>=40,br:['🕳️ เติมหรือขุด','หลุมเริ่มดูดของรอบตัวจนต้องตัดสินใจ',[['⛏️ ขุดให้ลึกกว่าเดิม','หลอมเกินขีดปลอดภัยขึ้น 35%','deep','⛏️ เสียงลมจากก้นหลุมเปลี่ยนเป็นเสียงคน'],['🪨 ถมให้เต็ม','เลิกหิว ดวลแรงขึ้น 30%','full','🪨 คุณถมทุกอย่างที่มีลงไป หลุมเงียบลงแล้วกลายเป็นพื้นแข็ง']]],
 ev:[['🕳️ คนตกหลุม','เด็กเลี้ยงควายตกลงไปในหลุมของดวงจิตคุณตอนเผลอ',[['กระโดดตามลงไป','เสี่ยง',()=>{if(Math.random()<.6){S.fame=(S.fame||0)+40;S.karma=(S.karma||0)+8;return'🕳️ คุณดึงเด็กขึ้นมาได้ เขาบอกว่าข้างล่างมีคนเรียกชื่อคุณ'}hp(-.35);return'🕳️ คุณดึงเด็กขึ้นมาได้แต่ขาหัก'}],['โยนเชือก','',()=>{S.karma=(S.karma||0)+4;return'🪢 เชือกยาวสามสิบวาหายไปทั้งเส้น แต่เด็กปีนขึ้นมาได้'}]]],
     ['🕳️ เสียงจากก้นหลุม','กลางดึกมีเสียงเรียกจากก้นหลุม เป็นเสียงของคุณเองตอนเด็ก',[['ตอบกลับ','',()=>{G().lv=Math.min(100,G().lv+2);return'🗣️ คุณกับเสียงนั้นคุยกันจนเช้า ระดับจิต +2'}],['ปิดหลุมด้วยฝาไม้','',()=>'🪵 เสียงหยุด แต่ฝาไม้ขยับนิดหนึ่งทุกคืน']]]]});
add('r_bubble','🫧','ฟองสบู่','agi','ฟองสบู่ลูกเดียวที่ลอยตามคุณมาตั้งแต่อาบน้ำครั้งแรก','หลบความตายได้ 50% ดวลแรงขึ้น 20% · แต่พลังชีวิตสูงสุดโตช้า',{
 m:()=>br('r_bubble')==='glass'?1.5:1.2,dodge:()=>br('r_bubble')==='glass'?.2:.5,yr:()=>{if(br('r_bubble')!=='glass')S.maxHp=Math.max(30,S.maxHp-1)},
 bc:g=>g.lv>=40,br:['🫧 ฟองที่ไม่แตก','ฟองสบู่ลอยมาสามสิบกว่าปี เริ่มมีรอยร้าว',[['💎 ทำให้แข็งเป็นแก้ว','แรงขึ้น 50% หลบได้น้อยลง','glass','💎 ฟองแข็งเป็นลูกแก้วใส สะท้อนหน้าคุณตอนเด็ก'],['🫧 ปล่อยให้ลอยต่อ','หลบเก่งเหมือนเดิม','float','🫧 รอยร้าวหายไปเอง ฟองลอยสูงขึ้นอีกนิด']]],
 ev:[['🫧 เด็กอยากจับฟอง','เด็กข้างบ้านไล่จับฟองสบู่ในดวงจิตคุณทุกเย็น',[['ปล่อยให้เล่น','',()=>{S.cha=(S.cha||0)+2;return'🫧 เด็กหัวเราะจนแม่ต้องมาลาก ฟองสบู่ไม่แตก'}],['เก็บฟองไว้','',()=>'🫧 เด็กยืนรอที่รั้วอีกสามวัน']]],
     ['🫧 ฟองพาหนี','กลางศึกล่าสัตว์ ฟองสบู่ห่อตัวคุณลอยขึ้นไปบนต้นไม้',[['อยู่ข้างบนรอ','',()=>{hp(.2);return'🫧 สัตว์อสูรวนหาอยู่ข้างล่างจนเบื่อแล้วจากไป'}],['ลงไปสู้ต่อ','ดวล',()=>fight('สัตว์อสูรร้อยปี',Math.round(total()*.95))?(G().lv=Math.min(100,G().lv+1),'⚔️ ชนะ ระดับจิต +1'):(hp(-.25),'🩸 แพ้ ฟองพาคุณหนีอีกรอบ')]]]]});
add('r_bones','🦴','กระดูกบรรพบุรุษ','def','กระดูกนิ้วของบรรพบุรุษที่ตระกูลเก็บไว้ในหีบมาเจ็ดชั่วคน','ยิ่งเป็นรุ่นหลังยิ่งแรง (รุ่นละ 6% สูงสุด 60%)',{
 m:()=>{const g=S.gen||1;return(br('r_bones')==='self'?1.35:1+Math.min(.6,(g-1)*.06+.06))},bc:g=>g.lv>=40,br:['🦴 กระดูกของใคร','กระดูกในดวงจิตพูดได้ บรรพบุรุษถามว่าจะสืบทอดหรือเป็นตัวของตัวเอง',[['🏯 สืบทอดตระกูล','แรงตามจำนวนรุ่น','line','🏯 เสียงบรรพบุรุษเจ็ดคนพูดพร้อมกันในหัวคุณ'],['🙂 เป็นตัวเอง','แรงขึ้น 35% คงที่ เสียงในหัวเงียบ','self','🙂 คุณฝังกระดูกคืนที่สุสานตระกูล เสียงในหัวหยุด']]],
 ev:[['🦴 ทวดเข้าฝัน','ทวดที่ไม่เคยเห็นหน้าเข้าฝัน บอกว่ามีทองฝังอยู่ใต้ต้นมะขามหลังบ้านเก่า',[['ไปขุด','',()=>{if(Math.random()<.6){S.money=(S.money||0)+400;return'🪙 ขุดลงไปสองศอกเจอไหทองจริงๆ'}return'🕳️ เจอแต่กระดูกไก่ ทวดคงขี้เล่น'}],['ไม่เชื่อ','',()=>'🦴 คืนต่อมาทวดเข้าฝันอีกพร้อมไม้เรียว']]],
     ['🦴 คนนอกขอกระดูก','หมอผีจากต่างเมืองเสนอซื้อกระดูกบรรพบุรุษในราคาสูง',[['ขาย','เงิน · ตระกูลโกรธ',()=>{S.money=(S.money||0)+800;S.karma=(S.karma||0)-15;return'💰 ทั้งตระกูลเลิกพูดกับคุณ แต่บ้านใหม่สวยมาก'}],['ไล่ไป','',()=>{S.fame=(S.fame||0)+10;return'🚪 หมอผีหัวเราะแล้วบอกว่าจะกลับมาอีก'}]]]]});
add('r_horn','📯','แตรศึก','atk','แตรเขาควายที่เป่าแล้วคนในหมู่บ้านลุกขึ้นถือจอบ','ดวลแรงขึ้น 25% · ชื่อเสียงขึ้นทุกปี',{
 m:()=>br('r_horn')==='war'?1.5:1.25,yr:()=>{S.fame=(S.fame||0)+(br('r_horn')==='call'?12:4)},bc:g=>g.lv>=40,br:['📯 เป่าเพื่ออะไร','ทุกครั้งที่คุณเป่าแตร คนมารวมกันเยอะขึ้น',[['⚔️ เป่าเรียกศึก','ดวลแรงขึ้น 50%','war','⚔️ เสียงแตรทำให้ศัตรูขาสั่นก่อนเริ่มดวล'],['🏘️ เป่าเรียกคน','ชื่อเสียงขึ้นปีละ 12','call','🏘️ ทุกครั้งที่เป่า ทั้งหมู่บ้านมาช่วยสร้างบ้าน ขุดบ่อ เกี่ยวข้าว']]],
 ev:[['📯 โจรปล้นหมู่บ้าน','โจรสามสิบคนลงจากเขามาปล้นหมู่บ้านกลางดึก',[['เป่าแตรเรียกชาวบ้าน','',()=>fight('หัวหน้าโจรภูเขา',Math.round(total()*.9))?(S.fame=(S.fame||0)+50,'📯 ชาวบ้านถือจอบเสียมไล่โจรหนีกระเจิง'):(hp(-.3),'📯 โจรปล้นไปครึ่งหมู่บ้าน แต่ไม่มีใครตาย')],['ซ่อนตัว','',()=>{S.fame=Math.max(0,(S.fame||0)-30);return'🏚️ เช้ามาไม่มีใครมองหน้าคุณ'}]]],
     ['📯 แตรร้าว','แตรในดวงจิตร้าว เป่าแล้วเสียงเพี้ยน',[['ไปหาช่างซ่อม','',()=>{S.money=Math.max(0,(S.money||0)-80);return'🔧 ช่างแก่ตาบอดซ่อมให้ในคืนเดียว เสียงแตรทุ้มขึ้นกว่าเดิม'}],['เป่าทั้งที่ร้าว','',()=>{S.fame=(S.fame||0)+15;return'📯 เสียงเพี้ยนๆ ของคุณกลายเป็นเพลงประจำหมู่บ้าน'}]]]]});
add('r_whirl','🌪️','ลมหมุนในขวด','ctrl','ขวดแก้วที่มีพายุลูกเล็กหมุนอยู่ข้างใน','ปีไหนแพ้ดวล ลมสะสมไว้ 1 ระดับ ดวลครั้งถัดไปแรงขึ้นระดับละ 25% (สูงสุด 2 เท่า)',{
 m:()=>{const g=G(),c=g.qwc||0;g.qwc=0;return 1+Math.min(1,c*.25)+(br('r_whirl')==='storm'?.2:0)},yr:()=>{const g=G();if(g.ql)g.qwc=(g.qwc||0)+1},
 bc:g=>g.lv>=40,br:['🌪️ เปิดขวดหรือไม่','พายุในขวดแรงจนแก้วเริ่มร้าว',[['🌪️ เปิดขวด','ดวลทุกครั้งแรงขึ้นอีก 20%','storm','🌪️ พายุหลุดออกมาหมุนรอบตัวคุณตลอดเวลา ผมคุณไม่เคยเรียบอีกเลย'],['🍾 อุดให้แน่นกว่าเดิม','สะสมลมจากความพ่ายแพ้ต่อไป','keep','🍾 คุณเอาครั่งปิดปากขวดสามชั้น']]],
 ev:[['🌪️ ชาวนาขอลม','ปีนี้ลมไม่มา ข้าวไม่ออกรวง ชาวนาขอให้คุณปล่อยลมในขวดบ้าง',[['ปล่อยให้','',()=>{S.karma=(S.karma||0)+6;S.fame=(S.fame||0)+20;return'🌾 ลมพัดผ่านทุ่งสามวัน ข้าวออกรวงพร้อมกันทั้งหมู่บ้าน'}],['ไม่ปล่อย','',()=>'🌪️ ลมในขวดหมุนแรงขึ้นเหมือนไม่พอใจ']]],
     ['🌪️ ขวดตก','ขวดในดวงจิตหลุดมือตอนเผลอหลับ',[['รีบรับ','',()=>{G().qwc=(G().qwc||0)+2;return'🌪️ รับทัน ลมในขวดแรงขึ้นเพราะตกใจ'}],['ปล่อยให้แตก','',()=>{hp(-.2);S.fame=(S.fame||0)+30;return'💥 พายุลูกเล็กพังหลังคาบ้านสามหลัง คนทั้งเมืองเห็น'}]]]]});
add('r_nazar','🧿','ตาสีฟ้ากันคำสาป','def','ลูกแก้วตาสีฟ้าที่พ่อค้าต่างแดนแขวนไว้ที่เปลคุณ','บาดเจ็บจากการล่าเหลือครึ่ง · ทุกปีสะท้อนโชคร้ายคืนเจ้าของ',{
 hurt:()=>br('r_nazar')==='crack'?.3:.5,m:()=>br('r_nazar')==='back'?1.35:1,yr:()=>{if(Math.random()<.2)S.money=(S.money||0)+40},
 bc:g=>g.lv>=40,br:['🧿 ตาที่มองกลับ','ลูกตาสีฟ้าเริ่มกระพริบเอง',[['🔵 ให้มันรับคำสาปแทน','บาดเจ็บจากการล่าเหลือ 30%','crack','🧿 ลูกแก้วร้าวเป็นเส้นแต่ไม่แตก ทุกรอยร้าวคือคำสาปที่มันรับแทนคุณ'],['👁️ ให้มันมองกลับ','ดวลแรงขึ้น 35%','back','👁️ ศัตรูที่จ้องคุณเกินสามวินาทีจะเริ่มปวดหัว']]],
 ev:[['🧿 แม่มดสาปแช่ง','หญิงชราที่คุณไม่เคยเห็นหน้าชี้นิ้วมาแล้วพึมพำคำสาป',[['ยืนนิ่ง','',()=>{S.fame=(S.fame||0)+10;return'🧿 คำสาปเด้งกลับ หญิงชราสะดุดล้มหน้าคะมำ'}],['ถามว่าทำไม','',()=>{S.int=(S.int||0)+2;return'🗣️ เธอบอกว่าแม่คุณเคยแย่งผัวเธอ แล้วร้องไห้'}]]],
     ['🧿 ขายตาคุ้มกัน','พ่อค้าเสนอซื้อลูกแก้วตาสีฟ้าเพื่อเอาไปให้ลูกที่ป่วย',[['ให้ฟรี','ดวงจิตอ่อนลงชั่วคราว',()=>{S.karma=(S.karma||0)+15;G().lv=Math.max(1,G().lv-2);return'🧿 ปีต่อมาลูกพ่อค้าหายป่วย ดวงจิตของคุณงอกลูกแก้วลูกใหม่ขึ้นมาแทน'}],['ไม่ให้','',()=>'🧿 พ่อค้าเดินจากไปเงียบๆ']]]]});
add('r_gecko','🦎','จิ้งจกหางขาด','agi','จิ้งจกบนเพดานที่ทิ้งหางไว้ทุกครั้งที่ถูกจับ','ปีละครั้ง พลังชีวิตต่ำกว่า 30% ฟื้นทันที 50%',{
 yr:()=>{const g=G();if(hpPct2()<.3&&g.qgk!==S.age){g.qgk=S.age;hp(br('r_gecko')==='full'?1:.5);return'🦎 หางของดวงจิตหลุดออกไปแทนคุณ แผลปิดในคืนเดียว'}},m:()=>br('r_gecko')==='bite'?1.4:1.1,
 bc:g=>g.lv>=40,br:['🦎 หางงอกใหม่','หางงอกครั้งที่ร้อยยาวกว่าเดิม',[['🩹 งอกได้ทั้งตัว','ฟื้นเต็มแทนครึ่ง','full','🦎 คราวนี้ไม่ใช่แค่หาง แต่ทั้งร่างลอกคราบใหม่'],['🦷 ใช้หางเป็นอาวุธ','ดวลแรงขึ้น 40%','bite','🦷 หางที่หลุดออกไปดิ้นแล้วกัดศัตรู']]],
 ev:[['🦎 จิ้งจกทัก','จิ้งจกบนเพดานร้องสามครั้งตอนคุณกำลังจะออกล่า',[['รอวันอื่น','',()=>{hp(.1);return'🦎 ข่าวมาตอนเย็นว่าคนที่ออกล่าวันนั้นโดนสัตว์อสูรกัดสามคน'}],['ไปตามแผน','',()=>{G().lv=Math.min(100,G().lv+1);hp(-.1);return'🦎 คุณบาดเจ็บนิดหน่อย แต่ได้ประสบการณ์ ระดับจิต +1'}]]],
     ['🦎 หางที่หลุดยังดิ้น','หางของดวงจิตที่หลุดไปเมื่อปีก่อนยังดิ้นอยู่ในโหลแก้ว หมอยาขอซื้อไปทำยา',[['ขาย','',()=>{S.money=(S.money||0)+200;return'💊 หมอยาบอกว่ายานี้ต่อแขนคนได้'}],['ฝัง','',()=>{S.karma=(S.karma||0)+3;return'🌱 ปีต่อมามีต้นไม้แปลกๆ งอกตรงที่ฝัง'}]]]]});
const hpPct2=()=>S.maxHp?S.hp/S.maxHp:1;
add('r_knife','🔪','มีดทำครัวของแม่','atk','มีดที่แม่ใช้หั่นผักมาทั้งชีวิต ใบมีดบางลงจนเกือบโปร่งแสง','แม่ยังมีชีวิตอยู่ ดวลแรงขึ้น 50% (ปกป้องบ้าน)',{
 m:()=>{const b=br('r_knife');if(b==='rev')return 1.9;if(b==='cook')return 1.2;return mom()?1.5:1},bc:g=>g.lv>=40&&!mom(),br:['🔪 มีดที่ไม่มีใครหั่นผัก','แม่จากไปแล้ว มีดในดวงจิตยังคมเหมือนเดิม',[['🩸 ใช้เป็นอาวุธ','แรง 1.9 เท่า','rev','🩸 คุณลับมีดครั้งสุดท้ายบนหินหน้าหลุมศพแม่'],['🥬 ใช้หั่นผักต่อ','แรงขึ้น 20% และใจสงบ','cook','🥬 คุณหั่นผักทุกเช้าเหมือนแม่ ทำกับข้าวรสเดียวกันได้แล้ว']]],
 yr:()=>{if(br('r_knife')==='cook'){hp(.08);S.karma=(S.karma||0)+1}},
 ev:[['🔪 โจรบุกบ้าน','โจรสองคนปีนเข้าบ้านกลางดึก แม่ตื่นขึ้นมาก่อนคุณ',[['ยืนขวางหน้าแม่','ดวล',()=>fight('โจรปล้นบ้าน',Math.round(total()*.85))?(S.fame=(S.fame||0)+20,'🔪 โจรหนีไปทางหน้าต่าง แม่ยังถือไม้กวาดค้างอยู่'):(hp(-.3),'🩸 คุณโดนฟันแต่โจรก็หนีไป แม่ทำแผลให้ทั้งคืน')],['ตะโกนเรียกยาม','',()=>'📢 ยามมาช้าไปนิด โจรขนของไปครึ่งบ้าน']]],
     ['🔪 สอนทำกับข้าว','แม่ขอให้คุณมาช่วยหั่นผักในครัว เป็นครั้งแรกในรอบหลายปี',[['ไปช่วย','',()=>{S.cha=(S.cha||0)+2;hp(.15);return'🥘 แม่สอนสูตรต้มจืดที่ไม่เคยจดไว้ คุณจำได้ทุกขั้น'}],['ติดฝึก','',()=>'🔪 แม่หั่นผักคนเดียวเหมือนทุกวัน']]]]});
add('r_comet','☄️','ดาวหางร้อยปี','atk','ดาวหางที่ผ่านฟ้าในคืนที่คุณเกิด','ปีที่อายุลงท้ายด้วย 0 ดวลแรง 3 เท่า ปีอื่นอ่อนลง 5%',{
 m:()=>{const b=br('r_comet');if(S.age%10===0)return b==='fall'?4:3;if(b==='trail'&&S.age%10<=2)return 1.6;return .95},bc:g=>g.lv>=40,br:['☄️ ดาวหางกลับมา','ปีนี้ฟ้ามีหางแสงลากยาวอีกครั้ง ครั้งแรกตั้งแต่คุณเกิด',[['💥 ให้มันตกลงมา','ปีลงท้ายด้วย 0 แรง 4 เท่า','fall','💥 คุณรู้สึกเหมือนมีลูกไฟอยู่ในอก รอวันระเบิด'],['✨ ตามหางแสง','สามปีแรกของแต่ละทศวรรษแรงขึ้น 60%','trail','✨ หางแสงพาดผ่านสามปีแรกของทุกสิบปี']]],
 ev:[['☄️ หมอดูทัก','หมอดูริมถนนคว้าข้อมือคุณ "ท่านเกิดคืนดาวหาง ใช่หรือไม่"',[['ฟังต่อ','',()=>{S.int=(S.int||0)+2;return`☄️ หมอดูบอกว่าทศวรรษต่อไปของคุณจะมีปีเดียวที่ทุกอย่างเป็นไปได้ — ปีที่อายุ ${Math.ceil((S.age+1)/10)*10}`}],['ดึงมือกลับ','',()=>'☄️ หมอดูยิ้มแล้วกลับไปนั่งที่เดิม']]],
     ['☄️ เศษดาวตก','เศษหินดาวตกตกลงกลางทุ่งข้างบ้าน ยังร้อนอยู่',[['เก็บไว้','',()=>{G().lv=Math.min(100,G().lv+2);return'🪨 หินดาวตกอุ่นเหมือนมีชีวิต ระดับจิต +2'}],['ขายให้ช่างตีดาบ','',()=>{S.money=(S.money||0)+300;return'⚒️ ช่างตีดาบให้ราคาสูงกว่าที่คิดสามเท่า'}]]]]});
add('r_jar','🫙','ไหดองยาสามสิบปี','sup','ไหดองยาที่ปู่ฝังไว้ใต้ถุนบ้านวันที่คุณเกิด','ยิ่งแก่ยิ่งแรง (ปีละ 1% สูงสุด 80%)',{
 m:()=>{const b=br('r_jar');const base=1+Math.min(.8,Math.max(0,S.age-6)*.01);return b==='open'?base+.3:base},yr:()=>{if(br('r_jar')==='keep'){S.lifespan=(S.lifespan||60)+.3}},
 bc:g=>g.lv>=40,br:['🫙 เปิดไห','ยาในไหดองครบสามสิบปีแล้ว กลิ่นลอยออกมาทั้งที่ยังปิดฝา',[['🍶 เปิดดื่ม','แรงขึ้นอีก 30% ทันที','open','🍶 ยาดองรสขมจนน้ำตาไหล แต่ร่างกายร้อนขึ้นทั้งคืน'],['⏳ ดองต่อ','อายุขัยค่อยๆ ยืด','keep','⏳ คุณปิดฝาไหแล้วฝังกลับลงไป ปีนี้ยังไม่ถึงเวลา']]],
 ev:[['🫙 เพื่อนบ้านขอแบ่ง','ลุงข้างบ้านป่วยหนัก ภรรยาเขามาขอยาดองจากไหของคุณสักถ้วย',[['แบ่งให้','',()=>{S.karma=(S.karma||0)+8;return'🫙 ลุงลุกเดินได้ในสามวัน ไหดองในดวงจิตพร่องลงนิดหนึ่ง'}],['ไม่แบ่ง','',()=>{S.karma=(S.karma||0)-4;return'🫙 ลุงจากไปปลายเดือน'}]]],
     ['🫙 ไหร้าว','ไหในดวงจิตร้าว ยาดองซึมออกมาทีละหยด',[['ซ่อมด้วยดินเหนียว','',()=>'🫙 รอยร้าวปิดสนิท'],['รองหยดไว้กิน','',()=>{hp(.3);S.lifespan=(S.lifespan||60)+1;return'💧 คุณรองยาดองหยดละหยดจนเต็มถ้วย อายุขัย +1'}]]]]});
add('r_whale','🐋','ปลาวาฬในบ่อ','def','ปลาวาฬตัวใหญ่ที่อยู่ในบ่อน้ำหลังบ้านได้อย่างไรก็ไม่มีใครรู้','พลังชีวิตสูงสุดเพิ่มปีละ 3% · ยิ่งพลังชีวิตเยอะยิ่งดวลแรง',{
 yr:()=>{S.maxHp=Math.round(S.maxHp*(br('r_whale')==='sea'?1.05:1.03))},m:()=>1+cl((S.maxHp-200)/2000,0,br('r_whale')==='sea'?.4:.6)+(br('r_whale')==='sea'?.15:0),
 bc:g=>g.lv>=40,br:['🐋 บ่อเล็กไป','ปลาวาฬโตจนบ่อแตก น้ำท่วมหลังบ้าน',[['🌊 พาไปทะเล','ร่างใหญ่ขึ้นเร็วกว่าเดิม ดวลแรงขึ้นคงที่','sea','🌊 คุณขุดคลองจากบ่อไปทะเลคนเดียวในสามเดือน'],['🏞️ ขุดบ่อให้ใหญ่ขึ้น','ยิ่งพลังชีวิตเยอะยิ่งแรง (สูงสุด 60%)','pond','🏞️ บ่อหลังบ้านกลายเป็นทะเลสาบ หมู่บ้านมาตกปลา']]],
 ev:[['🐋 ปลาวาฬร้องเพลง','กลางดึกปลาวาฬในดวงจิตร้องเพลง ทั้งหมู่บ้านได้ยิน',[['ร้องตาม','',()=>{S.cha=(S.cha||0)+2;S.fame=(S.fame||0)+15;return'🎵 เด็กในหมู่บ้านจำทำนองได้ ร้องกันทั้งปี'}],['ขอให้เงียบ','',()=>'🐋 ปลาวาฬเงียบไปเจ็ดวันเหมือนน้อยใจ']]],
     ['🐋 พรานล่าวาฬ','พรานจากเมืองท่ามาขอซื้อปลาวาฬในดวงจิตคุณ เสนอราคาเท่าบ้านสองหลัง',[['ไล่ไป','ดวล',()=>fight('พรานล่าวาฬ',Math.round(total()*.9))?(S.fame=(S.fame||0)+25,'⚓ พรานหนีลงเรือไปตอนเช้า'):(hp(-.25),'🩸 พรานแทงฉมวกโดนครีบ ปลาวาฬเจ็บไปหลายเดือน')],['เจรจาให้เลิกล่า','',()=>{S.karma=(S.karma||0)+6;return'🤝 พรานเล่าว่าลูกเขาตายในทะเล คุณพาเขาไปฟังปลาวาฬร้องเพลงคืนหนึ่ง เขาเผาฉมวกทิ้ง'}]]]]});
add('r_chime','🎐','กระดิ่งลม','agi','กระดิ่งลมแก้วที่ดังก่อนเรื่องร้ายจะเกิดเสมอ','หลบความตายได้ 40% · ฟื้นพลังชีวิตทุกปี',{
 dodge:()=>br('r_chime')==='storm'?.6:.4,yr:()=>{hp(br('r_chime')==='calm'?.15:.06)},m:()=>br('r_chime')==='storm'?1.2:1,
 bc:g=>g.lv>=40,br:['🎐 กระดิ่งลมดังไม่หยุด','กระดิ่งลมดังทั้งคืนโดยไม่มีลม',[['⛈️ ฟังเสียงเตือน','หลบความตายได้ 60% ดวลแรงขึ้น 20%','storm','⛈️ คุณได้ยินอนาคตชัดขึ้นทีละนิด'],['🍃 ทำให้มันสงบ','ฟื้นพลังชีวิต 15% ทุกปี','calm','🍃 กระดิ่งลมกลับมาดังแค่ตอนมีลมจริงๆ คุณหลับสนิทครั้งแรกในรอบหลายปี']]],
 ev:[['🎐 กระดิ่งดังก่อนน้ำท่วม','กระดิ่งลมดังรัวกลางวันแสกๆ ลมไม่มีสักนิด',[['พาคนในหมู่บ้านขึ้นเขา','',()=>{S.fame=(S.fame||0)+60;S.karma=(S.karma||0)+10;return'🌊 ตอนเย็นน้ำป่าไหลลงมาท่วมหมู่บ้านถึงหลังคา ไม่มีใครตายสักคน'}],['ไม่สนใจ','',()=>{hp(-.3);S.money=Math.round((S.money||0)*.6);return'🌊 น้ำป่าพาบ้านคุณไปครึ่งหลัง'}]]],
     ['🎐 กระดิ่งหาย','ตื่นมากระดิ่งในดวงจิตเงียบผิดปกติ',[['ออกตามหาเสียง','',()=>{G().lv=Math.min(100,G().lv+2);return'🎐 คุณเจอเสียงกระดิ่งติดอยู่ในเปลือกหอยที่ชายหาด ระดับจิต +2'}],['รอให้กลับมาเอง','',()=>'🎐 สามวันต่อมากระดิ่งดังอีกครั้ง เหมือนไม่เคยหายไป']]]]});

// ---------- กลไก: ค่าคงที่ของ _sv100 รองรับฟังก์ชัน ----------
const fv=v=>typeof v==='function'?v():v;
// เพิ่ม risk/hurt/dodge แบบฟังก์ชันเข้าไปในรอบ 1 (ซึ่งอ่านเป็นตัวเลข)
const mineR2=()=>{try{const g=G();return(g.dorm&&g.sp.length>1?g.sp.slice(0,1):g.sp).map(s=>R2[s.id]).filter(Boolean)}catch(e){return[]}};
Object.values(R2).forEach(q=>{['risk','hurt','dodge'].forEach(k=>{if(typeof q[k]==='function'){const f=q[k];Object.defineProperty(q,k,{get:()=>{try{return f()}catch(e){return k==='hurt'?1:0}},configurable:true})}})});
// จุดแตกสาย + เหตุการณ์เฉพาะ
const ask=(t,x,opts)=>{let n=0;const me=S;const go=()=>{if(S!==me||!on())return;if(!free()){if(++n<50)setTimeout(go,900);return}choice(t,x,opts)};setTimeout(go,800)};
function r2Year(){const g=G();g.qb=g.qb||{};g.qev=g.qev||{};
 for(const s of g.sp){const q=R2[s.id];if(!q)continue;
  if(q.br&&(!g.qb[s.id]||g.qb[s.id]==='?')&&g.qbp!==S.age&&q.bc&&q.bc(g)){const b=q.br;g.qbp=S.age;ask(b[0],b[1],b[2].map(o=>({t:o[0],s:o[1],f(){g.qb[s.id]=o[2];try{log(o[3],'myth',true);kAdd(`ดวงจิต${SP.find(x=>x[0]===s.id)[2]} แตกสาย: ${o[0]}`)}catch(e){}}})));return}
  if(q.ev&&Math.random()<.3){const L=q.ev.map((e,i)=>[e,s.id+':'+i]).filter(([e,k])=>!g.qev[k]);if(L.length){const[e,k]=L[Math.floor(Math.random()*L.length)];g.qev[k]=S.age;ask(e[0],e[1],e[2].map(o=>({t:o[0],s:o[1],f(){let t='';try{t=o[2]()}catch(x){console.error(x)}if(t)log(t,'')}})));return}}}}
{const _py=passYear;passYear=function(){const a0=S&&S.age,me=S;const r=_py.apply(this,arguments);try{if(on()&&S===me&&S.age!==a0&&S.age>=8)r2Year()}catch(e){console.error('sv r2',e)}return r}}
window._sv130={R2,r2Year};
})()}catch(e){console.error('block130',e)}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน soul20 (เดิมอยู่ app.js บรรทัด 44987) · ห่อ: passYear, checkDeath ----
(function(){const SL=globalThis.__wSlots['soul20'];let passYear=SL.base.passYear;let checkDeath=SL.base.checkDeath;
try{(()=>{
const B=window._blk34,Q100=window._sv100;if(!B||!Q100)return;const SP=B.SP;
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.aw===1);
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU);
const LG={lg_fate:'fate',lg_zero:'zero',lg_throne:'throne',lg_other:'other',lg_last:'last'};
const G=()=>S.sv;
const add=(id,ic,n,t,d,tx,q)=>{if(SP.some(x=>x[0]===id))return;SP.push([id,ic,n,t,'👑 หนึ่งเดียวในแผ่นดิน · '+d+' · ⚙️ '+tx,3,null]);Q100.Q[id]=q};
add('lg_fate','📕','สมุดชะตาเปล่า','sup','สมุดที่ทุกหน้าว่างเปล่า จนกว่าคุณจะเขียนลงไป','ดวลแรง 2 เท่า · ทุกสิบปีได้เขียนชะตาตัวเองหนึ่งบรรทัด',{m:()=>2,yr:g=>{if(S.age%10===0&&g.qfw!==S.age){g.qfw=S.age;fateWrite()}}});
add('lg_zero','0️⃣','ศูนย์','ctrl','วงกลมว่างที่กลืนทุกอย่างให้เหลือศูนย์','ดวลแรง 2.4 เท่า · หลอมวงแหวนเกินขีดไม่เคยพลาด',{m:()=>2.4,risk:1});
add('lg_throne','🪑','บัลลังก์ว่าง','atk','เก้าอี้หินที่ไม่เคยมีใครนั่งได้ครบหนึ่งวัน','ดวลแรง 1.8 เท่า · ทุกปีชื่อเสียง +100 และเงินงอกเงย 2%',{m:()=>1.8,yr:()=>{S.fame=(S.fame||0)+100;S.money=(S.money||0)+Math.round((S.money||0)*.02)}});
add('lg_other','🌐','อีกโลกหนึ่ง','agi','ลูกแก้วที่ข้างในมีโลกอีกใบ และมีคุณอีกคนมองออกมา','ดวลแรง 2 เท่า · รอดจากความตายตอนหลอมวงแหวนได้แน่นอนหนึ่งครั้ง · ปัญญา +2 ทุกปี',{m:()=>2,dodge:1,yr:()=>{S.int=(S.int||0)+2}});
add('lg_last','⌛','นาทีสุดท้ายของจักรวาล','atk','เม็ดทรายเม็ดสุดท้ายของนาฬิกาที่นับถอยหลังให้ทั้งจักรวาล','ยิ่งแก่ยิ่งแรง (1.5 ถึง 3.5 เท่า) · อายุขัย +1 ทุกปี',{m:()=>1.5+Math.min(2,S.age/100),yr:()=>{S.lifespan=(S.lifespan||60)+1}});
function fateWrite(){let n=0;const me=S;const go=()=>{if(S!==me||!on())return;if(!free()){if(++n<40)setTimeout(go,900);return}
 choice('📕 หน้าว่างของสมุดชะตา','สิบปีผ่านไป สมุดชะตาเปิดหน้าใหม่ให้คุณเขียนได้หนึ่งบรรทัด หมึกแห้งแล้วลบไม่ได้',[
  {t:'⏳ "ข้าจะมีชีวิตอีกยี่สิบปี"',s:'อายุขัย +20',f(){S.lifespan=(S.lifespan||60)+20;log('📕 ตัวหนังสือซึมลงกระดาษ คุณรู้สึกว่าหัวใจเต้นช้าลงอย่างสบาย','myth',true)}},
  {t:'⚔️ "ข้าจะแข็งแกร่งกว่านี้"',s:'พลังยุทธ์ +30%',f(){const v=Math.round(S.power*.3);S.power+=v;log(`📕 หมึกร้อนจนกระดาษไหม้เป็นรู พลังยุทธ์ +${fmt(v)}`,'myth',true)}},
  {t:'🩹 "คนที่ข้ารักจะไม่เจ็บป่วย"',s:'ครอบครัวอายุขัย +10',f(){(S.parents||[]).concat(S.children||[]).forEach(p=>{if(p&&p.alive!==false&&p.life)p.life+=10});if(S.spouse&&S.spouse.life)S.spouse.life+=10;log('📕 คุณเขียนชื่อทุกคนลงไปจนหน้ากระดาษเต็ม','myth',true)}}])};setTimeout(go,900)}
const has=()=>{try{return(G().sp||[]).map(s=>s.id).filter(id=>LG[id])}catch(e){return[]}};
const swapOut=(id,why)=>{const g=G(),ix=g.sp.findIndex(s=>s.id===id);if(ix<0)return;const L=SP.filter(x=>x[5]===3&&!LG[x[0]]);const p=L[Math.floor(Math.random()*L.length)];g.sp[ix]={id:p[0],rev:0};log(`🕯️ แสงของ${SP.find(x=>x[0]===id)[2]}ดับลงกลางพิธี — ${why} · ดวงจิตที่ตื่นขึ้นแทนคือ ${p[1]} <b>${p[2]}</b>`,'epic',true)};
let busy=0;
async function claimChk(){if(busy||!on())return;const g=G();g.lgOk=g.lgOk||{};const L=has().filter(id=>!g.lgOk[id]);if(!L.length)return;busy=1;const me=S;
 for(const id of L){let j=null;try{if(typeof onlineOK!=='undefined'&&!onlineOK)throw new Error('off');j=await api('svlg',{o:'claim',k:LG[id],n:S.name})}catch(e){j={ok:0,err:'off'}}
  if(S!==me)break;
  if(j&&j.ok){g.lgOk[id]=Date.now();const p=SP.find(x=>x[0]===id);log(`👑 <b>${p[1]} ${p[2]}</b> ยอมรับคุณเป็นเจ้าของ — ทั้งแผ่นดินมีได้คนเดียว ชื่อคุณถูกประกาศให้ทุกคนรู้`,'myth',true);try{kAdd('ได้ครองดวงจิตตำนาน《'+p[2]+'》')}catch(e){}}
  else swapOut(id,j&&j.err==='taken'?`ดวงจิตนี้มีเจ้าของอยู่แล้ว (${esc(j.n||'ใครบางคน')})`:'ต้องเชื่อมต่อออนไลน์ ดวงจิตตำนานจึงจะยอมรับเจ้าของ')}
 busy=0;try{render();saveGame()}catch(e){}}
let lastBeat=0;
async function beat(){if(!on()||Date.now()-lastBeat<10*60e3)return;const g=G();const L=has().filter(id=>g.lgOk&&g.lgOk[id]);if(!L.length)return;lastBeat=Date.now();
 for(const id of L){try{const j=await api('svlg',{o:'beat',k:LG[id]});if(j&&!j.ok&&j.err==='taken'){delete g.lgOk[id];swapOut(id,'คุณหายไปนานเกินไป ดวงจิตตำนานไปเลือกคนอื่นแล้ว')}}catch(e){}}}
setInterval(()=>{try{if(on()&&free())claimChk()}catch(e){}},2500);
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{beat()}catch(e){}return r}}
// ตาย → คืนดวงจิตสู่ฟ้า
{const _cd=checkDeath;checkDeath=function(){const me=S,L0=(()=>{try{return S&&S.sv&&S.sv.lgOk?has().filter(id=>S.sv.lgOk[id]):[]}catch(e){return[]}})(),why=(S&&S.deathCause)||'';const r=_cd.apply(this,arguments);
 try{if(L0.length&&me&&!me.alive){L0.forEach(id=>{api('svlg',{o:'rel',k:LG[id],w:why?String(why).slice(0,50):''}).catch(()=>{})});me.sv.lgOk={}}}catch(e){}return r}}
// สมุดดวงจิต: ใครถือดวงจิตตำนานอยู่ตอนนี้
{const _ob=window.openSoulBook;if(_ob)window.openSoulBook=function(){const r=_ob.apply(this,arguments);try{const m=$('modal');const h=m&&m.querySelector('h3');if(h){h.insertAdjacentHTML('afterend','<div class="item" id="svLgBox"><b>👑 ดวงจิตตำนานในแผ่นดินตอนนี้</b><br><span class="tag2">กำลังโหลด…</span></div>');
 api('svlg').then(j=>{const b=$('svLgBox');if(!b||!j||!j.L)return;const N={fate:'lg_fate',zero:'lg_zero',throne:'lg_throne',other:'lg_other',last:'lg_last'};b.innerHTML='<b>👑 ดวงจิตตำนานในแผ่นดินตอนนี้</b><br>'+j.L.map(x=>{const p=SP.find(y=>y[0]===N[x.k]);return`${p?p[1]+' '+p[2]:x.k} — ${x.n?(x.me?'<b>คุณ</b>':'<b>'+esc(x.n)+'</b>'):'<span class="tag2">ว่าง รอเจ้าของ</span>'}`}).join('<br>')+'<br><span class="tag2">ทั้งแผ่นดินมีได้ตัวละคนเดียว · ได้มาตอนปลุกดวงจิตในโหมดจิตวิญญาณยุทธ์ (ต้องออนไลน์) · ผู้ถือตายหรือหายไป 3 วัน ดวงจิตจะว่างอีกครั้ง</span>'}).catch(()=>{const b=$('svLgBox');if(b)b.innerHTML='<b>👑 ดวงจิตตำนาน</b><br><span class="tag2">ต้องออนไลน์จึงจะเห็นว่าใครครองอยู่</span>'})}}catch(e){}return r}}
window._sv133={LG,claimChk,beat};
})()}catch(e){console.error('block133',e)}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.checkDeath=checkDeath;checkDeath=function(){return globalThis.checkDeath.apply(this,arguments)};})();

// ---- ท่อน soul21 (เดิมอยู่ app.js บรรทัด 46127) · ห่อ: chStart, openSoul, openMenu ----
(function(){const SL=globalThis.__wSlots['soul21'];let chStart=SL.base.chStart;let openSoul=SL.base.openSoul;let openMenu=SL.base.openMenu;const __G={chStart:()=>chStart,openSoul:()=>openSoul,openMenu:()=>openMenu},__S={chStart:v=>{chStart=v},openSoul:v=>{openSoul=v},openMenu:v=>{openMenu=v}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\[native code\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});

try{(()=>{
const B=window._blk34;if(!B)return;const $$=id=>document.getElementById(id);
const inSoul=()=>!!(S&&S.alive&&S.ch==='soul');
const SAFE=[1,1,2,2,2,3,3,3,3,4];
function html(){const G=S&&S.sv||{},T=B.TIER,aw=G.aw,age=S?S.age:0;
 const now=!S||S.ch!=='soul'?'':aw===1?`<div class="svHn">📍 ตอนนี้: ปลุกแล้ว · ระดับจิต <b>${G.lv}</b> · วงแหวน ${(G.rings||[]).length}/9${G.lv>=B.capOf(G)&&B.capOf(G)<100?' · <b>ถึงคอขวดแล้ว ต้องหลอมวงแหวน</b>':''}</div>`
  :aw===2?`<div class="svHn">📍 ตอนนี้: <b>ไร้ดวงจิต</b> — ลูกแก้วไม่เรืองแสง เลือกเส้นทางของคนไร้ดวงจิตแทนได้</div>`
  :`<div class="svHn">📍 ตอนนี้: อายุ ${age} ปี · ${age<6?`อีก <b>${6-age} ปี</b> ถึงพิธีปลุกดวงจิต`:'พิธีปลุกดวงจิตจะขึ้นมาเร็วๆ นี้'}</div>`;
 const ring=i=>`วงที่ ${i+1} ปลอดภัยถึง ${T[SAFE[i]][1]} ${T[SAFE[i]][0]}`;
 return`<button class="xbtn" onclick="closeM()">✕</button><h3>⭕ ปลุกดวงจิตยังไง</h3>${now}
 <div class="svHs"><b>1 · อายุ 6 ขวบ ปลุกเองอัตโนมัติ</b><span>ไม่ต้องกดอะไร ปล่อยให้เวลาเดินไป พอครบ 6 ขวบ พิธีปลุกดวงจิตจะเด้งขึ้นมาเอง แล้วเลือกว่าจะ <b>✊ ตั้งใจเป็นผู้ฝึกจิต</b> (ฝึกเร็ว) หรือ <b>🏡 ใช้ชีวิตธรรมดาไปก่อน</b> (ฝึกช้าลง 4 ปีแรก)</span></div>
 <div class="svHs"><b>2 · ได้ดวงจิตแบบสุ่ม</b><span>ส่วนใหญ่ได้ 1 ดวง (5% ได้ดวงจิตคู่) · ความหายาก ธรรมดา → หายาก → ล้ำค่า → ตำนาน · มี 5 สาย ⚔️ โจมตี · 🛡️ ป้องกัน · 🌿 สนับสนุน · 🌀 ควบคุม · 💨 ว่องไว · ดวงจิตที่ดูไร้ค่าบางดวงมีร่างแท้ซ่อนอยู่ · บางคนลูกแก้วไม่เรืองแสงเลย (ไร้ดวงจิต)</span></div>
 <div class="svHs"><b>3 · ระดับจิตขึ้นเองทุกปี</b><span>เริ่มที่ระดับ 1–10 ตามความหายาก · พรสวรรค์ดีขึ้นเร็วกว่า · ดูได้ที่ปุ่ม ⭕ ใต้แถบสถานะ หรือ ☰ เมนู → ⭕ ดวงจิตและวงแหวน</span></div>
 <div class="svHs"><b>4 · ทุก 10 ระดับคือคอขวด ต้องหลอมวงแหวน</b><span>ตั้งแต่อายุ 8 ปี เมื่อถึงคอขวด เกมจะชวน <b>🏹 ออกล่าวงแหวน</b> เอง (หรือกดในหน้า ⭕ ดวงจิต) · ชนะสัตว์อสูรแล้วได้วงแหวนและท่าใหม่ · ${ring(0)} · ${ring(2)} · ${ring(5)} · วงแหวนแก่เกินขีด แรงกว่าแต่เสี่ยงบาดเจ็บหนักหรือตาย</span></div>
 <div class="svHs"><b>5 · ครบ 9 วง ระดับ 100</b><span>ไต่จาก ${B.RANK[0]} ไปจนถึง ${B.RANK[B.RANK.length-1]}</span></div>
 <p class="tag2" style="margin:8px 2px 0">💡 ผู้ข้ามโลกที่มาถึงทวีปนี้ได้ดวงจิตทันทีตอนแตะลูกแก้ว ไม่ต้องรอ 6 ขวบ</p>
 <button class="pbtn" style="width:100%;margin-top:10px" onclick="closeM()">เข้าใจแล้ว</button>`}
const css=document.createElement('style');css.textContent=`.svHn{margin:2px 0 10px;padding:8px 10px;border-radius:10px;background:#b47bff22;border:1px solid #b47bff66;font-size:13px;line-height:1.5}
.svHs{display:block;margin:0 0 8px;padding:9px 11px;border-radius:12px;background:#0002;border:1px solid #ffffff14;line-height:1.55}.svHs>b{display:block;font-size:14px;margin-bottom:2px}.svHs span{font-size:12.5px;opacity:.92}
#svCd{margin-right:6px;border-color:#b47bff!important;background:linear-gradient(180deg,#2a1a4a,#4a2a7a)!important}`;document.head.appendChild(css);
window.svHelp=function(){modal(html(),'svhelp')};
// ครั้งแรกที่เริ่มชีวิตในทวีป
{const _cs=chStart;chStart=function(){const r=_cs.apply(this,arguments);try{if(S&&S.ch==='soul'){setTimeout(()=>{try{log('❓ <b>เพิ่งมาทวีปนี้?</b> <button class="sysb" onclick="svHelp()">ดูวิธีปลุกดวงจิต</button>','sum')}catch(e){}},1400);if(!LS.get('murim_svhelp',0)){LS.set('murim_svhelp',1);let n=0;const t=setInterval(()=>{n++;if(n>40)return clearInterval(t);if(!inSoul()||modalOpen||choice._cur)return;clearInterval(t);svHelp()},700)}}}catch(e){}return r}}
// หลังพิธีปลุก: บอกขั้นต่อไป
let lastAw=null;setInterval(()=>{try{if(!inSoul()||!S.sv)return;const a=S.sv.aw;if(lastAw===null){lastAw=a;return}if(a!==lastAw){const prev=lastAw;lastAw=a;if(a===1&&!prev&&!S.sv.helpN){S.sv.helpN=1;setTimeout(()=>{try{log(`⭕ <b>ต่อจากนี้:</b> ระดับจิตขึ้นเองทุกปี · ถึงคอขวดทุก 10 ระดับ (ระดับตอนนี้ ${S.sv.lv}) ตั้งแต่อายุ 8 เกมจะชวนออกล่าวงแหวน · ดูทุกอย่างที่ปุ่ม ⭕ <button class="sysb" onclick="svHelp()">อ่านวิธีฝึก</button>`,'sum')}catch(e){}},1500)}}}catch(e){}},800);
// ป้ายนับถอยหลังก่อนถึงวัยปลุก (ใช้ที่เดียวกับปุ่ม ⭕ หลังปลุก)
setInterval(()=>{try{let b=$$('svCd');const show=inSoul()&&S.sv&&!S.sv.aw&&$$('game').classList.contains('on');if(!show){if(b)b.style.display='none';return}
 if(!b){const a=$$('svPill')||$$('brkPill')||$$('ascPill');if(!a)return;a.insertAdjacentHTML('afterend','<button id="svCd" class="ascpill" onclick="svHelp()"></button>');b=$$('svCd')}
 const t=S.age<6?`⭕ ปลุกดวงจิตอีก ${6-S.age} ปี · ❓`:'⭕ ใกล้ถึงพิธีปลุกดวงจิต · ❓';if(b.textContent!==t)b.textContent=t;b.style.display=''}catch(e){}},1000);
// ปุ่มในหน้าดวงจิต + เมนู (เห็นตั้งแต่ก่อนปลุก)
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{const m=$$('modal');if(m&&!m.querySelector('.svHB')&&S&&S.ch==='soul')m.insertAdjacentHTML('beforeend','<button class="gbtn svHB" style="width:100%;margin-top:6px" onclick="svHelp()">❓ ปลุกดวงจิตและฝึกยังไง</button>')}catch(e){}return r};try{openSoul=window.openSoul}catch(e){}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(inSoul()){const g=$$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.svM')&&!g.querySelector('.svMH'))g.insertAdjacentHTML('afterbegin','<button class="opt svMH" onclick="closeM();openSoul()">⭕ ดวงจิตและวงแหวน<small>ยังไม่ปลุก · ❓ วิธีปลุกดวงจิต</small></button>')}}catch(e){}return r}}
try{SYS_GUIDE.push({s:'world',ic:'⭕',t:'ปลุกดวงจิต (ทวีปจิตวิญญาณยุทธ์)',d:'อายุ 6 ขวบ พิธีปลุกดวงจิตขึ้นเองอัตโนมัติ · ได้ดวงจิตสุ่ม 5 สาย 4 ความหายาก · ระดับจิตขึ้นเองทุกปี · ทุก 10 ระดับต้องหลอมวงแหวน (เกมชวนออกล่าเองตั้งแต่อายุ 8) · วงแหวนแก่เกินขีดเสี่ยงตาย · ผู้ข้ามโลกได้ดวงจิตทันที',go:'svHelp',nw:1})}catch(e){}
})()}catch(e){console.error('block158',e)}
__done=1;SL.impl.chStart=chStart;chStart=function(){return globalThis.chStart.apply(this,arguments)};SL.impl.openSoul=openSoul;openSoul=function(){return globalThis.openSoul.apply(this,arguments)};SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน soulgod: 🌌 ภพเทพแห่งทวีป (หลังเลือก "ก้าวสู่ภพเทพ") ----
// เป็นเทพคือการรับตำแหน่ง · ขั้นเทพ 4 ขั้น · แสงศรัทธา = เงิน + ลมหายใจ · ตอบคำอธิษฐาน · อาณาเขต · ผู้สืบทอด · กฎห้ามแทรกแซง · ร่างโลกล่าง
// สภาเทพ · เนื้อเรื่องหลัก 5 บท · เหตุการณ์ดราม่า · ประตูสู่โลกอื่น · พรเทพ (BLOCK 186 ใน app.js)
// สถานะ S.sv.gd · ห่อ passYear (ข้ามวงจรเดิมทั้งหมดระหว่างเป็นเทพ) / render / drawScene / sceneCap / openMenu
try{(()=>{
const rnd=Math.random,pick=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),Ri=(a,b)=>a+Math.floor(rnd()*(b-a+1)),shuf=a=>a.slice().sort(()=>rnd()-.5);
const O=(t,s,f,ai)=>({t,s:s||'',f,ai:ai==null?.3:ai});
const GD=()=>{try{const G=S&&S.sv&&S.sv.gd;return G&&G.on&&(G.line==null||G.line===S.line)?G:null}catch(e){return null}};
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&GD());
const free=()=>!(choice._cur||modalOpen);
const say=(t,c,b)=>log(t,c||'',b);
// ระหว่างเป็นเทพ เหตุการณ์เดิมของทวีป (สถาบัน ทีม ศัตรูหลายตอน ฯลฯ) ไม่ขึ้นอีก · ยอมให้เฉพาะเหตุการณ์ของภพเทพและพรเทพ/พบผู้เล่น
const C=(...a)=>{window._sgC=1;try{return choice(...a)}finally{window._sgC=0}};
const SG_OK=/คำอธิษฐานจากโลกล่าง|รอยต่อโลก|รับพรไม่ไหว|ตั้งตัวเป็นเทพ|พบผู้เล่นจริง|พบตำนาน|ห้องพบกัน/;
{const _ch=choice;const nf=function(title){try{if(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.gd&&S.sv.gd.on&&!window._sgC&&!SG_OK.test(String(title)))return}catch(e){}return _ch.apply(this,arguments)};for(const k in _ch)nf[k]=_ch[k];choice=nf}
// ---------- ข้อมูล ----------
const DOM={duel:['⚔️','เทพแห่งการประลอง','atk','นักสู้ทั่วทวีปกระซิบชื่อคุณก่อนขึ้นลานประลอง'],gate:['🛡️','เทพผู้เฝ้าประตู','def','ทุกประตูเมืองและประตูบ้านแขวนสัญลักษณ์ของคุณ'],heal:['🌿','เทพแห่งการเยียวยา','sup','คนป่วยและคนบาดเจ็บเอ่ยชื่อคุณในยามเจ็บปวด'],bind:['🌀','เทพแห่งพันธนาการ','ctrl','คำสาบานและสัญญาทุกฉบับถูกลงนามต่อหน้าคุณ'],wind:['💨','เทพแห่งสายลมเดินทาง','agi','นักเดินทางและคนหลงทางมองหาคุณบนท้องฟ้า'],beast:['🐾','เทพแห่งสัตว์วิญญาณ',null,'สัตว์วิญญาณร้องเรียกคุณจากป่าลึก'],trash:['🗑️','เทพแห่งดวงจิตที่ถูกทิ้ง',null,'คนที่โลกตัดสินว่าไร้ค่า หันมาหาคุณ']};
const RK=['เทพฝึกหัด','เทพประจำตำแหน่ง','เทพผู้คุมกฎ','ผู้นั่งสภา'];
const RKN=[30,60,110];
const GODS=[['🌅','เทพีแห่งรุ่งอรุณสีชาด'],['✨','เทพผู้นับดวงดาว'],['⚙️','เทพแห่งเหล็กไม่ขึ้นสนิม'],['💧','เทพีแห่งน้ำตาที่ไม่ไหล'],['🌑','เทพผู้กินความกลัว'],['🗡️','เทพแห่งการฆ่า']];
const BLD={tem:['🏛️','วิหาร','ผู้ศรัทธา +1 ต่อรูปปั้นที่อยู่ติดกัน'],sta:['🗿','รูปปั้น','ต้องอยู่ติดวิหารถึงจะมีผล'],gar:['🌳','สวนเทพ','ค่าดูแลศรัทธา −2 ต่อวิหารที่อยู่ติดกัน'],tow:['🗼','หอเฝ้า','อยู่มุมเกาะ: ลดความเสียหายจากภัย'],are:['⚔️','ลานประลอง','อยู่ติดหอเฝ้า: พลังเพิ่มทุกปี'],fou:['⛲','น้ำพุ','อยู่กลางเกาะ: พลังชีวิตฟื้นทุกปี']};
// ---------- สถานะ ----------
function sgInit(dom){const g=S.sv;g.gd={on:1,line:S.line,y0:S.age,y:0,dom,rk:0,fa:80,fol:18,fade:0,ru:0,mer:0,isl:Array(9).fill(''),bld:{tem:1,sta:1,gar:1},heir:null,arc:0,arcY:S.age+3,gods:GODS.map(x=>({ic:x[0],n:x[1],rel:0,al:1})),lat:[],dn:{},prY:-1,gateY:-1,lv:S.spouse?{n:S.spouse,y:S.age}:null,end:null};return g.gd}
const isl=G=>{const I=G.isl,adj=i=>[i-3,i+3,i%3?i-1:-1,i%3<2?i+1:-1].filter(j=>j>=0&&j<9);let fol=0,up=0,pw=0,hp=0,def=0;
 I.forEach((b,i)=>{if(b==='tem')fol+=adj(i).filter(j=>I[j]==='sta').length;if(b==='gar')up+=2*adj(i).filter(j=>I[j]==='tem').length;if(b==='tow'&&[0,2,6,8].includes(i))def++;if(b==='are'&&adj(i).some(j=>I[j]==='tow'))pw++;if(b==='fou'&&i===4)hp=1});return{fol,up,pw,hp,def}};
window._sgFaith=(n,why)=>{const G=GD();if(!G)return'';G.fa+=n*3;if(n>=3)G.fol++;return` · 🌟 ศรัทธา +${n*3}`};
const fa=(n)=>{const G=GD();if(!G)return'';G.fa=Math.max(0,G.fa+n);return` · 🌟 ${n>=0?'+':''}${n}`};
const fol=(n)=>{const G=GD();if(!G)return'';G.fol=Math.max(0,G.fol+n);return n?` · 🙏 ผู้ศรัทธา ${n>0?'+':''}${n}`:''};
const ru=(why)=>{const G=GD();G.ru++;return` · ⚖️ ผิดกฎสวรรค์ (${G.ru}/3)`};
const later=(dy,k,a)=>GD().lat.push([S.age+dy,k,a]);
// จบชีวิตเทพตามทางที่เลือก (ไม่ผ่านระบบกันตาย เพราะไม่ใช่ความตาย)
function endLife(cause){setTimeout(()=>{try{if(!S||!S.alive)return;const G=GD();if(G)G.on=0;S.deathCause=cause;try{flushReveal()}catch(e){}S.alive=false;S.cause=cause;try{saveLegacy()}catch(e){}try{clearSave()}catch(e){}try{setScene('aura');sfx('good')}catch(e){}log('🌌 '+cause,'myth');try{keyAdd(`${S.age} ปี — ${cause}`)}catch(e){}const dn=S;setTimeout(()=>{if(S===dn){try{choice._cur=null;closeM()}catch(e){}endGame()}},1800)}catch(e){console.error('sg end',e)}},600)}
// ---------- เริ่มเป็นเทพ ----------
function sgStart(){const g=S.sv;if(g.gd)return;const ty=(window._svTy&&window._svTy(g))||'atk',L=Object.keys(DOM).filter(k=>DOM[k][2]===ty);
 const rest=shuf(Object.keys(DOM).filter(k=>DOM[k][2]&&DOM[k][2]!==ty)).slice(0,2);let opts=L.concat(rest);
 if((g.spared||[]).length>=5)opts.push('beast');try{const r=window._blk34.spNow(g.sp[0]).r;if(r===0)opts.push('trash')}catch(e){}
 C('🌌 ภพเทพแห่งทวีป',`แสงพาคุณขึ้นมาถึงลานหินอ่อนเหนือเมฆ สภาเทพหกองค์นั่งรออยู่ ไม่มีใครยิ้ม<br>“ที่นี่ไม่ใช่สวรรค์ ที่นี่คือที่ทำงาน — เลือกตำแหน่งของเจ้า แล้วดูแลมันให้ดี เทพที่ไม่มีใครเอ่ยชื่อจะจางหายไป”<br><span class="tag2">ตำแหน่งกำหนดว่าใครจะอธิษฐานถึงคุณ · ทุกตำแหน่งมีที่นั่งจำกัด</span>`,opts.map(k=>{const D=DOM[k];return O(`${D[0]} ${D[1]}`,D[3],()=>{const G=sgInit(k);say(`${D[0]} <b>คุณรับตำแหน่ง${D[1]}</b> — ${RK[0]} · ${D[3]}`,'myth',true);try{island({big:1,ic:D[0],h:'ภพเทพแห่งทวีป',t:D[1],kind:'gold',ms:5000})}catch(e){}try{keyAdd(`${S.age} ปี — ขึ้นภพเทพ รับตำแหน่ง${D[1]}`)}catch(e){}
  if(G.lv)say(`💔 ${esc(G.lv.n)}ยังอยู่ในทวีปเบื้องล่าง ตั้งแต่คืนนี้ คุณมองเห็นเขาได้ แต่แตะต้องไม่ได้อีกแล้ว`,'myth');
  try{gbCross('soul','sg')}catch(e){}render();saveGame()},k===L[0]?.6:.2)}))}
// ---------- วงจรรายปีของเทพ ----------
function sgYear(){const G=GD();S.age++;G.y++;const I=isl(G),up=Math.max(2,8+G.rk*6-I.up),inc=Math.round(G.fol*(1+G.rk*.25)*.6);
 G.fa+=inc-up;G.fol=Math.max(0,G.fol+I.fol*(rnd()<.5?1:0)-(G.arc>=2?Ri(1,3):Ri(0,1)));
 if(I.pw)S.power=(S.power||0)+pctPow(.01*I.pw);S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*(I.hp?.2:.08)));
 if(G.fa<=0){G.fa=0;G.fade++;say(`🌫️ <b>แสงของคุณจางลง</b> — ไม่มีใครเอ่ยชื่อคุณพอจะประคองร่างเทพไว้ (${G.fade}/4)`,'bad',true);if(G.fade>=4){endLife('จางหายไปจากภพเทพ เพราะไม่มีใครในทวีปเอ่ยชื่อคุณอีกแล้ว');return}}else G.fade=0;
 if(G.ru>=3){G.ru=0;if(G.rk>0){G.rk--;say(`⚖️ <b>สภาลงโทษ</b> — คุณแทรกแซงโลกล่างเกินกว่าที่กฎยอม ถูกลดขั้นเป็น${RK[G.rk]}${fa(-20)}`,'bad',true)}else say(`⚖️ <b>สภาลงโทษ</b> — ถูกยึดแสงศรัทธาครึ่งหนึ่ง${fa(-Math.round(G.fa/2))}`,'bad',true)}
 if(S.age>=lifeMax()&&!S.deathCause)S.deathCause=pick(['หลับไปบนบัลลังก์เมฆ แสงสุดท้ายโปรยลงทวีปเป็นฝนดาว','ส่งต่อตำแหน่งแล้วสลายเป็นแสงในวิหารของตัวเอง']);
 if(!S.deathCause){const due=G.lat.filter(x=>x[0]<=S.age);G.lat=G.lat.filter(x=>x[0]>S.age);let q=due.map(x=>()=>(LAT[x[1]]||(()=>{}))(G,x[2]));q.push(()=>sgEvent(G));run(q)}
 render();checkDeath();saveGame()}
function run(q){const go=()=>{if(!on()||!q.length)return;if(!free())return setTimeout(go,600);const f=q.shift();try{f()}catch(e){console.error('sg ev',e)}if(q.length)setTimeout(go,700)};setTimeout(go,300)}
function sgEvent(G){
 if(G.rk<3&&G.fol>=RKN[G.rk]&&!G.dn['vote'+G.rk])return vote(G);
 if(S.age>=G.arcY&&G.arc<5)return arc(G);
 if((G.end&&S.age-(G.endY||(G.endY=S.age))>=12)||G.y>=160)return rest(G);
 if(gbNpcTick())return;
 const L=[[3,()=>prayAsk(G)],[1,()=>council(G)],[G.heir?0:(G.y>=3?2:0),()=>heirPick(G)],[G.heir&&!G.heir.done&&S.age-G.heir.t>=4?2:0,()=>heirTest(G)],[G.heir&&G.heir.tst>=3&&!G.heir.done?3:0,()=>heirEnd(G)],[1,()=>gbNpcEv()],[G.y>=4&&!G.dn.body?1:0,()=>body1(G)],[G.lv&&!G.lv.d&&G.y>=5?1:0,()=>lover(G)],[S.kids&&!G.dn.kin&&G.y>=8?1:0,()=>kin(G)],[G.y>=10&&!G.dn.war?1:0,()=>war(G)],[G.y>=6&&!G.dn.fall?1:0,()=>fallen(G)],[1,()=>bldGain(G)]];
 const W=L.reduce((a,x)=>a+x[0],0);let r=rnd()*W;for(const x of L){if((r-=x[0])<0)return x[1]()}}
// ---------- ขึ้นขั้นด้วยมติสภา ----------
function vote(G){G.dn['vote'+G.rk]=1;const al=G.gods.filter(x=>x.al),yes=al.filter(x=>x.rel>=0).length,need=Math.ceil(al.length/2),nx=RK[G.rk+1];
 C(`📜 สภาลงมติ: ${nx}`,`ผู้ศรัทธาของคุณถึง ${G.fol} คนแล้ว สภาเปิดประชุมว่าจะให้คุณขึ้นเป็น<b>${nx}</b>หรือไม่<br>${al.map(x=>`${x.ic} ${x.n}: ${x.rel>=0?'เอนเอียงเห็นด้วย':'ไม่ไว้ใจคุณ'}`).join('<br>')}<br><span class="tag2">ต้องได้ ${need} เสียงจาก ${al.length}</span>`,[
  O('🙇 รอฟังผลอย่างสงบ',`ตอนนี้มีราว ${yes} เสียง`,()=>{if(yes>=need)up(G);else{G.dn['vote'+G.rk]=0;G.fol-=5;say(`📜 มติไม่ผ่าน ${yes}/${need} — ลองใหม่เมื่อผู้ศรัทธามากกว่านี้`,'bad')}},.5),
  O('🌟 จ่ายแสงศรัทธาให้เทพที่ลังเล','ศรัทธา −40 · ได้เสียงเพิ่ม 2',()=>{if(G.fa<40){G.dn['vote'+G.rk]=0;return say('📜 แสงของคุณไม่พอจะซื้อใจใคร','bad')}G.fa-=40;if(yes+2>=need)up(G);else{G.dn['vote'+G.rk]=0;say('📜 ยังไม่พอ','bad')}},.3),
  O('⚔️ ท้าชิงที่นั่งจากเทพที่คัดค้าน','ดวลกับเทพในสภา',()=>{const foe=al.find(x=>x.rel<0)||pick(al);duel(foe.n,Math.round(total()*(1.1+G.rk*.15)),w=>{if(w){foe.rel=-5;up(G)}else{G.dn['vote'+G.rk]=0;S.hp-=Math.round(S.maxHp*.3);say(`⚔️ ${foe.n}ตีคุณกลับลงไปนั่งที่เดิม`,'bad')}})},.2)])}
function up(G){G.rk++;S.lifespan=(S.lifespan||0)+60;S.power=(S.power||0)+pctPow(.15);say(`📜 <b>คุณขึ้นเป็น${RK[G.rk]}</b> — ${G.rk===3?'ที่นั่งในสภาเป็นของคุณแล้ว':'ตำแหน่งในภพเทพสูงขึ้นอีกขั้น'}`,'myth',true);try{island({big:1,ic:DOM[G.dom][0],h:'ภพเทพ',t:RK[G.rk],kind:'gold',ms:5000})}catch(e){}try{keyAdd(`${S.age} ปี — ขึ้นเป็น${RK[G.rk]}`)}catch(e){}G.bld.tow=(G.bld.tow|0)+1;if(G.rk>=2)G.bld.are=(G.bld.are|0)+1;if(G.rk>=3)G.bld.fou=(G.bld.fou|0)+1}
// ---------- 🙏 ตอบคำอธิษฐาน (มินิเกมจัดสรรศรัทธา) ----------
const PR=[['ชาวนาหมู่บ้านริมแม่น้ำ','ขอฝนหลังแล้งมาสามปี',14,'flood','แม่น้ำล้นตลิ่ง หมู่บ้านข้างล่างที่ไม่ได้ขออะไรจมน้ำ'],['หญิงชราที่สวดถึงคุณทุกเช้า','ขอให้หลานกลับจากสงคราม',10,'good','หลานกลับมาพร้อมเรื่องเล่าว่ามีแสงพาเขาหนีจากสนามรบ'],['ผู้ฝึกจิตหนุ่ม','ขอให้ชนะการสอบเข้าสถาบัน',8,'rival','เด็กที่แพ้เขาในการสอบ ไปเข้าลัทธิมืดแทน'],['พ่อค้าเกลือ','ขอให้กองคาราวานรอดพ้นโจร',12,'good','คาราวานรอด และพ่อค้าสร้างศาลเล็กๆ ให้คุณกลางทาง'],['แม่ทัพแคว้นเหนือ','ขอชัยชนะในศึกชายแดน',20,'war','แคว้นใต้ที่แพ้ เลิกเอ่ยชื่อคุณทั้งแคว้น'],['เด็กหญิงที่แม่ป่วย','ขอให้แม่หายป่วย',9,'good','แม่ของเธอลุกขึ้นมาทำอาหารได้อีกครั้ง'],['นักล่าสัตว์วิญญาณ','ขอให้เจอสัตว์หมื่นปีในป่า',11,'beast','สัตว์หมื่นปีตัวนั้นเป็นแม่ที่มีลูกอ่อน'],['ชายที่ภรรยาตายเมื่อวาน','ขอให้ภรรยาฟื้นจากความตาย',30,'dead','กฎสวรรค์ห้ามคืนชีวิต — แต่เขาไม่รู้'],['เจ้าเมืองชายแดน','ขอให้กำแพงเมืองไม่พังจากคลื่นสัตว์',16,'good','กำแพงยืนหยัด ทั้งเมืองจุดไฟบูชาคุณสามคืน'],['หัวหน้าลัทธิที่แต่งตัวเป็นนักบวช','ขอพลังเพื่อ “ช่วยเหลือคนยากไร้”',15,'cult','พลังนั้นถูกใช้บังคับคนให้เข้าลัทธิ']];
function prayAsk(G){if(G.prY===S.age)return;G.prY=S.age;const P=shuf(PR).slice(0,4),bud=Math.max(10,Math.round(G.fa*.55));
 if(auto){let b=bud;const pk=[];P.slice().sort((a,c)=>a[2]-c[2]).forEach(p=>{if(p[3]!=='dead'&&p[3]!=='cult'&&p[2]<=b){b-=p[2];pk.push(p)}});return prayDo(G,P,pk)}
 const sel=new Set();const draw=()=>{const used=[...sel].reduce((a,i)=>a+P[i][2],0);const el=$('sgPr');if(!el)return;el.innerHTML=P.map((p,i)=>`<button class="sgPc${sel.has(i)?' on':''}" onclick="sgPt(${i})"><b>${p[0]}</b><span>“${p[1]}”</span><small>🌟 ${p[2]}${p[3]==='dead'?' · ⚠️ ผิดกฎสวรรค์':''}</small></button>`).join('')+`<p class="tag2">ใช้ไป ${used}/${bud} · ศรัทธาทั้งหมด ${G.fa}</p>`};
 window.sgPt=i=>{if(sel.has(i))sel.delete(i);else{const used=[...sel].reduce((a,j)=>a+P[j][2],0);if(used+P[i][2]>bud)return toast('แสงศรัทธาไม่พอ');sel.add(i)}draw()};
 window.sgPgo=()=>{closeM();prayDo(G,P,[...sel].map(i=>P[i]))};
 modal(`<button class="xbtn" onclick="sgPgo()">✕</button><h3>🙏 คำอธิษฐานปีนี้</h3><p class="tag2">แสงศรัทธามีไม่พอให้ทุกคำขอ · เลือกว่าจะตอบใคร · ทุกคำตอบมีผลตามมาในอีกไม่กี่ปี บางผลไม่ได้ดีอย่างที่คิด</p><div id="sgPr"></div><button class="pbtn" style="width:100%;margin-top:8px" onclick="sgPgo()">✨ ส่งพรลงไป</button>`,'sgpray');draw()}
function prayDo(G,P,pk){let t=[];pk.forEach(p=>{G.fa-=p[2];const m=DOM[G.dom][2]&&{duel:/แม่ทัพ|ผู้ฝึก/,gate:/กำแพง|เจ้าเมือง/,heal:/ป่วย|ภรรยา/,bind:/ลัทธิ|พ่อค้า/,wind:/คาราวาน|หลาน/}[G.dom];const g=2+(m&&m.test(p[0]+p[1])?2:0);G.fol+=g;t.push(`✨ ${p[0]} (+${g})`);
  if(p[3]==='dead'){G.ru++;t.push(`⚖️ คุณคืนชีวิตให้ภรรยาของเขา — ผิดกฎสวรรค์ (${G.ru}/3)`);later(Ri(2,4),'dead',p)}else if(p[3]==='cult')later(Ri(2,4),'cult',p);else if(p[3]!=='good'||rnd()<.25)later(Ri(1,4),'echo',p);else later(Ri(1,3),'thank',p)});
 const no=P.filter(p=>!pk.includes(p));no.forEach(p=>{G.fol=Math.max(0,G.fol-1)});if(no.length)t.push(`🙉 ไม่ได้ตอบ ${no.length} คำขอ (ผู้ศรัทธา −${no.length})`);
 if(no.some(p=>p[0]==='หญิงชราที่สวดถึงคุณทุกเช้า'))t.push('💔 หญิงชราที่สวดถึงคุณมาหกสิบปี เช้านี้ไม่ได้จุดธูปเป็นครั้งแรก');
 say(`🙏 <b>คุณตอบคำอธิษฐานปีนี้</b><br>${t.join('<br>')||'ไม่มีคำขอใดได้รับคำตอบ'}`,'epic');render()}
const LAT={
 echo:(G,p)=>{const bad={flood:1,rival:1,war:1,beast:1}[p[3]];say(`${bad?'🌊':'🌟'} <b>ผลของคำอธิษฐาน: ${p[0]}</b> — ${p[4]}${bad?fol(-Ri(2,4)):fol(2)}`,bad?'bad':'epic',true)},
 thank:(G,p)=>say(`🌟 ${p[0]}ที่คุณเคยตอบคำขอ — ${p[4]}${fol(1)}${fa(5)}`,'good'),
 dead:(G,p)=>C('💀 คนที่ไม่ควรกลับมา',`ภรรยาของ${p[0]}ที่คุณคืนชีวิตให้ ไม่ใช่คนเดิม เธอไม่กินข้าว ไม่หลับ และเอาแต่ยืนมองฟ้ามาที่ภพเทพทุกคืน<br>สภาส่งคนมาถามว่าใครเป็นคนทำ`,[O('🙇 ยอมรับต่อสภา','ศรัทธา −30 แต่ไม่ผิดกฎเพิ่ม',()=>{G.fa=Math.max(0,G.fa-30);say('🙇 สภาลงบันทึกชื่อคุณไว้ในหน้าที่ไม่มีใครอยากอยู่','bad')},.5),O('🤫 ปฏิเสธ แล้วลงไปแก้เอง',`ผิดกฎอีกครั้ง`,()=>{say(`🤫 คุณลงไปส่งเธอกลับคืนสู่ความตายด้วยมือตัวเอง ชายคนนั้นไม่รู้ว่าคนที่อุ้มภรรยาเขาไปคือเทพที่เขาสวดถึง${ru()}`,'myth',true)},.5)]),
 cult:(G,p)=>C('🕯️ พลังของคุณอยู่ในมือลัทธิ',`หัวหน้าลัทธิที่คุณเคยให้พร ใช้แสงของคุณบังคับคนทั้งหมู่บ้านให้คุกเข่า — ในนามของคุณ`,[O('⚡ ดึงพลังคืน','ผิดกฎสวรรค์ · ผู้ศรัทธา +',()=>say(`⚡ ผู้คนเห็นหัวหน้าลัทธิล้มลงกลางพิธี${ru()}${fol(4)}`,'epic'),.5),O('🌫️ ปล่อยให้คนล่างจัดการเอง','ผู้ศรัทธาลด',()=>say(`🌫️ ลัทธินั้นโตขึ้นทุกปี ชื่อคุณถูกใช้ในแบบที่คุณไม่ได้ตั้งใจ${fol(-6)}`,'bad'),.5)]),
 body2:(G)=>body2(G),body3:(G)=>body3(G),lvd:(G)=>loverEnd(G)};
// ---------- 🏝️ อาณาเขต ----------
window.sgIsle=function(){const G=GD();if(!G)return;let sel=null;const left=k=>(G.bld[k]|0)-G.isl.filter(b=>b===k).length;
 const draw=()=>{const I=isl(G);const g=$('sgIg');if(g)g.innerHTML=G.isl.map((b,i)=>`<button onclick="sgIc(${i})">${b?BLD[b][0]:'·'}</button>`).join('');const s=$('sgIs');if(s)s.innerHTML=Object.keys(BLD).filter(k=>G.bld[k]).map(k=>`<button class="${sel===k?'on':''}" onclick="sgIk('${k}')">${BLD[k][0]} ${BLD[k][1]} ×${left(k)}<small>${BLD[k][2]}</small></button>`).join('');const r=$('sgIr');if(r)r.innerHTML=`ผลตอนนี้: 🙏 ผู้ศรัทธาเพิ่มได้ ${I.fol}/ปี · 🌟 ค่าดูแลลด ${I.up} · 🗼 ป้องกัน ${I.def} · ⚔️ พลัง +${I.pw} · ⛲ ${I.hp?'ฟื้นพลังชีวิต':'—'}`};
 window.sgIk=k=>{sel=sel===k?null:k;draw()};window.sgIc=i=>{if(G.isl[i]){G.isl[i]='';draw();return}if(!sel)return toast('เลือกสิ่งก่อสร้างก่อน');if(left(sel)<=0)return toast('ไม่มีเหลือแล้ว');G.isl[i]=sel;draw()};
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏝️ เกาะลอยฟ้าของคุณ</h3><p class="tag2">แตะสิ่งก่อสร้าง แล้วแตะช่องเพื่อวาง · แตะช่องที่มีของเพื่อเก็บคืน · วางให้ติดกันถูกคู่จะได้โบนัสทุกปี</p><div class="sgIg" id="sgIg"></div><div class="sgIs" id="sgIs"></div><p class="fgVc" id="sgIr"></p>`,'sgisle');draw()};
function bldGain(G){const k=pick(['tem','sta','gar','sta','tem','tow']);G.bld[k]=(G.bld[k]|0)+1;say(`🏝️ ผู้ศรัทธาสร้าง${BLD[k][0]} <b>${BLD[k][1]}</b>ถวายคุณหนึ่งหลัง — ไปจัดวางบนเกาะได้ที่ 🌌 ภพเทพ → 🏝️ อาณาเขต`,'epic');if(auto){const i=G.isl.indexOf('');if(i>=0)G.isl[i]=k}}
// ---------- 📜 ไต่สวนในสภา ----------
const ACC=[['คุณตอบคำอธิษฐานของคนที่เคยฆ่าคน',['คำอธิษฐานนั้นขอให้ลูกของเขาหายป่วย ไม่ได้ขอเพื่อตัวเขาเอง','คนเราเปลี่ยนแปลงได้','สภาก็เคยทำแบบเดียวกัน']],['ศรัทธาในเขตของคุณลดลงสามปีติด แปลว่าคุณไม่ทำหน้าที่',['ศรัทธาลดลงทุกเขตทั่วทวีป ไม่ใช่แค่ของข้า — ดูบันทึกของสภาเอง','ข้ายุ่งอยู่กับเรื่องอื่น','ปีหน้าจะดีขึ้นแน่']],['มีคนเห็นเงาของคุณเดินในโลกล่าง',['เงานั้นเดินกลางวันแสกๆ — เทพลงไปได้แค่ในความฝัน ตามกฎข้อแรกของสภาเอง','ข้าไม่เคยลงไป','คนตาฝาดได้']],['ผู้สืบทอดของคุณใช้พลังเกินขั้น',['พลังนั้นมาจากวงแหวนที่เขาล่าเอง สีวงแหวนเป็นของสัตว์ ไม่ใช่แสงของข้า','เขายังเด็ก','ข้าจะตักเตือนเขา']],['คุณให้พรสัตว์วิญญาณ ซึ่งไม่ใช่ผู้ศรัทธา',['กฎของสภาเขียนว่า “ผู้ที่เอ่ยชื่อเทพ” ไม่ได้เขียนว่า “มนุษย์”','สัตว์ก็มีหัวใจ','มันเป็นเรื่องเล็ก']],['คุณปล่อยให้หมู่บ้านหนึ่งถูกน้ำท่วม',['ฝนนั้นมาจากคำอธิษฐานที่สภาเป็นคนอนุมัติ — ตราของสภาอยู่บนเอกสาร','ข้าไม่รู้ว่าจะท่วม','หมู่บ้านนั้นไม่เคยบูชาข้า']]];
function council(G){const qs=shuf(ACC).slice(0,3),acc=pick(G.gods.filter(x=>x.al));let w=0,i=0;
 const fin=()=>{if(w>=2){acc.rel+=1;G.mer++;G.gods.forEach(x=>{if(x!==acc)x.rel+=rnd()<.5?1:0});say(`📜 <b>สภายกข้อกล่าวหา</b> ${acc.n}นั่งลงอย่างหน้าเสีย เทพองค์อื่นเริ่มมองคุณต่างไป${fa(10)}`,'epic',true)}else{acc.rel-=1;say(`📜 <b>สภาตัดสินว่าคุณผิด</b> ${acc.n}ยิ้มมุมปาก${fa(-25)}`,'bad',true)}};
 const nx=()=>{if(i>=3)return fin();const q=qs[i++],ord=shuf([0,1,2]);C(`📜 ไต่สวนในสภา · ข้อกล่าวหาที่ ${i}/3`,`${acc.ic} <b>${acc.n}</b>: “${q[0]}”<br><span class="tag2">เลือกข้อโต้แย้งที่หักล้างได้จริง ไม่ใช่แค่ฟังดูดี</span>`,ord.map(k=>O(q[1][k],'',()=>{if(k===0){w++;say('📜 ห้องประชุมเงียบไปครู่หนึ่ง')}else say('📜 มีเสียงหัวเราะเบาๆ จากที่นั่งด้านหลัง');nx()},k===0?.6:.2)))};
 say(`📜 ${acc.ic} <b>${acc.n}</b>ยื่นคำกล่าวหาคุณต่อสภา`,'');nx()}
// ---------- 👤 ผู้สืบทอด ----------
const VIR=['ความกล้า','ความเมตตา','ความฉลาด','ความภักดี','ความอดทน'];
function heirPick(G){const CS=[0,1,2].map(i=>({n:(typeof anyName==='function'?anyName():'')||pick(['หลินเยว่','ซูเฉิน','อาหลาน']),r:['ลูกศิษย์ของเพื่อนร่วมทีมเก่า','เด็กกำพร้าที่ดวงจิตเป็นขยะ','ทายาทของคู่แข่งที่คุณเคยเอาชนะ'][i],v:shuf(VIR).slice(0,2),loy:[60,75,35][i],pw:[2,0,4][i]}));
 C('👤 เลือกผู้สืบทอด',`เทพทุกองค์ต้องมีผู้สืบทอดในโลกล่าง คนที่คุณจะฝึกให้พร้อมรับตำแหน่งวันหนึ่ง — หรือวันหนึ่งอาจลุกขึ้นมาแย่งมันไป`,CS.map(c=>O(`👤 ${c.n}`,`${c.r} · คุณยังไม่รู้ว่าเขามีดีด้านไหน`,()=>{G.heir=Object.assign(c,{t:S.age,tst:0,ok:0});say(`👤 คุณปรากฏในความฝันของ<b>${esc(c.n)}</b> ${c.r} “ตั้งแต่วันนี้ เจ้าจะได้ยินเสียงข้า”`,'epic',true)},.33)))}
function heirTest(G){const h=G.heir;h.t=S.age;const opts=shuf(VIR).slice(0,3);
 C(`👤 ออกแบบบททดสอบให้${h.n}`,`ทุกบททดสอบเผยให้เห็นอะไรบางอย่างในตัวเขา ถ้าตรงกับสิ่งที่เขามี เขาจะเติบโต ถ้าไม่ตรง เขาจะเจ็บปวดและเริ่มสงสัยคุณ<br><span class="tag2">ผ่านมาแล้ว ${h.ok}/${h.tst} บท · ความภักดี ${h.loy}</span>`,opts.map(v=>O(`🧪 ทดสอบ${v}`,'',()=>{h.tst++;if(h.v.includes(v)){h.ok++;h.pw+=2;h.loy+=5;say(`🧪 ${esc(h.n)}ผ่านบททดสอบ${v}อย่างงดงาม — คุณได้รู้ว่า${v}คือสิ่งที่เขามี${fol(2)}`,'epic')}else{h.loy-=15;say(`🧪 ${esc(h.n)}ล้มเหลวในบททดสอบ${v} เขาร้องไห้ทั้งคืนและถามท้องฟ้าว่าทำไมคุณถึงทำกับเขาแบบนี้`,'bad')}},.33)))}
function heirEnd(G){const h=G.heir;h.done=1;
 if(h.loy<45){const ep=Math.round(total()*(.6+h.pw*.06));C(`⚔️ ${h.n}ท้าชิงตำแหน่ง`,`${esc(h.n)}ที่คุณเลี้ยงมาขึ้นมาถึงภพเทพด้วยตัวเอง ยืนหน้าสภา “ข้าขอท้าชิงที่นั่งของคนที่ทดสอบข้าเหมือนของเล่น”`,[
   O('⚔️ รับคำท้า','ดวลกับศิษย์ของตัวเอง',()=>duel(h.n,ep,w=>{if(w)say(`⚔️ คุณชนะ ${esc(h.n)}คุกเข่าลง “ข้าแค่อยากให้ท่านมองข้าสักครั้ง”${fa(10)}`,'myth',true);else{G.rk=Math.max(0,G.rk-1);say(`⚔️ <b>ศิษย์ชนะอาจารย์</b> คุณถูกลดเป็น${RK[G.rk]} ${esc(h.n)}นั่งลงในที่ของคุณโดยไม่มองหน้า`,'bad',true)}}),.6),
   O('🕊️ สละตำแหน่งให้เขา','จบชีวิตเทพอย่างสงบ',()=>{G.end='heir';say(`🕊️ คุณลุกจากที่นั่ง ยื่นตราตำแหน่งให้${esc(h.n)} เขามือสั่นตอนรับ`,'myth',true);endLife(`สละตำแหน่งเทพให้${h.n} แล้วสลายเป็นแสงในวิหารของตัวเอง`)},.1)])}
 else{G.fol+=6;S.karma+=10;say(`👤 <b>${esc(h.n)}ขึ้นภพเทพในฐานะผู้สืบทอดของคุณ</b> เขาคุกเข่ากลางลานหินอ่อนแล้วเรียกคุณว่า “อาจารย์” ต่อหน้าสภาทั้งหมด${fol(6)}`,'myth',true);allyAdd(h.n,'ผู้สืบทอดในภพเทพ')}}
// ---------- 🧬 ร่างโลกล่าง (ภารกิจลับ 3 บท) ----------
function body1(G){G.dn.body=1;C('🧬 ร่างโลกล่าง',`มีลัทธิหนึ่งในทวีปบูชา “เทพปลอม” ที่ใช้ชื่อคุณ เทพลงไปตรงๆ ไม่ได้ แต่ส่งเศษวิญญาณไปเกิดเป็นเด็กคนหนึ่งได้<br><span class="tag2">ศรัทธา −30 · เด็กคนนั้นจะไม่รู้ว่าตัวเองคือใคร จนกว่าจะถึงเวลา</span>`,[
 O('🧬 ส่งเศษวิญญาณลงไป','',()=>{if(G.fa<30)return say('🧬 แสงของคุณไม่พอจะแบ่งวิญญาณ','bad');G.fa-=30;G.bd={n:(typeof anyName==='function'?anyName():'')||'อาเฉิน'};later(Ri(3,5),'body2');say(`🧬 คืนนั้นในหมู่บ้านไกลๆ มีเด็กชื่อ<b>${esc(G.bd.n)}</b>เกิดมาพร้อมดวงตาสีทอง`,'myth')},.6),O('ปล่อยไว้','',()=>say('🌫️ ลัทธินั้นโตขึ้นเงียบๆ'+fol(-3)),.4)])}
function body2(G){C(`🧬 ${G.bd.n}อายุสิบขวบ`,`ร่างโลกล่างของคุณเริ่มจำได้ว่าตัวเองมาจากไหน เด็กคนนั้นเพิ่งรู้ว่าแม่บุญธรรมของเขาเป็นนักบวชในลัทธิเทพปลอม`,[O('ให้เขาจำทุกอย่างทันที','เปิดโปงเร็ว แต่แม่บุญธรรมจะถูกลงโทษ',()=>{G.bd.f=1;later(Ri(2,3),'body3');say('🧬 ดวงตาของเด็กเปลี่ยนเป็นสีทองทั้งดวง'+fol(2),'epic')},.5),O('ให้เขาใช้ชีวิตเป็นเด็กต่ออีกหน่อย','',()=>{G.bd.f=0;later(Ri(3,5),'body3');say('🧬 เด็กคนนั้นหัวเราะอยู่ในสวนหลังวัด ไม่รู้ว่าตัวเองคือเทพ','good')},.5)])}
function body3(G){const ep=Math.round(total()*.7);C(`🧬 ${G.bd.n}เผชิญหน้าหัวหน้าลัทธิ`,`หัวหน้าลัทธิรู้แล้วว่าเด็กคนนี้คือใคร เขาจับแม่บุญธรรมของเด็กไว้เป็นตัวประกัน`,[O('⚔️ ปลดผนึกร่างโลกล่าง','ดวล · ชนะแล้วลัทธิล่มสลาย',()=>duel('หัวหน้าลัทธิเทพปลอม',ep,w=>{if(w){G.fol+=12;say(`🧬 <b>แสงสีทองระเบิดออกจากร่างเด็ก</b> ลัทธิเทพปลอมล่มสลายในคืนเดียว${G.bd.f?' แม่บุญธรรมยังรอดและกอดเขาไว้':''}${fol(12)}`,'myth',true)}else say('🧬 ร่างโลกล่างแตกสลาย เศษวิญญาณกลับขึ้นมาหาคุณพร้อมความเจ็บปวด'+fa(-20),'bad',true)}),.6),O('🗣️ ให้เด็กประกาศว่าเทพตัวจริงไม่ต้องการตัวประกัน','',()=>{if(rnd()<.55){G.fol+=8;say('🗣️ ผู้ศรัทธาในลัทธิทิ้งอาวุธทีละคน'+fol(8),'epic',true)}else say('🗣️ ไม่มีใครฟังเด็ก แม่บุญธรรมของเขาไม่รอด'+fol(-4),'bad',true)},.4)])}
// ---------- 💔 ดราม่า ----------
function lover(G){const L=G.lv;L.c=(L.c|0)+1;const age=S.age-L.y;if(L.c>=3||age>=40){L.d=1;return later(0,'lvd')}
 C(`💔 ${L.n}แก่ลงอีกปี`,`จากภพเทพ คุณเห็น${esc(L.n)}นั่งอยู่หน้าบ้านหลังเดิม ผมขาวขึ้นทุกปี ทุกเย็นเขายังวางถ้วยชาสองใบบนโต๊ะ`,[O('🌙 ลงไปหาในความฝัน','ผิดกฎสวรรค์ · เขาจะได้เห็นหน้าคุณ',()=>{say(`🌙 ในฝัน ${esc(L.n)}จับมือคุณแล้วร้องไห้ “ข้ารู้ว่าเจ้ายังมองอยู่”${ru()}`,'myth',true)},.4),O('🌟 แบ่งอายุขัยของเทพให้','ศรัทธา −40 · เขาจะอยู่ได้อีกหลายปี',()=>{if(G.fa<40)return say('🌟 แสงไม่พอ','bad');G.fa-=40;L.y+=15;say(`🌟 คืนนั้น${esc(L.n)}หายจากอาการไอที่เป็นมาทั้งปี`,'epic')},.3),O('👁️ เฝ้ามองอย่างเดียว','',()=>say(`👁️ คุณมองจนเขาเข้าบ้าน แล้วมองต่อจนไฟในบ้านดับ`,''),.3)])}
function loverEnd(G){const L=G.lv;say(`🕯️ <b>${esc(L.n)}จากไปอย่างสงบ</b> ถ้วยชาสองใบยังวางอยู่บนโต๊ะ ใบหนึ่งไม่เคยถูกแตะเลยหลายสิบปี — คุณไม่ได้ร้องไห้ เพราะเทพร้องไห้ไม่ได้ แต่ฝนตกทั่วทวีปเจ็ดวัน`,'myth',true);try{keyAdd(`${S.age} ปี — ${L.n}จากไป`)}catch(e){}}
function kin(G){G.dn.kin=1;C('🙏 คำอธิษฐานจากสายเลือดของคุณ',`หลานของคุณที่ไม่เคยรู้ว่าปู่ย่าเป็นเทพ คุกเข่าอยู่หน้าศาล “ขอให้ลูกสาวของข้าไม่ต้องไปเป็นเจ้าสาวของแม่ทัพแคว้นเหนือ” — การตอบคำขอนี้ต้องเปลี่ยนใจคนในโลกล่าง`,[O('✨ เปลี่ยนใจแม่ทัพ','ผิดกฎสวรรค์',()=>say(`✨ แม่ทัพตื่นขึ้นมาแล้วยกเลิกงานแต่งโดยไม่รู้ว่าทำไม หลานของคุณกอดลูกสาวไว้แน่น${ru()}`,'myth',true),.5),O('💬 ส่งความกล้าให้เด็กสาวเลือกเอง','ไม่ผิดกฎ · ผลไม่แน่นอน',()=>{if(rnd()<.5)say('💬 เด็กสาวหนีงานแต่งไปเข้าสถาบันวิญญาณ'+fol(2),'epic');else say('💬 เด็กสาวพยายามแล้ว แต่ไม่สำเร็จ หลานของคุณเลิกสวดถึงคุณ'+fol(-2),'bad')},.5)])}
function war(G){G.dn.war=1;const foe=G.gods.find(x=>x.n==='เทพแห่งการฆ่า'&&x.al)||pick(G.gods.filter(x=>x.al));let s=0,i=0;const st=['ชายแดนเมฆ','ทะเลดาว','บัลลังก์สภา'];
 const nx=()=>{if(i>=3){if(s>=2){foe.rel=-3;G.fol+=8;say(`⚔️ <b>ชนะสงครามเทพ</b> ${foe.n}ถอยกลับไปในเงา${fol(8)}`,'myth',true)}else{G.fa=Math.max(0,G.fa-40);say(`⚔️ <b>แพ้สงครามเทพ</b> เขตของคุณครึ่งหนึ่งเปลี่ยนไปบูชา${foe.n}${fa(-40)}`,'bad',true)}return}const ph=st[i++];
  C(`⚔️ สงครามระหว่างเทพ · ${ph}`,`${foe.ic} ${foe.n}ประกาศว่าตำแหน่งของคุณกับเขาอยู่ร่วมโลกกันไม่ได้ ผู้ศรัทธาของทั้งสองฝ่ายเริ่มฆ่ากันในโลกล่าง`,[O('⚔️ ปะทะตรงๆ','ดวล',()=>duel(foe.n,Math.round(total()*(1+i*.12)*(1-isl(G).def*.05)),w=>{if(w)s++;nx()}),.5),O('🛡️ ปกป้องผู้ศรัทธาแทนการสู้','ผู้ศรัทธาไม่ลด แต่ยากชนะ',()=>{if(rnd()<.35+isl(G).def*.1)s++;G.fol+=1;nx()},.3),O('🤝 ขอให้สภาไกล่เกลี่ย','ใช้ความสัมพันธ์ในสภา',()=>{const al=G.gods.filter(x=>x.rel>=1).length;if(al>=2)s++;nx()},.2)])};nx()}
function fallen(G){G.dn.fall=1;const g=pick(G.gods.filter(x=>x.al&&x.n!=='เทพแห่งการฆ่า'));g.al=0;
 C('🍂 เทพที่ถูกริบตำแหน่ง',`${g.ic} ${g.n}ถูกสภาริบตำแหน่งเพราะแอบช่วยมนุษย์ เธอ/เขาตกลงไปเกิดเป็นเด็กกำพร้าในทวีป จำอะไรไม่ได้เลย<br>คุณเห็นเด็กคนนั้นยืนตากฝนอยู่หน้าวิหารของคุณ`,[O('🫂 ดูแลเด็กคนนั้นเงียบๆ','ผิดกฎสวรรค์',()=>{G.dn.fallC=g.n;say(`🫂 คุณส่งความฝันให้แม่ชีในวิหารรับเด็กไปเลี้ยง${ru()}`,'myth',true);later(Ri(8,12),'fallR',g)},.5),O('👁️ ปล่อยไปตามกฎ','',()=>say(`👁️ เด็กคนนั้นเดินจากไปในสายฝน คุณบอกตัวเองว่ากฎคือกฎ`,'bad'),.5)])}
LAT.fallR=(G,g)=>{G.fol+=5;say(`🍂 เด็กกำพร้าที่คุณเคยดูแลโตเป็นนักบวชในวิหารของคุณ คืนหนึ่งเขามองฟ้าแล้วพูดว่า “ข้าจำได้แล้ว ขอบคุณ” — ${g.n}จำทุกอย่างได้ และเลือกใช้ชีวิตเป็นมนุษย์ต่อ${fol(5)}`,'myth',true)};
// ---------- 📖 เนื้อเรื่องหลัก 5 บท ----------
function arc(G){G.arc++;G.arcY=S.age+Ri(4,7);const ar=G.arc;
 if(ar===1)return C('📖 บทที่ 1 · ที่นั่งที่เจ็ด',`ในห้องประชุมสภามีเก้าอี้เจ็ดตัว แต่มีเทพนั่งแค่หก ที่นั่งที่เจ็ดว่างมาพันปี และไม่มีใครยอมพูดถึง ฝุ่นบนเก้าอี้นั้นไม่เคยถูกปัด`,[O('🗣️ ถามเทพผู้นับดวงดาว','',()=>{const g=G.gods.find(x=>x.n==='เทพผู้นับดวงดาว');if(g)g.rel--;say('✨ เขามองคุณนานเกินไป “บางคำถามทำให้คนถามหายไป”','myth')},.5),O('📚 ค้นหอบันทึกของสภาตอนกลางคืน','ผิดกฎสวรรค์',()=>{G.dn.arch=1;say(`📚 บันทึกหน้าเดียวที่เหลือเขียนว่า “ที่นั่งที่เจ็ด: เทพผู้ปกป้องมนุษย์จากเทพ — ถูกลบโดยมติเอกฉันท์”${ru()}`,'myth',true)},.5)]);
 if(ar===2){const g=pick(G.gods.filter(x=>x.al));return C(`📖 บทที่ 2 · ${g.n}กำลังจางหาย`,`กลางที่ประชุม ร่างของ${g.ic} ${g.n}เริ่มโปร่งแสง ไม่มีใครตกใจ เหมือนทุกคนรู้ว่าวันนี้จะมาถึง “ศรัทธาในเขตของข้าเหลือศูนย์” เขาพูดเบาๆ`,[O('🌟 แบ่งศรัทธาให้เขา','ศรัทธา −40 · เขารอด',()=>{if(G.fa<40)return say('🌟 แสงของคุณไม่พอ คุณได้แต่มองเขาหายไป','bad');G.fa-=40;g.rel+=3;say(`🌟 ${g.n}กลับมาเป็นรูปร่าง เขาจ้องคุณเหมือนไม่เข้าใจ “ไม่เคยมีเทพองค์ไหนทำแบบนี้มาก่อน”`,'myth',true)},.5),O('👁️ ปล่อยให้เป็นไป','',()=>{g.al=0;say(`👁️ ${g.n}หายไปเหลือแค่เก้าอี้ว่างอีกตัว — ตอนนี้มีที่นั่งว่างสองที่`,'bad',true)},.5)])}
 if(ar===3)return C('📖 บทที่ 3 · มนุษย์ไม่ต้องการเทพแล้ว',`คุณมองลงไปที่ทวีป ผู้ฝึกจิตรุ่นใหม่แข็งแกร่งจนปราบคลื่นสัตว์ได้เอง รักษาโรคได้เอง ทำฝนได้เอง — ทุกปีมีคนเอ่ยชื่อเทพน้อยลง และภพเทพทั้งภพกำลังจางลงช้าๆ<br>${G.dn.arch?'คุณนึกถึงบันทึกเรื่องที่นั่งที่เจ็ด':''}`,[O('🤔 เก็บความจริงนี้ไว้คนเดียว','',()=>say('🤔 คุณเริ่มสังเกตว่าภัยพิบัติในทวีปเกิดถี่ขึ้น ทุกครั้งหลังการประชุมสภา','myth'),.5),O('🗣️ ถามสภาตรงๆ','ความสัมพันธ์ในสภาลด',()=>{G.gods.forEach(x=>x.rel--);say('🗣️ ห้องประชุมเงียบสนิท แล้วสภาก็เปลี่ยนเรื่องคุยราวกับคุณไม่ได้พูดอะไร','bad')},.5)]);
 if(ar===4)return C('📖 บทที่ 4 · คลื่นสัตว์ที่ถูกเรียก',`คุณตามหลังเทพผู้กินความกลัวลงไปที่ขอบภพ และเห็นเขาเปิดประตูให้สัตว์วิญญาณนับหมื่นตัวทะลักลงทวีป — <b>สภาสร้างภัยพิบัติเอง เพื่อให้มนุษย์กลับมาอธิษฐาน</b>`,[O('🛡️ ลงไปหยุดคลื่นสัตว์อย่างลับๆ','ผิดกฎสวรรค์ · ผู้ศรัทธา +',()=>{G.dn.stop=1;say(`🛡️ คืนนั้นคลื่นสัตว์หยุดกลางทางโดยไม่มีใครรู้ว่าทำไม${ru()}${fol(6)}`,'myth',true)},.4),O('📜 รายงานต่อสภา','',()=>{G.dn.rep=1;say('📜 สภารับเรื่องไว้ แล้วลงมติว่า “ไม่มีหลักฐาน” — คุณรู้แล้วว่าสภาเป็นคนสั่งเอง','bad',true)},.3),O('🤝 เข้าร่วมแผนของสภา','ศรัทธาเพิ่มมาก แต่คนในทวีปตาย',()=>{G.dn.join=1;G.fa+=80;G.fol+=10;S.karma-=40;say(`🤝 คลื่นสัตว์กวาดหมู่บ้านไปสิบแห่ง ปีนั้นคนอธิษฐานถึงคุณมากที่สุดในชีวิตเทพ${fa(80)}`,'bad',true)},.3)]);
 const L=[O('⚖️ เปิดโปงสภาต่อหน้าเทพทุกองค์','ต้องชนะการไต่สวนครั้งสุดท้าย',()=>expose(G),.3),O('🏛️ รักษาระบบไว้','เทพอยู่ต่อ มนุษย์จ่ายราคา',()=>{G.end='keep';G.fa+=100;S.karma-=20;say('🏛️ <b>คุณเลือกให้ภพเทพอยู่ต่อ</b> สภาต้อนรับคุณเหมือนสมาชิกเต็มตัว และภัยพิบัติในทวีปยังเกิดขึ้นตามตารางเหมือนเดิม','myth',true);try{keyAdd(`${S.age} ปี — ตอนจบภพเทพ: รักษาระบบไว้`)}catch(e){}},.3),O('🌅 ล้มภพเทพ คืนพลังให้มนุษย์','จบชีวิตเทพ · พลังกระจายลงทวีป',()=>{G.end='free';say('🌅 <b>ภพเทพพังลงอย่างเงียบงัน</b> ทั่วทวีป เด็กทุกคนที่เกิดปีนั้นปลุกดวงจิตได้แม้จะเกิดมาไร้ดวงจิต','myth',true);endLife('ทุบบัลลังก์ของภพเทพ แล้วโปรยพลังเทพทั้งหมดลงทวีปเป็นฝนแสง มนุษย์ไม่ต้องพึ่งเทพอีกต่อไป')},.2)];
 if(G.rk>=2)L.push(O('🪑 นั่งลงบนที่นั่งที่เจ็ด','เป็นเทพผู้ปกป้องมนุษย์จากเทพ',()=>{G.end='seventh';G.rk=3;G.fol+=30;say('🪑 <b>คุณปัดฝุ่นพันปีออกจากเก้าอี้ แล้วนั่งลง</b> เทพทั้งหกหยุดพูด ตั้งแต่วันนั้น ทุกมติของสภาต้องผ่านคุณ — ผู้ที่ไม่ยอมให้เทพทำร้ายมนุษย์อีก','myth',true);try{keyAdd(`${S.age} ปี — ตอนจบภพเทพ: ที่นั่งที่เจ็ด`)}catch(e){}},.2));
 C('📖 บทที่ 5 · ทางเลือกของเทพ','ตอนนี้คุณรู้ทุกอย่างแล้ว ภพเทพอยู่ได้เพราะความกลัวของมนุษย์ และกำลังตายเพราะความกล้าของพวกเขา',L)}
function expose(G){const al=G.gods.filter(x=>x.al),fr=al.filter(x=>x.rel>=2).length,ev=(G.dn.arch?1:0)+(G.dn.stop?1:0)+(G.dn.rep?1:0);const p=cl(.2+fr*.15+ev*.15,.1,.9);
 if(rnd()<p){G.end='expose';G.rk=3;G.fol+=40;say(`⚖️ <b>คุณวางหลักฐานทั้งหมดกลางสภา</b>${ev?` (${ev} ชิ้น)`:''} เทพ ${fr} องค์ที่คุณเคยช่วยลุกขึ้นยืนข้างคุณ สภาเก่าถูกยุบ และภพเทพเริ่มต้นใหม่โดยไม่ต้องมีภัยพิบัติ${fol(40)}`,'myth',true);try{keyAdd(`${S.age} ปี — ตอนจบภพเทพ: เปิดโปงสภา`)}catch(e){}}
 else{G.rk=0;G.fa=Math.round(G.fa/3);say(`⚖️ <b>สภาไม่เชื่อคุณ</b> หลักฐานไม่พอ และเพื่อนในสภามีไม่พอ คุณถูกลดเป็น${RK[0]}และถูกจับตาไปตลอดกาล`,'bad',true)}}
function rest(G){G.endY=S.age;C('🕊️ ถึงเวลาพักของเทพ',`คุณเป็นเทพมา ${G.y} ปีแล้ว ${G.end?'เรื่องของภพเทพจบลงในแบบที่คุณเลือก':'ทวีปเปลี่ยนไปจนจำแทบไม่ได้'} ${G.heir&&!G.heir.done?'ผู้สืบทอดของคุณพร้อมรับตำแหน่งแล้ว':'ตำแหน่งของคุณจะว่างลงรอคนใหม่'}`,[
 O('🕊️ วางตำแหน่ง แล้วสลายเป็นแสง','จบชีวิตเทพอย่างสงบ',()=>{say('🕊️ <b>คุณลุกจากบัลลังก์เมฆเป็นครั้งสุดท้าย</b>','myth',true);endLife(`วางตำแหน่ง${DOM[G.dom][1]}หลังเป็นเทพ ${G.y} ปี แล้วสลายเป็นแสงโปรยลงทั่วทวีป`)},.5),
 O('🌟 อยู่ต่ออีกสักพัก','',()=>say('🌟 คุณนั่งลงที่เดิม มองทวีปต่อไป',''),.5)])}
// ---------- 🚪 ประตูสู่โลกอื่น ----------
const GATE=[['murim','⚔️ ยุทธภพ','เทพจากยุทธภพต้อนรับคุณด้วยการท้าประลองฝีมือ'],['xian','☁️ โลกเซียน','ผู้บำเพ็ญที่นั่นคุกเข่าเมื่อเห็นแสงของคุณ คิดว่าคุณคือเซียนที่สำเร็จแล้ว'],['god','🌟 แดนเทพ','เทพของอีกจักรวาลเล่าว่าสภาของพวกเขาก็มีที่นั่งว่างหนึ่งที่เหมือนกัน'],['fog','🌉 นครม่านหมอก','ไม่มีใครในเมืองนั้นมองเห็นคุณ ยกเว้นผู้ถือตราที่หลักยึดต่ำ'],['mw','🏙️ ยุคปัจจุบัน','ไม่มีใครอธิษฐานถึงเทพแล้ว คนที่นั่นอธิษฐานถึงโทรศัพท์']];
window.sgGate=function(){const G=GD();if(!G)return;closeM();if(G.gateY===S.age)return toast('ประตูเปิดได้ปีละครั้ง');G.gateY=S.age;
 C('🚪 ประตูสู่โลกอื่น','ขอบของภพเทพเชื่อมกับโลกอื่นในจักรวาล เทพข้ามไปเยือนได้ชั่วคราว — และบางครั้งจะเจอผู้เล่นคนอื่นที่กำลังข้ามโลกอยู่พอดี',GATE.map(w=>O(`🚪 ${w[1]}`,'',()=>{const r=rnd();let t=`🚪 <b>คุณเยือน${w[1]}</b> — ${w[2]}`;if(r<.35){G.fol+=2;t+=' · มีคนที่นั่นเริ่มเอ่ยชื่อคุณ'+fol(2)}else if(r<.6){S.power=(S.power||0)+pctPow(.03);t+=' · คุณได้ความเข้าใจใหม่เรื่องพลัง'}else t+=fa(-5);say(t,'epic');try{gbCross('sg',w[0])}catch(e){}},.2)).concat([O('ไม่ไปไหน','',()=>{G.gateY=-1},.1)]))};
// ---------- 🌌 ศูนย์รวม ----------
window.sgHub=function(){const G=GD();if(!G)return;const D=DOM[G.dom],I=isl(G),al=G.gods.filter(x=>x.al);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌌 ภพเทพแห่งทวีป</h3>
 <div class="fgIt"><div class="ic">${D[0]}</div><div><b>${D[1]} · ${RK[G.rk]}</b><small>${D[3]}</small><small>🌟 ศรัทธา ${fmt(G.fa)} · 🙏 ผู้ศรัทธา ${G.fol}${G.rk<3?` (ต้องมี ${RKN[G.rk]} เพื่อขอมติขึ้นขั้น)`:''} · ⚖️ ผิดกฎ ${G.ru}/3${G.fade?` · 🌫️ กำลังจาง ${G.fade}/4`:''}</small></div></div>
 <div class="fgB2 g"><button onclick="closeM();sgIsle()">🏝️ อาณาเขต</button><button onclick="closeM();sgPrayNow()" ${G.prY===S.age?'disabled':''}>🙏 คำอธิษฐาน</button><button onclick="closeM();gbSend()">🌟 ส่งพรลงโลกล่าง</button><button onclick="sgGate()" ${G.gateY===S.age?'disabled':''}>🚪 ประตูสู่โลกอื่น</button></div>
 ${G.heir?`<div class="fgIt"><div class="ic">👤</div><div><b>ผู้สืบทอด: ${esc(G.heir.n)}</b><small>${G.heir.r} · ผ่านบททดสอบ ${G.heir.ok}/${G.heir.tst} · ความภักดี ${G.heir.loy}${G.heir.done?' · จบแล้ว':''}</small></div></div>`:''}
 <div class="fgIt"><div class="ic">📜</div><div><b>สภาเทพ (${al.length} องค์ · ที่นั่งว่าง ${7-al.length})</b>${G.gods.map(x=>`<small>${x.ic} ${x.al?x.n:'<s>'+x.n+'</s>'} · ${!x.al?'ไม่อยู่แล้ว':x.rel>=2?'เป็นมิตร':x.rel>=0?'เป็นกลาง':'ไม่ไว้ใจคุณ'}</small>`).join('')}</div></div>
 <div class="fgIt"><div class="ic">📖</div><div><b>เนื้อเรื่องหลัก บทที่ ${G.arc}/5</b><small>${G.end?'จบแล้ว':G.arc<5?'บทต่อไปราวอายุ '+G.arcY:''}</small></div></div>
 <div class="fgIt"><div class="ic">🏝️</div><div><b>เกาะลอยฟ้า</b><small>ผู้ศรัทธาเพิ่มได้ ${I.fol}/ปี · ค่าดูแลลด ${I.up} · ป้องกัน ${I.def} · พลังเพิ่ม ${I.pw}</small></div></div>`,'sghub')};
window.sgPrayNow=()=>{const G=GD();if(G)prayAsk(G)};
// ---------- ผูกเข้าเกม ----------
{const _py=passYear;passYear=function(){try{const G0=S&&S.sv&&S.sv.gd;if(G0&&G0.line!=null&&G0.line!==S.line){S.sv.gd=null;if(S.sv.x&&S.sv.x.ge==='ascend')S.sv.x.ge='gone'}}catch(e){}if(on()){try{sgYear()}catch(e){console.error('sgYear',e);S.age++;saveGame()}return}const r=_py.apply(this,arguments);try{if(S&&S.alive&&S.ch==='soul'&&S.sv&&S.sv.x&&S.sv.x.ge==='ascend'&&!S.sv.gd)setTimeout(()=>{if(free()&&!S.sv.gd)sgStart()},800)}catch(e){}return r}}
{const _rn=render;render=function(){const r=_rn.apply(this,arguments);try{document.body.classList.toggle('sgW',on());let h=$('sgHud');if(!on()){if(h)h.remove();return r}const G=GD(),D=DOM[G.dom];
 if(!h){const top=document.querySelector('#game .box.top');if(!top)return r;top.insertAdjacentHTML('afterend','<div id="sgHud"></div>');h=$('sgHud')}
 const fp=cl(G.fa/3,0,100);h.innerHTML=`<div class="sgT">🌌 ภพเทพแห่งทวีป · ปีที่ ${G.y} ของการเป็นเทพ</div><div class="sgR">${D[0]} ${D[1]} <span>${RK[G.rk]}</span></div><div class="sgA">🌟 แสงศรัทธา<div class="bar"><i style="width:${fp}%"></i></div><b>${fmt(G.fa)}</b></div><div class="sgN">🙏 ผู้ศรัทธา ${G.fol}${G.rk<3?'/'+RKN[G.rk]:''} · ⚖️ ผิดกฎ ${G.ru}/3${G.heir?' · 👤 '+esc(G.heir.n):''}${G.fade?' · 🌫️ กำลังจาง':''}</div><div class="fgB"><button onclick="sgHub()">🌌 ภพเทพ</button><button onclick="sgIsle()">🏝️ อาณาเขต</button><button onclick="gbSend()">🌟 ส่งพร</button></div>`}catch(e){console.error('sg render',e)}return r}}
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.sgM'))g.insertAdjacentHTML('afterbegin','<button class="opt sgM" onclick="closeM();sgHub()">🌌 ภพเทพ<small>ตำแหน่ง ศรัทธา สภา</small></button>')}}catch(e){}return r}}
{const _ds=drawScene;drawScene=function(ctx,type){try{if(on()&&type!=='death'){g=ctx;PS=ctx.canvas.width/SW;ctx.setTransform(PS,0,0,PS,0,0);ctx.imageSmoothingEnabled=false;const f=frame||0,R2=(x,y,w,h,c,a)=>{if(a!=null)ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(x,y,w,h);ctx.globalAlpha=1};
 for(let y=0;y<SH;y+=4)R2(0,y,SW,4,['#2a1a5a','#3a2a7a','#5a3a8a','#8a5a9a','#c08aa0','#e0b0a0','#f0d0a8','#f8e8c0','#fff0d0','#fff6e0','#fffaf0','#ffffff','#ffffff','#ffffff'][Math.min(13,y>>2)]);
 for(let i=0;i<18;i++)R2((i*37)%SW,(i*13)%26,1,1,'#fff',.4+.4*Math.sin(f*.08+i));
 for(let i=0;i<4;i++){const x=((f*.12*(i%2?1:-1)+i*55)%(SW+60)+SW+60)%(SW+60)-60;R2(x,38+i*3,50,5,'#ffffff',.7);R2(x+8,35+i*3,30,4,'#ffffff',.6)}
 R2(52,44,60,6,'#8a7a6a');R2(58,50,48,3,'#6a5a4a');R2(66,53,32,2,'#4a3a2a');for(let i=0;i<5;i++)R2(60+i*10,30,3,14,'#f4ece0');R2(57,27,50,3,'#fff8ec');R2(62,24,40,3,'#ffe9b0');R2(80,20,4,4,'#ffd84a',.6+.4*Math.sin(f*.1));
 try{const me=meLook();curMe=me;person(82,43,me,'stand')}catch(e){}return}}catch(e){console.error('sg scene',e)}return _ds.apply(this,arguments)}}
{const _sc=sceneCap;sceneCap=function(t){try{if(on()){const G=GD();return`🌌 ภพเทพ · ${DOM[G.dom][1]}`}}catch(e){}return _sc.apply(this,arguments)}}
const css=document.createElement('style');css.textContent=`
#sgHud{margin:10px 0;padding:11px 13px;border-radius:16px;background:linear-gradient(180deg,#2a1f4a,#1a1430);border:1px solid #b89aff66;color:#f0e8ff;box-shadow:0 0 18px #8a6aff33}
#sgHud .sgT{font-size:12px;opacity:.75}#sgHud .sgR{font-size:17px;font-weight:800;margin:3px 0}#sgHud .sgR span{font-size:12.5px;color:#ffe08a;margin-left:6px}
#sgHud .sgA{display:flex;align-items:center;gap:8px;font-size:13px;margin:4px 0}#sgHud .sgA .bar{flex:1;height:8px;background:#0a0818;border-radius:6px;overflow:hidden}#sgHud .sgA .bar i{display:block;height:100%;background:linear-gradient(90deg,#ffd84a,#fff6c0)}
#sgHud .sgN{font-size:12.5px;opacity:.9;margin:2px 0 8px}#sgHud .fgB{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}#sgHud .fgB button{background:#ffffff14;border:1px solid #b89aff66;color:#fff;border-radius:10px;padding:8px 4px;font-family:inherit;font-weight:700}
.sgPc{display:block;width:100%;text-align:left;margin:6px 0;padding:9px 11px;border-radius:11px;border:1px solid #4a3a7a;background:#1a1430;color:#f0e8ff;font-family:inherit}.sgPc span{display:block;font-size:13px;color:#d8c8ff;margin:2px 0}.sgPc small{color:#ffe08a}.sgPc.on{border-color:#ffd84a;background:#3a2a10;box-shadow:0 0 10px #ffd84a55}
.sgIg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:230px;margin:10px auto}.sgIg button{aspect-ratio:1;border-radius:10px;border:1px solid #6a5aa0;background:linear-gradient(180deg,#e8f0ff,#b8c8e8);font-size:26px}
.sgIs{display:grid;grid-template-columns:1fr 1fr;gap:6px}.sgIs button{text-align:left;padding:7px 9px;border-radius:9px;border:1px solid #4a3a7a;background:#1a1430;color:#f0e8ff;font-family:inherit;font-size:13px}.sgIs button small{display:block;font-size:11px;opacity:.75}.sgIs button.on{border-color:#ffd84a;background:#3a2a10}
.fgIt{display:flex;gap:9px;align-items:flex-start;background:#1a1430;border:1px solid #3a2f5a;border-radius:11px;padding:8px 10px;margin:6px 0;color:#ece6ff}.fgIt .ic{font-size:22px;line-height:1.1;flex:none;width:28px;text-align:center}.fgIt b{color:#ffe9b0}.fgIt small{display:block;color:#b8aed8;font-size:12px;margin-top:2px;line-height:1.45}
.fgB2{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 8px}.fgB2.g{display:grid;grid-template-columns:1fr 1fr}.fgB2 button{background:#2a2050;border:1px solid #8a7ac0;color:#f1e7ff;border-radius:9px;padding:9px 6px;font-family:inherit;font-size:13px}.fgB2 button:disabled{opacity:.45}
.fgVc{color:#c9a0ff;font-style:italic;font-size:13px;margin:6px 0}`;
document.head.appendChild(css);
try{SYS_GUIDE.push({s:'world',ic:'🌌',t:'ภพเทพแห่งทวีป (จิตวิญญาณยุทธ์)',d:'ผ่านประตูเทวาแล้วเลือกก้าวสู่ภพเทพ · รับตำแหน่งเทพ · แสงศรัทธาคือเงินและลมหายใจ · ตอบคำอธิษฐาน · จัดเกาะลอยฟ้า · ผู้สืบทอด · ไต่สวนในสภา · สงครามเทพ · เนื้อเรื่องที่นั่งที่เจ็ด 5 บท · ส่งพรให้ผู้เล่นจริงและ NPC'})}catch(e){}
window._sg={sgStart,sgYear,prayAsk:()=>prayAsk(GD()),council:()=>council(GD()),heirPick:()=>heirPick(GD()),arc:()=>arc(GD()),war:()=>war(GD()),isl};
})()}catch(e){console.error('soulgod',e)}


// ---- ท่อน soulx: 🐾 ชีวิตสัตว์วิญญาณเต็มรูปแบบ + ⭕ ลูกเล่นฝั่งมนุษย์ ----
// สัตว์: 5 ช่วงอายุบำเพ็ญ (สิบปี→แสนปี) · เหตุการณ์สุ่มตามธง · คู่ปรับ คู่ ลูก สัญญา · ทัณฑ์สวรรค์ · ทางแยก 3 ทาง (เป็นคน / ครองป่า / มอบตัวเป็นวงแหวน)
//   แก้ลำดับเวลาเดิม: เด็กหลงป่าและกองล่าย้ายมาอยู่ช่วงไม่กี่สิบปีก่อนทัณฑ์ (เดิมอยู่ช่วงพันปี/หมื่นปี แต่ไปเจอกันอีกในชีวิตคน)
// คน: 🔍 สะกดรอยก่อนล่า · 🧩 สูตรวงแหวน 6 สูตร (สะสมข้ามชีวิต) · 🔴 วงแหวนแสนปีในการล่าปกติวงที่ 6–9 · 🌋 ร่างแท้ต้องผ่านบททดสอบ (เดิมปลดเองที่ระดับ 30)
//   🧬 ดวงจิตแปรเปลี่ยนตามวิถี (มาร/พิทักษ์/สามัญ) · 🌙 วงที่เก้าแบบแลก (อายุขัย/ความทรงจำ/ชาติก่อน) · 🎒 อุปกรณ์ล่า 3 อย่าง · มินิเกมใหม่ 7 แบบ (sx*)
// สถานะ: S.sv.bst (สัตว์ · ต่อจากระบบเดิม block91) · S.sv.sx (ฝั่งคน) · LS murim_svfx (สูตรที่ค้นพบ) · LS murim_svgift (มรดกจากชาติสัตว์)
// ภาษาอังกฤษ: ใช้ L(ไทย, อังกฤษ) ตามภาษาที่เลือกอยู่
try{(()=>{
const B=window._blk34,B9=window._b91;if(!B||!B9||!window._mg2G)return;
const EN=()=>{try{return LANG==='en'}catch(e){return false}};
const L=(th,en)=>EN()?en:th;
const rnd=Math.random,pick=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),Ri=(a,b)=>a+Math.floor(rnd()*(b-a+1)),shuf=a=>a.slice().sort(()=>rnd()-.5);
const O=(t,s,f)=>({t,s:s||'',f});
const on=()=>{try{return !!(S&&S.alive&&S.ch==='soul'&&!S.mw&&!(S.sv&&S.sv.gd&&S.sv.gd.on))}catch(e){return false}};
const free=()=>!choice._cur&&!modalOpen&&!(typeof DU!=='undefined'&&DU)&&!(window._mgBusy&&window._mgBusy());
const G=()=>S.sv;
const X=()=>{const g=S.sv;if(!g.sx)g.sx={fx:{},hk:{sc:0,pl:0,bt:0},tf:null,mut:null,ev:{},ow:null,cd:-9};return g.sx};
const TYI={atk:'⚔️',def:'🛡️',sup:'🌿',ctrl:'🌀',agi:'💨'};
const TYN={atk:['สายโจมตี','Attack'],def:['สายป้องกัน','Defense'],sup:['สายสนับสนุน','Support'],ctrl:['สายควบคุม','Control'],agi:['สายว่องไว','Agility']};
const tyN=t=>TYI[t]+' '+L(TYN[t][0],TYN[t][1]);
const TN=[['สิบปี','10-year'],['ร้อยปี','100-year'],['พันปี','1,000-year'],['หมื่นปี','10,000-year'],['แสนปี','100,000-year'],['ล้านปี','million-year']];
const tN=t=>L(TN[t][0],TN[t][1]);
const TIC=['⚪','🟡','🟣','⚫','🔴','🌟'];
const say=(t,c,big)=>{try{log(t,c||'',big)}catch(e){}};
const spTy=g=>{try{return B.spNow(g.sp[0]).t}catch(e){return 'atk'}};
const spNm=g=>{try{return B.spNow(g.sp[0]).n}catch(e){return ''}};
const isAuto=()=>{try{return !!auto}catch(e){return false}};
// เล่นมินิเกม → cb(คะแนน 0–1) · โหมดออโต้ไม่เปิดมินิเกม ให้ผลกลางๆ
function mgo(id,o,cb){if(isAuto()||!window.mg2Play){setTimeout(()=>cb(.55,1),50);return}let done=0;const k=x=>{if(done)return;done=1;cb(x.sc,x.sk)};const ok=window.mg2Play(id,o||{},(sc,sk)=>k({sc:sk?.45:sc,sk}));if(!ok)k({sc:.5,sk:1})}

// =================== มินิเกมใหม่ 7 แบบ ===================
const MG=window._mg2G;
const box=(h,st)=>`<div style="position:relative;${st||''}">${h}</div>`;
// 1) ขุดหาอาหารใต้หิมะ — ตัวเลขบอกจำนวนกับดักรอบช่อง
MG.sxForage={n:'ขุดหาอาหารใต้หิมะ',ic:'❄️',mt:'จมูกฤดูหนาว',how:'แตะช่องหิมะเพื่อขุด ตัวเลขบอกว่ามีกับดักรอบช่องนั้นกี่อัน หาอาหารให้ครบ 5 ชิ้น โดนกับดัก 2 ครั้งจบ',t:30,rw:()=>'',
 init(B2,api){const N=16,trap=new Set(),food=new Set();while(trap.size<3)trap.add(Ri(0,N-1));while(food.size<5){const k=Ri(0,N-1);if(!trap.has(k))food.add(k)}
  let got=0,hit=0;const st=Array(N).fill(0);const adj=i=>{const r=i>>2,c=i&3;let n=0;for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const rr=r+dr,cc=c+dc;if(rr<0||cc<0||rr>3||cc>3)continue;if(trap.has(rr*4+cc))n++}return n};
  const draw=()=>{B2.innerHTML=`<div class="tag2" style="text-align:center">${L('อาหาร','Food')} ${got}/5 · ${L('กับดัก','Traps')} ${hit}/2</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-top:6px">${st.map((v,i)=>`<button class="${v?'gbtn':'pbtn'}" data-i="${i}" style="font-size:22px;padding:12px 0;min-height:50px">${!v?'⬜':trap.has(i)?'🪤':food.has(i)?'🍖':(adj(i)||'·')}</button>`).join('')}</div>`;
   B2.querySelectorAll('button').forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(!api.live())return;const i=+b.dataset.i;if(st[i])return;st[i]=1;if(trap.has(i))hit++;else if(food.has(i))got++;draw();if(got>=5||hit>=2)api.end()})};
  draw();return{sc:()=>cl(got/5-hit*.2,0,1)}}};
// 2) นิ่งเหมือนก้อนหิน — ขยับได้เฉพาะตอนตานักล่าปิด
MG.sxHide={n:'นิ่งเหมือนก้อนหิน',ic:'👁️',mt:'เงาที่ไม่มีใครเห็น',how:'แตะ "คืบ" เฉพาะตอนนักล่าหลับตา 😴 ถ้าขยับตอนตาเปิด 👁️ จะถูกเห็น ไปให้ถึง 12 ก้าว',t:22,rw:()=>'',
 init(B2,api){let step=0,seen=0,open=0,tm=null,stop=0;const NEED=12;
  B2.innerHTML=`<div id="sxE" style="font-size:54px;text-align:center;transition:transform .15s">😴</div><div class="tag2" id="sxH" style="text-align:center"></div><div style="height:10px;border-radius:9px;background:#8883;overflow:hidden;margin:8px 0"><div id="sxP" style="height:100%;width:0;background:#6fd08a;transition:width .15s"></div></div><button class="pbtn" id="sxGo" style="width:100%;font-size:20px;padding:16px 0">🐾 ${L('คืบ','Creep')}</button>`;
  const E=B2.querySelector('#sxE'),Hh=B2.querySelector('#sxH'),P=B2.querySelector('#sxP');const upd=()=>{Hh.textContent=`${L('ก้าว','Steps')} ${step}/${NEED} · ${L('ถูกเห็น','Spotted')} ${seen}/3`;P.style.width=(step/NEED*100)+'%'};upd();
  const cyc=()=>{if(stop||!api.live())return;if(open){open=0;E.textContent='😴';tm=setTimeout(cyc,Ri(650,1500)/api.ez)}else{E.textContent='🔦';E.style.transform='scale(1.15)';tm=setTimeout(()=>{if(stop)return;E.style.transform='';open=1;E.textContent='👁️';tm=setTimeout(cyc,Ri(700,1800))},Math.round(260/api.ez)+120)}};tm=setTimeout(cyc,900);
  B2.querySelector('#sxGo').onpointerdown=e=>{e.preventDefault();if(!api.live())return;if(open||E.textContent==='🔦'&&rnd()<.5){seen++;E.textContent='😠';navigator.vibrate&&navigator.vibrate(80)}else step++;upd();if(step>=NEED||seen>=3)api.end()};
  return{sc:()=>cl(step/NEED*(1-seen*.28),0,1),stop(){stop=1;clearTimeout(tm)}}}};
// 3) วิ่งหนีกองล่า — สามเลน หลบธนู ตาข่าย ขอนไม้
MG.sxChase={n:'วิ่งหนีกองล่า',ic:'🏃',mt:'ฝีเท้าที่ไม่มีใครตามทัน',how:'แตะเลนซ้าย กลาง ขวา หลบของที่ตกลงมา โดน 3 ครั้งจบ',t:16,rw:()=>'',
 init(B2,api){const H=6;let lane=1,hits=0,tick=0,items=[],stop=0,surv=0;const ob=['🏹','🕸️','🪵','🔥'];
  B2.innerHTML=`<div id="sxF" style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(${H},34px);gap:2px;background:#0f2a18;border-radius:10px;padding:4px"></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:6px">${[0,1,2].map(i=>`<button class="pbtn" data-l="${i}" style="padding:14px 0;font-size:18px">${['⬅️','⬆️','➡️'][i]}</button>`).join('')}</div><div class="tag2" id="sxCh" style="text-align:center"></div>`;
  const F=B2.querySelector('#sxF'),C=B2.querySelector('#sxCh');
  const draw=()=>{let h='';for(let r=0;r<H;r++)for(let c=0;c<3;c++){const it=items.find(x=>x.r===r&&x.c===c);h+=`<div style="display:flex;align-items:center;justify-content:center;font-size:22px">${r===H-1&&c===lane?(it?'💥':'🐾'):it?it.i:''}</div>`}F.innerHTML=h;C.textContent=`${L('โดน','Hit')} ${hits}/3`};
  B2.querySelectorAll('[data-l]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();lane=+b.dataset.l;draw()});
  const iv=setInterval(()=>{if(stop||!api.live())return;tick++;surv++;items.forEach(x=>x.r++);items=items.filter(x=>{if(x.r===H-1&&x.c===lane){hits++;navigator.vibrate&&navigator.vibrate(60);return false}return x.r<H});
   const busyRows=new Set(items.filter(x=>x.r===0).map(x=>x.c));if(tick%2===0){const n=rnd()<.25+api.lv*.03?2:1;const cs=shuf([0,1,2]).slice(0,n);cs.forEach(c=>{if(!busyRows.has(c))items.push({r:0,c,i:pick(ob)})})}
   draw();if(hits>=3)api.end()},Math.round(330/Math.sqrt(api.ez)));draw();
  return{sc:()=>cl(1-hits/3,0,1)*cl(.55+surv/60,0,1),stop(){stop=1;clearInterval(iv)}}}};
// 4) เสียงเรียกฝูง — ยาว (กดค้าง) / สั้น (แตะ)
MG.sxHowl={n:'เสียงเรียกฝูง',ic:'🌕',mt:'เสียงที่ฝูงจำได้',how:'จำจังหวะ ▬ ยาว (กดค้าง) และ • สั้น (แตะ) แล้วหอนตามให้ถูก 3 รอบ',t:30,rw:()=>'',
 init(B2,api){const LEN=[3,4,5];let rd=0,ok=0,tot=0,pat=[],pos=0,t0=0,phase=0,stop=0;
  const show=()=>{if(stop)return;if(rd>=LEN.length){api.end();return}pat=Array.from({length:LEN[rd]},()=>rnd()<.5?1:0);pos=0;phase=0;
   B2.innerHTML=`<div class="tag2" style="text-align:center">${L('รอบ','Round')} ${rd+1}/3 · ${L('จำให้ดี','Remember')}</div><div style="font-size:34px;text-align:center;letter-spacing:8px;margin:10px 0">${pat.map(p=>p?'▬':'•').join(' ')}</div>`;
   setTimeout(()=>{if(stop||!api.live())return;phase=1;B2.innerHTML=`<div class="tag2" style="text-align:center">${L('รอบ','Round')} ${rd+1}/3 · ${L('หอนตาม','Howl it back')}</div><div id="sxHw" style="font-size:30px;text-align:center;letter-spacing:8px;margin:8px 0;min-height:40px">${pat.map(()=>'◌').join(' ')}</div><button class="pbtn" id="sxHb" style="width:100%;font-size:22px;padding:22px 0">🌕 ${L('หอน','Howl')}</button><div class="tag2" style="text-align:center">${L('ยาว = กดค้างเกินครึ่งวินาที','Long = hold over half a second')}</div>`;
    const btn=B2.querySelector('#sxHb'),W=B2.querySelector('#sxHw');const mk=[];
    btn.onpointerdown=e=>{e.preventDefault();t0=performance.now();btn.style.transform='scale(.96)'};
    btn.onpointerup=btn.onpointerleave=e=>{if(!t0||stop||!api.live())return;const d=performance.now()-t0;t0=0;btn.style.transform='';const v=d>=450?1:0;const good=v===pat[pos];tot++;if(good)ok++;mk.push(good?(v?'▬':'•'):'✖');pos++;W.textContent=mk.concat(pat.slice(pos).map(()=>'◌')).join(' ');if(pos>=pat.length){rd++;setTimeout(show,500)}}},Math.round((900+LEN[rd]*420)*api.ez))};
  show();return{sc:()=>tot?ok/(LEN.reduce((a,b)=>a+b,0)):0,stop(){stop=1}}}};
// 5) ทัณฑ์สวรรค์ — ช่องที่ฟ้าจะผ่าเตือนก่อน แตะหนีไปช่องปลอดภัย
MG.sxStorm={n:'ทัณฑ์สวรรค์เก้าสาย',ic:'⚡',mt:'ผู้รอดทัณฑ์',how:'ช่องที่ขึ้น ⚠️ จะถูกฟ้าผ่า แตะช่องอื่นเพื่อย้ายตัวไปก่อนฟ้าลง ครบ 9 สาย',t:30,rw:()=>'',
 init(B2,api){let me=4,rd=0,hits=0,warn=new Set(),stop=0,tm=null,phase=0;
  const draw=(fl)=>{B2.innerHTML=`<div class="tag2" style="text-align:center">${L('สายที่','Strike')} ${Math.min(9,rd+1)}/9 · ${L('โดน','Hit')} ${hits}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:6px;background:#141028;border-radius:10px;padding:5px">${Array.from({length:9},(_,i)=>`<button data-i="${i}" style="font-size:26px;padding:16px 0;border-radius:9px;border:1px solid #4a3a7a;background:${fl&&warn.has(i)?'#ffe14a':warn.has(i)?'#5a2a10':'#221a3a'}">${i===me?(fl&&warn.has(i)?'💥':'🐾'):warn.has(i)?(fl?'⚡':'⚠️'):''}</button>`).join('')}</div>`;
   B2.querySelectorAll('[data-i]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(phase!==1||!api.live())return;me=+b.dataset.i;draw()})};
  const round=()=>{if(stop||!api.live())return;if(rd>=9){api.end();return}const n=Math.min(7,2+Math.floor(rd/2));warn=new Set(shuf([0,1,2,3,4,5,6,7,8]).slice(0,n));if(!warn.has(me)&&rnd()<.75){warn.delete([...warn][0]);warn.add(me)}phase=1;draw();
   tm=setTimeout(()=>{if(stop)return;phase=2;if(warn.has(me)){hits++;navigator.vibrate&&navigator.vibrate(120)}draw(1);rd++;tm=setTimeout(()=>{warn=new Set();round()},420)},Math.max(520,Math.round((1250-rd*75)*api.ez)))};
  draw();tm=setTimeout(round,500);return{sc:()=>cl(1-hits/5,0,1),stop(){stop=1;clearTimeout(tm)}}}};
// 6) อ่านรอย — เบาะแส 3 ชิ้นต่อรอย (หนึ่งชิ้นอาจหลอก) แล้วทายอายุ
const CLU=[[['รอยเท้าเล็กเท่าฝ่ามือเด็ก','Pawprints the size of a child\'s palm'],['รอยเท้ากว้างเท่าฝ่ามือผู้ใหญ่','Pawprints as wide as a grown hand'],['รอยเท้าใหญ่เท่าจานข้าว','Pawprints as big as a dinner plate'],['รอยเท้ากดดินลงไปครึ่งศอก','Prints pressed half a forearm deep'],['ดินรอบรอยเท้าแตกเป็นร่างแห','Earth cracked like a web around each print']],
 [['รอยข่วนบนเปลือกไม้สูงแค่เข่า','Claw marks at knee height'],['รอยข่วนสูงระดับเอว','Claw marks at waist height'],['รอยข่วนสูงเหนือหัว','Claw marks above head height'],['ต้นไม้ทั้งต้นหักครึ่ง','A whole tree snapped in half'],['ต้นไม้ในรัศมีร้อยก้าวเหี่ยวตาย','Every tree within a hundred paces has withered']],
 [['ขนที่ติดกิ่งเป็นสีขาวหม่น','Fur on the branch is dull white'],['ขนที่ติดกิ่งมีประกายเหลือง','Fur on the branch glints yellow'],['ขนที่ติดกิ่งมีประกายม่วง','Fur on the branch shimmers purple'],['ขนที่ติดกิ่งดำจนดูดแสง','Fur on the branch is so black it drinks the light'],['ขนที่ติดกิ่งยังอุ่นและเป็นสีแดง','The fur on the branch is red and still warm']],
 [['นกยังร้องตามปกติ','Birds are still singing'],['นกเงียบเป็นวง ๆ','Birds fall silent in patches'],['ไม่มีแมลงสักตัวตลอดทาง','Not a single insect along the trail'],['ลมหยุดพัดเมื่อเข้าใกล้','The wind stops as you get close'],['คุณได้ยินเสียงหัวใจตัวเองดังผิดปกติ','You can hear your own heartbeat too loudly']]];
MG.sxScout={n:'อ่านรอยสัตว์วิญญาณ',ic:'🔍',mt:'ตาของนักตามรอย',how:'อ่านเบาะแส 3 ชิ้น (อาจมีชิ้นหนึ่งหลอก) แล้วทายว่ารอยนี้อายุเท่าไร 3 รอย',t:40,rw:()=>'',
 init(B2,api){let rd=0,ok=0,stop=0;const MX=Math.min(4,(api.o&&api.o.mx)||3);
  const show=()=>{if(stop)return;if(rd>=3){api.end();return}const tr=Ri(0,MX);const ks=shuf([0,1,2,3]).slice(0,3);const liar=rnd()<.6?Ri(0,2):-1;
   const cs=ks.map((k,i)=>{let v=tr;if(i===liar)v=cl(tr+(rnd()<.5?-2:2),0,4);return CLU[k][v]});const opts=shuf([...new Set([tr,cl(tr-1,0,MX),cl(tr+1,0,MX),Ri(0,MX)])]).slice(0,3);if(!opts.includes(tr))opts[0]=tr;
   B2.innerHTML=`<div class="tag2" style="text-align:center">${L('รอยที่','Trail')} ${rd+1}/3</div>${cs.map(c=>`<div class="item" style="margin:4px 0;padding:6px 8px">🍂 ${L(c[0],c[1])}</div>`).join('')}<div style="display:grid;grid-template-columns:repeat(${opts.length},1fr);gap:5px;margin-top:6px">${opts.sort((a,b)=>a-b).map(t=>`<button class="pbtn" data-t="${t}" style="padding:12px 0">${TIC[t]} ${tN(t)}</button>`).join('')}</div>`;
   B2.querySelectorAll('[data-t]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(!api.live()||b.dataset.d)return;B2.querySelectorAll('[data-t]').forEach(x=>x.dataset.d=1);const g=+b.dataset.t===tr;if(g)ok++;b.textContent=g?'✅':'❌ '+TIC[tr];rd++;setTimeout(show,650)})};
  show();return{sc:()=>ok/3,stop(){stop=1}}}};
// 7) ทะลวงเปลือก — แตะจุดตามลำดับเลข เร็วที่สุด
MG.sxCrack={n:'ทะลวงเปลือกดวงจิต',ic:'🌋',mt:'ผู้ปลุกร่างแท้',how:'แตะรอยร้าวตามลำดับ 1 → 7 ก่อนเปลือกสมานตัว 2 รอบ แตะผิดเปลือกหนาขึ้น',t:20,rw:()=>'',
 init(B2,api){let rd=0,nx=1,miss=0,done=0,stop=0;const N=7;
  const show=()=>{if(stop)return;if(rd>=2){api.end();return}nx=1;const pts=[];let g=0;while(pts.length<N&&g++<400){const p=[Ri(6,86),Ri(6,82)];if(pts.every(q=>Math.hypot(q[0]-p[0],q[1]-p[1])>17))pts.push(p)}
   B2.innerHTML=`<div class="tag2" style="text-align:center">${L('รอบ','Round')} ${rd+1}/2 · ${L('ผิด','Misses')} ${miss}</div><div id="sxK" style="position:relative;height:260px;border-radius:28px;background:radial-gradient(#5a3a2a,#2a1a10);margin-top:6px;overflow:hidden">${pts.map((p,i)=>`<button data-n="${i+1}" style="position:absolute;left:${p[0]}%;top:${p[1]}%;width:40px;height:40px;border-radius:50%;border:2px solid #ffb84a;background:#3a2210;color:#ffe9b0;font-weight:bold;font-size:16px">${i+1}</button>`).join('')}</div>`;
   B2.querySelectorAll('[data-n]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(!api.live())return;const n=+b.dataset.n;if(n===nx){b.style.background='#ffcf3a';b.style.color='#2a1a10';b.textContent='✦';b.disabled=true;nx++;done++;if(nx>N){rd++;setTimeout(show,350)}}else{miss++;const k=B2.querySelector('#sxK');k.style.transform='translateX(4px)';setTimeout(()=>k.style.transform='',90)}})};
  show();return{sc:()=>cl(done/(N*2)-miss*.06,0,1),stop(){stop=1}}}};
// ใช้เครื่องยนต์เดิมสำหรับบททดสอบร่างแท้บางสาย
const E2=window._mg2E||{};
MG.sxHold={n:'ยืนรับคลื่นพลัง',ic:'🛡️',mt:'กำแพงที่ไม่ถอย',how:'กดค้างให้แถบพลังอยู่ในโซนทอง 3 ครั้ง',t:16,rw:()=>'',init:(B2,api)=>E2.hold?E2.hold(B2,api,{n:3,lo:.55,hi:.78,ms:1500,ic:'🛡️',label:L('ยืนรับ','Hold'),col:'linear-gradient(#9fd8ff,#3a6ab0)'}):MG.sxCrack.init(B2,api)};
MG.sxMem={n:'เรียงความทรงจำของดวงจิต',ic:'🧠',mt:'ผู้จำแทนดวงจิต',how:'จำลำดับภาพแล้วกดตาม',t:18,rw:()=>'',init:(B2,api)=>E2.simon?E2.simon(B2,api,{syms:['🌙','🔥','🌊','🍃','⛰️','⭐'],cols:3,len:5,show:460,title:L('เรียงความทรงจำ','Order the memory')}):MG.sxScout.init(B2,api)};
// ป้ายชื่อมินิเกมเป็นอังกฤษ (ชื่อในหัวกล่องแปลผ่านพจนานุกรม)
try{Object.assign(I18N.d,{'ขุดหาอาหารใต้หิมะ':'Dig for Food Under the Snow','นิ่งเหมือนก้อนหิน':'Still as a Stone','วิ่งหนีกองล่า':'Outrun the Hunters','เสียงเรียกฝูง':'The Pack Call','ทัณฑ์สวรรค์เก้าสาย':'Nine Heavenly Strikes','อ่านรอยสัตว์วิญญาณ':'Read the Spirit-Beast Trail','ทะลวงเปลือกดวงจิต':'Break the Spirit Shell','ยืนรับคลื่นพลัง':'Stand Against the Surge','เรียงความทรงจำของดวงจิต':'Order the Spirit\'s Memory',
 'แตะช่องหิมะเพื่อขุด ตัวเลขบอกว่ามีกับดักรอบช่องนั้นกี่อัน หาอาหารให้ครบ 5 ชิ้น โดนกับดัก 2 ครั้งจบ':'Tap snow to dig. Numbers show how many traps are next to that tile. Find 5 food; 2 traps ends it',
 'แตะ "คืบ" เฉพาะตอนนักล่าหลับตา 😴 ถ้าขยับตอนตาเปิด 👁️ จะถูกเห็น ไปให้ถึง 12 ก้าว':'Tap "Creep" only while the hunter\'s eyes are closed 😴. Moving while 👁️ gets you spotted. Reach 12 steps',
 'แตะเลนซ้าย กลาง ขวา หลบของที่ตกลงมา โดน 3 ครั้งจบ':'Tap left, middle or right to dodge what falls. 3 hits ends it',
 'จำจังหวะ ▬ ยาว (กดค้าง) และ • สั้น (แตะ) แล้วหอนตามให้ถูก 3 รอบ':'Remember the rhythm: ▬ long (hold) and • short (tap), then howl it back. 3 rounds',
 'ช่องที่ขึ้น ⚠️ จะถูกฟ้าผ่า แตะช่องอื่นเพื่อย้ายตัวไปก่อนฟ้าลง ครบ 9 สาย':'Tiles marked ⚠️ will be struck. Tap another tile to move before the lightning lands. Survive 9 strikes',
 'อ่านเบาะแส 3 ชิ้น (อาจมีชิ้นหนึ่งหลอก) แล้วทายว่ารอยนี้อายุเท่าไร 3 รอย':'Read 3 clues (one may lie) and guess the beast\'s age. 3 trails',
 'แตะรอยร้าวตามลำดับ 1 → 7 ก่อนเปลือกสมานตัว 2 รอบ แตะผิดเปลือกหนาขึ้น':'Tap the cracks in order 1 → 7 before the shell heals. 2 rounds; wrong taps thicken it',
 'กดค้างให้แถบพลังอยู่ในโซนทอง 3 ครั้ง':'Hold to keep the bar in the gold zone 3 times','จำลำดับภาพแล้วกดตาม':'Remember the order and repeat it'})}catch(e){}

// =================== 🐾 ชีวิตสัตว์วิญญาณ (แทนบทนำ 5 ฉากเดิม) ===================
const BST=B9.BST,ENDS=B9.ENDS,rec=B9.rec;
Object.assign(ENDS,{b9_gift:['S','มอบร่างแสนปีเป็นวงแหวน','สัตว์วิญญาณในร่างคน'],b9_king:['A','ราชาป่าที่ยอมลงจากบัลลังก์','สัตว์วิญญาณในร่างคน'],b9_cub:['A','ลูกในป่าจำคุณได้','สัตว์วิญญาณในร่างคน'],b9_rival:['A','คู่ปรับสองชาติ','สัตว์วิญญาณในร่างคน'],b9_pact:['B','รักษาสัญญาที่ให้ไว้ตอนเป็นสัตว์','สัตว์วิญญาณในร่างคน']});
try{Object.assign(I18N.d,{'มอบร่างแสนปีเป็นวงแหวน':'Gave the 100,000-year body as a ring','ราชาป่าที่ยอมลงจากบัลลังก์':'The forest king who stepped down','ลูกในป่าจำคุณได้':'Your cub in the forest remembered you','คู่ปรับสองชาติ':'Rivals across two lives','รักษาสัญญาที่ให้ไว้ตอนเป็นสัตว์':'Kept a promise made as a beast'})}catch(e){}
const FOOD={b9rab:['หญ้าน้ำค้างที่ขึ้นเฉพาะคืนจันทร์เต็มดวง','moon-dew grass that grows only on full-moon nights'],b9snk:['ไข่นกในโพรงไม้','bird eggs in a tree hollow'],b9ape:['ผลไม้เปลือกแข็งเหมือนหิน','stone-hard fruit'],b9crn:['ปลาเงินในลำธารน้ำแข็ง','silver fish in an icy stream'],b9tig:['กวางป่าที่หลงฝูง','a deer that lost its herd']};
const RIV=[['จิ้งจอกเพลิง','fire fox','🦊'],['หมาป่าหลังเงิน','silver-backed wolf','🐺'],['แมวป่าหางสามแฉก','three-tailed wildcat','🐈'],['เหยี่ยวหิน','stone hawk','🦅'],['วานรตาทอง','golden-eyed ape','🐒']];
const HNT=[['นักล่าวงแหวนหน้าแผลเป็น','the scar-faced ring hunter'],['ปรมาจารย์ธนูเงิน','the Silver Bow master'],['หัวหน้ากองล่าตระกูลเหล็ก','the captain of the Iron Clan hunters']];
const GIRL=['หลิว','เสี่ยวหลาน','อาเจิ้ง','หมิงเยว่','ต้าหู','ซานซาน'];
let busy=0;
// หยุดนาฬิกาเกมระหว่างชีวิตสัตว์ (กันปีเดินระหว่างฉาก)
setInterval(()=>{try{if(busy&&on())window._rdU=Date.now()+800;else if(busy&&!on())busy=0}catch(e){}},250);
{const _og=window._offGame;window._offGame=function(){try{if(busy&&on())return true}catch(e){}return _og?_og.apply(this,arguments):false}}
const bs=()=>G().bst;
const Q=[];
// W = ขั้นที่รออยู่ · ถ้าตัวเลือกถูกปิดโดยไม่มีใครเรียกขั้นถัดไป (เช่น ตัวเลือกที่ระบบอื่นเติมเข้ามา) ให้เดินต่อเองหลัง 3 วิ
let W=null;
function run(){if(!on()){busy=0;Q.length=0;W=null;return}const f=Q.shift();if(!f){busy=0;W=null;return}let d=0;const nx=()=>{if(d)return;d=1;run()};W={nx,t:Date.now()};setTimeout(()=>{if(!on()){busy=0;return}try{f(nx)}catch(e){console.error('sx beast',e);nx()}},420)}
setInterval(()=>{try{if(!busy||!W||!on())return;if(choice._cur||modalOpen||(window._mgBusy&&window._mgBusy())||(typeof DU!=='undefined'&&DU)){W.t=Date.now();return}if(Date.now()-W.t>3000){W.t=Date.now();W.nx()}}catch(e){}},500);
// _w/_x = บอก dir3 และตัวเติมตัวเลือก (ทุ่มสุดตัว ฯลฯ) ว่าไม่ต้องแทรกตัวเลือกของมนุษย์ในฉากสัตว์
const CH=(t,x,o)=>{const b=bs();if(o&&o[0]){o[0]._w=1;o[0]._x=1}choice(`${b.ic||'🐾'} ${t}`,x,o)};
const stage=(t,th,en)=>nx=>{const b=bs();b.st=t;say(`${TIC[t]} <b>${L(th,en)}</b>`,'epic',true);nx()};
const pool=(P,n)=>nx=>{const b=bs();const Lp=shuf(P.filter(e=>!b.seen.includes(e.id)&&(!e.c||e.c(b)))).slice(0,n);Q.unshift(...Lp.map(e=>nx2=>{b.seen.push(e.id);e.r(b,nx2)}));nx()};
const pw=n=>{bs().pw=(bs().pw||0)+n};
const scar=()=>{const b=bs();b.scar=(b.scar||0)+1};
const nmR=b=>b.rival?L(b.rival[0],b.rival[1]):'';
function startBeast(){const g=G();const b=g.bst||(g.bst={});Object.assign(b,{pro:1,sx:1,seen:[],pw:0,hu:0,cun:0,inst:0,ht:0});busy=1;Q.length=0;
 Q.push(birth,forage,pool(P0,2),stage(1,'หนึ่งร้อยปี · ป่าเริ่มรู้จักชื่อคุณ','One hundred years · the forest learns your name'),territory,pool(P1,2),stage(2,'หนึ่งพันปี · วงแหวนในตัวคุณเปลี่ยนเป็นสีม่วง','One thousand years · the ring inside you turns purple'),pool(P2,2),stage(3,'หนึ่งหมื่นปี · ขนของคุณดูดแสงจนเงาหายไป','Ten thousand years · your fur drinks the light'),pool(P3,2),stage(4,'เก้าหมื่นเก้าพันปีเศษ · มนุษย์เริ่มเข้ามาใกล้','Ninety-nine thousand years · humans come closer'),hunters,child,pool(P4,1),storm,final);
 run()}
// ---------- ฉากเกิด ----------
function birth(nx){const b=bs();choice('🐾 '+L('ใต้รากไม้โลก','Beneath the World Tree'),L('ป่าต้องห้ามพันพฤกษ์มืดกว่าที่ใครในโลกมนุษย์จะนึกออก ใต้รากไม้โลกต้นหนึ่ง มีสัตว์ตัวเล็กลืมตาเป็นครั้งแรก ยังไม่มีชื่อ ยังไม่มีพลัง มีแค่ความหิวกับความเย็นของดิน นั่นคือคุณ<br><br><b>คุณเกิดมาเป็นอะไร</b>','The Forbidden Forest is darker than anyone in the human world could picture. Under the roots of a World Tree, a small creature opens its eyes for the first time. No name, no power, only hunger and the cold of the soil. That is you.<br><br><b>What were you born as?</b>'),
 (a=>{a[0]._w=1;a[0]._x=1;return a})(BST.map(x=>O(`${x[1]} ${L(x[2],({b9rab:'Jade Moon Rabbit',b9snk:'Nine-Scale Night Serpent',b9ape:'Stone Ape Who Holds the Mountain',b9crn:'Thousand-League Cloud Crane',b9tig:'White Thunder Tiger'})[x[0]]||x[2])}`,tyN(x[3]),()=>{Object.assign(b,{sp:x[0],nm:x[2],ic:x[1],ty:x[3]});say(`${x[1]} ${L('ลูก'+x[2]+'ตัวหนึ่งคลานออกมาจากใต้รากไม้ ตัวเปียกและสั่น','A newborn '+x[2]+' crawls out from under the roots, wet and shaking')}`,'epic',true);nx()}))))}
function forage(nx){const b=bs();const f=FOOD[b.sp]||FOOD.b9rab;CH(L('ฤดูหนาวแรก','The first winter'),L(`หิมะตกหนักเกินกว่าสัตว์อายุไม่กี่ปีจะรอด ทั้งป่าเหลือกลิ่นอาหารจางๆ อยู่ใต้หิมะ คือ${f[0]} แต่นักล่าในหมู่บ้านก็รู้ว่าสัตว์หิวจะขุดตรงไหน`,`The snow is too deep for a creature only a few years old. The only scent of food left is under it: ${f[1]}. But the village trappers also know where hungry animals dig.`),[
 O('❄️ '+L('ขุดหาอาหาร (มินิเกม)','Dig for food (minigame)'),L('ระวังกับดัก','Watch for traps'),()=>mgo('sxForage',{},sc=>{if(sc>=.7){pw(1);b.inst++;say(L('🍖 คุณรอดฤดูหนาวแรกมาได้ ท้องอิ่มกว่าสัตว์ตัวอื่นในโพรงเดียวกัน','🍖 You make it through your first winter, fuller than anything else in the burrow'),'good')}else if(sc>=.35){say(L('🍂 คุณรอดมาได้แบบผอมจนเห็นกระดูก','🍂 You survive, thin enough to count your ribs'),'')}else{scar();b.trapF=1;say(L('🪤 ขาหลังติดบ่วงไปครึ่งคืน คุณกัดตัวเองหลุดมาได้ แต่จะกลัวกลิ่นเหล็กไปอีกนาน','🪤 A snare holds your hind leg half the night. You chew free, and the smell of iron will scare you for a long time'),'bad')}nx()})),
 O('😴 '+L('ขดตัวนอนรอฤดูใบไม้ผลิ','Curl up and wait for spring'),L('ไม่เสี่ยง · ตัวเล็ก','No risk · you stay small'),()=>{b.calm=1;say(L('😴 คุณหลับยาวจนหิมะละลาย ตื่นมาตัวเล็กกว่าพี่น้อง แต่หายใจได้เบาจนนกไม่ตกใจ','😴 You sleep until the snow melts and wake smaller than your siblings, but you breathe so lightly that birds do not startle'),'');nx()})])}
// ---------- สิบปี ----------
const P0=[
 {id:'rv',r:(b,nx)=>{const r=pick(RIV);CH(L('ตัวที่แย่งอาหาร','The one who steals your food'),L(`ลูก${r[0]}${r[2]}ตัวหนึ่งโตกว่าคุณครึ่งตัว มันขโมยอาหารจากปากคุณมาสามวันติด วันนี้มันยืนรออยู่หน้าโพรงอีก`,`A young ${r[1]} ${r[2]} half again your size has stolen food from your mouth three days running. Today it is waiting at your burrow again.`),[
  O('⚔️ '+L('กัดกลับ','Bite back'),L('อาจได้แผล','May scar'),()=>{b.rival=r;if(rnd()<.45+(b.pw||0)*.12){b.rv='hate';pw(1);say(L(`${r[2]} มันหนีไปพร้อมหูขาด และจะจำกลิ่นคุณไปอีกนาน`,`${r[2]} It runs with a torn ear, and it will remember your scent`),'good')}else{b.rv='hate';scar();say(L(`🩸 มันกดคุณจมโคลน ทิ้งรอยเขี้ยวไว้ที่คอ`,`🩸 It pins you in the mud and leaves its teeth in your neck`),'bad')}nx()}),
  O('🤝 '+L('แบ่งให้ครึ่งหนึ่ง','Share half'),L('อาจได้เพื่อน','Maybe a friend'),()=>{b.rival=r;b.rv='kin';say(L(`${r[2]} มันกินแล้วนั่งมองคุณนาน คืนนั้นมันนอนเฝ้าปากโพรงให้`,`${r[2]} It eats, stares at you for a long while, and that night it sleeps guarding your burrow`),'good');nx()}),
  O('🐝 '+L('ล่อให้ไปขโมยรังผึ้งแทน','Lure it into a beehive'),L('เล่ห์','Cunning'),()=>{b.rival=r;b.rv='hate';b.cun++;say(L(`🐝 เสียงร้องของมันดังไปทั้งหุบ คุณกินอาหารของคุณอย่างสงบเป็นครั้งแรก`,`🐝 Its yelping fills the valley. You eat in peace for the first time`),'good');nx()})])}},
 {id:'snk',r:(b,nx)=>CH(L('งูเหลือมพันปี','A thousand-year python'),L('เสียงเกล็ดครูดใบไม้แห้งดังใกล้เข้ามา งูเหลือมพันปีกำลังหากินผ่านทางนี้ ลำตัวมันหนากว่าต้นไม้ที่คุณซ่อนอยู่','Scales rasp across dry leaves, closer. A thousand-year python is hunting this way, its body thicker than the tree you are hiding behind.'),[
  O('🪨 '+L('นิ่งเหมือนก้อนหิน (มินิเกม)','Stay still as a stone (minigame)'),'',()=>mgo('sxHide',{},sc=>{if(sc>=.6){b.inst++;b.calm=1;say(L('🪨 งูเลื้อยผ่านไปห่างแค่หนึ่งช่วงหาง คุณเรียนรู้ว่าความนิ่งก็เป็นอาวุธ','🪨 It passes one tail-length away. You learn stillness is a weapon'),'good')}else{scar();say(L('🩸 มันฉกหนึ่งครั้ง คุณรอดเพราะมันอิ่มอยู่แล้ว','🩸 It strikes once. You live only because it had already eaten'),'bad')}nx()})),
  O('🏃 '+L('วิ่งหนีทิ้งโพรง','Run and abandon the burrow'),L('ปลอดภัย · เสียบ้าน','Safe · lose your home'),()=>{b.home=0;say(L('🏃 คุณวิ่งจนลืมทางกลับ คืนนั้นนอนใต้ใบไม้ที่ไหนสักแห่ง','🏃 You run until you forget the way back and sleep under leaves somewhere'),'');nx()})])},
 {id:'trp',r:(b,nx)=>CH(L('กวางน้อยในบ่วง','A fawn in a snare'),L('กวางน้อยตัวหนึ่งติดบ่วงลวดของพรานหมู่บ้าน มันร้องจนเสียงแหบ ในบ่วงข้างๆ ยังมีเหยื่อล่อเป็นเนื้อตากแห้ง','A fawn is caught in a village trapper\'s wire. It has cried itself hoarse. The next snare over is still baited with dried meat.'),[
  O('🦷 '+L('กัดลวดช่วยมัน','Chew the wire to free it'),L('เหงือกเลือดออก','Bleeding gums'),()=>{b.hu--;b.kind=(b.kind||0)+1;say(L('🦷 ลวดบาดปากจนเลือดซึม กวางวิ่งหายไป เช้าวันต่อมาพรานเตะบ่วงเปล่าแล้วสบถ','🦷 The wire cuts your mouth. The fawn bolts. Next morning the trapper kicks the empty snare and swears'),'good');nx()}),
  O('🍖 '+L('ค่อยๆ ดึงเหยื่อออกจากบ่วงข้างๆ','Ease the bait out of the other snare'),L('เล่ห์ · เสี่ยงติด','Cunning · risky'),()=>{if(rnd()<.55+(b.cun||0)*.15){b.cun++;pw(1);say(L('🍖 คุณดึงเนื้อออกมาได้โดยไม่แตะลวด แล้วเรียนรู้ว่ากลิ่นมนุษย์แปลว่าอะไร','🍖 You pull the meat free without touching the wire, and learn what human scent means'),'good')}else{scar();b.trapF=1;say(L('🪤 ลวดรัดข้อเท้าคุณ กว่าจะดิ้นหลุดก็เกือบเช้า','🪤 The wire bites your ankle. You thrash free just before dawn'),'bad')}nx()}),
  O('🚶 '+L('เดินอ้อมไป','Walk around'),'',()=>{b.cold=(b.cold||0)+1;say(L('🚶 เสียงร้องดังตามหลังคุณไปจนสุดเนิน','🚶 The crying follows you to the top of the ridge'),'');nx()})])},
 {id:'rain',r:(b,nx)=>CH(L('ฝนสามสิบวัน','Thirty days of rain'),L('ฝนตกไม่หยุดจนลำธารกลายเป็นแม่น้ำ สัตว์ตัวเล็กนับสิบติดอยู่บนเนินที่น้ำกำลังท่วม มีหินก้อนเดียวที่สูงพอ และจุได้ไม่กี่ตัว','It rains until the stream becomes a river. A dozen small animals are stranded on a hill as the water rises. One rock is high enough, and it holds only a few.'),[
  O('🌊 '+L('พาตัวเล็กข้ามน้ำทีละตัว','Ferry the small ones across one by one'),L('เหนื่อยมาก · ป่าจะจำ','Exhausting · the forest remembers'),()=>{b.pack=1;b.kind=(b.kind||0)+1;say(L('🌊 คุณข้ามไปกลับสิบเอ็ดรอบ รอบสุดท้ายแทบไม่มีแรงว่ายกลับ','🌊 Eleven crossings. On the last one you barely make it back'),'epic');nx()}),
  O('🪨 '+L('ยึดหินไว้ก่อน','Take the rock first'),L('รอด · แข็งแรงขึ้น','Survive · stronger'),()=>{pw(1);b.cold=(b.cold||0)+1;say(L('🪨 คุณนั่งบนหินดูน้ำพาเสียงร้องไปทีละเสียง','🪨 You sit on the rock and watch the water carry the cries away one by one'),'');nx()})])}];
// ---------- ร้อยปี ----------
function territory(nx){const b=bs();CH(L('อาณาเขต','Territory'),L('คุณโตพอจะมีอาณาเขตของตัวเอง ทางเหนือมีถ้ำของราชาหมีแก่ที่กำลังจะตาย ทางตะวันออกมีฝูงพวกเดียวกับคุณที่ยินดีรับเข้าฝูง','You are grown enough to hold land. North is the cave of an old bear king who is dying. East, a band of your own kind is willing to take you in.'),[
 O('⚔️ '+L('ท้าราชาหมีแก่ ชิงถ้ำ','Challenge the old bear king for his cave'),L('แข็งแกร่งขึ้น · มีแผล','Stronger · scarred'),()=>{b.str=1;scar();pw(1);say(L('⚔️ คุณชนะในคืนพระจันทร์เต็มดวง ถ้ำเป็นของคุณ แผลที่ไหล่ไม่เคยหาย','⚔️ You win under a full moon. The cave is yours; the shoulder wound never heals'),'epic');nx()}),
 O('🐾 '+L('เข้าฝูง','Join the band'),L('มีพวก','Allies'),()=>{b.pack=1;say(L('🐾 ฝูงรับคุณเหมือนลูกหลาน ทุกฤดูหนาวคุณนอนเบียดกันใต้หิมะ','🐾 They take you in like family. Every winter you sleep pressed together under the snow'),'good');nx()}),
 O('🌫️ '+L('ซ่อนตัวบำเพ็ญเงียบๆ','Cultivate alone, unseen'),L('เก็บกลิ่นอาย','Hide your aura'),()=>{b.calm=1;b.inst++;say(L('🌫️ คุณหายใจเบาจนนกมาเกาะบนหลังโดยไม่รู้ว่าเกาะอะไรอยู่','🌫️ You breathe so softly that birds land on your back without knowing what they stand on'),'good');nx()})])}
const P1=[
 {id:'mate',r:(b,nx)=>CH(L('เสียงตอบในคืนเดือนมืด','An answer on a moonless night'),L(`คืนหนึ่งคุณร้องเรียกไปในความมืดโดยไม่หวังอะไร แล้วมีเสียงร้องตอบกลับมา เป็น${b.nm}อีกตัวหนึ่ง หูข้างซ้ายมีรอยแหว่งเป็นรูปจันทร์เสี้ยว`,`One night you call into the dark expecting nothing, and something calls back: another ${b.nm}, with a crescent notch in its left ear.`),[
  O('🌙 '+L('ไปหามัน','Go to it'),L('มีคู่','A mate'),()=>{b.mate=1;say(L('🌙 ตั้งแต่คืนนั้น อาณาเขตของคุณมีกลิ่นของอีกตัวหนึ่งปนอยู่เสมอ','🌙 From that night, your territory always carries a second scent'),'epic');nx()}),
  O('🌫️ '+L('เงียบ แล้วปล่อยให้เสียงนั้นหายไป','Stay silent and let it fade'),L('อยู่ลำพัง','Alone'),()=>{b.calm=1;b.inst++;say(L('🌫️ เสียงนั้นร้องอีกสามคืน แล้วไม่ร้องอีกเลย','🌫️ It calls three more nights, then never again'),'');nx()})])},
 {id:'heal',r:(b,nx)=>CH(L('หมอยาชาวเขา','The hill-folk herbalist'),L('ชายแก่ถือตะกร้าเข้ามาเก็บสมุนไพรในเขตคุณทุกต้นเดือน เขาไม่เคยเหยียบดอกไม้ที่ยังไม่บาน และพึมพำขอบคุณป่าทุกครั้งก่อนกลับ','An old man with a basket gathers herbs in your territory at the start of every month. He never steps on an unopened flower, and he mutters thanks to the forest each time he leaves.'),[
  O('🌿 '+L('ปล่อยให้เขาเก็บ','Let him gather'),L('มนุษย์บางคนก็ไม่เลว','Some humans are not bad'),()=>{b.hu++;b.heal=1;say(L('🌿 หลายเดือนต่อมา คุณเจอก้อนเกลือวางไว้บนหินตรงที่เขาเคยนั่งพัก','🌿 Months later you find a lump of salt left on the rock where he used to rest'),'good');nx()}),
  O('🐾 '+L('แอบตามเขากลับหมู่บ้าน','Follow him back to the village'),L('เรียนรู้วิถีคน','Learn human ways'),()=>{b.cun++;b.vil=1;say(L('🐾 คุณนอนบนหลังคายุ้งข้าวทั้งคืน ฟังคนทะเลาะกันเรื่องราคาข้าว มนุษย์เสียงดังกว่าที่คิด','🐾 You lie on a granary roof all night listening to people argue about rice prices. Humans are louder than you thought'),'good');nx()}),
  O('😤 '+L('ขู่ให้เขาเลิกมา','Scare him off'),'',()=>{b.hu--;b.ht+=5;say(L('😤 เขาทิ้งตะกร้าแล้ววิ่ง เดือนต่อมามีพรานสองคนมาแทน','😤 He drops the basket and runs. Next month, two hunters come instead'),'bad');nx()})])},
 {id:'bolt',r:(b,nx)=>CH(L('ฟ้าผ่าต้นไม้วิญญาณ','Lightning splits a spirit tree'),L('ฟ้าผ่าต้นไม้อายุพันปีกลางเขตคุณจนแยกเป็นสองซีก ข้างในมีแก่นไม้สีทองเรืองแสงอยู่ก้อนหนึ่ง สัตว์ทั้งป่ากำลังมุ่งหน้ามาทางนี้','Lightning splits a thousand-year tree in your land. Inside glows a lump of golden heartwood. Every beast in the forest is heading this way.'),[
  O('😋 '+L('กินแก่นไม้ทันที','Eat it now'),L('พลัง ++','Power ++'),()=>{pw(2);say(L('😋 พลังร้อนไหลไปทั่วตัวจนขนลุกชันทั้งคืน','😋 Heat floods your body; your fur stands on end all night'),'epic');nx()}),
  O('🛡️ '+L('เฝ้าไว้ให้ป่าทั้งป่า','Guard it for the whole forest'),L('ป่าจะจำ','The forest will remember'),()=>{b.pack=1;b.kind=(b.kind||0)+1;b.wood=1;say(L('🛡️ คุณนอนเฝ้าสามเดือน แบ่งให้ตัวที่บาดเจ็บก่อน ตัวที่เหลือเรียกคุณว่าผู้คุ้มครอง','🛡️ You guard it for three months and feed the wounded first. The rest start calling you the Keeper'),'good');nx()}),
  ...(b.mate?[O('🌙 '+L('คาบไปให้คู่','Carry it to your mate'),'',()=>{b.mate=2;pw(1);say(L('🌙 คู่ของคุณกินแล้วซบหัวที่คอคุณนานกว่าทุกครั้ง','🌙 Your mate eats, then rests its head on your neck longer than ever'),'good');nx()})]:[])])},
 {id:'rvb',c:b=>!!b.rival,r:(b,nx)=>{const r=b.rival;if(b.rv==='kin'){CH(L(`${r[0]}ที่เคยกินอาหารครึ่งหนึ่งของคุณ`,`The ${r[1]} who once ate half your food`),L(`${r[2]} มันกลับมาตัวใหญ่ขึ้นสามเท่า คาบซากนกที่มีลูกธนูปักอยู่มาวางตรงหน้า "พวกสองขาเข้าป่าลึกกว่าเดิมแล้ว"`,`${r[2]} It comes back three times bigger and drops a bird with an arrow in it at your feet. "The two-legs are coming deeper."`),[O('🤝 '+L('สาบานเป็นพี่น้อง','Swear kinship'),L('มีพันธมิตร','An ally'),()=>{b.rv='bro';b.ht=Math.max(0,b.ht-5);say(L('🤝 ตั้งแต่วันนั้น ถ้ามีกลิ่นเหล็กเข้าป่า คุณจะรู้ก่อนเสมอ','🤝 From then on, whenever iron enters the forest, you hear of it first'),'good');nx()})]);return}
  CH(L(`${r[0]}กลับมา`,`The ${r[1]} returns`),L(`${r[2]} มันกลับมาพร้อมพวกอีกสามตัว และหูข้างที่ขาด มันยืนบนเส้นแบ่งเขตของคุณแล้วหอนท้า`,`${r[2]} It returns with three others and its torn ear, stands on your border, and howls a challenge.`),[
  O('🌕 '+L('หอนเรียกพวกมาประจัน (มินิเกม)','Howl for your own (minigame)'),'',()=>mgo('sxHowl',{},sc=>{if(sc>=.6||b.pack&&sc>=.4){pw(1);b.rv='beat';say(L('🌕 เสียงตอบรับดังมาจากทุกทิศ พวกมันถอยกลับไปโดยไม่ได้ข้ามเส้น','🌕 Answers rise from every direction. They retreat without crossing'),'epic')}else{b.terr=-1;scar();say(L('🩸 ไม่มีใครตอบ คุณเสียลำธารฝั่งตะวันออกให้มัน','🩸 No one answers. You lose the eastern stream to it'),'bad')}nx()})),
  O('⚔️ '+L('สู้ตัวต่อตัว','Fight it one on one'),L('ตัดสินด้วยแรง','Settle it by strength'),()=>{if(rnd()<.4+(b.pw||0)*.08+(b.str?.15:0)){pw(1);b.rv='beat';say(L('⚔️ มันนอนหงายยอมแพ้ แล้วจากไปพร้อมแค้นที่ลึกกว่าเดิม','⚔️ It rolls onto its back, then leaves with a deeper grudge'),'epic')}else{scar();scar();b.terr=-1;say(L('🩸 มันชนะ แต่ไม่ฆ่า มันอยากให้คุณมีชีวิตอยู่กับความพ่ายแพ้','🩸 It wins but does not kill you. It wants you to live with the loss'),'bad')}nx()})])}}];
// ---------- พันปี ----------
const P2=[
 {id:'cub',c:b=>!!b.mate,r:(b,nx)=>CH(L('ลูกสามตัว','Three cubs'),L(`ลูกสามตัวลืมตาในถ้ำของคุณ ตัวเล็กสุดตาบอดข้างหนึ่ง แต่ร้องดังที่สุด คุณต้องตัดสินใจว่าจะสอนอะไรเป็นอย่างแรก`,`Three cubs open their eyes in your den. The smallest is blind in one eye but cries the loudest. You must decide what to teach them first.`),[
  O('🏹 '+L('สอนให้กลัวกลิ่นคน','Teach them to fear human scent'),L('ปลอดภัย','Safe'),()=>{b.cubs=3;b.cubT='fear';say(L('🏹 คุณพาลูกไปดมบ่วงลวด แล้วกัดคอเบาๆ ทุกครั้งที่มันเข้าใกล้','🏹 You make them sniff a snare and nip their necks every time they get close'),'good');nx()}),
  O('🤲 '+L('สอนว่ามนุษย์ไม่ได้เลวทุกคน','Teach them not all humans are cruel'),L('กล้า · เสี่ยง','Bold · risky'),()=>{b.cubs=3;b.cubT='bold';say(L('🤲 คุณพาลูกไปนอนดูหมอยาเก็บสมุนไพรจากพุ่มไม้ เขาไม่เคยรู้ว่ามีตาสี่คู่มองอยู่','🤲 You take them to watch the herbalist from the bushes. He never knows four pairs of eyes are on him'),'');nx()}),
  O('🌫️ '+L('ซ่อนพวกมันไว้ลึกสุดในป่า','Hide them in the deepest woods'),L('ห่างเหิน','Distant'),()=>{b.cubs=3;b.cubT='hide';b.inst++;say(L('🌫️ ลูกโตมาโดยไม่เคยเห็นแสงแดดตรงๆ และไม่เคยเห็นหน้าคุณบ่อยนัก','🌫️ They grow up without direct sunlight, and without seeing much of you'),'');nx()})])},
 {id:'pact',r:(b,nx)=>CH(L('ผู้ปลุกจิตชราหลงป่า','An old spirit master, lost'),L('ชายชราในเสื้อคลุมขาดวิ่นหลงเข้ามาสามวันแล้ว เขาไม่กลัวคุณเลย "ข้าไม่ได้มาล่า ข้ามาหาที่ตาย แต่ถ้าเจ้าพาข้าออกไป ข้าจะให้หลานข้าสาบานว่าตระกูลเราจะไม่ล่าเผ่าเจ้าอีก"','An old man in a torn robe has been lost for three days. He is not afraid of you. "I didn\'t come to hunt. I came to die. But lead me out, and my grandson will swear our clan never hunts your kind again."'),[
  O('🤝 '+L('พาเขาออกไป รับคำสาบาน','Lead him out and take the vow'),L('มีสัญญากับมนุษย์','A pact with humans'),()=>{b.pact=1;b.hu++;say(L('🤝 ที่ขอบป่าเขากรีดนิ้ว หยดเลือดลงบนรอยเท้าคุณ "ตระกูลจ้าวจำแล้ว"','🤝 At the forest edge he cuts his finger and lets a drop fall into your pawprint. "The Zhao clan remembers."'),'epic');nx()}),
  O('🎒 '+L('ขโมยเสบียงแล้วทิ้งเขาไว้','Steal his supplies and leave him'),L('อิ่ม','Fed'),()=>{pw(1);b.cold=(b.cold||0)+1;say(L('🎒 ในห่อมีเนื้อตากแห้งกับยาเม็ดเหลืองสามเม็ด คุณกินหมด','🎒 Dried meat and three yellow pills. You eat them all'),'');nx()}),
  O('🌲 '+L('ปล่อยไว้แบบนั้น','Leave him be'),'',()=>{say(L('🌲 ฤดูใบไม้ผลิปีต่อมา มีเสื้อคลุมขาดวิ่นแขวนอยู่บนกิ่งไม้','🌲 Next spring, a torn robe hangs from a branch'),'');nx()})])},
 {id:'moon',r:(b,nx)=>CH(L('คืนจันทร์สีเลือด','The blood-moon night'),L('ทุกพันปีจะมีคืนที่จันทร์เป็นสีแดง สัตว์วิญญาณทั้งป่าออกมาหอนพร้อมกัน ใครเสียงดังและตรงจังหวะที่สุดจะได้แสงจันทร์มากที่สุด','Once a thousand years the moon turns red and every spirit beast howls together. Whoever is loudest and truest to the rhythm drinks the most moonlight.'),[
  O('🌕 '+L('หอนร่วมกับป่า (มินิเกม)','Howl with the forest (minigame)'),'',()=>mgo('sxHowl',{},sc=>{if(sc>=.65){pw(2);say(L('🌕 แสงจันทร์ไหลเข้าตัวคุณจนเห็นเส้นเลือดเรืองแสงใต้ผิว','🌕 Moonlight pours into you until your veins glow under your skin'),'myth')}else{pw(1);say(L('🌕 เสียงคุณจมหายไปในเสียงนับพัน แต่ก็ได้แสงมาบ้าง','🌕 Your voice is lost among thousands, but you catch some light'),'')}nx()})),
  O('🌫️ '+L('ซ่อนตัว ไม่ร่วม','Hide and sit it out'),L('ไม่มีใครเห็น','No one sees you'),()=>{b.inst++;b.ht=Math.max(0,b.ht-5);say(L('🌫️ คืนนั้นพรานก็รู้ว่าป่าจะส่งเสียง เขาตั้งค่ายฟังอยู่ที่ขอบป่า คุณไม่อยู่ในรายชื่อของพวกเขา','🌫️ The hunters also knew. They camped at the edge, listening. You are not on their list'),'good');nx()})])},
 {id:'mkt',c:b=>b.cubs&&b.cubT==='bold',r:(b,nx)=>CH(L('ลูกตัวเล็กหายไป','The smallest cub is gone'),L('ลูกตัวที่ตาบอดข้างหนึ่งเดินตามกลิ่นหมอยาออกไปขอบป่า แล้วไม่กลับมา คืนนั้นคุณได้กลิ่นมันอยู่ในค่ายพรานตลาดมืดริมแม่น้ำ','The cub blind in one eye followed the herbalist\'s scent to the forest edge and did not return. That night you smell it in a black-market trappers\' camp by the river.'),[
  O('🪨 '+L('ลอบเข้าค่ายไปพาลูกออกมา (มินิเกม)','Sneak into the camp (minigame)'),'',()=>mgo('sxHide',{ez:.9},sc=>{if(sc>=.55){say(L('🪨 คุณคาบลูกออกมาจากกรงไม้ทั้งที่ยามยังกรน','🪨 You carry the cub out of a wooden cage while the guard snores'),'epic');b.ht+=5}else{b.cubs=2;b.cubLost=1;b.hate=1;scar();say(L('🩸 ยามตื่น คุณออกมาได้ตัวเดียว ลูกยังอยู่ในกรง','🩸 The guard wakes. You get out alone. The cub stays in the cage'),'bad')}nx()})),
  ...(b.wood?[O('🪵 '+L('เอาแก่นไม้ทองไปวางแลก','Trade the golden heartwood'),L('เสียของมีค่า','Lose a treasure'),()=>{b.wood=0;b.hu++;say(L('🪵 คุณวางแก่นไม้ไว้หน้าค่ายแล้วถอยไป เช้ามาลูกถูกปล่อยไว้ที่ขอบป่า พรานบางคนก็รู้จักแลกเปลี่ยน','🪵 You leave the heartwood at the camp and back away. At dawn the cub is set loose at the edge. Some hunters understand trade'),'good');nx()})]:[]),
  O('💧 '+L('ปล่อยไป','Let it go'),L('ทั้งป่าจะเห็น','The whole forest will see'),()=>{b.cubs=2;b.cubLost=1;b.cold=(b.cold||0)+1;say(L('💧 ทั้งคืนคุณนั่งอยู่ริมแม่น้ำ ไม่ขยับ','💧 You sit by the river all night, not moving'),'bad');nx()})])}];
// ---------- หมื่นปี ----------
const P3=[
 {id:'war',r:(b,nx)=>CH(L('ประชุมราชาป่า','The forest kings convene'),L('ราชาพยัคฆ์แสนปีเรียกสัตว์หมื่นปีทั้งป่ามาประชุมที่หน้าผาหิน เขาจะนำทัพบุกหมู่บ้านริมป่าในคืนเดือนดับ ล้างแค้นให้ทุกตัวที่กลายเป็นวงแหวน','The hundred-thousand-year tiger king summons every ten-thousand-year beast to the cliff. On the next dark moon he will lead them against the border villages, in revenge for every beast turned into a ring.'),[
  O('🔥 '+L('ร่วมทัพ','Join the raid'),L('พลัง + · มนุษย์จะจำ','Power + · humans will remember'),()=>{pw(1);b.hate=1;b.hu-=2;b.ht+=20;say(L('🔥 หมู่บ้านสามแห่งไหม้ในคืนเดียว ชื่อของคุณไปอยู่บนกระดานล่าของสภาทวีป','🔥 Three villages burn in one night. Your name goes onto the Continental Council\'s hunt board'),'bad');nx()}),
  O('🛑 '+L('ค้านกลางที่ประชุม','Oppose it before them all'),L('อาจถูกมองเป็นศัตรู','You may be marked'),()=>{b.hu++;if(b.pack||b.kind>=2){b.voice=1;say(L('🛑 สัตว์ที่คุณเคยช่วยไว้ยืนข้างคุณทีละตัว ทัพเลื่อนออกไปไม่มีกำหนด','🛑 The beasts you once helped stand beside you one by one. The raid is postponed indefinitely'),'epic')}else{scar();say(L('🩸 ราชาพยัคฆ์ตบคุณจนกลิ้งตกหน้าผา คุณรอดเพราะต้นไม้รับไว้','🩸 The tiger king swats you off the cliff. A tree catches you'),'bad')}nx()}),
  ...(b.vil||b.heal?[O('🐾 '+L('แอบไปเตือนหมู่บ้าน','Warn the village in secret'),L('ทรยศเผ่า · ช่วยคน','Betray your kind · save people'),()=>{b.hu+=2;b.traitor=1;say(L('🐾 คุณข่วนประตูบ้านหมอยาตอนตีสาม เขาเปิดประตู เห็นคุณ แล้วพยักหน้าครั้งเดียว คืนเดือนดับนั้นหมู่บ้านว่างเปล่า','🐾 At three in the morning you scratch the herbalist\'s door. He opens it, sees you, nods once. On the dark moon the village is empty'),'epic');nx()})]:[])])},
 {id:'old',r:(b,nx)=>CH(L('ราชาหมีที่กำลังตาย','A dying bear king'),L('สัตว์แสนปีตัวหนึ่งนอนรอความตายในหุบหิมะ มันเห็นคุณแล้วหัวเราะ "เข้ามาสิ แก่นของข้ายังอุ่น ดีกว่าให้พวกสองขาแบ่งกันเป็นชิ้นๆ"','A hundred-thousand-year beast lies waiting to die in a snow valley. It laughs when it sees you. "Come. My core is still warm. Better you than two-legs carving me up."'),[
  O('🔴 '+L('รับแก่นของมัน','Take its core'),L('พลัง +++','Power +++'),()=>{pw(3);b.core=1;say(L('🔴 พลังแสนปีไหลเข้าตัวคุณเหมือนแม่น้ำที่ไหลผิดทาง คุณนอนชักอยู่สามวัน','🔴 A hundred thousand years of power floods you like a river running backwards. You convulse for three days'),'myth');nx()}),
  O('⛰️ '+L('ฝังมันให้ลึกพอที่ไม่มีใครขุดเจอ','Bury it deep enough no one will dig it up'),L('ป่าจะจำ','The forest will remember'),()=>{b.kind=(b.kind||0)+1;b.inst++;say(L('⛰️ คุณขุดอยู่สองเดือน ก่อนตาย มันบอกทางหนีที่พรานไม่เคยรู้ให้หนึ่งทาง','⛰️ You dig for two months. Before it dies, it tells you one escape path no hunter knows'),'good');b.path=1;nx()})])},
 {id:'rvh',c:b=>!!b.rival&&b.rv!=='bro',r:(b,nx)=>{const r=b.rival;CH(L(`${r[0]}ที่ไปถึงก่อน`,`The ${r[1]} got there first`),L(`${r[2]} ข่าวมาถึงหูคุณว่า${r[0]}ตัวนั้นข้ามแสนปีไปก่อนคุณ และเลือกแปลงกายเป็นมนุษย์ ก่อนไป มันทิ้งรอยข่วนไว้หน้าถ้ำคุณสามรอย เป็นภาษาสัตว์ที่แปลว่า "รอเจอกันข้างโน้น"`,`${r[2]} Word reaches you: that ${r[1]} crossed a hundred thousand years before you and chose to become human. Before it left, it scratched three marks outside your den, beast-speech for "see you on the other side."`),[
  O('🔥 '+L('จำกลิ่นมันไว้ให้ขึ้นใจ','Burn its scent into memory'),L('เจอกันอีกในร่างคน','You will meet again as humans'),()=>{b.rvh=1;say(L('🔥 คุณดมรอยข่วนจนจำได้แม้ในฝัน','🔥 You smell the marks until you know them in your sleep'),'');nx()}),
  O('🍃 '+L('ข่วนทับให้หายไป','Scratch over them'),L('ปล่อยวาง','Let go'),()=>{b.rvh=2;b.inst++;say(L('🍃 รอยใหม่ของคุณกลบรอยเก่าจนไม่เหลือ แต่ความจำไม่ได้หายตามไปด้วย','🍃 Your marks erase its marks. Memory does not erase so easily'),'');nx()})])}},
 {id:'dry',r:(b,nx)=>CH(L('ปีแล้ง','The drought year'),L('ลำธารทุกสายแห้ง เหลือแอ่งน้ำเดียวในเขตคุณ สัตว์ที่เคยเป็นศัตรูยืนเรียงแถวรออยู่อีกฝั่ง ไม่มีตัวไหนกล้าก้าวมาก่อน','Every stream dries up but one pool in your territory. Beasts who were once your enemies line up on the far side. None dares step first.'),[
  O('💧 '+L('ถอยให้ทุกตัวได้ดื่ม','Step back so all can drink'),L('ป่าจะจำ','The forest will remember'),()=>{b.kind=(b.kind||0)+1;b.pack=1;say(L('💧 ตัวสุดท้ายที่ดื่มคือหมาป่าที่เคยกัดลูกคุณ มันก้มหัวต่ำกว่าทุกตัว','💧 The last to drink is the wolf that once bit your cub. It bows lowest'),'good');nx()}),
  O('🛡️ '+L('ให้เฉพาะพวกของตัวเอง','Only your own may drink'),L('ฝูงแข็งแรง · มีศัตรูเพิ่ม','Strong band · more enemies'),()=>{pw(1);b.cold=(b.cold||0)+1;say(L('🛡️ คุณยืนขวางทั้งฤดู ฝั่งตรงข้ามบางตัวไม่ได้กลับไปถึงรัง','🛡️ You stand guard all season. Some on the far side never make it home'),'');nx()})])}];
// ---------- ช่วงสุดท้ายก่อนทัณฑ์ (เหตุการณ์ที่จะตามมาในชีวิตคน) ----------
function hunters(nx){const b=bs();const h=pick(HNT);b.foe=h[0];b.foeE=h[1];const warn=b.rv==='bro'||b.voice;
 CH(L('ยี่สิบปีก่อนทัณฑ์: กองล่าวงแหวน','Twenty years before the tribulation: the ring hunters'),L(`${warn?'คุณได้ข่าวล่วงหน้าสามวัน ':''}กองล่าหกคนนำโดย<b>${h[0]}</b> ชายอายุราวสามสิบที่ยิงธนูนิ่งที่สุดในแคว้น บุกเข้ามาเพื่อวงแหวนหมื่นปีของคุณ ${b.pack?'ฝูงคุณล้มไปทีละตัว':'ถ้ำคุณถูกล้อม'}`,`${warn?'You hear of it three days early. ':''}Six ring hunters led by <b>${h[1]}</b>, a man of about thirty with the steadiest bow in the province, come for your ten-thousand-year ring. ${b.pack?'Your band falls one by one.':'Your den is surrounded.'}`),[
  O('🏃 '+L('หนีลึกเข้าป่าต้องห้าม (มินิเกม)','Flee into the Forbidden Forest (minigame)'),b.path?L('รู้ทางลับ','You know a hidden path'):'',()=>mgo('sxChase',{ez:b.path?1.25:1},sc=>{b.hate=1;if(sc<.45){scar();say(L(`🏹 ลูกธนูของ${h[0]}ปักอยู่ที่สีข้างคุณจนถึงวันทัณฑ์`,`🏹 An arrow from ${h[1]} stays in your flank until the day of tribulation`),'bad')}else say(L(`🏃 คุณหนีรอด แต่จำใบหน้า${h[0]}ได้ทุกรอยย่น`,`🏃 You escape, and you remember every line of ${h[1]}'s face`),'');nx()})),
  O('🩸 '+L('สู้จนนักล่าบาดเจ็บ','Fight until the hunter bleeds'),L('เขาจะจำคุณ','He will remember you'),()=>{b.hate=1;scar();b.str=(b.str||0)+1;pw(1);say(L(`🩸 ${h[0]}เสียตาไปข้างหนึ่ง คุณเสีย${b.pack?'ฝูง':'ถ้ำ'}ทั้งหมด`,`🩸 ${h[1]} loses an eye. You lose your ${b.pack?'band':'den'}`),'epic');nx()}),
  ...(b.cun>=2?[O('🪤 '+L('ล่อทั้งกองเข้าบึงดูดโคลน','Lure them into the sucking bog'),L('เล่ห์','Cunning'),()=>{b.hate=1;b.trick=1;b.ht+=10;say(L(`🪤 สามคนจมหายไปในบึง ${h[0]}รอดมาได้คนเดียว เขาจะไม่ลืมว่าสัตว์ตัวหนึ่งหลอกเขาได้`,`🪤 Three sink into the bog. ${h[1]} alone survives, and he will never forget a beast outsmarted him`),'epic');nx()})]:[]),
  O('👁️ '+L('ยอมให้เขาเห็น แล้วยืนนิ่ง','Let him see you, and stand still'),L('เมตตา','Mercy'),()=>{b.mercy=1;say(L(`👁️ ${h[0]}ยกธนูค้างไว้นาน แล้วลดลง เขาพาคนออกจากป่าในคืนนั้น`,`👁️ ${h[1]} holds the draw a long time, then lowers it. He leads his men out that night`),'epic');nx()})])}
function child(nx){const b=bs();const fn=pick(GIRL);CH(L('ห้าปีก่อนทัณฑ์: เด็กที่หลงป่า','Five years before: the lost child'),L(`เด็กผู้หญิงอายุราวเจ็ดขวบหลงเข้ามาในอาณาเขตคุณ ตัวสั่น เท้าเปื้อนเลือด เธอบอกว่าชื่อ "${fn}" พ่อของเธอเป็นนักล่าวงแหวนที่ไม่กลับบ้านมาสามวัน${b.foe&&rnd()<.5?` และพ่อเคยเล่าเรื่องสัตว์ที่ทำให้${b.foe}เสียตา`:''}`,`A girl of about seven wanders into your territory, shaking, feet bloody. She says her name is "${fn}". Her father is a ring hunter who hasn't come home in three days.`),[
  O('🤲 '+L('พาไปส่งที่ขอบป่า','Carry her to the edge'),L('ผูกพัน','A bond'),()=>{b.friend=fn;say(L(`🤲 ${fn}ขี่หลังคุณออกไป ก่อนวิ่งกลับหมู่บ้าน เธอผูกด้ายแดงไว้ที่${b.sp==='b9snk'?'หาง':'ขา'}ของคุณ`,`🤲 ${fn} rides your back to the edge, and before running home she ties a red thread around your ${b.sp==='b9snk'?'tail':'leg'}`),'epic');nx()}),
  O('🔥 '+L('เลี้ยงไว้ในถ้ำสามคืนจนแผลหาย','Keep her in your den three nights until she heals'),L('ผูกพันลึก · หมู่บ้านออกตามหา','Deep bond · the village searches'),()=>{b.friend=fn;b.fr0=1;b.ht+=10;say(L(`🔥 ${fn}นอนกอดขนคุณทั้งสามคืน คืนที่สี่คุณได้ยินเสียงคนเรียกชื่อเธอทั่วป่า จึงพาเธอไปส่ง`,`🔥 ${fn} sleeps curled in your fur three nights. On the fourth, the whole forest echoes with her name, so you take her back`),'epic');nx()}),
  O('🌲 '+L('ปล่อยให้ป่าตัดสิน','Let the forest decide'),L('ไม่ยุ่งกับคน','Stay out of human matters'),()=>{b.cold=(b.cold||0)+1;say(L('🌲 คุณหันหลังให้เสียงร้องไห้ เช้าวันรุ่งขึ้นป่าเงียบสนิท','🌲 You turn from the crying. In the morning, the forest is silent'),'');nx()})])}
const P4=[
 {id:'cubG',c:b=>b.cubs>0,r:(b,nx)=>CH(L('ลูกที่โตแล้ว','Your grown cubs'),L(`ลูก${b.cubs>2?'ทั้งสาม':'ที่เหลือ'}ของคุณข้ามหมื่นปีไปแล้ว ตัวโตสุดได้ข่าวว่าคุณใกล้ครบแสนปี มันมานั่งหน้าถ้ำ "ถ้าท่านไปเป็นคน ข้าขอตามไปด้วย"`,`Your ${b.cubs>2?'three':'remaining'} cubs have passed ten thousand years. The eldest has heard you are near a hundred thousand. It sits at your den. "If you go to be human, let me follow."`),[
  O('🏞️ '+L('ให้มันอยู่เฝ้าป่าแทน','Ask it to guard the forest instead'),L('จะเจอกันอีก','You will meet again'),()=>{b.cubW=1;say(L('🏞️ มันก้มหัวรับ วันที่คุณจากไป มันขึ้นไปยืนบนหินที่คุณเคยยืน','🏞️ It bows. On the day you leave, it climbs onto the rock where you used to stand'),'good');nx()}),
  O('🫂 '+L('สัญญาว่าจะกลับมาหา','Promise to come back'),'',()=>{b.cubW=2;say(L('🫂 มันเลียหน้าคุณเหมือนตอนยังเล็ก แล้วเดินกลับเข้าป่าโดยไม่หันมา','🫂 It licks your face like it did as a cub, then walks into the woods without looking back'),'good');nx()})])},
 {id:'pactG',c:b=>!!b.pact,r:(b,nx)=>CH(L('หลานตระกูลจ้าว','The Zhao grandson'),L('ชายหนุ่มคนหนึ่งเดินเข้ามากลางเขตคุณโดยไม่มีอาวุธ วางป้ายไม้แกะชื่อตระกูลจ้าวไว้บนหิน "ปู่บอกว่าถ้าวันหนึ่งท่านต้องการอะไรจากมนุษย์ ให้ถือป้ายนี้มา"','A young man walks into your land unarmed and sets a carved Zhao clan tablet on a rock. "Grandfather said if you ever need anything from humans, bring this."'),[
  O('🪵 '+L('คาบป้ายเก็บไว้','Take the tablet'),L('มีคนคุ้มครองในโลกคน','A protector among humans'),()=>{b.pact=2;say(L('🪵 ป้ายไม้มีกลิ่นธูปกับกลิ่นมือคนแก่','🪵 The tablet smells of incense and an old man\'s hands'),'good');nx()})])},
 {id:'quiet',r:(b,nx)=>CH(L('คืนสุดท้ายในร่างสัตว์','The last night as a beast'),L('อีกไม่กี่วันจะครบแสนปี คุณนอนบนหินที่สูงที่สุดของอาณาเขต มองป่าที่เคยหนาว เคยหิว เคยเป็นบ้าน','A few days from a hundred thousand years. You lie on the highest rock of your land and look over the forest that was cold, hungry, and home.'),[
  O('🌌 '+L('จดจำทุกกลิ่นไว้','Memorize every scent'),L('ความทรงจำแสนปีชัดขึ้น','Sharper memories'),()=>{b.inst++;say(L('🌌 กลิ่นดินหลังฝน กลิ่นไม้ไหม้ กลิ่นด้ายแดง คุณจะเอาทั้งหมดติดตัวไป','🌌 Earth after rain, burnt wood, red thread. You will carry all of it'),'good');nx()}),
  O('😴 '+L('นอนหลับยาวเป็นครั้งสุดท้าย','Sleep, one last long sleep'),L('พลังชีวิตเต็ม','Fully rested'),()=>{b.rest=1;say(L('😴 คุณฝันถึงฤดูหนาวแรก ตอนที่ยังตัวเล็กพอจะกลัวทุกอย่าง','😴 You dream of your first winter, when you were small enough to fear everything'),'');nx()})])}];
// ---------- ทัณฑ์สวรรค์ + ทางแยกสุดท้าย ----------
function storm(nx){const b=bs();CH(L('ทัณฑ์สวรรค์','The Heavenly Tribulation'),L(`ครบหนึ่งแสนปี ฟ้ามืดลงทั้งป่า เมฆหมุนเป็นวงเหนือหัวคุณเก้าชั้น สัตว์ทุกตัวในรัศมีสิบลี้หนีไปหมดแล้ว${b.pack?' ยกเว้นฝูงของคุณที่ยืนดูอยู่บนสันเขา':''}`,`A hundred thousand years. The forest goes dark. Clouds wheel above you in nine layers. Every beast for ten leagues has fled${b.pack?', except your band, watching from the ridge':''}.`),[
  O('⚡ '+L('รับทัณฑ์ (มินิเกม)','Face the tribulation (minigame)'),'',()=>mgo('sxStorm',{ez:b.rest?1.12:1},sc=>{b.trib=sc;if(sc>=.8){pw(2);say(L('⚡ สายฟ้าสายที่เก้าลงกลางหลังคุณ แล้วแตกออกเป็นแสง ร่างคุณไม่มีรอยไหม้แม้แต่เส้นเดียว','⚡ The ninth bolt hits your back and shatters into light. Not a single burn'),'myth')}else if(sc>=.45){pw(1);say(L('⚡ คุณรอดมาได้ ขนไหม้ไปครึ่งตัว','⚡ You survive with half your fur burned away'),'epic')}else{scar();scar();say(L('⚡ สายฟ้าห้าสายลงตรงตัวคุณ คุณยังหายใจอยู่ ซึ่งก็มากพอแล้ว','⚡ Five bolts land on you. You are still breathing, which is enough'),'bad')}nx()}))])}
function final(nx){const b=bs();const g=G();
 const toHuman=()=>{CH(L('เลือกเป็นมนุษย์เพราะอะไร','Why become human?'),L('ร่างแสนปีจะสลายเป็นแสง แล้วเกิดใหม่เป็นทารกมนุษย์ ไม่มีพลัง ไม่มีใครรู้ว่าคุณเคยเป็นอะไร','The hundred-thousand-year body will dissolve into light and be reborn as a human baby. No power. No one will know what you were.'),[
   O('🔥 '+L('เพื่อแก้แค้นนักล่า','For revenge on the hunter'),L('ตามหา','Hunt down ')+L(b.foe,b.foeE||b.foe),()=>{b.aim='rev';go()}),
   ...(b.friend?[O(`🧵 ${L('เพื่อตามหา','To find ')}${b.friend}`,L('ด้ายแดงยังอยู่','The red thread is still there'),()=>{b.aim='find';go()})]:[]),
   O('📖 '+L('เพื่อเรียนรู้ว่ามนุษย์คืออะไร','To learn what humans are'),'',()=>{b.aim='learn';go()}),
   O('🫥 '+L('เพื่อหนีจากการถูกล่าตลอดกาล','To stop being hunted forever'),'',()=>{b.aim='hide';go()})])};
 const go=()=>{b.yr=100000;b.sus=cl((b.calm?5:15)+(b.ht||0)/2-(b.inst||0)*2,0,60);b.pro=9;busy=0;say(L(`🌩️ ฟ้าผ่าลงกลางป่าเก้าครั้ง ร่างของ${b.nm}สลายเป็นแสง <b>คุณลืมตาขึ้นในร่างทารกมนุษย์</b> ถูกวางไว้หน้าบ้านคนในหมู่บ้าน ความทรงจำแสนปียังอยู่ครบ`,`🌩️ Lightning strikes nine times. The ${b.nm}'s body dissolves into light. <b>You open your eyes as a human baby</b>, left on a village doorstep, every memory intact`),'myth',true);nx()};
 const gift=()=>{const ppl=[];if(b.friend)ppl.push(['f',`🧵 ${b.friend}`,L('เด็กที่คุณเคยพาออกจากป่า ตอนนี้กลายเป็นผู้ฝึกจิต','The child you once saved, now a spirit master')]);if(b.pact)ppl.push(['p','🪵 '+L('หลานตระกูลจ้าว','The Zhao grandson'),L('ผู้ถือคำสาบานของตระกูล','Keeper of the clan vow')]);ppl.push(['s','🌀 '+L('ตัวคุณเองในชาติหน้า','Your own next life'),L('วงแหวนจะรออยู่ในป่าจนกว่าคุณจะกลับมา','The ring will wait in the forest until you return')]);
  CH(L('มอบให้ใคร','Give it to whom?'),L('สัตว์วิญญาณแสนปีที่ยอมมอบตัวเองด้วยใจ จะกลายเป็นวงแหวนที่ไม่ทำร้ายผู้รับ คุณต้องเลือกว่าใคร','A hundred-thousand-year beast who gives itself willingly becomes a ring that will not harm the one who takes it. You must choose who.'),ppl.map(p=>O(p[1],p[2],()=>{try{LS.set('murim_svgift',{nm:b.nm,ic:b.ic,ty:b.ty,to:p[0],w:p[0]==='f'?b.friend:'',t:Date.now()})}catch(e){}rec('b9_gift');
   say(p[0]==='s'?L(`💫 ร่างของ${b.nm}กลายเป็นวงแหวนสีแดงที่จมลงใต้รากไม้โลก รอเจ้าของที่ยังไม่เกิด`,`💫 The ${b.nm} becomes a red ring that sinks beneath the World Tree, waiting for an owner not yet born`):L(`💫 ${b.nm}กลายเป็นวงแหวนสีแดงที่ลอยออกจากป่าไปหา${p[1]} ไม่มีใครในโลกคนรู้ว่ามันมาจากไหน`,`💫 The ${b.nm} becomes a red ring that drifts out of the forest toward ${p[1]}. No human will know where it came from`),'myth',true);
   b.pro=-1;g.bst=null;g.giftE=1;busy=0;say(L('🌱 เสี้ยววิญญาณสุดท้ายของคุณหล่นลงมาเกิดเป็นทารกธรรมดาในหมู่บ้านริมป่า ไม่มีร่างเดิม ไม่มีพลังแสนปี มีแค่ความฝันถึงป่าที่ไม่รู้ว่ามาจากไหน','🌱 The last splinter of your soul falls into an ordinary baby in a border village. No old body, no hundred thousand years of power. Only dreams of a forest you can\'t explain'),'epic',true);nx()})))};
 const reign=()=>{b.king=1;Q.unshift(reign1,reign2,reign3);nx()};
 CH(L('หนึ่งแสนปี: ทางแยก','One hundred thousand years: the crossroads'),L(`คุณรอดทัณฑ์มาแล้ว สัตว์วิญญาณแสนปีมีทางให้เลือกไม่มาก ทุกทางต้องเสียบางอย่าง`,`You have survived. A hundred-thousand-year beast has few roads left, and every one costs something.`),[
  O('🧒 '+L('แปลงกายเป็นมนุษย์','Become human'),L('เริ่มชีวิตคน · ต้องซ่อนตัวตน','Begin a human life · hide what you are'),toHuman),
  O('👑 '+L('ไม่แปลงกาย ครองป่าต่อ','Stay. Rule the forest'),L('เรื่องราวต่ออีกสามบท ก่อนต้องเลือกอีกครั้ง','Three more chapters before you must choose again'),reign),
  O('💫 '+L('มอบตัวเองเป็นวงแหวน','Give yourself as a ring'),L('ฉากจบระดับ S · มรดกข้ามชาติ','S-rank ending · a legacy for a future life'),gift)]);
 // ครองป่า 3 บท แล้วต้องเลือกระหว่างเป็นคน / มอบตัว
 function reign1(nx2){CH(L('ราชาป่า · การล่าครั้งใหญ่','Forest King · the Great Hunt'),L('สภาทวีปส่งกองล่าห้าร้อยคนเข้าป่าเพื่อวงแหวนแสนปีของคุณโดยเฉพาะ ธงของพวกเขาปักอยู่ทุกเนิน','The Continental Council sends five hundred hunters for your hundred-thousand-year ring alone. Their banners crown every hill.'),[
   O('🌕 '+L('หอนเรียกทั้งป่า (มินิเกม)','Call the whole forest (minigame)'),'',()=>mgo('sxHowl',{ez:b.pack?1.15:.95},sc=>{if(sc>=.55||b.kind>=3){pw(2);say(L('🌕 ป่าทั้งผืนลุกขึ้นตอบ กองล่าถอยออกไปโดยไม่ได้แม้แต่ขนเส้นเดียว','🌕 The whole forest rises to answer. They retreat without a single hair'),'myth')}else{scar();b.loss=1;say(L('🩸 คุณชนะ แต่สัตว์ที่ยืนข้างคุณตายไปครึ่งหนึ่ง','🩸 You win, but half of those who stood with you die'),'bad')}nx2()})),
   O('🏃 '+L('ล่อพวกมันวนในป่าลึก (มินิเกม)','Lead them in circles through the deep woods (minigame)'),'',()=>mgo('sxChase',{ez:1.1},sc=>{if(sc>=.5){pw(1);b.cun++;say(L('🏃 สิบวันต่อมา กองล่าออกจากป่ามาด้วยรองเท้าขาดทุกคู่ ไม่มีใครเห็นคุณเลย','🏃 Ten days later they stumble out with every boot in shreds. Not one of them saw you'),'epic')}else{scar();say(L('🩸 ลูกธนูสามดอกตามคุณไปถึงถ้ำ','🩸 Three arrows follow you all the way home'),'bad')}nx2()}))])}
 function reign2(nx2){const ok=(b.hu||0)>=2||b.pact||b.traitor;CH(L('ราชาป่า · ทูตจากโลกคน','Forest King · an envoy from the human world'),L(`ชายในชุดสภาทวีปเดินเข้าป่ามาคนเดียว ถือหนังสือสัญญาสงบศึก "ถ้าท่านรับรองว่าสัตว์ในป่าจะไม่ออกนอกเขต สภาจะเลิกออกใบอนุญาตล่าในป่านี้"${ok?'':' เขายิ้มเกินไป'}`,`A man in Council robes walks in alone with a truce. "If you guarantee no beast leaves the forest, the Council will stop issuing hunting permits here."${ok?'':' He smiles too much.'}`),[
   O('✍️ '+L('ประทับรอยเท้าลงสัญญา','Press your paw to the treaty'),ok?L('มีคนในโลกคนค้ำประกัน','Someone in the human world vouches for you'):L('⚠️ ไม่มีใครค้ำประกัน','⚠️ No one vouches for you'),()=>{if(ok||rnd()<.3){b.treaty=1;b.hu++;say(L('✍️ ป่าสงบไปหนึ่งร้อยปีเต็ม ลูกหลานของสัตว์ในป่าเกิดมาโดยไม่รู้จักกลิ่นเหล็ก','✍️ A full century of peace. A generation of cubs is born never knowing the smell of iron'),'myth')}else{scar();b.ht+=20;say(L('🗡️ สัญญาเป็นแผนล่อ คืนนั้นกองล่ารออยู่ที่ทางออกทุกทาง','🗡️ The treaty was bait. That night hunters wait at every exit'),'bad')}nx2()}),
   O('❌ '+L('ฉีกสัญญาต่อหน้าเขา','Tear it in front of him'),L('ป่าเป็นของป่า','The forest belongs to itself'),()=>{b.hate=1;pw(1);say(L('❌ ทูตเดินกลับไปช้าๆ เหมือนจดจำทุกต้นไม้ที่ผ่าน','❌ The envoy walks out slowly, as if memorizing every tree'),'');nx2()})])}
 function reign3(nx2){CH(L('ราชาป่า · ร่างที่เริ่มเสื่อม','Forest King · a body begins to fail'),L('ร่างแสนปีไม่ได้ถูกสร้างมาให้อยู่ตลอดไป ขนสีเงินเริ่มหลุดเป็นกระจุก ฟ้าเริ่มก่อตัวทัณฑ์รอบสอง ครั้งนี้คุณรู้ว่าจะไม่รอด','A hundred-thousand-year body is not made to last forever. Your fur falls out in clumps. A second tribulation gathers, and this time you know you will not survive it.'),[
   O('🧒 '+L('แปลงกายเป็นมนุษย์ตอนนี้','Become human now'),L('ราชาป่าที่ลงจากบัลลังก์','The king who stepped down'),()=>{rec('b9_king');toHuman()}),
   O('💫 '+L('มอบตัวเองเป็นวงแหวน','Give yourself as a ring'),'',gift)])}}

// =================== ⭕ ฝั่งมนุษย์ ===================
const PW=[.03,.06,.1,.16,.25,.4,.6,.85,1.2],FM=[2,6,15,40,100,300,800,2000,5000],HPB=[0,0,15,30,60,120,200,320,500];
// เพิ่มวงแหวนโดยไม่ผ่านการเสี่ยง (สัตว์ยอมให้เอง / แลกด้วยของอื่น)
function addSafe(t,name,sk,ty,mult,md){const g=G();if(g.rings.length>=9)return null;const r={t,b:name,sk,ty:ty||spTy(g),md:md||'loyal'};g.rings.push(r);g.lv=Math.min(100,g.lv+1);S.power+=pctPow(PW[t]*(mult||1));S.fame+=FM[t];if(t>=2)S.maxHp+=HPB[t];
 say(`${TIC[t]} <b>${L('หลอมวงแหวนวงที่','Absorbed ring')} ${g.rings.length}</b> — ${tN(t)} · ${esc(name)} · ${L('ได้ท่า','skill')} <b>「${esc(spNm(g))}·${esc(sk)}」</b>`,'myth',true);return r}
// ล่าแล้วหลอมผ่านระบบเดิม (ความเสี่ยงเกินขีดยังอยู่) แล้วใส่สายให้วงแหวน
function huntX(t,name,sk,ty,mult,rk){const g=G();duel(`${name} (${tN(t)})`,Math.max(5,Math.round(total()*mult)),w=>{try{if(!S||!S.alive)return;if(!w){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.15));say(L(`🩸 ${name}หนีไปพร้อมรอยแผลบนตัวคุณ ลองใหม่ปีหน้า`,`🩸 ${name} escapes, leaving its marks on you. Try again next year`),'bad');return}
 const n0=g.rings.length;X()._rk=rk||0;try{B.absorb(t,[name,sk])}finally{X()._rk=0}const r=g.rings[n0];if(r&&ty&&!r.ty)r.ty=ty}catch(e){console.error('sx hunt',e)}})}
const BIG=[['ราชาจระเข้ทองแดงแห่งบึงลึก','Bronze Crocodile King of the Deep Marsh','def',['กรามผนึกฟ้า','Sky-Sealing Jaw']],['นกยูงพิษเก้าสี','Nine-Hued Venom Peacock','ctrl',['แพนหางเก้าพิษ','Nine-Venom Fan']],['หมีดำหลังจันทร์','Moon-Backed Black Bear','atk',['ตะปบจันทร์แตก','Moon-Splitting Swipe']],['กวางหยกเขาแก้ว','Jade Deer of Glass Antlers','sup',['เขาแก้วสมานแผล','Glass-Antler Mending']],['เสือดาวลมไร้รอย','Traceless Wind Leopard','agi',['ก้าวลมไร้เงา','Shadowless Wind Step']],['งูหลามเงาสองเศียร','Two-Headed Shadow Python','ctrl',['สองเศียรสองเงา','Two Heads, Two Shadows']]];
// ---------- 🧩 สูตรวงแหวน ----------
const FX=[
 {id:'echo',ic:'🔗',n:['ก้องสาย','Echo Chain'],h:['สามวงติดกันเป็นสายเดียวกัน','Three rings in a row of the same path'],e:['ระดับจิตขึ้นเร็วขึ้น 10%','Spirit level grows 10% faster'],t:r=>r.some((x,i)=>i>=2&&x.ty&&x.ty===r[i-1].ty&&x.ty===r[i-2].ty)},
 {id:'mirror',ic:'🪞',n:['เงาสะท้อน','Mirror Weave'],h:['สี่วงติดกันสลับสองสาย ก-ข-ก-ข','Four rings alternating two paths, A-B-A-B'],e:['รอดจากวงแหวนระเบิดได้อีกหนึ่งครั้ง','Survive one more ring backlash'],t:r=>r.some((x,i)=>i>=3&&x.ty&&r[i-1].ty&&x.ty!==r[i-1].ty&&r[i-2].ty===x.ty&&r[i-3].ty===r[i-1].ty)},
 {id:'five',ic:'🌈',n:['ห้าสายบรรจบ','Five Paths Meet'],h:['มีวงแหวนครบทั้งห้าสาย','Own rings of all five paths'],e:['พลังยุทธ์ก้อนใหญ่ + ชื่อเสียง','A large power surge + fame'],t:r=>new Set(r.map(x=>x.ty).filter(Boolean)).size>=5},
 {id:'stair',ic:'🪜',n:['บันไดฟ้า','Sky Stair'],h:['หกวงแรกอายุไม่ลดลงเลย และมีอย่างน้อยสี่ระดับอายุ','The first six rings never drop in age and span at least four ages'],e:['หลอมเกินขีดปลอดภัยขึ้น','Safer when absorbing beyond your limit'],t:r=>r.length>=6&&r.slice(0,6).every((x,i)=>!i||x.t>=r[i-1].t)&&new Set(r.slice(0,6).map(x=>x.t)).size>=4},
 {id:'faith',ic:'🕯️',n:['ศรัทธาเดียว','Single Faith'],h:['เจ็ดวงขึ้นไป ทุกวงสายเดียวกับดวงจิต','Seven or more rings, all on your spirit\'s path'],e:['พลังยุทธ์ก้อนใหญ่มาก','A very large power surge'],t:(r,g)=>r.length>=7&&r.every(x=>x.ty===spTy(g))},
 {id:'humble',ic:'🍃',n:['วงแหวนถ่อมตน','Humble Ring'],h:['หลอมวงที่อ่อนกว่าวงก่อนหน้าอย่างน้อยสองระดับอายุ','Absorb a ring at least two ages weaker than the one before'],e:['ดวงจิตผูกพันกับคุณมากขึ้นทันที','Your spirit\'s bond rises at once'],t:r=>r.some((x,i)=>i&&x.t<=r[i-1].t-2)}];
function fxCheck(){const g=G();if(!g||!g.aw||!g.rings)return;const x=X();if(x._rc===g.rings.length)return;x._rc=g.rings.length;
 FX.forEach(f=>{if(x.fx[f.id])return;let ok=false;try{ok=f.t(g.rings,g)}catch(e){}if(!ok)return;x.fx[f.id]=1;
  try{const d=LS.get('murim_svfx',{})||{};const nw=!d[f.id];d[f.id]=1;LS.set('murim_svfx',d);if(nw)addFeed&&addFeed('ev',`🧩 ${L('ค้นพบสูตรวงแหวนใหม่','New ring formula discovered')}: <b>${f.ic} ${L(f.n[0],f.n[1])}</b>`,'sum')}catch(e){}
  if(f.id==='five'){S.power+=pctPow(.25);S.fame+=600}else if(f.id==='faith'){S.power+=pctPow(.35);S.fame+=400}else if(f.id==='humble'){g.bond=Math.min(100,(g.bond==null?50:g.bond)+15)}
  say(`🧩 <b>${L('สูตรวงแหวน','Ring formula')}「${f.ic} ${L(f.n[0],f.n[1])}」</b> — ${L(f.e[0],f.e[1])}`,'myth',true)})}
setInterval(()=>{try{if(on())fxCheck()}catch(e){}},1100);
// สูตรที่จะสำเร็จถ้าเลือกวงนี้
function fxWould(t,ty){const g=G(),x=X();if(!ty)return [];const r=g.rings.concat([{t,ty}]);return FX.filter(f=>{if(x.fx[f.id])return false;try{return f.t(r,g)}catch(e){return false}})}
{const _g=window._svGrow;window._svGrow=function(g){let m=_g?_g.apply(this,arguments):1;try{const x=g&&g.sx;if(x){if(x.fx.echo)m*=1.1;if(x.mut==='pl')m*=1.12}}catch(e){}return m}}
{const _r=window._svRisk;window._svRisk=function(g,t,over){let v=_r?_r.apply(this,arguments):0;try{const x=g&&g.sx;if(x){if(x.fx.stair&&over>0)v+=.1;if(x._rk)v+=x._rk;if(over>0&&x.hk.pl>0){x.hk.pl--;v+=.2;say(L('💊 ยาประคองเส้นจิตละลายในปาก เส้นจิตที่กำลังปริค่อยๆ สมานกลับ','💊 The meridian-binding pill melts on your tongue; the tearing slows and knits'),'good')}if(x.mut==='dk'&&over>0)v-=.05}}catch(e){}return v}}
{const _d=window._svDodge;window._svDodge=function(g){let r=false;try{r=_d?_d.apply(this,arguments):false}catch(e){}if(r)return true;try{const x=g&&g.sx;if(x&&x.fx.mirror&&!x.mrU){x.mrU=1;say(L('🪞 วงแหวนสองสายที่สลับกันรับแรงระเบิดแทนกันไปมา จนพลังสลายเองกลางอากาศ','🪞 Your alternating rings pass the blast back and forth until it fizzles in the air'),'myth',true);return true}}catch(e){}return false}}
// ---------- 🔍 สะกดรอย / 🔴 แสนปี / 🌙 วงที่เก้า / 🎒 ของ / 🌕 มรดก — ใส่ในหน้าล่าวงแหวน ----------
const tyOf=o=>Object.keys(TYI).find(k=>(o.s||'').startsWith(TYI[k]));
const tOf=o=>{const i=TIC.findIndex(c=>(o.t||'').startsWith(c));return i};
{const _hx=window._svHuntX;window._svHuntX=function(g0,i,safe,opts){if(_hx)_hx.apply(this,arguments);try{if(!on())return;const g=G(),x=X(),add=[];const st=Math.min(3,safe);
 // บอกสูตรที่จะสำเร็จ
 opts.forEach(o=>{if(o.skip||o._fx)return;const ty=o._sxTy||tyOf(o),t=o._sxT!=null?o._sxT:tOf(o);if(!ty||t<0)return;const w=fxWould(t,ty);if(w.length){o._fx=1;o.s=(o.s||'')+` · 🧩 ${L('เข้าสูตร','completes')}「${w.map(f=>f.ic+' '+L(f.n[0],f.n[1])).join(', ')}」`}});
 if(S.age>=8)add.push(O('🔍 '+L('สะกดรอยก่อนเลือกเป้าหมาย (มินิเกม)','Track first, then choose a target (minigame)'),L('อ่านรอยเก่งจะเจอตัวที่ไม่มีใครเห็น','Read the trail well and find what others miss')+(x.hk.sc?` · 🌫️ ${L('ผงกลบกลิ่น','Scent powder')} ×${x.hk.sc}`:''),()=>track(i,safe)));
 if(i>=5&&i<=8){const b=pick(BIG);const nm=L(b[0],b[1]);const o=O(`${TIC[4]} ${nm} · ${tN(4)}`,`${tyN(b[2])} · ${L('⚠️ เกินขีดร่างกาย เสี่ยงบาดเจ็บหนัก','⚠️ Beyond your body\'s limit · risk of grave injury')}`,()=>huntX(4,nm,L(b[3][0],b[3][1]),b[2],1.5,0));o._sxTy=b[2];o._sxT=4;const w=fxWould(4,b[2]);if(w.length)o.s+=` · 🧩 ${L('เข้าสูตร','completes')}「${w.map(f=>f.ic+' '+L(f.n[0],f.n[1])).join(', ')}」`;add.push(o)}
 if(x.hk.bt>0&&st<4){const tt=st+1,b=pick(B.BEAST[Math.min(3,tt)]||B.BEAST[3]);add.push(O(`🥩 ${L('ใช้เหยื่อกลิ่นแม่ ล่อตัวที่แก่กว่าออกมา','Use mother-scent bait to draw out an older one')}`,`${tN(tt)} · ${L('มันออกมาแบบไม่ระวังตัว เสี่ยงน้อยลง','It comes out careless · less risk')} · ×${x.hk.bt}`,()=>{x.hk.bt--;huntX(tt,b[0],b[1],null,.85,.2)}))}
 if(x.ow&&S.age-x.ow.a>=2){const w=x.ow;add.push(O(`🦌 ${L(`${w.n}ที่คุณเคยรักษามายืนรออยู่ที่ชายป่า`,`The ${w.n} you once healed is waiting at the forest edge`)}`,`${tN(w.t)} · ${L('มันยอมมอบวงแหวนให้เอง ไม่มีความเสี่ยง','It offers its ring willingly · no risk')}`,()=>{x.ow=null;say(L(`🦌 ${w.n}ก้มหัวแตะหน้าผากคุณ แผลเป็นที่คุณเคยเย็บยังอยู่ที่ขาหน้า`,`🦌 The ${w.n} touches its head to your forehead. The scar you stitched is still on its foreleg`),'epic',true);addSafe(w.t,w.n,L('วงแหวนแห่งหนี้ชีวิต','Ring of a Life Repaid'),w.ty,1.2)}))}
 const gf=(()=>{try{return LS.get('murim_svgift',null)}catch(e){return null}})();
 if(gf&&gf.to==='s'&&i>=4&&!(g.bst&&g.bst.pro===9))add.push(O(`🌕 ${L('วงแหวนที่รอคุณมาทั้งชาติ','The ring that waited a whole lifetime for you')}`,`${gf.ic} ${esc(gf.nm)} · ${tN(4)} · ${L('ไม่มีความเสี่ยง · ใช้ได้ครั้งเดียว','No risk · once only')}`,()=>{try{LS.set('murim_svgift',null)}catch(e){}say(L(`🌕 ใต้รากไม้โลก มีวงแหวนสีแดงรออยู่ คุณจำกลิ่นของมันได้ก่อนจะรู้ว่าทำไม เมื่อมันจมเข้าอก คุณฝันเห็นฤดูหนาวแรกของ${gf.nm}`,`🌕 Beneath the World Tree a red ring is waiting. You know its scent before you know why. As it sinks into you, you dream of the ${gf.nm}'s first winter`),'myth',true);addSafe(4,gf.nm,L('ความทรงจำแสนปี','A Hundred Thousand Years Remembered'),gf.ty,1.5)}));
 if(i===8){if((S.lifespan||0)-S.age>=40)add.push(O('⏳ '+L('แลกอายุขัย 25 ปีเป็นวงแหวน','Trade 25 years of lifespan for a ring'),`${tN(4)} · ${L('ไม่ต้องล่า · อายุขัยสั้นลงถาวร','No hunt · lifespan shortened for good')}`,()=>{S.lifespan-=25;say(L('⏳ คุณนั่งสมาธิเจ็ดวัน ผมขาวขึ้นครึ่งหัว ปีที่ยังไม่ได้ใช้ค่อยๆ หมุนเป็นวงแหวนรอบตัว','⏳ Seven days in meditation. Half your hair turns white as unlived years wind themselves into a ring'),'epic',true);addSafe(4,L('ปีที่ยังไม่ได้ใช้','Unlived Years'),L('ยี่สิบห้าปีที่หายไป','Twenty-Five Lost Years'),spTy(g),1,'empty')}));
  add.push(O('💭 '+L('เผาความทรงจำหนึ่งเรื่องเป็นวงแหวน','Burn one memory into a ring'),`${tN(4)} · ${L('ความทรงจำนั้นจะไม่กลับมา','That memory never returns')}`,()=>choice('💭 '+L('ความทรงจำไหน','Which memory?'),L('วงแหวนจากความทรงจำแรงเท่ากับความสำคัญของมัน และสิ่งที่ลืมไปแล้วจะลืมตลอดไป','A memory ring is as strong as the memory was dear. What is forgotten stays forgotten.'),[
   O('⭕ '+L('วันที่ดวงจิตตื่นครั้งแรก','The day your spirit first awoke'),L('ความผูกพันกับดวงจิตลดลงมาก','Your spirit bond falls sharply'),()=>{g.bond=Math.max(0,(g.bond==null?50:g.bond)-35);say(L('💭 ลูกแก้วหกลูก แสงจากฝ่ามือ เสียงคนหัวเราะ ทั้งหมดหายไป ดวงจิตของคุณมองคุณเหมือนคนแปลกหน้าอยู่หลายวัน','💭 Six orbs, light from your palm, laughter. All gone. For days your spirit looks at you like a stranger'),'bad',true);addSafe(4,L('ความทรงจำแรก','The First Memory'),L('แสงแรกที่ลืมไป','The Forgotten First Light'),spTy(g),1.1,'empty')}),
   O('🪪 '+L('ชื่อจริงของตัวเอง','Your own true name'),L('ชื่อเสียงลด · คนเรียกคุณด้วยฉายาแทน','Fame drops · people use only your title'),()=>{S.fame=Math.round(S.fame*.7);say(L('🪪 คุณจำชื่อที่แม่ตั้งให้ไม่ได้อีกแล้ว ตั้งแต่วันนั้นคุณตอบรับเฉพาะเวลาที่คนเรียกด้วยฉายา','🪪 You can no longer remember the name your mother gave you. From then on you answer only to your title'),'bad',true);addSafe(4,L('ชื่อที่หายไป','The Lost Name'),L('ไร้นาม','Nameless'),spTy(g),1,'empty')}),
   O('🔙 '+L('ไม่เผาอะไรทั้งนั้น','Burn nothing'),'',()=>say(L('🔙 บางอย่างมีค่ามากกว่าวงแหวน','🔙 Some things are worth more than a ring'),''))])))}
 const sk=opts.findIndex(o=>o.skip);opts.splice(sk<0?opts.length:sk,0,...add)}catch(e){console.error('sx hx',e)}}}
function track(i,safe){const x=X(),g=G();const st=Math.min(3,safe);const bon=x.hk.sc>0?.2:0;if(bon){x.hk.sc--}
 mgo('sxScout',{mx:Math.min(4,st+1),sub:bon?L('🌫️ ผงกลบกลิ่นทำให้เข้าใกล้รอยได้มากขึ้น','🌫️ Scent powder lets you get closer to the trail'):undefined},sc0=>{if(!on())return;const sc=cl(sc0+bon,0,1);const L0=B.BEAST[st];const a=pick(L0),m=pick(L0.filter(z=>z!==a))||a;const opts=[];
  if(sc<.3){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.08));say(L('🪤 รอยที่ตามไปเป็นรอยหลอกของทีมล่าอื่น คุณเหยียบกับดักของพวกเขาเข้าเต็มเท้า','🪤 The trail was a decoy laid by another hunting team. You step square into their trap'),'bad')}
  if(sc>=.8&&rnd()<.35){x.hk.sc++;say(L('🌫️ ระหว่างทางคุณเจอต้นหญ้าที่บดเป็นผงกลบกลิ่นได้ (+1)','🌫️ Along the way you find grass that grinds into scent powder (+1)'),'good')}
  opts.push(O(`🐾 ${a[0]} · ${tN(st)}`,L('ตัวที่ตามรอยเจอ รู้นิสัยมันแล้ว สู้ง่ายขึ้น','The one you tracked · you know its habits · easier fight'),()=>huntX(st,a[0],a[1],null,.8,0)));
  if(sc>=.45){opts.push(O(`🍼 ${L('ล่า','Hunt')} ${m[0]} · ${L('แม่ที่มีลูกอ่อน','a mother with young')}`,L('วงแหวนดี · ลูกของมันจะโตขึ้นและจำคุณได้','A good ring · its cub will grow up remembering you'),()=>{S.karma-=8;try{if(g.eco)g.eco.cubQ={n:m[0],t:st,a:S.age}}catch(e){}window._svSetMd&&window._svSetMd('sad');huntX(st,m[0],m[1],null,.75,.05)}));
   opts.push(O(`🕊️ ${L('ปล่อยแม่ลูกไป','Let the mother and cub go')}`,L('กรรมดี · ดวงจิตชอบใจ','Good karma · your spirit approves'),()=>{S.karma+=6;g.bond=Math.min(100,(g.bond==null?50:g.bond)+5);if(rnd()<.5)x.hk.sc++;say(L(`🕊️ ${m[0]}ต้อนลูกเข้าพุ่มไม้ แล้วหันกลับมามองคุณครั้งเดียวก่อนหายไป`,`🕊️ The ${m[0]} herds its cub into the brush and looks back at you once before vanishing`),'good')}))}
  if(sc>=.75&&st+1<=4){const tt=st+1;const big=tt>=4?pick(BIG):null;const nb=big?L(big[0],big[1]):pick(B.BEAST[tt])[0];const skb=big?L(big[3][0],big[3][1]):(B.BEAST[tt].find(z=>z[0]===nb)||[0,'?'])[1];const tyb=big?big[2]:null;
   opts.push(O(`🩸 ${nb} · ${tN(tt)}`,L('แก่กว่าที่ใครคิด แต่บาดเจ็บจากทีมอื่นอยู่ · เสี่ยงน้อยกว่าปกติ','Older than anyone thinks, but wounded by another team · less risk than usual'),()=>huntX(tt,nb,skb,tyb,.7,.22)));
   opts.push(O(`🩹 ${L('รักษาแผลให้','Tend its wounds')} ${nb}`,L('ไม่ได้วงแหวนตอนนี้ · บางอย่างอาจกลับมาหาคุณ','No ring now · something may come back to you'),()=>{x.ow={n:nb,t:tt,a:S.age,ty:tyb};S.karma+=4;say(L(`🩹 คุณดึงลูกธนูสามดอกออกจากขา${nb} มันคำรามใส่คุณทุกดอก แต่ไม่ได้กัด`,`🩹 You pull three arrows from the ${nb}'s leg. It snarls at every one but does not bite`),'good')}))}
  opts.push(O('⏳ '+L('กลับไปก่อน','Go back for now'),L('ฝึกรากฐานรอไปก่อน','Train and wait'),()=>say(L('⏳ คุณเดินออกจากป่ามือเปล่า','⏳ You walk out of the forest empty-handed'),'')));
  choice('🔍 '+L('สิ่งที่รอยบอก','What the trail told you'),L(`คุณตามรอยอยู่ ${sc>=.75?'เจ็ดวัน':sc>=.45?'สี่วัน':'สองวัน'} ${sc>=.75?'และเจอสิ่งที่ทีมล่าอื่นมองข้ามไป':''}`,`You followed the trail for ${sc>=.75?'seven':sc>=.45?'four':'two'} days${sc>=.75?' and found what other teams walked past':''}.`),opts)})}
// ---------- 🌋 ร่างแท้ต้องผ่านบททดสอบ · 🧬 แปรเปลี่ยน ----------
const spOf=id=>B.SP.find(z=>z[0]===id);
const hid=g=>g.sp.find(s=>{const p=spOf(s.id);return p&&p[6]&&!s.rev});
window._svTFq=function(g){try{return !!hid(g)}catch(e){return false}};
const TFW={atk:[['มันอยากเจอคู่ต่อสู้ที่ทำให้มันกลัวสักครั้งในชีวิต','It wants, once in its life, to face something that frightens it'],'sxCrack',['ทะลวงเปลือกของตัวเองตามรอยร้าว','Break its own shell along the cracks']],
 def:[['มันอยากปกป้องใครสักคนจนถึงที่สุด','It wants to protect someone to the very end'],'sxHold',['ยืนรับหินที่ถล่มลงมาใส่หมู่บ้าน','Hold back a landslide over a village']],
 sup:[['มันอยากได้ยินคำขอบคุณจากคนที่มันไม่รู้จัก','It wants to be thanked by someone it has never met'],'sxHowl',['หายใจตามจังหวะเพื่อพาคนไข้โรคระบาดผ่านคืนนี้','Breathe in rhythm to carry plague patients through the night']],
 ctrl:[['มันอยากจำบางอย่างที่มันลืมไปก่อนเกิด','It wants to remember something it forgot before it was born'],'sxMem',['เรียงความทรงจำที่แตกกระจายของมันกลับคืน','Put its scattered memories back in order']],
 agi:[['มันอยากวิ่งให้เร็วกว่าลมสักครั้ง','It wants to outrun the wind, just once'],'sxChase',['แข่งกับพายุที่พัดลงจากภูเขา','Race the storm down the mountain']]};
function tfReveal(s,p,full){const g=G();s.rev=1;S.power+=pctPow(full?.12:.05);S.fame+=full?80:20;
 say(full?L(`🌋 ดวงจิต <b>${p[2]}</b> ที่ทุกคนเคยหัวเราะเยาะ แตกเปลือกออก <b>${p[6][0]} ${p[6][1]}</b>! ${p[6][3]}`,`🌋 The <b>${p[2]}</b> everyone laughed at breaks its shell: <b>${p[6][0]} ${p[6][1]}</b>! ${p[6][3]}`):L(`🌋 เปลือกของ<b>${p[2]}</b>แตกเองโดยที่คุณไม่ได้ช่วย ร่างแท้ <b>${p[6][0]} ${p[6][1]}</b> ออกมาไม่ครบ พลังได้แค่ครึ่งเดียว`,`🌋 The <b>${p[2]}</b>'s shell cracks on its own without your help. The true form <b>${p[6][0]} ${p[6][1]}</b> comes out incomplete, at half strength`),full?'myth':'epic',true);
 X().mutQ=1;if(!X().mut)setTimeout(()=>{if(on()&&free()&&!X().mut)mutate()},1600)}
function tfStep(){const g=G(),x=X(),s=hid(g);if(!s)return false;const p=spOf(s.id);const tf=x.tf||(x.tf={a:S.age-9,f:0,ask:0});
 if(g.lv>=70){tfReveal(s,p,0);return true}
 if(g.lv<30||S.age-tf.a<(tf.f?4:3))return false;tf.a=S.age;const w=TFW[p[6][2]]||TFW.atk;
 choice(`${p[1]} ${L('เสียงจากในอก','A voice in your chest')}`,L(`คืนนี้<b>${p[2]}</b>ไม่ยอมเงียบ มันไม่ได้ขอพลัง ไม่ได้ขอวงแหวน<br><br>"${w[0][0]}"<br><br><span class="tag2">บททดสอบ: ${w[2][0]}${tf.f?` · เคยล้มเหลว ${tf.f} ครั้ง`:''}</span>`,`Tonight the <b>${p[2]}</b> will not be quiet. It does not ask for power or rings.<br><br>"${w[0][1]}"<br><br><span class="tag2">Trial: ${w[2][1]}${tf.f?` · failed ${tf.f} time(s)`:''}</span>`),[
  O('🔥 '+L('ตามเสียงนั้นไป (มินิเกม)','Follow the voice (minigame)'),L('สำเร็จ = ร่างแท้เต็มพลัง','Success = the full true form'),()=>mgo(w[1],{title:L('บททดสอบร่างแท้','True Form Trial')},sc=>{if(sc>=.6)tfReveal(s,p,1);else{tf.f++;g.bond=Math.min(100,(g.bond==null?50:g.bond)+3);say(L(`💤 เปลือกปริแล้วสมานกลับ ${p[2]}ไม่ได้โกรธ มันจำได้ว่าคุณพยายาม`,`💤 The shell cracks, then heals. The ${p[2]} isn't angry. It remembers that you tried`),'')}})),
  O('⏳ '+L('ยังไม่พร้อม','Not yet'),L('ถ้าเลื่อนบ่อย มันจะน้อยใจ','Put it off too often and it will sulk'),()=>{tf.ask++;if(tf.ask>=3){g.bond=Math.max(0,(g.bond==null?50:g.bond)-10);say(L(`😶 ${p[2]}เงียบไปทั้งปี`,`😶 The ${p[2]} stays silent all year`),'bad')}})]);return true}
function mutate(){const g=G(),x=X();if(x.mut)return false;const nm=spNm(g);const k=S.karma||0,kill=g.kill||0,bond=g.bond==null?50:g.bond;const ops=[];
 if(k<=-20||kill>=8)ops.push(O('🩸 '+L('ร่างมาร','Demon Form'),L('พลัง ++ · กรรม − · หลอมเกินขีดเสี่ยงขึ้นเล็กน้อย','Power ++ · karma − · overreaching is slightly riskier'),()=>{x.mut='dk';S.power+=pctPow(.1);S.karma-=5;say(L(`🩸 ${nm}เปลี่ยนสีเป็นแดงคล้ำ กลิ่นเลือดที่คุณเคยทำให้ไหลกลายเป็นส่วนหนึ่งของมัน`,`🩸 ${nm} darkens to a bruised red. All the blood you have spilled is part of it now`),'myth',true)}));
 if(k>=20||bond>=75)ops.push(O('🛡️ '+L('ร่างพิทักษ์','Guardian Form'),L('พลังชีวิตสูงสุด +15%','Max HP +15%'),()=>{x.mut='gd';S.maxHp=Math.round(S.maxHp*1.15);S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.15));say(L(`🛡️ ${nm}ขยายตัวคลุมทั้งร่างคุณเหมือนเกราะบางๆ มันจำทุกคนที่คุณเคยยืนบังให้`,`🛡️ ${nm} spreads over you like thin armor. It remembers everyone you ever stood in front of`),'myth',true)}));
 ops.push(O('🍚 '+L('ร่างสามัญ','Common Form'),L('ระดับจิตขึ้นเร็วขึ้น 12% · ดูธรรมดาจนไม่มีใครระวัง','Spirit level grows 12% faster · so plain no one is wary'),()=>{x.mut='pl';say(L(`🍚 ${nm}ดูธรรมดาลงกว่าเดิม แต่มันกินพลังจากทุกเรื่องเล็กๆ ในชีวิตคุณ`,`🍚 ${nm} looks plainer than before, but it feeds on every small thing in your life`),'epic',true)}));
 if(ops.length<2)ops.push(O('✋ '+L('ต้านไว้ คงร่างเดิม','Resist and stay as you are'),L('ไม่มีผล','No effect'),()=>{x.mut='no';say(L('✋ คุณกดมันกลับไป ดวงจิตยังเป็นแบบเดิม','✋ You hold it down. Your spirit stays as it was'),'')}));
 choice('🧬 '+L('ดวงจิตกำลังเปลี่ยนตามวิถีของคุณ','Your spirit is changing to match how you live'),L(`ห้าสิบปีแห่งการใช้ชีวิตทิ้งร่องรอยไว้ใน<b>${nm}</b> มันกำลังจะเป็นอะไรบางอย่างที่ไม่มีในตำรา<br><span class="tag2">กรรม ${k} · ล่ามาแล้ว ${kill} ตัว · ความผูกพัน ${bond}</span>`,`Decades of living have marked your <b>${nm}</b>. It is becoming something no manual describes.<br><span class="tag2">Karma ${k} · beasts killed ${kill} · bond ${bond}</span>`),ops);return true}
// ---------- 🐾 เหตุการณ์ชีวิตคนของสัตว์แปลงร่าง (ต่อจากชีวิตสัตว์) ----------
const HB=[
 {id:'cub',c:b=>b.cubs>0&&S.age>=14,r:(b,g)=>{const blind=!b.cubLost;choice('🐾 '+L('สัตว์หมื่นปีที่ขวางทาง','A ten-thousand-year beast blocks the path'),L(`ระหว่างล่าวงแหวนกับทีม ${b.nm}ตัวหนึ่งอายุหมื่นปียืนขวางทาง${blind?' ตาข้างหนึ่งขุ่นขาว':''} มันไม่หนี ไม่ขู่ มันดมอากาศแล้วคุกเข่าลงต่อหน้าคุณ ทีมเริ่มกระซิบกัน`,`On a team hunt, a ten-thousand-year ${b.nm} blocks the path${blind?', one eye clouded white':''}. It doesn't run or growl. It sniffs the air and kneels before you. Your team starts whispering.`),[
  O('🫂 '+L('แยกจากทีม ไปหามันคนเดียว','Leave the team and go to it alone'),L('ความสงสัย + · ลูกจะมอบวงแหวนให้เมื่อพร้อม','Suspicion + · your cub will offer its ring when you are ready'),()=>{b.sus=cl((b.sus||0)+10,0,100);X().ow={n:b.nm,t:3,a:S.age-2,ty:b.ty};rec('b9_cub');say(L(`🫂 มันซบหัวกับอกคุณเหมือนตอนยังตัวเท่าแมว "ถ้าวันหนึ่งท่านติดคอขวด ข้าจะรออยู่ที่ชายป่า"`,`🫂 It presses its head to your chest like when it was kitten-sized. "If you are ever stuck at a bottleneck, I will be waiting at the forest edge."`),'myth',true)}),
  O('🐾 '+L('ส่งสัญญาณให้มันหนีไป','Signal it to run'),L('ปลอดภัย','Safe'),()=>{b.sus=cl((b.sus||0)+4,0,100);say(L('🐾 คุณกระทืบเท้าสองครั้งแบบที่เคยใช้เรียกลูกกลับถ้ำ มันหายเข้าพุ่มไม้ทันที','🐾 You stamp twice, the way you once called your cubs home. It vanishes into the brush'),'good')}),
  O('🗡️ '+L('ปล่อยให้ทีมล่ามัน','Let the team take it'),L('ซ่อนตัวตนได้ · ราคาสูงที่สุด','Keeps your secret · at the highest price'),()=>{b.sus=Math.max(0,(b.sus||0)-15);S.karma-=20;S.power+=pctPow(.05);b.cubs=0;say(L('🗡️ มันไม่สู้กลับเลยจนลมหายใจสุดท้าย ทีมแบ่งแก่นกันกลางป่า คุณบอกว่าไม่หิว','🗡️ It never fights back, not even at the end. The team divides its core in the woods. You say you are not hungry'),'bad',true)})])}},
 {id:'rival',c:b=>b.rvh===1&&S.age>=15,r:(b,g)=>{const r=b.rival||RIV[0];const nm=(typeof anyName==='function')?anyName(rnd()<.5?'ชาย':'หญิง'):L('หลิงเฟิง','Ling Feng');choice(`${r[2]} ${L('คนที่มีกลิ่นคุ้นเคย','Someone with a familiar scent')}`,L(`ศิษย์ใหม่ของสถาบันชื่อ${esc(nm)} เดินผ่านคุณแล้วหยุด ดมอากาศสองครั้ง แล้วยิ้มแบบเดียวกับ${r[0]}ที่เคยยืนรอหน้าโพรงคุณ "ข้าบอกแล้วว่ารอเจอกันข้างโน้น"`,`A new student named ${esc(nm)} passes you, stops, sniffs twice, and smiles exactly like the ${r[1]} that used to wait outside your burrow. "Told you I'd see you on the other side."`),[
  O('⚔️ '+L('ท้าประลองให้จบเรื่องแสนปี','Duel to finish a hundred-thousand-year grudge'),'',()=>duel(nm,Math.round(total()*1.05),w=>{if(w){rec('b9_rival');S.fame+=600;say(L('⚔️ เขานอนหงายบนลานประลอง หัวเราะจนน้ำตาไหล "แพ้เจ้าสองชาติ ไม่เลวนัก"','⚔️ Flat on his back on the arena floor, he laughs until he cries. "Beaten by you in two lives. Not bad."'),'myth',true)}else{b.sus=cl((b.sus||0)+10,0,100);say(L('🩸 เขาชนะ แล้วกระซิบข้างหูว่า "ความลับของเจ้าปลอดภัย ตราบที่ข้ายังชนะเจ้าได้"','🩸 He wins and whispers, "Your secret is safe as long as I can still beat you."'),'bad')}})),
  O('🍶 '+L('ชวนไปดื่ม คุยเรื่องป่า','Invite him for a drink and talk about the forest'),L('สองความลับคุ้มกันกัน','Two secrets guard each other'),()=>{rec('b9_rival');b.sus=Math.max(0,(b.sus||0)-12);say(L('🍶 คุณคุยกันจนร้านปิด เรื่องหูขาด เรื่องรังผึ้ง ไม่มีใครในโลกนี้อีกแล้วที่เข้าใจเรื่องพวกนี้','🍶 You talk until the tavern closes: the torn ear, the beehive. No one else in this world would understand'),'epic',true)})])}},
 {id:'pact',c:b=>!!b.pact&&S.age>=12,r:(b,g)=>choice('🪵 '+L('ผู้อาวุโสตระกูลจ้าว','An elder of the Zhao clan'),L(`ชายวัยกลางคนจากตระกูลจ้าวมาที่หมู่บ้าน ถือป้ายไม้เก่าที่${b.pact===2?'คุณเคยคาบไว้ในปาก':'คุณจำลายแกะได้'} เขามองตาคุณนานผิดปกติ "ปู่ข้าเล่าว่าเคยมีสัตว์ตัวหนึ่งพาเขาออกจากป่า ตาเหมือนเจ้าไม่มีผิด"`,`A middle-aged man of the Zhao clan comes to the village with an old wooden tablet you ${b.pact===2?'once carried in your mouth':'recognize by its carving'}. He stares too long. "My grandfather said a beast once led him out of the forest. It had your eyes."`),[
  O('🤝 '+L('ยอมรับ','Admit it'),L('ตระกูลจ้าวคุ้มครอง','The Zhao clan protects you'),()=>{rec('b9_pact');b.sus=Math.max(0,(b.sus||0)-25);S.money+=Math.round(Math.max(500,S.money*.15));say(L('🤝 เขาคุกเข่าตรงนั้น ตั้งแต่วันนั้นทุกครั้งที่มีข่าวลือเรื่องสัตว์แปลงร่าง ตระกูลจ้าวจะเป็นคนดับข่าวก่อนเสมอ','🤝 He kneels on the spot. From then on, whenever rumors of a transformed beast spread, the Zhao clan buries them first'),'myth',true)}),
  O('🙂 '+L('บอกว่าคงจำผิดคน','Say he has the wrong person'),'',()=>{say(L('🙂 เขาพยักหน้า แต่ก่อนกลับ เขาวางป้ายไม้ไว้หน้าบ้านคุณ','🙂 He nods. But before leaving, he sets the tablet down at your door'),'')})])},
 {id:'king',c:b=>!!b.king&&S.age>=10,r:(b,g)=>choice('🐦‍⬛ '+L('อีกาจากป่าต้องห้าม','A crow from the Forbidden Forest'),L(`อีกาตัวหนึ่งเกาะหน้าต่างคุณทุกเช้าเป็นสัปดาห์ วันที่เจ็ดมันพูด "ป่าไม่มีราชาแล้ว ${b.treaty?'สัญญาที่ท่านประทับไว้กำลังจะหมดอายุ':'พวกสองขาเริ่มกลับมาวางบ่วง'}"`,`A crow lands on your window every morning for a week. On the seventh day it speaks. "The forest has no king. ${b.treaty?'The treaty you sealed is about to expire.':'The two-legs are setting snares again.'}"`),[
  O('🌲 '+L('แอบกลับไปหนึ่งคืน','Slip back for one night'),L('พลัง + · ความสงสัย +','Power + · suspicion +'),()=>{S.power+=pctPow(.06);b.sus=cl((b.sus||0)+10,0,100);say(L('🌲 ป่าจำกลิ่นคุณได้ ทั้งที่ร่างนี้ไม่ใช่ร่างเดิม คืนนั้นบ่วงทุกอันในเขตเก่าของคุณถูกกัดขาด','🌲 The forest knows your scent though this is not your old body. By morning every snare in your old territory is chewed through'),'epic',true)}),
  O('✉️ '+L('ส่งอีกากลับไปพร้อมคำว่า "ไม่"','Send the crow back with a "no"'),'',()=>{say(L('✉️ อีกาบินไปแล้วไม่กลับมาอีก บางคืนคุณยังได้ยินเสียงหอนไกลๆ','✉️ The crow flies off and never returns. Some nights you still hear distant howling'),'')})])}];
// ---------- 🌕 ผู้ที่ได้วงแหวนจากชาติสัตว์ของคุณ (ชีวิตถัดไป) ----------
function giftElder(){let gf=null;try{gf=LS.get('murim_svgift',null)}catch(e){}if(!gf||gf.to==='s')return false;const g=G();if(!g.aw||g.aw===2||S.age<14||S.age>45||g.bst&&g.bst.pro===9||rnd()>.12)return false;
 const pr=gf.to==='f'?'เธอ':'เขา',pe=gf.to==='f'?['Her','she','her']:['His','he','him'];const who=gf.to==='f'?L(`หญิงชราชื่อ${gf.w||'?'}`,`an old woman named ${gf.w||'?'}`):L('ชายชราตระกูลจ้าว','an old man of the Zhao clan');
 choice('🔴 '+L('วงแหวนสีแดงที่เก้า','The ninth red ring'),L(`ในงานประลองประจำแคว้น ${who} นั่งดูอยู่แถวหน้า วงแหวนวงที่เก้าของ${pr}เป็นสีแดง เป็นวงแหวนแสนปีที่ไม่มีใครรู้ที่มา เมื่อคุณเดินผ่าน วงแหวนนั้นสว่างขึ้นเองโดยที่${pr}ไม่ได้เรียก`,`At the provincial tournament, ${who} watches from the front row. ${pe[0]} ninth ring is red: a hundred-thousand-year ring no one can trace. As you pass, it lights up on its own.`),[
  O('🙇 '+L('เดินไปหา'+pr,'Go to '+pe[2]),L('มรดกข้ามชาติ','A legacy across lives'),()=>{try{LS.set('murim_svgift',null)}catch(e){}S.power+=pctPow(.1);g.bond=Math.min(100,(g.bond==null?50:g.bond)+10);S.fame+=300;say(L(`🙇 ${who}จับมือคุณไว้นาน "มันอุ่นแบบนี้ครั้งเดียวในชีวิต ตอนที่มันมาหา${gf.to==='f'?'ฉัน':'ข้า'}" ${pr}สอนวิธีใช้ท่าวงแหวนที่เก้าให้คุณทั้งคืน แม้คุณจะยังไม่มีวงที่เก้าก็ตาม`,`🙇 ${who} holds your hand a long time. "It has only been this warm once, the day it came to me." ${pe[1][0].toUpperCase()+pe[1].slice(1)} teaches you the ninth-ring skill all night, though you don't have a ninth ring yet.`),'myth',true)}),
  O('🚶 '+L('เดินผ่านไป','Walk on'),'',()=>{say(L('🚶 วงแหวนสีแดงค่อยๆ หรี่ลงตามระยะที่คุณเดินห่างออกไป','🚶 The red ring dims, step by step, as you walk away'),'')})]);return true}

// =================== ผูกเข้าเกม ===================
// เริ่มชีวิตสัตว์: ชิงก่อนบทนำเดิม (block91 ใช้ setInterval 1200ms / passYear 900ms)
setInterval(()=>{try{if(!on()||!free()||busy)return;const g=G();if(!g||g._b9||S.age>1)return;if(!LS.get('murim_svbst',0))return;g._b9=1;g.bst={pro:1};startBeast()}catch(e){console.error('sx start',e)}},300);
// บทนำเดิม (block91) ชนะการแข่งเริ่มได้บางครั้ง → ดักที่ฉากแรกของมันแล้วเปลี่ยนเป็นชีวิตสัตว์แบบใหม่เสมอ
{const _ch=choice;const nf=function(title){try{if(typeof title==='string'&&title.indexOf('หนึ่งแสนปีก่อน')>=0&&on()){const g=G();if(g&&g.bst&&!g.bst.sx&&!busy){busy=1;setTimeout(()=>{if(on()){g.bst={pro:1};startBeast()}else busy=0},60);return}}}catch(e){}return _ch.apply(this,arguments)};for(const k in _ch)nf[k]=_ch[k];choice=nf}
// โหลดเซฟกลางชีวิตสัตว์: เริ่มต่อจากต้น (ชีวิตสัตว์ไม่ใช้ปีของเกม)
setInterval(()=>{try{if(!on()||!free()||busy)return;const b=G()&&G().bst;if(b&&b.sx&&b.pro===1&&!b._rs){b._rs=1;const keep={sx:1};Object.keys(b).forEach(k=>delete b[k]);Object.assign(b,keep,{pro:1});startBeast()}}catch(e){}},2500);
{const _py=passYear;passYear=function(){const a0=S&&S.age;const r=_py.apply(this,arguments);try{if(!on()||!S||S.age===a0)return r;const g=G();if(!g)return r;
 const b=g.bst;if(b&&b.pro===0&&!b.sp&&!busy){b.pro=1;setTimeout(()=>{if(on())startBeast()},300);return r}
 if(busy)return r;
 setTimeout(()=>{try{if(!on()||!free())return;yearX()}catch(e){console.error('sx year',e)}},1700)}catch(e){console.error('sx py',e)}return r}}
function yearX(){const g=G(),x=X();if(!g.aw||g.aw===2)return;
 if(g.giftE===1&&g.aw===1){g.giftE=2;g.lv=Math.min(B.capOf(g),g.lv+2);say(L('🌱 ตอนปลุกดวงจิต คุณฝันถึงป่าที่ไม่เคยไป และตื่นมาพร้อมพลังจิตมากกว่าที่ควร (+2 ระดับ)','🌱 At your awakening you dream of a forest you have never seen, and wake with more spirit power than you should (+2 levels)'),'epic',true);return}
 if(tfStep())return;
 if(!x.mut&&!hid(g)&&(x.mutQ||g.lv>=50&&rnd()<.5)){if(mutate())return}
 const b=g.bst;if(b&&b.pro===9&&b.sx&&!b.fin&&S.age-x.cd>=3&&rnd()<.24){const L0=HB.filter(e=>!x.ev[e.id]&&e.c(b));if(L0.length){const e=pick(L0);x.ev[e.id]=1;x.cd=S.age;e.r(b,g);return}}
 giftElder()}
// พลังจากชีวิตสัตว์ → ชีวิตคน (หลังพิธีปลุกร่างเดิม)
{const _sf=window._svFail;window._svFail=function(g){const r=_sf?_sf.apply(this,arguments):false;try{const b=g&&g.bst;if(r&&b&&b.pro===9&&b.sx&&!b.sxA){b.sxA=1;const p=b.pw||0;if(p)S.power+=pctPow(.015*p);if((b.scar||0)>=3){S.maxHp=Math.round(S.maxHp*1.08);S.hp=Math.min(S.maxHp,S.hp)}
 setTimeout(()=>say(L(`🐾 ร่างนี้จำแสนปีในป่าได้: พลังสะสม ${p} · แผลเป็น ${b.scar||0}${(b.scar||0)>=3?' (ผิวหนาขึ้น พลังชีวิต +8%)':''}${b.friend?` · ด้ายแดงของ${b.friend}`:''}${b.cubs?` · ลูก ${b.cubs} ตัวในป่า`:''}${b.pact?' · คำสาบานตระกูลจ้าว':''}`,`🐾 This body remembers a hundred thousand years: stored power ${p} · scars ${b.scar||0}${(b.scar||0)>=3?' (thicker skin, HP +8%)':''}${b.friend?` · ${b.friend}'s red thread`:''}${b.cubs?` · ${b.cubs} cubs in the forest`:''}${b.pact?' · the Zhao clan vow':''}`),'epic'),700)}}catch(e){console.error('sx fail',e)}return r}}
// ---------- หน้าดวงจิต: ปุ่มสมุดสูตร / ร่างแท้ / อุปกรณ์ล่า ----------
const HK={sc:['🌫️','ผงกลบกลิ่น','Scent Powder','สะกดรอยได้คะแนนเพิ่ม (ใช้ครั้งละ 1)','Tracking scores higher (1 per tracking)',1],pl:['💊','ยาประคองเส้นจิต','Meridian-Binding Pill','ใช้เองตอนหลอมเกินขีด ลดความเสี่ยงมาก','Used automatically when absorbing beyond your limit; cuts the risk a lot',2.2],bt:['🥩','เหยื่อกลิ่นแม่','Mother-Scent Bait','ล่อสัตว์ที่แก่กว่าขีดออกมาแบบไม่ระวังตัว','Draws out an older beast while it is careless',1.6]};
const hkP=k=>{const g=G();const base=[150,400,1200,3500,9000,22000,50000,100000,200000,300000][Math.min(9,g.rings.length)];return Math.round(base*HK[k][5])};
window.svxBuy=function(k){try{const x=X(),p=hkP(k);if(S.money<p){toast(L('เงินไม่พอ','Not enough money'));return}S.money-=p;x.hk[k]=(x.hk[k]||0)+1;toast(`${HK[k][0]} +1`);svxPanel()}catch(e){console.error(e)}};
window.svxPanel=function(){if(!on())return;const g=G(),x=X();const d=(()=>{try{return LS.get('murim_svfx',{})||{}}catch(e){return{}}})();
 const fx=FX.map(f=>{const now=x.fx[f.id],ev=d[f.id];return`<div class="item" style="padding:6px 9px;${now?'border-color:#ffd84a':ev?'':'opacity:.75'}"><b>${f.ic} ${ev||now?L(f.n[0],f.n[1]):'???'}</b>${now?' <span class="tag2">✅ '+L('ชีวิตนี้','this life')+'</span>':''}<br><span class="tag2">${L(f.h[0],f.h[1])}${ev||now?' → '+L(f.e[0],f.e[1]):''}</span></div>`}).join('');
 const s=hid(g),p=s&&spOf(s.id);const tf=s?`<div class="item">🌋 <b>${L('ร่างแท้ที่ยังหลับ','A sleeping true form')}</b><br><span class="tag2">${g.lv<30?L('ดวงจิตจะเริ่มส่งเสียงเมื่อระดับจิตถึง 30','Your spirit will start speaking at spirit level 30'):L(`บททดสอบ: ${(TFW[p[6][2]]||TFW.atk)[2][0]}`,`Trial: ${(TFW[p[6][2]]||TFW.atk)[2][1]}`)}${x.tf&&x.tf.f?` · ${L('ล้มเหลว','failed')} ${x.tf.f}`:''} · ${L('ถึงระดับ 70 จะตื่นเองแบบไม่สมบูรณ์','At level 70 it wakes on its own, incomplete')}</span></div>`:'';
 const MU={dk:['🩸','ร่างมาร','Demon Form'],gd:['🛡️','ร่างพิทักษ์','Guardian Form'],pl:['🍚','ร่างสามัญ','Common Form'],no:['✋','คงร่างเดิม','Unchanged']};
 const mu=`<div class="item">🧬 <b>${L('ดวงจิตแปรเปลี่ยน','Spirit Variation')}</b><br><span class="tag2">${x.mut?MU[x.mut][0]+' '+L(MU[x.mut][1],MU[x.mut][2]):L('ยังไม่เปลี่ยน · เกิดหลังปลุกร่างแท้ หรือระดับจิต 50 ขึ้นไป · ขึ้นกับกรรม การฆ่า และความผูกพัน','Not yet · happens after your true form wakes, or from spirit level 50 · shaped by karma, kills and bond')}</span></div>`;
 const hk=Object.keys(HK).map(k=>`<div class="item" style="display:flex;gap:8px;align-items:center;padding:6px 9px"><div style="font-size:22px">${HK[k][0]}</div><div style="flex:1"><b>${L(HK[k][1],HK[k][2])}</b> ×${x.hk[k]||0}<br><span class="tag2">${L(HK[k][3],HK[k][4])}</span></div><button class="gbtn" style="white-space:nowrap" onclick="svxBuy('${k}')">${fmt(hkP(k))}</button></div>`).join('');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🧩 ${L('สูตรวงแหวน · ร่างแท้ · อุปกรณ์ล่า','Ring Formulas · True Form · Hunting Gear')}</h3><p class="tag2">${L('สูตรที่ค้นพบแล้วจะจำข้ามชีวิต · ตอนล่าวงแหวน ตัวเลือกที่ทำให้สูตรสำเร็จจะมี 🧩 บอก','Discovered formulas carry across lives · when hunting, options that complete a formula are marked 🧩')}</p>${fx}${tf}${mu}<h4>🎒 ${L('อุปกรณ์ล่า','Hunting Gear')} <span class="tag2">💰 ${fmt(S.money)}</span></h4>${hk}`,'svx')};
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const m=$('modal');if(m&&!m.querySelector('.svxB')&&G().aw===1){const b=document.createElement('button');b.className='gbtn svxB';b.style.cssText='width:100%;margin-top:6px';b.textContent='🧩 '+L('สูตรวงแหวน · ร่างแท้ · อุปกรณ์ล่า','Ring Formulas · True Form · Gear');b.onclick=()=>svxPanel();m.appendChild(b)}}catch(e){}return r}}
try{SYS_GUIDE.push({s:'world',ic:'🐾',t:'ชีวิตสัตว์วิญญาณ · สูตรวงแหวน (จิตวิญญาณยุทธ์)',d:'เปิด 🐾 ในหน้าสุ่มกำเนิดเพื่อเกิดเป็นสัตว์ ใช้ชีวิตตั้งแต่สิบปีถึงแสนปี แล้วเลือกเป็นคน ครองป่า หรือมอบตัวเป็นวงแหวน · ฝั่งคน: สะกดรอยก่อนล่า สูตรวงแหวน 6 สูตร ร่างแท้ต้องผ่านบททดสอบ ดวงจิตแปรเปลี่ยน วงที่เก้าแบบแลก และอุปกรณ์ล่า'})}catch(e){}
window._sx={startBeast,track,tfStep,mutate,fxCheck,svxPanel,FX,HB,yearX,giftElder,Q,busy:()=>busy};
})()}catch(e){console.error('soulx',e)}


// ---- ท่อน soulx2: 💍 วงแหวนมีชีวิต · 🌦️ ฤดูทวีป · 🎭 ชะตาพลิก 5 แบบ · 🎓 ลูกศิษย์ · 🌐 ป่าทั้งเว็บ · 🎮 มินิเกม 6 แบบ · ⚖️ ผู้กำกับเรื่อง · 🪙 เหรียญวิญญาณ ----
// สถานะ S.sv.sy · วงแหวนแต่ละวงมี r.md (hate/loyal/sad/empty/calm) · ฝั่งเซิร์ฟเวอร์ ?a=svh/svb/svr/svg ใน api/online.js (ไม่มีก็เล่นได้ ใช้ข้อมูลในเครื่องแทน)
try{(()=>{
const B=window._blk34;if(!B||!window._mg2G)return;
const EN=()=>{try{return LANG==='en'}catch(e){return false}};
const L=(th,en)=>EN()?en:th;
const rnd=Math.random,pick=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),Ri=(a,b)=>a+Math.floor(rnd()*(b-a+1)),shuf=a=>a.slice().sort(()=>rnd()-.5);
const O=(t,s,f)=>({t,s:s||'',f});
const on=()=>{try{return !!(S&&S.alive&&S.ch==='soul'&&!S.mw&&!(S.sv&&S.sv.gd&&S.sv.gd.on))}catch(e){return false}};
const free=()=>!choice._cur&&!modalOpen&&!(typeof DU!=='undefined'&&DU)&&!(window._mgBusy&&window._mgBusy());
const G=()=>S.sv;
const Y=()=>{const g=S.sv;if(!g.sy)g.sy={so:Ri(0,3),sp:null,tw:null,st:[],ev:{},cd:-9,fam:null,famY:-99,mut:{},web:null,rum:null,bh:0,ab:null};return g.sy};
const say=(t,c,big)=>{try{log(t,c||'',big)}catch(e){}};
const isAuto=()=>{try{return !!auto}catch(e){return false}};
function mgo(id,o,cb){if(isAuto()||!window.mg2Play){setTimeout(()=>cb(.55,1),50);return}let d=0;const k=(sc,sk)=>{if(d)return;d=1;cb(sc,sk)};const ok=window.mg2Play(id,o||{},(sc,sk)=>k(sk?.45:sc,sk));if(!ok)k(.5,1)}
const TIC=['⚪','🟡','🟣','⚫','🔴','🌟','💠','✴️','🌈'];
const TN=[['สิบปี','10-year'],['ร้อยปี','100-year'],['พันปี','1,000-year'],['หมื่นปี','10,000-year'],['แสนปี','100,000-year'],['ล้านปี','million-year'],['สิบล้านปี','10-million-year'],['ร้อยล้านปี','100-million-year'],['พันล้านปี','billion-year']];
const tN=t=>L(TN[t|0][0],TN[t|0][1]);
const TYI={atk:'⚔️',def:'🛡️',sup:'🌿',ctrl:'🌀',agi:'💨'};
const spNm=g=>{try{return B.spNow(g.sp[0]).n}catch(e){return ''}};
const hurt=p=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*p))};
const bond=(g,d)=>{g.bond=cl((g.bond==null?50:g.bond)+d,0,100)};

// =================== 🎮 มินิเกมใหม่ 6 แบบ ===================
const MG=window._mg2G;
// 1) ประสานเสียงวงแหวน — แตะวงตอนมันสว่างที่สุด วงที่แค้นจังหวะไม่คงที่
MG.sxChord={n:'ประสานเสียงวงแหวน',ic:'💍',mt:'ผู้ประสานวงแหวน',how:'แตะวงแหวนตอนมันสว่างที่สุด แต่ละวงต้องโดน 2 ครั้ง วงที่แค้นเต้นไม่เป็นจังหวะ',t:18,rw:()=>'',
 init(B2,api){const o=api.o||{};const R=(o.rings||[{md:'calm'},{md:'hate'},{md:'calm'}]).slice(0,5);let hit=0,miss=0,stop=0;const need=R.length*2;const st=R.map((r,i)=>({p:(1300+i*260)*(r.md==='hate'?.8:1),ph:rnd()*6.28,h:0,md:r.md,ic:TIC[r.t|0]||'⭕'}));
  B2.innerHTML=`<div class="tag2" id="sxCs" style="text-align:center"></div><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:10px">${st.map((s,i)=>`<button data-i="${i}" style="width:74px;height:74px;border-radius:50%;border:5px solid #ffd84a;background:#1a1430;font-size:24px;transition:none">${s.ic}</button>`).join('')}</div>`;
  const bs=[...B2.querySelectorAll('[data-i]')],C=B2.querySelector('#sxCs');const lv=i=>{const s=st[i];const t=performance.now()/s.p*6.28+s.ph+(s.md==='hate'?Math.sin(performance.now()/370)*1.4:0);return(Math.sin(t)+1)/2};
  const upd=()=>{C.textContent=`${L('ประสาน','In tune')} ${hit}/${need} · ${L('พลาด','Missed')} ${miss}`};upd();
  const raf=()=>{if(stop)return;bs.forEach((b,i)=>{const v=lv(i);b.style.boxShadow=`0 0 ${Math.round(v*28)}px ${st[i].md==='hate'?'#ff4a4a':'#ffd84a'}`;b.style.opacity=st[i].h>=2?.35:(.45+v*.55)});requestAnimationFrame(raf)};raf();
  bs.forEach((b,i)=>b.onpointerdown=e=>{e.preventDefault();if(!api.live()||st[i].h>=2)return;if(lv(i)>=.8){st[i].h++;hit++;b.style.transform='scale(1.12)';setTimeout(()=>b.style.transform='',120)}else{miss++;navigator.vibrate&&navigator.vibrate(40)}upd();if(hit>=need)api.end()});
  return{sc:()=>cl(hit/need-miss*.07,0,1),stop(){stop=1}}}};
// 2) จับท่าผิดของศิษย์
const MV=['⚔️','🛡️','🌀','💨','🌿','🔥'];
MG.sxTeach={n:'จับท่าผิดของศิษย์',ic:'🥢',mt:'อาจารย์ตาไว',how:'จำท่าตัวอย่าง แล้วแตะเฉพาะท่าที่ศิษย์ทำผิด จากนั้นกดยืนยัน 3 รอบ',t:36,rw:()=>'',
 init(B2,api){let rd=0,ok=0,tot=0,stop=0;const show=()=>{if(stop)return;if(rd>=3){api.end();return}const N=5+Math.min(1,rd);const demo=Array.from({length:N},()=>pick(MV));const wrong=new Set(shuf([...Array(N).keys()]).slice(0,rd?2:1));const stu=demo.map((m,i)=>wrong.has(i)?pick(MV.filter(x=>x!==m)):m);
   B2.innerHTML=`<div class="tag2" style="text-align:center">${L('รอบ','Round')} ${rd+1}/3 · ${L('ท่าตัวอย่างของคุณ','Your demonstration')}</div><div style="font-size:30px;text-align:center;letter-spacing:6px;margin:10px 0">${demo.join('')}</div>`;
   setTimeout(()=>{if(stop||!api.live())return;const sel=new Set();B2.innerHTML=`<div class="tag2" style="text-align:center">${L('ศิษย์ทำตาม แตะท่าที่ผิด','Your student copies you. Tap the wrong moves')}</div><div style="display:grid;grid-template-columns:repeat(${N},1fr);gap:4px;margin:10px 0">${stu.map((m,i)=>`<button class="pbtn" data-i="${i}" style="font-size:24px;padding:10px 0">${m}</button>`).join('')}</div><button class="gbtn" id="sxTk" style="width:100%">✔️ ${L('ยืนยัน','Confirm')}</button>`;
    B2.querySelectorAll('[data-i]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();const i=+b.dataset.i;if(sel.has(i)){sel.delete(i);b.style.outline=''}else{sel.add(i);b.style.outline='3px solid #ff5a5a'}});
    B2.querySelector('#sxTk').onclick=()=>{if(!api.live())return;tot+=wrong.size;sel.forEach(i=>{if(wrong.has(i))ok++;else ok-=.5});rd++;show()}},Math.round((1500+N*250)*api.ez))};
  show();return{sc:()=>cl(tot?ok/tot:0,0,1),stop(){stop=1}}}};
// 3) ประมูลเงียบ — อ่านอาการคู่แข่ง
MG.sxBid={n:'ประมูลเงียบใต้ดิน',ic:'🤫',mt:'ตาอ่านใจ',how:'อ่านอาการคู่แข่งแล้วเลือกขึ้นราคาน้อย/มาก หรือถอย ชนะด้วยราคาต่ำที่สุด',t:30,rw:()=>'',
 init(B2,api){const lim=Ri(55,95);let p=40,stop=0,res=-1,turn=0;const tell=()=>{const r=(lim-p)/lim+(rnd()-.5)*.18;return r>.35?['😐',L('นิ่ง จิบชา','Calm, sipping tea')]:r>.15?['🤨',L('เลิกคิ้ว เคาะนิ้ว','Raises a brow, taps the table')]:['😅',L('เหงื่อซึม มือกำถุงเงินแน่น','Sweating, gripping the purse')]};
  const draw=()=>{if(stop)return;const t=tell();B2.innerHTML=`<div class="tag2" style="text-align:center">${L('ราคาตอนนี้','Current price')}: <b>${p}</b> · ${L('ตาที่','Turn')} ${turn+1}</div><div style="font-size:56px;text-align:center">${t[0]}</div><div class="tag2" style="text-align:center">${L('คู่แข่ง','Rival')}: ${t[1]}</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:10px"><button class="pbtn" data-a="1">+5</button><button class="pbtn" data-a="2">+15</button><button class="gbtn" data-a="0">🙅 ${L('ถอย','Fold')}</button></div>`;
   B2.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{if(!api.live())return;const a=+b.dataset.a;if(!a){res=0;api.end();return}p+=a===1?5:15;turn++;if(p>lim){res=1;api.end();return}if(rnd()<.25+turn*.05&&p>=lim-8){res=1;api.end();return}p+=Ri(2,6);if(p>=100){res=0;api.end();return}draw()})};
  draw();return{sc:()=>res===1?cl(1-(p-40)/70,.2,1):0,stop(){stop=1}}}};
// 4) ต่อกระดูกวิญญาณ — หมุนชิ้นให้ตรงลายต้นแบบ
const AR=['⬆️','➡️','⬇️','⬅️'];
MG.sxBone={n:'ต่อกระดูกวิญญาณ',ic:'🦴',mt:'ช่างต่อกระดูก',how:'แตะชิ้นกระดูกเพื่อหมุน ให้ลายตรงกับต้นแบบทุกชิ้น 2 แผ่น',t:30,rw:()=>'',
 init(B2,api){let rd=0,ok=0,stop=0,cur=null,tg=null;const show=()=>{if(stop)return;if(rd>=2){api.end();return}tg=Array.from({length:9},()=>Ri(0,3));cur=tg.map(v=>(v+Ri(1,3))%4);
   const draw=()=>{B2.innerHTML=`<div style="display:flex;gap:10px;align-items:center;justify-content:center"><div><div class="tag2" style="text-align:center">${L('ต้นแบบ','Pattern')}</div><div style="display:grid;grid-template-columns:repeat(3,22px);gap:2px">${tg.map(v=>`<div style="font-size:16px">${AR[v]}</div>`).join('')}</div></div><div style="display:grid;grid-template-columns:repeat(3,64px);gap:5px">${cur.map((v,i)=>`<button data-i="${i}" style="font-size:28px;height:60px;border-radius:10px;border:2px solid ${v===tg[i]?'#6fd08a':'#c8b48a'};background:#2a2218">${AR[v]}</button>`).join('')}</div></div><div class="tag2" style="text-align:center;margin-top:6px">${L('แผ่นที่','Plate')} ${rd+1}/2</div>`;
    B2.querySelectorAll('[data-i]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(!api.live())return;const i=+b.dataset.i;cur[i]=(cur[i]+1)%4;if(cur.every((v,j)=>v===tg[j])){ok++;rd++;setTimeout(show,300)}else draw()})};draw()};
  show();return{sc:()=>{const part=cur&&tg?cur.filter((v,i)=>v===tg[i]).length/9:0;return cl((ok+(rd<2?part*.8:0))/2,0,1)},stop(){stop=1}}}};
// 5) เจรจากับสัตว์ — อ่านภาษากาย
const CUE=[[['หูลู่ หางซุกใต้ท้อง','Ears flat, tail tucked'],'back'],[['ขนตั้ง คำรามต่ำในคอ','Hackles up, a low growl'],'still'],[['หางแกว่งช้า ดมอากาศมาทางคุณ','Tail swaying slowly, sniffing toward you'],'hand'],[['ตาจ้องไม่กะพริบ ย่อตัวต่ำ','Unblinking stare, crouched low'],'back'],[['เลียแผลตัวเอง ไม่มองคุณ','Licking its wound, not looking at you'],'bow'],[['ส่งเสียงครางเบาๆ เดินวนรอบคุณ','Whining softly, circling you'],'hand']];
const RSP={still:['🗿','ยืนนิ่ง','Stand still'],back:['🚶','ถอยช้าๆ','Back away slowly'],hand:['🤲','ยื่นมือ','Offer your hand'],bow:['🙇','ก้มต่ำ','Lower yourself']};
MG.sxTalk={n:'เจรจากับสัตว์วิญญาณ',ic:'🗣️',mt:'ผู้ฟังภาษาป่า',how:'อ่านท่าทางของสัตว์แล้วตอบให้ถูก 4 ครั้ง',t:28,rw:()=>'',
 init(B2,api){let rd=0,ok=0,stop=0;const show=()=>{if(stop)return;if(rd>=4){api.end();return}const c=pick(CUE);const ks=shuf(Object.keys(RSP));
   B2.innerHTML=`<div class="tag2" style="text-align:center">${L('ครั้งที่','Exchange')} ${rd+1}/4</div><div class="item" style="text-align:center;font-size:15px;margin:8px 0">🐾 ${L(c[0][0],c[0][1])}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${ks.map(k=>`<button class="pbtn" data-k="${k}" style="padding:12px 0">${RSP[k][0]} ${L(RSP[k][1],RSP[k][2])}</button>`).join('')}</div>`;
   B2.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(!api.live())return;const g=b.dataset.k===c[1];if(g)ok++;b.textContent=g?'✅':'❌';rd++;setTimeout(show,450)})};
  show();return{sc:()=>ok/4,stop(){stop=1}}}};
// 6) เฝ้าศพคืนเดียว — เทียนห้ามดับ เสียงในความมืดห้ามหันไปดู
MG.sxCandle={n:'เฝ้าศพคืนเดียว',ic:'🕯️',mt:'ผู้เฝ้ายามค่ำคืน',how:'แตะเทียนที่ใกล้ดับให้ลุกขึ้น ถ้ามีเสียงเรียกจากความมืด อย่าแตะหันไปดู',t:20,rw:()=>'',
 init(B2,api){const f=[1,1,1];let turned=0,out=0,stop=0,vc=null,tick=0,sum=0;
  B2.innerHTML=`<div id="sxV" class="tag2" style="text-align:center;min-height:22px"></div><div style="display:flex;justify-content:space-around;margin:10px 0">${f.map((_,i)=>`<button data-i="${i}" style="width:84px;height:120px;border-radius:12px;border:1px solid #5a4a2a;background:#140f08;font-size:30px">🕯️</button>`).join('')}</div><button class="gbtn" id="sxTurn" style="width:100%;visibility:hidden">👀 ${L('หันไปดู','Turn and look')}</button>`;
  const bs=[...B2.querySelectorAll('[data-i]')],V=B2.querySelector('#sxV'),T=B2.querySelector('#sxTurn');
  const draw=()=>bs.forEach((b,i)=>{b.textContent=f[i]>0?'🕯️':'💨';b.style.boxShadow=f[i]>0?`0 -${Math.round(f[i]*30)}px ${Math.round(f[i]*40)}px #ffb84a88`:'none';b.style.opacity=f[i]>0?.5+f[i]*.5:.4});
  bs.forEach((b,i)=>b.onpointerdown=e=>{e.preventDefault();if(!api.live())return;if(f[i]>0)f[i]=Math.min(1,f[i]+.45);draw()});
  T.onclick=()=>{if(!vc)return;turned++;vc=null;V.textContent=L('ไม่มีใครอยู่ตรงนั้น…','No one is there…');T.style.visibility='hidden';f.forEach((_,i)=>f[i]=Math.max(0,f[i]-.35));draw()};
  const VO=[['มีเสียงเรียกชื่อคุณจากทางซ้าย','Someone calls your name from the left'],['เสียงฝีเท้าหยุดอยู่ข้างหลังคุณพอดี','Footsteps stop right behind you'],['เสียงหัวเราะเด็กดังจากใต้โต๊ะ','A child laughs from under the table']];
  const iv=setInterval(()=>{if(stop||!api.live())return;tick++;f.forEach((v,i)=>{if(v>0){f[i]=v-(.05+rnd()*.06)*Math.sqrt(1/api.ez);if(f[i]<=0){f[i]=0;out++}}});if(tick%14===0&&rnd()<.35)f.forEach((_,i)=>f[i]=Math.max(0,f[i]-.25));
   if(!vc&&rnd()<.06){vc=pick(VO);V.textContent='👂 '+L(vc[0],vc[1]);T.style.visibility='visible';setTimeout(()=>{if(vc){vc=null;V.textContent='';T.style.visibility='hidden'}},2600)}
   sum+=f.filter(v=>v>0).length/3;draw();if(f.every(v=>v<=0))api.end()},300);draw();
  return{sc:()=>cl(sum/Math.max(1,tick)-turned*.2-out*.08,0,1),stop(){stop=1;clearInterval(iv)}}}};
try{Object.assign(I18N.d,{'ประสานเสียงวงแหวน':'Ring Harmony','จับท่าผิดของศิษย์':'Spot the Student\'s Mistake','ประมูลเงียบใต้ดิน':'Silent Underground Auction','ต่อกระดูกวิญญาณ':'Set the Spirit Bone','เจรจากับสัตว์วิญญาณ':'Parley with a Spirit Beast','เฝ้าศพคืนเดียว':'One-Night Vigil','เหรียญวิญญาณ':'spirit coins',
 'แตะวงแหวนตอนมันสว่างที่สุด แต่ละวงต้องโดน 2 ครั้ง วงที่แค้นเต้นไม่เป็นจังหวะ':'Tap each ring at its brightest, twice each. Vengeful rings pulse out of rhythm',
 'จำท่าตัวอย่าง แล้วแตะเฉพาะท่าที่ศิษย์ทำผิด จากนั้นกดยืนยัน 3 รอบ':'Memorize your demonstration, tap only the moves your student got wrong, then confirm. 3 rounds',
 'อ่านอาการคู่แข่งแล้วเลือกขึ้นราคาน้อย/มาก หรือถอย ชนะด้วยราคาต่ำที่สุด':'Read your rival and raise small, raise big, or fold. Win at the lowest price',
 'แตะชิ้นกระดูกเพื่อหมุน ให้ลายตรงกับต้นแบบทุกชิ้น 2 แผ่น':'Tap bone pieces to rotate them until they match the pattern. 2 plates',
 'อ่านท่าทางของสัตว์แล้วตอบให้ถูก 4 ครั้ง':'Read the beast\'s body language and respond correctly 4 times',
 'แตะเทียนที่ใกล้ดับให้ลุกขึ้น ถ้ามีเสียงเรียกจากความมืด อย่าแตะหันไปดู':'Tap dying candles to revive them. If something calls from the dark, do not turn to look'})}catch(e){}

// =================== 💍 วงแหวนมีชีวิต ===================
// นิสัยของวงแหวนมาจากวิธีที่ได้มา · ตั้ง window._svMd ก่อนหลอมเพื่อบอกที่มา (หมดอายุ 15 วิ)
const MD={hate:['😠','แค้น','Vengeful'],loyal:['🤝','ภักดี','Loyal'],sad:['💧','เศร้า','Grieving'],empty:['🫥','ว่างเปล่า','Hollow'],calm:['😐','สงบ','Calm']};
const mdN=k=>MD[k]?MD[k][0]+' '+L(MD[k][1],MD[k][2]):'';
window._svSetMd=k=>{window._svMd={k,t:Date.now()}};
const ringsOf=k=>(G().rings||[]).filter(r=>r.md===k);
setInterval(()=>{try{if(!on())return;const g=G();if(!g.rings||g.aw!==1)return;const y=Y();if(y._rc==null){y._rc=g.rings.length;g.rings.forEach(r=>{if(!r.md)r.md='calm'});return}
 if(g.rings.length<y._rc)y._rc=g.rings.length;
 for(let i=y._rc;i<g.rings.length;i++){const r=g.rings[i];if(r.md)continue;const h=window._svMd&&Date.now()-window._svMd.t<120000?window._svMd.k:null;window._svMd=null;
  r.md=h||(()=>{const x=rnd();const sp=sea()===0;return x<(sp?.25:.32)?'hate':x<(sp?.55:.4)?'sad':x<.46?'loyal':'calm'})();r.ya=S.age;
  say(`💍 ${L('วงแหวนวงที่','Ring')} ${i+1} ${L('มีนิสัย','has a temperament')}: <b>${mdN(r.md)}</b>${r.md==='hate'?L(' — มันยังจำวินาทีสุดท้ายของตัวเองได้',' — it still remembers its last moment'):r.md==='sad'?L(' — ในวงแหวนมีกลิ่นลูกอ่อนติดอยู่',' — it smells faintly of its young'):''}`,r.md==='hate'||r.md==='sad'?'bad':'');
  ringSeason(r);webHunt(r)}
 y._rc=g.rings.length}catch(e){console.error('sx2 ring',e)}},1200);
// ผลในการดวล
{const _d=duel;duel=function(name,ep,cb){try{if(on()&&G().aw===1&&typeof ep==='number'){const g=G();const h=ringsOf('hate'),l=ringsOf('loyal');
 if(h.length&&rnd()<Math.min(.35,.1*h.length)){const r=pick(h);if(rnd()<.5){ep*=.85;hurt(.08);say(L(`😠 วงแหวน「${r.sk||r.b}」ขัดคำสั่ง ปล่อยพลังเกินกว่าที่คุณสั่ง ศัตรูกระเด็น แต่แขนคุณไหม้ไปด้วย`,`😠 The「${r.sk||r.b}」ring disobeys and unleashes more than you asked. The enemy flies back, and your arm burns with it`),'bad')}else{ep*=1.15;say(L(`😠 วงแหวน「${r.sk||r.b}」ไม่ยอมสว่างในจังหวะที่คุณต้องการ`,`😠 The「${r.sk||r.b}」ring refuses to light when you need it`),'bad')}}
 else if(l.length&&rnd()<Math.min(.3,.07*l.length)){ep*=.9;say(L(`🤝 วงแหวน「${pick(l).sk||'?'}」สว่างขึ้นเองก่อนคุณจะเรียก`,`🤝 A loyal ring lights up before you even call it`),'good')}
 // ฤดูจำศีล / ปีพิเศษ / ป่าทั้งเว็บ — เฉพาะการล่า (ชื่อลงท้าย "ปี)")
 if(/ปี\)$|year\)$/.test(String(name))){const s=sea(),sy=spY();if(s===3){if(rnd()<.15){ep*=1.4;say(L('❄️ คุณปลุกผิดตัว ทั้งฝูงที่จำศีลอยู่ในถ้ำลืมตาพร้อมกัน','❄️ You woke the wrong one. The whole hibernating pack opens its eyes at once'),'bad')}else ep*=.8}
  if(sy==='blood')ep*=1.15;if(sy==='silent')hurt(.06);const hot=webHot();if(hot&&String(name).indexOf(hot)>=0){ep*=1.15;say(L(`🌐 ${hot}ทั้งเผ่าจำได้ว่าสัปดาห์ก่อนผู้คนทั้งทวีปล่าพวกมันไปเท่าไร`,`🌐 Every ${hot} remembers how many of them the continent hunted last week`),'bad')}}}}catch(e){console.error('sx2 duel',e)}return _d.call(this,name,ep,cb)}}
// ฝันร้าย / วงเศร้าบอกทาง / ประสานวง / คืนวงแหวนกบฏ
function ringEv(){const g=G(),y=Y();if(!g.rings||g.rings.length<2)return false;const h=ringsOf('hate'),l=ringsOf('loyal'),sd=ringsOf('sad');
 if(h.length>=3&&h.length>l.length&&!y.ev.reb&&rnd()<.1){y.ev.reb=1;choice('💍 '+L('คืนที่วงแหวนตื่นพร้อมกัน','The night the rings woke together'),L(`กลางดึกวงแหวนทั้ง${g.rings.length}วงลอยออกจากตัวคุณ หมุนเป็นวงกลมกลางห้อง วงที่แค้นมี${h.length}วง วงที่ภักดีมี${l.length}วง พวกมันกำลังลงมติว่าจะอยู่กับคุณต่อหรือไม่`,`At midnight all ${g.rings.length} rings float out of you and circle the room. ${h.length} are vengeful, ${l.length} loyal. They are voting on whether to stay.`),[
  O('💍 '+L('ประสานเสียงพวกมันให้กลับเข้าที่ (มินิเกม)','Bring them back into harmony (minigame)'),L('สำเร็จ = วงที่แค้นสงบลง','Success = the vengeful rings calm'),()=>mgo('sxChord',{rings:g.rings.slice(0,5)},sc=>{if(sc>=.6){h.slice(0,2).forEach(r=>r.md='calm');S.power+=pctPow(.05);say(L('💍 วงแหวนทั้งหมดค่อยๆ จมกลับเข้าตัวคุณ เสียงหวีดในหูเงียบลงเป็นครั้งแรกในรอบหลายปี','💍 One by one they sink back into you. The ringing in your ears goes quiet for the first time in years'),'myth',true)}else{g.lv=Math.max(1,g.lv-2);S.maxHp=Math.round(S.maxHp*.9);S.hp=Math.min(S.hp,S.maxHp);say(L('💥 วงแหวนกระแทกกลับเข้าตัวอย่างไม่เต็มใจ เส้นจิตคุณช้ำ (ระดับจิต −2 · พลังชีวิตสูงสุด −10%)','💥 The rings slam back in, unwilling. Your meridians bruise (spirit level −2 · max HP −10%)'),'bad',true)}})),
  O('✂️ '+L('ปล่อยวงที่แค้นที่สุดไป','Release the most vengeful ring'),L('เสียวงแหวน 1 วง · ที่เหลือสงบ','Lose one ring · the rest settle'),()=>{const r=h[0];const i=g.rings.indexOf(r);if(i>=0)g.rings.splice(i,1);Y()._rc=g.rings.length;S.power=Math.max(1,Math.round(S.power*.93));h.slice(1).forEach(x=>{if(rnd()<.5)x.md='calm'});say(L(`✂️ วงแหวน「${r.sk||r.b}」ลอยออกไปทางหน้าต่าง แล้วแตกเป็นแสงเหนือป่า คุณต้องล่าวงใหม่มาแทน`,`✂️ The「${r.sk||r.b}」ring drifts out the window and bursts into light above the forest. You will need a new one`),'epic',true)})]);return true}
 if(h.length&&rnd()<.18){const r=pick(h);const req=rnd()<.5?'grave':'hunter';choice('😠 '+L('ฝันร้ายจากวงแหวน','A nightmare from your ring'),L(`ในฝัน คุณกลายเป็น${r.b}อีกครั้ง วิ่งหนีอยู่ในป่าแล้วถูกตัวคุณเองไล่ล่า ตื่นมาหมอนเปียกเหงื่อ วงแหวน「${r.sk||r.b}」ยังสั่นอยู่ในอก<br><br>${req==='grave'?'มันอยากให้คุณไปเยี่ยมหลุมของลูกมัน':'มันอยากให้คุณจัดการพรานที่ล่าฝูงมันจนหมด'}`,`In the dream you are the ${r.b} again, running through the forest, hunted by yourself. You wake soaked. The「${r.sk||r.b}」ring still trembles in your chest.<br><br>${req==='grave'?'It wants you to visit its cub\'s grave.':'It wants you to deal with the hunter who wiped out its pack.'}`),[
  O('🕯️ '+L('เฝ้าคืนหนึ่งเพื่อขอโทษมัน (มินิเกม)','Keep a vigil to apologize (minigame)'),'',()=>mgo('sxCandle',{},sc=>{if(sc>=.55){r.md='calm';bond(g,4);say(L('🕯️ เทียนไม่ดับจนเช้า วงแหวนหยุดสั่น','🕯️ The candles last until dawn. The ring stops trembling'),'good')}else say(L('💨 เทียนดับตอนตีสาม ฝันเดิมกลับมาอีก','💨 The candles go out at three. The same dream returns'),'bad')})),
  O(req==='grave'?'🌲 '+L('ไปที่หลุมนั้น','Go to the grave'):'🏹 '+L('ตามหาพรานคนนั้น','Track down that hunter'),req==='grave'?L('เสียเงินเดินทาง · มันจะภักดี','Travel costs · it will turn loyal'):L('ดวล · ชนะแล้วมันจะภักดี','Duel · win and it turns loyal'),()=>{if(req==='grave'){S.money=Math.max(0,S.money-Math.round(Math.max(200,S.money*.05)));r.md='loyal';say(L(`🌲 คุณวางหินก้อนเล็กบนเนินดินที่ไม่มีใครรู้ว่าเป็นหลุม วงแหวน「${r.sk||r.b}」อุ่นขึ้นเป็นครั้งแรก`,`🌲 You set a small stone on a mound no one knows is a grave. The ring warms for the first time`),'epic',true)}
   else duel(L('พรานเฒ่าหลังค่อม','the hunchbacked old hunter'),Math.round(total()*.9),w=>{if(w){r.md='loyal';S.karma-=3;say(L('🏹 พรานล้มลงพร้อมเสียงหัวเราะ "ข้านึกว่าพวกมันจะส่งตัวที่ใหญ่กว่านี้มา" วงแหวนในอกคุณร้องเหมือนสัตว์ที่ได้กลับบ้าน','🏹 The hunter falls laughing. "Thought they\'d send something bigger." The ring in your chest cries out like an animal come home'),'epic',true)}else{hurt(.15);say(L('🩸 คุณแพ้ วงแหวนเงียบอย่างผิดหวัง','🩸 You lose. The ring falls disappointed and silent'),'bad')}})}),
  O('👊 '+L('ข่มมันไว้','Force it down'),L('พลัง + · มันจะแค้นยิ่งกว่าเดิม','Power + · it will hate you more'),()=>{S.power+=pctPow(.03);hurt(.05);r.hx=(r.hx||0)+1;say(L('👊 คุณกดมันลงไปจนเงียบ แต่รู้ดีว่ามันแค่รอ','👊 You crush it into silence, knowing it is only waiting'),'')})]);return true}
 if(sd.length&&rnd()<.1&&g.sx&&!g.sx.ow&&g.rings.length<9){const r=pick(sd);choice('💧 '+L('วงแหวนที่ร้องไห้','The weeping ring'),L(`วงแหวน「${r.sk||r.b}」ส่งภาพมาให้คุณเห็นทั้งคืน ลูกของมันรอดจากวันนั้น และโตเป็นสัตว์ที่แก่กว่าแม่ของมันแล้ว อยู่ที่หุบเขาทางเหนือ`,`All night the「${r.sk||r.b}」ring shows you pictures: its cub survived that day and has grown older than its mother ever was. It lives in the northern valley.`),[
  O('🧭 '+L('ไปหามัน','Go find it'),L('มันอาจยอมมอบวงแหวนให้ ในครั้งล่าถัดไป','It may give you its ring at your next hunt'),()=>{g.sx.ow={n:r.b+L('รุ่นลูก',' (grown cub)'),t:Math.min(4,(r.t|0)+1),a:S.age-2,ty:r.ty};r.md='loyal';window._svSetMd('loyal');say(L(`🧭 ${r.b}ตัวนั้นดมกลิ่นแม่ของมันจากอกคุณ แล้วนั่งลงเฉยๆ ไม่หนี ไม่สู้`,`🧭 The grown ${r.b} smells its mother in your chest, and simply sits. It does not run or fight`),'epic',true)}),
  O('🙈 '+L('ไม่ไป','Don\'t go'),'',()=>say(L('🙈 วงแหวนเงียบไปทั้งปี','🙈 The ring is silent all year'),''))]);return true}
 if(g.rings.length>=3&&rnd()<.06){choice('💍 '+L('คืนที่วงแหวนร้องเพลง','The night the rings sang'),L('วงแหวนทุกวงสั่นพร้อมกันเป็นเสียงต่ำๆ เหมือนกำลังรอให้คุณร้องตาม','Every ring hums at once, low, as if waiting for you to join'),[
  O('💍 '+L('ร้องตาม (มินิเกม)','Sing along (minigame)'),'',()=>mgo('sxChord',{rings:g.rings.slice(-5)},sc=>{if(sc>=.6){const r=ringsOf('hate')[0];if(r)r.md='calm';S.power+=pctPow(.04);bond(g,3);say(L('💍 เสียงประสานพาพลังเดินรอบตัวครบหนึ่งรอบ','💍 The harmony carries power through you in a full circle'),'good')}else say(L('💍 เสียงแตกกลางคัน วงแหวนเงียบไปเอง','💍 The chord breaks; the rings fall quiet'),'')})),
  O('😴 '+L('นอนต่อ','Go back to sleep'),'',()=>{})]);return true}
 return false}
// =================== 🌦️ ฤดูทวีป ===================
const SEA=[['🌸','ฤดูผสมพันธุ์','Breeding Season','สภาห้ามล่า ถูกจับได้โดนปรับ · สัตว์แม่ลูกอ่อนชุก','Council hunting ban, fines if caught · many mothers with young'],['☀️','ฤดูอพยพ','Migration Season','สัตว์ต่างแคว้นผ่านมา มีสายที่ปกติหาไม่ได้','Beasts from other provinces pass through, bringing paths you rarely see'],['🍂','ฤดูสอบ','Exam Season','ทีมสถาบันออกล่าพร้อมกัน หลอมเกินขีดปลอดภัยขึ้น ได้ชื่อเสียงเพิ่ม','Academy teams hunt together; overreaching is safer and earns fame'],['❄️','ฤดูจำศีล','Hibernation Season','สัตว์หลับ สู้ง่ายขึ้นมาก แต่อาจปลุกผิดตัว','Beasts sleep; fights are much easier, unless you wake the wrong one']];
const SPY={blood:['🩸','ปีจันทร์สีเลือด','Blood Moon Year','วงแหวนแรงขึ้น แต่สัตว์คลั่ง','Rings grow stronger, but beasts go mad'],silent:['🌫️','ปีป่าเงียบ','Silent Forest Year','สัตว์หายจากชายป่า ต้องเดินลึกจนบาดเจ็บ','Beasts vanish from the forest edge; going deeper costs blood'],comet:['☄️','ปีดาวหาง','Comet Year','ดวงจิตแปรเปลี่ยนง่าย ทุกอย่างอาจกลายพันธุ์','Spirits mutate easily; anything may change']};
const sea=()=>{try{return(S.age+Y().so)%4}catch(e){return 0}};
const spY=()=>{try{const p=Y().sp;return p&&p.y===S.age?p.k:null}catch(e){return null}};
const seaTxt=()=>{const s=SEA[sea()],p=spY();return`${s[0]} <b>${L(s[1],s[2])}</b> — ${L(s[3],s[4])}${p?` · ${SPY[p][0]} <b>${L(SPY[p][1],SPY[p][2])}</b> — ${L(SPY[p][3],SPY[p][4])}`:''}`};
function seaYear(){const y=Y(),g=G();const p=y.sp;
 if(p&&p.y===S.age+1&&!p.ann){p.ann=1;say(`📯 ${L('ประกาศจากหอดูดาวทวีป: ปีหน้าเป็น','The Continental Observatory announces: next year is a')} ${SPY[p.k][0]} <b>${L(SPY[p.k][1],SPY[p.k][2])}</b> — ${L(SPY[p.k][3],SPY[p.k][4])}`,'epic')}
 if((!p||p.y<S.age)&&rnd()<.12)y.sp={y:S.age+2,k:pick(Object.keys(SPY))};
 if(spY()==='comet'&&window._sx&&g.sx&&!g.sx.mut&&rnd()<.6){try{window._sx.mutate()}catch(e){}}}
function ringSeason(r){const s=sea(),sy=spY();
 if(s===0&&r.md!=='loyal'&&rnd()<.4){const f=Math.round(Math.max(300,S.money*.08));S.money=Math.max(0,S.money-f);S.karma-=3;say(`🌸 ${L(`เจ้าหน้าที่สภาจับได้ว่าคุณล่าในฤดูผสมพันธุ์ ปรับ ${fmt(f)}`,`A Council officer catches you hunting in breeding season. Fine: ${fmt(f)}`)}`,'bad')}
 if(s===2){S.fame+=60+(r.t|0)*40}
 if(sy==='blood'){S.power+=pctPow(.05);say(L('🩸 แสงจันทร์สีเลือดทำให้วงแหวนวงใหม่ร้อนกว่าปกติ','🩸 The blood moon makes the new ring burn hotter than it should'),'epic')}}
{const _r=window._svRisk;window._svRisk=function(g,t,o){let v=_r?_r.apply(this,arguments):0;try{if(on()&&sea()===2&&o>0)v+=.08}catch(e){}return v}}
// ฤดูอพยพ: สัตว์ต่างสาย · ฤดูทั้งหมด: บอกในหน้าล่า
const MIG={atk:[['สิงโตทรายแดง','Red Sand Lion'],['เหยี่ยวเพลิงอพยพ','Migrating Flame Hawk']],def:[['เต่าหินลอยน้ำ','Floating Stone Turtle'],['แรดเกราะสามชั้น','Triple-Plated Rhino']],sup:[['ฝูงกวางแสง','Light-Deer Herd'],['ผึ้งน้ำผึ้งหยก','Jade Honeybee Swarm']],ctrl:[['แมงกะพรุนหมอก','Mist Jellyfish'],['แมงมุมใยเงิน','Silver-Web Spider']],agi:[['ม้าลมเหนือ','North Wind Horse'],['นกนางแอ่นเงา','Shadow Swallow']]};
{const _hx=window._svHuntX;window._svHuntX=function(g0,i,safe,opts){if(_hx)_hx.apply(this,arguments);try{if(!on())return;const g=G(),y=Y(),add=[];const st=Math.min(3,safe);
 opts.forEach(o=>{if(/ตลาดมืด|black market/i.test(o.t||'')&&!o._md){o._md=1;const f=o.f;o.f=function(){window._svSetMd('empty');return f.apply(this,arguments)}}});
 if(sea()===1){const have=new Set(g.rings.map(r=>r.ty));const miss=Object.keys(MIG).filter(k=>!have.has(k));const ty=pick(miss.length?miss:Object.keys(MIG));const b=pick(MIG[ty]);const nm=L(b[0],b[1]);
  add.push(O(`☀️ ${TIC[st]} ${nm} · ${tN(st)}`,`${TYI[ty]} ${L('ฝูงอพยพผ่านมา · สายที่ปกติหาไม่ได้','A migrating herd · a path you rarely find')}`,()=>{const n0=g.rings.length;duel(`${nm} (${tN(st)})`,Math.round(total()*[.35,.65,.95,1.25][st]),w=>{if(!w){hurt(.12);say(L(`☀️ ${nm}วิ่งตามฝูงไปทางใต้`,`☀️ The ${nm} runs south with its herd`),'bad');return}try{B.absorb(st,[nm,L('ก้าวตามฝูง','Herd Step')])}catch(e){}const r=g.rings[n0];if(r)r.ty=ty})}))}
 // ประมูลเงียบ (ตลาดใต้ดิน)
 if(S.money>=[200,600,2500,8000,25000][Math.min(4,safe)]&&rnd()<.35){const base=[200,600,2500,8000,25000][Math.min(4,safe)];add.push(O(`🤫 ${L('ประมูลเงียบ: วงแหวนจากตลาดใต้ดิน (มินิเกม)','Silent auction: an underground ring (minigame)')}`,`${tN(st)} · ${L('ชนะประมูลได้วงแหวนไม่ต้องล่า · ราคาขึ้นกับฝีมืออ่านคน','Win and skip the hunt · price depends on reading people')}`,()=>mgo('sxBid',{},sc=>{if(sc<=0){say(L('🙅 คุณถอยออกจากห้องประมูล คู่แข่งยิ้มมุมปาก','🙅 You leave the room. Your rival smirks'),'');return}const cost=Math.round(base*(1.6-sc));if(S.money<cost){say(L('💸 เงินไม่พอจ่ายตามที่ประมูลไว้ ถูกไล่ออกจากตลาด','💸 You can\'t pay what you bid and are thrown out'),'bad');return}S.money-=cost;window._svSetMd('empty');const b=pick(B.BEAST[st]);try{B.absorb(st,[b[0],b[1]])}catch(e){}say(`🤫 ${L('ได้มาในราคา','Won for')} ${fmt(cost)}`,'good')})))}
 // เจรจาให้ยอม
 if(S.age>=12&&rnd()<.4){const b=pick(B.BEAST[st]);add.push(O(`🗣️ ${L('เจรจากับ','Parley with')} ${b[0]} (${L('มินิเกม','minigame')})`,`${tN(st)} · ${L('ถ้ามันยอม ได้วงแหวนภักดีไม่ต้องสู้ · พลาดแล้วมันโกรธ','If it agrees: a loyal ring, no fight · fail and it is furious')}`,()=>mgo('sxTalk',{},sc=>{if(sc>=.75){window._svSetMd('loyal');try{B.absorb(st,[b[0],b[1]])}catch(e){}say(L(`🗣️ ${b[0]}ก้มหัวลงช้าๆ แล้วนอนลงตรงหน้าคุณ`,`🗣️ The ${b[0]} lowers its head slowly and lies down before you`),'epic',true)}else{window._svSetMd('hate');duel(`${b[0]} (${tN(st)})`,Math.round(total()*[.35,.65,.95,1.25][st]*1.2),w=>{if(w){window._svSetMd('hate');try{B.absorb(st,[b[0],b[1]])}catch(e){}}else{hurt(.15);say(L(`🩸 ${b[0]}จำได้ว่าคุณพยายามหลอกมัน`,`🩸 The ${b[0]} remembers you tried to trick it`),'bad')}})}})))}
 // ข่าวลือที่ตามมา
 if(y.rum&&S.age-y.rum.age<=3){const r=y.rum;add.push(O(`📰 ${L('ตามข่าวลือ','Follow the rumor')}: ${r.k}`,`${tN(r.t)} · ${r.real?L('ข่าวจริง · เสี่ยงน้อยกว่าปกติ','True · less risk than usual'):L('ไม่รู้ว่าจริงไหม','You can\'t tell if it is true')}`,()=>{y.rum=null;if(!r.real){hurt(.18);say(L('🪤 ข่าวลือเป็นกับดัก มีคนรออยู่ในพุ่มไม้พร้อมตาข่าย','🪤 The rumor was a trap. Someone waits in the brush with a net'),'bad',true);return}const n0=g.rings.length;duel(`${r.k} (${tN(r.t)})`,Math.round(total()*[.35,.65,.95,1.25,1.4][Math.min(4,r.t)]*.8),w=>{if(!w){hurt(.1);return}X1rk(.2);try{B.absorb(r.t,[r.k,L('รอยที่มีคนบอกทาง','The Trail Someone Shared')])}catch(e){}})}))}
 const sk=opts.findIndex(o=>o.skip);opts.splice(sk<0?opts.length:sk,0,...add)}catch(e){console.error('sx2 hx',e)}}}
const X1rk=v=>{try{if(G().sx)G().sx._rk=v;setTimeout(()=>{try{G().sx._rk=0}catch(e){}},1500)}catch(e){}};
// ใส่ฤดูในหัวหน้าล่าวงแหวน
{const _ch=choice;const nf=function(title,text,opts){try{if(on()&&typeof title==='string'&&title.indexOf('ออกล่าวงแหวนวงที่')>=0&&typeof text==='string'&&text.indexOf('🌦️')<0)text=text+`<br><span class="tag2">🌦️ ${seaTxt()}</span>`}catch(e){}return _ch.apply(this,arguments.length>=2?[title,text,...[].slice.call(arguments,2)]:arguments)};for(const k in _ch)nf[k]=_ch[k];choice=nf}

// =================== 🎭 ชะตาพลิก 5 แบบ (ชีวิตละ 0–2 เรื่อง) ===================
const nmR=()=>{try{return typeof anyName==='function'?anyName(rnd()<.5?'ชาย':'หญิง'):pick(['หลิงเฟิง','ซูเหยียน','ไป๋อวี่'])}catch(e){return 'หลิงเฟิง'}};
const spRand=f=>{const L0=B.SP.filter(p=>!/^b9/.test(p[0])&&(!f||f(p)));return pick(L0)};
const spIc=id=>{const p=B.SP.find(z=>z[0]===id);return p?p[1]+' '+p[2]:id};
function twPlan(){const y=Y();if(y.tw)return;const r=rnd(),n=r<.15?0:r<.75?1:2;const g=G();const ks=shuf(['swap','rig','plague','fake','law']).filter(k=>k!=='rig'||(B.spNow(g.sp[0]).r||0)<=1).slice(0,n);
 const AG={swap:[14,35],rig:[16,26],plague:[18,50],fake:[25,55],law:[15,45]};y.tw=ks.map(k=>({k,a:Math.max(S.age+1,Ri(AG[k][0],AG[k][1])),st:0}))}
function twStep(){const y=Y();if(!y.tw)return false;const t=y.tw.find(t=>t.st<9&&S.age>=t.a);if(!t)return false;return TW[t.k](t,G(),y)}
const TW={
 swap(t,g,y){if(t.st===0){const nm=nmR();t.n=nm;choice('🔄 '+L('พิธีที่ผิดพลาด','A ritual gone wrong'),L(`ระหว่างพิธีหลอมวงแหวนหมู่ที่สถาบัน ค่ายกลแตกกลางคัน คุณกับ${esc(nm)} คู่ปรับในรุ่นเดียวกัน หมดสติพร้อมกัน ตื่นมาดวงจิตในอกคุณไม่ใช่ของคุณ มันมองคุณเหมือนคนแปลกหน้า`,`During a group ring ritual at the academy, the array shatters. You and ${esc(nm)}, your rival, black out together. You wake with a spirit in your chest that isn't yours. It looks at you like a stranger.`),[
   O('🤝 '+L('ใช้ดวงจิตนี้ไปก่อน แล้วหาทางสลับคืน','Use this spirit for now and look for a way back'),L('ห้าปี','Five years'),()=>{y.swp={o:JSON.parse(JSON.stringify(g.sp)),b:g.bond};const p=spRand(p=>p[3]!==B.spNow(g.sp[0]).t);g.sp=[{id:p[0],rev:0}];g.bond=30;t.st=1;t.a=S.age+5;say(L(`🔄 ดวงจิตใหม่ของคุณคือ <b>${spIc(p[0])}</b> ส่วน${esc(nm)}ได้ดวงจิตของคุณไป ห้าปีต่อจากนี้คุณต้องสู้ด้วยสิ่งที่ไม่รู้จัก`,`🔄 Your new spirit is <b>${spIc(p[0])}</b>. ${esc(nm)} has yours. For five years you fight with something you don't know`),'myth',true)})]);return true}
  if(t.st===1){t.st=9;choice('🔄 '+L('ห้าปีต่อมา','Five years later'),L(`ผู้เฒ่าแห่งสถาบันหาวิธีสลับคืนได้แล้ว ${esc(t.n)}มาหาคุณ ดวงจิตของคุณในตัวเขาดูมีความสุขกว่าที่เคยอยู่กับคุณ`,`An academy elder has found a way to reverse it. ${esc(t.n)} comes to you. Your old spirit looks happier in him than it ever did in you.`),[
   O('🔁 '+L('สลับคืน','Switch back'),L('ดวงจิตเดิมคิดถึงคุณ','Your spirit missed you'),()=>{g.sp=y.swp.o;g.bond=Math.min(100,(y.swp.b||50)+12);say(L('🔁 ดวงจิตเดิมพุ่งกลับเข้าอกคุณเหมือนสุนัขที่หลงทางมาหลายปี','🔁 Your old spirit rushes back into your chest like a dog lost for years'),'epic',true)}),
   O('🫱 '+L('ให้มันอยู่กับคนที่ทำให้มันมีความสุข','Let it stay where it is happy'),L('เก็บดวงจิตใหม่ · ได้เพื่อนตลอดชีวิต','Keep the new spirit · a friend for life'),()=>{g.bond=Math.min(100,g.bond+25);S.karma+=10;S.power+=pctPow(.05);say(L(`🫱 ${esc(t.n)}ร้องไห้ ดวงจิตที่คุณเลี้ยงมาห้าปีซบคอคุณแน่น ตอนนี้มันเป็นของคุณจริงๆ แล้ว`,`🫱 ${esc(t.n)} weeps. The spirit you have raised for five years presses close; it is truly yours now`),'myth',true)})]);return true}return false},
 rig(t,g,y){t.st=9;const p=spRand(p=>p[5]>=2);const nm=nmR();choice('🎪 '+L('พิธีปลุกที่ถูกโกง','The rigged awakening'),L(`อดีตผู้ปลุกจิตประจำหมู่บ้านนอนรอตายอยู่ในวัดร้าง เขาสารภาพว่าในวันปลุกจิตของคุณ เขารับเงินจากตระกูลขุนนางให้สลับลูกแก้ว ดวงจิตที่ควรเป็นของคุณคือ <b>${spIc(p[0])}</b> ตอนนี้อยู่ในตัว${esc(nm)} ทายาทตระกูลนั้น`,`The village's old awakener lies dying in a ruined temple. He confesses that on your awakening day a noble clan paid him to swap the orbs. The spirit meant for you, <b>${spIc(p[0])}</b>, now lives in ${esc(nm)}, that clan's heir.`),[
   O('⚔️ '+L('ทวงคืนด้วยการประลอง','Reclaim it in a duel'),L('ชนะ = ได้ดวงจิตที่ควรเป็นของคุณ','Win = the spirit that should have been yours'),()=>duel(nm,Math.round(total()*1.25),w=>{if(w){g.sp=[{id:p[0],rev:0}];g.bond=40;S.fame+=1500;say(L(`⚔️ ลูกแก้วแตกกลางลานประลอง ดวงจิตกระโดดจากอก${esc(nm)}มาหาคุณ เหมือนรอมาตลอดยี่สิบปี`,`⚔️ An orb shatters mid-arena. The spirit leaps from ${esc(nm)} to you, as if it had waited twenty years`),'myth',true)}else{hurt(.25);S.fame=Math.round(S.fame*.85);say(L('🩸 คุณแพ้ต่อหน้าคนทั้งเมือง และตระกูลนั้นจะจำหน้าคุณไว้','🩸 You lose in front of the whole city, and that clan will remember your face'),'bad',true)}})),
   O('📣 '+L('แฉเรื่องนี้ต่อหน้าสภา','Expose it before the Council'),L('ชื่อเสียง + · ตระกูลนั้นเป็นศัตรู','Fame + · that clan becomes an enemy'),()=>{S.fame+=900;S.money=Math.max(0,S.money-Math.round(S.money*.1));y.ev.noble=S.age;say(L('📣 สภาสั่งริบที่ดินตระกูลนั้นครึ่งหนึ่ง แต่ดวงจิตไม่มีใครเอาคืนให้คุณได้','📣 The Council seizes half the clan\'s lands. No one can give the spirit back'),'epic',true)}),
   O('🕊️ '+L('ปล่อยไป','Let it go'),L('ดวงจิตที่มีอยู่จะรักคุณมากขึ้น','The spirit you have will love you more'),()=>{S.karma+=10;g.bond=Math.min(100,(g.bond==null?50:g.bond)+12);say(L(`🕊️ คืนนั้น${spNm(g)}ไม่ยอมกลับเข้าอก มันนอนขดอยู่ข้างหมอนคุณทั้งคืน`,`🕊️ That night your ${spNm(g)} won't go back inside you. It sleeps curled beside your pillow`),'epic')})]);return true},
 plague(t,g,y){if(t.st===0){t.st=1;choice('🦠 '+L('โรคดวงจิตเสื่อม','The Spirit-Fading Plague'),L('ดวงจิตของคนในแคว้นค่อยๆ หรี่ลงทีละคน เด็กที่เพิ่งปลุกจิตเป็นกลุ่มแรกที่ดับ หมอบอกว่ายาแก้ต้องใช้แก่นของ<b>กวางหยกเขาแก้ว</b> ซึ่งเหลือตัวสุดท้ายในทวีป','Spirits across the province dim one by one. The newly awakened children go first. The healers say the cure needs the core of the <b>Jade Deer of Glass Antlers</b>, and only one is left on the continent.'),[
   O('🏹 '+L('ล่าตัวสุดท้าย','Hunt the last one'),L('ช่วยทั้งแคว้น · สายพันธุ์สูญ','Save the province · end a species'),()=>duel(L('กวางหยกเขาแก้วตัวสุดท้าย','the last Jade Deer'),Math.round(total()*1.3),w=>{t.st=9;if(w){S.fame+=3000;S.karma-=15;say(L('🏹 คุณกลับมาพร้อมแก่นสีเขียวที่ยังอุ่นอยู่ เด็กทั้งแคว้นรอด หนังสือเรียนรุ่นต่อไปจะมีรูปกวางหยกในหน้าสัตว์สูญพันธุ์','🏹 You return with a green core still warm. Every child lives. Future textbooks will list the Jade Deer as extinct'),'myth',true)}else{y.pl=3;say(L('🩸 กวางหนีไป ลมหายใจของมันพาหมอกเขียวกระจายไปทั้งหุบ','🩸 The deer escapes, its breath spreading green mist through the valley'),'bad',true)}})),
   O('🕯️ '+L('อยู่ช่วยเฝ้าคนป่วย หาทางอื่น','Stay with the sick and seek another way'),L('ช้า · เสี่ยง · ไม่มีอะไรต้องตาย','Slow · risky · nothing has to die'),()=>{y.pl=3;t.a=S.age+1;say(L('🕯️ คุณเปลี่ยนวัดร้างเป็นโรงพยาบาลชั่วคราว ดวงจิตของคุณเองก็เริ่มหรี่','🕯️ You turn a ruined temple into a sickhouse. Your own spirit begins to dim'),'')}),
   O('🏃 '+L('อพยพออกจากแคว้น','Leave the province'),L('ปลอดภัย · ชื่อเสียงลด','Safe · reputation falls'),()=>{t.st=9;S.fame=Math.round(S.fame*.7);S.karma-=5;say(L('🏃 คุณออกจากแคว้นในคืนที่ประตูเมืองยังเปิด','🏃 You leave the night the gates are still open'),'')})]);return true}
  if(t.st===1){t.st=2;t.a=S.age+1;choice('🕯️ '+L('คืนที่เด็กคนแรกดับ','The night the first child faded'),L('เด็กหญิงอายุเจ็ดขวบในเตียงริมหน้าต่างหายใจช้าลงเรื่อยๆ แม่ของเธอหลับไปแล้ว เหลือแค่คุณกับเทียนสามเล่ม','A seven-year-old by the window breathes slower and slower. Her mother has fallen asleep. Only you and three candles remain.'),[
   O('🕯️ '+L('เฝ้าเธอจนเช้า (มินิเกม)','Watch over her until dawn (minigame)'),'',()=>mgo('sxCandle',{},sc=>{if(sc>=.55){S.karma+=8;y.plk=1;say(L('🕯️ เช้ามาเธอลืมตา และพูดคำแรกว่า "ยายเสื้อขาวบอกให้กินรากบัว" คุณได้เบาะแสแรก','🕯️ At dawn she opens her eyes. Her first words: "The lady in white said eat lotus root." Your first clue'),'epic',true)}else say(L('💨 เทียนเล่มสุดท้ายดับก่อนฟ้าสาง','💨 The last candle dies before daybreak'),'bad',true)}))]);return true}
  if(t.st===2){t.st=9;const ok=rnd()<(y.plk?.75:.35);if(ok){y.pl=0;S.fame+=2200;S.karma+=12;say(L('🌿 รากบัวแช่น้ำค้างจันทร์ร้อยคืนคือยาแก้ ไม่มีสัตว์ตัวไหนต้องตาย แคว้นตั้งชื่อตำรับยาตามชื่อคุณ','🌿 Lotus root steeped in a hundred nights of moon-dew is the cure. Nothing had to die. The province names the remedy after you'),'myth',true)}else{y.pl=0;S.fame+=400;say(L('🦠 โรคหายไปเองตอนปลายฤดูหนาว พร้อมกับเด็กอีกสิบสองคน คุณไม่เคยรู้ว่าทำไม','🦠 The plague fades on its own at winter\'s end, taking twelve more children. You never learn why'),'bad',true)}return true}return false},
 fake(t,g,y){if(t.st===0){t.st=1;t.a=S.age+1;S.fame=Math.round(S.fame*.85);choice('👤 '+L('คนที่ใช้ชื่อคุณ','Someone wearing your name'),L(`ข่าวมาจากสามแคว้นพร้อมกัน มีคนใช้ชื่อและฉายาของคุณปล้นคาราวาน เผายุ้งข้าว และฆ่าคนในตลาด คนที่รอดบอกว่าเขาใช้ท่าวงแหวนแบบเดียวกับคุณ`,`Reports from three provinces at once: someone using your name and title is robbing caravans, burning granaries, killing in the markets. Survivors say he uses your ring skills.`),[
   O('🔎 '+L('ตามล่าตัวปลอม','Hunt down the impostor'),L('เจอปีหน้า','Next year'),()=>say(L('🔎 คุณเริ่มจากหมู่บ้านที่ถูกเผาล่าสุด','🔎 You start at the most recent burned village'),'')),
   O('🙉 '+L('ไม่สนใจ ความจริงจะปรากฏเอง','Ignore it; the truth will out'),L('ชื่อเสียงจะลดอีก','Your name will sink further'),()=>{t.st=9;S.fame=Math.round(S.fame*.8);say(L('🙉 สามปีต่อมาไม่มีใครในแคว้นใต้ยอมขายข้าวให้คุณ','🙉 Three years on, no one in the southern provinces will sell you rice'),'bad')})]);return true}
  if(t.st===1){t.st=9;const ab=y.ab;const who=ab?ab:(g.bst&&g.bst.rival?L('คู่ปรับจากชาติสัตว์ของคุณ','your rival from your beast life'):L('อดีตเพื่อนร่วมทีมที่คุณทิ้งไว้ในป่า','a former teammate you left in the forest'));
   choice('👤 '+L('ใต้หน้ากาก','Beneath the mask'),L(`คุณตามมาถึงค่ายบนหน้าผา คนที่สวมชื่อคุณถอดหน้ากากออกเอง คือ<b>${esc(who)}</b> "${ab?'อาจารย์สอนให้ข้าแข็งแกร่ง แต่ไม่เคยสอนว่าจะอยู่ยังไงตอนถูกทิ้ง':'ข้าแค่อยากรู้ว่าเป็นท่านมันรู้สึกยังไง'}"`,`You track them to a cliff camp. The one wearing your name removes the mask: <b>${esc(who)}</b>. "${ab?'You taught me to be strong. You never taught me how to live after being thrown away.':'I just wanted to know what it feels like to be you.'}"`),[
    O('⚔️ '+L('สู้ให้จบ','End it'),'',()=>duel(who,Math.round(total()*1.05),w=>{if(w){S.fame+=1800;say(L('⚔️ ชื่อของคุณกลับมาเป็นของคุณ แต่คุณไม่เคยเรียกฉายานั้นด้วยความภูมิใจอีกเลย','⚔️ Your name is yours again, but you never wear that title proudly again'),'epic',true)}else{hurt(.3);S.fame=Math.round(S.fame*.7);say(L('🩸 ตัวปลอมเก่งกว่าตัวจริง และตอนนี้ทั้งแคว้นก็รู้','🩸 The copy beats the original, and now the whole province knows'),'bad',true)}})),
    O('🫂 '+L('ยื่นมือให้','Offer your hand'),ab?L('ศิษย์ที่ถูกทิ้งกลับมา','The abandoned student returns'):L('อาจเป็นกับดัก','Could be a trap'),()=>{if(ab||rnd()<.55){S.karma+=12;S.fame+=600;y.ab=null;say(L(`🫂 ${who}ทิ้งหน้ากากลงหน้าผา คุณสองคนเดินกลับไปชดใช้หมู่บ้านที่ถูกเผาทีละแห่ง`,`🫂 ${who} throws the mask off the cliff. Together you walk back to make amends to each burned village`),'myth',true)}else{hurt(.25);S.money=Math.round(S.money*.6);say(L('🗡️ มือที่ยื่นกลับมามีมีดซ่อนอยู่','🗡️ The hand that takes yours holds a hidden knife'),'bad',true)}})]);return true}return false},
 law(t,g,y){const ty=B.spNow(g.sp[0]).t;const TYT={atk:['สายโจมตี','Attack'],def:['สายป้องกัน','Defense'],sup:['สายสนับสนุน','Support'],ctrl:['สายควบคุม','Control'],agi:['สายว่องไว','Agility']}[ty];
  if(t.st===0){t.st=9;choice('📜 '+L('กฎหมายฉบับใหม่','The new law'),L(`สภาทวีปออกกฎหมายด่วน: ผู้ถือดวงจิต<b>${TYT[0]}</b>ทุกคนต้องขึ้นทะเบียน ห้ามเดินทางข้ามแคว้นโดยไม่ได้รับอนุญาต และต้องจ่ายภาษีความปลอดภัยทุกปี เหตุผลคือ "เพื่อความสงบของทวีป"`,`The Council passes an emergency law: every holder of a <b>${TYT[1]}</b> spirit must register, may not cross provinces without a permit, and must pay a yearly security tax. "For the continent's peace."`),[
   O('📝 '+L('ไปขึ้นทะเบียน','Register'),L('ปลอดภัย · ภาษีห้าปี','Safe · five years of tax'),()=>{y.law={y:S.age,n:5};say(L('📝 คุณได้บัตรไม้หนึ่งใบที่ต้องพกติดตัวตลอดเวลา','📝 You receive a wooden card you must carry at all times'),'')}),
   O('🧳 '+L('ย้ายไปแคว้นที่ไม่ใช้กฎนี้','Move to a province that ignores it'),L('เงิน −20% · เริ่มใหม่','Money −20% · start over'),()=>{S.money=Math.round(S.money*.8);S.fame=Math.round(S.fame*.9);say(L('🧳 คุณข้ามด่านตอนตีสี่พร้อมกองเกวียนผัก','🧳 You cross the checkpoint at four in the morning with a cart of vegetables'),'')}),
   O('✊ '+L('ต่อต้าน','Resist'),L('ดวลกับหน่วยบังคับใช้ · ชนะแล้วกฎถูกยกเลิก','Duel the enforcers · win and the law falls'),()=>duel(L('หัวหน้าหน่วยบังคับใช้กฎหมาย','the enforcement captain'),Math.round(total()*1.15),w=>{if(w){S.fame+=2000;S.karma+=6;say(L(`✊ ผู้ถือดวงจิต${TYT[0]}จากสิบสองแคว้นมายืนหลังคุณ สภายกเลิกกฎในปีถัดมา`,`✊ ${TYT[1]} spirit holders from twelve provinces stand behind you. The Council repeals the law the next year`),'myth',true)}else{hurt(.3);S.money=Math.round(S.money*.6);y.law={y:S.age,n:5,x:2};say(L('⛓️ คุณถูกขังสองปีและถูกปรับภาษีสองเท่า','⛓️ Two years in a cell and double tax'),'bad',true)}}))]);return true}return false}};
function lawTax(){const y=Y();const l=y.law;if(!l)return;if(S.age-l.y>=l.n){y.law=null;say(L('📜 กฎหมายขึ้นทะเบียนหมดอายุแล้ว','📜 The registration law has expired'),'good');return}const f=Math.round(Math.max(100,S.money*.05*(l.x||1)));S.money=Math.max(0,S.money-f)}
// =================== 🎓 ลูกศิษย์ ===================
const NAT={brave:['🔥','กล้าบ้าบิ่น','Reckless'],timid:['🌱','ขี้กลัว','Timid'],proud:['👑','หยิ่ง','Proud'],kind:['🤍','ใจดีเกินไป','Too kind']};
const SEC=['none','none','none','hunter','spy','beast'];
const stu=()=>Y().st.filter(s=>s.st==='on');
function stuOffer(){const g=G(),y=Y();if(g.lv<40||S.age<22||stu().length>=3||rnd()>.14)return false;const n=nmR(),p=spRand(),nat=pick(Object.keys(NAT));
 choice('🎓 '+L('มีคนมาขอเป็นศิษย์','Someone asks to be your student'),L(`เด็กอายุสิบห้าชื่อ${esc(n)}คุกเข่าอยู่หน้าบ้านคุณมาสามวัน ดวงจิตของเขาคือ${spIc(p[0])} นิสัย${NAT[nat][0]} ${NAT[nat][1]}`,`A fifteen-year-old named ${esc(n)} has knelt at your door for three days. Spirit: ${spIc(p[0])}. Temperament: ${NAT[nat][0]} ${NAT[nat][2]}.`),[
  O('🙇 '+L('รับเป็นศิษย์','Take them in'),L('ทุกคนมีเรื่องที่ไม่ได้เล่า','Everyone has something they haven\'t said'),()=>{y.st.push({n,id:p[0],ty:p[3],nat,sec:pick(SEC),lv:Ri(8,14),b:50,k:0,m:0,a:S.age,st:'on',rv:0});say(L(`🎓 ${esc(n)}โขกหัวสามครั้งจนหน้าผากแดง`,`🎓 ${esc(n)} bows three times until their forehead is red`),'epic')}),
  O('🚪 '+L('ไม่รับ','Turn them away'),'',()=>say(L('🚪 เช้าวันที่สี่หน้าบ้านว่างเปล่า','🚪 On the fourth morning, the doorstep is empty'),''))]);return true}
function stuEv(){const g=G(),y=Y();const A=stu();A.forEach(s=>{s.lv=Math.min(100,s.lv+Ri(1,3))});if(!A.length||rnd()>.32)return false;const s=pick(A);
 if(!s.rv&&s.sec!=='none'&&S.age-s.a>=3&&rnd()<.55){s.rv=1;return stuSecret(s,g,y)}
 if(S.age-s.a>=8||s.lv>=g.lv-3)return stuEnd(s,g,y);
 const Qs=[['ถ้าสัตว์ร้องขอชีวิต เราควรทำยังไง','If a beast begs for its life, what should we do?'],['ทำไมเราต้องแข็งแกร่ง','Why must we be strong?'],['ถ้าเพื่อนร่วมทีมหักหลัง ควรให้อภัยไหม','If a teammate betrays us, should we forgive?']];const q=pick(Qs);
 choice(`🎓 ${esc(s.n)} ${L('ถาม','asks')}`,L(`"${q[0]}"<br><span class="tag2">${NAT[s.nat][0]} ${NAT[s.nat][1]} · ระดับจิต ${s.lv} · ความผูกพัน ${s.b}</span>`,`"${q[1]}"<br><span class="tag2">${NAT[s.nat][0]} ${NAT[s.nat][2]} · spirit level ${s.lv} · bond ${s.b}</span>`),[
  O('🗡️ '+L('"ลงมือก่อนเสมอ"','"Always strike first"'),L('ศิษย์จะโหดขึ้น','They grow harder'),()=>{s.k++;s.lv+=1;say(L(`🗡️ ${esc(s.n)}พยักหน้าช้าๆ เหมือนจดคำนี้ไว้ในใจ`,`🗡️ ${esc(s.n)} nods slowly, as if writing it on their heart`),'')}),
  O('🕊️ '+L('"ไว้ชีวิตเมื่อทำได้"','"Spare what you can"'),L('ศิษย์จะอ่อนโยนขึ้น','They grow gentler'),()=>{s.m++;s.b+=3;say(L(`🕊️ ${esc(s.n)}ยิ้มแบบที่ไม่ได้ยิ้มมานาน`,`🕊️ ${esc(s.n)} smiles in a way they haven't for a long time`),'')}),
  O('🥢 '+L('ให้ซ้อมท่าแล้วจับผิด (มินิเกม)','Drill them and catch their mistakes (minigame)'),L('สำเร็จ = เก่งขึ้น สนิทขึ้น','Success = stronger and closer'),()=>mgo('sxTeach',{},sc=>{if(sc>=.6){s.lv+=3;s.b+=8;say(L(`🥢 ${esc(s.n)}แก้ท่าได้ครบในบ่ายเดียว`,`🥢 ${esc(s.n)} fixes every move in a single afternoon`),'good')}else{s.b-=3;say(L(`🥢 คุณจับผิดไม่ทัน ${esc(s.n)}ติดนิสัยผิดไปอีกหลายปี`,`🥢 You miss the mistakes, and ${esc(s.n)} carries bad habits for years`),'')}}))]);return true}
function stuSecret(s,g,y){const n=esc(s.n);
 if(s.sec==='hunter'){choice('🎓 '+L('ความลับของ','The secret of ')+n,L(`${n}พบบันทึกการล่าของคุณ วงแหวนวงหนึ่งของคุณได้มาในวันเดียวกับที่พ่อของเขาหายไปในป่า พ่อของเขาคือนักล่าที่ล่าตัวเดียวกันกับคุณ และไม่กลับมา`,`${n} finds your hunting journal. One of your rings was taken the same day their father vanished in the forest. Their father was hunting the same beast, and never came back.`),[
   O('🗣️ '+L('เล่าทุกอย่างที่เกิดขึ้นวันนั้น','Tell them everything about that day'),L('เดิมพันกับความไว้ใจ','Bet on trust'),()=>{if(rnd()<.5+s.b/200){s.b+=15;say(L(`🗣️ ${n}ฟังจนจบแล้วร้องไห้ "อย่างน้อยพ่อก็ไม่ได้ตายคนเดียว"`,`🗣️ ${n} listens to the end and weeps. "At least he didn't die alone."`),'epic',true)}else{s.st='gone';y.ab=s.n;say(L(`🚪 ${n}เก็บของออกจากบ้านคุณคืนนั้น ไม่ทิ้งแม้แต่จดหมาย`,`🚪 ${n} packs and leaves that night without a note`),'bad',true)}}),
   O('🤐 '+L('บอกว่าไม่รู้เรื่อง','Say you know nothing'),L('อาจถูกจับได้ทีหลัง','You may be found out later'),()=>{s.tr=1;say(L(`🤐 ${n}เชื่อ หรือทำเป็นเชื่อ`,`🤐 ${n} believes you, or pretends to`),'')})]);return true}
 if(s.sec==='spy'){choice('🎓 '+n+L(' คือสายลับ',' is a spy'),L(`คุณจับได้ว่า${n}ลอกบันทึกวิชาวงแหวนของคุณส่งให้ลัทธิกลืนดวงจิตทุกเดือน เขาไม่หนี "พวกเขาจับน้องสาวข้าไว้"`,`You catch ${n} copying your ring techniques for the Soul-Devouring Cult every month. They don't run. "They have my little sister."`),[
   O('🎭 '+L('ให้ส่งข้อมูลปลอมต่อไป','Have them keep sending false notes'),L('สายลับสองหน้า','A double agent'),()=>{s.dbl=1;s.b+=10;say(L(`🎭 สามเดือนต่อมาลัทธิเสียคนไปครึ่งรังเพราะวิชาที่คุณแต่งขึ้น`,`🎭 Three months later the cult loses half a nest to a technique you invented`),'epic',true)}),
   O('🚪 '+L('ไล่ออก','Throw them out'),'',()=>{s.st='gone';y.ab=s.n;say(L(`🚪 ${n}ไม่เถียงสักคำ`,`🚪 ${n} doesn't argue`),'')}),
   O('⚔️ '+L('บุกรังลัทธิไปพาน้องเขาออกมา','Raid the cult nest and rescue the sister'),L('ดวล','Duel'),()=>duel(L('ผู้คุมรังลัทธิ','the cult nest warden'),Math.round(total()*1.1),w=>{if(w){s.b=Math.min(100,s.b+30);s.sec='none';S.karma+=10;say(L(`⚔️ เด็กหญิงตัวเล็กวิ่งไปกอดขา${n} ตั้งแต่วันนั้น${n}ไม่เคยห่างจากคุณอีก`,`⚔️ A little girl runs to hug ${n}'s legs. From that day ${n} never leaves your side`),'myth',true)}else{hurt(.25);say(L('🩸 คุณถอยออกมามือเปล่า','🩸 You retreat empty-handed'),'bad')}}))]);return true}
 if(s.sec==='beast'){choice('🎓 '+n+L(' ไม่ใช่คน',' is not human'),L(`คืนพระจันทร์เต็มดวง คุณเห็นเงาของ${n}บนผนังเป็นรูปสัตว์สี่ขา ${n}เป็นสัตว์วิญญาณที่แปลงร่าง และรู้ว่าคุณเห็นแล้ว`,`Under the full moon you see ${n}'s shadow on the wall: four-legged. ${n} is a transformed spirit beast, and knows you saw.`),[
   O('🛡️ '+L('เก็บความลับให้','Keep the secret'),L('ศิษย์จะภักดีถึงที่สุด','They will be loyal to the end'),()=>{s.b=Math.min(100,s.b+20);s.bp=1;say(L(`🛡️ ${n}ไม่พูดอะไร แต่เช้ามามีสมุนไพรหายากวางอยู่หน้าห้องคุณทุกวัน`,`🛡️ ${n} says nothing, but every morning rare herbs appear outside your door`),'epic',true)}),
   O('📜 '+L('แจ้งสภา','Report to the Council'),L('ได้เงินรางวัล','A bounty'),()=>{s.st='gone';S.money+=Math.round(Math.max(3000,S.money*.3));S.karma-=15;say(L(`📜 กองล่ามาตอนรุ่งสาง ${n}มองคุณครั้งเดียวก่อนถูกพาตัวไป`,`📜 The hunters come at dawn. ${n} looks at you once before being taken`),'bad',true)})]);return true}
 return false}
function stuEnd(s,g,y){const n=esc(s.n);s.st='done';
 if(s.tr||(s.sec==='spy'&&!s.dbl)||(s.nat==='proud'&&s.b<30)){s.st='traitor';choice('🗡️ '+n+L(' หันดาบกลับมา',' turns the blade'),L(`${s.tr?`${n}รู้ความจริงเรื่องพ่อเมื่อปีก่อน และรอมาตลอด`:`${n}โตพอที่จะไม่ต้องการอาจารย์อีกแล้ว`} คืนนี้เขายืนอยู่ปลายเตียงคุณพร้อมท่าวงแหวนที่คุณสอนเอง`,`${s.tr?`${n} learned the truth about their father last year and has been waiting`:`${n} has grown past needing a teacher`}. Tonight they stand at the foot of your bed with a ring skill you taught them.`),[
   O('⚔️ '+L('สู้','Fight'),'',()=>duel(s.n,Math.round(total()*.95),w=>{if(w){S.karma-=4;say(L(`⚔️ ${n}ล้มลงด้วยท่าที่คุณยังไม่ได้สอน`,`⚔️ ${n} falls to the one move you never taught`),'epic',true)}else{hurt(.3);S.money=Math.round(S.money*.7);say(L(`🩸 ${n}เอาบันทึกวิชาทั้งหมดของคุณไป`,`🩸 ${n} takes every technique you ever wrote down`),'bad',true)}}))]);return true}
 if(s.b>=75&&rnd()<.4){const ring=s.bp&&g.rings.length<9;S.karma+=5;
  if(ring){const t=Math.min(4,Math.max(1,(g.rings[g.rings.length-1]||{t:2}).t));g.rings.push({t,b:s.n,sk:L('ศิษย์ที่ไม่เคยจากไป','The Student Who Never Left'),ty:s.ty,md:'loyal',ya:S.age});Y()._rc=g.rings.length;g.lv=Math.min(100,g.lv+1);S.power+=pctPow(.18);say(L(`💍 ${n}รับดาบแทนคุณในศึกที่ไม่มีใครจำชื่อ ร่างที่แท้จริงของ${n}สลายเป็นวงแหวน${TIC[t]} แล้วจมเข้าอกคุณ วงแหวนวงนี้ไม่เคยขัดคำสั่งคุณเลยสักครั้ง`,`💍 ${n} takes a blade meant for you in a battle no one remembers. Their true form dissolves into a ${TIC[t]} ring and sinks into your chest. It never once disobeys you`),'myth',true)}
  else{S.power+=pctPow(.08);bond(g,10);say(L(`🪦 ${n}รับดาบแทนคุณ คุณฝังเขาไว้ใต้ต้นไม้ที่ใช้ซ้อมท่าทุกเช้า และไม่เคยรับศิษย์คนไหนนั่งตรงนั้นอีก`,`🪦 ${n} takes the blade for you. You bury them under the tree where you trained each morning, and never let another student sit there`),'myth',true)}return true}
 if(s.k>s.m+1){S.fame+=900;S.karma-=5;say(L(`🏹 ${n}ออกไปเป็นนักล่าที่โหดที่สุดในทวีป ทุกครั้งที่มีคนถามว่าเรียนจากใคร เขาตอบชื่อคุณ`,`🏹 ${n} becomes the most ruthless hunter on the continent. Whenever asked who trained them, they say your name`),'epic',true);return false}
 if(s.m>s.k+1&&s.nat==='timid'){S.karma+=3;say(L(`💧 ${n}ไว้ชีวิตมือสังหารคนหนึ่งตามที่คุณสอน และคนนั้นกลับมาในคืนต่อมา`,`💧 ${n} spared an assassin, as you taught. The assassin came back the next night`),'bad',true);return false}
 S.fame+=1500;S.power+=pctPow(.05);say(L(`🌟 ${n}เปิดสำนักของตัวเอง ป้ายหน้าสำนักสลักชื่อคุณไว้ใต้ชื่อเขา`,`🌟 ${n} opens their own school. The sign above the gate carries your name beneath theirs`),'myth',true);return false}

// =================== 🌐 ป่าทั้งเว็บ ===================
const wk=()=>{try{return typeof weekN==='function'?weekN():Math.floor(Date.now()/6048e5)}catch(e){return 0}};
const canNet=()=>{try{return typeof api==='function'&&typeof onlineOK!=='undefined'&&onlineOK}catch(e){return false}};
const clean=s=>String(s||'').replace(/[<>"'&]/g,'').trim().slice(0,40);
function webHunt(r){try{const k=clean(r.b);if(!k)return;const d=LS.get('murim_svhl',{})||{};const w=wk();if(!d[w])d[w]={};d[w][k]=(d[w][k]||0)+1;Object.keys(d).forEach(x=>{if(+x<w-2)delete d[x]});LS.set('murim_svhl',d);if(canNet())api('svh',{w,k}).catch(()=>{})}catch(e){}}
function webLoad(){const y=Y();if(y.web)return;y.web={t:Date.now()};if(canNet())api('svg',{w:wk()-1}).then(j=>{if(j&&typeof j==='object')Object.assign(y.web,j,{on:1})}).catch(()=>{})}
function webHot(){try{const y=Y();if(y.web&&y.web.top&&y.web.top[0]&&y.web.top[0][1]>=5)return y.web.top[0][0];const d=LS.get('murim_svhl',{})||{};const c=d[wk()-1];if(!c)return null;const t=Object.entries(c).sort((a,b)=>b[1]-a[1])[0];return t&&t[1]>=3?t[0]:null}catch(e){return null}}
const BOSS=[['พยัคฆ์ทองคำกลืนตะวัน','Sun-Devouring Golden Tiger'],['ราชันวาฬเงาใต้ทะเลสาบ','Shadow Whale King of the Lake'],['มังกรหินหลับพันปี','Thousand-Year Sleeping Stone Dragon'],['หงส์ดำร้องไห้','Weeping Black Phoenix'],['เต่าทวีปแบกเมือง','Continental Turtle Who Carries a City'],['วานรเก้าเศียร','Nine-Headed Ape']];
const bossOf=w=>BOSS[((w%BOSS.length)+BOSS.length)%BOSS.length];
function webEv(){const g=G(),y=Y();if(!g.aw||g.aw===2||S.age<12)return false;const w=wk();
 // ราชาสัตว์ประจำสัปดาห์ (เครื่องละครั้งต่อสัปดาห์)
 if(LS.get('murim_svbw',0)!==w&&rnd()<.3){LS.set('murim_svbw',w);const b=bossOf(w);const nb=L(b[0],b[1]);const tot=y.web&&y.web.on?`<br><span class="tag2">🌐 ${L('สัปดาห์ก่อนผู้เล่นทั้งเว็บฟาดราชาสัตว์ไปรวม','Last week players across the site dealt the beast king')} ${fmt(y.web.bt||0)}${y.web.bz&&y.web.bz.length?` · ${L('แรงที่สุด','hardest hitters')}: ${y.web.bz.map(z=>esc(z[0])).join(', ')}`:''}</span>`:'';
  choice('👑 '+L('ราชาสัตว์ประจำสัปดาห์','Beast King of the Week'),L(`<b>${nb}</b> อายุล้านปี ออกจากป่าต้องห้ามมาเดินกลางทวีป ผู้ฝึกจิตจากทุกแคว้นแห่กันไปฟาดคนละครั้ง ไม่มีใครฆ่ามันได้คนเดียว และมันจำชื่อคนที่ฟาดแรงที่สุดได้ทุกคน${tot}`,`<b>${nb}</b>, a million years old, walks out of the Forbidden Forest into the heart of the continent. Spirit masters from every province strike it once each. No one can kill it alone, and it remembers the names of those who hit hardest.${tot}`),[
   O('⚡ '+L('เข้าไปฟาดหนึ่งครั้ง (มินิเกม)','Go strike it once (minigame)'),L('หลบเพลิงของมัน · ยิ่งแรงยิ่งถูกจำ','Dodge its fire · the harder you hit, the more it remembers'),()=>mgo('sxStorm',{title:nb},sc=>{const d=Math.round(8+sc*50+g.rings.length*5);S.fame+=d*12;S.power+=pctPow(.01+sc*.03);try{LS.set('murim_svbh',{w,d,n:b,s:S.seed})}catch(e){}if(canNet())api('svb',{w,d,nm:clean(S.name).slice(0,20)}).catch(()=>{});say(L(`👑 คุณฟาด${nb}ไป ${d} แต้ม มันหันมามองคุณหนึ่งวินาทีเต็ม`,`👑 You strike ${nb} for ${d}. It turns and looks at you for one full second`),'epic',true)})),
   O('👀 '+L('ยืนดูจากไกลๆ','Watch from afar'),'',()=>say(L('👀 คุณเห็นคนสิบสองคนกระเด็นออกมาในครั้งเดียว','👀 You see twelve people thrown back in a single sweep'),''))]);return true}
 // ราชาสัตว์ที่ถูกฟาดแรงกลับมาในชาติถัดไป
 const bh=LS.get('murim_svbh',null);if(bh&&bh.d>=35&&bh.s!==S.seed&&S.age>=18&&S.age<=45&&rnd()<.12){LS.set('murim_svbh',null);const nb=L(bh.n[0],bh.n[1]);
  choice('👁️ '+L('คนแปลกหน้าที่มีกลิ่นของราชาสัตว์','A stranger who smells of the Beast King'),L(`ชายตัวสูงผิดปกติขวางทางคุณ ตาสีทองเหมือนสัตว์ "ชาติก่อนเจ้าฟาดข้า ${bh.d} ครั้งในใจข้า ข้านับไว้ทุกครั้ง" เขาคือ${nb}ที่เกิดใหม่เป็นคน`,`An unnaturally tall man blocks your way, eyes gold like a beast's. "In your last life you struck me ${bh.d} times in my heart. I counted each one." He is ${nb}, reborn human.`),[
   O('⚔️ '+L('สู้','Fight'),'',()=>duel(nb,Math.round(total()*1.2),w=>{if(w){S.fame+=2500;S.power+=pctPow(.06);say(L('⚔️ เขาหัวเราะตอนล้ม "ชาตินี้ก็ยังแรงเหมือนเดิม"','⚔️ He laughs as he falls. "Still hits as hard as ever."'),'myth',true)}else{hurt(.3);say(L('🩸 เขาไม่ฆ่าคุณ แค่ฟาดคืนให้ครบตามที่นับไว้','🩸 He doesn\'t kill you, just returns every blow he counted'),'bad',true)}})),
   O('🍶 '+L('ชวนนั่งคุย','Invite him to sit and talk'),L('อาจได้เพื่อนแปลกๆ','Maybe an odd friend'),()=>{if(rnd()<.6){S.karma+=6;S.power+=pctPow(.04);say(L('🍶 เขาเล่าว่าการเป็นราชาสัตว์ล้านปีน่าเบื่อแค่ไหน และสอนวิธีหายใจแบบสัตว์ล้านปีให้คุณ','🍶 He tells you how boring a million years as a beast king was, and teaches you to breathe like one'),'epic',true)}else{hurt(.2);say(L('🍶 เขาเทเหล้าราดหัวคุณแล้วเดินจากไป','🍶 He pours the wine over your head and walks away'),'bad')}})]);return true}
 // ข่าวลือรอยสัตว์
 if(rnd()<.09){const R0=(y.web&&Array.isArray(y.web.rum)?y.web.rum:[]).filter(r=>r&&r.k).slice(0,3);while(R0.length<2){const t=Ri(1,4);const b=pick(B.BEAST[Math.min(3,t)]);R0.push({k:b[0],t,r:rnd()<.6?1:0,npc:1})}
  const last=g.rings[g.rings.length-1];
  choice('📰 '+L('กระดานข่าวลือรอยสัตว์','The trail-rumor board'),L(`ที่โรงเตี๊ยมหน้าป่ามีกระดานไม้เต็มไปด้วยกระดาษ บางแผ่นเขียนจากคนที่เห็นจริง บางแผ่นเขียนโดยคนที่อยากให้คู่แข่งเดินเข้ากับดัก${y.web&&y.web.on?' · <span class="tag2">🌐 บางแผ่นมาจากผู้เล่นจริง</span>':''}`,`The inn by the forest has a board covered in notes. Some are written by people who truly saw something. Some by people who want their rivals to walk into traps.${y.web&&y.web.on?' · <span class="tag2">🌐 some come from real players</span>':''}`),[
   ...R0.map(r=>O(`🍂 ${esc(r.k)} · ${tN(r.t)}`,L('ตามรอยนี้ในการล่าครั้งหน้า','Follow it on your next hunt'),()=>{y.rum={k:r.k,t:Math.min(4,r.t|0),real:!!r.r,age:S.age};say(L(`📰 คุณฉีกกระดาษแผ่นนั้นเก็บใส่อกเสื้อ`,`📰 You tear the note down and tuck it in your robe`),'')})),
   ...(last?[O('✍️ '+L('ติดข่าวจริงจากการล่าครั้งล่าสุด','Post a true rumor from your last hunt'),L('ช่วยคนอื่น · กรรมดี','Help others · good karma'),()=>{S.karma+=2;if(canNet())api('svr',{w:wk(),k:clean(last.b),t:last.t|0,r:1}).catch(()=>{});say(L('✍️ คุณวาดแผนที่เล็กๆ ไว้มุมกระดาษด้วย','✍️ You even draw a tiny map in the corner'),'good')})]:[]),
   O('🪤 '+L('ติดข่าวหลอก ให้คู่แข่งหลงทาง','Post a fake rumor to mislead rivals'),L('กรรม −','Karma −'),()=>{S.karma-=3;const b=pick(B.BEAST[Ri(2,3)]);if(canNet())api('svr',{w:wk(),k:clean(b[0]),t:Ri(3,4),r:0}).catch(()=>{});say(L('🪤 คุณเขียนด้วยลายมือที่ไม่ใช่ของตัวเอง','🪤 You write it in a hand that isn\'t yours'),'')})]);return true}
 return false}
// ต่อกระดูกวิญญาณ
function boneEv(){const g=G();if(!g.bone||!Object.keys(g.bone).length||rnd()>.05)return false;choice('🦴 '+L('ช่างต่อกระดูกพเนจร','A wandering bone-setter'),L('หญิงชราตาบอดเดินผ่านหมู่บ้าน ว่ากันว่าเธอต่อกระดูกวิญญาณให้เข้ากับร่างได้แนบสนิทกว่าเดิม ถ้าต่อผิด กระดูกจะพาความทรงจำของสัตว์เจ้าของเดิมมาด้วย','A blind old woman passes through the village. They say she can set a spirit bone so it fits your body better than before. Set it wrong, and the bone brings its old owner\'s memories along.'),[
 O('🦴 '+L('ให้เธอสอนแล้วต่อเอง (มินิเกม)','Let her guide you as you set it (minigame)'),'',()=>mgo('sxBone',{},sc=>{if(sc>=.65){S.power+=pctPow(.06);S.maxHp+=Math.round(S.maxHp*.05);say(L('🦴 กระดูกเข้าที่พร้อมเสียงคลิกเบาๆ เหมือนประตูที่ปิดสนิท','🦴 The bone settles with a soft click, like a door closing true'),'epic')}else{const r=rnd();if(r<.33){g.lv=Math.max(1,g.lv-1);say(L('🦴 กระดูกต่อเบี้ยว ระดับจิตลด 1','🦴 The bone sets crooked. Spirit level −1'),'bad')}else if(r<.66){bond(g,-5);say(L('🦴 คืนนั้นคุณฝันว่าเป็นสัตว์ตัวนั้น ดวงจิตของคุณหึง','🦴 That night you dream you are that beast. Your spirit is jealous'),'')}else{S.karma+=2;say(L('🦴 กระดูกต่อกลับด้าน คุณได้ยินเสียงนกที่ไม่มีใครได้ยินไปหนึ่งปี','🦴 It sets backwards. For a year you hear birds no one else can'),'')}}})),
 O('🙏 '+L('ขอบคุณแล้วปฏิเสธ','Thank her and decline'),'',()=>{})]);return true}
// =================== ⚖️ ผู้กำกับเรื่อง: ชีวิตละ 1 เรื่องหลัก ===================
const FAM={arc:/^(📜 ลัทธิกลืนดวงจิต|⚔️ สงครามระหว่างแคว้น|🐾 สัตว์วิญญาณทวงคืนป่า|👑 ทายาทราชสำนักลับ|🐍 สายมืด)/,vil:/^(⚖️ วิหารผู้ตัดสิน|🌀 ผู้ครองดวงจิตที่เสียสติ|👁️ ทรราชวิญญาณ)/,svo:/หอตุลาการ/,city:/^🩸 เมืองสังหาร/};
const FAMN={arc:['เรื่องใหญ่ของแคว้น','a province-shaking saga'],vil:['ศัตรูหลายตอน','a recurring villain'],svo:['หอตุลาการวิญญาณ','the Spirit Tribunal'],city:['เมืองสังหาร','the City of Slaughter']};
{const _ch=choice;const nf=function(title){try{if(on()&&typeof title==='string'){const t=title.replace(/<[^>]+>/g,'').trim();const f=Object.keys(FAM).find(k=>FAM[k].test(t));if(f){const y=Y();if(!y.fam||S.age-y.famY>=12){y.fam=f;y.famY=S.age}else if(y.fam===f)y.famY=S.age;else{if(!y.ev['rm_'+f]){y.ev['rm_'+f]=1;say(`📰 ${L('ข่าวลือจากแคว้นอื่น','News from another province')}: ${L(FAMN[f][0],FAMN[f][1])} ${L('กำลังเกิดขึ้นกับคนอื่น ชีวิตนี้คุณมีเรื่องของตัวเองอยู่แล้ว','is unfolding around someone else. You have your own story this life')}`,'')}return}}}}catch(e){}return _ch.apply(this,arguments)};for(const k in _ch)nf[k]=_ch[k];choice=nf}
// =================== 🪙 เหรียญวิญญาณ (แทนคำว่าตำลึงในทวีปนี้) ===================
const CUR=s=>typeof s==='string'&&s.indexOf('ตำลึง')>=0?s.replace(/ตำลึง/g,'เหรียญวิญญาณ'):s;
{const _l=log;log=function(t){try{if(on())arguments[0]=CUR(t)}catch(e){}return _l.apply(this,arguments)}}
{const _ch=choice;const nf=function(title,text,opts){try{if(on()){arguments[0]=CUR(title);arguments[1]=CUR(text);if(Array.isArray(opts))opts.forEach(o=>{if(o){o.t=CUR(o.t);o.s=CUR(o.s)}})}}catch(e){}return _ch.apply(this,arguments)};for(const k in _ch)nf[k]=_ch[k];choice=nf}
{const _m=modal;modal=function(h){try{if(on())arguments[0]=CUR(h)}catch(e){}return _m.apply(this,arguments)}}
// =================== รายปี ===================
{const _py=passYear;passYear=function(){const a0=S&&S.age;const r=_py.apply(this,arguments);try{if(!on()||!S||S.age===a0)return r;const g=G();if(!g||g.aw!==1)return r;if(g.bst&&g.bst.pro===1)return r;
 const y=Y();seaYear();lawTax();if(y.pl>0){y.pl--;g.lv=Math.max(1,g.lv-1);say(L('🦠 ดวงจิตของคุณหรี่ลงอีก (ระดับจิต −1)','🦠 Your spirit dims further (spirit level −1)'),'bad')}
 webLoad();twPlan();
 setTimeout(()=>{try{if(!on()||!free())return;twStep()||ringEv()||stuOffer()||stuEv()||webEv()||boneEv()}catch(e){console.error('sx2 year',e)}},2400)}catch(e){console.error('sx2 py',e)}return r}}
// =================== หน้าดวงจิต: ปุ่มวงแหวน/ฤดู/ศิษย์/ป่าทั้งเว็บ ===================
window.svyPanel=function(){if(!on())return;const g=G(),y=Y();
 const rg=(g.rings||[]).map((r,i)=>`<div class="item" style="padding:5px 9px;display:flex;gap:8px;align-items:center"><span>${TIC[r.t|0]}</span><span style="flex:1"><b>${i+1}. ${esc(r.b||'')}</b> <span class="tag2">${esc(r.sk||'')}</span></span><span class="tag2">${mdN(r.md||'calm')}</span></div>`).join('')||`<div class="item tag2">${L('ยังไม่มีวงแหวน','No rings yet')}</div>`;
 const se=[0,1,2,3].map(d=>{const s=SEA[(S.age+d+y.so)%4];return`<span class="tag2" style="display:inline-block;padding:2px 7px;border:1px solid #8886;border-radius:99px;margin:2px">${d?`+${d}`:L('ปีนี้','now')} ${s[0]} ${L(s[1],s[2])}</span>`}).join('');
 const sp=y.sp&&y.sp.y>=S.age&&(y.sp.ann||y.sp.y===S.age)?`<div class="tag2">${SPY[y.sp.k][0]} ${L('อายุ','Age')} ${y.sp.y}: ${L(SPY[y.sp.k][1],SPY[y.sp.k][2])}</div>`:'';
 const st=y.st.length?y.st.map(s=>`<div class="item" style="padding:5px 9px">${NAT[s.nat][0]} <b>${esc(s.n)}</b> <span class="tag2">${spIc(s.id)} · ${L('ระดับ','lv')} ${s.lv} · ${L('ผูกพัน','bond')} ${s.b} · ${s.st==='on'?L('กำลังเรียน','training'):s.st==='traitor'?L('ทรยศ','betrayed you'):s.st==='gone'?L('จากไป','gone'):L('จบการศึกษา','graduated')}${s.rv&&s.sec!=='none'?' · 🔓':''}</span></div>`).join(''):`<div class="item tag2">${L('ยังไม่มีศิษย์ · ระดับจิต 40 และอายุ 22 ขึ้นไปจะมีคนมาขอฝากตัว','No students yet · they come once you reach spirit level 40 and age 22')}</div>`;
 const hot=webHot(),b=bossOf(wk());const web=`<div class="item"><b>🌐 ${L('ป่าทั้งเว็บ','The shared forest')}</b> ${y.web&&y.web.on?'':`<span class="tag2">(${L('ออฟไลน์ ใช้ข้อมูลในเครื่อง','offline, using local data')})</span>`}<br><span class="tag2">👑 ${L('ราชาสัตว์สัปดาห์นี้','This week\'s Beast King')}: ${L(b[0],b[1])}${hot?` · 🔥 ${L('ถูกล่ามากสัปดาห์ก่อน (ดุขึ้น)','Over-hunted last week (angrier)')}: ${esc(hot)}`:''}</span></div>`;
 const fm=y.fam?`<div class="item tag2">⚖️ ${L('เรื่องหลักของชีวิตนี้','This life\'s main story')}: <b>${L(FAMN[y.fam][0],FAMN[y.fam][1])}</b></div>`:'';
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>💍 ${L('วงแหวน · ฤดู · ศิษย์','Rings · Seasons · Students')}</h3><h4>💍 ${L('นิสัยวงแหวน','Ring temperaments')}</h4>${rg}<p class="tag2">${L('แค้น = อาจขัดคำสั่งตอนดวล · ภักดี = อาจช่วยเอง · เศร้า = อาจพาไปหาลูกของมัน · ว่างเปล่า = ซื้อมา ไม่มีนิสัย','Vengeful may disobey in duels · Loyal may help on its own · Grieving may lead you to its young · Hollow = bought, no will of its own')}</p><h4>🌦️ ${L('ฤดูการล่า','Hunting seasons')}</h4>${se}${sp}<h4>🎓 ${L('ศิษย์','Students')}</h4>${st}${web}${fm}`,'svy')};
{const _os=window.openSoul;window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;const m=$('modal');if(m&&!m.querySelector('.svyB')&&G().aw===1){const b=document.createElement('button');b.className='gbtn svyB';b.style.cssText='width:100%;margin-top:6px';b.textContent='💍 '+L('วงแหวน · ฤดู · ศิษย์ · ป่าทั้งเว็บ','Rings · Seasons · Students · Shared Forest');b.onclick=()=>svyPanel();m.appendChild(b)}}catch(e){}return r}}
try{SYS_GUIDE.push({s:'world',ic:'💍',t:'วงแหวนมีชีวิต · ฤดู · ศิษย์ (จิตวิญญาณยุทธ์)',d:'วงแหวนมีนิสัยตามวิธีที่ได้มา (แค้น/ภักดี/เศร้า/ว่างเปล่า) · ฤดูการล่า 4 ฤดู + ปีพิเศษ · ชะตาพลิกชีวิตละ 0–2 เรื่อง · รับศิษย์ได้ 3 คน แต่ละคนมีความลับ · ราชาสัตว์ประจำสัปดาห์ที่ผู้เล่นทั้งเว็บช่วยกันฟาด · กระดานข่าวลือรอยสัตว์ · ชีวิตละ 1 เรื่องหลัก'})}catch(e){}
window._sx2={Y,ringEv,stuOffer,stuEv,webEv,boneEv,twPlan,twStep,TW,seaYear,sea,svyPanel,webHot};
})()}catch(e){console.error('soulx2',e)}

wReady('soul');
