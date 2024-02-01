import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import faker from 'faker'
import type Diagnosis from '@/types/diagnosis'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { download as downloadAction } from '@/store/diagnosis/asyncActions'
import { saveAs } from 'file-saver'
import { RECORD_IMAGE_VARIABLES_TYPE } from '@/pages/diagnosis'

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import GraphModal from './modal'
import Button from '../button'
import { useMe, useProfile } from '@/store/user/selectors'
import { Review } from '@/types/diagnosis'
import { isAndroid } from '@/libs/util'
import moment from 'moment'
import noticeSlice from '@/store/notice/slice'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const colorBlue = 'rgba(75, 190, 255, 0.5)'
const colorPink = 'rgba(255, 170, 174, 0.5)'

type Labels =
  | 'シミ'
  | 'しわ'
  | 'キメ'
  | 'くま'
  | 'うるおい'
  | 'ベタつき'
  | 'くすみ'
  | '毛穴'
  | 'なめらかさ'
  | '透明感'
  | 'ハリ'
  | 'ほうれい線'

const labels = [
  'シミ',
  'しわ',
  'キメ',
  'くま',
  'うるおい',
  'ベタつき',
  'くすみ',
  '毛穴',
  'なめらかさ',
  '透明感',
  'ハリ',
  'ほうれい線',
]

export const data = {
  labels,
  datasets: [
    // 実データ
    {
      data: labels.map(() => faker.datatype.number({ min: 30, max: 100 })),
      // グラデーション設定
      backgroundColor: (props: any) => {
        const width = props.chart.width
        const height = props.chart.height
        const grd = props.chart.ctx.createLinearGradient(
          width / 1.2,
          height / 5,
          width,
          height
        )
        grd.addColorStop(0, colorBlue)
        grd.addColorStop(0.5, colorPink)
        props.chart.ctx.fillStyle = grd
        props.chart.ctx.fill()
        return grd
      },
      borderWidth: 0,
      pointRadius: 3,
      pointBackgroundColor: '#FF9BA0',
    },
    // 平均
    {
      data: labels.map(() => 50),
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: '#BDBDBD',
      pointRadius: 0,
      borderWidth: 2,
      borderDash: [3],
    },
    // その他
    {
      data: labels.map(() => 19),
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: '#f7f7f7',
      borderWidth: 0,
      pointRadius: 0,
    },
  ],
}

const plugins = [
  {
    afterDraw: (chartInstance: any) => {
      let ctx = chartInstance.ctx
      chartInstance.scales.r['_pointLabelItems'].map(
        (label: any, index: number) => {
          // ラベル
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#717171'
          ctx.font = isAndroid()
            ? '700 12px "游ゴシック体", "游ゴシック","Yu Gothic Medium", "Yu Gothic", "YuGothic" '
            : '700 12px "游ゴシック体", "游ゴシック", "Yu Gothic Medium", "Yu Gothic", "YuGothic", "Hiragino Sans", "ヒラギノ角ゴシック", "メイリオ", Meiryo, sans-serif'

          ctx.fillText(chartInstance.data.labels[index], label.x, label.y)
          ctx.restore()
          // 値
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#FF9BA0'
          ctx.font = '700 18px "Arial"'
          const data = chartInstance.data.datasets[0].data[index]
          ctx.fillText(data, label.x, label.y + 24)
          ctx.restore()
        }
      )
    },
  },
]

/**
 * angleLines：チャートの中心から各頂点に伸びてる直線
 * grid：チャートの中心から波紋状に広がっている線
 * pointLabels：各頂点のラベルテキスト
 * ticks：各目盛りのテキスト
 * legend：データの説明用テキスト
 */
export let options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  layout: {
    padding: {
      top: 15,
      bottom: 15,
      right: 0,
      left: 0,
    },
  },
  scales: {
    r: {
      angleLines: {
        display: true,
        lineWidth: 1,
        color: '#E0E0E0',
        // borderDash: [5, 0],
      },
      ticks: {
        display: false, // Hides the labels in the middel (numbers)
        padding: 10,
        stepSize: 20,
      },
      pointLabels: {
        display: true,
        callback: function () {
          return ''
        },
        padding: 32,
        font: {
          weight: 'bold',
          size: '14',
        },
      },
      grid: {
        display: true,
        lineWidth: 1,
        color: '#E0E0E0',
        borderDash: [2],
        padding: 0,
      },
    },
  },
  onClick: {},
}

type Props = {
  diagnosis: Diagnosis
  isImage?: boolean
  raw?: Blob
} & Partial<RECORD_IMAGE_VARIABLES_TYPE>

const Graph = ({
  diagnosis,
  isImage,
  raw,
  wrinkles,
  all,
  texture,
  ageSpots,
  moisture,
  darkCircles,
  oiliness,
  pore,
  radiance,
}: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [label, setLabel] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [image, setImage] = useState<string | undefined>('')
  const [comment, setComment] = useState<string>('')
  const [avg, setAvg] = useState<number>(0)
  const [review, setReview] = useState<Review>({ short_review: '', image: '' })
  const dispatch: AppDispatch = useDispatch()

  const [isError, setIsError] = useState(false)

  const chartRef = useRef<any>(null)

  const profile = useProfile()

  //引数はbase64形式の文字列
  const toBlob = (base64: string) => {
    var bin = atob(base64.replace(/^.*,/, ''))
    var buffer = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }
    // Blobを作成
    try {
      const blob = new Blob([buffer.buffer], {
        type: 'image/png',
      })
      return blob
    } catch (e) {
      return false
    }
  }

  useEffect(() => {
    const allImageEl: (Element & { src: string }) | null =
      document.querySelector('#allImage')
    if (allImageEl) {
      allImageEl.addEventListener('error', () => {
        allImageEl.src = '/images/error.png'
        setIsError(true)
      })
    }
  }, [])

  const download = async (e: any) => {
    if (e) e.preventDefault()
    if (isError) {
      window.scrollTo(0, 0)
      dispatch(noticeSlice.actions.open('顔画像を削除済のため保存できません'))
      return null
    }
    if (!chartRef.current || !all) return
    const canvas = chartRef.current.canvas
    const dataUrl = canvas.toDataURL('image/png')
    const blob = await fetch(dataUrl).then((r) => r.blob())
    const file = new File([blob], 'graph.png', { type: 'image/png' })
    const params = {
      graph: file,
      all,
      id: diagnosis.id,
    }
    // 画像が返ってくる
    const res = await dispatch(downloadAction(params))
    if (res.type === 'diagnosis/download/fulfilled') {
      const img: Blob | boolean = toBlob(res.payload.data)
      if (img) {
        const fileName = `hadareco_${moment().format('YYYYMMDDHHmm')}`
        saveAs(img, fileName)
      }
    }

    return false
  }
  if (diagnosis === null) return null

  // データ
  const scores = [
    diagnosis.age_spots_score,
    diagnosis.wrinkles_score,
    diagnosis.texture_score,
    diagnosis.dark_circles_v2_score,
    diagnosis.moisture_score,
    diagnosis.oiliness_score,
    diagnosis.radiance_score,
    diagnosis.pore_score,
    diagnosis.smoothness_score,
    diagnosis.clarity_score,
    diagnosis.resilient_score,
    diagnosis.nasolabial_score,
  ]

  data.datasets[0].data = scores
  data.datasets[1].data = Object.values(diagnosis?.average_scores || {})
  return (
    <div className={clsx(styles.content)}>
      {isImage && raw && all && (
        <div className={styles.image}>
          <img id="rawImage" src={URL.createObjectURL(raw)} alt="rawImage" />
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.skinAge}>
          <span>肌年齢</span>
          <span>
            <b>{diagnosis.skin_age}</b>歳
          </span>
        </div>
        <div className={styles.legends}>
          <div className={styles.legend}>
            <div className={clsx(styles.color, styles.yours)}></div>
            <div className={styles.label}>
              {profile?.firstName ? `${profile.firstName}さん` : 'あなた'}
              のデータ
            </div>
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        {/* @ts-ignore */}
        <Radar ref={chartRef} data={data} plugins={plugins} options={options} />
      </div>
      <GraphModal
        name={label}
        image={image}
        comment={comment}
        isImage={isImage ? true : false}
        score={value}
        isShowModal={isShow}
        avg={avg}
        review={review}
        setIsShowModal={setIsShow}
      />
    </div>
  )
}

export default Graph
