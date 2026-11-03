
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

// Seleccionar el contenedor y la plantilla de tarjetas
const cardsContainer = document.querySelector(".cards__list");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Elementos para editar perfil
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

// Elementos para agregar tarjetas
const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardPopup.querySelector(".popup__close");

const addCardForm = addCardPopup.querySelector("#new-card-form");

const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);

const cardLinkInput = addCardPopup.querySelector(
  ".popup__input_type_url"
);

// Elementos para ampliar las imágenes
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imageCloseButton = imagePopup.querySelector(".popup__close");

// Abrir ventana emergente
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Cerrar ventana emergente
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Crear una tarjeta a partir de la plantilla
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

  // Botón Me gusta
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // Botón Eliminar tarjeta
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  // Abrir la imagen en una ventana emergente
  cardImage.addEventListener("click", function () {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;

    openModal(imagePopup);
  });

  return cardElement;
}

// Agregar una tarjeta al contenedor
function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

// Mostrar las tarjetas iniciales
initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
});

// Rellenar el formulario de editar perfil
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Abrir ventana de editar perfil
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

// Crear una nueva tarjeta
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsContainer);

  closeModal(addCardPopup);

  addCardForm.reset();
}

// Abrir la ventana de editar perfil
editButton.addEventListener("click", handleOpenEditModal);

// Cerrar la ventana de editar perfil
closeButton.addEventListener("click", function () {
  closeModal(editPopup);
});

// Guardar los cambios del perfil
formElement.addEventListener("submit", handleProfileFormSubmit);

// Abrir la ventana de agregar tarjeta
addButton.addEventListener("click", function () {
  openModal(addCardPopup);
});

// Cerrar la ventana de agregar tarjeta
addCardCloseButton.addEventListener("click", function () {
  closeModal(addCardPopup);
});

// Enviar el formulario de nueva tarjeta
addCardForm.addEventListener("submit", handleCardFormSubmit);

// Cerrar la ventana de imagen ampliada
imageCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

