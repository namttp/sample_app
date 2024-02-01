import _ from 'lodash'
export const convertNestedAttributesFormData = (
  props: {
    [key: string]: any
  },
  namespace: string
): FormData => {
  const formData = new FormData()
  Object.keys(props).map((key: keyof typeof props) => {
    // 配列データの場合
    if (Array.isArray(props[key])) {
      props[key].map((key2: string, index: number) => {
        formData.set(
          `${namespace}[${key}][${index}][${key2}]`,
          props[key][index][key2]
        )
      })
    } else {
      formData.set(`${namespace}[${key}]`, props[key] || '')
    }
  })
  return formData
}

export const convertFileListToFile = (
  props: {
    [key: string]: any
  },
  attributes: string[]
) => {
  const ret = _.cloneDeep(props)
  Object.keys(props).map((key: keyof typeof props) => {
    if (attributes.includes(key as string)) {
      if (props[key] && props[key][0] && typeof props[key][0] === 'object') {
        ret[key] = props[key][0]
      } else {
        delete ret[key]
      }
    }
  })
  return ret
}
