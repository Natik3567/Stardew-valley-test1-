// === BASE DE DONNÉES DU WIKI ===
const wikiData = {
    "NPCs": [
        {
            name: "Abigail",
            img: "https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png",
            locations: "Magasin de Pierre, Cimetière, Mines",
            schedule: "Varie selon la saison. Souvent près du pont ou joue de la flûte à la montagne.",
            birthday: "Automne 13",
            profession: "Étudiante / Aventurière",
            hearts: 14,
            gifts: {
                loves: ["Améthyste", "Citrouille", "Repas épicé", "Gâteau au chocolat", "Éclat prismatique"],
                likes: ["Quartz", "Tulipe", "Pois de senteur", "Maïonèse"],
                neutral: ["Lait", "Œuf", "Tous les fruits (sauf exceptions)"],
                hates: ["Argile", "Pierre", "Minerai de cuivre", "Sucre"]
            },
            notes: "Elle adore les jeux vidéo et explorer les mines. Si vous l'épousez, elle vous aidera parfois à combattre."
        },
        {
            name: "Sebastian",
            img: "https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png",
            locations: "Sous-sol de la scierie (Robin), Lac de la montagne",
            schedule: "Reste souvent dans sa chambre jusqu'à 15h. Fume parfois près du lac le soir.",
            birthday: "Hiver 10",
            profession: "Programmeur freelance",
            hearts: 14,
            gifts: {
                loves: ["Larme gelée", "Sashimi", "Obsidienne", "Œuf de vide", "Soupe à la citrouille"],
                likes: ["Quartz", "Flétan", "Café"],
                neutral: ["Poisson (la plupart)"],
                hates: ["Argile", "Omelette", "Bière", "Confiture"]
            },
            notes: "Joue à un jeu de rôle sur table avec Sam. Préfère la pluie et l'obscurité."
        }
    ],
    "Agriculture": [
        {
            name: "Fraise (Strawberry)",
            img: "https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png",
            season: "Printemps",
            seedPrice: "100g (Festival des Œufs uniquement)",
            growthTime: "8 Jours",
            regrowth: "Tous les 4 Jours",
            xp: "18 XP par récolte",
            prices: { normal: 120, silver: 150, gold: 180, iridium: 240 },
            uses: ["Confiture de fraise (Fût/Pot)", "Recette : Salade de fruits"],
            notes: "L'une des cultures les plus rentables du printemps si plantée le 13 du mois ou avant en serre."
        },
        {
            name: "Carambole (Starfruit)",
            img: "https://stardewvalleywiki.com/mediawiki/images/d/db/Starfruit.png",
            season: "Été",
            seedPrice: "400g (Au magasin de l'Oasis)",
            growthTime: "13 Jours",
            regrowth: "Ne repousse pas",
            xp: "43 XP par récolte",
            prices: { normal: 750, silver: 937, gold: 1125, iridium: 1500 },
            uses: ["Vin de carambole (extrêmement rentable)", "Cabane des Junimos"],
            notes: "C'est la culture d'été offrant le plus grand profit brut du jeu."
        }
    ],
    "Poissons": [
        {
            name: "Poisson-globe (Pufferfish)",
            img: "https://stardewvalleywiki.com/mediawiki/images/b/ba/Pufferfish.png",
            season: "Été",
            location: "Océan",
            time: "12h00 - 16h00",
            weather: "Soleil",
            difficulty: "80 (Comportement Flotteur)",
            prices: { normal: 200, silver: 250, gold: 300, iridium: 400 },
            uses: ["Paquet Poissons Spéciaux (Centre Communautaire)", "Adoré par Abigail"],
            notes: "Nécessite une bonne canne à pêche. Peut aussi s'acheter au Chariot de Voyage."
        }
    ],
    "Objets": [
        {
            name: "Éclat prismatique (Prismatic Shard)",
            img: "https://stardewvalleywiki.com/mediawiki/images/5/56/Prismatic_Shard.png",
            category: "Minéral",
            description: "Un minéral très rare aux couleurs de l'arc-en-ciel.",
            price: "2000g",
            howToGet: "Nœuds d'iridium, Pierres mystiques, Géodes omni, Pêche (très rare).",
            uses: "Obtenir l'Épée Galactique au désert, donner au Musée, offrir (Adoré par presque tout le monde sauf Haley).",
        }
    ],
    "Crafts": [
        {
            name: "Arroseur en iridium",
            img: "https://stardewvalleywiki.com/mediawiki/images/9/90/Iridium_Sprinkler.png",
            levelReq: "Agriculture Niveau 9",
            utility: "Arrose 24 cases adjacentes (un carré de 5x5) chaque matin.",
            materials: [
                { item: "Lingot d'or", qty: 1 },
                { item: "Lingot d'iridium", qty: 1 },
                { item: "Pile", qty: 1 }
            ]
        }
    ]
};

// === VARIABLES ET LOGIQUE DE L'INTERFACE ===
const menuItems = document.querySelectorAll('#menu li');
const gridContainer = document.getElementById('grid-container');
const categoryTitle = document.getElementById('category-title');
const featuredContainer = document.getElementById('featured-container');
const featuredContent = document.getElementById('featured-content');

// Modal variables
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalBody = document.getElementById('modal-body');

let currentFeaturedInterval = null;

// Charger une catégorie
function loadCategory(category) {
    // Gérer l'état du menu
    menuItems.forEach(li => li.classList.remove('active'));
    event.target.classList.add('active');
    
    categoryTitle.textContent = category;
    gridContainer.innerHTML = '';
    
    const items = wikiData[category];

    // Nettoyer l'intervalle du PNJ aléatoire si on change de page
    clearInterval(currentFeaturedInterval);
    featuredContainer.classList.add('hidden');

    // REGLE SPÉCIALE : Si on est sur "NPCs", on active le changement automatique toutes les 10s
    if (category === 'NPCs' && items.length > 0) {
        featuredContainer.classList.remove('hidden');
        updateFeaturedNPC(items); // Affiche le premier tout de suite
        
        currentFeaturedInterval = setInterval(() => {
            updateFeaturedNPC(items);
        }, 10000); // Toutes les 10 secondes
    }

    // Afficher toutes les cartes dans la grille
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
        `;
        card.onclick = () => openModal(item, category);
        gridContainer.appendChild(card);
    });
}

// Mettre à jour le cadre en vedette avec un PNJ aléatoire
function updateFeaturedNPC(npcList) {
    const randomNpc = npcList[Math.floor(Math.random() * npcList.length)];
    featuredContent.innerHTML = `
        <img src="${randomNpc.img}" alt="${randomNpc.name}">
        <div>
            <h3>${randomNpc.name}</h3>
            <p style="margin: 5px 0;">Anniversaire : ${randomNpc.birthday}</p>
            <p style="margin: 0; font-size: 13px; color: #555;">Cliquez sur sa carte en bas pour voir ses cadeaux préférés !</p>
        </div>
    `;
    featuredContainer.onclick = () => openModal(randomNpc, 'NPCs');
}

// === GÉNÉRATEUR DE CONTENU WIKI DÉTAILLÉ (MODAL) ===
function openModal(item, category) {
    modalTitle.textContent = item.name;
    modalImg.src = item.img;
    let html = '';

    // Génération dynamique selon la catégorie (C'est ici qu'on évite les gros blocs de texte !)
    if (category === 'NPCs') {
        html = `
            <p><strong>Lieux :</strong> ${item.locations}</p>
            <p><strong>Horaires :</strong> ${item.schedule}</p>
            <p><strong>Anniversaire :</strong> ${item.birthday}</p>
            <p><strong>Profession :</strong> ${item.profession}</p>
            <hr>
            <h3>Cadeaux</h3>
            <div class="gift-section"><div class="gift-title gift-loves">💖 Adore :</div> ${item.gifts.loves.join(', ')}</div>
            <div class="gift-section"><div class="gift-title gift-likes">😊 Apprécie :</div> ${item.gifts.likes.join(', ')}</div>
            <div class="gift-section"><div class="gift-title">😐 Neutre :</div> ${item.gifts.neutral.join(', ')}</div>
            <div class="gift-section"><div class="gift-title gift-hates">🤢 Déteste :</div> ${item.gifts.hates.join(', ')}</div>
            <hr>
            <p><em>${item.notes}</em></p>
        `;
    } 
    else if (category === 'Agriculture' || category === 'Poissons') {
        html = `
            <p><strong>Saison :</strong> ${item.season}</p>
            ${item.seedPrice ? `<p><strong>Graines :</strong> ${item.seedPrice}</p>` : ''}
            ${item.growthTime ? `<p><strong>Temps de pousse :</strong> ${item.growthTime} (${item.regrowth})</p>` : ''}
            ${item.location ? `<p><strong>Lieu :</strong> ${item.location} (${item.time} - Météo: ${item.weather})</p>` : ''}
            
            <h3>Prix de vente</h3>
            <table class="wiki-table">
                <tr><th>Qualité</th><th>Prix</th></tr>
                <tr><td>Normal</td><td>${item.prices.normal}g</td></tr>
                <tr><td>Argent ★</td><td>${item.prices.silver}g</td></tr>
                <tr><td>Or ★</td><td>${item.prices.gold}g</td></tr>
                <tr><td>Iridium ★</td><td>${item.prices.iridium}g</td></tr>
            </table>

            <h3>Utilisations & Infos</h3>
            <ul>
                ${item.uses.map(u => `<li>${u}</li>`).join('')}
            </ul>
            <p><em>${item.notes}</em></p>
        `;
    }
    else if (category === 'Crafts') {
        html = `
            <p><strong>Déblocage :</strong> ${item.levelReq}</p>
            <p><strong>Utilité :</strong> ${item.utility}</p>
            <h3>Matériaux requis</h3>
            <table class="wiki-table">
                <tr><th>Objet</th><th>Quantité</th></tr>
                ${item.materials.map(m => `<tr><td>${m.item}</td><td>x${m.qty}</td></tr>`).join('')}
            </table>
        `;
    }
    else if (category === 'Objets') {
        html = `
            <p><strong>Catégorie :</strong> ${item.category}</p>
            <p><strong>Description :</strong> ${item.description}</p>
            <p><strong>Prix :</strong> ${item.price}</p>
            <p><strong>Comment l'obtenir :</strong> ${item.howToGet}</p>
            <p><strong>Utilisations :</strong> ${item.uses}</p>
        `;
    }

    modalBody.innerHTML = html;
    modalOverlay.classList.remove('hidden');
}

// Fermer le modal
modalClose.onclick = () => modalOverlay.classList.add('hidden');
modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
}

// Charger la première catégorie par défaut au lancement
loadCategory('NPCs');