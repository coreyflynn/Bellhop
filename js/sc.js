function sigInfoToSC(params){
  d3.tsv(params.url,function(tsv){
    var sc_data = [];
    tsv.forEach(function(element,index,array){
      sc_data.push({s:element.distil_ss, c:element.distil_cc_q75});
    });
    SC = new SC_Object(params.div_id,sc_data,params.width,params.height,params.margin);
  });
}

function sigIdToSC(params){
  var sig_ids = [];
  d3.text(params.url,function(unparsedData){
    var grpLines = d3.csv.parseRows(unparsedData);
    grpLines.forEach(function(element,index,array){
      sig_ids.push(element[0]);
    });

    var sig_objects = [];
    var sc_data = [];
    var lincscloud = 'http://lincscloud.org/api/siginfo?callback=?';

    var SC = new SC_Object(params.div_id,[],params.width,params.height,params.margin);

    sig_ids.forEach(function(element,index,array){
      $.getJSON(lincscloud,{q:'{"sig_id":"' + element + '"}'},function(response){
        sig_object = response[0];
        SC.addData(sig_object.distil_ss, sig_object.distil_cc_q75);
      });
    });
  });

}

function SC_Object(div_id,sc_data,width,height,margin){
  this.div_id = div_id;
  this.sc_data = sc_data;
  this.width = width;
  this.height = height;
  this.margin = margin;
  this.init = false;

  this.addData = addData;
  this.draw = draw;
  this.draw();

  function addData(s_data,c_data){
    // adds a new sc_data object to th array object
    this.sc_data.push({s:s_data,c:c_data});
    this.draw();
  }

  function draw(){
    if (!this.init){

      this.svg=d3.select(this.div_id).append("svg").attr("width",width).attr("height",height);
      this.x=d3.scale.linear().domain([0,1]).range([this.margin,this.width-this.margin]);
      this.y=d3.scale.linear().domain([0,20]).range([this.height-this.margin,this.margin]);

      var xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

      this.svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(xAxis);

      this.svg.append("g")
        .attr("class", "axis")
         .attr("transform", "translate(" + margin + ",0)")
        .call(yAxis);

      this.svg.selectAll(".h").data(d3.range(4,20,4)).enter()
        .append("line").classed("h",1)
        .attr("x1",margin).attr("x2",height-margin)
        .attr("y1",this.y).attr("y2",this.y);

      this.svg.selectAll(".v").data(d3.range(.25,2,.25)).enter()
        .append("line").classed("v",1)
        .attr("y1",margin).attr("y2",width-margin)
        .attr("x1",this.x).attr("x2",this.x);

      this.svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "middle")
          .attr("x", width - width/2)
          .attr("y", height - 6)
          .text("CC");

      this.svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "middle")
          .attr("x", -height + height/2)
          .attr("y", 6)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("SS");

          this.init = true;
        }

    x=d3.scale.linear().domain([0,1]).range([this.margin,this.width-this.margin]);
    y=d3.scale.linear().domain([0,20]).range([this.height-this.margin,this.margin]);
    //we create the marks, which we put in an initial position
    var canvas = this.svg.selectAll("circle")
                  .data(this.sc_data);
                  
    canvas.enter().append("circle")
      .attr("cx",function(d) {return x(0);})
      .attr("cy",function(d) {return y(0);})
      .attr("r",0)
      .style("opacity","0.5")
      .style("fill","blue")
      .on("mouseover", function() { d3.select(d3.event.target).style("fill", "red"); })
      .on("mouseout", function() { d3.select(d3.event.target).style("fill", "blue"); });

    canvas.exit().remove()

    // now we initiate - moving the marks to their position
    canvas.transition().duration(1000)
      .attr("cx",function(d) {return x(+d.c);})
      .attr("cy",function(d) {return y(+d.s);})
      .attr("r",7);
  }

}

function grpRead(url){
  data = [];
  d3.text(url,function(unparsedData){
    var grpLines = d3.csv.parseRows(unparsedData);
    grpLines.forEach(function(element,index,array){
      data.push(element[0]);
    });
    console.log(data);
    return data;
  });
}