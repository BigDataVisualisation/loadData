
var ready = false;
var data = [];

//to parse dates of form 17.09.2018 19:00
var parseDate = d3.timeParse("%d.%m.%Y %H:%M");

function setup() {
  createCanvas(600, 600);

  //load data
  d3.csv("luft.csv", function (d) {
    return {
      date: parseDate(d['Datum']),
      ozon: +d['Ozon'],
      no2: +d['Stickstoffdioxid'],
      feinstaub: +d['Feinstaub PM10'],
      temperatur: +d['Lufttemperatur'],
      luftdruck: +d['Luftdruck'],
      windrichtung: +d['Windrichtung'],
      windgeschwindigkeit: +d['Windgeschwindigkeit']
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

  var gap = 10;

  //ozon
  var ozonMin = 0;
  var ozonMax = d3.max(data, function (d) {
    return d.ozon;
  });

  var rectWidth = 5;
  var rectHeight = 50;
  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].ozon, ozonMin, ozonMax, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, 0, rectWidth, rectHeight);
  }

  //no2
  var no2Min = 0;
  var no2Max = d3.max(data, function (d) {
    return d.no2;
  });
  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].no2, no2Min, no2Max, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, rectHeight, rectWidth, rectHeight);
  }

  //feinstaub
  var feinMin = 0;
  var feinMax = d3.max(data, function (d) {
    return d.feinstaub;
  });
  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].feinstaub, feinMin, feinMax, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, 2 * rectHeight, rectWidth, rectHeight);
  }

  //temperatur
  var tempMin = 0;
  var tempMax = d3.max(data, function (d) {
    return d.temperatur;
  });
  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].temperatur, tempMin, tempMax, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, 3 * rectHeight, rectWidth, rectHeight);
  }

  //luftdruck
  var druckMin = d3.min(data, function (d) {
    return d.luftdruck;
  });
  var druckMax = d3.max(data, function (d) {
    return d.luftdruck;
  });

  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].luftdruck, druckMin, druckMax, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, 4 * rectHeight, rectWidth, rectHeight);
  }


  //windrichtung
  var richtungMin = 0;
  var richtungMax = 360;
  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].windrichtung, richtungMin, richtungMax, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, 5 * rectHeight, rectWidth, rectHeight);
  }

  //windgeschwindigkeit
  var tempoMin = 0;
  var tempoMax = d3.max(data, function (d) {
    return d.windgeschwindigkeit;
  });;

  for (var i = 0; i < data.length; i++) {
    var c = map(data[i].windgeschwindigkeit, tempoMin, tempoMax, 255, 0);
    fill(c);
    noStroke();
    rect(i * rectWidth, 6 * rectHeight, rectWidth, rectHeight);
  }

}