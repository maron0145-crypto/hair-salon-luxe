// サイト設定データ
// DB実装時はこのオブジェクトをAPIレスポンスに差し替える

const SITE_DATA = {
  store: {
    address: '東京都〇〇区〇〇1-2-3 〇〇ビル2F',
    phone: '000-0000-0000',
    hoursOpen: '10:00',
    hoursClose: '19:00',
    lastOrder: '18:00',
    holidays: '火曜日・第3月曜日',
  },
  menu: {
    cut: [
      { name: 'カット', price: '5,500' },
      { name: 'カット＋シャンプー', price: '6,600' },
      { name: '前髪カット', price: '1,100' },
    ],
    color: [
      { name: 'リタッチカラー', price: '8,800〜' },
      { name: 'フルカラー', price: '11,000〜' },
      { name: 'ハイライト', price: '15,400〜' },
    ],
    perm: [
      { name: 'コールドパーマ', price: '11,000〜' },
      { name: 'デジタルパーマ', price: '16,500〜' },
      { name: '縮毛矯正', price: '19,800〜' },
    ],
    treatment: [
      { name: 'ベーシック', price: '3,300〜' },
      { name: 'プレミアム', price: '5,500〜' },
      { name: '集中ケア', price: '8,800〜' },
    ],
    headspa: [
      { name: '30分コース', price: '4,400' },
      { name: '60分コース', price: '7,700' },
      { name: '90分コース', price: '11,000' },
    ],
  },
  reservations: [
    { id: 1, name: '佐藤 美咲', menu: 'カット', date: '2026-05-10 14:00', status: 'pending', message: 'よろしくお願いします。' },
    { id: 2, name: '田中 由美', menu: 'フルカラー', date: '2026-05-11 11:00', status: 'confirmed', message: '' },
    { id: 3, name: '鈴木 香織', menu: 'デジタルパーマ', date: '2026-05-12 13:00', status: 'pending', message: 'くせ毛が強めです。' },
    { id: 4, name: '渡辺 明日香', menu: 'ヘッドスパ 60分', date: '2026-05-13 15:00', status: 'confirmed', message: '' },
    { id: 5, name: '伊藤 さくら', menu: 'カット＋シャンプー', date: '2026-05-15 10:00', status: 'pending', message: '短めにしたいです。' },
  ],
};
