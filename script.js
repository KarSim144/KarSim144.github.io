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
// SHOWCASE DATA
// ============================================
const showcaseData = {
  'privesc': {
    title: 'Privilege Escalation Demo',
    label: 'Security Research',
    videoSrc: '', // Add your video URL here
    description: `
      <p>This demo walks through a classic Linux privilege escalation scenario from an unprivileged shell to root access, using a misconfigured SUID binary.</p>
      <p>The attack chain begins by identifying the vulnerable binary with <code>find / -perm -4000 2>/dev/null</code>, then exploiting weak file permissions to overwrite a root-owned script that runs on a cron job.</p>
      <h4>Techniques Covered</h4>
      <ul>
        <li>SUID binary enumeration</li>
        <li>Cron job abuse</li>
        <li>Writable PATH exploitation</li>
        <li>Post-exploitation cleanup</li>
      </ul>
      <p>All testing was performed in an isolated lab environment. This demo is intended purely for educational purposes — understanding how privilege escalation works is essential for hardening real systems against it.</p>
    `
  },
  'payload': {
    title: 'Custom Payload Builder',
    label: 'Offensive Security',
    videoSrc: '',
    description: `
      <p>A walkthrough of a custom payload generation tool built to automate common offensive security tasks during CTF competitions and authorized penetration tests.</p>
      <p>The tool supports multiple payload types including reverse shells, staged loaders, and encoded shellcode — with automatic obfuscation to bypass basic signature detection.</p>
      <h4>Features Demonstrated</h4>
      <ul>
        <li>Reverse shell generation (Python, Bash, PowerShell)</li>
        <li>Base64 / XOR encoding layers</li>
        <li>Listener integration via netcat / pwncat</li>
        <li>AMSI bypass techniques</li>
      </ul>
      <p>Built for educational use and authorized engagements only. Understanding payload construction is fundamental to defensive security work and red team assessments.</p>
    `
  },
  'network': {
    title: 'Network Traffic Analyzer',
    label: 'Blue Team Tools',
    videoSrc: '',
    description: `
      <p>A real-time network traffic analysis tool designed for blue teamers to quickly identify anomalous patterns, suspicious connections, and potential data exfiltration attempts.</p>
      <p>The analyzer parses PCAP files and live captures, flagging traffic that matches known C2 patterns, unusual port usage, or large outbound data transfers outside of business hours.</p>
      <h4>Capabilities Shown</h4>
      <ul>
        <li>PCAP parsing and protocol dissection</li>
        <li>Anomaly scoring and alerting</li>
        <li>DNS tunneling detection</li>
        <li>Visual traffic timeline with filtering</li>
      </ul>
      <p>This tool was developed as part of ongoing blue team research. It is designed to complement existing SIEM solutions and provide lightweight, portable traffic analysis capabilities.</p>
    `
  }
};

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
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
}

// Restore saved theme
try {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
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
// CONTACT FORM HANDLING (AJAX)
// ============================================
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const submitBtnHTML = submitBtn.innerHTML;
let cooldownActive = false;
let cooldownTime = 60;

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  if (cooldownActive) {
    showToast(`Please wait ${cooldownTime}s before sending again`);
    return;
  }

  if (submitBtn.disabled) return;

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

// ============================================
// SHOWCASE MODAL
// ============================================
function openShowcaseModal(key) {
  const data = showcaseData[key];
  if (!data) return;

  const modal = document.getElementById('showcaseModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalLabel = document.getElementById('modalLabel');
  const modalVideo = document.getElementById('modalVideo');
  const modalVideoSrc = document.getElementById('modalVideoSrc');
  const modalPlaceholder = document.getElementById('modalVideoPlaceholder');
  const modalDescription = document.getElementById('modalDescription');

  modalTitle.textContent = data.title;
  modalLabel.textContent = data.label;
  modalDescription.innerHTML = data.description;

  if (data.videoSrc) {
    modalVideoSrc.src = data.videoSrc;
    modalVideo.load();
    modalVideo.style.display = 'block';
    modalPlaceholder.style.display = 'none';
  } else {
    modalVideo.style.display = 'none';
    modalPlaceholder.style.display = 'flex';
    modalVideoSrc.src = '';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeShowcaseModal() {
  const modal = document.getElementById('showcaseModal');
  const modalVideo = document.getElementById('modalVideo');

  modal.classList.remove('open');
  document.body.style.overflow = '';

  // Pause video when closing
  modalVideo.pause();
}

// Wire up showcase items via data-showcase attribute
document.addEventListener('click', e => {
  const item = e.target.closest('.showcase-item[data-showcase]');
  if (item) {
    openShowcaseModal(item.dataset.showcase);
  }
});

// Close on backdrop click
document.getElementById('showcaseModal').addEventListener('click', e => {
  if (e.target === document.getElementById('showcaseModal')) {
    closeShowcaseModal();
  }
});

// Close on escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeShowcaseModal();
});
