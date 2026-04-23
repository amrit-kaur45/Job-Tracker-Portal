const user = JSON.parse(localStorage.getItem('jt-loggedIn'));
if (!user || user.role !== 'admin') {
    window.location.href = 'index.html';
}
document.getElementById("jobForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const job = {
            company: document.getElementById("company").value,
            title: document.getElementById("title").value,
            location: document.getElementById("location").value,
            type: document.getElementByIda("type").value,
            description: document.getElementById("description").value
        };

        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        jobs.push(job);
        localStorage.setItem("jobs", JSON.stringify(job));

        alert("Job added successfully!");
        document.getElementById("jobForm").reset();
    });