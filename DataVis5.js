

// Function to draw the graph
function graphFive() {


  // Generates 10 random values
  var problem1Values = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100) + 1
  );

  // randomly select the index and make sure they are not the same
  const indexOne = d3.randomInt(0, 9)();

  let indexTwo;

  do {
    indexTwo = d3.randomInt(0, 9)();
  } while (indexTwo === indexOne);

  const actualIndexTwo = indexTwo;

  function correct_percentage(indexOne, actualIndexTwo) {
    if (problem1Values[indexOne] > problem1Values[actualIndexTwo]) {
      return Math.floor(
        (problem1Values[actualIndexTwo] / problem1Values[indexOne]) * 100
      );
    } else if (problem1Values[actualIndexTwo] > problem1Values[indexOne]) {
      return Math.floor(
        (problem1Values[indexOne] / problem1Values[actualIndexTwo]) * 100
      );
    } else {
      return (problem1Values[indexOne] / problem1Values[actualIndexTwo]) * 100;
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

  const treemap = d3.treemap().size([width, height]).padding(2);

  const root = d3.hierarchy({
    children: problem1Values.map((value, index) => ({ id: index, value })),
  });

  root.sum((d) => d.value);


  treemap(root);

  var cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });

  cell
    .append("rect")
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .style("stroke", "black")
    .style("fill", (d, i) => {
      // Color cells based on their index
      if (i === indexOne || i === actualIndexTwo) {
        return "red"; // Color cells at index 0 and 1 blue
      } else {
        return "white"; // Color all other cells green
      }
    });


  return correct_percentage(indexOne, actualIndexTwo);
}
