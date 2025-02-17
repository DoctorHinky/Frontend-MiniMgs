export const initState = {
  ws: null,
  clientId: null,
  messages: [],
  clients: [],
  lobbyLocked: false,
};

export function WebsocketReducer(state, action) {
  switch (action.type) {
    case "SET_WS":
      return { ...state, ws: action.payload };

    case "SET_CLIENT_ID":
      return { ...state, clientId: action.payload };

    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    case "SET_CLIENTS":
      return { ...state, clients: action.payload };

    case "SET_LOBBY_LOCKED":
      return { ...state, lobbyLocked: action.payload };

    default:
      break;
  }
}
