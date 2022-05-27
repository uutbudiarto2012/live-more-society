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
formSignup.addEventListener("submit", function () {
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
  //this.reset();

  //  simalasi redirect
  window.location.href = this.getAttribute("data-gotopage");
});
