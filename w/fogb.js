// ============================================================
// /w/fogb.js 🌉 ทำเนียบนครม่านหมอก — รายสัปดาห์ / รายเดือน (โหลดเบื้องหลัง 2.6 วิ)
//  · หน้าทำเนียบหมวด f ธีมยุคไอน้ำ: ป้ายหัวทำเนียบ · นับถอยหลังรีเซ็ต · โชว์กรอบ+ฉายารางวัลอันดับ 1–3 ของรอบนี้ (ภาพจริง)
//  · หน้าตากรอบ/ป้ายฉายาวาดโดย BLOCK 80 ใน app.js (โหมด f: เฟืองหมุน ท่อไอน้ำ หมวกทรงสูง ตะเกียงแก๊ส)
//  · แอดมิน: ปุ่ม 🎲 สุ่มฉายา/กรอบเฉพาะนครม่านหมอกใหม่ (ไม่กระทบทำเนียบอื่น) ทั้งในหน้าทำเนียบและหน้าแอดมิน 🎲 ฉายาและกรอบ
//  ฝั่งเซิร์ฟเวอร์: หมวด cf ใน BD_CATS · ชุดคำ/กรอบ f ใน RKG · เกลือแยก rksalt:{w|m}:f:{รอบ} (a=rkprev&roll=w&c=f)
// ============================================================
try{(function(){
if(window._fogbX)return;window._fogbX=1;
const E=s=>{try{return esc(String(s==null?'':s))}catch(e){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}};
const T_=f=>{try{return f()}catch(e){return null}};
const PN={w:'สัปดาห์',m:'เดือน'};
const isAdm=()=>T_(()=>!!admK());
const per=()=>{const p=openOnline._bp||'w';return p==='m'?'m':'w'};
const onFog=()=>T_(()=>openOnline._bw===4&&chmSel()==='f'&&openOnline._bv!=='ov');
// เวลาที่เหลือก่อนรีเซ็ต (เวลาไทย): สัปดาห์ = จันทร์ 00:00 · เดือน = วันที่ 1 00:00
const left=p=>{const t=new Date(Date.now()+7*3600e3);let nx;if(p==='m')nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth()+1,1);else{const dd=(t.getUTCDay()+6)%7;nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()-dd+7)}const ms=nx-t.getTime(),d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4);return d>0?`${d} วัน ${h} ชม.`:h>0?`${h} ชม. ${m} นาที`:`${m} นาที`};
const keyOf=p=>T_(()=>window.rkgKey(p,'f'))||'';
const prize=(p,r)=>{const k=keyOf(p);if(!k||!window.RKG)return null;const id=RKG.fid(p,'f',k,r),f=T_(()=>rkgReg(id)),t=T_(()=>rkgNow(p,'f',r))||RKG.title(p,'f',k,r);return{id,f,t}};

// ---------- สไตล์ ----------
const css=document.createElement('style');css.textContent=`
#modal.fogBd .item.brd{border:1.5px solid #6a5434;background:linear-gradient(180deg,rgba(200,164,106,.10),rgba(20,16,10,.0) 60%),rgba(26,20,12,.35)}
#modal.fogBd .item.brd .h b{color:#f2d9a6}
#modal.fogBd .item.brd:nth-of-type(1){border-color:#e8c27a;box-shadow:0 0 0 1px rgba(232,194,122,.35),0 0 18px rgba(232,194,122,.18)}
.fgHd{position:relative;overflow:hidden;margin:8px 0 10px;padding:14px 14px 12px;border-radius:16px;border:2px solid #b8925a;color:#f6e6c4;
 background:radial-gradient(120% 90% at 85% 0%,rgba(106,208,200,.18),transparent 55%),linear-gradient(160deg,#2c2214,#16110a 60%,#0f1518);box-shadow:inset 0 0 0 1px rgba(255,230,180,.08),0 6px 18px rgba(0,0,0,.35)}
.fgHd:before,.fgHd:after{content:'';position:absolute;left:-30%;width:160%;height:60px;border-radius:50%;background:radial-gradient(closest-side,rgba(220,230,235,.16),transparent);pointer-events:none;animation:fgMist 14s linear infinite}
.fgHd:before{top:22%}.fgHd:after{bottom:-10px;animation-duration:19s;animation-direction:reverse}
@keyframes fgMist{0%{transform:translateX(-12%)}50%{transform:translateX(12%)}100%{transform:translateX(-12%)}}
.fgHd .gr{position:absolute;font-size:46px;opacity:.16;top:-10px;right:-6px;animation:fgSpin 14s linear infinite;pointer-events:none}.fgHd .gr.b{font-size:28px;top:30px;right:40px;animation-direction:reverse;animation-duration:9s;opacity:.12}
@keyframes fgSpin{to{transform:rotate(360deg)}}
.fgHd .t1{position:relative;font-size:18px;font-weight:900;letter-spacing:.3px;color:#ffe3a8;text-shadow:0 1px 0 #000,0 0 10px rgba(255,200,110,.35)}
.fgHd .t2{position:relative;font-size:12px;opacity:.85;margin-top:2px}
.fgHd .cd{position:relative;display:inline-flex;gap:6px;align-items:center;margin-top:8px;padding:3px 10px;border-radius:999px;background:rgba(0,0,0,.35);border:1px solid rgba(232,194,122,.45);font-size:12px;font-weight:800;color:#ffe3a8}
.fgPz{position:relative;display:flex;flex-direction:column;gap:8px;margin-top:12px}
.fgPz .pz{display:flex;align-items:center;gap:16px;padding:10px 12px 10px 16px;border-radius:12px;background:rgba(0,0,0,.28);border:1px solid rgba(232,194,122,.25);min-width:0}
.fgPz .pz.r1{border-color:#e8c27a;background:linear-gradient(90deg,rgba(232,194,122,.18),rgba(0,0,0,.25))}
.fgPz .pz .fw{flex:0 0 64px;height:70px;display:flex;align-items:center;justify-content:center}.fgPz .pz.r1 .fw .frw{transform:scale(1.15)}
.fgPz .pz .tx{min-width:0;flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.fgPz .pz .rk{font-size:11.5px;font-weight:900;color:#e8c27a}
.fgPz .pz .rt3{max-width:100%;margin:0;white-space:normal;line-height:1.3;padding:3px 16px}.fgPz .pz .rt3 .tx{overflow:visible;text-overflow:clip}.fgPz .pz .rt3 small{display:none}
.fgPz .pz .kb{font-size:11px;opacity:.85}
#modal.fogBd .chhead{display:none!important}
.fgHd .t2 b{color:#ffe3a8!important}
.fgAd{position:relative;width:100%;margin-top:10px;padding:9px;border-radius:12px;border:1.5px dashed #e8c27a;background:rgba(232,194,122,.10);color:#ffe3a8;font:inherit;font-weight:800;cursor:pointer}
.fgAd:disabled{opacity:.6}
@media (prefers-reduced-motion:reduce){.fgHd:before,.fgHd:after,.fgHd .gr{animation:none}}`;document.head.appendChild(css);

// ---------- ป้ายหัวทำเนียบ + รางวัลรอบนี้ ----------
function head(){const m=$('modal');if(!m||m.dataset.k!=='online'||/กำลังโหลด…/.test((m.querySelector('.tag2')||{}).textContent||''))return;const on=onFog()&&!m.querySelector('.bdOv');m.classList.toggle('fogBd',!!on);
 m.querySelectorAll('.fgHd').forEach(x=>{if(!on||x.dataset.p!==per())x.remove()});if(!on||m.querySelector('.fgHd'))return;
 const p=per(),P=[1,2,3].map(r=>prize(p,r));
 // คลังกรรมรางวัล: อ่านจากกล่องกติกาเดิม (ซ่อนกล่องนั้นไว้ ไม่ให้ซ้ำ)
 const KB=[...m.querySelectorAll('.chhead .chrw>div')].map(x=>{const q=/☯️?\s*([\d,]+)/.exec(x.textContent||'');return q?q[1]:''});
 const pz=P.every(Boolean)?`<div class="fgPz">${P.map((z,i)=>`<div class="pz r${i+1}"><div class="fw">${frWrap('<span class="frph sm">🎩</span>',z.id)}</div><div class="tx"><div class="rk">${['🥇 อันดับ 1','🥈 อันดับ 2','🥉 อันดับ 3'][i]}</div>${rkChip(z.t,p==='m'?9:8)}${KB[i]?`<div class="kb">☯️ คลังกรรม ${KB[i]}</div>`:''}</div></div>`).join('')}</div>`:'';
 const d=document.createElement('div');d.className='fgHd';d.dataset.p=p;
 d.innerHTML=`<span class="gr">⚙️</span><span class="gr b">⚙️</span><div class="t1">🌉 ทำเนียบนครม่านหมอก · ${PN[p]}นี้</div><div class="t2">อันดับ 1–3 ได้<b>ฉายา</b>และ<b>กรอบทองเหลือง</b>รุ่นนี้ (มีรอบเดียว ไม่กลับมาอีก) · ชุดใหม่ทุก${PN[p]}</div><div class="cd">🕰️ รีเซ็ตในอีก <span class="fgCd">${left(p)}</span></div>${pz}${isAdm()?`<button class="fgAd" onclick="fogRoll('${p}',this)">🎲 สุ่มฉายาและกรอบรอบ${PN[p]}นี้ใหม่ (แอดมิน)</button>`:''}`;
 const sub=m.querySelector('.bdSub')||m.querySelector('.bdBar')||m.querySelector('h3');if(sub)sub.after(d);else m.prepend(d)}
window.fogRoll=async function(p,b){if(!isAdm())return;if(b){b.disabled=true;b.textContent='🎲 กำลังสุ่ม…'}
 try{const r=await fetch(API+'?a=rkprev&fmt=json&key='+encodeURIComponent(admK())+'&roll='+p+'&c=f&_='+Date.now(),{cache:'no-store'});const j=await r.json();if(!j||!j.keys)throw 0;T_(()=>sfx('rare'));toast('🎲 สุ่มฉายาและกรอบนครม่านหมอก'+PN[p]+'นี้ใหม่แล้ว')}catch(e){toast('สุ่มไม่สำเร็จ (คีย์แอดมินถูกไหม?)');if(b){b.disabled=false;b.textContent='🎲 ลองอีกครั้ง'}return}
 const m=$('modal');if(m&&m.dataset.k==='rkadm')return openRkAdmin(p);T_(()=>bdRefresh())};
// ไม่ห่อ openOnline (ค่า _bw/_cm เก็บบนตัวฟังก์ชัน ห่อเพิ่มแล้วค่าหลุด) → ตรวจหน้าทำเนียบเองทุก 0.4 วิ
let cdT=0;setInterval(()=>{try{const m=$('modal');if(!m||m.dataset.k!=='online'){m&&m.classList.remove('fogBd');return}if(!m.querySelector('.bdBar')&&!m.querySelector('.fgHd'))return;head();if(Date.now()-cdT>30000){cdT=Date.now();const c=m.querySelector('.fgCd');if(c)c.textContent=left(per())}}catch(e){}},400);

// ---------- หน้าแอดมิน 🎲 ฉายาและกรอบ: หมวดนครม่านหมอก + สุ่มเฉพาะหมวด ----------
{const _oa=window.openRkAdmin;if(typeof _oa==='function'){window.openRkAdmin=async function(p,roll){const r=await _oa.apply(this,arguments);try{const m=$('modal');if(!m||m.dataset.k!=='rkadm'||m.querySelector('.fogAdm'))return r;const p0=p||_oa._p||'d';
  const j=await (await fetch(API+'?a=rkprev&fmt=json&key='+encodeURIComponent(admK())+'&_='+Date.now(),{cache:'no-store'})).json(),k=(j.own&&j.own.f&&j.own.f[p0])||j.keys[p0];
  const rows=[1,2,3].map(r=>{const id=RKG.fid(p0,'f',k,r),f=rkgReg(id),t=RKG.title(p0,'f',k,r);try{window._rkGEN&&window._rkGEN.set(t,{p:p0,r,c:'f'})}catch(e){}return`<div style="display:flex;align-items:center;gap:14px;margin-top:10px"><div style="flex:0 0 64px;text-align:center">${frWrap('<span class="frph sm">🎩</span>',id)}</div><div style="min-width:0;flex:1">${rkChip(t,{d:7,w:8,m:9}[p0])}<div class="tag2" style="margin-top:3px">${f?E(f.n):''}</div></div></div>`}).join('');
  const own=j.own&&j.own.f&&j.own.f[p0]&&j.own.f[p0]!==j.keys[p0];
  const h=`<h4 style="margin:14px 0 4px">🌉 นครม่านหมอก</h4><div class="item fogAdm">${p0==='d'?'<p class="tag2">นครม่านหมอกมีเฉพาะรายสัปดาห์และรายเดือน</p>':`<p class="tag2">${own?'ใช้ชุดที่สุ่มแยกไว้ (สุ่มทั้งรอบจะกลับมาใช้ชุดรวม)':'ใช้ชุดเดียวกับรอบรวม'}</p>${rows}<button class="fgAd" style="color:inherit" onclick="fogRoll('${p0}',this)">🎲 สุ่มเฉพาะนครม่านหมอกใหม่</button>`}</div>`;
  const items=m.querySelectorAll('.item');const last=items[items.length-1];if(last)last.insertAdjacentHTML('afterend',h);else m.insertAdjacentHTML('beforeend',h)}catch(e){console.error('fogAdm',e)}return r};window.openRkAdmin._p=_oa._p}}
try{wReady('fogb')}catch(e){}
})()}catch(e){console.error('fogb.js',e)}
