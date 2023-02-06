const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorSelector: '.popup__input-error',
  inactiveButtonClass: 'popup__button_disabled',
  errorVisibilityClass: '.popup__input-error_active'
}

function enableValidation (popup, settings = formSettings){
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorSelector,
    inactiveButtonClass,
    errorVisibilityClass
  } = settings

  const form = popup.querySelector(formSelector);
  const submitButton = popup.querySelector(submitButtonSelector);

  form.addEventListener('reset', () => {
    form.querySelectorAll(inputErrorSelector).forEach(el => el.classList.remove(errorVisibilityClass))
  })

  function setupListener(input, errorLabel, condition, message){
    input.addEventListener('keyup', event => {
      const { value } = event.target
      if(condition.test(value) || !value.trim().length) {
        errorLabel.classList.remove(errorVisibilityClass)
        errorLabel.textContent = ''
        submitButton.removeAttribute('disabled')
        submitButton.classList.remove(inactiveButtonClass)
      }
      else {
        errorLabel.classList.add(errorVisibilityClass)
        errorLabel.textContent = message
        submitButton.setAttribute('disabled', true)
        submitButton.classList.add(inactiveButtonClass)
      }
    })
  }

  if(popup === popupEditUser) {
    const [userNameInput, userInfoInput] = popup.querySelectorAll(inputSelector);
    const [userNameErrorLabel, userInfoErrorLabel] = popup.querySelectorAll(inputErrorSelector)
    setupListener(userNameInput, userNameErrorLabel, /^[A-ZА-Я][A-ZА-Яa-zа-я\ \.\-]+$/, 'Ошибка в имени пользователя')
    setupListener(userInfoInput, userInfoErrorLabel, /^[A-ZА-Я][0-9A-ZА-Яa-zа-я\ \.\-\,\!\;\:\"\?]+$/, 'Ошибка в информации о пользователе')
    return
  }

  if(popup === popupAddImg) {
    const [linkTitleInput, linkUrlInput] = popup.querySelectorAll(inputSelector);
    const [linkTitleErrorLabel, linkUrlErrorLabel] = popup.querySelectorAll(inputErrorSelector)
    setupListener(linkTitleInput, linkTitleErrorLabel, /^[A-ZА-Я][0-9A-ZА-Яa-zа-я\ \.\-\,\!\;\:\"\?]+$/, 'Ошибка в информации месте')
    setupListener(linkUrlInput, linkUrlErrorLabel, /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'Ошибка в ссылке')
  }
}

enableValidation(popupEditUser);
enableValidation(popupAddImg);
