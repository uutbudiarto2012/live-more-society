(function () {
  "use strict";
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var formSignup = document.querySelector("#form-signup");
  formSignup.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        form.classList.remove("form-valid");
        event.preventDefault();
        event.stopPropagation();
      } else {
        form.classList.add("form-valid");
        submitData(formSignup);
      }
      form.classList.add("was-validated");
    },
    false
  );
})();

const formSignup = document.querySelector("#form-signup");
formSignup.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    console.log("INVALID FORM");
    return;
  }

  const input = this.querySelectorAll(".input-wrapper .form-control");
  const data = [];
  input.forEach((itemInput) => {
    const keyData = itemInput.getAttribute("name");
    const valData = itemInput.value;
    const item = { [keyData]: valData };
    data.push(item);
  });

  const dataToSubmit = Object.assign({}, ...data);
  console.log(dataToSubmit);
  console.log(this.getAttribute("data-gotopage"));

  // fetch

  fetch("https://dbslivemoresociety.com/digibanking", {
    method: "POST",
    body: JSON.stringify(dataToSubmit),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      $("#btnSubmit").removeAttr("disabled");
      return Promise.reject(response);
    })
    .then(function (data) {
      $("#btnSubmit").removeAttr("disabled");
      console.log(data);
    })
    .catch(function (error) {
      $("#btnSubmit").removeAttr("disabled");
      console.warn("Something went wrong.", error);
    });
  redirectPage(this);

  //  simalasi redirect
  //   window.location.href = this.getAttribute("data-gotopage");
});

const redirectPage = (form) => {
  window.location.href = form.getAttribute("data-gotopage");
  //   $("#form-signup").get(0).reset();
  //   $("#form-signup").removeClass("was-validated");
};
