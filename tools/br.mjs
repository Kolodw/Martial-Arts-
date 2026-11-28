// บีบไฟล์เกม (app.js, pfx.js และไฟล์โลกขนาดใหญ่) ด้วย Brotli ระดับสูงสุดตอน deploy → ../_br/<ไฟล์>.br
// Cloudflare บีบเองได้แค่ระดับเร็ว (app.js ~2.9MB) · ระดับสูงสุดเหลือ ~1.9MB → เปิดเกมครั้งแรกเร็วขึ้น
// รันอัตโนมัติจาก wrangler.toml [build] ทุกครั้งที่ deploy (ไฟล์ .br ไม่ได้เก็บใน git จึงไม่มีทางเก่ากว่าต้นฉบับ)
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { brotliCompressSync, constants as Z } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..'), out = join(root, '_br');
try { rmSync(out, { recursive: true, force: true }) } catch (e) {}
// ต้องตรงกับ run_worker_first ใน cloudflare/wrangler.toml (ไฟล์ใหญ่เท่านั้น)
const files = ['app.js', 'pfx.js', ...['mw', 'late', 'sky', 'fan', 'soul', 'fog', 'en', 'mwb', 'mwx', 'upd'].map(n => `w/${n}.js`)];
let a = 0, b = 0; const t0 = Date.now();
for (const f of files) {
  const p = join(root, f); if (!existsSync(p)) continue;
  const src = readFileSync(p);
  const br = brotliCompressSync(src, { params: { [Z.BROTLI_PARAM_QUALITY]: 11, [Z.BROTLI_PARAM_LGWIN]: 24, [Z.BROTLI_PARAM_SIZE_HINT]: src.length, [Z.BROTLI_PARAM_MODE]: Z.BROTLI_MODE_TEXT } });
  const o = join(out, f + '.br'); mkdirSync(dirname(o), { recursive: true }); writeFileSync(o, br); a += src.length; b += br.length;
}
console.log(`br: ${files.length} ไฟล์ ${(a / 1e6).toFixed(1)}MB → ${(b / 1e6).toFixed(2)}MB ใน ${((Date.now() - t0) / 1000).toFixed(1)} วิ`);
