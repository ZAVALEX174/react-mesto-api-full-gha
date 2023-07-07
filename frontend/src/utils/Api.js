class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.Authorization;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "GET",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  setUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "GET",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data), //name и link
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "PUT",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); //.then(this._checkResponse);
    });
  }

  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: "DELETE",
      // headers: this._headers,
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
  mode: 'cors',
  credentials: 'include',
   headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': "application/json",
  },
});
console.log(api);


export default api;
