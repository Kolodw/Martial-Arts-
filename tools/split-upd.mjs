// 📜 ย้ายบันทึกอัปเดตรุ่นเก่าจาก app.js ไป /w/upd.js (เก็บ KEEP รุ่นล่าสุดไว้ใน app.js) · หน้า 📜 อัปเดตโหลดรุ่นเก่าตอนเปิด
// ใช้: node tools/split-upd.mjs [KEEP=8]  · ถ้ามี w/upd.js อยู่แล้ว รุ่นที่ย้ายรอบใหม่จะต่อหน้ารุ่นเก่าในไฟล์เดิม
import fs from 'fs'; import * as acorn from 'acorn';
const KEEP = +(process.argv[2] || 8), src = fs.readFileSync('app.js', 'utf8'), ast = acorn.parse(src, { ecmaVersion: 'latest' });
const st = ast.body.find(s => s.type === 'VariableDeclaration' && s.declarations[0].id.name === 'CHANGELOG'); const arr = st.declarations[0].init;
if (arr.elements.length <= KEEP) { console.log('ไม่มีอะไรต้องย้าย'); process.exit(0) }
const mv = arr.elements.slice(KEEP), body = mv.map(e => src.slice(e.start, e.end)).join(',\n');
let old = ''; try { const t = fs.readFileSync('w/upd.js', 'utf8'); const m = t.match(/\/\*OLD\*\/\[([\s\S]*)\]\/\*END\*\//); if (m) old = m[1] } catch (e) {}
const out = `// 📜 บันทึกอัปเดตรุ่นเก่า (แยกจาก app.js ด้วย tools/split-upd.mjs) · โหลดตอนเปิดหน้า 📜 อัปเดต — wLoad('upd')\nCHANGELOG.push(.../*OLD*/[${body}${old ? ',\n' + old : ''}]/*END*/);\nwReady('upd');\n`;
fs.writeFileSync('w/upd.js', out);
const A = src.slice(0, arr.elements[KEEP - 1].end) + '\n /* รุ่นเก่ากว่านี้อยู่ที่ /w/upd.js */' + src.slice(arr.elements[arr.elements.length - 1].end);
fs.writeFileSync('app.js', A); console.log(JSON.stringify({ kept: KEEP, moved: mv.length, bytes: Buffer.byteLength(out) }));
