import ChatInput from "./Components/ChatInput";
import ChatWindow from "./Components/ChatWindow";
import ClientList from "./Components/ClientList";
import { WebSocketProvider } from "./Context/WebSocketContext";

export default function App() {
  return (
    <WebSocketProvider>
      <div className="app">
        <h1>Annonymer Chat</h1>
        <ClientList />
        <ChatWindow />
        <ChatInput />
      </div>
    </WebSocketProvider>
  );
}
