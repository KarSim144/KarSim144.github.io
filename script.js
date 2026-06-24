//EDITABLE PARTS (SIMPLIFIED)
const projects = [
  {
    id: 'github',
    title: 'GitHub Projects',
    description: 'Open source work, experiments, libraries, and tools I am building or learning from.',
    profileLink: { name: 'View Profile', url: 'https://github.com/KarSim144' },
    tags: ['Java', 'JavaScript', 'Python', 'PHP', 'Docker'],
    notableProjects: [
      { name: 'Session Stealer Example', url: 'https://github.com/KarSim144/discord-token-stealer-example' },
      { name: 'SOON', url: '' }
    ]
  },
  {
    id: 'live-projects',
    title: 'Live Projects',
    description: 'Websites, demos, and apps that are online and ready to explore.',
    tags: ['PHP', 'JS', 'Web', 'Unity', 'C#'],
    links: [
      { name: 'Client Website Example', url: 'https://ulakantik.com' },
      { name: 'Cyberdasher Game Showcase', url: 'https://youtu.be/VckNAJzVQxw?si=UjBd60rHWM0zc_Lx' },
      { name: 'Deadgear Game Showcase', url: 'https://youtu.be/vPnLGpkPyns?si=5jU81Pxs1tlleHIi' },
      { name: 'Web Card Game Demo', url: 'https://karsim144.github.io/cardgame/' }
    ]
  }
];

const videos = [
  {
    title: 'Simple Keylogger Demo',
    label: 'Security Research',
    url: 'https://www.youtube.com/watch?v=fJBjQYk43Jk'
  },
  {
    title: 'Modern Account Stealer',
    label: 'Offensive Security',
    url: 'https://www.youtube.com/watch?v=SR6Sc4e2WHI'
  },
  {
    title: 'Remote File Controller',
    label: 'Proof Of Concept',
    url: 'https://youtu.be/-5709M4Oho8?si=HtS6-n7qkr7_kML8'
  }
];

const experienceItems = [
  {
    title: 'Internship at Unirobotics',
    detail: 'Unirobotics is a arms manufacturing company which im doing my internship at currently as a developer.'
  },
  {
    title: 'Live Web Projects',
    detail: 'I have also made websites for several clients different to their needs.'
  },
  {
    title: 'Game Development',
    detail: 'Created game demos with as a 2 people team. Im planning on making new/more complete games in the future when time allows.'
  },
  {
    title: 'Always Learning',
    detail: 'The sky is the limit! (maybe not? hopefully)'
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

function initNavTooltips() {
  const navTooltips = document.querySelectorAll('.nav-tooltip');
  if (!navTooltips.length) return;

  requestAnimationFrame(() => {
    navTooltips.forEach(tooltip => tooltip.classList.add('is-visible'));

    setTimeout(() => {
      navTooltips.forEach(tooltip => tooltip.classList.remove('is-visible'));
    }, 4200);
  });
}

initNavTooltips();

// ============================================
// THEME TOGGLE
// ============================================
const styleModes = [
  { theme: 'dark', label: 'Night', cursor: 'ring' },
  { theme: 'light', label: 'Paper', cursor: 'soft' },
  { theme: 'terminal', label: 'Terminal', cursor: 'square' },
  { theme: 'sunset', label: 'Dusk', cursor: 'spotlight' }
];

function applyStyleMode(themeName) {
  const html = document.documentElement;
  const mode = styleModes.find(item => item.theme === themeName) || styleModes[0];

  html.setAttribute('data-theme', mode.theme);
  html.setAttribute('data-cursor', mode.cursor);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.dataset.mode = mode.theme;
    btn.setAttribute('aria-label', `Style: ${mode.label}. Click to change style.`);
    btn.setAttribute('title', `Style: ${mode.label}`);
  });

  try {
    localStorage.setItem('theme', mode.theme);
    localStorage.setItem('styleMode', mode.theme);
  } catch (e) {}
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || styleModes[0].theme;
  const currentIndex = styleModes.findIndex(item => item.theme === current);
  const next = styleModes[(currentIndex + 1) % styleModes.length];
  applyStyleMode(next.theme);
}

// Restore saved theme
try {
  const saved = localStorage.getItem('styleMode') || localStorage.getItem('theme');
  applyStyleMode(saved || document.documentElement.getAttribute('data-theme'));
} catch (e) {}

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
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const interactiveSelector = 'a, button, .project-card, .project-link, .project-inline-link, .showcase-item, .skill-tag, .experience-item, .contact-link-item';

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
// RENDER EDITABLE CONTENT
// ============================================
function escapeHTML(value) {
  const span = document.createElement('span');
  span.textContent = value ?? '';
  return span.innerHTML;
}

function escapeAttribute(value) {
  return escapeHTML(value).replace(/"/g, '&quot;');
}

function getYouTubeId(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || '';
    }

    if (host.endsWith('youtube.com')) {
      const videoParam = parsed.searchParams.get('v');
      if (videoParam) return videoParam;

      const parts = parsed.pathname.split('/').filter(Boolean);
      const videoPathIndex = parts.findIndex(part => ['embed', 'shorts', 'live'].includes(part));
      if (videoPathIndex >= 0) return parts[videoPathIndex + 1] || '';
    }
  } catch (e) {
    const match = String(url).match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([A-Za-z0-9_-]{6,})/);
    return match ? match[1] : '';
  }

  return '';
}

function getVideoThumbnail(video) {
  if (video.thumbnail) return video.thumbnail;

  const youtubeId = getYouTubeId(video.url);
  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
}

function renderProjectLink(link) {
  if (!link.url) {
    return `<span class="project-link is-disabled">${escapeHTML(link.name)}</span>`;
  }

  return `
    <a href="${escapeAttribute(link.url)}" target="_blank" rel="noopener noreferrer" class="project-link">
      ${escapeHTML(link.name)}
      ${icons.arrow}
    </a>
  `;
}

function renderProjectCard(project, idx) {
  const delayClass = idx > 0 ? ` reveal-delay-${idx}` : '';
  const links = project.links || [];
  const notableProjects = project.notableProjects || [];

  const profileLinkMarkup = project.profileLink
    ? `
      <br>
      <a href="${escapeAttribute(project.profileLink.url)}" target="_blank" rel="noopener noreferrer" class="project-inline-link">
        ${escapeHTML(project.profileLink.name)}
      </a>
    `
    : '';

  return `
    <div class="project-card no-hover reveal${delayClass}">
      <div class="project-card-header">
        <div class="project-icon">${icons.book}</div>
        <h3>${escapeHTML(project.title)}</h3>
      </div>

      <p>
        ${escapeHTML(project.description)}
        ${profileLinkMarkup}
      </p>

      <div class="project-tags">
        ${project.tags.map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join('')}
      </div>

      ${
        notableProjects.length
          ? `
            <div class="project-links-block">
              <h4>Recent/Notable Projects</h4>
              <div class="project-links">
                ${notableProjects.map(renderProjectLink).join('')}
              </div>
            </div>
          `
          : ''
      }

      ${
        links.length
          ? `
            <div class="project-links">
              ${links.map(renderProjectLink).join('')}
            </div>
          `
          : ''
      }
    </div>
  `;
}

function renderVideoCard(video, idx) {
  const delayClass = ` reveal-delay-${Math.min(idx + 1, 4)}`;
  const thumbnail = getVideoThumbnail(video);
  const thumbnailMarkup = thumbnail
    ? `<img class="showcase-thumb" src="${escapeAttribute(thumbnail)}" alt="${escapeAttribute(video.title)} thumbnail" loading="lazy">`
    : '<div class="showcase-thumb showcase-thumb-fallback"></div>';

  return `
    <a href="${escapeAttribute(video.url)}" target="_blank" rel="noopener noreferrer" class="showcase-link reveal${delayClass}">
      <div class="showcase-item">
        ${thumbnailMarkup}
        <div class="showcase-shine"></div>
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
