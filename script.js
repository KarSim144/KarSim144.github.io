        <div class="showcase-overlay">
          <div class="showcase-play">
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
          <div class="showcase-meta">
            <span>${escapeHTML(video.label)}</span>
            <h4>${escapeHTML(video.title)}</h4>
            <strong>Watch video</strong>
          </div>
        </div>
      </div>
    </a>
  `;
}

function renderExperienceItem(item) {
  return `
    <div class="experience-item">
      <div>
        <h4>${escapeHTML(item.title)}</h4>
        <p>${escapeHTML(item.detail)}</p>
      </div>
    </div>
  `;
}

function renderHomeProjects() {
  const grid = document.getElementById('homeProjectsGrid');
  if (!grid) return;
  grid.innerHTML = projects.map(renderProjectCard).join('');
  setTimeout(initScrollReveal, 50);
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = projects.map(renderProjectCard).join('');
  setTimeout(initScrollReveal, 50);
}

function renderVideoShowcases() {
  const markup = videos.map(renderVideoCard).join('');
  document.querySelectorAll('[data-video-showcase]').forEach(grid => {
    grid.innerHTML = markup;
  });
  setTimeout(initScrollReveal, 50);
}

function renderExperience() {
  const list = document.getElementById('experienceList');
  if (!list) return;
  list.innerHTML = experienceItems.map(renderExperienceItem).join('');
}

// ============================================
// INITIAL RENDER
// ============================================
renderHomeProjects();
renderProjects();
renderVideoShowcases();
renderExperience();

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ============================================
// STAT COUNTER ANIMATION
// ============================================
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text);
    if (isNaN(num)) return;

    const suffix = text.replace(/[0-9]/g, '');
    const duration = 1500;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * num) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });

    obs.observe(el);
  });
}

animateCounters();

// ============================================
// CONTACT FORM HANDLING (AJAX)
// ============================================
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const submitBtnHTML = submitBtn.innerHTML;
let cooldownActive = false;
let cooldownTime = 60;

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // Always prevent default — we submit via fetch

  // Block if cooldown is active
  if (cooldownActive) {
    showToast(`Please wait ${cooldownTime}s before sending again`);
    return;
  }

  // Prevent double-clicks
  if (submitBtn.disabled) return;

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';

  try {
    const formData = new FormData(contactForm);

    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactForm.reset();
      showToast('Message sent successfully!');
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    showToast('Failed to send. Please try again.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = submitBtnHTML;
    return;
  }

  // Start cooldown
  cooldownActive = true;
  cooldownTime = 60;

  const cooldownInterval = setInterval(() => {
    cooldownTime--;
    submitBtn.innerHTML = `Wait ${cooldownTime}s`;

    if (cooldownTime <= 0) {
      clearInterval(cooldownInterval);
      cooldownActive = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitBtnHTML;
    }
  }, 1000);
});
