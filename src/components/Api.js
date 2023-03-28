import { data } from "autoprefixer";

class Api {
  constructor(address, token) {
    this.address = address;
    this.token = token;    
  }
// запрос
  _request(endpoint, method, body) {
    const fetchInit = {
      method: method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      }
    }

    return fetch(`${this.address}/${endpoint}`, body
      ? { ...fetchInit, body: JSON.stringify(body) }
      : fetchInit
    )
    .then(this._handleResponse)
  }
// обработчик ответа
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
// получаем массив карточек от сервера
  getInitialCards() {
    return this._request('cards', 'GET');
  }
// получаем информацию о пользователе от сервера
  getUserInfo() {
    return this._request('users/me', 'GET');
  }
// добавление новой карточки на сервер
  addNewCard(newCard) {
    return this._request('cards', 'POST', newCard)
  }

  delCard(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }
  updateAvatar(avatar) {
    return this._request('users/me/avatar', 'PATCH', avatar)
  }
  likeCard(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, 
    isLiked? 'DELETE' : 'PUT'
    )
  }
  updateUserInfo(userInfo) {
    return this._request('users/me', 'PATCH', userInfo)
  } 
}

export { Api }
