import { useWebSocket } from "../Context/WebSocketContext";

export default function ChatWindow() {
  const { state } = useWebSocket();

  return (
    <div className="chat-window">
      <h2>Chat</h2>
      <div className="messages">
        {state.messages.map((msg) => (
          <div key={msg.timeStamp}>
            <span className="time">
              {new Date(msg.timeStamp).toLocaleTimeString()}
            </span>
            <span className="name">{msg.clientId}:</span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
