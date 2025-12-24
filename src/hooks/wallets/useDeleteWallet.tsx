import { toast } from 'sonner'
import { deleteWallet } from '../../api/wallets/walletsApi'
import { WalletTypeNumberId } from '../../interfaces/Interfaces'

export const useDeleteWallet = (
  onSuccess?: () => void,
  setWallets?: React.Dispatch<React.SetStateAction<WalletTypeNumberId[]>>,
) => {
  const handleDeleteWallet = async (walletId: string) => {
    await toast.promise(
      deleteWallet(walletId).then(() => {
        if (setWallets) {
          setWallets((prev) =>
            prev.filter((wallet) => wallet.id.toString() !== walletId),
          )
        }

        onSuccess?.()
      }),
      {
        loading: 'Deleting wallet...',
        success: 'Wallet deleted successfully!',
        error: (error: any) => {
          const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Unexpected error while deleting wallet'
          return message
        },
      },
    )
  }

  return { handleDeleteWallet }
}
