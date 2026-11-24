// 🧠 ชีวิตที่มีความหมาย — ทุกโลก ทุกโหมด (โหลดเบื้องหลังหลังเปิดเกม)
// 1) ความทรงจำ S.lfMem: จดเหตุการณ์ใหญ่ แล้วย้อนกลับมาเป็นตัวเลือกพิเศษ (สีฟ้า) และเสียงในใจ
// 2) วันสำคัญ: พ่อแม่จากไป · แต่งงาน · ลูกเกิด · ทะลวงใหญ่ · ขึ้นเป็นผู้นำ · ถูกหักหลัง → ฉาก 3 จังหวะ
// 3) เสียงในใจทุกปี ตามวัย อารมณ์ และนิสัย (S.pers)
// 4) อารมณ์ล็อกตัวเลือก (โกรธ → ให้อภัยไม่ได้ · เศร้า → ฉลองไม่ได้) ชะตาจะไม่สุ่มข้อที่ล็อก
// 5) ผลที่มาช้า: ข้อที่ลงมือรุนแรง/ช่วยคน มีป้ายบอก แล้วย้อนกลับมาหลายปีต่อมา (S.lfSeed)
// 6) สมุดภาพตอนจบ: บทชีวิต · ทางสู่วันสุดท้าย · สิ่งค้างในใจ · ส่งความทรงจำไปชาติหน้า (LS murim_omen)
// 7) ลดความงง: เด็กเห็นเมนูเฉพาะที่จำเป็น · แตะตัวเลขสถานะเพื่อดูความหมาย
try{(()=>{
const LSG=(k,d)=>{try{return LS.get(k,d)}catch(e){return d}},LSS=(k,v)=>{try{LS.set(k,v)}catch(e){}};
const $$=id=>document.getElementById(id);
const strip=t=>String(t==null?'':t).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const alive=()=>{try{return !!(S&&S.alive)}catch(e){return false}};
let busy=0; // กันวนเมื่อ log ของระบบนี้เอง

// ───────── ความทรงจำ ─────────
const MEM=()=>{S.lfMem=S.lfMem||[];return S.lfMem};
function remember(tag,t,extra){if(!alive())return null;const L=MEM();const m=Object.assign({a:S.age|0,tag,t:strip(t).slice(0,90)},extra||{});
 if(L.some(x=>x.tag===tag&&x.t===m.t))return null;L.push(m);if(L.length>40)L.splice(1,1);return m}
const memOf=(tag,within)=>MEM().filter(m=>m.tag===tag&&(within==null||(S.age-m.a)<=within));
const lastMem=tag=>{const L=memOf(tag);return L[L.length-1]||null};

// ───────── อารมณ์ ─────────
function emo(){try{const a=S.age|0,rec=(tag,y)=>MEM().some(m=>m.tag===tag&&a-m.a<=y);
 if(rec('betray',2))return'anger';if(rec('loss',2))return'grief';if(rec('love',1)||rec('child',1))return'joy';
 const h=S.happy==null?60:S.happy;if(h<30)return'down';if(h>78)return'joy';return'calm'}catch(e){return'calm'}}
const EMO={anger:['😠','โกรธจัด'],grief:['🥀','ยังทำใจไม่ได้'],joy:['😊','ใจเบิกบาน'],down:['😞','ใจหดหู่'],calm:['🍃','ใจสงบ']};
const LOCK={anger:[/อภัย|ยกโทษ|คืนดี|ประนีประนอม|ปล่อย(เขา|เธอ|มัน)?ไป|ไม่ถือสา/,'ใจคุณยังโกรธเกินกว่าจะทำได้'],grief:[/ฉลอง|งานเลี้ยง|เที่ยวเล่น|รื่นเริง|สังสรรค์|เฮฮา/,'ใจคุณยังไม่พร้อมจะรื่นเริง'],down:[/ท้าดวล|ท้าประลอง/,'ใจคุณห่อเหี่ยวเกินกว่าจะท้าใคร']};

// ───────── จับเหตุการณ์จาก log ─────────
const SCN={};let qScene=[];
const DET=[
 ['loss',/(?:^|[^ก-๙])?(พ่อ|แม่|บิดา|มารดา|ท่านพ่อ|ท่านแม่)[^.·]{0,40}?(เสียชีวิต|สิ้นใจ|จากไปอย่างสงบ|จากไปแล้ว|ลาโลก|สิ้นอายุขัย|ตายจาก|สิ้นลม)/,t=>!/ลูก(ชาย|สาว)?ของ|เพื่อน|ศัตรู|คู่แข่ง|ของเขา|ของเธอ/.test(t)],
 ['love',/แต่งงานกับ|เข้าพิธีวิวาห์|สมรสกับ/,()=>true],
 ['child',/(ลูก|บุตร)(ชาย|สาว|คนแรก)?[^.·]{0,20}?(ลืมตาดูโลก|ถือกำเนิด|คลอด)|ให้กำเนิด(ลูก|บุตร)|ได้(ลูก|บุตร)(ชาย|สาว)/,()=>true],
 ['leader',/(ขึ้นเป็น|รับตำแหน่ง|ได้เป็น|สืบทอดตำแหน่ง)(เจ้าสำนัก|ประมุข|ผู้นำ|หัวหน้า|เจ้าเมือง|เจ้านิกาย|ประธาน|ซีอีโอ|CEO)/,()=>true],
 ['betray',/ถูก[^.·]{0,12}(ทรยศ|หักหลัง)|(ทรยศ|หักหลัง)คุณ/,()=>true],
 ['rise',/ทะลวงสู่|บรรลุขั้น|ก้าวข้ามสู่/,(t,c)=>c==='myth'||c==='epic'],
 ['sect',/เข้า(ร่วม)?สำนัก|รับเป็นศิษย์|กราบอาจารย์|เข้านิกาย|ได้เป็นศิษย์/,()=>true],
 ['mercy',/ไว้ชีวิต/,()=>true],
 ['kill',/คุณสังหาร|ปลิดชีพ|สังหาร.{0,10}สำเร็จ/,()=>true]
];
function onLog(t,c){if(busy||!alive())return;const s=strip(t);if(!s)return;
 if((c==='bad'||/บาดเจ็บ|เลือดออก|พิษ|ป่วยหนัก|ถูกทำร้าย|พ่ายแพ้|แพ้/.test(s))&&!/พ่อ|แม่|บิดา|มารดา|ลูก(ชาย|สาว)?|ภรรยา|สามี|คู่ชีวิต|เพื่อน|ศิษย์|อาจารย์|ศัตรู(ของคุณ)?(ตาย|สิ้น)/.test(s)){S.lfBad=S.lfBad||[];S.lfBad.push({a:S.age|0,t:s.slice(0,80)});if(S.lfBad.length>10)S.lfBad.shift()}
 for(const [tag,re,ok] of DET){const m=s.match(re);if(!m||!ok(s,c))continue;
  const who=tag==='loss'?(/แม่|มารดา/.test(m[1])?'แม่':'พ่อ'):'';
  const nm=(String(t).match(/<b[^>]*>([^<]{1,24})<\/b>/)||[])[1]||'';
  const mm=remember(tag,s,{who,nm});if(!mm)continue;
  if(SCN[tag])queue(tag,mm);break}}

// ───────── วันสำคัญ (ฉาก 3 จังหวะ) ─────────
const fx={joy:d=>{try{joy(d)}catch(e){S.happy=Math.max(0,Math.min(100,(S.happy||60)+d))}},karma:d=>{S.karma=(S.karma||0)+d},fame:d=>{S.fame=(S.fame||0)+d},cha:d=>{S.cha=(S.cha||0)+d}};
const early=()=>{const L=MEM().filter(m=>m.a<14);return L[0]||null};
SCN.loss=m=>{const w=m.who||'พ่อ';return{title:`วันที่${w}จากไป`,beats:[
 {sp:'',tx:`ข่าวมาถึงตอนฟ้าเพิ่งสาง\n${w}${m.nm?' '+m.nm:''}จากไปแล้ว`,in:`ครั้งสุดท้ายที่คุยกับ${w}… เราคุยเรื่องอะไรกันนะ`,o:[['รีบกลับไปบ้านทันที','กลับไปทันส่งท่านเป็นคนสุดท้าย',()=>{fx.karma(2);return'home'}],['ขอเวลาอยู่คนเดียวสักพัก','ปล่อยให้น้ำตาไหลจนพอ',()=>{fx.joy(3);return'alone'}]]},
 {sp:'',tx:`ในหีบไม้ข้างเตียง มีของชิ้นเล็กๆ ที่${w}เก็บไว้\nข้างในมีของเล่นไม้ที่${w}เคยแกะให้ตอนคุณยังเด็ก`,in:`${w}เก็บมันไว้ตลอดเลยหรือ`,o:[['เก็บไว้กับตัวตลอดไป','ของที่ระลึก · ใจจะอุ่นขึ้นเมื่อนึกถึง',()=>{fx.joy(4);return'keep'}],['วางไว้ข้าง'+w+' ให้ติดตัวท่านไป','กรรมดี +5',()=>{fx.karma(5);return'give'}]]},
 {sp:'',tx:'ผู้คนมาส่งจนเต็มลาน\nลมพัดเบาๆ ตอนกลบดินแผ่นสุดท้าย',in:`ต่อจากนี้ ข้าต้องเดินต่อเองแล้วสินะ`,o:[['ปิดฉาก','เวลากลับมาเดินตามปกติ',()=>'']]}],
 mem:r=>`${r[0]==='home'?'กลับไปส่ง':'ร้องไห้คนเดียวในวันที่'}${w}จากไป · ${r[1]==='keep'?'เก็บของเล่นไม้ที่'+w+'แกะให้ไว้กับตัว':'วางของเล่นไม้ไว้ข้าง'+w}`}};
SCN.love=m=>({title:'วันวิวาห์',beats:[
 {sp:'',tx:`เช้าวันแต่งงาน${m.nm?'กับ '+m.nm:''}\nเสียงฆ้องกลองดังมาจากลานหน้าบ้าน`,in:'มือเย็นเฉียบ ทั้งที่เคยเผชิญหน้ากับอันตรายมานับครั้งไม่ถ้วน',o:[['แอบไปพบอีกฝ่ายก่อนพิธี','หัวเราะด้วยกันจนหายตื่นเต้น',()=>{fx.joy(4);return'meet'}],['นั่งคุยกับพ่อแม่สักครู่','ได้ฟังเรื่องวันแต่งงานของพวกท่าน',()=>{fx.karma(2);return'parents'}]]},
 {sp:'',tx:'ถึงเวลากล่าวคำสาบานต่อหน้าทุกคน',in:'จะพูดอะไรดี…',o:[['“ไม่ว่าเกิดอะไรขึ้น ข้าจะไม่ทิ้งเจ้า”','คำสาบานนี้จะถูกจดจำ',()=>{fx.cha(2);return'vow'}],['“ข้าจะกลับบ้านมาหาเจ้าทุกคืน”','สัญญาเล็กๆ ที่รักษายาก',()=>{fx.joy(3);return'home'}]]},
 {sp:'',tx:'งานเลี้ยงยาวจนดึก\nโคมแดงแกว่งไหวในลมเย็น',in:'นี่สินะ ที่เขาเรียกว่าบ้าน',o:[['ปิดฉาก','',()=>'']]}],
 mem:r=>`วันแต่งงาน${m.nm?'กับ '+m.nm:''} · ${r[1]==='vow'?'สาบานว่าจะไม่ทิ้งกัน':'สัญญาว่าจะกลับบ้านทุกคืน'}`});
SCN.child=m=>({title:'เสียงร้องแรก',beats:[
 {sp:'',tx:'เสียงร้องดังลั่นออกมาจากห้อง\nคนในบ้านยิ้มกันทั้งที่ยังไม่มีใครพูดอะไร',in:'ตัวเล็กนิดเดียว…',o:[['อุ้มขึ้นมาทันที','มือสั่นแต่ไม่ยอมวาง',()=>{fx.joy(5);return'hold'}],['ยืนมองอยู่ห่างๆ ไม่กล้าแตะ','กลัวจะทำให้เจ็บ',()=>{fx.joy(2);return'look'}]]},
 {sp:'',tx:'คืนนั้นคุณนั่งเฝ้าเปลจนเช้า',in:'จะบอกอะไรกับเจ้าตัวเล็กดี',o:[['“พ่อแม่จะไม่ให้เจ้าลำบากเหมือนที่เคยลำบาก”','',()=>{fx.karma(2);return'protect'}],['“จะสอนทุกอย่างที่รู้ให้เจ้า”','',()=>{fx.cha(1);return'teach'}]]},
 {sp:'',tx:'แสงแรกของวันส่องเข้ามาทางหน้าต่าง',in:'ชีวิตข้าไม่ใช่ของข้าคนเดียวอีกต่อไปแล้ว',o:[['ปิดฉาก','',()=>'']]}],
 mem:r=>`คืนแรกที่ได้เป็นพ่อแม่คน · สัญญาว่า${r[1]==='protect'?'จะไม่ให้ลูกลำบาก':'จะสอนทุกอย่างที่รู้'}`});
SCN.rise=m=>{const e=early();return{title:'ห้วงจิตก่อนทะลวง',beats:[
 {sp:'',tx:'พลังในร่างพุ่งชนคอขวดครั้งแล้วครั้งเล่า\nเส้นลมปราณร้อนราวกับไฟ',in:'ถ้าถอยตอนนี้ ต้องรออีกหลายปี',o:[['ฝืนดันต่อ','เจ็บแต่ภาคภูมิ · ชื่อเสียง +3',()=>{fx.fame(3);return'push'}],['ถอยหายใจ แล้วค่อยๆ ดัน','ใจนิ่งขึ้น',()=>{fx.joy(3);return'calm'}]]},
 {sp:'',tx:e?`ในห้วงจิต ภาพหนึ่งลอยขึ้นมา\nอายุ ${e.a} · ${e.t}`:'ในห้วงจิต คุณเห็นตัวเองตอนเด็ก ยืนมองท้องฟ้ากว้าง',in:'ทำไมภาพนี้ถึงกลับมาตอนนี้นะ',o:[['ยิ้มให้ภาพนั้น แล้วก้าวผ่าน','',()=>{fx.joy(2);return'smile'}],['หยุดดูให้นานขึ้นอีกนิด','',()=>{fx.karma(1);return'stay'}]]},
 {sp:'',tx:'คุณลืมตาขึ้น\nโลกทั้งใบดูชัดกว่าเดิม',in:'ข้าไม่ใช่คนเดิมอีกแล้ว',o:[['ปิดฉาก','',()=>'']]}],
 mem:r=>`${strip(m.t).slice(0,40)} · ${r[0]==='push'?'ฝืนดันจนทะลุ':'ใจนิ่งแล้วค่อยๆ ผ่านไป'}`}};
SCN.leader=m=>{const l=lastMem('loss');return{title:'วันรับตำแหน่ง',beats:[
 {sp:'',tx:'ทุกสายตาจับจ้องมาที่คุณ\nถึงเวลากล่าวต่อหน้าทุกคน',in:'เมื่อก่อนข้าเป็นแค่คนธรรมดาคนหนึ่ง',o:[['กล่าวอย่างยิ่งใหญ่ ประกาศเป้าหมาย','ชื่อเสียง +5',()=>{fx.fame(5);return'big'}],['พูดสั้นๆ ขอบคุณทุกคนที่พามาถึงวันนี้','กรรมดี +3',()=>{fx.karma(3);return'thanks'}]]},
 {sp:'',tx:'คืนแรกในห้องทำงานหลังใหม่\nทุกอย่างเงียบจนได้ยินเสียงเทียน',in:l?`อยากให้${l.who||'พ่อ'}ได้เห็นวันนี้จัง`:'ไม่มีใครบอกเลยว่าที่สูงมันเหงาขนาดนี้',o:[['เขียนจดหมายถึงคนที่บ้าน','',()=>{fx.joy(3);return'letter'}],['นั่งทำงานต่อจนเช้า','',()=>{fx.fame(2);return'work'}]]},
 {sp:'',tx:'รุ่งเช้า มีคนมารอพบคุณเต็มหน้าประตู',in:'เอาละ เริ่มกันเถอะ',o:[['ปิดฉาก','',()=>'']]}],
 mem:r=>`${strip(m.t).slice(0,40)} · ${r[0]==='big'?'ประกาศเป้าหมายอย่างยิ่งใหญ่':'ขอบคุณทุกคนที่พามาถึงวันนี้'}`}};
SCN.betray=m=>({title:'วันที่ถูกหักหลัง',beats:[
 {sp:'',tx:'คนที่คุณไว้ใจที่สุด ยืนอยู่ตรงหน้า\nเขาไม่หลบตา',in:'ทำไม…',o:[['ถามตรงๆ ว่าทำไม','อาจได้ยินสิ่งที่ไม่อยากได้ยิน',()=>{fx.karma(1);return'ask'}],['ไม่พูดอะไร หันหลังเดินออกมา','เก็บทุกอย่างไว้ในใจ',()=>{fx.joy(-2);return'leave'}]]},
 {sp:'',tx:'คืนนั้นคุณนอนไม่หลับ',in:'ต่อไปข้าจะไว้ใจใครได้อีก',o:[['สัญญากับตัวเองว่าจะไม่ไว้ใจใครง่ายๆ อีก','',()=>'guard'],['ยังเชื่อว่าคนดีมีอยู่จริง','',()=>{fx.karma(2);return'trust'}]]},
 {sp:'',tx:'เช้าวันใหม่มาถึงเหมือนทุกวัน',in:'ชีวิตต้องเดินต่อ',o:[['ปิดฉาก','',()=>'']]}],
 mem:r=>`ถูกคนที่ไว้ใจหักหลัง · ${r[1]==='guard'?'สัญญาว่าจะไม่ไว้ใจใครง่ายๆ':'ยังเชื่อว่าคนดีมีอยู่จริง'}`});
const LIM={loss:2,love:2,child:1,rise:3,leader:2,betray:2};
function queue(tag,m){S.lfSc=S.lfSc||{};const n=S.lfSc[tag]||0;if(n>=(LIM[tag]||1))return;if(S.lfLastSc!=null&&S.age-S.lfLastSc<2&&tag!=='loss')return;S.lfSc[tag]=n+1;S.lfLastSc=S.age|0;qScene.push([tag,m]);setTimeout(tryScene,900)}
let scTry=0,cur=null;
function tryScene(){if(cur||!qScene.length||!alive())return;
 let autoOn=false;try{autoOn=!!auto}catch(e){}
 if(autoOn){qScene=[];return}
 let blocked=false;try{blocked=modalOpen||!!choice._cur||!!(window._CO&&window._CO.id)}catch(e){}
 if(blocked){if(++scTry<40)setTimeout(tryScene,1500);else{qScene=[];scTry=0}return}
 scTry=0;const [tag,m]=qScene.shift();const def=SCN[tag](m);cur={tag,m,def,i:0,r:[],was:null};try{cur.was=paused;paused=true}catch(e){}
 try{const L=MEM();const x=L.indexOf(m);if(x>=0)L[x].scene=1}catch(e){}
 drawScene()}
function snapScene(cv){try{const s=$$('scene');if(!s||!cv)return;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;cv.width=s.width;cv.height=s.height;x.drawImage(s,0,0)}catch(e){}}
function drawScene(){const c=cur;if(!c)return;const b=c.def.beats[c.i];
 const dots=c.def.beats.map((_,k)=>`<i class="${k<c.i?'d':k===c.i?'o':''}"></i>`).join('');
 modal(`<div class="lfK"><div class="lfKh"><div><small>วันสำคัญ · อายุ ${S.age|0}</small><h3>${E(c.def.title)}</h3></div><div class="lfKd">${dots}<span>${c.i+1}/${c.def.beats.length}</span></div></div>
 <canvas class="lfKc" width="160" height="56"></canvas>
 <div class="lfKt">${b.sp?`<b>${E(b.sp)}</b>`:''}<p>${E(b.tx)}</p>${b.in?`<p class="lfKi">(ในใจ) ${E(b.in)}</p>`:''}</div>
 <div class="lfKo">${b.o.map((o,k)=>`<button class="opt" data-k="${k}">${E(o[0])}${o[1]?`<small>${E(o[1])}</small>`:''}</button>`).join('')}</div></div>`,'keyday');
 const m=$$('modal');snapScene(m.querySelector('.lfKc'));
 m.querySelectorAll('.lfKo button').forEach(bt=>bt.onclick=()=>{const o=b.o[+bt.dataset.k];let r='';try{r=o[2]()||''}catch(e){}c.r.push(r);c.i++;if(c.i<c.def.beats.length)drawScene();else endScene()})}
let inEnd=0;function endScene(){const c=cur;if(!c)return;cur=null;inEnd=1;try{if($$('modal')&&$$('modal').dataset.k==='keyday')closeM()}catch(e){}inEnd=0;
 const t=c.r.length>=c.def.beats.length-1?c.def.mem(c.r):c.def.title+(c.m.nm?' · '+c.m.nm:'');busy=1;try{const mm=remember(c.tag==='loss'?'loss':c.tag,t,{who:c.m.who,nm:c.m.nm,sc:1});log(`🧠 <b>ความทรงจำใหม่</b> · ${E(t)}`,'sum');try{albumSnap(c.def.title)}catch(e){}}catch(e){}busy=0;
 try{paused=c.was}catch(e){}try{render()}catch(e){}if(qScene.length)setTimeout(tryScene,1200)}

// 🛟 ฉากวันสำคัญถูกหน้าต่างอื่นทับ (ไม่ได้ปิดผ่าน closeM) → เดิมเกมหยุดค้างถาวร (paused ไม่คืน) และฉากต่อไปไม่ขึ้นอีก · ตอนนี้วาดฉากกลับมาเมื่อหน้าต่างอื่นปิด
setInterval(()=>{try{if(!cur)return;if(!alive()){cur=null;return}const k=modalOpen&&$$('modal')?$$('modal').dataset.k:'';if(k==='keyday')return;if(!modalOpen&&!choice._cur)drawScene()}catch(e){}},2000);
// ───────── เสียงในใจทุกปี ─────────
function topPers(){try{const p=S.pers||{};let k=null,v=2;for(const x in p)if(p[x]>v){v=p[x];k=x}return k}catch(e){return null}}
const VO={
 kid:{calm:['วันนี้อยากออกไปวิ่งเล่นริมน้ำอีก','ผู้ใหญ่ชอบคุยเรื่องที่ข้าไม่เข้าใจ','โตขึ้นข้าจะเป็นคนเก่งที่สุดในหมู่บ้าน'],joy:['ไม่มีวันไหนสนุกเท่าวันนี้แล้ว'],down:['ทำไมไม่มีใครฟังข้าเลย'],grief:['บ้านเงียบลงเยอะเลย'],anger:['ข้าจะไม่ยอมใครอีกแล้ว']},
 teen:{calm:['โลกข้างนอกกว้างกว่าที่คิดเยอะ','อยากรู้ว่าตัวเองจะไปได้ไกลแค่ไหน','บางทีก็อยากให้มีคนเข้าใจบ้าง'],joy:['ช่วงนี้ทุกอย่างดูเป็นไปได้ไปหมด'],down:['ทำไมคนอื่นถึงเก่งกว่าข้าทุกเรื่อง'],grief:['ข้ายังไม่ได้พูดหลายเรื่องเลย'],anger:['สักวันพวกมันจะต้องเสียใจ']},
 adult:{calm:['วันเวลาผ่านไปเร็วกว่าที่คิด','ทุกการตัดสินใจมีราคาของมัน','บางคืนก็คิดถึงบ้านเกิด'],joy:['ถ้าชีวิตเป็นแบบนี้ไปตลอดก็คงดี'],down:['ข้ากำลังเดินมาถูกทางจริงหรือ'],grief:['บางคนจากไปโดยที่ข้ายังไม่ได้บอกลา'],anger:['เรื่องนี้ยังไม่จบง่ายๆ']},
 old:{calm:['ผมขาวขึ้นทุกปี แต่ใจยังไม่ยอมแก่','ถ้าย้อนกลับไปได้ ข้าจะเลือกต่างไปไหมนะ','คนรุ่นหลังเก่งขึ้นทุกวัน'],joy:['ชีวิตนี้ไม่เลวเลย'],down:['เวลาที่เหลือมีไม่มากแล้ว'],grief:['คนที่รู้จักเหลือน้อยลงทุกปี'],anger:['ยังมีเรื่องที่ข้าให้อภัยไม่ได้']}};
const VP={kind:['ถ้าช่วยใครได้สักคนวันนี้ก็คงดี'],ruth:['ความอ่อนแอคือสิ่งที่ข้าเกลียดที่สุด'],cun:['ทุกคนมีราคา แค่ต้องหาให้เจอ'],calm:['ไม่ต้องชนะทุกเรื่องก็ได้'],brave:['ถ้าไม่ลอง จะรู้ได้ยังไง']};
function voice(){try{if(!alive())return;const a=S.age|0;if(a<4)return;let cOk=true;try{if(choice._cur||auto)cOk=false}catch(e){}if(!cOk)return;
 if(Math.random()>.42)return;const st=a<12?'kid':a<20?'teen':a<55?'adult':'old',e=emo();
 let line;const r=Math.random(),mem=MEM().filter(m=>a-m.a>=3&&m.tag!=='kill');
 if(mem.length&&r<.22){const m=pick(mem);line=`ยังจำได้ไม่ลืม ตอนอายุ ${m.a} … ${m.t.slice(0,46)}`}
 else if(r<.42&&topPers()&&VP[topPers()])line=pick(VP[topPers()]);
 else line=pick((VO[st][e]||VO[st].calm));
 busy=1;try{addFeed('ev',`<span class="lfIn">💭 ${E(line)}</span>`,'sum')}catch(x){}busy=0}catch(e){}}

// ───────── ผลที่มาช้า ─────────
const HARM=/ฆ่า|สังหาร|ปลิดชีพ|ขโมย|ปล้น|ฉ้อโกง|โกง|หักหลัง|ทรยศ|ทิ้ง(เขา|เธอ|ไว้)|ทรมาน|ทำลาย/,GOOD=/ช่วย(เหลือ)?|ไว้ชีวิต|รับเลี้ยง|บริจาค|แบ่งข้าว|แบ่งให้|รักษาให้|ปกป้อง/;
function seed(kind,t){S.lfSeed=S.lfSeed||[];if(S.lfSeed.length>=10)return;S.lfSeed.push({k:kind,a:S.age|0,at:(S.age|0)+5+Math.floor(Math.random()*8),t:strip(t).slice(0,50)})}
function seeds(){try{const L=S.lfSeed;if(!L||!L.length)return;const a=S.age|0;const i=L.findIndex(x=>a>=x.at);if(i<0)return;const s=L[i];if(Math.random()<.45){s.at=a+1+Math.floor(Math.random()*3);return}L.splice(i,1);
 busy=1;try{let tx;
  if(s.k==='good'){const g=Math.max(10,Math.round((S.money||0)*.05+30*(1+a/20)));S.money=(S.money||0)+g;fx.karma(3);tx=`🌱 <b>ผลจากสิ่งที่ทำตอนอายุ ${s.a}</b> · คนที่คุณเคยช่วย (“${E(s.t)}”) กลับมาตามหา และตอบแทนเป็นเงิน ${typeof fmt==='function'?fmt(g):g}`;remember('repay',`คนที่เคยช่วยตอนอายุ ${s.a} กลับมาตอบแทน`);log(tx,'good')}
  else if(/ขโมย|ปล้น|โกง/.test(s.t)){fx.fame(-5);const l=Math.round((S.money||0)*.08);S.money=Math.max(0,(S.money||0)-l);tx=`⏳ <b>ผลจากสิ่งที่ทำตอนอายุ ${s.a}</b> · เรื่อง “${E(s.t)}” ถูกขุดขึ้นมา ชื่อเสียงเสีย และต้องชดใช้ไปส่วนหนึ่ง`;log(tx,'bad')}
  else if(/ทิ้ง|หักหลัง|ทรยศ/.test(s.t)){fx.joy(-8);tx=`⏳ <b>ผลจากสิ่งที่ทำตอนอายุ ${s.a}</b> · จดหมายฉบับหนึ่งมาถึง จากคนที่คุณเคยทิ้งไว้ข้างหลัง (“${E(s.t)}”)`;remember('regret',`คนที่ทิ้งไว้ตอนอายุ ${s.a} ส่งจดหมายมา`);log(tx,'bad')}
  else{const mh=S.maxHp||100,d=Math.round(mh*.12);S.hp=Math.max(1,(S.hp||mh)-d);tx=`⏳ <b>ผลจากสิ่งที่ทำตอนอายุ ${s.a}</b> · ญาติของคนที่คุณลงมือ (“${E(s.t)}”) ตามหาคุณจนเจอ ปะทะกันจนบาดเจ็บ`;log(tx,'bad')}
 }catch(e){}busy=0}catch(e){}}

// ───────── ตัวเลือก: ความทรงจำ · อารมณ์ · ป้ายผลที่มาช้า ─────────
const CTX=[
 ['loss',/พ่อ|แม่|บิดา|มารดา|ป่วย|ชรา|ผู้เฒ่า|คนแก่|หลุมศพ|ไหว้/,m=>`🕯️ นึกถึง${m.who||'พ่อ'}`,m=>`ตอนอายุ ${m.a} … ${m.t.slice(0,40)}`],
 ['love',/คู่ชีวิต|ภรรยา|สามี|เกี้ยว|ยั่วยวน|นอกใจ|หญิงงาม|ชายรูปงาม|คนรัก/,m=>'💍 นึกถึงวันวิวาห์',m=>m.t.slice(0,44)],
 ['betray',/ไว้ใจ|ศิษย์|ร่วมมือ|ยืมเงิน|ผูกมิตร|สาบาน|ร่วมหุ้น|ฝากของ/,m=>'🛡️ เคยถูกหักหลังมาแล้ว — ระวังไว้ก่อน',m=>`ตอนอายุ ${m.a}`],
 ['child',/เด็ก|ลูก|กำพร้า|ทารก/,m=>'🍼 นึกถึงคืนที่ลูกเกิด',m=>m.t.slice(0,44)],
 ['mercy',/โจร|ศัตรู|คนร้าย|ขอชีวิต|คุกเข่า|ยอมแพ้/,m=>'🕊️ นึกถึงคนที่เคยไว้ชีวิต',m=>`ตอนอายุ ${m.a}`]];
const CAUT=/ปฏิเสธ|ระวัง|ไม่ไว้|ถอย|ไม่รับ|ไม่ยุ่ง|เดินหนี|ตรวจสอบ|ถามให้ชัด/,RISK=/เสี่ยง|บุก|ท้า|ฆ่า|สังหาร|ขโมย/;
function wrapChoice(){const o=window.choice;if(typeof o!=='function'||o._lf)return;
 const w=function(title,text,opts){try{if(alive()&&Array.isArray(opts)&&opts.length&&!opts._lf){
  let autoOn=false;try{autoOn=!!auto}catch(e){}
  const ctx=strip(title)+' '+strip(text);opts=opts.map(op=>{if(!op||typeof op.f!=='function'||op._lfW)return op;const tt=strip(op.t)+' '+strip(op.s||'');
   if(HARM.test(tt)||GOOD.test(tt)){const k=HARM.test(tt)?'harm':'good';const n=Object.create(Object.getPrototypeOf(op));Object.getOwnPropertyNames(op).forEach(p=>{try{Object.defineProperty(n,p,Object.getOwnPropertyDescriptor(op,p))}catch(e){}});
    n._lfW=k;n.s=(op.s?op.s+' · ':'')+(k==='harm'?'⏳ ผลอาจย้อนมาในวันหน้า':'🌱 อาจย้อนมาเป็นบุญ');const f0=op.f;n.f=function(){try{seed(k==='harm'?'harm':'good',op.t)}catch(e){}return f0.apply(this,arguments)};return n}return op});
  if(!autoOn&&opts.length<6&&!opts.some(x=>x&&x._lfM)){for(const [tag,re,lab,sub] of CTX){if(!re.test(ctx))continue;const m=lastMem(tag);if(!m||S.age-m.a<1)continue;
    const base=(tag==='betray'?opts.find(x=>x&&CAUT.test(strip(x.t))):null)||opts.find(x=>x&&!RISK.test(strip(x.t)+' '+strip(x.s||'')))||opts[0];if(!base||typeof base.f!=='function')break;
    const bf=base.f;opts=opts.concat([{t:lab(m),s:`จากความทรงจำ · ${sub(m)} · ใจคุณเลือกทาง “${strip(base.t).slice(0,30)}”`,_lfM:1,f(){busy=1;try{fx.joy(3);addFeed('ev',`<span class="lfIn">💭 ความทรงจำเมื่ออายุ ${m.a} ทำให้ใจคุณนิ่งพอจะเลือก</span>`,'sum')}catch(e){}busy=0;return bf.apply(base,arguments)}}]);break}}
  opts._lf=1}}catch(e){console.error('lfChoice',e)}
  return o.call(this,title,text,opts)};
 Object.assign(w,o);w._lf=1;window.choice=w;try{choice=w}catch(e){}}
function decorate(){try{const c=choice._cur,m=$$('modal');if(!c||!m||m.dataset.k!=='choice'||m.querySelector('.lfEmo'))return;
 const e=emo(),h=m.querySelector('h3');if(h)h.insertAdjacentHTML('beforebegin',`<span class="lfEmo lfE-${e}">${EMO[e][0]} อารมณ์ตอนนี้: <b>${EMO[e][1]}</b></span>`);
 let autoOn=false;try{autoOn=!!auto}catch(x){}
 const L=LOCK[e];const btn=i=>m.querySelector(`.opt[data-i="${i}"]`);
 if(L&&!autoOn){const idx=c.opts.map((o,i)=>i).filter(i=>c.opts[i]&&L[0].test(strip(c.opts[i].t)));const free=c.opts.length-idx.length;
  if(idx.length&&free>=2)idx.forEach(i=>{const o=c.opts[i];o.skip=1;o._lfL=1;const b=btn(i);if(b){b.disabled=true;b.classList.add('lfLock');b.insertAdjacentHTML('beforeend',`<small class="lfLk">🔒 ${L[1]} · รอให้ใจสงบก่อน</small>`)}})}
 c.opts.forEach((o,i)=>{const b=btn(i);if(!b||!o)return;if(o._lfM)b.classList.add('lfMem');else if(o._lfW==='harm')b.classList.add('lfLate');else if(o._lfW==='good')b.classList.add('lfGood')})}catch(e){console.error('lfDeco',e)}}

// ───────── สมุดภาพตอนจบ ─────────
const CT={sect:m=>'เข้าสู่สำนัก',loss:m=>`วันที่${m.who||'พ่อ'}จากไป`,love:m=>`วันวิวาห์${m.nm?'กับ '+m.nm:''}`,child:m=>'เป็นพ่อแม่คน',leader:m=>'วันรับตำแหน่ง',betray:m=>'ถูกหักหลัง',rise:m=>strip(m.t).replace(/^.*?(ทะลวงสู่|บรรลุขั้น|ก้าวข้ามสู่)/,'$1').slice(0,22),repay:m=>'บุญที่ย้อนกลับมา',regret:m=>'จดหมายจากอดีต'};
const PRI={loss:9,love:8,child:7,leader:7,betray:7,sect:6,rise:5,regret:4,repay:3};
function chapters(){const L=MEM().filter(m=>CT[m.tag]);const pickd=L.slice().sort((a,b)=>(PRI[b.tag]||0)-(PRI[a.tag]||0)).slice(0,6).sort((a,b)=>a.a-b.a);
 const alb=S.album||[];const img=a=>{let best=null;alb.forEach(p=>{if(p.a<=a+1&&(!best||p.a>best.a))best=p});return best?best.u:''};
 const ch=[{a:0,t:'วัยเด็ก',d:(L.find(m=>m.a<12)||{}).t||'เติบโตขึ้นมาในบ้านเกิด',u:alb[0]?alb[0].u:''}];
 pickd.forEach(m=>{if(ch.length&&ch[ch.length-1].a===m.a)return;ch.push({a:m.a,t:CT[m.tag](m),d:m.t,u:img(m.a)})});return ch}
function causes(){const B=(S.lfBad||[]).filter(x=>S.age-x.a<=20).slice(-3);const out=B.map(x=>`<li><b>อายุ ${x.a}</b> ${E(x.t)}</li>`);if(S.deathCause)out.push(`<li><b>อายุ ${S.age|0}</b> ${E(strip(S.deathCause))}</li>`);return out}
function regrets(){const r=[];const M=MEM();
 if(!S.spouse)r.push('ไม่เคยได้แต่งงานกับใคร');
 M.filter(m=>m.tag==='regret').slice(-2).forEach(m=>r.push(m.t));
 if(M.some(m=>m.tag==='betray')&&!M.some(m=>m.tag==='betray'&&/ถามตรงๆ|คนดี/.test(m.t)))r.push('ไม่เคยได้รู้ว่าทำไมคนคนนั้นถึงหักหลัง');
 const L=M.filter(m=>m.tag==='loss'&&/ร้องไห้คนเดียว/.test(m.t));if(L.length)r.push(`ไม่ได้กลับไปส่ง${L[0].who||'พ่อ'}เป็นครั้งสุดท้าย`);
 (S.lfSeed||[]).filter(s=>s.k==='harm').slice(0,1).forEach(s=>r.push(`เรื่องตอนอายุ ${s.a} ยังไม่มีใครมาทวงถาม`));
 return r.slice(0,4)}
window._lfBook=function(){try{const C=chapters();let i=Math.min(1,C.length-1);
 const draw=()=>{const c=C[i];const ca=causes(),rg=regrets(),om=MEM().filter(m=>m.tag!=='kill').slice(-6);
  modal(`<button class="xbtn" onclick="closeM()">✕</button><div class="lfB"><div class="lfBh"><small>อายุ ${S.age|0} ปี</small><h3>${E(S.name||'')}${S.epithet?' — '+E(strip(S.epithet)):''}</h3></div>
  <div class="lfBw"><nav class="lfBn">${C.map((x,k)=>`<button data-k="${k}" class="${k===i?'on':''}"><small>บทที่ ${k+1} · อายุ ${x.a}</small><b>${E(x.t)}</b></button>`).join('')}</nav>
  <div class="lfBm"><div class="lfBp">${c.u?`<img src="${c.u}" alt="">`:'<span>ไม่มีภาพของช่วงนี้</span>'}</div><p>${E(c.d)}</p></div></div>
  ${ca.length?`<div class="lfBx lfBr"><h4>ทางที่พาไปสู่วันสุดท้าย</h4><ol>${ca.join('')}</ol></div>`:''}
  ${rg.length?`<div class="lfBx"><h4>สิ่งที่ยังค้างในใจ</h4><ul>${rg.map(x=>`<li>${E(x)}</li>`).join('')}</ul></div>`:''}
  ${om.length?`<div class="lfBx lfBg"><h4>ส่งต่อไปชาติหน้า</h4><p class="tag2">เลือกความทรงจำ 1 อย่าง ให้ติดไปเป็นลางสังหรณ์ในชีวิตถัดไป</p>${om.map((m,k)=>`<button class="lfOm" data-o="${k}">อายุ ${m.a} · ${E(m.t.slice(0,60))}</button>`).join('')}</div>`:''}</div>`,'lfbook');
  const md=$$('modal');md.querySelectorAll('.lfBn button').forEach(b=>b.onclick=()=>{i=+b.dataset.k;draw()});
  md.querySelectorAll('.lfOm').forEach(b=>b.onclick=()=>{const m=om[+b.dataset.o];LSS('murim_omen',{t:m.t,a:m.a,n:S.name||''});md.querySelectorAll('.lfOm').forEach(x=>x.classList.toggle('on',x===b));try{toast('🔮 ความทรงจำนี้จะติดไปกับชีวิตถัดไป')}catch(e){}})};draw()}catch(e){console.error('lfBook',e)}};
function endCard(){try{const E0=$$('end');if(!E0||E0.querySelector('.lfEnd'))return;const ca=causes();
 const d=document.createElement('div');d.className='lfEnd';
 d.innerHTML=`${ca.length?`<div class="lfBr"><b>ทางที่พาไปสู่วันสุดท้าย</b><ol>${ca.join('')}</ol></div>`:''}<button class="pbtn" type="button">📖 เปิดสมุดภาพชีวิตนี้</button>`;
 d.querySelector('button').onclick=()=>window._lfBook();
 const h=E0.querySelector('h2,h3,.big');(h||E0.firstElementChild||E0).insertAdjacentElement(h?'afterend':'afterbegin',d)}catch(e){console.error('lfEnd',e)}}
function omen(){try{if(!alive()||S._lfOm||(S.age|0)<8)return;S._lfOm=1;const o=LSG('murim_omen',null);if(!o||!o.t)return;LSS('murim_omen',null);
 busy=1;try{log(`🔮 <b>ลางสังหรณ์</b> · บางคืนคุณฝันเห็นภาพที่ไม่เคยเกิดขึ้นกับตัวเอง… “${E(o.t.slice(0,60))}” ตื่นมาใจหายวาบทุกครั้ง`,'sum');remember('omen',`ฝันถึงชีวิตก่อน: ${o.t.slice(0,50)}`)}catch(e){}busy=0}catch(e){}}

// ───────── ลดความงง: เมนูเด็ก · อธิบายตัวเลข ─────────
const KEEP=/ใช้บ่อย|ตั้งค่า|ช่วยเหลือ|อื่นๆ/;
function kidMenu(){try{const m=$$('modal');if(!m||m.dataset.k!=='menu'||!alive()||(S.age|0)>=12||LSG('murim_lfAll',0)||m.querySelector('.lfKid'))return;
 const hs=[...m.querySelectorAll('.mcat15>h4.mch15')];let n=0;hs.forEach(h=>{if(KEEP.test(h.textContent))return;let e=h;do{e.classList.add('lfHide');e=e.nextElementSibling}while(e&&!e.matches('h4.mch15'));n++});
 m.querySelectorAll('.mnSide button').forEach(b=>{if(!KEEP.test(b.textContent))b.classList.add('lfHide')});
 if(!n)return;const note=document.createElement('div');note.className='lfKid';note.innerHTML=`🌱 ตอนนี้ยังเด็ก เมนูโชว์เฉพาะที่ใช้ได้ ระบบอื่นจะเปิดเองเมื่ออายุ 12 <button type="button">แสดงทั้งหมด</button>`;
 note.querySelector('button').onclick=()=>{LSS('murim_lfAll',1);m.querySelectorAll('.lfHide').forEach(x=>x.classList.remove('lfHide'));note.remove()};
 const cat=m.querySelector('.mcat15');(cat||m).insertAdjacentElement('beforebegin',note)}catch(e){}}
const STAT=[[/พลังชีวิต/,'พลังชีวิต','ลดเมื่อบาดเจ็บหรือป่วย ถ้าหมดอาจตาย · ฟื้นเองทุกปี หรือใช้ยาในกระเป๋า'],[/พลังรวม/,'พลังรวม','ความแข็งแกร่งโดยรวม ใช้ตัดสินแพ้ชนะและการทะลวงขั้น · เพิ่มจากการฝึกและวิชา'],[/อายุขัย/,'อายุขัย','อายุที่คาดว่าจะอยู่ได้ ทะลวงขั้นสูงขึ้นจะอยู่ได้นานขึ้น'],[/ลมปราณ/,'ลมปราณ','พลังภายใน ใช้ฝึกวิชาและทะลวงขั้น · ได้จากโฟกัส “ลมปราณ”'],[/ปัญญา/,'ปัญญา','ช่วยเรียนวิชาเร็วขึ้น และเปิดตัวเลือกฉลาดๆ ในเหตุการณ์'],[/เสน่ห์/,'เสน่ห์','ทำให้คนชอบคุณ ช่วยเรื่องความรัก การเจรจา และหาคู่'],[/ชื่อเสียง/,'ชื่อเสียง','คนรู้จักคุณมากแค่ไหน · สูงแล้วได้ตำแหน่งง่าย แต่ศัตรูก็มากขึ้น'],[/กรรม/,'กรรม','บวก = ทำดีมาก ช่วงท้ายชีวิตมีเรื่องดีย้อนมา · ลบ = มีเรื่องร้ายตามมา'],[/ความสุข/,'ความสุข','ต่ำนานๆ จะป่วยง่ายและอารมณ์หดหู่ (ล็อกบางตัวเลือก) · เพิ่มได้จากครอบครัวและการพัก'],[/ตำลึง|หินวิญญาณ|เงิน/,'เงิน','ใช้ซื้อของ ยา อาวุธ และจ่ายค่าเรียน'],[/ชนะศึก/,'ชนะศึก','จำนวนครั้งที่ชนะการต่อสู้ในชีวิตนี้']];
document.addEventListener('click',ev=>{try{const c=ev.target.closest&&ev.target.closest('.stats>*');if(!c||ev.target.closest('button,a'))return;const tx=c.textContent;const s=STAT.find(x=>x[0].test(tx));if(!s)return;
 if(typeof island==='function')island({big:1,key:'lfst'+s[1],ic:'ℹ️',h:s[1],t:s[2],kind:'info',ms:5200,now:1});else toast(s[1]+': '+s[2])}catch(e){}},true);

// ───────── เสียบเข้ากับเกม ─────────
const after=(name,fn)=>{try{const o=window[name];if(typeof o!=='function'||o['_lf_'+name])return;const w=function(){const r=o.apply(this,arguments);try{fn.apply(this,arguments)}catch(e){}return r};try{Object.assign(w,o)}catch(e){}w['_lf_'+name]=1;window[name]=w}catch(e){}};
after('log',(t,c)=>onLog(t,c));
after('passYear',()=>{voice();seeds();omen();if(qScene.length&&!cur)setTimeout(tryScene,600)});
after('choiceShow',()=>decorate());
after('openMenu',()=>{setTimeout(kidMenu,60);setTimeout(kidMenu,400)});
after('endGame',()=>{setTimeout(endCard,300);setTimeout(endCard,1200)});
{const o=window.closeM;if(typeof o==='function'&&!o._lf){const w=function(){const k=($$('modal')||{}).dataset?$$('modal').dataset.k:'';const r=o.apply(this,arguments);try{if(cur&&!inEnd&&k==='keyday')endScene()}catch(e){}return r};Object.assign(w,o);w._lf=1;window.closeM=w}}
{const o=window.choiceRun;if(typeof o==='function'&&!o._lf){const w=function(i){try{const c=choice._cur;if(c&&c.opts[i]&&c.opts[i]._lfL&&modalOpen){toast('🔒 ใจคุณยังเลือกทางนี้ไม่ได้');return}}catch(e){}return o.apply(this,arguments)};Object.assign(w,o);w._lf=1;window.choiceRun=w}}
wrapChoice();setTimeout(wrapChoice,3000);

// ───────── สไตล์ ─────────
const st=document.createElement('style');st.textContent=`
.lfIn{font-style:italic;color:#9fb6ff;opacity:.95}
#modal .lfEmo{display:inline-block;margin:0 0 6px;padding:3px 10px;border-radius:999px;font-size:12.5px;border:1px solid #fff3}
.lfE-anger{background:#4a1c24;border-color:#c4505a!important}.lfE-grief{background:#1c2a4a;border-color:#5a7ac4!important}.lfE-joy{background:#3a3010;border-color:#e8b54a!important}.lfE-down{background:#2a2a32;border-color:#888!important}.lfE-calm{background:#1c3a2c;border-color:#4aa070!important}
#modal .opt.lfMem{border-color:#8fb0ff!important;background:linear-gradient(180deg,#1d2c64,#16224e)!important;color:#eaf0ff!important}
#modal .opt.lfLock{opacity:.6;border-style:dashed!important;cursor:not-allowed}#modal .opt .lfLk{color:#ff9b9b!important}
#modal .opt.lfLate small{color:#ffc49a}#modal .opt.lfGood small{color:#9fe0b8}
.lfK h3{margin:2px 0 0;font-size:24px}.lfKh{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;margin-bottom:10px}.lfKh small{opacity:.7;font-size:12.5px}
.lfKd{display:flex;gap:5px;align-items:center;font-size:12px;opacity:.85}.lfKd i{width:22px;height:5px;border-radius:9px;background:#fff3}.lfKd i.d{background:#e8b54a}.lfKd i.o{background:#ffe29a}.lfKd span{margin-left:4px}
.lfKc{display:block;width:100%;aspect-ratio:160/56;height:auto;image-rendering:pixelated;border-radius:12px;background:#0006;margin-bottom:10px}
.lfKt{padding:12px 14px;border-radius:14px;border:1px solid #e8b54a66;background:#0003;margin-bottom:10px}.lfKt p{margin:0;white-space:pre-line;font-size:16px;line-height:1.7}.lfKt .lfKi{margin-top:8px;font-size:14px;font-style:italic;color:#9fb6ff}
.lfKo{display:flex;flex-direction:column;gap:8px}
.lfB h3{margin:2px 0 10px}.lfBh small{opacity:.7}
.lfBw{display:flex;gap:12px;flex-wrap:wrap}.lfBn{flex:1 1 200px;display:flex;flex-direction:column;gap:6px}.lfBn button{font:inherit;text-align:left;padding:8px 12px;border-radius:12px;border:1px solid #fff3;background:#0003;color:inherit;cursor:pointer}.lfBn button small{display:block;opacity:.7;font-size:11.5px}.lfBn button.on{background:linear-gradient(180deg,#ffe29a,#e8b54a);color:#1d1405;border-color:#e8b54a}
.lfBm{flex:2 1 300px;min-width:0}.lfBp{border-radius:12px;background:#0004;min-height:110px;display:flex;align-items:center;justify-content:center;overflow:hidden}.lfBp img{width:100%;image-rendering:pixelated;display:block}.lfBp span{opacity:.6;font-size:13px}.lfBm p{margin:8px 0 0;line-height:1.6}
.lfBx{margin-top:12px;padding:10px 14px;border-radius:14px;border:1px solid #fff3;background:#0003}.lfBx h4{margin:0 0 6px}.lfBx ol,.lfBx ul{margin:0;padding-left:20px;line-height:1.6}
.lfBr{border-color:#c4505a88!important;background:#3a1c2433!important}.lfBg{border-color:#4aa07088!important}
.lfOm{display:block;width:100%;text-align:left;font:inherit;font-size:13.5px;margin-top:6px;padding:8px 12px;border-radius:10px;border:1px solid #fff3;background:#0003;color:inherit;cursor:pointer}.lfOm.on{border-color:#4aa070;background:#1c3a2c}
.lfEnd{margin:10px 0;padding:12px 14px;border-radius:14px;border:1px solid #c4505a88;background:#3a1c2422}.lfEnd ol{margin:6px 0 10px;padding-left:20px;line-height:1.6}.lfEnd .pbtn{width:100%}
.lfKid{margin:6px 0 10px;padding:10px 12px;border-radius:12px;border:1px dashed #4aa070;background:#1c3a2c33;font-size:13.5px;line-height:1.5}.lfKid button{margin-left:6px;font:inherit;font-size:12.5px;padding:4px 10px;border-radius:999px;border:1px solid #4aa070;background:transparent;color:inherit;cursor:pointer}
#modal[data-k="keyday"] .xbtn{display:none!important}
#modal .lfHide,.mnSide .lfHide{display:none!important}
.stats>*{cursor:help}
`;document.head.appendChild(st);
window._lf={mem:()=>MEM(),emo,remember,queue,tryScene,voice,seeds,chapters};
})()}catch(e){console.error('life',e)}
wReady('life');
