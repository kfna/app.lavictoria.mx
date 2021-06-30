/* FORMS */
var Module = Module || {};
Module.Helper = function(){
	this.init();
	this.el;
};

Module.Helper.prototype = {
  init : function(){
	  var _self = this;
  },
  addEventListeners: function(file){
    var _self = this;
  },

	getDate : function(date){
		var day = date.getDate();
		if(day<10){ day = "0"+day; }
		var month = date.getMonth() + 1;
		if(month<10){ month = "0"+month; }
		var year = date.getFullYear();
		var dt =year + '-' + month + '-' + day;
		return dt;
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
