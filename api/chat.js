// polaris-pwa/api/chat.js

export default async function handler(req, res) {
  try {
    const { message } = await req.json();

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "あなたは優しいチャットボットです。" },
          { role: "user", content: message }
        ]
      })
    });

    const data = await openaiResponse.json();
    const reply = data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "エラーが発生しました。" });
  }
}
