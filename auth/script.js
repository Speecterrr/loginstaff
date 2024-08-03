document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const accessCode = document.getElementById('accessCode').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, accessCode })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login bem-sucedido');
                    // Redirecionar para a página principal ou dashboard
                    window.location.href = '/STAFF/index.html';
                } else {
                    alert('Login falhou: ' + data.message);
                }
            })
            .catch(error => console.error('Erro:', error));
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            const accessCode = document.getElementById('newAccessCode').value;

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, accessCode })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cadastro bem-sucedido');
                    // Redirecionar para a página de login
                    window.location.href = 'index.html';
                } else {
                    alert('Cadastro falhou: ' + data.message);
                }
            })
            .catch(error => console.error('Erro:', error));
        });
    }
});
