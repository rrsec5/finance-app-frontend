import api from '../axiosInstance'

export const getDatesRange = () => {
  return api.get('/reports/date-range')
}

export const getCategorySummary = ({from, to}: {from: string, to: string}) => {
  return api.get(`/reports/category-summary?from=${from}&to=${to}`)
}