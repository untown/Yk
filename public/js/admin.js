const $ = (selector) => document.querySelector(selector);

function setupAdminAuth() {
  const auth = $('#adminAuth');
  const shell = $('#adminShell');
  if (Auth.isAdminLoggedIn()) {
    auth.classList.add('hidden');
    shell.classList.remove('hidden');
    initAdmin();
  }
  $('#adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const result = Auth.adminLogin($('#adminPasswordInput').value);
    if (result.ok) {
      auth.classList.add('hidden');
      shell.classList.remove('hidden');
      initAdmin();
    } else {
      $('#adminLoginError').textContent = result.message || 'Admin şifresi yanlış.';
    }
  });
}

function initAdmin() {
  $('#adminLogoutBtn').onclick = () => { Auth.adminLogout(); location.reload(); };
  $('#questionForm').onsubmit = saveQuestion;
  $('#exportBtn').onclick = exportJson;
  $('#importInput').onchange = importJson;
  $('#resetBtn').onclick = resetCustom;
  $('#clearLogsBtn').onclick = clearLogs;
  $('#exportLogsBtn').onclick = exportLogsOnly;
  renderAdminList();
  renderSecurityLogs();
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

function renderSecurityLogs() {
  const box = $('#securityLogList');
  const logs = Storage.getSecurityLogs();
  $('#logCount').textContent = `${logs.length} kayıt`;
  box.innerHTML = '';
  if (!logs.length) {
    box.innerHTML = '<p class="muted">Henüz giriş kaydı yok.</p>';
    return;
  }
  logs.slice(0, 80).forEach(log => {
    const item = document.createElement('div');
    item.className = `log-item ${log.success ? 'log-ok' : 'log-bad'}`;
    item.innerHTML = `
      <div class="log-top">
        <strong>${log.success ? 'Başarılı giriş' : 'Başarısız deneme'}</strong>
        <span>${escapeHtml(log.timeLocal)}</span>
      </div>
      <div class="log-detail">
        <b>Bölüm:</b> ${escapeHtml(log.area)}<br>
        <b>IP:</b> ${escapeHtml(log.ip)}<br>
        <b>Cihaz:</b> ${escapeHtml(log.platform)} • ${escapeHtml(log.screen)} • ${escapeHtml(log.language)}<br>
        <b>Saat dilimi:</b> ${escapeHtml(log.timezone)}<br>
        <b>Tarayıcı:</b> ${escapeHtml(log.userAgent)}<br>
        <b>Açıklama:</b> ${escapeHtml(log.reason)}
      </div>`;
    box.appendChild(item);
  });
}

function deleteTest(id) {
  if (!confirm('Bu testi silmek istiyor musun?')) return;
  Storage.saveCustomTests(Storage.getCustomTests().filter(t => t.id !== id));
  renderAdminList();
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  downloadJson('yazim-kurallari-tam-yedek.json', Storage.exportAll());
}

function exportLogsOnly() {
  downloadJson('yazim-kurallari-giris-kayitlari.json', {
    exportedAt: new Date().toISOString(),
    logs: Storage.getSecurityLogs()
  });
}

function importJson(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      Storage.importAll(data);
      renderAdminList();
      renderSecurityLogs();
      alert('Yedek içe aktarıldı.');
    } catch (err) {
      alert('Bu dosya uygun JSON yedeği değil: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function resetCustom() {
  if (!confirm('Admin tarafından eklenen tüm sorular silinsin mi?')) return;
  Storage.saveCustomTests([]);
  renderAdminList();
}

function clearLogs() {
  if (!confirm('Giriş kayıtları silinsin mi?')) return;
  Storage.clearSecurityLogs();
  renderSecurityLogs();
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

document.addEventListener('DOMContentLoaded', setupAdminAuth);
