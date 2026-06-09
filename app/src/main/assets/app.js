// ===== STATE MANAGEMENT =====
let allPrompts = [...prompts];
let favoritePrompts = [];
let currentFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
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
  localStorage.setItem('lavaQuickNote', editor.value);
  showToast('💾 Note Saved!');
}

// ===== THEME LOGIC =====
function initTheme() {
  const isDark = localStorage.getItem('lavaTheme') === 'dark';
  if (isDark) {
    document.body.classList.add('dark-theme');
    document.getElementById('themeToggleBtn').innerText = '☀️';
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('lavaTheme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggleBtn').innerText = isDark ? '☀️' : '🌙';
}

// ===== RENDER & ACTIONS =====
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  document.getElementById('searchInput').addEventListener('input', (e) => renderPrompts(e.target.value));
}

function renderPrompts(filterQuery = '') {
  const grid = document.getElementById('promptGrid');
  grid.innerHTML = '';
  const query = filterQuery.toLowerCase();

  allPrompts.filter(p => p.title.toLowerCase().includes(query) || p.prompt.toLowerCase().includes(query))
    .forEach((p) => {
      const isFav = favoritePrompts.includes(p.id);
      const card = document.createElement('div');
      card.className = `prompt-card`;
      card.innerHTML = `
        <div class="prompt-card-header">
          <span class="prompt-icon">${p.icon}</span>
          <h3 style="font-size: 1.1rem; padding-right: 30px;">${p.title}</h3>
          <button onclick="toggleFavorite(${p.id})" class="fav-btn">${isFav ? '❤️' : '🤍'}</button>
        </div>
        <p style="font-size: 0.85rem; margin-bottom: 12px; opacity: 0.8;">${p.prompt}</p>
        <button onclick="copyToClipboard('${p.prompt.replace(/'/g, "\\'")}')" class="neo-btn w-full">📋 Copy</button>
      `;
      grid.appendChild(card);
    });
}

function copyAllPrompts() {
  const allText = allPrompts.map(p => `Title: ${p.title}\nPrompt: ${p.prompt}\n---`).join('\n\n');
  navigator.clipboard.writeText(allText);
  showToast('📋 All prompts copied!');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showToast('📋 Copied!');
}

function toggleFavorite(id) {
  if (favoritePrompts.includes(id)) favoritePrompts = favoritePrompts.filter(f => f !== id);
  else favoritePrompts.push(id);
  saveData();
  renderPrompts(document.getElementById('searchInput').value);
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
