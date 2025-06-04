import { useEffect, useState } from 'react'
import { getCategorySummary, getDatesRange } from '../../api/reports/reportsApi'

export const useReports = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getDatesRange()
      .then((res) => {
        const { minDate, maxDate } = res.data
        setFromDate(new Date(minDate))
        setToDate(new Date(maxDate))
      })
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    if (!fromDate || !toDate) return
    setLoading(true)

    const adjustedFrom = new Date(fromDate)
    adjustedFrom.setHours(0, 0, 0, 0)
    const adjustedTo = new Date(toDate)
    adjustedTo.setHours(23, 59, 59, 999)

    getCategorySummary({
      from: adjustedFrom.toISOString(),
      to: adjustedTo.toISOString(),
    })
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [fromDate, toDate])

  const handleFromChange = (date: Date | null) => setFromDate(date)
  const handleToChange = (date: Date | null) => setToDate(date)

  return {
    fromDate,
    toDate,
    handleFromChange,
    handleToChange,
    data,
    loading,
    error,
  }
}
