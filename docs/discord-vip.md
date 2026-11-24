# ยศ VIP ใน Discord อัตโนมัติ

ผู้เล่นผูกบัญชี Discord จากหน้าโปรไฟล์ในเกม (ปุ่ม "🎮 ผูก Discord") แล้วระบบจะให้/ถอดยศ VIP ในเซิร์ฟเวอร์ให้เอง

| สิทธิ์ในเกม | ยศใน Discord |
|---|---|
| VIP v1 (39฿/30 วัน) | 💎 VIP |
| VIP v2 (99฿/30 วัน) | 💎 VIP+ |
| VIP v3 (599฿ ถาวร) | 💎 VIP MAX |

ระดับสูงสุดที่ยังไม่หมดอายุเท่านั้นที่ได้ยศ (ยศอื่นถูกถอด)

## ตั้งค่า (ทำครั้งเดียว)
1. https://discord.com/developers/applications → เลือกแอปของบอท → **OAuth2**
   - เพิ่ม Redirect: `https://www.1inanovel.com/api/online?a=dccb`
   - คัดลอก **Client ID** และ **Client Secret**
2. ตั้งค่าลับบนโฮสต์ (Vercel Environment Variables หรือ `wrangler secret put`):
   - `DISCORD_BOT_TOKEN` (Token ของบอท 1 ใน นวนิยาย)
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - (ไม่บังคับ) `DISCORD_GUILD_ID`, `DISCORD_INVITE`, `DISCORD_REDIRECT`, `CRON_SECRET`
3. Deploy ใหม่

ถ้ายังไม่ตั้ง 3 ค่าแรก ฟีเจอร์จะปิดเอง ปุ่มในเกมไม่แสดง และการซื้อ/VIP ทำงานเหมือนเดิม

## ข้อกำหนดฝั่ง Discord
- ยศของบอทต้องอยู่เหนือยศ VIP, VIP+, VIP MAX ในตั้งค่าเซิร์ฟเวอร์ (บอทให้ยศได้เฉพาะที่ต่ำกว่าตัวเอง)
- บอทต้องมีสิทธิ์ Manage Roles

## ทำงานเมื่อไร
- หลังจ่ายเงินสำเร็จ (`payGrant`), อนุมัติเอง/แอดมินให้ VIP, และตอนผูกบัญชี
- cron รายวัน `?a=dcsync` (Vercel เวลา 18:30 UTC) ปรับยศทุกคนที่ผูกไว้ให้ตรงกับ VIP ปัจจุบัน → ถอดยศเมื่อหมดอายุ
- ขั้นตอนทั้งหมดไม่บล็อกการจ่ายเงิน: ถ้า Discord ล่มหรือผู้เล่นยังไม่อยู่ในเซิร์ฟเวอร์ การซื้อยังสำเร็จ และ cron จะปรับยศให้ภายหลัง

## ความเป็นส่วนตัว
เกมใช้ OAuth `identify` อ่านเฉพาะรหัสบัญชี Discord ไม่เก็บ access token ไม่เห็นอีเมล/รหัสผ่าน

## คีย์ในฐานข้อมูล
`dc:<uid>` = รหัส Discord · `dcr:<discordId>` = uid (หนึ่ง Discord ต่อหนึ่งบัญชีเกม) · `dcall` = ชุดผู้ที่ผูกไว้
