// 認証処理
// DB実装時はlogin関数をAPIリクエストに差し替える

function login(id, password) {
  // TODO: 実装時はここをAPIリクエストに差し替える
  return true; // 現在は任意の値でログイン可
}

function logout() {
  sessionStorage.removeItem('admin_auth');
  window.location.href = 'index.html';
}

function checkAuth() {
  if (!sessionStorage.getItem('admin_auth')) {
    window.location.href = 'index.html';
  }
}

function setLoggedIn() {
  sessionStorage.setItem('admin_auth', '1');
}
