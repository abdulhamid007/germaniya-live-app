// Lokal ishlatganda: http://localhost:3000
// Render.com ga joylaganingizdan keyin shu yerga Render URL manzilingizni yozasiz:
// Masalan: const API_BASE_URL = 'https://germaniya-live-backend.onrender.com';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://SIZNING-BACKEND-NOMINGIZ.onrender.com';
