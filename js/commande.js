const commandesBody = document.getElementById("commande-body");
const commandeForm = document.getElementById("formCommande");
const reload = document.getElementById("bActualiser");
const message = document.getElementById("message");

async function chargerCommandes() {

    try {

        const commandes = await getAll("commande");

        commandesBody.innerHTML = commandes.map(commande => `

            <tr>
                <td>${commande.id_commande}</td>
                <td>${commande.date_commande.split("T")[0]}</td>
                <td>${commande.prix_total}</td>
                <td>${commande.id_client}</td>

                <td>
                    <button class="bSupprimer" onclick="supprimerCommande(${commande.id_commande})">
                        Supprimer
                    </button>
                </td>
            </tr>

        `).join('');

    } catch (error) {

        commandesBody.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;

    }
}

commandeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nouvelleCommande = {
        id_commande: Number(document.getElementById("idCommande").value),
        date_commande: document.getElementById("dateCommande").value+"T00:00:00Z",
        prix_total: Number(document.getElementById("prixCommande").value),
        id_client: Number(document.getElementById("idClientCommande").value)
    };

    try {
    await create('commande', nouvelleCommande);

    message.textContent = "Commande ajouté avec succès !";
     message.style.color = "yellow";

     setTimeout(() => {

    message.textContent = "";

}, 3000);

    commandeForm.reset();

    chargerCommandes();

} catch (error) {

    message.textContent = "Impossible de ajouter la commande !";
     message.style.color = "red";

}
});

async function supprimerCommande(id) {

    if (!confirm(`Supprimer la commande ${id} ?`)) return;

    try {
        await remove("commande", id);
        chargerCommandes();
    } catch (error) {
        alert(error.message);
    }
}

reload.addEventListener("click", chargerCommandes);

chargerCommandes();