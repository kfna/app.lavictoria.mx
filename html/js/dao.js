/* DAO */

var Module = Module || {};
Module.DAO = function(data){
	this.data = data;
	this.init();
};

Module.DAO.prototype = {
  init : function(){
		//if(DEBUG!=undefined && DEBUG){ console.log("DAO is ready... 0.0.1"); }
	},
	execute: function (endpoint, data, callback) {
		$.ajax({
			type: endpoint.method,
			url: endpoint.url,
			data: data,
			dataType: "json",
			success: function (r) { callback(r); },
			error: function (r) { console.log(r); }
	  });
  },
  toObject : function(form){
    var data = {};
    $.each(form, function(key,element){
			var el = $("#"+element.name)[0];
			if($(el).hasClass('noserialize')){ return; }
			if(data.hasOwnProperty(element.name) || $(el).attr("multiple")=="multiple"){
				if(!Array.isArray(data[element.name])){
					var temp = data[element.name];
					data[element.name] = [];
					if(temp!="" && temp!=null){ data[element.name].push(temp); }
				}
				data[element.name].push(element.value);
			}else{
				data[element.name] = element.value;
		  }
		});
	  return data;
  },
	toObjectAux : function(form){
    var data = {};
    $.each(form, function(key,element){
			var el = $("#"+element.name)[0];
			var label = $("#"+element.name+" option:selected").text();
			data[element.name] = {value: element.value, label: label };
		});
	  return data;
  },
}
