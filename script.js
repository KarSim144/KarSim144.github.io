// ============================================
// DATA
// ============================================
const projects = [
  {
    id: 'github',
    title: 'GitHub Projects',
    description: 'Browse my open source work, libraries, and tools.',
    tags: ['Java', 'JavaScript', 'Python', 'PHP'],
    clientList: [
      { name: 'View Profile', url: 'https://github.com/KarSim144' }
    ]
  },
  {
    id: 'clients',
    title: 'Client Works',
    description: 'Websites and apps built for real clients.',
    tags: ['PHP', 'JS', 'Web'],
    clientList: [
      { name: 'Example Client Work', url: 'https://ulakantik.com' },
      { name: 'This Website!', url: '' }
    ]
  }
];

// ============================================
// SVG ICON TEMPLATES
// ============================================
const icons = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
};

// ============================================
// NAVIGATION & ROUTING
// ============================================
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');

  setTimeout(initScrollReveal, 100);
}

document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(el.dataset.page);
  });
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
});

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = (mouseX - 4) + 'px';
  cursorDot.style.top = (mouseY - 4) + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = (ringX - 20) + 'px';
  cursorRing.style.top = (ringY - 20) + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const interactiveSelector = 'a, button, .project-card, .showcase-item, .skill-tag, .contact-link-item';

document.addEventListener('mouseover', e => {
  if (e.target.closest(interactiveSelector)) {
    document.body.classList.add('cursor-hover');
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.closest(interactiveSelector)) {
    document.body.classList.remove('cursor-hover');
  }
});

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

initScrollReveal();

// ============================================
// RENDER PROJECT CARDS
// ============================================
function renderProjectCard(project, idx) {
  const delayClass = idx > 0 ? ` reveal-delay-${idx}` : '';
  
  return `
    <div class="project-card no-hover reveal${delayClass}">
      <div class="project-card-header">
        <div class="project-icon">${icons.book}</div>
        <h3>${project.title}</h3>
      </div>
      <p>${project.description}</p>
      <div class="project-tags">${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      <div class="client-list">
        ${project.clientList.map(c => `<a href="${c.url}" target="_blank" class="client-link">${c.name} ${icons.arrow}</a>`).join('')}
      </div>
    </div>
  `;
}

function renderHomeProjects() {
  const grid = document.getElementById('homeProjectsGrid');
  grid.innerHTML = projects.map(renderProjectCard).join('');
  setTimeout(initScrollReveal, 50);
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = projects.map(renderProjectCard).join('');
  setTimeout(initScrollReveal, 50);
}

// ============================================
// INITIAL RENDER
// ============================================
renderHomeProjects();
renderProjects();

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
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
let cooldownActive = false;
let cooldownTime = 60;

contactForm.addEventListener('submit', function(e) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  // Block if cooldown is active
  if (cooldownActive) {
    e.preventDefault();
    showToast(`Please wait ${cooldownTime} seconds before sending again`);
    return;
  }
  
  // Prevent double-clicks
  if (submitBtn.disabled) {
    e.preventDefault();
    return;
  }
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  // Let form submit, then handle reset and cooldown
  setTimeout(() => {
    contactForm.reset();
    showToast('Message sent successfully!');
    
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
        submitBtn.innerHTML = `Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
    }, 1000);
  }, 1000);
});
