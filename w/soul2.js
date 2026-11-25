// ============================================================
// ⭕ soul2.js — โหมดวิญญาณยุทธ์ ภาค 2 (โหลดหลัง soul.js ผ่าน DEP soul2:['soul'])
//  1) ขีดจำกัดปีวงแหวน: วงแรกๆ รับได้ไม่เกินกี่ปี · เพิ่มด้วยการขัดเกลา/ยา/สัตว์สังเวย · ฝืนข้ามขีด = เดิมพัน (วงแหวนข้ามขีด / วงร้าว / บาดเจ็บ / ตาย)
//  2) บัลลังก์เทพ: เป็นเทพแล้วได้ฉายาตามดวงจิต · สร้างบททดสอบ 3 บทให้รุ่นหลัง (เก็บบนเซิร์ฟเวอร์ ไปโผล่ในชีวิตผู้เล่นอื่น)
//     ผ่าน = สืบทอดความเป็นเทพ + แจ้งผู้สร้าง · ไม่ผ่าน = บททดสอบศักดิ์สิทธิ์ขึ้น · หน้าวิหารเทพ · ประกายเทพในชีวิตถัดไป (ตื่นตอน 12 ขวบ)
//  3) สัตว์ของผู้เล่นโหมดสัตว์อสูรโผล่ในป่า ถูกล่าเป็นวงแหวน (แจ้งเจ้าของ) · เจ้าของสังเวยสัตว์ให้ผู้เล่นที่ถูกใจได้
//     สหายแสนปีที่แปลงเป็นมนุษย์ (ความรัก vs พลัง + ทางลับชุบชีวิต) · ชิงบัลลังก์เทพ หนึ่งฉายาหนึ่งผู้ครองต่อฤดู
//  เซิร์ฟเวอร์: api/online.js (godset godpick godres godlist bpush bpool bhunt bgive)
// ============================================================
try{(()=>{
const B=window._blk34;if(!B){console.error('soul2: no _blk34');return}
const {TIER,spNow,SP}=B;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pk=a=>a[Math.floor(Math.random()*a.length)];
const O=(t,s,f)=>({t,s,f});
const on=()=>!!(S&&S.alive&&S.ch==='soul'&&S.sv);
const A1=()=>on()&&S.sv.aw===1;
const isAuto=()=>{try{return typeof auto!=='undefined'&&!!auto}catch(e){return false}};
const tot=()=>{try{return typeof total==='function'?total():S.power}catch(e){return S.power}};
const pp=p=>{try{return typeof pctPow==='function'?pctPow(p):Math.round(S.power*p)}catch(e){return Math.round(S.power*p)}};
const E=s=>{try{return esc(String(s==null?'':s))}catch(e){return String(s).replace(/[<>&"]/g,'')}};
const Y=()=>{const g=S.sv;if(!g.y2)g.y2={cb:0,tb:0,it:{pill:0,bone:0},bu:0,tr:-1};return g.y2};
const fmt=n=>isFinite(n)?Math.round(n).toLocaleString('en-US'):'ไร้ขีด';
// ---------- อายุวงแหวน ----------
const TR=[[10,99],[100,999],[1000,9999],[1e4,99999],[1e5,999999],[1e6,9999999],[1e7,99999999],[1e8,999999999],[1e9,9999999999]];
const rollY=t=>{const r=TR[cl(t|0,0,8)],a=Math.log(r[0]),b=Math.log(r[1]);return Math.round(Math.exp(a+Math.random()*(b-a)))};
const tierOf=y=>{for(let i=8;i>=0;i--)if(y>=TR[i][0])return i;return 0};
const CAP=[423,764,1760,5000,12000,20000,50000,100000,Infinity];
const capAt=i=>{const y=Y(),b=CAP[cl(i,0,8)];if(!isFinite(b))return Infinity;return Math.round(b*(1+y.cb)*(1+y.tb))};
const tagAll=()=>{try{const g=S.sv;(g.rings||[]).forEach(r=>{if(r&&r.y==null)r.y=rollY(r.t)})}catch(e){}};
window._sv2={rollY,tierOf,capAt,CAP};

// ---------- 1) ขีดจำกัดปี + เดิมพันข้ามขีด ----------
function landed(n,y,ov){const g=S.sv;if(g.rings.length<=n)return null;const r=g.rings[g.rings.length-1];r.y=y;if(ov===1)r.ov=1;if(ov===2)r.cr=1;Y().tb=0;return r}
function doGo(go,y,ov){const n=S.sv.rings.length;try{go()}catch(e){console.error('sv2 go',e)}return landed(n,y,ov)}
function overCap(t,b,y,cap,go,i){const g=S.sv,x=Y(),r=y/cap,bond=g.bond==null?50:g.bond;
 const p=cl(.78-(r-1)*.45+(S.hp/S.maxHp-.5)*.2+(bond>=80?.06:0)+(S.karma>50?.04:0)+(window._svRisk?Math.min(.12,window._svRisk(g,t,1)*.5):0),.06,.85);
 const deadly=r>=1.8;const pet=g.pet;
 const opts=[
  O(`🎲 ฝืนดูดซับข้ามขีด`,`สำเร็จราว ${Math.round(p*100)}% · ได้ <b>วงแหวนข้ามขีด</b> · พลาด: วงร้าว/บาดเจ็บ${deadly?'/☠️ ตาย':''}`,()=>{
   if(Math.random()<p){g._ovSafe=1;const rg=doGo(go,y,1);g._ovSafe=0;if(rg){S.power+=pp(.05*Math.min(3,r));S.fame+=60*(i+1);log(`⚡ <b>วงแหวนข้ามขีด!</b> วงที่ ${i+1} อายุ ${fmt(y)} ปี เกินขีดร่างกาย ${fmt(cap)} ปี แต่คุณกลืนมันได้ทั้งหมด เส้นจิตขยายจนแสบร้อน`,'myth',true)}return}
   const f=Math.random();
   if(deadly&&f<.25&&!(window._svDodge&&window._svDodge(g))){S.deathCause=`ฝืนหลอมวงแหวน ${fmt(y)} ปีเกินขีดร่างกาย ${fmt(cap)} ปี`;log(`💥 วงแหวน ${fmt(y)} ปีระเบิดออกจากภายใน ร่างกายที่รับได้แค่ ${fmt(cap)} ปีแตกเป็นเสี่ยง…`,'bad',true);setTimeout(()=>{try{checkDeath();render()}catch(e){}},200);return}
   if(f<.65){const rg=doGo(go,y,2);S.maxHp=Math.max(30,Math.round(S.maxHp*.8));S.hp=Math.max(1,Math.round(S.hp*.35));if(rg)log(`💔 <b>วงแหวนร้าว</b> คุณหลอมวงที่ ${i+1} ได้ แต่มันร้าวกลางวง พลังชีวิตสูงสุด −20% · รอยร้าวจะอยู่กับคุณตลอดไป`,'bad',true);return}
   S.hp=Math.max(1,Math.round(S.hp*.3));S.maxHp=Math.max(30,Math.round(S.maxHp*.9));log(`🩸 วงแหวนสะบัดหลุดจากร่าง คุณกระอักเลือดล้มลง ได้แผลเปล่า (พลังชีวิตสูงสุด −10%)`,'bad',true)}),
  O(`🗜️ บีบวงแหวนให้พอดีขีด`,`ได้ ${fmt(cap)} ปี ปลอดภัย แต่เสียพลังส่วนเกินไป`,()=>{const rg=doGo(go,cap,0);if(rg){const nt=tierOf(cap);if(nt<rg.t){rg.t=nt;S.power=Math.max(1,Math.round(S.power*.97))}log(`🗜️ คุณบีบวงแหวนลงเหลือ ${fmt(cap)} ปี พลังที่เหลือสลายไปกับสายลม`,'')}})];
 if(x.it.pill>0)opts.push(O(`💊 กินยาขยายเส้นจิต (เหลือ ${x.it.pill})`,'ขีดจำกัดวงนี้ +50% แล้วลองใหม่',()=>{x.it.pill--;x.tb+=.5;const c2=capAt(i);log(`💊 ยาขยายเส้นจิตละลายในท้อง ขีดจำกัดวงที่ ${i+1} ขยายเป็น ${fmt(c2)} ปี`,'good');if(y<=c2){doGo(go,y,0);return}setTimeout(()=>overCap(t,b,y,c2,go,i),40)}));
 if(pet)opts.push(O(`🩸 ให้${E(pet.n)}สังเวยพลังประคอง`,`สัตว์คู่ใจสลายตัวเข้าเส้นจิตคุณ · หลอมข้ามขีดได้แน่นอน`,()=>{g.pet=null;S.karma+=3;g._ovSafe=1;const rg=doGo(go,y,1);g._ovSafe=0;if(rg){rg.sac=1;log(`🩸 <b>${E(pet.n)}</b> ส่งเสียงครางเบาๆ แล้วสลายเป็นแสงไหลเข้าเส้นจิตคุณ ประคองวงแหวน ${fmt(y)} ปีไว้จนนิ่ง <b>วงแหวนข้ามขีด</b> วงนี้มีกลิ่นของมันติดอยู่ตลอดไป`,'myth',true)}}));
 opts.push({t:'🚶 ปล่อยวงแหวนไป',s:'ไม่เสี่ยง · ยังติดคอขวด',skip:true,f(){log(`🚶 คุณปล่อยวงแหวน ${fmt(y)} ปีลอยหายไปในป่า มันแก่เกินที่ร่างนี้จะรับไหว`,'')}});
 choice(`⚠️ วงแหวน ${fmt(y)} ปี เกินขีดจำกัด`,`วงที่ ${i+1} ร่างกายคุณรับได้ไม่เกิน <b>${fmt(cap)} ปี</b> แต่วงแหวนตรงหน้าอายุ <b>${fmt(y)} ปี</b> (เกิน ${Math.round((r-1)*100)}%) เส้นจิตสั่นระริกเหมือนจะขาด`,opts)}
{const _w=window._svWin;window._svWin=function(t,b,go){const self=this;let y0=null;try{const g=S.sv;y0=g._py!=null?g._py:rollY(t);g._py=null}catch(e){}
 const go2=()=>{try{if(!on())return go();const g=S.sv,i=g.rings.length;if(i>=9)return go();const y=y0==null?rollY(t):y0,cap=capAt(i);if(y<=cap){doGo(go,y,0);return}setTimeout(()=>overCap(t,b,y,cap,go,i),40)}catch(e){console.error('sv2 win',e);go()}};
 return _w?_w.call(self,t,b,go2):go2()}}
{const _rk=window._svRisk;window._svRisk=(g,t,over)=>{let v=_rk?_rk(g,t,over):0;if(g&&g._ovSafe)v+=.35;return v}}
// ฝึกขัดเกลาเส้นจิต / ยา
window.sv2Train=function(){if(!A1())return;const x=Y();if(x.tr===S.age)return toast('ปีนี้ขัดเกลาเส้นจิตไปแล้ว');x.tr=S.age;const add=.05+(S.sv.acad?.02:0)+((S.sv.bond||50)>=80?.01:0);x.cb+=add;S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.1));log(`🧘 คุณนั่งขัดเกลาเส้นจิตทั้งปี เจ็บเหมือนเข็มนับพันแทง ขีดจำกัดวงแหวนทุกวง +${Math.round(add*100)}%`,'good');try{render()}catch(e){}closeM();setTimeout(()=>openSoul(),60)};
window.sv2Buy=function(k){if(!A1())return;const x=Y(),pr=k==='pill'?1500:4000;if(S.money<pr)return toast('เงินไม่พอ');if(k==='bone'&&x.bu>=3)return toast('ร่างกายดูดซับยาบำรุงกระดูกได้แค่ 3 ครั้งต่อชีวิต');S.money-=pr;if(k==='pill'){x.it.pill++;log('💊 ซื้อยาขยายเส้นจิต 1 เม็ด (ใช้ตอนวงแหวนเกินขีด)','')}else{x.bu++;x.cb+=.12;log('🦴 ดื่มยาบำรุงกระดูกพันปี ขีดจำกัดวงแหวนทุกวง +12% ถาวร','good')}try{render()}catch(e){}closeM();setTimeout(()=>openSoul(),60)};

// ---------- 2) บัลลังก์เทพ ----------
const GK={hrt:['💗','หัวใจ'],pow:['⚔️','พลัง'],sac:['🩸','เสียสละ'],puz:['❓','ปริศนา'],grd:['🐉','สัตว์ผู้พิทักษ์']};
const isGod=g=>!!((g.x&&g.x.god)||(g.y2&&g.y2.inh));
const soulN=()=>{try{return spNow(S.sv.sp[0]).n}catch(e){return'ดวงจิต'}};
const godSc=()=>{const g=S.sv;return cl(Math.round((g.lv||0)+(g.rings||[]).length*6+(g.rings||[]).filter(r=>r.ov).length*8+Math.min(40,(S.fame||0)/2000)),1,200)};
function godAscend(){const g=S.sv,x=Y();if(x.gd&&x.gd.tt)return;x.gd=x.gd||{at:S.age};const n=soulN();
 const T=[`เทพ${n}`,`${n}เทพราชันย์`,`จ้าวเทพแห่ง${n}`];
 const pickT=tt=>{x.gd.tt=tt;S.godT=tt;S.fame+=500;log(`👑 <b>สวรรค์จารึกนามคุณว่า「${E(tt)}」</b> บัลลังก์เทพรอให้คุณทิ้งบททดสอบไว้ให้คนรุ่นหลัง`,'myth',true);
  try{LS.set('murim_godspark',{tt,sn:n,at:Date.now(),nm:S.name})}catch(e){}
  if(isAuto())godSubmit(defTrial());else setTimeout(()=>sv2GodMk(),300)};
 choice('🌟 ฉายาเทพของคุณ',`ดวงจิต <b>${E(n)}</b> ส่องแสงทะลุเมฆ เลือกนามที่จะจารึกบนบัลลังก์เทพ`,T.map(tt=>O(`👑 ${tt}`,'ฉายานี้จะอยู่บนบททดสอบที่คุณสร้าง',()=>pickT(tt))))}
const DEF={hrt:'ในความมืด เงาของทุกคนที่เคยทำร้ายยืนรออยู่ เจ้าจะให้อภัยหรือไม่',pow:'จงโจมตีเงาของข้า ถ้าเจ้าแข็งแกร่งพอ เงานั้นจะถอยให้',sac:'บัลลังก์ไม่มีที่ว่างสำหรับคนที่ไม่ยอมเสียอะไร',puz:'สิ่งใดยิ่งแบ่งยิ่งเพิ่ม',grd:'สัตว์ผู้พิทักษ์ของข้าเฝ้าประตูนี้มาพันปี'};
const defTrial=()=>[{k:'hrt',tx:DEF.hrt,d:3},{k:'pow',tx:DEF.pow,d:3},{k:'sac',tx:DEF.sac,d:2}];
window.sv2GodMk=function(){if(!S||!S.sv)return;const x=Y();if(!x.gd||!x.gd.tt)return toast('ต้องได้ฉายาเทพก่อน');if(x.gd.tid)return toast('คุณทิ้งบททดสอบไว้แล้วในชีวิตนี้');
 const st=(k,i)=>`<div class="item sv2St" data-i="${i}"><b>บทที่ ${i+1}</b> <select class="sv2K" onchange="sv2KCh(this)">${Object.keys(GK).map(q=>`<option value="${q}"${q===k?' selected':''}>${GK[q][0]} ${GK[q][1]}</option>`).join('')}</select>
  <select class="sv2D">${[1,2,3,4,5].map(d=>`<option value="${d}"${d===3?' selected':''}>ยาก ${'★'.repeat(d)}</option>`).join('')}</select>
  <textarea class="sv2Tx" maxlength="160" rows="2" style="width:100%;margin-top:4px;box-sizing:border-box">${E(DEF[k])}</textarea>
  <div class="sv2Pz" style="display:${k==='puz'?'block':'none'}"><input class="sv2A" maxlength="40" placeholder="คำตอบที่ถูก" value="ความรู้" style="width:100%;margin:2px 0;box-sizing:border-box"><input class="sv2A" maxlength="40" placeholder="คำตอบหลอก 1" value="ทองคำ" style="width:100%;margin:2px 0;box-sizing:border-box"><input class="sv2A" maxlength="40" placeholder="คำตอบหลอก 2" value="ความแค้น" style="width:100%;margin:2px 0;box-sizing:border-box"></div></div>`;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌟 สร้างบททดสอบเทพ「${E(x.gd.tt)}」</h3><p class="tag2">บททดสอบนี้จะไปปรากฏในชีวิตของผู้เล่นคนอื่นในทวีปจิตวิญญาณ · ใครผ่านครบ 3 บทจะสืบทอดความเป็นเทพ และคุณจะได้รับแจ้งว่าเขาเป็นผู้สืบทอดคนที่เท่าไร · ใครล้มเหลว บททดสอบของคุณจะศักดิ์สิทธิ์ขึ้น</p>
 ${['hrt','pow','puz'].map(st).join('')}<p class="tag2">💗 หัวใจ วัดกรรม · ⚔️ พลัง/🐉 ผู้พิทักษ์ ดวลกับเงา · 🩸 เสียสละ ต้องยอมเสียบางอย่าง · ❓ ปริศนา ตั้งคำถามและคำตอบเอง</p>
 <button class="pbtn" style="width:100%" onclick="sv2GodGo()">🌟 จารึกบททดสอบ</button>`,'sv2mk');};
window.sv2KCh=function(s){const d=s.closest('.sv2St');d.querySelector('.sv2Pz').style.display=s.value==='puz'?'block':'none';const ta=d.querySelector('.sv2Tx');if(Object.values(DEF).includes(ta.value)||!ta.value.trim())ta.value=DEF[s.value]};
window.sv2GodGo=function(){const m=$('modal'),L=[...m.querySelectorAll('.sv2St')].map(d=>{const k=d.querySelector('.sv2K').value,o={k,tx:d.querySelector('.sv2Tx').value.trim().slice(0,160)||DEF[k],d:+d.querySelector('.sv2D').value||3};if(k==='puz'){o.a=[...d.querySelectorAll('.sv2A')].map(i=>i.value.trim().slice(0,40));if(o.a.some(a=>!a))return null}return o});
 if(L.some(v=>!v))return toast('ปริศนาต้องมีคำตอบครบ 3 ช่อง');closeM();godSubmit(L)};
async function godSubmit(st){const x=Y();if(!x.gd||x.gd.tid)return;x.gd.tid='…';
 try{const j=await api('godset',{tt:x.gd.tt,nm:S.name,sn:soulN(),st,sc:godSc()});
  if(j&&j.ok){x.gd.tid=j.tid;log(`📜 บททดสอบ「${E(x.gd.tt)}」ถูกจารึกไว้ในวิหารเทพ รอผู้กล้าคนต่อไป`,'myth');if(j.seat&&j.seat.won&&!j.seat.keep)log(`👑 <b>คุณครองบัลลังก์「${E(x.gd.tt)}」ฤดูนี้</b>${j.seat.prev?` ชิงมาจาก ${E(j.seat.prev)}`:''}`,'myth',true);else if(j.seat&&!j.seat.won)log(`👑 บัลลังก์「${E(x.gd.tt)}」ฤดูนี้มี ${E(j.seat.h)} ครองอยู่ ผ่านบททดสอบให้คะแนนสูงกว่าเพื่อชิง`,'')}
  else{x.gd.tid=null;if(j&&j.err==='cd')toast('จารึกบททดสอบได้ 1 ครั้งทุก 6 ชั่วโมง');else toast('จารึกไม่สำเร็จ ลองใหม่จากหน้าดวงจิต')}}
 catch(e){x.gd.tid=null;toast('ส่งบททดสอบไม่สำเร็จ เน็ตอาจหลุด ลองใหม่จากหน้าดวงจิต')}try{render()}catch(e){}}
// ผู้เล่นอื่นเจอบททดสอบ
function runTrial(t,seat){const g=S.sv,x=Y();let pass=0,sc=0,i=0;const st=t.st||[];
 const next=ok=>{if(ok){pass++;sc+=(st[i].d|0)*12}i++;if(i<st.length)setTimeout(()=>stage(i),60);else setTimeout(fin,60)};
 const stage=k=>{const s=st[k],d=cl(s.d|0,1,5),hd=`🌟「${E(t.tt)}」บทที่ ${k+1} · ${GK[s.k]?GK[s.k][0]+' '+GK[s.k][1]:''} ${'★'.repeat(d)}`,tx=`<i>"${E(s.tx)}"</i><br><span class="tag2">— ${E(t.nm)} ผู้สร้างบททดสอบ</span>`;
  if(s.k==='hrt'){const need=-20+d*12;choice(hd,tx,[O('ยอมรับทุกสิ่งที่เคยทำ',`ผ่านถ้ากรรมไม่ต่ำกว่า ${need}`,()=>{const ok=S.karma>=need;log(ok?'💗 เสียงในใจคุณสงบลง ประตูบทนี้เปิด':'💗 เงาในใจคุณกรีดร้อง ประตูไม่ขยับ',ok?'good':'bad');next(ok)}),O('ตัดใจทิ้งอดีตทั้งหมด',`เสี่ยงดวง ${Math.round((.7-d*.1)*100)}% · กรรม −5`,()=>{S.karma-=5;const ok=Math.random()<.7-d*.1;log(ok?'💗 คุณก้าวข้ามอดีตไปได้':'💗 อดีตยังตามคุณมา',ok?'good':'bad');next(ok)})]);return}
  if(s.k==='pow'||s.k==='grd'){const nm=s.k==='pow'?`เงาแห่ง${t.tt}`:`สัตว์ผู้พิทักษ์แห่ง${t.tt}`,ep=Math.max(5,Math.round(tot()*(s.k==='pow'?.5+d*.17:.6+d*.19)));choice(hd,tx,[O(`⚔️ สู้กับ${E(nm)}`,'ดวลหนึ่งยก',()=>{duel(nm,ep,w=>{try{if(!w)S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.2));log(w?`⚔️ ${E(nm)}สลายไป บทนี้ผ่าน`:`🩸 ${E(nm)}ซัดคุณกระเด็นออกจากประตู`,w?'good':'bad');next(!!w)}catch(e){next(false)}})}),O('ถอย','ไม่ผ่านบทนี้',()=>next(false))]);return}
  if(s.k==='sac'){const m=d*1500;choice(hd,tx,[O(`🩸 สละพลังชีวิตสูงสุด ${d*6}%`,'ผ่านแน่นอน',()=>{S.maxHp=Math.max(30,Math.round(S.maxHp*(1-d*.06)));S.hp=Math.min(S.hp,S.maxHp);next(true)}),...(S.money>=m?[O(`💰 สละเงิน ${m.toLocaleString()}`,'ผ่านแน่นอน',()=>{S.money-=m;next(true)})]:[]),O('ไม่ยอมเสียอะไร','ไม่ผ่านบทนี้',()=>next(false))]);return}
  if(s.k==='puz'){const a=(s.a||[]).slice(0,3),ord=[0,1,2].sort(()=>Math.random()-.5);choice(hd,tx,ord.map(j=>O(E(a[j]||'…'),'ตอบ',()=>{const ok=j===0;log(ok?'❓ ปริศนาคลายออก ประตูเปิด':'❓ คำตอบผิด เสียงหัวเราะดังก้องวิหาร',ok?'good':'bad');next(ok)})));return}
  next(false)};
 const fin=async()=>{const ok=pass>=st.length&&st.length>0,score=sc+Math.round((g.lv||0)/5);
  if(ok){x.inh={tt:t.tt,by:t.nm};try{const X3=window._sv3&&window._sv3.X?window._sv3.X():(g.x=g.x||{});X3.done=X3.done||[];X3.god=1;if(!X3.done.includes('god'))X3.done.push('god')}catch(e){}S.lifespan=(S.lifespan||0)+100;S.fame+=8000;S.power+=pp(.3);log(`🌟 <b>คุณผ่านบททดสอบ「${E(t.tt)}」ของ ${E(t.nm)}</b> แสงเทพไหลเข้าสู่ร่าง คุณสืบทอดความเป็นเทพ`,'myth',true)}
  else{S.fame+=300;log(`🌟 คุณผ่าน ${pass}/${st.length} บท ประตูวิหาร「${E(t.tt)}」ปิดลง บททดสอบนี้ศักดิ์สิทธิ์ขึ้นอีกขั้น`,'bad')}
  try{const j=await api('godres',{tid:t.tid,ok:ok?1:0,sc:score,nm:S.name});if(j&&j.ok){if(ok&&j.n)log(`📜 คุณคือ <b>ผู้สืบทอดคนที่ ${j.n}</b> ของ「${E(t.tt)}」 ข่าวนี้ไปถึง ${E(t.nm)} แล้ว`,'myth');if(j.seat&&j.seat.won&&!j.seat.keep)log(`👑 <b>คุณชิงบัลลังก์「${E(t.tt)}」ฤดูนี้</b>${j.seat.prev?` จาก ${E(j.seat.prev)}`:''} ด้วยคะแนน ${score}`,'myth',true);else if(ok&&j.seat&&!j.seat.won)log(`👑 คะแนน ${score} ยังไม่พอชิงบัลลังก์จาก ${E(j.seat.h)}`,'')}}catch(e){}
  try{render()}catch(e){}};
 stage(0)}
async function godEncounter(tt){const x=Y();x.gtN=(x.gtN|0)+1;x.gtY=S.age;let j=null;try{j=await api('godpick'+(tt?'&tt='+encodeURIComponent(tt):''))}catch(e){}if(!j||!j.t||!on())return false;const t=j.t;
 choice(`🌟 แสงเทพจาก「${E(t.tt)}」`,`ประตูหินลอยลงมากลางป่า บนบานประตูสลักชื่อ <b>${E(t.nm)}</b> ผู้ครองดวงจิต${E(t.sn)} · ผู้ท้ามาแล้ว ${t.tr} คน ผ่าน ${t.ps} คน · ความศักดิ์สิทธิ์ ${t.sc}${j.seat?`<br><span class="tag2">👑 ผู้ครองบัลลังก์ฤดูนี้: ${E(j.seat.nm)} (${j.seat.sc})</span>`:''}<br>${(t.st||[]).map(s=>`${GK[s.k]?GK[s.k][0]:''}${'★'.repeat(s.d|0)}`).join(' · ')}`,[
  O('🚪 ก้าวเข้าทดสอบ','3 บท · ผ่านครบ = สืบทอดความเป็นเทพ',()=>runTrial(t,j.seat)),
  {t:'ยังไม่พร้อม',s:'ประตูหายไป',skip:true,f(){log('🌟 คุณมองประตูหินจางหายไปในหมอก','')}}]);return true}
window.sv2Challenge=function(tt){if(!A1())return toast('ท้าชิงได้เฉพาะในชีวิตทวีปจิตวิญญาณที่ปลุกดวงจิตแล้ว');const x=Y();if((S.sv.lv||0)<40)return toast('ระดับจิตต้อง 40 ขึ้นไป');if(x.chY!=null&&S.age-x.chY<5)return toast(`ท้าชิงได้อีกครั้งตอนอายุ ${x.chY+5}`);x.chY=S.age;closeM();godEncounter(tt).then(ok=>{if(!ok){toast('ยังไม่มีบททดสอบของฉายานี้ให้ท้า');x.chY=null}})};
// วิหารเทพ
window.svTemple=async function(){modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏛️ วิหารเทพ</h3><div id="sv2Tp"><p class="tag2">กำลังเปิดวิหาร…</p></div>`,'svtemple');
 let j=null;try{j=await api('godlist')}catch(e){}const el=$('sv2Tp');if(!el)return;if(!j||!j.ok){el.innerHTML='<p class="tag2">เปิดวิหารไม่ได้ เน็ตอาจหลุด</p>';return}
 const can=A1()&&(S.sv.lv||0)>=40;const seats=Object.entries(j.seat||{}).sort((a,b)=>b[1].sc-a[1].sc);
 const sp=(()=>{try{return LS.get('murim_godspark',null)}catch(e){return null}})();
 el.innerHTML=`${sp?`<div class="item">✨ <b>ประกายเทพรอคุณอยู่</b><br><span class="tag2">ชีวิตทวีปจิตวิญญาณถัดไปจะเกิดพร้อมประกายของ「${E(sp.tt)}」 ความทรงจำถูกผนึกจนอายุ 12 · ถ้ากรรมตกต่ำ ประกายจะดับ</span></div>`:''}
 <h4>👑 บัลลังก์เทพ ฤดู ${E(j.sn)}</h4>${seats.length?seats.map(([tt,v])=>`<div class="item" style="display:flex;align-items:center;gap:8px"><span style="flex:1">👑 <b>${E(tt)}</b><br><span class="tag2">ผู้ครอง ${E(v.nm)}${v.me?' (คุณ)':''} · คะแนน ${v.sc}</span></span>${can&&!v.me?`<button class="pbtn" style="width:auto;padding:6px 10px;font-size:13px;flex:0 0 auto" onclick="sv2Challenge('${E(tt).replace(/'/g,'')}')">⚔️ ท้าชิง</button>`:''}</div>`).join(''):'<p class="tag2">ฤดูนี้ยังไม่มีผู้ครองบัลลังก์</p>'}
 <h4>📜 บททดสอบที่ผู้เล่นทิ้งไว้ (${j.l.length})</h4>${j.l.length?j.l.map(t=>`<div class="item"><b>🌟 ${E(t.tt)}</b>${t.me?' <span class="tag2">(ของคุณ)</span>':''}<br><span class="tag2">โดย ${E(t.nm)} · ดวงจิต${E(t.sn)} · ${(t.st||[]).map(s=>`${GK[s.k]?GK[s.k][0]:''}${'★'.repeat(s.d|0)}`).join(' ')}</span><br><span class="tag2">ผู้ท้า ${t.tr} · ผ่าน ${t.ps} · 🔥 ศักดิ์สิทธิ์ ${t.sc}${t.hr&&t.hr.length?` · ผู้สืบทอดล่าสุด: ${t.hr.map(E).join(', ')}`:''}</span></div>`).join(''):'<p class="tag2">ยังไม่มีใครเป็นเทพและทิ้งบททดสอบไว้ เป็นคนแรกสิ</p>'}`};
// ประกายเทพในชีวิตถัดไป
function sparkTick(){const g=S.sv,x=Y();
 if(!x.skDone&&g.aw===1){x.skDone=1;let sp=null;try{sp=LS.get('murim_godspark',null)}catch(e){}
  if(sp&&sp.tt){try{LS.set('murim_godspark',null)}catch(e){}x.sk={tt:sp.tt,k0:S.karma,st:0};g.lv=Math.max(g.lv||0,10);
   if(g.sp.length===1&&Math.random()<.35&&SP){const c=SP.filter(p=>p[0]!==g.sp[0].id&&p[5]>=2);if(c.length){g.sp.push({id:pk(c)[0],rev:0});x.sk.tw=1}}
   log(`🔮 ตอนปลุกดวงจิต ลูกแก้วทั้งหกสั่นไหวพร้อมกัน ผู้ปลุกจิตถอยไปสามก้าว พลังวิญญาณแต่กำเนิดของคุณ <b>เต็มสิบระดับ</b>${x.sk.tw?' และมีดวงจิตที่สองตื่นขึ้นมาด้วย':''} …ในส่วนลึก มีบางอย่างหลับใหลอยู่`,'myth',true)}}
 const k=x.sk;if(!k||k.st)return;
 if(S.karma<k.k0-30){k.st=-1;log('🕯️ ประกายบางอย่างที่หลับอยู่ในตัวคุณ ดับลงอย่างเงียบๆ เหมือนเทียนโดนลม คุณไม่มีวันรู้ว่าเคยมีอะไรอยู่ตรงนั้น','bad');return}
 if(S.age>=12){k.st=1;x.cb+=.25;S.power+=pp(.15);S.fame+=300;log(`👁️ <b>ความทรงจำเทพตื่น</b> คืนวันเกิดอายุ 12 ภาพชีวิตก่อนพรั่งพรูเข้ามา คุณเคยเป็น「${E(k.tt)}」 เส้นจิตจำทางเดิมได้ (ขีดจำกัดวงแหวน +25% · พลัง +)`,'myth',true)}}

// ---------- 3) สัตว์ของผู้เล่น · สหายแสนปี ----------
const BSK=['เขี้ยว','กรงเล็บ','เสียงคำราม','ปีกพายุ','เกล็ดเหล็ก','หางฟาด','ดวงตาเพลิง'];
const bp=()=>window._sv2BP||null;
async function bpFetch(){const x=Y();x.bpY=S.age;try{const j=await api('bpool&nm='+encodeURIComponent(String(S.name||'').slice(0,24)));if(j&&j.ok){window._sv2BP={l:j.l||[]};if(j.gift&&j.gift.length){x.gq=(x.gq||[]).concat(j.gift).slice(-5)}}}catch(e){}}
{const _hx=window._svHuntX;window._svHuntX=function(g0,i,safe,opts){if(_hx)_hx.apply(this,arguments);try{if(!A1()||!opts)return;const P=bp();if(!P||!P.l.length||Math.random()>.55)return;
 const c=P.l.filter(v=>tierOf(v.y)<=Math.min(8,safe+2));if(!c.length)return;const v=pk(c),t=tierOf(v.y),bb=[v.n,`${pk(BSK)}${v.el||''}`];
 opts.push(O(`🐾 ล่า${E(v.n)} · สัตว์ของผู้เล่น`,`${E(v.sp||'สัตว์อสูร')} ${fmt(v.y)} ปี · ${TIER[t][0]} · เจ้าของจะรู้ว่าใครล่ามัน`,()=>{const ep=Math.max(5,Math.round(tot()*[.35,.65,.95,1.25,1.6,2,2.4,2.8,3.2][t]));
  duel(v.n,ep,w=>{try{if(!S||!S.alive)return;if(!w){S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.18));log(`🩸 ${E(v.n)}หนีเข้าป่าลึกไปพร้อมรอยแผลบนตัวคุณ`,'bad');return}
   const g=S.sv,n0=g.rings.length;P.l=P.l.filter(z=>z!==v);
   const go=()=>{B.absorb(t,bb);if(S.sv.rings.length>n0){const r=S.sv.rings[S.sv.rings.length-1];r.pl=1;log(`🐾 วงแหวนของ <b>${E(v.n)}</b> เคยเป็นชีวิตของผู้เล่นอีกคน ข่าวนี้จะไปถึงเจ้าของมัน`,'myth');api('bhunt',{bo:v.o,nm:S.name,ri:S.sv.rings.length}).catch(()=>{})}};
   S.sv._py=v.y;if(window._svWin)window._svWin(t,bb,go);else go()}catch(e){console.error('sv2 bp',e)}})}))}catch(e){console.error('sv2 hx',e)}}}
function giftTick(){const x=Y(),g=S.sv;if(!x.gq||!x.gq.length||g.aw!==1||S.age<8||g.rings.length>=9)return;const v=x.gq.shift(),t=tierOf(v.y);
 choice(`🩸 ${E(v.n)} มาหาคุณ`,`สัตว์วิญญาณ${E(v.sp||'')}อายุ ${fmt(v.y)} ปี เดินออกมาจากป่า มันคือสัตว์ของ <b>${E(v.fn)}</b> ผู้ส่งมันมาหาคุณ มันคุกเข่าลง และยื่นชีวิตให้เป็นวงแหวน`,[
  O('🙏 รับวงแหวนสังเวย','สัตว์สังเวยข้ามขีดจำกัดได้ ไม่เสี่ยง',()=>{const ad=window._svGreat&&window._svGreat.addRing;let r=null;if(ad)r=ad(t,[v.n,'🐾','',`${pk(BSK)}สังเวย`],{});else{const n0=g.rings.length;B.absorb(Math.min(t,8),[v.n,`${pk(BSK)}สังเวย`]);r=g.rings.length>n0?g.rings[g.rings.length-1]:null}if(r){r.y=v.y;r.sac=1;r.pl=1;S.karma+=2;log(`🩸 ${E(v.n)}สลายเป็นแสง หลอมเป็นวงที่ ${g.rings.length} อายุ ${fmt(v.y)} ปี ในวงแหวนยังได้ยินเสียงหายใจของมันแผ่วๆ`,'myth',true)}}),
  {t:'🕊️ ปล่อยมันกลับป่า',s:'กรรม +',skip:true,f(){S.karma+=6;log(`🕊️ คุณลูบหัว${E(v.n)} แล้วปล่อยให้มันกลับป่า`,'good')}}])}
// เจ้าของสัตว์ (โหมดสัตว์อสูร): ส่งสัตว์เข้าป่าจิตวิญญาณ + สังเวยให้ผู้เล่นที่ถูกใจ
const bmOn=()=>!!(S&&S.alive&&S.beastMode&&S.ch!=='soul');
function bmPush(){if(!bmOn())return;const m=S.beastMode;api('bpush',{n:S.name,sp:m.sp,el:m.el,y:S.age,st:m.st|0}).catch(()=>{})}
window.bmGive=async function(){if(!bmOn())return toast('ใช้ได้ตอนเกิดเป็นสัตว์อสูร');modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🩸 สังเวยตนเป็นวงแหวน</h3><p class="tag2">มอบชีวิตของ ${E(S.name)} (${S.age} ปี) เป็นวงแหวนให้ผู้เล่นทวีปจิตวิญญาณที่คุณถูกใจ · ชีวิตสัตว์ของคุณจะจบลงทันที · มันจะไปหาเขาในชีวิตทวีปจิตวิญญาณยุทธ์ของเขา</p><div id="bmGv"><p class="tag2">กำลังมองหาผู้ครองดวงจิต…</p></div>`,'bmgive');
 let j=null;try{j=await api('bgive',{ls:1})}catch(e){}const el=$('bmGv');if(!el)return;if(!j||!j.ok||!j.l.length){el.innerHTML='<p class="tag2">ตอนนี้ยังไม่มีผู้ครองดวงจิตคนไหนเดินผ่านป่า</p>';return}
 el.innerHTML=j.l.map(p=>`<button class="opt" style="width:100%;margin:3px 0" onclick="bmGiveTo('${p.id}',this)">⭕ ${E(p.nm)}<small>มอบชีวิตเป็นวงแหวนให้คนนี้</small></button>`).join('')};
window.bmGiveTo=async function(to,btn){if(!bmOn())return;if(btn.dataset.c!=='1'){btn.dataset.c='1';btn.querySelector('small').textContent='แตะอีกครั้งเพื่อยืนยัน · ชีวิตนี้จะจบลง';return}
 let j=null;try{j=await api('bgive',{to,fn:S.name,n:S.name,sp:S.beastMode.sp,y:S.age})}catch(e){}if(!j||!j.ok)return toast(j&&j.err==='cd'?'สังเวยได้ครั้งเดียวทุก 12 ชั่วโมง':'ส่งไม่สำเร็จ');
 closeM();const nm=btn.textContent.replace(/^⭕\s*/,'').replace(/แตะอีกครั้ง.*$/,'').trim();S.deathCause=`สังเวยชีวิตเป็นวงแหวนให้ ${nm}`;log(`🩸 <b>${E(S.name)}</b> หลับตาลง ร่างสลายเป็นแสงลอยข้ามขอบฟ้าไปหา ${E(nm)} ชีวิตนี้จบลงอย่างสงบ`,'myth',true);S.hp=0;setTimeout(()=>{try{checkDeath();render()}catch(e){}},200)};
{const _om=window.openMenu||openMenu;const nw=function(){const r=_om.apply(this,arguments);try{if(bmOn()&&S.age>=10){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.bmGv'))g.insertAdjacentHTML('beforeend','<button class="opt bmGv" onclick="bmGive()">🩸 สังเวยตนเป็นวงแหวน<small>มอบชีวิตให้ผู้ครองดวงจิตที่ถูกใจ</small></button>')}}catch(e){}return r};openMenu=nw;window.openMenu=nw}
// สหายแสนปีที่แปลงเป็นมนุษย์
const CPS=[['กระต่าย','🐇','กระต่ายหยกแสนปี','ดวงตาหยกแห่งรัก'],['จิ้งจอก','🦊','จิ้งจอกเก้าหางแสนปี','เพลิงจันทร์เก้าหาง'],['งู','🐍','งูขาวมรกตแสนปี','เกล็ดมรกตพันชั้น'],['กวาง','🦌','กวางเขาแก้วแสนปี','เขาแก้วสะท้อนฟ้า']];
function cpTick(){const g=S.sv,x=Y();
 if(!x.cp&&!x.cpN&&g.aw===1&&S.age>=9&&S.age<=14&&Math.random()<.12){x.cpN=1;const c=pk(CPS),gn=S.gender==='ชาย'?'หญิง':'ชาย';let nm='เสี่ยวอู่';try{nm=anyName(gn)}catch(e){}
  choice('🌸 เด็กแปลกหน้าในหมู่บ้าน',`มีเด็กอายุไล่เลี่ยกับคุณชื่อ <b>${E(nm)}</b> ย้ายมาอยู่ท้ายหมู่บ้าน ไม่มีพ่อแม่ ไม่มีใครรู้ว่ามาจากไหน กลิ่นตัวเหมือนป่าหลังฝนตก`,[
   O('🤝 ชวนมาเป็นเพื่อน','',()=>{x.cp={n:nm,c:CPS.indexOf(c),bd:45,st:1,a:S.age};log(`🌸 <b>${E(nm)}</b> ยิ้มครั้งแรกตั้งแต่มาถึง จากนี้คุณมีเพื่อนคนหนึ่งที่ไม่เคยเล่าเรื่องตัวเองเลย`,'good')}),
   {t:'ไม่ยุ่ง',s:'',skip:true,f(){log(`🌸 ${E(nm)}ย้ายออกจากหมู่บ้านไปเงียบๆ ในปีต่อมา`,'')}}]);return}
 const p=x.cp;if(!p)return;
 if(p.st===1){p.bd=cl(p.bd+3+Math.floor(Math.random()*5),0,100);if(Math.random()<.15)log(pk([`🌸 ${E(p.n)}ชอบแครอทและหญ้าอ่อนมากผิดปกติ`,`🌸 ${E(p.n)}กลัวนักล่าวงแหวนจนตัวสั่นทุกครั้งที่มีขบวนผ่าน`,`🌸 ${E(p.n)}พาคุณหลบพายุได้ก่อนทุกคนรู้ตัวเสมอ`,`🌸 ${E(p.n)}ไม่เคยแก่ลงเลยแม้แต่ปีเดียว`]),'');
  if(S.age>=16&&p.bd>=60&&(g.rings.length>=3||S.age>=24)&&Math.random()<.35){p.st=2;cpReveal(p)}return}
 if(p.st===3&&p.fr&&!p.rv&&S.age>=40&&isGod(g)&&S.karma>=40&&Math.random()<.4){p.rv=1;cpRevive(p)}}
function cpReveal(p){const c=CPS[p.c]||CPS[0],g=S.sv,i=g.rings.length;
 choice(`${c[1]} ความลับของ ${E(p.n)}`,`ขบวนนักล่าวงแหวนล้อม ${E(p.n)} ไว้กลางป่า แสงสีชมพูพุ่งออกจากร่างเผยตัวตนจริง <b>${c[2]}</b> สัตว์วิญญาณที่ข้ามแสนปีแล้วแปลงเป็นมนุษย์ เพื่อมาอยู่ข้างคุณ<br>${E(p.n)}หันมายิ้ม "ให้ฉันเป็นวงแหวนของเธอเถอะ ดีกว่าตกเป็นของพวกเขา"`,[
  O('💔 รับวงแหวนแสนปี','พลังมหาศาล · เธอจะหายไป',()=>{const ad=window._svGreat&&window._svGreat.addRing;let r=null;if(ad)r=ad(4,[c[2],c[1],'',c[3]],{});else{const n0=g.rings.length;B.absorb(4,[c[2],c[3]]);r=g.rings.length>n0?g.rings[g.rings.length-1]:null}
   if(r){r.y=100000+Math.floor(Math.random()*9000);r.sac=1;r.cp=1;S.power+=pp(.25)}p.st=3;p.fr=1;S.karma+=5;log(`${c[1]} <b>${E(p.n)}</b> สลายเป็นแสง หลอมเป็นวงแหวนแสนปีในร่างคุณ ไม่มีความเจ็บปวดเลยแม้แต่น้อย มีแต่ความอบอุ่น… และเสียงหัวเราะเบาๆ ที่ยังวนอยู่ข้างในวงแหวน`,'myth',true)}),
  O('❤️ ปกป้องเธอ','สู้กับนักล่าทั้งขบวน',()=>{const ep=Math.max(5,Math.round(tot()*1.1));duel('ขบวนนักล่าวงแหวน',ep,w=>{try{if(w){p.st=4;S.karma+=10;S.spouse=S.spouse||p.n;log(`❤️ คุณยืนขวางขบวนนักล่าจนถอยไปหมด ${E(p.n)}ร้องไห้ครั้งแรกในชีวิตแสนปี จากนี้เธอไม่ต้องเป็นวงแหวนของใคร`,'myth',true)}
    else{const ad=window._svGreat&&window._svGreat.addRing;let r=null;if(ad&&g.rings.length<9)r=ad(4,[c[2],c[1],'',c[3]],{});if(r){r.y=100000+Math.floor(Math.random()*9000);r.sac=1;r.cp=1}p.st=3;p.fr=1;S.hp=Math.max(1,Math.round(S.hp*.3));log(`💔 คุณล้มลง ${E(p.n)}กระโดดเข้ามาขวางดาบเล่มสุดท้าย แล้วสลายเป็นแสงเข้าสู่ร่างคุณก่อนพวกมันจะได้ตัวเธอ`,'myth',true)}render()}catch(e){}})}),
  {t:'🕊️ บอกให้เธอหนีไป',s:'ไม่ได้อะไร · กรรม +',skip:true,f(){p.st=5;S.karma+=12;log(`🕊️ คุณดึงความสนใจนักล่าไว้ ${E(p.n)}หนีเข้าป่าลึก ก่อนไปเธอหันมามองคุณนานมาก`,'good')}}])}
function cpRevive(p){const c=CPS[p.c]||CPS[0],g=S.sv,ri=g.rings.findIndex(r=>r.cp);if(ri<0)return;
 choice(`${c[1]} เสียงเรียกจากวงแหวนที่ ${ri+1}`,`คืนหนึ่งวงแหวนแสนปีของ ${E(p.n)} ส่องแสงเอง พลังเทพของคุณทำให้ได้ยินชัด "ฉันยังอยู่ตรงนี้" ถ้ายอมคืนวงแหวนวงนี้ด้วยพลังเทพ เธออาจกลับมาเป็นมนุษย์ได้อีกครั้ง`,[
  O('🌸 คืนวงแหวน ชุบชีวิตเธอ','เสียวงแหวนวงนี้และพลังส่วนหนึ่ง',()=>{g.rings.splice(ri,1);S.power=Math.max(1,Math.round(S.power*.85));S.spouse=p.n;p.st=4;S.karma+=10;log(`🌸 วงแหวนแตกออกเป็นกลีบดอกไม้ ${E(p.n)}ยืนอยู่ตรงหน้าคุณ ไม่แก่ลงเลยสักวัน "นานจังนะ" — เธอกลับมาเป็นคู่ชีวิตของคุณ`,'myth',true)}),
  {t:'เก็บเธอไว้ในวงแหวน',s:'',skip:true,f(){log('💭 คุณแตะวงแหวนเบาๆ แสงค่อยๆ หรี่ลง','')}}])}

// ---------- รายปี ----------
function yearTick(){tagAll();if(bmOn()){if(S.age%5===0||!window._sv2BM){window._sv2BM=1;bmPush()}return}if(!A1())return;const g=S.sv,x=Y();
 x.cb+=.012;
 if(S.age>=8&&S.age<=45&&Math.random()<.06){const k=Math.random()<.7?'pill':'bone';if(k==='pill'){x.it.pill++;log('💊 คุณพบยาขยายเส้นจิตในซากถ้ำเก่า เก็บไว้ใช้ตอนวงแหวนเกินขีด','good')}else if(x.bu<3){x.bu++;x.cb+=.12;log('🦴 คุณได้กินผลไม้กระดูกพันปีโดยบังเอิญ ขีดจำกัดวงแหวนทุกวง +12% ถาวร','good')}}
 sparkTick();if(x.bpY==null||S.age-x.bpY>=8)bpFetch();
 if(!choice._cur){giftTick();if(!choice._cur)cpTick()}
 if(!choice._cur&&!isGod(g)&&(g.lv||0)>=40&&S.age>=16&&(x.gtN|0)<2&&(x.gtY==null||S.age-x.gtY>=8)&&Math.random()<.07)godEncounter()}
function godWatch(){try{if(!on())return;const g=S.sv,x=Y();if(isGod(g)&&!(x.gd&&x.gd.tt)&&!choice._cur){x.gd=x.gd||{at:S.age};godAscend()}}catch(e){}}
{const _yr=passYear;const nw=function(){const r=_yr.apply(this,arguments);try{yearTick();setTimeout(godWatch,400)}catch(e){console.error('sv2 year',e)}return r};passYear=nw;try{window.passYear=nw}catch(e){}}
setInterval(godWatch,3000);

// ---------- หน้าดวงจิต ----------
{const _os=window.openSoul;if(_os)window.openSoul=function(){const r=_os.apply(this,arguments);try{if(!on())return r;tagAll();const g=S.sv,x=Y(),m=$('modal');if(!m)return r;
 const rows=[...m.querySelectorAll('h4 ~ div')].filter(d=>/วงที่ \d/.test(d.textContent)&&!d.classList.contains('item'));
 rows.forEach((d,i)=>{const rg=g.rings[i];if(!rg||d.querySelector('.sv2Y'))return;const sp=d.querySelector('span:last-child');if(sp)sp.insertAdjacentHTML('beforeend',` <span class="tag2 sv2Y">· <b>${fmt(rg.y)} ปี</b>${rg.ov?' ⚡ข้ามขีด':''}${rg.cr?' 💔ร้าว':''}${rg.sac?' 🩸สังเวย':''}${rg.pl?' 🐾':''}</span>`)});
 const bk=m.querySelector('button[onclick="openSoulBook()"]');
 if(bk&&!m.querySelector('.sv2Cap')&&g.aw===1){const i=g.rings.length,nx=i<9?capAt(i):null;
  bk.insertAdjacentHTML('beforebegin',`<div class="item sv2Cap"><b>🔒 ขีดจำกัดอายุวงแหวน</b><br>${i<9?`วงที่ ${i+1} รับได้ไม่เกิน <b>${fmt(nx)} ปี</b>`:'ครบเก้าวงแล้ว'} <span class="tag2">· ขัดเกลาสะสม +${Math.round(x.cb*100)}%${x.tb?` · ยา +${Math.round(x.tb*100)}%`:''} · 💊 ${x.it.pill}</span><br><span class="tag2">เกินขีด = เดิมพัน สำเร็จได้วงแหวนข้ามขีด พลาดอาจร้าว บาดเจ็บ หรือตาย · สัตว์สังเวยข้ามขีดได้</span>
  <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:5px"><button class="gbtn" style="flex:1" onclick="sv2Train()"${x.tr===S.age?' disabled':''}>🧘 ขัดเกลาเส้นจิต</button><button class="gbtn" style="flex:1" onclick="sv2Buy('pill')">💊 ยา 1,500</button><button class="gbtn" style="flex:1" onclick="sv2Buy('bone')"${x.bu>=3?' disabled':''}>🦴 บำรุงกระดูก 4,000</button></div></div>`)}
 if(bk&&!m.querySelector('.sv2God')){const gd=x.gd,inh=x.inh,sk=x.sk;let h='';
  if(gd&&gd.tt)h+=`👑 <b>${E(gd.tt)}</b>${gd.tid&&gd.tid!=='…'?' · <span class="tag2">บททดสอบของคุณอยู่ในวิหารแล้ว</span>':` <button class="pbtn" style="margin-top:4px;width:100%" onclick="sv2GodMk()">🌟 สร้างบททดสอบเทพ</button>`}`;
  if(inh)h+=`${h?'<br>':''}<span class="tag2">สืบทอดความเป็นเทพจาก「${E(inh.tt)}」ของ ${E(inh.by)}</span>`;
  if(sk&&sk.st===1)h+=`${h?'<br>':''}<span class="tag2">👁️ ความทรงจำจากชาติก่อน:「${E(sk.tt)}」</span>`;
  bk.insertAdjacentHTML('beforebegin',`<div class="item sv2God">${h?h+'<br>':''}<button class="gbtn" style="width:100%;margin-top:4px" onclick="svTemple()">🏛️ วิหารเทพ · บัลลังก์เทพ</button></div>`)}
 }catch(e){console.error('sv2 os',e)}return r}}
try{window.wReady&&window.wReady('soul2')}catch(e){}
})()}catch(e){console.error('soul2 block',e)}
