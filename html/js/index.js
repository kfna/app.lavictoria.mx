var objApp;
var isLoaded;
var App = App || {};
$(document).ready(function(e){
 try {
  App = function(){
     this.env = {};
     switch(window.location.hostname){
       case "localhost": this.env = { server: 'http://localhost/' }; break;
       case "4c3171091faf.ngrok.io": this.env = { server: 'https://lavictoria.mx' }; break;
       case "dev.nuuphealth.com": this.env = { server: 'https://dev.nuuphealth.com:3001' }; break;
       case "app.nuuphealth.com": this.env = { server: 'https://app.nuuphealth.com:3001'  }; break;
     }
     if(Module.Helper){ this.Helper = new Module.Helper(); }
     if(Module.Data){ this.Data = new Module.Data(); }
     if(Module.UI){ this.UI = new Module.UI(); }
     if(Module.Forms){ this.Forms = new Module.Forms(); }
     if(Module.Modal){ this.Modal = new Module.Modal(); }
     if(Module.User){ this.User = new Module.User(); }
   }
   objApp = new App();
   if (typeof isLoaded == 'function') {
     isLoaded();
  }
 }catch(err){
   console.log(err);
 }
});
