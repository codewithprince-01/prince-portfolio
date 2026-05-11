// Year auto-update
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');

if (navToggle && nav) {
  const MENU_OPEN_ICON = '\u2715';
  const MENU_CLOSED_ICON = '\u2630';

  const closeMenu = () => {
    nav.classList.remove('active');
    navToggle.textContent = MENU_CLOSED_ICON;
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.textContent = MENU_CLOSED_ICON;
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const isOpen = nav.classList.contains('active');
    navToggle.textContent = isOpen ? MENU_OPEN_ICON : MENU_CLOSED_ICON;
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

// Smooth reveal on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-zoom');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('reveal-active'));
}

// Hover parallax for profile image (desktop pointers only)
const profile = document.querySelector('.profile-large');
if (profile && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  profile.addEventListener('mousemove', (e) => {
    const rect = profile.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    profile.style.transform =
      `perspective(600px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) scale(1.02)`;
  });
  profile.addEventListener('mouseleave', () => {
    profile.style.transform = '';
  });
}

// Hero CTA animation
const cta = document.querySelector('.hero-cta .primary');
if (cta) {
  setInterval(() => {
    cta.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-6px)' },
        { transform: 'translateY(0)' },
      ],
      { duration: 2200, iterations: 1, easing: 'cubic-bezier(.2,.9,.2,1)' }
    );
  }, 4000);
}

// Contact form simulation
const sendBtn = document.getElementById('send-btn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;
    setTimeout(() => {
      sendBtn.textContent = 'Sent';
      sendBtn.classList.add('ghost');
      sendBtn.disabled = false;
    }, 1200);
  });
}

// Keyboard shortcut for quick scroll
document.addEventListener('keydown', (e) => {
  if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
    const portfolioCta = document.getElementById('cta-portfolio');
    if (portfolioCta) {
      portfolioCta.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
