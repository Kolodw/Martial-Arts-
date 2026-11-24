// 🎮 มินิเกมยุคใหม่ — ครอบมินิเกมทั้งหมด (225 แบบใน mg2 + ฝึกพื้นฐาน + พงศาวดาร + โลกหมอก/ทะลุฟ้า)
// 1) คอม: เล่นด้วยคีย์บอร์ดได้ทุกเกม (Space/Enter = ปุ่มหลัก · กดค้าง = ชาร์จ · ←→/A D = ซ้ายขวา · 1–9 = ตัวเลือก) + ป้ายปุ่มบนจอ
// 2) มือถือ/คอม: เกม "แตะรัว" → กดค้างไว้ได้ (ยิงจังหวะให้เอง ~7 ครั้ง/วิ) ไม่เจ็บนิ้ว
// 3) ปรับยากเอง: พลาดเกมเดิม 2 ครั้ง → ง่ายลง · ได้ 3 ดาว 3 ครั้งติด → ชวนลองโหมดท้าทายในหอฝึก
// 4) ดาว ⭐1–3 + สถิติดีที่สุดแยกคอม/มือถือ · สั่นตอนได้ 3 ดาว (มือถือ)
// 5) โหมดช้าลง 30% สำหรับคนที่ต้องการ (LS murim_mgSlow)
// 6) 🏮 หอฝึกมินิเกม: เล่นซ้ำทุกเกมที่เคยเจอ ไม่กระทบชีวิต · โหมดท้าทาย · ฉายาตามจำนวน 3 ดาว
try{(()=>{
const LSG=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSS=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const $$=id=>document.getElementById(id);
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
const PC=()=>matchMedia('(hover:hover) and (pointer:fine)').matches;
const DEV=()=>PC()?'pc':'mo';
const MGK=/^(mg2|mg|chmg|fogmg|skymg)$/;
const mgOpen=()=>{const m=$$('modal'),k=$$('mask');return !!(m&&k&&k.classList.contains('on')&&MGK.test(m.dataset.k||''))};
const G=()=>window._mg2G||{};

// ───────── สถิติ ─────────
const REC=()=>LSG('murim_mgRec',{})||{};
const AD=()=>LSG('murim_mgAd',{})||{};
const stars=sc=>sc>=.95?3:sc>=.75?2:sc>=.5?1:0;
function record(id,sc,ch){const R=REC(),d=DEV(),k=ch?d+'C':d;R[id]=R[id]||{};const prev=R[id][k]||0,nw=sc>prev+.001;if(nw)R[id][k]=+sc.toFixed(3);R[id].n=(R[id].n||0)+1;LSS('murim_mgRec',R);return{nw:nw&&prev>0,first:prev===0,prev}}
function adapt(id,sc){const A=AD(),a=A[id]||{f:0,p:0};if(sc<.5){a.f++;a.p=0}else{a.f=0;if(sc>=.95)a.p++;else a.p=0}A[id]=a;LSS('murim_mgAd',A);return a}
function threeCount(){const R=REC();return Object.values(R).filter(r=>stars(Math.max(r.pc||0,r.mo||0,r.pcC||0,r.moC||0))>=3).length}
const TITLES=[[10,'มือสามดาว'],[30,'จอมยุทธ์แห่งหอฝึก'],[60,'ปรมาจารย์มินิเกม'],[120,'ผู้ไร้พ่ายทุกสนาม']];

// ───────── ครอบ mg2Play ─────────
function wrapPlay(){const o0=window.mg2Play;if(typeof o0!=='function'||o0._m3)return;
 const w=function(id,o,cb){if(o&&o._m3w)return o0.call(this,id,o,cb);o=Object.assign({},o||{},{_m3w:1});const g=G()[id]||{};let note=[];
  try{
   if(LSG('murim_mgSlow',0)){o.ez=(o.ez||1)*1.3;o.t=Math.round((o.t||g.t||10)*1.3);note.push('🐢 ช้าลง 30%')}
   const a=AD()[id];if(!o._ch&&a&&a.f>=2){o.ez=(o.ez||1)*1.3;note.push('🤝 ง่ายลงให้ เพราะพลาดมา '+a.f+' ครั้ง')}
   if(o._ch){o.ez=(o.ez||1)*.78;note.push('🔥 โหมดท้าทาย')}
   const RW=/แตะรัว ?ๆ|กดรัว/g;if(o.sub)o.sub=String(o.sub).replace(RW,'กดค้างไว้');else if(g.how&&RW.test(g.how))o.sub=String(g.how).replace(/แตะรัว ?ๆ|กดรัว/g,'กดค้างไว้');
   if(note.length)o.tag=(o.tag?o.tag+' · ':'')+note.join(' · ');
   const seen=LSG('murim_mgSeen',{})||{};if(!seen[id]){seen[id]=1;LSS('murim_mgSeen',seen)}
  }catch(e){}
  const cb2=function(sc,skip){try{if(!skip&&typeof sc==='number'){const r=record(id,sc,o._ch),a=adapt(id,sc),st=stars(sc);
     const t3=threeCount();let tt='';TITLES.forEach(([n,nm])=>{const k='murim_mgT'+n;if(t3>=n&&!LSG(k,0)){LSS(k,1);tt=nm}});
     const msg=`${'⭐'.repeat(st)||'—'} ${g.n||''}${r.nw?' · สถิติใหม่!':r.first&&st?' · ครั้งแรก':''}${a.p>=3&&!o._ch?' · ลองโหมดท้าทายในหอฝึกดูไหม':''}`;
     if(typeof island==='function')island({key:'m3'+id,ic:st>=3?'🌟':'🎮',t:msg,kind:st>=2?'good':'info',ms:2600});
     if(st>=3&&!PC())try{navigator.vibrate&&navigator.vibrate([30,40,60])}catch(e){}
     if(tt){try{log(`🏅 ได้ฉายา <b>「${tt}」</b> · ได้ 3 ดาวในมินิเกม ${t3} แบบ`,'epic')}catch(e){}}}}catch(e){}
   if(typeof cb==='function')return cb.apply(this,arguments)};
  return o0.call(this,id,o,cb2)};
 Object.assign(w,o0);w._m3=1;window.mg2Play=w}

// ───────── คีย์บอร์ด (คอม) ─────────
const vis=el=>{if(!el)return false;const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(el).visibility!=='hidden'};
const SKIP=/ข้าม|ปิด|✕|ชะตาเล่น|ย่อ/;
function btns(){const m=$$('modal');if(!m)return[];const root=m.querySelector('#m2B')||m;return[...root.querySelectorAll('button')].filter(b=>vis(b)&&!b.disabled&&!b.classList.contains('xbtn')&&!SKIP.test(b.textContent))}
function holdBtn(){const m=$$('modal');return m&&[...m.querySelectorAll('#m2Hd,#mgHold,[data-m3hold]')].find(vis)}
function mashBtn(){const m=$$('modal');if(!m)return null;const B=[...m.querySelectorAll('button')].filter(b=>vis(b)&&!/^(m2Hd|mgHold)$/.test(b.id));
 const t=B.find(b=>/รัว/.test(b.textContent)||/chTap/.test(b.getAttribute('onpointerdown')||''));if(t)return t;
 const h=(m.querySelector('h3')||{}).textContent||'';const g=Object.values(G()).find(g=>g&&g.how&&/รัว/.test(g.how)&&g.n&&h.includes(g.n));
 return g?(B.find(b=>b.classList.contains('pbtn')&&b.closest('#m2B'))||null):null}
function lr(d){const m=$$('modal');if(!m)return null;const id=d<0?'#m2Lf':'#m2Rt';return m.querySelector(id)||[...m.querySelectorAll('button')].find(b=>vis(b)&&(d<0?/◀|⬅|←|ซ้าย/:/▶|➡|→|ขวา/).test(b.textContent))}
const fire=(el,type)=>{try{const r=el.getBoundingClientRect(),o={bubbles:true,cancelable:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2,pointerId:1,pointerType:'mouse',isPrimary:true,button:0};el.dispatchEvent(new PointerEvent(type,o));if(type==='pointerdown')el.dispatchEvent(new MouseEvent('mousedown',o));if(type==='pointerup')el.dispatchEvent(new MouseEvent('mouseup',o))}catch(e){}};
const click=el=>{try{fire(el,'pointerdown');fire(el,'pointerup');el.click()}catch(e){}};
let held=null;
document.addEventListener('keydown',e=>{if(!mgOpen())return;const t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName))return;const k=e.key;
 if(k===' '||k==='Enter'){const m=$$('modal');if(m&&m.querySelector('.m2Go'))return;
  const h=holdBtn();if(h){e.preventDefault();e.stopPropagation();if(!e.repeat&&!held){held=h;fire(h,'pointerdown')}return}
  const ms=mashBtn();if(ms){e.preventDefault();e.stopPropagation();fire(ms,'pointerdown');return}
  if(e.repeat)return;const B=btns();const p=B.find(b=>b.classList.contains('pbtn'))||B[0];if(p){e.preventDefault();e.stopPropagation();click(p)}return}
 if(/^(ArrowLeft|ArrowRight|a|d|A|D)$/.test(k)){const b=lr(/Left|a|A/.test(k)?-1:1);if(b){e.preventDefault();e.stopPropagation();fire(b,'pointerdown');fire(b,'pointerup');if(!b.onpointerdown)b.click()}return}
 if(/^[1-9]$/.test(k)&&!e.repeat){const B=btns();const b=B[+k-1];if(b){e.preventDefault();e.stopPropagation();click(b)}}},true);
document.addEventListener('keyup',e=>{if((e.key===' '||e.key==='Enter')&&held){const h=held;held=null;fire(h,'pointerup');e.preventDefault()}},true);

// ───────── แตะรัว → กดค้างได้ ─────────
let rep=null;
document.addEventListener('pointerdown',e=>{if(!e.isTrusted||!mgOpen())return;const b=e.target.closest&&e.target.closest('button');if(!b||b!==mashBtn())return;
 clearInterval(rep);const go=()=>{if(!mgOpen()||!vis(b)){clearInterval(rep);rep=null;return}fire(b,'pointerdown')};rep=setInterval(go,140)},true);
['pointerup','pointercancel','pointerleave','blur'].forEach(t=>(t==='blur'?window:document).addEventListener(t,e=>{if(rep&&(t==='blur'||e.isTrusted)){clearInterval(rep);rep=null}},true));

// ───────── ป้ายปุ่มคีย์บอร์ด ─────────
function hints(){if(!PC()||!mgOpen())return;try{const m=$$('modal');m.querySelectorAll('[data-m3k]').forEach(x=>x.removeAttribute('data-m3k'));
 const h=holdBtn();if(h){h.setAttribute('data-m3k','ค้าง Space');}
 else{const ms=mashBtn();if(ms)ms.setAttribute('data-m3k','ค้าง Space');else{const B=btns();const p=B.find(b=>b.classList.contains('pbtn'))||null;if(p&&B.length<=2)p.setAttribute('data-m3k','Space');else B.slice(0,9).forEach((b,i)=>b.setAttribute('data-m3k',String(i+1)))}}
 const l=lr(-1),r=lr(1);if(l)l.setAttribute('data-m3k','←');if(r)r.setAttribute('data-m3k','→')}catch(e){}}
let hq=0;const kick=()=>{if(!hq)hq=requestAnimationFrame(()=>{hq=0;hints()})};
const boot=()=>{const m=$$('modal');if(!m)return setTimeout(boot,600);new MutationObserver(kick).observe(m,{childList:true,subtree:true,attributes:true,attributeFilter:['data-k']})};boot();

// ───────── 🏮 หอฝึกมินิเกม ─────────
function kind(g){const s=String(g&&g.init||'');if(/\bhold\(|E\.hold/.test(s))return'hold';if(/\blanes\(|E\.lanes/.test(s))return'lane';if(/\bsimon\(|\bbeat\(|\btrack\(|E\.(simon|beat|track)/.test(s))return'beat';if(/tapGood/.test(s))return'tap';if(/รัว/.test(g.how||''))return'hold';return'mind'}
const KN={all:['ทั้งหมด','🎮'],beat:['จังหวะ/ความจำ','🥁'],hold:['กดค้าง/ชาร์จ','💪'],lane:['หลบ/วิ่ง','🏃'],tap:['แตะให้ทัน','👆'],mind:['คิด/เลือก','🧩']};
let HT='all',HQ='';
window._mgHall=function(tab){if(tab)HT=tab;const GG=G(),seen=Object.assign({},LSG('murim_mg2',{})||{},LSG('murim_mgSeen',{})||{}),R=REC();
 const ids=Object.keys(GG).filter(id=>seen[id]);const all=Object.keys(GG).length;const d=DEV();
 const list=ids.filter(id=>(HT==='all'||kind(GG[id])===HT)&&(!HQ||(GG[id].n+' '+(GG[id].how||'')).includes(HQ)));
 const t3=threeCount(),slow=!!LSG('murim_mgSlow',0),live=(()=>{try{return !!(S&&S.alive)}catch(e){return false}})();
 const nextT=TITLES.find(([n])=>t3<n);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏮 หอฝึกมินิเกม</h3>
 <p class="tag2">เจอแล้ว <b>${ids.length}</b> / ${all} เกม · ได้ 3 ดาว <b>${t3}</b> เกม${nextT?` · อีก ${nextT[0]-t3} เกมได้ฉายา「${nextT[1]}」`:''} · เล่นที่นี่ไม่กระทบชีวิต สถิติ${d==='pc'?'คอม':'มือถือ'}แยกจาก${d==='pc'?'มือถือ':'คอม'}</p>
 <div class="m3Bar"><input id="m3Q" type="search" placeholder="🔎 ค้นหาเกม" value="${E(HQ)}"><label class="m3Sl"><input type="checkbox" ${slow?'checked':''} onchange="LS.set('murim_mgSlow',this.checked?1:0);_mgHall()"> 🐢 ช้าลง 30%</label></div>
 <div class="m3Tabs">${Object.entries(KN).map(([k,[n,ic]])=>`<button class="${k===HT?'on':''}" onclick="_mgHall('${k}')">${ic} ${n}</button>`).join('')}</div>
 ${live?'':'<p class="m3W">เริ่มชีวิตก่อนแล้วค่อยเข้ามาฝึก (บางเกมต้องใช้ข้อมูลตัวละคร)</p>'}
 <div class="m3G">${list.map(id=>{const g=GG[id],r=R[id]||{},b=Math.max(r[d]||0),bc=r[d+'C']||0,s=stars(b),sc=stars(bc);return `<div class="m3C"><div class="m3H"><i>${g.ic||'🎮'}</i><div><b>${E(g.n||id)}</b><small>${E(String(g.how||'').replace(/แตะรัว ?ๆ|กดรัว/g,'กดค้างไว้'))}</small></div></div>
  <div class="m3S"><span title="ปกติ">${'★'.repeat(s)}${'☆'.repeat(3-s)}</span>${bc?`<span class="m3Ch" title="ท้าทาย">🔥${'★'.repeat(sc)}${'☆'.repeat(3-sc)}</span>`:''}<small>${r.n||0} ครั้ง</small></div>
  <div class="m3B"><button class="gbtn" ${live?'':'disabled'} onclick="_mgPrac('${id}',0)">▶ ฝึก</button><button class="pbtn" ${live&&s>=2?'':'disabled'} title="${s>=2?'':'ได้ 2 ดาวก่อนจึงปลด'}" onclick="_mgPrac('${id}',1)">🔥 ท้าทาย</button></div></div>`}).join('')||'<p class="tag2">ยังไม่มีเกมในหมวดนี้ เจอมินิเกมระหว่างเล่นแล้วจะมาอยู่ที่นี่</p>'}</div>
 ${all-ids.length>0?`<p class="tag2" style="text-align:center;margin-top:10px">ยังมีอีก ${all-ids.length} เกมที่ซ่อนอยู่ในโลกต่างๆ · เปลี่ยนโลก เปลี่ยนโหมด แล้วจะเจอเกมที่ไม่ซ้ำกัน</p>`:''}`,'mghall');
 const q=$$('m3Q');if(q)q.addEventListener('input',()=>{HQ=q.value.trim();const p=q.selectionStart;_mgHall();const q2=$$('m3Q');if(q2){q2.focus();try{q2.setSelectionRange(p,p)}catch(e){}}})};
window._mgPrac=function(id,ch){let was=null;try{was=paused;paused=true}catch(e){}try{closeM()}catch(e){}
 setTimeout(()=>{try{window.mg2Play(id,{daily:1,_ch:!!ch,tag:ch?'🏮 หอฝึก':'🏮 หอฝึก · ไม่กระทบชีวิต'},()=>{try{paused=was}catch(e){}setTimeout(()=>window._mgHall(),700)})}catch(e){console.error(e)}},200)};
window.mgHall=()=>window._mgHall();

// ───────── ทางเข้า ─────────
const after=(name,fn)=>{try{const o=window[name];if(typeof o!=='function'||o['_m3_'+name])return;const w=function(){const r=o.apply(this,arguments);try{fn.apply(this,arguments)}catch(e){}return r};try{Object.assign(w,o)}catch(e){}w['_m3_'+name]=1;window[name]=w}catch(e){}};
after('openMenu',()=>{setTimeout(()=>{try{const m=$$('modal');if(!m||m.dataset.k!=='menu'||m.querySelector('.m3Mn'))return;const g=m.querySelector('.mcat15 .mgrid')||m.querySelector('.mgrid');if(!g)return;const n=Object.keys(Object.assign({},LSG('murim_mg2',{})||{},LSG('murim_mgSeen',{})||{})).length;const b=document.createElement('button');b.className='opt m3Mn';b.innerHTML=`🏮 หอฝึกมินิเกม<small>เจอแล้ว ${n} เกม · ⭐ ${threeCount()}</small>`;b.onclick=()=>window._mgHall();const s=g.querySelector('.scrMn');s?s.insertAdjacentElement('afterend',b):g.insertBefore(b,g.firstChild)}catch(e){}},120)});
try{if(typeof SYS_GUIDE!=='undefined'&&!SYS_GUIDE.some(x=>x.t==='หอฝึกมินิเกม'))SYS_GUIDE.push({s:'base',ic:'🏮',t:'หอฝึกมินิเกม',d:'เล่นซ้ำทุกมินิเกมที่เคยเจอ เก็บดาว ⭐ ลองโหมดท้าทาย · บนคอมใช้คีย์บอร์ดได้ (Space กด/ค้าง · ←→ · 1–9) · เกมแตะรัวกดค้างแทนได้',go:'mgHall'})}catch(e){}
wrapPlay();setTimeout(wrapPlay,2000);setTimeout(wrapPlay,8000);
{const iv=setInterval(()=>{try{if(window.mg2Play&&!window.mg2Play._m3)wrapPlay()}catch(e){}},5000);setTimeout(()=>clearInterval(iv),120000)}

// ───────── สไตล์ ─────────
const st=document.createElement('style');st.textContent=`
@media (hover:hover) and (pointer:fine){#modal [data-m3k]{position:relative}#modal [data-m3k]::after{content:attr(data-m3k);position:absolute;top:-8px;right:-6px;font:700 10.5px/1 ui-monospace,monospace;padding:3px 6px;border-radius:6px;background:#1d1405;color:#ffe29a;border:1px solid #e8b54a;pointer-events:none;white-space:nowrap;z-index:2}}
@media (hover:none){#modal[data-k="mg2"] #m2B button,#modal[data-k="chmg"] button,#modal[data-k="mg"] button{min-height:48px}}
.m3Bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:6px 0}.m3Bar input[type=search]{flex:1 1 220px;font:inherit;padding:9px 12px;border-radius:12px;border:1px solid #8886;background:#0003;color:inherit}.m3Sl{font-size:13.5px;display:flex;gap:6px;align-items:center;cursor:pointer}
.m3Tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 10px}.m3Tabs button{font:inherit;font-size:13px;padding:6px 12px;border-radius:999px;border:1px solid #e8b54a77;background:transparent;color:inherit;cursor:pointer}.m3Tabs button.on{background:#e8b54a;color:#1d1405}
.m3W{padding:8px 12px;border-radius:10px;background:#ff8a5a22;border:1px solid #ff8a5a77;font-size:13.5px}
.m3G{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.m3C{padding:10px 12px;border-radius:14px;border:1px solid #8885;background:#0003;display:flex;flex-direction:column;gap:6px}
.m3H{display:flex;gap:10px;align-items:flex-start}.m3H i{font-style:normal;font-size:28px;line-height:1}.m3H b{display:block;font-size:15px}.m3H small{display:block;font-size:12px;opacity:.75;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.m3S{display:flex;gap:10px;align-items:center;font-size:14px;color:#ffd86a}.m3S small{margin-left:auto;color:inherit;opacity:.6;font-size:12px}.m3Ch{color:#ff9b5a}
.m3B{display:flex;gap:6px}.m3B button{flex:1;min-height:40px;font-size:14px!important}
#modal .opt.m3Mn{border-color:#e8b54a!important}
`;document.head.appendChild(st);
window._m3={record,REC,AD,stars,kind,threeCount};
})()}catch(e){console.error('mg3',e)}
wReady('mg3');
