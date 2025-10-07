document.getElementById("sendButton").addEventListener("click", async () => {
  const input = document.getElementById("inputBox").value.trim();
  if (!input) return;

  const outputBox = document.getElementById("outputBox");
  outputBox.innerHTML += `<div class='user-msg'>👤 ${input}</div>`;
  document.getElementById("inputBox").value = "";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-xxxxx" // ← あなたのAPIキーを設定
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: input }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "エラーが発生しました。";
    outputBox.innerHTML += `<div class='bot-msg'>🤖 ${reply}</div>`;
    outputBox.scrollTop = outputBox.scrollHeight;
  } catch (e) {
    outputBox.innerHTML += `<div class='bot-msg error'>通信エラー</div>`;
  }
});
