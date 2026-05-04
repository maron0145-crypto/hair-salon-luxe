/* ============================================================
   Header — scroll shadow
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

/* ============================================================
   Mobile navigation toggle
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// Close nav when a link is tapped
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-label', 'メニューを開く');
  });
});

/* ============================================================
   Contact form — submit handler
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic required-field check
  const required = contactForm.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#b05a3a';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) return;

  // Hide form, show success message
  contactForm.hidden = true;
  formSuccess.hidden = false;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
