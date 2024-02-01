export const INTENSIVE_CARE_TYPE = {
  age_spots: 'シミ',
  wrinkles: 'しわ',
  texture: 'キメ',
  dark_circles_v2: 'くま',
  moisture: 'うるおい',
  oiliness: 'ベタつき',
  radiance: 'くすみ',
  pore: '毛穴',
  smoothness: 'なめらかさ',
  clarity: '透明感',
  resilient: 'ハリ',
  nasolabial: 'ほうれい線',
}

type INTENSIVE_CARE_STATUS = 'during' | 'failed' | 'succeed'

type Article = {
  img: string
  url: string
}

type IntensiveCare = {
  readonly id: number
  readonly intensive_care_type: keyof typeof INTENSIVE_CARE_TYPE
  readonly intensive_care_status: INTENSIVE_CARE_STATUS
  readonly label: string
  readonly target: number
  readonly point: string
  readonly care: string
  readonly start_at: string
  readonly end_at: string
  readonly base_start_at: string
  readonly base_end_at: string
  readonly average_score?: number
  readonly advice: string
  readonly recommend_item: string
  readonly comment: string
  readonly top_msg: string
  readonly is_finished: boolean
  readonly articles: Article[]
}

export default IntensiveCare
