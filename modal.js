// Modal logic for Video Showcase section
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
  <div class="modal-content">
    <button class="modal-close" title="Close">&times;</button>
    <div class="modal-title"></div>
    <textarea class="modal-textarea" placeholder="Write something..."></textarea>
    <button class="modal-save btn-primary">Save</button>
  </div>
`;

document.body.appendChild(modalOverlay);

const modalContent = modalOverlay.querySelector('.modal-content');
const modalTitle = modalOverlay.querySelector('.modal-title');
const modalTextarea = modalOverlay.querySelector('.modal-textarea');
const modalCloseBtn = modalOverlay.querySelector('.modal-close');
const modalSaveBtn = modalOverlay.querySelector('.modal-save');

// Store notes in localStorage so each tab saves its own text
function getNoteKey(title) {
  return 'showcaseNote-' + title.replace(/\s+/g, '_');
}

function openModal(title) {
  modalTitle.textContent = title;
  modalTextarea.value = localStorage.getItem(getNoteKey(title)) || '';
  modalOverlay.style.display = 'flex';
  modalTextarea.focus();
}

function closeModal() {
  modalOverlay.style.display = 'none';
}

modalCloseBtn.onclick = closeModal;

// Save button stores note
modalSaveBtn.onclick = () => {
  localStorage.setItem(getNoteKey(modalTitle.textContent), modalTextarea.value);
  closeModal();
};

// Click outside modal to close
modalOverlay.onclick = e => {
  if (e.target === modalOverlay) closeModal();
};

// Attach click handlers to showcase tabs (after DOM loaded)
window.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.showcase-item');
  const titles = [
    'Privilege Escalation Demo',
    'Custom Payload Builder',
    'Network Traffic Analyzer',
  ];
  items.forEach((item, i) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => openModal(titles[i]));
    // Optionally: highlight on hover for better UX
    item.onmouseover = () => item.style.boxShadow = '0 8px 30px var(--accent-glow, rgba(200,168,124,0.15))';
    item.onmouseout = () => item.style.boxShadow = '';
  });
});
