// ============================================================
// /w/arena2.js ⚔️ ลานหมื่นเงา ภาค 2
//  - วันนี้ในลาน: กฎประจำวัน · คู่อาฆาต (แก้แค้น ×2) · กระดานค่าหัว · บันทึกของเงา · กองรางวัลไต่ลาน (เก็บ/เสี่ยงต่อ)
//  - ร้านเหรียญลานใหม่ (modal arshop2): ท่าเปิดตัว · ท่าปิดเกม · สีเงา (ใหม่) + ฉายา กรอบ ออร่า คำพูด หีบ ตั๋ว ของใช้ ประกันแต้ม · ของประจำสัปดาห์
//  - สมุดสะสมเงา (api arcol) · เอฟเฟกต์ลงสนาม/ปิดเกม · ย้อมสีเงา · กฎตาบอด · แถบสถานะระหว่างดวล · หน้าผลแบบใหม่
//  - เซิร์ฟเวอร์: api/online.js (ar2: rule nem bty wx · ar2res: ins nem bty potAdd potLost · arcash · arcol · arbuy en/fn/dy/ins)
// ============================================================
(function(){
if(window._ar2)return;
const $=id=>document.getElementById(id);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const F=n=>{try{return fmt(n)}catch(e){return String(n)}};
const LSg=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSs=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const NEW={
 en:{mist:['🌫️','ก้าวออกจากหมอก','เงาเดินออกจากม่านหมอกช้า ๆ',150],fall:['☄️','ร่วงจากฟ้า','กระแทกพื้นจนฝุ่นฟุ้ง',260],shade:['🕳️','ผุดจากเงา','โผล่ขึ้นจากเงาดำใต้พื้น',200],lotus:['🪷','บัวผลิ','กลีบบัวหมุนเปิดออกเผยตัว',300]},
 fn:{plum:['🌸','ดอกเหมยปลิว','ชนะแล้วกลีบดอกไม้โปรยทั้งจอ',150],ink:['🖌️','หมึกสาด','หมึกดำสาดเต็มจอแล้วจางหาย',220],crack:['💥','จอแตก','ภาพแตกเป็นเสี่ยงตอนจบ',320],bolt:['⚡','ฟ้าผ่ากลางลาน','ฟ้าผ่าลงกลางสนาม จอสั่น',380]},
 dy:{blood:['🩸','เงาโลหิต','ย้อมเงาเป็นสีแดงเข้ม',120],gold:['✨','เงาทองคำ','ทั้งตัวเป็นทองอร่าม',200],ghost:['👻','เงาโปร่งแสง','ซีดจางเหมือนวิญญาณ',220],inv:['🔲','เงากลับสี','ขาวโพลนเหมือนภาพเนกาทีฟ',250]}
};
const CATN={en:'ท่าเปิดตัว',fn:'ท่าปิดเกม',dy:'สีเงา'};
const DYE={blood:{robe:'#8a1020',belt:'#3a0008',hair:'#2a0006'},gold:{robe:'#c9a030',belt:'#fff0a0',hair:'#7a5a10',skin:'#e8c878'},ghost:{robe:'#cfe2f5',belt:'#a8c0e0',hair:'#e8f2ff',skin:'#dce8f4'},inv:{robe:'#f2f2f2',belt:'#141414',hair:'#f2f2f2',skin:'#ffffff'}};
const RULE_IC={blind:'🙈',soft:'🕊️',rich:'💰',under:'🐭',fury:'🔥',calm:'🍃'};
const wal=()=>window.AR2W||{};
const own=()=>{try{return(window.AR_CB&&AR_CB.own)||LSg('murim_arown',{})||{}}catch(e){return{}}};
const owns=(k,id)=>((own()[k])||[]).includes(id);
const sel=()=>{try{return arSel()}catch(e){return LSg('murim_arsel',{})||{}}};
const setSel=(k,v)=>{const s=Object.assign({},sel());if(v)s[k]=v;else delete s[k];LSs('murim_arsel',s)};
const coins=()=>{try{return arC()}catch(e){return 0}};
// ---------- เก็บข้อมูลกระเป๋า (pot/ins) ----------
{const o=window.arWalApply;if(typeof o==='function')window.arWalApply=arWalApply=function(w){const r=o.apply(this,arguments);try{if(w)window.AR2W={pot:w.pot|0,ins:w.ins?1:0,stk:w.stk|0}}catch(e){}return r}}
// ---------- snapshot: ใส่ของแต่งเงา ----------
{const o=window.arSnap||arSnap;const nw=function(){const r=o.apply(this,arguments);try{const s=sel();for(const k of ['en','fn','dy'])if(s[k]&&owns(k,s[k]))r[k]=s[k]}catch(e){}return r};try{arSnap=nw}catch(e){}window.arSnap=nw}
// ---------- เอฟเฟกต์ ----------
function fx(kind,id,label,cb){try{const d=document.createElement('div');d.className=`ar2fx ar2-${kind}-${id}`;d.innerHTML=`<i class="a"></i><i class="b"></i><i class="c"></i>${label?`<b class="lb">${E(label)}</b>`:''}`;
 if(kind==='fn'&&id==='plum'||kind==='en'&&id==='lotus')d.insertAdjacentHTML('beforeend',Array.from({length:18},(_,i)=>`<s style="--x:${(i*37)%100}%;--d:${(i%6)*.12}s;--r:${(i*47)%360}deg"></s>`).join(''));
 document.body.appendChild(d);if(kind==='fn'&&(id==='crack'||id==='bolt'))document.body.classList.add('ar2shake');
 setTimeout(()=>{d.remove();document.body.classList.remove('ar2shake');cb&&cb()},1700)}catch(e){cb&&cb()}}
window.ar2Fx=fx;
const dyeLook=(look,dy)=>{if(!dy||!DYE[dy]||!look)return look;try{const L=JSON.parse(JSON.stringify(look));Object.assign(L,DYE[dy]);return L}catch(e){return look}};
{const o=window.arDraw||arDraw;const nw=function(id,look){try{if(id==='arCvA')look=dyeLook(look,sel().dy&&owns('dy',sel().dy)?sel().dy:'');else if(id==='arCvB'&&AR.cur0)look=dyeLook(look,AR.cur0.dy)}catch(e){}return o.call(this,id,look)};try{arDraw=nw}catch(e){}window.arDraw=nw}
// ---------- ก่อนสู้: กฎตาบอด ----------
{const o=window.arPre||arPre;const nw=function(ob,au,j){try{if(j&&j.rule)window.AR2R=j.rule}catch(e){}const r=o.apply(this,arguments);try{const ru=(window.AR2R||[])[0],m=$('modal');
  if(ru==='blind'&&m){const vs=m.querySelectorAll('.arvs>div');if(vs[2]){const sm=vs[2].querySelector('small');if(sm)sm.textContent='???'}m.querySelectorAll('.item .px').forEach(x=>x.textContent='???')}
  if(m){const it=m.querySelector('.item');const chips=[];const R=window.AR2R;if(R)chips.push(`<span class="ar2chip c">${RULE_IC[R[0]]||'📜'} กฎวันนี้: ${E(R[1])}</span>`);const N=(AR.info||{}).nem;if(N&&N.n===ob.n)chips.push('<span class="ar2chip p">⚔ คู่อาฆาต · ชนะได้แต้ม ×2</span>');if(ob.bty)chips.push(`<span class="ar2chip g">💰 ค่าหัว ${ob.bty} เหรียญ</span>`);
   if(ob.en&&NEW.en[ob.en])chips.push(`<span class="ar2chip">${NEW.en[ob.en][0]} ลงสนามแบบ ${E(NEW.en[ob.en][1])}</span>`);if(chips.length&&it)it.insertAdjacentHTML('beforebegin',`<div class="ar2chips">${chips.join('')}</div>`)}}catch(e){}return r};try{arPre=nw}catch(e){}window.arPre=nw}
// ---------- เริ่มดวล: เอฟเฟกต์ลงสนาม + แถบสถานะ ----------
function hud(o){try{let h=$('ar2Hud');if(!h){h=document.createElement('div');h.id='ar2Hud';document.body.appendChild(h)}const R=window.AR2R,N=(AR.info||{}).nem,w=wal();
 h.innerHTML=[R?`<span class="ar2chip c">${RULE_IC[R[0]]||'📜'} ${E(R[1])}</span>`:'',N&&o&&N.n===o.n?'<span class="ar2chip p">⚔ คู่อาฆาต ×2</span>':'',o&&o.bty?`<span class="ar2chip g">💰 ค่าหัว ${o.bty}</span>`:'',w.pot?`<span class="ar2chip">🏺 กองรางวัล ${w.pot} (แพ้=หาย)</span>`:'',w.ins?'<span class="ar2chip c">🛡️ มีประกันแต้ม</span>':''].join('');h.style.display=h.innerHTML?'flex':'none'}catch(e){}}
function hudOff(){const h=$('ar2Hud');if(h)h.remove()}
{const o=window.arFight||arFight;const nw=function(ob,au){const args=arguments,self=this;if(!ob||ob.train||nw._go)return o.apply(self,args);
  try{if(ob.dy&&ob.look&&!ob._dyed){ob.look=dyeLook(ob.look,ob.dy);ob._dyed=1}}catch(e){}
  const go=()=>{nw._go=1;try{o.apply(self,args)}finally{nw._go=0}if(!au)hud(ob)};
  if(ob.en&&NEW.en[ob.en]&&!ob._enDone){ob._enDone=1;fx('en',ob.en,`เงาของ ${ob.n} ลงสนาม`,go)}else go()};try{arFight=nw}catch(e){}window.arFight=nw}
// ---------- หน้าผลแบบใหม่ ----------
const DIA_W=['…ข้าประมาทไปเอง ครั้งหน้าไม่มีแบบนี้อีก','จำหน้ามันไว้แล้ว','ท่านั้น… ข้าต้องฝึกรับให้ได้','ยังไม่จบหรอก'],DIA_L=['เจ้ายังอ่อนนัก กลับไปฝึกมาใหม่','อีกร้อยปีค่อยมาใหม่','ข้าเห็นท่าเจ้าตั้งแต่ก้าวแรก'];
{const o=window.arResult||arResult;const nw=async function(ob,au,w){hudOff();const r=await o.apply(this,arguments);try{const x=window._arRes,m=$('modal');if(!m||m.dataset.k!=='arres'||!ob||ob.train)return r;
  const win=!!(x&&x.sw!=null?x.sw:w);
  if(win){const myfn=sel().fn;if(myfn&&owns('fn',myfn))fx('fn',myfn,'')}else if(ob.fn&&NEW.fn[ob.fn])fx('fn',ob.fn,`ท่าปิดเกมของ ${ob.n}`);
  const lg=x&&x.ok?x.lg|0:(AR.info||{}).lg|0,L=AR_LG[lg]||AR_LG[0],nx=lg<7?AR_LG[lg+1]:null,rt=x&&x.ok?x.rt:0,b0=lg?L[3]:900,pr=nx&&rt?Math.max(0,Math.min(100,(rt-b0)/(nx[3]-b0)*100)):100;
  const cards=[];if(x&&x.ok){cards.push([`${x.d>0?'+':''}${x.d}`,'แต้มลาน'+(x.nem?' (แก้แค้น ×2)':x.ins?' (ประกันทำงาน)':''),x.d>=0?'#5fd38d':'#ff6b6b']);cards.push([`+${(x.g||0)+(x.qg||0)+(x.fw||0)+(x.bty||0)}`,'เหรียญ'+(x.bty?` · ค่าหัว ${x.bty}`:''),'#ffd36b']);
   const stk=(x.wal&&x.wal.stk)|0;cards.push([win?`ชนะ ${stk}`:'—',win?'ติดต่อกัน':'สตรีคจบลง','#ff8cc6'])}
  const pot=(x&&x.wal&&x.wal.pot)|0,alive=S&&S.alive,tk=(AR.info&&AR.info.tk&&AR.info.tk.n)|0;
  const dia=win?DIA_W[Math.floor(Math.random()*DIA_W.length)]:DIA_L[Math.floor(Math.random()*DIA_L.length)];
  const h3=m.querySelector('h3');if(h3)h3.style.display='none';
  const hero=document.createElement('div');hero.className='ar2res';hero.innerHTML=`<b class="big ${win?'w':'l'}">${win?'ชนะ!':'พ่ายแพ้'}</b><span class="sub">${win?'ล้ม':'แพ้ให้'}เงาของ ${E(ob.n)}${x&&x.nem?' · แก้แค้นคู่อาฆาตสำเร็จ':''}${x&&x.ins?' · ประกันแต้มช่วยไว้':''}</span>
  ${cards.length?`<div class="cards">${cards.map(c=>`<div><b style="color:${c[2]}">${c[0]}</b><small>${c[1]}</small></div>`).join('')}</div>`:''}
  ${nx&&rt?`<div class="lgb"><div class="t"><span>${L[0]} ${L[1]} → ${nx[0]} ${nx[1]}</span><small>${F(rt)} / ${F(nx[3])}</small></div><div class="bar"><i style="width:${pr}%"></i></div></div>`:''}
  <div class="dia">เงาของ${win?E(ob.n):'คุณ'}บันทึก: "${E(dia)}"</div>
  ${x&&x.potLost?`<div class="pot lost">🏺 กองรางวัล ${x.potLost} เหรียญหายไปกับความพ่ายแพ้</div>`:''}
  ${pot?`<div class="pot"><span>🏺 กองรางวัลไต่ลาน <b>${pot}</b> เหรียญ${x&&x.potAdd?` <small>(+${x.potAdd})</small>`:''}<br><small>เก็บตอนนี้ หรือเสี่ยงสู้ต่อ — แพ้ครั้งเดียวกองหายหมด</small></span><button class="gbtn" onclick="ar2Cash(this)">เก็บกอง</button></div>`:''}
  <div class="acts">${alive&&win&&tk>0?'<button class="pbtn" onclick="arGo(0)">⚔️ สู้ต่อ'+(pot?' · เสี่ยงกอง':'')+'</button>':''}<button class="gbtn" onclick="openOnline(\'arena\')">กลับลานประลอง</button></div>`;
  (h3||m.firstChild).insertAdjacentElement('afterend',hero);
  [...m.children].forEach(c=>{if(c!==hero&&c!==h3&&!c.classList.contains('xbtn')&&!c.classList.contains('arup'))c.classList.add('ar2old')});
  try{if(x&&x.wal)window.AR2W={pot:x.wal.pot|0,ins:x.wal.ins?1:0,stk:x.wal.stk|0}}catch(e){}
 }catch(e){console.error('ar2res',e)}return r};try{arResult=nw}catch(e){}window.arResult=nw}
window.ar2Cash=async function(b){b.disabled=true;try{const j=await api('arcash',{});if(j&&j.wal){try{arWalApply(j.wal)}catch(e){}}toast(`🏺 เก็บกองรางวัล +${(j&&j.got)||0} เหรียญลาน`);const p=b.closest('.pot');if(p)p.innerHTML='<span>🏺 เก็บกองแล้ว</span>';try{sfx('good')}catch(e){}}catch(e){b.disabled=false;toast('เก็บไม่สำเร็จ ลองใหม่')}};
// ---------- หน้าลาน: วันนี้ในลาน ----------
function diary(def){const st=(()=>{try{return arSt()}catch(e){return'atk'}})();const V={atk:['ข้าพุ่งเข้าใส่','ข้าฟาดไม่ยั้ง'],def:['ข้ายืนรอจังหวะ','ข้าตั้งการ์ดแน่น'],trick:['ข้าหลอกล่อมัน','ข้าแกล้งเปิดช่อง'],all:['ข้าทุ่มสุดตัว','ข้าเดิมพันหมัดเดียว']}[st]||['ข้าสู้'];
 return(def||[]).slice(0,3).map((e,i)=>{const v=V[i%V.length];return e.w?`${v} ${E(e.n)} จนมันถอยกลับไป`:`${E(e.n)} เร็วกว่าที่คิด ${v}แต่พลาด… ข้าจำหน้ามันไว้แล้ว`})}
function today(j){const R=j.rule,N=j.nem,B=j.bty||[],w=wal(),alive=S&&S.alive,D=diary(j.def);
 return`<div class="ar2t">
 ${R?`<div class="ar2rule"><span class="ic">${RULE_IC[R[0]]||'📜'}</span><span><small>กฎประจำวันของลาน</small><b>${E(R[1])}</b><small>${E(R[2])}</small></span></div>`:''}
 <div class="ar2g">
 <div class="ar2bx nem"><b>⚔ คู่อาฆาต</b>${N?`<span class="nm">${E(N.n)}</span><small>ชนะคุณ ${N.c} ครั้งสัปดาห์นี้ · ล้มมันได้แต้ม ×2</small>${N.i>=0&&alive?`<button class="pbtn" onclick="arRv(${N.i})">⚔️ แก้แค้นเลย</button>`:'<small>เจอกันในลานเมื่อไหร่ แต้ม ×2 อัตโนมัติ</small>'}`:'<small>ยังไม่มีใครเป็นคู่อาฆาต — ใครชนะคุณ 2 ครั้งขึ้นไปจะขึ้นที่นี่</small>'}</div>
 <div class="ar2bx bty"><b>💰 ประกาศจับ</b>${B.length?B.map(e=>`<div class="r${e.me?' me':''}"><span>${E(e.n)}${e.me?' (คุณ)':''}</span><small>ชนะติด ${e.s}</small><b>${e.v}</b></div>`).join(''):'<small>ยังไม่มีใครชนะติด 3 ครั้ง</small>'}<small>ชนะติด 3 ครั้งขึ้นไปจะติดประกาศ · ใครล้มได้รับค่าหัว</small></div>
 <div class="ar2bx dia"><b>📓 บันทึกของเงา</b>${D.length?D.map(t=>`<p>“${t}”</p>`).join(''):'<small>ยังไม่มีใครมาท้า เงายังไม่มีอะไรจะเล่า</small>'}</div>
 <div class="ar2bx pot"><b>🏺 กองรางวัลไต่ลาน</b><span class="nm">${w.pot|0} เหรียญ</span><small>ชนะติดกัน (สู้เอง) โบนัสจะเข้ากอง ×2 · แพ้ครั้งเดียวกองหาย</small>${w.pot?'<button class="gbtn" onclick="ar2Cash(this)">เก็บกอง</button>':''}${w.ins?'<small>🛡️ มีประกันแต้มรอใช้</small>':''}</div>
 </div>
 <div class="ar2nav"><button class="pbtn" onclick="ar2Shop()">🛒 ร้านเหรียญลาน</button><button class="gbtn" onclick="ar2Col()">📚 สมุดสะสมเงา</button></div></div>`}
{const o=window.arPage||arPage;const nw=async function(){const r=await o.apply(this,arguments);try{const box=$('arBox'),j=AR.info;if(!box||!j)return r;
  try{const c=await api('arcoin',{});if(c&&c.wal)arWalApply(c.wal)}catch(e){}
  if(j.rule)window.AR2R=j.rule;const old=box.querySelector('.ar2t');if(old)old.remove();
  const hero=box.querySelector('.arhero');(hero||box.firstChild)&&(hero?hero.insertAdjacentHTML('afterend',today(j)):box.insertAdjacentHTML('afterbegin',today(j)));
  box.querySelectorAll('.arsh2,.arshop').forEach(e=>{e.style.display='none';const h=e.previousElementSibling;if(h&&h.tagName==='H4'&&/ร้าน/.test(h.textContent))h.style.display='none'})
 }catch(e){console.error('ar2page',e)}return r};try{arPage=nw}catch(e){}window.arPage=nw}
// ---------- ร้านเหรียญลานใหม่ ----------
let shopCat='all';
function prev(k,id){return`<span class="ar2pv ar2pv-${k}-${id}"><i></i><i></i><i></i></span>`}
function newCard(k,id){const it=NEW[k][id],o=owns(k,id),on=sel()[k]===id,wx=(AR.info||{}).wx,lock=['bolt','ghost','lotus','crack'].includes(id)&&wx!==id&&!o;
 return`<div class="ar2it${wx===id?' wk':''}"><div class="pv">${prev(k,id)}${wx===id?'<span class="tg w">สัปดาห์นี้</span>':lock?'<span class="tg">ของประจำสัปดาห์ · หมุนเวียน</span>':''}<button class="pl" aria-label="ดูตัวอย่าง" onclick="ar2Fx('${k}','${id}','ตัวอย่าง')">▶</button></div>
 <div class="bd"><b>${it[0]} ${it[1]}</b><small>${it[2]}</small><div class="ft"><span class="cn">${it[3]}</span>${o?`<button class="${on?'gbtn':'pbtn'}" onclick="ar2Eq('${k}','${on?'':id}')">${on?'ใส่อยู่ · ถอด':'ใส่'}</button>`:`<button class="pbtn" ${lock||coins()<it[3]?'disabled':''} onclick="ar2Buy('${k}','${id}',${it[3]},this)">${lock?'ยังไม่วาง':'ซื้อ'}</button>`}</div></div></div>`}
function oldCards(cat){const o=(()=>{try{return arOwn()}catch(e){return{tt:[],au:[]}}})(),c=coins(),s=sel(),d=(()=>{try{return frGet()}catch(e){return{own:[]}}})(),alive=S&&S.alive;const B=(dis,lab,on,p)=>`<button class="${p?'pbtn':'gbtn'}" ${dis?'disabled':''} onclick="${on};setTimeout(ar2Shop,250)">${lab}</button>`;const card=(ic,n,dsc,price,btn)=>`<div class="ar2it"><div class="pv plain"><span class="em">${ic}</span></div><div class="bd"><b>${n}</b><small>${dsc}</small><div class="ft"><span class="cn">${price}</span>${btn}</div></div></div>`;const out=[];
 if(cat==='all'||cat==='au')try{Object.entries(AR_AU).forEach(([k,[ic,n,cost]])=>{const ow=o.au.includes(k),on=s.au===k;out.push(card(ic,n,'ออร่ารอบตัวเงา',cost,ow?B(0,on?'ใส่อยู่ · ถอด':'ใส่',`arAuSet('${on?'':k}')`):B(c<cost,'ซื้อ',`arBuy2('au','${k}',${cost})`,1)))})}catch(e){}
 if(cat==='all'||cat==='tt')try{AR_TT.forEach(([t,r,cost])=>{const ow=o.tt.includes(t);out.push(card('🏷️',`ฉายา「${E(t)}」`,'ใส่โชว์ในแชทได้ถาวร',cost,ow?B(0,'โชว์ฉายานี้',`setShowTtl('${t}',${r},'ar')`):B(c<cost,'ซื้อ',`arBuy2('tt','${t}',${cost})`,1)))})}catch(e){}
 if(cat==='all'||cat==='fr')try{[['f_arc1',40],['f_arc2',120],['f_arc3',250],['f_arc4',400],['f_arc5',1000]].forEach(([id,cost])=>{const f=frOf(id);if(!f)return;const ow=d.own.includes(id);out.push(`<div class="ar2it"><div class="pv plain"><span class="fr">${frWrap(`<span class="frph">${d.av?`<img loading="lazy" src="${d.av}">`:'🙂'}</span>`,id)}</span></div><div class="bd"><b>${E(f.n)}</b><small>กรอบรูปโปรไฟล์</small><div class="ft"><span class="cn">${cost}</span>${ow?(d.eq===id?'<span class="tag2">ใส่อยู่</span>':B(0,'ใส่',`frEquip('${id}')`)):B(c<cost,'ซื้อ',`arBuy2('fr','${id}',${cost})`,1)}</div></div></div>`)})}catch(e){}
 if(cat==='all'||cat==='qt')out.push(card('💬','คำพูดเงา','ประโยคเปิดฉาก + ตอนชนะ',50,o.qt?B(0,'ตั้งคำพูด','arQuoteEd()'):B(c<50,'ซื้อ',`arBuy2('qt','qt',50)`,1)));
 if(cat==='all'||cat==='use'){const w=wal();out.push(card('🛡️','ประกันแต้ม','แพ้ครั้งถัดไปไม่เสียแต้ม (มีได้ทีละ 1)',25,w.ins?'<span class="tag2">มีอยู่แล้ว</span>':`<button class="pbtn" ${c<25?'disabled':''} onclick="ar2Buy('use','ins',25,this)">ซื้อ</button>`));
  out.push(card('🎫','ตั๋วเสริม +1','แลกได้วันละ 2 ใบ',20,B(c<20,'ซื้อ','arTkBuy()',1)));
  [['🧪','ยาฟื้นฟูเต็ม','พลังชีวิตเต็มทันที','heal',8],['🌀','ลูกกลอนลมปราณ','ลมปราณ +2','qi',12],['🍵','ชาสงบจิต','ความสุข +15','joy',6]].forEach(([ic,n,ds,id,cost])=>out.push(card(ic,n,ds+(alive?'':' · ต้องอยู่ระหว่างเล่น'),cost,B(c<cost||!alive,'ซื้อ',`arBuy2('use','${id}',${cost})`,1))))}
 return out.join('')}
window.ar2Shop=function(cat){if(cat)shopCat=cat;const c=coins(),s=sel(),wx=(AR.info||{}).wx,w=wal();
 const cats=[['all','ทั้งหมด'],['en','ท่าเปิดตัว'],['fn','ท่าปิดเกม'],['dy','สีเงา'],['au','ออร่า'],['qt','คำพูด'],['fr','กรอบ'],['tt','ฉายา'],['use','ของใช้']];
 let grid='';if(['all','en','fn','dy'].includes(shopCat))for(const k of ['en','fn','dy'])if(shopCat==='all'||shopCat===k)grid+=Object.keys(NEW[k]).map(id=>newCard(k,id)).join('');
 if(!['en','fn','dy'].includes(shopCat))grid+=oldCards(shopCat);
 let wk='';if(wx){const k=Object.keys(NEW).find(k=>NEW[k][wx]),it=k&&NEW[k][wx];if(it){const o=owns(k,wx);const left=7*864e5-(Date.now()%(7*864e5)),dd=Math.floor(left/864e5),hh=Math.floor(left%864e5/36e5);
  wk=`<div class="ar2wk"><div class="tx"><span class="tg">ของประจำสัปดาห์ · หมดใน ${dd} วัน ${hh} ชม.</span><b>${CATN[k]} · ${it[1]}</b><small>${it[2]} · หมดสัปดาห์แล้วสลับเป็นชิ้นอื่น</small><div class="ft"><span class="cn big">${it[3]}</span>${o?'<span class="tag2">มีแล้ว</span>':`<button class="pbtn" ${c<it[3]?'disabled':''} onclick="ar2Buy('${k}','${wx}',${it[3]},this)">ซื้อเลย</button>`}<button class="gbtn" onclick="ar2Fx('${k}','${wx}','ตัวอย่าง')">▶ ดูตัวอย่าง</button></div></div><div class="pv">${prev(k,wx)}</div></div>`}}
 const mine=[['ท่าเปิดตัว','en'],['ท่าปิดเกม','fn'],['สีเงา','dy']].map(([n,k])=>`<div class="r"><span>${n}</span><b>${s[k]&&NEW[k][s[k]]&&owns(k,s[k])?NEW[k][s[k]][0]+' '+NEW[k][s[k]][1]:'—'}</b></div>`).join('')+`<div class="r"><span>ออร่า</span><b>${(()=>{try{return s.au&&AR_AU[s.au]?AR_AU[s.au][0]+' '+AR_AU[s.au][1]:'—'}catch(e){return'—'}})()}</b></div><div class="r"><span>คำพูดตอนชนะ</span><b>${s.qw?'“'+E(s.qw)+'”':'—'}</b></div>`;
 const pity=LSg('murim_arpity',0)|0;
 modal(`<button class="xbtn" onclick="openOnline('arena')">✕</button><div class="ar2sh">
 <header><div><b class="tt">ร้านเหรียญลาน</b><small>ของที่นี่ไม่เพิ่มพลัง · แต่งเงาให้ทุกคนที่สู้กับคุณจำได้</small></div><span class="bal"><i></i>${F(c)}<small>เหรียญลาน</small></span></header>
 <div class="bd3"><nav class="cats">${cats.map(([k,n])=>`<button class="${shopCat===k?'on':''}" onclick="ar2Shop('${k}')">${n}</button>`).join('')}</nav>
 <main>${shopCat==='all'?wk:''}<div class="grid">${grid}</div></main>
 <aside><div class="box"><b>เงาของฉันตอนนี้</b><div class="mypv"><canvas id="ar2Me" width="112" height="124"></canvas><button class="gbtn" onclick="ar2Fx('en','${s.en&&owns('en',s.en)?s.en:'mist'}','ตัวอย่างการลงสนาม')">▶ ดูตัวอย่างการลงสนาม</button></div>${mine}</div>
 <div class="box chest"><b>🎁 หีบลาน</b><small>ยา · เหรียญ · ของหายาก · กรอบเฉพาะหีบ</small><div class="pity"><span>การันตีของหายาก</span><div class="bar"><i style="width:${pity/20*100}%"></i></div><small>${pity}/20</small></div><button class="pbtn" ${c<30?'disabled':''} onclick="arChest()">เปิดหีบ · 30</button></div></aside></div></div>`,'arshop2');
 setTimeout(()=>{try{arDraw('ar2Me',dyeLook(meLook(),s.dy&&owns('dy',s.dy)?s.dy:''))}catch(e){}},40)};
window.ar2Buy=async function(k,id,cost,b){if(coins()<cost)return toast('เหรียญลานไม่พอ');if(b)b.disabled=true;
 try{const j=await api('arbuy',{k,it:id});if(j&&j.wal)try{arWalApply(j.wal)}catch(e){}
  if(j&&j.ok){if(k!=='use')setSel(k,id);toast(k==='use'?'🛡️ ได้ประกันแต้มแล้ว — แพ้ครั้งถัดไปไม่เสียแต้ม':`ได้ ${NEW[k][id][0]} ${NEW[k][id][1]} · ใส่ให้แล้ว`);try{sfx('good')}catch(e){}if(k!=='use')ar2Fx(k,id,'')}
  else toast(j&&j.err==='coin'?'เหรียญลานไม่พอ':j&&j.err==='own'?'มีอยู่แล้ว':j&&j.err==='week'?'ของชิ้นนี้ยังไม่วางขายสัปดาห์นี้':'ซื้อไม่สำเร็จ')}catch(e){toast('เชื่อมต่อไม่ได้')}ar2Shop()};
window.ar2Eq=function(k,id){setSel(k,id);toast(id?'ใส่แล้ว · มีผลตอนลงสนามครั้งถัดไป':'ถอดแล้ว');ar2Shop()};
// ---------- สมุดสะสมเงา ----------
window.ar2Col=async function(){modal(`<button class="xbtn" onclick="openOnline('arena')">✕</button><h3>📚 สมุดสะสมเงา</h3><div id="ar2ColB"><p class="tag2">กำลังเปิดสมุด…</p></div>`,'arcol');
 let j=null;try{j=await api('arcol',{})}catch(e){}const b=$('ar2ColB');if(!b)return;const L=(j&&j.l)||[];
 const by=AR_LG.slice(0,8).map((g,i)=>L.filter(x=>(x.lg|0)===i).length);
 b.innerHTML=`<p class="tag2">ทุกเงาที่คุณล้มได้ (ไม่นับเงาประจำลาน) จะกลายเป็นการ์ดในสมุด · สะสมให้ครบทุกลีก</p>
 <div class="ar2lgs">${AR_LG.slice(0,8).map((g,i)=>`<span class="${by[i]?'on':''}" style="--c:${g[2]}">${g[0]} ${g[1]}<b>${by[i]}</b></span>`).join('')}</div>
 <p><b>${L.length}</b> เงาในสมุด · ครบ ${by.filter(Boolean).length}/8 ลีก</p>
 ${L.length?`<div class="ar2cards">${L.map(x=>{const g=AR_LG[x.lg|0]||AR_LG[0];return`<div class="cd" style="--c:${g[2]}"><span class="lg">${g[0]}</span><b>${E(x.n)}</b><small>${g[1]}</small><small>${(()=>{try{return new Date(x.t).toLocaleDateString('th-TH',{day:'numeric',month:'short'})}catch(e){return''}})()}</small></div>`}).join('')}</div>`:'<p class="tag2">ยังว่างเปล่า — ลงสนามแล้วล้มเงาของผู้เล่นคนอื่นเพื่อเริ่มสะสม</p>'}`};
// ---------- CSS ----------
const st=document.createElement('style');st.id='ar2Css';st.textContent=`
.ar2t{display:flex;flex-direction:column;gap:10px;margin:10px 0}
.ar2rule{display:flex;gap:12px;align-items:center;padding:10px 14px;border-radius:14px;background:linear-gradient(120deg,#123a4a,#141030);border:1px solid #5ee0ff66;color:#eaf8ff}
.ar2rule .ic{font-size:30px}.ar2rule span{display:flex;flex-direction:column}.ar2rule b{font-size:17px}.ar2rule small{opacity:.8;font-size:12px}
.ar2g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.ar2bx{display:flex;flex-direction:column;gap:5px;padding:10px 12px;border-radius:14px;background:#171430;border:1px solid #352d66;color:#efeaff;min-width:0}
.ar2bx>b{color:#ffd36b;font-size:14px}.ar2bx small{color:#a59fcc;font-size:11.5px;line-height:1.4}.ar2bx .nm{font-size:18px;font-weight:800}
.ar2bx.nem{border-color:#ff5fa888}.ar2bx.nem .nm{color:#ff8cc6}.ar2bx.pot .nm{color:#ffd36b}
.ar2bx.bty .r{display:flex;gap:6px;align-items:center;font-size:13px}.ar2bx.bty .r span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ar2bx.bty .r b{color:#ffd36b}.ar2bx.bty .r.me{color:#ff8cc6}
.ar2bx.dia p{margin:0;font-size:12.5px;font-style:italic;color:#e6dfff;line-height:1.45}
.ar2bx button,#modal .ar2bx .pbtn,#modal .ar2bx .gbtn{margin-top:auto!important;width:100%!important;min-height:0!important;height:auto!important;padding:8px 12px!important;font-size:14px!important;max-width:none!important}
#modal .ar2sh .ft button,#modal .ar2sh .ar2wk .ft button{width:auto!important;min-width:0!important;max-width:none!important;min-height:0!important;height:auto!important;padding:6px 14px!important;font-size:13px!important;display:inline-block!important;margin:0!important}
#modal .ar2sh aside .pbtn,#modal .ar2sh aside .gbtn{width:100%!important;max-width:none!important;min-height:0!important;padding:8px 12px!important;font-size:14px!important;margin:0!important}
#modal .ar2res .acts button,#modal .ar2res .pot button{width:auto!important;max-width:none!important;min-width:0!important;margin:0!important}#modal .ar2res .acts button{flex:1}
.ar2nav{display:flex;gap:8px}.ar2nav button{flex:1}
.ar2chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}
.ar2chip{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;background:#211c42;color:#efeaff;font-size:12px;border:1px solid #352d66}
.ar2chip.c{background:#5ee0ff22;color:#7ef0ff;border-color:#5ee0ff55}.ar2chip.p{background:#ff5fa822;color:#ff8cc6;border-color:#ff5fa855}.ar2chip.g{background:#ffd36b22;color:#ffd36b;border-color:#ffd36b55}
#ar2Hud{position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:9998;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:94vw;pointer-events:none}
#ar2Hud .ar2chip{background:#0d0b1aee;font-size:12.5px}
.ar2old{display:none!important}
.ar2res{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
.ar2res .big{font-size:54px;line-height:1.05;font-weight:900}.ar2res .big.w{color:#ffd36b;text-shadow:0 0 24px #ffd36b88}.ar2res .big.l{color:#ff6b6b;text-shadow:0 0 18px #ff6b6b66}
.ar2res .sub{opacity:.85}
.ar2res .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;width:100%}
.ar2res .cards div{padding:10px 6px;border-radius:12px;background:#171430;border:1px solid #352d66;display:flex;flex-direction:column;gap:2px;color:#efeaff}
.ar2res .cards b{font-size:20px}.ar2res .cards small{font-size:11.5px;color:#a59fcc}
.ar2res .lgb{width:100%;text-align:left}.ar2res .lgb .t{display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px}.ar2res .bar,.ar2sh .bar{height:9px;border-radius:6px;background:#0a0816;overflow:hidden}.ar2res .bar i,.ar2sh .bar i{display:block;height:100%;background:linear-gradient(90deg,#5ee0ff,#9b6bff)}
.ar2res .dia{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:12px;background:#211c42;color:#e6dfff;font-style:italic;text-align:left;font-size:13.5px}
.ar2res .pot{width:100%;box-sizing:border-box;display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;background:#3a2a0e;border:1px solid #ffd36b88;color:#fff3d0;text-align:left}
.ar2res .pot span{flex:1}.ar2res .pot.lost{background:#3a1518;border-color:#ff6b6b88;color:#ffd0d0}
.ar2res .acts{display:flex;gap:8px;width:100%}.ar2res .acts button{flex:1}
/* ร้าน */
html body #mask #modal[data-k="arshop2"],html body.desk #mask #modal.dkM[data-k="arshop2"],html body.desk #mask #modal.dkL[data-k="arshop2"],html body.desk #mask #modal.mWide[data-k="arshop2"]{width:min(1240px,calc(100vw - 32px))!important;max-width:none!important;background:radial-gradient(120% 70% at 50% 0%,#2a1a5a,#0d0b1a 60%)!important;color:#efeaff;border-color:#352d66!important}
.ar2sh header{display:flex;align-items:center;gap:14px;padding:0 44px 12px 0;border-bottom:1px solid #352d66;margin-bottom:14px}
.ar2sh header>div{flex:1;display:flex;flex-direction:column}.ar2sh .tt{font-size:26px}.ar2sh header small{color:#a59fcc;font-size:12.5px}
.ar2sh .bal{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:14px;background:#171430;border:1px solid #ffd36b66;font-weight:800;color:#ffd36b;font-size:18px}.ar2sh .bal small{color:#a59fcc;font-weight:400;font-size:11px}
.ar2sh .bal i,.ar2sh .cn:before{content:'';display:inline-block;width:15px;height:15px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0,#ffd36b 55%,#a8761a);vertical-align:-2px;margin-right:4px}
.ar2sh .bd3{display:flex;gap:16px;align-items:flex-start}
.ar2sh .cats{width:170px;flex:none;display:flex;flex-direction:column;gap:3px;padding:8px;border-radius:14px;background:#171430;border:1px solid #352d66;position:sticky;top:0}
.ar2sh .cats button{text-align:left;padding:9px 12px;border-radius:10px;border:0;background:transparent;color:#efeaff;font:inherit;font-size:14px;cursor:pointer}.ar2sh .cats button.on{background:#211c42;color:#ffd36b;font-weight:800}
.ar2sh main{flex:1;min-width:0;display:flex;flex-direction:column;gap:14px}
.ar2sh aside{width:270px;flex:none;display:flex;flex-direction:column;gap:12px}
.ar2sh aside .box{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:14px;background:#171430;border:1px solid #352d66}.ar2sh aside .box>b{color:#ffd36b}
.ar2sh aside .r{display:flex;justify-content:space-between;gap:8px;font-size:12.5px}.ar2sh aside .r span{color:#a59fcc}.ar2sh aside .r b{text-align:right;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ar2sh .mypv{display:flex;flex-direction:column;align-items:center;gap:6px}.ar2sh .mypv canvas{width:96px;height:106px;image-rendering:pixelated;border-radius:10px;border:2px solid #352d66}
.ar2sh .pity{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#a59fcc}.ar2sh .pity .bar{flex:1}
.ar2sh .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}
.ar2it{border-radius:14px;overflow:hidden;background:#171430;border:1px solid #352d66;display:flex;flex-direction:column}.ar2it.wk{border-color:#ffd36baa}
.ar2it .pv{height:96px;position:relative;background:#140f2a;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ar2it .pv .em{font-size:38px}.ar2it .pv .fr{transform:scale(1.3)}
.ar2it .pv .tg,.ar2wk .tg{position:absolute;left:8px;top:8px;padding:1px 8px;border-radius:99px;background:#9b6bff33;color:#c9b4ff;font-size:10.5px;font-weight:700}.ar2it .pv .tg.w{background:#ffd36b33;color:#ffd36b}
.ar2it .pv .pl{position:absolute;right:8px;top:8px;width:30px;height:30px;border-radius:50%;border:0;background:#0009;color:#fff;cursor:pointer}
.ar2it .bd{padding:10px 12px 12px;display:flex;flex-direction:column;gap:3px;flex:1}.ar2it .bd b{font-size:14px}.ar2it .bd small{font-size:12px;color:#a59fcc;flex:1}
.ar2it .ft,.ar2wk .ft{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:6px}.ar2it .ft button{padding:6px 14px;min-width:0;width:auto!important;margin:0!important}
.ar2sh .cn{font-weight:800;color:#ffd36b}.ar2sh .cn.big{font-size:20px}
.ar2wk{display:flex;gap:16px;align-items:center;padding:14px;border-radius:16px;background:linear-gradient(120deg,#3a1650,#1a1440 60%);border:1px solid #ff5fa888;position:relative}
.ar2wk .tx{flex:1;display:flex;flex-direction:column;gap:5px}.ar2wk .tg{position:static;align-self:flex-start;background:#ff5fa833;color:#ff8cc6}.ar2wk b{font-size:20px}.ar2wk small{color:#a59fcc}
.ar2wk .ft{justify-content:flex-start}.ar2wk .ft button{width:auto!important;margin:0!important}
.ar2wk .pv{width:200px;height:120px;flex:none;border-radius:12px;overflow:hidden;background:#140f2a;display:flex;align-items:center;justify-content:center}
.ar2pv{position:relative;width:100%;height:100%;display:block}
.ar2pv i{position:absolute;display:block}
.ar2pv:before{content:'';position:absolute;left:50%;top:50%;width:18px;height:46px;margin:-14px 0 0 -9px;border-radius:9px 9px 3px 3px;background:#2a1f5a;box-shadow:0 -14px 0 -2px #2a1f5a}
.ar2pv-en-mist i{inset:auto 0 18% 0;height:30%;background:radial-gradient(closest-side,#c0b0ff55,transparent);animation:ar2fog 3s ease-in-out infinite}.ar2pv-en-mist i:nth-child(2){animation-delay:1s;bottom:30%}
.ar2pv-en-fall i:first-child{left:50%;top:10%;width:4px;height:40%;margin-left:-2px;background:linear-gradient(#fff0,#ffd36b);animation:ar2drop 1.6s ease-in infinite}.ar2pv-en-fall i:nth-child(2){left:50%;bottom:16%;width:60px;height:10px;margin-left:-30px;border-radius:50%;border:2px solid #ffd36b;animation:ar2ring 1.6s ease-out infinite}
.ar2pv-en-shade i:first-child{left:50%;bottom:14%;width:80px;height:14px;margin-left:-40px;border-radius:50%;background:#000;box-shadow:0 0 12px #000}
.ar2pv-en-lotus i{left:50%;top:50%;width:16px;height:30px;margin:-15px 0 0 -8px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#ff9fc8;transform-origin:50% 100%;animation:ar2spin 3s linear infinite}.ar2pv-en-lotus i:nth-child(2){animation-delay:-1s;background:#ffc0dc}.ar2pv-en-lotus i:nth-child(3){animation-delay:-2s}
.ar2pv-fn-plum i{width:8px;height:8px;border-radius:50% 0;background:#ff8cc6;animation:ar2petal 2.4s linear infinite}.ar2pv-fn-plum i:nth-child(1){left:20%}.ar2pv-fn-plum i:nth-child(2){left:55%;animation-delay:.8s}.ar2pv-fn-plum i:nth-child(3){left:80%;animation-delay:1.6s}
.ar2pv-fn-ink i:first-child{left:50%;top:50%;width:20px;height:20px;margin:-10px;border-radius:50%;background:#000;animation:ar2ink 2s ease-out infinite}
.ar2pv-fn-crack i{left:50%;top:50%;width:2px;height:60px;background:#fff;transform-origin:0 0}.ar2pv-fn-crack i:nth-child(1){transform:rotate(30deg)}.ar2pv-fn-crack i:nth-child(2){transform:rotate(150deg)}.ar2pv-fn-crack i:nth-child(3){transform:rotate(260deg)}
.ar2pv-fn-bolt i:first-child{left:46%;top:0;width:14px;height:100%;background:#ffe680;clip-path:polygon(60% 0,20% 50%,50% 50%,30% 100%,90% 40%,55% 40%,80% 0);animation:ar2flash 1.4s infinite}
.ar2pv-dy-blood:before{background:#8a1020;box-shadow:0 -14px 0 -2px #8a1020}.ar2pv-dy-gold:before{background:#c9a030;box-shadow:0 -14px 0 -2px #e8c878,0 0 16px #ffd36b}.ar2pv-dy-ghost:before{background:#cfe2f5aa;box-shadow:0 -14px 0 -2px #dce8f4aa}.ar2pv-dy-inv:before{background:#f2f2f2;box-shadow:0 -14px 0 -2px #fff}.ar2pv-dy-inv{background:#222}
@keyframes ar2fog{0%,100%{transform:translateX(-20%);opacity:.4}50%{transform:translateX(20%);opacity:1}}
@keyframes ar2drop{0%{transform:translateY(-60px);opacity:0}70%{opacity:1}100%{transform:translateY(10px);opacity:0}}
@keyframes ar2ring{0%,60%{transform:scale(.2);opacity:0}70%{opacity:1}100%{transform:scale(1.6);opacity:0}}
@keyframes ar2spin{to{transform:rotate(360deg)}}
@keyframes ar2petal{0%{top:-10%;transform:rotate(0)}100%{top:110%;transform:rotate(540deg)}}
@keyframes ar2ink{0%{transform:scale(.2);opacity:1}100%{transform:scale(6);opacity:0}}
@keyframes ar2flash{0%,40%,100%{opacity:0}45%,55%{opacity:1}}
/* เอฟเฟกต์เต็มจอ */
.ar2fx{position:fixed;inset:0;z-index:10050;pointer-events:none;overflow:hidden}
.ar2fx .lb{position:absolute;left:50%;top:62%;transform:translateX(-50%);padding:6px 18px;border-radius:99px;background:#000b;color:#fff;font-size:18px;white-space:nowrap;animation:ar2lb 1.7s ease both}
.ar2fx i{position:absolute;display:block}
.ar2-en-mist i{left:-30%;right:-30%;height:45%;background:radial-gradient(closest-side,#d8ccffaa,transparent);animation:ar2mist 1.7s ease both}.ar2-en-mist i.a{top:25%}.ar2-en-mist i.b{top:45%;animation-delay:.15s}.ar2-en-mist i.c{top:60%;animation-delay:.3s}
.ar2-en-fall i.a{left:50%;top:0;width:10px;height:55%;margin-left:-5px;background:linear-gradient(#fff0,#ffd36b);animation:ar2fall .6s ease-in both}.ar2-en-fall i.b{left:50%;top:55%;width:40px;height:16px;margin:-8px 0 0 -20px;border-radius:50%;border:4px solid #ffd36b;animation:ar2boom 1.1s .55s ease-out both}.ar2-en-fall i.c{inset:0;background:#fff;animation:ar2fl .4s .55s both}
.ar2-en-shade i.a{left:50%;top:58%;width:260px;height:50px;margin-left:-130px;border-radius:50%;background:#000;box-shadow:0 0 40px 20px #000;animation:ar2pit 1.7s ease both}.ar2-en-shade i.b{inset:0;background:radial-gradient(circle at 50% 60%,transparent 20%,#000c);animation:ar2fade 1.7s both}
.ar2-en-lotus s,.ar2-fn-plum s{position:absolute;top:-6%;left:var(--x);width:16px;height:16px;border-radius:50% 0;background:#ff9fc8;transform:rotate(var(--r));animation:ar2rain 1.6s var(--d) linear both}
.ar2-en-lotus i.a{inset:0;background:radial-gradient(circle,#ff9fc844,transparent 60%);animation:ar2fade 1.7s both}
.ar2-fn-ink i.a{left:50%;top:50%;width:60px;height:60px;margin:-30px;border-radius:50%;background:#000;animation:ar2inkb 1.6s ease-out both}
.ar2-fn-crack i{left:50%;top:45%;width:4px;height:70vh;background:linear-gradient(#fff,#fff0);transform-origin:50% 0;animation:ar2fade 1.7s both}.ar2-fn-crack i.a{transform:rotate(25deg)}.ar2-fn-crack i.b{transform:rotate(145deg)}.ar2-fn-crack i.c{transform:rotate(255deg)}
.ar2-fn-bolt i.a{left:44%;top:0;width:12%;height:70%;background:#fff6b0;clip-path:polygon(60% 0,20% 50%,50% 50%,30% 100%,90% 40%,55% 40%,80% 0);filter:drop-shadow(0 0 20px #ffd36b);animation:ar2flash2 1.2s both}.ar2-fn-bolt i.b{inset:0;background:#fff;animation:ar2fl .5s .1s both}
body.ar2shake #app,body.ar2shake #modal{animation:ar2shk .5s 2}
@keyframes ar2lb{0%{opacity:0;transform:translate(-50%,10px)}20%,80%{opacity:1;transform:translate(-50%,0)}100%{opacity:0}}
@keyframes ar2mist{0%{transform:translateX(-30%);opacity:0}40%{opacity:1}100%{transform:translateX(30%);opacity:0}}
@keyframes ar2fall{from{transform:translateY(-100%)}to{transform:translateY(0)}}
@keyframes ar2boom{0%{transform:scale(1);opacity:1}100%{transform:scale(14);opacity:0}}
@keyframes ar2fl{0%{opacity:.8}100%{opacity:0}}
@keyframes ar2pit{0%{transform:scaleX(.1);opacity:0}30%{transform:scaleX(1);opacity:1}100%{opacity:0}}
@keyframes ar2fade{0%{opacity:0}25%{opacity:1}80%{opacity:1}100%{opacity:0}}
@keyframes ar2rain{0%{top:-6%}100%{top:106%;transform:rotate(calc(var(--r) + 540deg))}}
@keyframes ar2inkb{0%{transform:scale(.3);opacity:1}60%{transform:scale(28);opacity:.95}100%{transform:scale(30);opacity:0}}
@keyframes ar2flash2{0%,10%{opacity:0}15%,35%{opacity:1}40%{opacity:0}50%,60%{opacity:1}100%{opacity:0}}
@keyframes ar2shk{0%,100%{transform:translate(0,0)}25%{transform:translate(-6px,3px)}50%{transform:translate(5px,-4px)}75%{transform:translate(-3px,-2px)}}
.ar2lgs{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.ar2lgs span{display:inline-flex;gap:6px;align-items:center;padding:3px 10px;border-radius:99px;border:1px solid var(--c);opacity:.45;font-size:12.5px}.ar2lgs span.on{opacity:1;background:color-mix(in srgb,var(--c) 18%,transparent)}
.ar2cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}
.ar2cards .cd{display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 6px;border-radius:10px;background:linear-gradient(180deg,color-mix(in srgb,var(--c) 22%,#171430),#171430);border:1px solid var(--c);color:#efeaff;text-align:center;min-width:0}
.ar2cards .cd .lg{font-size:22px}.ar2cards .cd b{font-size:13px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ar2cards .cd small{font-size:11px;color:#a59fcc}
@media (max-width:820px){.ar2g{grid-template-columns:1fr 1fr}.ar2sh .bd3{flex-direction:column}.ar2sh .cats{width:auto;flex-direction:row;overflow-x:auto;position:static;padding:6px}.ar2sh .cats button{flex:none;padding:7px 12px}
 .ar2sh aside{width:100%}.ar2sh .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ar2wk{flex-direction:column-reverse;align-items:stretch}.ar2wk .pv{width:100%;height:110px}.ar2sh header{flex-wrap:wrap}.ar2sh .tt{font-size:21px}.ar2res .big{font-size:44px}.ar2it .bd b{font-size:13px}}
@media (prefers-reduced-motion:reduce){.ar2fx,.ar2pv i{animation-duration:.01s!important}body.ar2shake #app,body.ar2shake #modal{animation:none}}
`;document.head.appendChild(st);
window._ar2={NEW,fx,diary};
})();
