class Product {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imgUrl;
    this.price = _price;
  }
}
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imgInput = document.getElementById("img");
const priceInput = document.getElementById("price");

const btnsubmit = document.getElementById("btnsubmit");
const eventForm = document.getElementById("event-form");

const modal = new bootstrap.Modal(document.getElementById("staticBackdrop1"));
const errormodal = new bootstrap.Modal(document.getElementById("staticBackdrop2"));
const id = new URLSearchParams(location.search).get("id");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;

fetch(URL, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBlODhhZDEyOTAwMTU4NzZiZDQiLCJpYXQiOjE3MzE2NjI4MjQsImV4cCI6MTczMjg3MjQyNH0.ST43YFkErIiq3qeePcaJyMwKEBcR7AXMiOkXxwD1cSE",

    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("errore nel recupero del singolo prodotto");
    }
  })
  .then((product) => {
    nameInput.value = product.name;
    descriptionInput.value = product.description;
    brandInput.value = product.brand;
    imgInput.value = product.imageUrl;
    priceInput.value = product.price;
  })
  .catch((err) => {
    console.log(err);
  });

eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newProduct = new Product(nameInput.value, descriptionInput.value, brandInput.value, imgInput.value, priceInput.value);
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBlODhhZDEyOTAwMTU4NzZiZDQiLCJpYXQiOjE3MzE2NjI4MjQsImV4cCI6MTczMjg3MjQyNH0.ST43YFkErIiq3qeePcaJyMwKEBcR7AXMiOkXxwD1cSE",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (response.ok) {
        modal.show();
      } else {
        errormodal.show();
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});

function reset() {
  nameInput.value = "";
  descriptionInput.value = "";
  brandInput.value = "";
  imgInput.value = "";
  priceInput.value = "";
}
