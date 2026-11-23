// ============================================================
// /w/meta.js — ระบบรอบตัวเกม (ทุกโลก) · โหลดหลังเปิดเกมจาก BLOCK 122 ใน app.js
// 🏯 สำนักของผู้เล่นจริง · 👋 ระหว่างที่คุณไม่อยู่ · 🎯 เป้าหมายร่วมทั้งเว็บ · 📲 ติดตั้งเป็นแอป
// 🧭 ชีวิตหน้าลองอะไรดี · 🖼️ การ์ดเรื่องสั้นแนวตั้งสำหรับแชร์
// ============================================================
(()=>{
const NOW=()=>Date.now();
const E=s=>{try{return esc(String(s==null?'':s))}catch(e){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}};
const N=v=>{try{return fmt(v)}catch(e){return String(v)}};
const FT=()=>window._fate||null;
// ชื่อโลก ↔ รหัสภาพใน /worlds.png
const WN={murim:['ยุทธภพ','w0','⚔️'],xian:['โลกเทพเซียน','w1','☁️'],god:['โลกเทพ','w3','🌟'],beast:['สัตว์อสูร','w2','🐾'],hell:['โหมดนรก','h','🔥'],short:['ชีวิตสั้น','s','⏳'],junk:['รากขยะ','j','🗑️'],rg:['ผู้ย้อนกาล','rg','🔁'],soul:['ทวีปจิตวิญญาณยุทธ์','l','⭕'],sky:['ทะลุฟ้าดารา','k','🌠'],
 m_normal:['ยุคปัจจุบัน','mn','🏙️'],m_hunter:['ฮันเตอร์','n','🌀'],m_under:['ใต้ดิน','u','🌃'],m_ghost:['ผีไทย','o','👻'],m_loop:['วนลูป','p','🔁'],m_zombie:['ซอมบี้','z','🧟'],m_tower:['หอคอย','t','🗼'],m_game:['ระบบเกม','e','🎮'],m_gatewon:['เกตชนะ','q','💀'],m_doom:['วันสิ้นโลก','y','☄️']};
const ORD=['w0','w1','w3','w2','h','s','j','rg','l','k','mn','n','u','o','p','z','t','e','q','y','v'];
const wk=()=>{try{return FT()?FT().WK():''}catch(e){return''}};
const css=document.createElement('style');css.textContent=`
.gdB{font-size:14px}.gdB .gdHd{display:flex;align-items:center;gap:10px;margin-bottom:6px}.gdB .gdIc{font-size:34px;line-height:1}.gdB .gdNm{font-size:18px;font-weight:800}
.gdB .gdSt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.gdB .gdSt>div{background:#0003;border-radius:10px;padding:6px;text-align:center}.gdB .gdSt b{display:block;font-size:17px}
.gdB .gdM{display:flex;justify-content:space-between;align-items:center;padding:5px 8px;border-radius:8px;background:#0002;margin:3px 0}.gdB .gdM small{opacity:.7}
.gdB .gdCh{max-height:220px;overflow:auto;background:#0003;border-radius:10px;padding:6px 8px;margin:6px 0;display:flex;flex-direction:column-reverse}.gdB .gdCh div{margin:2px 0;line-height:1.45;word-break:break-word}.gdB .gdCh .s{opacity:.6;font-size:12px;text-align:center}
.gdB input,.gdB textarea{width:100%;box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid #fff3;background:#0004;color:inherit;font:inherit}
.gdB .gdRow{display:flex;gap:6px}.gdB .gdRow>*{flex:1}.gdB .gdIcs{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.gdB .gdIcs button{font-size:20px;width:38px;height:38px;border-radius:9px;border:1px solid #fff2;background:#0003;cursor:pointer}.gdB .gdIcs button.on{border-color:#e8b54a;background:#e8b54a33}
.gdB .gdThs{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:4px 0 8px}.gdB .gdThs button{text-align:left;padding:7px 9px;border-radius:10px;border:1px solid #fff2;background:#0003;color:inherit;font:inherit;cursor:pointer}.gdB .gdThs button.on{border-color:#e8b54a;background:#e8b54a2a}.gdB .gdThs small{display:block;opacity:.7;font-size:11.5px;line-height:1.35}.gdB .gdThB{font-size:11px;padding:0 6px;border-radius:6px;background:#ffffff14}
.gdB .gdTb{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:6px 0 10px}.gdB .gdTb button{min-width:0;padding:6px 3px;line-height:1.3;border-radius:10px;border:1px solid #fff2;background:#0003;color:inherit;font:inherit;font-size:12px;cursor:pointer;white-space:normal}.gdB .gdTb button.on{background:#e8b54a33;border-color:#e8b54a;font-weight:800}
.gdB .gdLvB{font-size:12px;padding:1px 7px;border-radius:999px;background:#e8b54a;color:#2a1a00;vertical-align:middle}.gdB .gdLv{background:#0003;border-radius:12px;padding:8px 10px;margin:4px 0}.gdB .gdLv>div:first-child{display:flex;justify-content:space-between;align-items:baseline;gap:6px}.gdB .gdLv small{opacity:.75}
.gdB .gdBar{height:8px;border-radius:99px;background:#0005;overflow:hidden;margin:5px 0}.gdB .gdBar i{display:block;height:100%;background:linear-gradient(90deg,#6ab0ff,#9fd8ff);border-radius:99px;transition:width .5s}.gdB .gdBar.gold i{background:linear-gradient(90deg,#e8b54a,#ffe08a)}.gdB .gdBar.red i{background:linear-gradient(90deg,#c8303a,#ff7a5a)}
.gdB .gdAnn{background:#e8b54a1f;border:1px dashed #e8b54a88;border-radius:10px;padding:7px 9px;margin:6px 0;line-height:1.5}.gdB .gdEmb{font-size:11px;padding:1px 6px;border-radius:6px;background:linear-gradient(90deg,#ffe08a,#e8b54a);color:#2a1a00;font-weight:800}
.gdB .gdLk{background:#0003;border:1px dashed #fff3;border-radius:10px;padding:10px;text-align:center;opacity:.8;margin:4px 0}.gdB .gdUn{display:grid;grid-template-columns:1fr 1fr;gap:5px}.gdB .gdUn>div{background:#0002;border-radius:9px;padding:6px 8px;opacity:.55}.gdB .gdUn>div.on{opacity:1;background:#e8b54a1a;border:1px solid #e8b54a55}.gdB .gdUn small{display:block;opacity:.75;font-size:11.5px;line-height:1.4}
.gdB .gdQ{background:#0002;border-radius:10px;padding:7px 9px;margin:5px 0;display:grid;grid-template-columns:1fr auto;gap:2px 8px}.gdB .gdQ .gdBar{grid-column:1/-1;margin:3px 0 0}.gdB .gdQ.ok{background:#3aa05a22;border:1px solid #3aa05a66}
.gdB .gdBoss{display:flex;gap:10px;align-items:center;background:linear-gradient(90deg,#3a0a12aa,#0003);border:1px solid #c8303a66;border-radius:12px;padding:9px}.gdB .gdBoss .bi{font-size:40px;line-height:1;animation:gdShk 2.4s ease-in-out infinite}.gdB .gdBoss.dead .bi{animation:none;filter:grayscale(1)}.gdB .gdBoss.hard{border-color:#ff5a3a;box-shadow:0 0 14px #ff5a3a44}.gdB .gdBoss small{display:block;opacity:.8}@keyframes gdShk{0%,100%{transform:none}50%{transform:translateY(-3px) rotate(-3deg)}}
.gdB .gdSm{background:#0002;border-radius:9px;padding:6px 9px;font-size:13px;margin:4px 0}.gdB .gdS{padding:2px 8px!important;font-size:12px!important}.gdB .gdM{flex-wrap:wrap}.gdB .gdMb{flex-basis:100%;display:flex;gap:4px;flex-wrap:wrap;margin-top:4px;justify-content:flex-end}
.gdB .gdArt{display:flex;gap:10px;align-items:center;background:#0003;border-radius:12px;padding:9px}.gdB .gdArt .ai{font-size:36px}.gdB .gdArt small{display:block;opacity:.8}.gdB .gbtn.on{border-color:#e8b54a;background:#e8b54a33}
.gdB .gdWar{display:flex;align-items:center;gap:8px;margin:8px 0}.gdB .gdWar>div{flex:1;text-align:center;background:#0003;border-radius:12px;padding:8px}.gdB .gdWar span{font-size:30px;display:block}.gdB .gdWar big{display:block;font-size:20px;font-weight:800;color:#ffe08a}.gdB .gdWar>i{font-style:normal;font-weight:900;color:#ff7a5a}
.gdB .gdL{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:10px;background:#0002;margin:4px 0}.gdB .gdL .r{width:24px;text-align:center;font-weight:800;opacity:.8}.gdB .gdL .i{font-size:22px}.gdB .gdL .t{flex:1;min-width:0}.gdB .gdL .t small{display:block;opacity:.65;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mtWB h4{margin:10px 0 4px}.mtWB .it{background:#0003;border-radius:10px;padding:8px 10px;margin:5px 0;line-height:1.5}.mtWB .bar{height:8px;border-radius:5px;background:#0005;overflow:hidden;margin-top:5px}.mtWB .bar>i{display:block;height:100%;background:linear-gradient(90deg,#e8b54a,#ffd84a)}
.mtWB .gift{border:1px dashed #e8b54a;background:#e8b54a1a}
.mtNext{margin:12px 0;padding:10px 12px;border-radius:14px;background:linear-gradient(180deg,#ffffff0d,#0000);border:1px solid #ffffff1c}.mtNext h5{margin:0 0 6px}
.mtNext .nx{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-top:1px solid #ffffff12}.mtNext .nx:first-of-type{border-top:0}.mtNext .nx>i{font-style:normal;font-size:22px;line-height:1.2}.mtNext .nx b{display:block}.mtNext .nx small{opacity:.75;line-height:1.45;display:block}
.mtNext .nxB{display:flex;gap:6px;margin-top:8px}.mtNext .nxB button{flex:1}
.mtCg{font-size:12px;opacity:.85}.mtPWA{position:fixed;left:10px;right:10px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:9990;background:#1a130c;border:1.5px solid #e8b54a;border-radius:14px;padding:10px 12px;display:flex;gap:10px;align-items:center;color:#f1e3c2;box-shadow:0 6px 24px #0008;max-width:520px;margin:auto}
.mtPWA b{display:block}.mtPWA small{opacity:.75}.mtPWA button{white-space:nowrap}
.mtStory img{width:100%;border-radius:12px;display:block;margin:6px 0}`;document.head.appendChild(css);

// ============================================================
// 🏯 สำนักของผู้เล่นจริง
// ============================================================
const GIC=['🏯','⛩️','🐉','🦅','🐺','🌙','🔥','🌊','⚔️','🌸','🪷','☯️'];
const GER={in:'คุณอยู่ในกลุ่มอื่นอยู่แล้ว',name:'ชื่อกลุ่มต้องยาว 2 ตัวอักษรขึ้นไป',cd:'สร้างกลุ่มได้ชั่วโมงละครั้ง',taken:'ชื่อนี้มีคนใช้แล้ว',full:'กลุ่มนี้เต็มแล้ว',lv:'กลุ่มเลเวลยังไม่ถึง',elmax:'ผู้อาวุโสได้สูงสุด 3 คน',tpcd:'เปลี่ยนสายวิชาได้สัปดาห์ละครั้ง',prd:'วันนี้อธิษฐานที่หอตำนานแล้ว',thcd:'เปลี่ยนแนวกลุ่มได้สัปดาห์ละครั้ง',bsd:'วันนี้ส่งพรไปแล้ว',self:'อธิษฐานให้ชีวิตของตัวเองไม่ได้',el:'ทำได้เฉพาะเจ้ากลุ่มหรือผู้อาวุโส',u:'ไม่พบศิษย์คนนี้',op:'ทำไม่ได้',kicked:'คุณเพิ่งถูกเชิญออกจากกลุ่มนี้ รอ 3 วัน',fast:'พิมพ์เร็วไป รอสักครู่',ld:'ทำได้เฉพาะเจ้ากลุ่ม',nog:'ไม่พบกลุ่มนี้แล้ว',empty:'ยังไม่ได้พิมพ์อะไร',id:'เครื่องนี้ยังไม่มีรหัสผู้เล่น ลองเล่นจบสักชีวิตก่อน',none:'คุณยังไม่ได้อยู่ในกลุ่ม'};
let GD=null,gdIc='🏯',gdPoll=null;
const myPu=()=>{try{return String(pid).replace(/[^a-z0-9]/g,'').slice(0,12)}catch(e){return''}};
const nmMe=()=>{try{return pname()}catch(e){return'นิรนาม'}};
const tagSave=g=>{try{LS.set('murim_gdtag',g?{n:g.n,ic:g.ic,id:g.id}:null)}catch(e){}};
async function gdW(o,x){try{const j=await api('gdw',Object.assign({o,n:nmMe()},x||{}));if(j&&j.err){toast('🏯 '+(GER[j.err]||j.err));return null}if(j&&'g' in j){GD=j.g;window.__gdTag(GD)}return j}catch(e){toast(e&&e.message==='auth'?'🔐 เครื่องนี้ยืนยันตัวตนไม่ผ่าน':'🏯 เชื่อมต่อไม่ได้ ลองใหม่');return null}}
function chatH(g){const L=(g.ch||[]);if(!L.length)return'<div class="s">ยังไม่มีใครพูดอะไร เริ่มก่อนเลย</div>';
 return L.map(c=>c.s?`<div class="s">${E(c.x)}</div>`:`<div><b>${E(c.n)}</b>${c.u===g.ld?' 👑':''}: ${E(c.x)}</div>`).join('')}
// ---- 🛡️ แนวกลุ่ม: ทุกคำเปลี่ยนตามแนว (ข้อมูลเหมือนกันทุกแนว) ----
const GTH={murim:{n:'ยุทธภพ',ic:'🏯',g:'สำนัก',ld:'เจ้าสำนัก',el:'ผู้อาวุโส',m:'ศิษย์',art:'วิชาลับ',hall:'หอตำนาน',p:{sword:['🗡️','สายกระบี่'],mind:['🧠','สายจิต'],body:['🫀','สายกาย']}},
 xian:{n:'เทพเซียน',ic:'☁️',g:'นิกาย',ld:'ประมุข',el:'ผู้พิทักษ์',m:'ศิษย์',art:'คัมภีร์นิกาย',hall:'หอบรรพจารย์',p:{sword:['⚡','สายกระบี่เซียน'],mind:['☯️','สายจิตเต๋า'],body:['🌟','สายกายทอง']}},
 modern:{n:'ยุคปัจจุบัน',ic:'🏙️',g:'กิลด์',ld:'หัวหน้ากิลด์',el:'รองหัวหน้า',m:'สมาชิก',art:'ทักษะลับ',hall:'กำแพงเกียรติยศ',p:{sword:['🥊','สายต่อสู้'],mind:['💡','สายสมอง'],body:['💪','สายร่างกาย']}},
 zombie:{n:'ซอมบี้',ic:'🧟',g:'ค่ายผู้รอดชีวิต',ld:'ผู้นำค่าย',el:'หน่วยลาดตระเวน',m:'ผู้รอดชีวิต',art:'ตำราเอาตัวรอด',hall:'กำแพงผู้รอด',p:{sword:['🪓','สายอาวุธ'],mind:['🗺️','สายวางแผน'],body:['🫀','สายอึดถึกทน']}},
 hunter:{n:'ฮันเตอร์',ic:'🌀',g:'กิลด์ฮันเตอร์',ld:'กิลด์มาสเตอร์',el:'ฮันเตอร์แรงก์ S',m:'ฮันเตอร์',art:'สกิลกิลด์',hall:'หอแรงก์',p:{sword:['⚔️','สายโจมตี'],mind:['🔮','สายเวท'],body:['🛡️','สายแทงก์']}},
 ghost:{n:'ผีไทย',ic:'👻',g:'สำนักไสยเวท',ld:'อาจารย์ใหญ่',el:'หมอผี',m:'ลูกศิษย์',art:'คาถาประจำสำนัก',hall:'หิ้งบูชาครู',p:{sword:['📿','สายอาคม'],mind:['🕯️','สายสมาธิ'],body:['🪬','สายของขลัง']}}};
let Z=GTH.murim;const thOf=g=>GTH[g&&g.th]||GTH.murim;
const GICT=['🛡️','🏙️','🧟','🌀','👻','☁️','🏹','🔮'];
// โลกที่เกิด → แนว (ใช้แปลชื่อพลังติดตัวให้เข้ากับโลกนั้น) และชื่อโลก
const wTh=w=>/^m_zombie|m_doom/.test(w)?'zombie':/^m_hunter|m_tower|m_gatewon|m_game/.test(w)?'hunter':w==='m_ghost'?'ghost':/^m_/.test(w)?'modern':/^(xian|god|soul|sky)$/.test(w)?'xian':'murim';
const wNm=w=>(WN[w]||[w])[0],wIc=w=>(WN[w]||['','',''])[2]||'🌍';
// ---- 🏯 เลเวลสำนักและของที่ปลดล็อก ----
const GUN=()=>[[1,'💬','แชท · คะแนนรายสัปดาห์'],[2,'📜',`ภารกิจ${Z.g}รายสัปดาห์`],[3,'🎖️',`ตำแหน่ง ${Z.ld}/${Z.el} · ประกาศ${Z.g}`],[4,'⚔️','บอสบุกประจำสัปดาห์'],[5,'📖',`${Z.art}ประจำ${Z.g} (ขั้น 1–3)`],[6,'🏛️',`${Z.hall} · อธิษฐานรับพร`],[7,'🙏',`ส่งพรให้${Z.m}ร่วม${Z.g}`],[8,'💀',`บอสร่างคลั่ง · ${Z.art}ขั้น 4–5`],[9,'🚩',`สงคราม${Z.g}รายสัปดาห์`],[10,'👑',`ตรา${Z.g} · ฉายา${Z.m} · ไอคอนพิเศษ`]];
const GCAP=[20,25,30,35,40,45,50,55,60,70];
const GQN={n:['🔁','จบชีวิตรวมกัน'],o:['🧓','ชีวิตที่อยู่ถึง 60 ปี'],c:['🔥','ชีวิตในโหมดท้าทาย'],w:['🌍','เล่นให้ครบหลายโลก'],m:['👥','คนในกลุ่มที่ร่วมเล่นสัปดาห์นี้'],f:['🎯','จบชีวิตในโลกประจำสัปดาห์'],x:['💯','ชีวิตที่อยู่ถึง 100 ปี']};
const GTP=()=>({sword:[...Z.p.sword,'พลังโจมตีตั้งแต่เกิด'],mind:[...Z.p.mind,'สติปัญญาตั้งแต่เกิด'],body:[...Z.p.body,'อายุขัยยืนขึ้น']});
const GIC10=['🐲','🦚','👑','🌟','🗡️','🏔️'];
let gdTab='home';
const lock=(lv,need)=>lv>=need?'':`<div class="gdLk">🔒 ปลดล็อกเมื่อ${Z.g}ถึงเลเวล ${need}</div>`;
const bar=(c,t,cl)=>`<div class="gdBar${cl?' '+cl:''}"><i style="width:${t>0?Math.min(100,c/t*100):100}%"></i></div>`;
const roleOf=(g,u)=>u===g.ld?' 👑':(g.el||[]).includes(u)?' 🎖️':'';
function gdHome(g){const me=myPu(),ld=g.ld===me,amEl=(g.el||[]).includes(me),lv=g.lv||1,tot=g.m.reduce((a,m)=>a+m.p,0);
 return`<div class="gdLv"><div><b>เลเวล ${lv}</b>${lv>=10?' <span class="gdEmb">ตรา'+Z.g+'</span>':''}<small>${g.nx?`${N(g.xp)} / ${N(g.nx)} แต้ม${Z.g}`:`${N(g.xp)} แต้ม${Z.g} · เลเวลสูงสุด`}</small></div>${bar(g.xp-(g.cx||0),g.nx?g.nx-(g.cx||0):0,'gold')}
 <small class="tag2">วันนี้คุณช่วย${Z.g}แล้ว ${N(Math.min(g.mxd||0,g.xpd||300))}/${N(g.xpd||300)} แต้ม (เกินนี้ยังนับคะแนนสัปดาห์ แต่ไม่นับเลเวล)${g.gcap?`<br>ทั้ง${Z.g}วันนี้ ${N(Math.min(g.gxd||0,g.gcap))}/${N(g.gcap)} แต้มเลเวล${(g.gxd||0)>=g.gcap?' · เต็มแล้ว ภารกิจ/บอสยังนับต่อ':''}`:''}</small></div>
 ${g.ann?`<div class="gdAnn">📢 ${E(g.ann)}</div>`:''}
 <div class="gdSt"><div><b>${g.rk>0?'#'+g.rk:'—'}</b><small>อันดับสัปดาห์</small></div><div><b>${N(g.sc)}</b><small>แต้มสัปดาห์</small></div><div><b>${g.m.length}/${g.cap||20}</b><small>${Z.m}</small></div></div>
 ${g.bl?`<div class="gdAnn">🙏 มีพรรออยู่ ${g.bl} อย่าง จะติดตัวในชีวิตถัดไป</div>`:''}
 <h4 style="margin:8px 0 4px">💬 ห้องประชุม${Z.g}</h4><div class="gdCh" id="gdCh">${chatH(g)}</div>
 <div class="gdRow"><input id="gdSay" maxlength="160" placeholder="พูดกับ${Z.m}ร่วม${Z.g}…" onkeydown="if(event.key==='Enter')gdSay()"><button class="pbtn" style="flex:0 0 auto" onclick="gdSay()">ส่ง</button></div>
 <h4 style="margin:10px 0 4px">👥 ${Z.m} (แต้มสัปดาห์นี้)</h4>${g.m.map((m,i)=>{const mel=(g.el||[]).includes(m.u),canK=m.u!==me&&!m.ld&&(ld||(amEl&&lv>=3&&!mel));
  const bt=[];if(ld&&lv>=3&&m.u!==me){bt.push(mel?`<button class="gbtn gdS" onclick="gdRank('${E(m.u)}','mb')">ถอดตำแหน่ง</button>`:`<button class="gbtn gdS" onclick="gdRank('${E(m.u)}','el')">ตั้ง${Z.el}</button>`);bt.push(`<button class="gbtn gdS" onclick="gdRank('${E(m.u)}','ld','${E(m.n).replace(/'/g,'')}')">มอบ${Z.ld}</button>`)}
  if(lv>=7&&m.u!==me&&!g.bsd)bt.push(`<button class="gbtn gdS" onclick="gdBless('${E(m.u)}','${E(m.n).replace(/'/g,'')}')">🙏 ส่งพร</button>`);
  if(canK)bt.push(`<button class="gbtn gdS" onclick="gdKick('${E(m.u)}','${E(m.n).replace(/'/g,'')}')">เชิญออก</button>`);
  return`<div class="gdM"><span>${i<3&&m.p?['🥇','🥈','🥉'][i]:'·'} <b>${E(m.n)}</b>${roleOf(g,m.u)}${m.u===me?' <small>(คุณ)</small>':''}</span><span><b>${N(m.p)}</b></span>${bt.length?`<div class="gdMb">${bt.join('')}</div>`:''}</div>`}).join('')}
 <p class="tag2">รวม ${N(tot)} แต้ม · รหัสเชิญ <b style="user-select:all">${E(g.id)}</b>${lv>=7&&g.bsd?' · วันนี้ส่งพรไปแล้ว':''}</p>
 <div class="gdRow" style="margin-top:8px;flex-wrap:wrap">${ld?`<button class="gbtn" onclick="gdDesc()">✏️ แก้คำขวัญ</button>`:''}${(ld||amEl)&&lv>=3?`<button class="gbtn" onclick="gdAnn()">📢 ประกาศ</button>`:''}${ld?`<button class="gbtn" onclick="gdTheme()">🎨 แนวกลุ่ม</button>`:''}${ld&&lv>=10?`<button class="gbtn" onclick="gdIcon()">🏵️ เปลี่ยนตรา</button>`:''}<button class="gbtn" onclick="gdBoard()">🏆 กระดาน${Z.g}</button><button class="gbtn" onclick="gdLeave()">🚪 ออก</button></div>
 <h4 style="margin:12px 0 4px">🗝️ ของที่ปลดล็อกตามเลเวล</h4><div class="gdUn">${GUN().map(([l,i,t])=>`<div class="${lv>=l?'on':''}"><b>${lv>=l?i:'🔒'} เลเวล ${l}</b><small>${t} · ${GCAP[l-1]} คน</small></div>`).join('')}</div>`}
function gdQuest(g){const lv=g.lv||1;let h=`<h4 style="margin:4px 0">📜 ภารกิจ${Z.g}สัปดาห์นี้</h4>`;
 if(lv<2)h+=lock(lv,2);else{h+=`<p class="tag2">ทุกชีวิตที่${Z.m}เล่นจบช่วยนับ · สำเร็จอย่างละ +150 แต้ม${Z.g} · ครบ 3 อย่างรับเพิ่ม +300 · เปลี่ยนภารกิจทุกวันจันทร์</p>`+(g.q||[]).map(q=>{const[i,t]=GQN[q.k]||['❔',q.k];return`<div class="gdQ${q.d?' ok':''}"><b>${q.d?'✅':i} ${t}</b><span>${N(Math.min(q.c,q.t))}/${N(q.t)}${q.k==='w'?' โลก':q.k==='m'?' คน':' ชีวิต'}</span>${q.k==='f'&&g.cgw?`<small style="grid-column:1/-1;opacity:.75">โลกประจำสัปดาห์นี้: ${wIc(g.cgw)} ${E(wNm(g.cgw))}</small>`:''}${bar(q.c,q.t)}</div>`}).join('')+(g.qa?'<div class="gdAnn">🎁 ครบทั้ง 3 ภารกิจแล้วสัปดาห์นี้!</div>':'')}
 h+=`<h4 style="margin:14px 0 4px">⚔️ บอสบุกประจำสัปดาห์</h4>`;
 if(lv<4)return h+lock(lv,4);const B=g.boss;if(!B)return h;
 const hard=B.w1&&B.hp2,hp=hard?B.hp2:B.hp,dmg=hard?Math.max(0,B.d-B.hp):B.d,left=Math.max(0,hp-dmg),dead=hard?B.w2:B.w1;
 h+=`<div class="gdBoss${dead?' dead':''}${hard?' hard':''}"><div class="bi">${dead?'💀':hard?'👹':B.w?wIc(B.w):'🐲'}</div><div style="flex:1;min-width:0"><b>${E(B.n)}${hard?' · ร่างคลั่ง':''}</b>${B.w?`<small>บอสจาก${E(wNm(B.w))} · ชีวิตที่จบใน${E(wNm(B.w))}ตีแรง ×2</small>`:''}<small>${dead?'ถูกล้มแล้ว!':'เลือดเหลือ '+N(left)+' / '+N(hp)}</small>${bar(dead?0:left,hp,'red')}</div></div>
 <p class="tag2">ทุกชีวิตที่จบโจมตีบอสอัตโนมัติ ยิ่งอยู่นานยิ่งแรง โหมดท้าทายแรงขึ้นอีก (คนละไม่เกิน 600 ต่อวัน) · ล้มได้ +400 แต้ม${Z.g} และ${Z.m}ทุกคนได้<b>ตราพิชิตบอส</b> พลังเพิ่มตั้งแต่เกิดตลอดสัปดาห์${lv>=8?' · เลเวล 8 ขึ้นไป ล้มแล้วบอสจะคืนร่างคลั่ง ล้มซ้ำได้ +600 และตราขั้นสูง':''}</p>
 <div class="gdSm">คุณโจมตีไปแล้ว <b>${N(B.me)}</b>${(B.top||[]).length?` · ตัวท็อป: ${B.top.map(x=>E(x.n)+' '+N(x.v)).join(' · ')}`:''}</div>`;
 return h}
function gdArt(g){const me=myPu(),ld=g.ld===me,lv=g.lv||1;let h=`<h4 style="margin:4px 0">📖 ${Z.art}ประจำ${Z.g}</h4>`;
 if(lv<5)h+=lock(lv,5);else{const T=g.tech,P=GTP()[T.path]||GTP().sword;h+=`<div class="gdArt"><div class="ai">${P[0]}</div><div style="flex:1"><b>${P[1]} ขั้น ${T.lv}/${T.mx}</b><small>${P[2]} · ${Z.m}ทุกคนได้ติดตัวตั้งแต่เกิด</small>${T.nx?bar(T.p,T.nx,'gold')+`<small>${N(T.p)}/${N(T.nx)} แต้มวิชา</small>`:'<small>ถึงขั้นสูงสุดแล้ว'+(T.mx<5?' (เลเวล 8 ขยายได้ถึงขั้น 5)':'')+'</small>'}</div></div>
  <p class="tag2">แต้ม${Z.g}ที่${Z.m}หาได้ทุกแต้มจะไหลเข้า${Z.art}ด้วย${ld?' · '+Z.ld+'เลือกสายได้ (เปลี่ยนได้สัปดาห์ละครั้ง)':''}</p>${ld?`<div class="gdRow">${Object.entries(GTP()).map(([k,v])=>`<button class="gbtn${k===T.path?' on':''}" onclick="gdPath('${k}')">${v[0]} ${v[1]}</button>`).join('')}</div>`:''}`}
 h+=`<h4 style="margin:14px 0 4px">🏛️ ${Z.hall}</h4>`;
 if(lv<6)h+=lock(lv,6);else{h+=`<p class="tag2">ชีวิตที่ยืนยาวที่สุด 10 อันดับของ${Z.g} · อธิษฐานวันละครั้ง รับพรจากตำนาน (ปัญญาและเสน่ห์) ติดตัวในชีวิตถัดไป${g.prd?' · <b>วันนี้อธิษฐานแล้ว</b>':''}</p>`+((g.hall||[]).length?g.hall.map((x,i)=>`<div class="gdL"><span class="r">${['🥇','🥈','🥉'][i]||i+1}</span><span class="t"><b>${E(x.n)}</b><small>อายุ ${N(x.age)} ปี${x.r?' · '+E(x.r):''} · 🙏${N(x.pr)}</small></span>${!g.prd&&x.u!==me?`<button class="gbtn gdS" onclick="gdPray('${E(x.lid||x.n)}')">🙏 อธิษฐาน</button>`:''}</div>`).join(''):'<p class="tag2">ยังไม่มีตำนาน เล่นให้อยู่ถึง 20 ปีขึ้นไปจะถูกจารึกไว้</p>')+((g.hw||[]).length?`<h4 style="margin:10px 0 4px">🌍 ตำนานประจำแต่ละโลก</h4><p class="tag2">ชีวิตที่อยู่ยาวที่สุดของแต่ละโลก วัดกันในโลกเดียวกัน</p>`+g.hw.map(x=>`<div class="gdL"><span class="i">${wIc(x.w)}</span><span class="t"><b>${E(x.n)}</b><small>${E(wNm(x.w))} · อายุ ${N(x.age)} ปี · 🙏${N(x.pr)}</small></span>${!g.prd&&x.u!==myPu()?`<button class="gbtn gdS" onclick="gdPray('${E(x.lid||x.n)}')">🙏 อธิษฐาน</button>`:''}</div>`).join(''):'')}
 h+=`<h4 style="margin:14px 0 4px">🙏 ส่งพรให้${Z.m}ร่วม${Z.g}</h4>`+(lv<7?lock(lv,7):`<p class="tag2">วันละครั้ง กดปุ่ม 🙏 ส่งพร ข้างชื่อ${Z.m}ในหน้าหลัก ผู้รับจะได้พลังและอายุขัยเพิ่มในชีวิตถัดไป${g.bsd?' · <b>วันนี้ส่งไปแล้ว</b>':''}</p>`);
 return h}
function gdWarV(g){const lv=g.lv||1;let h=`<h4 style="margin:4px 0">🚩 สงคราม${Z.g}</h4>`;if(lv<9)return h+lock(lv,9)+`<p class="tag2">${Z.g}เลเวล 9 ขึ้นไปจะถูกจับคู่กันทุกสัปดาห์ ฝั่งที่ได้แต้มสัปดาห์มากกว่าชนะ ยึดดินแดนเพิ่ม 1 แห่ง ได้ +500 แต้ม${Z.g} และ${Z.m}ได้พรผู้ชนะทั้งสัปดาห์ถัดไป</p>`;
 const W=g.war||{};h+=`<div class="gdSm">ดินแดนที่ยึดได้ทั้งหมด <b>${N(g.ter||0)}</b> แห่ง${W.won?' · 🏆 ชนะสงครามสัปดาห์ก่อน '+Z.m+'ได้พรผู้ชนะ':''}</div>`;
 if(!W.op)return h+`<p class="tag2">สัปดาห์นี้ยังไม่มีคู่ต่อสู้ (ต้องมี${Z.g}เลเวล 9 อีกอย่างน้อยหนึ่ง${Z.g})</p>`;
 const a=W.me||0,b=W.op.sc||0;return h+`<div class="gdWar"><div><span>${E(g.ic)}</span><b>${E(g.n)}</b><big>${N(a)}</big></div><i>VS</i><div><span>${E(W.op.ic)}</span><b>${E(W.op.n)}</b><big>${N(b)}</big></div></div>${bar(a,a+b||1,'gold')}<p class="tag2">ตัดสินตอนจบสัปดาห์ (คืนวันอาทิตย์) จากแต้มสัปดาห์ของทั้งสอง${Z.g}</p>`}
function gdView(g){Z=thOf(g);const T=[['home',Z.ic+' '+Z.g],['quest','📜 ภารกิจ บอส'],['art','📖 วิชา ตำนาน'],['war','🚩 สงคราม']];
 return`<div class="gdB"><div class="gdHd"><span class="gdIc">${E(g.ic)}</span><div><div class="gdNm">${E(g.n)} <small class="gdLvB">Lv.${g.lv||1}</small></div><small class="tag2">${E(g.ds||Z.g+'ของผู้เล่นจริง')} · <span class="gdThB">${Z.ic} แนว${Z.n}</span></small></div></div>
 <div class="gdTb">${T.map(([k,t])=>`<button class="${k===gdTab?'on':''}" onclick="gdGo('${k}')">${t}</button>`).join('')}</div>
 ${gdTab==='quest'?gdQuest(g):gdTab==='art'?gdArt(g):gdTab==='war'?gdWarV(g):gdHome(g)}</div>`}
window.gdGo=k=>{gdTab=k;redraw()};
window.gdRank=async(u,r,n)=>{if(r==='ld'&&!confirm(`มอบตำแหน่ง${Z.ld}ให้ ${n}? คุณจะเป็น${Z.el}แทน`))return;const j=await gdW('rank',{u,r});if(j&&j.ok)redraw()};
window.gdAnn=async()=>{const d=prompt('ประกาศ'+Z.g+' (ไม่เกิน 120 ตัว · เว้นว่างเพื่อลบ)',GD&&GD.ann||'');if(d==null)return;const j=await gdW('ann',{x:d});if(j&&j.ok)redraw()};
window.gdPath=async tp=>{const j=await gdW('path',{tp});if(j&&j.ok){toast('📖 เลือกสายวิชาแล้ว');redraw()}};
window.gdPray=async k=>{const j=await gdW('pray',{k});if(j&&j.ok){toast('🙏 อธิษฐานแล้ว รับพรจากตำนานในชีวิตถัดไป');redraw()}};
window.gdBless=async(u,n)=>{const j=await gdW('bless',{u});if(j&&j.ok){toast(`🙏 ส่งพรให้ ${n} แล้ว`);redraw()}};
window.gdIcon=()=>{const b=$('gdBody');if(!b)return;b.innerHTML=`<div class="gdB"><p>เลือกตรา${Z.g} (ไอคอนพิเศษสำหรับเลเวล 10)</p><div class="gdIcs">${GIC.concat(GICT,GIC10).map(i=>`<button onclick="gdIconSet('${i}')">${i}</button>`).join('')}</div><button class="gbtn" style="width:100%" onclick="redraw2()">↩️ กลับ</button></div>`};
window.gdIconSet=async ic=>{const j=await gdW('icon',{ic});if(j&&j.ok)redraw()};window.redraw2=()=>redraw();
// ---- พรสำนักติดตัวตอนเกิด (วิชาลับ · ตราพิชิตบอส · พรผู้ชนะสงคราม · พรจากตำนาน/เพื่อน) ----
const GBK='murim_gdbuf';const cwk=()=>Math.floor((Date.now()+7*3600e3-4*86400e3)/604800e3);
function bufSave(g){try{if(!g){LS.set(GBK,null);return}LS.set(GBK,{n:g.n,th:g.th||'murim',lv:g.lv||1,tl:g.tech?g.tech.lv:0,tp:g.tech?g.tech.path:'',bw:g.bw||0,ww:g.war&&g.war.won?1:0,wk:cwk(),t:Date.now()});
 if((g.lv||1)>=10){const T=LS.get('murim_ttl',{})||{},k=thOf(g).m+thOf(g).g+g.n;if(!T[k]){T[k]={n:(()=>{try{return S&&S.name||''}catch(e){return''}})(),t:Date.now(),c:1};LS.set('murim_ttl',T);toast('🏷️ ได้ฉายา「'+k+'」!')}}}catch(e){}}
{const _ts=tagSave;window.__gdTag=g=>{_ts(g);bufSave(g)}}
function gdBorn(){try{if(typeof S==='undefined'||!S||S.beastMode||S.age>0)return;const B=LS.get(GBK,null);if(!B||!LS.get('murim_gdtag',null))return;const L=[];const xi=S.xian?3:1;
 // ชื่อพลังเปลี่ยนตามโลกที่ไปเกิด (เกิดโลกซอมบี้ = ตำราเอาตัวรอด · เกิดยุคปัจจุบัน = ทักษะลับ …) ส่วนชื่อกลุ่มเป็นตามแนวกลุ่ม
 const w=(()=>{try{return wk()||''}catch(e){return''}})(),WT=GTH[wTh(w)]||GTH.murim,GT=GTH[B.th]||GTH.murim,body=WT===GTH.zombie?'พลังชีวิต':'อายุขัย';
 if(B.tl>0){const k=B.tl,pn=(WT.p[B.tp]||WT.p.sword);if(B.tp==='mind'){S.int+=3*k;L.push(`${pn[0]} ${WT.art}${pn[1]} ขั้น ${k} (ปัญญา +${3*k})`)}else if(B.tp==='body'){S.lifespan+=2*k;L.push(`${pn[0]} ${WT.art}${pn[1]} ขั้น ${k} (${body} +${2*k})`)}else{S.power+=15*k*xi;L.push(`${pn[0]} ${WT.art}${pn[1]} ขั้น ${k} (พลัง +${15*k*xi})`)}}
 if(B.wk===cwk()&&B.bw){const p=(B.bw>1?50:20)*xi;S.power+=p;if(B.bw>1)S.lifespan+=3;L.push(`${B.bw>1?'💀':'⚔️'} ตราพิชิตบอส${B.bw>1?'ขั้นสูง':''} (พลัง +${p}${B.bw>1?' · '+body+' +3':''})`)}
 if(B.wk===cwk()&&B.ww){S.power+=30*xi;L.push(`🚩 พรผู้ชนะสงคราม (พลัง +${30*xi})`)}
 if(L.length)setTimeout(()=>{try{if(S&&S.alive)log(`${GT.ic} <b>${GT.g} ${E(B.n)}</b> ส่งพลังติดตัวมาตั้งแต่เกิด: ${L.join(' · ')}`,'epic',true)}catch(e){}},700);
 api('gdw',{o:'claim',n:nmMe()}).then(j=>{const l=j&&j.l||[];if(!l.length||!S||!S.alive)return;const M=[];l.forEach(x=>{if(x.k==='lg'){S.int+=2;S.cha+=2;M.push(`🏛️ พรจากตำนาน ${E(x.n)} (ปัญญา +2 · เสน่ห์ +2)`)}else{S.power+=15*xi;S.lifespan+=2;M.push(`🙏 พรจาก ${E(x.n)} (พลัง +${15*xi} · ${body} +2)`)}});log(`✨ ${M.join(' · ')}`,'epic',true);try{render()}catch(e){}}).catch(()=>{})}catch(e){}}
try{const _bl=beginLife;beginLife=function(){const r=_bl.apply(this,arguments);gdBorn();return r}}catch(e){}
let gdTh='murim';
function gdNew(){Z=GTH[gdTh];return`<div class="gdB"><p>ยังไม่มีกลุ่ม — ตั้งกลุ่มเองหรือขอเข้ากลุ่มของคนอื่น ทุกชีวิตที่จบ (ทุกโลก) ส่งแต้มเข้ากลุ่ม แข่งกันทุกสัปดาห์</p>
 <h4 style="margin:8px 0 4px">🎨 เลือกแนวกลุ่ม</h4><div class="gdThs">${Object.entries(GTH).map(([k,v])=>`<button class="${k===gdTh?'on':''}" onclick="gdThPick('${k}')"><b>${v.ic} ${v.g}</b><small>แนว${v.n} · ${v.ld} · ${v.m}</small></button>`).join('')}</div>
 <h4 style="margin:8px 0 4px">🏗️ ตั้ง${Z.g}ใหม่</h4><input id="gdNmI" maxlength="16" placeholder="ชื่อ${Z.g} (2–16 ตัว)"><div class="gdIcs">${[Z.ic,...GIC,...GICT].filter((x,i,a)=>a.indexOf(x)===i).map(i=>`<button class="${i===gdIc?'on':''}" onclick="gdPick('${i}',this)">${i}</button>`).join('')}</div>
 <input id="gdDsI" maxlength="60" placeholder="คำขวัญ (ไม่ใส่ก็ได้)" style="margin-bottom:6px"><button class="pbtn" style="width:100%" onclick="gdMake()">ตั้ง${Z.g}</button>
 <h4 style="margin:12px 0 4px">🔑 มีรหัสเชิญ</h4><div class="gdRow"><input id="gdJI" maxlength="10" placeholder="รหัสกลุ่ม 8 ตัว"><button class="gbtn" style="flex:0 0 auto" onclick="gdJoin(($('gdJI')||{}).value)">เข้าร่วม</button></div>
 <h4 style="margin:12px 0 4px">🏆 กลุ่มที่รับสมาชิก</h4><div id="gdLst"><p class="tag2">กำลังโหลด…</p></div></div>`}
window.gdThPick=k=>{const n=($('gdNmI')||{}).value,d=($('gdDsI')||{}).value;gdTh=k;gdIc=GTH[k].ic;const b=$('gdBody');if(!b)return;const lst=$('gdLst')&&$('gdLst').innerHTML;b.innerHTML=gdNew();if(n)$('gdNmI').value=n;if(d)$('gdDsI').value=d;if(lst&&$('gdLst'))$('gdLst').innerHTML=lst};
window.gdTheme=()=>{const b=$('gdBody');if(!b||!GD)return;b.innerHTML=`<div class="gdB"><p>เปลี่ยนแนวกลุ่ม (เปลี่ยนแค่คำเรียก ข้อมูลทุกอย่างอยู่ครบ · สัปดาห์ละครั้ง)</p><div class="gdThs">${Object.entries(GTH).map(([k,v])=>`<button class="${k===(GD.th||'murim')?'on':''}" onclick="gdThSet('${k}')"><b>${v.ic} ${v.g}</b><small>แนว${v.n} · ${v.ld} · ${v.m}</small></button>`).join('')}</div><button class="gbtn" style="width:100%;margin-top:8px" onclick="redraw2()">↩️ กลับ</button></div>`};
window.gdThSet=async th=>{const j=await gdW('theme',{th});if(j&&j.ok){toast('🎨 เปลี่ยนแนวเป็น'+GTH[th].g+'แล้ว');redraw()}};
function lstH(l,join){if(!l||!l.length)return'<p class="tag2">ยังไม่มีกลุ่ม เป็นคนแรกเลย</p>';
 return l.map((x,i)=>`<div class="gdL"><span class="r">${x.sc?i+1:'·'}</span><span class="i">${E(x.ic)}</span><span class="t"><b>${E(x.n)}</b><small>${(GTH[x.th]||GTH.murim).g} · Lv.${x.lv||1} · ${x.mc}/${x.cap||20} คน${x.ter?' · 🚩'+x.ter:''}${x.ds?' · '+E(x.ds):''}</small></span><b>${N(x.sc)}</b>${join&&x.mc<(x.cap||20)?`<button class="gbtn" style="padding:4px 10px" onclick="gdJoin('${E(x.id)}')">ขอเข้า</button>`:''}</div>`).join('')}
window.openGuild=async function(){modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🛡️ กลุ่มผู้เล่น</h3><div id="gdBody"><p class="tag2">กำลังโหลด…</p></div>`,'guild');
 let j=null;try{j=await api('gd&o=me')}catch(e){}const b=$('gdBody');if(!b)return;
 if(!j){b.innerHTML='<p class="tag2">เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง</p>';return}
 GD=j.g||null;window.__gdTag(GD);if(GD){b.innerHTML=gdView(GD);gdLive()}else{b.innerHTML=gdNew();try{const l=await api('gd&o=list');const d=$('gdLst');if(d)d.innerHTML=lstH(l&&l.l,1)}catch(e){}}};
function gdLive(){clearInterval(gdPoll);gdPoll=setInterval(async()=>{const c=$('gdCh');if(!c||!GD){clearInterval(gdPoll);return}if(document.hidden)return;try{const j=await api('gd&o=me');if(j&&j.g&&$('gdCh')){GD=j.g;window.__gdTag(GD);$('gdCh').innerHTML=chatH(GD)}}catch(e){}},9000)}
const redraw=()=>{const b=$('gdBody');if(!b)return openGuild();if(GD){b.innerHTML=gdView(GD);gdLive()}else openGuild()};
window.gdPick=(i,el)=>{gdIc=i;try{el.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===el))}catch(e){}};
window.gdMake=async()=>{const n=(($('gdNmI')||{}).value||'').trim();if([...n].length<2)return toast('🛡️ ชื่อกลุ่มสั้นไป');const j=await gdW('create',{gn:n,ic:gdIc,th:gdTh,ds:(($('gdDsI')||{}).value||'').trim()});if(j&&j.ok){toast(`${GTH[gdTh].ic} ตั้ง${GTH[gdTh].g} ${n} แล้ว`);redraw()}};
window.gdJoin=async id=>{id=String(id||'').trim().toLowerCase();if(!id)return toast('🛡️ ใส่รหัสกลุ่มก่อน');const j=await gdW('join',{g:id});if(j&&j.ok){toast(`🏯 เข้าร่วม ${GD?GD.n:''} แล้ว`);redraw()}};
window.gdSay=async()=>{const i=$('gdSay');const x=(i&&i.value||'').trim();if(!x)return;i.value='';const j=await gdW('say',{x});if(j&&j.ok&&$('gdCh'))$('gdCh').innerHTML=chatH(GD)};
window.gdLeave=async()=>{if(!confirm('ออกจาก'+Z.g+'นี้? แต้มที่คุณส่งไปแล้วยังอยู่กับ'+Z.g))return;const j=await gdW('leave');if(j&&j.ok){toast('🚪 ออกจากสำนักแล้ว');openGuild()}};
window.gdKick=async(u,n)=>{if(!confirm(`เชิญ ${n} ออกจาก${Z.g}? (เข้าใหม่ได้หลัง 3 วัน)`))return;const j=await gdW('kick',{u});if(j&&j.ok)redraw()};
window.gdDesc=async()=>{const d=prompt('คำขวัญ'+Z.g+' (ไม่เกิน 60 ตัว)',GD&&GD.ds||'');if(d==null)return;const j=await gdW('desc',{ds:d});if(j&&j.ok)redraw()};
window.gdBoard=async()=>{const b=$('gdBody');if(!b)return;b.innerHTML='<p class="tag2">กำลังโหลด…</p>';try{const l=await api('gd&o=list');b.innerHTML=(`<div class="gdB"><p class="tag2">อันดับ${Z.g}สัปดาห์นี้ (รีเซ็ตทุกวันจันทร์)</p>${lstH(l&&l.l,0)}<button class="gbtn" style="width:100%;margin-top:8px" onclick="openGuild()">↩️ กลับ${Z.g}</button></div>`)}catch(e){b.innerHTML='<p class="tag2">โหลดไม่ได้</p>'}};

// ============================================================
// 🎯 เป้าหมายร่วมทั้งเว็บ (นับฝั่งเซิร์ฟเวอร์จากชีวิตที่จบในโลกของสัปดาห์ · อายุ 10 ปีขึ้นไป)
// ============================================================
let CHR=null;
const chrGet=()=>{const f=FT();if(f&&f.eraLoad)return f.eraLoad().then(j=>{CHR=j;return j});return fetch(API+'?a=chr').then(r=>r.json()).then(j=>{CHR=j;return j}).catch(()=>null)};
const cgFresh=()=>fetch(API+'?a=chr').then(r=>r.json()).then(j=>{if(j&&j.ok)CHR=j;return j}).catch(()=>CHR);
const wName=w=>(WN[w]||[w,'','🌏']);
const BLESS='ทุกชีวิตที่เริ่มสัปดาห์นี้ได้ 🎁 เงินตั้งตัว + กรรมดี';
function cgHtml(j){if(!j||!j.cg)return'<p class="tag2">โหลดเป้าหมายไม่ได้</p>';const c=j.cg,w=wName(c.w),p=Math.min(100,c.c/c.n*100),pc=j.pcg,pw=pc?wName(pc.w):null;
 return`<div class="it"><b>${w[2]} สัปดาห์นี้: ทั้งเว็บช่วยกันจบ ${N(c.n)} ชีวิตใน${w[0]}</b><div class="bar"><i style="width:${p}%"></i></div><small>${N(c.c)} / ${N(c.n)} ชีวิต${c.c>=c.n?' · ✅ สำเร็จแล้ว! สัปดาห์หน้าทุกคนได้พร':''} · นับเฉพาะชีวิตที่อยู่ถึง 10 ปี</small></div>
 ${pc?`<div class="it ${pc.ok?'gift':''}">${pc.ok?`🎁 <b>สัปดาห์ก่อนทั้งเว็บทำสำเร็จ</b> (${pw[0]} ${N(pc.c)}/${N(pc.n)}) — ${BLESS}`:`สัปดาห์ก่อน ${pw[0]} ได้ ${N(pc.c)}/${N(pc.n)} — ยังไม่ถึง พรเลยไม่ลงมา`}</div>`:''}`}
window.openCG=async function(){modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🎯 เป้าหมายร่วมทั้งเว็บ</h3><div class="mtWB" id="cgB"><p class="tag2">กำลังโหลด…</p></div>`,'cg');const j=await cgFresh();const b=$('cgB');if(b)b.innerHTML=xT(cgHtml(j)+`<p class="tag2">ทุกวันจันทร์โลกเป้าหมายจะเปลี่ยน ทุกชีวิตที่จบในโลกนั้นของทุกคนนับรวมกัน</p>`)};
setTimeout(()=>{chrGet()},2500);

// ============================================================
// 🎁 ของขวัญเริ่มชีวิต (กลับมาแล้ว / พรทั้งเว็บ) — ใส่ตอนเห็นชีวิตใหม่ครั้งแรก
// ============================================================
const GK='murim_wbgift';
setInterval(()=>{try{if(!S||!S.alive||S._mt)return;if((+S.age||0)>18){S._mt=1;return}S._mt=1;const L=[];
  const g=LS.get(GK,null);if(g&&g.n>0){const m=Math.max(300,Math.round((+S.money||0)*.5+500*g.d));S.money=(+S.money||0)+m;S.happy=(+S.happy||0)+5;g.n--;if(g.n>0)LS.set(GK,g);else LS.del?LS.del(GK):LS.set(GK,null);L.push(`👋 <b>ของขวัญต้อนรับกลับ</b> เงินตั้งตัว +${N(m)}${g.n>0?` (เหลืออีก ${g.n} ชีวิต)`:''}`)}
  const j=CHR;if(j&&j.pcg&&j.pcg.ok){const m=Math.max(200,Math.round((+S.money||0)*.3+400));S.money=(+S.money||0)+m;S.karma=(+S.karma||0)+2;try{if(S.luck!=null)S.luck+=3}catch(e){}L.push(`🎯 <b>พรจากผู้เล่นทั้งเว็บ</b> (เป้าหมายสัปดาห์ก่อนสำเร็จ) เงิน +${N(m)} · กรรมดี +2`)}
  if(L.length)setTimeout(()=>{try{L.forEach(x=>log(x,'myth',true))}catch(e){}},1200)}catch(e){}},1500);

// ============================================================
// 👋 ระหว่างที่คุณไม่อยู่ (หายไป 3 วันขึ้นไป)
// ============================================================
const LV='murim_lastv';
const last=+LS.get(LV,0)||0;const away=last?NOW()-last:0;
LS.set(LV,NOW());setInterval(()=>{try{LS.set(LV,NOW())}catch(e){}},5*60e3);
async function welcome(){const d=Math.floor(away/864e5);
 const [j,wb,gm]=await Promise.all([cgFresh(),api('wb').catch(()=>null),api('gd&o=me').catch(()=>null)]);
 const f=FT(),er=f&&j&&j.prev?(()=>{const g=+j.prev.mg||0,e=+j.prev.me||0;return g+e<20?null:e>g*1.15?f.ERA.e:g>e*1.15?f.ERA.g:null})():null;
 const dd=((j&&j.pd)||[]).concat((j&&j.d)||[]).filter(x=>x&&x.d&&f&&f.DEED&&f.DEED[x.d]).slice(0,4);
 const gift={n:d>=14?3:d>=7?2:1,d:Math.min(30,d),t:NOW()};LS.set(GK,gift);
 const h=`<div class="mtWB"><p>คุณหายไป <b>${d} วัน</b> ระหว่างนั้นยุทธภพไม่ได้หยุดรอ</p>
 ${er?`<h4>📜 ยุคของสัปดาห์นี้</h4><div class="it"><b>${E(er[0])}</b><br><small>${E(er[1])}</small></div>`:''}
 ${dd.length?`<h4>🗞️ ข่าวจากผู้เล่นคนอื่น</h4>${dd.map(x=>`<div class="it"><b>${E(x.n)}</b> ${E(f.DEED[x.d])} <small>(อายุ ${N(x.a)})</small></div>`).join('')}`:''}
 ${wb&&wb.mx?`<h4>👹 บอสโลก</h4><div class="it"><b>${E(wb.ic||'👹')} ${E(wb.n||'บอสโลก')}</b> ${wb.ph==='on'&&wb.hp>0?`ยังยืนอยู่ เลือดเหลือ ${N(wb.hp)} / ${N(wb.mx)}`:wb.kn?`ถูกล้มแล้ว โดย ${E(wb.kn)}`:'พักฟื้น รอรอบใหม่'}<div class="bar"><i style="width:${Math.max(0,Math.min(100,(wb.hp||0)/wb.mx*100))}%;background:linear-gradient(90deg,#d84a4a,#ff8a5a)"></i></div></div>`:''}
 ${gm&&gm.g?`<h4>${thOf(gm.g).ic} ${thOf(gm.g).g} ${E(gm.g.n)}</h4><div class="it">อันดับสัปดาห์ ${gm.g.rk>0?'#'+gm.g.rk:'—'} · ${N(gm.g.sc)} แต้ม · ${thOf(gm.g).m} ${gm.g.m.length} คน${gm.g.ch&&gm.g.ch[0]&&!gm.g.ch[0].s?`<br><small>ข้อความล่าสุด: <b>${E(gm.g.ch[0].n)}</b> ${E(gm.g.ch[0].x)}</small>`:''}</div>`:''}
 <h4>🎯 เป้าหมายร่วมทั้งเว็บ</h4>${cgHtml(j)}
 <div class="it gift">🎁 <b>ของขวัญต้อนรับกลับ</b> — ${gift.n} ชีวิตถัดไปเริ่มด้วยเงินตั้งตัวก้อนพิเศษ</div>
 <button class="pbtn" style="width:100%;margin-top:10px" onclick="closeM()">กลับเข้ายุทธภพ</button></div>`;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>👋 ระหว่างที่คุณไม่อยู่</h3>${h}`,'wback')}
if(last&&away>=3*864e5){let n=0;const t=setInterval(()=>{n++;try{if(n>40){clearInterval(t);return}if(typeof modalOpen!=='undefined'&&modalOpen)return;if(typeof choice!=='undefined'&&choice._cur)return;if($('bootL')&&$('bootL').offsetParent)return;clearInterval(t);welcome().catch(e=>console.error('wback',e))}catch(e){}},1500)}

// ============================================================
// 📲 ติดตั้งเป็นแอป
// ============================================================
const standalone=()=>{try{return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){return false}};
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent||'')||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const canInstall=()=>!standalone()&&(!!window._bip||isIOS());
window.pwaInstall=async function(){try{document.querySelectorAll('.mtPWA').forEach(x=>x.remove())}catch(e){}
 if(window._bip){const p=window._bip;window._bip=null;try{p.prompt();const r=await p.userChoice;if(r&&r.outcome==='accepted'){LS.set('murim_pwa',{done:1,t:NOW()});toast('📲 ติดตั้งแล้ว เปิดจากหน้าจอโฮมได้เลย')}}catch(e){}return}
 if(isIOS())return modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📲 เพิ่มเกมลงหน้าจอโฮม (iPhone/iPad)</h3><div class="mtWB">
  <div class="it">1. เปิดเว็บนี้ด้วย <b>Safari</b> (ถ้าเปิดจากแอปอื่น ให้กด "เปิดใน Safari" ก่อน)</div><div class="it">2. แตะปุ่ม <b>แชร์</b> ⬆️ ที่แถบล่างของ Safari</div><div class="it">3. เลื่อนลงแล้วเลือก <b>"เพิ่มไปยังหน้าจอโฮม"</b> ➕</div><div class="it">4. กด <b>เพิ่ม</b> — ไอคอนเกมจะอยู่บนหน้าจอเหมือนแอป เปิดเต็มจอ ไม่มีแถบเบราว์เซอร์</div></div>`,'pwa');
 toast('เบราว์เซอร์นี้ติดตั้งไม่ได้ ลองเปิดด้วย Chrome หรือ Safari')};
function nudge(){try{if(!canInstall()||$('mtPWA0'))return;const P=LS.get('murim_pwa',{})||{};if(P.done||(P.no&&NOW()-P.no<14*864e5))return;const st=LS.get('murim_stats',{lives:0})||{};if((st.lives||0)<3)return;
 const d=document.createElement('div');d.className='mtPWA';d.id='mtPWA0';d.innerHTML=`<div style="font-size:30px">📲</div><div style="flex:1"><b>ติดตั้ง 1 ใน นวนิยาย เป็นแอป</b><small>เปิดเต็มจอ เร็วกว่า ไม่หลงแท็บ</small></div><button class="pbtn" onclick="pwaInstall()">ติดตั้ง</button><button class="gbtn" onclick="this.parentNode.remove();LS.set('murim_pwa',{no:Date.now()})">ไว้ก่อน</button>`;document.body.appendChild(d)}catch(e){}}

// ============================================================
// เมนู: ปุ่มสำนัก / เป้าหมาย / ติดตั้ง
// ============================================================
if(typeof openTitleMenu==='function'){const _ot=openTitleMenu;openTitleMenu=function(){const r=_ot.apply(this,arguments);try{const m=$('modal'),g=m&&m.querySelector('.tmgrid');if(g&&!m.querySelector('.mtGd')){const tg=LS.get('murim_gdtag',null);
  const add=(cls,ic,t,fn)=>{const b=document.createElement('button');b.className='cb '+cls;b.innerHTML=`<i>${ic}</i>${t}`;b.onclick=fn;g.insertBefore(b,g.firstChild)};
  if(canInstall())add('mtIn','📲','ติดตั้งแอป',()=>{closeM();pwaInstall()});
  add('mtCgB','🎯','เป้าหมายทั้งเว็บ',()=>openCG());
  add('mtGd',tg&&tg.ic?E(tg.ic):'🛡️',tg&&tg.n?E(tg.n):'กลุ่มผู้เล่น',()=>openGuild())}}catch(e){}return r}}
if(typeof openMenu==='function'){const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.mtGd')){const tg=LS.get('murim_gdtag',null),c=CHR&&CHR.cg;
  g.insertAdjacentHTML('beforeend',`<button class="opt mtGd" onclick="openGuild()">${tg&&tg.ic?E(tg.ic):'🛡️'} กลุ่มผู้เล่น<small>${tg&&tg.n?E(tg.n):'ตั้ง/เข้ากลุ่มกับผู้เล่นจริง'}</small></button><button class="opt mtCgB" onclick="openCG()">🎯 เป้าหมายทั้งเว็บ<small>${c?`${wName(c.w)[0]} ${N(c.c)}/${N(c.n)}`:'ช่วยกันทั้งเว็บ'}</small></button>`)}}catch(e){}return r}}

// ============================================================
// 🧭 ชีวิตหน้าลองอะไรดี + 🖼️ การ์ดเรื่องสั้น (หน้าสรุปชีวิต)
// ============================================================
const ENDK={retire:['🏞️','วางมือกลางทาง','ตอนชื่อเสียงสูงสุด ลองเลือก "วางมือ" เมื่อมีคนมาเสนอ แล้วดูว่าชีวิตจบแบบไหน'],ordain:['🛕','ออกบวช','กรรมดีสูง อายุมาก และเคยสูญเสียคนสำคัญ ชีวิตอาจเลือกทางวัดให้คุณ'],vanish:['🌫️','หายสาบสูญ','บางชีวิตไม่มีหลุมศพ ลองเดินทางไกลบ่อยๆ ตอนแก่'],jail:['⛓️','จบในคุก','ทำชั่วจนชื่อดัง แล้วอย่าหนีตอนทางการมาเคาะประตู']};
let LAST=null;
function snap(){try{const f=S.fate||{},sd=f.sd||{},F0=FT();const seen=LS.get('murim_seedseen',{})||{};Object.keys(sd).forEach(k=>seen[k]=1);LS.set('murim_seedseen',seen);
  const w=wk();const ws=LS.get('murim_wseen',{})||{};if(w)ws[w]=(ws[w]||0)+1;LS.set('murim_wseen',ws);
  const es=LS.get('murim_endseen',{})||{};if(f.end)es[f.end]=1;LS.set('murim_endseen',es);
  const ep=(()=>{try{return S.epithet||epithet()}catch(e){return''}})(),kk=(S.key||[]).map(x=>String(x).replace(/<[^>]+>/g,''));
  LAST={w,name:S.name,ep,age:S.age,cause:S.cause||S.deathCause||'',key:kk,sd,ws,es,seen,SEEDS:F0?F0.SEEDS:[],karma:+S.karma||0,soul:S.ch==='soul'&&S.sv?{r:(S.sv.rings||[]).length,cb:(S.sv.cb||[]).length,lv:S.sv.lv}:null}}catch(e){console.error('meta snap',e);LAST=null}}
function nextIdeas(L){const out=[];const S0=L.SEEDS||[];
 // ชะตาค้างจากชีวิตนี้
 const hang=Object.keys(L.sd).map(k=>({k,d:L.sd[k],s:S0.find(x=>x.id===k)})).filter(x=>x.d&&x.d.k!=null&&!x.d.done&&x.s);
 if(hang.length){const due=Math.min(...hang.map(x=>x.s.due?x.s.due[0]:99));out.push([10,'🌱',`ชะตาค้าง ${hang.length} เรื่องยังไม่ทันย้อนกลับมา`,`สิ่งที่คุณเลือกตอนเด็กมีผลตามมาช่วงอายุ ${due} ปีขึ้นไป ชีวิตนี้จบก่อน ลองประคองให้อยู่ถึงวัยนั้น แล้วเลือกเหมือนเดิม (หรือตรงข้าม) ดูว่าผลต่างกันแค่ไหน`])}
 // ชะตาที่ยังไม่เคยเจอเลย
 const cls=!/^m_/.test(L.w);const pool=S0.filter(x=>!L.seen[x.id]&&(cls?x.w!=='m':x.w!=='c'));if(pool.length)out.push([6,'🎲',`ยังมีเหตุการณ์ชะตาอีก ${pool.length} เรื่องที่คุณไม่เคยเจอ`,cls?'บางเรื่องเกิดเฉพาะตอนเด็ก บางเรื่องต้องเป็นคนจน บางเรื่องต้องอยู่ในสำนัก เกิดใหม่ด้วยฐานะต่างจากเดิมจะเจอเรื่องที่ไม่ซ้ำ':'ยุคปัจจุบันแต่ละโลกมีเหตุการณ์ชะตาของตัวเอง ลองโลกที่ยังไม่เคยไป'])
 // โลกที่ยังไม่เคยไป
 const nv=Object.keys(WN).filter(k=>!L.ws[k]);if(nv.length){const k=nv[Math.floor(Math.random()*nv.length)],w=WN[k];out.push([nv.length>=10?8:5,w[2],`ยังไม่เคยไป${w[0]}`,`มีอีก ${nv.length} โลก/โหมดที่คุณยังไม่ได้ลอง ${w[0]}เป็นหนึ่งในนั้น เลือกได้ที่หน้าเลือกโลกตอนเกิดใหม่`])}
 // ตอนจบที่ซ่อนอยู่
 const ne=Object.keys(ENDK).filter(k=>!L.es[k]);if(ne.length&&cls){const k=ne[Math.floor(Math.random()*ne.length)],x=ENDK[k];out.push([4,x[0],`ตอนจบลับ "${x[1]}" ยังไม่เคยเกิดกับคุณ`,x[2]])}
 // กรรมสุดทาง
 if(Math.abs(L.karma)<30&&cls)out.push([3,'⚖️','ลองชีวิตที่สุดทางสักข้าง','ชีวิตนี้กรรมกลางๆ ยุคของทั้งเว็บขึ้นกับว่าผู้เล่นส่วนใหญ่เลือกธรรมะหรือมาร ชีวิตหน้าลองดีสุดหรือชั่วสุด จะเจอเหตุการณ์คนละชุด'])
 if(L.soul){if(!L.soul.cb)out.push([7,'🔗','ยังไม่เคยได้ท่าประสานวิญญาณ','มีคู่ชีวิตหรือเพื่อนในทีมที่ผูกพันสูง แล้วฝึกจนระดับจิต 20 จะมีโอกาสคิดท่าใหม่ที่ไม่มีในตำรา'])
  else if(L.soul.r<9)out.push([5,'⭕',`วงแหวน ${L.soul.r} วง ยังไปได้อีก`,'ไว้ชีวิตสัตว์บ้าง ปล่อยลูกสัตว์คืนป่า วันหนึ่งมันอาจกลับมาทำให้วงแหวนของคุณแก่ขึ้น'])}
 if(canInstall()){const P=LS.get('murim_pwa',{})||{};if(!P.done)out.push([2,'📲','ติดตั้งเกมเป็นแอป','เปิดเต็มจอ โหลดเร็วกว่า ไม่หลงแท็บ'])}
 try{if(!LS.get('murim_gdtag',null))out.push([3,'🛡️','ยังไม่มีกลุ่ม','ชีวิตที่เพิ่งจบนี้จะได้แต้มเข้ากลุ่มทันทีถ้าอยู่ในสำนักแล้ว ตั้งสำนักกับเพื่อน หรือขอเข้าสำนักของคนอื่น'])}catch(e){}
 return out.sort((a,b)=>b[0]-a[0]).slice(0,3)}
if(typeof endGame==='function'){const _eg=endGame;endGame=function(){try{if(S)snap()}catch(e){}const r=_eg.apply(this,arguments);try{setTimeout(()=>{try{const box=$('end'),b=box&&box.querySelector('.box.rec');if(!b||!LAST||b.querySelector('.mtNext'))return;const L=nextIdeas(LAST);
  const d=document.createElement('div');d.className='mtNext';d.innerHTML=(`<h5>🧭 ชีวิตหน้าลองอะไรดี</h5>${L.map(x=>`<div class="nx"><i>${x[1]}</i><div><b>${E(x[2])}</b><small>${E(x[3])}</small></div></div>`).join('')}
  <div class="nxB"><button class="pbtn" onclick="storyCard()">🖼️ การ์ดเรื่องสั้น</button>${LS.get('murim_gdtag',null)?'':'<button class="gbtn" onclick="openGuild()">🛡️ กลุ่มผู้เล่น</button>'}</div>`);
  const fb=b.querySelector('.fateBox');if(fb)fb.after(d);else{const h=[...b.querySelectorAll('h5')].find(x=>/กราฟชีวิต/.test(x.textContent));if(h)b.insertBefore(d,h);else b.appendChild(d)}
  setTimeout(nudge,4000)}catch(e){console.error('meta next',e)}},60)}catch(e){}return r}}

// ---------- การ์ดเรื่องสั้นแนวตั้ง 1080×1920 ----------
let IMG=null;const img=()=>IMG?Promise.resolve(IMG):new Promise(ok=>{const i=new Image();i.onload=()=>{IMG=i;ok(i)};i.onerror=()=>ok(null);i.src='/worlds.png?v=2'});
const SEG=(()=>{try{return new Intl.Segmenter('th',{granularity:'word'})}catch(e){return null}})();
function wrap(g,t,maxW){const out=[];let line='';const parts=SEG?[...SEG.segment(t)].map(x=>x.segment):[...t];for(const ch of parts){const tl=line+ch;if(g.measureText(tl).width>maxW&&line){out.push(line);line=ch.trim()?ch:''}else line=tl}if(line)out.push(line);return out}
function pick5(K){const L=K.filter(x=>x&&x.length>6&&!/📖|ครั้งแรก|คู่มือ|กด ⭕|ปณิธาน/.test(x));if(L.length<=5)return L;const o=[];for(let i=0;i<5;i++)o.push(L[Math.round(i*(L.length-1)/4)]);return o}
async function drawCard(L){const W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 const ff=(()=>{try{return getComputedStyle(document.body).fontFamily||'sans-serif'}catch(e){return'sans-serif'}})();
 const bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#0e0a14');bg.addColorStop(.5,'#1a1220');bg.addColorStop(1,'#0b0910');g.fillStyle=bg;g.fillRect(0,0,W,H);
 const I=await img(),w=WN[L.w]||WN.murim,row=Math.max(0,ORD.indexOf(w[1]));
 if(I){g.imageSmoothingEnabled=false;g.drawImage(I,0,row*64,96,64,0,0,W,720);const sh=g.createLinearGradient(0,480,0,760);sh.addColorStop(0,'#0e0a1400');sh.addColorStop(1,'#140e1a');g.fillStyle=sh;g.fillRect(0,480,W,280)}
 g.textAlign='center';g.fillStyle='#e8b54a';g.font=`700 34px ${ff}`;g.fillText(`${w[2]} ${w[0]}`,W/2,790);
 g.fillStyle='#ffe7a8';g.font=`800 64px ${ff}`;let y=880;wrap(g,`「${L.ep||'ไร้ฉายา'}」`,W-120).slice(0,2).forEach(l=>{g.fillText(l,W/2,y);y+=76});
 g.fillStyle='#fff';g.font=`700 54px ${ff}`;g.fillText(String(L.name||'').slice(0,24),W/2,y+4);y+=70;
 g.fillStyle='#bba882';g.font=`400 34px ${ff}`;wrap(g,`${L.cause?L.cause+' · ':''}อายุ ${N(L.age)} ปี`,W-140).slice(0,2).forEach(l=>{g.fillText(l,W/2,y);y+=46});y+=24;
 g.strokeStyle='#e8b54a66';g.lineWidth=3;g.beginPath();g.moveTo(140,y);g.lineTo(W-140,y);g.stroke();y+=40;
 const K=pick5(L.key||[]);g.textAlign='left';
 for(let i=0;i<K.length;i++){const m=String(K[i]).match(/^(\d[\d,]*)\s*ปี\s*[—-]\s*(.*)$/),ag=m?m[1]:'',tx=(m?m[2]:K[i]).slice(0,120);
  g.font=`400 36px ${ff}`;const ls=wrap(g,tx,W-210).slice(0,3),need=76+ls.length*46+24;if(y+need>H-190)continue;
  g.fillStyle='#e8b54a';g.beginPath();g.arc(110,y+16,12,0,7);g.fill();if(i<K.length-1&&y+need+150<H-190){g.fillStyle='#e8b54a44';g.fillRect(107,y+34,6,need-30)}
  g.fillStyle='#ffd84a';g.font=`700 32px ${ff}`;g.fillText(ag?`อายุ ${ag}`:'',150,y+28);g.fillStyle='#f1e3c2';g.font=`400 36px ${ff}`;let yy=y+76;ls.forEach(l=>{g.fillText(l,150,yy);yy+=46});y=yy+24}
 g.textAlign='center';g.fillStyle='#e8b54a';g.font=`800 44px ${ff}`;g.fillText('1 ใน นวนิยาย',W/2,H-110);g.fillStyle='#bba882';g.font=`400 30px ${ff}`;g.fillText('1inanovel.com · ชีวิตของคุณจะเป็นแบบไหน',W/2,H-64);
 return c}
window.storyCard=async function(){if(!LAST)return toast('ไม่มีชีวิตให้ทำการ์ด');let c;try{c=await drawCard(LAST)}catch(e){console.error(e);return toast('สร้างการ์ดไม่สำเร็จ')}
 const url=c.toDataURL('image/png');
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🖼️ การ์ดเรื่องสั้น</h3><div class="mtStory"><img src="${url}" alt="การ์ดชีวิต"><div class="gdRow" style="display:flex;gap:6px"><button class="pbtn" style="flex:1" onclick="storyShare()">📤 แชร์</button><button class="gbtn" style="flex:1" onclick="storySave()">💾 บันทึกรูป</button></div><p class="tag2">ขนาดแนวตั้งสำหรับสตอรี่ IG / TikTok / Facebook</p></div>`,'story');
 window._stC=c};
const fname=()=>`1inanovel-${String(LAST&&LAST.name||'life').replace(/[^\p{L}\p{N}]+/gu,'_').slice(0,20)}.png`;
window.storySave=function(){const c=window._stC;if(!c)return;const a=document.createElement('a');a.href=c.toDataURL('image/png');a.download=fname();document.body.appendChild(a);a.click();a.remove()};
window.storyShare=function(){const c=window._stC;if(!c)return;c.toBlob(async b=>{try{const f=new File([b],fname(),{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'1 ใน นวนิยาย',text:`「${LAST.ep}」 ${LAST.name} · ${LAST.cause} อายุ ${LAST.age} ปี #1ในนวนิยาย`});return}}catch(e){if(e&&e.name==='AbortError')return}storySave();toast('เครื่องนี้แชร์รูปตรงๆ ไม่ได้ บันทึกรูปให้แล้ว')},'image/png')};

window._meta={openGuild,openCG,welcome,nextIdeas,drawCard,snap,getLast:()=>LAST,canInstall};
})();
try{wReady('meta')}catch(e){}
