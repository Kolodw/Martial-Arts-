# ย้ายเว็บไป Cloudflare Workers (เตรียมไว้ก่อน ยังไม่ได้ใช้)

ตอนนี้เว็บจริงยังรันบน **Vercel** ตามปกติ ไฟล์ในโฟลเดอร์นี้ไม่กระทบ Vercel เลย
ถ้าวันไหนโควต้า Vercel ไม่พอ ทำตามขั้นตอนนี้ได้ทันที เกม ฐานข้อมูล และเซฟเดิมใช้ต่อได้หมด (ฐานข้อมูลยังเป็น Aiven Valkey ตัวเดิม)

## ทำไม Cloudflare
| | Vercel Hobby (ฟรี) | Cloudflare ฟรี | Cloudflare Paid ($5/เดือน) |
|---|---|---|---|
| คำขอ API | 1 ล้าน/เดือน + CPU 4 ชม. | 100,000/วัน (~3 ล้าน/เดือน) | 10 ล้าน/เดือน (เกินจ่ายเพิ่ม $0.30 ต่อล้าน) |
| ไฟล์หน้าเว็บ (index.html, รูป, เพลง) | นับรวมโควต้า | **ฟรีไม่จำกัด** | **ฟรีไม่จำกัด** |
| เกินโควต้า | เว็บปิด (402) | API ตอบ error จนเที่ยงคืน UTC | ไม่ปิด จ่ายเพิ่มตามจริง |

แนะนำ **Paid $5** ถ้าคนเล่นเยอะ เพราะแบบฟรีถ้าเกิน 100,000 ครั้งในวันเดียว ออนไลน์จะหยุดถึง 7 โมงเช้า (เวลาไทย)

## สิ่งที่ต้องมี
- บัญชี Cloudflare (สมัครฟรีที่ dash.cloudflare.com)
- คอมที่มี Node.js 20 ขึ้นไป (หรือให้ Claude ทำให้ แต่ต้องมี API Token ของ Cloudflare)
- ค่าลับเดิมทั้งหมด (Vercel ไม่ยอมให้ดูค่าที่ตั้งเป็น sensitive ต้องไปเอาจากต้นทาง)

| ชื่อ | เอามาจากไหน |
|---|---|
| `VALKEY_URL` | หน้า Aiven → บริการ Valkey → Service URI |
| `ADMIN_KEY2` (และ `ADMIN_KEY` ถ้ายังใช้) | รหัสผู้ดูแลที่ตั้งไว้เอง (ADMIN_KEY2 ดูได้ใน Vercel → Settings → Environment Variables) |
| `GOOGLE_CLIENT_ID` | Vercel (ค่านี้ไม่ลับ) |
| `VAPID_PUB`, `VAPID_PRIV` | VAPID_PUB อยู่ใน Vercel · VAPID_PRIV ต้องใช้ค่าเดิม ถ้าหาไม่เจอ การแจ้งเตือนเก่าจะใช้ไม่ได้ (ทุกคนต้องกดเปิดแจ้งเตือนใหม่) |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | (ไม่บังคับ ใช้สำรอง) หน้า Upstash → database → REST API |

> ⚠️ ถ้าตั้ง IP allowlist ไว้ที่ Aiven ต้องเปิดให้ `0.0.0.0/0` เพราะ Cloudflare ไม่มี IP ตายตัว (รหัสผ่านใน VALKEY_URL ยังป้องกันอยู่)

## ขั้นตอน (ประมาณ 15 นาที)
```bash
git clone https://github.com/Kolodw/Martial-Arts-.git && cd Martial-Arts-/cloudflare
npx wrangler login                       # เปิดเว็บให้กดอนุญาต

# ใส่ค่าลับทีละตัว (มันจะถามให้วางค่า)
npx wrangler secret put VALKEY_URL
npx wrangler secret put ADMIN_KEY2
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put VAPID_PUB
npx wrangler secret put VAPID_PRIV
npx wrangler secret put KV_REST_API_URL     # ไม่บังคับ
npx wrangler secret put KV_REST_API_TOKEN   # ไม่บังคับ

npx wrangler deploy                      # ได้ลิงก์ https://1inanovel.<ชื่อบัญชี>.workers.dev
```
เปิดลิงก์ workers.dev ลองเล่น ดูทำเนียบ ประมูล ลานประลอง ให้ครบก่อนย้ายโดเมน

## ย้ายโดเมน 1inanovel.com
1. Cloudflare → **Add a domain** → ใส่ `1inanovel.com` → เลือกแพ็กฟรี
2. Cloudflare จะให้ nameserver 2 ตัว → ไปเปลี่ยนที่ที่ซื้อโดเมน (ถ้าซื้อผ่าน Vercel: Vercel → Domains → 1inanovel.com → Nameservers)
3. รอให้ Cloudflare ขึ้นว่า Active (ส่วนใหญ่ไม่กี่นาที บางทีถึง 24 ชม.)
4. Workers & Pages → `1inanovel` → Settings → **Domains & Routes** → Add → Custom domain → ใส่ `www.1inanovel.com` และ `1inanovel.com`
5. ตั้ง Google Login ให้รู้จักโดเมนเดิม (ถ้าโดเมนเหมือนเดิมไม่ต้องทำอะไร ถ้าใช้ลิงก์ workers.dev ต้องเพิ่มใน Google Cloud Console → Authorized JavaScript origins)

เซฟผู้เล่นอยู่ในเครื่องเขาและในฐานข้อมูลเดิม ย้ายแล้วไม่หาย

## อัปเดตเกมหลังย้าย
- แบบง่าย: Workers & Pages → `1inanovel` → Settings → Build → **Connect to Git** → เลือก repo `Kolodw/Martial-Arts-`, root directory = `cloudflare`, คำสั่ง deploy = `npx wrangler deploy` ทุกครั้งที่ push จะขึ้นเว็บเอง
- หรือรัน `npx wrangler deploy` ในโฟลเดอร์ `cloudflare` เอง

เมื่อย้ายเสร็จแล้ว ไป Vercel → Settings → Git → Disconnect เพื่อไม่ให้ทั้งสองที่ deploy ซ้อนกัน

## ถ้ามีปัญหา ย้อนกลับ
เอาโดเมนออกจาก Worker (ขั้นที่ 4) แล้วชี้กลับไป Vercel (เปลี่ยน nameserver กลับ หรือเพิ่ม CNAME `www` → `cname.vercel-dns.com`) เว็บ Vercel เดิมยังอยู่ครบ

## หมายเหตุเทคนิค
- `worker.js` แปลงคำขอให้ `api/online.js` ตัวเดิมทำงานได้โดยไม่ต้องแก้โค้ดเกม (เส้นทางกับดักบอทเหมือน vercel.json)
- Workers ใช้การเชื่อมต่อฐานข้อมูลข้ามคำขอไม่ได้ จึงเปิด TLS ใหม่ทุกคำขอ และทำคำขอ API ทีละคำขอต่อ isolate (Cloudflare เปิดหลาย isolate เองเมื่อคนเยอะ)
- `_headers` = หัว cache แบบเดียวกับ vercel.json · `.assetsignore` = ไฟล์ที่ไม่เปิดให้โหลด (api, dump.rdb, md ฯลฯ)
- ทดสอบแล้วบนเครื่อง (wrangler dev + Redis): หน้าเว็บ, ping, ทำเนียบ (ส่งชีวิตขึ้นกระดานได้), ลานประลอง, กับดักบอท, คำขอพร้อมกัน 60 ครั้ง ผ่านหมด
- ยังไม่ได้ทดสอบ: ส่ง Web Push จริง และ Google Login บนโดเมนจริง ลองเช็คหลัง deploy
- ทดสอบในเครื่อง: สร้าง `cloudflare/.dev.vars` ใส่ `VALKEY_URL=redis://...` แล้ว `npx wrangler dev` (ไฟล์นี้ไม่ขึ้น git)
