// http://raphaeljs.com/reference.html#Element.transform
//
//
// Creates canvas 320 × 200 at 10, 50
//var paper = Raphael('canvas', 400, 200);

//http://www.colourlovers.com/palette/1473/Ocean_Five
//http://www.colourlovers.com/palette/3296641/red_velvet_macaron
// Heigh and width = canvas
var height = 150,
    width = height + height / 2,
    ratio = (window.innerWidth < 410 ) ? .25 : .5, // If is mobile
    strokeWidth = 2,
    s_width = width*ratio,
    s_height = (height / width * s_width),

    center = height / 2,
    center2 = height,
    radius = center - strokeWidth,

    fillColor = "#C1353E";


var attr = { width: s_width, height: s_height };

var join = Snap("#inner").attr(attr);
var c1 = join.circle(center, center, radius);
var c2 = join.circle(center2, center, radius);
var c = join.group(c1,c2);
c.attr({
    fill: "none",
    stroke: "#000",
    strokeWidth: strokeWidth
});

var cc1 = join.circle(center,center,radius);
cc1.attr({
    fill: fillColor
});
var cc2 = join.circle(center2,center,radius);
cc2.attr({
  fill: "#fff"
});
cc1.attr({
  mask: cc2
});


var join = Snap("#left").attr(attr);
var c1 = join.circle(center, center, radius);
var c2 = join.circle(center2, center, radius);
var c = join.group(c1,c2);
c1.attr({
    fill: fillColor,
    stroke: "#000",
    strokeWidth: strokeWidth
}).data('item', 'users');;
c2.attr({
    fill: "transparent",
    stroke: "#000",
    strokeWidth: strokeWidth
}).data('item', 'likes');

c1.hover(function(hmm){
  this.animate({ stroke: "yellow" }, 200, null, function(){
    this.animate({ stroke: "#000", }, 200);
  });
  var like = document.getElementById(this.data('item'));
  like.className += ' circle-hover';
}, function(){
  var like = document.getElementById(this.data('item'));
  var name = ' circle-hover';
  like.className = like.className.replace(name, "");
});

c2.hover(function(hmm){
  this.animate({ stroke: "yellow" }, 200, null, function(){
    this.animate({ stroke: "#000", }, 200);
  });
  var like = document.getElementById(this.data('item'));
  like.className += ' circle-hover';
}, function(){
  var like = document.getElementById(this.data('item'));
  var name = ' circle-hover';
  like.className = like.className.replace(name, "");
});


var join = Snap("#right").attr(attr);
var c2 = join.circle(center2, center, radius);
var c1 = join.circle(center, center, radius);
c2.attr({
    fill: fillColor,
    stroke: "#000",
    strokeWidth: strokeWidth
});
c1.attr({
    fill: "none",
    stroke: "#000",
    strokeWidth: strokeWidth
});




var join = Snap("#outer").attr(attr);
var c1 = join.circle(center, center, radius);
var c2 = join.circle(center2, center, radius);
c1.attr({
    fill: fillColor,
    stroke: "#000",
    strokeWidth: strokeWidth
});
c2.attr({
    fill: fillColor,
    stroke: "#000",
    strokeWidth: strokeWidth
});

var cc1 = join.circle(center,center,radius);
cc1.attr({
    fill: "none",
    stroke: "#000",
    strokeWidth: strokeWidth
});
var cc2 = join.circle(center2,center,radius);
cc2.attr({
  fill: "#fff"
});
cc1.attr({
  mask: cc2
});





// ok, raphael sets width/height even though a viewBox has been set, so let's rip out those attributes (yes, this will not work for VML)
// var svg = document.querySelector("svg");
// svg.removeAttribute("width");
// svg.removeAttribute("height");
// // svg.setAttribute('preserveAspectRatio','xMidYMid meet'); // none

// var bg = paper.rect(0,0,320,200);
// bg.attr('fill', '#000');

// // Creates circle at x = 50, y = 40, with radius 10
// var circle = paper.circle(50, 40, 10);
// // Sets the fill attribute of the circle to red (#f00)
// circle.attr("fill", "#f00");

// // Sets the stroke attribute of the circle to white
// circle.attr("stroke", "#fff");

// var path = "M 191.97147,53.436405 C 223.25430,71.458270 242.52530,104.76406 242.52530,140.80780 C 242.52530,176.85154 223.25430,210.15733 191.97147,228.17919 C 160.68865,210.15733 141.41763,176.85154 141.41763,140.80780 C 141.41763,104.76406 160.68865,71.458270 191.97147,53.436405";

// var center = paper.path(path);
// center.attr("fill", "#f0f");

// center.attr({ "stroke": "#afa", "stroke-width": "2" });


// var _transformedPath = Raphael.transformPath(path, 'T-100,-50s0.5');
// center.animate({path: _transformedPath}, 1000);

// paper.setViewBox(0, 0, 200, 100, true);
// paper.setSize('100%', '100%');


