// Tes données (J'ai mis quelques exemples avec des images du wiki officiel)
const stardewData = [
    { name: "Abigail", category: "NPC", info: "Loves: Amethyst", img: "https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png" },
    { name: "Sebastian", category: "NPC", info: "Loves: Frozen Tear", img: "https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png" },
    { name: "Catfish", category: "Fish", info: "Spring/Fall (River)", img: "https://stardewvalleywiki.com/mediawiki/images/9/99/Catfish.png" },
    { name: "Strawberry", category: "Crop", info: "Spring (8 Days)", img: "https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png" },
    { name: "Iridium Sprinkler", category: "Crafting", info: "Farming Lvl 9", img: "https://stardewvalleywiki.com/mediawiki/images/9/90/Iridium_Sprinkler.png" },
    // Imagine qu'il y a 200 autres objets ici...
];

const grid = document.getElementById('item-grid');
const trigger = document.getElementById('scroll-trigger');

let currentIndex = 0;
const itemsPerLoad = 3; // Nombre d'items à charger à chaque fois qu'on scrolle

// Fonction pour générer les cartes HTML
function loadItems() {
    const end = Math.min(currentIndex + itemsPerLoad, stardewData.length);
    
    for (let i = currentIndex; i < end; i++) {
        const item = stardewData[i];
        const card = document.createElement('div');
        card.className = 'card';
        
        // L'attribut loading="lazy" est LA solution magique pour les images
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <span class="tag">${item.category}</span>
            <p>${item.info}</p>
        `;
        grid.appendChild(card);
    }
    
    currentIndex = end;
    
    // Si tout est chargé, on cache le texte de chargement
    if (currentIndex >= stardewData.length) {
        trigger.style.display = 'none';
    }
}

// Le fameux Intersection Observer (ne charge le code que quand on voit le bas de la page)
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadItems();
    }
});

// On commence par observer le bas de la page
observer.observe(trigger);