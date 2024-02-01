type Pivot = {
  created_at: string
  updated_at: string
}

type Progress = {
  current: number
  goal: number
}

type Ribbon = {
  readonly id: number
  readonly name: string
  readonly short: string
  readonly hint: string
  readonly href: '/about' | '/reward' | '/history'
  readonly description: string
  readonly image: string
  readonly is_secret: boolean
  readonly pivot?: Pivot
  readonly progress?: Progress
  readonly is_get: boolean
  readonly parent_ribbon_id: number | null
}

export default Ribbon
