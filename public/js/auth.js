const Auth = (() => {
  const normalize = (value) => (value || '').trim();
  const now = () => Date.now();
  const remainingSeconds = (until) => Math.max(0, Math.ceil((until - now()) / 1000));

  const isLoggedIn = () => sessionStorage.getItem(APP_CONFIG.SESSION_KEY) === 'yes';
  const isAdminLoggedIn = () => sessionStorage.getItem(APP_CONFIG.ADMIN_SESSION_KEY) === 'yes';

  const lockInfo = (area) => {
    const state = Storage.getSecurityState();
    const key = area === 'admin' ? 'adminLockedUntil' : 'siteLockedUntil';
    return { locked: (state[key] || 0) > now(), seconds: remainingSeconds(state[key] || 0) };
  };

  const registerFail = (area, password) => {
    const state = Storage.getSecurityState();
    const failedKey = area === 'admin' ? 'failedAdmin' : 'failedSite';
    const lockKey = area === 'admin' ? 'adminLockedUntil' : 'siteLockedUntil';
    state[failedKey] = (state[failedKey] || 0) + 1;
    let reason = 'Şifre yanlış.';
    if (state[failedKey] >= APP_CONFIG.MAX_FAILED_ATTEMPTS) {
      state[lockKey] = now() + APP_CONFIG.LOCK_MINUTES * 60 * 1000;
      state[failedKey] = 0;
      reason = `${APP_CONFIG.MAX_FAILED_ATTEMPTS} yanlış deneme nedeniyle ${APP_CONFIG.LOCK_MINUTES} dakika kilitlendi.`;
    }
    Storage.saveSecurityState(state);
    Storage.addSecurityLog({ area, success: false, reason, enteredLength: normalize(password).length });
    return { ok: false, message: reason };
  };

  const registerSuccess = (area, password) => {
    const state = Storage.getSecurityState();
    if (area === 'admin') { state.failedAdmin = 0; state.adminLockedUntil = 0; }
    else { state.failedSite = 0; state.siteLockedUntil = 0; }
    Storage.saveSecurityState(state);
    Storage.addSecurityLog({ area, success: true, reason: 'Giriş başarılı.', enteredLength: normalize(password).length });
    return { ok: true, message: 'Giriş başarılı.' };
  };

  const login = (password) => {
    const lock = lockInfo('site');
    if (lock.locked) {
      Storage.addSecurityLog({ area: 'site', success: false, reason: `Kilit aktif: ${lock.seconds} saniye kaldı.`, enteredLength: normalize(password).length });
      return { ok: false, message: `Çok fazla yanlış deneme. ${Math.ceil(lock.seconds / 60)} dakika sonra tekrar dene.` };
    }
    if (normalize(password) === APP_CONFIG.SITE_PASSWORD) {
      sessionStorage.setItem(APP_CONFIG.SESSION_KEY, 'yes');
      return registerSuccess('site', password);
    }
    return registerFail('site', password);
  };

  const adminLogin = (password) => {
    const lock = lockInfo('admin');
    if (lock.locked) {
      Storage.addSecurityLog({ area: 'admin', success: false, reason: `Admin kilidi aktif: ${lock.seconds} saniye kaldı.`, enteredLength: normalize(password).length });
      return { ok: false, message: `Çok fazla yanlış deneme. ${Math.ceil(lock.seconds / 60)} dakika sonra tekrar dene.` };
    }
    if (normalize(password) === APP_CONFIG.ADMIN_PASSWORD) {
      sessionStorage.setItem(APP_CONFIG.ADMIN_SESSION_KEY, 'yes');
      return registerSuccess('admin', password);
    }
    return registerFail('admin', password);
  };

  const logout = () => sessionStorage.removeItem(APP_CONFIG.SESSION_KEY);
  const adminLogout = () => sessionStorage.removeItem(APP_CONFIG.ADMIN_SESSION_KEY);

  return { isLoggedIn, isAdminLoggedIn, login, adminLogin, logout, adminLogout, lockInfo };
})();
