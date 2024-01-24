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

// export const fetchWithRefresh = async (url, options) => {
//   try {
//     // const res = await request(url, options);
//     console.log("we are here!");
//     return await request(url, options);
//   } catch (err) {
//     console.log(err.message);
//     if (err) {
//       console.log("expired!");
//       const refreshData = await refreshToken(); //обновляем токен
//       if (!refreshData.success) {
//         console.log("err expired!");
//         return Promise.reject(refreshData);
//       }
//       localStorage.setItem("refreshToken", refreshData.refreshToken);
//       localStorage.setItem("accessToken", refreshData.accessToken);
//       options.headers.authorization = refreshData.accessToken;
//       // const res = await request(url, options); //повторяем запрос
//       // return await checkResponse(res);
//       return await request(url, options);
//     } else {
//       return Promise.reject((err) => console.log("fuckedup", err));
//     }
//   }
// };

export function ingredientsApi() {
  return request("ingredients", { headers, method: "GET" });
}

export const getOrderNumber = (id) => {
  return request("orders", {
    headers,
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

// export const getProfileData = () => {
//   console.log(headersAuth);
//   return fetchWithRefresh("auth/user", {
//     headers: { authorization: localStorage.getItem("accessToken") },
//     method: "GET",
//   });
// };

// https://norma.nomoreparties.space/api/auth/register
