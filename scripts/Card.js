class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementPhoto = this._cardElement.querySelector('.element__img');
    this._cardElementLike = this._cardElement.querySelector('.element__button');
    this._cardElementDel = this._cardElement.querySelector('.element__basket');

    this._cardElementTitle.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  };

  _likeCard() {
    this._cardElementLike.classList.toggle('element__button_active');
  };

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };
  
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._likeCard());
    this._cardElementDel.addEventListener('click', () => this._deleteCard());
    this._cardElementPhoto.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };

