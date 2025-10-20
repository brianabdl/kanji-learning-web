// Kanji Numbers - For Game 1
const kanjiNumbers = [
    {
        kanji: '一',
        reading: 'ichi',
        number: 1,
        meaning: 'one',
        example: '一人 (hitori) = one person'
    },
    {
        kanji: '二',
        reading: 'ni',
        number: 2,
        meaning: 'two',
        example: '二人 (futari) = two people'
    },
    {
        kanji: '三',
        reading: 'san',
        number: 3,
        meaning: 'three',
        example: '三月 (sangatsu) = March'
    },
    {
        kanji: '四',
        reading: 'shi / yon',
        number: 4,
        meaning: 'four',
        example: '四月 (shigatsu) = April'
    },
    {
        kanji: '五',
        reading: 'go',
        number: 5,
        meaning: 'five',
        example: '五月 (gogatsu) = May'
    },
    {
        kanji: '六',
        reading: 'roku',
        number: 6,
        meaning: 'six',
        example: '六月 (rokugatsu) = June'
    },
    {
        kanji: '七',
        reading: 'shichi / nana',
        number: 7,
        meaning: 'seven',
        example: '七月 (shichigatsu) = July'
    },
    {
        kanji: '八',
        reading: 'hachi',
        number: 8,
        meaning: 'eight',
        example: '八月 (hachigatsu) = August'
    },
    {
        kanji: '九',
        reading: 'kyuu / ku',
        number: 9,
        meaning: 'nine',
        example: '九月 (kugatsu) = September'
    },
    {
        kanji: '十',
        reading: 'juu',
        number: 10,
        meaning: 'ten',
        example: '十月 (juugatsu) = October'
    }
];

// Kanji Data - Sample collection of basic kanji characters
const kanjiData = [
    {
        kanji: '日',
        reading: 'nichi, jitsu / hi',
        meaning: 'sun, day',
        example: '日本 (nihon) = Japan'
    },
    {
        kanji: '月',
        reading: 'getsu, gatsu / tsuki',
        meaning: 'moon, month',
        example: '一月 (ichigatsu) = January'
    },
    {
        kanji: '火',
        reading: 'ka / hi',
        meaning: 'fire',
        example: '火曜日 (kayoubi) = Tuesday'
    },
    {
        kanji: '水',
        reading: 'sui / mizu',
        meaning: 'water',
        example: '水曜日 (suiyoubi) = Wednesday'
    },
    {
        kanji: '木',
        reading: 'moku, boku / ki',
        meaning: 'tree, wood',
        example: '木曜日 (mokuyoubi) = Thursday'
    },
    {
        kanji: '金',
        reading: 'kin, kon / kane',
        meaning: 'gold, metal, money',
        example: '金曜日 (kinyoubi) = Friday'
    },
    {
        kanji: '土',
        reading: 'do, to / tsuchi',
        meaning: 'earth, soil',
        example: '土曜日 (doyoubi) = Saturday'
    },
    {
        kanji: '人',
        reading: 'jin, nin / hito',
        meaning: 'person, people',
        example: '日本人 (nihonjin) = Japanese person'
    },
    {
        kanji: '山',
        reading: 'san, zan / yama',
        meaning: 'mountain',
        example: '富士山 (fujisan) = Mt. Fuji'
    },
    {
        kanji: '川',
        reading: 'sen / kawa',
        meaning: 'river',
        example: '川口 (kawaguchi) = river mouth'
    },
    {
        kanji: '田',
        reading: 'den / ta',
        meaning: 'rice field',
        example: '田中 (tanaka) = common surname'
    },
    {
        kanji: '本',
        reading: 'hon / moto',
        meaning: 'book, origin',
        example: '日本 (nihon) = Japan'
    },
    {
        kanji: '学',
        reading: 'gaku / mana(bu)',
        meaning: 'study, learning',
        example: '学生 (gakusei) = student'
    },
    {
        kanji: '校',
        reading: 'kou',
        meaning: 'school',
        example: '学校 (gakkou) = school'
    },
    {
        kanji: '生',
        reading: 'sei, shou / i(kiru)',
        meaning: 'life, birth, raw',
        example: '先生 (sensei) = teacher'
    }
];

// Compound words for word-building game
const compoundWords = [
    {
        word: '日本',
        kanji: ['日', '本'],
        meaning: 'Japan',
        reading: 'nihon'
    },
    {
        word: '学校',
        kanji: ['学', '校'],
        meaning: 'school',
        reading: 'gakkou'
    },
    {
        word: '学生',
        kanji: ['学', '生'],
        meaning: 'student',
        reading: 'gakusei'
    },
    {
        word: '日本人',
        kanji: ['日', '本', '人'],
        meaning: 'Japanese person',
        reading: 'nihonjin'
    },
    {
        word: '水曜日',
        kanji: ['水', '曜', '日'],
        meaning: 'Wednesday',
        reading: 'suiyoubi'
    },
    {
        word: '火山',
        kanji: ['火', '山'],
        meaning: 'volcano',
        reading: 'kazan'
    },
    {
        word: '金田',
        kanji: ['金', '田'],
        meaning: 'Kaneda (surname)',
        reading: 'kaneda'
    },
    {
        word: '山田',
        kanji: ['山', '田'],
        meaning: 'Yamada (surname)',
        reading: 'yamada'
    }
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
