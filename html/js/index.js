var objApp;
var isLoaded;
var App = App || {};
$(document).ready(function(e){
 try {
  App = function(){
     this.env = {};
     switch(window.location.hostname){
       case "localhost": this.env = { server: 'https://lavictoria.mx' }; break;
        case "919692ecfc60.ngrok.io": this.env = { server: 'https://lavictoria.mx' }; break;
       case "dev.nuuphealth.com": this.env = { server: 'https://dev.nuuphealth.com:3001' }; break;
       case "app.nuuphealth.com": this.env = { server: 'https://app.nuuphealth.com:3001'  }; break;
     }
     if(Module.Data){ this.Data = new Module.Data(); }
     if(Module.UI){ this.Data = new Module.UI(); }
     if(Module.Forms){ this.Forms = new Module.Forms(); }
     if(Module.User){ this.User = new Module.User(); }
   }
   objApp = new App();
   //isLoaded();
 }catch(err){
   console.log(err);
 }
});
