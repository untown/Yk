const $ = (selector) => document.querySelector(selector);

function setupAdminAuth() {
  const auth = $('#adminAuth');
  const shell = $('#adminShell');
  if (Auth.isAdminLoggedIn()) {
    auth.classList.add('hidden'); shell.classList.remove('hidden'); initAdmin();
  }
  $('#adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (Auth.adminLogin($('#adminPasswordInput').value)) {
      auth.classList.add('hidden'); shell.classList.remove('hidden'); initAdmin();
    } else $('#adminLoginError').textContent = 'Admin şifresi yanlış.';
  });
}

function initAdmin() {
  $('#adminLogoutBtn').onclick = () => { Auth.adminLogout(); location.reload(); };
  $('#questionForm').onsubmit = saveQuestion;
  $('#exportBtn').onclick = exportJson;
  $('#importInput').onchange = importJson;
  $('#resetBtn').onclick = resetCustom;
  renderAdminList();
}

function saveQuestion(e) {
  e.preventDefault();
  const category = $('#categoryInput').value;
  const testName = $('#testNameInput').value.trim();
  const custom = Storage.getCustomTests();
  let test = custom.find(t => t.category === category && t.name.toLowerCase() === testName.toLowerCase());
  if (!test) {
    test = { id: `custom-${Date.now()}`, category, name: testName, description: 'Admin tarafından eklenen test', questions: [] };
    custom.push(test);
  }
  const question = {
    id: `custom-q-${Date.now()}`,
    rule: $('#ruleInput').value.trim(),
    text: $('#questionInput').value.trim(),
    options: [$('#optA').value, $('#optB').value, $('#optC').value, $('#optD').value, $('#optE').value].map(v => v.trim()),
    answer: $('#answerInput').value,
    wrongWord: $('#wrongWordInput').value.trim(),
    explanation: $('#explanationInput').value.trim()
  };
  test.questions.push(question);
  Storage.saveCustomTests(custom);
  $('#saveStatus').textContent = 'Soru kaydedildi.';
  $('#questionForm').reset();
  renderAdminList();
}

function renderAdminList() {
  const box = $('#adminTestList');
  const tests = Storage.getCustomTests();
  box.innerHTML = '';
  if (!tests.length) {
    box.innerHTML = '<p class="muted">Henüz admin tarafından eklenen test yok.</p>';
    return;
  }
  tests.forEach(test => {
    const item = document.createElement('div');
    item.className = 'admin-test-item';
    item.innerHTML = `<div><strong>${escapeHtml(test.name)}</strong><small>${test.category} • ${test.questions.length} soru</small></div><button class="danger-btn">Sil</button>`;
    item.querySelector('button').onclick = () => deleteTest(test.id);
    box.appendChild(item);
  });
}

function deleteTest(id) {
  if (!confirm('Bu testi silmek istiyor musun?')) return;
  Storage.saveCustomTests(Storage.getCustomTests().filter(t => t.id !== id));
  renderAdminList();
}

function exportJson() {
  const data = {
    exportedAt: new Date().toISOString(),
    customTests: Storage.getCustomTests(),
    stats: Storage.getStats()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'yazim-kurallari-yedek.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importJson(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data.customTests)) throw new Error('customTests yok');
      Storage.saveCustomTests(data.customTests);
      if (data.stats) Storage.saveStats(data.stats);
      renderAdminList();
      alert('Yedek içe aktarıldı.');
    } catch {
      alert('Bu dosya uygun JSON yedeği değil.');
    }
  };
  reader.readAsText(file);
}

function resetCustom() {
  if (!confirm('Admin tarafından eklenen tüm sorular silinsin mi?')) return;
  Storage.saveCustomTests([]);
  renderAdminList();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

document.addEventListener('DOMContentLoaded', setupAdminAuth);
