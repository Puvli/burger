export const userSocketMiddleware = (userActions) => {
  return (store) => {
    let socket = null;
    let url = "";
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        userConnect,
        userSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        userConnecting,
        userDisconnect,
      } = userActions;

      if (type === userConnect) {
        url = action.payload;
        const token = localStorage.getItem("accessToken");
        const accessToken = token.replace("Bearer ", "");
        const userUrl = `${url}?token=${accessToken}`;
        socket = new WebSocket(userUrl);
        dispatch({ type: userConnecting });
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

        if (type === userSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === userDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
