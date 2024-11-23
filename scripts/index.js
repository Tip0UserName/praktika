const template = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const openEditButton = document.querySelector('.profile__edit-button');
const closeProfilButton = profilePopup.querySelector('.popup__close');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardForm = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupElement = imagePopup.querySelector('.popup__image');
const captionPopupElement = imagePopup.querySelector('.popup__caption');
const imageCloseButton = imagePopup.querySelector('.popup__close');


document.addEventListener('DOMContentLoaded', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function createCard(data) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const [cardImage, cardTitle, likeButton, deleteButton] = [
    cardElement.querySelector('.card__image'),
    cardElement.querySelector('.card__title'),
    cardElement.querySelector('.card__like-button'),
    cardElement.querySelector('.card__delete-button'),
  ];

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    imagePopupElement.src = data.link;
    imagePopupElement.alt = data.name;
    captionPopupElement.textContent = data.name;
    openModal(imagePopup);
  });

  return cardElement;
}


function rendersCards(cards) {
  const fragment = document.createDocumentFragment();
  cards.forEach(cardData => fragment.append(createCard(cardData)));
  placesList.append(fragment);
}

openEditButton.addEventListener('click', () => {
  profileInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const card = createCard(cardData);
  placesList.prepend(card);
}


profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  cardForm.reset(); 
  openModal(cardPopup);
});

closeCardButton.addEventListener('click', () => closeModal(cardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));

function handleCardFormSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  placesList.prepend(createCard(cardData));
  closeModal(cardPopup);
}


cardForm.addEventListener('submit', handleCardFormSubmit);

rendersCards(initialCards);