import { updToken } from "../../utils/api";

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    let url = "";
    let userSocket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
        userConnecting,
        userConnect,
        userOnOpen,
        userOnClose,
        userOnError,
        userOnMessage,
        userSendMessage,
        userDisconnect,
      } = wsActions;

      if (type === wsConnect) {
        url = action.payload;
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (type === userConnect) {
        url = action.payload;
        userSocket = new WebSocket(action.payload);
        dispatch({ type: userConnecting });
      }

      if (userSocket) {
        userSocket.onopen = () => {
          dispatch({ type: userOnOpen });
        };

        userSocket.onerror = () => {
          dispatch({ type: userOnError, payload: "Error" });
        };

        userSocket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: userOnMessage, payload: parsedData });
          console.log(parsedData);
          if (parsedData.messge === "Invalid or missing token")
            updToken({
              token: localStorage.getItem("refreshToken"),
            }).then((data) => {
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);
            });
        };

        userSocket.onclose = () => {
          dispatch({ type: userOnClose });
          // dispatch({ type: wsConnect, payload: url });
        };

        if (type === userSendMessage) {
          userSocket.send(JSON.stringify(action.payload));
        }

        if (type === userDisconnect) {
          userSocket.close();
          userSocket = null;
        }
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
          // dispatch({ type: wsConnect, payload: url });
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
