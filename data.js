const i18n = {
    fr: {
        // Navigation & UI
        nav_home: "Accueil", nav_npcs: "Personnages", nav_farming: "Agriculture",
        nav_fish: "Poissons", nav_items: "Objets", nav_crafts: "Crafts & Recettes",
        nav_cooking: "Cuisine", nav_mines: "Mines", nav_animals: "Animaux",
        nav_monsters: "Monstres", nav_festivals: "Festivals",
        search_placeholder: "Rechercher un élément...",
        search_results: "Résultats pour",
        no_results: "Aucun résultat trouvé.",
        featured: "⭐ En vedette",
        home_title: "Encyclopédie Stardew Valley",
        home_desc: "Sélectionnez une catégorie pour explorer la base de données.",
        elements: "éléments",
        filter_all: "Toutes saisons",
        
        // Saisons
        season_spring: "Printemps", season_summer: "Été", 
        season_fall: "Automne", season_winter: "Hiver", season_all: "Toutes Saisons",

        // Labels des fiches
        lbl_birthday: "Anniversaire", lbl_location: "Lieu", lbl_season: "Saison",
        lbl_growth: "Croissance", lbl_materials: "Matériaux", lbl_ingredients: "Ingrédients",
        lbl_effects: "Effets", lbl_building: "Bâtiment requis", lbl_product: "Produit",
        lbl_hp: "Points de vie", lbl_damage: "Dégâts", lbl_drops: "Butin (Drops)",
        lbl_date: "Date", lbl_activities: "Activités", lbl_obtain: "Comment l'obtenir",
        lbl_unlock: "Déblocage", lbl_loves: "Adore", lbl_likes: "Aime", lbl_hates: "Déteste",
        lbl_gifts: "Cadeaux", lbl_sell_price: "Prix de vente", lbl_quality: "Qualité", lbl_price: "Prix"
    },
    en: {
        // Navigation & UI
        nav_home: "Home", nav_npcs: "Characters", nav_farming: "Farming",
        nav_fish: "Fish", nav_items: "Items", nav_crafts: "Crafting & Recipes",
        nav_cooking: "Cooking", nav_mines: "Mines", nav_animals: "Animals",
        nav_monsters: "Monsters", nav_festivals: "Festivals",
        search_placeholder: "Search for an item...",
        search_results: "Results for",
        no_results: "No results found.",
        featured: "⭐ Featured",
        home_title: "Stardew Valley Encyclopedia",
        home_desc: "Select a category to explore the database.",
        elements: "items",
        filter_all: "All Seasons",
        
        // Seasons
        season_spring: "Spring", season_summer: "Summer", 
        season_fall: "Fall", season_winter: "Winter", season_all: "All Seasons",

        // Card Labels
        lbl_birthday: "Birthday", lbl_location: "Location", lbl_season: "Season",
        lbl_growth: "Growth Time", lbl_materials: "Materials", lbl_ingredients: "Ingredients",
        lbl_effects: "Effects", lbl_building: "Required Building", lbl_product: "Product",
        lbl_hp: "Health Points", lbl_damage: "Damage", lbl_drops: "Drops",
        lbl_date: "Date", lbl_activities: "Activities", lbl_obtain: "How to obtain",
        lbl_unlock: "Unlocked by", lbl_loves: "Loves", lbl_likes: "Likes", lbl_hates: "Hates",
        lbl_gifts: "Gifts", lbl_sell_price: "Sell Price", lbl_quality: "Quality", lbl_price: "Price"
    }
};

const db = {
    NPCs: [
        { id: "abigail", img: "https://stardewvalleywiki.com/mediawiki/images/8/88/Abigail.png", name: { fr: "Abigail", en: "Abigail" }, birthday: { fr: "Automne 13", en: "Fall 13" }, location: { fr: "Magasin de Pierre", en: "Pierre's General Store" }, gifts: { loves: { fr: "Améthyste, Citrouille", en: "Amethyst, Pumpkin" }, likes: { fr: "Quartz", en: "Quartz" }, hates: { fr: "Argile", en: "Clay" } } },
        { id: "sebastian", img: "https://stardewvalleywiki.com/mediawiki/images/a/a8/Sebastian.png", name: { fr: "Sebastian", en: "Sebastian" }, birthday: { fr: "Hiver 10", en: "Winter 10" }, location: { fr: "Sous-sol de Robin", en: "Robin's Basement" }, gifts: { loves: { fr: "Larme gelée, Sashimi", en: "Frozen Tear, Sashimi" }, likes: { fr: "Quartz", en: "Quartz" }, hates: { fr: "Argile", en: "Clay" } } },
        { id: "linus", img: "https://stardewvalleywiki.com/mediawiki/images/3/31/Linus.png", name: { fr: "Linus", en: "Linus" }, birthday: { fr: "Hiver 3", en: "Winter 3" }, location: { fr: "Tente (Montagne)", en: "Tent (Mountain)" }, gifts: { loves: { fr: "Igname rôtie", en: "Roasted Hazelnut" }, likes: { fr: "Fruits de cueillette", en: "Foraged Fruits" }, hates: { fr: "Gemmes", en: "Gems" } } },
        { id: "haley", img: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png", name: { fr: "Haley", en: "Haley" }, birthday: { fr: "Printemps 14", en: "Spring 14" }, location: { fr: "Maison de Haley & Emily", en: "Haley & Emily's House" }, gifts: { loves: { fr: "Tournesol, Gâteau rose", en: "Sunflower, Pink Cake" }, likes: { fr: "Jonquille", en: "Daffodil" }, hates: { fr: "Éclat prismatique", en: "Prismatic Shard" } } },
        { id: "penny", img: "https://stardewvalleywiki.com/mediawiki/images/a/ab/Penny.png", name: { fr: "Penny", en: "Penny" }, birthday: { fr: "Automne 2", en: "Fall 2" }, location: { fr: "Caravane", en: "Trailer" }, gifts: { loves: { fr: "Émeraude, Melon", en: "Emerald, Melon" }, likes: { fr: "Poireau", en: "Leek" }, hates: { fr: "Bière", en: "Beer" } } },
        { id: "harvey", img: "https://stardewvalleywiki.com/mediawiki/images/9/95/Harvey.png", name: { fr: "Harvey", en: "Harvey" }, birthday: { fr: "Hiver 14", en: "Winter 14" }, location: { fr: "Clinique", en: "Clinic" }, gifts: { loves: { fr: "Café, Vin", en: "Coffee, Wine" }, likes: { fr: "Chanterelle", en: "Chanterelle" }, hates: { fr: "Corail", en: "Coral" } } }
    ],
    Farming: [
        { id: "parsnip", img: "https://stardewvalleywiki.com/mediawiki/images/d/db/Parsnip.png", name: { fr: "Panais", en: "Parsnip" }, season: "spring", growth: { fr: "4 Jours", en: "4 Days" }, prices: { normal: 35, silver: 43, gold: 52, iridium: 70 } },
        { id: "potato", img: "https://stardewvalleywiki.com/mediawiki/images/c/c2/Potato.png", name: { fr: "Pomme de terre", en: "Potato" }, season: "spring", growth: { fr: "6 Jours", en: "6 Days" }, prices: { normal: 80, silver: 100, gold: 120, iridium: 160 } },
        { id: "melon", img: "https://stardewvalleywiki.com/mediawiki/images/1/19/Melon.png", name: { fr: "Melon", en: "Melon" }, season: "summer", growth: { fr: "12 Jours", en: "12 Days" }, prices: { normal: 250, silver: 312, gold: 375, iridium: 500 } },
        { id: "blueberry", img: "https://stardewvalleywiki.com/mediawiki/images/9/9e/Blueberry.png", name: { fr: "Myrtille", en: "Blueberry" }, season: "summer", growth: { fr: "13 Jours (Repousse)", en: "13 Days (Regrows)" }, prices: { normal: 50, silver: 62, gold: 75, iridium: 100 } },
        { id: "pumpkin", img: "https://stardewvalleywiki.com/mediawiki/images/6/64/Pumpkin.png", name: { fr: "Citrouille", en: "Pumpkin" }, season: "fall", growth: { fr: "13 Jours", en: "13 Days" }, prices: { normal: 320, silver: 400, gold: 480, iridium: 640 } },
        { id: "cranberries", img: "https://stardewvalleywiki.com/mediawiki/images/6/6e/Cranberries.png", name: { fr: "Canneberge", en: "Cranberries" }, season: "fall", growth: { fr: "7 Jours (Repousse)", en: "7 Days (Regrows)" }, prices: { normal: 75, silver: 93, gold: 112, iridium: 150 } }
    ],
    Fish: [
        { id: "salmon", img: "https://stardewvalleywiki.com/mediawiki/images/a/a6/Salmon.png", name: { fr: "Saumon", en: "Salmon" }, season: "fall", location: { fr: "Rivière", en: "River" }, prices: { normal: 75, silver: 93, gold: 112, iridium: 150 } },
        { id: "catfish", img: "https://stardewvalleywiki.com/mediawiki/images/9/99/Catfish.png", name: { fr: "Poisson-chat", en: "Catfish" }, season: "spring", location: { fr: "Rivière (Pluie)", en: "River (Raining)" }, prices: { normal: 200, silver: 250, gold: 300, iridium: 400 } },
        { id: "pufferfish", img: "https://stardewvalleywiki.com/mediawiki/images/b/ba/Pufferfish.png", name: { fr: "Poisson-globe", en: "Pufferfish" }, season: "summer", location: { fr: "Océan", en: "Ocean" }, prices: { normal: 200, silver: 250, gold: 300, iridium: 400 } },
        { id: "tuna", img: "https://stardewvalleywiki.com/mediawiki/images/c/c5/Tuna.png", name: { fr: "Thon", en: "Tuna" }, season: "summer", location: { fr: "Océan", en: "Ocean" }, prices: { normal: 100, silver: 125, gold: 150, iridium: 200 } },
        { id: "squid", img: "https://stardewvalleywiki.com/mediawiki/images/8/81/Squid.png", name: { fr: "Calamar", en: "Squid" }, season: "winter", location: { fr: "Océan (Nuit)", en: "Ocean (Night)" }, prices: { normal: 80, silver: 100, gold: 120, iridium: 160 } }
    ],
    Items: [
        { id: "prismaticshard", img: "https://stardewvalleywiki.com/mediawiki/images/5/56/Prismatic_Shard.png", name: { fr: "Éclat prismatique", en: "Prismatic Shard" }, obtain: { fr: "Nœuds d'iridium, Pierres mystiques", en: "Iridium Nodes, Mystic Stones" }, price: 2000 },
        { id: "wood", img: "https://stardewvalleywiki.com/mediawiki/images/d/df/Wood.png", name: { fr: "Bois", en: "Wood" }, obtain: { fr: "Couper des arbres", en: "Chopping Trees" }, price: 2 },
        { id: "stone", img: "https://stardewvalleywiki.com/mediawiki/images/d/d4/Stone.png", name: { fr: "Pierre", en: "Stone" }, obtain: { fr: "Casser des rochers", en: "Breaking Rocks" }, price: 2 },
        { id: "hardwood", img: "https://stardewvalleywiki.com/mediawiki/images/e/ed/Hardwood.png", name: { fr: "Bois dur", en: "Hardwood" }, obtain: { fr: "Grosses souches", en: "Large Stumps" }, price: 15 },
        { id: "iridiumore", img: "https://stardewvalleywiki.com/mediawiki/images/e/e9/Iridium_Ore.png", name: { fr: "Minerai d'iridium", en: "Iridium Ore" }, obtain: { fr: "Mines du Crâne", en: "Skull Cavern" }, price: 100 }
    ],
    Crafting: [
        { id: "furnace", img: "https://stardewvalleywiki.com/mediawiki/images/e/e0/Furnace.png", name: { fr: "Four", en: "Furnace" }, materials: { fr: "20 Pierres, 25 Minerais de cuivre", en: "20 Stone, 25 Copper Ore" }, unlock: { fr: "Quête de Clint", en: "Clint's Quest" } },
        { id: "iridiumsprinkler", img: "https://stardewvalleywiki.com/mediawiki/images/9/90/Iridium_Sprinkler.png", name: { fr: "Arroseur en iridium", en: "Iridium Sprinkler" }, materials: { fr: "1 Lingot d'or, 1 Lingot d'iridium, 1 Pile", en: "1 Gold Bar, 1 Iridium Bar, 1 Battery Pack" }, unlock: { fr: "Agriculture Niv. 9", en: "Farming Lvl 9" } },
        { id: "scarecrow", img: "https://stardewvalleywiki.com/mediawiki/images/6/69/Scarecrow.png", name: { fr: "Épouvantail", en: "Scarecrow" }, materials: { fr: "50 Bois, 1 Charbon, 20 Fibres", en: "50 Wood, 1 Coal, 20 Fiber" }, unlock: { fr: "Agriculture Niv. 1", en: "Farming Lvl 1" } },
        { id: "chest", img: "https://stardewvalleywiki.com/mediawiki/images/b/b3/Chest.png", name: { fr: "Coffre", en: "Chest" }, materials: { fr: "50 Bois", en: "50 Wood" }, unlock: { fr: "Dès le début", en: "Start of game" } },
        { id: "megabomb", img: "https://stardewvalleywiki.com/mediawiki/images/3/36/Mega_Bomb.png", name: { fr: "Méga bombe", en: "Mega Bomb" }, materials: { fr: "4 Minerais d'or, 1 Essence solaire, 1 Essence de vide", en: "4 Gold Ore, 1 Solar Essence, 1 Void Essence" }, unlock: { fr: "Extraction Niv. 8", en: "Mining Lvl 8" } }
    ],
    Cooking: [
        { id: "friedegg", img: "https://stardewvalleywiki.com/mediawiki/images/1/18/Fried_Egg.png", name: { fr: "Œuf au plat", en: "Fried Egg" }, ingredients: { fr: "1 Œuf", en: "1 Egg" }, effects: { fr: "+50 Énergie, +22 Santé", en: "+50 Energy, +22 Health" }, price: 35 },
        { id: "pinkcake", img: "https://stardewvalleywiki.com/mediawiki/images/3/32/Pink_Cake.png", name: { fr: "Gâteau rose", en: "Pink Cake" }, ingredients: { fr: "1 Melon, 1 Farine, 1 Sucre, 1 Œuf", en: "1 Melon, 1 Wheat Flour, 1 Sugar, 1 Egg" }, effects: { fr: "+250 Énergie, +112 Santé", en: "+250 Energy, +112 Health" }, price: 480 },
        { id: "sashimi", img: "https://stardewvalleywiki.com/mediawiki/images/4/41/Sashimi.png", name: { fr: "Sashimi", en: "Sashimi" }, ingredients: { fr: "1 Poisson (N'importe lequel)", en: "1 Any Fish" }, effects: { fr: "+75 Énergie, +33 Santé", en: "+75 Energy, +33 Health" }, price: 75 },
        { id: "salad", img: "https://stardewvalleywiki.com/mediawiki/images/7/7e/Salad.png", name: { fr: "Salade", en: "Salade" }, ingredients: { fr: "1 Poireau, 1 Pissenlit, 1 Vinaigre", en: "1 Leek, 1 Dandelion, 1 Vinegar" }, effects: { fr: "+113 Énergie, +50 Santé", en: "+113 Energy, +50 Health" }, price: 110 }
    ],
    Mines: [
        { id: "coppernode", img: "https://stardewvalleywiki.com/mediawiki/images/e/ea/Copper_Node.png", name: { fr: "Filons de cuivre", en: "Copper Node" }, location: { fr: "Mines (Étages 2-39)", en: "Mines (Levels 2-39)" }, drops: { fr: "Minerai de cuivre, Pierre", en: "Copper Ore, Stone" } },
        { id: "mysticstone", img: "https://stardewvalleywiki.com/mediawiki/images/7/70/Mystic_Stone.png", name: { fr: "Pierre mystique", en: "Mystic Stone" }, location: { fr: "Mines (Étage 100+), Caverne du Crâne", en: "Mines (Lvl 100+), Skull Cavern" }, drops: { fr: "Éclat prismatique, Minerais d'or/iridium", en: "Prismatic Shard, Gold/Iridium Ore" } },
        { id: "diamond", img: "https://stardewvalleywiki.com/mediawiki/images/e/ea/Diamond.png", name: { fr: "Diamant", en: "Diamond" }, location: { fr: "Mines (Étage 50+)", en: "Mines (Lvl 50+)" }, price: 750 }
    ],
    Animals: [
        { id: "chicken", img: "https://stardewvalleywiki.com/mediawiki/images/e/ea/Chicken.png", name: { fr: "Poule", en: "Chicken" }, building: { fr: "Poulailler", en: "Coop" }, product: { fr: "Œuf", en: "Egg" }, price: 800 },
        { id: "cow", img: "https://stardewvalleywiki.com/mediawiki/images/a/ab/Cow.png", name: { fr: "Vache", en: "Cow" }, building: { fr: "Étable", en: "Barn" }, product: { fr: "Lait", en: "Milk" }, price: 1500 },
        { id: "pig", img: "https://stardewvalleywiki.com/mediawiki/images/3/30/Pig.png", name: { fr: "Cochon", en: "Pig" }, building: { fr: "Étable de luxe", en: "Deluxe Barn" }, product: { fr: "Truffe", en: "Truffle" }, price: 16000 },
        { id: "dinosaur", img: "https://stardewvalleywiki.com/mediawiki/images/d/df/Dinosaur.png", name: { fr: "Dinosaure", en: "Dinosaur" }, building: { fr: "Grand poulailler", en: "Big Coop" }, product: { fr: "Œuf de dinosaure", en: "Dinosaur Egg" }, price: "Incubateur" }
    ],
    Monsters: [
        { id: "greenslime", img: "https://stardewvalleywiki.com/mediawiki/images/a/a8/Green_Slime.png", name: { fr: "Slime vert", en: "Green Slime" }, hp: 24, damage: 5, location: { fr: "Mines (Étages 1-39)", en: "Mines (Levels 1-39)" }, drops: { fr: "Bave, Sève", en: "Slime, Sap" } },
        { id: "bat", img: "https://stardewvalleywiki.com/mediawiki/images/6/69/Bat.png", name: { fr: "Chauve-souris", en: "Bat" }, hp: 24, damage: 6, location: { fr: "Mines (Étages 31-39)", en: "Mines (Levels 31-39)" }, drops: { fr: "Aile de chauve-souris", en: "Bat Wing" } },
        { id: "serpent", img: "https://stardewvalleywiki.com/mediawiki/images/2/22/Serpent.png", name: { fr: "Serpent", en: "Serpent" }, hp: 150, damage: 23, location: { fr: "Caverne du Crâne", en: "Skull Cavern" }, drops: { fr: "Bombe, Épicée anguille", en: "Bomb, Spicy Eel" } }
    ],
    Festivals: [
        { id: "eggfestival", img: "https://stardewvalleywiki.com/mediawiki/images/c/c2/Egg_Festival_Logo.png", name: { fr: "Fête des œufs", en: "Egg Festival" }, season: "spring", date: { fr: "Printemps 13", en: "Spring 13" }, activities: { fr: "Chasse aux œufs, Achat de graines de fraise", en: "Egg Hunt, Strawberry Seeds shop" } },
        { id: "flowerdance", img: "https://stardewvalleywiki.com/mediawiki/images/6/60/Flower_Dance_Logo.png", name: { fr: "Danse des fleurs", en: "Flower Dance" }, season: "spring", date: { fr: "Printemps 24", en: "Spring 24" }, activities: { fr: "Danse avec les partenaires", en: "Dance with partners" } },
        { id: "luau", img: "https://stardewvalleywiki.com/mediawiki/images/a/a4/Luau_Logo.png", name: { fr: "Luau", en: "Luau" }, season: "summer", date: { fr: "Été 11", en: "Summer 11" }, activities: { fr: "Soupe commune (Gouverneur)", en: "Potluck Soup (Governor)" } }
    ]
};