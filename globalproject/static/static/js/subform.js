export function subform() {

    const checkspecies = document.getElementById('checkspecies');
//    const selectedcontinentId = document.getElementById('idcontinen').value ;
    // Récupérer l'élément select
    //    const checkspecies = document.getElementById('checkspecies');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
//        selectTribe.addEventListener('change', handleSelectOptionChange);
     
     const handleSubmit = (event) => {
              // cette fonction permet de gerer les cookies pour l'autorisation d'acces pour les requetes post
              event.preventDefault();
             const selectedcontinentId = document.getElementById('idcontinen').value ;
             function getCookie(name) {
               const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
               return cookieValue ? cookieValue.pop() : '';
             }
             // prevendefault pour blocker le rechargement de la page
//              event.preventDefault();
          // on essaie de recuperer la sous famille et le continent selectionné (les ids) 
//            const selectedsubfamilyId = document.getElementById('dropdown1').value;
//            const selectedcontinentId = document.getElementById('idcontinen').value ;
            // cette variable me permet de recuperer le token pour la connexion pour executer post
            const csrfToken = getCookie('csrftoken');
            const token = document.querySelector('[name=csrfmiddlewaretoken]').value;
            console.log('Option sélectionnée :', selectedcontinentId );
         // Enregistrer la valeur sélectionnée précédente dans la variable d'état
         
        // dans ma requete axios je recupere les objets passer en parametres ainsi que le token
//axios.post('http://127.0.0.1:8000/check-species/',{conselec: selectedcontinentId },{ headers: {'X-CSRFToken': token} // Ajouter le jeton CSRF à l'en-tête de la requête
//  })
         const a = selectedcontinentId
         const  data2 = { lecontinent: a } ;
         console.log('dans le selec :');
//       axios.post('http://127.0.0.1:8000/check-species/',{lecontinent: selectedcontinentId}, {  headers: {'X-CSRFToken': csrfToken}})
        axios.post('http://127.0.0.1:8000/check-species/', { data2,  // Remplacez formData par les données que vous souhaitez envoyer
    headers: {
        'Content-Type': 'application/json',  // Assurez-vous que le type de contenu est correct
        'X-CSRFToken': csrfToken  // Incluez le CSRF token si nécessaire
    }})
  .then(response => {
    
//    const messageElement = document.getElementById('bob');
     
    alert(response.data.item);
    alert(response.data.conselec);
     alert(response.data.lecontinent);
//     alert( response.data.con);
    //recuperation  specifique des noms et identifiant des genustribes
  
  
//       const species = response.data.especes
//      const namespecies = species.map(esp => `<div id="${esp.idspeciesv2}">${esp.namespeciesv2}</div>`)

//    messageElement.innerHTML ='<option value="dropdo">' + response.data.message + '</option>' ;
//    messageElement.innerHTML ='<option value="dropdo">' + '<ul>'+ nametribes.join(',')+'</ul>' + '</option>' ;


//     messageElement.innerHTML = namespecies.join(',') ;
//    messageElement.innerHTML = '<div id="toto">' + response.data.message + '</div>' ;
//    messageElement.innerHTML = '<div id="toto">' + response.data.message + '</div>' ;
//    console.log(response.data);
//    console.log('Option :', tribselect);
  })
  .catch(error => {
    console.error(error);
  });


        };

       // Récupérer l'élément select
//        const selectTribe = document.getElementById('dropdown8');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
//        const checkspecies = document.getElementById('checkspecies');
        checkspecies.addEventListener('submit', handleSubmit);
  

}
//export default SelectComponent ;

//subform() ;
