import { userCreateTransaction } from '../../../hooks/transactions/useCreateTransaction'
import { ModalControl, TransactionTypeNumberId } from '../../../interfaces/Interfaces'
import { BaseTransModal } from './BaseTransModal'

type CreateTransModalProps = ModalControl & {
  showWalletSelection?: boolean
  walletId?: string
  setTransactions: React.Dispatch<
    React.SetStateAction<TransactionTypeNumberId[]>
  >
}

export const CreateTransModal = ({
  open,
  setOpen,
  showWalletSelection = false,
  walletId,
  setTransactions,
  refetchWallets,
}: CreateTransModalProps & {
  refetchWallets: () => void
}) => {
  const { handleCreateTransaction } = userCreateTransaction(
    () => setOpen(false),
    setTransactions,
    refetchWallets,
  )

  return (
    <BaseTransModal
      title="Add Transaction"
      open={open}
      setOpen={setOpen}
      onSave={handleCreateTransaction}
      showWalletSelection={showWalletSelection}
      defaultValues={{ walletId }}
    />
  )
}
