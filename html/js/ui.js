var Module = Module || {};
Module.UI = function(data){
	this.data = data;
	this.Data = new Module.Data();
	this.init();
};

Module.UI.prototype = {
  init : function(){
		var _self = this;
		_self.fetchElements();
	},
	fetchElements: function(){
    var _self = this;
    $('select[data-source]').each(function(e){
			var json = _self.Data.data;
			switch($(this).data("source")){
				case "unidades":
				  var unidades = json.unidades;

					var buffer = '<option id="NULL">Seleccionar</option>';
				  for(var i=0;i<unidades.length;i++){
						buffer += '<option id="'+unidades[i].id+'">'+unidades[i].alias+'</option>';
					}
					$(this).html(buffer);
				break;
				case "usuarios":
				  var usuarios = json.usuarios;
					console.log(usuarios);
					var buffer = '<option id="NULL">Seleccionar</option>';
				  for(var i=0;i<usuarios.length;i++){
						buffer += '<option id="'+usuarios[i].id+'">'+usuarios[i].nombre+'</option>';
					}
					$(this).html(buffer);
				break;

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
