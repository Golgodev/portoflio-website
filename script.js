// Databáze projektů
const PROJECTS = {
    'palenka': {
        id: 'palenka',
        title: 'My Summer Pálenka',
        tags: ['Godot', 'C#', 'Physics', 'Simulation', 'Indie'],
        img: 'goki_games.png',
        tech: 'Godot 4, C#, Jolt Physics',
        status: 'In Active Development',
        role: 'Creator & Lead Developer',
        short: 'A 3D countryside simulation game set in rural Czechia featuring realistic distillation mechanics and open-ended exploration.',
        body: `
            <h3>About the Game</h3>
            <p><em>My Summer Pálenka</em> is a 3D atmospheric simulation game set in the serene countryside of Czechia. Players step into a rural sandbox focused on collecting fruit, managing backyard fermentation tanks, mastering traditional distillation equipment, and delivering products.</p>
            <h3>Key Features & Mechanics</h3>
            <ul>
                <li><strong>Distillation System:</strong> Multi-stage chemistry and thermal management for brewing authentic spirits.</li>
                <li><strong>Vehicle Physics:</strong> Drive regional utility vans and tractor equipment to transport goods.</li>
                <li><strong>Open Countryside:</strong> Detailed Czech rural scenery built with custom low-poly models and foliage systems.</li>
            </ul>
        `
    },
    'snow': {
        id: 'snow',
        title: 'Snow Clearing Simulator',
        tags: ['Godot', 'Shaders', 'Simulation', 'Relaxing'],
        img: 'bowman.png',
        tech: 'Godot Engine, Deformable Mesh Shaders',
        status: 'Playable Prototype',
        role: 'Solo Developer',
        short: 'A relaxing 3D winter simulation utilizing custom interactive snow displacement shaders and upgrade progression loops.',
        body: `
            <h3>Project Concept</h3>
            <p>Snow Clearing Simulator is a cozy winter game centered around winter road clearing, driveways, and snowdrift clearing using various equipment ranging from shovels to industrial snowplows.</p>
            <h3>Technical Highlights</h3>
            <ul>
                <li><strong>Interactive Snow Shader:</strong> Dynamic vertex deformation allowing vehicles and tracks.</li>
                <li><strong>Relaxing Progression:</strong> Upgrade equipment, unlock new winter zones.</li>
            </ul>
        `
    },
    'eatortoss': {
        id: 'eatortoss',
        title: 'EatOrToss',
        tags: ['WebDev', 'JavaScript', 'HTML/CSS', 'Tool'],
        img: 'palenka.png',
        tech: 'HTML5, CSS3, JavaScript',
        status: 'Released / Live Web Tool',
        role: 'Full-Stack Developer',
        short: 'A practical, user-friendly web application designed to help users track food shelf-life and reduce kitchen waste.',
        body: `
            <h3>Overview</h3>
            <p>EatOrToss is a responsive web application crafted to solve household food waste. It provides intuitive category sorting, expiration countdown reminders, and food storage recommendations.</p>
            <h3>Features</h3>
            <ul>
                <li>Clean high-contrast user interface tailored for desktop and mobile access.</li>
                <li>Instant categorization for fresh produce, canned goods, and dairy items.</li>
                <li>Local data storage without requiring user accounts or third-party tracking.</li>
            </ul>
        `
    },
    'ducking': {
        id: 'ducking',
        title: 'Ducking Spree',
        tags: ['Godot', '3D', 'Physics', 'Indie', 'Prototype'],
        img: 'duck.png',
        tech: 'Godot, Low-Poly 3D Assets',
        status: 'Prototype',
        role: 'Game Designer & Programmer',
        short: 'A humorous 3D duck sandbox game featuring customization, levels, shop mechanics, and interactive pond environments.',
        body: `
            <h3>Concept & Gameplay</h3>
            <p>Ducking Spree lets players take control of a customizable rubber duck in a physics-based interactive forest pond. Features character cosmetics (like helmets and hats), level progression, and item shops.</p>
            <h3>Current Systems Built</h3>
            <ul>
                <li>Modular cosmetic equipping system.</li>
                <li>UI menu system with settings and customization.</li>
                <li>Water buoyancy physics and level design templates.</li>
            </ul>
        `
    }
};

// Otevření/zavření mobilního menu
function toggleMobileMenu() {
    const links = document.getElementById('nav-links');
    const icon = document.getElementById('menu-icon');
    links.classList.toggle('mobile-open');
    if (links.classList.contains('mobile-open')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-solid fa-bars';
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const successMsg = document.getElementById('form-success');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Změníme text tlačítka, aby uživatel věděl, že se pracuje
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    
    try {
        // Zde nahraď "YOUR_FORM_ID" svým skutečným ID od Formspree
        const response = await fetch("https://formspree.io/f/mkjjawvo", {
            method: "POST",
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            if (successMsg) {
                successMsg.style.display = 'block';
                form.reset();
                setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
            }
        } else {
            alert("Oops! There was a problem submitting your form.");
        }
    } catch (error) {
        alert("Network error. Please try again later.");
    } finally {
        // Vrátíme tlačítko zpět do původního stavu
        submitBtn.innerText = originalBtnText;
    }
}

function renderCards(filterTag = 'ALL') {
    const grid = document.getElementById('projects-grid');
    const filterBar = document.getElementById('tag-filter-bar');
    if (!grid) return; // Zastaví se, pokud nejsme na stránce s mřížkou

    let html = '';
    for (let key in PROJECTS) {
        let item = PROJECTS[key];
        
        // Zkontrolujeme, zda projekt odpovídá vybranému tagu
        if (filterTag === 'ALL' || item.tags.includes(filterTag)) {
            let tagsHtml = item.tags.map(t => 
                `<a href="projects.html?tag=${t}" class="tag-pill ${t === filterTag ? 'active' : ''}">#${t}</a>`
            ).join(' ');

            html += `
                <div class="card">
                    <!-- PŘIDÁNO: onclick pro otevření detailu projektu kliknutím na obrázek -->
                    <div class="card-img-wrap" onclick="window.location.href='project.html?id=${item.id}'">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                    <div class="card-body">
                        <div class="tags-list">${tagsHtml}</div>
                        <h3>${item.title}</h3>
                        <p>${item.short}</p>
                        <div class="card-footer">
                            <span style="font-size: 0.75rem; color: #888; font-weight: 500;">${item.status}</span>
                            <a href="project.html?id=${item.id}" class="btn-read-info">Read Info</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    grid.innerHTML = html !== '' ? html : '<p style="grid-column: 1/-1; text-align: center; color: #777;">No projects found.</p>';

    // Vykreslení tlačítek filtrů (pokud existuje kontejner)
    if (filterBar) {
        const allTags = ['ALL'];
        for (let k in PROJECTS) {
            PROJECTS[k].tags.forEach(t => { if (!allTags.includes(t)) allTags.push(t); });
        }

        filterBar.innerHTML = allTags.map(tag => `
            <button class="filter-btn ${filterTag === tag ? 'active' : ''}" onclick="renderCards('${tag}')">
                ${tag === 'ALL' ? 'All Projects' : '#' + tag}
            </button>
        `).join('');
    }
}

// Načtení detailu projektu (Pro project.html)
function loadProjectDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const project = PROJECTS[projectId];

    if (!project) return;

    document.getElementById('devlog-title').innerText = project.title;
    document.getElementById('devlog-banner').src = project.img;
    document.getElementById('devlog-tech').innerText = project.tech;
    document.getElementById('devlog-status').innerText = project.status;
    document.getElementById('devlog-role').innerText = project.role;
    document.getElementById('devlog-content').innerHTML = project.body;

    const tagsContainer = document.getElementById('devlog-tags-container');
    if (tagsContainer) {
        tagsContainer.innerHTML = project.tags.map(t => 
            `<a href="projects.html?tag=${t}" class="tag-pill active">#${t}</a>`
        ).join(' ');
    }
}

// Spuštění po načtení stránky
document.addEventListener("DOMContentLoaded", () => {
    // Podíváme se, zda URL obsahuje ?tag=něco
    const urlParams = new URLSearchParams(window.location.search);
    const startTag = urlParams.get('tag') || 'ALL';
    
    renderCards(startTag);
    
    // Pokud jsme na detailu projektu, načti data
    if (document.getElementById('devlog-title')) {
        loadProjectDetail();
    }
});