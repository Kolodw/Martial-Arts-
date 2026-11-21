// ============================================================
// /w/trav.js — 🚪 เส้นทางผู้ข้ามโลก (เฟส 1) · โหลดต่อจาก rift.js (BLOCK 132 ใน app.js)
// ถึงจุดสูงสุดของโลก → 🚪 ประตูสุดโลก: ข้ามโลกด้วยตัวเดิม / เล่นเป็นลูก / จบตำนาน
// ข้าม 2 แบบ: 🌀 ทั้งร่าง (ร่างถูกปรับเป็นวัย 18–30 ตามกฎโลกใหม่) · 👤 สิงร่าง (อายุ 15–22 ได้ครอบครัวและปมของเจ้าของร่าง)
// พลังถูกแปลงตามกฎโลกปลายทาง (ไม่หาย) · เลือก 🔮 เศษพลังข้ามโลก 1 จาก 3 ทุกครั้ง (สะสมเป็นบิลด์) · ได้ 🩸 บาดแผลมิติ 1 อย่างถาวร
// ใช้เครื่องข้ามโลกของ rift.js (cross) · สถานะอยู่ที่ S.trv · สมุด LS murim_trav
// ============================================================
(()=>{
const RF=window._rift;
if(!RF){console.warn('trav: ไม่มี rift');try{wReady('trav')}catch(e){}return}
const {cross,PAIR,CONV,where,ask,O,kAdd,pk,RN,cl,clearQ}=RF;
const E=s=>{try{return esc(s)}catch(e){return String(s)}};
const free=()=>!(choice._cur||(typeof modalOpen!=='undefined'&&modalOpen));
const WN={murim:['⚔️','ยุทธภพ'],xian:['☁️','โลกเซียน'],god:['🌟','โลกเทพ'],soul:['⭕','ทวีปจิตวิญญาณยุทธ์'],sky:['🌠','ทะลุฟ้าดารา'],m_normal:['🏙️','ยุคปัจจุบัน'],m_hunter:['🌀','โลกฮันเตอร์'],m_zombie:['🧟','โลกซอมบี้'],m_under:['🌃','โลกใต้ดิน'],m_ghost:['👻','โลกผีไทย'],m_loop:['🔁','โลกวนลูป'],m_tower:['🏰','โลกหอคอย'],m_game:['🎮','โลกระบบเกม'],m_gatewon:['💀','โลกที่เกตชนะ'],m_doom:['☄️','โลกวันสิ้นโลก'],m_hunterhi:['⚡','โลกฮันเตอร์ F–SSS']};
const wn=k=>(WN[k]||['🌍','อีกโลก']).join(' ');
const TV=()=>{S.trv=S.trv||{n:0,path:[],rel:[],scar:[],seen:{}};return S.trv};
const book=f=>{try{const b=LS.get('murim_trav',{})||{};f(b);LS.set('murim_trav',b)}catch(e){}};

// ---------- จุดสูงสุดของแต่ละโลก ----------
const PEAKT={murim:'ไต่ถึงขั้นสูงสุดของยุทธภพ',xian:'ไต่ถึงขั้นสูงสุดของโลกเซียน',god:'ก้าวสู่ขั้นปลายของโลกเทพ',soul:'วิญญาณยุทธ์ถึงระดับ 100',sky:'ไต่ถึงขั้นที่ 36 สู่ดวงดาว',m:'ระบบถึงขั้นเทพ หรือใช้ชีวิตเป็นตำนานในโลกนี้ครบ 35 ปี'};
function peak(){try{if(!S||!S.alive)return false;if(window._trvForce)return true;const w=where();
 if(w==='beast'||S.rg||S.beastMode)return false;
 if(w==='sky'){const K=S.mw&&S.mw.sky;return !!(K&&(K.rk|0)>=35)}
 if(/^m_/.test(w)){const M=S.mw;return !!(M&&((M.NS&&M.NS.lv>=10)||(M.y|0)>=35))}
 if(w==='soul')return !!(S.sv&&(S.sv.lv|0)>=100);
 const ri=realmIdx();if(w==='god')return ri>=7;return ri>=REALMS.length-1}catch(e){return false}}
const ptxt=w=>PEAKT[/^m_/.test(w)?'m':w]||'ถึงจุดสูงสุดของโลกนี้';

// ---------- 🔮 เศษพลังข้ามโลก ----------
// k: [ไอคอน, ชื่อ, คำอธิบาย, โลกต้นทางที่ออก, ผลทันที, ผลรายปี]
const addLife=d=>{try{if(S.mw){S.mw.end=(S.mw.end||80)+d;return}const b=typeof lifeMax==='function'?lifeMax():0;S.lifespan=(S.lifespan||0)+d;if(typeof lifeMax==='function'&&lifeMax()<=b)S.rvL=(S.rvL||0)+d}catch(e){}};
const jy=v=>{try{joy(v)}catch(e){}};
const REL={
 iron:['🛡️','กายาเหล็กพันศึก','พลังชีวิตสูงสุด +25% · ทุกปีฟื้นพลังชีวิต 10%',['murim','god'],()=>{S.maxHp=Math.round((S.maxHp||100)*1.25);S.hp=S.maxHp},()=>{S.hp=Math.min(S.maxHp,(S.hp||0)+Math.round(S.maxHp*.1))}],
 ageless:['⏳','ร่างที่เวลาลืม','อายุขัย +40 ปี ในทุกโลกที่ไป',['xian','god'],()=>addLife(40),null],
 qi:['🌀','แก่นลมปราณข้ามภพ','ทุกปีพลังเพิ่ม 2% ไม่ว่าอยู่โลกไหน',['murim','xian'],null,()=>{S.power=Math.round((S.power||0)*1.02)+1}],
 eye:['👁️','ตาญาณดวงดาว','สติปัญญา +20 · ทุกปี +1',['sky'],()=>{S.int=(S.int||0)+20},()=>{S.int=(S.int||0)+1}],
 star:['🌌','แก่นดาวในร่าง','พลังเพิ่ม 15% ทันที · ทุกปีเพิ่มอีก 1.5%',['sky','god'],()=>{S.power=Math.round((S.power||0)*1.15)},()=>{S.power=Math.round((S.power||0)*1.015)+1}],
 ring:['⭕','วงแหวนวิญญาณเงา','พลังเพิ่ม 20% ทันที · ทุกปีเพิ่มอีก 1%',['soul'],()=>{S.power=Math.round((S.power||0)*1.2)},()=>{S.power=Math.round((S.power||0)*1.01)+1}],
 luck:['🍀','โชคของผู้ถือระบบ','ทุกปีได้เงิน 5% ของที่มี · กรรมดี +1',['m_normal','m_game'],null,()=>{S.money=Math.round((S.money||0)*1.05)+100;S.karma=(S.karma||0)+1}],
 know:['🧠','ความรู้จากอนาคต','สติปัญญา +15 · เงินเริ่มต้น ×10 ในโลกใหม่',['m_normal','sky'],()=>{S.int=(S.int||0)+15;S.money=(S.money||0)*10},null],
 hunt:['🔥','สัญชาตญาณนักล่า','พลังเพิ่ม 25% ทันที · ฟื้นตัวไว (พลังชีวิตฟื้น 5% ทุกปี)',['m_hunter','m_zombie','m_hunterhi'],()=>{S.power=Math.round((S.power||0)*1.25)},()=>{S.hp=Math.min(S.maxHp,(S.hp||0)+Math.round(S.maxHp*.05))}],
 charm:['✨','รัศมีคนจากต่างโลก','เสน่ห์ +20 · ชื่อเสียงเริ่มต้น +50',[],()=>{S.cha=(S.cha||0)+20;S.fame=(S.fame||0)+50},null],
 calm:['🕯️','ใจที่เคยตายมาแล้ว','ความสุข +15 · ทุกปีความสุข +1 · กรรมดี +5',[],()=>{jy(15);S.karma=(S.karma||0)+5},()=>jy(1)],
 coin:['💰','ทองที่ข้ามมิติได้','พกทรัพย์ข้ามโลกมาได้ส่วนหนึ่ง (เงินเริ่มต้น +ก้อนใหญ่)',[],()=>{S.money=(S.money||0)+Math.max(5000,Math.round((TV()._mon||0)*.05))},null]};
function relPick(from){const own=Object.keys(REL).filter(k=>REL[k][3].includes(from)),gen=Object.keys(REL).filter(k=>!REL[k][3].length||!REL[k][3].includes(from));const have=TV().rel||[];
 const A=own.filter(k=>!have.includes(k)).sort(()=>Math.random()-.5),B=gen.filter(k=>!have.includes(k)&&!A.includes(k)).sort(()=>Math.random()-.5);return A.slice(0,2).concat(B).slice(0,3)}

// ---------- 🩸 บาดแผลมิติ ----------
const SCAR={
 dream:['🌫️','ฝันถึงโลกก่อนทุกคืน','ความสุข −1 ทุกปี',null,()=>jy(-1)],
 frail:['💔','ร่างไม่เสถียร','พลังชีวิตสูงสุด −10%',()=>{S.maxHp=Math.max(30,Math.round((S.maxHp||100)*.9));S.hp=Math.min(S.hp,S.maxHp)},null],
 fast:['⏩','เวลาในตัวเดินเร็วกว่าคนอื่น','อายุขัย −8 ปี',()=>addLife(-8),null],
 tongue:['🗣️','สำเนียงที่ไม่มีใครคุ้น','เสน่ห์ −8',()=>{S.cha=Math.max(0,(S.cha||0)-8)},null],
 eyes:['👀','ถูกบางสิ่งจับตามอง','กรรม −5 · ทุกปีเสียเงิน 2%',()=>{S.karma=(S.karma||0)-5},()=>{S.money=Math.round((S.money||0)*.98)}],
 echo:['🔊','ได้ยินเสียงคนจากโลกเก่า','สติปัญญา −5 · บางปีเห็นภาพหลอน',()=>{S.int=Math.max(0,(S.int||0)-5)},null],
 cold:['🧊','มือเย็นเฉียบตลอดเวลา','พลังลด 5%',()=>{S.power=Math.round((S.power||0)*.95)},null]};
function scarRoll(){const have=TV().scar||[];const L=Object.keys(SCAR).filter(k=>!have.includes(k));return L.length?pk(L):pk(Object.keys(SCAR))}

// ---------- ปลายทาง ----------
const DEST=['murim','xian','soul','m_normal','m_hunter','m_zombie'];
const DNOTE={murim:'พลังถูกแปลงเป็นลมปราณ เริ่มที่ราวขั้นกลางของยุทธภพ',xian:'พลังถูกแปลงเป็นปราณเซียน เริ่มที่ราวขั้นกลางของโลกเซียน',soul:'ร่างนี้ปลุกวิญญาณยุทธ์ได้ทันที เริ่มที่ระดับวิญญาณ 30',m_normal:'ไม่มีลมปราณ แต่ร่างกายแข็งแรงผิดมนุษย์ แก่ช้า ความรู้ติดตัวมาเต็ม',m_hunter:'ปลุกพลังเป็นฮันเตอร์ได้ทันที',m_zombie:'ร่างทนกว่าคนทั่วไป เชื้อซอมบี้ไม่ค่อยติด'};
function convert(T,how){const f=how==='soul'?.3:.45;
 if(T==='murim'||T==='xian'){try{const i=Math.max(1,Math.min(REALMS.length-2,Math.floor(REALMS.length*f)));S.power=Math.max(S.power||0,Math.round(REALMS[i].p*1.05));S.rcap=Math.max(S.rcap==null?0:S.rcap,i)}catch(e){}}
 else if(T==='soul'){try{S.sv=S.sv||{aw:2,sp:[],lv:0,rings:[],seen:{},hy:-9};S.sv.lv=Math.max(S.sv.lv|0,how==='soul'?15:30);const i=Math.floor(REALMS.length*f);S.power=Math.max(S.power||0,Math.round(REALMS[i].p*1.05));S.rcap=Math.max(S.rcap==null?0:S.rcap,i)}catch(e){}}
 else{S.maxHp=Math.round((S.maxHp||100)*1.2);S.hp=S.maxHp;S.int=(S.int||0)+8;if(S.mw)S.mw.end=Math.max(S.mw.end||80,S.age+60)}}

// ---------- 🚪 ประตูสุดโลก ----------
function gate(manual){if(!S||!S.alive)return;const w=where(),T=TV();T.gw=T.gw||{};T.gw[w]=S.age;
 ask('🚪 ประตูสุดโลก',`${ptxt(w)} — ฟ้าของ${wn(w)}ไม่มีอะไรเหลือให้คุณไต่อีกแล้ว คืนนั้นมีประตูบานหนึ่งเปิดอยู่กลางอากาศ อีกฝั่งเป็นโลกที่คุณไม่เคยไป<br><span class="tag2">🚪 ข้ามโลก = เล่นตัวเดิมต่อ (ความทรงจำ ชื่อ ฉายา บิลด์ข้ามโลก) · เงิน ฐานะ สำนัก ครอบครัวไม่ข้ามไปด้วย · พลังถูกแปลงตามกฎโลกใหม่ · ได้ 🔮 เศษพลัง 1 อย่าง และ 🩸 บาดแผลมิติ 1 อย่าง${T.n?` · ข้ามมาแล้ว ${T.n} ครั้ง`:''}</span>`,[
  O('🚪 เปิดประตู เลือกโลกถัดไป','เล่นตัวเดิมต่อในโลกใหม่',()=>setTimeout(pickDest,300)),
  O('⏳ ยังไม่ไป','ประตูรออยู่ · เปิดได้จาก ☰ เมนู → 🚪 ประตูสุดโลก',()=>{try{log('🚪 คุณหันหลังให้ประตู มันไม่ปิด แค่รอ <span class="tag2">(เปิดได้จาก ☰ เมนู)</span>','')}catch(e){}})])}
window.trvGate=()=>{if(!peak())return toast('ประตูสุดโลกยังไม่เปิด — '+ptxt(where()));try{closeM()}catch(e){}gate(1)};
function pickDest(){const w=where();const L=DEST.filter(d=>d!==w&&!(w==='god'&&d==='xian'));
 ask('🌍 เลือกโลกถัดไป',`ประตูแสดงภาพหลายโลกซ้อนกัน แตะภาพไหน ประตูจะพาไปที่นั่น`,L.map(d=>O(wn(d),DNOTE[d]||'',()=>setTimeout(()=>pickHow(d),300))).concat([O('↩️ ยังไม่ไป','',()=>{})]))}
function pickHow(T){ask(`🚪 ข้ามไป${wn(T)}`,`จะข้ามไปแบบไหน`,[
  O('🌀 ข้ามทั้งร่าง','ร่างเดิม ชื่อเดิม · ร่างถูกปรับเป็นวัย 18–30 ตามกฎโลกใหม่ · ไม่มีใครรู้จักคุณ · พลังแปลงได้มากกว่า',()=>setTimeout(()=>pickRel(T,'body'),300)),
  O('👤 สิงร่าง','ตื่นในร่างคนอายุ 15–22 · ได้ครอบครัวของเจ้าของร่าง (และปมของเขา) · พลังแปลงได้น้อยกว่า',()=>setTimeout(()=>pickRel(T,'soul'),300)),
  O('↩️ เปลี่ยนใจ','',()=>setTimeout(pickDest,300))])}
function pickRel(T,how){const w=where(),L=relPick(w);
 ask('🔮 เศษพลังข้ามโลก',`ก่อนก้าวผ่านประตู มีแสงสามดวงลอยออกจากร่างคุณ ประตูยอมให้พาไปได้ดวงเดียว<br><span class="tag2">เศษพลังติดตัวไปทุกโลกที่ข้ามต่อจากนี้ สะสมเป็นบิลด์ข้ามโลก</span>`,
  L.map(k=>O(`${REL[k][0]} ${REL[k][1]}`,REL[k][2],()=>go(T,how,k))))}
function go(T,how,rk){const from=where(),T0=TV();T0._mon=S.money||0;const pw0=(()=>{try{return Math.round(total())}catch(e){return S.power|0}})();const age0=S.age,name0=S.name;
 const key='tv_'+from+'_'+T;PAIR[key]={f:from,t:T,n:`${(WN[from]||['',''])[1]} → ${(WN[T]||['',''])[1]}`,tr:1,init:(R)=>after(R,T,how,rk,from,pw0,age0,name0)};
 CONV[key]={pow:1,note:DNOTE[T]||'',int:0};
 const keep=S.trv;try{delete S.rift}catch(e){}fx(from,T,()=>{try{cross(key,how,{t:T})}catch(e){console.error('trav cross',e)}if(!S.trv)S.trv=keep})}
function after(R,T,how,rk,from,pw0,age0,name0){try{R.done=1;R.trv=1;const V=TV();
 if(how==='body')S.age=cl(age0|0,18,30);
 convert(T,how);
 const r=REL[rk];if(r){if(r[4])try{r[4]()}catch(e){}V.rel.push(rk)}
 const sk=scarRoll(),s=SCAR[sk];if(s[3])try{s[3]()}catch(e){}V.scar.push(sk);
 V.n++;V.path.push(from);V.last=T;V.y=S.age;
 S.custom=false;S.trvL=1;
 book(b=>{b.n=Math.max(b.n||0,V.n);b.w=b.w||{};b.w[T]=1;b.w[from]=1;b.r=b.r||{};b.r[rk]=1});
 kAdd(`🚪 ข้ามโลกครั้งที่ ${V.n}: ${(WN[from]||['',''])[1]} → ${(WN[T]||['',''])[1]}${how==='soul'?' (สิงร่าง)':''}`);
 log(`🚪 <b>ผู้ข้ามโลก ครั้งที่ ${V.n}</b> — ${how==='soul'?`คุณตื่นในร่างของ <b>${E(S.name)}</b> อายุ ${S.age} ปี ความทรงจำของ ${E(name0)} ยังอยู่ครบ`:`ร่างเดิม ชื่อเดิม แต่ประตูปรับร่างให้เป็นวัย ${S.age} ปีตามกฎของโลกนี้`}
  <br>🔮 เศษพลัง: <b>${r?r[0]+' '+r[1]:'-'}</b> <span class="tag2">${r?r[2]:''}</span>
  <br>🩸 บาดแผลมิติ: <b>${s[0]} ${s[1]}</b> <span class="tag2">${s[2]}</span>
  <br><span class="tag2">⚖️ ${E(DNOTE[T]||'')} · พลังเดิม ${fmt(pw0)} · ชีวิตผู้ข้ามโลกไม่ขึ้นทำเนียบของโลกเดียว (มีทำเนียบผู้ข้ามโลกแยกในอนาคต)</span>`,'myth',true);
 if(T==='m_hunter'){try{const M=S.mw;if(M&&typeof hwInit==='function'&&!(M.hw>0))hwInit(M,true)}catch(e){console.error('trav hunter',e)}}
 try{render()}catch(e){}try{saveGame()}catch(e){}}catch(e){console.error('trav after',e)}}

// ---------- ฉากประตู ----------
function fx(from,T,done){let o=document.getElementById('trvFx');if(o)o.remove();o=document.createElement('div');o.id='trvFx';
 o.innerHTML=`<div class="dr"><div class="lf"></div><div class="rt"></div><div class="lt"></div></div><div class="tx"><span>${(WN[from]||['🌍'])[0]}</span><b>→</b><span>${(WN[T]||['🌍'])[0]}</span></div><div class="nm">${E((WN[T]||['','อีกโลก'])[1])}</div><small>แตะเพื่อข้าม</small>`;
 document.body.appendChild(o);try{sfx('good')}catch(e){}let f=0;const end=()=>{if(f)return;f=1;o.classList.add('out');setTimeout(()=>{o.remove();done&&done()},400)};o.onclick=end;setTimeout(end,3000)}

// ---------- รายปี ----------
let lastY='';
function yearly(){const k=S.age+':'+(S._lid||S.name);if(lastY===k)return;lastY=k;const V=S.trv;
 if(V){(V.rel||[]).forEach(x=>{const f=REL[x]&&REL[x][5];if(f)try{f()}catch(e){}});(V.scar||[]).forEach(x=>{const f=SCAR[x]&&SCAR[x][4];if(f)try{f()}catch(e){}});
  if((V.scar||[]).includes('echo')&&Math.random()<.15)try{log('🔊 คุณได้ยินเสียงคนจากโลกเก่าเรียกชื่อเดิมของคุณ หันไปก็ไม่มีใคร','')}catch(e){}}
 if(peak()){const T=TV(),w=where();T.gw=T.gw||{};if(T.gw[w]==null)setTimeout(()=>{if(S&&S.alive&&peak()&&TV().gw[w]==null)gate(0)},1500)}}
{const _py=passYear;passYear=function(){const a0=S&&S.age;const r=_py.apply(this,arguments);try{if(S&&S.alive&&S.age!==a0)yearly()}catch(e){console.error('trav',e)}return r}}
if(typeof mwYear==='function'){const _y=mwYear;mwYear=function(){const a0=S&&S.age;const r=_y.apply(this,arguments);try{if(S&&S.alive&&S.age!==a0)yearly()}catch(e){console.error('trav mw',e)}return r}}
// mwYear อาจโหลดทีหลัง (ไฟล์ยุคปัจจุบันโหลดเมื่อเข้าโลก)
try{wNeed('mw',()=>{if(typeof mwYear==='function'&&!mwYear._trv){const _y=mwYear;mwYear=function(){const a0=S&&S.age;const r=_y.apply(this,arguments);try{if(S&&S.alive&&S.age!==a0)yearly()}catch(e){}return r};mwYear._trv=1}})}catch(e){}

// ---------- เมนู · แผงผู้ข้ามโลก · จอจบ ----------
window.trvInfo=function(){const V=S&&S.trv;if(!V||!V.n){return toast('ยังไม่เคยข้ามโลก — '+ptxt(where()))}
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🚪 ผู้ข้ามโลก</h3><div class="trvP">
 <div class="row"><b>เส้นทาง</b><br>${V.path.concat([V.last]).map(w=>wn(w)).join(' → ')}</div>
 <div class="row"><b>🔮 บิลด์ข้ามโลก (${V.rel.length})</b>${V.rel.map(k=>REL[k]?`<div>${REL[k][0]} <b>${REL[k][1]}</b> <small>${REL[k][2]}</small></div>`:'').join('')}</div>
 <div class="row"><b>🩸 บาดแผลมิติ (${V.scar.length})</b>${V.scar.map(k=>SCAR[k]?`<div>${SCAR[k][0]} <b>${SCAR[k][1]}</b> <small>${SCAR[k][2]}</small></div>`:'').join('')}</div>
 ${peak()?'<button class="pbtn" style="width:100%" onclick="trvGate()">🚪 เปิดประตูสุดโลกอีกครั้ง</button>':`<p class="tag2">ประตูถัดไปจะเปิดเมื่อ${ptxt(where())}</p>`}</div>`,'trv')};
if(typeof openMenu==='function'){const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(S&&S.alive){const g=$('modal').querySelector('.mgrid');const V=S.trv;
 if(g&&!g.querySelector('.trvM')){if(peak())g.insertAdjacentHTML('afterbegin',`<button class="opt trvM" onclick="trvGate()">🚪 ประตูสุดโลก<small>ข้ามไปโลกใหม่ด้วยตัวเดิม${V&&V.n?` · ข้ามมาแล้ว ${V.n} ครั้ง`:''}</small></button>`);
  else if(V&&V.n)g.insertAdjacentHTML('afterbegin',`<button class="opt trvM" onclick="closeM();trvInfo()">🚪 ผู้ข้ามโลก<small>ข้ามมาแล้ว ${V.n} ครั้ง · 🔮 ${V.rel.length} · 🩸 ${V.scar.length}</small></button>`)}}}catch(e){}return r}}
if(typeof endGame==='function'){const _eg=endGame;endGame=function(){let V=null;try{V=S&&S.trv&&S.trv.n?JSON.parse(JSON.stringify(S.trv)):null}catch(e){}const r=_eg.apply(this,arguments);
 if(V)setTimeout(()=>{try{const b=$('end')&&$('end').querySelector('.box.rec');if(!b||b.querySelector('.trvEnd'))return;const d=document.createElement('div');d.className='trvEnd';
  d.innerHTML=`<b>🚪 ผู้ข้าม ${V.n} โลก</b><div class="tag2">${V.path.concat([V.last]).map(w=>(WN[w]||['🌍'])[0]).join(' → ')}</div><div>🔮 ${V.rel.map(k=>REL[k]?REL[k][0]+' '+REL[k][1]:'').join(' · ')}</div><div class="tag2">🩸 ${V.scar.map(k=>SCAR[k]?SCAR[k][0]+' '+SCAR[k][1]:'').join(' · ')}</div>`;
  const fb=b.querySelector('.fateBox')||b.querySelector('.mtNext');if(fb)fb.before(d);else b.appendChild(d)}catch(e){}},120);return r}}
// ฉายาตอนจบ
const css=document.createElement('style');css.textContent=`
#trvFx{position:fixed;inset:0;z-index:99991;background:radial-gradient(circle at 50% 45%,#1a1030f2,#000000f6);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;animation:tvIn .3s ease;cursor:pointer}#trvFx.out{animation:tvOut .4s ease forwards}
@keyframes tvIn{from{opacity:0}}@keyframes tvOut{to{opacity:0}}
#trvFx .dr{position:relative;width:170px;height:260px;border-radius:85px 85px 8px 8px;border:4px solid #c9a24a;box-shadow:0 0 40px #c9a24a88,inset 0 0 30px #000;overflow:hidden;background:#05060c}
#trvFx .lf,#trvFx .rt{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(90deg,#3a2a14,#5a4220);z-index:2;animation:tvDl 1.6s .5s cubic-bezier(.6,0,.2,1) forwards}#trvFx .lf{left:0;transform-origin:left}#trvFx .rt{right:0;transform-origin:right;animation-name:tvDr}
@keyframes tvDl{to{transform:perspective(400px) rotateY(80deg)}}@keyframes tvDr{to{transform:perspective(400px) rotateY(-80deg)}}
#trvFx .lt{position:absolute;inset:0;background:radial-gradient(circle,#fff,#a8d8ff 30%,#6a4cff 60%,transparent 75%);animation:tvLt 2.4s ease-in forwards;opacity:0}@keyframes tvLt{40%{opacity:.6}100%{opacity:1;transform:scale(1.6)}}
#trvFx .tx{margin-top:18px;font-size:34px;display:flex;gap:14px;align-items:center}#trvFx .tx b{color:#c9a24a}#trvFx .nm{font-size:20px;font-weight:800;color:#ffe08a;margin-top:4px;text-shadow:0 0 12px #ffb040}#trvFx small{position:absolute;bottom:22px;opacity:.5}
.trvP .row{background:#00000010;border:1px solid var(--line);border-radius:12px;padding:8px 10px;margin:6px 0;font-size:13px;line-height:1.6}.trvP small{opacity:.75}
.trvEnd{margin:12px 0;padding:10px 12px;border-radius:14px;border:1.5px solid #c9a24a;background:linear-gradient(135deg,#2a1a3a22,#c9a24a18);line-height:1.6}`;document.head.appendChild(css);
window._trav={peak,gate,pickDest,go,REL,SCAR,DEST,yearly,TV};
})();
try{wReady('trav')}catch(e){}
