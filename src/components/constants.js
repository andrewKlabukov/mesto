const initialCards = [
  // {
  //   name: 'Архыз',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',    
  // },
  // {
  //   name: 'Челябинская область',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',    
  // },
  // {
  //   name: 'Иваново',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',    
  // },
  // {
  //   name: 'Камчатка',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',    
  // },
  // {
  //   name: 'Холмогорский район',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',    
  // },
  // {
  //   name: 'Байкал',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',    
  // }
];

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const address = 'https://mesto.nomoreparties.co/v1/cohort-61';
const token = 'af74f13f-cd15-4606-af66-aedf471dfe51';

export { initialCards, enableValidation, address, token };
