// 🌍 ไฟล์โลก "mwx" — แยกจาก app.js ด้วย tools/split-out.mjs · โหลดผ่าน wLoad('mwx') (BLOCK 117)
// ⚠️ แก้โค้ดของโลกนี้ที่ไฟล์นี้เท่านั้น · ห้ามประกาศชื่อระดับบนสุดใหม่นอกฟังก์ชัน

// ---- ท่อน mwx1 (เดิมอยู่ app.js บรรทัด 11924) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx1'];
(function(){const st=document.createElement('style');st.textContent=`
.mwseg{position:relative;opacity:.92;background:linear-gradient(90deg,#2a1050,#4a1a70,#2a1050)!important;background-size:200% 100%!important;color:#ffd0f0!important;animation:mwBg 3s linear infinite;overflow:hidden}
.mwseg i{display:block;font-style:normal;font-size:9.5px;font-weight:900;letter-spacing:1px;color:#2af0ff;text-shadow:0 0 6px #2af0ff;animation:mwBlink 1.4s ease-in-out infinite}
.mwseg:after{content:'';position:absolute;top:0;bottom:0;width:35%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);animation:mwShine 2.8s ease-in-out infinite}
@keyframes mwBg{to{background-position:200% 0}}@keyframes mwBlink{50%{opacity:.45}}@keyframes mwShine{0%{left:-50%}60%,100%{left:130%}}
.mwbox{margin:-16px -16px -16px;padding:16px;border-radius:8px;background:radial-gradient(ellipse at 50% 0,#3a1470,#120828 70%);color:#f4e8ff;text-align:center}
.mwcs{display:inline-block;font-size:10.5px;font-weight:900;letter-spacing:3px;color:#120828;background:linear-gradient(90deg,#2af0ff,#ff3aa8,#ffe040,#2af0ff);background-size:300% 100%;border-radius:999px;padding:2px 10px;animation:mwBg 3s linear infinite}
.mwh{letter-spacing:1px;background:linear-gradient(90deg,#fff,#ff9ad8,#2af0ff,#fff);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:mwBg 4s linear infinite;filter:drop-shadow(0 0 10px rgba(255,90,200,.5))}
.mwsub{font-size:12px;opacity:.75;margin-bottom:10px}
.mwcv{position:relative;border-radius:10px;overflow:hidden;border:2px solid #ff3aa8;box-shadow:0 0 18px rgba(255,58,168,.45),0 0 0 1px #2af0ff inset}.mwcv canvas{display:block;width:100%;image-rendering:pixelated}
.mwcap{position:absolute;left:0;right:0;bottom:0;padding:8px 10px;font-size:13.5px;font-weight:700;text-shadow:0 2px 4px #000;background:linear-gradient(transparent,rgba(10,4,30,.85));min-height:20px}
.mwfeat{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0;text-align:left}.mwfeat div{background:rgba(255,255,255,.06);border:1px solid rgba(255,90,200,.35);border-radius:9px;padding:6px 8px;opacity:0;animation:mwIn .45s ease-out forwards}.mwfeat b{display:block;font-size:12.5px;color:#fff}.mwfeat span{font-size:11px;opacity:.75}
@keyframes mwIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.mwq{font-size:14px;font-style:italic;margin:10px 4px;line-height:1.6}.mwq b{color:#ffe040}
.mwbtn{border:0;border-radius:999px;padding:11px 22px;font-weight:900;font-size:14.5px;color:#120828;background:linear-gradient(90deg,#2af0ff,#ff9ad8);box-shadow:0 0 16px rgba(42,240,255,.5);cursor:pointer;animation:mwPulse 2s ease-in-out infinite}.mwbtn.on{background:linear-gradient(90deg,#6ad06a,#c0ff9a);animation:none}
@keyframes mwPulse{50%{transform:scale(1.04);box-shadow:0 0 26px rgba(255,90,200,.7)}}
.mwn{font-size:12px;margin-top:6px;opacity:.85;min-height:16px}.mwft{font-size:11.5px;opacity:.7;margin-top:8px}
.mwend{margin:14px 0 4px;padding:10px 12px;border-radius:10px;background:linear-gradient(120deg,#2a1050,#120828);color:#f4e8ff;border:2px solid #ff3aa8;text-align:center;animation:mwIn .6s both}.mwend div{font-size:12.5px;opacity:.85}.mwend b{display:block;margin:6px 0 8px;color:#2af0ff}
.mwupd{display:block;margin:6px 0 12px;padding:9px 12px;border-radius:10px;cursor:pointer;background:linear-gradient(120deg,#2a1050,#4a1a70,#120828);background-size:200% 100%;animation:mwBg 5s linear infinite;color:#f4e8ff;border:2px solid #ff3aa8;box-shadow:0 0 12px rgba(255,58,168,.35)}.mwupd b{display:block;margin-top:4px;font-size:14px}.mwupd small{opacity:.8}`;document.head.appendChild(st)})();
})();

// ---- ท่อน mwx2 (เดิมอยู่ app.js บรรทัด 15374) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx2'];let render=SL.base.render;
{const _rnW=render;render=function(){const r=_rnW.apply(this,arguments);try{if(!mwOn()){const h=$('mwHud');if(h)h.remove();const gb=$('goalBox');if(gb&&gb.style.display==='none')gb.style.display='';return r}const M=S.mw,fe=$('focus');
 if(fe){fe.innerHTML=MW_FOC.map(f=>`<button class="fc ${S.focus===f[0]?'on':''}" ${focusOK(f[0])?'':'disabled'} onclick="setFocus('${f[0]}')">${f[1]} ${f[2]}</button>`).join('');
  let h=$('mwHud');if(!h){h=document.createElement('div');h.id='mwHud';fe.parentNode.insertBefore(h,fe)}
  const bar=(ic,n,v,col,max)=>`<div class="mwh1"><span>${ic} ${n}</span><b>${max?Math.round(v):fmt(v)}${max?'/'+max:''}</b>${max?`<i style="width:${Math.min(100,v/max*100)}%;background:${col}"></i>`:''}</div>`;
  h.innerHTML=`<div class="mwhT">🏙️ กรุงเทพฯ · ค.ศ. ${MW_Y0+M.y} · ปีที่ ${M.y} ในยุคนี้ <span class="tag2">${mwTag()}</span></div><div class="mwhG">${bar('🤫','ความลับรั่ว',M.sec,M.sec>=60?'#ff4a5a':'#e8a23a',100)}${bar('🏙️','ความคุ้นเคย',M.adapt,'#4ab0ff',100)}${bar('📈','ผู้ติดตาม',M.fame)}${bar('🌀','ปราณ',M.qi)}${M.linMet?bar('🧒','หลิน',M.lin,'#6ad08a',100):''}</div>`}
 const gb=$('goalBox');if(gb)gb.style.display='none'; const gr=$('gRealm');if(gr)gr.textContent=`ยอดฝีมือหลงยุค · อดีต${M.past.realm||''}`}catch(e){console.error(e)}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx3 (เดิมอยู่ app.js บรรทัด 15383) · ห่อ: choice ----
(function(){const SL=globalThis.__wSlots['mwx3'];let choice=SL.base.choice;
{const _chW=choice;choice=function(title,text,opts){if(mwAllowed()&&/รอยแยกสู่อนาคต/.test(String(title||''))&&Array.isArray(opts)&&opts[0]&&!S.mw){opts=opts.slice();opts[0]={t:'👣 ก้าวเข้าไปในรอยแยก'+(admK()&&!MW_PUBLIC?' (แอดมิน: เข้ายุคปัจจุบัน)':' · สู่ยุคปัจจุบัน'),s:'เก็บวิชาไว้ แต่พลังจะเหลือเพียงเล็กน้อย',f(){setTimeout(()=>mwEnter('rift'),300)}}}return _chW.call(this,title,text,opts)};Object.keys(_chW).forEach(k=>{try{choice[k]=_chW[k]}catch(e){}});
 try{Object.defineProperty(choice,'_cur',{get(){return _chW._cur},set(v){_chW._cur=v},configurable:true});Object.defineProperty(choice,'_min',{get(){return _chW._min},set(v){_chW._min=v},configurable:true})}catch(e){}}
SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};})();

// ---- ท่อน mwx4 (เดิมอยู่ app.js บรรทัด 15386) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx4'];let openMenu=SL.base.openMenu;
{const _omW=openMenu;openMenu=function(){const r=_omW.apply(this,arguments);try{if(!mwAllowed()||!S||!S.alive)return r;const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('.mwadmB'))gd.insertAdjacentHTML('afterbegin',S.mw?`<button class="opt mwadmB" onclick="mwInfo()">🏙️ ยุคปัจจุบัน<small>ดูสถานะองก์แรก</small></button>`:`<button class="opt mwadmB" onclick="mwAsk()">🌀 หลงยุคสู่ปี ${MW_Y0}<small>${admK()&&!MW_PUBLIC?'แอดมิน · ทดสอบยุคปัจจุบัน':'ยุคปัจจุบัน · เบต้า'}</small></button>`)}catch(e){}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx5 (เดิมอยู่ app.js บรรทัด 15513) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx5'];let mwYear=SL.base.mwYear;
{const _myR=mwYear;mwYear=function(){const r=_myR.apply(this,arguments);try{if(S&&S.alive&&S.mw)mwRnd()}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx6 (เดิมอยู่ app.js บรรทัด 15515) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx6'];let mwEnter=SL.base.mwEnter;
{const _meR=mwEnter;mwEnter=function(){const r=_meR.apply(this,arguments);try{if(S.mw&&!S.mw.hum){S.mw.hum=1;S.mw.end=Math.max(S.age+20,R(85,110))}}catch(e){}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx7 (เดิมอยู่ app.js บรรทัด 15517) · ห่อ: regTry, checkDeath ----
(function(){const SL=globalThis.__wSlots['mwx7'];let regTry=SL.base.regTry;let checkDeath=SL.base.checkDeath;
{const _cdR=checkDeath;checkDeath=function(){try{if(mwOn()&&S.alive&&!S.deathCause&&S.age>=S.mw.end){const M=S.mw,with_=M.linMet&&M.lin>=40?(M.fl.linK?' หลินและหลานสาวกุมมืออยู่ข้างๆ':' หลินกุมมืออยู่ข้างๆ'):'';
 S.deathCause=(!M.dieAt&&M.native&&window._dvPick&&window._dvPick('mw'))||(M.dieAt==='roof'?'หลับไปบนดาดฟ้าตึกเก่าใจกลางกรุงเทพฯ ใต้แสงไฟเมืองที่ไม่เคยดับ':M.dieAt==='temple'?'สิ้นลมในท่านั่งสมาธิที่วัดบนดอย ลมหายใจสุดท้ายเต็มไปด้วยปราณ':'จากไปอย่างสงบด้วยวัยชราในยุคที่ไม่ใช่ยุคของตัวเอง')+(M.native?'':with_);
 try{keyAdd(`ใช้ชีวิตในยุคปัจจุบัน ${M.y} ปี`)}catch(e){}}}catch(e){}
 if(!mwOn())return _cdR.apply(this,arguments);
 // ยุคปัจจุบัน: ไม่มีระบบชุบชีวิต/ย้อนเวลาช่วยพ้นความตาย
 const sy=S.sys,nd=S._ndSys,rg=typeof regTry==='function'?regTry:null;S.sys=null;S._ndSys=1;if(rg)regTry=()=>false;let r;try{r=_cdR.apply(this,arguments)}finally{if(rg)regTry=rg;if(S&&S.alive){S.sys=sy;S._ndSys=nd}}return r}}
SL.impl.regTry=regTry;regTry=function(){return globalThis.regTry.apply(this,arguments)};SL.impl.checkDeath=checkDeath;checkDeath=function(){return globalThis.checkDeath.apply(this,arguments)};})();

// ---- ท่อน mwx8 (เดิมอยู่ app.js บรรทัด 15589) · ห่อ: choice ----
(function(){const SL=globalThis.__wSlots['mwx8'];let choice=SL.base.choice;
{const _chC=choice;choice=function(title,text,opts){if(mwOn()&&mwCC().m||mwOn()&&mwCC().lin!=='หลิน'){title=mwLoc(title);text=mwLoc(text);if(Array.isArray(opts))opts=opts.map(o=>o?Object.assign({},o,{t:mwLoc(o.t),s:mwLoc(o.s)}):o)}return _chC.call(this,title,text,opts)};for(const k of Object.keys(_chC))try{choice[k]=_chC[k]}catch(e){}}
SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};})();

// ---- ท่อน mwx9 (เดิมอยู่ app.js บรรทัด 15591) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx9'];let mwEnter=SL.base.mwEnter;
{const _meC=mwEnter;mwEnter=function(how,cc){const r=_meC.apply(this,arguments);try{if(S.mw&&!S.mw.cc){const k=cc||window._mwCC;S.mw.cc=MW_CC[k]?k:ch(Object.keys(MW_CC));window._mwCC=null;const C=mwCC();addFeed('ev',`${C.f} คุณตื่นขึ้นในประเทศ<b>${C.n}</b> — เมือง${C.city} ปี ${MW_Y0}`,'sum');render();saveGame()}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx10 (เดิมอยู่ app.js บรรทัด 15594) · ห่อ: mwAsk ----
(function(){const SL=globalThis.__wSlots['mwx10'];let mwAsk=SL.base.mwAsk;
mwAsk=function(){modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🌀 หลงยุคสู่ปี ${MW_Y0}</h3><p><b>${esc(S.name)}</b> จะข้ามไปยุคปัจจุบัน พร้อมความทรงจำและวิชาทั้งหมด แต่พลังเหลือราว 1 ใน 100 เพราะปราณเบาบาง</p><p class="tag2">${mwTag()} · ชีวิตนี้จะไม่ขึ้นทำเนียบ · ย้อนกลับไม่ได้</p><div class="brow"><button class="gbtn" onclick="closeM()">ยกเลิก</button><button class="pbtn" onclick="closeM();setTimeout(()=>mwPickCC(()=>mwEnter('menu',window._mwCC)),150)">ข้ามยุค</button></div>`,'mwask')};
SL.impl.mwAsk=mwAsk;mwAsk=function(){return globalThis.mwAsk.apply(this,arguments)};})();

// ---- ท่อน mwx11 (เดิมอยู่ app.js บรรทัด 15595) · ห่อ: mwNewLost ----
(function(){const SL=globalThis.__wSlots['mwx11'];let mwNewLost=SL.base.mwNewLost;
{const _nlC=mwNewLost;mwNewLost=function(){if(window._mwPicked){window._mwPicked=0;const k=window._mwCC;_nlC.apply(this,arguments);window._mwCC=k;return}closeM();setTimeout(()=>mwPickCC(()=>{window._mwPicked=1;mwNewLost()}),150)}}
SL.impl.mwNewLost=mwNewLost;mwNewLost=function(){return globalThis.mwNewLost.apply(this,arguments)};})();

// ---- ท่อน mwx12 (เดิมอยู่ app.js บรรทัด 15597) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx12'];let render=SL.base.render;
{const _rnC=render;render=function(){const r=_rnC.apply(this,arguments);try{if(mwOn()){const C=mwCC(),t=document.querySelector('#mwHud .mwhT');if(t&&C.city!=='กรุงเทพฯ')t.innerHTML=t.innerHTML.replace('🏙️ กรุงเทพฯ',`${C.f} ${C.city}`);else if(t)t.innerHTML=t.innerHTML.replace('🏙️ กรุงเทพฯ',`${C.f} กรุงเทพฯ`);
 const fe=$('focus');if(fe&&C.lin!=='หลิน'){const b=fe.querySelector('[onclick*="mwlin"]');if(b)b.innerHTML=`🧒 อยู่กับ${C.lin}`}const hb=[...document.querySelectorAll('#mwHud .mwh1 span')].find(x=>/หลิน/.test(x.textContent));if(hb&&C.lin!=='หลิน')hb.textContent=`🧒 ${C.lin}`}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx13 (เดิมอยู่ app.js บรรทัด 15609) · ห่อ: mwDraw ----
(function(){const SL=globalThis.__wSlots['mwx13'];let mwDraw=SL.base.mwDraw;
{const _mdC=mwDraw;mwDraw=function(c,t){const r=_mdC.apply(this,arguments);try{if(mwOn())mwSkin(c,t)}catch(e){}return r}}
SL.impl.mwDraw=mwDraw;mwDraw=function(){return globalThis.mwDraw.apply(this,arguments)};})();

// ---- ท่อน mwx14 (เดิมอยู่ app.js บรรทัด 15655) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx14'];let mwEnter=SL.base.mwEnter;
{const _meT=mwEnter;mwEnter=function(){const r=_meT.apply(this,arguments);try{const M=S.mw;if(M&&M.uni==null){M.uni=Math.random()<.3?1:0;M.lives=mwLives();
 addFeed('ev',M.uni?'🔗 <b>จักรวาลซ้อน</b> ยุคนี้ดูคุ้นเคยแปลกๆ เหมือนมีคนอื่นจากยุทธภพเคยมาถึงก่อนคุณ':'🌐 <b>จักรวาลคุณเอง</b> โลกนี้ถูกสร้างจากเรื่องราวคุณคนเดียว','sum');setTimeout(()=>mwTbLoad(),50)}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx15 (เดิมอยู่ app.js บรรทัด 15675) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx15'];
MW_R.push(
 {id:'tbmine',w:14,cd:2,c:M=>M.y>=2&&(M.tbs||[]).length,go(M){const r=M.tbs[0];tbGo(r,true)}},
 {id:'tboth',w:6,cd:4,c:M=>M.uni&&M.y>=3&&(M.oth||[]).length,go(M){tbGo(M.oth[0],false)}},
 {id:'ppl',w:6,cd:5,c:M=>M.uni&&M.y>=2&&(M.ppl||[]).length,go(M){const p=M.ppl.shift(),C=MW_CC[p.cc]||MW_CC.th,same=p.cc===(M.cc||'th');
  choice('🔗 คนจากยุทธภพอีกคน',`${same?'ในร้านกาแฟใกล้บ้าน':'ในงานประชุมนานาชาติที่คุณบังเอิญไปช่วยงาน'} มีชายคนหนึ่งจับถ้วยกาแฟแบบจับถ้วยชา <b>${esc(p.n)}</b>${p.rl?' อดีต'+esc(p.rl):''}${p.fac?' แห่ง'+esc(p.fac):''} ราว ค.ศ. ${p.yr}${same?'':` เขาบอกว่าตื่นขึ้นที่${C.city} ประเทศ${C.n}`} · เขามองคุณแล้วรู้ทันทีเหมือนกัน`,[
  mwC('เข้าไปทักด้วยการคารวะแบบยุทธภพ',()=>{(M.fr=M.fr||[]).push(p.n);mwSay(`🤝 คุณกับ${esc(p.n)}คุยกันจนร้านปิด เรื่องยุทธภพของเขาไม่ตรงกับของคุณสักเรื่อง เหมือนมาจากคนละประวัติศาสตร์ แต่ทั้งคู่จำรสชาติชาที่ดีได้เหมือนกัน`,'myth',{joy:12,sec:3},true)}),
  mwC('แกล้งทำเป็นไม่เห็น',()=>mwSay(`👀 คุณเดินออกจากร้านโดยไม่หันกลับไป แต่รู้สึกได้ถึงสายตาของ${esc(p.n)}ตามหลังมาจนสุดถนน`,'',{sec:-2}))])}},
 {id:'anc1',w:5,cd:0,c:M=>M.y>=2&&(M.lives||[]).length,go(M){const l=ancPick(M);if(!l)return;const sur=String(l.n).split(' ')[0];
  choice('🪧 ป้ายร้านที่คุ้นตา',`ร้านยาจีนเก่าในซอยแขวนป้ายไม้ว่า <b>"${esc(sur)}"</b> — นามสกุลของ<b>${esc(l.n)}</b> คุณในชาติก่อน${l.e?' ผู้ได้ฉายา '+esc(l.e):''} · เจ้าของร้านมีไฝใต้ตาซ้ายตำแหน่งเดียวกับเขา`,[
  mwC('เข้าไปซื้อยา แล้วชวนคุย',()=>mwSay(`🌿 เจ้าของร้านเล่าว่าบรรพบุรุษคนแรกของตระกูลเป็นจอมยุทธ์ที่${l.c?esc(l.c.replace(/^จากไป|^สิ้นใจ/,'')):'จากไปอย่างลึกลับ'} เรื่องเล่าในตระกูลผิดไปครึ่งหนึ่ง แต่คุณไม่แก้`,'myth',{joy:10},true)),
  mwC('มองจากหน้าร้าน แล้วเดินผ่าน',()=>mwSay(`🚶 ลูกหลานของ${esc(l.n)}ยังอยู่ดี แค่นั้นก็พอ`,'',{joy:4}))])}},
 {id:'anc2',w:4,cd:0,c:M=>M.y>=4&&(M.lives||[]).length>=2,go(M){const a=ancPick(M),b=ancPick(M);if(!a||!b)return;
  mwSay(`🏛️ พิพิธภัณฑ์จัดนิทรรศการ "ยอดฝีมือที่ถูกลืม" ในห้องเดียวกันมีชื่อ<b>${esc(a.n)}</b>${a.rl?' ('+esc(a.rl)+')':''} และ<b>${esc(b.n)}</b>${b.rl?' ('+esc(b.rl)+')':''} ติดอยู่บนผนัง ทั้งสองคนคือคุณ ในชาติที่ต่างกัน · ภัณฑารักษ์สงสัยว่าทำไมคุณยืนหน้าป้ายนั้นนานจนพิพิธภัณฑ์ปิด`,'myth',{joy:6},true)}},
 {id:'anc3',w:4,cd:6,c:M=>M.y>=3&&(M.lives||[]).length,go(M){const l=ancPick(M);if(!l)return;
  choice('🪦 ป้ายหลุมศพในป่า',`ระหว่างเดินป่า คุณสะดุดแท่นหินที่ถูกรากไม้กลืนไปครึ่งหนึ่ง ตัวอักษรเลือนๆ อ่านได้ว่า <b>"${esc(l.n)}"</b>${l.a?` อายุ ${l.a} ปี`:''}${l.c?` — ${esc(l.c)}`:''}`,[
  mwC('ทำความสะอาดหลุมศพตัวเอง',()=>mwSay(`🧹 คุณถอนวัชพืชออกจากหลุมศพของตัวเองในชาติก่อนจนบ่ายคล้อย แล้วจุดธูปให้${esc(l.n)} แปลกดี ที่ไม่รู้สึกแปลกเลย`,'myth',{joy:8,qi:.3},true)),
  mwC('ถ่ายรูปเก็บไว้ แล้วเดินต่อ',()=>mwSay('📷 รูปนั้นอยู่ในมือถือคุณไปตลอด คุณเปิดดูบ่อยกว่าที่คิด','',{joy:3}))])}},
 {id:'anc4',w:4,cd:0,c:M=>M.y>=5&&(M.lives||[]).some(l=>l.fac||l.art),go(M){const L=(M.lives||[]).filter(l=>(l.fac||l.art)&&!(M.ancU||[]).includes(l.n));const l=L.length?ch(L):null;if(!l)return;(M.ancU=M.ancU||[]).push(l.n);
  mwSay(`📚 นักประวัติศาสตร์คนหนึ่งออกหนังสือเรื่อง${l.fac?'<b>'+esc(l.fac)+'</b>':'จอมยุทธ์ที่ถูกลืม'} ในบทที่เจ็ดพูดถึง<b>${esc(l.n)}</b>${l.art?` เจ้าของวิชา<b>${esc(l.art)}</b>`:''} ว่าเป็น "ตัวละครในตำนานที่อาจไม่เคยมีตัวตน" คุณเขียนอีเมลไปแย้งหนึ่งย่อหน้า แล้วลบทิ้งก่อนกดส่ง`,'',{joy:5})}},
 {id:'anc5',w:3,cd:7,c:M=>(M.lives||[]).length>=3,go(M){const l=ch(M.lives);
  mwSay(`🌙 คืนนี้คุณฝันว่าเป็น<b>${esc(l.n)}</b>อีกครั้ง${l.e?' — '+esc(l.e):''} ตื่นมามือยังจำน้ำหนักของอาวุธที่ไม่ได้จับมาหลายร้อยปี`,'',{joy:-1})}});
})();

// ---- ท่อน mwx16 (เดิมอยู่ app.js บรรทัด 15697) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx16'];let render=SL.base.render;
{const _rnT=render;render=function(){const r=_rnT.apply(this,arguments);try{if(mwOn()){const t=document.querySelector('#mwHud .mwhT');if(t&&!t.querySelector('.mwUni'))t.insertAdjacentHTML('beforeend',` <span class="mwUni tag2">${S.mw.uni?'🔗 จักรวาลซ้อน':'🌐 จักรวาลคุณ'}</span>`)}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx17 (เดิมอยู่ app.js บรรทัด 15698) · ห่อ: mwInfo ----
(function(){const SL=globalThis.__wSlots['mwx17'];let mwInfo=SL.base.mwInfo;
{const _miT=mwInfo;mwInfo=function(){_miT.apply(this,arguments);try{const M=S.mw,b=$('modal').querySelector('.pbtn');if(b)b.insertAdjacentHTML('beforebegin',`<p class="tag2">${M.uni?'🔗 จักรวาลซ้อน อาจเจอผู้เล่นคนอื่นและสมบัติของพวกเขา':'🌐 จักรวาลคุณเอง'} · สมบัติคุณที่ยังไม่ได้ขุด ${(M.tbs||[]).length} · ชาติก่อนที่จำได้ ${(M.lives||[]).length}</p>${admK()?`<button class="gbtn" style="width:100%;margin-bottom:6px" onclick="S.mw.uni=S.mw.uni?0:1;mwTbLoad();closeM();render();toast('สลับจักรวาลแล้ว (ทดสอบ)')">🔀 สลับจักรวาล (ทดสอบแอดมิน)</button>`:''}`)}catch(e){}}}
SL.impl.mwInfo=mwInfo;mwInfo=function(){return globalThis.mwInfo.apply(this,arguments)};})();

// ---- ท่อน mwx18 (เดิมอยู่ app.js บรรทัด 15703) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx18'];let mwYear=SL.base.mwYear;
{const _myF=mwYear;mwYear=function(){const M=S&&S.mw,rs0=M?Object.keys(M.rs||{}).length:0;const r=_myF.apply(this,arguments);try{if(S&&S.alive&&S.mw){const M=S.mw;M.rs=M.rs||{};let nF=0;
 for(const [y,id] of MW_FORCE){if(nF>=(M.q.length?1:2))break;if(M.y<y||M.rs[id]!=null)continue;const e=MW_R.find(x=>x.id===id);let ok=0;try{ok=e&&e.c(M,M.past)}catch(x){}if(!ok)continue;M.rs[id]=M.y;nF++;const me=S,dl=900+nF*400;setTimeout(()=>{const go=()=>{if(S!==me||!S||!S.alive||!S.mw)return;if(choice._cur||(modalOpen&&/choice/.test($('modal').dataset.k||'')))return setTimeout(go,700);try{e.go(S.mw,S.mw.past)}catch(x){console.error(x)}};go()},dl)}}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx19 (เดิมอยู่ app.js บรรทัด 15714) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx19'];
MW_R.push(
 {id:'sect1',w:8,cd:0,c:M=>M.y>=4&&!M.fl.sect&&!!mwSectSrc(M),go(M){const X=mwSectSrc(M),P=M.past;M.fl.sectN=X.n;M.fl.sectMe=X.me;
  const gen=mwSectGen(M),place=X.up?`ตึกสำนักงานใหญ่ของ<b>${esc(X.n)}</b>`:`ยิมเล็กๆ ที่ยังแขวนป้าย<b>${esc(X.n)}</b>`;
  let pr=.3+(X.founder?.3:0)+(X.up?.15:0)+(X.me?.1:0);const rec=Math.random()<pr;M.fl.sectRec=rec?1:0;
  const how=ch(X.founder?['ภาพวาดผู้ก่อตั้งในศาลบรรพชนหน้าเหมือนคุณราวกับส่องกระจก','ตำนานของสำนักเล่าว่า "ผู้ก่อตั้งจะกลับมาในวันที่สำนักใกล้ล่มสลาย"','รูปปั้นผู้ก่อตั้งหน้าสำนักมีแผลเป็นที่คิ้วซ้าย ตรงกับแผลคุณ']:['ท่าเดินคุณตรงกับท่าในคัมภีร์ต้นฉบับที่เจ้าสำนักเก็บรักษาไว้','ชื่อคุณถูกจารึกอยู่ในป้ายรายชื่อบรรพชนแถวแรก','ป้ายหยกประจำตัวที่คุณยังพกอยู่ เป็นแบบเดียวกับที่วางบนแท่นบูชา']);
  const who=X.me?(X.founder?'ผู้ก่อตั้ง':'ยอดฝีมือรุ่นแรกๆ'):`<b>${esc(X.who)}</b> — คุณในชาติก่อน —`;
  if(rec){choice('🏯 สำนักคุณจำคุณได้',`วันไหว้บรรพชนประจำปี คุณเดินผ่าน${place} เจ้าสำนักรุ่นที่ ${gen} หยุดพิธีกลางคัน ทุกคนหันมามองคุณ ${how} · เจ้าสำนักเดินเข้ามาช้าๆ เสียงสั่น "ท่านคือ...${who}ใช่หรือไม่"`,[
   mwC('"ใช่ ข้าคือบรรพบุรุษของพวกเจ้า"',()=>{M.fl.sect='elder';mwSay(`🙇 ศิษย์ทั้งสำนักคุกเข่าพร้อมกันกลางถนน เจ้าสำนักรุ่นที่ ${gen} ร้องไห้ "พวกเรารอท่านมาเจ็ดร้อยปี" คุณได้ห้องพักในสำนัก และตำแหน่ง<b>ปรมาจารย์ผู้อาวุโสสูงสุด</b>`,'myth',{joy:18,sec:8,qi:1},true);keyAdd('กลับสู่'+X.n+'ในฐานะบรรพบุรุษ')}),
   mwC('"ไม่ใช่ ท่านจำคนผิดแล้ว"',()=>{M.fl.sect='denyR';mwSay('🚶 คุณโค้งให้เจ้าสำนักแล้วเดินจากไป เขาไม่ตามมา แต่คืนนั้นมีกล่องไม้วางอยู่หน้าห้องคุณ ข้างในเป็นชาร้อนหนึ่งกาและกระดาษเขียนว่า "ศิษย์เข้าใจ"','good',{sec:-4,joy:6})}),
   mwC('"ข้าเป็นแค่ศิษย์รุ่นหลังที่หลงทางมา"',()=>{M.fl.sect='junior';mwSay('🥋 เจ้าสำนักมองคุณนาน แล้วพยักหน้า "ถ้าอย่างนั้น ยินดีต้อนรับกลับบ้าน ศิษย์น้อง" ทั้งสำนักเรียกคุณว่าศิษย์น้อง ทั้งที่คุณอายุมากที่สุดในที่นั้นหลายร้อยปี','good',{joy:10,sec:2})}),
   mwC('"ก่อนจะตอบ ขอดูวิชาของพวกเจ้าก่อน"',()=>{M.fl.sect='test';const kept=Math.random()<(X.up?.6:.35);mwSay(kept?`⚔️ ศิษย์เอกรำกระบวนท่าให้ดู หลายร้อยปีที่ผ่านมาท่าเพี้ยนไปบ้าง แต่แก่นยังอยู่ครบ คุณยิ้มแล้วแก้ให้แค่สามจุด เจ้าสำนักรู้ทันทีว่าคุณเป็นใคร`:`⚔️ ศิษย์เอกรำกระบวนท่าให้ดู ครึ่งหนึ่งเป็นท่าจากหนังกำลังภายใน คุณถอนหายใจยาว แล้วนั่งสอนใหม่ทั้งคืนโดยไม่บอกว่าตัวเองเป็นใคร`,kept?'epic':'',kept?{joy:10,qi:.5}:{joy:4,adapt:2},true)})])}
  else{choice('🏯 สำนักที่จำคุณไม่ได้',`คุณเดินผ่าน${place} วันนี้เป็นวันไหว้บรรพชน ศิษย์รุ่นที่ ${gen} จุดธูปหน้าป้ายวิญญาณที่${X.me?'มีชื่อของคุณ':'มีชื่อ'+esc(X.who)} ไม่มีใครหันมามองชายแปลกหน้าที่ยืนอยู่หน้าประตู`,[
   mwC('"ข้าคือบรรพบุรุษของพวกเจ้า"',()=>{choice('😶 ไม่มีใครเชื่อ','ศิษย์หัวเราะคิกคัก เจ้าสำนักขมวดคิ้ว "คุณลุงครับ วันนี้มีพิธี ถ้าจะมาขอเงินบริจาคกลับไปก่อนนะครับ"',[
     mwC('แสดงวิชาประจำสำนักให้ดูตรงนั้น',()=>{M.fl.sect='elder';M.fl.sectRec=1;mwSay('🌀 คุณร่ายกระบวนท่าแรกของสำนักโดยไม่ใช้แรงแม้แต่น้อย ใบไม้ทั้งลานลอยขึ้นหมุนรอบตัวคุณ ธูปทุกดอกบนแท่นบูชาลุกโพลงพร้อมกัน เจ้าสำนักคุกเข่าเป็นคนแรก','myth',{sec:16,joy:15},true);keyAdd('พิสูจน์ตัวต่อหน้า'+X.n)},{s:'ความลับรั่ว · พิสูจน์ได้แน่นอน'}),
     mwC('เล่าความลับของสำนักที่มีแต่เจ้าสำนักรู้',()=>{const ok=Math.random()<.6;if(ok){M.fl.sect='elder';M.fl.sectRec=1;mwSay('🤫 คุณกระซิบที่ซ่อนคัมภีร์ต้นฉบับใต้แผ่นหินแผ่นที่เจ็ด เจ้าสำนักหน้าซีด แล้วพาคุณเข้าห้องด้านในทันที','epic',{joy:12,sec:3},true)}else{M.fl.sect='out';mwSay('📜 ที่ซ่อนนั้นถูกรื้อไปตั้งแต่สร้างตึกใหม่เมื่อสามสิบปีก่อน ไม่มีใครรู้ว่าคุณพูดเรื่องอะไร คุณถูกเชิญออกจากงานอย่างสุภาพ','bad',{joy:-6})}}),
     mwC('ยอมแพ้ แล้วเดินออกมา',()=>{M.fl.sect='out';mwSay('🚶 คุณจุดธูปให้ป้ายชื่อตัวเองหนึ่งดอกจากนอกประตู แล้วเดินกลับบ้าน','',{joy:-4})})])}),
   mwC('สมัครเป็นศิษย์ใหม่ ไม่บอกใคร',()=>{M.fl.sect='student';mwSay(`📝 คุณจ่ายค่าเรียนเดือนละ 2,000 บาทเพื่อเรียนวิชาที่ตัวเอง${X.me&&X.founder?'คิดค้นขึ้นมา':'เคยใช้จนชำนาญ'} ครูฝึกชมว่า "ลุงมีพรสวรรค์นะ"`,'',{mon:mwS(-2000),joy:8})}),
   mwC('บริจาคเงินเงียบๆ แล้วจากไป',()=>{M.fl.sect='donor';mwSay('🧧 ซองไม่ระบุชื่อในกล่องบริจาคมีเงินมากพอซ่อมหลังคาสำนักทั้งหลัง ข้างในเขียนแค่ว่า "จากผู้มาก่อน"','good',{mon:-Math.min(200000,Math.round((S.money||0)*.3)),joy:10})}),
   mwC('เดินผ่านไป',()=>{M.fl.sect='pass';mwSay('🍂 ควันธูปลอยตามคุณไปจนสุดซอย','',null)})])}}},
 // ---------- เรื่องต่อ ----------
 {id:'sect2',w:7,cd:0,c:M=>M.fl.sect==='elder'&&M.y>=6,go(M){const n=M.fl.sectN;choice('🏯 ปัญหาของสำนักยุคใหม่',`${esc(n)}กำลังจะถูกบริษัทอสังหาฯ ซื้อที่ดินไป หนี้ค้างสามปี ศิษย์เหลือไม่ถึงสามสิบคน เจ้าสำนักมาปรึกษาคุณ "ท่านปรมาจารย์ เราควรทำอย่างไร"`,[
   mwC('ไลฟ์สดสาธิตวิชา เรียกศิษย์ใหม่',()=>mwSay(`📺 คลิปปรมาจารย์อายุเจ็ดร้อยปี (ตามคำโฆษณา) ยอดวิวสิบล้าน ศิษย์สมัครใหม่สองพันคน ${esc(n)}รอดแล้ว แต่ชื่อคุณอยู่ทั่วอินเทอร์เน็ต`,'epic',{fame:600000,sec:18,mon:mwS(100000)},true)),
   mwC('ขุดสมบัติเก่าใต้สำนักมาใช้หนี้',()=>mwSay('💰 ใต้แผ่นหินแผ่นที่เจ็ดยังมีหีบเงินที่คุณฝังไว้ตอนก่อตั้งสำนัก หนี้หมดในวันเดียว เจ้าสำนักไม่ถามว่าท่านรู้ได้อย่างไร','epic',{joy:12,sec:4},true)),
   mwC('ปล่อยให้สำนักปรับตัวตามยุค',()=>mwSay(`🏢 ${esc(n)}ย้ายไปเปิดคลาสในห้างสรรพสินค้า สอนชั้นเรียนสุขภาพสำหรับผู้สูงอายุ คุณไปนั่งดูทุกวันอังคาร`,'',{joy:3,adapt:5}))])}},
 {id:'sect3',w:6,cd:0,c:M=>M.fl.sect==='elder'&&M.y>=9&&M.rs&&M.rs.sect2!=null,go(M){const n=M.fl.sectN;choice('🗡️ ผู้อาวุโสที่ไม่เชื่อ',`ผู้อาวุโสคนหนึ่งของ${esc(n)}ไม่เคยเชื่อว่าคุณคือบรรพบุรุษ เขาท้าดวลต่อหน้าศิษย์ทั้งสำนัก "ถ้าท่านคือของจริง ก็ชนะข้าให้ได้"`,[
   mwC('รับคำท้า แต่ออมมือ',()=>mwSay('🥋 คุณปัดทุกกระบวนท่าด้วยมือข้างเดียวจนเขาหมดแรง แล้วยื่นมือดึงเขาลุกขึ้น เขาก้มหัวให้เป็นครั้งแรก ต่อมาเขากลายเป็นศิษย์ที่ภักดีที่สุด','epic',{joy:10},true)),
   mwC('"ข้าไม่จำเป็นต้องพิสูจน์อะไรให้ใคร"',()=>mwSay('🍵 คุณรินชาให้เขาหนึ่งถ้วยแล้วเดินออกจากลาน ครึ่งสำนักเชื่อคุณมากขึ้น อีกครึ่งเชื่อเขา','',{joy:-2}))])}},
 {id:'sect4',w:6,cd:0,c:M=>M.fl.sect==='denyR'&&M.y>=8,go(M){const n=M.fl.sectN;mwSay(`✉️ เจ้าสำนักของ${esc(n)}เสียชีวิตแล้ว ทนายนำซองจดหมายปิดผนึกมาให้คุณ ข้างในเขียนว่า "ศิษย์ไม่เคยบอกใคร ตามที่ท่านต้องการ แต่ศิษย์ขอเรียกท่านว่าอาจารย์สักครั้ง อาจารย์ ขอบคุณที่กลับมาให้ศิษย์ได้เห็น"`,'myth',{joy:6},true)}},
 {id:'sect5',w:6,cd:0,c:M=>M.fl.sect==='student'&&M.y>=7,go(M){choice('🥋 ศิษย์ใหม่ที่เก่งเกินไป',`ครบหนึ่งปีที่คุณเรียนที่${esc(M.fl.sectN)} ครูฝึกเรียกคุณไปคุยหลังเลิกคลาส "ลุงครับ ท่าที่ลุงรำเมื่อเช้า ไม่มีในหลักสูตร แต่มีในคัมภีร์ต้นฉบับที่ไม่มีใครอ่านออก... ลุงเรียนมาจากไหน"`,[
   mwC('บอกความจริง',()=>{M.fl.sect='elder';mwSay('🙇 ครูฝึกพาคุณไปพบเจ้าสำนัก คืนนั้นคัมภีร์ต้นฉบับถูกเปิดอ่านออกเป็นครั้งแรกในรอบสามร้อยปี โดยคนที่เขียนมันขึ้นมา','myth',{joy:14,sec:5},true)}),
   mwC('"ดูจากยูทูบ"',()=>mwSay('📱 ครูฝึกพยักหน้าช้าๆ อย่างไม่เชื่อ แต่ไม่ถามอีก','',{joy:4}))])}},
 {id:'sect6',w:4,cd:0,c:M=>(M.fl.sect==='pass'||M.fl.sect==='out'||M.fl.sect==='donor')&&mwLeft(M)<=15,go(M){mwSay(`🏯 ตอนอายุมากแล้ว คุณกลับไปที่${esc(M.fl.sectN)}อีกครั้ง ศิษย์ตัวน้อยคนหนึ่งวิ่งมาจูงมือ "คุณปู่มาไหว้บรรพชนหรือคะ" คุณพยักหน้า ครั้งนี้คุณจุดธูปจากในลาน`,'myth',{joy:8},true)}});
})();

// ---- ท่อน mwx20 (เดิมอยู่ app.js บรรทัด 15913) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx20'];
MW_R.push({id:'job0',w:2,cd:0,c:M=>!M.job&&M.y>=1,go(M){choice('💼 ต้องมีงานทำ',`เงินที่ติดตัวมาจากยุคก่อนใกล้หมด ค่าเช่าห้องเดือนหน้าต้องจ่ายแล้ว ใน${mwCC().city}ทุกอย่างต้องใช้เงิน`,[
  mwC('ดูประกาศรับสมัครงาน',()=>setTimeout(openJobs,300)),mwC('รับจ้างรายวันไปก่อน',()=>mwSay('🧰 คุณยืนรอรถรับคนงานรายวันตั้งแต่ตีห้า ได้งานบ้างไม่ได้บ้าง','',{adapt:2}))])}});
})();

// ---- ท่อน mwx21 (เดิมอยู่ app.js บรรทัด 15916) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx21'];let render=SL.base.render;
{const _rnJ=render;render=function(){const r=_rnJ.apply(this,arguments);try{if(mwOn()){const h=$('mwHud');if(h&&!h.querySelector('.mwJob')){const M=S.mw,J=mwJobOf(M);h.insertAdjacentHTML('beforeend',`<div class="mwJob">${J?`${J.ic} <b>${esc(mwJP(J,M)[0])}</b> · ${J.fight?'ไฟต์ละ':''} ${mwLocal(mwJP(J,M)[1],M)}${J.fight?'':'/เดือน'}`:'💼 ยังไม่มีงานประจำ'} <button class="gbtn mwJobB" onclick="openJobs()">หางาน</button></div>`)}}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx22 (เดิมอยู่ app.js บรรทัด 15961) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx22'];
MW_R.push({id:'loan',w:20,cd:1,c:M=>(M.loan||0)>0,go(M){choice('💀 เจ้าหนี้มาทวง',`ชายสามคนยืนรอหน้าห้อง ยอดหนี้พร้อมดอกตอนนี้ ${mwLocal(M.loan*mwCC().rate,M)}`,[
 mwC('จ่ายคืนทั้งหมด',()=>{if((S.money||0)>=M.loan){S.money-=M.loan;M.loan=0;mwSay('🤝 คุณจ่ายครบ เจ้าหนี้ยิ้มแห้งๆ ลูกหนี้ที่จ่ายครบไม่ใช่ลูกค้าที่ดี','good',{joy:4})}else{M.loan=Math.round(M.loan*1.3);mwSay('😓 เงินไม่พอจ่าย หนี้งอกขึ้นอีก','bad',{joy:-5})}}),
 mwC('ไล่ไปด้วยวิชา',()=>{M.loan=0;mwSay('👊 สามคนนั้นวิ่งหนีไปทั้งที่คุณยังไม่ได้ขยับนิ้ว เจ้าหนี้ไม่เคยกลับมาอีก แต่ข่าวลือว่า "ลุงในซอยนั้นอันตราย" เริ่มแพร่ไปทั่ว','',{sec:10,joy:-2})},{s:'ความลับรั่ว'}),
 mwC('ขอผ่อนผัน',()=>{M.loan=Math.round(M.loan*1.25);mwSay('⏳ พวกเขาให้เวลาอีกหนึ่งปี พร้อมดอกเบี้ยเพิ่ม','',{joy:-3})})])}});
})();

// ---- ท่อน mwx23 (เดิมอยู่ app.js บรรทัด 15990) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx23'];let mwYear=SL.base.mwYear;
{const _myC=mwYear;mwYear=function(){const M=S&&S.mw;const r=_myC.apply(this,arguments);try{if(S&&S.alive&&S.mw){const M=S.mw,A=mwAst(M);mwPayLife(M);if(A.save>0)A.save=Math.round(A.save*1.03);
 if(A.h===1)joy(2);if(A.h===2)joy(3);if(A.car){M.adapt=mwCl(M.adapt+1,0,100);joy(1)}render()}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx24 (เดิมอยู่ app.js บรรทัด 15993) · ห่อ: mwJobYear ----
(function(){const SL=globalThis.__wSlots['mwx24'];let mwJobYear=SL.base.mwJobYear;
{const _jyC=mwJobYear;mwJobYear=function(M){const m0=S.money||0;const r=_jyC.apply(this,arguments);try{if(M.job&&M.job.id==='rider'&&!mwAst(M).bike){const d=Math.round(((S.money||0)-m0)*.2);if(d>0){S.money-=d;addFeed('ev',`🛵 ค่าเช่ารถส่งของทั้งปี ${mwLocal(d*mwCC().rate,M)} <span class="tag2">(ซื้อรถเองได้ที่ 🏠 ทรัพย์สิน)</span>`,'sum')}}}catch(e){}return r}}
SL.impl.mwJobYear=mwJobYear;mwJobYear=function(){return globalThis.mwJobYear.apply(this,arguments)};})();

// ---- ท่อน mwx25 (เดิมอยู่ app.js บรรทัด 15996) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx25'];
MW_R.push(
 {id:'sick',w:3,cd:6,c:M=>M.y>=3,go(M){const big=mwLeft(M)<=20;mwSay(`🏥 ${mwMedBill(M,MW_MIN[M.cc||'th']*(big?6:2),big?'คุณล้มลงในห้องน้ำ ต้องนอนโรงพยาบาลสองสัปดาห์ หมอบอกว่า "ร่างกายแข็งแรงเกินอายุ แต่หัวใจทำงานหนักมาตลอด"':'ไข้หวัดใหญ่สายพันธุ์ใหม่ ปราณในยุคนี้บางเกินกว่าจะไล่เชื้อได้เหมือนเมื่อก่อน')}`,'bad',{joy:-4})}},
 {id:'tui',w:9,cd:0,c:M=>M.linMet&&M.lin>=25&&M.y>=3&&M.y<=6,go(M){const C=mwCO(M),L=mwCC().lin,yr=C.tui[1],all=yr*4;choice('🎓 ค่าเรียนมหาวิทยาลัย',`${L}สอบติด${esc(C.tui[0])} แต่ครอบครัวเขาไม่มีเงินส่ง ค่าเทอมรวมค่าใช้จ่ายปีละ ${mwLocal(yr,M)} สี่ปีรวม ${mwLocal(all,M)}`,[
  mwC('จ่ายให้ทั้งหมด',()=>{const b=mwToB(all,M);if((S.money||0)<b){mwSay(`💸 เงินไม่พอจ่ายทั้งสี่ปี คุณจ่ายได้ปีแรก ${L}กู้ยืมเพื่อการศึกษาส่วนที่เหลือ`,'',{lin:10,mon:-mwToB(yr,M)});return}M.fl.tui=1;mwSay(`🎓 คุณโอนเงินให้ครบสี่ปี ${L}ร้องไห้ในร้านข้าว "ผมจะคืนให้ลุงทุกบาท" คุณบอกว่าไม่ต้องคืน แค่เรียนให้จบ`,'myth',{mon:-b,lin:25,joy:10},true)},{s:'ความผูกพันเพิ่มมาก'}),
  mwC('ช่วยครึ่งหนึ่ง ให้เขากู้ยืมส่วนที่เหลือ',()=>mwSay(`🤝 ${L}ทำงานพาร์ตไทม์ควบคู่ไปด้วย เรียนจบช้ากว่าเพื่อนหนึ่งปี แต่จบ`,'good',{mon:-mwToB(all/2,M),lin:12})),
  mwC('ไม่ช่วยเรื่องเงิน',()=>mwSay(`📚 ${L}กู้ยืมเพื่อการศึกษาเต็มจำนวน หนี้ก้อนนั้นตามเขาไปอีกสิบห้าปี เขาไม่เคยพูดถึงมันกับคุณ`,'',{lin:-6}))])}});
})();

// ---- ท่อน mwx26 (เดิมอยู่ app.js บรรทัด 16003) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx26'];let render=SL.base.render;
{const _rnC2=render;render=function(){const r=_rnC2.apply(this,arguments);try{if(mwOn()){const j=document.querySelector('#mwHud .mwJob');if(j&&!j.querySelector('.mwAstB')){const c=mwYearCost(S.mw);j.insertAdjacentHTML('afterend',`<div class="mwJob">🏠 ค่าครองชีพ ${mwLocal(c.mon,S.mw)}/เดือน${S.mw.loan?' · 💀 มีหนี้นอกระบบ':''} <button class="gbtn mwJobB mwAstB" onclick="openAssets()">ทรัพย์สิน</button></div>`)}}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx27 (เดิมอยู่ app.js บรรทัด 16007) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx27'];let mwEnter=SL.base.mwEnter;
{const _meM=mwEnter;mwEnter=function(){const had=S&&S.mw;const r=_meM.apply(this,arguments);try{const M=S.mw;if(M&&!had&&M.mon0==null){M.mon0=S.money||0;S.money=mwToB(MW_MIN[M.cc||'th']*1.2,M)}}catch(e){}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx28 (เดิมอยู่ app.js บรรทัด 16015) · ห่อ: mwFx ----
(function(){const SL=globalThis.__wSlots['mwx28'];let mwFx=SL.base.mwFx;
{const _mfQ=mwFx;mwFx=function(o){const r=_mfQ.apply(this,arguments);try{if(o&&o.qi&&S.mw)setTimeout(()=>{if(S&&S.mw)mwQiCheck(S.mw)},50)}catch(e){}return r}}
SL.impl.mwFx=mwFx;mwFx=function(){return globalThis.mwFx.apply(this,arguments)};})();

// ---- ท่อน mwx29 (เดิมอยู่ app.js บรรทัด 16017) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx29'];let mwYear=SL.base.mwYear;
{const _myQ=mwYear;mwYear=function(){const pre=S&&S.mw?S.mw.qi:0,foc=S&&S.focus;const r=_myQ.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M){
 if(foc==='mwqi'){const add=(M.fl.ley?.8:0)+(M.stones||0)*.15;if(add>0){mwFx({qi:+add.toFixed(1)});addFeed('ev',`🌀 ${M.fl.ley?'จุดพลังใต้เมือง':''}${M.fl.ley&&M.stones?' + ':''}${M.stones?`หินปราณ ${M.stones} ก้อน`:''} ช่วยให้ปราณเพิ่มอีก ${add.toFixed(1)}`,'sum')}}
 const lv=mwQi(M);if(lv>=1&&M.job&&['heal','coach'].includes(M.job.id))M.job.perf=mwCl(M.job.perf+5,0,100);if(lv>=3)S.hp=S.maxHp;mwQiCheck(M)}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx30 (เดิมอยู่ app.js บรรทัด 16023) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx30'];let render=SL.base.render;
{const _rnQ=render;render=function(){const r=_rnQ.apply(this,arguments);try{if(mwOn()){const M=S.mw,sp=[...document.querySelectorAll('#mwHud .mwh1 span')].find(x=>/ปราณ/.test(x.textContent));if(sp&&!sp.dataset.q){sp.dataset.q=1;const lv=mwQi(M),nx=MW_QR[lv+1];sp.innerHTML=`🌀 ${MW_QR[lv][1]}`;sp.title=nx?`ขั้นถัดไป: ${nx[1]} (ปราณ ${nx[0]})`:'ขั้นสูงสุดของยุคนี้';const b=sp.parentNode.querySelector('b');if(b&&nx)b.textContent=`${M.qi}/${nx[0]}`}}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx31 (เดิมอยู่ app.js บรรทัด 16025) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx31'];
MW_R.push(
 {id:'qs1',w:6,cd:5,c:M=>M.y>=3,go(M){const p=mwStonePrice(M);choice('💎 หินในร้านของเก่า',`ร้านของเก่าวางหินสีหม่นก้อนหนึ่งไว้เป็นที่ทับกระดาษ ป้ายราคา ${mwLocal(p,M)} ในสายตาคุณ มันเรืองแสงเหมือนตะเกียงในห้องมืด <b>หินปราณ</b> ของที่หาไม่ได้แล้วในยุคนี้`,[
  mwC('ซื้อ',()=>{const b=mwToB(p,M);if((S.money||0)<b){mwSay('💸 เงินไม่พอ คุณยืนต่อราคาอยู่ครึ่งชั่วโมง เจ้าของร้านไม่ยอมลดเพราะเห็นว่าคุณอยากได้มาก','',{joy:-3});return}M.stones=(M.stones||0)+1;mwSay(`💎 หินปราณก้อนที่ ${M.stones} ของคุณ นั่งสมาธิข้างมัน ปราณไหลเข้ามาเหมือนน้ำซึมผ่านดิน`,'epic',{mon:-b,qi:3},true)}),
  mwC('ดูดปราณจากมันตรงนั้นแล้วคืนร้าน',()=>mwSay('🌀 คุณจับหินไว้ห้านาที ทำทีเป็นพิจารณา แล้ววางคืน หินก้อนนั้นหมองลงอย่างเห็นได้ชัด เจ้าของร้านไม่เข้าใจว่าทำไมไม่มีใครซื้อมันอีกเลย','',{qi:1.2,joy:-2})),
  mwC('ไม่ซื้อ',()=>mwSay('🚶 หินก้อนนั้นยังเรืองแสงอยู่ในความทรงจำคุณไปอีกหลายคืน','',null))])}},
 {id:'qs2',w:6,cd:0,c:M=>M.y>=4&&!M.fl.ley&&M.qi>=2,go(M){choice('📍 จุดพลังใต้เมือง',`ตอนตีสาม คุณรู้สึกถึงปราณที่พุ่งขึ้นจากใต้ดินตรงลานจอดรถใต้ตึกแห่งหนึ่งกลาง${mwCC().city} จุดที่เส้นพลังของแผ่นดินมาบรรจบกัน`,[
  mwC('มานั่งสมาธิที่นี่ทุกคืน',()=>{M.fl.ley=1;mwSay('📍 ยามกะดึกเห็นคุณนั่งนิ่งอยู่มุมลานจอดรถทุกคืน เขาเลิกสงสัยในเดือนที่สาม และเริ่มเอากาแฟมาให้','epic',{qi:2,sec:4},true)},{s:'ปราณเพิ่มทุกปีที่นั่งสมาธิ'}),
  mwC('จำตำแหน่งไว้ ยังไม่ใช้',()=>mwSay('🗺️ คุณปักหมุดไว้ในแผนที่มือถือ ตั้งชื่อว่า "ร้านก๋วยเตี๋ยว" เผื่อใครเห็น','',null))])}},
 {id:'qs3',w:6,cd:0,c:M=>M.fl.ley&&M.y>=7,go(M){choice('⚔️ มีคนแย่งจุดพลัง','คืนหนึ่งมีคนนั่งอยู่ตรงจุดพลังก่อนคุณ หญิงวัยกลางคนในชุดพนักงานออฟฟิศ ปราณรอบตัวเธอเป็นของคนจากยุทธภพเหมือนกัน เธอลืมตาขึ้นมองคุณ',[
  mwC('แบ่งกันใช้ คนละครึ่งคืน',()=>{M.fl.leyF=1;mwSay('🤝 ทั้งสองแบ่งเวลากันโดยไม่เคยถามชื่อกัน สิบปีต่อมาเธอทิ้งหินปราณไว้หนึ่งก้อนตรงจุดนั้นพร้อมกระดาษว่า "ฉันกลับบ้านแล้ว"','good',{qi:1,joy:6});M.stones=(M.stones||0)+1}),
  mwC('ประลองชิงจุดพลัง',()=>{const w=Math.random()<.6;if(w)mwSay('💥 การประลองเงียบที่สุดในประวัติศาสตร์ ไม่มีใครขยับ แค่ปะทะปราณกันจนไฟในลานจอดรถกะพริบทั้งชั้น เธอโค้งให้แล้วจากไป จุดพลังเป็นของคุณ','epic',{qi:2,sec:8});else{M.fl.ley=0;mwSay('🩸 ปราณของเธอแน่นกว่าที่คิด คุณกระเด็นไปชนเสาจนรอยร้าว จุดพลังเป็นของเธอแล้ว','bad',{qi:-2,joy:-6});S.hp=Math.max(10,S.hp-25)}}),
  mwC('ยกให้เธอ หาที่ใหม่',()=>{M.fl.ley=0;mwSay('🚶 คุณยกจุดพลังให้คนที่มาก่อน ตามกฎของยุทธภพ','',{joy:2})})])}},
 {id:'qs4',w:7,cd:0,c:M=>M.fl.foeSpy,go(M,P){choice('🗝️ ห้องใต้ดินของศัตรู',`คุณรู้แล้วว่าบริษัทของ${P.foe?esc(P.foe):'ศัตรูเก่า'}เก็บหินปราณสิบเจ็ดก้อนไว้ในห้องใต้ดิน ระบบรักษาความปลอดภัยแน่นหนาที่สุดในเมือง`,[
  mwC('บุกเข้าไปขโมยคืนนี้',()=>{const ok=Math.random()<.65;if(ok){M.stones=(M.stones||0)+5;mwSay('🌑 คุณผ่านเลเซอร์สิบสองชั้นเหมือนเดินผ่านม่านลูกปัด ออกมาพร้อมหินปราณห้าก้อน ข่าวเช้าไม่มีรายงาน เพราะบริษัทไม่กล้าแจ้งว่าหายอะไร','myth',{qi:6,sec:15},true)}else{mwSay('🚨 สัญญาณเตือนดังก่อนคุณถึงประตูห้องนิรภัย ใบหน้าของคุณติดกล้องทุกตัว ศัตรูรู้แล้วว่าคุณเป็นใคร','bad',{sec:25,joy:-6})}},{s:'เสี่ยง · ได้มาก'}),
  mwC('ปล่อยไว้ก่อน',()=>mwSay('⏳ หินพวกนั้นยังอยู่ที่นั่น และศัตรูก็กำลังหาก้อนที่สิบแปด','',null))])}},
 {id:'qs5',w:4,cd:6,c:M=>(M.ppl||[]).length||M.fl.circle||M.fl.others,go(M){const p=Math.round(mwStonePrice(M)*.7);choice('🤝 ตลาดมืดของผู้ฝึกตน',`มีคนในกลุ่มผู้ฝึกตนประกาศขายหินปราณหนึ่งก้อน ราคา ${mwLocal(p,M)} หรือแลกกับคัมภีร์หนึ่งเล่ม`,[
  mwC('ซื้อด้วยเงิน',()=>{const b=mwToB(p,M);if((S.money||0)<b)return mwSay('💸 เงินไม่พอ','',null);M.stones=(M.stones||0)+1;mwSay('💎 หินปราณมาถึงในกล่องพัสดุธรรมดาๆ ห่อด้วยหนังสือพิมพ์เก่า','good',{mon:-b,qi:3})}),
  mwC('แลกด้วยการเขียนคัมภีร์วิชาหนึ่งให้',()=>{M.stones=(M.stones||0)+1;mwSay('📜 คุณเขียนคัมภีร์วิชาพื้นฐานของสำนักให้หนึ่งเล่ม วิชาคุณจะมีคนฝึกต่อในยุคนี้','good',{qi:3,sec:4})}),
  mwC('ไม่สนใจ',()=>mwSay('🚶 ก้อนนั้นขายได้ภายในสิบนาที','',null))])}});
})();

// ---- ท่อน mwx32 (เดิมอยู่ app.js บรรทัด 16056) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx32'];
MW_R.push(
 {id:'love1',w:6,cd:6,c:M=>M.y>=3&&!M.sp&&!M.dt&&mwLeft(M)>15&&S.age<85,go(M){const n=mwNm(M,0),how=ch(MW_MEET);choice('💞 ใครบางคน',`<b>${esc(n)}</b> — ${how} วันหนึ่งเขาถามว่า "เสาร์นี้ว่างไหม ไปดูหนังกัน"`,[
  mwC('ตกลง',()=>{M.dt={n,y:M.y};mwSay(`🎬 คุณดูหนังกับ${esc(n)} เรื่องกำลังภายใน คุณวิจารณ์ทุกฉากต่อสู้จนเขาหัวเราะทั้งเรื่อง นั่นคือเดตแรกในรอบหลายร้อยปี`,'good',{joy:10,adapt:3})}),
  mwC('ปฏิเสธอย่างสุภาพ',()=>mwSay(`🙏 ${esc(n)}ยิ้มแล้วบอกว่าไม่เป็นไร คืนนั้นคุณนั่งคิดว่าคนที่มีชีวิตยาวกว่าคนรอบข้างควรรักใครได้หรือไม่`,'',{joy:-2}))])}},
 {id:'love2',w:8,cd:0,c:M=>M.dt&&!M.sp&&M.y-M.dt.y>=1,go(M){const n=M.dt.n;choice('🤫 ความลับระหว่างเรา',`คบกับ${esc(n)}มาหนึ่งปี คืนหนึ่งเขาเห็นคุณยกตู้เย็นด้วยมือเดียว "คุณเป็นใครกันแน่"`,[
  mwC('เล่าความจริงทั้งหมด',()=>{if(Math.random()<.65){M.dt.k=1;mwSay(`💬 ${esc(n)}ฟังจนจบ เงียบไปนาน แล้วถามคำถามเดียว "ตอนนั้นคุณเหงาไหม" คุณตอบไม่ได้ เขากอดคุณแทน`,'myth',{joy:15,sec:2},true)}else{M.dt=null;mwSay(`💔 ${esc(n)}คิดว่าคุณโกหกหรือไม่ก็ป่วย เขาขอเลิกอย่างสุภาพ และไม่เคยเล่าเรื่องนี้ให้ใครฟัง`,'bad',{joy:-12})}},{s:'อาจเสียเขาไป'}),
  mwC('บอกว่าเพิ่งไปฟิตเนสมา',()=>mwSay(`🏋️ ${esc(n)}หรี่ตามองแต่ไม่ถามต่อ ความลับยังอยู่ แต่มีบางอย่างระหว่างคุณสองคนที่ปิดไม่สนิท`,'',{joy:-2}))])}},
 {id:'love3',w:8,cd:2,c:M=>M.dt&&!M.sp&&M.y-M.dt.y>=2,go(M){const n=M.dt.n;choice('💍 แต่งงาน',`คุณกับ${esc(n)}คบกันมา ${M.y-M.dt.y} ปี`,[
  mwC('ขอแต่งงาน',()=>{const c=mwToB(MW_MIN[M.cc||'th']*3,M);M.sp={n,y:M.y,k:M.dt.k||0};M.dt=null;mwSay(`💍 งานแต่งเล็กๆ ${M.linMet?mwCC().lin+'เป็นพยาน ':''}${M.fl.sect==='elder'?'ศิษย์ทั้งสำนักมาร่วมงาน ':''}คุณเคยสาบานเป็นพี่น้องในยุทธภพมาแล้วหลายครั้ง แต่นี่คือคำสาบานที่มือสั่นที่สุด`,'myth',{mon:-c,joy:20},true);keyAdd('แต่งงานกับ'+n)}),
  mwC('ยังไม่พร้อม',()=>{if(Math.random()<.4){mwSay(`🍂 ${esc(n)}รอไม่ไหวแล้ว เขาเลือกเดินจากไป`,'bad',{joy:-10});M.dt=null}else mwSay(`⏳ ${esc(n)}บอกว่ารอได้`,'',null)})])}},
 {id:'kid1',w:8,cd:3,c:M=>M.sp&&!M.sp.d&&(M.kids||[]).length<3&&M.y-M.sp.y>=1&&S.age<75,go(M){let n=mwNm(M,1);for(let i=0;i<8&&(M.kids||[]).some(k=>k.n===n);i++)n=mwNm(M,1);const qi=Math.random()<(M.sp.k?.55:.35);choice('👶 ลูก',`${esc(M.sp.n)}ตั้งครรภ์`,[
  mwC('ดีใจที่สุดในชีวิต',()=>{(M.kids=M.kids||[]).push({n,b:M.y,qi:qi?1:0});mwSay(`👶 <b>${esc(n)}</b> เกิดตอนตีสาม ร้องเสียงดังจนพยาบาลทั้งชั้นหันมามอง${qi?' คุณเห็นปราณบางๆ ไหลวนรอบตัวทารกตั้งแต่ลืมตา':''}`,'myth',{joy:20,mon:-mwToB(MW_MIN[M.cc||'th']*2,M)},true);keyAdd('มีลูกชื่อ'+n)})])}},
 {id:'kid2',w:6,cd:0,c:M=>(M.kids||[]).some(k=>k.qi&&M.y-k.b>=6&&!k.s),go(M){const k=M.kids.find(k=>k.qi&&M.y-k.b>=6&&!k.s);k.s=1;choice('🧒 ลูกมีปราณ',`${esc(k.n)}อายุหกขวบ กระโดดจากชิงช้าสูงสามเมตรแล้วลงยืนบนนิ้วเท้า คุณครูโทรมาที่บ้าน`,[
  mwC('สอนวิชาให้ตั้งแต่ตอนนี้',()=>{k.t=1;mwSay(`🥋 ${esc(k.n)}เรียนเร็วกว่าคุณตอนเด็ก เด็กยุคนี้ไม่ต้องกลัวว่าจะถูกสำนักอื่นฆ่าล้างตระกูล คุณสอนด้วยความสุขที่ไม่เคยมีตอนสอนศิษย์ในยุทธภพ`,'epic',{joy:10,sec:2})}),
  mwC('สอนให้ซ่อนพลังก่อน',()=>{k.h=1;mwSay(`🤫 คุณสอนวิธีควบคุมปราณให้เงียบที่สุด ${esc(k.n)}กลายเป็นเด็กธรรมดาที่วิ่งช้ากว่าเพื่อนนิดหน่อยโดยตั้งใจ`,'good',{sec:-3})})])}},
 {id:'kid3',w:5,cd:0,c:M=>(M.kids||[]).some(k=>M.y-k.b>=18&&!k.g),go(M){const k=M.kids.find(k=>M.y-k.b>=18&&!k.g);k.g=1;const C=mwCO(M);mwSay(`🎓 ${esc(k.n)}อายุสิบแปด สอบเข้า${esc(C.tui[0])}ได้ ค่าเรียนปีละ ${mwLocal(C.tui[1],M)} ลูกของจอมยุทธ์หลงยุคเรียนวิศวกรรมคอมพิวเตอร์`,'good',{mon:-mwToB(C.tui[1]*4,M),joy:10})}},
 {id:'sp1',w:6,cd:0,c:M=>M.sp&&!M.sp.d&&S.age>=80,go(M){M.sp.d=1;mwSay(`🕯️ <b>${esc(M.sp.n)}</b>จากไปก่อนคุณ ร่างของคนธรรมดาแก่เร็วกว่าคนที่เคยบำเพ็ญมา ในวันสุดท้ายเขาบอกว่า "ฉันโชคดีที่ได้เจอคนที่มาจากไกลขนาดนั้น"`,'bad',{joy:-20},true)}});
})();

// ---- ท่อน mwx33 (เดิมอยู่ app.js บรรทัด 16077) · ห่อ: endGame ----
(function(){const SL=globalThis.__wSlots['mwx33'];let endGame=SL.base.endGame;
{const _egL=endGame;endGame=function(){const r=_egL.apply(this,arguments);try{const h=LS.get('murim_mwheir',null),E=$('end');if(h&&mwAllowed()&&E&&!E.querySelector('.mwHeirB')&&S&&S.mw){const b=E.querySelector('button');if(b)b.insertAdjacentHTML('beforebegin',`<button class="pbtn mwHeirB" style="width:100%;margin-bottom:8px" onclick="mwHeirGo()">▶ เล่นต่อเป็น ${esc(h.n)} (ลูก · ${h.age} ปี · ยุคปัจจุบัน)</button>`)}}catch(e){console.error(e)}return r}}
SL.impl.endGame=endGame;endGame=function(){return globalThis.endGame.apply(this,arguments)};})();

// ---- ท่อน mwx34 (เดิมอยู่ app.js บรรทัด 16087) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx34'];
MW_R.push(
 {id:'hr1',w:10,cd:0,c:M=>M.native&&M.y>=0,go(M){const P=M.par||{};choice('📓 สมุดบันทึกของพ่อแม่',`สมุดเล่มนั้นเขียนว่า <b>${esc(P.n||'')}</b> เคยเป็น${esc(P.rl||'ยอดฝีมือ')}${P.sect?' แห่ง'+esc(P.sect):''} ในยุคที่ไม่มีอยู่ในหนังสือประวัติศาสตร์เล่มไหน หน้าสุดท้ายเขียนว่า "ถ้าลูกอ่านถึงตรงนี้ ลองหายใจตามที่พ่อแม่สอนตอนเด็ก แล้วจะเข้าใจ"`,[
  mwC('ลองหายใจตามบันทึก',()=>mwSay('🌀 ปราณบางๆ ที่หลับอยู่ในตัวคุณตื่นขึ้น ความทรงจำตอนเด็กที่พ่อแม่สอนให้ "หายใจแบบแปลกๆ" มีความหมายขึ้นมาทันที','myth',{qi:1.5},true)),
  mwC('คิดว่าเป็นนิยายที่พ่อแม่แต่ง',()=>mwSay('📚 คุณเก็บสมุดไว้บนชั้นหนังสือ ข้างนิยายกำลังภายในที่พ่อแม่ชอบอ่าน แต่บางคืนคุณหยิบมันลงมาเปิดอ่านซ้ำ','',{joy:2}))])}},
 {id:'hr2',w:7,cd:0,c:M=>M.native&&M.y>=3&&M.par&&M.par.sect,go(M){mwSay(`🏯 ชายชราจาก<b>${esc(M.par.sect)}</b>มาที่บ้าน เขาคุกเข่าตรงหน้าคุณ "บรรพบุรุษของสำนักฝากให้ศิษย์ดูแลท่าน ท่านคือสายเลือดของท่านปรมาจารย์"`,'myth',{joy:8,sec:3},true);M.fl.sect='elder';M.fl.sectN=M.par.sect}},
 {id:'hr3',w:6,cd:0,c:M=>M.native&&M.y>=5,go(M){choice('🧬 คุณต่างจากคนอื่น','ผลตรวจสุขภาพประจำปีคุณออกมาแปลกทุกปี หมอเริ่มขอเก็บตัวอย่างเลือด',[
  mwC('ปิดบังด้วยการควบคุมปราณ',()=>mwSay('🫀 คุณฝึกบังคับชีพจรจนผลตรวจปกติทุกค่า ทักษะแรกที่คุณเรียนเองโดยไม่มีพ่อแม่สอน','good',{qi:.5,sec:-4})),
  mwC('ยอมให้ตรวจ',()=>mwSay('🔬 ผลตรวจไปถึงห้องแล็บที่ไม่มีชื่อ และไปถึงใครบางคนที่กำลังรวบรวมรายชื่อ "ลูกหลานของคนหลงยุค"','bad',{sec:15}))])}});
})();

// ---- ท่อน mwx35 (เดิมอยู่ app.js บรรทัด 16098) · ห่อ: mwJobYear ----
(function(){const SL=globalThis.__wSlots['mwx35'];let mwJobYear=SL.base.mwJobYear;
{const _jyK=mwJobYear;mwJobYear=function(M){if(S.age<18){addFeed('ev',`🎒 อายุ ${S.age} ปี — เรียนหนังสือ${M.sp||M.par&&M.par.sp?' อยู่กับ'+(M.par&&M.par.sp?esc(M.par.sp):''):''}`,'sum');mwFx({adapt:1});return}return _jyK.apply(this,arguments)}}
SL.impl.mwJobYear=mwJobYear;mwJobYear=function(){return globalThis.mwJobYear.apply(this,arguments)};})();

// ---- ท่อน mwx36 (เดิมอยู่ app.js บรรทัด 16112) · ห่อ: mwJobYear ----
(function(){const SL=globalThis.__wSlots['mwx36'];let mwJobYear=SL.base.mwJobYear;
{const _jyB=mwJobYear;mwJobYear=function(M){const r=_jyB.apply(this,arguments);try{if(M.job){const J=MW_JOBS[M.job.id],t=mwJP(J,M);if(!M.jbestP||t[1]/((MW_CC[M.cc||'th']||{}).rate||1)>=M.jbestP){M.jbestP=t[1]/((MW_CC[M.cc||'th']||{}).rate||1);M.jbest=t[0]}}}catch(e){}return r}}
SL.impl.mwJobYear=mwJobYear;mwJobYear=function(){return globalThis.mwJobYear.apply(this,arguments)};})();

// ---- ท่อน mwx37 (เดิมอยู่ app.js บรรทัด 16113) · ห่อ: endGame ----
(function(){const SL=globalThis.__wSlots['mwx37'];let endGame=SL.base.endGame;
{const _egE=endGame;endGame=function(){const r=_egE.apply(this,arguments);try{if(S&&S.mw){const E=$('end');if(E&&!E.querySelector('.mwSum')){const L=mwSummary();
 const h=`<div class="mwSum"><div class="mwSumT">🏙️ ชีวิตในยุคปัจจุบัน</div>${L.map(x=>`<div class="mwSumR"><span>${x[0]} ${x[1]}</span><b>${x[2]}</b></div>`).join('')}<button class="gbtn" style="width:100%;margin-top:8px" onclick="mwCard()">📸 การ์ดชีวิตยุคปัจจุบัน</button></div>`;
 const t=E.querySelector('h2,h1,.endT');if(t)t.insertAdjacentHTML('afterend',h);else E.insertAdjacentHTML('afterbegin',h)}}}catch(e){console.error(e)}return r}}
SL.impl.endGame=endGame;endGame=function(){return globalThis.endGame.apply(this,arguments)};})();

// ---- ท่อน mwx38 (เดิมอยู่ app.js บรรทัด 16127) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx38'];
(function(){const st=document.createElement('style');st.textContent=`.mwSum{margin:10px 0;padding:10px 12px;border-radius:12px;background:linear-gradient(135deg,#1a1236,#2a1450);border:1.5px solid #6a4ab0;color:#efe6ff;font-size:13px;text-align:left}.mwSumT{font-weight:700;font-size:15px;margin-bottom:6px}.mwSumR{display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:1px solid #ffffff14}.mwSumR b{text-align:right}`;document.head.appendChild(st)})();
})();

// ---- ท่อน mwx39 (เดิมอยู่ app.js บรรทัด 16132) · ห่อ: mwRnd ----
(function(){const SL=globalThis.__wSlots['mwx39'];let mwRnd=SL.base.mwRnd;
{const _rdP=mwRnd;mwRnd=function(){const M=S&&S.mw;try{if(M&&!M.q.length&&Math.random()<.7){M.rs=M.rs||{};const L=MW_CHAIN.map(id=>MW_R.find(e=>e.id===id)).filter(e=>{if(!e)return false;const last=M.rs[e.id];if(last!=null&&(!e.cd||M.y-last<e.cd))return false;try{return e.c(M,M.past)}catch(x){return false}});
 if(L.length){const e=L[0];M.rs[e.id]=M.y;const me=S;setTimeout(()=>{const go=()=>{if(S!==me||!S||!S.alive||!S.mw)return;if(choice._cur)return setTimeout(go,700);try{e.go(S.mw,S.mw.past)}catch(x){console.error(x)}};go()},900);return}}}catch(e){console.error(e)}return _rdP.apply(this,arguments)}}
SL.impl.mwRnd=mwRnd;mwRnd=function(){return globalThis.mwRnd.apply(this,arguments)};})();

// ---- ท่อน mwx40 (เดิมอยู่ app.js บรรทัด 16137) · ห่อ: mwFx ----
(function(){const SL=globalThis.__wSlots['mwx40'];let mwFx=SL.base.mwFx;
{const _mfA=mwFx;mwFx=function(){const r=_mfA.apply(this,arguments);if(mwOn())mwAcOk();return r}}
SL.impl.mwFx=mwFx;mwFx=function(){return globalThis.mwFx.apply(this,arguments)};})();

// ---- ท่อน mwx41 (เดิมอยู่ app.js บรรทัด 16138) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx41'];let mwEnter=SL.base.mwEnter;
{const _meA=mwEnter;mwEnter=function(){const r=_meA.apply(this,arguments);mwAcOk();setTimeout(mwAcOk,30);return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx42 (เดิมอยู่ app.js บรรทัด 16140) · ห่อ: mwHeirGo ----
(function(){const SL=globalThis.__wSlots['mwx42'];let mwHeirGo=SL.base.mwHeirGo;
{const _hgA=mwHeirGo;mwHeirGo=function(){mwAcHold(3000);return _hgA.apply(this,arguments)}}
SL.impl.mwHeirGo=mwHeirGo;mwHeirGo=function(){return globalThis.mwHeirGo.apply(this,arguments)};})();

// ---- ท่อน mwx43 (เดิมอยู่ app.js บรรทัด 16141) · ห่อ: mwNewLost ----
(function(){const SL=globalThis.__wSlots['mwx43'];let mwNewLost=SL.base.mwNewLost;
{const _nlA=mwNewLost;mwNewLost=function(){mwAcHold(3000);return _nlA.apply(this,arguments)}}
SL.impl.mwNewLost=mwNewLost;mwNewLost=function(){return globalThis.mwNewLost.apply(this,arguments)};})();

// ---- ท่อน mwx44 (เดิมอยู่ app.js บรรทัด 16142) · ห่อ: mwQiCheck ----
(function(){const SL=globalThis.__wSlots['mwx44'];let mwQiCheck=SL.base.mwQiCheck;
{const _qcA=mwQiCheck;mwQiCheck=function(){const r=_qcA.apply(this,arguments);mwAcOk();return r}}
SL.impl.mwQiCheck=mwQiCheck;mwQiCheck=function(){return globalThis.mwQiCheck.apply(this,arguments)};})();

// ---- ท่อน mwx45 (เดิมอยู่ app.js บรรทัด 16144) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx45'];let mwYear=SL.base.mwYear;
{const _myA=mwYear;mwYear=function(){const r=_myA.apply(this,arguments);mwAcOk();return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx46 (เดิมอยู่ app.js บรรทัด 16147) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx46'];let render=SL.base.render;
{const _rnH=render;render=function(){const r=_rnH.apply(this,arguments);try{if(mwOn()){const M=S.mw,loc=mwLocal((S.money||0)*mwCC().rate,M);const g=$('gMini');if(g)g.innerHTML=g.innerHTML.replace(/💰[\d,\.]+[kKmMBb]*/,'💵 '+loc);
 document.querySelectorAll('#stats div,#gStats div,.st').forEach(d=>{if(/💰 ตำลึง/.test(d.textContent))d.innerHTML=d.innerHTML.replace('💰 ตำลึง','💵 เงิน').replace(/>[\d,\.]+[kKmMBb]*</,'>'+loc+'<')})}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx47 (เดิมอยู่ app.js บรรทัด 16157) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx47'];
{const e=MW_R.find(x=>x.id==='rent');if(e)e.go=function(M){const C=mwCO(M),A=mwAst(M);if(A.h===2)return mwSay('🏗️ ตึกข้างบ้านถูกรื้อสร้างคอนโด เสียงเจาะดังทั้งปี แต่บ้านคุณเป็นของคุณ ไม่มีใครไล่ได้','',{joy:-2});
 const hp=C.home[1];choice('🏠 เจ้าของตึกจะขายที่',`ตึกที่คุณเช่าอยู่จะถูกขายให้บริษัทสร้างคอนโด ทุกคนต้องย้ายออกภายในสามเดือน`,[
  mwC(`ย้ายไป${C.room0}`,()=>{A.h=0;mwSay('📦 ห้องใหม่เล็กกว่า ไกลกว่า แต่ยังมีหน้าต่าง','',{joy:-3,adapt:2})}),
  mwC(`ย้ายไป${C.rent0}`,()=>{A.h=1;mwSay(`📦 ${esc(C.rent0)} แพงขึ้น แต่สบายขึ้น`,'',{joy:3})}),
  mwC(`ซื้อ${C.home[0]} (ดาวน์ 20%)`,()=>{const b=mwToB(hp*.2,M);if((S.money||0)<b){A.h=0;mwSay('🏦 เงินดาวน์ไม่พอ ธนาคารปฏิเสธ คุณย้ายไปห้องเช่าถูกๆ แทน','bad',{joy:-4});return}S.money-=b;A.h=2;A.mort=Math.round(hp*.8*1.45/25);A.mortY=25;mwSay(`🔑 คุณซื้อ${esc(C.home[0])} ผ่อน 25 ปี ถูกไล่ที่ครั้งนี้ จะเป็นครั้งสุดท้าย`,'epic',{joy:12},true)},{s:`ดาวน์ ${mwLocal(hp*.2,M)}`})])}}
})();

// ---- ท่อน mwx48 (เดิมอยู่ app.js บรรทัด 16163) · ห่อ: mwPayLife ----
(function(){const SL=globalThis.__wSlots['mwx48'];let mwPayLife=SL.base.mwPayLife;
{const _plF=mwPayLife;mwPayLife=function(M){const r=_plF.apply(this,arguments);try{if(S.age>=18){const yc=mwToB(mwYearCost(M).yr,M),ex=(S.money||0)-yc*8;if(ex>0){const sp=Math.round(ex*.15);S.money-=sp;joy(3);addFeed('ev',`✈️ ใช้จ่ายตามฐานะ ${mwLocal(sp*mwCC().rate,M)} <span class="tag2">(${ch(['เที่ยวต่างประเทศ','ทำบุญ/บริจาค','ช่วยค่ารักษาเพื่อนบ้าน','ซื้อของขวัญให้คนรอบตัว','กินร้านดีๆ ทุกสัปดาห์'].filter(x=>x!=='เที่ยวต่างประเทศ'||!(M.wx&&M.wx.on&&['gatewon','zombie'].includes(M.wx.id))))})</span>`,'sum')}}}catch(e){}return r}}
SL.impl.mwPayLife=mwPayLife;mwPayLife=function(){return globalThis.mwPayLife.apply(this,arguments)};})();

// ---- ท่อน mwx49 (เดิมอยู่ app.js บรรทัด 16165) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx49'];
MW_R.push(
 {id:'sx1',w:9,cd:0,c:M=>M.sec>=40&&!M.fl.public,go(M){choice('📸 มีคนตามถ่าย',`ช่วงนี้มีคนแปลกหน้ายืนถือกล้องอยู่หน้าตึกทุกเช้า โพสต์ในกระทู้ "ลุงคนนี้คือใคร" มีคนตอบสามพันความเห็น`,[
  mwC('ใช้ชีวิตให้น่าเบื่อที่สุดสามเดือน',()=>mwSay('🥱 คุณตื่นเจ็ดโมง ทำงาน กลับบ้าน ดูทีวี นอน ซ้ำกันเก้าสิบวัน คนถือกล้องหายไปทีละคน','good',{sec:-12,joy:-3})),
  mwC('ทำคลิปตอบกลับว่าเป็นแค่นักกายกรรม',()=>mwSay('🎥 คลิปตอบกลับยอดวิวสูงกว่าคลิปที่ตามถ่ายเสียอีก คนครึ่งหนึ่งเชื่อ อีกครึ่งเชื่อว่าคุณโกหก','',{fame:80000,sec:-4})),
  mwC('ย้ายบ้าน',()=>{mwAst(M).h=Math.min(mwAst(M).h,1);mwSay('📦 คุณย้ายข้ามเมืองตอนตีสาม ทิ้งเฟอร์นิเจอร์ไว้ครึ่งหนึ่ง','',{sec:-15,mon:-mwToB(MW_MIN[M.cc||'th'],M),joy:-4})})])}},
 {id:'sx2',w:9,cd:0,c:M=>M.sec>=70&&!M.fl.public&&M.seen.e12,go(M){choice('🛰️ ถูกเฝ้าดู',`โทรศัพท์คุณร้อนผิดปกติทุกคืน รถตู้สีดำจอดหน้าบ้านติดต่อกันสองสัปดาห์${M.fl.agency?' หน่วยลับที่คุณทำงานให้ ไม่ไว้ใจคุณอีกแล้ว':''}`,[
  mwC('ไปเคาะกระจกรถตู้ เชิญดื่มชา',()=>mwSay('🍵 ชายสองคนในรถตู้ลังเลอยู่นาน แล้วลงมาดื่มชากับคุณจริงๆ พวกเขาเขียนรายงานว่า "เป้าหมายไม่เป็นภัย" และขอสูตรชา','good',{sec:-10,joy:5})),
  mwC('หนีไปประเทศอื่น',()=>mwMove(M,'หนีการเฝ้าดู')),
  mwC('อยู่เฉยๆ ไม่สนใจ',()=>mwSay('📵 คุณเลิกพกโทรศัพท์ รถตู้ยังจอดอยู่ตรงนั้นอีกหนึ่งปี','',{sec:5,joy:-6}))])}},
 {id:'sx3',w:12,cd:0,c:M=>M.sec>=95&&!M.fl.public,go(M){choice('🔥 ถูกเปิดโปง',`สื่อทุกสำนักลงข่าวพร้อมกัน: <b>"ชายผู้มีชีวิตเกินมนุษย์"</b> พร้อมภาพจากกล้องวงจรปิด ผลตรวจเลือด และคลิปทั้งหมดที่เคยหลุดออกไป ความลับจบลงแล้ว`,[
  mwC('ยอมรับต่อหน้าโลก',()=>{M.fl.public=1;mwSay('🎤 คุณแถลงข่าวสั้นๆ ห้านาที ประโยคสุดท้ายคือ "ข้าแค่อยากกินข้าวมันไก่อย่างสงบ" ทั้งโลกเปลี่ยนไปนิดหนึ่งในวันนั้น','myth',{fame:5000000,sec:100},true);keyAdd('เปิดเผยตัวตนต่อโลก')}),
  mwC('หนีไปเริ่มต้นใหม่ในประเทศอื่น',()=>mwMove(M,'ถูกเปิดโปง'))])}});
})();

// ---- ท่อน mwx50 (เดิมอยู่ app.js บรรทัด 16182) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx50'];let mwYear=SL.base.mwYear;
{const _myF2=mwYear;mwYear=function(){const foc=S&&S.focus;const r=_myF2.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&M.fame>0){
 if(foc!=='mwnet')M.fame=Math.round(M.fame*.88);
 if(M.fame>=100000){const loc=MW_MIN[M.cc||'th']*12*Math.min(6,M.fame/600000);mwFx({mon:mwToB(loc,M)});addFeed('ev',`📣 รายได้จากโฆษณา/สปอนเซอร์ ${mwLocal(loc,M)} <span class="tag2">(ผู้ติดตาม ${fmt(M.fame)})</span>`,'sum')}
 if(M.fame>=1000000)M.sec=mwCl(M.sec+1,0,100)}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx51 (เดิมอยู่ app.js บรรทัด 16186) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx51'];
MW_R.push(
 {id:'fm1',w:7,cd:5,c:M=>M.fame>=200000,go(M){const v=MW_MIN[M.cc||'th']*(3+Math.min(20,M.fame/200000));choice('🤝 ดีลแบรนด์',`แบรนด์เครื่องดื่มชูกำลังอยากจ้างคุณเป็นพรีเซนเตอร์ ค่าตัว ${mwLocal(v,M)} ต้องโชว์ "ท่ายาก" ในโฆษณาหนึ่งท่า`,[
  mwC('รับงาน',()=>mwSay('📺 โฆษณาออกอากาศทุกช่อง ท่าที่คุณโชว์ถูกนักวิทยาศาสตร์สามคนวิเคราะห์ว่า "เป็นไปไม่ได้ทางฟิสิกส์"','epic',{mon:mwToB(v,M),fame:150000,sec:6})),
  mwC('รับ แต่ขอไม่โชว์ท่ายาก',()=>mwSay('📺 ค่าตัวลดลงครึ่งหนึ่ง โฆษณาธรรมดามาก แต่ปลอดภัย','',{mon:mwToB(v*.5,M),fame:40000})),
  mwC('ปฏิเสธ',()=>mwSay('🙅 คุณปฏิเสธ ผู้จัดการแบรนด์ส่งอีเมลมาอีกสี่ฉบับ','',{joy:1}))])}},
 {id:'fm2',w:6,cd:0,c:M=>M.fame>=600000,go(M){choice('📺 รายการทีวีอยากเชิญ',`รายการทอล์กโชว์อันดับหนึ่งของประเทศเชิญคุณไปออกรายการสด`,[
  mwC('ไปออกรายการ เล่าเรื่องแบบครึ่งจริงครึ่งเล่น',()=>mwSay('🎙️ พิธีกรหัวเราะทุกประโยค คนดูทางบ้านคิดว่าคุณเป็นนักเล่าเรื่องที่เก่งที่สุดของปี มีแค่คุณที่รู้ว่าทุกเรื่องจริง','epic',{fame:400000,sec:5,joy:6})),
  mwC('ปฏิเสธ',()=>mwSay('📵 ข่าวลือว่า "เขากลัวถูกจับได้" ทำให้คนสนใจคุณมากกว่าเดิม','',{fame:50000,sec:3}))])}},
 {id:'fm3',w:6,cd:6,c:M=>M.fame>=1000000,go(M){choice('😡 ทัวร์ลง',`คลิปเก่าของคุณถูกตัดต่อให้ดูเหมือนคุณดูถูกคนอื่น แฮชแท็กด่าคุณติดเทรนด์อันดับหนึ่ง มีคนเอาที่อยู่บ้านคุณไปโพสต์`,[
  mwC('ขอโทษสั้นๆ แล้วหายไปสักพัก',()=>mwSay('🕯️ คุณโพสต์ขอโทษสามบรรทัด แล้วปิดทุกบัญชีหกเดือน เมื่อกลับมา ทุกคนลืมไปแล้ว','',{fame:-300000,sec:-6,joy:-6})),
  mwC('โพสต์คลิปเต็มที่ไม่ถูกตัดต่อ',()=>mwSay('🎞️ คลิปเต็มพลิกทุกอย่าง คนที่ตัดต่อถูกแบนทุกแพลตฟอร์ม ผู้ติดตามคุณเพิ่มขึ้นจากความสงสาร','good',{fame:200000,joy:4})),
  mwC('ไปหาคนที่โพสต์ที่อยู่บ้านคุณ',()=>mwSay('🚪 คุณยืนอยู่หน้าห้องเขาตอนตีสอง ไม่ได้ทำอะไร แค่เคาะประตูสามครั้งแล้วเดินจากไป โพสต์นั้นถูกลบก่อนเช้า','',{sec:8,joy:2}))])}});
})();

// ---- ท่อน mwx52 (เดิมอยู่ app.js บรรทัด 16200) · ห่อ: mwHeirGo ----
(function(){const SL=globalThis.__wSlots['mwx52'];let mwHeirGo=SL.base.mwHeirGo;
{const _hgH=mwHeirGo;mwHeirGo=function(){const h=LS.get('murim_mwheir',null);const r=_hgH.apply(this,arguments);setTimeout(()=>{try{if(S&&S.mw&&S.mw.native&&h){const P=S.mw.par;Object.assign(P,{lin:h.lin,cause:h.cause,py:h.py,pyr:h.pyr,fame:h.fame,seck:h.seck,agency:h.agency});S.mw.tbs=(h.tbs||[]).map(t=>Object.assign({},t,{fromPar:1}));if(h.fame>=200000)S.mw.fame=Math.round(h.fame*.2);saveGame()}}catch(e){console.error(e)}},760);return r}}
SL.impl.mwHeirGo=mwHeirGo;mwHeirGo=function(){return globalThis.mwHeirGo.apply(this,arguments)};})();

// ---- ท่อน mwx53 (เดิมอยู่ app.js บรรทัด 16202) · ห่อ: tbGo ----
(function(){const SL=globalThis.__wSlots['mwx53'];let tbGo=SL.base.tbGo;
{const _tgH=tbGo;tbGo=function(r,mine){if(S.mw&&S.mw.native&&mine){const M=S.mw,P=M.par||{};choice('📜 แผนที่สมบัติของพ่อแม่',`ในสมุดบันทึกของ${esc(P.n||'พ่อแม่')} มีแผนที่วาดด้วยมือ: ชาติก่อนของ${esc(r.on===P.n?'พ่อแม่':r.on)}เคยฝัง<b>${TB_IT[r.it]||'ของ'}</b>ไว้${(TB_LOC[r.loc]||TB_LOC.cave)[1]} ราว ค.ศ. ${r.yr} · วันนี้${TB_MOD[r.loc]||TB_MOD.cave}`,[
  mwC('ไปขุดตามแผนที่',()=>{mwFx({sec:3});tbDig(r,true)}),mwC('เก็บแผนที่ไว้เป็นที่ระลึก',()=>{M.tbs=(M.tbs||[]).filter(x=>x.k!==r.k);mwSay('🗺️ คุณใส่กรอบแผนที่แขวนไว้ในห้องนั่งเล่น','',{joy:3})})]);return}return _tgH.apply(this,arguments)}}
SL.impl.tbGo=tbGo;tbGo=function(){return globalThis.tbGo.apply(this,arguments)};})();

// ---- ท่อน mwx54 (เดิมอยู่ app.js บรรทัด 16204) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx54'];
MW_R.push(
 {id:'hr4',w:9,cd:0,c:M=>M.native&&M.par&&M.par.lin&&M.y>=1,go(M){const L=mwCC().lin,P=M.par;mwSay(`🧓 ชายชราผมขาวคนหนึ่งมาเคาะประตู "ผมชื่อ${esc(L)} พ่อแม่คุณเคยช่วยชีวิตผมไว้ตอนผมยังเป็นเด็กมัธยมผมยุ่ง" เขายื่นรูปถ่ายเก่าให้ ${esc(P.n)}ยืนอยู่บนดาดฟ้าข้างเด็กผู้ชายคนหนึ่ง ทั้งคู่หัวเราะ · เขามาเยี่ยมทุกเดือนหลังจากนั้น`,'myth',{joy:12},true)}},
 {id:'hr5',w:6,cd:4,c:M=>M.native&&M.par&&M.y>=2,go(M){const P=M.par;mwSay(ch([`🕯️ วันครบรอบการจากไปของ${esc(P.n)} คุณจุดธูปหน้ารูปถ่าย แล้วนึกขึ้นได้ว่าพ่อแม่ไม่เคยบอกวันเกิดจริงของตัวเองเลย`,`📓 คุณเปิดสมุดบันทึกเล่มเดิมอีกครั้ง เจอหน้าที่ไม่เคยเห็น: "วันนี้ลูกเดินได้ก้าวแรก ข้าเคยเห็นยอดฝีมือร้อยคนก้าวเข้าสนามประลอง ไม่มีก้าวไหนสำคัญเท่านี้"`,`🍜 คุณไปกินร้านประจำของ${esc(P.n)} เจ้าของร้านยังจำได้ว่าพ่อแม่คุณสั่งอะไรทุกครั้ง`]),'',{joy:4})}},
 {id:'hr6',w:7,cd:0,c:M=>M.native&&M.par&&M.par.sp&&M.y>=4,go(M){const P=M.par;mwSay(`🕯️ ${esc(P.sp)} พ่อ/แม่อีกคนคุณ จากไปอย่างสงบ ในวันสุดท้ายเขาบอกว่า "${esc(P.n)}เคยกลัวว่าจะมีชีวิตยาวเกินคนที่รัก สุดท้ายฉันก็อยู่นานกว่า ฝากบอกเขาด้วยว่าฉันชนะ"`,'bad',{joy:-12},true)}},
 {id:'hr7',w:7,cd:0,c:M=>M.native&&M.y>=4&&(M.par&&(M.par.seck||M.par.agency)),go(M){choice('🕴️ หน่วยลับมาเยี่ยม',`ชายในสูทสีเทามาที่บ้าน "เราเคยรู้จักพ่อแม่คุณ ลูกหลานของคนหลงยุคมีความเสี่ยง และมีความสามารถ เราอยากให้คุณมาทำงานด้วย"`,[
  mwC('รับงาน',()=>{M.fl.agency=1;mwSay('🪪 คุณได้บัตรผ่านสีเทาเหมือนที่พ่อแม่เคยได้ งานแรกคือตามหาลูกหลานคนหลงยุคคนอื่น','',{sec:-15,mon:mwS(120000)})}),
  mwC('ปฏิเสธ',()=>mwSay('🚪 เขาวางนามบัตรไว้บนโต๊ะ "ถ้าเปลี่ยนใจ" นามบัตรว่างเปล่าแบบเดียวกับที่พ่อแม่เคยเล่าให้ฟัง','',{sec:4}))])}},
 {id:'hr8',w:6,cd:0,c:M=>M.native&&M.qi>=2&&M.y>=5,go(M){mwSay('📖 ในสมุดบันทึกเล่มสุดท้ายของพ่อแม่ มีบทหนึ่งเขียนว่า "วิชาสำหรับลูก" ทุกท่าถูกปรับให้ฝึกได้ในห้องเล็กๆ ไม่มีเสียงดัง ไม่ทำให้เพื่อนบ้านสงสัย พ่อแม่คิดเผื่อยุคนี้ไว้หมดแล้ว','epic',{qi:2,joy:6},true)}});
})();

// ---- ท่อน mwx55 (เดิมอยู่ app.js บรรทัด 16226) · ห่อ: mwDraw ----
(function(){const SL=globalThis.__wSlots['mwx55'];let mwDraw=SL.base.mwDraw;
{const _mdF=mwDraw;mwDraw=function(c,t){const r=_mdF.apply(this,arguments);try{if(mwOn())mwSkin2(c,t)}catch(e){}return r}}
SL.impl.mwDraw=mwDraw;mwDraw=function(){return globalThis.mwDraw.apply(this,arguments)};})();

// ---- ท่อน mwx56 (เดิมอยู่ app.js บรรทัด 16229) · ห่อ: endGame ----
(function(){const SL=globalThis.__wSlots['mwx56'];let endGame=SL.base.endGame;
{const _egT=endGame;endGame=function(){const r=_egT.apply(this,arguments);try{if(S&&S.mw){const E=$('end'),M=S.mw;if(E){const tw=document.createTreeWalker(E,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){if(n.parentNode.closest&&n.parentNode.closest('.mwSum'))continue;const v=n.nodeValue;let w=v.replace(/「[^」]*」/,'「'+mwTitle(M)+'」').replace(/ยุคยุทธภพ\S*|ยุทธภพปกติ|ยุคที่[^·]*ไร้เทียมทาน/g,`${mwCC().f} ${mwCC().city} ค.ศ. ${MW_Y0+M.y}`).replace(/สามัญชนในยุทธภพ/g,mwTitle(M));if(w!==v)n.nodeValue=w}}}}catch(e){console.error(e)}return r}}
SL.impl.endGame=endGame;endGame=function(){return globalThis.endGame.apply(this,arguments)};})();

// ---- ท่อน mwx57 (เดิมอยู่ app.js บรรทัด 16290) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx57'];let mwEnter=SL.base.mwEnter;
{const _meB=mwEnter;mwEnter=function(){const had=S&&S.mw;const r=_meB.apply(this,arguments);try{const M=S.mw;if(M&&!had&&!M.b2){M.b2=1;M.end=Math.max(S.age+15,R(78,95));M.id=0;M.goals=mwGoalPick(M);M.vis={};M.vis[M.cc||'th']=1}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx58 (เดิมอยู่ app.js บรรทัด 16291) · ห่อ: mwHeirGo ----
(function(){const SL=globalThis.__wSlots['mwx58'];let mwHeirGo=SL.base.mwHeirGo;
{const _hgB=mwHeirGo;mwHeirGo=function(){const h=LS.get('murim_mwheir',null);const r=_hgB.apply(this,arguments);setTimeout(()=>{try{const M=S&&S.mw;if(M&&M.native&&!M.b2){M.b2=1;M.end=Math.max(S.age+10,R(78,95));M.id=2;M.goals=mwGoalPick(M);M.vis={};M.vis[M.cc]=1;if(h&&h.loan){M.loan=Math.round(h.loan*.8);log(`💀 หลังงานศพ ชายสามคนมายืนรอหน้าบ้าน หนี้นอกระบบของ${esc(h.par)}ตกมาถึงคุณ ${mwLocal(M.loan*mwCC().rate,M)}`,'bad',true)}saveGame()}}catch(e){console.error(e)}},800);return r}}
SL.impl.mwHeirGo=mwHeirGo;mwHeirGo=function(){return globalThis.mwHeirGo.apply(this,arguments)};})();

// ---- ท่อน mwx59 (เดิมอยู่ app.js บรรทัด 16295) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx59'];let mwYear=SL.base.mwYear;
{const _myB=mwYear;mwYear=function(){const r=_myB.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M){const h=S.happy||50;M.lowJ=h<28?(M.lowJ||0)+1:0;
 if(M.lowJ>=2){if(M.job)M.job.perf=mwCl(M.job.perf-8,0,100);S.hp=Math.max(10,S.hp-8);addFeed('ev','😮‍💨 ความสุขต่ำมาหลายปี ทำงานไม่ค่อยได้ ร่างกายทรุดลง','sum')}else if(h>=80&&M.job)M.job.perf=mwCl(M.job.perf+3,0,100);
 if(M.fl.agency&&(M.id||0)<3){M.id=3;addFeed('ev','🪪 หน่วยลับออกเอกสารตัวตนให้คุณ ถูกต้องตามกฎหมายทุกอย่าง แต่ชื่อคุณอยู่ในแฟ้มของพวกเขาตลอดไป','sum')}
 if(M.idP&&M.y>=M.idP&&(M.id||0)<2){M.id=2;M.idP=0;log('🪪 <b>ได้บัตรประชาชนแล้ว!</b> หลังรอเอกสารมาหลายปี ในที่สุดคุณก็ "มีตัวตน" ในยุคนี้อย่างถูกกฎหมาย','epic',true);keyAdd('ได้สัญชาติในยุคปัจจุบัน')}
 if(M.id===1&&Math.random()<.06)setTimeout(()=>{if(S&&S.mw&&!choice._cur)mwFakeCaught(S.mw)},1500);
 mwGoalCheck(M)}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx60 (เดิมอยู่ app.js บรรทัด 16303) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx60'];
MW_R.push({id:'id1',w:5,cd:0,c:M=>!M.native&&(M.id||0)===0&&!M.idP&&M.y>=1,go(M){const fk=MW_MIN[M.cc||'th']*3;choice('🪪 คุณไม่มีตัวตน',`ไม่มีบัตรประชาชน ไม่มีพาสปอร์ต ไม่มีประวัติในระบบใดๆ เปิดบัญชีธนาคารไม่ได้ เซ็นสัญญาเช่าไม่ได้ งานประจำส่วนใหญ่ไม่รับ ในสายตาของรัฐ คุณไม่มีอยู่จริง`,[
 mwC('ยื่นเรื่องขอสถานะบุคคลไร้สัญชาติ',()=>{M.idP=M.y+R(3,6);mwSay(`📄 เจ้าหน้าที่ยื่นแบบฟอร์มให้สิบสองฉบับ "รอผลประมาณ ${M.idP-M.y} ปีครับ" ระหว่างนี้คุณยังทำได้แค่งานรายวันและงานที่ไม่ถามเอกสาร`,'',{adapt:4})},{s:'ถูกกฎหมาย · ต้องรอหลายปี'}),
 mwC('ซื้อเอกสารปลอม',()=>{const b=mwToB(fk,M);if((S.money||0)<b)return mwSay('💸 เงินไม่พอจ่ายคนทำเอกสาร','',null);S.money-=b;M.id=1;mwSay(`🪪 ชายในร้านถ่ายเอกสารหลังตลาดทำบัตรให้ในสองวัน ชื่อในบัตรไม่ใช่ชื่อคุณ ใช้งานได้ แต่ถ้าโดนตรวจละเอียดเมื่อไหร่ จบ`,'',{sec:3})},{s:`${mwLocal(fk,M)} · มีโอกาสโดนจับ`}),
 mwC('ใช้ชีวิตแบบไม่มีเอกสารไปก่อน',()=>mwSay('🕳️ คุณรับเงินสด นอนห้องที่ไม่ต้องเซ็นสัญญา และเรียนรู้ว่าในเมืองใหญ่ มีคนแบบคุณอยู่มากกว่าที่คิด','',{adapt:3,joy:-2}))])}});
})();

// ---- ท่อน mwx61 (เดิมอยู่ app.js บรรทัด 16312) · ห่อ: mwAs ----
(function(){const SL=globalThis.__wSlots['mwx61'];let mwAs=SL.base.mwAs;
{const _asB=mwAs;mwAs=function(k){const M=S.mw,id=M.id||0;if(k==='mort'&&id<2&&!M.sky&&!M.fog)return toast('กู้ซื้อบ้านต้องมีบัตรประชาชนถูกกฎหมาย');if(['cash','car','ins'].includes(k)&&id<1&&!M.sky&&!M.fog)return toast('ต้องมีเอกสารตัวตนก่อน');return _asB.apply(this,arguments)}}
SL.impl.mwAs=mwAs;mwAs=function(){return globalThis.mwAs.apply(this,arguments)};})();

// ---- ท่อน mwx62 (เดิมอยู่ app.js บรรทัด 16313) · ห่อ: mwMove ----
(function(){const SL=globalThis.__wSlots['mwx62'];let mwMove=SL.base.mwMove;
{const _mvB=mwMove;mwMove=function(M,why){const id=M.id||0;if(id===0){const c=mwToB(MW_MIN[M.cc||'th']*5,M);if((S.money||0)<c){mwSay('🚫 ไม่มีพาสปอร์ต และไม่มีเงินพอจ้างคนลักลอบพาข้ามแดน คุณหนีไปไหนไม่ได้','bad',{sec:5,joy:-6});return}S.money-=c;M.sec=mwCl(M.sec+5,0,100)}
 if(id===1&&Math.random()<.3){mwFx({mon:-mwToB(MW_MIN[M.cc||'th']*3,M),sec:8});mwSay('🛂 ตม. ตรวจพบพาสปอร์ตปลอมที่สนามบิน คุณถูกปรับและถูกส่งกลับ หนีไม่สำเร็จ','bad',{joy:-8});M.id=0;return}
 const r=_mvB.apply(this,arguments);if(id>=2)M.id=1;M.vis=M.vis||{};M.vis[M.cc]=1;return r}}
SL.impl.mwMove=mwMove;mwMove=function(){return globalThis.mwMove.apply(this,arguments)};})();

// ---- ท่อน mwx63 (เดิมอยู่ app.js บรรทัด 16316) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx63'];
{const _l3=MW_R.find(e=>e.id==='love3');if(_l3){const g0=_l3.go;_l3.go=function(M){g0.apply(this,arguments);setTimeout(()=>{if(S&&S.mw&&S.mw.sp&&(S.mw.id||0)<2&&!S.mw.idP){S.mw.idP=S.mw.y+2;addFeed('ev','🪪 คู่ชีวิตช่วยยื่นเรื่องขอสถานะให้คุณ อีกราวสองปีจะได้บัตรประชาชน','sum')}},2500)}}}
})();

// ---- ท่อน mwx64 (เดิมอยู่ app.js บรรทัด 16341) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx64'];
MW_R.push(
 {id:'cb1',w:5,cd:6,c:M=>M.y>=5&&(M.qi||0)>=3,go(M){mwBattle(M,{t:'⚔️ ผู้ฝึกตนท้าประลอง',txt:'ชายหนุ่มที่มีปราณแน่นหนาดักรอคุณบนดาดฟ้า "ได้ยินว่ามียอดฝีมือรุ่นเก่าอยู่ในเมืองนี้ ข้าอยากรู้ว่ายุคเก่าเก่งจริงไหม"',foe:.6+Math.random()*.9,
  win:()=>{M.stones=(M.stones||0)+1;mwSay('🏆 ชายหนุ่มคุกเข่ายอมแพ้ ยื่นหินปราณให้หนึ่งก้อนเป็นค่าบทเรียน "ยุคเก่าเก่งจริง"','epic',{qi:1,joy:6})},lose:()=>mwSay('🩸 คุณแพ้ ชายหนุ่มดูดปราณคุณไปส่วนหนึ่งก่อนจากไป','bad',{qi:-2,joy:-8})})}},
 {id:'cb2',w:6,cd:8,c:M=>M.fl.foe&&M.y>=9,go(M,P){mwBattle(M,{t:'🗡️ นักฆ่าจากศัตรูเก่า',txt:`ตีสาม หน้าต่างห้องเปิดออกเงียบๆ ชายชุดดำถือมีดสั้นที่อาบพิษแบบโบราณ ${P.foe?esc(P.foe):'ศัตรูเก่า'}ส่งมา`,foe:.8+Math.random(),
  win:()=>mwSay('🌑 นักฆ่าหนีไปพร้อมแขนที่หัก ทิ้งมีดสั้นไว้หนึ่งเล่ม ด้ามสลักตราของตระกูลศัตรูเก่า','epic',{sec:4,joy:4}),lose:()=>mwSay('☠️ พิษในมีดทำให้คุณนอนซมสามเดือน ปราณที่สะสมไว้หายไปครึ่งหนึ่ง','bad',{qi:-Math.round((M.qi||0)/2),joy:-10})})}},
 {id:'cb3',w:6,cd:6,c:M=>M.y>=2&&!!M.job,go(M){mwBattle(M,{t:'👊 แก๊งเก็บค่าคุ้มครอง',txt:'แก๊งวัยรุ่นห้าคนมาเก็บ "ค่าคุ้มครอง" จากที่ทำงานคุณ คนเป็นหัวหน้าถือไม้เบสบอล',foe:.05+Math.random()*.1,pub:1,
  win:(h)=>mwSay(h==='hide'?'🥋 คุณล้มทั้งห้าคนด้วยท่าที่ดูเหมือนบังเอิญลื่น เจ้านายคุณขึ้นเงินเดือนให้':'💥 ทั้งห้าคนวิ่งหนีโดยไม่เหลียวหลัง คลิปจากกล้องหน้าร้านถูกแชร์ทั้งย่าน','good',{joy:6,fame:h==='hide'?0:20000}),
  lose:()=>mwSay('🤕 คุณออมมือมากเกินไปจนโดนตีหัว ต้องจ่ายค่าคุ้มครองไปหนึ่งเดือน','bad',{mon:-mwToB(MW_MIN[M.cc||'th']*.5,M)}),talk:()=>mwSay('🗣️ คุณคุยกับหัวหน้าแก๊งครึ่งชั่วโมง เขากลับไปพร้อมความคิดที่จะเลิกเก็บค่าคุ้มครอง หรืออย่างน้อยก็เลิกเก็บที่นี่','good',{joy:4})})}},
 {id:'cb4',w:7,cd:8,c:M=>M.sec>=60&&!M.fl.agency,go(M){mwBattle(M,{t:'🕴️ นักล่าผู้ฝึกตน',txt:'ทีมชุดดำสี่คนพร้อมปืนยิงตาข่ายไฟฟ้าล้อมคุณในลานจอดรถ "คุณถูกเชิญไปให้ข้อมูล ด้วยความสมัครใจหรือไม่ก็ได้"',foe:.4+Math.random()*.6,
  win:()=>mwSay('⚡ ตาข่ายไฟฟ้าทั้งสี่ลูกพลาดเป้า ทีมชุดดำถอยกลับไปรายงานว่า "เป้าหมายอันตรายกว่าที่ประเมิน"','epic',{sec:8}),lose:()=>{M.fl.agency=1;mwSay('🧷 คุณตื่นขึ้นในห้องสีขาว สามเดือนต่อมาคุณได้ออกมา พร้อมสัญญาจ้างที่ไม่มีทางเลือก','bad',{sec:-20,joy:-12})}})}},
 {id:'cb5',w:4,cd:5,c:M=>M.y>=1,go(M){mwBattle(M,{t:'🔪 ถูกดักปล้นตอนดึก',txt:'คนถือมีดสองคนดักคุณในซอยเปลี่ยวตอนเดินกลับบ้าน "เอากระเป๋าตังค์มา"',foe:.03,
  win:(h)=>mwSay(h==='hide'?'🥋 มีดหลุดจากมือทั้งสองคนพร้อมกัน พวกเขาวิ่งหนีโดยไม่เข้าใจว่าเกิดอะไรขึ้น':'💥 สองคนนั้นตื่นมาอีกทีในโรงพยาบาล จำอะไรไม่ได้นอกจากมือที่เร็วกว่าตาเห็น','',{joy:3}),
  lose:()=>mwSay('💸 คุณยอมให้กระเป๋าไป เพราะออมมือจนพลาดโดนมีดเฉี่ยว','bad',{mon:-mwToB(MW_MIN[M.cc||'th']*.3,M)}),talk:()=>mwSay('🗣️ คุณยื่นเงินให้พวกเขาครึ่งหนึ่ง พร้อมเบอร์ศูนย์หางาน หนึ่งในนั้นร้องไห้','',{mon:-mwToB(MW_MIN[M.cc||'th']*.1,M),joy:4})})}},
 {id:'cb6',w:4,cd:6,c:M=>M.y>=4&&(S.power||0)>200,go(M){const pr=MW_MIN[M.cc||'th']*6;choice('🥊 ไฟต์ใต้ดิน',`มีคนชวนไปชกรายการใต้ดิน เงินรางวัล ${mwLocal(pr,M)} ไม่มีกฎ ไม่มีกล้อง ไม่มีกรรมการ`,[
  mwC('ไปชก',()=>mwBattle(M,{t:'🥊 เวทีใต้ดิน',txt:'คู่ชกเป็นอดีตทหารรับจ้างตัวใหญ่สองเท่าคุณ คนดูร้อยคนตะโกนลั่นโกดัง',foe:.1+Math.random()*.3,
   win:()=>mwSay('💰 คุณชนะในสิบวินาที เจ้าของรายการขอให้มาชกทุกเดือน','epic',{mon:mwToB(pr,M),fame:5000,sec:3}),lose:()=>mwSay('🩹 คุณออมมือจนแพ้ ไม่ได้เงินสักบาท','bad',{joy:-5})})),
  mwC('ไม่ไป',()=>mwSay('🚶 คุณไม่ไป ตำแหน่งนั้นมีคนอื่นไปแทน และถูกหามออกมา','',null))])}});
})();

// ---- ท่อน mwx65 (เดิมอยู่ app.js บรรทัด 16382) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx65'];let mwYear=SL.base.mwYear;
{const _myW=mwYear;mwYear=function(){const r=_myW.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&M.fl.heat&&mwQi(M)<3)S.hp=Math.max(10,S.hp-4)}catch(e){}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx66 (เดิมอยู่ app.js บรรทัด 16385) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx66'];
MW_R.push({id:'dis',w:5,cd:9,c:M=>M.y>=3,go(M){const D=MW_DIS[M.cc||'th'];choice(D[0],D[1],[
 mwC('ใช้วิชาช่วยคนเต็มที่',()=>mwSay('🦸 คุณช่วยคนออกมาได้หลายสิบคนด้วยความเร็วและแรงที่ไม่ใช่มนุษย์ ภาพคุณอยู่ในข่าวทุกช่อง หน่วยกู้ภัยตามหา "อาสาสมัครปริศนา"','epic',{sec:15,fame:200000,joy:12},true),{s:'ช่วยได้มาก · ความลับรั่วมาก'}),
 mwC('ช่วยเงียบๆ เท่าที่คนปกติทำได้',()=>mwSay('🤝 คุณช่วยแบกของ ช่วยหาที่พัก ช่วยได้ไม่กี่คน แต่ไม่มีใครถามว่าคุณเป็นใคร','good',{joy:6,sec:1})),
 ...((M.qi||0)>=3?[mwC('🌀 ใช้ปราณช่วยแบบไร้ร่องรอย (ปราณ −2)',()=>mwSay('🌫️ คุณเคลื่อนไหวเร็วจนกล้องจับได้แค่เงาเบลอ ช่วยคนได้มากโดยไม่มีใครเห็นหน้า','epic',{qi:-2,sec:4,joy:10}))]:[]),
 mwC('ดูแลตัวเองและคนใกล้ตัวก่อน',()=>mwSay('🏠 คุณดูแลคนในบ้านและเพื่อนบ้านจนผ่านพ้นไป ข่าวรายงานยอดผู้เสียชีวิตทุกคืน','',{joy:-6}))])}});
})();

// ---- ท่อน mwx67 (เดิมอยู่ app.js บรรทัด 16391) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx67'];
MW_R.push(
 {id:'fr1',w:7,cd:0,c:M=>M.y>=2&&!M.bf,go(M){const n=mwNm(M,0);M.bf={n,y:M.y};mwSay(`🤝 <b>${esc(n)}</b> คนที่นั่งข้างคุณในร้านประจำมาครึ่งปี วันหนึ่งเขาแบ่งกับข้าวให้ ตั้งแต่นั้นคุณก็มีเพื่อนสนิทคนแรกในยุคนี้`,'good',{joy:8})}},
 {id:'fr2',w:6,cd:0,c:M=>M.bf&&!M.bf.d&&M.y-M.bf.y>=3,go(M){const n=M.bf.n,v=MW_MIN[M.cc||'th']*4;choice('💸 เพื่อนขอยืมเงิน',`${esc(n)}ตกงานกะทันหัน ขอยืมเงิน ${mwLocal(v,M)} "สัญญาว่าจะคืนภายในปีนี้"`,[
  mwC('ให้ยืม',()=>{const b=mwToB(v,M);if((S.money||0)<b)return mwSay('💸 คุณมีไม่พอ ให้ได้ครึ่งเดียว เขาขอบคุณจนน้ำตาซึม','',{mon:-Math.round(b/2),joy:2});S.money-=b;M.bf.debt=b;mwSay(`🤝 คุณโอนให้ทันที ${esc(n)}ส่งสติกเกอร์กอดมาสิบอัน`,'good',{joy:4})}),
  mwC('ให้เลย ไม่ต้องคืน',()=>{const b=mwToB(v,M);if((S.money||0)<b)return mwSay('💸 เงินไม่พอ','',null);S.money-=b;M.bf.gift=1;mwSay(`🎁 ${esc(n)}เงียบไปนาน แล้วบอกว่า "ไม่มีใครเคยทำแบบนี้ให้ฉันเลย"`,'good',{joy:8})}),
  mwC('ปฏิเสธ',()=>{M.bf.cold=1;mwSay(`😶 ${esc(n)}บอกว่าเข้าใจ แต่หลังจากนั้นก็นัดกินข้าวกันน้อยลง`,'',{joy:-4})})])}},
 {id:'fr3',w:6,cd:0,c:M=>M.bf&&!M.bf.d&&!M.bf.cold&&M.y-M.bf.y>=6,go(M){const n=M.bf.n;choice('🤫 เพื่อนเห็นความลับ',`${esc(n)}เห็นคุณกระโดดจากชั้นห้าลงมายืนบนพื้นโดยไม่มีรอยขีดข่วน เขายืนอ้าปากค้าง`,[
  mwC('เล่าความจริงทั้งหมด',()=>{M.bf.k=1;mwSay(`💬 ${esc(n)}ฟังจนจบ แล้วพูดประโยคเดียว "งั้นที่แกกินเผ็ดไม่เป็นก็เพราะยุคก่อนไม่มีพริกใช่ไหม" ทั้งคู่หัวเราะจนน้ำตาไหล`,'myth',{joy:12,sec:2},true)}),
  mwC('บอกว่าเขาตาฝาด',()=>mwSay(`🙄 ${esc(n)}ไม่เชื่อ แต่ไม่ถามต่อ มิตรภาพยังอยู่ แต่มีบางอย่างที่ไม่เหมือนเดิม`,'',{joy:-2}))])}},
 {id:'fr4',w:5,cd:0,c:M=>M.bf&&!M.bf.d&&M.bf.debt&&M.y-M.bf.y>=5,go(M){const ok=Math.random()<.6;if(ok){S.money+=M.bf.debt;mwSay(`💵 ${esc(M.bf.n)}โอนเงินคืนครบพร้อมกล่องขนมหนึ่งกล่อง "ช้าไปหน่อย แต่ไม่เคยลืม"`,'good',{joy:6})}else mwSay(`🍂 ${esc(M.bf.n)}ไม่เคยคืนเงิน และเลิกติดต่อไปเฉยๆ`,'bad',{joy:-6});M.bf.debt=0}},
 {id:'fr5',w:6,cd:0,c:M=>M.bf&&!M.bf.d&&S.age>=80,go(M){M.bf.d=1;mwSay(`🕯️ <b>${esc(M.bf.n)}</b>เพื่อนสนิทคนแรกในยุคนี้จากไปแล้ว ${M.bf.k?'เขาเป็นคนเดียวนอกครอบครัวที่รู้ว่าคุณเป็นใคร และไม่เคยบอกใครเลย':'เขาไม่เคยรู้ว่าคุณเป็นใคร แต่รู้ว่าคุณเป็นเพื่อนที่ดี'}`,'bad',{joy:-14},true)}},
 {id:'cw1',w:5,cd:7,c:M=>!!M.job&&M.y>=3,go(M){const n=mwNm(M,0);choice('🏢 เพื่อนร่วมงาน',`<b>${esc(n)}</b> เพื่อนร่วมงานรุ่นน้อง แอบเอาผลงานคุณไปเสนอหัวหน้าในชื่อตัวเอง`,[
  mwC('เผชิญหน้าตรงๆ',()=>{if(M.job)M.job.perf=mwCl(M.job.perf+6,0,100);mwSay(`🗣️ คุณพูดต่อหน้าทุกคนในที่ประชุมอย่างใจเย็น ${esc(n)}หน้าแดงแล้วยอมรับ`,'good',{joy:3})}),
  mwC('ปล่อยไป ผลงานจริงพิสูจน์ตัวเอง',()=>{if(M.job)M.job.perf=mwCl(M.job.perf-4,0,100);mwSay(`🍵 คุณไม่พูดอะไร สองปีต่อมา ${esc(n)}มาขอโทษ และกลายเป็นคนที่ช่วยคุณมากที่สุดในที่ทำงาน`,'',{joy:2})}),
  mwC('สอนงานให้เขาจริงๆ',()=>{M.dis=(M.dis||0)+1;mwSay(`📚 คุณเรียก${esc(n)}มาสอนงานทีละขั้น แบบเดียวกับที่สอนศิษย์ในยุทธภพ เขาเปลี่ยนไปเป็นคนละคน`,'good',{joy:6})})])}},
 {id:'trv',w:5,cd:4,c:M=>M.y>=3&&S.age<88,go(M){const ks=Object.keys(MW_CC).filter(k=>k!==(M.cc||'th'));const pick=[];while(pick.length<3&&ks.length)pick.push(ks.splice(Math.floor(Math.random()*ks.length),1)[0]);const cost=MW_MIN[M.cc||'th']*2;
  choice('✈️ เที่ยวต่างประเทศ',`วันหยุดยาวมาถึง ตั๋วเครื่องบินกับที่พักรวมราว ${mwLocal(cost,M)}${(M.id||0)<1?' · <b>แต่คุณไม่มีพาสปอร์ต</b>':''}`,[...pick.map(k=>mwC(`${MW_CC[k].f} ไป${MW_CC[k].city}`,()=>{if((M.id||0)<1)return mwSay('🛂 ไม่มีพาสปอร์ต ไปไหนไม่ได้ คุณดูวิดีโอเที่ยว'+MW_CC[k].city+'ในมือถือแทนทั้งคืน','',{joy:-2});if(M.id===1&&Math.random()<.15){mwFakeCaught(M);return}const b=mwToB(cost,M);if((S.money||0)<b)return mwSay('💸 เงินไม่พอ','',null);S.money-=b;M.vis=M.vis||{};M.vis[k]=1;mwSay(`${MW_CC[k].f} ห้าวันใน${MW_CC[k].city} ${ch(['คุณกินทุกอย่างที่ขวางหน้า','คุณนั่งดูผู้คนในสวนสาธารณะทั้งบ่าย','คุณหลงทางสามครั้งและไม่เสียใจเลยสักครั้ง','คุณเจอวัดเก่าที่ปราณแรงกว่าที่คาด'])}`,'good',{joy:12,adapt:3})})),mwC('อยู่บ้าน',()=>mwSay('🛋️ คุณนอนดูซีรีส์ทั้งวันหยุด ก็ดีเหมือนกัน','',{joy:3}))])}},
 {id:'hob',w:5,cd:0,c:M=>M.y>=3&&!M.hob,go(M){const H=[['🎣','ตกปลา'],['♟️','หมากล้อม'],['🌱','ปลูกต้นไม้'],['🍳','ทำอาหาร'],['🎮','เล่นเกม'],['🖌️','เขียนพู่กันจีน']];const P=[];const L=H.slice();while(P.length<4)P.push(L.splice(Math.floor(Math.random()*L.length),1)[0]);
  choice('🎨 งานอดิเรก',(S.mw&&S.mw.native)?'วันหยุดยาวครั้งแรกในรอบหลายเดือน ไม่มีงานค้าง ไม่มีใครโทรตาม คุณอยากลองทำอะไร':'ชีวิตในยุคนี้มีเวลาว่างมากกว่าในยุทธภพ ที่ซึ่งทุกวันคือการฝึกและการเอาตัวรอด คุณอยากลองทำอะไร',P.map(h=>mwC(`${h[0]} ${h[1]}`,()=>{M.hob={n:h[1],ic:h[0],y:M.y};mwSay(`${h[0]} คุณเริ่ม${h[1]} ${h[1]==='เล่นเกม'?'เกมแรกที่เล่นคือเกมกำลังภายใน คุณบ่นว่าท่าไม่สมจริงทั้งคืน':h[1]==='หมากล้อม'?'ในหนึ่งปีคุณชนะทุกคนในสวนสาธารณะ':h[1]==='เขียนพู่กันจีน'?'ลายมือคุณถูกถามว่า "ลอกมาจากพิพิธภัณฑ์ไหน"':'ครั้งแรกในรอบหลายร้อยปีที่ทำอะไรสักอย่างโดยไม่มีเป้าหมาย'}`,'good',{joy:8})})))}},
 {id:'hob2',w:4,cd:6,c:M=>M.hob&&M.y-M.hob.y>=3,go(M){const h=M.hob;mwSay(`${h.ic} ${ch([`คุณชนะการแข่งขัน${h.n}ระดับเมือง กรรมการถามว่าฝึกมากี่ปี คุณตอบว่า "${M.y-h.y} ปี" ไม่นับเจ็ดร้อยปีก่อนหน้านั้น`,`มีเด็กข้างบ้านมาขอเรียน${h.n}กับคุณทุกเสาร์`,`${h.n}ทำให้คุณลืมนับปีไปหนึ่งปีเต็ม เป็นปีที่สงบที่สุดตั้งแต่มาถึงยุคนี้`])}`,'good',{joy:6})}},
 {id:'hc1',w:4,cd:0,c:M=>S.age>=55&&!M.chr&&mwQi(M)<3,go(M){const n=ch(['ความดันโลหิตสูง','เบาหวาน','ข้อเข่าเสื่อม']);M.chr={n,y:M.y};mwSay(`🩺 ผลตรวจประจำปี: <b>${n}</b> หมอบอกว่าต้องรักษาต่อเนื่องไปตลอด ร่างกายในยุคนี้แก่ลงแบบคนธรรมดาจริงๆ`,'bad',{joy:-5})}},
 {id:'hc2',w:4,cd:0,c:M=>M.chr&&S.age>=72&&!M.chr.big,go(M){M.chr.big=1;mwSay(`🚑 ${mwMedBill(M,MW_MIN[M.cc||'th']*8,`อาการของ${M.chr.n}กำเริบหนัก ต้องผ่าตัดด่วน`)}`,'bad',{joy:-8});S.hp=Math.max(10,Math.round(S.hp*.5))}});
})();

// ---- ท่อน mwx68 (เดิมอยู่ app.js บรรทัด 16413) · ห่อ: mwPayLife ----
(function(){const SL=globalThis.__wSlots['mwx68'];let mwPayLife=SL.base.mwPayLife;
{const _plH=mwPayLife;mwPayLife=function(M){const r=_plH.apply(this,arguments);try{if(M.chr){if(mwQi(M)>=3){addFeed('ev',`🌀 ปราณวงจรใหญ่ชำระร่างกาย อาการ${M.chr.n}หายไปจนหมอประหลาดใจ`,'sum');M.chr=null}else{const v=MW_MIN[M.cc||'th']*((M.ast||{}).ins?.3:1.5);S.money=Math.max(0,(S.money||0)-mwToB(v,M));addFeed('ev',`💊 ค่ารักษา${M.chr.n}ทั้งปี ${mwLocal(v,M)}${(M.ast||{}).ins?' (ประกันช่วยจ่าย)':''}`,'sum')}}
 if(M.fl.penCut&&M.retired)S.money=Math.max(0,(S.money||0)-mwToB(MW_MIN[M.cc||'th']*.35*12*.2,M))}catch(e){}return r}}
SL.impl.mwPayLife=mwPayLife;mwPayLife=function(){return globalThis.mwPayLife.apply(this,arguments)};})();

// ---- ท่อน mwx69 (เดิมอยู่ app.js บรรทัด 16426) · ห่อ: choice ----
(function(){const SL=globalThis.__wSlots['mwx69'];let choice=SL.base.choice;
{const _chXO=choice;choice=function(title,text,opts){try{if(mwOn()&&Array.isArray(opts)&&opts.length>=2&&opts.length<=4&&!opts.some(o=>o&&o._xo)&&Math.random()<.5){const M=S.mw,main=opts.find(o=>o&&!o.skip&&typeof o.f==='function');const L=MW_XO.filter(x=>{try{return x[0](M)}catch(e){return false}});
 if(main&&L.length){const x=ch(L),mt=mwTxt(main.t).replace(/^[^\wก-๙"]+/,'').slice(0,28);opts=opts.concat([{_xo:1,t:`${x[1]} ${x[2]}: "${mt}"`,s:x[4],f(){main.f();setTimeout(()=>{if(S&&S.mw){const fx=x[3](S.mw);mwFx(fx);addFeed('ev',`${x[1]} ${x[2]} — ผลดีขึ้นกว่าปกติ`,'sum')}},60)}}])}}}catch(e){console.error(e)}return _chXO.call(this,title,text,opts)};for(const k of Object.keys(_chXO))try{choice[k]=_chXO[k]}catch(e){}}
SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};})();

// ---- ท่อน mwx70 (เดิมอยู่ app.js บรรทัด 16434) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx70'];let openMenu=SL.base.openMenu;
{const _omMW=openMenu;openMenu=function(){const r=_omMW.apply(this,arguments);try{if(!mwOn())return r;const gd=$('modal').querySelector('.mgrid');if(!gd)return r;
 $('modal').querySelectorAll('.mgrid').forEach(g=>{[...g.querySelectorAll('button.opt')].forEach(b=>{if(MW_HIDE.test(b.getAttribute('onclick')||''))b.remove()});if(g!==gd&&!g.querySelector('button')){const p=g.previousElementSibling;if(p&&!p.matches('.mgrid,button'))p.style.display='none';g.style.display='none'}});
 if(!gd.querySelector('.mwMB')){const M=S.mw,J=mwJobOf(M),g=(M.goals||[]).filter(x=>x.d).length;
  gd.insertAdjacentHTML('afterbegin',`<button class="opt mwMB" onclick="openJobs()">💼 งาน<small>${J?esc(mwTxt(mwJP(J,M)[0])):'ยังไม่มีงานประจำ'}</small></button><button class="opt mwMB" onclick="openAssets()">🏠 บ้านและทรัพย์สิน<small>${mwLocal((S.money||0)*mwCC().rate,M)}</small></button><button class="opt mwMB" onclick="openGoals()">🎯 เป้าหมาย<small>${g}/${(M.goals||[]).length} สำเร็จ</small></button><button class="opt mwMB" onclick="openQiMW()">🌀 ปราณ<small>${MW_QR[mwQi(M)][1]}</small></button><button class="opt mwMB" onclick="openPeopleMW()">👥 คนรอบตัว<small>ครอบครัว เพื่อน ศิษย์</small></button><button class="opt mwMB" onclick="openIdMW()">🪪 เอกสารตัวตน<small>${MW_IDN[M.id||0]}</small></button>`)}}catch(e){console.error(e)}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx71 (เดิมอยู่ app.js บรรทัด 16441) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx71'];let render=SL.base.render;
{const _rnG=render;render=function(){const r=_rnG.apply(this,arguments);try{if(mwOn()){const h=$('mwHud');if(h&&!h.querySelector('.mwGoalR')){const M=S.mw,g=(M.goals||[]).filter(x=>x.d).length;h.insertAdjacentHTML('beforeend',`<div class="mwJob mwGoalR">🎯 เป้าหมาย ${g}/${(M.goals||[]).length} · 🪪 ${MW_IDN[M.id||0]} <button class="gbtn mwJobB" onclick="openGoals()">ดู</button></div>`)}}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx72 (เดิมอยู่ app.js บรรทัด 16453) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx72'];let mwEnter=SL.base.mwEnter;
{const _meH=mwEnter;mwEnter=function(){const had=S&&S.mw;const r=_meH.apply(this,arguments);try{const M=S.mw;if(M&&!had&&M.hw==null){if(Math.random()<MW_HW_P){hwInit(M,true);addFeed('ev',`🌀 <b>โลกนี้มีเกต</b> รอยแยกบนท้องฟ้านับร้อยเปิดมาตั้งแต่ปี ${M.hwSince} ผู้คนอยู่กับมันจนชิน มีสมาคมฮันเตอร์ มีกิลด์ มีอันดับฮันเตอร์ทางทีวีทุกคืน`,'sum')}else{M.hw=0;M.gateY=Math.random()<MW_GATE_P?R(2,35):0}render();saveGame()}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx73 (เดิมอยู่ app.js บรรทัด 16456) · ห่อ: mwHeirGo ----
(function(){const SL=globalThis.__wSlots['mwx73'];let mwHeirGo=SL.base.mwHeirGo;
{const _hgHW=mwHeirGo;mwHeirGo=function(){const h=LS.get('murim_mwheir',null);const r=_hgHW.apply(this,arguments);setTimeout(()=>{try{const M=S&&S.mw;if(M&&M.native&&h&&M.hw==null){if(h.hw){hwInit(M,false);M.hw=1;M.hwSince=h.hwSince||MW_Y0}else{M.hw=0;M.gateY=h.gateY||0}render();saveGame()}}catch(e){console.error(e)}},820);return r}}
SL.impl.mwHeirGo=mwHeirGo;mwHeirGo=function(){return globalThis.mwHeirGo.apply(this,arguments)};})();

// ---- ท่อน mwx74 (เดิมอยู่ app.js บรรทัด 16460) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx74'];
MW_R.push(
 {id:'gd1',w:99,cd:0,c:M=>M.hw===0&&M.gateY&&M.y>=M.gateY,go(M){M.hw=2;M.hwSince=MW_Y0+M.y;hwInit(M,false);const C=mwCC();
  choice('🌀 ท้องฟ้าแตก',`บ่ายวันอังคารธรรมดาๆ ท้องฟ้าเหนือ${C.city}แตกร้าวเหมือนกระจก รอยแยกสีม่วงขนาดเท่าสนามฟุตบอลลอยนิ่งอยู่กลางอากาศ เหมือนรอยแยกที่${M.native?'พ่อแม่เคยเขียนถึงในสมุดบันทึก':'คุณเคยเห็นก่อนข้ามยุคมาที่นี่'} · ทั้งเมืองหยุดนิ่ง แล้วเสียงกรีดร้องก็เริ่มขึ้น`,[
  mwC('วิ่งไปใกล้รอยแยก ดูให้ชัด',()=>mwSay('👁️ ปราณที่ไหลออกมาจากรอยแยกหนาแน่นกว่ายุทธภพเสียอีก และมีบางอย่างขยับอยู่ในนั้น ตำรวจไล่ทุกคนออกจากรัศมีห้ากิโลเมตร','myth',{qi:2,sec:3},true)),
  mwC('พาคนรอบตัวหนีออกจากเมือง',()=>mwSay(`🚗 ถนนออกนอกเมืองติดยาวห้าสิบกิโลเมตร คุณพา${M.linMet?mwCC().lin+'และ':''}เพื่อนบ้านไปพักที่วัดนอกเมือง`,'good',{joy:-4,adapt:3})),
  mwC('อยู่บ้าน เปิดข่าวดู',()=>mwSay('📺 ทุกช่องตัดเข้าข่าวด่วน ผู้ประกาศข่าวมือสั่นขณะอ่านข่าว','',{joy:-6}))]);keyAdd('เห็นเกตแรกเปิดขึ้นในโลก')}},
 {id:'gd2',w:99,cd:0,c:M=>M.hw===2&&M.y>=(M.hwSince-MW_Y0)+1,go(M){choice('👹 เกตแตกครั้งแรก','หนึ่งเดือนต่อมา สัตว์ประหลาดตัวแรกออกมาจากรอยแยก ตัวสูงสามเมตร ผิวเหมือนหิน กระสุนปืนไม่ระคายผิว มันกำลังเดินมาทางย่านที่คุณอยู่',[
  mwC('ออกไปสู้มันต่อหน้าทุกคน',()=>mwBattle(M,{t:'👹 สัตว์ประหลาดจากเกต',txt:'มันคำรามจนกระจกตึกแตกทั้งแถว',foe:.4+Math.random()*.6,pub:1,win:()=>{M.H.def++;M.H.rp+=30;mwSay('⚔️ สัตว์ประหลาดล้มลงต่อหน้ากล้องนับร้อย ทั้งโลกเห็นคุณเป็น "มนุษย์คนแรกที่ล้มสัตว์จากเกต"','myth',{fame:3000000,sec:100,joy:10},true);M.fl.public=1},lose:()=>mwSay('🩸 คุณถูกเหวี่ยงกระเด็นไปชนกำแพง ทหารมาถึงพร้อมรถถังทันเวลา','bad',{joy:-6})})),
  mwC('พาคนในย่านหลบลงใต้ดิน',()=>{M.H.def++;mwSay('🚇 คุณพาคนสองร้อยคนหลบลงสถานีรถไฟใต้ดิน ปิดประตูเหล็กไว้ทั้งคืน ไม่มีใครในกลุ่มนั้นเสียชีวิต','good',{joy:8})}),
  mwC('หนี',()=>mwSay('🏃 คุณหนีออกมาได้ ข่าวเช้ารายงานผู้เสียชีวิตสี่สิบคนในย่านที่คุณเคยอยู่','bad',{joy:-10}))])}},
 {id:'gd3',w:99,cd:0,c:M=>M.hw===2&&M.y>=(M.hwSince-MW_Y0)+2&&!M.H.aw,go(M){hwAwaken(M)}},
 {id:'gd4',w:99,cd:0,c:M=>M.hw>0&&M.H&&M.H.r<0&&!M.H.no&&M.H.aw!=='none'&&((M.H.aw&&M.H.aw!=='none')||(!M.native&&((M.qi||0)>=2||(S.power||0)>=150)))&&S.age>=16&&(M.hw===1||M.y>=(M.hwSince-MW_Y0)+2),go(M){const r=hRank(hStr(M));choice('🏛️ สมาคมฮันเตอร์',`สมาคมฮันเตอร์เปิดให้ผู้มีพลังลงทะเบียน วัดพลังด้วยเครื่องตรวจวัดค่าเวทมนตร์ ถ้าคุณลงทะเบียน ผลน่าจะออกมาราว <b>แรงก์ ${HR[r]}</b>`,[
  mwC('ลงทะเบียนเป็นฮันเตอร์',()=>{M.H.r=r;mwSay(`🪪 เครื่องวัดค่าพลังร้องเตือนเสียงดัง <b>แรงก์ ${HR[r]}</b> ${r>=4?'เจ้าหน้าที่ทั้งชั้นหันมามอง ภายในชั่วโมงเดียว กิลด์ใหญ่สามแห่งโทรมาหาคุณ':'คุณได้บัตรฮันเตอร์พร้อมรูปถ่ายหน้าตึง'}`,'epic',{sec:r>=4?20:6,joy:6},true);keyAdd('ลงทะเบียนเป็นฮันเตอร์แรงก์ '+HR[r]);if((M.id||0)<1){M.id=2;addFeed('ev','🪪 สมาคมฮันเตอร์ออกบัตรประจำตัวให้ ตัวตนคุณถูกต้องตามกฎหมายแล้ว','sum')}if(!focusOK(S.focus))S.focus='mwgate'}),
  mwC('ปิดพลัง ลงทะเบียนเป็นแรงก์ E',()=>{M.H.r=0;M.H.hide=1;mwSay('🤫 คุณกดพลังให้เงียบที่สุดตอนวัด เครื่องขึ้นแรงก์ E เจ้าหน้าที่บอกว่า "แรงก์ E ส่วนใหญ่ทำงานขนของในเกตนะครับ"','',{sec:-6})},{s:'ซ่อนพลังจริง'}),
  mwC('ไม่ลงทะเบียน ใช้ชีวิตแบบพลเรือน',()=>{M.H.no=1;mwSay('🏠 คุณเลือกเป็นพลเรือน ในโลกที่ฮันเตอร์คือฮีโร่ และพลเรือนคือคนที่ต้องหนีเมื่อเกตแตก','',{joy:-2})})])}},
 {id:'hw0',w:99,cd:0,c:M=>M.hw===1&&M.y>=1&&!M.fl.hw0,go(M){M.fl.hw0=1;if(!M.native&&M.H&&!M.H.aw)M.H.aw='cult';mwSay(`🌀 ${M.native?'คุณเกิดมาในโลกที่มีเกต':'คุณเพิ่งรู้ว่ายุคนี้ไม่ได้มีแค่ตึกสูงกับรถไฟฟ้า'} ทุกเช้าข่าวรายงาน "พยากรณ์เกต" เหมือนพยากรณ์อากาศ ทุกเมืองมีหลุมหลบภัย เด็กๆ ฝันอยากเป็นฮันเตอร์แรงก์ S${M.native?'':' · ปราณที่ไหลออกจากเกตทำให้อากาศในยุคนี้ไม่เบาบางอย่างที่คิด'}`,'myth',M.native?null:{qi:1.5},true)}});
})();

// ---- ท่อน mwx75 (เดิมอยู่ app.js บรรทัด 16478) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx75'];let mwYear=SL.base.mwYear;
{const _myN=mwYear;mwYear=function(){const r=_myN.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&M.hw>0){const yrs=MW_Y0+M.y-M.hwSince;let t;if(M.hw===2&&yrs<=4){t=HW_NEWS0[Math.min(HW_NEWS0.length-1,yrs*2+R(0,1))];
  const C=mwCC(),np=[M.linMet?`📱 ${C.lin}โทรมาถามทุกวันว่า "ลุงไม่เป็นไรใช่ไหม"`:null,M.fl.pa?`🍜 ${mwLoc('ป้าแดง')}ปิดร้านไปสองเดือน กลับมาเปิดใหม่พร้อมป้าย "ลดราคาให้ฮันเตอร์"`:null,M.fl.som?`👮 ${mwLoc('จ่าสมชาย')}ถูกเรียกตัวไปเฝ้าด่านรอบเกต ไม่ได้กลับบ้านมาสามเดือน`:null,M.bf?`🤝 ${esc(M.bf.n)}ตื่นพลังเป็นแรงก์ E วันนี้มาอวดว่าจุดไฟแช็กได้ด้วยนิ้ว`:null,'🏢 ที่ทำงานประกาศหยุดงานไม่มีกำหนด ทุกคนไปต่อคิวตรวจพลัง'].filter(Boolean);if(Math.random()<.7)addFeed('ev',ch(np),'sum')}
 else if(Math.random()<.5)t=ch(HW_NEWS);if(t)addFeed('ev',`📰 ${t}`,'sum')}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx76 (เดิมอยู่ app.js บรรทัด 16496) · ห่อ: focusOK ----
(function(){const SL=globalThis.__wSlots['mwx76'];let focusOK=SL.base.focusOK;
{const _foH=focusOK;focusOK=function(k){if(k==='mwgate')return mwOn()&&hwOn(S.mw)&&S.mw.H&&S.mw.H.r>=0&&S.age>=16;return _foH.apply(this,arguments)}}
SL.impl.focusOK=focusOK;focusOK=function(){return globalThis.focusOK.apply(this,arguments)};})();

// ---- ท่อน mwx77 (เดิมอยู่ app.js บรรทัด 16497) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx77'];let mwYear=SL.base.mwYear;
{const _myG=mwYear;mwYear=function(){const foc=S&&S.focus;const r=_myG.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&hwOn(M)&&M.H&&M.H.r>=0){
 if(foc==='mwgate'){const n=R(2,4);for(let i=0;i<n&&S.alive;i++)hGateRun(M,Math.max(0,M.H.r-(Math.random()<.4?1:0)));if(M.H.gu){const sal=MW_MIN[M.cc||'th']*12*(.5+M.H.r*.6);mwFx({mon:mwToB(sal,M)});addFeed('ev',`🏢 เงินประจำจากกิลด์${esc(M.H.gu)} ${mwLocal(sal,M)}`,'sum')}}
 if(M.H.ess>=5&&!M.H.hide&&Math.random()<.6){const u=Math.floor(M.H.ess/2);M.H.ess-=u;M.H.pw=(M.H.pw||0)+u*25;addFeed('ev',`💠 ดูดซับแก่นเวทมนตร์ ${u} ชิ้น — พลังเพิ่มขึ้น`,'sum')}
 const nr=hRank(hStr(M));if(!M.H.hide&&nr>M.H.r&&M.H.rp>=40*(M.H.r+1)){M.H.r=nr;M.H.rp=0;log(`📈 <b>ประเมินแรงก์ใหม่: แรงก์ ${HR[nr]}</b> ชื่อคุณขึ้นในอันดับฮันเตอร์ของประเทศ`,'epic',true);keyAdd('ฮันเตอร์แรงก์ '+HR[nr]);mwFx({fame:20000*(nr+1),sec:4})}
 if(M.H.aw==='sys'){M.H.pw+=R(10,40)}}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx78 (เดิมอยู่ app.js บรรทัด 16502) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx78'];
MW_R.push(
 {id:'hg0',w:8,cd:2,c:M=>hwOn(M)&&M.H&&M.H.r>=0&&S.age>=16,go(M){const r=M.H.r,ops=[];for(let g=Math.max(0,r-1);g<=Math.min(5,r+2);g++)ops.push(mwC(`🌀 เกตแรงก์ ${HR[g]} · ${HG_NM[g]}`,()=>hGateRun(M,g),{s:g>r?`เกินแรงก์คุณ · เสี่ยงตาย ${Math.round(18*(g-r))}%`:g<r?'ปลอดภัย · รางวัลน้อย':'สมน้ำสมเนื้อ'}));
  choice('🗺️ เลือกเกตที่จะบุก',`สมาคมฮันเตอร์ประกาศเกตใหม่ในเขตคุณ · แรงก์คุณ <b>${HR[r]}</b> · พลัง ~${fmt(Math.round(hStr(M)))}`,ops.slice(0,4))}},
 {id:'hg1',w:7,cd:0,c:M=>hwOn(M)&&M.H&&M.H.r>=1&&!M.H.gu,go(M){const G=[['กิลด์มังกรทอง','ใหญ่ที่สุดในประเทศ เงินเดือนสูง แต่ต้องทำตามคำสั่งทุกอย่าง'],['กิลด์ดาบเงา','กลาง เน้นเกตอันตราย แบ่งรางวัลยุติธรรม'],['กิลด์เล็กของคนในซอย','สมาชิกห้าคน เงินน้อยแต่เหมือนครอบครัว']];
  choice('🏢 กิลด์มาชวน','หลังผลงานล่าสุด กิลด์สามแห่งส่งคนมาชวนเข้าร่วม',G.map(g=>mwC(`${g[0]}`,()=>{M.H.gu=g[0];mwSay(`🏢 คุณเข้าร่วม<b>${g[0]}</b> — ${g[1]}`,'good',{joy:5})},{s:g[1]})).concat([mwC('อยู่แบบฮันเตอร์อิสระ',()=>mwSay('🗡️ คุณเลือกเดินคนเดียว เหมือนสมัยเป็นจอมยุทธ์พเนจร','',{joy:2}))]))}},
 {id:'hg2',w:6,cd:5,c:M=>hwOn(M)&&M.y>=1,go(M){const civ=!M.H||M.H.r<0;choice('🚨 เกตแตกกลางเมือง',`เกตแรงก์ ${HR[Math.min(5,(M.H&&M.H.r>=0?M.H.r:0)+1)]} ในย่านใกล้บ้านแตก สัตว์ประหลาดทะลักออกมาก่อนกิลด์จะมาถึง${civ?' — คุณไม่ได้เป็นฮันเตอร์':''}`,[
  mwC('เข้าไปปกป้องผู้คน',()=>mwBattle(M,{t:'🚨 เกตแตก',txt:'สัตว์ประหลาดฝูงหนึ่งไล่ล่าคนบนถนน',foe:.5+Math.random()*.8,pub:1,win:()=>{if(M.H){M.H.def++;M.H.rp+=25}mwSay('🛡️ คุณยืนขวางฝูงสัตว์ประหลาดไว้จนกิลด์มาถึง ผู้คนบนถนนรอดทั้งหมด','epic',{fame:150000,joy:10,mon:mwToB(MW_MIN[M.cc||'th']*3,M)},true)},lose:()=>mwSay('🩸 คุณถูกฝูงสัตว์ประหลาดรุมจนล้ม ฮันเตอร์จากกิลด์ลากคุณออกมาได้ทันเวลา','bad',{joy:-6})})),
  mwC('พาคนหลบเข้าหลุมหลบภัย',()=>{if(M.H)M.H.def++;mwSay('🚇 คุณพาเด็กและคนแก่ลงหลุมหลบภัยได้สามสิบคน','good',{joy:6})}),
  mwC('หนีให้เร็วที่สุด',()=>mwSay('🏃 คุณรอด บ้านคุณไม่รอด',(mwAst(M).h===2?'bad':''),{joy:-8,mon:-mwToB(MW_MIN[M.cc||'th']*(mwAst(M).h===2?6:1),M)}))])}},
 {id:'hg3',w:6,cd:0,c:M=>hwOn(M)&&M.H&&M.H.r>=1&&(M.lives||[]).length,go(M){const l=ch(M.lives);mwSay(`🌀 เกตใหม่แรงก์ ${HR[Math.min(5,M.H.r+1)]} ถูกตั้งชื่อตามจารึกที่ทางเข้า: <b>"สุสานของ${esc(l.n)}"</b> ข้างในเป็นสำนักโบราณที่คุณจำได้ทุกตารางนิ้ว สัตว์ประหลาดสวมชุดศิษย์สำนักที่ผุพัง และบนบัลลังก์คือร่างคุณในชาติก่อน${l.e?' — '+esc(l.e):''}`,'myth',{joy:-2},true);setTimeout(()=>{if(S&&S.mw)hGateRun(S.mw,Math.min(5,M.H.r+1),'ล้างเกต "สุสานของ'+mwTxt(l.n)+'"')},900)}},
 {id:'hg4',w:5,cd:7,c:M=>hwOn(M)&&M.H&&M.H.r>=0,go(M){choice('🔴 เกตสีแดง',`เกตที่คุณเพิ่งเข้าไปเปลี่ยนเป็นสีแดง ทางออกปิดลง ข้างในเป็นแดนหิมะที่ไม่มีวันสิ้นสุด ทีมคุณเหลือห้าคน`,[
  mwC('นำทีมฝ่าออกไปหาบอส',()=>{const ok=hGateRun(M,Math.min(5,M.H.r+1),'ฝ่าเกตสีแดง');if(ok)mwSay('❄️ คุณนำทีมออกมาได้ครบทุกคน หลังติดอยู่สิบสองวัน','epic',{fame:80000,joy:8},true)}),
  mwC('ตั้งค่ายรอทีมกู้ภัย',()=>{if(Math.random()<.6)mwSay('⛺ ทีมกู้ภัยเจาะเข้ามาได้ในวันที่ยี่สิบ สองคนในทีมไม่รอด','bad',{joy:-10});else hGateRun(M,Math.min(5,M.H.r+1),'เอาตัวรอดในเกตสีแดง')})])}},
 {id:'hg5',w:5,cd:6,c:M=>hwOn(M)&&M.H&&M.H.r<0,go(M){mwSay(ch(['🏠 ค่าเช่าห้องใกล้เกตถูกลงครึ่งหนึ่ง คุณย้ายมาอยู่ใกล้รอยแยกเพราะเงินไม่พอ ทุกคืนได้ยินเสียงคำรามแผ่วๆ','🛡️ ประกันภัยเกตแตกขึ้นราคาอีกเท่าตัว เพื่อนบ้านคุณยกเลิกประกันเพราะจ่ายไม่ไหว','📺 คุณนั่งดูถ่ายทอดสดฮันเตอร์แรงก์ S ล้างเกต แล้วนึกถึงสนามประลองในยุทธภพ','🎒 เด็กๆ ในซอยเล่น "ฮันเตอร์กับสัตว์ประหลาด" แทนตำรวจจับผู้ร้าย']),'',{joy:-1})}},
 {id:'hg6',w:7,cd:0,c:M=>hwOn(M)&&M.H&&M.H.r>=3&&M.y>=8,go(M){choice('🌑 เกตแรงก์ S ระดับชาติ','เกตแรงก์ S ที่ใหญ่ที่สุดในประวัติศาสตร์เปิดกลางมหาสมุทร คลื่นปราณทำให้ทุกเกตในประเทศสั่นไหว รัฐบาลเรียกฮันเตอร์แรงก์สูงทุกคนเข้าร่วมปฏิบัติการ',[
  mwC('เข้าร่วมปฏิบัติการ',()=>{const ok=hGateRun(M,5,'ปฏิบัติการเกตแรงก์ S');if(ok){mwSay('🌅 เกตแรงก์ S ปิดลง ชื่อคุณอยู่ในรายชื่อผู้กอบกู้ชาติ','myth',{fame:2000000,joy:15},true);keyAdd('ร่วมปิดเกตแรงก์ S')}}),
  mwC('ปฏิเสธ',()=>mwSay('📵 สมาคมฮันเตอร์ปรับแรงก์คุณลงหนึ่งขั้นฐานปฏิเสธคำสั่งฉุกเฉิน','bad',{joy:-4},M.H.r=Math.max(0,M.H.r-1)))])}},
 {id:'hg7',w:6,cd:3,c:M=>hwOn(M)&&M.H&&M.H.aw==='sys',go(M){mwSay(`🟦 <span class="px">[${esc(M.H.sys)}: ภารกิจพิเศษ ล้างเกตให้สำเร็จหนึ่งแห่งภายในปีนี้ · รางวัล: ค่าสถานะ +]</span> ไม่มีใครในโลกเห็นหน้าต่างนี้นอกจากคุณ`,'myth',null);if(M.H.r>=0)setTimeout(()=>{if(S&&S.mw&&hGateRun(S.mw,S.mw.H.r,'ภารกิจระบบ'))S.mw.H.pw+=R(80,200)},900)}});
})();

// ---- ท่อน mwx79 (เดิมอยู่ app.js บรรทัด 16522) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx79'];let render=SL.base.render;
{const _rnHW=render;render=function(){const r=_rnHW.apply(this,arguments);try{if(mwOn()&&hwOn(S.mw)){const h=$('mwHud'),M=S.mw,H=M.H||{};if(h&&!h.querySelector('.mwHW'))h.insertAdjacentHTML('afterbegin',`<div class="mwJob mwHW" style="border:none;margin:0 0 6px;padding:0">🌀 <b>โลกฮันเตอร์</b> · ${H.r>=0?`แรงก์ <b>${HR[H.r]}</b>${H.hide?' (ซ่อนพลัง)':''} · แก่น ${H.ess} · ล้างเกต ${H.cl}${H.gu?' · '+esc(H.gu):''}`:H.no?'พลเรือน':H.aw==='none'?'ไม่มีพลัง':'ยังไม่ลงทะเบียน'}${H.aw==='sys'?' · 🟦 '+esc(H.sys):''}</div>`)}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx80 (เดิมอยู่ app.js บรรทัด 16527) · ห่อ: mwDraw ----
(function(){const SL=globalThis.__wSlots['mwx80'];let mwDraw=SL.base.mwDraw;
{const _mdHW=mwDraw;mwDraw=function(c,t){const r=_mdHW.apply(this,arguments);try{if(mwOn())mwSkin3(c,t)}catch(e){}return r}}
SL.impl.mwDraw=mwDraw;mwDraw=function(){return globalThis.mwDraw.apply(this,arguments)};})();

// ---- ท่อน mwx81 (เดิมอยู่ app.js บรรทัด 16529) · ห่อ: mwInfo ----
(function(){const SL=globalThis.__wSlots['mwx81'];let mwInfo=SL.base.mwInfo;
{const _miHW=mwInfo;mwInfo=function(){_miHW.apply(this,arguments);try{const M=S.mw,b=$('modal').querySelector('.pbtn');if(b)b.insertAdjacentHTML('beforebegin',`<p class="tag2">โลก: ${M.hw===1?'🌀 โลกฮันเตอร์ (มีเกตตั้งแต่แรก)':M.hw===2?'🌀 กลายเป็นโลกฮันเตอร์ปี '+M.hwSince:M.gateY?'โลกปกติ · เกตจะเปิดในปีที่ '+M.gateY+' (สุ่มได้ 1%)':'โลกปกติตลอดชีวิต'}</p>${M.hw||!admK()?'':`<button class="gbtn" style="width:100%;margin-bottom:6px" onclick="S.mw.gateY=S.mw.y+1;closeM();toast('เกตจะเปิดปีหน้า (ทดสอบ)')">🌀 บังคับให้เกตเปิดปีหน้า (ทดสอบแอดมิน)</button>`}`)}catch(e){}}}
SL.impl.mwInfo=mwInfo;mwInfo=function(){return globalThis.mwInfo.apply(this,arguments)};})();

// ---- ท่อน mwx82 (เดิมอยู่ app.js บรรทัด 16562) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx82'];let mwYear=SL.base.mwYear;
{const _myQ=mwYear;mwYear=function(){const r=_myQ.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&(M.sky||M.fog)&&M.qs&&M.qs.length)M.qs=[];if(M&&!M.sky&&!M.fog&&S.age>=12){mwQCheck(M);if(M.y>=2)mwQGen(M)}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx83 (เดิมอยู่ app.js บรรทัด 16566) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx83'];let render=SL.base.render;
{const _rnQB=render;render=function(){const r=_rnQB.apply(this,arguments);try{if(mwOn()&&!S.mw.sky&&!S.mw.fog){const b=document.querySelector('#game button[data-mwo="openQuests()"]');if(b){b.setAttribute('onclick','openMwQuests()');b.innerHTML='📋'}}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx84 (เดิมอยู่ app.js บรรทัด 16567) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx84'];let openMenu=SL.base.openMenu;
{const _omQ=openMenu;openMenu=function(){const r=_omQ.apply(this,arguments);try{if(mwOn()&&!S.mw.sky&&!S.mw.fog){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('.mwQB')){const M=S.mw,a=gd.querySelector('.mwMB');const h=`<button class="opt mwMB mwQB" onclick="openMwQuests()">📋 เควส<small>${(M.qs||[]).length} เควสที่ทำอยู่</small></button>`;if(a)a.insertAdjacentHTML('beforebegin',h);else gd.insertAdjacentHTML('afterbegin',h)}}}catch(e){}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx85 (เดิมอยู่ app.js บรรทัด 16577) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx85'];let mwEnter=SL.base.mwEnter;
{const _meL=mwEnter;mwEnter=function(){const had=S&&S.mw,tm=mwTmHome(),soul=S&&S.soul?S.soul.n:null;const r=_meL.apply(this,arguments);try{const M=S.mw;if(M&&!had&&M.lang==null){const cc=M.cc||'th';
 if(tm){M.tm=1;M.soul=soul;M.lang=cc==='th'?100:cc==='us'?45:15;M.adapt=Math.max(M.adapt,75);['e1','e2','e3','e10'].forEach(k=>{M.seen[k]=M.seen[k]||1});M.q=(M.q||[]).filter(k=>!['e1','e2','e3','e10'].includes(k));setTimeout(()=>{if(S&&S.mw)mwRunTm(S.mw)},500)}
 else M.lang=MW_LANG0[cc]||5;render();saveGame()}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx86 (เดิมอยู่ app.js บรรทัด 16580) · ห่อ: mwHeirGo ----
(function(){const SL=globalThis.__wSlots['mwx86'];let mwHeirGo=SL.base.mwHeirGo;
{const _hgL=mwHeirGo;mwHeirGo=function(){const r=_hgL.apply(this,arguments);setTimeout(()=>{if(S&&S.mw&&S.mw.native&&S.mw.lang==null)S.mw.lang=100},830);return r}}
SL.impl.mwHeirGo=mwHeirGo;mwHeirGo=function(){return globalThis.mwHeirGo.apply(this,arguments)};})();

// ---- ท่อน mwx87 (เดิมอยู่ app.js บรรทัด 16582) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx87'];let mwYear=SL.base.mwYear;
{const _myL=mwYear;mwYear=function(){const foc=S&&S.focus;const r=_myL.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&!mwLangOK(M)){const g=Math.min(10,(foc==='mwlearn'?R(5,8):foc==='mwjob'?2:1)+(M.linMet?2:0)+(M.bf?1:0)+(M.sp?2:0));const b=M.lang;M.lang=Math.min(100,Math.max(b||0,M.lang0y===M.y?(M.lang||0):(M.lang||0)+g));M.lang0y=M.y;
 if(b<30&&M.lang>=30)addFeed('ev',`🗣️ คุณเริ่มสั่งอาหารเองได้โดยไม่ต้องชี้รูป ${MW_LNAME[M.cc||'th']}ระดับเอาตัวรอด`,'sum');if(b<60&&M.lang>=60)mwSay(`💭 คืนนี้คุณฝันเป็น${MW_LNAME[M.cc||'th']}เป็นครั้งแรก ตื่นมาแล้วนั่งนิ่งอยู่นาน ภาษาในยุทธภพเริ่มเลือนจากความฝันแล้ว`,'myth',{adapt:3});if(b<100&&M.lang>=100)addFeed('ev',`🗣️ คนแปลกหน้าถามทางคุณ และไม่สังเกตเลยว่าคุณไม่ใช่คนที่นี่`,'sum')}}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx88 (เดิมอยู่ app.js บรรทัด 16584) · ห่อ: mwJobReq ----
(function(){const SL=globalThis.__wSlots['mwx88'];let mwJobReq=SL.base.mwJobReq;
{const _jrL=mwJobReq;mwJobReq=function(J,M){const w=_jrL.apply(this,arguments);if(w)return w;const id=Object.keys(MW_JOBS).find(k=>MW_JOBS[k]===J),need={office:70,heal:50,coach:40,guard:30}[id]||0;if(need&&!mwLangOK(M)&&(M.lang||0)<need)return`ต้องพูด${MW_LNAME[M.cc||'th']}ได้ระดับ ${need}+ (ตอนนี้ ${M.lang||0})`;return''}}
SL.impl.mwJobReq=mwJobReq;mwJobReq=function(){return globalThis.mwJobReq.apply(this,arguments)};})();

// ---- ท่อน mwx89 (เดิมอยู่ app.js บรรทัด 16586) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx89'];
MW_R.push(
 {id:'lg1',w:30,cd:0,c:M=>!M.native&&!M.tm&&(M.lang||0)<30&&M.y>=0,go(M){const L=MW_LNAME[M.cc||'th'];choice('🗣️ ฟังไม่ออกสักคำ',`ทุกคนรอบตัวพูดเร็วและพูดเสียงแปลกๆ นี่คือ${L} ที่คุณไม่เคยได้ยินมาก่อนในชีวิต ป้ายทุกป้ายอ่านไม่ออก${['cn','tw','jp'].includes(M.cc)?' (ยกเว้นตัวอักษรบางตัวที่หน้าตาคุ้นเคย)':''}`,[
  mwC('ใช้ภาษามือกับรอยยิ้ม',()=>mwSay('🤲 คุณชี้ ยิ้ม พยักหน้า และโค้ง ได้ข้าวกล่องมาหนึ่งกล่องกับน้ำหนึ่งขวด และคนขายยิ้มกลับมา ภาษาแรกที่ใช้ได้ทุกยุค','good',{joy:4,lang:3}),{s:'ปลอดภัย'}),
  mwC('จดเสียงที่ได้ยินลงกระดาษ ท่องทุกคืน',()=>{M.lang=(M.lang||0)+8;mwSay('📝 คุณจดเสียงที่ได้ยินเป็นตัวอักษรของยุคตัวเอง ท่องทุกคืนเหมือนท่องคัมภีร์ ความจำของยอดฝีมือมีประโยชน์ในทุกยุค','good',{adapt:3})}),
  mwC('พูดภาษาของยุคตัวเองดังๆ เผื่อมีคนเข้าใจ',()=>mwSay(`📢 คนรอบตัวหันมามอง ${M.cc==='cn'||M.cc==='tw'?'ชายชราคนหนึ่งตอบกลับมาด้วยสำนวนโบราณครึ่งประโยค แล้วหัวเราะ "เหมือนในงิ้วเลย"':'ไม่มีใครเข้าใจสักคน แต่มีคนถ่ายคลิปลงโซเชียล'}`,'',{sec:2,fame:3000}))])}},
 {id:'lg2',w:9,cd:0,c:M=>!M.native&&!M.tm&&(M.lang||0)<45&&M.y>=1,go(M){choice('😅 เข้าใจผิดครั้งใหญ่',ch(['คุณตั้งใจพูดว่า "ขอบคุณ" กับเจ้าของห้อง แต่ออกเสียงผิดจนกลายเป็นคำที่ทำให้เธอหน้าแดงแล้วปิดประตูใส่','ตำรวจถามว่า "ไปไหนมา" คุณได้ยินเป็น "จะสู้ไหม" แล้วตั้งท่าพร้อมรบกลางถนน','คุณสั่ง "น้ำเปล่า" แต่ได้เบียร์มาหกขวด และบิลที่ทำให้ตาลาย']),[
  mwC('หัวเราะไปกับมัน',()=>mwSay('😂 ทุกคนหัวเราะ คุณก็หัวเราะ คำนั้นคุณจะไม่มีวันลืมไปตลอดชีวิต','good',{joy:4,lang:4})),
  mwC('ขอโทษด้วยการคำนับแบบยุทธภพ',()=>mwSay('🙇 คุณคำนับลึกเก้าสิบองศาแบบศิษย์คารวะอาจารย์ อีกฝ่ายงงยิ่งกว่าเดิม แต่หายโกรธ','',{joy:2})),
  mwC(`ขอให้${mwCC().lin}ช่วยเป็นล่าม`,()=>{if(!M.linMet)return mwSay('📱 คุณยังไม่มีใครช่วยเป็นล่าม ได้แต่เปิดแอปแปลภาษาที่แปลผิดครึ่งหนึ่ง','',{adapt:3});mwSay(`🧒 ${mwCC().lin}มาช่วยอธิบายจนเข้าใจตรงกัน แล้วสอนคุณเพิ่มอีกสิบคำ`,'good',{lin:4,lang:5})})])}},
 {id:'lg3',w:7,cd:0,c:M=>!M.native&&!M.tm&&['cn','tw','jp'].includes(M.cc||'th')&&M.y>=2,go(M){mwSay({cn:'📖 คุณเจอหนังสือในร้าน ตัวอักษรเหมือนของยุคคุณแต่ถูกตัดขีดออกไปครึ่งหนึ่ง (ตัวย่อ) อ่านเหมือนอ่านคัมภีร์ที่หนอนแทะ แต่พออ่านไปสักพักก็เดาความหมายได้',tw:'📖 คุณเปิดหนังสือพิมพ์แล้วอ่านออกเกือบทุกตัว ไต้หวันยังใช้ตัวอักษรแบบเต็มเหมือนยุคคุณ แค่สำนวนเปลี่ยนไปหมด คุณอ่านข่าวการเมืองได้ แต่ไม่เข้าใจว่าข่าวพูดถึงอะไร',jp:'📖 ป้ายในสถานีมีตัวอักษรที่คุณรู้จักปนกับตัวอักษรหยึกหยักที่ไม่เคยเห็น (คานะ) คุณอ่านชื่อสถานีได้ แต่อ่านออกเสียงผิดทุกชื่อ'}[M.cc],'myth',{lang:6,adapt:2})}},
 {id:'lg4',w:6,cd:0,c:M=>!M.native&&!M.tm&&(M.lang||0)>=50&&(M.fame||0)>=5000,go(M){mwSay('🎙️ สำเนียงคุณกลายเป็นเอกลักษณ์ คนดูคลิปชอบฟังคุณพูด เพราะมันฟังเหมือนตัวละครในหนังพีเรียด มีคนขอให้อัดเสียงอ่านนิทานก่อนนอน','good',{fame:30000,joy:4})}});
})();

// ---- ท่อน mwx90 (เดิมอยู่ app.js บรรทัด 16598) · ห่อ: mwFx ----
(function(){const SL=globalThis.__wSlots['mwx90'];let mwFx=SL.base.mwFx;
{const _mfL=mwFx;mwFx=function(o){if(o&&o.lang&&S.mw){S.mw.lang=Math.min(100,(S.mw.lang||0)+o.lang);o=Object.assign({},o);delete o.lang}return _mfL.call(this,o)}}
SL.impl.mwFx=mwFx;mwFx=function(){return globalThis.mwFx.apply(this,arguments)};})();

// ---- ท่อน mwx91 (เดิมอยู่ app.js บรรทัด 16600) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx91'];
{const _g4=MW_R.find(e=>e.id==='gd4');if(_g4){const g0=_g4.go;_g4.go=function(M){if(!mwLangOK(M)&&(M.lang||0)<30)addFeed('ev',`🗣️ คุณฟังเจ้าหน้าที่สมาคมไม่ออก ต้องเสียค่าล่าม ${mwLocal(MW_MIN[M.cc||'th']*.2,M)}`,'sum'),S.money=Math.max(0,(S.money||0)-mwToB(MW_MIN[M.cc||'th']*.2,M));return g0.apply(this,arguments)}}}
})();

// ---- ท่อน mwx92 (เดิมอยู่ app.js บรรทัด 16602) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx92'];let render=SL.base.render;
{const _rnL=render;render=function(){const r=_rnL.apply(this,arguments);try{if(mwOn()&&!mwLangOK(S.mw)){const g=document.querySelector('#mwHud .mwhG');if(g&&!g.querySelector('.mwLang'))g.insertAdjacentHTML('beforeend',`<div class="mwh1 mwLang"><span>🗣️ ภาษา</span><b>${S.mw.lang||0}/100</b><i style="width:${S.mw.lang||0}%;background:#e080ff"></i></div>`)}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx93 (เดิมอยู่ app.js บรรทัด 16625) · ห่อ: mwFx ----
(function(){const SL=globalThis.__wSlots['mwx93'];let mwFx=SL.base.mwFx;
{const _mfLo=mwFx;mwFx=function(o){if(o&&S.mw&&S.mw.low){o=Object.assign({},o);if(o.sec>0)o.sec=Math.round(o.sec*.5);if(o.fame>0)o.fame=Math.round(o.fame*.3)}return _mfLo.call(this,o)}}
SL.impl.mwFx=mwFx;mwFx=function(){return globalThis.mwFx.apply(this,arguments)};})();

// ---- ท่อน mwx94 (เดิมอยู่ app.js บรรทัด 16626) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx94'];let mwYear=SL.base.mwYear;
{const _myLo=mwYear;mwYear=function(){const r=_myLo.apply(this,arguments);try{const M=S&&S.alive&&S.mw;if(M&&M.low){joy(1);if((M.fame||0)>0)M.fame=Math.round(M.fame*.8)}}catch(e){}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx95 (เดิมอยู่ app.js บรรทัด 16628) · ห่อ: choice, mwBattle ----
(function(){const SL=globalThis.__wSlots['mwx95'];let choice=SL.base.choice;let mwBattle=SL.base.mwBattle;
{const _btL=mwBattle;mwBattle=function(M,o){if(M.low&&((M.qi||0)>=1||(S.power||0)>=100)){const w0=o.win;o=Object.assign({},o,{win:h=>{if(h==='shadow'){M.lowD=(M.lowD||0)+1}w0&&w0(h)}});const me=mwStr(M),foe=me*o.foe,base=me/(me+foe);
 const _c=choice;let injected=false;choice=function(t,x,opts){if(!injected&&t===o.t){injected=true;opts=opts.concat([mwC('🕶️ จัดการแบบไม่มีใครเห็น',()=>{if(Math.random()<Math.max(.05,Math.min(.95,base*1.15))){o.win&&o.win('shadow');addFeed('ev','🕶️ ไม่มีใครเห็นว่าใครเป็นคนทำ','sum')}else{S.hp=Math.max(5,S.hp-Math.round(S.maxHp*.35));o.lose&&o.lose('shadow')}},{s:'ไม่รั่วความลับ · ชนะยากกว่าสู้เต็มที่นิดหน่อย'})])}choice=_c;return _c.call(this,t,x,opts)};try{return _btL.call(this,M,o)}finally{choice=_c}}return _btL.apply(this,arguments)}}
SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};SL.impl.mwBattle=mwBattle;mwBattle=function(){return globalThis.mwBattle.apply(this,arguments)};})();

// ---- ท่อน mwx96 (เดิมอยู่ app.js บรรทัด 16630) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx96'];
MW_R.push(
 {id:'lw1',w:8,cd:6,c:M=>M.low&&!!M.job,go(M){choice('🙄 คนที่ดูถูกคุณ',`หัวหน้าทีมคนใหม่ประกาศกลางที่ประชุมว่าคุณ "ผลงานแย่ที่สุด ไม่มีอะไรโดดเด่น" ทุกคนหันมามอง คืนก่อนหน้านั้น คุณเพิ่งช่วยลูกสาวของเขาจากรถที่เสียหลักโดยไม่มีใครเห็นหน้า`,[
  mwC('ก้มหน้ารับ "ครับ ผมจะพยายาม"',()=>{M.lowD=(M.lowD||0)+1;mwSay('😌 คุณยิ้มบางๆ เขาไม่มีวันรู้ ซึ่งคือสิ่งที่คุณต้องการ ความสุขแปลกๆ ของคนเก่งที่ไม่มีใครรู้','myth',{joy:6},true)}),
  mwC('ทำงานชิ้นต่อไปให้สมบูรณ์แบบเงียบๆ',()=>{if(M.job)M.job.perf=mwCl(M.job.perf+12,0,100);mwSay('📊 งานชิ้นต่อไปของคุณไร้ที่ติจนหัวหน้าเงียบไป เขาไม่ขอโทษ แต่ไม่เคยพูดแบบนั้นอีก','good',{joy:4})})])}},
 {id:'lw2',w:8,cd:0,c:M=>M.low&&(M.lowD||0)>=2,go(M){M.fl.legend=1;mwSay(`👻 ในเมืองเริ่มมีตำนานเมืองเรื่องใหม่: <b>"ผู้พิทักษ์ไร้นาม"</b> คนที่โผล่มาช่วยตอนเกิดเรื่อง แล้วหายไปก่อนใครจะเห็นหน้า มีคนวาดภาพจากคำบอกเล่า หน้าไม่เหมือนคุณเลยสักนิด`,'myth',{joy:8},true)}},
 {id:'lw3',w:7,cd:0,c:M=>M.low&&M.fl.legend&&M.y>=6,go(M){choice('🔍 มีคนตามหา "ผู้พิทักษ์ไร้นาม"',`นักข่าวสาวคนหนึ่งตามสืบตำนานผู้พิทักษ์ไร้นามมาสองปี วันนี้เธอมานั่งโต๊ะข้างคุณในร้านกาแฟ แล้วพูดเบาๆ "ฉันรู้ว่าเป็นคุณ"`,[
  mwC('"ผมแค่พนักงานธรรมดาครับ"',()=>{const ok=Math.random()<.7;mwSay(ok?'☕ คุณพูดเรื่องโปรโมชันกาแฟอยู่ครึ่งชั่วโมงจนเธอเริ่มลังเล เธอขีดชื่อคุณออกจากสมุด ตำนานยังเป็นตำนาน':'📸 เธอยิ้ม แล้ววางรูปถ่ายเบลอๆ ลงบนโต๊ะ "ฉันจะไม่เขียน แต่อยากให้คุณรู้ว่ามีคนเห็น"','',ok?{joy:4}:{sec:6})}),
  mwC('ยอมรับ แล้วขอให้เธอเก็บเป็นความลับ',()=>mwSay('🤝 เธอเก็บความลับนั้นไว้ตลอดชีวิต และกลายเป็นคนเดียวที่รู้ ทุกปีเธอส่งการ์ดมาเขียนแค่ว่า "ขอบคุณจากเมืองนี้"','good',{joy:8})),
  mwC('เปิดตัวต่อโลกเลย ถึงเวลาแล้ว',()=>{M.low=0;M.fl.public=1;mwSay('🎤 คุณเดินออกจากร้านกาแฟไปยืนกลางถนน แล้วปล่อยปราณให้ทั้งเมืองสัมผัสได้ ผู้พิทักษ์ไร้นามมีหน้าตาแล้ว','myth',{fame:3000000,sec:100},true)})])}},
 {id:'lw4',w:9,cd:4,c:M=>hwOn(M)&&M.H&&M.H.hide&&M.H.r>=0,go(M){choice('🕶️ ฮันเตอร์แรงก์ E ที่ไม่ธรรมดา',`ทีมที่คุณตามไปขนของในเกตแรงก์ C เจอบอสที่แข็งแกร่งเกินคาด หัวหน้าทีมแรงก์ B ล้มลงแล้ว ทุกคนกำลังจะตาย ไม่มีใครหันมามองแรงก์ E ที่ยืนอยู่ข้างหลัง`,[
  mwC('จัดการบอสตอนทุกคนหลับตาเพราะแสงระเบิด',()=>{M.lowD=(M.lowD||0)+1;M.H.cl++;M.H.ess+=5;mwSay('💥 ฝุ่นจางลง บอสนอนตายอยู่กลางห้อง ไม่มีใครรู้ว่าเกิดอะไรขึ้น หัวหน้าทีมได้เครดิตทั้งหมด และเขาจ่ายส่วนแบ่งให้คุณ "เพราะช่วยแบกของ"','myth',{joy:10},true)}),
  mwC('ปล่อยพลังจริงต่อหน้าทุกคน',()=>{M.H.hide=0;M.H.r=hRank(hStr(M));mwSay(`⚡ ทั้งทีมเห็นแรงก์ E ล้มบอสด้วยมือเปล่า สมาคมฮันเตอร์ประเมินใหม่ทันที <b>แรงก์ ${HR[M.H.r]}</b> ข่าว "แรงก์ E ที่จริงคือ${HR[M.H.r]}" ดังทั่วประเทศ`,'myth',{fame:500000,sec:20},true)})])}},
 {id:'lw5',w:6,cd:5,c:M=>M.low&&M.y>=3,go(M){mwSay(ch(['🕶️ คุณแกล้งวิ่งช้ากว่าคนอื่นในงานวิ่งการกุศล จนเข้าเส้นชัยที่สี่ร้อยสิบสอง การแข่งที่ยากที่สุดในชีวิต','🕶️ ในงานเลี้ยงบริษัท คุณแกล้งแพ้มวยปล้ำแขนให้เด็กฝึกงาน ทุกคนหัวเราะ คุณหัวเราะดังที่สุด','🕶️ ไม่มีใครในตึกรู้ว่าทำไมลิฟต์ที่ค้างเมื่อคืนถึงกลับมาทำงานได้เองก่อนช่างจะมา','🕶️ คุณถือถุงช้อปปิ้งยี่สิบใบด้วยนิ้วเดียว แล้วรีบเปลี่ยนเป็นสองมือเมื่อเห็นมีคนมอง']),'',{joy:4})}});
})();

// ---- ท่อน mwx97 (เดิมอยู่ app.js บรรทัด 16645) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx97'];let openMenu=SL.base.openMenu;
{const _omLo=openMenu;openMenu=function(){const r=_omLo.apply(this,arguments);try{if(mwOn()){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('.mwLoB')){const M=S.mw,last=[...gd.querySelectorAll('.mwMB')].pop();const h=`<button class="opt mwMB mwLoB" onclick="mwLowToggle()">🕶️ ซ่อนพลัง<small>${M.low?`เปิดอยู่ · ทำเรื่องดีลับๆ ${M.lowD||0} ครั้ง`:'ใช้ชีวิตไม่เด่น'}</small></button>`;if(last)last.insertAdjacentHTML('afterend',h);else gd.insertAdjacentHTML('afterbegin',h)}}}catch(e){}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx98 (เดิมอยู่ app.js บรรทัด 16646) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx98'];let render=SL.base.render;
{const _rnLo=render;render=function(){const r=_rnLo.apply(this,arguments);try{if(mwOn()&&S.mw.low){const t=document.querySelector('#mwHud .mwhT');if(t&&!t.querySelector('.mwLoT'))t.insertAdjacentHTML('beforeend',' <span class="mwLoT tag2">🕶️ ซ่อนพลัง</span>')}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx99 (เดิมอยู่ app.js บรรทัด 16709) · ห่อ: mwDraw ----
(function(){const SL=globalThis.__wSlots['mwx99'];let mwDraw=SL.base.mwDraw;
{const _mdSc=mwDraw;mwDraw=function(c,t){if(mwOn()&&S.alive&&S.mw){try{mwScene(c,t);return}catch(e){console.error(e)}}return _mdSc.apply(this,arguments)}}
SL.impl.mwDraw=mwDraw;mwDraw=function(){return globalThis.mwDraw.apply(this,arguments)};})();

// ---- ท่อน mwx100 (เดิมอยู่ app.js บรรทัด 16711) · ห่อ: sceneCap ----
(function(){const SL=globalThis.__wSlots['mwx100'];let sceneCap=SL.base.sceneCap;
{const _scSc=sceneCap;sceneCap=function(tp){const r=_scSc.apply(this,arguments);try{if(mwOn()&&tp!=='death'&&S.alive){const M=S.mw,K=mwKind(M),L={street:'บนถนน',roof:'บนดาดฟ้า',ley:'จุดพลังใต้เมือง',temple:'วัดบนเขา',park:'สวนสาธารณะ',home:'ที่บ้าน',office:'ออฟฟิศ',lobby:'ป้อมยาม',site:'ไซต์ก่อสร้าง',set:'กองถ่าย',ring:'เวทีชก',clinic:'คลินิก',dojo:'โรงฝึก',stream:'ห้องไลฟ์',library:'ห้องสมุด',school:'โรงเรียน',gate:'หน้าเกต'}[K];return mwLoc(`${mwCC().f} ${mwCC().city} ${MW_Y0+M.y} · ${L||''}`)}}catch(e){}return r}}
SL.impl.sceneCap=sceneCap;sceneCap=function(){return globalThis.sceneCap.apply(this,arguments)};})();

// ---- ท่อน mwx101 (เดิมอยู่ app.js บรรทัด 16716) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx101'];let mwEnter=SL.base.mwEnter;
{const _meO=mwEnter;mwEnter=function(how){const snap=S&&S.alive&&!S.mw?mwOldSnap():null;const r=_meO.apply(this,arguments);try{const M=S.mw;if(M&&snap&&!M.old){M.old=snap;
 if(snap.world==='แดนเทพ'){M.qi=Math.max(M.qi,12);S.qi=M.qi;M.end+=10;M.fl.god=1;log(`🌌 ร่างเทพที่ถูกบีบอัดผ่านมิติปริศนายังเหลือปราณติดตัวมากกว่าคนอื่น <b>ปราณ ${M.qi}</b> · อายุขัยยาวกว่ามนุษย์เล็กน้อย`,'myth',true)}
 else if(snap.world==='โลกเซียน'){M.qi=Math.max(M.qi,6);S.qi=M.qi;M.end+=5}render();saveGame()}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx102 (เดิมอยู่ app.js บรรทัด 16720) · ห่อ: passYear ----
(function(){const SL=globalThis.__wSlots['mwx102'];let passYear=SL.base.passYear;
{const _pyG=passYear;passYear=function(){const r=_pyG.apply(this,arguments);try{if(S&&S.alive&&!S.mw&&S.xt){S.mwXt0=S.mwXt0||S.age;if(!S.flags.mwDim&&S.age-S.mwXt0>=30&&Math.random()<.015&&!choice._cur&&!modalOpen){S.flags.mwDim=1;const me=S;setTimeout(()=>{if(S!==me||!S.alive)return;mwDimOpen()},400)}}}catch(e){console.error(e)}return r}}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน mwx103 (เดิมอยู่ app.js บรรทัด 16730) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx103'];let openMenu=SL.base.openMenu;
{const _omO=openMenu;openMenu=function(){const r=_omO.apply(this,arguments);try{if(mwOn()&&S.mw.old){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('.mwOldB')){const last=[...gd.querySelectorAll('.mwMB')].pop(),h=`<button class="opt mwMB mwOldB" onclick="openOldMW()">📜 ตัวตนจากยุคเก่า<small>${esc(S.mw.old.world)} · ${esc(S.mw.old.realm||'')}</small></button>`;if(last)last.insertAdjacentHTML('afterend',h)}}}catch(e){}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx104 (เดิมอยู่ app.js บรรทัด 16731) · ห่อ: mwSummary ----
(function(){const SL=globalThis.__wSlots['mwx104'];let mwSummary=SL.base.mwSummary;
{const _smO=mwSummary;mwSummary=function(){const L=_smO.apply(this,arguments);try{const O=S.mw.old;if(O)L.splice(3,0,['📜','ยุคเก่า',`${O.world} · ${O.realm} · พลัง ${fmt(O.pow)}`])}catch(e){}return L}}
SL.impl.mwSummary=mwSummary;mwSummary=function(){return globalThis.mwSummary.apply(this,arguments)};})();

// ---- ท่อน mwx105 (เดิมอยู่ app.js บรรทัด 16732) · ห่อ: mwTitle ----
(function(){const SL=globalThis.__wSlots['mwx105'];let mwTitle=SL.base.mwTitle;
{const _mtO=mwTitle;mwTitle=function(M){if(M.fl.god&&!M.low)return mwQi(M)>=4?'เทพที่ตกสวรรค์ผู้คืนพลัง':'เทพที่ตกสวรรค์';return _mtO.apply(this,arguments)}}
SL.impl.mwTitle=mwTitle;mwTitle=function(){return globalThis.mwTitle.apply(this,arguments)};})();

// ---- ท่อน mwx106 (เดิมอยู่ app.js บรรทัด 16738) · ห่อ: openUpdate ----
(function(){const SL=globalThis.__wSlots['mwx106'];let openUpdate=SL.base.openUpdate;
{const _ouC=typeof openUpdate==='function'?openUpdate:null;if(_ouC)openUpdate=function(){const r=_ouC.apply(this,arguments);try{if(MW_PUBLIC){const m=$('modal'),h3=m&&m.querySelector('h3');if(h3&&!m.querySelector('.mwCL'))((()=>{let e=h3.nextElementSibling;while(e&&!/17\.5/.test(e.textContent||'')&&e.nextElementSibling)e=e.nextElementSibling;return e&&/17\.4/.test(e.textContent||'')?e:h3})()).insertAdjacentHTML('afterend',`<div class="mwCL box" style="padding:8px 10px;margin:6px 0;border-color:#6a4ab0"><b>🆕 ยุคปัจจุบัน (เบต้า)</b><ul style="margin:4px 0 0 16px;padding:0">${MW_CHANGELOG.l.map(x=>`<li>${x}</li>`).join('')}</ul></div>`)}}catch(e){}return r}}
SL.impl.openUpdate=openUpdate;openUpdate=function(){return globalThis.openUpdate.apply(this,arguments)};})();

// ---- ท่อน mwx107 (เดิมอยู่ app.js บรรทัด 16778) · ห่อ: mwOutfit ----
(function(){const SL=globalThis.__wSlots['mwx107'];let mwOutfit=SL.base.mwOutfit;
{const _ofP=mwOutfit;mwOutfit=function(M){const f=S.focus,work=f==='mwjob'&&M.job||f==='mwgate';if(work)return _ofP.apply(this,arguments);if(M.outfit==null)M.outfit=mwOFFor(S.gender,mwHash(S.name)+M.y);const r=mwOF(MW_OUTFITS[M.outfit]||MW_OUTFITS[0]);if(f==='mwqi'&&!M.outfitQi)return Object.assign({},r,{coat:null,hat:null});return r}}
SL.impl.mwOutfit=mwOutfit;mwOutfit=function(){return globalThis.mwOutfit.apply(this,arguments)};})();

// ---- ท่อน mwx108 (เดิมอยู่ app.js บรรทัด 16779) · ห่อ: mwNpc ----
(function(){const SL=globalThis.__wSlots['mwx108'];let mwNpc=SL.base.mwNpc;
{const _npO=mwNpc;mwNpc=function(seed,g,age,robe){const o=_npO.apply(this,arguments);if(robe)return Object.assign(o,{trim:robe,belt:shd(robe,-.15),noSkirt:g==='หญิง'?0:1});const of=mwOF(MW_OUTFITS[mwOFFor(g,seed)]);return Object.assign(o,of)}}
SL.impl.mwNpc=mwNpc;mwNpc=function(){return globalThis.mwNpc.apply(this,arguments)};})();

// ---- ท่อน mwx109 (เดิมอยู่ app.js บรรทัด 16784) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx109'];let openMenu=SL.base.openMenu;
{const _omOF=openMenu;openMenu=function(){const r=_omOF.apply(this,arguments);try{if(mwOn()){const gd=$('modal').querySelector('.mgrid');if(gd&&!gd.querySelector('.mwOfB')){const last=[...gd.querySelectorAll('.mwMB')].pop(),M=S.mw,h=`<button class="opt mwMB mwOfB" onclick="mwOutfitMenu()">👕 ชุดแต่งกาย<small>${esc((MW_OUTFITS[M.outfit]||{}).n||'เลือกชุด')}</small></button>`;if(last)last.insertAdjacentHTML('afterend',h)}}}catch(e){}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx110 (เดิมอยู่ app.js บรรทัด 16816) · ห่อ: mwTitle ----
(function(){const SL=globalThis.__wSlots['mwx110'];let mwTitle=SL.base.mwTitle;
{const _mt2=mwTitle;mwTitle=function(M){const r=_mt2.apply(this,arguments);return M&&M.rnd&&r==='ทายาทคนหลงยุค'?'คนยุคปัจจุบัน':r}}
SL.impl.mwTitle=mwTitle;mwTitle=function(){return globalThis.mwTitle.apply(this,arguments)};})();

// ---- ท่อน mwx111 (เดิมอยู่ app.js บรรทัด 16817) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx111'];let render=SL.base.render;
{const _rn2=render;render=function(){const r=_rn2.apply(this,arguments);try{const M=S&&S.mw;if(M&&M.native&&S.alive){const g=$('gRealm');if(g)g.textContent=(M.rnd?'คนยุคปัจจุบัน':'ทายาทคนหลงยุค')+(mwQi(M)>0?' · '+MW_QR[mwQi(M)][1]:'')}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx112 (เดิมอยู่ app.js บรรทัด 16821) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx112'];let mwEnter=SL.base.mwEnter;
{const _meL=mwEnter;mwEnter=function(){let a0=0,lm0=0,xt0=false,xi0=false;try{if(S&&S.alive&&!S.mw){a0=+S.age||0;lm0=Math.round(lifeMax())||0;xt0=!!S.xt;xi0=!!S.xian}}catch(e){}
 const r=_meL.apply(this,arguments);
 try{const M=S&&S.mw;if(M&&!M.native&&a0&&!M.agB){M.agB=1;
  if(xt0||xi0||a0>120||lm0>150){const rem=Math.max(80,lm0-a0);M.agB=2;M.real0=a0;M.ageless=(xt0||rem>=100000)?1:0;
   const ap=R(22,32);S.age=ap;M.end=ap+rem;M.fz=1;M.ap=ap;
   log(M.ageless?`♾️ ร่างคุณไม่รู้จักความแก่อีกแล้ว ในยุคนี้คุณดูเหมือนคนอายุ ${ap} ปี แต่จริงๆ ผ่านมาแล้ว ${fmt(a0)} ปี`:`⏳ ร่างผู้บำเพ็ญยังคงอยู่ ดูเหมือนคนอายุ ${ap} ปี (อายุจริง ${fmt(a0)} ปี) · อายุขัยตามขั้นเหลืออีกราว ${fmt(rem)} ปี`,'myth');
   try{mwAcOk()}catch(e){}render();saveGame()}}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx113 (เดิมอยู่ app.js บรรทัด 16828) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx113'];let mwYear=SL.base.mwYear;
{const _myL=mwYear;mwYear=function(){const r=_myL.apply(this,arguments);try{const M=S&&S.mw;if(M&&M.fz&&S.alive){M.fzc=(M.fzc||0)+1;const k=M.ageless?6:3,cap=M.ageless?55:200;if(M.fzc%k!==0||S.age>cap){S.age--;M.end--}if(!M.ageless&&M.end-S.age<=40){M.fz=0}}}catch(e){}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx114 (เดิมอยู่ app.js บรรทัด 16829) · ห่อ: addFeed ----
(function(){const SL=globalThis.__wSlots['mwx114'];let addFeed=SL.base.addFeed;
{const _afL=addFeed;addFeed=function(type,html,cls){try{if(type==='year'&&typeof mwOn==='function'&&mwOn()&&S.mw&&S.mw.agB===2)html=`ปีที่ ${S.mw.y} ในยุคนี้ · ค.ศ. ${MW_Y0+S.mw.y}`}catch(e){}return _afL.call(this,type,html,cls)}}
SL.impl.addFeed=addFeed;addFeed=function(){return globalThis.addFeed.apply(this,arguments)};})();

// ---- ท่อน mwx115 (เดิมอยู่ app.js บรรทัด 16843) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx115'];let mwEnter=SL.base.mwEnter;
{const _meN=mwEnter;mwEnter=function(){const r=_meN.apply(this,arguments);try{if(mwNoWux())render()}catch(e){}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx116 (เดิมอยู่ app.js บรรทัด 16844) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx116'];let mwYear=SL.base.mwYear;
{const _myN=mwYear;mwYear=function(){mwNoWux();const r=_myN.apply(this,arguments);mwNoWux();return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx117 (เดิมอยู่ app.js บรรทัด 16851) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx117'];let render=SL.base.render;
{const _rnHm=render;render=function(){const r=_rnHm.apply(this,arguments);try{const h=$('mwHud');if(h&&mwOn()){const mn=!!LS.get('murim_mwhmin',false);h.classList.toggle('mwMin',mn);
 const t=h.querySelector('.mwhT');if(t){t.style.cursor='pointer';t.onclick=mwHudTog;let b=t.querySelector('.mwHmB');if(!b){t.insertAdjacentHTML('afterbegin','<span class="mwHmB"></span>');b=t.querySelector('.mwHmB')}b.textContent=mn?'▸':'▾';
  let s=t.querySelector('.mwHmS');if(mn){if(!s){t.insertAdjacentHTML('beforeend','<span class="mwHmS"></span>');s=t.querySelector('.mwHmS')}s.textContent='แตะเพื่อดูทั้งหมด'}else if(s)s.remove()}}}catch(e){}return r}}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx118 (เดิมอยู่ app.js บรรทัด 16854) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx118'];
(function(){const st=document.createElement('style');st.textContent=`#mwHud.mwMin{padding:5px 10px}#mwHud.mwMin>*:not(.mwhT){display:none!important}#mwHud.mwMin .mwhT{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#mwHud .mwHmB{display:inline-block;width:16px;color:#c9b4ff}#mwHud .mwHmS{margin-left:6px;font-weight:400;font-size:11px;color:#c9b4ff}`;document.head.appendChild(st)})();
})();

// ---- ท่อน mwx119 (เดิมอยู่ app.js บรรทัด 20243) · ห่อ: mwEnter ----
(function(){const SL=globalThis.__wSlots['mwx119'];let mwEnter=SL.base.mwEnter;
{const _meI=mwEnter;mwEnter=function(how){let ta=0;try{if(S&&S.alive&&!S.mw){ta=window._mwTApend||0;if(ta)S.age=ta}}catch(e){}window._mwTApend=0;
 const r=_meI.apply(this,arguments);
 try{const M=S.mw;const real=M&&M.agB===2?M.real0:0;if(M&&!M.imm&&real>=200){M.imm={ta:real};M.adapt=Math.min(M.adapt||4,2);S.int+=Math.min(200,Math.round(real/8));
  log(`🪪 ในยุคนี้ไม่มีใครเกิดก่อนคุณสักคนเดียว และไม่มีเอกสารใดยืนยันว่าคนที่มีชีวิตมา ${fmt(real)} ปีมีตัวตน`,'epic');render();saveGame()}}catch(e){console.error(e)}return r}}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};})();

// ---- ท่อน mwx120 (เดิมอยู่ app.js บรรทัด 20247) · ห่อ: mwYear ----
(function(){const SL=globalThis.__wSlots['mwx120'];let mwYear=SL.base.mwYear;
{const _myI=mwYear;mwYear=function(){const r=_myI.apply(this,arguments);try{if(S&&S.alive&&S.mw&&S.mw.imm)imYear(S.mw)}catch(e){console.error(e)}return r}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};})();

// ---- ท่อน mwx121 (เดิมอยู่ app.js บรรทัด 20259) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx121'];
MW_R.push(
 // ---------- 1) ใบหน้าที่ไม่แก่ ----------
 {id:'imFace',w:8,cd:12,c:M=>IM(M)&&M.y>=10,go(M){choice('🪞 ใบหน้าที่ไม่เคยแก่',`เพื่อนร่วมงานยื่นรูปงานเลี้ยงเมื่อ ${M.y>=20?'สิบห้า':'สิบ'} ปีก่อนให้ดู ทุกคนในรูปแก่ลง ยกเว้นคุณ "นายใช้ครีมยี่ห้ออะไร" เขาถาม แต่สายตาไม่ได้ล้อเล่น`,[
  mwC('ย้ายเมือง เปลี่ยนชื่อ เริ่มใหม่',()=>{mwSay('🧳 คุณทิ้งห้อง ทิ้งงาน ทิ้งชื่อเดิมไว้ข้างหลัง เป็นครั้งที่เท่าไหร่ในชีวิตแล้วก็ไม่รู้','',{sec:-35,adapt:-8,mon:-mwS(20000),joy:-6})},{s:'ความลับกลับมาปลอดภัย'}),
  mwC('แต่งหน้าให้ดูแก่ ย้อมผมขาว',()=>mwSay('🎭 คุณเรียนแต่งหน้าจากคลิปออนไลน์ ทุกเช้าต้องวาดริ้วรอยให้ตัวเองก่อนออกจากบ้าน','',{sec:-12,adapt:3,joy:-3}),{s:'ประวิงเวลา'}),
  mwC('เล่าความจริงให้เพื่อนคนนี้ฟัง',()=>{M.imm.conf=(M.imm.conf||0)+1;mwSay('🍻 เขาเงียบไปนาน แล้วสั่งเบียร์เพิ่มอีกสองขวด "งั้นเล่าเรื่องสมัยก่อนให้ฟังหน่อยสิ" คืนนั้นคุณมีเพื่อนแท้เพิ่มหนึ่งคน','good',{sec:8,joy:10})},{s:'มีคนรู้ความลับเพิ่ม'})])}},
 // ---------- 2) อดีตที่ตามมา ----------
 {id:'imGrave',w:12,cd:0,c:M=>IM(M)&&M.y>=1,go(M,P){const who=P.mom?'แม่ — '+esc(P.mom):P.kid?(P.kidG==='หญิง'?'ลูกสาว':'ลูก')+' — '+esc(P.kid):'คนที่คุณรักที่สุด';choice('🪦 สุสานเมื่อหลายร้อยปีก่อน',`ตรงที่คุณจำได้ว่าฝัง${who}ไว้ ตอนนี้กลายเป็น${ch(['ลานจอดรถห้าง','สวนสาธารณะ','คอนโดสามสิบชั้น','วัดเก่าที่ยังอยู่'])} ไม่มีป้ายใดบอกว่าเคยมีใครนอนอยู่ตรงนี้`,[
  mwC('นั่งลงตรงนั้น จุดธูปสามดอก',()=>mwSay(`🕯️ ผู้คนเดินผ่านมองคุณแปลกๆ แต่คุณนั่งอยู่จนธูปหมด บอกเขาว่าคุณยังอยู่ และยังจำได้ทุกอย่าง`,'',{joy:-6,qi:.3}),{s:'ปราณสงบลง'}),
  mwC('สลักชื่อลงบนหินก้อนเล็กแล้ววางไว้',()=>mwSay('🪨 หินก้อนนั้นอยู่ได้แค่สองวันก่อนพนักงานทำความสะอาดเก็บไป แต่คุณสลักไว้ในใจแล้ว','',{joy:-3}),{s:''})])}},
 {id:'imKin',w:12,cd:0,c:M=>IM(M)&&M.y>=2,go(M,P){const g=imGen(P),rich=Math.random()<.5,sur=P.sur||esc(P.n).split(' ')[0];M.imm.kin={rich,y:M.y,g};choice('🧬 สายเลือดรุ่นที่ '+g,`ผลตรวจ DNA จากชุดทดสอบออนไลน์ที่คุณสั่งมาเล่นๆ พบญาติที่ตรงกันมากผิดปกติ ครอบครัวแซ่<b>${sur}</b> ${rich?'เจ้าของเครือบริษัทใหญ่ในเมือง':'ที่เปิดร้านข้าวต้มเล็กๆ ในชุมชนแออัด'} สืบได้ว่าเป็นลูกหลานคุณรุ่นที่ ${g}`,[
  mwC('ไปหาในฐานะ "ญาติห่างๆ จากต่างจังหวัด"',()=>{M.imm.kin.met=1;mwSay(rich?'🏢 ประธานบริษัทวัยหกสิบเชิญคุณกินข้าว เขามีจมูกและคิ้วแบบเดียวกับคุณ แบบเดียวกับแม่คุณ':'🍲 ป้าเจ้าของร้านตักข้าวต้มให้ฟรีชามหนึ่ง "หน้าเหมือนตาทวดในรูปบนหิ้งเลย" เธอพูดยิ้มๆ','good',{joy:12,sec:3})},{s:'ได้ครอบครัวกลับมา'}),
  mwC('เฝ้ามองอยู่ห่างๆ',()=>{M.imm.kin.far=1;mwSay('👀 คุณเดินผ่านหน้าบ้านพวกเขาทุกเดือน ไม่มีใครรู้ว่าบรรพบุรุษของพวกเขาเดินผ่านไปผ่านมา','',{joy:3,sec:-2})},{s:'ปลอดภัย'}),
  mwC('ลบผลตรวจทิ้ง',()=>{M.imm.kin=null;mwSay('🗑️ บางสายสัมพันธ์ควรจบลงในยุคของมัน','',{joy:-4})},{s:''})])}},
 {id:'imKin2',w:10,cd:0,c:M=>IM(M)&&M.imm.kin&&M.imm.kin.met&&M.y-M.imm.kin.y>=3,go(M){const k=M.imm.kin;choice(k.rich?'📉 ตระกูลกำลังล่ม':'🏥 หลานป่วยหนัก',k.rich?'บริษัทของตระกูลถูกกลุ่มทุนต่างชาติไล่ฮุบ ประธานแอบโทรมาปรึกษาคุณกลางดึก เขาบอกว่าไม่รู้ทำไมถึงไว้ใจ "ญาติห่างๆ" คนนี้':'เด็กชายตัวเล็กในร้านข้าวต้มป่วยเป็นโรคที่ต้องผ่าตัด ค่ารักษาเกินกว่าที่ครอบครัวจะหาไหว',[
  mwC(k.rich?'ใช้ประสบการณ์ศึกตระกูลหลายร้อยปีช่วยวางแผน':'จ่ายค่ารักษาให้ทั้งหมด',()=>{if(k.rich)mwSay('♟️ สงครามธุรกิจก็คือสงครามสำนักที่ใช้สัญญาแทนกระบี่ ตระกูลรอด ประธานมอบหุ้นจำนวนหนึ่งให้คุณ','epic',{mon:mwS(300000),joy:10});else mwSay('💊 การผ่าตัดสำเร็จ เด็กชายยิ้มให้คุณผ่านหน้าต่างห้องผู้ป่วย สายเลือดคุณยังไปต่อได้','epic',{mon:-mwS(400000),joy:18})},{s:k.rich?'ได้ส่วนแบ่ง':'เสียเงินก้อนใหญ่'}),
  mwC('ถ่ายปราณรักษาลับๆ',()=>mwSay('🌀 คุณใช้ปราณที่มีอยู่น้อยนิดประคองร่างของลูกหลาน '+(k.rich?'ประธานหายจากความเครียดที่กัดกินมาหลายปี':'หมอบอกว่าอาการดีขึ้นแบบอธิบายไม่ได้'),'good',{qi:-.8,joy:10,sec:5}),{s:'ใช้ปราณ'}),
  mwC('ไม่ยุ่ง ปล่อยให้เป็นไปตามทาง',()=>mwSay('🌧️ คุณเคยเห็นตระกูลรุ่งและล่มมานับไม่ถ้วน แต่ครั้งนี้มันเจ็บกว่าที่คิด','bad',{joy:-10}),{s:''})])}},
 {id:'imRelic',w:10,cd:0,c:M=>IM(M)&&M.y>=3,go(M,P){const it=P.art?'คัมภีร์ "'+esc(P.art)+'"':esc(P.wpn||'กระบี่ประจำตัว');M.imm.relic=1;choice('🏺 สมบัติคุณขึ้นประมูล',`โรงประมูลใหญ่ประกาศนำ <b>${it}</b> "จากราว ค.ศ. ${P.yr}" ออกประมูล ราคาเปิด ${fmt(mwS(2500000))} ของที่คุณเคยพกทุกวันเมื่อหลายร้อยปีก่อน`,[
  mwC('ลอบเข้าไปเอาคืนในคืนก่อนประมูล',()=>{if(Math.random()<.65){M.imm.relicOwn=1;mwSay('🌙 สัญญาณกันขโมยยี่สิบจุด ไม่มีจุดไหนดังเลย เช้าวันรุ่งขึ้นตู้กระจกว่างเปล่า มีเพียงกลิ่นธูปจางๆ ที่ไม่มีใครอธิบายได้','epic',{sec:20,qi:.5,joy:12})}else{M.imm.org=Math.max(M.imm.org||0,1);mwSay('🚨 กล้องอินฟราเรดจับภาพคุณได้ครึ่งตัว คุณหนีออกมาได้มือเปล่า และมีคนเก็บภาพนั้นไว้','bad',{sec:30})}},{s:'65% สำเร็จ'}),
  mwC('สู้ราคาอย่างเปิดเผย',()=>{if((S.money||0)>=mwS(2500000)){M.imm.relicOwn=1;mwSay('🔨 ค้อนเคาะครั้งที่สาม ของของคุณกลับมาเป็นของคุณ ในราคาที่แพงกว่าตอนซื้อครั้งแรกหลายแสนเท่า','epic',{mon:-mwS(2500000),joy:15})}else mwSay('💸 คุณยกป้ายได้สามรอบก่อนราคาจะเกินเงินที่มีทั้งชีวิต ของของคุณไปอยู่ในตู้เศรษฐีที่ไม่รู้ด้วยซ้ำว่ามันใช้ยังไง','bad',{joy:-8})},{s:`ต้องมีอย่างน้อย ${fmt(mwS(2500000))}`}),
  mwC('อาสาเป็นที่ปรึกษาตรวจของโบราณ',()=>{M.imm.lang=M.imm.lang||1;mwSay('🔍 คุณอธิบายรอยสึกบนด้ามจับและที่มาของทุกรอยบิ่นได้ละเอียดจนผู้เชี่ยวชาญอึ้ง โรงประมูลจ้างคุณประจำ','good',{fame:15000,adapt:4})},{s:'ได้งานประจำ'})])}},
 {id:'imLegend',w:9,cd:0,c:M=>IM(M)&&M.y>=4,go(M,P){choice('🎬 ตำนานที่ถูกบิดเบือน',`ซีรีส์ฟอร์มยักษ์เรื่องใหม่ใช้ชื่อ <b>${esc(P.n)}</b> เป็นตัวร้ายใจโฉด ในเรื่องคุณฆ่าอาจารย์ตัวเองและทรยศ${P.sect?esc(P.sect):'สำนัก'} ไม่มีสักฉากที่เป็นความจริง`,[
  mwC('ไปออดิชันเล่นบทตัวเอง',()=>{if(Math.random()<.6)mwSay('🎭 ผู้กำกับให้คุณเล่นบทแทนตัวร้าย "ท่ารำกระบี่ของเขาเหมือนคนที่ฝึกมาทั้งชีวิต" ซีรีส์ดังระเบิด คุณกลายเป็นดาราหน้าใหม่','epic',{fame:400000,mon:mwS(200000),sec:15});else mwSay('🎭 คุณไม่ผ่าน เพราะ "ไม่เข้ากับคาแรกเตอร์"','',{joy:-4})},{s:'60% ได้บท'}),
  mwC('เขียนจดหมายแก้ข้อมูลถึงทีมเขียนบท',()=>mwSay('✉️ ทีมเขียนบทตอบกลับมาว่าข้อมูลคุณ "ละเอียดเกินกว่าที่นักประวัติศาสตร์คนไหนจะรู้" ซีซั่นสองตัวร้ายกลายเป็นวีรบุรุษผู้ถูกใส่ร้าย','good',{fame:30000,joy:10,sec:4}),{s:'แก้ชื่อเสียง'}),
  mwC('ดูจนจบแล้วหัวเราะ',()=>mwSay('📺 นักแสดงนำหล่อกว่าคุณมาก แค่นั้นก็พอให้อภัยได้แล้ว','',{joy:6}),{s:''})])}},
 // ---------- 3) ช่องว่างระหว่างยุค ----------
 {id:'imLang',w:10,cd:0,c:M=>IM(M)&&!M.imm.lang&&M.y>=2,go(M){choice('📜 ภาษาที่ตายไปแล้ว','มหาวิทยาลัยติดประกาศหาผู้ช่วยอ่านจารึกโบราณที่ "ไม่มีใครอ่านออกมาร้อยกว่าปี" คุณอ่านมันออกตั้งแต่ยืนอยู่หน้าบอร์ด เป็นใบเสร็จค่าข้าวสารธรรมดาๆ',[
  mwC('สมัครเป็นผู้ช่วยวิจัย',()=>{M.imm.lang=1;mwSay('🎓 อาจารย์ประจำภาควิชาเรียกคุณว่า "อัจฉริยะ" ทั้งที่คุณแค่อ่านภาษาแม่ มีรายได้ประจำทุกปี','good',{adapt:5,sec:3})},{s:'รายได้ทุกปี'}),
  mwC('แอบแก้คำแปลผิดๆ ในพิพิธภัณฑ์ทางเน็ต',()=>mwSay('⌨️ บัญชีนิรนาม "คนแก่ไม่ยอมตาย" กลายเป็นตำนานในเว็บบอร์ดประวัติศาสตร์','',{fame:8000,joy:5}),{s:''})])}},
 {id:'imLand',w:8,cd:0,c:M=>IM(M)&&M.y>=3,go(M){choice('🗺️ ใต้ลานจอดรถนั่น…','คุณจำได้แม่นว่าตรงนี้เคยเป็นที่ซ่อนหีบเงินของพ่อค้าใหญ่ที่ถูกปล้นฆ่าเมื่อหลายร้อยปีก่อน ไม่มีใครเคยหาเจอ',[
  mwC('ขุดตอนตีสาม',()=>{if(Math.random()<.55)mwSay('💰 จอบกระทบไม้ผุ เงินตำลึงเก่าเต็มหีบ นักสะสมแย่งกันซื้อ','epic',{mon:mwS(R(400000,900000)),sec:8});else mwSay('🚧 ขุดลงไปเจอแค่ท่อประปา และ รปภ. ที่ถือไฟฉาย','bad',{sec:6,mon:-mwS(5000)})},{s:'55%'}),
  mwC('แจ้งกรมศิลปากร',()=>mwSay('🏛️ การขุดค้นพบหีบจริง ข่าวขึ้นหน้าหนึ่ง "ผู้แจ้งเบาะแสขอไม่เปิดเผยชื่อ" ได้รางวัลนำจับก้อนหนึ่ง','good',{mon:mwS(150000),fame:5000,joy:6}),{s:'ปลอดภัย'})])}},
 // ---------- 4) องค์กรลับ ผู้อยู่ยงคนอื่น ศิษย์ ----------
 {id:'imOrg',w:9,cd:0,c:M=>IM(M)&&!M.imm.org2&&(M.sec>=40||M.imm.org>=1||M.y>=9),go(M){const im=M.imm;im.org2=1;choice('🧪 สถาบันวิจัยอายุขัย','ชายใส่สูทยื่นนามบัตร "สถาบันวิจัยชีวภาพเอกชน" เขารู้ว่าคุณอายุเท่าไหร่ <b>รู้มากกว่าที่ควรรู้</b> "ขอแค่ตัวอย่างเลือดหลอดเดียว เราจ่ายให้ตามที่คุณเรียก"',[
  mwC('ปฏิเสธ',()=>{im.org=2;mwSay('🚪 เขายิ้ม เก็บนามบัตรคืน "เดี๋ยวคุณก็เปลี่ยนใจ" คืนนั้นมีรถตู้สีดำจอดหน้าตึกจนเช้า','bad',{sec:6})},{s:'พวกเขาจะตามล่า'}),
  mwC('ให้เลือดปลอม (เลือดไก่ผสมปราณ)',()=>{if(Math.random()<.5){im.org=0;mwSay('🐔 ผลแล็บออกมาประหลาดจนนักวิจัยเลิกสนใจ "ตัวอย่างปนเปื้อน" เงินเข้าบัญชีเรียบร้อย','good',{mon:mwS(500000),joy:6})}else{im.org=3;mwSay('🧫 พวกเขารู้ทันในสองสัปดาห์ และตอนนี้โกรธมาก','bad',{mon:mwS(500000),sec:12})}},{s:'50% เนียน'}),
  mwC('ยอมให้เลือดจริง',()=>{im.org=1;im.blood=1;M.end=Math.max(S.age+3,M.end-R(3,8));mwSay('💉 เงินก้อนใหญ่ที่สุดในชีวิตยุคนี้ แต่ความฝันคืนนั้นเต็มไปด้วยห้องสีขาว และร่างที่หน้าตาเหมือนคุณนับสิบนอนเรียงกัน','bad',{mon:mwS(3000000),qi:-1})},{s:'รวยทันที · อายุขัยลดลง'})])}},
 {id:'imHunt',w:14,cd:5,c:M=>IM(M)&&M.imm.org>=2&&(M.imm.hunt||0)<3,go(M){const im=M.imm,al=im.ally;choice('🕵️ พวกเขามาอีกแล้ว',`ทีมชายชุดดำสี่คนพร้อมปืนยิงยาสลบดักรอคุณใน${ch(['ลานจอดรถใต้ดิน','ซอยหลังที่ทำงาน','สวนสาธารณะตอนเช้ามืด'])}${al?' แต่วันนี้คุณไม่ได้มาคนเดียว':''}`,[
  mwC('สู้ ให้รู้ว่ายอดฝีมือคืออะไร',()=>{im.hunt=(im.hunt||0)+1;const ok=Math.random()<(al?.95:.7);if(ok)mwSay('🥋 ลูกดอกยาสลบสี่ดอกปักอยู่ที่กำแพงข้างหลังคุณ ชายทั้งสี่นอนเรียงกันบนพื้น'+(al?' สหายเก่าของคุณปัดฝุ่นที่แขนเสื้อ':''),'epic',{sec:8,joy:4});else{M.end=Math.max(S.age+2,M.end-R(2,5));mwSay('💉 ลูกดอกดอกหนึ่งเฉียดต้นคอ คุณหนีรอดแต่ร่างกายไม่เหมือนเดิม','bad',{qi:-.5,sec:6})}},{s:al?'95% · มีสหายช่วย':'70%'}),
  mwC('หายตัว ซ่อนให้มิด',()=>{im.hunt=(im.hunt||0)+1;mwSay('🌫️ คุณย้ายที่นอนทุกสามคืนอยู่หลายเดือน ไม่มีใครหาคุณเจอ แต่ก็ไม่ได้ใช้ชีวิตเหมือนกัน','',{sec:-20,joy:-6,adapt:-3})},{s:'ปลอดภัย · ชีวิตสะดุด'}),
  mwC('เจรจากับหัวหน้าทีม',()=>{im.hunt=(im.hunt||0)+1;mwSay('🤝 หัวหน้าทีมอายุห้าสิบ ลูกสาวป่วยเป็นโรคที่สถาบันสัญญาว่าจะรักษา คุณเข้าใจเขา ทั้งคู่จากกันโดยไม่มีใครเจ็บ','',{joy:3,sec:3})},{s:''})])}},
 {id:'imOrgEnd',w:20,cd:0,c:M=>IM(M)&&M.imm.org>=2&&(M.imm.hunt||0)>=3&&!M.imm.orgDone,go(M){const im=M.imm;im.orgDone=1;choice('🏢 ชั้นใต้ดินของสถาบัน','คุณตามรอยรถตู้ไปจนถึงตึกกระจกนอกเมือง ชั้นใต้ดินมีตู้แช่เย็นนับร้อย ป้ายชื่อแต่ละตู้คือคนที่หายตัวไปในประวัติศาสตร์ ผู้ฝึกตนที่หลงยุคมาเหมือนคุณ',[
  mwC('ทำลายข้อมูลทั้งหมด ปลดปล่อยทุกคน',()=>{im.org=0;mwSay('🔥 เซิร์ฟเวอร์ทั้งชั้นดับลง ประตูตู้แช่เปิดออก สามคนยังหายใจอยู่ พวกเขาคุกเข่าคำนับคุณตามธรรมเนียมที่ไม่มีใครในยุคนี้ใช้แล้ว','myth',{sec:15,joy:20,qi:1},true);keyAdd('ปิดสถาบันล่าผู้อยู่ยง')},{s:'จบการตามล่า'}),
  mwC('ทำข้อตกลง: ข้อมูลแลกความสงบ',()=>{im.org=0;mwSay('📜 คุณสอนวิธีหายใจแบบเดินปราณขั้นแรกให้นักวิจัย แลกกับการลบชื่อคุณออกจากทุกฐานข้อมูล ยุคนี้อาจได้ผู้ฝึกตนรุ่นใหม่จากห้องแล็บ','epic',{sec:-30,mon:mwS(800000)})},{s:'ปลอดภัย + เงิน'})])}},
 {id:'imOther',w:9,cd:0,c:M=>IM(M)&&M.y>=5,go(M,P){const foe=P.foe;M.imm.met=1;choice('🍵 ร้านชาเก่าแก่ในย่านเมืองเก่า',`เจ้าของร้านชารินชาให้คุณด้วยท่ารินที่ไม่มีใครในยุคนี้ใช้ เขามองตาคุณแล้วพูดภาษาที่ตายไปแล้ว ${foe?`<b>${esc(foe)}</b> ศัตรูคู่แค้นคุณ ยังไม่ตาย`:'อีกคนหนึ่งที่หลงยุคมาเหมือนคุณ และอยู่มานานกว่าคุณเสียอีก'}`,[
  mwC(foe?'วางความแค้นลง ดื่มชาด้วยกัน':'จับมือเป็นสหาย',()=>{M.imm.ally=1;mwSay(foe?'🍵 สองคนที่เคยอยากฆ่ากันนั่งดื่มชาถึงเช้า บ่นเรื่องค่าไฟเหมือนคนแก่ทั่วไป ในยุคนี้ มีแค่พวกเขาสองคนที่จำโลกเก่าได้':'🤝 เขาสอนคุณว่าจะซ่อนตัวในยุคนี้อย่างไร และสาบานว่าถ้าวันหนึ่งใครมาตามล่า จะยืนข้างคุณ','good',{joy:15,adapt:8,sec:-5})},{s:'ได้สหาย (ช่วยตอนถูกตามล่า)'}),
  mwC(foe?'ชำระแค้นให้จบ':'ประลองฝีมือ',()=>{const w=Math.random()<.6;mwSay(w?'⚔️ ศึกบนดาดฟ้าที่ไม่มีใครเห็น จบลงในสิบกระบวนท่า ผู้ชนะยืนอยู่คนเดียวใต้แสงไฟเมือง':'🩸 คุณแพ้ เป็นครั้งแรกในรอบหลายร้อยปี เขาไม่ฆ่าคุณ แค่หันหลังเดินจากไป','epic',w?{qi:.8,joy:6}:{qi:-.5,joy:-8})},{s:'60% ชนะ'}),
  mwC('จ่ายค่าชา แล้วไม่กลับไปอีก',()=>mwSay('🚪 บางคนควรปล่อยให้อยู่ในอดีต','',null),{s:''})])}},
 {id:'imDis',w:10,cd:0,c:M=>IM(M)&&!M.imm.dis&&M.y>=4,go(M){choice('🥋 เปิดคลาสฝึกร่างกาย','ค่าเช่าห้องแพงขึ้นทุกปี คุณคิดว่าจะเปิดคลาสสอนอะไรสักอย่าง เพื่อหารายได้ และเผื่อจะเจอคนที่มีรากวิญญาณ',[
  mwC('คลาสกังฟูเด็ก',()=>{M.imm.dis=1;M.imm.disY=M.y;mwSay('🧒 เด็กสิบสองคนวิ่งรอบสนาม ร้องว่า "ซือฟุ!" ไม่หยุด คุณเหนื่อยกว่าตอนรบกับทัพหมื่นคน','good',{joy:10,adapt:4})},{s:'รายได้ทุกปี · หาศิษย์'}),
  mwC('คลาสโยคะ/ไทเก็กสำหรับผู้ใหญ่',()=>{M.imm.dis=1;M.imm.disY=M.y;mwSay('🧘 สาวออฟฟิศและลุงเกษียณมาเต็มห้องทุกเสาร์ คนในคลาสบอกว่าหายปวดหลังแบบไม่น่าเชื่อ','good',{joy:6,mon:mwS(10000)})},{s:'รายได้ทุกปี · หาศิษย์'})])}},
 {id:'imDisG',w:14,cd:0,c:M=>IM(M)&&M.imm.dis&&!M.imm.heir&&M.y-(M.imm.disY||0)>=3,go(M){const nm=mwNm({cc:M.cc||'th'},Math.random()<.5?0:1);choice('✨ รากวิญญาณในยุคไร้ปราณ',`<b>${esc(nm)}</b> นักเรียนอายุสิบห้าในคลาสคุณ หายใจได้จังหวะเดียวกับปราณโดยไม่มีใครสอน คนแรกที่คุณเจอในยุคนี้`,[
  mwC('รับเป็นศิษย์สายตรง สอนวิชาจริงทั้งหมด',()=>{M.imm.heir=nm;mwSay(`🏯 ${esc(nm)}คุกเข่าคำนับสามครั้งบนพื้นห้องเช่า สำนักคุณมีศิษย์คนแรกในรอบหลายร้อยปี`,'myth',{qi:.5,joy:18,sec:4},true);keyAdd('รับศิษย์คนแรกในยุคปัจจุบัน')},{s:'มีผู้สืบทอด'}),
  mwC('ปล่อยให้เขาใช้ชีวิตแบบคนธรรมดา',()=>mwSay('🌱 คุณสอนแค่วิธีหายใจ ไม่บอกว่ามันคืออะไร เผื่อวันหนึ่งเขาจะค้นพบเอง','',{joy:3}),{s:''})])}},
 // ---------- ตอนจบของผู้อยู่ยง ----------
 {id:'imEnd',w:40,cd:0,c:M=>IM(M)&&(mwLeft(M)<=6||(M.ageless&&M.y>=150))&&!M.imm.endPick,go(M){const im=M.imm;im.endPick=1;choice('⏳ ปราณที่ประคองร่างเริ่มหมด',`หลัง ${fmt(imTA(M))} ปี คุณรู้สึกได้ว่าปราณที่ทำให้ร่างนี้ไม่แก่ กำลังจะหมดลง ทางเลือกสุดท้ายของผู้อยู่ยง`,[
  mwC('ดึงปราณครั้งสุดท้าย อยู่ให้เห็นยุคถัดไป',()=>{im.endK='future';M.end+=R(40,70);M.fz=1;mwSay('🌌 คุณนั่งสมาธิเก้าสิบวันไม่ลุก ร่างกลับมาหนุ่มอีกครั้ง โลกจะเปลี่ยนไปอีกแค่ไหน คุณอยากเห็น','myth',{qi:-1},true)},{s:'อยู่ต่ออีกหลายสิบปี'}),
  mwC('ปล่อยปราณ แล้วแก่ลงอย่างคนธรรมดา',()=>{im.endK='mortal';M.fz=0;M.ageless=0;M.end=S.age+R(6,10);mwSay('🍂 ผมขาวเส้นแรกขึ้นในเช้าวันรุ่งขึ้น คุณมองมันในกระจกนาน แล้วยิ้ม ในที่สุดก็ได้แก่เหมือนคนอื่นเสียที','good',{joy:15},true)},{s:'ชีวิตสุดท้ายแบบมนุษย์'}),
  mwC('ตามหารอยแยก กลับสู่ยุทธภพ',()=>{im.endK='return';if(M.end-S.age>8)M.end=S.age+R(3,6);mwSay('🌀 คุณเริ่มตามหาร่องรอยของประตูที่พาคุณมา มีคนเห็นแสงประหลาดบนดอยสูงในคืนเดือนมืด','epic',{qi:.5},true)},{s:'จบแบบกลับบ้าน'})])}}
);
})();

// ---- ท่อน mwx122 (เดิมอยู่ app.js บรรทัด 20321) · ห่อ: checkDeath ----
(function(){const SL=globalThis.__wSlots['mwx122'];let checkDeath=SL.base.checkDeath;
{const _cdI=checkDeath;checkDeath=function(){try{if(imOn()&&S.alive&&!S.deathCause&&S.age>=S.mw.end){const M=S.mw,im=M.imm,ta=fmt(imTA(M)),h=im.heir?` ศิษย์${esc(im.heir)}สืบทอดวิชาต่อ`:'';
 S.deathCause=im.endK==='return'?`ก้าวเข้าสู่รอยแยกบนยอดดอยในคืนเดือนมืด หายไปจากยุคปัจจุบันหลังมีชีวิตมา ${ta} ปี${h}`:im.endK==='mortal'?`จากไปอย่างสงบด้วยวัยชราแบบมนุษย์ หลังมีชีวิตมา ${ta} ปี${h}`:im.endK==='future'?`ได้เห็นโลกปี ค.ศ. ${MW_Y0+M.y} ก่อนปราณสุดท้ายจะหมดลง รวมอายุ ${ta} ปี${h}`:`ปราณที่ประคองร่างหมดลงหลังมีชีวิตมา ${ta} ปี${h}`;
 try{keyAdd(`ผู้อยู่ยง ${ta} ปี`)}catch(e){}}}catch(e){}return _cdI.apply(this,arguments)}}
SL.impl.checkDeath=checkDeath;checkDeath=function(){return globalThis.checkDeath.apply(this,arguments)};})();

// ---- ท่อน mwx123 (เดิมอยู่ app.js บรรทัด 20782) · ห่อ: buySys ----
(function(){const SL=globalThis.__wSlots['mwx123'];let buySys=SL.base.buySys;
{const _bsL=buySys;buySys=function(id){if(id!=='life'||!S||!S.sys)return _bsL.apply(this,arguments);const ls0=S.lifespan,L0=lifeMax(),sp0=S.sys.sp;const r=_bsL.apply(this,arguments);try{if(S.sys.sp<sp0){const add=S.lifespan-ls0;if(add>0){if(mwOn&&mwOn()){S.lifespan=ls0;S.mw.end+=add}else if(S.xt){S.lifespan=ls0;const g=Math.max(add,Math.round(L0*.02));S.glExtra=(S.glExtra||0)+g}else{S.lifespan=ls0;lsGive(add)}log(`<span class="px">[ระบบ]</span> ⏳ อายุขัยตอนนี้ ${fmt(lifeMax())} ปี`,'sys');try{render()}catch(e){}}}}catch(e){console.error(e)}return r}}
SL.impl.buySys=buySys;buySys=function(){return globalThis.buySys.apply(this,arguments)};})();

// ---- ท่อน mwx124 (เดิมอยู่ app.js บรรทัด 22093) · ห่อ: openMenu ----
(function(){const SL=globalThis.__wSlots['mwx124'];let openMenu=SL.base.openMenu;
{const _omB=openMenu;openMenu=function(){const r=_omB.apply(this,arguments);try{if(mwBackOK()){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.mwBackB')){const I=mwBackInfo();g.insertAdjacentHTML('afterbegin',`<button class="opt mwBackB" onclick="openMwBack()" style="background:var(--tb4)">🌀 กลับสู่${I.world}<small>กลับโลกเดิม ข้อมูลอยู่ครบ</small></button>`)}}}catch(e){console.error(e)}return r}}
SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx125 (เดิมอยู่ app.js บรรทัด 22095) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx125'];
setTimeout(function mwBackNote(){try{if(mwBackOK()&&!S.mwBackTold){S.mwBackTold=1;log(`🌀 ยุคปัจจุบันปิดปรับปรุงชั่วคราว ถ้าไม่ได้ตั้งใจมา กลับสู่${mwBackInfo().world}ได้ที่ ☰ เมนู → 🌀 กลับสู่${mwBackInfo().world}`,'epic')}}catch(e){}setTimeout(mwBackNote,15000)},4000);
})();

// ---- ท่อน mwx126 (เดิมอยู่ app.js บรรทัด 22756) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx126'];
['mwEnter','mwAsk','mwHeirGo','mwRandNative'].forEach(fn=>{try{const o=window[fn];if(typeof o!=='function')return;window[fn]=function(){if(!mwAllowed()){toast('ยุคปัจจุบันปิดอยู่');return}return o.apply(this,arguments)}}catch(e){}});
})();

// ---- ท่อน mwx127 (เดิมอยู่ app.js บรรทัด 25411) · ห่อ: mtShow ----
(function(){const SL=globalThis.__wSlots['mwx127'];let mtShow=SL.base.mtShow;
mtShow=function(st){const o=st.o||{},rid=st.rid,w=mwW(),M=MW[w],RN=S.xian?(typeof XREALM!=='undefined'?XREALM:[]):REALMS.map(r=>r.n),ep=Math.max(50,o.p||100),r=total()/ep;
 const pw=Math.round(Math.max(3,Math.min(97,Math.pow(total(),1.3)/(Math.pow(total(),1.3)+Math.pow(ep,1.3))*100)));mwOpts(w,o);
 MT.room={rid,o,ep,side:st.side,w};setScene('portal');let rv='';const tr=(S.allies||[]).find(x=>x.n===o.n&&x.tr);if(tr){S.allies=S.allies.filter(x=>x!==tr);S.flags.betrayed=1;rv=`<br><b style="color:#ff6b6b">🗡️ คุณจำใบหน้านี้ได้ ${esc(o.n)} คือคนที่แอบหักหลังคุณตอนสาบานครั้งก่อน!</b>`;log(`🗡️ เจอกันอีกครั้ง… คุณรู้แล้วว่า <b>${esc(o.n)}</b> หักหลังคุณมาตลอด`,'bad',true);keyAdd(`รู้ว่าผู้เล่น ${o.n} หักหลัง`)}
 const gx=o.g?(o.g==='f'?' · หญิง':' · ชาย'):'';
 choice(`${M.ic} พบผู้เล่นจริงใน${M.n}!`,`📍 <b>${esc(mwPl(w))}</b> — ${M.ar}<br><b>${esc(o.n)}</b> ผู้เล่นที่กำลังจำลองชีวิตอยู่ตอนนี้ ยืนอยู่ตรงหน้าคุณ<br>${esc(RN[o.ri]||'')}${o.f?' · '+esc(o.f):''}${gx} · อายุ ${fmt(o.age||0)} ปี<br><span class="tag2">พลังคุณราว ${Math.round(r*100)}% ของเขา · เขากำลังเลือกอยู่เหมือนกัน และไม่รู้ว่าคุณเลือกอะไร</span>${rv}${mwRecog(o)}`,
  MT_OPT.map(([k,t,s])=>({t,s:k==='fight'?`โอกาสชนะราว ${pw}% · ${s}`:s,skip:k==='leave',f(){mtPick(rid,k)}})));
 if(choice._cur){choice._cur.mt=rid;if(choice._min&&!auto){choice._min=false;choiceShow()}}mtCountdown(rid,Math.max(Date.now()+3000,Math.min(st.dl||0,Date.now()+10500)))};
SL.impl.mtShow=mtShow;mtShow=function(){return globalThis.mtShow.apply(this,arguments)};})();

// ---- ท่อน mwx128 (เดิมอยู่ app.js บรรทัด 25428) · ห่อ: mtApply ----
(function(){const SL=globalThis.__wSlots['mwx128'];let mtApply=SL.base.mtApply;
{const _ma=mtApply;mtApply=function(st){if(!st||!S||!S.alive)return _ma.apply(this,arguments);const rid=st.rid,was=mtDone(rid),R0=st.res,o=st.o||{},w=(MT.room&&MT.room.rid===rid&&MT.room.w!=null)?MT.room.w:mwW();
 let bond=null;if(R0&&!was&&R0.k==='bond'){bond={love:R0.love};R0.k='pact';R0.ba=0;R0.bb=0;R0.bonus=1}
 if(R0&&R0.my==='bond')R0.my='ally';if(R0&&R0.their==='bond')R0.their='ally';
 const pw0=S.power,r=_ma.apply(this,arguments);
 try{if(!R0||was||!mtDone(rid))return r;const me=st.side,M=MW[w],ep=Math.max(50,o.p||100);
  if(bond){mwBond(o,bond.love,w);return r}
  if(R0.k==='duel'){const win=R0.w===me;
   if(win){if(w===0){const f=fameR(15);S.fame+=f;log(`🏮 ผู้ชมรอบ${ch(['ลาน','โรงเตี๊ยม','ท่าเรือ'])}โห่ร้อง เรื่องนี้ถูกเล่าขานไปทั่วยุทธภพ ชื่อเสียง +${f}`,'good')}
    else if(w===1){const q=R(3,9);S.qi+=q;log(`☁️ คุณซึมซับปราณที่แตกกระจายจากการปะทะ ปราณ +${q}`,'good')}
    else if(w===2){const g=mwGift(2);S.money+=g;log(`🌟 กฎคุณข่มกฎของเขาได้ ฟ้าลิขิตมอบรางวัล +${fmtM(g)}`,'good')}
    else{const g=Math.max(30,Math.round(total()*.02));S.power+=g;log(`♾️ คุณยึดเส้นทางรอดไว้ได้ และดูดซับพลังจากซากกัลป์ พลังยุทธ์ +${fmt(g)}`,'good')}}
   else if(w===1){const q=Math.min(S.qi||0,R(1,4));S.qi-=q;if(q)log(`☁️ ปราณปั่นป่วนหลังพ่ายแพ้ ปราณ −${q}`,'bad')}}
  else if(R0.k==='pact'){const iB=me==='a'?R0.ba:R0.bb,theyB=me==='a'?R0.bb:R0.ba;
   if(iB){if(w===0&&Math.random()<.5){S.fame=Math.max(0,S.fame-15);log('📰 ข่าวการลอบแทงรั่วออกไป คุณถูกตราหน้าว่า "คนสองหน้า" ชื่อเสียง −15','bad')}
    else if(w===1){S.karma-=5;S.flags.daoOath=1;log('⚡ คุณผิดสาบานต่อเต๋า ทัณฑ์สวรรค์จดจำเรื่องนี้ไว้ (กรรม −5)','bad')}
    else if(w===2){S.karma-=5;log('📜 ฟ้าลิขิตจารึกการหักหลังนี้ไว้ในบันทึกสวรรค์ (กรรม −5)','bad')}
    else{S.karma-=8;log('♾️ กรรมจากการผลักเขาเข้าหาภัย จะติดตัวคุณข้ามกัลป์ (กรรม −8)','bad')}}
   if(theyB&&S.plover&&S.plover.k===o.k&&w===1){joy(-25);S.power=Math.round(S.power*.95);S.flags.hdemon=1;log(`👹 <b>มารในใจ</b> คนที่คุณบำเพ็ญคู่ด้วยกลับหักหลัง จิตใจคุณสั่นคลอน พลังยุทธ์ −5%`,'bad',true)}
   if(R0.bonus&&!iB&&!theyB){if(w===3){const a=newArt(2);a.n='วิชาร่วมรอด·'+o.n;S.arts.push(a);S.hp=S.maxHp;log(`🛡️ คุณกับ ${esc(o.n)} หลังชนหลังฝ่าภัยสิ้นกัลป์จนรอดทั้งคู่ ได้ ${artHtml(a)} · ฟื้นพลังชีวิตเต็ม`,'epic')}
    else if(w===2){const g=mwGift(2);S.money+=g;log(`🌟 พันธสัญญาสวรรค์ศักดิ์สิทธิ์ ทั้งคู่ได้ ${fmtM(g)}`,'good')}
    else if(w===1){const q=R(2,6);S.qi+=q;log(`☯️ สาบานต่อเต๋าสำเร็จ ปราณของทั้งสองสอดประสาน ปราณ +${q}`,'good')}}}
 }catch(e){console.error(e)}return r}}
SL.impl.mtApply=mtApply;mtApply=function(){return globalThis.mtApply.apply(this,arguments)};})();

// ---- ท่อน mwx129 (เดิมอยู่ app.js บรรทัด 25451) · ห่อ: passYear ----
(function(){const SL=globalThis.__wSlots['mwx129'];let passYear=SL.base.passYear;
{const _py=passYear;passYear=function(){const r=_py.apply(this,arguments);try{if(!S||!S.alive)return r;const w=mwW();
 if(S.age<=3&&!S.plmC){S.plmC=1;try{const p=JSON.parse(localStorage.getItem('murim_plover')||'null');if(p&&p.k){S.plm=p;setTimeout(()=>{if(S&&S.alive)log(`🧵 ด้ายแดงข้ามกาล ทุกคืนคุณฝันเห็นใบหน้าของ <b>${esc(p.n)}</b> ราวกับเคยรักกันมาก่อนกัลป์นี้`,'epic')},800)}}catch(e){}}
 const L=S.plover;if(L&&S.spouse===L.n){joy(2);
  if(w===1)S.qi+=1;
  if(Math.random()<.1){const g=mwGift(w);S.money+=g;log(`💌 จดหมายจาก${MW[w].pair} <b>${esc(L.n)}</b>: ${ch([['"คิดถึงนะ โรงเตี๊ยมของเรามีคนแวะมาไม่ขาด"','"ข้าส่งของฝากจากเมืองหลวงมาให้"'],['"ปราณของข้าทะลวงขั้นได้เพราะเจ้า"','"ข้าเก็บสมุนไพรนี้ไว้ให้เจ้า"'],['"ดินแดนของเราสงบสุขดี"','"ข้าเก็บหยกจากสวรรค์ชั้นบนมาฝาก"'],['"ไม่ว่ากัลป์ไหน ข้าจะตามหาเจ้า"','"ข้ายังจำเจ้าได้"']][w])} — +${fmtM(g)}`,'good')}}
 if((S.sworn||[]).length&&Math.random()<.06){const x=ch(S.sworn),g=mwGift(w);S.money+=g;log(`🫂 ${MW[x.w||0].sw} <b>${esc(x.n)}</b> ส่ง${ch(['ของขวัญ','เสบียง','ยาบำรุง','ข่าวลับ'])}มาให้ — +${fmtM(g)}`,'good')}}catch(e){console.error(e)}return r}}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

// ---- ท่อน mwx130 (เดิมอยู่ app.js บรรทัด 27772) · ห่อ: mwEnter, mwAsk, mwHeirGo, mwNewLost, mwPickPast, mwNewAncient, tbCan, choice ----
(function(){const SL=globalThis.__wSlots['mwx130'];let mwEnter=SL.base.mwEnter;let mwAsk=SL.base.mwAsk;let mwHeirGo=SL.base.mwHeirGo;let mwNewLost=SL.base.mwNewLost;let mwPickPast=SL.base.mwPickPast;let mwNewAncient=SL.base.mwNewAncient;let tbCan=SL.base.tbCan;let choice=SL.base.choice;
{const shut=()=>{try{log('🌀 รอยแยกสั่นไหวแล้วผลักคุณกลับมาเบาๆ <b>"ยังไม่ถึงเวลา"</b>','myth',true)}catch(e){}};
 mwEnter=function(){shut()};mwAsk=function(){toast('ยุคปัจจุบันเกิดใหม่ได้อย่างเดียว')};mwHeirGo=function(){toast('ยังไม่เปิดส่วนนี้')};mwNewLost=function(){toast('ยังไม่เปิดส่วนนี้')};mwPickPast=function(){toast('ยังไม่เปิดส่วนนี้')};mwNewAncient=function(){toast('ยังไม่เปิดส่วนนี้')};
 tbCan=function(){return false};
 {const _ch=choice;choice=function(title,text,opts){if(/รอยแยกสู่อนาคต/.test(String(title||'')))title=String(title).replace('รอยแยก','รอยแยก\u200b');return _ch.call(this,title,text,opts)};Object.keys(_ch).forEach(k=>{try{choice[k]=_ch[k]}catch(e){}})}
 const clean=()=>{try{const m=$('modal');if(!m)return;m.querySelectorAll('.mwadmB,.tbB,.mwHeirB').forEach(b=>{if(!/mwInfo/.test(b.getAttribute('onclick')||''))b.remove()});m.querySelectorAll('.mgrid .opt').forEach(b=>{if(/mwNewLost|mwPickPast|mwAsk|mwHeirGo|mwNewAncient|openBury/.test(b.getAttribute('onclick')||''))b.remove()});m.querySelectorAll('p.tag2').forEach(p=>{if(/หรือระหว่างเล่น|หลงยุค/.test(p.textContent)&&!p.closest('.mgrid'))p.remove()});const e=$('end');if(e)e.querySelectorAll('.mwHeirB').forEach(b=>b.remove())}catch(e){}};
 setInterval(clean,400)}
SL.impl.mwEnter=mwEnter;mwEnter=function(){return globalThis.mwEnter.apply(this,arguments)};SL.impl.mwAsk=mwAsk;mwAsk=function(){return globalThis.mwAsk.apply(this,arguments)};SL.impl.mwHeirGo=mwHeirGo;mwHeirGo=function(){return globalThis.mwHeirGo.apply(this,arguments)};SL.impl.mwNewLost=mwNewLost;mwNewLost=function(){return globalThis.mwNewLost.apply(this,arguments)};SL.impl.mwPickPast=mwPickPast;mwPickPast=function(){return globalThis.mwPickPast.apply(this,arguments)};SL.impl.mwNewAncient=mwNewAncient;mwNewAncient=function(){return globalThis.mwNewAncient.apply(this,arguments)};SL.impl.tbCan=tbCan;tbCan=function(){return globalThis.tbCan.apply(this,arguments)};SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};})();

// ---- ท่อน mwx131 (เดิมอยู่ app.js บรรทัด 30195) · ห่อ: liveSnap ----
(function(){const SL=globalThis.__wSlots['mwx131'];let liveSnap=SL.base.liveSnap;
{const _lsC=liveSnap;liveSnap=function(){const r=_lsC.apply(this,arguments);try{if(r&&S&&S.mw){r.wk='c';const M=S.mw;let jt='';try{const J=mwJobOf(M);if(J)jt=mwJP(J,M)[0]}catch(e){}r.r=r.rl=M.native?(M.rnd?'คนยุคปัจจุบัน':'ทายาทคนหลงยุค'):(typeof mwTitle==='function'?mwTitle(M):'คนหลงยุค');r.wd='🏙️ ยุคปัจจุบัน';r.f=jt?'💼 '+jt:(S.age<18?'นักเรียน':'ยังไม่มีงานประจำ')}}catch(e){}return r}}
SL.impl.liveSnap=liveSnap;liveSnap=function(){return globalThis.liveSnap.apply(this,arguments)};})();

// ---- ท่อน mwx132 (เดิมอยู่ app.js บรรทัด 30272) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx132'];
wSlot('mw1',["mwYear","mwRandNative","mwEnter","checkDeath","mwHeirGo","render","autoFocus","mwInfo"]);
})();

// ---- ท่อน mwx133 (เดิมอยู่ app.js บรรทัด 30377) · ห่อ: mwYear, render ----
(function(){const SL=globalThis.__wSlots['mwx133'];let mwYear=SL.base.mwYear;let render=SL.base.render;
{const rep=M=>{try{if(!M)return;const L=M.L;if(L&&typeof L==='object'&&('edu' in L||'tr' in L)){if(typeof L.mem!=='object'||!L.mem)L.mem={};if(typeof L.tir!=='object')delete L.tir;if(typeof L.rk!=='object')delete L.rk}if(M.wx&&M.wx.id==='loop'&&!M.LP)M.LP={mem:0,tir:5,rk:0}}catch(e){}};
 const _y=mwYear;mwYear=function(){rep(S&&S.mw);return _y.apply(this,arguments)};
 const _r=render;render=function(){if(S&&S.mw&&!S.mw._lpfx){S.mw._lpfx=1;rep(S.mw)}return _r.apply(this,arguments)}}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx134 (เดิมอยู่ app.js บรรทัด 30774) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx134'];
wSlot('mw4',["mwPayLife","mwBroke","mwYear","endGame","render","openMenu"]);
})();

// ---- ท่อน mwx135 (เดิมอยู่ app.js บรรทัด 32572) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx135'];
wSlot('mw23',["checkDeath","mwYear","mwRnd","mwBroke"]);
})();

// ---- ท่อน mwx136 (เดิมอยู่ app.js บรรทัด 33820) · ห่อ: genName ----
(function(){const SL=globalThis.__wSlots['mwx136'];let genName=SL.base.genName;
try{(()=>{
const N={
 th:{m:['ธนากร','ภูมิพัฒน์','ณัฐวุฒิ','กิตติพัฒน์','วรเมธ','ศุภชัย','ธีรภัทร','ปิยะพงษ์','อนุชา','สมชาย','วีรยุทธ','ชยพล','พงศกร','ณัฐพล','ธนวัฒน์','กฤษดา','สิทธิชัย','อภิสิทธิ์','จักรพันธ์','ภาคิน'],
     f:['ณัฐชา','ปวีณ์ธิดา','กมลชนก','พิมพ์ชนก','สุภาวดี','วรรณภา','ศิริพร','ชนิดา','อรุณี','กาญจนา','ธิดารัตน์','เบญจมาศ','ปาริฉัตร','นันทนา','พรทิพย์','สุนิสา','ณิชา','ภัทรา','อัญชลี','ธนพร'],
     s:['ใจดี','สุขสวัสดิ์','แก้วมณี','ศรีสุข','พรหมมา','บุญมี','ทองดี','วงษ์ไทย','สายทอง','อินทร์แก้ว','มั่นคง','ดวงจันทร์','ชัยมงคล','แสงทอง','เพชรรัตน์','ศรีวงศ์','บุญเรือง','จันทร์หอม','ประเสริฐสุข','รุ่งเรือง','พึ่งบุญ','ทองคำ','สมบูรณ์','วิเศษศักดิ์'],fmt:(a,b)=>a+' '+b},
 us:{m:['ไมเคิล','เดวิด','เจมส์','แดเนียล','ไรอัน','คริส','อีธาน','แมทธิว','โจชัว','แอนดรูว์'],f:['เอมิลี','ซาราห์','เจสสิกา','แอชลีย์','โอลิเวีย','เอมมา','ราเชล','ลอเรน','ฮันนาห์','เมแกน'],
     s:['สมิธ','จอห์นสัน','วิลเลียมส์','บราวน์','มิลเลอร์','เดวิส','การ์เซีย','วิลสัน','เทย์เลอร์','แอนเดอร์สัน','โธมัส','มัวร์'],fmt:(a,b)=>a+' '+b},
 jp:{m:['ไดสุเกะ','เคนตะ','โซตะ','ฮิโรชิ','ทาคุยะ','เร็น','ยูโตะ','ชุนสุเกะ','ริคุ','คาซึกิ'],f:['ยูกิ','ซากุระ','ฮารุกะ','มิซากิ','อายาเนะ','ฮินะ','มิโอะ','นานามิ','โยชิโกะ','ริน'],
     s:['ทานากะ','ซาโต้','ซูซูกิ','ทาคาฮาชิ','วาตานาเบะ','อิโต้','ยามาโมโตะ','นากามูระ','โคบายาชิ','คาโตะ'],fmt:(a,b)=>b+' '+a},
 kr:{m:['จุนโฮ','ฮยอนอู','แทมิน','มินจุน','โดยุน','ซองฮุน','จีฮุน','ซึงมิน','อูจิน','แทยัง'],f:['จียอน','ซูบิน','มินซอ','ยุนา','ซอฮยอน','ฮายุน','จีอึน','เยริน','ซูอา','แชวอน'],
     s:['คิม','อี','พัก','ชเว','จอง','คัง','ยุน','ฮัน','โจ','ชิน'],fmt:(a,b)=>b+' '+a},
 cn:{m:['เว่ย','ห่าว','หยาง','เจี๋ย','เหล่ย','หมิง','เทา','ปิง','จวิน','เฟิง'],f:['ถิง','เหมย','จิง','หลิง','หว่าน','เสวี่ย','ลี่','อิง','เยี่ยน','ฮุ่ย'],
     s:['หลี่','หวัง','จาง','หลิว','เฉิน','หยาง','จ้าว','หวง','โจว','อู๋'],fmt:(a,b)=>b+a},
 tw:{m:['จวิ้นเจี๋ย','เจียฮ่าว','จื่อเหวย','ป๋อเหยียน','เจี้ยนหง','อวี่เซวียน','กวนอวี่','เส้าหัว'],f:['อี้ถิง','เพ่ยซวน','ซินอี๋','อวี่ซวน','หยาถิง','ซือหาน','อี้หลิง','เจียอิง'],
     s:['เฉิน','หลิน','หวง','จาง','หลี่','หวัง','อู๋','หลิว'],fmt:(a,b)=>b+a}};
const ccOf=()=>{try{const c=S&&S.mw&&S.mw.cc;return N[c]?c:'th'}catch(e){return'th'}};
const surOfMe=cc=>{try{const n=String(S.name||'').trim(),L=N[cc];if(cc==='th'||cc==='us'){const p=n.split(/\s+/);return p.length>1&&p[p.length-1]}if(cc==='jp'||cc==='kr'){const p=n.split(/\s+/);return p.length>1&&p[0]}return null}catch(e){return null}};
function modName(g,sur,cc){cc=cc||ccOf();const L=N[cc]||N.th,fem=g==='หญิง'||g==='f'||g===1;return L.fmt(ch(fem?L.f:L.m),sur||ch(L.s))}
window.mwModName=modName;
const isMod=()=>!!(S&&S.mw&&S.alive!==false);
// ชื่อใหม่ที่เกิดระหว่างชีวิตยุคปัจจุบัน
{const _g=genName;genName=function(f,g,sur){try{if(isMod()){const cc=ccOf(),fam=sur?surOfMe(cc):null;return modName(g,fam||null,cc)}}catch(e){}return _g.apply(this,arguments)}}
// เปลี่ยนชื่อคนที่ถูกสร้างไว้ก่อนเข้ายุคปัจจุบัน (ตอนเกิด) หรือในเซฟเก่า
function fixNames(){try{if(!isMod()||S.mw.nmFix)return;S.mw.nmFix=1;const cc=ccOf(),fam=surOfMe(cc),map={};
 const ren=(o,key,useFam)=>{if(!o||!o[key])return;const old=o[key];if(map[old]){o[key]=map[old];return}const nw=modName(o.g,useFam?fam:null,cc);map[old]=nw;o[key]=nw};
 (S.parents||[]).forEach(p=>ren(p,'n',true));
 (S.sibs||[]).forEach(p=>ren(p,'n',true));
 (typeof peers!=='undefined'&&peers||[]).forEach(p=>ren(p,'name',false));
 // ข้อความในฟีดที่เอ่ยชื่อเดิม
 try{const fd=document.getElementById('feed');if(fd&&Object.keys(map).length){const W=document.createTreeWalker(fd,NodeFilter.SHOW_TEXT);let t;while(t=W.nextNode()){let v=t.nodeValue,ch2=false;for(const o in map){if(v.includes(o)){v=v.split(o).join(map[o]);ch2=true}}if(ch2)t.nodeValue=v}}}catch(e){}
 try{render()}catch(e){}}catch(e){console.error('mwnm',e)}}
window.mwFixNames=fixNames;
setInterval(()=>{try{if(isMod()&&!S.mw.nmFix&&!choice._cur)fixNames()}catch(e){}},700);
})()}catch(e){console.error('block48',e)}
SL.impl.genName=genName;genName=function(){return globalThis.genName.apply(this,arguments)};})();

// ---- ท่อน mwx137 (เดิมอยู่ app.js บรรทัด 34334) · ห่อ: render, mwInfo ----
(function(){const SL=globalThis.__wSlots['mwx137'];let render=SL.base.render;let mwInfo=SL.base.mwInfo;
try{(()=>{
if(typeof MW_R==='undefined'||typeof mwToB==='undefined')return;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pk=a=>a[Math.floor(Math.random()*a.length)];
const UO=()=>{const M=S&&S.alive&&S.mw;return(M&&M.wx&&M.wx.on&&M.wx.id==='under'&&M.U&&!M.kid)?M:null};
const mny=(M,k)=>{try{return mwToB(MW_MIN[M.cc||'th']*k,M)}catch(e){return Math.round(1000*k)}};
const RKN=['เด็กในซอย','นักเลงประจำย่าน','มือขวาก๊ก','หัวหน้าก๊ก','เจ้าพ่อย่าน','ผู้มีอิทธิพล'];
const SUB={normal:['🏙️','นักเลงยุคปกติ','ไม่มีพลังพิเศษ ใช้กำลังคน เงิน และเส้นสาย · ได้โบนัสประสบการณ์ถนน (สำเร็จง่ายขึ้น ความร้อนลดเร็วขึ้น)'],super:['⚡','นักเลงเหนือมนุษย์','ผู้ตื่นพลังซ่อนอยู่ในโลกใต้ดิน คุณคือหนึ่งในนั้น'],sys:['🟦','นักเลงมีระบบ','ระบบโผล่มาพร้อมเป้าหมายใหญ่ของชีวิต']};
const PERS={hot:['🔥','ใจร้อน','ชอบงานใช้กำลัง'],cun:['🧠','เจ้าเล่ห์','ชอบงานเงินและเส้นสาย'],mor:['🕊️','มีศีลธรรม','ชอบงานปกป้องคนอ่อนแอ']};
const GOAL={debt:['💸','ล้างหนี้ของพ่อ','สะสมเงินก้อนใหญ่พอจะปิดหนี้ทั้งหมด'],boss:['👑','ขึ้นเป็นเจ้าพ่อ','ไต่ถึงอิทธิพลระดับสูงสุดของเมือง'],rev:['🩸','ล้างแค้นก๊กที่ฆ่าพี่','ผ่านภารกิจใช้กำลัง 5 งาน และมีอิทธิพลพอ'],prot:['🛡️','ปกป้องซอยบ้านเกิด','คุมย่านให้ครบทั้งห้า']};
// ----- ภารกิจ -----
// k: ชนิด v=กำลัง c=เงิน/เส้นสาย m=ปกป้อง · b: แนวที่ได้เปรียบ f/m/c · h: ความร้อน · i: อิทธิพล · r: เงิน(เท่าค่าครองชีพ) · cl: ยึดย่าน
const QN=[
 {id:'q_tax',n:'เก็บค่าคุ้มครองย่านใหม่',ic:'💵',k:'v',b:'f',h:10,i:6,r:1.5,cl:1,tx:'ย่านหนึ่งยังไม่มีใครคุม แม่ค้าพูดตรงๆ ว่าจะจ่ายให้คนที่ปกป้องพวกเธอได้จริง'},
 {id:'q_esc',n:'คุ้มกันขบวนส่งของ',ic:'🚚',k:'c',b:'c',h:6,i:4,r:2.2,tx:'มีคนจ้างคุ้มกันรถส่งของผ่านย่านที่ไม่เป็นมิตร ไม่ถามว่าในกล่องมีอะไร'},
 {id:'q_rv',n:'ปราบก๊กคู่แค้นที่ล้ำเส้น',ic:'🥊',k:'v',b:'f',h:14,i:9,r:.8,tx:'ลูกน้องก๊กตรงข้ามเริ่มมาเก็บเงินในย่านคุณ ถ้าปล่อยไป ชื่อคุณจะเสีย'},
 {id:'q_gam',n:'เปิดบ่อนเถื่อนหลังซอย',ic:'🎲',k:'c',b:'m',h:20,i:5,r:4,tx:'เจ้าของโกดังเสนอที่ให้เปิดบ่อน รายได้สูงแต่ตำรวจมองอยู่'},
 {id:'q_bail',n:'ประกันตัวลูกน้องที่ถูกจับ',ic:'🔓',k:'m',b:'m',h:-6,i:3,r:-1,tx:'ลูกน้องคนหนึ่งโดนจับตอนทำงานแทนคุณ ถ้าทิ้งเขา คนอื่นจะมองคุณยังไง'},
 {id:'q_cop',n:'ซื้อใจนายสถานี',ic:'🚓',k:'c',b:'c',h:-18,i:1,r:-2,tx:'ผู้กำกับคนใหม่ยังไม่ติดใคร ถ้าเข้าถึงได้ ความร้อนจะลดลงมาก'},
 {id:'q_mkt',n:'ปกป้องตลาดจากนักเลงต่างถิ่น',ic:'🛒',k:'m',b:'f',h:8,i:8,r:.4,tx:'นักเลงต่างถิ่นมารีดไถตลาดที่เด็กๆ ในซอยพึ่งพา ชาวบ้านมองมาที่คุณ'},
 {id:'q_ship',n:'ลอบส่งของข้ามย่าน',ic:'📦',k:'c',b:'c',h:12,i:4,r:2.8,tx:'ลูกค้าต้องการของถึงปลายทางก่อนเช้า และไม่ต้องการให้ใครรู้ว่าผ่านมือคุณ'}];
const QS=[
 {id:'s_hunt',n:'ล่าผู้ตื่นหน้าใหม่',ic:'⚡',k:'v',b:'f',h:12,i:7,r:1,pw:1,tx:'มีเด็กวัยรุ่นใช้พลังเกินคนทั่วไปกลางตลาด ถ้าก๊กอื่นเจอก่อน เขาจะถูกใช้เป็นเครื่องมือ'},
 {id:'s_hide',n:'ปกปิดพลังจากกล้องและตำรวจ',ic:'📹',k:'c',b:'c',h:-14,i:2,r:-1.5,tx:'วิดีโอจากกล้องวงจรปิดมีภาพคุณใช้พลังเมื่อคืน ต้องจัดการก่อนมันขึ้นข่าว'},
 {id:'s_cell',n:'บุกก๊กลับของผู้ตื่น',ic:'🏴',k:'v',b:'f',h:18,i:12,r:2,pw:1,tx:'ก๊กลับที่รวบรวมผู้ตื่นเริ่มรับสมาชิกจากย่านคุณ'},
 {id:'s_test',n:'ทดสอบขีดจำกัดพลังกลางคืน',ic:'🌙',k:'m',b:'m',h:6,i:3,r:0,pw:1,tx:'พลังในตัวคุณเร่งขึ้นผิดปกติช่วงนี้ ต้องหาที่เงียบๆ ทดสอบว่ามันมีขีดจำกัดหรือไม่'}];
const goalQ=g=>({debt:{id:'y_debt',n:'หาเงินก้อนใหญ่',ic:'💸',k:'c',b:'c',h:16,i:5,r:5,tx:'ระบบ: "เงินที่คุณต้องใช้ล้างหนี้ยังขาดอยู่ ตามที่ผมคำนวณ งานนี้ให้ผลดีที่สุด"'},boss:{id:'y_boss',n:'ท้าหัวหน้าก๊กใหญ่',ic:'👑',k:'v',b:'f',h:20,i:14,r:1.5,tx:'ระบบ: "หัวหน้าก๊กย่านเหนือเริ่มอ่อนแรง นี่คือโอกาสที่คุณรออยู่"'},rev:{id:'y_rev',n:'สืบตามหาคนที่ฆ่าพี่',ic:'🩸',k:'v',b:'f',h:16,i:8,r:1,tx:'ระบบ: "ผมได้ข้อมูลใหม่เกี่ยวกับก๊กที่เกี่ยวข้อง แต่ต้องไปเอาเอง"'},prot:{id:'y_prot',n:'ยึดซอยให้ปลอดภัย',ic:'🛡️',k:'m',b:'f',h:10,i:8,r:.6,cl:1,tx:'ระบบ: "ซอยที่ยังไม่มีใครดูแล คือซอยที่คนข้างในยังไม่ปลอดภัย"'}}[g]);
// ----- สถานะ -----
const uS=M=>{const U=M.U;U.qb=U.qb||[];U.qd=U.qd||0;U.q4=U.q4||0;return U};
const crewN=U=>(U.lt||[]).length;
const owned=U=>(U.soi||[]).filter(z=>z.o===1).length;
const rkN=U=>RKN[Math.min(5,U.rk|0)];
function refill(M){const U=uS(M);let ex=0;U.qb=U.qb.filter(q=>{if(S.age>q.dl){ex++;return false}return true});if(ex){U.inf=Math.max(0,U.inf-1);log(`📋 ภารกิจหมดเวลา ${ex} งาน คนในย่านเริ่มพูดว่าคุณไม่ค่อยลงมือ (อิทธิพล −1)`,'')}
 const pool=[...QN];if(U.sub==='super')pool.push(...QS,...QS);if(U.sub==='sys'&&U.sy&&U.sy.goal){const g=goalQ(U.sy.goal);pool.push(g,g)}
 let n=0;while(U.qb.length<3&&n++<20){let w=pool.slice();if(U.sub==='sys'&&U.sy){const p=U.sy.pers;w=w.filter(()=>true);if(Math.random()<.5)w=w.filter(q=>(p==='hot'&&q.k==='v')||(p==='cun'&&q.k==='c')||(p==='mor'&&q.k==='m')||q.id[0]==='y')||w}
  const q=pk(w);if(U.qb.some(z=>z.id===q.id))continue;U.qb.push(Object.assign({},q,{dl:S.age+2}))}}
// ----- ทำภารกิจ -----
function runQuest(i){const M=UO();if(!M)return;const U=uS(M),q=U.qb[i];if(!q)return;const sy=U.sy,P=sy?sy.pers:null,hint=U.hint?.2:0,sup=U.sub==='super'?(U.pw|0)*.035:0;
 const cost=Math.max(0,mny(M,Math.abs(q.r<0?-q.r:1.2)));
 const nb=U.sub==='normal'?.06:0;const F=cl(nb+.38+U.inf/450+crewN(U)*.04+sup+(P==='hot'?.06:0)+hint-U.heat/400+(q.b==='f'?.15:0),.08,.92);
 const Mo=cl(nb+.62+(P==='cun'?.06:0)+hint-U.heat/500+(q.b==='m'?.15:0),.1,.93);
 const C=cl(nb+.34+U.inf/300+(U.crew?.1:0)-U.heat/220+hint+(q.b==='c'?.15:0),.08,.9);
 const pc=v=>Math.round(v*100)+'%';
 const done=(ok)=>{U.hint=0;U.qb.splice(i,1);U.qd++;if(q.k==='v')U.q4++;
  const mul=(P==='hot'&&q.k==='v')||(P==='cun'&&q.k==='c')||(P==='mor'&&q.k==='m')?1.25:1;
  if(ok){const inf=Math.round(q.i*mul),g=Math.round(mny(M,Math.max(0,q.r))*mul);U.inf+=inf;S.money+=g;U.heat=cl(U.heat+Math.round(q.h*.3),0,100);if(q.cl){const f=(U.soi||[]).filter(z=>z.o!==1);if(f.length){pk(f).o=1;log('🗺️ คุณได้ย่านใหม่เพิ่มอีกหนึ่งย่าน','good')}}
   if(q.pw&&U.sub==='super')U.pw=Math.min(10,(U.pw|0)+1);if(sy)sy.pt=(sy.pt|0)+(q.id[0]==='y'?2:1);
   log(`✅ ภารกิจ <b>${q.n}</b> สำเร็จ — อิทธิพล +${inf}${g?` · เงิน +${fmt(g)}`:''}${sy?' · แต้มระบบ +'+(q.id[0]==='y'?2:1):''}`,'good')}
  else{U.heat=cl(U.heat+Math.round(Math.abs(q.h)*.8+3),0,100);U.inf=Math.max(0,U.inf-2);S.hp=Math.max(1,S.hp-Math.round(S.maxHp*.1));log(`❌ ภารกิจ <b>${q.n}</b> พลาด ความร้อนขึ้น อิทธิพลลด และคุณบาดเจ็บ`,'bad')}
  U.rk=Math.min(5,Math.floor(U.inf/60));try{render()}catch(e){}};
 choice(`${q.ic} ${q.n}`,q.tx+`<br><span class="tag2">เส้นตาย: อายุ ${q.dl}${hint?' · ใช้เบาะแสแล้ว +20%':''}</span>`,[
  {t:'🥊 ใช้กำลัง',s:`โอกาสสำเร็จ ${pc(F)}${q.b==='f'?' · เหมาะกับงานนี้':''}`,f(){done(Math.random()<F)}},
  {t:`💵 ใช้เงิน (${fmt(cost)})`,s:`โอกาสสำเร็จ ${pc(Mo)}`,f(){if(S.money<cost){log('💵 เงินไม่พอ งานนี้เลยเลื่อนไปก่อน');return}S.money-=cost;done(Math.random()<Mo)}},
  {t:'🤝 ใช้เส้นสาย',s:`โอกาสสำเร็จ ${pc(C)}${U.crew?' · มีก๊กหนุน':''}`,f(){done(Math.random()<C)}},
  {t:'⏳ ปล่อยไว้ก่อน',s:'ดูภารกิจอื่น',skip:true,f(){}}])}
window.openUBoard=function(){const M=UO();if(!M)return toast('ใช้ได้เฉพาะในโลกใต้ดิน');const U=uS(M);refill(M);const sy=U.sy,sb=SUB[U.sub||'normal'];
 const head=`<div class="item"><b>${sb[0]} ${sb[1]}</b> · ${rkN(U)}<br><span class="tag2">อิทธิพล ${U.inf|0} · ความร้อน ${U.heat|0}/100 · ลูกน้อง ${crewN(U)} · ย่านที่คุม ${owned(U)}/5 · ภารกิจสำเร็จ ${U.qd|0}</span></div>`;
 const sup=U.sub==='super'?`<div class="item">⚡ <b>พลังเหนือมนุษย์ ${U.pw|0}/10</b><br><span class="tag2">ยิ่งสูง โอกาสภารกิจกำลังดีขึ้น แต่ถ้าความร้อนสูง ทางการและองค์กรลับจะสนใจ</span></div>`:'';
 const sys=sy&&sy.goal?`<div class="item">🟦 <b>ระบบ (${PERS[sy.pers][0]} ${PERS[sy.pers][1]})</b> · แต้ม ${sy.pt|0}<br>เป้าหมาย: ${GOAL[sy.goal][0]} <b>${GOAL[sy.goal][1]}</b> — ${GOAL[sy.goal][2]}<br>ความคืบหน้า ${Math.round(prog(M)*100)}%<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap"><button class="gbtn" onclick="uSys(1)">🧊 ลดความร้อน (2)</button><button class="gbtn" onclick="uSys(2)">🤝 ซื้อใจลูกน้อง (2)</button><button class="gbtn" onclick="uSys(3)">🔍 ขอเบาะแส (1)</button></div></div>`:'';
 const qs=U.qb.map((q,i)=>`<button class="opt" onclick="uQuest(${i})">${q.ic} ${q.n}<small>${q.k==='v'?'งานกำลัง':q.k==='c'?'งานเงิน/เส้นสาย':'งานปกป้อง'} · ความร้อน ${q.h>0?'+':''}${q.h} · หมดเวลาอายุ ${q.dl}</small></button>`).join('')||'<p class="tag2">ยังไม่มีภารกิจ</p>';
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>📋 กระดานภารกิจโลกจริง</h3>${head}${sup}${sys}<div class="mgrid">${qs}</div>`,'ubd')};
window.uQuest=function(i){closeM();runQuest(i)};
window.uSys=function(k){const M=UO();if(!M)return;const U=uS(M),sy=U.sy;if(!sy)return;const c=k===3?1:2;if((sy.pt|0)<c)return toast('แต้มระบบไม่พอ');sy.pt-=c;
 if(k===1){U.heat=Math.max(0,U.heat-25);log('🟦 ระบบ: ความร้อนถูกลดลงด้วย "ข้อมูลที่ไม่ควรมีใครรู้" ')}else if(k===2){(U.lt||[]).forEach(l=>{l.loy=cl(l.loy+20,0,100)});log('🟦 ระบบ: ลูกน้องรู้สึกว่าคุณเข้าใจพวกเขามากขึ้น')}else{U.hint=1;log('🟦 ระบบ: เบาะแสถูกส่งมา ภารกิจถัดไปได้เปรียบ')}openUBoard()};
function prog(M){const U=M.U,sy=U.sy;if(!sy)return 0;return cl({debt:S.money/mny(M,300),boss:U.inf/300,rev:Math.min(U.q4/5,U.inf/100),prot:owned(U)/5}[sy.goal]||0,0,1)}
function goalPick(){const M=UO();if(!M)return;const U=uS(M);choice('🟦 ระบบเลือกเป้าหมายชีวิต','ข้อความสีฟ้าลอยขึ้นตรงหน้าคุณกลางซอย: <b>"ผมคือระบบ เลือกเป้าหมายใหญ่ของชีวิตคุณ แล้วผมจะส่งงานที่พาไปถึงที่นั่น"</b>',Object.keys(GOAL).map(k=>({t:`${GOAL[k][0]} ${GOAL[k][1]}`,s:GOAL[k][2],f(){U.sy=U.sy||{pers:pk(Object.keys(PERS)),pt:0,done:0};U.sy.goal=k;log(`🟦 เป้าหมาย: ${GOAL[k][0]} <b>${GOAL[k][1]}</b> · บุคลิกระบบ: ${PERS[U.sy.pers][0]} ${PERS[U.sy.pers][1]} (${PERS[U.sy.pers][2]})`,'epic');U.qb=U.qb.filter(q=>q.id[0]!=='y')}})))}
// ----- เลือกประเภทย่อยครั้งแรก -----
function subReveal(){const M=UO(),U=uS(M),r=Math.random();U.sub=r<.55?'normal':r<.8?'super':'sys';const sb=SUB[U.sub];
 if(U.sub==='sys'){log(`🟦 <b>${sb[1]}</b> — ${sb[2]}`,'myth');goalPick();return}
 choice(`${sb[0]} ${sb[1]}`,U.sub==='super'?'คืนหนึ่งคุณรู้สึกว่าร่างกายตอบสนองเร็วกว่าที่ควร และมีบางคนในย่านรู้ว่าคุณไม่ใช่คนธรรมดา โลกใต้ดินส่วนหนึ่งเต็มไปด้วยผู้ตื่น และคุณเพิ่งเข้าร่วมโดยไม่ได้ขอ':'โลกที่คุณอยู่ไม่มีใครมีพลังวิเศษ ทุกอย่างเป็นเรื่องของคน เงิน และเส้นสาย ใครอยู่ได้ ก็เพราะรู้ว่าต้องทำอะไรเมื่อไหร่',[{t:'รับรู้',f(){if(U.sub==='super'){U.pw=2;log('⚡ ผู้ตื่นพลังระดับ 2 คุณต้องระวังไม่ให้ใครเห็น','epic')}else log('🏙️ เส้นทางนักเลงแบบดั้งเดิม','epic')}}])}
// ----- รายปี -----
function yearly(M){const U=uS(M);U.heat=Math.max(0,U.heat-2-Math.floor(U.heat/25)-(U.sub==='normal'?1:0));refill(M);
 if(U.sub==='super'){if(U.heat>=60&&(U.pw|0)>=3&&Math.random()<.3&&!choice._cur){choice('📹 มีคนเห็นพลังคุณ','คลิปสั้นๆ ที่จับภาพคุณขยับเร็วเกินคนปกติ ถูกส่งต่อกันในกลุ่มแชท และมีคนที่คุณไม่รู้จักเริ่มถามหาตัวคุณ',[{t:'🧹 ซื้อและลบคลิป',s:'เสียเงิน ความร้อนลด',f(){S.money=Math.max(0,S.money-mny(M,3));U.heat=Math.max(0,U.heat-20)}},{t:'🏃 หายตัวไปสักพัก',s:'อิทธิพลลดเล็กน้อย',f(){U.inf=Math.max(0,U.inf-6);U.heat=Math.max(0,U.heat-30)}},{t:'⚡ ปล่อยให้มันแพร่',s:'ชื่อดัง แต่เสี่ยง',f(){U.inf+=10;U.heat=cl(U.heat+15,0,100);U.exp=(U.exp|0)+1}}])}
  if((U.pw|0)>=10&&U.inf>=180&&!U.end){U.end=1;log('⚡ <b>จ้าวแห่งโลกใต้ดินเหนือมนุษย์</b> ทั้งผู้ตื่นและคนธรรมดาในเมืองรู้จักชื่อคุณ','myth',true);S.fame+=3000}}
 if(U.sub==='sys'&&U.sy&&U.sy.goal&&prog(M)>=1){const g=U.sy.goal;U.sy.done=(U.sy.done|0)+1;U.sy.pt+=5;log(`🟦 ระบบ: เป้าหมาย <b>${GOAL[g][1]}</b> สำเร็จ แต้มระบบ +5`,'myth',true);
  if(g==='debt'){S.money=Math.round(S.money*.5);U.inf+=15;S.fame+=500;joy(15)}else if(g==='boss'){S.fame+=2500}else if(g==='rev'){S.karma-=3;S.fame+=1000;joy(5)}else{S.karma+=10;S.fame+=1200;joy(10)}
  U.sy.goal=null;if(U.sy.done<3)setTimeout(goalPick,500);else log('🟦 ระบบ: ภารกิจชีวิตคุณครบแล้ว ต่อจากนี้เป็นเส้นทางที่คุณเลือกเอง','epic')}}
{const _rd=render;render=function(){const r=_rd.apply(this,arguments);try{const M=UO();if(M&&S._ubY!==S.age&&!choice._cur&&!modalOpen&&S.age>=16){S._ubY=S.age;const U=uS(M);if(!U.sub)subReveal();else yearly(M)}}catch(e){console.error('ub',e)}return r}}
{const _i=mwInfo;mwInfo=function(){const r=_i.apply(this,arguments);try{const M=UO(),m=$('modal');if(M&&m&&!m.querySelector('.ubBtn')){const U=uS(M);const e=document.createElement('button');e.className='gbtn ubBtn';e.style.cssText='width:100%;margin:6px 0';e.textContent=`📋 กระดานภารกิจโลกจริง${U.sub?' · '+SUB[U.sub][1]:''} (${U.qb.length})`;e.onclick=()=>openUBoard();const h=m.querySelector('h3');if(h&&h.nextSibling)h.parentNode.insertBefore(e,h.nextSibling);else m.appendChild(e)}}catch(e){}return r}}
try{const g=window._guide2;if(g)g.add('world','🌃','โลกใต้ดิน 3 ประเภทย่อย + กระดานภารกิจ','เมื่ออายุ 16 โลกใต้ดินจะสุ่มประเภทย่อย: <b>นักเลงยุคปกติ</b> (กำลังคน เงิน เส้นสาย) · <b>เหนือมนุษย์</b> (ผู้ตื่นพลัง พลัง 0-10 ระวังโดนเห็น) · <b>มีระบบ</b> (ระบบโผล่มาพร้อมเป้าหมายใหญ่ มีบุคลิก และแต้มระบบ) ทุกแบบใช้ <b>📋 กระดานภารกิจโลกจริง</b> ในหน้าข้อมูล: เลือกวิธีทำ (กำลัง/เงิน/เส้นสาย) ภารกิจมีเส้นตาย ผลตามมาจริง (ความร้อน อิทธิพล ย่านที่คุม)','mwInfo',()=>!!UO())}catch(e){}
window._ub={QN,QS,SUB,runQuest,refill,prog,subReveal};
})()}catch(e){console.error('ub block',e)}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};SL.impl.mwInfo=mwInfo;mwInfo=function(){return globalThis.mwInfo.apply(this,arguments)};})();

// ---- ท่อน mwx138 (เดิมอยู่ app.js บรรทัด 35889) · ห่อ: passYear, choice, openMenu ----
(function(){const SL=globalThis.__wSlots['mwx138'];let passYear=SL.base.passYear;let choice=SL.base.choice;let openMenu=SL.base.openMenu;
try{(()=>{
let inPY=0;const gap=()=>{const v=+LS.get('murim_mwEvGap',2);return v>=1&&v<=4?v:2};
const KEEP=/🪦|ทายาท|ปลายทาง|จบชีวิต|ตาย|เกิดใหม่|สอบเข้า|ทดสอบ/;
{const _py=passYear;passYear=function(){inPY++;try{return _py.apply(this,arguments)}finally{inPY--}}}
{const _ch=choice;choice=function(t){try{if(inPY&&S&&S.alive&&S.mw&&!KEEP.test(String(t||''))){const M=S.mw;if(M._evA!=null&&S.age-M._evA<gap()&&S.age>=M._evA)return;M._evA=S.age}}catch(e){}return _ch.apply(this,arguments)};Object.assign(choice,_ch)}
window.mwEvGapSet=function(){const L=[1,2,3];const v=L[(L.indexOf(gap())+1)%L.length];LS.set('murim_mwEvGap',v);toast(v===1?'เหตุการณ์ยุคปัจจุบัน: ทุกปี (แบบเดิม)':`เหตุการณ์ยุคปัจจุบัน: ไม่เกิน 1 เรื่องต่อ ${v} ปี`);try{openMenu()}catch(e){}};
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(S&&S.mw){const m=$('modal'),sv=m&&m.querySelector('.svStat');if(sv&&!m.querySelector('.mwGapB')){const v=gap();sv.insertAdjacentHTML('afterend',`<button class="gbtn mwGapB" style="width:100%;margin:2px 0 6px" onclick="mwEvGapSet()">⏳ ความถี่เหตุการณ์: ${v===1?'ทุกปี':'1 เรื่อง / '+v+' ปี'} <small class="tag2">(แตะเพื่อเปลี่ยน)</small></button>`)}}}catch(e){}return r}}
})()}catch(e){console.error('mwgap',e)}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};})();

// ---- ท่อน mwx139 (เดิมอยู่ app.js บรรทัด 35921) · ห่อ: passYear, openMenu, render ----
(function(){const SL=globalThis.__wSlots['mwx139'];let passYear=SL.base.passYear;let openMenu=SL.base.openMenu;let render=SL.base.render;
try{(()=>{
// ---------- 🔕 งบป๊อปอัป ----------
// ยุคปัจจุบัน: ระบบเสริม (มินิเกม/คู่ปรับ/ลานใต้ดิน/งานเสริม/ช็อกวัฒนธรรม/ทายชะตา) ใช้ได้รวมกันปีละ 1 ครั้ง และไม่เด้งในปีที่มีเหตุการณ์หลักของยุคนี้อยู่แล้ว
window.ixBudget=function(peek){try{if(!S||!S.mw)return true;const M=S.mw;if(S._ixY===S.age)return false;if(choice._cur||(choice._q&&choice._q.length)||(M.q&&M.q.length))return false;if(peek===1&&Math.random()<.5)return false;S._ixY=S.age;return true}catch(e){return true}};
const on=()=>!!(S&&S.alive&&S.mw);
// ---------- 🏬 ห้างและร้านค้า ----------
const SHOP=[['phone','📱','สมาร์ตโฟนรุ่นใหม่',25000,'ความคุ้นเคย +8 · ผู้ติดตาม +',3,M=>({adapt:8,fame:800})],
 ['vit','💊','วิตามินและอาหารเสริม',1500,'ฟื้นพลังชีวิต 25%',1,M=>{S.hp=Math.min(S.maxHp,S.hp+Math.round(S.maxHp*.25));return{}}],
 ['gym','🏋️','สมาชิกฟิตเนส 1 ปี',12000,'พลัง + · พลังชีวิตสูงสุด +',1,M=>{S.power+=Math.max(3,Math.round(total()*.05));S.maxHp+=8;return{joy:2}}],
 ['course','📚','คอร์สออนไลน์',4000,'ปัญญา +4 · ความคุ้นเคย +3',1,M=>{S.int=(S.int||0)+4;return{adapt:3}}],
 ['cloth','👔','เสื้อผ้าชุดใหม่',3000,'เสน่ห์ +3 · ใจเบิกบาน',1,M=>{S.cha=(S.cha||0)+3;return{joy:4}}],
 ['tea','🍵','ชาสมุนไพรจากร้านยาจีน',2500,'ปราณ +0.3',1,M=>({qi:.3})],
 ['concert','🎫','ตั๋วคอนเสิร์ตไปกับหลิน',5000,'ความผูกพันหลิน +8',1,M=>({lin:8,joy:5}),M=>!!M.linMet],
 ['gift','🎁','ของขวัญให้ครอบครัว',2000,'ใจเบิกบาน +6',1,M=>({joy:6})],
 ['bike','🛵','มอเตอร์ไซค์มือสอง',35000,'งานเสริมได้เงินเพิ่ม 20% ถาวร',99,M=>{M.fl.bike=1;return{adapt:2}},M=>!M.fl.bike]];
const cur=()=>{try{const C=mwCC();return{r:C.rate||1,u:C.cur||'บาท'}}catch(e){return{r:1,u:'บาท'}}};
const price=p=>Math.round(p*cur().r);
window.openMwShop=function(){if(!on())return;const M=S.mw;M.shop=M.shop||{};const c=cur();
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🏬 ห้างและร้านค้า</h3><p class="tag2">มี ${fmt(Math.round((S.money||0)*c.r))} ${c.u} · ของแต่ละอย่างซื้อซ้ำได้ตามรอบที่บอก</p>${SHOP.filter(it=>!it[7]||it[7](M)).map(it=>{const last=M.shop[it[0]],cd=it[5],left=last!=null?Math.max(0,last+cd-M.y):0;return`<div class="item" style="display:flex;gap:8px;align-items:center"><div style="font-size:26px">${it[1]}</div><div style="flex:1;min-width:0"><b>${it[2]}</b><div class="tag2">${it[4]}</div></div><button class="sysb" ${left?'disabled':''} onclick="mwBuy('${it[0]}')">${left?`อีก ${left} ปี`:`${fmt(Math.round(it[3]*c.r))} ${c.u}`}</button></div>`}).join('')}`,'mwshop')};
window.mwBuy=function(k){const M=S.mw,it=SHOP.find(x=>x[0]===k);if(!M||!it)return;M.shop=M.shop||{};const last=M.shop[k];if(last!=null&&M.y<last+it[5])return toast('ยังซื้อซ้ำไม่ได้');if((S.money||0)<it[3])return toast('เงินไม่พอ');S.money-=it[3];M.shop[k]=M.y;const o=it[6](M)||{};let t='';try{t=mwFx(o)}catch(e){}log(`${it[1]} ซื้อ<b>${it[2]}</b>${t}`,'good');try{sfx('good')}catch(e){}render();openMwShop()};
// มอเตอร์ไซค์: งานเสริมได้เงินเพิ่ม
{const _fx=window.mwFx;if(typeof _fx==='function'){}}
{const _py=passYear;passYear=function(){const a0=S&&S.age,m0=S&&S.money;const r=_py.apply(this,arguments);try{if(on()&&S.age!==a0&&S.mw.fl&&S.mw.fl.bike&&S.mw.x&&S.mw.x.job){const g=Math.round(Math.max(0,(S.money||0)-(m0||0))*.2);if(g>0){S.money+=g}}}catch(e){}return r}}
// ปุ่มในเมนูมือถือ + แถบยุคปัจจุบัน
{const _om=openMenu;openMenu=function(){const r=_om.apply(this,arguments);try{if(on()){const g=$('modal').querySelector('.mgrid');if(g&&!g.querySelector('.mwShopB'))g.insertAdjacentHTML('afterbegin',`<button class="opt mwShopB" onclick="closeM();openMwShop()">🏬 ห้างและร้านค้า<small>ซื้อของ · มือถือ ฟิตเนส ของขวัญ</small></button>`)}}catch(e){}return r}}
{const _rd=render;render=function(){const r=_rd.apply(this,arguments);try{if(!on())return r;const row=document.querySelector('#mwHud .mwX');if(row&&!row.querySelector('.mwShopR'))row.insertAdjacentHTML('afterbegin',`<button class="sysb mwShopR" style="flex:1" onclick="openMwShop()">🏬 ร้าน</button>`);
 // คอม: แผงขวา เอาของยุทธภพออก ใส่ของยุคนี้แทน
 const dr=$('deskR');if(dr){const RX=/(openAdvice|openTown|openMarket|openArts|openEquip|openQuests|openDungeons|gachaArt|openRealm|openFaction|openCraft|openBeastComp|openMap|relMenu|openHouse|openFamily|openPeople|openPeers|openRanking|openBestiary|openBury)\(/;dr.querySelectorAll('.dk-btn').forEach(b=>{if(RX.test(b.getAttribute('onclick')||''))b.style.display='none'});dr.querySelectorAll('.dk-grp').forEach(g=>{if(![...g.querySelectorAll('.dk-btn')].some(b=>b.style.display!=='none'))g.style.display='none'});
  if(!dr.querySelector('.dkMw')){const L=[['🏬','ห้างและร้านค้า','openMwShop'],['💼','งาน','openJobs'],['🏠','บ้านและทรัพย์สิน','openAssets'],['👥','คนรอบตัว','openPeopleMW'],['📱','ฟีดโซเชียล','openMwFeed'],['🗺️','ย่านในเมือง','openMwMap'],['🎬','งานเสริม','openMwJob'],['🎯','เป้าหมาย','openGoals']].filter(x=>typeof window[x[2]]==='function');
   const h=`<div class="dk-grp dkMw"><h5>🏙️ ยุคปัจจุบัน</h5><div class="dk-btns">${L.map(x=>`<button class="dk-btn" onclick="try{${x[2]}()}catch(e){}"><span class="dk-bi">${x[0]}</span><span class="dk-bt">${x[1]}</span></button>`).join('')}</div></div>`;const q=dr.querySelector('.dk-q');if(q)q.insertAdjacentHTML('afterend',h);else dr.insertAdjacentHTML('afterbegin',h)}}}catch(e){}return r}}
window._b61={SHOP};
})()}catch(e){console.error('block61',e)}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};SL.impl.openMenu=openMenu;openMenu=function(){return globalThis.openMenu.apply(this,arguments)};SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx140 (เดิมอยู่ app.js บรรทัด 36210) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx140'];
try{SYS_GUIDE.push(
 {s:'life',nw:1,ic:'🎯',t:'คู่ปรับคู่ชีวิต',go:'openRv',life:1,need:()=>S&&S.ix&&S.ix.rv,d:'คนที่เกิดปีเดียวกับคุณและโตไปพร้อมกัน · เจอกันทุก 10–15 ปี · <b>ชนะประลอง</b> เขาจะโตช้าลง แพ้เมื่อไรเขาจะโตเร็วขึ้น · ดื่มด้วยกันได้ใจ แต่เขาก็โตตามด้วย · ถ้าคุณขึ้นโลกใหม่ เขาอาจตามขึ้นมาหรือติดอยู่ข้างล่าง · วันที่เขาจากไป สิ่งที่เขาทิ้งไว้ขึ้นกับว่าใครชนะมากกว่า'},
 {s:'life',nw:1,ic:'👑',t:'ราชสำนัก',go:'openDyn',life:1,d:'ไต่ได้ 5 ขั้น สายทหารหรือขุนนาง ทำงานควบคู่กับสำนักได้ · <b>เลื่อนขั้นผ่านงานใหญ่</b> ที่ฮ่องเต้มอบหมาย ใช้กำลัง ใช้ปัญญา หรือยกความดีให้เจ้านาย (ปลอดภัยแต่ช้า) · <b>ความโปรดปราน</b>ต่ำมากเมื่อไร องครักษ์จะมาเคาะประตูกลางดึก · <b>ศัตรูในราชสำนัก</b>ยิ่งมาก ยิ่งถูกใส่ร้ายบ่อย (ทำงานตรงไปตรงมาก็สร้างศัตรูได้) · ถวายบรรณาการช่วยกู้โปรดปราน · ถึงขั้นสูงพอ วันที่ฮ่องเต้ประชวร คุณจะได้เลือกว่าจะรอ ปกป้อง หรือยึด ยึดพลาดคือตาย'},
 {s:'world',nw:1,ic:'🔥',t:'นรก: วิธีลงแต่ละชั้น',go:'openHell2',life:1,d:'เลือกประตู 1 บานต่อชั้น ป้ายบอกว่าศัตรู<b>แรงราวกี่ % ของคุณ</b> ดูก่อนเข้า · <b>ไฟกรรม</b>สูง ผู้คุมแรงขึ้น พักฟื้น บ่อน้ำ หรือแท่นบูชาช่วยให้เย็นลง · บอสให้แก่นนรกก้อนใหญ่แต่ติดคำสาป เอาแก่นไปใช้ที่แท่นบูชา · ใช้ท่าทีเดิมซ้ำๆ จะถูกอ่านทะลุ · ช่วงรอลงชั้นถัดไปคือเวลาฝึก'},
 {s:'world',nw:1,ic:'🕳️',t:'อเวจี 1000 ชั้น',go:'openAbyss',life:1,d:'นรกที่ลึกกว่าเดิม แบ่งเป็นวง แต่ละวงมี<b>กฎใหม่สะสมเพิ่ม</b> · ประตูไร้ป้ายอาจเป็นที่พักหรือกับดัก · วงลึกๆ ไฟกรรมไม่ลดเอง และวิญญาณสำรองใช้ไม่ได้ · บอสวงใหญ่แพ้เท่ากับตาย ไปให้พร้อมก่อน'},
 {s:'mw',nw:1,ic:'💼',t:'อาชีพเสริม (ยุคปัจจุบัน)',go:'openMwJob',life:1,d:'ทำควบคู่กับโฟกัสหลักได้ ได้เงินทุกปี · ทำไปเรื่อยๆ จะมีงานใหญ่มาให้พิสูจน์ตัว ผ่านแล้วเลื่อนขั้น · เปลี่ยนอาชีพได้แต่ต้องเริ่มขั้นแรกใหม่'},
 {s:'mw',nw:1,ic:'🗺️',t:'ย่านในเมือง',go:'openMwMap',life:1,d:'ย่านที่อยู่เปลี่ยนเหตุการณ์และผลทุกปี · ย่านใหม่ปลดล็อกเมื่ออยู่นานพอและ<b>ปรับตัวกับยุคใหม่</b>ได้มากขึ้น · ลองย้ายดูเมื่ออยากได้เรื่องแบบใหม่'},
 {s:'mw',nw:1,ic:'🌀',t:'ปราณในยุคปัจจุบัน',go:'openQiMW',life:1,d:'โลกยุคใหม่ปราณเบาบาง ต้องสะสมทีละนิด · ถึงแต่ละขั้นจะปลดความสามารถใหม่ ใช้ได้ปีละครั้ง · ยิ่งใช้ในที่แจ้ง คนยิ่งสงสัย บางเรื่องไปถึงหูคนที่ไม่ควรรู้'},
 {s:'mw',nw:1,ic:'🏬',t:'ห้างและร้านค้า',go:'openMwShop',life:1,d:'ของแต่ละอย่างซื้อซ้ำได้ตามรอบที่บอก · บางอย่างช่วยงานเสริม บางอย่างช่วยความสุขหรือความสัมพันธ์ · ของใหม่จะขึ้นเมื่อชีวิตคุณเปลี่ยนไป'},
 {s:'mw',nw:1,ic:'🎯',t:'เป้าหมายยุคปัจจุบัน',go:'openGoals',life:1,d:'เป้าหมายของชีวิตนี้ทำได้ตามจังหวะของตัวเอง · สำเร็จแล้วปลดถ้วยถาวร สะสมข้ามทุกชีวิต · ถ้วยที่ยังเป็น ??? ลองใช้ชีวิตแบบที่ไม่เคยลองดู'},
 {s:'mw',nw:1,ic:'🪪',t:'เอกสารตัวตน',go:'openIdMW',life:1,d:'คนจากยุคเก่าไม่มีตัวตนในระบบ · ไม่มีเอกสารทำงานประจำ เปิดบัญชี หรือซื้อบ้านไม่ได้ · ของปลอมใช้ได้แต่เสี่ยงโดนจับ · ทางถูกกฎหมายช้ากว่าแต่ปลอดภัย หรือจะหาทางที่ไม่มีใครกล้าตรวจ'},
 {s:'mw',nw:1,ic:'📋',t:'เควสยุคปัจจุบัน',go:'openMwQuests',life:1,d:'เควสสร้างจากสถานการณ์คุณตอนนี้ มีเส้นตาย · ทำทันได้รางวัล ไม่ทันก็หายไปเฉยๆ · เควสใหม่มาทุกปี'},
 {s:'mw',nw:1,ic:'🌆',t:'โลกพิเศษในยุคปัจจุบัน',go:'wPanel',life:1,d:'บางชีวิตเกิดในโลกที่มีกฎแปลกไป (โลกมืด ผี ลูปเวลา ซอมบี้) · ทุกโลกมีหลอดอันตราย ถึง 50 / 75 / 90 จะมีเรื่องใหญ่ · ร้านของโลกขายของที่หาที่อื่นไม่ได้'},
 {s:'beast',nw:1,ic:'🐾',t:'ครอบครัวในรัง',go:'openNest',life:1,d:'อยู่กับคู่บ่อยๆ (ซ่อนตัว ท่องป่า) ความผูกพันจะขึ้น ผูกพันสูงมีลูกง่าย ต่ำไปคู่อาจทิ้งรัง · ตายแล้วเลือกเล่นต่อเป็นลูกตัวไหนก็ได้ นิสัยของลูกติดไปชีวิตใหม่'},
 {s:'beast',nw:1,ic:'🗺️',t:'อาณาเขต',go:'openTerr',life:1,d:'ยึดถิ่นให้ได้ผลทุกปี แต่ละถิ่นให้ผลต่างกัน · ทำได้ปีละอย่าง: ยึด ตรวจตรา หรือย้ายถิ่น · ตรวจตราปีไหน ปีนั้นป้องกันแกร่งขึ้น · ป้าย 👤 คือถิ่นของผู้เล่นจริง'},
 {s:'beast',nw:1,ic:'👹',t:'อสูรร้ายประจำสัปดาห์',go:'openWBoss',life:1,d:'ทุกคนช่วยกันตีตัวเดียวกันทั้งเซิร์ฟ · ตีได้ทุก 5 ปีในเกม ดูท่าก่อนโจมตี ยิ่งอ่านถูกยิ่งแรง · ได้พลังและชื่อเสียงตามดาเมจ · รีเซ็ตทุกวันจันทร์'},
 {s:'life',nw:1,ic:'🀄',t:'วิถียุทธ์',go:'openWuxia',life:1,d:'รวมเรื่องเฉพาะตัว: <b>บัญชีแค้น</b> (คนที่ทำร้ายคุณถูกจดไว้เอง แกร่งพอเมื่อไรค่อยชำระ ถ้าเขาแกร่งเกินไปต้องใช้แผน) · <b>ซ่อนพลัง</b> · <b>ฉายาลับ</b> (ยิ่งดังยิ่งเสี่ยงถูกจำได้) · อาวุธที่ใช้นานพออาจตื่นขึ้นมามีวิญญาณ'},
 {s:'grow',nw:1,ic:'🎁',t:'เช็คอิน · ภารกิจ · สมบูรณ์แบบ',go:'dailyOpen',d:'เช็คอินทุกวัน ครบ 7 วันได้คัมภีร์ (ขาดวันนับใหม่) · ภารกิจรายวันและรายสัปดาห์ รีเซ็ตวันจันทร์ · <b>สมบูรณ์แบบ</b> = มินิเกมได้ 90% ขึ้นไป · รางวัลลงในชีวิตที่เล่นอยู่'},
 {s:'life',nw:1,ic:'📜',t:'อะไรติดไปชาติหน้าบ้าง',d:'<b>เล่นต่อเป็นลูก</b>: เงินบางส่วน อาวุธ ชุดเกราะ พาหนะ บ้าน ทรัพย์สินตระกูล และสัตว์คู่ใจที่ติดป้าย 🎗️ · <b>ข้ามทุกชีวิต</b>: คลังกรรม (แลกกรอบ) หน้าตำนาน สมุดสะสมต่างๆ ฉากจบที่เคยได้ และบางอย่างที่ต้องค้นพบเอง เช่น ด้ายแดง วิชาที่ไม่ดับไปพร้อมจักรวาล'},
 {s:'net',nw:1,ic:'🔥',t:'โหมดท้าทาย 3 แบบ',d:'เลือกที่หน้าเกิด · 🔥 <b>นรก</b>: โรคและศัตรูโหดขึ้น สุ่มเกิดใหม่ไม่ได้ และมีนรก 100 ชั้นให้ลง · ⏳ <b>ชีวิตสั้น</b>: อยู่ได้แค่ 30 ปี มีเป้า 5 ข้อชุดเดียวกันทุกคน · 🗑️ <b>รากขยะ</b>: พรสวรรค์ต่ำสุดเสมอ แต่มีทางนอกรีตของตัวเอง · ทุกโหมดมีทำเนียบแยก'}
)}catch(e){console.error('hintsG',e)}
})();

// ---- ท่อน mwx141 (เดิมอยู่ app.js บรรทัด 37144) · ห่อ: openQuests ----
(function(){const SL=globalThis.__wSlots['mwx141'];let openQuests=SL.base.openQuests;
try{(()=>{const _oq=openQuests;openQuests=function(){try{if(S&&S.alive&&S.mw&&typeof openMwQuests==='function'&&!(S.beastMode&&!S.beastMode.human)){openMwQuests();try{const M=S.mw,g=typeof goalNow==='function'?goalNow(M):null,m=$('modal'),h=m&&m.querySelector('h3');
 if(h&&g&&!m.querySelector('.mwGoalQ'))h.insertAdjacentHTML('afterend',`<div class="item mwGoalQ" style="border-left:4px solid #e8b83a"><b>🎯 เป้าหมายตอนนี้</b><br>${g[1]}</div>`);
 if(m&&!(M.qs||[]).length&&!m.querySelector('.mwQEmpty'))m.querySelector('h3').insertAdjacentHTML('afterend',`<p class="tag2 mwQEmpty">ยังไม่มีเควส เควสยุคนี้เริ่มเกิดตั้งแต่อายุ 12 ปีและอยู่ในยุคนี้ครบ 2 ปี เกิดใหม่ทุกปีตามสถานการณ์คุณ (สูงสุด 3 เควสพร้อมกัน)</p>`)}catch(e){}return}}catch(e){}return _oq.apply(this,arguments)}})()}catch(e){console.error('mwQ',e)}
SL.impl.openQuests=openQuests;openQuests=function(){return globalThis.openQuests.apply(this,arguments)};})();

// ---- ท่อน mwx142 (เดิมอยู่ app.js บรรทัด 37460) · ห่อ: choice, bagDesc ----
(function(){const SL=globalThis.__wSlots['mwx142'];let choice=SL.base.choice;let bagDesc=SL.base.bagDesc;
try{(()=>{
// ---------- 1) คำอธิบายหน้าระบบ ----------
const G=[
 ['openFaction','grow','🏯','สำนัก','เข้าสำนักแล้วฝึกเร็วขึ้น ได้วิชาประจำสำนัก และมีงานสำนักให้ทำเพื่อเลื่อนตำแหน่ง · สำนักเปิดรับศิษย์ตอนอายุ 8, 11, 14, 17, 21 หรือไปสมัครเองได้ปีละครั้ง · แต่ละสำนักรับคนตามกรรม (ธรรมะ/อธรรม/มาร) · ตั้งโฟกัส 🏯 งานสำนัก เพื่อไต่ตำแหน่ง'],
 ['openMarket','grow','🛒','ตลาด','ซื้ออุปกรณ์ 4 ช่อง: ⚔️ อาวุธ (พลังรวม +) · 🛡️ เกราะ (เลือดสูงสุด + เจ็บน้อยลง) · 🐎 พาหนะ (ท่องยุทธภพเจอเรื่องดี หนีเก่ง ทำงานได้เงินเพิ่ม) · 🏠 บ้าน (ความสุขทุกปี ชื่อเสียง) · ของชิ้นใหม่แทนชิ้นเก่าในช่องเดียวกัน'],
 ['openMap','world','🗺️','แผนที่โลก','ดูแคว้นต่างๆ และเดินทางไปแดนอื่น · แต่ละพื้นที่มีเหตุการณ์ ศัตรู และของต่างกัน · 🏠 คือที่อยู่ตอนนี้ 👑 คือเมืองหลวง'],
 ['openEquip','grow','⚔️','ชุดสวมใส่','ของที่สวมอยู่ทั้งหมด: อุปกรณ์จากตลาด และเครื่องประดับ/ของวิเศษที่ได้จากดันเจี้ยน งานช่าง หรือเหตุการณ์ · กดสวมหรือถอดได้ · ของบางชิ้นมีจำนวนครั้งที่ใช้ได้'],
 ['openMe','base','🧬','ตัวละครของฉัน','สรุปทุกอย่างของตัวละคร: พรสวรรค์ (ตัวคูณความเร็วฝึก) ชาติกำเนิด นิสัย ร่างกาย ค่าพลัง และสิ่งที่ติดตัว · ดูตรงนี้ได้เลยว่าเก่งด้านไหน'],
 ['openPeers','base','👥','คนที่เกิดวินาทีเดียวกัน','ผู้เล่นคนอื่น (หรือ AI) ที่เกิดพร้อมคุณ ใช้ชีวิตไปพร้อมกัน · แตะชื่อเพื่อดูเส้นทางชีวิตของเขา เป็นคู่เทียบว่าคุณไปได้ไกลกว่าไหม'],
 ['openPortal','world','🌌','ประตูมิติ','ของผู้ข้ามมิติ: เปิดประตูไปโลกเดิมเพื่อดึงของจากโลกนั้นมาใช้ · ชาร์จเพิ่ม 1 ครั้งทุก 8 ปี'],
 ['openItems','world','🎒','ของจากต่างโลก','ของที่ผู้ข้ามมิติพกมาหรือดึงผ่านประตูมิติ · บางชิ้นใช้อัตโนมัติ (เช่น ปืนตอนจวนตัว) บางชิ้นมีจำนวนครั้งจำกัด'],
 ['openRealm','grow','📈','ลำดับขั้นพลัง','ดูขั้นพลังทั้งหมดของแต่ละโลก (ยุทธภพ โลกเซียน โลกเทพ เหนือขีดจำกัด สัตว์อสูร) ว่าตอนนี้อยู่ตรงไหน ต้องพลังเท่าไหร่ถึงขั้นถัดไป และแต่ละขั้นปลดอะไร'],
 ['openFz','world','🌑','แดนต้องห้าม','7 ห้องที่ขังสิ่งอันตรายไว้ · แต่ละห้องเลือกได้ว่าจะสังหาร/ผนึก ปล่อย ทำข้อตกลง หรือรับเป็นผู้คุม · ทุกห้องเกี่ยวโยงกัน สิ่งที่ทำกับห้องหนึ่งเปลี่ยนอีกห้อง คิดก่อนเลือก'],
 ['openRanking','grow','🏆','ทำเนียบสำนัก','อันดับสำนักทั้งยุทธภพ เลื่อนขึ้นลงทุกปีตามผลงาน · สำนักคุณไต่ได้ถ้าคุณสร้างชื่อเสียงและชนะศึก'],
 ['openTerr','beast','🗺️','อาณาเขต (สัตว์อสูร)','ครองถิ่นล่าเหยื่อ ยิ่งครองมากยิ่งมีเสบียง · ทำได้ปีละ 1 อย่าง: ยึดถิ่นใหม่ ตรวจตรา หรือย้ายถิ่น · ถิ่นที่มีเจ้าของต้องสู้ชิง (บอกความแรงเทียบกับคุณไว้ให้)'],
 ['openPack','beast','🐺','ฝูง','สมาชิกในฝูงคุณ · ให้งานตรงนิสัยความภักดีขึ้น ผิดนิสัยลด · ภักดีต่ำอาจท้าชิงจ่าฝูงหรือแยกไปตั้งฝูงคู่แข่ง'],
 ['openB2Evo','beast','🧬','วิวัฒนาการ','ทุกครั้งที่ขึ้นขั้น เลือก 1 ลักษณะจาก 3 แบบ (มีทั้งข้อดีและข้อเสีย) · ลูกมีโอกาส 70% ได้ลักษณะหนึ่งของพ่อแม่'],
 ['openHib','beast','🌙','จำศีล','หลับหลายปีในครั้งเดียว ร่างกายบ่มพลังเป็นแก่นอสูร · ใช้ไขมันสะสม หลับนานใช้มาก · หมีและเต่าจำศีลเก่ง ใช้ครึ่งเดียว'],
 ['openNest','beast','🐾','รังและครอบครัว','คู่และลูกในรังคุณ · ยังไม่มีคู่ลองท่องป่าเพื่อพบ · ลูกโตแล้วเลือกเล่นต่อเป็นลูกได้'],
 ['openForestQ','beast','🌲','ภารกิจพงไพร','งานของสัตว์ป่า (สัตว์ยังเข้าเมืองมนุษย์ไม่ได้) · ทำทันเวลาได้รางวัล · ภารกิจเมืองจะเปิดเมื่อแปลงกายเป็นคนได้'],
 ['openGodRealm','world','🏯','แดนเทพ','โลกสุดท้าย · ทุกขั้นช่วยให้ฝ่าทัณฑ์ง่ายขึ้น ผ่านเหตุการณ์ง่ายขึ้น และพลังกับลมปราณงอกเงยเองทุกช่วง · ไต่ให้ถึงบรรพชนเต๋า'],
 ['openLaws','world','⚖️','บัลลังก์กฎ 8 สาย','ตำแหน่งที่มีได้สายละคนเดียวทั้งเซิร์ฟ สำหรับวิชาที่ถึงขั้น 7 (จารึกกฎ) · ครองแล้วได้พลังพิเศษ แต่คนอื่นท้าชิงได้'],
 ['openWBoss','net','👹','อสูรร้ายประจำสัปดาห์','บอสที่ทุกคนในเซิร์ฟช่วยกันตี · เลือดรวมทั้งเซิร์ฟ ใครตีมากได้แต้มมาก · รีเซ็ตทุกวันจันทร์ ล้มแล้วยังตีเก็บแต้มต่อได้'],
 ['openAdopt','base','🏠','หอเด็กกำพร้า','บริจาคหรือรับเด็กกำพร้ามาเป็นลูกบุญธรรม (ได้กรรมดีและลูกเพิ่ม) · ถ้าตั้งบ้านเด็กกำพร้าของตัวเอง รับเป็นลูกบุญธรรมได้ฟรี'],
 ['openVault','grow','🗝️','คลังสมบัติ','ของที่ประมูลมาเก็บที่นี่ · ยังไม่ใช้ก็ยังโดนขโมยได้ถ้ามีคนตามล่า · ขายคืนได้ครึ่งราคา'],
 ['openAuction','grow','🏺','โรงประมูล','ของชุดใหม่ทุกปี แข่งราคากับคนอื่น ชนะแล้วของเข้าคลังสมบัติ · ของยิ่งหายาก คนที่แพ้ประมูลยิ่งหมั่นไส้ อาจตามล่าชิงของคืน'],
 ['openWuxia','grow','🗡️','บัญชีแค้นและตัวตนลับ','คนที่ทำร้ายคุณถูกจดไว้ที่นี่ (บอกความแข็งแกร่งเทียบกับคุณ) ไปชำระแค้นได้เมื่อพร้อม · ตัวตนลับ (หน้ากาก) มีชื่อเสียงแยก ยิ่งดังยิ่งเสี่ยงถูกจำได้ เผาทิ้งได้'],
 ['openCosmetic','col','🎖️','ของตกแต่ง','ธีมสีพิเศษที่ปลดล็อกจากความสำเร็จต่างๆ · ใช้ได้ทุกชีวิต'],
 ['openLifeLog','base','📜','บันทึกชีวิต','ทุกเหตุการณ์ของชีวิตนี้เรียงตามอายุ · ย้อนดูได้ว่าเลือกอะไรไปและเกิดอะไรขึ้น'],
 ['openStats','col','📊','สถิติรวม','สรุปทุกชีวิตที่จบไปแล้ว: อายุเฉลี่ย ขั้นสูงสุด สาเหตุการตาย และอื่นๆ'],
 ['openArchive','base','🗂️','คลังสำรอง','ชีวิตที่ถูกย้ายออกจากช่องเซฟ (ช่องเต็มหรือกดลบ) เก็บไว้ที่นี่ · กดกู้คืนเพื่อเล่นต่อได้'],
 ['openHeirPick','base','👶','เลือกทายาท','เล่นต่อเป็นลูกที่ยังมีชีวิต · ลูกได้มรดกบางส่วนจากพ่อแม่ (เงิน ชื่อเสียง วิชาที่สอนไว้) · ลูกที่เคยสอนหรือใช้เวลาด้วยจะเริ่มเก่งกว่า'],
 ['openBestiary','col','📖','สมุดสัตว์','สัตว์อสูร/สัตว์วิญญาณที่เคยเจอ · ⚔️ ปราบแล้ว · 🪢 สยบแล้ว · 👀 แค่เห็น · สะสมครบได้รางวัลในสมุดตำนาน'],
 ['openHell2','world','🔥','นรก 100 ชั้น','ลงลึกทีละชั้น ผู้คุมแต่ละชั้นแรงขึ้นเรื่อยๆ · ลงได้ลึกสุดเท่าไหร่ขึ้นทำเนียบนรกตามชั้นนั้น'],
 ['openJobs','world','💼','หางาน (ยุคปัจจุบัน)','ประกาศรับสมัครงานในเมืองที่อยู่ · งานต่างกันที่เงินเดือน ความเหนื่อย และเงื่อนไข (วุฒิ เอกสารตัวตน) · งานใช้แรงจะเกษียณตอนอายุมาก'],
 ['openAssets','world','🏠','บ้านและทรัพย์สิน (ยุคปัจจุบัน)','เช่าหรือซื้อบ้าน รถ และทรัพย์สิน · ผ่อนได้ถ้ามีเอกสารตัวตนและเครดิต · ทรัพย์สินเพิ่มความสุขและฐานะ'],
 ['openGoals','world','🎯','เป้าหมายยุคปัจจุบัน','รายการเป้าหมายของยุคนี้ ทำสำเร็จได้ 🏆 ติดตัวทุกชีวิต · ที่ยังไม่ปลดจะขึ้น ???'],
 ['openQiMW','world','🌀','ปราณ (ยุคปัจจุบัน)','โลกยุคนี้ปราณเบาบาง ฝึกได้ช้า · แต่ละขั้นปลดความสามารถเล็กๆ ที่คนธรรมดาทำไม่ได้'],
 ['openPeopleMW','world','👥','คนรอบตัว (ยุคปัจจุบัน)','ครอบครัว เพื่อน เพื่อนร่วมงาน และคนรัก · ความสัมพันธ์ส่งผลต่อความสุขและโอกาสในชีวิต'],
 ['openIdMW','world','🪪','เอกสารตัวตน (ยุคปัจจุบัน)','ไม่มีเอกสาร = ทำงานประจำ เปิดบัญชี ซื้อบ้าน/รถ และเดินทางต่างประเทศไม่ได้ · เอกสารปลอมใช้ได้เกือบทุกอย่าง แต่เสี่ยงถูกตรวจพบทุกปี'],
 ['openOldMW','world','📜','ตัวตนจากยุคเก่า','ค่าที่ติดตัวมาจากโลกก่อน · ยุคนี้พลังถูกบีบเหลือนิดเดียว แต่ความทรงจำยังอยู่ ใช้ในบางเหตุการณ์ได้'],
 ['openPhone','world','📱','โทรศัพท์จากต่างโลก','ของผู้ข้ามมิติจากยุคปัจจุบัน · มีแอปให้ใช้ (ความรู้ แผนที่ ฯลฯ) แต่ละแอปปีละครั้ง · แบตชาร์จเองทุกปี'],
 ['openFamTime','base','💞','ใช้เวลากับครอบครัว','ใช้เวลากับแต่ละคนได้ปีละ 1 ครั้ง ของขวัญให้ได้ตลอด · ยิ่งสนิทยิ่งมีความสุข · ลูกที่คุณสอนจะเก่งขึ้นเมื่อได้สืบทอดเป็นทายาท'],
 ['openLove','base','💞','ความรัก','ตั้งครั้งเดียวใช้ทุกชีวิตว่าจะให้ความรักเข้ามาแบบไหน (หรือครองโสด) · ถ้ามีคู่อยู่แล้ว เปลี่ยนเป็นครองโสดคู่ไม่หาย แต่จะไม่มีคนใหม่เข้ามา'],
 ['openDungeons','grow','🏰','ดันเจี้ยน','ลงได้ทุก 2 ปี (อายุ 12 ขึ้นไป) · 5 ห้องแล้วเจอบอส ถอยออกได้ระหว่างทาง · ได้วัตถุดิบ ยา อุปกรณ์ ตำรับ · คู่หูช่วยสู้'],
 ['openWealth','grow','💰','ทุ่มทรัพย์','ที่ใช้เงินก้อนโต: ขยายอาณาเขต (ให้ผลทุกปี) · ซื้อทรัพยากรฝึก (ยิ่งซื้อในปีเดียวกันยิ่งได้ผลน้อยลง) · ตั้งค่ายกลเพิ่มโอกาสทะลวง · บ่อนทายผลประลอง · ตลาดมืดของหายาก · คลังตระกูลส่งต่อชีวิตหน้า · รวยมากจะมีโจร ขุนนาง ญาติมาเยือน'],
 ['openQuests','base','📋','เควส','เควสทุกแบบรวมไว้ที่เดียว: ✅ พร้อมส่ง · 🔥 ใกล้หมดเวลา · 📋 กำลังทำ · 📌 ติดตามเควส = เวลาของเควสนั้นเดินช้าลงครึ่งหนึ่ง เกมเตือนก่อนหมดเวลา และตัวเลือกที่ช่วยได้มีป้าย 📌 · ทำได้เกินครึ่งแต่หมดเวลาได้รางวัลครึ่งหนึ่ง · 🔓 ทางแก้ชะตาร้ายก็อยู่ที่นี่ (ทำสำเร็จแล้วชะตาร้ายกลายเป็นพลัง)']];
const SEEN='murim_tipseen',seen=()=>{try{return LS.get(SEEN,{})||{}}catch(e){return{}}};
const BY={};G.forEach(([go,s,ic,t,d])=>{(BY[go]=BY[go]||[]).push({ic,t,d});try{if(!SYS_GUIDE.some(x=>x.t===t&&x.go===go))SYS_GUIDE.push({s,ic,t,d,go,life:1,nw:1})}catch(e){}});
function tip(go,s0){try{if(!modalOpen)return;if(s0!=null&&_mSeq===s0)return;const m=$('modal');if(!m||m.querySelector('.gdTip')||/^(choice|duel|wscroll)$/.test(m.dataset.k||''))return;const L=BY[go];if(!L)return;const h=m.querySelector('h3');if(!h)return;const S0=seen(),first=!S0[go];
 h.insertAdjacentHTML('afterend',`<details class="gdTip${first?' new':''}"${first?' open':''}><summary>${first?'💡 ระบบนี้คืออะไร (ครั้งแรก)':'❓ ระบบนี้คืออะไร'}</summary><div>${L.map(g=>g.d).join('<br>')}</div></details>`);if(first){S0[go]=1;try{LS.set(SEEN,S0)}catch(e){}}}catch(e){}}
Object.keys(BY).forEach(go=>{try{const f=window[go];if(typeof f!=='function')return;const w=function(){const s0=_mSeq;const r=f.apply(this,arguments);try{tip(go,s0)}catch(e){}try{if(r&&typeof r.then==='function')r.then(()=>setTimeout(()=>tip(go,s0),60),()=>{})}catch(e){}return r};Object.assign(w,f);window[go]=w}catch(e){}});
// หน้าที่เรียกตัวเองซ้ำ (เปลี่ยนแท็บ) จะเรียกผ่านชื่อในหน้าต่าง จึงยังขึ้นกล่องได้ — แต่ถ้าเปิดหน้าแล้วยังไม่มี ให้ลองอีกรอบตอนหน้าต่างเปลี่ยน
// ---------- 2) คำใบ้ผลของตัวเลือก (อ่านจากโค้ดของปุ่มนั้น) ----------
const RULES=[[/S\.power\s*\+=|pctPow\(|\bpw\(/,'พลัง +'],[/S\.power\s*-=/,'พลัง −'],[/S\.qi\s*\+=/,'ลมปราณ +'],[/S\.qi\s*-=/,'ลมปราณ −'],[/S\.int\s*\+=/,'ปัญญา +'],[/S\.cha\s*\+=/,'เสน่ห์ +'],
 [/S\.fame\s*\+=/,'ชื่อเสียง +'],[/S\.fame\s*-=|S\.fame=Math\.max\(0,\s*S\.fame\s*-/,'ชื่อเสียง −'],[/S\.karma\s*\+=/,'กรรมดี +'],[/S\.karma\s*-=/,'กรรม −'],
 [/S\.money\s*\+=/,'ได้เงิน'],[/S\.money\s*-=/,'เสียเงิน'],[/joy\(\s*\d/,'ความสุข +'],[/joy\(\s*-/,'ความสุข −'],[/S\.hp\s*-=|S\.hp=Math\.max\([^)]*S\.hp\s*-/,'เสียเลือด'],[/S\.maxHp\s*\+=/,'เลือดสูงสุด +'],
 [/\.rel\s*(\+=|=Math\.min)/,'ความสัมพันธ์ +'],[/addArt\(|newArt\(|learnArt\(/,'ได้วิชา'],[/bagAdd\(|addItem\(/,'ได้ของ'],[/S\.lifespan\s*\+=/,'อายุขัย +']];
const hint=o=>{try{if(!o||o.s||typeof o.f!=='function')return'';const src=String(o.f);const out=[];RULES.forEach(([rx,t])=>{if(rx.test(src)&&!out.includes(t))out.push(t)});
 const fightA=/fight\(|duel\(/.test(src),rnd=/Math\.random\(\)|roll01\(/.test(src);
 if(fightA)out.unshift('ต้องสู้'+(out.length?' · ชนะ/แพ้ผลต่างกัน':''));else if(rnd&&out.length)out.unshift('มีลุ้น');
 if(!out.length&&/ปฏิเสธ|ไม่สน|ปล่อย|ข้าม|ถอย|เดินจาก|ไม่ยุ่ง|เพิกเฉย/.test(String(o.t||'')))return'ไม่ได้ไม่เสียอะไรมาก';
 return out.slice(0,5).join(' · ')}catch(e){return''}};
{const _c=choice;choice=function(title,text,opts){try{if(Array.isArray(opts))opts.forEach(o=>{if(o&&!o.s){const h=hint(o);if(h){o.s=h;o._sAuto=1}}})}catch(e){}return _c.apply(this,arguments)};Object.assign(choice,_c)}
window._choiceHint=hint;
// ---------- 3) ของที่ไม่มีคำอธิบาย ----------
try{const _bd=bagDesc;bagDesc=function(id){const r=_bd.apply(this,arguments);if(!r&&id==='mirror')return'ของแปลกจากต่างโลก ใช้เองไม่ได้ เอาไปขายให้ขุนนางได้ราคาดี (ซื้อได้จากร้านค้าข้ามมิติ)';return r}}catch(e){}
})()}catch(e){console.error('explainX',e)}
SL.impl.choice=choice;choice=function(){return globalThis.choice.apply(this,arguments)};SL.impl.bagDesc=bagDesc;bagDesc=function(){return globalThis.bagDesc.apply(this,arguments)};})();

// ---- ท่อน mwx143 (เดิมอยู่ app.js บรรทัด 38915) · ห่อ: - ----
(function(){const SL=globalThis.__wSlots['mwx143'];
wSlot('mw33',["log","addFeed","mwRandNative","mwBroke","render","mwJobEv","mwYear","mwJobYear"]);
})();

// ---- ท่อน mwx144 (เดิมอยู่ app.js บรรทัด 43021) · ห่อ: lkBody, crDraw ----
(function(){const SL=globalThis.__wSlots['mwx144'];let lkBody=SL.base.lkBody;let crDraw=SL.base.crDraw;
try{(()=>{
const DK=()=>innerWidth>=1100;
const ORD=['w0','w1','w3','w2','h','s','j','rg','l','k','mn','n','u','o','p','z','t','e','q','y','v'];
const yp=id=>{const i=ORD.indexOf(id);return i<0?null:(i/(ORD.length-1)*100).toFixed(4)+'%'};
const onS=id=>{const e=document.getElementById(id);return !!(e&&e.classList.contains('on'))};
function which(){try{const m=document.getElementById('modal');
 const bb=document.getElementById('brB');if(bb&&bb.offsetParent!==null)return['w2','beast'];
 const mb=document.getElementById('mwB');if(mb&&getComputedStyle(mb).display!=='none')return['mn','mw'];
 if(onS('skB'))return['k','sky'];if(onS('fgB'))return['mn','fog'];
 if(onS('create'))return[window._skyLookFlow?'k':window._mwLookFlow?'mn':(CFG.xian?'w1':'w0'),'create'];
 if(onS('birth'))return[CFG.xian?'w1':(CFG.chm==='soul'||(window.CFG&&CFG.soul))?'l':'w0','birth'];}catch(e){}return null}
let bg=null;
function tick(){try{const w=DK()?which():null;document.body.classList.toggle('bdOn',!!w);document.body.dataset.bdw=w?w[1]:'';
 if(!bg){bg=document.createElement('div');bg.id='bdBg';document.body.appendChild(bg)}
 if(w){const y=yp(w[0]);if(bg._y!==y){bg._y=y;bg.style.setProperty('--y',y)}}
 if(w&&w[1]==='mw')side()}catch(e){}}
setInterval(tick,350);addEventListener('resize',tick);

// ---------- 🏙️ ยุคปัจจุบัน: แผงขวา ----------
const WPC={normal:42,hunter:6,hunterhi:4,under:10,ghost:10,loop:6,zombie:6,tower:4,game:4,gatewon:4,doom:4};
function side(){try{const M=window._mbGet&&window._mbGet(),o=document.getElementById('mwB');if(!M||!o)return;const W=o.querySelector('.mbWrap');if(!W)return;
 let s=W.querySelector('.mbSide');const tv=t=>{const e=o.querySelector(t+' .mbTv');return e?e.textContent.trim():''};
 const lk=Object.keys(M.lock||{}).filter(k=>['pv','bg','tal','wld','sys'].includes(k)&&M.lock[k]).length,LKc=window._LK&&window._LK.c;
 const pc=M.rnd?(WPC[M.wld]||0):0,ns=M.nsys?1:0;const odds=pc?Math.max(1,Math.round(100/pc*(ns?20:1))):0;
 const h=`<div class="box sdOdds sdF">${window.fateBoxH&&window.mwFateParts?fateBoxH(mwFateParts(M)):""}</div>
 <div class="box sdLk"><b>🔒 ล็อกชะตา ${lk}/2</b><div class="tag2">ตั๋วล็อก ${LKc==null?'…':fmt(LKc)} ใบ · กด 🔓 ล็อก บนการ์ด · <a href="#" onclick="lkMenu();return false">ซื้อเพิ่ม</a></div></div>
 <div class="sdAct"><button class="pbtn" onclick="mwBStart()">ใช้ชีวิต ▶</button><div class="sd2"><button class="gbtn" ${M.rr>0?'':'disabled'} onclick="mwBReroll()">🔄 เกิดใหม่ (${M.rr|0})</button><button class="gbtn" onclick="mwRRMore()">🎲 สุ่มเพิ่ม</button></div></div>`;
 if(!s){s=document.createElement('div');s.className='mbSide';W.appendChild(s)}if(s._h!==h){s._h=h;s.innerHTML=h}}catch(e){}}

// ---------- 🧑‍🎨 สร้างตัวละคร/สร้างเอง: แผงสรุป + แสดงตัวเลือกทุกหมวดพร้อมกัน ----------
if(typeof lkBody==='function'){const _lb=lkBody;lkBody=function(){if(!DK())return _lb.apply(this,arguments);const t0=C.tab;let out='';try{LK_TABS.forEach(([k,ic,t])=>{C.tab=k;const h=_lb.apply(this,arguments).replace(/^<div class="lktabs">[\s\S]*?<\/div>/,'');if(h.trim())out+=`<div class="lkSec"><div class="lkSh">${ic} ${t}</div>${h}</div>`})}catch(e){console.error(e)}finally{C.tab=t0}return out||_lb.apply(this,arguments)}}
function crSide(){try{const c=document.getElementById('create');if(!c)return;let s=document.getElementById('crSide');if(!DK()){if(s)s.remove();return}
 if(!s){s=document.createElement('div');s.id='crSide';s.className='box';c.appendChild(s)}let L={};try{L=lkFromC()}catch(e){}
 const sw=(n,v)=>v?`<div class="crSw"><i style="background:${v}"></i>${n}</div>`:'';const st=(document.getElementById('crStep')||{}).textContent||'',ti=(document.getElementById('crTitle')||{}).textContent||'';
 s.innerHTML=`<div class="tag2">สรุปตัวละคร</div><div class="crNm">${esc((C.name||'').trim()||'(ยังไม่ตั้งชื่อ)')}</div><div class="tag2">${C.g===1?'♀ หญิง':'♂ ชาย'}</div>
  <div class="crSws">${sw('ผิว',L.skin)}${sw('ผม',L.hair)}${sw('ชุด',L.robe)}${sw('ขอบชุด',L.trim)}${sw('ดวงตา',L.eye)}</div>
  <div class="crSt"><b>${esc(st)}</b> ${esc(ti)}</div><div class="tag2">${esc((document.getElementById('crSum')||{}).textContent||'')}</div><div class="crPt">${(document.getElementById('crPts')||{}).outerHTML||''}</div>`}catch(e){}}
if(typeof crDraw==='function'){const _cd=crDraw;crDraw=function(){const r=_cd.apply(this,arguments);try{crSide()}catch(e){}return r}}
addEventListener('resize',()=>{try{if(onS('create'))crDraw()}catch(e){}});

const st=document.createElement('style');st.textContent=`
#bdBg{display:none}
@media (min-width:1100px){
body.bdOn #bdBg{display:block;position:fixed;inset:-60px;z-index:-1;background:url(/worlds.png?v=2) 0 var(--y,0%)/200% 2100% no-repeat;image-rendering:pixelated;filter:blur(7px) brightness(.32) saturate(1.25);pointer-events:none}
body.bdOn #bdBg:after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,transparent 30%,#0b0910cc 85%)}
/* ยุทธภพ/เซียน/จิตวิญญาณยุทธ์ */
#birth.bdk{max-width:1320px;margin:0 auto}
#birth.bdk #traits{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(220px,1fr))!important;gap:8px!important;align-items:stretch}
#birth.bdk #traits .trait{margin:0!important;height:100%;box-sizing:border-box}#birth.bdk #traits .trait.wide{grid-column:span 2}#birth.bdk #traits>.tag2{grid-column:1/-1}
#birth.bdk #bdR{position:sticky;top:10px;align-self:start}
/* ยุคปัจจุบัน */
#mwB .mbWrap{max-width:1320px!important;display:grid!important;grid-template-columns:300px minmax(0,1fr) 320px;grid-template-areas:"top top top" "hero grid side";column-gap:16px;align-items:start;padding:0 18px 20px}
#mwB .mbTop{grid-area:top}#mwB .mbHero{grid-area:hero;display:flex!important;flex-direction:column;align-items:stretch;position:sticky;top:10px;margin:0!important}
#mwB .mbStage{width:100%!important;height:300px!important;grid-row:auto}#mwB .mbIn{text-align:center!important;margin-top:10px}#mwB .mbSub{text-align:center!important}#mwB .mbBtns{justify-content:center!important}
#mwB .mbGrid{grid-area:grid;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;align-content:start}#mwB .mbGrid .mbWide{grid-column:1/-1}
#mwB .mbSide{grid-area:side;position:sticky;top:10px;display:flex;flex-direction:column;gap:10px}
#mwB .mbBar,#mwB .mbBar.b3{display:none!important}
#mwB .mbSide .box{background:#1b1828;border:2px solid #a8873e;border-radius:6px;box-shadow:3px 3px 0 #a8873e;padding:12px;margin:0}
#mwB .sdOdds .n{font-size:30px;color:#ffe08a;margin:4px 0}#mwB .sdOdds .od{font-size:13px;line-height:1.7;color:#d8ccb0}
#mwB .sdLk{font-size:13px}#mwB .sdLk a{color:#ffd98a}
#mwB .sdAct{display:flex;flex-direction:column;gap:8px}#mwB .sdAct .pbtn{min-height:60px;font-size:20px;border-radius:14px;background:linear-gradient(#ffe9a8,#e8b54a 55%,#c98d22);color:#2a1a04;border:2px solid #b8801e;box-shadow:0 4px 0 #b8801e;font-family:inherit}
#mwB .sd2{display:grid;grid-template-columns:1fr 1fr;gap:8px}#mwB .sd2 .gbtn{min-height:48px;border-radius:12px;background:linear-gradient(160deg,#ffffff14,#ffffff06);color:#f1e8d4;border:1px solid #e8b54a66;font-family:inherit}
/* สัตว์อสูร: หน้าต่างกลายเป็นเต็มจอ 3 คอลัมน์ */
body.bdOn[data-bdw="beast"] #modal{width:min(1320px,96vw)!important;max-width:none!important;max-height:94vh!important}
body.bdOn[data-bdw="beast"] #brB{display:grid;grid-template-columns:340px minmax(0,1fr) 330px;grid-template-areas:"h h h" "p p p" "st tr od" "hd tr gl" "x tr act";column-gap:16px;row-gap:10px;align-items:start}
#brB>h3{grid-area:h}#brB>p.tag2{grid-area:p}
body.bdOn[data-bdw="beast"] #brB>.brst{grid-area:st;margin:0}body.bdOn[data-bdw="beast"] #brB>.brhd{grid-area:hd}
body.bdOn[data-bdw="beast"] #brB>.brtr{grid-area:tr;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}body.bdOn[data-bdw="beast"] #brB>.brtr .trait{margin:0}body.bdOn[data-bdw="beast"] #brB>.brtr .trait.wide{grid-column:1/-1}
body.bdOn[data-bdw="beast"] #brB>#brOdds{grid-area:od;margin:0}body.bdOn[data-bdw="beast"] #brB>#brGoal{grid-area:gl;margin:0}body.bdOn[data-bdw="beast"] #brB>.brAct{grid-area:act;position:static!important;display:flex;gap:8px}
/* สร้างตัวละคร/สร้างเอง */
body.bdOn #create.on{display:grid!important;width:auto!important;max-width:1320px!important;margin:0 auto!important;grid-template-columns:320px minmax(0,1fr) 300px!important;grid-template-rows:auto 1fr!important;column-gap:16px!important;align-items:start;padding:14px 18px}
body.bdOn #create .crhead{grid-column:1!important;grid-row:1 / 3!important;position:sticky;top:10px;margin:0}body.bdOn #create .crbox{grid-column:2!important;grid-row:1 / 3!important;margin:0;max-height:calc(100vh - 40px);overflow-y:auto}body.bdOn #create #crSide{grid-column:3!important;grid-row:1!important;margin:0}body.bdOn #create>.brow{grid-column:3!important;grid-row:2!important;position:static!important;display:flex!important;flex-direction:column;gap:8px;margin:10px 0 0!important;width:auto!important}#create>.brow button{width:100%;min-height:52px}
#create .lkSec{border-top:1px dashed #a8873e55;padding-top:10px;margin-top:10px}#create .lkSec:first-child{border-top:0;margin-top:0;padding-top:0}#create .lkSh{font-size:15px;font-weight:700;color:#ffe08a;margin-bottom:6px}
#create .lksw{width:34px!important;height:34px!important}
#crSide .crNm{font-size:22px;margin:4px 0}#crSide .crSws{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0}#crSide .crSw{display:flex;align-items:center;gap:6px;font-size:12.5px}#crSide .crSw i{width:18px;height:18px;border-radius:50%;border:1px solid #ffffff44;flex:none}#crSide .crSt{margin:8px 0 4px;font-size:13px}
}`;document.head.appendChild(st);
window._b134={tick,side,crSide};
})()}catch(e){console.error('block134',e)}
SL.impl.lkBody=lkBody;lkBody=function(){return globalThis.lkBody.apply(this,arguments)};SL.impl.crDraw=crDraw;crDraw=function(){return globalThis.crDraw.apply(this,arguments)};})();

// ---- ท่อน mwx145 (เดิมอยู่ app.js บรรทัด 43228) · ห่อ: mwYear, mwAs, mwJobReq, wpWait ----
(function(){const SL=globalThis.__wSlots['mwx145'];let mwYear=SL.base.mwYear;let mwAs=SL.base.mwAs;let mwJobReq=SL.base.mwJobReq;let wpWait=SL.base.wpWait;
try{(()=>{
const fixId=()=>{try{const M=S&&S.mw;if(M&&!M.sky&&!M.fog&&(M.native||M.par||(S.rift&&S.rift.how==='soul'))&&(M.id||0)<2){M.id=2;M.idP=0}}catch(e){}};
{const _y=mwYear;mwYear=function(){fixId();return _y.apply(this,arguments)}}
setInterval(fixId,3000);
const idAsk=()=>{try{const M=S&&S.mw;if(!M||(M.id||0)>0||M.idP||choice._cur)return false;const e=MW_R.find(x=>x.id==='id1');if(e){closeM();setTimeout(()=>e.go(M),120);return true}}catch(e){}return false};
{const _a=mwAs;mwAs=function(k){fixId();const M=S&&S.mw;if(M&&!M.sky&&!M.fog&&(M.id||0)<1&&['cash','car','ins','mort'].includes(k)&&!M.idP){if(idAsk())return}if(M&&!M.sky&&!M.fog&&M.idP&&(M.id||0)<1&&['cash','car','ins','mort'].includes(k))return toast(`🪪 กำลังรอบัตรประชาชน อีกราว ${Math.max(1,M.idP-M.y)} ปี`);return _a.apply(this,arguments)}}
{const _j=mwJobReq;mwJobReq=function(J,M){fixId();const w=_j.apply(this,arguments);if(w&&/บัตรประชาชน|เอกสาร/.test(w)&&M&&!M.idP)return w+' · ยื่นเรื่องได้ที่ 💰 ทรัพย์สิน';return w}}
{const _w=wpWait;wpWait=function(fn){if(S&&(S.mw||S.ch==='soul')){try{if(S.wp)S.wp.busy=0}catch(e){}return}return _w.apply(this,arguments)}}
})()}catch(e){console.error('block142',e)}
SL.impl.mwYear=mwYear;mwYear=function(){return globalThis.mwYear.apply(this,arguments)};SL.impl.mwAs=mwAs;mwAs=function(){return globalThis.mwAs.apply(this,arguments)};SL.impl.mwJobReq=mwJobReq;mwJobReq=function(){return globalThis.mwJobReq.apply(this,arguments)};SL.impl.wpWait=wpWait;wpWait=function(){return globalThis.wpWait.apply(this,arguments)};})();

// ---- ท่อน mwx146 (เดิมอยู่ app.js บรรทัด 43614) · ห่อ: modal ----
(function(){const SL=globalThis.__wSlots['mwx146'];let modal=SL.base.modal;
try{(()=>{
const $$=id=>document.getElementById(id);const B=document.body;
const UI=()=>B.classList.contains('mUI'),TRAY=()=>UI()&&!B.classList.contains('mF');
const css=document.createElement('style');css.textContent=`
/* ---- โซน 1 ---- */
body.mUI:not(.mF) #game .ctrl .onrow{-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent);padding-right:18px!important}
body.mUI:not(.mF) .onrow>#pendBar{order:1;display:flex;align-items:center;margin:0!important;padding:0 13px!important;min-height:34px;border-radius:999px!important;font-size:12.5px!important;font-weight:800;white-space:nowrap;max-width:none;cursor:pointer}
body.mUI:not(.mF) .onrow>#hwCard{order:2;position:static!important;transform:none!important;left:auto!important;bottom:auto!important;width:auto!important;max-width:none;min-height:34px;padding:0 12px 0 6px!important;gap:6px!important;border-radius:999px!important;box-shadow:0 0 12px #ffcf4d66!important;animation:none!important;position:relative!important;overflow:hidden}
body.mUI:not(.mF) .onrow>#hwCard .hwI{font-size:17px!important;animation:none!important}
body.mUI:not(.mF) .onrow>#hwCard small,body.mUI:not(.mF) .onrow>#hwCard>:not(.hwI):not(.hwT){display:none!important}
body.mUI:not(.mF) .onrow>#hwCard .hwT{white-space:nowrap}body.mUI:not(.mF) .onrow>#hwCard .hwT b{font-size:12.5px!important}
body.mUI:not(.mF) .onrow>#hwCard .hwBar{display:block!important;position:absolute;left:0;right:0;bottom:0;height:3px!important;margin:0!important}
body.mUI:not(.mF) .onrow>:is(#ascPill,#brkPill){order:3}body.mUI:not(.mF) .onrow>#rgFFp{order:4}
body.mUI:not(.mF) .onrow>.mHero{border:2px solid #ffd86a!important;background:linear-gradient(180deg,#ffe9a8,#e8b54a 60%,#c98d22)!important;color:#2a1a04!important;box-shadow:0 3px 0 #7a5512,0 0 14px #e8b54a77!important;position:relative;overflow:hidden}
body.mUI:not(.mF) .onrow>.mHero:after{content:'';position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,#fff8,transparent);animation:mShine 4s ease-in-out infinite;pointer-events:none}
@keyframes mShine{0%,70%{left:-60%}100%{left:130%}}
body.mUI #game>#mwHud{margin:5px 0 0!important}body.mUI.mLand #game.on>#mwHud{grid-row:2}
/* ---- โซน 2 ---- */
.mQh{visibility:hidden!important}
.mFly{position:fixed;z-index:2147483000;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;background:#2a1c05;border:2px solid #e8b54a;box-shadow:0 0 16px #ffcf4d;pointer-events:none;transition:transform .55s cubic-bezier(.5,-.2,.6,1),opacity .55s}
#mBell.bmp{animation:mBp .45s cubic-bezier(.3,1.7,.5,1)}
.mHist{margin-top:4px}.mHist h4{margin:6px 0 6px;font-size:12.5px;opacity:.75}
.mHist .hi{display:flex;gap:9px;align-items:flex-start;padding:8px 10px;border-radius:12px;background:#ffffff0a;margin-bottom:6px;font-size:12.5px;line-height:1.45}
.mHist .hi i{font-style:normal;font-size:17px;flex:none}.mHist .hi time{margin-left:auto;flex:none;font-size:10.5px;opacity:.55}
/* ---- โซน 3 ---- */
body.mUI #modal .chtop.mTb{display:flex!important;flex-wrap:nowrap!important;align-items:center;gap:6px;margin:0 0 10px!important}
body.mUI #modal .chtop.mTb>.mGrp{flex:0 0 auto!important;display:flex!important;gap:6px!important;overflow:visible!important}
body.mUI #modal .chtop.mTb>:is(span,div,small,b):not(.mGrp){flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11.5px}
body.mUI #modal .chtop.mTb>:is(span,div,small,b).mOpen{white-space:normal}
body.mUI #modal .chtop.mTb>:is(span,div,small,b):empty{flex:1 1 0}
body.mUI #modal .chtop.mTb :is(button,a).mTbB,body.mUI #modal .chtop.mTb>.mGear{flex:0 0 auto;display:inline-flex;align-items:center;gap:3px;white-space:nowrap;min-height:32px;padding:0 10px!important;border-radius:999px!important;border:1px solid #ffffff26!important;background:#ffffff0d!important;text-decoration:none!important;font-size:12px!important;line-height:1;color:inherit}
body.mUI #modal .chtop.mTb .mLb{display:none}
body.mUI #modal .chtop.mTb .mMin .mLb{display:inline}body.mUI #modal .chtop.mTb>.mMin{margin-left:auto}
body.mUI #modal .chtop.mTb .mGear.on{background:#e8b54a33!important;border-color:#e8b54a!important}
body.mUI #modal .chfoot.mSetH{display:none!important}
body.mUI #modal .chfoot.mSetS{margin:0 0 12px!important;padding:10px;border-radius:14px;background:#0003;border:1px dashed #ffffff26;animation:mIn .25s both}
body.mUI #modal[data-k="choice"] .opt{animation:mIn .32s cubic-bezier(.2,.9,.3,1.12) both;animation-delay:calc(var(--d,0)*45ms)}
.mPick{position:fixed;z-index:2147482500;pointer-events:none;margin:0;transition:transform .32s cubic-bezier(.2,1.4,.4,1),opacity .32s ease-out;box-shadow:0 0 0 2px #ffd86a,0 0 26px #ffcf4d}
/* ---- คำแนะนำ / ป้ายด้านล่าง ไม่ทับแถบล่าง ---- */
@media (max-width:1099px){body.mUI #tipCard{bottom:calc(var(--islB,118px) + 6px)!important}body.mUI #updBar,body.mUI #modeTour{bottom:calc(var(--islB,118px) + 6px)!important}}
body.mUI #game>#hintBar.mNo{display:none!important}
body.mUI.hs-isl #game>#hintBar{visibility:hidden}
`;document.head.appendChild(css);

// ---------- โซน 1 ----------
function tray(){try{{const h=$$('mwHud'),tp=document.querySelector('#game>.box.top');if(h&&tp&&UI()&&h.parentNode&&h.parentNode.classList&&h.parentNode.classList.contains('ctrl'))tp.insertAdjacentElement('afterend',h)}const r=document.querySelector('#game .ctrl .onrow'),ctrl=document.querySelector('#game .ctrl');if(!r||!ctrl)return;const want=TRAY();
 for(const id of ['pendBar','hwCard']){const n=$$(id);if(!n)continue;if(want&&n.parentNode!==r){r.insertBefore(n,r.firstChild)}else if(!want&&n.parentNode===r){if(id==='pendBar')ctrl.parentNode.insertBefore(n,ctrl);else document.body.appendChild(n)}}
 const vis=[...r.children].filter(c=>getComputedStyle(c).display!=='none'&&!/^(ctlTog|onPill)$/.test(c.id)&&(c.textContent||'').trim()).sort((a,b)=>(+getComputedStyle(a).order||0)-(+getComputedStyle(b).order||0));
 [...r.children].forEach(c=>c.classList.toggle('mHero',want&&c===vis[0]));r.classList.toggle('mE',want&&!vis.length)}catch(e){}}

// ---------- โซน 2 ----------
const TOP=['annBar','paBan','tagBar','nsPush','achPop'];const shown=new Map();const hist=[];let unread=0;
const isVis=e=>{if(!e||!e.isConnected)return false;const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden'&&!e.classList.contains('mQh')||+s.opacity<.1)return false;const r=e.getBoundingClientRect();return r.bottom>4&&r.top<innerHeight&&r.width>40};
function icOf(t){const m=(t||'').match(/\p{Extended_Pictographic}/u);return m?m[0]:'🔔'}
function fly(rect,ic){try{const bl=$$('mBell');if(!bl||!bl.offsetWidth||B.classList.contains('mRM'))return;const b=bl.getBoundingClientRect();const g=document.createElement('div');g.className='mFly';g.textContent=ic;const x=rect.left+rect.width/2,y=rect.top+rect.height/2;g.style.left=x+'px';g.style.top=y+'px';document.body.appendChild(g);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{g.style.transform=`translate(${b.left+b.width/2-x}px,${b.top+b.height/2-y}px) scale(.45)`;g.style.opacity='.2'}));setTimeout(()=>{g.remove();bl.classList.remove('bmp');void bl.offsetWidth;bl.classList.add('bmp')},580)}catch(e){}}
function tops(){try{if(!UI())return;let active=null;
 for(const id of TOP){const e=$$(id);const v=isVis(e);const rec=shown.get(id);
  if(v){const t=(e.innerText||'').replace(/\s+/g,' ').trim();if(!rec||rec.t!==t){shown.set(id,{t,r:e.getBoundingClientRect()});if(t&&t.length>3){hist.unshift({ic:icOf(t),t:t.slice(0,140),at:new Date()});hist.length=Math.min(hist.length,15);unread++}}else rec.r=e.getBoundingClientRect();
   if(active&&!e.classList.contains('mQh')&&id!=='annBar')e.classList.add('mQh');else if(!active){e.classList.remove('mQh');active=e}}
  else{if(e)e.classList.remove('mQh');if(rec){shown.delete(id);if(rec.t&&id!=='annBar')fly(rec.r,icOf(rec.t))}}}
 window._mUnread=unread}catch(e){}}
{const _m=modal;modal=function(html,k){const r=_m.apply(this,arguments);try{if(k==='mbell'&&$$('modal').dataset.k==='mbell'&&!$$('modal').querySelector('.mHist')){unread=0;window._mUnread=0;const m=$$('modal');const h=hist.length?`<div class="mHist"><h4>🕘 ล่าสุด</h4>${hist.map(x=>`<div class="hi"><i>${x.ic}</i><span>${esc(x.t)}</span><time>${String(x.at.getHours()).padStart(2,'0')}:${String(x.at.getMinutes()).padStart(2,'0')}</time></div>`).join('')}</div>`:'';const emp=m.querySelector('.mEmpty');if(h){if(emp)emp.remove();const btn=m.querySelector('.gbtn');if(btn)btn.insertAdjacentHTML('beforebegin',h);else m.insertAdjacentHTML('beforeend',h)}}
 if(k==='choice')setTimeout(chTb,0)}catch(e){}return r}}

// ---------- โซน 3 ----------
function chTb(){try{if(!UI())return;const m=$$('modal');if(!m||m.dataset.k!=='choice')return;const top=m.querySelector('.chtop');if(!top)return;top.classList.add('mTb');
 [...top.querySelectorAll('button,a')].forEach(b=>{if(b.dataset.mt||b.classList.contains('mGear'))return;b.dataset.mt=1;b.classList.add('mTbB');const t=b.textContent.trim();const mn=/minChoice/.test(b.getAttribute('onclick')||'');const mm=t.match(/^(\p{Extended_Pictographic}\uFE0F?|[▾▴⬇⬆]+)\s*(.+)$/u);if(mm){b.title=t;b.innerHTML=`<span>${mm[1]}</span><span class="mLb">${mn?'ย่อ':esc(mm[2])}</span>`;if(mn)b.classList.add('mMin')}});
 [...top.children].forEach(c=>{if(c.dataset.mt)return;c.dataset.mt=1;if(c.querySelector('button,a'))c.classList.add('mGrp');else c.addEventListener('click',()=>c.classList.toggle('mOpen'))});
 const f=m.querySelector('.chfoot');if(f&&!top.querySelector('.mGear')){f.classList.add('mSetH');const g=document.createElement('button');g.type='button';g.className='mGear';g.title='ตั้งค่าการเลือก';g.textContent='⚙️';g.onclick=e=>{e.stopPropagation();const on=f.classList.contains('mSetH');f.classList.toggle('mSetH',!on);f.classList.toggle('mSetS',on);g.classList.toggle('on',on);if(on)top.insertAdjacentElement('afterend',f)};const mn=[...top.children].find(c=>c.classList.contains('mMin'));top.insertBefore(g,mn||null)}
 [...m.querySelectorAll('.opt')].forEach((o,i)=>{if(!o.style.getPropertyValue('--d'))o.style.setProperty('--d',i)})}catch(e){}}
document.addEventListener('click',e=>{try{if(!UI()||B.classList.contains('mRM'))return;const o=e.target.closest&&e.target.closest('#modal[data-k="choice"] .opt');if(!o||o.disabled)return;const r=o.getBoundingClientRect();const g=o.cloneNode(true);g.classList.add('mPick');g.removeAttribute('id');Object.assign(g.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',animation:'none'});document.body.appendChild(g);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{g.style.transform='scale(1.06)';setTimeout(()=>{g.style.opacity='0';g.style.transform='scale(1.1) translateY(-8px)'},150)}));setTimeout(()=>g.remove(),520)}catch(x){}},true);

// ---------- คำแนะนำ ----------
function tips(){try{const h=$$('hintBar');if(!h)return;const t=h.textContent||'';const bad=(typeof auto!=='undefined'&&auto&&/ออโต้|อัตโนมัติ/.test(t)&&/เปิด/.test(t))||!!$$('tipCard');h.classList.toggle('mNo',bad)}catch(e){}}

setInterval(()=>{tray();tops();chTb();tips()},300);
})()}catch(e){console.error('block151',e)}
SL.impl.modal=modal;modal=function(){return globalThis.modal.apply(this,arguments)};})();

// ---- ท่อน mwx147 (เดิมอยู่ app.js บรรทัด 44040) · ห่อ: render ----
(function(){const SL=globalThis.__wSlots['mwx147'];let render=SL.base.render;
try{(()=>{
const K=['sys','ai','shadow','pet'];
const N={sys:'🟦 ระบบ',ai:'🤖 AI คู่หู',shadow:'👤 เงา',pet:'🐾 สัตว์วิญญาณ'};
function link(){try{if(!S||!S.mw||!mwOn())return;const st=S.mw.stash;if(!st)return;const has=K.filter(k=>st[k]);if(!has.length)return;
 if(S._mwStash!==st){S._mwStash=st}
 if(!S._mwStN){S._mwStN=1;setTimeout(()=>{try{log(`<span class="px">[ระบบ]</span> 📴 ในยุคปัจจุบัน ${has.map(k=>N[k]).join(' · ')} จากโลกเดิมเงียบลงชั่วคราว — <b>ไม่ได้หาย</b> จะกลับมาเองเมื่อคุณข้ามออกจากยุคปัจจุบัน`,'sys')}catch(e){}},600)}}catch(e){}}
function back(){try{if(!S||!S._mwStash)return;if(S.mw&&(typeof mwOn!=='function'||mwOn()))return;const st=S._mwStash,got=[];
 K.forEach(k=>{if(st[k]&&!S[k]){S[k]=st[k];got.push(N[k])}});delete S._mwStash;S._mwStN=0;
 if(got.length){setTimeout(()=>{try{log(`<span class="px">[ระบบ]</span> 🔁 ${got.join(' · ')} กลับมาทำงานอีกครั้งหลังออกจากยุคปัจจุบัน`,'myth',true);render()}catch(e){}},500)}}catch(e){console.error('mwStashBack',e)}}
{const _r=render;render=function(){link();back();return _r.apply(this,arguments)}}
setInterval(()=>{link();back()},1500);
})()}catch(e){console.error('block159',e)}
SL.impl.render=render;render=function(){return globalThis.render.apply(this,arguments)};})();

// ---- ท่อน mwx148 (เดิมอยู่ app.js บรรทัด 44511) · ห่อ: lifeDetail, lvDraw ----
(function(){const SL=globalThis.__wSlots['mwx148'];let lifeDetail=SL.base.lifeDetail;let lvDraw=SL.base.lvDraw;
try{(()=>{
const T=x=>String(x==null?'':x).slice(0,40);
// ฝั่งส่ง: แนบค่าประจำโลก (wg) ไปกับชีวิต
{const _ld=lifeDetail;lifeDetail=function(){const d=_ld.apply(this,arguments);try{if(!d||!S)return d;const g=[];const id=window._widNow?_widNow():'w0';
 if(S.mw&&window._mxOf&&!S.mw.sky){const mx=_mxOf(S.mw);if(mx.r)g.push(['🏅','แรงก์/สถานะ',T(mx.r)]);(mx.g||[]).slice(0,6).forEach(c=>g.push([c[0],T(c[1]),T(c[2])]));if(mx.ar)g.push([mx.ar[0],'ตัวตน',T(mx.ar[1])])}
 else if(S.mw&&S.mw.sky){const K=S.mw.sky;try{g.push(['🌠','ขั้น',T(realmLabel().base)])}catch(e){}if(K.gp!=null)g.push(['🧬','แต้มยีน',fmt(K.gp|0)]);if(K.av)g.push(['👥','ร่างแยก',T(K.av.n||K.av.lv||'มี')])}
 else if(S.ch==='soul'&&S.sv){g.push(['⭕','ระดับจิต',S.sv.lv|0]);try{g.push(['🔮','ดวงจิต',T((S.sv.sp||[]).map(s=>spNow(s).n).join(' · ')||'-')])}catch(e){}g.push(['💍','วงแหวน',(S.sv.rings||[]).length+' วง'])}
 else if(S.rg){g.push(['🔁','รอบย้อนกาล',(S.rg.loop|0)+' รอบ']);if(S.flags&&S.flags.rgFree)g.push(['🕊️','หลุดพ้นวงวน','สำเร็จ'])}
 else if(S.ch==='hell'&&S.hell){g.push(['🔥','ชั้นขุมนรก',S.hell.lv|0]);if(S.hell.cs!=null)g.push(['⛓️','ทัณฑ์ที่ผ่าน',S.hell.cs|0])}
 if(g.length)d.wg=g.slice(0,9)}catch(e){}return d}}
// ฝั่งดู: วาดตารางค่าประจำโลก (ชีวิตเก่าที่ไม่มี wg ใช้ข้อมูลเท่าที่มี)
function wgOf(d){if(Array.isArray(d.wg)&&d.wg.length)return d.wg;const g=[];
 if(d.sv){g.push(['⭕','ระดับจิต',d.sv.lv|0]);if(d.sv.sp&&d.sv.sp.length)g.push(['🔮','ดวงจิต',d.sv.sp.join(' · ')]);if(d.sv.rg)g.push(['💍','วงแหวน',d.sv.rg.length+' วง'])}
 else if(d.rg){g.push(['🔁','รอบย้อนกาล',(d.rg.loop|0)+' รอบ']);if(d.rg.free)g.push(['🕊️','หลุดพ้นวงวน','สำเร็จ'])}
 else if(d.hlg){g.push(['🔥','บันทึกขุมนรก',d.hlg.length+' เรื่อง']);if(d.hcs!=null)g.push(['⛓️','ทัณฑ์ที่ผ่าน',d.hcs|0])}
 else if(d.wk==='c'&&d.r)g.push(['🏅','แรงก์/สถานะ',d.r]);return g}
const st=document.createElement('style');st.textContent=`.lvWG{margin:8px 0 6px;padding:8px;border-radius:12px;background:linear-gradient(135deg,#ffffff10,#ffffff04);border:1px solid #e8b84a55}.lvWG .lvWGh{margin:0 0 6px;font-size:13px;font-weight:800;color:#ffe08a}.lvWG .specgrid{margin:0}`;document.head.appendChild(st);
{const _d=lvDraw;lvDraw=function(tab){const r=_d.apply(this,arguments);try{if(tab!=='sum')return r;const c=LVC[LV.lid],m=$('modal');if(!c||!m||m.dataset.k!=='lifeview'||m.querySelector('.lvWG'))return r;const d=c.j.d,g=wgOf(d);if(!g.length)return r;
 const w=m.querySelector('.lvW > span:last-child'),grid=m.querySelector('.lvB .specgrid');if(!grid)return r;
 grid.insertAdjacentHTML('beforebegin',`<div class="lvWG"><div class="lvWGh">${w?esc(w.textContent.trim()):'🌍'} · ค่าประจำโลก</div><div class="specgrid">${g.map(x=>`<div>${esc(String(x[0]))} ${esc(String(x[1]))} <b>${esc(String(x[2]))}</b></div>`).join('')}</div></div>`);
 // ยุคปัจจุบัน/ทะลุฟ้า/ดวงจิต: ซ่อนช่องแบบยุทธภพที่ไม่มีความหมาย (ชนะศึกเป็น 0)
 grid.querySelectorAll('div').forEach(x=>{if(/ชนะศึก/.test(x.textContent)&&/\b0\b/.test(x.querySelector('b')?x.querySelector('b').textContent:''))x.remove()})}catch(e){console.error('lvWG',e)}return r}}
})()}catch(e){console.error('block166',e)}
SL.impl.lifeDetail=lifeDetail;lifeDetail=function(){return globalThis.lifeDetail.apply(this,arguments)};SL.impl.lvDraw=lvDraw;lvDraw=function(){return globalThis.lvDraw.apply(this,arguments)};})();

// ---- ท่อน mwx149 (เดิมอยู่ app.js บรรทัด 45302) · ห่อ: passYear ----
(function(){const SL=globalThis.__wSlots['mwx149'];let passYear=SL.base.passYear;
try{(function(){
const ecW=()=>{try{if(!S||!S.alive)return'';if(S.beastMode&&!S.beastMode.human)return'';const M=S.mw;if(M){if(M.sky||M.fog||M.kid)return'';if(M.wx&&M.wx.on&&M.wx.id==='zombie')return'z';return'mw'}if(S.ch==='short')return'';return ECO_W()}catch(e){return''}};
const ri=()=>{try{return Math.max(0,realmIdx())}catch(e){return 0}};
// หน่วยเงิน "ปีปกติ" ของโลกนั้น (ขั้นสูงขึ้น ชีวิตก็แพงขึ้น)
function ecU(w){try{if(w==='mw'||w==='z'){const M=S.mw;let y=60000;try{y=mwToB(mwYearCost(M).yr,M)}catch(e){}return Math.max(30000,y||0)}return ({m:600,x:1500,g:1e5})[w]*(1+ri()*(w==='g'?.5:1))}catch(e){return 600}}
function mt(v,w){v=Math.round(Math.max(0,v||0));return (w==='mw'||w==='z')?fmt(v)+' บาท':fmtM(v)+' '+curW()}
const EC=()=>S.ec||(S.ec={rf1:1,inc:0,n:0,upk:0,life:0,debt:0,evY:-9,biz:0,inv:null,loan:null,qx:null,qN:0,qOk:0,qF:0});
const anc=w=>Math.max(ecU(w),EC().inc||0);
const FL={
 m:{fire:'ไฟไหม้โกดังสินค้าของคุณกลางดึก',gov:'ขุนนางประจำแคว้นส่งคนมาเรียกเก็บส่วยย้อนหลัง',scam:'พ่อค้าแปลกหน้าชวนลงขันค้าเกลือเถื่อนข้ามแดน บอกว่าได้คืนสองเท่าในไม่กี่ปี',kin:'ญาติห่างๆ ที่ไม่เคยเห็นหน้า',crash:'สงครามชายแดนปะทุ เส้นทางการค้าทั่วแผ่นดินถูกปิด',up:'ค่าคนรับใช้ ยามเฝ้าคลัง และส่วยหลวง',life:'ค่าข้าวของ ค่าเลี้ยงดูคนในบ้าน',book:'คัมภีร์ลับจากสำนักที่ล่มสลาย',pill:'โอสถยืดชะตาจากหมอเทวดา',biz:'โรงเตี๊ยมและกองคาราวานของตัวเอง',don:'สร้างสะพานและโรงทานให้ชาวบ้าน',mas:'จ้างยอดฝีมือเกษียณมาชี้แนะส่วนตัว'},
 x:{fire:'ค่ายกลคุ้มกันคลังหินวิญญาณแตกร้าว ปราณรั่วไหลออกไป',gov:'นิกายใหญ่ประจำแคว้นส่งทูตมาเรียกเก็บบรรณาการ',scam:'ผู้ฝึกตนพเนจรชวนลงขันเปิดเหมืองเส้นปราณใต้ภูเขาร้าง',kin:'ศิษย์ร่วมสำนักเก่า',crash:'เส้นปราณใต้ดินทั้งแคว้นแห้งเหือด ราคาหินวิญญาณผันผวนหนัก',up:'ค่าบำรุงค่ายกล ค่าจ้างศิษย์เฝ้าถ้ำ และบรรณาการนิกาย',life:'ค่าโอสถประจำวันและค่าเช่าถ้ำปราณ',book:'คัมภีร์บำเพ็ญจากซากถ้ำเซียน',pill:'โอสถยืดอายุขัยจากหอโอสถ',biz:'หอโอสถและเหมืองหินวิญญาณของตัวเอง',don:'ซ่อมค่ายกลพิทักษ์เมืองมนุษย์',mas:'เชิญผู้อาวุโสขั้นสูงมาชี้แนะเต๋า'},
 g:{fire:'อัคคีสวรรค์ลามเข้าคลังสมบัติวัง',gov:'เทวสภาเรียกเก็บส่วยสวรรค์ประจำยุค',scam:'เทพพ่อค้าชวนลงทุนจุดประกายดาวดวงใหม่',kin:'เทพบริวารเก่าแก่',crash:'สงครามสวรรค์ปะทุ หยกเซียนในตลาดไร้ค่าลงทุกวัน',up:'ค่าบำรุงวังสวรรค์ ทหารเทพ และส่วยเทวสภา',life:'ค่าบำรุงวังและบริวาร',book:'ศิลาจารึกเต๋าบรรพกาล',pill:'ผลท้อเซียนหมื่นปี',biz:'อาณาจักรการค้าข้ามดวงดาว',don:'ตอบคำอธิษฐานของแดนล่างทั้งแคว้น',mas:'ขอให้เทพโบราณชี้แนะ'},
 mw:{fire:'ไฟไหม้ร้าน/ห้องเก็บของของคุณ',gov:'สรรพากรเรียกตรวจภาษีย้อนหลัง',scam:'เพื่อนเก่าชวนลงทุนเหรียญคริปโตตัวใหม่ การันตีกำไรสองเท่า',kin:'ญาติที่ไม่ค่อยได้คุยกัน',crash:'ตลาดหุ้นร่วงหนักทั้งโลก',up:'ภาษีทรัพย์สิน ค่าส่วนกลาง ค่าคนดูแล',life:'ค่าใช้จ่ายในบ้าน',book:'คอร์สปั้นทักษะระดับโลก',pill:'โปรแกรมดูแลสุขภาพระดับพรีเมียม',biz:'แฟรนไชส์ร้านค้าของตัวเอง',don:'บริจาคสร้างโรงเรียนในชนบท',mas:'จ้างโค้ชต่อสู้มืออาชีพส่วนตัว'}};
const fl=(w,k)=>(FL[w]||FL.m)[k];
const sc=t=>{try{setScene(t)}catch(e){}};
const pW=d=>Math.max(.05,Math.min(.95,(1.3-d)/.6))*(S.hp>S.maxHp*.5?1:.45);
function addLife(v){if(S.mw&&S.mw.end){S.mw.end+=v;return}S.lifespan=(S.lifespan||0)+v}
const can=()=>S&&S.alive&&!choice._cur&&!modalOpen&&!(window._inQmFF);
function addMoney(v){S.money=Math.max(0,Math.round((+S.money||0)+v))}
// ---------- ค่าดูแลทรัพย์/ค่าครองชีพ ----------
const N0=n=>{try{return fmt(n)}catch(e){return n}};
window._ecT=(a,b)=>ecTick(a,b);// 💰 ชดเชยบั๊กค่าบำรุงแดนเทพ (v ก่อน 24 พ.ย. 2026): ชีวิตที่อยู่แดนเทพตอนเปิดเซฟ ได้คืน 70% ของค่าครองชีพ+ค่าดูแลทรัพย์ที่เคยโดนหัก ครั้งเดียว
// ชีวิตอื่นแค่ติดธงว่าตรวจแล้ว (ไม่คืน) · ชีวิตใหม่หลังแก้มีธงตั้งแต่สร้าง
setInterval(()=>{try{if(!S||!S.alive||!S.ec||S.ec.rf1)return;const E=S.ec;E.rf1=1;if(!S.xt)return;const lost=(+E.upk||0)+(+E.life||0),g=Math.round(lost*.7);if(g<=0)return;
 E.debt=0;addMoney(g);log(`💰 <b>ชดเชยบั๊กค่าบำรุงแดนเทพ</b> — ก่อนหน้านี้ระบบหักค่าใช้จ่ายเกินจริงในแดนเทพ คืนให้ ${mt(g,'g')} (70% ของที่เคยโดนหักทั้งหมด) และล้างหนี้ค้างแล้ว ขออภัยครับ`,'myth',true);
 try{island({big:1,pri:1,ic:'💰',h:'ชดเชยบั๊กค่าบำรุงแดนเทพ',t:`ได้คืน ${mt(g,'g')} · ล้างหนี้ค้าง`,kind:'gold',ms:7000})}catch(e){}try{render();saveGame()}catch(e){}}catch(e){console.error('ec refund',e)}},2500);
function ecTick(st,m0){const w=ecW();if(!w)return;const E=EC(),U=ecU(w),cw=w==='z'?'mw':w;if(E.w!==cw){if(E.w){E.inc=0;E.n=0;E.debt=0;E.biz=0;E.inv=null;E.loan=null;E.qx=null;E.qnx=null}E.w=cw;return}
 if(S.age>=14){let d=((+S.money||0)-m0)/st;if(d>0)E.earn=(E.earn||0)+d*st;const cap=2.5*Math.max(U,E.inc||0);if(d>cap)d=cap;if(d>0)E.inc=E.n?E.inc*.85+d*.15:d;else E.inc*=Math.pow(.96,Math.min(st,5));E.n++}
 if(w==='z'||S.age<16)return;
 const A=anc(w);let sum=0;
 // หนี้ค้าง → ใช้เงินชำระก่อน
 if(E.debt>0){const p=Math.min(E.debt,+S.money||0);addMoney(-p);E.debt-=p}
 // ค่าครองชีพ (โลกปัจจุบันมีระบบนี้อยู่แล้ว ไม่คิดซ้ำ) — ตามรายได้เฉลี่ย + ครอบครัว
 if(w!=='mw'){const kids=Math.min(10,S.kids||0);let life=Math.round((E.inc||0)*.12*(1+kids*.06+(S.spouse?.15:0))*st);
  // แดนเทพ/โลกที่ปีหนึ่งข้ามหลายพันปี: เดิมคิด 12% ของรายได้เฉลี่ย × ทุกปีที่ข้าม ทั้งที่ช่วงนั้นอาจไม่ได้เงินเลย → หนี้พอกจนล้มละลายทุกรอบ
  // ตอนนี้: ค่าครองชีพไม่เกิน 35% ของเงินที่ได้จริงในช่วงนั้น + ค่าพื้นฐานไม่เกิน 10 ปี (โลกปีละ 1 ปีเหมือนเดิม)
  {const gain=Math.max(0,(+S.money||0)-m0+sum),base=Math.round(U*.12*Math.min(st,10));if(st>1)life=Math.min(life,Math.round(gain*.35)+base)}
  if((+S.money||0)>=life){addMoney(-life);E.life+=life;sum+=life;E.ysL=(E.ysL||0)+life}else{const sh=life-(+S.money||0);E.life+=S.money;sum+=S.money;E.ysL=(E.ysL||0)+(+S.money||0);S.money=0;E.debt+=sh;try{joy(-3)}catch(e){}}}
 // ค่าดูแลทรัพย์แบบขั้นบันได: เกิน 6 เท่าของรายได้ปกติเริ่มเสีย ยิ่งรวยยิ่งเสียหนัก
 const P=6*A*Math.max(1,Math.min(st,1000)),M=+S.money||0; /* เกณฑ์ = เงินได้ราว 6 รอบ (โลกที่รอบหนึ่งข้ามหลายปีคูณตามจำนวนปีต่อรอบ) */if(M>P){const rate=Math.min(.12,.03+.025*Math.log10(M/P)),c=Math.round((M-P)*(1-Math.pow(1-rate,Math.min(st,5))));if(c>0){addMoney(-c);E.upk+=c;sum+=c;E.ysU=(E.ysU||0)+c}} /* เดิมทบได้ถึง 200 ปีต่อครั้ง → แดนเทพข้ามทีละพันปี ถูกยึดเกือบหมดทุกรอบ */
 E.ys=(E.ys||0)+sum;if(!E.lg||S.age-E.lg>=5){if(E.ys>0&&E.lg)log(`🏦 ค่าใช้จ่าย ${N0(S.age-E.lg)} ปีที่ผ่านมา: −${mt(E.ys,w)}<br><span class="tag2">• ${fl(w,'life')} −${mt(E.ysL||0,w)} (ราว 12% ของรายได้ ครอบครัวใหญ่จ่ายมากขึ้น)${E.ysU?` · ${fl(w,'up')} −${mt(E.ysU,w)} (เก็บเงินเกิน ${mt(P,w)} ส่วนที่เกินโดนหัก · ฝากธนาคาร/ซื้อของใหญ่ไม่โดน)`:''}${E.debt>0?` · ⚠️ หนี้ค้าง ${mt(E.debt,w)}`:''}</span>`,'');E.lg=S.age;E.ys=0;E.ysL=0;E.ysU=0}
 // ล้มละลาย
 if(E.debt>3*A*Math.max(1,Math.min(st,10))){E.debt=0;let t='';try{const h=S.gear&&S.gear.house;if(h&&GEAR.house){const i=GEAR.house.findIndex(x=>x.id===h);if(i>0){S.gear.house=GEAR.house[i-1].id;t=` ต้องขายบ้านย้ายไปอยู่${GEAR.house[i-1].n}`}else if(i===0){delete S.gear.house;t=' ต้องขายบ้านไปเช่าห้องเล็กๆ อยู่'}}}catch(e){}
  S.fame=Math.round((S.fame||0)*.85);try{joy(-15)}catch(e){}log(`💸 <b>ล้มละลาย!</b> หนี้สินพอกพูนจนเจ้าหนี้มายึดทรัพย์${t} ชื่อเสียงตกต่ำ`,'bad',true)}
 // กิจการของตัวเอง
 if(E.biz>0){const g=Math.round(E.biz*(.6+Math.random()*.8)*st);addMoney(g)}
 // เงินลงทุน/เงินให้ยืมครบกำหนด
 if(E.inv&&S.age>=E.inv.y){const I=E.inv;E.inv=null;if(I.real){const g=Math.round(I.c*(1.6+Math.random()*.9));addMoney(g);log(`📈 การลงทุนที่เคยเสี่ยงไว้ออกดอกออกผล ได้คืน ${mt(g,w)}`,'good')}else log(`🕳️ ${I.who}หายตัวไปพร้อมเงิน ${mt(I.c,w)} ของคุณ — โดนต้มเข้าแล้ว`,'bad')}
 if(E.loan&&S.age>=E.loan.y){const L=E.loan;E.loan=null;if(Math.random()<.5){const g=Math.round(L.c*1.15);addMoney(g);log(`🤝 ${L.who}กลับมาคืนเงิน ${mt(g,w)} พร้อมของฝาก`,'good')}else log(`😶 ${L.who}เงียบหายไป เงินที่ให้ยืมไม่ได้คืน`,'')}}
// ---------- ยิ่งรวยยิ่งเจอเรื่อง ----------
function ecRisk(w,A){const M=+S.money||0,E=EC(),k=ch(M>30*A?['fire','gov','scam','kin','crash']:['fire','gov','scam','kin']);E.evY=S.age;const pc=f=>Math.round(M*f);
 if(k==='fire'){const lo=pc(.18+Math.random()*.15);sc('fight');choice('🔥 เคราะห์ร้ายมาเยือน',`${fl(w,'fire')}! ถ้าไม่ทำอะไรเลยอาจเสียราว ${mt(lo,w)}`,[
  {ai:S.hp>S.maxHp*.6?.5:.1,t:'🏃 บุกเข้าไปกู้เอง',s:'เสียน้อยลงมาก แต่บาดเจ็บ',f(){const l=Math.round(lo*.35);addMoney(-l);S.hp-=Math.round(S.maxHp*(.15+Math.random()*.2));log(`🔥 คุณฝ่าเข้าไปกู้ทรัพย์สินออกมาได้เกือบหมด เสียไป ${mt(l,w)} แต่บาดเจ็บไม่น้อย`,'')}},
  {ai:.6,t:'💰 จ้างคนช่วยเต็มที่',s:`จ่ายค่าจ้าง ${mt(pc(.06),w)} รักษาส่วนใหญ่ไว้ได้`,f(){const l=pc(.06)+Math.round(lo*.2);addMoney(-l);log(`🧯 จ้างคนมาช่วยกันจนควบคุมได้ รวมเสียไป ${mt(l,w)}`,'')}},
  {ai:.15,t:'😔 ปล่อยไปตามเวรตามกรรม',s:'ไม่เจ็บตัว แต่เสียหนัก',f(){addMoney(-lo);try{joy(-6)}catch(e){}log(`💸 สูญไป ${mt(lo,w)}`,'bad')}}]);return}
 if(k==='gov'){const fee=pc(.12+Math.random()*.08),br=pc(.05+Math.random()*.03),ep=total()*(1.05+Math.random()*.35);sc('hall');choice('📜 ถูกเรียกเก็บ',`${fl(w,'gov')} เรียกเงิน ${mt(fee,w)}`,[
  {ai:.45,t:'💰 จ่ายตามเรียก',s:'จบเรื่อง',f(){addMoney(-fee);log(`📜 จ่ายไป ${mt(fee,w)} เรื่องจบลงอย่างสงบ`,'')}},
  {ai:S.karma>20?.1:.3,t:'🤝 แอบติดสินบน',s:`จ่ายแค่ ${mt(br,w)} · กรรมลด · มีโอกาสถูกจับได้`,f(){addMoney(-br);S.karma-=6;if(Math.random()<.3){const x=pc(.25);addMoney(-x);S.fame=Math.round((S.fame||0)*.92);log(`🚨 สินบนถูกเปิดโปง! โดนปรับหนักอีก ${mt(x,w)} และเสียชื่อเสียง`,'bad')}else log(`🤝 ติดสินบนสำเร็จ จ่ายไปแค่ ${mt(br,w)}`,'')}},
  {ai:pW(ep/Math.max(1,total())),t:'⚔️ ไม่ยอมจ่าย',s:`ต้องสู้กับคนที่ส่งมา (แข็งแรงราว ${Math.round(ep/Math.max(1,total())*100)}% ของคุณ)`,f(){duel('ผู้ทวงส่วย',ep,v=>{if(v){S.fame+=fameR(12);log('⚔️ คุณขับไล่คนทวงส่วยไปได้ ผู้คนพูดถึงความกล้าของคุณ','good')}else{const x=pc(.3);addMoney(-x);log(`💸 แพ้ ถูกยึดทรัพย์ไป ${mt(x,w)}`,'bad')}})}}]);return}
 if(k==='scam'){const c=pc(.25),real=Math.random()<.35,sk=(S.int||0)/((S.int||0)+180*(1+ri())),see=Math.random()<sk,who=w==='mw'?'เพื่อนเก่า':w==='g'?'เทพพ่อค้า':w==='x'?'ผู้ฝึกตนพเนจร':'พ่อค้าแปลกหน้า';
  sc('hall');choice('💼 ข้อเสนอลงทุน',`${fl(w,'scam')} ขอเงินลงขัน ${mt(c,w)}<br><span class="tag2">${see?(real?'🧠 คุณตรวจดูอย่างละเอียด — ดูเหมือนจะเป็นของจริง':'🧠 คุณจับพิรุธได้ — เอกสารและคำพูดไม่ตรงกันหลายจุด'):'คุณดูไม่ออกว่าจริงหรือหลอก (ปัญญาสูงจะช่วยจับพิรุธ)'}</span>`,[
  {ai:see?(real?.85:.03):.25,t:'💰 ลงทุน',s:'ได้คืนเกือบสองเท่าหรือสูญทั้งหมด',f(){addMoney(-c);EC().inv={c,y:S.age+R(2,4),real,who};log(`💼 ลงเงิน ${mt(c,w)} กับ${who} รอดูผลอีกไม่กี่ปี`,'')}},
  {ai:see?(real?.15:.97):.6,t:'🙅 ไม่เสี่ยง',s:'',f(){log(`🙅 ปฏิเสธข้อเสนอของ${who}${see&&!real?' — ภายหลังได้ข่าวว่าเขาหลอกคนไปทั่ว':''}`,'')}}]);return}
 if(k==='kin'){const c=pc(.08+Math.random()*.07),who=fl(w,'kin');sc('home');choice('👨‍👩‍👧 มีคนมาขอยืมเงิน',`${who}ได้ข่าวว่าคุณมีฐานะ มาขอยืม ${mt(c,w)} บอกว่าเดือดร้อนจริงๆ`,[
  {ai:.4,t:'🤝 ให้ยืม',s:'อาจได้คืน อาจไม่ได้',f(){addMoney(-c);S.karma+=3;EC().loan={c,y:S.age+R(2,5),who};log(`🤝 ให้${who}ยืม ${mt(c,w)}`,'')}},
  {ai:.25,t:'🎁 ให้เปล่าเลย',s:'กรรมดี ชื่อเสียง ความสุข',f(){addMoney(-c);S.karma+=8;S.fame+=fameR(6);try{joy(4)}catch(e){}log(`🎁 ยกเงิน ${mt(c,w)} ให้${who}โดยไม่หวังคืน คนในย่านพูดถึงน้ำใจคุณ`,'good')}},
  {ai:.3,t:'🙅 ปฏิเสธ',s:'ความสุขลด · กรรมลดเล็กน้อย',f(){S.karma-=2;try{joy(-4)}catch(e){}log(`🙅 ปฏิเสธ${who} เขาเดินจากไปพร้อมคำพูดไม่น่าฟัง`,'')}}]);return}
 if(k==='crash'){sc('hall');choice('📉 วิกฤตใหญ่',`${fl(w,'crash')} ทรัพย์สินของคุณกำลังมูลค่าลดฮวบ`,[
  {t:'🏃 ขายทิ้งด่วน',s:'เสียแน่นอนราว 25%',f(){const l=pc(.25);addMoney(-l);E.biz=Math.round(E.biz*.7);log(`📉 ตัดขาดทุนไป ${mt(l,w)}`,'bad')}},
  {t:'🪨 ถือรอ',s:'ครึ่งต่อครึ่ง: ฟื้นได้กำไร หรือหายไปครึ่งหนึ่ง',f(){if(Math.random()<.5){const g=pc(.12);addMoney(g);log(`📈 อดทนถือไว้จนวิกฤตผ่านไป ได้กำไร ${mt(g,w)}`,'good')}else{const l=pc(.5);addMoney(-l);E.biz=Math.round(E.biz*.5);log(`📉 วิกฤตลากยาว ทรัพย์สินหายไปครึ่งหนึ่ง (${mt(l,w)})`,'bad',true)}}}]);return}}
// ---------- ของใหญ่ให้ทุ่ม ----------
function ecOpp(w){const M=+S.money||0,E=EC();E.evY=S.age;const L=[];const nonM=w!=='mw';
 L.push({ic:'📕',k:'book',f:.3,go(){if(nonM){const a=newArt(2);S.arts.push(a);return`ได้ ${artHtml(a)}`}const g=Math.max(10,Math.round((S.int||0)*.15));S.int+=g;return`ปัญญา +${fmt(g)}`},d:nonM?'วิชาระดับล้ำเลิศขึ้นไป 1 วิชา':'ปัญญา +15%'});
 L.push({ic:'💊',k:'pill',f:.35,go(){const g=nonM?R(4,9):R(2,5);addLife(g);return`อายุขัย +${g} ปี`},d:nonM?'อายุขัย +4~9 ปี':'อายุขัย +2~5 ปี'});
 L.push({ic:'🏯',k:'biz',f:.3,go(c){E.biz=(E.biz||0)+Math.round(c*.07);return`ได้รายได้เพิ่มปีละราว ${mt(c*.07,w)} (เสี่ยงเจอวิกฤต)`},d:'สร้างรายได้ประจำทุกปี'});
 L.push({ic:'🙏',k:'don',f:.2,go(){const k=R(10,20);S.karma+=k;S.fame+=fameR(15);return`กรรมดี +${k} · ชื่อเสียงเพิ่ม`},d:'กรรมดีและชื่อเสียง'});
 L.push({ic:'⚔️',k:'mas',f:.25,go(){const g=pctPow(.07);S.power+=g;return`พลังยุทธ์ +${fmt(g)}`},d:'พลังเพิ่มราว 7%'});
 const pk=L.sort(()=>Math.random()-.5).slice(0,2);sc('hall');
 choice('💎 โอกาสใช้เงินก้อนใหญ่',`ฐานะของคุณดึงดูดข้อเสนอพิเศษ (เงินตอนนี้ ${mt(M,w)})<br><span class="tag2">ทุ่มตอนนี้ดีกว่าปล่อยให้ค่าดูแลทรัพย์กินไปเรื่อยๆ</span>`,pk.map(o=>{const c=Math.round(M*o.f);return{ai:.5,t:`${o.ic} ${fl(w,o.k)}`,s:`${mt(c,w)} → ${o.d}`,f(){if((+S.money||0)<c){log('💸 เงินไม่พอแล้ว','');return}addMoney(-c);const r=o.go(c);log(`${o.ic} ทุ่ม ${mt(c,w)} ให้${fl(w,o.k)} — ${r}`,'epic')}}}).concat([{ai:.35,t:'🚶 เก็บเงินไว้ก่อน',s:'',f(){}}]))}
// ---------- 🧭 ภารกิจทางแยก ----------
const QW={
 m:{who:['ผู้ใหญ่บ้าน','พ่อค้าผ้าไหม','หญิงชราที่ตลาด','เจ้าสำนักเล็กๆ','ขุนนางท้องถิ่น'],beast:['เสือสมิงที่กินคนไปแล้วเจ็ดศพ','ฝูงหมาป่าตาแดง','งูยักษ์ในถ้ำหลังหมู่บ้าน'],gang:['ค่ายโจรภูเขาดำ','พรรคเงาโลหิต','กลุ่มอันธพาลท่าเรือ'],relic:['กระบี่ของปรมาจารย์ที่หายไปเมื่อร้อยปีก่อน','แผนที่สุสานจักรพรรดิ','ตำราแพทย์ของหมอเทวดา'],ill:'โรคระบาดในหมู่บ้านชายป่า',feud:['ตระกูลหลี่','ตระกูลจาง'],dirty:'ลอบสังหารพ่อค้าที่ขวางทางผู้ว่าจ้าง',pay:'จ้างนักล่าค่าหัว',wit:'วางแผนล่อเข้ากับดัก'},
 x:{who:['ผู้อาวุโสนิกาย','เจ้าเมืองมนุษย์','ศิษย์หญิงนิกายเล็ก','พ่อค้าหอโอสถ'],beast:['อสูรวิญญาณขั้นห้าที่ตื่นจากหลับใหล','ฝูงหมาป่าเงาจันทร์','งูหลามเก้าหัว'],gang:['ผู้ฝึกตนมารที่ดูดปราณชาวบ้าน','นิกายมารเลือดดำ','กลุ่มนักล่าสมบัติปล้นศิษย์'],relic:['แก่นสมบัติวิเศษของเซียนที่ดับสูญ','กุญแจมิติลับ','ศิลาเต๋าร้าว'],ill:'พิษปราณมารแพร่ในเมืองมนุษย์',feud:['ตระกูลเซียนสาย','ตระกูลเซียนหลิว'],dirty:'ชิงแก่นทองคำจากผู้ฝึกตนที่กำลังปิดด่าน',pay:'จ้างผู้ฝึกตนรับจ้าง',wit:'วางค่ายกลกักขัง'},
 g:{who:['เทพผู้ดูแลแดนล่าง','เทวสภา','เทพธิดาแห่งสายน้ำ'],beast:['อสูรจากห้วงลึก','มังกรคลั่งแห่งทะเลดารา','กิเลนดำ'],gang:['เทพนอกรีตกลุ่มหนึ่ง','กองทัพมารนอกฟ้า'],relic:['ชิ้นส่วนกระจกสวรรค์','เมล็ดพันธุ์ต้นไม้โลก','ตราประทับเทพบรรพกาล'],ill:'คำสาปเสื่อมเทพลามไปทั่ววังชั้นล่าง',feud:['วังเทพตะวัน','วังเทพจันทรา'],dirty:'ลอบทำลายเทวรูปของเทพคู่แข่ง',pay:'ว่าจ้างทหารเทพ',wit:'ใช้กลอุบายแห่งเต๋า'},
 mw:{who:['เจ้าของร้านหน้าปากซอย','นักข่าวสายสืบสวน','คุณป้าข้างห้อง','ตำรวจนอกเครื่องแบบ','ประธานชุมชน'],beast:['หมาจรฝูงใหญ่ดุร้ายที่กัดเด็ก','สิ่งประหลาดในท่อระบายน้ำ'],gang:['แก๊งทวงหนี้นอกระบบ','แก๊งคอลเซ็นเตอร์','มาเฟียคุมท่าเรือ'],relic:['ฮาร์ดดิสก์ที่เก็บหลักฐานทุจริต','พระเครื่องเก่าที่ถูกขโมย','กล่องจดหมายของคุณปู่ผู้ล่วงลับ'],ill:'อาหารเป็นพิษระบาดในชุมชน',feud:['บริษัทพัฒนาที่ดิน','ชาวชุมชนริมคลอง'],dirty:'ขโมยข้อมูลบริษัทคู่แข่ง',pay:'จ้างทนาย/บอดี้การ์ด',wit:'หาหลักฐานแฉผ่านโซเชียล'},
 z:{who:['หัวหน้าค่ายผู้รอดชีวิต','หมอในค่าย','เด็กหญิงที่พลัดหลง'],beast:['ฝูงซอมบี้กลายพันธุ์','ซอมบี้ตัวยักษ์ที่เฝ้าคลังเสบียง'],gang:['กลุ่มโจรปล้นเสบียง','ค่ายทหารเถื่อน'],relic:['วัคซีนต้นแบบในห้องแล็บ','แผนที่หลุมหลบภัย','วิทยุสื่อสารทางทหาร'],ill:'ไข้ประหลาดระบาดในค่าย',feud:['ค่ายเหนือ','ค่ายใต้'],dirty:'ขโมยเสบียงจากค่ายอื่น',pay:'แลกเสบียง',wit:'ล่อด้วยเสียงแล้วอ้อมไป'}};
QW.z.pay='แลกด้วยเสบียงที่มี';
const qw=w=>QW[w]||QW.m;
const QK=[ // k, จำนวนขั้น, ฝ่าย (1 ดี / -1 ชั่ว / 0)
 {k:'beast',of:1,al:1},{k:'gang',of:2,al:1},{k:'relic',of:3,al:0},{k:'ill',of:1,al:1,dl:1},{k:'feud',of:1,al:0},{k:'dirty',of:1,al:-1},{k:'rescue',of:2,al:1,dl:1}];
function qxMake(w,T,st,base){const W=qw(w),q=base?Object.assign({},base):{k:T.k,of:T.of,al:T.al,who:ch(W.who),tg:'',id:Math.random().toString(36).slice(2,7)};
 q.st=st||1;q.w=w;q.d=+(1+(q.st-1)*.18+Math.random()*.15).toFixed(2);q.dl=S.age+(T.dl?1:R(1,3));q.y0=S.age;
 if(!base){q.tg=T.k==='beast'?ch(W.beast):T.k==='gang'||T.k==='rescue'?ch(W.gang):T.k==='relic'?ch(W.relic):T.k==='ill'?W.ill:T.k==='feud'?W.feud.join(' กับ '):W.dirty}
 q.tw=Math.random()<.22?ch(T.al<0?['liar','trap']:['liar','trap','bonus']):'';
 const rw=nonMoney(w);q.rw=[ch(rw),ch(rw)].filter((x,i,a)=>a.indexOf(x)===i);return q}
function nonMoney(w){return w==='mw'||w==='z'?['pow','int','fame','life','joy']:['pow','art','fame','life','item','qi']}
const RWN={pow:'⚔️ พลัง',art:'📕 วิชา',fame:'⭐ ชื่อเสียง',life:'⏳ อายุขัย',item:'🎒 ของหายาก',qi:'🌀 ลมปราณ',int:'📜 ปัญญา',joy:'😊 ความสุข'};
function qxPay(q,mul){const g=q.st*q.d*(mul||1),out=[],w=q.w;
 for(const r of q.rw){try{
  if(r==='pow'){const v=pctPow(.035*g);S.power+=v;out.push(`พลังยุทธ์ +${fmt(v)}`)}
  else if(r==='art'){const a=newArt(Math.min(3,q.st));S.arts.push(a);out.push(`ได้ ${artHtml(a)}`)}
  else if(r==='fame'){if(S.mw&&w!=='z'){try{mwFx({fame:Math.round(1500*g+(S.mw.fame||0)*.04*g)})}catch(e){}out.push('ชื่อเสียงพุ่ง')}else{const v=fameR(Math.round(14*g));S.fame+=v;out.push(`ชื่อเสียง +${fmt(v)}`)}}
  else if(r==='life'){const v=Math.max(1,Math.round(R(1,3)*g));addLife(v);out.push(`อายุขัย +${v} ปี`)}
  else if(r==='item'){for(let i=0;i<q.st;i++)bagLoot(q.st);out.push('ได้ของหายากเข้ากระเป๋า')}
  else if(r==='qi'){const v=+((S.qi||0)*.04*g+R(1,3)).toFixed(1);S.qi+=v;out.push(`ลมปราณ +${typeof fmtG==="function"?fmtG(v):v}`)}
  else if(r==='int'){const v=Math.max(3,Math.round((S.int||0)*.05*g));S.int+=v;out.push(`ปัญญา +${fmt(v)}`)}
  else if(r==='joy'){joy(Math.round(6*g));out.push('ความสุขเพิ่ม')}}catch(e){}}
 if(w!=='z'&&w!=='mw'||Math.random()<.5){const m=Math.round(anc(w)*.4*g*(.7+Math.random()*.6));if(w!=='z'){addMoney(m);out.push(`+${mt(m,w)}`)}}
 if(q.al>0){S.karma+=3+q.st*2}else if(q.al<0){S.karma-=10+q.st*3}
 return out.join(' · ')}
function qxTitle(q){const W=qw(q.w);return q.k==='beast'?`ปราบ${q.tg}`:q.k==='gang'?`กวาดล้าง${q.tg}`:q.k==='relic'?`ตามหา${q.tg}`:q.k==='ill'?`หยุด${q.tg}`:q.k==='feud'?`ไกล่เกลี่ยข้อพิพาท ${q.tg}`:q.k==='dirty'?q.tg:`ช่วยตัวประกันจาก${q.tg}`}
function qxStory(q){const step=q.of>1?` <span class="tag2">(ขั้น ${q.st}/${q.of})</span>`:'';const left=q.dl-S.age;
 const S1={beast:`${q.who}มาขอร้องให้คุณจัดการ${q.tg} ชาวบ้านไม่กล้าออกจากบ้านมาหลายเดือนแล้ว`,gang:q.st===1?`${q.who}เล่าว่า${q.tg}ข่มเหงผู้คนหนักขึ้นทุกวัน`:`${q.tg}รวมพลกลับมาแก้แค้น หัวหน้าตัวจริงปรากฏตัวแล้ว`,
  relic:[`${q.who}ยื่นเบาะแสแรกของ${q.tg}ให้ — ต้องผ่านด่านคนเฝ้าเบาะแสก่อน`,`เบาะแสพาคุณมาถึงที่ซ่อน แต่มีคนอื่นตามมาแย่งด้วย`,`ด่านสุดท้าย: ผู้พิทักษ์${q.tg}ขวางอยู่ตรงหน้า`][q.st-1],
  ill:`${q.tg} ${q.who}บอกว่าถ้าไม่มีใครช่วยภายในปีนี้ คนจะตายอีกมาก`,feud:`${q.tg}ปะทะกันจนเลือดตกยางออก ทั้งสองฝ่ายต่างอยากให้คุณเข้าข้าง`,
  dirty:`${q.who}ยื่นข้อเสนอลับๆ: <b>${q.tg}</b> ค่าตอบแทนงามมาก แต่ขัดกับมโนธรรม`,rescue:q.st===1?`ลูกของ${q.who}ถูก${q.tg}จับตัวไปเรียกค่าไถ่`:`${q.tg}ไม่ยอมจบ ตามมาเอาคืนถึงบ้าน${q.who}`}[q.k];
 const sk=(S.int||0)/((S.int||0)+160*(1+ri()));let hint='';if(q.tw&&q.tw!=='bonus'&&Math.random()<sk)hint=`<br>🧠 <i>${q.tw==='liar'?'ลางสังหรณ์บอกว่าผู้ว่าจ้างปิดบังอะไรบางอย่าง…':'คุณสังเกตว่ารอบๆ เงียบผิดปกติ อาจมีคนซุ่มอยู่'}</i>`;
 let conf='';try{if(q.al<0&&S.faction&&S.faction.t==='ธรรมะ')conf=`<br>⚠️ <span style="color:#d84a4a">ขัดกับวิถี${esc(S.faction.n)} ถ้าถูกจับได้จะเสียชื่อเสียงหนัก</span>`;else if(q.al>0&&S.faction&&S.faction.t==='อธรรม')conf=`<br>⚠️ พรรคพวกใน${esc(S.faction.n)}อาจหัวเราะเยาะที่คุณทำตัวเป็นคนดี`}catch(e){}
 return `${S1}${step}<br><span class="tag2">รางวัล: ${q.rw.map(r=>RWN[r]).join(' · ')}${q.st===q.of&&q.of>1?' · 🎁 รางวัลใหญ่ขั้นสุดท้าย':''} · ${left>0?`เหลือเวลา ${left} ปี`:'<b style="color:#d84a4a">หมดเวลาแล้ว ต้องตัดสินใจตอนนี้</b>'}</span>${hint}${conf}`}
function qxDone(q,ok,how){const E=EC();E.qx=null;const w=q.w;
 if(!ok){E.qF++;S.fame=Math.max(0,Math.round((S.fame||0)-fameR(4*q.st)));if(q.k==='ill'||q.k==='rescue'){S.karma-=3;try{joy(-4)}catch(e){}}log(`🧭 ภารกิจ「${qxTitle(q)}」ล้มเหลว${how?' — '+how:''}`,'bad');return}
 const fin=()=>{E.qOk++;const big=q.st===q.of&&q.of>1?1.8:1;const r=qxPay(q,big*(q.tw==='bonus'?1.6:1));
  log(`🧭 ภารกิจ「${qxTitle(q)}」สำเร็จ${how?' ('+how+')':''}${q.tw==='bonus'?' — ระหว่างทางพบของซ่อนไว้อีกก้อน!':''}: ${r}`,q.st>=2?'epic':'good');
  try{if(q.al<0&&S.faction&&S.faction.t==='ธรรมะ'&&Math.random()<.35){S.fame=Math.round((S.fame||0)*.8);if(S.merit)S.merit=Math.round(S.merit*.7);log(`🚨 ข่าวงานสกปรกรั่วถึง${esc(S.faction.n)} ชื่อเสียงและผลงานในสำนักร่วงหนัก`,'bad')}}catch(e){}
  if(q.st<q.of||(q.of===1&&q.al>=0&&Math.random()<.2&&q.st<3)){const nx=Object.assign({},q);nx.of=Math.max(q.of,q.st+1);E.qnx={q:nx,y:S.age+R(2,4)};setTimeout(()=>{if(S&&S.alive)log(`🧭 <span class="tag2">เรื่องของ${qxTitle(q)}ยังไม่จบ… อีกไม่กี่ปีคงมีความคืบหน้า</span>`,'')},0)}};
 if(q.tw==='trap'){const ep=total()*(q.d+.25);log('🗡️ หักมุม! ระหว่างทางกลับมีคนซุ่มโจมตี','bad');sc('fight');duel('มือสังหารที่ซุ่มอยู่',ep,v=>{if(v){q.rw.push(q.rw[0]);fin()}else{E.qF++;log('💥 พลาดท่าโดนซุ่มโจมตี รางวัลถูกชิงไปหมด','bad')}});return}
 if(q.tw==='liar'){sc('hall');choice('🎭 หักมุม!',`ทำงานเสร็จแล้วคุณเพิ่งรู้ความจริง: <b>${esc(q.who)}</b>คือคนที่อยู่เบื้องหลังเรื่องเลวร้ายทั้งหมด และหลอกใช้คุณกำจัดคนที่ขวางทาง`,[
  {ai:pW(q.d+.3),t:'⚔️ หันดาบใส่ผู้ว่าจ้าง',s:`สู้กับลูกน้องเขา (แข็งแรงราว ${Math.round((q.d+.3)*100)}%) · ชนะได้รางวัลเพิ่มและกรรมดี`,f(){duel(`ลูกน้องของ${q.who}`,total()*(q.d+.3),v=>{if(v){S.karma+=12;q.al=1;q.rw.push(ch(nonMoney(w)));fin()}else{E.qF++;S.hp-=Math.round(S.maxHp*.15);log('💥 สู้ไม่ไหว ต้องหนีเอาตัวรอดมือเปล่า','bad')}})}},
  {ai:.35,t:'💰 รับรางวัลแล้วเงียบไว้',s:'ได้รางวัลตามตกลง แต่กรรมลด',f(){S.karma-=10;fin()}}]);return}
 fin()}
function qxAsk(q){const w=q.w,W=qw(w),A=anc(w),cost=Math.round(Math.max(A*q.d*(1.6+q.st*.8),(+S.money||0)*.05*q.d*q.st)*(q.k==='dirty'?.5:1)),ep=Math.round(total()*q.d*(.95+Math.random()*.1));
 const sk=Math.min(1,((S.int||0)+(S.cha||0)*.6)/(230*(1+ri())*q.d)),pw=Math.max(.12,Math.min(.85,.22+.55*sk));
 const o=[];const last=S.age>=q.dl;
 if(q.k==='feud'){const[a,b]=W.feud;
  o.push({ai:pw,t:`🗣️ ไกล่เกลี่ยให้ทั้งสองฝ่ายยอม`,s:`ใช้ปัญญา+เสน่ห์ · สำเร็จราว ${Math.round(pw*100)}%`,f(){if(Math.random()<pw){q.al=1;qxDone(q,true,'ทั้งสองฝ่ายยอมความ')}else{S.fame=Math.max(0,(S.fame||0)-fameR(5));qxDone(q,false,'ทั้งสองฝ่ายโกรธคุณ')}}});
  o.push({ai:pW(q.d)*.6,t:`🛡️ เข้าข้าง${a}`,s:`ต้องสู้กับคนของ${b} (${Math.round(q.d*100)}%) · ได้รางวัลแน่ แต่${b}จะผูกใจเจ็บ`,f(){duel(`คนของ${b}`,ep,v=>v?(S.karma-=2,qxDone(q,true,`${a}ชนะ`)):qxDone(q,false,'แพ้ศึก'))}});
  o.push({ai:pW(q.d)*.6,t:`🛡️ เข้าข้าง${b}`,s:`ต้องสู้กับคนของ${a} (${Math.round(q.d*100)}%)`,f(){duel(`คนของ${a}`,ep,v=>v?(S.karma-=2,qxDone(q,true,`${b}ชนะ`)):qxDone(q,false,'แพ้ศึก'))}})}
 else{
  o.push({ai:pW(q.d),t:'⚔️ บุกตรงๆ',s:`ต้องสู้ (แข็งแรงราว ${Math.round(q.d*100)}% ของคุณ) · แพ้แล้วบาดเจ็บ`,f(){sc('fight');duel(q.k==='beast'?q.tg:q.k==='ill'?'คนที่ปล่อยพิษ':q.k==='relic'?'ผู้พิทักษ์':q.k==='dirty'?'องครักษ์ของเป้าหมาย':q.tg,ep,v=>qxDone(q,v,v?'ชนะด้วยฝีมือ':'พ่ายแพ้'))}});
  o.push({ai:w==='z'?(S.hp>S.maxHp*.5?.4:.05):(+S.money||0)<cost?0:(cost<(+S.money||0)*.25?.7:.3),t:`💰 ${W.pay}`,s:(w==='z'?'เสียเสบียงและพลังชีวิต':`จ่าย ${mt(cost,w)}`)+((+S.money||0)<cost&&w!=='z'?' · ⚠️ เงินไม่พอ':''),f(){if(w==='z'){S.hp-=Math.round(S.maxHp*.12);return qxDone(q,true,'แลกเสบียง')}if((+S.money||0)<cost){log('💸 เงินไม่พอจ้างใคร งานนี้จึงหลุดมือไป','');return qxDone(q,false,'เงินไม่พอ')}addMoney(-cost);qxDone(q,true,'ใช้เงินแก้ปัญหา')}});
  o.push({ai:pw,t:`🧠 ${W.wit}`,s:`ใช้ปัญญา+เสน่ห์ · สำเร็จราว ${Math.round(pw*100)}%`,f(){if(Math.random()<pw)qxDone(q,true,'ใช้ไหวพริบ');else if(!last&&Math.random()<.5){q.d=+(q.d+.15).toFixed(2);log(`🧠 แผนไม่สำเร็จ ศัตรูรู้ตัวแล้ว งานนี้ยากขึ้น — ยังพอมีเวลาลองใหม่`,'bad');EC().qx=q;q.nx=S.age+1}else qxDone(q,false,'แผนแตก')}})}
 if(!last)o.push({ai:.12,t:'⏳ ขอเวลาเตรียมตัวก่อน',s:'ปีหน้าค่อยว่ากัน · ยิ่งช้ายิ่งยากขึ้น',f(){q.d=+(q.d+.12).toFixed(2);q.nx=S.age+1;EC().qx=q;log(`⏳ ผัดภารกิจ「${qxTitle(q)}」ไปก่อน`,'')}});
 o.push({t:q.k==='dirty'?'🙅 ปฏิเสธงานสกปรก':'🚶 ไม่รับงานนี้',s:q.k==='dirty'?'กรรมดี +3':(q.k==='ill'||q.k==='rescue')?'มีคนต้องเดือดร้อน · กรรม/ความสุขลด':'',skip:true,f(){EC().qx=null;if(q.k==='dirty'){S.karma+=3;log('🙅 คุณปฏิเสธงานสกปรกไปอย่างหนักแน่น','good')}else if(q.k==='ill'||q.k==='rescue'){S.karma-=4;try{joy(-4)}catch(e){}log(`😔 ไม่มีใครช่วย${q.k==='ill'?'ผู้ป่วย':'ตัวประกัน'}ทัน…`,'bad')}else log(`🚶 ปฏิเสธภารกิจ「${qxTitle(q)}」`,'')}});
 sc(q.k==='beast'||q.k==='gang'?'fight':'hall');choice(`🧭 ${qxTitle(q)}`,qxStory(q),o)}
function qxTick(w,go){const E=EC();
 if(E.qx){const q=E.qx;if(q.w!==w){E.qx=null;return false}if(S.age>=(q.nx||0)){qxAsk(q);return true}return false}
 if(E.qnx&&S.age>=E.qnx.y){const b=E.qnx.q;E.qnx=null;if(b.w!==w)return false;const T=QK.find(t=>t.k===b.k)||QK[0];const q=qxMake(w,T,b.st+1,b);q.tw=Math.random()<.22?ch(['liar','trap','bonus']):'';q.rw=[ch(nonMoney(w)),ch(nonMoney(w))].filter((x,i,a)=>a.indexOf(x)===i);E.qx=q;q.nx=0;E.qN++;qxAsk(q);return true}
 if(S.age<15||!go&&Math.random()>.13)return false;
 let T=ch(QK);if(T.al<0&&S.karma>60&&Math.random()<.6)T=QK[0];const q=qxMake(w,T,1);E.qx=q;q.nx=0;E.qN++;qxAsk(q);return true}
// ตัดสินตอนสิ้นปี แต่เปิดหน้าต่างตอนว่าง (ปีส่วนใหญ่มีเรื่องอื่นค้างอยู่) — เปิดก่อนเริ่มปีถัดไป
let pend=null;
function evTick(){const w=ecW();if(!w||S.age<15||pend)return;const E=EC(),A=anc(w),M=+S.money||0;
 if(w!=='z'&&S.age-E.evY>=2){const R0=M/(6*A);if(M>4*A&&Math.random()<Math.min(.14,.025*Math.log2(1+R0))){E.evY=S.age;pend={w,f:()=>ecRisk(w,anc(w))};return}if(M>10*A&&Math.random()<.07){E.evY=S.age;pend={w,f:()=>ecOpp(w)};return}}
 const E2=EC();if(E2.qx||E2.qnx&&S.age>=E2.qnx.y||(S.age>=15&&Math.random()<.13))pend={w,f:()=>qxTick(w,1)}}
function evFire(){if(!pend||!can())return false;const P=pend;pend=null;if(ecW()!==P.w)return false;const c0=choice._cur;try{P.f()}catch(e){console.error('eco182f',e)}return !!choice._cur&&choice._cur!==c0}
{const _py=passYear;passYear=function(){if(S&&S.alive&&pend&&evFire())return;const a0=S?S.age:0,m0=S?(+S.money||0):0;const r=_py.apply(this,arguments);try{if(S&&S.alive&&S.age>a0){ecTick(S.age-a0,m0);evTick()}}catch(e){console.error('eco182',e)}return r}}
window._ec182={evFire,pend:()=>pend,ecTick,evTick,ecRisk,ecOpp,qxTick,qxAsk,qxMake,QK,ecW,anc,ecU};
})()}catch(e){console.error('block184',e)}
SL.impl.passYear=passYear;passYear=function(){return globalThis.passYear.apply(this,arguments)};})();

wReady('mwx');
