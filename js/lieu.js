const lieuxBody = document.getElementById("lieux-body");
const inputLieu = document.getElementById("inputEvenement");
const bRechercher = document.getElementById("bRechercher");
const reload = document.getElementById("bActualiserEvenement");
const bAjouter = document.getElementById("bAjouter");

const nom = document.getElementById("nom");
const pays = document.getElementById("pays");
const ville = document.getElementById("ville");
const address = document.getElementById("address");
const capacite = document.getElementById("capacite");
const idLieu = document.getElementById("id_lieu");

let tousLesLieux = [];

function afficherLieux(lieux) {
    lieuxBody.innerHTML = lieux.map(lieu => `
        <tr>
            <td>${lieu.id_lieu}</td>
            <td>${lieu.nom}</td>
            <td>${lieu.pays}</td>
            <td>${lieu.ville}</td>
            <td>${lieu.address}</td>
            <td>${lieu.capacite}</td>
            
            <td>
                    <button class="bSupprimer" onclick="supprimerLieu(${lieu.id_lieu})">
                        Supprimer
                    </button>
                </td>
            
        </tr>
    `).join('');
}

async function chargerLieux() {

     lieuxBody.innerHTML = `
    <tr>
        <td colspan="7">Chargement...</td>
    </tr>
    `;

    try {
        tousLesLieux = await getAll("lieu");
        afficherLieux(tousLesLieux);
    } catch (error) {
        alert("Impossible d'afficher les lieux !");
        
    }
}

async function rechercherParId() {
    const id = inputLieu.value.trim();

    if (id === "") {
        chargerLieux();
        return;
    }

    try {
        const lieu = await getById("lieu", id);
        afficherLieux([lieu]);
    } catch (error) {
        alert("Aucun lieu avec ce ID !");
        console.error(error);
    }
}
async function ajouterLieu() {

   const nouveauLieu = {

    id_lieu: parseInt(idLieu.value),
    nom: nom.value,
    pays: pays.value,
    ville: ville.value,
    address: address.value,
    capacite: parseInt(capacite.value)

};

    try {

        await create("lieu", nouveauLieu);

        alert("Lieu ajouté !");

        idLieu.value = "";
        nom.value = "";
        pays.value = "";
        ville.value = "";
        address.value = "";
        capacite.value = "";

        chargerLieux();

    } catch(error) {

        alert("Erreur lors de l'ajout !");
        console.error(error);

    }
}


async function supprimerLieu(id) {

    if (!confirm(`Supprimer le lieu ${id} ?`)) return;

    try {
        await remove("lieu", id);

        chargerLieux();
    } catch (error) {
       alert("Impossible de supprimer le lieu !");
    }
}

bAjouter.addEventListener("click", (event)=>{

    event.preventDefault();
    ajouterLieu();

});

bRechercher.addEventListener("click", (event) => {
    event.preventDefault();
    rechercherParId();
});

reload.addEventListener("click", (event) => {
    event.preventDefault();
    inputLieu.value = "";
    chargerLieux();
});

chargerLieux();