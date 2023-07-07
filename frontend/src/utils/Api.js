class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.Authorization;
  }

  //Получение токена из localStorage
  _setToken() {
    this._token = localStorage.getItem('token');
  }

  // Запрос получения данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "GET",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${this._token}`
      },
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос сохранения измененных данных пользователя
  setUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос сохранения измененных аватара пользователя
  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос получения карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "GET",
      headers: {
        authorization: `Bearer ${this._token}`
      },
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос добавление новой карточки на сервер
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(data), //name и link
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос удаления карточки с сервера
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`
      },
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос на постановку лайка карточки
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "PUT",
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': 'application/json'
      },
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  // Запрос на снятие лайка с карточки
  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': 'application/json'
      },
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  //baseUrl: "http://localhost:3000",
  baseUrl: "https://api.zuevmesto.students.nomoreparties.sbs",
  // mode: 'cors',
  // credentials: 'include',
  //  headers: {
  //   'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //   'Content-Type': "application/json",
  // },
});
console.log(api);


export default api;
