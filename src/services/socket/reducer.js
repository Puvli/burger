import { WebsocketStatus } from "../../utils/status";
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

const initialState = {
  status: WebsocketStatus.OFFLINE,
  done: [],
  connectingError: "",
  // userStatus: userWebsocketStatus.OFFLINE,
  // userDone: [],
};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    }

    case WS_CONNECTION_START: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
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
        status: WebsocketStatus.OFFLINE,
        connectingError: action.payload,
      };
    }

    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    }

    default: {
      return state;
    }
  }
};
