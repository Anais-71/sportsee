import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './bars.css'

function BarChart({ data }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !data.sessions) return

    // Container's available width and height
    const container = svgRef.current.parentElement
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight || 300

    // Define margins
    const margin = { top: 20, right: 20, bottom: 50, left: 60 }
    const width = containerWidth - margin.left - margin.right
    const height = containerHeight - margin.top - margin.bottom

    // Fetch data
    const dataset = data.sessions.map((session) => session.kilogram)
    const dates = data.sessions.map((session) =>
      new Date(session.day).toLocaleDateString('fr-FR', { day: 'numeric' }),
    )

    // Scales
    const xScale = d3.scaleBand().domain(dates).range([0, width]).padding(0.1)

    const yMax = d3.max(dataset)
    const yMin = yMax - 2

    // Y axis scale
    const yScale = d3
      .scaleLinear()
      .domain([Math.floor(yMin), Math.ceil(yMax)])
      .range([height, 0])

    // Calculate ticks for y-axis
    const ticks = [Math.floor(yMin) + 1, Math.ceil(yMax)]

    // Select and clear SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')

    svg.selectAll('*').remove()

    // Add a group for the graph content with margins
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Horizontal grid lines
    g.append('g')
      .attr('class', 'graph__y--gridlines')
      .selectAll('.graph__y--inter')
      .data(ticks)
      .enter()
      .append('line')
      .attr('class', 'graph__y--inter')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4 2')

    // Bars
    g.append('g')
      .attr('class', 'graph__bars')
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'graph__bars--bar')
      .attr('x', (d, i) => xScale(dates[i]))
      .attr('y', (d) => yScale(d))
      .attr('height', (d) => height - yScale(d))
      .attr('width', xScale.bandwidth())

    // Axis
    const xAxis = d3.axisBottom(xScale)
    const yAxisRight = d3
      .axisRight(yScale)
      .tickValues([Math.floor(yMin), ...ticks])
      .tickFormat(d3.format('d'))

    // Add x axis to the SVG
    const xAxisGroup = g
      .append('g')
      .attr('class', 'graph__x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    xAxisGroup.selectAll('.tick').attr('class', 'graph__x--tick')
    xAxisGroup.select('.domain').attr('class', 'graph__x--domain')

    // Add y axis to the SVG
    const yAxisGroup = g
      .append('g')
      .attr('class', 'graph__y-axis')
      .attr('transform', `translate(${width}, 0)`)
      .call(yAxisRight)

    yAxisGroup.selectAll('.tick').attr('class', 'graph__y--tick')
    yAxisGroup.select('.domain').attr('class', 'graph__y--domain')
  }, [data])

  return (
    <div className="graph__container">
      <h2 className="graph__title">Activité quotidienne</h2>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default BarChart
