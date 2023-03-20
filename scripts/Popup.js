export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector)
  }

  open() {
    this.popup.classList.add('popup_opened');
  }
  
  close() {
    this.popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {      
      this.close();
    };
  }

  setEventListeners() {  
    this.popup.addEventListener('click', (evt)=> {
      if (evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    })
  }
}