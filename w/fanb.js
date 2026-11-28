// ============================================================
// /w/fanb.js 🔮 ทำเนียบแฟนตาซี — รายสัปดาห์ / รายเดือน (โหลดเบื้องหลัง 2.7 วิ)
//  · รวมทุกโลกแฟนตาซี (ต่างโลก · โลกเวทมนตร์ · อะคาเดมี่) · คะแนนเฉลี่ยทุกด้านทั้งชีวิตแบบโหมดปกติ
//  · หัวทำเนียบธีมวงเวท: วงเวทหมุนสองชั้น · ดาวระยิบ · คริสตัลลอย · ชื่อทำเนียบไล่แสง · นับถอยหลังรีเซ็ต
//  · โชว์กรอบ+ฉายารางวัลอันดับ 1–3 ของรอบนี้ (ภาพจริง วาดโดย rkSvg โหมด i ใน app.js)
//  · แถวอันดับ 1–3 ในทำเนียบเรืองแสงตามอันดับ · แอดมินสุ่มชุดฉายา/กรอบของแฟนตาซีใหม่ได้ (ไม่กระทบทำเนียบอื่น)
//  ฝั่งเซิร์ฟเวอร์: หมวด ci (ch = 'mw_fan') · ชุดคำ/กรอบ i ใน RKG · เกลือแยก rksalt:{w|m}:i:{รอบ}
// ============================================================
try{(function(){
if(window._fanbX)return;window._fanbX=1;
const T_=f=>{try{return f()}catch(e){return null}};
const PN={w:'สัปดาห์',m:'เดือน'};
const isAdm=()=>T_(()=>!!admK());
const per=()=>{const p=openOnline._bp||'w';return p==='m'?'m':'w'};
const onFan=()=>T_(()=>openOnline._bw===4&&chmSel()==='i'&&openOnline._bv!=='ov');
const left=p=>{const t=new Date(Date.now()+7*3600e3);let nx;if(p==='m')nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth()+1,1);else{const dd=(t.getUTCDay()+6)%7;nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()-dd+7)}const ms=nx-t.getTime(),d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4);return d>0?`${d} วัน ${h} ชม.`:h>0?`${h} ชม. ${m} นาที`:`${m} นาที`};
const keyOf=p=>T_(()=>window.rkgKey(p,'i'))||'';
const prize=(p,r)=>{const k=keyOf(p);if(!k||!window.RKG)return null;const id=RKG.fid(p,'i',k,r),f=T_(()=>rkgReg(id)),t=T_(()=>rkgNow(p,'i',r))||RKG.title(p,'i',k,r);return{id,f,t}};
// วงเวท SVG (หมุนสองชั้นสวนกัน + อักขระรูน)
const circle=()=>{const RU='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊ';let ru='',tk='';for(let i=0;i<16;i++){const a=i/16*Math.PI*2-Math.PI/2;ru+=`<text x="${(100+Math.cos(a)*78).toFixed(1)}" y="${(104+Math.sin(a)*78).toFixed(1)}" text-anchor="middle" font-size="11">${RU[i]}</text>`}
 for(let i=0;i<48;i++){const a=i/48*Math.PI*2,r2=i%4?90:85;tk+=`<path d="M${(100+Math.cos(a)*94).toFixed(1)} ${(100+Math.sin(a)*94).toFixed(1)}L${(100+Math.cos(a)*r2).toFixed(1)} ${(100+Math.sin(a)*r2).toFixed(1)}"/>`}
 const tri=rot=>{const P=[0,1,2].map(i=>{const a=(rot+i*120)*Math.PI/180;return(100+Math.cos(a)*64).toFixed(1)+' '+(100+Math.sin(a)*64).toFixed(1)});return`<path d="M${P.join('L')}Z"/>`};
 return`<svg class="fnMc" viewBox="0 0 200 200" aria-hidden="true"><g class="a"><circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="70"/><g class="tk">${tk}</g><g class="ru">${ru}</g></g><g class="b">${tri(-90)}${tri(90)}<circle cx="100" cy="100" r="34"/></g></svg>`};
const stars=n=>Array.from({length:n},(_,i)=>`<i class="fnSt" style="left:${(7+((i*37)%88))}%;top:${(8+((i*53)%80))}%;animation-delay:${(-i*.37).toFixed(2)}s;--s:${(.6+((i*7)%5)/6).toFixed(2)}"></i>`).join('');

// ---------- สไตล์ ----------
const css=document.createElement('style');css.textContent=`
#modal.fanBd .item.brd{border:1.5px solid #4a3478;background:linear-gradient(180deg,rgba(192,138,255,.10),rgba(16,10,30,0) 60%),rgba(20,12,36,.35);transition:transform .2s}
#modal.fanBd .item.brd .h b{color:#ecdcff}
#modal.fanBd .item.brd:nth-of-type(1){border-color:#e7c46a;animation:fnG1 2.6s ease-in-out infinite}
#modal.fanBd .item.brd:nth-of-type(2){border-color:#cfd8ff;animation:fnG2 3s ease-in-out infinite}
#modal.fanBd .item.brd:nth-of-type(3){border-color:#e8a070;animation:fnG3 3.4s ease-in-out infinite}
@keyframes fnG1{0%,100%{box-shadow:0 0 0 1px rgba(231,196,106,.3),0 0 12px rgba(231,196,106,.15)}50%{box-shadow:0 0 0 1px rgba(231,196,106,.6),0 0 26px rgba(231,196,106,.35)}}
@keyframes fnG2{0%,100%{box-shadow:0 0 8px rgba(207,216,255,.1)}50%{box-shadow:0 0 18px rgba(207,216,255,.28)}}
@keyframes fnG3{0%,100%{box-shadow:0 0 6px rgba(232,160,112,.08)}50%{box-shadow:0 0 16px rgba(232,160,112,.24)}}
#modal.fanBd .chhead{display:none!important}
.fnHd{position:relative;overflow:hidden;margin:8px 0 10px;padding:16px 14px 13px;border-radius:18px;border:2px solid #9a6ae8;color:#f1e8ff;isolation:isolate;
 background:radial-gradient(120% 90% at 85% 0%,rgba(255,122,200,.22),transparent 55%),radial-gradient(90% 80% at 0% 100%,rgba(90,200,255,.16),transparent 60%),linear-gradient(160deg,#25124a,#120a26 60%,#0a0f22);
 box-shadow:inset 0 0 0 1px rgba(230,210,255,.08),0 8px 24px rgba(40,10,80,.45);animation:fnIn .5s cubic-bezier(.2,.9,.3,1.2)}
@keyframes fnIn{from{opacity:0;transform:translateY(10px) scale(.97)}}
.fnHd:after{content:'';position:absolute;inset:-2px;border-radius:18px;padding:2px;background:conic-gradient(from var(--fa,0deg),#c08aff,#ff7ac8,#6ad8ff,#ffe08a,#c08aff);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:fnRim 6s linear infinite;pointer-events:none;z-index:2}
@property --fa{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes fnRim{to{--fa:360deg}}
.fnMc{position:absolute;right:-46px;top:-40px;width:190px;height:190px;opacity:.5;z-index:-1;pointer-events:none;fill:none;stroke:#c9a2ff;stroke-width:1}
.fnMc .a{transform-origin:100px 100px;animation:fnSpin 40s linear infinite}.fnMc .b{transform-origin:100px 100px;animation:fnSpin 22s linear infinite reverse;stroke:#ff9ad8}
.fnMc .ru{fill:#e2ccff;stroke:none;font-family:serif}.fnMc .tk{stroke:#a07ae8}
@keyframes fnSpin{to{transform:rotate(360deg)}}
.fnSt{position:absolute;width:calc(7px*var(--s));height:calc(7px*var(--s));z-index:-1;pointer-events:none;background:#fff;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);animation:fnTw 2.6s ease-in-out infinite;filter:drop-shadow(0 0 3px #d9b8ff)}
@keyframes fnTw{0%,100%{opacity:.1;transform:scale(.5) rotate(0)}50%{opacity:1;transform:scale(1) rotate(45deg)}}
.fnHd .cr{position:absolute;left:10px;bottom:-6px;font-size:30px;opacity:.22;animation:fnBob 3.4s ease-in-out infinite;pointer-events:none;z-index:-1}
@keyframes fnBob{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-8px) rotate(6deg)}}
.fnHd .t1{position:relative;font-size:19px;font-weight:900;letter-spacing:.3px;background:linear-gradient(90deg,#fff3c4,#e8c8ff 30%,#ffffff 45%,#ffb8e6 60%,#fff3c4);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:fnSh 4.5s linear infinite;filter:drop-shadow(0 1px 0 #000) drop-shadow(0 0 8px rgba(200,140,255,.45))}
@keyframes fnSh{to{background-position:-220% 0}}
.fnHd .t2{position:relative;font-size:12px;opacity:.88;margin-top:3px}
.fnHd .t2 b{color:#ffe08a!important}
.fnHd .wl{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.fnHd .wl span{font-size:11px;font-weight:800;padding:2px 9px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(200,160,255,.35)}
.fnHd .cd{position:relative;display:inline-flex;gap:6px;align-items:center;margin-top:8px;padding:3px 10px;border-radius:999px;background:rgba(0,0,0,.35);border:1px solid rgba(200,160,255,.5);font-size:12px;font-weight:800;color:#f1e8ff}
.fnHd .cd i{font-style:normal;display:inline-block;animation:fnSpin 4s linear infinite}
.fnPz{position:relative;display:flex;flex-direction:column;gap:8px;margin-top:12px}
.fnPz .pz{position:relative;display:flex;align-items:center;gap:16px;padding:10px 12px 10px 16px;border-radius:13px;background:rgba(0,0,0,.3);border:1px solid rgba(200,160,255,.25);min-width:0;overflow:hidden;opacity:0;animation:fnPzIn .5s cubic-bezier(.2,.9,.3,1.2) forwards}
.fnPz .pz:nth-child(2){animation-delay:.12s}.fnPz .pz:nth-child(3){animation-delay:.24s}
@keyframes fnPzIn{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
.fnPz .pz.r1{border-color:#e7c46a;background:linear-gradient(90deg,rgba(231,196,106,.2),rgba(120,60,200,.18) 60%,rgba(0,0,0,.25))}
.fnPz .pz.r1:before{content:'';position:absolute;top:0;bottom:0;width:40%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.16),transparent);animation:fnSweep 3.2s ease-in-out infinite;pointer-events:none}
@keyframes fnSweep{0%{left:-50%}60%,100%{left:130%}}
.fnPz .pz .fw{flex:0 0 64px;height:70px;display:flex;align-items:center;justify-content:center}.fnPz .pz.r1 .fw .frw{transform:scale(1.15)}
.fnPz .pz .tx{min-width:0;flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.fnPz .pz .rk{font-size:11.5px;font-weight:900;color:#e2ccff}.fnPz .pz.r1 .rk{color:#ffe08a}
.fnPz .pz .rt3{max-width:100%;margin:0;white-space:normal;line-height:1.3;padding:3px 16px}.fnPz .pz .rt3 .tx{overflow:visible;text-overflow:clip}.fnPz .pz .rt3 small{display:none}
.fnPz .pz .kb{font-size:11px;opacity:.85}
.fnAd{position:relative;width:100%;margin-top:10px;padding:9px;border-radius:12px;border:1.5px dashed #c08aff;background:rgba(192,138,255,.12);color:#f1e8ff;font:inherit;font-weight:800;cursor:pointer}
.fnAd:disabled{opacity:.6}
@media (prefers-reduced-motion:reduce){.fnHd,.fnHd:after,.fnMc .a,.fnMc .b,.fnSt,.fnHd .cr,.fnHd .t1,.fnHd .cd i,.fnPz .pz,.fnPz .pz.r1:before,#modal.fanBd .item.brd{animation:none!important;opacity:1}}`;document.head.appendChild(css);

// ---------- ป้ายหัวทำเนียบ + รางวัลรอบนี้ ----------
function head(){const m=$('modal');if(!m||m.dataset.k!=='online'||/กำลังโหลด…/.test((m.querySelector('.tag2')||{}).textContent||''))return;const on=onFan()&&!m.querySelector('.bdOv');m.classList.toggle('fanBd',!!on);
 m.querySelectorAll('.fnHd').forEach(x=>{if(!on||x.dataset.p!==per())x.remove()});if(!on||m.querySelector('.fnHd'))return;
 const p=per(),P=[1,2,3].map(r=>prize(p,r));
 const KB=[...m.querySelectorAll('.chhead .chrw>div')].map(x=>{const q=/☯️?\s*([\d,]+)/.exec(x.textContent||'');return q?q[1]:''});
 const pz=P.every(Boolean)?`<div class="fnPz">${P.map((z,i)=>`<div class="pz r${i+1}"><div class="fw">${frWrap('<span class="frph sm">🧙</span>',z.id)}</div><div class="tx"><div class="rk">${['🥇 อันดับ 1','🥈 อันดับ 2','🥉 อันดับ 3'][i]}</div>${rkChip(z.t,p==='m'?9:8)}${KB[i]?`<div class="kb">☯️ คลังกรรม ${KB[i]}</div>`:''}</div></div>`).join('')}</div>`:'';
 const d=document.createElement('div');d.className='fnHd';d.dataset.p=p;
 d.innerHTML=`${circle()}${stars(14)}<span class="cr">💎</span><div class="t1">🔮 ทำเนียบแฟนตาซี · ${PN[p]}นี้</div><div class="t2">คะแนน<b>เฉลี่ยทุกด้านของทั้งชีวิต</b> · อันดับ 1–3 ได้<b>ฉายา</b>และ<b>กรอบวงเวท</b>รุ่นนี้ (มีรอบเดียว ไม่กลับมาอีก) · ชุดใหม่ทุก${PN[p]}</div><div class="wl"><span>⚔️ ต่างโลก</span><span>🔮 โลกเวทมนตร์</span><span>🏰 อะคาเดมี่</span></div><div class="cd"><i>✦</i> รีเซ็ตในอีก <span class="fnCd">${left(p)}</span></div>${pz}${isAdm()?`<button class="fnAd" onclick="fanRoll('${p}',this)">🎲 สุ่มฉายาและกรอบแฟนตาซีรอบ${PN[p]}นี้ใหม่ (แอดมิน)</button>`:''}`;
 const sub=m.querySelector('.bdSub')||m.querySelector('.bdBar')||m.querySelector('h3');if(sub)sub.after(d);else m.prepend(d)}
window.fanRoll=async function(p,b){if(!isAdm())return;if(b){b.disabled=true;b.textContent='🎲 กำลังสุ่ม…'}
 try{const r=await fetch(API+'?a=rkprev&fmt=json&key='+encodeURIComponent(admK())+'&roll='+p+'&c=i&_='+Date.now(),{cache:'no-store'});const j=await r.json();if(!j||!j.keys)throw 0;T_(()=>sfx('rare'));toast('🎲 สุ่มฉายาและกรอบแฟนตาซี'+PN[p]+'นี้ใหม่แล้ว')}catch(e){toast('สุ่มไม่สำเร็จ (คีย์แอดมินไม่ถูกหรือเน็ตหลุด)')}
 const m=$('modal');if(m&&m.dataset.k==='rkadm')return openRkAdmin(p);T_(()=>bdRefresh())};
let cdT=0;setInterval(()=>{try{const m=$('modal');if(!m||m.dataset.k!=='online'){m&&m.classList.remove('fanBd');return}if(!m.querySelector('.bdBar')&&!m.querySelector('.fnHd'))return;head();if(Date.now()-cdT>30000){cdT=Date.now();const c=m.querySelector('.fnCd');if(c)c.textContent=left(per())}}catch(e){}},400);

// ---------- หน้าแอดมิน 🎲 ฉายาและกรอบ: หมวดแฟนตาซี ----------
{const _oa=window.openRkAdmin;if(typeof _oa==='function'){window.openRkAdmin=async function(p,roll){const r=await _oa.apply(this,arguments);try{const m=$('modal');if(!m||m.dataset.k!=='rkadm'||m.querySelector('.fanAdm'))return r;const p0=p||_oa._p||'d';
  const j=await (await fetch(API+'?a=rkprev&fmt=json&key='+encodeURIComponent(admK())+'&_='+Date.now(),{cache:'no-store'})).json(),k=(j.own&&j.own.i&&j.own.i[p0])||j.keys[p0];
  const rows=[1,2,3].map(r=>{const id=RKG.fid(p0,'i',k,r),t=RKG.title(p0,'i',k,r);T_(()=>rkgReg(id));try{window._rkGEN&&window._rkGEN.set(t,{p:p0,r,c:'i'})}catch(e){}return`<div style="display:flex;align-items:center;gap:14px;margin-top:10px"><div style="flex:0 0 64px;text-align:center">${frWrap('<span class="frph sm">🧙</span>',id)}</div><div style="min-width:0;flex:1">${rkChip(t,{d:7,w:8,m:9}[p0])}</div></div>`}).join('');
  const own=j.own&&j.own.i&&j.own.i[p0]&&j.own.i[p0]!==j.keys[p0];
  const h=`<h4 style="margin:14px 0 4px">🔮 แฟนตาซี</h4><div class="item fanAdm">${p0==='d'?'<p class="tag2">แฟนตาซีมีเฉพาะรายสัปดาห์และรายเดือน</p>':`<p class="tag2">${own?'ใช้ชุดที่สุ่มแยกไว้':'ใช้ชุดเดียวกับรอบรวม'}</p>${rows}<button class="fnAd" onclick="fanRoll('${p0}',this)">🎲 สุ่มเฉพาะแฟนตาซี</button>`}</div>`;
  const items=m.querySelectorAll('.item');const last=items[items.length-1];if(last)last.insertAdjacentHTML('afterend',h);else m.insertAdjacentHTML('beforeend',h)}catch(e){console.error('fanAdm',e)}return r};window.openRkAdmin._p=_oa._p}}
try{wReady('fanb')}catch(e){}
})()}catch(e){console.error('fanb.js',e)}
