const freelancers = [
    {
        id: 0,
        name: "Robert Fox",
        role: "Frontend Developer",
        img: "fl-1.png",
        bio: "Robert is a passionate frontend developer with 5+ years of experience building responsive and accessible web applications. He loves clean code and pixel-perfect designs.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
        projects: 48,
        clients: 32,
        experience: "5 yrs"
    },
    {
        id: 1,
        name: "Kristin Watson",
        role: "UI/UX Designer",
        img: "fl-2.png",
        bio: "Kristin specializes in designing intuitive user interfaces and seamless user experiences. She bridges the gap between design and development with ease.",
        skills: ["Figma", "HTML", "CSS", "JS", "Adobe XD"],
        projects: 61,
        clients: 40,
        experience: "7 yrs"
    },
    {
        id: 2,
        name: "Darrell Steward",
        role: "Full Stack Developer",
        img: "fl-3.png",
        bio: "Darrell is a full stack developer who enjoys building end-to-end solutions. From databases to polished UIs, he handles the full cycle of web development.",
        skills: ["HTML", "CSS", "JS", "Node.js", "MongoDB"],
        projects: 74,
        clients: 55,
        experience: "8 yrs"
    },
    {
        id: 3,
        name: "Theresa Webb",
        role: "JavaScript Developer",
        img: "fl-4.png",
        bio: "Theresa is a JavaScript enthusiast who specializes in building dynamic, high-performance web applications. She is known for her problem-solving skills.",
        skills: ["HTML", "CSS", "JS", "Vue.js", "TypeScript"],
        projects: 39,
        clients: 28,
        experience: "4 yrs"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const card = document.getElementById('profile-card');
    const freelancer = freelancers[id];

    if (!freelancer) {
        card.innerHTML = `<p class="not-found">Profile not found. <a href="index.html">Go back home</a></p>`;
        return;
    }

    // Update page title
    document.title = freelancer.name + ' - Job Tracker';

    // Render profile
    card.innerHTML = `
        <img src="${freelancer.img}" alt="${freelancer.name}" class="profile-avatar">
        <h2>${freelancer.name}</h2>
        <p class="profile-role">${freelancer.role}</p>

        <hr class="profile-divider">

        <p class="profile-bio">${freelancer.bio}</p>

        <p class="profile-skills-title">Skills</p>
        <div class="profile-skills">
            ${freelancer.skills.map(s => `<span>${s}</span>`).join('')}
        </div>

        <div class="profile-stats">
            <div class="stat-item">
                <span class="stat-number">${freelancer.projects}</span>
                <span class="stat-label">Projects</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${freelancer.clients}</span>
                <span class="stat-label">Clients</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${freelancer.experience}</span>
                <span class="stat-label">Experience</span>
            </div>
        </div>

        <div class="profile-actions">
            <a href="index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i> Go Back</a>
            <button class="hire-btn" onclick="alert('Hire request sent to ${freelancer.name}!')">Hire Me</button>
        </div>
    `;
});