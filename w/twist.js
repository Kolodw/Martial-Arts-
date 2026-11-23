// ============================================================
// /w/twist.js 🌀 ชีวิตพลิก — ยุทธภพ · เซียน · แดนเทพ · จิตวิญญาณยุทธ์ · ผู้ย้อนกาล
//  4) 🌀 กฎโลกพลิกกลางชีวิต: ชีวิตละ 1 ครั้ง กฎของโลกเปลี่ยนไปหลายปี (ฟ้าปิด · ห้ามพกอาวุธ · เงินตราเปลี่ยน · คนแก่ย้อนวัย · ทุพภิกขภัย · ฝนวิญญาณ)
//     ตอนเริ่มเลือกวิธีรับมือได้ · มีผลจริงทุกปีระหว่างนั้น · จบแล้วสรุปผล
//  5) 👤 ชีวิตของผู้เล่นจริงไหลเข้ามา: ตัวละครที่ผู้เล่นคนอื่นเล่นจนจบ (จากสุสานผู้เล่นจริง) โผล่เป็นตำรา หลุมศพ ทายาท วิญญาณ ตำนาน
//  7) ⏭️ หลับไปสิบปี: ถูกผนึก/โคม่า/หลงแดนลับ ตื่นมาโลกเปลี่ยน — ทุกคนรอบตัวแก่ขึ้นด้วย (ไม่ใช้ในโหมดผู้ย้อนกาล)
//  ข้อมูลอยู่ที่ S._tw · ห่อ choice / yearExtras
// ============================================================
try{(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),rp=a=>a[Math.floor(Math.random()*a.length)],P=p=>Math.random()<p;
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
function WK(){if(!S)return'';try{if(S.mw||S.beastMode)return'';if(S.ch==='soul')return'soul';if(S.ch==='regress')return'rg';if(S.ch&&/^(hell|short|junk)$/.test(S.ch))return'';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'}
const T=()=>{if(!S._tw)S._tw={r:null,rd:0,g:[],gy:-99,gn:0,sl:0,p0:null};return S._tw};
const LSP=()=>Math.max(60,+S.lifespan||80);
const tot=()=>{try{return total()}catch(e){return +S.power||100}};
function eff(o,line,cls){o=o||{};const out=[];const num=(k,v,lab)=>{if(!v)return;S[k]=(+S[k]||0)+v;out.push(`${lab} ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)};
 num('fame',o.fame,'ชื่อเสียง');num('int',o.int,'ปัญญา');if(o.karma){S.karma=(+S.karma||0)+o.karma;out.push(o.karma>0?`บุญ +${o.karma}`:`บาป +${-o.karma}`)}
 if(o.pow){const v=Math.round(Math.max(15,tot()*Math.abs(o.pow)/100));S.power=Math.max(0,(+S.power||0)+(o.pow>0?v:-Math.min(v,(+S.power||0)*.3)));out.push(`พลังยุทธ์ ${o.pow>0?'+':'−'}${v.toLocaleString()}`)}
 if(o.hp){const v=Math.round((+S.maxHp||100)*o.hp/100);S.hp=Math.max(1,Math.min(+S.maxHp||100,(+S.hp||0)+v));out.push(`พลังชีวิต ${v>0?'+':'−'}${Math.abs(v)}`)}
 if(o.moneyP){const v=Math.round((+S.money||0)*o.moneyP);S.money=Math.max(0,(+S.money||0)+v);if(v)out.push(`เงิน ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)}
 if(o.money){const v=Math.round(o.money);S.money=Math.max(0,(+S.money||0)+v);out.push(`เงิน ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)}
 if(o.happy){try{joy(o.happy)}catch(e){}}
 const sum=out.length?` <span class="tag2">(${out.join(' · ')})</span>`:'';if(line)try{log(line+sum,cls||'epic',true)}catch(e){}return sum}
const ask=(t,x,o)=>{try{choice(t,x,o.map(([tt,ss,f])=>({t:tt,s:ss||'',f(){try{f()}catch(e){console.error('tw',e)}}})))}catch(e){console.error('twAsk',e)}};

// =====================================================================
// 4) 🌀 กฎโลกพลิก
// =====================================================================
const RULE={
 sky:{ic:'☁️',n:'ฟ้าปิด',d:'ประตูสวรรค์ปิดลง พลังฟ้าดินเบาบางจนการฝึกได้ผลแค่ครึ่งเดียว ไม่มีใครรู้ว่าจะเปิดอีกเมื่อไหร่',m:.5,o:[['🧘 เก็บตัวสะสมพลัง','พลังที่หายไปจะคืนมาทีเดียวตอนฟ้าเปิด',R=>{R.k='store';R.bank=0}],['🧭 ออกตามหาช่องฟ้าที่ยังเปิด','เสี่ยง แต่ถ้าเจอ ฝึกได้ปกติ',R=>{R.k='seek'}],['🍵 ใช้ชีวิตไปตามปกติ','',R=>{R.k='live'}]]},
 rain:{ic:'🌧️',n:'ฝนวิญญาณ',d:'ฝนที่มีพลังฟ้าดินเข้มข้นตกไม่หยุด ทุกคนฝึกได้ผลเพิ่มครึ่งหนึ่ง สำนักทุกแห่งแย่งที่โล่งรับฝน',m:1.5,o:[['🔥 ฝึกไม่หลับไม่นอน','ได้ผลสองเท่า แต่ร่างทรุด',R=>{R.k='grind';R.m=2}],['🤝 แบ่งที่รับฝนให้คนยากไร้','บุญทุกปี',R=>{R.k='share'}],['💰 รองน้ำฝนขาย','รวยขึ้น',R=>{R.k='sell'}]]},
 arms:{ic:'🚫',n:'ห้ามพกอาวุธ',d:'ทางการประกาศห้ามพกอาวุธทั่วแผ่นดิน ใครถูกจับได้ระหว่างต่อสู้ ถูกปรับหนัก',m:1,o:[['🗡️ ซ่อนอาวุธไว้ใต้เสื้อ','สู้ได้ตามเดิม แต่เสี่ยงโดนปรับ',R=>{R.k='hide'}],['✊ ฝึกวิชามือเปล่า','ไม่โดนปรับ ฝึกช้าลงนิดหน่อย',R=>{R.k='bare'}],['📢 ร่วมต่อต้านคำสั่ง','ชื่อเสียง แต่ทางการจับตา',R=>{R.k='rebel'}]]},
 coin:{ic:'💱',n:'เงินตราเปลี่ยน',d:'ราชสำนักประกาศยกเลิกเงินตราเก่า ให้แลกเป็นเงินใหม่ในอัตราครึ่งเดียว พ่อค้าทั้งตลาดตื่นตระหนก',m:1,o:[['🪙 แลกเป็นทองก่อนประกาศมีผล','เก็บได้เกือบหมด แต่อาจโดนโกง',R=>{R.k='gold';if(P(.2))eff({moneyP:-.5},'🪙 พ่อค้าทองหนีไปพร้อมเงินครึ่งหนึ่งของคุณ','bad');else eff({moneyP:-.1},'🪙 คุณแลกทองทันก่อนใคร')}],['🎲 ทุ่มลงทุนในเงินใหม่','ได้หรือเสียหนัก',R=>{R.k='bet';if(P(.45))eff({moneyP:.8},'📈 เงินใหม่ขึ้นค่า คุณรวยกว่าเดิม','epic');else eff({moneyP:-.7},'📉 เงินใหม่ร่วง คุณเสียเกือบหมด','bad')}],['😮‍💨 ยอมแลกตามประกาศ','เหลือครึ่งเดียว',R=>{R.k='ok';eff({moneyP:-.5},'💱 เงินเก็บทั้งชีวิตหายไปครึ่งหนึ่งในวันเดียว','bad')}]]},
 young:{ic:'🌸',n:'คนแก่ย้อนวัย',d:'ดาวหางสีชมพูผ่านฟ้า ทุกคนในแผ่นดินอายุขัยยืดออกไป คนแก่ลุกขึ้นเดินได้ แต่ศัตรูเก่าที่ใกล้ตายก็กลับมาแข็งแรงด้วย',m:1,o:[['⚔️ ใช้เวลาที่ได้มาฝึกต่อ','',R=>{R.k='train';eff({pow:6})}],['🏡 ใช้เวลากับครอบครัว','',R=>{R.k='fam';eff({happy:10,karma:5})}],['🔭 ตามหาที่มาของดาวหาง','',R=>{R.k='star';eff({int:6})}]]},
 famine:{ic:'🌾',n:'ทุพภิกขภัย',d:'ฝนไม่ตกสามฤดู ข้าวราคาขึ้นสิบเท่า ทุกบ้านต้องจ่ายมากขึ้นทุกปีแค่เพื่อให้อยู่รอด',m:1,o:[['🍚 เปิดยุ้งแจกข้าว','เงินลด บุญเพิ่มทุกปี',R=>{R.k='give'}],['🏚️ กักตุนขายราคาแพง','รวย แต่บาป',R=>{R.k='hoard'}],['🏹 ออกล่าหาอาหารเอง','เจ็บตัว แต่ไม่เสียเงิน',R=>{R.k='hunt'}]]}};
function ruleStart(){const t=T();if(t.rd||t.r||S.age<18)return false;const L=LSP();if(t.ra==null){t.ra=rnd(Math.max(18,Math.round(L*.25)),Math.max(19,Math.round(L*.6)))}if(S.age<t.ra)return false;
 const id=rp(Object.keys(RULE)),R0=RULE[id],dur=Math.max(5,Math.min(60,Math.round(L/10)));t.rd=1;const R=t.r={id,from:S.age,to:S.age+dur,k:'',m:R0.m};if(id==='young'){S.lifespan=(+S.lifespan||80)+Math.max(8,Math.round(L*.1));try{if(S.nem&&S.nem.alive)S.nem.r=(+S.nem.r||1)*1.15}catch(e){}}
 ask(`🌀 กฎโลกพลิก: ${R0.ic} ${R0.n}`,`${R0.d}<br><span class="tag2">ราว ${dur} ปี · จะรับมืออย่างไร</span>`,R0.o.map(([a,b,f])=>[a,b,()=>{f(R);const L2=R0.o.find(x=>x[0]===a);try{log(`🌀 <b>${R0.n}</b> เริ่มแล้ว — คุณเลือก “${a.replace(/^\S+\s/,'')}”`,'epic')}catch(e){}}]));return true}
function ruleYear(){const t=T(),R=t.r;if(!R)return false;const R0=RULE[R.id];
 // ปรับผลการฝึกของปีนี้
 const p=+S.power||0;if(t.p0!=null&&p>t.p0&&R.m!==1){const g=p-t.p0;if(R.m<1){const cut=g*(1-R.m);S.power=Math.max(0,p-cut);if(R.k==='store')R.bank=(R.bank||0)+cut}else S.power=p+g*(R.m-1)}t.p0=+S.power||0;
 if(R.k==='grind')eff({hp:-4});if(R.k==='share')S.karma=(+S.karma||0)+2;if(R.k==='sell')eff({moneyP:.06});
 if(R.id==='famine'){if(R.k==='give'){eff({moneyP:-.1});S.karma=(+S.karma||0)+3}else if(R.k==='hoard'){eff({moneyP:.12});S.karma=(+S.karma||0)-3}else if(R.k==='hunt')eff({hp:-6});else eff({moneyP:-.08})}
 if(R.k==='seek'&&!R.sd&&S.age>=R.from+2){R.sd=1;ask('🧭 ช่องฟ้าบนยอดเขา','คุณเดินทางมาสองปี เจอยอดเขาที่ฟ้ายังเปิดอยู่ช่องเล็กๆ แต่มีสัตว์อสูรเฝ้า',[['ฝ่าเข้าไป','',()=>{if(P(.55)){R.m=1;eff({pow:8,fame:500},'☁️ <b>คุณได้ที่นั่งใต้ช่องฟ้า</b> ฝึกได้ปกติขณะที่คนทั้งแผ่นดินฝึกได้ครึ่งเดียว','myth')}else eff({hp:-30},'🩸 สัตว์อสูรเฝ้าช่องฟ้าแข็งเกินไป','bad')}],['กลับบ้าน','',()=>{}]]);return true}
 if(R.k==='rebel'&&!R.sd&&S.age>=R.from+3){R.sd=1;ask('📢 คืนจับกุม','ทางการบุกจับแกนนำต่อต้านคำสั่งห้ามพกอาวุธ ชื่อคุณอยู่ในรายชื่อ',[['สู้','',()=>{if(P(.5)){R.to=S.age;eff({fame:2500,karma:6},'✊ <b>การต่อต้านชนะ</b> คำสั่งถูกยกเลิกก่อนกำหนด','myth')}else eff({hp:-25,moneyP:-.2},'⛓️ คุณถูกจับ ติดคุกหนึ่งปี','bad')}],['หนี','',()=>eff({fame:-300},'🏃 คุณหนีพ้น แต่คนอื่นไม่')]]);return true}
 if(S.age>=R.to){t.r=null;let x='';if(R.k==='store'&&R.bank){const b=Math.round(R.bank*1.5);S.power=(+S.power||0)+b;x=` พลังที่เก็บสะสมไว้ระเบิดออกมาพร้อมกัน <b>+${b.toLocaleString()}</b>`}
  try{log(`🌀 <b>${R0.ic} ${R0.n} สิ้นสุดลง</b>${x}`,x?'myth':'epic',true);keyAdd&&keyAdd(`${S.age} ปี — ผ่านยุค${R0.n}`)}catch(e){}}
 return false}
// ห้ามพกอาวุธ: ตัวเลือกต่อสู้เสี่ยงโดนปรับ
{const _c=choice;choice=function(title,text,opts){try{const R=S&&S._tw&&S._tw.r;if(R&&R.id==='arms'&&R.k!=='bare'&&Array.isArray(opts)&&WK()){opts=opts.map(o=>{if(!o||typeof o.f!=='function'||!/สู้|ต่อสู้|ประลอง|ดวล|ฟัน|ปะทะ|ลุย/.test(String(o.t||'')))return o;const f0=o.f,o2=Object.assign({},o);o2.s=(o2.s?o2.s+' · ':'')+'🚫 อาจโดนปรับข้อหาพกอาวุธ';o2.f=function(){try{if(P(R.k==='hide'?.25:.35))setTimeout(()=>eff({moneyP:-.08},'🚫 ทหารเห็นอาวุธในมือคุณ ถูกปรับตามคำสั่งใหม่','bad'),400)}catch(e){}return f0.apply(this,arguments)};return o2})}}catch(e){}return _c.call(this,title,text,opts)};Object.assign(choice,_c);window.choice=choice}

// =====================================================================
// 5) 👤 ชีวิตของผู้เล่นจริง
// =====================================================================
let GQ=null,GQt=0;
async function gLoad(){if(GQ&&Date.now()-GQt<600000)return GQ;try{const j=await api('graves');GQ=((j&&j.g)||[]).filter(x=>x&&x.n&&x.n!=='นิรนาม'&&x.n!==S.name);GQt=Date.now()}catch(e){GQ=GQ||[]}return GQ}
const WN={m:'ยุทธภพ',x:'โลกเซียน',g:'แดนเทพ'};
function ghost(){const t=T();if(S.age<12||t.gn>=4||S.age-t.gy<6||!P(.1))return false;if(!GQ||!GQ.length){gLoad();return false}
 const L=GQ.filter(x=>!(t.g||[]).includes(x.i));if(!L.length)return false;const g=rp(L);t.g.push(g.i);t.gy=S.age;t.gn++;
 const who=`<b>${E(g.n)}</b>${g.e?`「${E(g.e)}」`:''}`,tag=`<span class="twReal">👤 ผู้เล่นจริง</span>`,info=`ตายเมื่ออายุ ${Number(g.a||0).toLocaleString()} ปี${g.c?` · ${E(g.c)}`:''}${g.r?` · ${E(g.r)}`:''}`;
 const kind=rp(['book','grave','heir','soul','song']);
 if(kind==='book')return ask('📜 ตำราของคนตาย',`${tag}<br>ในร้านหนังสือเก่าคุณเจอบันทึกฝีมือลายมือของ${who} จาก${WN[g.w]||'ยุทธภพ'} (${info})${g.ar?` ในนั้นเขียนถึงวิชา <b>${E(g.ar)}</b> ที่เขาฝึกมาทั้งชีวิต`:''}`,[
   ['ศึกษาให้จบ','',()=>eff({pow:5,int:4},`📖 คุณฝึกตามบันทึกของ${E(g.n)} บรรทัดสุดท้ายเขียนว่า “ถ้าใครอ่านถึงตรงนี้ อย่าตายแบบข้า”`)],
   ['เก็บไว้เป็นของสะสม','',()=>eff({fame:150})]]),true;
 if(kind==='grave')return ask('🪦 หลุมศพข้างทาง',`${tag}<br>ป้ายหลุมศพเก่าข้างทางสลักชื่อ${who} (${info})${g.y?`<br>คำสุดท้ายบนป้าย: “${E(g.y)}”`:''}`,[
   ['จุดธูปให้','',()=>eff({karma:5},`🕯️ ควันธูปลอยตรงขึ้นฟ้า ทั้งที่ลมแรง`)],
   ['ขุดหาของที่ฝังไว้','บาป',()=>{if(P(.5))eff({money:Math.round(300+(+S.age||0)*15),karma:-8},'💰 ใต้หลุมมีกล่องเงิน','');else eff({hp:-15,karma:-8},'👻 มีบางอย่างไม่พอใจ คุณป่วยไปทั้งเดือน','bad')}],
   ['เดินผ่านไป','',()=>{}]]),true;
 if(kind==='heir')return ask('⚔️ ทายาทมาท้า',`${tag}<br>หนุ่มคนหนึ่งยืนขวางทาง “ข้าคือทายาทของ${who}” (${info}) “ปู่ข้าเคยเป็นยอดฝีมือ ข้าต้องการรู้ว่าวิชาที่ท่านทิ้งไว้ยังสู้คนรุ่นนี้ได้ไหม”`,[
   ['รับคำท้า','',()=>{try{duel(`ทายาทของ${g.n}`,tot()*(.85+Math.random()*.3),w=>eff(w?{fame:500}:{hp:-10},w?`⚔️ ทายาทของ${E(g.n)}ยิ้มทั้งที่แพ้ “ปู่คงภูมิใจที่ข้าได้สู้กับท่าน”`:`🩸 วิชาของ${E(g.n)}ยังใช้ได้ดีเกินคาด`,w?'epic':'bad'))}catch(e){eff({fame:300})}}],
   ['สอนเขาแทนการสู้','',()=>eff({karma:6,fame:200},'🤝 เขากลายเป็นลูกศิษย์ที่มาหาคุณทุกฤดูหนาว')]]),true;
 if(kind==='soul')return ask('👻 วิญญาณในถ้ำ',`${tag}<br>ในถ้ำลึก วิญญาณของ${who}ยังวนเวียนอยู่ (${info}) “ข้ามีเรื่องค้างคาใจ ช่วยข้าสักเรื่อง แล้วข้าจะสอนสิ่งที่ข้ารู้”`,[
   ['ช่วยปลดปล่อยวิญญาณ','',()=>eff({karma:10,pow:4},`🌫️ วิญญาณของ${E(g.n)}ยิ้มแล้วจางหายไป ทิ้งความเข้าใจบางอย่างไว้ในหัวคุณ`,'epic')],
   ['ขอวิชาก่อน','',()=>eff({pow:7,karma:-3},`📜 วิญญาณสอนคุณครึ่งหนึ่ง แล้วหายไปพร้อมความเสียใจ`)]]),true;
 return ask('🎶 ตำนานในโรงเตี๊ยม',`${tag}<br>นักเล่านิทานในโรงเตี๊ยมกำลังเล่าตำนานของ${who} (${info}) คนฟังทั้งห้องนั่งเงียบ`,[
   ['ฟังจนจบ','',()=>eff({int:3,happy:4},`📖 คุณจำบทเรียนจากชีวิตของ${E(g.n)}ได้ขึ้นใจ`)],
   ['เล่าตำนานของตัวเองบ้าง','',()=>eff({fame:250})]]),true}

// =====================================================================
// 7) ⏭️ หลับไปสิบปี
// =====================================================================
const HOW=[['🧊 ถูกผนึกในน้ำแข็ง','ระหว่างต่อสู้กับผู้ใช้วิชาน้ำแข็ง ร่างคุณถูกผนึกในก้อนน้ำแข็งพันปี'],['🌀 หลงในแดนลับ','คุณเดินเข้าแดนลับที่เวลาข้างในเดินช้ากว่าข้างนอก ข้างในผ่านไปสามวัน'],['💤 โคม่า','พิษประหลาดทำให้คุณหลับไม่ตื่น หมอทุกคนส่ายหน้า'],['🧘 เข้าฌานลึก','คุณนั่งสมาธิลึกจนลืมเวลา']];
function sleep(){const t=T(),w=WK();if(t.sl||w==='rg'||S.age<20||!P(.012))return false;const L=LSP(),n=Math.min(rnd(6,12),Math.max(0,Math.floor(L-S.age-5)));if(n<4)return false;t.sl=1;const h=rp(HOW);
 ask(h[0],`${h[1]}…<br><br>เมื่อคุณลืมตาอีกครั้ง <b>${n} ปีผ่านไปแล้ว</b>`,[['ลุกขึ้นมาดูโลก','',()=>wake(n,h[0])]]);return true}
function wake(n,how){try{S.age=(+S.age||0)+n;(S.children||[]).forEach(c=>{if(c&&typeof c.age==='number')c.age+=n});(typeof peers!=='undefined'?peers:[]).forEach(p=>{if(p&&typeof p.age==='number')p.age+=n});if(S.spouse&&typeof S.spouse.age==='number')S.spouse.age+=n;if(S.sp&&typeof S.sp.age==='number')S.sp.age+=n;const t=T();t.p0=null}catch(e){console.error('wake',e)}
 const ch=[];const add=(x)=>ch.push(x);
 if((+S.money||0)>100){if(P(.5)){const v=Math.round((+S.money||0)*.4);S.money-=v;add(`💸 ญาติใช้เงินเก็บของคุณไป ${v.toLocaleString()} เพราะคิดว่าคุณไม่ตื่นแล้ว`)}else{const v=Math.round((+S.money||0)*.5);S.money+=v;add(`💰 เงินที่ฝากไว้งอกเงย +${v.toLocaleString()}`)}}
 try{if(S.nem&&S.nem.alive&&!S.nem.peace){S.nem.r=(+S.nem.r||1)*1.25;add(`😈 ${E(S.nem.n)}ฝึกหนักตลอด ${n} ปีที่คุณหลับ ตอนนี้แข็งแกร่งกว่าเดิมมาก`)}}catch(e){}
 try{const k=(S.children||[]).filter(c=>c&&c.n);if(k.length)add(`👶 ลูกๆ โตขึ้น ${n} ปีโดยไม่มีคุณ ${E(k[0].n)}ไม่จำหน้าคุณแล้ว`)}catch(e){}
 if(S.spouse&&S.spouse.n)add(P(.5)?`💍 ${E(S.spouse.n)}รอคุณทุกวัน ไม่เคยถอดแหวน`:`💍 ${E(S.spouse.n)}เกือบแต่งงานใหม่ เหลืออีกแค่เดือนเดียว`);
 const imp=P(.5);if(imp)add(`🎭 มีคนสวมรอยใช้ชื่อคุณหากินไปทั่ว${P(.5)?' และทำชื่อคุณเสียหาย':' และทำให้ชื่อคุณดังขึ้น'}`);
 add(rp(['🏯 สำนักที่คุณรู้จักเปลี่ยนเจ้าสำนักไปแล้วสองคน','⚔️ สงครามใหญ่เกิดขึ้นและจบลงระหว่างที่คุณหลับ','🌾 หมู่บ้านเกิดของคุณถูกน้ำท่วมจนต้องย้ายที่']));
 const atro=/ฌาน|น้ำแข็ง/.test(how)?0:.1;if(atro)S.power=Math.round((+S.power||0)*(1-atro));
 ask(`⏭️ ${n} ปีต่อมา`,`<ul class="twL">${ch.map(x=>`<li>${x}</li>`).join('')}</ul>${atro?'<span class="tag2">กล้ามเนื้อลีบไปบ้าง (พลังยุทธ์ −10%)</span>':'<span class="tag2">ร่างกายถูกรักษาไว้สมบูรณ์ และจิตใจเข้าใจบางอย่างมากขึ้น</span>'}`,[
  ...(imp?[]:[['ออกไปดูว่าโลกเปลี่ยนไปแค่ไหน','',()=>eff({int:5,fame:200},'🗺️ คุณเดินทางรอบแผ่นดิน เรียนรู้ทุกอย่างที่พลาดไป')]]),
  ...(!imp?[]:[['ตามหาคนที่สวมรอย','',()=>{if(P(.55))eff({fame:1200},'🎭 คุณเจอคนสวมรอยกลางตลาด กระชากหน้ากากต่อหน้าทุกคน','epic');else eff({fame:-300},'🎭 ไม่มีใครเชื่อว่าคุณคือตัวจริง','bad')}]]),
  ['กลับไปหาครอบครัวก่อน','',()=>eff({happy:10,karma:4},'🏡 ประตูบ้านเปิด และทุกคนร้องไห้พร้อมกัน')],
  ['ฝึกชดเชยเวลาที่เสียไป','',()=>eff({pow:atro?12:18},/ฌาน|น้ำแข็ง/.test(how)?'🧘 ความเข้าใจที่ได้ระหว่างหลับใหลไหลออกมาเป็นพลัง':'💪 คุณฝึกหนักกว่าตอนวัยรุ่นสองเท่า','epic')]]);
 try{keyAdd&&keyAdd(`${S.age} ปี — ตื่นจาก${how.replace(/^\S+\s/,'')} หลังหลับไป ${n} ปี`)}catch(e){}try{render()}catch(e){}}

// ---------- ตัวจัด ----------
function tick(){if(!S||!S.alive||!WK())return false;try{if(choice._cur||modalOpen)return false}catch(e){}
 if(T().p0==null)T().p0=+S.power||0;if(ruleYear())return true;if(ruleStart())return true;if(sleep())return true;if(ghost())return true;return false}
{const _ye=yearExtras;yearExtras=function(){const r=_ye.apply(this,arguments);try{tick()}catch(e){console.error('twTick',e)}return r}}
setTimeout(()=>{try{if(S&&WK())gLoad()}catch(e){}},8000);
window._tw={T,RULE,ruleStart,ruleYear,ghost,sleep,wake,gLoad,_gq:L=>{GQ=L;GQt=Date.now()}};
const st=document.createElement('style');st.textContent=`.twReal{display:inline-block;font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(92,210,255,.18);border:1px solid rgba(92,210,255,.6);color:#9be3ff;margin-bottom:4px}.twL{margin:4px 0 8px;padding-left:18px}.twL li{margin:4px 0;line-height:1.5}`;document.head.appendChild(st);
})()}catch(e){console.error('twist.js',e)}
