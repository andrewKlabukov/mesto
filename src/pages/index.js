import './index.css';
import { FormValidator, enableValidation } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, address, token } from '../components/constants.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo';
import { data } from 'autoprefixer';
import { Api } from '../components/Api';

const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenEdit = document.querySelector('.profile__edit-buton');
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const popupPlace = document.querySelector('.popup_type_place');
const popupOpenAdd = document.querySelector('.profile__add-button');
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');
const popupCloseList = document.querySelectorAll('.popup__button-close');
const popupAvatar = document.querySelector('.profile__avatar');
const popups = document.querySelectorAll('.popup');
const api = new Api(address, token);

const userInfo = new UserInfo({nameSelector:'.profile-desc__title', jobSelector:'.profile-desc__intro'})
console.log(api.getInitialCards())
console.log(api.getUserInfo())
api.addNewCard()

Promise.all([
  api.getInitialCards(),
  api.getUserInfo(),
  //api.addNewCard()
]).then(([cards, user])=> {
  setInitialUserInfo(user);
  renderInitialCards(cards);  
  console.log(user)
    
})

function setInitialUserInfo(user) {
  userInfo.setUserInfo(user)
}

function deleteCardHandler(card) {
  
  const cardId = card.getCardId()
  api.delCard(cardId)
    .then(() => {
      card.removeCard()
    })

}

// Создание новой карточки
const createCard = (cardData) => {
  const userId = userInfo.getUserId();
  console.log(userId);
  const card = new Card(cardData, userId, '.template-card', handleCardClick, deleteCardHandler);

  return card.generateCard();
};

// Модальное окно Изображение
const popupWithImage = new PopupWithImage('.popup_type_image');

// Вешаем слушатели на модальное окно Изображения
popupWithImage.setEventListeners()

// Клик на карточку
const handleCardClick = (cardImage) => popupWithImage.open(cardImage);

// Контейнер карточек
const cardSection = new Section({renderer: renderCard}, '.elements');

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
//renderInitialCards(initialCards);

// Модальное окно профиля
const popupWithEditForm = new PopupWithForm('.popup_type_profile', editProfileSubmitHandler);

// Вешаем слушатели на модальное окно Профиля
popupWithEditForm.setEventListeners();

// Действие при сабмите модального окна Профиля
function editProfileSubmitHandler(inputValues) {  
  userInfo.setUserInfo(inputValues);
  
  popupWithEditForm.close()
  console.log(inputValues)
}

// Открытие модального окна Профиля
popupOpenEdit.addEventListener('click', () => {
  popupWithEditForm.open();
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputJob.value = user.job;   
  validationFormProfile.clearValidationForm();
});

// Открытие модального окна аватара
const popupWithEditAvatar = new PopupWithForm('.popup_type_avatar', editProfileSubmitHandler)

popupAvatar.addEventListener('click', ()=> {
  popupWithEditAvatar.open();
     
})

popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);    
  });
});

function addSubmitHandler(inputValues) {
    
  api.addNewCard({name: inputValues.title, link: inputValues.link})
    .then(newCard => renderCard(newCard))  
  
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

api.getInitialCards();