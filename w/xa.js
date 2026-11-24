// ============================================================
// /w/xa.js 🌌 ก้าวข้ามสามภพ ฉบับเต็ม (โหลดต่อจาก xt.js)
//  1) บทสุดท้ายก่อนจาก: บอกลาคู่ชีวิต · ส่งต่อสำนัก · เผชิญศัตรูคู่แค้น · มินิเกมบันไดแสงเก้าขั้น
//  2) ตอนจบ 11 แบบตามชีวิตที่เล่นมา + ฉากจบเต็มจอ + สมุดตอนจบ (LS murim_xaBook)
//  3) มรดกผู้ก้าวพ้น: เลือกทิ้งร่องรอย 1 อย่างให้ชีวิตถัดไป (LS murim_xaLeg) — พอคุ้ม ไม่ทำลายสมดุล
//  4) เทพผู้เฝ้ามอง: ผู้ก้าวพ้นในอดีตโผล่มาในชีวิตถัดไป (LS murim_xaGods)
//  5) กำแพงผู้ก้าวพ้น (ออนไลน์ xap/xar) · ใครก้าวพ้นเร็วที่สุด
//  ทางเลือก "🏯 อยู่ต่อ" ยังเดินต่อถึงวัฏจักรกัลป์ได้เหมือนเดิม — บทนี้เริ่มเฉพาะตอนเลือกจากไปจริง
// ============================================================
try{(()=>{
const EN=()=>{try{return LANG==='en'}catch(e){return false}};
const L=(th,en)=>EN()?en:th;
const rnd=()=>Math.random(),pick=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),Ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));
const say=(t,c,big)=>{try{log(t,c||'',big)}catch(e){}};
const es=v=>{try{return esc(v)}catch(e){return String(v)}};
const fm=v=>{try{return fmt(v)}catch(e){return String(v)}};
const pw=p=>{try{const g=pctPow(p);S.power+=g;return g}catch(e){return 0}};
const kA=t=>{try{keyAdd(t)}catch(e){}};
const LSg=(k,d)=>{try{const v=LS.get(k,d);return v==null?d:v}catch(e){return d}},LSs=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const WK=()=>{try{if(window._xl&&window._xl.WK)return window._xl.WK()}catch(e){}return'murim'};
const vb=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
const sf=k=>{try{sfx(k)}catch(e){}};
const ASC=/ก้าวข้ามสามภพ|ดินแดนเซียนแท้/;
const HUMAN=()=>['murim','xian','rg'].includes(WK());

// ---------- ตอนจบ 11 แบบ (เรียงตามลำดับความสำคัญ) ----------
const ENDS=[
 {id:'pair',ic:'💞',c:'#ff8ad8',n:['คู่เซียนก้าวพ้น','The Immortal Pair'],d:['สองมือที่จับกันมาทั้งชีวิตไม่ยอมปล่อย แม้ตรงหน้าประตูสุดท้าย ฟ้าดินจึงยอมเปิดทางให้สองคน — เป็นครั้งแรกในรอบหมื่นกัลป์','Two hands that held each other all their lives would not let go, even at the final gate. For the first time in ten thousand kalpas, heaven opened the way for two.'],ok:x=>x.pair},
 {id:'avenge',ic:'⚔️',c:'#ff5a4a',n:['ชำระแค้นก่อนจากไป','Vengeance Fulfilled'],d:['คู่แค้นที่ตามกันมาข้ามชาติล้มลงตรงหน้าประตู ไม่มีหนี้ใดค้างอยู่ในสามภพอีกแล้ว คุณก้าวผ่านไปพร้อมดาบที่ยังอุ่น','The foe who followed you across lives fell before the gate. No debt remains in the Three Realms. You step through with your blade still warm.'],ok:x=>x.nem==='kill'},
 {id:'demon',ic:'😈',c:'#b02aff',n:['มารผู้ทะลวงฟ้า','The Demon Who Pierced Heaven'],d:['สวรรค์ไม่เคยยอมรับคุณ คุณจึงไม่ขออนุญาต ประตูสุดท้ายถูกพังด้วยมือเปื้อนเลือด ตำนานเล่าขานด้วยความหวาดกลัว','Heaven never accepted you, so you never asked. The final gate was torn open by bloodied hands, and the legend is told in fear.'],ok:x=>S.karma<=-60},
 {id:'saint',ic:'🪷',c:'#ffe58a',n:['นักบุญแห่งสามภพ','Saint of the Three Realms'],d:['ผู้คนนับล้านที่คุณเคยช่วยจุดธูปพร้อมกันทั่วแผ่นดิน ควันธูปกลายเป็นบันไดพาคุณขึ้นไป','Millions you once saved lit incense across the land at once, and the smoke became a stair that carried you up.'],ok:x=>S.karma>=100},
 {id:'watch',ic:'♾️',c:'#7ad8ff',n:['ผู้เฝ้ามองกัลป์','Watcher of the Kalpas'],d:['คุณอยู่ต่อจนเห็นภูเขากลายเป็นทะเล เห็นราชวงศ์เกิดและดับนับไม่ถ้วน เมื่อพอแล้วจึงเดินจากไปอย่างไม่เสียดาย','You stayed until mountains became seas and dynasties rose and fell beyond counting. When it was enough, you left without regret.'],ok:x=>S.flags.ascStay&&S.ascAt!=null&&S.age-S.ascAt>=100000},
 {id:'fast',ic:'⚡',c:'#ffd34a',n:['อัจฉริยะพันปี','The Thousand-Year Prodigy'],d:['คนอื่นใช้หมื่นปี คุณใช้ไม่ถึงสองพัน ฟ้าเองยังไม่ทันเตรียมทัณฑ์ให้คุณ','Others needed ten thousand years. You needed less than two thousand. Heaven itself had barely prepared your tribulation.'],ok:x=>(S.ascAt!=null?S.ascAt:S.age)<2000},
 {id:'master',ic:'🏯',c:'#ffb04a',n:['ปรมาจารย์ผู้ส่งไฟ','The Master Who Passed the Flame'],d:['ก่อนจากไป คุณวางตราสำนักไว้ในมือศิษย์เอก แสงจากประตูสุดท้ายส่องลงมาที่ลานฝึก และศิษย์นับพันคุกเข่าพร้อมกัน','Before leaving, you placed the sect seal in your first disciple\'s hand. Light from the final gate shone on the training yard, and a thousand disciples knelt as one.'],ok:x=>x.sect==='pass'},
 {id:'peace',ic:'🕊️',c:'#cfe8ff',n:['ปล่อยวางทุกความแค้น','All Grudges Released'],d:['คุณยื่นมือให้ศัตรูที่ตามล่าคุณมาข้ามชาติ ห่วงโซ่แห่งกรรมขาดลงตรงนั้น ทั้งสองคนต่างเป็นอิสระ','You offered your hand to the foe who hunted you across lives. The chain of karma broke there, and both of you were free.'],ok:x=>x.nem==='peace'},
 {id:'lone',ic:'🌫️',c:'#9aa',n:['ผู้ก้าวพ้นที่ไม่มีใครจำ','The Forgotten Ascendant'],d:['ไม่มีใครรู้ว่าคุณมาถึงตรงนี้ ไม่มีบันทึก ไม่มีศาลเจ้า มีแค่ลมที่พัดผ่านยอดเขาว่างเปล่า — และคุณก็ชอบมันแบบนั้น','No one knows you made it here. No records, no shrine, only wind over an empty peak. And you liked it that way.'],ok:x=>(S.fame||0)<30},
 {id:'flaw',ic:'✨',c:'#fff',n:['ก้าวพ้นอย่างไร้ที่ติ','The Flawless Ascent'],d:['บันไดแสงเก้าขั้นไม่สั่นแม้แต่ขั้นเดียว เซียนแท้ทั้งดินแดนออกมายืนรับ เพราะไม่มีใครเดินได้สวยขนาดนี้มานานแล้ว','Not one of the nine steps of light trembled. The true immortals came out to greet you, for no one had walked so beautifully in ages.'],ok:x=>x.gate>=1},
 {id:'dao',ic:'☯️',c:'#ffd76a',n:['บรรพชนเต๋า','Ancestor of the Dao'],d:['คุณเดินผ่านประตูดินแดนเซียนแท้ไปอย่างสงบ ชื่อของคุณกลายเป็นหนึ่งในบรรพชนที่คนรุ่นหลังกราบไหว้','You walked through the gate to the true immortal realm in peace. Your name became one of the ancestors that later generations bow to.'],ok:()=>true}];
const endOf=x=>ENDS.find(e=>{try{return e.ok(x)}catch(_){return false}})||ENDS[ENDS.length-1];
window._xaEnds=ENDS;

// ---------- มรดก ----------
const LEG={
 heir:{ic:'🧬',n:['สายเลือดผู้ก้าวพ้น','Bloodline of the Ascendant'],d:['ชีวิตถัดไป (ยุทธภพ/เซียน/ย้อนกาล) เกิดมาพร้อมชื่อเสียงตระกูล +20 และพลังยุทธ์เพิ่มเล็กน้อยตอนอายุ 16','Next life (Murim/Xian/Regressor) starts with +20 family fame and a small power boost at age 16']},
 scroll:{ic:'📜',n:['คัมภีร์ที่ทิ้งไว้','The Scripture Left Behind'],d:['ชีวิตถัดไป อายุ 12 จะเจอคัมภีร์ที่คุณซ่อนไว้ (วิชาระดับกลาง ไม่เกินขั้นที่ 3)','Next life, at age 12 you find the scripture you hid (a mid-tier art, tier 3 at most)']},
 bless:{ic:'🌟',n:['พรคุ้มกาย','Blessing of Protection'],d:['ชีวิตถัดไป พลังชีวิตสูงสุด +10% และกรรม +10 ตั้งแต่เกิด','Next life, max HP +10% and karma +10 from birth']}};

// ---------- มินิเกม: บันไดแสงเก้าขั้น ----------
const MG=window._mg2G||(window._mg2G={});
MG.xaGate={n:'บันไดแสงเก้าขั้น',ic:'🌌',mt:'ผู้เดินบนแสง',how:'วงแสงแกว่งไปมา แตะตอนวงอยู่ในช่องทองเพื่อก้าวขึ้นหนึ่งขั้น · ขั้นสูงขึ้นช่องจะแคบลงและวงเร็วขึ้น · พลาดได้ 2 ครั้ง',t:40,rw:()=>'',
 init(B2,api){let st=0,miss=0,x=0,v=1.2,stop=0;
  B2.innerHTML=`<div class="tag2" id="xaH" style="text-align:center"></div><div id="xaA" style="position:relative;height:120px;margin-top:10px;border-radius:14px;background:linear-gradient(90deg,#0a0820,#1c1650,#0a0820);overflow:hidden;touch-action:manipulation"><div id="xaZ" style="position:absolute;top:0;bottom:0;background:#ffd76a44;border-left:2px solid #ffd76a;border-right:2px solid #ffd76a"></div><div id="xaO" style="position:absolute;top:50%;width:34px;height:34px;margin:-17px;border-radius:50%;background:radial-gradient(#fff,#ffe9a0 50%,#ffd76a00 72%);box-shadow:0 0 22px #ffd76a"></div></div><div id="xaS" style="display:flex;gap:4px;justify-content:center;margin-top:10px">${[...Array(9)].map(()=>'<i style="width:22px;height:10px;border-radius:3px;background:#2a2450;display:inline-block"></i>').join('')}</div>`;
  const H=B2.querySelector('#xaH'),A=B2.querySelector('#xaA'),Z=B2.querySelector('#xaZ'),O=B2.querySelector('#xaO'),St=[...B2.querySelectorAll('#xaS i')];
  let zc=50,zw=30;const zone=()=>{zw=Math.max(9,30-st*2.4)*Math.sqrt(api.ez||1);zc=Ri(Math.ceil(zw/2)+4,96-Math.ceil(zw/2));Z.style.left=(zc-zw/2)+'%';Z.style.width=zw+'%'};
  const upd=()=>{H.textContent=`🌌 ${L('ขั้นที่','Step')} ${st}/9 · ${L('พลาด','Missed')} ${miss}/2`;St.forEach((s,i)=>s.style.background=i<st?'#ffd76a':'#2a2450')};zone();upd();
  A.onpointerdown=e=>{e.preventDefault();if(!api.live()||stop)return;if(Math.abs(x-zc)<=zw/2){st++;vb(20);A.style.boxShadow='0 0 30px #ffd76a';setTimeout(()=>A.style.boxShadow='',150);if(st>=9){api.end();return}v=(1.2+st*.22)/Math.sqrt(api.ez||1);zone()}else{miss++;vb([60,30,60]);A.style.boxShadow='0 0 30px #ff4a4a';setTimeout(()=>A.style.boxShadow='',200);if(miss>2){api.end();return}}upd()};
  let d=1;const iv=setInterval(()=>{if(stop)return;x+=v*d;if(x>=97){x=97;d=-1}if(x<=3){x=3;d=1}O.style.left=x+'%'},16);
  return{sc:()=>cl(st/9,0,1),stop(){stop=1;clearInterval(iv)}}}};

// ---------- บทสุดท้าย ----------
const C=(t,x,o)=>{window._xaC=1;try{choice(t,x,o.map(a=>Object.assign({noFate:1},a)))}catch(e){console.error(e)}finally{window._xaC=0}};
// ระหว่างบทสุดท้าย ไม่ให้เหตุการณ์อื่นแทรก
{const _ch=choice;choice=function(){try{if(S&&S._xa&&S._xa.run&&!window._xaC)return}catch(e){}return _ch.apply(this,arguments)};for(const k in _ch)try{choice[k]=_ch[k]}catch(e){}}
const nemRec=()=>{try{const n=LSg('murim_xlNem',null);if(n&&n.n&&!n.peace)return n}catch(e){}return null};
function startFinal(){const x=S._xa={run:1,pair:0,sect:'',nem:'',gate:0};try{choice._q=[];if(choice._cur&&modalOpen&&$('modal').dataset.k==='choice'){choice._cur=null;closeM()}}catch(e){}
 const steps=[];
 steps.push(nx=>C(L('🌌 ก่อนก้าวผ่านประตู','🌌 Before the Gate'),L('ประตูดินแดนเซียนแท้เปิดรออยู่ แต่ในใจยังมีบางอย่างที่ต้องปิดให้จบ<br><span class="tag2">บทสุดท้ายจะตัดสินว่าคุณได้ตอนจบแบบไหน และทิ้งอะไรไว้ให้ชีวิตถัดไป</span>','The gate to the true immortal realm awaits, but something in your heart still needs closing.<br><span class="tag2">This final chapter decides your ending and what you leave for your next life</span>'),[
  {t:L('📖 เริ่มบทสุดท้าย','📖 Begin the final chapter'),f(){nx()}},
  {t:L('🌌 ไม่มีอะไรค้างแล้ว เดินผ่านไปเลย','🌌 Nothing left. Walk through'),s:L('ข้ามไปที่บันไดแสง','Skip to the stair of light'),f(){steps.splice(1,steps.length-3);nx()}}]));
 if(S.spouse&&typeof S.spouse==='string')steps.push(nx=>C(L('💞 คนที่อยู่ข้างกายมาทั้งชีวิต','💞 The One Beside You'),L(`<b>${es(S.spouse)}</b> ยืนอยู่ที่ตีนบันได "เจ้าจะไปแล้วใช่ไหม"`,`<b>${es(S.spouse)}</b> stands at the foot of the stair. "You are leaving, aren't you?"`),[
  {t:L('🤝 จูงมือไปด้วยกัน','🤝 Take their hand and go together'),s:L('ฟ้าอาจไม่ยอม ต้องเดินบันไดให้ดีพอ','Heaven may refuse. You must climb well enough'),f(){x.pairTry=1;nx()}},
  {t:L('🫂 บอกลา แล้วไปคนเดียว','🫂 Say goodbye and go alone'),f(){kA(L(`บอกลา${S.spouse}ก่อนก้าวข้ามสามภพ`,`Said goodbye to ${S.spouse} before transcending`));say(L(`🫂 คุณกอด${es(S.spouse)}เป็นครั้งสุดท้าย "รอข้าในชาติหน้า"`,`🫂 You embrace ${es(S.spouse)} one last time. "Wait for me in the next life."`),'epic');nx()}}]));
 if(S.ownSect&&S.ownSect.n)steps.push(nx=>C(L('🏯 สำนักที่สร้างมากับมือ','🏯 The Sect You Built'),L(`ศิษย์ของ<b>${es(S.ownSect.n)}</b> มารวมกันที่ลานฝึก ทุกคนรอคำสั่งสุดท้าย`,`The disciples of <b>${es(S.ownSect.n)}</b> gather in the yard, awaiting your last order`),[
  {t:L('🔥 ส่งต่อให้ศิษย์เอก','🔥 Pass it to your first disciple'),f(){x.sect='pass';kA(L(`ส่งต่อ${S.ownSect.n}ให้ศิษย์เอกก่อนจากไป`,`Passed ${S.ownSect.n} to the first disciple`));nx()}},
  {t:L('🍂 ยุบสำนัก ให้ทุกคนเป็นอิสระ','🍂 Disband it and set everyone free'),f(){x.sect='end';nx()}},
  {t:L('🚶 จากไปเงียบๆ','🚶 Leave quietly'),f(){nx()}}]));
 {const n=nemRec();const nm=n?n.n:(rnd()<.4?(()=>{try{return anyName()}catch(e){return L('ศัตรูเก่า','An old foe')}})():null);
  if(nm)steps.push(nx=>C(L('⚔️ เงาที่รออยู่หน้าประตู','⚔️ The Shadow at the Gate'),n?L(`<b>${es(nm)}</b> คู่แค้นที่ตามคุณมา ${n.lives|0} ชาติ ขวางบันไดไว้ "ข้าไม่ยอมให้เจ้าหนีไปง่ายๆ"`,`<b>${es(nm)}</b>, the foe who has followed you for ${n.lives|0} lives, blocks the stair. "I won't let you escape so easily."`):L(`<b>${es(nm)}</b> ศัตรูเก่าที่คุณเกือบลืมไปแล้ว รอคุณอยู่ตรงนี้มาทั้งชีวิต`,`<b>${es(nm)}</b>, an old foe you had nearly forgotten, has waited here your whole life`),[
   {t:L('⚔️ สู้ครั้งสุดท้าย','⚔️ One last fight'),f(){S.hp=S.maxHp;try{duel(nm,Math.round(S.power*(.85+rnd()*.3)),w=>{S.hp=Math.max(S.hp,1);if(w){x.nem='kill';kA(L(`ชำระแค้นกับ${nm}หน้าประตูสุดท้าย`,`Settled the feud with ${nm} at the final gate`));if(n){n.lives=(n.lives|0)+1;n.done=1;LSs('murim_xlNem',null)}}else say(L(`⚔️ ${es(nm)}หัวเราะแล้วหายไปในหมอก "ไว้เจอกันใหม่"`,`⚔️ ${es(nm)} laughs and vanishes into the mist. "Until next time."`),'bad');setTimeout(nx,400)})}catch(e){nx()}}},
   {t:L('🕊️ ยื่นมือให้อภัย','🕊️ Offer forgiveness'),f(){x.nem='peace';if(n){n.peace=1;LSs('murim_xlNem',n)}kA(L(`ให้อภัย${nm}ก่อนก้าวข้ามสามภพ`,`Forgave ${nm} before transcending`));say(L(`🕊️ ${es(nm)}นิ่งไปนาน แล้วก้มหัวให้คุณ ห่วงโซ่แห่งกรรมขาดลง`,`🕊️ ${es(nm)} stands silent a long time, then bows. The chain of karma breaks.`),'epic');nx()}}]))}
 steps.push(nx=>{const go=()=>{try{mg2Play('xaGate',{},(sc,sk)=>{x.gate=sk?.5:sc;if(x.pairTry&&x.gate>=.67)x.pair=1;else if(x.pairTry)say(L(`💞 บันไดสั่นไหว มือของ${es(S.spouse)}หลุดออก "ไปเถอะ ข้าจะรอ"`,`💞 The stair shook and ${es(S.spouse)}'s hand slipped away. "Go. I'll wait."`),'bad');nx()})}catch(e){x.gate=.5;nx()}};
  C(L('🌌 บันไดแสงเก้าขั้น','🌌 The Nine Steps of Light'),L('ขั้นสุดท้ายของชีวิตนี้ ก้าวให้มั่นทุกขั้น'+(x.pairTry?`<br><span class="tag2">💞 ต้องขึ้นให้ได้อย่างน้อย 6 ขั้น จึงพา${es(S.spouse)}ไปด้วยได้</span>`:'')+'<br><span class="tag2">ขึ้นได้ 6 ขั้นขึ้นไป = ได้เลือกมรดกครบ 3 อย่าง</span>','The last steps of this life. Make every one count.'+(x.pairTry?`<br><span class="tag2">💞 Reach at least 6 steps to bring ${es(S.spouse)} with you</span>`:'')+'<br><span class="tag2">Climb 6+ steps to choose from all 3 legacies</span>'),[{t:L('🌌 เริ่มก้าว','🌌 Begin the climb'),f(){setTimeout(go,200)}}])});
 steps.push(()=>finale(x));
 let i=0;const nx=()=>{const f=steps[i++];if(f)setTimeout(()=>{try{f(nx)}catch(e){console.error('xa',e);nx()}},250)};nx()}

function finale(x){const E=endOf(x);const B=LSg('murim_xaBook',{})||{};const fresh=!B[E.id];B[E.id]=(B[E.id]||0)+1;LSs('murim_xaBook',B);x.end=E.id;
 const age=S.ascAt!=null?S.ascAt:S.age;
 show(E,fresh,age,()=>legacy(x,E,()=>{
  try{const G=LSg('murim_xaGods',[])||[];G.unshift({n:String(S.name||'').slice(0,20),e:E.id,a:age|0});LSs('murim_xaGods',G.slice(0,6))}catch(e){}
  try{api('xap',{n:String(S.name||'').slice(0,20),e:E.id,a:age|0})}catch(e){}
  kA(L(`ตอนจบ: ${E.n[0]}`,`Ending: ${E.n[1]}`));
  S._xa.run=0;S._xaOK=1;S.deathCause=L(`${E.n[0]} · ก้าวข้ามสามภพไปตลอดกาล`,`${E.n[1]} · transcended the Three Realms forever`);S.hp=0;
  setTimeout(()=>{try{checkDeath()}catch(e){console.error(e)}},150)}))}

function show(E,fresh,age,done){const B=LSg('murim_xaBook',{})||{};const got=ENDS.filter(e=>B[e.id]).length;
 const d=document.createElement('div');d.id='xaEnd';d.style.setProperty('--ec',E.c);
 d.innerHTML=`<div class="xaDoor l"></div><div class="xaDoor r"></div><div class="xaRay"></div>${[...Array(26)].map(()=>`<i class="xaMote" style="left:${Ri(0,100)}%;animation-delay:${Ri(0,2600)}ms;animation-duration:${Ri(2600,4600)}ms"></i>`).join('')}
 <div class="xaBox"><div class="xaK">${L('ตอนจบ','ENDING')} ${ENDS.indexOf(E)+1}/${ENDS.length}${fresh?` · <b>🆕 ${L('ปลดล็อกใหม่','NEW')}</b>`:''}</div><div class="xaIc">${E.ic}</div><div class="xaN">${es(L(E.n[0],E.n[1]))}</div><div class="xaD">${es(L(E.d[0],E.d[1]))}</div>
 <div class="xaSt">${es(S.name||'')} · ${L('ก้าวพ้นเมื่ออายุ','ascended at age')} ${fm(age)} · ${L('สะสมตอนจบ','endings found')} ${got}/${ENDS.length}</div><div class="xaTap">${L('แตะเพื่อไปต่อ','tap to continue')}</div></div>`;
 document.body.appendChild(d);sf('realm');vb([60,40,160]);let ok=0;setTimeout(()=>{ok=1},1800);
 d.addEventListener('pointerdown',e=>{e.stopPropagation();if(!ok)return;d.classList.add('out');setTimeout(()=>{try{d.remove()}catch(_){}done()},400)},true)}

function legacy(x,E,done){const ks=Object.keys(LEG);let opt=x.gate>=.67?ks:ks.sort(()=>rnd()-.5).slice(0,2);
 const cur=LSg('murim_xaLeg',null);
 C(L('🕯️ ทิ้งอะไรไว้ให้ชีวิตถัดไป','🕯️ What Will You Leave Behind?'),L('เลือกร่องรอย 1 อย่าง ชีวิตถัดไปของคุณจะได้รับมัน','Choose one trace. Your next life will receive it')+(cur?`<br><span class="tag2">${L('มีมรดกที่ยังไม่ได้ใช้อยู่ จะถูกแทนที่','An unused legacy is waiting and will be replaced')}</span>`:'')+(opt.length<3?`<br><span class="tag2">${L('ขึ้นบันไดได้ไม่ถึง 6 ขั้น จึงมีให้เลือก 2 อย่าง','You climbed fewer than 6 steps, so only 2 choices appear')}</span>`:''),
  opt.map(k=>({t:`${LEG[k].ic} ${L(LEG[k].n[0],LEG[k].n[1])}`,s:L(LEG[k].d[0],LEG[k].d[1]),f(){LSs('murim_xaLeg',{k,n:String(S.name||'').slice(0,20),e:E.id});done()}})).concat([{t:L('ไม่ทิ้งอะไรไว้','Leave nothing'),f(){done()}}]))}

// ---------- จับจังหวะ "จากไป" ----------
{const _cd=checkDeath;checkDeath=function(){try{if(S&&S.alive){if(S._xa&&S._xa.run){if(S.hp<=0)S.hp=1;return}
   if(S.hp<=0&&S.flags&&S.flags.ascended&&S.xt&&!S._xaOK&&ASC.test(S.deathCause||'')){S.hp=1;S.flags.ascLeft=1;startFinal();return}}}catch(e){console.error('xa',e)}return _cd.apply(this,arguments)}}
{const _py=passYear;passYear=function(){if(S&&S._xa&&S._xa.run)return;let w=0;try{w=tick()}catch(e){console.error('xa tick',e)}if(w)return;return _py.apply(this,arguments)}}

// ---------- มรดก + เทพผู้เฝ้ามอง ในชีวิตถัดไป ----------
function tick(){if(!S||!S.alive)return;
 if(!S._xaL0&&HUMAN()){S._xaL0=1;const g=LSg('murim_xaLeg',null);if(g&&LEG[g.k]){LSs('murim_xaLeg',null);S._xaLg=g;const T=LEG[g.k];
   if(g.k==='heir'){S.fame=(S.fame||0)+20;say(L(`🧬 ผู้คนกระซิบกันว่าตระกูลคุณสืบเชื้อสายจาก <b>${es(g.n)}</b> ผู้ก้าวข้ามสามภพ (ชื่อเสียง +20)`,`🧬 People whisper that your family descends from <b>${es(g.n)}</b>, who transcended the Three Realms (fame +20)`),'myth',true)}
   if(g.k==='bless'){S.maxHp=Math.round(S.maxHp*1.1);S.hp=S.maxHp;S.karma=(S.karma||0)+10;say(L(`🌟 แสงอุ่นๆ ห่อตัวคุณตั้งแต่แรกเกิด พรของ <b>${es(g.n)}</b> (พลังชีวิตสูงสุด +10% · กรรม +10)`,`🌟 A warm light has wrapped you since birth: the blessing of <b>${es(g.n)}</b> (max HP +10% · karma +10)`),'myth',true)}
   if(g.k==='scroll')say(L(`📜 คุณฝันถึงถ้ำหลังน้ำตกซ้ำๆ เหมือนมีคนทิ้งอะไรไว้ให้`,`📜 You keep dreaming of a cave behind a waterfall, as if someone left something for you`),'epic')}}
 const g=S._xaLg;
 if(g&&g.k==='heir'&&!g.d16&&S.age>=16){g.d16=1;const p=pw(.03);say(L(`🧬 เลือดผู้ก้าวพ้นในตัวคุณตื่นขึ้น (พลังยุทธ์ +${fm(p)})`,`🧬 The ascendant blood in you awakens (power +${fm(p)})`),'epic')}
 if(g&&g.k==='scroll'&&!g.d12&&S.age>=12){g.d12=1;try{const a=newArt(0);if((a.r||0)>2){a.r=2;try{a.tier=ART_TIER[2].n;a.b=Math.min(a.b,ART_TIER[2].b*1.2|0)}catch(e){}}a.n=a.n||L('คัมภีร์บรรพชน','Ancestor\'s Scripture');if(!S.arts.some(z=>z.n===a.n))artLearned(a,L(`📜 หลังน้ำตกในฝัน มีคัมภีร์ที่ <b>${es(g.n)}</b> ซ่อนไว้จริงๆ — ได้${artHtml(a)}`,`📜 Behind the waterfall from your dreams lies the scripture <b>${es(g.n)}</b> hid — you gain ${artHtml(a)}`))}catch(e){console.error(e)}}
 // เทพผู้เฝ้ามอง
 if(S._xaW||!HUMAN()||S.age<8||S.age>90||choice._cur||modalOpen)return;const G=LSg('murim_xaGods',[])||[];if(!G.length)return;
 const low=S.hp<S.maxHp*.35;if(rnd()>(low?.06:.012))return;S._xaW=1;const o=pick(G),E=ENDS.find(e=>e.id===o.e)||ENDS[ENDS.length-1];const who=`${E.ic} <b>${es(o.n)}</b>`;
 if(low){S.hp=S.maxHp;say(L(`${who} ผู้ก้าวพ้นสามภพ ยื่นมือลงมาจากเมฆ บาดแผลของคุณหายสนิท "ยังไม่ถึงเวลาของเจ้า"`,`${who}, who transcended the Three Realms, reaches down from the clouds. Your wounds close. "It is not your time yet."`),'myth',true);return}
 if(rnd()<.5){const p=pw(.01);S.karma=(S.karma||0)+5;say(L(`${who} ปรากฏในความฝัน กระซิบคำทำนายสั้นๆ ก่อนหายไป (พลังยุทธ์ +${fm(p)} · กรรม +5)`,`${who} appears in a dream, whispers a short prophecy, then fades (power +${fm(p)} · karma +5)`),'epic');return}
 return void C(L('🌌 บททดสอบจากผู้ก้าวพ้น','🌌 A Trial from the Ascendant'),L(`ร่างเงาของ${who} ยืนอยู่บนยอดเขา "ข้าเคยเดินบันไดนี้ เจ้าล่ะ เดินได้ไหม"`,`The shade of ${who} stands on the peak. "I once climbed this stair. Can you?"`),[
  {t:L('🌌 รับบททดสอบ','🌌 Accept the trial'),f(){setTimeout(()=>{try{mg2Play('xaGate',{},(sc,sk)=>{if(!sk&&sc>=.67){const p=pw(.03);say(L(`${who} พยักหน้า "ไม่เลว" (พลังยุทธ์ +${fm(p)})`,`${who} nods. "Not bad." (power +${fm(p)})`),'epic')}else say(L(`${who} ยิ้ม "กลับมาลองใหม่ในชาติหน้า"`,`${who} smiles. "Try again in another life."`),'')})}catch(e){}},200)}},
  {t:L('🙇 ก้มหัวคารวะแล้วจากไป','🙇 Bow and leave'),f(){S.karma=(S.karma||0)+2}}])}

// ---------- แผง + กำแพงผู้ก้าวพ้น ----------
window.xaPanel=function(){const B=LSg('murim_xaBook',{})||{},G=LSg('murim_xaGods',[])||[],g=LSg('murim_xaLeg',null);const got=ENDS.filter(e=>B[e.id]).length;
 let h=`<h3>🌌 ${L('ผู้ก้าวพ้นสามภพ','The Ascendants')}</h3><p class="tag2">${L('ผ่านทัณฑ์สุดท้ายของโลกเทพแล้วเลือก 🌌 จากไป จะเข้าสู่บทสุดท้าย · ถ้าเลือก 🏯 อยู่ต่อ จะเดินไปถึงวัฏจักรกัลป์ได้ และกดจากไปทีหลังได้เสมอ','Pass the final tribulation of the God World and choose 🌌 Leave to enter the final chapter. Choose 🏯 Stay to continue toward the Kalpa Cycle; you can always leave later')}</p>
 <h4>📖 ${L('สมุดตอนจบ','Ending Book')} ${got}/${ENDS.length}</h4><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px">${ENDS.map(e=>B[e.id]?`<div class="tag2" style="border:1px solid ${e.c};border-radius:10px;padding:6px"><b>${e.ic} ${es(L(e.n[0],e.n[1]))}</b><br><span style="font-size:11px;opacity:.8">×${B[e.id]}</span></div>`:`<div class="tag2" style="border:1px dashed #555;border-radius:10px;padding:6px;opacity:.55">❔ ???</div>`).join('')}</div>
 <h4>🕯️ ${L('มรดกที่รอชีวิตถัดไป','Legacy Awaiting Your Next Life')}</h4><p class="tag2">${g&&LEG[g.k]?`${LEG[g.k].ic} <b>${es(L(LEG[g.k].n[0],LEG[g.k].n[1]))}</b> ${L('จาก','from')} ${es(g.n)} — ${es(L(LEG[g.k].d[0],LEG[g.k].d[1]))}`:L('ยังไม่มี','None yet')}</p>
 <h4>👁️ ${L('เทพผู้เฝ้ามอง','Watching Ascendants')}</h4><p class="tag2">${G.length?G.map(o=>{const e=ENDS.find(z=>z.id===o.e)||ENDS[ENDS.length-1];return`${e.ic} ${es(o.n)}`}).join(' · ')+`<br>${L('อาจโผล่มาช่วย ทำนาย หรือทดสอบคุณในชีวิตถัดไป','They may appear to save, guide, or test you in later lives')}`:L('ยังไม่มีใครก้าวพ้น','No one has ascended yet')}</p>
 <h4>🧱 ${L('กำแพงผู้ก้าวพ้น','Wall of Ascendants')}</h4><div id="xaWall" class="tag2">${L('กำลังโหลด…','Loading…')}</div><button class="gbtn" style="width:100%;margin-top:10px" onclick="closeM()">${L('ปิด','Close')}</button>`;
 modal(h,'xa');
 try{const p=api('xar');if(p&&p.then)p.then(j=>{const w=document.getElementById('xaWall');if(!w)return;const row=o=>{const e=ENDS.find(z=>z.id===o.e)||ENDS[ENDS.length-1];return`${e.ic} <b>${es(o.n)}</b> · ${es(L(e.n[0],e.n[1]))} · ${L('อายุ','age')} ${fm(o.a|0)}`};
   const F=(j&&j.F)||[],R=(j&&j.R)||[];w.innerHTML=(F.length?`<b>⚡ ${L('ก้าวพ้นเร็วที่สุด','Fastest Ascensions')}</b><br>${F.map((o,i)=>`${i+1}. ${row(o)}`).join('<br>')}<br><br>`:'')+(R.length?`<b>🕯️ ${L('ล่าสุด','Most Recent')}</b><br>${R.map(row).join('<br>')}`:L('ยังไม่มีใครสลักชื่อ เป็นคนแรกสิ','No names carved yet. Be the first'))}).catch(()=>{const w=document.getElementById('xaWall');if(w)w.textContent=L('เชื่อมต่อไม่ได้','Could not connect')})}catch(e){}};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const m=$('modal');const B=LSg('murim_xaBook',{})||{};if(S&&S.alive&&m&&!m.querySelector('.xaB')&&(S.xt||Object.keys(B).length||(LSg('murim_xaGods',[])||[]).length)){const b=document.createElement('button');b.className='gbtn xaB';b.style.cssText='width:100%;margin-top:6px';b.textContent='🌌 '+L('ผู้ก้าวพ้นสามภพ','The Ascendants');b.onclick=()=>xaPanel();m.appendChild(b)}}catch(e){}return r}}

const st=document.createElement('style');st.textContent=`
#xaEnd{position:fixed;inset:0;z-index:100000;background:#000;overflow:hidden;cursor:pointer;animation:xaF .6s}#xaEnd.out{animation:xaO .4s forwards}@keyframes xaF{from{opacity:0}}@keyframes xaO{to{opacity:0}}
#xaEnd .xaDoor{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(90deg,#1a1408,#3a2c10);border:2px solid #6a5020;z-index:3;animation:xaDoor 1.6s .3s cubic-bezier(.6,0,.3,1) forwards}#xaEnd .xaDoor.l{left:0}#xaEnd .xaDoor.r{right:0;--d:100%}#xaEnd .xaDoor.l{--d:-100%}@keyframes xaDoor{to{transform:translateX(var(--d))}}
#xaEnd .xaRay{position:absolute;left:50%;top:50%;width:220vmax;height:220vmax;margin:-110vmax;background:repeating-conic-gradient(from 0deg,var(--ec) 0 4deg,transparent 4deg 16deg);opacity:.16;animation:xaSpin 30s linear infinite;z-index:1}@keyframes xaSpin{to{transform:rotate(360deg)}}
#xaEnd::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#fff 0,var(--ec) 18%,#0a0614 65%);opacity:.55;z-index:0}
#xaEnd .xaMote{position:absolute;bottom:-10px;width:5px;height:5px;border-radius:50%;background:#fff;box-shadow:0 0 10px var(--ec);z-index:2;animation:xaUp linear infinite}@keyframes xaUp{to{transform:translateY(-110vh);opacity:0}}
#xaEnd .xaBox{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,88vw);text-align:center;color:#fff;z-index:4;opacity:0;animation:xaIn .8s 1.4s forwards}@keyframes xaIn{from{opacity:0;transform:translate(-50%,-40%)}to{opacity:1;transform:translate(-50%,-50%)}}
#xaEnd .xaK{font-size:12px;letter-spacing:3px;opacity:.8}#xaEnd .xaK b{color:#ffd76a}
#xaEnd .xaIc{font-size:64px;margin:8px 0;filter:drop-shadow(0 0 18px var(--ec))}
#xaEnd .xaN{font-size:clamp(26px,8vw,40px);font-weight:900;color:var(--ec);text-shadow:0 0 14px var(--ec),0 0 34px #000}
#xaEnd .xaD{font-size:15px;line-height:1.6;margin-top:12px;text-shadow:0 1px 6px #000;background:#0008;border-radius:12px;padding:10px 14px}
#xaEnd .xaSt{font-size:12px;opacity:.8;margin-top:12px}#xaEnd .xaTap{font-size:12px;opacity:.6;margin-top:18px;animation:xaB 1.2s infinite alternate}@keyframes xaB{to{opacity:.2}}
@media(prefers-reduced-motion:reduce){#xaEnd *{animation-duration:.01s!important}}`;document.head.appendChild(st);
try{Object.assign(I18N.d,{'ผู้ก้าวพ้นสามภพ':'The Ascendants','บันไดแสงเก้าขั้น':'The Nine Steps of Light','ผู้เดินบนแสง':'Walker of Light','วงแสงแกว่งไปมา แตะตอนวงอยู่ในช่องทองเพื่อก้าวขึ้นหนึ่งขั้น · ขั้นสูงขึ้นช่องจะแคบลงและวงเร็วขึ้น · พลาดได้ 2 ครั้ง':'A ring of light swings back and forth. Tap when it is inside the gold zone to climb one step. Higher steps have narrower zones and faster rings. You may miss twice'})}catch(e){}
window._xa={startFinal,endOf,ENDS,tick};
})()}catch(e){console.error('xa',e)}
try{wReady('xa')}catch(e){}
