class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
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
    }).then(this._checkResponse);
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data), //name и link
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: "include",
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      credentials: "include",
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      credentials: "include",
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//const token = "2a1090a1-694e-4eb0-a8c1-0bf361e0cc8b";
//const cohort = "cohort-62";

const api = new Api({
  //baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  // baseUrl: "https://zuevmesto.students.nomoreparties.sbs",
  headers: {
    //authorization: token,
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
}

);
console.log(api);


export default api;
