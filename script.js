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

// Dictionnaire des chemins d'images par personnage
const characterImages = {
    "1": {
        front: 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1).png',
        back: 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copains8B(1)B.png',
        left: 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1)G.png',
        right: 'https://raw.githubusercontent.com/Anngeldouche/StardewP2/main/Copainbits/Copains8B(1)D.png',
    },
    // ... (Autres personnages)
};

const characterId = getUrlParameter('character');
const image = getUrlParameter('image');
const displayElement = document.getElementById('character-display');

if (characterId && image) {
    const characterName = copains[characterId] || "Copain inconnu";
    displayElement.innerHTML = `
        <img src="${image}" alt="Personnage sélectionné" id="character-image" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
        <h2>Bienvenue ${characterName}</h2>
    `;
} else {
    displayElement.innerHTML = `<p>Aucun personnage sélectionné. Veuillez revenir à la page précédente et en choisir un.</p>`;
}

let currentDirection = 'front';
let isUpPressed = false;
let isDownPressed = false;
let isLeftPressed = false;
let isRightPressed = false;

function updateCharacterImage() {
    const characterImage = document.getElementById('character-image');
    if (!characterImage || !characterId || !characterImages[characterId]) return;

    const imagePaths = characterImages[characterId];
    const imagePath = imagePaths[currentDirection] || imagePaths.front;

    characterImage.src = imagePath;
}

function moveCharacter() {
    const characterImage = document.getElementById('character-image');
    if (!characterImage) return;

    const step = 10; // Déplacement en pixels

    const currentTop = parseFloat(characterImage.style.top || "50%");
    const currentLeft = parseFloat(characterImage.style.left || "50%");

    if (isUpPressed) {
        characterImage.style.top = `${currentTop - step}px`;
        currentDirection = 'back';
    }
    if (isDownPressed) {
        characterImage.style.top = `${currentTop + step}px`;
        currentDirection = 'front';
    }
    if (isLeftPressed) {
        characterImage.style.left = `${currentLeft - step}px`;
        currentDirection = 'left';
    }
    if (isRightPressed) {
        characterImage.style.left = `${currentLeft + step}px`;
        currentDirection = 'right';
    }

    updateCharacterImage();
}

// Gestion des touches
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            isUpPressed = true;
            break;
        case 'ArrowDown':
            isDownPressed = true;
            break;
        case 'ArrowLeft':
            isLeftPressed = true;
            break;
        case 'ArrowRight':
            isRightPressed = true;
            break;
    }
    moveCharacter();
    event.preventDefault(); // Empêcher le défilement par défaut
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            isUpPressed = false;
            break;
        case 'ArrowDown':
            isDownPressed = false;
            break;
        case 'ArrowLeft':
            isLeftPressed = false;
            break;
        case 'ArrowRight':
            isRightPressed = false;
            break;
    }
});
