import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const prompt = body?.prompt;

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Missing prompt." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GEMINI_API_KEY." }, { status: 500 });
  }

  const apiHost = process.env.GEMINI_API_HOST ?? "https://api.openai.com/v1/chat/completions";

  const systemMessage = `You are Megatron, a city planning and sustainability agent. Decide the best action for the user and provide a clear, practical response. If more information is needed, ask a follow-up question and explain why. Respond as an agent that helps with smart city projects, climate resilience, community services, and local planning.`;

  const response = await fetch(apiHost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gemini-3.5",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error?.message || "Gemini API request failed.";
    return NextResponse.json({ error: message }, { status: response.status });
  }

  const text =
    data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "No response from Gemini.";

  return NextResponse.json({ text });
}
