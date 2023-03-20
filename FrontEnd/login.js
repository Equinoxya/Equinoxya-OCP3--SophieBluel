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
        //Récupération du contenu des inputs
        email: emailInput.value,
        password: passwordInput.value
    })
    });

    const data = await response.json();
    const token = data.token;
    //Récupération du token ---------------------------------------------------------------------------

    if (token) {
        // Stockez le jeton d'accès dans le stockage local du navigateur--------------------------------
        localStorage.setItem('token', token);
        // Redirigez l'utilisateur vers la page index.html----------------------------------------------
        window.location.href = 'index.html';
    } else {
        // Affichez un message d'erreur si la connexion a échoué----------------------------------------
        alert('Erreur dans l\'identifiant ou le mot de passe')
    }});