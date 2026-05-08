// 管理画面 共通処理

const NAV_ITEMS = [
  { label: 'ダッシュボード', href: 'dashboard.html' },
  { label: '予約・問い合わせ', href: 'reservations.html' },
  { label: 'メニュー・料金', href: 'menu.html' },
  { label: 'スタイリスト情報', href: 'stylist.html' },
  { label: '店舗情報', href: 'store-info.html' },
  { label: 'お知らせ', href: 'news.html' },
];

function initAdmin() {
  checkAuth();
  renderSidebar();
}

function renderSidebar() {
  const currentPage = location.pathname.split('/').pop() || 'dashboard.html';
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <span class="sidebar-logo-en">Luxe</span>
      <span class="sidebar-logo-label">管理画面</span>
    </div>
    <nav class="sidebar-nav">
      <ul>
        ${NAV_ITEMS.map(item => `
          <li>
            <a href="${item.href}" class="${currentPage === item.href ? 'active' : ''}">${item.label}</a>
          </li>
        `).join('')}
      </ul>
    </nav>
    <div class="sidebar-footer">
      <a href="../index.html" class="btn-site-link" target="_blank">TOPページを見る</a>
      <button class="btn-logout" onclick="logout()">ログアウト</button>
    </div>
  `;
}

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
