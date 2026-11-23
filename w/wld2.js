// ============================================================
// /w/wld2.js 🌐 กลไกประจำโลก (โหลดต่อจาก hrt.js · BLOCK 208)
//  ⚔️ ยุทธภพ: 🗡️ อาวุธมีชีวิต (ตีดาบ → นิสัยตามกรรม → ภักดีหรือทรยศในศึกชี้ชะตา → ตายแล้วกลายเป็นของสืบทอด) · 🕵️ ศิษย์คนไหนหักหลัง (มินิเกมจับพิรุธ)
//  ☁️ เซียน: ⚗️ เตาหลอมโอสถ (มินิเกมคุมไฟ · สูตรที่ค้นพบสะสมข้ามชาติ LS murim_recipe)
//  🐾 สัตว์อสูร: 🐺 ผู้สืบทอดฝูง (ลูก 3 ตัวนิสัยต่างกัน · ตัวที่ไม่ได้เลือกกลับมาท้าชิง · มินิเกมอ่านท่าคู่ต่อสู้)
//  🏙️ ยุคปัจจุบัน: 🎓 งานเลี้ยงรุ่น (เพื่อนเก่าจำเรื่องที่คุณเคยทำตอนเด็ก — ดึงจากความทรงจำจริงของชีวิตนี้)
//  🌠 ทะลุฟ้าดารา: 🧬 ยีนกลืนความเป็นคน (มาตรความเป็นมนุษย์ · มินิเกมต่อสายยีน · ครอบครัวจำไม่ได้ · จุดเปลี่ยนร่าง)
//  🌉 ม่านหมอก: 🏮 วัตถุต้องสาปมีราคา (ตะเกียงเห็นความจริงกินหลักยึด) · 📁 คดีข้ามชาติ (LS murim_fogcase)
//  ⭕ วิญญาณยุทธ์: 🐉 ดวงจิตมีอารมณ์ (คุย ง้อ ทะเลาะ · ศึกสำคัญดวงจิตอาจไม่ยอมออก)
//  สถานะ S._wd
// ============================================================
try{(()=>{
const H=window._hrt;if(!H){console.warn('wld2: ต้องโหลด hrt ก่อน');return}
const {game}=H,wk=H.wk;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),rp=a=>a[Math.floor(Math.random()*a.length)],P=p=>Math.random()<p,shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const E=s=>{try{return esc(String(s))}catch(e){return String(s)}};
const W=()=>{if(!S._wd)S._wd={y:-1};return S._wd};
const say=(t,k)=>{try{log(t,k||'')}catch(e){}};const key=t=>{try{keyAdd(t)}catch(e){}};
const fx=o=>{try{if(o.joy)S.happy=Math.max(0,Math.min(100,(+S.happy||50)+o.joy));if(o.hp){S.maxHp=Math.max(10,(+S.maxHp||100)+o.hp);S.hp=Math.min(S.maxHp,Math.max(1,(+S.hp||1)+o.hp))}if(o.mon)S.money=Math.max(0,(+S.money||0)+o.mon);if(o.karma)S.karma=(+S.karma||0)+o.karma;if(o.fame)S.fame=(+S.fame||0)+o.fame;if(o.life)S.lifespan=(+S.lifespan||60)+o.life;if(o.pow)S.power=(+S.power||0)+o.pow;if(o.int)S.int=(+S.int||0)+o.int}catch(e){}};
const pp=f=>Math.round((+S.power||10)*f);
const busy=()=>{try{return !S||!S.alive||!!choice._cur||!!modalOpen||!!document.getElementById('ghr')||!!document.getElementById('hrtOv')||!!document.querySelector('.kfx')}catch(e){return true}};
const ovE=()=>document.getElementById('hrtOv');
const ov=h=>{let o=ovE();if(!o){o=document.createElement('div');o.id='hrtOv';document.body.appendChild(o)}o.innerHTML=`<div class="hB">${h}</div>`;o.scrollTop=0;return o};
const ovX=()=>{const o=ovE();if(o)o.remove();try{render()}catch(e){}};
const done=(ok,t,cb)=>{ov(`<div class="hRes ${ok?'ok':'bad'}">${t}</div><button class="hO" id="wdOk">ไปต่อ</button>`);document.getElementById('wdOk').onclick=()=>{ovX();cb&&setTimeout(()=>cb(ok),150)}};

// ============================================================
// ⚔️ ยุทธภพ / ☁️ เซียน (มนุษย์): 🗡️ อาวุธมีชีวิต
// ============================================================
const WPN=['ดาบ','กระบี่','ทวน','มีดบิน','พัดเหล็ก'];
function forge(cb){if(auto)return cb(rnd(2,5));let k=0,sc=0,pos=0,dir=1,iv=0;const Z=[38,62];
 ov(`<h2>🔨 ตีเหล็ก</h2><div class="hx">ช่างตีเหล็กยื่นค้อนให้ "ตีเองสิ อาวุธจะได้จำมือเจ้า" <b>แตะตอนเข็มอยู่ในโซนสีทอง</b> 5 ครั้ง</div><div style="position:relative;height:26px;border-radius:13px;background:#ffffff14;margin:18px 0"><div style="position:absolute;left:${Z[0]}%;width:${Z[1]-Z[0]}%;top:0;bottom:0;background:#e8b54a55;border-radius:13px"></div><i id="wdN" style="position:absolute;top:-4px;width:6px;height:34px;border-radius:3px;background:#fff;left:0"></i></div><button class="hBig" id="wdH">🔨</button><div class="hs" id="wdS" style="text-align:center">0/5</div>`);
 const n=document.getElementById('wdN'),s=document.getElementById('wdS');iv=setInterval(()=>{if(!n.isConnected)return clearInterval(iv);pos+=dir*(2.2+k*.5);if(pos>=100||pos<=0)dir*=-1;n.style.left=pos+'%'},16);
 document.getElementById('wdH').onclick=()=>{const hit=pos>=Z[0]&&pos<=Z[1];if(hit)sc++;k++;s.textContent=`${k}/5 · โดน ${sc}`;try{sfx(hit?'good':'click')}catch(e){}if(k>=5){clearInterval(iv);done(sc>=3,sc>=4?'ประกายไฟกระเด็นเป็นวง เหล็กร้องเหมือนสัตว์ที่เพิ่งตื่น':sc>=3?'เหล็กเย็นตัวลงอย่างพอใจ':'เหล็กร้าวเป็นเส้นบางๆ ตรงกลางใบ… ช่างส่ายหัว "มันจะจำเรื่องนี้"',()=>cb(sc))}}}
const wpnTick=()=>{if(!['murim','xian'].includes(wk()))return false;const d=W();
 if(!d.wp&&S.age>=16&&S.age<=40&&P(.12)){const kind=rp(WPN);choice(`🔥 โรงตีเหล็กกลางป่า`,`ช่างตีเหล็กตาบอดข้างหนึ่งบอกว่ารอคุณมานาน "เหล็กก้อนนี้ตกจากฟ้าเมื่อสามสิบปีก่อน มันเลือกเจ้าของเอง" เขาจะตี${kind}ให้ แต่ต้องตีเองด้วย`,[
   {t:'🔨 ลงมือตีเอง',s:'มินิเกม · คุณภาพขึ้นกับฝีมือ',noFate:true,f(){setTimeout(()=>forge(sc=>{d.wp={k:kind,q:sc,bond:sc*4,blood:0,n:null,st:1,ny:S.age+rnd(4,8)};choice(`🗡️ ตั้งชื่อ${kind}`,'อาวุธที่มีชื่อจะจำเจ้าของได้',['เงาจันทร์','ไร้นาม','กลืนตะวัน','ศิษย์ฟ้า','ใจเดียว'].map(n=>({t:n,f(){d.wp.n=n;key(`ได้${kind}「${n}」`);say(`🗡️ ${kind}「${E(n)}」ส่งเสียงหึ่งเบาๆ ตอนคุณเอ่ยชื่อมันครั้งแรก`,'myth');fx({pow:pp(.04*Math.max(1,sc))})}})))}),250)}},
   {t:'🙅 ไม่รับ',s:'',f(){d.wp={no:1}}}]);return true}
 const w=d.wp;if(!w||w.no||!w.n)return false;
 if(w.st===1&&S.age>=w.ny){w.st=2;w.ny=S.age+rnd(5,10);const evil=(+S.karma||0)<0;
  choice(`🗡️ ${w.k}「${E(w.n)}」`,evil?`คืนหลังการต่อสู้ ${w.k}ในฝักสั่นไม่หยุด เหมือนยังไม่อิ่ม มันเรียกร้องเลือดอีก — คุณรู้สึกได้ในฝ่ามือ`:`${w.k}เริ่มขยับก่อนคุณจะคิด กันลูกดอกที่คุณไม่เห็นเมื่อวานได้เอง`,evil?[
   {t:'🩸 ให้มันได้ดื่ม',s:'แข็งแกร่งขึ้น · มันจะติดใจ',f(){w.blood+=2;fx({pow:pp(.1),karma:-12});say(`🩸 คุณหาเหยื่อให้มัน… ${w.k}「${E(w.n)}」ร้อนผ่าวทั้งคืน`,'bad')}},
   {t:'🧊 แช่น้ำค้างให้มันสงบ',s:'ความผูกพันขึ้น',f(){w.bond+=6;fx({karma:5});say(`🧊 ${w.k}เงียบลงทีละน้อย เหมือนเด็กที่ร้องไห้จนหลับ`,'good')}}]:[
   {t:'🙏 ขอบคุณมัน เช็ดใบทุกคืน',s:'ความผูกพันขึ้น',f(){w.bond+=8;fx({joy:4});say(`🙏 คุณเริ่มคุยกับ${w.k}ก่อนนอนเหมือนคุยกับเพื่อน`,'good')}},
   {t:'⚔️ พามันไปท้าดวลบ่อยขึ้น',s:'มันจะเปลี่ยนไป',f(){w.blood+=1;fx({fame:15,pow:pp(.05)});say(`⚔️ ชื่อของ「${E(w.n)}」เริ่มเป็นที่รู้จัก — และเริ่มกระหาย`,'')}}]);return true}
 if(w.st===2&&S.age>=w.ny){w.st=3;const loyal=w.bond+w.q*2>w.blood*6;
  choice(`⚔️ ศึกชี้ชะตา`,`ศัตรูที่แข็งแกร่งที่สุดในชีวิตคุณยืนอยู่ตรงหน้า ดาบของเขาเล็งมาที่หัวใจคุณ คุณชัก${w.k}「${E(w.n)}」ออกมา…`,[
   {t:'⚔️ ฝากชีวิตไว้กับมัน',s:'มันเลือกเองว่าจะภักดีไหม',f(){if(loyal){fx({fame:60,pow:pp(.12),joy:10});key(`${w.k}「${w.n}」ปกป้องเจ้าของในศึกชี้ชะตา`);say(`✨ ${w.k}「${E(w.n)}」ขยับเองในจังหวะสุดท้าย เบี่ยงคมดาบที่ควรปักหัวใจคุณ แล้วสวนกลับในท่าที่คุณไม่เคยสอน — คุณชนะ`,'epic')}else{fx({hp:-Math.round((+S.maxHp||100)*.45),fame:-20});w.betray=1;key(`ถูก${w.k}「${w.n}」ทรยศกลางศึก`);say(`💔 ${w.k}「${E(w.n)}」หนักขึ้นในมือคุณกะทันหัน หันคมเข้าหาเจ้าของ — มันเลือกศัตรูที่ฆ่าได้มากกว่า`,'bad')}}},
   {t:'🖐️ วางอาวุธ สู้ด้วยมือเปล่า',s:'ไม่เดิมพันกับมัน',f(){if(P(.45)){fx({fame:40,karma:8});say('🖐️ คุณชนะด้วยมือเปล่า ทุกคนตะลึง','epic')}else{fx({hp:-Math.round((+S.maxHp||100)*.3)});say('🖐️ คุณแพ้ แต่รอด — และ'+w.k+'ไม่ได้เปื้อนเลือดใคร','')}}}]);return true}
 return false};
// ตายแล้ว อาวุธกลายเป็นของสืบทอด (ถ้ายังไม่มีของสืบทอดรออยู่)
setInterval(()=>{try{if(S&&!S.alive&&S._wd&&S._wd.wp&&S._wd.wp.n&&!S._wd.wpRec){S._wd.wpRec=1;const h=LS.get('murim_heir',null);if(!h||!h.own||!h.own.length||(S._hrt&&S._hrt.hl&&S._hrt.hl.gone)){const w=S._wd.wp;setTimeout(()=>{try{const h2=LS.get('murim_heir',null);if(h2&&h2.own&&h2.own.length===1&&h2.own[0].n===String(S.name)){h2.k='blade';h2.ic='🗡️';h2.n=`${w.k}「${w.n}」`;LS.set('murim_heir',h2)}}catch(e){}},1200)}}}catch(e){}},900);

// 🕵️ ศิษย์คนไหนหักหลัง (ยุทธภพ/เซียน อายุ 50+): มินิเกมจับพิรุธจากคำให้การ
function sus(cb){if(auto)return cb(P(.5));const N=shuf(['เฉินหยาง','หลินซือ','ม่อไป๋','ซุนเหลียง']).slice(0,3),liar=rnd(0,2),T=['ยามสาม','ยามสี่','ยามห้า'],place=['ลานฝึก','หอคัมภีร์','ห้องเก็บยา'];
 const cl=N.map((n,i)=>{const p=place[i],t=T[i];return i===liar?{n,s:`"ข้าอยู่${p}ตลอดยามสาม ไม่ได้ออกไปไหน — แสงจันทร์สว่างจนอ่านคัมภีร์ได้สบาย"`,tell:'คืนนั้นเป็นคืนเดือนมืด'}:{n,s:`"ข้าอยู่${p}ช่วง${t} ${i===0?'ได้ยินเสียงหมาหอนทางทิศเหนือ':i===1?'เทียนดับไปสองเล่มเพราะลม':'มีกลิ่นยาไหม้ลอยมา'}"`}});
 ov(`<h2>🕵️ คัมภีร์หายจากหอ</h2><div class="hx">คัมภีร์สูงสุดของ${'สำนัก'}หายไปคืนเดือนมืดเมื่อวาน ศิษย์ใกล้ชิดสามคนให้การ — <b>หนึ่งคนโกหก</b></div>${cl.map((c,i)=>`<div class="hC"><b>${E(c.n)}</b><br>${E(c.s)}</div>`).join('')}${cl.map((c,i)=>`<button class="hO" data-s="${i}">👉 ${E(c.n)} โกหก</button>`).join('')}`);
 document.querySelectorAll('#hrtOv [data-s]').forEach(b=>b.onclick=()=>{const i=+b.dataset.s;i===liar?done(true,`${E(cl[liar].n)}หน้าซีด — คืนนั้นเป็นคืนเดือนมืด ไม่มีแสงจันทร์ให้อ่านอะไรได้`,()=>cb(true)):done(false,`${E(cl[i].n)}คุกเข่าร้องไห้ว่าไม่ได้ทำ… คนที่โกหกจริงคือ${E(cl[liar].n)} — ${E(cl[liar].tell)}`,()=>cb(false))})}
const discTick=()=>{if(!['murim','xian'].includes(wk()))return false;const d=W();if(d.sus||S.age<50||!P(.06))return false;d.sus=1;
 choice('🕵️ เงาในสำนัก','คัมภีร์สูงสุดหายไปจากหอคัมภีร์ คนที่เข้าถึงได้มีแค่ศิษย์ใกล้ชิดสามคนของคุณ',[
  {t:'🔍 สอบสวนเอง',s:'มินิเกม · จับพิรุธ',noFate:true,f(){setTimeout(()=>sus(ok=>{if(ok){fx({fame:30,karma:5});say('🕵️ คุณได้คัมภีร์คืน และได้รู้ว่าใครควรไว้ใจ','good')}else{fx({fame:-20,joy:-10});W().betr=1;say('🕵️ คุณลงโทษผิดคน… ศิษย์ที่โกหกจริงยังอยู่ข้างกายคุณ และเขารู้ว่าคุณรู้ไม่ทัน','bad')}}),250)}},
  {t:'🤝 ประกาศให้อภัยถ้าเอามาคืน',s:'',f(){if(P(.5)){fx({karma:12});say('🤝 คัมภีร์กลับมาวางที่เดิมในคืนถัดมา ไม่มีใครรู้ว่าใครเอามาคืน','good')}else{fx({fame:-10});say('🤝 ไม่มีใครเอามาคืน และคืนต่อมามีอีกเล่มหายไป','bad')}}}]);return true};

// ============================================================
// ☁️ เซียน: ⚗️ เตาหลอมโอสถ
// ============================================================
const RK='murim_recipe';const REC=[{id:'life',n:'โอสถต่อชะตา',ic:'🟣',fx:{life:12}},{id:'pow',n:'โอสถทะลวงเส้นลมปราณ',ic:'🔴',fx:{pow:.15}},{id:'mind',n:'โอสถจิตใส',ic:'🔵',fx:{int:12}},{id:'heal',n:'โอสถคืนกาย',ic:'🟢',fx:{hp:25}}];
function brew(r,cb){if(auto)return cb(P(.55)?2:P(.5)?1:0);let t=50,tg=rnd(35,65),vel=0,ok=0,tot=0,iv=0,hold=0;const known=(LS.get(RK,{})||{})[r.id]|0;const band=7+Math.min(6,known*2);
 ov(`<h2>⚗️ ${r.ic} ${E(r.n)}</h2><div class="hx">คุมไฟให้อยู่ในแถบสีทองนาน 6 วินาที — กดค้างเพื่อเร่งไฟ ปล่อยเพื่อลด<br><span class="hs">เคยปรุงสูตรนี้มาแล้ว ${known} ครั้ง (ข้ามชาติ) · ยิ่งคุ้นแถบยิ่งกว้าง</span></div>
  <div style="position:relative;height:200px;width:60px;margin:14px auto;border-radius:30px;background:#ffffff12;overflow:hidden"><div id="wdBand" style="position:absolute;left:0;right:0;background:#e8b54a44"></div><div id="wdF" style="position:absolute;left:0;right:0;bottom:0;background:linear-gradient(0deg,#ff4a1a,#ffb04a)"></div></div><div class="hBar"><i id="wdP"></i></div><button class="hBig" id="wdB">🔥 กดค้าง</button>`);
 const band_=document.getElementById('wdBand'),f=document.getElementById('wdF'),bar=document.getElementById('wdP'),b=document.getElementById('wdB');band_.style.bottom=(tg-band)+'%';band_.style.height=(band*2)+'%';
 b.onpointerdown=e=>{e.preventDefault();hold=1};const up=()=>{hold=0};b.onpointerup=up;b.onpointerleave=up;b.onpointercancel=up;
 iv=setInterval(()=>{if(!f.isConnected)return clearInterval(iv);vel+=hold?.045:-.03;vel*=.985;vel=Math.max(-.9,Math.min(.9,vel));t+=vel+(Math.random()-.5)*.35;t=Math.max(0,Math.min(100,t));if(Math.random()<.01)tg=Math.max(20,Math.min(80,tg+rnd(-12,12)));band_.style.bottom=(tg-band)+'%';f.style.height=t+'%';tot++;if(Math.abs(t-tg)<=band)ok++;bar.style.width=Math.min(100,ok/360*100)+'%';
  if(t>=98){clearInterval(iv);return done(false,'💥 เตาระเบิด! ควันพิษคลุ้งไปทั้งถ้ำ',()=>cb(-1))}if(ok>=360){clearInterval(iv);return done(true,ok/tot>.8?'✨ โอสถสามเม็ดลอยออกจากเตา มีลายเมฆบนผิว — ระดับสูงสุด':'โอสถออกมาครบ แม้ผิวจะไม่เรียบนัก',()=>cb(ok/tot>.8?2:1))}if(tot>900){clearInterval(iv);return done(false,'ไฟมอดก่อนโอสถจะเป็นรูป',()=>cb(0))}},16)}
const alchTick=()=>{if(wk()!=='xian')return false;const d=W();if(S.age-(d.alch|0)<rnd(6,12)||!P(.15))return false;d.alch=S.age;const r=rp(REC);
 choice(`⚗️ ตำรับโบราณ`,`คุณพบตำรับ${r.ic} ${E(r.n)}ในถ้ำร้าง วัตถุดิบครบพอดีเหมือนมีใครเตรียมไว้`,[
  {t:'⚗️ เปิดเตาหลอม',s:'มินิเกม · ระเบิดได้',noFate:true,f(){setTimeout(()=>brew(r,q=>{const RR=LS.get(RK,{})||{};if(q>=1){RR[r.id]=(RR[r.id]|0)+1;LS.set(RK,RR);const m=q===2?1.6:1;const o={};for(const k in r.fx)o[k]=k==='pow'?pp(r.fx[k]*m):Math.round(r.fx[k]*m);fx(o);key(`ปรุง${r.n}สำเร็จ${q===2?' (ระดับสูงสุด)':''}`)}else if(q<0)fx({hp:-25})}),250)}},
  {t:'📜 เก็บตำรับไว้ก่อน',s:'',f(){say(`📜 คุณจดตำรับ${E(r.n)}ไว้ในสมุด`,'')}}]);return true};

// ============================================================
// 🐾 สัตว์อสูร: ผู้สืบทอดฝูง
// ============================================================
const PUP=[{n:'ตัวโตที่สุด',tr:'แข็งแรง ใจร้อน'},{n:'ตัวเล็กตาเฉียบ',tr:'ฉลาด ขี้ระแวง'},{n:'ตัวที่ชอบเลียแผลให้พี่น้อง',tr:'อ่อนโยน ฝูงรัก'}];
function duel(cb){if(auto)return cb(P(.5));let r=0,w=0;const M={claw:'🦷 กัด',dash:'💨 พุ่ง',roar:'🗯️ คำราม'},B={claw:'dash',dash:'roar',roar:'claw'},TELL={claw:'ลดหัวต่ำ จ้องที่คอ',dash:'ย่อขาหลัง หางตั้ง',roar:'อกพอง หูแนบหัว'};
 const step=()=>{if(r>=3)return done(w>=2,w>=2?'คุณยืนเหนือร่างผู้ท้าชิง ฝูงทั้งฝูงก้มหัวให้':'คุณล้มลง ผู้ท้าชิงยืนเหนือคุณ',()=>cb(w>=2));const o=rp(Object.keys(M));
  ov(`<h2>🐺 ประลองชิงฝูง · ยก ${r+1}/3</h2><div class="hx">คู่ต่อสู้<b>${TELL[o]}</b><br><span class="hs">กัด ชนะ คำราม · คำราม ชนะ พุ่ง · พุ่ง ชนะ กัด</span></div>${Object.keys(M).map(k=>`<button class="hO" data-m="${k}">${M[k]}</button>`).join('')}<div class="hs">ชนะแล้ว ${w}</div>`);
  document.querySelectorAll('#hrtOv [data-m]').forEach(b=>b.onclick=()=>{const m=b.dataset.m;if(B[o]===m)w++;else if(B[m]===o){}r++;step()})};step()}
const packTick=()=>{if(wk()!=='beast')return false;const d=W();const m=S.beastMode||{};
 if(!d.pk&&(m.st|0)>=3&&S.age>=Math.max(20,(S.lifespan||200)*.3)&&P(.15)){choice('🐾 ลูกครอกใหม่',`ลูกสามตัวลืมตาในโพรงพร้อมกัน วันหนึ่งคุณต้องเลือกว่าใครจะนำฝูงต่อ<br>${PUP.map(p=>`· ${p.n} — ${p.tr}`).join('<br>')}`,PUP.map((p,i)=>({t:`👑 ${p.n}`,s:p.tr,f(){d.pk={h:i,ny:S.age+rnd(8,20),st:1};key(`เลือก${p.n}เป็นผู้สืบทอดฝูง`);say(`👑 คุณคาบ${p.n}ขึ้นไปบนหินกลางฝูง พี่น้องอีกสองตัวมองนิ่งๆ`,'myth')}})));return true}
 if(d.pk&&d.pk.st===1&&S.age>=d.pk.ny){d.pk.st=2;const others=PUP.filter((_,i)=>i!==d.pk.h),ch=rp(others);
  choice(`🐺 ${ch.n}กลับมา`,`${ch.n}ที่ไม่ได้รับเลือกหายไปจากฝูงหลายปี วันนี้กลับมาพร้อมแผลเต็มตัวและสายตาที่โตแล้ว "ข้าจะพิสูจน์ว่าแม่เลือกผิด"`,[
   {t:'⚔️ ลงไปประลองเอง',s:'มินิเกม · อ่านท่าคู่ต่อสู้',noFate:true,f(){setTimeout(()=>duel(ok=>{if(ok){fx({fame:30,pow:pp(.06)});say(`🐺 ${ch.n}ยอมแพ้ คุณเลียแผลให้มันเหมือนตอนยังเด็ก มันร้องไห้ครางเบาๆ แล้วเข้าฝูงในฐานะผู้คุ้มกัน`,'good')}else{fx({hp:-30});d.pk.lost=1;say(`🐺 ${ch.n}ชนะ แต่ไม่ฆ่าคุณ มันแค่ยืนข้างผู้สืบทอดที่คุณเลือก แล้วพาฝูงไปทางของมันเอง`,'bad')}}),250)}},
   {t:`👑 ให้ผู้สืบทอดสู้เอง`,s:'ปล่อยให้รุ่นลูกตัดสิน',f(){if(P(.5)){fx({joy:8});say('👑 ผู้สืบทอดของคุณชนะอย่างสง่า และไว้ชีวิตพี่น้อง ฝูงแข็งแกร่งกว่าเดิม','good')}else{fx({joy:-12});say(`👑 ผู้สืบทอดของคุณแพ้… ${ch.n}กลายเป็นจ่าฝูงคนใหม่ มันมองคุณด้วยแววตาที่อ่านไม่ออก`,'bad')}}},
   {t:'🍖 แบ่งดินแดนให้ ตั้งฝูงใหม่',s:'ไม่ต้องสู้',f(){fx({karma:10});say(`🍖 ป่าฝั่งตะวันตกมีฝูงใหม่ จ่าฝูงชื่อ${ch.n} ทุกฤดูหนาวมันจะส่งเหยื่อมาวางหน้าโพรงคุณหนึ่งตัว`,'myth')}}]);return true}
 return false};

// ============================================================
// 🏙️ ยุคปัจจุบัน: 🎓 งานเลี้ยงรุ่น (ดึงความทรงจำวัยเรียนจริง)
// ============================================================
const reunionTick=()=>{if(wk()!=='mw')return false;const d=W();if(d.reu||S.age<35||S.age>55||!P(.12))return false;
 const kid=(S.key||[]).filter(x=>{const a=parseInt(x);return a>=6&&a<=18});d.reu=1;const mem=kid.length?rp(kid).replace(/^\d+ ปี — /,''):null;const fr=rp(['เก่ง','อ้วน','ปุ้ย','เจ','บอส','มิ้นท์','ฝน']);
 choice('🎓 งานเลี้ยงรุ่น',`ไลน์กลุ่มรุ่นที่เงียบมายี่สิบปีเด้งขึ้นมา "คืนวันเสาร์ ร้านเดิมหน้าโรงเรียน ทุกคนต้องมา"<br>${mem?`พอไปถึง ${fr}ทักคุณก่อนใคร "จำได้ไหม ตอนนั้นแก<b>${E(mem)}</b>" ทั้งโต๊ะหัวเราะ`:`${fr}ทักคุณก่อนใคร แต่คุณนึกชื่อเขาไม่ออกเลย`}`,mem?[
  {t:'😂 หัวเราะ เล่าต่อ',s:'คืนนั้นสนุกที่สุดในรอบหลายปี',f(){fx({joy:14});say(`🍻 คุณกับ${fr}คุยกันจนร้านปิด ก่อนแยก ${fr}พูดว่า "แกเปลี่ยนไปเยอะนะ แต่หัวเราะเหมือนเดิม"`,'good')}},
  {t:'😶 "จำไม่ได้แล้ว"',s:'บางเรื่องไม่อยากจำ',f(){fx({joy:-4});say(`😶 ${fr}เงียบไป แล้วพูดเบาๆ "เรื่องนั้นมันสำคัญกับเรามากนะ"`,'')}},
  {t:'🍺 แอบถามว่าทำไมจำเรื่องนี้ได้',s:'',f(){const tw=rnd(0,2);if(tw===0){fx({joy:10,karma:6});say(`🍺 ${fr}ยิ้มเขินๆ "เพราะวันนั้นแกเป็นคนเดียวที่คุยกับเรา" — ยี่สิบปีที่คุณไม่เคยรู้`,'myth')}else if(tw===1){fx({mon:3000});say(`🍺 ${fr}เปิดบริษัทแล้ว ชวนคุณไปร่วมงานพาร์ทไทม์ ได้เงินพิเศษติดมือ`,'good')}else{fx({joy:-6});say(`🍺 ${fr}เมาแล้วร้องไห้ บอกว่าชีวิตพังหมด เรื่องตอนเด็กเป็นเรื่องเดียวที่ยังดีอยู่`,'')}}}]:[
  {t:'🙂 แกล้งทำเป็นจำได้',s:'',f(){fx({joy:2});say(`🙂 คุณคุยเออออไปทั้งคืน ตอนกลับบ้านค้นรูปรุ่น… ไม่มีหน้า${fr}อยู่ในรูปเลยสักใบ`,'myth')}},
  {t:'🙏 บอกตรงๆ ว่าจำไม่ได้',s:'',f(){fx({joy:4,karma:3});say(`🙏 ${fr}หัวเราะ "ไม่เป็นไร เราจำแทนได้"`,'good')}}]);return true};

// ============================================================
// 🌠 ทะลุฟ้าดารา: 🧬 ยีนกลืนความเป็นคน
// ============================================================
function genes(cb){if(auto)return cb(P(.55));const SY=['🧬','🦎','🦅','🐺','🦂','🐙'],c=shuf(SY.concat(SY));let a=null,m=0,tr=0,lock=0;
 ov(`<h2>🧬 ต่อสายยีน</h2><div class="hx">จับคู่ลำดับยีนที่เหมือนกัน — พลาดได้ 7 ครั้ง</div><div id="wdG" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${c.map((x,i)=>`<button class="hO" data-g="${i}" style="text-align:center;font-size:26px;margin:0;padding:12px 0">❔</button>`).join('')}</div><div class="hs" id="wdGs">พลาด 0/7</div>`);
 document.querySelectorAll('#hrtOv [data-g]').forEach(b=>b.onclick=()=>{if(lock||b.dataset.ok)return;const i=+b.dataset.g;b.textContent=c[i];if(a===null){a=b;return}if(a===b)return;if(c[+a.dataset.g]===c[i]){a.dataset.ok=b.dataset.ok=1;a.style.background=b.style.background='#16301f';a=null;m++;if(m>=6)done(true,'สายยีนเรียงตัวสมบูรณ์ ร่างกายรับมันได้โดยไม่ต่อต้าน',()=>cb(true))}else{lock=1;tr++;document.getElementById('wdGs').textContent=`พลาด ${tr}/7`;const x=a;a=null;setTimeout(()=>{x.textContent='❔';b.textContent='❔';lock=0;if(tr>=7)done(false,'สายยีนพันกันมั่ว ร่างกายปฏิเสธจนชักกระตุก',()=>cb(false))},650)}})}
const geneTick=()=>{if(wk()!=='sky')return false;const d=W();d.hum=d.hum==null?100:d.hum;const K=S.mw&&S.mw.sky;if(K&&K.beast)return false;
 if(S.age>=16&&S.age-(d.gn|0)>=rnd(5,9)&&P(.2)){d.gn=S.age;const pw=rp(['เกล็ดใต้ผิว','ตาเห็นในความมืด','กรงเล็บหดได้','หัวใจสองห้อง','ปีกพังผืดใต้แขน']);
  choice('🧬 ยีนอสูรตื่น',`ร่างกายคุณเริ่มเปลี่ยนเอง — ${pw} หมอในนครกำแพงบอกว่ารับมันได้ แต่ทุกครั้งที่รับ ความเป็นคนจะหายไปนิดหนึ่ง<br><span class="tag2">ความเป็นมนุษย์: ${d.hum}%</span>`,[
   {t:'🧬 รับยีน (ต่อสาย)',s:'มินิเกม · พลังเพิ่มมาก',noFate:true,f(){setTimeout(()=>genes(ok=>{if(ok){d.hum=Math.max(0,d.hum-20);fx({pow:pp(.18),hp:20});key(`รับยีนอสูร: ${pw} (มนุษย์ ${d.hum}%)`);say(`🧬 ${pw} — ความเป็นมนุษย์เหลือ ${d.hum}%`,'epic')}else{d.hum=Math.max(0,d.hum-10);fx({hp:-20});say(`🧬 ยีนเข้าไปครึ่งเดียว ร่างกายเจ็บปวดทั้งคืน ความเป็นมนุษย์เหลือ ${d.hum}%`,'bad')}}),250)}},
   {t:'💉 กดยีนไว้ด้วยยา',s:'คงความเป็นคน',f(){fx({joy:-3,mon:-200});d.hum=Math.min(100,d.hum+5);say(`💉 คุณฉีดยากดยีนทุกเช้า ${pw}หายไป แต่บางคืนคุณได้ยินเสียงเรียกจากนอกกำแพง`,'')}}]);return true}
 if(d.hum<=60&&!d.fam&&P(.3)){d.fam=1;choice('🏠 คนในบ้าน',`แม่ของคุณเปิดประตูมาแล้วนิ่งไป "ขอโทษนะ… มาหาใครคะ" — เธอจำคุณไม่ได้`,[
   {t:'🗣️ พูดเรื่องที่มีแค่คุณสองคนรู้',s:'',f(){if(P(.6)){fx({joy:10});say('🗣️ แม่ร้องไห้ แล้วกอดคุณแน่น "หน้าเปลี่ยนไปหมด แต่เสียงหัวเราะยังเหมือนเดิม"','myth')}else{fx({joy:-14});say('🗣️ แม่ถอยหลังไปหนึ่งก้าว แล้วปิดประตูช้าๆ','bad')}}},
   {t:'🚶 "ขอโทษครับ/ค่ะ มาผิดบ้าน"',s:'',f(){fx({joy:-10});key('แม่จำหน้าไม่ได้หลังรับยีนอสูร');say('🚶 คุณเดินจากมา ข้างหลังได้ยินแม่พูดกับใครบางคนว่า "คนเมื่อกี้ตาเหมือนลูกเราเลย"','bad')}}]);return true}
 if(d.hum<=20&&!d.last&&P(.35)){d.last=1;choice('🌑 เสียงเรียกจากนอกกำแพง',`ความเป็นมนุษย์เหลือ ${d.hum}% คืนนี้คุณได้ยินเสียงเรียกชัดเจนเป็นครั้งแรก เป็นภาษาที่คุณไม่เคยเรียน แต่เข้าใจทุกคำ`,[
   {t:'🐉 ข้ามกำแพงออกไป',s:'ไม่หันกลับ',f(){fx({pow:pp(.3),fame:100});key('ข้ามกำแพงไปเป็นอสูร');say('🐉 ทหารบนกำแพงเห็นเงาบางอย่างกระโดดข้ามกำแพงชั้นนอกในความมืด ไม่มีใครยิง เพราะมันหันมาโค้งให้ก่อนหายไป','myth')}},
   {t:'🧍 อยู่ต่อในฐานะคน',s:'ยึดสิ่งที่เหลือไว้',f(){d.hum=Math.min(100,d.hum+25);fx({karma:20,joy:6});key('เลือกเป็นคนต่อแม้ยีนเกือบกลืนหมด');say('🧍 คุณปิดหน้าต่าง เปิดเพลงที่แม่ชอบ แล้วนั่งฟังจนเช้า ความเป็นมนุษย์กลับมาบางส่วน','good')}}]);return true}
 return false};

// ============================================================
// 🌉 ม่านหมอก: 🏮 วัตถุต้องสาป · 📁 คดีข้ามชาติ
// ============================================================
const FCK='murim_fogcase';
const fogTick=()=>{if(wk()!=='fog')return false;const d=W(),K=S.mw.fog||{};
 if(!d.cc&&S.age>=18){d.cc=1;const c=LS.get(FCK,null);if(c&&c.t&&P(.8)){choice('📁 แฟ้มคดีที่ไม่มีหมายเลข',`ในลิ้นชักโต๊ะทำงานมีแฟ้มคดีเก่าลายมือคุ้นตา — ลายมือของคุณเองทั้งที่ไม่เคยเขียน<br><b>${E(c.n)}</b> · ค้างไว้ตั้งแต่ "${E(c.who)}" เสียชีวิต<br><span class="tag2">บันทึกหน้าสุดท้าย: "${E(c.note)}"</span>`,[
   {t:'🔎 สืบต่อจากที่ค้างไว้',s:'คดีข้ามชาติ',f(){if(P(.55)){fx({fame:40,int:6});LS.set(FCK,null);key(`ปิดคดี${c.n}ที่ค้างมาจากชาติก่อน`);say(`🔎 เบาะแสในแฟ้มพาคุณไปถึงคำตอบในสามวัน — คดีที่ "${E(c.who)}" ไล่ตามทั้งชีวิตปิดลงในมือคุณ`,'epic')}else{fx({joy:-6});say('🔎 เบาะแสพาไปถึงทางตันเดิม ตรงที่ลายมือในแฟ้มหยุดเขียนพอดี','bad')}}},
   {t:'🔥 เผาแฟ้มทิ้ง',s:'ชาตินี้เป็นของเรา',f(){LS.set(FCK,null);fx({joy:4});say('🔥 ขี้เถ้าลอยขึ้นไปในหมอก คืนนั้นหอนาฬิกาตีบอกเวลาผิดหนึ่งครั้ง','myth')}}]);return true}}
 if(!d.lamp&&S.age>=20&&P(.1)){d.lamp=1;choice('🏮 ตะเกียงเห็นความจริง',`พ่อค้าของเก่าในตรอกล่างยื่นตะเกียงทองเหลืองให้ "จุดแล้วจะเห็นสิ่งที่หมอกซ่อน แต่ทุกครั้งที่จุด มันจะกินบางอย่างของเจ้าไปด้วย"`,[
   {t:'🪙 รับไว้',s:'ใช้ได้ในคดีถัดไป',f(){d.lp=3;say('🏮 ตะเกียงเย็นเฉียบในมือ ไส้ตะเกียงไม่มีน้ำมัน แต่คุณรู้ว่ามันจุดได้','myth')}},
   {t:'🙅 ไม่รับ',s:'',f(){say('🙅 พ่อค้ายิ้ม "เดี๋ยวมันก็หาทางไปหาเจ้าเอง"','')}}]);return true}
 if(d.lp>0&&S.age-(d.lpy|0)>=3&&P(.25)){d.lpy=S.age;choice('🏮 จุดตะเกียง?',`คดีนี้มืดแปดด้าน หมอกหนาจนมองไม่เห็นปลายแขน ตะเกียงในกระเป๋าอุ่นขึ้นเอง<br><span class="tag2">เหลือแสง ${d.lp} ครั้ง</span>`,[
   {t:'🔥 จุดตะเกียง',s:'เห็นความจริง · เสียหลักยึด',f(){d.lp--;fx({fame:30,int:5});try{if(K&&K.anc!=null)K.anc=Math.max(0,K.anc-15)}catch(e){}const lost=rp(['หน้าตาของแม่ตอนยังสาว','เสียงหัวเราะของเพื่อนคนแรก','ชื่อถนนที่เคยวิ่งเล่น','กลิ่นบ้านเกิด']);key(`ใช้ตะเกียงเห็นความจริง แลกกับ${lost}`);say(`🏮 คุณเห็นทุกอย่าง — ใคร ทำไม อยู่ที่ไหน คดีปิดในคืนเดียว · แต่หลังจากนั้นคุณจำ<b>${lost}</b>ไม่ได้อีกเลย (หลักยึด −15)`,'myth')}},
   {t:'🧠 สืบแบบเดิม',s:'',f(){fx({int:3});say('🧠 คุณสืบแบบคนธรรมดา ช้ากว่า แต่ยังเป็นตัวเอง','')}}]);return true}
 return false};
// ตายในม่านหมอกพร้อมคดีค้าง → บันทึกให้ชาติหน้า
setInterval(()=>{try{if(S&&!S.alive&&S.mw&&S.mw.fog&&!(S._wd&&S._wd.fcRec)){W().fcRec=1;const K=S.mw.fog;const cur=K.cur;const n=cur&&(cur.n||cur.t)||((K.cases||[]).length?null:null);if(n)LS.set(FCK,{n:String(n).slice(0,60),who:String(S.name||''),note:rp(['ไม่ใช่คนที่เราคิด','ตรวจระฆังใต้สะพานเก้าโค้ง','ทุกคนในภาพถ่ายตายไปแล้ว ยกเว้นคนถ่าย','เขาไม่ได้หายไป เขาแค่ถูกลืม']),t:Date.now()})}}catch(e){}},1000);

// ============================================================
// ⭕ วิญญาณยุทธ์: ดวงจิตมีอารมณ์
// ============================================================
const soulTick=()=>{if(wk()!=='soul')return false;const d=W();d.sm=d.sm==null?60:d.sm;if(S.age<8)return false;
 if(S.age-(d.sy|0)>=rnd(3,6)&&P(.25)){d.sy=S.age;const ev=rnd(0,2);
  if(ev===0)choice('🐉 ดวงจิตงอน',`ดวงจิตของคุณไม่ยอมออกมาตอนเรียกสามวันแล้ว ตั้งแต่วันที่คุณใช้มันรับแรงกระแทกแทนเพื่อน<br><span class="tag2">ความผูกพัน: ${d.sm}</span>`,[
   {t:'🙇 ขอโทษ นั่งคุยกับมันทั้งคืน',s:'',f(){d.sm=Math.min(100,d.sm+15);fx({joy:4});say('🙇 ตอนรุ่งสาง ดวงจิตค่อยๆ โผล่ออกมานอนข้างคุณ เหมือนแมวที่ทำเป็นไม่สนใจแต่ไม่ยอมไปไหน','good')}},
   {t:'😤 บังคับเรียกออกมา',s:'',f(){d.sm=Math.max(0,d.sm-20);fx({pow:pp(.03)});say('😤 มันออกมา… แต่สายตาที่มองคุณไม่เหมือนเดิม','bad')}}]);
  else if(ev===1)choice('🐉 ดวงจิตอยากไปที่หนึ่ง',`ดวงจิตของคุณดึงคุณไปทางทิศเหนือทุกคืน เหมือนมีที่ที่มันต้องไป`,[
   {t:'🧭 ตามใจมัน',s:'ไม่รู้ว่าจะเจออะไร',f(){d.sm=Math.min(100,d.sm+10);const r=rnd(0,2);if(r===0){fx({pow:pp(.1)});say('🧭 มันพาคุณไปถึงซากวงแหวนวิญญาณโบราณ แล้วกลืนมันอย่างมีความสุข','epic')}else if(r===1){fx({joy:10,karma:6});say('🧭 มันพาคุณไปที่หลุมศพเล็กๆ กลางป่า — ของเจ้าของเก่าของมัน มันนอนอยู่ตรงนั้นทั้งวัน','myth')}else{fx({hp:-15});say('🧭 มันพาคุณไปเจอสัตว์วิญญาณร้อยปี คุณหนีมาได้แทบไม่รอด แต่ดวงจิตดูพอใจ','')}}},
   {t:'🏠 ไม่ไป',s:'',f(){d.sm=Math.max(0,d.sm-8);say('🏠 ดวงจิตนอนหันหลังให้คุณทั้งสัปดาห์','')}}]);
  else choice('⚔️ ศึกสำคัญ',`การประลองชิงตำแหน่งตัวแทนสถาบัน คู่ต่อสู้มีวงแหวนมากกว่าคุณหนึ่งวง ทุกอย่างขึ้นกับว่าดวงจิตจะยอมทุ่มให้คุณแค่ไหน<br><span class="tag2">ความผูกพัน: ${d.sm}</span>`,[
   {t:'🐉 เรียกดวงจิตเต็มกำลัง',s:'มันจะยอมไหม',f(){if(d.sm>=60||P(d.sm/120)){fx({fame:50,pow:pp(.08)});d.sm=Math.min(100,d.sm+5);say('🐉 ดวงจิตปลดปล่อยพลังที่คุณไม่เคยเห็น — มันเลือกคุณ','epic')}else{fx({hp:-25,fame:-15});say('🐉 ดวงจิตออกมาครึ่งเดียวแล้วหดกลับ คุณแพ้ต่อหน้าคนทั้งสถาบัน','bad')}}},
   {t:'🥋 สู้ด้วยร่างกายล้วน ไม่บังคับมัน',s:'',f(){d.sm=Math.min(100,d.sm+12);if(P(.35)){fx({fame:30});say('🥋 คุณชนะด้วยร่างกายล้วน ดวงจิตกระโดดออกมาฉลองเอง','good')}else{fx({hp:-15});say('🥋 คุณแพ้ แต่ดวงจิตเลียแผลให้คุณทั้งคืน','')}}}]);
  return true}
 return false};

// ============================================================
// ตัวจัดการ (ทุกปี)
// ============================================================
const TICK=[wpnTick,discTick,alchTick,packTick,reunionTick,geneTick,fogTick,soulTick];
let lastAge=null,lastS=null;
setInterval(()=>{try{if(!S||!S.alive)return;if(S!==lastS){lastS=S;lastAge=S.age;return}if(S.age===lastAge)return;const a=lastAge;lastAge=S.age;if(S.age<=a)return;const d=W();if(d.y===S.age)return;d.y=S.age;
 setTimeout(()=>{try{if(busy())return;for(const f of shuf(TICK)){if(f())break}}catch(e){console.error('wld2',e)}},1400)}catch(e){}},700);
window._wd2={TICK,forge,sus,brew,duel,genes,wpnTick,discTick,alchTick,packTick,reunionTick,geneTick,fogTick,soulTick};
})()}catch(e){console.error('wld2.js',e)}
wReady('wld2');
