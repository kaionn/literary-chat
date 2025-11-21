import './index.css';
import { useChat } from './hooks/useChat';
import { CharacterArea } from './components/CharacterArea';
import { ChatArea } from './components/ChatArea';

function App() {
  const { messages, isLoading, isSending, sendMessage, isChatEnded } = useChat();

  return (
    <div className="app-container">
      <CharacterArea isChatEnded={isChatEnded} />
      <ChatArea
        messages={messages}
        isLoading={isLoading}
        isSending={isSending}
        onSendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
