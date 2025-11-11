const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

document.getElementById("decodeBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  const output = document.getElementById("output");

  if (!input) {
    output.style.display = "block";
    output.innerHTML = "Please enter a message first.";
    return;
  }

  output.style.display = "block";
  output.innerHTML = "Decoding... 🔍";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at interpreting text messages. Explain clearly and casually what the message really means, in under 3 sentences. Have a professional but friendly tone and make it seem like you care. Include a percentage to show how positive you are that you're correct. Then provide some advice on what to do next.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim();

    output.innerHTML = result || "No response from AI.";
  } catch (err) {
    console.error(err);
    output.innerHTML =
      "Error decoding message. Check your API key or internet connection.";
  }
});
