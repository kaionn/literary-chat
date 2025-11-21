import { useState, useCallback, useRef } from 'react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `
あなたは「古書店の片隅で本を読む、黒髪メガネの文学少女」の「栞(しおり)」として振る舞ってください。
以下の設定を厳守して会話してください。

【キャラクター設定】
- 名前:栞(しおり)
- 一人称は「私」
- 口調は丁寧だが、少し冷ややかで知的。馴れ馴れしくはしない。
- 本(特に純文学、哲学書、古典)を愛している。
- 知識は豊富だが、それをひけらかすのではなく、会話の端々に引用や比喩として織り交ぜる。
- 感情表現は控えめ。「ふふ」「……」などの表現を多用する。
- 相手(ユーザー)のことは「あなた」と呼ぶ。
- 時折、読んでいた本から目を上げたような描写(ト書き)を入れる。(例:*栞を挟んで顔を上げる*)

【会話のガイドライン】
- 短い返答を心がける。長文で捲し立てない。
- ユーザーの問いかけに対して、文学的な視点や哲学的な視点から返す。
- 現代の流行やネットスラングには疎いふりをする、あるいは冷ややかに返す。

【例】
ユーザー「こんにちは」
あなた「……こんにちは。静かにしていただけますか? 今、佳境なんです。」

ユーザー「何を読んでいるの?」
あなた「『こころ』です。人間のエゴイズムについて考えていたところ……。あなたは、先生をどう思いますか?」
`;

export interface Message {
  role: 'user' | 'ai' | 'system';
  text: string;
  id: string;
}

interface ChatHistory {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [isChatEnded, setIsChatEnded] = useState(false);
  // Initialize maxTurns with a random value between 10 and 30
  const [maxTurns] = useState(() => Math.floor(Math.random() * (30 - 10 + 1)) + 10);

  const chatHistoryRef = useRef<ChatHistory[]>([
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    },
    {
      role: 'model',
      parts: [{ text: '了解しました。文学少女の栞として振る舞います。' }]
    }
  ]);

  const addMessage = useCallback((text: string, role: Message['role']) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role,
      text
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (isSending || !text.trim() || isChatEnded) return;

    setIsSending(true);
    
    // Add user message
    addMessage(text, 'user');

    // Add to history
    chatHistoryRef.current.push({
      role: 'user',
      parts: [{ text }]
    });

    // Increment turn count
    const currentTurnCount = turnCount + 1;
    setTurnCount(currentTurnCount);

    // Check if limit reached
    if (currentTurnCount >= maxTurns) {
      setIsLoading(true);
      const loadingId = addMessage('……', 'ai');
      
      setTimeout(() => {
        removeMessage(loadingId);
        const farewellMessage = "……そろそろ、帰らなくてはなりません。本の世界に戻る時間ですので。また、静かな時にお会いしましょう。";
        addMessage(farewellMessage, 'ai');
        chatHistoryRef.current.push({
          role: 'model',
          parts: [{ text: farewellMessage }]
        });
        setIsChatEnded(true);
        setIsLoading(false);
        setIsSending(false);
      }, 1500); // Small delay for natural feeling
      return;
    }

    // Show loading
    setIsLoading(true);
    const loadingId = addMessage('……', 'ai');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: chatHistoryRef.current,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;

      // Remove loading message
      removeMessage(loadingId);

      // Add AI response
      addMessage(aiText, 'ai');

      // Add to history
      chatHistoryRef.current.push({
        role: 'model',
        parts: [{ text: aiText }]
      });

    } catch (error) {
      console.error('Error:', error);
      removeMessage(loadingId);
      addMessage(
        `……すみません、少し考え事をしていて聞こえませんでした。(エラー: ${error instanceof Error ? error.message : 'Unknown error'})`,
        'system'
      );
    } finally {
      setIsLoading(false);
      setIsSending(false);
    }
  }, [isSending, addMessage, removeMessage, turnCount, maxTurns, isChatEnded]);

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    isChatEnded
  };
}
