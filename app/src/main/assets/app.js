/* --- FILE: app.js --- */

// ===== STATE MANAGEMENT =====
let allPrompts = [...prompts];
let currentFilter = 'all';
let customPrompts = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  loadCustomPrompts(); // Load saved prompts first
  initializeApp();
});

function initializeApp() {
  renderPrompts();
  setupEventListeners();
  renderCustomPromptsList();
}

// ===== PERSISTENCE (Saving/Loading) =====
function saveCustomPrompts() {
  localStorage.setItem('lavaCustomPrompts', JSON.stringify(customPrompts));
}

function loadCustomPrompts() {
  const saved = localStorage.getItem('lavaCustomPrompts');
  if (saved) {
    customPrompts = JSON.parse(saved);
    // Merge saved custom prompts with the default list
    allPrompts = [...prompts, ...customPrompts];
  }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', debounce(renderPrompts, 300));
  }
  
  document.querySelectorAll('.cat-badge').forEach(badge => {
    badge.addEventListener('click', (e) => filterByCategory(e.target.dataset.category));
  });
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ===== RENDER FUNCTIONS =====
function renderPrompts() {
  const grid = document.getElementById('promptGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput ? searchInput.value.toLowerCase() : '';

  const filtered = allPrompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchValue) || p.prompt.toLowerCase().includes(searchValue);
    const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
    return matchesSearch && matchesCategory;
  });

  filtered.forEach((p, index) => grid.appendChild(createPromptCard(p, index + 1)));
}

function createPromptCard(prompt, displayIndex) {
  const card = document.createElement('div');
  card.className = `prompt-card cat-${prompt.category}`;
  card.innerHTML = `
    <div class="prompt-card-header">
      <div class="prompt-number">${displayIndex}</div>
      <span class="prompt-icon">${prompt.icon}</span>
      <h3>${escapeHtml(prompt.title)}</h3>
    </div>
    <p>${escapeHtml(prompt.prompt)}</p>
    <div class="button-group">
      <button onclick="copyPrompt('${escapeForJsString(prompt.prompt)}')" class="neo-btn" style="flex:1;">📋 Copy</button>
    </div>`;
  return card;
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

// ===== PROMPT MANAGEMENT =====
function addCustomPrompt() {
  const title = document.getElementById('customTitle').value.trim();
  const prompt = document.getElementById('customPrompt').value.trim();
  const category = document.getElementById('customCategory').value;
  const icon = document.getElementById('customIcon').value.trim() || '✨';

  if (!title || !prompt) return showToast('Please fill in title and prompt');

  const newPrompt = { id: Date.now(), category, icon, title, prompt };
  customPrompts.push(newPrompt);
  allPrompts.push(newPrompt);
  
  saveCustomPrompts(); // Persistent save
  renderCustomPromptsList();
  renderPrompts();
  clearCustomForm();
  showToast('✅ Saved to storage!');
}

function deleteCustomPrompt(index) {
  const promptToDelete = customPrompts[index];
  customPrompts.splice(index, 1);
  allPrompts = allPrompts.filter(p => p.id !== promptToDelete.id);
  
  saveCustomPrompts(); // Persistent update
  renderCustomPromptsList();
  renderPrompts();
  showToast('❌ Deleted');
}

// ===== EXPORTING =====
function triggerDownload(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); window.URL.revokeObjectURL(url); }, 100);
}

function exportGoogleDocs() {
    let content = `<html><body><h1>Lava's Prompt Vault</h1>` + allPrompts.map((p, i) => `<h3>${i+1}. ${p.title} (${p.category})</h3><p>${p.prompt}</p>`).join('<br>') + `</body></html>`;
    triggerDownload(content, 'Lava_Vault.html', 'text/html');
}

function exportSamsungNotes() {
    const text = allPrompts.map((p, i) => `# ${i+1}. ${p.title}\n${p.prompt}\n\n---\n`).join('\n');
    triggerDownload(text, 'Lava_Vault.txt', 'text/plain');
}

// ===== UTILITIES & UI =====
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

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeForJsString(text) {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
