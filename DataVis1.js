// Define graph size and margins

// Function to draw the graph
function graphOne() {
  function correct_percentage(indexOne, indexTwo) {
    if (problem1Values[indexOne] > problem1Values[indexTwo]) {
      return Math.floor(
        (problem1Values[indexTwo] / problem1Values[indexOne]) * 100
      );
    } else if (problem1Values[indexTwo] > problem1Values[indexOne]) {
      return Math.floor(
        (problem1Values[indexOne] / problem1Values[indexTwo]) * 100
      );
    } else {
      return (problem1Values[indexOne] / problem1Values[indexTwo]) * 100;
    }
  }

  var problem1Values = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 100) + 1
  );

  // randomly select the index and make sure they are not the same
  const indexOne = d3.randomInt(0, 9)();

  let tempIndexTwo;

  do {
    tempIndexTwo = d3.randomInt(0, 9)();
  } while (
    tempIndexTwo === indexOne &&
    !(tempIndexTwo + 1 === indexOne || tempIndexTwo === indexOne + 1)
  );

  const indexTwo = tempIndexTwo;

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
    .scaleBand()
    .domain(d3.range(problem1Values.length))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  // Append x axis

  var customYTicks = [0, 100];

  var yAxis = d3.axisLeft(yScale).tickValues(customYTicks);

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Append y axis
  // svg.append("g").call(d3.axisLeft(yScale).tickFormat(""));

  svg.append("g").attr("class", "y-axis").call(yAxis);

  // Create bars
  svg
    .selectAll(".bar")
    .data(problem1Values)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d))
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

// Call graphOne when the document is loaded
//document.addEventListener("DOMContentLoaded", graphOne);
