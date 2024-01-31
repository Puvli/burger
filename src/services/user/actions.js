export const USER_CONNECTION_CONNECT = "USER_CONNECTION_CONNECT";
export const USER_CONNECTION_DISCONNECT = "USER_CONNECTION_DISCONNECT";
export const USER_CONNECTION_CONNECTING = "USER_CONNECTION_CONNECTING";

export const USER_CONNECTION_START = "USER_CONNECTION_START";
export const USER_CONNECTION_CLOSED = "USER_CONNECTION_CLOSED";
export const USER_CONNECTION_SUCCESS = "USER_CONNECTION_SUCCESS";
export const USER_CONNECTION_ERROR = "USER_CONNECTION_ERROR";
export const USER_GET_MESSAGE = "USER_GET_MESSAGE";
export const USER_SEND_MESSAGE = "USER_SEND_MESSAGE";
export const USER_USER_CONNECTING = "USER_USER_CONNECTING";
// export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

export const userConnect = (url) => ({
  type: USER_CONNECTION_CONNECT,
  payload: url,
});

// export const connectWithToken = (url, token) => {
//   const accessToken = token.replace("Bearer ", "");
//   const userUrl = `${url}?token=${accessToken}`;
//   return {
//     type: WS_CONNECTION_CONNECT,
//     payload: userUrl,
//   };
// };

export const userDisconnect = () => ({
  type: USER_CONNECTION_CLOSED,
});
