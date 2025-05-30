import { toast } from 'sonner'
import { signUp } from '../../api/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { SignUpFormValues } from '../../interfaces/Interfaces'
import { UseFormSetError } from 'react-hook-form'

export const useSignUp = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  //не уверен, что после моих махинаций с выводом ошибок регистрация будет нормально работать))))
  const handleSignUp = async (
    data: SignUpFormValues,
    setError?: UseFormSetError<SignUpFormValues>,
  ) => {
    await toast.promise(
      signUp(data)
        .then((response) => {
          const token =
            response.data?.token || response.data?.data?.session?.access_token
          if (token) {
            login(token)
            navigate('/')
          }
          return response
        })
        .catch((error) => {
          const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Unexpected error during signup'

          // Обработка ошибки для поля email
          if (
            message.toLowerCase().includes('email') &&
            message.toLowerCase().includes('registered')
          ) {
            setError?.('email', {
              type: 'manual',
              message: `${message.toString()}`,
            })
          }

          throw error // проброс для toast
        }),

      {
        loading: 'Registering...',
        success: () => 'Registration was successful!',
        error: (error: any) => {
          const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Unexpected error during signup'
          return message
        },
      },
    )
  }

  return { handleSignUp }
}
