const database = {
    "NPCs": [
        { 
            name: "Abigail", 
            info: "Loves Amethyst & Pumpkin", 
            details: "Birthday: Fall 13. Lives at Pierre's General Store. Loves mine exploration and playing drums.",
            images: [
                "https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png",
                "https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png"
            ]
        },
        { 
            name: "Sebastian", 
            info: "Loves Frozen Tear & Sashimi", 
            details: "Birthday: Winter 10. Lives in the Mountain basement. Works as a programmer.",
            images: [
                "https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png",
                "https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png"
            ]
        }
    ],
    "Farming": [
        { 
            name: "Strawberry", 
            info: "Spring Crop (8 days)", 
            details: "Regrows every 4 days. Seeds bought during Egg Festival.",
            images: ["https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png"]
        },
        { 
            name: "Pumpkin", 
            info: "Fall Crop (13 days)", 
            details: "Can grow into a Giant Crop when planted in a 3x3 grid.",
            images: ["https://stardewvalleywiki.com/mediawiki/images/6/64/Pumpkin.png"]
        }
    ],
    "Fish": [
        { 
            name: "Catfish", 
            info: "Spring/Fall (Rainy)", 
            details: "Location: River. Time: 6am - 12am. Difficulty: 75.",
            images: ["https://stardewvalleywiki.com/mediawiki/images/9/99/Catfish.png"]
        }
    ]
};

const contentArea = document.getElementById('content-area');
const breadcrumb = document.getElementById('breadcrumb');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

let currentCategory = null;
let imageRotationTimer = null;

// Display main categories
function showCategories() {
    clearInterval(imageRotationTimer);
    currentCategory = null;
    breadcrumb.textContent = "Categories";
    contentArea.innerHTML = "";

    Object.keys(database).forEach(cat => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${cat}</h3>
            <span class="tag">${database[cat].length} Items</span>
        `;
        card.onclick = () => showSubcategory(cat);
        contentArea.appendChild(card);
    });
}

// Display items inside a category
function showSubcategory(categoryName) {
    clearInterval(imageRotationTimer);
    currentCategory = categoryName;
    breadcrumb.textContent = `Categories / ${categoryName}`;
    contentArea.innerHTML = "";

    const items = database[categoryName];

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-item-${index}`;

        const initialImg = item.images[0];
        
        card.innerHTML = `
            <img id="img-${index}" src="${initialImg}" alt="${item.name}">
            <h3>${item.name}</h3>
            <span class="tag">${categoryName}</span>
            <p>${item.info}</p>
        `;

        card.onclick = () => openModal(item, categoryName);
        contentArea.appendChild(card);
    });

    // 10-second image slideshow for NPCs
    if (categoryName === "NPCs") {
        let imageIndex = 0;
        imageRotationTimer = setInterval(() => {
            imageIndex = (imageIndex + 1) % 2;
            items.forEach((item, idx) => {
                const imgElement = document.getElementById(`img-${idx}`);
                if (imgElement && item.images[imageIndex]) {
                    imgElement.src = item.images[imageIndex];
                }
            });
        }, 10000);
    }
}

// Open modal view for details
function openModal(item, category) {
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-category').textContent = `${category} / Details`;
    document.getElementById('modal-body').textContent = item.details;
    document.getElementById('modal-img').src = item.images[0];
    
    breadcrumb.textContent = `Categories / ${category} / ${item.name}`;
    modalOverlay.classList.remove('hidden');
}

// Close modal
modalClose.onclick = () => {
    modalOverlay.classList.add('hidden');
    if (currentCategory) {
        breadcrumb.textContent = `Categories / ${currentCategory}`;
    }
};

breadcrumb.onclick = showCategories;

// Initialize
showCategories();