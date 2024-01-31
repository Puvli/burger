export const WS_CONNECTION_CONNECT = "WS_CONNECTION_CONNECT";
export const WS_CONNECTION_DISCONNECT = "WS_CONNECTION_DISCONNECT";
export const WS_CONNECTION_CONNECTING = "WS_CONNECTION_CONNECTING";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_USER_CONNECTING = "WS_USER_CONNECTING";
// export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';
export const USER_CONNECTION_CONNECT = "USER_CONNECTION_CONNECT";
export const USER_CONNECTION_DISCONNECT = "USER_CONNECTION_DISCONNECT";
export const USER_CONNECTION_CONNECTING = "USER_CONNECTION_CONNECTING";

export const USER_CONNECTION_START = "USER_CONNECTION_START";
export const USER_CONNECTION_CLOSED = "USER_CONNECTION_CLOSED";
export const USER_CONNECTION_SUCCESS = "USER_CONNECTION_SUCCESS";
export const USER_CONNECTION_ERROR = "USER_CONNECTION_ERROR";
export const USER_GET_MESSAGE = "USER_GET_MESSAGE";
export const USER_SEND_MESSAGE = "USER_SEND_MESSAGE";
// export const USER_USER_CONNECTING = "USER_USER_CONNECTING";


export const connect = (url) => ({
  type: WS_CONNECTION_CONNECT,
  payload: url,
});

export const connectWithToken = (url) => {
  const token = localStorage.getItem("accessToken");
  const accessToken = token.replace("Bearer ", "");
  const userUrl = `${url}?token=${accessToken}`;
  return {
    type: USER_CONNECTION_CONNECT,
    payload: userUrl,
  };
};

export const disconnect = () => ({
  type: WS_CONNECTION_CLOSED,
});
