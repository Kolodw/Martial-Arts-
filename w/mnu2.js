// ☰ เมนูแบบใหม่ (หน้าหลัก + 6 หมวด + ค้นหา + ตั้งค่า)
// ไม่สร้างระบบใหม่: เปิดเมนูเดิมตามปกติ (ทุกส่วนเสริมยังเติมปุ่มลงไปเหมือนเดิม) แล้วเก็บปุ่มเดิมทั้งหมดซ่อนไว้
// หน้าตาใหม่แค่ "ชี้" ไปที่ปุ่มเดิม แตะแล้วกด .click() ของปุ่มเดิม → ทุกระบบทำงานเหมือนเดิมทุกอย่าง
(function(){
'use strict';
if(window._mnu2)return;window._mnu2=1;
const LSg=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSs=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CATS=[
 ['char','🧘','ตัวละครและการฝึก','#E7B04A',/openRealm|owOpen|wdOpen|openArts|openEquip|gachaArt|openFaction|openCraft|openJob|openWuxia|openTtlMine|openTalent|openMe\b|openMyCard|cpnOpen|openBeastComp|afsOpen|openMoveBook|mjB|xtB|glwSet|ผ้า|วิชา|พรสวรรค์|ฉายา|อาชีพ|สำนัก|ชุด/],
 ['ppl','👪','ผู้คนและครอบครัว','#ED93B1',/openHouse|openFamily|openPeople|openPeers|openRanking|openKeep|openLove|fanLedger|flOpen|glOpen|dvOpen|divorce|หย่า|ครอบครัว|ผู้คน|ความรัก|ตระกูล/],
 ['world','🗺️','โลกและผจญภัย','#6FD39A',/openTown|openMarket|openDungeons|openWild|openMap|openWealth|openAtlas|openCal|openQuests|eraOpen|openKrt|xlB|หมู่บ้าน|ตลาด|ดันเจี้ยน|แผนที่|เมือง|ป่า/],
 ['game','🎮','มินิเกมและกิจกรรม','#6FA8FF',/openOnline\('arena'\)|openOnline\('rp'\)|openMgDaily|m3Mn|openFate|lpOpen|dailyOpen|openAQ|tdOpen|xpB|มินิเกม|ประลอง|กิจกรรม|ภารกิจ/],
 ['book','📚','สะสมและบันทึก','#B58CFF',/chBook|openChron|annalOpen|novelShelf|openNovels|openBook|openBestiary|openGraves|openArcBook|openLore|openCodex|scrMn|lgdOpen|ttsToggle|openStats|xwB|xsB|openLifeLog|สมุด|บันทึก|ตำนาน|นิยาย|สารานุกรม/],
 ['net','🌐','ออนไลน์และชุมชน','#5CF2FF',/openGuild|openCG|echoOpen|openCosmetic|openFrameShop|openProfile|openStore|hSp|openTickets|ออนไลน์|กลุ่ม|โปรไฟล์|กรอบ|ร้านค้า/]];
const SET=/mUISet|lenCustom|akMenu|openGfx|openUiZ|toggleChSum|openAuto|startTut|openUpdate|openSound|openPMode|cycleTheme|cycleFs|toggleScene|openPush|openSaveCode|openReport|openFeedback|nothink|pfxTog|mgyToggle|langopt|uxTg|glossoff|uiall|ctStart|openGuide|คู่มือ|Island|ตั้งค่าออโต้|faSet/;
const SETG=[['จอ','รูปแบบหน้าจอ',/mUISet|openUiZ|cycleFs|toggleScene|cycleTheme|openGfx|pfxTog|uxTg|Island|glossoff|uiall|openPMode|langopt/],['play','การเล่น',/lenCustom|akMenu|toggleChSum|openAuto|ตั้งค่าออโต้|nothink|mgyToggle|faSet/],['help','บัญชีและช่วยเหลือ',/./]];
const QUICK=[/openAdvice/,/openRoadmap/,/ทำไมไปต่อไม่ได้/,/openLifeLog/];
const TODAY=/claimAll|tdOpen|lpOpen|openKrt|dailyOpen|openAQ/;
const SKIP=/^(✕|แสดงทั้งหมด|⚙️|🎬 ดูวิธีใช้เมนู)$|^▾ อีก|…$/;
let ST={pg:'hub',q:'',cat:null},ITEMS=[],SIG='',busy=0,rec=0;
const use=()=>LSg('murim_mnu2use',{})||{},pins=()=>LSg('murim_mnu2pin',null),seen=()=>LSg('murim_mnu2seen',{})||{};
function harvest(m){const out=[],dup={};
 m.querySelectorAll('button').forEach(b=>{if(b.closest('.m2r'))return;if(b.classList.contains('xbtn')||b.classList.contains('mnX'))return;
  const oc=b.getAttribute('onclick')||'';const c=b.cloneNode(true);const sm=c.querySelector('small');const sub=sm?sm.textContent.trim():'';if(sm)sm.remove();
  let isNew=false;c.querySelectorAll('i,span,b,em').forEach(x=>{if(/^ใหม่$/.test(x.textContent.trim())||/mnNew/.test(x.className)){isNew=true;x.remove()}});
  const px=c.querySelector('.pxi');let ic='';if(px){ic=px.outerHTML;px.remove()}
  let lab=c.textContent.replace(/\s+/g,' ').trim();if(!ic){const mm=lab.match(/^(\p{Extended_Pictographic}[️‍\p{Extended_Pictographic}]*)\s*/u);if(mm){ic=mm[1];lab=lab.slice(mm[0].length)}}
  if(!lab||SKIP.test(lab)||SKIP.test((b.textContent||'').trim()))return;
  const cls=[...b.classList].filter(x=>/^[a-z]{2,4}B$/.test(x)).join(' ');const key=oc||cls||lab;if(dup[key+lab])return;dup[key+lab]=1;
  const hay=oc+' '+b.className+' '+lab+' '+sub;const dot=/mnDot|has/.test(b.className)||/●/.test(b.textContent)||!!b.querySelector('.ondot,.dot');
  let cat=null;if(/saveGame\(\);closeM\(\);toTitle|endLifeAsk/.test(oc))cat='foot';else if(SET.test(hay))cat='set';else{for(const C of CATS)if(C[4].test(oc+' '+b.className)){cat=C[0];break}if(!cat)for(const C of CATS)if(C[4].test(lab)){cat=C[0];break}if(!cat)cat='world'}
  out.push({b,key,lab,sub,ic,cat,dot,isNew,hay,today:TODAY.test(oc),quick:QUICK.findIndex(r=>r.test(oc+' '+lab))})});
 return out}
const icon=(it,sz)=>`<span class="m2i" style="--s:${sz||40}px">${it.ic&&it.ic.startsWith('<')?it.ic:esc(it.ic||'•')}</span>`;
function badge(it){return it.dot?'<span class="m2dot"></span>':''}
function row(it,star){const sn=seen(),P=pins()||[];return `<button type="button" class="m2row" data-k="${esc(it.key)}">${icon(it)}<span class="m2t"><b>${esc(it.lab)}</b>${it.sub?`<small>${esc(it.sub)}</small>`:''}</span>${it.isNew&&!sn[it.key]?'<em class="m2new">ใหม่</em>':''}${badge(it)}${star?`<span class="m2star ${P.includes(it.key)?'on':''}" data-pin="${esc(it.key)}" role="button" aria-label="ปักหมุด"></span>`:'<span class="m2ch">›</span>'}</button>`}
function pinList(){const P=pins();const by=k=>ITEMS.find(x=>x.key===k);if(P&&P.length)return P.map(by).filter(Boolean).slice(0,7);
 const U=use(),pool=ITEMS.filter(x=>!['set','foot'].includes(x.cat)&&x.quick<0&&!x.today);const s=pool.slice().sort((a,b)=>(U[b.key]||0)-(U[a.key]||0));
 const def=[/owOpen|wdOpen/,/openArts/,/openTown/,/openDungeons/,/gachaArt/,/arena/,/openFate/,/openPeople/,/openBook/];const out=[];
 s.filter(x=>U[x.key]).forEach(x=>{if(out.length<7&&!out.includes(x))out.push(x)});def.forEach(r=>{const x=pool.find(y=>r.test(y.key));if(x&&out.length<7&&!out.includes(x))out.push(x)});pool.forEach(x=>{if(out.length<7&&!out.includes(x))out.push(x)});return out}
function head(t,back){return `<div class="m2h">${back?'<button type="button" class="m2ib" data-go="hub" aria-label="กลับ">‹</button>':''}<b>${t}</b><button type="button" class="m2ib" data-x="1" aria-label="ปิด">✕</button></div>`}
function view(){const it=ITEMS;let h='';
 if(ST.pg==='hub'||ST.pg==='search'){
  h+=head('เมนู')+`<label class="m2s"><span>🔎</span><input type="search" id="m2q" placeholder="ค้นหา เช่น ตู้เสื้อผ้า, ดันเจี้ยน" value="${esc(ST.q)}" autocomplete="off"></label>`;
  if(ST.q.trim()){const q=ST.q.trim().toLowerCase();const R=it.filter(x=>x.cat!=='foot'&&(x.lab+' '+x.sub).toLowerCase().includes(q));const cn=k=>k==='set'?'ตั้งค่า':(CATS.find(c=>c[0]===k)||[])[2]||'';
   h+=`<div class="m2b"><div class="m2l">เจอ ${R.length} อย่าง</div>${R.map(x=>row({...x,sub:cn(x.cat)+(x.sub?' · '+x.sub:'')})).join('')||'<p class="m2e">ไม่เจอ ลองคำอื่นดูนะ</p>'}</div>`}
  else{const T=it.filter(x=>x.today),Q=[0,1,2,3].map(i=>it.find(x=>x.quick===i)).filter(Boolean),PN=pinList();
   h+='<div class="m2b">';
   if(T.length)h+=`<div class="m2chips">${T.map(x=>`<button type="button" class="m2chip ${/claimAll/.test(x.key)?'gold':''}" data-k="${esc(x.key)}">${icon(x,22)}<span>${esc(x.lab)}</span>${badge(x)}</button>`).join('')}</div>`;
   if(Q.length)h+=`<div class="m2l">ชีวิตนี้</div><div class="m2q">${Q.map(x=>`<button type="button" class="m2qb" data-k="${esc(x.key)}">${icon(x,46)}<span>${esc(x.lab.replace(/\?$/,''))}</span></button>`).join('')}</div>`;
   h+=`<div class="m2l"><span>ปักหมุดไว้ · ใช้บ่อย</span><button type="button" class="m2lk" data-go="pin">จัดเรียง</button></div><div class="m2p">${PN.map(x=>`<button type="button" class="m2pb" data-k="${esc(x.key)}">${icon(x,50)}<span>${esc(x.lab)}</span>${badge(x)}</button>`).join('')}<button type="button" class="m2pb add" data-go="pin"><span class="m2i" style="--s:50px">✎</span><span>แก้ไข</span></button></div>`;
   h+=`<div class="m2l">หมวดทั้งหมด</div><div class="m2c">${CATS.map(C=>{const L=it.filter(x=>x.cat===C[0]);if(!L.length)return'';return `<button type="button" class="m2cb" data-cat="${C[0]}" style="--c:${C[3]}"><span class="m2i" style="--s:40px;background:color-mix(in srgb,${C[3]} 18%,#211E31)">${C[1]}</span><span class="m2t"><b>${C[2]}</b><small style="color:${C[3]}">${L.length} ระบบ</small></span>${L.some(x=>x.dot)?'<span class="m2dot"></span>':''}</button>`}).join('')}</div></div>`}
  const F=it.filter(x=>x.cat==='foot');h+=`<div class="m2f">${F.map(x=>`<button type="button" class="m2fb" data-k="${esc(x.key)}">${icon(x,22)}<span>${esc(/toTitle/.test(x.key)?'หน้าแรก':x.lab.replace(/\s*—.*$/,''))}</span></button>`).join('')}<button type="button" class="m2fb" data-go="set"><span class="m2i" style="--s:22px">⚙️</span><span>ตั้งค่า</span></button></div>`}
 else if(ST.pg==='cat'){const C=CATS.find(c=>c[0]===ST.cat)||CATS[0];h+=head(`${C[1]} ${C[2]}`,1)+`<div class="m2b"><div class="m2l" style="display:block">แตะดาวเพื่อปักหมุดไว้หน้าเมนู</div>${it.filter(x=>x.cat===C[0]).map(x=>row(x,1)).join('')}</div>`}
 else if(ST.pg==='set'){h+=head('ตั้งค่า',1)+'<div class="m2b">';const S=it.filter(x=>x.cat==='set'),used={};SETG.forEach(([k,n,r])=>{const L=S.filter(x=>!used[x.key+x.lab]&&r.test(x.hay));L.forEach(x=>used[x.key+x.lab]=1);if(L.length)h+=`<div class="m2l">${n}</div><div class="m2g">${L.map(x=>row(x)).join('')}</div>`});
  h+='</div>'}
 else if(ST.pg==='pin'){const P=pins()||pinList().map(x=>x.key);h+=head('จัดเรียงปักหมุด',1)+`<div class="m2b"><div class="m2l" style="display:block">แตะดาวเพื่อเลือก (สูงสุด 7) · ตอนนี้ ${P.length} อย่าง</div>${it.filter(x=>!['set','foot'].includes(x.cat)).map(x=>row(x,1)).join('')}</div>`}
 return h}
function paint(m){let r=m.querySelector(':scope>.m2r');if(!r){r=document.createElement('div');r.className='m2r';m.appendChild(r)}
 const st=r.querySelector('.m2b')?r.querySelector('.m2b').scrollTop:0;rec=1;r.innerHTML=isD()?desk(view()):view();r.classList.toggle('m2D',isD());m.classList.toggle('mnu2D',isD());rec=0;
 if(ST.pg!=='hub'||!ST.q){const b=r.querySelector('.m2b');if(b&&ST._keep)b.scrollTop=st}ST._keep=0;
 const qi=r.querySelector('#m2q');if(qi){qi.oninput=()=>{ST.q=qi.value;ST.pg=qi.value.trim()?'search':'hub';paint(m);const n=m.querySelector('#m2q');if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length)}catch(e){}}}}}

const isD=()=>innerWidth>=900;
// 🖥️ คอม: แถบหมวดด้านซ้าย (ค้นหา · หน้าหลัก · 6 หมวด · ตั้งค่า · หน้าแรก/จบชีวิต) + เนื้อหาด้านขวาเป็นตาราง
function desk(html){const t=document.createElement('div');t.innerHTML=html;const it=ITEMS;
 const ttl=(t.querySelector('.m2h b')||{}).innerHTML||'เมนู';['.m2h','.m2s','.m2f'].forEach(q=>t.querySelectorAll(q).forEach(e=>e.remove()));
 if(ST.pg==='hub'){const c=t.querySelector('.m2c');if(c){const l=c.previousElementSibling;if(l&&l.classList.contains('m2l'))l.remove();c.remove()}}
 const nav=(k,ic,n,sub,on,dot,c)=>`<button type="button" class="m2nv ${on?'on':''}" ${k}>${ic}<span class="m2t"><b>${n}</b>${sub?`<small${c?` style="color:${c}"`:''}>${sub}</small>`:''}</span>${dot?'<span class="m2dot"></span>':''}</button>`;
 let sd=`<label class="m2s"><span>🔎</span><input type="search" id="m2q" placeholder="ค้นหาเมนู" value="${esc(ST.q)}" autocomplete="off"></label><div class="m2nvL">`;
 sd+=nav('data-go="hub"','<span class="m2i" style="--s:34px">🏠</span>','หน้าหลัก','กิจกรรม · ปักหมุด',ST.pg==='hub'||ST.pg==='search'||ST.pg==='pin');
 CATS.forEach(C=>{const L=it.filter(x=>x.cat===C[0]);if(!L.length)return;sd+=nav(`data-cat="${C[0]}"`,`<span class="m2i" style="--s:34px;background:color-mix(in srgb,${C[3]} 18%,#211E31)">${C[1]}</span>`,C[2],L.length+' ระบบ',ST.pg==='cat'&&ST.cat===C[0],L.some(x=>x.dot),C[3])});
 sd+=nav('data-go="set"','<span class="m2i" style="--s:34px">⚙️</span>','ตั้งค่า',it.filter(x=>x.cat==='set').length+' อย่าง',ST.pg==='set');
 sd+='</div><div class="m2sf">'+it.filter(x=>x.cat==='foot').map(x=>`<button type="button" class="m2fb" data-k="${esc(x.key)}">${icon(x,20)}<span>${esc(/toTitle/.test(x.key)?'หน้าแรก':x.lab.replace(/\s*—.*$/,''))}</span></button>`).join('')+'</div>';
 return `<aside class="m2side">${sd}</aside><section class="m2main"><div class="m2mh"><b>${ST.pg==='hub'?'เมนู':ST.pg==='search'?'ผลการค้นหา':ttl}</b><button type="button" class="m2ib" data-x="1" aria-label="ปิด">✕</button></div>${t.innerHTML}</section>`}
let _rz=0;addEventListener('resize',()=>{clearTimeout(_rz);_rz=setTimeout(()=>{const a=document.activeElement;if(a&&a.id==='m2q')return;const m=$('modal');if(m&&m.classList.contains('mnu2'))paint(m)},200)});
function find(k){return ITEMS.find(x=>x.key===k)}
function onClick(e){const m=$('modal');if(!m||!m.classList.contains('mnu2'))return;const t=e.target;if(!t.closest||!t.closest('.m2r'))return;
 const pin=t.closest('[data-pin]');if(pin){e.preventDefault();e.stopPropagation();const k=pin.dataset.pin;let P=pins()||pinList().map(x=>x.key);P=P.includes(k)?P.filter(x=>x!==k):P.concat(k).slice(-7);LSs('murim_mnu2pin',P);ST._keep=1;paint(m);return}
 const go=t.closest('[data-go]');if(go){ST.pg=go.dataset.go;ST.q='';paint(m);return}
 const ca=t.closest('[data-cat]');if(ca){ST.pg='cat';ST.cat=ca.dataset.cat;paint(m);return}
 if(t.closest('[data-x]')){try{closeM()}catch(x){}return}

 const k=t.closest('[data-k]');if(k){const it=find(k.dataset.k);if(!it)return;const U=use();U[it.key]=(U[it.key]||0)+1;LSs('murim_mnu2use',U);const S=seen();S[it.key]=1;LSs('murim_mnu2seen',S);
  ST._keep=1;try{it.b.click()}catch(x){console.error('mnu2',x)}}}
function go(m,force){if(busy)return;{const a=document.activeElement;if(!force&&a&&a.id==='m2q'&&m.querySelector(':scope>.m2r'))return}
 const L=harvest(m);const sig=L.map(x=>x.key+'|'+x.lab+'|'+x.sub+'|'+(x.dot?1:0)).join('~');
 if(!force&&sig===SIG&&m.classList.contains('mnu2')&&m.querySelector(':scope>.m2r'))return;SIG=sig;ITEMS=L;
 if(!m.classList.contains('mnu2'))ST={pg:'hub',q:'',cat:null};m.classList.add('mnu2');paint(m)}
let tm=0,lastOpen=0;
function check(){const m=$('modal');if(!m)return;const isMenu=m.dataset.k==='menu'&&typeof modalOpen!=='undefined'&&modalOpen;
 if(!isMenu){if(m.classList.contains('mnu2')||m.classList.contains('mnu2D')){m.classList.remove('mnu2','mnu2D');SIG=''}return}
 clearTimeout(tm);tm=setTimeout(()=>go(m),40)}
const css=document.createElement('style');css.textContent=`
#modal.mnu2{padding:0!important;display:flex!important;flex-direction:column;height:min(88vh,860px);max-height:88vh!important;overflow:hidden!important;width:min(94vw,460px)!important}
#modal.mnu2>*:not(.m2r){display:none!important}
#modal.mnu2>.m2r{display:flex;flex-direction:column;min-height:0;flex:1;font-family:'Sarabun','Itim',sans-serif;color:#EEE7D7}
.m2r button{font:inherit;color:inherit;cursor:pointer}
.m2h{display:flex;align-items:center;gap:6px;padding:12px 10px 8px 16px}.m2h b{flex:1;font:500 20px 'Kanit',sans-serif}
.m2ib{width:40px;height:40px;border-radius:12px;border:0;background:transparent;font-size:22px!important;line-height:1;color:#C9C0DA!important;display:grid;place-items:center}
.m2h .m2ib:first-child{margin-left:-8px}
.m2s{display:flex;align-items:center;gap:8px;margin:0 14px 10px;height:44px;padding:0 12px;border-radius:14px;background:#13111C;border:1px solid #3A3354}
.m2s:focus-within{border-color:var(--hA,#E7B04A)}html:root body #modal.mnu2 .m2s input#m2q{border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;height:auto!important;min-height:0!important;margin:0!important}.m2s input{flex:1;min-width:0;background:transparent!important;border:0!important;outline:0;color:#EEE7D7!important;font:15px 'Sarabun',sans-serif!important;padding:0!important;box-shadow:none!important}
.m2b{flex:1;min-height:0;overflow-y:auto;padding:0 14px 14px;-webkit-overflow-scrolling:touch}
.m2l{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;color:#A8A0BC;margin:12px 2px 8px}
.m2lk{border:0;background:transparent;color:var(--hA,#E7B04A)!important;font-size:12.5px!important;padding:0}
.m2i{width:var(--s);height:var(--s);flex:none;border-radius:calc(var(--s)/3);background:#24203A;display:grid;place-items:center;font-size:calc(var(--s)*.46);line-height:1;overflow:hidden}
.m2i .pxi{transform:scale(calc(var(--s)/40));transform-origin:center}
.m2chips{display:flex;gap:8px;overflow-x:auto;padding:2px 0 2px;scrollbar-width:none}.m2chips::-webkit-scrollbar{display:none}
.m2chip{position:relative;display:flex;align-items:center;gap:6px;flex:none;height:40px;padding:0 12px 0 6px;border-radius:20px;border:1px solid #3A3354;background:#211E31;font-size:13.5px!important;white-space:nowrap}
.m2chip .m2i{background:transparent}.m2chip.gold{background:var(--hA,#E7B04A);border-color:var(--hA,#E7B04A);color:#1B1309!important}
.m2q{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
.m2qb{display:flex;flex-direction:column;align-items:center;gap:6px;border:0;background:transparent;font-size:12px!important;line-height:1.25;text-align:center;padding:2px}
.m2p{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));row-gap:12px;column-gap:4px}
.m2pb{position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;border:0;background:transparent;font-size:12px!important;line-height:1.25;text-align:center;padding:2px;min-width:0}
.m2pb>span:last-of-type{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m2pb .m2i{background:#211E31;border:1px solid #2E2944}.m2pb.add .m2i{background:transparent;border:1.5px dashed #4A4266;color:#A8A0BC}
.m2pb .m2dot{position:absolute;top:0;right:calc(50% - 30px)}
.m2c{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.m2cb{position:relative;display:flex;align-items:center;gap:10px;padding:10px;border-radius:16px;border:1px solid #2E2944;background:#211E31;text-align:left;min-width:0}
.m2cb:active,.m2row:active,.m2pb:active .m2i,.m2qb:active .m2i{transform:scale(.97)}
.m2t{flex:1;min-width:0;display:flex;flex-direction:column}.m2t b{font-weight:500;font-size:14.5px;line-height:1.3}.m2t small{font-size:12px;color:#A8A0BC;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m2cb .m2t b{font:500 14px/1.25 'Kanit',sans-serif}
.m2cb .m2dot{position:absolute;top:9px;right:9px}
.m2dot{width:9px;height:9px;border-radius:5px;background:#E5655A;flex:none}
.m2row{display:flex;align-items:center;gap:12px;width:100%;padding:9px 4px;border:0;border-bottom:1px solid #2A2640;background:transparent;text-align:left}
.m2g{border-radius:16px;background:#211E31;border:1px solid #2E2944;padding:0 10px}.m2g .m2row:last-child{border-bottom:0}.m2g .m2i{--s:34px!important;background:transparent}
.m2ch{color:#6E6787;font-size:20px}#modal.mnu2 .m2star::before{content:'\\2605'}#modal.mnu2 .m2star{font-size:20px;color:#4A4266!important;padding:4px 6px;filter:none!important}#modal.mnu2 .m2star.on{color:var(--hA,#E7B04A)!important}
.m2new{font-style:normal;font-size:11px;padding:1px 7px;border-radius:8px;background:color-mix(in srgb,var(--hA,#E7B04A) 22%,transparent);color:var(--hA,#E7B04A)}
.m2f{display:flex;gap:8px;padding:10px 14px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid #2E2944}
.m2fb{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;min-height:44px;border-radius:14px;border:1px solid #3A3354;background:#211E31;font:500 14px 'Kanit',sans-serif!important;min-width:0;white-space:nowrap;overflow:hidden}
.m2fb .m2i{background:transparent}
.m2e{color:#A8A0BC;text-align:center;padding:20px 0}
.m2back{display:block;width:100%;margin:6px 0 8px}
#modal.mnu2.mnu2D{width:min(1120px,94vw)!important;max-width:none!important;height:min(86vh,780px)}
#modal.mnu2>.m2r.m2D{flex-direction:row!important}
#modal.mnu2 .m2D .m2side{width:280px;flex:none;display:flex;flex-direction:column;border-right:1px solid #2E2944;background:#16131F;padding:16px 0 0}
#modal.mnu2 .m2D .m2side .m2s{margin:0 14px 12px}
#modal.mnu2 .m2nvL{flex:1;min-height:0;overflow-y:auto;padding:0 10px;display:flex;flex-direction:column;gap:2px}
#modal.mnu2 .m2nv{position:relative;display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border-radius:14px;border:0;background:transparent;text-align:left}
#modal.mnu2 .m2nv:hover{background:#211E31}.m2nv.on{background:#2A2640;box-shadow:inset 3px 0 0 var(--hA,#E7B04A)}
#modal.mnu2 .m2nv .m2t b{font:500 14.5px/1.3 'Kanit',sans-serif}.m2nv .m2dot{position:absolute;right:12px;top:50%;margin-top:-4px}
#modal.mnu2 .m2sf{display:flex;gap:8px;padding:12px 14px 14px;border-top:1px solid #2E2944}.m2sf .m2fb{min-height:42px;font-size:13.5px!important}
#modal.mnu2 .m2D .m2main{flex:1;min-width:0;display:flex;flex-direction:column}
#modal.mnu2 .m2mh{display:flex;align-items:center;padding:16px 14px 6px 24px}.m2mh b{flex:1;font:500 22px 'Kanit',sans-serif}
#modal.mnu2 .m2D .m2b{padding:0 24px 24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:18px;align-content:start}
#modal.mnu2 .m2D .m2b>:not(.m2row){grid-column:1/-1}
#modal.mnu2 .m2D .m2b>.m2row{border-bottom:1px solid #2A2640}
#modal.mnu2 .m2D .m2chips{flex-wrap:wrap;overflow:visible}
#modal.mnu2 .m2D .m2q{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
#modal.mnu2 .m2D .m2qb{flex-direction:row;justify-content:flex-start;gap:10px;padding:10px 12px;border-radius:16px;background:#211E31;border:1px solid #2E2944;text-align:left;font-size:14px!important}
#modal.mnu2 .m2D .m2qb:hover,#modal.mnu2 .m2D .m2pb:hover .m2i,#modal.mnu2 .m2D .m2row:hover{border-color:var(--hA,#E7B04A)}
#modal.mnu2 .m2D .m2row:hover{background:#1E1B2C}
#modal.mnu2 .m2D .m2p{grid-template-columns:repeat(8,minmax(0,1fr))}
#modal.mnu2 .m2D .m2g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:18px}
#modal.mnu2 .m2D .m2g .m2row{border-bottom:1px solid #2A2640}
#modal.mnu2 .m2row,#modal.mnu2 .m2nv,#modal.mnu2 .m2cb,#modal.mnu2 .m2fb,#modal.mnu2 .m2chip{display:flex!important;flex-direction:row!important;align-items:center!important;text-align:left!important;width:auto}
#modal.mnu2 .m2row,#modal.mnu2 .m2nv{width:100%!important;justify-content:flex-start!important}
#modal.mnu2 .m2fb{justify-content:center!important}
#modal.mnu2 .m2qb,#modal.mnu2 .m2pb{display:flex!important;flex-direction:column!important;align-items:center!important}
#modal.mnu2 .m2D .m2qb{flex-direction:row!important;justify-content:flex-start!important}
@media (prefers-reduced-motion:no-preference){#modal.mnu2>.m2r .m2b{animation:m2in .2s ease-out}@keyframes m2in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}}
`;document.head.appendChild(css);
document.addEventListener('click',onClick,true);
try{const mo=new MutationObserver(ms=>{if(rec)return;if(ms.every(x=>x.target.closest&&x.target.closest('.m2r')))return;check()});const st=()=>{const m=$('modal');if(!m)return setTimeout(st,500);mo.observe(m,{childList:true,subtree:true,attributes:true,attributeFilter:['data-k']})};st()}catch(e){}
setInterval(check,1500);check();
})();
