require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
const { getUser, updateUser } = require('./database');
const { streetScenes, newsItems, dailyPhrases } = require('./content');
const { initBot } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Frontend fayllarini lokal test uchun ham ulash
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Gemini AI ulanishi
let ai = null;
if (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('SIZNING_GEMINI_API')) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// 1. Kontentni olish (Ko'cha intervyulari, do'kon dialoglari, yangiliklar, iboralar)
app.get('/api/content', (req, res) => {
  res.json({
    streetScenes,
    newsItems,
    dailyPhrases
  });
});

// 2. Foydalanuvchi ma'lumotlari va real xotirani olish
app.get('/api/user/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  res.json(user);
});

// 3. Progressni saqlash (XP, sahna yoki ibora yodlash)
app.post('/api/user/:userId/progress', (req, res) => {
  const { xpGain = 0, sceneId, phraseId, name } = req.body;
  const updated = updateUser(req.params.userId, (user) => {
    if (name) user.name = name;
    user.xp += Number(xpGain);
    if (sceneId && !user.completedScenes.includes(sceneId)) {
      user.completedScenes.push(sceneId);
    }
    if (phraseId && !user.learnedPhrases.includes(phraseId)) {
      user.learnedPhrases.push(phraseId);
    }
    user.lastActive = new Date().toISOString().split('T')[0];
    return user;
  });
  res.json(updated);
});

// 4. Lukas aus Berlin (AI Suhbatdosh + Real Xotira bilan)
app.post('/api/chat', async (req, res) => {
  const { userId = 'guest', message, scenario = 'street' } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Xabar bo\'sh bo\'lishi mumkin emas' });
  }

  const user = getUser(userId);

  // Foydalanuvchi xabarini xotiraga yozish
  updateUser(userId, (u) => {
    u.chatHistory.push({
      role: 'user',
      text: message,
      time: new Date().toISOString()
    });
    u.xp += 10;
    return u;
  });

  let replyDe = '';
  let replyUz = '';
  let correction = '';

  if (ai) {
    try {
      const recentHistory = user.chatHistory.slice(-6).map(m =>
        m.role === 'user' ? `User: ${m.text}` : `Lukas: ${m.de}`
      ).join('\n');

      const prompt = `Sen Berlinlik do'stona nemis yigiti Lukassan. Foydalanuvchi nemis tilini (A2-B1 darajada) gapirishni mashq qilmoqda.
Hozirgi muhit: ${scenario} (street = ko'cha intervyusi, shop = do'kon/kassa, cafe = kafe/doner).
Oldingi suhbat tarixi:
${recentHistory}

Foydalanuvchi hozir yozdi: "${message}"

Vazifang:
1. Tabiiy, qisqa va jonli nemis tilida javob ber (1-3 gap).
2. O'zbek tilidagi aniq tarjimasini yoz.
3. Agar foydalanuvchining nemischa gapida xato bo'lsa, o'zbek tilida muloyimlik bilan to'g'ri variantini ko'rsat (xato bo'lmasa bo'sh qoldir).

Javobni FAQAT quyidagi JSON formatda qaytar:
{
  "de": "...",
  "uz": "...",
  "correction": "..."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const rawText = response.text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(rawText);
      replyDe = parsed.de || 'Super! Erzähl mir gerne mehr darüber.';
      replyUz = parsed.uz || 'Ajoyib! Menga bu haqda ko\'proq aytib ber.';
      correction = parsed.correction || '';
    } catch (err) {
      console.error('Gemini API xatosi:', err.message);
      replyDe = 'Sehr cool! Dein Deutsch klingt schon richtig gut. Und was machst du danach?';
      replyUz = 'Juda zo\'r! Nemis tiling ancha yaxshi eshitilyapti. Undan keyin nima qilasan?';
    }
  } else {
    // GEMINI_API_KEY kiritilmagan bo'lsa aqlli zaxira javob
    replyDe = 'Alles klar! Das hast du gut gesagt. Wie gefällt dir das Leben in Deutschland bisher?';
    replyUz = 'Tushunarli! Buni juda yaxshi aytding. Hozircha Germaniyadagi hayot senga qanday yoqyapti?';
  }

  const updatedUser = updateUser(userId, (u) => {
    u.chatHistory.push({
      role: 'ai',
      de: replyDe,
      uz: replyUz,
      correction,
      time: new Date().toISOString()
    });
    return u;
  });

  res.json({
    reply: { de: replyDe, uz: replyUz, correction },
    user: updatedUser
  });
});

// 5. Chat xotirasini tozalash
app.delete('/api/user/:userId/chat', (req, res) => {
  const updated = updateUser(req.params.userId, (u) => {
    u.chatHistory = [
      {
        role: 'ai',
        de: 'Neustart! Worüber wollen wir jetzt sprechen? Im Supermarkt oder auf der Straße?',
        uz: 'Qaytadan boshladik! Hozir nima haqida gaplashamiz? Supermarketdami yoki ko\'chadami?',
        time: new Date().toISOString()
      }
    ];
    return u;
  });
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`🚀 Germaniya Live serveri http://localhost:${PORT} portida ishga tushdi`);
  initBot();
});
