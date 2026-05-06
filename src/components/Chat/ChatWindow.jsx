import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageBubble from "./MessageBubble";
import SuggestionChips from "./SuggestionChips";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const { messages, verifiedPhone } = useContext(ChatContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChipClick = (text) => {
    window.dispatchEvent(new CustomEvent("chip-click", { detail: text }));
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: "#111118",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
      }}
    >
      {/* Chat header */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* SVG Avatar */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "linear-gradient(135deg, #1e1e28, #2a2a3a)",
              border: "1px solid rgba(124,106,247,0.3)",
              boxShadow: "0 0 14px rgba(124,106,247,0.15)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.1A7 7 0 0 1 5.1 14H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5z"
                stroke="#a594ff" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M9 10h.01M15 10h.01" stroke="#a594ff" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M9.5 13.5s.8 1.5 2.5 1.5 2.5-1.5 2.5-1.5" stroke="#a594ff" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M8 19.5l1-3.5m7 3.5-1-3.5" stroke="#7c6af7" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M6 19.5h12" stroke="#7c6af7" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="leading-tight">
            <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e8f0" }}>
              Aria
            </div>
            <div className="font-mono-dm uppercase tracking-wider" style={{ fontSize: 10.5, color: "#6b6b80" }}>
              Powered by Gemini · Dialogflow CX
            </div>
          </div>
        </div>

        {/* Session badge */}
        {verifiedPhone ? (
          <div
            className="flex items-center gap-2 font-mono-dm"
            style={{
              padding: "6px 13px", borderRadius: 20,
              border: "1px solid rgba(34,214,138,0.3)",
              background: "rgba(34,214,138,0.08)",
              fontSize: 12, color: "#22d68a",
            }}
          >
            <div
              className="pulse-green"
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#22d68a" }}
            />
            {verifiedPhone}
          </div>
        ) : (
          <div
            className="flex items-center gap-2 font-mono-dm"
            style={{
              padding: "6px 13px", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: 12, color: "#9898aa",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#6b6b80" }} />
            Guest session
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-1" style={{ padding: "18px 20px" }}>
        {messages.map((msg, i) => (
          <MessageBubble key={msg.id || i} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Chips */}
      <SuggestionChips onChipClick={handleChipClick} />

      {/* Input */}
      <ChatInput />
    </div>
  );
}