(async function(){
    if (!document.body || !document.body.hasAttribute('data-protected')) return;

    const API_BASE = 'http://localhost:8000';

    const params = new URLSearchParams(window.location.search);
    const tokenFromQuery = params.get('token');
    if (tokenFromQuery) {
        localStorage.setItem('api_token', tokenFromQuery);
        params.delete('token');
        const newUrl = window.location.origin + window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, document.title, newUrl);
    }

    const token = localStorage.getItem('api_token');
    if (!token) { window.location.href = './login.html'; return; }

    try {
        const res = await fetch(API_BASE + '/api/user', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok) {
            localStorage.removeItem('api_token');
            window.location.href = './login.html';
        }
    } catch (err) {
        console.error('Error comprobando token', err);
        localStorage.removeItem('api_token');
        window.location.href = './login.html';
    }
})();
