import {max, range, sum} from 'd3-array';
import {interpolate} from 'd3-interpolate';
import {scaleOrdinal, scaleLinear, scaleBand} from 'd3-scale';
import {select, selectAll} from 'd3-selection';
import {stack, arc, pie} from 'd3-shape';
import React, {useEffect, useCallback, useRef} from 'react';

const BarStackChart = ({chartData, chartDataColumns, pieChartData}) => {
  const svgRef = useRef(null);
  const parent = useRef(null);

  const init = useCallback(() => {
    const margin = {top: 10, right: 20, bottom: 20, left: 150};
    const stackBarSpace = 6;
    const color = scaleOrdinal();
    const innerRadius = 0.54;
    const outerRadius = 0.8;
    const pieData = pieChartData
      .map((d) => {
        return {label: d.categoryName, value: +d.categoryWeight};
      })
      .filter((d) => d.value !== 100);
    const keys = chartDataColumns.slice(1);
    const width = Math.max(
      parent.current.clientWidth - margin.left - margin.right,
      50
    );

    const height = Math.max(600 - margin.top - margin.bottom, 50);
    const pieChartWidth = (width * 40) / 100;
    const stackedBarChartWidth = (width * 60) / 100;

    const radius = Math.min(pieChartWidth, height) / 2;
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
              .text(word);
          }
        }
      });
    };
    const svg = select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const stackedBarChartG = createElement(
      svg,
      'g',
      'stack-bar-chart-group',
      [1],
      (d) => d
    ).attr(
      'transform',
      'translate(' + (width - stackedBarChartWidth) + ',' + margin.top + ')'
    );

    const barsG = createElement(
      stackedBarChartG,
      'g',
      'bars-group',
      [1],
      (d) => d
    ).attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const pieChartG = createElement(svg, 'g', 'pie-group', [1], (d) => d).attr(
      'transform',
      'translate(' +
        pieChartWidth / 2 +
        ',' +
        (height / 2 + (margin.top + margin.bottom) / 2) +
        ')'
    );

    const pieLinesG = createElement(pieChartG, 'g', 'pieLines', [1], (d) => d);
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
      .attr('font-size', '34px')
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
      .attr('x', margin.left + stackedBarChartWidth / 2)
      .attr('y', height)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('font-style', 'italic')
      .style('dominant-baseline', 'middle')
      .style('fill', '#535353')
      .text(
        'Counts Represent the number of states in each respective subgrade category'
      );

    const yAxisG = createElement(stackedBarChartG, 'g', 'y', [1], (d) => d);
    yAxisG
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    color.range(['#101b7e', '#1f9bb3', '#ffba38', '#fd745c', '#a13f68']);

    const xScale = scaleLinear().range([15, (width * 60) / 100 - margin.right]);

    const yScale = scaleBand()
      .range([margin.top, height - margin.bottom])
      .padding(0.1)
      .paddingOuter(0.24)
      .paddingInner(0.24);

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
      // let textXPosition = textBBox.x;
      // if (textXPosition < 0) {
      //   textXPosition = textBBox.x * -1;
      // }
      // 'translate(' + (width - stackedBarChartWidth) + ',' + margin.top + ')';
      lastPointerPosition[0] =
        pieChartWidth - pieChartWidth / 2 + textBBox.x + margin.left - 5;
      lastPointerPosition[1] =
        -(height / 2) + margin.top + textBBox.y + textBBox.height / 2;

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
        .attr('font-size', '18px')
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
        .data(stack().keys(keys)(chartData), (d) => d.key);

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
        .style('font-size', '15px')
        .style('font-weight', '900')
        .style('dominant-baseline', 'central')
        .attr('fill', '#000');
    };

    const enterAndUpdatePieChartPathAndText = () => {
      const slices = pieChartG
        .selectAll('path.slice')
        .data(d3pie(pieData), (d) => d.data.label);

      const slice = slices
        .enter()
        .append('path')
        .merge(slices)
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
      slices.exit().remove();

      slices
        .enter()
        .append('text')
        .attr('class', 'slice-value')
        .attr('transform', function (d) {
          d.innerRadius = innerRadius;
          d.outerRadius = outerRadius;
          return 'translate(' + pathArc.centroid(d) + ') rotate(15)';
        })
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .attr('font-size', (d) => d.value / 10 + radius / 20)
        .attr('font-weight', 'bold')
        .attr('fill', '#535353')
        .text(function (d, i) {
          return d.value + '%';
        });
      slice.exit().remove();
    };
    const updateChart = () => {
      chartData.forEach((d) => {
        d.total = sum(keys, (k) => +d[k]);
        return d;
      });

      xScale.domain([0, max(chartData, (d) => d.total)]).nice();
      yScale.domain(chartData.map((d) => d.category));
      color.domain(keys);

      enterAndUpdateYAxisText();
      enterAndUpdateBarGroup();
      enterAndUpdateBarRect();
      enterAndUpdateBarText();

      enterAndUpdatePieChartPathAndText();

      selectAll('.slice-value').attr('transform', function (d) {
        d.innerRadius = innerRadius;
        d.outerRadius = outerRadius;
        return 'translate(' + pathArc.centroid(d) + ') rotate(15)';
      });

      enterAndUpdatePieLines();
    };
    const midAngle = (d) => {
      return d.startAngle + (d.endAngle - d.startAngle) / 2 / (Math.PI / 1.3);
    };

    updateChart();
  }, [chartData, chartDataColumns, pieChartData]);

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
      className="bar-stack-chart w-100 d-flex justify-content-center"
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarStackChart;
