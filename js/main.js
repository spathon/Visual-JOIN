

// Heigh and width = canvas
var height = 150,                         // Canvas height
    width = height + height / 2,          // Canvas width
    ratio = (window.innerWidth < 410 ) ? .25 : 1.5, // The <svg> size in ratio (If is mobile)
    strokeWidth = 3,                      // Circle stroke width
    s_width = width*ratio,                // <svg> width
    s_height = (height / width * s_width),// <svg> height

    center = height / 2,                  // first circle center left and both center top
    center2 = height,                     // Second circle
    radius = center - strokeWidth,        // The circles radius
    fillColor = "#CC333F";                // The fill color

// Set attributes on the svg tag
var svgAttr = {
  viewBox: "0 0 "+ width +" "+ height,
  preserveAspectRatio: "xMaxYmax",
  width: s_width,
  height: s_height
};

// Default attributes for the circles
var defaultAttr = {
  fill: "none",
  stroke: "#EB6841",
  strokeWidth: strokeWidth
};

// Create an object for the svg's with custom settings
var svgs = {
  // Inner Join
  inner: {},
  // Left Join
  left: {
    attr: {
      c1: {
        fill: fillColor
      },
      c2: {
        fill: "transparent"
      }
    }//
  },
  // Right Join
  right: {
    reverse: true,
    attr: {
      c1: {
        fill: "transparent"
      },
      c2: {
        fill: fillColor
      }
    }//
  },
  // Outer Join
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

// Loop through all svg's and create the circles
for(var svg in svgs){

  // Attach the current object to a variable
  var current = svgs[svg];
  current.main = Snap("#"+ svg).attr(svgAttr);

  // Create an array of the 2 circles and if isset revers the order
  var circles = ['c1', 'c2'];
  if(current.reverse) circles.reverse()

  // Loop through the 2 circles
  circles.forEach(function(key){

    // depending on which circle make left center different
    var center1 = (key == 'c1') ? center : center2;
    var table = (key == 'c1') ? 'users' : 'likes';

    // Create the circle with default attr and the table it represent
    current[key] = current.main.circle(center1, center, radius)
                    .attr(defaultAttr)
                    .data('table', table);

    if(key == 'c1'){
      current[key].attr({
        stroke: "#00A0B0"
      })
    }
  });

  // Set custom attributes on the circles
  if(typeof current.attr != 'indefined'){
    for(var circle in current.attr){
      current[circle].attr(current.attr[circle]);
    }
  }
};


// inner
var inner = svgs.inner.main;
// Generate a new circle and one mask part of it
var cc1_inner = inner.circle(center,center,radius);
cc1_inner.attr({
    fill: fillColor
});
var cc2_inner = inner.circle(center2,center,radius);
cc2_inner.attr({
  fill: "#fff"
});
cc1_inner.attr({
  mask: cc2_inner
});


// Outer
var outer = svgs.outer.main;
// Create another circle to generate the crossing strokes
var cc1 = outer.circle(center,center,radius);
cc1.attr({
    fill: "none",
    stroke: "#00A0B0",
    strokeWidth: strokeWidth
});
