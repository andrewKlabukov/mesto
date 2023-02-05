const formSettings = {
  formSelector: '.popup__form',
  inputSelector: 'input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: '.popup__input-error_active'
}

function enableValidation (formSettings){
  const userEditorSettings = {...formSettings}
  const addImageSettings = {...formSettings}
  userEditorSettings.popupSelector = '.popup__content_type_user';
  addImageSettings.popupSelector = '.popup__content_type_user';
  for (const popupSettings of [userEditorSettings, addImageSettings]){
    const popup = document.querySelector(popupSettings.popupSelector);

    const [firstInput, secondInput] = popup.querySelectorAll(popupSettings.inputSelector);
    const [firstErrorLabel, secondErrorLabel] = popup.querySelectorAll(popupSettings.inputErrorClass)
    firstInput.addEventListener('keyup', event => {
      const input = event.target;
      if (input.value.trim().length < 3){
        firstErrorLabel.classList.add(popupSettings.errorClass);
      } else {
        firstErrorLabel.classList.remove(popupSettings.errorClass);
      }
    })
  }
}

enableValidation(formSettings);