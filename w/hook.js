// ============================================================
// /w/hook.js 🔮 อยากเล่นต่ออีกชาติ — ทุกโลกทุกโหมด
//  1) เส้นทางชะตา: แต้มสะสมข้ามชาติ (จบชีวิต · อายุยืน · ภารกิจ · ชะตาประจำวัน) → ขั้นปลดล็อก (ฉายา · สุ่มเกิดใหม่เพิ่ม · กรอบการ์ด)
//     LS murim_path = {p:แต้ม, n:ชีวิตที่จบ, got:{ขั้น:1}, q:[ภารกิจ 3 ข้อที่จะเสนอชาติหน้า], dn:{ภารกิจ:ครั้งที่สำเร็จ}}
//  2) ภารกิจชาติ: ตอนเริ่มชีวิต (ตั้งแต่ชาติที่ 2) เลือก 1 ใน 3 · สำเร็จระหว่างทางมีแจ้ง · นับตอนจบ · S._hk
//  3) หน้าจบ: แต้มที่ได้ · แถบไปขั้นถัดไป · "อีกนิดเดียว" (ความลับ · มินิเกม 3 ดาว · ชะตาต่อเนื่อง) · ลางชาติหน้า · ปุ่มเกิดใหม่เลย
//  4) ชะตาประจำวัน: แชร์ผลเป็นข้อความ (เส้นทาง 5 ช่อง ใครเลือกเหมือนกันได้สีเดียวกัน) + ลิงก์ท้าเพื่อน ?ch=วัน&cs=คะแนน&cn=ชื่อ
//     เปิดลิงก์ → เล่นชะตาวันนั้น (วันที่ผ่านไปแล้ว = รอบซ้อม ไม่กระทบอันดับ/ต่อเนื่อง) → หน้าจบเทียบคะแนนกับคนท้า
//  5) ชาติก่อนของคุณเอง: ชีวิตที่เคยจบในเครื่องนี้ (สุสานบรรพชน) โผล่มาเป็นเหตุการณ์ ชีวิตละครั้ง · ใช้ได้ทุกโลก ไม่ต้องออนไลน์
//  6) ช่องทางผู้เล่น (ไม่ระบุตัวตน): เริ่มชีวิต/ตายที่อายุ/ออกจากเกมตรงไหน/กลับมาวันที่เท่าไหร่/ตัวเลือกที่ปล่อยให้ชะตาเลือก
//     ส่งรวมครั้งเดียวตอนจบชีวิตหรือปิดหน้า (api fnl) · แอดมินดูได้ที่ 🔮 → 📊
// ============================================================
try{(()=>{
const $$=id=>document.getElementById(id),E=s=>{try{return esc(String(s))}catch(e){return String(s)}};
const LSG=(k,d)=>{try{const v=LS.get(k,d);return v==null?d:v}catch(e){return d}},LSS=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const rp=a=>a[Math.floor(Math.random()*a.length)],N=n=>{try{return fmt(n)}catch(e){return String(n)}};
const PK='murim_path';
const P=()=>{const p=LSG(PK,null)||{};p.p=Math.floor(+p.p||0);p.n=Math.floor(+p.n||0);if(p.p<0||p.p>100000)p.p=Math.min(160,p.n*3); /* เดิม |0 → แต้มเกิน 2,147 ล้านกลายเป็นติดลบ (ดาวเหนือนิรันดร์ให้แต้มตามจำนวนดาวที่เกินสถิติ) */p.got=p.got||{};p.dn=p.dn||{};return p};
const SV=p=>LSS(PK,p);
const alive=()=>!!(S&&S.alive);
const WK=()=>{try{if(!S)return'';if(S.beastMode)return'beast';if(S.mw){if(S.mw.fan)return'fan';if(S.mw.fog)return'fog';if(S.mw.sky)return'sky';return'mw'}if(S.ch==='soul')return'soul';if(S.ch==='regress')return'loop';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'};
const WN={murim:'⚔️ ยุทธภพ',xian:'☁️ โลกเซียน',god:'🌟 แดนเทพ',mw:'🏙️ ยุคปัจจุบัน',fog:'🌫️ นครม่านหมอก',sky:'🌌 ทะลุฟ้าดารา',beast:'🐾 สัตว์อสูร',soul:'💠 จิตวิญญาณยุทธ์',loop:'🔁 ผู้ย้อนกาล'};

// ---------- 1) ขั้นของเส้นทางชะตา ----------
const MS=[[3,'🌱','ผู้เริ่มก้าวบนเส้นชะตา','ฉายาบนหน้าแรก'],[8,'🎲','สุ่มเกิดใหม่ +1','ทุกชาติ (ยกเว้นชะตาประจำวัน)'],[15,'🧭','ผู้รู้ทางชะตา','ฉายาใหม่'],[25,'🎲','สุ่มเกิดใหม่ +1','รวม +2'],
 [40,'🌀','ผู้กำชะตา','ฉายา + การ์ดสรุปขอบเงิน'],[60,'🎲','สุ่มเกิดใหม่ +1','รวม +3'],[100,'👑','ผู้อยู่เหนือชะตา','ฉายา + การ์ดสรุปขอบทอง'],[160,'🌌','ผู้เดินข้ามสวรรค์','ฉายาสูงสุด']];
const nextMs=p=>MS.find(m=>p<m[0]);
const title=p=>{let t=null;MS.forEach(m=>{if(p>=m[0]&&m[1]!=='🎲')t=m});return t};
const rrBonus=p=>MS.filter(m=>m[1]==='🎲'&&p>=m[0]).length;
function award(p0,p1){MS.forEach(m=>{if(p0<m[0]&&p1>=m[0])setTimeout(()=>{try{island({big:1,pri:1,ic:m[1],h:'เส้นทางชะตา · ปลดขั้นใหม่',t:`${m[2]} — ${m[3]}`,kind:'rainbow',ms:6000})}catch(e){}},2200)})}
const bar=(v,a,b)=>{const w=Math.max(0,Math.min(100,Math.round((v-a)/Math.max(1,b-a)*100)));return`<div class="hkBar"><i style="width:${w}%"></i></div>`};

// ---------- 2) ภารกิจชาติ ----------
const sec=()=>{try{return Object.keys(LSG('murim_secrets',{})||{}).length}catch(e){return 0}};
const m3=()=>{try{return window._m3&&_m3.threeCount?_m3.threeCount()|0:0}catch(e){return 0}};
const kids=()=>{try{return(S.children||[]).length}catch(e){return 0}};
const ri=()=>{try{return realmIdx()}catch(e){return 0}};
// [id, ไอคอน, ชื่อ, แต้ม, เงื่อนไข(H), เฉพาะตอนจบ, ใช้ได้ไหม()]
const Q=[
 ['old60','🧓','อยู่ให้ถึงอายุ 60 ปี',2,H=>S.age>=60],
 ['old90','🐢','อยู่ให้ถึงอายุ 90 ปี',4,H=>S.age>=90,0,()=>P().n>=3],
 ['pure','🕊️','ไม่ฆ่าใครเลย และอยู่ถึงอายุ 40',3,H=>(S.kills|0)===0&&S.age>=40,1],
 ['saint','😇','กรรมดีสะสมถึง 300',3,H=>(S.karma||0)>=300],
 ['demon','😈','กรรมชั่วดิ่งถึง -300',3,H=>(S.karma||0)<=-300],
 ['fame','📣','ชื่อเสียงถึง 5,000',3,H=>(S.fame||0)>=5000],
 ['fam','👨‍👩‍👧‍👦','มีลูก 3 คนขึ้นไป',2,H=>kids()>=3],
 ['wed','💍','แต่งงานก่อนอายุ 30',2,H=>H.wa!=null&&H.wa<30],
 ['blaze','🔥','ชีวิตสั้นแต่ดัง: จากไปก่อนอายุ 35 โดยชื่อเสียงถึง 1,000',3,H=>S.age<35&&(S.fame||0)>=1000,1],
 ['scr','🗝️','ค้นพบความลับใหม่ 1 อย่าง',3,H=>sec()-(H.sc0|0)>=1,0,()=>sec()<226],
 ['star','⭐','เล่นมินิเกมได้ 3 ดาว 2 ครั้ง',2,H=>m3()-(H.m30|0)>=2],
 ['realm','🏔️','บรรลุขั้นพลังที่ 5',3,H=>ri()>=4,0,()=>!(S&&(S.mw||S.beastMode))],
 ['rich','💰','จากไปพร้อมเงินมากกว่าตอนเกิด 100 เท่า',2,H=>(S.money||0)>=Math.max(1000,(H.m0||0)*100),1],
 ['kind','🤝','กรรมไม่เคยติดลบตลอดชีวิต และอยู่ถึง 50',3,H=>!H.neg&&S.age>=50,1]];
const QD=id=>Q.find(q=>q[0]===id);
function offer3(){const L=Q.filter(q=>{try{return !q[6]||q[6]()}catch(e){return true}});const o=[];while(o.length<3&&L.length)o.push(L.splice(Math.floor(Math.random()*L.length),1)[0][0]);return o}
function askQuest(){try{if(!alive()||!S._hk||S._hk.asked)return;if(choice._cur||modalOpen){setTimeout(askQuest,1500);return}S._hk.asked=1;
 const p=P();let ids=(p.q||[]).filter(id=>{const q=QD(id);try{return q&&(!q[6]||q[6]())}catch(e){return !!q}});if(ids.length<3)ids=offer3();p.q=null;SV(p);
 const opts=ids.map(id=>{const q=QD(id);return{t:`${q[1]} ${q[2]} · 🔮+${q[3]}`,s:`+${q[3]} แต้มชะตา${(p.dn[id]|0)?` · เคยสำเร็จ ${p.dn[id]} ครั้ง`:''}`,f(){S._hk.q=id;log(`🔮 <b>ภารกิจชาตินี้</b>: ${q[1]} ${q[2]} <span class="tag2">(+${q[3]} แต้มชะตาเมื่อจบชีวิต)</span>`,'epic')}}});
 opts.push({t:'🍃 ไม่รับภารกิจ ใช้ชีวิตตามใจ',s:'ยังได้แต้มจากการจบชีวิตตามปกติ',f(){S._hk.q=null}});
 choice('🔮 ภารกิจชาตินี้',`เลือกเป้าหมายของชาตินี้ 1 ข้อ ทำสำเร็จได้แต้ม<b>เส้นทางชะตา</b>สะสมข้ามชาติ ใช้ปลดฉายาและสุ่มเกิดใหม่เพิ่ม<br><span class="tag2">🔮 ตอนนี้ ${p.p} แต้ม${nextMs(p.p)?` · อีก ${nextMs(p.p)[0]-p.p} แต้มถึง ${nextMs(p.p)[1]} ${nextMs(p.p)[2]}`:''}</span>`,opts)}catch(e){console.error('hk ask',e)}}
function yearCheck(){try{const H=S&&S._hk;if(!H||!alive())return;if(S.spouse&&H.wa==null)H.wa=S.age;if((S.karma||0)<0)H.neg=1;
 const q=H.q&&QD(H.q);if(q&&!H.ok&&!q[5]){let ok=false;try{ok=!!q[4](H)}catch(e){}if(ok){H.ok=1;try{island({big:1,ic:'🔮',h:'ภารกิจชาติสำเร็จ',t:`${q[1]} ${q[2]} · ได้ +${q[3]} แต้มตอนจบชีวิต`,kind:'gold',ms:4500})}catch(e){}}}}catch(e){}}

// ---------- เริ่มชีวิต ----------
function onStart(){try{if(!S||S._hk)return;const p=P();S._hk={sc0:sec(),m30:m3(),m0:S.money||0,wa:null,neg:(S.karma||0)<0?1:0,asked:p.n<1?1:0};
 chAttach();
 fq('st',WK()+(S.ch&&S.ch!=='normal'?':'+S.ch:''));
 if(!S._hk.asked)setTimeout(askQuest,3500)}catch(e){console.error('hk start',e)}}
{const _sl=startLife;startLife=function(){const r=_sl.apply(this,arguments);onStart();return r}}
// โลกที่เริ่มด้วยทางอื่น (ยุคปัจจุบัน/หมอก/ดารา/สัตว์ ฯลฯ) → จับได้ตอนผ่านปีแรก
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(alive()){if(!S._hk)onStart();yearCheck();chAttach();pastLife()}}catch(e){console.error('hk yr',e)}return r}}
// สุ่มเกิดใหม่เพิ่มจากเส้นทางชะตา (ไม่ใช้กับชะตาประจำวัน/โหมดท้าทายที่ห้ามสุ่ม)
{const _gb=goBirth;goBirth=function(){const r=_gb.apply(this,arguments);try{const b=rrBonus(P().p);if(b&&rerolls>0&&!(roll&&roll.daily)){rerolls+=b;$('rr').textContent=rerolls}}catch(e){}return r}}

// ---------- 3) หน้าจบ ----------
function endHook(){try{if(!S||!S._hk||S._hk.end)return;chAttach();const E0=$$('end');if(!E0)return;const H=S._hk;H.end=1;
 const p=P(),p0=p.p,q=H.q&&QD(H.q);let qok=false;if(q){if(H.ok&&!q[5])qok=true;else try{qok=!!q[4](H)}catch(e){}}
 const gain=[['🪦 จบชีวิต',1]];if(S.age>=60)gain.push(['🧓 อายุยืนถึง 60',1]);if(q&&qok)gain.push([`${q[1]} ภารกิจชาติ`,q[3]]);if(S.dl)gain.push(['📅 ชะตาประจำวัน',1]);
 const g=gain.reduce((a,x)=>a+x[1],0);p.p+=g;p.n++;if(q&&qok)p.dn[q[0]]=(p.dn[q[0]]|0)+1;p.q=offer3();SV(p);award(p0,p.p);
 fq('dg',WK()+':'+ab(S.age));if(q)fq('hq',q[0]+':'+(qok?1:0));flush();
 const nm=nextMs(p.p),tl=title(p.p),om=LSG('murim_omen',null);
 const near=[];
 {const s=sec();if(s<226)near.push(['🗝️',`ความลับ ${s}/226`,s,Math.max(0,s-5),Math.min(226,(Math.floor(s/10)+1)*10),'☰ → 🗝️ สมุดความลับ']);}
 {const c=m3(),T=[10,30,60,120].find(x=>x>c);if(T)near.push(['⭐',`มินิเกม 3 ดาว ${c}/${T} → ฉายาใหม่`,c,[0,10,30,60][[10,30,60,120].indexOf(T)],T,'🏮 หอมินิเกม'])}
 {const s=LSG('murim_dlstreak',null)||{},n=s.n|0,T=[3,7,14,30].find(x=>x>n);if(T)near.push(['🔥',`ชะตาประจำวันต่อเนื่อง ${n}/${T} วัน`,n,[0,3,7,14][[3,7,14,30].indexOf(T)],T,'📅 ชะตาประจำวัน'])}
 near.sort((a,b)=>(b[2]-b[3])/Math.max(1,b[4]-b[3])-(a[2]-a[3])/Math.max(1,a[4]-a[3]));
 const d=document.createElement('div');d.className='hkEnd';
 d.innerHTML=`<div class="hkH">🔮 เส้นทางชะตา <b>${p.p}</b> แต้ม <span class="hkG">+${g}</span>${tl?` <span class="hkT">${tl[1]} ${E(tl[2])}</span>`:''}</div>
 <div class="hkL">${gain.map(x=>`<span>${x[0]} +${x[1]}</span>`).join('')}</div>
 ${q?`<div class="hkQ ${qok?'ok':'no'}">${qok?'✅':'❌'} ภารกิจชาตินี้: ${q[1]} ${E(q[2])}</div>`:''}
 ${nm?`<div class="hkN">อีก <b>${nm[0]-p.p}</b> แต้ม → ${nm[1]} <b>${E(nm[2])}</b> <span class="tag2">${E(nm[3])}</span></div>${bar(p.p,(MS[MS.indexOf(nm)-1]||[0])[0],nm[0])}`:'<div class="hkN">👑 ปลดเส้นทางชะตาครบทุกขั้นแล้ว</div>'}
 ${near.length?`<h5>⏳ อีกนิดเดียว</h5>${near.slice(0,3).map(x=>`<div class="hkNr">${x[0]} ${E(x[1])} <span class="tag2">· ${E(x[5])}</span>${bar(x[2],x[3],x[4])}</div>`).join('')}`:''}
 <h5>🌅 ชาติหน้า</h5>${om&&om.t?`<div class="hkOm">🔮 ความทรงจำที่ส่งไป: “${E(om.t)}”</div>`:''}
 <div class="hkNx">ภารกิจที่รออยู่: ${p.q.map(id=>{const x=QD(id);return x?`<span>${x[1]} ${E(x[2])}</span>`:''}).join('')}</div>
 <button class="pbtn hkGo" onclick="window._hkReborn()">🐣 เกิดใหม่เลย</button>`;
 const at=E0.querySelector('.lfEnd')||E0.querySelector('h2,h3,.big');if(at)at.insertAdjacentElement('afterend',d);else E0.insertBefore(d,E0.firstChild);
 setTimeout(()=>shareBox(E0),1600)}catch(e){console.error('hk end',e)}}
window._hkReborn=()=>{try{toTitle();setTimeout(()=>{try{goBirthPick()}catch(e){}},250)}catch(e){console.error(e)}};
{const _eg=endGame;endGame=function(){const r=_eg.apply(this,arguments);setTimeout(endHook,700);return r}}

// ---------- 4) แชร์ผลชะตาประจำวัน + ลิงก์ท้า ----------
const DKt=()=>new Date(Date.now()+7*3600e3).toISOString().slice(0,10);
const thD=k=>{try{return new Date(k+'T00:00:00Z').toLocaleDateString('th-TH',{day:'numeric',month:'short',timeZone:'UTC'})}catch(e){return k}};
const strip=t=>String(t||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const SQ=['🟥','🟦','🟩','🟨','🟪'];
const hs=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const site=()=>{try{return location.origin&&/^https?:/.test(location.origin)?location.origin:'https://1inanovel.com'}catch(e){return'https://1inanovel.com'}};
function chLink(k,sc){let u=`${site()}/?ch=${encodeURIComponent(k)}`;if(sc!=null)u+=`&cs=${Math.round(sc)}&cn=${encodeURIComponent(String(S&&S.name||'').slice(0,20))}`;return u}
function dlRes(){try{const D=S&&S.dl;if(!D||!D.k)return null;const R=(LSG('murim_dl2',{})||{})[D.k]||{};const sc=R.sc!=null&&R.sub&&!S._ch?R.sc:R.best;
 const path=(D.ev||[]).map(e=>{const t=D.ch2&&D.ch2[e.i];return t?SQ[hs(D.k+'|'+t)%SQ.length]:'⬛'}).join('');
 return{k:D.k,sc:sc|0,tx:strip(R.bestT||R.tx||''),rank:R.rank,of:R.of,path}}catch(e){return null}}
async function shareText(t,u){try{if(navigator.share){await navigator.share({text:t});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await navigator.clipboard.writeText(t);toast('📋 คัดลอกแล้ว วางในแชทหรือโพสต์ได้เลย')}catch(e){modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📤 คัดลอกข้อความนี้</h3><textarea style="width:100%;height:160px" readonly>${E(t)}</textarea>`,'hkcp')}}
function shareBox(E0){try{if(!E0||E0.querySelector('.hkSh'))return;const r=dlRes(),st=(LSG('murim_dlstreak',null)||{}).n|0;
 const d=document.createElement('div');d.className='hkSh';
 if(r){const txt=`1 ใน นวนิยาย · 📅 ชะตา ${thD(r.k)}\n${WN[WK()]||''}${st>1?` · 🔥 ${st} วันติด`:''}\n🎯 ${r.tx}\n${r.rank?`🏆 อันดับ ${r.rank}${r.of?'/'+r.of:''}\n`:''}เส้นทาง ${r.path} · อายุ ${S.age} ปี\nท้าไหม 👉 ${chLink(r.k,r.sc)}`;
  let vs='';const C=S._ch;if(C&&C.k===r.k&&C.s!=null){const w=r.sc>C.s,eq=r.sc===C.s;vs=`<div class="hkVs ${w?'w':eq?'':'l'}">⚔️ คำท้าจาก <b>${E(C.n||'เพื่อน')}</b>: เขา ${N(C.s)} · คุณ ${N(r.sc)} → ${w?'🏆 คุณชนะ!':eq?'🤝 เสมอ':'😤 แพ้ ลองใหม่ได้'}</div>`}
  let pv=txt;try{pv=decodeURIComponent(txt)}catch(e){}d.innerHTML=`${vs}<div class="hkPre">${E(pv).replace(/\n/g,'<br>')}</div><div class="brow"><button class="pbtn" data-a="s">📤 แชร์ผลชะตา</button><button class="gbtn" data-a="l">⚔️ ส่งลิงก์ท้าเพื่อน</button></div>`;
  d.querySelector('[data-a=s]').onclick=()=>shareText(txt);d.querySelector('[data-a=l]').onclick=()=>shareText(`ผมทำได้ ${N(r.sc)} คะแนนในชะตา ${thD(r.k)} ของ 1 ใน นวนิยาย — ทุกคนเกิดมาเป็นคนเดียวกัน ลองดูว่าคุณจะไปได้ไกลกว่าไหม 👉 ${chLink(r.k,r.sc)}`)}
 else{const u=chLink(DKt());d.innerHTML=`<div class="brow"><button class="gbtn" data-a="l">⚔️ ชวนเพื่อนแข่งชะตาวันนี้</button></div><p class="tag2" style="margin:4px 0 0">ชะตาประจำวันทุกคนเกิดมาเป็นคนเดียวกัน ส่งลิงก์ให้เพื่อนแล้วมาดูกันว่าใครไปได้ไกลกว่า</p>`;
  d.querySelector('[data-a=l]').onclick=()=>shareText(`วันนี้ใน 1 ใน นวนิยาย ทุกคนเกิดมาเป็นคนเดียวกัน มาแข่งกันว่าใครอยู่รอดได้ไกลกว่า 👉 ${u}`)}
 const at=E0.querySelector('.hkEnd');if(at)at.insertAdjacentElement('afterend',d);else E0.insertBefore(d,E0.firstChild)}catch(e){console.error('hk share',e)}}
// เปิดลิงก์ท้า
function chAttach(){try{const C=window._hkCh;if(C&&S&&S.dl&&S.dl.k===C.k&&!S._ch){S._ch=C;window._hkCh=null;log(`⚔️ <b>คำท้าจาก ${E(C.n||'เพื่อน')}</b>${C.s!=null?` — เขาทำได้ ${N(C.s)} คะแนนในชะตานี้`:''} ลองทำให้ดีกว่า`,'epic')}}catch(e){}}
(function(){try{const q=new URLSearchParams(location.search),k=q.get('ch');if(!k)return;const cs=q.get('cs'),cn=q.get('cn');['ch','cs','cn'].forEach(x=>q.delete(x));
 history.replaceState(null,'',location.pathname+(q.toString()?'?'+q:'')+location.hash);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(k)||k>DKt())return;const C={k,s:cs!=null&&/^\d{1,12}$/.test(cs)?+cs:null,n:String(cn||'').slice(0,20)};let n=0;
 const t=setInterval(()=>{n++;try{const ready=typeof window.dlStart==='function'&&$$('title')&&$$('title').classList.contains('on')&&!modalOpen&&!(S&&S.alive);if(!ready&&n<60)return;clearInterval(t);if(!ready)return;
  const past=k!==DKt();modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>⚔️ คำท้าจาก${C.n?' '+E(C.n):'เพื่อน'}</h3>
  <p>${C.s!=null?`เขาทำได้ <b>${N(C.s)}</b> คะแนนใน`:'มาแข่ง'}<b>ชะตาประจำวัน ${thD(k)}</b> — ทุกคนเกิดมาเป็นคนเดียวกัน เจอเหตุการณ์สำคัญ 5 เรื่องตอนอายุเดียวกัน แต่เลือกต่างกัน</p>
  ${past?'<p class="tag2">ชะตาวันนั้นผ่านไปแล้ว รอบนี้เป็นรอบซ้อม ไม่นับอันดับและไม่ตัดวันต่อเนื่องของคุณ</p>':'<p class="tag2">เป็นชะตาวันนี้ ถ้าคุณยังไม่ได้เล่น ชีวิตแรกที่จบจะนับอันดับด้วย</p>'}
  <button class="pbtn" style="width:100%" id="hkChGo">▶ รับคำท้า</button>`,'hkch');
  $$('hkChGo').onclick=()=>{try{if(past){const A=LSG('murim_dl2',{})||{};(A[k]=A[k]||{}).sub=1;LSS('murim_dl2',A)}window._hkCh=C;closeM();dlStart(k);setTimeout(()=>{try{if(S&&S.alive)chAttach()}catch(e){}},1500)}catch(e){console.error(e)}}}catch(e){clearInterval(t)}},500)}catch(e){console.error('hk ch',e)}})();

// ---------- 5) ชาติก่อนของคุณเอง ----------
function pastLife(){try{const H=S._hk;if(!H||H.pl||S.age<16||choice._cur||modalOpen||Math.random()>.04)return;
 const G=(LSG('murim_graves',[])||[]).filter(g=>g&&g.n&&g.n!==S.name);if(G.length<1)return;const g=rp(G.slice(0,30));H.pl=1;
 const mod=!!S.mw||!!S.beastMode,who=`<b>${E(g.n)}</b>${g.e?`「${E(g.e)}」`:''}`,info=`จากไปเมื่ออายุ ${N(g.a||0)} ปี${g.c?` · ${E(g.c)}`:''}`;
 const sc=S.beastMode?`กลางป่าลึก เจ้าเจอศิลาจารึกผุๆ สลักชื่อ ${who} (${info}) กลิ่นของมันคุ้นเหมือนกลิ่นตัวเอง`:mod?`ในร้านของเก่า คุณเจอภาพวาดเก่าของ ${who} (${info}) คนขายบอกว่า “หน้าเหมือนคุณเลยนะ”`:`คืนหนึ่งคุณฝันเห็นหลุมศพของ ${who} (${info}) ตื่นมายังจำทางไปหลุมนั้นได้ ทั้งที่ไม่เคยไป`;
 choice('👣 ชาติก่อนของคุณ',`${sc}<br><span class="tag2">👣 ชีวิตที่คุณเคยเล่นจบในเครื่องนี้</span>`,[
  {t:'🙏 ไปคารวะ',s:'กรรมดี +',f(){S.karma=(S.karma||0)+12;log(`🙏 คุณจุดธูปให้${E(g.n)} ลมพัดควันวนรอบตัวคุณสามรอบเหมือนตอบรับ`,'good')}},
  {t:'📖 จำบทเรียนของเขา',s:'ปัญญา +',f(){S.int=(S.int||0)+4;log(`📖 คุณรู้สึกเหมือนเคยตายแบบ${g.c?'“'+E(g.c)+'”':'นั้น'}มาก่อน และสัญญากับตัวเองว่าชาตินี้จะไม่ซ้ำรอย`,'good')}},
  {t:'🚶 เดินผ่านไป',s:'',f(){log('🚶 คุณไม่หันกลับไปมอง บางเรื่องควรปล่อยให้จบในชาติของมัน')}}])}catch(e){}}

// ---------- 6) ช่องทางผู้เล่น (ไม่ระบุตัวตน) ----------
const ab=a=>{a=a|0;return a<10?'0-9':a<20?'10-19':a<30?'20-29':a<45?'30-44':a<60?'45-59':a<80?'60-79':'80+'};
let FQ=[];const fq=(k,v)=>{try{if(FQ.length<24)FQ.push([k,String(v).slice(0,40)])}catch(e){}};
function flush(beacon){try{if(!FQ.length||typeof onlineOK==='undefined'||!onlineOK)return;const e=FQ;FQ=[];
 if(beacon){try{fetch(API+'?a=fnl',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({id:pid,e})}).catch(()=>{})}catch(x){}return}
 api('fnl',{e}).catch(()=>{})}catch(e){}}
// กลับมาวันที่เท่าไหร่ (นับครั้งเดียวต่อวัน)
(function(){try{const td=DKt(),fs=LSG('murim_fs',null);if(!fs){LSS('murim_fs',td);fq('new',navigator.maxTouchPoints>0?'mob':'pc');return}
 if(LSG('murim_fsd','')===td)return;LSS('murim_fsd',td);const d=Math.round((new Date(td)-new Date(fs))/864e5);if(d<1)return;fq('ret',d===1?'d1':d<=3?'d2-3':d<=7?'d4-7':d<=14?'d8-14':d<=30?'d15-30':'d31+')}catch(e){}})();
// ออกจากเกมตรงไหน
addEventListener('pagehide',()=>{try{let w='title';if(alive())w=(modalOpen?'m:'+(($$('modal')||{}).dataset||{}).k:'play')+':'+WK()+':'+ab(S.age);else if($$('end')&&$$('end').classList.contains('on'))w='end';else if($$('birth')&&$$('birth').classList.contains('on'))w='birth';fq('qt',w);flush(1)}catch(e){}});
// ตัวเลือกที่ปล่อยให้ชะตาเลือก (หมดเวลา ไม่ใช่โหมดออโต้) = เหตุการณ์ที่ไม่ดึงดูด
{let n=0;const _fc=fateChoice;fateChoice=function(){try{const c=choice._cur;if(c&&n<6&&!(typeof auto!=='undefined'&&auto)){n++;fq('fa',strip(c.title).slice(0,30))}}catch(e){}return _fc.apply(this,arguments)}}

// ---------- หน้าเส้นทางชะตา + ปุ่มหน้าแรก ----------
window.hkOpen=function(){try{const p=P(),tl=title(p.p),nm=nextMs(p.p);
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🔮 เส้นทางชะตา</h3>
 <div class="hkH">${p.p} แต้ม · จบมาแล้ว ${p.n} ชีวิต${tl?` <span class="hkT">${tl[1]} ${E(tl[2])}</span>`:''}</div>
 <p class="tag2">ได้แต้มจาก: จบชีวิต +1 · อยู่ถึง 60 +1 · ภารกิจชาติ +2 ถึง +4 · ชะตาประจำวัน +1 · ภารกิจเลือกได้ตอนเริ่มชีวิต (ตั้งแต่ชาติที่ 2)</p>
 ${MS.map(m=>`<div class="hkMs ${p.p>=m[0]?'on':''}"><b>${m[1]} ${E(m[2])}</b> <span class="tag2">${m[0]} แต้ม · ${E(m[3])}</span>${p.p>=m[0]?' ✅':''}</div>`).join('')}
 ${nm?bar(p.p,(MS[MS.indexOf(nm)-1]||[0])[0],nm[0]):''}
 <h5>🏅 ภารกิจที่เคยสำเร็จ</h5><div class="hkNx">${Object.keys(p.dn).length?Object.entries(p.dn).map(([k,v])=>{const q=QD(k);return q?`<span>${q[1]} ${E(q[2])} ×${v}</span>`:''}).join(''):'<span class="tag2">ยังไม่มี</span>'}</div>
 ${LSG('murim_admk','')?'<button class="gbtn" style="width:100%;margin-top:10px" onclick="hkFunnel()">📊 ช่องทางผู้เล่น (แอดมิน)</button>':''}`,'hkpath')}catch(e){console.error(e)}};
window.hkFunnel=async function(){try{modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📊 ช่องทางผู้เล่น</h3><p class="tag2">กำลังโหลด…</p>`,'hkfn');
 const j=await api('fnlget',{key:LSG('murim_admk','')});const D=(j&&j.days)||[];const sum=(f,pre)=>{const o={};D.slice(0,7).forEach(d=>{for(const k in d[f])if(k.startsWith(pre))o[k.slice(pre.length)]=(o[k.slice(pre.length)]||0)+d[f][k]});return Object.entries(o).sort((a,b)=>b[1]-a[1])};
 const T=(h,L,n)=>`<h5>${h}</h5>${L.length?L.slice(0,n||12).map(x=>`<div class="hkFr"><span>${E(x[0])}</span><b>${N(x[1])}</b></div>`).join(''):'<p class="tag2">ยังไม่มีข้อมูล</p>'}`;
 const rows=D.map(d=>{const g=k=>Object.entries(d.m).filter(([x])=>x.startsWith(k+'|')).reduce((a,[,v])=>a+v,0);return`<tr><td>${d.d.slice(5)}</td><td>${g('new')}</td><td>${d.m['ret|d1']||0}</td><td>${(d.m['ret|d4-7']||0)}</td><td>${g('st')}</td><td>${g('dg')}</td></tr>`}).join('');
 if($$('modal').dataset.k!=='hkfn')return;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📊 ช่องทางผู้เล่น <small class="tag2">14 วัน</small></h3>
 <table class="hkTb"><tr><th>วัน</th><th>เครื่องใหม่</th><th>กลับวันที่ 2</th><th>กลับ 4–7 วัน</th><th>เริ่มชีวิต</th><th>จบชีวิต</th></tr>${rows}</table>
 ${T('🚪 ออกจากเกมตรงไหน (7 วัน)',sum('m','qt|'),15)}${T('🪦 ตายที่อายุ (7 วัน)',sum('m','dg|'),15)}${T('🌍 เริ่มชีวิตโลกไหน',sum('m','st|'))}
 ${T('🔮 ภารกิจชาติ (id:สำเร็จ)',sum('m','hq|'),20)}${T('⏳ ปล่อยให้ชะตาเลือกบ่อย = เหตุการณ์ไม่ดึงดูด',sum('f','fa|'),20)}`,'hkfn')}catch(e){toast('โหลดไม่ได้: '+(e&&e.message||e))}};
function titleBtn(){try{const t=$$('title');if(!t||!t.classList.contains('on'))return;const p=P(),tl=title(p.p),lab=`🔮 ${tl?tl[2]:'เส้นทางชะตา'} · ${p.p}`;let b=$$('hkBtn');
 if(!b){const row=$$('obRow');if(!row)return;b=document.createElement('button');b.id='hkBtn';b.type='button';b.onclick=()=>hkOpen();row.appendChild(b)}if(b.textContent!==lab)b.textContent=lab}catch(e){}}
setInterval(titleBtn,1500);

// ---------- การ์ดสรุปชีวิต: ขอบเงิน/ทองตามขั้น ----------
try{const _sc=window.shareCard;if(typeof _sc==='function'){const _tb=HTMLCanvasElement.prototype.toBlob;window.shareCard=function(){const p=P().p,col=p>=100?'#ffd34d':p>=40?'#d8e2ee':null;if(!col)return _sc.apply(this,arguments);
 HTMLCanvasElement.prototype.toBlob=function(){try{const x=this.getContext('2d');if(x){x.save();x.strokeStyle=col;x.lineWidth=Math.max(6,this.width/90);x.strokeRect(x.lineWidth/2,x.lineWidth/2,this.width-x.lineWidth,this.height-x.lineWidth);x.restore()}}catch(e){}HTMLCanvasElement.prototype.toBlob=_tb;return _tb.apply(this,arguments)};
 setTimeout(()=>{HTMLCanvasElement.prototype.toBlob=_tb},3000);return _sc.apply(this,arguments)}}}catch(e){}

const st=document.createElement('style');st.textContent=`
.hkEnd,.hkSh{margin:10px 0;padding:12px 14px;border-radius:14px;border:1.5px solid #9a7cff88;background:linear-gradient(160deg,#2a2150cc,#15122bcc);color:#efe8ff}
.hkEnd h5{margin:10px 0 4px;color:#cdbfff}.hkH{font-size:16px;font-weight:800}.hkG{color:#8dffb0;margin-left:4px}.hkT{font-size:12px;padding:2px 8px;border-radius:10px;background:#ffd76a33;border:1px solid #ffd76a88;color:#ffe9a8;margin-left:6px}
.hkL{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.hkL span,.hkNx span{font-size:12px;padding:3px 8px;border-radius:10px;background:#ffffff14;border:1px solid #ffffff26}
.hkNx{display:flex;flex-wrap:wrap;gap:6px}.hkQ{margin:6px 0;padding:6px 9px;border-radius:10px;font-weight:700}.hkQ.ok{background:#2f7a4a55;border:1px solid #5fd08a}.hkQ.no{background:#7a2f3a44;border:1px solid #d05f6f88}
.hkN{margin:8px 0 2px;font-size:14px}.hkNr{font-size:13px;margin:4px 0}.hkBar{height:8px;border-radius:6px;background:#ffffff1c;overflow:hidden;margin:4px 0}.hkBar i{display:block;height:100%;background:linear-gradient(90deg,#9a7cff,#ffd76a);border-radius:6px}
.hkOm{font-style:italic;margin:4px 0 6px;color:#ffe6b0}.hkGo{width:100%;margin-top:10px;font-size:17px!important;padding:12px!important}
.hkPre{font-size:13px;line-height:1.55;padding:8px 10px;border-radius:10px;background:#0006;margin-bottom:8px;white-space:normal;word-break:break-word}
.hkVs{margin-bottom:8px;padding:8px 10px;border-radius:10px;font-weight:700;background:#ffffff14}.hkVs.w{background:#2f7a4a66}.hkVs.l{background:#7a2f3a55}
.hkMs{padding:7px 10px;margin:4px 0;border-radius:10px;border:1px solid var(--line,#5554);opacity:.6}.hkMs.on{opacity:1;border-color:#c9a24a;background:#c9a24a1f}
.hkFr{display:flex;justify-content:space-between;gap:8px;font-size:13px;padding:3px 0;border-bottom:1px dashed var(--line,#5554)}.hkFr span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hkTb{width:100%;border-collapse:collapse;font-size:12.5px}.hkTb td,.hkTb th{padding:4px;border-bottom:1px solid var(--line,#5554);text-align:center}
#hkBtn{border-color:#7a5cff!important;background:#efe9ff!important;color:#3a2a7a!important}
`;document.head.appendChild(st);
window._hk={P,SV,Q,MS,offer3,askQuest,endHook,dlRes,chLink,flush,pastLife,FQ:()=>FQ};
})()}catch(e){console.error('hook',e)}
wReady('hook');
