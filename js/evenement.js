const evenementsBody = document.getElementById("evenement-body");

async function chargerEvenements() {

    const evenements = await getAll("evenement");

    evenementsBody.innerHTML = "";

    evenements.forEach(evenement => {

        evenementsBody.innerHTML += `
        
        <tr>
           
            <td>${evenement.id_evenement}</td>
            <td>${evenement.nom}</td>
            <td>${evenement.date_evenement}</td>
            <td>${evenement.sport}</td>
            <td>${evenement.id_lieu}</td> 

        </tr>
        
        `;
    });
}

chargerEvenements();