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


var svgAttr = {
  viewBox: "0 0 225 150",
  preserveAspectRatio: "xMaxYmax",
  width: s_width,
  height: s_height
};

var join = Snap("#inner").attr(svgAttr);
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


var join = Snap("#left").attr(svgAttr);
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


var join = Snap("#right").attr(svgAttr);
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




var join = Snap("#outer").attr(svgAttr);
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

