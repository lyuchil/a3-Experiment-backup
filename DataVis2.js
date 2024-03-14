function graphTwo() {
  // Generates 10 random values
  const problem2Values = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100) + 1
  );

  const indexOne = d3.randomInt(0, 9)();

  let tempIndexTwo;

  do {
    tempIndexTwo = d3.randomInt(0, 9)();
  } while (
    tempIndexTwo === indexOne &&
    !(tempIndexTwo + 1 === indexOne || tempIndexTwo === indexOne + 1)
  );

  const indexTwo = tempIndexTwo;

  function correct_percentage(indexOne, actualIndexTwo) {
    if (problem2Values[indexOne] > problem2Values[actualIndexTwo]) {
      return Math.floor(
        (problem2Values[actualIndexTwo] / problem2Values[indexOne]) * 100
      );
    } else if (problem2Values[actualIndexTwo] > problem2Values[indexOne]) {
      return Math.floor(
        (problem2Values[indexOne] / problem2Values[actualIndexTwo]) * 100
      );
    } else {
      return (problem2Values[indexOne] / problem2Values[actualIndexTwo]) * 100;
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

  const customTicks = [0, 100];
  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(d3.range(problem2Values.length))
    .range([0, height])
    .padding(0.1);

  // Append x axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickValues(customTicks));

  // Append y axis
  svg.append("g").call(d3.axisLeft(yScale));

  // Create bars
  svg
    .selectAll(".bar")
    .data(problem2Values)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", (d, i) => yScale(i))
    .attr("width", (d) => xScale(d))
    .attr("height", yScale.bandwidth())
    .attr("fill", function (d, i) {
      if (i === indexOne || i === indexTwo) {
        // highliting the bars given the index
        return "red";
      } else {
        return "#FFFFFF";
      }
    })
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  return correct_percentage(indexOne, indexTwo);
}
