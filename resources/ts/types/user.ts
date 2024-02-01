import Challenge from './challenge'
import Present from './present'
import IntensiveCare from './intensiveCare'
import type MyNotification from '@/types/notification'
import Diagnosis from './diagnosis'

type User = {
  readonly id: number
  readonly uid?: string
  readonly name: string
  readonly age: number | null
  readonly birthday: string
  readonly total_score: number
  readonly confirmed_score: number
  readonly challenges: Challenge[]
  readonly current_present: Present
  readonly next_present: Present
  readonly notifications: MyNotification[]
  readonly prev_intensive_care?: IntensiveCare
  readonly current_diagnosis?: Diagnosis
  readonly current_intensive_care?: IntensiveCare
  readonly finish_intensive_care?: IntensiveCare
  readonly diagnosis_count: number
  readonly intensivecare_history_count: number
  readonly is_guest: boolean
}

export default User
