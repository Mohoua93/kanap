// Déclaration de l'URL de l'API et récupération de l'élément HTML où les produits seront affichés
const url = "http://localhost:3000/api/products";
const container = document.getElementById("items");

// Fonction pour récupérer les articles depuis l'API
const getArticles = () => {
  // Appel à l'API avec fetch
  fetch(url)
    .then(function (res) {
      return res.json(); // Conversion de la réponse en JSON
    })
    .then(function (data) {
      // Une fois les données récupérées avec succès, itération à travers chaque produit
      for (const product of data) {
          
         // Création de l'élément HTML pour chaque produit et ajout au conteneur
          container.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
        //}
      }
    });
};

// Appel de la fonction pour récupérer et afficher les articles au chargement de la page
getArticles();
