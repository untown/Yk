const Storage = (() => {
  const CUSTOM_TESTS = 'yk_custom_tests_v1';
  const STATS = 'yk_stats_v1';
  const THEME = 'yk_theme_v1';

  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
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
    const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10);
  };
  const markStudyDay = () => {
    const stats = getStats();
    const today = todayKey();
    if (stats.lastStudyDate === today) return stats;
    stats.streak = stats.lastStudyDate === yesterdayKey() ? stats.streak + 1 : 1;
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
    stats.mistakes = stats.mistakes.slice(-100);
    saveStats(stats);
    return stats;
  };

  const getTheme = () => localStorage.getItem(THEME) || 'light';
  const setTheme = (theme) => localStorage.setItem(THEME, theme);

  return { getCustomTests, saveCustomTests, getAllTests, getStats, saveStats, recordQuiz, markStudyDay, getTheme, setTheme };
})();
