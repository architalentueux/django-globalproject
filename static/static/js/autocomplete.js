// autocomplete.js

//$(function() {
//    $('.search-input').autocomplete({
//        source: '/autocomplete/', // L'URL de votre vue d'autocomplétion
//        minLength: 2, // Nombre de caractères avant de commencer l'autocomplétion
//    });
//});
//document.addEventListener("DOMContentLoaded", function(){
    $(document).ready(function() {
         // Détruit l'instance précédent
        // Supprime l'autocomplétion existante
//       $('.search-input').autocomplete("destroy");

        $('.search-input').autocomplete({
            source: '/autocomplete/',  // L'URL de votre vue d'autocomplétion
            minLength: 2,  // Nombre minimum de caractères avant l'autocomplétion
            select: function(event, ui) {
        // Appeler la fonction search avec la valeur sélectionnée
           var speciesName = ui.item.value;
                console.log("species le nom " + speciesName );
                alert("ok" + speciesName);
      //  search(ui.item.value);
   
    }
//    window.location.reload();
        });
        // Supprime l'autocomplétion existante
      

//    });
//       $('.search-input').autocomplete("destroy");
// Réinitialise l'autocomplétion lorsque le champ est vidé
//document.addEventListener("DOMContentLoaded", function(){
// $(document).ready(function() {
            $(".search-button").click(function() {
               
                // Récupérez le nom de l'espèce depuis le champ de saisie
//                 $('.search-input').autocomplete("destroy");
                var speciesName = $(".search-input").val();
             
                console.log("species le nom " + speciesName );
//                window.location.reload();
                alert("ok" + speciesName);
              
                // Effectuez une requête à votre API Django en utilisant Axios 
                Search(speciesName);
                var champRecherche = $(".search-input");
                 champRecherche.val("");
               
//                axios.get("https://votre-api-django.com/species/", {
//                    params: {
//                        name: speciesName
//                    }
//                })
//                .then(function(response) {
                    // Traitez les données de la réponse
//                    var speciesDetails = response.data.details;

                    // Affichez les détails de l'espèce
//                    $("#species-details").html("Détails de l'espèce " + speciesName + ": " + speciesDetails);
//                })
//                .catch(function(error) {
                    // Gérez les erreurs
//                    console.error("Erreur lors de la requête : " + error.message);
//                });
//  $('.search-input').autocomplete("destroy");

            });
// $('.search-input').autocomplete("destroy");
        });

//$('.search-input').autocomplete("destroy");
function Search(speciesName){
//window.location.reload();
//$('.search-input').autocomplete("destroy");
// Effectuez une requête à votre API Django en utilisant Axios

                axios.get("/search_species/", {
                    params: {
                        name: speciesName
                    }
                })
                .then(function(response) {
                    
                     const messageElement = document.getElementById('result');

                    // Traitez les données de la réponse

                    var speciesDetails = response.data.namespecies;
                    var author = response.data.author;
                     var linkpowo = response.data.linkpowo;
                      var idspecies = response.data.idspecies;
                     alert(author);
                    // window.location.reload();
                    // Affichez les détails de l'espèce
 // const namespecies = "<div id=" + idspecies + " class="blue-text"><a href="http://127.0.0.1:8000/post/distribution/?ids=" " + idspecies + " target="_blank" class="species-link" data-species-id="+ idspecies + ">"+ speciesDetails + "</a>&nbsp;<span>" + author + "</span>&nbsp;&nbsp;<a href=" + linkpowo + " "class="external-links float-right">POWO ↗</a></div>";
// messageElement.innerHTML = namespecies.join('') ;
const namespecies = `<div id="${idspecies}" class="blue-text"><a href="http://127.0.0.1:8000/post/distribution/?ids=${idspecies}" target="_blank" class="species-link" data-species-id="${idspecies}">${speciesDetails}</a>&nbsp;<span>${author}</span>&nbsp;&nbsp;<a href="${linkpowo}" class="external-links float-right">POWO ↗</a></div>`;
messageElement.innerHTML = namespecies ;

                    $("#species-details").html("Détails de l'espèce " + speciesName + ": " + speciesDetails);
                })
                .catch(function(error) {
                    // Gérez les erreurs
                    console.error("Erreur lors de la requête : " + error.message);
                });

}

// Récupérez la référence vers la div et le bouton
const maDiv = document.getElementById("advancedsearch");
const monBouton = document.getElementById("advsearchbtn");

// Ajoutez un gestionnaire d'événement au bouton
monBouton.addEventListener("click", () => {
    // Vérifiez l'état actuel de la div
    if (maDiv.style.display === "none") {
        // Si la div est masquée, affichez-la
        maDiv.style.display = "block";
    } else {
        // Sinon, masquez-la
        maDiv.style.display = "none";
    }
});

