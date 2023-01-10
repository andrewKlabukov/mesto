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
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const main = document.querySelector('.gallery');
const temp = document.querySelector('#temp').content;
const card = temp.querySelector('.card');
const title = temp.querySelector('.card__title');
const cardImg = temp.querySelector('.card__img');

const popup = document.querySelector('.popup');
const profileClose = popup.querySelector('.popup__close');
const profileEdit = document.querySelector('.profile__edit');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const formElement = document.querySelector('.popup__content');
const nameInput = popup.querySelector('.popup__info_user_name');
const jobInput = popup.querySelector('.popup__info_user_info');


const addPhotoBtn = document.querySelector('.profile__add-photo');

initialCards.forEach((item)=>{  
  
  let insert = temp.cloneNode(true);  
  title.textContent = item.name;
  cardImg.src = item.link;
  console.log(title.textContent)  
  main.append(insert);  
})

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

const cardLike = document.querySelectorAll('.card__heart');

cardLike.forEach(item => {
  console.log('like')
  item.addEventListener('click', event => {
    console.log('click')
    event.target.classList.toggle('card__heart_like_active')
  })
})

const galleryImages = document.querySelectorAll('.card__img');

galleryImages.forEach(item => {
  item.addEventListener('click', event => {    
    openPopup();   
  })
})

const cardImageDelete = document.querySelectorAll('.card__trash');

cardImageDelete.forEach(item => {
  item.addEventListener('click', event => {
    event.target.parentElement.remove();
  })
})

addPhotoBtn.addEventListener('click', openPopup);

profileEdit.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmitHandler);

profileClose.addEventListener('click', closePopup);
