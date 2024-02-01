import type Present from '@/types/present'

type DisplayType = 'banner' | 'popup'

type MyNotification = {
  readonly id: number
  readonly user_id: number
  readonly title: string
  readonly body: string
  readonly present_id: number | null
  readonly present_user_id: number | null
  readonly is_read: boolean
  readonly display_type: DisplayType
  readonly present: Present | null
}

export default MyNotification
