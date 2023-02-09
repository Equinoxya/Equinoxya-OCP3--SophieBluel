const appelLogin = fetch("http://localhost:5678/api/users/login", 
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    });
const result = await Response.json();
console.log(result);






/*const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === email &&  password === password){
        alert('connexion réussite')
    } else {alert('email ou mot de passe incorrect')}
})*/