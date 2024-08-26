// var map = L.map('map').setView([0, 0], 1);
//    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//        maxZoom: 19,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//    }).addTo(map);


//document.addEventListener('DOMContentLoaded', function() {
 // Initialiser la carte Leaflet
//        var map = L.map('map').setView([51.505, -0.09], 13); // Centrer la carte avec une vue par défaut
//        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//            maxZoom: 19,
//            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//        }).addTo(map);
  // recuperation des genre dans la page on fait une initialisation
  const messageElt = document.getElementById('gen');
  var messageE="";
// n'oublie pas que tu as commenté var map et tu as ajouter var map dans tu vois le bas
//var map, map2;
//var marker;
 // Récupérer les coordonnées de la liste passées depuis la vue Django
       // Utilisez AJAX pour récupérer les données JSON de la vue Django
    const urlParams = new URLSearchParams(window.location.search);
//        var idspecies = parseFloat(urlParams.get('ids'));
         var idspecies = urlParams.get('ids');
         console.log("peux t-on dire les ids ce sont chargés",idspecies);
    fetch(`http://127.0.0.1:8000/${idspecies}/check-coords/`)
        .then(response => response.json())
                 if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        .then(data => {
            console.log("peux t-on dire les ids ce sont chargés",idspecies);
            var speciesCoords = data.species_coords;
            // Utilisez les données récupérées comme nécessaire
            console.log("esceque je peux avoir les coords ", speciesCoords);
             console.log("esceque je peux avoir les coords ", data.message);
             
          // Initialisez la carte Leaflet
  var map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
     // test ecriture du genre dans la page
         var sp =  "" ;
//      messageElt.innerHTML= '<p>Genus:>> ' + data.genus + '</p>';
    // Parcourir les coordonnées et ajouter un marqueur pour chaque espèce
    speciesCoords.forEach(coord => {
       var marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
        marker.bindPopup('Species: ' + coord.espece + "<br>Country: " + coord.country + "<br>Collector: " + coord.collector).openPopup();
        // je garde le nom de l'espece
         sp = coord.espece ;
    });
       
        // test ecriture du genre dans la page
//    messageElt.innerHTML= '<div id="species"><span class="arrow">▼</span>' + sp + '</div>' + '<div id="genusContent" style="display: none;">Genus' + data.genus + '</div>';
//    messageElt.innerHTML = '<div id="species"><span class="arrow">▼</span>' + sp + '</div>' + '<div id="genusContent">Genus ' + data.genus + '</div>';
    //                      createDropdownFromData(sp, data.genus, messageElt);
    messageElt.innerHTML = '<div id="dropdown" class="dropdown"> <button class="dropdown-btn" id="spLink">▼' + sp + '</button><div class="dropdown-content"><a href="#" id="genusLink">Genus: ' + data.genus + '</a></div></div>' ;    
//    test();
     var genusLink = document.getElementById('genusLink');
     var spLink = document.getElementById('spLink');
     console.log(genusLink);
//     test(data.genus);
//     DistributionOfSp(sp);
//genusLink.addEventListener('click', function() {
//    alert('Vous avez cliqué sur le lien du genre: ' + data.genus);
//});

      })
        .catch(error => {
            console.error('Error fetching species coordinates:', error);
        });


//document.querySelectorAll('.dropdown-content a').forEach(link => {
//    link.addEventListener('click', function() {
//        console.log('Lien cliqué :', this.textContent);
        // Ajoutez ici le code pour effectuer des actions en fonction du lien cliqué
//       alert("as tu cliqué");
//    });
//});
//console.log(messageE);
// Sélectionner l'élément du lien du genre
//var genusLink = document.getElementById('genusLink');
//console.log(genusLink)
// Ajouter un écouteur d'événements pour le clic sur le lien du genre
function test(d) {
genusLink.addEventListener('click', function() {

    alert('Vous avez cliqué sur le lien du genre: ' + d);
        // Supprimer la carte existante si elle existe
//        if (map !== undefined) {
//            map.remove();
//        }
     
  // Initialisez la carte Leaflet
    map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

// fonction de tout ce qui va se passer
  fetch(`http://127.0.0.1:8000/${idspecies}/check-coords/`)
        .then(response => response.json())
        .then(data => {

            var genusDistribution = data.distrib_gen;
            // Utilisez les données récupérées comme nécessaire
            console.log("esceque je peux avoir les coords deux ", genusDistribution);

  // Initialisez la carte Leaflet
//    if (map !== undefined) {
//            map.remove();
//        }

//   var map = L.map('map').setView([0, 0], 1);
//    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//        maxZoom: 19,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//    }).addTo(map);

     // test ecriture du genre dans la page
      //   var sp =  ""
     genusDistribution.forEach(gendistr => {
        var marker = L.marker([gendistr.latitude, gendistr.longitude]).addTo(map);
        marker.bindPopup('Species: '+ gendistr.species_name + "<br>Country: " + gendistr.country + "<br>Collector: " + gendistr.collector).openPopup();
        // je garde le nom de l'espece
       //  sp = gendistr.espece ;
    });

    })

 .catch(error => {
            console.error('Error fetching species coordinates:', error);
        });

});

}

// fonction pour reafficher la distribution de l'espece au clic
function DistributionOfSp(esp) {

spLink.addEventListener('click', function() {

    alert('Vous avez cliqué sur le lien de lespece: ' + esp);
        // Supprimer la carte existante si elle existe
        if (map !== undefined) {
            map.remove();
        }

  // Initialisez la carte Leaflet
    map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

// fonction de tout ce qui va se passer
  fetch(`http://127.0.0.1:8000/${idspecies}/check-coords/`)
        .then(response => response.json())
        .then(data => {

       var speciesCoords = data.species_coords;
 speciesCoords.forEach(coord => {
       var marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
        marker.bindPopup('Species: ' + coord.espece + '<br>Country: ' + coord.country + '<br>Collector: ' + coord.collector).openPopup();
        // je garde le nom de l'espece
         sp = coord.espece ;
    });

    })

 .catch(error => {
            console.error('Error fetching species coordinates:', error);
        });

});

}


//function createDropdownFromData(sp, data, parentElement) {
    // Créer un élément select pour le dropdown
//    var dropdown = document.createElement('select');

    // Créer un élément option pour le genus et l'ajouter au dropdown
//    var genusOption = document.createElement('option');
//    genusOption.value = data.genus; // Valeur de l'option
//    genusOption.textContent = data.genus; // Texte affiché dans l'option
//    dropdown.appendChild(genusOption);

    // Masquer le dropdown par défaut
//    dropdown.style.display = 'none';

    // Ajouter un écouteur d'événements pour afficher le dropdown lorsque l'utilisateur clique sur l'élément sp
//    sp.addEventListener('click', function() {
        // Afficher le dropdown en changeant son style d'affichage de 'none' à 'block'
//        dropdown.style.display = 'block';
//    });

    // Ajouter un écouteur d'événements pour gérer le changement de sélection dans le dropdown
//    dropdown.addEventListener('change', function() {
//        var selectedGenus = dropdown.value; // Récupérer la valeur de l'option sélectionnée
//        console.log('Genre sélectionné :', selectedGenus);
        // Vous pouvez ajouter ici le code pour effectuer des actions en fonction du genre sélectionné
//    });

    // Ajouter le dropdown à l'élément parent spécifié
//    parentElement.appendChild(dropdown);
//}

// Exemple d'utilisation de la fonction
//var spElement = document.getElementById('species'); // Supposons que vous avez déjà récupéré l'élément sp
//var data = { genus: 'Genus1' }; // Exemple de données
//var parentElement = document.getElementById('container'); // L'élément parent dans lequel vous souhaitez ajouter le dropdown
//createDropdownFromData(spElement, data, parentElement);

// Créer un élément select pour le dropdow

//        var speciesCoords = {{ species_coords|safe }};

// comportement a effectuer sur l espece en javascript
// messageElt.innerHTML = '<div id="species"><span class="arrow">▼</span>' + sp + '</div>' + '<div id="genusContent" style="display: none;">Genus ' + data.genus + '</div>';
//document.body.appendChild(messageElt);
//document.body.appendChild(messageElt);

//document.addEventListener('DOMContentLoaded', function() {
//    var arrow = document.querySelector('#species .arrow');
//    var genusContent = document.getElementById('genusContent');

//    arrow.addEventListener('click', function() {
//        if (arrow.textContent === '▼') {
//            arrow.textContent = '▲';
//            genusContent.style.display = 'block';
//        } else {
//            arrow.textContent = '▼';
//            genusContent.style.display = 'none';
//        }
//    });
//});
// teste sur juste l'ecrit

// creation d'une fonction qui au clic sur un type genus la carte affiche la repartition du genre

// function card_genus(idspecies) {

    // Récupérer l'element au clique de l'element on essaiera d'ajouter un ecouteur
//        const genusContent = document.getElementById('genusContent');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
//        selectTribe.addEventListener('change', handleSelectOptionChange);

//     var idspecies = urlParams.get('ids');
//genusContent.addEventListener('click', async function() {
     
          
         // Enregistrer la valeur sélectionnée précédente dans la variable d'état
//            setSelectValue(value);

//           var idspecies = urlParams.get('ids');
     
//    fetch(`http://127.0.0.1:8000/${idspecies}/check-coords/`)
//        .then(response => response.json())
//        .then(data => {
       
//            var genusDistribution = data.distrib_gen;
            // Utilisez les données récupérées comme nécessaire
//            console.log("esceque je peux avoir les coords ", genusDistribution);
          
  // Initialisez la carte Leaflet
//    var map = L.map('map').setView([0, 0], 1);
//    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//        maxZoom: 19,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//    }).addTo(map);

     // test ecriture du genre dans la page
      //   var sp =  ""
//     genusDistribution.forEach(gendistr => {
//        var marker = L.marker([gendistr.latitude, gendistr.longitude]).addTo(map);
//        marker.bindPopup('Espèce: ' + gendistr.species_name).openPopup();
        // je garde le nom de l'espece
       //  sp = gendistr.espece ;
//    });

//    })
//        .catch(error => {
//            console.error('Error fetching species coordinates:', error);
//        });
//   });

// }         

//card_genus(idspecies);  
  //recuperation  specifique des noms et identifiant des genustribes


   // const genustribes = response.data.genustrib
 
//    messageElement.innerHTML ='<option value="dropdo">' + response.data.message + '</option>' ;
//    messageElement.innerHTML ='<option value="dropdo">' + '<ul>'+ nametribes.join(',')+'</ul>' + '</option>' ;


        // Initialiser la carte Leaflet
//        var map = L.map('map').setView([0, 0], 1);
//        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//            maxZoom: 19,
//            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//        }).addTo(map);

        // Itérer sur chaque paire de coordonnées et ajouter un marqueur à la carte
//        speciesCoords.forEach(coord => {
//            var latitude = coord.latitude;
//            var longitude = coord.longitude;
//            var espece = coord.espece;
            
            // Ajouter un marqueur aux coordonnées de la liste
//            L.marker([latitude, longitude]).addTo(map)
//                .bindPopup('Species: ' + espece + '<br>Coordinates: ' + latitude + ', ' + longitude)
//                .openPopup();
//        });

