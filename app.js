let currentLang = 'fr';
let currentView = 'home';
let currentCategory = null;
let featuredInterval = null;

const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('global-search');
const langBtn = document.getElementById('lang-toggle');
const sidebarMenu = document.querySelector('.sidebar ul');

// Génération dynamique du menu pour l'intégration des icônes et traductions
function renderSidebar() {
    sidebarMenu.innerHTML = `<li id="nav-home" onclick="loadView('home')"><img src="assets/ui/home.png" class="menu-icon" onerror="this.src=fallbackImg"> ${i18n[currentLang].nav_home}</li>`;
    for (let cat in categoriesInfo) {
        sidebarMenu.innerHTML += `<li id="nav-${cat}" onclick="loadView('category', '${cat}')"><img src="${categoriesInfo[cat].icon}" class="menu-icon" onerror="this.src=fallbackImg"> ${categoriesInfo[cat][currentLang]}</li>`;
    }
}

function loadView(viewType, categoryName = null) {
    currentView = viewType;
    currentCategory = categoryName;
    clearInterval(featuredInterval);
    searchInput.value = '';
    
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if(viewType === 'home') document.getElementById('nav-home').classList.add('active');
    if(viewType === 'category') document.getElementById(`nav-${categoryName}`).classList.add('active');

    if (viewType === 'home') renderHome();
    else if (viewType === 'category') renderCategory(categoryName);
}

function renderHome() {
    let html = `
        <div class="home-hero">
            <h1>${i18n[currentLang].home_title}</h1>
            <p>${i18n[currentLang].home_desc}</p>
        </div>
        <div class="grid-container">`;
    
    for (let cat in categoriesInfo) {
        let count = db[cat] ? db[cat].length : 0;
        html += `
            <div class="card" onclick="loadView('category', '${cat}')">
                <img src="${categoriesInfo[cat].icon}" class="cat-icon" style="width:40px; height:40px;" onerror="this.src=fallbackImg">
                <h3>${categoriesInfo[cat][currentLang]}</h3>
                <p style="color: #666;">${count} ${i18n[currentLang].elements}</p>
            </div>`;
    }
    contentArea.innerHTML = html + `</div>`;
}

function renderCategory(category) {
    let items = db[category] || [];
    let html = `<h1>${categoriesInfo[category][currentLang]}</h1>`;

    if (items.length > 0) {
        html += `<div id="featured-container" class="featured-card">
                    <div class="featured-label">${i18n[currentLang].featured}</div>
                    <div id="featured-content" class="featured-content"></div>
                 </div>`;
        
        html += `<div class="grid-container">
                    ${items.map(item => `
                        <div class="card" onclick="openModal('${item.id}', '${category}')">
                            <img src="${item.img}" alt="${item.name[currentLang]}" onerror="this.src=fallbackImg">
                            <h3>${item.name[currentLang]}</h3>
                        </div>
                    `).join('')}
                 </div>`;
    } else {
        html += `<p>${i18n[currentLang].no_results}</p>`;
    }

    contentArea.innerHTML = html;
    if (items.length > 0) {
        updateFeatured(items, category);
        featuredInterval = setInterval(() => updateFeatured(items, category), 10000);
    }
}

// (Conserve ici les fonctions toggleLanguage, handleSearch, updateFeatured et openModal/closeModal de la version précédente, 
// en t'assurant d'utiliser `onerror="this.src=fallbackImg"` sur chaque balise <img>)

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    langBtn.textContent = currentLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';
    renderSidebar();
    if(currentView === 'home') loadView('home');
    else loadView('category', currentCategory);
});

renderSidebar();
loadView('home');