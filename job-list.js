// Hardcoded jobs as fallback
const hardcodedJobs = [
    {
        id: 0,
        image: "google.png",
        title: "Web Developer",
        rate: "$900 - 1200/m",
        av: "Full Time",
        company: "Google",
        location: "USA",
        vacancy: "01",
        hours: "50h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from home",
        education: "Bachelor degree in any Computer Science Course",
        experience: "2 to 5 year(s)"
    },
    {
        id: 1,
        image: "uber.png",
        title: "Freelancer",
        rate: "$900 - 1200/m",
        av: "Freelancer",
        company: "Uber",
        location: "USA",
        vacancy: "04",
        hours: "40h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from office",
        education: "Degree in any Computer Science Course",
        experience: "1 to 5 year(s)"
    },
    {
        id: 2,
        image: "linkedin.png",
        title: "Business Associate",
        rate: "$900 - 1200/m",
        av: "Part Time",
        company: "Linkedin",
        location: "USA",
        vacancy: "03",
        hours: "50h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from office",
        education: "Bachelor degree in any Computer Science Course",
        experience: "2 to 5 year(s)"
    },
    {
        id: 3,
        image: "facebook.png",
        title: "Digital Marketing",
        rate: "$900 - 1200/m",
        av: "Full Time",
        company: "Facebook",
        location: "USA",
        vacancy: "05",
        hours: "40h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from office",
        education: "Bachelor degree in any Computer Science Course",
        experience: "2 to 5 year(s)"
    },
    {
        id: 4,
        image: "yahoo.png",
        title: "User Experience",
        rate: "$900 - 1200/m",
        av: "Full Time",
        company: "Yahoo",
        location: "USA",
        vacancy: "01",
        hours: "40h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from home",
        education: "Bachelor degree in any Computer Science Course",
        experience: "1 to 3 year(s)"
    },
    {
        id: 5,
        image: "apple.png",
        title: "Web Developer",
        rate: "$900 - 1200/m",
        av: "Full Time",
        company: "Apple",
        location: "USA",
        vacancy: "03",
        hours: "40h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from home",
        education: "Bachelor degree in any Computer Science Course",
        experience: "3 to 5 year(s)"
    },
    {
        id: 6,
        image: "instagram.png",
        title: "Product Designer",
        rate: "$900 - 1200/m",
        av: "Part Time",
        company: "Instagram",
        location: "USA",
        vacancy: "02",
        hours: "30h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from home",
        education: "Bachelor degree in any Computer Science Course",
        experience: "3 to 5 year(s)"
    },
    {
        id: 7,
        image: "wordpress.png",
        title: "Freelancer",
        rate: "$900 - 1200/m",
        av: "Freelancer",
        company: "Wordpress",
        location: "USA",
        vacancy: "07",
        hours: "30h / week",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        workplace: "Work from office",
        education: "Bachelor degree in any Computer Science Course",
        experience: "2 to 4 year(s)"
    }
];

// Keep jobCategory available for job-details page
let jobCategory = [...hardcodedJobs];

// Render jobs to container
function renderJobs(jobs) {
    const container = document.getElementById('root');
    if (!container) return;

    if (jobs.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888; padding:40px;">No jobs found.</p>';
        return;
    }

    container.innerHTML = jobs.map((job, index) => `
        <li data-item="${job.av || job.type || 'fulltime'}" class="j-list">
            <img src="${job.image || 'google.png'}" alt="${job.company}" onerror="this.src='google.png'">
            <h3>${job.title}</h3>
            <p>${job.company} — ${job.location}</p>
            <p>${job.rate}</p>
            <span id="key">${job.av || job.type || 'Full Time'}</span>
            <a href="job-details.html?id=${job.id ?? index}" 
   style="padding:8px 14px; background:#877894; color:#fff; text-decoration:none; border-radius:5px;">
   View Details
</a>
        </li>
    `).join('');
}

// Load jobs from DB, merge with hardcoded
async function loadJobs() {
    const container = document.getElementById('root');
    if (container) {
        container.innerHTML = '<p style="text-align:center; color:#888; padding:40px;">Loading jobs...</p>';
    }

    try {
        const res  = await fetch('api/get-jobs.php');
        const dbJobs = await res.json();

        if (Array.isArray(dbJobs) && dbJobs.length > 0) {
            // Merge DB jobs with hardcoded — DB jobs first
            jobCategory = [...dbJobs, ...hardcodedJobs];
        } else {
            jobCategory = [...hardcodedJobs];
        }
    } catch (err) {
        // If DB fails, just use hardcoded
        jobCategory = [...hardcodedJobs];
    }

    renderJobs(jobCategory);
}

// Run on page load
loadJobs();