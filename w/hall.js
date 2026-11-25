// ============================================================
// /w/hall.js 🏯 หอชะตา — วงจรเล่นเพลินข้ามโลก (ทุกโลกทุกโหมด · โหลดเบื้องหลัง)
//  1) 🗓️ กระดานวันนี้: 3 งานจากต่างโลกต่างโหมด + งานลับ 1 ข้อ (ปริศนา ไม่บอกตรงๆ) · งานค้างทำต่อได้อีก 2 วัน
//     ครบ 3 = หีบรายวัน · ครบ 5 วันในสัปดาห์ = หีบใหญ่ (ชุด/ปีกในตู้เสื้อผ้า)
//  2) 🛂 พาสปอร์ตโลก: เลเวล 1–10 รายโลก ได้ XP จากการจบชีวิตในโลกนั้นและงานวันนี้ · Lv5/Lv10 ได้ชุดของโลกนั้น
//     ปั๊มครบ 8 โลก → ตราลับ "โลกที่ 0"
//  3) 🏯 ห้องในหอ: ผลิตเศษชะตาทุกชั่วโมง (เก็บได้สูงสุด 12 ชม.) · ปลดห้องด้วยพาสปอร์ต · ห้องลับเปิดด้วยกุญแจหยก 3 ดอก
//  4) 🎲 มินิเกมคาดเดาไม่ได้: ประตูกลืนชะตา (ดันดวง) · ไพ่เซียนพลิกกฎ · หม้อหลอมโอสถ (เข็มบ้า)
//  5) 🔮 ความลับของหอ 8 อย่าง (คำใบ้ครึ่งๆ)
//  LS murim_loop = {sh, pp:{โลก:xp}, d:{day,t:[งาน],h:{งานลับ}}, wk:{w,n:[วัน]}, man:{r:{ห้อง:lv},t}, mg:{day,n}, key, sec:{}, cl:{วันที่รับหีบ}}
//  ห่อ passYear (เช็คงาน) · saveLegacy (จบชีวิต → XP) · openMenu/openTitleMenu (ปุ่มเข้า)
// ============================================================
try{(()=>{
const LK='murim_loop';
const E=s=>{try{return esc(String(s==null?'':s))}catch(e){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}};
const ld=()=>{let d=null;try{d=LS.get(LK,null)}catch(e){}d=d&&typeof d==='object'?d:{};d.sh=Math.max(0,Math.floor(+d.sh||0));d.pp=d.pp||{};d.d=d.d||{};d.wk=d.wk||{};d.man=d.man||{};d.man.r=d.man.r||{yard:1};d.mg=d.mg||{};d.sec=d.sec||{};d.cl=d.cl||{};d.key=d.key|0;return d};
const sv=d=>{try{LS.set(LK,d)}catch(e){}};
const TOD=()=>new Date(Date.now()+7*3600e3).toISOString().slice(0,10);
const dayN=s=>Math.floor(Date.parse(s+'T00:00:00Z')/864e5);
const WKID=()=>{const n=dayN(TOD());return Math.floor((n+3)/7)}; // สัปดาห์เริ่มวันจันทร์
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rng=seed=>{let x=seed||1;return()=>{x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;return x/4294967296}};
const devSeed=()=>{try{let s=LS.get('murim_lpSeed',0);if(!s){s=Math.floor(Math.random()*1e9)+1;LS.set('murim_lpSeed',s)}return s}catch(e){return 7}};
const T_=f=>{try{return f()}catch(e){return null}};
const ri=()=>T_(()=>realmIdx())|0;
const age=()=>(S&&S.age)|0;
const toastQ=(t)=>{try{toast(t)}catch(e){}};
const sfxQ=k=>{try{sfx(k)}catch(e){}};

// ---------- โลก ----------
const WL={murim:['⚔️','ยุทธภพ','m'],xian:['☁️','โลกเซียน','x'],god:['🌟','แดนเทพ','g'],soul:['⭕','จิตวิญญาณยุทธ์','s'],mw:['🏙️','ยุคปัจจุบัน','n'],sky:['🌠','ทะลุฟ้าดารา','k'],fog:['🌉','นครม่านหมอก','f'],beast:['🐾','สัตว์อสูร',''],hell:['🔥','โหมดนรก',''],short:['⏳','ชีวิตสั้น',''],junk:['🗑️','รากขยะ',''],loop:['🔁','ผู้ย้อนกาล','']};
const WORLDS=Object.keys(WL);
const wkey=()=>{if(!S)return null;const M=S.mw;if(M&&M.sky)return'sky';if(M&&M.fog)return'fog';if(S.beastMode)return'beast';if(S.ch==='soul')return'soul';if(S.rg)return'loop';if(M)return'mw';
 if(S.ch==='hell')return'hell';if(S.ch==='short')return'short';if(S.ch==='junk')return'junk';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
const fogSolved=()=>T_(()=>((S.mw.fog.cases||[]).filter(c=>c&&c.r==='ok').length))|0;
// งานรายโลก: [id, โลก, ข้อความ, เงื่อนไข]
const TASKS=[
 ['m50','murim','อยู่ถึงอายุ 50 ในยุทธภพ',()=>wkey()==='murim'&&age()>=50],
 ['msect','murim','เข้าสำนักในยุทธภพ',()=>wkey()==='murim'&&!!S.faction],
 ['mr2','murim','ทะลวงถึงขั้นสาม (ยุทธภพ)',()=>!S.mw&&!S.beastMode&&S.ch!=='soul'&&ri()>=2],
 ['xup','xian','ไปให้ถึงโลกเซียน (ชีวิตไหนก็ได้)',()=>!!S.xian],
 ['gup','god','ไปให้ถึงแดนเทพ',()=>!!S.xt],
 ['s2','soul','มีวงแหวนวิญญาณ 2 วง',()=>S.ch==='soul'&&((S.sv&&S.sv.rings||[]).length>=2)],
 ['s30','soul','อยู่ถึงอายุ 30 ในทวีปจิตวิญญาณยุทธ์',()=>S.ch==='soul'&&age()>=30],
 ['k2','sky','ได้ยศนักล่าขั้น 2 ในทะลุฟ้าดารา',()=>!!(S.mw&&S.mw.sky)&&(S.mw.sky.rk|0)>=2],
 ['k30','sky','อยู่ถึงอายุ 30 ในทะลุฟ้าดารา',()=>!!(S.mw&&S.mw.sky)&&age()>=30],
 ['f2','fog','ปิดคดีสำเร็จ 2 คดีในนครม่านหมอก',()=>!!(S.mw&&S.mw.fog)&&fogSolved()>=2],
 ['ft','fog','ขึ้นธรณีขั้น 2 ในนครม่านหมอก',()=>!!(S.mw&&S.mw.fog)&&(S.mw.fog.tier|0)>=2],
 ['n200','mw','ชื่อเสียง 200 ในยุคปัจจุบัน',()=>!!S.mw&&!S.mw.sky&&!S.mw.fog&&(S.mw.fame|0)>=200],
 ['n40','mw','อยู่ถึงอายุ 40 ในยุคปัจจุบัน',()=>!!S.mw&&!S.mw.sky&&!S.mw.fog&&age()>=40],
 ['b30','beast','มีชีวิตเป็นสัตว์อสูรถึงอายุ 30',()=>!!S.beastMode&&age()>=30],
 ['bh','beast','สัตว์อสูรแปลงกายเป็นคน',()=>!!(S.beastMode&&S.beastMode.human)],
 ['h5','hell','ลงนรกให้ถึงชั้น 5',()=>S.ch==='hell'&&((S.hell&&S.hell.lv)|0)>=5],
 ['sh28','short','ชีวิตสั้น อยู่ให้ถึงอายุ 28',()=>S.ch==='short'&&age()>=28],
 ['j1','junk','รากขยะ ทะลวงพ้นไร้ระดับ',()=>S.ch==='junk'&&ri()>=1],
 ['rg25','loop','ผู้ย้อนกาล อยู่ถึงอายุ 25',()=>!!S.rg&&age()>=25],
 ['kid2','any','มีลูก 2 คน (โลกไหนก็ได้)',()=>(S.kids|0)>=2],
 ['wed','any','แต่งงาน (โลกไหนก็ได้)',()=>!!S.spouse],
 ['k60','any','กรรมดีถึง 60',()=>(S.karma|0)>=60],
 ['fm300','any','ชื่อเสียงถึง 300',()=>(S.fame|0)>=300]];
const TK=Object.fromEntries(TASKS.map(t=>[t[0],t]));
// งานลับ: คำใบ้กำกวม · เงื่อนไขเช็คตอนจบชีวิต (e=1) หรือระหว่างทาง
const HID=[
 ['hpoor','“จนกรอบ แต่ฟ้ายังยิ้มให้”',(e)=>e&&(S.karma|0)>=80&&(S.money|0)<200],
 ['hlone','“ไม่มีบ้านให้กลับ แต่ทั้งเมืองรู้จักชื่อ”',()=>!S.faction&&!S.mw&&(S.fame|0)>=300],
 ['hkids','“โต๊ะกินข้าวที่ไม่เคยเงียบ”',()=>(S.kids|0)>=4],
 ['hfast','“ฟ้าแลบก่อนเสียงฟ้าร้อง”',()=>!S.mw&&!S.beastMode&&ri()>=3&&age()<=30],
 ['hearly','“ดอกไม้ที่ร่วงก่อนบาน แต่กลิ่นยังอยู่”',(e)=>e&&age()<10&&(S.fame|0)>0],
 ['hold','“ต้นไม้ที่เห็นทุกฤดูมาร้อยครั้ง”',()=>age()>=100],
 ['hcold','“หัวใจที่ไม่เคยผูกกับใคร แต่ยืนอยู่จนวันสุดท้าย”',(e)=>e&&!S.spouse&&age()>=70],
 ['hbad','“ชื่อที่แม่ใช้ขู่ลูกให้นอน”',()=>(S.karma|0)<=-100]];
const HK=Object.fromEntries(HID.map(t=>[t[0],t]));

// ---------- พาสปอร์ต ----------
const XPL=[1,10,25,45,70,100,140,190,250,320];
const lvOf=xp=>{let l=0;for(let i=0;i<XPL.length;i++)if(xp>=XPL[i])l=i+1;return l};
const ppLv=(d,w)=>lvOf(d.pp[w]|0);
const totLv=d=>WORLDS.reduce((a,w)=>a+(d.pp[w]?ppLv(d,w):0),0);
const shMul=d=>1+.02*totLv(d)+(d.sec.room?.1:0);
const giveSh=(d,n,why)=>{n=Math.max(1,Math.round(n*shMul(d)));d.sh+=n;return n};
const W_GRP=w=>WL[w]?WL[w][2]:'';
function giveOutfit(grp){try{const W=window._WD;if(!W||!window._wdGive)return null;const L=[];W.forEach((w,i)=>{if((!grp||w[1]===grp)&&w[5]!=='f')L.push(i)});for(let k=0;k<30&&L.length;k++){const i=L.splice(Math.floor(Math.random()*L.length),1)[0];if(window._wdGive('o',i))return W[i][0]}}catch(e){}return null}
function giveWing(){try{const G=window._WG;if(!G||!window._wdGive)return null;for(let k=0;k<20;k++){const j=Math.floor(Math.random()*G.length);if(window._wdGive('w',j))return G[j].n}}catch(e){}return null}
function addXP(d,w,n,msgs){if(!WL[w])return;const l0=ppLv(d,w);d.pp[w]=(d.pp[w]|0)+n;const l1=ppLv(d,w);
 for(let l=l0+1;l<=l1;l++){if(l<=1)continue;const g=giveSh(d,15*l);let x=`🛂 พาสปอร์ต${WL[w][1]} Lv.${l} · เศษชะตา +${g}`;
  if(l===5||l===10){const o=giveOutfit(W_GRP(w))||(l===10?giveWing():null);if(o)x+=` · 🎁 ${o}`}
  if(l===3&&w==='xian')x+=' · ปลดห้องหอยา';if(l===3&&w==='sky')x+=' · ปลดหอดาว';if(l===3&&w==='fog')x+=' · ปลดห้องสืบ';if(l===3&&w==='soul')x+=' · ปลดศาลวิญญาณ';
  msgs.push(x)}
 if(!d.sec.w0&&WORLDS.filter(k=>(d.pp[k]|0)>=XPL[1]).length>=8){d.sec.w0=1;msgs.push('🔮 ความลับ: ตราประทับ “โลกที่ 0” ปรากฏในพาสปอร์ต · เศษชะตา +'+giveSh(d,80))}}

// ---------- กระดานวันนี้ ----------
function roll(d){const day=TOD();if(d.d.day===day&&Array.isArray(d.d.t))return false;
 const keep=(Array.isArray(d.d.t)?d.d.t:[]).filter(t=>!t.ok&&!t.c&&dayN(day)-dayN(t.day||day)<=2).slice(0,2).map(t=>Object.assign({},t,{c:1}));
 const R=rng(hash(day)^devSeed());
 const W0=WORLDS.slice().sort((a,b)=>(ppLv(d,a)-ppLv(d,b))+(R()-.5)*3);
 const picked=[],used=new Set(keep.map(t=>TK[t.id]&&TK[t.id][1]));
 for(const w of W0){if(picked.length>=3)break;if(used.has(w))continue;const L=TASKS.filter(t=>t[1]===w);if(!L.length)continue;picked.push(L[Math.floor(R()*L.length)][0]);used.add(w)}
 if(picked.length<3){const A=TASKS.filter(t=>t[1]==='any');picked.push(A[Math.floor(R()*A.length)][0])}
 d.d={day,t:keep.concat(picked.map(id=>({id,day,ok:0}))),h:{id:HID[Math.floor(R()*HID.length)][0],ok:0}};return true}
function check(end){if(!S)return;const d=ld();roll(d);const msgs=[];let ch=false;
 d.d.t.forEach(t=>{if(t.ok)return;const k=TK[t.id];if(!k)return;let ok=false;try{ok=!!k[3]()}catch(e){}if(ok){t.ok=1;ch=true;const g=giveSh(d,12);addXP(d,k[1]==='any'?(wkey()||'murim'):k[1],4,msgs);msgs.unshift(`🗓️ งานวันนี้สำเร็จ: ${k[2]} · เศษชะตา +${g}`)}});
 const h=d.d.h;if(h&&!h.ok&&HK[h.id]){let ok=false;try{ok=!!HK[h.id][2](!!end)}catch(e){}if(ok){h.ok=1;ch=true;const g=giveSh(d,40);d.sec.hid=(d.sec.hid|0)+1;msgs.unshift(`🔮 งานลับวันนี้สำเร็จ! ${HK[h.id][1]} · เศษชะตา +${g}`);if(Math.random()<.35){d.key++;msgs.push('🗝️ ได้กุญแจหยก 1 ดอก')}}}
 if(ch){sv(d);msgs.forEach((m,i)=>setTimeout(()=>{toastQ(m);try{log(m,'good')}catch(e){}},i*900));sfxQ('good');badge()}}
const dayDone=d=>d.d.t.filter(t=>t.day===d.d.day&&!t.c).every(t=>t.ok);

// ---------- ห้องในหอ ----------
const ROOM={yard:['🏮','ลานหน้าหอ',3,()=>true,'เปิดตั้งแต่แรก'],herb:['🧪','หอยา',4,d=>ppLv(d,'xian')>=3,'พาสปอร์ตโลกเซียน Lv.3'],star:['🔭','หอดาว',4,d=>ppLv(d,'sky')>=3,'พาสปอร์ตทะลุฟ้าดารา Lv.3'],case:['🕯️','ห้องสืบ',4,d=>ppLv(d,'fog')>=3,'พาสปอร์ตนครม่านหมอก Lv.3'],
 shrine:['⭕','ศาลวิญญาณ',4,d=>ppLv(d,'soul')>=3,'พาสปอร์ตจิตวิญญาณยุทธ์ Lv.3'],dojo:['🥋','โรงฝึก',5,d=>ppLv(d,'murim')>=4,'พาสปอร์ตยุทธภพ Lv.4'],vault:['🗝️','ห้องที่ไม่มีประตู',8,d=>!!d.sec.room,'???']};
const rate=d=>Object.keys(ROOM).reduce((a,k)=>a+((ROOM[k][3](d)&&d.man.r[k])?ROOM[k][2]*(d.man.r[k]|0):0),0);
function pending(d){const t0=d.man.t||Date.now();const hrs=Math.min(12,(Date.now()-t0)/3600e3);return Math.floor(rate(d)*hrs)}
const upCost=lv=>40*lv*lv;

// ---------- UI ----------
const css=document.createElement('style');css.textContent=`
#modal .lpTabs{display:flex;gap:6px;overflow-x:auto;margin:6px 0 10px;scrollbar-width:none}#modal .lpTabs::-webkit-scrollbar{display:none}
#modal .lpTabs button{flex:0 0 auto;border-radius:16px;padding:6px 11px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-size:13px}
#modal .lpTabs button.on{background:var(--gold,#e8c040);color:#1a1208;border-color:transparent;font-weight:700}
#modal .lpSh{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:12px;background:linear-gradient(135deg,rgba(232,192,64,.18),rgba(232,192,64,.04));border:1px solid rgba(232,192,64,.4);margin-bottom:8px}
#modal .lpSh b{font-size:18px}
#modal .lpT{display:flex;gap:10px;align-items:center;padding:9px 11px;border-radius:12px;background:var(--card);border:1px solid var(--line);margin:6px 0}
#modal .lpT.ok{opacity:.6}#modal .lpT .i{font-size:20px;width:26px;text-align:center}#modal .lpT .x{flex:1}#modal .lpT small{display:block;opacity:.7}
#modal .lpT.hid{border-style:dashed;border-color:#a080ff;background:linear-gradient(135deg,rgba(160,128,255,.12),transparent)}
#modal .lpPP{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}
#modal .lpPP>div{padding:8px 10px;border-radius:12px;background:var(--card);border:1px solid var(--line)}
#modal .lpBar{height:6px;border-radius:4px;background:rgba(127,127,127,.25);overflow:hidden;margin-top:5px}#modal .lpBar i{display:block;height:100%;background:var(--gold,#e8c040)}
#modal .lpBtn{border-radius:10px;padding:7px 12px;border:none;background:var(--gold,#e8c040);color:#1a1208;font:inherit;font-weight:700;cursor:pointer}
#modal .lpBtn[disabled]{opacity:.45}
#modal .lpBtn.g{background:transparent;color:var(--ink);border:1px solid var(--line);font-weight:400}
#modal .lpDoors{display:flex;gap:8px;justify-content:center;margin:12px 0}
#modal .lpDoors button{width:30%;aspect-ratio:3/4;border-radius:12px 12px 4px 4px;border:2px solid #6a4a2a;background:linear-gradient(#5a3a1e,#3a2410);color:#f0d080;font-size:28px;cursor:pointer;position:relative}
#modal .lpDoors button.fl{animation:lpFl 1.1s ease-in-out infinite}@keyframes lpFl{50%{box-shadow:0 0 14px rgba(255,220,120,.55)}}
#modal .lpCard{display:inline-flex;align-items:center;justify-content:center;width:64px;height:88px;border-radius:10px;background:#f4ecd8;color:#2a1a10;font-size:30px;font-weight:800;border:2px solid #c8a040;margin:4px}
#modal .lpCard.w{background:linear-gradient(135deg,#8a4ad8,#e84a8a);color:#fff}
#modal .lpPot{position:relative;height:26px;border-radius:13px;background:rgba(127,127,127,.25);overflow:hidden;margin:14px 0}
#modal .lpPot .z{position:absolute;top:0;bottom:0;background:rgba(80,220,120,.55)}#modal .lpPot .n{position:absolute;top:-2px;bottom:-2px;width:4px;background:#fff;box-shadow:0 0 6px #fff}
#lpGo{position:relative}#lpGo .lpDot,.lpDot{position:absolute;top:4px;right:6px;width:9px;height:9px;border-radius:50%;background:#ff5a6a}`;document.head.appendChild(css);

let TAB='day';
function hdr(d){return`<button class="xbtn" onclick="closeM()">✕</button><h3>🏯 หอชะตา</h3><div class="lpSh"><span>💠 เศษชะตา <b>${d.sh.toLocaleString('en-US')}</b>${d.key?` · 🗝️ ${d.key}`:''}</span><small>โบนัสพาสปอร์ต ×${shMul(d).toFixed(2)}</small></div>
<div class="lpTabs">${[['day','🗓️ วันนี้'],['pp','🛂 พาสปอร์ต'],['man','🏯 ห้องในหอ'],['mg','🎲 มินิเกม'],['sec','🔮 ความลับ']].map(([k,t])=>`<button class="${TAB===k?'on':''}" onclick="lpOpen('${k}')">${t}</button>`).join('')}</div>`}
function vDay(d){const day=d.d.day,ts=d.d.t,wk=d.wk.w===WKID()?(d.wk.n||[]).length:0;
 const row=t=>{const k=TK[t.id];if(!k)return'';const w=WL[k[1]]||['🌐','โลกไหนก็ได้'];return`<div class="lpT ${t.ok?'ok':''}"><span class="i">${t.ok?'✅':w[0]}</span><span class="x">${E(k[2])}<small>${t.c?'⏳ ค้างจากวันก่อน · ':''}${E(w[1])} · เศษชะตา 12 · พาสปอร์ต +4</small></span></div>`};
 const h=d.d.h,hk=h&&HK[h.id];const all=dayDone(d),got=d.cl[day];
 return`<p class="tag2">ทำได้ระหว่างเล่นโลกไหนก็ได้ ระบบเช็คให้เองทุกปีในเกม · งานที่ไม่เสร็จ ค้างไว้ทำต่อได้อีก 2 วัน</p>${ts.map(row).join('')}
 ${hk?`<div class="lpT hid ${h.ok?'ok':''}"><span class="i">${h.ok?'✅':'❔'}</span><span class="x">งานลับ: <b>${E(hk[1])}</b><small>${h.ok?'ไขปริศนาสำเร็จแล้ว':'ไม่มีใครบอกว่าต้องทำอะไร… เศษชะตา 40 · อาจได้กุญแจหยก'}</small></span></div>`:''}
 <div class="lpT"><span class="i">🎁</span><span class="x">หีบประจำวัน<small>ทำงานของวันนี้ครบ 3 ข้อ</small></span><button class="lpBtn" ${all&&!got?'':'disabled'} onclick="lpClaim('day')">${got?'รับแล้ว':'รับ'}</button></div>
 <div class="lpT"><span class="i">📦</span><span class="x">หีบใหญ่ประจำสัปดาห์ <b>${Math.min(5,wk)}/5</b> วัน<small>ได้ชุดหรือปีกในตู้เสื้อผ้า + เศษชะตา 150</small><div class="lpBar"><i style="width:${Math.min(100,wk*20)}%"></i></div></span><button class="lpBtn" ${wk>=5&&d.cl.wk!==WKID()?'':'disabled'} onclick="lpClaim('wk')">${d.cl.wk===WKID()?'รับแล้ว':'รับ'}</button></div>
 ${S&&S.alive?`<p class="tag2">ชีวิตนี้อยู่ที่: ${E((WL[wkey()]||['',''])[0]+' '+(WL[wkey()]||['','-'])[1])}</p>`:'<p class="tag2">เริ่มชีวิตใหม่เพื่อทำงานวันนี้ · ลองโลกที่พาสปอร์ตยังต่ำ ได้เศษชะตาเท่าเดิมแต่ปลดของได้ไวกว่า</p>'}`}
function vPP(d){return`<p class="tag2">จบชีวิตในโลกไหนได้ XP โลกนั้น (อยู่นาน ทะลวงสูง ได้มาก) · ทุกเลเวลรวมทั้งหมดเพิ่มเศษชะตาที่ได้ 2% · Lv.3 ปลดห้องในหอ · Lv.5/Lv.10 ได้ชุดของโลกนั้น</p><div class="lpPP">${WORLDS.map(w=>{const xp=d.pp[w]|0,l=lvOf(xp),nx=XPL[l]||null,pv=XPL[l-1]||0;return`<div><b>${WL[w][0]} ${E(WL[w][1])}</b><br><small>${l?'Lv.'+l:'ยังไม่เคยปั๊ม'}${nx?` · ${xp}/${nx} XP`:' · สูงสุด'}</small><div class="lpBar"><i style="width:${nx?Math.round((xp-pv)/(nx-pv)*100):100}%"></i></div></div>`}).join('')}
 ${d.sec.w0?`<div style="grid-column:1/-1;padding:8px 10px;border-radius:12px;border:1px dashed #a080ff">🔮 <b>โลกที่ 0</b> · ตราประทับของผู้ที่เดินผ่านทุกภพ</div>`:''}</div>`}
function vMan(d){const p=pending(d);return`<p class="tag2">ห้องผลิตเศษชะตาตลอดเวลา แม้ปิดเกม (เก็บได้สูงสุด 12 ชม.) · ตอนนี้ผลิต ${rate(d)}/ชม.</p>
 <div class="lpT"><span class="i">💠</span><span class="x">รอเก็บ <b>${p}</b><small>แวะมาเก็บก่อนเต็ม 12 ชม.</small></span><button class="lpBtn" ${p>0?'':'disabled'} onclick="lpCollect()">เก็บ</button></div>
 ${Object.keys(ROOM).map(k=>{const R=ROOM[k],on=R[3](d),lv=d.man.r[k]|0;if(k==='vault'&&!on)return`<div class="lpT" style="border-style:dashed"><span class="i" onclick="lpLamp()">🧱</span><span class="x">กำแพงเรียบๆ<small>${d.key?`มีรูกุญแจเล็กๆ สามรู · 🗝️ ${d.key}/3`:'ดูเหมือนจะไม่มีอะไร…'}</small></span>${d.key>=3?`<button class="lpBtn" onclick="lpVault()">ไขกุญแจ</button>`:''}</div>`;
  return`<div class="lpT ${on?'':'ok'}"><span class="i" ${k==='yard'?'onclick="lpLamp()"':''}>${R[0]}</span><span class="x">${R[1]} ${lv?'Lv.'+lv:''}<small>${on?(lv?`ผลิต ${R[2]*lv}/ชม.`:'ยังไม่ได้สร้าง'):'🔒 '+R[4]}</small></span>${on?`<button class="lpBtn ${lv>=5?'g':''}" ${lv>=5||d.sh<upCost(lv+1)?'disabled':''} onclick="lpUp('${k}')">${lv>=5?'สูงสุด':(lv?'อัปเกรด':'สร้าง')} 💠${lv>=5?'':upCost(lv+1)}</button>`:''}</div>`}).join('')}`}
function mgLeft(d){const day=TOD();if(d.mg.day!==day){d.mg={day,n:0}}return Math.max(0,3+(d.sec.room?1:0)-(d.mg.n|0))}
function vMG(d){const f=mgLeft(d);return`<p class="tag2">เล่นฟรีวันละ ${3+(d.sec.room?1:0)} ครั้ง (เหลือ ${f}) · เกินจากนั้นครั้งละ 💠10 · ทุกเกมมีเรื่องที่คาดไม่ถึงซ่อนอยู่</p>
 ${[['doors','🚪','ประตูกลืนชะตา','เลือกประตูทีละชั้น สะสมรางวัล จะพอแค่ไหนก็ได้ แต่บางประตูมีของกินคน…'],['cards','🃏','ไพ่เซียนพลิกกฎ','ทายไพ่ใบต่อไปสูงหรือต่ำ แต่ไพ่วิเศษอาจพลิกกฎกลางเกม'],['pot','⚗️','หม้อหลอมโอสถ','กดหยุดเข็มในช่องเขียว 3 ครั้ง เข็มบ้าเปลี่ยนความเร็วเอง หม้ออาจระเบิด']].map(([k,i,n,s])=>`<div class="lpT"><span class="i">${i}</span><span class="x">${n}<small>${s}</small></span><button class="lpBtn" onclick="lpPlay('${k}')">${f?'เล่นฟรี':'💠10'}</button></div>`).join('')}`}
const SEC=[['hid','งานลับ','“บางงานไม่มีใครบอก”',d=>(d.sec.hid|0)>0],['gold','ประตูทองคำ','“ประตูที่ไม่ควรอยู่ตรงนั้น”',d=>!!d.sec.gold],['room','ห้องที่ไม่มีประตู','“สามดอก สามรู”',d=>!!d.sec.room],['lamp','โคมที่กระซิบ','“แตะของที่ส่องสว่าง… หลายครั้ง”',d=>!!d.sec.lamp],
 ['night','ยามสาม','“หอชะตาไม่เคยปิด แม้ตอนเที่ยงคืน”',d=>!!d.sec.night],['w0','โลกที่ 0','“ประทับครบแปดภพ”',d=>!!d.sec.w0],['king','ไพ่ราชันย์','“ทายถูกเจ็ดครั้งไม่พลาด”',d=>!!d.sec.king],['alch','ยาเม็ดสีรุ้ง','“เข็มหยุดตรงกลางพอดีทั้งสามครั้ง”',d=>!!d.sec.alch]];
function vSec(d){const n=SEC.filter(s=>s[3](d)).length;return`<p class="tag2">ความลับของหอ ${n}/${SEC.length} · คำใบ้มีแค่ครึ่งเดียว ที่เหลือต้องลองเอง</p>${SEC.map(s=>{const ok=s[3](d);return`<div class="lpT ${ok?'':'hid'}"><span class="i">${ok?'🔮':'❔'}</span><span class="x">${ok?E(s[1]):'???'}<small>${E(s[2])}</small></span></div>`}).join('')}`}
window.lpOpen=function(t){if(t)TAB=t;const d=ld();roll(d);
 const h=new Date(Date.now()+7*3600e3).getUTCHours();if(h===0&&!d.sec.night){d.sec.night=1;const g=giveSh(d,50);setTimeout(()=>toastQ('🔮 ความลับ: ยามสาม — หอชะตาเปิดรับคุณแม้ตอนเที่ยงคืน · 💠+'+g),400)}
 sv(d);const v={day:vDay,pp:vPP,man:vMan,mg:vMG,sec:vSec}[TAB]||vDay;modal(hdr(d)+v(d),'loop');badge()};
window.lpClaim=function(k){const d=ld();roll(d);const day=d.d.day;let m='';
 if(k==='day'){if(!dayDone(d)||d.cl[day])return;d.cl[day]=1;const g=giveSh(d,30);d.mg.day===TOD()?d.mg.n=Math.max(0,(d.mg.n|0)-1):0;if(d.wk.w!==WKID())d.wk={w:WKID(),n:[]};if(!d.wk.n.includes(day))d.wk.n.push(day);m=`🎁 หีบประจำวัน: 💠+${g} · มินิเกมฟรี +1`}
 else if(k==='wk'){const wk=d.wk.w===WKID()?(d.wk.n||[]).length:0;if(wk<5||d.cl.wk===WKID())return;d.cl.wk=WKID();const g=giveSh(d,150);const o=Math.random()<.5?giveOutfit(''):giveWing();m=`📦 หีบใหญ่: 💠+${g}${o?' · 🎁 '+o:''}`}
 sv(d);sfxQ('good');toastQ(m);lpOpen()};
window.lpCollect=function(){const d=ld();const p=pending(d);if(p<=0)return;d.sh+=p;d.man.t=Date.now();sv(d);sfxQ('coin');toastQ('💠 เก็บเศษชะตา +'+p);lpOpen('man')};
window.lpUp=function(k){const d=ld();const R=ROOM[k];if(!R||!R[3](d))return;const lv=d.man.r[k]|0;if(lv>=5)return;const c=upCost(lv+1);if(d.sh<c)return toastQ('เศษชะตาไม่พอ');
 const p=pending(d);d.sh+=p;d.man.t=Date.now();d.sh-=c;d.man.r[k]=lv+1;sv(d);sfxQ('good');toastQ(`${R[0]} ${R[1]} Lv.${lv+1}`);lpOpen('man')};
let lampN=0,lampT=0;window.lpLamp=function(){const now=Date.now();if(now-lampT>1500)lampN=0;lampT=now;lampN++;if(lampN>=7){lampN=0;const d=ld();if(!d.sec.lamp){d.sec.lamp=1;const g=giveSh(d,60);d.key++;sv(d);toastQ('🏮 โคมกระซิบว่า “กุญแจดอกหนึ่งซ่อนอยู่ใต้ฐานข้า” · 🔮 ความลับ · 💠+'+g+' · 🗝️+1');sfxQ('good');lpOpen()}else toastQ('🏮 โคมไหววูบ… แต่ไม่พูดอะไรอีก')}};
window.lpVault=function(){const d=ld();if(d.key<3||d.sec.room)return;d.key-=3;d.sec.room=1;d.man.r.vault=1;const g=giveSh(d,200);const o=giveWing();sv(d);sfxQ('good');toastQ('🗝️ กำแพงเลื่อนออก… ห้องที่ไม่มีประตูเปิดแล้ว! เศษชะตาทุกแหล่ง +10% · มินิเกมฟรี +1/วัน · 💠+'+g+(o?' · 🎁 '+o:''));lpOpen('man')};

// ---------- มินิเกม ----------
let G=null;
function pay(d){if(mgLeft(d)>0){d.mg.n=(d.mg.n|0)+1;return true}if(d.sh<10){toastQ('เศษชะตาไม่พอ (ต้องใช้ 💠10)');return false}d.sh-=10;return true}
window.lpPlay=function(k){const d=ld();if(!pay(d))return;sv(d);G={k,pot:0,fl:1,st:0};
 if(k==='doors')mgDoors();else if(k==='cards'){G.cur=1+Math.floor(Math.random()*13);G.rev=false;G.streak=0;G.pot=4;mgCards()}else mgPot()};
function mgEnd(win,extra){const d=ld();let m='';if(win>0){const g=giveSh(d,win);m=`💠 ได้เศษชะตา +${g}`}else m='💨 รอบนี้ไม่ได้อะไร';if(extra)m+=' · '+extra;sv(d);sfxQ(win>0?'good':'bad');
 modal(`<button class="xbtn" onclick="lpOpen('mg')">✕</button><h3>🎲 จบเกม</h3><div class="item" style="text-align:center;font-size:17px">${m}</div><div style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button class="lpBtn" onclick="lpPlay('${G.k}')">เล่นอีก</button><button class="lpBtn g" onclick="lpOpen('mg')">กลับหอ</button></div>`,'loop')}
// 🚪 ประตูกลืนชะตา
function mgDoors(msg){const fl=G.fl,hint=Math.floor(Math.random()*3);G.hint=hint;
 modal(`<button class="xbtn" onclick="lpDoorStop()">✕</button><h3>🚪 ประตูกลืนชะตา · ชั้น ${fl}</h3><p class="tag2">${msg||'ประตูไหนดี… บางบานส่องแสงแปลกๆ (อาจเป็นสมบัติ หรืออาจเป็นเหยื่อล่อ)'}</p>
 <div class="item" style="text-align:center">ถุงรางวัล 💠 <b>${G.pot}</b></div><div class="lpDoors">${[0,1,2].map(i=>`<button class="${i===hint?'fl':''}" onclick="lpDoor(${i})">🚪</button>`).join('')}</div>
 <div style="text-align:center"><button class="lpBtn g" ${G.pot?'':'disabled'} onclick="lpDoorStop()">พอแค่นี้ เก็บถุง</button></div>`,'loop')}
window.lpDoor=function(i){const fl=G.fl,r=Math.random(),lit=i===G.hint;
 // ประตูส่องแสงบอกจริง 60% · ยิ่งลึกยิ่งอันตราย
 const danger=Math.min(.5,.12+fl*.06)*(lit?(Math.random()<.6?.35:1.6):1);
 if(Math.random()<.012+fl*.004&&!ld().sec.gold){const d=ld();d.sec.gold=1;d.key++;sv(d);G.pot+=40;G.fl++;toastQ('✨ ประตูทองคำ! ข้างในมีกุญแจหยกวางอยู่ · 🔮 ความลับ · 🗝️+1');return mgDoors('ประตูทองคำปิดลงข้างหลัง… ถุงหนักขึ้นอีก 40')}
 if(r<danger){const kind=Math.random();if(kind<.5){G.pot=0;mgEnd(0,'👹 ประตูกินคน! ถุงรางวัลหายหมด');return}if(kind<.8){G.pot=Math.floor(G.pot/2);G.fl++;return mgDoors('🕸️ กับดัก! ทำถุงรางวัลหล่นไปครึ่งหนึ่ง')}G.fl+=2;return mgDoors('🌀 หลุมวาร์ป! ร่วงลงไปอีก 2 ชั้น (ลึกขึ้น อันตรายขึ้น)')}
 const gain=Math.round((4+fl*3)*(.6+Math.random()*1.2)*(Math.random()<.1?3:1));G.pot+=gain;G.fl++;
 const ev=Math.random();if(ev<.08){G.pot*=2;return mgDoors(`💰 ห้องสมบัติ! +${gain} แล้วถุงยังคูณสองอีก`)}if(ev<.14){return mgDoors(`🧙 พ่อค้าลึกลับบอกว่า “ประตูที่สว่าง… โกหกบ่อยกว่าที่คิด” · +${gain}`)}
 mgDoors(`🪙 เจอของ +${gain}`)};
window.lpDoorStop=function(){if(!G)return lpOpen('mg');mgEnd(G.pot)};
// 🃏 ไพ่เซียนพลิกกฎ
const CN=v=>({1:'A',11:'J',12:'Q',13:'K'}[v]||String(v));
function mgCards(msg){modal(`<button class="xbtn" onclick="lpCardStop()">✕</button><h3>🃏 ไพ่เซียนพลิกกฎ</h3><p class="tag2">${msg||'ทายใบต่อไป สูงกว่า หรือ ต่ำกว่า · ใบเท่ากัน = รอด'}${G.rev?'<br><b style="color:#e84a8a">🔄 กฎกลับด้าน! “สูง” กลายเป็นต่ำ “ต่ำ” กลายเป็นสูง</b>':''}</p>
 <div style="text-align:center"><span class="lpCard">${CN(G.cur)}</span></div><div class="item" style="text-align:center">ถูกติดกัน ${G.streak} · ถุงรางวัล 💠 <b>${G.pot}</b></div>
 <div style="display:flex;gap:8px;justify-content:center"><button class="lpBtn" onclick="lpGuess(1)">⬆️ สูงกว่า</button><button class="lpBtn" onclick="lpGuess(-1)">⬇️ ต่ำกว่า</button></div>
 <div style="text-align:center;margin-top:8px"><button class="lpBtn g" onclick="lpCardStop()">เก็บถุง</button></div>`,'loop')}
window.lpGuess=function(g){if(G.rev)g=-g;
 if(Math.random()<.16){const w=Math.random();let m;if(w<.35){G.rev=!G.rev;m='🃏 ไพ่วิเศษ “กระจกกลับฟ้า” — กฎกลับด้าน!'}else if(w<.6){G.pot*=2;m='🃏 ไพ่วิเศษ “เทพเงินทอง” — ถุงคูณสอง!'}else if(w<.8){G.pot=Math.floor(G.pot*.6);m='🃏 ไพ่วิเศษ “จิ้งจอกขโมย” — ขโมยถุงไป 40%'}else{G.cur=1+Math.floor(Math.random()*13);m='🃏 ไพ่วิเศษ “สลับชะตา” — เปลี่ยนไพ่บนโต๊ะ'}return mgCards(m)}
 const nx=1+Math.floor(Math.random()*13),ok=nx===G.cur||(g>0?nx>G.cur:nx<G.cur);const was=G.cur;G.cur=nx;
 if(!ok){G.pot=0;return mgEnd(0,`ใบต่อไปคือ ${CN(nx)} (จาก ${CN(was)}) ทายพลาด ถุงแตก`)}
 G.streak++;G.pot=Math.round(G.pot*1.5+3);if(G.streak>=7){const d=ld();if(!d.sec.king){d.sec.king=1;sv(d);toastQ('👑 ไพ่ราชันย์! ทายถูกเจ็ดครั้งติด · 🔮 ความลับ');G.pot+=60}}
 mgCards(`ใบต่อไปคือ ${CN(nx)} — ถูก!`)};
window.lpCardStop=function(){if(!G)return lpOpen('mg');mgEnd(G.pot)};
// ⚗️ หม้อหลอมโอสถ (เข็มบ้า)
let raf=0;
function mgPot(){G.hits=[];G.pos=0;G.dir=1;G.sp=.6+Math.random()*.6;G.z=[.35+Math.random()*.25,.14];G.heat=0;
 modal(`<button class="xbtn" onclick="lpPotStop()">✕</button><h3>⚗️ หม้อหลอมโอสถ</h3><p class="tag2">กด “คน!” ให้เข็มหยุดในช่องเขียว 3 ครั้ง · ตรงกลางเป๊ะได้โบนัส · พลาดบ่อยหม้อร้อนจนอาจระเบิด</p>
 <div class="lpPot" id="lpPotB"><div class="z" id="lpZ"></div><div class="n" id="lpN"></div></div><div class="item" style="text-align:center" id="lpPotS">คนแล้ว 0/3 · ความร้อน 🔥0</div>
 <div style="text-align:center"><button class="lpBtn" style="font-size:18px;padding:10px 26px" onclick="lpStir()">🥄 คน!</button></div>`,'loop');
 const z=document.getElementById('lpZ');if(z){z.style.left=(G.z[0]*100)+'%';z.style.width=(G.z[1]*100)+'%'}
 let t0=performance.now();cancelAnimationFrame(raf);const step=t=>{const dt=Math.min(.05,(t-t0)/1000);t0=t;if(!document.getElementById('lpN'))return;
  if(Math.random()<.012)G.sp=.4+Math.random()*1.4; // เข็มบ้าเปลี่ยนความเร็ว
  if(Math.random()<.004)G.dir*=-1;
  G.pos+=G.dir*G.sp*dt;if(G.pos>1){G.pos=1;G.dir=-1}if(G.pos<0){G.pos=0;G.dir=1}
  document.getElementById('lpN').style.left='calc('+(G.pos*100)+'% - 2px)';raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)}
window.lpStir=function(){if(!G||G.k!=='pot')return;const[a,w]=G.z,c=a+w/2,inz=G.pos>=a&&G.pos<=a+w,cen=Math.abs(G.pos-c)<w*.15;
 if(inz){G.hits.push(cen?2:1);G.pot+=cen?14:8}else{G.heat++;G.pot=Math.max(0,G.pot-3)}
 if(G.heat>=3&&Math.random()<.6){cancelAnimationFrame(raf);return mgEnd(0,'💥 หม้อระเบิด! หน้าดำทั้งหน้า')}
 G.z=[.08+Math.random()*.7,Math.max(.08,.16-G.hits.length*.025)];const z=document.getElementById('lpZ');if(z){z.style.left=(G.z[0]*100)+'%';z.style.width=(G.z[1]*100)+'%'}
 G.sp=Math.min(2.2,G.sp*1.15+.1);const s=document.getElementById('lpPotS');if(s)s.textContent=`คนแล้ว ${G.hits.length}/3 · ความร้อน 🔥${G.heat} · 💠${G.pot}`;
 if(G.hits.length>=3){cancelAnimationFrame(raf);let ex='';if(G.hits.every(h=>h===2)){G.pot*=3;const d=ld();if(!d.sec.alch){d.sec.alch=1;sv(d);ex='🌈 ยาเม็ดสีรุ้ง! ตรงกลางทั้งสามครั้ง · 🔮 ความลับ'}else ex='🌈 ยาเม็ดสีรุ้ง ×3'}else if(Math.random()<.12){G.pot*=2;ex='✨ ยาเม็ดกลายพันธุ์ ×2'}return mgEnd(G.pot,ex)}};
window.lpPotStop=function(){cancelAnimationFrame(raf);if(!G)return lpOpen('mg');mgEnd(Math.floor(G.pot/2),'เลิกกลางคัน ได้ครึ่งเดียว')};

// ---------- ทางเข้า ----------
function hasNew(){try{const d=ld();if(d.d.day!==TOD())return true;if(dayDone(d)&&!d.cl[d.d.day])return true;if(pending(d)>=rate(d)*6&&rate(d)>0)return true;if(mgLeft(d)>0&&d.mg.day!==TOD())return true}catch(e){}return false}
function badge(){try{document.querySelectorAll('.lpGoB').forEach(b=>{let x=b.querySelector('.lpDot');const n=hasNew();if(n&&!x){x=document.createElement('i');x.className='lpDot';b.appendChild(x)}else if(!n&&x)x.remove()})}catch(e){}}
function inject(){try{const m=$('modal');if(!m||m.querySelector('.lpGoB'))return;const snd=m.querySelector('button[onclick^="openSound"]');if(!snd)return;const b=document.createElement('button');b.className=snd.className+' lpGoB';b.style.position='relative';b.setAttribute('onclick','lpOpen()');
 b.innerHTML=/\bcb\b/.test(snd.className)?'<i>🏯</i>หอชะตา':'🏯 หอชะตา<small>งานวันนี้ · พาสปอร์ต · มินิเกม</small>';if(/\bcb\b/.test(snd.className)){const p=snd.parentElement;p.insertBefore(b,p.firstElementChild)}else{const d=ld();roll(d);sv(d);const k=d.d.t.filter(x=>x.day===d.d.day&&!x.c&&x.ok).length;b.className='opt lpGoB';b.style.cssText='position:relative;width:100%;margin:6px 0;border-color:rgba(232,192,64,.6);background:linear-gradient(135deg,rgba(232,192,64,.2),rgba(232,192,64,.05))';b.innerHTML=`🏯 หอชะตา<small>งานวันนี้ ${k}/3 · 💠 ${d.sh.toLocaleString('en-US')} · มินิเกม · ความลับ</small>`;const q=m.querySelector('input[placeholder*="ค้นหา"]'),qa=q&&(q.closest('.mSrch,.msrch,div')||q);if(qa&&qa.parentElement===m)qa.insertAdjacentElement('afterend',b);else{const h=m.querySelector('h3');if(h)h.insertAdjacentElement('afterend',b);else snd.parentElement.prepend(b)}}badge()}catch(e){}}
['openMenu','openTitleMenu'].forEach(n=>{const o=window[n];if(typeof o!=='function')return;const w=function(){const r=o.apply(this,arguments);try{inject()}catch(e){}return r};try{eval(n+'=w')}catch(e){}window[n]=w});
try{const g=(typeof DK_GROUPS!=='undefined')&&DK_GROUPS.find(x=>/ตั้งค่า|เมนู|ระบบ/.test(x[0]));if(g&&!g[1].some(x=>x[2]==='lpOpen'))g[1].unshift(['🏯','หอชะตา','lpOpen',()=>'งานวันนี้'])}catch(e){}
// ปุ่มลอยบนหน้าแรก (มือถือ/คอม) — ใต้การ์ดวันนี้ของหน้าแรกใหม่ ถ้าไม่มีก็ต่อท้ายกล่องหน้าแรก
function titleChip(){try{const t=$('title');if(!t||!t.classList.contains('on')||document.getElementById('lpTitle'))return;const anchor=document.getElementById('frToday')||document.querySelector('#title .box');if(!anchor)return;
 const b=document.createElement('button');b.id='lpTitle';b.type='button';b.className='lpGoB';b.onclick=()=>lpOpen('day');
 b.style.cssText='position:relative;display:flex;align-items:center;gap:10px;width:100%;margin:0 0 10px;padding:10px 12px;border-radius:14px;border:1px solid rgba(232,192,64,.5);background:linear-gradient(135deg,rgba(232,192,64,.2),rgba(232,192,64,.05));color:inherit;font:inherit;text-align:left;cursor:pointer';
 const d=ld();roll(d);sv(d);const n=d.d.t.filter(x=>x.day===d.d.day&&!x.c&&x.ok).length;
 b.innerHTML=`<span style="font-size:22px">🏯</span><span style="flex:1"><b>หอชะตา</b><br><small style="opacity:.75">งานวันนี้ ${n}/3 · 💠 ${d.sh.toLocaleString('en-US')} · มินิเกม · ความลับ</small></span><span style="opacity:.6">›</span>`;
 if(anchor.id==='frToday')anchor.insertAdjacentElement('afterend',b);else anchor.insertAdjacentElement('afterbegin',b);badge()}catch(e){}}
setInterval(titleChip,1500);setTimeout(titleChip,300);

// ---------- ฮุกเกม ----------
if(typeof passYear==='function'){const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(S&&S.alive)check(false)}catch(e){console.error('lp',e)}return r}}
if(typeof saveLegacy==='function'){const _sl=saveLegacy;saveLegacy=function(){const r=_sl.apply(this,arguments);try{if(S&&!S._lpEnd){S._lpEnd=1;check(true);const d=ld();const w=wkey()||'murim',msgs=[];
 const xp=3+Math.floor(age()/12)+Math.min(8,ri()*2)+(S.xian?4:0)+(S.xt?6:0);addXP(d,w,xp,msgs);const g=giveSh(d,5+Math.floor(age()/10));sv(d);
 msgs.unshift(`🛂 ปั๊มพาสปอร์ต${WL[w][1]} +${xp} XP · 💠+${g} (ดูที่ ☰ → 🏯 หอชะตา)`);msgs.forEach((m,i)=>setTimeout(()=>toastQ(m),1800+i*1100))}}catch(e){console.error('lpEnd',e)}return r}}
window._lp={ld,check,wkey,TOD};
})()}catch(e){console.error('mod-loop',e)}
wReady('hall');
