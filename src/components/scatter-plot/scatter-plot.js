import {max, min} from 'd3-array';
import {axisBottom, axisLeft} from 'd3-axis';
import {easeLinear} from 'd3-ease';
import {scaleOrdinal, scaleLinear} from 'd3-scale';
import {schemeCategory10} from 'd3-scale-chromatic';
import {select} from 'd3-selection';
import {transition} from 'd3-transition';
import React, {useEffect, useCallback, useRef} from 'react';

const ScatterPlot = ({chartData}) => {
  const svgRef = useRef(null);
  const parent = useRef(null);

  const init = useCallback(() => {
    const margin = {top: 20, right: 20, bottom: 80, left: 200};
    const leftTickSpace = 40;
    const width = Math.max(
      Math.min(parent.current.clientWidth, 1508) - margin.left - margin.right,
      50
    );
    const height = Math.max(
      Math.min(parent.current.clientWidth, 1508) * 0.65 -
        margin.top -
        margin.bottom,
      50
    );

    const xScale = scaleLinear().range([0, width]);
    const yScale = scaleLinear().range([height, 0]);
    const xAxis = axisBottom(xScale).ticks(10).tickSize(-height);
    const yAxis = axisLeft(yScale).ticks(10).tickSize(-width);

    const color = scaleOrdinal(schemeCategory10);
    const tooltipAnimation = (duration) =>
      transition().duration(duration).ease(easeLinear);

    const tooltip = select('body')
      .append('div')
      .attr('class', 'scatter-tooltip')
      .style('opacity', 0);

    // setup x
    function xValue(d) {
      return d['totalScore'];
    }
    function xMap(d) {
      return xScale(xValue(d));
    }
    function yMap(d) {
      return yScale(yValue(d));
    }
    // setup y
    function yValue(d) {
      return parseFloat(d['publicHealthFundingPerCapita']) || 0;
    }

    // setup fill color
    function cValue(d) {
      return d.state;
    }

    const svgContainer = select(svgRef.current);

    svgContainer
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const legendGSelection = svgContainer
      .selectAll('g.legend-g')
      .data([1], (d) => d);
    const legendG = legendGSelection
      .enter()
      .append('g')
      .merge(legendGSelection)
      .attr('class', 'legend-g');
    legendGSelection.exit().remove();
    const wrap = (text, width) => {
      text.each(function () {
        const text = select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.2; // ems
        const dy = parseFloat(0);
        let tspan = text
          .text(null)
          .append('tspan')
          .attr('x', 0)
          .attr('dx', -5)
          .attr('y', 0)
          .attr('dy', dy + 'em');
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = select(this)
              .append('tspan')
              .attr('x', 0)
              .attr('dx', -5)
              .attr('y', 0)
              .attr('dy', ++lineNumber * lineHeight + dy + 'em')
              .text(word);
          }
        }
      });
    };
    const yLabelSelection = legendG
      .selectAll('text.yLabel')
      .data(['Public Health Funding Per Capita($)'], (d) => d);
    yLabelSelection
      .enter()
      .append('text')
      .merge(yLabelSelection)
      .attr('class', 'yLabel')
      .attr(
        'transform',
        `translate(${(margin.left - leftTickSpace) / 2}, ${height / 2})`
      )
      // .style('dominant-baseline', 'middle')
      .style('font-size', '24px')
      .style('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('alignment-baseline', 'center')
      .style('font-weight', 'bold')
      .style('fill', '#535353')
      .attr('dx', -5)
      .text((d) => d)
      .call(wrap, margin.left - leftTickSpace);
    yLabelSelection.exit().remove();
    const xLabelSelection = legendG
      .selectAll('text.xLabel')
      .data(['State Grade Score (out of 100)'], (d) => d);
    xLabelSelection
      .enter()
      .append('text')
      .merge(xLabelSelection)
      .attr('class', 'xLabel')
      .attr('x', margin.left + width / 2)
      .attr('y', margin.top + (margin.bottom - 10) + height)
      .style('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('fill', '#535353')
      .style('font-weight', 'bold')
      .style('dominant-baseline', 'middle')
      .text((d) => d);
    xLabelSelection.exit().remove();

    const gSelection = svgContainer.selectAll('g.g-group').data([1], (d) => d);

    const g = gSelection
      .enter()
      .append('g')
      .merge(gSelection)
      .attr('class', 'g-group')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    gSelection.exit().remove();

    const gXSelection = g.selectAll('g.x').data([1], (d) => d);
    gXSelection
      .enter()
      .append('g')
      .merge(gXSelection)
      .attr('class', 'x axis')
      .style('font', 'italic normal normal 16px/19px Roboto')
      .style('color', '#535353')
      .attr('transform', 'translate(0,' + height + ')');
    gXSelection.exit().remove();
    const gYSelection = g.selectAll('g.y').data([1], (d) => d);

    gYSelection
      .enter()
      .append('g')
      .merge(gYSelection)
      .attr('class', 'y axis')
      .style('font', 'italic normal normal 16px/19px Roboto')
      .style('color', '#535353');
    gYSelection.exit().remove();
    const gDotSelection = g.selectAll('g.dot-container').data([1], (d) => d);

    const dotG = gDotSelection
      .enter()
      .append('g')
      .merge(gDotSelection)
      .attr('class', 'dot-container');
    gDotSelection.exit().remove();
    const updateChart = () => {
      xScale.domain([min(chartData, xValue), max(chartData, xValue)]);
      const maxLimit = max(chartData, yValue);
      yScale.domain([-10, maxLimit + maxLimit * 0.1]);
      g.select('g.x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);
      g.select('g.x').select('path.domain').attr('d', `M0,0 H${width}, 0`);
      g.select('g.y').call(yAxis);
      g.select('g.y').select('path.domain').attr('d', `M0,0 V0,${height}`);
      g.select('g.y').selectAll('text').attr('x', `-15`);
      g.select('g.x').selectAll('text').attr('y', `15`);
      const circleDot = dotG.selectAll('.dot').data(chartData);
      circleDot
        .enter()
        .append('circle')
        .merge(circleDot)
        .attr('class', 'dot')
        .attr('r', 8)
        .attr('cx', xMap)
        .attr('cy', yMap)
        .style('fill', function (d) {
          return '#fff';
        })
        .style('fill-opacity', '0.7')
        .style('stroke', function (d) {
          return color(cValue(d));
        })
        .style('stroke-width', '3px')
        .on('mouseenter', function (d) {
          tipMouseover(this, d);
        })
        .on('mouseover', function (d) {
          tipMouseover(this, d);
        })
        .on('mouseout', function (d) {
          tipMouseout(this, d);
        });
      circleDot.exit().remove();
    };

    const tipMouseover = (ele, d) => {
      const elementData = select(ele).data()[0];
      select(ele)
        .style('z-index', '200')
        .style('cursor', 'pointer')
        .style('fill', function (d) {
          return color(cValue(d));
        });

      const html =
        '<b>' +
        elementData.state +
        ' (' +
        elementData.abbreviation +
        ') </b>' +
        '<br/> Score: ' +
        elementData['totalScore'] +
        '<br/>' +
        'Funding Per Capita : $' +
        (elementData['publicHealthFundingPerCapita']
          ? elementData['publicHealthFundingPerCapita']
          : 0);
      tooltip
        .html(html)
        .style('left', d.pageX + 15 + 'px')
        .style('top', d.pageY - 28 + 'px')
        .style('display', 'block')
        .transition(tooltipAnimation(250)) // ms
        .style('opacity', 0.9); // started as 0!
    };

    // tooltip mouseout event handler
    const tipMouseout = (ele, d) => {
      select(ele)
        .style('z-index', '-1')
        .style('fill', function (d) {
          return '#fff';
        });
      tooltip
        .transition(tooltipAnimation(0)) // ms
        .style('display', 'none')
        .style('opacity', 0); // don't care about position!
    };

    updateChart();
  }, [chartData]);

  useEffect(() => {
    init();
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [init]);

  return (
    <div
      ref={parent}
      className="scatter-plot w-100 d-flex justify-content-center"
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ScatterPlot;
