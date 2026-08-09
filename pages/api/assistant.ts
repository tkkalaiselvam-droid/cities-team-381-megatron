import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const prompt = req.body?.prompt;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY." });
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
    return res.status(response.status).json({ error: message });
  }

  const text =
    data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || "No response from Gemini.";

  return res.status(200).json({ text });
}
