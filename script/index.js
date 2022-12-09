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

const main = document.querySelector('.gallery');
const temp = document.querySelector('.temp').content;
let insert = temp.cloneNode(true);
const title = temp.querySelector('.card__title');
const cardImg = temp.querySelector('.card__img');

initialCards.forEach((item)=>{  
  insert = temp.cloneNode(true)  
  title.textContent = item.name;
  cardImg.src = item.link;  
  main.append(insert);  
})


const card = temp.querySelector('.card');
const popup = document.querySelector('.popup');
const profileClose = popup.querySelector('.popup__close');
const profileEdit = document.querySelector('.profile__edit');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const formElement = document.querySelector('.popup__content');
const nameInput = popup.querySelector('.popup__info_user_name');
const jobInput = popup.querySelector('.popup__info_user_info');
const addPhotoBtn = document.querySelector('.profile__add-photo');
const cardLike = document.querySelectorAll('.card__heart');
const cardImageDelete = document.querySelectorAll('.card__trash');
const galleryImages = document.querySelectorAll('.card__img');

function openPopup(){
  popup.classList.toggle('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userInfo.textContent;
}

function openAddPhotoPopup(){
  popup.classList.toggle('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
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

cardLike.forEach(item => {
  item.addEventListener('click', event => {   
    event.target.classList.toggle('card__heart_like_active')
  })
})

galleryImages.forEach(item => {
  item.addEventListener('click', event => {
    
    console.log(event.target.name);
  })
})

cardImageDelete.forEach(item => {
  item.addEventListener('click', event => {
    event.target.parentElement.remove();
  })
})

addPhotoBtn.addEventListener('click', openAddPhotoPopup);

profileEdit.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmitHandler);

profileClose.addEventListener('click', closePopup);

