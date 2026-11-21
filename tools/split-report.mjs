// รายงานจากแผนที่: แต่ละโลกมีกี่ MB · ท่อนของโลกส่งชื่ออะไรออกไป · ท่อนนอกโลกเรียกชื่อพวกนั้นกี่ที่ (ยิ่งน้อยยิ่งแยกง่าย)
// ใช้: node tools/split-report.mjs /tmp/map.json
import fs from 'fs';
const M = JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/map.json'));
const WS = ['mw', 'sky', 'soul', 'loop', 'beast', 'hunter', 'zombie', 'demon'];
const tag = s => { let best = null, b = 0, tot = 0; for (const w of WS) { const v = s.w[w] || 0; tot += v; if (v > b) { b = v; best = w } } return b >= 3 && b >= tot * .6 ? best : null };
const own = {}; M.st.forEach(s => { s.t = tag(s); (own[s.t || 'core'] = own[s.t || 'core'] || []).push(s) });
const G = new Set(); M.st.forEach(s => s.decl.forEach(x => G.add(x)));
const rows = [];
for (const w of [...WS, 'core']) {
  const L = own[w] || [], size = L.reduce((a, s) => a + s.len, 0); if (w === 'core') { rows.push({ w, mb: +(size / 1e6).toFixed(2), n: L.length }); continue }
  const coreDecl = new Set(); M.st.forEach(s => { if (s.t !== w) s.decl.forEach(x => coreDecl.add(x)) });
  const ex = new Set(); L.forEach(s => { s.decl.forEach(x => ex.add(x)); s.win.forEach(x => { if (!coreDecl.has(x)) ex.add(x) }) });
  // ชื่อที่ท่อนในโลกนี้เขียนทับ (wrapper) ของคนอื่น = ต้องโหลดหลังเจ้าของ
  const wraps = new Set(); L.forEach(s => s.reassign.forEach(x => { if (!ex.has(x) && G.has(x)) wraps.add(x) }));
  const outside = {}; M.st.forEach(s => { if (s.t === w) return; s.refs.forEach(r => { if (ex.has(r)) (outside[r] = outside[r] || new Set()).add(s.line) }) });
  const outN = Object.keys(outside).length, outSites = Object.values(outside).reduce((a, x) => a + x.size, 0);
  rows.push({ w, mb: +(size / 1e6).toFixed(2), n: L.length, exports: ex.size, usedOutside: outN, outsideSites: outSites, wrapsCore: wraps.size, wl: [...wraps].slice(0, 40).join(' '), top: Object.entries(outside).sort((a, b) => b[1].size - a[1].size).slice(0, 8).map(([k, v]) => k + '×' + v.size).join(' ') });
}
console.table(rows.map(({ top, ...r }) => r)); rows.filter(r => r.top).forEach(r => console.log(r.w, '→ ถูกเรียกจากนอกโลก:', r.top));

rows.filter(r => r.wl).forEach(r => console.log(r.w, '→ ห่อฟังก์ชันกลาง:', r.wl));
