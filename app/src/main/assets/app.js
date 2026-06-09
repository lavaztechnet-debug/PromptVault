/* --- FILE: app.js --- */

// ===== STATE MANAGEMENT =====
let allPrompts = [...prompts];
let customPrompts = [];
let currentFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderPrompts();
  setupEventListeners();
  initNotepad();
});

function loadData() {
  const savedCustom = localStorage.getItem('lavaCustomPrompts');
  if (savedCustom) {
    customPrompts = JSON.parse(savedCustom);
    allPrompts = [...prompts, ...customPrompts];
  }
}

// ===== NOTEPAD LOGIC =====
function initNotepad() {
  const editor = document.getElementById('noteEditor');
  editor.value = localStorage.getItem('lavaQuickNote') || '';
  editor.addEventListener('input', () => {
    localStorage.setItem('lavaQuickNote', editor.value);
  });
}

// ===== RENDER FUNCTIONS =====
function renderPrompts(filterQuery = '') {
  const grid = document.getElementById('promptGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const query = filterQuery.toLowerCase();

  const filtered = allPrompts.filter(p => p.title.toLowerCase().includes(query) || p.prompt.toLowerCase().includes(query));

  filtered.forEach((p) => {
    const card = document.createElement('div');
    card.className = `prompt-card`;
    card.innerHTML = `
      <div class="prompt-card-header">
        <span class="prompt-icon">${p.icon}</span>
        <h3 style="font-size: 1.1rem;">${p.title}</h3>
      </div>
      <p style="font-size: 0.85rem; margin-bottom: 12px; opacity: 0.8;">${p.prompt}</p>
      <button onclick="copyToClipboard('${escapeForJsString(p.prompt)}')" class="neo-btn w-full">📋 Copy Prompt</button>
    `;
    grid.appendChild(card);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showToast('📋 Copied!');
}

// ===== TAB & UTILITIES =====
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

function escapeForJsString(text) {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
