// ============================================================
// /w/nsys.js — 📱 ผู้ได้รับระบบ ในโลกยุคปัจจุบันแบบปกติ (20 ระบบ)
// โหลดต่อจาก mw.js (ท้ายไฟล์ mw.js เรียก wLoad('nsys')) · ข้อมูลระบบอยู่ใน nsys1–nsys4.js (ไฟล์ละ 5 ระบบ)
// ระดับ: ต่ำ (Lv1–3) · กลาง (Lv4–6) · สูง (Lv7–9) · เทพ (Lv10) — ข้ามขั้นต้องสอบผ่านมินิเกม
// เควสไม่เป็นเส้นตรง: เลือกเส้นทาง 1 ใน 3 ตอนขึ้นขั้นกลาง · ทางลัด/ใจดีสะสมผล · ตอนจบ 4 แบบ (สุดทาง/ถอดระบบ/ด้านมืด/ความลับของระบบ)
// ============================================================
(()=>{
const W=window._wld,W4=window._wld4,E9=window._mg9E,E2=window._mg2E,G=window._mg2G;
if(!W||!W4||!G||!E9){console.warn('nsys: ยังไม่มีระบบโลกยุคปัจจุบัน');try{wReady('nsys')}catch(e){}return}
const CAND=W4.CAND,fire=W.wFire,wOf=W.wOf;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),pk=a=>a[Math.floor(Math.random()*a.length)],RN=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const SYS=window._NSD=window._NSD||[];const byId=id=>SYS.find(s=>s.id===id);
const TN=['ต่ำ','กลาง','สูง','เทพ'],TC=['#9fb4c8','#5fd47a','#4aa3ff','#ffcf3a'],TI=['▫️','🔹','🔷','👑'];
const lvT=lv=>lv>=10?3:lv>=7?2:lv>=4?1:0,CAP=[3,6,9,10],XPL=40;
const isN=M=>!!(M&&!M.kid&&S&&S.alive&&wOf(M)==='normal');
const NSo=M=>M&&M.NS&&M.NS.on?M.NS:null;
const unit=(M,t,k)=>{try{return Math.max(1,mwToB((MW_MIN[M.cc||'th']||MW_MIN.th)*[.5,1.5,5,20][t]*(k||1),M))}catch(e){return Math.round(5000*[.5,1.5,5,20][t]*(k||1))}};
const B=s=>`<b>${s}</b>`;
const say=(t,c,fx)=>{try{mwSay(t,c||'',fx)}catch(e){log(t,c||'')}};
const kAdd=t=>{try{keyAdd(t)}catch(e){try{S.key.push(`${S.age} ปี — ${t}`)}catch(x){}}};
const bookG=()=>LS.get('murim_nsbook',{})||{};
const bookS=(id,f)=>{try{const b=bookG();b[id]=b[id]||{t:0,e:{}};f(b[id]);LS.set('murim_nsbook',b)}catch(e){}};

// ---------- มินิเกม: ใช้เครื่องยนต์ที่มีอยู่ (การ์ด เข็ม เขาวงกต จับคู่ เสี่ยงดวง ตั้งรับ ไขรหัส ต่อตึก จำลำดับ หลบเลน กดค้าง จังหวะ เลื่อนตาม) ----------
const DIFF={
 match:(p,t)=>({icons:p.icons,n:[4,5,6,8][t]}),
 needle:(p,t)=>({ic:p.ic,label:p.label,n:[3,4,5,6][t],z0:[.34,.28,.24,.2][t],z1:[.16,.12,.1,.08][t],sp:[1,1.15,1.3,1.5][t]}),
 maze:(p,t)=>({me:p.me,goal:p.goal,haz:p.haz,wall:p.wall||'🧱',sz:[5,6,7,8][t]}),
 pairs:(p,t)=>({head:p.head,list:p.list,n:Math.min(p.list.length,[3,4,5,6][t])}),
 luck:(p,t)=>({good:p.good,bust:p.bust,head:p.head,target:[12,18,26,34][t]}),
 defend:(p,t)=>({foe:p.foe,ally:p.ally,shot:p.shot,N:[8,11,14,18][t],spd:[.8,1,1.2,1.45][t]}),
 lock:(p,t)=>({syms:p.syms,len:[3,3,4,4][t],tries:[8,6,7,6][t],hint:p.hint}),
 stack:(p,t)=>({ic:p.ic,label:p.label,n:[5,6,8,10][t]}),
 simon:(p,t)=>({syms:p.syms,cols:Math.min(4,p.syms.length),len:[4,5,6,7][t],show:[540,470,410,350][t],title:p.title||'จำลำดับให้ถูก'}),
 lanes:(p,t)=>({me:p.me,ob:p.ob,bg:p.bg||'linear-gradient(#22304a,#0e1626)',speed:[.9,1.1,1.3,1.55][t]}),
 hold:(p,t)=>({ic:p.ic,label:p.label,n:[2,3,3,4][t],lo:[.6,.64,.68,.72][t],hi:[.88,.85,.83,.8][t],ms:1400}),
 beat:(p,t)=>({ic:p.ic,label:p.label,n:[6,8,10,12][t],iv0:[820,720,640,570][t],iv1:[720,600,520,440][t]}),
 track:(p,t)=>({ic:p.ic,tg:p.tg,label:p.label||'เลื่อนแถบให้อยู่ในโซน',ms:[950,800,680,560][t]})};
const ENG=k=>E9[k]||(E2&&E2[k]);
const TSEC=[24,22,20,18];
function mg(sys,i,t,title,cb){let sp=sys.mg[i%sys.mg.length];if(!ENG(sp[0])||!DIFF[sp[0]])sp=sys.mg.find(x=>ENG(x[0])&&DIFF[x[0]])||null;
 if(!sp||typeof window.mg2Play!=='function'){cb(.35+Math.random()*.5,1);return}
 const gid='ns_'+sys.id+'_'+(i%sys.mg.length),k=sp[0];
 G[gid]={n:sp[2],ic:sys.ic,mt:'ผู้ถือ'+sys.n,how:sp[3]||'',t:TSEC[t],rw:()=>'',init:(Bx,a)=>ENG(k)(Bx,a,DIFF[k](sp[1],t))};
 let done=0;const ok=window.mg2Play(gid,{title:`${sys.ic} ${title}`,sub:`${sp[3]||''} · ระดับ${TN[t]}`,t:TSEC[t]},(sc,skip)=>{if(done)return;done=1;cb(skip?.45:sc,skip)});
 if(!ok&&!done){done=1;cb(.35+Math.random()*.5,1)}}
const later=f=>setTimeout(()=>{try{f()}catch(e){console.error('nsys',e)}},380);

// ---------- สถานะ ----------
function nsNew(M,id){const sys=byId(id);M.NS={on:1,id,lv:1,xp:0,path:'',qd:{},tw:{},sh:{},dark:0,kind:0,fail:0,y0:S.age,qy:-9,ey:-9,pk:'',og:pk(['self','lab','god']),clue:0,quit:0,lost:0,runs:0,wins:0};
 bookS(id,b=>{b.n=(b.n||0)+1});return M.NS}
const PERK={fast:['⚡ เร่งค่าประสบการณ์','ค่าประสบการณ์จากเควส ×1.35'],cash:['💵 รายได้ประจำ','ทุกปีได้เงินเพิ่มตามระดับ'],safe:['🛡️ ประกันความพลาด','พลาดเควส/สอบตก เสียน้อยลงครึ่งหนึ่ง']};
function gainXP(M,N,v){if(v<=0||N.lock>0)return'';if(N.pk==='fast')v=Math.round(v*1.35);const cap=CAP[lvT(N.lv)];let up=0;N.xp+=v;
 while(N.xp>=XPL&&N.lv<cap){N.xp-=XPL;N.lv++;up++}
 if(N.lv>=cap&&N.lv<10)N.xp=Math.min(N.xp,XPL);
 if(up){const sys=byId(N.id);log(`📱 <span class="px">[${esc(sys.app)}] เลเวลอัป → Lv.${N.lv}</span>${N.lv===cap&&N.lv<10?' · <b>ถึงขีดสุดของขั้น'+TN[lvT(N.lv)]+'</b> ต้องสอบเลื่อนขั้น':''}`,'epic')}
 return` · ⭐ +${v}`}
const ready=N=>N.lv<10&&N.lv===CAP[lvT(N.lv)]&&N.xp>=XPL;
const STF={
 mon:(M,t,sys,k)=>{const v=Math.round(unit(M,t,(sys.mm||1)*k));S.money=(S.money||0)+v;return`💵 +${fmt(v)}`},
 fame:(M,t,sys,k)=>{const v=Math.round([300,3000,30000,300000][t]*k);M.fame=Math.max(0,(M.fame||0)+v);return`📈 ผู้ติดตาม +${fmt(v)}`},
 int:(M,t,sys,k)=>{const v=Math.max(1,Math.round([2,4,7,12][t]*k));S.int=(S.int||0)+v;return`🧠 สติปัญญา +${v}`},
 cha:(M,t,sys,k)=>{const v=Math.max(1,Math.round([2,4,7,12][t]*k));S.cha=(S.cha||0)+v;return`✨ เสน่ห์ +${v}`},
 hp:(M,t,sys,k)=>{const v=Math.max(1,Math.round([4,8,15,30][t]*k));S.maxHp=(S.maxHp||100)+v;S.hp=Math.min(S.maxHp,(S.hp||0)+v);return`❤️ พลังชีวิตสูงสุด +${v}`},
 pow:(M,t,sys,k)=>{let v=0;try{v=pctPow([.006,.012,.025,.05][t]*k)}catch(e){v=Math.round(20*(t+1)*k)}S.power=(S.power||0)+v;return`💪 พลัง +${fmt(v)}`},
 joy:(M,t,sys,k)=>{const v=Math.max(1,Math.round([3,4,6,8][t]*k));joy(v);return`😊 ความสุข +${v}`},
 kar:(M,t,sys,k)=>{const v=Math.max(1,Math.round([2,3,5,8][t]*k));S.karma=(S.karma||0)+v;return`🙏 กรรมดี +${v}`}};
const stat=(M,t,sys,k)=>{const L=(sys.st||'mon').split(',');return L.map(s=>STF[s]?STF[s](M,t,sys,k/L.length*(L.length>1?1.3:1)):'').filter(Boolean).join(' · ')};
const prA=(M,d)=>{try{const N=M.N;if(N&&N.pr!=null)N.pr=cl(Math.round(N.pr+d),0,100)}catch(e){}};
const pen=N=>N.pk==='safe'?.5:1;

// ---------- ผลของตัวเลือก ----------
// ชนิด: g0/g1/g2 = มินิเกม · r = เสี่ยง · s = ชัวร์ · d = ทางลัด (กรรม −) · k = ใจดี (เงิน −) · f:คีย์ = เลือกเส้นทาง
const HINT={g:'🎮 มินิเกม · ได้ตามฝีมือ',r:'🎲 เสี่ยง ได้มาก',s:'🛡️ ชัวร์ ได้น้อย',d:'😈 ทางลัด · กรรม −',k:'🤍 ใจดี · เสียเงิน',f:'🧭 เลือกเส้นทาง (เปลี่ยนไม่ได้)'};
const RW={g:[22,1,1],r:[26,1.5,1.2],s:[10,.4,.5],d:[28,1.6,1.3],k:[15,-.3,.7]};
// ---------- แถบที่สอง (เฉพาะบางระบบ): 😳 ความอาย (เบียว) · 🌍 ความแตกตื่นของโลก (ประตูหน้ากระดาษ) ----------
function meter(M,N,sys,d){const MT=sys.meter;if(!MT||!d)return'';const o=N.m||0;N.m=cl(Math.round(o+d),0,MT.max||100);
 (MT.th||[]).forEach((th,i)=>{N.mt=N.mt||{};if(o<th[0]&&N.m>=th[0]&&!N.mt[i]){N.mt[i]=1;setTimeout(()=>{try{thEv(M,sys,th)}catch(e){console.error('nsys th',e)}},1300)}});
 if(N.m>=(MT.max||100)&&o<(MT.max||100))setTimeout(()=>{try{full(M,N,sys)}catch(e){console.error('nsys full',e)}},1600);
 return`${MT.ic} ${MT.n} ${d>0?'+':''}${d} → ${N.m}`}
function thEv(M,sys,th){const N=NSo(M);if(!N)return;const go=()=>{if(choice._cur||(typeof modalOpen!=='undefined'&&modalOpen))return setTimeout(go,900);
 choice(th[1],head(sys,N)+th[2],th[3].map(o=>mwC(o[0],()=>{const f=o[1]||{};if(f.m)meter(M,N,sys,f.m);if(f.mon){const v=Math.round(unit(M,lvT(N.lv),Math.abs(f.mon)));S.money=Math.max(0,S.money+(f.mon>0?v:-v))}if(f.joy)joy(f.joy);if(f.karma)S.karma=(S.karma||0)+f.karma;if(f.dark)N.dark+=f.dark;if(f.kind)N.kind+=f.kind;if(f.xp)gainXP(M,N,f.xp);if(f.endk)N.endk=f.endk;if(f.st)stat(M,lvT(N.lv),sys,f.st);
  say(`${sys.meter.ic} ${o[2]}`,f.dark?'bad':'');if(f.m)log(`<span class="tag2">${sys.meter.ic} ${sys.meter.n} → ${N.m}</span>`,'')},{s:o[3]||''})))};go()}
function full(M,N,sys){const MT=sys.meter;if(!NSo(M))return;
 if(MT.full==='awake'){N.lock=2;N.m=35;joy(-6);log(`😳 <b>ความอายเต็มหลอด — ตื่นจากฝัน</b> คุณเห็นตัวเองในกระจกพันผ้าพันแผลที่มือซ้าย แล้วอยากหายไปจากโลก ระบบหยุดให้ค่าประสบการณ์สองปี`,'bad',true);kAdd('ตื่นจากฝันเบียวครั้งใหญ่')}
 else if(MT.full==='world'){N.wc=1;try{if(typeof hwInit==='function'&&!(M.hw>0))hwInit(M,true)}catch(e){}try{W.wFoc()}catch(e){}bookS(sys.id,b=>{b.e.W=1});kAdd('ประตูหน้ากระดาษเปิดทั่วประเทศ โลกเปลี่ยนไปตลอดกาล');
  log(`🌍 <b>ประตูหน้ากระดาษเปิดทั่วประเทศ</b> หนังสือทุกเล่มในห้องสมุดเรืองแสงพร้อมกันตอนเที่ยงคืน เช้าวันรุ่งขึ้นคนแรกที่ตื่นพลังขึ้นข่าวทุกช่อง — <b>โลกปกติกลายเป็นโลกฮันเตอร์แล้ว</b> และลูกหลานของคุณจะเกิดในโลกใหม่นี้`,'myth',true);
  try{isl&&isl({big:1,pri:1,ic:'🌍',h:'โลกเปลี่ยนไป',t:'ประตูหน้ากระดาษเปิดทั่วประเทศ'})}catch(e){}}}
function res(M,sys,o,t,win,kind,sc){const N=NSo(M);if(!N)return;const ex=o[4]||{},[xp,mo,sk]=RW[kind]||RW.s;let fx=[];const mt=sys.meter?meter(M,N,sys,(ex.m!=null?ex.m:(sys.meter.def||{})[kind]||0)*(win?1:(sys.meter.lose||1))):'';if(mt)fx.push(mt);
 if(win){N.fail=0;N.wins++;let m=kind==='g'?.6+(sc||.6):1;fx.push(stat(M,t,sys,sk*m));
  if(mo&&(sys.st||'').indexOf('mon')<0){const v=Math.round(unit(M,t,mo*.5*m));if(v<0&&S.money<-v){}else{S.money=Math.max(0,(S.money||0)+v);fx.push(`💵 ${v>0?'+':''}${fmt(v)}`)}}
  else if(mo<0){const v=Math.round(unit(M,t,mo*.5));S.money=Math.max(0,(S.money||0)+v);fx.push(`💵 ${fmt(v)}`)}
  if(kind==='d'){N.dark++;S.karma=(S.karma||0)-6;fx.push('กรรม −6');prA(M,3)}
  if(kind==='k'){N.kind++;S.karma=(S.karma||0)+5;joy(3);fx.push('กรรมดี +5')}
  if(ex.f)N.qd['f_'+ex.f]=1;if(ex.endk)N.endk=ex.endk;if(ex.end){try{M.end=Math.max(S.age+2,(M.end||80)+ex.end)}catch(e){}}
  fx.push(gainXP(M,N,Math.round(xp*(kind==='g'?.6+(sc||.6)*.7:1))).replace(/^ · /,''));
  say(`${sys.ic} ${o[2]||o[0]+' สำเร็จ'}`,kind==='d'?'':'good',null);log(`<span class="tag2">${fx.filter(Boolean).join(' · ')}</span>`,'')}
 else{N.fail++;let fx2=[];const p=pen(N);
  if(kind==='r'||kind==='d'){const v=Math.round(unit(M,t,.6*p));S.money=Math.max(0,(S.money||0)-v);fx2.push(`💵 −${fmt(v)}`);joy(-Math.round(4*p));}
  if(kind==='d'){N.dark++;S.karma=(S.karma||0)-8;try{M.sec=cl((M.sec||0)+Math.round(8*p),0,100)}catch(e){}fx2.push('กรรม −8 · ความลับรั่ว +'+Math.round(8*p))}
  if(kind==='g'){prA(M,Math.round(4*p));fx2.push('แรงกดดัน +'+Math.round(4*p))}
  const g=gainXP(M,N,kind==='g'?6:3);if(g)fx2.push(g.replace(/^ · /,''));
  if(mt)fx2.push(mt);say(`${sys.ic} ${o[3]||o[0]+' ไม่สำเร็จ'}`,'bad');if(fx2.length)log(`<span class="tag2">${fx2.join(' · ')}</span>`,'');
  if(N.fail>=3){N.fail=0;punish(M,N,sys)}}}
function punish(M,N,sys){const t=lvT(N.lv),v=Math.round(unit(M,t,.8*pen(N)));S.money=Math.max(0,(S.money||0)-v);joy(-6);N.xp=Math.max(0,N.xp-15);
 say(`📱 <span class="px">[${esc(sys.app)}] ⚠️ บทลงโทษ: พลาดภารกิจติดกัน 3 ครั้ง</span> ระบบหักเงิน ${fmt(v)} และค่าประสบการณ์ 15 · หน้าจอมือถือกะพริบแดงทั้งคืน`,'bad')}
function doOpt(M,sys,o,t,title){const N=NSo(M);if(!N)return;const k=o[1]||'s';
 if(k[0]==='f'){N.path=k.slice(2);const P=sys.P.find(p=>p[0]===N.path);say(`🧭 <b>เส้นทาง: ${esc(P?P[1]:N.path)}</b> — ${esc(o[2]||'')}`,'epic');gainXP(M,N,12);kAdd(`${sys.n}: เลือกเส้นทาง${P?P[1]:''}`);return}
 if(k[0]==='g'){const i=+k[1]||0;later(()=>mg(sys,i,t,title,(sc,skip)=>res(M,sys,o,t,sc>=.55,'g',sc)));return}
 const bonus=((S.int||0)>200?.04:0)-(sys.meter&&sys.meter.full==='awake'&&(N.m||0)>=70?.15:0),p=({r:.48,s:.9,d:.84,k:.93}[k]||.8)+bonus;res(M,sys,o,t,Math.random()<p,k)}
const opt=(M,sys,o,t,title)=>mwC(o[0],()=>doOpt(M,sys,o,t,title),{s:HINT[(o[1]||'s')[0]]||''});

// ---------- เควสของระบบ ----------
const head=(sys,N)=>`<div class="tag2" style="margin-bottom:4px">📱 ${esc(sys.app)} · <b style="color:${TC[lvT(N.lv)]}">${TI[lvT(N.lv)]} ขั้น${TN[lvT(N.lv)]}</b> · Lv.${N.lv}${N.path?' · 🧭 '+esc((sys.P.find(p=>p[0]===N.path)||[0,''])[1]):''}</div>`;
function pool(N,sys){const t=lvT(N.lv);return sys.Q.map((q,i)=>({q,i})).filter(({q,i})=>!N.qd[i]&&q[0]<=t&&q[0]>=t-1&&(!q[1]||q[1]===N.path)&&!(q[0]===3&&N.lv<10))}
function quest(M){const N=NSo(M);if(!N)return;const sys=byId(N.id);if(!sys)return;const t=lvT(N.lv);N.qy=S.age;
 if(t>=1&&!N.path)return fork(M);
 if(sys.dyn&&Math.random()<(sys.dynP||.3)){try{const q=sys.dyn(M,N,{lvT,unit,stat,meter,gainXP,say,kAdd,pk,esc});if(q){return choice(`${sys.ic} ${q[0]}`,head(sys,N)+q[1],q[2].map(o=>opt(M,sys,o,t,q[0].replace(/^\S+\s/,''))))}}catch(e){console.error('nsys dyn',e)}}
 const L=pool(N,sys);if(!L.length||Math.random()<.18)return grind(M);
 const x=L.find(e=>e.q[0]===3)||pk(L);N.qd[x.i]=1;const q=x.q;
 choice(`${sys.ic} ${q[2]}`,head(sys,N)+q[3],q[4].map(o=>opt(M,sys,o,t,q[2].replace(/^\S+\s/,''))))}
function grind(M){const N=NSo(M),sys=byId(N.id),t=lvT(N.lv),i=RN(0,sys.mg.length-1),m=sys.mg[i];
 choice(`📋 งานประจำของระบบ: ${m[2]}`,head(sys,N)+`แอปส่งภารกิจรายปีมาตามปกติ ‘${esc(m[2])}’ — ${esc(m[3]||'')}<br><span class="tag2">งานแบบนี้ทำซ้ำได้ทุกปี ยิ่งเก่งยิ่งได้มาก</span>`,[
  opt(M,sys,['ลงมือเต็มที่','g'+i,`ทำ${m[2]}ได้เกินเป้า ระบบเด้งเสียงเหรียญทอง`,`${m[2]}ไม่ถึงเป้า ระบบขึ้นตัวแดงหนึ่งบรรทัด`],t,m[2]),
  opt(M,sys,['ทำพอผ่าน','s','ผ่านเกณฑ์แบบไม่หวือหวา','เลยกำหนดส่งไปหนึ่งวัน'],t,m[2]),
  mwC('ข้ามปีนี้ (ระบบไม่พอใจ)',()=>{N.fail++;prA(M,-4);joy(3);say(`📱 คุณปิดแจ้งเตือนทั้งปี ได้นอนเต็มอิ่ม แต่ระบบนับว่าพลาดภารกิจหนึ่งครั้ง`,'');if(N.fail>=3){N.fail=0;punish(M,N,sys)}},{s:'พักผ่อน · นับเป็นพลาด'})])}
function fork(M){const N=NSo(M),sys=byId(N.id),t=lvT(N.lv);
 choice(`🧭 ${sys.ic} ทางแยกของระบบ`,head(sys,N)+esc(sys.F)+`<br><span class="tag2">เส้นทางที่เลือกเปลี่ยนเควส เพื่อนร่วมทาง และตอนจบ</span>`,
  sys.P.map(p=>mwC(`${p[1]}`,()=>doOpt(M,sys,[p[1],'f:'+p[0],p[2]],t,'ทางแยก'),{s:p[2]})))}
function exam(M){const N=NSo(M);if(!N)return;const sys=byId(N.id),t=lvT(N.lv),nm=sys.X[t];N.ey=S.age;
 choice(`🎓 ${sys.ic} สอบเลื่อนขั้น: ${nm}`,head(sys,N)+`ระบบล็อกเลเวลไว้ที่ Lv.${N.lv} จนกว่าคุณจะผ่าน <b>${esc(nm)}</b><br>ผ่าน = ขึ้นขั้น<b style="color:${TC[t+1]}">${TN[t+1]}</b> ได้ฉายา「${esc(sys.T[t+1])}」 · ไม่ผ่าน = รอปีหน้า แรงกดดันขึ้น`,[
  mwC('เข้าสอบ',()=>later(()=>mg(sys,(sys.xm||[0,1,2])[t]||t,Math.min(3,t+1),nm,(sc,skip)=>{if(!NSo(M))return;
   if(sc>=.6){N.lv++;N.xp=0;const r=stat(M,t+1,sys,2.2);bookS(sys.id,b=>{b.t=Math.max(b.t||0,lvT(N.lv))});kAdd(`${sys.n}: ขึ้นขั้น${TN[lvT(N.lv)]} 「${sys.T[lvT(N.lv)]}」`);
    log(`🎓 <b>ผ่าน${esc(nm)}!</b> ${sys.ic} ขึ้นขั้น<b style="color:${TC[lvT(N.lv)]}">${TN[lvT(N.lv)]}</b> ได้ฉายา <b>「${esc(sys.T[lvT(N.lv)])}」</b> <span class="tag2">${r}</span>`,N.lv>=10?'myth':'epic',true);
    if(N.lv>=10)log(`👑 <b>${esc(sys.app)} ถึงขั้นเทพ</b> — ภารกิจสุดท้ายของระบบจะมาถึงในปีหน้า`,'myth',true)}
   else{const p=pen(N);N.xp=Math.max(0,Math.round(XPL-12*p));prA(M,Math.round(6*p));joy(-Math.round(4*p));log(`📄 ${esc(nm)} — <b>ไม่ผ่าน</b> (${Math.round(sc*100)}%) ระบบให้สอบใหม่ปีหน้า <span class="tag2">แรงกดดัน +${Math.round(6*p)}</span>`,'bad')}})),{s:'🎮 มินิเกมยากขึ้นหนึ่งขั้น · ต้องได้ 60%'}),
  mwC('ยังไม่พร้อม ปีหน้าค่อยสอบ',()=>{N.ey=S.age;say('📱 คุณกดเลื่อนสอบ ระบบตอบกลับสั้นๆ ‘รับทราบ’','')},{s:'ไม่เสียอะไร'})])}
function twist(M){const N=NSo(M),sys=byId(N.id),t=lvT(N.lv);const L=(sys.W||[]).map((w,i)=>({w,i})).filter(x=>!N.tw[x.i]);if(!L.length)return shared(M);const x=pk(L);N.tw[x.i]=1;const w=x.w;
 choice(`${sys.ic} ${w[0]}`,head(sys,N)+w[1],w[2].map(o=>mwC(o[0],()=>{const f=o[1]||{},fx=[];
  if(f.mon){const v=Math.round(unit(M,t,Math.abs(f.mon)));if(f.mon>0){S.money+=v;fx.push('💵 +'+fmt(v))}else{S.money=Math.max(0,S.money-v);fx.push('💵 −'+fmt(v))}}
  if(f.joy){joy(f.joy);fx.push(`😊 ${f.joy>0?'+':''}${f.joy}`)}if(f.karma){S.karma=(S.karma||0)+f.karma;fx.push(`กรรม ${f.karma>0?'+':''}${f.karma}`)}
  if(f.pr){prA(M,f.pr);fx.push(`แรงกดดัน ${f.pr>0?'+':''}${f.pr}`)}if(f.dark)N.dark+=f.dark;if(f.kind)N.kind+=f.kind;
  if(f.st)fx.push(stat(M,t,sys,f.st));if(f.end){M.end=Math.max(S.age+2,(M.end||80)+f.end);fx.push(`⏳ อายุขัย ${f.end>0?'+':''}${f.end} ปี`)}
  if(f.m){fx.push(meter(M,N,sys,f.m))}if(f.endk)N.endk=f.endk;if(f.xp){const g=gainXP(M,N,f.xp);if(g)fx.push(g.replace(/^ · /,''))}if(f.lv){N.lv=Math.max(1,N.lv+f.lv);fx.push(`Lv ${f.lv>0?'+':''}${f.lv}`)}
  say(`${sys.ic} ${o[2]}`,f.dark?'bad':f.karma>0||f.joy>0?'good':'');if(fx.length)log(`<span class="tag2">${fx.join(' · ')}</span>`,'')},{s:o[3]||''})))}

// ---------- เหตุการณ์ร่วมทุกระบบ (ใส่ชื่อแอป/ฉายาของแต่ละระบบ) ----------
const OG={self:['ข้อความในแอปใช้คำติดปากเดียวกับคุณ','ไฟล์ตั้งค่าซ่อนมีวันเกิดของคุณเป็นรหัส','บันทึกนักพัฒนาเซ็นชื่อด้วยลายมือที่เหมือนของคุณทุกเส้น','ผู้สร้างระบบคือ <b>ตัวคุณเองจากอีกเส้นเวลา</b> ที่ใช้ชีวิตพลาดทุกเรื่อง และส่งแอปนี้ย้อนมาเป็นโอกาสครั้งที่สอง'],
 lab:['ทุกครั้งที่ขึ้นเลเวล มีอีเมลรายงานส่งไปที่โดเมนแปลกๆ','รถตู้คันเดิมจอดหน้าบ้านทุกครั้งที่คุณสอบเลื่อนขั้น','เจอคนอีกสามคนที่ได้แอปวันเดียวกับคุณ ทั้งสามคนเกิดโรงพยาบาลเดียวกัน','ผู้สร้างระบบคือ <b>บริษัทเทคที่ทดลองว่ามนุษย์จะเป็นอย่างไรถ้าได้โกงชีวิต</b> คุณคือผู้ถูกทดลองหมายเลข 07'],
 god:['แอปทำงานได้แม้มือถือแบตหมด','ระบบรู้เรื่องที่คุณไม่เคยบอกใคร แม้แต่คิดในใจ','ทุกคืนวันพระ ไอคอนแอปเปลี่ยนเป็นดอกบัว','ผู้สร้างระบบคือ <b>เทวดาที่เบื่อการดูชีวิตมนุษย์ซ้ำๆ</b> แอปนี้คือการพนันของเขากับเทวดาอีกองค์ ว่าคุณจะเลือกทางไหน']};
const SH=['rival','patch','leak','lost','price','clue','box','burn','ally'];
function shared(M,force){const N=NSo(M),sys=byId(N.id),t=lvT(N.lv);if(sys.OG)OG['sys_'+sys.id]=sys.OG,N.og=N.og&&N.og.indexOf('sys_')===0?N.og:(sys.OGa?'sys_'+sys.id:N.og);if(force==='clue'&&N.clue>=4)force='box';let L=SH.filter(k=>!(k==='patch'&&N.sh['patch'+t])&&!(k==='clue'&&N.clue>=4)&&!(k==='lost'&&N.sh.lost)&&!(k==='price'&&N.lv>=CAP[t]));const k=force||pk(L);N.sh[k]=(N.sh[k]||0)+1;const H=head(sys,N),app=esc(sys.app);
 const C=(a,b,c)=>mwC(a,b,{s:c||''});
 if(k==='rival'){const rn=anyName(Math.random()<.5?'ชาย':'หญิง');
  return choice(`⚔️ ผู้ถือ${esc(sys.n)}อีกคน`,H+`${esc(rn)} เปิดมือถือให้ดูในร้านกาแฟ — ไอคอนแอปเดียวกับของคุณ เลเวลสูงกว่าคุณหนึ่งขั้น ‘ระบบบอกว่าถ้าชนะคนถือแอปเดียวกัน จะได้ค่าประสบการณ์ของอีกฝ่ายไปครึ่งหนึ่ง’`,[
   C('ท้าแข่งตรงนั้นเลย',()=>later(()=>mg(sys,RN(0,sys.mg.length-1),Math.min(3,t+1),`ดวลกับ ${rn}`,sc=>{if(sc>=.58){const g=gainXP(M,N,30);S.fame=(S.fame||0)+10;say(`🏆 คุณชนะ${esc(rn)} ระบบดูดค่าประสบการณ์จากแอปของเขามาครึ่งหนึ่ง${g}`,'epic')}else{N.xp=Math.max(0,N.xp-20);say(`😞 ${esc(rn)}ชนะ ระบบของคุณหักค่าประสบการณ์ 20 ส่งไปให้เขา`,'bad')}})),'🎮 มินิเกมยากขึ้นหนึ่งขั้น'),
   C('ชวนเป็นพันธมิตร',()=>{N.ally=rn;gainXP(M,N,10);say(`🤝 คุณกับ${esc(rn)}แลกเบอร์กัน ตั้งกลุ่มไลน์ชื่อ ‘คนมีแอป’ ปีต่อๆ ไปเขาจะส่งเคล็ดลับมาให้`,'good')},'อาจถูกหักหลังทีหลัง'),
   C('แกล้งทำเป็นไม่มีแอป',()=>{say('🙈 คุณบอกว่าเป็นแค่เกมมือถือ เขามองคุณนานเกินไปนิดหนึ่ง','')},'ปลอดภัย')])}
 if(k==='ally'){if(!N.ally)return shared(M,'box');const rn=N.ally;const bad=Math.random()<.35;
  return choice(`🤝 ${esc(rn)} ขอความช่วยเหลือ`,H+`${esc(rn)} โทรมาตอนตีสอง เสียงสั่น ‘ระบบให้ภารกิจที่ทำคนเดียวไม่ได้ ช่วยหน่อย แบ่งรางวัลครึ่งกัน’`,[
   C('ไปช่วยทันที',()=>{if(bad){N.xp=Math.max(0,N.xp-25);S.money=Math.max(0,S.money-unit(M,t,.6));delete N.ally;say(`🗡️ ภารกิจนั้นไม่มีจริง ${esc(rn)}ใช้คุณเป็นเหยื่อล่อ ระบบของเขาได้รางวัลจากการ ‘หักหลังผู้ถือแอปอื่น’ คุณเสียทั้งเงินทั้งค่าประสบการณ์`,'bad')}else{const g=gainXP(M,N,24);joy(4);say(`🤝 คุณกับ${esc(rn)}ทำภารกิจคู่สำเร็จ แบ่งรางวัลกันคนละครึ่ง${g}`,'good')}},'อาจเป็นกับดัก'),
   C('ขอดูภารกิจในแอปเขาก่อน',()=>{if(bad){delete N.ally;say(`🔍 หน้าจอของ${esc(rn)}เขียนว่า ‘หลอกผู้ถือแอปอื่นมาที่โกดังเก่า’ คุณวางสายแล้วบล็อกเบอร์`,'');gainXP(M,N,8)}else{const g=gainXP(M,N,16);say(`🔍 ภารกิจจริง คุณไปช่วยแบบระวังตัว ได้รางวัลน้อยหน่อย${g}`,'good')}},'ปลอดภัยกว่า'),
   C('ไม่รับสาย',()=>{say(`📵 ${esc(rn)}ไม่โทรมาอีกเลย`,'')})])}
 if(k==='patch'){N.sh['patch'+t]=1;const P=Object.keys(PERK);
  return choice(`🔄 ${app} อัปเดตเวอร์ชัน ${t+2}.0`,H+`แอปขอรีสตาร์ต แล้วขึ้นหน้าจอเลือกความสามารถใหม่หนึ่งอย่าง ${N.pk?`(ของเดิม: ${PERK[N.pk][0]} จะถูกแทนที่)`:''}`,P.map(p=>C(PERK[p][0],()=>{N.pk=p;say(`🔄 อัปเดตเสร็จ ได้ <b>${PERK[p][0]}</b> — ${PERK[p][1]}`,'epic')},PERK[p][1])))}
 if(k==='leak')return choice(`👀 มีคนเห็นหน้าจอ`,H+`เพื่อนร่วมงานชะโงกมาเห็นหน้าจอ ${app} ตอนมันเด้งภารกิจ ‘อะไรน่ะ เกมอะไร ภารกิจจริงเหรอ’`,[
   C('บอกว่าเกมมือถือ',()=>{if(Math.random()<.75)say('🎮 เขาหัวเราะแล้วขอโหลดบ้าง คุณบอกว่าในร้านแอปไม่มีแล้ว','');else{try{M.sec=cl((M.sec||0)+10,0,100)}catch(e){}say('🤨 เขาไม่เชื่อ แล้วเริ่มสังเกตคุณทุกวัน','bad',{sec:0})}}),
   C('เล่าความจริงทั้งหมด',()=>{if(Math.random()<.5){S.fame=(S.fame||0)+5;try{M.fame=(M.fame||0)+2000}catch(e){}joy(5);say('📣 เขาเชื่อ และกลายเป็นคนเดียวในโลกที่รู้ความลับของคุณ ทุกปีเขาถามว่า ‘วันนี้ระบบสั่งอะไร’','good')}else{try{M.sec=cl((M.sec||0)+20,0,100)}catch(e){}say('📸 เขาถ่ายรูปหน้าจอลงโซเชียล คนแชร์ไปหลักพัน ระบบส่งคำเตือนสีแดง','bad')}},'เสี่ยง'),
   C('ปิดจอแล้วเปลี่ยนเรื่อง',()=>say('📴 คุณกดล็อกจอ แล้วถามเรื่องงานด่วนที่ไม่มีจริง',''))]);
 if(k==='lost'){N.sh.lost=1;return choice(`📱 มือถือโดนกระชาก!`,H+`มอเตอร์ไซค์ซิ่งผ่านแล้วกระชากมือถือคุณไป ${app} อยู่ในเครื่องนั้น`,[
   C('วิ่งไล่ (มินิเกม)',()=>later(()=>{const f=(sc)=>{if(sc>=.55){gainXP(M,N,10);say('🏃 คุณกระโดดข้ามแผงลอยสามแผง ทันตอนมันติดไฟแดง มือถือกลับมาครบ ระบบเด้ง ‘ภารกิจลับ: ทวงคืน สำเร็จ’','epic')}else{N.lv=Math.max(1,N.lv-1);N.xp=0;say('📉 มันหายไปในซอย มือถือเครื่องใหม่โหลดแอปกลับมาได้ แต่ข้อมูลหายไปหนึ่งเลเวล','bad')}};
    if(typeof window.mg2Play==='function'&&E2&&E2.lanes){G.ns_chase={n:'ไล่จับโจรกระชาก',ic:'🏃',mt:'นักวิ่งตามโจร',how:'หลบสิ่งกีดขวาง',t:18,rw:()=>'',init:(Bx,a)=>E2.lanes(Bx,a,DIFF.lanes({me:'🏃',ob:'🛺'},t))};window.mg2Play('ns_chase',{title:'🏃 ไล่ตามโจร'},(sc,sk)=>f(sk?.45:sc))}else f(Math.random())}),'🎮 หลบเลน'),
   C('ซื้อเครื่องใหม่ แจ้งความ',()=>{S.money=Math.max(0,S.money-unit(M,t,.3));N.xp=Math.max(0,N.xp-15);say('📲 เครื่องใหม่โหลดแอปกลับมาเองโดยไม่ต้องติดตั้ง ข้อมูลหายไปนิดหน่อย','')}),
   C('ปล่อยไป แอปอาจไม่ตามมา',()=>{N.lost=2;say('🕊️ สองปีถัดมามือถือคุณเงียบสนิท ไม่มีภารกิจ ไม่มีเสียงเตือน คุณเพิ่งรู้ว่าเคยหายใจไม่ทั่วท้องมานานแค่ไหน','good',{joy:6})},'ระบบหยุด 2 ปี')])}
 if(k==='price')return choice(`💀 ข้อเสนอพิเศษจากระบบ`,H+`หน้าจอดำสนิท ตัวหนังสือสีแดงขึ้นทีละตัว ‘ข้ามไปเลเวลถัดไปทันที แลกกับบางอย่างของคุณ’`,[
   C('แลกอายุขัย 3 ปี',()=>{try{M.end=Math.max(S.age+2,(M.end||80)-3)}catch(e){}N.lv=Math.min(CAP[t],N.lv+1);N.xp=0;say(`⏳ ผมหงอกขึ้นหนึ่งเส้นตอนคุณกดยืนยัน · <b>Lv.${N.lv}</b> · อายุขัย −3 ปี`,'bad')},'⏳ อายุขัย −3'),
   C('แลกความทรงจำดีๆ หนึ่งเรื่อง',()=>{N.lv=Math.min(CAP[t],N.lv+1);N.xp=0;joy(-12);say(`🫥 คุณจำไม่ได้แล้วว่าวันเกิดอายุสิบขวบเป็นยังไง แม่เล่าให้ฟังแต่คุณไม่รู้สึกอะไร · <b>Lv.${N.lv}</b>`,'bad')},'😊 −12'),
   C('ปฏิเสธ',()=>{gainXP(M,N,6);say('✋ คุณกดปฏิเสธ ตัวหนังสือแดงจางไป ระบบขึ้นข้อความเล็กๆ ‘น่าสนใจ’','good')})]);
 if(k==='clue'){N.clue++;const c=OG[N.og][Math.min(3,N.clue-1)];
  if(N.clue<4)return choice(`🔎 เบาะแสของผู้สร้างระบบ (${N.clue}/4)`,H+c+'<br><span class="tag2">เก็บครบ 4 ชิ้นแล้วจะรู้ว่าใครสร้างแอปนี้</span>',[C('จดไว้',()=>{gainXP(M,N,6);say(`🔎 เบาะแสที่ ${N.clue}: ${c}`,'')}),C('สืบต่อทันที',()=>{if(Math.random()<.5){N.clue=Math.min(3,N.clue+1);say('🔎 คุณขุดลึกจนเจอเบาะแสอีกชิ้นในคืนเดียว','good')}else{prA(M,6);say('🔎 นอนไม่หลับทั้งเดือน ได้แค่ทฤษฎีสมคบคิดสิบหน้า','bad')}},'อาจได้เบาะแสเพิ่ม')]);
  return choice('🗝️ ความลับของระบบ',H+c,[C('เผชิญหน้ากับผู้สร้าง',()=>{N.og2=1;gainXP(M,N,30);kAdd('รู้ความลับของระบบ');bookS(sys.id,b=>{b.e.S=1});say(`🗝️ คุณรู้แล้วว่าใครอยู่เบื้องหลังแอปนี้ — ${c}`,'myth',null,true)}),C('ไม่อยากรู้ ปิดแอปไว้แบบนั้น',()=>{N.og2=2;joy(4);say('🗝️ บางเรื่องไม่รู้จะดีกว่า คุณวางมือถือคว่ำไว้บนโต๊ะ','')})])}
 if(k==='box')return choice(`🎁 กล่องสุ่มรายปีของ${app}`,H+'ไอคอนกล่องของขวัญกะพริบบนหน้าจอ เปิดต่อได้เรื่อยๆ แต่ถ้าเจอกล่องเปล่าสีดำ ของทั้งหมดรอบนั้นหายไป',[
   C('เปิดกล่อง (มินิเกม)',()=>later(()=>{G.ns_box={n:'กล่องสุ่มระบบ',ic:'🎁',mt:'นักเปิดกล่อง',how:'เปิดต่อหรือพอ',t:20,rw:()=>'',init:(Bx,a)=>E9.luck(Bx,a,DIFF.luck({good:[['🎁',1],['💎',3],['⭐',2],['🪙',1]],bust:'⬛',head:'เปิดต่อหรือพอ · กล่องดำ = หายหมด'},t))};
    window.mg2Play('ns_box',{title:'🎁 กล่องสุ่มของระบบ'},(sc,sk)=>{sc=sk?.4:sc;const r=stat(M,t,sys,.6+sc*1.4),g=gainXP(M,N,Math.round(8+20*sc));say(`🎁 เปิดกล่องได้ ${Math.round(sc*100)}% · ${r}${g}`,sc>=.6?'good':'')})}),'🎮 เสี่ยงดวง'),
   C('ไม่เปิด',()=>say('🎁 กล่องหายไปตอนเที่ยงคืน',''))]);
 if(k==='burn')return choice(`🔥 หมดไฟ`,H+`สามเดือนติดที่คุณทำภารกิจของ${app}ทุกวัน คืนนี้คุณนั่งในรถที่ลานจอดหนึ่งชั่วโมงเต็มโดยไม่สตาร์ต`,[
   C('ลาพักหนึ่งเดือน ปิดแจ้งเตือน',()=>{prA(M,-12);joy(8);N.fail++;say('🌿 คุณไปนอนบ้านต่างจังหวัด ตื่นมาฟังเสียงไก่ ระบบนับว่าพลาดหนึ่งครั้ง แต่คุณไม่สน','good')},'แรงกดดัน −12'),
   C('ฝืนทำต่อ',()=>{gainXP(M,N,20);prA(M,10);S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.12));say('☕ กาแฟแก้วที่สี่ของวัน มือเริ่มสั่น ระบบเด้งชมว่า ‘ขยันมาก’','bad')},'⭐ +20 · สุขภาพ −'),
   C('คุยกับคนที่รัก',()=>{prA(M,-7);joy(5);gainXP(M,N,5);say('🫂 คุณเล่าให้ใครสักคนฟัง เขาไม่เข้าใจเรื่องแอป แต่เข้าใจว่าคุณเหนื่อย','good')})]);
 return grind(M)}

// ---------- ได้รับระบบ ----------
function offer(M){M.fl=M.fl||{};M.fl.nsAsk=(M.fl.nsAsk||0)+1;if(!SYS.length)return;const b=bookG();
 const L=SYS.slice().sort(()=>Math.random()-.5).sort((a,c)=>((b[a.id]&&b[a.id].n)||0)-((b[c.id]&&b[c.id].n)||0)).slice(0,3);
 const why=S.age<12?pk(['แท็บเล็ตเก่าของพ่อที่คุณแอบเล่นเกมเปิดขึ้นเองกลางดึก','หน้าจอนาฬิกาเด็กที่แม่ซื้อให้กะพริบเป็นตัวหนังสือที่คุณยังอ่านไม่คล่อง','ทีวีในห้องนั่งเล่นเปลี่ยนช่องเองแล้วขึ้นข้อความหาคุณคนเดียว']):pk(['คืนนั้นฝนตกหนัก มือถือที่ชาร์จไว้หัวเตียงสั่นสามครั้ง','หลังล้มหัวฟาดขอบฟุตปาทแล้วตื่นขึ้นมาในโรงพยาบาล','มือถือมือสองที่ซื้อจากตลาดนัดมีแอปติดมาสามแอป','ตอนตีสามสามนาที จอมือถือสว่างขึ้นเองทั้งที่ปิดเครื่องอยู่']);
 choice('📱 แอปที่ลบไม่ได้',`${why} — บนหน้าจอมีไอคอนแอปใหม่ที่คุณไม่เคยโหลด ตัวหนังสือขึ้นมาว่า<br><b class="px">[ยินดีด้วย คุณได้รับเลือก · เลือกระบบได้ 1 ระบบ · เลือกแล้วเปลี่ยนไม่ได้]</b>`,
  L.map(s=>mwC(`${s.ic} ${s.app}`,()=>{nsNew(M,s.id);log(`📱 <b>ติดตั้ง ${esc(s.app)} แล้ว</b> — ${esc(s.d)} <span class="tag2">ขั้น${TN[0]} 「${esc(s.T[0])}」 · เปิดดูได้ที่ ☰ เมนู → 📱 ระบบ</span>`,'myth',true);kAdd(`ได้รับ${s.app}`)},{s:s.d}))
  .concat(M.fl.nsAsk<2?[mwC('🗑️ กดปิด ไม่เอา',()=>say('🗑️ คุณกดปิดแอป มันหายไปจากหน้าจอ… แต่คุณรู้สึกว่ามันยังรออยู่','') ,{s:'อาจกลับมาถามอีกครั้ง'})]:[]))}

// ---------- รายปี ----------
{const c0=CAND.normal;CAND.normal=(M,foc,out)=>{if(c0)c0(M,foc,out);try{if(!isN(M))return;const r=Math.random;M.fl=M.fl||{};
 const N=M.NS;
 if(!N)return;
 if(!N.on)return;if(N.lost>0||N.wc)return;
 if(ready(N)&&S.age-N.ey>=1)out.push({id:'ns_ex',p:4.6});
 else if(lvT(N.lv)>=1&&!N.path)out.push({id:'ns_fork',p:4.5});
 else if(N.lv>=10&&!N.fin&&pool(N,byId(N.id)).some(x=>x.q[0]===3))out.push({id:'ns_q'+(M.y%3),p:4.4});
 else if(S.age-N.qy>=1&&r()<.62)out.push({id:'ns_q'+(M.y%3),p:3.5});
 if(r()<.13)out.push({id:'ns_tw'+(M.y%2),p:3.6});
 if(r()<.16)out.push({id:'ns_sh'+(M.y%3),p:3.2});
 if(N.clue<4&&r()<.06)out.push({id:'ns_clue'+(M.y%2),p:3.3})}catch(e){console.error('nsys cand',e)}}}
const EV=(id,go)=>MW_R.push({id,w:0,cd:0,c:()=>false,go});
EV('ns_get',M=>offer(M));EV('ns_ex',M=>exam(M));EV('ns_fork',M=>fork(M));
[0,1,2].forEach(i=>{EV('ns_q'+i,M=>quest(M));EV('ns_sh'+i,M=>shared(M))});[0,1].forEach(i=>{EV('ns_tw'+i,M=>twist(M));EV('ns_clue'+i,M=>shared(M,'clue'))});
// ผลประจำปี
{const _y=mwYear;mwYear=function(){const r=_y.apply(this,arguments);try{const M=S&&S.mw;if(!M||!S.alive)return r;M.fl=M.fl||{};
 // ได้ระบบได้ทุกช่วงอายุ (ตั้งแต่ 5 ขวบ) ปีละราว 2% · กดปิดได้ 1 ครั้ง ระบบอาจกลับมาถามอีก
 {const ih=LS.get('murim_nsinh',null);if(ih&&!M.NS&&wOf(M)==='normal'&&S.age>=12&&byId(ih.id)){LS.set('murim_nsinh',null);const sy=byId(ih.id);setTimeout(()=>{const go=()=>{if(choice._cur||(typeof modalOpen!=='undefined'&&modalOpen))return setTimeout(go,900);if(M.NS)return;choice(`${sy.ic} ของเก่าในกล่องใต้เตียง`,`คุณรื้อกล่องเก่าในห้องเก็บของ เจอ${esc(sy.inhT||'สมุดเล่มหนึ่ง')}ที่มีชื่อ <b>${esc(ih.n)}</b> เขียนไว้หน้าแรก — คนที่ใช้ชีวิตก่อนหน้าคุณ ทันทีที่เปิด มือถือคุณสั่น`,[mwC('เปิดอ่านต่อ',()=>{const N=nsNew(M,sy.id);N.lv=Math.min(3,1+Math.floor((ih.lv||1)/4));log(`${sy.ic} <b>รับมรดก ${esc(sy.app)}</b> จาก ${esc(ih.n)} · เริ่มที่ Lv.${N.lv}`,'myth',true);kAdd(`รับมรดก${sy.app}`)},{s:'ได้ระบบนี้ทันที เริ่มเลเวลสูงขึ้น'}),mwC('ปิดกล่อง',()=>say('📦 คุณวางกล่องไว้ที่เดิม แต่รู้ว่ามันยังรออยู่',''))])};go()},1500);return r}}
 if(!M.NS&&wOf(M)==='normal'&&S.age>=5&&(M.fl.nsAsk||0)<2&&Math.random()<(window._nsRate||.02)){fire('ns_get');return r}
 const N=NSo(M);if(!N||wOf(M)!=='normal'||N.wc)return r;const sys=byId(N.id);if(!sys)return r;
 if(N.lock>0){N.lock--;if(!N.lock)say(`${sys.ic} ระบบกลับมาทำงาน ‘ยินดีต้อนรับกลับ ท่านผู้ถูกเลือก’`,'')}
 if(sys.meter&&sys.meter.dec&&N.m>0)N.m=Math.max(0,N.m-sys.meter.dec);
 if(M.kid){if(ready(N))fire('ns_ex');else if(Math.random()<.35)fire('ns_q'+(M.y%3));}
 if(N.lost>0){N.lost--;if(!N.lost)say(`📱 เช้าวันหนึ่งมือถือสั่น ${esc(sys.app)} กลับมาแล้ว ‘ยินดีต้อนรับกลับ’`,'');return r}
 const t=lvT(N.lv);gainXP(M,N,6+t*2);const tx=stat(M,t,sys,.35);
 if(N.pk==='cash'){const v=Math.round(unit(M,t,.5));S.money=(S.money||0)+v}
 try{addFeed('ev',`📱 ${esc(sys.app)} · ${TI[t]} ${TN[t]} Lv.${N.lv} ${'▰'.repeat(Math.round(N.xp/XPL*5))}${'▱'.repeat(5-Math.round(N.xp/XPL*5))} · ${tx}${ready(N)?' · 🎓 <b>พร้อมสอบเลื่อนขั้น</b>':''}`,'sum')}catch(e){}
 }catch(e){console.error('nsys year',e)}return r}}

// ---------- หน้าแอป ----------
const css=document.createElement('style');css.textContent=`
.nsApp{background:linear-gradient(180deg,#0d1b2a,#111827);border:1.5px solid #3a86ff66;border-radius:18px;padding:12px;color:#e6f0ff;box-shadow:inset 0 0 24px #3a86ff22}
.nsApp .px{font-family:inherit;letter-spacing:.5px}.nsApp .hd{display:flex;gap:10px;align-items:center}.nsApp .ic{font-size:38px;line-height:1;filter:drop-shadow(0 0 8px #3a86ff)}
.nsApp .nm{font-weight:800;font-size:17px}.nsApp .tt{font-size:12.5px;opacity:.8}.nsApp .bar{height:9px;border-radius:5px;background:#ffffff14;overflow:hidden;margin:6px 0 2px}.nsApp .bar>i{display:block;height:100%;background:linear-gradient(90deg,#3a86ff,#8ecae6)}
.nsApp .tiers{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:8px 0}.nsApp .tiers div{text-align:center;border-radius:8px;padding:4px 2px;font-size:11.5px;background:#ffffff0d;opacity:.55}.nsApp .tiers div.on{opacity:1;outline:1.5px solid currentColor}
.nsApp .row{background:#ffffff0d;border-radius:10px;padding:7px 9px;margin:5px 0;font-size:13px;line-height:1.5}.nsApp .btns{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
.nsBk{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.nsBk div{background:#ffffff0d;border-radius:10px;padding:6px 3px;text-align:center;font-size:11px;line-height:1.3}.nsBk div b{display:block;font-size:22px}.nsBk .no{opacity:.35}`;document.head.appendChild(css);
window.nsOpen=function(){const M=S&&S.mw,N=M&&M.NS;if(!N||!N.on){if(M&&M.NS&&M.NS.quit)return toast('คุณถอนการติดตั้งระบบไปแล้ว');return nsBook()}const sys=byId(N.id);if(!sys)return toast('โหลดข้อมูลระบบไม่สำเร็จ');const t=lvT(N.lv);
 const P=N.path?sys.P.find(p=>p[0]===N.path):null;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📱 ระบบของคุณ</h3><div class="nsApp">
 <div class="hd"><span class="ic">${sys.ic}</span><div><div class="nm px">${esc(sys.app)}</div><div class="tt">${esc(sys.d)}</div></div></div>
 <div class="tiers">${[0,1,2,3].map(i=>`<div class="${i===t?'on':''}" style="color:${TC[i]}">${TI[i]} ${TN[i]}<br><small>${esc(sys.T[i])}</small></div>`).join('')}</div>
 <div><b>Lv.${N.lv}</b>/10 · ค่าประสบการณ์ ${N.xp}/${XPL}${N.lv>=10?' · 👑 สูงสุดแล้ว':''}<div class="bar"><i style="width:${N.lv>=10?100:N.xp/XPL*100}%"></i></div></div>
 ${sys.meter?`<div class="row">${sys.meter.ic} <b>${esc(sys.meter.n)}</b> ${N.m||0}/${sys.meter.max||100}<div class="bar"><i style="width:${(N.m||0)/(sys.meter.max||100)*100}%;background:${sys.meter.col||'linear-gradient(90deg,#ff8a5a,#ff3a6a)'}"></i></div><small>${esc(sys.meter.d||'')}</small></div>`:''}${N.sk&&N.sk.length?`<div class="row">🌀 <b>สกิล</b><br>${N.sk.map(x=>`「${esc(x[0])}」 <small>→ ${esc(x[1])}</small>`).join('<br>')}</div>`:''}${N.lock>0?`<div class="row">😳 ระบบหยุดให้ค่าประสบการณ์อีก ${N.lock} ปี</div>`:''}${N.wc?'<div class="row">🌍 โลกเปลี่ยนเป็นโลกฮันเตอร์แล้ว ระบบนี้ทำงานเสร็จสิ้น</div>':''}
 ${ready(N)?`<div class="row">🎓 <b>พร้อมสอบเลื่อนขั้น: ${esc(sys.X[t])}</b> — มินิเกมยากขึ้นหนึ่งขั้น ต้องได้ 60%</div>`:''}
 ${P?`<div class="row">🧭 เส้นทาง <b>${esc(P[1])}</b> — ${esc(P[2])}</div>`:t>=1?'<div class="row">🧭 ยังไม่ได้เลือกเส้นทาง (ทางแยกจะมาในปีนี้)</div>':'<div class="row">🧭 ทางแยกของระบบจะมาถึงตอนขึ้นขั้นกลาง</div>'}
 <div class="row">${N.pk?PERK[N.pk][0]+' · '+PERK[N.pk][1]:'🔄 ยังไม่มีความสามารถเสริม (ได้จากการอัปเดตระบบ)'}<br>🔎 เบาะแสผู้สร้าง ${Math.min(4,N.clue)}/4 · 😈 ทางลัด ${N.dark} · 🤍 ใจดี ${N.kind} · ✅ สำเร็จ ${N.wins}${N.ally?' · 🤝 '+esc(N.ally):''}</div>
 <div class="btns">${ready(N)&&S.age-N.ey>=1?`<button class="pbtn" onclick="closeM();nsDo('ex')">🎓 สอบเลื่อนขั้น</button>`:S.age-N.qy>=1&&!N.lost?`<button class="pbtn" onclick="closeM();nsDo('q')">🎯 รับภารกิจปีนี้</button>`:`<button class="gbtn" disabled>🎯 ภารกิจปีนี้ทำแล้ว</button>`}
 <button class="gbtn" onclick="nsBook()">📖 สมุดระบบ</button><button class="gbtn" style="grid-column:1/3;opacity:.8" onclick="nsQuit()">🗑️ ถอนการติดตั้งระบบ</button></div></div>`,'nsys')};
window.nsDo=k=>{const M=S&&S.mw,N=NSo(M);if(!N||choice._cur)return;if(k==='ex'){if(ready(N)&&S.age-N.ey>=1)exam(M)}else if(S.age-N.qy>=1){if(lvT(N.lv)>=1&&!N.path)fork(M);else quest(M)}};
window.nsQuit=function(){const M=S&&S.mw,N=NSo(M);if(!N)return;const sys=byId(N.id);if(!confirm(`ถอนการติดตั้ง ${sys.app}? ค่าที่ได้มาแล้วยังอยู่ แต่ระบบจะไม่กลับมาอีกตลอดชีวิตนี้`))return;closeM();
 N.on=0;N.quit=1;joy(8);prA(M,-15);bookS(sys.id,b=>{b.e.B=1});kAdd(`ถอนการติดตั้ง${sys.app}`);log(`🗑️ <b>คุณกดถอนการติดตั้ง ${esc(sys.app)}</b> ไอคอนสั่นอยู่สามวินาที แล้วหายไป ชีวิตที่เหลือเป็นของคุณเองทั้งหมด`,'myth',true)};
window.nsBook=function(){const b=bookG();const got=SYS.filter(s=>b[s.id]).length;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📖 สมุดระบบ</h3><p class="tag2">ระบบที่เคยได้ ${got}/${SYS.length} · เกิดในยุคปัจจุบัน (โลกปกติ) มีโอกาสได้แอประบบทุกช่วงอายุ ตั้งแต่ 5 ขวบ ปีละราว 2% · ตอนจบ: 👑 สุดทาง · 🗑️ ถอดระบบ · 😈 ด้านมืด · 🗝️ ความลับ</p>
 <div class="nsBk">${SYS.map(s=>{const x=b[s.id];return x?`<div title="${esc(s.app)}"><b>${s.ic}</b>${esc(s.n)}<br><span style="color:${TC[x.t||0]}">${TN[x.t||0]}</span><br>${['A','B','C','S','W'].map(k=>x.e&&x.e[k]?['👑','🗑️','😈','🗝️','🌍'][['A','B','C','S','W'].indexOf(k)]:'').join('')}</div>`:`<div class="no"><b>❔</b>???</div>`}).join('')}</div>`,'nsbook')};
// เมนู
if(typeof openMenu==='function'){const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const M=S&&S.mw;if(M&&M.NS&&isN(M)){const g=$('modal').querySelector('.mgrid'),N=M.NS,sys=byId(N.id);if(g&&sys&&!g.querySelector('.nsM'))g.insertAdjacentHTML('afterbegin',`<button class="opt nsM" onclick="closeM();nsOpen()">${sys.ic} ระบบ: ${esc(sys.n)}<small>${N.on?`${TN[lvT(N.lv)]} · Lv.${N.lv}${ready(N)?' · 🎓 พร้อมสอบ':''}`:'ถอนการติดตั้งแล้ว'}</small></button>`)}}catch(e){}return r}}

// ---------- ตอนจบ ----------
function ending(N){const sys=byId(N.id);if(!sys)return null;const E=sys.E||[];if(N.wc&&E[3])return['W','🌍 ผู้ทำให้โลกเปลี่ยน',E[3]];if(N.endk&&sys.EX&&sys.EX[N.endk])return['C',sys.EX[N.endk][0],sys.EX[N.endk][1]];
 if(N.quit)return['B','🗑️ ถอดระบบ',E[1]];if(N.dark>=4&&N.dark>N.kind)return['C','😈 ด้านมืด',E[2]];if(N.lv>=10)return['A','👑 สุดทาง',E[0]&&typeof E[0]==='object'?(E[0][N.path]||E[0]._):E[0]];
 return['',`${TI[lvT(N.lv)]} ขั้น${TN[lvT(N.lv)]}`,`จากไปตอนเป็น「${sys.T[lvT(N.lv)]}」 ระบบยังมีภารกิจค้างในแอป อีก ${10-N.lv} เลเวลถึงขั้นเทพ`]}
let LASTN=null;
if(typeof endGame==='function'){const _eg=endGame;endGame=function(){try{const M=S&&S.mw;LASTN=M&&M.NS?JSON.parse(JSON.stringify(M.NS)):null;if(LASTN){const e=ending(LASTN);if(e&&e[0])bookS(LASTN.id,b=>{b.e[e[0]]=1;b.t=Math.max(b.t||0,lvT(LASTN.lv))});const sy=byId(LASTN.id);if(sy&&sy.inh&&!LASTN.quit&&Math.random()<sy.inh)LS.set('murim_nsinh',{id:sy.id,n:S.name,lv:LASTN.lv})}}catch(e){}const r=_eg.apply(this,arguments);
 try{if(LASTN)setTimeout(()=>{try{const b=$('end')&&$('end').querySelector('.box.rec');if(!b||b.querySelector('.nsEnd'))return;const sys=byId(LASTN.id),e=ending(LASTN);if(!sys||!e)return;
  const d=document.createElement('div');d.className='nsEnd nsApp';d.style.margin='12px 0';d.innerHTML=`<div class="hd"><span class="ic">${sys.ic}</span><div><div class="nm px">${esc(sys.app)}</div><div class="tt">ตอนจบ: <b>${e[1]}</b> · Lv.${LASTN.lv} 「${esc(sys.T[lvT(LASTN.lv)])}」</div></div></div><div class="row" style="margin-top:8px">${esc(e[2]||'')}</div>${LASTN.og2===1?`<div class="row">🗝️ ${(OG[LASTN.og]||sys.OG||OG.self)[3]}</div>`:''}`;
  const fb=b.querySelector('.fateBox')||b.querySelector('.mtNext');if(fb)fb.before(d);else b.appendChild(d)}catch(e){console.error('nsys end',e)}},80)}catch(e){}return r}}
window._nsys={SYS,offer,quest,exam,fork,twist,shared,grind,nsNew,ending,lvT,ready,DIFF,mg,meter,full,byId};
// ข้อมูลระบบ 4 ไฟล์
['nsys1','nsys2','nsys3','nsys4','nsys5'].forEach(n=>{try{wLoad(n).catch(()=>setTimeout(()=>wLoad(n).catch(()=>{}),5000))}catch(e){}});
})();
try{wReady('nsys')}catch(e){}
