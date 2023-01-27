// Création des buttons 

const fetchPromiseCat = fetch('http://localhost:5678/api/categories')
  .then(reponse => reponse.json())
  .then((data) => {
    categories=data;
    genererButton(categories);
    console.log(categories);
  })
  .catch(error => {
    console.error(`Impossible de recuperer les categories: ${error}`)
    })
  
function genererButton(categories){
    const divButton = document.querySelector(".buttons");
    const Tous= new Set(categories);
    const buttonTous = document.createElement('button');
    buttonTous.innerText="Tous";
    console.log(Tous);
    divButton.appendChild(buttonTous)
  for (let i=0; i<categories.length;i++){
    const article = categories[i];
    const button= document.createElement('button');
    button.innerText = article.name;
    divButton.appendChild(button)
  }
}
//Filtres



//Création de la galerie
const fetchPromise = fetch('http://localhost:5678/api/works')
      .then(reponse => reponse.json())
      .then((data) => {
        projet=data;
        genererWorks(projet);//Mettre la fonction dans le then pour que ça marche
        console.log(projet);
      })
      .catch(error => {
        console.error(`Impossible de récupérer les produits : ${error}`);
      });
      
function genererWorks(projet){
        for (let i=0; i<projet.length; i++){
        const sectionGallery = document.querySelector('.gallery');
        const article = projet[i]
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        imgElement.src = article.imageUrl;
        imgElement.crossOrigin = "anonymous";
        const titleElement = document.createElement('figcaption');
        titleElement.innerText = article.title;
        sectionGallery.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(titleElement)
}}

