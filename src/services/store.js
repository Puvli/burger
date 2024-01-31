import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/reducers";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from "./socket-middleware/socket-middleware";
import { userSocketMiddleware } from "./user-middleware/user-middleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CONNECT,
  WS_CONNECTION_CONNECTING,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  USER_CONNECTION_CLOSED,
  USER_CONNECTION_CONNECTING,
  USER_CONNECTION_CONNECT,
  USER_CONNECTION_ERROR,
  USER_CONNECTION_START,
  USER_GET_MESSAGE,
  USER_SEND_MESSAGE,
  USER_CONNECTION_DISCONNECT,
} from "./socket/actions";
// import {
//   USER_CONNECTION_CLOSED,
//   USER_CONNECTION_CONNECTING,
//   USER_CONNECTION_ERROR,
//   USER_CONNECTION_START,
//   USER_GET_MESSAGE,
//   USER_SEND_MESSAGE,
//   USER_CONNECTION_DISCONNECT,
// } from "./user/actions";
// import { USER_CONNECTION_CONNECT } from "./user/actions";

const ordersMiddleware = socketMiddleware({
  wsConnect: WS_CONNECTION_CONNECT,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_START,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsConnecting: WS_CONNECTION_CONNECTING,
  wsDisconnect: WS_CONNECTION_DISCONNECT,
  userConnecting: USER_CONNECTION_CONNECTING,
  userConnect: USER_CONNECTION_CONNECT,
  userOnOpen: USER_CONNECTION_START,
  userOnClose: USER_CONNECTION_CLOSED,
  userOnError: USER_CONNECTION_ERROR,
  userOnMessage: USER_GET_MESSAGE,
  userSendMessage: USER_SEND_MESSAGE,
  userDisconnect: USER_CONNECTION_DISCONNECT,
});

// const usersOrdersMiddleware = userSocketMiddleware({
//   userConnect: USER_CONNECTION_CONNECT,
//   userSendMessage: USER_SEND_MESSAGE,
//   onOpen: USER_CONNECTION_START,
//   onClose: USER_CONNECTION_CLOSED,
//   onError: USER_CONNECTION_ERROR,
//   onMessage: USER_GET_MESSAGE,
//   userConnecting: USER_CONNECTION_CONNECTING,
//   userDisconnect: USER_CONNECTION_DISCONNECT,
// });

export const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, ordersMiddleware))
  );
  return store;
};
