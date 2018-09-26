
var ready = false;
var data = [];

function setup() {
  createCanvas(600, 600);

  //load data
  d3.csv("luft.csv", function (d) {
    return {
      ozon: +d['Ozon']
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
  var ozonMax = d3.max(data,function(d){
    return d.ozon;
  });
  
  var rectWidth = 5;
  var rectHeight = 50;
  for(var i=0; i<data.length; i++){
    var c = map(data[i].ozon,ozonMin,ozonMax,255,0);
    fill(c);
    noStroke();
    rect(i*rectWidth,0,rectWidth,rectHeight); 
  }
  
}