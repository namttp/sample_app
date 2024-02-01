import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Module from './module'
import Tutorial from './tutorial'
import { getMe } from '@/store/user/asyncActions'
import ReportComponent from './report'
import Note from './note'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { create, hari, kirei, Report } from '@/store/diagnosis/asyncActions'
import { unwrapResult } from '@reduxjs/toolkit'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { backfaceFixed } from '@/libs/util'
import diagnosisSlice from '@/store/diagnosis/slice'
import { Helmet } from 'react-helmet'
import Alert from './alert'
import Setting from './setting'
import NetworkErrorModal from '@/components/networkError'
import { remove } from '@/removeLoading'
import MyError from './error'

export const IMAGE_VARIABLES = {
  all: 'all',
  wrinkles: 'wrinkle',
  ageSpots: 'ageSpots',
  texture: 'texture',
  darkCircles: 'darkCirclesV2',
  moisture: 'moisture',
  oiliness: 'oiliness',
  pore: 'pore',
  radiance: 'radiance',
}

export type RECORD_IMAGE_VARIABLES_TYPE = Record<
  keyof typeof IMAGE_VARIABLES,
  Blob
>

export type GrdType = 'blue' | 'orange' | 'green'

export type Scene =
  | 'tutorial'
  | 'note'
  | 'module'
  | 'report'
  | 'alert'
  | 'setting'
  | 'error'
export type ChildProps = {
  start: () => void
  close: () => void
  setScene: (scene: Scene) => void
  opened: boolean
  progress: number
  grdType: GrdType
}

type Params = {
  answerIds?: number[]
}

// 特記：skinAnalysisCompletedはドキュメントに無いがソースコードにある。ただ動作していない模様
const Diagnosis = () => {
  const navigate = useNavigate()
  const state = useLocation().state as null | Params

  const [listners, setListners] = useState<any[]>([])
  const [completed, setCompleted] = useState(false)
  const [report, setReport] = useState<Report | null>(null)
  const [scene, setScene] = useState<Scene>('module')
  const [ready, setReady] = useState(false)
  const [opened, setOpened] = useState(false)
  const [progress, setProgress] = useState(0)
  const dispatch: AppDispatch = useDispatch()
  const [grdType, setGrdType] = useState<GrdType>('blue')
  const [isLoaded, setIsLoaded] = useState(false)

  const Component = React.useMemo(() => {
    switch (scene) {
      case 'tutorial':
        return Tutorial
      case 'note':
        return Note
      case 'module':
        return Module
      case 'report':
        return ReportComponent
      case 'alert':
        return Alert
      case 'setting':
        return Setting
      case 'error':
        return MyError
    }
  }, [scene])

  React.useEffect(() => {
    remove()
    backfaceFixed(true)
    return () => {
      backfaceFixed(false)
      close()
    }
  }, [])

  const start = () => {
    let windowWidth = document.documentElement.clientWidth
    if (windowWidth > 640) {
      windowWidth = 640
    }
    // 2rem
    const width = windowWidth - 24 * 2
    const height = width

    document.documentElement.style.setProperty('--ycm-height', `${height}px`)
    //const windowHeight = document.documentElement.clientHeight
    window.YMK.init({
      language: 'jpn',
      autoOpen: false, //trueにすると【通常のバーチャルメイクモード】が起動します。 →肌診断モードは個別の起動コマンドで起動する必要があります
      skinSmoothStrength: 0,
      hideButtonsOnResultPage: true, // スコアなどを表示する場合は false
      disableSkinAge: false, // 肌年齢だけを隠す場合はTrue
      disableSkinHealth: false, // 肌指数だけを隠す場合はTrue
      width: width,
      height: height, //任意：最小 300 ～最大 900
    })

    window.YMK.close()
    window.YMK.openSkincare('capture')

    const l1 = window.YMK.addEventListener('opened', function () {
      setOpened(true)
      setReady(true)
    })

    const l2 = window.YMK.addEventListener('loaded', function () {
      setIsLoaded(true)
    })

    const l3 = window.YMK.addEventListener('closed', function () {
      setOpened(false)
    })

    const l4 = window.YMK.addEventListener(
      'skinAnalysisProgressUpdated',
      function (s: number) {
        if (s === 0) {
          setScene('report')
        }
        if (s >= 100) {
          setCompleted(true)
        }
      }
    )

    const l5 = window.YMK.addEventListener(
      'skinAnalysisUpdated',
      function (r: Report) {
        setReport((prev) => {
          if (prev) {
            return prev
          }
          return r
        })
      }
    )

    const l6 = window.YMK.addEventListener('cameraFailed', function () {
      window.YMK.reset()
      setScene('alert')
    })

    setListners([l1, l2, l3, l4, l5, l6])
  }

  useEffect(() => {
    if (completed && report) {
      // イベントリスナーを解除
      for (var l in listners) {
        window.YMK.removeEventListener(l)
      }
      diagnosis(report)
    }
  }, [completed, report])

  useEffect(() => {
    if (progress <= 25) {
      setGrdType('blue')
    } else if (progress <= 100) {
      setGrdType('orange')
    } else {
      setGrdType('green')
    }
  }, [progress])

  // キャンセル時の処理
  useEffect(() => {
    if (ready) {
      if (opened === false && completed === false) {
        window.location.href = '/'
      }
    }
  }, [opened, completed, ready])

  const diagnosis = async (report: Report) => {
    for (let i = 1; i <= 25; i++) {
      setProgress((prev) => prev + 1)
    }

    // ①シーンを変換する
    setScene('report')

    // ②まずはraw画像のみを送信してIDを発番
    const raw = (await snapshot('')) as any
    const params = {
      report,
      answer_ids: state?.answerIds!,
    }
    const res = await dispatch(create(params))

    setProgress((prev) => prev + 1)

    if (res.type === 'diagnosis/create/fulfilled') {
      for (let i = 1; i < 25; i++) {
        setProgress((prev) => prev + 1)
      }
      const { id } = unwrapResult(res)
      // ③ [非同期] AI Hari
      // ③ [非同期] AI Kirei
      // ③ [非同期] 画像を送信
      diagnosisHariAndKirei(id, raw)
        .then(async (ret) => {
          const images = ret[2] as Record<keyof typeof IMAGE_VARIABLES, Blob>
          // リロードしてから遷移
          //await dispatch(getMe({}))
          await dispatch(diagnosisSlice.actions.reset())
          // 時間差をつけて遷移
          setTimeout(() => {
            navigate(`/result`, {
              state: { id, raw, ...images },
            })
          }, 1000)
        })
        .catch((e) => {
          console.warn(e)
          setScene('error')
        })
    } else {
      setScene('error')
    }
  }

  const diagnosisHariAndKirei = async (id: number, raw: Blob) => {
    const hariPromise = () => {
      return new Promise((resolve, reject) => {
        dispatch(hari({ id, raw })).then((hariRes) => {
          if (hariRes.type === 'diagnosis/hari/fulfilled') {
            resolve(hariRes)
            setProgress((prev) => prev + 1)
          } else {
            reject(hariRes)
          }
        })
      })
    }
    const kireiPromise = () => {
      for (let i = 1; i < 25; i++) {
        setProgress((prev) => prev + 1)
      }
      return new Promise((resolve, reject) => {
        dispatch(kirei({ id, raw })).then((kireiRes) => {
          if (kireiRes.type === 'diagnosis/kirei/fulfilled') {
            resolve(kireiRes)
            setProgress((prev) => prev + 1)
          } else {
            reject(kireiRes)
          }
        })
      })
    }
    const imagesPromise = async () => {
      for (let i = 1; i < 25; i++) {
        setProgress((prev) => prev + 1)
      }
      const allImages = await getAllVariableImage()
      return new Promise((resolve) => {
        setProgress((prev) => prev + 1)
        resolve(allImages)
      })
    }
    return Promise.all([hariPromise(), kireiPromise(), imagesPromise()])
  }

  const getAllVariableImage = async () => {
    // hash
    let images: any = {}
    // IMAGE_VARIABLESをループして画像を取得
    for (const key of Object.keys(IMAGE_VARIABLES)) {
      const variable = key as keyof typeof IMAGE_VARIABLES

      const image = (await snapshot(IMAGE_VARIABLES[variable])) as Blob

      images[variable] = image
    }
    return images
  }

  const close = () => {
    window.YMK.close()
    window.YMK.remove
    setCompleted(false)
    for (var l in listners) {
      window.YMK.removeEventListener(l)
    }
  }

  // snapshotの結果のbase64のデータをPromiseで返す非同期関数
  const snapshot = (type: string) => {
    return new Promise((resolve, reject) => {
      const l = window.YMK.addEventListener('skinAnalysisUpdated', function () {
        setTimeout(function () {
          window.YMK.snapshot(
            'blob',
            (data: any) => {
              resolve(data)
            },
            (error: any) => {
              console.error(error, 'error')
              reject(error)
            }
          )
        }, 0)
        window.YMK.removeEventListener(l)
      })
      window.YMK.setSkincareResultType(type)
    })
  }

  return (
    <div className={styles.content}>
      <Helmet>
        <title>skindiagnosis-survey</title>
        <meta name="description" content="" />
      </Helmet>
      <>
        <div className={clsx(styles.box, scene === 'report' && styles.report)}>
          <div
            className={clsx(
              styles.module,
              opened && styles.opened,
              isLoaded && styles.loaded,
              scene === 'report' && styles.none
            )}
            id="YMK-module"
          ></div>
        </div>

        <NetworkErrorModal />
        <Component
          opened={opened}
          setScene={setScene}
          start={start}
          close={close}
          progress={progress}
          grdType={grdType}
        />
      </>
    </div>
  )
}

export default Diagnosis
