const bar  = document.getElementById('bar-icon');
const menu = document.getElementById('nav-menu');

if (bar && menu) {
    bar.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}