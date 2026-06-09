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

// ===== THEME TOGGLE (Dark/Light) =====
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
    
    if (currentFilter === 'favorites') {
      matchesCategory = favoritePrompts.includes(p.id);
    } else if (currentFilter !== 'all') {
      matchesCategory = p.category === currentFilter;
    }
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:20px;">No prompts found.</p>`;
    return;
  }

  filtered.forEach((p) => {
    const isFav = favoritePrompts.includes(p.id);
    const card = document.createElement('div');
    card.className = `prompt-card`;
    card.innerHTML = `
      <div class="prompt-card-header">
        <span class="prompt-icon">${p.icon}</span>
        <h3 style="font-size: 1.1rem; padding-right: 30px; line-height:1.2;">${p.title}</h3>
        <button onclick="toggleFavorite(${p.id})" class="fav-btn" title="Toggle Favorite">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <p style="font-size: 0.85rem; margin-bottom: 4px; line-height: 1.5;">${escapeHtml(p.prompt)}</p>
      
      <div class="action-row">
        <button onclick="handlePromptAction('${escapeForJsString(p.prompt)}', 'copy')" class="neo-btn" style="font-size: 0.75rem; padding: 10px;">📋 Copy</button>
        <button onclick="handlePromptAction('${escapeForJsString(p.prompt)}', 'chatgpt')" class="neo-btn" style="font-size: 0.75rem; padding: 10px;">🤖 GPT</button>
        <button onclick="handlePromptAction('${escapeForJsString(p.prompt)}', 'gemini')" class="neo-btn primary" style="font-size: 0.75rem; padding: 10px;">✨ Gemini</button>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== FAVORITES LOGIC =====
function toggleFavorite(id) {
  if (favoritePrompts.includes(id)) {
    favoritePrompts = favoritePrompts.filter(favId => favId !== id);
    showToast('Removed from Favorites');
  } else {
    favoritePrompts.push(id);
    showToast('❤️ Added to Favorites');
  }
  saveData();
  renderPrompts(document.getElementById('searchInput').value);
}

// ===== VARIABLE MODAL & ACTION LOGIC =====
function handlePromptAction(promptText, action) {
  const variableRegex = /\[(.*?)\]/g;
  const matches = [...promptText.matchAll(variableRegex)].map(m => m[1]);
  
  currentVariables = [...new Set(matches)];

  if (currentVariables.length > 0) {
    currentPromptTemplate = promptText;
    currentPromptAction = action;
    openModal();
  } else {
    executeFinalAction(promptText, action);
  }
}

function openModal() {
  const container = document.getElementById('variableInputs');
  container.innerHTML = currentVariables.map((v, i) => `
    <div>
      <label class="form-label">${escapeHtml(v)}</label>
      <input type="text" id="var_${i}" class="neo-inset" placeholder="Enter value...">
    </div>
  `).join('');
  
  document.getElementById('variableModal').classList.add('active');
  if(document.getElementById('var_0')) document.getElementById('var_0').focus();
}

function closeModal() {
  document.getElementById('variableModal').classList.remove('active');
  currentPromptTemplate = '';
  currentPromptAction = '';
  currentVariables = [];
}

function executeModalAction() {
  let finalizedPrompt = currentPromptTemplate;
  
  currentVariables.forEach((v, i) => {
    const inputVal = document.getElementById(`var_${i}`).value || `[${v}]`; 
    finalizedPrompt = finalizedPrompt.split(`[${v}]`).join(inputVal); 
  });

  closeModal();
  executeFinalAction(finalizedPrompt, currentPromptAction);
}

// ===== THE FIX: HANDOFF UI =====
function executeFinalAction(text, action) {
  // Always copy to clipboard as a reliable mobile fallback
  navigator.clipboard.writeText(text).catch(err => console.log('Clipboard fallback failed'));

  if (action === 'copy') {
    showToast('📋 Copied to clipboard!');
  } 
  else if (action === 'chatgpt') {
    const url = 'https://chatgpt.com/?q=' + encodeURIComponent(text);
    showHandoffModal(url, 'ChatGPT');
  } 
  else if (action === 'gemini') {
    const url = 'https://gemini.google.com/?prompt=' + encodeURIComponent(text);
    showHandoffModal(url, 'Gemini');
  }
}

function showHandoffModal(url, aiName) {
  const modal = document.getElementById('handoffModal');
  const link = document.getElementById('handoffLink');
  
  // Attach the URL directly to the physical <a> tag
  link.href = url;
  link.innerText = `🌍 Open ${aiName}`;
  
  modal.classList.add('active');
}

function closeHandoffModal() {
  document.getElementById('handoffModal').classList.remove('active');
}

// ===== CUSTOM PROMPT MANAGEMENT =====
function renderCustomPromptsList() {
  const list = document.getElementById('customPromptsList');
  if (!list) return;
  
  if (customPrompts.length === 0) {
    list.innerHTML = '<p style="color: var(--text-muted); text-align: center; font-size: 0.9rem;">No custom prompts yet</p>';
    return;
  }
  
  list.innerHTML = customPrompts.map((p, i) => `
    <div class="prompt-card" style="padding: 16px;">
      <div class="prompt-card-header" style="margin-bottom: 8px;">
        <span class="prompt-icon" style="font-size: 1.2rem; padding: 8px;">${p.icon}</span>
        <h3 style="font-size: 1rem;">${escapeHtml(p.title)}</h3>
        <button onclick="deleteCustomPrompt(${i})" class="neo-btn" style="position: absolute; right: 0; top: 0; padding: 6px 10px; font-size: 0.75rem; color: #ff4757;">❌</button>
      </div>
      <p style="font-size: 0.8rem; -webkit-line-clamp: 2; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical;">${escapeHtml(p.prompt)}</p>
    </div>
  `).join('');
}

function addCustomPrompt() {
  const title = document.getElementById('customTitle').value.trim();
  const promptText = document.getElementById('customPrompt').value.trim();
  const category = document.getElementById('customCategory').value;
  const icon = document.getElementById('customIcon').value.trim() || '✨';

  if (!title || !promptText) {
    showToast('❌ Fill in Title & Prompt');
    return;
  }

  const newPrompt = { id: Date.now(), category, icon, title, prompt: promptText };
  customPrompts.push(newPrompt);
  allPrompts.push(newPrompt);
  saveData();
  renderCustomPromptsList();
  renderPrompts();
  clearCustomForm();
  showToast('✅ Saved to vault!');
}

function deleteCustomPrompt(index) {
  const promptToDelete = customPrompts[index];
  customPrompts.splice(index, 1);
  allPrompts = allPrompts.filter(p => p.id !== promptToDelete.id);
  favoritePrompts = favoritePrompts.filter(id => id !== promptToDelete.id);
  saveData();
  renderCustomPromptsList();
  renderPrompts(document.getElementById('searchInput')?.value);
  showToast('🗑️ Deleted');
}

// ===== IMPORT / EXPORT (BACKUP) =====
function exportData() {
  const exportObject = {
    customPrompts: customPrompts,
    favoritePrompts: favoritePrompts
  };
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "lava_vault_backup.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  showToast('📥 Backup downloaded!');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (importedData.customPrompts) customPrompts = importedData.customPrompts;
      if (importedData.favoritePrompts) favoritePrompts = importedData.favoritePrompts;
      
      allPrompts = [...prompts, ...customPrompts];
      saveData();
      renderCustomPromptsList();
      renderPrompts();
      showToast('📤 Data restored successfully!');
      
    } catch (err) {
      showToast('❌ Error reading backup file');
      console.error(err);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ===== UTILITIES =====
function clearCustomForm() {
  document.getElementById('customTitle').value = '';
  document.getElementById('customPrompt').value = '';
  document.getElementById('customIcon').value = '✨';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
  if (tabName === 'vault') renderPrompts(document.getElementById('searchInput')?.value);
}

function filterByCategory(category) {
  currentFilter = category;
  document.querySelectorAll('.cat-badge').forEach(b => b.classList.remove('active'));
  document.querySelector(`.cat-badge[data-category="${category}"]`)?.classList.add('active');
  renderPrompts(document.getElementById('searchInput')?.value);
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
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
