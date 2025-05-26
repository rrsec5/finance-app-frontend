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
  const handleEditWallet = async (walletId: string, data: WalletTypeString) => {
    const updatedData = {
      name: data.name,
      currency: data.currency,
      balance: parseFloat(data.balance),
    }

    await toast.promise(
      editWallet(walletId, updatedData).then((res) => {
        const updatedWallet = res.data

        if (setWallets) {
          setWallets((prev) =>
            prev.map((wallet) =>
              wallet.id.toString() === walletId ? updatedWallet : wallet,
            ),
          )
        }

        onSuccess?.()
      }),
      {
        loading: 'Updating wallet...',
        success: 'Wallet updated successfully!',
        error: (error: any) => {
          const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Unexpected error while updating wallet'
          return message
        },
      },
    )
  }

  return { handleEditWallet }
}
