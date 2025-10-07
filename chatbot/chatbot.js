// chatbot.js

const sendButton = document.getElementById("sendButton");
const inputBox = document.getElementById("inputBox");
const outputBox = document.getElementById("outputBox");

sendButton.addEventListener("click", async () => {
  const userInput = inputBox.value;
  if (!userInput) return;

  // ユーザーの発言を表示
  outputBox.innerHTML += `<div class="user-msg">${userInput}</div>`;

  // サーバー側APIに送信
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });

  const data = await response.json();
  const reply = data.reply;

  // ボットの返答を表示
  outputBox.innerHTML += `<div class="bot-msg">${reply}</div>`;

  // 入力欄をクリア
  inputBox.value = "";
});
