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
          //Si le nom est undefined on y ajoute le nom de la catégorie
          categoriesUniques.push(work.category);
        }
      }
      return categoriesUniques;
    }

//"TOUS"=["Objets","Appartements","Hôtels & Restaurants"]

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
const token = localStorage.getItem('token');
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
  localStorage.clear('token');
  showViewModeElements();
  cacheViewModeElements();
  });



//appel à la fonction pour générer la galerie
//générer les fonctions en bas
genererWork(works);
