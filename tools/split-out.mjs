// ✂️ ย้ายท่อนโค้ดระดับบนสุดออกจาก app.js ไปเป็นไฟล์โลก /w/<ชื่อ>.js โดยลำดับการห่อฟังก์ชันกลางเหมือนเดิมทุกอย่าง
// ใช้: node tools/split-out.mjs <ชื่อโลก> <บรรทัดเริ่มของท่อน> [บรรทัดเริ่มของท่อนถัดไป ...]
// วิธีรักษาลำดับ: ตรงตำแหน่งเดิมของแต่ละท่อน ใส่ "ช่อง" (wSlot) ที่จับฟังก์ชันกลางที่ท่อนนั้นห่อไว้ แล้วส่งต่อไปตัวห่อจริงเมื่อไฟล์โลกโหลดแล้ว
//   ในไฟล์โลก ท่อนนั้นจะเห็นชื่อฟังก์ชันกลางเป็นตัวแปรเงา = ฟังก์ชัน ณ ตำแหน่งเดิม → ห่อเสร็จแล้วส่งตัวห่อกลับเข้าช่อง
import fs from 'fs'; import * as acorn from 'acorn'; import * as walk from 'acorn-walk';
const [world, ...lines] = process.argv.slice(2); if (!world || !lines.length) { console.error('usage'); process.exit(1) }
const src = fs.readFileSync('app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
const lineOf = p => { let n = 1; for (let i = src.indexOf('\n'); i >= 0 && i < p; i = src.indexOf('\n', i + 1)) n++; return n };
const top = ast.body.map(st => ({ st, line: null }));
const want = lines.map(Number), pick = [];
// หาบรรทัดของแต่ละท่อนแบบเร็ว
const nl = [0]; for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) nl.push(i + 1);
const ln = p => { let lo = 0, hi = nl.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (nl[m] <= p) lo = m; else hi = m - 1 } return lo + 1 };
for (const w of want) { const t = top.find(x => ln(x.st.start) === w); if (!t) { console.error('ไม่พบท่อนที่บรรทัด', w); process.exit(1) } pick.push(t.st) }
// ชื่อระดับบนสุดของ app.js (ฟังก์ชัน/ตัวแปร) ที่อยู่นอกท่อนที่ย้าย
const G = new Set(), sel = new Set(pick);
for (const st of ast.body) { if (sel.has(st)) continue; if (st.type === 'FunctionDeclaration') G.add(st.id.name); if (st.type === 'VariableDeclaration') st.declarations.forEach(d => d.id.type === 'Identifier' && G.add(d.id.name)) }
const own = new Set(); pick.forEach(st => walk.full(st, n => { if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.name === 'window' && !n.left.computed) own.add(n.left.property.name) }));
const slots = pick.map((st, k) => {
  const W = new Set();
  walk.full(st, n => { if (n.type !== 'AssignmentExpression' || n.operator !== '=') return; const r = n.right; if (!r || !/Function/.test(r.type)) return;
    let nm = null; if (n.left.type === 'Identifier') nm = n.left.name; else if (n.left.type === 'MemberExpression' && n.left.object.name === 'window' && !n.left.computed) nm = n.left.property.name;
    if (nm && G.has(nm) && !own.has(nm)) W.add(nm) });
  return { id: world + (k + 1), names: [...W], st };
});
// เขียนไฟล์โลก
let out = `// 🌍 ไฟล์โลก "${world}" — แยกจาก app.js ด้วย tools/split-out.mjs · โหลดผ่าน wLoad('${world}') (BLOCK 117)\n// ⚠️ แก้โค้ดของโลกนี้ที่ไฟล์นี้เท่านั้น · ห้ามประกาศชื่อระดับบนสุดใหม่นอกฟังก์ชัน\n`;
for (const s of slots) {
  const body = src.slice(s.st.start, s.st.end), N = s.names;
  out += `\n// ---- ท่อน ${s.id} (เดิมอยู่ app.js บรรทัด ${ln(s.st.start)}) · ห่อ: ${N.join(', ') || '-'} ----\n(function(){const SL=window.__wSlots['${s.id}'];${N.map(n => `let ${n}=SL.base.${n};`).join('')}\n${body}\n${N.map(n => `SL.impl.${n}=${n};${n}=function(){return window.${n}.apply(this,arguments)};`).join('')}})();\n`;
}
out += `\nwReady('${world}');\n`;
fs.mkdirSync('w', { recursive: true }); fs.writeFileSync('w/' + world + '.js', out);
// แก้ app.js: แทนแต่ละท่อนด้วยช่อง (จากท้ายไปหน้า ตำแหน่งจะได้ไม่เลื่อน)
let A = src; for (const s of [...slots].sort((a, b) => b.st.start - a.st.start)) {
  const rep = `// ✂️ ท่อนนี้ย้ายไป /w/${world}.js (${s.id}) — ช่องนี้รักษาลำดับการห่อ: ${s.names.join(', ') || '-'}\nwSlot('${s.id}',${JSON.stringify(s.names)});`;
  A = A.slice(0, s.st.start) + rep + A.slice(s.st.end) }
fs.writeFileSync('app.js', A);
console.log(JSON.stringify(slots.map(s => ({ id: s.id, line: ln(s.st.start), bytes: Buffer.byteLength(src.slice(s.st.start, s.st.end)), wraps: s.names }))));
