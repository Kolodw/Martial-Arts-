// ============================================================
// /w/fx2.js ✨ อนิเมชันระหว่างเล่น (ทุกโลก) + ฟีเจอร์หน้าสรุปชีวิต
//  อนิเมชัน: 📅 ขึ้นปีใหม่ (เลขอายุพลิก + สีฤดู) · 💥 ผลของตัวเลือก (ทอง/ตำนาน/สั่น) · 🔢 ตัวเลขลอย (เงิน เลือด ชื่อเสียง กรรม ความสุข)
//            ⚔️ ฉากเปิดเรื่องสำคัญ (VS / หัวใจ / หนังสือพิมพ์) · (ฉากสิ้นใจใช้ playRecap เดิม) · 💒 เหตุการณ์ใหญ่ในชีวิตเต็มจอ 2 วิ (แตะข้าม)
//  หน้าสรุป: 📈 กราฟชีวิตละเอียด (พลัง ความสุข ทรัพย์ + หมุดเหตุการณ์) · 🎞️ ไฮไลต์ชีวิต (สไลด์ + รูปยาวสำหรับสตอรี่) · 👻 หลังจากคุณจากไป
//  ออนไลน์: 🌐 "ผู้เล่นกี่ % เลือกแบบเดียวกับคุณ" (ส่งผลโหวตรวดเดียวตอนจบชีวิต · ดึงสถิติวันละไม่กี่ครั้ง ไม่เปลืองเซิร์ฟเวอร์)
//  ปิดเองเมื่อ: ตั้งค่าลดการเคลื่อนไหว / โหมดลื่น / ออโต้ความเร็วสูง · ตั้งค่าเปิดปิดได้ที่ ☰ → ตั้งค่า (LS murim_fx2)
// ============================================================
try{(function(){if(window._fx2)return;
const $$=id=>document.getElementById(id),rnd=Math.random,pk=a=>a[Math.floor(rnd()*a.length)],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const E=s=>{try{return esc(String(s))}catch(e){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}};
const F=n=>{try{return fmt(Math.round(n))}catch(e){return String(Math.round(n))}};
const strip=s=>String(s==null?'':s).replace(/<[^>]+>/g,'').trim();
const inGame=()=>{const g=$$('game');return !!(g&&g.classList.contains('on')&&S&&S.alive)};
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const fxOn=()=>{try{if(LS.get('murim_fx2',1)===0)return false;if(RM())return false;if(typeof fxQ!=='undefined'&&fxQ<1)return false;if(typeof auto!=='undefined'&&auto&&typeof speed!=='undefined'&&speed>=4)return false;if(document.hidden)return false}catch(e){}return true};
const WK=()=>{try{if(!S)return'';if(S.beastMode&&!S.beastMode.human)return'beast';if(S.mw){if(S.mw.ani)return'mw';if(S.mw.fan)return'fan';if(S.mw.fog)return'fog';if(S.mw.sky)return'sky';return'mw'}if(S.ch==='soul')return'soul';if(S.ch==='regress')return'loop';if(S.xt)return'god';if(S.xian)return'xian'}catch(e){}return'murim'};
const layer=()=>{let l=$$('fx2L');if(!l){l=document.createElement('div');l.id='fx2L';document.body.appendChild(l)}return l};
const add=(h,cls,ms)=>{const d=document.createElement('div');d.className=cls;d.innerHTML=h;layer().appendChild(d);setTimeout(()=>{try{d.remove()}catch(e){}},ms||1600);return d};
let lastFx=0;const gate=ms=>{const t=Date.now();if(t-lastFx<(ms||650))return false;lastFx=t;return true};
// ---------- 📅 ขึ้นปีใหม่ ----------
const SEAS=[['🌸','#ff9ad0'],['☀️','#ffcf5a'],['🍂','#ff9a4a'],['❄️','#9ad8ff']];
function seasonNow(){try{if(typeof curMon==='function'){return SEAS[Math.floor(curMon()/3)%4]}}catch(e){}return SEAS[(S.age|0)%4]}
function yearFx(a){if(!fxOn()||!inGame())return;const s=seasonNow();
 add(`<div class="fx2YrC" style="--sc:${s[1]}"><span class="o">${a-1}</span><span class="n">${a}</span></div><small>${s[0]} อายุ ${a} ปี</small>`,'fx2Yr',1500);
 const t=add('','fx2Tint',1300);t.style.background=`radial-gradient(ellipse at 50% 0%,${s[1]}33,transparent 60%)`;
 const P=['🌸','☀️','🍂','❄️'][SEAS.indexOf(s)]||'✨';for(let i=0;i<7;i++){const p=add(P,'fx2Petal',2600);p.style.left=(8+rnd()*84)+'%';p.style.animationDelay=(rnd()*.6)+'s';p.style.fontSize=(10+rnd()*8)+'px'}}
// ---------- 🔢 ตัวเลขลอย ----------
const TRK=[['money','💰','#ffd54a',v=>Math.abs(v)>=1],['hp','❤️','#ff6b7a',v=>Math.abs(v)>=1],['fame','📣','#7ad0ff',v=>Math.abs(v)>=1],['karma','☯️','#c8a8ff',v=>Math.abs(v)>=1],['happy','😊','#7fe0a0',v=>Math.abs(v)>=2]];
let snap=null,snapA=-1,flQ=0;
function rd(k){try{if(k==='money'&&S.mw&&!S.mw.fan&&typeof S.mw.money==='number'&&!S.money)return S.mw.money;return +S[k]||0}catch(e){return 0}}
function floatNums(){if(!S||!S.alive){snap=null;return}const cur={};TRK.forEach(t=>cur[t[0]]=rd(t[0]));
 if(!snap||S.age!==snapA&&Math.abs(S.age-snapA)>3){snap=cur;snapA=S.age;return}
 if(fxOn()&&inGame()){let n=0;TRK.forEach(([k,ic,col,ok])=>{const d=cur[k]-snap[k];if(!ok(d)||n>=3)return;if(k==='hp'&&Math.abs(d)<Math.max(1,(S.maxHp||100)*.02))return;n++;
  const e=add(`${ic} ${d>0?'+':'−'}${F(Math.abs(d))}`,'fx2Num '+(d>0?'up':'dn'),1700);e.style.color=d>0?col:'#ff8a8a';e.style.left=(30+rnd()*40)+'%';e.style.animationDelay=(n*.12)+'s'})}
 snap=cur;snapA=S.age}
// ---------- 💥 ผลของตัวเลือก ----------
function burst(col,n,ic){const L=layer();for(let i=0;i<(n||14);i++){const p=document.createElement('i');p.className='fx2P';const a=rnd()*Math.PI*2,r=60+rnd()*110;p.style.setProperty('--dx',Math.cos(a)*r+'px');p.style.setProperty('--dy',Math.sin(a)*r-30+'px');p.style.background=col;if(ic){p.textContent=ic;p.style.background='none';p.style.fontSize='14px'}p.style.animationDelay=(rnd()*.08)+'s';L.appendChild(p);setTimeout(()=>p.remove(),1200)}}
function outcomeFx(cls,t){if(!fxOn()||!inGame())return;
 if(cls==='myth'&&gate(900)){add(`<div class="fx2St"><b>✦ ตำนาน ✦</b><small>${E(strip(t).slice(0,34))}</small></div>`,'fx2Stamp',1700);burst('#ffd54a',22);try{navigator.vibrate&&navigator.vibrate([20,40,30])}catch(e){}}
 else if(cls==='epic'&&gate(700)){add('','fx2Glow',900);burst('#ffe08a',12)}
 else if(cls==='bad'&&gate(700)){const g=$$('game');if(g){g.classList.remove('fx2Shake');void g.offsetWidth;g.classList.add('fx2Shake');setTimeout(()=>g.classList.remove('fx2Shake'),500)}add('','fx2Vig',900)}}
// ---------- ⚔️ ฉากเปิดเรื่องสำคัญ ----------
function introFx(title){if(!fxOn()||!inGame())return;const t=strip(title);if(!t)return;
 if(/^(🤺|⚔️)/.test(t)||/ดวล|ประลอง|ลอบโจมตี|นัดสุดท้าย|ลงมือ|ท้าดวล/.test(t)){if(!gate(500))return;const mm=/กับ\s*(.+)$/.exec(t);const nm=(mm?mm[1]:t.replace(/^[^\sก-๙A-Za-z]+\s*/,'')).slice(0,26);
  add(`<div class="fx2Vs"><span class="l">คุณ</span><b>VS</b><span class="r">${E(nm)}</span></div>`,'fx2VsW',1500);return}
 if(/^(💞|💌|💍|🌹|💒)/.test(t)){if(!gate(500))return;for(let i=0;i<14;i++){const h=add(pk(['💗','💕','💖','💞']),'fx2Heart',2400);h.style.left=(5+rnd()*90)+'%';h.style.animationDelay=(rnd()*.7)+'s';h.style.fontSize=(14+rnd()*14)+'px'}return}
 if(/^📰/.test(t)){if(!gate(500))return;add(`<div class="fx2Np"><small>ข่าวด่วน · EXTRA</small><b>${E(t.replace(/^📰\s*/,'').slice(0,28))}</b></div>`,'fx2NpW',1500)}}
// ---------- 💒 เหตุการณ์ใหญ่ในชีวิต ----------
const BIG=[[/แต่งงาน|💍|💒/,'💒','วันแต่งงาน'],[/ลูกคน|ให้กำเนิด|ลูกชาย|ลูกสาว|มีบุตร/,'👶','สมาชิกใหม่ของครอบครัว'],[/เข้าสำนัก|รับเป็นศิษย์|ศิษย์สายตรง/,'🏯','ก้าวแรกสู่สำนัก'],[/ฉายา/,'📜','ได้รับฉายา'],[/จบการศึกษา|รับปริญญา/,'🎓','วันรับปริญญา'],[/เจ้าสำนัก|ก่อตั้ง/,'🏛️','ผู้นำคนใหม่']];
let bigA=-1;
function bigFx(cap,url){if(!fxOn()||!inGame()||S.age===bigA)return;const c=strip(cap);const m=BIG.find(b=>b[0].test(c));if(!m)return;bigA=S.age;
 const d=add(`<div class="fx2BigIn"><div class="ic">${m[1]}</div><div class="t">${m[2]}</div>${url?`<img src="${url}" alt="">`:''}<div class="c">${E(c.slice(0,60))}</div><div class="a">อายุ ${S.age} ปี</div><small>แตะเพื่อข้าม</small></div>`,'fx2Big',2400);
 d.onclick=()=>d.remove();burst('#ffd54a',16,'✨')}
// ---------- 🕯️ ฉากสิ้นใจ ----------
let deadShown=null;
function deathFx(){if(!fxOn()||!S||deadShown===S)return;deadShown=S;const n=E(S.name||'');
 const d=add(`<div class="fx2DeIn"><div class="soul">✧</div><div class="nm">${n}</div><div class="ag">${S.age|0} ปี</div><div class="cz">${E(strip(S.cause||S.deathCause||'').slice(0,60))}</div></div>`,'fx2De',2600);d.onclick=()=>d.remove()}
// ---------- hooks ----------
setInterval(()=>{try{if(!S)return;if(S.alive&&S.age!==window._fx2A){const a0=window._fx2A;window._fx2A=S.age;if(a0!=null&&S.age===a0+1)yearFx(S.age)}floatNums()}catch(e){}},280);
try{const _l=window.log||log;const nl=function(t,c){const r=_l.apply(this,arguments);try{if(c==='myth'||c==='epic'||c==='bad')outcomeFx(c,t)}catch(e){}return r};window.log=nl;try{log=nl}catch(e){}}catch(e){}
try{const _c=window.choice||choice;const nc=function(t){const r=_c.apply(this,arguments);try{introFx(t)}catch(e){}return r};Object.assign(nc,_c);window.choice=nc;try{choice=nc}catch(e){}}catch(e){}
try{if(typeof albumSnap==='function'){const _a=albumSnap;albumSnap=function(cap){const r=_a.apply(this,arguments);try{setTimeout(()=>{try{const A=S&&S.album,L=A&&A[A.length-1];bigFx(cap,L&&L.a===S.age?L.u:null)}catch(e){}},420)}catch(e){}return r};window.albumSnap=albumSnap}}catch(e){}
try{const _s=window.show||show;const ns=function(id){const r=_s.apply(this,arguments);try{if(id==='end'){setTimeout(endExtras,700);setTimeout(endExtras,2200);chvFlush()}}catch(e){}return r};window.show=ns;try{show=ns}catch(e){}}catch(e){}
// ---------- 💰 ประวัติทรัพย์สิน (สำหรับกราฟ) ----------
setInterval(()=>{try{if(!S||!S.alive)return;const H=S._hm||(S._hm=[]);const a=S.age|0;if(!H.length||H[H.length-1][0]!==a){H.push([a,Math.round(rd('money'))]);if(H.length>400)H.splice(1,1)}}catch(e){}},1000);
// ============================================================ หน้าสรุปชีวิต ============================================================
function endBox(){return $$('end')}
function endExtras(){try{const B=endBox();if(!B||!B.classList.contains('on')||!S)return;if(B.querySelector('#fx2End'))return;
 const host=document.createElement('div');host.id='fx2End';
 host.innerHTML=`<div class="fx2Btns"><button class="pbtn" onclick="fx2Reel()">🎞️ ไฮไลต์ชีวิต</button><button class="gbtn" onclick="fx2After()">👻 หลังจากคุณจากไป</button></div>${graphHTML()}`;
 const sp=B.querySelector('.spark');if(sp&&sp.parentNode){const h5=[...sp.parentNode.querySelectorAll('h5')].find(h=>/กราฟชีวิต/.test(h.textContent));(h5||sp).parentNode.insertBefore(host,h5||sp)}else{const c=B.querySelector('.card,.box')||B;c.insertBefore(host,c.firstChild?c.firstChild.nextSibling:null)}
 graphBind()}catch(e){console.error('fx2 end',e)}}
// ---------- 📈 กราฟละเอียด ----------
function pins(){try{return (S.key||[]).map(k=>{const m=/^(\d+) ปี — ([\s\S]*)$/.exec(String(k));return m?{a:+m[1],t:strip(m[2])}:null}).filter(Boolean).slice(-14)}catch(e){return[]}}
function graphHTML(){const H=S.hist||[],M=S._hm||[];if(H.length<3)return'';const W=340,Ht=150,pl=6,pr=6,pt=10,pb=20,x0=H[0][0],x1=H[H.length-1][0]||1;
 const X=a=>pl+(a-x0)/Math.max(1,x1-x0)*(W-pl-pr),Y=(v,mx)=>pt+(1-v/Math.max(1,mx))*(Ht-pt-pb);
 const pM=Math.max(1,...H.map(h=>h[1])),mM=Math.max(1,...M.map(m=>m[1]));
 const line=(arr,f,mx,col)=>`<polyline points="${arr.map(h=>`${X(h[0]).toFixed(1)},${Y(f(h),mx).toFixed(1)}`).join(' ')}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" class="fx2Ln"/>`;
 const area=(arr,f,mx,col)=>`<polygon points="${X(arr[0][0])},${Ht-pb} ${arr.map(h=>`${X(h[0]).toFixed(1)},${Y(f(h),mx).toFixed(1)}`).join(' ')} ${X(arr[arr.length-1][0])},${Ht-pb}" fill="${col}" opacity=".12"/>`;
 const P=pins().filter(p=>p.a>=x0&&p.a<=x1);
 const ticks=[x0,Math.round((x0+x1)/2),x1].map(a=>`<text x="${X(a)}" y="${Ht-5}" text-anchor="middle" font-size="9" fill="currentColor" opacity=".55">${a}</text>`).join('');
 return`<div class="fx2G"><div class="fx2GH"><b>📈 กราฟชีวิตแบบละเอียด</b><span class="lg"><i style="background:#ff6b9a"></i>พลัง <i style="background:#7fe0a0"></i>ความสุข ${M.length>2?'<i style="background:#ffd54a"></i>ทรัพย์':''}</span></div>
 <svg viewBox="0 0 ${W} ${Ht}" id="fx2Gs">${area(H,h=>h[1],pM,'#ff6b9a')}${line(H,h=>h[1],pM,'#ff6b9a')}${line(H,h=>h[2],100,'#7fe0a0')}${M.length>2?line(M,m=>m[1],mM,'#ffd54a'):''}
 ${P.map((p,i)=>`<g class="fx2Pin" data-i="${i}"><line x1="${X(p.a)}" x2="${X(p.a)}" y1="${pt}" y2="${Ht-pb}" stroke="#fff" stroke-opacity=".14" stroke-dasharray="2 3"/><circle cx="${X(p.a)}" cy="${pt+4+(i%3)*9}" r="4.2" fill="#ffd54a" stroke="#2a1d05" stroke-width="1.2"/></g>`).join('')}${ticks}</svg>
 <div class="fx2GT" id="fx2GT">${P.length?'แตะหมุดสีทองเพื่อดูเหตุการณ์ · '+P.length+' เหตุการณ์สำคัญ':'ชีวิตเรียบง่าย ไม่มีหมุดเหตุการณ์'}</div></div>`}
function graphBind(){const P=pins(),s=$$('fx2Gs'),t=$$('fx2GT');if(!s||!t)return;s.querySelectorAll('.fx2Pin').forEach(g=>g.onclick=()=>{const p=P.filter(x=>x.a>=(S.hist[0]||[0])[0])[+g.dataset.i]||P[+g.dataset.i];if(p){t.innerHTML=`<b class="px">${p.a} ปี</b> — ${E(p.t)}`;s.querySelectorAll('circle').forEach(c=>c.setAttribute('r','4.2'));g.querySelector('circle').setAttribute('r','6')}})}
// ---------- 🎞️ ไฮไลต์ชีวิต ----------
const GRAD={murim:['#3a1d14','#8a3a1a'],xian:['#141a3a','#3a5a9a'],god:['#2a1a40','#c8a040'],soul:['#1a1430','#7a3aa8'],loop:['#101820','#2a6a7a'],beast:['#10241a','#3a7a3a'],mw:['#101828','#2a5a9a'],sky:['#0a1020','#ff7a3a'],fog:['#1a1a1e','#6a6a7a'],fan:['#1a1030','#ff7ac8']};
function slides(){const A=(S.album||[]).filter(x=>x&&x.u).slice(-8);const out=A.map(x=>({u:x.u,a:x.a,c:x.c}));
 if(out.length<4)pins().slice(-(6-out.length)).forEach(p=>{if(!out.some(o=>o.a===p.a))out.push({a:p.a,c:p.t})});return out.sort((a,b)=>a.a-b.a)}
window.fx2Reel=function(){try{const L=slides();const g=GRAD[WK()]||GRAD.murim;if(!L.length)return toast('ชีวิตนี้ยังไม่มีฉากสำคัญให้ทำไฮไลต์');let i=-1,tm=null;
 const o=document.createElement('div');o.id='fx2Reel';o.style.setProperty('--g1',g[0]);o.style.setProperty('--g2',g[1]);
 o.innerHTML=`<div class="bar">${L.map(()=>'<i><b></b></i>').join('')}<i><b></b></i></div><div class="st"></div><div class="ctl"><button class="gbtn" id="fx2RS">⬇️ บันทึกรูปยาว</button><button class="gbtn" id="fx2RX">✕ ปิด</button></div>`;document.body.appendChild(o);
 const st=o.querySelector('.st'),bars=o.querySelectorAll('.bar i b');
 const go=k=>{clearTimeout(tm);i=k;bars.forEach((b,j)=>{b.style.transition='none';b.style.width=j<i?'100%':'0%'});if(i>L.length){close();return}
  const b=bars[i];if(b){void b.offsetWidth;b.style.transition='width 2.6s linear';b.style.width='100%'}
  if(i===L.length){st.innerHTML=`<div class="fin"><div class="nm">${E(S.name||'')}</div><div class="ag">${S.age|0} ปี</div><div class="cz">${E(strip(S.cause||'').slice(0,70))}</div><small>1 ใน นวนิยาย · 1inanovel.com</small></div>`}
  else{const s=L[i];st.innerHTML=`<div class="sl">${s.u?`<div class="ph"><img src="${s.u}" alt=""></div>`:`<div class="ph tx">${E(s.c.slice(0,2))}</div>`}<div class="ag">อายุ ${s.a} ปี</div><div class="cp">${E(s.c)}</div></div>`}
  tm=setTimeout(()=>go(i+1),2700)};
 const close=()=>{clearTimeout(tm);o.remove()};o.querySelector('#fx2RX').onclick=e=>{e.stopPropagation();close()};o.querySelector('#fx2RS').onclick=e=>{e.stopPropagation();longImg(L,g)};
 st.onclick=e=>{const r=st.getBoundingClientRect();go(e.clientX<r.left+r.width*.3?Math.max(0,i-1):i+1)};go(0)}catch(e){console.error('reel',e)}};
function longImg(L,g){try{const W=720,hd=230,rowH=L.map(s=>s.u?330:150),H=hd+rowH.reduce((a,b)=>a+b,0)+170;const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const gr=x.createLinearGradient(0,0,0,H);gr.addColorStop(0,g[0]);gr.addColorStop(1,g[1]);x.fillStyle=gr;x.fillRect(0,0,W,H);
 x.fillStyle='#ffffff';x.textAlign='center';x.font='bold 46px sans-serif';x.fillText(String(S.name||''),W/2,96);x.font='26px sans-serif';x.fillStyle='#ffe9b0';x.fillText(`ไฮไลต์ชีวิต · ${S.age|0} ปี`,W/2,142);
 x.font='20px sans-serif';x.fillStyle='#ffffffaa';x.fillText(strip(S.cause||'').slice(0,40),W/2,182);
 let y=hd;const imgs=L.map(s=>{if(!s.u)return null;const im=new Image();im.src=s.u;return im});
 const draw=()=>{L.forEach((s,k)=>{x.fillStyle='#00000055';x.fillRect(40,y,W-80,rowH[k]-20);if(imgs[k]&&imgs[k].complete){x.imageSmoothingEnabled=false;x.drawImage(imgs[k],56,y+16,W-112,(W-112)*84/240)}
  const ty=y+(imgs[k]?(W-112)*84/240+50:52);x.textAlign='left';x.fillStyle='#ffd54a';x.font='bold 24px sans-serif';x.fillText(`${s.a} ปี`,60,ty);x.fillStyle='#ffffff';x.font='22px sans-serif';x.fillText(String(s.c).slice(0,34),150,ty);y+=rowH[k]});
  x.textAlign='center';x.fillStyle='#ffd54a';x.font='bold 26px sans-serif';x.fillText('1 ใน นวนิยาย · 1inanovel.com',W/2,H-60);
  c.toBlob(b=>{if(!b)return;const f=new File([b],'1inanovel-highlight.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],title:'1 ใน นวนิยาย'}).catch(()=>dl(b));else dl(b)},'image/png')};
 const dl=b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='1inanovel-highlight.png';document.body.appendChild(a);a.click();a.remove()};
 Promise.all(imgs.map(im=>im?new Promise(r=>{if(im.complete)r();else{im.onload=r;im.onerror=r}}):0)).then(draw)}catch(e){console.error('longImg',e);toast('สร้างรูปไม่สำเร็จ')}}
// ---------- 👻 หลังจากคุณจากไป ----------
function afterLines(){const w=WK(),L=[],nm=E(S.name||'คุณ');const sp=typeof S.spouse==='string'?S.spouse:(S.spouse&&S.spouse.n)||(S.mw&&S.mw.sp&&S.mw.sp.n)||'';const kids=(S.kids|0)||((S.children||[]).length)||0;
 const R0=(S._lw2&&S._lw2.rv)||null,rp=S._rp&&(S._rp.P||[]).filter(p=>['date','eng','wed'].includes(p.st))[0],k=+S.karma||0,fame=(+S.fame||0)+((S.mw&&S.mw.fame)||0),money=rd('money');
 const place={murim:'ยุทธภพ',xian:'โลกบำเพ็ญ',god:'โลกเทพ',soul:'ทวีปวิญญาณยุทธ์',loop:'ยุทธภพ',beast:'พงไพร',mw:'เมือง',sky:'นครกำแพง',fog:'นครม่านหมอก',fan:'ทวีป'}[w]||'โลก';
 if(sp)L.push([1,pk([`${E(sp)}ยังจัดโต๊ะกินข้าวสองที่ทุกเย็น ทั้งที่รู้ว่าอีกที่จะว่างไปตลอด`,`${E(sp)}เก็บของทุกชิ้นของ${nm}ไว้ที่เดิม ไม่ยอมให้ใครย้าย`,`ทุกวันครบรอบ ${E(sp)}จะนั่งอยู่ตรงที่ที่คุณสองคนเจอกันครั้งแรก`])]);
 else if(rp)L.push([1,`${E(rp.n)}ไม่เคยแต่งงานกับใครอีกเลย`]);
 if(kids)L.push([3,pk([`ลูก${kids>1?'ๆ ':''}ของ${nm}เล่าเรื่องคุณให้หลานฟังก่อนนอนทุกคืน — บางเรื่องจริง บางเรื่องแต่งเพิ่ม`,`ลูกคนโตเปิดสมุดบันทึกของคุณ และเพิ่งเข้าใจว่าทำไมคุณถึงเข้มงวดนัก`])]);
 if(R0&&R0.path!=='dead')L.push([2,R0.path==='friend'||R0.path==='lover'?`${E(R0.n)}มาเยี่ยมหลุมศพทุกปี พร้อมสุราหนึ่งไหกับจอกสองใบ`:R0.path==='enemy'||R0.path==='dark'?`${E(R0.n)}ยืนหน้าหลุมศพนานมาก แล้วพูดว่า "ไม่มีใครให้ข้าแข่งด้วยอีกแล้ว"`:`${E(R0.n)}ชนะการแข่งครั้งต่อมาโดยไม่มีคุณ แต่ไม่ยิ้มเลย`]);
 if(S.ownSect)L.push([5,`${E(S.ownSect.n||S.ownSect)}ยังตั้งอยู่ ศิษย์รุ่นใหม่ท่องชื่อผู้ก่อตั้งทุกเช้า`]);else if(S.faction&&S.faction.n)L.push([4,`ใน${E(S.faction.n)} มีป้ายชื่อของ${nm}แขวนอยู่ในหอบรรพชน`]);
 if(money>0)L.push([1,money>(w==='mw'||w==='sky'||w==='fog'?5e6:5e4)?`มรดกก้อนใหญ่ทำให้ญาติที่ไม่เคยมาเยี่ยม โผล่มาพร้อมกันในวันอ่านพินัยกรรม`:`เงินเก็บที่เหลือถูกใช้จัดงานศพเรียบง่าย ตามที่คุณเคยบอกไว้`]);
 L.push([3,fame>=20000?`ชื่อของ${nm}กลายเป็นตำนานใน${place} คนเล่าเรื่องในโรงเตี๊ยมเล่าผิดไปครึ่งหนึ่ง`:fame>=3000?`คนใน${place}ยังจำชื่อคุณได้อีกหลายสิบปี`:`ไม่กี่ปี ชื่อของ${nm}ก็เลือนไปจาก${place} เหลือแค่ในความทรงจำของคนไม่กี่คน`]);
 L.push([5,k>=60?`มีเด็กคนหนึ่งที่คุณเคยช่วยไว้ เติบโตขึ้นมาและช่วยคนอื่นแบบเดียวกัน`:k<=-60?`มีคนแอบเอาดอกไม้แห้งไปวางที่หลุมศพ — ไม่ใช่เพื่อไว้อาลัย แต่เพื่อให้แน่ใจว่าคุณไม่ลุกขึ้นมาอีก`:`หลุมศพของ${nm}มีดอกไม้ป่าขึ้นเองทุกฤดูใบไม้ผลิ`]);
 return L.sort((a,b)=>a[0]-b[0]).slice(0,5)}
window.fx2After=function(){try{const L=afterLines();const o=document.createElement('div');o.id='fx2Af';o.innerHTML=`<div class="in"><div class="h">👻 หลังจากที่${E(S.name||'คุณ')}จากไป…</div><div class="ls"></div><button class="gbtn" style="margin-top:14px" id="fx2AfX">กลับหน้าสรุป</button></div>`;document.body.appendChild(o);
 const ls=o.querySelector('.ls');L.forEach(([y,t],i)=>setTimeout(()=>{const d=document.createElement('div');d.className='ln';d.innerHTML=`<b>+${y} ปี</b><span>${t}</span>`;ls.appendChild(d)},500+i*1300));
 o.querySelector('#fx2AfX').onclick=()=>o.remove()}catch(e){console.error('after',e)}};
// ============================================================ 🌐 ผู้เล่นคนอื่นเลือกอะไร ============================================================
const hsh=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(36)};
const norm=s=>strip(s).replace(/[0-9๐-๙,\.]+/g,'#').replace(/\s+/g,' ').replace(/ครั้งที่ #/g,'').slice(0,40);
const SKIP=/มินิเกม|ภารกิจประจำวัน|สอบ|บทสอน|ทายผล|ดวลวาทะ|รอบที่|ด่านที่|ชั้นที่/;
let CHV=null,chvT=0;const VQ=[];
function chvLoad(){if(Date.now()-chvT<36e5||typeof api!=='function')return;chvT=Date.now();try{const c=LS.get('murim_chvc',null);if(c&&Date.now()-c.t<6*36e5){CHV=c.d;return}}catch(e){}
 Promise.resolve(api('chvtop',{})).then(j=>{if(j&&j.d){CHV=j.d;try{LS.set('murim_chvc',{t:Date.now(),d:j.d})}catch(e){}}}).catch(()=>{})}
setTimeout(chvLoad,9000);
function chvShow(k,o){try{if(!CHV||!CHV[k])return;const r=CHV[k],tot=r._|0;if(tot<20)return;const n=r[o]|0,pc=Math.round(n/tot*100);
 const t=pc>=70?'คนส่วนใหญ่ก็เลือกแบบนี้':pc>=40?'คนแบ่งเป็นสองฝั่งพอๆ กัน':pc>=12?'คุณอยู่ฝั่งคนส่วนน้อย':'แทบไม่มีใครเลือกแบบคุณ';
 const d=add(`🌐 <b>${pc}%</b> ของผู้เล่นเลือกแบบเดียวกับคุณ <small>${t}</small>`,'fx2Pct',3200);d.style.setProperty('--pc',pc+'%')}catch(e){}}
try{const _cr=window.choiceRun||choiceRun;const ncr=function(i){const c=choice._cur;const r=_cr.apply(this,arguments);try{if(c&&choice._cur!==c&&c.opts&&c.opts[i]&&S){const T=norm(c.title);if(T.length>=4&&!SKIP.test(T)&&c.opts.length>=2){const k=hsh(T+'|'+c.opts.length),o=hsh(norm(c.opts[i].t)).slice(0,6);VQ.push([k,o]);if(VQ.length>60)VQ.shift();chvShow(k,o)}}}catch(e){}return r};window.choiceRun=ncr;try{choiceRun=ncr}catch(e){}}catch(e){}
function chvFlush(){try{if(!VQ.length||typeof api!=='function')return;const v=VQ.splice(0,VQ.length).slice(-40);Promise.resolve(api('chv',{v})).catch(()=>{})}catch(e){}}
// ---------- ตั้งค่า ----------
window.fx2Toggle=function(){const v=LS.get('murim_fx2',1)?0:1;LS.set('murim_fx2',v);toast(v?'✨ เปิดอนิเมชันระหว่างเล่น':'ปิดอนิเมชันระหว่างเล่น')};
setInterval(()=>{try{const m=$$('modal');if(!modalOpen||!m||m.querySelector('[data-fx2s]'))return;const h=m.querySelector('h3');if(!h||!/ตั้งค่า|⚙️/.test(h.textContent))return;const b=document.createElement('button');b.className='opt';b.setAttribute('data-fx2s',1);b.innerHTML=`✨ อนิเมชันระหว่างเล่น: <b>${LS.get('murim_fx2',1)?'เปิด':'ปิด'}</b><small>ขึ้นปีใหม่ · ตัวเลขลอย · ผลของตัวเลือก · ฉากเปิดเรื่อง · เหตุการณ์ใหญ่</small>`;b.onclick=()=>{fx2Toggle();b.querySelector('b').textContent=LS.get('murim_fx2',1)?'เปิด':'ปิด'};h.after(b)}catch(e){}},900);
// ---------- CSS ----------
const st=document.createElement('style');st.textContent=`
#fx2L{position:fixed;inset:0;pointer-events:none;z-index:99990;overflow:hidden}
#fx2L .fx2Big,#fx2L .fx2De{pointer-events:auto}
.fx2Yr{position:absolute;top:calc(env(safe-area-inset-top,0px) + 64px);left:50%;transform:translateX(-50%);text-align:center;animation:fx2YrA 1.5s ease forwards}
.fx2Yr small{display:block;margin-top:2px;font-size:12px;font-weight:700;color:#fff;text-shadow:0 1px 3px #000a}
.fx2YrC{position:relative;width:74px;height:46px;margin:auto;border-radius:12px;background:linear-gradient(180deg,#2a2236,#141020);border:2px solid var(--sc);box-shadow:0 6px 18px #0008,0 0 18px color-mix(in srgb,var(--sc) 50%,transparent);overflow:hidden;perspective:200px;font:800 28px/46px var(--px,inherit);color:#fff}
.fx2YrC span{position:absolute;inset:0;backface-visibility:hidden}.fx2YrC .o{animation:fx2Fo .55s .25s ease-in forwards;transform-origin:50% 100%}.fx2YrC .n{transform:rotateX(90deg);transform-origin:50% 0;animation:fx2Fn .5s .7s ease-out forwards;color:var(--sc)}
@keyframes fx2Fo{to{transform:rotateX(-90deg);opacity:.4}}@keyframes fx2Fn{to{transform:rotateX(0)}}
@keyframes fx2YrA{0%{opacity:0;transform:translate(-50%,-10px)}12%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-8px)}}
.fx2Tint{position:absolute;inset:0;animation:fx2Fade 1.3s ease forwards}@keyframes fx2Fade{0%{opacity:0}25%{opacity:1}100%{opacity:0}}
.fx2Petal{position:absolute;top:-20px;animation:fx2Fall 2.6s linear forwards;opacity:.9}@keyframes fx2Fall{to{transform:translate(30px,60vh) rotate(260deg);opacity:0}}
.fx2Num{position:absolute;top:118px;font-weight:900;font-size:16px;padding:2px 9px;border-radius:999px;background:#0d0b14cc;border:1px solid currentColor;text-shadow:0 1px 2px #000;animation:fx2Up 1.7s cubic-bezier(.2,.8,.3,1) both;white-space:nowrap}
.fx2Num.dn{animation-name:fx2Dn}@keyframes fx2Up{0%{opacity:0;transform:translateY(14px) scale(.7)}15%{opacity:1;transform:translateY(0) scale(1.08)}70%{opacity:1}100%{opacity:0;transform:translateY(-46px) scale(1)}}
@keyframes fx2Dn{0%{opacity:0;transform:translateY(-6px) scale(.7)}15%{opacity:1;transform:translateY(0) scale(1.08)}70%{opacity:1}100%{opacity:0;transform:translateY(34px)}}
.fx2P{position:absolute;left:50%;top:42%;width:7px;height:7px;border-radius:50%;box-shadow:0 0 8px currentColor;animation:fx2Bu 1.1s cubic-bezier(.1,.7,.3,1) forwards}@keyframes fx2Bu{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}}
.fx2Stamp{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%)}.fx2St{text-align:center;padding:12px 26px;border:3px double #ffd54a;border-radius:14px;background:radial-gradient(#3a2a0aee,#1a1206ee);color:#ffd54a;box-shadow:0 0 40px #ffd54a66;animation:fx2Sp 1.7s cubic-bezier(.2,1.6,.4,1) forwards}
.fx2St b{display:block;font-size:26px;letter-spacing:4px;white-space:nowrap;text-shadow:0 0 12px #ffb000}.fx2St small{display:block;color:#ffeec0;font-size:12px;margin-top:3px;max-width:260px}
@keyframes fx2Sp{0%{transform:scale(2.6) rotate(-8deg);opacity:0}18%{transform:scale(.95) rotate(-3deg);opacity:1}26%{transform:scale(1.04) rotate(-3deg)}80%{opacity:1}100%{opacity:0;transform:scale(1) rotate(-3deg)}}
.fx2Glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#ffd54a33,transparent 55%);animation:fx2Fade .9s ease forwards}
.fx2Vig{position:absolute;inset:0;box-shadow:inset 0 0 90px 30px #ff203877;animation:fx2Fade .9s ease forwards}
#game.fx2Shake{animation:fx2Sh .45s ease}@keyframes fx2Sh{0%,100%{transform:none}20%{transform:translate(-5px,2px)}40%{transform:translate(5px,-2px)}60%{transform:translate(-3px,1px)}80%{transform:translate(2px,0)}}
.fx2VsW{position:absolute;left:0;right:0;top:34%;height:88px;animation:fx2Fade 1.5s ease forwards}
.fx2Vs{position:relative;height:100%;display:flex;align-items:center;justify-content:center;gap:12px;background:linear-gradient(100deg,#1a3a8acc 0 48%,transparent 48% 52%,#8a1a2acc 52%);color:#fff;font-weight:900;text-shadow:0 2px 4px #000}
.fx2Vs .l,.fx2Vs .r{flex:1;font-size:17px;max-width:40%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.fx2Vs .l{text-align:right;animation:fx2Sl .35s ease-out}.fx2Vs .r{text-align:left;animation:fx2Sr .35s ease-out}
.fx2Vs b{font-size:38px;color:#ffd54a;font-style:italic;animation:fx2Sp2 .5s .15s cubic-bezier(.2,1.8,.4,1) both;text-shadow:0 0 16px #ff8a00}
@keyframes fx2Sl{from{transform:translateX(-120%)}}@keyframes fx2Sr{from{transform:translateX(120%)}}@keyframes fx2Sp2{from{transform:scale(3);opacity:0}}
.fx2Heart{position:absolute;bottom:-30px;animation:fx2Rise 2.4s ease-out forwards}@keyframes fx2Rise{0%{opacity:0;transform:translateY(0) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translateY(-70vh) scale(1.2) rotate(18deg)}}
.fx2NpW{position:absolute;left:50%;top:36%;animation:fx2Np 1.5s ease forwards}.fx2Np{transform:translate(-50%,-50%);background:#f2ead8;color:#1a1408;padding:10px 18px;border:2px solid #1a1408;box-shadow:6px 6px 0 #0008;font-family:serif;text-align:center;min-width:220px}
.fx2Np small{display:block;font-size:10px;letter-spacing:3px;border-bottom:1px solid #1a1408;margin-bottom:4px}.fx2Np b{font-size:19px}
@keyframes fx2Np{0%{transform:rotate(-540deg) scale(.1);opacity:0}30%{transform:rotate(-4deg) scale(1.05);opacity:1}38%{transform:rotate(-4deg) scale(1)}80%{opacity:1}100%{opacity:0}}
.fx2Big{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(#1a1430ee,#07050cf2);animation:fx2BigA 2.4s ease forwards;cursor:pointer}
.fx2BigIn{text-align:center;color:#fff;max-width:340px;padding:0 18px}.fx2BigIn .ic{font-size:54px;animation:fx2Sp2 .6s cubic-bezier(.2,1.8,.4,1)}.fx2BigIn .t{font-size:24px;font-weight:900;color:#ffd54a;letter-spacing:2px;margin:4px 0 8px;text-shadow:0 0 14px #ffb00088}
.fx2BigIn img{width:100%;image-rendering:pixelated;border-radius:10px;border:2px solid #ffd54a88;box-shadow:0 8px 30px #000a;animation:fx2Kb 2.4s ease-out}.fx2BigIn .c{margin-top:8px;font-size:14px;opacity:.92}.fx2BigIn .a{margin-top:3px;font-size:12px;color:#ffe9b0}.fx2BigIn small{display:block;margin-top:10px;opacity:.45;font-size:11px}
@keyframes fx2Kb{from{transform:scale(1.12)}}@keyframes fx2BigA{0%{opacity:0}10%{opacity:1}85%{opacity:1}100%{opacity:0}}
.fx2De{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#000;animation:fx2DeA 2.6s ease forwards;cursor:pointer}
.fx2DeIn{text-align:center;color:#ddd;filter:grayscale(1)}.fx2DeIn .soul{font-size:40px;color:#e8f0ff;text-shadow:0 0 20px #bcd4ff;animation:fx2Soul 2.6s ease-out forwards}.fx2DeIn .nm{font-size:24px;font-weight:800;letter-spacing:3px;margin-top:6px}.fx2DeIn .ag{opacity:.7;margin-top:2px}.fx2DeIn .cz{font-size:13px;opacity:.6;margin-top:8px;max-width:300px}
@keyframes fx2Soul{0%{transform:translateY(40px);opacity:0}30%{opacity:1}100%{transform:translateY(-60px);opacity:0}}@keyframes fx2DeA{0%{opacity:0}15%{opacity:1}80%{opacity:1}100%{opacity:0;visibility:hidden}}
.fx2Pct{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 150px);transform:translateX(-50%);padding:8px 14px 10px;border-radius:14px;background:#120f1cee;border:1px solid #7ad0ff66;color:#e8f4ff;font-size:13px;box-shadow:0 8px 24px #0009;white-space:nowrap;animation:fx2PcA 3.2s ease forwards;overflow:hidden}
.fx2Pct b{color:#7ad0ff;font-size:16px}.fx2Pct small{display:block;opacity:.65;font-size:11px;text-align:center}.fx2Pct::after{content:'';position:absolute;left:0;bottom:0;height:3px;width:var(--pc);background:linear-gradient(90deg,#7ad0ff,#b07aff)}
@keyframes fx2PcA{0%{opacity:0;transform:translate(-50%,16px)}10%{opacity:1;transform:translate(-50%,0)}85%{opacity:1}100%{opacity:0}}
#fx2End{margin:10px 0}.fx2Btns{display:flex;gap:8px;margin-bottom:10px}.fx2Btns button{flex:1;padding:10px 6px;font-size:14px}
.fx2G{border-radius:14px;padding:10px;background:linear-gradient(180deg,#ffffff0d,#ffffff05);border:1px solid #ffffff1a}.fx2GH{display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;font-size:13px}
.fx2GH .lg{font-size:11px;opacity:.8}.fx2GH .lg i{display:inline-block;width:9px;height:9px;border-radius:2px;margin:0 3px 0 6px;vertical-align:-1px}
.fx2G svg{width:100%;height:auto;margin-top:6px;overflow:visible}.fx2Ln{stroke-dasharray:1400;stroke-dashoffset:1400;animation:fx2Dr 1.8s ease forwards}@keyframes fx2Dr{to{stroke-dashoffset:0}}
.fx2Pin{cursor:pointer}.fx2Pin circle{transition:r .15s}.fx2GT{font-size:12px;margin-top:4px;min-height:18px;opacity:.85}
#fx2Reel{position:fixed;inset:0;z-index:100002;background:linear-gradient(160deg,var(--g1),var(--g2));display:flex;flex-direction:column;color:#fff}
#fx2Reel .bar{display:flex;gap:4px;padding:calc(env(safe-area-inset-top,0px) + 12px) 12px 6px}#fx2Reel .bar i{flex:1;height:3px;border-radius:2px;background:#ffffff33;overflow:hidden}#fx2Reel .bar b{display:block;height:100%;width:0;background:#fff}
#fx2Reel .st{flex:1;display:flex;align-items:center;justify-content:center;padding:16px;cursor:pointer}
#fx2Reel .sl{width:100%;max-width:420px;text-align:center;animation:fx2SlIn .5s ease}#fx2Reel .ph{border-radius:14px;overflow:hidden;border:2px solid #ffffff44;box-shadow:0 14px 40px #000a}#fx2Reel .ph img{display:block;width:100%;image-rendering:pixelated;animation:fx2Kb2 2.8s ease-out forwards}
#fx2Reel .ph.tx{aspect-ratio:240/84;display:flex;align-items:center;justify-content:center;font-size:44px;background:#00000040}
#fx2Reel .ag{margin-top:14px;font-size:14px;color:#ffe9b0;font-weight:800;letter-spacing:2px}#fx2Reel .cp{margin-top:4px;font-size:18px;font-weight:700;line-height:1.4}
#fx2Reel .fin{text-align:center;animation:fx2SlIn .6s ease}#fx2Reel .fin .nm{font-size:34px;font-weight:900;letter-spacing:2px}#fx2Reel .fin .ag{font-size:16px}#fx2Reel .fin .cz{margin:10px auto;max-width:320px;opacity:.8}#fx2Reel .fin small{opacity:.6}
#fx2Reel .ctl{display:flex;gap:8px;justify-content:center;padding:10px 12px calc(env(safe-area-inset-bottom,0px) + 14px)}
@keyframes fx2SlIn{from{opacity:0;transform:translateY(14px)}}@keyframes fx2Kb2{from{transform:scale(1)}to{transform:scale(1.1)}}
#fx2Af{position:fixed;inset:0;z-index:100002;background:radial-gradient(ellipse at 50% 20%,#2a2a3a,#06060a);display:flex;align-items:center;justify-content:center;color:#dde;animation:fx2SlIn .6s ease}
#fx2Af .in{max-width:400px;padding:22px;text-align:center}#fx2Af .h{font-size:18px;font-weight:800;margin-bottom:14px;letter-spacing:1px}
#fx2Af .ln{display:flex;gap:10px;text-align:left;padding:9px 0;border-bottom:1px dashed #ffffff1f;animation:fx2SlIn .7s ease}#fx2Af .ln b{flex:0 0 52px;color:#bcd4ff;font-size:13px}#fx2Af .ln span{font-size:14px;line-height:1.5}
`;document.head.appendChild(st);
try{if(typeof SYS_GUIDE!=='undefined'&&!SYS_GUIDE.some(g=>g.t==='✨ อนิเมชันและหน้าสรุปใหม่'))SYS_GUIDE.push({s:'base',nw:1,ic:'✨',t:'✨ อนิเมชันและหน้าสรุปใหม่',d:'ระหว่างเล่น: เลขอายุพลิกตอนขึ้นปีใหม่ · ตัวเลขเงิน/เลือด/ชื่อเสียงลอยขึ้น · ผลตำนานมีตราประทับ ผลร้ายจอสั่น · ฉาก VS ตอนดวล หัวใจตอนเรื่องรัก หนังสือพิมพ์ตอนข่าว · เหตุการณ์ใหญ่ (แต่งงาน มีลูก ได้ฉายา) เต็มจอ 2 วิ · ปิดได้ที่ ☰ → ตั้งค่า · หน้าสรุป: กราฟชีวิตละเอียดพร้อมหมุดเหตุการณ์ · 🎞️ ไฮไลต์ชีวิต (บันทึกรูปยาวลงสตอรี่ได้) · 👻 หลังจากคุณจากไป · 🌐 หลังเลือกเหตุการณ์จะบอกว่าผู้เล่นกี่ % เลือกเหมือนคุณ'})}catch(e){}
window._fx2={yearFx,outcomeFx,introFx,bigFx,deathFx,endExtras,afterLines,slides,chvShow,VQ,setCHV:d=>{CHV=d}};
})()}catch(e){console.error('mod-fx2',e)}
try{wReady('fx2')}catch(e){}
