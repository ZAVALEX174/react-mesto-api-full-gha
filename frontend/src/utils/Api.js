class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.Authorization;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      method: "GET",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkResponse(res); 
    });
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res); 
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      method: "GET",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); 
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data), //name и link
    }).then((res) => {
      return this._checkResponse(res); 
    });
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: "include",
      method: "DELETE",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); 
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: "include",
      method: "PUT",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); 
    });
  }

  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: "include",
      method: "DELETE",
      // headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res); 
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
 baseUrl: "https://api.zuevmesto.students.nomoreparties.sbs",
  headers: {    
    "Content-Type": "application/json",
  },
});

export default api;
