import React, { useState, useMemo } from 'react'
import styles from './index.module.scss'
import Layout from '@/layout'
import { useAuth } from '@/auth'
import { useForm } from 'react-hook-form'
import Button from '@/components/button'
import TextField from '@/components/textField'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom'

type Inputs = {
  uid: string
  password: string
}

type State = {
  backUrl: string
}

const Signin = () => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const state = useLocation().state as State
  const backUrl = state?.backUrl

  const onClick = async (inputs: Inputs) => {
    try {
      setIsLoading(true)
      await auth.login(inputs.uid, inputs.password)
      window.location.href = backUrl ? backUrl : '/diagnosis'
    } catch (e: any) {
      setIsError(true)
      reset({ password: '' })
      const response = e.response
      const errors = response.data
      const isLock = errors?.isLock?.[0]
      const until = errors?.until?.[0]

      if (isLock && until) {
        const target = moment(until)
        Cookies.set('isLock', isLock, {
          expires: target.toDate(),
        })
      }
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  // ロックの残り時間（isLockの期限）
  const isLock = useMemo(() => {
    const lock = Cookies.get('isLock')
    return !!lock
  }, [isLoading])

  return (
    <Layout isLoading={false}>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="uid">ID</label>
            <TextField
              placeholder="chousa01234"
              type="ID"
              {...register('uid', {
                required: 'メールアドレスを入力して下さい',
              })}
              error={errors['uid']?.message}
              fullWidth={true}
            />
          </div>
          <div className={clsx(styles.formGroup, styles.last)}>
            <label htmlFor="password">パスワード</label>
            <TextField
              type={'password'}
              placeholder="●●●●●●●●●●●●"
              fullWidth={true}
              {...register('password', {
                required: 'パスワードを入力下さい',
                minLength: {
                  value: 8,
                  message: 'パスワードは8桁以上で入力してください。',
                },
                maxLength: {
                  value: 50,
                  message: 'パスワードは50桁以内で入力してください。',
                },
              })}
              error={errors['password']?.message}
            />
          </div>
          <div className={styles.actions}>
            {isError && (
              <div className={styles.error}>
                IDかパスワードが正しくありません。
              </div>
            )}
            <Button
              variant="contained"
              onClick={handleSubmit(onClick)}
              className={styles.btn}
              disabled={isLock}
            >
              ログイン
            </Button>
          </div>

          {isLock && (
            <div className={styles.lock}>
              誤ったパスワードが連続して入力されたためアカウントがロックされています。
              <br />
              30分後に再度お試しください
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Signin
