import { useWebSocket } from "../Context/WebSocketContext";

export default function ClientList() {
  const { state } = useWebSocket();

  return (
    <div className="client-list">
      <h2>Clients</h2>
      <ul>
        {state.clients.map((client) => (
          <li key={client.clientId}>{client.clientId}</li>
        ))}
      </ul>
    </div>
  );
}
