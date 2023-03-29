class Card {
  constructor(card, currentUserId, templateSelector, handleCardClick, deleteHandler, likeHandler) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = card.owner._id;
    this._currentUserId = currentUserId;
    this._likes = card.likes;
    this._deleteHandler = deleteHandler;
    this._cardId = card._id;
    this._likeHandler = likeHandler;
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

  generateCard() {
    this._cardElement = this._getTemplate();    
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementPhoto = this._cardElement.querySelector('.element__img');
    this._cardElementLike = this._cardElement.querySelector('.element__button');
    this._cardElementDel = this._cardElement.querySelector('.element__basket');
    this._cardElementCounter = this._cardElement.querySelector('.element__button-counter');
    
    if(this._ownerId !== this._currentUserId) {
      
      this._cardElementDel.style = 'display: none'
    }
    this.updateLike(this._likes)
    this._cardElementTitle.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;

    this._setEventListeners();
    
    return this._cardElement;
  };

  getIsLiked() {
    return this._likes.some((user)=>{
      return user._id === this._currentUserId;
    })
  }

  updateLike(likes) {
    this._likes = likes;
    this._cardElementCounter.textContent = likes.length;
    if (this.getIsLiked()) {
      this._cardElementLike.classList.add('element__button_active')
    } else {
    this._cardElementLike.classList.remove('element__button_active')
    }
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };
  
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._likeHandler(this));
    this._cardElementDel.addEventListener('click', () => this._deleteHandler(this));
    this._cardElementPhoto.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };

