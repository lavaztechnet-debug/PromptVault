/* --- FILE: app.js --- */

// ===== STATE MANAGEMENT =====
let allPrompts = [...prompts];
let customPrompts = [];
let favoritePrompts = [];
let currentFilter = 'all';

// Modal State
let currentPromptTemplate = '';
let currentPromptAction = ''; 
let currentVariables = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initTheme();
  renderPrompts();
  setupEventListeners();
  renderCustomPromptsList();
  initNotepad(); // Ensure Notepad initializes
});

function loadData() {
  const savedCustom = localStorage.getItem('lavaCustomPrompts');
  if (savedCustom) {
    customPrompts = JSON.parse(savedCustom);
    allPrompts = [...prompts, ...customPrompts];
  }
  const savedFavs = localStorage.getItem('lavaFavoritePrompts');
  if (savedFavs) {
    favoritePrompts = JSON.parse(savedFavs);
  }
}

function saveData() {
  localStorage.setItem('lavaCustomPrompts', JSON.stringify(customPrompts));
  localStorage.setItem('lavaFavoritePrompts', JSON.stringify(favoritePrompts));
}

// ===== NOTEPAD LOGIC =====
function initNotepad() {
  const editor = document.getElementById('noteEditor');
  if (!editor) return;
  editor.value = localStorage.getItem('lavaQuickNote') || '';
  editor.addEventListener('input', () => {
    localStorage.setItem('lavaQuickNote', editor.value);
  });
}

// ===== THEME TOGGLE =====
function initTheme() {
  const isDark = localStorage.getItem('lavaTheme') === 'dark';
  if (isDark) {
    document.body.classList.add('dark-theme');
    document.getElementById('themeToggleBtn').innerText = '☀️';
    document.getElementById('themeColorMeta').setAttribute('content', '#1e272e');
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('lavaTheme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggleBtn').innerText = isDark ? '☀️' : '🌙';
  document.getElementById('themeColorMeta').setAttribute('content', isDark ? '#1e272e' : '#e0e5ec');
}

// ===== SETUP =====
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderPrompts(e.target.value));
  }
  
  document.querySelectorAll('.cat-badge').forEach(badge => {
    badge.addEventListener('click', (e) => filterByCategory(e.target.dataset.category));
  });
}

// ===== RENDER FUNCTIONS =====
function renderPrompts(filterQuery = '') {
  const grid = document.getElementById('promptGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const query = filterQuery.toLowerCase();

  const filtered = allPrompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(query) || p.prompt.toLowerCase().includes(query);
    let matchesCategory = true;
    if (currentFilter === 'favorites') matchesCategory = favoritePrompts.includes(p.id);
    else if (currentFilter !== 'all') matchesCategory = p.category === currentFilter;
    return matchesSearch && matchesCategory;
  });

  filtered.forEach((p) => {
    const isFav = favoritePrompts.includes(p.id);
    const card = document.createElement('div');
    card.className = `prompt-card`;
    card.innerHTML = `
      <div class="prompt-card-header">
        <span class="prompt-icon">${p.icon}</span>
        <h3 style="font-size: 1.1rem; padding-right: 30px;">${p.title}</h3>
        <button onclick="toggleFavorite(${p.id})" class="fav-btn">${isFav ? '❤️' : '🤍'}</button>
      </div>
      <p style="font-size: 0.85rem; margin-bottom: 12px;">${escapeHtml(p.prompt)}</p>
      <button onclick="handlePromptAction('${escapeForJsString(p.prompt)}')" class="neo-btn w-full">📋 Copy</button>
    `;
    grid.appendChild(card);
  });
}

// ===== ACTIONS =====
function handlePromptAction(promptText) {
  navigator.clipboard.writeText(promptText);
  showToast('📋 Copied to clipboard!');
}

function toggleFavorite(id) {
  if (favoritePrompts.includes(id)) favoritePrompts = favoritePrompts.filter(f => f !== id);
  else favoritePrompts.push(id);
  saveData();
  renderPrompts(document.getElementById('searchInput').value);
}

// ===== CUSTOM PROMPTS =====
function renderCustomPromptsList() {
  const list = document.getElementById('customPromptsList');
  if (!list) return;
  list.innerHTML = customPrompts.map((p, i) => `
    <div class="prompt-card" style="padding: 16px;">
      <div class="prompt-card-header">
        <span class="prompt-icon">${p.icon}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <button onclick="deleteCustomPrompt(${i})" style="color:red; font-size: 0.8rem;">❌</button>
      </div>
      <p style="font-size: 0.8rem;">${escapeHtml(p.prompt)}</p>
    </div>
  `).join('');
}

function addCustomPrompt() {
  const title = document.getElementById('customTitle').value;
  const prompt = document.getElementById('customPrompt').value;
  if (!title || !prompt) return showToast('❌ Fill fields');
  
  const newPrompt = { id: Date.now(), category: document.getElementById('customCategory').value, icon: document.getElementById('customIcon').value || '✨', title, prompt };
  customPrompts.push(newPrompt);
  allPrompts.push(newPrompt);
  saveData();
  renderCustomPromptsList();
  renderPrompts();
  clearCustomForm();
  showToast('✅ Saved!');
}

function deleteCustomPrompt(index) {
  customPrompts.splice(index, 1);
  allPrompts = [...prompts, ...customPrompts];
  saveData();
  renderCustomPromptsList();
  renderPrompts();
}

// ===== UTILITIES =====
function clearCustomForm() {
  document.getElementById('customTitle').value = '';
  document.getElementById('customPrompt').value = '';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function filterByCategory(cat) {
  currentFilter = cat;
  document.querySelectorAll('.cat-badge').forEach(b => b.classList.remove('active'));
  document.querySelector(`.cat-badge[data-category="${cat}"]`).classList.add('active');
  renderPrompts();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeForJsString(text) {
  return text.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}
