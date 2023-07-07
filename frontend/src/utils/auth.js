export const BASE_URL = "https://api.zuevmesto.students.nomoreparties.sbs";
// export const BASE_URL = "http://localhost:3000";
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// export function getContent(token) {
//   return fetch(`${BASE_URL}/users/me`, {
//     credentials: 'include',
//     mode: 'cors',
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
//     },
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// };


 // Проверка валидности токена
export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};


 // Проверка валидности токена
//  validityCheck(token) {
//   return fetch(`${this._baseUrl}/users/me`, {
//       method: 'GET',
//       headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           authorization : `Bearer ${token}`
//       },
//       credentials: 'include'
//   })
//       .then(this._processResponseAuth);
// }