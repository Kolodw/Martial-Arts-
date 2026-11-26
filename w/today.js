// ============================================================
// /w/today.js 📅 วันนี้ทำอะไรดี — รวมทุกอย่างรายวันไว้หน้าเดียว (ทุกโลก · โหลดเบื้องหลัง)
//  - ⚡ รับได้เลย: ของล็อกอิน · เช็คอินรายวัน · รางวัลภารกิจ/สมุด/บอสโลก · รางวัลคัมภีร์ · หีบหอชะตา · เศษชะตาในห้อง
//  - 📋 ทำวันนี้: ภารกิจรายวัน · กระดานหอชะตา · จบชีวิต (แต้มคัมภีร์) · บอสโลก · ลานหมื่นเงา (กฎวันนี้) · มินิเกมหอชะตา
//  - ⏳ ใกล้ได้/แนะนำ: หีบใหญ่หอชะตา · โลกที่ยังไม่เคยลอง
//  - ปุ่ม ⚡ รับทั้งหมด · แตะรายการ = พาไปหน้านั้น · ทางเข้า: การ์ดหน้าแรก · บนสุดของเมนู ☰ · ชิปในเกมเมื่อมีของรอรับ ≥2
//  - อ่านสถานะจาก window.aqHub / spHub (app.js) · window._lp.stat (w/loop.js) · api lgget / ar2
// ============================================================
try{(function(){
if(window._td)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const F=n=>{try{return fmt(n)}catch(e){return String(n)}};
const on=()=>{try{return !!onlineOK}catch(e){return false}};
const alive=()=>{try{return !!(S&&S.alive)}catch(e){return false}};
const nLives=()=>{try{return(LS.get('murim_stats',{})||{}).lives|0}catch(e){return 0}};
const tday=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const fn=n=>typeof window[n]==='function';
let LAST=null,busy=false,lgS=null,arS=null,arT=0;

async function collect(){
 const R=[],T=[],W=[];const online=on();
 // ของล็อกอิน (เซิร์ฟเวอร์)
 if(online){try{lgS=await api('lgget',{})}catch(e){}}
 if(lgS&&!lgS.err){if(!lgS.today)R.push({k:'lg',ic:'🎁',n:'ของล็อกอินวันนี้',d:'วันที่ '+((lgS.n<7?lgS.n:lgS.r)+1),go:()=>{closeM();lgOpen()}});else R.push({k:'lg',ic:'🎁',n:'ของล็อกอินวันนี้',d:'รับแล้ว',done:1})}
 // เช็คอินรายวัน (ในชีวิต)
 try{const o=LS.get('murim_dly',{d:'',s:0})||{};if(fn('dailyClaim')){if(o.d===tday())R.push({k:'dly',ic:'🗓️',n:'เช็คอินรายวัน',d:'รับแล้ว',done:1});else if(alive())R.push({k:'dly',ic:'🗓️',n:'เช็คอินรายวัน',d:'ต่อเนื่อง '+((o.s|0)+1)+' วัน',go:()=>{closeM();window.dailyOpen?window.dailyOpen():dailyClaim()}});else T.push({k:'dly',ic:'🗓️',n:'เช็คอินรายวัน',d:'ต้องมีชีวิตที่เล่นอยู่ก่อน แล้วค่อยรับ',p:[0,1],gl:'เกิดเลย',go:()=>{closeM();try{qStart()}catch(e){}}})}}catch(e){}
 // ภารกิจ + บอสโลก
 let aq=null;try{if(fn('aqHub'))aq=await aqHub()}catch(e){}
 if(aq){if(aq.cl)R.push({k:'aq',ic:'📜',n:'รางวัลภารกิจ',d:'ภารกิจ/สมุดภารกิจ/บอสโลก',go:()=>openAQ('d')});
  if(aq.dt)T.push({k:'aqd',ic:'📋',n:'ภารกิจรายวัน',d:'ครบ 3 ได้ตั๋วธรรมดา',p:[Math.min(aq.dn,aq.dt),aq.dt],gl:'ไปทำ',go:()=>openAQ('d')});
  const wb=aq.wb;if(wb&&wb.ph==='on'){const pc=wb.mx?Math.max(0,Math.round(wb.hp/wb.mx*100)):0;T.push({k:'wb',ic:wb.ic||'🐉',n:'บอสโลก'+(wb.n?' · '+E(wb.n):''),d:'เลือดเหลือ '+pc+'%',p:[Math.min(wb.hits,wb.hm),wb.hm],gl:'ไปตี',go:()=>openAQ('wb')})}}
 // คัมภีร์ฤดูกาล
 let sp=null;if(online&&fn('spHub')){try{sp=await spHub()}catch(e){}}
 if(sp){if(sp.can)R.push({k:'sp',ic:'❄️',n:'รางวัลคัมภีร์ฤดูกาล',d:sp.can+' ขั้นรอรับ · ขั้นตอนนี้ '+sp.lv,go:()=>{closeM();openSP()}});
  T.push({k:'spl',ic:'🕯️',n:'จบชีวิต (แต้มคัมภีร์)',d:'คัมภีร์ขั้น '+sp.lv+'/60 · วันละ 3 ชีวิต',p:[Math.min(3,(sp.dd&&sp.dd.life)|0),3],gl:alive()?'เล่นต่อ':'เกิดเลย',go:()=>{closeM();if(!alive())try{qStart()}catch(e){}}})}
 // หอชะตา
 let lp=null;try{if(window._lp&&window._lp.stat)lp=window._lp.stat()}catch(e){}
 if(lp){if(lp.day)R.push({k:'lpd',ic:'🏯',n:'หีบประจำวันหอชะตา',d:'💠+30 · มินิเกมฟรี +1',go:()=>lpOpen('day')});
  if(lp.wkC)R.push({k:'lpw',ic:'📦',n:'หีบใหญ่หอชะตา',d:'ชุด/ปีกในตู้เสื้อผ้า',go:()=>lpOpen('day')});
  if(lp.room>=5)R.push({k:'lpr',ic:'💠',n:'เศษชะตาในห้อง',d:'เก็บได้ +'+F(lp.room),go:()=>lpOpen('man')});
  if(lp.tt)T.push({k:'lpb',ic:'🗓️',n:'กระดานหอชะตา',d:'งานข้ามโลก'+(lp.cn?' · งานค้าง '+lp.cn:''),p:[lp.tn,lp.tt],gl:'ไปทำ',go:()=>lpOpen('day')});
  if(lp.mg>0)W.push({k:'lpm',ic:'🎲',n:'มินิเกมหอชะตา',d:'เล่นฟรีเหลือ '+lp.mg+' ครั้ง',gl:'เล่น',go:()=>lpOpen('mg')});
  if(!lp.wkGot&&!lp.wkC)W.push({k:'lpwk',ic:'📦',n:'หีบใหญ่หอชะตา',d:'ทำกระดานครบ 5 วันในสัปดาห์',p:[lp.wk,5],gl:'ดู',go:()=>lpOpen('day')});
  if(lp.nw&&lp.nw.length){const w=lp.nw[0];W.push({k:'nw',ic:w.ic||'🆕',n:'ยังไม่เคยลอง: '+E(w.n),d:'จบชีวิตในโลกนี้ได้ XP พาสปอร์ต'+(lp.nw.length>1?' · ยังเหลืออีก '+(lp.nw.length-1)+' โลก':''),gl:'ดู',go:()=>lpOpen('pp')})}}
 // ลานหมื่นเงา
 if(online&&fn('openOnline')){try{if(!arS||Date.now()-arT>300e3){arS=await api('ar2');arT=Date.now()}}catch(e){}
  if(arS&&!arS.err){const r=Array.isArray(arS.rule)?arS.rule:null;W.unshift({k:'ar',ic:'⚔️',n:'ลานหมื่นเงา',d:(r?'กฎวันนี้: '+E(r[1])+' — '+E(r[2]):'ดวลเงาผู้เล่นอื่น')+(arS.nw?' · มีคนมาท้า '+arS.nw+' ครั้ง':''),gl:'ไปลาน',go:()=>{closeM();openOnline('arena')}})}}
 return{R,T,W}}

const done=x=>x.done||(x.p&&x.p[0]>=x.p[1]);
function count(L){const all=[...L.R,...L.T];return{d:all.filter(done).length,t:all.length,r:L.R.filter(x=>!x.done).length}}
function itemH(x,i){const dn=done(x),rdy=!dn&&x.go&&L0().R.includes(x);
 const go=dn?'✅ เสร็จ':rdy?'รับ':x.gl||'ไป',pt=x.p&&!dn?` · ${x.p[0]}/${x.p[1]}`:'';
 return`<button type="button" class="tdI ${dn?'dn':rdy?'rd':''}" data-i="${i}"><i>${x.ic}</i><span class="w"><b>${x.n}</b><small>${x.d}${pt}</small>${x.p&&!dn?`<em><u style="width:${Math.round(x.p[0]/x.p[1]*100)}%"></u></em>`:''}</span><span class="g">${go}</span></button>`}
const L0=()=>LAST||{R:[],T:[],W:[]};
function draw(msg){const L=L0(),c=count(L),ALL=[...L.R,...L.T,...L.W];
 const sec=(t,arr,note)=>arr.length?`<div class="tdS"><h4>${t}<small>${note}</small></h4>${arr.slice().sort((a,b)=>done(a)-done(b)).map(x=>itemH(x,ALL.indexOf(x))).join('')}</div>`:'';
 const rN=L.R.filter(x=>!x.done).length,tN=L.T.filter(x=>!done(x)).length;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><div class="tdH"><div class="tdRing" style="--p:${c.t?Math.round(c.d/c.t*100):0}"><i>${c.d}/${c.t}</i></div><div><h3>📅 วันนี้ทำอะไรดี</h3><small>${msg||(c.t&&c.d>=c.t?'ครบทุกอย่างแล้ว พรุ่งนี้มาใหม่นะ 🎉':'เหลืออีก '+(c.t-c.d)+' อย่าง · รีเซ็ตเที่ยงคืน')}</small></div></div>
 <button class="pbtn tdCl" ${rN&&!busy?'':'disabled'} onclick="tdClaimAll()">${busy?'⏳ กำลังรับ…':rN?`⚡ รับทั้งหมด (${rN} อย่าง)`:'รับของครบแล้ว'}</button>
 <div class="tdB">${sec('⚡ รับได้เลย',L.R,rN?rN+' รอรับ':'รับครบแล้ว')}${sec('📋 ทำวันนี้',L.T,tN?'เหลือ '+tN:'ครบแล้ว')}${sec('⏳ ใกล้ได้ / แนะนำ',L.W,'')}</div>
 ${on()?'':'<p class="tag2" style="text-align:center">⚠️ ออฟไลน์อยู่ — ของบางอย่าง (ล็อกอิน คัมภีร์ ลาน) จะขึ้นเมื่อออนไลน์</p>'}`,'today');
 const m=$('modal');m.querySelectorAll('.tdI').forEach(b=>b.onclick=()=>{const x=ALL[+b.dataset.i];if(!x||!x.go)return;if(done(x)&&!L.W.includes(x))return;try{x.go()}catch(e){console.error(e)}})}

window.tdOpen=async function(){if(!LAST)modal('<button class="xbtn" onclick="closeM()">✕</button><h3>📅 วันนี้ทำอะไรดี</h3><p class="tag2" style="text-align:center;padding:24px 0">⏳ กำลังรวบรวม…</p>','today');
 try{LAST=await collect()}catch(e){console.error('tdCollect',e)}if(LAST&&(!modalOpen||$('modal').dataset.k==='today'))draw();chip()};
window.tdClaimAll=async function(){if(busy)return;busy=true;draw();const got=[];const L=L0();const has=k=>L.R.some(x=>x.k===k&&!x.done);
 const keepOpen=async f=>{const o1=window.lpOpen,o2=window.openSP;window.lpOpen=()=>{};window.openSP=async()=>{};try{return await f()}finally{window.lpOpen=o1;window.openSP=o2}};
 try{if(has('lg')){await lgOpen();const b=document.querySelector('#modal .lgBtn');if(b&&!b.disabled){await lgClaim(b);got.push('🎁 ของล็อกอิน')}}}catch(e){console.error(e)}
 try{if(has('dly')&&alive()){const b0=(LS.get('murim_dly',{})||{}).d;dailyClaim();if((LS.get('murim_dly',{})||{}).d!==b0)got.push('🗓️ เช็คอิน')}}catch(e){console.error(e)}
 try{if(has('aq')&&fn('aqClaimAll')){const n=await aqClaimAll();if(n)got.push('📜 ภารกิจ')}}catch(e){console.error(e)}
 try{if(has('sp')){const n=await keepOpen(()=>spHub(true));if(n)got.push('❄️ คัมภีร์ ×'+n)}}catch(e){console.error(e)}
 try{if(has('lpd')||has('lpw')||has('lpr'))await keepOpen(()=>{if(has('lpd')){lpClaim('day');got.push('🏯 หีบประจำวัน')}if(has('lpw')){lpClaim('wk');got.push('📦 หีบใหญ่')}if(has('lpr')){lpCollect();got.push('💠 เศษชะตา')}})}catch(e){console.error(e)}
 busy=false;try{LAST=await collect()}catch(e){}draw(got.length?'✅ รับแล้ว: '+got.join(' · '):'ไม่มีของที่รับได้ตอนนี้');chip()};

// ---------- ทางเข้า ----------
function titleCard(){try{const t=$('title');if(!t||!t.classList.contains('on'))return;let b=$('tdTitle');
 if(!b){const anchor=$('frToday')||document.querySelector('#title .box');if(!anchor)return;b=document.createElement('button');b.id='tdTitle';b.type='button';b.onclick=()=>tdOpen();
  if(anchor.id==='frToday')anchor.insertAdjacentElement('beforebegin',b);else anchor.insertAdjacentElement('afterbegin',b)}
 const c=LAST?count(LAST):null,h=`<i>📅</i><span><b>วันนี้ทำอะไรดี</b><small>${c?(c.r?c.r+' อย่างรอรับ · ':'')+(c.t-c.d>0?'เหลือ '+(c.t-c.d)+' อย่าง':'ครบแล้ววันนี้ 🎉'):'ดูของรายวันทั้งหมดในที่เดียว'}</small></span>${c&&c.r?`<em>${c.r}</em>`:''}`;
 if(b._h!==h){b._h=h;b.innerHTML=h}}catch(e){}}
function chip(){try{if(nLives()<1||!fn('islChipX'))return;const c=LAST?count(LAST):null;const inGame=$('game')&&$('game').classList.contains('on');
 if(inGame&&c&&c.r>=2&&!modalOpen)islChipX('tdc','📅',c.r+' อย่างรอรับ',()=>tdOpen());else if(fn('islChipOff'))islChipOff('tdc')}catch(e){}}
function menuBtn(){try{const m=$('modal');if(!m||m.dataset.k!=='menu'||m.querySelector('.tdMb'))return;const h=m.querySelector('.uxRow')||m.querySelector('h3');if(h)h.insertAdjacentHTML(h.classList.contains('uxRow')?'afterbegin':'afterend',`<button class="pbtn tdMb" onclick="tdOpen()">📅 วันนี้ทำอะไรดี${LAST&&count(LAST).r?` <em class="tdBd">${count(LAST).r}</em>`:''}</button>`)}catch(e){}}
new MutationObserver(()=>menuBtn()).observe(document.getElementById('modal')||document.body,{childList:true});
// รีเฟรชเบื้องหลัง: ทุก 3 นาที (เบาๆ) + หน้าแรก
let rT=0;async function refresh(){if(busy||document.hidden)return;if(Date.now()-rT<170e3)return;rT=Date.now();try{LAST=await collect()}catch(e){}titleCard();chip()}
setInterval(()=>{titleCard();refresh()},4000);setTimeout(refresh,1500);

const st=document.createElement('style');st.textContent=`
#tdTitle{display:flex;align-items:center;gap:10px;width:100%;margin:0 0 10px;padding:10px 12px;border-radius:14px;background:linear-gradient(90deg,#e9b94922,var(--card,#1a1f33));border:1px solid #e9b94966;color:var(--ink,#fff);font:inherit;text-align:left;cursor:pointer;position:relative}
#tdTitle>i{font-style:normal;font-size:22px}#tdTitle span{flex:1;min-width:0;display:flex;flex-direction:column}#tdTitle b{font-size:14.5px}#tdTitle small{font-size:12px;opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#tdTitle em,.tdBd{font-style:normal;min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:#e0503c;color:#fff;font-size:12px;display:inline-flex;align-items:center;justify-content:center}
.tdH{display:flex;align-items:center;gap:12px;margin:0 40px 8px 0}.tdH h3{margin:0}.tdH small{font-size:13px;opacity:.75}
.tdRing{--p:0;width:58px;height:58px;flex:none;border-radius:50%;background:conic-gradient(#e9b949 calc(var(--p)*1%),#8883 0);display:grid;place-items:center}.tdRing i{width:45px;height:45px;border-radius:50%;background:var(--card,#151a2b);display:grid;place-items:center;font-style:normal;font-size:14px;font-weight:700}
#modal .tdCl{display:block;width:100%!important;max-width:none!important;margin:2px 0 6px}.tdCl[disabled]{opacity:.5}
.tdB{display:block}@media(min-width:1000px){body.desk #modal[data-k="today"] .tdB{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}body.desk #modal[data-k="today"]{width:min(1080px,calc(100vw - 40px))!important;max-width:none!important}}
.tdS h4{display:flex;align-items:center;margin:12px 2px 6px;font-size:14.5px}.tdS h4 small{margin-left:auto;font-weight:normal;font-size:12px;opacity:.65}
.tdI{display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;margin:0 0 7px;border-radius:13px;background:var(--card,#171c2e);border:1px solid var(--line,#8883);color:inherit;font:inherit;text-align:left;cursor:pointer}
.tdI>i{font-style:normal;width:38px;height:38px;flex:none;border-radius:11px;background:#8881;display:grid;place-items:center;font-size:20px}
.tdI .w{flex:1;min-width:0;display:flex;flex-direction:column}.tdI .w b{font-weight:600;font-size:14px}.tdI .w small{font-size:12px;opacity:.75}
.tdI .w em{display:block;height:5px;border-radius:5px;background:#8883;margin-top:5px;overflow:hidden}.tdI .w em u{display:block;height:100%;background:#4fb67a;text-decoration:none}
.tdI .g{font-size:12.5px;padding:5px 10px;border-radius:999px;border:1px solid var(--line,#8885);white-space:nowrap}
.tdI.rd{border-color:#e9b949aa;background:linear-gradient(90deg,#e9b94920,var(--card,#171c2e))}.tdI.rd .g{background:#e9b949;color:#2a1d05;border:none}
.tdI.dn{opacity:.5}.tdI.dn .g{border:none;color:#4fb67a}`;document.head.appendChild(st);
window._td={collect,draw};
})()}catch(e){console.error('mod-today',e)}
try{wReady('today')}catch(e){}
