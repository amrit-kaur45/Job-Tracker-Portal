document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const jobQuery = params.get("job") || "";

    const searchBar = document.getElementById("search-bar");

    if (searchBar) {
        searchBar.value = jobQuery;

        // Live typing
        searchBar.addEventListener("input", (e) => {
            applyFilter(e.target.value);
        });
    }

    // Wait until jobs are loaded from job-list.js
    setTimeout(() => {
        if (jobQuery) {
            applyFilter(jobQuery);
        }
    }, 300); // small delay to ensure data is loaded
});

// FILTER FUNCTION (works with your renderJobs)
function applyFilter(query) {
    const q = query.toLowerCase();

    const filtered = jobCategory.filter(job => {
        return (
            job.title.toLowerCase().includes(q) ||
            job.av.toLowerCase().includes(q) ||
            job.company.toLowerCase().includes(q)
        );
    });

    renderJobs(filtered);
}