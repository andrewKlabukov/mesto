let popup = document.querySelector('.popup');
let profileInfo = popup.querySelector('.user-info');
let profileUsename = popup.querySelector('.username');
let profileClose = popup.querySelector('.popup__close');
let profileEdit = document.querySelector('.profile__edit');
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-info');
let popupSaveBtn = popup.querySelector('.popup__save-btn');

profileInfo.value = userInfo.textContent;
profileUsename.value = userName.textContent;

userInfo.textContent = profileInfo.value;
userName.textContent = profileUsename.value;

function closePopup(){
  popup.classList.toggle('popup_opened');
}

profileClose.addEventListener('click', closePopup);

profileEdit.addEventListener('click', closePopup);

popupSaveBtn.addEventListener('click', function(){
  userInfo.textContent = profileInfo.value;
  userName.textContent = profileUsename.value;
  closePopup();
})