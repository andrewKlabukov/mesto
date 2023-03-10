const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {
  constructor(config, form){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
    this._form = form;
    this._form = document.querySelector(form);
    this._buttonSubmint = this._form.querySelector(this._submitButtonSelector);
  }

enableValidation() {
  this._addInputListners();
};

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _handleFormInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
  }  else {
    this._hideInputError(inputElement);
  }
}

  _toggleButton() {    
    this._isFormValid = this._form.checkValidity();
    this._buttonSubmint.disabled = !this._isFormValid;
    this._buttonSubmint.classList.toggle(this._inactiveButtonClass, !this._isFormValid);
  }

_addInputListners() {
  this._toggleButton();
  this._inputList = this._form.querySelectorAll(this._inputSelector);
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._handleFormInput(inputElement);
      this._toggleButton();
    });
  })
};

clearValidationForm() {
  this._toggleButton();
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
    })
}
}

export { FormValidator, enableValidation };
