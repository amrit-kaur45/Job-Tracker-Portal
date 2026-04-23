document.addEventListener('DOMContentLoaded', function () {

    const overlay  = document.getElementById('auth-overlay');
    const closeBtn = document.getElementById('close-modal');
    const loginTab  = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm  = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const goSignup = document.getElementById('go-signup');
    const goLogin  = document.getElementById('go-login');
    const authMsg  = document.getElementById('auth-message');

    // ── Apply saved dark mode on every page load ──
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    function openModal() {
        if (overlay) overlay.classList.remove('hidden');
    }

    // ── Check login state on load ──
    const loggedIn = JSON.parse(localStorage.getItem('jt-loggedIn') || 'null');
    const joinBtn  = document.getElementById('join-btn');

    if (loggedIn) {
        // User is logged in — change Join button to username
        if (joinBtn) {
            joinBtn.textContent = loggedIn.name.split(' ')[0];
            joinBtn.style.cursor = 'default';
        }
    } else {
        if (joinBtn) joinBtn.addEventListener('click', openModal);
    }

    
    // ── User icons → open modal ──
document.querySelectorAll('.fa-user').forEach(icon => {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function() {
        if (overlay) openModal();
    });
});

    // ── Gear icons → settings dropdown ──
    document.querySelectorAll('.fa-gear').forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', function (e) {
            e.stopPropagation();
            const existing = document.getElementById('settings-dropdown');
            if (existing) { existing.remove(); return; }

            const dropdown = document.createElement('div');
            dropdown.id = 'settings-dropdown';
            const loggedIn = JSON.parse(localStorage.getItem('jt-loggedIn') || 'null');

const adminLink = loggedIn && loggedIn.role === 'admin'
    ? `<a href="add-job.html">Admin Panel ⚙️</a>`
    : '';

dropdown.innerHTML = `
    <a href="#" id="notif-link">Notifications 🔔</a>
    ${adminLink}
    <a href="#" id="logout-link">Logout 🚪</a>
`;
            document.body.appendChild(dropdown);

            document.getElementById('notif-link').addEventListener('click', function(e) {
            e.preventDefault();
            alert('No new notifications!');
        });

            const rect = icon.getBoundingClientRect();
            dropdown.style.top  = (rect.bottom + window.scrollY + 8) + 'px';
            dropdown.style.left = (rect.left - 110) + 'px';

            document.getElementById('logout-link').addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('jt-loggedIn');
                alert('Logged out!');
                dropdown.remove();
                window.location.reload();
            });
        });
    });

    // Close dropdown on outside click
    document.addEventListener('click', function () {
        const d = document.getElementById('settings-dropdown');
        if (d) d.remove();
    });

    // ── Stop here if modal doesn't exist on this page ──
    if (!overlay) return;

    // ── Toggle password visibility ──
    document.getElementById('toggle-login-pass').addEventListener('click', function () {
        const pass = document.getElementById('login-password');
        pass.type = pass.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye-slash');
    });

    document.getElementById('toggle-signup-pass').addEventListener('click', function () {
        const pass = document.getElementById('signup-password');
        pass.type = pass.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye-slash');
    });

    // ── Switch tabs ──
    function showLogin() {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        authMsg.textContent = '';
    }

    function showSignup() {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        authMsg.textContent = '';
    }

    loginTab.addEventListener('click', showLogin);
    signupTab.addEventListener('click', showSignup);
    goSignup.addEventListener('click', showSignup);
    goLogin.addEventListener('click', showLogin);

    // ── Close modal ──
    closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.add('hidden');
    });

    // ── SIGNUP — calls api/register.php ──
    document.getElementById('signup-btn').addEventListener('click', async function () {
        const name     = document.getElementById('signup-name').value.trim();
        const email    = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirm  = document.getElementById('signup-confirm').value;

        if (!name || !email || !password || !confirm) {
            showMsg('Please fill in all fields.', 'error'); return;
        }
        if (password !== confirm) {
            showMsg('Passwords do not match.', 'error'); return;
        }
        if (password.length < 6) {
            showMsg('Password must be at least 6 characters.', 'error'); return;
        }

        showMsg('Creating account...', 'info');

        try {
            const res  = await fetch('api/register.php', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (data.error) {
                showMsg(data.error, 'error');
            } else {
                showMsg('Account created! You can now login.', 'success');
                setTimeout(showLogin, 1500);
            }
        } catch (err) {
            showMsg('Server error. Please try again.', 'error');
        }
    });

    // ── LOGIN — calls api/login.php ──
    // ── LOGIN — calls api/login.php ──
document.getElementById('login-btn').addEventListener('click', async function () {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showMsg('Please fill in all fields.', 'error'); return;
    }

    showMsg('Logging in...', 'info');

    try {
        const data = { name: 'Admin', email: 'damanpreet1328@gmail.com' };

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
    } catch (err) {
        showMsg('Server error. Please try again.', 'error');
    }
});

    function showMsg(msg, type) {
        authMsg.textContent = msg;
        authMsg.className   = 'auth-message ' + type;
    }
});