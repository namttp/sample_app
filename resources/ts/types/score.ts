import type Ribbon from '@/types/ribbon'
import type Challenge from '@/types/challenge'

type Score = {
  readonly id: number
  readonly user_id: number
  readonly challenge_id: number
  readonly score: number
  readonly diagnosis_id: number | null
  readonly created_at: string
  readonly updated_at: string
  readonly ribbon: Ribbon
  readonly challenge: Challenge
}

export default Score
