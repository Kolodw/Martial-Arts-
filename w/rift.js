// ============================================================
// /w/rift.js — 🌀 ระบบรอยแยก (เฟส 1) · โหลดหลังเปิดเกม (BLOCK 123 ใน app.js)
// กติกากลาง: ข้ามได้ = ความทรงจำ ชื่อ นิสัย ความรู้ · ข้ามไม่ได้ = เงิน ฐานะ สำนัก ครอบครัว · พลังถูกแปลงตามกฎโลกปลายทาง
// ข้าม 3 แบบ: 🌀 ทั้งตัว · 👤 วิญญาณเข้าร่าง · 🚪 คนจากโลกอื่นมาหา (ไม่เปลี่ยนโลก)
// คู่โลก: ยุคปัจจุบัน→ยุทธภพ · ซอมบี้→ยุทธภพ · ฮันเตอร์→ทวีปจิตวิญญาณยุทธ์ · ยุทธภพ→ยุคปัจจุบัน (รอยแยกเดิม) · คนจากปี 2054→ยุคปัจจุบัน · คนยุคปัจจุบัน→ยุทธภพ
// กลไก: 🧭 ความแปลกถิ่น · ⚓ สมอสองโลก · 🚪 ประตูเปิดอีกครั้ง (กลับ/อยู่/พาคนข้ามไปด้วย) · ตอนจบ กลับบ้าน/อยู่ต่อจนตาย
// สถานะอยู่ที่ S.rift (ติดตัวข้ามเครื่องยนต์ยุทธภพ ↔ ยุคปัจจุบัน) · สมุด LS murim_rift
// ============================================================
(()=>{
const RATE=()=>window._riftRate||.015;
const O=(t,s,f)=>({t,s,f});
const pk=a=>a[Math.floor(Math.random()*a.length)],RN=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const free=()=>!(choice._cur||(typeof modalOpen!=='undefined'&&modalOpen));
const ask=(title,text,opts)=>{const me=S;let n=0;const go=()=>{if(S!==me||!S||!S.alive)return;if(!free()){if(++n<60)setTimeout(go,900);return}choice(title,text,opts)};setTimeout(go,900)};
const kAdd=t=>{try{keyAdd(t)}catch(e){}};
const RF=()=>S&&S.rift;
const bookS=f=>{try{const b=LS.get('murim_rift',{})||{};b.p=b.p||{};b.e=b.e||{};f(b);LS.set('murim_rift',b)}catch(e){}};
const wOfM=M=>{try{return window._wld?window._wld.wOf(M):(M.hw>0?'hunter':M.wx&&M.wx.on?M.wx.id:'normal')}catch(e){return'normal'}};
const where=()=>{if(!S)return'';if(S.mw){if(S.mw.sky)return'sky';return'm_'+wOfM(S.mw)}if(S.beastMode&&!S.beastMode.human)return'beast';if(S.ch==='soul')return'soul';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
const WN={murim:['⚔️','ยุทธภพ'],soul:['⭕','ทวีปจิตวิญญาณยุทธ์'],m_normal:['🏙️','ยุคปัจจุบัน'],m_zombie:['🧟','โลกซอมบี้'],m_hunter:['🌀','โลกฮันเตอร์'],sky:['🌠','ปี 2054']};
const wn=k=>(WN[k]||['🌍','อีกโลก']).join(' ');
const PAIR={mn_mu:{f:'m_normal',t:'murim',n:'ยุคปัจจุบัน → ยุทธภพ'},mz_mu:{f:'m_zombie',t:'murim',n:'โลกซอมบี้ → ยุทธภพ'},mh_so:{f:'m_hunter',t:'soul',n:'โลกฮันเตอร์ → ทวีปจิตวิญญาณยุทธ์'},mu_mn:{f:'murim',t:'m_normal',n:'ยุทธภพ → ยุคปัจจุบัน'}};
const HOW={body:['🌀','ข้ามทั้งตัว'],soul:['👤','วิญญาณเข้าร่าง']};

// ---------- มินิเกม (เครื่องยนต์ที่มีอยู่) ----------
function mg(eng,params,title,how,cb){const go=()=>{const E=(window._mg9E&&window._mg9E[eng])||(window._mg2E&&window._mg2E[eng]);const G=window._mg2G;
  if(!E||!G||typeof window.mg2Play!=='function'){cb(.35+Math.random()*.5);return}
  const id='rift_'+eng;G[id]={n:title,ic:'🌀',mt:'ผู้ข้ามโลก',how,t:22,rw:()=>'',init:(B,a)=>E(B,a,params)};let d=0;
  if(!window.mg2Play(id,{title:'🌀 '+title,sub:how,t:22},(sc,sk)=>{if(d)return;d=1;cb(sk?.45:sc)})&&!d){d=1;cb(.5)}};
 if((window._mg9E&&window._mg9E[eng])||(window._mg2E&&window._mg2E[eng]))setTimeout(go,350);
 else{try{wLoad('mw').then(()=>setTimeout(go,350),()=>cb(.5))}catch(e){cb(.5)}}}

// ---------- กติกากลาง: อัตราแลกเปลี่ยนพลัง ----------
const CONV={
 mn_mu:{pow:.6,note:'ร่างกายคนยุคปัจจุบันไม่มีลมปราณ · ความรู้สมัยใหม่ติดตัวมาเต็ม (สติปัญญา +15)',int:15},
 mz_mu:{pow:.8,note:'ร่างกายผู้รอดชีวิตทนกว่าคนทั่วไป (พลังชีวิตสูงสุด +15%) · อาจพาบางอย่างจากโลกซอมบี้มาด้วย',int:6,hp:.15},
 mh_so:{pow:.5,note:'หน้าต่างสถานะยังทำงาน แต่ค่าพลังถูกแปลงเหลือครึ่ง · ร่างกายนี้ไม่มีดวงจิต',int:4}};
function snap(){const H={name:S.name,age:S.age,money:S.money,power:S.power,qi:S.qi,ch:S.ch,xian:S.xian,xt:S.xt,fac:S.faction?S.faction.n:'',gender:S.gender};
 try{H.mw=S.mw?JSON.parse(JSON.stringify(S.mw)):null}catch(e){H.mw=null}try{H.sv=S.sv?JSON.parse(JSON.stringify(S.sv)):null}catch(e){H.sv=null}return H}
function anchorsNow(){let a=0;try{if(S.spouse)a++;a+=(S.children||[]).filter(c=>c&&c.alive!==false).length;if(S.mw&&S.mw.kids)a+=S.mw.kids.length;if(S.mw&&S.mw.mate)a++;if((S.parents||[]).some(p=>p&&p.alive))a++}catch(e){}return Math.max(1,Math.min(6,a))}
function clearQ(){try{if(choice._cur){choice._cur=null;choice._min=false;try{pendBar()}catch(e){}}choice._q=[]}catch(e){}try{if(typeof modalOpen!=='undefined'&&modalOpen)closeM()}catch(e){}}

// ---------- ข้ามโลก ----------
function cross(key,how){if(!S||!S.alive||S.rift)return;const P=PAIR[key],C=CONV[key],home=snap(),a=anchorsNow(),gen=S.gender||'ชาย';clearQ();
 const R=S.rift={k:key,how,f:P.f,t:P.t,y0:S.age,ys:0,shock:how==='soul'?55:80,a,b:0,ev:{},home,ly:S.age};
 S.mw=null;S.xian=false;S.xt=0;try{CFG.xian=0}catch(e){}try{setWorld(false)}catch(e){}S.faction=null;S.ownSect=null;S.spouse=null;
 if(P.t==='soul'){S.ch='soul';S.sv={aw:2,sp:[],lv:0,rings:[],seen:{},hy:-9};R.hs=1}else S.ch='';
 const pw0=Math.round((typeof total==='function'?total():S.power)||0);
 if(how==='soul'){R.orig=S.name;S.name=anyName(gen);S.age=RN(15,22);S.power=RN(20,60);S.int=Math.round((S.int||0)*.8);S.children=[];try{S.flags=S.flags||{};mkFamily()}catch(e){}}
 else{S.power=Math.max(20,Math.round((S.power||0)*C.pow));S.children=[];S.parents=[];}
 S.int=(S.int||0)+(C.int||0);if(C.hp){S.maxHp=Math.round((S.maxHp||100)*(1+C.hp));S.hp=Math.min(S.maxHp,S.hp||S.maxHp)}
 S.money=RN(20,120);S.qi=0;S.focus='train';
 bookS(b=>{b.p[key]=(b.p[key]||0)+1;b.h=b.h||{};b.h[how]=1});
 kAdd(`${HOW[how][1]}: ${P.n}`);
 log(`🌀 <b>รอยแยกกลืนคุณ — ${esc(P.n)}</b> ${how==='soul'?`คุณลืมตาในร่างของ <b>${esc(S.name)}</b> อายุ ${S.age} ปี ความทรงจำของ ${esc(R.orig)} ยังอยู่ครบ แต่มือที่ยกขึ้นมาดูไม่ใช่มือของคุณ`:'ร่างกายเดิม ความทรงจำเดิม แต่ไม่มีใครในโลกนี้รู้จักคุณ'}<br><span class="tag2">⚖️ กติกากลาง: ${esc(C.note)} · เงิน ฐานะ สำนัก ครอบครัว ไม่ข้ามมาด้วย · พลังจาก ${fmt(pw0)} เหลือราว ${fmt(Math.round(S.power))} · 🧭 ความแปลกถิ่น ${R.shock} · ⚓ สมอในโลกเดิม ${a}</span>`,'myth',true);
 try{isl({big:1,pri:1,ic:'🌀',h:'ข้ามโลก',t:P.n})}catch(e){}
 try{render()}catch(e){}try{saveGame()}catch(e){}}
function offer(key){const P=PAIR[key],C=CONV[key];const T={mn_mu:'คืนที่ไฟดับทั้งเขต คุณเดินผ่านซอยหลังวัด เห็นประตูไม้เก่าที่ไม่เคยมีมาก่อนเปิดแง้มอยู่ อีกฝั่งเป็นป่าไผ่ใต้แสงจันทร์ เสียงดาบกระทบกันดังมาจากที่ไกลๆ',
  mz_mu:'ในห้างร้างที่คุณเข้ามาหาเสบียง ลิฟต์ตัวหนึ่งเปิดเองทั้งที่ไฟดับมาสามปี ข้างในไม่ใช่ลิฟต์ แต่เป็นทางเดินหินที่มีกลิ่นธูปและเสียงไก่ขัน ฝูงซอมบี้กำลังขึ้นบันไดมา',
  mh_so:'เกตสีม่วงที่ไม่อยู่ในฐานข้อมูลสมาคมเปิดกลางสวนสาธารณะ หน้าต่างสถานะของคุณขึ้นตัวหนังสือที่ไม่เคยเห็น: [ปลายทาง: ทวีปที่ทุกคนมีวิญญาณ · ไม่มีทางกลับที่รับประกัน]'}[key];
 ask(`🌀 รอยแยก: ${P.n}`,`${T}<br><span class="tag2">⚖️ ถ้าข้าม: ${esc(C.note)} · เงิน ฐานะ สำนัก ครอบครัวไม่ข้ามไปด้วย · วันหนึ่งประตูอาจเปิดอีกครั้ง</span>`,[
  O('🌀 ก้าวข้ามไปทั้งตัว','ร่างเดิม ความทรงจำเดิม · ไม่มีใครรู้จักคุณ',()=>cross(key,'body')),
  O('👤 ปล่อยให้วิญญาณหลุดเข้าไป','ตื่นในร่างคนอื่น อายุ 15–22 · ได้ครอบครัวและหนี้ของเจ้าของร่างมาด้วย',()=>cross(key,'soul')),
  O('🚪 ปิดประตู เดินกลับบ้าน','ไม่ข้าม · ประตูอาจไม่มาอีก',()=>{S.flags=S.flags||{};S.flags.riftNo=(S.flags.riftNo||0)+1;log('🚪 คุณปิดประตูแล้วเดินกลับบ้าน ทั้งคืนนอนไม่หลับ','')})])}

// ---------- กลับบ้าน ----------
function goHome(comp){const R=RF();if(!R||R.done)return;
 if(R.k==='mu_mn'){R.ret=1;R.done=1;R.comp=comp||'';try{mwBack()}catch(e){console.error(e)}return}
 const H=R.home;clearQ();
 const fin=()=>{S.mw=H.mw;S.ch=H.ch||'';if(H.mw)S.mw.y=(S.mw.y||0)+R.ys;S.xian=false;S.xt=0;try{CFG.xian=0}catch(e){}try{setWorld(false)}catch(e){}
  if(R.how==='soul'&&R.orig)S.name=R.orig;S.money=Math.max(S.money||0,H.money||0);S.power=Math.max(H.power||0,Math.round(S.power||0));if(H.sv)S.sv=H.sv;else if(R.t==='soul')delete S.sv;S.focus=H.mw?'mwjob':'train';S.faction=null;
  R.ret=1;R.done=1;R.comp=comp||'';bookS(b=>{b.e.home=1});kAdd(`กลับจาก${PAIR[R.k].n.split('→')[1].trim()}สู่โลกเดิม${comp?' พร้อม '+comp:''}`);
  log(`🏠 <b>ประตูพาคุณกลับบ้าน</b> ${R.ys} ปีในอีกโลกผ่านไปเหมือนฝันยาว ที่นี่ก็ผ่านไป ${R.ys} ปีเท่ากัน ${comp?`<b>${esc(comp)}</b> ยืนจับมือคุณอยู่ข้างๆ มองโลกนี้ด้วยตาเบิกกว้าง`:'ทุกอย่างคุ้นตาแต่ไม่เหมือนเดิม'}`,'myth',true);
  try{render()}catch(e){}try{saveGame()}catch(e){}};
 if(H.mw){try{wNeed('mw',fin)}catch(e){fin()}}else fin()}
function door(){const R=RF();if(!R||R.done)return;R.dy=S.age;const can=R.k==='mu_mn'||!!R.home;const both=R.a>0&&R.b>0&&Math.abs(R.a-R.b)<=1;
 const pull=R.b>R.a?'ใจคุณเอียงไปทางโลกนี้':R.a>R.b?'ใจคุณยังอยู่ที่โลกเดิม':'ใจคุณแบ่งครึ่งพอดี';
 ask('🚪 ประตูเปิดอีกครั้ง',`ประตูบานเดิมโผล่ขึ้นมาอีกครั้งหลังผ่านไป ${R.ys} ปี อีกฝั่งคือ${wn(R.f)}<br>⚓ สมอในโลกเดิม <b>${R.a}</b> · สมอในโลกนี้ <b>${R.b}</b> — ${pull}`,[
  ...(can?[O('🏠 กลับบ้าน','กลับโลกเดิม · คนที่นี่จะจำคุณเป็นตำนาน',()=>goHome(''))]:[]),
  ...(can&&both&&R.bn?[O(`🤝 พา${R.bn}ข้ามไปด้วย`,'สมอสองโลกเท่ากัน · พาคนที่รักกลับไปด้วยได้หนึ่งคน',()=>goHome(R.bn))]:[]),
  O('🌱 อยู่ที่นี่ต่อ',R.b>=R.a?'ประตูจะปิดถาวร':'ประตูอาจกลับมาอีก',()=>{if(R.b>=R.a){R.stay=1;bookS(b=>{b.e.stay=1});kAdd('เลือกอยู่ในโลกใหม่ตลอดไป');log('🌱 คุณหันหลังให้ประตู มันหดเล็กลงจนเหลือแค่แสงจุดเดียว แล้วหายไปตลอดกาล','myth',true)}else{log('🌱 คุณยังไม่พร้อม ประตูค่อยๆ จางไป แต่คุณรู้ว่ามันจะกลับมา','')}})])}

// ---------- เหตุการณ์ตามคู่โลก ----------
const EV={};
const add=(k,id,min,cond,f)=>{(EV[k]=EV[k]||[]).push({id,min,cond,f})};
const shockD=(d,why)=>{const R=RF();if(!R||R.shock==null)return'';R.shock=cl(R.shock+d,0,100);return` <span class="tag2">🧭 ความแปลกถิ่น ${d>0?'+':''}${d} → ${R.shock}${why?' · '+why:''}</span>`};
const LANG={murim:[['ข้าน้อย','ฉัน (แบบถ่อมตัว)'],['ท่านผู้อาวุโส','คุณลุง คุณป้า'],['ตำลึง','หน่วยเงิน'],['ลมปราณ','พลังในตัว'],['ประมุข','ซีอีโอของสำนัก'],['ศิษย์พี่','รุ่นพี่ที่ทำงาน'],['คารวะ','ไหว้']],
 soul:[['ดวงจิต','พลังที่ติดตัวตั้งแต่หกขวบ'],['วงแหวน','เลเวลที่ได้จากสัตว์'],['ผู้ปลุกจิต','ครูวัดพรสวรรค์'],['หอตุลาการ','ตำรวจของทวีป'],['สัตว์วิญญาณ','มอนสเตอร์ที่ฆ่าแล้วได้ของ'],['ระดับจิต','แรงก์'],['ร่างแท้','คลาสซ่อน']]};
function langEv(world){const L=LANG[world]||LANG.murim;
 ask('🗣️ ภาษาของโลกนี้',`ทุกคนพูดภาษาที่คุณฟังออก แต่คำที่ใช้ไม่เหมือนเดิมเลย คนขายซาลาเปาหัวเราะเมื่อคุณเรียกตัวเองว่า ‘ฉัน’${shockD(0)}`,[
  O('จับคู่คำศัพท์ให้ได้ (มินิเกม)','🎮 เข้าใจเร็วขึ้นมาก',()=>mg('pairs',{head:'จับคู่คำของโลกนี้กับความหมาย',list:L,n:5},'เรียนภาษาโลกใหม่','จับคู่คำกับความหมาย',sc=>{const d=-Math.round(8+22*sc);S.int=(S.int||0)+Math.round(2+4*sc);log(`🗣️ คุณพูดคำว่า ‘${L[0][0]}’ ได้โดยไม่ต้องคิด${shockD(d,'เรียนภาษา')}`,'good')})),
  O('ฟังแล้วเลียนแบบไปเรื่อยๆ','ช้าแต่ไม่อาย',()=>log(`🗣️ คุณพูดน้อย ฟังมาก ภายในหนึ่งปีก็ไม่มีใครหัวเราะอีก${shockD(-10)}`,'')),
  O('พูดแบบเดิม ใครไม่เข้าใจก็ช่าง','',()=>{S.cha=Math.max(0,(S.cha||0)-3);log(`🗣️ คนเริ่มเรียกคุณว่า ‘คนแปลกจากแดนไกล’${shockD(-3)}`,'bad')})])}
// ยุคปัจจุบัน → ยุทธภพ
add('mn_mu','lang',0,R=>R.shock>=30,()=>langEv('murim'));
add('mn_mu','soap',1,()=>1,()=>ask('🧼 สบู่ก้อนแรกของยุทธภพ','ที่นี่ล้างมือด้วยน้ำเปล่า แผลเล็กๆ เน่าจนคนตาย คุณจำได้ว่าสบู่ทำจากไขมันกับขี้เถ้า',[
 O('ทำสบู่ขายในตลาด','เงิน + ชื่อเสียง · อาจถูกจับตามอง',()=>{const m=RN(300,900);S.money+=m;S.fame=(S.fame||0)+25;RF().ev.soapT=1;log(`🧼 สบู่กลิ่นใบเตยขายหมดทุกวัน ได้ ${fmt(m)} ตำลึง แม่ค้าทั้งตลาดอยากรู้สูตร${shockD(-6)}`,'good')}),
 O('สอนหมอในเมืองให้ล้างมือก่อนทำแผล','กรรมดี · ชีวิตคนจำนวนมาก',()=>{S.karma=(S.karma||0)+12;S.fame=(S.fame||0)+15;RF().b++;RF().bn=RF().bn||anyName('หญิง');log(`🩹 หมอประจำเมืองลองทำตาม คนไข้ที่แผลเน่าลดลงครึ่งหนึ่ง ลูกสาวหมอ <b>${esc(RF().bn)}</b> มาขอเรียนกับคุณทุกวัน${shockD(-8)} · ⚓ สมอโลกนี้ +1`,'good')}),
 O('เก็บไว้ใช้เอง','',()=>log(`🧼 คุณเป็นคนเดียวในเมืองที่ตัวหอม${shockD(-2)}`,''))]));
add('mn_mu','ledger',2,()=>1,()=>ask('🧾 พ่อค้าเกลือบัญชีพัง','พ่อค้าเกลือใหญ่ที่สุดในเมืองถูกลูกจ้างโกงมาสามปี ไม่มีใครหาเจอว่าเงินหายไปตรงไหน คุณเห็นสมุดบัญชีแล้วรู้ทันทีว่าเขาไม่เคยใช้บัญชีคู่',[
 O('ทำบัญชีคู่ให้ จับคนโกง','เงิน · ได้คนรู้จักที่มีอิทธิพล',()=>{const m=RN(500,1500);S.money+=m;S.int=(S.int||0)+3;log(`🧾 คุณเจอว่าเงินหายผ่านใบเสร็จค่าเรือปลอม พ่อค้าจ่าย ${fmt(m)} ตำลึง และเรียกคุณว่า ‘อาจารย์’${shockD(-5)}`,'good')}),
 O('ขอหุ้นส่วนแทนค่าจ้าง','เสี่ยง · ได้มากถ้าสำเร็จ',()=>{if(Math.random()<.55){const m=RN(1500,4000);S.money+=m;log(`📈 สามปีต่อมากิจการเกลือโตขึ้นสามเท่า ส่วนของคุณคือ ${fmt(m)} ตำลึง`,'epic')}else log('📉 พ่อค้าตายกะทันหัน ลูกชายไม่ยอมรับว่าคุณเป็นหุ้นส่วน','bad')}),
 O('ไม่ยุ่ง','',()=>log('🧾 คุณเดินผ่านไป ได้ยินข่าวว่าพ่อค้าเกลือฆ่าตัวตายในปีถัดมา','bad'))]));
add('mn_mu','witch',2,R=>R.ev.soapT||(S.fame||0)>120,()=>ask('🔥 ข้อหาวิชามาร','คนในเมืองลือว่าคุณใช้วิชามาร ‘สบู่ที่ทำให้ผิวขาว’ กับ ‘ตัวเลขที่ทำให้เงินงอก’ คนจากสำนักฝ่ายธรรมะมาเคาะประตูพร้อมดาบ',[
 O('อธิบายด้วยการทดลองต่อหน้าทุกคน','ใช้สติปัญญา',()=>{if((S.int||0)>=40||Math.random()<.5){S.fame=(S.fame||0)+40;log(`🔬 คุณต้มไขมันกับขี้เถ้าต่อหน้าศาลา ทุกคนเห็นว่าไม่มีคาถาสักคำ ศิษย์ฝ่ายธรรมะคนหนึ่งขอเป็นศิษย์คุณ${shockD(-8)}`,'epic')}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.25));log(`🩸 ไม่มีใครเชื่อ คุณถูกทุบตีแล้วไล่ออกจากเมือง${shockD(10)}`,'bad')}}),
 O('หนีไปเมืองอื่นกลางดึก','ปลอดภัย · เริ่มใหม่',()=>{S.money=Math.round(S.money*.5);log(`🌙 คุณทิ้งร้านไว้เบื้องหลัง เริ่มใหม่ในเมืองที่ไม่มีใครรู้จัก${shockD(6)}`,'')}),
 ...(S.karma>15?[O('ให้หมอที่คุณเคยช่วยมารับรอง','กรรมดีย้อนคืน',()=>{S.karma+=5;RF().b++;log(`🙏 หมอในเมืองยืนขวางหน้าคุณ ‘คนนี้ช่วยชีวิตคนในเมืองมากกว่าพวกท่านทั้งสำนัก’ ทุกคนลดดาบลง${shockD(-10)} · ⚓ สมอโลกนี้ +1`,'good')})]:[])]));
// วิญญาณเข้าร่าง (ทุกคู่ที่ข้ามแบบวิญญาณ)
const soulEv=(k)=>{add(k,'debt',0,R=>R.how==='soul',()=>ask('💸 หนี้ของเจ้าของร่าง','ชายสามคนมาเคาะประตูตั้งแต่เช้า ‘เมื่อเดือนก่อนเจ้ายืมไปห้าสิบตำลึง ลืมแล้วรึ’ คุณไม่เคยยืม แต่ร่างนี้เคย',[
  O('ใช้หนี้แทน','เงิน −',()=>{S.money=Math.max(0,S.money-50);S.karma=(S.karma||0)+3;log(`💸 คุณจ่ายหนี้ที่ไม่ได้ก่อ หนึ่งในสามคนพยักหน้า ‘แปลกนะ เจ้าเปลี่ยนไป’${shockD(-4)}`,'')}),
  O('บอกว่าจำไม่ได้ ขอผัดไปก่อน','',()=>{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.12));log(`🩸 พวกมันซ้อมคุณหนึ่งยกเป็นการเตือน${shockD(2)}`,'bad')}),
  O('สู้','',()=>{if(typeof fight==='function'&&fight('นักทวงหนี้สามคน',Math.max(10,total()*.8))){S.fame=(S.fame||0)+10;log(`👊 คุณล้มทั้งสามคน คนในซอยเริ่มกลัวร่างนี้มากกว่าเดิม${shockD(-2)}`,'good')}else log('🩸 คุณแพ้ ร่างนี้ไม่เคยฝึกอะไรมาเลย','bad')})]));
 add(k,'mom',1,R=>R.how==='soul',()=>ask('👩 แม่ของร่างนี้','แม่ของเจ้าของร่างวางชามข้าวลงช้าๆ ‘เจ้าไม่เคยขอบคุณแม่มาสิบปี ทำไมช่วงนี้ขอบคุณทุกมื้อ’ เธอมองตาคุณนานเกินไป',[
  O('บอกความจริงทั้งหมด','เสี่ยง',()=>{if(Math.random()<.5){RF().b++;RF().bn=RF().bn||'แม่ของร่างนี้';log(`🫂 เธอร้องไห้แล้วบอกว่า ‘ลูกของแม่ตายไปตั้งแต่ตกน้ำวันนั้นแล้วสินะ’ แต่เธอยังตักข้าวให้คุณทุกมื้อ${shockD(-12)} · ⚓ สมอโลกนี้ +1`,'good')}else log(`😨 เธอพาหมอผีมาที่บ้านสามคืนติด${shockD(8)}`,'bad')}),
  O('ทำตัวเป็นลูกที่ดีกว่าเดิมเงียบๆ','',()=>{joy(4);log(`🍚 คุณล้างจานทุกคืน เธอไม่ถามอีกเลย แต่บางคืนคุณได้ยินเธอร้องไห้${shockD(-6)}`,'')}),
  O('ย้ายออกจากบ้าน','',()=>log(`🚪 คุณไปเช่าห้องในเมือง เธอส่งข้าวมาให้ทุกวันพระ${shockD(4)}`,''))]))};
['mn_mu','mz_mu','mh_so'].forEach(soulEv);
// โลกซอมบี้ → ยุทธภพ: โรคระบาด
add('mz_mu','lang',0,R=>R.shock>=30,()=>langEv('murim'));
add('mz_mu','fever',0,()=>1,()=>{const R=RF();R.pl=R.pl||0;ask('🤒 ไข้แปลกในหมู่บ้านแรก','สามคืนหลังคุณมาถึง เด็กในหมู่บ้านไข้ขึ้นสูง ตาแดง กัดแม่ตัวเองตอนเพ้อ คุณรู้จักอาการนี้ดีกว่าใครในโลกนี้ — คุณพาบางอย่างมาจากโลกเดิม',[
 O('กักคนป่วยทันที ใครห้ามก็ไม่ฟัง','ช่วยคนได้มาก · คนเกลียดคุณ',()=>{R.pl+=2;S.karma=(S.karma||0)+4;S.cha=Math.max(0,(S.cha||0)-4);log(`🚧 คุณล้อมรั้วรอบบ้านคนป่วยด้วยมือตัวเอง ชาวบ้านด่าคุณทั้งคืน แต่ไม่มีบ้านไหนติดเพิ่ม${shockD(-4)}`,'good')}),
 O('บอกหมอประจำหมู่บ้าน','ช้ากว่าแต่คนเชื่อ',()=>{R.pl+=1;log(`🌿 หมอฟังแล้วเชื่อครึ่งเดียว กักบ้านแรกได้ แต่ไข้ไปถึงบ้านที่สองแล้ว${shockD(-2)}`,'')}),
 O('เงียบ แล้วรีบออกจากหมู่บ้าน','ปลอดภัย · กรรมหนัก',()=>{R.pl-=3;S.karma=(S.karma||0)-15;log(`🌫️ คุณออกเดินทางตอนตีห้า สองเดือนต่อมาได้ข่าวว่าหมู่บ้านนั้นเงียบไปทั้งหมู่บ้าน${shockD(4)}`,'bad')})])});
add('mz_mu','healer',2,()=>1,()=>{const R=RF();ask('🩺 หมอเทวดารักษาไม่ได้','ไข้แปลกลามไปถึงเมืองใหญ่ หมอเทวดาที่ทั้งยุทธภพยกย่องยอมแพ้ต่อหน้าคุณ ‘ข้ารักษาได้ทุกพิษ ยกเว้นพิษที่ไม่ใช่ของโลกนี้’',[
 O('สอนวิธีกักโรค ต้มน้ำ เผาศพ','มินิเกม · ช่วยได้ทั้งเมือง',()=>mg('hold',{n:3,lo:.62,hi:.86,ms:1400,ic:'🔥',label:'กดค้างคุมไฟต้มน้ำ'},'คุมโรคระบาด','กดค้างให้ไฟอยู่ในโซน',sc=>{R.pl+=sc>=.55?3:1;S.fame=(S.fame||0)+Math.round(60*sc);log(sc>=.55?`🔥 ทั้งเมืองต้มน้ำ เผาศพ ปิดบ่อ หมอเทวดาจดทุกคำของคุณลงตำรา${shockD(-10)}`:`🔥 ได้ผลครึ่งเดียว คนในเมืองยังตายวันละหลายสิบ${shockD(-3)}`,sc>=.55?'epic':'')})),
 O('เอาเลือดคุณไปทำยา (คุณเคยรอดมาแล้ว)','พลังชีวิต −30% · อาจหยุดโรคได้',()=>{S.maxHp=Math.max(30,Math.round(S.maxHp*.7));S.hp=Math.min(S.hp,S.maxHp);if(Math.random()<.6){R.pl+=4;S.fame=(S.fame||0)+120;R.b++;R.bn=R.bn||'หมอเทวดา';log(`🩸 หมอเทวดาทำยาจากเลือดคุณได้สามร้อยขวด โรคหยุดลามในหนึ่งเดือน${shockD(-15)} · ⚓ สมอโลกนี้ +1`,'myth')}else log('🩸 ยาไม่ได้ผล แต่หมอเทวดาสัญญาว่าจะไม่หยุดหา','bad')}),
 O('ไม่ช่วย','',()=>{R.pl-=2;S.karma=(S.karma||0)-8;log('🚪 คุณปิดประตูห้องพัก เสียงระฆังงานศพดังทั้งเดือน','bad')})])});
add('mz_mu','cult',3,()=>1,()=>{const R=RF();ask('😈 สำนักมารอยากได้เชื้อ','ประมุขสำนักมารเสนอทองคำหนึ่งหีบ แลกกับวิธีทำให้คนกลายเป็น ‘ศพที่ไม่ล้ม’ เขาบอกว่าจะใช้กับศัตรูเท่านั้น',[
 O('ปฏิเสธ และเตือนทุกสำนัก','',()=>{R.pl+=1;S.karma=(S.karma||0)+8;log('📜 สำนักฝ่ายธรรมะทั้งหกร่วมลงนามห้ามใช้ ‘พิษคนเดินได้’ ชื่อคุณอยู่ท้ายสัญญา','good')}),
 O('ขาย','เงินมหาศาล · กรรม −−',()=>{R.pl-=4;S.money+=RN(5000,12000);S.karma=(S.karma||0)-30;log('💰 หีบทองหนักจนต้องใช้สองคนแบก สามปีต่อมาเมืองชายแดนทั้งเมืองเดินได้ทั้งที่ไม่มีใครหายใจ','bad')}),
 O('แกล้งตกลง แล้วทำลายเชื้อทั้งหมด','เสี่ยงตาย',()=>{if(typeof fight==='function'&&fight('ผู้คุมห้องลับสำนักมาร',Math.max(10,total()*1.1))){R.pl+=3;S.fame=(S.fame||0)+80;log('🔥 คุณเผาห้องลับของสำนักมารทั้งห้อง แล้วหนีออกมาทางท่อระบายน้ำ','epic')}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.4));log('🩸 คุณถูกจับได้ หนีออกมาได้พร้อมแผลเต็มตัว เชื้อยังอยู่ในมือพวกมัน','bad')}})])});
// โลกฮันเตอร์ → ทวีปจิตวิญญาณยุทธ์
add('mh_so','lang',0,R=>R.shock>=30,()=>langEv('soul'));
add('mh_so','awake',0,()=>S.sv&&S.sv.aw!==1,()=>ask('⭕ พิธีปลุกดวงจิตที่ลูกแก้วไม่เรืองแสง','ผู้ปลุกจิตวางลูกแก้วหกลูกรอบตัวคุณ ไม่มีลูกไหนเรืองแสง แต่ตรงหน้าคุณมีหน้าต่างสถานะสีน้ำเงินเด้งขึ้นมา: <b>[ตรวจพบระบบพลังภายนอก · ต้องการผสานหรือไม่]</b>',[
 O('ผสาน: ให้ระบบกลืนดวงจิต','ได้ดวงจิตเงา (ร่างแท้) · เข้าเส้นทางผู้ฝึกจิตเต็มตัว',()=>{const G=S.sv;G.aw=1;G.sp=[{id:'shadow',rev:1}];G.lv=Math.max(G.lv||0,10);RF().fused=1;log(`🌑 หน้าต่างสถานะแตกเป็นเงาสีดำแล้วไหลเข้าร่าง ดวงจิต <b>เงาที่ไม่ใช่ของเรา</b> ตื่นขึ้นในร่างแท้ทันที ระดับจิต ${G.lv} ผู้ปลุกจิตทำลูกแก้วหล่นแตก${shockD(-15)}`,'myth',true)}),
 O('ไม่ผสาน เป็นผู้ไร้ดวงจิตที่แข็งแกร่ง','เก็บหน้าต่างสถานะไว้ · พลัง + · ไม่มีวงแหวน',()=>{try{S.power+=pctPow(.2)}catch(e){S.power+=200}RF().nf=1;log(`🟦 คุณปิดหน้าต่าง ‘ไม่ต้อง’ ทั้งทวีปเรียกคุณว่าผู้ไร้ดวงจิต แต่ไม่มีใครในหมู่บ้านล้มคุณได้${shockD(-5)}`,'epic')})]));
add('mh_so','duel',1,()=>1,()=>ask('⚔️ ผู้ไร้ดวงจิตที่แข็งแกร่ง','ผู้ฝึกจิตรุ่นเดียวกันได้ข่าวว่ามีคน ‘ไม่มีดวงจิตแต่ชนะทุกคน’ เขามาท้าดวลกลางลานหมู่บ้าน วงแหวนสามวงหมุนรอบตัวเขา',[
 O('รับคำท้า','ดวล',()=>{if(typeof duel==='function')duel('ผู้ฝึกจิตสามวงแหวน',Math.max(10,Math.round(total()*.9)),w=>{if(w){S.fame=(S.fame||0)+50;RF().b++;RF().bn=RF().bn||'คู่ดวลที่กลายเป็นเพื่อน';log(`🏆 เขาล้มลงแล้วหัวเราะ ‘เจ้าใช้วิชาอะไร ข้าไม่เคยเห็น’ หลังจากวันนั้นเขามาซ้อมกับคุณทุกวัน${shockD(-8)} · ⚓ สมอโลกนี้ +1`,'epic')}else log(`🩸 วงแหวนวงที่สามกระแทกคุณกระเด็น คุณเพิ่งเข้าใจว่าที่นี่ไม่ใช่เกตเกรด E${shockD(3)}`,'bad')});else log('⚔️ ดวลเสมอ','')}),
 O('ขอเรียนรู้แทนการดวล','',()=>{S.int=(S.int||0)+4;log(`📖 เขาอธิบายวงแหวนให้ฟังทั้งคืน คุณเทียบกับระบบแรงก์ในหัวทีละข้อ${shockD(-10)}`,'good')})]));
add('mh_so','court',2,()=>1,()=>ask('⚖️ หอตุลาการสงสัย','หอตุลาการแห่งทวีปส่งคนมาสอบสวน ‘กล่องแสงสีน้ำเงินที่ลอยหน้าเจ้า คือวิชาต้องห้ามใช่หรือไม่’',[
 O('เปิดหน้าต่างสถานะให้ดู','',()=>{if(Math.random()<.5){S.fame=(S.fame||0)+30;log(`🟦 ผู้ตรวจอ่านค่าสถานะของคุณแล้วนิ่งไปนาน ‘ข้าจะรายงานว่าไม่พบอะไร’ แล้วขอให้คุณช่วยวัดค่าของลูกเขา${shockD(-6)}`,'good')}else{S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));log(`⛓️ คุณถูกคุมตัวไปสอบสวนสามเดือน${shockD(5)}`,'bad')}}),
 O('ปฏิเสธว่าไม่มีอะไร','',()=>log(`🙈 ผู้ตรวจจ้องคุณแล้วจดชื่อลงสมุดเล่มดำ${shockD(0)}`,'')),
 O('ขอเข้าร่วมหอตุลาการ','',()=>{S.fame=(S.fame||0)+20;S.karma=(S.karma||0)+2;log(`🧑‍⚖️ หอตุลาการรับคุณเป็นผู้ตรวจพิเศษ งานแรกคือตามหาคนอื่นที่ ‘มีกล่องแสงลอยอยู่หน้า’ — คุณไม่ใช่คนเดียว${shockD(-8)}`,'epic')})]));
add('mh_so','beast',2,()=>1,()=>ask('🐺 สัตว์วิญญาณได้กลิ่นเกต','หมาป่าหลังเงินฝูงหนึ่งเดินตามคุณออกจากป่า มันไม่โจมตี แค่ดมกลิ่นบนเสื้อคุณ กลิ่นของเกตที่ทวีปนี้ไม่เคยมี',[
 O('ให้หัวหน้าฝูงเลือกคุณ','',()=>{if(S.sv){S.sv.pet=S.sv.pet||{n:'หมาป่าหลังเงินจากเกต',t:1,y:0}}RF().b++;RF().bn=RF().bn||'หมาป่าหลังเงิน';log(`🐺 หัวหน้าฝูงนอนลงข้างเท้าคุณ ตั้งแต่วันนั้นมันไม่ไปไหนอีก${shockD(-8)} · ⚓ สมอโลกนี้ +1`,'good')}),
 O('ล่ามันแบบฮันเตอร์','',()=>{S.money+=RN(200,600);S.karma=(S.karma||0)-4;log(`🗡️ คุณชำแหละมันแบบที่สมาคมสอน ได้ชิ้นส่วนไปขาย คนในหมู่บ้านมองคุณแปลกๆ ที่นี่ไม่มีใครฆ่าโดยไม่หลอมวงแหวน${shockD(4)}`,'')})]));

// ---------- 🚪 คนจากโลกอื่นมาหาคุณ (ไม่เปลี่ยนโลก) ----------
const VIS={
 sky:{at:'m_normal',ic:'🌠',n:'คนจากปี 2054',steps:[
  ()=>{const V=S.rvis;ask('🌠 ชายในชุดแปลกหน้าเซเว่น',`ชายคนหนึ่งในชุดที่ดูเหมือนทำจากกระจก นั่งกอดเข่าหน้าเซเว่นตอนตีสอง เขาถามคุณว่า ‘ปีนี้ปีอะไร’ พอคุณตอบ เขาหัวเราะแล้วร้องไห้พร้อมกัน ‘ผมมาจากปี 2054’<br>ชื่อของเขาคือ <b>${esc(V.n)}</b>`,[
   O('พากลับบ้าน ซ่อนไว้ก่อน','',()=>{V.st=1;V.b=1;log(`🏠 ${esc(V.n)}นอนบนโซฟาบ้านคุณ ตื่นมาเขามองพัดลมตั้งพื้นนานเป็นชั่วโมง`,'good')}),
   O('พาไปส่งโรงพัก','',()=>{V.st=9;log(`🚓 ตำรวจพาเขาไปโรงพยาบาลจิตเวช สามวันต่อมาเขาหายไปจากห้องที่ล็อกจากข้างนอก`,'')}),
   O('ถ่ายคลิปลงโซเชียล','',()=>{V.st=1;V.leak=1;try{if(S.mw)S.mw.fame=(S.mw.fame||0)+5000}catch(e){}log(`📱 คลิปมีคนดูสองล้านครั้ง ทุกคนบอกว่าเป็นคอนเทนต์ คนในชุดดำสองคนเริ่มเดินผ่านหน้าบ้านคุณทุกวัน`,'')})])},
  ()=>{const V=S.rvis;ask('📰 ข่าวจากอนาคต',`${esc(V.n)}จำข่าวใหญ่ของสิบปีข้างหน้าได้สามเรื่อง: หุ้นบริษัทหนึ่งจะขึ้นสิบเท่า · สะพานแห่งหนึ่งจะถล่มในเดือนหน้า · คนหนึ่งที่คุณรู้จักจะดังระดับโลก`,[
   O('ซื้อหุ้นตัวนั้น','',()=>{const v=Math.round((S.money||0)*.8+20000);S.money=(S.money||0)+v;V.tl=(V.tl||0)+1;log(`📈 ห้าปีต่อมาหุ้นขึ้นจริงสิบเท่า ได้ ${fmt(v)} ${esc(V.n)}บอกว่า ‘แต่ในเส้นเวลาของผม คุณไม่เคยรวย’`,'good')}),
   O('ไปเตือนเรื่องสะพาน','',()=>{S.karma=(S.karma||0)+15;V.tl=(V.tl||0)+2;try{if(S.mw)S.mw.fame=(S.mw.fame||0)+20000}catch(e){}log(`🌉 คุณปิดถนนด้วยกรวยที่ขโมยมาจากไซต์ก่อสร้าง สะพานถล่มตอนไม่มีรถสักคัน ข่าวเรียกคุณว่า ‘คนบ้าที่ช่วยคนสามร้อยชีวิต’`,'epic')}),
   O('ไม่ฟัง ไม่อยากรู้อนาคต','',()=>{joy(3);log(`🙉 ${esc(V.n)}ยิ้ม ‘คุณเป็นคนแรกที่พูดแบบนี้’`,'')})])},
  ()=>{const V=S.rvis;ask('🔧 เครื่องกลับบ้าน',`${esc(V.n)}ประกอบเครื่องจากชิ้นส่วนมือถือเก่าในห้องคุณมาหนึ่งปี เหลือแค่ใส่รหัสให้ถูก ‘ถ้าผมกลับไป ทุกอย่างที่เราเปลี่ยนจะยังอยู่ไหม ผมไม่รู้’${V.tl?' <span class="tag2">(คุณเปลี่ยนอนาคตไปแล้ว '+V.tl+' เรื่อง เส้นเวลาสั่นไหว)</span>':''}`,[
   O('ช่วยไขรหัส (มินิเกม)','🎮 ส่งเขากลับบ้าน',()=>mg('lock',{syms:['0','1','2','4','5','⏚'],len:4,tries:7},'รหัสกลับปี 2054','ไขรหัสให้เครื่องทำงาน',sc=>{if(sc>=.5){V.st=8;S.int=(S.int||0)+10;bookS(b=>{b.e.vsky=1});kAdd(`ส่งคนจากปี 2054 กลับบ้าน`);log(`🌠 แสงสีขาววาบเดียว ${esc(V.n)}หายไป บนโต๊ะเหลือโน้ตหนึ่งแผ่น ‘ขอบคุณที่ให้ผมนอนโซฟา ปี 2054 ผมจะมาหาคุณ ตอนนั้นคุณจะอายุเยอะแล้ว’`,'myth',true)}else{V.st=7;log(`💥 เครื่องลัดวงจร ${esc(V.n)}ต้องอยู่ที่นี่ต่อ เขานั่งเงียบทั้งคืน`,'bad')}})),
   O('ชวนอยู่ที่นี่ด้วยกัน','',()=>{V.st=7;joy(6);bookS(b=>{b.e.vstay=1});kAdd(`${V.n} จากปี 2054 เลือกอยู่ในยุคนี้`);log(`🏠 ${esc(V.n)}ปิดเครื่องแล้ววางลงในกล่อง ‘อนาคตไม่มีใครทำข้าวผัดอร่อยแบบนี้’ เขาเช่าห้องข้างๆ คุณ`,'good')})])}]},
 mod:{at:'murim',ic:'🏙️',n:'คนจากยุคปัจจุบัน',steps:[
  ()=>{const V=S.rvis;ask('🏙️ คนแปลกหน้ากลางลานสำนัก',`ชายในชุดเชิ้ตกับเนกไทนอนหมดสติกลางลานฝึกตอนรุ่งเช้า ในมือกำกล่องสี่เหลี่ยมสีดำที่ส่องแสงได้ พอฟื้นเขาพูดว่า ‘ที่นี่ไม่มีไวไฟเหรอ’<br>เขาบอกว่าชื่อ <b>${esc(V.n)}</b> ทำงานบริษัทประกันที่กรุงเทพฯ`,[
   O('รับไว้ในความดูแลของคุณ','',()=>{V.st=1;log(`🍵 ${esc(V.n)}กินข้าวต้มสามชาม แล้วถามว่าห้องน้ำอยู่ไหน คุณชี้ไปที่ป่า`,'good')}),
   O('ส่งให้ประมุขตัดสิน','',()=>{V.st=1;S.fame=(S.fame||0)+5;log(`👴 ประมุขดูกล่องสีดำแล้วสั่งเก็บเข้าหอคัมภีร์ แต่ให้ ${esc(V.n)}อยู่ในความดูแลของคุณ`,'')}),
   O('ไล่ออกไป คิดว่าเป็นสายลับ','',()=>{V.st=9;log(`🚪 ${esc(V.n)}เดินออกจากประตูสำนักไปทั้งที่ยังใส่รองเท้าหนัง ไม่มีใครเห็นเขาอีกเลย`,'')})])},
  ()=>{const V=S.rvis;ask('💡 ความรู้จากอนาคต',`${esc(V.n)}อยู่ที่นี่หนึ่งปีแล้ว เขาเริ่มเสนอ ‘ไอเดีย’ ให้สำนัก: ระบบประกันชีวิตให้ศิษย์ที่บาดเจ็บ · ตารางฝึกแบบกะเช้ากะดึก · เอาวิชาไปขายเป็นคอร์ส`,[
   O('ทำระบบประกันชีวิตศิษย์','',()=>{S.karma=(S.karma||0)+6;S.fame=(S.fame||0)+25;S.int=(S.int||0)+4;log(`📜 ศิษย์ที่บาดเจ็บได้ข้าวสารเดือนละถังจนหายดี สำนักอื่นเริ่มลอกแบบ`,'good')}),
   O('เปิดคอร์สวิชาให้คนนอก','เงิน · คนในสำนักไม่พอใจ',()=>{S.money+=RN(800,2500);S.cha=Math.max(0,(S.cha||0)-3);log(`💰 ลูกพ่อค้าห้าสิบคนจ่ายเงินมาเรียนกระบวนท่าพื้นฐาน ผู้อาวุโสสามคนเดินออกจากสำนัก`,'')}),
   O('ไม่ฟัง ที่นี่มีวิถีของที่นี่','',()=>log(`🙅 ${esc(V.n)}ยักไหล่ แล้วเปิดแผงขายน้ำชาไข่มุกหน้าสำนักแทน ขายดีกว่าที่ทุกคนคิด`,''))])},
  ()=>{const V=S.rvis;ask('🌀 เขาอยากกลับบ้าน',`${esc(V.n)}เจอบันทึกในหอคัมภีร์ว่ามีรอยแยกเปิดบนยอดเขาทุกหกสิบปี และปีนี้คือปีนั้น ‘ลูกผมเพิ่งสามขวบตอนผมหายมา’`,[
   O('พาขึ้นเขาฝ่าพายุหิมะ (มินิเกม)','',()=>mg('beat',{n:8,iv0:760,iv1:620,ic:'🧗',label:'🧗 ปีน!'},'ปีนยอดเขาหิมะ','กดตามจังหวะก้าว',sc=>{if(sc>=.5){V.st=8;S.fame=(S.fame||0)+30;bookS(b=>{b.e.vmod=1});kAdd(`ส่งคนจากยุคปัจจุบันกลับบ้าน`);log(`🌀 ${esc(V.n)}ก้าวเข้ารอยแยกพร้อมโบกมือ ทิ้งกล่องสีดำไว้ให้คุณ มันดับไปแล้ว แต่ข้างในมีรูปลูกของเขาที่คุณดูได้ตอนมันยังมีไฟ`,'myth',true)}else{V.st=7;log(`❄️ พายุแรงเกินไป รอยแยกปิดก่อนถึงยอด ${esc(V.n)}นั่งร้องไห้ในถ้ำทั้งคืน`,'bad')}})),
   O('ขอให้อยู่ต่อ','',()=>{V.st=7;joy(4);bookS(b=>{b.e.vstay=1});log(`🍵 ${esc(V.n)}มองยอดเขานานมาก แล้วกลับไปเปิดร้านน้ำชาไข่มุกตามเดิม ทุกหกสิบปีเขาจะขึ้นไปดูอีกครั้ง`,'')})])}]}};
function visit(kind){if(S.rvis)return;S.rvis={k:kind,st:0,n:anyName(Math.random()<.6?'ชาย':'หญิง'),y:S.age,ly:S.age};VIS[kind].steps[0]()}
function visTick(){const V=S.rvis;if(!V||V.st>=7)return;const D=VIS[V.k];if(where()!==D.at)return;if(S.age-V.ly<1)return;if(Math.random()<.6){V.ly=S.age;V.st++;const f=D.steps[V.st];if(f)f();else V.st=8}}

// ---------- รายปี ----------
function tick(){const R=RF();if(!R||R.done||R.stay&&false)return;if(R.ly===S.age)return;R.ly=S.age;R.ys++;
 const here=where();if(here!==R.t&&!(R.k==='mu_mn'&&/^m_/.test(here)))return;
 if(R.shock!=null&&R.k!=='mu_mn'){R.shock=Math.max(0,R.shock-RN(4,8));if(R.shock>=60){joy(-2);S.money=Math.max(0,(S.money||0)-RN(5,30));if(Math.random()<.35)log(`🧭 ยังไม่ชินกับโลกนี้ ถูกโก่งราคาสามครั้งในเดือนเดียว <span class="tag2">(ความแปลกถิ่น ${R.shock})</span>`,'')}}
 const L=(EV[R.k]||[]).filter(e=>!R.ev[e.id]&&R.ys>=e.min&&(()=>{try{return e.cond(R)}catch(x){return false}})());
 if(L.length&&Math.random()<.7){const e=L.find(x=>x.id==='awake')||L.find(x=>x.id==='lang'&&R.shock>=50)||L.find(x=>x.id==='fever')||pk(L);R.ev[e.id]=1;e.f();return}
 if(Math.random()<.1&&R.k!=='mu_mn'){const nm=anyName(Math.random()<.5?'ชาย':'หญิง');ask('🤝 คนในโลกนี้ที่ดีกับคุณ',`<b>${esc(nm)}</b> เป็นคนแรกที่ไม่ถามว่าคุณมาจากไหน เขาแค่นั่งกินข้าวด้วยทุกเย็น`,[
  O('เปิดใจ เล่าเรื่องโลกเดิมให้ฟัง','⚓ สมอโลกนี้ +1',()=>{R.b++;R.bn=nm;joy(5);log(`⚓ ${esc(nm)}ฟังทุกเรื่องโดยไม่หัวเราะ คุณเริ่มรู้สึกว่าที่นี่มีคนรอคุณกลับบ้าน${shockD(-6)}`,'good')}),
  O('รักษาระยะ','',()=>log(`🚶 คุณยิ้มให้แต่ไม่พูดอะไร ${esc(nm)}ไม่ได้มาอีก`,''))]);return}
 if(R.ys>=5&&!R.stay&&!R.done&&S.age-(R.dy||-99)>=4&&Math.random()<.16)door()}
{const _py=passYear;passYear=function(){const a0=S&&S.age;const r=_py.apply(this,arguments);try{if(S&&S.alive&&S.age!==a0)yearly()}catch(e){console.error('rift',e)}return r}}
// mwYear อาจถูกเรียกตรงจากที่อื่น
if(typeof mwYear==='function'){const _y=mwYear;mwYear=function(){const a0=S&&S.age;const r=_y.apply(this,arguments);try{if(S&&S.alive&&S.age!==a0)yearly()}catch(e){console.error('rift mw',e)}return r}}
let lastY=null;
function yearly(){if(lastY===S.age+':'+S.name)return;lastY=S.age+':'+S.name;
 try{const M=S.mw;if(!S.rift&&M&&!M.native&&!M.sky&&M.past&&M.past.how&&M.past.how!=='native'&&M.past.how!=='heir'){S.rift={k:'mu_mn',how:'body',f:'murim',t:'m_normal',y0:S.age-(M.y||0),ys:M.y||0,shock:null,a:1,b:0,ev:{},ly:S.age};bookS(b=>{b.p.mu_mn=(b.p.mu_mn||0)+1})}}catch(e){}
 tick();visTick();
 if(S.rift||!S.alive)return;const w=where(),M=S.mw,r=Math.random();
 if(M&&!M.kid&&S.age>=15&&!(S.flags&&S.flags.riftNo>=2)){
  if(w==='m_normal'&&M.native&&r<RATE())return offer('mn_mu');
  if(w==='m_zombie'&&r<RATE())return offer('mz_mu');
  if(w==='m_hunter'&&r<RATE())return offer('mh_so');
  if(w==='m_normal'&&!S.rvis&&r>1-RATE())return visit('sky')}
 if(!M&&w==='murim'&&!S.rvis&&S.age>=14&&r<RATE())return visit('mod')}
// รอยแยกเดิม ยุทธภพ → ยุคปัจจุบัน: ติดสถานะรอยแยกให้ด้วย (เครื่องยนต์เดิมดูแลความคุ้นเคย/การกลับ)
if(typeof mwEnter==='function'){const _e=mwEnter;mwEnter=function(){const had=!!(S&&S.mw);const r=_e.apply(this,arguments);try{if(!had&&S&&S.mw&&!S.rift){S.rift={k:'mu_mn',how:'body',f:'murim',t:'m_normal',y0:S.age,ys:0,shock:null,a:Math.max(1,anchorsNow()),b:0,ev:{},ly:S.age};bookS(b=>{b.p.mu_mn=(b.p.mu_mn||0)+1})}}catch(e){}return r}}
if(typeof mwBack==='function'){const _b=mwBack;mwBack=function(){const R=RF();const r=_b.apply(this,arguments);try{if(R&&R.k==='mu_mn'&&!S.mw){R.ret=1;R.done=1;bookS(b=>{b.e.home=1})}}catch(e){}return r}}

// ---------- หน้ารอยแยก + เมนู ----------
const css=document.createElement('style');css.textContent=`.rfB .row{background:#ffffff0d;border-radius:10px;padding:8px 10px;margin:5px 0;line-height:1.5}.rfB .bar{height:8px;border-radius:5px;background:#0005;overflow:hidden;margin-top:4px}.rfB .bar>i{display:block;height:100%}
.rfB .anc{display:flex;gap:8px;align-items:center;justify-content:center;font-size:15px}.rfB .anc b{font-size:22px}.rfB .pp{display:grid;grid-template-columns:1fr 1fr;gap:5px}.rfB .pp div{background:#ffffff0d;border-radius:8px;padding:5px 7px;font-size:12px}.rfB .pp .no{opacity:.35}`;document.head.appendChild(css);
window.openRift=function(){const R=RF(),V=S&&S.rvis,B=LS.get('murim_rift',{})||{};const P=R&&PAIR[R.k];
 const sh=R?(R.k==='mu_mn'?(S.mw?100-(S.mw.adapt||0):null):R.shock):null;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌀 รอยแยก</h3><div class="rfB">
 ${R?`<div class="row"><b>${esc(P.n)}</b> · ${HOW[R.how][0]} ${HOW[R.how][1]}${R.orig?` (เดิมชื่อ ${esc(R.orig)})`:''}<br><span class="tag2">ข้ามมาตอนอายุ ${R.y0} · อยู่มาแล้ว ${R.ys} ปี${R.ret?' · 🏠 กลับบ้านแล้ว':R.stay?' · 🌱 เลือกอยู่ที่นี่ตลอดไป':''}</span></div>
 ${sh!=null&&!R.done?`<div class="row">🧭 <b>ความแปลกถิ่น</b> ${sh}/100${R.k==='mu_mn'?' <span class="tag2">(วัดจากความคุ้นเคยกับยุคปัจจุบัน)</span>':''}<div class="bar"><i style="width:${sh}%;background:linear-gradient(90deg,#6fd8ff,#ff8a5a)"></i></div><small class="tag2">สูงกว่า 60 = ถูกโก่งราคา ความสุขลด · ลดลงตามเวลาและเรื่องที่ผ่านมา</small></div>`:''}
 <div class="row"><div class="anc"><span>⚓ โลกเดิม <b>${R.a}</b></span><span>⚖️</span><span>⚓ โลกนี้ <b>${R.b}</b></span></div><small class="tag2">สมอคือคนที่คุณรักในแต่ละโลก · ประตูเปิดอีกครั้งหลังห้าปี · ถ้าสมอสองฝั่งใกล้กัน พาคนหนึ่งข้ามไปด้วยได้${R.bn?` (${esc(R.bn)})`:''}</small></div>`
 :`<div class="row">ชีวิตนี้ยังไม่เคยข้ามโลก<br><span class="tag2">รอยแยกเปิดได้ใน ยุคปัจจุบัน (เกิดในยุคนี้) · โลกซอมบี้ · โลกฮันเตอร์ ปีละราว ${(RATE()*100).toFixed(1)}% ตั้งแต่อายุ 15 · ยุทธภพมีรอยแยกสู่ยุคปัจจุบันอยู่แล้ว</span></div>`}
 ${V?`<div class="row">🚪 <b>${esc(VIS[V.k].n)}: ${esc(V.n)}</b> <span class="tag2">${V.st>=8?'กลับบ้านแล้ว':V.st===7?'อยู่ในโลกนี้ต่อ':V.st===9?'จากไปแล้ว':'อยู่กับคุณ'}</span></div>`:''}
 <h4 style="margin:10px 0 4px">📖 สมุดรอยแยก</h4><div class="pp">${Object.keys(PAIR).map(k=>`<div class="${B.p&&B.p[k]?'':'no'}">${B.p&&B.p[k]?esc(PAIR[k].n):'❔ ???'}</div>`).join('')}<div class="${B.e&&B.e.vsky?'':'no'}">${B.e&&B.e.vsky?'🌠 ส่งคนปี 2054 กลับบ้าน':'❔ ???'}</div><div class="${B.e&&B.e.vmod?'':'no'}">${B.e&&B.e.vmod?'🏙️ ส่งคนยุคปัจจุบันกลับบ้าน':'❔ ???'}</div></div>
 <p class="tag2">ตอนจบ: ${B.e&&B.e.home?'🏠 กลับบ้าน ':''}${B.e&&B.e.stay?'🌱 อยู่ต่อจนตาย ':''}${!(B.e&&(B.e.home||B.e.stay))?'ยังไม่มี':''}</p></div>`,'rift')};
if(typeof openMenu==='function'){const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(S&&(S.rift||S.rvis)){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.rfM')){const R=S.rift;g.insertAdjacentHTML('beforeend',`<button class="opt rfM" onclick="closeM();openRift()">🌀 รอยแยก<small>${R?(R.done?'กลับบ้านแล้ว':`${esc(PAIR[R.k].n)} · ${R.ys} ปี`):'มีคนจากโลกอื่นอยู่กับคุณ'}</small></button>`)}}}catch(e){}return r}}

// ---------- ตอนจบ ----------
if(typeof endGame==='function'){const _eg=endGame;endGame=function(){let R=null;try{R=S&&S.rift?JSON.parse(JSON.stringify(Object.assign({},S.rift,{home:null}))):null;if(R&&!R.ret&&R.ys>=1)bookS(b=>{b.e.stay=1})}catch(e){}const r=_eg.apply(this,arguments);
 try{if(R)setTimeout(()=>{try{const b=$('end')&&$('end').querySelector('.box.rec');if(!b||b.querySelector('.rfEnd'))return;const P=PAIR[R.k],d=document.createElement('div');d.className='rfEnd rfB';d.style.margin='12px 0';
  const t=R.ret?`🏠 <b>กลับบ้าน</b> — ${R.comp?`พา <b>${esc(R.comp)}</b> ข้ามกลับมาด้วย สองโลกอยู่ในบ้านหลังเดียว`:'คนในอีกโลกเล่าถึงคุณเป็นตำนานคนแปลกหน้าที่หายไปในคืนเดียว'}`:`🌱 <b>อยู่ต่อจนตาย</b> — ${R.ys} ปีใน${esc(P.n.split('→')[1].trim())} ${R.b>R.a?'คุณกลายเป็นคนของโลกนี้เต็มตัว':'บางคืนคุณยังฝันถึงโลกเดิม'}`;
  const x=R.k==='mz_mu'&&R.pl!=null?(R.pl>=4?'<br>🩺 โรคจากโลกซอมบี้ถูกหยุดได้ ตำราการแพทย์ของยุทธภพมีบทใหม่ชื่อ ‘วิชากักโรคของคนแปลกหน้า’':R.pl<=-2?'<br>🧟 ศพที่ไม่ล้มยังเดินอยู่ที่เมืองชายแดน — สิ่งที่คุณพามาจากโลกเดิม':'<br>🤒 โรคแปลกสงบลงเอง แต่หมอเทวดายังจดชื่อคุณไว้ในตำรา'):R.k==='mh_so'?(R.fused?'<br>🌑 หน้าต่างสถานะกลายเป็นดวงจิตเงา ทวีปนี้มีผู้ฝึกจิตที่มาจากเกตเป็นคนแรก':R.nf?'<br>🟦 ผู้ไร้ดวงจิตที่ไม่มีใครล้มได้ — ทวีปเล่าเรื่องคุณเป็นตำนาน':''):'';
  d.innerHTML=`<div class="row"><b>🌀 ${esc(P.n)}</b> · ${HOW[R.how][0]} ${HOW[R.how][1]}${R.orig?` · ชื่อเดิม ${esc(R.orig)}`:''}<br>${t}${x}</div>`;
  const fb=b.querySelector('.nsEnd')||b.querySelector('.fateBox')||b.querySelector('.mtNext');if(fb)fb.before(d);else b.appendChild(d)}catch(e){console.error('rift end',e)}},90)}catch(e){}return r}}
window._rift={cross,offer,goHome,door,tick,visit,visTick,yearly,EV,PAIR,VIS,where};
})();
try{wReady('rift')}catch(e){}
