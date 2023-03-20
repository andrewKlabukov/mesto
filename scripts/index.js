import { FormValidator, enableValidation } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenEdit = document.querySelector('.profile__edit-buton');
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');
const profileName = document.querySelector('.profile-desc__title');
const profileJob = document.querySelector('.profile-desc__intro');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const popupPlace = document.querySelector('.popup_type_place');
const popupOpenAdd = document.querySelector('.profile__add-button');
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');
const popupFormTitle = popupPlace.querySelector('.popup__input_type_title');
const popupFormLink = popupPlace.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_type_image');
const elementImage = document.querySelector('.popup__img');
const elementTitle = document.querySelector('.popup__name');
const popupCloseList = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.elements');


const createCard = (cardData) => {
  const card = new Card(cardData, '.template-card', handleCardClick);

  return card.generateCard();
};

const popupWithImage = new PopupWithImage();

popupWithImage.open();

const handleCardClick = (cardImage) => {
 popupWithImage.open();

  elementImage.src = cardImage.link;
  elementImage.alt = cardImage.alt;
  elementTitle.textContent = cardImage.name;
}

const cardSection = new Section({initialCards, renderer: renderCard}, '.elements');

function renderCard(card) {
  const newCard = createCard(card);
  cardSection.addItem(newCard);
}

function renderInitialCards(cards) {
  cardSection.renderItems(cards);
}

renderInitialCards(initialCards);

const popup = new Popup('.popup');

// initialCards.forEach((cardData) => {
//   cardsContainer.append(createCard(cardData));
// });

// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleEscClosePopup);
// };

// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');

//   document.removeEventListener('keydown', handleEscClosePopup);
// };

// const handleEscClosePopup = (evt) => {
//   if (evt.key === 'Escape') {
//     const popupClose = document.querySelector('.popup_opened');
//     closePopup(popupClose);
//   };
// };

popupOpenEdit.addEventListener('click', () => {
  popup.open();
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validationFormProfile.clearValidationForm();
});

popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  //closePopup(popupProfile);
  popup.close();
});

popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    //closePopup(popupClosestCross);
    popup.close()
  });
});

// popups.forEach((item) => {
//   item.addEventListener('click', (evt) => {
//     if (evt.target === evt.currentTarget) {
//       closePopup(item);
//     };
//   });
// });

popupOpenAdd.addEventListener('click', (evt) => {
  popup.open()
  // openPopup(popupPlace);
  // popupFormPlace.reset();
  // validationFormPlace.clearValidationForm();
});

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: popupFormTitle.value,
    link: popupFormLink.value,
  });

 
  closePopup(popupPlace);
});

// const renderCard = (card) => {
//   cardsContainer.prepend(createCard(card));
// };

const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};

const validationFormProfile = new FormValidator(enableValidation, popupFormProfile);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(enableValidation, popupFormPlace);
validationFormPlace.enableValidation();
