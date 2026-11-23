// ============================================================
// /w/chron3.js 🗺️ เฟส 3 — แผนผังรอบ (ผู้ย้อนกาล) · 🌌 วันสิ้นกัลป์: เลือกสิ่งที่จะพาข้ามกัลป์ (แดนเทพ)
//  แผนผังรอบ: บันทึกทุกรอบที่ตาย (อายุ สาเหตุ พลัง เพื่อนที่ช่วยได้ บุญบาป) ไว้ใน S.rg.hist แล้ววาดเป็นเส้นเวลา เทียบว่ารอบไหนไปได้ไกลสุด
//  วันสิ้นกัลป์: ก่อนก้าวข้ามกัลป์ เลือกพาได้สิ่งเดียว แต่ละทางให้ผลต่างกัน และมีคนตามข้ามกัลป์มาในบางทาง
// ============================================================
try{(()=>{
const E=t=>{try{return esc(String(t))}catch(e){return String(t)}};
const tot=()=>{try{return total()}catch(e){return +S.power||0}};
const F=n=>{try{return fmt(n)}catch(e){return String(Math.round(n))}};
// ---------- 🗺️ แผนผังรอบ ----------
if(typeof rgRegress==='function'){const _r=rgRegress;rgRegress=function(cause){try{const G=S&&S.rg;if(G){G.hist=G.hist||[];const C=G.comp||[];G.hist.push({n:Math.max(1,G.loop|0),d:S.age|0,c:String(cause||'').replace(/<[^>]+>/g,'').slice(0,40),p:Math.round(tot()),sv:C.filter(c=>c.saved).length,dd:C.filter(c=>c.dead).length,k:Math.round(+S.karma||0),f:Math.round(+S.fame||0)});if(G.hist.length>40)G.hist.splice(0,G.hist.length-40)}}catch(e){console.error('rgHist',e)}return _r.apply(this,arguments)};window.rgRegress=rgRegress}
window.rgMap=function(){if(!S||!S.rg)return;const G=S.rg,H=G.hist||[],nC=(G.comp||[]).length;
 if(!H.length)return modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🗺️ แผนผังรอบ</h3><p>ยังไม่มีรอบที่จบ — ตายครั้งแรกเมื่อไหร่ แผนผังจะเริ่มบันทึก</p>`,'rgmap');
 const mxA=Math.max(...H.map(h=>h.d),S.age|0,40),mxP=Math.max(...H.map(h=>h.p),1),best=H.reduce((a,b)=>(b.sv*1000+b.d)>(a.sv*1000+a.d)?b:a,H[0]);
 const row=h=>`<div class="rmR${h===best?' best':''}"><span class="n">${h.n}</span><div class="rmB"><i style="width:${Math.max(6,h.d/mxA*100)}%"></i><em style="left:${Math.min(96,h.d/mxA*100)}%">💀</em></div><div class="rmT"><b>ตายอายุ ${h.d}</b> · ${E(h.c)||'—'}<small>⚡ ${F(h.p)} · 🤝 ช่วยได้ ${h.sv}/${nC}${h.dd?` · 🕯️ ${h.dd}`:''} · ${h.k>=0?'☯️ บุญ':'☯️ บาป'} ${Math.abs(h.k)}</small></div></div>`;
 const svTrend=H.length>=2?H[H.length-1].sv-H[0].sv:0,aTrend=H.length>=2?H[H.length-1].d-H[0].d:0;
 modal(`<button class="xbtn" onclick="closeM()">✕</button><h3>🗺️ แผนผังรอบ</h3><p class="tag2">ทุกรอบที่ผ่านมา · แถบยาวคือมีชีวิตอยู่ได้นาน · ⭐ คือรอบที่ไปได้ไกลที่สุด (ช่วยเพื่อนได้มากสุด แล้วดูอายุ)</p>
 <div class="rmS"><div><b>${H.length}</b><small>รอบที่ตาย</small></div><div><b>${best.n}</b><small>รอบที่ดีที่สุด</small></div><div><b>${svTrend>=0?'+':''}${svTrend}</b><small>เพื่อนที่ช่วยได้ เทียบรอบแรก</small></div><div><b>${aTrend>=0?'+':''}${aTrend}</b><small>อายุตอนตาย เทียบรอบแรก</small></div></div>
 <div class="rmL">${H.slice().reverse().map(row).join('')}<div class="rmR now"><span class="n">${Math.max(1,G.loop|0)}</span><div class="rmB"><i style="width:${Math.max(6,(S.age|0)/mxA*100)}%"></i></div><div class="rmT"><b>รอบนี้ · อายุ ${S.age|0}</b><small>⚡ ${F(tot())} · กำลังดำเนินอยู่</small></div></div></div>
 ${H.length>=3?`<p class="tag2" style="margin-top:8px">💡 ${H.slice(-3).every(h=>h.d<(best.d||0)-3)?'สามรอบล่าสุดตายเร็วกว่ารอบที่ดีที่สุด — ลองย้อนดูว่ารอบนั้นทำอะไรต่างไป':H.slice(-3).map(h=>h.c).every((c,i,a)=>c===a[0])?'สามรอบล่าสุดตายด้วยสาเหตุเดียวกัน — มีบางอย่างที่คุณยังไม่ได้แก้':'แต่ละรอบไปได้ต่างกัน — ความทรงจำกำลังสะสม'}</p>`:''}`,'rgmap')};
if(typeof openRegress==='function'){const _o=openRegress;openRegress=function(){const r=_o.apply(this,arguments);try{const m=$('modal');if(m&&!m.querySelector('.rmBtn')){const h=m.querySelector('h3');(h||m).insertAdjacentHTML(h?'afterend':'afterbegin',`<button class="gbtn rmBtn" style="width:100%;margin:6px 0" onclick="rgMap()">🗺️ แผนผังรอบ (${((S.rg&&S.rg.hist)||[]).length} รอบที่ผ่านมา)</button>`)}}catch(e){}return r};window.openRegress=openRegress}

// ---------- 🌌 วันสิ้นกัลป์: เลือกสิ่งที่จะพาข้าม ----------
if(typeof kalpaGate==='function'){const _g=kalpaGate;kalpaGate=function(){try{const K=kOf();if(S&&S.alive&&K&&K.n<8&&!K['cw'+K.n]){if(choice._cur)return setTimeout(kalpaGate,700);K['cw'+K.n]=1;
  const kids=(S.children||[]).length,go=()=>setTimeout(()=>{try{_g()}catch(e){console.error(e)}},400);
  choice('🌌 สิ่งเดียวที่ข้ามไปได้','จักรวาลหดตัวจนเหลือแค่แสงรอบตัวคุณ เสียงหนึ่งดังขึ้นจากความว่างเปล่า “กัลป์ใหม่มีที่ให้สิ่งเดียวนอกจากเจ้า เลือกเถิด”',[
   {t:'🌍 โลกมนุษย์บ้านเกิด',s:'ทุกชีวิตในโลกเดิมได้เกิดใหม่ในกัลป์หน้า',f(){S.karma=(+S.karma||0)+30;S.fame=(+S.fame||0)+5000;log('🌍 <b>คุณห่อโลกเล็กๆ ไว้ในอุ้งมือ</b> ทุกเสียงหัวเราะ ทุกหลุมศพ ทุกต้นไม้ที่เคยปลูก ข้ามกัลป์ไปพร้อมคุณ','myth',true);go()}},
   {t:'🙏 ผู้ศรัทธาทั้งหมด',s:'แสงศรัทธาทั้งหมดตามมา · ชื่อเสียงมหาศาล แต่พวกเขาจะเรียกร้องมากขึ้น',f(){S.fame=(+S.fame||0)+20000;S.karma=(+S.karma||0)-5;log('🙏 เสียงสวดนับล้านพันรอบตัวคุณเป็นเกราะแสง ในกัลป์หน้า พวกเขาจะเป็นกองทัพแรกของคุณ… และเจ้านายของคุณในบางวัน','myth',true);go()}},
   ...(kids?[{t:`👨‍👩‍👧 ลูกหลาน ${kids} คน`,s:'สายเลือดของคุณได้เริ่มต้นกัลป์ใหม่ด้วยกัน',f(){S.karma=(+S.karma||0)+15;try{(S.children||[]).forEach(c=>{if(c)c.kal=1})}catch(e){}log('👨‍👩‍👧 <b>คุณโอบลูกหลานทุกคนไว้</b> กัลป์หน้าจะมีตระกูลหนึ่งที่จำได้ว่าเคยเห็นจักรวาลดับ','myth',true);go()}}]:[]),
   {t:'⚔️ ศัตรูทุกคน',s:'พาศัตรูข้ามไปด้วย · กัลป์หน้าจะไม่เงียบเหงา',f(){S.power=(+S.power||0)+Math.round(tot()*.15);S.karma=(+S.karma||0)-10;K.foes=1;log('⚔️ คุณจับมือศัตรูทุกคนก่อนแสงดับ “กัลป์หน้า เรามาต่อกัน” พวกเขาหัวเราะพร้อมกัน','myth',true);go()}},
   {t:'🍃 ไม่พาอะไรเลย',s:'ข้ามไปตัวเปล่า · เบาที่สุด แข็งแกร่งที่สุด',f(){S.power=(+S.power||0)+Math.round(tot()*.25);S.int=(+S.int||0)+20;log('🍃 <b>คุณปล่อยทุกอย่าง</b> แม้แต่ความทรงจำบางส่วน ร่างที่ข้ามกัลป์ไปเบาราวขนนก และคมราวดาบ','myth',true);go()}}]);
  return}}catch(e){console.error('kalCarry',e)}return _g.apply(this,arguments)};window.kalpaGate=kalpaGate}
const st=document.createElement('style');st.textContent=`
.rmS{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}.rmS>div{text-align:center;padding:8px 4px;border-radius:10px;border:1px solid rgba(138,208,255,.4);background:rgba(20,30,50,.6)}.rmS b{display:block;font-size:18px;color:#8ad0ff}.rmS small{font-size:10.5px;opacity:.8}
.rmL{display:grid;gap:6px;max-height:55vh;overflow:auto}.rmR{display:grid;grid-template-columns:28px 1fr;grid-template-rows:auto auto;gap:2px 8px;align-items:center;padding:6px 8px;border-radius:10px;background:rgba(20,30,50,.5);border:1px solid transparent}.rmR.best{border-color:#ffe08a;background:linear-gradient(90deg,rgba(255,224,138,.15),rgba(20,30,50,.5))}.rmR.best .n::after{content:'⭐';font-size:11px}.rmR.now{border-color:#8ad0ff;border-style:dashed}
.rmR .n{grid-row:1/3;font-weight:800;color:#8ad0ff;text-align:center}.rmB{position:relative;height:10px;border-radius:5px;background:rgba(255,255,255,.08)}.rmB i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,#5c8dff,#8ad0ff)}.rmB em{position:absolute;top:-5px;font-style:normal;font-size:12px;margin-left:-6px}
.rmT{font-size:12.5px;line-height:1.35}.rmT small{display:block;font-size:11px;opacity:.75}`;document.head.appendChild(st);
})()}catch(e){console.error('chron3.js',e)}
