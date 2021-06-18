var user = JSON.parse(localStorage.getItem("app.user"));
if(!user){ location.href = 'login.html'; }
