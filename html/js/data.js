var Module = Module || {};
Module.Data = function(data){
	this.data = data;
	this.DAO = new Module.DAO();
	this.init();
};

Module.Data.prototype = {
  init : function(){
		var _self = this;
		_self.addEventListeners();
		_self.getLocal();
	},
	addEventListeners : function(){
		var _self = this;
	},
	fetchData: function(callback){
		var _self = this;
		var endpoint = "https://lavictoria.mx/api/index.php";
		var result = function(r){
			if(r.status==200){
			  var result = r.json;
			  _self.saveLocal(result);
			  callback(r);
			}
		}
		_self.DAO.execute({method: "POST", url: endpoint },{ exec: "global" },result);

	},
	saveLocal : function(result){
		localStorage.setItem('app.data', JSON.stringify(result));
	},
	getLocal : function(){
		var _self = this;
		_self.data =  JSON.parse(localStorage.getItem('app.data')) || {};
	},

}


const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

function timeSince(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}
