// SORU EKLEME YERİ:
// Yeni sabit soru eklemek istersen aşağıdaki DEFAULT_TESTS dizisine aynı yapıda soru ekle.
// answer alanı doğru şıkkın harfi olmalı: A, B, C, D veya E.
// wrongWord alanı test sonunda ezberlenecek kelimeyi gösterir.

window.DEFAULT_TESTS = [
  {
    id: 'new-1',
    category: 'new',
    name: 'Yeni Test 1 - TYT Tarzı Yazım',
    description: 'Fotoğraflardaki deneme tarzına uygun, karışık yazım soruları.',
    questions: [
      {
        id: 'n1-q1', rule: 'Büyük harflerin yazımı',
        text: 'Aşağıdaki cümlelerin hangisinde büyük harflerin yazımıyla ilgili yanlışlık yapılmıştır?',
        options: [
          'Bilge Kağan Anıtı, Türk tarihinin önemli metinlerinden biridir.',
          'Yarın Fırat Nehri kıyısında kısa bir gezi yapacağız.',
          'Çocukluğumda Van Gölü kıyısında uzun yürüyüşler yapardık.',
          'Yazar, romanında Batı medeniyetinin etkilerini sorgular.',
          'Arkadaşım İç Anadolu’nun Batısında yeni yerler görmek istiyor.'
        ],
        answer: 'E', wrongWord: 'Batısında',
        explanation: 'Yön bildiren doğu, batı, kuzey, güney sözleri özel adın parçası değilse küçük yazılır: İç Anadolu’nun batısında.'
      },
      {
        id: 'n1-q2', rule: 'Numaralanmış sözler',
        text: 'Yazar; toplumun vurdumduymaz tavrını, karakterlerin bilinç altını ve ön yargılarını işler. Bu cümlede yazımı yanlış olan söz aşağıdakilerden hangisidir?',
        options: ['vurdumduymaz', 'bilinç altı', 'ön yargı', 'toplumun', 'karakterlerin'],
        answer: 'B', wrongWord: 'bilinç altı',
        explanation: 'Doğru yazım “bilinçaltı”dır.'
      },
      {
        id: 'n1-q3', rule: 'Birleşik kelimeler',
        text: 'Aşağıdaki cümlelerin hangisinde altı çizili sözün yazımında yanlışlık vardır?',
        options: [
          'Bu kararın ardında ciddi bir sağduyu vardı.',
          'Sonunda herkes baş başa konuşma fırsatı buldu.',
          'Deniz kıyısında birkaç saat yürüdük.',
          'Öğretmen, ön söz bölümünü dikkatle okumamızı istedi.',
          'Çocuklar bahçede peşpeşe koşmaya başladı.'
        ],
        answer: 'E', wrongWord: 'peşpeşe',
        explanation: 'İkilemeler ayrı yazılır: peş peşe.'
      },
      {
        id: 'n1-q4', rule: 'Virgülün kullanımı',
        text: 'Aşağıdaki cümlelerin hangisi, virgülün hitap için kullanılan kelimelerden sonra konmasına örnektir?',
        options: [
          'Arkadaşını görür görmez, yanına koştu.',
          'İtidalli olmak erdemdir, insanı güçlü kılar.',
          'Efendiler, yarın yeni bir döneme başlıyoruz.',
          'Bu kitap, bana göre, oldukça etkileyiciydi.',
          'Kalem, defter ve silgi aldım.'
        ],
        answer: 'C', wrongWord: 'Efendiler,',
        explanation: 'Hitap sözlerinden sonra virgül konur: Efendiler, ...'
      },
      {
        id: 'n1-q5', rule: 'Sıfat-fiil ekleriyle kalıplaşan birleşikler',
        text: '-an/-en, -ar/-er, -maz/-mez ve -mış/-miş ekleriyle kalıplaşmış birleşik kelimeler bitişik yazılır. Buna göre hangisinde yazım yanlışı vardır?',
        options: [
          'Bu konuda çokbilmiş tavırları kimse sevmez.',
          'Mahallede herkes onu barışsever biri olarak tanır.',
          'Külyutmaz Recai yine gerçeği hemen anladı.',
          'Toplum, kadir bilmez insanlardan hoşlanmaz.',
          'Dedem vatansever bir insandı.'
        ],
        answer: 'D', wrongWord: 'kadir bilmez',
        explanation: 'Kalıplaşmış birleşik kelime bitişik yazılır: kadirbilmez.'
      },
      {
        id: 'n1-q6', rule: 'Eser adlarının yazımı',
        text: 'Aşağıdakilerin hangisinde eser adı yazımı yanlıştır?',
        options: [
          'Mai ve Siyah',
          'Suç ve Ceza',
          'Leyla İle Mecnun',
          'Vatan yahut Silistre',
          'Turfanda mı, Turfa mı?'
        ],
        answer: 'C', wrongWord: 'Leyla İle Mecnun',
        explanation: 'Eser adlarında “ve, ile, de, ki, mi” gibi bağlaç/ekler küçük yazılır: Leyla ile Mecnun.'
      },
      {
        id: 'n1-q7', rule: 'Yazımı karıştırılan kelimeler',
        text: 'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?',
        options: [
          'Bu olayın olağanüstü bir tarafı yoktu.',
          'Yeni kaydedildiği okulda kısa sürede arkadaş edindi.',
          'Gök bilimciler yeni bir açıklama yaptı.',
          'Öğretmenimiz bu konuyu bilim dalı olarak anlattı.',
          'Bu konuda herhangi bir sorun görünmüyor.'
        ],
        answer: 'C', wrongWord: 'Gök bilimciler',
        explanation: 'Kişi adı olarak “gökbilimci” bitişik yazılır: gökbilimciler.'
      },
      {
        id: 'n1-q8', rule: 'Özel ad + tür adı',
        text: 'Aşağıdakilerin hangisinde yazım yanlışı vardır?',
        options: [
          'Ankara Kalesi',
          'Doğubeyazıt ilçesi',
          'Fırat Nehri',
          'Bilge Kağan Anıtı',
          'Beyazıt kulesi'
        ],
        answer: 'E', wrongWord: 'Beyazıt kulesi',
        explanation: 'Yapı adlarının bütün kelimeleri büyük harfle başlar: Beyazıt Kulesi.'
      }
    ]
  },
  {
    id: 'easy-1', category: 'easy', name: 'Kolay Test 1 - Ezber Başlangıç', description: 'Sık çıkan temel doğru yazımlar.', questions: [
      { id:'e1-q1', rule:'Temel doğru yazım', text:'Aşağıdakilerden hangisi doğru yazılmıştır?', options:['yanlız','herkez','süpriz','yalnız','şarz'], answer:'D', wrongWord:'yalnız', explanation:'Doğru yazım “yalnız”dır.' },
      { id:'e1-q2', rule:'Şey kelimesi', text:'Aşağıdakilerden hangisi doğru yazılmıştır?', options:['birşey','her şey','çokşey','hiçbirşey','herşey'], answer:'B', wrongWord:'her şey', explanation:'“Şey” kelimesi ayrı yazılır: her şey.' },
      { id:'e1-q3', rule:'Birleşik kelime', text:'Aşağıdakilerden hangisi yanlış yazılmıştır?', options:['bugün','birkaç','hiçbir','bir çok','her gün'], answer:'D', wrongWord:'bir çok', explanation:'“Birçok” belirsizlik anlamında bitişik yazılır.' },
      { id:'e1-q4', rule:'Bağlaç olan de/da', text:'Aşağıdakilerin hangisinde de/da yazımı doğrudur?', options:['Sende gel.','Ben de geleceğim.','Kitap ta kaldı.','Ev de geldi.','Bunu dağördüm.'], answer:'B', wrongWord:'Ben de', explanation:'Bağlaç olan de/da ayrı yazılır.' },
      { id:'e1-q5', rule:'Soru eki mi', text:'Aşağıdakilerin hangisinde soru eki doğru yazılmıştır?', options:['Geldinmi?','Okudun mu?','Yapacakmısın?','Senmisin?','Biliyormusun?'], answer:'B', wrongWord:'Okudun mu', explanation:'Soru eki mı/mi/mu/mü ayrı yazılır.' },
      { id:'e1-q6', rule:'İkileme', text:'Aşağıdakilerden hangisi doğru yazılmıştır?', options:['artarda','peşpeşe','yan yana','başbaşa','gözgöze'], answer:'C', wrongWord:'yan yana', explanation:'İkilemeler ayrı yazılır: yan yana, baş başa, göz göze.' },
      { id:'e1-q7', rule:'Kısaltma', text:'Aşağıdakilerden hangisi doğru yazılmıştır?', options:['TDK den','TDK’den','TDKde','TDK nin','TDK’yee'], answer:'B', wrongWord:'TDK’den', explanation:'Büyük harfli kısaltmalara gelen ek kesmeyle ayrılır: TDK’den.' },
      { id:'e1-q8', rule:'Para birimi', text:'Aşağıdakilerden hangisinde yazım yanlışı vardır?', options:['avro','lira','dolar','Sterlin','kuruş'], answer:'D', wrongWord:'Sterlin', explanation:'Para birimleri cümle içinde küçük harfle yazılır: sterlin.' }
    ]
  },
  {
    id: 'medium-1', category: 'medium', name: 'Orta Test 1 - Sık Karıştırılanlar', description: 'TYT’de seçeneklerde tuzak yapılabilecek kelimeler.', questions: [
      { id:'m1-q1', rule:'Ki yazımı', text:'Aşağıdakilerin hangisinde “ki”nin yazımı yanlıştır?', options:['Evdeki hesap tutmadı.','Duydum ki sen gelmişsin.','Seninki burada.','Baktımki gitmiş.','Yarınki sınav zor.'], answer:'D', wrongWord:'Baktımki', explanation:'Bağlaç olan “ki” ayrı yazılır: Baktım ki.' },
      { id:'m1-q2', rule:'Birleşik kelime', text:'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?', options:['Yazarın ön sözü oldukça etkileyiciydi.','Bu konuda öngörmek kolay değildir.','Öğrenci öz güvenini kaybetmedi.','Bu davranış sağduyu gerektirir.','Sonuçları günbegün takip etti.'], answer:'C', wrongWord:'öz güven', explanation:'Güncel yazımda “özgüven” bitişik yazılır.' },
      { id:'m1-q3', rule:'Birleşik kelime', text:'Aşağıdakilerden hangisi yanlış yazılmıştır?', options:['ayaküstü','bilinçaltı','yer altı kaynakları','akşamüstü','yüz üstü bırakmak'], answer:'E', wrongWord:'yüz üstü bırakmak', explanation:'Mecaz/kalıplaşmış kullanımda “yüzüstü bırakmak” bitişik yazılır.' },
      { id:'m1-q4', rule:'Büyük harf', text:'Aşağıdakilerin hangisinde büyük harflerin yazımı doğrudur?', options:['Roma Hipodromu','At meydanı','Alman çeşmesi','Ayasofya camisi','Galata köprüsü'], answer:'A', wrongWord:'Roma Hipodromu', explanation:'Özel yapı adlarında kelimeler büyük harfle başlar. Diğerleri At Meydanı, Alman Çeşmesi, Ayasofya Camisi, Galata Köprüsü olmalıdır.' },
      { id:'m1-q5', rule:'Yardımcı fiille kurulan birleşikler', text:'Aşağıdakilerden hangisi yanlış yazılmıştır?', options:['hissetmek','reddetmek','affetmek','hak etmek','kat etmek'], answer:'E', wrongWord:'kat etmek', explanation:'Ses olayı/kalıplaşma nedeniyle “katetmek” bitişik yazılır.' },
      { id:'m1-q6', rule:'Sayıların yazımı', text:'Aşağıdakilerden hangisinde sayıların yazımı yanlıştır?', options:['on dört gün','iki yüz kişi','3’üncü kat','beşer soru','2’şer elma'], answer:'E', wrongWord:'2’şer', explanation:'Üleştirme sayıları rakamla değil yazıyla yazılır: ikişer.' },
      { id:'m1-q7', rule:'Yazımı karıştırılan kelimeler', text:'Aşağıdakilerden hangisi yanlış yazılmıştır?', options:['uyurgezer','önsezi','sivrisinek','zeytin yağı','tümevarım'], answer:'D', wrongWord:'zeytin yağı', explanation:'Doğru yazım “zeytinyağı”dır.' },
      { id:'m1-q8', rule:'Bağlaçlar', text:'Aşağıdakilerin hangisinde yazım yanlışı vardır?', options:['mademki','hâlbuki','oysaki','tabii ki','demekki'], answer:'E', wrongWord:'demekki', explanation:'“Demek ki” ayrı yazılır.' }
    ]
  },
  {
    id: 'hard-1', category: 'hard', name: 'Zor Test 1 - Deneme Seviyesi', description: 'Fotoğraflardaki gibi uzun seçenekli, dikkat isteyen sorular.', questions: [
      { id:'h1-q1', rule:'Altı çizili sözcük tarzı', text:'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?', options:['Çarşıda hiç albenisi olmayan ürünler vardı.','Köpek balıklarının kıyıya yaklaşması herkesi şaşırttı.','Bugün herkes çalçene arkadaşını dinlemek zorunda kaldı.','Uzun süredir uyurgezer hâlinden şikâyet ediyor.','Babam çapan oğlu çıkmasından korkuyordu.'], answer:'E', wrongWord:'çapan oğlu', explanation:'Kalıplaşmış söz “çapanoğlu” bitişik yazılır.' },
      { id:'h1-q2', rule:'Büyük harf + özel ad', text:'Aşağıdaki cümlelerin hangisinde büyük harflerin yazımıyla ilgili yanlışlık yapılmıştır?', options:['Astrofizikçiler Mars’taki fırtınaları incelemeye başladı.','Güneş sistemindeki gezegenlerin hareketi araştırılıyor.','İç Anadolu’nun batısında yeni rotalar belirlendi.','Hisar’dan Boğaz’ın serin sularını seyrettik.','Telif Hakkı Yayın ve Satış Yönetmeliği güncellendi.'], answer:'B', wrongWord:'Güneş sistemi', explanation:'Terim olarak “Güneş Sistemi” özel ad değerindedir ve büyük harfle yazılır.' },
      { id:'h1-q3', rule:'Yazım yanlışı', text:'Bu parçada numaralanmış sözlerden hangisinin yazımı yanlıştır? I. vurdumduymaz II. karıncaezmez III. bilinçaltı IV. cezbeden V. önyargı', options:['I','II','III','IV','V'], answer:'B', wrongWord:'karıncaezmez', explanation:'Doğru yazım “karıncaincitmez” biçimindedir; “karıncaezmez” yanlış kullanımdır.' },
      { id:'h1-q4', rule:'Tarih, ay, gün', text:'Aşağıdakilerin hangisinde tarih yazımı yanlıştır?', options:['29 Mayıs 1453 Salı günü','Okullar eylülde açılır.','15 Haziran 1782’de','Eve salı döneceğiz.','Toplantı 17 kasım Salı günü yapılacak.'], answer:'E', wrongWord:'17 kasım Salı', explanation:'Belirli tarih bildiren ay ve gün adları büyük yazılır: 17 Kasım Salı.' },
      { id:'h1-q5', rule:'Düzeltme işareti', text:'Aşağıdakilerden hangisinin yazımı yanlıştır?', options:['hâlâ','kâğıt','rüzgâr','hikaye','hükûmet'], answer:'D', wrongWord:'hikaye', explanation:'Doğru yazım “hikâye”dir.' },
      { id:'h1-q6', rule:'Birleşik/ayrı yazım', text:'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?', options:['Bu yıl yüksek lisans başvurusu yapacak.','Soruların çoğunu yüz yüze çözdük.','Çocuklar gün batımını izledi.','Bu olay herkesin bilinç altını etkiledi.','Öğretmen zarf-fiil konusunu anlattı.'], answer:'D', wrongWord:'bilinç altı', explanation:'Doğru yazım “bilinçaltı”dır.' },
      { id:'h1-q7', rule:'Kısaltmalara gelen ek', text:'Aşağıdakilerden hangisinde yazım yanlışı vardır?', options:['TBMM’de','RTÜK’e','BOTAŞ’a','TL’nin','Alm.’yı'], answer:'E', wrongWord:'Alm.’yı', explanation:'Sonunda nokta bulunan kısaltmalara gelen ekler kesmeyle ayrılmaz: Alm.yı.' },
      { id:'h1-q8', rule:'Kalıplaşmış birleşikler', text:'Aşağıdakilerin hangisinde yazım yanlışı vardır?', options:['deniz yolu','demir yolu','kara yolu','hava yolu','baş ucu kitabı'], answer:'E', wrongWord:'baş ucu kitabı', explanation:'Bu kullanımda doğru yazım “başucu kitabı”dır.' }
    ]
  },
  {
    id: 'hard-2', category: 'hard', name: 'Zor Test 2 - Kafa Karıştıran Kelimeler', description: 'PDF’deki karışık kelime listesinden özgün sorular.', questions: [
      { id:'h2-q1', rule:'Ayrı/bitişik', text:'Aşağıdakilerden hangisi yanlış yazılmıştır?', options:['bire bir ölçü','birebir etkili','boşu boşuna','birden bire','bilirkişi'], answer:'D', wrongWord:'birden bire', explanation:'Doğru yazım “birdenbire”dir.' },
      { id:'h2-q2', rule:'Ayrı/bitişik', text:'Aşağıdakilerin hangisinde yazım yanlışı yoktur?', options:['kuru yemiş','karnıbahar','limon tuzu','misafir perver','orta okul'], answer:'C', wrongWord:'limon tuzu', explanation:'“Limon tuzu” ayrı yazılır. Diğerlerinin doğru yazımı: kuruyemiş, karnabahar, misafirperver, ortaokul.' },
      { id:'h2-q3', rule:'Renk adları', text:'Aşağıdakilerden hangisi renk adı olduğu için bitişik yazılır?', options:['nar çiçeği renk','kavun içi renk','toz pembe','fildişi','yağlı boya'], answer:'D', wrongWord:'fildişi', explanation:'Renk adı olarak kalıplaşan “fildişi” bitişik yazılır.' },
      { id:'h2-q4', rule:'Özel ad + tür adı', text:'Aşağıdakilerin hangisinde yazım yanlışı vardır?', options:['Antep fıstığı','Van kedisi','İngiliz anahtarı','Maraş dondurması','Arap Sabunu'], answer:'E', wrongWord:'Arap Sabunu', explanation:'Özel ad + tür adıyla kurulan bu tür kullanımlarda tür adı küçük yazılır: Arap sabunu.' },
      { id:'h2-q5', rule:'Kalıplaşmış kelimeler', text:'Aşağıdakilerden hangisi yanlış yazılmıştır?', options:['gitgide','oldubitti','dedikodu','rastgele','gider ayak'], answer:'E', wrongWord:'gider ayak', explanation:'Doğru yazım “giderayak”tır.' },
      { id:'h2-q6', rule:'Kişi/yer adları', text:'Aşağıdakilerin hangisinde kesme işareti kullanımı yanlıştır?', options:['Ankara’ya','Sinop’ta','Türkçe’ye','Burak’a','Fırat Nehri’ne'], answer:'C', wrongWord:'Türkçe’ye', explanation:'Dil adlarına gelen yapım eki ve sonraki çekim eki kesmeyle ayrılmaz: Türkçeye.' },
      { id:'h2-q7', rule:'Deyimler', text:'Aşağıdakilerden hangisi doğru yazılmıştır?', options:['gözatmak','kulakvermek','çanak tutmak','çamdevirmek','akıntıya kürekçekmek'], answer:'C', wrongWord:'çanak tutmak', explanation:'Deyimler genellikle ayrı yazılır: çanak tutmak.' },
      { id:'h2-q8', rule:'Birleşik kelime', text:'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?', options:['Bu romanın öz yaşam öyküsüyle ilgisi var.','Yazarın öz eleştirisi dikkat çekti.','Bu konuda öngörüsü güçlüdür.','Toplantıda oy birliği sağlandı.','Metnin önsözü çok uzundu.'], answer:'E', wrongWord:'önsözü', explanation:'Kitap bölümü anlamında doğru yazım “ön söz”dür.' }
    ]
  }
];
