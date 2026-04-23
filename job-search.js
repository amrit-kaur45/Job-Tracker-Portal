const categories = Array.from(jobCategory);

document.getElementById("search-bar").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item) => 
        item.title.toLowerCase().includes(searchData)
    );
    displayItems(filterData);
});

const displayItems = (items) => {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "";

    items.forEach((item, index) => {
        const { image, title, rate, av } = item;

        const jobList = document.createElement("div");
        jobList.className = 'j-list';

        jobList.innerHTML = `
            <img src="${image}" />
            <h3>${title}</h3>
            <p>Rate: ${rate}</p>
            <span id="key">${av}</span>
        `;

        rootElement.appendChild(jobList);



        jobList.addEventListener('click', () => {
            window.location.href = `job-details.html?id=${index}`;
        })
    });
};

displayItems(categories);

window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const jobQuery = params.get('job') || '';
    const locationQuery = params.get('location') || '';

    // Pre-fill the search bar on job.html
    const searchBar = document.getElementById('search-bar');
    if (searchBar && jobQuery) {
        searchBar.value = jobQuery;
    }

    // Trigger filtering if job-list.js exposes a filter function
    filterJobs(jobQuery);
});

document.getElementById('search-bar').addEventListener('input', function() {
    filterJobs(this.value.trim());
});

function filterJobs(query) {
    const items = document.querySelectorAll('.j-list');
    const q = query.toLowerCase();

    items.forEach(item => {
        const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
        const type = item.querySelector('span')?.textContent.toLowerCase() || '';
        item.style.display = (title.includes(q) || type.includes(q)) ? '' : 'none';
    });
}