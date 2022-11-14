let popup = document.querySelector('.popup');
let profileClose = popup.querySelector('.popup__close');
let profileEdit = document.querySelector('.profile__edit');
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-info');
let formElement = document.querySelector('.popup__content');
let nameInput = popup.querySelector('.popup__info_user_name');
let jobInput = popup.querySelector('.popup__info_user_info');

function openPopup(){
  popup.classList.toggle('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userInfo.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    
    closePopup();
}

profileClose.addEventListener('click', closePopup);

profileEdit.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmitHandler); 