// ภาพโปสการ์ดพิกเซล 96×64 ของแต่ละโลก · วาดด้วยโค้ดล้วน · f = เฟรม (0/1) สำหรับขยับเบาๆ
(function(){
const W=96,H=64;
const BAY=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function mk(seed){let q=seed>>>0||1;return()=>{q=(q+0x6D2B79F5)>>>0;let t=q;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function P(ctx,seed){const R=mk(seed);
 const o={R,ctx,
  px(x,y,c){if(x<0||y<0||x>=W||y>=H)return;ctx.fillStyle=c;ctx.fillRect(x|0,y|0,1,1)},
  rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))},
  // ท้องฟ้าไล่สีเป็นแถบ + dither รอยต่อ
  sky(cols,y0=0,y1=H){const n=cols.length,hh=(y1-y0);for(let y=y0;y<y1;y++){const f=(y-y0)/hh*(n-1),i=Math.min(n-2,Math.floor(f)),t=f-i;const tt=t<.6?0:(t-.6)/.4;for(let x=0;x<W;x++){o.px(x,y,tt*16>BAY[y&3][x&3]+0.5?cols[i+1]:cols[i])}}},
  dith(x,y,w,h,c,a){for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(a*16>BAY[(y+j)&3][(x+i)&3])o.px(x+i,y+j,c)},
  circ(cx,cy,r,c){for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++)if(x*x+y*y<=r*r+r*.6)o.px(cx+x,cy+y,c)},
  ell(cx,cy,rx,ry,c){for(let y=-ry;y<=ry;y++)for(let x=-rx;x<=rx;x++)if((x*x)/(rx*rx)+(y*y)/(ry*ry)<=1.05)o.px(cx+x,cy+y,c)},
  ring(cx,cy,rx,ry,c,step=1){const n=Math.round((rx+ry)*4);for(let i=0;i<n;i+=step){const a=i/n*Math.PI*2;o.px(Math.round(cx+Math.cos(a)*rx),Math.round(cy+Math.sin(a)*ry),c)}},
  line(x0,y0,x1,y1,c){const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))||1;for(let i=0;i<=n;i++)o.px(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),c)},
  stars(n,cols,y1=H*.6){for(let i=0;i<n;i++){const x=Math.floor(R()*W),y=Math.floor(R()*y1);o.px(x,y,cols[i%cols.length])}},
  twinkle(n,c,y1,f){for(let i=0;i<n;i++){const x=Math.floor(R()*W),y=Math.floor(R()*y1),on=(i+f)%2;if(on){o.px(x,y,c);o.px(x-1,y,c+'88');o.px(x+1,y,c+'88');o.px(x,y-1,c+'88');o.px(x,y+1,c+'88')}else o.px(x,y,c)}},
  // สันเขา: ความสูงจากผลรวมคลื่น
  ridge(base,amp,freq,c,ph=0,hi){const hs=[];for(let x=0;x<W;x++){const h=base-amp*(Math.sin(x*freq+ph)*.6+Math.sin(x*freq*2.3+ph*1.7)*.3+Math.sin(x*freq*5.1+ph*.3)*.1);hs.push(Math.round(h));for(let y=Math.round(h);y<H;y++)o.px(x,y,c);if(hi)o.px(x,Math.round(h),hi)}return hs},
  peak(cx,top,w,c,snow,shade){for(let y=top;y<H;y++){const hw=Math.round((y-top)*w);for(let x=cx-hw;x<=cx+hw;x++)o.px(x,y,x>cx+hw*.15&&shade?shade:c)}if(snow)for(let y=top;y<top+5;y++){const hw=Math.round((y-top)*w);for(let x=cx-hw;x<=cx+hw;x++)if(y<top+3||(x+y)%3)o.px(x,y,snow)}},
  cloud(cx,cy,s,c,sh){const b=[[0,0,s],[-s*1.2,s*.35,s*.75],[s*1.2,s*.3,s*.8],[s*.5,-s*.45,s*.7]];if(sh)b.forEach(([x,y,r])=>o.circ(Math.round(cx+x),Math.round(cy+y+1),Math.round(r),sh));b.forEach(([x,y,r])=>o.circ(Math.round(cx+x),Math.round(cy+y),Math.round(r),c))},
  pine(x,base,h,c,c2){for(let j=0;j<h;j++){const w=Math.round((j/h)*h*.35)+((j%3===0)?1:0);for(let i=-w;i<=w;i++)o.px(x+i,base-h+j,i>0&&c2?c2:c)}o.rect(x,base,1,2,'#2a1a10')},
  bld(x,w,h,c,win,p=.4,base=H,edge){o.rect(x,base-h,w,h,c);if(edge)o.rect(x,base-h,1,h,edge);for(let y=base-h+2;y<base-2;y+=3)for(let i=x+1;i<x+w-1;i+=2)if(R()<p)o.px(i,y,typeof win==='function'?win():win)},
  roof(x,y,w,c,h=3){for(let j=0;j<h;j++)o.rect(x-h+j+1,y+j,w+2*(h-j)-2,1,c);o.px(x-h,y+h-1,c);o.px(x+w+h-1,y+h-1,c)},
  glow(cx,cy,r,c,a=.5){ctx.save();for(let k=3;k>=1;k--){ctx.globalAlpha=a*.3;o.circ(cx,cy,Math.max(1,Math.round(r*k/3)),c)}ctx.restore()},
  alpha(a,fn){ctx.save();ctx.globalAlpha=a;fn();ctx.restore()},
  person(x,y,c,hair){o.rect(x,y-6,2,4,c);o.rect(x,y-2,1,2,c);o.rect(x+1,y-2,1,2,c);o.rect(x,y-8,2,2,hair||'#f0c8a0')},
 };return o}
const S={};
// ---------- เส้นทางหลัก ----------
S.w0=(g,f)=>{g.sky(['#f8c878','#f0985a','#b85a6a','#5a3a6a'].reverse(),0,40);g.circ(70,20,6,'#ffe8b0');g.glow(70,20,12,'#fff0c0',.35);
 g.ridge(40,8,.06,'#6a4a7a',1);g.ridge(46,6,.09,'#4a3460',3);
 g.peak(22,14,1.1,'#3a2a48',null,'#2e2240');g.rect(17,16,10,2,'#8a2a2a');g.rect(18,18,8,6,'#5a1e1e');g.roof(17,13,10,'#2a1a1a',3);g.px(21,20,'#ffd060');g.px(23,20,'#ffd060');
 g.ridge(54,4,.12,'#2a1e30',5);for(let i=0;i<6;i++)g.pine(4+i*17+(i%2)*5,57,8+(i%3)*2,'#1a1424','#120e1a');
 g.rect(0,58,W,6,'#1a1222');g.rect(52,30,1,28,'#2a1a10');const fl=f?1:0;g.rect(53,30,7,4-fl,'#c83a3a');g.rect(53+7,31+fl,2,2,'#c83a3a');g.px(55,31,'#ffd060');
 g.person(40,58,'#2a2a3a','#1a1010');g.line(42,52,46,48,'#d8d8e8')};
S.w1=(g,f)=>{g.sky(['#a8e0ff','#d8f0ff','#fff4e0']);g.glow(76,12,14,'#fffbe0',.4);
 for(let i=0;i<5;i++)g.cloud(10+i*20,50+(i%2)*3,5,'#ffffff','#d0e4f4');g.rect(0,52,W,12,'#eef6ff');g.dith(0,48,W,6,'#ffffff',.5);
 const isl=(x,y,w,c)=>{g.ell(x,y,w,3,'#7ac86a');for(let j=0;j<8;j++){const hw=Math.round(w*(1-j/8));g.rect(x-hw,y+1+j,hw*2,1,j<2?'#8a6a4a':'#6a5038')}};
 isl(26,28+(f?1:0),12);isl(70,38-(f?1:0),9);isl(54,16,6);
 g.rect(22,20,8,6,'#f0e8d8');g.roof(22,17,8,'#3a8a7a',3);g.rect(24,15,4,2,'#3a8a7a');g.px(26,14,'#ffd060');g.rect(67,33,6,4,'#f0e8d8');g.roof(67,31,6,'#3a8a7a',2);
 g.line(31,24,52,15,'#9ad0f0');g.line(60,18,66,30,'#9ad0f0');for(let i=0;i<4;i++)g.px(40+i*9,8+((i+f)%2)*2,'#ffffff');
 g.person(46,46,'#e8f0ff','#2a2a3a');g.line(43,49,51,49,'#c0d8ff')};
S.w3=(g,f)=>{g.sky(['#3a2a6a','#8a5ab0','#f0b8d8','#ffe8c0']);for(let i=0;i<7;i++){const x=10+i*13;g.alpha(.16+(f&&i%2?.1:0),()=>g.rect(x,0,4,44,'#fff6c8'))}
 g.cloud(14,48,7,'#fff0f8','#e8c8e0');g.cloud(82,46,8,'#fff0f8','#e8c8e0');g.rect(0,52,W,12,'#fff4fa');g.dith(0,50,W,4,'#ffffff',.6);
 g.rect(30,30,36,18,'#f8e8b0');for(let i=0;i<6;i++)g.rect(32+i*6,32,2,16,'#ffd860');g.rect(28,28,40,3,'#e8b840');g.roof(34,22,28,'#e8a830',6);g.rect(46,16,4,6,'#ffd860');g.circ(48,13,2,'#fffbe0');g.glow(48,13,8,'#ffffff',.6);
 g.rect(44,40,8,8,'#c88a20');g.rect(26,48,44,2,'#e8d090');g.rect(22,50,52,2,'#d8c080');g.stars(10,['#ffffff','#fff0a0'],26)};
S.w2=(g,f)=>{g.sky(['#0e2a2a','#1e4a3a','#3a7a4a']);g.glow(76,12,14,'#e8f0c8',.35);g.circ(76,12,7,'#e8f0c8');g.circ(79,10,6,'#1e4a3a');g.ridge(38,6,.07,'#2a5a3a');
 for(let i=0;i<9;i++)g.pine(i*12-2,46,22+(i%3)*5,'#16402a','#10301e');g.ridge(50,3,.2,'#0c2416');
 for(let i=0;i<14;i++)g.pine(i*8-4+(i%2)*3,62,14+(i%4)*3,'#071510','#050e0a');
 const eyes=[[22,38],[60,44],[40,53]];eyes.forEach(([x,y],i)=>{const c=i===1?'#ff5a3a':'#ffd040';if(!(f&&i===2)){g.glow(x+2,y,5,c,.35);g.rect(x,y,2,1,c);g.rect(x+4,y,2,1,c)}});g.ell(70,58,10,4,'#0c1a12');g.rect(64,52,3,4,'#0c1a12');g.rect(74,52,3,4,'#0c1a12');g.px(66,53,'#ffffff');g.px(75,53,'#ffffff');
 g.rect(0,60,W,4,'#050a08');for(let i=0;i<10;i++)g.px(Math.floor(g.R()*W),20+Math.floor(g.R()*36),f?'#c8ff8a':'#7ad06a')};
// ---------- โหมดท้าทาย ----------
S.h=(g,f)=>{g.sky(['#1a0404','#4a0a0a','#a0200a','#ff6a1a']);g.ridge(38,10,.08,'#2a0606');g.ridge(46,6,.15,'#180404');
 g.rect(0,52,W,12,'#ff7a1a');for(let x=0;x<W;x++){g.px(x,52+((x+f*3)%7===0?1:0),'#ffd040');if((x*7+f*5)%11<2)g.px(x,55+(x%3),'#ffe880')}g.dith(0,47,W,6,'#ff4a0a',.5);
 g.rect(10,44,60,2,'#2a1414');for(let i=0;i<7;i++)g.rect(12+i*9,46,1,6,'#2a1414');
 g.glow(78,36,16,'#ff3a1a',.4);g.rect(66,22,5,30,'#2a1010');g.rect(85,22,5,30,'#2a1010');g.rect(64,18,28,5,'#1a0808');g.rect(62,16,32,2,'#3a1414');g.rect(71,23,14,29,'#5a0a06');g.rect(73,26,10,26,'#c82a0a');g.rect(75,30,6,22,'#ff7a1a');g.rect(77,36,2,16,'#ffd040');
 for(let i=0;i<3;i++){g.rect(66,26+i*8,5,1,'#4a1a1a');g.rect(85,26+i*8,5,1,'#4a1a1a')}g.rect(75,12,6,4,'#e8d8c8');g.px(76,13,'#1a0a0a');g.px(79,13,'#1a0a0a');g.rect(76,15,4,1,'#e8d8c8');
 g.person(30,44,'#1a1010','#0a0808');for(let i=0;i<8;i++)g.px(Math.floor(g.R()*W),Math.floor(g.R()*40),(i+f)%2?'#ffb040':'#ff5a1a')};
S.s=(g,f)=>{g.sky(['#0a0a24','#1a1a48','#3a2a68']);g.stars(30,['#ffffff','#a0b0ff'],40);
 const fw=(x,y,r,c)=>{for(let i=0;i<12;i++){const a=i/12*Math.PI*2;for(let k=r-3;k<=r;k++)g.px(Math.round(x+Math.cos(a)*k),Math.round(y+Math.sin(a)*k),k===r?'#ffffff':c)}};
 fw(24,16,f?8:6,'#ff6ac8');fw(70,12,f?6:9,'#ffd040');fw(52,26,f?5:4,'#6ad0ff');
 g.rect(0,50,W,14,'#140e20');g.ridge(52,3,.2,'#1e1430');
 g.rect(44,38,8,14,'#f0e8d8');g.rect(44,38,8,1,'#ffffff');g.rect(47,35,2,3,'#3a2a2a');g.ell(48,32-(f?1:0),2,3,'#ffd040');g.px(48,31-(f?1:0),'#ffffff');g.glow(48,32,12,'#ffb040',.45);
 g.rect(43,52,10,2,'#8a6a40');g.rect(46,45,1,4,'#e0d0c0')};
S.j=(g,f)=>{g.sky(['#2a2a3a','#3a3a4c','#4e4a5a']);
 g.bld(0,18,48,'#24222a','#3a3840',.1);g.bld(78,18,52,'#24222a','#3a3840',.1);g.bld(18,10,40,'#1c1a22','#3a3840',.1);g.bld(68,10,44,'#1c1a22','#3a3840',.1);
 g.rect(0,56,W,8,'#2a2826');for(let x=0;x<W;x+=7)g.px(x+(f?1:0),58,'#4a4a5a');
 for(let i=0;i<12;i++){const x=24+Math.floor(g.R()*44),y=50+Math.floor(g.R()*6);g.rect(x,y,2+Math.floor(g.R()*3),2,['#5a5650','#4a463e','#6a6456'][i%3])}
 g.ell(52,53,8,3,'#4a463e');g.alpha(.22,()=>{for(let y=0;y<54;y++){const w=3+Math.floor(y/6);g.rect(57-w,y,w*2,1,'#fff4c0')}});g.person(40,56,'#4a3a2a','#2a2020');g.rect(57,45,1,9,'#5a8a30');g.rect(55,44,2,1,'#7ad06a');g.rect(58,43,2,1,'#8ae07a');g.px(57,42,'#b0ff8a');g.glow(57,44,6,'#c8ff8a',.35);for(let i=0;i<5;i++)g.px(52+i*3,20+((i*7+f*4)%28),'#fff8d0')};
S.rg=(g,f)=>{g.sky(['#140a24','#2a1a48','#4a2a6a']);g.stars(24,['#c8b0ff','#ffffff'],60);g.glow(48,32,18,'#c8a0ff',.3);
 g.ring(48,32,26,26,'#5a3a8a',2);g.ring(48,32,22,22,'#7a5ab0');for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g.px(Math.round(48+Math.cos(a)*24),Math.round(32+Math.sin(a)*24),'#e8d8ff')}
 const hg=(c)=>{for(let j=0;j<10;j++){const w=Math.round(1+(9-j)*.8);g.rect(48-w,18+j,w*2,1,c)}for(let j=0;j<10;j++){const w=Math.round(1+j*.8);g.rect(48-w,36+j,w*2,1,c)}};
 hg('#8a7ab0');g.rect(40,16,16,2,'#c8a040');g.rect(40,46,16,2,'#c8a040');
 for(let j=0;j<4+f;j++){const w=Math.max(0,4-j);g.rect(48-w,24+j,w*2,1,'#ffd480')}g.px(48,28+f*3,'#ffd480');g.px(48,30+f*2,'#ffd480');for(let j=0;j<4;j++){const w=j+1;g.rect(48-w,42+j-(f?1:0),w*2,1,'#ffd480')}
 g.line(44,22,52,40,'#ffffff');g.line(52,22,47,33,'#e0d0ff')};
// ---------- โลกใหม่ ----------
S.l=(g,f)=>{g.sky(['#100a24','#2a1450','#5a2a80']);g.stars(20,['#ffffff','#e0c0ff'],50);
 g.ridge(50,6,.07,'#1e1236');g.rect(0,54,W,10,'#140c26');
 const cols=['#ffffff','#ffe040','#b070ff','#202020','#ff4a4a'];[0,1,2,3,4].forEach(i=>{const r=8+i*4,c=cols[i];g.ring(48,44,r+(f?1:0),Math.round((r+(f?1:0))*.35),c,i===3?2:1)});
 g.glow(48,40,16,'#c890ff',.4);g.person(47,52,'#e8e0ff','#2a1a3a');g.rect(46,44,4,2,'#ffffff')};
S.k=(g,f)=>{g.sky(['#020818','#0a1a3a','#1a2a5a']);g.twinkle(16,'#ffffff',40,f);g.stars(30,['#5cf2ff','#ffffff','#8a7aff'],44);g.ell(76,14,8,2,'#3a2a6a');g.circ(76,14,4,'#8a7aff');
 g.rect(0,40,W,24,'#141c2a');for(let i=0;i<8;i++){g.rect(i*12,34,10,6,'#1e2a3a');g.rect(i*12+1,35,8,1,'#2fd4c4')}
 g.bld(12,10,36,'#0c1420',()=>g.R()<.5?'#5cf2ff':'#2fd4c4',.5,40);g.bld(60,12,30,'#0c1420',()=>'#5cf2ff',.5,40);g.rect(46,6,4,34,'#0c1420');g.px(48,5,'#ff4ad8');g.glow(48,6,4,'#ff4ad8',.5);
 g.rect(0,56,W,8,'#0a0e18');g.line(0,56,95,56,'#2fd4c4');g.person(28,56,'#2a3a5a','#1a1a2a');g.line(10,8+(f?2:0),20,3+(f?2:0),'#ffffff')};
// ---------- ยุคปัจจุบัน ----------
const city=(g,base,cols,win,p,n=12)=>{let x=-2;while(x<W){const w=6+Math.floor(g.R()*8),h=10+Math.floor(g.R()*(base-14));g.bld(x,w,h,cols[Math.floor(g.R()*cols.length)],win,p,base);x+=w}};
S.mn=(g,f)=>{g.sky(['#7ac0f0','#a8d8f8','#ffe8c8']);g.cloud(20,10,4,'#ffffff');g.cloud(70,14,3,'#ffffff');
 city(g,46,['#8aa0c0','#7a90b0','#a0b0c8'],'#e8f4ff',.3);g.rect(0,40,W,3,'#5a6070');for(let x=0;x<W;x+=8)g.rect(x,43,2,5,'#5a6070');
 const tx=f?6:10;g.rect(tx,34,30,6,'#e8eef4');g.rect(tx,38,30,1,'#2a8a4a');for(let i=0;i<5;i++)g.rect(tx+2+i*6,35,4,2,'#3a5a7a');
 g.rect(0,48,W,16,'#5a5a62');g.rect(0,48,W,1,'#8a8a92');for(let x=0;x<W;x+=12)g.rect(x+(f?3:0),56,6,1,'#e8e8e8');
 g.rect(60,50,12,5,'#e84a3a');g.rect(62,48,7,3,'#e84a3a');g.rect(63,49,5,1,'#a8d8f8');g.px(62,55,'#1a1a1a');g.px(70,55,'#1a1a1a');g.person(30,52,'#3a4a8a','#2a1a10')};
S.n=(g,f)=>{g.sky(['#060c24','#0e1a44','#1a2a5a']);city(g,52,['#101a34','#0c1428','#141f3e'],()=>g.R()<.7?'#9fd0ff':'#ffe08a',.35);
 g.ell(48,30,15,19,'#0a1030');for(let i=0;i<4;i++)g.ring(48,30,14-i*3,18-i*4,['#3a8bff','#6ab0ff','#9a5bff','#d6ebff'][i],1);g.ell(48,30,3,5,'#ffffff');g.glow(48,30,20,'#3a8bff',.45);
 for(let i=0;i<8;i++){const a=(i/8+f*.06)*Math.PI*2;g.px(Math.round(48+Math.cos(a)*18),Math.round(30+Math.sin(a)*22),'#d6ebff')}
 g.rect(0,52,W,12,'#141826');g.rect(0,52,W,1,'#3a8bff');g.rect(20,57,W-40,1,'#e8e8a0');
 g.person(30,60,'#1a1a2a','#101018');g.line(32,54,36,50,'#9fd0ff');g.person(64,60,'#3a2a4a','#e8c070');
 g.rect(70,40,8,5,'#0a0e1a');g.rect(71,41,6,3,'#ff4a5a');g.px(72,42,'#ffffff');g.px(74,42,'#ffffff')};
S.u=(g,f)=>{g.sky(['#06020c','#12061a','#1e0a28']);g.bld(0,22,60,'#1a0e22','#2a1a30',.1);g.bld(74,22,60,'#1a0e22','#2a1a30',.1);g.bld(22,12,46,'#140a1c','#2a1a30',.1);g.bld(62,12,50,'#140a1c','#2a1a30',.1);
 const sign=(x,y,w,c,on)=>{if(on)g.glow(x+w/2,y+3,w/2+4,c,.35);g.rect(x,y,w,7,'#0a0410');const k=on?c:c+'60';g.rect(x,y,w,1,k);g.rect(x,y+6,w,1,k);g.rect(x,y,1,7,k);g.rect(x+w-1,y,1,7,k);for(let i=2;i<w-2;i+=3){g.rect(i+x,y+2,2,1,k);g.rect(i+x+(i%2),y+4,1,1,k)}};
 sign(3,18,14,'#ff3fa4',1);sign(76,26,16,'#30e0ff',!f);sign(24,30,9,'#ffd040',1);sign(64,14,9,'#a66bff',f);
 g.rect(0,50,W,14,'#0e0814');for(let i=0;i<14;i++){const x=Math.floor(g.R()*W);g.rect(x,52+Math.floor(g.R()*8),1,2,i%2?'#ff3fa4':'#30e0ff')}
 for(let i=0;i<60;i++){const x=Math.floor(g.R()*W),y=Math.floor(g.R()*50);g.px(x,(y+f*3)%50,'#6a6a9a');g.px(x,(y+1+f*3)%50,'#4a4a7a')}
 g.person(46,54,'#101014','#0a0a0e');g.rect(44,47,6,1,'#202028');g.rect(52,52,10,4,'#101018');g.px(61,53,'#ff3a3a')};
S.o=(g,f)=>{g.sky(['#020806','#06140e','#0e2018']);g.circ(78,12,6,'#f0e8c0');g.glow(78,12,10,'#f0e8c0',.25);
 g.rect(0,50,W,14,'#0a140e');for(let i=0;i<30;i++)g.px(Math.floor(g.R()*W),50+Math.floor(g.R()*14),'#14281a');
 g.rect(14,20,8,32,'#1e1610');g.rect(16,20,3,32,'#2a2016');g.ell(18,18,16,10,'#0e2216');g.ell(12,14,9,6,'#12301e');g.ell(26,16,9,6,'#0c1e14');
 for(let i=0;i<4;i++){const y=34+i*3;g.rect(13,y,10,1,['#ff4a8a','#ffd040','#4ad0ff','#ffffff'][i])}
 g.rect(56,38,10,8,'#c8b890');g.roof(56,35,10,'#b03030',3);g.rect(59,41,4,5,'#3a2a1a');g.rect(60,46,2,6,'#8a7a5a');g.rect(55,51,12,1,'#8a7a5a');g.px(61,43,'#ffd060');
 const lamp=(x,y)=>{g.rect(x,y,1,3,'#3a2a1a');g.rect(x-1,y+3,3,4,'#ffb340');g.glow(x,y+5,6,'#ffb340',.4)};lamp(40,26);lamp(82,30);
 const wisp=(x,y)=>{g.circ(x,y,1,'#9ff0ff');g.glow(x,y,5,'#9ff0ff',.5);g.px(x,y+2,'#5ac0d0')};wisp(34,40-f*2);wisp(74,22+f*2);
 g.glow(28,42,8,'#c8ffe8',.3);g.alpha(.85,()=>{g.rect(25,38,6,14,'#e8f4ee');g.rect(24,46,8,6,'#e8f4ee');g.rect(26,34,4,4,'#d8e8e0');g.rect(25,33,6,2,'#0a0a0a');g.rect(25,35,1,8,'#0a0a0a');g.rect(30,35,1,8,'#0a0a0a');g.px(27,36,'#0a0a0a');g.px(29,36,'#0a0a0a')});g.alpha(.5,()=>g.rect(24,52,8,1,'#c8ffe8'))};
S.p=(g,f)=>{g.sky(['#f0d0a0','#f8e0b8']);g.rect(0,0,W,40,'#e8c898');g.rect(0,40,W,24,'#8a6a4a');for(let x=0;x<W;x+=8)g.rect(x,40,1,24,'#7a5a3a');
 g.rect(62,6,24,20,'#a8d8f8');g.rect(61,5,26,1,'#6a4a2a');g.rect(61,26,26,1,'#6a4a2a');g.rect(73,6,1,20,'#6a4a2a');g.circ(70,12,3,'#fff4c0');
 g.rect(8,36,40,12,'#f0f0f8');g.rect(8,34,40,3,'#c8d0e8');g.rect(10,30,10,6,'#ffffff');g.rect(6,32,3,18,'#7a5a3a');g.rect(20,38,24,8,'#7ab0e8');
 g.circ(60,34,7,'#ff5a4a');g.circ(60,34,5,'#fff8f0');g.px(55,27,'#ff5a4a');g.px(65,27,'#ff5a4a');g.rect(54,26,3,2,'#ff5a4a');g.rect(64,26,3,2,'#ff5a4a');
 g.line(60,34,60,30,'#1a1a1a');g.line(60,34,60,38,'#1a1a1a');g.rect(57,42,6,2,'#3a2a2a');
 if(f){g.px(52,24,'#ff5a4a');g.px(68,24,'#ff5a4a');g.px(51,22,'#ff5a4a');g.px(69,22,'#ff5a4a')}
 g.rect(60,46,18,6,'#3a3a4a');g.rect(61,47,16,4,'#5cf2c4');g.rect(64,48,2,2,'#0a3a2a');g.rect(68,48,2,2,'#0a3a2a');g.px(67,48,'#0a3a2a');g.px(67,49,'#0a3a2a');
 g.ring(24,18,8,8,'#c09060');g.line(24,18,24,12,'#c09060');g.line(24,18,28,18,'#c09060');g.line(18,12,16,10,'#c09060')};
S.z=(g,f)=>{g.sky(['#3a2a3a','#7a4a3a','#d08a4a','#e8b86a']);g.circ(70,30,7,'#ffe0a0');g.glow(70,30,12,'#ffd080',.3);
 g.bld(4,30,40,'#3a3a34','#5a5a50',.15);g.rect(4,24,30,4,'#2a2a24');g.rect(8,24,20,3,'#c84a3a');g.rect(12,25,12,1,'#ffffff');for(let i=0;i<5;i++)g.rect(7+i*6,34,4,3,'#1a1a18');g.line(20,36,30,46,'#1a1a18');
 g.bld(66,14,44,'#34342e','#5a5a50',.1);g.bld(80,16,36,'#2e2e28','#5a5a50',.1);
 g.rect(0,50,W,14,'#3a3830');g.rect(40,46,18,6,'#6a6a7a');g.rect(44,43,10,4,'#5a5a6a');g.px(41,52,'#1a1a1a');g.px(55,52,'#1a1a1a');g.line(40,47,46,52,'#1a1a1a');
 for(let x=0;x<W;x++){const y=48+Math.round(Math.sin(x*.4)*1);g.px(x,y,(x>>2)%2?'#ffd23a':'#141414')}
 const zz=(x,c,ph)=>{g.rect(x,52,3,6,c);g.rect(x,49,3,3,'#9ac08a');g.rect(x+3,53+ph,3,1,'#9ac08a');g.px(x,58,c);g.px(x+2,58+ph,c);g.px(x+1,50,'#ff3a3a')};zz(66,'#4a5a3a',f);zz(78,'#5a4a3a',1-f);zz(88,'#3a4a5a',f);
 g.person(22,60,'#3a4a2a','#2a1a10');g.line(24,55,30,55,'#2a2a2a');g.line(30,55,40-f*6,40+f*2,'#fff8c0')};
S.t=(g,f)=>{g.sky(['#1a1440','#4a3a8a','#c08ad0','#ffd0a0']);g.stars(10,['#ffffff'],20);
 g.cloud(20,40,6,'#f0d8e8','#c8a8d0');g.cloud(78,44,7,'#f0d8e8','#c8a8d0');
 const tw=(y,w,c)=>g.rect(48-w,y,w*2,64-y,c);tw(8,6,'#3a3050');tw(20,8,'#4a3e64');tw(34,10,'#3a3050');tw(48,12,'#4a3e64');for(let y=12;y<64;y+=5)for(let x=-4;x<=4;x+=4)g.px(48+x,y,(y+x+f*5)%3?'#ffc23a':'#7a6cff');
 for(let y=20;y<64;y+=14)g.rect(48-(y>40?12:y>30?10:8)-1,y,(y>40?12:y>30?10:8)*2+2,1,'#ffc23a');
 g.rect(47,0,2,8,'#ffc23a');g.circ(48,2,1,'#ffffff');g.glow(48,3,8,'#ffe880',.6);
 g.cloud(40,52,6,'#f8e8f0','#d8b8d8');g.cloud(60,54,6,'#f8e8f0','#d8b8d8');g.rect(0,58,W,6,'#f0dce8')};
S.e=(g,f)=>{g.sky(['#7ac8ff','#c0e8ff']);g.cloud(14,10,3,'#ffffff');g.cloud(56,8,4,'#ffffff');
 g.rect(0,44,W,20,'#5ac84a');for(let x=0;x<W;x+=4)for(let y=44;y<64;y+=4)if((x+y)%8===0)g.rect(x,y,2,2,'#4ab83a');g.rect(36,44,24,20,'#d8b878');
 g.rect(6,30,14,14,'#e8d8b8');g.roof(6,26,14,'#c84a3a',4);g.rect(11,36,4,8,'#6a4a2a');g.rect(70,34,6,10,'#8a5a2a');g.circ(73,30,6,'#3aa83a');g.circ(73,30,4,'#4ac84a');
 const win=(x,y,w,h)=>{g.rect(x,y,w,h,'#0c0a2acc');g.rect(x,y,w,1,'#a66bff');g.rect(x,y+h-1,w,1,'#a66bff');g.rect(x,y,1,h,'#a66bff');g.rect(x+w-1,y,1,h,'#a66bff')};
 win(54,6,34,22);g.rect(57,10,14,2,'#ff4a5a');g.rect(57,14,10,2,'#4aa8ff');g.rect(57,18,20,1,'#3affb0');g.rect(57,22,6,2,'#ffffff');g.rect(65,22,6,2,'#ffffff');g.rect(74,10,10,8,'#3affb0');g.rect(76,12,6,4,'#0c0a2a');
 win(24,6,22,8);g.rect(27,9,16,2,f?'#ffd040':'#ffffff');
 g.person(46,54,'#3a5ac8','#2a1a10');g.rect(52,48,5,5,'#e8c040');g.px(54,46-f,'#ffffff');g.px(53,45-f,'#ffffff');g.px(55,45-f,'#ffffff');
 g.rect(26,52,6,6,'#5a9a3a');g.px(27,53,'#ffffff');g.px(30,53,'#ffffff');g.rect(26,50,6,1,'#ff4a5a')};
S.q=(g,f)=>{g.sky(['#1a0404','#4a0a0a','#a02a1a','#e05a2a']);g.circ(18,14,5,'#ffb080');
 g.ell(78,20,9,13,'#1a0606');for(let i=0;i<3;i++)g.ring(78,20,8-i*3,12-i*4,['#ff3a2a','#ff8a3a','#ffd0a0'][i]);g.glow(78,20,14,'#ff3a2a',.4);
 for(let i=0;i<10;i++){const x=56+Math.floor(g.R()*36),y=30+Math.floor(g.R()*12);g.rect(x,y,2,2,'#1a0606');g.px(x,y,'#ff3a2a')}
 g.ridge(44,3,.2,'#2a0808');g.rect(0,40,W,24,'#3a3c46');for(let x=0;x<W;x+=8)g.rect(x,36,5,4,'#3a3c46');for(let y=42;y<64;y+=4)for(let x=(y/4)%2*4;x<W;x+=8)g.rect(x,y,7,1,'#2a2c34');g.rect(0,40,W,1,'#5a5e6a');
 g.rect(40,46,16,18,'#1a1a20');g.ell(48,46,8,5,'#1a1a20');g.rect(42,48,12,16,'#2a1a10');
 g.rect(20,22,1,14,'#c8c8d0');g.rect(21,22,8,5-(f?1:0),'#3a8aff');g.px(23,24,'#ffffff');g.rect(70,28,1,8,'#c8c8d0');g.rect(71,28,6,4,'#3a8aff');
 g.person(30,40,'#4a5a3a','#1a1a1a');g.person(62,40,'#4a5a3a','#1a1a1a');g.px(f?33:34,33,'#ffe080')};
S.y=(g,f)=>{g.sky(['#2a0408','#7a1010','#e04a1a','#ffb04a']);
 const mx=70-(f?3:0),my=14+(f?3:0);g.glow(mx,my,14,'#ffd080',.45);for(let i=0;i<26;i++){g.line(mx+i,my-i,mx+i+2,my-i,['#ffffff','#ffe080','#ff8a2a','#e04a1a','#7a1010'][Math.min(4,Math.floor(i/5))])}g.circ(mx,my,5,'#fff0c0');g.circ(mx,my,4,'#ff8a2a');g.circ(mx-1,my+1,3,'#5a3030');g.circ(mx-1,my+1,2,'#3a2020');
 city(g,50,['#2a0a0a','#3a1010','#1e0606'],'#ffb04a',.25);g.rect(0,50,W,14,'#1a0606');
 g.rect(6,54,22,10,'#3a3a3a');g.ell(17,54,11,4,'#4a4a4a');g.rect(14,52,6,3,'#2a2a2a');g.rect(10,58,2,6,'#ffd040');
 g.rect(70,34,6,22,'#e8e8f0');g.roof(71,30,4,'#c83a3a',4);g.rect(68,50,10,6,'#a0a0b0');if(f)g.rect(71,56,4,3,'#ffd040');
 g.rect(32,56,30,4,'#0a0a0a');g.rect(33,57,28,2,'#ff2a2a');g.px(40,57,'#ffffff');g.px(48,57,'#ffffff');g.px(56,57,'#ffffff');
 g.person(46,62,'#2a2a3a','#1a1a1a');g.person(50,62,'#6a2a4a','#3a2010')};

// ---------- เส้นทางพิเศษ ----------
// 🚪 ผู้ข้ามโลก: ซ้ายยุทธภพยามเย็น ขวาเมืองนีออนใต้ดวงดาว · กลางเป็นประตูหินโบราณที่วังวนมิติหมุนอยู่ · ผู้ข้ามโลกคลุมผ้าพร้อมกระบี่เดินเข้าแสง
S.v=(g,f)=>{const {ctx}=g;
 // ฝั่งซ้าย: ยุทธภพยามเย็น
 ctx.save();ctx.beginPath();ctx.rect(0,0,48,H);ctx.clip();
 g.sky(['#3a1e4a','#9a4a5a','#f08a5a','#ffd08a'],0,44);g.glow(20,20,12,'#ffd890',.35);g.circ(20,20,5,'#ffe8b0');
 g.ridge(38,6,.09,'#6a3a5a',1);g.peak(6,26,1,'#4a2a48',null,'#3e2240');g.ridge(46,4,.14,'#3a2038',4);
 g.rect(5,38,8,2,'#7a2a2a');g.rect(6,40,6,5,'#4a1a1e');g.roof(5,35,8,'#241418',3);g.px(8,42,'#ffd060');g.px(10,42,'#ffd060');g.rect(9,32,1,3,'#241418');
 for(let i=0;i<4;i++)g.pine(3+i*11,52,7+(i%2)*3,'#2a1428','#1e0e1e');
 for(let i=0;i<3;i++){const bx=30+i*5,by=8+(i%2)*3+(f?1:0);g.px(bx,by,'#2a1420');g.px(bx-1,by-1,'#2a1420');g.px(bx+1,by-1,'#2a1420')}
 ctx.restore();
 // ฝั่งขวา: เมืองนีออนใต้ดวงดาว
 ctx.save();ctx.beginPath();ctx.rect(48,0,48,H);ctx.clip();
 g.sky(['#040616','#0c1238','#1e1a5a','#4a2a7a'],0,48);g.twinkle(14,'#ffffff',30,f);g.stars(16,['#9fe8ff','#ffffff','#c8a8ff'],34);
 g.circ(84,10,4,'#d8f0ff');g.circ(86,9,3,'#0c1238');
 const nc=()=>{const r=g.R();return r<.4?'#5cf2ff':r<.7?'#ff5ad0':'#ffd86a'};
 g.bld(52,7,26,'#141632','#5cf2ff',.35,52,'#2a2e5a');g.bld(60,9,34,'#10122a',nc,.4,52,'#262a52');g.bld(70,6,22,'#181a3a','#ff5ad0',.35,52);g.bld(77,10,30,'#121430',nc,.4,52,'#2a2e5a');g.bld(88,8,24,'#16183a','#5cf2ff',.35,52);
 g.rect(62,16,2,3,'#ff5ad0');g.rect(80,20,5,1,f?'#5cf2ff':'#2a8aa8');g.px(66,17,'#ffffff');
 ctx.restore();
 // พื้นต่อกันตรงกลาง
 g.rect(0,52,W,12,'#120c1c');g.dith(0,52,48,3,'#3a2038',.5);g.dith(48,52,48,3,'#1a2a5a',.5);
 for(let x=0;x<W;x+=6)g.px(x+(x%12?2:0),56+(x%3),'#241a30');
 // ประตูหินโบราณ
 const cx=48,top=14,bw=13;
 g.rect(cx-bw-4,top-2,bw*2+8,3,'#5a4a5a');g.rect(cx-bw-6,top-4,bw*2+12,2,'#7a6a78');g.px(cx-bw-7,top-5,'#7a6a78');g.px(cx+bw+6,top-5,'#7a6a78');
 g.rect(cx-bw-3,top+1,4,52-top-1,'#4a3c4c');g.rect(cx+bw,top+1,4,52-top-1,'#3a2e3e');g.rect(cx-bw-3,top+1,1,52-top-1,'#6a5a6a');
 for(let y=top+4;y<50;y+=6){g.px(cx-bw-2,y,'#ffd060');g.px(cx+bw+1,y+3,'#5cf2ff')}
 g.rect(cx-2,top-4,4,3,'#ffd060');g.px(cx,top-5,'#fff4c0');
 // วังวนมิติ
 const ph=f?1:0;g.rect(cx-bw+1,top+1,bw*2-1,52-top-1,'#1a0a3a');
 const ring=[['#2a1a6a',12],['#4a2aa0',10],['#7a4ad0',8],['#5cc8ff',6],['#bfefff',4],['#fff8e0',2]];
 ring.forEach(([c,r],i)=>{g.ell(cx,33,Math.min(bw-1,r+2),Math.round((r+2)*1.6),c)});
 for(let i=0;i<22;i++){const a=i/22*Math.PI*2+ph*.4,rr=6+(i%4)*2;g.px(Math.round(cx+Math.cos(a)*rr*.8),Math.round(33+Math.sin(a)*rr*1.4),i%3?'#9fe8ff':'#ffd86a')}
 g.glow(cx,33,14,'#9fe0ff',.28);g.dith(cx-bw+1,44,bw*2-1,8,'#5cc8ff',.18);
 // แสงสาดลงพื้น
 g.alpha(.35,()=>{for(let j=0;j<10;j++){const w=bw+j*2;g.rect(cx-w,52+j,w*2,1,j<4?'#9fe0ff':'#5a8ac0')}});
 // ผู้ข้ามโลกคลุมผ้า กระบี่หลัง ผ้าพันคอปลิว
 const px=27,py=52;
 g.alpha(.45,()=>g.rect(px-8,py+1,9,1,'#000000'));
 g.rect(px-2,py-11,7,10,'#4a3a5e');g.rect(px-3,py-5,9,4,'#4a3a5e');g.rect(px-1,py-10,5,8,'#1a1424');g.rect(px-2,py-4,7,3,'#1a1424');g.rect(px-1,py-2,2,2,'#120e1a');g.rect(px+2,py-2,2,2,'#120e1a');
 g.rect(px,py-13,4,3,'#1a1424');g.px(px+3,py-12,'#ffd8a8');g.rect(px-1,py-14,6,1,'#2a2034');
 g.line(px-1,py-13,px+5,py-6,'#c8c8d8');g.px(px-2,py-14,'#ffd060');
 const sf=f?1:0;g.rect(px-3,py-11+sf,3,1,'#c83a3a');g.rect(px-5,py-10,2,1,'#c83a3a');g.px(px-6,py-11+sf,'#e85a4a');
 g.rect(px+4,py-10,1,8,'#5cc8ff');g.px(px+4,py-12,'#bfefff');g.px(px+4,py-13,'#bfefff');g.rect(px+3,py-2,1,2,'#5cc8ff');g.alpha(.3,()=>g.rect(px+5,py-12,10,1,'#9fe0ff'))
 // เศษมิติลอยข้ามฝั่ง
 const sh=[[20,40],[30,22],[58,26],[70,40],[44,8],[86,46],[12,46]];sh.forEach(([x,y],i)=>{const dx=f?(i%2?1:-1):0,c=i%2?'#ffd86a':'#9fe8ff';g.px(x+dx,y,c);if(i%3===0){g.px(x+dx+1,y,c+'99');g.px(x+dx,y-1,c+'99')}})};

// ---------- แฟนตาซี ----------
// ⚔️ ต่างโลก: คืนจันทร์คู่ · วงเวทอัญเชิญบนลานหิน · ปราสาทบนเขา
S.fi=(g,f)=>{g.sky(['#0c0820','#24164a','#4a2a72','#8a4a8a'],0,46);g.stars(26,['#ffffff','#ffd8f0','#c8b8ff'],34);g.twinkle(5,'#ffffff',30,f);
 g.glow(70,13,13,'#fff0d0',.32);g.circ(70,13,7,'#f8ecc8');g.px(67,11,'#e0d0a8');g.px(72,15,'#e0d0a8');g.rect(68,10,2,1,'#e8dab4');
 g.glow(84,24,7,'#a8d8ff',.35);g.circ(84,24,3,'#b8e0ff');g.px(83,23,'#ffffff');
 g.ridge(40,7,.06,'#3a2258',2);
 // ปราสาทบนเขา (สีอ่อนกว่าภูเขาให้เห็นรูปทรง)
 g.peak(26,24,1.3,'#1d1134',null,'#170d2a');const C='#4a3478',CS='#3a2864',CT='#5e4690';
 g.rect(17,20,18,12,C);g.rect(33,20,2,12,CS);g.rect(14,14,5,18,C);g.rect(33,14,5,18,CS);g.rect(23,9,6,13,C);g.rect(28,9,1,13,CS);
 for(let i=0;i<3;i++){g.px(14+i*2,13,C);g.px(33+i*2,13,CS);g.px(23+i*2,8,C)}for(let i=0;i<5;i++)g.px(17+i*4,19,C);
 g.rect(13,12,7,1,CT);g.rect(32,12,7,1,CT);g.rect(22,7,8,1,CT);
 for(let j=0;j<4;j++){g.rect(14+j,8+j,5-j*2>0?5-j*2:1,1,'#2a1a48');g.rect(33+j,8+j,5-j*2>0?5-j*2:1,1,'#2a1a48')}
 g.px(16,7,'#2a1a48');g.px(35,7,'#2a1a48');g.rect(26,2,1,5,'#2a1a48');g.rect(27,2+(f?1:0),4,2,'#e24b6a');g.px(31,3+(f?0:1),'#e24b6a');
 for(const [x,y] of [[16,17],[35,17],[25,12],[19,24],[23,24],[29,24],[16,24],[35,24]])g.rect(x,y,1,2,'#ffd27a');g.rect(25,27,3,5,'#1a1030');g.px(26,26,'#1a1030');
 g.ridge(48,4,.11,'#1a1030',4);for(let i=0;i<5;i++)g.pine(48+i*11+(i%2)*3,50,7+(i%3)*2,'#120a24','#0d071c');
 // ลานหิน
 g.rect(0,50,W,14,'#2a2438');for(let y=51;y<W;y+=4)for(let x=(y%8?0:4);x<W;x+=8)g.rect(x,y,1,1,'#3a3450');g.rect(0,50,W,1,'#4a4260');
 // วงเวทอัญเชิญ
 const cx=46,cy=56;g.glow(cx,cy-2,18,'#c890ff',.38);
 g.ring(cx,cy,24,5,'#b98cff');g.ring(cx,cy,19,4,'#e8d8ff',2);g.ring(cx,cy,14,3,'#b98cff');
 for(let i=0;i<10;i++){const a=(i/10+(f?.05:0))*Math.PI*2;g.px(Math.round(cx+Math.cos(a)*22),Math.round(cy+Math.sin(a)*4.6),'#ffffff')}
 g.alpha(.22,()=>{for(let y=24;y<cy;y++){const w=10+Math.floor((y-24)/3);g.rect(cx-w,y,w*2,1,'#e8d0ff')}});
 // ผู้ถูกอัญเชิญ + ดาบลอย
 g.person(45,57,'#3a3a5a','#1a1020');g.rect(44,51,4,1,'#5a5a7a');
 const sy=f?33:34;g.rect(56,sy,1,12,'#dfe6f2');g.px(56,sy-1,'#ffffff');g.rect(54,sy+9,5,1,'#e0a84a');g.rect(56,sy+10,1,3,'#8a5a1a');g.px(56,sy+13,'#ffd27a');g.glow(56,sy+5,5,'#ffe8a0',.3);
 for(let i=0;i<9;i++){const x=Math.floor(g.R()*W),y=20+Math.floor(g.R()*30);g.px(x,y-((i+f)%3),(i+f)%2?'#e8d0ff':'#ffd27a')}};
// 🔮 โลกเวทมนตร์: วิทยาลัยเวทบนเกาะลอยฟ้า · หอคอยดาราศาสตร์ · หนังสือบิน
S.fm=(g,f)=>{g.sky(['#081a2e','#12304a','#1e5a6a','#3a8a8a'],0,52);g.stars(24,['#ffffff','#9fe1cb','#c8b8ff'],34);g.twinkle(5,'#e0fff4',30,f);
 g.alpha(.18,()=>{for(let i=0;i<3;i++)g.ring(48,-6,30+i*9,22+i*7,['#5dcaa5','#7f77dd','#9fe1cb'][i],1)});
 g.cloud(12,46,5,'#2a5a6a','#1e4a5a');g.cloud(86,44,6,'#2a5a6a','#1e4a5a');g.rect(0,50,W,14,'#163a4c');g.dith(0,47,W,5,'#2a5a6a',.5);
 const isl=(x,y,w,top)=>{g.ell(x,y,w,2,'#4a9a6a');g.rect(x-w,y-1,w*2,1,'#6ac08a');for(let j=0;j<9;j++){const hw=Math.round(w*(1-j/9)*.95);g.rect(x-hw,y+1+j,hw*2,1,j<2?'#5a4a6a':j%3?'#3a3050':'#2e2644')}g.px(x,y+10,'#5dcaa5');g.glow(x,y+11,3,'#5dcaa5',.4)};
 // เกาะหลัก + วิทยาลัย
 const by=f?1:0;isl(48,40+by,22);
 g.rect(32,26+by,32,14,'#d8d2ec');g.rect(32,26+by,32,1,'#ffffff');g.roof(32,22+by,32,'#3c3489',4);
 for(let i=0;i<5;i++){g.rect(35+i*6,30+by,2,4,(i+f)%3?'#ffd27a':'#9fe1cb');g.px(35+i*6,29+by,'#3c3489')}g.rect(46,34+by,4,6,'#3c3489');g.px(47,35+by,'#ffd27a');
 // หอคอย
 g.rect(57,8+by,8,18,'#e8e3f7');g.rect(64,8+by,1,18,'#b8b0dc');g.rect(56,6+by,10,2,'#534ab7');for(let j=0;j<5;j++)g.rect(57+j,1+j+by,8-j*2,1,'#3c3489');g.px(61,0+by,'#ffd27a');
 g.circ(61,12+by,2,'#9fe1cb');g.px(60,11+by,'#ffffff');g.glow(61,12+by,6,'#5dcaa5',.35);g.rect(59,18+by,4,3,'#ffd27a');
 // เกาะเล็ก
 isl(14,28-by,8);g.rect(11,22-by,6,6,'#e8e3f7');g.roof(11,19-by,6,'#534ab7',3);g.px(13,24-by,'#ffd27a');
 isl(84,30+by,7);g.circ(84,25+by,2,'#7f77dd');g.rect(83,21+by,3,3,'#afa9ec');g.px(84,20+by,'#eeedfe');g.glow(84,23+by,5,'#afa9ec',.4);
 // สะพานแสง
 g.line(22,28-by,32,32+by,'#9fe1cb');g.line(65,30+by,77,30+by,'#9fe1cb');
 // หนังสือบิน
 const bk=(x,y,c)=>{g.rect(x,y,4,1,c);g.px(x-1,y-1,c);g.px(x+4,y-1,c);g.px(x+1,y,'#ffffff')};
 bk(24,12+(f?1:0),'#ed93b1');bk(76,8+(f?0:1),'#fac775');bk(38,16+(f?0:1),'#9fe1cb');
 for(let i=0;i<10;i++){const x=Math.floor(g.R()*W),y=14+Math.floor(g.R()*40);g.px(x,y-((i+f)%2),(i%2)?'#9fe1cb':'#c8b8ff')}};
// 🏰 โลกแห่งอะคาเดมี่: สถาบันหลวงยามพลบค่ำ · หอนาฬิกา · ธงประจำหอ · บันไดหินอ่อน
S.fa=(g,f)=>{g.sky(['#2a1a4a','#6a3a6a','#c4626a','#f0a070','#ffd090'],0,44);g.stars(12,['#ffffff','#ffe0f0'],16);
 g.glow(80,36,12,'#ffe0a0',.4);g.circ(80,38,5,'#ffe8b0');
 g.cloud(14,14,3,'#f0a0a0','#c47080');g.cloud(70,10,2,'#f0a0a0');
 g.ridge(40,4,.08,'#7a3a5a',1);
 // ปีกอาคาร
 const ST='#e8d8c8',SH='#c8b4a8',RF='#3a2a5a',WN='#ffd27a';
 g.rect(8,28,24,18,ST);g.rect(64,28,24,18,ST);g.rect(8,28,24,1,'#fff4e8');g.rect(64,28,24,1,'#fff4e8');g.rect(31,28,1,18,SH);g.rect(64,28,1,18,SH);
 g.roof(8,24,24,RF,4);g.roof(64,24,24,RF,4);
 for(let r=0;r<2;r++)for(let i=0;i<4;i++){const lit=(i+r+f)%3!==0;g.rect(11+i*5,31+r*7,2,4,lit?WN:'#4a3a5a');g.px(11+i*5,30+r*7,SH);g.rect(67+i*5,31+r*7,2,4,(i+r)%3!==1?WN:'#4a3a5a');g.px(67+i*5,30+r*7,SH)}
 // อาคารกลาง + หอนาฬิกา
 g.rect(32,22,32,24,'#f0e4d4');g.rect(32,22,32,1,'#fff8ee');g.roof(32,18,32,RF,4);
 g.rect(40,9,16,13,'#f0e4d4');g.rect(55,9,1,13,SH);g.rect(39,8,18,1,RF);for(let j=0;j<7;j++)g.rect(40+j,7-j,16-j*2,1,RF);g.rect(48,-1,1,2,'#c8a040');g.px(48,-1,'#ffd27a');
 g.circ(48,14,4,'#faeeda');g.ring(48,14,4,4,'#c8a040');g.rect(48,11,1,3,'#412402');g.rect(48,14,2+(f?0:1),1,'#412402');
 for(let i=0;i<3;i++){g.rect(37+i*9,26,4,8,WN);g.ell(39+i*9,26,2,1,WN);g.px(39+i*9,29,'#c8a040')}
 g.rect(44,36,8,10,'#5a3a2a');g.ell(48,36,4,2,'#5a3a2a');g.rect(47,37,2,9,'#3a2418');g.glow(48,40,6,'#ffd27a',.25);
 // ธงประจำหอ (ม่วง / แดง / เขียว / น้ำเงิน)
 const fl=(x,c)=>{g.rect(x,10,1,14,'#5a4a3a');g.rect(x+1,10,4,7-(f?1:0),c);g.px(x+2,17-(f?1:0),c);g.px(x+4,16+(f?0:1),c);g.px(x+2,12,'#ffd27a')};
 fl(12,'#534ab7');fl(26,'#a32d2d');fl(66,'#27500a');fl(80,'#185fa5');
 // บันได + สวน
 g.rect(0,46,W,18,'#3a2a3a');for(let j=0;j<6;j++)g.rect(40-j*3,46+j*3,16+j*6,3,j%2?'#c8b4a8':'#d8c8bc');
 for(const x of [4,20,74,90]){g.ell(x,44,4,4,'#2a5a3a');g.px(x-1,42,'#3a7a4a');g.rect(x,48,1,3,'#3a2418')}
 for(const x of [28,66]){g.rect(x,40,1,8,'#3a2a2a');g.rect(x-1,38,3,2,'#ffd27a');g.glow(x,39,4,'#ffd27a',.35)}
 g.person(34,58,'#3c3489','#f0c8a0');g.person(60,58,'#a32d2d','#3a2418');g.rect(33,52,4,1,'#ffffff');
 for(let i=0;i<6;i++){const x=Math.floor(g.R()*W),y=20+Math.floor(g.R()*24);g.px(x,y+((i+f)%2),'#ffe0a0')}};
window.WSCN={W,H,S,P,order:['w0','w1','w3','w2','h','s','j','rg','l','k','mn','n','u','o','p','z','t','e','q','y','v','fi','fm','fa']};
})();
