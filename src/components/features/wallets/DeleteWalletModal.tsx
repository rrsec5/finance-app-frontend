import { useNavigate } from 'react-router-dom'
import { useDeleteWallet } from '../../../hooks/wallets/useDeleteWallet'
import {
  ModalControl,
  WalletTypeNumberId,
} from '../../../interfaces/Interfaces'
import { Button } from '../../UI/Button'
import { Modal } from '../../UI/Modal'

type ChangeWalletProps = ModalControl & WalletTypeNumberId

export const DeleteWalletModal = ({
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
  const { handleDeleteWallet } = useDeleteWallet(
    () => setOpen(false),
    setWallets,
  )
  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    handleDeleteWallet(id)
    setOpen(false)
    navigate('/wallets')
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="font-montserrat text-text-primary text-h3">
        Are you sure you want to delete this wallet?
        <p className="text-h2 font-lato font-bold mt-8">
          <span>{name}: </span>
          <span>
            {balance} {currency}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 text-surface mt-8 gap-4">
        <Button onClick={() => handleDelete(id)} text="Yes" defcolor={false} />
        <Button onClick={() => setOpen(false)} text="No" />
      </div>
    </Modal>
  )
}
