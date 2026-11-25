// 🔎 หาท่อนที่ย้ายไปโหลดทีหลังได้อย่างปลอดภัย (ใช้กับ split-out.mjs late …)
// เกณฑ์: ไม่ประกาศชื่อระดับบนสุด · ตอนโหลดไม่ไปแก้ข้อมูลกลาง/เรียกฟังก์ชันกลาง (นอกจากห่อฟังก์ชัน) · ชื่อ window ที่สร้างไม่ถูกใช้ที่อื่น · ไม่แตะหน้าแรก/ระบบโหลด
// ใช้: node tools/split-safe.mjs [ขนาดขั้นต่ำ=3000] > /tmp/late-lines.txt
import fs from 'fs'; import * as acorn from 'acorn'; import * as walk from 'acorn-walk';
const MIN = +(process.argv[2] || 3000);
const src = fs.readFileSync('app.js', 'utf8'); const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
const nl = [0]; for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) nl.push(i + 1);
const ln = p => { let lo = 0, hi = nl.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (nl[m] <= p) lo = m; else hi = m - 1 } return lo + 1 };
const CORE = new Set(); for (const st of ast.body) { if (st.type === 'FunctionDeclaration') CORE.add(st.id.name); if (st.type === 'VariableDeclaration') st.declarations.forEach(d => d.id.type === 'Identifier' && CORE.add(d.id.name)) }
const OKCALL = new Set(['$', 'esc', 'fmt', 'fmtG', 'fmtH', 'R', 'ch', 'pickW', 'LS', 'xT', 'tEN']);
const EXC = /\btDock\b|\btGo\b|\btCont\b|\bwPick\b|bootL|__bootRun|setLang|I18N|\bLANG\b|serviceWorker|wSlot|\bwLoad\b|\bwNeed\b|\bwReady\b|__wSlots|frDesk|'title'|#title|beforeunload|visibilitychange|\breadSave\b|\bwriteSave\b|\bsaveGame\b|CH_KEYS=|SYS_GUIDE|CODEX|\.push\(\{s:'/;
const root = n => { while (n && n.type === 'MemberExpression') n = n.object; return n && n.type === 'Identifier' ? n.name : null };
const lineCount = {}; ast.body.forEach(st => { const l = ln(st.start); lineCount[l] = (lineCount[l] || 0) + 1 });
function loadEffects(st) { const bad = [];
  const visit = (node, iife) => {
    if (!node || typeof node.type !== 'string') return;
    if (/Function/.test(node.type) && !iife) return; // ฟังก์ชันที่ไม่ได้เรียกทันที = ทำงานทีหลัง
    if (node.type === 'CallExpression') {
      const c = node.callee; const r = root(c);
      if (c.type === 'Identifier' && CORE.has(c.name) && !OKCALL.has(c.name)) bad.push('call ' + c.name);
      if (c.type === 'MemberExpression' && r && CORE.has(r) && !OKCALL.has(r)) bad.push('call ' + r + '.' + (c.property.name || '?'));
      if (c.type === 'MemberExpression' && c.object.type === 'Identifier' && c.object.name === 'Object' && node.arguments[0]) { const r0 = root(node.arguments[0]); if (r0 && CORE.has(r0) && c.property.name !== 'keys' && c.property.name !== 'entries' && c.property.name !== 'values') bad.push('Object.' + c.property.name + ' ' + r0) }
      const cal = c.type === 'FunctionExpression' || c.type === 'ArrowFunctionExpression';
      visit(c, cal); node.arguments.forEach(a => visit(a, false)); return }
    if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression') { const r = root(node.left); if (r && CORE.has(r)) bad.push('set ' + r) }
    if (node.type === 'UpdateExpression' && node.argument.type === 'MemberExpression') { const r = root(node.argument); if (r && CORE.has(r)) bad.push('upd ' + r) }
    for (const k in node) { if (k === 'type' || k === 'start' || k === 'end') continue; const v = node[k]; if (Array.isArray(v)) v.forEach(x => x && typeof x.type === 'string' && visit(x, false)); else if (v && typeof v.type === 'string') visit(v, false) }
  };
  visit(st, false); return bad }
const cand = []; for (const st of ast.body) {
  if (st.type === 'FunctionDeclaration' || st.type === 'VariableDeclaration' || st.type === 'ClassDeclaration') continue;
  if (st.end - st.start < MIN) continue; const l = ln(st.start); if (lineCount[l] > 1) continue;
  const t = src.slice(st.start, st.end); if (EXC.test(t)) continue;
  const bad = loadEffects(st); if (bad.length) { cand.push({ l, st, bad }); continue }
  cand.push({ l, st, bad: null }) }
// ชื่อ window ที่ท่อนสร้าง แล้วมีที่อื่นใช้ → ไม่ย้าย
const sel = new Set(cand.filter(c => !c.bad).map(c => c.st)); let rest = ''; for (const st of ast.body) if (!sel.has(st)) rest += src.slice(st.start, st.end) + '\n';
const out = [], drop = {};
for (const c of cand) { if (c.bad) { drop[c.bad[0]] = (drop[c.bad[0]] || 0) + 1; continue }
  const names = new Set(); walk.full(c.st, n => { if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' && n.left.object.name === 'window' && !n.left.computed) names.add(n.left.property.name) });
  let used = null; for (const n of names) { if (CORE.has(n) || n.length < 3) continue; const re = new RegExp('(?<![\\w$])' + n.replace(/\$/g, '\\$') + '(?![\\w$])'); const assigned = new RegExp('window\\.' + n.replace(/\$/g, '\\$') + '\\s*=(?!=)').test(rest); if (!assigned && re.test(rest)) { used = n; break } }
  if (used) { drop['win ' + used] = 1; continue } out.push(c) }
const bytes = out.reduce((a, c) => a + Buffer.byteLength(src.slice(c.st.start, c.st.end)), 0);
console.error("เลือก", out.length, 'ท่อน', (bytes / 1e6).toFixed(2), 'MB · ตัดทิ้ง', Object.keys(drop).length, 'แบบ');
console.log(out.map(c => c.l).join(' '));
