import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

function LockIcon() {
  return <span style={{ fontSize: 12, opacity: 0.4 }}>🔒</span>;
}

export default function AccountPanel() {
  const { verifiedPhone, accountData } = useContext(ChatContext);

  const cardStyle = {
    background: "#111118",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 18,
    overflow: "hidden",
    flexShrink: 0,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  };

  const labelStyle = {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#6b6b80",
    fontFamily: "'DM Mono', monospace",
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <span style={labelStyle}>Account</span>
        <LockIcon />
      </div>

      {!verifiedPhone ? (
        /* ── GUEST STATE ── */
        <>
          <div
            style={{
              padding: "22px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "#1e1e28",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#6b6b80" strokeWidth="1.6"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#6b6b80" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ fontSize: 13, color: "#6b6b80", lineHeight: 1.6, maxWidth: 200 }}>
              Ask Aria a question — once you share your registered number, your live account snapshot will appear here.
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {["Plan details", "Data usage", "Renewals & upgrades"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  fontSize: 13,
                  color: "#6b6b80",
                  cursor: "default",
                }}
              >
                {label}
                <LockIcon />
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ── VERIFIED STATE ── */
        <div style={{ padding: 16 }}>
          {/* Verified label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
              fontSize: 10,
              color: "#22d68a",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div
              className="pulse-green"
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d68a" }}
            />
            Verified Account
          </div>

          {/* Phone number */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.3px",
              color: "#e8e8f0",
              marginBottom: 14,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {verifiedPhone.replace(/(\+\d{2})(\d{5})(\d{5})/, "$1 $2 $3")}
          </div>

          {/* Plan card */}
          <div
            style={{
              background: "#18181f",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: 12,
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, color: "#e8e8f0" }}>
              {accountData?.plan || "—"}
            </div>
            <div style={{ fontSize: 12.5, color: "#9898aa" }}>
              {accountData?.renewal ? `Renews ${accountData.renewal}` : "No plan returned by backend."}
            </div>

            {/* Data bar */}
            {accountData?.dataUsed !== undefined && (
              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#9898aa",
                    marginBottom: 5,
                  }}
                >
                  <span>{accountData.dataUsed} GB used</span>
                  <span>{accountData.dataTotal} GB</span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: "#1e1e28",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, Math.round((accountData.dataUsed / accountData.dataTotal) * 100))}%`,
                      background: "linear-gradient(90deg, #7c6af7, #a594ff)",
                      borderRadius: 3,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick actions */}
          {[
            { label: "Data usage",          text: "How much data do I have left?" },
            { label: "Renewals & upgrades", text: "Renew my plan" },
          ].map(({ label, text }) => (
            <button
              key={label}
              onClick={() => window.dispatchEvent(new CustomEvent("chip-click", { detail: text }))}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 13px",
                borderRadius: 10,
                background: "#18181f",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#e8e8f0",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 6,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7c6af7";
                e.currentTarget.style.background = "rgba(124,106,247,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "#18181f";
              }}
            >
              {label}
              <span style={{ color: "#6b6b80", fontSize: 11 }}>→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}