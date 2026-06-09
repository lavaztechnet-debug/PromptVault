/* --- FILE: app.js --- */
// ===== STATE MANAGEMENT =====
let allPrompts = [];
let favoritePrompts = [];

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
  if (typeof prompts === 'undefined') {
    console.error("Critical Error: 'prompts' variable is not defined. Ensure prompts.js is loaded.");
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
  
  // Auto-save on input
  editor.addEventListener('input', () => {
    localStorage.setItem('lavaQuickNote', editor.value);
  });
}

function saveNoteManually() {
  const editor = document.getElementById('noteEditor');
  if (editor) {
    localStorage.setItem('lavaQuickNote', editor.value);
    showToast('💾 Note Saved Successfully!');
  }
}

// ===== THEME LOGIC =====
function initTheme() {
  const isDark = localStorage.getItem('lavaTheme') === 'dark';
  const btn = document.getElementById('themeToggleBtn');
  const metaTheme = document.getElementById('themeColorMeta');
  
  if (isDark) {
    document.body.classList.add('dark-theme');
    if (btn) btn.innerText = '☀️';
    if (metaTheme) metaTheme.setAttribute('content', '#1e272e');
  } else {
    if (metaTheme) metaTheme.setAttribute('content', '#e0e5ec');
  }
}

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggleBtn');
  const metaTheme = document.getElementById('themeColorMeta');
  
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  
  localStorage.setItem('lavaTheme', isDark ? 'dark' : 'light');
  if (btn) btn.innerText = isDark ? '☀️' : '🌙';
  if (metaTheme) metaTheme.setAttribute('content', isDark ? '#1e272e' : '#e0e5ec');
  
  showToast(isDark ? '🌙 Dark Mode Active' : '☀️ Light Mode Active');
}

// ===== RENDER & ACTIONS =====
function setupEventListeners() {
  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab-btn').dataset.tab;
      switchTab(tab);
    });
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
  
  const filtered = allPrompts.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.prompt.toLowerCase().includes(query) ||
    (p.category && p.category.toLowerCase().includes(query))
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="neo-container text-center py-10 opacity-50 w-full">No prompts found for "${filterQuery}"</div>`;
    return;
  }

  filtered.forEach((p) => {
    const isFav = favoritePrompts.includes(p.id);
    const card = document.createElement('div');
    card.className = `prompt-card`;
    
    // Escape prompt for JS attribute
    const safePrompt = p.prompt.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    
    card.innerHTML = `
      <div class="prompt-card-header">
        <span class="prompt-icon">${p.icon || '📝'}</span>
        <div style="flex: 1;">
          <h3 style="font-size: 1.15rem; margin-bottom: 2px;">${p.title}</h3>
          ${p.category ? `<span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; font-weight: 800;">${p.category}</span>` : ''}
        </div>
        <button onclick="toggleFavorite(${p.id})" class="fav-btn" title="Toggle Favorite">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <p style="font-size: 0.9rem; margin-bottom: 20px; opacity: 0.85; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
        ${p.prompt}
      </p>
      <div class="button-group">
        <button onclick="copyToClipboard('${safePrompt}')" class="neo-btn primary w-full">
          <span>📋</span> Copy Prompt
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function copyAllPrompts() {
  if (allPrompts.length === 0) {
    showToast('❌ No prompts to copy!');
    return;
  }
  
  const allText = allPrompts.map(p => `--- ${p.title} ---\n${p.prompt}`).join('\n\n');
  
  navigator.clipboard.writeText(allText).then(() => {
    showToast('📋 All Prompts Copied!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
    showToast('❌ Copy Failed');
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('✅ Copied to Clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
    showToast('❌ Copy Failed');
  });
}

function toggleFavorite(id) {
  const index = favoritePrompts.indexOf(id);
  if (index > -1) {
    favoritePrompts.splice(index, 1);
    showToast('💔 Removed from Favorites');
  } else {
    favoritePrompts.push(id);
    showToast('❤️ Added to Favorites');
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
  
  // Smooth scroll to top on tab switch
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  
  t.innerText = msg;
  t.classList.add('show');
  
  // Clear existing timeout if any
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  
  window.toastTimeout = setTimeout(() => {
    t.classList.remove('show');
  }, 2500);
}
