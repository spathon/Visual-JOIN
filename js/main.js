

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

// Set attributes on the svg tag
var svgAttr = {
  viewBox: "0 0 225 150",
  preserveAspectRatio: "xMaxYmax",
  width: s_width,
  height: s_height
};

var defaultAttr = {
  fill: "none",
  stroke: "#000",
  strokeWidth: strokeWidth
};

var svgs = {

  inner: {},

  left: {
    attr: {
      c1: {
        fill: fillColor
      },
      c2: {
        fill: "transparent"
      }
    } // attr
  },

  right: {
    reverse: true,
    attr: {
      c1: {
        fill: "transparent"
      },
      c2: {
        fill: fillColor
      }
    } // attr
  },

  outer: {
    attr: {
      c1: {
        fill: fillColor
      },
      c2: {
        fill: fillColor
      }
    }
  }
};


for(var svg in svgs){
  var current = svgs[svg];
  var main = current.main = Snap("#"+ svg).attr(svgAttr);

  var circles = ['c1', 'c2'];
  if(current.reverse) circles.reverse()

  circles.forEach(function(key){
    var center1 = (key == 'c1') ? center : center2;
    var item = (key == 'c1') ? 'users' : 'likes';
    current[key] = main.circle(center1, center, radius)
                  .attr(defaultAttr)
                  .data('item', item);


    // current[key].hover(function(hmm){
    //   this.animate({ stroke: "yellow" }, 200, null, function(){
    //     this.animate({ stroke: "#000", }, 200);
    //   });
    //   var like = document.getElementById(this.data('item'));
    //   like.className += ' circle-hover';
    // }, function(){
    //   var like = document.getElementById(this.data('item'));
    //   var name = ' circle-hover';
    //   like.className = like.className.replace(name, "");
    // });
  });

  // Attributes
  if(typeof current.attr != 'indefined'){
    for(var circle in current.attr){
      current[circle].attr(current.attr[circle]);
    }
  }
};

console.log(svgs);


// inner
var inner = svgs.inner.main;
var cc1 = inner.circle(center,center,radius);
cc1.attr({
    fill: fillColor
});
var cc2 = inner.circle(center2,center,radius);
cc2.attr({
  fill: "#fff"
});
cc1.attr({
  mask: cc2
});


var outer = svgs.outer.main;
var cc1 = outer.circle(center,center,radius);
cc1.attr({
    fill: "none",
    stroke: "#000",
    strokeWidth: strokeWidth
});
var cc2 = outer.circle(center2,center,radius);
cc2.attr({
  fill: "#fff"
});
cc1.attr({
  mask: cc2
});




// var join = Snap("#left").attr(svgAttr);
// var c1 = join.circle(center, center, radius);
// var c2 = join.circle(center2, center, radius);
// var c = join.group(c1,c2);
// c1.attr({
//     fill: fillColor,
//     stroke: "#000",
//     strokeWidth: strokeWidth
// }).data('item', 'users');;
// c2.attr({
//     fill: "transparent",
//     stroke: "#000",
//     strokeWidth: strokeWidth
// }).data('item', 'likes');

// c1.hover(function(hmm){
//   this.animate({ stroke: "yellow" }, 200, null, function(){
//     this.animate({ stroke: "#000", }, 200);
//   });
//   var like = document.getElementById(this.data('item'));
//   like.className += ' circle-hover';
// }, function(){
//   var like = document.getElementById(this.data('item'));
//   var name = ' circle-hover';
//   like.className = like.className.replace(name, "");
// });

// c2.hover(function(hmm){
//   this.animate({ stroke: "yellow" }, 200, null, function(){
//     this.animate({ stroke: "#000", }, 200);
//   });
//   var like = document.getElementById(this.data('item'));
//   like.className += ' circle-hover';
// }, function(){
//   var like = document.getElementById(this.data('item'));
//   var name = ' circle-hover';
//   like.className = like.className.replace(name, "");
// });


// var join = Snap("#right").attr(svgAttr);
// var c2 = join.circle(center2, center, radius);
// var c1 = join.circle(center, center, radius);
// c2.attr({
//     fill: fillColor,
//     stroke: "#000",
//     strokeWidth: strokeWidth
// });
// c1.attr({
//     fill: "none",
//     stroke: "#000",
//     strokeWidth: strokeWidth
// });




// var join = Snap("#outer").attr(svgAttr);
// var c1 = join.circle(center, center, radius);
// var c2 = join.circle(center2, center, radius);
// c1.attr({
//     fill: fillColor,
//     stroke: "#000",
//     strokeWidth: strokeWidth
// });
// c2.attr({
//     fill: fillColor,
//     stroke: "#000",
//     strokeWidth: strokeWidth
// });

// var cc1 = join.circle(center,center,radius);
// cc1.attr({
//     fill: "none",
//     stroke: "#000",
//     strokeWidth: strokeWidth
// });
// var cc2 = join.circle(center2,center,radius);
// cc2.attr({
//   fill: "#fff"
// });
// cc1.attr({
//   mask: cc2
// });

