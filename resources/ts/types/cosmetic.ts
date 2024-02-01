export type Cosmetic = Input & {
  id: number
  user_id: number
  category_label: string
  cosmetic_diagnosis: CosmeticDiagnosis
  _destory?: boolean
}

export type Input = {
  name: string
  brand: string
  category:
    | 'lotion'
    | 'cream'
    | 'serum'
    | 'pack'
    | 'facial_wash'
    | 'sunblock'
    | 'other'
    | 'milky_lotion'
    | 'make_up_remover'
    | ''
}

export type CosmeticDiagnosis = {
  is_new: boolean
}

export type CosmeticForm = {
  editCosmetics: Cosmetic[] | DestroyCosmetic[]
  newCosmetics: Input[]
}

export type DestroyCosmetic = {
  id: number
  user_id: number
  _destory?: boolean
}

export type Errors = {
  name?: {
    type: 'required' | 'maxLength'
    message: string
  }
  brand?: {
    type: 'required' | 'maxLength'
    message: string
  }
  category?: {
    type: 'required' | 'maxLength'
    message: string
  }
}
