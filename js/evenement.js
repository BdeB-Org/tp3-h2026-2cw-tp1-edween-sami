const evenementsBody = document.getElementById("evenement-body");
const evenementForm = document.getElementById("formEvenement");
const reload = document.getElementById("bActualiser");
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

evenementForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nouvelEvenement = {
        id_evenement: Number(document.getElementById("idEvenement").value),
        nom: document.getElementById("nomEvenement").value.trim(),
        date_evenement: document.getElementById("dateEvenement").value + "T00:00:00Z",
        sport: document.getElementById("sportEvenement").value.trim(),
        id_lieu: Number(document.getElementById("idLieu").value)
    };

    try {
    await create('evenement', nouvelEvenement);

    message.textContent = "Evenement ajouté avec succès !";
     message.style.color = "yellow";

     setTimeout(() => {

    message.textContent = "";

}, 3000);

    evenementForm.reset();

    chargerEvenements();

} catch (error) {

    message.textContent = "Impossible de ajouter l'evenement !";
     message.style.color = "red";

}
});

async function supprimerEvenement(id) {

    if (!confirm(`Supprimer l'événement ${id} ?`)) return;

    try {
        await remove("evenement", id);

         message.textContent = "Evenement supprimé avec succès !";

message.style.color = "orange";

setTimeout(() => {

    message.textContent = "";

}, 3000);
        chargerEvenements();
    } catch (error) {
        alert(error.message);
    }
}

reload.addEventListener("click", chargerEvenements);

chargerEvenements();