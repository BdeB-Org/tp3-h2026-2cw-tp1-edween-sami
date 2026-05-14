const commandesBody = document.getElementById("commande-body");

async function chargerCommandes() {

    const commandes = await getAll("commande");

    commandesBody.innerHTML = "";

    commandes.forEach(commande => {

        commandesBody.innerHTML += `
        
        <tr>
           
             <td>${commande.id_commande}</td>
    <td>${commande.date_commande}</td>
    <td>${commande.prix_total}</td>
    <td>${commande.id_client}</td>

        </tr>
        
        `;
    });
}

chargerCommandes();