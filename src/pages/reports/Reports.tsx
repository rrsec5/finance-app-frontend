import { useEffect } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useReports } from '../../hooks/reports/useReports'
import { CustomDatePickerInput } from '../../components/features/transactions/CustomDatePickerInput'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker-overrides.css'
import { LoadingCircleSpinner } from '../../components/UI/LoadingCircleSpinner'

export const Reports = () => {
  const { setTitle } = usePageTitle()
  const {
    fromDate,
    toDate,
    handleFromChange,
    handleToChange,
    data,
    loading,
    error,
  } = useReports()

  useEffect(() => {
    setTitle('Reports')
  }, [setTitle])

  return (
    <div className="p-4 space-y-6">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            From
          </label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => date && handleFromChange(date)}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
            className="w-full p-2 border-2 border-border rounded bg-elevation-2 text-text-primary cursor-pointer"
            customInput={<CustomDatePickerInput />}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            To
          </label>
          <DatePicker
            selected={toDate}
            onChange={(date) => date && handleToChange(date)}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
            className="w-full p-2 border-2 border-border rounded bg-elevation-2 text-text-primary cursor-pointer"
            customInput={<CustomDatePickerInput />}
          />
        </div>
      </div>

      {loading ? (
        <LoadingCircleSpinner/>
      ) : error ? (
        <p className="text-error">Failed to load data</p>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">Expenses by category:</h2>
          {data.length === 0 ? (
            <p className="text-text-secondary">
              No data available for this period.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-border rounded overflow-hidden">
                <thead className="bg-elevation-2">
                  <tr>
                    <th className="px-4 py-2 text-text-secondary">Category</th>
                    <th className="px-4 py-2 text-text-secondary">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry) => (
                    <tr
                      key={entry.categoryId}
                      className="border-t border-border"
                    >
                      <td className="px-4 py-2 flex items-center gap-2">
                        <span>{entry.icon}</span>
                        <span>{entry.name}</span>
                      </td>
                      <td className="px-4 py-2">{entry.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
