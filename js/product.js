// Récupération de l'ID du produit depuis les paramètres de l'URL
const params = new URL(document.location).searchParams;
const id = params.get("id");

// Construction de l'URL pour récupérer les détails d'un produit spécifique depuis l'API
const url = `http://localhost:3000/api/products/${id}`;

// Fonction pour obtenir et afficher les détails d'un produit spécifique
const getArticle = () => {
  fetch(url)
    .then(function (res) {
      return res.json(); // Conversion de la réponse en JSON
    })
    .then(function (data) {
      // Mise à jour du DOM avec les détails du produit récupérés depuis l'API
      document.getElementById("title").innerHTML = data.name;
      document.getElementById("price").innerHTML = data.price;
      document.getElementById("description").innerHTML = data.description;

      // Ajout de l'image du produit
      const addImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(addImg);
      addImg.setAttribute("src", `${data.imageUrl}`);

      // Ajout des options de couleur du produit dans un menu déroulant
      const addOption = document.getElementById("colors");
      for (color in data.colors) {
        addOption.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`;
      }
    });
};

// Gestion de l'événement de clic sur le bouton "Ajouter au panier"
const btnAddToCart = document.getElementById("addToCart");

btnAddToCart.addEventListener("click", () => {
  // Récupération de la quantité et des options de couleur choisies par l'utilisateur
  const quantityInput = document.getElementById("quantity");
  const quantityValue = parseInt(quantityInput.value, 10);

  // Vérification si la quantité est valide (entre 0 et 100)
  if (quantityValue >= 0 && quantityValue <= 100) {
    // Création d'un objet représentant le produit à ajouter au panier
    const addProduct = {
      quantity: quantityValue,
      colors: document.getElementById("colors").value,
      id: id,
    };

    let addProductLocalStorage;

    // Gestion du stockage local pour sauvegarder les produits ajoutés au panier
    if (localStorage.getItem("addToCart") !== null) {
      addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
      addProductLocalStorage.push(addProduct);
      localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage));
    } else {
      addProductLocalStorage = [];
      addProductLocalStorage.push(addProduct);
      localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage));
    }
  } else {
    // Alerte si la quantité n'est pas valide
    alert("La quantité doit être comprise entre 0 et 100.");
  }
});

// Appel de la fonction pour récupérer et afficher les détails du produit au chargement de la page
getArticle();
