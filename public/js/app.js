let currentRoute = 'home';
let activeListCategory = 'new';
let activeQuestions = [];
let activeIndex = 0;
let activeAnswers = [];
let answerLocked = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const views = ['homeView', 'listView', 'quizView', 'resultView', 'statsView'];
const categoryNames = { new: 'Yeni Testler', easy: 'Kolay Testler', medium: 'Orta Testler', hard: 'Zor Testler' };

function showView(id) {
  views.forEach(viewId => $('#' + viewId)?.classList.add('hidden'));
  $('#' + id)?.classList.remove('hidden');
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function applyTheme() {
  const theme = Storage.getTheme();
  document.documentElement.dataset.theme = theme;
  const btn = $('#themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
}

function setupAuth() {
  const authScreen = $('#authScreen');
  const appShell = $('#appShell');
  if (Auth.isLoggedIn()) {
    authScreen.classList.add('hidden');
    appShell.classList.remove('hidden');
    initApp();
  }

  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const result = Auth.login($('#passwordInput').value);
    if (result.ok) {
      authScreen.classList.add('hidden');
      appShell.classList.remove('hidden');
      initApp();
    } else {
      $('#loginError').textContent = result.message || 'Şifre yanlış. Büyük/küçük harfe ve Türkçe İ harfine dikkat et.';
    }
  });
}

function initApp() {
  applyTheme();
  refreshHomeStats();
  bindNavigation();
  routeTo('home');
}

function bindNavigation() {
  $$('[data-route]').forEach(btn => {
    btn.onclick = () => routeTo(btn.dataset.route);
  });
  $('#logoutBtn').onclick = () => { Auth.logout(); location.reload(); };
  $('#themeBtn').onclick = () => {
    Storage.setTheme(Storage.getTheme() === 'dark' ? 'light' : 'dark');
    applyTheme();
  };
  $('#nextBtn').onclick = nextQuestion;
  $('#backToListBtn').onclick = () => routeTo(activeListCategory);
}

function routeTo(route) {
  currentRoute = route;
  if (route === 'home') { showView('homeView'); refreshHomeStats(); return; }
  if (route === 'daily') { startDailyQuiz(); return; }
  if (route === 'mistakes') { startMistakeQuiz(); return; }
  if (route === 'stats') { renderStats(); showView('statsView'); return; }
  if (['new', 'easy', 'medium', 'hard'].includes(route)) { renderTestList(route); showView('listView'); return; }
}

function refreshHomeStats() {
  const stats = Storage.getStats();
  $('#streakCount').textContent = `${stats.streak || 0} gün`;
}

function renderTestList(category) {
  activeListCategory = category;
  $('#listEyebrow').textContent = 'Test Seçimi';
  $('#listTitle').textContent = categoryNames[category];
  const tests = Storage.getAllTests().filter(t => t.category === category);
  const box = $('#testList');
  box.innerHTML = '';
  if (!tests.length) {
    box.innerHTML = '<article class="empty-card">Bu bölümde test yok. Admin panelden test ekleyebilirsin.</article>';
    return;
  }
  tests.forEach(test => {
    const card = document.createElement('article');
    card.className = 'test-card';
    card.innerHTML = `<div><h3>${escapeHtml(test.name)}</h3><p>${escapeHtml(test.description || 'Yazım kuralları testi')}</p><span>${test.questions.length} soru</span></div><button class="primary-btn">Teste Başla</button>`;
    card.querySelector('button').onclick = () => startQuiz(test.questions, test.name);
    box.appendChild(card);
  });
}

function startDailyQuiz() {
  const allQuestions = Storage.getAllTests().flatMap(t => t.questions.map(q => ({...q})));
  const easy = Storage.getAllTests().filter(t => t.category === 'easy').flatMap(t => t.questions);
  const hard = Storage.getAllTests().filter(t => t.category === 'hard').flatMap(t => t.questions);
  const medium = Storage.getAllTests().filter(t => t.category === 'medium').flatMap(t => t.questions);
  let selected = [...shuffle(hard).slice(0,2), ...shuffle(easy).slice(0,3), ...shuffle(medium).slice(0,2), ...shuffle(allQuestions).slice(0,3)];
  selected = shuffle(selected).slice(0, 10);
  startQuiz(selected, 'Günlük 10 Soru');
}

function startMistakeQuiz() {
  const mistakes = Storage.getStats().mistakes || [];
  if (!mistakes.length) {
    alert('Henüz yanlış yaptığın soru yok. Önce bir test çöz.');
    routeTo('home');
    return;
  }
  startQuiz(shuffle(mistakes).slice(0, 10), 'Yanlışları Tekrar Çöz');
}

function startQuiz(questions, title) {
  activeQuestions = questions.map(q => ({...q, quizTitle: title}));
  activeIndex = 0;
  activeAnswers = [];
  answerLocked = false;
  showView('quizView');
  renderQuestion();
}

function renderQuestion() {
  const q = activeQuestions[activeIndex];
  answerLocked = false;
  $('#ruleTag').textContent = q.rule || 'Yazım Kuralı';
  $('#questionText').textContent = q.text;
  $('#questionCounter').textContent = `${activeIndex + 1}/${activeQuestions.length}`;
  $('#progressBar').style.width = `${((activeIndex) / activeQuestions.length) * 100}%`;
  $('#explanationBox').classList.add('hidden');
  $('#nextBtn').classList.add('hidden');

  const box = $('#optionsBox');
  box.innerHTML = '';
  q.options.forEach((option, idx) => {
    const letter = 'ABCDE'[idx];
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${letter}</span><strong>${escapeHtml(option)}</strong>`;
    btn.onclick = () => chooseAnswer(letter, btn);
    box.appendChild(btn);
  });
}

function chooseAnswer(letter) {
  if (answerLocked) return;
  answerLocked = true;
  const q = activeQuestions[activeIndex];
  const correct = letter === q.answer;
  $$('.option-btn').forEach((btn, idx) => {
    const optLetter = 'ABCDE'[idx];
    if (optLetter === q.answer) btn.classList.add('correct');
    if (optLetter === letter && !correct) btn.classList.add('wrong');
  });
  activeAnswers.push({ question: q, selected: letter, correct });
  setTimeout(() => {
    $('#explanationBox').innerHTML = `<strong>Dikkat edilecek ifade:</strong> <mark>${escapeHtml(q.wrongWord || q.options['ABCDE'.indexOf(q.answer)])}</mark><br>${escapeHtml(q.explanation || '')}`;
    $('#explanationBox').classList.remove('hidden');
    $('#nextBtn').classList.remove('hidden');
  }, 900);
}

function nextQuestion() {
  activeIndex += 1;
  if (activeIndex >= activeQuestions.length) finishQuiz();
  else renderQuestion();
}

function finishQuiz() {
  $('#progressBar').style.width = '100%';
  Storage.recordQuiz(activeAnswers);
  const correct = activeAnswers.filter(a => a.correct).length;
  const wrong = activeAnswers.length - correct;
  const rate = activeAnswers.length ? Math.round((correct / activeAnswers.length) * 100) : 0;
  $('#correctCount').textContent = correct;
  $('#wrongCount').textContent = wrong;
  $('#successRate').textContent = `${rate}%`;
  $('#resultTitle').textContent = activeQuestions[0]?.quizTitle || 'Sonuç';
  const list = $('#wrongWordsList');
  list.innerHTML = '';
  const wrongItems = activeAnswers.filter(a => !a.correct);
  if (!wrongItems.length) list.innerHTML = '<li>Harika! Bu testte yanlış kelime yok.</li>';
  wrongItems.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.question.wrongWord || 'Kelime'} — ${a.question.explanation || ''}`;
    list.appendChild(li);
  });
  showView('resultView');
}

function renderStats() {
  const stats = Storage.getStats();
  $('#totalAnswered').textContent = stats.totalAnswered || 0;
  $('#totalCorrect').textContent = stats.totalCorrect || 0;
  $('#statsStreak').textContent = `${stats.streak || 0} gün`;
  const box = $('#mostWrongWords');
  box.innerHTML = '';
  const entries = Object.entries(stats.wrongWords || {}).sort((a,b) => b[1] - a[1]).slice(0, 20);
  if (!entries.length) { box.innerHTML = '<span class="muted">Henüz yanlış kelime yok.</span>'; return; }
  entries.forEach(([word, count]) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = `${word} (${count})`;
    box.appendChild(chip);
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

document.addEventListener('DOMContentLoaded', setupAuth);
