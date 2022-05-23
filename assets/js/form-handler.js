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

const business_name = form.querySelector('input[name="business_name"]');
const business_type = form.querySelector('input[name="business_type"]');
const address = form.querySelector('input[name="address"]');
const postal_code = form.querySelector('input[name="postal_code"]');
const name = form.querySelector('input[name="name"]');
const email = form.querySelector('input[name="email"]');
const phone = form.querySelector('input[name="phone"]');

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    (!business_name.value,
    !business_type.value,
    !address.value,
    !postal_code.value,
    !name.value,
    !email.value,
    !phone.value)
  ) {
    return;
  }
  const data = {
    business: business_name.value,
    contact_person: business_type.value,
    address: address.value,
    postal_code: postal_code.value,
    name: name.value,
    email: email.value,
    phone: phone.value,
  };

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
