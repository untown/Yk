const Auth = (() => {
  const normalize = (value) => (value || '').trim();
  const isLoggedIn = () => sessionStorage.getItem(APP_CONFIG.SESSION_KEY) === 'yes';
  const isAdminLoggedIn = () => sessionStorage.getItem(APP_CONFIG.ADMIN_SESSION_KEY) === 'yes';
  const login = (password) => {
    if (normalize(password) === APP_CONFIG.SITE_PASSWORD) { sessionStorage.setItem(APP_CONFIG.SESSION_KEY, 'yes'); return true; }
    return false;
  };
  const adminLogin = (password) => {
    if (normalize(password) === APP_CONFIG.ADMIN_PASSWORD) { sessionStorage.setItem(APP_CONFIG.ADMIN_SESSION_KEY, 'yes'); return true; }
    return false;
  };
  const logout = () => sessionStorage.removeItem(APP_CONFIG.SESSION_KEY);
  const adminLogout = () => sessionStorage.removeItem(APP_CONFIG.ADMIN_SESSION_KEY);
  return { isLoggedIn, isAdminLoggedIn, login, adminLogin, logout, adminLogout };
})();
