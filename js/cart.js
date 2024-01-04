let productLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
let id = productLocalStorage[0].id;

const url = `http://localhost:3000/api/products/`;

const getArticles = () => {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data, "tout");

      showKanap(productLocalStorage, data);
      getSum(productLocalStorage, data);
      deleteButtons(productLocalStorage, data);
      modifTotalprice(productLocalStorage, data);
    });
};

function deleteButtons(productLocalStorage, data) {
  // Sélectionnez tous les éléments "Supprimer" de votre panier
  const deleteButtons = document.querySelectorAll(".deleteItem");

  // Parcourez chaque bouton et ajoutez un gestionnaire d'événements au clic
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      // Obtenez le conteneur parent de l'élément supprimé
      var cartItem = event.target.closest(".cart__item");

      // Supprimez l'élément du DOM et du LocalStorage
      if (cartItem) {
        let id = cartItem.dataset.id;
        let color = cartItem.dataset.color;
        console.log(productLocalStorage);
        let indexK = productLocalStorage.findIndex(
          (element) => element.id == id && element.colors == color
        );
        productLocalStorage.splice(indexK, 1);

        // Remettre productLocalStorage dans le le localStorage
        localStorage.setItem("addToCart", JSON.stringify(productLocalStorage));
        cartItem.remove();
      }
      getSum(productLocalStorage, data);
    });
  });
}

function showKanap(productLocalStorage, data) {
  let nodeArticle = "";

  productLocalStorage.forEach((product) => {
    let currentData = data.find((element) => element["_id"] == product.id);
    nodeArticle =
      nodeArticle +
      ` <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
    <div class="cart__item__img">
      <img src="${currentData.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${currentData.name}</h2>
        <p>${product.colors}</p>
        <p>${currentData.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity quantityInputs">
          <p>Qté : </p>
          <input type="number" class="itemQuantity quantityInputs" name="itemQuantity" min="1" max="100" value=${product.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;
  });

  document.getElementById("cart__items").innerHTML = nodeArticle;
}

function getSum(productLocalStorage, data) {
  let sum = 0;
  let totalQuantity = 0;

  productLocalStorage.forEach((product) => {
    let currentData = data.find((element) => element["_id"] == product.id);

    sum = sum + currentData.price * product.quantity;
    totalQuantity = parseInt(totalQuantity) + parseInt(product.quantity);
  });

  console.log(sum, "la somme");

  // Sélectionnez les éléments avec les IDs totalQuantity et totalPrice
  const totalQuantityElement = document.getElementById("totalQuantity");
  const totalPriceElement = document.getElementById("totalPrice");

  // Mettez à jour le contenu des éléments HTML avec les valeurs calculées
  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = sum; // Pour afficher le prix avec deux décimales
  console.log(productLocalStorage);
}

function modifTotalprice(productLocalStorage, data) {
  
  // Gestionnaire d'événements pour la modification de la quantité
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function (event) {
      event.preventDefault();

      if (event.target.value >= 0 && event.target.value <= 100)
      {

      
      const newQuantity = parseInt(event.target.value);
      const parentArticle = event.target.closest(".cart__item");
      const productId = parentArticle.dataset.id;
      const productColor = parentArticle.dataset.color;

      // Mettre à jour la quantité dans productLocalStorage
      const productIndex = productLocalStorage.findIndex(
        (p) => p.id === productId && p.colors === productColor
      );
      if (productIndex !== -1) {
        productLocalStorage[productIndex].quantity = newQuantity;
        localStorage.setItem("addToCart", JSON.stringify(productLocalStorage));
      }

      // Mettre à jour l'affichage du total
      getSum(productLocalStorage, data);
    }
    else 
    {
      alert('La quantité ne doit pas dépasser 100')
    }
    });
  });

  document.getElementById("cart__items").innerHTML = nodeArticle;
}

function deleteArrow(productLocalStorage, data) {
  // Sélectionnez tous les éléments "Supprimer" de votre panier
  const deleteArrow = document.querySelectorAll(".itemQuantity");

  // Parcourez chaque bouton et ajoutez un gestionnaire d'événements au clic
  deleteArrow.forEach(function (button) {
    button.addEventListener("click", function (event) {
      // Obtenez le conteneur parent de l'élément supprimé
      var cart__item__content__settings = event.target.closest(
        ".cart__item__content__settings"
      );

      // Supprimez l'élément du DOM et du LocalStorage
      if (cart__item__content__settings) {
        let id = cart__item__content__settings.dataset.id;
        let color = cart__item__content__settings.dataset.color;
        console.log(productLocalStorage);
        let indexK = productLocalStorage.findIndex(
          (element) => element.id == id && element.colors == color
        );
        productLocalStorage.splice(indexK, 1);

        // Remettre productLocalStorage dans le le localStorage
        localStorage.setItem("addToCart", JSON.stringify(productLocalStorage));
        cart__item__content__settings.remove();
      }
      getSum(productLocalStorage, data);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".cart__order__form");

  // Empêche l'envoi du formulaire par défaut
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    // Regex pour les noms (autorise lettres, espaces, apostrophes et accents)
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    const isValid = true;
    // Regex pour l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation des données avec les regex
    if (!nameRegex.test(firstName)) {
      document.getElementById("firstNameErrorMsg").textContent =
        "Veuillez saisir un prénom valide.";
        isValid = false;
    }

    if (!nameRegex.test(lastName)) {
      document.getElementById("lastNameErrorMsg").textContent =
        "Veuillez saisir un nom valide.";
        isValid =false;
    }

    if (address === "") {
      document.getElementById("addressErrorMsg").textContent =
        "Veuillez saisir votre adresse.";
        isValid = false;
    }

    if (!nameRegex.test(city)) {
      document.getElementById("cityErrorMsg").textContent =
        "Veuillez saisir une ville valide.";
        isValid = false;
    }

    if (!emailRegex.test(email)) {
      document.getElementById("emailErrorMsg").textContent =
        "Veuillez saisir une adresse e-mail valide.";
        isValid = false;
    }

    // Si toutes les données sont valides, effectuez la redirection vers la page de confirmation

    if (
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      address !== "" &&
      nameRegex.test(city) &&
      emailRegex.test(email)
    ) {
    }

    // Récupérer les IDs des produits de productLocalStorage
    const products = productLocalStorage.map((product) => product.id);

    // Endpoint pour la requête POST
    const postURL = "http://localhost:3000/api/products/order";

    //Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,lastName, address, city et email
    const contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    // Données à envoyer dans la requête POST
    const postData = {
      contact: contact,
      products: products,
    };
    console.log(postData);

    // Configuration de la requête POST
    const postRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    // Effectuer la requête POST
    fetch(postURL, postRequestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(" Erreur response was not ok.");
      })
      .then((data) => {
        console.log("Réponse de la requête POST :", data);
        if(isValid){
          window.location.href = "confirmation.html?id=" + data.orderId;
        }
      
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
      });
  });
});

getArticles();


//Même avec des erreurs dans le formulaire effectue quand même la redirection vers la page confirmatiion

//J'ai la possibilité de mettre plus de 100 articles en passant directement par le panier
//Je ne retrouve plus tout mes commits que j'ai fait