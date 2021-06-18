/* DAO */

var Module = Module || {};
Module.Biodigital = function(data){
	this.data = data;
	this.DAO = new Module.DAO();
	this.collections;
	this.init();
};

Module.Biodigital.prototype = {
  init : function(){
		var _self = this;
		//_self.getCollections();
	},
	getCategories : function(payload){
    var _self = this;
		var result = function(r){
		  var json = JSON.parse(r.body);
			_self.collections = json.myhuman;
			$("#searchbio").keyup(function(e){
				$(".search .bio.options").fadeIn();
				$(".search .bio.options ul").empty();
				var keyword = $(this).val();
				if(keyword.length<3) return false;
				var list = _.filter(_self.collections, function(item){
					if(item.content_title.indexOf(keyword)>0) return true; else return false;
				});
				var buffer = '';
				for(var i=0;i<list.length;i++){
					buffer +='<li><a href="javascript:void(0)" data-id="'+list[i].content_id+'" onclick="getBio(this)">'+list[i].content_title+'</a></li>';
				}
				$(".search .bio.options ul").html(buffer);
			});
		}
		_self.DAO.execute({method: "POST", url: objNuup.env.server+"/biodigital/categories"},payload,result);
	},
	getCategory : function(payload,cb){
    var _self = this;
		var result = function(r){
		  var json = JSON.parse(r.body);
			console.log(json);
			cb(json.content_list);
		}
		_self.DAO.execute({method: "POST", url: objNuup.env.server+"/biodigital/collections/"},payload,result);
	},
	getModels : function(payload,cb){
    var _self = this;
		var result = function(r){
		  var json = JSON.parse(r.body);
			cb(json);
		}
		_self.DAO.execute({method: "POST", url: objNuup.env.server+"/biodigital/collections/"},payload,result);
	},

}
