// ============================================================
// /w/hud.js 🎨 HUD ใหม่ — โครงเดียว สกินเปลี่ยนตามโลก + โลกย่อยยุคปัจจุบัน
//  - ตั้ง body[data-hud] ตามโลกที่กำลังเล่น (ยุทธภพ/เทพเซียน/ยุคปัจจุบัน+โลกย่อย/จิตวิญญาณยุทธ์/ผู้ย้อนกาล/สัตว์/ทะลุฟ้า/ม่านหมอก)
//  - แต่ละสกินเปลี่ยนแค่ตัวแปรสี ฟอนต์หัวข้อ ทรงกรอบ — ตำแหน่งปุ่มเหมือนเดิมทุกโลก
//  - โลกย่อยยุคปัจจุบัน: วิดเจ็ตประจำโลก 1 ชิ้น (แผงซ้ายบนจอคอม / แถบใต้ฉากบนมือถือ) แตะแล้วเปิดสถานะโลก (wPanel)
//  - ทำงานเฉพาะธีมทองราตรี (body.royal) — ธีมอื่นที่ผู้เล่นเลือกไม่ถูกแตะ · ปิดได้ด้วย LS murim_hudOff=1
// ============================================================
(function(){
if(window._hud)return;
const LSg=(k,d)=>{try{return window.LS?LS.get(k,d):d}catch(e){return d}};
// [bg, card, raised, line, ink, muted, accent, accent2, track, displayFont, radius, light?]
const CH="'Charm','Itim',serif",TR="'Trirong','Itim',serif",CP="'Chakra Petch','Itim',sans-serif",MI="'Mitr','Itim',sans-serif",PX="'IBM Plex Sans Thai','Itim',sans-serif",KA="'Kanit','Itim',sans-serif";
const T={
 murim:['#120f0d','#1d1814','#241d18','#3a2e24','#efe6d6','#a89a86','#d9452b','#f2c14e','#2a221c',CH,14],
 xian:['#0f1a18','#16261f','#1c2f27','#2f4a3f','#eef3ea','#a3b8ad','#34c3a0','#bff3ff','#213a30',CH,20],
 god:['#14121a','#1e1b26','#262232','#4a4258','#f4efe2','#b3aac2','#b08a3a','#f2d78a','#2a2636',CH,18],
 mw:['#0e131c','#161d29','#1c2433','#2c3749','#e9eef6','#9ba7ba','#3b82f6','#ff4fa3','#222c3c',PX,16],
 soul:['#0c0b14','#15131f','#1c1929','#2e2742','#ece8f7','#a39cbd','#9b5cff','#6ef7c0','#221e33',CH,10],
 loop:['#17120c','#211a12','#2a2117','#45372a','#f0e6d6','#b0a28c','#f08a3c','#3fb6c9','#2e2419',TR,8],
 beast:['#101710','#18221a','#1f2b20','#33452f','#eaf1e3','#a5b59b','#4caf50','#ffb341','#243324',MI,22],
 sky:['#060920','#0d1336','#121a46','#22306a','#e6ecff','#9aa6d6','#7c3aed','#22d3ee','#1a2352',CP,4],
 fog:['#121416','#1c1f22','#24272a','#4d483d','#ece6da','#a7a293','#c2312f','#f4c542','#2c2f31',TR,4],
 'mw-hunter':['#0e1222','#161b30','#1c2240','#2a3358','#e8ecff','#9aa3c8','#5b4ce0','#38bdf8','#1f2645',CP,10],
 'mw-hunterhi':['#120d06','#1c150b','#251c0f','#3d2f17','#fbf3e2','#b9a888','#b45309','#fbbf24','#2a2010',KA,8],
 'mw-under':['#0d0d10','#16161c','#1d1d25','#2c2c38','#f1eef5','#a8a3b6','#be185d','#22d3ee','#23232d',KA,6],
 'mw-ghost':['#120c0a','#1d1410','#261a13','#3b2a20','#f3e7d8','#b8a48e','#b3261e','#e9c46a','#2e2019',CH,12],
 'mw-loop':['#1a1024','#24172f','#2d1d3a','#4a2d4f','#f6e8ee','#c2a9b8','#b4532a','#f2a058','#33213f',TR,14],
 'mw-zombie':['#0f130d','#171d14','#1e2619','#2e3a26','#eef3e6','#a7b59a','#4d7c0f','#a3e635','#232c1d',KA,6],
 'mw-tower':['#131313','#1b1b1b','#222222','#363636','#f2f2ee','#a6a69f','#e7e5dc','#9a978c','#2a2a2a',PX,2],
 'mw-game':['#071a2b','#0b2540','#0f2f50','#1b4466','#e3f4ff','#93b8d4','#0369a1','#22d3ee','#123a5e',CP,6],
 'mw-gatewon':['#0e0f10','#18191b','#1f2023','#303236','#ecedef','#a3a6ab','#b91c1c','#cbd5e1','#26272a',KA,4],
 'mw-doom':['#140806','#1f0e0a','#29130d','#43201a','#fbeee6','#c4a397','#c2410c','#fde047','#33170f',KA,10]
};
const HR=['E','D','C','B','A','S'];
/* S เป็น let ระดับบนของ app.js — ไม่ได้อยู่บน window */
const gS=()=>{try{return typeof S!=='undefined'?S:null}catch(e){return null}};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const n0=v=>(+v||0);
// วิดเจ็ตโลกย่อย: n=ชื่อ, f(M)→{big:[ค่า,ป้าย], bars:[[ป้าย,ค่า,เต็ม,เตือน?]], nums:[[ป้าย,ค่า]]}
const SUB={
 hunter:['โลกฮันเตอร์',M=>{const H=M.H||{};return{big:[H.r>=0?(HR[H.r]||'E'):'—',H.r>=0?'แรงก์':'ยังไม่ตื่น'],nums:[['ปาร์ตี้',(H.pt||[]).length],['ชิ้นส่วน',n0(H.mp)]]}}],
 hunterhi:['ฮันเตอร์ F–SSS',M=>{const H=M.H||{};return{big:[H.r>=0?(HR[H.r]||'E'):'—','แรงก์'],nums:[['ปาร์ตี้',(H.pt||[]).length],['ชิ้นส่วน',n0(H.mp)]]}}],
 under:['โลกใต้ดิน',M=>{const U=M.U||{};return{big:[n0(U.inf),'อิทธิพล'],bars:[['ความร้อนตำรวจ',n0(U.heat),100,1]],nums:U.crew?[['ก๊ก',String(U.crew)]]:[]}}],
 ghost:['โลกผีไทย',M=>{const G=M.G||{};return{big:[n0(G.ward),'บารมี'],bars:[['บารมี',n0(G.ward),500],['ผีตามหลอน',n0(G.bad),100,1]]}}],
 loop:['โลกวนลูป',M=>{const L=M.LP||{};return{big:[n0(L.mem),'ความทรงจำ'],bars:[['ความทรงจำ',n0(L.mem),300],['ความล้า',n0(L.tir),100,1]]}}],
 zombie:['โลกซอมบี้',M=>{const Z=M.Z||{};return{big:[n0(Z.inf)+'%','เสี่ยงติดเชื้อ'],bars:[['เสี่ยงติดเชื้อ',n0(Z.inf),100,1],['ทักษะรอด',n0(Z.surv),220]],nums:[['เสบียง',n0(Z.sup)],['ที่พัก',(Z.com?Z.com.length+1:1)+' คน']]}}],
 tower:['โลกหอคอย',M=>{const W=M.TW||{};return{big:[n0(W.fl),'ชั้น'],bars:[['สู่ยอด',n0(W.fl),220]]}}],
 game:['โลกระบบเกม',M=>{const G=M.GM||{};return{big:['Lv.'+(G.lv||1),'เลเวล'],bars:[['สู่เลเวลสูงสุด',G.lv||1,220]],nums:[['แต้มว่าง',n0(G.free)]]}}],
 gatewon:['โลกที่เกตชนะ',M=>{const G=M.GW||{};const w=G.wall!=null?G.wall:60;return{big:[w+'%','กำแพง'],bars:[['ความมั่นคงกำแพง',w,100]]}}],
 doom:['โลกวันสิ้นโลก',M=>{const D=M.DM||{};return{big:[D.left!=null?D.left+' ปี':'?','ก่อนอุกกาบาตชน'],bars:[['การเตรียมตัว',n0(D.prep),120]]}}]
};
function wOf(M){try{return window._wld&&window._wld.wOf?window._wld.wOf(M)||'normal':'normal'}catch(e){return'normal'}}
function key(){
 const S=gS();if(!S)return null;
 const g=document.getElementById('game');if(!g||!g.classList.contains('on'))return null;
 const M=S.mw;
 if(M&&M.sky)return'sky';if(M&&M.fog)return'fog';
 if(S.beastMode)return'beast';
 if(S.ch==='soul')return'soul';
 if(S.rg)return'loop';
 if(M){if(M.kid)return'mw';const w=wOf(M);return SUB[w]&&T['mw-'+w]?'mw-'+w:'mw'}
 if(S.xt)return'god';if(S.xian)return'xian';return'murim';
}
// ---------- CSS ----------
let fontsOn=0;
function fonts(){if(fontsOn)return;fontsOn=1;try{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Charm:wght@700&family=Trirong:wght@600;700&family=Chakra+Petch:wght@600;700&family=Mitr:wght@500;600&family=IBM+Plex+Sans+Thai:wght@500;600;700&family=Kanit:wght@600;700&display=swap';document.head.appendChild(l)}catch(e){}}
/* ระบบสีใหม่: ไล่ระดับพื้นผิว 7 ชั้น + ข้อความ 3 ระดับ (ดึงจากพาเลตต์โลก) */
function ramp(t){const L=!!t[11],up=L?'#000':'#fff',dn=L?'#fff':'#000';
 return `--hB0:color-mix(in srgb,${t[0]} ${L?92:70}%,${dn});--hP1:color-mix(in srgb,${t[1]} ${L?100:93}%,${up});--hP2:color-mix(in srgb,${t[1]} 82%,${t[0]});--hR1:color-mix(in srgb,${t[2]} ${L?97:90}%,${up});--hR2:color-mix(in srgb,${t[2]} ${L?93:82}%,${up});--hL2:color-mix(in srgb,${t[3]} 72%,${L?'#000':t[7]});--hT2:color-mix(in srgb,${t[4]} 80%,${t[5]});--mut:color-mix(in srgb,${t[5]} 78%,${t[4]});--hHi:color-mix(in srgb,${t[7]} 82%,${L?'#000':'#fff'});`}
function css(){
 let s='';
 for(const k in T){const t=T[k],sel=`html body[data-hud="${k}"]`;
  s+=`${sel}{--bg:${t[0]};--card:${t[1]};--w:${t[2]};--line:${t[3]};--ink:${t[4]};--mut:${t[5]};--hA:${t[6]};--hG:${t[7]};--hK:${t[8]};--hD:${t[9]};--hR:${t[10]}px;--grid:transparent;--pink:${t[7]};--pinkd:color-mix(in srgb,${t[7]} 70%,#000);--onacc:${t[11]?'#ffffff':t[0]};--good:color-mix(in srgb,#3fae5a 16%,${t[1]});--bad:color-mix(in srgb,#e0484f 18%,${t[1]});--epic:color-mix(in srgb,${t[7]} 14%,${t[1]});--myth:color-mix(in srgb,${t[6]} 20%,${t[1]});--peerb:${t[1]};--think:color-mix(in srgb,#4a7ad8 14%,${t[1]});--me:color-mix(in srgb,${t[6]} 14%,${t[1]});--c3:${t[7]};--c4:${t[6]};color-scheme:${t[11]?'light':'dark'};${ramp(t)}}\n`;
 }
 const S='html body[data-hud]';
 s+=`${S}{background:var(--bg)!important;background-image:none!important;color:var(--ink)}
${S} #game .box,${S} #game .dk-panel,${S} #dkChar,${S} #dkFn,${S} #goalBox,${S} #deskR .box{background:var(--card)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:0 1px 2px rgba(0,0,0,.18)!important;border-radius:var(--hR)!important}
${S} #game h5,${S} #dkTabs,${S} .dk-name,${S} .dk-age,${S} #modal[data-k="choice"] h3{font-family:var(--hD)}
${S} .dk-name{font-size:1.15em}
${S} .dkb-t{background:var(--hK)!important;border:0!important;border-radius:99px!important;overflow:hidden}
${S} .dkt{background:var(--w)!important;border:1px solid var(--line)!important;box-shadow:none!important;border-radius:calc(var(--hR)*.7)!important}
${S} #feed .bub{border:1px solid transparent!important;box-shadow:none!important;border-radius:calc(var(--hR)*.6 + 2px)!important}
${S} #feed .bub:not(.good):not(.bad):not(.epic):not(.myth):not(.sys):not(.world):not(.think){background:var(--w)!important}
${S} #feed .bub.peer,${S} #feed .bub.sum{background:transparent!important;border-color:transparent!important;color:var(--mut)!important}
${S} #feed .bub.epic{border-color:color-mix(in srgb,var(--hG) 55%,transparent)!important}
${S} #feed .bub.myth{border-color:var(--hA)!important}
${S} #feed .yr span{background:var(--card)!important;border:1px solid var(--line)!important;color:var(--mut)!important;box-shadow:none!important}
${S} #sceneBox{border:1px solid var(--line)!important;box-shadow:none!important;border-radius:var(--hR)!important;overflow:hidden}
${S} #game .cb{background:var(--w)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:none!important;border-radius:calc(var(--hR)*.7)!important;color:var(--ink)!important}
${S} #focus .fc{background:transparent!important;background-image:none!important;border:1px solid var(--line)!important;color:var(--ink)!important;box-shadow:none!important}
${S} #focus .fc.on{background:var(--hG)!important;border-color:var(--hG)!important;color:var(--onacc)!important}
${S} #dkFn button,${S} #game .dk-btns button{background:var(--w)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:none!important;color:var(--ink)!important;border-radius:calc(var(--hR)*.7)!important}
${S} #dkFn button:hover,${S} #game .dk-btns button:hover,${S} #game .cb:hover{border-color:var(--hG)!important}
${S} #mwHud,${S} #hintBar{background:var(--card)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:none!important;color:var(--ink)!important;border-radius:var(--hR)!important}
${S} #hintBox{background:color-mix(in srgb,var(--hG) 10%,var(--card))!important;border:1px solid color-mix(in srgb,var(--hG) 45%,transparent)!important;box-shadow:none!important;color:var(--ink)}
${S} #hintBox .hbGo{background:var(--hG)!important;color:var(--onacc)!important;box-shadow:none!important}
${S} #game .ybar{background:var(--hK)!important;border:0!important}
${S} #modal[data-k="choice"]{background:var(--card)!important;background-image:none!important;border:1px solid var(--hG)!important;box-shadow:0 18px 50px rgba(0,0,0,.4)!important;border-radius:var(--hR)!important;color:var(--ink)}
${S} #modal[data-k="choice"] .opt{background:var(--w)!important;background-image:none!important;border:1px solid var(--line)!important;box-shadow:none!important;border-radius:calc(var(--hR)*.7)!important;color:var(--ink)!important}
${S} #modal[data-k="choice"] .opt:hover{border-color:var(--hG)!important}
${S}[data-hud="fog"] #game .box,${S}[data-hud="fog"] #dkChar,${S}[data-hud="fog"] #dkFn,${S}[data-hud="fog"] #goalBox,${S}[data-hud="fog"] #deskR .box{border:3px double var(--line)!important}
${S}[data-hud="sky"] #modal[data-k="choice"],${S}[data-hud="mw-game"] #modal[data-k="choice"]{box-shadow:0 0 0 1px color-mix(in srgb,var(--hG) 30%,transparent),0 0 28px color-mix(in srgb,var(--hG) 22%,transparent)!important}
html body[data-hud]{--sHp:#ff6b6b;--sJoy:#ffc145;--sLife:#5cc8ff;--sGold:#ffd36b;--sPow:#b794ff;--sWis:#4fe3c1;--sFame:#ff8cc6;--sGood:#5fd38d;--sBad:#ff6b6b}
html body[data-hud]{background:linear-gradient(180deg,var(--bg),var(--hB0)) fixed!important}
html body[data-hud] #game .box,html body[data-hud] #game .dk-panel,html body[data-hud] #dkChar,html body[data-hud] #dkFn,html body[data-hud] #goalBox,html body[data-hud] #deskR .box,html body[data-hud] #mwHud,html body[data-hud] #hintBar{background:linear-gradient(180deg,var(--hP1),var(--hP2))!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 8px 22px rgba(0,0,0,.28)!important}
html body[data-hud] .dkb-t{background:var(--hB0)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.55)!important;height:10px!important}
html body[data-hud] .dkb-t>*{box-shadow:0 0 8px rgba(255,255,255,.12);border-radius:99px}
html body[data-hud] .dkb-l{color:var(--hT2)}
html body[data-hud] .dkt{--sc:var(--hG);background:linear-gradient(135deg,color-mix(in srgb,var(--sc) 16%,var(--hR1)),var(--hP2))!important;border:1px solid color-mix(in srgb,var(--sc) 30%,var(--line))!important}
html body[data-hud] .dkt .dkt-l{color:var(--mut)!important}
html body[data-hud] .dkt .dkt-v{color:var(--ink)!important}
html body[data-hud] .dkt .dkt-i{background:color-mix(in srgb,var(--sc) 20%,transparent);border-radius:8px}
html body[data-hud] .dkt[data-sc="gold"]{--sc:var(--sGold)}html body[data-hud] .dkt[data-sc="pow"]{--sc:var(--sPow)}html body[data-hud] .dkt[data-sc="wis"]{--sc:var(--sWis)}html body[data-hud] .dkt[data-sc="fame"]{--sc:var(--sFame)}html body[data-hud] .dkt[data-sc="joy"]{--sc:var(--sJoy)}html body[data-hud] .dkt[data-sc="bad"]{--sc:var(--sBad)}html body[data-hud] .dkt[data-sc="life"]{--sc:var(--sLife)}html body[data-hud] .dkt[data-sc="hp"]{--sc:var(--sHp)}
html body[data-hud] #feed .bub:not(.good):not(.bad):not(.epic):not(.myth):not(.sys):not(.world):not(.think):not(.peer):not(.sum){background:linear-gradient(180deg,var(--hR1),var(--w))!important;border-color:color-mix(in srgb,var(--line) 70%,transparent)!important}
html body[data-hud] #feed .bub.good{background:color-mix(in srgb,var(--sGood) 15%,var(--card))!important;border-color:color-mix(in srgb,var(--sGood) 45%,transparent)!important}
html body[data-hud] #feed .bub.bad{background:color-mix(in srgb,var(--sBad) 15%,var(--card))!important;border-color:color-mix(in srgb,var(--sBad) 45%,transparent)!important}
html body[data-hud] #feed .bub.good::before,html body[data-hud] #feed .bub.bad::before{display:inline-block;margin-right:7px;padding:0 7px;border-radius:99px;font-size:11px;font-weight:700;line-height:18px;vertical-align:1px}
html body[data-hud] #feed .bub.good::before{content:'ดี';background:color-mix(in srgb,var(--sGood) 22%,transparent);color:var(--sGood)}
html body[data-hud] #feed .bub.bad::before{content:'ร้าย';background:color-mix(in srgb,var(--sBad) 22%,transparent);color:var(--sBad)}
html body[data-hud] #feed .bub.epic{background:linear-gradient(135deg,color-mix(in srgb,var(--sGold) 20%,var(--card)),var(--card))!important;border-color:color-mix(in srgb,var(--sGold) 60%,transparent)!important}
html body[data-hud] #feed .bub.myth{background:linear-gradient(135deg,color-mix(in srgb,var(--hA) 24%,var(--card)),var(--card))!important}
html body[data-hud] #feed .bub.think{color:var(--mut)!important}
html body[data-hud] #feed .yr span{background:var(--hR1)!important;color:var(--hT2)!important}
html body[data-hud] #game .cb,html body[data-hud] #dkFn button,html body[data-hud] #game .dk-btns button{background:linear-gradient(180deg,var(--hR2),var(--hR1))!important}
html body[data-hud] #focus .fc.on{background:linear-gradient(180deg,var(--hHi),var(--hG))!important;box-shadow:0 2px 10px color-mix(in srgb,var(--hG) 40%,transparent)!important}
html body[data-hud] #modal[data-k="choice"]{background:linear-gradient(180deg,color-mix(in srgb,var(--hA) 20%,var(--hP1)) 0,var(--hP1) 140px,var(--hP2))!important;box-shadow:0 0 0 1px color-mix(in srgb,var(--hG) 18%,transparent),0 18px 50px rgba(0,0,0,.45)!important}
html body[data-hud] #modal[data-k="choice"] .opt{background:linear-gradient(180deg,var(--hR2),var(--hR1))!important;border-color:var(--hL2)!important}
html body[data-hud] #modal[data-k="choice"] .opt:hover{border-color:var(--hHi)!important;box-shadow:0 0 0 1px color-mix(in srgb,var(--hHi) 40%,transparent)!important}
html body[data-hud] .dk-name{color:var(--ink)}html body[data-hud] .dk-sub,html body[data-hud] .dk-realm{color:var(--hT2)}
#hudW{display:block;width:100%;text-align:left;font:inherit;color:var(--ink);background:var(--card);border:1px solid var(--hA);border-radius:var(--hR);padding:12px 14px;margin:0 0 12px;cursor:pointer}
#hudW:hover{border-color:var(--hG)}
#hudW .hwH{display:flex;align-items:center;gap:10px}
#hudW .hwN{font-family:var(--hD);font-weight:700;font-size:15px;color:var(--hG);flex:1;min-width:0}
#hudW .hwB{display:flex;flex-direction:column;align-items:flex-end;line-height:1.05}
#hudW .hwB b{font-size:22px;color:var(--ink);font-variant-numeric:tabular-nums}
#hudW .hwB small{font-size:11px;color:var(--mut)}
#hudW .hwR{display:flex;flex-direction:column;gap:3px;margin-top:8px}
#hudW .hwL{display:flex;justify-content:space-between;font-size:12px;color:var(--mut)}
#hudW .hwT{height:7px;border-radius:9px;background:var(--hK);overflow:hidden}
#hudW .hwT i{display:block;height:100%;border-radius:9px;background:var(--hG)}
#hudW .hwT i.w{background:var(--hA)}
#hudW .hwG{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
#hudW .hwG span{font-size:12px;padding:2px 9px;border-radius:99px;border:1px solid var(--line);color:var(--ink)}
#hudW .hwG span em{font-style:normal;color:var(--mut);margin-right:4px}
#hudW .hwX{font-size:11px;color:var(--mut);margin-top:8px}
body:not(.desk) #hudW{padding:8px 12px;margin:6px 0}
body:not(.desk) #hudW .hwR{flex-direction:row;align-items:center;gap:8px;margin-top:6px}
body:not(.desk) #hudW .hwR .hwL{flex:none;min-width:0}
body:not(.desk) #hudW .hwR .hwT{flex:1}
body:not(.desk) #hudW .hwX{display:none}
`;
 const st=document.createElement('style');st.id='hudCss';st.textContent=s;document.head.appendChild(st);
}
// ---------- widget ----------
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function wHTML(w,M){
 const d=SUB[w];let o;try{o=d[1](M)||{}}catch(e){o={}}
 let h=`<div class="hwH"><span class="hwN">${esc(d[0])}</span>`;
 if(o.big)h+=`<span class="hwB"><b>${esc(o.big[0])}</b><small>${esc(o.big[1])}</small></span>`;
 h+='</div>';
 (o.bars||[]).forEach(b=>{const p=cl(Math.round(n0(b[1])/b[2]*100),0,100);h+=`<div class="hwR"><div class="hwL"><span>${esc(b[0])}</span><span>${b[2]===100?n0(b[1])+' / 100':n0(b[1])}</span></div><div class="hwT"><i class="${b[3]?'w':''}" style="width:${p}%"></i></div></div>`});
 if(o.nums&&o.nums.length)h+=`<div class="hwG">${o.nums.map(x=>`<span><em>${esc(x[0])}</em>${esc(x[1])}</span>`).join('')}</div>`;
 h+='<div class="hwX">แตะเพื่อดูสถานะโลกทั้งหมด</div>';
 return h;
}
let lastH='';
function widget(k){
 let el=document.getElementById('hudW');
 const S=gS(),M=S&&S.mw;const w=k&&k.indexOf('mw-')===0?k.slice(3):null;
 if(!w||!M||!SUB[w]){if(el)el.remove();lastH='';return}
 const desk=document.body.classList.contains('desk');
 const anchor=desk?document.getElementById('dkChar'):document.getElementById('sceneBox');
 if(!anchor||!anchor.parentNode)return;
 if(!el){el=document.createElement('button');el.id='hudW';el.type='button';el.setAttribute('aria-label','สถานะโลกย่อย');el.addEventListener('click',()=>{try{window.wPanel&&window.wPanel()}catch(e){console.error(e)}})}
 if(el.previousElementSibling!==anchor||el.parentNode!==anchor.parentNode)anchor.insertAdjacentElement('afterend',el);
 const h=wHTML(w,M);if(h!==lastH){el.innerHTML=h;lastH=h}
}
const SC=[[/เงิน|ตำลึง|เหรียญ|เครดิต|ทอง/,'gold'],[/หนี้|ความเครียด|เครียด|ติดเชื้อ/,'bad'],[/ลมปราณ|พลัง|ร่างกาย|ชนะ|ยีน|สติ/,'pow'],[/ปัญญา|ทักษะ|ความรู้/,'wis'],[/เสน่ห์|ชื่อเสียง|ผู้ติดตาม/,'fame'],[/ความสุข/,'joy'],[/สุขภาพ|ชีวิต/,'hp'],[/กรรม|อายุ/,'life']];
function tagTiles(){document.querySelectorAll('.dkt').forEach(e=>{const l=e.querySelector('.dkt-l');const t=l?l.textContent:'';if(e._sct===t)return;e._sct=t;const m=SC.find(x=>x[0].test(t));if(m)e.dataset.sc=m[1];else delete e.dataset.sc})}
// ---------- loop ----------
let cur=null;
function tick(){
 try{
  const b=document.body;if(!b)return;
  let k=null;
  if(!LSg('murim_hudOff',0))k=key();
  if(k!==cur){cur=k;if(k){fonts();b.dataset.hud=k}else delete b.dataset.hud}
  widget(k);
  if(k)tagTiles();
 }catch(e){console.error('hud',e)}
}
css();tick();setInterval(tick,700);
window._hud={key,tick,T,SUB};
})();
