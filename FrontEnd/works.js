const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//génération de la galerie
    function genererWork () {
          for (let i = 0; i < works.length; i++) {
            //Selection de l'emplacement dans le html
            const sectionGallery = document.querySelector(".gallery");
            const article = works[i];
            //Création de la figure
            let figureElement = document.createElement("figure");
            figureElement.setAttribute("data-category-id", works[i].category.id)
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
//appel à la fonction pour générer la galerie
genererWork(works);


//génération du tableau de Catégories uniques
    function generateUniqueCategories(){
      let categoriesUniques = [];
      for ( let work of works){
        const result = categoriesUniques.find(function(category){
          return category.id === work.category.id;
        });
        if(result === undefined){
          categoriesUniques.push(work.category);
        }
        
      }
      return categoriesUniques;
    }


//génération des filtres
const categories = generateUniqueCategories();
const filterContainerTous = document.querySelector('.filter-btn');
//Génération du filtre Tous
let allCategoriesFilter = document.createElement('button');
allCategoriesFilter.innerText = 'Tous';
filterContainerTous.appendChild(allCategoriesFilter);
//Ajout de l'évent click affichant toutes les catégories
allCategoriesFilter.addEventListener('click', function() {
  const figures = document.querySelectorAll('figure');
  for (let figure of figures) {
    //Affiche tout les block catégories
    figure.style.display = 'block';
  }
});
//Génération des 3 filtres 
const filterContainer = document.querySelector('.filter-btn');
for (let category of categories) {

  let filterButton = document.createElement('button');
  filterButton.innerText = category.name;
  filterButton.setAttribute('data-category-id', category.id);
  filterButton.addEventListener('click', function() {
    const figures = document.querySelectorAll('.projet');
    for (let figure of figures) {
      //Affiche les éléments ayant la catégorie choisie, sinon les faits disparaitres
      if (figure.getAttribute('data-category-id') == category.id) {
        figure.style.display = 'block';
      } else {
        figure.style.display = 'none';
      }
    }
  });
  filterContainer.appendChild(filterButton);
}




