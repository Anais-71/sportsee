import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// CSS
import './lines.css'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { value } = payload[0]
    return (
      <div className="graph__lines--tooltip">
        <p>{`${value} min`}</p>
      </div>
    )
  }

  return null
}

function CustomCursor({ points }) {
  return (
    <rect
      className="graph__lines--cursor"
      fill="#000000"
      opacity={0.1}
      x={points[0].x}
      height={263}
      width="100%"
    />
  )
}
function LinesChartComponent({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>
  }

  return (
    <div className="graph__lines">
      <h2 className="graph__lines--title">
        Durée moyenne des <br />
        sessions
      </h2>

      <ResponsiveContainer
        width="100%"
        height={130}
        style={{ overflow: 'visible' }}
      >
        <LineChart data={data}>
          <CartesianGrid display="none" />
          <XAxis hide={true} />
          <YAxis hide={true} />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#fff"
            strokeWidth={2}
            strokeOpacity={0.5}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="graph__lines--ticks">
        <p>L</p>
        <p>M</p>
        <p>M</p>
        <p>J</p>
        <p>V</p>
        <p>S</p>
        <p>D</p>
      </div>
    </div>
  )
}

export default LinesChartComponent
