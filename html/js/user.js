var Module = Module || {};
Module.User = function(data){
	this.data = data;
	this.user = {};
	this.DAO = new Module.DAO();
	this.Data = new Module.Data();
	this.init();
};

Module.User.prototype = {
  init : function(){
		var _self = this;
		_self.getUser();
		_self.addEventListeners();
	},
	addEventListeners: function(){
    var _self = this;
    $(document).on("click","#frmAuth a",function(e){
      switch($(this).data("exec")){
        case "auth": _self.auth(); break;
      }
    });
	},
	auth : function(){
		var _self = this;
		$("#frmAuth .login").fadeIn();
		var endpoint = {};
    var payload = { exec: "auth", data: _self.DAO.toObject($("#frmAuth").serializeArray()) };
		endpoint.url = "/api/index.php";
		endpoint.method = "POST";
		var result = function(r){
			if(r.status==200){
			  localStorage.removeItem('app.user');
			  localStorage.setItem('app.user', JSON.stringify(r.json.user));
				//fetch all data
				_self.Data.fetchData(function(){
					location.href= r.body.redirect;
				});

		  }else{
			  alert("Error! verifique usuario y/o contraseña"); return;}
		}
		$("#frmAuth .login").fadeOut();
		_self.DAO.execute({method: "POST", url: objApp.env.server+endpoint.url},payload,result);
	},
	getUser : function(){
		var _self = this;
		var user = JSON.parse(localStorage.getItem('app.user')) || {};
		_self.user = user;
		//$("span.fullname").html(user.fullname);
	},
}
