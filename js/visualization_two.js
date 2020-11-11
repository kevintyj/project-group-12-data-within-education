/* global D3 */

// Initialize a scatterplot. Modeled after Mike Bostock's
// Reusable Chart framework https://bost.ocks.org/mike/chart/
function scatterplot() {
    // Based on Mike Bostock's margin convention
    // https://bl.ocks.org/mbostock/3019563
    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 40
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      xValue = data => data.Score,
      yValue = data => data.Timespent,
      xLabelText = '',
      yLabelText = '',
      yLabelOffsetPx = 0,
      xScale = d3.scaleLinear(),
      yScale = d3.scaleLinear()

      
    function chart(selector, data) {
    let svg = d3.select(selector)
        .append('svg')
          .attr('preserveAspectRatio', 'xMidYMid meet')
          .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
  
      svg = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
        xScale
          .domain(d3.extent(data, xValue))
          .rangeRound([0, width]);
    
        yScale
          .domain(d3.extent(data, yValue))
          .rangeRound([height, 0]);

    
        let xAxis = svg.append('g')
            .attr('transform', 'translate(0,' + (height) + ')')
            .call(d3.axisBottom(xScale));
            
        // X axis label
        xAxis.append('text')        
            .attr('class', 'axisLabel')
            .attr('y', 35)
            .attr('fill', 'black')
            .attr('x', (width) / 2)
            .text(xLabelText);
          
        let yAxis = svg.append('g')
            .call(d3.axisLeft(yScale))
            
        yAxis.append('text')
            .attr('class', 'axisLabel')
            .attr('y', -25)
            .attr('fill', 'black') 
            .attr('x', -height/2)
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
            .text(yLabelText);
    
        svg.selectAll('circle').data(data)
            .enter().append('circle')
              .attr('cy', d => yScale(yValue(d)))
              .attr('cx', d => xScale(xValue(d)))
              .attr('r', 4)
              .style("fill", function(d) {
                if (d.Status === 'On Time') {
                  return "green";
                } else if (d.Status === 'Late') {
                  return "pink";}
                else{
                    return "red"
                };
                });

    
    
        let statusMap = new Map();   // https://observablehq.com/@d3/d3v6-migration-guide
            data.forEach(d => { 
            if (!statusMap.has(d.Status)) statusMap.set(d.Status, d);  // Add if not already present
            });


        svg.selectAll("mydots")
            .data(statusMap.values())
            .enter()
            .append("circle")
              .attr("cx", margin.left - 30)
              .attr("cy", function(d,i){ return i*25}) // 100 is where the first dot appears. 25 is the distance between dots
              .attr("r", 5)
              .style("fill", function(d) {
                if (d.Status === 'On Time') {
                  return "green";
                } else if (d.Status === 'Late') {
                  return "pink";}
                else{
                    return "red"
                }
                });
                
        svg.selectAll("mylabels")
            .data(statusMap.values())
            .enter()
            .append("text")
            .attr("x", margin.left - 20)
            .attr("y", function(d,i){ return i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .text(function(d){ return d.Status})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("fill", function(d) {
            console.log(d)
              if (d.Status === 'On Time') {
                return "green";
              } else if (d.Status === 'Late') {
                return "pink";}
              else{
                  return "red"
              }
            });

  
      return chart;
    }
  
    // The x-accessor from the datum
    function X(d) {
      return xScale(xValue(d));
    }
  
    // The y-accessor from the datum
    function Y(d) {
      return yScale(yValue(d));
    }
  
    chart.margin = function (_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };
  
    chart.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return chart;
    };
  
    chart.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };
  
    chart.x = function (_) {
      if (!arguments.length) return xValue;
      xValue = _;
      return chart;
    };
  
    chart.y = function (_) {
      if (!arguments.length) return yValue;
      yValue = _;
      return chart;
    };
  
    chart.xLabel = function (_) {
      if (!arguments.length) return xLabelText;
      xLabelText = _;
      return chart;
    };
  
    chart.yLabel = function (_) {
      if (!arguments.length) return yLabelText;
      yLabelText = _;
      return chart;
    };
  
    chart.yLabelOffset = function (_) {
      if (!arguments.length) return yLabelOffsetPx;
      yLabelOffsetPx = _;
      return chart;
    };
  
    return chart;
  }