/* --- FILE: app.js --- */

// ===== STATE MANAGEMENT =====
let allPrompts = [...prompts];
let customPrompts = [];
let currentFilter = 'all';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadCustomPrompts();
  renderPrompts();
  setupEventListeners();
  renderCustomPromptsList();
});

function loadCustomPrompts() {
  const saved = localStorage.getItem('lavaCustomPrompts');
  if (saved) {
    customPrompts = JSON.parse(saved);
    allPrompts = [...prompts, ...customPrompts];
  }
}

function saveCustomPrompts() {
  localStorage.setItem('lavaCustomPrompts', JSON.stringify(customPrompts));
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
    const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
    return matchesSearch && matchesCategory;
  });

  filtered.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = `prompt-card cat-${p.category}`;
    card.innerHTML = `
      <h3 class="text-lg font-bold text-white mb-2">${index + 1}. ${p.icon} ${p.title}</h3>
      <p class="text-sm text-gray-300 mb-4 leading-relaxed">${p.prompt}</p>
      <div class="flex gap-2 mt-auto">
        <button onclick="copyPrompt('${escapeForJsString(p.prompt)}')" class="neo-btn flex-1 text-xs">Copy</button>
      </div>`;
    grid.appendChild(card);
  });
}

function renderCustomPromptsList() {
  const list = document.getElementById('customPromptsList');
  if (!list) return;
  
  if (customPrompts.length === 0) {
    list.innerHTML = '<div style="color: var(--muted); font-size: 0.9rem; text-align: center; padding: 20px;">No custom prompts yet</div>';
    return;
  }
  
  list.innerHTML = customPrompts.map((p, i) => `
    <div class="prompt-card cat-${p.category}" style="gap: 8px; padding: 12px; margin-bottom:12px;">
      <div class="prompt-card-header" style="gap: 8px;">
        <span class="prompt-icon">${p.icon}</span>
        <h3 style="font-size: 1rem;">${escapeHtml(p.title)}</h3>
        <button onclick="deleteCustomPrompt(${i})" class="neo-btn" style="padding: 6px 10px; font-size: 0.75rem; min-width: auto;">❌</button>
      </div>
      <p style="font-size: 0.75rem; -webkit-line-clamp: 2;">${escapeHtml(p.prompt)}</p>
      <button onclick="copyPrompt('${escapeForJsString(p.prompt)}')" class="neo-btn" style="width: 100%; margin-top: 8px; font-size: 0.75rem;">📋 Copy Prompt</button>
    </div>
  `).join('');
}

// ===== PROMPT MANAGEMENT =====
function addCustomPrompt() {
  const title = document.getElementById('customTitle').value.trim();
  const prompt = document.getElementById('customPrompt').value.trim();
  const category = document.getElementById('customCategory').value;
  const icon = document.getElementById('customIcon').value.trim() || '✨';

  if (!title || !prompt) {
    showToast('❌ Fill in Title & Prompt');
    return;
  }

  const newPrompt = { id: Date.now(), category, icon, title, prompt };
  
  customPrompts.push(newPrompt);
  allPrompts.push(newPrompt);
  
  saveCustomPrompts();
  renderCustomPromptsList();
  renderPrompts();
  clearCustomForm();
  showToast('✅ Saved to vault!');
}

function deleteCustomPrompt(index) {
  const promptToDelete = customPrompts[index];
  customPrompts.splice(index, 1);
  allPrompts = allPrompts.filter(p => p.id !== promptToDelete.id);
  
  saveCustomPrompts();
  renderCustomPromptsList();
  renderPrompts();
  showToast('❌ Deleted');
}

// ===== UTILITIES =====
function copyPrompt(text) {
  navigator.clipboard.writeText(text);
  showToast('Prompt Copied!');
}

function copyAll() {
  const filtered = allPrompts.filter(p => currentFilter === 'all' || p.category === currentFilter);
  navigator.clipboard.writeText(filtered.map((p, i) => `${i + 1}. ${p.title}\n${p.prompt}`).join('\n\n---\n\n'));
  showToast('All visible prompts copied!');
}

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
  if (tabName === 'vault') renderPrompts();
}

function filterByCategory(category) {
  currentFilter = category;
  document.querySelectorAll('.cat-badge').forEach(b => b.classList.remove('active'));
  document.querySelector(`.cat-badge[data-category="${category}"]`)?.classList.add('active');
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
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
