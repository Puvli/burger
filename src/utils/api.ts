import { MakeNewOrderPayload } from "../services/types";

const baseUrl = "https://norma.nomoreparties.space/api/";
const headers: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// const headersAuthariztion: HeadersInit = {
//   "Content-Type": "application/json",
//   Authorization: localStorage.getItem("accessToken")!,
// };

function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

const request = (path: string, options: RequestInit) => {
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

export const getOrderNumber = (id: MakeNewOrderPayload) => {
  // const accessToken = localStorage.getItem("accessToken");
  return request(`orders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")!,
    },
    method: "POST",
    body: JSON.stringify(id),
  });
};

export const recoverApi = (value: { email: string }) => {
  return request("password-reset", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const resetApi = (value: { password: string; token: string }) => {
  return request("password-reset/reset", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const registerApi = (value: {
  name: string;
  email: string;
  password: string;
}) => {
  return request("auth/register", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const loginApi = (value: { email: string; password: string }) => {
  return request("auth/login", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const logOutApi = (value: { token: string | null }) => {
  return request("auth/logout", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const updToken = (value: { token: string | null }) => {
  return request("auth/token", {
    headers,
    method: "POST",
    body: JSON.stringify(value),
  });
};

export const fetchGetUser = () => {
  return request("auth/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")!,
    },
    method: "GET",
  });
};

export const updateUserInformationApi = (
  name: string,
  email: string,
  password: string
) => {
  return request("auth/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken")!,
    },
    method: "PATCH",
    body: JSON.stringify({ name, email, password }),
  });
};

export const getOrder = (id: string) => {
  //id: string
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
