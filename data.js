// Dictionnaire pour l'interface utilisateur
const i18n = {
    fr: {
        nav_home: "Accueil", nav_npcs: "Personnages", nav_farming: "Agriculture",
        nav_fish: "Poissons", nav_items: "Objets", nav_crafts: "Crafts & Recettes",
        search_placeholder: "Rechercher (ex: Abigail, Panais...)",
        search_results: "Résultats de recherche pour",
        no_results: "Aucun résultat trouvé.",
        featured: "⭐ En vedette (Change toutes les 10s)",
        home_title: "Bienvenue sur le Wiki Stardew Valley",
        home_desc: "L'encyclopédie interactive complète. Choisissez une catégorie à gauche ou utilisez la barre de recherche !",
        filter_all: "Tous", filter_spring: "Printemps", filter_summer: "Été", filter_fall: "Automne", filter_winter: "Hiver",
        filter_marriage_yes: "Mariable", filter_marriage_no: "Non Mariable"
    },
    en: {
        nav_home: "Home", nav_npcs: "Characters", nav_farming: "Farming",
        nav_fish: "Fish", nav_items: "Items", nav_crafts: "Crafting",
        search_placeholder: "Search (e.g., Abigail, Parsnip...)",
        search_results: "Search results for",
        no_results: "No results found.",
        featured: "⭐ Featured (Changes every 10s)",
        home_title: "Welcome to the Stardew Valley Wiki",
        home_desc: "The complete interactive encyclopedia. Choose a category on the left or use the search bar!",
        filter_all: "All", filter_spring: "Spring", filter_summer: "Summer", filter_fall: "Fall", filter_winter: "Winter",
        filter_marriage_yes: "Marriageable", filter_marriage_no: "Not Marriageable"
    }
};

// Base de données complète
const db = {
    NPCs: [
        {
            id: "abigail",
            img: "https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png",
            name: { fr: "Abigail", en: "Abigail" },
            marriage: true,
            birthday: { fr: "Automne 13", en: "Fall 13" },
            location: { fr: "Magasin de Pierre", en: "Pierre's General Store" },
            gifts: {
                loves: { fr: "Améthyste, Citrouille, Éclat prismatique", en: "Amethyst, Pumpkin, Prismatic Shard" },
                likes: { fr: "Quartz, Maïonèse", en: "Quartz, Mayonnaise" },
                hates: { fr: "Argile, Pierre", en: "Clay, Stone" }
            }
        },
        {
            id: "sebastian",
            img: "https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png",
            name: { fr: "Sebastian", en: "Sebastian" },
            marriage: true,
            birthday: { fr: "Hiver 10", en: "Winter 10" },
            location: { fr: "Montagne (Sous-sol de Robin)", en: "Mountain (Robin's Basement)" },
            gifts: {
                loves: { fr: "Larme gelée, Sashimi, Œuf de vide", en: "Frozen Tear, Sashimi, Void Egg" },
                likes: { fr: "Quartz, Flétan", en: "Quartz, Flounder" },
                hates: { fr: "Omelette, Bière, Argile", en: "Omelet, Beer, Clay" }
            }
        },
        {
            id: "linus",
            img: "https://stardewvalleywiki.com/mediawiki/images/3/31/Linus.png",
            name: { fr: "Linus", en: "Linus" },
            marriage: false,
            birthday: { fr: "Hiver 3", en: "Winter 3" },
            location: { fr: "Tente dans la Montagne", en: "Tent in the Mountain" },
            gifts: {
                loves: { fr: "Igname rôtie, Tarte aux myrtilles", en: "Yam, Blueberry Tart" },
                likes: { fr: "Tous les fruits de cueillette", en: "All Foraged Minerals/Fruits" },
                hates: { fr: "Toutes les gemmes", en: "All Gems" }
            }
        }
    ],
    Farming: [
        {
            id: "parsnip",
            img: "https://stardewvalleywiki.com/mediawiki/images/d/db/Parsnip.png",
            name: { fr: "Panais", en: "Parsnip" },
            season: "spring",
            seedPrice: "20g",
            growth: { fr: "4 Jours", en: "4 Days" },
            prices: { normal: 35, silver: 43, gold: 52, iridium: 70 }
        },
        {
            id: "starfruit",
            img: "https://stardewvalleywiki.com/mediawiki/images/d/db/Starfruit.png",
            name: { fr: "Carambole", en: "Starfruit" },
            season: "summer",
            seedPrice: "400g",
            growth: { fr: "13 Jours", en: "13 Days" },
            prices: { normal: 750, silver: 937, gold: 1125, iridium: 1500 }
        },
        {
            id: "pumpkin",
            img: "https://stardewvalleywiki.com/mediawiki/images/6/64/Pumpkin.png",
            name: { fr: "Citrouille", en: "Pumpkin" },
            season: "fall",
            seedPrice: "100g",
            growth: { fr: "13 Jours (Peut devenir géante)", en: "13 Days (Can be Giant)" },
            prices: { normal: 320, silver: 400, gold: 480, iridium: 640 }
        }
    ],
    Fish: [
        {
            id: "catfish",
            img: "https://stardewvalleywiki.com/mediawiki/images/9/99/Catfish.png",
            name: { fr: "Poisson-chat", en: "Catfish" },
            season: "spring_fall",
            location: { fr: "Rivière (Temps de pluie)", en: "River (Raining)" },
            prices: { normal: 200, silver: 250, gold: 300, iridium: 400 }
        },
        {
            id: "lavaeel",
            img: "https://stardewvalleywiki.com/mediawiki/images/1/12/Lava_Eel.png",
            name: { fr: "Anguille de lave", en: "Lava Eel" },
            season: "all",
            location: { fr: "Mines (Niveau 100) / Volcan", en: "Mines (Level 100) / Volcano" },
            prices: { normal: 700, silver: 875, gold: 1050, iridium: 1400 }
        }
    ],
    Items: [
        {
            id: "prismaticshard",
            img: "https://stardewvalleywiki.com/mediawiki/images/5/56/Prismatic_Shard.png",
            name: { fr: "Éclat prismatique", en: "Prismatic Shard" },
            desc: { fr: "Un minéral très rare aux couleurs de l'arc-en-ciel.", en: "A very rare and powerful mineral." },
            obtain: { fr: "Nœuds d'iridium, Pierres mystiques", en: "Iridium Nodes, Mystic Stones" }
        }
    ],
    Crafting: [
        {
            id: "iridiumsprinkler",
            img: "https://stardewvalleywiki.com/mediawiki/images/9/90/Iridium_Sprinkler.png",
            name: { fr: "Arroseur en iridium", en: "Iridium Sprinkler" },
            materials: { fr: "1 Lingot d'or, 1 Lingot d'iridium, 1 Pile", en: "1 Gold Bar, 1 Iridium Bar, 1 Battery Pack" },
            unlock: { fr: "Agriculture Niveau 9", en: "Farming Level 9" }
        }
    ]
};