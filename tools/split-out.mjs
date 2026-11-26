// ✂️ ย้ายท่อนโค้ดระดับบนสุดออกจาก app.js ไปเป็นไฟล์โลก /w/<ชื่อ>.js โดยลำดับการห่อฟังก์ชันกลางเหมือนเดิมทุกอย่าง
// ใช้: node tools/split-out.mjs <ชื่อโลก> <บรรทัดเริ่มของท่อน>[+ชื่อ1,ชื่อ2] ...
//   +ชื่อ = บังคับใส่ช่องให้ชื่อนั้น (ใช้กับ window[ตัวแปร]=… ที่เครื่องมือมองไม่เห็น หรือชื่อที่ท่อนนี้สร้างแล้วท่อนหลังใน app.js ห่อต่อตอนโหลด)
// วิธีรักษาลำดับ: ตรงตำแหน่งเดิมของแต่ละท่อน ใส่ "ช่อง" (wSlot) ที่จับฟังก์ชันกลางที่ท่อนนั้นห่อไว้ แล้วส่งต่อไปตัวห่อจริงเมื่อไฟล์โลกโหลดแล้ว
//   ในไฟล์โลก ท่อนนั้นจะเห็นชื่อฟังก์ชันกลางเป็นตัวแปรเงา = ฟังก์ชัน ณ ตำแหน่งเดิม → ห่อเสร็จแล้วส่งตัวห่อกลับเข้าช่อง
import fs from 'fs'; import * as acorn from 'acorn'; import * as walk from 'acorn-walk';
const [world, ...lines] = process.argv.slice(2); if (!world || !lines.length) { console.error('usage'); process.exit(1) }
const src = fs.readFileSync('app.js', 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
const lineOf = p => { let n = 1; for (let i = src.indexOf('\n'); i >= 0 && i < p; i = src.indexOf('\n', i + 1)) n++; return n };
const top = ast.body.map(st => ({ st, line: null }));
const want = lines.map(x => +String(x).split('+')[0]), extra = lines.map(x => (String(x).split('+')[1] || '').split(',').filter(Boolean)), pick = [];
// หาบรรทัดของแต่ละท่อนแบบเร็ว
const nl = [0]; for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) nl.push(i + 1);
const ln = p => { let lo = 0, hi = nl.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (nl[m] <= p) lo = m; else hi = m - 1 } return lo + 1 };
for (const w of want) { const t = top.find(x => ln(x.st.start) === w); if (!t) { console.error('ไม่พบท่อนที่บรรทัด', w); process.exit(1) } pick.push(t.st) }
// ชื่อระดับบนสุดของ app.js (ฟังก์ชัน/ตัวแปร) ที่อยู่นอกท่อนที่ย้าย
const G = new Set(), sel = new Set(pick);
for (const st of ast.body) { if (sel.has(st)) continue; if (st.type === 'FunctionDeclaration') G.add(st.id.name); if (st.type === 'VariableDeclaration') st.declarations.forEach(d => d.id.type === 'Identifier' && G.add(d.id.name)) }
const own = new Set(); // ชื่อที่ท่อนที่ย้ายสร้างเองทาง window.X= และไม่มีที่อื่นสร้าง
const outW = new Map(); // window.X= ที่ท่อนนอกกลุ่มสร้าง → ตำแหน่งแรก
ast.body.forEach(st => { if (sel.has(st)) return; walk.full(st, n => { if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.name === 'window' && !n.left.computed) { const k = n.left.property.name; if (!outW.has(k) || outW.get(k) > st.start) outW.set(k, st.start) } }) });
pick.forEach(st => walk.full(st, n => { if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.name === 'window' && !n.left.computed) { const k = n.left.property.name; if (!G.has(k) && !outW.has(k)) own.add(k) } }));
const slots = pick.map((st, k) => {
  const W = new Set(), WW = new Set();
  walk.full(st, n => { if (n.type !== 'AssignmentExpression' || n.operator !== '=') return; const r = n.right; if (!r || !/Function/.test(r.type)) return;
    if (n.left.type === 'Identifier') { const nm = n.left.name; if (G.has(nm) && !own.has(nm)) W.add(nm) }
    else if (n.left.type === 'MemberExpression' && n.left.object.name === 'window' && !n.left.computed) { const nm = n.left.property.name; if ((G.has(nm) || (outW.has(nm) && outW.get(nm) < st.start)) && !own.has(nm)) { W.add(nm); WW.add(nm) } } });
  extra[k].forEach(n => { W.add(n); WW.add(n) });
  // อ่าน/เขียน window.X ของชื่อที่ห่อ (เช่น const _o=window.X||X; … window.X=X) ต้องผ่าน window เงาด้วย ไม่งั้นวนเรียกตัวเองไม่รู้จบ
  walk.full(st, n => { if (n.type === 'MemberExpression' && !n.computed && n.object.type === 'Identifier' && n.object.name === 'window' && W.has(n.property.name)) WW.add(n.property.name) });
  return { id: world + (k + 1), names: [...W], win: WW.size > 0, st };
});
// เขียนไฟล์โลก
let out = `// 🌍 ไฟล์โลก "${world}" — แยกจาก app.js ด้วย tools/split-out.mjs · โหลดผ่าน wLoad('${world}') (BLOCK 117)\n// ⚠️ แก้โค้ดของโลกนี้ที่ไฟล์นี้เท่านั้น · ห้ามประกาศชื่อระดับบนสุดใหม่นอกฟังก์ชัน\n`;
for (const s of slots) {
  const body = src.slice(s.st.start, s.st.end), N = s.names;
  // ชื่อที่ห่อ: ตัวแปรเงา (เรียกตรง) + window เงา (เรียกผ่าน window.X) ใช้ที่เก็บเดียวกัน · โหลดเสร็จแล้วส่งตัวห่อเข้าช่อง และทุกอย่างกลับไปใช้ของจริง
  const winP = s.win ? `const __G={${N.map(n => `${n}:()=>${n}`).join(',')}},__S={${N.map(n => `${n}:v=>{${n}=v}`).join(',')}};let __done=0;const __bc=new Map(),__nat=f=>{try{return /\\[native code\\]/.test(Function.prototype.toString.call(f))}catch(e){return false}};
const window=new Proxy(globalThis,{get(t,k){if(!__done&&k in __G)return __G[k]();const v=Reflect.get(t,k);if(typeof v==='function'&&__nat(v)){let b=__bc.get(v);if(!b){b=v.bind(t);__bc.set(v,b)}return b}return v},set(t,k,v){if(!__done&&k in __S){__S[k](v);return true}t[k]=v;return true},has(t,k){return k in t||k in __G}});\n` : '';
  out += `\n// ---- ท่อน ${s.id} (เดิมอยู่ app.js บรรทัด ${ln(s.st.start)}) · ห่อ: ${N.join(', ') || '-'} ----\n(function(){const SL=globalThis.__wSlots['${s.id}'];${N.map(n => `let ${n}=SL.base.${n};`).join('')}${winP}\n${body}\n${s.win ? '__done=1;' : ''}${N.map(n => `SL.impl.${n}=${n};${n}=function(){return globalThis.${n}.apply(this,arguments)};`).join('')}})();\n`;
}
out += `\nwReady('${world}');\n`;
fs.mkdirSync('w', { recursive: true }); fs.writeFileSync('w/' + world + '.js', out);
// แก้ app.js: แทนแต่ละท่อนด้วยช่อง (จากท้ายไปหน้า ตำแหน่งจะได้ไม่เลื่อน)
let A = src; for (const s of [...slots].sort((a, b) => b.st.start - a.st.start)) {
  const rep = `// ✂️ ท่อนนี้ย้ายไป /w/${world}.js (${s.id}) — ช่องนี้รักษาลำดับการห่อ: ${s.names.join(', ') || '-'}\nwSlot('${s.id}',${JSON.stringify(s.names)});`;
  A = A.slice(0, s.st.start) + rep + A.slice(s.st.end) }
fs.writeFileSync('app.js', A);
console.log(JSON.stringify(slots.map(s => ({ id: s.id, line: ln(s.st.start), bytes: Buffer.byteLength(src.slice(s.st.start, s.st.end)), wraps: s.names }))));
