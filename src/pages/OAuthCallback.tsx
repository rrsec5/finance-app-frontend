// src/pages/OAuthCallback.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabaseClient'
import { logInWithGoogle } from '../api/auth/authApi'
import { useAuth } from '../hooks/auth/useAuth'
import { LoadingCircleSpinner } from '../components/UI/LoadingCircleSpinner'

export const OAuthCallback = () => {
  const navigate = useNavigate()
  const { login } = useAuth()


  useEffect(() => {
    const handleOAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session) {
        console.error('OAuth error', error)
        return
      }

      const token = session.access_token

      const res = await logInWithGoogle(token)

      if (res.status === 200) {
        login(token)
        navigate('/')
      }
    }

    handleOAuth()
  }, [])

  return <LoadingCircleSpinner />
}
