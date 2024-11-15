const addressBarParameters = new URLSearchParams(location.search);
const id = addressBarParameters.get("id");
const riga = document.getElementById("riga");
const errormodal = new bootstrap.Modal(document.getElementById("staticBackdrop3"));
function viewProduct() {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBlODhhZDEyOTAwMTU4NzZiZDQiLCJpYXQiOjE3MzE2NjI4MjQsImV4cCI6MTczMjg3MjQyNH0.ST43YFkErIiq3qeePcaJyMwKEBcR7AXMiOkXxwD1cSE",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata, response non OK");
      }
    })
    .then((element) => {
      const colonna = `<div class="col-12 mb-5">
        <div class="card h-100">
          <img class="card-img-top" src="${element.imageUrl}" alt="..." />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${element.name}</h5>
                          <h6>${element.description}</h6>
  <h6>${element.brand}</h6>
  
              <div class="d-flex justify-content-center small text-warning mb-2">
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
              </div>
              € ${element.price}
            </div>
          </div>


         <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button class="btn btn-outline-dark mt-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button></div>
                            </div>
        </div>
      </div>`;
      riga.innerHTML = riga.innerHTML + colonna;
    });
}
viewProduct();
const deleteEvent = function () {
  const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
  fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBlODhhZDEyOTAwMTU4NzZiZDQiLCJpYXQiOjE3MzE2NjI4MjQsImV4cCI6MTczMjg3MjQyNH0.ST43YFkErIiq3qeePcaJyMwKEBcR7AXMiOkXxwD1cSE",

      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        errormodal.show();
      } else {
        throw new Error("Problema nell'eliminazione");
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

function goHome() {
  location.assign("homepage.html");
}
