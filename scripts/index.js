const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

initialCards.forEach(function (card) {
  console.log(card.name);
});


const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(".popup__input_type_description");

const formElement = editPopup.querySelector("#edit-profile-form");

// Abrir ventana emergente
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Cerrar ventana emergente
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Rellenar el formulario con los datos actuales
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Rellenar los campos y abrir la ventana
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

// Guardar los cambios del perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// Evento para abrir la ventana
editButton.addEventListener("click", handleOpenEditModal);

// Evento para cerrar con la X
closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

// Evento para guardar los cambios
formElement.addEventListener("submit", handleProfileFormSubmit);
