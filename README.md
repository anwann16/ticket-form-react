# 🎟️ Form Pendaftaran Tiket

React (Next.js) form yang kirim data ke Telegram + backup ke JSON di VPS.

## Deploy ke Vercel

1. Push repo ini ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Set Environment Variables:
   ```
   TELEGRAM_BOT_TOKEN=8978011735:AAEHjURvhBNnQQZuVqG6iE7ry_Tsag8ZLDM
   TELEGRAM_CHAT_ID=1062155417
   BACKUP_URL=http://54.252.190.91:5000/api/backup
   ```
4. Deploy

## Architecture

```
User → Vercel (React Form) → API Route
                                  ├── Telegram Bot API
                                  └── VPS Backend → backup.json
```

## Backup

- Data otomatis disimpan ke `/home/ubuntu/ticket-form/backup.json` di VPS
- Export: `GET http://54.252.190.91:5000/api/backup/export`

## Local Dev

```bash
npm install
npm run dev
```
