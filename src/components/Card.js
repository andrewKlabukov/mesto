class Card {
  constructor(card, currentUserId, templateSelector, handleCardClick, deleteHandler) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = card.owner._id;
    this._currentUserId = currentUserId;
    this._likes = card.likes;
    this._deleteHandler = deleteHandler;
    this._cardId = card._id;
  };

  getCardId() {
    return this._cardId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  _updateLikes(likes) {
    this._cardElement.querySelector('.element__button-counter').textContent = likes.length;    
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementPhoto = this._cardElement.querySelector('.element__img');
    this._cardElementLike = this._cardElement.querySelector('.element__button');
    this._cardElementDel = this._cardElement.querySelector('.element__basket');
    
    if(this._ownerId !== this._currentUserId) {
      
      this._cardElementDel.style = 'display: none'
    }

    this._updateLikes(this._likes)
    this._cardElementTitle.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;

    this._setEventListeners();
    
    return this._cardElement;
  };

  _likeCard() {
    this._cardElementLike.classList.toggle('element__button_active');
  };

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };
  
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._likeCard());
    this._cardElementDel.addEventListener('click', () => this._deleteHandler(this));
    this._cardElementPhoto.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };

