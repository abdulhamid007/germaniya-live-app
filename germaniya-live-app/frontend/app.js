let currentUserId = 'guest';
let currentUserName = 'Foydalanuvchi';
let speechRate = 1.0;
let appData = {
  streetScenes: [],
  newsItems: [],
  dailyPhrases: []
};
let activeScene = null;

// Telegram Mini App integratsiyasi
const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
  if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    currentUserId = String(tg.initDataUnsafe.user.id);
    currentUserName = tg.initDataUnsafe.user.first_name || 'Talaba';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('userGreeting').textContent = `Salom, ${currentUserName}! Real muloqot`;
  setupTabs();
  setupSpeedControls();
  setupChatControls();
  setupModalControls();

  await loadContent();
  await loadUserState();
});

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderScenes(chip.dataset.filter);
    });
  });
}

function setupSpeedControls() {
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      speechRate = parseFloat(btn.dataset.rate);
    });
  });
}

function speakGerman(text, rate = 1.0) {
  if (!('speechSynthesis' in window)) {
    alert('Brauzeringiz ovozli o\'qishni qo\'llab-quvvatlamaydi.');
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'de-DE';
  utter.rate = rate;
  window.speechSynthesis.speak(utter);
}

async function loadContent() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/content`);
    appData = await res.json();
    renderScenes('all');
    renderNews();
    renderPhrases();
  } catch (err) {
    console.error('Kontent yuklashda xato:', err);
    document.getElementById('scenesContainer').innerHTML =
      `<div class="card"><p>⚠️ Backend serverga ulanib bo'lmadi (${API_BASE_URL}). Server ishlayotganini tekshiring.</p></div>`;
  }
}

async function loadUserState() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${currentUserId}`);
    const user = await res.json();
    updateStatsUI(user);
    renderChatHistory(user.chatHistory || []);
  } catch (err) {
    console.error('Foydalanuvchi xotirasini yuklashda xato:', err);
  }
}

function updateStatsUI(user) {
  document.getElementById('xpCount').textContent = user.xp || 0;
}

async function saveProgress(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/${currentUserId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, name: currentUserName })
    });
    const updated = await res.json();
    updateStatsUI(updated);
  } catch (err) {
    console.error('Progress saqlashda xato:', err);
  }
}

function renderScenes(filter = 'all') {
  const container = document.getElementById('scenesContainer');
  const list = filter === 'all'
    ? appData.streetScenes
    : appData.streetScenes.filter(s => s.category === filter);

  container.innerHTML = list.map(scene => `
    <div class="card">
      <div class="scene-header">
        <span class="scene-badge">${scene.badge}</span>
        <span class="scene-meta">${scene.location} • ${scene.duration}</span>
      </div>
      <h3>${scene.title}</h3>
      <p class="subtitle-uz">${scene.titleUz}</p>

      <div class="dialog-list">
        ${scene.dialog.map(line => `
          <div class="dialog-line ${line.role}" onclick="speakGerman(\`${line.de.replace(/`/g, '')}\`, 0.95)">
            <span class="speaker-tag">🔊 ${line.speaker}</span>
            <div class="de-text">${line.de}</div>
            <div class="uz-text">${line.uz}</div>
          </div>
        `).join('')}
      </div>

      <div class="card-actions">
        <button class="btn-secondary" onclick="playFullDialog('${scene.id}')">▶️ To'liq eshitish</button>
        <button class="btn-primary" onclick="openRoleplay('${scene.id}')">🎙️ Endi siz gapiring!</button>
        <a class="yt-link" href="${scene.youtubeSearchUrl}" target="_blank" rel="noopener">▶️ YouTube Real Video</a>
      </div>
    </div>
  `).join('');
}

function playFullDialog(sceneId) {
  const scene = appData.streetScenes.find(s => s.id === sceneId);
  if (!scene) return;
  const fullText = scene.dialog.map(d => d.de).join(' ... ');
  speakGerman(fullText, 0.95);
  saveProgress({ xpGain: 15, sceneId });
}

function renderNews() {
  const container = document.getElementById('newsContainer');
  container.innerHTML = appData.newsItems.map(news => `
    <div class="card">
      <div class="scene-header">
        <span class="scene-badge">${news.tag}</span>
        <span class="scene-meta">${news.time}</span>
      </div>
      <h3>${news.headlineDe}</h3>
      <p class="subtitle-uz">${news.headlineUz}</p>
      <p class="de-text" style="margin-bottom:6px;">${news.bodyDe}</p>
      <p class="uz-text">${news.bodyUz}</p>

      <div class="vocab-chips">
        ${news.vocab.map(v => `<span class="vocab-item"><strong>${v.word}</strong> — ${v.meaning}</span>`).join('')}
      </div>

      <div class="card-actions">
        <button class="btn-primary" onclick="speakGerman(\`${news.headlineDe}. ${news.bodyDe}\`, speechRate)">🔊 Yangilikni eshitish</button>
      </div>
    </div>
  `).join('');
}

function renderPhrases() {
  const container = document.getElementById('phrasesContainer');
  container.innerHTML = appData.dailyPhrases.map(p => `
    <div class="card">
      <div class="scene-header">
        <span class="scene-badge">${p.category}</span>
      </div>
      <h3>${p.de}</h3>
      <p class="subtitle-uz">${p.uz}</p>
      <div class="dialog-line" onclick="speakGerman(\`${p.exampleDe}\`, 0.95)">
        <span class="speaker-tag">💬 Jonli misol (bosib eshiting):</span>
        <div class="de-text">${p.exampleDe}</div>
        <div class="uz-text">${p.exampleUz}</div>
      </div>
      <div class="card-actions">
        <button class="btn-secondary" onclick="speakGerman(\`${p.de}\`, 0.9)">🔊 Talaffuz</button>
        <button class="btn-primary" onclick="saveProgress({ xpGain: 10, phraseId: '${p.id}' })">✅ Yodladim (+10 XP)</button>
      </div>
    </div>
  `).join('');
}

// Roleplay Modal
function openRoleplay(sceneId) {
  activeScene = appData.streetScenes.find(s => s.id === sceneId);
  if (!activeScene) return;

  document.getElementById('modalPromptDe').textContent = activeScene.challengePromptDe;
  document.getElementById('modalPromptUz').textContent = activeScene.challengePromptUz;
  document.getElementById('modalSampleDe').textContent = activeScene.sampleAnswerDe;
  document.getElementById('modalSampleUz').textContent = activeScene.sampleAnswerUz;
  document.getElementById('speechResultText').textContent = 'Gapirganingiz bu yerda ko\'rinadi...';

  document.getElementById('roleplayModal').classList.remove('hidden');
  speakGerman(activeScene.challengePromptDe, 0.95);
}

function setupModalControls() {
  document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('roleplayModal').classList.add('hidden');
  });

  document.getElementById('listenSampleBtn').addEventListener('click', () => {
    if (activeScene) speakGerman(activeScene.sampleAnswerDe, 0.9);
  });

  document.getElementById('recordRoleplayBtn').addEventListener('click', () => {
    startSpeechRecognition((transcript) => {
      document.getElementById('speechResultText').textContent = `Siz aytdingiz: "${transcript}" ✅ (+25 XP)`;
      if (activeScene) {
        saveProgress({ xpGain: 25, sceneId: activeScene.id });
      }
    });
  });
}

// Chat Controls
function setupChatControls() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendChatBtn');
  const micBtn = document.getElementById('micChatBtn');
  const clearBtn = document.getElementById('clearChatBtn');

  sendBtn.addEventListener('click', () => sendChatMessage());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  micBtn.addEventListener('click', () => {
    micBtn.classList.add('listening');
    startSpeechRecognition((transcript) => {
      micBtn.classList.remove('listening');
      input.value = transcript;
      sendChatMessage();
    }, () => micBtn.classList.remove('listening'));
  });

  clearBtn.addEventListener('click', async () => {
    const res = await fetch(`${API_BASE_URL}/api/user/${currentUserId}/chat`, { method: 'DELETE' });
    const user = await res.json();
    renderChatHistory(user.chatHistory || []);
  });
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const scenario = document.getElementById('chatScenario').value;
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  const chatBox = document.getElementById('chatMessages');
  chatBox.innerHTML += `<div class="msg user">${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUserId, message: text, scenario })
    });
    const data = await res.json();
    updateStatsUI(data.user);
    renderChatHistory(data.user.chatHistory || []);
    if (data.reply && data.reply.de) {
      speakGerman(data.reply.de, 0.98);
    }
  } catch (err) {
    chatBox.innerHTML += `<div class="msg ai">⚠️ Server bilan aloqa uzildi.</div>`;
  }
}

function renderChatHistory(history) {
  const chatBox = document.getElementById('chatMessages');
  chatBox.innerHTML = history.map(m => {
    if (m.role === 'user') {
      return `<div class="msg user">${m.text}</div>`;
    }
    return `
      <div class="msg ai" onclick="speakGerman(\`${(m.de || '').replace(/`/g, '')}\`, 0.95)">
        <div><strong>🔊 ${m.de}</strong></div>
        <div class="uz-text">${m.uz}</div>
        ${m.correction ? `<div class="msg-correction">💡 Tuzatish: ${m.correction}</div>` : ''}
      </div>
    `;
  }).join('');
  chatBox.scrollTop = chatBox.scrollHeight;
}

function startSpeechRecognition(onResult, onEnd) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Brauzeringiz mikrofon orqali nutqni tanishni qo\'llab-quvvatlamaydi (Chrome yoki Telegram Desktop/Android ishlating).');
    if (onEnd) onEnd();
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'de-DE';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  recognition.onerror = () => {
    if (onEnd) onEnd();
  };
  recognition.onend = () => {
    if (onEnd) onEnd();
  };
  recognition.start();
}
