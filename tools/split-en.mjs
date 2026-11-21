// 🌐 ย้ายพจนานุกรมภาษาอังกฤษก้อนใหญ่จาก app.js ไป /w/en.js (โหลดเฉพาะคนที่ใช้ภาษาอังกฤษ)
// ผลลัพธ์สุดท้ายของ I18N.d / I18N.n เหมือนเดิมทุกคำ: คำไหนที่ท่อนหลัง (ใน app.js หรือ /w/*.js) เขียนทับ จะไม่ถูกใส่ใน en.js
// ใช้: node tools/split-en.mjs   (ต้องมี acorn, acorn-walk)
// หมายเหตุ: en.js ที่ใช้จริงสร้างใหม่จากการเทียบ I18N ในเบราว์เซอร์ (ก่อน/หลังแยก) เพราะมีตัวเขียนคำแปลแบบโค้ด (เช่น LK_EN, bgAdd) ที่เครื่องมือนี้มองไม่เห็น
import fs from 'fs'; import * as acorn from 'acorn'; import * as walk from 'acorn-walk';
const src = fs.readFileSync('app.js', 'utf8'), ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
const keyOf = p => p.key.type === 'Identifier' ? p.key.name : String(p.key.value);
const valSrc = p => src.slice(p.value.start, p.value.end);
const isD = m => m && m.type === 'MemberExpression' && !m.computed && m.object.name === 'I18N' && m.property.name === 'd';
let decl = null; const moved = [], setters = []; // setters: {pos, keys:Set}
ast.body.forEach((st, i) => {
  if (st.type === 'VariableDeclaration' && st.declarations[0].id.name === 'I18N') { decl = { st, i }; return }
  // try{Object.assign(I18N.d,{...})}catch(e){}  ก้อนใหญ่
  let call = null;
  if (st.type === 'TryStatement' && st.block.body.length === 1 && st.block.body[0].type === 'ExpressionStatement') { const e = st.block.body[0].expression; if (e.type === 'CallExpression' && src.slice(e.callee.start, e.callee.end) === 'Object.assign' && isD(e.arguments[0]) && e.arguments[1] && e.arguments[1].type === 'ObjectExpression') call = e }
  if (call && st.end - st.start > 15000) { moved.push({ i, st, kind: 'over', props: call.arguments[1].properties }); return }
  // try{const _a={...};for(const k in _a)if(I18N.d[k]==null)I18N.d[k]=_a[k]}catch(e){}
  if (st.type === 'TryStatement' && st.end - st.start > 15000 && st.block.body.length === 2 && st.block.body[0].type === 'VariableDeclaration' && st.block.body[0].declarations[0].init && st.block.body[0].declarations[0].init.type === 'ObjectExpression' && /I18N\.d\[k\]==null/.test(src.slice(st.block.body[1].start, st.block.body[1].end))) { moved.push({ i, st, kind: 'fill', props: st.block.body[0].declarations[0].init.properties }); return }
  // ตัวเขียนอื่นใน app.js
  const keys = new Set(); walk.full(st, n => { if (n.type === 'CallExpression' && src.slice(n.callee.start, n.callee.end) === 'Object.assign' && isD(n.arguments[0]) && n.arguments[1] && n.arguments[1].type === 'ObjectExpression') n.arguments[1].properties.forEach(p => p.key && keys.add(keyOf(p))) });
  if (keys.size) setters.push({ pos: i, keys });
});
// ไฟล์โลก (/w/*.js) เดิมอยู่หลังพจนานุกรมทั้งหมด → ถือเป็นตัวเขียนทีหลัง
for (const f of fs.readdirSync('w').filter(f => /\.js$/.test(f) && f !== 'en.js')) { const t = fs.readFileSync('w/' + f, 'utf8'); try { const a = acorn.parse(t, { ecmaVersion: 'latest' }); const keys = new Set(); walk.full(a, n => { if (n.type === 'CallExpression' && t.slice(n.callee.start, n.callee.end) === 'Object.assign' && n.arguments[0] && t.slice(n.arguments[0].start, n.arguments[0].end) === 'I18N.d' && n.arguments[1] && n.arguments[1].type === 'ObjectExpression') n.arguments[1].properties.forEach(p => p.key && keys.add(p.key.type === 'Identifier' ? p.key.name : String(p.key.value))) }); if (keys.size) setters.push({ pos: 1e9, keys }) } catch (e) { console.error('parse', f, e.message) } }
if (!decl) throw new Error('ไม่พบ const I18N');
const dObj = decl.st.declarations[0].init.properties.find(p => keyOf(p) === 'd').value, nObj = decl.st.declarations[0].init.properties.find(p => keyOf(p) === 'n').value;
// ผู้ชนะของแต่ละคำ
const all = [{ i: decl.i, kind: 'fill0', props: dObj.properties }, ...moved];
const later = (k, pos) => setters.some(s => s.pos > pos && s.keys.has(k)) || all.some(m => m.i > pos && m.kind !== 'fill' && m.props.some(p => keyOf(p) === k));
const earlier = (k, pos) => setters.some(s => s.pos < pos && s.keys.has(k)) || all.some(m => m.i < pos && m.props.some(p => keyOf(p) === k));
const win = []; let skip = 0;
for (const m of all) for (const p of m.props) { const k = keyOf(p); if (later(k, m.i)) { skip++; continue } if (m.kind === 'fill' && earlier(k, m.i)) { skip++; continue } win.push(JSON.stringify(k) + ':' + valSrc(p)) }
const out = `// 🌐 พจนานุกรมภาษาอังกฤษ (แยกจาก app.js ด้วย tools/split-en.mjs) · โหลดเฉพาะเมื่อใช้ภาษาอังกฤษ — wLoad('en')\n// ⚠️ คำแปลใหม่ใส่ใน app.js ได้ตามเดิม (Object.assign(I18N.d,{...})) · ไฟล์นี้สร้างจากเครื่องมือ\n(function(){const D=I18N.d,N=I18N.n;\nObject.assign(D,{${win.join(',')}});\nconst N0=${src.slice(nObj.start, nObj.end)};for(const k in N0)if(N[k]==null)N[k]=N0[k];\n})();\nwReady('en');\n`;
fs.writeFileSync('w/en.js', out);
// แก้ app.js
let A = src; const reps = [...moved.map(m => ({ s: m.st.start, e: m.st.end, t: `// ✂️ พจนานุกรมก้อนนี้ย้ายไป /w/en.js` })), { s: dObj.start, e: dObj.end, t: '{}' }, { s: nObj.start, e: nObj.end, t: '{}' }].sort((a, b) => b.s - a.s);
for (const r of reps) A = A.slice(0, r.s) + r.t + A.slice(r.e);
fs.writeFileSync('app.js', A);
console.log(JSON.stringify({ moved: moved.map(m => m.kind + '@' + (src.slice(0, m.st.start).split('\n').length)), words: win.length, skipped: skip, bytes: Buffer.byteLength(out) }));
