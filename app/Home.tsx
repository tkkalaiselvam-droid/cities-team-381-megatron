"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = { role: "user", text: prompt.trim() };
    setMessages((current) => [...current, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to reach Gemini agent.");
      }

      const assistantMessage: Message = {
        role: "assistant",
        text: result.text || "Gemini did not return a response.",
      };
      setMessages((current) => [...current, assistantMessage]);
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <h1>Megatron City Agent</h1>
        <p>
          Ask Gemini 3.5 to decide the best next step for your city project,
          sustainability plan, or community solution.
        </p>
      </section>

      <form className="prompt-form" onSubmit={handleSubmit}>
        <label htmlFor="prompt">Ask the Gemini city agent:</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: Help me design a climate resilience plan for our city."
          rows={5}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Send to Gemini"}
        </button>
      </form>

      {error ? <div className="error-box">Error: {error}</div> : null}

      <section className="chat-window">
        {messages.length === 0 ? (
          <div className="empty-state">Start by asking the agent a city planning question.</div>
        ) : (
          messages.map((message, idx) => (
            <div
              key={idx}
              className={message.role === "assistant" ? "message assistant" : "message user"}
            >
              <span className="message-label">
                {message.role === "assistant" ? "Gemini 3.5" : "You"}
              </span>
              <p>{message.text}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
