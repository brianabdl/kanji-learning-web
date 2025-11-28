// Kanji Numbers - For Game 1
const kanjiNumbers = [
    {
        kanji: '一',
        reading: 'ichi',
        number: 1,
        meaning: 'satu',
        example: '一人 (hitori) = satu orang'
    },
    {
        kanji: '二',
        reading: 'ni',
        number: 2,
        meaning: 'dua',
        example: '二人 (futari) = dua orang'
    },
    {
        kanji: '三',
        reading: 'san',
        number: 3,
        meaning: 'tiga',
        example: '三月 (sangatsu) = Maret'
    },
    {
        kanji: '四',
        reading: 'shi / yon',
        number: 4,
        meaning: 'empat',
        example: '四月 (shigatsu) = April'
    },
    {
        kanji: '五',
        reading: 'go',
        number: 5,
        meaning: 'lima',
        example: '五月 (gogatsu) = Mei'
    },
    {
        kanji: '六',
        reading: 'roku',
        number: 6,
        meaning: 'enam',
        example: '六月 (rokugatsu) = Juni'
    },
    {
        kanji: '七',
        reading: 'shichi / nana',
        number: 7,
        meaning: 'tujuh',
        example: '七月 (shichigatsu) = Juli'
    },
    {
        kanji: '八',
        reading: 'hachi',
        number: 8,
        meaning: 'delapan',
        example: '八月 (hachigatsu) = Agustus'
    },
    {
        kanji: '九',
        reading: 'kyuu / ku',
        number: 9,
        meaning: 'sembilan',
        example: '九月 (kugatsu) = September'
    },
    {
        kanji: '十',
        reading: 'juu',
        number: 10,
        meaning: 'sepuluh',
        example: '十月 (juugatsu) = Oktober'
    }
];

// Kanji Data - Sample collection of basic kanji characters
const kanjiData = [
    {
        kanji: '日',
        imagePath: 'images/sun.jpg',
        reading: 'nichi, jitsu / hi',
        meaning: 'matahari, hari',
        example: '日本 (nihon) = Jepang'
    },
    {
        kanji: '月',
        imagePath: 'images/moon.jpg',
        reading: 'getsu, gatsu / tsuki',
        meaning: 'bulan, bulan (waktu)',
        example: '一月 (ichigatsu) = Januari'
    },
    {
        kanji: '火',
        imagePath: 'images/fire.jpg',
        reading: 'ka / hi',
        meaning: 'api',
        example: '火曜日 (kayoubi) = Selasa'
    },
    {
        kanji: '水',
        imagePath: 'images/water.jpg',
        reading: 'sui / mizu',
        meaning: 'air',
        example: '水曜日 (suiyoubi) = Rabu'
    },
    {
        kanji: '木',
        imagePath: 'images/tree.jpg',
        reading: 'moku, boku / ki',
        meaning: 'pohon, kayu',
        example: '木曜日 (mokuyoubi) = Kamis'
    },
    {
        kanji: '金',
        imagePath: 'images/gold.jpg',
        reading: 'kin, kon / kane',
        meaning: 'emas, logam, uang',
        example: '金曜日 (kinyoubi) = Jumat'
    },
    {
        kanji: '土',
        imagePath: 'images/soil.jpg',
        reading: 'do, to / tsuchi',
        meaning: 'tanah, tanah liat',
        example: '土曜日 (doyoubi) = Sabtu'
    },
    {
        kanji: '人',
        imagePath: 'images/person.jpg',
        reading: 'jin, nin / hito',
        meaning: 'orang, manusia',
        example: '日本人 (nihonjin) = orang Jepang'
    },
    {
        kanji: '山',
        imagePath: 'images/mountain.jpg',
        reading: 'san, zan / yama',
        meaning: 'gunung',
        example: '富士山 (fujisan) = Gunung Fuji'
    },
    {
        kanji: '川',
        imagePath: 'images/river.jpg',
        reading: 'sen / kawa',
        meaning: 'sungai',
        example: '川口 (kawaguchi) = muara sungai'
    },
    {
        kanji: '田',
        imagePath: 'images/field.jpg',
        reading: 'den / ta',
        meaning: 'sawah',
        example: '田中 (tanaka) = nama keluarga umum'
    },
    {
        kanji: '本',
        imagePath: 'images/book.jpg',
        reading: 'hon / moto',
        meaning: 'buku, asal',
        example: '日本 (nihon) = Jepang'
    },
    {
        kanji: '学',
        imagePath: 'images/study.jpg',
        reading: 'gaku / mana(bu)',
        meaning: 'belajar, pembelajaran',
        example: '学生 (gakusei) = pelajar'
    },
    {
        kanji: '校',
        imagePath: 'images/school.jpg',
        reading: 'kou',
        meaning: 'sekolah',
        example: '学校 (gakkou) = sekolah'
    },
    {
        kanji: '生',
        imagePath: 'images/life.jpg',
        reading: 'sei, shou / i(kiru)',
        meaning: 'kehidupan, kelahiran, mentah',
        example: '先生 (sensei) = guru'
    }
];

// Compound words for word-building game
const compoundWords = [
    {
        word: '日本',
        kanji: ['日', '本'],
        meaning: 'Jepang',
        reading: 'nihon'
    },
    {
        word: '学校',
        kanji: ['学', '校'],
        meaning: 'sekolah',
        reading: 'gakkou'
    },
    {
        word: '学生',
        kanji: ['学', '生'],
        meaning: 'pelajar',
        reading: 'gakusei'
    },
    {
        word: '日本人',
        kanji: ['日', '本', '人'],
        meaning: 'orang Jepang',
        reading: 'nihonjin'
    },
    {
        word: '水曜日',
        kanji: ['水', '曜', '日'],
        meaning: 'Rabu',
        reading: 'suiyoubi'
    },
    {
        word: '火山',
        kanji: ['火', '山'],
        meaning: 'gunung berapi',
        reading: 'kazan'
    },
    {
        word: '金田',
        kanji: ['金', '田'],
        meaning: 'Kaneda (nama keluarga)',
        reading: 'kaneda'
    },
    {
        word: '山田',
        kanji: ['山', '田'],
        meaning: 'Yamada (nama keluarga)',
        reading: 'yamada'
    }
];

// Hiragana Word Bank - For Game 4
const hiraganaWordBank = [
    {
        hiragana: 'はな',
        meaning: 'bunga',
        romaji: 'hana',
        kanjiOptions: ['花', '鼻', '話'],
        correctKanji: '花'
    },
    {
        hiragana: 'ねこ',
        meaning: 'kucing',
        romaji: 'neko',
        kanjiOptions: ['猫', '根', '寝'],
        correctKanji: '猫'
    },
    {
        hiragana: 'いぬ',
        meaning: 'anjing',
        romaji: 'inu',
        kanjiOptions: ['犬', '大', '太'],
        correctKanji: '犬'
    },
    {
        hiragana: 'そら',
        meaning: 'langit',
        romaji: 'sora',
        kanjiOptions: ['空', '宗', '倉'],
        correctKanji: '空'
    },
    {
        hiragana: 'やま',
        meaning: 'gunung',
        romaji: 'yama',
        kanjiOptions: ['山', '矢', '休'],
        correctKanji: '山'
    },
    {
        hiragana: 'うみ',
        meaning: 'laut',
        romaji: 'umi',
        kanjiOptions: ['海', '産', '膿'],
        correctKanji: '海'
    },
    {
        hiragana: 'かわ',
        meaning: 'sungai',
        romaji: 'kawa',
        kanjiOptions: ['川', '河', '皮'],
        correctKanji: '川'
    },
    {
        hiragana: 'ほん',
        meaning: 'buku',
        romaji: 'hon',
        kanjiOptions: ['本', '木', '体'],
        correctKanji: '本'
    },
    {
        hiragana: 'すし',
        meaning: 'sushi',
        romaji: 'sushi',
        kanjiOptions: ['寿司', '酢', '司'],
        correctKanji: '寿司'
    },
    {
        hiragana: 'あめ',
        meaning: 'hujan',
        romaji: 'ame',
        kanjiOptions: ['雨', '飴', '天'],
        correctKanji: '雨'
    },
    {
        hiragana: 'ひ',
        meaning: 'api',
        romaji: 'hi',
        kanjiOptions: ['火', '日', '氷'],
        correctKanji: '火'
    },
    {
        hiragana: 'みず',
        meaning: 'air',
        romaji: 'mizu',
        kanjiOptions: ['水', '氷', '泳'],
        correctKanji: '水'
    },
    {
        hiragana: 'き',
        meaning: 'pohon',
        romaji: 'ki',
        kanjiOptions: ['木', '気', '来'],
        correctKanji: '木'
    },
    {
        hiragana: 'ひと',
        meaning: 'orang',
        romaji: 'hito',
        kanjiOptions: ['人', '入', '火'],
        correctKanji: '人'
    },
    {
        hiragana: 'くち',
        meaning: 'mulut',
        romaji: 'kuchi',
        kanjiOptions: ['口', '日', '田'],
        correctKanji: '口'
    }
];

// All hiragana characters for grid generation
const allHiragana = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん'
];

// Utility function to get random elements from array
function getRandomElements(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Utility function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Utility function to get username
function getUsername() {
    return localStorage.getItem('kanjiUsername') || 'Student';
}
