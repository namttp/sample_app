import Answer from './answer'

// 単一選択 複数選択
export type AnswerType = 'single' | 'multiple_limit' | 'multiple_all'
type DisplayType = 'first_only' | 'after_second_time' | 'regulary'

type Hearing = {
  readonly id: number
  readonly question: string
  readonly options: Array<string> | string
  readonly answer_type: AnswerType
  readonly answer_limit?: number
  readonly display_type: DisplayType
  readonly prev_answer?: Answer
  readonly description: string
}

export default Hearing
