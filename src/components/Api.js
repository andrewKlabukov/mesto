import { data } from "autoprefixer";

class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-61/cards', {
    headers: {
      authorization: 'af74f13f-cd15-4606-af66-aedf471dfe51'
    }
  })
    .then(res => {
      if (res.ok) {        
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
        
    })
    .then(data => console.log(data))
  }

  // другие методы работы с API
}

export { Api }
