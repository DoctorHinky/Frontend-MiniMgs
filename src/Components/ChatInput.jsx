import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { state } = useWebSocket();

  const sendMessage = () => {
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket connection is not open!");
      return; // Verhindert das Senden, wenn die Verbindung nicht offen ist
    }

    console.log("My Id is: ", state.clientId);

    // Hier überprüfen wir den Inhalt der Nachricht
    const messageData = {
      type: "NORMAL_MESSAGE",
      payload: {
        clientId: state.clientId,
        message: message,
      },
    };

    console.log("Prepared message:", messageData); // Logge die Nachricht vor dem Senden

    // Sende die Nachricht nur, wenn sie korrekt ist
    if (message.trim() !== "") {
      state.ws.send(JSON.stringify(messageData));
      console.log("Message sent:", messageData); // Erfolgreiches Senden
      setMessage(""); // Zurücksetzen der Nachricht
    } else {
      console.log("Message is empty. Not sending.");
    }
  };
  function LocktheLobby() {
    const messageData = {
      type: "LOCK_LOBBY",
      payload: {
        clientId: state.clientId,
        message: "Lobby is locked",
      },
    };
    state.ws.send(JSON.stringify(messageData));
    console.log("Lobby locking:", messageData); // Erfolgreiches Senden
  }

  return (
    <div className="inputContainer">
      {state.clientId === "Host" && (
        <button onClick={() => LocktheLobby()}>Lock</button>
      )}
      <div className="messageInp">
        <input
          type="text"
          className="messageField"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
