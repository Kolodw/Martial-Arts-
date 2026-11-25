// ============================================================
// /w/cast.js 👤 จักรวาลร่วม เฟส 1 — ผู้เล่นจริงรับบทในชีวิตของคุณ (ทุกโลก)
//  1) จบชีวิต → ส่งตัวละครเข้าคลังนักแสดงของโลกนั้น (api castadd) พร้อมนิสัยที่อ่านจากการเล่น (tr)
//     s=ใจบุญ d=มืด f=มีชื่อเสียง o=อายุยืน y=ตายเร็ว l=มีคู่ m=มีศิษย์
//  2) ระหว่างชีวิต ชื่อผู้เล่นจริงโผล่มาในบทต่างๆ 16 แบบ (อาจารย์ คู่ปรับ พ่อค้าของลึกลับ ขอทาน หมอดู ผู้มาจากอีกโลก …)
//     แต่ละบทมีหลายฉากเปิด · ผลลัพธ์สุ่มโดยเอนตามนิสัยจริงของเจ้าของชื่อ · หลายบทย้อนกลับมาอีกในอีกหลายปี (ภาคต่อ 10 แบบ)
//  3) "👤 ไม่ให้ใช้ชื่อฉัน" ที่หน้าตอนจบ (api castoff/caston) · LS murim_castOff
//  เฟส 2 📬 เสียงสะท้อน: ผลที่เราทำกับนักแสดง → ส่งกลับถึงเจ้าของชื่อ (api castecho/echoes) · เจ้าของเปิดอ่านเป็นการ์ด
//         แล้วกด 🔥 ตามไปล้างแค้น / 🎁 ตามไปตอบแทน → ชีวิตหน้าเจอคนนั้น และผลส่งกลับไปหาเขาอีกทอด (ปิงปองข้ามจักรวาล)
//         เสียงสะท้อนใหม่ = แรงศรัทธาตอนเริ่มชีวิต (ชื่อเสียง/ปัญญา) · ฉายาตามจำนวนชีวิตที่ชื่อเราไปโผล่
//  ข้อมูลในเซฟ: S._cs {n, y, used[], cb[]} · ออฟไลน์ = ไม่มีเหตุการณ์ (ไม่สร้างชื่อปลอม)
// ============================================================
try{(()=>{
const $=id=>document.getElementById(id);
const E=t=>{try{return esc(String(t))}catch(e){return String(t).replace(/[<>&"]/g,'')}};
const rp=a=>a[Math.floor(Math.random()*a.length)],rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),P=p=>Math.random()<p;
const on=()=>{try{return typeof onlineOK==='undefined'||!!onlineOK}catch(e){return true}};
const OFF=()=>{try{return !!LS.get('murim_castOff',0)}catch(e){return false}};
const WK=()=>{try{if(!S)return'';if(S.beastMode)return'beast';if(S.mw){if(S.mw.fog)return'fog';if(S.mw.sky)return'sky';return'mw'}if(S.ch==='soul')return'soul';if(S.ch==='regress')return'loop';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'};
const WNM={murim:'ยุทธภพ',xian:'โลกเซียน',god:'แดนเทพ',soul:'จิตวิญญาณยุทธ์',loop:'ผู้ย้อนกาล',mw:'ยุคปัจจุบัน',sky:'ทะลุฟ้าดารา',fog:'นครม่านหมอก',beast:'ป่าอสูร'};
// คำศัพท์ประจำโลก: สำนัก · ที่พัก · ตลาด · วิชา · ยอดคน · หัวหน้า · ผู้คุมกฎ · อาวุธ · บ้าน · เงิน
const VOC={
 murim:['สำนัก','โรงเตี๊ยมริมทาง','ตลาดเมืองหลวง','วิชายุทธ์','ยอดฝีมือ','เจ้าสำนัก','ทางการ','กระบี่','หมู่บ้าน','ตำลึง'],
 xian:['นิกาย','ศาลาพักผู้บำเพ็ญ','ตลาดผู้บำเพ็ญ','วิชาบำเพ็ญ','ผู้บำเพ็ญขั้นสูง','เจ้านิกาย','ผู้คุมกฎนิกาย','กระบี่บิน','หุบเขาวิญญาณ','หินวิญญาณ'],
 god:['วังสวรรค์','ศาลาเมฆ','ตลาดแดนเทพ','เคล็ดเทพ','เทพผู้ยิ่งใหญ่','เจ้าวัง','ทัพสวรรค์','ทวนเทพ','ตำหนักเมฆ','หยก'],
 soul:['สถาบันวิญญาณยุทธ์','โรงเตี๊ยมชายแดน','ตลาดเมืองจักรวรรดิ','วิญญาณยุทธ์','ปรมาจารย์วิญญาณ','อธิการสถาบัน','ทหารจักรวรรดิ','ค้อนวิญญาณ','หมู่บ้านชาวนา','เหรียญวิญญาณ'],
 loop:['สำนัก','โรงเตี๊ยมริมทาง','ตลาดเมืองหลวง','วิชายุทธ์','ยอดฝีมือ','เจ้าสำนัก','ทางการ','กระบี่','หมู่บ้าน','ตำลึง'],
 mw:['บริษัท','คาเฟ่หัวมุม','ห้างกลางเมือง','สกิล','คนดังในวงการ','ซีอีโอ','ตำรวจ','ไม้เบสบอล','ซอยบ้าน','บาท'],
 sky:['กิลด์นักล่า','บาร์ใต้กำแพง','ตลาดมืดชั้นนอก','ยีนพลัง','นักล่าระดับ S','ผู้บัญชาการกำแพง','หน่วยรักษากำแพง','ปืนพลังงาน','แฟลตชั้นนอก','เครดิต'],
 fog:['สมาคมลับ','ผับใต้โคมแก๊ส','ตลาดริมท่าเรือ','พิธีกรรม','ผู้ถือตราลับ','ประธานสมาคม','ตำรวจนครบาล','ไม้เท้าเงิน','ตรอกแคบ','ปอนด์'],
 beast:['ฝูง','ลำธารกลางป่า','ทุ่งล่า','พลังอสูร','ราชาอสูร','จ่าฝูง','พราน','เขี้ยว','ถ้ำ','ผลไม้วิญญาณ']};
const V=()=>{const a=VOC[WK()]||VOC.murim;return{sect:a[0],inn:a[1],mkt:a[2],art:a[3],big:a[4],boss:a[5],law:a[6],wpn:a[7],home:a[8],cur:a[9]}};

// ---------------------------------------------------------------- ผลลัพธ์ (ใช้ได้ทุกโลก)
const cashV=v=>Math.round(v*(S&&S.mw?400:1));
const fN=v=>{try{return fmt(v)}catch(e){return String(v)}};
function fx(o){const out=[];const n=(k,v,l)=>{if(!v)return;S[k]=Math.max(0,(+S[k]||0)+v);out.push(`${l} ${v>0?'+':''}${fN(v)}`)};
 if(o.pw){const g=Math.max(1,Math.round((+S.power||0)*Math.abs(o.pw)))*(o.pw<0?-1:1);S.power=Math.max(1,(+S.power||0)+g);try{const K=S.mw&&S.mw.sky&&window._sky&&_sky.SK();if(K){K.tb=Math.max(0,(K.tb||0)+o.pw);_sky.sync&&_sky.sync()}}catch(e){}out.push(`พลังพื้นฐาน ${o.pw>0?'+':''}${Math.round(o.pw*100)}%`)}
 n('int',o.int,'ปัญญา');n('karma',o.karma,'บุญ');n('fame',o.fame,'ชื่อเสียง');
 if(o.money){const v=cashV(o.money);const had=+S.money||0;S.money=Math.max(0,had+v);out.push(`เงิน ${v>0?'+':'−'}${fN(Math.abs(v>0?v:Math.min(had,-v)))}`)}
 if(o.hp){const d=Math.round((+S.maxHp||100)*o.hp);S.hp=Math.max(1,Math.min(+S.maxHp||100,(+S.hp||0)+d));out.push(o.hp>0?'พลังชีวิตฟื้น':`พลังชีวิต −${Math.round(-o.hp*100)}%`)}
 if(o.mhp){S.maxHp=Math.round((+S.maxHp||100)*(1+o.mhp));S.hp=Math.min(S.maxHp,S.hp);out.push(`พลังชีวิตสูงสุด +${Math.round(o.mhp*100)}%`)}
 if(o.life){if(S.mw){S.mw.wsL=(S.mw.wsL|0)+o.life;S.mw.end=(S.mw.end||80)+o.life}else S.lifespan=(+S.lifespan||70)+o.life;out.push(`อายุขัย ${o.life>0?'+':''}${o.life} ปี`)}
 return out.join(' · ')}
let CAP=null;
const say=(t,c,o)=>{if(CAP)CAP.push([t,c||'']);const r=o?fx(o):'';try{log(t+(r?`<br><span class="tag2">${r}</span>`:''),c||'',true);render&&render()}catch(e){}};

// ---------------------------------------------------------------- คลังนักแสดง (ดึงจากเซิร์ฟเวอร์ 15 นาที/ครั้ง)
let C=null,Ct=0,Cb=0;
function load(){if(Cb||!on()||(C&&Date.now()-Ct<900000))return;Cb=1;
 try{api('cast',{}).then(j=>{Cb=0;if(j&&j.c){C=j.c;Ct=Date.now()}}).catch(()=>{Cb=0;Ct=Date.now()-600000})}catch(e){Cb=0}}
const has=(x,t)=>String(x.tr||'').includes(t);
function who(cross){if(!C)return null;const w=WK(),U=(S._cs&&S._cs.used)||[],ok=x=>x&&x.n&&x.n!==S.name&&!U.includes(x.n);
 let L=(C[w]||[]).filter(ok);const X=Object.keys(C).filter(k=>k!==w).reduce((a,k)=>a.concat((C[k]||[]).filter(ok)),[]);
 if(cross)L=X;else if(!L.length||P(.2))L=L.concat(X);
 return L.length?rp(L):null}
const NM=x=>`<b>${E(x.n)}</b>${x.e?`「${E(x.e)}」`:''}`;
const TAG=(x,more)=>`<br><span class="csTag">👤 ผู้เล่นจริง · ${WNM[x.w]||'อีกโลก'}${more?' · '+more:''}</span>`;
const lean=(x,good,bad)=>(has(x,'s')?good:0)+(has(x,'d')?-bad:0);/* ใจบุญเอนดี มืดเอนร้าย */

// ---------------------------------------------------------------- บท (16 แบบ) — ret: [หัวข้อ, ข้อความ, ตัวเลือก[[ข้อความ, คำอธิบาย, f]]]
const later=(k,x,a,b,d)=>{S._cs.cb.push({k,i:x.i,n:x.n,e:x.e,w:x.w,tr:x.tr,y:(S.age|0)+rnd(a,b),d:d||0})};
const R={
 mentor:{c:()=>S.age>=8&&S.age<=50,go(x,v){const op=rp([`ชายชราท่าทางสงบนั่งดูคุณฝึกอยู่นาน ก่อนจะลุกขึ้นแนะนำตัวว่าชื่อ ${NM(x)}`,`ระหว่างหลบฝนใน${v.inn} คนแปลกหน้าชื่อ ${NM(x)} ทักว่าท่าเดินของคุณ "ผิดไปครึ่งก้าว"`,`${NM(x)} ซึ่งใครๆ ใน${v.mkt}เรียกว่า${v.big} เดินตรงมาหาคุณกลางฝูงชน`]);
  return['🧓 ผู้ชี้ทางแปลกหน้า',`${op} แล้วบอกว่าเห็นแววบางอย่างในตัวคุณ`,[
   ['🙇 ขอเป็นศิษย์','ฝากตัวเต็มตัว · ผลขึ้นกับว่าเขาเป็นคนแบบไหน',()=>{if(P(.62+lean(x,.2,.35))){say(`📖 ${NM(x)} สอน${v.art}ให้คุณอย่างไม่ปิดบัง ทุกเช้าเขาจะพูดซ้ำว่า "ลูกศิษย์ที่ดีต้องเก่งกว่าอาจารย์"`,'myth',{pw:.18,int:4});later('mentor_back',x,8,20)}else{say(`🕸️ หลายเดือนผ่านไป คุณเพิ่งรู้ว่า${NM(x)}ใช้คุณเป็นแค่เด็กส่งของในงานสกปรกของเขา`,'bad',{money:-60,hp:-.2,karma:-3});later('mentor_betray',x,3,10)}}],
   ['💬 ขอคำชี้แนะแค่ครั้งเดียว','ปลอดภัย',()=>say(`💬 ${NM(x)} พูดประโยคเดียว แต่คุณคิดตามมันไปอีกสามปี`,'good',{int:6})],
   ['🚶 ขอบคุณแล้วเดินจากมา','',()=>{if(P(.4))later('regret',x,10,25);say(`🚶 คุณเดินจากมา ${NM(x)} ไม่ได้รั้งไว้ แค่มองตามหลังนานผิดปกติ`,'')}]]]}},
 rival:{c:()=>S.age>=12,go(x,v){
  return['⚔️ คำท้าต่อหน้าผู้คน',rp([`${NM(x)} ยืนขวางทางคุณกลาง${v.mkt} แล้วประกาศเสียงดังว่าจะพิสูจน์ว่าใครเก่งกว่า`,`ใบท้ารบถูกตอกไว้หน้าบ้านคุณด้วย${v.wpn} ลงชื่อ ${NM(x)}`,`ทุกคนใน${v.inn}เงียบกริบเมื่อ${NM(x)}เดินเข้ามาแล้วชี้หน้าคุณ`]),[
   ['⚔️ รับคำท้า',`ชนะ ~${has(x,'f')?45:55}%`,()=>{if(P(has(x,'f')?.45:.55)){say(`🏆 คุณชนะ${NM(x)}ได้อย่างหวุดหวิด คนทั้งเมืองพูดถึงศึกนี้ไปอีกหลายเดือน`,'myth',{fame:80,pw:.08});later(P(.5+lean(x,.3,.3))?'rival_respect':'rival_revenge',x,4,12)}else{say(`🩸 ${NM(x)}เหนือกว่าจริงๆ เขาปล่อยคุณไว้กลางลานแล้วพูดว่า "กลับไปฝึกมาใหม่"`,'bad',{hp:-.25,int:3});later('rival_revenge',x,5,12,1)}}],
   ['🍶 ไม่สู้ แต่ชวนนั่งดื่มด้วยกัน','',()=>{if(P(.5+lean(x,.25,.25))){say(`🍶 ${NM(x)}หัวเราะลั่นแล้วนั่งลง คืนนั้นคุณได้เพื่อนที่ฝีมือดีที่สุดในแถบนี้`,'good',{fame:10,int:2});later('friend',x,3,15)}else say(`💢 ${NM(x)}ถ่มน้ำลายใส่จอกของคุณแล้วเดินจากไป คนรอบข้างหัวเราะ`,'bad',{fame:-15})}],
   ['🏃 หนี','',()=>say(`🏃 คุณหนีออกมา ข่าวแพร่ไปเร็วกว่าที่คุณวิ่ง`,'bad',{fame:-25})]]]}},
 savior:{c:()=>S.age>=6,go(x,v){
  return['🩹 คนที่โผล่มาช่วย',rp([`คุณพลัดตกลงในหุบเหวระหว่างเดินทาง มือหนึ่งคว้าคุณไว้ได้ทัน เจ้าของมือแนะนำตัวว่า ${NM(x)}`,`คนร้ายสามคนล้อมคุณไว้ในตรอก แล้ว${NM(x)}ก็เดินผ่านมาพอดี`,`คุณป่วยหนักจนลุกไม่ไหว มีคนชื่อ${NM(x)}มาวางยาไว้หน้าประตูทุกเช้าเป็นเดือน`]),[
   ['🙏 ขอบคุณและสัญญาว่าจะตอบแทน','จะมีวันที่เขากลับมาทวง',()=>{say(`🙏 ${NM(x)}ยิ้ม "จำไว้ก็พอ" แล้วจากไป`,'good',{hp:1,karma:2});later('debt_call',x,5,15)}],
   ['🎁 ให้ของมีค่าตอบแทนทันที','จบกันตรงนี้',()=>say(`🎁 ${NM(x)}รับไว้อย่างเกรงใจ หนี้ชีวิตนี้ถือว่าจบ`,'',{hp:1,money:-40})],
   ['❓ ถามว่าทำไมถึงช่วย','',()=>{say(`❓ ${NM(x)}ตอบว่า "${rp(['เพราะครั้งหนึ่งมีคนช่วยข้าแบบนี้','เพราะเจ้าหน้าเหมือนคนที่ข้าช่วยไม่ทัน','ข้าก็ไม่รู้ ขาข้าเดินมาเอง','เพราะในอีกชีวิตหนึ่ง เจ้าเคยช่วยข้า'])}"`,'myth',{hp:1,int:3})}]]]}},
 merchant:{c:()=>S.age>=10,go(x,v){
  return['🎒 พ่อค้าของแปลก',`${NM(x)} กางผ้าเก่าขายของใน${v.mkt} มีห่อผ้าวางอยู่สามห่อ เขาบอกว่า "ห่อละราคาเดียว ข้างในคืออะไร ข้าเองก็ลืมแล้ว"`,
   ['ห่อซ้าย','ห่อกลาง','ห่อขวา'].map(t=>[`🎁 ซื้อ${t}`,`ราคา ${fN(cashV(40))} ${v.cur} · เดาไม่ได้`,()=>{fx({money:-40});const r=Math.random();
    if(r<.18)say(`✨ ใน${t}คือคัมภีร์${v.art}ที่หายสาบสูญ! ${NM(x)}ทำหน้าเสียดายสุดชีวิต`,'myth',{pw:.22,int:5});
    else if(r<.36)say(`💰 ใน${t}คือถุงเงินที่หนักกว่าราคาที่จ่ายหลายเท่า`,'good',{money:180});
    else if(r<.52)say(`🧪 ใน${t}คือยาเม็ดสีทอง กินแล้วร่างกายร้อนผ่าวไปสามวัน`,'good',{mhp:.12,life:3});
    else if(r<.68)say(`🪨 ใน${t}คือ…ก้อนหิน ${NM(x)}หายตัวไปแล้ว`,'bad');
    else if(r<.82)say(`☠️ ใน${t}มีผงสีดำฟุ้งออกมา คุณไอไม่หยุดไปหลายวัน`,'bad',{hp:-.3});
    else say(`📜 ใน${t}คือจดหมายที่ยังไม่ได้เปิด จ่าหน้าถึงชื่อคุณ ลายมือเป็นของคุณเอง`,'myth',{int:8})}]).concat([['🚶 ไม่ซื้อ','',()=>say(`🚶 ${NM(x)}ยักไหล่ "ของดีมักหาเจ้าของเจอเอง"`,'')]])]}},
 beggar:{c:()=>S.age>=8,go(x,v){
  return['🥣 คนจรหน้าประตู',`คนจรเนื้อตัวมอมแมมคนหนึ่งเคาะประตูขออาหาร พอคุณถามชื่อ เขาตอบว่า ${NM(x)} ชื่อนี้คุ้นหูแปลกๆ`,[
   ['🍚 ให้อาหารและที่พัก','',()=>{const r=Math.random();if(r<.4+lean(x,.15,0)){say(`🌟 เช้าวันต่อมา${NM(x)}หายไป ทิ้งไว้เพียงตำราเล่มบางกับข้อความ "ค่าข้าวหนึ่งมื้อ"`,'myth',{pw:.15,int:4})}else if(r<.8){say(`🍚 ${NM(x)}กินอย่างหิวโหย แล้วกราบขอบคุณจนหน้าผากแตะพื้น`,'good',{karma:4});later('beggar_rise',x,6,18,1)}else say(`👛 ตื่นเช้ามา${NM(x)}หายไปพร้อมถุงเงินของคุณ`,'bad',{money:-80})}],
   ['🚪 ปิดประตู','',()=>{say(`🚪 คุณปิดประตู เสียงฝีเท้าค่อยๆ ห่างออกไป`,'');if(P(.5))later('beggar_rise',x,6,18,0)}]]]}},
 leader:{c:()=>S.age>=16&&WK()!=='beast',go(x,v){
  return['🏯 คำเชิญจาก'+v.boss,`${NM(x)} ผู้เป็น${v.boss}แห่ง${v.sect}ที่กำลังรุ่งเรือง ส่งคนมาเชิญคุณเข้าร่วม พร้อมของกำนัลกองโต`,[
   ['🤝 ตอบรับ','ได้ทรัพย์และชื่อเสียง · แต่ผูกพันกับเขาแล้ว',()=>{say(`🤝 คุณเข้าร่วม${v.sect}ของ${NM(x)} ทุกคนที่เห็นตราบนแขนเสื้อคุณต่างหลีกทางให้`,'good',{money:120,fame:40});later('sect_war',x,3,10)}],
   ['🙅 ปฏิเสธอย่างสุภาพ','',()=>{if(has(x,'d')||P(.3)){say(`😶 คนส่งสารยิ้มแปลกๆ "${v.boss}ไม่ชอบคำว่าไม่"`,'');later('grudge',x,2,8)}else say(`🙇 ${NM(x)}ส่งจดหมายตอบกลับมาว่า "ประตูยังเปิดอยู่เสมอ"`,'',{fame:10})}],
   ['🔍 สืบดูก่อนว่าเขาเป็นคนแบบไหน','',()=>{const g=has(x,'d')?'ด้านมืด':has(x,'s')?'ใจบุญ':'ธรรมดา';say(`🔍 คุณสืบรู้ว่า${NM(x)}เป็นคน${g==='ด้านมืด'?'ที่สร้างตัวขึ้นมาบนกองศพ':g==='ใจบุญ'?'ที่แจกข้าวให้คนจนทุกเดือนโดยไม่ให้ใครรู้':'ธรรมดาที่โชคดีกว่าคนอื่นนิดหน่อย'}`,'',{int:3})}]]]}},
 travel:{c:()=>S.age>=14,go(x,v){
  return['🛤️ เพื่อนร่วมทาง',`ระหว่างเดินทางไกล คุณได้${NM(x)}เป็นเพื่อนร่วมทาง เขาคุยเก่ง รู้ทางลัด และรู้เรื่องของคุณมากกว่าที่คุณเคยเล่า`,[
   ['🤝 ไว้ใจ เดินทางด้วยกันต่อ','',()=>{if(P(.6+lean(x,.25,.4))){say(`🌄 ${NM(x)}พาคุณผ่านทางลัดที่ไม่มีใครรู้ ถึงที่หมายเร็วกว่ากำหนดและได้ของดีระหว่างทาง`,'good',{money:90,int:3});later('friend',x,4,14)}else{say(`🗡️ คืนที่สาม${NM(x)}ลงมือ คุณรอดมาได้แต่เสียของไปเกือบหมด`,'bad',{money:-120,hp:-.3});later('grudge',x,4,12,1)}}],
   ['👀 แยกทางที่ทางแยกถัดไป','',()=>say(`👀 คุณแยกทาง ${NM(x)}โบกมือลาอย่างเสียดาย`,'',{int:1})]]]}},
 legend:{c:()=>S.age>=8,go(x,v){
  return['📜 ตำนานที่ทุกคนเล่าขาน',`ใน${v.inn} ผู้คนเล่าเรื่องของ${NM(x)} ${rp([`ผู้เดียวที่เคยฝ่าวงล้อมพันคนออกมาได้`,`ที่หายตัวไปพร้อมสมบัติของ${v.sect}`,`ผู้ที่ว่ากันว่ายังไม่ตาย เพียงแค่หลับอยู่ที่ไหนสักแห่ง`,`ที่ทิ้งรอยมือไว้บนหน้าผาสูงร้อยจั้ง`])}`,[
   ['🧭 ออกตามรอย','เสี่ยง แต่อาจเจอของดี',()=>{if(P(.5)){say(`🗺️ คุณพบรอยที่${NM(x)}ทิ้งไว้ และเข้าใจบางอย่างที่ตำนานไม่เคยเล่า`,'myth',{pw:.14,int:5});if(P(.4))later('legend_meet',x,5,15)}else say(`🌧️ คุณหลงทางอยู่ครึ่งเดือน ตำนานก็ยังเป็นแค่ตำนาน`,'bad',{hp:-.2,money:-30})}],
   ['😏 หัวเราะ "เรื่องแต่งทั้งนั้น"','',()=>{say(`😏 คุณหัวเราะ คนเล่าเรื่องมองคุณเหมือนสงสาร`,'');later('legend_meet',x,4,14)}]]]}},
 cross:{x:1,c:()=>S.age>=10,go(x,v){
  return['🌀 คนจากอีกโลก',`ชายแปลกหน้าชื่อ${NM(x)}ล้มลงตรงหน้าคุณ เขาพูดถึง${WNM[x.w]||'อีกโลก'}ราวกับเป็นบ้านเกิด และถามว่าปีนี้ปีอะไร`,[
   ['👂 เชื่อและฟังเรื่องของเขา','',()=>{if(P(.55))say(`🌌 ${NM(x)}สอนเคล็ดจาก${WNM[x.w]||'อีกโลก'}ที่ไม่มีใครในโลกนี้รู้จัก ก่อนจะจางหายไปเหมือนหมอก`,'myth',{pw:.2,int:6});else say(`🤪 สามวันต่อมา${NM(x)}เริ่มคุยกับต้นไม้ คุณเริ่มไม่แน่ใจว่าเรื่องไหนจริง`,'',{int:2})}],
   ['🛡️ พาไปส่ง'+v.law,'',()=>say(`🛡️ ${v.law}จับตัว${NM(x)}ไป คืนนั้นห้องขังว่างเปล่า เหลือแต่รอยไหม้รูปวงกลม`,'',{fame:20,karma:-2})],
   ['🍵 ให้ที่พักแล้วไม่ถามอะไร','',()=>{say(`🍵 ${NM(x)}นอนหลับสนิทเป็นครั้งแรก "ในโลกของข้าไม่มีใครใจดีแบบนี้"`,'good',{karma:5});later('friend',x,5,15)}]]]}},
 scam:{c:()=>S.age>=18,go(x,v){
  return['💹 ดีลรวยเร็ว',`${NM(x)} มาพร้อมแผนลงทุนที่ "รับประกันว่าได้สามเท่าในหนึ่งปี" เขาพูดชื่อคนดังหลายคนที่ร่วมลงขันแล้ว`,[
   ['💰 ลงขัน','',()=>{if(P(has(x,'s')?.6:has(x,'d')?.15:.35))say(`📈 ไม่น่าเชื่อ แผนของ${NM(x)}ได้ผลจริง!`,'myth',{money:260});else{say(`📉 ${NM(x)}หายไปพร้อมเงินทุกคน`,'bad',{money:-130});later('grudge',x,3,10,2)}}],
   ['🚨 แจ้ง'+v.law,'',()=>say(`🚨 ${v.law}เรียก${NM(x)}ไปสอบสวน ชื่อของคุณถูกพูดถึงในฐานะคนช่างสังเกต`,'',{fame:25})],
   ['🙃 ปฏิเสธ','',()=>say(`🙃 คุณปฏิเสธ ${NM(x)}ไม่ได้ดูเสียดายเลยสักนิด`,'')]]]}},
 healer:{c:()=>S.age>=10,go(x,v){
  return['💊 ยาเม็ดสีแปลก',`${NM(x)} หมอเร่ที่เดินผ่าน${v.home} ยื่นยาเม็ดหนึ่งให้คุณฟรีๆ "กินซะ เจ้าจะต้องใช้มัน"`,[
   ['💊 กิน','เดาไม่ได้',()=>{const r=Math.random()+lean(x,.15,.2);if(r>.7)say(`🌿 ร่างกายเบาหวิว คุณรู้สึกว่าชีวิตยืดยาวออกไป`,'myth',{life:6,hp:1});else if(r>.4)say(`💪 กระดูกคุณลั่นเหมือนถูกหลอมใหม่`,'good',{mhp:.15});else if(r>.15)say(`😵 คุณหลับไปสามวัน ตื่นมาก็ไม่มีอะไรเปลี่ยน`,'');else say(`☠️ มันคือยาพิษ! คุณรอดมาได้อย่างหวุดหวิด`,'bad',{hp:-.4})}],
   ['🧺 เก็บไว้ก่อน','',()=>{S._cs.pill=1;say(`🧺 คุณเก็บยาเม็ดนั้นไว้ในย่าม ${NM(x)}พยักหน้าเหมือนรู้ว่าวันหนึ่งคุณจะกิน`,'')}]]]}},
 student:{c:()=>S.age>=28&&S.age<=70,go(x,v){
  return['🧑‍🎓 คนอยากเป็นศิษย์',`เด็กหนุ่มชื่อ${NM(x)}คุกเข่าอยู่หน้าบ้านคุณมาสามวันสามคืน ขอเป็นศิษย์`,[
   ['✅ รับไว้','',()=>{say(`✅ คุณรับ${NM(x)}เป็นศิษย์ เขาเรียนรู้เร็วจนน่ากลัว`,'good',{int:3,fame:15});later('student_back',x,8,18)}],
   ['🧪 ทดสอบก่อน','',()=>{if(P(.5)){say(`🧪 ${NM(x)}ผ่านบททดสอบที่ไม่มีใครเคยผ่าน คุณรับไว้ทันที`,'good',{int:4});later('student_back',x,8,18)}else say(`🧪 ${NM(x)}ไม่ผ่าน เขาก้มกราบแล้วเดินจากไปเงียบๆ`,'')}],
   ['❌ ปฏิเสธ','',()=>{say(`❌ ${NM(x)}ลุกขึ้นช้าๆ "สักวันท่านจะจำชื่อข้าได้"`,'');later('grudge',x,10,20)}]]]}},
 debt:{c:()=>S.age>=16,go(x,v){
  return['📜 หนี้ที่จำไม่ได้',`${NM(x)} ถือสัญญากู้ยืมเก่าคร่ำคร่าที่มีลายมือชื่อคุณมาทวงหนี้ แต่คุณจำไม่ได้เลยว่าเคยยืม`,[
   ['💸 จ่ายให้จบๆ','',()=>say(`💸 ${NM(x)}รับเงินแล้วพับสัญญาเก็บ "ขอบใจ ชีวิตก่อนของเจ้าก็พูดแบบนี้"`,'myth',{money:-70,karma:6})],
   ['🔍 ขอดูสัญญาให้ชัด','',()=>{if(P(.5))say(`🔍 ลายมือในสัญญาไม่ใช่ของคุณ ${NM(x)}หน้าแดงแล้วรีบเผ่น`,'good',{int:3});else say(`🔍 ลายมือเป็นของคุณจริงๆ ลงวันที่ไว้ก่อนคุณเกิด`,'myth',{money:-70,int:6})}],
   ['✋ ไม่จ่าย','',()=>{say(`✋ ${NM(x)}เก็บสัญญาลงอกเสื้อ "หนี้ไม่เคยหายไปไหน"`,'');later('grudge',x,3,10)}]]]}},
 oracle:{c:()=>S.age>=8,go(x,v){const g=P(.5);
  return['🔮 หมอดูข้างทาง',`${NM(x)} หมอดูตาบอดข้างทาง จับมือคุณแล้วพูดว่า "${g?'อีกไม่กี่ปี เจ้าจะได้สิ่งที่รอมาทั้งชีวิต':'ระวังปีที่ฝนตกไม่หยุด สิ่งที่เจ้ารักจะหลุดมือ'}"`,[
   ['🪙 ให้ค่าดู','',()=>{fx({money:-10});later('oracle',x,3,9,g?1:0);say(`🪙 ${NM(x)}เก็บเหรียญโดยไม่ต้องมอง`,'')}],
   ['🙄 ไม่เชื่อ เดินผ่านไป','',()=>{later('oracle',x,3,9,g?1:0);say(`🙄 ${NM(x)}ตะโกนไล่หลัง "คำทำนายไม่สนว่าเจ้าเชื่อหรือไม่"`,'')}]]]}},
 duo:{n:2,c:()=>S.age>=12,go(x,v,y){
  return['⚖️ สองคนกลางตลาด',`${NM(x)} กับ ${NM(y)} ทะเลาะกันกลาง${v.mkt} ต่างฝ่ายต่างอ้างว่าอีกฝ่ายขโมย${v.wpn}ของตัวเอง ทั้งคู่หันมาให้คุณตัดสิน`,[
   [`👉 เข้าข้าง ${E(x.n)}`,'',()=>{say(`⚖️ คุณตัดสินให้${NM(x)}ชนะ ${NM(y)}มองคุณด้วยสายตาที่คุณจะจำไปอีกนาน`,'',{fame:15});later('friend',x,3,12);later('grudge',y,3,12)}],
   [`👉 เข้าข้าง ${E(y.n)}`,'',()=>{say(`⚖️ คุณตัดสินให้${NM(y)}ชนะ ${NM(x)}เดินจากไปพร้อมความแค้น`,'',{fame:15});later('friend',y,3,12);later('grudge',x,3,12)}],
   ['🍵 ให้ทั้งคู่นั่งคุยกันดีๆ','',()=>{if(P(.5))say(`🍵 สุดท้ายทั้งคู่หัวเราะออกมา${v.wpn}เล่มนั้นเป็นของพ่อพวกเขา ทั้งสองเป็นพี่น้องที่พลัดพรากกัน`,'myth',{karma:8,fame:20});else say(`💥 ทั้งคู่หันมารุมด่าคุณแทน`,'bad',{fame:-10})}]]]}},
 beast:{c:()=>WK()==='beast',go(x,v){
  return['🐾 ผู้มีกลิ่นของมนุษย์',`ในป่าลึกคุณเจอมนุษย์ชื่อ${NM(x)}ที่ไม่มีอาวุธ เขาวางผลไม้ไว้บนพื้นแล้วถอยห่าง ราวกับรู้ว่าคุณเข้าใจภาษาคน`,[
   ['🍎 กินผลไม้','',()=>{if(P(.7+lean(x,.2,.4)))say(`🍎 ผลไม้นั้นมีพลังวิญญาณเข้มข้น ${NM(x)}ยิ้มแล้วจากไป`,'myth',{pw:.15,mhp:.1});else say(`🪤 ใต้ผลไม้มีกับดัก! ${NM(x)}คือพราน`,'bad',{hp:-.35})}],
   ['🐺 ขู่ไล่','',()=>say(`🐺 ${NM(x)}ถอยหนีไป ทิ้งผลไม้ไว้ให้`,'',{hp:.2})]]]}}};

// ---------------------------------------------------------------- ภาคต่อ (คนเดิมกลับมา)
const CB={
 chase_rev:(x,v)=>['🔥 ศัตรูจากอีกจักรวาล',`ในอีกจักรวาลหนึ่ง <b>${E(x.n)}</b> เคยทำกับ <b>${E(x.my||'ตัวคุณในชาติก่อน')}</b> ไว้แบบนี้:<br><i class="csQ">“${E(String(x.t||'').slice(0,160))}”</i><br>วันนี้เขาเดินอยู่ตรงหน้าคุณ ไม่รู้ตัวเลยว่าคุณจำได้`,[
   ['⚔️ ท้าดวลล้างแค้น','ชนะ ~55%',()=>{const w=P(.55);if(w)say(`🔥 คุณล้มลง<b>${E(x.n)}</b>ได้กลางลาน หนี้แค้นข้ามจักรวาลถูกชำระแล้ว`,'myth',{fame:120,pw:.12});else say(`🩸 <b>${E(x.n)}</b>ยังเหนือกว่าคุณ แม้แต่ในจักรวาลนี้`,'bad',{hp:-.35,int:4});back(x,'rev',w?'bad':'good',w?`🔥 «${S.name}» ตามข้ามจักรวาลมาล้างแค้นแทน «${x.my||'ใครบางคน'}» ท้าดวลคุณกลางลาน และคุณแพ้! ชื่อของคุณถูกเหยียบจมดิน`:`🛡️ «${S.name}» ตามข้ามจักรวาลมาล้างแค้นแทน «${x.my||'ใครบางคน'}» แต่คุณเอาชนะเขาได้อีกครั้ง!`)}],
   ['🗣️ ปล่อยข่าวลือทำลายชื่อเสียงเขา','ยิ่งปัญญาสูงยิ่งสำเร็จ',()=>{const w=P(Math.min(.8,.35+(+S.int||0)/300));if(w)say(`🗣️ ข่าวลือของคุณแพร่ไปทั่ว<b>${E(x.n)}</b>ต้องหนีออกจากเมือง`,'good',{fame:40,karma:-5});else say(`🗣️ ข่าวลือย้อนกลับมาหาคุณเอง`,'bad',{fame:-40});back(x,'rev',w?'bad':'good',w?`🗣️ «${S.name}» ปล่อยข่าวลือทำลายชื่อคุณจนต้องหนีออกจากเมือง เพื่อแก้แค้นแทน «${x.my||'ใครบางคน'}»`:`😏 «${S.name}» พยายามปล่อยข่าวลือทำลายชื่อคุณ แต่ไม่มีใครเชื่อ`)}],
   ['🕊️ ให้อภัย','บุญ +12',()=>{say(`🕊️ คุณเดินผ่าน<b>${E(x.n)}</b>ไปเฉยๆ ความแค้นจบที่คุณ`,'myth',{karma:12,int:3});back(x,'rev','myth',`🕊️ «${S.name}» จำได้ว่าคุณเคยทำอะไรกับ «${x.my||'ใครบางคน'}» แต่เลือกให้อภัย แล้วเดินผ่านคุณไปเฉยๆ`)}]]],
 chase_gift:(x,v)=>['🎁 ผู้มีพระคุณจากอีกจักรวาล',`ในอีกจักรวาลหนึ่ง <b>${E(x.n)}</b> เคยทำกับ <b>${E(x.my||'ตัวคุณในชาติก่อน')}</b> ไว้แบบนี้:<br><i class="csQ">“${E(String(x.t||'').slice(0,160))}”</i><br>วันนี้คุณเจอเขาอีกครั้ง และอยากตอบแทน`,[
   ['🎁 มอบของมีค่าให้','',()=>{say(`🎁 <b>${E(x.n)}</b>งงว่าทำไมคนแปลกหน้าถึงใจดีขนาดนี้`,'good',{money:-80,karma:10});back(x,'gift','myth',`🎁 «${S.name}» ตามข้ามจักรวาลมาตอบแทนที่คุณเคยดีกับ «${x.my||'ใครบางคน'}» มอบของมีค่าให้โดยไม่บอกเหตุผล`)}],
   ['🛡️ ปกป้องเขาจากอันตราย','เจ็บตัว · ชื่อเสียงเพิ่ม',()=>{say(`🛡️ คุณรับคมดาบแทน<b>${E(x.n)}</b> เขารอดเพราะคุณ`,'myth',{hp:-.3,fame:60});back(x,'gift','myth',`🛡️ «${S.name}» โผล่มารับคมดาบแทนคุณ ช่วยชีวิตคุณไว้ เพื่อตอบแทนที่คุณเคยดีกับ «${x.my||'ใครบางคน'}»`)}],
   ['🍶 นั่งดื่มด้วยกันหนึ่งคืน','',()=>{say(`🍶 คุณกับ<b>${E(x.n)}</b>คุยกันทั้งคืนเหมือนเพื่อนเก่า`,'good',{int:4,hp:.3});back(x,'gift','good',`🍶 «${S.name}» ชวนคุณนั่งดื่มทั้งคืนเหมือนเพื่อนเก่า เพราะครั้งหนึ่งคุณเคยดีกับ «${x.my||'ใครบางคน'}»`)}]]],
 mentor_back:(x,v)=>['🕯️ อาจารย์กลับมา',`${NM(x)} อาจารย์ของคุณกลับมาในสภาพแก่ชราลงมาก "ข้ามีของชิ้นสุดท้ายจะให้"`,[['🙇 รับมรดกวิชา','',()=>say(`🕯️ ${NM(x)}ถ่ายทอด${v.art}ท่าสุดท้ายให้ แล้วหลับไปอย่างสงบในอ้อมแขนคุณ`,'myth',{pw:.25,int:5})],['🍵 ขอแค่ได้ดูแลท่านในบั้นปลาย','',()=>say(`🍵 คุณดูแล${NM(x)}จนวันสุดท้าย เขาจากไปพร้อมรอยยิ้ม`,'myth',{karma:12,life:3})]]],
 mentor_betray:(x,v)=>['🗡️ อาจารย์จอมปลอม',`${NM(x)} กลับมาพร้อมพรรคพวก เขาต้องการให้คุณทำงานสกปรกให้อีกครั้ง`,[['⚔️ สู้','ชนะ ~50%',()=>{if(P(.5))say(`⚔️ คุณเอาชนะ${NM(x)}ได้ เขาไม่กล้ากลับมาอีก`,'myth',{fame:60,pw:.08});else say(`🩸 คุณแพ้ และต้องจ่ายค่าไถ่ชีวิต`,'bad',{hp:-.3,money:-100})}],['🏃 หนีไปตั้งตัวใหม่ที่อื่น','',()=>say(`🏃 คุณหนีไปตั้งต้นใหม่ ทิ้งทุกอย่างไว้ข้างหลัง`,'',{money:-60,int:3})]]],
 rival_respect:(x,v)=>['🤝 คู่ปรับที่นับถือกัน',`${NM(x)} คู่ปรับเก่าส่งของมาให้พร้อมจดหมาย "ข้าไม่เคยลืมศึกวันนั้น"`,[['🎁 รับไว้','',()=>say(`🎁 ในกล่องคือ${v.wpn}ที่${NM(x)}ใช้ฝึกมาทั้งชีวิต`,'good',{pw:.12,fame:20})],['✉️ ตอบจดหมายชวนประลองอีกครั้ง','',()=>{say(`✉️ ${NM(x)}ตอบกลับว่า "ข้ารอวันนั้นอยู่"`,'');later('rival_revenge',x,2,6)}]]],
 rival_revenge:(x,v,d)=>['🔥 คู่ปรับกลับมา',`${NM(x)} กลับมาพร้อมฝีมือที่ก้าวกระโดด ${d?'"ครั้งที่แล้วข้าปรานี ครั้งนี้ไม่"':'"ข้าฝึกมาทุกวันเพื่อวันนี้"'}`,[['⚔️ สู้อีกครั้ง','ชนะ ~45%',()=>{if(P(.45))say(`🏆 คุณชนะ${NM(x)}อีกครั้ง ศึกนี้กลายเป็นตำนานของเมือง`,'myth',{fame:120,pw:.12});else say(`🩸 ${NM(x)}ชนะ และกลายเป็นชื่อที่ทุกคนพูดถึงแทนคุณ`,'bad',{hp:-.35,fame:-30})}],['🙇 ยอมรับว่าเขาเหนือกว่า','',()=>say(`🙇 ${NM(x)}เงียบไปนาน แล้วยื่นมือมาจับ`,'',{int:4,karma:3})]]],
 debt_call:(x,v)=>['🙏 ถึงเวลาตอบแทน',`${NM(x)} คนที่เคยช่วยชีวิตคุณกลับมา คราวนี้เขาต้องการความช่วยเหลือบ้าง`,[['🤲 ช่วยเต็มที่','',()=>say(`🤲 คุณช่วย${NM(x)}จนผ่านพ้นมาได้ หนี้ชีวิตถูกชดใช้แล้ว`,'myth',{money:-80,karma:10,fame:30})],['😶 แกล้งทำเป็นจำไม่ได้','',()=>say(`😶 ${NM(x)}มองคุณนิ่งๆ แล้วเดินจากไปโดยไม่พูดอะไร`,'bad',{karma:-10})]]],
 beggar_rise:(x,v,d)=>['👑 คนจรในวันนั้น',`${NM(x)} คนจรที่เคยเคาะประตูบ้านคุณ ตอนนี้กลายเป็น${v.big}ที่ใครๆ ต่างเกรงใจ`,d?[['🙇 ทักทาย','',()=>say(`🎁 ${NM(x)}จำคุณได้ทันที "ข้าวมื้อนั้นข้าไม่เคยลืม" แล้วตอบแทนคุณมากกว่าที่คุณเคยให้เป็นร้อยเท่า`,'myth',{money:300,fame:40})]]:[['🙇 ทักทาย','',()=>say(`🚪 ${NM(x)}มองคุณแล้วพูดเรียบๆ "ประตูบ้านเจ้า ข้ายังจำได้ดี" จากนั้นทั้งเมืองก็ไม่มีใครค้าขายกับคุณอีก`,'bad',{money:-60,fame:-20})]]],
 sect_war:(x,v)=>['⚔️ สงครามของ'+v.sect,`${v.sect}ของ${NM(x)}ถูกบุกยึด ${v.boss}ส่งคนมาตามคุณกลับไปช่วย`,[['⚔️ ไปสู้เคียงข้าง','เสี่ยง',()=>{if(P(.55))say(`🏯 พวกคุณตีกลับได้สำเร็จ ${NM(x)}ยกคุณเป็นผู้มีพระคุณของ${v.sect}`,'myth',{fame:100,money:150,pw:.1});else say(`🩸 ${v.sect}แตกพ่าย คุณหนีรอดออกมาได้คนเดียว`,'bad',{hp:-.4})}],['🏃 ถอนตัว','',()=>say(`🏃 คุณถอนตัว ชื่อของคุณถูกขีดฆ่าในทะเบียน${v.sect}`,'bad',{fame:-40})]]],
 grudge:(x,v,d)=>['😠 คนที่ยังไม่ลืม',`${NM(x)} ปรากฏตัวอีกครั้ง ${['คราวนี้เขามาพร้อมความแค้น','"เจ้าคงคิดว่าข้าลืมไปแล้ว"','สายตาของเขาบอกทุกอย่าง'][d|0]||'คราวนี้เขามาพร้อมความแค้น'}`,[['⚔️ เผชิญหน้า','ชนะ ~50%',()=>{if(P(.5))say(`⚔️ คุณจบเรื่องนี้ได้ ${NM(x)}ถอยไปและไม่กลับมาอีก`,'good',{fame:40});else say(`🩸 ${NM(x)}ล้างแค้นสำเร็จ`,'bad',{hp:-.35,money:-50})}],['🕊️ ขอโทษจากใจ','',()=>{if(P(.5+lean(x,.3,.3)))say(`🕊️ ${NM(x)}นิ่งไปนาน แล้วก็ยอมรับคำขอโทษ ความแค้นจบลงตรงนั้น`,'myth',{karma:10,int:4});else say(`💢 ${NM(x)}ไม่รับคำขอโทษ แต่ก็จากไป`,'',{karma:3})}]]],
 friend:(x,v)=>['🍶 สหายเก่า',`${NM(x)} แวะมาหาพร้อมไหเหล้าและเรื่องเล่ามากมาย`,[['🍶 นั่งคุยทั้งคืน','',()=>say(`🍶 ${NM(x)}เล่าเรื่องที่เขาเจอมาจนฟ้าสาง ก่อนจากไปเขาทิ้งของบางอย่างไว้ให้`,'good',{int:4,money:50,hp:.3})],['🧭 ชวนออกเดินทางด้วยกัน','',()=>{if(P(.6))say(`🧭 การเดินทางครั้งนั้นกลายเป็นช่วงเวลาที่ดีที่สุดในชีวิตคุณ`,'myth',{pw:.1,fame:30,life:2});else say(`🌧️ การเดินทางล่มกลางทาง แต่ทั้งคู่ก็ยังหัวเราะได้`,'',{hp:-.15,int:2})}]]],
 legend_meet:(x,v)=>['🌟 ตำนานในตัวตนจริง',`คนที่ยืนตรงหน้าคุณคือ${NM(x)} ตำนานที่คุณเคยได้ยิน ${rp(['เขาตัวเล็กกว่าที่คิด','เขากำลังซื้อผักอยู่','เขาดูเหนื่อยล้ากว่าในเรื่องเล่ามาก'])}`,[['🙇 ขอคำสอน','',()=>{if(P(.6))say(`🌟 ${NM(x)}ชี้จุดอ่อนในท่าของคุณเพียงจุดเดียว แต่มันเปลี่ยนทุกอย่าง`,'myth',{pw:.2,int:5});else say(`🤷 ${NM(x)}บอกว่าเรื่องเล่าทั้งหมดเป็นเรื่องโกหก แล้วขอยืมเงินคุณ`,'',{money:-40,int:3})}],['⚔️ ขอประลอง','ชนะ ~30%',()=>{if(P(.3))say(`🏆 คุณชนะตำนาน! ชื่อคุณถูกเล่าต่อแทนชื่อเขา`,'myth',{fame:200,pw:.15});else say(`🌪️ คุณไม่ทันเห็นแม้แต่ท่าเดียว`,'bad',{hp:-.3,int:5})}]]],
 student_back:(x,v)=>['🎓 ศิษย์ที่เก่งกว่าอาจารย์',`${NM(x)} ศิษย์ของคุณกลับมา ตอนนี้เขามีชื่อเสียงไปทั่ว`,P(.7)?[['🙇 รับการคารวะ','',()=>say(`🎓 ${NM(x)}คุกเข่าคารวะคุณต่อหน้าผู้คน "ทุกอย่างที่ข้ามี เริ่มจากอาจารย์"`,'myth',{fame:90,int:5})]]:[['⚔️ รับคำท้าจากศิษย์','ชนะ ~40%',()=>{if(P(.4))say(`🏆 อาจารย์ยังเป็นอาจารย์ ${NM(x)}ยอมรับความพ่ายแพ้`,'myth',{fame:80});else say(`🎓 ${NM(x)}ชนะ แล้วประกาศว่าตัวเองไม่ใช่ศิษย์ของคุณอีกต่อไป`,'bad',{fame:-40,hp:-.2})}]]],
 oracle:(x,v,d)=>[d?'🔮 คำทำนายเป็นจริง':'🌧️ ปีที่ฝนไม่หยุดตก',d?`สิ่งที่${NM(x)}ทำนายไว้เกิดขึ้นจริง`:`ฝนตกไม่หยุดมาสามเดือน คุณนึกถึงคำของ${NM(x)}`,d?[['✨ รับโชค','',()=>say(`✨ โชคก้อนใหญ่หล่นใส่มือคุณ ตรงตามที่${NM(x)}ทำนายไว้ทุกคำ`,'myth',{money:220,pw:.1})]]:[['🛡️ ระวังตัวทุกฝีก้าว','',()=>{if(P(.5))say(`🛡️ เพราะคุณระวังตัว คำทำนายจึงคลาดไป`,'good',{int:4});else say(`🌧️ คำทำนายเป็นจริง คุณเสียของสำคัญไปชิ้นหนึ่ง`,'bad',{money:-90,hp:-.15})}]]],
 regret:(x,v)=>['🍂 ทางที่ไม่ได้เลือก',`คุณได้ข่าวว่า${NM(x)} คนที่เคยชวนคุณเป็นศิษย์ เพิ่งรับศิษย์คนใหม่ ศิษย์คนนั้นกลายเป็น${v.big}ไปแล้ว`,[['🍂 ปล่อยวาง','',()=>say(`🍂 คุณยิ้มให้ทางที่ไม่ได้เลือก`,'',{int:4,karma:2})],['🏃 ไปตามหาเขา','',()=>{if(P(.5))say(`🕯️ ${NM(x)}ยังจำคุณได้ และสอนสิ่งที่ค้างไว้ให้`,'myth',{pw:.15});else say(`🚪 ${NM(x)}ไม่อยู่แล้ว เหลือแค่บ้านว่าง`,'',{int:2})}]]]};

// ---------------------------------------------------------------- ตัวจัด (ทุก 1.5 วิ · ปีละไม่เกิน 1 · ชีวิตละบทหลัก ≤5)
function st(){if(!S._cs){S._cs={n:0,y:-99,used:[],cb:[],ly:-1,ec:[],rc:[]};try{const L=LS.get('murim_chase',[])||[];if(L.length){LS.set('murim_chase',[]);L.slice(0,3).forEach(c=>S._cs.cb.push({k:c.k==='gift'?'chase_gift':'chase_rev',n:c.n,w:c.w,ct:c.id,my:c.cn,t:c.t,y:(S.age|0)+rnd(2,8)}))}}catch(e){}setTimeout(reward,2500)}return S._cs}
/* ตัวเลือกที่เปิดอยู่ไม่นับ (choice() เข้าคิวให้เอง) · รอเฉพาะหน้าต่างอื่น ดวล มินิเกม */
function busy(){try{const m=$('modal'),mk=m&&m.dataset&&m.dataset.k;return !!((modalOpen&&mk!=='choice')||(typeof DU!=='undefined'&&DU)||($('auOv')&&$('auOv').classList.contains('on'))||(window._mgBusy&&_mgBusy()))}catch(e){return true}}
/* ผลที่เกิดกับนักแสดง → แปลงเป็นมุมมองของเจ้าของชื่อ ("คุณ" = ผู้เล่นคนนี้) แล้วเก็บไว้ส่งตอนจบ */
const strip=t=>String(t||'').replace(/<br\s*\/?>/g,' ').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const toOwner=t=>strip(t).replace(/(?<!พระ|บุญ)คุณ(?!ค่า|ภาพ|สมบัติ|ธรรม)/g,'«'+String(S.name||'ใครบางคน')+'»').slice(0,250);
function rec(L,got){try{const s=st();s.ec=s.ec||[];const t=got.map(g=>g[0]).join(' '),c=(got.find(g=>g[1]==='myth')||got.find(g=>g[1]==='bad')||got.find(g=>g[1]==='good')||got[0])[1];
 L.forEach(p=>{if(p&&p.i&&s.ec.length<16)s.ec.push({i:p.i,cn:p.n,t:toOwner(t),c})});if(s.ec.length>=8)flush()}catch(e){}}
function ask(t,x,opts,who,more){try{const L=[who].concat(more||[]);choice('👤 '+t,x+TAG(who),opts.map(([tt,s,f])=>({t:tt,s:s||'',f(){CAP=[];try{f()}catch(e){console.error('cast',e)}const got=CAP;CAP=null;if(got&&got.length)rec(L,got)}})))}catch(e){console.error('cast ask',e)}}
function tick(){try{if(typeof S==='undefined'||!S||!S.alive)return;load();if(busy())return;const s=st(),ag=S.age|0;if(s.ly===ag)return;
 const cb=s.cb.find(c=>ag>=c.y&&(C||/^chase/.test(c.k)));if(cb){s.cb=s.cb.filter(c=>c!==cb);s.ly=ag;const f=CB[cb.k];if(!f)return;const r=f(cb,V(),cb.d);return ask(r[0],r[1],r[2],cb)}
 if(!C||ag<6||s.n>=5||ag-s.y<3)return;s.ly=ag;if(!P(.16))return;
 s.rk=s.rk||[];let ks=Object.keys(R).filter(k=>{try{return R[k].c()}catch(e){return false}});const nu=ks.filter(k=>!s.rk.includes(k));if(nu.length)ks=nu;if(!ks.length)return;const k=rp(ks),r0=R[k];
 const x=who(!!r0.x);if(!x)return;let y=null;if(r0.n===2){s.used.push(x.n);y=who(false);s.used.pop();if(!y)return}
 s.n++;s.y=ag;s.rk.push(k);s.used.push(x.n);if(y)s.used.push(y.n);const r=r0.go(x,V(),y);ask(r[0],r[1],r[2],x,y?[y]:[])}catch(e){console.error('cast tick',e)}}
setInterval(tick,1500);setTimeout(load,4000);

// ---------------------------------------------------------------- 📬 เสียงสะท้อน
function back(x,k,c,t){try{const s=st();s.rc=s.rc||[];if(x.ct&&s.rc.length<3)s.rc.push({r:x.ct,k,cn:String(S.name||'').slice(0,20),t:String(t).slice(0,250),c})}catch(e){}}
function flush(){try{const s=S&&S._cs;if(!s||!on())return;const e=(s.ec||[]).splice(0,8),r=(s.rc||[]).splice(0,3);if(!e.length&&!r.length)return;
 api('castecho',{e,r,n:String(S.name||'').slice(0,20),w:WK()||'murim'}).then(j=>{if(j&&j.rate){s.ec=e.concat(s.ec||[]).slice(0,16);s.rc=r.concat(s.rc||[]).slice(0,3)}}).catch(()=>{s.ec=e.concat(s.ec||[]).slice(0,16);s.rc=r.concat(s.rc||[]).slice(0,3)})}catch(e){}}
let EC=null,ECt=0;
function eLoad(force){if(!on())return Promise.resolve(EC);if(EC&&!force&&Date.now()-ECt<300000)return Promise.resolve(EC);
 return api('echoes',{}).then(j=>{if(j&&j.ok){EC=j;ECt=Date.now();badge()}return EC}).catch(()=>EC)}
const seen=()=>{try{return +LS.get('murim_echoSeen',0)||0}catch(e){return 0}};
const fresh=()=>EC&&EC.L?EC.L.filter(x=>(x.at||0)>seen()):[];
const RANK=[[300,'👁️ ผู้อยู่ในทุกจักรวาล'],[100,'📜 ตำนานร้อยชีวิต'],[30,'🌟 คนดังข้ามจักรวาล'],[10,'🗣️ ชื่อที่ถูกเอ่ยถึง'],[1,'👣 เงาในชีวิตคนอื่น'],[0,'🌫️ ยังไม่มีใครรู้จัก']];
const rank=n=>RANK.find(r=>n>=r[0])[1];
function badge(){try{const n=fresh().length;document.querySelectorAll('.csEcB').forEach(b=>b.innerHTML=`📬 เสียงสะท้อน${n?` <span class="csN">${n} ใหม่</span>`:''}`);if(n&&!(S&&S.alive)&&!badge._t){badge._t=1;try{toast(`📬 ชื่อของคุณไปโผล่ในชีวิตคนอื่น ${n} เรื่อง — เปิดดูที่ ☰ หรือหน้าตอนจบ`)}catch(e){}}}catch(e){}}
function reward(){try{if(!S||!S.alive)return;eLoad().then(()=>{try{if(!S||!S.alive||S._csRw)return;const last=+LS.get('murim_echoRw',0)||0,L=(EC&&EC.L||[]).filter(x=>(x.at||0)>last);if(!L.length)return;S._csRw=1;
 LS.set('murim_echoRw',Math.max(...L.map(x=>x.at||0)));const n=L.length,g=L.filter(x=>x.c==='myth'||x.c==='good').length;
 say(`📬 <b>แรงศรัทธาข้ามจักรวาล</b> — ตั้งแต่ชีวิตก่อน ชื่อของคุณไปโผล่ในชีวิตของผู้เล่นคนอื่น ${n} เรื่อง${g?` (เรื่องดี ${g})`:''} · เปิดอ่านที่ ☰ → 📬 เสียงสะท้อน`,'myth',{fame:Math.min(200,n*12),int:Math.min(8,n)})}catch(e){}})}catch(e){}}
const WIC={murim:'⚔️',xian:'☁️',god:'🌟',soul:'🔮',loop:'⏳',mw:'🏙️',sky:'🌌',fog:'🌫️',beast:'🐺'};
function chased(){try{return LS.get('murim_chased',[])||[]}catch(e){return[]}}
function eOpen(){try{if(typeof closeM==='function'&&modalOpen)closeM()}catch(e){}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📬 เสียงสะท้อนจากจักรวาล</h3><div class="csIn" id="csIn"><p class="tag2">กำลังฟังเสียงจากจักรวาลอื่น…</p></div>`,'csecho');
 eLoad(true).then(()=>{const el=$('csIn');if(!el)return;if(!EC){el.innerHTML='<p class="tag2">ต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้งนะ</p>';return}
  const c=EC.c||{},tot=+c.tot||0,sn=seen(),ch=chased(),pend=(LS.get('murim_chase',[])||[]).length;
  const card=(x,k)=>{const nw=(x.at||0)>sn,done=ch.includes(x.id);const ic=x.x==='rev'?'🔥':x.x==='gift'?'🎁':x.c==='myth'?'✨':x.c==='bad'?'💀':x.c==='good'?'💚':'💬';
   return`<div class="csCard${nw?' nw':''} c_${x.c||'mid'}${x.x?' xx':''}" style="animation-delay:${Math.min(k,12)*.09}s"><div class="csH">${ic} ${x.x?'<b>มีคนตามข้ามจักรวาลมาหาคุณ!</b>':`ในชีวิตของ <b>${E(x.n)}</b>`} <span>${WIC[x.w]||''} ${WNM[x.w]||''}${nw?' · <i>ใหม่</i>':''}</span></div>
    <div class="csT">${E(x.t).replace(/«([^»]{1,24})»/g,'<b class="csP">$1</b>')}</div><div class="csF">ตัวละครของคุณ: <b>${E(x.cn||'?')}</b></div>
    <div class="csA">${done?'<span class="tag2">✅ ตามไปแล้ว</span>':`<button class="csB2" data-i="${k}" data-k="rev">🔥 ตามไปล้างแค้น</button><button class="csB2" data-i="${k}" data-k="gift">🎁 ตามไปตอบแทน</button>`}</div></div>`};
  el.innerHTML=`<div class="csSt"><div class="csRk">${rank(tot)}</div><div>ชื่อของคุณไปโผล่ในชีวิตผู้เล่นคนอื่นรวม <b>${tot}</b> ครั้ง · ✨ ฉากตำนาน ${+c.myth||0} · 💚 จบดี ${+c.good||0} · 💀 จบร้าย ${+c.bad||0}</div><div class="tag2">กด 🔥/🎁 แล้วชีวิตหน้าคุณจะได้เจอคนนั้น และเขาจะรู้ว่าคุณตามมา (ค้างได้ 3 คน · ตอนนี้ ${pend}/3)</div></div>
   ${EC.L.length?EC.L.map(card).join(''):'<p class="tag2">ยังไม่มีใครเจอตัวละครของคุณ เล่นจบชีวิตแล้วกลับมาดูใหม่นะ ชื่อคุณจะเริ่มไปโผล่ในชีวิตคนอื่นเรื่อยๆ</p>'}`;
  el.querySelectorAll('.csB2').forEach(b=>b.onclick=()=>{const x=EC.L[+b.dataset.i];if(!x)return;const L=LS.get('murim_chase',[])||[];if(L.length>=3){try{toast('ตามได้ค้างสูงสุด 3 คน เล่นชีวิตหน้าก่อนนะ')}catch(e){}return}
   L.push({id:x.id,n:x.n,w:x.w,cn:x.cn,t:String(x.t||'').replace(/«|»/g,''),k:b.dataset.k});LS.set('murim_chase',L);const C2=chased();C2.push(x.id);LS.set('murim_chased',C2.slice(-200));
   b.parentNode.innerHTML=`<span class="tag2">${b.dataset.k==='rev'?'🔥 ชีวิตหน้าคุณจะได้เจอ '+E(x.n)+' (ล้างแค้น)':'🎁 ชีวิตหน้าคุณจะได้เจอ '+E(x.n)+' (ตอบแทน)'}</span>`});
  try{const mx=Math.max(sn,...EC.L.map(x=>x.at||0));LS.set('murim_echoSeen',mx)}catch(e){}badge()})}
window.echoOpen=eOpen;
{const _m=openMenu;openMenu=function(){const r=_m.apply(this,arguments);try{const g=$('modal').querySelector('.mgrid,.tmgrid');if(g&&!g.querySelector('.csEcB'))g.insertAdjacentHTML('beforeend','<button class="opt csEcB" onclick="echoOpen()">📬 เสียงสะท้อน</button>');badge()}catch(e){}return r};window.openMenu=openMenu}
try{if(typeof openTitleMenu==='function'){const _t=openTitleMenu;openTitleMenu=function(){const r=_t.apply(this,arguments);try{const g=$('modal').querySelector('.tmgrid,.mgrid');if(g&&!g.querySelector('.csEcB'))g.insertAdjacentHTML('beforeend','<button class="opt csEcB" onclick="echoOpen()">📬 เสียงสะท้อน</button>');badge()}catch(e){}return r};window.openTitleMenu=openTitleMenu}}catch(e){}
setTimeout(()=>eLoad(),6000);

// ---------------------------------------------------------------- ส่งตัวละครเข้าคลังตอนจบ + ปุ่มไม่ให้ใช้ชื่อ
function trOf(){let t='';try{const k=+S.karma||0;if(k>=40)t+='s';if(k<=-25)t+='d';if((+S.fame||0)>=800)t+='f';if((S.age|0)>=80)t+='o';if((S.age|0)<25)t+='y';if(S.spouse)t+='l';if(S.disc)t+='m'}catch(e){}return t}
function send(){try{if(!S||S._csSent||OFF()||!on()||!S.name||(S.age|0)<8)return;S._csSent=1;let ep='';try{ep=typeof epithet==='function'?String(epithet()||''):''}catch(e){}
 api('castadd',{n:String(S.name).slice(0,20),w:WK()||'murim',tr:trOf(),e:ep.replace(/<[^>]+>/g,'').slice(0,30),a:S.age|0}).catch(()=>{})}catch(e){}}
function box(){try{const E0=$('end');if(!E0||E0.querySelector('.csEnd'))return;const d=document.createElement('div');d.className='csEnd';
 const draw=()=>{const off=OFF();d.innerHTML=`👤 <b>จักรวาลร่วม</b> · ${off?'ชื่อของคุณจะไม่ไปปรากฏในชีวิตผู้เล่นคนอื่น':'ตัวละครนี้อาจไปรับบทในชีวิตของผู้เล่นคนอื่น เป็นอาจารย์ คู่ปรับ หรือตำนาน ตามนิสัยที่คุณเล่น'} <button type="button" class="csB">${off?'✅ อนุญาตให้ใช้ชื่อ':'🚫 ไม่ให้ใช้ชื่อฉัน'}</button> <button type="button" class="csB csEcB" onclick="echoOpen()">📬 เสียงสะท้อน</button>`;badge();
  d.querySelector('.csB').onclick=()=>{const v=!OFF();try{LS.set('murim_castOff',v?1:0)}catch(e){}try{api(v?'castoff':'caston',{}).catch(()=>{})}catch(e){}if(!v){S._csSent=0;send()}draw()}};draw();
 const at=E0.querySelector('.auEnd')||E0.querySelector('.hkEnd')||E0.querySelector('.lfEnd')||E0.querySelector('h2,h3,.big');if(at)at.insertAdjacentElement('afterend',d);else E0.appendChild(d)}catch(e){console.error('cast box',e)}}
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);setTimeout(flush,900);setTimeout(send,1200);setTimeout(box,1300);setTimeout(()=>eLoad(true),2500);return r}}

const css=document.createElement('style');css.textContent=`.csTag{display:inline-block;margin-top:6px;font-size:11px;padding:2px 8px;border-radius:10px;background:rgba(124,207,255,.14);border:1px solid rgba(124,207,255,.55);color:#bfe6ff}
.csQ{display:block;margin:6px 0;padding:6px 10px;border-left:3px solid #ff9a6b;background:#ffffff0a;border-radius:6px;font-style:normal;font-size:13px}
.csN{display:inline-block;padding:0 6px;border-radius:8px;background:#ff5a6b;color:#fff;font-size:11px;font-weight:800;animation:auPulse2 1.4s infinite}
.csSt{padding:10px;border-radius:12px;background:linear-gradient(135deg,#1c2350,#2a1640);border:1px solid #9a7cff88;margin-bottom:10px;font-size:13px;line-height:1.6}.csRk{font-size:18px;font-weight:800;color:#ffe9a8;margin-bottom:2px}
.csCard{margin:8px 0;padding:10px 12px;border-radius:12px;background:#ffffff0a;border:1px solid #ffffff22;opacity:0;animation:csIn .45s ease forwards}.csCard.nw{border-color:#ffd76a;box-shadow:0 0 12px #ffd76a44}
.csCard.c_myth{background:linear-gradient(135deg,#3a2f1288,#1a1426aa)}.csCard.c_bad{background:linear-gradient(135deg,#3a121a88,#1a1020aa)}.csCard.c_good{background:linear-gradient(135deg,#123a2288,#101a1aaa)}.csCard.xx{border-color:#ff7a5a;box-shadow:0 0 16px #ff7a5a55}
@keyframes csIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}@keyframes auPulse2{50%{opacity:.6}}
.csH{font-size:13px}.csH span{float:right;font-size:11px;opacity:.75}.csH i{color:#ffd76a;font-style:normal}.csT{margin:6px 0;font-size:14px;line-height:1.6}.csP{color:#ffe9a8}.csF{font-size:11px;opacity:.7}
.csA{margin-top:6px;display:flex;gap:6px;flex-wrap:wrap}.csB2{padding:5px 10px;border-radius:9px;border:1px solid #ffffff44;background:#ffffff12;color:#fff;cursor:pointer;font-size:12px}.csB2:hover{background:#ffffff22}
.csEnd{margin:8px 0;padding:8px 12px;border-radius:12px;border:1px solid #7ccfff55;background:#0e1a2acc;color:#dff1ff;font-size:13px;line-height:1.6}.csB{margin-left:6px;padding:3px 10px;border-radius:9px;border:1px solid #7ccfff88;background:#7ccfff22;color:#dff1ff;cursor:pointer;font-size:12px}`;document.head.appendChild(css);
window._cast={R,CB,tick,load,send,who,st,flush,eLoad,eOpen,reward,_setE:e=>{EC=e;ECt=Date.now();badge()},_set:c=>{C=c;Ct=Date.now()}};
try{wReady('cast')}catch(e){}
})()}catch(e){console.error('cast.js',e)}
