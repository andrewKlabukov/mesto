let popup = document.querySelector('.popup');
let profileInfo = popup.querySelector('.popup_user_info');
let profileUsename = popup.querySelector('.popup_user_name');
let profileClose = popup.querySelector('.popup__close');
let profileEdit = document.querySelector('.profile__edit');
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-info');
// let popupSaveBtn = popup.querySelector('.popup__save-btn');

// profileInfo.value = userInfo.textContent;
// profileUsename.value = userName.textContent;

function openPopup(){
  popup.classList.toggle('popup_opened');
}

profileClose.addEventListener('click', openPopup);

profileEdit.addEventListener('click', openPopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = popup.querySelector('.popup__info_user_name');
let jobInput = popup.querySelector('.popup__info_user_info');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    
    // Вставьте новые значения с помощью textContent
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;

    openPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 