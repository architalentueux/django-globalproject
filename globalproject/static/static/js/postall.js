//import { pagination } from './pagination.js' ;


document.getElementById('checkspecies').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement
    // $('#result').paginathing({ulClass: null});    
// $('#result').paginathing('destroy');
//     $('#result').remove();
    // Récupérer la valeur du champ 'name'
    const idcontinent = document.getElementById('idcontinen').value;
    const idsubfamily = document.getElementById('dropdown1').value;
    
    const idtribes = document.getElementById('dropdown8').value;
    const idgenres = document.getElementById('genus').value;
    const data = new FormData();
    data.append('lecontinent', idcontinent);
    data.append('dropdown1', idsubfamily);
    data.append('letribe', idtribes);
    data.append('legenus', idgenres);
    console.log('le genre est',idgenres)
    // Envoyer la requête POST
    axios.post('http://127.0.0.1:8000/check-species/', data)
        .then(response => {



            // Afficher le résultat dans la balise <div> avec l'ID 'result'
            document.getElementById('result').innerText = response.data.lecontinent;
         
             const messageElement = document.getElementById('result');

    //recuperation  specifique des noms et identifiant des genustribes


       const species = response.data.especes;
          
//       const namespecies = species.map(esp => `<div id="${esp.idspeciesv2}" class="blue-text">${esp.namespeciesv2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="${esp.linkpowo}">====>powo</a></div>`)
// a reouvrir apres
  const namespecies = species.map(esp => `<div id="${esp.idspeciesv2}" class="blue-text"><a href="http://127.0.0.1:8000/post/distribution/?ids=${esp.idspeciesv2}" target="_blank" class="species-link" data-species-id="${esp.idspeciesv2}">${esp.namespeciesv2}</a>&nbsp;<span>${esp.authorspeciesv2}</span>&nbsp;&nbsp;<a href="${esp.linkpowo}" class="external-links float-right">POWO ↗</a></div>`)

//    messageElement.innerHTML ='<option value="dropdo">' + response.data.message + '</option>' ;
//    messageElement.innerHTML ='<option value="dropdo">' + '<ul>'+ nametribes.join(',')+'</ul>' + '</option>' ;
// const namespecies = species.map(esp => `<div id="${esp.idspeciesv2}" class="blue-text"><a href="http://127.0.0.1:8000/post/distribution/" class="species-link" data-species-id="${esp.idspeciesv2}">${esp.namespeciesv2}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="${esp.linkpowo}">====>powo</a></div>`);

     messageElement.innerHTML = namespecies.join('') ;
//    messageElement.innerHTML = '<div id="toto">' + response.data.message + '</div>' ;
//    messageElement.innerHTML = '<div id="toto">' + response.data.message + '</div>' ;
//    console.log(response.data);
//    console.log('Option :', tribselect);
// test pagination
// $('#result').paginathing('destroy');
//     pagination();

resetPagination();
//$('#result').paginathing({

  // Limites your pagination number
  // false or number
//  limitPagination: 10,

  // Pagination controls
//  perPage: 5,
//  prevNext: true,
//  firstLast: true,
//  prevText: '&laquo;',
//  nextText: '&raquo;',
//  firstText: 'First',
//  lastText: 'Last',
//  containerClass: 'pagination-container',
//  ulClass: 'pagination',
//  liClass: 'page',
//  activeClass: 'active',
//  disabledClass: 'disabled',
//  limitPagination: 9,
//  containerClass: 'panel-footer mt-4',
//  pageNumbers: true,
//   ulClass: 'pagination flex-wrap justify-content-center',
//})


//$('#result').paginathing({

  // Limites your pagination number
  // false or number
//  limitPagination: false,

  // Pagination controls
//  perPage: 5,
//  prevNext: true,
//  firstLast: true,
//  prevText: '&laquo;',
//  nextText: '&raquo;',
//  firstText: 'First',
//  lastText: 'Last',
//  containerClass: 'pagination-container',
  //ulClass: 'pagination',
//  liClass: 'page',
//  activeClass: 'active',
//  disabledClass: 'disabled',
//  limitPagination: 9,
//  containerClass: 'panel-footer mt-4',
//  pageNumbers: true,
//   ulClass: 'pagination flex-wrap justify-content-center',
//})





        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});

//function pagination() {
// $('#result').paginathing('destroy');
//$('#result').paginathing({

  // Limites your pagination number
  // false or number
//  limitPagination: false,

  // Pagination controls
//  perPage: 5,
//  prevNext: true,
//  firstLast: true,
//  prevText: '&laquo;',
//  nextText: '&raquo;',
//  firstText: 'First',
//  lastText: 'Last',
//  containerClass: 'pagination-container',
//  ulClass: 'pagination',
//  liClass: 'page',
//  activeClass: 'active',
//  disabledClass: 'disabled',
//  limitPagination: 9,
//  containerClass: 'panel-footer mt-4',
//  pageNumbers: true,
//   ulClass: 'pagination flex-wrap justify-content-center',
//})
//}
// Fonction pour réinitialiser la pagination
function resetPagination() {
  //  $('#result').empty('destroy');
//     $('#result').remove();
//    var rm_pagination =  $('#result');
//    rm_pagination.val("");
    // Supprimer la pagination existante
//    $('#result').paginathing({ulClass: null});
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

// Appeler cette fonction avant une nouvelle pagination
//resetPagination();

