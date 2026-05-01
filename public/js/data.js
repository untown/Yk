window.DEFAULT_TESTS = [
  {
    id: 'new-1',
    category: 'new',
    name: 'Yeni Test 1',
    description: 'Sık karıştırılan yazımlar',
    questions: [
      {
        id: 'q1', rule: 'Sık karıştırılan kelimeler',
        text: 'Aşağıdakilerden hangisi yanlış yazılmıştır?',
        options: ['herkes', 'yalnız', 'yanlış', 'kirbit', 'birçok'],
        answer: 'D', wrongWord: 'kirbit',
        explanation: 'Doğru yazım “kibrit” şeklindedir. “Kirbit” yazımı yanlıştır.'
      },
      {
        id: 'q2', rule: 'Birleşik kelimeler',
        text: 'Aşağıdakilerden hangisi doğru yazılmıştır?',
        options: ['bir çoğu', 'hiç bir', 'birkaç', 'her şey', 'pekçok'],
        answer: 'C', wrongWord: 'birkaç',
        explanation: '“Birkaç” kelimesi birleşik yazılır. “Bir kaç” şeklinde ayrılmaz.'
      },
      {
        id: 'q3', rule: 'Ayrı yazılan kelimeler',
        text: 'Aşağıdakilerden hangisi doğru yazılmıştır?',
        options: ['hiçbir şey', 'herşey', 'birşey', 'çokta', 'şeyde'],
        answer: 'A', wrongWord: 'hiçbir şey',
        explanation: '“Şey” kelimesi genellikle ayrı yazılır: “hiçbir şey”.'
      },
      {
        id: 'q4', rule: 'Bağlaç olan de/da',
        text: 'Aşağıdakilerden hangisinde “de/da” yazımı doğrudur?',
        options: ['Sende bizimle gel.', 'Kitapta masanın üstünde.', 'Ben de çözdüm.', 'Evde geldi.', 'Bunu dağördüm.'],
        answer: 'C', wrongWord: 'Ben de',
        explanation: 'Bağlaç olan “de/da” ayrı yazılır: “Ben de çözdüm.”'
      },
      {
        id: 'q5', rule: 'Soru eki mı/mi',
        text: 'Aşağıdakilerden hangisinde soru eki doğru yazılmıştır?',
        options: ['Geldinmi?', 'Okudun mu?', 'Yapacakmısın?', 'Senmisin?', 'Biliyormusun?'],
        answer: 'B', wrongWord: 'Okudun mu',
        explanation: 'Soru eki “mı/mi/mu/mü” ayrı yazılır: “Okudun mu?”'
      }
    ]
  },
  {
    id: 'easy-1', category: 'easy', name: 'Kolay Test 1', description: 'Temel yazım soruları', questions: [
      { id: 'e1', rule: 'Doğru yazım', text: 'Aşağıdakilerden hangisi doğru yazılmıştır?', options: ['yanlız', 'herkez', 'süpriz', 'yalnız', 'şarz'], answer: 'D', wrongWord: 'yalnız', explanation: 'Doğru yazım “yalnız”dır.' },
      { id: 'e2', rule: 'Doğru yazım', text: 'Aşağıdakilerden hangisi yanlış yazılmıştır?', options: ['bugün', 'yarın', 'hafta sonu', 'art arda', 'peşpeşe'], answer: 'E', wrongWord: 'peşpeşe', explanation: 'Doğru yazım “peş peşe” şeklindedir.' },
      { id: 'e3', rule: 'Şey kelimesi', text: 'Aşağıdakilerden hangisi doğru yazılmıştır?', options: ['birşey', 'her şey', 'çokşey', 'şeyde', 'hiçbirşey'], answer: 'B', wrongWord: 'her şey', explanation: '“Şey” kelimesi ayrı yazılır: “her şey”.' }
    ]
  },
  {
    id: 'medium-1', category: 'medium', name: 'Orta Test 1', description: 'Dikkat isteyen sorular', questions: [
      { id: 'm1', rule: 'Ki yazımı', text: 'Aşağıdakilerden hangisinde “ki” doğru yazılmıştır?', options: ['Evdeki hesap tutmadı.', 'Duydum ki sen gelmişsin.', 'Seninki burada.', 'Baktımki gitmiş.', 'Yarınki sınav zor.'], answer: 'D', wrongWord: 'Baktımki', explanation: 'Bağlaç olan “ki” ayrı yazılır: “Baktım ki gitmiş.”' },
      { id: 'm2', rule: 'Soru eki', text: 'Aşağıdakilerden hangisinde yazım yanlışı vardır?', options: ['Sen de gel.', 'Bunu biliyor musun?', 'Kitap mı aldın?', 'Bugün mü gideceğiz?', 'Geliyormusun?'], answer: 'E', wrongWord: 'Geliyormusun', explanation: 'Soru eki ayrı yazılır: “Geliyor musun?”' }
    ]
  },
  {
    id: 'hard-1', category: 'hard', name: 'Zor Test 1', description: 'Kafa karıştırıcı yazımlar', questions: [
      { id: 'h1', rule: 'Birleşik kelimeler', text: 'Aşağıdakilerden hangisi yanlış yazılmıştır?', options: ['ön söz', 'ara sıra', 'gitgide', 'bir takım insanlar', 'bir takım elbise'], answer: 'D', wrongWord: 'bir takım insanlar', explanation: 'Belirsizlik anlamındaki “birtakım” birleşik yazılır: “birtakım insanlar”. Sayı anlamında “bir takım elbise” ayrı yazılır.' },
      { id: 'h2', rule: 'Yön adları', text: 'Aşağıdakilerden hangisinde yazım yanlışı vardır?', options: ['Türkiye’nin batısı', 'Kuzey Anadolu', 'güneydoğu rüzgârı', 'Doğu Karadeniz', 'Batı medeniyeti'], answer: 'C', wrongWord: 'güneydoğu rüzgârı', explanation: 'Özel ad oluşturmayan yön adları küçük yazılır; ama bölge/yer adı olduğunda büyük yazılabilir. Bu tip sorularda anlam belirleyicidir.' }
    ] }
];
