import { WebsocketStatus, userWebsocketStatus } from "../../utils/status";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CONNECTING,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  USER_CONNECTION_CONNECTING,
  USER_CONNECTION_START,
  USER_GET_MESSAGE,
  USER_CONNECTION_CLOSED,
  USER_CONNECTION_ERROR,
} from "./actions";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  done: [],
  connectingError: "",
  userStatus: userWebsocketStatus.OFFLINE,
  userDone: [],
};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONNECTION_CONNECTING: {
      return {
        ...state,
        userStatus: userWebsocketStatus.CONNECTING,
      };
    }
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

    case USER_CONNECTION_START: {
      return {
        ...state,
        userStatus: userWebsocketStatus.ONLINE,
      };
    }

    case WS_GET_MESSAGE: {
      return {
        ...state,
        done: action.payload,
      };
    }

    case USER_GET_MESSAGE: {
      return {
        ...state,
        userDone: action.payload,
      };
    }

    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        connectingError: action.payload,
      };
    }

    case USER_CONNECTION_ERROR: {
      return {
        ...state,
        userStatus: userWebsocketStatus.OFFLINE,
        connectingError: action.payload,
      };
    }

    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    }

    case USER_CONNECTION_CLOSED: {
      return {
        ...state,
        userStatus: WebsocketStatus.OFFLINE,
      };
    }

    default: {
      return state;
    }
  }
};
