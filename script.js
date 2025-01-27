// Fonction pour récupérer les paramètres d'URL
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Liste des copains avec leurs noms
const copains = {
    "1": "Angle",
    "2": "Chim",
    "3": "Zonzon",
    "4": "Luc",
    "5": "Mori"
};

const characterId = getUrlParameter('character');
const image = getUrlParameter('image');
const displayElement = document.getElementById('character-display');

let currentDirection = 'front';
let isUpPressed = false;
let isDownPressed = false;
let isLeftPressed = false;
let isRightPressed = false;

if (characterId && image) {
    const characterName = copains[characterId] || "Copain inconnu";
    displayElement.innerHTML = ` 
        <img src="${image}" alt="Personnage sélectionné" id="character-image" />
        <h2>Bienvenue ${characterName}</h2>
    `;
} else {
    displayElement.innerHTML = `<p>Aucun personnage sélectionné. Veuillez revenir à la page précédente et en choisir un.</p>`;
}

// Fonction pour changer l'image en fonction de la direction
function updateCharacterImage() {
    const characterImage = document.getElementById('character-image');
    let imagePath;

    switch (currentDirection) {
        case 'front':
            imagePath = 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1).png';
            break;
        case 'back':
            imagePath = 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1)B.png';
            break;
        case 'left':
            imagePath = 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1)G.png';
            break;
        case 'right':
            imagePath = 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1)D.png';
            break;
        default:
            imagePath = 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1).png';
    }

    characterImage.src = imagePath;
}

// Autres fonctions (moveCharacter, tryOpenDoor, etc.)...
// Copier les fonctions restantes ici depuis le script original
