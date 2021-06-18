var Module = Module || {};

Module.Patient = function(data){
	this.init();
	this.DAO = new Module.DAO();
	this.User = new Module.User();
};

Module.Patient.prototype = {
  init : function(){
		var _self = this;
	},
	save : function(payload,cb){
		$('.loading').addClass('loading-on');
		var _self = this;
		var endpoint = "/patient/save";
		payload.uid =
		_self.DAO.execute({method: "POST", url: objNuup.env.server+endpoint},payload,cb);
	},
	prepareProfile: function(){
		var _self = this;
		var medicamentos = [];
		var antecedentes = [];
		var cirugias = [];
		var alergias = [];
		var padecimientos = [];
		$("div.medicamentos").children().each(function(index,item){
		  medicamentos.push({ medicamento: $(this).find("#medicamento").val(), frecuenciaMedicamento: $(this).find("#frecuenciaMedicamento").val() });
		});

		$("div.antecedentes").children().each(function(index,item){
		  antecedentes.push({ antecedente: $(this).find("#antecedente").val(), familiar: $(this).find("#familiar").val(), estatus: $(this).find("#estatus").val() });
		});

		$("div.cirugias").children().each(function(index,item){
		  cirugias.push({ cirugia: $(this).find("#cirugia").val(), fechaCirugia: $(this).find("#fechaCirugia").val() });
		});

		$("div.alergias").children().each(function(index,item){
		  alergias.push({ alergia: $(this).find("#alergia").val(), reaccion: $(this).find("#reaccion").val() });
		});

		$("div.padecimientos").children().each(function(index,item){
		  padecimientos.push({ padecimiento: $(this).find("#padecimiento").val(), fechaPadecimiento: $(this).find("#fechaPadecimiento").val() });
		});

		var data = _self.DAO.toObject($("#frmPatientProfile").serializeArray());
		data.medicamentos = medicamentos;
		data.antecedentes = antecedentes;
		data.cirugias = cirugias;
		data.alergias = alergias;
		data.padecimientos = padecimientos;
		console.log(data);
		_self.saveProfile(data);


	},
	saveProfile : function(data){
		var _self = this;
		$('.loading').addClass('loading-on');
		var endpoint = "/patient/profile/update";
		var payload = data;
		payload.uid = _self.User.user.ID;
		var result = function(r){ };
		_self.DAO.execute({method: "POST", url: objNuup.env.server+endpoint},payload,result);
	},
	getPatients : function(payload,cb){
		console.log(payload);
		var _self = this;
		var endpoint = "/doctor/patients";
		var result = function(r){ if(r.status==200){
			var result = JSON.parse(r.body);
			cb(result);
			}
		}
		_self.DAO.execute({method: "POST", url: objNuup.env.server+endpoint},payload,result);
	},
	getPatient:function(payload,cb){
		var _self = this;
		var endpoint = "/patient/view";
		var result = function(r){
			if(r.status==200){
			var data = JSON.parse(r.body);
			cb(data.Result[0]);
		}
		}
		_self.DAO.execute({method: "POST", url: objNuup.env.server+endpoint},payload,result);
	},

}
