import {max, min} from 'd3-array';
import {axisBottom, axisLeft} from 'd3-axis';
import {easeLinear} from 'd3-ease';
import {scaleOrdinal, scaleLinear} from 'd3-scale';
import {select} from 'd3-selection';
import {transition} from 'd3-transition';
import React, {useEffect, useCallback, useRef} from 'react';

const ScatterPlot = ({chartData}) => {
  const svgRef = useRef(null);
  const parent = useRef(null);

  const init = useCallback(() => {
    const margin = {top: 20, right: 20, bottom: 80, left: 200};
    const leftTickSpace = 40;
    const colorData = ['A', 'B', 'C', 'D', 'F'];
    const color = scaleOrdinal()
      .domain(colorData)
      .range(['#949acd', '#8cccd8', '#ffdfa3', '#ffbaaf', '#cd98ae']);
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
    const xValue = (d) => {
      return parseFloat(d['totalScore']);
    };

    const xMap = (d) => xScale(xValue(d));

    const yMap = (d) => yScale(yValue(d));

    const yValue = (d) => parseFloat(d['publicHealthFundingPerCapita']) || 0;

    const cValue = (d) => {
      const totalScore = parseFloat(d.totalScore);
      if (100 >= totalScore && totalScore >= 90) {
        return color('A');
      } else if (90 >= totalScore && totalScore >= 80) {
        return color('B');
      } else if (80 >= totalScore && totalScore >= 70) {
        return color('C');
      } else if (70 >= totalScore && totalScore >= 60) {
        return color('D');
      } else {
        return color('F');
      }
    };

    const xScale = scaleLinear()
      .range([0, width])
      .domain([
        Math.max(0, min(chartData, xValue) - min(chartData, xValue) * 0.1),
        Math.min(max(chartData, xValue) + max(chartData, xValue) * 0.1, 100),
      ]);
    const maxLimit = max(chartData, yValue);
    const yScale = scaleLinear()
      .range([height, 0])
      .domain([-10, maxLimit + maxLimit * 0.1]);

    const xAxis = axisBottom(xScale).ticks(10).tickSize(-height);
    const yAxis = axisLeft(yScale).ticks(10).tickSize(-width);

    const tooltipAnimation = (duration) =>
      transition().duration(duration).ease(easeLinear);

    const tooltip = select('body')
      .append('div')
      .attr('class', 'scatter-tooltip')
      .style('opacity', 0);

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
        const allText = text.text();
        let words = allText.split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.2; // ems
        const dy = parseFloat(0);
        let tspan = text
          .text(null)
          .append('tspan')
          .style('font-weight', 'bold')
          .attr('x', 0)
          .attr('dx', -5)
          .attr('y', 0)
          .attr('dy', dy + 'em');
        if (allText.indexOf('($)') > -1) {
          words = allText.replace('($)', '').split(/\s+/).reverse();
        }
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(' '));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = select(this)
              .append('tspan')
              .style('font-weight', 'bold')
              .attr('x', 0)
              .attr('dx', -5)
              .attr('y', 0)
              .attr('dy', ++lineNumber * lineHeight + dy + 'em')
              .text(word);
          }
        }
        if (allText.indexOf('($)') > -1) {
          text.append('tspan').text(' ($)');
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
      .style('font-size', '24px')
      .style('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('alignment-baseline', 'center')
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
      .style('dominant-baseline', 'middle');
    xLabelSelection.exit().remove();
    const xLabelT = legendG.selectAll('text.xLabel').text(null);
    xLabelT.append('tspan').text('State Grade Score ');
    xLabelT.append('tspan').style('font-weight', 'normal').text('(out of 100)');

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
    const xAxisG = g.select('g.x');
    xAxisG.call(xAxis);
    xAxisG.select('path.domain').attr('d', `M0,0 H${width}, 0`);
    xAxisG.selectAll('text').attr('y', `15`);
    const gYSelection = g.selectAll('g.y').data([1], (d) => d);

    gYSelection
      .enter()
      .append('g')
      .merge(gYSelection)
      .attr('class', 'y axis')
      .style('font', 'italic normal normal 16px/19px Roboto')
      .style('color', '#535353');
    gYSelection.exit().remove();
    const yAxisG = g.select('g.y');
    yAxisG.call(yAxis);
    yAxisG.select('path.domain').attr('d', `M0,0 V0,${height}`);
    yAxisG.selectAll('text').attr('x', `-15`);
    const gDotSelection = g.selectAll('g.dot-container').data([1], (d) => d);

    const dotG = gDotSelection
      .enter()
      .append('g')
      .merge(gDotSelection)
      .attr('class', 'dot-container');
    gDotSelection.exit().remove();

    const tipMouseover = (ele, d) => {
      const elementData = select(ele).data()[0];
      if (
        !select(
          '#' + elementData.state.replace(/ /gi, '-') + '-tooltip'
        ).empty()
      ) {
        return;
      }
      select(ele)
        .style('z-index', '200')
        .style('cursor', 'pointer')
        .style('fill', cValue);

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
    const toggleTooltip = (ele, d) => {
      const elementData = select(ele).data()[0];
      let dotTooltip = select(
        '#' + elementData.state.replace(/ /gi, '-') + '-tooltip'
      );
      if (dotTooltip.empty()) {
        tipMouseout(ele, d);
        dotTooltip = select('body')
          .append('div')
          .attr('id', elementData.state.replace(/ /gi, '-') + '-tooltip')
          .attr('class', 'scatter-tooltip')
          .style('opacity', 0);
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
        dotTooltip
          .html(html)
          .style('left', d.pageX + 15 + 'px')
          .style('top', d.pageY - 28 + 'px')
          .style('display', 'block')
          .transition(tooltipAnimation(250)) // ms
          .style('opacity', 0.9); // started as 0!
      } else {
        dotTooltip.remove();
      }
      select(ele)
        .style('z-index', '200')
        .style('cursor', 'pointer')
        .style('fill', function (d) {
          return '#' + d.state.replace(/ /gi, '-') + 'tooltip'.empty()
            ? '#fff'
            : cValue(d);
        });
    };

    // Tooltip mouseout event handler
    const tipMouseout = (ele, d) => {
      select(ele)
        .style('z-index', '-1')
        .style('fill', function (d) {
          return select('#' + d.state.replace(/ /gi, '-') + '-tooltip').empty()
            ? '#fff'
            : cValue(d);
        });
      tooltip
        .transition(tooltipAnimation(0)) // ms
        .style('display', 'none')
        .style('opacity', 0); // don't care about position!
    };
    // CircleDot Enter,Update,Exit
    const circleDot = dotG.selectAll('circle.dot').data(chartData);
    circleDot
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 8)
      .style('fill-opacity', '0.7')
      .style('stroke-width', '3px')
      .on('click', function (d) {
        toggleTooltip(this, d);
      })
      .on('mouseenter', function (d) {
        tipMouseover(this, d);
      })
      .on('mouseover', function (d) {
        tipMouseover(this, d);
      })
      .on('mouseout', function (d) {
        tipMouseout(this, d);
      })
      .merge(circleDot)
      .style('fill', function (d) {
        return '#' + d.state.replace(/ /gi, '-') + 'tooltip'.empty()
          ? '#fff'
          : cValue(d);
      })
      .attr('cx', xMap)
      .attr('cy', yMap)
      .style('stroke', cValue);
    circleDot.exit().remove();
  }, [chartData]);

  useEffect(() => {
    init();
    const handleResize = () => {
      init();
    };
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
      <span className={'scatter-plot-source'}>
        Source:{' '}
        <a href="http://statehealthcompare.shadac.org/map/117/per-person-state-public-health-funding#a/27/154">
          StateHealthCompare.org
        </a>
      </span>
    </div>
  );
};

export default ScatterPlot;
