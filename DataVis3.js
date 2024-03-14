// Function to draw the line chart
function graphThree() {
  const problem1Values = Array.from({ length: 10 }, (_, i) => ({
    x: i,
    y: Math.floor(Math.random() * 100) + 1,
  }));

  const indexOne = d3.randomInt(0, 9)();

  // randomly select the index and make sure they are not the same
  let indexTwo;

  do {
    indexTwo = d3.randomInt(0, 9)();
  } while (indexTwo === indexOne);

  const actualIndexTwo = indexTwo;

  const indices = [indexOne, indexTwo];
  //   console.log(problem1Values[indexOne].y);
  //   console.log(problem1Values[actualIndexTwo].y);

  function correct_percentage(indexOne, actualIndexTwo) {
    if (problem1Values[indexOne].y > problem1Values[actualIndexTwo].y) {
      return Math.floor(
        (problem1Values[actualIndexTwo].y / problem1Values[indexOne].y) * 100
      );
    } else if (problem1Values[actualIndexTwo].y > problem1Values[indexOne].y) {
      return Math.floor(
        (problem1Values[indexOne].y / problem1Values[actualIndexTwo].y) * 100
      );
    } else {
      return 100;
    }
  }

  // Define graph size and margins
  const graphSize = 500;
  const margin = { top: 20, right: 10, bottom: 30, left: 40 },
    width = graphSize - margin.left - margin.right,
    height = graphSize - margin.top - margin.bottom;

  let svg = d3
    .select("#visualization-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(problem1Values, (d) => d.x))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(problem1Values, (d) => d.y)])
    .range([height, 0]);

  // Append x axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Append y axis
  svg.append("g")
    .call(d3.axisLeft(yScale).tickFormat(""))
    .selectAll("text").remove();

  // Line generator
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  // Create the line
  svg
    .append("path")
    .datum(problem1Values)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  svg
    .selectAll(".circle")
    .data(indices)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("cx", (d) => xScale(problem1Values[d].x)) // X-coordinate based on specified index
    .attr("cy", (d) => yScale(problem1Values[d].y)) // Y-coordinate based on value at specified index
    .attr("r", 5)
    .attr("fill", "red");

  return correct_percentage(indexOne, actualIndexTwo);
}
