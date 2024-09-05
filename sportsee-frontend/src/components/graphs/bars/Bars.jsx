import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
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
        className="graph__bar"
      />
      <rect
        x={x}
        y={y + height - 4}
        width={width}
        height={4}
        fill={fill}
        className="graph__bar-bottom"
      />
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#E60000',
          color: '#FFFFFF',
          border: 'none',
          padding: '5px 10px',
          fontSize: '0.500rem',
          fontWeight: '500',
          height: '63px',
          width: '39px',
          display: 'flex',
          flexDirection: 'column',
          gap: '26px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ margin: 0 }}>{`${payload[0].value}kg`}</p>
        <p style={{ margin: 0 }}>{`${payload[1].value}kCal`}</p>
      </div>
    )
  }

  return null
}

function CustomCursor({ x, width }) {
  const cursorWidth = 56
  const cursorX = x + width / 2 - cursorWidth / 2
  const cursorY = 39

  return (
    <rect
      x={cursorX}
      y={cursorY}
      width={cursorWidth}
      height="65%"
      fill="#C4C4C480"
      className="graph__cursor"
    />
  )
}

function BarChartComponent({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  if (!data || !data.sessions) return null

  const formattedData = data.sessions.map((session) => ({
    date: new Date(session.day).toLocaleDateString('fr-FR', {
      day: 'numeric',
    }),
    kilogram: session.kilogram,
    calories: session.calories,
  }))

  const values = formattedData.map((d) => d.kilogram)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  let minScale = minValue - 1
  let maxScale = maxValue

  const ticks = []
  for (let i = minScale; i <= maxScale; i++) {
    ticks.push(i)
  }

  const handleMouseOver = (data, index) => {
    setHoveredIndex(index)
  }

  const handleMouseOut = () => {
    setHoveredIndex(null)
  }

  return (
    <div className="graph">
      <div className="graph__header">
        <h2 className="graph__header--title">Activité quotidienne</h2>
        <ul
          className="graph__header--legend"
          style={{
            padding: 0,
            margin: 0,
            textAlign: 'right',
            listStyle: 'none',
          }}
        >
          <li
            className="graph__header--legend--item"
            style={{ display: 'inline-block', marginRight: '10px' }}
          >
            <svg
              className="graph__header--legend--icon"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: '4px',
              }}
            >
              <circle cx="4" cy="4" r="4" fill="#282D30" />
            </svg>
            <span className="graph__header--legend--txt">Poids (kg)</span>
          </li>
          <li
            className="graph__header--legend--item"
            style={{ display: 'inline-block', marginRight: '10px' }}
          >
            <svg
              className="graph__header--legend--icon"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: '4px',
              }}
            >
              <circle cx="4" cy="4" r="4" fill="#E60000" />
            </svg>
            <span className="graph__header--legend--txt">
              Calories brûlées (kCal)
            </span>
          </li>
        </ul>
      </div>
      <ResponsiveContainer width="96%" height="80%">
        <BarChart
          data={formattedData}
          margin={{ top: 40, right: 20, bottom: 20, left: 43 }}
          barGap={8}
          onMouseOver={(data, index) => handleMouseOver(data, index)}
          onMouseOut={handleMouseOut}
        >
          <CartesianGrid
            className="graph__content"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            scale="point"
            tickLine={false}
            axisLine={{ stroke: '#DEDEDE' }}
            tick={{ fill: '#9B9EAC' }}
            tickMargin={16}
            padding={{ left: 10, right: 10 }}
            className="graph__x"
          />
          <YAxis
            yAxisId="left"
            orientation="right"
            domain={[minScale, maxScale]}
            axisLine={false}
            tickLine={false}
            tickMargin={43}
            tick={{ fill: '#9B9EAC' }}
            ticks={ticks}
          />
          <YAxis yAxisId="right" hide={true} className="graph__y" />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          {hoveredIndex !== null && (
            <Rectangle
              x={hoveredIndex * 20} // Adjust the calculation based on your bar width and gap
              y={0}
              width={20}
              height={300} // Adjust this based on the chart's height
              fill="rgba(196, 196, 196, 0.5)"
              className="highlight-rectangle"
            />
          )}
          <Bar
            yAxisId="left"
            dataKey="kilogram"
            barSize={7}
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            shape={<CustomBar />}
            className="graph__bar--kilogram"
            onMouseOver={(data, index) => handleMouseOver(data, index)}
            onMouseOut={handleMouseOut}
          />

          <Bar
            yAxisId="right"
            dataKey="calories"
            barSize={7}
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            shape={<CustomBar />}
            className="graph__bar--calories"
            onMouseOver={(data, index) => handleMouseOver(data, index)}
            onMouseOut={handleMouseOut}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent
