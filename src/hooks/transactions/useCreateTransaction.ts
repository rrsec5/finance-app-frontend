import { toast } from 'sonner'
import { createTransaction } from '../../api/transactions/transactionsApi'
import {
  TransactionTypeString,
  TransactionTypeNumberId,
} from '../../interfaces/Interfaces'

export const userCreateTransaction = (
  onSuccess?: () => void,
  setTransactions?: React.Dispatch<
    React.SetStateAction<TransactionTypeNumberId[]>
  >,
  refetchWallets?: () => void,
) => {
  const handleCreateTransaction = async (data: TransactionTypeString) => {
    const transactionData = {
      walletId: data.walletId,
      categoryId: data.categoryId,
      type: data.type,
      amount: parseFloat(data.amount),
      currency: data.currency,
      description: data.description,
      createdAt: data.createdAt,
    }

    await toast.promise(
      createTransaction(transactionData).then((res) => {
        const newTransaction = res.data

        if (setTransactions) {
          setTransactions((prev) => [newTransaction, ...prev])
        }

        refetchWallets?.()

        onSuccess?.()
      }),
      {
        loading: 'Creating transaction...',
        success: 'Transaction created successfully!',
        error: (error: any) => {
          const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'Unexpected error while creating transaction'
          return message
        },
      },
    )
  }

  return { handleCreateTransaction }
}