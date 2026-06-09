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

// Render Prompts with Sequential Numbering and Fixed Layout
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
    card.innerHTML = \`
      <div class="prompt-number">\${index + 1}</div>
      <div class="prompt-card-header">
        <div class="prompt-icon">\${p.icon}</div>
        <div style="flex: 1; min-width: 0;">
          <h3 class="text-xl truncate">\${p.title}</h3>
          <p class="text-sm opacity-60 uppercase tracking-wider truncate">\${p.category}</p>
        </div>
        <button onclick="toggleFav(\${p.id})" class="fav-btn" title="Add to Favorites">
          \${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="prompt-content-area">
        \${p.prompt}
      </div>
      <button onclick="copyPrompt('\${p.prompt.replace(/'/g, "\\\\'")}')" class="neo-btn primary w-full">
        <span>📋</span> Copy Prompt
      </button>
    \`;
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
  const allText = prompts.map((p, i) => \`\${i+1}. [\${p.title}]\\n\${p.prompt}\`).join('\\n\\n');
  navigator.clipboard.writeText(allText).then(() => {
    showToast('All Prompts Copied!');
  });
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
