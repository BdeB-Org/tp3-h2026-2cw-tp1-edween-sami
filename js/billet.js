const billetsBody = document.getElementById("Billet-body");
const inputEvenement = document.getElementById("inputEvenement");
const bRechercher = document.getElementById("bRechercher");
const reload = document.getElementById("bActualiserEvenement");


let tousLesBillets = [];

function afficherBillets(billets){

    billetsBody.innerHTML = billets.map(billet => `
        
        <tr>
            <td>${billet.id_billet}</td>
            <td>${billet.type}</td>
            <td>${billet.prix}</td>
            <td>${billet.id_evenement}</td>
        </tr>

    `).join('');
}



async function chargerBillets() {

    try {

      tousLesBillets = await getAll("billet");
      afficherBillets(tousLesBillets);

    } catch (error) {

       alert("Impossible d'afficher les billets !");

    }
}

async function rechercherParId() {
    const id = inputEvenement.value.trim();

    if (id === "") {
        chargerBillets();
        return;
    }

    try {
        const billet = await getById("billet", id);
        afficherBillets([billet]);
    } catch (error) {
        alert("Aucun billet avec ce ID !");
    }
}


bRechercher.addEventListener("click",(event) =>{
event.preventDefault();
rechercherParId();

});

reload.addEventListener("click", (event) => {
    event.preventDefault();
    inputEvenement.value = "";
    chargerBillets();
});





chargerBillets();