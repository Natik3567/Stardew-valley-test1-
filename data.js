const fallbackImg = "assets/ui/placeholder.png";

const categoriesInfo = {
    NPCs: { icon: "assets/ui/menu_characters.png", fr: "Personnages", en: "Characters" },
    Farming: { icon: "assets/ui/menu_farming.png", fr: "Agriculture", en: "Farming" },
    Fish: { icon: "assets/ui/menu_fish.png", fr: "Poissons", en: "Fish" },
    Items: { icon: "assets/ui/menu_items.png", fr: "Objets", en: "Items" },
    Crafting: { icon: "assets/ui/menu_crafting.png", fr: "Crafts & Recettes", en: "Crafting & Recipes" },
    Cooking: { icon: "assets/ui/menu_cooking.png", fr: "Cuisine", en: "Cooking" },
    Mines: { icon: "assets/ui/menu_mines.png", fr: "Mines", en: "Mines" },
    Animals: { icon: "assets/ui/menu_animals.png", fr: "Animaux", en: "Animals" },
    Monsters: { icon: "assets/ui/menu_monsters.png", fr: "Monstres", en: "Monsters" },
    Festivals: { icon: "assets/ui/menu_festivals.png", fr: "Festivals", en: "Festivals" }
};

const i18n = {
    fr: { nav_home: "Accueil", home_title: "Wiki Stardew", home_desc: "Sélectionnez une catégorie.", elements: "éléments", featured: "⭐ En vedette", no_results: "Aucun élément pour le moment." },
    en: { nav_home: "Home", home_title: "Stardew Wiki", home_desc: "Select a category.", elements: "items", featured: "⭐ Featured", no_results: "No items yet." }
    // Ajoute ici tes autres traductions (labels, saisons, etc.)
};

const db = {
    NPCs: [
        { id: "abigail", img: "assets/characters/abigail.png", name: { fr: "Abigail", en: "Abigail" }, birthday: { fr: "Automne 13", en: "Fall 13" } },
        { id: "sebastian", img: "assets/characters/sebastian.png", name: { fr: "Sebastian", en: "Sebastian" }, birthday: { fr: "Hiver 10", en: "Winter 10" } },
        { id: "linus", img: "assets/characters/linus.png", name: { fr: "Linus", en: "Linus" }, birthday: { fr: "Hiver 3", en: "Winter 3" } },
        { id: "pierre", img: "assets/characters/pierre.png", name: { fr: "Pierre", en: "Pierre" }, birthday: { fr: "Printemps 26", en: "Spring 26" } },
        { id: "krobus", img: "assets/characters/krobus.png", name: { fr: "Krobus", en: "Krobus" }, birthday: { fr: "Hiver 1", en: "Winter 1" } }
    ],
    Farming: [
        { id: "parsnip", img: "assets/farming/parsnip.png", name: { fr: "Panais", en: "Parsnip" }, season: "spring" },
        { id: "potato", img: "assets/farming/potato.png", name: { fr: "Pomme de terre", en: "Potato" }, season: "spring" },
        { id: "melon", img: "assets/farming/melon.png", name: { fr: "Melon", en: "Melon" }, season: "summer" },
        { id: "starfruit", img: "assets/farming/starfruit.png", name: { fr: "Fruit de la passion", en: "Starfruit" }, season: "summer" },
        { id: "pumpkin", img: "assets/farming/pumpkin.png", name: { fr: "Citrouille", en: "Pumpkin" }, season: "fall" }
    ],
    Fish: [
        { id: "salmon", img: "assets/fish/salmon.png", name: { fr: "Saumon", en: "Salmon" }, location: { fr: "Rivière", en: "River" } },
        { id: "catfish", img: "assets/fish/catfish.png", name: { fr: "Poisson-chat", en: "Catfish" }, location: { fr: "Rivière (Pluie)", en: "River (Rain)" } },
        { id: "legend", img: "assets/fish/legend.png", name: { fr: "Légende", en: "Legend" }, location: { fr: "Lac de la Montagne", en: "Mountain Lake" } }
    ]
    // Utilise cette même structure avec les chemins locaux "assets/..." pour Items, Crafting, Cooking, etc.
};