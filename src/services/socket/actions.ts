import { IConnect, IDisconnect } from "../types";

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

export const connect = (url: string): IConnect => ({
  type: WS_CONNECTION_CONNECT,
  payload: url,
});

export const connectWithToken = (url: string): IConnect => {
  const token = localStorage.getItem("accessToken");
  const accessToken = token?.replace("Bearer ", "");
  const userUrl = `${url}?token=${accessToken}`;
  return {
    type: WS_CONNECTION_CONNECT,
    payload: userUrl,
  };
};

export const disconnect = (): IDisconnect => ({
  type: WS_CONNECTION_CLOSED,
});
