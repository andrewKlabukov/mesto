import './index.css';
import { FormValidator, enableValidation } from '../scripts/FormValidator.js';
import { Card } from '../scripts/Card.js';
import { initialCards } from '../scripts/constants.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo';

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenEdit = document.querySelector('.profile__edit-buton');
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const popupPlace = document.querySelector('.popup_type_place');
const popupOpenAdd = document.querySelector('.profile__add-button');
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');
const popupCloseList = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');


// Создание новой карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '.template-card', handleCardClick);

  return card.generateCard();
};

// Модальное окно Изображение
const popupWithImage = new PopupWithImage('.popup_type_image');

// Вешаем слушатели на модальное окно Изображения
popupWithImage.setEventListeners()

// Клик на карточку
const handleCardClick = (cardImage) => popupWithImage.open(cardImage);

// Контейнер карточек
const cardSection = new Section({initialCards, renderer: renderCard}, '.elements');

// Отрисовка одной карточки
function renderCard(card) {
  const newCard = createCard(card);
  cardSection.addItem(newCard);
}

// Отрисовка массива карточек
function renderInitialCards(cards) {
  cardSection.renderItems(cards);
}

// Отрисовка начальных карточек
renderInitialCards(initialCards);

// Модальное окно профиля
const popupWithEditForm = new PopupWithForm('.popup_type_profile', editProfileSubmitHandler);

// Вешаем слушатели на модальное окно Профиля
popupWithEditForm.setEventListeners();

// Действие при сабмите модального окна Профиля
function editProfileSubmitHandler(inputValues) {  
  userInfo.setUserInfo(inputValues);
  popupWithEditForm.close()
}

const userInfo = new UserInfo({nameSelector:'.profile-desc__title', jobSelector:'.profile-desc__intro'})

// Открытие модального окна Профиля
popupOpenEdit.addEventListener('click', () => {
  popupWithEditForm.open();
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputJob.value = user.job;  
  validationFormProfile.clearValidationForm();
});

popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);    
  });
});

function addSubmitHandler(inputValues) {
  
  renderCard({
    name: inputValues.title,
    link: inputValues.link
  });  
  
  popupWithAddCard.close();
}

const popupWithAddCard = new PopupWithForm('.popup_type_place', addSubmitHandler);
popupWithAddCard.setEventListeners();

popupOpenAdd.addEventListener('click', (evt) => {  
  popupWithAddCard.open();
  validationFormPlace.clearValidationForm();
});

const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};

const validationFormProfile = new FormValidator(enableValidation, popupFormProfile);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(enableValidation, popupFormPlace);
validationFormPlace.enableValidation();
