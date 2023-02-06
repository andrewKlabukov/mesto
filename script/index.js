const cardsContainer = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#temp').content;
const profileEdit = document.querySelector('.profile__edit');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-info');
const profileForm = document.querySelector('.popup__content_type_user');
const photoBtnAdd = document.querySelector('.profile__add-photo');

// Добавление карточки
const popupAddImg = document.querySelector('.popup_type_add-img');
const imageAddClose = popupAddImg.querySelector('.popup__close');
const placeInput = popupAddImg.querySelector('.popup__info_place_name');
const linkInput = popupAddImg.querySelector('.popup__info_link');
const imageFormAdd = popupAddImg.querySelector('form');
const showImg = document.querySelector('.popup_type_img');
const cardImgTitle = showImg.querySelector('h2');
const cardImgShow = showImg.querySelector('img');
const popupList = document.querySelectorAll('.popup');

imageFormAdd.addEventListener('submit', e=>{
  e.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const item ={name, link};
  const card = createCard(item);
  cardsContainer.prepend(card);  
  imageFormAdd.reset();
  closePopup(popupAddImg);
})

// работа с окном пользователя
const popupEditUser = document.querySelector('.popup_type_user');
const profileClose = popupEditUser.querySelector('.popup__close');
const nameInput = popupEditUser.querySelector('.popup__info_user_name');
const jobInput = popupEditUser.querySelector('.popup__info_user_info');
const userEditForm = popupEditUser.querySelector('form');

const handleEscKeyup = (event) => {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    const form = activePopup.querySelector('form')
    form.reset()
    closePopup(activePopup);
  }
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const title = card.querySelector('.card__title');
  const cardImg = card.querySelector('.card__img'); 
  title.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;
    
  const cardLike = card.querySelector('.card__heart');
  cardLike.addEventListener('click', event => {    
    event.target.classList.toggle('card__heart_like_active');
  })
  
  const cardImageDelete = card.querySelector('.card__trash');
  cardImageDelete.addEventListener('click', event => {
    event.target.closest('.card').remove();    
  })
  
  const image = card.querySelector('img');
  image.addEventListener('click', event => {
    cardImgTitle.textContent = item.name;
    cardImgShow.setAttribute('src', item.link);
    cardImgShow.setAttribute('alt', item.name);
    openPopup(showImg);
  })

  return card;
}

initialCards.map(createCard).forEach(card => cardsContainer.appendChild(card));

function openPopup(popup){
  popup.classList.toggle('popup_opened');  
}

function closePopup(popup){  
  popup.classList.remove('popup_opened');  
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userInfo.textContent = jobInput.value;
  userEditForm.reset();
    
  closePopup(popupEditUser);    
}

showImg.querySelector('.popup__close').addEventListener('click', event => {
  closePopup(showImg);
});

profileEdit.addEventListener('click', () => {  
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    openPopup(popupEditUser);
});

photoBtnAdd.addEventListener('click', () => openPopup(popupAddImg));

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileClose.addEventListener('click', () => closePopup(popupEditUser));

imageAddClose.addEventListener('click', () => closePopup(popupAddImg));

document.addEventListener('keyup', handleEscKeyup);
