(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          form.classList.remove("form-valid");
          event.preventDefault();
          event.stopPropagation();
        } else {
          form.classList.add("form-valid");
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// GET ALL INPUT FORM

const form = document.querySelector("#form-ibg");
const myModal = document.querySelector(".modal");

const name = form.querySelector('input[name="name"]');
const hp = form.querySelector('input[name="hp"]');
const email = form.querySelector('input[name="email"]');
const instagram = form.querySelector('input[name="instagram"]');

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if ((!name.value, !hp.value, !email.value, !instagram.value)) {
    return;
  }
  const data = { name, hp, email, instagram };

  $("#btnRegister").attr("disabled");
  fetch("https://dbslivemoresociety.com/digibanking", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      $("#btnRegister").removeAttr("disabled");
      return Promise.reject(response);
    })
    .then(function (data) {
      $(".modal").modal("hide");
      $("#btnRegister").removeAttr("disabled");
      console.log(data);
    })
    .catch(function (error) {
      $(".modal").modal("hide");
      $("#btnRegister").removeAttr("disabled");
      console.warn("Something went wrong.", error);
    });
  clearForm();
});

const clearForm = () => {
  $("#form-ibg").get(0).reset();
  $("#form-ibg").removeClass("was-validated");
};
