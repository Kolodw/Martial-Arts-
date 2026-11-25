// ============================================================
// 💎 store.js — ร้านค้าหลักโฉมใหม่ (ตามร่าง StoreDesk / StoreMob)
//  - จอคอม (กว้าง ≥1000): หน้าต่างกว้าง 3 คอลัมน์ · แถบหมวดแนวตั้งซ้าย (มีคำอธิบายใต้ชื่อ) · เนื้อหากลาง · ขวา = ของฟรีวันนี้ + การ์ดสมาชิก
//  - มือถือ: ยอดคงเหลือมีไอคอน · หมวดเป็นชิปแถวเดียว · แก้ปุ่มล้นกรอบ
//  ไม่แตะตรรกะร้านเดิม: ปรับหน้าตาหลัง openStore()/modal() วาด .stWrap เสร็จ (ห่อทั้งสองตัว)
// ============================================================
try{(()=>{
const css=document.createElement('style');css.id='stNewCss';css.textContent=`
#modal:has(>.stWrap){background:#0e0b14!important;border-color:#6a5420!important}
#modal .stWrap{background:radial-gradient(100% 55% at 50% 0%,#2a1c10,#0e0b14 62%);color:#f6efe2}
#modal.mbHas>.stWrap{padding-top:44px}
#modal .stWrap .stTop{display:flex;flex-direction:column;gap:0}
#modal .stWrap .stHd h3{font-size:22px}
#modal .stWrap .stBal{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
#modal .stWrap .stBal>div.stChip{display:flex;align-items:center;gap:7px;padding:7px 8px;border-radius:12px;background:#181320;border:1px solid #3a2e48;text-align:left;min-width:0}
#modal .stWrap .stChip>i{flex:0 0 26px;height:26px;border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:15px;background:color-mix(in srgb,var(--c,#ffd36b) 18%,transparent)}
#modal .stWrap .stChip>span.t{display:flex;flex-direction:column;line-height:1.15;min-width:0}
#modal .stWrap .stChip b{font-size:15px;color:#f6efe2;text-align:left}
#modal .stWrap .stChip small{font-size:10px;color:#b4a8c0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#modal .stWrap .stTabs .bxPill{display:none!important}
#modal .stWrap .stTabs button{position:relative}
#modal .stWrap .stTabs button .stTx{display:flex;flex-direction:column;align-items:inherit;line-height:1.15}
#modal .stWrap .stTabs button .stTx small{display:none;font-size:11px;font-weight:400;color:#b4a8c0}
#modal .stWrap .stTabs button .stDot{position:absolute;top:5px;right:6px;width:8px;height:8px;border-radius:50%;background:#ff7aa8;box-shadow:0 0 6px #ff7aa8}
#modal .stWrap .stBody .sh2>*{box-sizing:border-box;max-width:100%}
#modal .stWrap .pk>button{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;border-radius:18px!important;background:#181320!important;border:1px solid #3a2e48!important;padding:22px 8px 14px!important;color:#f6efe2!important}
#modal .stWrap .pk>button>b{font-size:38px!important;line-height:1!important;color:#f6efe2!important}
#modal .stWrap .pk>button>.p{display:inline-block;margin:8px 0 3px;padding:7px 16px;border-radius:12px;background:#221a2e;color:#f6efe2!important;font-weight:700;font-size:15px}
#modal .stWrap .pk>button.best1{background:linear-gradient(180deg,#3a2a10,#181320)!important;border:2px solid #ffd36b!important;box-shadow:0 0 28px #ffd36b33!important}
#modal .stWrap .pk>button.best1>.p{background:#ffd36b;color:#0e0b14!important}
#modal .stWrap .pk>button .rb{background:#ffd36b!important;color:#0e0b14!important;font-weight:700}
#modal .stWrap .sh2-sum>div{background:#181320!important;border:1px solid #3a2e48!important;border-radius:14px!important}
#modal .stWrap .rrFree{display:flex!important;flex-wrap:wrap;align-items:center;gap:4px 8px}
#modal .stWrap .rrFree>.tag2{flex:1 1 160px;min-width:0}
#modal .stWrap .rrFree>.gbtn{margin-left:auto!important;position:static!important;float:none!important;flex:0 0 auto}
#modal .stWrap .stCard{background:#181320;border-color:#3a2e48}
/* ---------- มือถือ: หมวดเป็นชิป ---------- */
#modal .stWrap:not(.stD) .stTabs button{flex-direction:row;gap:5px;min-width:0;padding:7px 12px;border-radius:999px;background:#181320;border-color:#3a2e48;font-size:12.5px}
#modal .stWrap:not(.stD) .stTabs button i{font-size:16px}
#modal .stWrap:not(.stD) .stTabs button.on{background:#ffd36b;color:#0e0b14;border-color:#ffd36b;box-shadow:0 3px 14px #ffd36b44}
#modal .stWrap:not(.stD) .stTabs button .stDot{top:2px;right:2px}
@media (max-width:420px){#modal .stWrap .stChip>i{display:none}#modal .stWrap .stBal>div.stChip{justify-content:center;text-align:center}#modal .stWrap .stChip>span.t{align-items:center}}
/* ---------- จอคอม: 3 คอลัมน์ ---------- */
html body #mask #modal.stDk.stDk,html body.desk #mask #modal.stDk.dkM.dkM{display:block!important}
#modal .stWrap.stD{display:grid;grid-template-columns:230px minmax(0,1fr) 290px;grid-template-rows:auto minmax(0,1fr);gap:18px 22px;padding:20px 28px 22px;height:min(880px,92vh);box-sizing:border-box;border-radius:20px;font-size:14px}
#modal.mbHas>.stWrap.stD{padding-top:46px}
#modal .stD>.xbtn{top:18px;right:20px}
#modal .stD .stTop{grid-column:1/-1;flex-direction:row;align-items:center;gap:16px;padding-bottom:14px;border-bottom:1px solid #3a2e48;margin-right:52px}
#modal .stD .stTop .stHd{flex:1;margin:0;min-width:0}
#modal .stD .stTop .stBal{display:flex;gap:8px;margin:0}
#modal .stD .stBal>div.stChip{padding:8px 14px;min-width:96px}
#modal .stD .stChip b{font-size:16px}#modal .stD .stChip small{font-size:11px}
#modal .stD .stTabs{grid-column:1;grid-row:2;flex-direction:column;overflow:auto;padding:0;gap:4px;-webkit-mask:none;mask:none;align-self:start;max-height:100%}
#modal .stD .stTabs button{flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;width:100%;min-width:0;padding:10px 12px;border-radius:12px;background:transparent;border:1px solid transparent;color:#f6efe2;text-align:left;font-size:14px;box-shadow:none}
#modal .stD .stTabs button i{flex:0 0 34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#221a2e;font-size:18px}
#modal .stD .stTabs button .stTx{align-items:flex-start}
#modal .stD .stTabs button .stTx small{display:block}
#modal .stD .stTabs button:hover{background:#181320}
#modal .stD .stTabs button.on{background:#221a2e;border-color:#ffd36b66;color:#ffd36b;box-shadow:none}
#modal .stD .stTabs button.on i{background:#ffd36b}
#modal .stD .stTabs button .stDot{top:50%;right:12px;margin-top:-4px}
#modal .stD .stBody{grid-column:2;grid-row:2;overflow:auto;min-height:0;padding:0 6px 4px 0;scrollbar-width:thin}
#modal .stD .stSide{grid-column:3;grid-row:2;overflow:auto;min-height:0;display:flex;flex-direction:column;gap:14px;scrollbar-width:thin}
#modal .stSide .sdBox{padding:14px;border-radius:16px;background:#181320;border:1px solid #3a2e48;display:flex;flex-direction:column;gap:6px}
#modal .stSide .sdBox>b.h{color:#ffd36b;font-size:15px}
#modal .stSide .sdRow{display:flex;align-items:center;gap:10px;padding:8px 0 2px;border-top:1px solid #3a2e48}
#modal .stSide .sdRow>i{flex:0 0 32px;height:32px;border-radius:10px;display:grid;place-items:center;font-style:normal;font-size:16px;background:var(--c)}
#modal .stSide .sdRow>span{flex:1;display:flex;flex-direction:column;line-height:1.2;min-width:0}
#modal .stSide .sdRow>span b{font-size:13px}#modal .stSide .sdRow>span small{font-size:11px;color:#b4a8c0}
#modal .stSide .sdRow>button{flex:0 0 auto;padding:5px 12px;border-radius:9px;font:inherit;font-size:12px;font-weight:700;border:0;background:#221a2e;color:#f6efe2;cursor:pointer}
#modal .stSide .sdRow>button.hot{background:#ff7aa8;color:#fff}
#modal .stSide .sdVip{background:linear-gradient(160deg,#3a2a10,#181320 70%);border-color:#ffd36b66}
#modal .stSide .sdVip>span{display:flex;gap:8px;font-size:13px}#modal .stSide .sdVip>span>em{font-style:normal;color:#5fd38d}
#modal .stSide .sdVip>button{margin-top:6px;height:40px;border-radius:12px;border:0;background:#ffd36b;color:#0e0b14;font:inherit;font-weight:700;cursor:pointer}
#modal .stD .stBody .pk>button>b{font-size:44px!important}
`;document.head.appendChild(css);

const SUB={r:'สุ่มชีวิตใหม่',m:'39 / 99 / 599 บาท',l:'ล็อกสิ่งที่อยากได้',free:'รับได้ทุกวัน',cos:'กรอบ ธีม ฉายา',sup:'ช่วยผู้พัฒนา'};
const CC=['#ffd36b','#7ee0ff','#c9b4ff','#ff7aa8'];
const sv=(c,d)=>`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const GEM='<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 6 3-6M12 21l-3-12M12 21l3-12"/>';
const SV=[sv('#ffd36b',GEM),sv('#7ee0ff',GEM),sv('#c9b4ff','<circle cx="12" cy="12" r="9"/><path d="M12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9"/><circle cx="12" cy="7.5" r="1"/><circle cx="12" cy="16.5" r="1"/>'),sv('#ff7aa8','<path d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5L12 16.6 7.1 19.2l.9-5.5-4-3.9 5.5-.8z"/>')];
const vipT=()=>{try{const v=LS.get('murim_vip',null);return !v?0:v.u?3:(v.e2||0)>Date.now()?2:(v.e1||0)>Date.now()?1:0}catch(e){return 0}};
const dq=()=>{try{const d=LS.get('murim_aq',{})||{};return((d.d||{}).q||[]).filter(q=>q.ok).length}catch(e){return 0}};
const isDk=()=>innerWidth>=1000;
function side(fr){const t=vipT(),n=dq();
 const row=(ic,c,b,s,go,on,hot)=>`<div class="sdRow"><i style="--c:${c}26">${ic}</i><span><b>${b}</b><small>${s}</small></span><button class="${hot?'hot':''}" onclick="${on}">${go}</button></div>`;
 const vip=t?`<div class="sdBox sdVip"><b class="h">👑 ${['','ผู้สนับสนุน','ผู้สนับสนุนพิเศษ','ผู้ก่อตั้ง'][t]}</b><span>ขอบคุณที่ช่วยให้เกมได้ไปต่อ 🙏</span><button onclick="openStore('m')">ดูสิทธิ์ของฉัน</button></div>`
  :`<div class="sdBox sdVip"><b class="h">👑 สมาชิก 39 บาท / 30 วัน</b><span><em>✓</em>สุ่มชีวิตใหม่ 30 ครั้ง/ชีวิต</span><span><em>✓</em>ตั๋วล็อกชะตา 2 ใบ/เดือน</span><span><em>✓</em>กรอบอวตาร + ตราประทับ</span><button onclick="openStore('m')">ดูสิทธิ์ทั้งหมด</button></div>`;
 return`<aside class="stSide">${fr?'':`<div class="sdBox"><b class="h">🎁 ของฟรีวันนี้</b>
  ${row('🎁','#ff7aa8','ของล็อกอินวันนี้','กดรับวันละครั้ง','รับ',"closeM();lgOpen()",1)}
  ${row('📜','#7ee0ff',`ภารกิจรายวัน ${n}/3`,n>=3?'ครบแล้ว ได้ตั๋วธรรมดา':'ครบได้ตั๋วธรรมดา','ไป',"openAQ('d')")}
  ${row('🐉','#ff9a5a','บอสโลก','ทุกคนได้ตั๋วธรรมดา','ไป',"openAQ('wb')")}
  ${row('⚡','#ffd36b','ประกาศิตฟ้า','ชิงตั๋วทอง 3 ใบ','ไป',"openAQ('hq')")}</div>`}${vip}</aside>`}
function enhance(){try{const m=$('modal');if(!m)return;const w=m.querySelector(':scope>.stWrap');
 if(!w){if(m.classList.contains('stDk')){m.classList.remove('stDk');['width','max-width','padding','max-height','overflow'].forEach(p=>m.style.removeProperty(p))}return}
 if(!w.dataset.en){w.dataset.en=1;
  const hd=w.querySelector(':scope>.stHd'),bl=w.querySelector(':scope>.stBal');if(hd&&bl&&!w.querySelector(':scope>.stTop')){const tp=document.createElement('div');tp.className='stTop';hd.before(tp);tp.append(hd,bl)}
  if(bl)[...bl.children].forEach((d,i)=>{if(d.classList.contains('stChip'))return;const b=d.querySelector(':scope>b'),s=d.querySelector(':scope>span');if(!b||!s)return;const ic=s.querySelector('.pxi');d.classList.add('stChip');d.style.setProperty('--c',CC[i]||CC[0]);
   const I=document.createElement('i');I.innerHTML=SV[i]||SV[0];const lab=(ic?s.textContent.replace(ic.textContent,''):s.textContent).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu,'').trim();const T=document.createElement('span');T.className='t';const sm=document.createElement('small');sm.textContent=lab;s.remove();T.append(b,sm);d.innerHTML='';d.append(I,T)});
  w.querySelectorAll(':scope>.stTabs>button').forEach(b=>{const k=((b.getAttribute('onclick')||'').match(/openStore\('(\w+)'\)/)||[])[1];if(!k||b.querySelector('.stTx'))return;const i=b.querySelector(':scope>i');const tx=[...b.childNodes].filter(n=>n!==i).map(n=>n.textContent).join('').trim();
   [...b.childNodes].forEach(n=>{if(n!==i)n.remove()});b.insertAdjacentHTML('beforeend',`<span class="stTx"><b>${esc(tx)}</b><small>${k==='m'&&vipT()?['','ผู้สนับสนุน','พิเศษ','ผู้ก่อตั้ง'][vipT()]+' ✓':SUB[k]||''}</small></span>${k==='free'&&dq()<3?'<span class="stDot"></span>':''}`)})}
 const dk=isDk();w.classList.toggle('stD',dk);m.classList.toggle('stDk',dk);
 if(dk){m.style.setProperty('width','min(1280px,96vw)','important');m.style.setProperty('max-width','96vw','important');m.style.setProperty('padding','0','important');m.style.setProperty('max-height','none','important');m.style.setProperty('overflow','visible','important');if(!w.querySelector(':scope>.stSide'))w.insertAdjacentHTML('beforeend',side(!!w.querySelector(":scope>.stTabs>button.on[onclick*=\"'free'\"]")))}
 else{['width','max-width','padding','max-height','overflow'].forEach(p=>m.style.removeProperty(p));const sd=w.querySelector(':scope>.stSide');if(sd)sd.remove()}
}catch(e){console.error('store enhance',e)}}
window._stEnh=enhance;
{const _m=modal;const nw=function(){const r=_m.apply(this,arguments);try{enhance();setTimeout(enhance,0)}catch(e){}return r};modal=nw;try{window.modal=nw}catch(e){}}
{const _o=window.openStore;if(typeof _o==='function')window.openStore=function(){const r=_o.apply(this,arguments);try{enhance();setTimeout(enhance,30);setTimeout(enhance,300)}catch(e){}return r}}
let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(enhance,150)});
try{const m=$('modal');if(m)new MutationObserver(()=>{const w=m.querySelector(':scope>.stWrap');if((w&&!w.dataset.en)||(!w&&m.classList.contains('stDk')))enhance()}).observe(m,{childList:true})}catch(e){}
try{window.wReady&&window.wReady('store')}catch(e){}
})()}catch(e){console.error('store block',e)}
