import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './bars.css'

function BarChart({ data }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !data.sessions) return // Vérifiez que les données sont présentes

    // Calculer la largeur disponible du conteneur
    const containerWidth = svgRef.current.parentElement.clientWidth

    // Définir les dimensions du graphique
    const width = containerWidth
    const height = 300 // Hauteur fixe
    const margin = { top: 40, right: 29, bottom: 30, left: 43 } // Marges spécifiées

    const dataset = data.sessions.map((session) => session.kilogram)
    const dates = data.sessions.map((session) =>
      new Date(session.day).toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
      }),
    )

    const nbBar = dataset.length
    const spaceBetweenBar = 5
    const widthBar = (width - margin.left - margin.right) / nbBar

    const scale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([height - margin.bottom - margin.top, 0])

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height + margin.top)

    svg.selectAll('*').remove()

    svg
      .append('text')
      .attr('class', 'graph__title')
      .attr('y', margin.top / 2)
      .attr('x', margin.left)
      .text('Activité quotidienne')

    const bars = svg
      .append('g')
      .attr('class', 'graph__bars')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    bars
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'graph__bars--bar')
      .attr('x', (d, i) => i * widthBar)
      .attr('y', (d) => scale(d))
      .attr('height', (d) => height - margin.bottom - margin.top - scale(d))
      .attr('width', widthBar - spaceBetweenBar)

    // Ajout des axes
    const xAxis = d3.axisBottom(
      d3
        .scaleBand()
        .domain(dates)
        .range([0, width - margin.left - margin.right]),
    )

    const yAxisRight = d3.axisRight(scale)

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)

    svg
      .append('g')
      .attr('transform', `translate(${width - margin.right}, ${margin.top})`)
      .call(yAxisRight)
      .attr('class', 'y-axis-right')
  }, [data])

  return <svg ref={svgRef} style={{ width: '100%' }}></svg>
}

export default BarChart
