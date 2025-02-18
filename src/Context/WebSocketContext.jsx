import { createContext, useContext, useEffect, useReducer } from "react";
import { WebsocketReducer, initState } from "./WebSocketReducer";
import PropTypes from "prop-types";

const WebSocketContext = createContext();
// only for dev purposes
//const webSocket_URL = "ws://localhost:5001";
const webSocket_URL = "wss://minimessenger-kgri.onrender.com";
export let ws = null;
export function WebSocketProvider({ children }) {
  const [state, dispatch] = useReducer(WebsocketReducer, initState);

  useEffect(() => {
    ws = new WebSocket(webSocket_URL);

    ws.addEventListener("open", () => {
      console.log("Connected to server");
      dispatch({ type: "SET_WS", payload: ws });
    });

    ws.addEventListener("message", (e) => {
      let data;
      try {
        data = JSON.parse(e.data);
        console.log("Data im Frontend: ", data);
      } catch (err) {
        console.error("Failed to parse incoming message", err);
      }

      switch (data.type) {
        case "WELCOME":
          dispatch({ type: "SET_CLIENT_ID", payload: data.clientId });
          break;

        case "NORMAL_MESSAGE":
          dispatch({ type: "ADD_MESSAGE", payload: data });
          break;

        case "PRIVATE_MESSAGE":
          dispatch({ type: "ADD_MESSAGE", payload: data });
          break;

        case "LOCK_LOBBY":
          dispatch({ type: "SET_LOBBY_LOCKED", payload: true });
          break;

        case "UNLOCK_LOBBY":
          dispatch({ type: "SET_LOBBY_LOCKED", payload: false });
          break;

        case "NEW_HOST":
          dispatch({ type: "SET_CLIENT_ID", payload: "Host" });
          break;

        default:
          console.warn("unbekannter Nachrichten Type:", data.type);
          break;
      }
    });

    ws.addEventListener("close", () => {
      console.log("Disconnected from server");
      dispatch({ type: "SET_WS", payload: null });
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ state, dispatch }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
