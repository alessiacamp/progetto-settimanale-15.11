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

eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newProduct = new Product(nameInput.value, descriptionInput.value, brandInput.value, imgInput.value, priceInput.value);
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBlODhhZDEyOTAwMTU4NzZiZDQiLCJpYXQiOjE3MzE2NjI4MjQsImV4cCI6MTczMjg3MjQyNH0.ST43YFkErIiq3qeePcaJyMwKEBcR7AXMiOkXxwD1cSE",
      "Content-Type": "application/json",
    },
    method: "POST",
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
