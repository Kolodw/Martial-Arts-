// ============================================================
// /w/annal.js 📜 จักรวาลร่วม เฟส 3: ปูมจักรวาล — วีรกรรมใหญ่ของผู้เล่นจริงกลายเป็นประวัติศาสตร์ในชีวิตคนอื่น (ทุกโลก)
//  1) จบชีวิต → ตรวจวีรกรรม (≤3: ผู้ประพันธ์/ตอนจบใหญ่/ตำนานร้อยชีวิต/ทรราช/นักบุญ/อายุยืน/ชื่อก้อง/ตระกูลใหญ่/อาจารย์/อัจฉริยะอายุสั้น/มหาเศรษฐี)
//     → api chronadd · เก็บสำเนาไว้ LS murim_anMine
//  2) ระหว่างชีวิต: 📜 เกร็ดประวัติศาสตร์ในฟีด (ชีวิตละ ≤4 · 9 แบบ) + เหตุการณ์อ้างถึงวีรกรรม (ชีวิตละ ≤3 · 12 แบบ ผลตามชนิดวีรกรรม)
//     ศาล · ของตกทอด · ทายาท · ลัทธิ · บันทึก · เทศกาล · ซากปรักหักพัง · ปริศนา(ใช้อายุจริง) · คนอ้างว่ากลับชาติมาเกิด · ด้ายของผู้ประพันธ์ 3 แบบ
//  3) ☰ → 📜 ปูมจักรวาล: เส้นเวลาประวัติศาสตร์ร่วม (กรองตามโลก) + วีรกรรมของฉันและจำนวนชีวิตที่เล่าถึง (api chron/chronmine/chronref)
//  ข้อมูลในเซฟ: S._an {f,e,y,ly,used[],ref[]} · คนที่กด 🚫 ไม่ให้ใช้ชื่อ (cast.js) จะไม่ถูกส่ง/ไม่ถูกแสดง
// ============================================================
try{(()=>{
const $=id=>document.getElementById(id);
const E=t=>{try{return esc(String(t))}catch(e){return String(t).replace(/[<>&"]/g,'')}};
const rp=a=>a[Math.floor(Math.random()*a.length)],rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),P=p=>Math.random()<p;
const on=()=>{try{return typeof onlineOK==='undefined'||!!onlineOK}catch(e){return true}};
const OFF=()=>{try{return !!LS.get('murim_castOff',0)}catch(e){return false}};
const WK=()=>{try{if(!S)return'';if(S.beastMode)return'beast';if(S.mw){if(S.mw.fog)return'fog';if(S.mw.sky)return'sky';return'mw'}if(S.ch==='soul')return'soul';if(S.ch==='regress')return'loop';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'};
const WN={murim:['⚔️','ยุทธภพ'],xian:['☁️','โลกเซียน'],god:['🌟','แดนเทพ'],soul:['🔮','จิตวิญญาณยุทธ์'],loop:['⏳','ผู้ย้อนกาล'],mw:['🏙️','ยุคปัจจุบัน'],sky:['🌌','ทะลุฟ้าดารา'],fog:['🌫️','นครม่านหมอก'],beast:['🐺','ป่าอสูร']};
const PLACE={murim:['โรงเตี๊ยม','ลานกลางเมือง','สำนัก'],xian:['ศาลาผู้บำเพ็ญ','ยอดเขาวิญญาณ','นิกาย'],god:['ศาลาเมฆ','ลานวังสวรรค์','วังสวรรค์'],soul:['โรงเตี๊ยมชายแดน','ลานสถาบัน','สถาบัน'],loop:['โรงเตี๊ยม','ลานกลางเมือง','สำนัก'],
 mw:['คาเฟ่','สวนสาธารณะ','บริษัท'],sky:['บาร์ใต้กำแพง','ลานหน้ากำแพง','กิลด์'],fog:['ผับใต้โคมแก๊ส','จัตุรัสหอนาฬิกา','สมาคม'],beast:['ลำธาร','ทุ่งล่า','ฝูง']};
const PL=()=>PLACE[WK()]||PLACE.murim;
const cashV=v=>Math.round(v*(S&&S.mw?400:1));
const fN=v=>{try{return fmt(v)}catch(e){return String(v)}};

// ---------------------------------------------------------------- วีรกรรม
//  k: [ไอคอน, ชื่อวีรกรรม, ประโยคเล่า(x)]
const D={
 stay:['👑','ผู้ประพันธ์นิรันดร์',x=>`ผู้ขึ้นนั่งบนบัลลังก์ด้ายกาล และเขียนชะตาของทุกคนนับแต่นั้น`],
 free:['🕊️','ผู้ปล่อยด้าย',x=>`ผู้ปล่อยด้ายชะตาทุกเส้นคืนให้เจ้าของ แล้วเกิดใหม่เป็นคนธรรมดา`],
 cut:['🔥','ผู้ตัดด้าย',x=>`ผู้ตัดด้ายทุกเส้นจนจักรวาลเก่าดับสูญ แล้วเริ่มจักรวาลใหม่`],
 grand:['🏆','ผู้ไปถึงจุดจบที่ไม่มีใครไปถึง',x=>`ผู้ไปถึงจุดจบที่ไม่มีใครในยุคเดียวกันไปถึง`],
 legend:['📬','ตำนานร้อยชีวิต',x=>`ผู้ที่ชื่อไปปรากฏในชีวิตของผู้คนนับร้อย`],
 tyrant:['😈','ทรราช',x=>`ทรราชที่ผู้คนยังกลัวจะเอ่ยชื่อ`],
 saint:['🕊️','นักบุญ',x=>`ผู้ใจบุญที่ช่วยชีวิตคนนับไม่ถ้วน`],
 old:['🐢','ผู้ข้ามยุค',x=>`ผู้มีชีวิตยืนยาวถึง ${fN(x.a)} ปี`],
 fame:['🌟','ชื่อก้องแผ่นดิน',x=>`ผู้มีชื่อเสียงขจรไกลจนเด็กทุกคนรู้จัก`],
 clan:['👨‍👩‍👧‍👦','ต้นตระกูลใหญ่',x=>`ต้นตระกูลใหญ่ที่ลูกหลานยังสืบสายมาถึงวันนี้`],
 master:['🎓','บรมครู',x=>`อาจารย์ผู้สร้างศิษย์ที่ยิ่งใหญ่`],
 young:['🥀','อัจฉริยะอายุสั้น',x=>`อัจฉริยะที่จากไปตอนอายุเพียง ${fN(x.a)} ปี`],
 rich:['💰','มหาเศรษฐี',x=>`มหาเศรษฐีผู้ร่ำรวยที่สุดในยุคของตน`]};
const ORD=['stay','free','cut','grand','legend','tyrant','saint','old','fame','clan','master','young','rich'];
const FAME={murim:6000,xian:4000,god:8000,soul:5000,loop:6000,mw:8000,sky:60000,fog:5000,beast:3000};
const RICH={murim:400000,xian:400000,god:1e6,soul:300000,loop:400000,mw:40e6,sky:40e6,fog:1e6,beast:1e5};
function deeds(){const w=WK()||'murim',o=[],a=S.age|0,f=+S.fame||0,k=+S.karma||0;let big=false;
 try{big=/ระดับ\s*S|ฉากจบลับ|ฉากจบแท้|ฉากจบสูงสุด/.test(($('end')||{}).innerText||'')}catch(e){}
 try{const d=LS.get('murim_thr',null);if(d&&d.fin&&LS.get('murim_anFin','')!==d.fin+(d.fins|0)){o.push(d.fin);LS.set('murim_anFin',d.fin+(d.fins|0))}}catch(e){}
 if(big)o.push('grand');
 try{const t=window._cast&&window._cast.ecTot&&window._cast.ecTot();if(t>=100&&!LS.get('murim_anLeg',0)){o.push('legend');LS.set('murim_anLeg',1)}}catch(e){}
 if(k<=-150)o.push('tyrant');if(k>=250)o.push('saint');
 if(a>=((w==='xian'||w==='god')?1500:95))o.push('old');
 if(f>=(FAME[w]||6000))o.push('fame');
 if((+S.kids||0)>=5)o.push('clan');if(S.disc)o.push('master');
 if(a<25&&(big||f>=(FAME[w]||6000)/3))o.push('young');
 if((+S.money||0)>=(RICH[w]||4e5))o.push('rich');
 return ORD.filter(x=>o.includes(x)).slice(0,3)}
function submit(){try{if(!S||S._anSent||(S.age|0)<8||!S.name)return;S._anSent=1;const d=deeds();if(!d.length)return;
 let ep='';try{ep=typeof epithet==='function'?String(epithet()||'').replace(/<[^>]+>/g,''):''}catch(e){}
 const c=String(S.cause||S.deathCause||'').replace(/<[^>]+>/g,'').slice(0,60),me={n:String(S.name).slice(0,20),w:WK()||'murim',e:ep.slice(0,30),a:S.age|0,c,t:Date.now()};
 try{const M=LS.get('murim_anMine',[])||[];d.forEach(k=>M.unshift(Object.assign({k},me)));LS.set('murim_anMine',M.slice(0,40))}catch(e){}
 if(!OFF()&&on())api('chronadd',Object.assign({d},me)).catch(()=>{})}catch(e){console.error('an submit',e)}}

// ---------------------------------------------------------------- ดึงปูม
let A=null,At=0,Ab=0;
function load(){if(Ab||!on()||(A&&Date.now()-At<900000))return;Ab=1;try{api('chron',{}).then(j=>{Ab=0;if(j&&j.L){A=j.L;At=Date.now()}}).catch(()=>{Ab=0;At=Date.now()-600000})}catch(e){Ab=0}}
function st(){if(!S._an)S._an={f:0,e:0,y:-99,ly:-1,used:[],ref:[]};return S._an}
function pickX(ks){if(!A||!A.length)return null;const s=st(),L=A.filter(x=>x&&D[x.k]&&x.n!==S.name&&!s.used.includes(x.i)&&(!ks||ks.includes(x.k)));return L.length?rp(L):null}
const NM=x=>`<b>${E(x.n)}</b>${x.e?`「${E(x.e)}」`:''}`;
const ERA=x=>x.w===WK()?rp(['เมื่อหลายร้อยปีก่อน','ในยุคก่อนหน้านี้','เมื่อสามชั่วอายุคนก่อน','เมื่อหลายสิบปีก่อน','ในสมัยที่ปู่ของปู่ยังเป็นเด็ก']):`ในอีกจักรวาลหนึ่ง (${WN[x.w]?WN[x.w][1]:'อีกโลก'})`;
const TAG=x=>`<br><span class="anTag">📜 ปูมจักรวาล · ${D[x.k][0]} ${D[x.k][1]} · ผู้เล่นจริงจาก${WN[x.w]?WN[x.w][1]:'อีกโลก'}</span>`;
const mark=x=>{const s=st();s.used.push(x.i);if(!s.ref.includes(x.i))s.ref.push(x.i)};

// ---------------------------------------------------------------- ผลลัพธ์ (ทุกโลก)
function fx(o){const out=[];const n=(k,v,l)=>{if(!v)return;S[k]=Math.max(0,(+S[k]||0)+v);out.push(`${l} ${v>0?'+':''}${fN(v)}`)};
 if(o.pw){const g=Math.max(1,Math.round((+S.power||0)*Math.abs(o.pw)))*(o.pw<0?-1:1);S.power=Math.max(1,(+S.power||0)+g);try{const K=S.mw&&S.mw.sky&&window._sky&&_sky.SK();if(K){K.tb=Math.max(0,(K.tb||0)+o.pw);_sky.sync&&_sky.sync()}}catch(e){}out.push(`พลังพื้นฐาน ${o.pw>0?'+':''}${Math.round(o.pw*100)}%`)}
 n('int',o.int,'ปัญญา');n('karma',o.karma,'บุญ');n('fame',o.fame,'ชื่อเสียง');
 if(o.money){const v=cashV(o.money);const had=+S.money||0;S.money=Math.max(0,had+v);out.push(`เงิน ${v>0?'+':'−'}${fN(Math.abs(v>0?v:Math.min(had,-v)))}`)}
 if(o.hp){const d=Math.round((+S.maxHp||100)*o.hp);S.hp=Math.max(1,Math.min(+S.maxHp||100,(+S.hp||0)+d));out.push(o.hp>0?'พลังชีวิตฟื้น':`พลังชีวิต −${Math.round(-o.hp*100)}%`)}
 if(o.life){if(S.mw){S.mw.wsL=(S.mw.wsL|0)+o.life;S.mw.end=(S.mw.end||80)+o.life}else S.lifespan=(+S.lifespan||70)+o.life;out.push(`อายุขัย ${o.life>0?'+':''}${o.life} ปี`)}
 return out.join(' · ')}
const say=(t,c,o)=>{const r=o?fx(o):'';try{log(t+(r?`<br><span class="tag2">${r}</span>`:''),c||'',true);render&&render()}catch(e){}};
/* พรตามชนิดวีรกรรม (ใช้ในศาล/ของตกทอด/บันทึก) */
const BLESS={stay:()=>rp([{pw:.15},{int:8},{life:4},{fame:80}]),free:{int:5,life:3},cut:{pw:.2,life:-5},grand:{pw:.15},legend:{fame:80},tyrant:{pw:.12,karma:-8},saint:{karma:8,hp:1},
 old:{life:3},fame:{fame:50},clan:{money:120},master:{int:6},young:{int:8},rich:{money:200}};
const bl=(k,m)=>{let b=BLESS[k];b=typeof b==='function'?b():Object.assign({},b);if(m)for(const q in b)b[q]=q==='hp'?b[q]:Math.round(b[q]*m*100)/100;return b};

// ---------------------------------------------------------------- 1) เกร็ดในฟีด (ไม่มีตัวเลือก)
const BIT=[
 (x,p)=>`📜 ชาวบ้านใน${p[1]}ยังเล่าถึง${NM(x)} ${D[x.k][2](x)} ${ERA(x)}`,
 (x,p)=>`🎶 เด็กๆ ร้องเพลงเกี่ยวกับ${NM(x)} ${D[x.k][2](x)} ทั้งที่ไม่มีใครจำได้แล้วว่าเพลงนี้แต่งเมื่อไหร่`,
 (x,p)=>`🗿 กลาง${p[1]}มีรูปปั้นของ${NM(x)} ${D[x.k][2](x)} มือของรูปปั้นถูกลูบจนมันวาว`,
 (x,p)=>`📖 ในตำราประวัติศาสตร์บทที่ ${rnd(3,19)} เขียนถึง${NM(x)} ${D[x.k][2](x)} ${ERA(x)}`,
 (x,p)=>`🍵 นักเล่านิทานใน${p[0]}เล่าเรื่องของ${NM(x)} คนฟังเถียงกันว่าเรื่องจริงหรือแต่งขึ้น`,
 (x,p)=>`🕯️ วันนี้เป็นวันรำลึก${NM(x)} ${D[x.k][2](x)} ผู้คนจุดเทียนเต็ม${p[1]}`,
 (x,p)=>`💬 คนแก่คนหนึ่งยืนยันว่าตอนเด็กเคยเห็น${NM(x)}กับตา ไม่มีใครเชื่อ เพราะนั่นมัน${ERA(x)}`,
 (x,p)=>`🪧 มีคนตั้งชื่อ${p[2]}ใหม่ว่า "${E(x.n)}" เพื่อเป็นเกียรติแก่${D[x.k][1]}`,
 (x,p)=>x.c?`⚰️ ใครบางคนเล่าว่าจุดจบของ${NM(x)}คือ "${E(x.c)}" แล้วทุกคนก็เงียบไป`:`⚰️ ไม่มีใครรู้ว่า${NM(x)}จากไปอย่างไร บ้างว่ายังไม่ตาย`];

// ---------------------------------------------------------------- 2) เหตุการณ์อ้างถึงวีรกรรม — [หัวข้อ, ข้อความ, [[ตัวเลือก, คำอธิบาย, f]], ชนิดวีรกรรมที่ใช้ได้]
const EV=[
 {k:null,go:x=>['🛕 ศาลของ'+x.n,`คุณเจอศาลเล็กๆ ที่ผู้คนสร้างไว้บูชา${NM(x)} ${D[x.k][2](x)} ${ERA(x)} ควันธูปยังลอยอยู่`,[
   ['🙏 กราบไหว้','รับพรตามตำนาน',()=>say(`🙏 ลมเย็นพัดผ่าน คุณรู้สึกเหมือนมีใครแตะไหล่`,'myth',bl(x.k))],
   ['💰 ถวายของ','ใช้เงิน · พรแรงขึ้นครึ่งหนึ่ง',()=>{fx({money:-30});say(`💰 คุณวางเครื่องเซ่นไว้หน้าศาล ธูปทั้งกระถางลุกโพลงพร้อมกัน`,'myth',bl(x.k,1.5))}],
   ['🚶 เดินผ่านไป','',()=>say(`🚶 คุณเดินผ่านศาลของ${NM(x)}ไป`,'')]]]},
 {k:null,go:x=>['🗝️ ของตกทอดจาก'+x.n,`พ่อค้าใน${PL()[1]}ขายของที่อ้างว่าเคยเป็นของ${NM(x)} ${D[x.k][2](x)} ราคาไม่ถูกเลย`,[
   ['💰 ซื้อ',`ราคา ${fN(cashV(80))}`,()=>{fx({money:-80});const r=Math.random();if(r<(x.k==='tyrant'||x.k==='cut'?.4:.25))say(`🎭 ของปลอม! พ่อค้าหายไปแล้ว`,'bad');else if(x.k==='tyrant'&&r<.6)say(`🩸 ของชิ้นนั้นมีคำสาปของทรราชติดมาด้วย`,'bad',{hp:-.3,pw:.12});else say(`✨ ของแท้! พลังของตำนานยังหลงเหลืออยู่ในนั้น`,'myth',bl(x.k,1.3))}],
   ['🔍 ตรวจดูให้ดีก่อน','ใช้ปัญญา',()=>{if(P(Math.min(.8,.3+(+S.int||0)/300)))say(`🔍 คุณจับได้ว่าเป็นของปลอม พ่อค้ารีบเก็บร้านหนี`,'good',{int:3,fame:15});else say(`🔍 ดูยังไงก็ไม่รู้ คุณเลยไม่ซื้อ`,'')}]]]},
 {ks:['clan','fame','old','saint','grand'],go:x=>['👶 ทายาทของ'+x.n,`เด็กหนุ่มคนหนึ่งอ้างว่าเป็นทายาทรุ่นที่ ${rnd(4,13)} ของ${NM(x)} ${D[x.k][2](x)} เขากำลังถูกคนรุมรังแก`,[
   ['🛡️ เข้าไปช่วย','',()=>{if(P(.6))say(`🛡️ คุณช่วยเขาไว้ได้ เด็กหนุ่มมอบป้ายหยกประจำตระกูลให้คุณ`,'myth',{karma:6,fame:30,...bl(x.k,.6)});else say(`🛡️ คุณช่วยไว้ได้ แต่โดนลูกหลงไปหลายแผล`,'good',{karma:6,hp:-.2})}],
   ['🤨 ถามหาหลักฐาน','',()=>{if(P(.5))say(`🤨 เขาไม่มีหลักฐาน และยอมรับว่าโกหกเพื่อเอาตัวรอด`,'',{int:3});else say(`📜 เขาคลี่ผังตระกูลออกมา ชื่อ${NM(x)}อยู่บนสุด ลายมือเก่าจนแทบอ่านไม่ออก`,'myth',{int:5})}],
   ['🚶 ไม่ยุ่ง','',()=>say(`🚶 คุณเดินผ่านไป เสียงร้องดังไล่หลังมา`,'',{karma:-3})]]]},
 {ks:['tyrant','stay','cut','legend','grand'],go:x=>['🕯️ ลัทธิบูชา'+x.n,`กลุ่มคนสวมผ้าคลุมสีเดียวกันชวนคุณเข้าลัทธิที่บูชา${NM(x)} ${D[x.k][2](x)} พวกเขาว่าถ้าศรัทธามากพอ ${E(x.n)}จะกลับมา`,[
   ['🕯️ เข้าร่วม','พลังเพิ่ม · บุญลด',()=>say(`🕯️ พิธีกรรมคืนนั้นทำให้ร่างกายคุณร้อนผ่าว และเสียงกระซิบชื่อ${NM(x)}ก็ไม่หายไปจากหัวอีกเลย`,'myth',{pw:.15,karma:-10})],
   ['📢 แฉให้'+(WK()==='mw'?'ตำรวจ':'ทางการ')+'รู้','ชื่อเสียง · บุญ',()=>say(`📢 ลัทธิถูกกวาดล้าง ผู้คนขอบคุณคุณ แต่บางคืนคุณยังฝันเห็นผ้าคลุมสีนั้น`,'good',{fame:50,karma:6})],
   ['😶 แกล้งเข้าร่วมเพื่อสืบความลับ','เสี่ยง',()=>{if(P(.5))say(`🗝️ คุณได้คัมภีร์ลับของลัทธิมา และหนีออกมาได้ก่อนถูกจับได้`,'myth',{int:8,pw:.08});else say(`🩸 พวกเขาจับได้ คุณหนีออกมาได้แต่เจ็บหนัก`,'bad',{hp:-.35})}]]]},
 {ks:['master','old','grand','saint','young','free'],go:x=>['📖 บันทึกของ'+x.n,`ในกองหนังสือเก่าคุณเจอบันทึกลายมือของ${NM(x)} ${D[x.k][2](x)} หน้าแรกเขียนว่า "ถึงใครก็ตามที่อ่านเจอ"`,[
   ['📖 อ่านให้จบทั้งเล่ม','',()=>say(`📖 บรรทัดสุดท้ายเขียนว่า "${rp(['อย่าเชื่อตำนานของข้ามากนัก','ทุกอย่างที่ข้าทำ ข้าทำเพื่อคนคนเดียว','ถ้าได้เกิดใหม่ ข้าอยากเป็นคนธรรมดา','ข้าขอโทษ','จงไปให้ไกลกว่าข้า'])}"`,'myth',{int:7,...(x.k==='master'?{pw:.1}:{})})],
   ['💰 ขายให้นักสะสม','',()=>say(`💰 นักสะสมให้ราคาดีเกินคาด เพราะ${NM(x)}มีชื่อเสียงมาก`,'good',{money:150})]]]},
 {ks:['saint','fame','free','rich','clan','legend'],go:x=>['🎊 เทศกาลรำลึก'+x.n,`ทั้ง${PL()[1]}จัดเทศกาลรำลึก${NM(x)} ${D[x.k][2](x)} มีการแข่งขันชิงรางวัลด้วย`,[
   ['🏅 ลงแข่ง','ชนะ ~45%',()=>{if(P(.45))say(`🏅 คุณชนะ! ชื่อของคุณถูกจารึกต่อจากชื่อ${NM(x)}บนแผ่นศิลา`,'myth',{fame:100,money:80});else say(`🏅 คุณแพ้รอบแรก แต่สนุกมาก`,'',{hp:.3})}],
   ['🍡 เที่ยวงานเฉยๆ','',()=>say(`🍡 คุณกินขนมจนพุงกาง แล้วยืนดูพลุที่ยิงเป็นรูปชื่อ${NM(x)}`,'good',{hp:.5,karma:2})]]]},
 {ks:['tyrant','grand','rich','cut','old'],go:x=>['🏚️ ซากของ'+x.n,`ลึกเข้าไปใน${rp(['ป่าทึบ','หุบเขา','ย่านร้าง','ทะเลทราย'])} คุณเจอซากที่ว่ากันว่าเคยเป็นที่อยู่ของ${NM(x)} ${D[x.k][2](x)}`,[
   ['🔦 สำรวจข้างใน','เสี่ยง',()=>{const r=Math.random();if(r<.45)say(`💎 คุณเจอห้องลับที่ยังไม่มีใครค้นพบ`,'myth',{money:220,...bl(x.k,.8)});else if(r<.75)say(`🪤 กับดักที่${NM(x)}วางไว้ยังทำงานอยู่!`,'bad',{hp:-.35});else say(`🕸️ ข้างในว่างเปล่า มีแค่ชื่อของคนที่มาก่อนคุณสลักไว้เต็มผนัง`,'',{int:3})}],
   ['✍️ สลักชื่อตัวเองไว้แล้วกลับ','',()=>say(`✍️ ชื่อของคุณอยู่ใต้ชื่อของ${NM(x)}แล้ว`,'',{fame:15})]]]},
 {k:null,need:x=>(x.a|0)>0,go:x=>{const a=x.a|0,o=[a,Math.max(1,Math.round(a*rp([.5,.6,.7]))),Math.round(a*rp([1.4,1.6,2]))+1].sort(()=>Math.random()-.5);
  return['❓ ปริศนาประวัติศาสตร์',`นักปราชญ์ใน${PL()[0]}ตั้งคำถามชิงรางวัล: "${NM(x)} ${D[x.k][1]} ผู้เลื่องชื่อ มีชีวิตอยู่กี่ปี?"`,o.map(v=>[`🔢 ${fN(v)} ปี`,'',()=>{if(v===a)say(`🎉 ถูกต้อง! ${NM(x)}มีชีวิตอยู่ ${fN(a)} ปีจริงๆ นักปราชญ์มอบรางวัลให้`,'myth',{int:5,fame:30,money:60});else say(`❌ ผิด คำตอบคือ ${fN(a)} ปี`,'',{int:1})}])]}},
 {k:null,go:x=>['🎭 คนที่อ้างว่าเป็น'+x.n+'กลับชาติมาเกิด',`ชายแปลกหน้าประกาศกลาง${PL()[1]}ว่าตัวเองคือ${NM(x)}กลับชาติมาเกิด และเล่าเรื่องในอดีตได้ละเอียดจนน่าขนลุก`,[
   ['🙇 เชื่อและขอคำชี้แนะ','',()=>{if(P(.4))say(`🌟 เขาสอนบางอย่างที่มีแต่${NM(x)}เท่านั้นที่จะรู้ หรือว่าเขาพูดจริง?`,'myth',bl(x.k));else say(`🎭 เขาขอเงิน "ค่าครู" แล้วหายไป`,'bad',{money:-60})}],
   ['🧠 ซักถามจนจับโกหกได้','ใช้ปัญญา',()=>{if(P(Math.min(.85,.35+(+S.int||0)/250)))say(`🧠 คุณถามเรื่องที่มีแต่ผู้เล่นตัวจริงจะรู้ เขาตอบไม่ได้ ฝูงชนโห่ไล่`,'good',{fame:40,int:3});else say(`😰 เขาตอบได้ทุกข้อ ฝูงชนหันมามองคุณแทน`,'',{fame:-10})}]]]},
 {ks:['stay'],go:x=>['👑 ด้ายที่ถูกเขียนไว้',`คืนหนึ่งคุณเห็นด้ายสีทองเส้นบางพันรอบข้อมือ มีเสียงกระซิบว่า "${E(x.n)}ผู้นั่งบนบัลลังก์ด้ายกาล แก้ชะตาของเจ้าเล็กน้อย"`,[
   ['✨ ยอมรับชะตาที่ถูกแก้','สุ่มพร',()=>say(`✨ ด้ายสีทองซึมหายเข้าไปในผิว`,'myth',bl('stay',1.3))],
   ['✂️ ดึงด้ายทิ้ง "ชีวิตข้า ข้าเขียนเอง"','',()=>say(`✂️ ด้ายขาดผึง เสียงหัวเราะเบาๆ ดังมาจากที่ไกลแสนไกล`,'myth',{int:6,karma:5})]]]},
 {ks:['cut'],go:x=>['🖤 ด้ายดำ',`ด้ายสีดำเส้นหนึ่งงอกออกมาจากเงาของคุณ ว่ากันว่ามันเป็นเศษเสี้ยวของจักรวาลใหม่ที่${NM(x)}เริ่มต้นไว้`,[
   ['🖤 รับพลังด้ายดำ','พลังพื้นฐาน +25% · อายุขัย −6 ปี',()=>say(`🖤 ด้ายดำพันรอบหัวใจ คุณแข็งแกร่งขึ้น แต่ได้ยินเสียงนาฬิกาเดินเร็วขึ้น`,'myth',{pw:.25,life:-6})],
   ['🙅 ปฏิเสธ','',()=>say(`🙅 ด้ายดำหดกลับเข้าไปในเงา`,'',{karma:3})]]]},
 {ks:['free'],go:x=>['🕊️ ลมแห่งเสรีภาพ',`ตำนานว่า${NM(x)}ปล่อยด้ายชะตาคืนให้ทุกคน วันนี้คุณรู้สึกได้เป็นครั้งแรกว่าทุกทางเลือกเป็นของคุณจริงๆ`,[
   ['🕊️ หายใจลึกๆ แล้วเลือกทางใหม่','',()=>say(`🕊️ ใจคุณเบาเหมือนไม่เคยเป็นมาก่อน`,'myth',{int:5,life:3,hp:1})]]]}];

// ---------------------------------------------------------------- ตัวจัด
function busy(){try{const m=$('modal'),mk=m&&m.dataset&&m.dataset.k;return !!((modalOpen&&mk!=='choice')||(typeof DU!=='undefined'&&DU)||($('auOv')&&$('auOv').classList.contains('on'))||(window._mgBusy&&_mgBusy()))}catch(e){return true}}
function ask(x,r){try{choice('📜 '+r[0],r[1]+TAG(x),r[2].map(([t,s,f])=>({t,s:s||'',f(){try{f()}catch(e){console.error('annal',e)}}})))}catch(e){console.error('an ask',e)}}
function tick(){try{if(typeof S==='undefined'||!S||!S.alive)return;load();if(!A||busy())return;const s=st(),ag=S.age|0;if(s.ly===ag||ag<6)return;s.ly=ag;
 if(s.f<4&&P(.1)){const x=pickX();if(x){mark(x);s.f++;try{log(rp(BIT)(x,PL())+TAG(x),'',false)}catch(e){}return}}
 if(s.e<3&&ag>=10&&ag-s.y>=4&&P(.09)){const L=EV.filter(v=>true);for(let t=0;t<6;t++){const v=rp(L),x=pickX(v.ks||null);if(!x||(v.need&&!v.need(x)))continue;mark(x);s.e++;s.y=ag;return ask(x,v.go(x))}}}catch(e){console.error('an tick',e)}}
setInterval(tick,1500);setTimeout(load,5000);
function sendRef(){try{const s=S&&S._an;if(!s||!s.ref||!s.ref.length||!on())return;const i=s.ref.splice(0,10);api('chronref',{i}).catch(()=>{})}catch(e){}}
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);setTimeout(()=>{sendRef();submit()},1600);return r}}

// ---------------------------------------------------------------- 3) หน้า 📜 ปูมจักรวาล
const ago=t=>{const m=(Date.now()-(t||0))/60000;return m<60?`${Math.max(1,Math.round(m))} นาทีก่อน`:m<1440?`${Math.round(m/60)} ชม.ก่อน`:`${Math.round(m/1440)} วันก่อน`};
let FW='all',TAB='all';
function open(){try{if(modalOpen)closeM()}catch(e){}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📜 ปูมจักรวาล</h3><p class="tag2">ประวัติศาสตร์ที่ผู้เล่นจริงทุกคนร่วมกันเขียน วีรกรรมใหญ่ตอนจบชีวิตจะถูกบันทึกที่นี่ แล้วถูกเล่าขานในชีวิตของคนอื่น</p>
  <div class="anTabs"><button class="anTb" data-t="all">🌌 ประวัติศาสตร์ร่วม</button><button class="anTb" data-t="mine">✍️ วีรกรรมของฉัน</button></div><div id="anBody"><p class="tag2">กำลังเปิดม้วนปูม…</p></div>`,'annal');
 document.querySelectorAll('.anTb').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;draw()});draw()}
function row(x,me){const d=D[x.k]||['❔','?',()=>''],w=WN[x.w]||['🌍','?'];
 return`<div class="anRow${me?' me':''}"><div class="anIc">${d[0]}</div><div class="anTx"><div><b>${E(x.n)}</b>${x.e?` <span class="anEp">「${E(x.e)}」</span>`:''} <span class="anW">${w[0]} ${w[1]}</span></div>
  <div class="anD">${d[1]} — ${E(d[2](x))}</div><div class="anM">${x.a?`อายุ ${fN(x.a)} ปี · `:''}${x.c?`${E(x.c)} · `:''}${ago(x.t)}${me&&x.r!=null?` · <b class="anR">ถูกเล่าใน ${fN(x.r)} ชีวิต</b>`:''}</div></div></div>`}
function draw(){const el=$('anBody');if(!el)return;document.querySelectorAll('.anTb').forEach(b=>b.classList.toggle('on',b.dataset.t===TAB));
 if(TAB==='mine'){const loc=LS.get('murim_anMine',[])||[];el.innerHTML='<p class="tag2">กำลังนับว่ามีกี่ชีวิตที่เล่าถึงคุณ…</p>';
  const show=L=>{el.innerHTML=L.length?L.map(x=>row(x,1)).join(''):`<p class="tag2">ยังไม่มีวีรกรรมที่ถูกบันทึก ลองเป็น${['ทรราช','นักบุญ','ผู้มีอายุยืนข้ามยุค','ต้นตระกูลใหญ่','อาจารย์ที่มีศิษย์'].join(' / ')} หรือไปถึงตอนจบใหญ่ดูสิ</p>`};
  if(!on())return show(loc);api('chronmine',{}).then(j=>show(j&&j.L&&j.L.length?j.L:loc)).catch(()=>show(loc));return}
 const go=()=>{const L=(A||[]).filter(x=>FW==='all'||x.w===FW).slice().sort((a,b)=>(b.t||0)-(a.t||0));const ws=['all'].concat(Object.keys(WN).filter(k=>(A||[]).some(x=>x.w===k)));
  el.innerHTML=`<div class="anF">${ws.map(k=>`<button class="anC${FW===k?' on':''}" data-w="${k}">${k==='all'?'ทุกโลก':WN[k][0]+' '+WN[k][1]}</button>`).join('')}</div>
   ${L.length?`<div class="anTl">${L.map(x=>row(x,0)).join('')}</div>`:`<p class="tag2">${A?'ยังไม่มีประวัติศาสตร์ในโลกนี้ คุณอาจเป็นคนแรกที่ถูกบันทึก':'ต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง'}</p>`}`;
  el.querySelectorAll('.anC').forEach(b=>b.onclick=()=>{FW=b.dataset.w;draw()})};
 if(A)go();else{At=0;load();setTimeout(go,1800)}}
window.annalOpen=open;
{const _m=openMenu;openMenu=function(){const r=_m.apply(this,arguments);try{const g=$('modal').querySelector('.mgrid,.tmgrid');if(g&&!g.querySelector('.anMB'))g.insertAdjacentHTML('beforeend',(g.classList.contains('tmgrid')?'<button class="cb anMB" onclick="annalOpen()"><i>📜</i>ปูมจักรวาล</button>':'<button class="opt anMB" onclick="annalOpen()">📜 ปูมจักรวาล</button>'))}catch(e){}return r};window.openMenu=openMenu}
try{if(typeof openTitleMenu==='function'){const _t=openTitleMenu;openTitleMenu=function(){const r=_t.apply(this,arguments);try{const g=$('modal').querySelector('.tmgrid,.mgrid');if(g&&!g.querySelector('.anMB'))g.insertAdjacentHTML('beforeend',(g.classList.contains('tmgrid')?'<button class="cb anMB" onclick="annalOpen()"><i>📜</i>ปูมจักรวาล</button>':'<button class="opt anMB" onclick="annalOpen()">📜 ปูมจักรวาล</button>'))}catch(e){}return r};window.openTitleMenu=openTitleMenu}}catch(e){}

const css=document.createElement('style');css.textContent=`.anTag{display:inline-block;margin-top:6px;font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(232,200,106,.14);border:1px solid rgba(232,200,106,.55);color:#f3dfa2}
.anTabs{display:flex;gap:6px;margin:8px 0}.anTb{flex:1;padding:8px;border-radius:10px;border:1px solid #e8c86a55;background:#ffffff0a;color:inherit;cursor:pointer;font-weight:700}.anTb.on{background:#e8c86a33;border-color:#e8c86a}
.anF{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 10px}.anC{padding:4px 10px;border-radius:9px;border:1px solid #ffffff33;background:#ffffff0a;color:inherit;cursor:pointer;font-size:12px}.anC.on{border-color:#e8c86a;background:#e8c86a26}
.anTl{position:relative;padding-left:10px;border-left:2px solid #e8c86a55;margin-left:14px}
.anRow{display:flex;gap:10px;align-items:flex-start;margin:0 0 10px -27px;padding:8px 10px;border-radius:12px;background:#ffffff08;border:1px solid #ffffff18;animation:csIn .4s ease both}.anRow.me{margin-left:0;border-color:#e8c86a88}
.anIc{flex:0 0 32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1d1830;border:1.5px solid #e8c86a;font-size:16px}
.anTx{flex:1;min-width:0;font-size:13px;line-height:1.55}.anEp{opacity:.75;font-size:12px}.anW{float:right;font-size:11px;opacity:.7}.anD{color:#f3dfa2}.anM{font-size:11px;opacity:.7}.anR{color:#8dffb0}
@keyframes csIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`;document.head.appendChild(css);
window._annal={D,EV,BIT,deeds,submit,tick,load,st,open,_set:L=>{A=L;At=Date.now()}};
try{wReady('annal')}catch(e){}
})()}catch(e){console.error('annal.js',e)}
