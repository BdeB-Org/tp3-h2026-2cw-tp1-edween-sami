const clientsBody = document.getElementById("clients-body");
const clientForm = document.getElementById("formClient");
const reload = document.getElementById("bActualiser");
const message = document.getElementById("message");


async function chargerClients() {

   

    try {

        const clients = await getAll('client');

        

        clientsBody.innerHTML = clients.map(client => `
        
            <tr>

                <td>${client.id_client}</td>
                <td>${client.nom}</td>
                <td>${client.prenom}</td>
                <td>${client.email}</td>
                <td>${client.telephone}</td>
                <td>${client.mdp}</td>

                <td>
                    <button class="bSupprimer" onclick="supprimerClient(${client.id_client})">
                        Supprimer
                    </button>
                </td>

            </tr>

        `).join('');

    } catch (error) {

        clientsBody.innerHTML = `<tr><td colspan="7">${error.message}</td></tr>`;

    }
}

async function supprimerClient(id){

     if (!confirm(`Supprimer le client ${id} ?`)) return;

    try {

        await remove('client', id);

        message.textContent = "Client supprimé avec succès !";

message.style.color = "orange";

setTimeout(() => {

    message.textContent = "";

}, 3000);

        chargerClients();

    } catch (error) {

        alert(error.message);

    }
    
}

clientForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nouveauClient = {
        id_client: Number(document.getElementById('idClient').value),
        nom: document.getElementById('nomClient').value.trim(),
        prenom: document.getElementById('prenomClient').value.trim(),
        email: document.getElementById('emailClient').value.trim(),
        telephone: document.getElementById('telephoneClient').value.trim(),
        mdp: document.getElementById('mdpClient').value.trim()
    };

  try {
    await create('client', nouveauClient);

    message.textContent = "Client ajouté avec succès !";
     message.style.color = "yellow";

     setTimeout(() => {

    message.textContent = "";

}, 3000);

    clientForm.reset();

    chargerClients();

} catch (error) {

    message.textContent = "Impossible de ajouter le client !";
     message.style.color = "red";

}
});






reload.addEventListener('click', chargerClients);

chargerClients();




