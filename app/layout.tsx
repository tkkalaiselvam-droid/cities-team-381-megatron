import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Megatron City Agent",
  description: "Front end for the Gemini 3.5 city decision agent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
