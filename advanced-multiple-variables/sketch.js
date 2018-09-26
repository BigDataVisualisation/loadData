
var ready = false;
var data = [];

//to parse dates of form 17.09.2018 19:00
var parseDate = d3.timeParse("%d.%m.%Y %H:%M");

function setup() {
  createCanvas(600, 600);

  noLoop();
  //load data
  d3.csv("luft_long.csv", function (d) {
    return {
      date: parseDate(d['Datum']),
      category: d['Kategorie'],
      value: +d['Wert']
    };
  }).then(function (csv) {
    console.log(csv);
    data = csv;
    ready = true;
    redraw();
  });

}

function draw() {

  if (!ready) {
    background(220, 0, 0);
    return;
  }
  else {
    background(255);
  }

  //get the categories
  var categories = d3.set(data, function (d) {
    return d.category;
  }).values();

  var minDate = d3.min(data, function (d) {
    return d.date;
  });
  var maxDate = d3.max(data, function (d) {
    return d.date;
  });

  var xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, width]);

  console.log(minDate);
  console.log(maxDate);

  var yScale = d3.scaleBand()
    .domain(categories)
    .range([0, height]);

  // console.log(categories);
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];

    var categoryData = data.filter(function (d) {
      return d.category == category;
    });

    var minVal = d3.min(categoryData, function (d) {
      return d.value;
    });

    var maxVal = d3.max(categoryData, function (d) {
      return d.value;
    });

    var colScale = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([255, 0]);

    for (var j = 0; j < categoryData.length; j++) {
      var d = categoryData[j];
      var x = xScale(d.date);
      var y = yScale(d.category);
      var col = colScale(d.value);
      var rectHeight = yScale.bandwidth();
      noStroke();
      fill(col);
      rect(x, y, 2, rectHeight);
    }
  }
  
}