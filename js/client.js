const clientsBody = document.getElementById("clients-body");

async function chargerClients() {

    const clients = await getAll("client");

    clientsBody.innerHTML = "";

    clients.forEach(client => {

        clientsBody.innerHTML += `
        
        <tr>
            <td>${client.id_client}</td>
            <td>${client.nom}</td>
            <td>${client.prenom}</td>
            <td>${client.email}</td>
            <td>${client.telephone}</td>
            <td>${client.mdp}</td>
        </tr>
        
        `;
    });
}

chargerClients();