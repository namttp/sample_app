import Answer from './answer'
import { Cosmetic } from './cosmetic'
import IntensiveCare from './intensiveCare'

export type Comparison = {
  title: string
  image: string
  score: number | null
  average: number | null
  short_review: string
  comment: string
}

type AverageScores = {
  age_spots_score: number
  clarity_score: number
  dark_circles_v2_score: number
  moisture_score: number
  nasolabial_score: number
  oiliness_score: number
  pore_score: number
  radiance_score: number
  resilient_score: number
  smoothness_score: number
  texture_score: number
  wrinkles_score: number
}

type DiagnosisComment = {
  age_spots_score: string
  clarity_score: string
  dark_circles_v2_score: string
  moisture_score: string
  nasolabial_score: string
  oiliness_score: string
  pore_score: string
  radiance_score: string
  resilient_score: string
  smoothness_score: string
  texture_score: string
  wrinkles_score: string
}

export type Review = {
  image: string
  short_review: string
}

type DiagnosisReview = {
  age_spots_score: Review
  clarity_score: Review
  dark_circles_v2_score: Review
  moisture_score: Review
  nasolabial_score: Review
  oiliness_score: Review
  pore_score: Review
  radiance_score: Review
  resilient_score: Review
  smoothness_score: Review
  texture_score: Review
  wrinkles_score: Review
}

type Diagnosis = {
  readonly id: number
  readonly age: number
  readonly skin_age: number
  readonly age_spots_score: number
  readonly comparisons: Comparison[]
  readonly total_score: number
  readonly wrinkles_score: number
  readonly texture_score: number
  readonly dark_circles_v2_score: number
  readonly moisture_score: number
  readonly oiliness_score: number
  readonly radiance_score: number
  readonly pore_score: number
  readonly smoothness_score: number
  readonly clarity_score: number
  readonly resilient_score: number
  readonly nasolabial_score: number
  readonly created_at: string
  readonly average_scores: AverageScores
  readonly is_last: boolean
}

export default Diagnosis
