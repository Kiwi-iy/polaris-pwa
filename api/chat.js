export default async function handler(req, res) {
  try {
    const { message } = await req.json();
    console.log("ユーザーの入力:", message);

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
    console.log("OpenAIの返答:", data);

    if (!data.choices || !data.choices[0]) {
      throw new Error("OpenAIから適切な返答がありません");
    }

    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("APIエラー:", error);
    res.status(500).json({ reply: "エラーが発生しました。" });
  }
}
