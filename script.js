/**
 * Omar Mahfouz Omar — Portfolio JavaScript
 * Data Analyst | Business Intelligence Specialist
 */

/* ============================================
   THEME TOGGLE
   ============================================ */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================
   STICKY NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleBackToTop();
});

/* ============================================
   ACTIVE NAV LINK
   ============================================ */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   FOOTER YEAR
   ============================================ */
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================
   CONTACT FORM
   ============================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn     = this.querySelector('.form-submit');
    const origText = btn.innerHTML;
    btn.innerHTML  = '✅ Message Sent!';
    btn.disabled   = true;
    btn.style.background = 'var(--accent-green-light)';

    setTimeout(() => {
      btn.innerHTML  = origText;
      btn.disabled   = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

/* ============================================
   ANIMATED MINI BARS (HERO)
   ============================================ */
function animateMiniBar(barEl, heights) {
  const bars = barEl.querySelectorAll('.mini-bar');
  bars.forEach((bar, i) => {
    bar.style.height = (heights[i] || 10) + 'px';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const barContainers = document.querySelectorAll('.mini-bars');
  barContainers.forEach(container => {
    const bars = container.querySelectorAll('.mini-bar');
    bars.forEach(bar => {
      const h = Math.floor(Math.random() * 20) + 6;
      bar.style.height = h + 'px';
    });
  });

  // Pulse bars
  setInterval(() => {
    barContainers.forEach(container => {
      const bars = container.querySelectorAll('.mini-bar');
      bars.forEach(bar => {
        const h = Math.floor(Math.random() * 20) + 6;
        bar.style.transition = 'height 0.4s ease';
        bar.style.height = h + 'px';
      });
    });
  }, 2000);
});

/* ============================================
   HERO SECTION TYPEWRITER EFFECT
   ============================================ */
function typewriterInit() {
  const titles = [
    'Data Analyst',
    'Business Intelligence Specialist',
    'Data Visualization Enthusiast',
    'Analytical Problem Solver'
  ];
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  let titleIndex = 0;
  let charIndex  = 0;
  let deleting   = false;

  function type() {
    const current = titles[titleIndex];
    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 90);
  }

  type();
}
typewriterInit();

/* ============================================
   INITIAL ANIMATION — HERO
   ============================================ */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-left > *').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 100);
  });
});
