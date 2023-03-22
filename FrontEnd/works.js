//-------------------------------------------------Récupération du token dans le localStorage------------------------------------------------
const token = localStorage.getItem('token')
if(token){
    //Application de la fonction adminModeElement si le token est présent
    adminModeElements();
}
//----------------------------------------------génération de la galerie---------------------------------------------------------------------
async function genererWork (){
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    for (let i = 0; i < works.length; i++){
    //Selection de l'emplacement dans le html
    const sectionGallery = document.querySelector(".gallery");
    //Création du const pour récupérer les travaux
    const article = works[i];
    //Création de la figure
    let figureElement = document.createElement("figure");
    //SetAttribue pour attribuer les catégories et id correspondants
        figureElement.setAttribute("data-category-id", works[i].category.id)
        figureElement.setAttribute('data-id', works[i].id)
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
//appel à la fonction pour générer la galerie ---------------------------------------------------------------------------------------------
genererWork();

//--------------------------------------------------Filtres------------------------------------------------------------------------
//génération du tableau de Catégories uniques
async function generateUniqueCategories(){
    // fetch sur l'api Categories pour récuperer les catégories et leurs Id 
    const reponse = await fetch("http://localhost:5678/api/categories");
    const catagories = await reponse.json();
    //Création du tableau de catégorie sans doublon grace à Set()
    let categoriesUniques = new Set(); 
    for ( let category of catagories){
      //Boucle pour récupérer toutes les catégories de works puis .add pour les ajouter à l'ensemble
        categoriesUniques.add(category);
    } console.log(categoriesUniques);
    return categoriesUniques;
}

//fonction pour créer les boutons de filtres associés aux catégories 
async function createFilterButtons(){
    //récupération de la fonction qui permet la création des catégories sans doublons 
    const categoriesUniques = await generateUniqueCategories();
    const filtersContainer = document.querySelector('.filter-btn');
    
    //Bouton "Toutes les catégories"
    const tousFilter = document.createElement('button');
    tousFilter.textContent = "Tous";
    filtersContainer.appendChild(tousFilter);
    //Ajout de l'évent click affichant toutes les catégories
tousFilter.addEventListener('click', function() {
    const figures = document.querySelectorAll('figure');
    for (let figure of figures) {
      //Affiche tout les block catégories
        figure.style.display = 'block';
    }})
    
    //Boutons pour chaque catégorie unique
    categoriesUniques.forEach(function(category){
        const button = document.createElement('button');
        button.innerText = category.name;
        button.setAttribute('data-category-id', category.id);
        filtersContainer.appendChild(button);
          //event click filtrage
    button.addEventListener('click', function() {
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
    });
    
}
//Ajout des filtres si pas en mode admin
if(!token){
createFilterButtons()}
//-----------------------------------------------------------LOGIN----------------------------------------
function adminModeElements(){
        const login = document.getElementById('login')
        login.remove()
        const logout = document.createElement('li')
        logout.innerText='logout'
        logout.id = 'logout'
        const ul = document.querySelector('ul');
        ul.appendChild(logout)
        const instaItem = document.getElementById('insta');
        ul.insertBefore(logout, instaItem)
         // Ajouter un event listener sur le bouton "logout"
    logout.addEventListener('click', function(){
        // Effacer le localStorage au clic sur "logout"
        localStorage.clear(); 
        window.location.href = 'index.html';
    });
        const adminBar = document.createElement('div');
        adminBar.classList.add('editMode');
        const header = document.getElementById('header');
        header.appendChild(adminBar);
        const iconBar = document.createElement('i');
        iconBar.classList.add('fa','fa-pen-to-square');
        adminBar.appendChild(iconBar);
        const editMode = document.createElement('p');
        editMode.innerText = 'Mode édition';
        adminBar.appendChild(editMode);
        const btnPublier = document.createElement('button');
        btnPublier.setAttribute('type', 'button');
        btnPublier.innerText = "publier les changements"
        adminBar.appendChild(btnPublier);
        const btnModifier = document.createElement('button');
        btnModifier.classList.add('modifButton');

        const h2portfolio = document.getElementById('h2Portfolio');
        h2portfolio.appendChild(btnModifier);
        const iconeMdf = document.createElement('i');
        iconeMdf.classList.add('fa','fa-pen-to-square');
        btnModifier.appendChild(iconeMdf);
        const txtMdf = document.createElement('p');
        txtMdf.innerText='Modifier';
        btnModifier.appendChild(txtMdf);
    btnModifier.addEventListener('click', genererModale)

        const btnModifierInactif = document.createElement('div');
        btnModifierInactif.classList.add('modif');
        const emplacementModif1 = document.querySelector('.Admin');
        emplacementModif1.appendChild(btnModifierInactif);
        const iconeMdfInactif = document.createElement('i');
        iconeMdfInactif.classList.add('fa','fa-pen-to-square');
        btnModifierInactif.appendChild(iconeMdfInactif);
        const txtMdfInactif = document.createElement('p');
        txtMdfInactif.innerText='Modifier';
        btnModifierInactif.appendChild(txtMdfInactif);

        const emplacementModif2 = document.querySelector('.admin2');
        const btnModifierInactif2 = document.createElement('div');
        btnModifierInactif2.classList.add('modif');
        emplacementModif2.appendChild(btnModifierInactif2);
        const iconeMdfInactif2 = document.createElement('i');
        iconeMdfInactif2.classList.add('fa','fa-pen-to-square');
        btnModifierInactif2.appendChild(iconeMdfInactif2);
        const txtMdfInactif2 = document.createElement('p');
        txtMdfInactif2.innerText='Modifier';
        btnModifierInactif2.appendChild(txtMdfInactif2);
        const h2Intro = document.getElementById('h2Intro')
        emplacementModif2.insertBefore(btnModifierInactif2, h2Intro)
    }
//-----------------------------------------------Ouverture de la modale--------------------------------------------------------------------
async function genererModale(){
    const backModale = document.createElement('aside');
    const emplModale = document.querySelector('body');
    emplModale.appendChild(backModale);
    backModale.classList.add('modale');
    const fenetreModale = document.createElement('div');
    backModale.appendChild(fenetreModale);
    fenetreModale.classList.add('modale-box');
    //Fermeture de la modale par clic sur le back
backModale.addEventListener('click', function(event) {
    if (event.target === backModale) {
        backModale.remove();
        }
    }
);
    const crossClose = document.createElement('i');
    crossClose.classList.add('fa','fa-xmark')
crossClose.addEventListener('click', function(event){
    event.preventDefault();
    backModale.remove();
});
    fenetreModale.appendChild(crossClose);
    const titleModale = document.createElement('p');
    titleModale.innerText = "Galerie photo";
    fenetreModale.appendChild(titleModale)
    const previewGallery = document.createElement('div');
    previewGallery.classList.add('gallery-modale');
    fenetreModale.appendChild(previewGallery);
    modalegallery();
const btnAjout = document.createElement('button');
    btnAjout.classList.add ('buttonAdd');
    btnAjout.innerText = 'Ajouter une photo'
    fenetreModale.appendChild(btnAjout);
//--------------------------------------Création de la modale Ajout----------------------------------------------
btnAjout.addEventListener('click', async function(event){
        event.preventDefault();
    const modaleBox = document.querySelector('.modale-box');
        modaleBox.remove();
    const fenetreModale = document.createElement('div');
        backModale.appendChild(fenetreModale);
        fenetreModale.classList.add('modale-box-ajout');
        const divIcon = document.createElement('div');
        divIcon.classList.add('icones');
        fenetreModale.appendChild(divIcon);
        const arrowIcon = document.createElement('i');
        arrowIcon.classList.add('fa','fa-arrow-left')
        divIcon.appendChild(arrowIcon)
        const crossClose = document.createElement('i');
        crossClose.classList.add('fa','fa-xmark');
        divIcon.appendChild(crossClose);
crossClose.addEventListener('click', function(event){
        event.preventDefault();
        backModale.remove();
    });
        const contenuModale = document.createElement('div');
        contenuModale.classList.add('modale-contenu');
        fenetreModale.appendChild(contenuModale);
        const titleModaleAjout = document.createElement('p');
        titleModaleAjout.innerText = 'Ajout photo';
        titleModaleAjout.classList.add ('ajouttitle');
        contenuModale.appendChild(titleModaleAjout);
//------------------------------------------Création du formulaire-----------------------------------

            const formAdd = document.createElement('form');
            formAdd.action = 'submit';
            formAdd.id = 'form-post';
            contenuModale.appendChild(formAdd);

            const previewImg = document.createElement('div');
            previewImg.classList.add('blocAjout');
            formAdd.appendChild(previewImg);

            const iconImg = document.createElement('i');
            iconImg.classList.add('fa', 'fa-image', 'fa-3x');
            previewImg.appendChild(iconImg);

            const inputFile = document.createElement('input');
            inputFile.type = 'file';
            inputFile.accept = '.png, .jpg';
            inputFile.size = '4000000'
            inputFile.id = 'input-file';
            inputFile.name = 'image';
            previewImg.appendChild(inputFile);
        // Ajouter un événement "change" à inputFile
inputFile.addEventListener('change', function() {
    // Vérifier que l'utilisateur a sélectionné un fichier
    if (inputFile.files && inputFile.files[0]) {
    //Création d'une instance  de FileReader pour lire le fichier en mode asynchrone
    const reader = new FileReader();
    // fonction de rappel  qui sera appelée lorsque le fichier aura chargé
    reader.onload = function(e) {
    // Créer une balise <img> et définir sa source
        const img = document.createElement('img');
        img.classList.add ('imgPreviewResult')
        img.src = e.target.result;
        previewImg.appendChild(img);
        btnFile.remove();
        condition.remove();
        iconImg.remove();
    };
    reader.readAsDataURL(inputFile.files[0]);
    }
});
            const btnFile = document.createElement('button');
            btnFile.id = 'files-button';
            btnFile.type = 'button';
            btnFile.innerText = '+ Ajout photo'
            previewImg.appendChild(btnFile)
            
            const condition = document.createElement('p');
            condition.classList.add('conditions');
            condition.innerText = 'jpg, png : 4mo max';
            previewImg.appendChild(condition);

            const divInput = document.createElement('div');
            divInput.classList.add('divInput');
            formAdd.appendChild(divInput)

            const labelTitle = document.createElement('label');
            labelTitle.innerHTML = 'Titre';
            labelTitle.setAttribute('for', 'Titre')
            divInput.appendChild(labelTitle);

            const inputTitle = document.createElement('input');
            inputTitle.type = 'text';
            inputTitle.id = 'title';
            inputTitle.name = 'title'
            divInput.appendChild(inputTitle);

            const labelCategorie = document.createElement('label');
            labelCategorie.innerHTML = 'Categorie';
            labelCategorie.setAttribute('for','Categorie');
            divInput.appendChild(labelCategorie);

            const iconSelect = document.createElement('i');
            iconSelect.classList.add('fa', 'fa-angle-down');
            divInput.appendChild(iconSelect);
            const selectCat = document.createElement('select');
            divInput.appendChild(selectCat)

        const reponse = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse.json();
            selectCat.id = "categorie";
            selectCat.name = "catagory"
            divInput.appendChild(selectCat)
            //Select des catégories + ""
        if (selectCat.options.length === 0) {
            //Ajout de l'option vide
            const emptyOption = document.createElement("option");
            emptyOption.value = "";
            emptyOption.textContent = "";
            selectCat.appendChild(emptyOption);
            //Pour chaque catégorie on associe son nom et son id pour créer les options du select
                categories.forEach((category) => {
            const option = document.createElement("option");
            option.textContent = category.name;
            option.setAttribute("data-id", category.id);
            option.id = 'option'
            selectCat.appendChild(option);
            });
            
        }   

            const submitBtn = document.createElement('button');
            submitBtn.innerText = 'Valider'
            submitBtn.type = 'submit'; 
            submitBtn.classList.add('btn-valider');
            submitBtn.id = 'postForm'
            formAdd.appendChild(submitBtn)
        if(fenetreModale){
            //fonction addProject à l'envois du formulaire
            formAdd.addEventListener('submit', addProjet);
        }
        //Vérification des champs remplis, si tous rempli le bouton valider passe au vert
        inputFile.addEventListener('change', checkInputs);
        inputTitle.addEventListener('change', checkInputs);
        selectCat.addEventListener('change', checkInputs);
function checkInputs() {
  // Vérifier si tous les éléments ont une valeur
    if (inputFile.value && inputTitle.value && selectCat.value) {
    // Changer la couleur du bouton Valider
        submitBtn.classList.add('green');
    } else {
        submitBtn.classList.remove('green');
    }
}
    });
            const btnSuppr = document.createElement('button');
            btnSuppr.classList.add ('supprGallery');
            btnSuppr.innerText = 'Supprimer la galerie'
            fenetreModale.appendChild(btnSuppr);
}
//--------------------------------------------------fonction qui permet l'affichage de la galerie Modale------------------------------------
async function modalegallery(){
    //Fetch pour faire en sorte que les projet s'ajoute dynamiquement à l'ouverture de la modale 
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
        const modale = document.querySelector('.gallery-modale');
    for (let i = 0; i < works.length; i++){
        //Recupération des données pour les images
        const article = works[i];
        let figureModale = document.createElement('figure');
        figureModale.classList.add ('figureModale');
        figureModale.setAttribute('data-id', works[i].id)
        let contenairImg = document.createElement('div');
        contenairImg.classList.add('containerImg')
        let imgModale = document.createElement('img');
        imgModale.classList.add('imgModale')
        imgModale.src = article.imageUrl;
        imgModale.crossOrigin = "anonymous";
        const editImg = document.createElement('figcaption');
        editImg.innerText = 'éditer';
        //Ajout des icones et de leurs fonds
        const containerIconTrash = document.createElement('div');
        containerIconTrash.classList.add('containerIconTrash');
        containerIconTrash.setAttribute('data-id', works[i].id);
        //Exécution de la fonction de suppression au clic sur la poubelle
    containerIconTrash.addEventListener('click', supprimerProjet);
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa", "fa-trash-can");
        const containerIconCross = document.createElement('div');
        containerIconCross.classList.add('containerIconCross');
        containerIconCross.setAttribute('data-id', works[i].id);
        // Ajouter un événement mouseenter à la figure pour afficher containerIconCross
figureModale.addEventListener('mouseenter', function() {
    containerIconCross.style.display = 'flex';
    });
  // Ajouter un événement mouseleave à la figure pour masquer containerIconCross
figureModale.addEventListener('mouseleave', function() {
    containerIconCross.style.display = 'none';
    });
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
    }}
//-----------------------------------------------------fonction pour la fermeture des modales après l'envoi-------------------------
function fermerModale() {
    const backModale = document.querySelector('.modale');
    if (backModale) {
    backModale.remove();
    }
}
// -----------------------------------fonction pour supprimer un projet-----------------------------------------
async function supprimerProjet(event) {
    event.preventDefault();
    // récupérer l'ID du projet à supprimer
    const id = this.getAttribute('data-id');
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        } 
        });
        if (response.ok) {
            console.log(response);
            console.log(`L'élément a été supprimé`);
        // si la requête a réussi, supprimer l'élément figure correspondant à ce projet de la page
        const figure = document.querySelector(`figure[data-id="${id}"]`);
            figure.remove();
        const figureModale = document.querySelector(`figure[data-id="${id}"].figureModale`)
            figureModale.remove();
        } else {
        alert('Erreur lors de la suppression du projet');
        }
    } catch (error) {
        console.error(error);
    }
    }
//------------------------------------Fin Suppr projet----------------------------------------------------------

//------------------------------------Fonction qui génére le visu du nouveau projet------------------------------
function genererFigure(article) {
    // Créer une nouvelle figure
    let figureElement = document.createElement("figure");
    figureElement.setAttribute("data-category-id", article.categoryId);
    figureElement.setAttribute("data-id", article.id);
    figureElement.classList.add("projet");
    // Créer une image pour la figure
    let imgElement = document.createElement("img");
    imgElement.src = article.imageUrl;
    imgElement.crossOrigin = "anonymous";
    figureElement.appendChild(imgElement);
    // Créer un titre pour la figure
    let titleElement = document.createElement("figcaption");
    titleElement.innerText = article.title;
    figureElement.appendChild(titleElement);
    // Ajouter la figure à la galerie
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(figureElement);
}
//--------------------------------------Ajout de projet---------------------------------------------------------
async function addProjet(event) {
        event.preventDefault();
        //Récupération des inputs
    const inputFile = document.getElementById('input-file');
    const inputTitle = document.getElementById('title'); 
    const selectCat = document.getElementById('categorie');
        // Vérification des champs obligatoires
        if (!inputFile.value) {
            alert('Veuillez sélectionner une image.');
            return;
        }
        if (!inputTitle.value) {
            alert('Veuillez entrer un titre.');
            return;
        }
    const formData = new FormData();
        formData.append('image', inputFile.files[0]);
        formData.append('title', inputTitle.value);
        formData.append('category', selectCat.options[selectCat.selectedIndex].dataset.id);
        try {
            const response = await fetch(`http://localhost:5678/api/works`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData, 
            });
            if (response.ok) {
                const newWork = await response.json();
                console.log(newWork);
                genererFigure(newWork);
                fermerModale();
                console.log(`L'image a bien été envoyée`);
            } else {
                console.log(response);
                console.log(`Erreur lors de l'ajout du projet`);
            }
        } catch (error) {
            console.error(error);
        }
    }

//----------------------------------------fin ajout ------------------------------------------------------
