import { toast } from 'sonner'
import { createWallet } from '../../api/wallets/walletsApi'
import { WalletTypeNumberId, WalletTypeString } from '../../interfaces/Interfaces'

export const useCreateWallet = (
  onSuccess?: () => void,
  setWallets?: React.Dispatch<React.SetStateAction<WalletTypeNumberId[]>>,
) => {
  const handleCreateWallet = async (data: WalletTypeString) => {
    await toast.promise(
      createWallet({
        name: data.name,
        currency: data.currency,
        balance: parseFloat(data.balance),
      }).then((res) => {
        if (setWallets) {
          setWallets((prev) => [res.data, ...prev])
        }

        onSuccess?.()
      }),
      {
        loading: 'Creating wallet...',
        success: 'Wallet created successfully!',
        error: (error: any) => {
          const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Unexpected error while creating wallet'
          return message
        },
      },
    )
  }

  return { handleCreateWallet }
}
