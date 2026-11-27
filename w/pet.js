// ============================================================
// /w/pet.js 🐾 สัตว์คู่ใจข้ามชาติ (ทุกโลก · โหลดเบื้องหลัง 4.2 วิ)
//  ดวงวิญญาณสัตว์ตัวเดียวที่ตามคุณไปทุกชาติ แต่เปลี่ยนร่างตามโลก (แมวจร → สัตว์วิญญาณ → โดรน → แมวดำ ฯลฯ)
//  LS murim_cpn {nm, lv, xp, mem(ความจำต่อคุณ 0–100), bond(ข้ามชาติ), tr{kind,brave,greedy,wise}, lives[{w,f,a,n,d}], born}
//  ในชีวิต: S._cp {met, at(อายุที่จะเจอ), bond, age, dead, ev, rem} · เจอกันทุกชีวิตที่อายุสุ่ม · อาจจำคุณไม่ได้ (ตาม mem)
//  ผล: ช่วยตอนพลังชีวิตต่ำ · หาของ · ร่วมสู้ · ป่วย/หลงทาง · แก่ตายได้ แล้วกลับมาเกิดชาติหน้า · นิสัยโตตามสิ่งที่คุณทำ
// ============================================================
try{(function(){
if(window._cpn)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T_=f=>{try{return f()}catch(e){return null}};
const R=(a,b)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),CH=a=>a[Math.floor(Math.random()*a.length)],P_=p=>Math.random()<p;
const hasS=()=>typeof S!=='undefined'&&!!S,alive=()=>hasS()&&!!S.alive;
const say=(t,c,b)=>T_(()=>log(t,c||'',!!b));
const wk=()=>{if(!hasS())return'murim';const M=S.mw;if(M&&M.sky)return'sky';if(M&&M.fan)return'fan';if(M&&M.fog)return'fog';if(S.beastMode&&!S.beastMode.human)return'beast';if(S.ch==='soul')return'soul';if(S.rg)return'loop';if(M)return'mw';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
// ร่างตามโลก: [ไอคอน, ร่าง, เสียง/ท่าทาง, อายุขัยในร่างนี้]
const FORM={murim:[['🐈','แมวจรขนส้ม','เอาหัวมาถูขาคุณ',16],['🐕','หมาดำหูตก','กระดิกหางจนตัวโยก',14],['🕊️','นกกระเรียนขาเจ็บ','กางปีกเต้นรำ',30]],
 xian:[['🦊','ลูกจิ้งจอกหางเดียว','ซุกตัวในแขนเสื้อ',300],['🐢','เต่าหยกตัวน้อย','ยื่นคอออกมามอง',800],['🐍','งูขาววิญญาณ','พันข้อมือเบาๆ',500]],
 god:[['🦄','กิเลนน้อย','เหยียบเมฆเล่น',5000],['🐦‍🔥','ลูกนกเพลิง','เกาะไหล่แล้วอุ่นวาบ',9000]],
 soul:[['🐺','หมาป่าเงาวิญญาณ','หอนเบาๆ ใส่พระจันทร์',60],['🦉','นกฮูกวิญญาณ','หมุนคอมองคุณ',50]],
 mw:[['🐈','แมวจรหน้าเซเว่น','ร้องเหมียวยาวๆ',18],['🐕','หมาบ้านตาบอดข้างเดียว','เดินชนขาคุณทุกครั้ง',14]],
 sky:[['🛸','โดรนผู้ช่วย AI รุ่นเก่า','กะพริบไฟสามครั้ง',40],['🤖','หุ่นยนต์ทำความสะอาดที่หนีออกมา','ส่งเสียงบี๊บเศร้าๆ',30]],
 fog:[['🐈‍⬛','แมวดำตาสองสี','นั่งจ้องหมอกโดยไม่กะพริบตา',18],['🐦‍⬛','อีกาที่พูดได้สามคำ','ร้องชื่อคุณผิดๆ ถูกๆ',25]],
 beast:[['🐦','นกน้อยที่ไม่กลัวอสูร','เกาะเขาของคุณ',12],['🐀','หนูขาวกล้าหาญ','วิ่งวนรอบเท้าคุณ',6]],
 loop:[['🐈','แมวที่จำทุกลูปได้','มองคุณเหมือนรู้ว่าเกิดอะไรขึ้น',99]]};
const NAMES=['ส้มจี๊ด','ข้าวปั้น','เมฆา','ดาวหาง','ถั่วดำ','ซาลาเปา','หมอก','ทองคำ','ผีเสื้อ','ลูกไฟ','จันทร์เสี้ยว','เต้าหู้'];
const LK='murim_cpn',ld=()=>{try{const v=LS.get(LK,null);return v&&typeof v==='object'?v:null}catch(e){return null}},sv=v=>{try{LS.set(LK,v)}catch(e){}};
const TRN={kind:'ใจดี',brave:'กล้าหาญ',greedy:'ตะกละ',wise:'ฉลาดเกินสัตว์'};
const trTop=C=>{const t=C&&C.tr||{};const k=Object.keys(t).sort((a,b)=>(t[b]||0)-(t[a]||0))[0];return k&&(t[k]|0)>=3?k:''};
const lvOf=x=>Math.min(30,Math.floor(Math.sqrt((x|0)/12)));
// ---------- เริ่มชีวิต: กำหนดอายุที่จะเจอ ----------
function lifeInit(){const C=ld();S._cp={met:0,at:C?RI(3,14):RI(5,12),bond:0,age:0,dead:0,ev:0,f:null,w:wk()};}
// ---------- เจอกัน ----------
function meet(){const C0=ld(),w=wk(),F=CH(FORM[w]||FORM.murim),cp=S._cp;cp.f=F;
 if(!C0){const nm=CH(NAMES);choice(`${F[0]} ${F[1]}`,`${F[1]}ตัวหนึ่งเดินตามคุณกลับบ้าน ${F[2]} — มันไม่ยอมไปไหนเลย`,[
  {t:'🏠 รับเลี้ยง',s:'',f(){const C={nm,lv:0,xp:0,mem:60,bond:20,tr:{},lives:[],born:Date.now()};sv(C);cp.met=1;cp.bond=20;say(`${F[0]} คุณตั้งชื่อมันว่า <b>${E(nm)}</b> — มันกระพริบตาช้าๆ เหมือนตกลง<br><span class="tag2">🐾 สัตว์คู่ใจข้ามชาติ: มันจะตามหาคุณทุกชาติ ในร่างที่ต่างออกไป (☰ → 🐾 สัตว์คู่ใจ)</span>`,'myth',true)}},
  {t:'🙅 ไล่ไป',s:'มันอาจกลับมา',f(){cp.at=S.age+RI(2,6);say(`${F[0]} ${F[1]}เดินจากไปช้าๆ หันมามองสองครั้ง`,'')}}]);return}
 if(C0.dead){C0.dead=null;sv(C0)}
 const rem=P_(Math.min(.95,(C0.mem|0)/100+(w==='loop'?1:0)));cp.rem=rem;
 if(rem){cp.met=1;cp.bond=Math.min(100,Math.round((C0.bond|0)*.7)+10);say(`${F[0]} ${F[1]}วิ่งตรงมาหาคุณ ${F[2]} — แววตานั้น… <b>${E(C0.nm)}</b>! มันจำคุณได้ ทั้งที่คุณเปลี่ยนไปทั้งร่าง<br><span class="tag2">ชาติที่ ${(C0.lives||[]).length+1} ที่ได้เจอกัน · ความผูกพันตั้งต้น ${cp.bond}</span>`,'myth',true);T_(()=>joy(12))}
 else choice(`${F[0]} ${F[1]}ตัวหนึ่ง`,`มันจ้องคุณนาน… แล้วเดินหนี เหมือนจำอะไรบางอย่างได้ลางๆ แต่ไม่แน่ใจ<br><span class="tag2">(${E(C0.nm)} ในร่างใหม่ — ครั้งนี้มันจำคุณไม่ได้)</span>`,[
  {t:'🍖 ค่อยๆ ตีสนิท',s:'ใช้เวลา',f(){if(P_(.6)){cp.met=1;cp.bond=12;say(`${F[0]} หลายเดือนผ่านไป มันยอมให้คุณจับหัว — แล้วจู่ๆ ก็ ${F[2]} แบบที่ <b>${E(C0.nm)}</b> เคยทำ`,'epic')}else{cp.at=S.age+RI(2,5);say(`${F[0]} มันยังไม่ไว้ใจ หายไปพักหนึ่ง`,'')}}},
  {t:'📣 เรียกชื่อ “'+C0.nm+'”',s:'เสี่ยงแต่เร็ว',f(){if(P_(.4)){cp.met=1;cp.bond=Math.round((C0.bond|0)*.5);cp.rem=1;say(`${F[0]} หูมันกระดิกทันทีที่ได้ยินชื่อ — วิ่งพุ่งเข้าใส่คุณจนล้มหงาย <b>${E(C0.nm)}</b> จำได้แล้ว!`,'myth',true);T_(()=>joy(15))}else{cp.at=S.age+RI(3,7);C0.mem=Math.max(0,(C0.mem|0)-5);sv(C0);say(`${F[0]} มันสะดุ้งแล้ววิ่งหนีไปไกล`,'')}}}])}
// ---------- รายปี ----------
function tick(){try{if(!alive())return;if(!S._cp)lifeInit();const cp=S._cp,C=ld();
 if(!cp.met){if(S.age>=cp.at&&!T_(()=>choice._cur)&&!(S.beastMode&&!S.beastMode.human&&(S.beastMode.st|0)<1))meet();return}
 if(cp.dead||!C||!cp.f)return;cp.age++;cp.bond=Math.min(100,cp.bond+RI(1,3));C.xp=(C.xp|0)+1;
 // นิสัยโตตามคุณ
 const k=S.karma|0;if(k>=60&&P_(.15))C.tr.kind=(C.tr.kind|0)+1;if(k<=-40&&P_(.15))C.tr.greedy=(C.tr.greedy|0)+1;if((S.int|0)>=120&&P_(.1))C.tr.wise=(C.tr.wise|0)+1;sv(C);
 // ช่วยตอนพลังชีวิตต่ำ
 if(S.hp<(S.maxHp||100)*.25&&P_(.35+cp.bond/300)){const h=Math.round((S.maxHp||100)*.2);S.hp=Math.min(S.maxHp||h,S.hp+h);say(`${cp.f[0]} <b>${E(C.nm)}</b>นอนขดข้างคุณทั้งคืนตอนป่วยหนัก — ตื่นมารู้สึกดีขึ้น · พลังชีวิต +${h}`,'epic');return}
 // แก่ตาย
 if(cp.age>=cp.f[3]&&P_(.35)){cp.dead=1;C.dead={a:S.age};C.mem=Math.min(100,(C.mem|0)+Math.round(cp.bond/10));sv(C);
  say(`${cp.f[0]} <b>${E(C.nm)}</b>จากไปอย่างสงบในอ้อมแขนคุณ อายุ ${cp.age} ปีในร่าง${cp.f[1]} — ก่อนหลับตา มัน ${cp.f[2]} เป็นครั้งสุดท้าย<br><span class="tag2">🐾 มันจะกลับมาในชาติหน้า (ความจำต่อคุณ ${C.mem})</span>`,'myth',true);T_(()=>joy(-18));return}
 if(T_(()=>choice._cur))return;if(S.age<(cp.ev|0))return;if(!P_(.22))return;cp.ev=S.age+RI(2,6);
 const t=trTop(C),ev=CH(['find','fight','lost','sick','show','gift'].concat(t==='greedy'?['steal']:t==='brave'?['fight']:t==='wise'?['wise']:t==='kind'?['help']:[]));
 const N=`${cp.f[0]} <b>${E(C.nm)}</b>`;
 if(ev==='find'){const g=RI(50,600)*(1+lvOf(C.xp)*.2);S.money=(S.money||0)+Math.round(g);say(`${N}คาบ${CH(['ถุงเงินเก่าๆ','ปิ่นหยก','แหวนทอง','กล่องเหล็กขึ้นสนิม'])}มาวางตรงหน้า หางกระดิกภูมิใจ · ได้ ${T_(()=>fmtM(Math.round(g)))||Math.round(g)}`,'good')}
 else if(ev==='fight'){const g=Math.max(1,Math.round((S.power||0)*.02*(1+lvOf(C.xp)*.1)));S.power=(S.power||0)+g;C.tr.brave=(C.tr.brave|0)+1;sv(C);say(`${N}กระโจนเข้าขวางศัตรูที่ลอบโจมตีคุณ จนคุณตั้งตัวทัน — ฝึกด้วยกันมาจนเข้าขา · พลัง +${T_(()=>fmt(g))||g}`,'epic')}
 else if(ev==='steal'){const g=RI(100,800);S.money=(S.money||0)+g;S.karma=(S.karma|0)-3;say(`${N}ขโมยของจากร้านข้างบ้านมาให้ (อีกแล้ว) คุณต้องแอบเอาไปคืนครึ่งหนึ่ง · ได้ ${T_(()=>fmtM(g))||g} · บุญ −3`,'bad')}
 else if(ev==='wise'){S.int=(S.int|0)+4;say(`${N}เอาอุ้งเท้าเขี่ยตำราเปิดไปหน้าหนึ่ง — คำตอบที่คุณหามาทั้งเดือนอยู่ตรงนั้นพอดี · ปัญญา +4`,'epic')}
 else if(ev==='help'){S.karma=(S.karma|0)+4;say(`${N}พาลูกแมวกำพร้าสามตัวมาให้คุณเลี้ยง… คุณถอนหายใจแล้วรับไว้ · บุญ +4`,'good')}
 else if(ev==='show'){T_(()=>joy(6));say(`${N} ${cp.f[2]} — วันธรรมดาๆ แต่คุณยิ้มทั้งวัน · ความสุข +6`,'')}
 else if(ev==='gift'){cp.bond=Math.min(100,cp.bond+5);say(`${N}นอนทับเท้าคุณทั้งคืนจนเหน็บกิน แต่คุณไม่กล้าขยับ · ความผูกพัน +5`,'')}
 else if(ev==='lost')choice(`🐾 ${C.nm}หายไป`,`${cp.f[1]}ของคุณหายไปสามวันแล้ว เพื่อนบ้านบอกว่าเห็นมันเดินไปทาง${CH(['ป่าหลังเขา','ท่าเรือ','ตลาดมืด','บ่อน้ำร้าง'])}`,[
  {t:'🔦 ออกตามหา',s:'เสี่ยง',f(){if(P_(.7)){cp.bond=Math.min(100,cp.bond+10);say(`🔦 คุณเจอ${N}ติดอยู่ในหลุม มันร้องดีใจสุดเสียง · ความผูกพัน +10`,'epic')}else{const h=Math.round((S.maxHp||100)*.1);S.hp=Math.max(1,S.hp-h);cp.bond=Math.min(100,cp.bond+6);say(`🩸 คุณพลัดตกเนินตอนตามหา แต่สุดท้ายก็เจอ${N} · พลังชีวิต −${h}`,'bad')}}},
  {t:'⏳ รอให้มันกลับมาเอง',s:'',f(){if(P_(.55))say(`${N}กลับมาเองตอนเช้าพร้อมขนเปียกโชก ทำหน้าเหมือนไม่มีอะไรเกิดขึ้น`,'');else{cp.bond=Math.max(0,cp.bond-12);say(`${N}กลับมาหลังผ่านไปหนึ่งเดือน ผอมลงเยอะ และดูไม่ค่อยไว้ใจคุณเหมือนเดิม · ความผูกพัน −12`,'bad')}}}]);
 else if(ev==='sick')choice(`🐾 ${C.nm}ป่วย`,`${cp.f[1]}ของคุณซึม ไม่กินอะไรมาสองวัน`,[
  {t:'💊 ทุ่มเงินรักษา',s:'',f(){const c=Math.round((S.money||0)*.1+80);S.money=Math.max(0,(S.money||0)-c);cp.bond=Math.min(100,cp.bond+8);say(`💊 ใช้ไป ${T_(()=>fmtM(c))||c} ${N}หายดี กลับมา ${cp.f[2]} เหมือนเดิม · ความผูกพัน +8`,'good')}},
  {t:'🌿 รักษาเองแบบบ้านๆ',s:'',f(){if(P_(.6))say(`🌿 ${N}ค่อยๆ ดีขึ้น`,'');else{cp.age+=3;say(`🌿 ${N}รอด แต่ดูแก่ลงไปเยอะ`,'bad')}}}])}catch(e){console.error('cpTick',e)}}
{const _py=passYear;const w=function(){const r=_py.apply(this,arguments);try{setTimeout(tick,700)}catch(e){}return r};try{passYear=w}catch(e){}window.passYear=w}
// ---------- เริ่ม/จบชีวิต ----------
{let la=false;setInterval(()=>{try{const a=alive();if(a&&!la){if(!S._cp||S._cp.w!==wk()&&!S._cp.met)lifeInit();const C=ld();if(C&&(C.bond|0)>=50&&!S._cpB){S._cpB=1;S.luck=(S.luck|0)+Math.min(5,Math.floor(C.bond/20))}}la=a}catch(e){}},2500)}
setInterval(()=>{try{const e=$('end');if(!e||!e.classList.contains('on')||!hasS()||S._cpRec)return;S._cpRec=1;const cp=S._cp,C=ld();if(!C||!cp||!cp.met)return;
 C.lives=(C.lives||[]).concat([{w:wk(),f:cp.f?cp.f[0]+' '+cp.f[1]:'',a:cp.age|0,n:String(S.name||''),d:cp.dead?1:0,r:cp.rem?1:0}]).slice(-20);
 C.bond=Math.round(((C.bond|0)+cp.bond)/2);C.mem=Math.max(5,Math.min(100,(C.mem|0)+(cp.bond>=60?8:cp.bond>=30?2:-10)));C.xp=(C.xp|0)+5;if(!cp.dead)C.dead=null;sv(C)}catch(x){}},1500);
// ---------- หน้าต่าง ----------
window.cpnOpen=function(){const C=ld(),cp=hasS()?S._cp:null;
 if(!C){T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🐾 สัตว์คู่ใจข้ามชาติ</h3><p class="tag2">ยังไม่มีใครตามคุณมา… ใช้ชีวิตไปเรื่อยๆ วันหนึ่งจะมีสัตว์ตัวหนึ่งเดินตามคุณกลับบ้าน — แล้วมันจะตามหาคุณทุกชาติ ในร่างที่ต่างออกไปตามโลกที่คุณเกิด</p>`,'cpn'));return}
 const t=trTop(C),lv=lvOf(C.xp),now=cp&&cp.met&&cp.f?`${cp.f[0]} <b>${cp.f[1]}</b> · อายุ ${cp.age|0} ปี${cp.dead?' · 🪦 จากไปแล้วในชาตินี้':''} · ผูกพันชาตินี้ ${cp.bond|0}`:(C.dead?'🌙 จากไปแล้ว — จะกลับมาเกิดในชาติหน้า':'🔎 ยังไม่เจอกันในชาตินี้ — มันกำลังตามหาคุณ');
 T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🐾 ${E(C.nm)}</h3>
 <div class="cpC"><div class="i">${cp&&cp.f?cp.f[0]:'🐾'}</div><div><div>${now}</div><small>เลเวล ${lv} · ความจำต่อคุณ ${C.mem|0}/100 · ผูกพันข้ามชาติ ${C.bond|0}/100${t?' · นิสัย: '+TRN[t]:''}</small></div></div>
 <div class="cpM"><i style="width:${C.mem|0}%"></i></div><p class="tag2">ความจำสูง = ชาติหน้ามีโอกาสจำคุณได้ทันที · ผูกพันมากตอนจบชีวิต ความจำจะเพิ่ม ทิ้งขว้างจะลดลง · ผูกพันข้ามชาติ ≥50 ได้โชคตอนเริ่มชีวิต</p>
 ${cp&&cp.met&&!cp.dead?`<button class="pbtn" style="width:100%" onclick="cpnPat()">🤲 ลูบหัว${S._cpPat===S.age?' (ปีนี้แล้ว)':''}</button>`:''}
 <h4 style="margin:12px 0 6px">📜 ชาติที่ผ่านมาด้วยกัน (${(C.lives||[]).length})</h4>
 <div class="cpL">${(C.lives||[]).slice().reverse().map(l=>`<div>${E(l.f)} <small>· ${E(l.n)} · อยู่ด้วยกัน ${l.a} ปี${l.r?' · จำได้':''}${l.d?' · 🪦':''}</small></div>`).join('')||'<small class="tag2">ยังไม่มี</small>'}</div>
 <button class="gbtn" style="width:100%;margin-top:8px" onclick="cpnRename()">✏️ เปลี่ยนชื่อ</button>`,'cpn'))};
window.cpnPat=function(){if(!alive()||!S._cp||!S._cp.met)return;if(S._cpPat===S.age)return toast('ลูบไปแล้วปีนี้ มันเริ่มรำคาญ');S._cpPat=S.age;S._cp.bond=Math.min(100,(S._cp.bond|0)+3);T_(()=>joy(4));toast(`${S._cp.f[0]} ${S._cp.f[2]}`);cpnOpen()};
window.cpnRename=function(){const C=ld();if(!C)return;const n=prompt('ชื่อใหม่',C.nm);if(!n)return;C.nm=String(n).replace(/[<>&"'`]/g,'').trim().slice(0,16)||C.nm;sv(C);cpnOpen()};
function menuBtn(){try{const m=$('modal');if(!m||m.dataset.k!=='menu'||m.querySelector('.cpnMb'))return;const row=m.querySelector('.uxRow');const C=ld(),cp=hasS()?S._cp:null;if(row)row.insertAdjacentHTML('beforeend',`<button class="gbtn cpnMb" onclick="cpnOpen()">${cp&&cp.met&&cp.f&&!cp.dead?cp.f[0]:'🐾'} ${C?E(C.nm):'สัตว์คู่ใจ'}</button>`)}catch(e){}}
new MutationObserver(()=>menuBtn()).observe($('modal')||document.body,{childList:true});
const st=document.createElement('style');st.textContent=`.cpC{display:flex;gap:12px;align-items:center;padding:10px;border-radius:14px;border:1px solid #e9b94966;background:#e9b94912}.cpC .i{font-size:44px}.cpC small{display:block;opacity:.75;font-size:12.5px;margin-top:3px}
.cpM{height:7px;border-radius:7px;background:#8883;margin:8px 0 4px;overflow:hidden}.cpM i{display:block;height:100%;background:linear-gradient(90deg,#9ad0ff,#e9b949)}.cpL{display:grid;gap:4px;font-size:13.5px}.cpL small{opacity:.7}`;document.head.appendChild(st);
window._cpn={ld,sv,tick,meet,FORM};
})()}catch(e){console.error('mod-pet',e)}
try{wReady('pet')}catch(e){}
