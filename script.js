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
