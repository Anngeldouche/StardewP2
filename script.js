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

if (characterId && image) {
    const characterName = copains[characterId] || "Copain inconnu";
    displayElement.innerHTML = `
        <img src="${image}" alt="Personnage sélectionné" id="character-image" />
        <h2>Bienvenue ${characterName}</h2>
    `;
} else {
    displayElement.innerHTML = `<p>Aucun personnage sélectionné. Veuillez revenir à la page précédente et en choisir un.</p>`;
}

// --- Code ajouté pour les déplacements --- //

let currentDirection = 'front';
let isUpPressed = false;
let isDownPressed = false;
let isLeftPressed = false;
let isRightPressed = false;

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

// Fonction de déplacement du personnage
function moveCharacter() {
    const characterImage = document.getElementById('character-image');
    if (!characterImage) return;

    const step = 1; // Pas de déplacement

    const currentTop = parseInt(characterImage.style.top || "50%", 10);
    const currentLeft = parseInt(characterImage.style.left || "50%", 10);

    if (isUpPressed && isLeftPressed) {
        characterImage.style.top = `${currentTop - step}%`;
        characterImage.style.left = `${currentLeft - step}%`;
        currentDirection = 'up-left';
    } else if (isUpPressed && isRightPressed) {
        characterImage.style.top = `${currentTop - step}%`;
        characterImage.style.left = `${currentLeft + step}%`;
        currentDirection = 'up-right';
    } else if (isDownPressed && isLeftPressed) {
        characterImage.style.top = `${currentTop + step}%`;
        characterImage.style.left = `${currentLeft - step}%`;
        currentDirection = 'down-left';
    } else if (isDownPressed && isRightPressed) {
        characterImage.style.top = `${currentTop + step}%`;
        characterImage.style.left = `${currentLeft + step}%`;
        currentDirection = 'down-right';
    } else if (isUpPressed) {
        characterImage.style.top = `${currentTop - step}%`;
        currentDirection = 'back';
    } else if (isDownPressed) {
        characterImage.style.top = `${currentTop + step}%`;
        currentDirection = 'front';
    } else if (isLeftPressed) {
        characterImage.style.left = `${currentLeft - step}%`;
        currentDirection = 'left';
    } else if (isRightPressed) {
        characterImage.style.left = `${currentLeft + step}%`;
        currentDirection = 'right';
    }

    updateCharacterImage();
}

// Écouteurs d'événements pour les touches
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
    moveCharacter();
});

// Empêcher le défilement par défaut avec les flèches
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
    }
});

window.addEventListener('wheel', (event) => {
    event.preventDefault();
}, { passive: false });
