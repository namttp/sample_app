import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { create, hari, kirei } from '@/store/diagnosis/asyncActions'
import diagnosisSlice from '@/store/diagnosis/slice'
import useInterval from 'use-interval'
import { unwrapResult } from '@reduxjs/toolkit'
import pico from '../../../../js/pico'

const INTERVAL = 50
var WIDTH = 1080
var HEIGHT = 1080
var CENTER_MARGIN = WIDTH / 2 - 50
var longerWidth = false
var streamWidth = 0
var streamHeight = 0

var facefinder_classify_region = function () {
  return -1.0
}

// @ts-ignore
var update_memory = pico.instantiate_detection_memory(5)

type Params = {
  setModule: (module: 'ycm' | 'twany') => void
  groupId: string
}

const Twany = (props: Params) => {
  const [timerCount, setTimerCount] = useState(0)
  const [countDown, setCountDown] = useState(false)
  const [success, setSuccess] = useState(false)
  const [count, setCount] = useState(3)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [cameraMessage, setCameraMessage] = useState<string>('')
  const [isSquare, setIsSquare] = useState<boolean>(true)
  const dispatch: AppDispatch = useDispatch()

  const twany = async () => {
    var canvas = document.getElementById('js-canvas')
    // @ts-ignore
    const raw = canvas?.toDataURL('image/jpeg')
    // ファイルにしてmultipart/form-dataにする
    const file = await fetch(raw!)
      .then((res) => res.blob())
      .then((blob) => new File([blob], 'twany.jpg', { type: 'image/jpeg' }))
    const scanner = document.getElementById('scanner')
    // @ts-ignore
    scanner.classList.add('scan')

    const params = {
      report: {
        ageSpots: 0,
        skinAge: 0,
        wrinkles: 0,
        texture: 0,
        darkCirclesV2: 0,
        moisture: 0,
        oiliness: 0,
        radiance: 0,
        pore: 0,
      },
      group_id: props.groupId,
      answer_ids: [],
      module: 'twany',
    }

    const res = await dispatch(create(params))
    const { id } = unwrapResult(res)
    diagnosisHariAndKirei(id, file)
      .then(async (ret) => {
        // リロードしてから遷移
        //await dispatch(getMe({}))
        await dispatch(diagnosisSlice.actions.reset())
        // 時間差をつけて遷移
        setTimeout(() => {
          props.setModule('ycm')
        }, 1000)
      })
      .catch((e) => {
        console.warn(e)
        alert(e)
      })
  }

  const diagnosisHariAndKirei = async (id: number, raw: Blob) => {
    const hariPromise = () => {
      return new Promise((resolve, reject) => {
        dispatch(hari({ id, raw })).then((hariRes) => {
          if (hariRes.type === 'diagnosis/hari/fulfilled') {
            resolve(hariRes)
          } else {
            reject(hariRes)
          }
        })
      })
    }
    const kireiPromise = () => {
      return new Promise((resolve, reject) => {
        dispatch(kirei({ id, raw })).then((kireiRes) => {
          if (kireiRes.type === 'diagnosis/kirei/fulfilled') {
            resolve(kireiRes)
          } else {
            reject(kireiRes)
          }
        })
      })
    }
    return Promise.all([hariPromise(), kireiPromise()])
  }

  useEffect(() => {
    const window_permission_error = document.getElementById(
      'window-permission-error'
    )
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: WIDTH,
          height: HEIGHT,
          facingMode: 'user',
        },
      })
      .then(function (stream) {
        init()
        videoRef.current!.srcObject = stream
        // @ts-ignore
        streamWidth = stream.getVideoTracks()[0].getSettings().width
        // @ts-ignore
        streamHeight = stream.getVideoTracks()[0].getSettings().height
        if (streamWidth != streamHeight) {
          setIsSquare(false)
          if (streamWidth > streamHeight) {
            longerWidth = true
            WIDTH = streamHeight
            HEIGHT = streamHeight
          } else {
            WIDTH = streamWidth
            HEIGHT = streamHeight
          }
        }
        console.log(streamWidth, streamHeight)
        var canvas = document.getElementById('js-canvas')
        // @ts-ignore
        canvas.width = WIDTH
        // @ts-ignore
        canvas.height = HEIGHT

        var cascadeurl =
          'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder'
        fetch(cascadeurl).then(function (response) {
          response.arrayBuffer().then(function (buffer) {
            var bytes = new Int8Array(buffer)
            // @ts-ignore
            facefinder_classify_region = pico.unpack_cascade(bytes)
            console.log('* facefinder loaded')
          })
        })
      })
      .catch(function (error) {
        console.log(error)
        // @ts-ignore
        window_permission_error.classList.add('active')
        return
      })
  }, [])

  function rgba_to_grayscale(rgba: any, nrows: any, ncols: any) {
    var gray = new Uint8Array(nrows * ncols)
    for (var r = 0; r < nrows; ++r) {
      for (var c = 0; c < ncols; ++c) {
        // gray=0.2*red + 0.7*green + 0.1*blue
        gray[r * ncols + c] =
          (2 * rgba[r * 4 * ncols + 4 * c + 0] +
            7 * rgba[r * 4 * ncols + 4 * c + 1] +
            1 * rgba[r * 4 * ncols + 4 * c + 2]) /
          10
      }
    }
    return gray
  }

  const processfn = useCallback(() => {
    // 顔認識ライブラリの初期化
    // we will use the detecions of the last 5 frames
    // @ts-ignore
    var canvas = document.getElementById('js-canvas')
    // @ts-ignore
    var ctx = canvas.getContext('2d')

    var canvas = document.getElementById('js-canvas')
    // @ts-ignore
    var ctx = canvas.getContext('2d')
    // render the video frame to the canvas element and extract RGBA pixel data
    if (isSquare) {
      ctx.drawImage(videoRef.current, 0, 0)
    } else {
      if (longerWidth) {
        ctx.drawImage(
          videoRef.current,
          (streamWidth - streamHeight) / 2,
          0,
          streamHeight,
          streamHeight,
          0,
          0,
          streamHeight,
          streamHeight
        )
      } else {
        ctx.drawImage(
          videoRef.current,
          0,
          (streamHeight - streamWidth) / 2,
          streamWidth,
          streamWidth,
          0,
          0
        )
      }
    }
    var rgba = ctx.getImageData(0, 0, WIDTH, HEIGHT).data
    // prepare input to `run_cascade`
    let image = {
      pixels: rgba_to_grayscale(rgba, HEIGHT, WIDTH),
      nrows: HEIGHT,
      ncols: WIDTH,
      ldim: WIDTH,
    }
    let params = {
      shiftfactor: 0.1,
      // move the detection window by 10% of its size
      minsize: WIDTH * 0.6,
      // minimum size of a face
      maxsize: WIDTH,
      // maximum size of a face
      scalefactor: 1.1,
      // for multiscale processing: resize the detection window by 10% when moving to the higher scale
    }
    // run the cascade over the frame and cluster the obtained detections
    // dets is an array that contains (r, c, s, q) quadruplets
    // (representing row, column, scale and detection score)
    // @ts-ignore
    let dets = pico.run_cascade(image, facefinder_classify_region, params)
    dets = update_memory(dets)
    // @ts-ignore
    dets = pico.cluster_detections(dets, 0.2) // set IoU threshold to 0.2
    // draw detections
    for (let i = 0; i < dets.length; ++i) {
      // check the detection score
      // if it's above the threshold, draw it
      // (the constant 50.0 is empirical: other cascades might require a different one)
      if (dets[i][3] > 50.0) {
        var r, c, s
        // for debug
        // ctx.beginPath();
        // ctx.arc(dets[i][1], dets[i][0], dets[i][2]/2, 0, 2*Math.PI, false);
        // ctx.lineWidth=6;
        // ctx.strokeStyle='red';
        // ctx.stroke();
        return {
          width: dets[i][2],
          center_x: dets[i][1],
          center_y: dets[i][0],
        }
      }
    }
  }, [isSquare, videoRef.current])

  useInterval(
    () => {
      const count_down_text = document.getElementById('count-down')
      const camera_control = document.getElementById('camera-control')
      const confirm = document.getElementById('confirm')
      var result = processfn()
      if (result == undefined) {
        ////////// 計測NG //////////
        camera_init()
        return
      }
      console.log(result)
      if (
        result['width'] >= WIDTH * 0.6 &&
        result['width'] <= WIDTH &&
        result['center_x'] >= WIDTH / 2 - CENTER_MARGIN &&
        result['center_x'] <= WIDTH / 2 + CENTER_MARGIN &&
        result['center_y'] >= HEIGHT / 2 - CENTER_MARGIN &&
        result['center_y'] <= HEIGHT / 2 + CENTER_MARGIN
      ) {
        ////////// 計測OK //////////
        setSuccess(true)
        let count = 3 - Math.floor((timerCount * INTERVAL) / 1000)
        const guide_circle = document.getElementById('guide-circle')
        // @ts-ignore
        guide_circle.classList.add('success')
        //カウントダウン開始(テキストを表示)
        if (!countDown) {
          setCountDown(true)
          console.log('active')
          // @ts-ignore
          count_down_text.classList.add('active')
          // @ts-ignore
          setCameraMessage('赤枠のまま動かないでください。')
        }
        //カウント終了（コントロール表示）
        if (count == 0) {
          // @ts-ignore
          videoRef.current?.pause()
          // @ts-ignore
          count_down_text.classList.remove('active')
          // @todo
          setPlaying(false)
          // @ts-ignore
          guide_circle.classList.remove('success')
          setCameraMessage(
            '写真をご確認ください。よろしければ、「解析する」ボタンを押してください。'
          )
          // @ts-ignore
          camera_control.classList.add('active')
          // @ts-ignore
          confirm.classList.add('active')
          return
        }
        // @ts-ignore
        count_down_text.textContent = count
        setTimerCount(timerCount + 1)
      } else {
        ////////// 計測NG //////////
        camera_init()
      }
      console.log(count, success)
    },
    isPlaying ? INTERVAL : null
  )

  var camera_init = function () {
    const count_down_text = document.getElementById('count-down')
    const guide_circle = document.getElementById('guide-circle')
    const face_guide = document.getElementById('face-guide')
    const face_guide_plus = document.getElementById('face-guide-plus')
    const camera_control = document.getElementById('camera-control')
    const scanner = document.getElementById('scanner')
    const btn_camera_ok = document.getElementById('btn-camera-ok')
    const btn_camera_retry = document.getElementById('btn-camera-retry')
    const window_camera = document.getElementById('window-camera')
    // @ts-ignore
    count_down_text.classList.remove('active')
    // @ts-ignore
    guide_circle.classList.remove('hide')
    // @ts-ignore
    guide_circle.classList.remove('success')
    // @ts-ignore
    camera_control.classList.remove('active')
    // @ts-ignore
    face_guide.classList.remove('active')
    // @ts-ignore
    face_guide_plus.classList.remove('active')
    // @ts-ignore
    const confirm = document.getElementById('confirm')
    // @ts-ignore
    confirm.classList.remove('active')
    // @ts-ignore
    setCameraMessage('白枠に顔の輪郭を合わせてください。')
    // @ts-ignore
    videoRef.current.play()
    // @ts-ignore
    setTimerCount(0)
    setCount(3)
    setSuccess(false)
    setCountDown(false)
  }

  var init = function () {
    video_update()
    const window_camera = document.getElementById('window-camera')
    // @ts-ignore
    window_camera.classList.add('active')
  }

  var video_update = function () {
    camera_init()
    setPlaying(true)
  }

  return (
    <>
      <main role="main">
        <Helmet>
          <link
            rel="stylesheet"
            href="https://s3-twany-test-cloud9-ja67agaha1.s3.ap-northeast-1.amazonaws.com/assets/stylesheets/style.css"
          />
        </Helmet>
        <div className="container">
          <div className="main-frame" id="window-camera">
            <h1 className="page-title">撮影</h1>
            <div className="video-wrapper" style={{ display: 'none' }}>
              <video
                ref={videoRef}
                id="js-video"
                autoPlay
                muted
                playsInline
              ></video>
            </div>
            <div className="content-wrapper" id="confirm">
              <div className="canvas-wrapper">
                <canvas id="js-canvas"></canvas>
                <div id="count-down"></div>
                <div id="guide-circle"></div>
                <div id="scanner"></div>
                <div id="face-guide"></div>
                <div id="face-guide-plus"></div>
              </div>
              <div className="confirm-wrapper">
                <p id="camera-message">
                  &nbsp;
                  {cameraMessage}
                </p>
                <div className="btn-wrapper" id="camera-control">
                  <button id="btn-camera-retry" className="btn prev">
                    やり直す
                  </button>
                  <button
                    onClick={twany}
                    id="btn-camera-ok"
                    className="btn next mb70"
                  >
                    解析する
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="main-frame" id="window-permission-error">
            <img
              src="/assets/images/icon_alert_sp.png"
              className="alert-icon"
              alt="ALERT"
            />
            <p>
              カメラにアクセスできません。
              <br />
              iphoneの方はSafari、Androidの方は
              <br className="sp" />
              Chromeからアクセスしてください。
              <br />
              <br />
              または、カメラ機能の距離設定を解除する
              <br className="sp" />
              必要があります。
            </p>
            <div className="btn-wrapper">
              <a href="index.html" className="btn prev" title="TOPに戻る">
                TOPに戻る
              </a>
              <a
                href="setting.html"
                className="btn next"
                title="設定方法はこちら"
              >
                設定方法はこちら
              </a>
            </div>
          </div>

          <div className="main-frame" id="window-system-error">
            <img
              src="/assets/images/icon_alert_sp.png"
              className="alert-icon"
              alt="ALERT"
            />
            <p>
              申し訳ございません。
              <br />
              正しく解析することができませんでした。
              <br />
              撮影環境を確認してください。
              <br />
              <br />
              ・適切な明るさでの撮影
              <br />
              ・正しい顔の向きかどうか
              <br />
              ・安定した通信環境
            </p>
            <div className="btn-wrapper">
              <a href="index.html" className="btn prev" title="TOPに戻る">
                TOPに戻る
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Twany
