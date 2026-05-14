const evenementsBody = document.getElementById("evenement-body");
const evenementForm = document.getElementById("formEvenement");
const reload = document.getElementById("bActualiserEvenement");
const message = document.getElementById("message");

async function chargerEvenements() {

    try {

        const evenements = await getAll("evenement");

        evenementsBody.innerHTML = evenements.map(evenement => `

            <tr>
                <td>${evenement.id_evenement}</td>
                <td>${evenement.nom}</td>
                <td>${evenement.date_evenement.split("T")[0]}</td>
                <td>${evenement.sport}</td>
                <td>${evenement.id_lieu}</td>

                <td>
                    <button class="bSupprimer" onclick="supprimerEvenement(${evenement.id_evenement})">
                        Supprimer
                    </button>
                </td>
            </tr>

        `).join('');

    } catch (error) {

        evenementsBody.innerHTML = `<tr><td colspan="6">${error.message}</td></tr>`;

    }
}





reload.addEventListener("click", chargerEvenements);

chargerEvenements();