import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const DOT_COLORS = {
  active: { bg: "#22d68a", shadow: "0 0 6px #22d68a" },
  synced: { bg: "#4aaeff", shadow: "0 0 6px #4aaeff" },
  idle:   { bg: "#6b6b80", shadow: "none" },
};

export default function SystemStatus() {
  const { systemStatus, verifiedPhone } = useContext(ChatContext);

  const footerText = verifiedPhone
    ? "Session encrypted end-to-end. Subscriber context loaded from Firestore."
    : "Session encrypted end-to-end. Awaiting account verification.";

  return (
    <div
      style={{
        background: "#111118",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        overflow: "hidden",
        flex: 1,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "13px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span style={{ fontSize: 11, color: "#6b6b80" }}>◈</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6b80",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Intelligence Mesh
        </span>
      </div>

      {/* Service list */}
      <div style={{ padding: "6px 0" }}>
        {Object.entries(systemStatus).map(([key, svc]) => {
          const dot = DOT_COLORS[svc.state] || DOT_COLORS.idle;
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 16px",
                transition: "background 0.1s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#18181f")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Status dot */}
              <div
                style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: dot.bg,
                  boxShadow: dot.shadow,
                  flexShrink: 0,
                  ...(svc.state === "active" && key === "firestore" && verifiedPhone
                    ? { animation: "pulseGreen 2s ease infinite" }
                    : {}),
                }}
              />

              {/* Labels */}
              <div style={{ flex: 1, lineHeight: 1.3 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "#e8e8f0" }}>
                  {svc.label}
                </div>
                <div style={{ fontSize: 11, color: "#6b6b80" }}>{svc.sub}</div>
              </div>

              {/* Stat */}
              <div
                style={{
                  fontSize: 11,
                  color: "#6b6b80",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {svc.stat}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "11px 16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          fontSize: 12,
          color: "#6b6b80",
          fontStyle: "italic",
          lineHeight: 1.5,
        }}
      >
        {footerText}
      </div>
    </div>
  );
}