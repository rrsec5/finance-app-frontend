import { toast } from 'sonner'
import {
  WalletTypeNumberId,
  WalletTypeString,
} from '../../interfaces/Interfaces'
import { editWallet } from '../../api/wallets/walletsApi'

export const useEditWallet = (
  onSuccess?: () => void,
  setWallets?: React.Dispatch<React.SetStateAction<WalletTypeNumberId[]>>,
) => {
  const handleEditWallet = async (
    walletId: string,
    data: WalletTypeString,
    setError?: (
      name: keyof WalletTypeString,
      error: { message: string },
    ) => void,
  ) => {
    const updatedData = {
      name: data.name,
      currency: data.currency,
      balance: parseFloat(data.balance),
    }

    await toast.promise(
      editWallet(walletId, updatedData)
        .then((res) => {
          const updatedWallet = res.data

          if (setWallets) {
            setWallets((prev) =>
              prev.map((wallet) =>
                wallet.id.toString() === walletId ? updatedWallet : wallet,
              ),
            )
          }

          onSuccess?.()
        })
        .catch((err) => {
          const message =
            err.response?.data?.error ||
            err.response?.data?.message ||
            'Unexpected error while updating wallet'

          // Если ошибка связана с полем name, установим её явно
          if (setError && message.toLowerCase().includes('name')) {
            setError('name', { message })
          }

          // Пробрасываем ошибку для toast
          throw err
        }),

      {
        loading: 'Updating wallet...',
        success: 'Wallet updated successfully!',
        error: (error: any) =>
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Unexpected error while updating wallet',
        //до моего обновления тут были скобки, const message = ... и return message
        // не знаю, нужен ли return message, поэтому я его закомментил, а не удалил
      },
    )
  }

  return { handleEditWallet }
}
