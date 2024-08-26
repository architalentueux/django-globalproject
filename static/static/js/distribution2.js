// Initialiser la carte Leaflet
        var map = L.map('map').setView([0, 0], 1);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        // Déclarer une variable pour stocker le marqueur
        var marker; // Écouter les clics sur les liens d'élève
        document.querySelectorAll('.distribution-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const distributionId = e.target.getAttribute('data-distribution-id');
                fetch(`http://127.0.0.1:8000/${distributionId}/check-coords/`)
                    .then(response => response.json())
                    .then(data => {
                        // Récupérer les coordonnées GPS de l'élève depuis la réponse JSON
                        const latitude = data.latitude;
                        const longitude = data.longitude;
                        
                        // Initialiser la carte Leaflet avec les coordonnées de l'élève
                       // var mymap = L.map('mapid').setView([latitude, longitude], 13);
                         map.setView([latitude, longitude], 13);
                       // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                       // maxZoom: 19,
                       // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                       // }).addTo(map);
                          
                        // Supprimer le marqueur précédent s'il existe
                        if (marker) {
                            marker.remove();
                        }
                        // Ajouter un marqueur pour l'emplacement de l'élève
                       marker = L.marker([latitude, longitude]).addTo(map)
                            .bindPopup('Emplacement de ' + e.target.textContent)
                            .openPopup();
                       map.setView([latitude, longitude], 13);
                    })
                    .catch(error => {
                        console.error('Error fetching coordinates:', error);
                    });
            });
        });
    
//var map = L.map('map').setView([51.505, -0.09], 13); //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
//{ // maxZoom: 19, // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
//}).addTo(map); //var marker = L.marker([51.5, -0.09]).addTo(map);
 var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047] ]).addTo(map); var popup = L.popup(); function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);
