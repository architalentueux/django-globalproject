import { xtrib } from './xtrib.js' ;
import { subform } from './subform.js' ;
import { direBonjour } from './test.js';
// Utilisez la fonction importée

//import React from 'https://unpkg.com/react@17/umd/react.development.js';
//import React, { useState } from '/node_modules/react/cjs/*';
//import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
//import axios from 'axios' ;
//const axios = require('axios');

//const { useState } = React ;
//function SelectComponent() {

//        const [selectValue, setSelectValue] = useState('');
        const handleOptionChange = (event) => {
            const value = event.target.value;
            console.log('Option sélectionnée :', value);
         // Enregistrer la valeur sélectionnée précédente dans la variable d'état
//            setSelectValue(value);
        
        axios.get('http://127.0.0.1:8000/check-item/', {params: { variable: value }})
//        axios.get('http://127.0.0.1:8000/post/acceuil/', {params: { variable: value }})
  .then(response => {
    
    const messageElement = document.getElementById('dropdown8');
    alert(response.data.message);
    alert( response.data.variable);
    //recuperation  specifique des noms et identifiant des subfamilydestribes
    const tribsubfamilies = response.data.tribsubfamly
//    const nametribes = tribsubfamilies.map(tribsubf => '<option value="drosuet">'+ tribsubf.nametribe +'</option>')
    const nametribes = tribsubfamilies.map(tribsubf => `<option value="${tribsubf.idtribe}">${tribsubf.nametribe}</option>`)
    messageElement.innerHTML = '<option value=0>------select------</option>';
//    messageElement.innerHTML ='<option value="dropdo">' + response.data.message + '</option>' ;
//    messageElement.innerHTML ='<option value="dropdo">' + '<ul>'+ nametribes.join(',')+'</ul>' + '</option>' ;
    messageElement.innerHTML += nametribes.join(',') ;
    messageElement.innerHTML += '<option value=0>------select------</option>';

    console.log(response.data);
    console.log('Option :', variable);
  })
  .catch(error => {
    console.error(error);
  });


        };

       // Récupérer l'élément select
        const selectElement = document.getElementById('dropdown1');
//        const selectTribe = document.getElementById('dropdown8');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
        selectElement.addEventListener('change', handleOptionChange);
   
//}
//axios.get('http://127.0.0.1:8000/post/acceuil/', { selectValue: value })
//  .then(response => {
//    console.log(response.data);
//    console.log('Option :', selectValue);
//  })
//  .catch(error => {
//    console.error(error);
//  });

//export default SelectComponent ;
direBonjour();
xtrib();

//subform();

       // Récupérer l'élément select
//const selectTribe = document.getElementById('dropdown8');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
//selectTribe.addEventListener('change', handleSelectOptionChange);


