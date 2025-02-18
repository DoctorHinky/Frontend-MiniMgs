import ChatInput from "./Components/ChatInput";
import ChatWindow from "./Components/ChatWindow";
import { WebSocketProvider } from "./Context/WebSocketContext";

export default function App() {
  return (
    <WebSocketProvider>
      <div className="app">
        <ChatWindow />
        <ChatInput />
      </div>
    </WebSocketProvider>
  );
}
