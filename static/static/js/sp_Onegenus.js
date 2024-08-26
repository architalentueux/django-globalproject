// ou je vais inserer la liste des especes 
 const messageElement = document.getElementById('losplantes');
 const urlParams = new URLSearchParams(window.location.search);
//        var idspecies = parseFloat(urlParams.get('ids'));
         var namegenus = urlParams.get('ids');
         console.log("peux t-on dire les ids ce sont chargés",namegenus);
//    fetch(`http://127.0.0.1:8000/${namegenus}/check-species-bygenus/`)
      fetch(`/${namegenus}/check-species-bygenus/`)
     //   .then(response => response.json())
          .then(response => {
                 if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
   })
        .then(data => {
            console.log("peux t-on dire les ids ce sont chargés",namegenus);
            var speciesGenus = data.especesbygenus;
            // Utilisez les données récupérées comme nécessaire
            console.log("esceque je peux avoir les liste species de guns ", speciesGenus);
const namespecies = speciesGenus.map(esp => `<div id="${esp.idspecies}" class="blue-text"><a href="http://127.0.0.1:8000/post/distribution/?ids=${esp.idspecies}" target="_blank" class="species-link" data-species-id="${esp.idspecies}">${esp.namespecies}</a>&nbsp;<span>${esp.authorspeciesv2}</span>&nbsp;&nbsp;<a href="${esp.linkpowo}" class="external-links float-right">POWO ↗</a></div>`)
     messageElement.innerHTML = namespecies.join('') ;
resetPagination();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

          
//       const namespecies = species.map(esp => `<div id="${esp.idspeciesv2}" class="blue-text">${esp.namespeciesv2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="${esp.linkpowo}">====>powo</a></div>`)
// a reouvrir apres
//  const namespecies = species.map(esp => `<div id="${esp.idspeciesv2}" class="blue-text"><a href="http://127.0.0.1:8000/
//post/distribution/?ids=${esp.idspeciesv2}" target="_blank" class="species-link" data-species-id=
//"${esp.idspeciesv2}">${esp.namespeciesv2}</a>&nbsp;<span>${esp.authorspeciesv2}</span>&nbsp;&nbsp;
//<a href="${esp.linkpowo}" class="external-links float-right">POWO ↗</a></div>`)
// Fonction pour réinitialiser la pagination
function resetPagination() {
    $('.pagination-container').remove();
    // Réinitialiser les paramètres de pagination
    $('#result').paginathing({
        limitPagination: 10,
        perPage: 5,
        prevNext: true,
        firstLast: true,
        prevText: '&laquo;',
        nextText: '&raquo;',
        firstText: 'First',
        lastText: 'Last',
        liClass: 'page',
        activeClass: 'active',
        disabledClass: 'disabled',
        pageNumbers: true,
        ulClass: 'pagination flex-wrap justify-content-center'
    });
}

