/** 月白ねむ · ASMR 创作者个人主页的演示数据 */

export type Work = {
  id: string
  title: string
  subtitle: string
  tags: string[]
  duration: string
  date: string
  plays: string
  mood: string
}

export type NewsItem = {
  id: string
  date: string
  category: '配信' | '音声作品' | '周边' | '通知'
  title: string
  body: string
  pinned?: boolean
}

export type ScheduleItem = {
  id: string
  weekday: string
  date: string
  time: string
  title: string
  platform: 'YouTube' | 'ニコニコ' | '会员限定'
}

export type Tier = {
  name: string
  price: string
  unit: string
  tagline: string
  features: string[]
  featured?: boolean
}

export type Good = {
  id: string
  name: string
  price: string
  tag: string
  tagTone: 'primary' | 'success' | 'warning' | 'info'
  gradient: string
  glyph: string
}

export type SocialLink = {
  key: string
  label: string
  meta: string
  href: string
}

export const PROFILE = {
  nameJa: '月白ねむ',
  nameRomaji: 'Tsukishiro Nemu',
  handle: '@nemu_asmr',
  tagline: '耳元で、そっとおやすみ。',
  intro:
    '个人势 ASMR 创作者。用轻声、耳扫除和雨声，陪你在深夜慢慢睡着。每周三档直播、每月两张音声作品，会员可以听到更长的版本。',
  stats: [
    { label: '频道订阅', value: '12.4万' },
    { label: '音声作品', value: '86' },
    { label: '累计配信', value: '420h' },
    { label: '会员', value: '1,840' },
  ],
  links: [
    {
      key: 'youtube',
      label: 'YouTube',
      meta: '12.4万 订阅',
      href: 'https://www.youtube.com/@nemu_asmr',
    },
    { key: 'x', label: 'X (Twitter)', meta: '日常与预告', href: 'https://x.com/nemu_asmr' },
    { key: 'dlsite', label: 'DLsite', meta: '音声作品', href: 'https://www.dlsite.com/' },
    { key: 'fanbox', label: 'FANBOX', meta: '会员内容', href: 'https://www.fanbox.cc/' },
    { key: 'discord', label: 'Discord', meta: '听众社区', href: 'https://discord.com/' },
  ] satisfies SocialLink[],
  equipment: ['Neumann TLM 103', 'ZOOM F3', 'binaural dummy head', 'Audient iD4'],
}

export const WORKS: Work[] = [
  {
    id: 'w-01',
    title: '深夜の耳かき 〜月あかり〜',
    subtitle: 'Midnight Ear Cleaning',
    tags: ['耳かき', 'ささやき'],
    duration: '32:14',
    date: '2026-10-18',
    plays: '3.2万',
    mood: '🌙',
  },
  {
    id: 'w-02',
    title: '雨音と、眠れない夜',
    subtitle: 'Rainy Night Ambience',
    tags: ['雨音', '睡眠'],
    duration: '58:00',
    date: '2026-10-11',
    plays: '5.1万',
    mood: '🌧️',
  },
  {
    id: 'w-03',
    title: '添い寝ささやき「おかえり」',
    subtitle: 'Welcome Home Whisper',
    tags: ['ささやき', '角色扮演'],
    duration: '24:38',
    date: '2026-10-04',
    plays: '2.8万',
    mood: '🛏️',
  },
  {
    id: 'w-04',
    title: '焚き火と遠い街の灯り',
    subtitle: 'Bonfire & Distant Lights',
    tags: ['环境音', '睡眠'],
    duration: '45:12',
    date: '2026-09-27',
    plays: '1.9万',
    mood: '🔥',
  },
  {
    id: 'w-05',
    title: '耳元で、子守唄',
    subtitle: 'Lullaby by Your Ear',
    tags: ['ささやき', '睡眠'],
    duration: '18:40',
    date: '2026-09-20',
    plays: '4.4万',
    mood: '🎵',
  },
  {
    id: 'w-06',
    title: 'メイド喫茶へようこそ',
    subtitle: 'Welcome to the Maid Café',
    tags: ['角色扮演', 'ささやき'],
    duration: '27:05',
    date: '2026-09-13',
    plays: '3.6万',
    mood: '☕',
  },
  {
    id: 'w-07',
    title: '集中用・ノイズと囁き',
    subtitle: 'Focus Noise & Whispers',
    tags: ['环境音', '耳かき'],
    duration: '60:00',
    date: '2026-09-06',
    plays: '2.2万',
    mood: '🎧',
  },
  {
    id: 'w-08',
    title: '雨の日の耳掃除',
    subtitle: 'Ear Cleaning on a Rainy Day',
    tags: ['耳かき', '雨音'],
    duration: '35:21',
    date: '2026-08-30',
    plays: '2.9万',
    mood: '☔',
  },
]

export const WORK_TAGS = [
  '全部',
  '耳かき',
  'ささやき',
  '睡眠',
  '雨音',
  '角色扮演',
  '环境音',
] as const

export const NEWS: NewsItem[] = [
  {
    id: 'n-01',
    date: '2026-10-20',
    category: '配信',
    title: '10/24（金）22:00 秋の夜長の ASMR 配信',
    body: '新作音声的先行试听 + 深呼吸引导，直播后会在会员区补一段限定内容。',
    pinned: true,
  },
  {
    id: 'n-02',
    date: '2026-10-16',
    category: '音声作品',
    title: '新作「雨音と、眠れない夜」公开',
    body: '全长 58 分钟的雨声 + 耳边轻语，已在 DLsite 与 YouTube 同步上线。',
  },
  {
    id: 'n-03',
    date: '2026-10-10',
    category: '周边',
    title: '秋限定亚克力立牌 预约开始',
    body: '受注生产，10/31 截止；会员可在会员区领取限定壁纸。',
  },
  {
    id: 'n-04',
    date: '2026-10-02',
    category: '通知',
    title: '会员内容更新：耳扫除音声 2 本追加',
    body: '标准会员以上可听；本月还会追加一段 10 分钟的睡前闲聊。',
  },
  {
    id: 'n-05',
    date: '2026-09-25',
    category: '配信',
    title: '每周三「深夜のおしゃべり」固定档',
    body: '23:00 开播，聊近况、读听众来信，偶尔现场录一点环境音。',
  },
]

export const SCHEDULE: ScheduleItem[] = [
  {
    id: 's-01',
    weekday: '周四',
    date: '10/23',
    time: '22:00',
    title: '深夜のささやき配信',
    platform: 'YouTube',
  },
  {
    id: 's-02',
    weekday: '周五',
    date: '10/24',
    time: '23:30',
    title: '秋の夜長の ASMR 配信',
    platform: 'YouTube',
  },
  {
    id: 's-03',
    weekday: '周日',
    date: '10/26',
    time: '20:00',
    title: '会员限定・近況報告',
    platform: '会员限定',
  },
  {
    id: 's-04',
    weekday: '周二',
    date: '10/28',
    time: '22:30',
    title: '耳かき雑談配信',
    platform: 'ニコニコ',
  },
  {
    id: 's-05',
    weekday: '周四',
    date: '10/30',
    time: '23:00',
    title: 'ハロウィン特別配信',
    platform: 'YouTube',
  },
]

export const TIERS: Tier[] = [
  {
    name: '無料',
    price: '¥0',
    unit: '/ 月',
    tagline: '公开内容 + 部分试听',
    features: ['公开配信与录像', '每张作品 3 分钟试听', '最新情报与日程'],
  },
  {
    name: 'すたんだーど',
    price: '¥490',
    unit: '/ 月',
    tagline: '想听完整版的话',
    features: ['全部作品完整版', '每月会员限定音声 2 本', '直播回放与优先提问', '会员限定壁纸'],
    featured: true,
  },
  {
    name: 'プレミアム',
    price: '¥1,200',
    unit: '/ 月',
    tagline: '想被单独念名字的话',
    features: [
      '标准会员全部权益',
      '每月一次定制音声请求',
      '会员限定直播（月 1 回）',
      '片尾署名感谢',
    ],
  },
]

export const GOODS: Good[] = [
  {
    id: 'g-01',
    name: '亚克力立牌 〜月あかり〜',
    price: '¥2,200',
    tag: '预约',
    tagTone: 'primary',
    gradient: 'from-blush to-primary',
    glyph: '🌙',
  },
  {
    id: 'g-02',
    name: '音声下载卡（3 作品）',
    price: '¥1,500',
    tag: '现货',
    tagTone: 'success',
    gradient: 'from-primary to-primary-2',
    glyph: '💿',
  },
  {
    id: 'g-03',
    name: '徽章 3 枚组',
    price: '¥1,200',
    tag: '现货',
    tagTone: 'info',
    gradient: 'from-info to-primary',
    glyph: '🎀',
  },
  {
    id: 'g-04',
    name: '抱枕套 〜おやすみ〜',
    price: '¥8,800',
    tag: '受注',
    tagTone: 'warning',
    gradient: 'from-blush-2 to-blush',
    glyph: '🛏️',
  },
]
