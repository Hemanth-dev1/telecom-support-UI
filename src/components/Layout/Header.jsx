import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export default function Header() {
  const { resetSession } = useContext(ChatContext);

  return (
    <header
      className="flex items-center justify-between flex-shrink-0"
      style={{
        height: "68px",
        padding: "0 28px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(9,9,15,0.88)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, #7c6af7 0%, #a594ff 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 18px rgba(124,106,247,0.4)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M1 12C3.5 6 8 3 12 3s8.5 3 11 9c-2.5 6-7 9-11 9S3.5 18 1 12z"
              stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" fill="#fff"/>
            <path d="M8 12c0-2.2 1.8-4 4-4m0 8c-2.2 0-4-1.8-4-4"
              stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          </svg>
        </div>
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#e8e8f0", letterSpacing: "-0.4px" }}>
            Aria
          </div>
          <div className="font-mono-dm" style={{ fontSize: 11, color: "#6b6b80", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Telecom AI Concierge
          </div>
        </div>
      </div>

      {/* Right side only */}
      <div className="flex items-center gap-3">
        {/* Cloud Run badge */}
        <div
          className="flex items-center gap-2 font-mono-dm"
          style={{
            padding: "6px 13px", borderRadius: 20,
            background: "#111118",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12, color: "#9898aa",
          }}
        >
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#22d68a", boxShadow: "0 0 6px #22d68a",
          }} />
          Cloud Run · asia-south1
        </div>

        {/* New Chat button */}
        <button
          onClick={resetSession}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "7px 16px", borderRadius: 10,
            background: "#111118",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#9898aa", fontSize: 13,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#e8e8f0";
            e.currentTarget.style.borderColor = "#7c6af7";
            e.currentTarget.style.background = "rgba(124,106,247,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#9898aa";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "#111118";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          New Chat
        </button>
      </div>
    </header>
  );
}