function Gene_Info_Object(div_id,width,height,margin){
	this.div_id = div_id;
	this.width = width;
	this.height = height;
	this.margin = margin;
	this.init = false;

	this.draw = draw;

	function draw(gene_name){
		if (!this.init){
			this.svg=d3.select(this.div_id).append("svg").attr("width",width).attr("height",height);
		}

		var symbol = this.svg.selectAll("text")
						.data([gene_name]);

		x=d3.scale.linear().domain([0,1]).range([this.margin,this.width-this.margin]);
		y=d3.scale.linear().domain([0,1]).range([this.height-this.margin,this.margin]);
		
		symbol.enter().append("text")
			.attr("x",x(0.5))
			.attr("y",x(0.5))
			.text(d);
	}

}
