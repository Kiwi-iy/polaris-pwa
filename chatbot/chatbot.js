const sendButton = document.getElementById("sendButton");
const inputBox = document.getElementById("inputBox");
const outputBox = document.getElementById("outputBox");

sendButton.addEventListener("click", async () => {
  const userInput = inputBox.value;
  outputBox.innerHTML += `<div class="user">${userInput}</div>`;

  // サーバー側APIを呼ぶ
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });

  const data = await response.json();
  const reply = data.reply;

  outputBox.innerHTML += `<div class="bot">${reply}</div>`;
});
