import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, _submitHandler) {
    super(popupSelector);
    this._submitHandler = _submitHandler;
    this.form = this._popup.querySelector('.popup__form');
    this._inputs = [...this.form.querySelectorAll('.popup__input')];
    this._buttonSubmit = this.form.querySelector('.popup__button');
    this._buttonInitialText = this._buttonSubmit.textContent;
  }

  // Возвращает значения инпутов
  _getInputValues() {
    const inputValues = {};
    // Наполняем объект inputValues, где ключи это атрибут name инпута, а значение - то, что ввели в инпут
    this._inputs.forEach((input) => inputValues[input.name] = input.value);
    return inputValues
  }

  // На форму вешаем слушатель при сабмите + Отменяем исходное поведение браузера и передаём значения инпутов
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues()
      this._submitHandler(inputValues); // передаём значения всех инпутов в обработчик сабмита
      
    })
  }

  close() {
    this.form.reset();
    super.close();
  }

  isFetching(isLoading) {
    if(isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonInitialText;
    }
  }
}
