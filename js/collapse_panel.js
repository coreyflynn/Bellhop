function Collapse_Panel(options){
	options = (options !== undefined) ? options : {};
	this.image = (options.image !== undefined) ? options.image : "http://coreyflynn.github.com/Bellhop/img/plus_round_small.png";
	this.image_max = (options.image_max !== undefined) ? options.image_max : 60;
	this.div_target = (options.div_target !== undefined) ? options.div_target : "body";
	this.div_id = (options.div_id !== undefined) ? options.div_id : "CPanel" + Math.floor(Math.random()*1000000000);
	this.text = (options.text !== undefined) ? options.text : "Title";
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
				'<div class="row-fluid">',
				'<span class="span1"><img style="max-width:' + this.image_max + 'px;max-height:' + this.image_max + 'px;" src="' + this.image + '"/></span>',
				'<h3 class="span10">' + this.text + '</h3>',
				'<span class="span1"><img id="' + this.div_id + '_button" style="max-width:60px;max-height:60px;" src="http://coreyflynn.github.com/Bellhop/img/plus_round_small_blue.png"/></span>',
				'</div>',
				'</div>'
				].join('\n');
	this.panels = (options.panels !== undefined) ? options.panels : [];

	var self = this;
	$(this.div_target).append(this.html);
	$(this.div_target).css("padding-bottom", "2px");

	$("#" + this.div_id + "_button").click(function (evt) { self.buttonCallback(evt); });

	this.close_height = $("#" + this.div_id).outerHeight();
	this.open_height = $("#" + this.div_id).outerHeight();

	this.panels.forEach(function(panel){
		panel.add_to_div(self.div_id);
		$("#" + panel.div_id).addClass(self.div_id + "_sub_panel");
		self.open_height = self.open_height + $("#" + panel.div_id).outerHeight();
	});

	this.init_Panel = init_Panel;
	this.add_Panel = add_Panel;
	this.buttonCallback = buttonCallback;
	this.collapse = collapse;
	this.expand = expand;
	this.hide = hide;
	this.show = show;

	this.open = false;
	this.collapse(0);

	function init_Panel(panel){
		var self = this;
		this.panels.push(panel);
		panel.add_to_div(self.div_id);
		$("#" + panel.div_id).addClass(self.div_id + "_sub_panel");
		self.open_height = self.open_height + $("#" + panel.div_id).outerHeight();
	}

	function add_Panel(panel){
		var duration = 300;
		var self = this;
		this.panels.push(panel);
		this.collapse();
		setTimeout(function(){
			panel.add_to_div(self.div_id);
			$("#" + panel.div_id).addClass(self.div_id + "_sub_panel");
			self.open_height = self.open_height + $("#" + panel.div_id).outerHeight();
			self.expand();
		},duration);
	}

	function buttonCallback(evt){
		if (this.open){
			this.collapse(300);
			this.open = false;
		}else{
			this.expand(300);
			this.open = true;
		}
	}

	function collapse(duration){
		$("." + this.div_id + "_sub_panel").fadeOut(duration);
		$("#" + this.div_id).animate({height:this.close_height},duration);
		$("#" + this.div_id + "_button").rotate({animateTo:0,duration:duration});
	}

	function expand(duration){
		$('.' + this.div_id + "_sub_panel").fadeIn(duration);
		$("#" + this.div_id).animate({height:this.open_height},duration);
		$("#" + this.div_id + "_button").rotate({animateTo:45,duration:duration});
	}

	function hide(){
		$("#" + this.div_id).hide();
	}

	function show(){
		$("#" + this.div_id).show();
	}

}

function Panel(options){
	options = (options !== undefined) ? options : {};
	this.image = (options.image !== undefined) ? options.image : "";
	this.image_max = (options.image_max !== undefined) ? options.image_max : 60;
	this.text = (options.text !== undefined) ? options.text : "Title";
	this.div_id = (options.div_id !== undefined) ? options.div_id : "Panel" + Math.floor(Math.random()*1000000000);
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	if (this.image === ""){
		this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
				'<p class="lead offset2 span10">' + this.text + '</p>',
				'</div>'
				].join('\n');
	}else{
		this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
					'<span class="span1"><img style="max-width:' + this.image_max + 'px;max-height:' + this.image_max + 'px;" src="' + this.image + '"/></span>',
					'<p class="lead offset1 span10">' + this.text + '</p>',
					'</div>'
					].join('\n');
	}

	this.add_to_div = add_to_div;

	function add_to_div(div_target){
		$("#" + div_target).append(this.html);
	}
}

function Split_Text_Panel(options){
	options = (options !== undefined) ? options : {};
	this.image = (options.image !== undefined) ? options.image : "";
	this.image_max = (options.image_max !== undefined) ? options.image_max : 60;
	this.text1 = (options.text1 !== undefined) ? options.text1 : "Title";
	this.text2 = (options.text2 !== undefined) ? options.text2 : "text";
	this.div_id = (options.div_id !== undefined) ? options.div_id : "Split_Text_Panel" + Math.floor(Math.random()*1000000000);
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	if (this.image === ""){
		this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
					'<p class="lead offset2 span1"><b>' + this.text1 + '</b></p>',
					'<p class="lead span9">' + this.text2 + '</p>',
					'</div>'
					].join('\n');
	}else{
		this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
					'<p class="lead offset1 span1"><b>' + this.text1 + '</b></p>',
					'<p class="lead span9">' + this.text2 + '</p>',
					'</div>'
					].join('\n');
	}

	this.add_to_div = add_to_div;

	function add_to_div(div_target){
		$("#" + div_target).append(this.html);
	}
}

function Graph_Split_Text_Panel(options){
	options = (options !== undefined) ? options : {};
	this.image = (options.image !== undefined) ? options.image : "";
	this.image_max = (options.image_max !== undefined) ? options.image_max : 60;
	this.text1 = (options.text1 !== undefined) ? options.text1 : "Title";
	this.text2 = (options.text2 !== undefined) ? options.text2 : "text";
	this.div_id = (options.div_id !== undefined) ? options.div_id : "Split_Text_Panel" + Math.floor(Math.random()*1000000000);
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	this.graph_val = (options.graph_val !== undefined) ? options.graph_val : 1;
	this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
				'<div class="span2" id="' + this.div_id + '_graph"></div>',
				'<p class="lead span1"><b>' + this.text1 + '</b></p>',
				'<p class="lead span8">' + this.text2 + '</p>',
				'</div>'
				].join('\n');

	this.add_to_div = add_to_div;

	function add_to_div(div_target){
		$("#" + div_target).append(this.html);
		graph = d3.selectAll("#" + this.div_id + "_graph");
		total_width = $("#" + this.div_id + "_graph").outerWidth();
		width = this.graph_val * total_width;
		height = $("#" + this.div_id + "_graph").outerHeight(true);
		graph.append("svg")
			.attr("width",total_width)
			.attr("height",height);
		svg = graph.selectAll("svg");
		svg.selectAll("rect.bg").data([1])
				.enter().append("rect")
				.attr("x",total_width - width)
				.attr("y",0)
				.attr("class","bg")
				.attr("height", height)
				.attr("width", width)
				.attr("fill","#636363");
		svg.selectAll("rect.axis").data([1])
				.enter().append("rect")
				.attr("x",total_width - 2)
				.attr("y",0)
				.attr("class","axis")
				.attr("height", height)
				.attr("width", 2)
				.attr("fill","#000000");

	}
}

function SC_Panel(options){
	options = (options !== undefined) ? options : {};
	this.image = (options.image !== undefined) ? options.image : "";
	this.image_max = (options.image_max !== undefined) ? options.image_max : 60;
	this.div_id = (options.div_id !== undefined) ? options.div_id : "SC_Panel" + Math.floor(Math.random()*1000000000);
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	this.data = (options.data !== undefined) ? options.data : [];
	this.margin = (options.margin !== undefined) ? options.margin : 20;
	this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
				'<div class="span2" id="' + this.div_id + '_sc"></div>',
				'</div>'
				].join('\n');

	// method definitions
	this.add_to_div = add_to_div;

	function add_to_div(div_target){
		// inject the panel html into the DOM
		$("#" + div_target).append(this.html);

		// set up the dimensions of the sc plot and resize the panel container div to fit the graph
		this.sc = d3.selectAll("#" + this.div_id + "_sc");
		this.total_width = $("#" + this.div_id + "_sc").outerWidth();
		this.width = this.total_width;
		this.height = this.total_width;

		// add the top level svg element to the div and set up scales for the graph
		this.svg=d3.select(this.div_id).append("svg").attr("width",this.width).attr("height",this.height);
		this.x=d3.scale.linear().domain([0,1]).range([0,this.width - this.margin]);
		this.y=d3.scale.linear().domain([0,20]).range([this.height - this.margin,0]);

		// build an xAxis to call later on
		var xAxis = d3.svg.axis()
			.scale(this.x)
			.orient("bottom");

		// build an yAxis to call later on
		var yAxis = d3.svg.axis()
			.scale(this.y)
			.orient("left");

		// plot the x axis
		this.svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (this.height - this.margin) + ")")
			.call(xAxis);

		// plot the y axis
		this.svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + this.margin + ",0)")
			.call(yAxis);

		// add y ticks
		this.svg.selectAll(".h").data(d3.range(4,20,4)).enter()
			.append("line").classed("h",1)
			.attr("x1",this.margin).attr("x2",this.height-this.margin)
			.attr("y1",this.y).attr("y2",this.y);

		// add x ticks
		this.svg.selectAll(".v").data(d3.range(0.25,2,0.25)).enter()
			.append("line").classed("v",1)
			.attr("y1",this.margin).attr("y2",width-this.margin)
			.attr("x1",this.x).attr("x2",this.x);

		// add x label
		this.svg.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "middle")
			.attr("x", this.width - this.width/2)
			.attr("y", this.height - 6)
			.text("CC");

		// add y label
		this.svg.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "middle")
			.attr("x", -this.height + height/2)
			.attr("y", 6)
			.attr("dy", ".75em")
			.attr("transform", "rotate(-90)")
			.text("SS");

	}
}

function List_Search_Panel(options){
	options = (options !== undefined) ? options : {};
	this.text = (options.text !== undefined) ? options.text : "Title";
	this.div_id = (options.div_id !== undefined) ? options.div_id : "List_Search_Panel" + Math.floor(Math.random()*1000000000);
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	this.grid_height = (options.grid_height !== undefined) ? options.grid_height : 300;
	this.grid_columns = (options.grid_columns !== undefined) ? options.grid_columns : [{id: "data", name: "Data", field: "data"}];
	this.grid_options = (options.grid_options !== undefined) ? options.grid_options : {enableCellNavigation: true,enableColumnReorder: false,fullWidthRows: true,forceFitColumns: true};
	this.grid_data = (options.grid_data !== undefined) ? options.grid_data : ["DataPoint1","DataPoint2","DataPoint3"];
	this.typeahead_options = (options.typeahead_options !== undefined) ? options.typeahead_options : {source:["DataPoint1","DataPoint2","DataPoint3"]};
	this.grid_filter_columns = (options.grid_filter_columns !== undefined) ? options.grid_filter_columns : ["data"];
	this.placeholder_text = (options.placeholder_text !== undefined) ? options.placeholder_text : "Search";
	this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
				'<input class="offset1 span10" type="text" placeholder="' + this.placeholder_text + '" data-provide="typeahead" id="' + this.div_id + '_search">',
				'<div id="' + this.div_id + '_grid" style="height:' + this.grid_height + 'px">',
				'</div>'
				].join('\n');

	this.add_to_div = add_to_div;
	this.filter_grid_data = filter_grid_data;

	function add_to_div(div_target){
		// adds the hmtl for this panel into the div at the given div target.  The search and slick grid components
		// are configured according to the passed arguments in the contructor
		$("#" + div_target).append(this.html);
		$("#" + this.div_id + "_search").typeahead(this.typeahead_options);
		this.grid = new Slick.Grid("#" + this.div_id + "_grid", this.grid_data, this.grid_columns, this.grid_options);
		this.grid.render();
		var self = this;
		$("#" + this.div_id + "_search").change(function (evt) { self.filter_grid_data($("#" + self.div_id + "_search").val(),self.grid_filter_columns); });

	}

	function filter_grid_data(search_string,columns_list){
		// filters the content of the grid data for the search_string matching any of the entries in the columns listed in
		// columns_list
		if (search_string === ""){
			this.grid.setData(this.grid_data);
			this.grid.render();
		}else{
			data = this.grid_data;
			filtered_data = [];
			data.forEach(function(data_element,data_index,data_array){
				var vals = [];
				columns_list.forEach(function(col_element,col_index,col_array){
					vals.push(data_element[col_element]);
				});
				if ($.inArray(search_string,vals) != -1){
					filtered_data.push(data_element);
				}
			});
			this.grid.setData(filtered_data);
			this.grid.render();
		}
	}
}

function List_Panel(options){
	options = (options !== undefined) ? options : {};
	this.div_id = (options.div_id !== undefined) ? options.div_id : "List_Search_Panel" + Math.floor(Math.random()*1000000000);
	this.style = (options.style !== undefined) ? options.style : "background-color:#f0f0f0";
	this.grid_height = (options.grid_height !== undefined) ? options.grid_height : 300;
	this.grid_columns = (options.grid_columns !== undefined) ? options.grid_columns : [{id: "data", name: "Data", field: "data"}];
	this.grid_options = (options.grid_options !== undefined) ? options.grid_options : {enableCellNavigation: true,enableColumnReorder: false,fullWidthRows: true,forceFitColumns: true};
	this.grid_data = (options.grid_data !== undefined) ? options.grid_data : ["DataPoint1","DataPoint2","DataPoint3"];
	this.html = ['<div class="row-fluid" id="' + this.div_id + '" class="span12" style=' + this.style + '>',
				'<div id="' + this.div_id + '_grid" style="height:' + this.grid_height + 'px">',
				'</div>'
				].join('\n');

	this.add_to_div = add_to_div;

	function add_to_div(div_target){
		$("#" + div_target).append(this.html);

		this.grid = new Slick.Grid("#" + this.div_id + "_grid", this.grid_data, this.grid_columns, this.grid_options);

	}
}