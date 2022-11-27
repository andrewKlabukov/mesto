const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const popup = document.querySelector('.popup');
const profileClose = popup.querySelector('.popup__close');
const profileEdit = document.querySelector('.profile__edit');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const formElement = document.querySelector('.popup__content');
const nameInput = popup.querySelector('.popup__info_user_name');
const jobInput = popup.querySelector('.popup__info_user_info');
const placesContainer = document.querySelector(".gallery");
const placeTemplate = document.querySelector("#temp").content;
const cardLike = document.querySelectorAll('.card__heart');
const galleryImages = document.querySelectorAll('.card__img');
const cardImageDelete = document.querySelectorAll('.card__trash');
const addPhotoBtn = document.querySelector('.profile__add-photo');
const cardTitle = document.querySelector('.card__title');

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

function addedPhoto (){  
  initialCards.forEach((item)=>{    
    console.log(item)
    
    // placesContainer.prepend(placeTemplate)

  })
}

addedPhoto();


cardLike.forEach(item => {
  item.addEventListener('click', event => {
    event.target.classList.toggle('card__heart_like_active')
  })
})

galleryImages.forEach(item => {
  item.addEventListener('click', event => {    
    openPopup();   
  })
})

cardImageDelete.forEach(item => {
  item.addEventListener('click', event => {
    event.target.parentElement.remove();
  })
})

addPhotoBtn.addEventListener('click', openPopup);

profileEdit.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmitHandler);

profileClose.addEventListener('click', closePopup);

