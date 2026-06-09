// Application State
let currentTheme = localStorage.getItem('theme') || 'light';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  renderPrompts();
  setupTabs();
  setupSearch();
  loadNote();
});

// Theme Management
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.body.className = theme === 'dark' ? 'dark-theme' : '';
  const btn = document.getElementById('themeToggleBtn');
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  const meta = document.getElementById('themeColorMeta');
  meta.setAttribute('content', theme === 'dark' ? '#1e272e' : '#e0e5ec');
  localStorage.setItem('theme', theme);
}

// Render Prompts with Sequential Numbering
function renderPrompts(filter = '') {
  const grid = document.getElementById('promptGrid');
  grid.innerHTML = '';

  const filtered = prompts.filter(p => 
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.prompt.toLowerCase().includes(filter.toLowerCase()) ||
    p.category.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach((p, index) => {
    const isFav = favorites.includes(p.id);
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.innerHTML = `
      <div class="prompt-number">${index + 1}</div>
      <div class="prompt-card-header">
        <div class="prompt-icon">${p.icon}</div>
        <div>
          <h3 class="text-xl">${p.title}</h3>
          <p class="text-sm opacity-60 uppercase tracking-wider">${p.category}</p>
        </div>
        <button onclick="toggleFav(${p.id})" class="fav-btn" title="Add to Favorites">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="neo-inset-mini p-4 rounded-xl mb-6 flex-1 text-sm overflow-hidden" style="max-height: 150px; position: relative;">
        ${p.prompt}
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 30px; background: linear-gradient(transparent, var(--bg-base));"></div>
      </div>
      <button onclick="copyPrompt('${p.prompt.replace(/'/g, "\\'")}')" class="neo-btn primary w-full">
        <span>📋</span> Copy Prompt
      </button>
    `;
    grid.appendChild(card);
  });
}

// Search Logic
function setupSearch() {
  const input = document.getElementById('searchInput');
  input.addEventListener('input', (e) => {
    renderPrompts(e.target.value);
  });
}

// Tab Logic
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// Copy Logic
function copyPrompt(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Prompt Copied!');
  });
}

function copyAllPrompts() {
  const allText = prompts.map((p, i) => `${i+1}. [${p.title}]\n${p.prompt}`).join('\n\n');
  navigator.clipboard.writeText(allText).then(() => {
    showToast('All Prompts Copied!');
  });
}

// HTML Export Logic
function exportToHTML() {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Prompt Vault Export</title>
  <style>
    body { font-family: sans-serif; padding: 40px; line-height: 1.6; background: #f4f7f6; color: #333; }
    .container { max-width: 800px; margin: auto; }
    .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .number { color: #00cec9; font-weight: bold; margin-right: 10px; }
    .title { font-size: 1.2rem; font-weight: bold; }
    .category { font-size: 0.8rem; color: #999; text-transform: uppercase; margin-bottom: 10px; }
    pre { background: #eee; padding: 15px; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Prompt Vault Export - ${new Date().toLocaleDateString()}</h1>
    ${prompts.map((p, i) => `
      <div class="card">
        <div class="category">${p.category}</div>
        <div class="title"><span class="number">#${i + 1}</span> ${p.icon} ${p.title}</div>
        <pre>${p.prompt}</pre>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `PromptVault_Export_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('HTML Export Started!');
}

// Favorites Logic
function toggleFav(id) {
  const index = favorites.indexOf(id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderPrompts(document.getElementById('searchInput').value);
}

// Note Management
function loadNote() {
  const saved = localStorage.getItem('prompt_note');
  if (saved) document.getElementById('noteEditor').value = saved;
  
  document.getElementById('noteEditor').addEventListener('input', (e) => {
    localStorage.setItem('prompt_note', e.target.value);
  });
}

function saveNoteManually() {
  const content = document.getElementById('noteEditor').value;
  localStorage.setItem('prompt_note', content);
  showToast('Note Saved Locally!');
}

// UI Helpers
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
