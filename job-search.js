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