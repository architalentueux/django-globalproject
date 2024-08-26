
// Initialiser la carte Leaflet
        var map = L.map('map').setView([51.505, -0.09], 13);
//        var map = L.map('map').setView([0, 0], 1);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        var marker = L.marker([51.5, -0.09]).addTo(map);
 // Récupérer les coordonnées de l'id
        const urlParams = new URLSearchParams(window.location.search);
        const idspecies = parseFloat(urlParams.get('ids'));
//          console.log('idspecies', idspecies)

//       const idspecies = 2


                fetch(`http://127.0.0.1:8000/${idspecies}/check-coords/`)
                 .then(response => response.json())
    .then(data => {
        // Itérer sur chaque coordonnée et ajouter un marqueur à la carte
        data.forEach(coord => {
            var marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
            // Ajouter un popup contenant le nom de l'espèce
            marker.bindPopup('<b>' + coord.espece + '</b>').openPopup();
        });
    })
    .catch(error => {
        console.error('Error fetching coordinates:', error);
    });
//fetch(`http://127.0.0.1:8000/${idspecies}/check-coords/`)
 // Récupérer les coordonnées des espèces à partir du contexte Django
//        var speciesCoords = {{ species_coords|safe }};
//         console.log(speciesCoords);
        // Itérer sur chaque coordonnée et ajouter un marqueur à la carte
//        speciesCoords.forEach(coord => {
//            var marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
            // Ajouter un popup contenant le nom de l'espèce
//            marker.bindPopup('<b>' + coord.espece + '</b>').openPopup();
//        });
 


var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString() + idspecies +coord.espece)
        .openOn(map);
}

map.on('click', onMapClick);
