// ============================================================
// /w/bond.js 👥 ผูกชะตาเพื่อน · 🔮 ทายชะตาเพื่อน · 🌍 ยุคประจำสัปดาห์ · 🎧 ฟังนิยาย · 📸 ภาพประกอบนิยาย (โหลดเบื้องหลัง 4 วิ)
//  - api fl (code link unlink st send inbox list) · pr mk · era (vote deed) — ดู api/online.js "👥 ผูกชะตาเพื่อน"
//  - รหัสเพื่อนไม่เปิดเผย id จริง (ใช้ h = hash) · พรชะตา 1 ครั้ง/วัน/เพื่อน · ผลทายปิดเมื่อชีวิตเพื่อนจบ (เซิร์ฟเวอร์ตรวจจาก flst)
// ============================================================
try{(function(){
if(window._bond)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T_=f=>{try{return f()}catch(e){return null}};
const R=(a,b)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),CH=a=>a[Math.floor(Math.random()*a.length)],P_=p=>Math.random()<p;
const on=()=>T_(()=>!!onlineOK);
const hasS=()=>typeof S!=='undefined'&&!!S;
const alive=()=>hasS()&&!!S.alive;
const say=(t,c,b)=>T_(()=>log(t,c||'',!!b));
const addv=(k,v)=>T_(()=>{S[k]=(S[k]||0)+v});
const pn=()=>T_(()=>pname())||'ผู้เล่น';
const wk=()=>{if(!hasS())return'murim';const M=S.mw;if(M&&M.sky)return'sky';if(M&&M.fog)return'fog';if(S.beastMode)return'beast';if(S.ch==='soul')return'soul';if(S.rg)return'loop';if(M)return'mw';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
const WN={murim:'ยุทธภพ',xian:'โลกเซียน',god:'แดนเทพ',soul:'จิตวิญญาณยุทธ์',mw:'ยุคปัจจุบัน',sky:'ทะลุฟ้าดารา',fog:'นครม่านหมอก',beast:'สัตว์อสูร',loop:'ผู้ย้อนกาล'};
const MOD=()=>['mw','sky','fog'].includes(wk());
// ======================= 👥 ผูกชะตาเพื่อน =======================
let FL={f:[],c:'',me:0,t:0};
async function flLoad(force){if(!on())return FL;if(!force&&Date.now()-FL.t<180e3)return FL;try{const j=await api('fl',{o:'list'});if(j&&j.ok){FL={f:j.f||[],c:j.c||'',me:j.me|0,t:Date.now()}}}catch(e){}return FL}
let lastSt='';async function stSync(force){if(!on()||!hasS())return;const s={n:String(S.name||''),w:wk(),a:S.age|0,al:S.alive?1:0,wd:T_(()=>!!(S.spouse||(S.mw&&S.mw.sp&&!S.mw.sp.d)))?1:0,ep:T_(()=>epithet())||'',pn:pn()};const k=JSON.stringify(s);if(!force&&k===lastSt)return;lastSt=k;try{await api('fl',Object.assign({o:'st'},s))}catch(e){lastSt=''}}
setInterval(()=>{if(document.hidden)return;stSync()},45e3);setInterval(()=>{try{const e=$('end');if(e&&e.classList.contains('on'))stSync()}catch(x){}},5000);
// กล่องจดหมาย: พร · เสียงสะท้อน · ผลทาย · มีคนผูกชะตา
const PEND='murim_flPend';
async function inbox(){if(!on())return;let L=[];try{const j=await api('fl',{o:'inbox'});L=(j&&j.l)||[]}catch(e){return}
 for(const m of L.reverse()){
  if(m.k==='link')T_(()=>toast(`👥 ${m.pn||'มีคน'} ผูกชะตากับคุณแล้ว`));
  else if(m.k==='bless'){if(alive())blessApply(m);else{const p=T_(()=>LS.get(PEND,[]))||[];p.push(m);T_(()=>LS.set(PEND,p.slice(-5)))}}
  else if(m.k==='echo'){say(`📬 <b>${E(m.pn||'เพื่อน')}</b>: ในชีวิตของ${E(m.cn||'เขา')} — ${E(m.tx||'')}`,'epic');T_(()=>toast('📬 มีเสียงสะท้อนจากเพื่อน'))}
  else if(m.k==='pred'){const q={60:'รอดถึง 60 ปี',wd:'ได้แต่งงาน',90:'รอดถึง 90 ปี'}[m.q]||'';T_(()=>toast(`🔮 ทายชีวิต ${m.cn} (${m.pn}) ว่า${m.y?'':'ไม่'}${q} — ${m.ok?'ถูก! +แต้มหมอดู':'ผิด'}`));if(alive())say(`🔮 คำทายของคุณถึงชีวิต <b>${E(m.cn)}</b> (${E(m.pn)}) จบอายุ ${m.a} ปี — ${m.ok?'<b>ทายถูก</b> แต้มหมอดูเพิ่ม':'ทายผิด'}`,m.ok?'epic':'')}}
 FL.t=0}
function blessApply(m){T_(()=>{S.hp=S.maxHp||S.hp;addv('luck',5)});T_(()=>joy(8));say(`🙏 พรชะตาจาก <b>${E(m.pn||'เพื่อน')}</b> ข้ามชีวิตมาถึงคุณ — แสงอุ่นห่อหุ้มร่าง พลังชีวิตเต็ม · โชค +5`,'myth',true)}
setInterval(()=>{if(!document.hidden)inbox()},90e3);setTimeout(inbox,6000);
{let lastAlive=false;setInterval(()=>{try{const a=alive();if(a&&!lastAlive){const p=T_(()=>LS.get(PEND,[]))||[];if(p.length&&(S.age|0)>=1){T_(()=>LS.set(PEND,[]));setTimeout(()=>p.forEach(blessApply),2500)}stSync(1)}lastAlive=a}catch(e){}},3000)}
// เหตุการณ์ในชีวิต: เพื่อนที่ผูกชะตาโผล่มา (ชีวิตละ ≤3 · เว้นช่วงสุ่ม)
async function echoTo(f,tx){try{await api('fl',{o:'send',k:'echo',h:f.h,pn:pn(),cn:String(S.name||''),tx})}catch(e){}}
const FEV=[
 {id:'oath',go(f){choice('🤝 คนแปลกหน้าที่เหมือนเคยรู้จัก',`<b>${E(f.n)}</b>${f.ep?' “'+E(f.ep)+'”':''} เดินสวนมาแล้วหยุดชะงัก — ทั้งคู่รู้สึกเหมือนเคยเป็นพี่น้องกันมาก่อน<br><span class="tag2">(ตัวละครของ ${E(f.pn||'เพื่อน')} ที่ผูกชะตากับคุณ)</span>`,[
  {t:'🍶 ดื่มสาบานเป็นพี่น้อง',s:'',f(){const k=RI(0,2);if(k===0){addv('luck',6);say(`🍶 คุณกับ${E(f.n)}กรีดนิ้วดื่มสาบาน ฟ้าผ่าเปรี้ยงเหมือนรับรู้ · โชค +6`,'epic')}else if(k===1){addv('fame',25);say(`🍶 ข่าวการสาบานของคุณกับ${E(f.n)}แพร่ไปทั่ว · ชื่อเสียง +25`,'good')}else{say(`🍶 ดื่มไปได้ครึ่งจอก ${E(f.n)}หัวเราะ “ชาติก่อนเจ้าก็พูดแบบนี้” แล้วหายไปในฝูงชน`,'')}
   echoTo(f,`มีคนชื่อ${String(S.name||'')}ดื่มสาบานเป็นพี่น้องกับตัวละครของคุณ`)}},
  {t:'⚔️ ขอประลองดูฝีมือ',s:'',f(){const w=T_(()=>fight(f.n,(T_(()=>total())||100)*R(.7,1.3)));say(w?`⚔️ คุณชนะ${E(f.n)}อย่างฉิวเฉียด เขาหัวเราะลั่น “จำไว้ ชาติหน้าข้าเอาคืน”`:`⚔️ ${E(f.n)}ชนะคุณขาดลอย แล้วยื่นมือมาดึงคุณขึ้น`,w?'epic':'');echoTo(f,w?`${String(S.name||'')}ท้าประลองตัวละครคุณ แล้วชนะไปอย่างฉิวเฉียด`:`${String(S.name||'')}ท้าประลองตัวละครคุณ แต่แพ้ราบคาบ`)}},
  {t:'🚶 เดินผ่านไป',s:'',skip:1,f(){say('คุณเดินผ่านไป แต่หันกลับไปมองแล้วเห็นเขาก็หันมามองเหมือนกัน','')}}])}},
 {id:'gift',go(f){choice('🎁 ของฝากจากคนไม่รู้จัก',`มีคนฝากห่อผ้ามาให้ บอกว่าเป็นของจาก <b>${E(f.n)}</b> — “เขาบอกว่าเดี๋ยวคุณก็จำได้”<br><span class="tag2">(ตัวละครของ ${E(f.pn||'เพื่อน')})</span>`,[
  {t:'📦 แกะดู',s:'',f(){const k=RI(0,3);if(k===0){const g=RI(200,2000);addv('money',g);say(`📦 ข้างในมีทรัพย์ ${T_(()=>fmtM(g))||g} กับกระดาษเขียนว่า “ยืมก่อน”`,'good')}else if(k===1){addv('int',5);say('📦 ข้างในเป็นสมุดจดบันทึก ลายมือเหมือนของคุณกับของเขาสลับกันเขียน · ปัญญา +5','epic')}else if(k===2){T_(()=>{S.maxHp=(S.maxHp||100)+10});say('📦 ข้างในมีเครื่องรางเย็บมือ จับแล้วอุ่นวาบ · พลังชีวิตสูงสุด +10','epic')}else say('📦 ข้างในว่างเปล่า… มีแค่กลิ่นที่คุณคุ้นเคยอย่างประหลาด','');echoTo(f,`ของฝากจากตัวละครคุณไปถึงมือ${String(S.name||'')}แล้ว`)}},
  {t:'🙅 ไม่รับของคนแปลกหน้า',s:'',f(){say('คุณส่งของคืน คนส่งของถอนหายใจ “เขาบอกแล้วว่าคุณจะทำแบบนี้”','')}}])}},
 {id:'save',go(f){choice('🆘 มีคนกำลังจะตาย',`ข้างทางมีคนบาดเจ็บสาหัส — คุณจำหน้าเขาได้ทั้งที่ไม่เคยเจอ: <b>${E(f.n)}</b><br><span class="tag2">(ตัวละครของ ${E(f.pn||'เพื่อน')})</span>`,[
  {t:'🩹 ช่วยเขา',s:'เสี่ยง',f(){const ok=P_(.65);if(ok){addv('karma',8);say(`🩹 คุณช่วย${E(f.n)}ไว้ได้ เขาจับมือคุณแน่น “ชาตินี้ข้าติดหนี้เจ้า” · บุญ +8`,'epic');echoTo(f,`${String(S.name||'')}ช่วยชีวิตตัวละครของคุณไว้ตอนใกล้ตาย`)}else{const h=Math.round((S.maxHp||100)*.12);S.hp=Math.max(1,(S.hp||1)-h);say(`🩸 คนที่ทำร้ายเขายังอยู่แถวนั้น คุณโดนลูกหลงไปด้วย · พลังชีวิต −${h}`,'bad');echoTo(f,`${String(S.name||'')}พยายามช่วยตัวละครของคุณ จนตัวเองบาดเจ็บ`)}}},
  {t:'🏃 ไปตามคนมาช่วย',s:'',f(){say('คุณวิ่งไปตามหมอ พอกลับมาเขาหายไปแล้ว เหลือแค่รอยเลือดเป็นรูปตัวอักษรชื่อคุณ','');echoTo(f,`${String(S.name||'')}เจอตัวละครคุณบาดเจ็บ แล้ววิ่งไปตามหมอ`)}}])}}
];
function fTick(){try{if(!alive()||S.age<10||T_(()=>choice._cur)||!FL.f.length)return;S._fl=S._fl||{n:0,ny:S.age+RI(3,10),u:[]};const G=S._fl;if(G.n>=3||S.age<G.ny)return;G.ny=S.age+RI(4,14);if(!P_(.6))return;
 const f=CH(FL.f.filter(x=>x&&x.n));if(!f)return;const ev=CH(FEV.filter(e=>!G.u.includes(e.id)))||CH(FEV);G.u.push(ev.id);G.n++;ev.go(f)}catch(e){console.error('flTick',e)}}
window.flOpen=async function(){T_(()=>modal('<button class="xbtn" onclick="closeM()">✕</button><h3>👥 ผูกชะตาเพื่อน</h3><p class="tag2" style="text-align:center;padding:20px">⏳ กำลังโหลด…</p>','fl'));if(!on())return T_(()=>modal('<button class="xbtn" onclick="closeM()">✕</button><h3>👥 ผูกชะตาเพื่อน</h3><p class="tag2">ต้องออนไลน์ก่อน</p>','fl'));
 let c='';try{const j=await api('fl',{o:'code'});c=(j&&j.c)||''}catch(e){}await stSync(1);await flLoad(1);const F=FL.f;
 const qB=(f,q,lb)=>f.my&&f.my.q===q&&f.my.cn===f.n?`<span class="flQ on">${lb}: ${f.my.y?'ใช่':'ไม่'}</span>`:`<span class="flQ">${lb}: <button onclick="prMk('${f.h}','${q}',1)">ใช่</button><button onclick="prMk('${f.h}','${q}',0)">ไม่</button></span>`;
 T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>👥 ผูกชะตาเพื่อน</h3>
 <p class="tag2">ผูกชะตากับเพื่อนตัวจริง แล้วตัวละครของกันและกันจะโผล่ในชีวิตของอีกฝ่าย (พี่น้องร่วมสาบาน คู่ประลอง ของฝาก คนที่ต้องช่วย…) ผลที่ทำกับตัวละครเพื่อน จะส่งกลับไปถึงเพื่อนเป็นเสียงสะท้อน</p>
 <div class="flMe"><div><small>รหัสของคุณ</small><b>${E(c||'—')}</b></div><button class="gbtn" onclick="flCopy('${E(c)}')">📋 ส่งให้เพื่อน</button></div>
 <div class="flAdd"><input id="flIn" maxlength="8" placeholder="ใส่รหัสเพื่อน เช่น K7Q2MX" autocapitalize="characters"><button class="pbtn" onclick="flLink()">ผูกชะตา</button></div>
 <h4 class="flH">เพื่อนที่ผูกชะตา (${F.length}/8) · 🔮 แต้มหมอดูของคุณ <b>${FL.me}</b></h4>
 ${F.length?F.map(f=>`<div class="flF"><div class="t"><b>${E(f.pn||'เพื่อน')}</b><small>${f.n?`${f.al?'🟢 กำลังเป็น':'🪦 ชีวิตล่าสุด'} <b>${E(f.n)}</b> · ${WN[f.w]||''} · ${f.a|0} ปี`:'ยังไม่เคยเล่น'} · 🔮 ${f.sc|0}</small></div>
  <div class="b"><button class="gbtn" onclick="flBless('${f.h}')">🙏 ส่งพรชะตา</button><button class="gbtn" style="opacity:.6" onclick="flUnlink('${f.h}')">✂️</button></div>
  ${f.al&&f.n?`<div class="pr">🔮 ทายชีวิต${E(f.n)}: ${(f.a|0)<55?qB(f,'60','รอดถึง 60'):''}${qB(f,'wd','ได้แต่งงาน')}${(f.a|0)<85?qB(f,'90','รอดถึง 90 (×3)'):''}</div>`:''}</div>`).join(''):'<p class="tag2" style="text-align:center">ยังไม่มี — ส่งรหัสของคุณให้เพื่อน หรือใส่รหัสของเพื่อนด้านบน</p>'}
 <p class="tag2">🙏 พรชะตา: วันละครั้งต่อเพื่อน · ถ้าเพื่อนกำลังเล่น = พลังชีวิตเต็ม + โชค +5 ทันที · ถ้ายังไม่ได้เล่น = เก็บไว้ให้ชีวิตหน้า · 🔮 คำทายเฉลยเมื่อชีวิตนั้นจบ ทายถูกได้แต้มหมอดู</p>`,'fl'))};
window.flCopy=function(c){if(!c)return;const tx=`มาผูกชะตากันใน 1 ใน นวนิยาย 👥 รหัสของฉัน: ${c}\nhttps://www.1inanovel.com`;if(navigator.share){navigator.share({text:tx}).catch(()=>{})}else{try{navigator.clipboard.writeText(tx);toast('คัดลอกแล้ว ส่งให้เพื่อนได้เลย')}catch(e){prompt('คัดลอกข้อความนี้',tx)}}};
window.flLink=async function(){const c=String(($('flIn')||{}).value||'').trim();if(!c)return toast('ใส่รหัสเพื่อนก่อน');try{const j=await api('fl',{o:'link',c,pn:pn()});if(j&&j.ok){toast(j.dup?'ผูกกันอยู่แล้ว':'👥 ผูกชะตาแล้ว!');T_(()=>sfx('good'));flOpen()}else toast(j&&j.err==='code'?'ไม่พบรหัสนี้':j&&j.err==='full'?'ผูกได้สูงสุด 8 คน':'ลองใหม่อีกครั้ง')}catch(e){toast('ผูกไม่สำเร็จ')}};
window.flUnlink=async function(h){if(!confirm('ตัดชะตากับเพื่อนคนนี้?'))return;try{await api('fl',{o:'unlink',h})}catch(e){}flOpen()};
window.flBless=async function(h){try{const j=await api('fl',{o:'send',k:'bless',h,pn:pn(),cn:hasS()?String(S.name||''):''});toast(j&&j.ok?'🙏 ส่งพรชะตาแล้ว':j&&j.err==='day'?'วันนี้ส่งพรให้คนนี้แล้ว':'ส่งไม่สำเร็จ')}catch(e){toast('ส่งไม่สำเร็จ')}};
window.prMk=async function(h,q,y){try{const j=await api('pr',{o:'mk',h,q,y});toast(j&&j.ok?'🔮 บันทึกคำทายแล้ว รอเฉลยตอนชีวิตนั้นจบ':j&&j.err==='late'?'ช้าไปแล้ว อายุใกล้ถึงแล้ว':j&&j.err==='dead'?'ชีวิตนั้นจบไปแล้ว':'ทายไม่สำเร็จ');flOpen()}catch(e){toast('ทายไม่สำเร็จ')}};
// ======================= 🌍 ยุคประจำสัปดาห์ =======================
const ERA={plague:['🦠','ยุคโรคระบาด','โรคร้ายระบาดทุกโลก · ช่วยรักษาคน = ผลงานรวม','#7ad07a'],gold:['💰','ยุคทองการค้า','เงินสะพัด ตลาดบูม · ช่วยคนจน = ผลงานรวม','#ffd34a'],demon:['👹','มารฟ้าคืนชีพ','สมุนมารบุกทุกโลก · ปราบมาร = ผลงานรวม','#ff5a5a'],love:['💞','ยุคแห่งรัก','ความรักเบ่งบาน · ช่วยจับคู่ = ผลงานรวม','#ff8ac8'],meteor:['☄️','ยุคดาวตก','ดาวตกทั่วฟ้า มีของตกลงมา · ค้นพบ = ผลงานรวม','#9ac8ff'],flood:['🌊','ยุคน้ำหลาก','น้ำท่วมใหญ่ · ช่วยผู้ประสบภัย = ผลงานรวม','#5ab0ff']};
let ER=null,erT=0;async function erLoad(force){if(!on())return ER;if(!force&&ER&&Date.now()-erT<300e3)return ER;try{const j=await api('era',{});if(j&&j.ok){ER=j;erT=Date.now()}}catch(e){}return ER}
async function deed(n){try{const j=await api('era',{o:'deed',n:n||1});if(j&&j.ok){ER=j;erT=Date.now()}}catch(e){}}
const ERV={
 plague:{t:'🦠 โรคระบาดมาถึงหมู่บ้าน',x:'ผู้คนล้มป่วยทีละบ้าน เสียงไอดังทั้งคืน',o:[['🩺 ช่วยดูแลคนป่วย','เสี่ยงติดโรค',()=>{if(P_(.35)){const h=Math.round((S.maxHp||100)*.15);S.hp=Math.max(1,(S.hp||1)-h);say(`🤒 คุณติดโรคไปด้วย พลังชีวิต −${h} แต่ช่วยได้หลายชีวิต · บุญ +6`,'bad')}else say('🩺 คุณดูแลคนป่วยจนหายหลายคน ชาวบ้านจดจำ · บุญ +6','epic');addv('karma',6);deed(2)}],['🏠 กักตัวอยู่บ้าน','ปลอดภัย',()=>say('🏠 คุณกักตัวจนโรคซา ปลอดภัยดี','')],['💊 ขายยาราคาแพง','บาป',()=>{const g=RI(300,1500);addv('money',g);addv('karma',-8);say(`💊 ได้เงิน ${T_(()=>fmtM(g))||g} แต่ชาวบ้านสาปแช่ง · บุญ −8`,'bad')}]]},
 gold:{t:'💰 ตลาดบูมสุดขีด',x:'ราคาทุกอย่างพุ่ง พ่อค้าหน้าใหม่รวยข้ามคืน',o:[['📈 ทุ่มลงทุน','อาจรวยหรือหมดตัว',()=>{const m=Math.max(100,Math.round((S.money||0)*.3));if(P_(.6)){addv('money',m);say(`📈 กำไรเท่าตัว +${T_(()=>fmtM(m))||m}`,'epic')}else{addv('money',-Math.round(m*.6));say('📉 ฟองสบู่แตกพอดีตอนคุณเข้า ขาดทุนหนัก','bad')}}],['🍚 แจกข้าวคนจน','',()=>{addv('karma',5);addv('fame',10);say('🍚 คุณตั้งโรงทานแจกข้าว คนจนเรียกคุณว่าผู้มีพระคุณ · บุญ +5 · ชื่อเสียง +10','good');deed(2)}]]},
 demon:{t:'👹 สมุนมารบุกมา',x:'เงาดำกลุ่มหนึ่งโผล่จากรอยแยกฟ้า ไล่ฆ่าทุกคนที่ขวาง',o:[['⚔️ สู้!','',()=>{const w=T_(()=>fight('สมุนมารฟ้า',(T_(()=>total())||100)*R(.6,1.2)));if(w){addv('fame',20);say('⚔️ คุณฟันสมุนมารร่วงไปหลายตัว ผู้คนโห่ร้อง · ชื่อเสียง +20','epic');deed(3)}else say('🩸 สมุนมารแข็งแกร่งเกินคาด คุณถอยมาได้แบบสะบักสะบอม','bad')}],['🛡️ พาคนหนี','',()=>{addv('karma',4);say('🛡️ คุณพาเด็กและคนแก่หนีออกมาได้ทั้งหมด · บุญ +4','good');deed(1)}],['🫣 ซ่อนตัว','',()=>say('🫣 คุณซ่อนตัวจนพวกมันผ่านไป ใจเต้นไม่หยุด','')]]},
 love:{t:'💞 เทศกาลแห่งรัก',x:'โคมแดงแขวนเต็มเมือง ทุกคนดูอารมณ์ดีผิดปกติ',o:[['🎎 ช่วยจับคู่คนเหงา','',()=>{addv('karma',3);T_(()=>joy(8));say('🎎 คุณจับคู่สำเร็จสามคู่ งานแต่งเชิญคุณเป็นแขกเกียรติยศ · ความสุข +8','good');deed(2)}],['💌 สารภาพรักใครสักคน','',()=>{if(P_(.5)){T_(()=>joy(15));say('💌 อีกฝ่ายยิ้มเขิน… “รอมานานแล้ว” · ความสุข +15','epic')}else{T_(()=>joy(-6));say('💔 อีกฝ่ายบอกว่ามีคนในใจแล้ว คุณเดินกลับบ้านคนเดียวใต้โคมแดง','bad')}}]]},
 meteor:{t:'☄️ ดาวตกลงหลังเขา',x:'แสงวาบทั้งฟ้า ตามด้วยเสียงกัมปนาท',o:[['🔦 ไปค้นหา','',()=>{const k=RI(0,2);if(k===0){const g=T_(()=>{const v=Math.max(1,Math.round((S.power||0)*.04));S.power+=v;return v})||0;say(`☄️ คุณเจอเศษดาวเรืองแสง ดูดซับพลังได้ — พลัง +${T_(()=>fmt(g))||g}`,'myth',true)}else if(k===1){const g=RI(500,3000);addv('money',g);say(`☄️ เศษดาวขายได้ ${T_(()=>fmtM(g))||g}`,'good')}else{const h=Math.round((S.maxHp||100)*.1);S.hp=Math.max(1,(S.hp||1)-h);say(`🔥 หลุมยังร้อนจัด คุณโดนลวก · พลังชีวิต −${h}`,'bad')}deed(1)}],['🙏 อธิษฐาน','',()=>{addv('luck',4);say('🙏 คุณอธิษฐานกับดาวตก · โชค +4','good')}]]},
 flood:{t:'🌊 น้ำหลากท่วมเมือง',x:'น้ำมาเร็วจนหลายบ้านหนีไม่ทัน',o:[['🛶 ช่วยคนติดค้าง','เสี่ยง',()=>{if(P_(.3)){const h=Math.round((S.maxHp||100)*.12);S.hp=Math.max(1,(S.hp||1)-h);say(`🌊 กระแสน้ำซัดคุณกระแทกเสา · พลังชีวิต −${h} แต่ช่วยคนได้ · บุญ +6`,'bad')}else say('🛶 คุณช่วยคนติดหลังคาได้นับสิบ · บุญ +6','epic');addv('karma',6);deed(2)}],['🏔️ หนีขึ้นที่สูง','',()=>say('🏔️ คุณขึ้นที่สูงทัน ปลอดภัยดี','')]]}
};
function eTick(){try{if(!alive()||S.age<12||!ER||!ERV[ER.cur]||T_(()=>choice._cur))return;S._era=S._era||{};const G=S._era;if(G.w!==ER.w){G.w=ER.w;G.n=0;G.ny=S.age+RI(1,4)}if(G.n>=2||S.age<G.ny)return;G.ny=S.age+RI(3,9);if(!P_(.55))return;G.n++;
 const V=ERV[ER.cur],I=ERA[ER.cur];choice(`${V.t}`,`${V.x}<br><span class="tag2">${I[0]} ${I[1]} — เหตุการณ์ประจำสัปดาห์ของทุกโลก (ผลงานรวมทั้งเซิร์ฟ ${ER.p}/${ER.goal})</span>`,V.o.map(o=>({t:o[0],s:o[1],f(){T_(o[2])}})))}catch(e){console.error('eraTick',e)}}
setInterval(()=>{if(!document.hidden)erLoad()},300e3);setTimeout(()=>erLoad(1),5000);
window.eraOpen=async function(){await erLoad(1);const J=ER;if(!J)return toast('ต้องออนไลน์');const c=ERA[J.cur]||['🌍','ยุค','',''],pc=Math.min(100,Math.round(J.p/J.goal*100)),left=Math.max(0,Math.ceil((J.end-Date.now())/864e5)),tot=Object.values(J.tally||{}).reduce((a,b)=>a+b,0);
 const cl=J.p>=J.goal&&T_(()=>LS.get('murim_eraC',0))!==J.w;
 T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌍 ยุคประจำสัปดาห์</h3>
 <div class="erC" style="--c:${c[3]}"><i>${c[0]}</i><div><b>${c[1]}</b><small>${c[2]} · เหลืออีก ${left} วัน</small></div></div>
 <div class="erP"><i style="width:${pc}%;background:${c[3]}"></i></div><p class="tag2">ผลงานรวมทั้งเซิร์ฟ <b>${J.p}/${J.goal}</b> · ร่วมแล้ว ${J.us} คน · ถ้าครบเป้า ทุกคนรับรางวัลยุคได้${J.p>=J.goal?' — <b>ครบแล้ว!</b>':''}</p>
 ${cl?'<button class="pbtn" style="width:100%" onclick="eraClaim()">🎁 รับรางวัลยุค</button>':''}
 <h4 style="margin:12px 0 6px">🗳️ โหวตยุคของสัปดาห์หน้า</h4><div class="erV">${J.opts.map(k=>{const v=ERA[k],n=(J.tally||{})[k]||0,p=tot?Math.round(n/tot*100):0;return`<button class="opt ${J.my===k?'erOn':''}" ${J.my?'disabled':''} onclick="eraVote('${k}')">${v[0]} ${v[1]}<small>${v[2]}</small><em><u style="width:${p}%"></u></em><small>${n} เสียง${J.my===k?' · ✓ คุณโหวต':''}</small></button>`}).join('')}</div>
 <p class="tag2">ระหว่างสัปดาห์ ทุกชีวิตในทุกโลกจะเจอเหตุการณ์ของยุคนั้น ตัวเลือกที่ช่วยคนจะนับเป็นผลงานรวม</p>`,'era'))};
window.eraVote=async function(e){try{const j=await api('era',{o:'vote',e});if(j&&j.ok){ER=j;erT=Date.now();toast('🗳️ โหวตแล้ว');eraOpen()}}catch(x){toast('โหวตไม่สำเร็จ')}};
window.eraClaim=function(){if(!ER||ER.p<ER.goal)return;if(T_(()=>LS.get('murim_eraC',0))===ER.w)return toast('รับไปแล้ว');T_(()=>LS.set('murim_eraC',ER.w));if(alive()){addv('luck',5);addv('fame',30);T_(()=>joy(10));say(`🌍 ${ERA[ER.cur][1]}จบลงด้วยดีเพราะทุกคนช่วยกัน — โชค +5 · ชื่อเสียง +30 · ความสุข +10`,'myth',true)}else{const p=T_(()=>LS.get(PEND,[]))||[];p.push({k:'bless',pn:'ทั้งเซิร์ฟ'});T_(()=>LS.set(PEND,p.slice(-5)))}toast('🎁 รับรางวัลยุคแล้ว');closeM()};
// ======================= ห่อ passYear =======================
{const _py=passYear;const w=function(){const r=_py.apply(this,arguments);try{setTimeout(()=>{fTick();if(!T_(()=>choice._cur))eTick()},900)}catch(e){}return r};try{passYear=w}catch(e){}window.passYear=w}
setInterval(()=>{if(!document.hidden&&on())flLoad()},200e3);setTimeout(()=>flLoad(1),7000);
// ======================= 🎧 ฟังนิยาย =======================
const TTS={on:!!T_(()=>LS.get('murim_tts',0)),q:[],busy:0,v:null,rate:+(T_(()=>LS.get('murim_ttsR',1))||1)};
const synth=window.speechSynthesis;
function voice(){if(TTS.v)return TTS.v;try{const V=synth.getVoices();TTS.v=V.find(v=>/^th/i.test(v.lang))||null}catch(e){}return TTS.v}
const clean=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu,'').replace(/[·•—|]/g,' ').replace(/\s+/g,' ').trim();
function speakNext(){if(!TTS.on||TTS.busy||!TTS.q.length||!synth)return;const t=TTS.q.shift();if(!t)return;TTS.busy=1;try{const u=new SpeechSynthesisUtterance(t);u.lang='th-TH';const v=voice();if(v)u.voice=v;u.rate=TTS.rate;u.onend=u.onerror=()=>{TTS.busy=0;setTimeout(speakNext,120)};synth.speak(u)}catch(e){TTS.busy=0}}
function enq(t){if(!TTS.on)return;t=clean(t);if(t.length<4)return;if(TTS.q.length>4)TTS.q.splice(0,TTS.q.length-3);TTS.q.push(t.slice(0,220));speakNext()}
{const _lg=log;const w=function(t){const r=_lg.apply(this,arguments);try{if(TTS.on&&alive())enq(t)}catch(e){}return r};try{log=w}catch(e){}window.log=w}
{const _cs=choiceShow;const w=function(){const r=_cs.apply(this,arguments);try{const c=choice._cur;if(TTS.on&&c)enq(String(c.title||'')+' '+String(c.text||'').slice(0,160))}catch(e){}return r};try{choiceShow=w}catch(e){}window.choiceShow=w}
window.ttsToggle=function(){if(!synth)return toast('เครื่องนี้ไม่รองรับการอ่านออกเสียง');TTS.on=!TTS.on;T_(()=>LS.set('murim_tts',TTS.on?1:0));if(!TTS.on){try{synth.cancel()}catch(e){}TTS.q=[];TTS.busy=0}
 toast(TTS.on?(voice()?'🎧 เปิดฟังนิยายแล้ว — เปิดออโต้คู่กันจะเหมือนฟังนิยายเสียง':'🎧 เปิดแล้ว แต่เครื่องนี้ไม่มีเสียงอ่านภาษาไทย อาจอ่านไม่ชัด (ติดตั้งเสียงภาษาไทยในการตั้งค่าเครื่องได้)'):'🔇 ปิดฟังนิยายแล้ว');if(TTS.on)enq('เริ่มฟังนิยายชีวิตของ '+(hasS()?S.name:'คุณ'));try{closeM()}catch(e){}};
window.ttsRate=function(r){TTS.rate=r;T_(()=>LS.set('murim_ttsR',r))};
try{synth&&synth.addEventListener&&synth.addEventListener('voiceschanged',()=>{TTS.v=null;voice()})}catch(e){}
// ======================= 📸 ภาพประกอบนิยายปกแข็ง =======================
const ILL=[[/ประลอง|สู้|ดวล|ศึก|ฆ่า|ปะทะ|ชนะ|แพ้/,'yard'],[/ทะเล|เรือ|ท่าเรือ|น้ำ/,'sea'],[/ภูเขา|ผา|ถ้ำ|บำเพ็ญ|ทะลวง/,'mountain'],[/เมือง|ค้า|ตลาด|ร้าน|เงิน|งาน/,'city'],[/ฟ้า|เซียน|เทพ|สวรรค์/,'sky'],[/ดาว|จันทร์|ราตรี/,'star'],[/ป่า|ล่า|สัตว์/,'forest'],[/ตาย|สิ้น|ศพ|ฝัง/,'valley']];
function illus(){try{const m=$('modal');if(!m||m.dataset.k!=='nv'||m.querySelector('.nvIll'))return;const P=[...m.querySelectorAll('.pgx')];if(P.length<2||typeof pxThumb!=='function')return;const wd=/เทพเซียน/.test((m.querySelector('.ft')||{}).textContent||'')?'x':'m';
 P.forEach((pg,i)=>{const tx=pg.textContent||'',h=pg.querySelector('h5');if(!h)return;let ty='field';for(const[re,t]of ILL)if(re.test(tx)){ty=t;break}const src=T_(()=>pxThumb(ty,wd,(i*37+tx.length)%50));if(src)h.insertAdjacentHTML('afterend',`<img class="nvIll" src="${src}" alt="">`)})}catch(e){}}
new MutationObserver(()=>{illus();menuBtn()}).observe($('modal')||document.body,{childList:true});
// ======================= ปุ่มในเมนู ☰ =======================
function menuBtn(){try{const m=$('modal');if(!m||m.dataset.k!=='menu'||m.querySelector('.bdMb'))return;const row=m.querySelector('.uxRow');if(!row)return;const c=ER&&ERA[ER.cur];
 row.insertAdjacentHTML('beforeend',`<button class="gbtn bdMb" onclick="flOpen()">👥 ผูกชะตาเพื่อน${FL.f.length?' ('+FL.f.length+')':''}</button><button class="gbtn" onclick="eraOpen()">${c?c[0]+' '+c[1]:'🌍 ยุคประจำสัปดาห์'}</button><button class="gbtn" onclick="ttsToggle()">${TTS.on?'🔇 ปิดฟังนิยาย':'🎧 ฟังนิยาย'}</button>`)}catch(e){}}
const st=document.createElement('style');st.textContent=`.flMe{display:flex;align-items:center;gap:10px;padding:10px;border-radius:12px;border:1px dashed #e9b94988;margin:8px 0}.flMe div{flex:1}.flMe small{display:block;opacity:.7;font-size:12px}.flMe b{font-size:26px;letter-spacing:3px;color:#e9b949}
.flAdd{display:flex;gap:6px;margin-bottom:8px}.flAdd input{flex:1;min-width:0;font:inherit;font-size:16px;padding:8px 10px;border-radius:10px;border:1px solid #8885;text-transform:uppercase;letter-spacing:2px;background:transparent;color:inherit}
.flH{margin:10px 0 6px;font-size:14.5px}.flF{border:1px solid #8884;border-radius:12px;padding:9px 10px;margin-bottom:7px;display:grid;grid-template-columns:1fr auto;gap:6px}.flF .t small{display:block;font-size:12px;opacity:.8}.flF .b{display:flex;gap:4px}.flF .b button{padding:6px 8px;font-size:12.5px}
.flF .pr{grid-column:1/-1;font-size:12.5px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}.flQ{display:inline-flex;gap:3px;align-items:center;padding:3px 6px;border-radius:8px;background:#8881}.flQ button{font:inherit;font-size:12px;padding:2px 7px;border-radius:6px;border:1px solid #8886;background:transparent;color:inherit}.flQ.on{background:#e9b94930}
.erC{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:color-mix(in srgb,var(--c) 16%,transparent);border:1px solid var(--c)}.erC i{font-style:normal;font-size:34px}.erC b{display:block;font-size:17px}.erC small{opacity:.8;font-size:12.5px}
.erP{height:10px;border-radius:9px;background:#8883;overflow:hidden;margin:10px 0 4px}.erP i{display:block;height:100%}.erV{display:grid;gap:6px}.erV .opt small{display:block;font-size:12px;opacity:.75}.erV em{display:block;height:5px;border-radius:5px;background:#8883;margin:5px 0 2px;overflow:hidden}.erV em u{display:block;height:100%;background:#e9b949;text-decoration:none}.erV .erOn{border-color:#e9b949!important}
.nvIll{display:block;width:100%;image-rendering:pixelated;border-radius:8px;margin:4px 0 8px;box-shadow:0 2px 8px #0006}`;document.head.appendChild(st);
window._bond={flLoad,stSync,inbox,FEV,ERV,erLoad,TTS,illus};
})()}catch(e){console.error('mod-bond',e)}
try{wReady('bond')}catch(e){}
