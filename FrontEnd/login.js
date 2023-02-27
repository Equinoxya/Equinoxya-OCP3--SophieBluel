const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value
    })
    });

    const data = await response.json();
    const token = data.token;

    if (token) {
        // Stockez le jeton d'accès dans le stockage local du navigateur
        sessionStorage.setItem('token', token);
    
        // Redirigez l'utilisateur vers la page index.html
        window.location.href = 'index.html';
        
        // Recherchez les éléments avec l'id "adminMode" dans la page index.html
        const adminModeElements = document.querySelectorAll('#adminMode');
    
        // Affichez les éléments avec la classe "adminMode"
        adminModeElements.forEach(element => {
            element.style.display = 'flex';
        });
    } else {
        // Affichez un message d'erreur si la connexion a échoué
        alert('Erreur dans l’identifiant ou le mot de passe');
    }});