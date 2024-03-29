
// icone svg
var svgValid='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2-circle" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>';
var svgSup='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
var svgRest='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/></svg>'

//tbody des tableau
const tableA = document.querySelector('#attente tbody');
const tableV = document.querySelector('#valider tbody');
const tableS = document.querySelector('#supprimer tbody');


//ajout icone
ajoutActions("attente",svgSup,svgValid);

//nombre de colones de données utilisées

var colDon=2;




S=document.querySelectorAll("#attente tbody td:nth-child(3) svg");
V=document.querySelectorAll("#attente tbody td:last-child svg");
R=document.querySelectorAll("#valider tbody td:last-child svg, #supprimer tbody td:last-child svg ");






// Gestion event si nous cliquons sur l'icone supprimer
S.forEach(function (e) {
  e.style.cursor = 'pointer';
  e.addEventListener('click', supEvent);
});

// gestion event si nous clickons sur l'icone valider
V.forEach((e)=>{
    e.style.cursor='pointer'
    e.addEventListener('click',validEvent);

})



// gestion event si nous clickons sur l'icone restaurer
/*
R.forEach((e)=>{
  e.style.cursor="pointer"
  e.addEventListener("click",(event)=>{
     

   var row = event.target.parentNode.parentNode;
   if (row.tagName != 'TR') {
     // si propagation sur la balise path in terieur de celle de svg
     row=row.parentNode
   }

   row.parentNode.removeChild(row);
   toadd=getFirstTDsContent(row,2);
   toappend=createTableRowWithHTMLString(toadd,svgRestaure);
   tableV.append(toappend);
  })
})
*/


var elementValide=[];
// Sélectionnez le formulaire
const form = document.querySelector('#fichierVal');

// Ajoutez un gestionnaire d'événement pour l'événement "submit" du formulaire
form.addEventListener('submit', handleSubmit, false);

// Fonction de gestion de l'événement "submit"
function handleSubmit(event) {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire

  const formData = new FormData(form); // Créez une instance de FormData

  const file = formData.get('EnsValidation'); // Obtenez le fichier chargé

  const reader = new FileReader();

  reader.onload = function(event) {
    const contents = event.target.result; // Obtenez le contenu du fichier sous forme de texte

    // Transformez le contenu en tableau
    const lines = contents.split('\n');
    const dataArray = lines.map(line => line.split(','));
    elementValide=dataArray;
    let rows=document.querySelectorAll("#attente tbody tr");
    rows.forEach((row)=>{
      var donne=row.querySelector("td:nth-child(2)");
      for(i of elementValide)
      {
        if(i.includes(donne.textContent))
        {
          var toadd = getFirstTDsContent(row, colDon);
          var toappend = createTableRowWithHTMLString(toadd, svgRest);
           tableV.append(toappend);
           var validIcon = document.querySelector('#valider tr:last-child td:last-child svg');
            validIcon.style.cursor = 'pointer';

            validIcon.addEventListener('click', function(el) {
            RestaureElement(el);});
           row.parentNode.removeChild(row);
           break;

        }
      }
    });

    console.log(dataArray); // Affichez le tableau résultant dans la console

  };

  reader.readAsText(file); // Lisez le contenu du fichier en tant que texte
  
}




