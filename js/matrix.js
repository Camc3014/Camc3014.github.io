// // //D3 MATRIX
// Assign a 2d array of correlating values.
// This each subarray will render as a row
const data = [
  [78, 4, 0, 59, 6, 6, 11, 117047, 769, 2675, 3344, 29.4],
  [82, 34, 20, 85, 11, 6, 34, 1413030, 929, 3230, 4037, 21.5],
  [79, 99, 287, 158, 249, 4, 54, 117692, 774, 2690, 3363, 15.2],
  [3, 1, 0, 0, 3, 0, 1, 172065, 1130.7, 3932.8, 4916, 18],
  [41, 3, 6, 18, 6, 2, 24, 176520, 1160, 4035, 5043, 39.6]
];

let colorData = [ //calculating by precentage of total
    [258,28,0,184,16,333,89,59,161,162,161,238],
    [290,241,63,265,29,333,274,708,195,195,195,173],
    [279,702,917,493,664,222,435,59,162,162,162,123],
    [11,7,0,0,8,0,8,86,237,237,237,146],
    [145,21,4,56,16,111,193,88,244,244,244,320]
];


//[   283,  141,  313,   320,  375,   18,  124, 1996354,  4762,  16563,  20703, 123.7 ]


// Add our labels as an array of strings
const rowLabelsData = ["Bronx", "Brooklyn", "Manhattan", "Staten Island ", "Queens"];
const columnLabelsData = [
  "Low Income",
  "Medium Income",
  "High Income",
  "Residential",
  "Commercial",
  "Public",
  "Industrial",
  "Average Cost",
  "Average Savings $",
  "Average Benefit $",
  "Average Area sq/ft",
  "Average Building Cover %",
];

function onMouseOverMatrix(e)
{

};
function onMouseOutMatrix(e){

};


function Matrix(options) {
  // Set some base properties.
  // Some come from an options object
  // pass when `Matrix` is called.
  const margin = { top: 0, right: 0, bottom: 150, left: 810 },
    width = 550,
    height = 230,
    container = options.container,
    startColor = options.start_color,
    endColor = options.end_color;

  // Find our max and min values
  const maxValue = d3.max(colorData, (layer) => {
    return d3.max(layer, (d) => {
      return d;
    });
  });
  const minValue = d3.min(colorData, (layer) => {
    return d3.min(layer, (d) => {
      return d;
    });
  });

  const numrows = data.length;
  // assume all subarrays have same length
  const numcols = data[0].length;

  // Create the SVG container
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add a background to the SVG
  const background = svg
    .append("rect")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("width", width)
    .attr("height", height);

  // Build some scales for us to use
  const x = d3.scale.ordinal().domain(d3.range(numcols)).rangeBands([20, width+10]);

  const y = d3.scale
    .ordinal()
    .domain(d3.range(numrows))
    .rangeBands([0, height+5]);

  // This scale in particular will
  // scale our colors from the start
  // color to the end color.
  const colorMap = d3.scale
    .linear()
    .domain([minValue, maxValue])
    .range([startColor, endColor]);

  // Generate rows and columns and add
  // color fills.
  const row = svg
    .selectAll(".row")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "row")
    .attr("transform", (d, i) => {
      return "translate(0," + y(i) + ")";
    });

  const cell = row
    .selectAll(".cell")
    .data((d) => {
      return d;
    })
    .enter()
    .append("g")
    .attr("class", "cell")
    .attr("transform", (d, i) => {
      return "translate(" + x(i) + ", 24)";
    })
    .attr("mouseover", onMouseOverMatrix)
    .attr("mouseout", onMouseOutMatrix);

  cell
    .append("circle")
    .attr("r", 13)
    // .attr("text", data) //this does not work

  row
    .selectAll(".cell")
    .data((d, i) => {
      return data[i];
    })
    .style("fill", colorMap);

  const labels = svg.append("g").attr("class", "labels");

  const columnLabels = labels
    .selectAll(".column-label")
    .data(columnLabelsData)
    .enter()
    .append("g")
    .attr("class", "column-label")
    .attr("transform", (d, i) => {
      return "translate(" + x(i) + "," + height + ")";
    });

  columnLabels
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("x1", x.rangeBand() / 2)
    .attr("x2", x.rangeBand() / 2)
    .attr("y1", 0)
    .attr("y2", 5);

  columnLabels
    .append("text")
    .attr("x", -5)
    .attr("y", y.rangeBand() / 2 - 29)
    .attr("dy", ".82em")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-45)")
    .text((d, i) => {
      return d;
    });

  const rowLabels = labels
    .selectAll(".row-label")
    .data(rowLabelsData)
    .enter()
    .append("g")
    .attr("class", "row-label")
    .style("font-weight", "5")
    .attr("transform", (d, i) => {
      return "translate(" + 0 + "," + y(i) + ")";
    });

  rowLabels
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .attr("x1", 0)
    .attr("x2", -5)
    .attr("y1", y.rangeBand() / 2)
    .attr("y2", y.rangeBand() / 2);

  rowLabels
    .append("text")
    .attr("x", -8)
    .attr("y", y.rangeBand() / 2)
    .attr("dy", ".32em")
    .attr("text-anchor", "end")
    .text((d, i) => {
      return d;
    });
}







// var collumnLength = 5
// var rowLength = 12
// var c1w = 130; c2w = 80; c3w = 40; r1h = 150; w = 600; h = w; pad = 20; left_pad = 50;
// let traits = []
// let bProps = []
// let tab_data = d3.csv("data/GreenRoofMatrixData.csv", function(e){
//     console.log(e)
//     traits = [e[0].Borough, e[1].Borough, e[2].Borough, e[3].Borough, e[4].Borough]
//     console.log(traits)
// });

//   var x_step = (w-pad-left_pad) / (collumnLength + 1),
//       y_step = ((h-pad*2) - pad) / (rowLength + 1),
//       x_range = traits.map((v,i) => c1w + c2w + c3w + left_pad + ((1+x_step) * i)), 
//       y_range = candidates.map((v,i) => r1h + pad + ((1+y_step) * i)), 
//       x = d3.scaleOrdinal().domain(rowLength).range(x_range),
//       y = d3.scaleOrdinal().domain(collumnLength).range(y_range);
  
//     var max_r = 5,
//           r = d3.scaleLinear()
//               .domain([0, max_r])
//               .range([0, 16]);
    
//     var onMouseOver = function(d) { //use same method as map.js 
//       var name = classinate(d["name"]);
//       var prop = classinate(d["prop"]);
//       svg.selectAll(`text.label.${prop}`)
//         .attr("display", "block");
//       svg.selectAll(`text.label.${name}`)
//         .attr("display", "block");   
//     };
  
//     var onMouseOut = function(d) { //use same method as map.js 
//       var name = classinate(d["name"]);
//       var prop = classinate(d["prop"]);    
//       svg.selectAll(`text.label.${prop}`)
//         .attr("display", "none");
//       svg.selectAll(`text.label.${name}`)
//         .attr("display", "none");    
//     };  
    
//     var circle_groups = svg.select("#matrix")
//           .data(tab_data)
//           .enter()
//           .append("g")
//           .attr("class", "cgroup")
//           .on("mouseleave", onMouseOut )
//           .on("mouseenter", onMouseOver);  
    
//     var circles = circle_groups.append("circle")
//           .attr("class", d => "circle " + classinate(d["prop"]) + " " + classinate(d["name"]))
//           .attr("cx", function (d) { return x(d["prop"]); })
//           .attr("cy", function (d) { return y(d["name"]); });
  
    
//     circle_groups.append("text")
//             .attr("class", d => "label " + classinate(d["prop"]) + " " + classinate(d["name"]))  
//             .attr("display", "none")
//             .attr("text-anchor", "middle")
//             .attr("font-size", "14px")
//             .attr("stroke", "black")
//             .attr("fill", "black")  
//             .attr("stroke-width", "1px")
//             .attr("x", function (d) { return x(d["prop"]); })
//             .attr("y", function (d) { return y(d["name"]); })  
//             .text(function (d) { return d["value"]});      
    
//      var trait_labels = svg.selectAll("text.trait")
//         .data(traits)
//         .enter()
//         .append("text")
//           .attr("class", "trait")
//           .attr("x", d => x(d))
//           .attr("y", r1h - 10)
//           .attr("font-size", "14px")
//           .attr("stroke", "black")
//           .attr("fill", "black")  
//           .attr("stroke-width", "1px")    
//           .attr("opacity", d => opacity(d))
//           .attr("transform", d => `rotate(-40 ${x(d)},${r1h-10})`)
//           .text(d => d)
//       svg.append("text")
//           .attr("class", "trait")
//           .attr("x", zx)
//           .attr("y", r1h - 10)
//           .attr("font-size", "14px")
//           .attr("stroke", "black")
//           .attr("fill", "black")  
//           .attr("stroke-width", "1px")    
//           .attr("opacity", d => opacity(d))
//           .attr("transform", d => `rotate(-40 ${zx},${r1h-10})`)
//           .text("Z-Score")
//       svg.append("text")
//           .attr("class", "trait")
//           .attr("x", kx)
//           .attr("y", r1h - 10)
//           .attr("font-size", "14px")
//           .attr("stroke", "black")
//           .attr("fill", "black")  
//           .attr("stroke-width", "1px")    
//           .attr("opacity", d => opacity(d))
//           .attr("transform", d => `rotate(-40 ${kx},${r1h-10})`)
//           .text("Key SKill")   
    
//       var candidate_labels = svg.selectAll("text.candidate")
//         .data(candidates)
//         .enter()
//         .append("text")
//           .attr("class", "candidate")
//           .attr("x", 10)
//           .attr("y", d => y(d))
//           .attr("font-size", "14px")
//           .attr("stroke", "black")
//           .attr("fill", "black")  
//           .attr("stroke-width", "1px")    
//           .text(d => d)
  