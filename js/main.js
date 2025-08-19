// js/main.js
// Ce fichier gère la logique de connexion et la navigation.

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simule une vérification de mot de passe.
            if (username === 'admin' && password === '1234') {
                // Redirige vers la page d'accueil
                window.location.href = 'accueil.html';
            } else {
                errorMessage.classList.remove('hidden');
            }
        });
    }
});
