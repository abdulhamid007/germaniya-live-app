const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'db.json');

const defaultData = {
  users: {}
};

function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function readDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("DB o'qishda xatolik:", err);
    return { ...defaultData };
  }
}

function writeDb(data) {
  ensureDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function getUser(userId) {
  const db = readDb();
  const id = String(userId || 'guest');
  if (!db.users[id]) {
    db.users[id] = {
      id,
      name: 'Foydalanuvchi',
      xp: 0,
      streak: 1,
      lastActive: new Date().toISOString().split('T')[0],
      completedScenes: [],
      learnedPhrases: [],
      chatHistory: [
        {
          role: 'ai',
          de: 'Hallo! Ich bin Lukas aus Berlin. Wie läuft dein Deutsch heute? Lass uns quatschen!',
          uz: 'Salom! Men Berlinlik Lukasman. Bugun nemis tiling qanday ketyapti? Keling gaplashamiz!',
          time: new Date().toISOString()
        }
      ]
    };
    writeDb(db);
  }
  return db.users[id];
}

function updateUser(userId, updaterFn) {
  const db = readDb();
  const id = String(userId || 'guest');
  const user = getUser(id);
  const updated = updaterFn(user);
  db.users[id] = updated;
  writeDb(db);
  return updated;
}

module.exports = {
  getUser,
  updateUser
};
