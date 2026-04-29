export const relationshipStart = "2025-10-06T19:30:00+05:00";

export const tracks = [
  {
    title: "Behind Blue Eyes",
    artist: "Limp Bizkit",
    src: "./audio/Limp Bizkit - Behind blue eye.mp3",
    startAt: 10,
    highlight: "0:10",
    mood: "opening scene",
  },
  {
    title: "Toxicity",
    artist: "System of a Down",
    src: "./audio/System Of A Down - Toxicity.mp3",
    startAt: 74,
    highlight: "1:14",
    mood: "fast montage",
  },
  {
    title: "Leave Out All the Rest",
    artist: "Linkin Park",
    src: "./audio/Linkin Park - Leave Out All The Rest (Сумерки саундтрек).mp3",
    startAt: 94,
    highlight: "1:34",
    mood: "wrapped stats",
  },
  {
    title: "One More Light",
    artist: "Linkin Park",
    src: "./audio/Linkin_Park_-_One_More_Light_(SkySound.cc).mp3",
    startAt: 54,
    highlight: "0:54",
    mood: "chapters scene",
  },
  {
    title: "Nutshell",
    artist: "Alice in Chains",
    src: "./audio/Alice In Chains - Nutshell.mp3",
    startAt: 66,
    highlight: "1:06",
    mood: "photo wall",
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    src: "./audio/Pink Floyd - Wish You Were Here.mp3",
    startAt: 193,
    highlight: "3:13",
    mood: "letter scene",
  },
  {
    title: "Otherside",
    artist: "Red Hot Chili Peppers",
    src: "./audio/Red Hot Chili Peppers - Other Side (Lp Version).mp3",
    startAt: 130,
    highlight: "2:10",
    mood: "end credits",
  },
];

export const chapters = [
  {
    kicker: { ru: "chapter 01", en: "chapter 01" },
    title: { ru: "6 октября 2025", en: "October 6, 2025" },
    text: {
      ru: "Вечер, с которого все обычное стало немного кинематографичнее. Примерно 19:30, холодный свет, и мы уже начинаем нашу историю.",
      en: "The evening when ordinary things became a little more cinematic. Around 7:30 PM, cold light, and our story quietly begins.",
    },
  },
  {
    kicker: { ru: "chapter 02", en: "chapter 02" },
    title: { ru: "Прогулки до дома", en: "Walks Home" },
    text: {
      ru: "Наш первый вайб: идти вместе, изучать плейлисты, ловить музыку по настроению и растягивать дорогу, потому что рядом слишком хорошо.",
      en: "Our first vibe: walking together, exploring playlists, catching songs by mood, and stretching the road because being near you feels too good.",
    },
  },
  {
    kicker: { ru: "chapter 03", en: "chapter 03" },
    title: { ru: "Случайные кадры", en: "Accidental Frames" },
    text: {
      ru: "Самые живые фотографии обычно появляются без подготовки. В них меньше позирования и больше нас.",
      en: "The most alive photos usually happen without preparation. Less posing, more us.",
    },
  },
  {
    kicker: { ru: "chapter 04", en: "chapter 04" },
    title: { ru: "То, что впереди", en: "Everything Ahead" },
    text: {
      ru: "Новые песни, прогулки, ночные разговоры, поездки и маленькие традиции, которые однажды станут нашими любимыми воспоминаниями.",
      en: "New songs, walks, late-night talks, trips, and little traditions that will one day become our favorite memories.",
    },
  },
];

export const wrappedStats = [
  {
    value: "01",
    label: { ru: "главная девушка года", en: "girl of the year" },
    detail: { ru: "Ангелина, без конкурентов", en: "Angelina, no competition" },
    featured: true,
  },
  {
    value: "∞",
    label: { ru: "твой силуэт в голове", en: "your silhouette in my mind" },
    detail: {
      ru: "твое лицо, голос, улыбка и взгляд",
      en: "your face, voice, smile, and eyes",
    },
  },
  {
    value: "24/7",
    label: { ru: "режим любви", en: "love mode" },
    detail: { ru: "включен ровно и без выходных", en: "always on, no days off" },
  },
  {
    value: "100%",
    label: { ru: "музыка между нами", en: "music between us" },
    detail: {
      ru: "то, что связывает нас, наши эмоции и чувства",
      en: "what connects us, our emotions, and our feelings",
    },
  },
];

export const colorJars = [
  {
    name: { ru: "Ее аура", en: "Her Aura" },
    description: {
      ru: "Красно-фиолетовая, теплая и немного магическая. Как первое чувство, которое сложно нормально объяснить.",
      en: "Red-violet, warm, and a little magical. Like the first feeling that is hard to explain properly.",
    },
    colors: ["#ff315d", "#8b3dff", "#ffd1dc"],
    glow: "rgba(255, 49, 93, 0.38)",
    fireflies: 9,
  },
  {
    name: { ru: "Когда чувствую ее любовь", en: "When I Feel Her Love" },
    description: {
      ru: "Желто-оранжевая, мягкая и греющая. Будто внутри становится светлее просто от того, что она рядом.",
      en: "Yellow-orange, soft, and warming. Like everything inside gets brighter just because she is near.",
    },
    colors: ["#ffd45a", "#ff8a1f", "#fff2b8"],
    glow: "rgba(255, 169, 48, 0.38)",
    fireflies: 10,
  },
  {
    name: { ru: "Когда мы шалим", en: "When We Get Playful" },
    description: {
      ru: "Неоново-розовая, быстрая и смешная. Цвет наших маленьких глупостей, которые потом хочется вспоминать.",
      en: "Neon pink, fast, and funny. The color of our little silly moments that I want to replay later.",
    },
    colors: ["#ff2bd6", "#ff6bb5", "#7b5cff"],
    glow: "rgba(255, 43, 214, 0.34)",
    fireflies: 12,
  },
  {
    name: { ru: "Когда она смотрит на меня", en: "When She Looks at Me" },
    description: {
      ru: "Зеленая и дружелюбная. Такой взгляд, после которого в голове становится тихо и хорошо.",
      en: "Green and kind. The kind of look that makes my mind feel quiet and safe.",
    },
    colors: ["#56f0a8", "#b9ffd8", "#74d8ff"],
    glow: "rgba(86, 240, 168, 0.34)",
    fireflies: 11,
  },
  {
    name: { ru: "Когда она смеется", en: "When She Laughs" },
    description: {
      ru: "Перелив зеленого, желтого и розового. Радость, которая не стоит на месте и заражает все вокруг.",
      en: "A shimmer of green, yellow, and pink. Joy that never stays still and lights up everything around.",
    },
    colors: ["#50f091", "#fff15a", "#ff7bc7"],
    glow: "rgba(255, 241, 90, 0.32)",
    fireflies: 13,
    shimmer: true,
  },
  {
    name: { ru: "Когда рядом спокойно", en: "When It Feels Peaceful" },
    description: {
      ru: "Снежно-голубая с лавандой. Цвет момента, где ничего не нужно доказывать, потому что она уже рядом.",
      en: "Snowy blue with lavender. The color of a moment where nothing needs proving because she is already beside me.",
    },
    colors: ["#dff0ff", "#82b8ff", "#cfc8ff"],
    glow: "rgba(130, 184, 255, 0.34)",
    fireflies: 8,
  },
];

export const photos = [
  {
    src: "./photos/photo_2025-09-29_10-49-13.jpg",
    title: { ru: "Наша первая фотка", en: "Our First Photo" },
    caption: {
      ru: "С нее будто началась отдельная папка в жизни: там, где уже не просто я и ты, а мы.",
      en: "It feels like this started a new folder in life: not just you and me anymore, but us.",
    },
    tone: "sky",
    shape: "portrait",
  },
  {
    src: "./photos/photo_2025-10-23_00-02-24.jpg",
    title: { ru: "Тихая нежность", en: "Quiet Tenderness" },
    caption: {
      ru: "Кадр, в котором все мягко: свет, настроение и то, как рядом с тобой спокойно.",
      en: "A frame where everything feels soft: the light, the mood, and the calm of being near you.",
    },
    tone: "violet",
    shape: "portrait",
  },
  {
    src: "./photos/photo_2025-11-03_22-26-17.jpg",
    title: { ru: "Наш вайб", en: "Our Vibe" },
    caption: {
      ru: "Музыка, прогулки и это редкое ощущение, что рядом можно быть настоящими.",
      en: "Music, walks, and that rare feeling that we can be real together.",
    },
    tone: "blue",
    shape: "portrait",
  },
  {
    src: "./photos/photo_2025-11-06_00-56-17.jpg",
    title: { ru: "Маленький фильм", en: "A Tiny Movie" },
    caption: {
      ru: "Будто стоп-кадр из нашего спокойного кино, которое хочется пересматривать.",
      en: "Like a still from our quiet movie, the kind I want to rewatch.",
    },
    tone: "ice",
    shape: "portrait",
  },
  {
    src: "./photos/photo_2026-01-01_01-16-49.jpg",
    title: { ru: "Новогодний кадр", en: "New Year Frame" },
    caption: {
      ru: "Ночь, новый год и чувство, что впереди у нас еще очень много красивого.",
      en: "Night, New Year, and the feeling that we still have so much beautiful ahead.",
    },
    tone: "violet",
    shape: "wide",
  },
  {
    src: "./photos/1.jpg",
    title: { ru: "Тот самый кадр", en: "That One Frame" },
    caption: {
      ru: "Есть фотографии, которые не нужно объяснять. Смотришь и просто становится тепло.",
      en: "Some photos do not need explaining. You look at them and it just feels warm.",
    },
    tone: "ice",
    shape: "wide",
  },
  {
    src: "./photos/photo_2026-01-12_22-47-51.jpg",
    title: { ru: "Нарисованный сон", en: "A Painted Dream" },
    caption: {
      ru: "Пусть это ИИ-кадр, но в нем есть наше настроение: нежное, странное и немного волшебное.",
      en: "Even if it is an AI frame, it carries our mood: tender, strange, and a little magical.",
    },
    tone: "sky",
    shape: "portrait",
  },
  {
    src: "./photos/photo_2026-02-10_01-10-26.jpg",
    title: { ru: "Любимая улыбка", en: "Favorite Smile" },
    caption: {
      ru: "Твоя улыбка умеет делать день светлее даже тогда, когда он был совсем обычным.",
      en: "Your smile can make a day brighter even when it started completely ordinary.",
    },
    tone: "blue",
    shape: "portrait",
  },
  {
    src: "./photos/photo_2026-04-28_14-19-37.jpg",
    title: { ru: "Светлый момент", en: "Bright Moment" },
    caption: {
      ru: "Один из тех моментов, которые хочется сохранить не только в телефоне, но и внутри.",
      en: "One of those moments I want to keep not only on my phone, but inside me too.",
    },
    tone: "ice",
    shape: "wide",
  },
  {
    src: "./photos/photo_2026-04-28_14-19-56.jpg",
    title: { ru: "Кадр из нас", en: "A Frame of Us" },
    caption: {
      ru: "Фотография, в которой слишком много нежности, чтобы называть ее просто фотографией.",
      en: "A photo with too much tenderness to call it just a photo.",
    },
    tone: "violet",
    shape: "portrait",
  },
  {
    src: "./photos/photo2.jpg",
    title: { ru: "Идем на свидание", en: "On Our Way to a Date" },
    caption: {
      ru: "Этот путь для меня очень важен: не просто куда-то идти, а идти рядом с тобой, к нашему вечеру.",
      en: "This walk means so much to me: not just going somewhere, but going beside you, toward our evening.",
    },
    tone: "sky",
    shape: "portrait",
  },
  {
    src: "./photos/photomusic.jpg",
    title: { ru: "Ты рядом с моей музыкой", en: "You Beside My Music" },
    caption: {
      ru: "Спасибо тебе за то, что поддерживаешь меня, приходишь на выступления и остаешься рядом там, где мне это особенно важно.",
      en: "Thank you for supporting me, coming to my shows, and staying beside me where it matters to me the most.",
    },
    tone: "blue",
    shape: "wide",
  },
];

export const letterParagraphs = {
  ru: [
    "Ангелина, я хотел сделать для тебя не просто открытку, а место, в котором все будет двигаться, звучать и светиться как маленький фильм про нас.",
    "Ты умеешь делать обычные дни мягче. Рядом с тобой даже простые вещи становятся важными: переписки, прогулки, случайные фотографии, песни и те моменты, которые невозможно нормально объяснить другим.",
    "Я люблю тебя. И в твой день рождения хочу, чтобы ты почувствовала: ты не просто любимая. Ты мой самый красивый случай, который стал выбором каждый день.",
  ],
  en: [
    "Angelina, I wanted to make you not just a card, but a place where everything moves, plays, and glows like a tiny movie about us.",
    "You make ordinary days softer. With you, even simple things start to matter: messages, walks, random photos, songs, and moments no one else could fully understand.",
    "I love you. And on your birthday I want you to feel this: you are not just loved. You are my most beautiful accident that became my choice every day.",
  ],
};

export const coupons = {
  ru: [
    "свидание без спешки",
    "любимый трек в машине",
    "объятия без таймера",
    "вечер, где все только для тебя",
  ],
  en: [
    "a date with no rush",
    "our favorite song in the car",
    "hugs without a timer",
    "an evening made only for you",
  ],
};
