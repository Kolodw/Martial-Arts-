// ============================================================
// /w/div.js 💔 ขอหย่า / เลิกกัน — ใช้ได้ทุกโลกทุกโหมด (โหลดเบื้องหลัง 4.4 วิ)
//  ทางเข้า: ☰ เมนู (ปุ่ม 💔 ขอหย่า เมื่อมีคู่) · 👥 ผู้คน (ปุ่มบนการ์ดคู่ชีวิต)
//  ขั้นตอน: แบ่งทรัพย์ (ครึ่งหนึ่ง / ไม่ยอมแบ่ง) → ลูกอยู่กับใคร (ถ้ามีลูกยังไม่ถึง 18)
//  ผลตามมา (S.exes): ค่าเลี้ยงดูรายปี · อดีตคู่ที่แค้นกลับมาเอาคืน · คนที่จากกันดีๆ กลับมาเป็นเพื่อนหรือขอคืนดี
// ============================================================
try{(function(){
if(window._divX)return;window._divX=1;
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T_=f=>{try{return f()}catch(e){return null}};
const P_=p=>Math.random()<p,RI=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),CH=a=>a[Math.floor(Math.random()*a.length)];
const hasS=()=>typeof S!=='undefined'&&!!S,alive=()=>hasS()&&!!S.alive;
const say=(t,c,b)=>T_(()=>log(t,c||'',!!b));
const N=v=>T_(()=>fmt(v))||String(v);
const J=d=>T_(()=>joy(d));
const wk=()=>{if(!hasS())return'murim';const M=S.mw;if(M&&M.sky)return'sky';if(M&&M.fan)return'fan';if(M&&M.fog)return'fog';if(S.beastMode&&!S.beastMode.human)return'beast';if(S.ch==='soul'||S.sv)return'soul';if(S.rg)return'loop';if(M)return'mw';if(S.xt)return'god';if(S.xian)return'xian';return'murim'};
// [ฉากหย่า, ฉากเลิกกันตอนยังไม่แต่ง, คำเรียกเงิน]
const W={
 murim:['เขียนหนังสือหย่าต่อหน้าผู้อาวุโสของทั้งสองตระกูล แล้วกดลายนิ้วมือลงบนกระดาษ','คืนปิ่นปักผมที่เคยให้กันไว้ใต้ต้นท้อหลังบ้าน','ทรัพย์สิน'],
 xian:['ตัดด้ายแดงต่อหน้าศิลาสามชาติ ปลายด้ายลุกเป็นไฟแล้วดับไปในลมเย็น','ถอนลายผนึกคู่บำเพ็ญที่เคยประทับไว้บนข้อมือกันและกัน','หินวิญญาณ'],
 god:['ลบชื่อคู่ครองออกจากแผ่นหยกสวรรค์ ทั้งตำหนักเทพเงียบไปครู่หนึ่ง','ถอนพันธะเทพคู่ครองที่ยังไม่ได้ทำพิธี','ทรัพย์สมบัติสวรรค์'],
 beast:['แยกถ้ำ แยกอาณาเขต ต่างตัวต่างล่าเหยื่อในป่าคนละฟาก','ไม่กลับไปที่ลำธารที่เคยนัดกันอีก','อาหารที่สะสมไว้'],
 soul:['คืนป้ายคู่ครองที่ตระกูลมอบให้ ดวงจิตของทั้งคู่ไม่สั่นตามกันอีกแล้ว','บอกเลิกกันตรงลานประลอง หลังวันประลองประจำปี','เหรียญวิญญาณ'],
 mw:['ไปจดทะเบียนหย่าที่สำนักงานเขต เจ้าหน้าที่ยื่นปากกาให้เหมือนเป็นเรื่องธรรมดาที่สุดในโลก','บอกเลิกกันในร้านกาแฟเดิมที่เคยนั่งเดตครั้งแรก','เงินเก็บ'],
 loop:['ยื่นใบหย่าในวันเดิมที่เวลาวนกลับมาทุกครั้ง ครั้งนี้คุณไม่ย้อนกลับไปแก้','เดินจากไปก่อนที่ลูปจะเริ่มใหม่','เงินเก็บ'],
 fog:['ยื่นใบหย่าที่ศาลาว่าการใต้แสงตะเกียงหมอก เสมียนประทับตราโดยไม่เงยหน้า','เผาจดหมายรักทั้งหมดในเตาผิงห้องเช่า','เงินเก็บ'],
 sky:['ส่งคำร้องยุติสัญญาคู่ชีวิตเข้าฐานข้อมูลสหพันธ์ ระบบตอบกลับภายในสามวินาที','ลบช่องสัญญาณส่วนตัวที่ใช้คุยกันทุกคืน','เครดิต'],
 fan:['ทำลายแหวนพันธสัญญาต่อหน้านักบวชในวิหาร ประกายเวทจางหายจากนิ้วนาง','ถอนหมั้นอย่างเป็นทางการ จดหมายประทับตราครั่งถูกส่งไปทั้งสองตระกูล','เหรียญทอง']};
const wd=()=>W[wk()]||W.murim;
const spName=()=>hasS()&&S.spouse?String(S.spouse):'';
const wedded=()=>!(S.sp&&S.sp.wed===false);
const verb=()=>wedded()?'ขอหย่า':'เลิกกัน';
const kidsMinor=()=>(S.children||[]).filter(c=>c&&c.alive!==false&&(c.age==null||c.age<18));
// คู่คิดยังไงกับคุณ: aff (ระบบคู่) หรือ spRel (หน้าผู้คน)
const spAff=()=>{const a=S.sp&&S.sp.aff!=null?S.sp.aff:S.spRel!=null?S.spRel:60;return Math.max(0,Math.min(100,+a||0))};
const spPer=()=>S.sp&&S.sp.p?String(S.sp.p):'';
const busy=()=>T_(()=>!!(choice&&choice._cur))||T_(()=>typeof window._mgBusy==='function'&&window._mgBusy());

// ---------- ขั้นตอนหย่า ----------
const D={};
window.divOpen=function(){if(!alive())return;if(!S.spouse)return T_(()=>toast('ตอนนี้คุณยังไม่มีคู่'));if(busy())return T_(()=>toast('รอให้เรื่องตรงหน้าจบก่อน'));
 const n=spName(),a=spAff(),p=spPer();D.n=n;D.wed=wedded();D.aff=a;D.p=p;D.share=null;D.kids=null;
 const hint=a>=70?`${E(n)}ยังรักคุณมาก ข่าวนี้จะทำให้อีกฝ่ายเจ็บที่สุด`:a>=40?`ช่วงนี้ทั้งคู่ห่างกันไปบ้าง แต่ยังไม่ถึงขั้นแตกหัก`:`ความสัมพันธ์ร้าวมานานแล้ว ${E(n)}อาจโล่งใจด้วยซ้ำ`;
 T_(()=>closeM());
 setTimeout(()=>T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>💔 ${verb()}กับ ${E(n)}</h3>
 <p>${hint}${p?` · นิสัย<b>${E(p)}</b>`:''}</p>
 <p class="tag2">ความผูกพันตอนนี้ ${Math.round(a)}/100 · ${D.wed?'หย่าแล้วต้องตกลงเรื่องทรัพย์สิน'+(kidsMinor().length?'และลูก':''):'ยังไม่ได้แต่งงาน ไม่มีทรัพย์สินต้องแบ่ง'}</p>
 <div class="brow2" style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
 <button class="pbtn" onclick="divStep1()">💔 ตัดสินใจแล้ว</button>
 <button class="gbtn" onclick="closeM()">ยังก่อน</button></div>`,'divorce')),120)};
window.divStep1=function(){if(!alive()||!S.spouse)return T_(()=>closeM());
 if(!D.wed){D.share='none';return divStep2()}
 const half=Math.max(0,Math.floor((S.money||0)/2)),w=wd();
 T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>⚖️ แบ่ง${w[2]}</h3>
 <p>ตอนนี้คุณมี${w[2]} <b>${N(S.money||0)}</b></p>
 <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
 <button class="opt" onclick="divShare('half')">🤝 แบ่งให้ครึ่งหนึ่ง<small>เสีย ${N(half)} · จากกันด้วยดี กรรมดี +</small></button>
 <button class="opt" onclick="divShare('none')">✊ ไม่ยอมแบ่ง<small>เก็บไว้ทั้งหมด · กรรม − · ${E(D.n)}จะจำเรื่องนี้</small></button>
 <button class="opt" onclick="divShare('all')">🕊️ ยกให้ทั้งหมด<small>เริ่มใหม่ตัวเปล่า · กรรมดี ++ · ชื่อเสียง +</small></button>
 </div>`,'divorce'))};
window.divShare=function(k){D.share=k;divStep2()};
function divStep2(){const K=kidsMinor();if(!D.wed||!K.length){D.kids=null;return divDo()}
 T_(()=>modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>👶 ลูกจะอยู่กับใคร</h3>
 <p>ลูกที่ยังไม่โต ${K.length} คน: ${K.map(c=>E(c.n||'ลูก')+(c.age!=null?` (${c.age})`:'')).join(', ')}</p>
 <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
 <button class="opt" onclick="divKids('me')">🏠 อยู่กับคุณ<small>ลูกอยู่ใกล้ตัว · ${E(D.n)}ช่วยส่งค่าเลี้ยงดูบ้างตามแต่ใจ</small></button>
 <button class="opt" onclick="divKids('ex')">🚪 อยู่กับ${E(D.n)}<small>คุณส่งค่าเลี้ยงดูทุกปีจนลูกโต · ความสุข −</small></button>
 <button class="opt" onclick="divKids('ask')">🗣️ ให้ลูกเลือกเอง<small>อาจได้ทั้งสองแบบ</small></button>
 </div>`,'divorce'))}
window.divKids=function(k){if(k==='ask'){const love=(S.children||[]).reduce((a,c)=>a+(c.rel==null?50:+c.rel||0),0)/Math.max(1,(S.children||[]).length);k=Math.random()<.35+love/200?'me':'ex';D.kidsAsk=1}D.kids=k;divDo()};
function divDo(){if(!alive()||!S.spouse)return T_(()=>closeM());
 const n=D.n,w=wd(),y=S.age;let t='';
 // อารมณ์ของอดีตคู่หลังจากนี้: bitter (แค้น) · sad · fine · kind
 const p=D.p,a=D.aff;let mood=a>=70?'sad':a>=35?'fine':'fine';
 if(D.share==='none'&&D.wed)mood='bitter';if(/หึง|ทะเยอทะยาน|เย็นชา|เจ้าคิดเจ้าแค้น|เห็นแก่ตัว/.test(p)&&a>=40)mood='bitter';
 if(D.share==='all'||/อ่อนโยน|ร่าเริง|ใจดี|ซื่อ/.test(p)&&mood!=='bitter')mood=mood==='sad'?'sad':'kind';
 T_(()=>closeM());
 const m0=S.money||0;let lost=0;
 if(D.share==='half'){lost=Math.floor(m0/2);S.money=m0-lost;S.karma=(S.karma||0)+3}
 else if(D.share==='all'){lost=m0;S.money=0;S.karma=(S.karma||0)+8;S.fame=(S.fame||0)+(T_(()=>fameR(10))||10)}
 else if(D.share==='none'&&D.wed){S.karma=(S.karma||0)-6}
 J(D.wed?(a>=60?-18:a>=35?-10:-3):(a>=60?-10:-4));
 t=`💔 <b>${D.wed?'หย่าขาด':'เลิกกัน'}กับ${E(n)}</b> — ${D.wed?w[0]:w[1]}`;
 if(lost)t+=` · แบ่ง${w[2]}ไป ${N(lost)}`;
 if(D.share==='none'&&D.wed)t+=` · คุณไม่ยอมแบ่งอะไรให้เลย ${E(n)}มองคุณนิ่งๆ ก่อนเดินออกไป`;
 if(D.kids==='me')t+=` · ${D.kidsAsk?'ลูกเลือกอยู่กับคุณ':'ลูกอยู่กับคุณ'}`;
 if(D.kids==='ex'){t+=` · ${D.kidsAsk?'ลูกเลือกไปอยู่กับ'+E(n):'ลูกไปอยู่กับ'+E(n)} คุณส่งค่าเลี้ยงดูทุกปี`;J(-6)}
 t+=mood==='sad'?` · ${E(n)}ร้องไห้ทั้งคืน`:mood==='kind'?` · ${E(n)}บอกว่า "ขอให้เจ้าเจอคนที่ทำให้มีความสุขจริงๆ"`:mood==='bitter'?` · ${E(n)}พูดประโยคสุดท้ายว่า "อย่าคิดว่าเรื่องนี้จะจบง่ายๆ"`:'';
 if(wk()==='mw'||wk()==='fog'||wk()==='sky'||wk()==='loop')t=t.replace('"ขอให้เจ้าเจอ','"ขอให้เธอเจอ');
 // บันทึกอดีตคู่
 S.exes=S.exes||[];S.exes.push({n,y,w:wk(),mood,wed:D.wed?1:0,share:D.share,kids:D.kids==='ex'?1:0,kidsMe:D.kids==='me'?1:0,ev:0,a:Math.round(a),p});if(S.exes.length>8)S.exes.shift();
 // คู่ที่เป็นคนเกิดพร้อมกัน (peer) → กลายเป็นคนรู้จักเก่า
 T_(()=>{if(S.spouseP!=null&&peers[S.spouseP]){const q=peers[S.spouseP];q.rel=mood==='bitter'?'rival':'friend';q.af=mood==='bitter'?-30:mood==='kind'?40:10}});
 S.spouse=null;S.sp=null;S.spouseP=null;S.spRel=null;
 T_(()=>{if(S.comp)S.comp=S.comp.filter(k=>k!=='spouse')});
 say(t,'bad',true);T_(()=>keyAdd(`${D.wed?'หย่ากับ':'เลิกกับ'}${n}`));
 T_(()=>render());T_(()=>sfx('click'))}

// ---------- ผลตามมา (ตรวจทุกครั้งที่อายุเปลี่ยน) ----------
let lastA=null,lastS=null;
function tick(){if(!alive()||!S.exes||!S.exes.length)return;
 for(const x of S.exes){const yrs=S.age-x.y;if(yrs<=0)continue;
  // ค่าเลี้ยงดู: ลูกอยู่กับอีกฝ่ายจนโต
  if(x.kids){const K=kidsMinor();if(K.length){const pay=Math.max(1,Math.round((S.money||0)*.04));S.money=Math.max(0,(S.money||0)-pay);x.paid=(x.paid||0)+pay;
    if(yrs===1||yrs%4===0)say(`👶 ส่งค่าเลี้ยงดูลูกให้${E(x.n)} ${N(pay)}${P_(.5)?` · ลูก${CH(['ส่งรูปวาดมาให้','โทรมาเล่าเรื่องโรงเรียน','ถามว่าเมื่อไหร่จะมาหา','ไม่ค่อยพูดกับคุณแล้ว'])}`:''}`,'');}
   else{x.kids=0;say(`🎓 ลูกที่อยู่กับ${E(x.n)}โตแล้ว ไม่ต้องส่งค่าเลี้ยงดูอีก รวมทั้งหมด ${N(x.paid||0)}`,'good')}}
  if(x.kidsMe&&yrs<=12&&P_(.08)){const g=Math.max(1,RI(20,120));S.money=(S.money||0)+g;say(`📮 ${E(x.n)}ส่งเงินมาช่วยเลี้ยงลูก ${N(g)}`,'good')}
  if(x.ev>=2||yrs>25)continue;
  // แค้น: กลับมาเอาคืน
  if(x.mood==='bitter'&&yrs>=1&&P_(x.ev?.06:.14)){x.ev++;const k=CH(['money','fame','joy']);
   if(k==='money'){const l=Math.round((S.money||0)*(x.share==='none'?.3:.12));S.money=Math.max(0,(S.money||0)-l);say(`⚖️ <b>${E(x.n)}กลับมาเอาคืน</b> — ${x.share==='none'?'ฟ้องเรียกส่วนแบ่งที่คุณไม่ยอมให้ตอนหย่า':'เรียกเก็บหนี้เก่าที่คุณลืมไปแล้ว'} เสียไป ${N(l)}`,'bad',true)}
   else if(k==='fame'){S.fame=Math.max(0,(S.fame||0)-Math.max(5,Math.round((S.fame||0)*.1)));say(`🗣️ <b>${E(x.n)}ปล่อยข่าวลือเรื่องชีวิตคู่ของคุณ</b> ทุกคนในละแวกนั้นได้ยินกันหมด · ชื่อเสียง −`,'bad',true)}
   else{J(-10);say(`🥀 เจอ${E(x.n)}โดยบังเอิญ อีกฝ่ายเดินผ่านไปเหมือนไม่เคยรู้จักกัน คืนนั้นคุณนอนไม่หลับ`,'bad')}
   continue}
  // จากกันดี: กลับมาเป็นเพื่อน / ขอคืนดี
  if((x.mood==='kind'||x.mood==='sad'||x.mood==='fine')&&yrs>=2&&P_(.07)){x.ev++;
   if(!S.spouse&&x.mood!=='fine'&&P_(.45)&&!busy()&&!T_(()=>modalOpen)){askBack(x);return}
   J(5);say(`🍵 บังเอิญเจอ${E(x.n)}อีกครั้งหลังจากหย่ากัน ${yrs} ปี ${CH(['นั่งคุยกันนานจนลืมเวลา','อีกฝ่ายถามถึงสุขภาพของคุณ','ทั้งคู่หัวเราะเรื่องเก่าๆ ได้แล้ว','อีกฝ่ายมีครอบครัวใหม่และดูมีความสุขดี'])}`,'good')}}}
function askBack(x){T_(()=>modal(`<h3>💞 ${E(x.n)}กลับมา</h3><p>${S.age-x.y} ปีหลังจาก${x.wed?'หย่า':'เลิก'}กัน ${E(x.n)}มายืนรอหน้าบ้าน "ที่ผ่านมาเราทั้งคู่ยังไม่พร้อม ตอนนี้ล่ะ"</p>
 <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
 <button class="opt" onclick="divBack(1)">💍 ลองกันอีกครั้ง<small>กลับมาเป็นคู่ชีวิต</small></button>
 <button class="opt" onclick="divBack(0)">🙂 เป็นเพื่อนกันดีกว่า<small>จากกันด้วยดีจริงๆ</small></button></div>`,'divback'));window._divBk=x}
window.divBack=function(y){const x=window._divBk;window._divBk=null;T_(()=>closeM());if(!x||!alive())return;
 if(y&&!S.spouse){S.spouse=x.n;T_(()=>{const o={age:Math.max(18,S.age)};if(x.p)o.p=x.p;S.sp=mkLover(x.n,'คู่ชีวิตที่กลับมา',o);if(S.sp){S.sp.aff=75;if(x.wed===0)S.sp.wed=false}});S.spRel=75;x.ev=9;S.exes=S.exes.filter(e=>e!==x);J(18);say(`💍 <b>คุณกับ${E(x.n)}กลับมาอยู่ด้วยกันอีกครั้ง</b> ครั้งนี้ทั้งคู่รู้แล้วว่าอะไรสำคัญ`,'good',true);T_(()=>keyAdd(`กลับมาคืนดีกับ${x.n}`))}
 else{x.mood='friend';x.ev=9;J(4);say(`🤝 คุณกับ${E(x.n)}ตกลงเป็นเพื่อนกัน ไม่มีอะไรค้างคาใจอีกแล้ว`,'good')}
 T_(()=>render())};
setInterval(()=>{try{if(!alive())return;if(S!==lastS){lastS=S;lastA=S.age;return}if(S.age!==lastA){const d=S.age-lastA;lastA=S.age;if(d>0&&d<=3)tick()}}catch(e){}},700);

// ---------- ทางเข้า ----------
const btnH=()=>`<button class="opt divB" onclick="divOpen()">💔 ${verb()}<small>${E(spName())} · ${wedded()?'แบ่งทรัพย์ · ลูก':'จบความสัมพันธ์'}</small></button>`;
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(alive()&&S.spouse){const m=document.getElementById('modal'),g=m&&m.querySelector('.mgrid');if(g&&!g.querySelector('.divB'))g.insertAdjacentHTML('beforeend',btnH())}}catch(e){}return r};try{window.openMenu=openMenu}catch(e){}}
if(typeof openPeople==='function'){const _op=openPeople;openPeople=function(){const r=_op.apply(this,arguments);try{if(alive()&&S.spouse){const m=document.getElementById('modal');if(m)m.querySelectorAll('.pcard').forEach(c=>{const b=c.querySelector('[onclick*="meetP(\'spouse\')"]');if(b&&!c.querySelector('.divP'))b.insertAdjacentHTML('afterend',` <button class="sysb divP" onclick="divOpen()">💔 ${verb()}</button>`)})}}catch(e){}return r};try{window.openPeople=openPeople}catch(e){}}
try{wReady('div')}catch(e){}
})()}catch(e){console.error('div.js',e)}
