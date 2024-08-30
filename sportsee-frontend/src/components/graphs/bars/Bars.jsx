import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import './bars.css'

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={3}
        ry={3}
      />
      <rect x={x} y={y + height - 4} width={width} height={4} fill={fill} />
    </g>
  )
}

function BarChartComponent({ data }) {
  if (!data || !data.sessions) return null

  const formattedData = data.sessions.map((session) => ({
    date: new Date(session.day).toLocaleDateString('fr-FR', {
      day: 'numeric',
    }),
    kilogram: session.kilogram,
  }))

  const values = formattedData.map((d) => d.kilogram)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  // Ajustement de l'échelle minimale et maximale
  let minScale = minValue - 1
  let maxScale = maxValue

  // Création de tous les ticks pour l'axe Y
  const ticks = []
  for (let i = minScale; i <= maxScale; i++) {
    ticks.push(i)
  }

  return (
    <div className="graph">
      <div className="graph__header">
        <h2 className="graph__header--title">Activité quotidienne</h2>
        <ul
          className="recharts-default-legend"
          style={{
            padding: 0,
            margin: 0,
            textAlign: 'right',
            listStyle: 'none',
          }}
        >
          <li
            className="recharts-legend-item legend-item-0"
            style={{ display: 'inline-block', marginRight: '10px' }}
          >
            <svg
              className="recharts-surface"
              width="8"
              height="8"
              viewBox="0 0 32 32"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: '4px',
              }}
            >
              <path
                fill="#282D30"
                cx="16"
                cy="16"
                className="recharts-symbols"
                transform="translate(16, 16)"
                d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
              ></path>
            </svg>
            <span
              className="recharts-legend-item-text"
              style={{ color: '#282D30' }}
            >
              <span className="graph__header--legend--txt">Poids (kg)</span>
            </span>
          </li>
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={formattedData}
          margin={{ top: 40, right: 29, bottom: 30, left: 43 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={{ stroke: '#DEDEDE' }}
            tick={{ fill: '#9B9EAC' }}
          />
          <YAxis
            orientation="right"
            domain={[minScale, maxScale]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9B9EAC' }}
            ticks={ticks}
          />
          {ticks.map((tick, index) => (
            <ReferenceLine
              key={index}
              y={tick}
              stroke="#DEDEDE"
              strokeDasharray="3 3"
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: '#E60000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
            }}
            itemStyle={{ color: '#FFFFFF' }}
            labelStyle={{ display: 'none' }}
            cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
          />
          <Bar
            dataKey="kilogram"
            barSize={7}
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            shape={<CustomBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent
