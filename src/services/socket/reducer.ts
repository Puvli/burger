import { WebsocketStatus } from "../../utils/status";
import { ISocket, doneOrders } from "../types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CONNECTING,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_GET_MESSAGE,
  // USER_CONNECTION_CONNECTING,
  // USER_CONNECTION_START,
  // USER_GET_MESSAGE,
  // USER_CONNECTION_CLOSED,
  // USER_CONNECTION_ERROR,
} from "./actions";

interface IConnectingAction {
  type: typeof WS_CONNECTION_CONNECTING;
}

interface IStartAction {
  type: typeof WS_CONNECTION_START;
}

interface IGetMessageAction {
  type: typeof WS_GET_MESSAGE;
  payload: ISocket; // Уточните тип payload, если известно
}

interface IErrorAction {
  type: typeof WS_CONNECTION_ERROR;
  payload: string;
}

interface IClosedAction {
  type: typeof WS_CONNECTION_CLOSED;
}

export interface IWebsocketState {
  status: WebsocketStatus;
  done: doneOrders | null | [];
  connectingError: string;
}

// Объединение всех действий в один тип
type WebsocketActions =
  | IConnectingAction
  | IStartAction
  | IGetMessageAction
  | IErrorAction
  | IClosedAction;

const initialState: IWebsocketState = {
  status: WebsocketStatus.OFFLINE,
  done: [],
  connectingError: "",
};

export const socketReducer = (
  state: IWebsocketState = initialState,
  action: WebsocketActions
) => {
  switch (action.type) {
    case WS_CONNECTION_CONNECTING: {
      return {
        ...state,
        status: "CONNECTING...",
      };
    }

    case WS_CONNECTION_START: {
      return {
        ...state,
        status: "ONLINE",
      };
    }

    case WS_GET_MESSAGE: {
      return {
        ...state,
        done: action.payload,
      };
    }

    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        status: "OFFLINE",
        connectingError: action.payload,
      };
    }

    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        status: "OFFLINE",
      };
    }

    default: {
      return state;
    }
  }
};
