const Storage = (() => {
  const CUSTOM_TESTS = 'yk_custom_tests_v1';
  const STATS = 'yk_stats_v1';
  const THEME = 'yk_theme_v1';
  const SECURITY_LOGS = 'yk_security_logs_v1';
  const SECURITY_STATE = 'yk_security_state_v1';

  const read = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const getCustomTests = () => read(CUSTOM_TESTS, []);
  const saveCustomTests = (tests) => write(CUSTOM_TESTS, tests);
  const getAllTests = () => [...window.DEFAULT_TESTS, ...getCustomTests()];

  const defaultStats = () => ({ totalAnswered: 0, totalCorrect: 0, mistakes: [], wrongWords: {}, streak: 0, lastStudyDate: null });
  const getStats = () => read(STATS, defaultStats());
  const saveStats = (stats) => write(STATS, stats);

  const todayKey = () => new Date().toISOString().slice(0, 10);
  const yesterdayKey = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  };

  const markStudyDay = () => {
    const stats = getStats();
    const today = todayKey();
    if (stats.lastStudyDate === today) return stats;
    stats.streak = stats.lastStudyDate === yesterdayKey() ? (stats.streak || 0) + 1 : 1;
    stats.lastStudyDate = today;
    saveStats(stats);
    return stats;
  };

  const recordQuiz = (answered) => {
    const stats = markStudyDay();
    answered.forEach(item => {
      stats.totalAnswered += 1;
      if (item.correct) stats.totalCorrect += 1;
      else {
        stats.mistakes.push(item.question);
        const word = item.question.wrongWord || 'Bilinmeyen';
        stats.wrongWords[word] = (stats.wrongWords[word] || 0) + 1;
      }
    });
    stats.mistakes = stats.mistakes.slice(-150);
    saveStats(stats);
    return stats;
  };

  const getTheme = () => localStorage.getItem(THEME) || 'light';
  const setTheme = (theme) => localStorage.setItem(THEME, theme);

  const defaultSecurityState = () => ({ failedSite: 0, failedAdmin: 0, siteLockedUntil: 0, adminLockedUntil: 0 });
  const getSecurityState = () => read(SECURITY_STATE, defaultSecurityState());
  const saveSecurityState = (state) => write(SECURITY_STATE, state);

  const deviceSummary = () => {
    const nav = navigator || {};
    return {
      userAgent: nav.userAgent || 'Bilinmiyor',
      language: nav.language || 'Bilinmiyor',
      platform: nav.platform || 'Bilinmiyor',
      screen: `${window.screen?.width || '?'}x${window.screen?.height || '?'}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Bilinmiyor',
      ip: 'GitHub Pages statik olduğu için IP adresi alınamaz.'
    };
  };

  const addSecurityLog = ({ area, success, reason, enteredLength }) => {
    const logs = read(SECURITY_LOGS, []);
    logs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      area,
      success,
      reason: reason || '',
      enteredLength: Number(enteredLength || 0),
      timeISO: new Date().toISOString(),
      timeLocal: new Date().toLocaleString('tr-TR'),
      page: location.pathname.split('/').pop() || 'index.html',
      ...deviceSummary()
    });
    write(SECURITY_LOGS, logs.slice(0, 300));
  };

  const getSecurityLogs = () => read(SECURITY_LOGS, []);
  const clearSecurityLogs = () => write(SECURITY_LOGS, []);

  const exportAll = () => ({
    version: 2,
    exportedAt: new Date().toISOString(),
    customTests: getCustomTests(),
    stats: getStats(),
    securityLogs: getSecurityLogs(),
    securityState: getSecurityState()
  });

  const importAll = (data) => {
    if (!data || !Array.isArray(data.customTests)) throw new Error('customTests alanı bulunamadı.');
    saveCustomTests(data.customTests);
    if (data.stats) saveStats(data.stats);
    if (Array.isArray(data.securityLogs)) write(SECURITY_LOGS, data.securityLogs);
    if (data.securityState) saveSecurityState(data.securityState);
  };

  return {
    getCustomTests,
    saveCustomTests,
    getAllTests,
    getStats,
    saveStats,
    recordQuiz,
    markStudyDay,
    getTheme,
    setTheme,
    getSecurityState,
    saveSecurityState,
    addSecurityLog,
    getSecurityLogs,
    clearSecurityLogs,
    exportAll,
    importAll
  };
})();
