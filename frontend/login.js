// JavaScript para login frontend
// Ajusta API_BASE si tu backend no está servido desde la misma host/origen.
const API_BASE = 'http://localhost:8000'; // ejemplo: 'http://localhost/laravel-api/public'

const form = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

function showMessage(text, type = 'error') {
  messageEl.textContent = text;
  messageEl.className = `message ${type === 'error' ? 'error' : 'success'}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showMessage('', '');

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage('Rellena email y contraseña.', 'error');
    return;
  }

  try {
    const res = await fetch(API_BASE + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (res.status === 422) {
      const data = await res.json();
      console.debug('Login validation failed', data);
      const first = data?.errors ? Object.values(data.errors).flat()[0] : 'Error de validación';
      showMessage(first, 'error');
      return;
    }

    if (res.status === 401) {
      const data = await res.json();
      console.debug('Login unauthorized', data);
      showMessage(data?.message || 'Credenciales inválidas', 'error');
      return;
    }

    if (!res.ok) {
      showMessage('Error al conectar con el servidor', 'error');
      return;
    }

  const data = await res.json();
  console.debug('Login success response', data);

    // Guardamos token en localStorage
    if (data.token) {
      localStorage.setItem('api_token', data.token);
      showMessage('Login correcto. Redirigiendo...', 'success');
      // Redirige a test.html (protegida) pasando token en la query
      setTimeout(() => window.location.href = `./test.html?token=${encodeURIComponent(data.token)}`, 600);
    } else {
      showMessage('Respuesta inesperada del servidor', 'error');
    }

  } catch (err) {
    console.error(err);
    showMessage('Error de red: ' + err.message, 'error');
  }
});
