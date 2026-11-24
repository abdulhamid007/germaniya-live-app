const streetScenes = [
  {
    id: 'interview-berlin',
    category: 'interview',
    badge: 'YouTube Ko\'cha Intervyusi',
    duration: '04:15',
    location: 'Berlin • Alexanderplatz',
    host: 'Jan (Easy German uslubi)',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Easy+German+Street+Interviews+Berlin+B1',
    title: 'Was machst du am liebsten am Wochenende?',
    titleUz: 'Dam olish kunlari eng ko\'p nima qilishni yoqtirasan?',
    dialog: [
      {
        speaker: 'Jan (Boshlovchi)',
        role: 'host',
        de: 'Hallo! Darf ich dir kurz eine Frage für unseren YouTube-Kanal stellen?',
        uz: 'Salom! YouTube kanalimiz uchun senga qisqacha bir savol bersam maylimi?'
      },
      {
        speaker: 'Mia (Talaba)',
        role: 'guest',
        de: 'Klar, gerne! Worum geht es denn?',
        uz: 'Albatta, bajonidil! Gap nima haqida ketmoqda?'
      },
      {
        speaker: 'Jan (Boshlovchi)',
        role: 'host',
        de: 'Was machst du am liebsten am Wochenende hier in Berlin?',
        uz: 'Dam olish kunlari bu yerda, Berlinda eng ko\'p nima qilishni yoqtirasan?'
      },
      {
        speaker: 'Mia (Talaba)',
        role: 'guest',
        de: 'Ehrlich gesagt, schlafe ich erst mal lange aus. Danach treffe ich mich mit Freunden im Park oder wir holen uns einen Döner.',
        uz: 'To\'g\'risini aytsam, avval to\'yib uxlayman. Keyin do\'stlarim bilan parkda uchrashaman yoki birga doner olamiz.'
      }
    ],
    challengePromptDe: 'Und was machst du am Wochenende am liebsten?',
    challengePromptUz: 'Sizga mikrofon uzatildi! Dam olish kuni nima qilishingizni nemischa ayting:',
    sampleAnswerDe: 'Am Wochenende treffe ich meine Freunde und lerne ein bisschen Deutsch.',
    sampleAnswerUz: 'Dam olish kuni do\'stlarim bilan uchrashaman va biroz nemis tilini o\'rganaman.'
  },
  {
    id: 'shop-rewe',
    category: 'shop',
    badge: 'Do\'konda & Kassada',
    duration: '02:40',
    location: 'REWE Supermarkt • München',
    host: 'Kassir & Xaridor',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Deutsch+im+Supermarkt+an+der+Kasse+Dialog',
    title: 'Im Supermarkt & an der Kasse bezahlen',
    titleUz: 'Supermarketda mahsulot qidirish va kassada to\'lash',
    dialog: [
      {
        speaker: 'Xaridor',
        role: 'guest',
        de: 'Entschuldigung, wo finde ich denn die Hafermilch?',
        uz: 'Kechirasiz, suli sutini (Hafermilch) qayerdan topsam bo\'ladi?'
      },
      {
        speaker: 'Sotuvchi',
        role: 'host',
        de: 'Die steht gleich da vorne links, im dritten Gang neben dem Kaffee.',
        uz: 'U shundoq oldinda chap tomonda, uchinchi qatorda qahvaning yonida turibdi.'
      },
      {
        speaker: 'Kassir',
        role: 'host',
        de: 'Hallo! Haben Sie eine Payback-Karte? Das macht zusammen 14 Euro 80.',
        uz: 'Salom! Payback kartangiz bormi? Hammasi bo\'lib 14 yevro 80 sent bo\'ldi.'
      },
      {
        speaker: 'Xaridor',
        role: 'guest',
        de: 'Nein, danke. Ich zahle mit Karte, bitte. Den Kassenbon brauche ich nicht.',
        uz: 'Yo\'q, rahmat. Karta orqali to\'layman. Chek menga kerak emas.'
      }
    ],
    challengePromptDe: 'Wie möchten Sie bezahlen? Bar oder mit Karte?',
    challengePromptUz: 'Kassir sizdan so\'ramoqda: Naqd to\'laysizmi yoki karta bilan?',
    sampleAnswerDe: 'Mit Karte, bitte. Und ich brauche noch eine Tüte.',
    sampleAnswerUz: 'Karta bilan, iltimos. Va menga yana bitta paket kerak.'
  },
  {
    id: 'baeckerei-cafe',
    category: 'cafe',
    badge: 'Novvoyxona & Kafe',
    duration: '03:10',
    location: 'Bäckerei • Hamburg',
    host: 'Sotuvchi & Mehmon',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=In+der+Baeckerei+bestellen+Deutsch+Dialog',
    title: 'Frühstück bestellen: Zum Hieressen oder Mitnehmen?',
    titleUz: 'Nonushta buyurtma qilish: Shu yerdami yoki olib ketishga?',
    dialog: [
      {
        speaker: 'Sotuvchi',
        role: 'host',
        de: 'Guten Morgen! Was darf es für Sie sein?',
        uz: 'Xayrli tong! Sizga nima beray?'
      },
      {
        speaker: 'Mehmon',
        role: 'guest',
        de: 'Ich hätte gern zwei Brötchen mit Käse und einen Cappuccino, bitte.',
        uz: 'Menga pishloqli ikkita bulochka va bitta kapuchino bering, iltimos.'
      },
      {
        speaker: 'Sotuvchi',
        role: 'host',
        de: 'Zum Hieressen oder zum Mitnehmen?',
        uz: 'Shu yerda yeysizmi yoki olib ketasizmi?'
      },
      {
        speaker: 'Mehmon',
        role: 'guest',
        de: 'Zum Mitnehmen, bitte. Machen Sie 7 Euro daraus, stimmt so!',
        uz: 'Olib ketishga, iltimos. 7 yevro qilib olavering, qaytimi kerak emas!'
      }
    ],
    challengePromptDe: 'Zum Hieressen oder zum Mitnehmen?',
    challengePromptUz: 'Sotuvchi so\'radi: Shu yerdami yoki olib ketasizmi? Javob bering:',
    sampleAnswerDe: 'Zum Mitnehmen, bitte. Ich habe es etwas eilig.',
    sampleAnswerUz: 'Olib ketishga, iltimos. Biroz shoshilib turibman.'
  },
  {
    id: 'street-directions',
    category: 'street',
    badge: 'Ko\'chada Yo\'l So\'rash',
    duration: '02:55',
    location: 'Hauptbahnhof • Frankfurt',
    host: 'Yo\'lovchi & Sayyoh',
    youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Nach+dem+Weg+fragen+Deutsch+Strasse',
    title: 'Entschuldigung, wie komme ich zum Bahnhof?',
    titleUz: 'Kechirasiz, vokzalga qanday borsam bo\'ladi?',
    dialog: [
      {
        speaker: 'Siz',
        role: 'guest',
        de: 'Entschuldigung, können Sie mir kurz helfen? Ich suche die nächste U-Bahn-Station.',
        uz: 'Kechirasiz, menga qisqacha yordam bera olasizmi? Eng yaqin metro bekatini qidiryapman.'
      },
      {
        speaker: 'Yo\'lovchi',
        role: 'host',
        de: 'Kein Problem! Gehen Sie hier einfach geradeaus bis zur Ampel und dann rechts.',
        uz: 'Muammo yo\'q! Bu yerdan svetoforgacha to\'g\'riga yuring, keyin o\'ngga buriling.'
      },
      {
        speaker: 'Siz',
        role: 'guest',
        de: 'Ist das weit zu Fuß?',
        uz: 'Piyoda uzoqmi?'
      },
      {
        speaker: 'Yo\'lovchi',
        role: 'host',
        de: 'Nein, höchstens drei Minuten. Sie sehen das blaue U-Schild sofort.',
        uz: 'Yo\'q, ko\'pi bilan uch daqiqa. Ko\'k rangli U belgisini darhol ko\'rasiz.'
      }
    ],
    challengePromptDe: 'Wohin möchten Sie genau gehen?',
    challengePromptUz: 'Yo\'lovchi so\'radi: Aynan qayerga bormoqchisiz? Nemischa tushuntiring:',
    sampleAnswerDe: 'Ich muss zum Hauptbahnhof, mein Zug fährt in zehn Minuten.',
    sampleAnswerUz: 'Men markaziy vokzalga borishim kerak, poyezdim o\'n daqiqada jo\'naydi.'
  }
];

const newsItems = [
  {
    id: 'news-1',
    tag: 'Transport & Jamiyat',
    time: 'Bugun • Berlin',
    headlineDe: 'Deutschlandticket bleibt für Pendler besonders beliebt',
    headlineUz: 'Deutschlandticket yo\'lovchilar orasida eng ommabop chipta bo\'lib qolmoqda',
    bodyDe: 'Immer mehr Menschen in Deutschland nutzen das Deutschlandticket für den Weg zur Arbeit. Besonders in Großstädten wie Berlin und Hamburg steigen viele Bürger vom Auto auf die Bahn um.',
    bodyUz: 'Germaniyada tobora ko\'proq odamlar ishga borish uchun Deutschlandticket chiptasidan foydalanmoqda. Ayniqsa Berlin va Gamburg kabi yirik shaharlarda ko\'plab fuqarolar mashinadan poyezdga o\'tmoqda.',
    vocab: [
      { word: 'der Pendler', meaning: 'ishga qatnovchi yo\'lovchi' },
      { word: 'umsteigen', meaning: 'boshqa transportga o\'tmoq' },
      { word: 'der Bürger', meaning: 'fuqaro' }
    ]
  },
  {
    id: 'news-2',
    tag: 'Ish & Iqtisodiyot',
    time: 'Kecha • München',
    headlineDe: 'Fachkräftemangel: Deutsche Firmen suchen dringend Azubis',
    headlineUz: 'Mutaxassislar yetishmovchiligi: Nemis kompaniyalari zudlik bilan Azubi qidirmoqda',
    bodyDe: 'Viele Handwerksbetriebe und IT-Firmen bieten jetzt bessere Gehälter und Sprachkurse an, um junge Talente aus dem Ausland für eine Ausbildung zu gewinnen.',
    bodyUz: 'Ko\'plab hunarmandchilik korxonalari va IT-kompaniyalar xorijlik yosh iste\'dodlarni kasb-hunar ta\'limiga (Ausbildung) jalb qilish uchun yaxshiroq maosh va til kurslarini taklif qilmoqda.',
    vocab: [
      { word: 'der Fachkräftemangel', meaning: 'malakali kadrlar yetishmovchiligi' },
      { word: 'das Gehalt', meaning: 'maosh' },
      { word: 'gewinnen', meaning: 'jalb qilmoq / yutmoq' }
    ]
  },
  {
    id: 'news-3',
    tag: 'Kundalik Hayot',
    time: '2 kun oldin • Köln',
    headlineDe: 'Immer mehr Supermärkte testen kassenlose Filialen',
    headlineUz: 'Tobora ko\'proq supermarketlar kassirsiz filiallarni sinovdan o\'tkazmoqda',
    bodyDe: 'Kunden scannen ihre Produkte einfach per Smartphone-App und verlassen den Laden ohne Warteschlange. Viele Berufstätige finden das im Alltag sehr praktisch.',
    bodyUz: 'Mijozlar o\'z mahsulotlarini shunchaki smartfon ilovasi orqali skanerlaydi va navbatsiz do\'kondan chiqib ketadi. Ko\'plab ishlaydigan odamlar buni kundalik hayotda juda qulay deb bilishadi.',
    vocab: [
      { word: 'die Warteschlange', meaning: 'navbat' },
      { word: 'der Berufstätige', meaning: 'ishlaydigan odam' },
      { word: 'praktisch', meaning: 'qulay, amaliy' }
    ]
  }
];

const dailyPhrases = [
  {
    id: 'p1',
    category: 'Ko\'cha & Do\'stlar',
    de: 'Auf jeden Fall!',
    uz: 'Albatta! / So\'zsiz!',
    exampleDe: 'Kommst du heute Abend mit? – Auf jeden Fall!',
    exampleUz: 'Bugun kechqurun birga borasanmi? – Albatta!'
  },
  {
    id: 'p2',
    category: 'Do\'konda & Kassada',
    de: 'Stimmt so!',
    uz: 'Qaytimi kerak emas! (O\'zingizga qolsin)',
    exampleDe: 'Das macht 9,50 Euro. – Hier sind 10, stimmt so!',
    exampleUz: '9,50 yevro bo\'ldi. – Mana 10, qaytimi kerak emas!'
  },
  {
    id: 'p3',
    category: 'Kundalik Slang',
    de: 'Ich habe keinen Bock darauf.',
    uz: 'Bunga umuman xohishim / kayfiyatim yo\'q.',
    exampleDe: 'Bei diesem Regen habe ich keinen Bock rauszugehen.',
    exampleUz: 'Bunday yomg\'irda tashqariga chiqishga umuman xohishim yo\'q.'
  },
  {
    id: 'p4',
    category: 'Do\'konda & Kassada',
    de: 'Ich schaue mich nur kurz um.',
    uz: 'Shunchaki bir ko\'z yugurtirib chiqyapman.',
    exampleDe: 'Kann ich Ihnen helfen? – Danke, ich schaue mich nur kurz um.',
    exampleUz: 'Sizga yordam bera olamanmi? – Rahmat, shunchaki ko\'rib chiqyapman.'
  },
  {
    id: 'p5',
    category: 'Ko\'cha & Do\'stlar',
    de: 'Kein Ding! / Alles gut!',
    uz: 'Hechqisi yo\'q! / Hammasi joyida!',
    exampleDe: 'Sorry für die Verspätung! – Kein Ding, ich bin auch gerade erst gekommen.',
    exampleUz: 'Kechikkanim uchun uzr! – Hechqisi yo\'q, men ham hozirgina keldim.'
  },
  {
    id: 'p6',
    category: 'Kafeda',
    de: 'Getrennt oder zusammen?',
    uz: 'Alohida to\'laysizlarmi yoki birgami?',
    exampleDe: 'Wir möchten gerne zahlen. – Getrennt oder zusammen?',
    exampleUz: 'To\'lamoqchi edik. – Alohidami yoki birgami?'
  }
];

module.exports = {
  streetScenes,
  newsItems,
  dailyPhrases
};
