import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setChat([...chat, userMsg]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    const botMsg = { sender: 'bot', text: data.reply };
    setChat([...chat, userMsg, botMsg]);
  };

  return (
    <main className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Polaris AI Chat</h1>

      <div className="border p-4 rounded-lg h-96 overflow-y-auto bg-gray-50 mb-4">
        {chat.map((msg, i) => (
          <p key={i} className={msg.sender === 'user' ? 'text-right text-blue-600' : 'text-left text-gray-800'}>
            {msg.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力..."
        className="border rounded-lg p-2 w-3/4"
      />
      <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
        送信
      </button>

      <p className="mt-4 text-sm text-gray-500">
        © Polaris Works – powered by OpenAI
      </p>
    </main>
  );
}