const baseUrl = "https://norma.nomoreparties.space/api/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const headersAuth = {
  Accept: "application/json",
  "Content-Type": "application/json",
  authorization: localStorage.getItem("accessToken"),
};

const headersRefreshAuth = {
  Accept: "application/json",
  "Content-Type": "application/json",
  authorization: localStorage.getItem("refreshToken"),
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

const request = (path, options) => {
  const url = baseUrl + path;
  return fetch(url, options).then(checkResponse);
};

export const refreshToken = () => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export function ingredientsApi() {
  return request("ingredients", { headers, method: "GET" });
}

export const getOrderNumber = (id) => {
  const accessToken = localStorage.getItem("accessToken");
  return request(`orders`, {
    // return request("orders", {
    // headers,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    method: "POST",
    body: JSON.stringify(id),
  });
};

export const recoverApi = (value) => {
  return request("password-reset", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const resetApi = (value) => {
  return request("password-reset/reset", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const registerApi = (value) => {
  return request("auth/register", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const loginApi = (value) => {
  return request("auth/login", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const logOut = (value) => {
  return request("auth/logout", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const updToken = (value) => {
  return request("auth/token", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const fetchGetUser = () => {
  return request("auth/user", {
    headers: { authorization: localStorage.getItem("accessToken") },
    method: "GET",
  });
};

export const updateUserInformation = (name, email, password) => {
  return request("auth/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    method: "PATCH",
    body: JSON.stringify({ name, email, password }),
  });
};

export const getOrder = (id) => {
  return request(`orders/${id}`, {
    headers: headers,
    method: "GET",
  });
};

// export const getProfileData = () => {
//   console.log(headersAuth);
//   return fetchWithRefresh("auth/user", {
//     headers: { authorization: localStorage.getItem("accessToken") },
//     method: "GET",
//   });
// };

// https://norma.nomoreparties.space/api/auth/register
