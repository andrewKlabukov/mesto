import './index.css';
import { FormValidator, enableValidation } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, address, token } from '../components/constants.js';
import { Section } from '../components/Section.js';
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
const popupPlaceAvatar = document.querySelector('.popup_type_avatar');
const popupOpenAdd = document.querySelector('.profile__add-button');
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');

const popupCloseList = document.querySelectorAll('.popup__button-close');
const popupAvatar = document.querySelector('.profile__avatar');
const popupFormAvatar = popupPlaceAvatar.querySelector('.popup__form_type_avatar');
const api = new Api(address, token);

const userInfo = new UserInfo({nameSelector:'.profile-desc__title', jobSelector:'.profile-desc__intro', avatarSelector: '#profile__avatar'})

Promise.all([
  api.getInitialCards(),
  api.getUserInfo(),

  
]).then(([cards, user])=> {
  setInitialUserInfo(user);
  renderInitialCards(cards);
  
})
  .catch((err) => {
    console.log(err);
  })

function setInitialUserInfo(user) {
  userInfo.setUserInfo(user)
}

function deleteCardHandler(card) {
  popupWithConfirm.open(card);  
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
      card.updateLike(res.likes)           
    })
    .catch((err) => {
      console.log(err);
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

// Модальное окно профиля
const popupWithEditForm = new PopupWithForm('.popup_type_profile', editProfileSubmitHandler);

// Вешаем слушатели на модальное окно Профиля
popupWithEditForm.setEventListeners();

// Действие при сабмите модального окна Профиля
function editProfileSubmitHandler(inputValues) {
  popupWithEditForm.isFetching(true);
  api.updateUserInfo(inputValues)
  .then(() => {
    userInfo.setUserInfo(inputValues);   
    popupWithEditForm.close()
  })
  .finally(() => {
    popupWithEditForm.isFetching(false);
  })  
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
        popupWithConfirm.close();      
      })      
      .catch((err) => {
        console.log(err);
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
const popupWithEditAvatar = new PopupWithForm('.popup_type_avatar', editAvatarSubmitHandler);

popupAvatar.addEventListener('click', ()=> {
  popupWithEditAvatar.open();
  validationFormAvatar.clearValidationForm();
})
popupWithEditAvatar.setEventListeners();
function editAvatarSubmitHandler(inputValue) {
  popupWithEditAvatar.isFetching(true);
  api.updateAvatar({avatar: inputValue.avatar})
  .then(res => {
    userInfo.setUserInfo(res);
    popupWithEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithEditAvatar.isFetching(false);
  })
}

function addSubmitHandler(inputValues) {
  popupWithAddCard.isFetching(true)
  api.addNewCard({name: inputValues.title, link: inputValues.link})

    .then(newCard => {
      renderCard(newCard)
      popupWithAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAddCard.isFetching(false);
    })
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

const validationFormAvatar = new FormValidator(enableValidation, popupFormAvatar);
validationFormAvatar.enableValidation();

api.getInitialCards();