/* FORMS */
var Module = Module || {};
Module.Modal = function(){
	this.init();
	this.cb;
	this.el;
};

Module.Modal.prototype = {
  init : function(){
	  var _self = this;
		_self.addEventListeners();
  },
  addEventListeners: function(file){
    var _self = this;
		$(document).on("click","a.modal",function(){
      switch($(this).data("exec")){
        case "open": _self.open($(this)); break;
				case "close": _self.close($(this)); break;
      }
    });
  },
	open : function(e){
		var _self = this;
		var params = $(e).data();
		$("body").addClass("off");
		$("#modal").fadeIn();
		if (typeof _self.cb == 'function') {
			_self.cb(params);
		}else{
			//
		}
	},
	close : function(e){
		$("body").removeClass("off");
		$("#modal").fadeOut();
	},
	formatDate : function(val){
		if(val==null || val==""){ return ""; }
		var dt = val;
		var date = dt.split("-");
		var rdate = '';
		var month = '';
		switch(date[1]){
			case "01": month = 'ENE'; break;
			case "02": month = 'FEB'; break;
			case "03": month = 'MAR'; break;
			case "04": month = 'ABR'; break;
			case "05": month = 'MAY'; break;
			case "06": month = 'JUN'; break;
			case "07": month = 'JUL'; break;
			case "08": month = 'AGO'; break;
			case "09": month = 'SEP'; break;
			case "10": month = 'OCT'; break;
			case "11": month = 'NOV'; break;
			case "12": month = 'DIC'; break;
		}
		rdate = date[2]+"-"+month+"-"+date[0];
		return rdate;

	},
	formatDateTime : function(val){
		if(val==null || val==""){ return ""; }
		var dt = val.split(" ");
		var date = dt[0].split("-");
		var rdate = '';
		var month = '';
		switch(date[1]){
			case "01": month = 'ENE'; break;
			case "02": month = 'FEB'; break;
			case "03": month = 'MAR'; break;
			case "04": month = 'ABR'; break;
			case "05": month = 'MAY'; break;
			case "06": month = 'JUN'; break;
			case "07": month = 'JUL'; break;
			case "08": month = 'AGO'; break;
			case "09": month = 'SEP'; break;
			case "10": month = 'OCT'; break;
			case "11": month = 'NOV'; break;
			case "12": month = 'DIC'; break;
		}
		rdate = date[2]+"-"+month+"-"+date[0]+" "+dt[1];
		return rdate;

	}
};
