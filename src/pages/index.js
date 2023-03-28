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
import { PopupWithConfirm } from '../components/PopupWithConfirm';

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
//const popupDeleteImg = document.querySelector('.popup_type_delete-card');
const popups = document.querySelectorAll('.popup');
const api = new Api(address, token);

const userInfo = new UserInfo({nameSelector:'.profile-desc__title', jobSelector:'.profile-desc__intro', avatarSelector: '#profile__avatar'})

Promise.all([
  api.getInitialCards(),
  api.getUserInfo(),
  //api.addNewCard()
]).then(([cards, user])=> {
  setInitialUserInfo(user);
  renderInitialCards(cards);      
})

function setInitialUserInfo(user) {
  userInfo.setUserInfo(user)
}

function deleteCardHandler(card) {
  popupWithConfirm.open(card);
  
  // const cardId = card.getCardId()
  // api.delCard(cardId)
  //   .then(() => {      
  //     card.removeCard()
  //   })

}

// Создание новой карточки
const createCard = (cardData) => {
  const userId = userInfo.getUserId(); 
  const card = new Card(cardData, userId, '.template-card', handleCardClick, deleteCardHandler, likeHandler);

  return card.generateCard();
};

// Модальное окно Изображение
const popupWithImage = new PopupWithImage('.popup_type_image');

// Вешаем слушатели на модальное окно Изображения
popupWithImage.setEventListeners()

// Клик на карточку
const handleCardClick = (cardImage) => popupWithImage.open(cardImage);

function likeHandler(card) {
  const cardId = card.getCardId();
  const isLiked = card.getIsLiked();
  api.likeCard(cardId, isLiked)
    .then(res => {
      card.updateLike(res.likes);

    })
}

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
}

// Открытие модального окна Профиля
popupOpenEdit.addEventListener('click', () => {
  popupWithEditForm.open();
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputJob.value = user.job;   
  validationFormProfile.clearValidationForm();
});

const popupWithConfirm = new PopupWithConfirm('.popup_type_delete-card', confirmSubmitHandler);

popupWithConfirm.setEventListeners();

function confirmSubmitHandler(card) {  
  if(card) {
    const cardId = card.getCardId()
    api.delCard(cardId)
      .then(() => {      
        card.removeCard()
        popupWithConfirm.close()
      })
  }
}

popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);    
  });
});

const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};

// Открытие модального окна аватара
const popupWithEditAvatar = new PopupWithForm('.popup_type_avatar', editAvatarSubmitHandler)
popupAvatar.addEventListener('click', ()=> {
  popupWithEditAvatar.open();
})
popupWithEditAvatar.setEventListeners();
function editAvatarSubmitHandler(avatar) {
  api.updateAvatar({avatar: avatar.link})
  .then(res => {
    userInfo.setUserInfo(res);
    popupWithEditAvatar.close();
  })  
}

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

const validationFormProfile = new FormValidator(enableValidation, popupFormProfile);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(enableValidation, popupFormPlace);
validationFormPlace.enableValidation();

api.getInitialCards();