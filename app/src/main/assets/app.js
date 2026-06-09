/* --- FILE: app.js --- */

// ===== STATE MANAGEMENT =====
let allPrompts = [];
let favoritePrompts = [];

// ===== INITIALIZATION =====
// We use window.onload to ensure all external scripts (like prompts.js) are loaded
window.addEventListener('load', () => {
  // Safety check: ensure prompts data from prompts (2).js is available
  if (typeof prompts === 'undefined') {
    console.error("Critical Error: 'prompts' variable is not defined. Ensure prompts (2).js is loaded.");
    return;
  }

  allPrompts = [...prompts];
  loadData();
  initTheme();
  renderPrompts();
  setupEventListeners();
  initNotepad();
});

function loadData() {
  const savedFavs = localStorage.getItem('lavaFavoritePrompts');
  if (savedFavs) favoritePrompts = JSON.parse(savedFavs);
}

function saveData() {
  localStorage.setItem('lavaFavoritePrompts', JSON.stringify(favoritePrompts));
}

// ===== NOTEPAD LOGIC =====
function initNotepad() {
  const editor = document.getElementById('noteEditor');
  if (!editor) return;
  editor.value = localStorage.getItem('lavaQuickNote') || '';
}

function saveNoteManually() {
  const editor = document.getElementById('noteEditor');
  if (editor) {
    localStorage.setItem('lavaQuickNote', editor.value);
    showToast('💾 Note Saved!');
  }
}

// ===== THEME LOGIC =====
function initTheme() {
  const isDark = localStorage.getItem('lavaTheme') === 'dark';
  const btn = document.getElementById('themeToggleBtn');
  if (isDark) {
    document.body.classList.add('dark-theme');
    if (btn) btn.innerText = '☀️';
  }
}

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggleBtn');
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('lavaTheme', isDark ? 'dark' : 'light');
  if (btn) btn.innerText = isDark ? '☀️' : '🌙';
}

// ===== RENDER & ACTIONS =====
function setupEventListeners() {
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  
  // Search
  const search = document.getElementById('searchInput');
  if (search) {
    search.addEventListener('input', (e) => renderPrompts(e.target.value));
  }
}

function renderPrompts(filterQuery = '') {
  const grid = document.getElementById('promptGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  const query = filterQuery.toLowerCase();

  allPrompts.filter(p => p.title.toLowerCase().includes(query) || p.prompt.toLowerCase().includes(query))
    .forEach((p) => {
      const isFav = favoritePrompts.includes(p.id);
      const card = document.createElement('div');
      card.className = `prompt-card`;
      // We escape the prompt text for the onclick attribute
      const safePrompt = p.prompt.replace(/'/g, "\\'");
      card.innerHTML = `
        <div class="prompt-card-header">
          <span class="prompt-icon">${p.icon}</span>
          <h3 style="font-size: 1.1rem; padding-right: 30px;">${p.title}</h3>
          <button onclick="toggleFavorite(${p.id})" class="fav-btn">${isFav ? '❤️' : '🤍'}</button>
        </div>
        <p style="font-size: 0.85rem; margin-bottom: 12px; opacity: 0.8;">${p.prompt}</p>
        <button onclick="copyToClipboard('${safePrompt}')" class="neo-btn w-full">📋 Copy</button>
      `;
      grid.appendChild(card);
    });
}

function copyAllPrompts() {
  const allText = allPrompts.map(p => `Title: ${p.title}\nPrompt: ${p.prompt}\n---`).join('\n\n');
  navigator.clipboard.writeText(allText).then(() => {
    showToast('📋 All prompts copied!');
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Copied!');
  });
}

function toggleFavorite(id) {
  if (favoritePrompts.includes(id)) {
    favoritePrompts = favoritePrompts.filter(f => f !== id);
  } else {
    favoritePrompts.push(id);
  }
  saveData();
  const searchInput = document.getElementById('searchInput');
  renderPrompts(searchInput ? searchInput.value : '');
}

function switchTab(tabName) {
  const tab = document.getElementById(tabName);
  if (!tab) return;
  
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  tab.classList.add('active');
  const btn = document.querySelector(`[data-tab="${tabName}"]`);
  if (btn) btn.classList.add('active');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
