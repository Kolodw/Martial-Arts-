// ============================================================
// /w/hidden.js 🎭 คาดเดาไม่ได้ — ยุทธภพ · เซียน · แดนเทพ · จิตวิญญาณยุทธ์ · ผู้ย้อนกาล
//  1) 🧠 ศัตรูเรียนรู้ทางของคุณ: นับว่าเลือกแบบไหนบ่อย (สู้/เจรจา/หนี/ลอบ/ใช้เงิน) → โลกปรับตัวสวน
//     · ทางที่ใช้บ่อยเกินไปมีโอกาสถูกอ่านทาง (เสียเล็กน้อย) · มีเหตุการณ์ "ศัตรูที่ศึกษาคุณ" ที่ทางเดิมใช้ไม่ได้
//  2) 🔍 ความจริงหลังความตาย: หน้าสรุปเปิดเผยวาระลับที่คุณไม่เคยรู้ + เบาะแสที่พลาดไป
//  3) 🎭 คนรอบตัวมีวาระซ่อน: คู่ชีวิต ศิษย์ เพื่อน คู่แค้น สุ่มวาระลับไว้ · มีพิรุธให้เห็นเป็นระยะ (บางอันหลอก) · สืบได้
//  ข้อมูลอยู่ที่ S._hd (ไม่แก้ความสัมพันธ์เดิมในเซฟ) · ห่อ choice / yearExtras / endGame
// ============================================================
try{(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),rp=a=>a[Math.floor(Math.random()*a.length)],P=p=>Math.random()<p;
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
function WK(){if(!S)return'';try{if(S.mw||S.beastMode)return'';if(S.ch&&/^(hell|short|junk)$/.test(S.ch))return'';}catch(e){}return'ok'}
const H=()=>{if(!S._hd)S._hd={st:{},hist:[],warn:0,ppl:{},ct:{},cy:-9};return S._hd};
const tot=()=>{try{return total()}catch(e){return +S.power||100}};
function eff(o,line,cls){o=o||{};const out=[];const num=(k,v,lab)=>{if(!v)return;S[k]=(+S[k]||0)+v;out.push(`${lab} ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)};
 num('fame',o.fame,'ชื่อเสียง');num('int',o.int,'ปัญญา');if(o.karma){S.karma=(+S.karma||0)+o.karma;out.push(o.karma>0?`บุญ +${o.karma}`:`บาป +${-o.karma}`)}
 if(o.pow){const v=Math.round(Math.max(15,tot()*Math.abs(o.pow)/100));S.power=Math.max(0,(+S.power||0)+(o.pow>0?v:-Math.min(v,(+S.power||0)*.3)));out.push(`พลังยุทธ์ ${o.pow>0?'+':'−'}${v.toLocaleString()}`)}
 if(o.hp){const v=Math.round((+S.maxHp||100)*o.hp/100);S.hp=Math.max(1,Math.min(+S.maxHp||100,(+S.hp||0)+v));out.push(`พลังชีวิต ${v>0?'+':'−'}${Math.abs(v)}`)}
 if(o.money){const v=Math.round(o.money);S.money=Math.max(0,(+S.money||0)+v);out.push(`เงิน ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)}
 if(o.happy){try{joy(o.happy)}catch(e){}}
 const sum=out.length?` <span class="tag2">(${out.join(' · ')})</span>`:'';if(line)try{log(line+sum,cls||'epic',true)}catch(e){}return sum}

// =====================================================================
// 1) 🧠 ศัตรูเรียนรู้ทางของคุณ
// =====================================================================
const STY={fight:[/สู้|ต่อสู้|ประลอง|ดวล|โจมตี|ฟัน|บุก|ท้า|ลุย|ปะทะ|ล้ม/,'⚔️','สู้'],talk:[/เจรจา|โน้มน้าว|ขอร้อง|ต่อรอง|คุย|พูด|อธิบาย|ปลอบ/,'🗣️','เจรจา'],flee:[/หนี|ถอย|หลบ|ซ่อน|เลี่ยง|ไม่ยุ่ง|เดินผ่าน/,'🏃','หนี/หลบ'],sneak:[/ลอบ|แอบ|ย่อง|หลอก|วางยา|ปลอม|สอดแนม/,'🌙','ลอบ/หลอก'],pay:[/จ่าย|ซื้อ|ติดสินบน|ให้เงิน|ไถ่ตัว|ทุ่มเงิน/,'💰','ใช้เงิน']};
const styOf=t=>{t=String(t||'').replace(/<[^>]+>/g,'');for(const k in STY)if(STY[k][0].test(t))return k;return null};
function dom(){const h=H().hist;if(h.length<12)return null;const c={};h.forEach(k=>c[k]=(c[k]||0)+1);const k=Object.keys(c).sort((a,b)=>c[b]-c[a])[0];const r=c[k]/h.length;return r>=.6?{k,r}:null}
const SKIP=/กฎเสริม|เลือกความยาก|ตั้งค่า|โหมด|ภาษา|ยืนยัน|บันทึก|ลบ/;
{const _c=choice;choice=function(title,text,opts){try{if(WK()&&Array.isArray(opts)&&!SKIP.test(String(title||''))&&S&&S.alive){const d=dom(),g=H();
  opts=opts.map(o=>{if(!o||typeof o.f!=='function')return o;const k=styOf(o.t);if(!k)return o;const f0=o.f;const o2=Object.assign({},o);
   if(d&&d.k===k&&g.warn)o2.s=(o2.s?o2.s+' · ':'')+'🧠 ศัตรูอาจอ่านทางนี้ออก';
   o2.f=function(){try{const h=H();h.hist.push(k);if(h.hist.length>24)h.hist.shift();
     if(d&&d.k===k&&h.warn&&P(.2)){const L={fight:['ศัตรูรู้ว่าคุณจะพุ่งเข้าหา จึงตั้งรับไว้ก่อน',{hp:-6}],talk:['อีกฝ่ายเตรียมคำโกหกรอคำพูดของคุณไว้แล้ว',{fame:-40}],flee:['ทางหนีที่คุณชอบใช้ถูกปิดไว้ก่อน',{hp:-5}],sneak:['คนเฝ้ายามรู้ว่าคุณจะย่องมาทางนี้',{hp:-5}],pay:['อีกฝ่ายรู้ว่าคุณจ่ายเสมอ จึงขึ้นราคาไว้ก่อน',{money:-Math.round((+S.money||0)*.05)}]}[k];setTimeout(()=>eff(L[1],`🧠 <b>ถูกอ่านทาง:</b> ${L[0]}`,'bad'),400)}}catch(e){}return f0.apply(this,arguments)};return o2})}}catch(e){console.error('hdChoice',e)}return _c.call(this,title,text,opts)};Object.assign(choice,_c);window.choice=choice}
// เหตุการณ์: ศัตรูที่ศึกษาคุณ
function adapt(){const g=H(),d=dom();if(!d||S.age<16||S.age-g.cy<6||!P(.08))return false;g.cy=S.age;const k=d.k,ic=STY[k][1],nm=STY[k][2],pct=Math.round(d.r*100);
 const first=!g.warn;g.warn=1;let foe;try{foe=anyName('ชาย')}catch(e){foe='ชายสวมหน้ากาก'}
 const T={fight:[`${foe}ไม่ยอมดวลกับคุณตรงๆ เขาศึกษาการต่อสู้ของคุณมาสามปี และรู้ว่าคุณจะพุ่งเข้าหาเสมอ — ทางเดินระหว่างคุณกับเขาเต็มไปด้วยกับดักพิษ`],
  talk:[`${foe}ขอเจรจา แต่ทุกประโยคที่คุณเคยใช้โน้มน้าวคน เขาเตรียมคำตอบไว้หมดแล้ว และทหารของเขากำลังล้อมบ้านคุณระหว่างที่คุยกัน`],
  flee:[`${foe}รู้ว่าทุกครั้งที่มีปัญหา คุณจะถอย คราวนี้เขาจับคนในครอบครัวคุณไว้ที่ทางหนีทุกทาง`],
  sneak:[`${foe}รู้ว่าคุณชอบใช้เล่ห์ เขาจึงปล่อยข่าวปลอมให้คุณย่องเข้ามาเอง — ห้องที่คุณกำลังจะแอบเข้าไปคือกับดัก`],
  pay:[`${foe}รู้ว่าคุณแก้ทุกปัญหาด้วยเงิน เขาจึงจับตัวประกันแล้วเรียกค่าไถ่ที่ไม่มีวันจ่ายครบ ยิ่งจ่ายยิ่งเรียกเพิ่ม`]}[k][0];
 const O=Object.keys(STY).filter(x=>x!==k);const pick=O.sort(()=>Math.random()-.5).slice(0,2);
 const lab={fight:'ลุยตรงๆ',talk:'เปิดโต๊ะเจรจา',flee:'ถอยไปตั้งหลัก',sneak:'วางแผนลวงกลับ',pay:'ทุ่มเงินแก้ปัญหา'};
 const good=x=>()=>eff({fame:600,int:4},`${STY[x][1]} <b>คุณเปลี่ยนวิธี</b> ${foe}ที่เตรียมรับแต่ทาง${nm} ตั้งตัวไม่ทัน แผนทั้งหมดของเขาพังในคืนเดียว`,'myth');
 _ask(`${ic} ศัตรูที่ศึกษาคุณ`,`${first?`<span class="tag2">🧠 โลกเริ่มเรียนรู้ทางของคุณ — ${pct}% ของการตัดสินใจล่าสุดคุณเลือก "${nm}" ศัตรูจะเริ่มเตรียมรับทางนี้ไว้ก่อน</span><br><br>`:''}${T}`,[
  [`${ic} ${lab[k]} (ทางเดิม)`,'',()=>eff({hp:-20,fame:-200},`🩸 ${foe}ยิ้ม "ข้ารู้ว่าเจ้าจะทำแบบนี้" ทุกอย่างเป็นไปตามที่เขาคาดไว้`,'bad')],
  ...pick.map(x=>[`${STY[x][1]} ${lab[x]}`,'',good(x)])]);return true}
const _ask=(t,x,o)=>{try{choice(t,x,o.map(([tt,ss,f])=>({t:tt,s:ss||'',f(){try{f()}catch(e){console.error('hd',e)}}})))}catch(e){console.error('hdAsk',e)}};

// =====================================================================
// 3) 🎭 คนรอบตัวมีวาระซ่อน
// =====================================================================
const AG={
 spouse:[['loyal',50],['other',15],['spy',15],['shield',20]],
 disc:[['loyal',45],['usurp',20],['child',15],['avenge',20]],
 friend:[['loyal',50],['inform',20],['poison',15],['shield',15]],
 nem:[['true',50],['sib',25],['forced',25]]};
const wpick=L=>{let s=L.reduce((a,b)=>a+b[1],0),r=Math.random()*s;for(const x of L){r-=x[1];if(r<=0)return x[0]}return L[0][0]};
const TELL={ // พิรุธจริง
 other:['ละเมอเรียกชื่อคนอื่นกลางดึก','เก็บจดหมายที่ไม่ยอมให้คุณอ่าน','ยิ้มให้ตัวเองตอนมองไปทางทิศใต้'],
 spy:['ถามเรื่องคลังของสำนักบ่อยผิดปกติ','มีนกพิราบมาเกาะหน้าต่างทุกคืนวันจันทร์','รู้เรื่องที่คุณไม่เคยเล่าให้ใครฟัง'],
 shield:['มีแผลใหม่ทุกครั้งหลังคุณรอดจากอันตราย','ไปหาหมอลับๆ คนเดียว','อ่อนแรงลงทุกปีโดยไม่มีสาเหตุ'],
 usurp:['ศึกษาคัมภีร์ประจำตัวคุณตอนคุณไม่อยู่','สนิทกับผู้อาวุโสฝ่ายตรงข้ามมากเกินไป','ถามว่าถ้าคุณตายใครจะสืบทอด'],
 child:['มีปานที่ไหล่เหมือนของคุณ','ร้องเพลงกล่อมเด็กที่แม่คุณเคยร้อง','เก็บจี้หยกครึ่งชิ้นไว้ใกล้ตัวเสมอ'],
 avenge:['มองดาบของคุณนานเกินไป','ไหว้หลุมศพไม่มีชื่อทุกปีในวันเดียวกัน','ถามว่าคุณจำคนที่เคยฆ่าได้ทุกคนไหม'],
 inform:['รู้ข่าวก่อนทุกคนเสมอ','มีเงินใช้มากกว่ารายได้','หายไปทุกครั้งก่อนเกิดเรื่อง'],
 poison:['ยืนกรานจะชงชาให้คุณเอง','มีกลิ่นอัลมอนด์ติดแขนเสื้อ','ถามว่าช่วงนี้คุณรู้สึกเหนื่อยไหม'],
 sib:['มีท่ายืนเหมือนพ่อคุณ','ใช้กระบวนท่าที่มีแค่คนในตระกูลคุณรู้','ไม่เคยลงมือถึงตายกับคุณสักครั้ง'],
 forced:['สู้กับคุณเหมือนอยากแพ้','มีคนเฝ้าเขาทุกครั้งที่มาท้าดวล','เขียนบางอย่างบนพื้นแล้วรีบลบ']};
const HERR=['ทำท่าลุกลี้ลุกลนเมื่อคุณถามว่าไปไหนมา','มีความลับเล็กๆ ที่ไม่ยอมเล่า','หายไปทั้งคืนโดยไม่บอก']; // พิรุธหลอก (คนที่ภักดีจริงก็มีได้)
const ROLE={spouse:'คู่ชีวิต',disc:'ศิษย์',friend:'สหาย',nem:'คู่แค้น'};
function scan(){const g=H(),add=(n,role)=>{if(!n||g.ppl[n])return;g.ppl[n]={r:role,ag:wpick(AG[role]),t:[],found:0,sus:0,y:S.age}};
 try{if(S.spouse&&S.spouse.n&&S.spouse.alive!==false)add(S.spouse.n,'spouse')}catch(e){}
 try{if(S.disc&&S.disc.n)add(S.disc.n,'disc')}catch(e){}
 try{if(S.nem&&S.nem.n)add(S.nem.n,'nem')}catch(e){}
 try{(typeof peers!=='undefined'?peers:[]).filter(p=>p&&p.alive&&p.rel==='friend'&&p.n).slice(0,2).forEach(p=>add(p.n,'friend'))}catch(e){}}
const isTrue=a=>a==='loyal'||a==='true';
function tells(){const g=H();scan();const L=Object.entries(g.ppl).filter(([n,p])=>!p.found&&!p.gone);if(!L.length||!P(.14))return false;const [n,p]=rp(L);
 const real=!isTrue(p.ag)&&TELL[p.ag],fake=isTrue(p.ag)&&P(.45);if(!real&&!fake)return false;const t=real?rp(TELL[p.ag]):rp(HERR);p.t.push({a:S.age,x:t,f:!real});
 if(P(.4)){_ask(`👁️ ${ROLE[p.r]}ดูแปลกไป`,`คุณสังเกตเห็นว่า<b>${E(n)}</b>${t} มันอาจไม่มีอะไร… หรืออาจมีทุกอย่าง`,[
   ['สืบให้รู้','',()=>investigate(n)],['ถามตรงๆ','',()=>{if(isTrue(p.ag)){p.sus++;eff({happy:-3},`💬 ${E(n)}มองคุณด้วยแววตาเจ็บปวด "เจ้าไม่ไว้ใจข้าหรือ"`,'')}else if(P(.35))reveal(n);else eff({},`💬 ${E(n)}หัวเราะกลบเกลื่อน แล้วเปลี่ยนเรื่องเร็วเกินไป`,'')}],
   ['ไม่ใส่ใจ','',()=>{}]]);return true}
 try{log(`👁️ <span class="tag2">${E(n)} (${ROLE[p.r]}) ${t}</span>`,'',false)}catch(e){}return false}
function investigate(n){const p=H().ppl[n];if(!p)return;const sc=Math.min(.85,.35+(+S.int||0)/600);
 const done=ok=>{if(!ok)return eff({},`🔎 คุณหาหลักฐานไม่เจอ ${E(n)}ดูปกติดี… หรือระวังตัวเก่งขึ้น`,'');if(isTrue(p.ag)){p.sus++;p.cl=1;return eff({karma:2},`🔎 <b>${E(n)}ไม่มีอะไรต้องซ่อน</b> สิ่งที่ดูน่าสงสัยมีคำอธิบายธรรมดาทั้งหมด คุณรู้สึกผิดที่สงสัย`,'epic')}reveal(n)};
 if(window._c2MG&&!(()=>{try{return auto}catch(e){return false}})())window._c2MG('order','🔎 ปะติดปะต่อพิรุธ','เรียงสิ่งที่เห็นตามลำดับเวลา',s=>done(s>=.75||P(sc*.5)));else done(P(sc))}
const REV={
 other:(n)=>[`💔 ${n}รักคนอื่น`,`${n}ยอมรับว่าแต่งกับคุณเพราะครอบครัวบังคับ คนที่เขารักจริงรออยู่ที่เมืองทางใต้ยี่สิบปีแล้ว`,[['ปล่อยเขาไป','',{karma:15,happy:-8},'🕊️ คุณเขียนใบหย่าด้วยมือที่ไม่สั่น เขาก้มหัวให้คุณนานกว่าที่เคยทำมาทั้งชีวิต'],['ขอให้อยู่ต่อ','',{happy:-4},'🏠 เขาอยู่ต่อ ทั้งคู่ไม่เคยพูดถึงเรื่องนี้อีก']]],
 spy:(n)=>[`🕵️ ${n}คือสายลับ`,`${n}ถูกส่งมาโดยตระกูลศัตรูตั้งแต่วันแรกที่เจอคุณ ทุกความลับของคุณไปถึงพวกนั้นหมดแล้ว แต่ตอนนี้เขาร้องไห้ "ข้าเลิกส่งข่าวมาสามปีแล้ว ตั้งแต่รู้ว่ารักเจ้า"`,[['ให้อภัย','',{karma:12},'🤍 คุณจับมือเขาไว้ คืนนั้นทั้งคู่เผาจดหมายทุกฉบับ'],['ใช้เขาส่งข่าวปลอมกลับ','',{fame:800,karma:-4},'🎭 ตระกูลศัตรูพังเพราะข่าวปลอมที่ส่งผ่านมือเขา'],['ขับไล่','',{karma:-2,happy:-6},'🚪 ประตูปิดลง คุณไม่เคยรู้ว่าเขาไปไหน']]],
 shield:(n)=>[`🛡️ ${n}รับภัยแทนคุณมาตลอด`,`ทุกครั้งที่คุณรอดมาได้อย่างหวุดหวิด ${n}แอบใช้วิชาโบราณถ่ายบาดแผลไปไว้ที่ตัวเอง ร่างเขาเต็มไปด้วยรอยแผลที่ควรเป็นของคุณ`,[['สอนให้เขาหยุด แล้วดูแลเขาแทน','',{karma:20,hp:10,happy:6},'🫂 คุณอาบน้ำร้อนให้เขาทุกคืนจนแผลจางลง'],['ขอบคุณแล้วปล่อยให้ทำต่อ','',{karma:-10,hp:25},'😶 คุณแข็งแรงขึ้น เขาอ่อนแอลง ทั้งคู่ไม่พูดอะไร']]],
 usurp:(n)=>[`🗡️ ${n}รอวันแย่งตำแหน่ง`,`${n}วางแผนมาหลายปีเพื่อยึดทุกอย่างที่คุณสร้างไว้ คัมภีร์ประจำตัวคุณถูกคัดลอกไปครบแล้ว`,[['ท้าดวลตัดสิน','',{fame:600,pow:3},'⚔️ คุณเอาชนะศิษย์ต่อหน้าทุกคน เขาคุกเข่าแล้วจากไป'],['ยกทุกอย่างให้เขาก่อนเขาจะแย่ง','',{karma:12,fame:-300},'🍃 ศิษย์ยืนงงกับกุญแจคลังในมือ "ท่าน… รู้มาตลอดหรือ"']]],
 child:(n)=>[`🧬 ${n}คือลูกของคุณ`,`จี้หยกครึ่งชิ้นของ${n}ประกบกับอีกครึ่งที่คุณเก็บไว้พอดี เขาคือลูกที่พลัดพรากจากคุณตอนแรกเกิด และเขารู้มาตลอดว่าคุณคือใคร`,[['กอดเขา','',{happy:15,karma:10},'🫂 คุณกอดลูกที่สอนวิชาให้มาหลายปีโดยไม่รู้ตัว']]],
 avenge:(n)=>[`🩸 ${n}มาเพื่อแก้แค้น`,`${n}คือลูกของคนที่คุณเคยฆ่าในอดีต เขาเป็นศิษย์คุณมาตลอดเพื่อเรียนวิชาที่จะใช้ฆ่าคุณ`,[['ขอโทษ และยื่นดาบให้','',{karma:20,hp:-15},'🕊️ เขาฟันลงที่พื้นข้างตัวคุณ แล้วร้องไห้จนเช้า'],['ส่งเขาไปให้ไกล','',{karma:-3},'🚪 คุณไม่รู้ว่าวันหนึ่งเขาจะกลับมาไหม']]],
 inform:(n)=>[`👂 ${n}ขายข่าวคุณ`,`${n}รับเงินจากหลายฝ่ายเพื่อรายงานทุกการเคลื่อนไหวของคุณ เงินนั้นเลี้ยงแม่ที่ป่วยของเขามาสิบปี`,[['จ่ายค่ายาแม่เขาแทน','',{karma:12,money:-300},'💊 เขาเลิกขายข่าว และกลายเป็นคนเดียวที่คุณไว้ใจได้จริง'],['ตัดขาด','',{},'✂️ คุณไม่พูดกับเขาอีกเลย']]],
 poison:(n)=>[`☠️ ${n}เคยวางยาคุณ`,`พิษที่เกือบฆ่าคุณเมื่อหลายปีก่อน มาจากชาที่${n}ชงให้ เขาถูกบังคับด้วยชีวิตลูก และแอบใส่ยาแก้ไว้ครึ่งหนึ่งเพื่อให้คุณรอด`,[['ให้อภัย','',{karma:15},'🍵 คุณชงชาให้เขาเองครั้งนี้'],['แก้แค้น','',{karma:-8,fame:200},'🗡️ สหายคนนี้หายไปจากชีวิตคุณตลอดกาล']]],
 sib:(n)=>[`🩸 ${n}คือพี่น้องของคุณ`,`คู่แค้นที่สู้กับคุณมาทั้งชีวิต คือพี่น้องต่างมารดา พ่อของคุณทิ้งแม่เขาไว้ และเขาโตมากับความแค้นนั้น`,[['เรียกเขาว่าพี่น้อง','',{karma:15,happy:8},'🤝 ดาบสองเล่มวางลงพร้อมกัน'],['ความแค้นก็คือความแค้น','',{pow:3},'⚔️ ศึกครั้งต่อไปจะหนักกว่าเดิม']]],
 forced:(n)=>[`⛓️ ${n}ถูกบังคับให้เป็นศัตรู`,`มีคนจับครอบครัวของ${n}ไว้ บังคับให้เขาเป็นศัตรูคุณ ทุกครั้งที่ดวล เขาเล็งพลาดโดยตั้งใจ`,[['ช่วยครอบครัวเขา','',{karma:15,fame:800},'🌙 คุณกับคู่แค้นบุกช่วยตัวประกันด้วยกัน'],['ไม่ยุ่ง','',{},'😶 ศึกระหว่างคุณสองคนยังดำเนินต่อไป']]]};
function reveal(n){const p=H().ppl[n];if(!p||p.found)return;p.found=1;const R=REV[p.ag];if(!R)return;const [t,x,O]=R(E(n));_ask(t,x,O.map(([a,b,e,l])=>[a,b,()=>eff(e,l,'epic')]))}
function hdTick(){if(!S||!S.alive||!WK())return false;try{if(choice._cur||modalOpen)return false}catch(e){}if(S.age<12)return false;if(adapt())return true;if(tells())return true;return false}
{const _ye=yearExtras;yearExtras=function(){const r=_ye.apply(this,arguments);try{hdTick()}catch(e){console.error('hdTick',e)}return r}}

// =====================================================================
// 2) 🔍 ความจริงหลังความตาย
// =====================================================================
const GEN=[(a)=>`ปีที่คุณอายุ ${a} และเกือบตาย มีคนจ่ายค่าหมอแทนคุณโดยไม่บอกชื่อ — คือแม่ของคนที่คุณเคยทำร้าย`,(a)=>`ตำราที่คุณฝึกตอนอายุ ${a} ถูกคนในสำนักแอบสลับหน้าไว้หนึ่งหน้า ไม่มีใครรู้ว่าทำไม`,(a)=>`ขอทานที่คุณให้เงินตอนอายุ ${a} คือเจ้าสำนักที่ปลอมตัวมาทดสอบคน เขาเขียนชื่อคุณไว้ในสมุดผู้สืบทอด แต่ไม่มีโอกาสได้บอก`,(a)=>`คนที่ทุกคนคิดว่าฆ่าพ่อแม่คุณ ไม่ใช่คนร้ายตัวจริง คนร้ายตัวจริงไปงานศพคุณ`];
function truths(){const g=S._hd;if(!g)return[];const L=[];
 for(const n in g.ppl){const p=g.ppl[n];if(p.found)continue;const R=REV[p.ag];
  if(R&&!isTrue(p.ag)){const [t,x]=R(E(n));const miss=p.t.filter(z=>!z.f).slice(0,2);L.push({t,x,miss,role:ROLE[p.r]})}
  else if(p.sus>0)L.push({t:`🤍 ${E(n)}ภักดีจนวันสุดท้าย`,x:`คุณเคยสงสัย${ROLE[p.r]}คนนี้ ${p.sus} ครั้ง แต่${E(n)}ไม่เคยคิดร้ายกับคุณเลยสักวัน`,miss:[]})}
 if(L.length<2&&P(.5)){const a=Math.max(8,rnd(10,Math.max(11,(S.age|0)-5)));L.push({t:'📜 เรื่องที่ไม่มีใครเล่า',x:rp(GEN)(a),miss:[]})}
 return L.slice(0,3)}
{const _eg=endGame;endGame=function(){let T=[];try{if(WK()&&S&&!S._hdEnd){S._hdEnd=1;T=truths()}}catch(e){console.error('hdTruth',e)}
 const r=_eg.apply(this,arguments);
 try{if(T.length){const m=$('end');if(m&&!m.querySelector('.hdTr')){const anc=m.querySelector('.chEnd');const html=`<div class="hdTr"><h4>🔍 ความจริงที่คุณไม่เคยรู้</h4>${T.map(z=>`<div class="hdI"><b>${z.t}</b><p>${z.x}</p>${z.miss&&z.miss.length?`<small>👁️ เบาะแสที่คุณพลาด: ${z.miss.map(q=>`อายุ ${q.a} — ${E(q.x)}`).join(' · ')}</small>`:''}</div>`).join('')}</div>`;if(anc)anc.insertAdjacentHTML('afterend',html);else(m.querySelector('.box,.card,div')||m).insertAdjacentHTML('afterbegin',html)}
  T.forEach(z=>{try{log(`🔍 <b>${z.t.replace(/<[^>]+>/g,'')}</b> — ${z.x}`,'epic',true)}catch(e){}})}}catch(e){}
 return r}}
window._hd={H,dom,adapt,tells,reveal,truths,scan,AG};
const st=document.createElement('style');st.textContent=`.hdTr{margin:0 0 10px;padding:10px 12px;border-radius:12px;border:2px solid #b48cff;background:linear-gradient(135deg,rgba(40,20,60,.8),rgba(20,16,32,.92));text-align:left}.hdTr h4{margin:0 0 6px;color:#d8c2ff}.hdI{padding:6px 0;border-top:1px dashed rgba(180,140,255,.35)}.hdI:first-of-type{border-top:0}.hdI b{display:block;color:#fff;font-size:14px}.hdI p{margin:3px 0;font-size:12.5px;line-height:1.5;opacity:.9}.hdI small{display:block;font-size:11px;color:#ffd36e;opacity:.85}`;document.head.appendChild(st);
})()}catch(e){console.error('hidden.js',e)}
