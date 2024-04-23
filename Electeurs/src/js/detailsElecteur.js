// Fonction pour extraire les paramètres d'URL et afficher les détails de l'électeur
function afficherDetailsElecteur() {
    const urlParams = new URLSearchParams(window.location.search);
    const voterId = urlParams.get('voterId');
    const nationalId = urlParams.get('nationalId');
    const lastName = urlParams.get('lastName');
    const votingStation = urlParams.get('votingStation');
    const phone = urlParams.get('phone');
    const email = urlParams.get('email');

    // Afficher les détails de l'électeur dans la section #detailsElecteur
    document.getElementById('detailsElecteur').innerHTML = `
        <h2>Informations de l'électeur:</h2>
        <p><strong>Numéro de carte d'électeur:</strong> ${voterId}</p>
        <p><strong>Numéro de carte d'identité nationale:</strong> ${nationalId}</p>
        <p><strong>Nom de famille:</strong> ${lastName}</p>
        <p><strong>Numéro de bureau de vote:</strong> ${votingStation}</p>
        <p><strong>Numéro de téléphone:</strong> ${phone}</p>
        <p><strong>Adresse e-mail:</strong> ${email}</p>
    `;
}

// Redirection vers la page des candidats lors du clic sur le bouton "Voir les candidats"
document.getElementById("afficherCandidatsButton").addEventListener("click", function() {
    window.location.href = 'listeCandidats.html';
});

// Appel à la fonction pour extraire les paramètres d'URL et afficher les détails de l'électeur au chargement de la page
document.addEventListener('DOMContentLoaded', afficherDetailsElecteur);
