// ============================================================
// /w/front.js 🏯 หน้าแรกใหม่ — ธีมเปลี่ยนตามโลกที่เลือก · จัดหน้าให้โล่ง
//  - body[data-front=<โลก>] ตามการ์ดโลกที่เลือก (#wPick .wc.on) ขณะอยู่หน้าแรก → สี กรอบ ฟอนต์หัวข้อ ปุ่มเกิด + ม่านสีทับฉาก
//  - มือถือ: ปุ่มลอยขวา (ร้านค้า/ชุมชน/ลอยกระทง/คัมภีร์) → ปุ่มร้านค้า+เมนูมุมขวาบน + แถว "วันนี้" (อีเวนต์ ภารกิจ คัมภีร์ ชุมชน)
//            การ์ด "เล่นต่อ" เหนือรายการโลก · แถบล่างเหลือ โหมด + เกิด · เมนูนำทาง 5 ปุ่ม (ลาน → แท็บในออนไลน์ · เมนู → มุมขวาบน)
//            หน้าย่อยจากหน้าแรก (ชะตาวันนี้ สมุด ออนไลน์ กลุ่ม เมนู ร้าน อีเวนต์ คัมภีร์ โปรไฟล์ ภารกิจ) เปิดเต็มจอ
//  - ทำงานเฉพาะธีมทองราตรี (body.royal) · ปิดได้ LS murim_frontOff=1
// ============================================================
(function(){
if(window._front)return;
const $=id=>document.getElementById(id);
const LSg=(k,d)=>{try{return window.LS?LS.get(k,d):d}catch(e){return d}};
const CH="'Charm','Itim',serif",TR="'Trirong','Itim',serif",CP="'Chakra Petch','Itim',sans-serif",MI="'Mitr','Itim',sans-serif",PX="'IBM Plex Sans Thai','Itim',sans-serif";
// [bg, card, raised, line, ink, muted, accent, accent2, track, font, tint]
const T={
 murim:['#120f0d','#1d1814','#241d18','#3a2e24','#efe6d6','#a89a86','#c8402f','#d6a647','#2a221c',CH,'rgba(0,0,0,0)'],
 xian:['#0f1a18','#16261f','#1c2f27','#2f4a3f','#eef3ea','#a3b8ad','#3f9c80','#e8dcb4','#213a30',CH,'rgba(110,190,165,.38)'],
 mw:['#0f1622','#172131','#1d2a3d','#2c3d57','#e8eef7','#9fb0c6','#dc2626','#7cb4ff','#1f2c40',PX,'rgba(20,40,90,.5)'],
 soul:['#0c0b14','#15131f','#1c1929','#2e2742','#ece8f7','#a39cbd','#7c4ddb','#6ee7b7','#221e33',CH,'rgba(60,30,130,.55)'],
 loop:['#17120c','#211a12','#2a2117','#45372a','#f0e6d6','#b0a28c','#b3612c','#e3c48c','#2e2419',TR,'rgba(110,70,25,.5)'],
 beast:['#101710','#18221a','#1f2b20','#33452f','#eaf1e3','#a5b59b','#c9702a','#9cc56b','#243324',MI,'rgba(30,90,35,.5)'],
 sky:['#060920','#0d1336','#121a46','#22306a','#e6ecff','#9aa6d6','#7c3aed','#5ee0ff','#1a2352',CP,'rgba(6,9,46,.74)'],
 fog:['#121416','#1c1f22','#24272a','#4d483d','#ece6da','#a7a293','#2f7d74','#c9a15a','#2c2f31',TR,'rgba(48,54,60,.66)']
};
const SHEET=['daily2','book','online','guild','tmenu','store','evshop','krt','sp','profile','aq','cosshop'];
const ic=(p,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
// รูปพิกเซลจากปุ่มเดิม (ถ้าไม่มีใช้อีโมจิ ให้ตัวแปลงพิกเซลแปลงเอง)
const px=(sel,emo)=>{try{const e=document.querySelector(sel);const p=e&&e.querySelector('.pxi');if(p){const c=p.cloneNode(true);c.removeAttribute('id');return c.outerHTML}}catch(e){}return `<span class="frEmo">${emo}</span>`};
const I={gem:'<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 6 3-6"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',home:'<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',play:'<path d="M8 5l11 7-11 7z"/>',chev:'<path d="M9 6l6 6-6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',
 lotus:'<path d="M12 19c-4 0-8-2-8-6 3 0 6 2 8 6zM12 19c4 0 8-2 8-6-3 0-6 2-8 6zM12 19c-2-3-2-8 0-12 2 4 2 9 0 12z"/>',scroll:'<path d="M6 4h11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M9 9h5M9 13h5"/>',star:'<path d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 19.2l.9-5.5-4-3.9 5.5-.8z"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>'};
// ---------- CSS ----------
function css(){
 let s='';
 for(const k in T){const t=T[k],sel=`html body[data-front="${k}"]`;
  s+=`${sel}{--bg:${t[0]};--card:${t[1]};--w:${t[2]};--line:${t[3]};--ink:${t[4]};--mut:${t[5]};--fA:${t[6]};--fG:${t[7]};--fK:${t[8]};--fD:${t[9]};--fT:${t[10]};--pink:${t[7]};--pinkd:color-mix(in srgb,${t[7]} 70%,#000);--onacc:${t[0]};--good:color-mix(in srgb,#3fae5a 16%,${t[1]});--bad:color-mix(in srgb,#e0484f 18%,${t[1]});--epic:color-mix(in srgb,${t[7]} 14%,${t[1]});--myth:color-mix(in srgb,${t[6]} 20%,${t[1]});--peerb:${t[1]};--think:color-mix(in srgb,#4a7ad8 14%,${t[1]})}\n`;
 }
 const B='html body[data-front]',M='html body[data-front]:not(.desk)';
 s+=`
#frTint{position:fixed;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,var(--fT) 0%,var(--fT) 40%,color-mix(in srgb,var(--bg) 70%,transparent) 100%);transition:background .5s}
${B} #title .big .gold{font-family:var(--fD)!important;background:none!important;-webkit-text-fill-color:var(--fG)!important;color:var(--fG)!important;text-shadow:0 3px 0 rgba(0,0,0,.45)!important}
${B} #wPick{background:var(--card)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:0 2px 10px rgba(0,0,0,.25)!important;border-radius:20px!important}
${B} #wPick .wc.on{border-color:var(--fG)!important;box-shadow:0 0 0 2px var(--fG)!important}
${B} #wPick .wpH b,${B} #wPick .wpH,${B} #wPick h4{font-family:var(--fD)}
${B} #wPick .wDots>*.on,${B} #wPick .wDots .on{background:var(--fG)!important}
${B} #tDock .nav{border-color:color-mix(in srgb,var(--fG) 45%,transparent)!important}
${B} #tDock .tgo,${B} #uxGo .uxBorn{background:var(--fG)!important;background-image:none!important;color:var(--onacc)!important;border-color:var(--fG)!important;box-shadow:0 3px 0 color-mix(in srgb,var(--fG) 55%,#000)!important}
${B} #tDock .tgo small,${B} #uxGo .uxBorn small{color:var(--onacc)!important;opacity:.85}
${B} #tDock .nav button{color:var(--mut)!important}
${B} #tDock .nav button.frOn{color:var(--fG)!important}
${B} #tTop .tav{background:var(--card)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:none!important}
${B} #tNews{background:var(--card)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:none!important;color:var(--ink)!important}
#frCont{display:none;align-items:center;gap:12px;width:100%;margin:0 0 10px;padding:10px 12px;border-radius:16px;background:var(--card);border:1px solid var(--line);color:var(--ink);font:inherit;text-align:left;cursor:pointer}
#frCont .ic{width:44px;height:44px;flex:none;border-radius:12px;background:var(--w);display:flex;align-items:center;justify-content:center;color:var(--fG)}
#frCont .tx{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.3}
#frCont .tx small{font-size:12px;color:var(--mut)}#frCont .tx b{font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#frCont .ch{color:var(--mut);display:flex}
#frToday{display:none;gap:8px;margin:0 0 10px}
#frToday button{flex:1;min-width:0;position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:10px;border-radius:14px;background:var(--card);border:1px solid var(--line);color:var(--ink);font:inherit;text-align:left;cursor:pointer}
#frToday button i{font-style:normal;color:var(--fG);display:flex}
.frPx{font-style:normal;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;line-height:1}
.frPx .pxi{width:26px!important;height:26px!important;display:inline-block;font-size:0!important}
.frPx .frEmo{font-size:21px}
#frToday button b{font-size:13px;white-space:nowrap}
#frToday button small{font-size:11px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
#frToday button.dot:after{content:'';position:absolute;top:8px;right:8px;width:8px;height:8px;border-radius:50%;background:var(--fA)}
#frTopR{display:none;position:absolute;top:10px;right:12px;z-index:5;gap:8px}
#frTopR button{width:46px;height:46px;border-radius:14px;background:var(--card);border:1px solid var(--line);color:var(--ink);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer}
#frTopR button.g{color:var(--fG)}
#frTopR button.dot:after{content:'';position:absolute;top:8px;right:8px;width:8px;height:8px;border-radius:50%;background:var(--fA)}
#frMode{display:none}
#frTopR button .l{display:none}#frTopR button.dk{display:none}
html body.desk[data-front] #title #tSup,html body.desk[data-front] #title #tFb,html body.desk[data-front] #title #tEv,html body.desk[data-front] #title #tSp,html body.desk[data-front] #title #tCos{display:none!important}
html body.desk[data-front] #frTopR{display:flex;top:16px;right:28px}
html body.desk[data-front] .tsP.l{top:76px!important;max-height:calc(100vh - 92px)!important}
html body.desk[data-front] #frTopR button{width:auto;padding:0 16px;gap:8px;font:inherit;font-size:15px}
html body.desk[data-front] #frTopR button .l,html body.desk[data-front] #frTopR button.dk{display:flex}
${M} #frCont{display:flex}${M} #frToday{display:flex}${M} #frTopR{display:flex}
${M} #title #tSup,${M} #title #tFb,${M} #title #tEv,${M} #title #tSp,${M} #title #tCos{display:none!important}
${M} #title .kEnt,${M} #title #tGrid,${M} #title #tSea{display:none!important}
${M} #title #syncSt.frOk{display:none!important}
${M} #tDock #tCont{display:none!important}
${M} #tDock .row{gap:8px}
${M} #tDock #frMode{display:flex;flex:none;flex-direction:column;justify-content:center;align-items:flex-start;padding:0 14px;border-radius:14px;border:1px solid var(--line);background:var(--w);color:var(--ink);font:inherit;line-height:1.2;cursor:pointer}
${M} #tDock #frMode small{font-size:11px;color:var(--mut)}${M} #tDock #frMode span{display:flex;align-items:center;gap:3px;font-size:14px}
${M} #tDock #tGo{flex:1}
${M} #tDock .nav button.frHide{display:none!important}
#tDock .nav #frHome{display:none!important;flex-direction:column;align-items:center}
${M} #mask.on.frSheet{padding:0!important;align-items:stretch!important}
${M} #mask.on.frSheet #modal{width:100%!important;max-width:none!important;min-height:100%!important;max-height:none!important;margin:0!important;border-radius:0!important;border-left:0!important;border-right:0!important;padding-top:max(14px,env(safe-area-inset-top))!important}
${B} #mask.on #modal h3{font-family:var(--fD)}
`;
 s+=`
/* จอคอมแบบ B */
#frRail{display:none}
html body.frDesk #frRail{display:flex;position:fixed;left:14px;top:50%;transform:translateY(-50%);z-index:30;flex-direction:column;gap:2px;width:78px;padding:8px 4px;border-radius:24px;background:var(--card);border:1px solid color-mix(in srgb,var(--pink) 50%,transparent);box-shadow:0 10px 30px rgba(0,0,0,.45)}
html body.frDesk #frRail button{display:flex!important;flex-direction:column;align-items:center;gap:3px;padding:9px 2px;border:0;border-radius:16px;background:transparent;color:var(--ink);font:inherit;font-size:11.5px;line-height:1.2;text-align:center;white-space:normal;cursor:pointer}
html body.frDesk #frRail button:hover{background:var(--w)}
html body.frDesk #frRail button .pxi,html body.frDesk #frRail button i{font-size:22px}
html body.frDesk #tDock,html body.desk.dkTD.frDesk #tDock,html body.desk.dkTD.frDesk #wPick #tDock{display:none!important}
html body.frDesk .tsP.l{left:104px!important;width:calc(clamp(250px,19vw,320px) - 70px)!important}
html body.frDesk #frTopR button[aria-label="เมนู"]{display:none!important}
#frReady{display:none}
html body.frDesk #frReady{display:flex;flex-direction:column;gap:10px;padding:14px!important;border:1px solid color-mix(in srgb,var(--pink) 60%,transparent)!important}
#frReady .frRh{display:flex;flex-direction:column;gap:2px}#frReady .frRh b{color:var(--pink);font-size:16px}#frReady .frRh small{color:var(--mut);font-size:12px}
#frReady .frRp{pointer-events:none;position:relative;height:150px;border-radius:14px;overflow:hidden;background:var(--bg,#222);border:1px solid var(--bd,var(--line))}
#frReady .frRp .frPb{position:absolute;right:-14px;bottom:-18px;font-size:120px;opacity:.28;line-height:1}
#frReady .frRp .frPi{position:absolute;left:12px;top:10px;font-size:30px;line-height:1}
#frReady .frRp .frPt{position:absolute;left:12px;right:12px;bottom:10px;display:flex;flex-direction:column;gap:2px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7)}
#frReady .frRp .frPt b{font-size:20px}#frReady .frRp .frPt small{font-size:12px;opacity:.9;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#frReady .frRp .wc{width:100%!important;min-height:0!important;height:150px!important;margin:0!important;transform:none!important}
#frReady .frRb{display:flex;flex-direction:column;gap:8px}
#frReady .frRb #tGo{width:100%!important;min-height:60px;margin:0!important;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border:0!important;border-radius:14px!important;background:var(--pink)!important;background-image:linear-gradient(180deg,color-mix(in srgb,var(--pink) 80%,#fff),var(--pink))!important;color:var(--bg)!important;font:inherit;font-size:20px;font-weight:700;cursor:pointer;box-shadow:0 4px 0 color-mix(in srgb,var(--pink) 55%,#000)!important}
#frReady .frRb #tGo small{font-size:12px;font-weight:400;color:var(--bg)!important;opacity:.85}
#frReady .frRb #tCont{width:100%!important;margin:0!important;display:flex;flex-direction:column;align-items:flex-start;gap:1px;padding:9px 14px;border-radius:12px!important;border:1px solid var(--line)!important;background:var(--w)!important;color:var(--ink)!important;font:inherit;cursor:pointer;text-align:left}
#frReady .frRb #tCont b{color:var(--pink);font-size:14px}#frReady .frRb #tCont small{color:var(--mut);font-size:12px}
`;
 const st=document.createElement('style');st.id='frCss';st.textContent=s;document.head.appendChild(st);
}
let fontsOn=0;
function fonts(){if(fontsOn)return;fontsOn=1;try{if(document.querySelector('link[href*="Chakra+Petch"]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Charm:wght@700&family=Trirong:wght@600;700&family=Chakra+Petch:wght@600;700&family=Mitr:wght@500;600&family=IBM+Plex+Sans+Thai:wght@500;600;700&display=swap';document.head.appendChild(l)}catch(e){}}
// ---------- build ----------
const txt=e=>e?(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim():'';
function build(T0){
 if(!$('frTint')){const cv=$('tbg2');const d=document.createElement('div');d.id='frTint';if(cv&&cv.parentNode)cv.insertAdjacentElement('afterend',d);else T0.prepend(d)}
 if(!$('frTopR')){const d=document.createElement('div');d.id='frTopR';d.innerHTML=`<button type="button" class="g" aria-label="ร้านค้า"><i class="frPx">${px('#tSup','💎')}</i><span class="l">ร้านค้า</span></button><button type="button" class="dk" aria-label="คัมภีร์ฤดูกาล"><i class="frPx">${px('#tSp,#tSea','📖')}</i><span class="l">คัมภีร์</span></button><button type="button" class="dk" aria-label="ชุมชน"><i class="frPx">${px('#tFb','💬')}</i><span class="l">ชุมชน</span></button><button type="button" aria-label="เมนู">${ic(I.menu)}<span class="l">เมนู</span></button>`;
  const bs=d.children;bs[0].onclick=()=>{try{openStore()}catch(e){}};bs[1].onclick=()=>{const x=$('tSp')||$('tSea');x&&x.click()};bs[2].onclick=()=>{const x=$('tFb');if(x)x.click();else try{openFbGroup()}catch(e){}};bs[3].onclick=()=>{try{openTitleMenu()}catch(e){}};T0.appendChild(d)}
 const wp0=$('wPick'),wp=wp0&&(wp0.closest('.box.opts')||wp0);
 if(wp&&!$('frCont')){const b=document.createElement('button');b.type='button';b.id='frCont';b.innerHTML=`<span class="ic">${ic(I.play,20)}</span><span class="tx"><small>เล่นต่อ</small><b></b><small class="s2"></small></span><span class="ch">${ic(I.chev,20)}</span>`;b.onclick=()=>{const c=$('tCont');if(c)c.click()};wp.insertAdjacentElement('beforebegin',b)}
 if(wp&&!$('frToday')){const d=document.createElement('div');d.id='frToday';wp.insertAdjacentElement('beforebegin',d)}
 const dk=$('tDock');
 if(dk){const row=dk.querySelector('.row'),go=$('tGo');
  if(row&&go&&!$('frMode')){const m=document.createElement('button');m.type='button';m.id='frMode';m.innerHTML='<small>โหมด</small><span><em style="font-style:normal">ปกติ</em>'+ic(I.down,14)+'</span>';m.onclick=()=>{const c=document.querySelector('#wPick .wpC');if(c){c.scrollIntoView({behavior:'smooth',block:'center'})}};row.insertBefore(m,go)}
  const nv=dk.querySelector('.nav');
  // ปุ่ม "หน้าแรก" เอาออกแล้ว (ผู้ใช้สั่ง) · ยังซ่อนปุ่มที่ซ้ำกับการ์ดอื่นเหมือนเดิม
  if(nv&&!nv.dataset.frH){nv.dataset.frH=1;try{const h=$('frHome');h&&h.remove()}catch(e){}
   nv.querySelectorAll('button').forEach(x=>{const o=x.getAttribute('onclick')||'';if(/openOnline\('arena'\)|openTitleMenu\(\)/.test(o))x.classList.add('frHide')})}
 }
}
let lastC='',lastT='';
function update(){
 // เล่นต่อ
 const c=$('tCont'),fc=$('frCont');
 if(fc){const vis=c&&c.style.display!=='none'&&txt(c);fc.style.visibility=vis?'':'hidden';fc.style.position=vis?'':'absolute';
  if(vis){const s=txt(c.querySelector('small'));const h=s;if(h!==lastC){lastC=h;const p=s.split('·');fc.querySelector('b').textContent=(p[0]||'').trim();fc.querySelector('.s2').textContent=(p.slice(1).join('·').trim())+(curW&&T[curW]?' · '+(wName(curW)):'')}}}
 // วันนี้
 const td=$('frToday');
 if(td){const ev=$('tEv'),aq=document.querySelector('#tGrid .gAq'),sp=$('tSp'),sea=$('tSea'),fb=$('tFb');
  const items=[];
  if(ev&&txt(ev)){const t0=txt(ev),m=t0.match(/อีก\s*\d+\s*(วัน|ชม\.?|ชั่วโมง)/);const nm=(m?t0.replace(m[0],''):t0).trim()||'อีเวนต์';items.push(['ev',px('#tEv','🏮'),nm.length>12?'อีเวนต์':nm,m?m[0]:'กำลังจัด',true])}
  if(aq)items.push(['aq',px('#tGrid .gAq','📜'),'ภารกิจ',(txt(aq).match(/วันนี้\s*[\d/ ]+/)||[''])[0]||'วันนี้',false]);
  if(sp||sea)items.push(['sp',px('#tSp,#tSea','📖'),'คัมภีร์',(txt(sea).match(/ขั้น\s*[\d/ ]+/)||[''])[0]||'ฤดูกาล',false]);
  if(fb)items.push(['fb',px('#tFb','💬'),'ชุมชน','กลุ่มผู้เล่น',false]);
  const key=items.map(x=>[x[0],x[2],x[3],x[4],/pxi/.test(x[1])].join('|')).join(';');
  if(key!==lastT){lastT=key;td.innerHTML=items.map(x=>`<button type="button" data-k="${x[0]}" class="${x[4]?'dot':''}"><i class="frPx">${x[1]}</i><b>${x[2]}</b><small>${String(x[3]).replace(/[<>&]/g,'')}</small></button>`).join('');
   td.querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=b.dataset.k;try{if(k==='ev')$('tEv').click();else if(k==='aq')openAQ();else if(k==='sp'){const s=$('tSp')||$('tSea');s&&s.click()}else if(k==='fb')$('tFb').click()}catch(e){console.error(e)}})}
 }
 // ซิงค์สำเร็จ → ซ่อน (คำเตือนยังโชว์)
 const ss=$('syncSt');if(ss)ss.classList.toggle('frOk',!/ยังไม่|⚠|ไม่ได้|ล้มเหลว/.test(txt(ss))&&!ss.querySelector('.pi15'));
 // โหมดในแถบล่าง
 const fm=$('frMode'),go=$('tGo');if(fm&&go){const s=txt(go.querySelector('small'));const md=(s.split('·')[1]||'ปกติ').trim();const em=fm.querySelector('em');if(em&&em.textContent!==md)em.textContent=md}
}
const WN={murim:'ยุทธภพ',xian:'โลกเทพเซียน',mw:'ยุคปัจจุบัน',soul:'จิตวิญญาณยุทธ์',loop:'ผู้ย้อนกาล',beast:'เกิดเป็นสัตว์',sky:'ทะลุฟ้าดารา',fog:'นครม่านหมอก'};
const wName=k=>WN[k]||'';
// ---------- จอคอมแบบ B: แคปซูลแนวตั้งชิดซ้าย + แผง "พร้อมเกิด" ขวา (ทุกธีม) ----------
let dkHome=null;
function deskB(on){
 const b=document.body,go=$('tGo'),ct=$('tCont'),pr=document.querySelector('.tsP.r'),nv=document.querySelector('#tDock .nav');
 const ok=on&&b.classList.contains('desk')&&go&&pr&&nv;
 b.classList.toggle('frDesk',!!ok);
 if(!ok){ // คืนปุ่มกลับแถบล่าง
  if(dkHome){const row=dkHome;if(ct&&ct.parentNode!==row)row.insertBefore(ct,row.firstChild);if(go&&go.parentNode!==row)row.appendChild(go);dkHome=null}
  return}
 if(!$('frRail')){const r=document.createElement('nav');r.id='frRail';r.setAttribute('aria-label','เมนูหลัก');
  nv.querySelectorAll('button').forEach(x=>{if(x.id==='frHome')return;const c=x.cloneNode(true);c.removeAttribute('id');c.classList.remove('frHide','frOn');r.appendChild(c)});
  document.body.appendChild(r)}
 let rd=$('frReady');
 if(!rd){rd=document.createElement('div');rd.id='frReady';rd.className='tsC';rd.innerHTML='<div class="frRh"><b>พร้อมเกิด</b><small class="frRm"></small></div><div class="frRp"></div><div class="frRb"></div>';pr.insertBefore(rd,pr.firstChild)}
 if(!dkHome)dkHome=go.parentNode;
 const bb=rd.querySelector('.frRb');if(go.parentNode!==bb)bb.appendChild(go);if(ct&&ct.parentNode!==bb)bb.appendChild(ct);
 // ภาพโลกที่เลือก
 const wc=document.querySelector('#wPick .wc.on'),pv=rd.querySelector('.frRp');
 if(wc&&pv.dataset.k!==wc.dataset.k){pv.dataset.k=wc.dataset.k;pv.setAttribute('style',wc.getAttribute('style')||'');const q=x=>wc.querySelector(x);
  pv.innerHTML='';const bg=q('.bg'),icn=q('.ic');if(bg){const c=bg.cloneNode(true);c.className='frPb';pv.appendChild(c)}if(icn){const c=icn.cloneNode(true);c.className='frPi';pv.appendChild(c)}
  const tx=document.createElement('div');tx.className='frPt';tx.innerHTML=`<b></b><small></small>`;tx.querySelector('b').textContent=txt(q('b'));tx.querySelector('small').textContent=txt(q('small'));pv.appendChild(tx)}
 const md=rd.querySelector('.frRm'),s2=txt(go.querySelector('small'));if(md&&md.textContent!==s2)md.textContent=s2;
}
let curW=null;
function tick(){
 try{
  const b=document.body,T0=$('title');if(!b||!T0)return;
  const on=T0.classList.contains('on')&&b.classList.contains('royal')&&!LSg('murim_frontOff',0);
  if(on){build(T0);const c=document.querySelector('#wPick .wc.on');const k=c&&T[c.dataset.k]?c.dataset.k:'murim';if(k!==curW){curW=k;fonts()}b.dataset.front=k;update()}
  else if(b.dataset.front){delete b.dataset.front;curW=null}
  try{deskB(T0.classList.contains('on')&&!LSg('murim_frontOff',0))}catch(e){console.error('deskB',e)}
  // หน้าย่อยเต็มจอ (มือถือ · เปิดจากหน้าแรก)
  const mk=$('mask'),md=$('modal');if(mk&&md){const k0=md.dataset.k||'';const sh=on&&mk.classList.contains('on')&&(SHEET.includes(k0)||(!k0&&/^\W*ร้านค้า/.test(txt(md).replace(/^✕\s*/,'').replace(/^\S+\s*/,'')+'')||(!k0&&/ร้านค้า\s*เล่นฟรี/.test(txt(md).slice(0,60)))));mk.classList.toggle('frSheet',sh)}
 }catch(e){console.error('front',e)}
}
css();tick();setInterval(tick,400);
try{document.addEventListener('click',e=>{if(e.target&&e.target.closest&&e.target.closest('#wPick .wc'))setTimeout(tick,30)},true)}catch(e){}
window._front={tick,T};
})();
