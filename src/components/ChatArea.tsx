import { useRef, useEffect, type KeyboardEvent } from 'react';
import type { Message } from '../hooks/useChat';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  onSendMessage: (text: string) => void;
}

export function ChatArea({ messages, isLoading, isSending, onSendMessage }: ChatAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = inputRef.current?.value.trim();
    if (!text || isSending) return;

    onSendMessage(text);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h1>栞の読書室</h1>
      </div>

      <div className="chat-log" ref={chatLogRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.role === 'ai' && isLoading && message.text === '……' ? (
              <span className="typing-indicator">{message.text}</span>
            ) : (
              message.text.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < message.text.split('\n').length - 1 && <br />}
                </span>
              ))
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <textarea
          ref={inputRef}
          placeholder="メッセージを入力..."
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          rows={1}
        />
        <button onClick={handleSend} disabled={isSending}>
          📤
        </button>
      </div>
    </div>
  );
}
