import { BaseWalletModal } from './BaseWalletModal'
import {
  ModalControl,
  WalletTypeNumberId,
} from '../../../interfaces/Interfaces'
import { useCreateWallet } from '../../../hooks/wallets/useCreateWallet'

export const CreateWalletModal = ({
  open,
  setOpen,
  setWallets,
}: ModalControl & {
  setWallets: React.Dispatch<React.SetStateAction<WalletTypeNumberId[]>>
}) => {
  const { handleCreateWallet } = useCreateWallet(
    () => setOpen(false),
    setWallets,
  )

  return (
    <BaseWalletModal
      title="Add Wallet"
      open={open}
      setOpen={setOpen}
      onSave={handleCreateWallet}
    />
  )
}
