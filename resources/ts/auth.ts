import api from '@/libs/axios'
import Cookies from 'js-cookie'

export type RegistParams = {
  uid: string
  password: string
}

export type UpdateParams = RegistParams

export const useAuth = () => {
  const csrf = () => api().get('/sanctum/csrf-cookie')

  const login = async (uid: string, password: string) => {
    await csrf()
    await api().post('/api/login', {
      uid,
      password,
    })
  }

  const logout = async () => {
    await csrf()
    await api().post('/api/logout')
    Cookies.remove('id_token')
  }

  return {
    login,
    logout,
  }
}
