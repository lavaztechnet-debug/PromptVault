/**
 * Lava's Prompt Vault - Application Logic
 */

// ===== STATE MANAGEMENT =====
// Note: 'prompts' is loaded from prompts.js
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
    <div class="prompt-card cat-${p.category}" style="gap: 8px; padding: 12px;">
      <div class="prompt-card-header" style="gap: 8px;">
        <span class="prompt-icon">${p.icon}</span>
        <h3 style="font-size: 1rem;">${escapeHtml(p.title)}</h3>
        <button onclick="deleteCustomPrompt(${i})" class="neo-btn" style="padding: 6px 10px; font-size: 0.75rem; min-width: auto;">❌ Delete</button>
      </div>
      <p style="font-size: 0.75rem; -webkit-line-clamp: 2;">${escapeHtml(p.prompt)}</p>
      <button onclick="copyPrompt('${escapeForJsString(p.prompt)}')" class="neo-btn" style="width: 100%; margin-top: 8px; font-size: 0.75rem;">📋 Copy Prompt</button>
    </div>
  `).join('');
}

// ===== BUTTON ACTIONS =====
function copyPrompt(text) {
  navigator.clipboard.writeText(text);
  showToast('Prompt Copied!');
}

function copyAll() {
  const filtered = allPrompts.filter(p => currentFilter === 'all' || p.category === currentFilter);
  const text = filtered.map((p, i) => `${i + 1}. ${p.title}\n${p.prompt}`).join('\n\n---\n\n');
  navigator.clipboard.writeText(text);
  showToast(`${filtered.length} Prompts Copied!`);
}

function exportGoogleDocs() {
    let htmlContent = `<html><head><meta charset="UTF-8"></head><body><h1>Lava's Prompt Vault</h1>` + allPrompts.map((p, i) => `
        <div style="margin-bottom: 20px;">
            <h3>${i + 1}. ${p.title} (${p.category})</h3>
            <p>${p.prompt}</p>
        </div>`).join('') + `</body></html>`;
    
    triggerDownload(htmlContent, 'Lava_Vault.html', 'text/html');
    showToast('Exporting to Docs...');
}

function exportSamsungNotes() {
    const text = allPrompts.map((p, i) => `# ${i + 1}. ${p.title}\nCategory: ${p.category}\nPrompt: ${p.prompt}\n\n---\n`).join('\n');
    triggerDownload(text, 'Lava_Vault.txt', 'text/plain');
    showToast('Exporting to Notes...');
}

function triggerDownload(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ===== UTILS =====
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
