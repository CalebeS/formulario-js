let validadorForm = {
  handleSubmit: (event) => {
    event.preventDefault();
    let send = true;
    let inputs = form.querySelectorAll("input");
    validadorForm.clearError();
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = validadorForm.checkInput(input);
      if (check !== true) {
        send = false;
        validadorForm.showError(input, check);
      }
    }
    if (send) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");
    if (rules !== null) {
      rules = rules.split("|");
      for (let k in rules) {
        let regraDetails = rules[k].split("=");
        switch (regraDetails[0]) {
          case "required":
            if (input.value == "") {
              return "Preencha este campo";
            }
            break;
          case "min":
            if (input.value.length < regraDetails[1]) {
              return (
                "Campo precisa ter pelo menos " +
                regraDetails[1] +
                " caracteres"
              );
            }
            break;
          case "email":
            if (input.value != "") {
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return "Digite um e-mail válido";
              }
            }
            break;
        }
      }
    }
    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = "#FF0000";
    let errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.innerHTML = error;
    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearError: () => {
    let inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = "";
    }
    let errorElements = document.querySelectorAll(".error");
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
};

let form = document.querySelector(".validador");
form.addEventListener("submit", validadorForm.handleSubmit);
