import { useEditWallet } from '../../../hooks/wallets/useEditWallet'
import {
  ModalControl,
  WalletTypeNumberId,
  WalletTypeString,
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
  const handleSave = (
    data: WalletTypeStringId,
    setError?: (
      name: keyof WalletTypeString,
      error: { message: string },
    ) => void,
  ) => {
    handleEditWallet(id, data, setError)
    setOpen(false)
  }

  return (
    <BaseWalletModal
      title="Edit Wallet"
      onSave={(data, setError) => handleSave(data, setError)}
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
