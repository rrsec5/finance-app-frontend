import { toast } from 'sonner'
import { createWallet } from '../../api/wallets/walletsApi'
import {
  WalletTypeNumberId,
  WalletTypeString,
} from '../../interfaces/Interfaces'

export const useCreateWallet = (
  onSuccess?: () => void,
  setWallets?: React.Dispatch<React.SetStateAction<WalletTypeNumberId[]>>,
) => {
  const handleCreateWallet = async (
    data: WalletTypeString,
    setError?: (
      name: keyof WalletTypeString,
      error: { message: string },
    ) => void,
  ) => {
    await toast.promise(
      createWallet({
        name: data.name,
        currency: data.currency,
        balance: parseFloat(data.balance),
      })
        .then((res) => {
          if (setWallets) {
            setWallets((prev) => [res.data, ...prev])
          }

          onSuccess?.()
        })
        .catch((err) => {
          const message =
            err.response?.data?.error ||
            err.response?.data?.message ||
            'Unexpected error while creating wallet'

          // Если ошибка связана с полем name, установим её явно
          if (setError && message.toLowerCase().includes('name')) {
            setError('name', { message })
          }

          // Пробрасываем ошибку для toast
          throw err
        }),
      {
        loading: 'Creating wallet...',
        success: 'Wallet created successfully!',
        error: (error: any) =>
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Unexpected error while creating wallet',
        //до моего обновления тут были скобки, const message = ... и return message
        // не знаю, нужен ли return message, поэтому я его закомментил, а не удалил
      },
    )
  }

  return { handleCreateWallet }
}
