function Sig_Info_Table_Object(div_id,title,show_height){
  this.div_id = div_id;
  this.show_height = show_height;
  this.show = show;
  this.hide = hide;
  this.collapse = collapse;
  this.expand = expand;
  this.buttonCallback = buttonCallback;
  this.add_data = add_data;
  this.clear_data = clear_data;
  this.open = true;
  this.add_data_from_symbol = add_data_from_symbol;
  this.set_data_from_sig_id = set_data_from_sig_id;
  this.set_data_from_objects = set_data_from_objects;

  header_html = '<div class="row-fluid" id="' + this.div_id.split("#")[1] + '_head" class="span12" style="background-color:#f0f0f0">' +
      '<span class="span1"><img style="max-width:60px;max-height:60px;" src="http://coreyflynn.github.com/Bellhop/img/signature.png"></span>' +
      '<h3 class="span10">' + title + '</h3>' +
      '<span class="span1"><img id="'+ this.div_id.split("#")[1] + '_button" style="max-width:60px;max-height:60px;" src="http://coreyflynn.github.com/Bellhop/img/plus_round_small_blue.png"></span>' +
      '</div>';

  $(this.div_id).append(header_html);
  $(this.div_id).css("padding-bottom", "2px");
  $(this.div_id + "_head").hover(function () { $(self.div_id + "_head").css("background-color","#bdbdbd"); },
                        function () { $(self.div_id + "_head").css("background-color","#f0f0f0"); });

  var self = this;
  $(this.div_id + '_head').click(function (evt) { self.buttonCallback(evt); });
  $(this.div_id).append('<div id="' +
              this.div_id.split("#")[1] +
              '_SIT" style="height:' +
              (this.show_height - $(this.div_id + "_head").outerHeight(true)) +
              'px"></div>');

  this.columns = [
    {id: "sig_id", name: "Sig ID", field: "sig_id"},
    {id: "cell_id", name: "Cell ID", field: "cell_id"},
    {id: "pert_type", name: "Pert Type", field: "pert_type"}
  ];

  this.options = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    fullWidthRows: true,
    forceFitColumns: true
  };

  this.data = [];

  this.grid = new Slick.Grid(this.div_id + "_SIT", this.data, this.columns, this.options);
  this.expand();

  function add_data_from_symbol(symbol){
    var siginfo = 'http://api.lincscloud.org/a2/siginfo?callback=?';
    var sig_id_list = [];
    var self = this;
    $.getJSON(siginfo,{q:'{"pert_iname":"' + symbol + '"}',
                f:'{"sig_id":1,"cell_id":1,"pert_type":1}',
                l:1000},
                function(response){
                  self.grid.setData(response);
                  self.grid.render();
                  self.show();
                });

  }

  function set_data_from_objects(object_array){
    self.grid.setData(object_array);
    self.grid.render();
    self.show();
  }

  function set_data_from_sig_id(sig_id_list){
    // sig_info API url
    var siginfo = 'http://api.lincscloud.org/siginfo?callback=?';

    // alias this to self for later use
    var self = this;

    // convert the array of sig_ids given to a string that can be used in an API call
    var sigs_string = '["' + sig_id_list.join('","') + '"]';

    // make a call to the siginfo API and populate the sig_info table with the results of
    // the call
    $.getJSON(siginfo,{q:'{"sig_id":{"$in":' + sigs_string + '}}',
      f:'{"sig_id":1,"cell_id":1,"pert_type":1,"score":1}',
      l:1000},
      function(response){
        if (response == 0){
          self.hide();
          self.clear_data();
        }else{
          self.grid.setData(response);
          self.grid.render();
          self.show();
        }
      }
    );
  }

  function add_data(d){
    var data = this.grid.getData();
    data.push(d);
    this.grid.setData(data);
    this.grid.render();
  }

  function clear_data(){
    this.grid.setData([]);
    this.grid.render();
  }

  function hide(duration){
    duration = (duration !== undefined) ? duration : 0;
    $(this.div_id).animate({opacity:0},duration);
    $(this.div_id).hide();
  }

  function show(){
    $(this.div_id).show();
    $(this.div_id).animate({opacity:1},500);
  }

  function collapse(){
    var duration = 300;
    $(this.div_id + "_SIT").fadeOut(duration);
    $(this.div_id).animate({height:$(this.div_id + "_head").outerHeight(true)},duration);
    $(this.div_id + "_button").rotate({animateTo:0,duration:duration});
  }

  function expand(){
    var duration = 300;
    $(this.div_id + "_SIT").fadeIn(duration);
    $(this.div_id).animate({height:this.show_height},duration);
    $(this.div_id + "_button").rotate({animateTo:45,duration:duration});
  }

  function buttonCallback(evt){
    if (this.open){
      this.collapse();
      this.open = false;
    }else{
      this.expand();
      this.open = true;
    }
  }
}