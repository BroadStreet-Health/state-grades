import {max, range} from 'd3-array';
import {interpolate} from 'd3-interpolate';
import {scaleOrdinal, scaleLinear, scaleBand} from 'd3-scale';
import {select} from 'd3-selection';
import {stack, arc, pie} from 'd3-shape';
import React, {useEffect, useCallback, useRef} from 'react';

const BarStackChart = ({chartData, chartDataColumns, pieChartData}) => {
  const svgRef = useRef(null);
  const parent = useRef(null);

  const init = useCallback(() => {
    const margin = {top: 10, right: 0, bottom: 40, left: 150};
    const legendHeight = 75;
    const stackBarSpace = 6;
    const innerRadius = 0.54;
    const outerRadius = 0.8;
    const pieData = pieChartData
      .map((d) => {
        return {label: d.categoryName, value: +d.categoryWeight};
      })
      .filter((d) => d.value !== 100);
    // legendScale.domain(['A']);
    let width = Math.max(
      parent.current.clientWidth - margin.left - margin.right,
      50
    );
    const rangeObj = {
      A: '90 - 100',
      B: '80 - 90',
      C: '70 - 80',
      D: '60 - 70',
      F: '0 - 60',
    };
    let height = Math.max(600 - margin.top - margin.bottom, 50);
    let pieChartWidth = Math.min(width * 0.4, height);
    let radius = pieChartWidth / 2;
    let stackedBarChartWidth = width - pieChartWidth;
    let fontSize = '18px';
    let stackedBarChartT = '';
    let isMobileScreen = false;
    let pieChartGT = '';
    let legendContainerT = '';
    let xAxisLabelT = '';
    let yScaleH = 0;

    const resetVarForResponsive = () => {
      if (width < 425) {
        margin.left = 70;
        margin.right = 0;
        width = Math.max(
          parent.current.clientWidth - margin.left - margin.right,
          50
        );
        pieChartWidth = Math.min(parent.current.clientWidth, height);
        radius = pieChartWidth / 2;
        height = Math.max(800 - margin.top - margin.bottom, 50);
        yScaleH = height - pieChartWidth - margin.bottom;
        fontSize = 10;
        stackedBarChartWidth = width;
        pieChartGT = `translate(${pieChartWidth / 2},${radius})`;
        stackedBarChartT = `translate(
          0,
          ${margin.top + legendHeight + pieChartWidth}
        )`;
        legendContainerT = `translate(
          ${width - stackedBarChartWidth},
          ${margin.top + pieChartWidth}
        )`;
        xAxisLabelT = `translate(
          ${margin.left + stackedBarChartWidth / 2},
          ${height - pieChartWidth}
        )`;
        isMobileScreen = true;
      } else if (width < 768) {
        margin.left = 100;
        margin.right = 0;
        width = Math.max(
          parent.current.clientWidth - margin.left - margin.right,
          50
        );
        pieChartWidth = Math.min(width * 0.6, height);
        radius = pieChartWidth / 2;
        height = Math.max(800 - margin.top - margin.bottom, 50);
        yScaleH = height - pieChartWidth - margin.bottom;
        fontSize = 14;
        stackedBarChartWidth = width;
        pieChartGT = `translate(${width / 2 + radius / 3},${radius})`;
        stackedBarChartT = `translate(
          0,
          ${margin.top + legendHeight + pieChartWidth}
        )`;
        legendContainerT = `translate(
          ${width - stackedBarChartWidth + margin.left},
          ${margin.top + pieChartWidth}
        )`;
        xAxisLabelT = `translate(
          ${margin.left + stackedBarChartWidth / 2},
          ${height - pieChartWidth}
        )`;
        isMobileScreen = true;
      } else if (width < 1024) {
        margin.left = 150;
        margin.right = 0;
        width = Math.max(
          parent.current.clientWidth - margin.left - margin.right,
          50
        );
        pieChartWidth = Math.min(width * 0.4, height);
        radius = pieChartWidth / 2;
        height = Math.max(600 - margin.top - margin.bottom, 50);
        yScaleH = height - margin.bottom;
        fontSize = 16;
        stackedBarChartWidth = width - pieChartWidth;
        stackedBarChartT = `translate(
          ${pieChartWidth},
          ${margin.top + legendHeight}
        )`;
        pieChartGT = `translate(
          ${pieChartWidth / 2},
          ${height / 2 + legendHeight + (margin.top + margin.bottom) / 2}
        )`;
        legendContainerT = `translate(
          ${width - stackedBarChartWidth + margin.left},
          ${margin.top}
        )`;
        xAxisLabelT = `translate(
          ${margin.left + stackedBarChartWidth / 2},
          ${height - 20}
        )`;
        isMobileScreen = true;
      } else {
        margin.left = 150;
        margin.right = 0;
        width = Math.max(
          parent.current.clientWidth - margin.left - margin.right,
          50
        );
        pieChartWidth = Math.min(width * 0.4, height);
        radius = pieChartWidth / 2;
        height = Math.max(600 - margin.top - margin.bottom, 50);
        yScaleH = height - margin.bottom;
        fontSize = 18;
        stackedBarChartWidth = width - pieChartWidth;
        stackedBarChartT = `translate(
          ${pieChartWidth},
          ${margin.top + legendHeight}
        )`;
        pieChartGT = `translate(
          ${pieChartWidth / 2},
          ${height / 2 + legendHeight + (margin.top + margin.bottom) / 2}
        )`;
        legendContainerT = `translate(
          ${width - stackedBarChartWidth + margin.left},
          ${margin.top}
        )`;
        xAxisLabelT = `translate(
          ${margin.left + stackedBarChartWidth / 2},
          ${height - 20}
        )`;
        isMobileScreen = false;
      }
    };

    resetVarForResponsive();

    const createElement = (parent, element, className, data, dataCheck) => {
      const selection = parent
        .selectAll(element + '.' + className)
        .data(data, dataCheck);
      selection.exit().remove();
      const selectionList = selection
        .enter()
        .append(element)
        .merge(selection)
        .attr('class', className);
      if (data.length > 1) {
        return selectionList;
      }
      return parent.select(element + '.' + className);
    };

    const wrap = (text, width) => {
      text.each(function () {
        const text = select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 0.9; // ems
        const y = text.attr('y');
        const dy = parseFloat(text.attr('dy'));
        let tspan = text
          .text(null)
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dx', -5)
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
              .attr('y', y)
              .attr('dx', -5)
              .attr('dy', ++lineNumber * lineHeight + dy + 'em')
              .style('font-weight', word === 'Scores from' ? 'normal' : null)
              .text(word);
          }
        }
      });
    };

    const svg = select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + legendHeight);

    const stackedBarChartG = createElement(
      svg,
      'g',
      'stack-bar-chart-group',
      [1],
      (d) => d
    ).attr('transform', stackedBarChartT);
    const legendContainer = createElement(
      svg,
      'g',
      'stack-bar-legend-container',
      [1],
      (d) => d
    ).attr('transform', legendContainerT);

    const barsG = createElement(
      stackedBarChartG,
      'g',
      'bars-group',
      [1],
      (d) => d
    ).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const pieChartG = createElement(svg, 'g', 'pie-group', [1], (d) => d).attr(
      'transform',
      pieChartGT
    );

    const pieLinesG = createElement(
      pieChartG,
      'g',
      'pieLines',
      [1],
      (d) => d
    ).attr('style', `display: ${width < 768 ? 'none' : 'block'}`);
    createElement(
      pieChartG,
      'text',
      'pie-center-label',
      ['Total State Grade', 'Score out of', '100 points'],
      (d) => d
    )
      .attr('class', 'pie-center-label')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', fontSize + 4)
      .attr('fill', (d, i) => (i === 2 ? '#008faa' : '#535353'))
      .attr('dy', (d, i) => range(-1, 2.8, 1.4)[i] + 'em')
      .text((d) => d);

    const axisLabel = createElement(
      stackedBarChartG,
      'g',
      'axisLabel',
      [1],
      (d) => d
    ).attr('class', 'axisLabel');

    const xAxisLabel = createElement(
      axisLabel,
      'text',
      'xLabelText',
      [1],
      (d) => d
    );
    xAxisLabel
      .attr('class', 'xLabelText')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', 0)
      .attr('transform', xAxisLabelT)
      .style('text-anchor', 'middle')
      .style('font-size', fontSize)
      .style('font-weight', 'bold')
      .style('font-style', 'italic')
      .style('dominant-baseline', 'middle')
      .style('fill', '#535353')
      .text(
        'Counts represent the number of states in each respective subgrade category.'
      )
      .call(wrap, stackedBarChartWidth);

    const yAxisG = createElement(stackedBarChartG, 'g', 'y', [1], (d) => d);
    yAxisG
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const color = scaleOrdinal()
      .domain(chartDataColumns)
      .range(['#101b7e', '#1f9bb3', '#ffba38', '#fd745c', '#a13f68']);

    const legendScale = scaleBand()
      .domain(chartDataColumns)
      .range([
        15,
        (width < 425 ? pieChartWidth : stackedBarChartWidth) - margin.right,
      ]);
    const xScale = scaleLinear()
      .range([15, stackedBarChartWidth - margin.right])
      .domain([0, max(chartData, (d) => d.total)])
      .nice();

    const yScale = scaleBand()
      .range([margin.top, yScaleH])
      .padding(0.1)
      .paddingOuter(0.24)
      .paddingInner(0.24)
      .domain(chartData.map((d) => d.category));

    const d3pie = pie()
      .startAngle(Math.PI / 1.3)
      .endAngle(Math.PI * 2 + Math.PI / 1.3)
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .value((d) => {
        return d.value;
      });

    const pathArc = arc()
      .outerRadius(radius * outerRadius)
      .innerRadius(radius * innerRadius);
    const outerArc = arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);

    const getLinePath = (d) => {
      const centerAngle = (Math.PI * 2 + Math.PI / 1.3 + Math.PI / 1.3) / 2;
      const targetElement = yAxisG.select(
        'text#' + d.data.label.replaceAll(' ', '').replaceAll('-', '')
      );
      const centerObj = {
        innerRadius,
        outerRadius,
        startAngle: d.endAngle,
        endAngle: (d.startAngle + d.endAngle) / 2,
      };
      const textBBox = targetElement.node().getBBox();
      const pos = outerArc.centroid(centerObj);
      const lastPointerPosition = [];
      lastPointerPosition[0] =
        pieChartWidth - pieChartWidth / 2 + textBBox.x + margin.left;
      const textBoxX =
        textBBox.height > 25 ? textBBox.height / 2 : textBBox.height / 2 - 5;
      lastPointerPosition[1] = -(height / 2) + textBBox.y + textBoxX;

      const x = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
      if (d.startAngle < centerAngle || d.endAngle < centerAngle) {
        const diff =
          Math.round(centerAngle - d.startAngle) -
          Math.ceil(d.endAngle - centerAngle);
        if (diff > 0) {
          const slicesPointers = [];
          for (let i = 1; i < diff; i++) {
            const pointer = [];
            const newAngle = (d.startAngle + d.endAngle) / 2 + (diff / 3) * i;
            pointer[0] =
              Math.cos(newAngle - Math.PI / 2) *
              (radius - 5) *
              (midAngle(d) < Math.PI + Math.PI / 1.3 ? 1 : -1);
            pointer[1] =
              Math.sin(newAngle - Math.PI / 2) *
              radius *
              (midAngle(d) < Math.PI + Math.PI / 1.3 ? 1 : -1);
            slicesPointers.push(pointer);
          }
          const pointersArray = [
            pathArc.centroid(centerObj),
            outerArc.centroid(centerObj),
          ];
          slicesPointers.forEach((d) => {
            pointersArray.push(d);
          });
          pointersArray.push(lastPointerPosition);
          return pointersArray;
        } else {
          pos[0] = Math.max(
            radius * 0.95 * (d.endAngle / (Math.PI / 1.3) < Math.PI ? 1 : -1),
            Math.cos(x) * radius +
              (midAngle(centerObj) < Math.PI + Math.PI / 1.3 ? 1 : -1)
          );
          pos[1] = Math.min(
            Math.sin(d.endAngle - Math.PI / 2) *
              radius *
              (midAngle(d) < Math.PI + Math.PI / 1.3 ? 1 : -1),
            Math.sin(x) *
              radius *
              (midAngle(d) < Math.PI + Math.PI / 1.3 ? 1 : -1)
          );
        }
        return [
          pathArc.centroid(centerObj),
          outerArc.centroid(centerObj),
          pos,
          lastPointerPosition,
        ];
      }
      return [pathArc.centroid(d), outerArc.centroid(d), lastPointerPosition];
    };

    const enterAndUpdatePieLines = () => {
      const polyline = pieLinesG
        .selectAll('polyline')
        .data(d3pie(pieData), (d) => d.data.label);
      const enter = polyline.enter().append('polyline');
      enter
        .merge(polyline)
        .style('opacity', '0.3')
        .style('stroke', 'black')
        .style('stroke-width', '1px')
        .style('fill', 'none')
        .style('stroke-dasharray', '3, 3')
        .attr('points', function (d) {
          return getLinePath(d);
        });

      polyline.exit().remove();
    };

    const enterAndUpdateYAxisText = () => {
      const selectYAxisG = yAxisG
        .selectAll('text')
        .data(chartData.map((d) => d.category));
      const enterYAxisG = selectYAxisG.enter().append('text');
      enterYAxisG
        .merge(selectYAxisG)
        .attr('id', (d) => {
          return d.replaceAll(' ', '').replaceAll('-', '');
        })
        .attr('y', (d) => yScale(d))
        .attr('x', 0)
        .attr('text-anchor', 'end')
        .attr('dy', '.35em')
        .attr('font-size', fontSize)
        .attr('font-weight', 'bold')
        .attr('fill', '#535353')
        .attr('dx', -5)
        .text((d) => d)
        .each(function (d) {
          select(this).call(wrap, margin.left);
          const height = select(this).node().getBoundingClientRect().height;
          const a = yScale(d) + yScale.bandwidth() / 2;
          select(this).attr('y', a - height / 2);
          select(this)
            .selectAll('*')
            .attr('y', a - height / 2 + 8);
        });
      selectYAxisG.exit().remove();
    };

    const enterAndUpdateBarGroup = () => {
      const stackedGroup = barsG
        .selectAll('g.layer')
        .data(stack().keys(chartDataColumns)(chartData), (d) => d.key);

      stackedGroup.exit().remove();

      stackedGroup
        .enter()
        .append('g')
        .merge(stackedGroup)
        .classed('layer', true)
        .attr('fill', (d) => color(d.key))
        .attr('fill-opacity', '0.50');
      stackedGroup.exit().remove();
    };

    const enterAndUpdateBarRect = () => {
      const bars = barsG
        .selectAll('g.layer')
        .selectAll('rect')
        .data(
          (d) => d,
          (e) => e.data.category
        );

      bars.exit().remove();

      bars
        .enter()
        .append('rect')
        .merge(bars)
        .attr('height', yScale.bandwidth())
        .attr('y', (d) => yScale(d.data.category))
        .attr('x', (d) => xScale(d[0]))
        .attr('height', yScale.bandwidth())
        .attr('width', (d) => {
          const width = xScale(d[1]) - xScale(d[0]);
          return width > 0
            ? width - stackBarSpace > 0
              ? width - stackBarSpace
              : width
            : width;
        });
    };

    const enterAndUpdateBarText = () => {
      const texts = barsG
        .selectAll('g.layer')
        .selectAll('text')
        .data(
          (d) => d,
          (e) => e.data.category
        );

      texts.exit().remove();

      texts
        .enter()
        .append('text')
        .merge(texts)
        .attr('y', function (d) {
          return yScale(d.data.category) + yScale.bandwidth() / 2;
        })
        .attr('x', (d) => {
          const width = xScale(d[1]) - xScale(d[0]);
          return (
            xScale(d[0]) + (width ? (width - stackBarSpace) / 2 : width / 2)
          );
        })
        .text((d, i) => (d[1] - d[0] ? d[1] - d[0] : ''))
        .style('font-size', fontSize)
        .style('font-weight', '900')
        .style('dominant-baseline', 'central')
        .style('text-anchor', 'middle')
        .attr('fill', '#000');
    };

    const enterAndUpdatePieChartPathAndText = () => {
      const pieD = d3pie(pieData);
      const slicesPath = pieChartG
        .selectAll('path.slice')
        .data(pieD, (d) => d.data.label);

      slicesPath
        .enter()
        .append('path')
        .merge(slicesPath)
        .style('fill', '#C0C0C0')
        .attr('class', 'slice')
        .attr('stroke', 'white')
        .attr('stroke-width', '2px')
        .attr('d', function (d) {
          this._current = this._current || d;
          const i = interpolate(this._current, d);
          this._current = i(0);
          return pathArc(d);
        });
      slicesPath.exit().remove();
      const slicesText = pieChartG
        .selectAll('text.slice-value')
        .data(pieD, (d) => d.data.label);
      slicesText
        .enter()
        .append('text')
        .merge(slicesText)
        .attr('class', 'slice-value')
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .attr('font-size', (d) => d.value / 10 + radius / 20 + 'px')
        .attr('font-weight', 'bold')
        .attr('fill', '#535353')
        .attr('transform', function (d) {
          d.innerRadius = innerRadius;
          d.outerRadius = outerRadius;
          return 'translate(' + pathArc.centroid(d) + ') rotate(15)';
        })
        .text(function (d, i) {
          return d.value + '%';
        });
      slicesText.exit().remove();
      // selectAll('.slice-value');
    };

    const enterAndUpdateLegend = () => {
      const legendSelection = legendContainer
        .selectAll('g.legend-g')
        .data(chartDataColumns, (d) => d);
      const legendG = legendSelection
        .enter()
        .append('g')
        .merge(legendSelection);
      legendG.attr('class', 'legend-g').attr('transform', (d) => {
        return `translate(${
          legendScale(d) + legendScale.bandwidth() / 2
        },${22.5})`;
      });
      legendSelection.exit().remove();
      const circleSelection = legendG.selectAll('circle').data(
        (d) => [d],
        (d) => d
      );
      circleSelection.exit().remove();
      circleSelection
        .enter()
        .append('circle')
        .merge(circleSelection)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 20)
        .style('stroke', (d) => color(d))
        .style('stroke-width', 4)
        .style('fill-opacity', 0.3)
        .style('fill', (d) => color(d));

      const textSelection = legendG.selectAll('text.label').data(
        (d) => [d],
        (d) => d
      );
      textSelection.exit().remove();
      textSelection
        .enter()
        .append('text')
        .merge(textSelection)
        .attr('class', 'label')
        .attr('x', 0)
        .attr('y', 0)
        .style('font-size', '24')
        .style('font-weight', 'bold')
        .style('fill', '#535353')
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .text((d) => d);

      const rangeTextSelection = legendG.selectAll('text.range').data(
        (d) => [d],
        (d) => d
      );
      rangeTextSelection.exit().remove();
      const rangeText = rangeTextSelection
        .enter()
        .append('text')
        .merge(rangeTextSelection);
      rangeText
        .attr('class', 'range')
        .attr('x', 0)
        .attr('y', 0)
        .attr('dy', 0)
        .style('font-size', fontSize)
        .style('fill', '#535353')
        // .style('font-weight', 'bold')
        .style('font-style', 'italic')
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'central')
        .attr('transform', `translate(${0},${50})`)
        .text(null);
      if (isMobileScreen) {
        rangeText
          .append('tspan')
          .attr('x', '0')
          .attr('y', '0')
          .attr('dy', '0em')
          .style('font-weight', 'normal')
          .text('Scores from ');
        rangeText
          .append('tspan')
          .attr('x', '0')
          .attr('y', '0')
          .attr('dy', '1em')
          .text((d) => rangeObj[d])
          .style('font-weight', 'bold');
      } else {
        rangeText
          .append('tspan')
          .style('font-weight', 'normal')
          .text('Scores from ');
        rangeText
          .append('tspan')
          .text((d) => rangeObj[d])
          .style('font-weight', 'bold');
      }
    };
    const midAngle = (d) => {
      return d.startAngle + (d.endAngle - d.startAngle) / 2 / (Math.PI / 1.3);
    };

    enterAndUpdateLegend();
    enterAndUpdateYAxisText();
    enterAndUpdateBarGroup();
    enterAndUpdateBarRect();
    enterAndUpdateBarText();

    enterAndUpdatePieChartPathAndText();
    enterAndUpdatePieLines();
  }, [chartData, chartDataColumns, pieChartData]);

  useEffect(() => {
    init();
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        init();
      }, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [init]);

  return (
    <div ref={parent} className="bar-stack-chart w-100 overflow-auto">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarStackChart;
