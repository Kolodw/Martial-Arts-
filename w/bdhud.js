// ============================================================
// /w/bdhud.js 🏆 แผ่นเลือกทำเนียบแบบ HUD (แทน bdSheet เดิมของ late95) — โหลดเบื้องหลัง 2.8 วิ
//  · หมวดตรงกับหน้าเลือกโลก: ตะวันออก · ท้าทาย · ยุคปัจจุบัน · อนาคตและลึกลับ · แฟนตาซี (เร็วๆ นี้)
//  · แถบ "ทำเนียบที่ฉันติดอันดับ" บนสุด · ช่องค้นหาข้ามหมวด
//  · มือถือ: แผ่นเลื่อนขึ้น + แท็บหมวด + แถวกระชับ · คอม: แผงกลางจอ แถบหมวดซ้าย การ์ดโชว์อันดับ 1–3
//  ข้อมูล: window._bdLast (top = ทำเนียบโลกหลัก · chov[id] = {n,s,c,me,t3} ทำเนียบโหมด/โลกใหม่)
// ============================================================
try{(function(){
if(window._bdHudX)return;window._bdHudX=1;
const E=s=>{try{return esc(String(s==null?'':s))}catch(e){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}};
const T_=f=>{try{return f()}catch(e){return null}};
const F=n=>T_(()=>fmt(Math.round(+n||0)))||String(Math.round(+n||0));
const OO=()=>window.openOnline||{};
// [id, ชื่อ, คำค้นเพิ่ม]
const CAT=[
 {k:'east',n:'ตะวันออก',ic:'🏯',a:'#e8b54a',L:[['w0','ยุทธภพ','murim จอมยุทธ์'],['w1','โลกเทพเซียน','xian เซียน'],['w3','โลกเทพ','god เทพ'],['w2','สัตว์อสูร','beast สัตว์'],['l','ทวีปจิตวิญญาณยุทธ์','soul วิญญาณ วงแหวน']]},
 {k:'chal',n:'ท้าทาย',ic:'🔥',a:'#ff6a3a',L:[['h','นรก','hell'],['s','ชีวิตสั้น','short'],['j','รากขยะ','junk'],['rg','ผู้ย้อนกาล','regress ย้อนเวลา']]},
 {k:'mod',n:'ยุคปัจจุบัน',ic:'🏙️',a:'#3ab0ff',L:[['n','ฮันเตอร์','hunter เกต'],['u','ใต้ดิน','under มาเฟีย'],['o','ผีไทย','ghost ผี'],['p','วนลูป','loop'],['z','ซอมบี้','zombie'],['t','หอคอย','tower'],['e','ระบบเกม','game'],['q','เกตชนะ','gate'],['y','วันสิ้นโลก','doom']]},
 {k:'fut',n:'อนาคตและลึกลับ',ic:'🌠',a:'#b07aff',L:[['k','ทะลุฟ้าดารา','sky ดาว อวกาศ'],['f','นครม่านหมอก','fog หมอก ไอน้ำ'],['v','ผู้ข้ามโลก','trav ข้ามโลก']]},
 {k:'fan',n:'แฟนตาซี',ic:'🔮',a:'#ff7ac8',soon:1,L:[['fi','ต่างโลก','isekai'],['fm','โลกเวทมนตร์','magic เวท'],['fa','โลกแห่งอะคาเดมี่','academy โรงเรียน']]}];
const ALL=[];CAT.forEach(c=>c.L.forEach(x=>ALL.push({id:x[0],n:x[1],q:x[2],c})));
const catOf=id=>(ALL.find(x=>x.id===id)||{}).c||CAT[0];
const myPu=()=>T_(()=>String(pid).replace(/[^a-z0-9]/g,'').slice(0,12))||'';
const wf=bw=>e=>bw===2?!!e.bm:bw===3?(!e.bm&&!!e.g):(!e.bm&&!e.g&&(e.x?1:0)===bw);
const curId=()=>T_(()=>{const O=OO(),bw=O._bw!=null?O._bw:(S?(S.ch&&S.ch!=='normal'?4:S.beastMode?2:S.xt?3:S.xian?1:0):0);if(bw===4)return typeof chmSel==='function'?chmSel():'h';return'w'+bw})||'w0';
function info(id){const j=window._bdLast,me=myPu();if(!j)return{t3:[],c:-1,me:-1};
 if(id[0]==='w'){const L=(j.top||[]).filter(wf(+id.slice(1)));return{t3:L.slice(0,3).map(e=>({n:e.n,s:e.s})),c:L.length,me:L.findIndex(e=>e.pu&&e.pu===me)}}
 const o=(j.chov||{})[id];if(!o)return{t3:[],c:-1,me:-1};return{t3:o.t3&&o.t3.length?o.t3:(o.n?[{n:o.n,s:o.s}]:[]),c:o.c==null?-1:o.c,me:o.me==null?-1:o.me}}
const thumb=id=>`<span class="bhT bhW">${T_(()=>window.wimTh&&wimTh(id))||''}</span>`;
const per=()=>{const p=OO()._bp||'w';return p==='m'?'m':p==='d'?'d':'w'};
const PNN={d:'วันนี้',w:'สัปดาห์นี้',m:'เดือนนี้'};
const left=p=>{const t=new Date(Date.now()+7*3600e3);let nx;if(p==='m')nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth()+1,1);else if(p==='d')nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()+1);else{const dd=(t.getUTCDay()+6)%7;nx=Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()-dd+7)}const ms=nx-t.getTime(),d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4);return d>0?`${d} วัน ${h} ชม.`:h>0?`${h} ชม. ${m} นาที`:`${m} นาที`};

// ---------- สไตล์ HUD ----------
const css=document.createElement('style');css.textContent=`
.bhBg{position:fixed;inset:0;z-index:100050;background:rgba(2,4,8,.62);display:flex;align-items:flex-end;justify-content:center;animation:bhF .16s ease}
@keyframes bhF{from{opacity:0}}
.bh{--ac:#e8b54a;position:relative;width:min(560px,100%);max-height:86vh;max-height:86dvh;display:flex;flex-direction:column;color:#e9eef6;font-variant-numeric:tabular-nums;
 background:linear-gradient(rgba(120,180,255,.045) 1px,transparent 1px) 0 0/100% 4px,radial-gradient(120% 60% at 50% 0%,rgba(80,130,200,.16),transparent 60%),#0b0f17;
 border:1px solid rgba(160,200,255,.22);border-bottom:0;border-radius:18px 18px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.06);animation:bhU .24s cubic-bezier(.2,.9,.3,1);overflow:hidden}
@keyframes bhU{from{transform:translateY(46px);opacity:.3}}
.bh .cn{position:absolute;width:16px;height:16px;border:2px solid var(--ac);pointer-events:none;z-index:3;filter:drop-shadow(0 0 4px var(--ac))}
.bh .cn.a{top:8px;left:8px;border-right:0;border-bottom:0}.bh .cn.b{top:8px;right:8px;border-left:0;border-bottom:0}
.bhTop{padding:12px 16px 8px;border-bottom:1px solid rgba(160,200,255,.12);position:relative}
.bhGrip{width:42px;height:4px;border-radius:9px;background:rgba(160,200,255,.3);margin:0 auto 10px}
.bhK{font:700 10px/1 ui-monospace,Menlo,Consolas,monospace;letter-spacing:2px;color:var(--ac);opacity:.9}
.bhH{display:flex;align-items:center;gap:8px;margin-top:4px}.bhH b{font-size:18px;font-weight:900;letter-spacing:.3px}
.bhH{padding-right:40px}.bhH .pd{margin-left:auto;font:700 11px ui-monospace,Menlo,monospace;color:#9fd8ff;border:1px solid rgba(110,200,255,.45);padding:3px 8px;clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);background:rgba(60,150,255,.10);white-space:nowrap}
.bhX{position:absolute;top:12px;right:14px;width:30px;height:30px;border:1px solid rgba(160,200,255,.3);background:rgba(255,255,255,.04);color:#cfe0f5;font-size:15px;cursor:pointer;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.bhS{display:flex;align-items:center;gap:8px;margin-top:10px;padding:8px 10px;border:1px solid rgba(160,200,255,.2);background:rgba(0,0,0,.35);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.bhBg .bh .bhS input,.bhBg .bh .bhS input:focus{-webkit-appearance:none;appearance:none;outline:none!important;border-color:transparent!important;background:transparent!important;box-shadow:none!important}.bhS input{flex:1;min-width:0;border:0!important;background:none!important;box-shadow:none!important;color:#e9eef6;font:inherit;font-size:14px;outline:none;padding:0!important;margin:0!important;height:auto!important;border-radius:0!important}.bhS input::placeholder{color:#6f8096}
.bhMain{display:flex;flex-direction:column;flex:1 1 auto;min-height:0}
.bhBody{overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y;padding:8px 14px calc(18px + env(safe-area-inset-bottom));flex:1 1 auto;min-height:0;scrollbar-width:thin}
.bhL{display:flex;align-items:center;gap:8px;margin:12px 2px 7px;font:800 11px ui-monospace,Menlo,monospace;letter-spacing:1.5px;color:#8fa4bf}
.bhL:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(160,200,255,.3),transparent)}
.bhMine{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.bhMine::-webkit-scrollbar{display:none}
.bhMc{flex:0 0 auto;display:flex;align-items:center;gap:7px;padding:5px 11px 5px 5px;border:1px solid var(--ac);background:linear-gradient(90deg,color-mix(in srgb,var(--ac) 22%,transparent),rgba(0,0,0,.3));color:#fff;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
.bhMc .bhT{width:34px;height:23px}.bhMc i{font-style:normal;font:900 13px ui-monospace,Menlo,monospace;color:#ffd76a;text-shadow:0 0 8px rgba(255,215,106,.6)}
.bhNone{font-size:12px;color:#7a8aa0;padding:4px 2px}
.bhTabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:10px 0 2px}.bhTabs::-webkit-scrollbar{display:none}
.bhTab{flex:0 0 auto;display:flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid rgba(160,200,255,.2);background:rgba(255,255,255,.03);color:#b8c6d8;font:inherit;font-size:13px;font-weight:700;cursor:pointer;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);white-space:nowrap}
.bhTab .c{font:700 10.5px ui-monospace,Menlo,monospace;opacity:.6}
.bhTab.on{color:#08101a;background:var(--ca);border-color:var(--ca);box-shadow:0 0 14px color-mix(in srgb,var(--ca) 60%,transparent)}
.bhTab.on .c{opacity:.8}.bhTab.soon{border-style:dashed;opacity:.6}
.bhSoonT{font:800 9px ui-monospace,Menlo,monospace;padding:1px 5px;background:#ff7ac8;color:#2a0a1e;letter-spacing:.5px}
.bhG{display:flex;flex-direction:column;gap:7px}
.bhR{--ca:#e8b54a;position:relative;display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px 8px 12px;border:1px solid rgba(160,200,255,.14);background:linear-gradient(90deg,color-mix(in srgb,var(--ca) 10%,transparent),rgba(255,255,255,.02) 40%);color:inherit;font:inherit;text-align:left;cursor:pointer;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);transition:background .15s,border-color .15s}
.bhR:before{content:'';position:absolute;left:0;top:10px;bottom:0;width:3px;background:var(--ca);box-shadow:0 0 8px var(--ca)}
.bhR:hover{border-color:color-mix(in srgb,var(--ca) 60%,transparent);background:linear-gradient(90deg,color-mix(in srgb,var(--ca) 20%,transparent),rgba(255,255,255,.03) 50%)}
.bhR.cur{border-color:var(--ca);box-shadow:inset 0 0 18px color-mix(in srgb,var(--ca) 22%,transparent)}
.bhT{position:relative;flex:0 0 auto;display:block;width:54px;height:36px;background:#000 center/cover no-repeat;overflow:hidden;clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);image-rendering:pixelated}
.bhT.bhW .wim{width:100%;height:100%;border-radius:0;box-shadow:none;display:block}
.bhT:after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.18) 0 1px,transparent 1px 3px);pointer-events:none}
.bhN{flex:1;min-width:0}.bhN b{display:block;font-size:14px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bhN small{display:block;font-size:11.5px;color:#93a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bhN small em{font-style:normal;color:#ffd76a}
.bhRt:empty{display:none}.bhRt{flex:0 0 auto;text-align:right;font:700 11px ui-monospace,Menlo,monospace;color:#7f90a6}
.bhMe{display:inline-block;font:900 12px ui-monospace,Menlo,monospace;color:#1a1204;background:#ffd76a;padding:2px 7px;clip-path:polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px);box-shadow:0 0 10px rgba(255,215,106,.6)}
.bhR .t3{display:none}
.bhR.lock{cursor:default;filter:grayscale(.75);opacity:.55}.bhR.lock:hover{background:linear-gradient(90deg,color-mix(in srgb,var(--ca) 10%,transparent),rgba(255,255,255,.02) 40%);border-color:rgba(160,200,255,.14)}
.bhOv{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:12px;padding:10px;border:1px dashed rgba(160,200,255,.3);background:rgba(255,255,255,.02);color:#cfe0f5;font:inherit;font-weight:700;cursor:pointer;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px)}
.bhSide{display:none}
@media (min-width:900px){
 .bhBg{align-items:center}
 .bh{width:min(1040px,94vw);max-height:84vh;border-radius:6px;border-bottom:1px solid rgba(160,200,255,.22);clip-path:polygon(18px 0,100% 0,100% calc(100% - 18px),calc(100% - 18px) 100%,0 100%,0 18px)}
 .bh .cn.c{bottom:8px;left:8px;border-right:0;border-top:0}.bh .cn.d{bottom:8px;right:8px;border-left:0;border-top:0}
 .bhGrip{display:none}
 .bhMain{display:grid;grid-template-columns:200px minmax(0,1fr);flex:1;min-height:0}
 .bhSide{display:flex;flex-direction:column;gap:4px;padding:12px 10px;border-right:1px solid rgba(160,200,255,.12);overflow:auto}
 .bhSide .bhTab{justify-content:space-between;width:100%;padding:10px 12px}
 .bhTabs{display:none}
 .bhG{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
 .bhR{flex-direction:column;align-items:stretch;padding:0;gap:0}.bhR:before{top:0;width:100%;height:2px;bottom:auto}
 .bhR .bhT{width:100%;height:auto;aspect-ratio:3/1;clip-path:none}.bhR .bhT.bhW .wim{height:auto;aspect-ratio:3/2;transform:translateY(-16%)}
 .bhR .bhN{padding:8px 12px 2px}.bhR .bhN small{display:none}
 .bhR .bhRt{position:absolute;top:8px;right:10px;padding:3px 7px;background:rgba(0,0,0,.6);border:1px solid rgba(160,200,255,.25)}
 .bhR .t3{display:block;padding:2px 12px 10px;margin-top:auto}
 .bhR .t3 div{display:flex;justify-content:space-between;gap:8px;font-size:12px;padding:3px 0;border-top:1px dashed rgba(160,200,255,.1)}
 .bhR .t3 div span:first-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#cfdaea}
 .bhR .t3 div span:last-child{font:700 11.5px ui-monospace,Menlo,monospace;color:#8fa4bf}
 .bhR .t3 .r1 span:first-child{color:#ffd76a;font-weight:800}
 .bhR .t3 .em{color:#6f8096;font-size:12px;padding:6px 0}
}
@media (prefers-reduced-motion:reduce){.bh,.bhBg{animation:none}}`;document.head.appendChild(css);

// ---------- วาด ----------
let st={c:null,q:''};
function rowH(x,cur){const c=x.c,I=info(x.id),lock=!!c.soon,f=I.t3[0];
 const sub=lock?'เปิดทำเนียบเร็วๆ นี้':x.id==='rg'?'ทำเนียบแยก · ย้อนกาลน้อยรอบสุด':f?`<em>🥇</em> ${E(f.n)} · ${F(f.s)}`:'ยังว่าง เป็นคนแรกสิ';
 const rt=lock?'<span class="bhSoonT">SOON</span>':I.me>=0?`<span class="bhMe">#${I.me+1}</span>`:I.c>=0?`${I.c} คน`:'';
 const t3=lock?'<div class="em">เร็วๆ นี้</div>':x.id==='rg'?'<div class="em">แตะเพื่อดูทำเนียบผู้ย้อนกาล</div>':I.t3.length?[0,1,2].map(i=>{const e=I.t3[i];return`<div class="r${i+1}"><span>${['🥇','🥈','🥉'][i]} ${e?E(e.n):'ว่าง'}</span><span>${e?F(e.s):''}</span></div>`}).join(''):'<div class="em">ยังไม่มีใครขึ้น เป็นคนแรกสิ</div>';
 return`<button class="bhR${x.id===cur?' cur':''}${lock?' lock':''}" style="--ca:${c.a}" ${lock?'':`onclick="bhGo('${x.id}')"`}>${thumb(x.id)}<span class="bhN"><b>${E(x.n)}</b><small>${sub}</small></span><span class="bhRt">${rt}</span><span class="t3">${t3}</span></button>`}
function body(){const cur=curId(),q=st.q.trim().toLowerCase();let h='';
 if(q){const L=ALL.filter(x=>(x.n+' '+x.q+' '+x.c.n).toLowerCase().includes(q));h+=`<div class="bhL">ผลค้นหา ${L.length}</div>`+(L.length?`<div class="bhG">${L.map(x=>rowH(x,cur)).join('')}</div>`:'<div class="bhNone">ไม่เจอทำเนียบที่ตรงกับคำนี้</div>');return h}
 const mine=ALL.filter(x=>!x.c.soon).map(x=>({x,I:info(x.id)})).filter(o=>o.I.me>=0).sort((a,b)=>a.I.me-b.I.me);
 h+=`<div class="bhL">ทำเนียบที่ฉันติดอันดับ · ${PNN[per()]}</div>`+(mine.length?`<div class="bhMine">${mine.map(o=>`<button class="bhMc" style="--ac:${o.x.c.a}" onclick="bhGo('${o.x.id}')">${thumb(o.x.id)}${E(o.x.n)} <i>#${o.I.me+1}</i></button>`).join('')}</div>`:'<div class="bhNone">ยังไม่ติดอันดับไหนเลย จบชีวิตสักชีวิตแล้วกลับมาดูนะ</div>');
 const C=CAT.find(c=>c.k===st.c)||catOf(cur);
 h+=`<div class="bhTabs">${tabs(C)}</div><div class="bhL">${C.ic} ${C.n}${C.soon?' · เร็วๆ นี้':''}</div><div class="bhG">${C.L.map(x=>rowH({id:x[0],n:x[1],q:x[2],c:C},cur)).join('')}</div>`;
 h+=`<button class="bhOv" onclick="bhGo('ov')">📊 ภาพรวมอันดับ 1 ของทุกทำเนียบ</button>`;return h}
function tabs(C){return CAT.map(c=>`<button class="bhTab${c===C?' on':''}${c.soon?' soon':''}" style="--ca:${c.a}" onclick="bhCat('${c.k}')"><span>${c.ic} ${c.n}</span>${c.soon?'<span class="bhSoonT">SOON</span>':`<span class="c">${c.L.length}</span>`}</button>`).join('')}
function paint(){const b=document.querySelector('.bhBg');if(!b)return;const C=CAT.find(c=>c.k===st.c)||catOf(curId());const bd=b.querySelector('.bhBody'),sd=b.querySelector('.bhSide');if(sd)sd.innerHTML=tabs(C);if(bd){const y=bd.scrollTop;bd.innerHTML=body();bd.scrollTop=st.keep?y:0;st.keep=0}b.querySelector('.bh').style.setProperty('--ac',C.a)}
window.bhCat=function(k){st.c=k;st.q='';const i=document.querySelector('.bhS input');if(i)i.value='';T_(()=>sfx('click'));paint()};
window.bhGo=function(id){document.querySelectorAll('.bhBg').forEach(x=>x.remove());T_(()=>sfx('click'));if(typeof bdGo==='function')bdGo(id)};
const sheet=function(){document.querySelectorAll('.bdSheetBg,.bhBg').forEach(x=>x.remove());st={c:catOf(curId()).k,q:''};const p=per();
 const bg=document.createElement('div');bg.className='bhBg';bg.onclick=e=>{if(e.target===bg)bg.remove()};
 bg.innerHTML=`<div class="bh" role="dialog" aria-label="เลือกทำเนียบ"><i class="cn a"></i><i class="cn b"></i><i class="cn c"></i><i class="cn d"></i>
 <div class="bhTop"><div class="bhGrip"></div><div class="bhK">◤ RANKING BOARD</div><div class="bhH"><b>เลือกทำเนียบ</b><span class="pd">${PNN[p]} · รีเซ็ตใน ${left(p)}</span></div>
 <div class="bhS">🔎<input type="search" placeholder="ค้นหา เช่น ซอมบี้ หมอก นรก" oninput="bhQ(this.value)" aria-label="ค้นหาทำเนียบ"></div><button class="bhX" onclick="this.closest('.bhBg').remove()" aria-label="ปิด">✕</button></div>
 <div class="bhMain"><div class="bhSide"></div><div class="bhBody"></div></div></div>`;
 document.body.appendChild(bg);paint()};
// late.js (late95) โหลดทีหลังได้ → ล็อก bdSheet ไว้เป็นตัวนี้ ไม่ให้ตัวเก่าเขียนทับ
try{Object.defineProperty(window,'bdSheet',{configurable:true,get(){return sheet},set(v){}})}catch(e){window.bdSheet=sheet}
window.bhQ=function(v){st.q=String(v||'');paint()};
addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.bhBg').forEach(x=>x.remove())});
try{wReady('bdhud')}catch(e){}
})()}catch(e){console.error('bdhud.js',e)}
