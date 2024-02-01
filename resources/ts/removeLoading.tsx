import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { hide as hideAction } from '@/components/loading/slice'

export const remove = () => {
  const loading = document.getElementById('skinDiagnosisLoading')
  if (loading) {
    loading.style.display = 'none'
  }
}

export const show = () => {
  const loading = document.getElementById('skinDiagnosisLoading')
  if (loading) {
    loading.style.display = 'block'
  }
}

export default function removeLoading() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    remove()
    dispatch(hideAction())
  }, [])
  return null
}
