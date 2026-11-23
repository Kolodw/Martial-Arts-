// ============================================================
// /w/hrt.js 🕸️ สายใยข้ามชาติ — ใช้ได้ทุกโลก (ยุทธภพ · เซียน · สัตว์อสูร · ยุคปัจจุบัน · ทะลุฟ้าดารา · ม่านหมอก · วิญญาณยุทธ์)
//  1) 🧿 ของสืบทอดข้ามชาติ: ของชิ้นเดียวที่ตามคุณทุกชาติ จำเจ้าของทุกคน (LS murim_heir) · เจอโดยบังเอิญในชาติใหม่ · ปลุกความทรงจำ (มินิเกมเรียงเหตุการณ์ชาติก่อน)
//     นิสัยของของเปลี่ยนตามเจ้าของ (กรรม · ตายยังไง) → เสียงกระซิบ/พร/คำสาป · เลือกเก็บ/ขาย/ทำลาย/ส่งให้ลูก
//  2) 🕸️ ด้ายแดงข้ามชาติ: คนสำคัญของชาติก่อน (คู่ · ศัตรู · ศิษย์) เกิดใหม่ในร่างคนแปลกหน้า (LS murim_thread) · มีตำหนิประจำตัว
//     ฝันเห็นตำหนิก่อน → ภายหลังต้องจำให้ได้จากคนแปลกหน้า 3 คน (มินิเกม) → เส้นเรื่อง 3 ตอน (รักซ้ำ / แค้นซ้ำ / สลับบทครูกับศิษย์)
//  3) 📅 บทวัยกลางคน (30–60): เส้นเรื่องหลายตอนตามโลก · วิกฤตวัยสี่สิบ · พ่อแม่แก่ลง · เพื่อนเก่ากลับมา · ร่างกายเริ่มทรยศ · ลูกออกจากบ้าน
//     ตอนต่อไปขึ้นกับที่เลือก · หักมุม · มินิเกม (ป้อนยาตามเวลา · ฝืนร่างกาย)
//  สถานะชีวิตนี้ S._hrt · ไม่แตะเซฟเดิม
// ============================================================
try{(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),rp=a=>a[Math.floor(Math.random()*a.length)],P=p=>Math.random()<p,shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const E=s=>{try{return esc(String(s))}catch(e){return String(s)}};
const L=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSet=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const H=()=>{if(!S._hrt)S._hrt={y:-1,mid:{},th:null,hl:null,dream:0};return S._hrt};
const say=(t,k)=>{try{log(t,k||'')}catch(e){}};
const key=t=>{try{keyAdd(t)}catch(e){}};
const fx=o=>{try{if(o.joy)S.happy=Math.max(0,Math.min(100,(+S.happy||50)+o.joy));if(o.hp){S.maxHp=Math.max(10,(+S.maxHp||100)+o.hp);S.hp=Math.min(S.maxHp,Math.max(1,(+S.hp||1)+o.hp))}if(o.mon)S.money=Math.max(0,(+S.money||0)+o.mon);if(o.karma)S.karma=(+S.karma||0)+o.karma;if(o.fame)S.fame=(+S.fame||0)+o.fame;if(o.life)S.lifespan=(+S.lifespan||60)+o.life;if(o.pow)S.power=(+S.power||0)+o.pow;if(o.int)S.int=(+S.int||0)+o.int}catch(e){}};
// โลกตอนนี้
const wk=()=>{try{if(S.beastMode&&!S.beastMode.human)return'beast';if(S.mw&&S.mw.fog)return'fog';if(S.mw&&S.mw.sky)return'sky';if(S.mw)return'mw';if(S.sv&&(CFG.chm===5||S.soul))return'soul';if(S.xian)return'xian';return'murim'}catch(e){return'murim'}};
const WN={murim:'ยุทธภพ',xian:'แดนเซียน',beast:'ป่าลึก',mw:'กรุงเทพฯ',sky:'นครกำแพง',fog:'นครม่านหมอก',soul:'ทวีปวิญญาณยุทธ์'};
// คำตามโลก
const V={
 job:{murim:'สำนัก',xian:'สำนักบำเพ็ญ',beast:'ฝูง',mw:'ที่ทำงาน',sky:'หน่วยกำแพง',fog:'สำนักงานสืบสวน',soul:'สถาบัน'},
 boss:{murim:'เจ้าสำนัก',xian:'ผู้อาวุโส',beast:'จ่าฝูง',mw:'เจ้านาย',sky:'ผู้บัญชาการ',fog:'หัวหน้าหน่วย',soul:'คณบดี'},
 money:{murim:'ตำลึงเงิน',xian:'หินวิญญาณ',beast:'อาหาร',mw:'เงินเก็บ',sky:'เครดิต',fog:'เหรียญเงิน',soul:'เหรียญทอง'},
 doc:{murim:'หมอยา',xian:'ยอดนักปรุงโอสถ',beast:'สมุนไพรป่า',mw:'โรงพยาบาล',sky:'หน่วยแพทย์ชั้นใน',fog:'หมอตรอกล่าง',soul:'หอรักษา'},
 home:{murim:'บ้านเกิดที่หมู่บ้าน',xian:'ถ้ำบ่มเพาะ',beast:'โพรงเก่า',mw:'บ้านต่างจังหวัด',sky:'ห้องพักชั้นนอก',fog:'ห้องเช่าริมท่าเรือ',soul:'บ้านไม้ในหมู่บ้าน'},
};
const v=k=>(V[k]&&V[k][wk()])||V[k].murim;
const busy=()=>{try{return !S||!S.alive||!!choice._cur||!!modalOpen||!!document.getElementById('ghr')||!!document.getElementById('hrtOv')||!!document.querySelector('.kfx')}catch(e){return true}};

// ---------------- UI มินิเกม (แผ่นเต็มจอ เบาๆ ไม่ชนกับ modal) ----------------
const css=document.createElement('style');css.textContent=`
#hrtOv{position:fixed;inset:0;z-index:99975;background:radial-gradient(120% 90% at 50% 20%,#241a2e,#0b0810 70%);color:#efe6d6;display:flex;flex-direction:column;overflow:auto}
#hrtOv .hB{max-width:560px;width:100%;margin:0 auto;padding:calc(env(safe-area-inset-top) + 18px) 16px 24px;box-sizing:border-box}
#hrtOv h2{margin:0 0 6px;font-size:21px;color:#ffd9a8}#hrtOv .hx{font-size:15px;line-height:1.7;margin:6px 0 12px}#hrtOv .hs{font-size:12.5px;opacity:.65}
#hrtOv .hO{display:block;width:100%;text-align:left;margin:8px 0;padding:12px 14px;border-radius:12px;border:1px solid #ffffff24;background:#ffffff0a;color:inherit;font:inherit;font-size:15px;cursor:pointer}
#hrtOv .hO:active{transform:scale(.98)}#hrtOv .hO small{display:block;opacity:.65;font-size:12px;margin-top:2px}
#hrtOv .hC{border-radius:14px;padding:12px;margin:8px 0;background:#ffffff08;border:1px solid #ffffff1a;line-height:1.6}
#hrtOv .hMem{display:block;width:100%;text-align:left;margin:7px 0;padding:11px 13px;border-radius:10px;border:1px dashed #ffd9a866;background:#2a1f12aa;color:inherit;font:inherit;font-size:14px}
#hrtOv .hMem.on{border-style:solid;border-color:#7cf0a0;background:#16301f}
#hrtOv .hRes{padding:12px;border-radius:12px;margin:10px 0}#hrtOv .ok{background:#16301f;border:1px solid #3a7a52}#hrtOv .bad{background:#3a1414;border:1px solid #8a2a2a}
#hrtOv .hBar{height:10px;border-radius:6px;background:#ffffff14;overflow:hidden;margin:10px 0}#hrtOv .hBar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ffd9a8,#ff8a5a)}
#hrtOv .hBig{display:block;margin:16px auto;width:150px;height:150px;border-radius:50%;border:2px solid #ffd9a888;background:radial-gradient(circle,#3a2a18,#120c06);color:#ffd9a8;font:inherit;font-size:18px;font-weight:800;touch-action:manipulation}
#hrtOv .hi{font-size:46px;text-align:center;margin:6px 0}body:has(#hrtOv) :is(#isl,#islDots,#islCards,#mFloat,#mvBar,#mvRz,#tipCard){display:none!important}`;document.head.appendChild(css);
const ov=h=>{let o=document.getElementById('hrtOv');if(!o){o=document.createElement('div');o.id='hrtOv';document.body.appendChild(o)}o.innerHTML=`<div class="hB">${h}</div>`;o.scrollTop=0;return o};
const ovX=()=>{const o=document.getElementById('hrtOv');if(o)o.remove();try{render()}catch(e){}};
const done=(ok,t,after)=>{ov(`<div class="hRes ${ok?'ok':'bad'}">${t}</div><button class="hO" id="hrtOk">${ok?'✨':'…'} ไปต่อ</button>`);document.getElementById('hrtOk').onclick=()=>{ovX();if(after)setTimeout(after,200)}};

// ============================================================
// 1) 🧿 ของสืบทอดข้ามชาติ
// ============================================================
const HK='murim_heir';
const KIND=[{k:'jade',ic:'🟢',n:'จี้หยกร้าว'},{k:'blade',ic:'🗡️',n:'มีดสั้นด้ามไม้'},{k:'book',ic:'📔',n:'สมุดบันทึกปกหนัง'},{k:'watch',ic:'⏱️',n:'นาฬิกาพกที่เดินถอยหลัง'},{k:'bell',ic:'🔔',n:'กระดิ่งทองเหลืองไร้ลูกตุ้ม'},{k:'doll',ic:'🧸',n:'ตุ๊กตาผ้าเย็บมือ'}];
const FIND={murim:['ขุดเจอใต้รากต้นไม้ที่ล้มหลังพายุ','พ่อค้าเร่ขายให้ราคาถูกจนน่าสงสัย','ศิษย์ใหม่ของสำนักยื่นให้ บอกว่ามีคนฝากมา'],xian:['ลอยออกมาจากแหวนเก็บของของศพผู้ฝึกที่ไม่รู้จัก','เจอในถ้ำบ่มเพาะร้าง วางอยู่บนเบาะเหมือนรอเจ้าของ'],beast:['พัดมากับน้ำป่า ติดอยู่ที่ปากโพรงของคุณ','นายพรานทำตกไว้ คุณคาบกลับมาโดยไม่รู้ตัว'],mw:['เจอในร้านของมือสองตรงจตุจักร คนขายไม่ยอมรับเงิน','พัสดุไม่ระบุผู้ส่งมาถึงหน้าห้อง จ่าหน้าชื่อคุณถูกต้อง','ยายข้างบ้านยื่นให้ก่อนย้ายออก "มันอยากมาอยู่กับหนู"'],sky:['หลุดออกมาจากซากยานเก่านอกกำแพง','ทหารผ่านศึกแก่ๆ ยัดใส่มือคุณแล้วเดินจากไป'],fog:['ถูกเก็บไว้ในกล่องหลักฐานคดีเก่าที่ไม่มีหมายเลข','คนแปลกหน้าในหมอกยื่นให้ "ของเจ้า เจ้าลืมไว้"'],soul:['ดวงจิตของคุณคาบมาวางไว้ข้างเตียง','เจอในห้องเก็บของสถาบัน มีชื่อคุณสลักไว้ทั้งที่ไม่เคยมา']};
function heirGet(){return L(HK,null)}
function heirMood(h){const o=h.own||[];const ev=o.filter(x=>x.k<0).length,gd=o.filter(x=>x.k>=0).length,vi=o.filter(x=>x.vi).length,yo=o.filter(x=>x.a<30).length;const la=o[o.length-1]||{};return ev>gd?'hate':vi>=1&&la.vi?'blood':yo>=1&&la.a<30?'grief':(gd>=1&&la.a>=55)?'kind':'quiet'}
const MOOD={hate:['🩸 เย็นเยียบ','มันกระซิบให้คุณทำสิ่งที่เจ้าของคนก่อนเคยทำ'],blood:['⚔️ กระหายศึก','มันอุ่นขึ้นทุกครั้งที่คุณโกรธ'],grief:['🕯️ โศก','มันเหมือนพยายามดึงคุณไว้ไม่ให้ไปไหน'],kind:['🌿 อบอุ่น','มันอุ่นอยู่ในมือเหมือนมีคนจับไว้'],quiet:['🌫️ เงียบ','มันยังไม่รู้จักคุณ']};
// บันทึกเจ้าของ (ตอนตาย)
function heirRecord(){try{const h0=heirGet(),me=H();const keys=(S.key||[]).filter(x=>/^\d+ ปี — /.test(x));const pickK=keys.length>4?shuf(keys).slice(0,4).sort((a,b)=>parseInt(a)-parseInt(b)):keys.slice(0,4);
 const rec={n:String(S.name||'ไร้นาม'),w:wk(),a:S.age|0,k:+S.karma||0,c:String(S.cause||S.deathCause||'').slice(0,80),vi:/ฆ่า|สังหาร|ลอบ|แทง|ศึก|ดวล|ยิง/.test(String(S.cause||'')),mem:pickK.map(x=>x.slice(0,90)),t:Date.now()};
 if(h0&&me.hl&&me.hl.own){h0.own=(h0.own||[]).concat([rec]).slice(-8);h0.gift=me.hl.gift||0;LSet(HK,h0);return}
 if(h0&&me.hl&&me.hl.gone)return; // ทำลายไปแล้ว → ชาติหน้าเริ่มชิ้นใหม่ตอนตาย
 if(h0&&!me.hl&&h0.own&&h0.own.length)return; // ชาตินี้ยังไม่เจอ → ของรอต่อ
 const kd=rp(KIND);LSet(HK,{id:Date.now(),k:kd.k,ic:kd.ic,n:kd.n,own:[rec]})}catch(e){console.error('heirRec',e)}}
// เจอของในชาติใหม่
function heirFind(){const h=heirGet(),me=H();if(!h||!h.own||!h.own.length)return false;const last=h.own[h.own.length-1];if(last.t&&me.born&&last.t>me.born+5e3)return false;
 const m=MOOD[heirMood(h)],fd=rp(FIND[wk()]||FIND.murim);me.hl={st:1};
 choice(`${h.ic} ${h.n}`,`คุณ${fd}<br><br>${E(h.n)}ชิ้นนี้ดูคุ้นตาแปลกๆ ทั้งที่ไม่เคยเห็นมาก่อน ตอนจับครั้งแรก ${m[0]} — ${m[1]}<br><span class="tag2">มีรอยสลักชื่อเจ้าของเก่า ${h.own.length} ชื่อ ชื่อล่าสุดคือ "${E(last.n)}"</span>`,[
  {t:'👁️ จ้องมองมันนานๆ',s:'ปลุกความทรงจำของเจ้าของเก่า',noFate:true,f(){setTimeout(()=>heirMem(h),250)}},
  {t:'🎒 เก็บไว้เฉยๆ',s:'ยังไม่อยากรู้',f(){me.hl.own=1;say(`${h.ic} คุณเก็บ${h.n}ไว้ในกระเป๋า บางคืนมันอุ่นขึ้นเองโดยไม่มีเหตุผล`,'myth')}},
  {t:'🔥 ทำลายทิ้ง',s:'ตัดสายใยกับชาติก่อน',f(){me.hl={gone:1};LSet(HK,null);say(`🔥 ${h.n}ไม่ยอมแตกง่ายๆ คุณต้องทุบอยู่นานจนมือเลือดซิบ เสียงสุดท้ายที่มันส่งออกมาเหมือนเสียงถอนหายใจ`,'bad');fx({joy:-5,karma:-3})}},
  {t:'💰 ขายให้คนอื่น',s:'ได้เงินก้อน',f(){me.hl={sold:1};fx({mon:Math.round(500+Math.random()*4000)});say(`💰 คุณขาย${h.n}ไป สามวันต่อมาคนซื้อเอามันมาคืนหน้าบ้านพร้อมจดหมายสั้นๆ "มันไม่ยอมอยู่กับผม"`,'');me.hl={own:1,ret:1}}}])
 return true}
// มินิเกม: เรียงความทรงจำของเจ้าของเก่า (จาก S.key จริงของชาติก่อน)
function heirMem(h){const me=H(),last=h.own[h.own.length-1];let M=(last.mem||[]).filter(Boolean);if(M.length<3){me.hl.own=1;return done(true,`${h.ic} ภาพของ "${E(last.n)}" แวบเข้ามาแค่ภาพเดียว — ${E(last.c||'คนที่จากไปเงียบๆ')} คุณยังเรียงอะไรไม่ได้มาก`)}
 const right=M.slice();let got=[];const draw=()=>{ov(`<h2>${h.ic} ความทรงจำของ ${E(last.n)}</h2><div class="hx">ภาพชีวิตของเจ้าของเก่าแตกเป็นเสี่ยง (ชาติก่อนของคุณ · ${WN[last.w]||''} · จากไปตอนอายุ ${last.a} ปี)<br><b>แตะเรียงจากเรื่องที่เกิดก่อน → หลัง</b></div>
  ${shuf(M).map(x=>`<button class="hMem${got.includes(x)?' on':''}" data-m="${E(x)}" ${got.includes(x)?'disabled':''}>${E(x.replace(/^\d+ ปี — /,''))}${got.includes(x)?` <b>#${got.indexOf(x)+1}</b>`:''}</button>`).join('')}<p class="hs">เกิดก่อนอยู่บน · ไม่มีตัวเลขอายุให้ดู ต้องนึกเอาจากเรื่อง</p>`);
  document.querySelectorAll('#hrtOv [data-m]').forEach(b=>b.onclick=()=>{const x=M.find(y=>E(y)===b.dataset.m);got.push(x);if(got.length===M.length){const ok=got.every((y,i)=>y===right[i]);me.hl.own=1;
   if(ok){const mood=heirMood(h);const gift={hate:{pow:Math.round((+S.power||10)*.15),karma:-10},blood:{pow:Math.round((+S.power||10)*.12)},grief:{life:6,joy:6},kind:{joy:10,karma:8,life:3},quiet:{int:8,joy:4}}[mood];fx(gift);me.hl.gift=1;
    key(`จำชีวิตของ ${last.n} ได้ทั้งชีวิตผ่าน${h.n}`);return done(true,`✨ ภาพทั้งหมดเรียงต่อกันเป็นชีวิตเดียว — <b>${E(last.n)}</b>${last.c?`<br><span class="hs">${E(last.c)}</span>`:''}<br><br>คุณรู้สึกเหมือนเคยร้องไห้ตอนอ่านจดหมายฉบับนั้น เคยโกรธคนคนนั้น เคยรักคนคนนั้น ${h.n}อุ่นขึ้นในมือ<br><span class="hs">${MOOD[mood][0]} · ${mood==='hate'?'พลัง +15% แต่กรรม −10 · บางคืนจะมีเสียงกระซิบ':mood==='blood'?'พลัง +12%':mood==='grief'?'อายุขัย +6 · ความสุข +6':mood==='kind'?'ความสุข +10 · กรรมดี +8 · อายุขัย +3':'ปัญญา +8'}</span>`,()=>heirAfter(h))}
   return done(false,`ภาพสลับกันไปมา… คุณเห็นแค่ใบหน้าเลือนๆ ของ ${E(last.n)} แล้วทุกอย่างก็หายไป<br><span class="hs">ลำดับจริง: ${right.map(x=>E(x.replace(/^\d+ ปี — /,''))).join(' → ')}</span>`)}draw()})};draw()}
// หลังรู้ความจริง: ผลต่อชีวิตนี้ (เสียงกระซิบ / ศัตรูเก่า)
function heirAfter(h){const me=H(),m=heirMood(h);if(m==='hate')me.hl.wh=1;const last=h.own[h.own.length-1];if(last.vi)me.hl.foe=1}
function heirTick(){const me=H(),h=heirGet();if(!me.hl&&h&&S.age>=rnd(10,40)&&P(.18))return heirFind();
 if(me.hl&&me.hl.wh&&!me.hl.whd&&S.age>=25&&P(.12)){me.hl.whd=1;const h2=heirGet();if(!h2)return false;choice(`${h2.ic} เสียงกระซิบตอนตีสาม`,`${E(h2.n)}กระซิบชื่อคนที่เคยทำร้ายเจ้าของคนก่อน "เขาเกิดใหม่แล้ว อยู่ใกล้ๆ นี่เอง เอาคืนแทนข้าสิ"`,[
  {t:'🗡️ ตามหาคนคนนั้น',s:'แค้นของชาติก่อน',f(){if(P(.5)){fx({pow:Math.round((+S.power||10)*.1),karma:-25});say('🩸 คุณตามเจอ… เขาจำคุณไม่ได้ด้วยซ้ำ เรื่องจบในคืนเดียว และ'+h2.n+'ก็เงียบไปตลอดกาล','bad')}else{fx({hp:-15,joy:-8});say('🩸 คนที่มันชี้คือคนแปลกหน้าที่ไม่รู้เรื่องอะไรเลย คุณหยุดมือทัน แต่บาดแผลในใจไม่หาย','bad')}}},
  {t:'🙉 เอาผ้าห่อมันไว้ แล้วไม่ฟัง',s:'ชาตินี้เป็นของเรา',f(){fx({karma:10,joy:4});me.hl.wh=0;say('🌿 คุณห่อมันด้วยผ้าเก่าของแม่ เสียงกระซิบเงียบลงทีละคืน','good')}}]);return true}
 if(me.hl&&me.hl.own&&!me.hl.kid&&((S.kids|0)>0||(S.children||[]).length)&&S.age>=50&&P(.1)){me.hl.kid=1;const h2=heirGet();if(!h2)return false;choice(`${h2.ic} ส่งต่อ`,`ลูกของคุณหยิบ${E(h2.n)}ขึ้นมาดู "อันนี้ของใครเหรอ" มันเงียบผิดปกติในมือเขา`,[
  {t:'🎁 ยกให้ลูก',s:'ชาติหน้าจะเริ่มจากเรื่องของลูก',f(){me.hl.gift=2;fx({joy:8});say(`🎁 คุณผูก${h2.n}ไว้ที่คอลูก "ถ้ามันอุ่นขึ้นมา แปลว่ามีคนคิดถึง"`,'good')}},
  {t:'🤐 เก็บไว้กับตัวจนวันสุดท้าย',s:'มันจะตามคุณไปชาติหน้า',f(){say(`${h2.ic} คุณเก็บมันไว้ใต้หมอน เรื่องบางเรื่องควรจบที่เรา`,'')}}]);return true}
 return false}

// ============================================================
// 2) 🕸️ ด้ายแดงข้ามชาติ
// ============================================================
const TK='murim_thread';
const SIG=['มีไฝเม็ดเล็กใต้ตาซ้าย','ฮัมเพลงเดิมทุกครั้งที่กังวล','ชอบนับนิ้วเวลาคิดอะไรไม่ออก','ไม่กินผักชีแม้แต่ใบเดียว','เรียกคุณว่า "เจ้าโง่" ตอนโกรธ แต่ไม่เคยโกรธจริง','มีรอยแผลเป็นรูปจันทร์เสี้ยวที่ข้อมือ','หัวเราะแบบเอามือปิดปาก','ชอบยืนมองฝนนานๆ โดยไม่พูดอะไร','ผูกเชือกรองเท้าสองชั้นเสมอ','จำวันเกิดคนอื่นได้หมดแต่ลืมของตัวเอง'];
const NM={murim:['หลิวเยี่ยน','ซูหมิง','ฉินเฟิง','ไป๋หลิง','เหยียนจื่อ'],xian:['เยว่หลิง','หานเซียว','มู่ชิง','ฟางหยุน'],beast:['หมาป่าขาว','จิ้งจอกตาเดียว','นกยูงไฟ','เสือดาวหิมะ'],mw:['ปลายฟ้า','ภูมิ','แพรวา','ธาม','มายด์','ต้นกล้า'],sky:['กัปตันอาร์ม','หมอริน','เวย์','นาวา'],fog:['เอเลน่า','รอว์น','มาร์ลิน','ไอรีน'],soul:['เยว่ชิง','ถังซาน','หลิวเอ๋อ','เสี่ยวอู่']};
function thRecord(){try{const th=L(TK,[])||[];const b=[];const sp=typeof S.spouse==='string'?S.spouse:(S.spouse&&S.spouse.n);if(sp)b.push({r:'love',n:sp});const nem=(S.nem&&S.nem.n)||(S._dr&&S._dr.nem&&S._dr.nem.n);if(nem)b.push({r:'foe',n:nem});if(S.disc&&S.disc.n)b.push({r:'disc',n:S.disc.n});
 if(!b.length)return;const x=rp(b);th.unshift({r:x.r,n:String(x.n).slice(0,30),sig:rp(SIG),me:String(S.name||''),w:wk(),t:Date.now(),end:x.r==='foe'&&S.nem&&!S.nem.alive?'won':''});LSet(TK,th.slice(0,3))}catch(e){console.error('thRec',e)}}
const thPick=()=>{const me=H();if(me.th)return me.th;const th=(L(TK,[])||[]).filter(x=>x.t&&(!me.born||x.t<me.born));if(!th.length)return null;me.th={i:0,...th[0],st:0};return me.th};
const RN={love:'คนที่คุณรักในชาติก่อน',foe:'ศัตรูชั่วชีวิตในชาติก่อน',disc:'ศิษย์ในชาติก่อน'};
function thTick(){const me=H(),T=thPick();if(!T)return false;
 // ตอน 0: ฝัน (เห็นตำหนิ) อายุ 8–20
 if(T.st===0&&S.age>=8&&P(.2)){T.st=1;T.ny=S.age+rnd(4,12);say(`🌙 คืนนั้นคุณฝันถึงใครบางคนที่ไม่เคยเห็นหน้า จำได้แค่ว่าคนคนนั้น<b>${E(T.sig)}</b> ตื่นมาน้ำตาไหลโดยไม่รู้ว่าทำไม`,'myth');key('ฝันถึงคนที่'+T.sig);return true}
 // ตอน 1: จำให้ได้ (มินิเกม)
 if(T.st===1&&S.age>=T.ny&&S.age>=16){T.st=2;const nms=shuf(NM[wk()]||NM.murim).slice(0,3),ds=shuf(SIG.filter(x=>x!==T.sig)).slice(0,2),i=rnd(0,2),C=nms.map((n,j)=>({n,s:j===i?T.sig:ds[j>i?j-1:j]}));
  choice('🕸️ คนแปลกหน้าสามคน',`วันนี้คุณเจอคนแปลกหน้าสามคนในเวลาไล่เลี่ยกัน แต่ละคนทำให้หัวใจคุณเต้นผิดจังหวะแบบที่อธิบายไม่ได้ และคุณมีเวลาคุยได้แค่คนเดียว<br><span class="tag2">ลองนึกถึงความฝันในวัยเด็ก…</span>`,C.map(c=>({t:`${E(c.n)}`,s:c.s,noFate:true,f(){if(c.s===T.sig){T.st=3;T.nn=c.n;T.ny=S.age+rnd(2,6);key(`จำ ${c.n} ได้ — ${RN[T.r]}`);
    say(T.r==='love'?`🕸️ ${E(c.n)}มองคุณนานเกินไปหนึ่งวินาที "เราเคยเจอกันที่ไหนหรือเปล่า" — <b>${RN.love}</b>`:T.r==='foe'?`🕸️ ${E(c.n)}ยิ้มให้คุณ แต่ตาไม่ยิ้ม คุณรู้ทันทีว่าเขาก็จำได้ — <b>${RN.foe}</b>`:`🕸️ ${E(c.n)}เรียกคุณผิดชื่อ… เป็นชื่อของคุณในชาติก่อน — <b>${RN.disc}</b>`,'myth');fx({joy:6})}
   else{T.st=9;fx({joy:-4});say(`🕸️ คุณคุยกับ${E(c.n)}ทั้งบ่าย สนุกดี… ตอนเดินกลับบ้าน คุณเห็นใครบางคนที่<b>${E(T.sig)}</b>เดินสวนไปในฝูงชน แล้วหายไป คุณยืนนิ่งอยู่ตรงนั้นนานมาก`,'bad')}}})));return true}
 // ตอน 2–3: เส้นเรื่องตามบทบาท
 if(T.st===3&&S.age>=T.ny){T.st=4;T.ny=S.age+rnd(4,9);const n=E(T.nn);
  if(T.r==='love')choice(`🕸️ ${n}`,`คุณกับ${n}สนิทกันเร็วเหมือนคนรู้จักกันมานาน วันหนึ่ง${n}เล่าความฝันซ้ำๆ — ฝันเห็นตัวเองยืนรอใครบางคนที่ไม่มาตามนัด<br><span class="tag2">ในชาติก่อน คุณชื่อ ${E(T.me)}</span>`,[
   {t:'💬 เล่าความฝันของคุณให้ฟังบ้าง',s:'เปิดเผยว่าจำได้',f(){T.op=1;fx({joy:10});say(`💞 ${n}ร้องไห้ทั้งที่ยิ้ม "งั้นชาตินี้อย่าให้เรารออีกนะ"`,'good')}},
   {t:'🤐 เก็บไว้ ใช้ชีวิตชาตินี้ให้ดี',s:'ไม่ผูกกับอดีต',f(){T.op=0;fx({joy:4,int:3});say(`🌿 คุณไม่พูดเรื่องชาติก่อน ปล่อยให้ความสัมพันธ์โตไปตามจังหวะของมันเอง`,'')}},
   {t:'🚪 ถอยห่าง กลัวว่าจะซ้ำรอยเดิม',s:'ชาติก่อนจบไม่ดี',f(){T.op=-1;fx({joy:-6});say(`🍂 คุณเริ่มตอบข้อความช้าลง ${n}ไม่ถามอะไร แต่คุณรู้ว่าเขาเข้าใจ`,'bad')}}]);
  else if(T.r==='foe')choice(`🕸️ ${n}`,`${n}ไต่เต้าขึ้นมาในที่เดียวกับคุณ ทุกครั้งที่คุณได้อะไร เขาจะได้มากกว่าหนึ่งขั้น วันนี้${n}มายืนหน้าคุณ "ชาติก่อนเจ้าชนะ ชาตินี้ข้าจะไม่ยอม"`,[
   {t:'⚔️ รับคำท้า',s:'สู้ให้จบในชาตินี้',f(){T.op=2;fx({fame:20});say(`⚔️ ข่าวการท้าดวลระหว่างคุณกับ${n}ลือไปทั่ว${WN[wk()]}`,'epic')}},
   {t:'🍵 ชวนนั่งคุย ถามว่าชาติก่อนเกิดอะไรขึ้น',s:'อาจไม่ใช่อย่างที่คิด',f(){T.op=3;fx({int:4});say(`🍵 ${n}เล่าเรื่องชาติก่อนในมุมของเขา… ในเรื่องเล่าของเขา คุณคือคนร้าย`,'myth')}},
   {t:'🙇 ขอโทษ ทั้งที่จำไม่ได้ว่าทำอะไรผิด',s:'กรรมเก่า',f(){T.op=4;fx({karma:12});say(`🙇 ${n}นิ่งไปนาน "คนอย่างเจ้า… ขอโทษเป็นด้วยหรือ"`,'good')}}]);
  else choice(`🕸️ ${n}`,`${n}เก่งขึ้นเร็วมาก และวันนี้เป็นฝ่ายสอนคุณ — ท่าที่เขาสอน คือท่าที่คุณคิดขึ้นเองในชาติก่อน ทุกจังหวะ`,[
   {t:'🙏 เรียนจากเขาอย่างนอบน้อม',s:'สลับบทครูกับศิษย์',f(){T.op=5;fx({pow:Math.round((+S.power||10)*.08),int:4});say(`🙏 ${n}หัวเราะ "แปลกจัง สอนท่านี้ให้ใครก็ไม่เคยเข้าใจเร็วเท่าคุณ"`,'good')}},
   {t:'😤 บอกว่าท่านี้มีจุดอ่อนตรงไหน',s:'คุณรู้ เพราะคุณคิดมันขึ้นมา',f(){T.op=6;fx({int:6});say(`😤 ${n}หน้าซีด "คุณรู้ได้ยังไง… อาจารย์ของผมในฝันพูดประโยคนี้เป๊ะ"`,'myth')}}]);
  return true}
 if(T.st===4&&S.age>=T.ny){T.st=5;const n=E(T.nn);
  if(T.r==='love'){const ok=T.op>=0;choice(`🕸️ ${n} · ตอนจบ`,ok?`หลายปีผ่านไป ${n}ยังอยู่ข้างคุณ วันนี้เขาถือของเล็กๆ มาให้ เป็นสิ่งที่คุณเคยให้เขาในชาติก่อน ทั้งที่ไม่มีใครบอก`:`คุณได้ข่าวว่า${n}กำลังจะย้ายไปไกลมาก บอกว่าจะไม่กลับมาอีก`,ok?[
    {t:'💍 ขอเขาอยู่ด้วยกันตลอดไป',s:'ชาตินี้ไม่ให้รอแล้ว',f(){try{if(!S.spouse)S.spouse=T.nn}catch(e){}fx({joy:20,life:4});key(`อยู่กับ ${T.nn} คนเดิมจากชาติก่อน`);say(`💞 คุณกับ${n}อยู่ด้วยกันจนแก่ — คราวนี้ไม่มีใครต้องรอ`,'myth')}},
    {t:'🌅 ปล่อยให้เป็นเพื่อนที่ดีที่สุด',s:'รักไม่ต้องเหมือนเดิม',f(){fx({joy:10,karma:6});say(`🌅 บางความสัมพันธ์ไม่ต้องจบแบบเดิมถึงจะสวย`,'good')}}]:[
    {t:'🏃 วิ่งไปส่งที่สถานี',s:'ครั้งนี้ไปให้ทัน',f(){if(P(.6)){fx({joy:16});say(`🏃 คุณไปทันพอดี ${n}ยืนรออยู่ทั้งที่รถออกไปแล้ว "รู้ว่าจะมา"`,'myth')}else{fx({joy:-12});say(`🏃 คุณไปไม่ทัน… อีกครั้ง`,'bad')}}},
    {t:'🕊️ ปล่อยไป',s:'บางทีชาติหน้า',f(){fx({joy:-6,int:3});say(`🕊️ คุณไม่ได้ไปส่ง แต่คืนนั้นฝันเห็น${n}โบกมือลาแบบยิ้มๆ`,'')}}]);}
  else if(T.r==='foe'){choice(`🕸️ ${n} · ตอนจบ`,T.op===2?`วันดวลมาถึง ${n}แข็งแกร่งกว่าที่คุณคิด ทั้ง${WN[wk()]}รอดู`:T.op===3?`${n}มาหาคุณอีกครั้ง ถือหลักฐานว่าชาติก่อนมีคนที่สามจัดฉากให้ทั้งคู่เกลียดกัน`:`${n}ป่วยหนัก ส่งคนมาตามคุณไปพบเป็นครั้งสุดท้าย`,T.op===2?[
    {t:'⚔️ สู้สุดกำลัง',s:'ชนะหรือแพ้ก็จบ',f(){const w=P(.55);if(w){fx({fame:60,pow:Math.round((+S.power||10)*.1)});say(`🏆 คุณชนะ${n} — เขายื่นมือมาให้จับ "ชาติหน้าเจอกันใหม่นะ"`,'epic')}else{fx({hp:-30,joy:-10});say(`🩸 ${n}ชนะ เขาไม่ฆ่าคุณ "ตอนนี้เราเสมอกันแล้ว" แล้วเดินจากไป`,'bad')}key(`ดวลชำระแค้นข้ามชาติกับ ${T.nn}`)}},
    {t:'🏳️ ยอมแพ้ก่อนดาบออกจากฝัก',s:'ตัดวงแค้น',f(){fx({karma:20,fame:-10});say(`🏳️ ทุกคนหัวเราะเยาะคุณ… มีแค่${n}ที่ไม่หัวเราะ เขาคุกเข่าลงตรงหน้าคุณ ร้องไห้เหมือนเด็ก`,'myth')}}]:[
    ...(T.op===3?[{t:'🤝 ร่วมมือกันตามหาคนที่สาม',s:'ศัตรูกลายเป็นพวก',f(){fx({fame:30,int:5,karma:8});say(`🤝 คุณกับ${n}ตามรอยคนที่สามจนเจอ… เขาตายไปนานแล้ว เหลือแค่คำขอโทษที่สลักไว้บนป้ายหลุม`,'myth');key(`คืนดีกับศัตรูข้ามชาติ ${T.nn}`)}}]:[{t:'🛏️ ไปนั่งข้างเตียง',s:'ครั้งสุดท้าย',f(){fx({karma:14,joy:6});say(`🛏️ ${n}จับมือคุณ "ชาติหน้า… เกิดเป็นพี่น้องกันเถอะ จะได้ไม่ต้องแย่งอะไรกันอีก" แล้วหลับไป`,'myth');key(`อยู่ข้าง ${T.nn} ศัตรูข้ามชาติในวาระสุดท้าย`)}}]),
    {t:'🚶 ไม่ไป',s:'ปล่อยวาง',f(){fx({joy:-4});say(`🚶 คุณไม่ไป… คืนนั้นฝันเห็น${n}ยืนรออยู่ริมน้ำ`,'')}}]);}
  else{choice(`🕸️ ${n} · ตอนจบ`,`${n}ประกาศว่าจะตั้ง${v('job')}ของตัวเอง และอยากให้ชื่อท่าไม้ตายเป็นชื่อของ "อาจารย์ในฝัน"`,[
    {t:`✍️ บอกชื่อของคุณในชาติก่อน "${E(T.me)}"`,s:'ให้ชื่อเก่าได้อยู่ต่อ',f(){fx({fame:40,joy:12});key(`ศิษย์ข้ามชาติ ${T.nn} ตั้งท่าไม้ตายชื่อ ${T.me}`);say(`✍️ ท่าไม้ตาย "${E(T.me)}" ถูกสอนต่อไปอีกหลายรุ่น ไม่มีใครรู้ว่าชื่อนี้มาจากไหน ยกเว้นคุณสองคน`,'myth')}},
    {t:'🙂 "ตั้งชื่อตามใจเจ้าเถอะ"',s:'ศิษย์ต้องเดินทางของตัวเอง',f(){fx({karma:8,int:4});say(`🙂 ${n}ตั้งชื่อท่าว่า "ผู้ปล่อยมือ" แล้วยิ้มให้คุณแบบรู้ทัน`,'good')}}]);}
  return true}
 return false}

// ============================================================
// 3) 📅 บทวัยกลางคน
// ============================================================
// แต่ละบท: ok(), ตอน st[0..] (อายุถัดไป +gap) · ตอนต่อไปเลือกจาก m.ch
const MID={
 crisis:{a:[38,46],ok:()=>wk()!=='beast',st:[
  m=>choice('🌫️ วัยสี่สิบ',`เช้าวันหนึ่งคุณตื่นมาแล้วรู้สึกว่าทุกอย่างที่ทำมายี่สิบปีเหมือนไม่ใช่ของตัวเอง ${v('job')}ยังเหมือนเดิม คนรอบตัวยังเหมือนเดิม มีแต่คุณที่ไม่เหมือนเดิม`,[
   {t:'🎨 เริ่มสิ่งที่เคยอยากทำตอนเด็ก',s:'เสี่ยง แต่มีชีวิตชีวา',f(){m.ch='new';fx({joy:8,mon:-Math.round((+S.money||0)*.1)})}},
   {t:`📈 ทุ่มให้${v('job')}หนักกว่าเดิม`,s:'ลืมความรู้สึกนี้ด้วยงาน',f(){m.ch='work';fx({fame:15,joy:-6})}},
   {t:'🎒 ทิ้งทุกอย่าง ออกเดินทางคนเดียว',s:'ไม่มีใครเข้าใจ',f(){m.ch='go';fx({joy:4,fame:-8})}}]),
  m=>m.ch==='new'?choice('🎨 สิ่งที่เคยอยากทำ',`ห้าปีผ่านไป สิ่งที่คุณเริ่มทำเริ่มมีคนเห็น แต่${v('boss')}เรียกไปคุย "เลือกเอาว่าจะเอาอะไร"`,[
    {t:'🎨 เลือกทางใหม่เต็มตัว',s:'ไม่หันกลับ',f(){if(P(.55)){fx({joy:16,fame:30});say('🎨 มันไปได้สวยกว่าที่ใครคิด รวมถึงตัวคุณเอง','epic')}else{fx({joy:-8,mon:-Math.round((+S.money||0)*.3)});say('🎨 มันล้ม… แต่คุณไม่เสียใจที่ได้ลอง ตอนแก่คุณจะเล่าเรื่องนี้ด้วยรอยยิ้ม','')}}},
    {t:'⚖️ ทำทั้งสองอย่าง',s:'เหนื่อยสองเท่า',f(){fx({hp:-10,joy:6,mon:Math.round(500+(+S.money||0)*.05)});say('⚖️ คุณนอนวันละสี่ชั่วโมงอยู่สามปี แล้วร่างกายก็เป็นคนตัดสินใจแทน','')}}]):
   m.ch==='work'?choice(`📈 ${v('boss')}คนใหม่`,`${v('boss')}คนใหม่อายุน้อยกว่าคุณสิบปี เขาเรียกคุณว่า "พี่" ทุกคำ แล้วเอางานของคุณไปนำเสนอในชื่อตัวเอง`,[
    {t:'😤 เปิดโปงต่อหน้าทุกคน',s:'เอาคืน',f(){if(P(.5)){fx({fame:25});say('😤 ทุกคนเงียบ หลักฐานชัดเจน เขาลาออกในเดือนเดียว','epic')}else{fx({fame:-20,joy:-10});say('😤 คุณดูเป็นคนแก่ขี้อิจฉาในสายตาทุกคน','bad')}}},
    {t:'🎓 สอนเขาให้เก่งจริง',s:'ยาวไกลกว่า',f(){fx({karma:10,int:5});say('🎓 สิบปีต่อมา เขาพูดในงานใหญ่ว่า "ทุกอย่างที่ผมเป็นวันนี้ มาจากพี่คนหนึ่ง" แล้วชี้มาที่คุณ','myth')}},
    {t:'🚪 ลาออก',s:'พอแล้ว',f(){m.ch2='quit';fx({joy:10,mon:-Math.round((+S.money||0)*.15)})}}]):
   choice('🎒 การเดินทาง',`ห้าปีบนถนน คุณไปถึงที่ที่ไม่มีใครรู้จักชื่อคุณ ที่นั่นมีคนกำลังเดือดร้อน และไม่มีใครอื่นช่วยได้`,[
    {t:'🛠️ อยู่ช่วยจนเรื่องจบ',s:'ชีวิตใหม่',f(){fx({karma:18,joy:10,fame:10});say('🛠️ เรื่องเล็กกลายเป็นเรื่องใหญ่ คุณอยู่ที่นั่นอีกสามปี คนแถวนั้นยังเล่าถึง "คนแปลกหน้าที่มาช่วย"','myth')}},
    {t:'🏠 กลับบ้าน',s:`คิดถึง${v('home')}`,f(){fx({joy:12});say(`🏠 ทุกคนที่บ้านแก่ลงหมด แต่ไม่มีใครถามว่าทำไมไปนาน — แค่ตั้งสำรับเพิ่มหนึ่งที่`,'good')}}])]},
 parent:{a:[42,55],ok:()=>wk()!=='beast'&&(S.parents||[]).some(p=>p&&p.alive),st:[
  m=>{const p=(S.parents||[]).find(x=>x&&x.alive);m.pn=p?p.n:'แม่';m.pr=p?p.role:'แม่';choice(`👴 ${m.pr}แก่ลง`,`${E(m.pr)} ${E(m.pn)}เริ่มจำชื่อคนในบ้านสลับกัน วันนี้เรียกคุณด้วยชื่อของคนที่ไม่มีใครในบ้านรู้จัก`,[
   {t:'🏠 ย้ายกลับไปดูแลเอง',s:`ห่าง${v('job')}`,f(){m.ch='care';fx({fame:-10,joy:-2})}},
   {t:`💰 จ้างคนดูแล ส่ง${v('money')}ทุกเดือน`,s:'ทำงานต่อได้',f(){m.ch='pay';fx({mon:-Math.round((+S.money||0)*.2)})}},
   {t:'❓ ถามว่าชื่อนั้นคือใคร',s:'มีอะไรที่ไม่เคยรู้',f(){m.ch='ask'}}])},
  m=>m.ch==='care'?game('pill',`💊 ป้อนยา${E(m.pr)}`,`ยาสามตัว ต้องให้ตามเวลา ${E(m.pr)}ไม่ยอมกินถ้าให้ผิดลำดับ`,ok=>{if(ok){fx({joy:12,karma:10});say(`💊 ${E(m.pr)}จับมือคุณแน่น วันนี้เรียกชื่อคุณถูก`,'good')}else{fx({joy:-8});say(`💊 ${E(m.pr)}ปัดถ้วยยาตกพื้น แล้วร้องไห้ว่าคุณเป็นใคร`,'bad')}}):
   m.ch==='pay'?choice(`📞 โทรศัพท์จากคนดูแล`,`คนดูแลโทรมาตอนตีสอง "${E(m.pr)}ถามหาคุณทั้งคืนค่ะ… ตอนนี้หลับแล้ว"`,[
    {t:'🚗 ขับรถกลับคืนนั้นเลย',s:'',f(){fx({joy:6,hp:-4});say(`🚗 คุณไปถึงตอนเช้า ${E(m.pr)}ตื่นมาเห็นคุณแล้วยิ้ม "นึกว่าฝัน"`,'good')}},
    {t:'🛌 ค่อยไปสุดสัปดาห์',s:'',f(){fx({joy:-6});say('🛌 สุดสัปดาห์นั้นคุณไปถึง… แต่ไม่มีใครถามหาคุณตอนตีสองอีกแล้ว','bad');try{const p=(S.parents||[]).find(x=>x&&x.n===m.pn);if(p)p.alive=false}catch(e){}}}]):
   choice(`📜 ชื่อที่ไม่มีใครรู้จัก`,`${E(m.pr)}ยื่นกล่องเก่าให้ ข้างในมีรูปเด็กที่หน้าเหมือนคุณ แต่ไม่ใช่คุณ "พี่ของลูก… ตายตั้งแต่ก่อนลูกเกิด แม่ตั้งชื่อลูกให้เหมือนเขา เพราะทำใจไม่ได้"`,[
    {t:'🤍 กอด ไม่พูดอะไร',s:'',f(){fx({joy:4,karma:8});key('รู้ว่ามีพี่ที่ตายไปก่อนตัวเองเกิด');say('🤍 คืนนั้นคุณฝันเห็นเด็กคนในรูปโบกมือให้ คุณรู้สึกเหมือนเพิ่งมีพี่','myth')}},
    {t:'😶 รู้สึกเหมือนเป็นตัวแทนมาทั้งชีวิต',s:'',f(){fx({joy:-10,int:4});say('😶 คุณนั่งอยู่หน้ารูปนั้นทั้งคืน ทุกอย่างที่เคยสงสัยในวัยเด็กมีคำตอบแล้ว แต่มันไม่ได้ทำให้ดีขึ้นเลย','bad')}}])]},
 friend:{a:[34,52],ok:()=>true,st:[
  m=>{m.fn=rp(NM[wk()]||NM.murim);choice(`👋 ${E(m.fn)} กลับมา`,`${E(m.fn)} เพื่อนสนิทตอนวัยรุ่นที่หายไปยี่สิบปี โผล่มาหน้าบ้าน ผอมลงจนจำแทบไม่ได้ "ขอยืม${v('money')}หน่อย… แค่นิดเดียว เดี๋ยวคืน"`,[
   {t:'💰 ให้ยืม ไม่ถามอะไร',s:'เพื่อนคือเพื่อน',f(){m.ch='lend';fx({mon:-Math.round((+S.money||0)*.12)})}},
   {t:'❓ ถามก่อนว่าเกิดอะไรขึ้น',s:'',f(){m.ch='ask'}},
   {t:'🙅 ปฏิเสธ',s:'เคยโดนมาแล้ว',f(){m.ch='no';fx({joy:-3})}}])},
  m=>{const tw=rnd(0,2),fn=E(m.fn);if(m.ch==='lend')return say(tw===0?`💌 สามปีต่อมา ${fn}คืนเงินพร้อมดอกเบี้ยสองเท่า กับจดหมายสั้นๆ "ตอนนั้นมีแค่เธอที่ไม่ถาม"`:tw===1?`🕳️ ${fn}ไม่เคยกลับมาอีก แต่ปีต่อมามีคนเอาเงินจำนวนเดียวกันมาใส่ตู้ทำบุญในชื่อคุณ`:`📰 คุณเห็นชื่อ${fn}ในข่าว — เงินที่คุณให้ ใช้ไปช่วยเด็กสิบกว่าคนออกจากที่ที่ไม่มีใครกล้าเข้าไป`,'myth')||fx(tw===0?{mon:Math.round((+S.money||0)*.15+300)}:{karma:12});
   if(m.ch==='ask')return choice(`👋 ${fn}`,`${fn}เล่าว่ามีคนตามล่า เพราะเขาเห็นสิ่งที่ไม่ควรเห็นใน${v('job')}ที่คุณทำงานอยู่ตอนนี้`,[
    {t:'🛡️ ซ่อนเพื่อนไว้ที่บ้าน',s:'อันตราย',f(){if(P(.6)){fx({karma:15,joy:6});say(`🛡️ ${fn}รอดมาได้ และสิ่งที่เขาเห็นทำให้${v('boss')}คนหนึ่งตกจากตำแหน่ง`,'epic')}else{fx({hp:-20,fame:-10});say('🛡️ พวกมันมาถึงบ้านคุณ เพื่อนหนีไปได้ แต่คุณไม่ได้โชคดีขนาดนั้น','bad')}}},
    {t:'📢 พาไปแจ้งคนที่จัดการได้',s:'ทางตรง',f(){fx({fame:20});say(`📢 เรื่องเงียบหายไปในสองวัน ${fn}หายไปพร้อมมัน`,'bad')}}]);
   say(tw===2?`📰 คุณเห็นข่าว${fn}… เขาไปขอยืมคนอื่นต่อ และคนนั้นช่วยไม่ทัน`:`🚶 ${fn}ไม่โกรธ แค่พยักหน้าแล้วเดินจากไป บางคืนคุณยังนึกถึงสีหน้าตอนนั้น`,'bad');fx({joy:-4})}]},
 body:{a:[45,58],ok:()=>true,st:[
  m=>choice('🦴 ร่างกายเริ่มทรยศ',`${wk()==='beast'?'ขาหลังเริ่มไม่ยอมฟังคำสั่ง ตอนวิ่งไล่เหยื่อมันพาคุณล้มต่อหน้าฝูง':'เช้านี้คุณลุกจากเตียงไม่ขึ้นในครั้งแรก ต้องนั่งรอให้หลังหายปวดก่อน'} สัญญาณแรกที่บอกว่าเวลาไม่ได้อยู่ข้างคุณแล้ว`,[
   {t:'💪 ฝืน ฝึกหนักกว่าเดิม',s:'มินิเกม',noFate:true,f(){m.ch='push';setTimeout(()=>game('push','💪 ฝืนร่างกาย','กดตามจังหวะหัวใจ — เร็วไปหรือช้าไปจะเจ็บ',ok=>{if(ok){fx({hp:15,pow:Math.round((+S.power||10)*.05)});say('💪 คุณเอาชนะร่างกายตัวเองได้อีกรอบ อย่างน้อยก็รอบนี้','good')}else{fx({hp:-15,life:-3});try{if(!S.chronic)S.chronic={n:'อาการปวดหลังเรื้อรัง',y:S.age}}catch(e){}say('💥 มีบางอย่างในหลังดังกร๊อบ ตั้งแต่วันนั้นคุณเดินไม่ตรงอีกเลย','bad')}}),250)}},
   {t:`🩺 ไปหา${v('doc')}`,s:'ฟังร่างกาย',f(){m.ch='doc';fx({life:4,joy:-2});say(`🩺 ${v('doc')}บอกให้ช้าลง คุณช้าลงจริงๆ และพบว่าโลกไม่ได้พังอย่างที่กลัว`,'good')}},
   {t:'🙈 ทำเป็นไม่เป็นไร',s:'',f(){m.ch='ignore';fx({life:-4});say('🙈 คุณไม่บอกใคร มันไม่ได้หายไป มันแค่รอ','')}}])]},
 kidgo:{a:[48,60],ok:()=>((S.kids|0)>0||(S.children||[]).length>0)&&wk()!=='beast',st:[
  m=>choice('🧳 ลูกออกจากบ้าน',`ลูกเก็บกระเป๋าใบใหญ่ พูดว่าจะไปเริ่มต้นที่ไกลจาก${v('home')}มาก บ้านจะเงียบลงตั้งแต่คืนนี้`,[
   {t:'🤗 ไปส่ง ยิ้มให้จนรถลับตา',s:'แล้วค่อยร้องไห้',f(){m.ch='ok';fx({joy:-4,karma:5})}},
   {t:'🙏 ขอให้อยู่ต่ออีกสักปี',s:'',f(){m.ch='stay';fx({joy:2})}},
   {t:'😠 ทะเลาะ บอกว่าไม่ต้องกลับมา',s:'',f(){m.ch='fight';fx({joy:-10})}}]),
  m=>m.ch==='fight'?choice('📩 จดหมายจากลูก',`เจ็ดปีที่ไม่ได้คุยกัน จดหมายฉบับเดียวมาถึง ข้างในมีรูปเด็กตัวเล็กๆ และประโยคเดียว "เขาอยากเจอตายาย"`,[
    {t:'🚗 ไปหาวันนั้นเลย',s:'',f(){fx({joy:22,karma:10});key('คืนดีกับลูกหลังเจ็ดปี');say('🚗 ลูกเปิดประตูมา คุณสองคนพูดคำว่า "ขอโทษ" พร้อมกันแล้วหัวเราะทั้งน้ำตา','myth')}},
    {t:'✉️ ตอบจดหมาย แต่ยังไม่ไป',s:'',f(){fx({joy:6});say('✉️ จดหมายเขียนกันไปมาเดือนละฉบับ ไม่มีใครพูดถึงเรื่องเก่า บางทีแบบนี้ก็พอ','')}}]):
   m.ch==='stay'?say('🏠 ลูกอยู่ต่ออีกปี แล้วอีกปี… วันหนึ่งคุณเห็นแววตาที่อยากไปของเขา แล้วเป็นฝ่ายบอกเองว่า "ไปเถอะ"','good')||fx({karma:6}):
   say('📞 ลูกโทรมาทุกวันอาทิตย์ บางทีก็คุยแค่ห้านาที แต่ห้านาทีนั้นคือนาทีที่ดีที่สุดของสัปดาห์','good')||fx({joy:8})]},
};
// มินิเกมบทวัยกลางคน
function game(id,t,x,cb){if(auto){const ok=P(.6);return cb(ok)}
 if(id==='pill'){const D=[{ic:'💊',n:'ยาความดัน',w:'ก่อนอาหาร'},{ic:'💉',n:'ยาฉีดอินซูลิน',w:'ก่อนอาหาร 15 นาที'},{ic:'🌿',n:'ยาสมุนไพร',w:'หลังอาหาร'}],ord=[1,0,2];let got=[];
  const draw=()=>{ov(`<h2>${t}</h2><div class="hx">${x}<br><span class="hs">ฉลากยา: ${D.map(d=>`${d.ic} ${d.n} — ${d.w}`).join(' · ')}</span></div>${shuf([0,1,2]).map(i=>`<button class="hO" data-p="${i}" ${got.includes(i)?'disabled style="opacity:.35"':''}>${D[i].ic} ${D[i].n}</button>`).join('')}<p class="hs">เรียงตามเวลาที่ต้องให้ (ก่อน → หลัง)</p>`);
   document.querySelectorAll('#hrtOv [data-p]').forEach(b=>b.onclick=()=>{const i=+b.dataset.p;if(i!==ord[got.length])return done(false,`ลำดับผิด — ${D[ord[got.length]].n}ต้องมาก่อน`,()=>cb(false));got.push(i);if(got.length===3)return done(true,'ให้ยาครบตามเวลา',()=>cb(true));draw()})};return draw()}
 if(id==='push'){let k=0,miss=0,on=0,t0=0,tm=0;ov(`<h2>${t}</h2><div class="hx">${x}<br>แตะตอนวงกลมสว่าง 6 ครั้ง · พลาดได้ 1 ครั้ง</div><div class="hBar"><i id="hrP"></i></div><button class="hBig" id="hrB">💓</button>`);const b=document.getElementById('hrB'),bar=document.getElementById('hrP');
  const beat=()=>{if(!b.isConnected)return;on=1;t0=Date.now();b.style.background='radial-gradient(circle,#ff8a5a,#5a1a0a)';tm=setTimeout(()=>{on=0;b.style.background='';miss++;if(miss>1)return done(false,'จังหวะหลุด หัวใจเต้นไม่ตาม',()=>cb(false));setTimeout(beat,500+rnd(0,500))},560)};
  b.onclick=()=>{if(!on){miss++;if(miss>1)return done(false,'คุณเร่งเกินร่างกาย',()=>cb(false));return}clearTimeout(tm);on=0;b.style.background='';k++;bar.style.width=(k/6*100)+'%';if(k>=6)return done(true,'คุณหายใจตามจังหวะได้ครบ ร่างกายยอมตามอีกครั้ง',()=>cb(true));setTimeout(beat,450+rnd(0,600))};setTimeout(beat,800)}}
function midTick(){const me=H(),M=me.mid;
 // ตอนต่อไปของบทที่กำลังเดิน
 for(const k in M){const m=M[k];const d=MID[k];if(!d||m.i>=d.st.length)continue;if(S.age>=m.ny){const f=d.st[m.i];m.i++;m.ny=S.age+rnd(3,6);try{f(m)}catch(e){console.error('mid',k,e)}return true}}
 // เริ่มบทใหม่ (ไม่เกิน 1 ต่อ 3 ปี)
 if(S.age<30||S.age>62||S.age-(me.lastMid|0)<3)return false;const L2=Object.keys(MID).filter(k=>!M[k]&&S.age>=MID[k].a[0]&&S.age<=MID[k].a[1]&&MID[k].ok());if(!L2.length||!P(.35))return false;
 const k=rp(L2),m=M[k]={i:0,ny:S.age};me.lastMid=S.age;const f=MID[k].st[m.i];m.i++;m.ny=S.age+rnd(4,7);try{f(m)}catch(e){console.error('mid',k,e)}return true}

// ============================================================
// ตัวจัดการ: ตรวจทุกปี (ทุกโลก) · ตอนตายบันทึก
// ============================================================
let lastAge=null,lastS=null;
setInterval(()=>{try{if(!S)return;if(S!==lastS){lastS=S;lastAge=S.age;const me=H();if(!me.born)me.born=Date.now()-((S.age|0)>2?9e9:0);return}
 if(!S.alive){if(!S._hrtRec){S._hrtRec=1;heirRecord();thRecord()}return}
 if(S.age!==lastAge){const a=lastAge;lastAge=S.age;if(S.age<=a)return;const me=H();if(me.y===S.age)return;me.y=S.age;
  if(busy())return setTimeout(()=>{try{if(!busy())heirTick()||thTick()||midTick()}catch(e){}},2500);
  setTimeout(()=>{try{if(busy())return;heirTick()||thTick()||midTick()}catch(e){console.error('hrt',e)}},700)}}catch(e){}},600);
window._hrt={heirGet,heirFind,heirMem,heirRecord,thRecord,thTick,midTick,MID,game,H,wk};
})()}catch(e){console.error('hrt.js',e)}
wReady('hrt');
