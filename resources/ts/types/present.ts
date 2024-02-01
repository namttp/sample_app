import type MyOption from './option'
import type InstantWin from './instantWin'
type InstantWinStatus = 'win' | 'lose' | 'inputted'

type Pivot = {
  readonly id: number
  readonly created_at: string
  readonly is_used: boolean
  readonly updated_at: string
  readonly instant_win: InstantWin | null
  readonly instant_win_status: InstantWinStatus | null
  readonly option: MyOption | null
}

type Present = {
  readonly id: number
  readonly name: string
  readonly title: string
  readonly description: string
  readonly start_at: string
  readonly end_at: string
  readonly expiration_at: string
  readonly url: string
  readonly score: number
  readonly pivot?: Pivot
  readonly is_available: boolean
  readonly is_obtainable: boolean
  readonly is_obtained?: boolean
  readonly is_webcas_available: boolean
  readonly main_image_url: string
  readonly sub_image_url: string
  readonly options?: MyOption[]
  readonly coupon_code?: string
  readonly terms?: string
}

export default Present
