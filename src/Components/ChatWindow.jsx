import { useWebSocket } from "../Context/WebSocketContext";

export default function ChatWindow() {
  const { state } = useWebSocket();

  return (
    <div className="chat-window">
      <div className="messages">
        {state.messages.map((msg, i) => (
          <div
            key={i}
            className="message"
            style={{
              alignSelf:
                msg.clientId === state.clientId ? "flex-start" : "flex-end",
            }}
          >
            <span className="name">{msg.clientId}</span>
            <span className="msg">{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
