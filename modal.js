const modal       = document.getElementById('auth-modal');
const joinBtn     = document.getElementById('join-btn');
const closeBtn    = document.getElementById('modal-close');
const tabLogin    = document.getElementById('tab-login');
const tabSignup   = document.getElementById('tab-signup');
const loginForm   = document.getElementById('login-form');
const signupForm  = document.getElementById('signup-form');
const goSignup    = document.getElementById('go-signup');
const goLogin     = document.getElementById('go-login');

// Open modal
joinBtn.addEventListener('click', () => modal.classList.add('active'));

// Close modal
closeBtn.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

// Tab switching
function showLogin() {
    loginForm.style.display  = 'block';
    signupForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
}

function showSignup() {
    signupForm.style.display = 'block';
    loginForm.style.display  = 'none';
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
}

tabLogin.addEventListener('click', showLogin);
tabSignup.addEventListener('click', showSignup);
goSignup.addEventListener('click', showSignup);
goLogin.addEventListener('click', showLogin);

// LOGIN
document.getElementById('login-btn').addEventListener('click', () => {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const error    = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('jt-users') || '[]');
    const match = users.find(u => u.email === email && u.password === password);

    if (match) {
        localStorage.setItem('jt-logged-in', JSON.stringify(match));
        modal.classList.remove('active');
        alert(`Welcome back, ${match.name}!`);
        // Optionally: location.reload();
    } else {
        error.style.display = 'block';
    }
});

// SIGNUP
document.getElementById('signup-btn').addEventListener('click', () => {
    const name     = document.getElementById('signup-name').value.trim();
    const email    = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirm  = document.getElementById('signup-confirm').value.trim();
    const error    = document.getElementById('signup-error');

    if (!name || !email || password.length < 6 || password !== confirm) {
        error.style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('jt-users') || '[]');
    if (users.find(u => u.email === email)) {
        error.textContent   = 'Email already registered.';
        error.style.display = 'block';
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('jt-users', JSON.stringify(users));
    localStorage.setItem('jt-logged-in', JSON.stringify({ name, email }));

    modal.classList.remove('active');
    alert(`Account created! Welcome, ${name}!`);
    // Optionally: location.reload();
});