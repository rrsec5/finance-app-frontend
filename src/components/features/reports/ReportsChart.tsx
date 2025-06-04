import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  data: {
    categoryId: string
    name: string
    icon: string
    total: number
  }[]
}

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7f50',
  '#ffbb28',
  '#d0ed57',
  '#a4de6c',
  '#8dd1e1',
]

export const ReportsChart = ({ data }: Props) => {
  const chartData = data.map((entry) => ({
    name: `${entry.icon} ${entry.name}`,
    value: entry.total,
  }))

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
