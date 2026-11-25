// ============================================================
// /w/hall.js 🏯 หอผู้ก่อตั้ง ดีไซน์ใหม่ (จอคอม + มือถือ)
//  - ห่อ window.vipWall: หลังโหลดเสร็จ วาด #vipWallL ใหม่ — หัวหอ+สถิติ · แผงซ้าย (ป้ายของฉัน · ธูปมากสุด · ชวนสนับสนุน)
//    · กริดป้ายไม้หัวโค้ง (คอม 6 คอลัมน์ / มือถือ 2) · เรียง ลำดับ/ธูปมากสุด/ล่าสุด · ค้นหาชื่อ · จุดธูป (api vipinc)
//  - แก้คำจารึก = vipMenu() (ช่อง vipW เดิม) · แท็บหอผู้ก่อตั้ง/ผู้สนับสนุน (.hlTabs) และปุ่มปิดเดิมคงไว้
// ============================================================
(function(){
if(window._hall)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dT=ms=>{try{return new Date(ms).toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'2-digit'})}catch(e){return''}};
let L=[],sortK='o',q='';
const css=`
html body #mask #modal.hall2,html body.desk #mask #modal.hall2.dkM:not([data-k]),html body.desk #mask #modal.hall2.dkM,html body.desk #mask #modal.hall2.dkL,html body.desk #mask #modal.hall2.mWide{width:min(1240px,calc(100vw - 32px))!important;max-width:none!important;background:radial-gradient(120% 60% at 50% 0%,#3a2210,#120d08 62%)!important;border-color:#6a4a24!important;color:#f6ecd8}
#modal.hall2>h3,#modal.hall2>p.tag2,#modal.hall2>.vx-wallhd{display:none!important}
html body #modal.hall2 #vipWallL{display:block!important;grid-template-columns:none!important;width:100%!important}
#modal.hall2 .hlTabs{margin:0 52px 10px 0}
.h2Hd{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:4px 0 14px;border-bottom:1px solid #4a3520;margin-bottom:16px}
.h2Hd .tt{flex:1;min-width:240px;display:flex;flex-direction:column;gap:2px}
.h2Hd .tt b{font-family:'Charm','Itim',serif;font-size:36px;color:#e8c46a;line-height:1.1}
.h2Hd .tt span{color:#b9a684;font-size:13px}
.h2St{display:flex;gap:8px}
.h2St div{display:flex;flex-direction:column;align-items:center;padding:8px 14px;border-radius:12px;background:#1c140c;border:1px solid #4a3520}
.h2St b{font-size:20px;color:#e8c46a;line-height:1.2}.h2St span{font-size:11.5px;color:#b9a684}
.h2Bd{display:flex;gap:22px;align-items:flex-start}
.h2As{width:270px;flex:none;display:flex;flex-direction:column;gap:12px;position:sticky;top:0}
.h2Bx{padding:14px;border-radius:16px;background:#1c140c;border:1px solid #4a3520;display:flex;flex-direction:column;gap:8px}
.h2Bx>b{color:#e8c46a}
.h2Bx.me{border-color:#e8c46a99}
.h2Bx .tp{display:flex;align-items:center;gap:10px;padding:6px 0;border-top:1px solid #4a3520;font-size:13px}
.h2Bx .tp b{width:20px;color:#e8c46a}.h2Bx .tp span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.h2Bx .tp small{color:#b9a684}
.h2Bx .lk{height:38px;border-radius:10px;border:1px solid #4a3520;background:#2a1c10;color:#f6ecd8;font:inherit;font-size:13px;cursor:pointer}
.h2Bx .lk:hover{border-color:#e8c46a}
.h2Mn{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px}
.h2Tb{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.h2Tb button{padding:7px 16px;border-radius:99px;border:1px solid #4a3520;background:transparent;color:#f6ecd8;font:inherit;font-size:14px;cursor:pointer}
.h2Tb button.on{background:#e8c46a;border-color:#e8c46a;color:#120d08;font-weight:700}
.h2Tb input{margin-left:auto;width:240px;max-width:100%;height:38px;border-radius:12px;background:#1c140c;border:1px solid #4a3520;color:#f6ecd8;padding:0 12px;font:inherit}
.h2Gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px;padding-top:12px}
.h2T{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:16px 10px 12px;border-radius:70px 70px 10px 10px;background:linear-gradient(180deg,#3a2614,#1f150c);border:1px solid #4a3520;box-shadow:inset 0 0 0 4px #00000033,0 6px 16px rgba(0,0,0,.4);text-align:center;min-width:0}
.h2T.mine{border:2px solid #e8c46a}
.h2T .mt{position:absolute;top:-10px;padding:1px 10px;border-radius:99px;background:#e8c46a;color:#120d08;font-size:11px;font-weight:700}
.h2T .lo{font-size:11px;color:#b9a684}.h2T .no{font-family:'Charm','Itim',serif;font-size:24px;color:#e8c46a;line-height:1}
.h2T .nm{font-size:14px;font-weight:700;color:#f6ecd8;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;gap:4px}
.h2T .dt{font-size:11px;color:#b9a684}.h2T .ws{font-size:12px;color:#e6d6b4;font-style:italic;min-height:17px;overflow-wrap:anywhere}
.h2T .sk{display:flex;gap:4px;justify-content:center;height:24px;align-items:flex-end}
.h2T .sk i{width:3px;height:22px;border-radius:2px;background:#8a7550}
.h2T .sk.lit i{background:linear-gradient(180deg,#ffb04a 0 4px,#c9a36a 4px);box-shadow:0 -4px 8px #ff9a3a}
.h2T .ib{display:flex;align-items:center;gap:6px;padding:5px 14px;border-radius:99px;border:0;background:#a8321f;color:#fff;font:inherit;font-size:12px;cursor:pointer}
.h2T .ib:disabled{background:#3a2a14;color:#b9a684;cursor:default}
.h2T.big .no{font-size:30px}.h2T.big .nm{font-size:17px}
.h2Em{padding:30px;text-align:center;color:#b9a684}
@media (max-width:820px){#h2St{width:100%}.h2Bd{flex-direction:column}.h2As{width:100%;position:static}.h2Gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.h2Tb input{margin-left:0;width:100%}.h2Mn{order:-1}.h2Hd .tt b{font-size:30px}.h2St{width:100%}.h2St div{flex:1}}
`;
function tab(r,big){
 const n=Math.min(5,Math.max(1,Math.ceil((r.c||0)/6)));
 return `<div class="h2T${r.k?' mine':''}${big?' big':''}" data-o="${r.o}">${r.k&&!big?'<span class="mt">ป้ายของฉัน</span>':''}<span class="lo">ลำดับที่</span><b class="no">${r.o}</b>
 <span class="nm">${r.pu?`<span class="pfav hlpf hlpfw" data-pu="${E(r.pu)}"></span>`:''}${E(r.n||'ไม่ระบุนาม')}</span><span class="dt">${dT(r.t)}</span><span class="ws">${r.w?E(r.w):'—'}</span>
 <span class="sk${r.m?' lit':''}">${'<i></i>'.repeat(n)}</span><button type="button" class="ib" ${r.m?'disabled':''} onclick="h2Inc(${r.o},this)">${r.m?'จุดแล้ว':'จุดธูป'} · ${r.c||0}</button></div>`}
function grid(){
 const g=$('h2Gr');if(!g)return;let a=L.slice();
 if(q)a=a.filter(r=>String(r.n||'').toLowerCase().includes(q)||String(r.o)===q);
 if(sortK==='c')a.sort((x,y)=>(y.c||0)-(x.c||0)||x.o-y.o);else if(sortK==='t')a.sort((x,y)=>(y.t||0)-(x.t||0));else a.sort((x,y)=>x.o-y.o);
 g.innerHTML=a.length?a.map(r=>tab(r)).join(''):'<div class="h2Em">ไม่พบป้ายที่ค้นหา</div>'}
function side(){
 const me=L.find(r=>r.k),top=L.slice().sort((x,y)=>(y.c||0)-(x.c||0)).slice(0,3);
 return (me?`<div class="h2Bx me"><b>ป้ายของฉัน</b>${tab(me,1)}<button type="button" class="lk" onclick="vipMenu()">แก้คำจารึกบนป้าย</button></div>`:'')
 +(top.length?`<div class="h2Bx"><b>ธูปมากที่สุด</b>${top.map((r,i)=>`<div class="tp"><b>${i+1}</b><span>${E(r.n||'ไม่ระบุนาม')}</span><small>${r.c||0} ก้าน</small></div>`).join('')}</div>`:'')
 +(me?'':`<div class="h2Bx"><span style="font-size:13px;color:#b9a684;line-height:1.5">อยากมีป้ายในหอ? สนับสนุนแบบผู้ก่อตั้งได้เลย</span><button type="button" class="lk" onclick="vipMenu()">สนับสนุนเกม</button></div>`)}
function stats(){const tot=L.reduce((s,r)=>s+(+r.c||0),0),mine=L.filter(r=>r.m).length;
 return `<div class="h2St"><div><b>${L.length}</b><span>ผู้ก่อตั้ง</span></div><div><b>${tot.toLocaleString()}</b><span>ธูปทั้งหมด</span></div><div><b>${mine}</b><span>คุณจุดแล้ว</span></div></div>`}
function draw(){
 const m=$('modal'),el=$('vipWallL');if(!m||!el)return;
 m.classList.add('hall2');el.className='';
 el.innerHTML=`<div class="h2Hd"><div class="tt"><b>หอผู้ก่อตั้ง</b><span>ป้ายของผู้ร่วมสร้างเกมนี้ เรียงตามวันที่เข้าร่วม ทุกคนจ่ายเท่ากัน · กดจุดธูปเพื่อคารวะ</span></div><div id="h2St">${stats()}</div></div>
 <div class="h2Bd"><aside class="h2As" id="h2As">${side()}</aside><div class="h2Mn"><div class="h2Tb">${[['o','ตามลำดับเข้าร่วม'],['c','ธูปมากสุด'],['t','ล่าสุด']].map(x=>`<button type="button" data-s="${x[0]}" class="${sortK===x[0]?'on':''}">${x[1]}</button>`).join('')}<input id="h2Q" placeholder="ค้นหาชื่อ" value="${E(q)}"></div>
 <div class="h2Gr" id="h2Gr"></div></div></div>`;
 el.querySelectorAll('.h2Tb button').forEach(b=>b.onclick=()=>{sortK=b.dataset.s;el.querySelectorAll('.h2Tb button').forEach(x=>x.classList.toggle('on',x===b));grid()});
 const i=$('h2Q');if(i)i.oninput=()=>{q=i.value.trim().toLowerCase();grid()};
 grid();try{m.scrollTop=0}catch(e){}}
window.h2Inc=async function(o,b){b.disabled=true;try{const j=await api('vipinc',{o});const r=L.find(x=>x.o===o);if(r){r.m=1;r.c=(j&&j.c)||((r.c||0)+1)}
 grid();const a=$('h2As');if(a)a.innerHTML=side();const s=$('h2St');if(s)s.innerHTML=stats();try{sfx('good')}catch(e){}}catch(e){b.disabled=false;try{toast('จุดธูปไม่สำเร็จ')}catch(x){}}};
function wrap(){
 const ow=window.vipWall;if(typeof ow!=='function'||ow._h2)return false;
 const nw=async function(){const r=await ow.apply(this,arguments);try{const m=$('modal');if(!m||!$('vipWallL'))return r;let j=null;try{j=await api('vipwall')}catch(e){}L=(j&&j.n)||[];q='';
   if(L.length)draw();else m.classList.add('hall2')}catch(e){console.error('hall',e)}return r};
 nw._h2=1;window.vipWall=nw;return true}
const st=document.createElement('style');st.id='hallCss';st.textContent=css;document.head.appendChild(st);
// ลบคลาสเมื่อเปิด modal อื่น
try{const mo=new MutationObserver(()=>{const m=$('modal');if(m&&m.classList.contains('hall2')&&!$('vipWallL'))m.classList.remove('hall2')});const m=$('modal');if(m)mo.observe(m,{childList:true})}catch(e){}
if(!wrap()){let n=0;const t=setInterval(()=>{if(wrap()||++n>40)clearInterval(t)},500)}
setInterval(()=>{const w=window.vipWall;if(typeof w==='function'&&!w._h2)wrap()},3000);
window._hall={draw};
})();
