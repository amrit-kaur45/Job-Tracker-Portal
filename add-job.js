// ── LOGIN — calls api/login.php ──
document.getElementById('login-btn').addEventListener('click', async function () {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showMsg('Please fill in all fields.', 'error'); return;
    }

    showMsg('Logging in...', 'info');

    try {
        const res  = await fetch('api/login.php', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.error) {
            showMsg(data.error, 'error');
        } else {
            const isAdmin = data.email === 'damanpreet1328@gmail.com';

            localStorage.setItem('jt-loggedIn', JSON.stringify({
                name:  data.name,
                email: data.email,
                role:  isAdmin ? 'admin' : 'user'
            }));

            showMsg('Login successful! Redirecting...', 'success');
            if (isAdmin) {
                setTimeout(() => { window.location.href = 'add-job.html'; }, 1200);
            } else {
                setTimeout(() => { window.location.href = 'index.html'; }, 1200);
            }
        }
    } catch (err) {
        showMsg('Server error. Please try again.', 'error');
    }
});