  const messageElt = document.getElementById('gen');
 // Récupérer les coordonnées de la liste passées depuis la vue Django
       // Utilisez AJAX pour récupérer les données JSON de la vue Django
    const urlParams = new URLSearchParams(window.location.search);
    const idspecies = urlParams.get('ids');
         console.log("peux t-on dire les ids ce sont chargés",idspecies);
// axios.get('http://127.0.0.1:8000/' + idspecies + '/check-coords/')
//const axios = require('axios'); // Assurez-vous que vous avez installé Axios via npm ou yarn

const url = `http://127.0.0.1:8000/${idspecies}/check-coords/`;
console.log(url);
var sp = ""
//axios.get('http://127.0.0.1:8000/check-coords/', {params: { idspecies: idspecies }})
//const url = `http://127.0.0.1:8000/${idspecies}/check-coords/`;
//const url = 'http://127.0.0.1:8000/${idspecies}/check-coords/';  
  fetch(url)
//        axios.get(url)
        .then(response => {
//         alert("echo test");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            console.log("peux t-on dire les ids ce sont chargés",idspecies);
            var speciesCoords = data.species_coords;
            // Utilisez les données récupérées comme nécessaire
            console.log("esceque je peux avoir les coords ", speciesCoords);
             console.log("esceque je peux avoir les coords ", data.message);
             
  var  map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Parcourir les coordonnées et ajouter un marqueur pour chaque espèce
    speciesCoords.forEach(coord => {
       var marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
        marker.bindPopup('Species: ' + coord.espece + "<br>Country: " + coord.country + "<br>Collector: " + coord.collector  + "<br>Collector Number: " + coord.collector_num).openPopup();
        // je garde le nom de l'espece
       sp = coord.espece ;
    });
       
 
    messageElt.innerHTML = '<div id="dropdown" class="dropdown"> <button class="dropdown-btn" id="spLink">▼' + sp + '</button><div class="dropdown-content"><a href="#" id="genusLink">Genus: ' + data.genus + '</a></div></div>' ;
    
//     var genusLink = document.getElementById('genusLink');
    // var spLink = document.getElementById('spLink');
//     console.log(genusLink);

      })
        .catch(error => {
            console.error('Error fetching species coordinates:', error);
        });

console.log("es ce que ca marche");

