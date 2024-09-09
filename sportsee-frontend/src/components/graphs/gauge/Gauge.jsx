import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import './gauge.css'

const CustomLabel = ({ score }) => {
  return (
    <div className="graph__gauge--label">
      <span className="graph__gauge--label--pct">
        {Math.round(score * 100)}%
      </span>
      <span className="graph__gauge--label--txt">de votre objectif</span>
    </div>
  )
}

const GaugeChartComponent = ({ data }) => {
  const score = data.todayScore || data.score || 0
  const pieData = [
    { name: 'Completed', value: score * 100 },
    { name: 'Remaining', value: 100 - score * 100 },
  ]

  return (
    <div className="graph__gauge">
      <h2 className="graph__gauge--title">Score</h2>
      <ResponsiveContainer width="100%" height={263}>
        <PieChart>
          {/* Pie pour l'intérieur blanc */}
          <Pie
            data={[{ name: 'Background', value: 100 }]}
            dataKey="value"
            outerRadius={70} // Doit correspondre à innerRadius de la première Pie
            fill="#fff" // Couleur blanche pour l'intérieur
            startAngle={90}
            endAngle={450}
          />
          {/* Pie pour le reste du graphique */}
          <Pie
            className="graph__gauge--pie"
            data={pieData}
            dataKey="value"
            innerRadius={70}
            outerRadius={80}
            cornerRadius={10}
            startAngle={90}
            endAngle={450}
            paddingAngle={5}
            labelLine={false}
            label={({ cx, cy }) => (
              <foreignObject x={cx - 50} y={cy - 50} width={100} height={100}>
                <CustomLabel score={score} />
              </foreignObject>
            )}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className={`graph__gauge--${entry.name.toLowerCase()}`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GaugeChartComponent
