import { Popup } from "./Popup";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imgCard = this._popup.querySelector('.popup__img');
    this._nameCard = this._popup.querySelector('.popup__name');
  }
 
  open(image) {
    super.open();
    this._imgCard.src = image.link;
    this._imgCard.alt = image.name;
    this._nameCard.textContent = image.name
  }

};

export { PopupWithImage };