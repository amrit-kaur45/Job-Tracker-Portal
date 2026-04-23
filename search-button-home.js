document.getElementById('job-search').addEventListener('submit', function(e) {
    e.preventDefault();

    const jobQuery = document.getElementById('job').value.trim();
    const locationQuery = document.getElementById('location').value.trim();

    const params = new URLSearchParams();
    if (jobQuery) params.set('job', jobQuery);
    if (locationQuery) params.set('location', locationQuery);

    window.location.href = 'job.html?' + params.toString();
});