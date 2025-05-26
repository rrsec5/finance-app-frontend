import { useEditWallet } from '../../../hooks/wallets/useEditWallet'
import {
  ModalControl,
  WalletTypeNumberId,
  WalletTypeStringId,
} from '../../../interfaces/Interfaces'
import { BaseWalletModal } from './BaseWalletModal'

type ChangeWalletProps = ModalControl & WalletTypeNumberId

export const EditWalletModal = ({
  open,
  setOpen,
  id,
  name,
  currency,
  balance,
  setWallets,
}: ChangeWalletProps & {
  setWallets: React.Dispatch<React.SetStateAction<WalletTypeNumberId[]>>
}) => {
  const { handleEditWallet } = useEditWallet(() => setOpen(false), setWallets)
  const handleSave = (data: WalletTypeStringId) => {
    handleEditWallet(id, data)
    setOpen(false)
  }

  return (
    <BaseWalletModal
      title="Edit Wallet"
      onSave={handleSave}
      open={open}
      setOpen={setOpen}
      defaultValues={{
        id: id,
        name: name,
        currency: currency,
        balance: balance.toString(),
      }}
      showCancel={true}
      isEditing={true}
    />
  )
}
