function sc(sc_data,width,height,margin){

  var svg=d3.select("#sc_plot").append("svg").attr("width",width).attr("height",height);
  var x=d3.scale.linear().domain([0,1]).range([margin,width-margin]);
  var y=d3.scale.linear().domain([0,20]).range([height-margin,margin]);
  var r=d3.scale.linear().domain([0,5]).range([2,20]);
  var o=d3.scale.linear().domain([10000,100000]).range([.5,1]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height - margin) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis")
     .attr("transform", "translate(" + margin + ",0)")
    .call(yAxis);

  svg.selectAll(".h").data(d3.range(4,20,4)).enter()
    .append("line").classed("h",1)
    .attr("x1",margin).attr("x2",height-margin)
    .attr("y1",y).attr("y2",y);
    
  svg.selectAll(".v").data(d3.range(.25,2,.25)).enter()
    .append("line").classed("v",1)
    .attr("y1",margin).attr("y2",width-margin)
    .attr("x1",x).attr("x2",x);

  svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width - width/2)
      .attr("y", height - 6)
      .text("CC");

  svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("x", -height + height/2)
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("SS");

  //we create the marks, which we put in an initial position
  svg.selectAll("circle").data(sc_data).enter()
    .append("circle")
    .attr("cx",function(d) {return x(0);})
    .attr("cy",function(d) {return y(0);})
    .attr("r",function(d) {return r(0);})
    .style("opacity","0.5")
    .style("fill","blue")
      .append("title")
      .text(function(d) {return d.sig_id;})

  // now we initiate - moving the marks to their position
  svg.selectAll("circle").transition().duration(1000)
    .attr("cx",function(d) {return x(+d.c);})
    .attr("cy",function(d) {return y(+d.s);})
    .attr("r",15)
}

function sigInfoToSC(params){
  d3.tsv(params.url,function(tsv){
    var sc_data = []
    tsv.forEach(function(element,index,array){
      sc_data.push({s:element.distil_ss, c:element.distil_cc_q75})
    });
    sc(sc_data,params.width,params.height,params.margin);
  })
}

function sigIdfileToSC(params){
  var sig_ids = grpRead(params.url);
  var sig_objects = []
  var sc_data = []
  var lincscloud = 'http://lincscloud.org/api/siginfo?callback=?'
  
  sig_ids.forEach(function(element,index,array){
    $.getJSON(lincscloud,{q:'{"sig_id":' + element},function(response){
      sig_objects.push(response[0]);
    });
  });

  sig_objects.forEach(function(element,index,array){
    sc_data.push({s:element.distil_ss, c:element.distil_cc_q75});
  });

  sc(sc_data,params.width,params.height,params.margin);

}

function grpRead(url){
  d3.text(url,function(unparsedData){
    var data = d3.csv.parseRows(unparsedData);
    return data;
  })
}