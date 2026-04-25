document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const jobQuery = params.get("job") || "";

    const searchBar = document.getElementById("search-bar");

    if (searchBar) {
        searchBar.value = jobQuery;

        searchBar.addEventListener("input", (e) => {
            applyFilter(e.target.value);
        });
    }

    // Wait for jobs to finish loading from DB
    waitForJobsAndFilter(jobQuery);
});

function waitForJobsAndFilter(query) {
    if (!query) return;

    if (typeof jobCategory !== 'undefined' && jobCategory.length > 0) {
        applyFilter(query);
    } else {
        setTimeout(() => waitForJobsAndFilter(query), 200);
    }
}

function applyFilter(query) {
    const q = query.toLowerCase();

    const filtered = jobCategory.filter(job => {
        return (
            (job.title && job.title.toLowerCase().includes(q)) ||
            (job.av && job.av.toLowerCase().includes(q)) ||
            (job.company && job.company.toLowerCase().includes(q))
        );
    });

    renderJobs(filtered);
}