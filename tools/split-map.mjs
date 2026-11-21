// 🗺️ แผนที่ไฟล์เกม: แยก app.js เป็นท่อนระดับบนสุด → ท่อนไหนประกาศชื่ออะไร ใช้ชื่ออะไร และน่าจะเป็นของโลกไหน
// ใช้: node tools/split-map.mjs [app.js] > /tmp/map.json   (ต้องมี acorn: npm i acorn acorn-walk)
import fs from 'fs'; import * as acorn from 'acorn'; import * as walk from 'acorn-walk';
const file = process.argv[2] || 'app.js', src = fs.readFileSync(file, 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true });
const WORLD = { // คำบ่งชี้โลก (ยิ่งเจอมาก ยิ่งน่าจะเป็นของโลกนั้น)
  mw: /\bS\.mw\b|ยุคปัจจุบัน|\bmw[A-Z]\w*/g, sky: /\bSK\(\)|ทะลุฟ้า|\bsky[A-Z]\w*|window\._sky/g, soul: /จิตวิญญาณยุทธ์|วงแหวนวิญญาณ|\bsoul[A-Z]\w*|S\.soul\b/g,
  loop: /ผู้ย้อนกาล|\bregress\b|S\.rg\b|\brg[A-Z]\w*/g, beast: /เกิดเป็นสัตว์|\bS\.beast\b|\bbst[A-Z]\w*|\bbeast[A-Z]\w*/g, hunter: /'hunter(hi)?'|ฮันเตอร์|เกตมิติ/g,
  zombie: /'zombie'|ซอมบี้/g, demon: /แดนอสูร/g, xian: /CFG\.xian|โลกเซียน/g, god: /แดนเทพ|CFG\.god/g, en: /I18N|LANG==='en'/g, upd: /\bUPDATES\b/g,
};
const B = Buffer.from(src), byteAt = (() => { // แปลงตำแหน่งตัวอักษร → ไบต์ (สะสมทีละช่วง)
  return i => Buffer.byteLength(src.slice(0, i)) })();
const out = []; let k = 0;
for (const st of ast.body) {
  const decl = new Set(), refs = new Set(), wset = new Set();
  const addPat = p => { if (!p) return; if (p.type === 'Identifier') decl.add(p.name); else if (p.type === 'ObjectPattern') p.properties.forEach(q => addPat(q.value || q.argument)); else if (p.type === 'ArrayPattern') p.elements.forEach(addPat); else if (p.type === 'AssignmentPattern') addPat(p.left); else if (p.type === 'RestElement') addPat(p.argument) };
  if (st.type === 'FunctionDeclaration' || st.type === 'ClassDeclaration') decl.add(st.id.name);
  if (st.type === 'VariableDeclaration') st.declarations.forEach(d => addPat(d.id));
  const locals = new Set();
  walk.full(st, n => {
    if (n.type === 'Identifier') refs.add(n.name);
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.type === 'Identifier' && n.left.object.name === 'window' && !n.left.computed) wset.add(n.left.property.name);
    if (n.type === 'AssignmentExpression' && n.left.type === 'Identifier') wset.add('=' + n.left.name);
  });
  const text = src.slice(st.start, st.end), w = {};
  for (const [name, re] of Object.entries(WORLD)) { const m = text.match(re); if (m) w[name] = m.length }
  out.push({ i: k++, line: src.slice(0, st.start).split('\n').length, len: Buffer.byteLength(text), decl: [...decl], win: [...wset].filter(x => !x.startsWith('=')), reassign: [...wset].filter(x => x.startsWith('=')).map(x => x.slice(1)), refs: [...refs].filter(r => r.length > 1).slice(0, 4000), w, head: text.slice(0, 90).replace(/\s+/g, ' ') });
}
process.stdout.write(JSON.stringify({ file, bytes: B.length, n: out.length, st: out }));
