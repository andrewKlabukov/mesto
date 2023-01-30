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
const temp = document.querySelector('#temp').content;
const profileEdit = document.querySelector('.profile__edit');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const formElement = document.querySelector('.popup__content');
const addPhotoBtn = document.querySelector('.profile__add-photo');

// Добавление карточки
const popupAddImg = document.querySelector('.addimg');
const addImageClose = popupAddImg.querySelector('.popup__close');
const placeInput = popupAddImg.querySelector('.popup__info_place_name');
const linkInput = popupAddImg.querySelector('.popup__info_link');
const addImageForm = popupAddImg.querySelector('form');
const showImg = document.querySelector('.popupImg');
showImg.querySelector('.popup__close').addEventListener('click', event => {
  closePopup(showImg);
})

addImageForm.addEventListener('submit', e=>{
  e.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  let item ={name, link};
  drawCards(item)
  closePopup(popupAddImg);
})

// работа с окном пользователя
const popupEditUser = document.querySelector('.edituser');
const profileClose = popupEditUser.querySelector('.popup__close');
const nameInput = popupEditUser.querySelector('.popup__info_user_name');
const jobInput = popupEditUser.querySelector('.popup__info_user_info');

function drawCard(card, item) {
  const title = card.querySelector('.card__title');
  const cardImg = card.querySelector('.card__img'); 
  title.textContent = item.name;
  cardImg.src = item.link;
    
  const cardLike = card.querySelector('.card__heart');
  cardLike.addEventListener('click', event => {    
    event.target.classList.toggle('card__heart_like_active');
  })
  
  const cardImageDelete = card.querySelector('.card__trash');
  cardImageDelete.addEventListener('click', event => {
    event.target.parentElement.remove();
  })
  
  const image = card.querySelector('img');
  image.addEventListener('click', event => {
    showImg.querySelector('h2').textContent = item.name;
    showImg.querySelector('img').setAttribute('src', item.link);
    openPopup(showImg);
  })

  main.append(card);
}

function drawCards(card) {
  const cards = card ? [card, ...initialCards] : initialCards;
  if (card){
    main.innerHTML = '';
  }
  cards.forEach((item)=>{     
    let card = temp.cloneNode(true);
    drawCard(card, item);
  })
}

drawCards();

function openPopup(popup){
  popup.classList.toggle('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userInfo.textContent;
}

function openAddPhotoPopup(popup){
  popup.classList.toggle('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
}

function closePopup(popup){  
  popup.classList.remove('popup_opened');  
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userInfo.textContent = jobInput.value;
    
  closePopup();    
}

// const galleryImages = document.querySelectorAll('.card__img');

// const popupImgItem = document.querySelector('.popupImg__img');

// galleryImages.forEach(item => {
//   item.addEventListener('click', event => {
//     console.log('123456')
//     popupImg.classList.toggle('popup_opened');
//     popupImgItem.src = event.target.src
//     // console.log(event.target)
     
//   })
// })

addPhotoBtn.addEventListener('click', () => openAddPhotoPopup(popupAddImg));

profileEdit.addEventListener('click', () => openPopup(popupEditUser));

formElement.addEventListener('submit', formSubmitHandler);

profileClose.addEventListener('click', () => closePopup(popupEditUser));

addImageClose.addEventListener('click', () => closePopup(popupAddImg));
