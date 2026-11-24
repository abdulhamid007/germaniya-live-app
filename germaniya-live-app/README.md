# 🇩🇪 Germaniya Live — Full-Stack Nemis Tili & Telegram Mini App

Ushbu loyiha VS Code muhitida ishlash, GitHub Pages (Frontend) va Render.com (Backend + Telegram Bot) orqali ishga tushirish uchun alohida-alohida modullarga ajratilgan.

## 📁 Loyiha Tuzilmasi

```text
germaniya-live-app/
├── backend/                  # Node.js + Express + Grammy Telegram Bot + Real JSON Xotira
│   ├── data/                 # Foydalanuvchi XP, suhbat tarixi va progress saqlanadigan real xotira
│   ├── .env.example          # Muhit o'zgaruvchilari namunasi (buni .env qilib nusxalang)
│   ├── package.json          # Backend kutubxonalari
│   ├── server.js             # Asosiy REST API va Gemini AI serveri
│   ├── bot.js                # Telegram Bot (@BotFather) va Mini App tugmasi
│   ├── database.js           # Real doimiy xotira (db.json bilan ishlovchi modul)
│   └── content.js            # Ko'cha intervyulari, do'kon dialoglari, yangiliklar va so'zlar
│
├── frontend/                 # Telegram Mini App & Web Frontend
│   ├── index.html            # Asosiy HTML tuzilma
│   ├── style.css             # Zamonaviy qorong'u (Dark) dizayn
│   ├── config.js             # Backend API URL manzili sozlamasi
│   └── app.js                # Ovozli talaffuz, mikrofon, Telegram SDK va API mantiq
│
└── README.md                 # O'rnatish va Telegramga ulash qo'llanmasi
```

## 🚀 1. VS Code da Lokal Ishga Tushirish

1. ZIP arxivni oching va `germaniya-live-app` papkasini **VS Code** da oching.
2. VS Code terminalini oching (`Ctrl + ~`) va `backend` papkasiga kiring:
   ```bash
   cd backend
   npm install
   ```
3. `.env.example` faylidan nusxa olib `.env` faylini yarating va o'z kalitlaringizni kiriting:
   ```bash
   copy .env.example .env
   ```
   `.env` ichiga:
   - `BOT_TOKEN` — Telegram'dagi `@BotFather` dan olingan bot tokeni
   - `GEMINI_API_KEY` — Google AI Studio dan olingan bepul kalit
   - `WEBAPP_URL` — Frontend joylangan HTTPS manzil (masalan, GitHub Pages URL)
4. Serverni ishga tushiring:
   ```bash
   npm start
   ```
   Brauzerda `http://localhost:3000` manzilini oching — ilova tayyor!

## 🌐 2. GitHub Pages va Render.com ga Joylash (Telegramga Ulash)

1. **Frontend (GitHub Pages):**
   - `frontend/` papkasidagi fayllarni GitHub repozitoriyangizga yuklang va **Settings -> Pages** orqali yoqing.
   - Olingan HTTPS havolani (masalan `https://username.github.io/germaniya-live/`) nusxalab oling.
2. **Backend (Render.com):**
   - `backend/` papkasini Render.com da **Web Service** sifatida ishga tushiring (`Start Command: npm start`).
   - Render **Environment Variables** bo'limiga `.env` dagi `BOT_TOKEN`, `GEMINI_API_KEY` va `WEBAPP_URL` ni kiriting.
   - Render bergan backend manzilini `frontend/config.js` faylidagi `API_BASE_URL` ga yozib qo'ying.
3. **Telegram Bot:**
   - Telegramda botingizga `/start` yuboring va **Germaniya Live Ilovasini Ochish** tugmasini bosing!
