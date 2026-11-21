const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();
await p.setContent('<html><body style="margin:0;background:#222"></body></html>');await p.addScriptTag({path:__dirname+'/world-scenes.js'});
const out=await p.evaluate(()=>{const {W,H,S,P,order}=WSCN;const errs=[];
 // แผ่นรวม: 2 เฟรมต่อโลก วางเป็นคอลัมน์ (เฟรม 0, เฟรม 1) × แถวตามลำดับ
 const sh=document.createElement('canvas');sh.width=W*2;sh.height=H*order.length;const sx=sh.getContext('2d');
 order.forEach((id,i)=>{for(const f of [0,1]){const c=document.createElement('canvas');c.width=W;c.height=H;const g=P(c.getContext('2d'),1234+i*97);try{S[id](g,f)}catch(e){errs.push(id+': '+e.message)}sx.drawImage(c,f*W,i*H)}});
 // ภาพตรวจ 3x · ตาราง 4 คอลัมน์ เฟรม 0
 const cols=4,sc=3,pad=6,cv=document.createElement('canvas');cv.width=cols*(W*sc+pad);cv.height=Math.ceil(order.length/cols)*(H*sc+pad);const cx=cv.getContext('2d');cx.imageSmoothingEnabled=false;
 order.forEach((id,i)=>{cx.drawImage(sh,0,i*H,W,H,(i%cols)*(W*sc+pad),Math.floor(i/cols)*(H*sc+pad),W*sc,H*sc)});
 return {sheet:sh.toDataURL(),prev:cv.toDataURL(),errs}});
fs.writeFileSync(__dirname+'/../worlds.png',Buffer.from(out.sheet.split(',')[1],'base64'));fs.writeFileSync('/tmp/worlds-preview.png',Buffer.from(out.prev.split(',')[1],'base64'));console.log(out.errs.join('\n')||'ok');await b.close()})();
