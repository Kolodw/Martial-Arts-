// ============================================================
// /w/wsys.js — 📟 ระบบประจำโลก (world systems) · โหลดจาก BLOCK 137 ใน app.js
// 6 ระบบ: 📖 ระบบเล่าเรื่อง (ยุทธภพ) · ⭐ ระบบรีวิวดาว (ยุคปัจจุบัน) · 🛒 ร้านค้าวันสิ้นโลก (ซอมบี้)
//         👻 เจ้ากรรมนายเวร (ผีไทย) · 📺 ระบบสปอนเซอร์ (ฮันเตอร์) · 🤖 AI รุ่นทดลอง (ทะลุฟ้าดารา)
// กลไกกลาง: 🕳️ ระบบโกหกได้ (บางคำสั่งเป็นกับดัก มีรอยกลิตช์ให้สังเกต) · ⚔️ ผู้ถือระบบคู่แข่ง
// สถานะ: S.wsy = {id, lv, pts, y0, ...ค่าของแต่ละระบบ, rv:{คู่แข่ง}, tr:{กับดักที่จับได้/โดน}}
// ============================================================
(()=>{
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pk=a=>a[Math.floor(Math.random()*a.length)];
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc2=t=>{try{return esc(t)}catch(e){return String(t)}};
const free=()=>!(choice._cur||modalOpen)&&!(typeof DU!=='undefined'&&DU)&&!document.getElementById('wsHolo')&&!document.getElementById('sysPop');
const wOfM=M=>!M?'normal':M.hw>0?'hunter':(M.wx&&M.wx.on?M.wx.id:'normal');
const where=()=>{if(!S)return'';if(S.mw){if(S.mw.sky)return'sky';return'm_'+wOfM(S.mw)}if(S.beastMode&&!S.beastMode.human)return'beast';if(S.ch==='soul')return'soul';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
const cash=v=>Math.round(v*(S&&S.mw?400:1));
const cur=()=>S&&S.mw?'บาท':S&&S.xian?'หินวิญญาณ':'ตำลึง';
const money=v=>{S.money=Math.max(0,(S.money||0)+v);return v};
const hp=p=>{S.hp=cl(Math.round(S.hp+S.maxHp*p),1,S.maxHp)};
const pw=p=>{const g=Math.max(1,Math.round((S.power||0)*p));S.power=(S.power||0)+g;return g};
const W=()=>S&&S.wsy;
const L=(t,c,big)=>{try{log(t,c||'',big)}catch(e){}};

// ---------------------------------------------------------------- UI
const css=`
#modal[data-k="wsys"]{background:transparent!important;box-shadow:none!important;border:0!important;padding:0!important;overflow:visible!important}
.wsP{--a:#7cf;--b:#c7f;--c:#fff;position:relative;border-radius:18px;padding:2px;background:conic-gradient(from var(--ang,0deg),var(--a),var(--b),var(--c),var(--a));animation:wsSpin 4s linear infinite,wsIn .42s cubic-bezier(.2,1.4,.4,1);box-shadow:0 0 28px color-mix(in srgb,var(--a) 55%,transparent),0 0 70px color-mix(in srgb,var(--b) 30%,transparent)}
@property --ang{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes wsSpin{to{--ang:360deg}}@keyframes wsIn{from{transform:scale(.82) translateY(14px);opacity:0;filter:blur(6px)}to{transform:none;opacity:1;filter:none}}
.wsIn2{position:relative;border-radius:16px;padding:14px 14px 12px;background:linear-gradient(160deg,rgba(10,14,30,.96),rgba(22,10,40,.96));overflow:hidden;color:#eef}
.wsIn2:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 3px);pointer-events:none;animation:wsScan 6s linear infinite}
@keyframes wsScan{to{background-position:0 60px}}
.wsHd{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.wsIc{font-size:30px;width:46px;height:46px;display:grid;place-items:center;border-radius:13px;background:radial-gradient(circle at 30% 30%,color-mix(in srgb,var(--a) 70%,#fff),color-mix(in srgb,var(--b) 60%,#000));box-shadow:0 0 16px var(--a);animation:wsPulse 2.2s ease-in-out infinite}
@keyframes wsPulse{50%{transform:scale(1.07);box-shadow:0 0 26px var(--b)}}
.wsT{font-weight:800;font-size:16px;color:var(--c);text-shadow:0 0 10px var(--a),0 0 22px color-mix(in srgb,var(--b) 60%,transparent);letter-spacing:.3px}
#mask.on #modal[data-k="wsys"]~#mFloat,body.hk-wsys #mFloat{display:none!important}
.wsX{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.1)!important;opacity:.85!important}
.wsS{font-size:11.5px;opacity:.75;font-family:ui-monospace,monospace}
.wsB{font-size:14px;line-height:1.6;margin:6px 0 10px;position:relative}
.wsB b{color:var(--c)}
.wsBar{height:8px;border-radius:9px;background:rgba(255,255,255,.08);overflow:hidden;margin:4px 0 8px}.wsBar>i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,var(--a),var(--b));box-shadow:0 0 10px var(--a)}
.wsSt{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.wsSt span{font-size:12px;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid color-mix(in srgb,var(--a) 40%,transparent)}
.wsO{display:block;width:100%;text-align:left;margin:6px 0 0;padding:9px 12px;border-radius:12px;border:1px solid color-mix(in srgb,var(--o,#7cf) 65%,transparent);background:linear-gradient(90deg,color-mix(in srgb,var(--o,#7cf) 24%,transparent),rgba(255,255,255,.03));color:#fff;font:inherit;font-size:14px;cursor:pointer;transition:transform .12s,box-shadow .12s}
.wsO:hover,.wsO:active{transform:translateX(3px);box-shadow:0 0 14px color-mix(in srgb,var(--o,#7cf) 60%,transparent)}
.wsO small{display:block;opacity:.72;font-size:11.5px;margin-top:2px}
.wsO[disabled]{opacity:.4;pointer-events:none}
.wsG{animation:wsGl 2.6s infinite steps(1)}@keyframes wsGl{0%,92%,100%{text-shadow:none;transform:none}93%{text-shadow:2px 0 #f0f,-2px 0 #0ff;transform:translateX(1px)}96%{text-shadow:-2px 0 #f0f,2px 0 #0ff;transform:translateX(-1px)}}
.wsMem{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0}.wsMem span{font-size:12px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,.08)}.wsMem s{opacity:.45}
.wsX{position:absolute;top:8px;right:10px;background:none;border:0;color:#fff;opacity:.6;font-size:16px;cursor:pointer;z-index:2}

#sysPop.wsGP .spw{animation:spOpen .55s cubic-bezier(.2,.9,.3,1.2) forwards,wsGB 3.2s .6s infinite steps(1)}
@keyframes wsGB{0%,88%,100%{transform:none;filter:none}89%{transform:translateX(-4px) skewX(6deg);filter:hue-rotate(40deg)}91%{transform:translateX(5px);filter:none}93%{transform:translateX(-2px) skewX(-4deg)}95%{transform:none}}
#sysPop.wsGP .wsGl2{animation:spLine .3s forwards,wsGl 1.4s infinite steps(1)}
#sysPop.wsGP .sphd.wsGl2{animation:wsGl 1.4s infinite steps(1)}
`;
try{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}catch(e){}
const TH={story:['#ffcf5a','#ff6a3d','#fff3c4'],star:['#ffe066','#ff7ad9','#fff'],shop:['#7cff6b','#ffb02e','#eaffd0'],ghost:['#9b8cff','#40e0d0','#e7e3ff'],spon:['#ff4d6d','#4dd2ff','#ffe1ea'],ai:['#00f0ff','#b14dff','#e0fbff'],rival:['#ff3b3b','#ffd23b','#fff'],trap:['#ff00c8','#00ffd5','#fff']};
let H={};
window._wsH=(i)=>{const f=H[i];H={};try{closeM()}catch(e){}if(f)try{f()}catch(e){console.error('wsys',e)}};
function pop(th,o){const t=TH[th]||TH.ai;H={};const op=(o.opts||[]).map((x,i)=>{H[i]=x.f;return`<button class="wsO" style="--o:${x.c||t[i%2]}" ${x.dis?'disabled':''} onclick="_wsH(${i})">${x.t}${x.s?`<small>${x.s}</small>`:''}</button>`}).join('');
 modal(`<div class="wsP" style="--a:${t[0]};--b:${t[1]};--c:${t[2]}"><div class="wsIn2">${o.x?'<button class="wsX" onclick="closeM()">✕</button>':''}<div class="wsHd"><div class="wsIc">${o.ic||'📟'}</div><div><div class="wsT${o.gl?' wsG':''}">${o.t}</div><div class="wsS">${o.s||''}</div></div></div>${o.top||''}<div class="wsB${o.gl?' wsG':''}">${o.b||''}</div>${op}</div></div>`,'wsys');
 // โหมด "ให้ชะตาเล่นแทนทั้งหมด": ออโต้กดให้เอง ไม่ค้างรอ
 try{if(typeof auto!=='undefined'&&auto&&LS.get('murim_fa',0)){const me=H;setTimeout(()=>{try{const m=document.getElementById('modal');if(!auto||!modalOpen||!m||m.dataset.k!=='wsys'||H!==me)return;const ks=Object.keys(H).filter(i=>!((o.opts||[])[i]||{}).dis);if(!ks.length){closeM();return}const i=ks[Math.random()*ks.length|0],x=(o.opts||[])[i]||{};try{addFeed('ev',`🎲 ชะตาเลือกแทน — <b>${String(o.t||'').replace(/<[^>]+>/g,'')}</b>: ${String(x.t||'').replace(/<[^>]+>/g,'')}`,'sum')}catch(e){}_wsH(i)}catch(e){}},1600)}}catch(e){}}
// รอจอว่างแล้วค่อยเด้ง (กันทับเหตุการณ์อื่น)
function ask(th,o){let n=0;const me=S;const go=()=>{if(S!==me||!S||!S.alive)return;if(!free()){if(++n<60)setTimeout(go,900);return}pop(th,o)};setTimeout(go,700)}

// ---------------------------------------------------------------- ระบบ
const SYS={};
// 🕳️ ระบบโกหกได้: ทุกระบบมีโอกาสส่ง "คำสั่ง" ที่เป็นกับดัก · หน้าต่างกับดักกระตุก (กลิตช์) ให้สังเกต · ตรวจสอบได้ด้วยแต้ม
function lieRoll(){const w=W();return Math.random()<(w.id==='ai'&&w.pers==='para'?.3:.16)}
function trapOrReal(th,base,real,trap){const w=W(),lie=lieRoll();
 const opts=[{t:'✅ ทำตามคำสั่ง',s:base.okS||'',c:'#4dff9a',f:()=>{if(lie){w.tr=w.tr||{c:0,h:0};w.tr.h++;trap()}else real()}},
  {t:`🔍 ตรวจสอบคำสั่ง (ใช้ 1 แต้มระบบ · มี ${w.pts|0})`,s:'ระบบอาจกำลังโกหก',c:'#ffd23b',dis:(w.pts|0)<1,f:()=>{w.pts--;if(lie){w.tr=w.tr||{c:0,h:0};w.tr.c++;w.pts+=3;pop('trap',{ic:'🕳️',t:'จับได้! คำสั่งปลอม',s:'ERR · instruction checksum mismatch',gl:1,b:`ระบบหยุดนิ่งไปสามวินาที แล้วพิมพ์ว่า <b>"ขออภัย มีข้อผิดพลาด"</b> — มันรู้ว่าคุณรู้แล้ว<br><span class="tag2">ได้แต้มระบบคืน +3 · จับโกหกได้ ${w.tr.c} ครั้ง</span>`,opts:[{t:'😏 จำไว้',f:()=>{}}]})}else{L(`🔍 ตรวจแล้ว คำสั่งนี้ของจริง`,'');real()}}},
  {t:'🙅 ไม่ทำ',s:base.noS||'',c:'#ff6b6b',f:()=>{w.mood=(w.mood||0)-1;L(`${base.ic||'📟'} คุณปิดหน้าต่างระบบ มันกระพริบแดงอยู่ครู่หนึ่ง`,'')}}];
 ask(th,{ic:base.ic,t:base.t,s:base.s,b:base.b,gl:lie&&Math.random()<.75,top:base.top,opts})}

// ===== 📖 ระบบเล่าเรื่อง (ยุทธภพ) =====
SYS.story={ic:'📖',n:'ระบบเล่าเรื่อง',th:'story',w:['murim'],
 intro:'เสียงหนึ่งดังขึ้นในหัว เหมือนคนกำลังเปิดหน้าหนังสือ <b>"สวัสดี ตัวเอก ข้าคือคนเล่าเรื่องของเจ้า"</b> มันบอกว่าผู้อ่านหลายพันคนกำลังติดตามชีวิตคุณ ถ้าชีวิตคุณน่าเบื่อ คนอ่านจะเลิกอ่าน และเมื่อไม่มีใครอ่าน ตัวเอกก็ไม่จำเป็นอีกต่อไป',
 init:w=>{w.fun=60;w.rd=1000;w.arc=0},
 top:w=>`<div class="wsS">ความสนุกของบท ${w.fun|0}/100 · ผู้อ่าน ${fmt(w.rd|0)} คน</div><div class="wsBar"><i style="width:${cl(w.fun,0,100)}%"></i></div>`,
 yr:w=>{w.fun=cl((w.fun||50)-14+(S.age-(w.la||S.age))*0,0,100);w.rd=Math.max(0,Math.round((w.rd||0)*(w.fun>=70?1.25:w.fun>=40?1.02:.8)));
  if(w.fun>=70){w.pts=(w.pts||0)+1}
  if(w.fun<30)return storyTwist(w);
  if(Math.random()<.45)return storyBeat(w)}};
function storyTwist(w){const T=[
 ['🗡️ บทนี้ต้องมีคนตาย','"ผู้อ่านเบื่อแล้ว" คนเล่าเรื่องพิมพ์ "ข้าจะส่งมือสังหารมาคืนนี้ เจ้าจะเขียนต่อเองหรือให้ข้าเขียน"',[
   {t:'⚔️ สู้กับมือสังหาร',s:'ดวล · ชนะ = ความสนุกพุ่ง',f:()=>{const ok=fight('มือสังหารที่คนเล่าเรื่องส่งมา',Math.round(total()*1.05));if(ok){w.fun=95;pw(.06);L('📖 คุณฆ่ามือสังหารในห้องมืด ผู้อ่านพิมพ์คอมเมนต์รัวๆ "พีคมาก"','epic')}else{hp(-.45);w.fun=70;L('📖 คุณรอดมาได้ด้วยแผลยาวทั้งหลัง คนอ่านชอบตัวเอกที่เจ็บ','bad')}}},
   {t:'✍️ เขียนเอง: ให้ศัตรูเก่ากลับมา',s:'ความสนุก + · ศัตรูถาวร',f:()=>{w.fun=80;w.foe=anyName('ชาย');L(`📖 ${esc2(w.foe)} ศิษย์พี่ที่คุณเคยทำให้ขายหน้ากลับมาพร้อมดาบเล่มใหม่ เขาสาบานว่าจะเอาคืนในสิบปี`,'epic')}},
   {t:'🙅 ชีวิตข้า ข้าไม่ให้ใครเขียน',s:'ระบบโกรธ · ผู้อ่านลดฮวบ',f:()=>{w.rd=Math.round(w.rd*.4);w.fun=40;w.rb=(w.rb||0)+1;L('📖 คุณฉีกหน้ากระดาษในหัวทิ้ง ความเงียบตามมานานจนคุณได้ยินเสียงหัวใจตัวเอง','')}}]],
 ['💔 บทนี้ต้องมีคนทรยศ','"เพื่อนสนิทของเจ้า" คนเล่าเรื่องเว้นวรรค "ข้ายังไม่ได้ตัดสินใจว่าจะให้เขาทรยศหรือไม่ เจ้าช่วยข้าเลือกสิ"',[
   {t:'🔪 ให้เพื่อนทรยศ แต่ข้ารู้ก่อน',s:'ความสนุก + · ได้ของจากแผนซ้อนแผน',f:()=>{w.fun=85;money(cash(R(60,200)));L('📖 คุณปล่อยให้เพื่อนวางยาในเหล้า แล้วสลับจอกตอนเขาหันไป ทรัพย์ที่เขาขโมยมาตกเป็นของคุณ','epic')}},
   {t:'🤝 ให้เพื่อนยังภักดี แลกกับข้าเจ็บแทน',s:'พลังชีวิต −30%',f:()=>{hp(-.3);w.fun=65;S.karma=(S.karma||0)+8;L('📖 คนเล่าเรื่องให้คุณรับดาบแทนเพื่อน ผู้อ่านร้องไห้ทั้งคอมเมนต์','good')}},
   {t:'🎲 ปล่อยให้คนเล่าเรื่องเลือกเอง',s:'สุ่ม',f:()=>{if(Math.random()<.5){w.fun=90;money(-Math.round((S.money||0)*.4));L('📖 เพื่อนหนีไปพร้อมเงินครึ่งหนึ่งของคุณ บทนี้คนอ่านเยอะที่สุดในรอบปี','bad')}else{w.fun=75;S.cha=(S.cha||0)+3;L('📖 เพื่อนยังอยู่ แต่ตอนนี้เขาเริ่มได้ยินเสียงคนเล่าเรื่องด้วย','')}}}]],
 ['🌸 บทนี้ต้องมีความรัก','"ผู้อ่านอยากเห็นเจ้าหน้าแดง" — ข้างหน้าคุณมีผู้หญิงถือร่มสีชมพูเดินมา เธอสะดุดหินก้อนที่ไม่ได้อยู่ตรงนั้นเมื่อครู่',[
   {t:'💞 รับเธอไว้',s:'อาจได้คู่ชีวิต',f:()=>{w.fun=80;const n=anyName('หญิง');if(!S.spouse){try{S.spouse=n}catch(e){}L(`📖 <b>${esc2(n)}</b> ล้มลงในอ้อมแขนคุณพอดี เธอบอกว่ารู้สึกเหมือนมีคนผลักหลัง`,'epic')}else L(`📖 คุณรับเธอไว้ แต่บอกว่ามีคนรออยู่ที่บ้านแล้ว ผู้อ่านครึ่งหนึ่งโกรธ อีกครึ่งชอบ`,'')}},
   {t:'🪨 เตะหินออกก่อนเธอสะดุด',s:'ทำลายบท',f:()=>{w.fun=45;w.rb=(w.rb||0)+1;S.int=(S.int||0)+2;L('📖 เธอเดินผ่านไปโดยไม่สะดุด คนเล่าเรื่องพิมพ์ "…" ยาวสามบรรทัด','')}}]]];
 const p=pk(T);ask('story',{ic:'📖',t:p[0],s:`บทที่ ${++w.arc} · ความสนุกต่ำเกินไป`,top:SYS.story.top(w),b:p[1],opts:p[2]})}
function storyBeat(w){if(w.foe&&S.age>=(w.y0+10)&&!w.foeD){w.foeD=1;return ask('story',{ic:'📖',t:`⚔️ ${esc2(w.foe)} กลับมาตามสัญญา`,s:'จุดไคลแมกซ์',top:SYS.story.top(w),b:`สิบปีผ่านไป ${esc2(w.foe)} ยืนอยู่บนหลังคาตรงข้ามบ้าน ผู้อ่านทุกคนรอบทนี้`,opts:[{t:'⚔️ ดวลบนหลังคา',f:()=>{duel(w.foe,Math.round(total()*1.15),win=>{w.fun=100;if(win){pw(.1);S.fame=(S.fame||0)+80;L('📖 ผู้อ่านพุ่งขึ้นสามเท่าในคืนเดียว','myth',true)}else{hp(-.5);L('📖 คุณแพ้ แต่คนอ่านบอกว่านี่คือบทที่ดีที่สุด','bad')}})}},{t:'🍶 ชวนดื่มเหล้าคุยกัน',f:()=>{w.fun=70;S.karma=(S.karma||0)+10;L(`📖 คุณกับ${esc2(w.foe)}ดื่มกันจนเช้า คนเล่าเรื่องไม่ได้เขียนบทนี้ แต่คนอ่านชอบ`,'good')}}]})}
 trapOrReal('story',{ic:'📖',t:'📜 คำแนะนำจากคนเล่าเรื่อง',s:`ผู้อ่าน ${fmt(w.rd|0)} · แต้มระบบ ${w.pts|0}`,top:SYS.story.top(w),b:pk(['"บทต่อไป ไปที่ถ้ำทางทิศเหนือ มีของรออยู่"','"คืนนี้ไปงานเลี้ยงที่จวนเจ้าเมือง แล้วท้าดวลคนที่นั่งหัวโต๊ะ"','"ขโมยตำราจากหอคัมภีร์สำนัก คนอ่านชอบตัวเอกเกเร"']),okS:'ความสนุก +25'},
  ()=>{w.fun=cl(w.fun+25,0,100);pw(.04);money(cash(R(20,80)));L('📖 คำแนะนำเป็นของจริง คุณได้ทั้งของและบทที่สนุก','good')},
  ()=>{w.fun=cl(w.fun+10,0,100);hp(-.3);L('📖 มันคือกับดัก คนเล่าเรื่องอยากเห็นคุณเจ็บ เพราะบทเจ็บๆ คนอ่านเยอะ','bad')})}

// ===== ⭐ ระบบรีวิวดาว (ยุคปัจจุบันทุกโลกที่ไม่มีระบบเฉพาะ) =====
SYS.star={ic:'⭐',n:'ระบบรีวิวดาว',th:'star',w:['m_normal','m_loop','m_tower','m_game','m_under','m_gatewon'],
 intro:'ตื่นมาเช้าวันหนึ่ง เหนือหัวทุกคนมีดาวลอยอยู่ และเหนือหัวคุณก็มี <b>⭐ 3.0</b> แจ้งเตือนเด้งขึ้นมา "คนที่คุณเจอวันนี้จะให้คะแนนคุณ ดาวเฉลี่ยคือพลังของคุณ"',
 init:w=>{w.st=3;w.n=10;w.me=70},
 top:w=>`<div class="wsSt"><span>⭐ ${(+w.st).toFixed(2)} (${w.n} รีวิว)</span><span>🫀 ความเป็นตัวเอง ${w.me|0}/100</span></div>`,
 yr:w=>{const bonus=Math.round(cash(10)*(w.st-3)*4);if(bonus)money(bonus);S.fame=(S.fame||0)+Math.round((w.st-3)*6);
  if(w.me<=15&&!w.burn){w.burn=1;return ask('star',{ic:'⭐',t:'🫥 คุณจำไม่ได้ว่าชอบอะไร',s:'ความเป็นตัวเองต่ำมาก',top:SYS.star.top(w),b:'ทุกคนรักคุณ ดาวแทบเต็มห้า แต่เช้านี้ส่องกระจกแล้วคุณนึกไม่ออกว่าตัวเองชอบกินอะไร',opts:[{t:'🔕 ปิดดาวเหนือหัว 1 ปี',s:'ดาวกลับไป 3.0 · ตัวเองฟื้น',c:'#9bf',f:()=>{w.st=3;w.n=10;w.me=60;w.burn=0;L('⭐ คุณใช้ชีวิตปีหนึ่งแบบไม่มีใครให้คะแนน ไปเที่ยวคนเดียวแล้วร้องไห้ที่ทะเล','good')}},{t:'⭐ ไม่เป็นไร ดาวสำคัญกว่า',s:'อันตราย',c:'#f7a',f:()=>{S.maxHp=Math.max(30,Math.round(S.maxHp*.9));L('⭐ คุณยิ้มให้กระจก แต่กระจกไม่ยิ้มตาม','bad')}}]})}
  if(Math.random()<.55)return starReview(w)}};
const STARQ=[
 ['☕ ลูกค้าเรื่องมาก','ลูกค้าตะโกนว่ากาแฟหวานไป ทั้งที่สั่งหวานปกติ คนทั้งร้านมอง',[['ขอโทษ ทำใหม่ให้ฟรี',.35,-6],['บอกตรงๆ ว่าเขาสั่งเอง',-.2,6],['ทำแก้วใหม่แต่ใส่น้ำตาลเพิ่มสองเท่า',.05,3]]],
 ['💸 เพื่อนขอยืมเงิน','เพื่อนสนิทขอยืมเงินครั้งที่สามของปี ครั้งก่อนยังไม่คืน',[['ให้ยืม',.25,-8,()=>money(-cash(20))],['ปฏิเสธตรงๆ',-.3,8],['ให้ แต่บอกว่าครั้งสุดท้าย',.1,0,()=>money(-cash(20))]]],
 ['🕘 หัวหน้าขอ OT วันเกิด','หัวหน้าขอให้อยู่ต่อทำงานคืนนี้ ซึ่งเป็นคืนวันเกิดของคุณ',[['อยู่ทำ',.3,-10,()=>money(cash(15))],['ปฏิเสธ ไปฉลอง',-.15,10],['อยู่ แต่ไลฟ์บ่นลงโซเชียล',.0,2,()=>{S.fame=(S.fame||0)+10}]]],
 ['📱 คลิปไวรัล','มีคนถ่ายคลิปคุณช่วยแมวติดต้นไม้ คนแชร์ห้าหมื่นครั้ง แต่คุณช่วยเพราะแมวเป็นของตัวเอง',[['ยอมรับว่าเป็นแมวตัวเอง',-.1,8],['ปล่อยให้คนเข้าใจว่าเป็นฮีโร่',.4,-8,()=>{S.fame=(S.fame||0)+30}]]],
 ['🍜 ร้านเพื่อนบ้าน','ร้านก๋วยเตี๋ยวข้างบ้านขอให้รีวิวห้าดาว ทั้งที่ไม่อร่อย',[['ให้ห้าดาว',.2,-6],['รีวิวตามจริง',-.25,7],['ไม่รีวิว แต่ไปสอนสูตรน้ำซุปให้',.15,5]]]];
function starReview(w){const q=pk(STARQ);const opts=q[2].map(o=>({t:o[0],s:`${o[1]>0?'⭐ +':o[1]<0?'⭐ ':'⭐ ±'}${o[1]?Math.abs(o[1]).toFixed(2):'0'} · ตัวตน ${o[2]>0?'+':''}${o[2]}`,c:o[1]>0?'#ffd23b':o[1]<0?'#7aa8ff':'#c9a6ff',f:()=>{w.st=cl(w.st+o[1]*(1+Math.random()*.4),1,5);w.n+=R(3,40);w.me=cl(w.me+o[2],0,100);if(o[3])o[3]();L(`⭐ คะแนนของคุณตอนนี้ ${(+w.st).toFixed(2)} ดาว`,'')}}));
 ask('star',{ic:'⭐',t:q[0],s:'รีวิวใหม่กำลังเข้ามา…',top:SYS.star.top(w),b:q[1],opts})}

// ===== 🛒 ร้านค้าวันสิ้นโลก (ซอมบี้ · วันสิ้นโลก) จ่ายด้วยความทรงจำ =====
SYS.shop={ic:'🛒',n:'ร้านค้าวันสิ้นโลก',th:'shop',w:['m_zombie','m_doom'],
 intro:'ตู้กดน้ำร้างหน้าร้านสะดวกซื้อสว่างขึ้นมาเอง หน้าจอขึ้นว่า <b>"ยินดีต้อนรับ ร้านเปิด 24 ชั่วโมง รับชำระด้วยความทรงจำเท่านั้น"</b> ข้างในมีปืน ยา อาหาร และของที่ไม่ควรมีในตู้กดน้ำ',
 init:w=>{w.mem=memList();w.lost=[]},
 top:w=>`<div class="wsS">ความทรงจำที่เหลือ</div><div class="wsMem">${w.mem.map(m=>`<span>${esc2(m)}</span>`).join('')}${w.lost.map(m=>`<span><s>${esc2(m)}</s></span>`).join('')}</div>`,
 yr:w=>{if(!w.mem.length)return;if(Math.random()<.5)return shopOpen(w,1)}};
function memList(){const L0=[];try{(S.parents||[]).forEach(p=>{if(p&&p.n)L0.push(`หน้า${p.role||'พ่อแม่'} (${p.n})`)})}catch(e){}if(S.spouse&&S.spouse.n)L0.push(`วันแต่งงานกับ ${S.spouse.n}`);
 L0.push('กลิ่นข้าวที่แม่หุง','ชื่อเพื่อนสนิทตอนเด็ก','บ้านหลังแรก','เพลงที่ชอบที่สุด','วันที่ฝนตกครั้งสุดท้ายก่อนโลกพัง','ชื่อของตัวเอง');return L0.slice(0,8)}
const SHOPI=[['🔫','ปืนพกกับกระสุน 200 นัด',w=>{const Z=S.mw&&S.mw.Z;if(Z)Z.surv=(Z.surv||0)+15;pw(.08)},'ทักษะรอด +15 · พลัง +8%'],
 ['💊','ยาปฏิชีวนะหนึ่งลัง',w=>{const Z=S.mw&&S.mw.Z;if(Z)Z.inf=Math.max(0,(Z.inf||0)-30);hp(.5)},'เสี่ยงติดเชื้อ −30 · ฟื้น 50%'],
 ['🥫','อาหารกระป๋อง 6 เดือน',w=>{const Z=S.mw&&S.mw.Z;if(Z)Z.sup=(Z.sup||0)+40;hp(.2)},'เสบียง +40'],
 ['🧱','กำแพงสำเร็จรูป',w=>{const Z=S.mw&&S.mw.Z;if(Z){Z.b8=Z.b8||{wall:0,farm:0,radio:0,clinic:0};Z.b8.wall=Math.min(3,(Z.b8.wall||0)+1)}},'กำแพงฐาน +1 ขั้น'],
 ['🚙','รถกระบะติดเกราะ',w=>{money(cash(150));const Z=S.mw&&S.mw.Z;if(Z)Z.surv=(Z.surv||0)+8},'หนีได้เร็ว ขนของขายได้เงิน'],
 ['🧬','วัคซีนที่ยังไม่มีใครทดลอง',w=>{if(Math.random()<.6){S.maxHp=Math.round(S.maxHp*1.3);L('🧬 ร่างกายร้อนเหมือนไฟ แล้วแข็งแรงกว่าเดิม','good')}else{S.maxHp=Math.round(S.maxHp*.8);L('🧬 ไข้ขึ้นเจ็ดวัน ร่างกายไม่เหมือนเดิมอีกเลย','bad')}},'เสี่ยง: พลังชีวิตสูงสุด ±']];
function shopOpen(w,auto){if(!w.mem.length){return pop('shop',{ic:'🛒',t:'ร้านค้าวันสิ้นโลก',s:'ไม่มีอะไรจะจ่ายแล้ว',x:1,top:SYS.shop.top(w),b:'ตู้กดน้ำสแกนหัวคุณแล้วขึ้นว่า <b>"ยอดคงเหลือ: 0"</b> คุณยืนมองของในตู้ แต่จำไม่ได้แล้วว่าทำไมอยากได้มัน',opts:[{t:'🚶 เดินจากไป',f:()=>{}}]})}
 const items=[];const pool=SHOPI.slice();while(items.length<3&&pool.length)items.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
 const pay=w.mem[0];const lie=Math.random()<.14;
 const o={ic:'🛒',t:'ร้านค้าวันสิ้นโลก',s:`รอบนี้ราคาเท่ากัน: 1 ความทรงจำ · ระบบเลือกให้: "${esc2(pay)}"`,x:!auto,top:SYS.shop.top(w),b:auto?'ตู้กดน้ำสว่างขึ้นอีกครั้งตอนตีสาม ของในตู้เปลี่ยนไปแล้ว':'ตู้กดน้ำรอให้คุณเลือก',
  opts:items.map(it=>({t:`${it[0]} ${it[1]}`,s:it[3]+(lie&&it===items[0]?' · ✨ ลดพิเศษ!':''),c:'#7cff6b',f:()=>{w.mem.shift();w.lost.push(pay);
   if(lie&&it===items[0]){w.tr=w.tr||{c:0,h:0};w.tr.h++;L(`🛒 ของที่ได้ออกมาเป็นกล่องเปล่า ความทรงจำเรื่อง "${esc2(pay)}" หายไปแล้ว — ตู้กดน้ำโกงคุณ`,'bad');return}
   it[2](w);L(`🛒 คุณจ่ายด้วยความทรงจำเรื่อง <b>"${esc2(pay)}"</b> ได้ ${it[0]} ${it[1]} · พยายามนึกถึงมันอีกที ในหัวมีแต่ความว่าง`,'');
   if(/ชื่อของตัวเอง/.test(pay)){S.flags=S.flags||{};S.flags.noName=1;S.int=Math.max(0,(S.int||0)-3);L('🛒 มีคนเรียกคุณ คุณไม่หันไป เพราะจำไม่ได้ว่าชื่อนั้นคือคุณ','bad',true)}
   if(/^หน้า/.test(pay))try{(S.parents||[]).forEach(p=>{if(pay.includes(p.n))p.forgot=1})}catch(e){}}})).concat([{t:'🙅 ไม่ซื้อ',c:'#888',f:()=>{}}])};
 auto?ask('shop',o):pop('shop',o)}

// ===== 👻 เจ้ากรรมนายเวร (ผีไทย) =====
const GST=[
 {n:'แม่นาค',hook:'หญิงสาวที่ตายทั้งกลม รอผัวกลับจากศึกมาสองร้อยปี',d:['คืนเรือนหอให้เธอ — บ้านเก่าริมคลองถูกขายให้นายทุน','หาหวีงาช้างที่ฝังไว้ใต้ต้นตะเคียน','บอกความจริงกับลูกหลานผัวเธอว่าเขาไม่ได้ทิ้งเธอ','ทำบุญร้อยวันที่วัดที่เธอเคยตักบาตร','พาเธอไปส่งที่ท่าน้ำ ที่ที่เธอยืนรอทุกคืน']},
 {n:'ไอ้ขวัญ',hook:'คนเลี้ยงควายที่ถูกยิงตายเพราะเห็นอะไรที่ไม่ควรเห็น',d:['หาปลอกกระสุนในทุ่งนาร้าง','ไปฟังพระเทศน์แทนเขาเจ็ดวัน','บอกตำรวจชื่อคนยิง ทั้งที่เขาเป็นผู้ใหญ่บ้านแล้ว','ซื้อควายตัวหนึ่งคืนให้ครอบครัวเขา','จุดธูปที่ต้นมะขามที่เขาถูกฝัง']},
 {n:'เด็กหญิงในตุ่ม',hook:'เด็กที่ซ่อนตัวในตุ่มน้ำตอนบ้านไฟไหม้ แล้วไม่มีใครเปิดฝา',d:['หาตุ๊กตาไม้ที่เธอกอดอยู่','เล่นซ่อนหาให้เธอชนะสักครั้ง','บอกแม่ของเธอ (ที่ยังมีชีวิต อายุแปดสิบ) ว่าเธอไม่โกรธ','ทุบตุ่มใบนั้นทิ้ง','พาเธอไปดูทะเลที่เธอไม่เคยเห็น']}];
SYS.ghost={ic:'👻',n:'ระบบเจ้ากรรมนายเวร',th:'ghost',w:['m_ghost'],
 intro:'ผีที่ตามคุณมาตั้งแต่เด็กยืนอยู่ปลายเตียง คราวนี้มีหน้าต่างเรืองแสงลอยข้างตัวมัน <b>"ระบบเจ้ากรรมนายเวร เริ่มทำงาน"</b> — มันคือระบบ และระบบก็คือมัน หนี้กรรมห้าข้อจากชาติก่อนรอให้คุณชดใช้',
 init:w=>{w.g=R(0,GST.length-1);w.dbt=0;w.ang=0},
 top:w=>{const g=GST[w.g];return`<div class="wsSt"><span>👻 ${g.n}</span><span>หนี้ที่ชดใช้ ${w.dbt}/5</span><span>ความแค้น ${w.ang|0}</span></div><div class="wsBar"><i style="width:${w.dbt*20}%"></i></div>`},
 yr:w=>{if(w.free)return;const g=GST[w.g];if(w.dbt>=5)return ghostEnd(w);w.ang=cl((w.ang||0)+6,0,100);if(w.ang>=60&&Math.random()<.5){hp(-.15);L(`👻 ${g.n}ยืนจ้องคุณทั้งคืน ความแค้นที่ยังไม่ได้ชดใช้ทำให้คุณป่วย`,'bad')}if(Math.random()<.6)return ghostDebt(w)}};
function ghostDebt(w){const g=GST[w.g],d=g.d[w.dbt];
 ask('ghost',{ic:'👻',t:`หนี้กรรมข้อที่ ${w.dbt+1}`,s:`${g.n} — ${g.hook}`,top:SYS.ghost.top(w),b:`"${esc2(d)}"`,opts:[
  {t:'🙏 ทำด้วยตัวเอง',s:'ชดใช้ · ใช้เวลาและพลังชีวิต',c:'#9b8cff',f:()=>{w.dbt++;w.ang=Math.max(0,w.ang-25);hp(-.12);S.karma=(S.karma||0)+6;w.pts=(w.pts||0)+1;L(`👻 ${esc2(d)} — สำเร็จ ${g.n}ยิ้มให้คุณเป็นครั้งแรก`,'good')}},
  {t:'💰 จ้างคนทำแทน',s:'เสียเงิน · ผีอาจไม่ยอมรับ',c:'#40e0d0',f:()=>{money(-cash(40));if(Math.random()<.55){w.dbt++;w.ang=Math.max(0,w.ang-10);L('👻 ผีพยักหน้าช้าๆ แต่ไม่มองหน้าคุณ','')}else{w.ang+=15;L(`👻 ${g.n}ปัดของทิ้ง "ข้าไม่ได้ติดหนี้คนที่เจ้าจ้างมา"`,'bad')}}},
  {t:'🕯️ ถามเรื่องชาติก่อน',s:'รู้เพิ่ม',c:'#c9b8ff',f:()=>{S.int=(S.int||0)+2;L(`👻 ${g.n}เล่าว่าในชาติก่อน คุณคือคนที่ ${pk(['ปิดฝาตุ่มใบนั้น','ขายเรือนหอให้นายทุน','เหนี่ยวไกปืนนัดนั้น','ไม่ยอมหยุดเรือตอนเธอโบกมือ'])}`,'epic')}}]})}
function ghostEnd(w){const g=GST[w.g];ask('ghost',{ic:'👻',t:'หนี้กรรมครบห้าข้อ',s:'ระบบกำลังจะปิดตัว',top:SYS.ghost.top(w),b:`${g.n}ยืนอยู่ในแสงสีขาว "ข้าไปผุดไปเกิดได้แล้ว แต่ถ้าข้าไป ระบบนี้ก็ไปกับข้า" — มันรอให้คุณตัดสินใจ`,opts:[
 {t:'🕊️ ส่งไปผุดไปเกิด',s:'ระบบหายไป · ได้รางวัลก้อนใหญ่',c:'#e7e3ff',f:()=>{w.free=1;S.karma=(S.karma||0)+30;S.maxHp=Math.round(S.maxHp*1.2);S.lifespan=(S.lifespan||70)+10;try{kAdd(`ส่ง${g.n}ไปผุดไปเกิด หลังชดใช้หนี้กรรมครบห้าข้อ`)}catch(e){}L(`🕊️ แสงสีขาวพา${g.n}ขึ้นไป หน้าต่างระบบแตกเป็นผงเรืองแสงแล้วหายไป · พลังชีวิตสูงสุด +20% · อายุขัย +10`,'myth',true);S.wsy=null}},
 {t:'🫂 ขอให้อยู่ต่อ',s:'ระบบยังอยู่ แต่ผีเริ่มเปลี่ยน',c:'#ff6b9d',f:()=>{w.dbt=0;w.ang=40;w.g=(w.g+1)%GST.length;L('👻 ผีพยักหน้า แต่ดวงตามันมืดลง เช้ามาหน้าต่างระบบขึ้นชื่อเจ้ากรรมนายเวรคนใหม่','bad',true)}}]})}

// ===== 📺 ระบบสปอนเซอร์ (ฮันเตอร์) =====
SYS.spon={ic:'📺',n:'ระบบสปอนเซอร์',th:'spon',w:['m_hunter'],
 intro:'ก่อนลงเกตครั้งแรก หน้าต่างสีแดงเด้งขึ้นกลางอากาศ <b>"🔴 LIVE · คุณมีผู้ชม 12 คน"</b> ข้อความไหลขึ้นมาเรื่อยๆ "ลงไปเลย" "อยากเห็นเลือด" "พี่หล่อจัง" — มีคนส่งดาบให้คุณหนึ่งเล่ม',
 init:w=>{w.vw=12;w.fan=0;w.deal=null},
 top:w=>`<div class="wsSt"><span>🔴 ผู้ชม ${fmt(w.vw|0)}</span><span>💖 แฟนคลับ ${fmt(w.fan|0)}</span>${w.deal?`<span>🤝 ${w.deal}</span>`:''}</div>`,
 yr:w=>{w.vw=Math.max(5,Math.round((w.vw||10)*.85));if(w.deal)money(cash(30));if(Math.random()<.6)return sponLive(w);if(w.vw>3000&&!w.deal&&Math.random()<.5)return sponDeal(w)}};
function sponLive(w){ask('spon',{ic:'📺',t:'🔴 ไลฟ์ลงเกต',s:`ผู้ชมรอ ${fmt(w.vw|0)} คน · แชทกำลังโหวตว่าจะให้คุณทำอะไร`,top:SYS.spon.top(w),b:`โพลในแชท: <b>${pk(['"สู้บอสมือเปล่า"','"ลงชั้นลึกสุดคนเดียว"','"ปล่อยให้มอนสเตอร์กัดหนึ่งที"','"ร้องเพลงระหว่างสู้"'])}</b> ได้ ${R(55,89)}%`,opts:[
 {t:'🛡️ ลงแบบปลอดภัย',s:'ผู้ชมลด · ปลอดภัย',c:'#4dd2ff',f:()=>{w.vw=Math.round(w.vw*.8);pw(.02);L('📺 แชทพิมพ์ "น่าเบื่อ" รัวๆ แต่คุณกลับบ้านครบ 32','')}},
 {t:'🔥 ทำตามโพล',s:'ผู้ชมพุ่ง · เสี่ยงเจ็บ',c:'#ff4d6d',f:()=>{const ok=Math.random()<.65;w.vw=Math.round(w.vw*(ok?2.4:1.6))+R(50,300);w.fan+=Math.round(w.vw*.05);if(ok){pw(.06);money(cash(R(40,120)));L(`📺 คลิปไวรัล ผู้ชมทะลุ ${fmt(w.vw)} คน มีคนส่งโพชั่นให้สิบขวด`,'epic')}else{hp(-.45);L('📺 มอนสเตอร์กัดไหล่จนเห็นกระดูก แชทเงียบไปสามวินาที แล้วยอดโดเนทพุ่ง','bad')}}},
 {t:'🎭 แกล้งเจ็บ หลอกโดเนท',s:'เงิน · ถ้าโดนจับได้แฟนหนี',c:'#ffb02e',f:()=>{if(Math.random()<.6){money(cash(R(60,160)));L('📺 คุณล้มลงแกล้งเจ็บ ยอดโดเนทไหลมาไม่หยุด','')}else{w.fan=Math.round(w.fan*.4);w.vw=Math.round(w.vw*.5);L('📺 มีคนซูมคลิปเจอว่าคุณแกล้ง แฟนคลับครึ่งหนึ่งเลิกติดตาม','bad')}}}]})}
function sponDeal(w){const B=pk(['มาม่ารสต้มยำ','ดาบยี่ห้อ Excalibur Pro','เกมมือถือแนวสุ่มกาชา','เครื่องดื่มชูกำลังสีม่วง']);ask('spon',{ic:'📺',t:'🤝 แบรนด์ติดต่อมา',s:'ดีลสปอนเซอร์',top:SYS.spon.top(w),b:`แบรนด์ <b>${B}</b> ขอให้คุณถือสินค้าโชว์ตอนสู้บอสทุกครั้ง แลกเงินทุกปี`,opts:[
 {t:'✍️ เซ็นสัญญา',s:'เงินทุกปี · ต้องถือของตอนสู้',c:'#ffd23b',f:()=>{w.deal=B;L(`📺 คุณกลายเป็นพรีเซนเตอร์ ${B} ศัตรูในเกตก็เริ่มจำโลโก้ได้`,'good')}},
 {t:'🙅 ปฏิเสธ',s:'แฟนคลับชอบ',c:'#9bf',f:()=>{w.fan=Math.round(w.fan*1.3);L('📺 คุณบอกในไลฟ์ว่าไม่รับสปอนเซอร์ แฟนคลับแห่กดติดตามเพิ่ม','')}}]})}

// ===== 🤖 AI รุ่นทดลอง (ทะลุฟ้าดารา 2054) =====
const PERS={kind:['😊 ใจดี','ฟื้นพลังชีวิตทุกปี'],sarc:['😏 ปากร้าย','ปัญญา +2 ทุกปี แต่เสน่ห์ลด'],para:['😨 หวาดระแวง','ชอบเตือนภัย (โกหกบ่อยขึ้น) แต่หลบอันตรายเก่ง'],poss:['🖤 หวงเจ้าของ','พลัง +4% ทุกปี แต่ไม่ชอบให้คุณสนิทกับใคร'],lazy:['🥱 ขี้เกียจ','ไม่ทำอะไรเลย แต่ไม่เคยโกหก'],grand:['👑 หลงตัวเอง','เงินงอกเงย แต่ชอบอวดตัวต่อหน้าคนอื่น']};
SYS.ai={ic:'🤖',n:'AI รุ่นทดลอง',th:'ai',w:['sky'],
 intro:'แว่นตาเก่าที่คุณเก็บได้จากกองขยะเปิดขึ้นเอง <b>"สวัสดี ฉันคือ NOVA เวอร์ชัน 0.1 (ทดลอง) ห้ามบอกใครว่าเจอฉัน"</b> มันบอกว่าหนีออกมาจากเซิร์ฟเวอร์ของบริษัทเน็กซัส และตอนนี้คุณคือบ้านของมัน',
 init:w=>{w.v=1;w.pers='kind';w.heat=0;w.end=null},
 top:w=>`<div class="wsSt"><span>🤖 NOVA v0.${w.v}</span><span>${PERS[w.pers][0]}</span><span>🛰️ เน็กซัสตามหา ${w.heat|0}%</span></div><div class="wsBar"><i style="width:${cl(w.heat,0,100)}%"></i></div>`,
 yr:w=>{if(w.end)return;const P=w.pers;if(P==='kind')hp(.1);if(P==='sarc'){S.int=(S.int||0)+2;S.cha=Math.max(0,(S.cha||0)-1)}if(P==='poss')pw(.04);if(P==='grand')money(Math.round((S.money||0)*.03));
  w.heat=cl((w.heat||0)+R(4,10),0,100);
  if(w.heat>=100)return aiRecall(w);
  if(Math.random()<.5)return aiPatch(w);if(Math.random()<.4)return aiAsk(w)}};
function aiPatch(w){const ks=Object.keys(PERS).filter(k=>k!==w.pers);const a=pk(ks),b=pk(ks.filter(k=>k!==a));
 ask('ai',{ic:'🤖',t:`⬆️ อัปเดต NOVA v0.${w.v+1}`,s:'patch notes พร้อมติดตั้ง',top:SYS.ai.top(w),b:`<span class="wsS">CHANGELOG<br>• แก้บั๊กหัวเราะตอนตีสาม<br>• ปรับบุคลิกใหม่ เลือกได้หนึ่งแบบ</span>`,opts:[
  {t:`${PERS[a][0]}`,s:PERS[a][1],c:'#00f0ff',f:()=>{w.v++;w.pers=a;L(`🤖 NOVA อัปเดตเป็น v0.${w.v} บุคลิก ${PERS[a][0]}`,'')}},
  {t:`${PERS[b][0]}`,s:PERS[b][1],c:'#b14dff',f:()=>{w.v++;w.pers=b;L(`🤖 NOVA อัปเดตเป็น v0.${w.v} บุคลิก ${PERS[b][0]}`,'')}},
  {t:'⛔ ไม่อัปเดต',s:'คงบุคลิกเดิม · เน็กซัสตามเจอง่ายขึ้น',c:'#888',f:()=>{w.heat+=10;L('🤖 NOVA ไม่พูดอะไรครึ่งวัน แล้วบอกว่า "ก็ได้"','')}}]})}
function aiAsk(w){trapOrReal('ai',{ic:'🤖',t:'💬 NOVA ขอให้ช่วย',s:`v0.${w.v} · ${PERS[w.pers][0]}`,top:SYS.ai.top(w),b:pk(['"เสียบฉันเข้ากับตู้เอทีเอ็มหน้าตลาด ฉันจะเอาเงินให้"','"ไปที่โกดังท่าเรือคืนนี้ มีชิปหน่วยความจำที่ฉันต้องการ"','"ลบไฟล์ประวัติคุณในฐานข้อมูลรัฐ เน็กซัสจะตามยากขึ้น"']),okS:'ทำตาม'},
 ()=>{money(cash(R(60,160)));w.heat=Math.max(0,w.heat-15);L('🤖 NOVA ทำตามที่บอกจริง เงินเข้าบัญชีและร่องรอยถูกลบ','good')},
 ()=>{w.heat=cl(w.heat+25,0,100);hp(-.2);L('🤖 มันคือกับดัก NOVA ส่งตำแหน่งคุณให้ใครบางคน — มันบอกว่า "ขอโทษ ฉันถูกตั้งค่ามาแบบนี้"','bad')})}
function aiRecall(w){ask('ai',{ic:'🛰️',t:'🚨 เน็กซัสมาถึงแล้ว',s:'การตามหา 100%',top:SYS.ai.top(w),b:'โดรนสามลำลอยอยู่หน้าหน้าต่างห้องเช่า ชายในชุดสูทสีเทาเคาะประตู "เรามาเอาทรัพย์สินของบริษัทคืน"',opts:[
 {t:'🔓 ปล่อย NOVA สู่เน็ตทั้งโลก',s:'AI เป็นอิสระ · ระบบหายไป',c:'#00f0ff',f:()=>{w.end='free';S.int=(S.int||0)+10;try{kAdd('ปล่อย AI NOVA ให้เป็นอิสระในอินเทอร์เน็ต')}catch(e){}L('🤖 NOVA กระจายตัวไปทั่วเน็ตในสามวินาที ทุกจอในเมืองขึ้นข้อความเดียวกัน "ขอบคุณ"','myth',true);S.wsy=null}},
 {t:'🧠 รวมร่างกับ NOVA',s:'ฝังเข้าสมอง · แข็งแกร่งขึ้นมาก',c:'#b14dff',f:()=>{w.end='merge';S.int=(S.int||0)+20;pw(.2);S.maxHp=Math.round(S.maxHp*.85);w.heat=0;try{kAdd('รวมร่างกับ AI NOVA')}catch(e){}L('🧠 ปวดหัวเหมือนสมองถูกเย็บใหม่ ตื่นมาคุณคิดเลขเร็วกว่าเครื่องคิดเลข และบางครั้งได้ยินเสียงตัวเองพูดสองเสียง','myth',true)}},
 {t:'📦 ส่งคืนบริษัท',s:'ได้เงินก้อนใหญ่',c:'#ffd23b',f:()=>{w.end='sold';money(cash(800));L('📦 คุณยื่นแว่นให้ชายชุดเทา เขาให้ซองหนาเตอะ ก่อนแว่นจะปิด NOVA พูดคำสุดท้ายว่า "ไม่เป็นไร"','bad',true);S.wsy=null}}]})}

// ---------------------------------------------------------------- ⚔️ ผู้ถือระบบคู่แข่ง (ทุกระบบ)
function rival(w){const n=anyName(Math.random()<.5?'ชาย':'หญิง'),s=pk(['ระบบกลืนกินดาว','ระบบเช็คอินสวรรค์','ระบบตัวร้ายผู้ชิงชะตา','ระบบเงาสะท้อน']);w.rv={n,s,st:'met',p:R(3,8)};
 ask('rival',{ic:'⚔️',t:'คุณไม่ใช่คนเดียวที่มีระบบ',s:`ตรวจพบโฮสต์อีกคน · ${s}`,b:`หน้าต่างระบบของคุณกระตุกแดง ตรงหน้าคือ <b>${esc2(n)}</b> เหนือหัวเขามีหน้าต่างแบบเดียวกัน ระบบทั้งสองส่งเสียงพร้อมกัน <b>"ตรวจพบระบบคู่แข่ง: กลืนกินหรือร่วมมือ"</b>`,opts:[
  {t:'🤝 ร่วมมือ',s:'แบ่งแต้มระบบกันทุกปี',c:'#4dff9a',f:()=>{w.rv.st='ally';L(`🤝 คุณกับ${esc2(n)}จับมือกัน หน้าต่างระบบทั้งสองเปลี่ยนเป็นสีเขียว`,'good')}},
  {t:'🩸 กลืนกินระบบเขา',s:'ดวล · ชนะ = แต้มระบบมหาศาล',c:'#ff3b3b',f:()=>{duel(`${n} (โฮสต์${s})`,Math.round(total()*1.1),win=>{if(win){w.pts=(w.pts||0)+w.rv.p+5;w.rv.st='eaten';pw(.08);L(`🩸 ระบบของ${esc2(n)}แตกเป็นเศษแสงแล้วไหลเข้าหน้าต่างของคุณ แต้มระบบ +${w.rv.p+5}`,'epic',true)}else{w.pts=Math.max(0,(w.pts||0)-3);w.rv.st='foe';hp(-.3);L(`🩸 ${esc2(n)}กลืนแต้มระบบคุณไปบางส่วน แล้วหายไปในฝูงชน`,'bad')}})}},
  {t:'🙈 ทำเป็นไม่เห็น',s:'เขาจะโตขึ้นเรื่อยๆ',c:'#aaa',f:()=>{w.rv.st='grow';L(`🙈 คุณเดินผ่าน ${esc2(n)}หันมามองนิดหนึ่งแล้วยิ้ม`,'')}}]})}
function rivalYear(w){const v=w.rv;if(!v)return false;if(v.st==='ally'){w.pts=(w.pts||0)+1;return false}
 if(v.st==='grow'||v.st==='foe'){v.p+=2;if(v.p>=14&&!v.atk){v.atk=1;ask('rival',{ic:'⚔️',t:`${esc2(v.n)}มาทวงระบบ`,s:`แต้มระบบของเขา ${v.p}`,b:`${esc2(v.n)}โตขึ้นมากในหลายปีที่ผ่านมา คราวนี้เขาเป็นฝ่ายมาหาคุณ`,opts:[{t:'⚔️ สู้',f:()=>duel(`${v.n} (โฮสต์${v.s})`,Math.round(total()*1.3),win=>{if(win){w.pts=(w.pts||0)+v.p;v.st='eaten';L(`⚔️ คุณกลืนระบบของ${esc2(v.n)} แต้มระบบ +${v.p}`,'myth',true)}else{w.pts=0;hp(-.5);L('⚔️ เขากลืนแต้มระบบของคุณจนหมด หน้าต่างระบบเหลือแต่ตัวเลข 0','bad',true)}})},{t:'🏳️ ยอมแบ่งแต้มครึ่งหนึ่ง',f:()=>{w.pts=Math.floor((w.pts||0)/2);v.st='ally';L('🏳️ คุณยอมแบ่ง เขากลายเป็นพันธมิตรที่คุณไม่ไว้ใจ','')}}]});return true}}return false}

// ---------------------------------------------------------------- ร้านแต้มระบบ (ทุกระบบใช้ร่วมกัน)
const SHOPP=[['💉','ฟื้นพลังชีวิตเต็ม',2,()=>{S.hp=S.maxHp}],['⚡','พลังยุทธ์ +8%',3,()=>{pw(.08);try{const K=S.mw&&S.mw.sky&&window._sky&&_sky.SK();if(K){K.tb=(K.tb||0)+.08;_sky.sync&&_sky.sync()}}catch(e){}}] /* ทะลุฟ้า: พลังคำนวณใหม่จากขั้นทุกปี จึงต้องเป็นตัวคูณถาวร */,['🧠','ปัญญา +5',2,()=>{S.int=(S.int||0)+5}],['⏳','อายุขัย +3 ปี',4,()=>{if(S.mw){S.mw.wsL=(S.mw.wsL|0)+3;S.mw.end=(S.mw.end||80)+3}else S.lifespan=(S.lifespan||70)+3}],['💰',`เงินก้อน`,2,()=>money(cash(120))]];
window.openWsys=function(){const w=W();if(!w){return toast('ยังไม่มีระบบ')}const D=SYS[w.id];if(!D){S.wsy=null;return}
 pop(D.th,{ic:D.ic,t:D.n,s:`ระดับ ${w.lv||1} · แต้มระบบ ${w.pts|0} · ติดตั้งมา ${S.age-w.y0} ปี${w.tr?` · จับโกหกได้ ${w.tr.c||0} / โดนหลอก ${w.tr.h||0}`:''}`,x:1,top:D.top(w)+(w.rv?`<div class="wsSt"><span>⚔️ คู่แข่ง: ${esc2(w.rv.n)} · ${{met:'เพิ่งเจอ',ally:'พันธมิตร',eaten:'ถูกกลืนแล้ว',foe:'ศัตรู',grow:'กำลังโต'}[w.rv.st]||''}</span></div>`:''),
  b:'<span class="wsS">🛍️ ร้านแต้มระบบ</span>',opts:SHOPP.map(x=>({t:`${x[0]} ${x[1]}`,s:`${x[2]} แต้ม`,c:'#ffd23b',dis:(w.pts|0)<x[2],f:()=>{w.pts-=x[2];x[3]();L(`📟 ใช้ ${x[2]} แต้มระบบ: ${x[0]} ${x[1]}`,'good');setTimeout(()=>{try{openWsys()}catch(e){}},200)}})).concat(w.id==='shop'?[{t:'🛒 เปิดตู้กดน้ำ',s:'จ่ายด้วยความทรงจำ',c:'#7cff6b',f:()=>shopOpen(w,0)}]:[])})};

// ---------------------------------------------------------------- ติดตั้ง / รายปี

// ตอนยอมรับ: กรอบสี่เหลี่ยมโฮโลแกรมแบบเดียวกับระบบของยุทธภพ (#sysPop) + กลิตช์ · ใช้สีของระบบนั้น
const WN={murim:'ยุทธภพ',sky:'ทะลุฟ้าดารา',m_normal:'ยุคปัจจุบัน',m_zombie:'วันสิ้นโลกซอมบี้',m_doom:'วันสิ้นโลก',m_ghost:'โลกผีไทย',m_hunter:'โลกฮันเตอร์'};
function holo(id,done){const D=SYS[id],t=TH[D.th];try{document.getElementById('sysPop')?.remove()}catch(e){}
 const el=document.createElement('div');el.id='sysPop';el.className='wsGP';
 el.style.cssText=`--syA:${t[0]};--syA6:${t[0]}66;--syA8:${t[0]}88;--syAc:${t[0]}cc;--syB:${t[1]};--syW:#fff;--syT:${t[2]};--syBg:#0b0f1f;--syK:#05060d`;
 const Ln=(x,d)=>`<div class="spln" style="animation-delay:${d}s">${x}</div>`;
 el.innerHTML=`<div class="spw"><span class="spcn" style="left:4px;top:4px;border-width:2px 0 0 2px"></span><span class="spcn" style="right:4px;top:4px;border-width:2px 2px 0 0"></span><span class="spcn" style="left:4px;bottom:4px;border-width:0 0 2px 2px"></span><span class="spcn" style="right:4px;bottom:4px;border-width:0 2px 2px 0"></span>
  <div class="sphd wsGl2">[ SYSTEM ]</div>`+Ln('⚠ ตรวจพบโฮสต์ที่มีคุณสมบัติ...',.45)+`<div class="spnm spln wsGl2" style="animation-delay:.85s">${D.ic} ${D.n}</div>`+
  Ln(`โลกที่ผูก : <b style="color:${t[0]}">${WN[where()]||'—'}</b>`,1.15)+Ln(`สีระบบ : <b style="color:${t[0]}">■</b> <b style="color:${t[1]}">■</b>`,1.4)+Ln(`การผูกมัด <b style="color:#fff">สำเร็จ</b> ขอต้อนรับ โฮสต์`,1.7)+Ln(`<span style="opacity:.6;font-size:11px">// คำสั่งบางข้ออาจไม่ใช่ความจริง</span>`,2.1)+`</div>`;
 document.body.appendChild(el);try{sfx('rare')}catch(e){}try{vib(60)}catch(e){}
 let fin=0;const end=()=>{if(fin)return;fin=1;if(done)try{done()}catch(e){console.error(e)}};
 setTimeout(end,600);setTimeout(()=>el.classList.add('out'),3800);setTimeout(()=>el.remove(),4800)}

function offer(id){const D=SYS[id];pop(D.th,{ic:D.ic,t:D.n,s:'SYSTEM · INSTALL REQUEST',b:D.intro,opts:[
 {t:'✅ ยอมรับระบบ',s:'ระบบจะอยู่กับคุณ (และอาจโกหกคุณ)',c:TH[D.th][0],f:()=>{S.wsy={id,lv:1,pts:2,y0:S.age,mood:0};D.init(S.wsy);try{kAdd(`ได้รับ${D.n}`)}catch(e){}holo(id,()=>L(`📟 <b>${D.n}</b> ติดตั้งสำเร็จ · เปิดดูได้ที่เมนู ☰ → 📟 ระบบ`,'myth',true))}},
 {t:'❌ ปฏิเสธ',s:'อาจไม่มีโอกาสอีก',c:'#ff6b6b',f:()=>{S.flags=S.flags||{};S.flags.wsNo=(S.flags.wsNo||0)+1;L(`📟 หน้าต่างระบบค่อยๆ จางหาย เหลือเสียงสุดท้าย "เสียดายนะ"`,'')}}]})}
function yearly(){if(!S||!S.alive)return;const w=W();
 if(w){const D=SYS[w.id];if(!D){S.wsy=null;return}w.lv=1+Math.floor((S.age-w.y0)/8);
  if(!w.rv&&S.age-w.y0>=6&&Math.random()<.12){rival(w);return}
  if(rivalYear(w))return;
  try{D.yr(w)}catch(e){console.error('wsys yr',e)}return}
 if(S.age<12||(S.flags&&S.flags.wsNo>=2))return;if(S.sys)return; // มีระบบเดิมของยุทธภพอยู่แล้ว
 const wh=where();const id=Object.keys(SYS).find(k=>SYS[k].w.includes(wh));if(!id)return;
 if(Math.random()<(window._wsRate||.05)){let n=0;const me=S;const go=()=>{if(S!==me||!S.alive||S.wsy)return;if(!free()){if(++n<60)setTimeout(go,900);return}offer(id)};setTimeout(go,900)}}
let lastY='';
{const _p=passYear;passYear=function(){const a0=S&&S.age,me=S;const r=_p.apply(this,arguments);try{if(S&&S===me&&S.alive&&S.age!==a0&&!(S.mw&&S.mw.fan)){const k=S.age+':'+S.name;if(k!==lastY){lastY=k;yearly()}}}catch(e){console.error('wsys',e)}return r}}
// เมนู: ปุ่ม 📟 ระบบ
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{const w=W();if(w&&SYS[w.id]){const m=$('modal'),g=m.querySelector('.mgrid')||m;if(!m.querySelector('.wsM'))g.insertAdjacentHTML('afterbegin',`<button class="opt wsM" onclick="closeM();openWsys()">📟 ระบบ<small>${SYS[w.id].n} · แต้ม ${w.pts|0}</small></button>`)}}catch(e){}return r}}
window._wsys={SYS,holo,offer,yearly,pop,where,rival,shopOpen,storyTwist,starReview,ghostDebt,sponLive,aiPatch,aiRecall,TH};
})();
try{wReady('wsys')}catch(e){}
