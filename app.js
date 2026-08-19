let currentLang = 'fr';
let currentView = 'home';
let currentCategory = null;
let featuredInterval = null;

const contentArea = document.getElementById('content-area');
const searchInput = document.getElementById('global-search');
const langBtn = document.getElementById('lang-toggle');
const sidebar = document.getElementById('sidebar');
const fallbackImg = "https://stardewvalleywiki.com/mediawiki/images/f/f8/Unknown.png";

document.getElementById('toggle-sidebar').addEventListener('click', () => sidebar.classList.toggle('collapsed'));
langBtn.addEventListener('click', toggleLanguage);
searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
document.getElementById('modal-close').addEventListener('click', closeModal);

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    langBtn.textContent = currentLang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';
    updateUIStrings();
    
    if (searchInput.value.trim() !== '') handleSearch(searchInput.value);
    else if (currentView === 'home') loadView('home');
    else if (currentView === 'category') loadView('category', currentCategory);
}

function updateUIStrings() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
    });
}

function loadView(viewType, categoryName = null) {
    currentView = viewType;
    currentCategory = categoryName;
    clearInterval(featuredInterval);
    searchInput.value = ''; 
    
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if(viewType === 'home') document.getElementById('nav-home').classList.add('active');
    if(viewType === 'category' && document.getElementById(`nav-${categoryName}`)) {
        document.getElementById(`nav-${categoryName}`).classList.add('active');
    }

    if (viewType === 'home') renderHome();
    else if (viewType === 'category') renderCategory(categoryName);
}

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
                    <p style="color: #666;">${db[cat].length} ${i18n[currentLang].elements}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCategory(category, filterValue = 'all') {
    let items = db[category] || [];
    let catName = i18n[currentLang][`nav_${category.toLowerCase()}`] || category;
    let html = `<h1>${catName}</h1>`;

    // Section "En Vedette" pour TOUTES les catégories (si la catégorie n'est pas vide)
    if (items.length > 0) {
        html += `<div id="featured-container" class="featured-card">
                    <div class="featured-label">${i18n[currentLang].featured}</div>
                    <div id="featured-content" class="featured-content"></div>
                 </div>`;
    }

    // Filtres (spécifique à Farming pour l'instant)
    if (category === 'Farming') {
        html += `<div class="filters-bar" style="margin-bottom:20px;">
                    <select onchange="renderCategory('${category}', this.value)" style="padding:5px; border-radius:5px;">
                        <option value="all">${i18n[currentLang].filter_all}</option>
                        <option value="spring" ${filterValue==='spring'?'selected':''}>${i18n[currentLang].season_spring}</option>
                        <option value="summer" ${filterValue==='summer'?'selected':''}>${i18n[currentLang].season_summer}</option>
                        <option value="fall" ${filterValue==='fall'?'selected':''}>${i18n[currentLang].season_fall}</option>
                    </select>
                 </div>`;
        if (filterValue !== 'all') items = items.filter(i => i.season === filterValue);
    }

    if (items.length === 0) {
        html += `<p>${i18n[currentLang].no_results}</p>`;
    } else {
        html += `<div class="grid-container">
                    ${items.map(item => `
                        <div class="card" onclick="openModal('${item.id}', '${category}')">
                            <img src="${item.img}" alt="${item.name[currentLang]}" onerror="this.src='${fallbackImg}'">
                            <h3>${item.name[currentLang]}</h3>
                        </div>
                    `).join('')}
                 </div>`;
    }

    contentArea.innerHTML = html;

    if (items.length > 0) {
        updateFeatured(db[category], category); // Utilise tous les items pour le random, pas juste les filtrés
        featuredInterval = setInterval(() => updateFeatured(db[category], category), 10000);
    }
}

function updateFeatured(items, category) {
    if(!items || items.length === 0) return;
    const item = items[Math.floor(Math.random() * items.length)];
    const container = document.getElementById('featured-content');
    
    if(container) {
        // Extraction intelligente d'une info rapide pour la vedette
        let quickInfo = '';
        if(item.location) quickInfo = `📍 ${item.location[currentLang]}`;
        else if(item.season) quickInfo = `📅 ${i18n[currentLang]['season_'+item.season] || item.season}`;
        else if(item.materials) quickInfo = `📦 ${item.materials[currentLang]}`;
        else if(item.ingredients) quickInfo = `🥕 ${item.ingredients[currentLang]}`;
        else if(item.hp) quickInfo = `❤️ HP: ${item.hp}`;
        else if(item.product) quickInfo = `🥚 ${item.product[currentLang]}`;
        else if(item.date) quickInfo = `📆 ${item.date[currentLang]}`;
        else if(item.obtain) quickInfo = `🔎 ${item.obtain[currentLang]}`;

        container.innerHTML = `
            <img src="${item.img}" alt="${item.name[currentLang]}" onerror="this.src='${fallbackImg}'" style="border-radius:8px;">
            <div>
                <h3 style="margin:0; font-size:22px; color:#d84315;">${item.name[currentLang]}</h3>
                <p style="margin:5px 0;">${quickInfo}</p>
                <p style="margin:5px 0; font-size: 13px; color: #555;"><i>Cliquez pour voir la fiche complète</i></p>
            </div>
        `;
        document.getElementById('featured-container').onclick = () => openModal(item.id, category);
    }
}

function handleSearch(query) {
    clearInterval(featuredInterval);
    if (query.trim() === '') {
        if(currentView === 'home') renderHome();
        else renderCategory(currentCategory);
        return;
    }

    query = query.toLowerCase();
    let results = [];

    for (let cat in db) {
        db[cat].forEach(item => {
            // Recherche dans les deux langues
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
                            <img src="${res.item.img}" alt="${res.item.name[currentLang]}" onerror="this.src='${fallbackImg}'">
                            <h3>${res.item.name[currentLang]}</h3>
                            <span style="font-size:12px; color:#666;">${i18n[currentLang][`nav_${res.cat.toLowerCase()}`] || res.cat}</span>
                        </div>
                    `).join('')}
                 </div>`;
    }
    contentArea.innerHTML = html;
}

function openModal(itemId, category) {
    const item = db[category].find(i => i.id === itemId);
    if(!item) return;

    document.getElementById('modal-title').textContent = item.name[currentLang];
    document.getElementById('modal-img').src = item.img;
    document.getElementById('modal-img').onerror = function() { this.src = fallbackImg; };
    
    let bodyHtml = '';

    // Générateur automatique de caractéristiques (Lit les données et affiche les bons labels traduits)
    const attributes = [
        {key: 'birthday', icon: '🎂'}, {key: 'location', icon: '📍'}, {key: 'season', icon: '📅'},
        {key: 'growth', icon: '⏳'}, {key: 'materials', icon: '📦'}, {key: 'ingredients', icon: '🥕'},
        {key: 'effects', icon: '✨'}, {key: 'building', icon: '🏠'}, {key: 'product', icon: '🥚'},
        {key: 'hp', icon: '❤️'}, {key: 'damage', icon: '⚔️'}, {key: 'drops', icon: '💎'},
        {key: 'date', icon: '📆'}, {key: 'activities', icon: '🎪'}, {key: 'obtain', icon: '🔎'},
        {key: 'unlock', icon: '🔓'}
    ];

    attributes.forEach(attr => {
        if(item[attr.key]) {
            const label = i18n[currentLang]['lbl_' + attr.key];
            let value = item[attr.key];
            // Si la valeur a une traduction fr/en, on la prend
            if (typeof value === 'object' && value[currentLang]) value = value[currentLang];
            // Si la valeur est un code saison (ex: "spring"), on traduit
            else if (typeof value === 'string' && i18n[currentLang]['season_'+value]) value = i18n[currentLang]['season_'+value];
            
            bodyHtml += `<p><strong>${attr.icon} ${label} :</strong> ${value}</p>`;
        }
    });

    // Cas spéciaux complexes (Cadeaux, Prix)
    if (item.gifts) {
        bodyHtml += `
            <h3>🎁 ${i18n[currentLang].lbl_gifts || 'Cadeaux / Gifts'}</h3>
            <p><strong>💖 ${i18n[currentLang].lbl_loves} :</strong> ${item.gifts.loves[currentLang]}</p>
            <p><strong>😊 ${i18n[currentLang].lbl_likes} :</strong> ${item.gifts.likes[currentLang]}</p>
            <p><strong>🤢 ${i18n[currentLang].lbl_hates} :</strong> ${item.gifts.hates[currentLang]}</p>
        `;
    }

    if (item.prices) {
        bodyHtml += `
            <h3>💰 ${i18n[currentLang].lbl_sell_price || 'Prix / Price'}</h3>
            <table class="wiki-table">
                <tr><th>${i18n[currentLang].lbl_quality || 'Qualité'}</th><th>${i18n[currentLang].lbl_price || 'Prix'}</th></tr>
                <tr><td>Normal</td><td>${item.prices.normal}g</td></tr>
                ${item.prices.silver ? `<tr><td>Argent ★</td><td>${item.prices.silver}g</td></tr>` : ''}
                ${item.prices.gold ? `<tr><td>Or ★</td><td>${item.prices.gold}g</td></tr>` : ''}
                ${item.prices.iridium ? `<tr><td>Iridium ★</td><td>${item.prices.iridium}g</td></tr>` : ''}
            </table>
        `;
    }

    // Prix simple (sans qualité)
    if (item.price) {
        bodyHtml += `<p><strong>💰 ${i18n[currentLang].lbl_price || 'Prix'} :</strong> ${item.price}g</p>`;
    }

    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

updateUIStrings();
loadView('home');