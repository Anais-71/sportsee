import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

// CSS
import './radar.css'

// Custom ticks
const CustomAngleTick = (props) => {
  const { x, y, payload, cx, cy } = props
  const RADAR_TICK_OFFSET = 15

  const deltaX = x - cx
  const deltaY = y - cy

  const newX =
    x +
    (deltaX * RADAR_TICK_OFFSET) / Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const newY =
    y +
    (deltaY * RADAR_TICK_OFFSET) / Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  return (
    <text x={newX} y={newY} textAnchor="middle" className="graph__radar--tick">
      {payload.value}
    </text>
  )
}

function RadarChartComponent({ data }) {
  if (!data || data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="graph__radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={90} data={data}>
          <PolarGrid
            className="graph__radar--polar--grid"
            radialLines={false}
            stroke="#FFFFFF"
            strokeWidth={1}
            polarRadius={[11.25, 22.5, 45, 67.5, 90]}
            gridType="polygon"
          />
          <PolarAngleAxis dataKey="subject" tick={<CustomAngleTick />} />
          <PolarRadiusAxis
            className="graph__radar--polar--radius"
            axisLine={false}
            tick={false}
          />

          <Radar
            name="Performance"
            dataKey="value"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RadarChartComponent
