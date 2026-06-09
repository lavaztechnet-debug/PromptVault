/**
 * Lava's Prompt Vault - Application Logic
 * Handles rendering, filtering, searching, and user interactions
 */

// ===== STATE MANAGEMENT =====
// Note: 'prompts' is defined in prompts.js
let allPrompts = [...prompts];
let currentFilter = 'all';
let customPrompts = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  renderPrompts();
  setupEventListeners();
  renderCustomPromptsList();
}

// ===== EVENT LISTENER SETUP =====
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchTab(e.target.dataset.tab);
    });
  });
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', debounce(renderPrompts, 300));
  }
  
  document.querySelectorAll('.cat-badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
      filterByCategory(e.target.dataset.category);
    });
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

  const filteredPrompts = allPrompts.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchValue) || 
      p.prompt.toLowerCase().includes(searchValue);
    const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
    return matchesSearch && matchesCategory;
  });

  if (filteredPrompts.length === 0) {
    grid.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--muted); font-size: 0.95rem; grid-column: 1/-1;">No prompts found</div>';
    return;
  }

  filteredPrompts.forEach((p, index) => {
    const card = createPromptCard(p, index + 1);
    grid.appendChild(card);
  });
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
    </div>
  `;
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

// ===== FILTERING & SEARCHING =====

function filterByCategory(category) {
  currentFilter = category;
  document.querySelectorAll('.cat-badge').forEach(badge => badge.classList.remove('active'));
  
  if (category === 'all') {
    document.querySelector('[data-category="all"]').classList.add('active');
  } else {
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
  }
  renderPrompts();
}

// ===== CLIPBOARD & SHARING =====

function copyPrompt(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Prompt Copied!'));
}

function copyAll() {
  const filteredPrompts = allPrompts.filter(p => currentFilter === 'all' || p.category === currentFilter);
  const text = filteredPrompts.map(p => `${p.title}\n${p.prompt}`).join('\n\n---\n\n');
  navigator.clipboard.writeText(text).then(() => showToast(`${filteredPrompts.length} Prompts Copied!`));
}

function launchGeminiApp() {
  const text = document.getElementById('customPrompt')?.value || '';
  if (!text) return showToast('No prompt to send');
  
  const encodedText = encodeURIComponent(text);
  window.location.href = `intent://send?text=${encodedText}#Intent;action=android.intent.action.SEND;type=text/plain;package=com.google.android.apps.bard;end`;
}

// ===== CUSTOM PROMPT MANAGEMENT =====

function addCustomPrompt() {
  const title = document.getElementById('customTitle').value.trim();
  const prompt = document.getElementById('customPrompt').value.trim();
  const category = document.getElementById('customCategory').value;
  const icon = document.getElementById('customIcon').value.trim() || '✨';

  if (!title || !prompt) return showToast('Please fill in title and prompt');

  const customPrompt = { id: Date.now(), category, icon, title, prompt };
  customPrompts.push(customPrompt);
  allPrompts.push(customPrompt);

  renderCustomPromptsList();
  clearCustomForm();
  showToast('✅ Prompt added successfully!');
}

function deleteCustomPrompt(index) {
  const promptToDelete = customPrompts[index];
  customPrompts.splice(index, 1);
  allPrompts = allPrompts.filter(p => p.id !== promptToDelete.id);
  renderCustomPromptsList();
  renderPrompts();
  showToast('❌ Prompt deleted');
}

function clearCustomForm() {
  document.getElementById('customTitle').value = '';
  document.getElementById('customPrompt').value = '';
  document.getElementById('customCategory').value = 'app';
  document.getElementById('customIcon').value = '✨';
}

// ===== TAB SWITCHING =====

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
  if (tabName === 'vault') renderPrompts();
}

// ===== NOTIFICATIONS =====

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== EXPORT FUNCTIONS =====

function exportGoogleDocs() {
    let htmlContent = `<html><head><meta charset="UTF-8"></head><body><h1>Lava's Prompt Vault</h1>` + allPrompts.map((p, i) => `
        <div style="margin-bottom: 20px;">
            <h3>${i + 1}. ${p.title} (${p.category})</h3>
            <p>${p.prompt}</p>
        </div>`).join('') + `</body></html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lava_Prompt_Vault.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Exported to HTML (Open in Google Docs)');
}

function exportSamsungNotes() {
    const text = allPrompts.map((p, i) => 
        `# ${i + 1}. ${p.title}\nCategory: ${p.category}\nPrompt: ${p.prompt}\n\n---\n`
    ).join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lava_Prompt_Vault.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Exported to Text (Open in Samsung Notes)');
}

// ===== UTILITY FUNCTIONS =====

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeForJsString(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}
