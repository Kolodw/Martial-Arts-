// ============================================================
// /w/rmc.js 💞 เส้นทางรัก — ความรักเป็นเรื่องหลักของชีวิตนี้ (ทุกโลกยกเว้นแฟนตาซีที่มีฮาเร็มของตัวเอง และร่างสัตว์)
//  เปิดได้ 2 ทาง: ชิป "💞 เส้นทางรัก" ที่หน้าเลือกโลก (ชีวิตถัดไป) · เมนู ☰ → 💞 เส้นทางรัก (ชีวิตนี้ ถ้าอายุยังไม่เกิน 40)
//  - คนที่จีบได้ 3–5 คนต่อชีวิต: นิสัย · ของที่ชอบ/ไม่ชอบ (ต้องเดตถึงรู้) · ความลับ 1 อย่าง · ความสัมพันธ์ 4 แกน (ชอบ ไว้ใจ หึง เคารพ)
//  - เหตุการณ์: พบกัน · เดต · หึง · ความลับแตก · สารภาพ (ดวลวาทะ) · ทะเลาะ/ง้อ · ปัญหาเฉพาะโลก · ขอแต่งงาน · มือที่สาม · ความทรงจำเล็กๆ
//  - แต่งงานใช้ระบบคู่ครองเดิมของแต่ละโลก (ยุทธภพ marry · ยุคปัจจุบัน M.sp · ฟ้า/หมอก S.spouse) · ไม่ทำซ้ำสมุดคนงาม/แอปหาคู่ใน love.js
//  - สถานะ S._rp = {on, P:[คน], mem:[ความทรงจำ], dy, pref}
// ============================================================
try{(function(){if(window._rmc)return;
const rnd=Math.random,pk=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v)),R=(a,b)=>a+Math.floor(rnd()*(b-a+1));
const E=s=>{try{return esc(String(s))}catch(e){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}};
const F=n=>{try{return fmt(Math.round(n))}catch(e){return String(Math.round(n))}};
const WK=()=>{try{if(!S)return'';if(S.beastMode&&!S.beastMode.human)return'beast';if(S.mw){if(S.mw.ani)return'ani';if(S.mw.fan)return'fan';if(S.mw.fog)return'fog';if(S.mw.sky)return'sky';return'mw'}if(S.ch==='soul')return'soul';if(S.ch==='regress')return'loop';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'};
const GRP=()=>({murim:'east',xian:'east',god:'east',loop:'east',soul:'east',mw:'mw',sky:'sky',fog:'fog'})[WK()]||'';
const RP=()=>S&&S._rp;
const on=()=>!!(S&&S.alive&&RP()&&RP().on&&GRP()&&(typeof loveOpt!=='function'||loveOpt()!=='off'));
const say=(t,c)=>{try{log(t,c||'')}catch(e){}};
const J=d=>{try{joy(d)}catch(e){}return d?` <span class="tag2">${d>0?'😊':'😞'} ${d>0?'+':''}${d}</span>`:''};
const cur=()=>{const g=GRP();return g==='east'?' ตำลึง':''};
const M0=()=>{const g=GRP();return Math.max(g==='east'?120:6000,Math.round((S.money||0)*.05))};
const pay=v=>{v=Math.round(v);if((S.money||0)<v)return false;S.money-=v;return true};
// ---------- ข้อมูลแต่ละโลก ----------
const NAM={east:{m:['หลินเฟิง','เว่ยฉาง','ม่อเสวียน','ไป๋หลาง','เจียงหลิว','หานเยว่','กู้หราน','เย่ชิง','ฉินมู่','หลัวจื่อเฉิน','ถังหยวน','ซ่งหมิงเย่'],f:['ซูเหยียน','หลิวหลิง','เยว่หรู','ฉินเอ๋อร์','ไป๋ซือ','เหลียนฮวา','ม่อหลาน','ถังซิน','เสวี่ยอิง','หลินเยว่เอ๋อร์','ฟางชิง','หยุนเสียว']},
 mw:{m:['ภูมิ','กันต์','ท็อป','ต้น','ปาล์ม','ไอซ์','กาย','ฟิล์ม','เจมส์','นนท์','บิว','เต้'],f:['พลอย','มิว','ใบเตย','แพรว','มายด์','ฝ้าย','เนย','ปริม','ข้าวหอม','จูน','แพร','ออม']},
 sky:{m:['เคน','ทิว','ไรอัน','ภาคิน','โซล','อาร์ม','คิริน','ธาม'],f:['ลูน่า','ไอซ์','มีรา','ปิ่น','เอวา','ซีน','ฟ้าใส','นาริน']},
 fog:{m:['ลูเซียน','ออสวัลด์','เอ็ดการ์','ไซลัส','ธีโอดอร์','อาเธอร์','เซบาสเตียน','ฟินน์'],f:['ไวโอเล็ต','เอเวอลีน','คลารา','อิโมเจน','เอลีนอร์','โรสลิน','แอดา','ฮาร์เปอร์']}};
const ORG={east:['ศิษย์สำนักข้างเคียงที่เจอกันตอนแย่งสมุนไพร','บุตรหลานพ่อค้าใหญ่ที่คุณช่วยไว้จากโจรป่า','หมอหญิง/หมอหนุ่มที่รักษาแผลให้คุณฟรี','นักดนตรีพเนจรที่เล่นพิณอยู่หน้าโรงเตี๊ยม','ทายาทสำนักคู่อริที่ประลองแพ้คุณ','คนเฝ้าหอคัมภีร์ที่ชอบไล่คุณออกตอนดึก'],
 mw:['เพื่อนร่วมงานแผนกข้างๆ ที่ยืมที่ชาร์จคุณไม่เคยคืน','บาริสต้าร้านประจำที่เขียนชื่อคุณผิดทุกวัน','เพื่อนสมัยมัธยมที่เจอกันอีกครั้งในงานแต่งเพื่อน','คนที่ทักผิดแชทมาแล้วคุยกันต่อจนเช้า','เพื่อนบ้านห้องตรงข้ามที่ฝากรับพัสดุ','คู่แข่งในการประกวดที่ได้รองชนะเลิศ'],
 sky:['นักล่ายีนที่ช่วยคุณจากอสูรกลายพันธุ์','วิศวกรซ่อมเกราะที่บ่นทุกครั้งที่เกราะคุณพัง','หมอสนามประจำหน่วยที่เย็บแผลให้คุณ','เด็กนอกกำแพงที่ขายแผนที่ทางลับ','นักบินโดรนที่ชอบแข่งความเร็วกับคุณ'],
 fog:['ผู้ต้องสงสัยในคดีแรกของคุณที่บริสุทธิ์จริงๆ','นักข่าวหนังสือพิมพ์ที่ตามสัมภาษณ์คุณ','นักเปียโนประจำโรงแรมที่ร้องเพลงเศร้าทุกคืน','ช่างนาฬิกาที่ซ่อมนาฬิกาพกให้คุณ','ทายาทขุนนางที่แอบหนีออกมาเที่ยวกลางคืน']};
const PLACE={east:{q:'ศาลาริมทะเลสาบยามเย็น',f:'โรงเตี๊ยมเป็ดย่างขึ้นชื่อ',a:'ล่าสัตว์อสูรด้วยกันในป่าลึก',c:'งานเทศกาลโคมไฟ',l:'หอชมจันทร์ของขุนนาง',n:'ทุ่งดอกท้อหลังเขา'},
 mw:{q:'คาเฟ่เงียบๆ ที่มีแมว',f:'ตระเวนกินสตรีทฟู้ดเยาวราช',a:'ปีนเขาดูทะเลหมอก',c:'คอนเสิร์ตวงที่ชอบ',l:'ดินเนอร์ร้านบนดาดฟ้า',n:'แคมป์ปิ้งดูดาว'},
 sky:{q:'ดาดฟ้ากำแพงคืนฝนดาวตก',f:'ร้านบะหมี่ใต้กำแพง',a:'ลาดตระเวนนอกกำแพงด้วยกัน',c:'โรงหนังเก่าชั้นนอก',l:'ภัตตาคารเมืองชั้นใน',n:'สวนพฤกษ์ใต้โดมแก้ว'},
 fog:{q:'ร้านหนังสือเก่าตอนฝนพรำ',f:'ร้านพายริมท่าเรือ',a:'ตามสืบคดีด้วยกันกลางดึก',c:'โรงละครโอเปร่า',l:'งานเต้นรำของขุนนาง',n:'นั่งเรือในแม่น้ำตอนหมอกจาง'}};
const PIC={q:'🍵',f:'🍜',a:'⚔️',c:'🏮',l:'💎',n:'🌸'};
const FAC={east:'สำนักศัตรู',mw:'บริษัทคู่แข่ง',sky:'กลุ่มค้ายีนเถื่อน',fog:'สมาคมลับใต้ท่อไอน้ำ'};
// นิสัย: [ไอคอน, ชื่อ, ชอบ, ไม่ชอบ, คำสารภาพ, ตอนหึง]
const ARCH=[['😤','ปากแข็งใจอ่อน',['a','f'],'l','"ไม่ได้ชอบเจ้าหรอกนะ แค่… ไม่อยากให้ใครอื่นได้เจ้าไปก็เท่านั้น"','ทำเป็นไม่สนใจ แต่เดินกระแทกเท้าเสียงดังทั้งวัน'],
 ['🌷','อ่อนโยน',['q','n'],'a','"ทุกวันที่ได้อยู่ข้างเจ้า เป็นวันที่ดีที่สุดของข้า"','ยิ้มเศร้าๆ แล้วถามเบาๆ ว่า "คนนั้นทำให้เจ้ามีความสุขกว่าหรือ"'],
 ['🦊','เจ้าเล่ห์',['l','c'],'q','"ข้าวางแผนมาทุกอย่างในชีวิต ยกเว้นการตกหลุมรักเจ้า"','วางแผนให้คู่แข่งหัวใจขายหน้ากลางงานเลี้ยง'],
 ['🙈','ขี้อาย',['q','c'],'l','(เขียนจดหมายยาวสามหน้า แต่พูดออกมาได้แค่) "ช…ชอบ"','หายหน้าไปสามวัน กลับมาพร้อมตาบวม'],
 ['🔥','ทะเยอทะยาน',['l','a'],'n','"ข้าอยากไปให้สูงที่สุด และอยากให้คนที่ยืนข้างข้าตอนนั้นคือเจ้า"','ท้าคู่แข่งหัวใจประลองต่อหน้าทุกคน'],
 ['☀️','ร่าเริง',['f','c'],'q','"ชอบมากๆ เลย! …เดี๋ยว อันนี้พูดออกไปแล้วเหรอ"','ร่าเริงเกินจริงจนทุกคนรู้ว่าเสียใจ'],
 ['❄️','เย็นชา',['n','q'],'c','"…อย่าไปไหนอีก" (แค่นั้น แต่มือสั่น)','เงียบหนักกว่าเดิม แล้วไม่ตอบข้อความคุณหนึ่งเดือน'],
 ['🖤','รักแรงหวงแรง',['l','f'],'a','"เจ้าเป็นของข้าคนเดียว ตลอดไป"','ตามดูทุกที่ที่คุณไป และถามชื่อทุกคนที่คุณคุยด้วย']];
// ความลับ: [id, ข้อความ, หนัก?]
const SEC=[['spy','เป็นคนของ{fac} ถูกส่งมาเข้าใกล้คุณตั้งแต่วันแรก',1],['ill','ป่วยหนัก หมอบอกว่าเหลือเวลาไม่กี่ปี',1],['past','จำคุณได้จากชาติก่อน — ในชาตินั้นคุณสองคนไม่ได้อยู่ด้วยกัน',0],
 ['debt','ติดหนี้ก้อนใหญ่ มีคนตามทวงทุกเดือน',1],['heir','เป็นทายาทตระกูลใหญ่ที่หนีการคลุมถุงชนออกมา',0],['kid','มีลูกหนึ่งคนที่ฝากญาติเลี้ยงไว้ในเมืองอื่น',0],
 ['diary','แอบเขียนบันทึกเรื่องคุณทุกวัน มีสิบเล่มแล้ว',0],['fiance','มีคู่หมั้นที่ครอบครัวจัดไว้ตั้งแต่เด็ก',1],['guilt','เคยทำร้ายคนที่คุณรักโดยไม่ตั้งใจเมื่อนานมาแล้ว',1]];
const ST={meet:'👋 เพิ่งรู้จัก',friend:'🙂 เพื่อน',crush:'💓 ใจเต้น',date:'💞 คบกัน',eng:'💍 หมั้น',wed:'💒 แต่งงาน',ex:'💔 เลิกกัน',gone:'🕯️ จากไป',left:'🚪 จากไปแล้ว'};
// ---------- คน ----------
function prefG(){const p=RP().pref||'opp';const me=S.gender||'ชาย';return p==='both'?pk(['m','f']):p==='same'?(me==='หญิง'?'f':'m'):(me==='หญิง'?'m':'f')}
function mk(){const g=GRP(),X=RP(),sex=prefG();let n,i=0;do{n=pk(NAM[g][sex])}while(++i<30&&X.P.some(p=>p.n===n));const uA=X.P.map(p=>p.ai),uS=X.P.map(p=>p.sec),uO=X.P.map(p=>p.org);const a=pk(ARCH.filter((x,i)=>!uA.includes(i)).concat(uA.length>=ARCH.length?ARCH:[])),sc=pk(SEC.filter(x=>!uS.includes(x[0])).concat(uS.length>=SEC.length?SEC:[]));const orgs=ORG[g].filter(o=>!uO.includes(o));
 const likes=a[2].slice();const all=Object.keys(PIC).filter(k=>!likes.includes(k)&&k!==a[3]);if(rnd()<.5)likes.push(pk(all));
 return{n,sex,ai:ARCH.indexOf(a),org:pk(orgs.length?orgs:ORG[g]),aff:R(5,20),tr:R(10,30),jl:0,rs:R(10,30),st:'meet',likes,dis:a[3],kn:{},sec:sc[0],secK:0,a0:S.age,g,dates:0}}
const A=p=>ARCH[p.ai]||ARCH[0];
const NM=p=>`${A(p)[0]} <b>${E(p.n)}</b>`;
const live=()=>(RP().P||[]).filter(p=>!['gone','left','ex'].includes(p.st));
const mine=()=>(RP().P||[]).find(p=>['date','eng','wed'].includes(p.st));
function secT(p){const s=SEC.find(x=>x[0]===p.sec);return s?s[1].replace('{fac}',FAC[p.g]||'ฝ่ายตรงข้าม'):''}
function mem(t){const X=RP();X.mem=(X.mem||[]);X.mem.push({a:S.age,t:String(t).replace(/<[^>]+>/g,'').slice(0,80)});if(X.mem.length>24)X.mem.splice(0,X.mem.length-24)}
function bump(p,o){for(const k in o)p[k]=cl((p[k]||0)+o[k],0,100);
 if(p.st==='meet'&&p.aff>=25)p.st='friend';if(p.st==='friend'&&p.aff>=50)p.st='crush'}
function bar(v,c){return `<span style="display:inline-block;width:46px;height:5px;border-radius:3px;background:#ffffff1a;vertical-align:middle"><i style="display:block;height:100%;width:${v}%;border-radius:3px;background:${c}"></i></span>`}
// ---------- แต่งงานด้วยระบบของโลกนั้น ----------
function wed(p){p.st='wed';p.wy=S.age;const g=GRP();try{if(g==='east'&&typeof marry==='function'&&!S.spouse)marry(p.n,'เข้าพิธีแต่งงานกับ');else if(g==='mw'&&S.mw&&!S.mw.sp)S.mw.sp={n:p.n,y:S.mw.y||0,k:0};else if(!S.spouse)S.spouse=p.n}catch(e){}mem(`แต่งงานกับ ${p.n}`)}
function unwed(p){try{if(S.spouse===p.n){S.spouse=null;S.spouseP=null}if(S.mw&&S.mw.sp&&S.mw.sp.n===p.n)S.mw.sp=null}catch(e){}}
// ---------- เหตุการณ์ ----------
function evMeet(){const X=RP(),p=mk();X.P.push(p);const g=GRP();
 const how={east:['ชนกันกลางตลาดจนของในมือหล่นกระจาย','ยืมร่มกันใต้ชายคาตอนฝนตกหนัก','แย่งซื้อขนมชิ้นสุดท้ายในร้านเดียวกัน','ช่วยกันจับขโมยที่วิ่งผ่าน'],mw:['หยิบหนังสือเล่มเดียวกันในร้าน','ติดลิฟต์ด้วยกันสองชั่วโมง','แอปส่งอาหารส่งออเดอร์สลับกัน','นั่งข้างกันบนเครื่องบินที่ดีเลย์'],sky:['ติดอยู่ในหลุมหลบภัยเดียวกันตอนฝนดาวตก','ต่อคิวรับเสบียงหน้ากำแพง','ถูกจับคู่ทำภารกิจด้วยกันโดยระบบสุ่ม'],fog:['หลบหมอกเข้าร้านกาแฟเดียวกัน','ทำร่มปลิวไปติดหน้าต่างบ้านเขา','ถูกเข้าใจผิดว่าเป็นคู่รักในงานเลี้ยง']}[g];
 choice(`💞 พบใครบางคน`,`คุณกับ${NM(p)} — ${E(p.org)} — ${pk(how)}<br><span class="tag2">นิสัย: ${A(p)[1]}</span>`,[
  {t:'😊 ชวนคุยต่อ',s:'',f(){bump(p,{aff:10,rs:4});say(`💞 คุยกับ${NM(p)}จนลืมเวลา ${pk(['เขาหัวเราะเสียงดังกว่าที่คิด','เขาจำชื่อคุณได้ตั้งแต่ครั้งแรก','เขาบอกว่าไม่เคยคุยกับใครได้นานขนาดนี้'])}${J(3)}`);mem(`พบ ${p.n} ครั้งแรก`)}},
  {t:'😎 ทำเป็นไม่สนใจ',s:'บางคนชอบแบบนี้',f(){const ok=[0,4,6].includes(p.ai);bump(p,{aff:ok?14:2,rs:ok?6:-2});say(ok?`😎 ${NM(p)}มองตามคุณไปจนสุดถนน`:`😎 ${NM(p)}ยักไหล่แล้วเดินจากไป`)}},
  {t:'🙅 ไม่สนใจจริงๆ',s:'',f(){p.st='left';say(`🙅 คุณกับ${NM(p)}เป็นแค่คนแปลกหน้าที่เดินสวนกัน`)}}])}
function evDate(p,fromHub){const g=GRP(),P0=PLACE[g],ks=Object.keys(P0).sort(()=>rnd()-.5).slice(0,4);RP().dy=S.age;
 choice(`🌹 เดตกับ ${p.n}`,`${NM(p)} ${pk(['ยืนรอคุณก่อนเวลานัดสิบนาที','มาสายแต่ถือดอกไม้มาด้วย','แต่งตัวดีกว่าทุกวันจนคุณจำแทบไม่ได้'])} — จะพาไปที่ไหน?<br><span class="tag2">${Object.keys(p.kn).length?'รู้แล้วว่าเขา'+Object.keys(p.kn).map(k=>(p.kn[k]>0?'ชอบ ':'ไม่ชอบ ')+PIC[k]).join(' · '):'ยังไม่รู้ว่าเขาชอบอะไร ลองดูก่อน'}</span>`,
 ks.map(k=>({t:`${PIC[k]} ${P0[k]}`,s:'',f(){p.dates++;const lv=p.likes.includes(k),hate=p.dis===k;p.kn[k]=lv?1:hate?-1:0;
  if(lv){bump(p,{aff:14,tr:6});say(`🌹 ${P0[k]} — ${NM(p)}${pk(['ยิ้มทั้งวัน','จับมือคุณตอนเดินกลับ','พูดว่า "ที่นี่ใช่เลย" สามรอบ'])} <span class="tag2">💗 ชอบที่นี่มาก</span>${J(6)}`,'good');mem(`เดตที่${P0[k]}กับ ${p.n}`)}
  else if(hate){bump(p,{aff:-8,rs:-4});say(`🌧️ ${P0[k]} — ${NM(p)}${pk(['พยายามยิ้มแต่ดูออกว่าอึดอัด','ขอตัวกลับก่อน','เงียบตลอดทาง'])} <span class="tag2">💔 ไม่ชอบที่แบบนี้</span>`)}
  else{bump(p,{aff:6});say(`🌤️ ${P0[k]} — ${NM(p)}ดูสนุกดี แต่ไม่ถึงกับประทับใจ`)}
  if(g==='east'&&k==='a'||g!=='east'&&k==='a'&&rnd()<.3)S.hp=Math.max(1,S.hp-Math.round((S.maxHp||100)*.08))}})))}
function evJeal(){const p=mine()||live().sort((a,b)=>b.aff-a.aff)[0];if(!p)return false;const o=live().find(x=>x!==p&&x.aff>=20);
 if(o&&rnd()<.6){bump(p,{jl:25,tr:-6});return choice(`😠 ${p.n} เห็นคุณกับ ${o.n}`,`${NM(p)}เห็นคุณหัวเราะกับ${NM(o)} — ${A(p)[5]}`,[
  {t:`💬 อธิบายกับ ${p.n}`,s:'ดวลวาทะ',f(){talk('😠','อธิบายให้คนรักเข้าใจ',p.n,'เขากอดอกรอฟัง',w=>{if(w){bump(p,{jl:-25,tr:8});say(`💬 ${NM(p)}ถอนหายใจ "…ครั้งนี้ยกโทษให้"`)}else{bump(p,{aff:-10,tr:-10});say(`💬 ${NM(p)}ไม่เชื่อคำพูดคุณสักคำ`)}})}},
  {t:`💐 เลือก ${o.n} แทน`,s:'',f(){if(['date','eng','wed'].includes(p.st)){unwed(p);p.st='ex';say(`💔 คุณเลือก${NM(o)} ${NM(p)}เดินออกไปโดยไม่หันกลับมา${J(-6)}`,'bad');mem(`เลิกกับ ${p.n}`)}bump(o,{aff:15});if(o.st!=='date'&&o.aff>=50)o.st='crush'}},
  {t:'🤷 ปล่อยไว้ ไม่ใช่เรื่องใหญ่',s:'',f(){bump(p,{jl:15,tr:-8});say(`🤷 ${NM(p)}ไม่พูดถึงมันอีก แต่คุณเห็นว่าเขาเก็บมันไว้`)}}])}
 // มีคนอื่นมาจีบเขา
 const rv=pk(NAM[GRP()][pk(['m','f'])]);bump(p,{});return choice(`🥀 มีคนมาจีบ ${p.n}`,`<b>${E(rv)}</b> ส่งดอกไม้ให้${NM(p)}ทุกวันมาหนึ่งเดือนแล้ว และวันนี้ประกาศต่อหน้าทุกคน`,[
  {t:'🗣️ ประกาศกลับให้ชัด',s:'',f(){const ok=p.aff+p.rs>=90;bump(p,{aff:ok?12:-4,rs:ok?10:-6});say(ok?`🗣️ ${NM(p)}เดินมายืนข้างคุณต่อหน้าทุกคน${J(8)}`:`🗣️ ${NM(p)}หน้าแดงด้วยความอาย "อย่าทำแบบนี้ต่อหน้าคนอื่นสิ"`)}},
  {t:'🤝 ให้เขาเลือกเอง',s:'',f(){const ok=p.aff>=55;bump(p,{rs:10,tr:6});if(ok)say(`🤝 ${NM(p)}ปฏิเสธ${E(rv)} "ข้ามีคนที่ชอบแล้ว"${J(6)}`,'good');else{p.st='left';say(`🥀 ${NM(p)}ตอบรับ${E(rv)} คุณยิ้มให้ทั้งคู่ แล้วกลับบ้านคนเดียว${J(-8)}`,'bad');mem(`${p.n} เลือกคนอื่น`)}}}])}
function evSecret(p){p.secK=1;const g=GRP();const t=secT(p);mem(`รู้ความลับของ ${p.n}`);
 const O={spy:[{t:'🛡️ ให้เขาเลือกข้างใหม่',s:'',f(){if(p.aff>=55){bump(p,{tr:20});say(`🛡️ ${NM(p)}ร้องไห้ "ข้าเลือกเจ้าตั้งนานแล้ว" แล้วตัดขาดกับ${FAC[g]}${J(8)}`,'epic')}else{p.st='left';say(`🕳️ คืนนั้น${NM(p)}หายไป พร้อมเอกสารสำคัญบางอย่างของคุณ${J(-10)}`,'bad');try{S.money=Math.round((S.money||0)*.85)}catch(e){}}}},{t:'🚪 ไล่ไป',s:'',f(){unwed(p);p.st='left';say(`🚪 คุณไล่${NM(p)}ไป ใจยังเจ็บอยู่หลายปี${J(-8)}`,'bad')}}],
  ill:[{t:`💊 หาหมอที่ดีที่สุด (${F(M0()*6)}${cur()})`,s:'',f(){if(!pay(M0()*6))return say('💊 เงินไม่พอ…');if(rnd()<.6){p.secK=2;say(`💊 ${NM(p)}หายเป็นปกติ หมอบอกว่าปาฏิหาริย์${J(15)}`,'myth')}else{p.cure=0;say(`💊 ซื้อเวลาได้อีกหลายปี แต่ยังรักษาไม่หาย`)}}},{t:'🫂 อยู่ข้างเขาทุกวันที่เหลือ',s:'',f(){bump(p,{aff:15,tr:15});p.dieAt=S.age+R(2,6);say(`🫂 ${NM(p)}หัวเราะทั้งน้ำตา "งั้นอย่าเสียเวลาเศร้าเลย"`,'epic')}}],
  past:[{t:'🌙 "ชาตินี้จะไม่ปล่อยมือ"',s:'',f(){bump(p,{aff:20,tr:20});say(`🌙 ${NM(p)}จับมือคุณแน่นเหมือนกลัวจะหายไปอีก${J(10)}`,'myth')}}],
  debt:[{t:`💰 ช่วยใช้หนี้ (${F(M0()*4)}${cur()})`,s:'',f(){if(!pay(M0()*4))return say('💰 เงินไม่พอ…');bump(p,{tr:20,rs:10});say(`💰 ${NM(p)}สัญญาว่าจะคืนให้ทุกบาท และสิบปีต่อมาก็คืนจริง`,'good')}},{t:'⚖️ ให้เขาจัดการเอง',s:'',f(){bump(p,{rs:6,aff:-4});say(`⚖️ ${NM(p)}พยักหน้า แต่คืนนั้นนอนไม่หลับ`)}}],
  heir:[{t:'🏯 ไปพบครอบครัวเขาด้วยกัน',s:'ดวลวาทะ',f(){talk('🏯','ขอการยอมรับจากครอบครัวใหญ่',`ผู้ใหญ่ตระกูลของ${p.n}`,'ทั้งห้องเงียบกริบ',w=>{if(w){bump(p,{rs:15});S.money=(S.money||0)+M0()*5;say(`🏯 ครอบครัวยอมรับคุณ และมอบของขวัญชิ้นใหญ่${J(8)}`,'epic')}else{bump(p,{jl:10});say(`🏯 ครอบครัวไล่คุณกลับ ${NM(p)}เดินตามคุณออกมา`)}})}},{t:'🏃 หนีไปด้วยกัน',s:'',f(){bump(p,{aff:15,tr:10});say(`🏃 คุณสองคนเริ่มต้นใหม่ในเมืองที่ไม่มีใครรู้จัก`,'epic')}}],
  kid:[{t:'👶 "พาเขามาอยู่ด้วยกันเถอะ"',s:'',f(){bump(p,{aff:20,tr:20});try{S.kids=(S.kids|0)+1}catch(e){}say(`👶 เด็กคนนั้นเรียกคุณว่า "อีกคน" อยู่ครึ่งปี ก่อนจะเรียกเหมือนพ่อแม่${J(10)}`,'epic')}},{t:'😶 ขอเวลาคิด',s:'',f(){bump(p,{tr:-10});say(`😶 ${NM(p)}เข้าใจ แต่ระยะห่างเกิดขึ้นแล้ว`)}}],
  diary:[{t:'📖 ขออ่านสักเล่ม',s:'',f(){bump(p,{aff:10});say(`📖 เล่มแรกเขียนว่า "วันนี้เจอคนที่ชนข้าแล้วไม่ขอโทษ น่ารำคาญที่สุด" เล่มที่สิบเขียนว่า "ถ้าเขาอ่านอยู่ — ข้าชอบเจ้า"${J(8)}`,'epic')}}],
  fiance:[{t:'⚔️ ไปเจอคู่หมั้นเขาตรงๆ',s:'',f(){const w=rnd()<.55;bump(p,w?{aff:12,rs:10}:{tr:-10});say(w?`⚔️ คู่หมั้นคนนั้นยอมถอนหมั้นเอง "ข้าก็มีคนที่รักเหมือนกัน"`:`⚔️ เรื่องบานปลาย ทั้งสองครอบครัวไม่พอใจคุณ`)}},{t:'🤐 รอให้เขาเลือก',s:'',f(){if(p.aff>=60){bump(p,{tr:15});say(`🤐 ${NM(p)}ถอนหมั้นด้วยตัวเอง แล้วมาเคาะประตูบ้านคุณตอนตีสอง${J(8)}`,'epic')}else{p.st='left';say(`🤐 ${NM(p)}แต่งงานตามที่ครอบครัวจัด คุณไปงานในฐานะเพื่อน${J(-10)}`,'bad')}}}],
  guilt:[{t:'🕊️ ให้อภัย',s:'',f(){bump(p,{tr:25,aff:10});try{S.karma=(S.karma||0)+8}catch(e){}say(`🕊️ ${NM(p)}ทรุดลงร้องไห้เหมือนแบกมันมาทั้งชีวิต`,'epic')}},{t:'💔 รับไม่ได้',s:'',f(){unwed(p);p.st='ex';say(`💔 คุณเดินจากไป บางเรื่องรักก็ลบไม่ได้${J(-12)}`,'bad')}}]};
 choice(`🔐 ความลับของ ${p.n}`,`${NM(p)}${pk(['ขอคุยตอนดึก','ยื่นจดหมายให้แล้วรีบเดินหนี','พูดออกมากลางมื้อเย็นจนช้อนตก'])}: "${t}"`,O[p.sec]||[{t:'🫂 รับฟัง',s:'',f(){bump(p,{tr:10})}}])}
function evConfess(p){const a=A(p);choice(`💌 ${p.n} อยากคุยด้วย`,`${NM(p)}: ${a[4]}`,[
  {t:'💞 "ข้าก็ชอบเจ้า"',s:'',f(){p.st='date';bump(p,{aff:10,tr:10});say(`💞 ${NM(p)}กับคุณ คบกันแล้ว${J(12)}`,'myth');mem(`เริ่มคบกับ ${p.n}`)}},
  {t:'🗣️ พูดความในใจให้ถึงใจ',s:'ดวลวาทะ · ถ้าชนะความสัมพันธ์แน่นขึ้นมาก',f(){talk('💌','สารภาพรัก',p.n,'ลมพัดเบาๆ ใจเต้นแรง',w=>{p.st='date';bump(p,w?{aff:20,tr:20,rs:10}:{aff:8});say(w?`🗣️ ทุกคำของคุณทำให้${NM(p)}น้ำตาไหล คบกันแล้ว${J(15)}`:`🗣️ คุณพูดตะกุกตะกักจน${NM(p)}หัวเราะ "พอแล้ว ข้าเข้าใจ" คบกันแล้ว${J(10)}`,'myth');mem(`เริ่มคบกับ ${p.n}`)})}},
  {t:'🙏 ขอเป็นเพื่อนเหมือนเดิม',s:'',f(){p.st='friend';bump(p,{aff:-15});say(`🙏 ${NM(p)}ยิ้มฝืนๆ "อืม… เพื่อนกัน"${J(-3)}`)}}])}
function evFight(p){const why=pk(['ลืมวันสำคัญของเขา','ทำงานจนไม่มีเวลาให้','พูดถึงคนเก่าโดยไม่ตั้งใจ','ตัดสินใจเรื่องใหญ่โดยไม่ถามเขา','เขาเห็นข้อความที่คุณไม่ได้ตอบ']);
 choice(`⛈️ ทะเลาะกับ ${p.n}`,`ทั้งหมดเริ่มจากคุณ${why} แล้วเรื่องเล็กก็กลายเป็นเรื่องใหญ่`,[
  {t:'🗣️ ง้อด้วยคำพูด',s:'ดวลวาทะ',f(){talk('⛈️','ง้อคนรัก',p.n,'เขาหันหลังให้',w=>{bump(p,w?{tr:10,aff:6}:{tr:-8});say(w?`🗣️ ${NM(p)}หันกลับมากอดคุณแน่น`:`🗣️ ${NM(p)}ขอเวลาอยู่คนเดียวสักพัก`)})}},
  {t:`🎁 ของขวัญ (${F(M0())}${cur()})`,s:'',f(){if(!pay(M0()))return say('🎁 เงินไม่พอ…');const ok=[2,4,7].includes(p.ai);bump(p,{aff:ok?12:4});say(ok?`🎁 ${NM(p)}ใจอ่อนทันที`:`🎁 ${NM(p)}รับไว้ "ข้าไม่ได้อยากได้ของ ข้าอยากได้คำขอโทษ"`)}},
  {t:'🚪 "งั้นเลิกกันเถอะ"',s:'',f(){unwed(p);p.st='ex';say(`💔 ประโยคเดียวที่พูดตอนโกรธ ทำให้ทุกอย่างจบลง${J(-10)}`,'bad');mem(`เลิกกับ ${p.n}`)}}])}
function evWorld(p){const g=GRP(),w=WK();let T,o;
 if(g==='east'){T=[`⚔️ ${p.n} ถูกเรียกตัว`,`สำนักของ${NM(p)}ประกาศสงครามกับสำนักของคุณ เขาถูกสั่งให้เลือกข้าง`];o=[{t:'🗡️ ทิ้งสำนักไปด้วยกัน',s:'',f(){bump(p,{aff:15,tr:15});try{S.fame=Math.max(0,(S.fame||0)-200)}catch(e){}say(`🗡️ คุณสองคนกลายเป็นคนนอกยุทธภพ แต่ไม่เคยเสียใจ`,'epic');mem(`ทิ้งสำนักไปกับ ${p.n}`)}},{t:'🕊️ เจรจาสงบศึกระหว่างสองสำนัก',s:'ดวลวาทะ',f(){talk('🕊️','เจรจาสงบศึก','เจ้าสำนักทั้งสอง','ดาบยังไม่เก็บเข้าฝัก',r=>{bump(p,r?{rs:20,aff:10}:{tr:-5});say(r?'🕊️ สงครามจบก่อนเริ่ม ทั้งสองสำนักจดชื่อคุณไว้':'🕊️ สงครามเกิดขึ้น คุณสองคนต้องแอบพบกันกลางดึก')})}},{t:'⚔️ อยู่ฝ่ายสำนักตัวเอง',s:'',f(){bump(p,{aff:-25,tr:-20});say(`⚔️ บนสนามรบ คุณกับ${NM(p)}ยืนอยู่คนละฝั่ง${J(-10)}`,'bad')}}]}
 else if(g==='mw'){const wx=S.mw&&S.mw.wx&&S.mw.wx.id;if(wx==='zombie'){T=[`🧟 ${p.n} ถูกกัด`,`แผลที่แขนของ${NM(p)}เริ่มเป็นสีม่วง เขาขอให้คุณทำสิ่งที่ต้องทำ`];o=[{t:'💉 ตามหาวัคซีนให้ได้',s:'เสี่ยง',f(){if(rnd()<.45){bump(p,{aff:20});say('💉 คุณได้เซรั่มทดลองมาทันเวลา แผลหายเหลือแค่รอยเป็น','myth')}else{p.st='gone';say(`🕯️ คุณมาไม่ทัน${J(-20)}`,'bad');mem(`เสีย ${p.n} ในโลกซอมบี้`)}}},{t:'🫂 อยู่ข้างเขาจนวินาทีสุดท้าย',s:'',f(){p.st='gone';say(`🫂 ${NM(p)}หลับไปบนตักคุณ ก่อนที่จะเปลี่ยนไป${J(-18)}`,'bad');mem(`อยู่กับ ${p.n} จนวินาทีสุดท้าย`)}}]}
  else{T=[`✈️ ${p.n} ได้งานต่างประเทศ`,`${NM(p)}ได้ข้อเสนองานในฝันที่อีกซีกโลก สัญญาห้าปี`];o=[{t:'✈️ ย้ายไปด้วยกัน',s:'',f(){bump(p,{aff:15});try{S.money=Math.round((S.money||0)*.9)}catch(e){}say('✈️ ชีวิตใหม่ในเมืองที่ไม่รู้ภาษา แต่มีกันและกัน','epic');mem(`ย้ายประเทศไปกับ ${p.n}`)}},{t:'📱 รักทางไกล',s:'',f(){p.ld=S.age;bump(p,{tr:rnd()<.6?10:-15});say('📱 วิดีโอคอลทุกคืนตีสองตามเวลาของคุณ')}},{t:'🙏 ขอให้เขาอยู่',s:'',f(){bump(p,p.ai===4?{aff:-20,rs:-10}:{aff:8,rs:-6});say(p.ai===4?`🙏 ${NM(p)}ไม่ยอม และเริ่มมองคุณเป็นกำแพง`:`🙏 ${NM(p)}ยอมอยู่ แต่บางคืนก็มองฟ้านานกว่าปกติ`)}}]}}
 else if(g==='sky'){T=[`🧱 ${p.n} ถูกส่งไปแนวหน้า`,`หน่วยของ${NM(p)}ถูกส่งไปอุดรอยร้าวกำแพงที่ไม่มีใครเคยกลับมา`];o=[{t:'🛡️ ขอไปด้วย',s:'เสี่ยง',f(){if(rnd()<.65){bump(p,{aff:15,rs:15});say('🛡️ คุณสองคนกลับมาพร้อมกัน ทั้งนครเรียกว่าคู่แห่งกำแพง','myth')}else{S.hp=Math.max(1,S.hp-Math.round((S.maxHp||100)*.35));say('🛡️ คุณกลับมาพร้อมแผลใหญ่ แต่เขารอด','bad')}}},{t:'💻 แฮ็กคำสั่งย้ายหน่วย',s:'',f(){bump(p,{tr:-5,aff:5});say('💻 คำสั่งถูกยกเลิก… และคนอื่นต้องไปแทน')}}]}
 else{T=[`🕵️ ${p.n} ถูกจับ`,`ตำรวจจับ${NM(p)}ในข้อหาฆาตกรรมคดีหมอก — หลักฐานทุกชิ้นชี้ไปที่เขา`];o=[{t:'🔎 สืบหาความจริงเอง',s:'',f(){if(rnd()<.6){bump(p,{tr:25});say('🔎 คุณพบรอยเท้าที่ตำรวจมองข้าม ฆาตกรตัวจริงคือคนที่ไม่มีใครคาด','myth')}else{bump(p,{tr:-10});say('🔎 ยิ่งสืบ หลักฐานยิ่งชี้ว่าเขาอาจทำจริง…')}}},{t:'⚖️ จ้างทนายที่ดีที่สุด',s:'',f(){if(!pay(M0()*4))return say('⚖️ เงินไม่พอ…');bump(p,{aff:10});say('⚖️ ศาลยกฟ้อง แต่คำถามยังค้างอยู่ในใจคุณ')}}]}
 choice(T[0],T[1],o)}
function evPropose(p){choice(`💍 ช่วงเวลานั้นมาถึงแล้ว`,`คุณกับ${NM(p)}คบกันมา ${S.age-(p.dy0||p.a0)} ปี — ${pk(['คืนนี้ฟ้าใสที่สุดของปี','เขากำลังหัวเราะกับเรื่องไร้สาระ','คุณซ่อนแหวนมาสามเดือนแล้ว'])}`,[
  {t:'💍 ขอแต่งงาน',s:'',f(){const ok=p.aff>=70&&p.tr>=45;if(ok){wed(p);say(`💒 ${NM(p)}ตอบตกลงก่อนคุณพูดจบประโยค งานแต่งเล็กๆ ที่ทุกคนร้องไห้${J(18)}`,'myth')}else{bump(p,{tr:-6});say(`💍 ${NM(p)}เงียบไปนาน "ขอเวลาอีกหน่อยนะ"`)}}},
  {t:'⏳ ยังไม่ถึงเวลา',s:'',f(){bump(p,{tr:4});say('⏳ คุณเก็บแหวนไว้ในกระเป๋าเหมือนเดิม')}}])}
function evMoment(p){const L=[`☔ ${NM(p)}เดินกางร่มให้คุณจนไหล่ตัวเองเปียกหมด`,`🍳 ${NM(p)}ทำอาหารไหม้ แต่คุณกินหมดจาน`,`🌙 คุณตื่นกลางดึกแล้วเห็น${NM(p)}มองคุณอยู่ "ไม่มีอะไร แค่อยากดู"`,`📝 คุณเจอโน้ตเล็กๆ จาก${NM(p)}ในกระเป๋า เขียนว่า "กินข้าวด้วย"`,`🎂 ${NM(p)}จำวันเกิดคุณได้ ทั้งที่คุณไม่เคยบอก`,`🎶 ${NM(p)}ร้องเพลงเพี้ยนทั้งเพลงแต่ไม่ยอมหยุด`];
 const t=pk(L);bump(p,{aff:4,tr:3});say(`💞 ${t}${J(4)}`,'good');if(rnd()<.4)mem(t)}
// ---------- ตัวเลือกเหตุการณ์ประจำปี ----------
function talk(ic,t,vs,intro,cb){try{if(typeof talkDuel==='function')return talkDuel({ic,t,vs,ev:1,intro,win:()=>'',lose:()=>''},r=>cb(!!r))}catch(e){}setTimeout(()=>cb(rnd()<.55),30)}
function pickEv(){const X=RP(),L=live(),m=mine();
 // คนรักป่วยจนถึงวัน
 const ill=(X.P||[]).find(p=>p.dieAt&&S.age>=p.dieAt&&p.st!=='gone');if(ill){ill.st='gone';unwed(ill);say(`🕯️ ${NM(ill)}จากไปอย่างสงบ มือยังกุมมือคุณอยู่${J(-20)}`,'bad');mem(`${ill.n} จากไป`);return true}
 const C=[];if(L.length<3&&S.age>=14&&S.age<=55)C.push(['meet',L.length?1:4]);
 L.forEach(p=>{if(p.st==='crush'&&p.aff>=60)C.push(['conf',4,p]);if(['friend','crush','date'].includes(p.st))C.push(['date',2,p]);if(!p.secK&&p.tr>=55)C.push(['sec',3,p]);
  if(p.st==='date'&&p.aff>=70&&p.tr>=40&&S.age-(p.dy0||p.a0)>=1)C.push(['prop',3,p]);if(['date','eng','wed'].includes(p.st)){C.push(['fight',p.jl>=40?3:1,p]);C.push(['world',1,p]);C.push(['mom',2,p])}});
 if(L.some(p=>p.aff>=30))C.push(['jeal',1]);if(!C.length)return false;
 let tot=C.reduce((a,c)=>a+c[1],0)*rnd();let c=C[C.length-1];for(const x of C){tot-=x[1];if(tot<=0){c=x;break}}
 const p=c[2];if(c[0]==='conf'||(c[0]==='date'&&p.st==='date'&&!p.dy0))p.dy0=p.dy0||S.age;
 ({meet:evMeet,date:()=>evDate(p),sec:()=>evSecret(p),conf:()=>evConfess(p),prop:()=>evPropose(p),fight:()=>evFight(p),world:()=>evWorld(p),mom:()=>evMoment(p),jeal:evJeal})[c[0]]();return true}
function autoEv(){const L=live();if(!L.length){if(S.age>=14){const p=mk();RP().P.push(p);say(`💞 คุณได้รู้จัก ${NM(p)} — ${E(p.org)}`)}return}const p=pk(L);bump(p,{aff:R(2,8),tr:R(0,5)});if(p.st==='crush'&&p.aff>=60){p.st='date';p.dy0=S.age;say(`💞 คุณกับ ${NM(p)} เริ่มคบกัน`,'epic');mem(`เริ่มคบกับ ${p.n}`)}else if(p.st==='date'&&p.aff>=80&&p.tr>=50){wed(p);say(`💒 คุณแต่งงานกับ ${NM(p)}`,'myth')}}
(window._yrH=window._yrH||[]).push({k:'rmc',pr:6,p:.75,can:()=>on()&&S.age>=14,run:()=>{try{pickEv()}catch(e){console.error('rmc',e)}},auto:()=>{try{autoEv()}catch(e){}}});
// ---------- เปิด/ปิด ----------
function init(force){if(!S)return;if(!S._rp)S._rp={on:0,P:[],mem:[],dy:-1,pref:LS.get('murim_rpPref','opp')};if(force){S._rp.on=1;try{if(typeof loveOpt==='function'&&loveOpt()==='off'){S.loveOpt='fate'}}catch(e){}}}
setInterval(()=>{try{if(!S||!S.alive)return;if(!S._rp&&LS.get('murim_rpNext',0)&&GRP()&&S.age<=3){LS.set('murim_rpNext',0);init(1);say('💞 <b>เส้นทางรัก</b> — ชีวิตนี้ความรักจะเป็นเรื่องหลัก (ดูได้ที่เมนู ☰ → 💞 เส้นทางรัก)','epic')}}catch(e){}},1500);
// ---------- หน้าเส้นทางรัก ----------
window.rmcOpen=function(){if(!S)return;init(0);const X=RP(),g=GRP();
 if(!g)return toast('💞 เส้นทางรักยังไม่มีในโลกนี้');
 if(!X.on){return modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>💞 เส้นทางรัก</h3><p>ให้ความรักเป็นเรื่องหลักของชีวิตนี้: คนที่จีบได้หลายคน แต่ละคนมีนิสัย ของที่ชอบ และ<b>ความลับ</b> · เดต · หึง · สารภาพ · ทะเลาะ/ง้อ · ปัญหาเฉพาะโลก · แต่งงานหรือจากกัน</p>
  ${S.age<=40?`<button class="pbtn" style="width:100%" onclick="rmcOn()">💞 เริ่มเส้นทางรักในชีวิตนี้</button>`:'<p class="tag2">อายุเกิน 40 แล้ว เปิดได้ในชีวิตถัดไป (ชิปที่หน้าเลือกโลก)</p>'}`,'rmc')}
 const P=(X.P||[]).filter(p=>p.st!=='left'||p.secK);const dOk=X.dy!==S.age;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>💞 เส้นทางรัก</h3>
 <div class="tag2" style="margin-bottom:6px">อยากเจอ: ${[['opp','เพศตรงข้าม'],['same','เพศเดียวกัน'],['both','ได้ทั้งหมด']].map(([k,t])=>`<button class="gbtn" style="padding:2px 8px;font-size:11px;${X.pref===k?'border-color:#ff7ac8;color:#ff9ad8':''}" onclick="rmcPref('${k}')">${t}</button>`).join(' ')}</div>
 ${P.length?P.map((p,i)=>`<div class="item"><b>${A(p)[0]} ${E(p.n)}</b> <span class="tag2">${ST[p.st]||''} · ${A(p)[1]}</span><br><span class="tag2">${E(p.org)}</span><br>
  <span class="tag2">💗 ${bar(p.aff,'#ff7ac8')} 🤝 ${bar(p.tr,'#7ad0ff')} 😠 ${bar(p.jl,'#ff8a5a')} 🎖️ ${bar(p.rs,'#ffd54a')}</span><br>
  <span class="tag2">${Object.keys(p.kn).length?'รู้ว่า: '+Object.keys(p.kn).map(k=>(p.kn[k]>0?'❤️':p.kn[k]<0?'✖️':'·')+PIC[k]).join(' '):'ยังไม่รู้ว่าชอบอะไร'} · ${p.secK?'🔓 '+E(secT(p)):'🔒 มีความลับบางอย่าง'}</span>
  ${!['gone','left','ex','wed'].includes(p.st)&&dOk?`<button class="opt" style="margin-top:4px" onclick="rmcDate(${X.P.indexOf(p)})">🌹 ชวนเดต<small>ปีละครั้ง</small></button>`:''}</div>`).join(''):'<p class="tag2">ยังไม่มีใคร — เรื่องราวจะเริ่มเองระหว่างปี</p>'}
 ${(X.mem||[]).length?`<div class="item"><b>📔 ความทรงจำ</b>${X.mem.slice(-8).reverse().map(m=>`<div class="tag2">อายุ ${m.a} — ${E(m.t)}</div>`).join('')}</div>`:''}`,'rmc')};
window.rmcOn=()=>{init(1);closeM();say('💞 <b>เส้นทางรัก</b> เริ่มแล้ว — ความรักจะเป็นเรื่องหลักของชีวิตนี้','epic');try{if(!live().length&&S.age>=14&&!choice._cur&&!modalOpen)evMeet()}catch(e){}};
window.rmcPref=k=>{const X=RP();if(!X)return;X.pref=k;LS.set('murim_rpPref',k);rmcOpen()};
window.rmcDate=i=>{const X=RP(),p=X&&X.P[i];if(!p||X.dy===S.age)return;closeM();evDate(p,1)};
// ชิปที่หน้าเลือกโลก (มีผลกับชีวิตถัดไป)
setInterval(()=>{try{const T=document.getElementById('title');if(!T||!T.classList.contains('on'))return;const row=T.querySelector('#wPick .wpC');if(!row)return;let b=T.querySelector('#rmcChip');const v=!!LS.get('murim_rpNext',0);
 if(!b){b=document.createElement('button');b.id='rmcChip';b.type='button';b.style.cssText='margin:6px 0 0;width:100%;padding:8px;border-radius:12px;font:inherit;font-weight:700;cursor:pointer';b.onclick=()=>{LS.set('murim_rpNext',LS.get('murim_rpNext',0)?0:1);toast(LS.get('murim_rpNext',0)?'💞 ชีวิตถัดไปจะเริ่มเส้นทางรัก':'ปิดเส้นทางรักสำหรับชีวิตถัดไป')};row.after(b)}
 const h=v?'💞 เส้นทางรัก: เปิด · ความรักเป็นเรื่องหลักของชีวิตถัดไป':'🤍 เส้นทางรัก: ปิด · แตะเพื่อเปิด';if(b.textContent!==h){b.textContent=h;b.style.background=v?'linear-gradient(90deg,#ff7ac833,#b07aff33)':'transparent';b.style.border=v?'1.5px solid #ff7ac8':'1.5px dashed #ffffff33';b.style.color=v?'#ffb0e0':'inherit'}}catch(e){}},900);
// ปุ่มในเมนู ☰
setInterval(()=>{try{if(!S||!S.alive||!GRP())return;const m=$('modal');if(!modalOpen||!m||m.dataset.k!=='menu'||m.querySelector('[data-rmc]'))return;const X=RP(),p=X&&mine();const b=document.createElement('button');b.className='opt';b.setAttribute('data-rmc',1);b.innerHTML=`💞 เส้นทางรัก<small>${X&&X.on?(p?ST[p.st]+' กับ '+E(p.n):'คนที่จีบอยู่ '+live().length+' คน'):'ให้ความรักเป็นเรื่องหลักของชีวิตนี้'}</small>`;b.onclick=()=>rmcOpen();const h=m.querySelector('h3');(h&&h.nextElementSibling?h.parentNode:m).insertBefore(b,h?h.nextElementSibling:null)}catch(e){}},900);
// การ์ดตอนจบชีวิต
setInterval(()=>{try{if(!S||S.alive||!S._rp||!S._rp.on)return;const end=document.querySelector('#end.on, .screen.on#end, #endScr.on');const box=document.querySelector('.screen.on');if(!box||box.querySelector('#rmcEnd'))return;if(!/end|death|over/i.test(box.id||''))return;const X=S._rp,P=(X.P||[]).filter(p=>p.st!=='left');if(!P.length)return;
 const d=document.createElement('div');d.id='rmcEnd';d.className='item';d.style.cssText='margin:8px 0;border:1.5px solid #ff7ac866;background:linear-gradient(135deg,#ff7ac81a,#b07aff14)';
 d.innerHTML=`<b>💌 เรื่องรักของฉัน</b>${P.map(p=>`<div>${A(p)[0]} <b>${E(p.n)}</b> <span class="tag2">${ST[p.st]||''}</span></div>`).join('')}${(X.mem||[]).slice(-4).map(m=>`<div class="tag2">อายุ ${m.a} — ${E(m.t)}</div>`).join('')}`;box.appendChild(d)}catch(e){}},1500);
try{if(typeof SYS_GUIDE!=='undefined'&&!SYS_GUIDE.some(g=>g.t==='💞 เส้นทางรัก'))SYS_GUIDE.push({s:'base',nw:1,ic:'💞',t:'💞 เส้นทางรัก',d:'เปิดที่ชิปหน้าเลือกโลก (ชีวิตถัดไป) หรือเมนู ☰ → 💞 เส้นทางรัก (ชีวิตนี้ ถ้าอายุไม่เกิน 40) · ทุกโลกยกเว้นแฟนตาซี (มีฮาเร็มของตัวเอง) · คนที่จีบได้หลายคน แต่ละคนมีนิสัย ของที่ชอบ/ไม่ชอบ (เดตถึงจะรู้) และความลับหนึ่งอย่าง · ความสัมพันธ์ 4 แกน: ชอบ ไว้ใจ หึง เคารพ · สารภาพ/ง้อด้วยดวลวาทะ · ปัญหาเฉพาะโลก (สำนักศัตรู งานต่างประเทศ ซอมบี้กัด กำแพงร้าว คดีหมอก) · แต่งงานด้วยระบบคู่ครองของโลกนั้น · ตอนจบมีการ์ด "เรื่องรักของฉัน"'})}catch(e){}
window._rmc={init,pickEv,evMeet,evDate,evSecret,evConfess,evFight,evWorld,evPropose,evJeal,mk,RP,test:{on:()=>{init(1)},add:()=>{init(1);const p=mk();RP().P.push(p);return p}}};
})()}catch(e){console.error('mod-rmc',e)}
try{wReady('rmc')}catch(e){}
