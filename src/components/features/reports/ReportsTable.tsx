interface Props {
  data: {
    categoryId: string
    name: string
    icon: string
    total: number
  }[]
}

export const ReportsTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="min-w-full text-left">
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
              className="border-t border-border hover:bg-elevation-1 transition"
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
  )
}
