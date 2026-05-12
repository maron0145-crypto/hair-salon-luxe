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
   カルーセル共通初期化
   ============================================================ */
function initCarousel(gridSelector, dotsContainerId, cardSelector) {
  const grid = document.querySelector(gridSelector);
  const dotsContainer = document.getElementById(dotsContainerId);
  const cards = Array.from(grid.querySelectorAll(cardSelector));

  cards.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'menu-dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `${i + 1}番目`);
    btn.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.menu-dot'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = cards.indexOf(entry.target);
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    },
    { root: grid, threshold: 0.5 }
  );

  cards.forEach(card => observer.observe(card));
}

initCarousel('.concept-grid', 'conceptDots', '.concept-card');
initCarousel('.menu-grid', 'menuDots', '.menu-card');

/* ============================================================
   Contact form — バリデーション & submit handler
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showFieldError(input, errorEl, html) {
  input.style.borderColor = '#b05a3a';
  errorEl.innerHTML = html;
  errorEl.hidden = false;
}

function clearFieldError(input, errorEl) {
  input.style.borderColor = '';
  errorEl.hidden = true;
  errorEl.innerHTML = '';
}

// 電話番号：数字が10桁または11桁かチェック
function validatePhone() {
  const input = document.getElementById('phone');
  const errorEl = document.getElementById('phoneError');
  const value = input.value.trim();

  if (!value) { clearFieldError(input, errorEl); return true; }

  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10 && digits.length !== 11) {
    showFieldError(input, errorEl,
      `入力値: <span class="error-value">${escapeHtml(value)}</span><br>` +
      `<span class="error-detail">桁数が正しくありません（現在 ${digits.length}桁 ／ 正しくは 10桁または11桁）</span>`
    );
    return false;
  }

  clearFieldError(input, errorEl);
  return true;
}

// 日時：営業時間（10:00〜18:00受付）・定休日（火曜・第3月曜）チェック
function validateDatetime() {
  const input = document.getElementById('datetime');
  const errorEl = document.getElementById('datetimeError');
  const value = input.value;

  if (!value) { clearFieldError(input, errorEl); return true; }

  const dt = new Date(value);
  const day = dt.getDay();
  const date = dt.getDate();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();

  const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
  const dateStr = `${dt.getMonth() + 1}月${date}日（${WEEKDAYS[day]}曜日）`;
  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // 定休日：火曜
  if (day === 2) {
    showFieldError(input, errorEl,
      `選択日: <span class="error-value">${dateStr}</span><br>` +
      `<span class="error-detail">定休日のため予約を承れません（定休日：火曜日・第3月曜日）</span>`
    );
    return false;
  }

  // 定休日：第3月曜（15日〜21日の月曜）
  if (day === 1 && date >= 15 && date <= 21) {
    showFieldError(input, errorEl,
      `選択日: <span class="error-value">${dateStr}</span><br>` +
      `<span class="error-detail">第3月曜日は定休日のため予約を承れません（定休日：火曜日・第3月曜日）</span>`
    );
    return false;
  }

  // 営業時間外（最終受付 18:00）
  const timeInMin = hours * 60 + minutes;
  if (timeInMin < 10 * 60 || timeInMin >= 18 * 60) {
    showFieldError(input, errorEl,
      `選択時刻: <span class="error-value">${timeStr}</span><br>` +
      `<span class="error-detail">受付時間外です（受付時間：10:00〜18:00）</span>`
    );
    return false;
  }

  clearFieldError(input, errorEl);
  return true;
}

// blur・change 時にリアルタイム検証
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('datetime').addEventListener('change', validateDatetime);

/* ============================================================
   エラーモーダル
   ============================================================ */
const errorModal = document.getElementById('errorModal');
const errorModalList = document.getElementById('errorModalList');

function closeErrorModal() {
  errorModal.hidden = true;
}

document.getElementById('errorModalClose').addEventListener('click', closeErrorModal);
document.getElementById('errorModalOverlay').addEventListener('click', closeErrorModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !errorModal.hidden) closeErrorModal();
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const errors = [];

  // 必須項目チェック
  contactForm.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#b05a3a';
      const labelNode = field.closest('.form-group')?.querySelector('label');
      const labelText = labelNode ? labelNode.childNodes[0].textContent.trim() : '';
      if (labelText) errors.push(`${labelText}を入力してください`);
    } else {
      field.style.borderColor = '';
    }
  });

  if (!validatePhone()) {
    const detail = document.getElementById('phoneError').querySelector('.error-detail');
    errors.push(detail ? detail.textContent : '電話番号を確認してください');
  }
  if (!validateDatetime()) {
    const detail = document.getElementById('datetimeError').querySelector('.error-detail');
    errors.push(detail ? detail.textContent : 'ご希望の日時を確認してください');
  }

  if (errors.length > 0) {
    errorModalList.innerHTML = errors.map(msg => `<li>${escapeHtml(msg)}</li>`).join('');
    errorModal.hidden = false;
    return;
  }

  contactForm.hidden = true;
  formSuccess.hidden = false;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
