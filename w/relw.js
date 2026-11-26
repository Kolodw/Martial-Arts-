// ============================================================
// /w/relw.js 💥 ปลดปล่อยพลัง ภาคทุกโลก (pixelfx)
//  - โลกใหม่มีฉากของตัวเอง: ⭕ วิญญาณยุทธ์ (เผาวงแหวน) · 🏙️ ยุคปัจจุบัน (ริกเตอร์+ยอดวิว) · 🌠 ทะลุฟ้าดารา (ผ่าดาว + ร่างแยก)
//    · 🌉 นครม่านหมอก (ฉีกหมอก เห็นความจริงแต่เสียสติ) · 🔁 ผู้ย้อนกาล (ระเบิดแล้วย้อนเวลา รอยร้าวติดข้ามลูป)
//  - กดค้างที่ลูกพลังเพื่อชาร์จ · ปล่อยในช่วงทอง = คริติคอล ×1.5 · เอฟเฟกต์ระเบิด/ชาร์จ/บรรยากาศ = pixelfx (pfx.js)
//  - ยุทธภพ/เซียน/เทพ/สัตว์อสูร ใช้ฉากเดิม แต่ตอนพลังกระทบเพิ่มระเบิด pixelfx ตามความแรง (ห่อ pxShock) + สัตว์อสูรได้ "อาณาเขต"
//  - pixelfx: MIT, Copyright (c) 2026 Patch · Copyright (c) 2026 Hugo Duprez — https://github.com/patch-gg/pixelfx
// ============================================================
try{(function(){
if(window._relw)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const R=(a,b)=>a+Math.random()*(b-a),CH=a=>a[Math.floor(Math.random()*a.length)];
const F=n=>{n=+n||0;return n>=1e9?(n/1e9).toFixed(1)+'B':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':String(Math.round(n))};
const T_=f=>{try{return f()}catch(e){return null}};
const wk=()=>{if(typeof S==='undefined'||!S)return null;const M=S.mw;if(M&&M.sky)return'sky';if(M&&M.fog)return'fog';if(S.beastMode&&!S.beastMode.human)return'beast';if(S.ch==='soul')return'soul';if(S.rg)return'loop';if(M)return'mw';return null};
// ยุคปัจจุบัน: คนธรรมดาไม่มีพลังให้ปล่อย — ต้องตื่นพลัง (ฮันเตอร์) / ข้ามมิติมาพร้อมลมปราณ / มีวิชาติดตัว
// ระดับพลัง: human = มนุษย์ที่ฝึกมา (นักสู้ใต้ดิน/นักมวย/ร่างกายแกร่ง) · super = เหนือมนุษย์ (ต่อยกำแพงทะลุ) · city = ถล่มเมืองได้ (ระบบ/ตื่นพลังขั้นสูง/ข้ามมิติ/วิชาขั้นสูง)
const mwPow=()=>{try{const M=S.mw;if(!M||M.sky||M.fog)return{ok:1,cls:'city'};const H=M.H,aw=H&&H.aw&&H.aw!=='none'?H.aw:'',qi=+M.qi||0,A=(S.arts||[]).filter(a=>a&&a.n),arts=A.length,ar=Math.max(-1,...A.map(a=>a.r|0)),pw=+S.power||0,
  under=T_(()=>M.wx&&M.wx.on&&M.wx.id==='under')||0,rk=T_(()=>M.U&&M.U.rk)|0,trav=M.native===false;
 let cls='';if((aw&&pw>=300)||qi>=5||ar>=3||trav&&qi>=1)cls='city';else if(aw||qi>=1||arts||(under&&(pw>=120||rk>=4))||pw>=220)cls='super';else if(under||pw>=15||rk>=1)cls='human';
 return{ok:!!cls,cls,aw,qi,arts,trav,under,pw}}catch(e){return{ok:1,cls:'city'}}};
const CAP={human:3.2,super:6.6,city:10};
const NEW=new Set(['soul','mw','sky','fog','loop']);
// ---------- ธาตุ/ชนิดพลัง → เอฟเฟกต์ + คำบรรยาย (อ้างอิงวิชาที่ใช้) ----------
const EL={
 fire:{fx:[['fireRing'],['fireball','fireRing'],['flamePillar','fireRing']],t:['เปลวไฟพุ่งเป็นเสาแดงฉาน','ทุกอย่างในรัศมีลุกเป็นไฟ ควันดำม้วนขึ้นฟ้า','อากาศร้อนจนบิดเบี้ยว หินหลอมเป็นลาวา']},
 ice:{fx:[['frostNova'],['iceSpikes','frostNova'],['iceShatter','iceSpikes','frostNova']],t:['ลมหายใจกลายเป็นไอขาว','พื้นดินกลายเป็นทุ่งน้ำแข็งในพริบตา','หนามน้ำแข็งพุ่งขึ้นสูงเท่าตึก แล้วแตกกระจายเป็นเกล็ดประกาย']},
 thunder:{fx:[['zapHit'],['lightningStrike','thunderclap'],['lightningStrike','thunderclap','sparkArc']],t:['ประกายไฟฟ้าแตกเปรี๊ยะ','สายฟ้าฟาดลงกลางลาน เสียงดังสนั่นไปสามหุบเขา','ฟ้าทั้งฟ้ากลายเป็นสีขาว สายฟ้านับร้อยเส้นฟาดลงพร้อมกัน']},
 sword:{fx:[['swordSlash'],['doubleSlash','heavyCleave'],['skyCleave','heavyCleave']],t:['รอยกระบี่บางเฉียบปรากฏบนพื้น','คมกระบี่ผ่ากลางลาน รอยตัดเรียบราวกระจก','แสงกระบี่ผ่าฟ้า ภูเขาไกลลิบขาดเป็นสองท่อน']},
 dark:{fx:[['shadowFlames'],['darkExplosion','shadowTendrils'],['darkExplosion','shadowTendrils','implosion']],t:['เงาดำไหลออกจากฝ่ามือ','หนวดเงาฉีกพื้นดิน ทุกอย่างถูกกลืนหาย','ความมืดยุบตัวเป็นจุดเดียว แล้วระเบิดออกจนแสงหายไปทั้งย่าน']},
 wind:{fx:[['leafStorm'],['tornado'],['tornado','leafStorm']],t:['ลมหมุนพัดใบไม้เป็นวง','พายุหมุนลูกใหญ่ยกทุกอย่างขึ้นฟ้า','พายุสามลูกหมุนชนกัน ฟ้าทั้งฟ้าหมุนตาม']},
 star:{fx:[['sunburst'],['starFall'],['starFall','meteor']],t:['แสงดาวกะพริบในมือ','ดาวตกโปรยลงมาเป็นสาย','ดวงดาวทั้งฟ้าดิ่งลงตามมือที่ชี้']},
 water:{fx:[['splash'],['geyser','waveCrash'],['waveCrash','geyser','whirlpool']],t:['หยดน้ำลอยขึ้นจากพื้น','น้ำพุ่งจากใต้ดินเป็นเสา คลื่นซัดสาด','คลื่นยักษ์สูงเท่าภูเขาก่อตัวขึ้นจากความว่างเปล่า']},
 palm:{fx:[['bluntHit'],['groundSlam'],['groundSlam','earthSpike','quake']],t:['รอยฝ่ามือประทับลงบนหิน','รอยฝ่ามือยักษ์จมลงในแผ่นดิน','แผ่นดินยุบเป็นรูปฝ่ามือขนาดเท่าหมู่บ้าน']},
 fist:{fx:[['bluntHit'],['groundSlam','critHit'],['groundSlam','quake','earthSpike']],t:['หมัดกระแทกอากาศดังปัง','แรงหมัดพุ่งเป็นคลื่น พื้นแตกเป็นใยแมงมุม','หมัดเดียว แผ่นดินยุบเป็นหลุม คลื่นกระแทกวิ่งไปถึงขอบฟ้า']},
 dragon:{fx:[['fireBreath'],['fireBreath','bigExplosion'],['fireBreath','bigExplosion','flamePillar']],t:['เงามังกรวาบขึ้นด้านหลัง','เงามังกรพุ่งออกคำรามกลืนทั้งลาน','มังกรพลังขนาดเท่าภูเขาม้วนตัวขึ้นฟ้า แล้วดิ่งลงมา']},
 light:{fx:[['sunburst'],['smite','holyPillar'],['holyPillar','smite','sunburst']],t:['แสงทองอุ่นๆ เปล่งจากตัว','เสาแสงศักดิ์สิทธิ์พุ่งลงจากฟ้า','แสงสว่างจนกลางคืนกลายเป็นกลางวันไปครู่หนึ่ง']},
 earth:{fx:[['earthSpike'],['earthSpike','groundSlam'],['earthSpike','quake','groundSlam']],t:['หินแตกออกเป็นแฉก','หนามหินพุ่งขึ้นจากพื้นเป็นแนวยาว','ภูเขาลูกเล็กดันตัวขึ้นจากใต้ดิน']},
 beam:{fx:[['manaBurst'],['plasmaExplosion'],['plasmaExplosion','implosion']],t:['ลำแสงพลังพุ่งออก','ลำแสงพลังระเบิดกลางลาน','ลำแสงพลังกลืนทุกอย่างเป็นสีขาว']}};
const ELR=[['fire',/เพลิง|ไฟ|อัคคี|ตะวัน|แดด|ลาวา|หงส์/],['ice',/น้ำแข็ง|หิมะ|เยือก|เกล็ด|หนาว/],['thunder',/อัสนี|สายฟ้า|ฟ้าผ่า|ฟ้าร้อง|ไฟฟ้า/],['dark',/มาร|ทมิฬ|อเวจี|เงา|มืด|โลหิต|พิษ/],['light',/ศักดิ์สิทธิ์|พุทธ|แสงทอง|เทพ|สวรรค์|ธรรม/],['wind',/ลม|พายุ|เมฆ|ตัวเบา/],['water',/น้ำ|คลื่น|สมุทร|ธารา/],['star',/ดารา|ดาว|จันทร์|ราตรี/],['earth',/ดิน|หิน|ภูผา|ภูเขา|ปฐพี/]];
const kindOf=n=>{n=String(n||'');for(const[k,re]of ELR)if(re.test(n))return k;const k=T_(()=>pxKind(n))||'beam';return EL[k]?k:'beam'};
const colOf=n=>T_(()=>pxEl(n))||['#ffc840','#fff4c0'];
const SPK={atk:'fist',def:'earth',agi:'wind',sup:'light'};
// แหล่งพลังที่ตัวละครมีจริง: วิชา (ทุกโลก) · วิญญาณยุทธ์ (โลกวิญญาณ) · หมัดเปล่า
function sources(w){const L=[];
 if(w==='soul'){(T_(()=>S.sv.sp)||[]).forEach((x,i)=>{const d=T_(()=>window._svSpOf(x.id));if(!d)return;const rv=x.rev&&d[6],nmS=rv?d[6][1]:d[2],ic=rv?d[6][0]:d[1],ty=rv?d[6][2]:d[3];const k=EL[kindOf(nmS)]&&kindOf(nmS)!=='beam'?kindOf(nmS):(SPK[ty]||'beam');
  L.push({k:'sp'+i,ic,n:'วิญญาณยุทธ์ '+nmS,kind:k,col:k==='beam'?['#b48cff','#f0e0ff']:colOf(nmS+(k==='light'?'แดด':'')),mul:1+(rv?.25:0)+(ty==='atk'?.12:0),d:rv?'วิวัฒน์แล้ว':''})})}
 (T_(()=>S.arts)||[]).filter(a=>a&&a.n).sort((x,y)=>(y.r||0)-(x.r||0)||(y.b||0)-(x.b||0)).slice(0,10).forEach((a,i)=>{L.push({k:'a'+i,ic:'📜',n:a.n,kind:kindOf(a.n),col:colOf(a.n),mul:.8+.12*(a.r||0)+.05*(a.lv|0)+.02*(a.star|0),d:a.tier||'',art:a})});
 if(w==='sky'){const n=(T_(()=>S.mw.sky.avs)||[]).length;if(n)L.unshift({k:'av',ic:'🧬',n:`ร่างแยก ${n} ร่างรวมพลัง`,kind:'star',col:['#7aa8ff','#e0ecff'],mul:1+Math.min(.5,n*.12),d:'ร่างแยกที่คุณมีจริง',av:n})}
 if(w==='mw'&&mwPow().cls==='human'){return[{k:'p',ic:'👊',n:'หมัดตรงเต็มแรง',kind:'fist',col:['#ffc840','#fff4c0'],mul:1,d:'มนุษย์'},{k:'k',ic:'🦵',n:'เตะก้านคอ',kind:'fist',col:['#ff9a4a','#fff0d0'],mul:1.08,d:'มนุษย์'},{k:'e',ic:'💪',n:'ศอกกลับ (มวยไทย)',kind:'fist',col:['#ff6a4a','#ffe0d0'],mul:1.05,d:'มนุษย์'}]}
 if(w==='mw'){const m=mwPow();if(m.aw)L.unshift({k:'aw',ic:m.aw==='sys'?'🟦':'✨',n:m.aw==='sys'?'พลังจากระบบ':'พลังที่ตื่นรู้',kind:CH(['thunder','beam','fire','ice']),col:m.aw==='sys'?['#38a8ff','#e0f4ff']:['#ffd34a','#fff6d0'],mul:1.1,d:'ฮันเตอร์'});if(m.qi>=1)L.unshift({k:'qi',ic:'🌀',n:'ลมปราณจากโลกเดิม',kind:'beam',col:['#8af0c0','#f0fff8'],mul:.85+Math.min(.6,m.qi*.05),d:'ระดับ '+m.qi})}
 L.push({k:'fist',ic:'👊',n:'หมัดเปล่า (เสริมพลัง)',kind:'fist',col:['#ffc840','#fff4c0'],mul:.7,d:''});
 return L}
const nm=()=>T_(()=>String(S.name||'').split(' ').pop())||'ผู้ไร้นาม';
// ---------- ข้อมูลรายโลก ----------
const RINGC=t=>t>=1e5?'#ff3a3a':t>=1e4?'#2a2a2a':t>=1e3?'#b46cff':t>=100?'#ffd34a':'#f0f0f0';
const RINGN=t=>t>=1e5?'แสนปี':t>=1e4?'หมื่นปี':t>=1e3?'พันปี':t>=100?'ร้อยปี':'สิบปี';
const WD={
soul:{ic:'⭕',n:'ปลดปล่อยวงแหวน',lb:'วงแหวนที่จะเผา',ac:'#b48cff',d:'เลือกวงแหวนที่จะ<b>เผา</b> · วงยิ่งเก่ายิ่งแรง · วงแสนปีแรง ×3 แต่<b>แตกร้าวถาวร</b> (เสียทักษะของวงนั้น) · สัตว์วิญญาณทั้งป่าจะแตกฮือ',
 opts(){const L=T_(()=>S.sv.rings)||[];const o=L.map((r,i)=>r&&!r.burnt?[String(i),`${'⭕'} วงที่ ${i+1} · ${RINGN(r.t)}`,(r.b?E(r.b):'')+(r.t>=1e5?' · แตกร้าวถาวร':'')]:null).filter(Boolean);return o.length?o:[['x','🌀 พลังวิญญาณล้วน','ยังไม่มีวงแหวน']]},
 mul(v){const r=T_(()=>S.sv.rings[+v]);if(!r)return .7;return r.t>=1e5?1.9:r.t>=1e4?1.35:r.t>=1e3?1.1:r.t>=100?.9:.75},
 unit:(p,v)=>{const r=T_(()=>S.sv.rings[+v]);return[F(((r&&r.t)||10)*(1+p*p*.4)),'ปีวงแหวนที่ถูกเผา']},
 amb:null,mark:['ป่าวงแหวนไหม้ของ','หลุมแสงม่วงของ','ทุ่งเถ้าวิญญาณของ']},
mw:{ic:'🏙️',n:'ปล่อยพลังกลางเมือง',lb:'ปล่อยที่ไหน',ac:'#38d6ff',d:'วัดเป็น<b>ริกเตอร์ + ยอดวิว</b> · โดนอัดคลิปแน่ ขึ้นเทรนด์ ขึ้นข่าว · ยิ่งดังยิ่งได้ชื่อเสียง แต่แรงเกินไปชายชุดดำจะมาเคาะประตู',
 opts:()=>mwPow().cls==='human'?[['park','🥊 ค่ายมวยตอนเย็น','กระสอบทราย + เครื่องวัดแรง'],['beach','🏖️ ชายหาด','ต่อยเป้าโชว์'],['bld','🧱 ตึกร้าง','ลองต่อยกำแพงอิฐ']]:[['park','🅿️ ลานจอดห้างตีสอง','คนน้อย กล้องเยอะ'],['bld','🏚️ ตึกร้างกลางเมือง','สายลองของชอบมา'],['beach','🏖️ ชายหาด','คนเพียบ'],['dam','🌊 หน้าเขื่อน','อย่าหาทำ']],
 mul:v=>v==='dam'?1.12:1,unit:p=>{const c=mwPow().cls;return c==='human'?[String(Math.round(180+p*160+R(0,40))),'กก. แรงกระแทก']:c==='super'?[(p*.45).toFixed(1),'ริกเตอร์']:[(1+p*.85).toFixed(1),'ริกเตอร์']},amb:null,mark:['ลานจอดปริศนาของ','หลุมไวรัลของ','จุดเช็คอินแห่ง']},
sky:{ic:'🌠',n:'ผ่าดาว',lb:'เป้าหมาย',ac:'#7aa8ff',d:'เล็งดาวเคราะห์น้อย ดาวหาง หรือดวงจันทร์ · วัดเป็น<b>เมกะตัน</b> · ถ้ามี<b>ร่างแยก</b> เลือกให้มารวมพลังได้ · เต็มที่ = ดวงจันทร์ขาดสองซีก ชื่อคุณขึ้นแผนที่ดาว',
 opts:()=>[['moon','🌕 ดวงจันทร์ดวงเล็ก','ใหญ่มาก'],['cmt','🌠 ดาวหาง','หางยาว'],['ast','☄️ ดาวเคราะห์น้อย','เล็ก']],tog:'🧬 เรียกร่างแยก 3 ร่างมารวมพลัง',
 mul:v=>v==='moon'?1.05:1,unit:p=>[F(Math.pow(10,p*.9)*R(1,3)),'เมกะตัน'],amb:'wStars',mark:['รอยผ่า','ดวงจันทร์ครึ่งซีกของ','วงแหวนฝุ่นของ']},
fog:{ic:'🌉',n:'ฉีกหมอก',lb:'ฉีกหมอกตรงไหน',ac:'#9fe0c8',d:'พลัง<b>ไม่ทำลายอะไรเลย แต่เปิดความจริง</b> · ยิ่งแรงยิ่งเห็นสิ่งที่หมอกซ่อน ได้เบาะแสแต่<b>ใจสั่นคลอน</b> · เต็มที่ = ทั้งเมืองเห็นท้องฟ้าจริง 3 วินาที',
 opts:()=>[['old','🏮 ย่านเมืองเก่า','มีคนหายบ่อย'],['port','⚓ ท่าเรือร้าง','เสียงระฆังตอนตีสาม'],['top','🗼 ยอดหอนาฬิกา','มองเห็นทั้งเมือง']],
 mul:()=>1,unit:p=>[Math.min(100,Math.round(p*10+R(0,6))),'% ของหมอกที่ถูกฉีก'],amb:'wFog',mark:['ช่องท้องฟ้าจริงของ','ซอยที่หมอกไม่กลับของ','หอนาฬิกาถอยหลังของ']},
loop:{ic:'🔁',n:'ระเบิดแล้วย้อนเวลา',lb:'เป้าหมาย',ac:'#ffd36a',d:'ทำลายทั้งเมืองได้เลย <b>เดี๋ยวก็ย้อน</b> · แต่บางอย่าง<b>ติดข้ามลูป</b> รอยร้าวที่ไม่หาย คนที่จำได้ · ระเบิดสะสมครบ 3 ครั้ง = เส้นทางลับ',
 opts:()=>[['city','🏯 กลางเมือง','ไม่ต้องยั้ง'],['tower','🗼 หอระฆัง','ศูนย์กลางลูป?'],['self','🪞 ตัวเองในลูปก่อน','อย่าหาทำ']],
 mul:v=>v==='self'?1.15:1,unit:p=>[F(Math.pow(p+1,3.2)*R(40,80)),'หลังคาเรือนพัง (ก่อนย้อน)'],amb:null,mark:['รอยร้าวข้ามลูปของ']}
};
// ---------- พลังพื้นฐาน (0..10) ----------
function base(){const pw=Math.max(1,+(T_(()=>typeof total==='function'?total():S.power))||1);const a=Math.max(0,(S.age|0)-10);
 const st=Math.min(3.2,Math.log10(pw)/2.2)+Math.min(1,a/40);return Math.max(.8,st)}
function level(ch,crit,mul){return Math.max(0,Math.min(10,(1.2+ch*6.6)*(.55+base()*.22)*mul*(crit?1.5:1)))}
// ---------- ฉาก ----------
const W=384,H=240,K=1.5;let cv=null,g=null,ST=null,T=0,raf=0;
const P=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x|0,y|0,Math.max(1,w|0),Math.max(1,h|0))};
const sky=(a,b)=>{const q=g.createLinearGradient(0,0,0,H);q.addColorStop(0,a);q.addColorStop(1,b);g.fillStyle=q;g.fillRect(0,0,W,H)};
const ground=(y,a,b)=>{const q=g.createLinearGradient(0,y,0,H);q.addColorStop(0,a);q.addColorStop(1,b);g.fillStyle=q;g.fillRect(0,y,W,H-y)};
const stars=(n,s)=>{for(let i=0;i<n;i++){const x=(i*97.3+s)%W,y=(i*53.7)%(H*.6);g.globalAlpha=.3+.6*(.5+.5*Math.sin(T*2+i));P(x,y,1,1,'#fff')}g.globalAlpha=1};
const mtn=(b,a,c,s)=>{g.fillStyle=c;g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=4)g.lineTo(x,b-Math.abs(Math.sin(x*.013+s)*a+Math.sin(x*.031+s*2)*a*.4));g.lineTo(W,H);g.fill()};
function hero(x,y,c,ch){const bob=ch?Math.sin(T*30)*ch*.8:0;P(x-3+bob,y-14,6,6,'#f0c8a0');P(x-4+bob,y-8,8,9,c);P(x-4,y+1,3,5,'#222');P(x+1,y+1,3,5,'#222');P(x-4+bob,y-15,8,3,'#222');if(ch>.2){P(x+4+bob,y-7,5,2,'#f0c8a0')}}
function crater(s,col,glow){g.save();g.globalAlpha=s.a==null?1:s.a;g.fillStyle=col;g.beginPath();g.ellipse(s.x,s.y,s.r,s.r*.28,0,0,7);g.fill();
 if(glow){g.globalAlpha*=.3+.15*Math.sin(T*3);g.fillStyle=glow;g.beginPath();g.ellipse(s.x,s.y,s.r*.68,s.r*.17,0,0,7);g.fill()}
 g.globalAlpha=s.a==null?1:s.a;g.strokeStyle='#000';g.lineWidth=1;for(let i=0;i<7;i++){const an=i/7*7+s.r;g.beginPath();g.moveTo(s.x+Math.cos(an)*s.r*.9,s.y+Math.sin(an)*s.r*.25);g.lineTo(s.x+Math.cos(an)*s.r*1.6,s.y+Math.sin(an)*s.r*.45);g.stroke()}g.restore()}
const DRAW={
soul(){sky('#1a0f33','#3a1f5a');stars(40,0);mtn(150,40,'#2a1a48',1);mtn(175,26,'#1d2a3a',3);ground(178,'#1f3a2a','#0d1a12');
 for(let i=0;i<26;i++){const x=(i*15+7)%W,h=20+(i*13)%18;if(ST.sc.some(s=>Math.abs(s.x-x)<s.r*1.2))continue;P(x,178-h,3,h,'#2a1a10');P(x-5,178-h-8,13,10,'#2d6a3a')}
 ST.sc.forEach(s=>crater(s,'#120a1c','#b46cff'));const hx=192,hy=190,L=(T_(()=>S.sv.rings)||[]).slice(0,9);
 L.forEach((r,k)=>{if(!r)return;const on=ST.v===String(k)&&ST.ph==='chg';g.strokeStyle=RINGC(r.t);g.lineWidth=on?3:2;g.globalAlpha=r.burnt?.25:on?.6+.4*Math.sin(T*20):.85;g.beginPath();g.ellipse(hx,hy-4-k*4-(on?ST.ch*6:0),10+k*4,3+k*.8,0,0,7);g.stroke()});g.globalAlpha=1;hero(hx,hy,'#5a3aa8',ST.ph==='chg'?ST.ch:0)},
mw(){sky('#0a1020','#1c2a48');stars(25,3);for(let i=0;i<14;i++){const x=i*28,h=40+(i*37)%70;P(x,180-h,24,h,'#121a2c');for(let yy=180-h+6;yy<176;yy+=8)for(let xx=x+3;xx<x+22;xx+=6)if(((xx*yy+i)%5)<2)P(xx,yy,3,4,'#ffd86a88')}
 ground(180,'#2a2e38','#15171d');for(let x=10;x<W;x+=40)P(x,200,22,2,'#e8e8e8aa');if(ST.obj){const o=ST.obj,dm=ST.dmg||0;if(o==='wall'){P(212,150,40,46,'#6a6a72');for(let y=152;y<196;y+=6)for(let x=(y%12?212:218);x<250;x+=12)P(x,y,11,5,'#7e7e88');if(dm>0){g.strokeStyle='#111';g.lineWidth=1;for(let i=0;i<4+dm*3;i++){g.beginPath();g.moveTo(222,172);g.lineTo(222+Math.cos(i*1.7)*(6+dm*6),172+Math.sin(i*1.7)*(5+dm*5));g.stroke()}if(dm>=2.6){P(216,164,14,16,'#0a0a10')}}}else{P(216,140,14,4,'#555');P(221,128,2,12,'#888');P(214,144,18,34,dm>=2.4?'#3a2a1a':'#8a2a2a');if(dm>=2.4){for(let i=0;i<6;i++)P(212+i*4,178+((i*7)%5),3,2,'#c8b89a')}}}ST.sc.forEach(s=>crater(s,'#0c0c0c','#ff7a2a'));
 for(let i=0;i<5;i++){const x=30+i*70+Math.sin(T+i)*3;P(x,186,6,4,'#333');P(x+1,183,2,3,'#ccc');if(Math.sin(T*6+i)>.9)P(x-2,180,10,3,'#fff')}hero(192,196,'#2a2a2a',ST.ph==='chg'?ST.ch:0);
 if(ST.views){g.fillStyle='#ff3b5c';g.font='10px sans-serif';g.fillText('🔴 LIVE  '+F(ST.views)+' views',8,232)}},
sky(){sky('#02030a','#0a1030');stars(70,T*4);const mx=280,my=70,sp=ST.split||0;g.fillStyle='#d8dce8';g.beginPath();g.arc(mx-sp,my,34,Math.PI*.5,Math.PI*1.5);g.fill();g.beginPath();g.arc(mx+sp,my,34,-Math.PI*.5,Math.PI*.5);g.fill();
 if(sp){g.globalAlpha=.7;P(mx-sp,my-34,sp*2,68,'#ff9a4a');g.globalAlpha=1}g.fillStyle='#b8bcc8';[[-12,-8,6],[8,10,8],[14,-14,4]].forEach(([a,b,r])=>{g.beginPath();g.arc(mx+a+(a<0?-sp:sp),my+b,r,0,7);g.fill()});
 ST.sc.forEach(s=>{g.fillStyle='#8a8fa0aa';g.beginPath();g.arc(s.x,s.y,s.r*.5,0,7);g.fill()});P(0,200,W,40,'#1a1e2e');for(let x=0;x<W;x+=16)P(x,200,8,2,'#3a6aff66');
 const c=ST.ph==='chg'?ST.ch:0;hero(120,212,'#3a5aff',c);if(ST.tog)[[-20,'#7ad0ff'],[-38,'#c8c8d8'],[-56,'#b48cff'],[-74,'#ffd36a']].slice(0,Math.max(1,Math.min(4,((ST.SR[ST.src]||{}).av)|0))).forEach(([dx,cl],i)=>{g.globalAlpha=.55+.2*Math.sin(T*3+i);hero(120+dx,212,cl,c)});g.globalAlpha=1},
fog(){sky('#1c2422','#2e3a36');for(let i=0;i<12;i++){const x=i*33,h=50+(i*29)%60;P(x,185-h,28,h,'#1a1f1e');P(x+10,185-h-10,8,10,'#1a1f1e')}P(300,80,14,105,'#151918');P(296,70,22,12,'#151918');ground(185,'#232a28','#121614');
 const ho=ST.sc;for(let y=0;y<H;y+=4)for(let x=0;x<W;x+=4){let a=.55+.25*Math.sin(x*.05+T+y*.03);for(const h of ho){const d=Math.hypot(x-h.x,y-h.y);if(d<h.r)a*=Math.max(0,(d/h.r)**3)}if(ST.clear>0)a*=1-ST.clear;g.fillStyle=`rgba(196,212,206,${Math.min(.9,a)})`;g.fillRect(x,y,4,4)}
 for(const h of ho)for(let i=0;i<Math.min(8,h.r/8);i++){const ex=h.x+Math.cos(i*2.4)*h.r*.5,ey=h.y+Math.sin(i*2.4)*h.r*.35;if(Math.sin(T*1.5+i)>-.3){P(ex,ey,3,2,'#ff2a2a');P(ex+6,ey,3,2,'#ff2a2a')}}
 if(ST.clear>0){g.globalAlpha=ST.clear;const q=g.createLinearGradient(0,0,0,120);q.addColorStop(0,'#4aa8ff');q.addColorStop(1,'#bfe3ff00');g.fillStyle=q;g.fillRect(0,0,W,120);g.globalAlpha=1}hero(192,198,'#3a4a44',ST.ph==='chg'?ST.ch:0)},
loop(){const k=ST.lp|0;sky('#1a1408','#3a2a10');g.globalAlpha=Math.min(.3,k*.06);P(0,0,W,H,'#ffd36a');g.globalAlpha=1;g.strokeStyle='#ffd36a66';g.lineWidth=1;g.beginPath();g.arc(330,50,24,0,7);g.stroke();
 g.save();g.translate(330,50);g.rotate((ST.rew?6:-1)*T*(1+k*.4));P(-1,-20,2,20,'#ffd36a');g.restore();
 if(!ST.gone){for(let i=0;i<12;i++){const x=i*32,h=30+(i*23)%40;P(x+2,180-h,28,h,'#2a1e10');g.fillStyle='#5a2a10';g.beginPath();g.moveTo(x-2,180-h);g.lineTo(x+16,180-h-12);g.lineTo(x+34,180-h);g.fill()}P(176,96,16,84,'#2a1e10');P(172,88,24,10,'#5a2a10')}
 ground(180,'#4a3a1a','#2a1e0a');if(ST.gone)ST.sc.forEach(s=>crater(s,'#120c04','#ff9a3a'));
 for(let j=0;j<k;j++){g.strokeStyle='#ffd36a';g.globalAlpha=.55+.3*Math.sin(T*2+j);g.lineWidth=1.5;g.beginPath();let x=80+j*70,y=150+((j*37)%30);g.moveTo(x,y);for(let i=0;i<9;i++){x+=((i*j*7+3)%11)-2;y+=((i*5+j*3)%11)-5;g.lineTo(x,y)}g.stroke()}g.globalAlpha=1;
 if(k>=3){P(150,200,20,10,'#000');P(158,196,4,4,'#ffd36a')}if(k>=1){P(230,192,5,8,'#e07aa0');P(230,187,5,5,'#f0c8a0')}hero(120,196,'#8a6a2a',ST.ph==='chg'?ST.ch:0)}
};
const HERO={soul:[192,182],mw:[192,188],sky:[120,204],fog:[192,190],loop:[120,188]};
const TGT={soul:()=>[R(70,320),R(184,200)],mw:()=>T_(()=>mwPow().cls)==='human'?[222,172]:[R(70,320),R(196,214)],sky:()=>[ST.v==='moon'?280:ST.v==='cmt'?R(200,340):R(60,340),ST.v==='moon'?70:R(40,110)],fog:()=>[ST.v==='top'?300:ST.v==='port'?80:200,R(90,140)],loop:()=>[ST.v==='tower'?184:R(70,320),R(150,190)]};
// ---------- pixelfx ----------
const pfOk=()=>{try{return !!(window.PFXON&&PFXON()&&window.PFX)}catch(e){return false}};
const ramp=c=>T_(()=>PFX.ramp(c));
function fx(n,x,y,o,life,pal){if(!pfOk()||!PFX.M[n]||!cv)return;try{const op=Object.assign({x:x*K,y:y*K,seed:(Math.random()*99)|0},o||{});const sc0=ST.SR&&ST.SR[ST.src];const p0=pal===0?null:pal||ramp(sc0?sc0.col:[WD[ST.w].ac,'#ffffff']);if(p0)op.palette=p0;PFX.fxAt(cv,n,op,{life:life||PFX.M[n].meta.duration})}catch(e){}}
const FIRE=()=>ramp(['#ff5a1a','#ffe26b']);
const tierOf=p=>p<2?0:p<4?1:p<6?2:p<8?3:p<9.5?4:5;
// สำรองเมื่อยังไม่มี pixelfx: วงกระแทก + เศษ
let PT=[];function boomFallback(x,y,p,c){for(let i=0;i<30+p*14;i++){const a=R(0,7),v=R(.6,2+p*.4);PT.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.7-R(0,1.5),l:R(30,70),c:CH([c,'#fff','#ffcf6a'])})}PT.push({ring:1,x,y,t:0,l:40,p,c})}
function drawPT(){for(let i=PT.length-1;i>=0;i--){const q=PT[i];if(q.ring){q.t++;g.strokeStyle=q.c;g.globalAlpha=Math.max(0,1-q.t/q.l);g.lineWidth=2+q.p*.6;g.beginPath();g.ellipse(q.x,q.y,q.t*(1+q.p*.5),q.t*(1+q.p*.5)*.35,0,0,7);g.stroke();if(q.t>=q.l)PT.splice(i,1);continue}
 q.x+=q.vx;q.y+=q.vy;q.vy+=.06;q.l--;g.globalAlpha=Math.max(0,Math.min(1,q.l/30));P(q.x,q.y,2,2,q.c);if(q.l<=0)PT.splice(i,1)}g.globalAlpha=1}
const HU=()=>ST&&ST.w==='mw'&&mwPow().cls==='human';
function fxBeam(hx,hy,tx,ty,p){const w=ST.w;if(!pfOk()||HU())return;
 if(w==='sky'){fx('skyCleave',0,0,{x0:hx*K,y0:(hy-10)*K,x1:tx*K,y1:ty*K,w:3+p*1.2},1.6);return}
 if(w==='fog'){fx('ripples',hx,hy+4,{},2);fx('sunburst',hx,hy-16,{},1.2);return}
 const kd=(ST.SR&&ST.SR[ST.src]||{}).kind;if(kd==='thunder'){fx('sparkArc',hx,hy-10,{},1);return}if(kd==='sword'){fx('swordSlash',hx+10,hy-6,{flip:tx<hx},1)}
 const d=Math.abs(tx-hx)*K;fx('qiWave',hx+(tx<hx?-4:4),hy-6,{dist:d,travel:d,flip:tx<hx},1.4)}
function fxImpact(x,y,p){const t=tierOf(p),w=ST.w,src=ST.SR&&ST.SR[ST.src];
 if(!pfOk()){boomFallback(x,y,p,src?src.col[0]:WD[w].ac);return}
 if(src&&w!=='fog'&&!HU()){const e=EL[src.kind]||EL.beam;(e.fx[t<=1?0:t<=3?1:2]||[]).forEach((n,i)=>fx(n,x+(i?R(-16,16):0),y,{},PFX.M[n]?PFX.M[n].meta.duration+.5:3))}
 if(w==='soul'){fx(['manaBurst','manaBurst','implosion','darkExplosion','darkExplosion','darkExplosion'][t],x,y,{},4);if(t>=2)fx('groundSlam',x,y+4,{reach:40+p*10},3.2,ramp(['#6a2cc0','#e0c0ff']));if(t>=4)fx('runeCircle',x,y,{},4);if(t>=5)fx('blackHole',x,y-26,{},4.5)}
 else if(w==='mw'&&mwPow().cls==='human'){fx('critHit',x,y-6,{},1.2,0);fx('impactFrame',192,120,{},.25,0);if(p>=1.5)fx('bluntHit',x+6,y-4,{},1,0);if(p>=2.4)fx('dirtExplosion',x,y,{},2.4,0)}
 else if(w==='mw'&&mwPow().cls==='super'){fx('groundSlam',x,y,{reach:40+p*12},3.2,0);fx('critHit',x,y-8,{},1.2,0);if(p>=4)fx('dirtExplosion',x,y,{},3,0);if(p>=5.5)fx('quake',x,y,{reach:50+p*10},3,0);fx('impactFrame',192,120,{},.3,0)}
 else if(w==='mw'){fx(['smallExplosion','smallExplosion','bigExplosion','bigExplosion','bigExplosion','nuke'][t],x,y,{},t>=5?9:6.5,FIRE());if(t>=1)fx('dirtExplosion',x,y,{},3,0);if(t>=3)fx('quake',x,y,{reach:60+p*10},3.1,0);if(t>=4)fx('impactFrame',192,120,{},.3,0)}
 else if(w==='sky'){fx('plasmaExplosion',x,y,{},1.7);if(t>=2)fx('implosion',x,y,{},1.65);if(t>=3)fx('starFall',x,y+60,{},2.5);if(t>=5)fx('impactFrame',192,120,{},.3,0)}
 else if(w==='fog'){fx('portal',x,y+20,{width:30+p*8,height:40+p*8},3.8);if(t>=2)fx('shadowTendrils',x,y+30,{},3,ramp(['#1a2a26','#9fe0c8']));if(t>=4)fx('eclipse',x,y-10,{},4.2)}
 else if(w==='loop'){fx(t>=3?'nuke':'bigExplosion',x,y,{},t>=3?9:7,FIRE());fx('dirtExplosion',x,y,{},3,0);if(t>=2)fx('quake',x,y,{reach:80+p*10},3.1,0)}
 try{PFX.fxShake(cv,2+p*1.3,.3+p*.09)}catch(e){}}
// ---------- ผลลัพธ์ (มีผลกับตัวละคร) ----------
function see(v){return{park:.35,bld:.45,beach:.9,dam:.6,old:.5,port:.3,top:.7,city:.9,tower:.6,self:.2,moon:.8,cmt:.5,ast:.3}[v]||.4}
function resolve(p,crit){const w=ST.w,v=ST.v,L=[],lv=Math.round(p),add=(t,c)=>L.push({t,c:c||''});
 const src=ST.SR&&ST.SR[ST.src];if(src&&!HU()){const e=EL[src.kind]||EL.beam,fl=e.t[p<4?0:p<7.5?1:2];add(`${src.ic} คุณปล่อย<b>《${E(src.n)}》</b>${p>=8?'เต็มกำลัง':p>=5?'อย่างแรง':''} — ${fl}`,p>=7?'my':'');if(src.art&&(src.art.rl||0)<20&&Math.random()<.25){src.art.rl=(src.art.rl||0)+1;src.art.b=Math.round(src.art.b*1.03);add(`💡 ได้ปล่อยเต็มที่แบบนี้ทำให้เข้าใจ《${E(src.n)}》ลึกขึ้นอีกนิด (พลังวิชา +3%)`,'my')}}
 if(crit)add('⚡ คริติคอล! ปล่อยตรงจังหวะลมหายใจพอดี พลัง ×1.5','my');
 const fmBase=Math.round((4+p*p*1.4)*(1+see(v)));let fame=0;
 if(w==='soul'){const r=T_(()=>S.sv.rings[+v]);add(`⭕ ${r?`วงแหวนที่ ${+v+1} (${RINGN(r.t)})`:'พลังวิญญาณ'}ลุกเป็นไฟ หมุนเร็วจนเกิดเสียงหวีด แล้วระเบิดออก — ${p>=8?'ป่าวิญญาณทั้งผืนราบเป็นหน้ากลอง':p>=5?'ต้นไม้พันปีล้มเป็นวงรัศมีครึ่งลี้':p>=2?'หินผาแตกเป็นร่องลึก':'ใบไม้ร่วงเป็นวง'}`);
  add(p>=4?'🦌 สัตว์วิญญาณนับร้อยแตกฮือหนีออกจากป่าพร้อมกัน ฝูงนกปิดฟ้ามืดไปครู่หนึ่ง':'🐇 กระต่ายวิญญาณสองตัวมองคุณแบบไม่พอใจ');
  if(r&&r.t>=1e5){r.burnt=1;if(r.sk){r.skOld=r.sk;r.sk=''}add('💔 วงแหวนแสนปีแตกร้าวเป็นเส้นเลือดแสง — ทักษะของวงนี้หายไปตลอดกาล','bad')}
  if(p>=7&&Math.random()<.5){add('🐍 พื้นดินสั่น… อสรพิษมรกตแสนปีโผล่จากใต้ดิน มันมองคุณ แล้วก้มหัวลงช้าๆ — “ข้ารอผู้ที่ทำแบบนี้ได้มาสามหมื่นปีแล้ว” · ชื่อเสียง +'+F(fmBase),'my');fame+=fmBase}fame+=fmBase}
 else if(w==='mw'&&mwPow().cls!=='city'){const c=mwPow().cls,hu=c==='human',views=Math.round(Math.pow(p+1,hu?3:3.6)*R(200,600)*({park:.4,bld:.7,beach:2,dam:1.2}[v]||1));ST.views=views;
  if(hu){const kg=Math.round(180+p*160+R(0,40));add(ST.obj==='wall'?(p>=2.6?`🧱 กำแพงอิฐแตกเป็นรู กำปั้นทะลุไปอีกฝั่ง — แรงกระแทก ${kg} กก. มือคุณเลือดซิบ`:p>=1.5?`🧱 กำแพงอิฐร้าวเป็นใยแมงมุม ฝุ่นปูนร่วงกราว (${kg} กก.)`:`🧱 ปัง! กำแพงไม่เป็นไร แต่ข้อนิ้วคุณบวมแดง (${kg} กก.)`):(p>=2.4?`🥊 กระสอบทรายขาดกลาง ทรายทะลักเต็มพื้น — แรงกระแทก ${kg} กก.`:p>=1.5?`🥊 กระสอบทรายแกว่งจนโซ่ดังเอี๊ยด เครื่องวัดขึ้น ${kg} กก.`:`🥊 กระสอบทรายแกว่งนิดหน่อย เครื่องวัดขึ้น ${kg} กก.`));
   add(`📱 มีคนถ่ายคลิปไว้ ยอดวิว <b>${F(views)}</b> · คอมเมนต์: “${CH(['พี่ต่อยหนักจริง','ถ้าโดนหมัดนี้คงหลับยาว','ค่ายมวยไหนครับ','มืออาชีพชัดๆ'])}”`,'my');fame+=Math.round(Math.log10(views+10)*1.5);
   if(p>=2.6&&Math.random()<.5){T_(()=>{S.hp=Math.max(1,(S.hp||1)-Math.round((S.maxHp||100)*.05))});add('🩹 ข้อมือเคล็ด ต้องพันผ้าไปสองสัปดาห์ · พลังชีวิตลดนิดหน่อย','bad')}
   if(p>=2.2)add(CH(['🥊 โปรโมเตอร์มวยใต้ดินทักมาขอเบอร์','🏋️ ค่ายมวยแถวบ้านชวนไปขึ้นเวที','🕶️ มีคนในวงการใต้ดินจับตามองคุณ']),'my')}
  else{add(`💥 ${p>=5.5?'กำแพงตึกทั้งแผงพังลงมา รถสามคันปลิวไปคนละทิศ':p>=4?'คุณต่อยกำแพงคอนกรีตทะลุ แรงอัดอากาศพัดกระจกแตกทั้งแถว':'รถเก๋งที่จอดอยู่ยุบเข้าไปทั้งคัน สัญญาณกันขโมยดังลั่น'}`);
   add(`📳 เครื่องวัดแผ่นดินไหวแถวนั้นกระตุก ${(p*.45).toFixed(1)} ริกเตอร์ · คลิปไวรัล ยอดวิว <b>${F(views)}</b> · ติดเทรนด์ <b>#${CH(['มนุษย์เหนือมนุษย์','ต่อยทะลุกำแพง','ไม่ใช่CGI'])}</b>`,'my');fame+=Math.round(Math.log10(views+10)*p*1.6);
   if(p>=5){add('🚓 ตำรวจกั้นพื้นที่ ข่าวเช้ารายงาน “แรงระเบิดปริศนา” · มีคนส่งข้อความว่า “เราเห็นนะ”','bad');T_(()=>{S.karma-=2})}}}
 else if(w==='mw'){const views=Math.round(Math.pow(p+1,4.3)*R(300,900)*({park:.4,bld:.7,beach:2,dam:1.2}[v]||1));ST.views=views;
  add(`📳 กรมอุตุฯ ตรวจพบแรงสั่นสะเทือน <b>${(1+p*.85).toFixed(1)} ริกเตอร์</b>${p>=6?' — ศูนย์กลางไม่ใช่รอยเลื่อน':''}`);
  add(`📱 คลิปถูกอัปโหลด ${Math.max(2,Math.round(p*6))} มุม · ยอดวิว <b>${F(views)}</b> ใน 3 ชั่วโมง · ติดเทรนด์ <b>#${CH(['คนเรืองแสง','ใครทำลานจอดพัง','มนุษย์ริกเตอร์','ไม่ใช่CGI','ฟ้าผ่าแนวนอน'])}</b>`,'my');fame+=Math.round(Math.log10(views+10)*p*2.2);
  if(p>=4)add('📺 รายการข่าวเชิญผู้เชี่ยวชาญมาวิเคราะห์ “ฟ้าผ่าแนวนอน” · คอมเมนต์: “พี่คนนี้ตีกอล์ฟด้วยเหรอ”');
  if(p>=7){add('🕶️ ตีสาม มีคนเคาะประตู ชายชุดดำสองคนยื่นนามบัตรที่ไม่มีชื่อหน่วยงาน — “เราอยากคุยเรื่องงานครับ”','bad');T_(()=>{S.karma-=3})}
  if(v==='dam'&&p>=5){const f=Math.round((S.money||0)*.12);S.money=Math.max(0,(S.money||0)-f);add(`💸 เขื่อนร้าว ต้องจ่ายค่าเสียหาย ${T_(()=>fmtM(f))||F(f)}`,'bad')}}
 else if(w==='sky'){if(src&&src.av)add(`🧬 ร่างแยกทั้ง ${src.av} ร่างยืนเรียงหลังคุณ ยื่นมือมาที่ไหล่ — พลัง ${src.av+1} ร่างหลอมเป็นลำแสงเดียว`);
  add(v==='moon'?(p>=8?'🌕 ลำแสงพุ่งทะลุดวงจันทร์ เส้นแสงค่อยๆ ขยาย… ดวงจันทร์แยกเป็นสองซีกอย่างช้าๆ ราวกับผลไม้ถูกผ่า':'🌕 ผิวดวงจันทร์มีหลุมใหม่ขนาดเท่าทวีป มองเห็นได้ด้วยตาเปล่าจากทุกดาว'):v==='cmt'?'🌠 หางดาวหางขาดกลาง กลายเป็นดาวหางสองดวงบินแยกทาง':'☄️ ดาวเคราะห์น้อยแตกเป็นฝุ่นประกาย กลายเป็นวงแหวนใหม่รอบดาว');
  fame+=fmBase;if(p>=8){const h=Math.round((S.maxHp||100)*.12);S.hp=Math.max(1,(S.hp||1)-h);add(`🚨 เรือรบสามลำโผล่จากวาร์ป ยิงเตือนใส่คุณ — “ท่านเพิ่งทำลายดาวที่ขึ้นทะเบียนไว้” พลังชีวิต −${h}`,'bad')}}
 else if(w==='fog'){const sn=Math.round(p*3+R(0,4));T_(()=>joy(-sn));const F0=S.mw.fog;F0.relClue=F0.relClue||[];
  add(`🌫️ หมอกถูกฉีกเป็นรูกลม ${p>=5?'ใหญ่เท่าย่านทั้งย่าน':'เท่าลานบ้าน'} — ด้านหลังไม่ใช่เมืองที่คุณรู้จัก`);
  add(CH(['👁️ ตึกทุกหลังมีหน้าต่างเพิ่มขึ้นหนึ่งบาน และทุกบานมีคนยืนมองออกมา','🕰️ หอนาฬิกาเดินถอยหลัง เข็มชี้ที่วันที่คุณเกิด','🪢 มีเชือกสีแดงโยงจากหลังคาทุกบ้านไปรวมที่ท่าเรือ','📜 ป้ายถนนทุกป้ายเขียนชื่อคุณ สะกดผิดคนละแบบ']));
  const clue=CH(['ผู้ว่าการเมืองไม่มีเงา','หมอกหายใจเข้าออกทุก 11 นาที','ท่าเรือนี้ไม่เคยมีเรือมาเทียบ','คนที่หายไปไม่ได้หาย แค่อยู่อีกชั้นหนึ่ง','หอนาฬิกาตีไม่ครบสิบสองครั้งมาสามสิบปีแล้ว']);if(!F0.relClue.includes(clue))F0.relClue.push(clue);
  add(`🔍 ได้เบาะแส: “${clue}” <span class="tag2">(สะสม ${F0.relClue.length})</span>`,'my');add(`🫀 ใจสั่นคลอน ความสุข −${sn}${p>=8?' · มีบางอย่างในหมอกหันมามองคุณ… และมันจำหน้าคุณได้แล้ว':''}`,'bad');
  if(p>=9)add('🌌 สามวินาที — หมอกทั้งเมืองหายไป ผู้คนนับแสนเงยหน้าเห็นท้องฟ้าจริงเป็นครั้งแรกในชีวิต แล้วหมอกก็กลับมา เมืองไม่เหมือนเดิมอีกเลย','my');fame+=Math.round(fmBase*.6)}
 else if(w==='loop'){let n=0;try{n=(LS.get('murim_rlloop',0)|0)+1;LS.set('murim_rlloop',n)}catch(e){}ST.lp=n;
  add(v==='self'?'🪞 เงาของคุณจากลูปก่อนยิ้มให้ แล้วระเบิดพร้อมกับคุณ — ทุกอย่างขาวโพลน':`💥 ${v==='tower'?'หอระฆังแตกกระจาย เสียงระฆังสุดท้ายดังค้างอยู่ในอากาศไม่ยอมหาย':'เมืองทั้งเมืองกลายเป็นหลุม'} — ไม่มีใครรอด รวมถึงคุณ`);
  add('⏪ …แล้วคุณก็ตื่นขึ้นบนเตียงเดิม เช้าวันเดิม เสียงไก่ขันเดิม');
  if(n>=2)add(CH(['👧 เด็กหญิงขายดอกไม้เดินมาหยุดตรงหน้า “พี่คือคนที่ทำให้ฟ้าเป็นสีขาวใช่ไหม”','🧱 กำแพงเมืองมีรอยร้าวยาว — รอยเดียวกับแรงระเบิดเมื่อวาน ทั้งที่วันนี้ยังไม่เกิด','🔔 ระฆังหอดังช้ากว่าเดิมหนึ่งจังหวะ ทุกลูปหลังจากนี้']),'my');
  if(n===3){add('🗝️ ใต้รอยร้าวที่ติดข้ามลูป มีบันไดหินทอดลงไปในความมืด — <b>เส้นทางลับเปิดแล้ว</b> (ปัญญา +6 · โชค +4)','my');T_(()=>{S.int=(S.int||0)+6;S.luck=(S.luck||0)+4});T_(()=>keyAdd('ระเบิดข้ามลูปจนเปิดเส้นทางลับ'))}
  fame+=Math.round(fmBase*.3)}
 if(w==='loop')fame=0;
 const seen=w==='loop'?true:Math.random()<Math.min(.95,see(v)*(.5+p*.06)+(p>=7?.2:0));
 if(fame>0&&(seen||w==='mw')){S.fame=(S.fame||0)+fame;add(`👀 ข่าวแพร่ไปทั่ว ชื่อเสียง +${F(fame)}`,'my')}else if(!seen&&w!=='loop')add('🤫 ไม่มีใครเห็น เป็นความลับระหว่างคุณกับฟ้าดิน');
 if(p>=6&&w!=='loop'&&!(w==='mw'&&mwPow().cls!=='city')){const nmS=CH(WD[w].mark)+nm();T_(()=>{S.scars=(S.scars||[]).filter(x=>x.n!==nmS);S.scars.unshift({n:nmS,sc:Math.min(10,lv),a:S.age});S.scars=S.scars.slice(0,12)});add(`🗺️ ผู้คนเรียกที่นั่นว่า <b>「${E(nmS)}」</b> นับแต่นั้น`,'my')}
 T_(()=>joy(3+Math.round(p*.8)));S.flags=S.flags||{};S.flags.relN=(S.flags.relN||0)+1;S.flags.relMax=Math.max(S.flags.relMax==null?-1:S.flags.relMax,lv);
 if(p>=9.5)T_(()=>keyAdd(`ปลดปล่อยพลังจนโลกจดจำ (${WD[w].n})`));
 return L}
// ---------- หน้าจอ ----------
const css=`#rwOv{position:fixed;inset:0;z-index:9000;background:radial-gradient(circle at 50% 30%,#141a2c,#05060b);display:flex;flex-direction:column;align-items:center;overflow-y:auto;color:#eef2fa;font-family:inherit;animation:rwIn .25s}
@keyframes rwIn{from{opacity:0}to{opacity:1}}#rwOv .hd{width:100%;max-width:880px;display:flex;align-items:center;gap:8px;padding:10px 12px 6px}#rwOv .hd b{font-size:18px;color:#ffe9a8;flex:1}#rwOv .x{width:38px;height:38px;border-radius:10px;border:1px solid #ffffff2a;background:#ffffff0c;color:#fff;font-size:17px}
#rwSt{position:relative;width:min(880px,calc(100vw - 16px));border-radius:16px;overflow:hidden;border:1px solid #ffffff1c;flex:none;background:#000}#rwSt canvas{display:block;image-rendering:pixelated}
#rwSt .fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:3}#rwSt .big{position:absolute;left:0;right:0;top:34%;text-align:center;opacity:0;transform:scale(.6);transition:.35s;z-index:4;pointer-events:none}#rwSt .big.on{opacity:1;transform:scale(1)}
#rwSt .big b{display:block;font-size:clamp(30px,8vw,54px);line-height:1;color:#fff;text-shadow:0 0 22px var(--ac),0 2px 0 #000}#rwSt .big span{font-size:14px;color:#ffe9a8;text-shadow:0 1px 3px #000}
#rwSt .lv{position:absolute;right:10px;top:8px;font-size:12px;z-index:4;text-shadow:0 1px 3px #000}
#rwPn{width:min(880px,calc(100vw - 16px));padding:10px 4px 24px}#rwPn .d{font-size:13px;color:#a9b4cc;line-height:1.55;margin:0 0 8px}#rwPn .ops{display:flex;flex-wrap:wrap;gap:6px}
#rwPn .op{font:inherit;font-size:13px;padding:7px 10px;border-radius:10px;border:1.5px solid #ffffff1c;background:#ffffff08;color:#e8eef8;text-align:left}#rwPn .op small{display:block;font-size:11px;color:#8d97ad}#rwPn .op.on{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 20%,transparent)}
#rwPn .src{display:flex;align-items:center;gap:8px;margin:0 0 6px;font-size:13px}#rwPn .src select{flex:1;min-width:0;font:inherit;font-size:13.5px;padding:7px;border-radius:10px;background:#141a2b;color:#fff;border:1px solid #ffffff2a}#rwPn .sel{font-size:12.5px;padding:6px 10px;border-radius:10px;background:color-mix(in srgb,var(--c) 16%,transparent);border-left:3px solid var(--c);margin-bottom:6px}#rwPn .lbl{font-size:12.5px;color:#8d97ad;margin:6px 0 5px}
#rwCg{margin:12px auto 2px;width:128px;height:128px;border-radius:50%;position:relative;display:grid;place-items:center;user-select:none;-webkit-user-select:none;touch-action:none;cursor:pointer}#rwCg svg{position:absolute;inset:0;transform:rotate(-90deg)}
#rwCg i{width:92px;height:92px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff,var(--ac) 45%,#000 100%);display:grid;place-items:center;font-style:normal;font-size:15px;color:#fff;text-shadow:0 1px 4px #000;box-shadow:0 0 calc(10px + var(--g,0)*44px) var(--ac)}
#rwPn .hint{text-align:center;font-size:12.5px;color:#a9b4cc}#rwPn .lg p{margin:0 0 6px;padding:7px 10px;border-radius:10px;background:#ffffff07;border-left:3px solid var(--ac);font-size:13.5px;line-height:1.6}#rwPn .lg p.my{border-color:#ffd36a;background:#ffd36a12}#rwPn .lg p.bad{border-color:#ff6b6b}
#rwPn .bt{display:flex;gap:6px;margin-top:8px}#rwPn .bt button{flex:1;font:inherit;font-size:14px;padding:10px;border-radius:12px;border:1px solid #ffffff22;background:#ffffff0c;color:#fff}#rwPn .cr{font-size:11px;color:#6d7790;text-align:center;margin-top:10px}
body.rwShake{animation:rwSh .7s cubic-bezier(.36,.07,.19,.97) both}@keyframes rwSh{10%,90%{transform:translate(-3px,2px)}20%,80%{transform:translate(6px,-4px)}30%,50%,70%{transform:translate(-10px,6px)}40%,60%{transform:translate(10px,-6px)}}`;
const st0=document.createElement('style');st0.textContent=css;document.head.appendChild(st0);
let HOLD=0,t0=0,zA=0,zB=0;const CIRC=2*Math.PI*58;
function frame(){if(!ST||!cv||!cv.isConnected){raf=0;return}T+=1/60;g.setTransform(K,0,0,K,0,0);try{DRAW[ST.w]()}catch(e){}if(ST.ph==='chg'&&!HU()){const[hx,hy]=HERO[ST.w];g.globalAlpha=.25+.2*Math.sin(T*18);g.fillStyle=WD[ST.w].ac;g.beginPath();g.arc(hx,hy-8,6+ST.ch*16,0,7);g.fill();g.globalAlpha=1}drawPT();raf=requestAnimationFrame(frame)}
window.relwOpen=function(){const w=wk();if(w==='mw'){const c=mwPow().cls;WD.mw.n=c==='human'?'ทดสอบแรงหมัด':c==='super'?'ปลดปล่อยพลังเหนือมนุษย์':'ปล่อยพลังกลางเมือง';WD.mw.d=c==='human'?'คุณเป็น<b>มนุษย์ที่ฝึกมา</b> ไม่ใช่ยอดมนุษย์ · วัดเป็น<b>กก. แรงกระแทก</b> · ต่อยกระสอบหรือกำแพงอิฐ เจ็บมือได้จริง · คลิปอาจเข้าตาค่ายมวยหรือวงการใต้ดิน':c==='super'?'พลัง<b>เหนือมนุษย์</b> · ต่อยกำแพงทะลุ รถยุบ ตึกร้าว · วัดเป็น<b>ริกเตอร์</b> (ยังไม่ถึงขั้นถล่มเมือง) · ตำรวจจะเริ่มสนใจ':'พลังระดับ<b>ถล่มเมือง</b> (ระบบ/ตื่นพลังขั้นสูง/ข้ามมิติ) · วัดเป็น<b>ริกเตอร์ + ยอดวิว</b> · แรงเกินไปชายชุดดำจะมาเคาะประตู'}if(!NEW.has(w))return false;if(w==='mw'&&!mwPow().ok){toast('🙂 คุณเป็นคนธรรมดา ยังไม่มีพลังพิเศษให้ปลดปล่อย — ต้องตื่นพลังหรือได้วิชาก่อน');return true}const why=T_(()=>relCan());if(why){toast(why);return true}if(T_(()=>choice._cur)){toast('ตัดสินใจเรื่องที่ค้างอยู่ก่อน');return true}
 try{closeM()}catch(e){}T_(()=>PFXON&&PFXON());const D=WD[w],o=D.opts();const SR=sources(w);ST={w,v:o[0][0],tog:SR[0]&&SR[0].av?1:0,src:0,SR,ph:'set',ch:0,sc:[],views:0,lp:T_(()=>LS.get('murim_rlloop',0))|0};
 const ov=document.createElement('div');ov.id='rwOv';ov.style.setProperty('--ac',D.ac);
 const cw=Math.min(880,innerWidth-16),chh=Math.round(cw*240/384);
 ov.innerHTML=`<div class="hd"><b>${D.ic} ${D.n}</b><button class="x" onclick="relwClose()">✕</button></div><div id="rwSt" style="height:${chh}px"><canvas width="576" height="360" style="width:${cw}px;height:${chh}px"></canvas><div class="fl"></div><div class="lv"></div><div class="big"><b></b><span></span></div></div><div id="rwPn"></div>`;
 document.body.appendChild(ov);cv=ov.querySelector('canvas');g=cv.getContext('2d');const amb=()=>{if(D.amb&&pfOk())[100,290].forEach((x,i)=>fx(D.amb,x,w==='fog'?220:200,{seed:i+3},1e6,w==='fog'?0:undefined))};setTimeout(amb,60);setTimeout(()=>{if(!pfOk())return;if(!ST||ST.amb)return;ST.amb=1;try{PFX.clear(cv)}catch(e){}amb()},1500);
 if(w==='mw'&&mwPow().cls==='human')ST.obj='bag';panel();if(!raf)frame();return true};
window.relwClose=function(){const ov=$('rwOv');if(ov){try{if(window.PFX&&cv)PFX.clear(cv)}catch(e){}ov.remove()}cv=null;ST=null;HOLD=0;try{render()}catch(e){}};
function panel(){const D=WD[ST.w],o=D.opts(),pn=$('rwPn');
 const SR=ST.SR||[],cur=SR[ST.src]||SR[0];pn.innerHTML=`<p class="d">${D.d}</p><div class="src"><span>⚡ พลังที่ใช้</span><select id="rwSrc">${SR.map((x,i)=>`<option value="${i}" ${i===ST.src?'selected':''}>${x.ic} ${E(x.n)}${x.d?' · '+E(x.d):''}</option>`).join('')}</select></div>${cur?`<div class="sel" style="--c:${cur.col[0]}">${cur.ic} <b>${E(cur.n)}</b> · ธาตุ${{fire:'ไฟ',ice:'น้ำแข็ง',thunder:'สายฟ้า',sword:'กระบี่',dark:'มืด',wind:'ลม',star:'ดารา',water:'น้ำ',palm:'ฝ่ามือ',fist:'หมัด',dragon:'มังกร',light:'แสง',earth:'ดิน',beam:'พลังบริสุทธิ์'}[cur.kind]} · กำลัง ×${cur.mul.toFixed(2)}</div>`:''}<div class="lbl">${D.lb||'เลือก'}</div><div class="ops">${o.map(x=>`<button class="op ${ST.v===x[0]?'on':''}" data-v="${x[0]}">${x[1]}<small>${x[2]}</small></button>`).join('')}</div>
 <div id="rwCg"><svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="58" fill="none" stroke="#ffffff14" stroke-width="8"/><circle id="rwZ" cx="64" cy="64" r="58" fill="none" stroke="#ffd36a" stroke-width="8" stroke-dasharray="0 999" opacity=".35"/><circle id="rwA" cx="64" cy="64" r="58" fill="none" stroke="var(--ac)" stroke-width="8" stroke-linecap="round" stroke-dasharray="0 999"/></svg><i>กดค้าง</i></div>
 <div class="hint">กดค้างเพื่อชาร์จ · ปล่อยนิ้วตอนวงทองกระพริบ = ⚡ คริติคอล ×1.5 · ปีละครั้ง</div><div class="cr">เอฟเฟกต์: pixelfx (MIT · patch-gg · Hugo Duprez)</div>`;
 pn.querySelectorAll('.op[data-v]').forEach(b=>b.onclick=()=>{ST.v=b.dataset.v;if(ST.w==='mw'&&mwPow().cls==='human')ST.obj=ST.v==='bld'?'wall':'bag';panel()});const sl=$('rwSrc');if(sl)sl.onchange=()=>{ST.src=+sl.value;const q=ST.SR[ST.src];ST.tog=q&&q.av?1:0;panel()};const tb=pn.querySelector('.op[data-t]');if(tb)tb.onclick=()=>{ST.tog=ST.tog?0:1;panel()};
 const cg=$('rwCg');cg.addEventListener('pointerdown',down);}
function zone(){zA=R(.62,.8);zB=zA+.1;const z=$('rwZ');z.setAttribute('stroke-dasharray',`${CIRC*(zB-zA)} ${CIRC}`);z.setAttribute('stroke-dashoffset',-CIRC*zA)}
function loopC(){if(!HOLD||!ST)return;ST.ch=Math.min(1,(performance.now()-t0)/1800);$('rwA').setAttribute('stroke-dasharray',`${CIRC*ST.ch} ${CIRC}`);const inZ=ST.ch>=zA&&ST.ch<=zB;$('rwZ').setAttribute('opacity',inZ?.6+.4*Math.sin(performance.now()/40):.35);
 const i=$('rwCg').querySelector('i');i.style.setProperty('--g',ST.ch);i.textContent=ST.ch>=1?'เต็ม!':Math.round(ST.ch*100)+'%';$('rwSt').style.transform=`translate(${R(-1,1)*ST.ch*3}px,${R(-1,1)*ST.ch*3}px)`;
 if(ST.ch>.5&&!ST.c2){ST.c2=1;const[hx,hy]=HERO[ST.w];if(!HU())fx('chargeUp',hx,hy+8,{},2.7)}requestAnimationFrame(loopC)}
function down(e){e.preventDefault();if(!ST||ST.ph!=='set')return;HOLD=1;ST.ph='chg';ST.ch=0;ST.c2=0;t0=performance.now();zone();const[hx,hy]=HERO[ST.w];if(!HU()){fx('qiAura',hx,hy+6,{power:.5},2.4);fx('spellCharge',hx+2,hy+4,{},2)}addEventListener('pointerup',up,{once:true});addEventListener('pointercancel',up,{once:true});loopC()}
function up(){if(!HOLD||!ST)return;HOLD=0;$('rwSt').style.transform='';if(ST.ch<.08){ST.ph='set';const i=$('rwCg').querySelector('i');i.textContent='กดค้าง';return}
 const crit=ST.ch>=zA&&ST.ch<=zB,sm=(ST.SR[ST.src]||{}).mul||1,mc=ST.w==='mw'?mwPow():null,p=mc&&mc.cls==='human'?Math.min(3.2,3.2*ST.ch*(.45+Math.min(.55,(mc.pw||0)/160))*(crit?1.25:1)*sm):mc&&mc.cls==='super'?Math.min(6.6,3.3+3.3*ST.ch*(.5+Math.min(.5,(mc.pw||0)/600))*(crit?1.25:1)*sm):Math.min(10,level(ST.ch,crit,WD[ST.w].mul(ST.v,0)*sm));ST.ph='boom';S.relY=S.age;boom(p,crit)}
function boom(p,crit){const w=ST.w,D=WD[w],[hx,hy]=HERO[w],[tx,ty]=TGT[w]();$('rwPn').innerHTML='<div class="lg"></div>';fxBeam(hx,hy,tx,ty,p);
 setTimeout(()=>{if(!ST)return;fxImpact(tx,ty,p);const fl=$('rwSt').querySelector('.fl');fl.style.transition='none';fl.style.opacity=Math.min(.95,.15+p*.09);requestAnimationFrame(()=>{fl.style.transition='opacity .8s';fl.style.opacity=0});
  if(p>=8){document.body.classList.remove('rwShake');void document.body.offsetWidth;document.body.classList.add('rwShake');setTimeout(()=>document.body.classList.remove('rwShake'),800)}
  if(w==='mw'&&mwPow().cls==='human')ST.dmg=p;const r=w==='mw'&&mwPow().cls!=='city'?(mwPow().cls==='human'?0:4+p*2.2):6+p*p*.9;if(w==='sky'){if(ST.v==='moon'&&p>=8)(function sp(){ST.split=(ST.split||0)+.4;if(ST&&ST.split<16)setTimeout(sp,40)})();ST.sc.push({x:tx+R(-14,14),y:ty+R(-14,14),r:6+p*1.5})}
  else if(w==='fog'){ST.sc.push({x:tx,y:ty,r:20+p*9});if(p>=9){ST.clear=1;setTimeout(function f(){if(!ST)return;ST.clear=Math.max(0,ST.clear-.02);if(ST.clear>0)setTimeout(f,60)},3000)}}
  else if(w==='loop'){setTimeout(()=>{if(ST){ST.gone=1;ST.sc.push({x:tx,y:ty+10,r:40+p*6})}},700)}else if(r>0)ST.sc.push({x:tx,y:ty,r});
  const L=resolve(p,crit),[n,u]=D.unit(p,ST.v),bg=$('rwSt').querySelector('.big');bg.querySelector('b').textContent=n;bg.querySelector('span').textContent=u+(crit?' · ⚡ คริติคอล!':'');bg.classList.add('on');
  $('rwSt').querySelector('.lv').innerHTML=`ระดับทำลาย <b style="font-size:16px;color:${D.ac}">${Math.round(p)}/10</b>`;setTimeout(()=>{if(bg)bg.classList.remove('on')},2800);
  const lg=$('rwPn').querySelector('.lg');let i=0;(function nx(){if(!ST)return;if(i>=L.length){done(L,p);return}const x=L[i++],e=document.createElement('p');e.className=x.c;e.innerHTML=x.t;lg.appendChild(e);setTimeout(nx,560)})()},280)}
function done(L,p){const pn=$('rwPn');if(!pn)return;
 try{L.forEach(x=>{if(!/^⚡ คริติคอล/.test(x.t))log(`${WD[ST.w].ic} ${x.t}`,x.c==='my'?(p>=8?'myth':'epic'):x.c==='bad'?'bad':'good',false)})}catch(e){}
 window._rwLast={w:ST.w,p,u:WD[ST.w].unit(p,ST.v)};
 pn.insertAdjacentHTML('beforeend',`<div class="bt">${ST.w==='loop'?'<button onclick="relwRewind()">⏪ ย้อนเวลา</button>':''}<button onclick="relwShare()">📤 ส่งเข้าแชท</button><button onclick="relwClose()">✔️ ปิด</button></div>`);try{render()}catch(e){}}
window.relwRewind=function(){if(!ST||!cv)return;ST.rew=1;fx('implosion',192,150,{},1.7,ramp(['#ffd36a','#ffffff']));fx('magicCircle',120,200,{},3.9,ramp(['#ffd36a','#ffffff']));
 const fl=$('rwSt').querySelector('.fl');fl.style.background='#ffd36a';fl.style.transition='none';fl.style.opacity=.9;requestAnimationFrame(()=>{fl.style.transition='opacity 1.4s';fl.style.opacity=0});
 setTimeout(()=>{if(!ST)return;ST.gone=0;ST.sc=[];ST.rew=0;try{PFX.clear(cv)}catch(e){}const lg=$('rwPn').querySelector('.lg');if(lg)lg.insertAdjacentHTML('beforeend',`<p class="my">⏪ ทุกอย่างกลับเหมือนเดิม… ยกเว้นรอยร้าวสีทอง ${ST.lp} รอยที่ยังอยู่</p>`)},900)};
window.relwShare=function(){const L=window._rwLast;if(!L)return;if(!T_(()=>onlineOK))return toast('ต้องออนไลน์ก่อน');try{chatSend('share',`${WD[L.w].ic} ${S.name} ${WD[L.w].n} — ${L.u[0]} ${L.u[1]} · ระดับทำลาย ${Math.round(L.p)}/10`);toast('ส่งเข้าแชทแล้ว')}catch(e){toast('ส่งไม่สำเร็จ')}};
// ---------- ห่อปุ่มเดิม: โลกใหม่ใช้ฉากนี้ ----------
{const _ro=window.relOpen;if(typeof _ro==='function'){const w2=function(){if(NEW.has(wk())&&window.relwOpen())return;return _ro.apply(this,arguments)};try{relOpen=w2}catch(e){}window.relOpen=w2}}
// ---------- ยุทธภพ/เซียน/เทพ/สัตว์อสูร: ระเบิด pixelfx ตอนพลังกระทบ ----------
const FIRED=new WeakMap();
if(typeof pxShock==='function'){const _sh=pxShock;const w3=function(c,tx,ty,p,col){try{const L=window._rlLast,h=c&&c.canvas;if(L&&h&&h.isConnected&&Date.now()-L.t<20000&&pfOk()){
  if(p>=0&&p<.5&&!FIRED.get(h)){FIRED.set(h,1);const sc=L.sc|0,z=h.width/(PXW*3),X=tx*3*z,Y=ty*3*z,pal=T_(()=>PFX.ramp(Array.isArray(col)?col:[col,'#ffffff'])),fr=T_(()=>PFX.ramp(['#ff5a1a','#ffe26b'])),wd=L.w,bst=L.beast;
   const A=(n,o,life,pl)=>{try{if(PFX.M[n])PFX.fxAt(h,n,Object.assign({x:X,y:Y,seed:(Math.random()*99)|0},o||{}),{life:life||PFX.M[n].meta.duration})}catch(e){}};
   {let kd=String((L.spec&&L.spec.k&&L.spec.k[0])||L.fxk||'beam');kd=kd==='slashdown'||kd==='sweep'?'sword':kd==='roar'?'wind':kd==='tail'?'earth':kd==='claw'?'sword':kd==='breath'?'fire':kd==='holy'||kd==='buddha'?'light':kd==='demon'?'dark':kd;const e=EL[kd]||EL.beam;if(sc>=1)(e.fx[sc<=3?0:sc<=6?1:2]||[]).forEach((n,i)=>A(n,{palette:pal,x:X+(i?(Math.random()-.5)*30*z:0)}))}
   if(sc>=2)A('dirtExplosion',{palette:undefined});if(sc>=3)A('groundSlam',{reach:30+sc*10,palette:pal});
   if(sc>=5)A(wd==='g'?'holyPillar':wd==='x'?'plasmaExplosion':'bigExplosion',{palette:wd==='m'&&!bst?fr:pal},6);
   if(sc>=6)A('quake',{reach:60+sc*12,palette:fr});if(sc>=7&&!bst)A('earthSpike',{palette:pal});if(sc>=7&&bst)A('flamePillar',{palette:fr,height:60+sc*8});
   if(sc>=9)A(wd==='g'?'sunburst':'nuke',{palette:wd==='g'?pal:fr},wd==='g'?3:9);if(sc>=8)T_(()=>PFX.fxShake(h,4+sc,.6))}
  if(p<0)FIRED.delete(h)}}catch(e){}return _sh.apply(this,arguments)};try{pxShock=w3}catch(e){}window.pxShock=w3}
// สัตว์อสูร: อาณาเขตตามแรงคำราม
if(typeof relResolve==='function'){const _rr=relResolve;const w4=function(p,a,k,sc){const out=_rr.apply(this,arguments);try{if(typeof S!=='undefined'&&S&&S.beastMode&&!S.beastMode.human&&sc>=2){const km=Math.round((sc*sc*.35+.2)*10)/10;out.push(()=>{const old=+S.beastMode.terr||0;S.beastMode.terr=Math.max(old,km);
  log(`🐺 สัตว์ในรัศมี ${km} กม. หมอบราบ${km>old?` — <b>อาณาเขตขยายเป็น ${km} กม.</b>`:''}${sc>=5?' · หมู่บ้านมนุษย์ตีระฆังเตือนภัย':''}${sc>=8?' · ภูเขาไฟที่หลับมาพันปีพ่นควันตอบเสียงคำราม ชาวบ้านแต่งนิทาน “อสูรปลุกภูเขา”':''}`,sc>=8?'myth':'epic');
  if(sc>=5)T_(()=>bountyAdd(.05*sc,'อสูรประกาศอาณาเขต'))})}}catch(e){}return out};try{relResolve=w4}catch(e){}window.relResolve=w4}
if(typeof relCan==='function'){const _rc=relCan;const w5=function(){const r=_rc.apply(this,arguments);if(r)return r;try{if(wk()==='mw'&&!mwPow().ok)return'คนธรรมดายังไม่มีพลังพิเศษ'}catch(e){}return r};try{relCan=w5}catch(e){}window.relCan=w5}
setInterval(()=>{try{if(wk()==='mw'&&!mwPow().ok)document.querySelectorAll('#focus .fcx').forEach(b=>{if(/ปลดปล่อย/.test(b.textContent))b.remove()})}catch(e){}},1500);
window._relw={WD,wk,level,mwPow};
})()}catch(e){console.error('mod-relw',e)}
try{wReady('relw')}catch(e){}
