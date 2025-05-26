import { WalletTypeNumber, WalletTypeString } from '../../interfaces/Interfaces'
import api from '../axiosInstance'

export const createWallet = (walletData: WalletTypeNumber) => {
  return api.post('/wallets', walletData)
}

export const fetchWallets = () => {
  return api.get('/wallets')
}

export const deleteWallet = (id: string) => {
  return api.delete(`/wallets/${id}`)
}

export const editWallet = async (id: string, data: Partial<WalletTypeNumber>) => {
  return await api.put(`/wallets/${id}`, data)
}