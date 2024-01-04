//Création du nouvel objet URL à partir de l'URL actuelle de la page.
const params = new URL(document.location).searchParams;

// Extraction de la valeur du paramètre de requête de l'URL.
const id = params.get("id");

//Mise à jour le contenu de l'élément HTML avec l'ID récupéré du paramètre dans l'URL.
document.getElementById("orderId").textContent = id;
