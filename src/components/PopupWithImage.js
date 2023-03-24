import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__img');
    this._nameCard = this._popup.querySelector('.popup__name');
  }

  open(image) {
    this._imgCard.src = image.link;
    this._imgCard.alt = image.name;
    this._nameCard.textContent = image.name
    super.open();
  }

}

export { PopupWithImage };
