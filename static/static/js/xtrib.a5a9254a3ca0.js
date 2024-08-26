export function xtrib() {
   
    // Récupérer l'élément select
        const selectTribe = document.getElementById('dropdown8');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
//        selectTribe.addEventListener('change', handleSelectOptionChange);
     
     const handleSelectOptionChange = (event) => {
            const value = event.target.value;
            console.log('Option sélectionnée :', value);
         // Enregistrer la valeur sélectionnée précédente dans la variable d'état
//            setSelectValue(value);
        
        axios.get('http://127.0.0.1:8000/check-item/', {params: { tribselect: value }})
//        axios.get('http://127.0.0.1:8000/post/acceuil/', {params: { variable: value }})
  .then(response => {
    
    const messageElement = document.getElementById('genus');
    alert(response.data.tribmessage);
    alert( response.data.tribselect);
    //recuperation  specifique des noms et identifiant des genustribes
  
  
    const genustribes = response.data.genustrib
    const namegenus = genustribes.map(genustr => `<option value="${genustr.idgenus}">${genustr.namegenus}</option>`)

//    messageElement.innerHTML ='<option value="dropdo">' + response.data.message + '</option>' ;
//    messageElement.innerHTML ='<option value="dropdo">' + '<ul>'+ nametribes.join(',')+'</ul>' + '</option>' ;

    messageElement.innerHTML = '<option value=0>------select------</option>';
    messageElement.innerHTML += namegenus.join(',') ;
    console.log(response.data);
    console.log('Option :', tribselect);
  })
  .catch(error => {
    console.error(error);
  });


        };

       // Récupérer l'élément select
//        const selectTribe = document.getElementById('dropdown8');
        // Ajouter un écouteur d'événements pour gérer les clics sur les options
        selectTribe.addEventListener('change', handleSelectOptionChange);
  

}
//export default SelectComponent ;

