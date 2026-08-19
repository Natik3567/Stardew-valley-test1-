// === ETAT DE L'APPLICATION ===
let currentLang = 'fr';
let currentView = 'home';
let currentCategory = null;
let featuredInterval = null;

// === ELEMENTS DOM ===
const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('global-search');
const langBtn = document.getElementById('lang-toggle');
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const modalOverlay = document.getElementById('modal-overlay');

// === ÉCOUTEURS D'ÉVÉNEMENTS ===
langBtn.addEventListener('click', toggleLanguage);
toggleSidebarBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
document.getElementById('modal-close').addEventListener('click', closeModal);

// === FONCTIONS DE BASE ===
function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    langBtn.textContent = currentLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';
    updateUIStrings();
    
    // Rafraichir la vue actuelle avec la nouvelle langue
    if (searchInput.value.trim() !== '') handleSearch(searchInput.value);
    else if (currentView === 'home') loadView('home');
    else if (currentView === 'category') loadView('category', currentCategory);
}

function updateUIStrings() {
    // Met à jour tous les textes du menu et des placeholders
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18n[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = i18n[currentLang][key];
    });
}

function loadView(viewType, categoryName = null) {
    currentView = viewType;
    currentCategory = categoryName;
    clearInterval(featuredInterval); // Arrête le PNJ vedette
    
    // Gérer l'état actif du menu
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if(viewType === 'home') document.getElementById('nav-home').classList.add('active');
    if(viewType === 'category') document.getElementById(`nav-${categoryName}`).classList.add('active');

    if (viewType === 'home') renderHome();
    else if (viewType === 'category') renderCategory(categoryName);
}

// === RENDU DES PAGES ===
function renderHome() {
    contentArea.innerHTML = `
        <div class="home-hero">
            <h1>${i18n[currentLang].home_title}</h1>
            <p>${i18n[currentLang].home_desc}</p>
        </div>
        <div class="grid-container">
            ${Object.keys(db).map(cat => `
                <div class="card" onclick="loadView('category', '${cat}')">
                    <h3>${i18n[currentLang][`nav_${cat.toLowerCase()}`] || cat}</h3>
                    <p>${db[cat].length} entries</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCategory(category, filterValue = 'all') {
    let items = db[category];
    let html = `<h1>${i18n[currentLang][`nav_${category.toLowerCase()}`] || category}</h1>`;

    // Section Vedette UNIQUE pour les PNJ
    if (category === 'NPCs') {
        html += `<div id="featured-container" class="featured-card">
                    <div class="featured-label">${i18n[currentLang].featured}</div>
                    <div id="featured-content" class="featured-content"></div>
                 </div>`;
    }

    // Filtres
    html += `<div class="filters-bar">
                <select id="main-filter" onchange="renderCategory('${category}', this.value)">
                    <option value="all">${i18n[currentLang].filter_all}</option>
                    ${category === 'Farming' ? `
                        <option value="spring" ${filterValue==='spring'?'selected':''}>${i18n[currentLang].filter_spring}</option>
                        <option value="summer" ${filterValue==='summer'?'selected':''}>${i18n[currentLang].filter_summer}</option>
                        <option value="fall" ${filterValue==='fall'?'selected':''}>${i18n[currentLang].filter_fall}</option>
                    ` : ''}
                </select>
             </div>`;

    // Application du filtre
    if (filterValue !== 'all' && category === 'Farming') {
        items = items.filter(item => item.season === filterValue);
    }

    // Grille des éléments
    html += `<div class="grid-container">
                ${items.map(item => `
                    <div class="card" onclick="openModal('${item.id}', '${category}')">
                        <img src="${item.img}" alt="${item.name[currentLang]}">
                        <h3>${item.name[currentLang]}</h3>
                    </div>
                `).join('')}
             </div>`;

    contentArea.innerHTML = html;

    // Lancement du PNJ Vedette
    if (category === 'NPCs' && items.length > 0) {
        updateFeatured(items);
        featuredInterval = setInterval(() => updateFeatured(items), 10000);
    }
}

function updateFeatured(items) {
    const item = items[Math.floor(Math.random() * items.length)];
    const container = document.getElementById('featured-content');
    if(container) {
        container.innerHTML = `
            <img src="${item.img}" alt="${item.name[currentLang]}">
            <div>
                <h3 style="margin:0; font-size:24px; color:#d84315;">${item.name[currentLang]}</h3>
                <p style="margin:5px 0;">📍 ${item.location[currentLang]}</p>
            </div>
        `;
        document.getElementById('featured-container').onclick = () => openModal(item.id, 'NPCs');
    }
}

// === RECHERCHE GLOBALE ===
function handleSearch(query) {
    clearInterval(featuredInterval); // Arrête le featured en recherche
    if (query.trim() === '') {
        loadView(currentView, currentCategory); // Retour à la vue normale
        return;
    }

    query = query.toLowerCase();
    let results = [];

    // Parcourir toute la base de données
    for (let cat in db) {
        db[cat].forEach(item => {
            // Cherche dans le nom en FR et en EN
            if (item.name.fr.toLowerCase().includes(query) || item.name.en.toLowerCase().includes(query)) {
                results.push({ item, cat });
            }
        });
    }

    let html = `<h1>${i18n[currentLang].search_results} "${query}"</h1>`;
    if (results.length === 0) {
        html += `<p>${i18n[currentLang].no_results}</p>`;
    } else {
        html += `<div class="grid-container">
                    ${results.map(res => `
                        <div class="card" onclick="openModal('${res.item.id}', '${res.cat}')">
                            <img src="${res.item.img}" alt="${res.item.name[currentLang]}">
                            <h3>${res.item.name[currentLang]}</h3>
                            <span style="font-size:12px; color:#666;">${i18n[currentLang][`nav_${res.cat.toLowerCase()}`] || res.cat}</span>
                        </div>
                    `).join('')}
                 </div>`;
    }
    contentArea.innerHTML = html;
}

// === FENÊTRES DÉTAILLÉES (MODALS) ===
function openModal(itemId, category) {
    const item = db[category].find(i => i.id === itemId);
    
    document.getElementById('modal-title').textContent = item.name[currentLang];
    document.getElementById('modal-img').src = item.img;
    
    let bodyHtml = '';

    // Construction HTML différente selon la catégorie pour avoir des fiches parfaites
    if (category === 'NPCs') {
        bodyHtml = `
            <p><strong>🎂 Anniversaire :</strong> ${item.birthday[currentLang]}</p>
            <p><strong>📍 Lieu :</strong> ${item.location[currentLang]}</p>
            <h3>🎁 Cadeaux</h3>
            <p><strong>💖 Adore :</strong> ${item.gifts.loves[currentLang]}</p>
            <p><strong>😊 Apprécie :</strong> ${item.gifts.likes[currentLang]}</p>
            <p><strong>🤢 Déteste :</strong> ${item.gifts.hates[currentLang]}</p>
        `;
    } else if (category === 'Farming' || category === 'Fish') {
        bodyHtml = `
            ${item.growth ? `<p><strong>Temps de pousse :</strong> ${item.growth[currentLang]}</p>` : ''}
            ${item.location ? `<p><strong>Lieu :</strong> ${item.location[currentLang]}</p>` : ''}
            
            <h3>Prix de vente</h3>
            <table class="wiki-table">
                <tr><th>Qualité</th><th>Prix</th></tr>
                <tr><td class="quality-normal">Normal</td><td>${item.prices.normal}g</td></tr>
                <tr><td class="quality-silver">Argent ★</td><td>${item.prices.silver}g</td></tr>
                <tr><td class="quality-gold">Or ★</td><td>${item.prices.gold}g</td></tr>
                <tr><td class="quality-iridium">Iridium ★</td><td>${item.prices.iridium}g</td></tr>
            </table>
        `;
    } else if (category === 'Items' || category === 'Crafting') {
        bodyHtml = `
            ${item.desc ? `<p><strong>Description :</strong> ${item.desc[currentLang]}</p>` : ''}
            ${item.materials ? `<p><strong>Matériaux :</strong> ${item.materials[currentLang]}</p>` : ''}
            ${item.obtain ? `<p><strong>Obtention :</strong> ${item.obtain[currentLang]}</p>` : ''}
            ${item.unlock ? `<p><strong>Déblocage :</strong> ${item.unlock[currentLang]}</p>` : ''}
        `;
    }

    document.getElementById('modal-body').innerHTML = bodyHtml;
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

// Initialisation au chargement de la page
updateUIStrings();
loadView('home');