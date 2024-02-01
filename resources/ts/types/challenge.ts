type ChallengeType = 'total_login_every_5_times' | 'weekly_diagnosis' | 'ribbon'

type Challenge = {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly challenge_type: ChallengeType
  readonly goal: number
  readonly current: number
  readonly score: number
}

export default Challenge
