
import {
  enableValidation,
  resetValidation
} from "./validate.js";

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

// -------------------------------------
// ELEMENTOS DEL DOM
// -------------------------------------

const cardsContainer = document.querySelector(".cards__list");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Editar perfil
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description"
);

const formElement = editPopup.querySelector("#edit-profile-form");

// Agregar tarjetas
const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");

const addCardCloseButton = addCardPopup.querySelector(
  ".popup__close"
);

const addCardForm = addCardPopup.querySelector("#new-card-form");

const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);

const cardLinkInput = addCardPopup.querySelector(
  ".popup__input_type_url"
);

// Ampliar imágenes
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const imageCloseButton = imagePopup.querySelector(
  ".popup__close"
);

// -------------------------------------
// VENTANAS EMERGENTES
// -------------------------------------

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscClose);

  const form = modal.querySelector(".popup__form");

  if (form) {
    resetValidation(form);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// -------------------------------------
// CREAR TARJETAS
// -------------------------------------

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Me gusta
  const likeButton = cardElement.querySelector(
    ".card__like-button"
  );

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle(
      "card__like-button_is-active"
    );
  });

  // Eliminar tarjeta
  const deleteButton = cardElement.querySelector(
    ".card__delete-button"
  );

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  // Ampliar imagen
  cardImage.addEventListener("click", function () {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;

    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);

  container.prepend(cardElement);
}

// Mostrar tarjetas iniciales
initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
});

// -------------------------------------
// EDITAR PERFIL
// -------------------------------------

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();

  resetValidation(formElement);

  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (!formElement.checkValidity()) {
    return;
  }

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// -------------------------------------
// AGREGAR NUEVA TARJETA
// -------------------------------------

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  if (!addCardForm.checkValidity()) {
    return;
  }

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsContainer);

  addCardForm.reset();

  closeModal(addCardPopup);
}

// -------------------------------------
// EVENTOS
// -------------------------------------

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

formElement.addEventListener(
  "submit",
  handleProfileFormSubmit
);

addButton.addEventListener("click", function () {
  resetValidation(addCardForm);
  openModal(addCardPopup);
});

addCardCloseButton.addEventListener("click", function () {
  closeModal(addCardPopup);
});

addCardForm.addEventListener(
  "submit",
  handleCardFormSubmit
);

imageCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

// Cerrar al hacer clic en la superposición
editPopup.addEventListener("click", handleOverlayClick);
addCardPopup.addEventListener("click", handleOverlayClick);
imagePopup.addEventListener("click", handleOverlayClick);

// Activar validación de formularios
enableValidation();
