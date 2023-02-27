//appel à l'Api avec fetch()
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();


//génération de la galerie
    function genererWork () {
          for (let i = 0; i < works.length; i++){
            //Selection de l'emplacement dans le html
            const sectionGallery = document.querySelector(".gallery");
            //Création du const pour récupérer les travaux
            const article = works[i];
            //Création de la figure
            let figureElement = document.createElement("figure");
            //SetAttribue pour attribuer les catégories correspondantes
            figureElement.setAttribute("data-category-id", works[i].category.id)
            //ajout d'une classe pour que ça ne prenne pas toutes les figures de la page
            figureElement.classList.add('projet');
            //Création de l'image
            let imgElement = document.createElement("img");
            imgElement.src = article.imageUrl;
            imgElement.crossOrigin = "anonymous";
            //Création du figcaption
            let titleElement = document.createElement("figcaption");
            titleElement.innerText = article.title;
            //Insertion des enfants dans les parents
            sectionGallery.appendChild(figureElement);
            figureElement.appendChild(imgElement);
            figureElement.appendChild(titleElement);
            
      }
    }



//génération du tableau de Catégories uniques
    function generateUniqueCategories(){
      let categoriesUniques = [];
      for ( let work of works){
        //Boucle pour récuper toutes les catégories de works puis .find pour les rendre unique
        const result = categoriesUniques.find(function(category){
          return category.id === work.category.id;
        });
        if(result === undefined){
          //Si le nom n'est pas déjà dans le tableau on y ajoute le nom de la catégorie
          categoriesUniques.push(work.category);
        }
      }
      return categoriesUniques;
    }


//génération des filtres
const categories = generateUniqueCategories();
const filterContainerTous = document.querySelector('.filter-btn');
//Génération du filtre Tous
let tousFilter = document.createElement('button');
tousFilter.innerText = 'Tous';
filterContainerTous.appendChild(tousFilter);
//Ajout de l'évent click affichant toutes les catégories
tousFilter.addEventListener('click', function() {
  const figures = document.querySelectorAll('figure');
  for (let figure of figures) {
    //Affiche tout les block catégories
    figure.style.display = 'block';
  }
});



//Génération des 3 filtres 
const filterContainer = document.querySelector('.filter-btn');

for (let category of categories) {
  //Création des boutons cat
  let filterButton = document.createElement('button');
  //Assignation des noms via catégory
  filterButton.innerText = category.name;
  filterButton.setAttribute('data-category-id', category.id);
  //event click filtrage
  filterButton.addEventListener('click', function() {
    const figures = document.querySelectorAll('.projet');
    for (let figure of figures) {
      //Affiche les éléments ayant la catégorie choisie, sinon les faits disparaitres
      if (figure.getAttribute('data-category-id') == category.id) {
        //affiche les blocks correspondant aux cat séléctionnées
        figure.style.display = 'block';
      } else {
        //enlève les autres qui n'ont pas les cat séléctionnées
        figure.style.display = 'none';
      }
    }
  });
  filterContainer.appendChild(filterButton);
}




//LOGIN
function showAdminModeElements() {
  const adminModeElements = document.querySelectorAll('#adminMode');
  adminModeElements.forEach(element => {
      element.style.display = 'flex';
  });
}
function cacheAdminModeElements() {
  const adminModeElements = document.querySelectorAll('#cacheMode');
  adminModeElements.forEach(element => {
      element.style.display = 'none';
  });
}
// Vérifiez si l'utilisateur est connecté
const token = sessionStorage.getItem('token');
if (token) {
  showAdminModeElements();
  cacheAdminModeElements();
}

//LOGOUT
//fonction pour faire réapparaitre et disparaitre les éléments
function showViewModeElements() {
  const adminModeElements = document.querySelectorAll('#adminMode');
  adminModeElements.forEach(element => {
      element.style.display = 'none';
  });
}
function cacheViewModeElements() {
  const adminModeElements = document.querySelectorAll('#cacheMode');
  adminModeElements.forEach(element => {
      element.style.display = 'flex';
  });
}
const logout = document.querySelector('.deconnexion');

logout.addEventListener('click',function(){
  sessionStorage.clear('token');
  showViewModeElements();
  cacheViewModeElements();
  });





//génération de la gallery du modal modif
function modalegallery(){
  for (let i = 0; i < works.length; i++){
  //Recupération des données pour les images
  const article = works[i];
  const modale = document.querySelector('.gallery-modal');
  let figureModale = document.createElement('figure');
  figureModale.classList.add ('figureEdit');
  let contenairImg = document.createElement('div');
  contenairImg.classList.add('containerImg')
  let imgModale = document.createElement('img');
  imgModale.src = article.imageUrl;
  imgModale.crossOrigin = "anonymous";
  const editImg = document.createElement('figcaption');
  editImg.innerText = 'éditer';
  //Ajout des icones et de leurs fonds
  const containerIconTrash = document.createElement('div');
  containerIconTrash.classList.add('containerIconTrash');
  containerIconTrash.setAttribute('data-id', article.id);
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa", "fa-trash-can");
  const containerIconCross = document.createElement('div');
  containerIconCross.classList.add('containerIconCross');
  const crossIcon = document.createElement("i");
  crossIcon.classList.add("fa", "fa-up-down-left-right");
  crossIcon.crossOrigin = 'anonymous';
  figureModale.appendChild(contenairImg);
  contenairImg.appendChild(containerIconTrash);
  contenairImg.appendChild(containerIconCross);
  containerIconTrash.appendChild(trashIcon);
  containerIconCross.appendChild(crossIcon);
  modale.appendChild(figureModale);
  contenairImg.append(imgModale);
  figureModale.append(editImg);








  containerIconTrash.addEventListener('click', function(event){
    event.preventDefault();
    const id = this.getAttribute('data-id'); // Récupération de l'identifiant de l'article
    fetch(`http://localhost:5678/api/works/${id}`, { // Utilisation de l'identifiant dans l'URL
      method : 'DELETE',
      headers:{
          "Content-Type":'application/json',
          "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if(response.ok){
        console.log("L'image a bien été supprimée");
      }
    })
    .catch(error => {
      console.error("Erreur lors de la suppression de l'image :", error);
    });
  });
  }
}
const supprGallery = document.querySelector('.supprGallery');

supprGallery.addEventListener('click', function() {
  const containersIconTrash = document.querySelectorAll('.containerIconTrash');
  containersIconTrash.forEach(containerIconTrash => {
    const id = containerIconTrash.getAttribute('data-id');
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(`L'article ${id} a bien été supprimé`);
      }
    })
    .catch(error => {
      console.error(`Erreur lors de la suppression de l'article ${id} :`, error);
    });
  });
});



















//ouverture de la modale
const openModale = document.querySelector('.modifButton');

openModale.addEventListener('click',function(event){
  event.preventDefault();
  const modaleModeElements = document.querySelectorAll('#modaleShow');
  modaleModeElements.forEach(element => {
      element.style.display = 'flex';
  });
})


//IF


//fermeture de la modale par la croix
const closeModale = document.querySelector('.fa-xmark');
closeModale.addEventListener('click',function(event){
  event.preventDefault();
  const modaleCloseElements = document.querySelectorAll('#modaleShow');
  modaleCloseElements.forEach(element => {
      element.style.display = 'none';
  });
});

//fermeture de la modale par clic en dehors
document.querySelector('.modale').addEventListener('click',function(){  
  const modaleCloseBlocElements = document.querySelectorAll('#modaleShow');
  modaleCloseBlocElements.forEach(element => {
      element.style.display = 'none';
});
  const blocPropa = document.querySelector('.modale-box');
  blocPropa.addEventListener('click', stopPropagation);
});
//Fonction pour faire en sorte que le clic sur le modal ne le ferme pas 
const stopPropagation = function(event){
  event.stopPropagation();
}




//AjoutPhoto

document.querySelector('.buttonAdd').addEventListener('click',function(){
  const modaleModeElements = document.querySelectorAll('#modaleShowAjout');
  modaleModeElements.forEach(element => {
      element.style.display = 'flex';
  });
})
document.querySelector('.modaleAjout').addEventListener('click',function(){
  const modaleCloseBlocElements = document.querySelectorAll('#modaleShowAjout');
  modaleCloseBlocElements.forEach(element => {
      element.style.display = 'none';
});
  const blocPropa = document.querySelector('.modale-box-ajout');
  blocPropa.addEventListener('click', stopPropagation);
});










//Générer les fonctions 
genererWork(works);
modalegallery(works);