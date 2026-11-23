// ============================================================
// /w/chron2.js 🎴 ชั้น B — ลูกเล่นเฉพาะโลก (ยุทธภพ · เซียน · แดนเทพ · จิตวิญญาณยุทธ์ · ผู้ย้อนกาล)
//  ทุกโลก: 🤲 หนี้น้ำใจ — คนที่คุณเคยช่วยจำไว้ แล้วกลับมาช่วยตอนคุณลำบาก
//  ยุทธภพ/ย้อนกาล: 🪡 ถูกพิษ → ฝังเข็มถอนพิษ (มินิเกมใหม่)
//  เซียน: ⚗️ หลอมยาเม็ด คุมไฟเตา (มินิเกมใหม่) · ⏳ ลงทุนข้ามเวลา (ฝากไว้ร้อยปี ได้คืนหรือไม่ได้)
//  แดนเทพ: 🪐 ปั้นดาว จัดธาตุให้สมดุล (มินิเกมใหม่) · ⏳ ลงทุนข้ามเวลา
//  จิตวิญญาณยุทธ์: 🦌 ไม่ล่าก็ได้ (ช่วยสัตว์วิญญาณ มันกลับมามอบพลังให้เอง) · ⭕ ดูดวงแหวนเกินขีด (คุมลมหายใจ) · 🤝 ทักษะประสานทีม (กดตามจังหวะ)
//  ผู้ย้อนกาล: 🧠 ภาพซ้อนจากรอบก่อน — เรียงความทรงจำให้ถูกเพื่อหยุดเหตุร้าย (มินิเกมใหม่)
//  ข้อมูลอยู่ที่ S._c2 · ห่อ yearExtras
// ============================================================
try{(()=>{
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),rp=a=>a[Math.floor(Math.random()*a.length)],P=p=>Math.random()<p;
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
function WK(){if(!S)return'';try{if(S.mw||S.beastMode)return'';if(S.ch==='soul')return'soul';if(S.ch==='regress')return'rg';if(S.ch&&/^(hell|short|junk)$/.test(S.ch))return'';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'}
const CUR=()=>({xian:'หินวิญญาณ',god:'แสงศรัทธา',soul:'เหรียญวิญญาณ'})[WK()]||'ตำลึง';
const NM=g=>{try{return anyName(g||rp(['ชาย','หญิง']))}catch(e){return rp(['หลิว เฟย','จาง หยุน','หวัง ซาน'])}};
const tot=()=>{try{return total()}catch(e){return +S.power||100}};
function eff(o,line,cls){o=o||{};const out=[],num=(k,v,lab)=>{if(!v)return;S[k]=(+S[k]||0)+v;out.push(`${lab} ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)};
 if(o.money){const v=Math.round(o.money);S.money=Math.max(0,(+S.money||0)+v);out.push(`${CUR()} ${v>0?'+':'−'}${Math.abs(v).toLocaleString()}`)}
 num('fame',o.fame,'ชื่อเสียง');num('int',o.int,'ปัญญา');
 if(o.karma){S.karma=(+S.karma||0)+o.karma;out.push(o.karma>0?`บุญ +${o.karma}`:`บาป +${-o.karma}`)}
 if(o.pow){const v=Math.round(Math.max(15,tot()*Math.abs(o.pow)/100));S.power=Math.max(0,(+S.power||0)+(o.pow>0?v:-Math.min(v,(+S.power||0)*.3)));out.push(`พลังยุทธ์ ${o.pow>0?'+':'−'}${v.toLocaleString()}`)}
 if(o.hp){const v=Math.round((+S.maxHp||100)*o.hp/100);S.hp=Math.max(1,Math.min(+S.maxHp||100,(+S.hp||0)+v));out.push(`พลังชีวิต ${v>0?'+':'−'}${Math.abs(v)}`)}
 const sum=out.length?` <span class="tag2">(${out.join(' · ')})</span>`:'';if(line)try{log(line+sum,cls||'epic',true)}catch(e){}return sum}
function ask(t,x,o){try{choice(t,x,o.map(([tt,ss,f])=>({t:tt,s:ss||'',f(){try{f()}catch(e){console.error('c2',e)}}})))}catch(e){console.error('c2ask',e)}}
const G=()=>{if(!S._c2)S._c2={cd:{},debt:[],inv:null,k0:+S.karma||0,bst:null};return S._c2};
const cdOk=(id,y)=>{const g=G();return g.cd[id]==null||S.age-g.cd[id]>=y};const cdSet=id=>{G().cd[id]=S.age};

// ---------- มินิเกมใหม่ ----------
let MG=null;const isAuto=()=>{try{return !!auto}catch(e){return false}};
function end_(sc){if(!MG)return;const m=MG;MG=null;clearInterval(m.t);clearTimeout(m.t2);try{closeM()}catch(e){}setTimeout(()=>{try{m.cb(Math.max(0,Math.min(1,sc)))}catch(e){console.error(e)}try{render()}catch(e){}},120)}
window.c2Skip=()=>end_(.45);
function MGx(kind,ti,sub,cb){if(isAuto()){setTimeout(()=>cb(.35+Math.random()*.45),50);return}MG={cb,t:0,t2:0};
 const shell=b=>modal(`<div class="c2Mg"><h3>${ti}</h3><p class="tag2">${sub}</p>${b}<button class="gbtn" style="width:100%;margin-top:10px" onclick="c2Skip()">⏭ ข้าม (ผลกลางๆ)</button></div>`,'c2mg');
 // 🪡 ฝังเข็ม: จุดสว่างตามลำดับ แล้วกดตาม
 if(kind==='needle'){const N=9,seq=[];while(seq.length<5){const x=rnd(0,N-1);if(seq[seq.length-1]!==x)seq.push(x)}let i=0,phase='show',ok=0;
  shell(`<div class="c2Body"><svg viewBox="0 0 100 140" class="c2Fig"><circle cx="50" cy="18" r="12"/><rect x="34" y="32" width="32" height="50" rx="10"/><rect x="20" y="34" width="10" height="42" rx="5"/><rect x="70" y="34" width="10" height="42" rx="5"/><rect x="36" y="84" width="11" height="48" rx="5"/><rect x="53" y="84" width="11" height="48" rx="5"/></svg>${[[50,18],[42,42],[58,42],[50,60],[25,60],[75,60],[50,76],[41,110],[59,110]].map(([x,y],k)=>`<button class="c2Pt" data-k="${k}" style="left:${x}%;top:${y/1.4}%" onclick="c2Pt(${k})" aria-label="จุด ${k+1}"></button>`).join('')}</div><div class="c2St" id="c2St">จำลำดับจุดที่สว่าง…</div>`);
  const flash=k=>{const b=document.querySelector(`.c2Pt[data-k="${k}"]`);if(b){b.classList.add('on');setTimeout(()=>b.classList.remove('on'),420)}};
  let s=0;MG.t=setInterval(()=>{if(!MG)return;if(s<seq.length){flash(seq[s]);s++}else{clearInterval(MG.t);phase='do';const e=$('c2St');if(e)e.textContent=`ปักเข็มตามลำดับ (${seq.length} จุด)`}},620);
  window.c2Pt=k=>{if(!MG||phase!=='do')return;flash(k);if(k===seq[i]){ok++;i++;try{sfx('good')}catch(e){}if(i>=seq.length)end_(ok/seq.length)}else{try{sfx('bad')}catch(e){}end_(ok/seq.length*.8)}};
  MG.t2=setTimeout(()=>end_(ok/seq.length),22000);return}
 // ⚗️/⭕ คุมแถบ: กดค้างให้ขึ้น ปล่อยให้ลง ประคองเข็มในช่วงสีเขียว
 if(kind==='furnace'||kind==='breath'){let v=30,hold=0,inb=0,tk=0;const T=80,lo=kind==='breath'?45:55,hi=kind==='breath'?70:78;
  shell(`<div class="c2Gauge"><div class="c2Band" style="bottom:${lo}%;height:${hi-lo}%"></div><i id="c2N" style="bottom:30%"></i></div><div class="c2St" id="c2St">${kind==='breath'?'🌬️ หายใจ':'🔥 ไฟเตา'}</div><button class="pbtn" style="width:100%;font-size:18px;padding:14px;touch-action:none;user-select:none" onpointerdown="c2H(1,event)" onpointerup="c2H(0)" onpointerleave="c2H(0)" onpointercancel="c2H(0)">${kind==='breath'?'🌬️ กดค้าง = สูดลมหายใจ':'🔥 กดค้าง = เร่งไฟ'}</button>`);
  window.c2H=(h,e)=>{try{e&&e.preventDefault()}catch(x){}hold=h};
  MG.t=setInterval(()=>{tk++;v+=hold?2.6:-1.9;v+=Math.sin(tk/5)*.8;v=Math.max(0,Math.min(100,v));if(v>=lo&&v<=hi)inb++;const n=$('c2N');if(n){n.style.bottom=v+'%';n.className=v>=lo&&v<=hi?'ok':''}const s=$('c2St');if(s)s.textContent=`${kind==='breath'?'🌬️':'🔥'} อยู่ในช่วงพอดี ${Math.round(inb/Math.max(1,tk)*100)}% · เหลือ ${((T-tk)/10).toFixed(1)} วิ`;
   if(v>=99&&kind==='furnace'){return end_(inb/T*.6)}if(tk>=T)end_(inb/T*1.15)},100);return}
 // 🤝 ประสานทีม: ตัวชี้วิ่งไปมา กดตอนอยู่ในเป้า 4 ครั้ง
 if(kind==='combo'){let p=0,d=1,hit=0,n=0,sp=2.4;const tg=()=>rnd(20,70);let a=tg();
  shell(`<div class="c2Bar"><div class="c2Tg" id="c2Tg" style="left:${a}%"></div><i id="c2P"></i></div><div class="c2St" id="c2St">คอมโบ 0/4</div><button class="pbtn" style="width:100%;font-size:18px;padding:14px;touch-action:manipulation" onpointerdown="c2C(event)">⭕ ปล่อยทักษะ!</button>`);
  MG.t=setInterval(()=>{p+=d*sp;if(p>=100||p<=0)d=-d;const e=$('c2P');if(e)e.style.left=p+'%'},16);
  window.c2C=e=>{try{e&&e.preventDefault()}catch(x){}if(!MG)return;const ok=p>=a&&p<=a+12;hit+=ok?1:0;n++;try{sfx(ok?'good':'bad')}catch(x){}const s=$('c2St');if(s)s.textContent=`คอมโบ ${hit}/4 ${ok?'✨':'💨'}`;if(n>=4)return end_(hit/4);a=tg();sp+=.5;const t=$('c2Tg');if(t)t.style.left=a+'%'};
  MG.t2=setTimeout(()=>end_(hit/4),20000);return}
 // 🧠 เรียงความทรงจำ
 if(kind==='order'){const SC=rp([['กลิ่นควันจากโรงเตี๊ยม','เสียงระฆังวัดดังผิดเวลา','ประตูทิศใต้พัง','คนร้องให้ช่วยจากบ่อน้ำ'],['ม้าเร็วนำสาส์นมาถึง','เจ้าเมืองปิดประตู','พ่อค้าเกลือหายตัว','ไฟไหม้คลังเสบียง'],['ฝนตกหนักสามวัน','สะพานไม้ขาด','เด็กชายพลัดตกน้ำ','โจรข้ามแม่น้ำมาตอนกลางคืน']]),sh=SC.map((t,i)=>({t,i})).sort(()=>Math.random()-.5);let k=0,ok=0;
  shell(`<p style="text-align:center">แตะเรียงตามลำดับที่เกิดขึ้นในรอบก่อน</p><div class="c2Ord">${sh.map(x=>`<button data-i="${x.i}" onclick="c2O(this)">${E(x.t)}</button>`).join('')}</div>`);
  window.c2O=b=>{if(!MG||b.disabled)return;const i=+b.dataset.i;b.disabled=true;b.insertAdjacentHTML('afterbegin',`<b>${k+1}</b> `);if(i===k){ok++;b.classList.add('ok')}else b.classList.add('bad');k++;if(k>=4)setTimeout(()=>end_(ok/4),500)};
  MG.t2=setTimeout(()=>end_(ok/4),25000);return}
 // 🪐 ปั้นดาว: สามธาตุลดลงเรื่อยๆ แตะเติมให้ทุกแท่งอยู่ในช่วงกลาง
 if(kind==='balance'){const v=[50,50,50],nm=['🔥 ไฟ','💧 น้ำ','🌍 ดิน'],dr=[1.2,0.9,1.5];let tk=0,good=0;
  shell(`<div class="c2Bal">${nm.map((n,i)=>`<div><div class="c2Col"><div class="c2Band" style="bottom:35%;height:30%"></div><i id="c2B${i}" style="height:50%"></i></div><button onclick="c2B(${i})">${n}</button></div>`).join('')}</div><div class="c2St" id="c2St">ประคองให้ทุกธาตุอยู่ในช่วงกลาง</div>`);
  window.c2B=i=>{v[i]=Math.min(100,v[i]+14)};
  MG.t=setInterval(()=>{tk++;for(let i=0;i<3;i++){v[i]=Math.max(0,v[i]-dr[i]*(1+tk/200));const e=$('c2B'+i);if(e){e.style.height=v[i]+'%';e.className=v[i]>=35&&v[i]<=65?'ok':''}}if(v.every(x=>x>=35&&x<=65))good++;const s=$('c2St');if(s)s.textContent=`สมดุล ${Math.round(good/tk*100)}% · เหลือ ${((90-tk)/10).toFixed(1)} วิ`;if(tk>=90)end_(good/90*1.4)},100);return}
 cb(.5)}
window._c2MG=MGx;

// ---------- 🤲 หนี้น้ำใจ (ทุกโลก) ----------
const WHY=['คนที่คุณแบ่งข้าวให้ในปีอดอยาก','เด็กที่คุณช่วยจากแม่น้ำ','หญิงชราที่คุณพาข้ามเขา','พ่อค้าที่คุณไม่ยอมปล้นแม้มีโอกาส','ทหารบาดเจ็บที่คุณซ่อนไว้','คนแปลกหน้าที่คุณให้ยืมเงินโดยไม่ถามชื่อ'];
function debtTick(){const g=G(),k=+S.karma||0;if(k-g.k0>=5&&g.debt.length<5&&P(.55)){const d={n:NM(),why:rp(WHY),y:S.age};g.debt.push(d);try{log(`🤲 <b>${E(d.n)}</b> — ${d.why} — จำบุญคุณคุณไว้ในใจ`,'',false)}catch(e){}}g.k0=k;
 if(!g.debt.length||!cdOk('debt',4)||S.age<14)return false;const d=g.debt[0],low=(+S.hp||0)<(+S.maxHp||100)*.3,poor=(+S.money||0)<30&&S.age>=18;if(!low&&!poor)return false;
 g.debt.shift();cdSet('debt');const yrs=Math.max(1,S.age-d.y);
 ask('🤲 คนที่ไม่เคยลืม',`<b>${E(d.n)}</b> ${d.why} เมื่อ ${yrs} ปีก่อน ยืนอยู่หน้าประตู${low?' พร้อมห่อยาสมุนไพรที่หามาด้วยเงินเก็บทั้งชีวิต':' พร้อมถุงเงินที่เก็บไว้ให้คุณโดยเฉพาะ'} "วันนี้ถึงตาข้าตอบแทนแล้ว"`,[
  ['รับน้ำใจ','',()=>eff(low?{hp:45}:{money:Math.round(200*(S.xian?3:1)+S.age*20)},`🤲 ${E(d.n)}จากไปโดยไม่ขออะไรกลับ`,'epic')],
  ['ปฏิเสธ แล้วให้เขาเก็บไว้','',()=>eff({karma:8},`🙏 คุณยิ้มแล้วปิดห่อคืนให้ ${E(d.n)}ร้องไห้ แล้วไปเล่าเรื่องคุณให้ทั้งหมู่บ้านฟัง`)]]);return true}

// ---------- 🪡 ถูกพิษ (ยุทธภพ/ย้อนกาล) ----------
function poison(){if(!cdOk('poi',7)||S.age<16||!P(.045))return false;cdSet('poi');const by=rp(['เข็มอาบพิษจากมือมืด','ชาที่มีกลิ่นอัลมอนด์','แผลจากใบมีดเคลือบพิษงู','หมอกพิษในหุบเขา']);
 ask('☠️ ถูกพิษ',`คุณถูก<b>${by}</b> ปลายนิ้วเริ่มเขียวคล้ำ พิษกำลังวิ่งเข้าหาหัวใจ มีเวลาไม่ถึงชั่วยาม`,[
  ['ฝังเข็มถอนพิษเอง','มินิเกม',()=>MGx('needle','🪡 ฝังเข็มถอนพิษ','จำลำดับจุดที่สว่าง แล้วแตะตาม',sc=>{if(sc>=.8)eff({pow:3,int:2},'🪡 <b>พิษถูกขับออกทางปลายนิ้ว</b> เส้นลมปราณโล่งกว่าเดิม','epic');else if(sc>=.4)eff({hp:-15},'🪡 ขับพิษได้ครึ่งหนึ่ง ที่เหลือต้องพักฟื้น','');else eff({hp:-35},'🩸 ปักผิดจุด พิษแล่นเร็วขึ้น','bad')})],
  ['รีบไปหาหมอ','',()=>{const c=Math.round(300*(S.xian?3:1));if((+S.money||0)<c)return eff({hp:-30},'💸 หมอไม่รับรักษาเพราะไม่มีเงิน คุณรอดมาได้อย่างหวุดหวิด','bad');eff({money:-c,hp:-5},'💊 หมอถอนพิษทันเวลา')}],
  ['ฝืนลมปราณขับพิษ','',()=>{if(P(.4))eff({pow:5,hp:-20},'🔥 ลมปราณเดือดจนพิษระเหย ร่างคุณแกร่งขึ้น','epic');else eff({hp:-40},'🩸 พิษกับลมปราณตีกันในอก','bad')}]]);return true}

// ---------- 🧠 ภาพซ้อนจากรอบก่อน (ผู้ย้อนกาล) ----------
function deja(){if(!cdOk('deja',4)||S.age<16||!P(.09))return false;cdSet('deja');
 ask('🧠 ภาพซ้อน','คุณยืนอยู่กลางตลาดแล้วจู่ๆ ภาพจากรอบก่อนก็ซ้อนขึ้นมา — วันนี้แหละที่เรื่องร้ายเกิดในรอบที่แล้ว แต่ลำดับเหตุการณ์ในหัวปนกันไปหมด',[
  ['เรียงความทรงจำให้ถูก แล้วลงมือ','มินิเกม',()=>MGx('order','🧠 เรียงความทรงจำ','แตะตามลำดับที่เกิดจริง',sc=>{if(sc>=.75)eff({fame:600,karma:10,int:3},'⏳ <b>คุณลงมือก่อนเรื่องร้ายจะเกิดหนึ่งก้าว</b> ไม่มีใครตายในวันนี้ ไม่มีใครรู้ด้วยว่ามันเคยมีคนตาย','myth');else if(sc>=.5)eff({karma:4},'⏳ คุณช่วยได้บางส่วน','');else eff({hp:-15,int:-1},'🌀 คุณจำผิดลำดับ ไปผิดที่ และเหตุร้ายก็เกิดเหมือนเดิม','bad')})],
  ['ปล่อยให้ทุกอย่างเป็นไปเหมือนเดิม','',()=>eff({int:2},'👁️ คุณเฝ้าดูเรื่องเดิมเกิดซ้ำ จดทุกรายละเอียดไว้สำหรับรอบหน้า')]]);return true}

// ---------- ⚗️ หลอมยา (เซียน) ----------
function alchemy(){if(!cdOk('alc',18)||!P(.07))return false;cdSet('alc');const herb=rp(['หญ้าเก้าใบใต้น้ำตก','เห็ดหลินจือพันปี','ผลไม้มังกรแดง','ดอกบัวหิมะ']);
 ask('⚗️ หลอมยาเม็ด',`คุณได้<b>${herb}</b>มาครบสูตร เตาหลอมพร้อม ไฟต้องคุมให้นิ่งตลอดเจ็ดวันเจ็ดคืน`,[
  ['หลอมเอง','มินิเกม',()=>MGx('furnace','⚗️ คุมไฟเตาหลอม','กดค้างเร่งไฟ ปล่อยให้ไฟลด · ประคองเข็มในช่วงเขียว · ไฟแรงเกินเตาระเบิด',sc=>{if(sc>=.85)eff({pow:18,fame:800},'💎 <b>ยาเม็ดเกรดสวรรค์!</b> ลายเมฆเก้าวงบนผิวยา ทั้งนิกายมาขอดู','myth');else if(sc>=.55)eff({pow:8},'💊 ยาเม็ดเกรดดี','epic');else if(sc>=.3)eff({pow:2},'💊 ยาเม็ดเกรดต่ำ ใช้ได้แต่ไม่คุ้ม','');else eff({hp:-30},'💥 เตาระเบิด! คิ้วไหม้ทั้งสองข้าง','bad')})],
  ['จ้างนักหลอมยาของนิกาย','',()=>{const c=600;if((+S.money||0)<c)return eff({},'💸 หินวิญญาณไม่พอ','');eff({money:-c,pow:6},'💊 ได้ยาเม็ดเกรดดี โดยไม่ต้องเสี่ยงเอง')}],
  ['ขายสมุนไพรทั้งชุด','',()=>eff({money:900})]]);return true}

// ---------- ⏳ ลงทุนข้ามเวลา (เซียน/แดนเทพ) ----------
function invest(){const g=G();if(g.inv){if(S.age<g.inv.at)return false;const v=g.inv;g.inv=null;const r=Math.random();
  if(r<.2){ask('⏳ ร้อยปีที่รอ',`คุณกลับไปที่${v.p}ที่ฝากไว้ ${S.age-v.y} ปีก่อน… เหลือแต่ซากอิฐ ผู้ดูแลตายไปนานแล้ว และไม่มีใครรู้ว่าของของคุณไปไหน`,[['ปล่อยวาง','',()=>eff({karma:3},'🍂 กาลเวลากินทุกอย่าง แม้แต่สัญญา')],['ตามหาลูกหลานผู้ดูแล','',()=>{if(P(.5))eff({money:v.m*2},'🔍 หลานของผู้ดูแลเก็บของไว้ครบ รอคุณมาตลอด','epic');else eff({},'🔍 ไม่เจอใคร','')}]]);return true}
  if(r<.35){ask('⏳ ดอกเบี้ยที่ไม่ใช่เงิน',`${v.p}ไม่มีเงินคืนให้ แต่ยื่นกล่องไม้เก่าให้แทน ข้างในคือของวิเศษที่เพิ่มค่าเองตลอด ${S.age-v.y} ปี`,[['รับไว้','',()=>eff({pow:20,fame:500},'🎁 พลังพันปีในกล่องไม้ไหลเข้าสู่คุณ','myth')]]);return true}
  const mul=rnd(3,8);ask('⏳ ผลของการรอ',`ของที่ฝากไว้ที่${v.p}เมื่อ ${S.age-v.y} ปีก่อน งอกเงยเป็น ${mul} เท่า`,[['รับคืน','',()=>eff({money:v.m*mul},'💰 กาลเวลาคือเพื่อนของผู้ที่อยู่ได้นาน','epic')]]);return true}
 if(!cdOk('inv',40)||!P(.03)||(+S.money||0)<100)return false;cdSet('inv');const L=+S.lifespan||200;if(L-S.age<150)return false;
 const p=WK()==='god'?rp(['ดาวดวงเล็กที่ไม่มีใครรู้จัก','วิหารที่ลึกที่สุดในแดนเทพ']):rp(['ร้านพันปีที่ตีนเขาหิมะ','ถ้ำลับใต้ต้นสนพันปี','สำนักแลกเงินของตระกูลหมื่นปี']);
 ask('⏳ ฝากไว้กับกาลเวลา',`${p} รับฝากของมีค่า สัญญาว่าจะงอกเงยเป็นหลายเท่าเมื่อเวลาผ่านไป "ร้อยปี สองร้อยปี เราไม่เคยรีบ"`,[
  ['ฝากหนึ่งในสาม','',()=>{const m=Math.round((+S.money||0)/3);S.money-=m;g.inv={m,p,y:S.age,at:S.age+rnd(100,280)};eff({},`📜 คุณฝาก ${m.toLocaleString()} ${CUR()} แล้วรับป้ายไม้แผ่นเล็กกลับมา`)}],
  ['ไม่ไว้ใจ','',()=>{}]]);return true}

// ---------- 🪐 ปั้นดาว (แดนเทพ) ----------
function planet(){if(!cdOk('pl',60)||!P(.05))return false;cdSet('pl');
 ask('🪐 ดาวดวงใหม่','ฝุ่นดาวในแดนเทพรวมตัวกันเป็นก้อน รอให้เทพสักองค์ปั้นมันเป็นโลก ธาตุไฟ น้ำ และดินต้องสมดุล ไม่เช่นนั้นจะเป็นดาวไร้ชีวิต',[
  ['ปั้นดาว','มินิเกม',()=>MGx('balance','🪐 ปั้นดาว','แตะเติมธาตุที่ลดลง ประคองทั้งสามให้อยู่ช่วงกลาง',sc=>{if(sc>=.75)eff({fame:6000,karma:10},'🌍 <b>ดาวมีทะเล มีป่า และมีสิ่งมีชีวิตตัวแรกลืมตา</b> อีกล้านปีพวกมันจะจุดธูปถึงคุณ','myth');else if(sc>=.45)eff({fame:1500},'🪐 ดาวมีน้ำ มีภูเขา แต่ยังไม่มีชีวิต อาจต้องรออีกหลายกัลป์','epic');else eff({fame:200},'☄️ ดาวแตกเป็นวงแหวนหิน สวยแต่ว่างเปล่า','')})],
  ['ยกให้เทพองค์อื่น','',()=>eff({karma:5},'🤝 เทพองค์เล็กที่ไม่มีใครศรัทธาก้มหัวขอบคุณคุณ')]]);return true}

// ---------- ⭕ จิตวิญญาณยุทธ์ ----------
function soulBeast(){const g=G();if(g.bst&&S.age>=g.bst.at){const b=g.bst;g.bst=null;
  ask(`🦌 ${b.n}กลับมา`,`สัตว์วิญญาณ${b.n}ที่คุณช่วยไว้เมื่อ ${S.age-b.y} ปีก่อน ตอนนี้อายุนับพันปี มันเดินออกจากป่ามาหยุดตรงหน้าคุณ แล้วก้มหัวลง — มันยอมมอบพลังวิญญาณให้เอง`,[
   ['รับวงแหวนที่มันมอบให้','',()=>eff({pow:22,karma:8},'⭕ <b>วงแหวนที่ได้มาด้วยใจ ไม่ใช่ด้วยการล่า</b> สีของมันสว่างกว่าวงแหวนไหนที่คุณเคยเห็น','myth')],
   ['ปฏิเสธ ให้มันมีชีวิตต่อ','',()=>eff({karma:15,int:4},'🌲 มันหันกลับเข้าป่า และนับจากวันนั้นไม่มีสัตว์วิญญาณตัวไหนในป่านี้ทำร้ายคุณ','epic')]]);return true}
 if(g.bst||!cdOk('sb',6)||S.age<8||S.age>40||!P(.06))return false;cdSet('sb');const n=rp(['กวางเขาแก้ว','จิ้งจอกเก้าหาง','งูหลามเกล็ดทอง','หมีหิมะ']);
 ask(`🦌 ${n}บาดเจ็บ`,`ระหว่างล่าวงแหวน คุณเจอ${n}อายุร้อยปีติดกับดักนายพราน มันมองคุณด้วยดวงตาที่รู้ว่ากำลังจะตาย อายุของมันพอดีกับวงแหวนที่คุณต้องการ`,[
  ['ล่ามันเอาวงแหวน','',()=>eff({pow:6,karma:-3},'⭕ คุณได้วงแหวนที่ต้องการ')],
  ['ปล่อยมันไป','ไม่ล่าก็ได้',()=>{g.bst={n,y:S.age,at:S.age+rnd(3,7)};eff({karma:6},`🌿 คุณง้างกับดักออก ${n}ลุกขึ้นแล้วหายเข้าป่าไปโดยไม่หันกลับ`)}]]);return true}
function soulOver(){if(!cdOk('so',10)||S.age<12||!P(.04))return false;cdSet('so');
 ask('⭕ วงแหวนเกินขีด','สัตว์วิญญาณที่คุณล่าได้มีอายุเกินขีดจำกัดที่ร่างคุณรับได้ไปหลายเท่า ทุกคนบอกให้ปล่อย — ร่างอาจระเบิด แต่ถ้ารอด คุณจะก้าวกระโดด',[
  ['ดูดซับ','มินิเกม',()=>MGx('breath','⭕ ดูดซับวงแหวนเกินขีด','กดค้างสูดลมหายใจ ปล่อยให้ผ่อน · ประคองเข็มในช่วงเขียว',sc=>{if(sc>=.8)eff({pow:35,fame:2000},'🌟 <b>ร่างคุณรับไหว!</b> วงแหวนสีเข้มกว่าปกติสองระดับ อาจารย์ทั้งสถาบันมามุงดู','myth');else if(sc>=.5)eff({pow:12,hp:-20},'⭕ ดูดซับได้ แต่เส้นลมปราณร้าว','epic');else eff({hp:-45,pow:-5},'💥 พลังวิญญาณระเบิดออกจากร่าง คุณนอนสลบเจ็ดวัน','bad')})],
  ['ปล่อยแล้วหาตัวใหม่','',()=>eff({int:2},'🧘 รู้จักขีดจำกัดของตัวเองก็เป็นพลังอย่างหนึ่ง')]]);return true}
function soulTeam(){if(!cdOk('st',5)||S.age<10||S.age>30||!P(.05))return false;cdSet('st');
 ask('🤝 ศึกทีม','ทีมของคุณเจอทีมคู่แข่งที่แข็งกว่าทุกด้าน ทางเดียวที่จะชนะคือทักษะประสานที่ต้องปล่อยพร้อมกันทุกคนแบบไม่พลาดสักจังหวะ',[
  ['ปล่อยทักษะประสาน','มินิเกม',()=>MGx('combo','🤝 ทักษะประสานทีม','กดตอนตัวชี้อยู่ในเป้าสีทอง 4 ครั้ง',sc=>{if(sc>=.75)eff({fame:1500,pow:4},'🌈 <b>ทักษะประสานสมบูรณ์!</b> แสงหกสีรวมเป็นหนึ่ง ทีมคู่แข่งยอมแพ้ทั้งทีม','myth');else if(sc>=.5)eff({fame:400},'⭕ ชนะแบบหวุดหวิด','epic');else eff({hp:-15},'💨 จังหวะพลาด ทีมแพ้','bad')})],
  ['สู้แบบตัวใครตัวมัน','',()=>{if(P(.4))eff({fame:300},'⚔️ ชนะด้วยฝีมือเดี่ยว','');else eff({hp:-15},'🩸 แพ้','bad')}]]);return true}

// ---------- ตัวจัด ----------
function tick(){if(!S||!S.alive)return false;try{if(choice._cur||modalOpen)return false}catch(e){}const w=WK();if(!w)return false;
 if(debtTick())return true;
 if((w==='murim'||w==='rg')&&poison())return true;
 if(w==='rg'&&deja())return true;
 if(w==='xian'&&(alchemy()||invest()))return true;
 if(w==='god'&&(planet()||invest()))return true;
 if(w==='soul'&&(soulBeast()||soulOver()||soulTeam()))return true;
 return false}
{const _ye=yearExtras;yearExtras=function(){const r=_ye.apply(this,arguments);try{tick()}catch(e){console.error('c2Tick',e)}return r}}
window._c2={tick,G,MGx};
const st=document.createElement('style');st.textContent=`
.c2Mg h3{margin:0 0 4px}.c2St{text-align:center;margin:8px 0;font-weight:700}
.c2Body{position:relative;width:180px;height:252px;margin:6px auto}.c2Fig{position:absolute;inset:0;width:100%;height:100%;fill:rgba(255,236,200,.12);stroke:rgba(255,236,200,.5);stroke-width:1}
.c2Pt{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;border:2px solid #d4a84a;background:rgba(30,24,44,.85);cursor:pointer;padding:0}.c2Pt.on{background:#ffe08a;box-shadow:0 0 14px #ffe08a}
.c2Gauge{position:relative;width:46px;height:180px;margin:8px auto;border:2px solid #d4a84a;border-radius:23px;background:#1d1828;overflow:hidden}.c2Gauge .c2Band{position:absolute;left:0;right:0;background:rgba(123,227,160,.3)}.c2Gauge i{position:absolute;left:4px;right:4px;height:8px;margin-bottom:-4px;border-radius:4px;background:#ff8a3d}.c2Gauge i.ok{background:#7be3a0}
.c2Bar{position:relative;height:30px;margin:14px 0;border:2px solid #d4a84a;border-radius:15px;background:#1d1828;overflow:hidden}.c2Tg{position:absolute;top:0;bottom:0;width:12%;background:rgba(255,224,138,.45)}.c2Bar i{position:absolute;top:2px;bottom:2px;width:6px;margin-left:-3px;border-radius:3px;background:#fff}
.c2Ord{display:grid;gap:6px}.c2Ord button{text-align:left;font:inherit;padding:10px 12px;border-radius:10px;border:1.5px solid #d4a84a;background:rgba(30,24,44,.9);color:#f6ead0;cursor:pointer}.c2Ord button.ok{border-color:#7be3a0}.c2Ord button.bad{border-color:#ff6b6b;opacity:.7}
.c2Bal{display:flex;justify-content:center;gap:14px;margin:8px 0}.c2Bal>div{display:flex;flex-direction:column;align-items:center;gap:6px}.c2Col{position:relative;width:40px;height:150px;border:2px solid #d4a84a;border-radius:10px;background:#1d1828;overflow:hidden}.c2Col .c2Band{position:absolute;left:0;right:0;background:rgba(123,227,160,.25)}.c2Col i{position:absolute;left:3px;right:3px;bottom:0;border-radius:6px 6px 0 0;background:#ff8a3d}.c2Col i.ok{background:#7be3a0}.c2Bal button{font:inherit;font-size:12px;padding:8px 6px;min-width:64px;border-radius:10px;border:1.5px solid #d4a84a;background:rgba(30,24,44,.9);color:#f6ead0;cursor:pointer;touch-action:manipulation}`;document.head.appendChild(st);
})()}catch(e){console.error('chron2.js',e)}
