/* FORMS */
var Module = Module || {};
Module.Forms = function(){
	this.init();
	this.el;
};

Module.Forms.prototype = {
  init : function(){
	var _self = this;
    _self.addEventListeners();
		alert(123);
  },
  addEventListeners: function(file){
    var _self = this;
    $(document).on("click","form a.onClick",function(){
			alert(123);
      switch($(this).data("exec")){
        case "save": _self.save($(this)); break;
				case "update": _self.update($(this)); break;
				case "delete": _self.delete($(this)); break;
				case "cancel": _self.cancel($(this)); break;
      }
    });
  },

  save: function(e){
    var _self = this;
	  var el = "#"+e.data("form");
	  var ctrl = $(el).data("ctrl");
		var action = "save";
		var callback = $(el).data("callback");


		if($(el).data("action")!==undefined){ action = $(el).data("action"); }
    _self.reset(el);
    if(!_self.validate(el,e)) return;
    var data = objDAO.toObject($(el).serializeArray());
		console.log(data);
    var result = function(r){
      if(r.status==200){
				$(e).removeClass("loading");
				$(el).removeClass("loading");
				$(el).append('<div class="ui success tiny message hidden">Registro ha sido <strong>guardado</strong> con éxito!</div>');
				$(el+ ' .ui.success').transition('scale');
				setTimeout(function(){
					$(el).children(".ui.success").remove();
					if(r.redirect!='' && r.redirect!=undefined  && r.redirect!="close_modal" && r.redirect!="reload"){
						location.href = r.redirect;
					} else if(r.redirect=="close_modal"){
						$('.ui.modal.'+r.modal).modal('hide');
					} else if(r.redirect=="close_modal"){
						location.reload();
					}else{
						location.reload(true);
					}
				},2000);
				eval(r.callback);
      }else{
        $("#notice").addClass("show");
        setTimeout(function(){ $("#notice").removeClass("show");  },5000);
				$(e).removeClass('loading')
      }
    }
    objDAO.execute(ctrl, { exec: action, data: data, callback: callback },result);
  },

	update: function(e){
    var _self = this;
	  var el = "#"+e.data("form");
	  var ctrl = $(el).data("ctrl");
		var action = "update";
		if($(e).hasClass('loading')){ return; }
		$(e).addClass("loading");
    _self.reset(el);
    //if(!_self.validate(el)) return;
    var data = objDAO.toObject($(el).serializeArray());
		if($(el).data("action")!==undefined){ action = $(el).data("action"); }
		var result = function(r){
      if(r.status==200){
				$(el).removeClass("loading");
				$(el).append('<div class="ui success tiny message hidden">Registro ha sido <strong>actualizado</strong> con éxito!</div>');
				$(el+ ' .ui.success').transition('scale');
				setTimeout(function(){
					if(r.redirect!='' && r.redirect!=undefined){
						location.href = r.redirect;
					}else{
						location.reload(true);
					}

				},1200)
      }else{
        $("#notice").addClass("show");
        setTimeout(function(){ $("#notice").removeClass("show");  },5000);
				$(e).removeClass('loading')
      }
    }
    objDAO.execute(ctrl, { exec: action, data: data},result);
  },
	delete: function(e){
		var _self = this;
		var data = { id: $(e).data("id"), idx: $(e).data("idx") };
		console.log(data);
		$('.ui.modal.confirm').modal({
			onApprove : function(){
				var ctrl = $(e).data("ctrl");
		    var result = function(r){
		      if(r.status==200){
		        location.reload();
		      }else{
		        //mostrar mensaje de error arriba
		      }
		    }
		    objDAO.execute(ctrl, { exec: "delete", data: data},result);
		  }
		}).modal('show');


  },
	cancel: function(e){
		var _self = this;
		var data = { id: $(e).data("id"), idx: $(e).data("idx") };
		var callback = $(e).data("callback");
		$('.ui.modal.confirm .content p').html("Esta seguro de querer cancelar el registro?");
		$('.ui.modal.confirm').modal({
			onApprove : function(){
				var ctrl = $(e).data("ctrl");
		    var result = function(r){
		      if(r.status==200){
		        eval(r.callback);
		      }else{
		        //mostrar mensaje de error arriba
		      }
		    }
		    objDAO.execute(ctrl, { exec: "cancel", data: data, callback: callback},result);
		  }
		}).modal('show');


  },

  validate : function(el,btn){
		return true;
		var flag = true;
		var field = null;

		$(el+ ' .ui.error').remove();
		$(el+ " .field.required").each(function(index,item) {
			var type = 'text';
			var row = $(this);
			$(row).removeClass('error');
			var field = $(item).children('input');
			console.log(field);
			if(field.length<=0){
				field = $(item).find('select');
				type = 'select';
			}
			if(field!=undefined && field[0].type!=undefined){
			  switch(type){
				  case "text":
				    if($(field).val()==""){
							$(row).addClass('error');
							flag = false;
						}
				  break;
					case "select":

				    if($(field).val()=="NULL"){
							$(row).addClass('error');
							flag = false;
						}
				  break;
		  	}
		  }
		});
		if(!flag){
			$(el).removeClass("loading");
			$(btn).removeClass("loading");
			$(el).append('<div class="ui error tiny message "><strong>Error!</strong> revise todos los campos marcados en rojo.</div>');
			$(el+ ' .ui.error').transition('scale');
		}
    return flag;
  },
  reset : function(el){
    //remove all errors and notices
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
