const bar = document.getElementById('bar-icon');

const menu = document.getElementById('nav-menu');


bar.addEventListener('click', () => {
    menu.classList.toggle('active');
});
