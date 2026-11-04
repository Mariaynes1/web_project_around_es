
function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  input.classList.add("popup__input_type_error");
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(function (input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputs, button) {
  const isInvalid = hasInvalidInput(inputs);

  button.disabled = isInvalid;

  button.classList.toggle(
    "popup__button_disabled",
    isInvalid
  );
}

// Agregar los eventos de validación a cada formulario
function setEventListeners(form) {
  const inputs = Array.from(
    form.querySelectorAll(".popup__input")
  );

  const button = form.querySelector(".popup__button");

  toggleButtonState(inputs, button);

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
}

// Activar la validación en todos los formularios
function enableValidation() {
  const forms = document.querySelectorAll(".popup__form");

  forms.forEach(function (form) {
    setEventListeners(form);
  });
}

// Restablecer los mensajes y el botón
function resetValidation(form) {
  const inputs = Array.from(
    form.querySelectorAll(".popup__input")
  );

  const button = form.querySelector(".popup__button");

  inputs.forEach(function (input) {
    hideInputError(form, input);
  });

  toggleButtonState(inputs, button);
}

export {
  enableValidation,
  resetValidation
};
