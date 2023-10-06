const baseUrl = "https://norma.nomoreparties.space/api/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
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

export function Api() {
  return request("ingredients", { headers, method: "GET" });
}
