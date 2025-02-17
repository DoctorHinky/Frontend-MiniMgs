import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [isPrivate, setIsPivate] = useState(false);
  const { state } = useWebSocket();
  const [receiverId, setReceiverId] = useState("");

  const sendMessage = () => {
    if (state.ws && message.trim() !== "" && isPrivate === false) {
      state.ws.send(
        JSON.stringify({
          type: "NORMAL_MESSAGE",
          payload: {
            clientId: state.clientId,
            message,
          },
        })
      );
      setMessage("");
    }

    if (
      state.ws &&
      message.trim() !== "" &&
      isPrivate === true &&
      receiverId !== ""
    ) {
      state.ws.send(
        JSON.stringify({
          type: "PRIVATE_MESSAGE",
          payload: {
            clientId: state.clientId,
            receiver: receiverId,
            message,
            timeStamp: new Date().getTime(),
          },
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <input
        type="checkbox"
        checked={isPrivate}
        onChange={(e) => setIsPivate(e.target.checked)}
      />
      <input
        type="text"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="Receiver ID"
      />
    </div>
  );
}
