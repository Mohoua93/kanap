const params = new URL(document.location).searchParams;
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

const getArticle = () => {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const addTitle = (document.getElementById("title").innerHTML = data.name);
      const addPrice = (document.getElementById("price").innerHTML =
        data.price);
      const addDescription = (document.getElementById("description").innerHTML =
        data.description);
      const addImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(addImg);
      addImg.setAttribute("src", `${data.imageUrl}`);
      const addOption = document.getElementById("colors");
      for (color in data.colors) {
        addOption.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`;
      }
    });
};

const btnAddToCart = document.getElementById("addToCart");

btnAddToCart.addEventListener("click", () => {
  const quantityInput = document.getElementById("quantity");
  const quantityValue = parseInt(quantityInput.value, 10);

  if (quantityValue >= 0 && quantityValue <= 100) {
    const addProduct = {
      quantity: quantityValue,
      colors: document.getElementById("colors").value,
      id: id,
    };

    let addProductLocalStorage;

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
    alert("La quantité doit être comprise entre 0 et 100.");
  }
});

getArticle();
