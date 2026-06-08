/**
 * Lava's Prompt Vault - Application Logic
 * Handles rendering, filtering, searching, and user interactions
 */

// ===== STATE MANAGEMENT =====
let allPrompts = [...prompts];
let displayNumber = prompts.length;
let currentFilter = 'all';
let customPrompts = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Render initial prompts
  renderPrompts();
  
  // Set up event listeners
  setupEventListeners();
  
  // Render custom prompts list
  renderCustomPromptsList();
}

// ===== EVENT LISTENER SETUP =====
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchTab(e.target.dataset.tab);
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', debounce(renderPrompts, 300));
  }
  
  // Category filtering
  document.querySelectorAll('.cat-badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
      filterByCategory(e.target.dataset.category);
    });
  });
}

// ===== DEBOUNCE UTILITY =====
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ===== RENDER FUNCTIONS =====

/**
 * Renders the prompt grid based on current filters and search
 */
function renderPrompts() {
  const grid = document.getElementById('promptGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput ? searchInput.value.toLowerCase() : '';

  // Filter prompts based on search and category
  const filteredPrompts = allPrompts.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchValue) || 
      p.prompt.toLowerCase().includes(searchValue);
    const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
    return matchesSearch && matchesCategory;
  });

  // Render each prompt card with sequential numbering
  if (filteredPrompts.length === 0) {
    grid.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--muted); font-size: 0.95rem; grid-column: 1/-1;">No prompts found</div>';
    return;
  }

  filteredPrompts.forEach((p, index) => {
    const card = createPromptCard(p, index + 1);
    grid.appendChild(card);
  });
}

/**
 * Creates a prompt card DOM element
 * @param {Object} prompt - Prompt object
 * @param {Number} displayIndex - Number to display on the card
 * @returns {HTMLElement} Prompt card element
 */
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

/**
 * Renders the custom prompts list
 */
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
    </div>
  `).join('');
}

// ===== FILTERING & SEARCHING =====

/**
 * Filters prompts by category
 * @param {String} category - Category to filter by
 */
function filterByCategory(category) {
  currentFilter = category;
  
  // Update active badge
  document.querySelectorAll('.cat-badge').forEach(badge => {
    badge.classList.remove('active');
  });
  
  if (category === 'all') {
    document.querySelector('[data-category="all"]').classList.add('active');
  } else {
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
  }
  
  renderPrompts();
}

// ===== CLIPBOARD & SHARING =====

/**
 * Copies a single prompt to clipboard
 * @param {String} text - Text to copy
 */
function copyPrompt(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Prompt Copied!');
  }).catch(() => {
    showToast('Failed to copy');
  });
}

/**
 * Copies all filtered prompts to clipboard
 */
function copyAll() {
  const filteredPrompts = allPrompts.filter(p => 
    currentFilter === 'all' || p.category === currentFilter
  );
  
  const text = filteredPrompts
    .map(p => `${p.title}\n${p.prompt}`)
    .join('\n\n---\n\n');
  
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${filteredPrompts.length} Prompts Copied!`);
  }).catch(() => {
    showToast('Failed to copy');
  });
}

/**
 * Launches Gemini app with intent (Android only)
 */
function launchGeminiApp() {
  const text = document.getElementById('customPrompt')?.value || '';
  if (!text) {
    showToast('No prompt to send');
    return;
  }
  
  const encodedText = encodeURIComponent(text);
  window.location.href = `intent://send?text=${encodedText}#Intent;action=android.intent.action.SEND;type=text/plain;package=com.google.android.apps.bard;end`;
}

// ===== CUSTOM PROMPT MANAGEMENT =====

/**
 * Adds a custom prompt to the vault
 */
function addCustomPrompt() {
  const title = document.getElementById('customTitle').value.trim();
  const prompt = document.getElementById('customPrompt').value.trim();
  const category = document.getElementById('customCategory').value;
  const icon = document.getElementById('customIcon').value.trim() || '✨';

  // Validation
  if (!title || !prompt) {
    showToast('Please fill in title and prompt');
    return;
  }

  // Create custom prompt object
  const customPrompt = {
    id: Date.now(),
    category,
    icon,
    title,
    prompt
  };

  // Add to custom prompts and main array
  customPrompts.push(customPrompt);
  allPrompts.push(customPrompt);
  displayNumber++;

  // Update UI
  renderCustomPromptsList();
  clearCustomForm();
  showToast('✅ Prompt added successfully!');
}

/**
 * Deletes a custom prompt
 * @param {Number} index - Index of custom prompt to delete
 */
function deleteCustomPrompt(index) {
  const promptToDelete = customPrompts[index];
  
  // Remove from custom prompts
  customPrompts.splice(index, 1);
  
  // Remove from all prompts
  allPrompts = allPrompts.filter(p => p.id !== promptToDelete.id);
  
  // Update UI
  renderCustomPromptsList();
  renderPrompts();
  showToast('❌ Prompt deleted');
}

/**
 * Clears the custom prompt form
 */
function clearCustomForm() {
  document.getElementById('customTitle').value = '';
  document.getElementById('customPrompt').value = '';
  document.getElementById('customCategory').value = 'app';
  document.getElementById('customIcon').value = '✨';
}

// ===== TAB SWITCHING =====

/**
 * Switches between tabs
 * @param {String} tabName - Name of tab to show
 */
function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const tabElement = document.getElementById(tabName);
  if (tabElement) {
    tabElement.classList.add('active');
  }
  
  // Activate corresponding button
  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
  
  // Refresh prompts when switching to vault
  if (tabName === 'vault') {
    renderPrompts();
  }
}

// ===== NOTIFICATIONS =====

/**
 * Shows a toast notification
 * @param {String} message - Message to display
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.innerText = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// ===== EXPORT FUNCTIONS (PLACEHOLDERS) =====

/**
 * Exports prompts to Google Docs
 */
function exportGoogleDocs() {
  showToast('📘 Google Docs export coming soon!');
  // Implementation: Generate formatted text and open Google Docs
}

/**
 * Exports prompts to Samsung Notes
 */
function exportSamsungNotes() {
  showToast('🧡 Samsung Notes export coming soon!');
  // Implementation: Format for Samsung Notes app
}

// ===== UTILITY FUNCTIONS =====

/**
 * Escapes HTML special characters
 * @param {String} text - Text to escape
 * @returns {String} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Escapes text for use in JavaScript strings
 * @param {String} text - Text to escape
 * @returns {String} Escaped text
 */
function escapeForJsString(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}