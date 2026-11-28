// ============================================================
// /w/tbfan.js 🎨 พื้นหลังหน้าแรกตอนเลือกหมวดแฟนตาซี — 3 ฉาก pixel × 4 ช่วงเวลา (เช้า กลางวัน เย็น กลางคืน ตามเวลาเครื่อง)
//  ⚔️ ต่างโลก: ปราสาทบนเนิน หมู่บ้าน กังหันลมหมุน ธงโบก มังกรบินผ่าน · กลางคืนพระจันทร์สองดวง หน้าต่างติดไฟ หิ่งห้อย
//  🔮 โลกเวทมนตร์: หอคอยจอมเวท ลูกแก้วเรืองแสง วงเวทหมุน เกาะลอยฟ้าลอยขึ้นลง คริสตัล · กลางคืนแสงออโรรา ดาวตก
//  🏰 อะคาเดมี่: อาคารเรียนหอนาฬิกา (เข็มเดินจริง) ธงประจำบ้าน ต้นไม้ในลาน โคมไฟ · ใบไม้/กลีบดอกตามฤดู
//  ต่อกับระบบพื้นหลังเดิมผ่าน window._tbWorld + tbExtraBuild/tbExtraDraw (ใช้ชื่อโลก beast/soul/loop เป็นช่องว่าง แล้วดักก่อนของเดิม)
// ============================================================
try{(function(){if(window._tbFanX)return;window._tbFanX=1;
const SLOT={iso:'beast',magic:'soul',aca:'loop'};
const PAL={iso:{dawn:['#3a3a78','#8a6aa0','#f0a08a','#ffd8a0'],day:['#3a86d8','#6ab0ee','#a8d8f8','#e8f8ff'],dusk:['#2a1e50','#7a3a70','#e0706a','#ffb860'],night:['#060a24','#121a48','#22285e','#383070']},
 magic:{dawn:['#2a2060','#6a4aa0','#d888c0','#ffd0e0'],day:['#5a6ae0','#8a8af0','#c8b8ff','#f4e8ff'],dusk:['#1e1040','#5a2a80','#c0509a','#ff98a0'],night:['#05031a','#120a3a','#24145a','#3a2070']},
 aca:{dawn:['#344070','#8a7aa8','#f0b098','#ffe2b8'],day:['#4a90e0','#7ab8f0','#b8e0fa','#f0faff'],dusk:['#2a2048','#784068','#e8806a','#ffc070'],night:['#080c22','#141c44','#24305c','#3a4070']}};
const B4=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>v/16);
const hx=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
const rgb=a=>`rgb(${a[0]|0},${a[1]|0},${a[2]|0})`;
function grad(x,W,H,pal,y1){const P=pal.map(hx),n=P.length-1,Q=10;const col=t=>{t=Math.max(0,Math.min(1,t))*n;const i=Math.min(n-1,Math.floor(t)),f=t-i;return P[i].map((v,j)=>v+(P[i+1][j]-v)*f)};
 for(let y=0;y<H;y++){const t=y/(y1||H)*Q,q=Math.floor(t),qf=t-q;const c0=rgb(col(q/Q)),c1=rgb(col((q+1)/Q));for(let xx=0;xx<W;xx++){x.fillStyle=qf>B4[(y&3)*4+(xx&3)]?c1:c0;x.fillRect(xx,y,1,1)}}}
function fanKey(){try{if(window._tbFanForce&&typeof modalOpen!=='undefined'&&modalOpen)return window._tbFanForce;window._tbFanForce=null;const P=document.getElementById('wPick');if(!P||!P.classList.contains('fanOn'))return null;const b=P.querySelector('.wcF button.on, .wcFb button.on');const t=b?b.textContent:'';return /เวท/.test(t)?'magic':/อะคาเดมี่|โรงเรียน/.test(t)?'aca':'iso'}catch(e){return null}}
setInterval(()=>{try{const T=document.getElementById('title');if(!T||!T.classList.contains('on'))return;const k=fanKey();if(k){window._tbFan=k;window._tbWorld=SLOT[k]}else if(window._tbFan){window._tbFan=null;window._tbWorld=undefined}}catch(e){}},300);
// ---------- วาดชิ้นส่วน ----------
function tower(x,cx0,by,w,h,wall,roof,roofH,win,night){x.fillStyle=wall;x.fillRect(cx0-(w>>1),by-h,w,h);x.fillStyle=roof;for(let r=0;r<roofH;r++){const ww=Math.max(1,Math.round((w+2)*(1-r/roofH)));x.fillRect(cx0-(ww>>1),by-h-r-1,ww,1)}x.fillStyle=win;for(let yy=by-h+3;yy<by-2;yy+=4)x.fillRect(cx0-1,yy,1,2);if(night){x.fillStyle='#ffd77a';x.fillRect(cx0-1,by-h+3,1,2)}}
function house(x,hx0,by,w,h,wall,roof,night,sr,s){x.fillStyle=wall;x.fillRect(hx0,by-h,w,h);x.fillStyle=roof;for(let r=0;r<(w>>1)+1;r++)x.fillRect(hx0-1+r,by-h-r,w+2-r*2,1);x.fillStyle=night&&sr(s)>.3?'#ffcf6a':'#3a2a2a';x.fillRect(hx0+1,by-h+2,1,1);if(w>4)x.fillRect(hx0+w-2,by-h+2,1,1)}
function tree(x,tx,ty,r,leaf,dark,disc){x.fillStyle='#3a2418';x.fillRect(tx,ty,1,r+1);disc(x,tx,ty-1,r,dark);disc(x,tx-1,ty-2,Math.max(1,r-1),leaf)}
function crystal(x,cx0,by,h,c1,c2){for(let r=0;r<h;r++){const ww=Math.max(1,Math.round(2*(1-Math.abs(r-h*.35)/(h*.65))));x.fillStyle=r<h*.35?c2:c1;x.fillRect(cx0-ww+1,by-r,ww,1)}}
function floatIsle(x,cx0,cy0,w,top,rk,sr,s){for(let r=0;r<Math.round(w*.8);r++){const k=1-r/(w*.8),ww=Math.round(w*k*k+1+sr(s+r)*1.5);x.fillStyle=r%3?rk:'#4a3a58';x.fillRect(cx0-ww,cy0+2+r,ww*2,1)}x.fillStyle=top;x.fillRect(cx0-w,cy0,w*2,3)}
// ---------- สร้างฉาก (ชั้นนิ่ง) ----------
function build(o,k){const{sx,fx,mx,nx,W,H,td,sn,L,mix,sr,disc,mist,ridge,pine}=o;const night=td==='night',dusk=td==='dusk',dawn=td==='dawn';const pal=PAL[k][td];L.ex={fan:k,night,dusk,dawn,td,sn};
 grad(sx,W,H,pal,H*.5);
 if(night){for(let i=0;i<Math.round(W*H/150);i++){const y=Math.round(sr(i*3.1+7)*H*.55),xx=Math.round(sr(i*5.7+3)*W);sx.fillStyle=sr(i)>.85?'#fff8e0':'#b8c0f0';sx.fillRect(xx,y,1,1)}}
 const U=Math.min(W,Math.round(H*.6));L.ex.U=U;const SH=Math.round(H*.13);L.ex.SH=SH;[fx,mx,nx].forEach(c=>{c.save();c.translate(0,-SH)});
 const far=mix(pal[2],'#3a3a6a',.4),mid=mix(pal[1],'#2a2440',.45),nr=mix(pal[0],'#0c0818',.72);
 if(k==='iso'){
  // พระอาทิตย์/พระจันทร์ (วาดในชั้นฟ้า)
  const sy=Math.round(H*(td==='day'?.12:dusk||dawn?.3:.12)),sxp=Math.round(W*.78);
  if(night){disc(sx,sxp,sy,Math.round(U*.06),'#f4ecd0','#c8d0ff');disc(sx,Math.round(W*.62),Math.round(H*.2),Math.round(U*.028),'#ff9a8a','#ff6a5a')}else disc(sx,sxp,sy,Math.round(U*.07),dusk?'#ffd27a':'#fff4d0',dusk?'#ffb06a':'#fff0c0');
  ridge(fx,W,H,Math.round(H*.44),Math.round(H*.12),2.4,far,mix(far,'#ffffff',night?.1:.35),1.3);mist(fx,W,Math.round(H*.41),Math.round(H*.06),pal[3],.45);
  // เนินปราสาท
  const ys=ridge(mx,W,H,Math.round(H*.53),Math.round(H*.08),5.1,mid,mix(mid,'#ffffff',.15),.7);
  const cX=Math.round(W*.7),cB=ys[Math.max(0,Math.min(W-1,cX))]+1,s=Math.max(1,Math.round(U/70));
  const wall=night?'#3a3550':mix('#c8c0b8',pal[2],.25),roof=night?'#3a2a6a':'#4a6ad8',roof2=night?'#5a2a3a':'#c84a4a',win=night?'#ffd77a':'#2a2236';
  mx.fillStyle=wall;mx.fillRect(cX-9*s,cB-7*s,18*s,7*s);for(let i=-9;i<9;i+=2)mx.fillRect(cX+i*s,cB-8*s,s,s);
  tower(mx,cX-9*s,cB,4*s,12*s,wall,roof,5*s,win,night);tower(mx,cX+9*s,cB,4*s,12*s,wall,roof,5*s,win,night);tower(mx,cX,cB-6*s,5*s,14*s,wall,roof2,6*s,win,night);
  mx.fillStyle=night?'#ffd77a':'#2a2236';mx.fillRect(cX-1*s,cB-4*s,2*s,4*s);L.ex.flags=[[cX,cB-26*s],[cX-9*s,cB-17*s],[cX+9*s,cB-17*s]];L.ex.s=s;
  // หมู่บ้านกลางเนิน
  const ys2=ridge(mx,W,H,Math.round(H*.6),Math.round(H*.05),8.3,mix(mid,'#3a6a3a',.35),mix(mid,'#8ae08a',.25),1.1);
  for(let i=0;i<7;i++){const hx0=Math.round(W*(.05+i*.065)+sr(i*13)*4),by=ys2[Math.max(0,Math.min(W-1,hx0))]+2;house(mx,hx0,by,4+(i%2),3+(i%3),night?'#4a4058':'#e8dcc0',night?'#5a2a3a':'#b84a3a',night,sr,i*7)}
  const wmX=Math.round(W*.48),wmB=ys2[Math.max(0,Math.min(W-1,wmX))]+1;mx.fillStyle=night?'#4a4058':'#e0d4bc';for(let r=0;r<10*s;r++){const ww=Math.round((2+r*.25)*s/1.4);mx.fillRect(wmX-(ww>>1),wmB-r,ww,1)}mx.fillStyle=night?'#ffd77a':'#3a2a2a';mx.fillRect(wmX,wmB-4*s,1,2);L.ex.mill=[wmX,wmB-10*s,Math.round(7*s)];
  // ใกล้: ทุ่งหญ้า + ต้นโอ๊ก + รั้ว
  nx.fillStyle=nr;nx.fillRect(0,Math.round(H*.66),W,H);for(let xx=0;xx<W;xx++){const y=Math.round(H*.66-Math.abs(Math.sin(xx*.04+1))*3);nx.fillRect(xx,y,1,4)}
  const leaf=mix(nr,'#2a5a2a',.35);tree(nx,Math.round(W*.06),Math.round(H*.64),Math.round(U*.07),mix(leaf,'#4a8a3a',.3),leaf,disc);tree(nx,Math.round(W*.93),Math.round(H*.63),Math.round(U*.09),mix(leaf,'#4a8a3a',.3),leaf,disc);
  nx.fillStyle=mix(nr,'#8a6a4a',.3);for(let xx=Math.round(W*.2);xx<W*.45;xx+=4){nx.fillRect(xx,Math.round(H*.665),1,4)}nx.fillRect(Math.round(W*.2),Math.round(H*.67),Math.round(W*.25),1);
 }
 else if(k==='magic'){
  const sy=Math.round(H*.16),sxp=Math.round(W*.25);if(night)disc(sx,sxp,sy,Math.round(U*.055),'#e8e0ff','#a890ff');else disc(sx,sxp,sy,Math.round(U*.065),dusk?'#ffc0e0':'#fff0ff','#e0b0ff');
  ridge(fx,W,H,Math.round(H*.47),Math.round(H*.16),3.7,mix(far,'#5a3a8a',.3),mix(far,'#d0b0ff',.25),1.6);mist(fx,W,Math.round(H*.43),Math.round(H*.07),mix(pal[3],'#ffffff',.2),.5);
  // เกาะลอยฟ้า (ชั้นกลาง เคลื่อนในชั้นวาด)
  L.ex.isles=[[.14,.33,.09,3],[.88,.4,.08,9],[.42,.26,.05,17]].map(([a,b,w,s0])=>{const c=document.createElement('canvas');const ww=Math.round(W*w);c.width=ww*2+4;c.height=Math.round(ww*.9)+14;const x=c.getContext('2d');floatIsle(x,ww+2,10,ww,night?'#5a8a7a':'#7ad0a0','#6a5a7a',sr,s0);crystal(x,ww+2-Math.round(ww*.3),10,6,night?'#8a6aff':'#b090ff','#f0e0ff');crystal(x,ww+2+Math.round(ww*.25),10,4,'#5ad0ff','#e0faff');return{c,x:Math.round(W*a)-ww-2,y:Math.round(H*b)-10,p:s0}});
  // หอคอยจอมเวท
  const tX=Math.round(W*.66),tB=Math.round(H*.64),s=Math.max(1,Math.round(U/62));const st=night?'#3a3058':'#8a80a8',st2=night?'#2a2240':'#6a6088';
  mx.fillStyle=st2;ridge(mx,W,H,Math.round(H*.6),Math.round(H*.04),6.6,mix(mid,'#3a2a5a',.4),mix(mid,'#a080d0',.2),.9);
  for(let r=0;r<34*s;r++){const ww=Math.round((7-r/(34*s)*2.5)*s);mx.fillStyle=(r>>2)%3===0?st2:st;mx.fillRect(tX-ww,tB-r,ww*2,1)}
  mx.fillStyle=night?'#5a2a9a':'#4a3aa8';for(let r=0;r<12*s;r++){const ww=Math.max(1,Math.round(6*s*(1-r/(12*s))));mx.fillRect(tX-ww,tB-34*s-r,ww*2,1)}
  mx.fillStyle=night?'#ffd77a':'#2a2040';for(let i=0;i<4;i++)mx.fillRect(tX-1+(i%2?2:-2),tB-8*s-i*7*s,1,2);
  L.ex.orb=[tX,tB-34*s-12*s-3,Math.max(2,Math.round(2.4*s))];L.ex.s=s;
  nx.fillStyle=nr;nx.fillRect(0,Math.round(H*.68),W,H);for(let i=0;i<9;i++){pine(nx,Math.round(W*(i/8.5)),Math.round(H*.7),Math.round(H*(.12+sr(i*5)*.1)),nr)}
  L.ex.mush=Array.from({length:7},(_,i)=>[Math.round(W*(.05+sr(i*9)*.9)),Math.round(H*.69)+Math.round(sr(i*3)*3),i]);
 }
 else{// aca
  const sy=Math.round(H*(td==='day'?.13:.28)),sxp=Math.round(W*.2);if(night)disc(sx,sxp,Math.round(H*.13),Math.round(U*.055),'#f4ecd0','#c8d0ff');else disc(sx,sxp,sy,Math.round(U*.07),dusk?'#ffd27a':'#fff4d0','#fff0c0');
  ridge(fx,W,H,Math.round(H*.48),Math.round(H*.07),1.9,far,mix(far,'#ffffff',.2),1.2);
  for(let i=0;i<6;i++){const bx=Math.round(W*(.04+i*.07)),bh=Math.round(H*(.04+sr(i*7)*.05));fx.fillStyle=mix(far,'#2a2a4a',.3);fx.fillRect(bx,Math.round(H*.47)-bh,3,bh);for(let r=0;r<4;r++)fx.fillRect(bx+1-Math.min(1,r>>1),Math.round(H*.47)-bh-4+r,1+Math.min(2,r>>1)*1,1)}
  mist(fx,W,Math.round(H*.45),Math.round(H*.05),pal[3],.4);
  const cX=Math.round(W*.6),gB=Math.round(H*.62),s=Math.max(1,Math.round(U/70));
  const wall=night?'#3a3a58':mix('#d8c8b0',pal[2],.2),wall2=night?'#2e2e48':mix('#b8a890',pal[2],.2),roof=night?'#2a3a6a':'#3a5a9a',win=night?'#ffd77a':'#5a6a8a';
  // ปีกอาคาร
  mx.fillStyle=wall2;mx.fillRect(cX-30*s,gB-12*s,60*s,12*s);mx.fillStyle=roof;for(let r=0;r<4*s;r++)mx.fillRect(cX-30*s+r,gB-12*s-r,60*s-r*2,1);
  L.ex.wins=[];for(let i=-27;i<27;i+=4){if(Math.abs(i)<6)continue;for(let j=0;j<2;j++){const wx=cX+i*s,wy=gB-10*s+j*5*s;mx.fillStyle=win;mx.fillRect(wx,wy,2*s,3*s);mx.fillStyle=wall;mx.fillRect(wx,wy,2*s,1);L.ex.wins.push([wx,wy+1,2*s,2*s])}}
  // ตึกกลาง + หอนาฬิกา
  mx.fillStyle=wall;mx.fillRect(cX-7*s,gB-22*s,14*s,22*s);mx.fillStyle=roof;for(let r=0;r<6*s;r++)mx.fillRect(cX-7*s+r,gB-22*s-r,14*s-r*2,1);
  mx.fillStyle=wall;mx.fillRect(cX-4*s,gB-40*s,8*s,18*s);mx.fillStyle=roof;for(let r=0;r<10*s;r++){const ww=Math.max(1,Math.round(5*s*(1-r/(10*s))));mx.fillRect(cX-ww,gB-40*s-r,ww*2,1)}
  disc(mx,cX,gB-34*s,Math.round(2.6*s),night?'#fff0c0':'#f4ecd8');mx.fillStyle=night?'#ffd77a':'#3a2a2a';mx.fillRect(cX-2*s,gB-8*s,4*s,8*s);
  L.ex.clock=[cX,gB-34*s,Math.round(2.4*s)];L.ex.flags=[[cX,gB-50*s],[cX-30*s,gB-16*s],[cX+30*s,gB-16*s]];L.ex.s=s;
  // ลานหน้าอาคาร
  nx.fillStyle=nr;nx.fillRect(0,Math.round(H*.66),W,H);nx.fillStyle=mix(nr,'#8a7a6a',.25);nx.fillRect(Math.round(cX-10*s),Math.round(H*.66),Math.round(20*s),H);
  const leafC=sn==='spring'?'#ff9ac8':sn==='autumn'?'#e07a3a':sn==='winter'?'#e8eef8':'#3a8a4a',leafD=mix(leafC,nr,.45);
  [[.08,.1],[.22,.07],[.9,.09],[.78,.06]].forEach(([a,r])=>tree(nx,Math.round(W*a),Math.round(H*.645),Math.round(U*r),mix(leafC,nr,night?.5:.15),leafD,disc));
  L.ex.lamps=[[Math.round(W*.36),Math.round(H*.66)],[Math.round(W*.48),Math.round(H*.66)],[Math.round(W*.72),Math.round(H*.66)]];L.ex.lamps.forEach(([lx,ly])=>{nx.fillStyle='#1a1424';nx.fillRect(lx,ly-9,1,9);nx.fillRect(lx-1,ly-10,3,1)});
  L.ex.leafC=leafC;
 }
 [fx,mx,nx].forEach(c=>c.restore());nx.fillStyle=nr;nx.fillRect(0,H-SH-2,W,SH+2)}
// ---------- ชั้นเคลื่อนไหว ----------
const FL=(cx,x0,y0,T,i,c)=>{cx.fillStyle='#2a1e18';cx.fillRect(x0,y0,1,6);for(let k=0;k<5;k++){const w=Math.round(Math.sin(T*5+i+k*.7)*1);cx.fillStyle=c;cx.fillRect(x0+1+k,y0+w,1,3)}};
function draw(o){const{cx,W,H,T,L,ox,oy,disc}=o,E=L.ex||{},k=E.fan;cx.save();cx.translate(0,-(E.SH||0));try{draw2(o,E,k)}catch(e){if(!draw._e){draw._e=1;console.error('tbfan draw',e)}}finally{cx.restore()}}
function draw2(o,E,k){const{cx,W,H,T,L,ox,oy,disc}=o;const night=E.night,mx0=ox(.5),my0=oy(.3),nx0=ox(.9),ny0=oy(.5);
 const P=L._fp||(L._fp={p:Array.from({length:Math.round(W*H/700)},()=>({x:Math.random()*W,y:Math.random()*H,v:.2+Math.random()*.5,p:Math.random()*6.28}))});
 // เมฆลอย (ไม่ใช่กลางคืน)
 if(!night){cx.globalAlpha=E.dusk||E.dawn?.55:.8;for(let i=0;i<4;i++){const y=Math.round(H*(.08+i*.07))+(E.SH||0),x0=((T*(2+i))+i*W*.37)%(W+40)-20;cx.fillStyle=E.dusk?'#ffc8b0':E.dawn?'#ffe0e0':'#ffffff';disc(cx,Math.round(x0),y,3+i%2,cx.fillStyle);disc(cx,Math.round(x0)+4,y+1,4,cx.fillStyle);disc(cx,Math.round(x0)+9,y,3,cx.fillStyle)}cx.globalAlpha=1}
 else{// ดาวกะพริบ + ดาวตก
  for(let i=0;i<14;i++){const a=.4+.6*Math.abs(Math.sin(T*1.7+i*1.3));cx.globalAlpha=a;cx.fillStyle='#ffffff';cx.fillRect(Math.round((i*37.3)%W),Math.round((i*19.7)%(H*.45))+(E.SH||0),1,1)}cx.globalAlpha=1;
  const c=(T%9)/9;if(c<.12){const kk=c/.12,x0=Math.round(W*(.2+kk*.5)),y0=Math.round(H*(.05+kk*.12))+(E.SH||0);for(let t=0;t<8;t++){cx.globalAlpha=1-t/8;cx.fillStyle='#fff8e0';cx.fillRect(x0-t*2,y0-t,1,1)}cx.globalAlpha=1}}
 if(k==='iso'){
  const s=E.s||1;
  if(E.mill){const[x0,y0,r]=E.mill,a=T*1.2;for(let b=0;b<4;b++){const ang=a+b*Math.PI/2;for(let t=2;t<r;t++){cx.fillStyle=night?'#6a6080':'#f4ecd8';cx.fillRect(x0+mx0+Math.round(Math.cos(ang)*t),y0+my0+Math.round(Math.sin(ang)*t),1,1)}}cx.fillStyle='#3a2a2a';cx.fillRect(x0+mx0,y0+my0,1,1)}
  (E.flags||[]).forEach(([x0,y0],i)=>FL(cx,x0+mx0,y0+my0,T,i,i?'#4a6ad8':'#d8343a'));
  const cyc=(T%22)/22;if(cyc<.35){const kk=cyc/.35,dx=Math.round(-20+kk*(W+40)),dy=Math.round(H*.2-Math.sin(kk*3.14)*H*.06),f=Math.sin(T*6)>0;cx.fillStyle=night?'#1a1030':'#2a1e3a';cx.fillRect(dx,dy,7,2);cx.fillRect(dx+7,dy-1,3,2);cx.fillRect(dx-4,dy+1,4,1);for(let w=0;w<5;w++)cx.fillRect(dx+1+w,dy-(f?w>>1:-(w>>1))-1,1,1)}
  if(!night&&!E.dusk)for(let i=0;i<3;i++){const bx=Math.round(((T*6+i*30)%(W+20))-10),by=Math.round(H*.3+i*5+Math.sin(T*2+i)*2),f=Math.sin(T*9+i)>0;cx.fillStyle='#2a2236';cx.fillRect(bx,by,1,1);cx.fillRect(bx-1,by-(f?1:0),1,1);cx.fillRect(bx+1,by-(f?1:0),1,1)}
  if(night)P.p.forEach((p,i)=>{if(i>16)return;p.x+=Math.sin(T+p.p)*.15;p.y=H*.62+Math.sin(T*.6+p.p)*H*.05;const a=.5+.5*Math.sin(T*3+p.p);cx.globalAlpha=a;cx.fillStyle='#e8ff8a';cx.fillRect(Math.round(p.x)%W,Math.round(p.y),1,1);cx.globalAlpha=1});
 }
 else if(k==='magic'){
  if(night){for(let b=0;b<3;b++){cx.globalAlpha=.16+.08*Math.sin(T*.8+b);cx.fillStyle=['#5affb0','#7a8aff','#d070ff'][b];for(let xx=0;xx<W;xx+=1){const y=Math.round(H*(.1+b*.05)+Math.sin(xx*.05+T*.6+b)*H*.03)+(E.SH||0);cx.fillRect(xx,y,1,Math.round(H*.05))}}cx.globalAlpha=1}
  (E.isles||[]).forEach((I,i)=>{cx.drawImage(I.c,I.x+ox(.35),I.y+Math.round(Math.sin(T*.8+I.p)*2)+oy(.2))});
  if(E.orb){const[x0,y0,r]=E.orb,X=x0+mx0,Y=y0+my0,pu=.5+.5*Math.sin(T*2.2);cx.globalAlpha=.25+.25*pu;disc(cx,X,Y,r+4,'#b080ff');cx.globalAlpha=1;disc(cx,X,Y,r,'#e8d8ff');cx.fillStyle='#ffffff';cx.fillRect(X-1,Y-1,1,1);
   const rr=r+8;for(let i=0;i<10;i++){const a=T*.7+i*.628;cx.globalAlpha=.7;cx.fillStyle=i%2?'#c8a0ff':'#7ad0ff';cx.fillRect(X+Math.round(Math.cos(a)*rr),Y+Math.round(Math.sin(a)*rr*.35),1,1)}cx.globalAlpha=1;
   if((T%6)<.18){cx.globalAlpha=.5;cx.fillStyle='#e0d0ff';for(let y=0;y<Y;y++)cx.fillRect(X,y,1,1);cx.globalAlpha=1}}
  P.p.forEach((p,i)=>{if(i>22)return;p.y-=p.v*.35;p.x+=Math.sin(T+p.p)*.15;if(p.y<H*.15){p.y=H*.7;p.x=Math.random()*W}cx.globalAlpha=.4+.5*Math.abs(Math.sin(T*2+p.p));cx.fillStyle=p.p>3?'#c8a0ff':'#7affd8';cx.fillRect(Math.round(p.x),Math.round(p.y),1,1);cx.globalAlpha=1});
  (E.mush||[]).forEach(([x0,y0,i])=>{const g=.5+.5*Math.sin(T*1.5+i);cx.globalAlpha=night||E.dusk?.6+.4*g:.5;cx.fillStyle=i%2?'#5ad0ff':'#c070ff';cx.fillRect(x0+nx0-1,y0+ny0-2,3,1);cx.fillStyle='#e8e0f0';cx.fillRect(x0+nx0,y0+ny0-1,1,1);cx.globalAlpha=1});
 }
 else if(k==='aca'){
  if(E.clock){const[x0,y0,r]=E.clock,X=x0+mx0,Y=y0+my0,d=new Date(),hA=((d.getHours()%12)+d.getMinutes()/60)/12*6.283-1.571,mA=d.getMinutes()/60*6.283-1.571;cx.fillStyle='#2a1e18';for(let t=0;t<r;t++)cx.fillRect(X+Math.round(Math.cos(mA)*t),Y+Math.round(Math.sin(mA)*t),1,1);for(let t=0;t<r*.6;t++)cx.fillRect(X+Math.round(Math.cos(hA)*t),Y+Math.round(Math.sin(hA)*t),1,1)}
  (E.flags||[]).forEach(([x0,y0],i)=>FL(cx,x0+mx0,y0+my0,T,i,['#d8343a','#3a7ad8','#3aa84a'][i%3]));
  if(night||E.dusk){(E.wins||[]).forEach(([x0,y0,w,h],i)=>{if(Math.sin(T*.4+i*2.1)>.85){cx.fillStyle='#5a4a3a';cx.fillRect(x0+mx0,y0+my0,w,h)}});(E.lamps||[]).forEach(([lx,ly],i)=>{const g=.6+.15*Math.sin(T*3+i);cx.globalAlpha=.22*g;disc(cx,lx+nx0,ly-11+ny0,5,'#ffcf6a');cx.globalAlpha=1;cx.fillStyle='#fff0b0';cx.fillRect(lx+nx0,ly-11+ny0,1,2)})}
  const lc=E.leafC||'#ff9ac8';P.p.forEach((p,i)=>{if(i>18)return;p.y+=p.v*.4;p.x+=Math.sin(T*.8+p.p)*.3+.12;if(p.y>H){p.y=-2;p.x=Math.random()*W}if(p.x>W)p.x=0;cx.fillStyle=E.sn==='winter'?'#ffffff':lc;cx.fillRect(Math.round(p.x),Math.round(p.y),1,1)});
  if(!night)for(let i=0;i<2;i++){const bx=Math.round(((T*5+i*45)%(W+20))-10),by=Math.round(H*.25+i*6),f=Math.sin(T*9+i)>0;cx.fillStyle='#2a2236';cx.fillRect(bx,by,1,1);cx.fillRect(bx-1,by-(f?1:0),1,1);cx.fillRect(bx+1,by-(f?1:0),1,1)}
 }}
// ---------- ดักก่อนของเดิม ----------
function hook(){if(typeof window.tbExtraBuild!=='function'||typeof window.tbExtraDraw!=='function'||window.tbExtraBuild._fan)return false;
 const _b=window.tbExtraBuild,_d=window.tbExtraDraw;
 window.tbExtraBuild=function(o){const k=window._tbFan;if(k&&o.wd===SLOT[k]){try{build(o,k);return}catch(e){console.error('tbfan build',e)}}return _b.apply(this,arguments)};window.tbExtraBuild._fan=1;
 window.tbExtraDraw=function(o){const E=o.L&&o.L.ex;if(E&&E.fan){try{draw(o)}catch(e){}return}return _d.apply(this,arguments)};return true}
if(!hook()){const iv=setInterval(()=>{if(hook())clearInterval(iv)},500)}
// เมนูก่อนเกิดของแฟนตาซี: โลกเวทมนตร์ → ฉากหอคอยจอมเวท · อะคาเดมี่ → อาคารเรียน · ต่างโลก → ปราสาท
{const iv=setInterval(()=>{if(typeof window.fanBornMenu!=='function'||window.fanBornMenu._tb)return;const _f=window.fanBornMenu;window.fanBornMenu=function(w){window._tbFanForce=w==='magic'?'magic':(w==='noble'||w==='aca')?'aca':'iso';return _f.apply(this,arguments)};window.fanBornMenu._tb=1;clearInterval(iv)},700)}
window._tbFanT={build,draw,fanKey};
})()}catch(e){console.error('mod-tbfan',e)}
try{wReady('tbfan')}catch(e){}
