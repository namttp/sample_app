import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResult } from './asyncActions'
import intensiveCareSlice from './slice'
import { AppDispatch, AppState } from '@/store'
import { useJwtReady } from '@/store/user/selectors'

export const useGetResult = (
  id: string | number | undefined,
  isReady: boolean
) => {
  const { result, isResultLoaded } = useSelector(
    (state: AppState) => state.intensiveCare
  )
  const jwtReady = useJwtReady()
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    if (!jwtReady || !isReady || !id) return
    dispatch(getResult(id))
    return () => {
      dispatch(intensiveCareSlice.actions.reset())
    }
  }, [jwtReady, isReady, id])
  return {
    result,
    isResultLoaded,
  }
}

export const useSetToolTips = (
  id: string,
  x: number | null,
  y: number | null,
  value: number | null,
  scores: (number | null)[]
) => {
  useEffect(() => {
    const line: HTMLAreaElement | null = document.querySelector(id)

    if (x != null && y != null && line) {
      let tooltipEl = document.getElementById('chartjs-tooltip')
      const position = line.getBoundingClientRect()

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement('div')
        tooltipEl.id = 'chartjs-tooltip'
        tooltipEl.innerHTML = '<div id="tooltip"></div>'
        document.body.appendChild(tooltipEl)
      }

      tooltipEl.classList.remove('above', 'below', 'no-transform')
      tooltipEl.classList.add('top')

      let innerHtml = '<div>'
      innerHtml += `<span class="score">${value}</span>`
      innerHtml += '</div>'

      let tableRoot = tooltipEl.querySelector('div')
      tableRoot!.innerHTML = innerHtml

      tooltipEl.style.opacity = String(1)
      tooltipEl.style.position = 'absolute'
      const offsetY = -41

      tooltipEl.style.left = window.pageXOffset + x + 16.125 + 'px'
      tooltipEl.style.top =
        window.pageYOffset + position.top + y + offsetY + 'px'

      tooltipEl.style.pointerEvents = 'none'
    }
  }, [x, y, value, scores])
}
