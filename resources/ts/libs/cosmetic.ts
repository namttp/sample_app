// アイテムカテゴリー 日本語化
// アイテム登録画面、ネクストアクション

export const setCategory = (category: string) => {
  switch (category) {
    case 'lotion':
      return '化粧水'
    case 'cream':
      return 'クリーム'
    case 'serum':
      return '美容液'
    case 'pack':
      return 'パック'
    case 'facial_wash':
      return '洗顔料'
    case 'sunblock':
      return '日焼け止め'
    case 'other':
      return 'その他'
    case 'milky_lotion':
      return '乳液'
    case 'make_up_remover':
      return 'メイク落とし'
  }
}
