import { useEffect, useState } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useReports } from '../../hooks/reports/useReports'
import { CustomDatePickerInput } from '../../components/features/transactions/CustomDatePickerInput'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker-overrides.css'
import { LoadingCircleSpinner } from '../../components/UI/LoadingCircleSpinner'
import { Toggle } from '../../components/UI/Toggle'
import { ReportsTable } from '../../components/features/reports/ReportsTable'
import { ReportsChart } from '../../components/features/reports/ReportsChart'

export const Reports = () => {
  const { setTitle } = usePageTitle()
  const {
    fromDate,
    toDate,
    handleFromChange,
    handleToChange,
    minDate,
    maxDate,
    data,
    loading,
    error,
  } = useReports()

  const [view, setView] = useState<'table' | 'chart'>('table')

  useEffect(() => {
    setTitle('Reports')
  }, [setTitle])

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
        {/* FROM DATE */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            From
          </label>
          <div className="flex gap-2">
            <DatePicker
              selected={fromDate}
              onChange={(date) => date && handleFromChange(date)}
              dateFormat="dd-MM-yyyy"
              maxDate={new Date()}
              className="w-full p-2 border-2 border-border rounded bg-elevation-2 text-text-primary cursor-pointer"
              customInput={<CustomDatePickerInput />}
            />
            <button
              onClick={() => handleFromChange(minDate)}
              className="px-2 py-1 text-sm border border-border rounded bg-elevation-2 hover:bg-elevation-3 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* TO DATE */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            To
          </label>
          <div className="flex gap-2">
            <DatePicker
              selected={toDate}
              onChange={(date) => date && handleToChange(date)}
              dateFormat="dd-MM-yyyy"
              maxDate={new Date()}
              className="w-full p-2 border-2 border-border rounded bg-elevation-2 text-text-primary cursor-pointer"
              customInput={<CustomDatePickerInput />}
            />
            <button
              onClick={() => handleToChange(maxDate)}
              className="px-2 py-1 text-sm border border-border rounded bg-elevation-2 hover:bg-elevation-3 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* VIEW TOGGLE */}
        <Toggle
          pressed={view === 'chart'}
          onPressedChange={() => setView(view === 'table' ? 'chart' : 'table')}
        >
          {view === 'table' ? 'Switch to Chart' : 'Switch to Table'}
        </Toggle>
      </div>

      {/* CONTENT */}
      {loading ? (
        <LoadingCircleSpinner />
      ) : error ? (
        <p className="text-error">Failed to load data</p>
      ) : data.length === 0 ? (
        <p className="text-text-secondary">
          No data available for this period.
        </p>
      ) : view === 'table' ? (
        <ReportsTable data={data} />
      ) : (
        <ReportsChart data={data} />
      )}
    </div>
  )
}
