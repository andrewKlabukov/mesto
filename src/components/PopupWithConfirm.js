import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this.form = this._popup.querySelector('.popup__form');
    this.form.querySelector('.popup__button-submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    })
  }

  open(card) {
    super.open()
    this._card = card;
    
  }

}