import { useSelector } from 'react-redux'
import { AppState } from '@/store'

export const useDiagnosisState = () =>
  useSelector((state: AppState) => state.diagnosis)

export const useRow = () => useDiagnosisState().row
