import Present from './present'

type InstantWin = {
  readonly id: number
  readonly status: string
  readonly present_user_id: number
  readonly present: Present
  readonly created_at: string
}

export default InstantWin
