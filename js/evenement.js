const evenementsBody = document.getElementById("evenement-body");
const inputEvenement = document.getElementById("inputEvenement");
const bRechercher = document.getElementById("bRechercher");
const reload = document.getElementById("bActualiserEvenement");


let tousLesEvenements = [];

function afficherEvenements(evenements){

    evenementsBody.innerHTML = evenements.map(evenement => `
        
         <tr>
            <td>${evenement.id_evenement}</td>
            <td>${evenement.nom}</td>
            <td>${evenement.date_evenement.split("T")[0]}</td>
            <td>${evenement.sport}</td>
            <td>${evenement.id_lieu}</td>
        </tr>
         `).join('');
        
}


async function chargerEvenements() {

    try {

      tousLesEvenements = await getAll("evenement");
      afficherEvenements(tousLesEvenements);

    } catch (error) {

       alert("Impossible d'afficher les évenements !");

    }
}

function rechercherParSport(){
    const terme = inputEvenement.value.trim().toLowerCase();

    const filtres = tousLesEvenements.filter(evenement =>
        evenement.sport.toLowerCase().includes(terme)
       
    );

    afficherEvenements(filtres);
}

async function rechercherParId() {
    const id = inputEvenement.value.trim();

    if (id === "") {
        chargerEvenements();
        return;
    }

    try {
        const evenement = await getById("evenement", id);
        afficherEvenements([evenement]);
    } catch (error) {
        alert("Aucun évenement avec ce ID !");
    }
}


bRechercher.addEventListener("click",(event) =>{

    event.preventDefault();

    if(inputEvenement.value.trim()===""){
        chargerEvenements();
    }
    else if (!isNaN(inputEvenement.value.trim())) {
        rechercherParId();
    } else {
        rechercherParSport();
    }

});

reload.addEventListener("click", (event) => {
    event.preventDefault();
    inputEvenement.value = "";
    chargerEvenements();
});





chargerEvenements();