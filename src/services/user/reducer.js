import { userWebsocketStatus } from "../../utils/status";
import {
  USER_CONNECTION_CLOSED,
  USER_CONNECTION_CONNECTING,
  USER_CONNECTION_ERROR,
  USER_CONNECTION_START,
  USER_GET_MESSAGE,
} from "./actions";

const initialState = {
  userStatus: userWebsocketStatus.OFFLINE,
  userDone: [],
  userConnectingError: "",
};

export const userSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONNECTION_CONNECTING: {
      return {
        ...state,
        userStatus: userWebsocketStatus.CONNECTING,
      };
    }

    case USER_CONNECTION_START: {
      return {
        ...state,
        userStatus: userWebsocketStatus.ONLINE,
      };
    }

    case USER_GET_MESSAGE: {
      return {
        ...state,
        userDone: action.payload,
      };
    }

    case USER_CONNECTION_ERROR: {
      return {
        ...state,
        userStatus: userWebsocketStatus.OFFLINE,
        userConnectingError: action.payload,
      };
    }

    case USER_CONNECTION_CLOSED: {
      return {
        ...state,
        userStatus: userWebsocketStatus.OFFLINE,
      };
    }

    default: {
      return state;
    }
  }
};
