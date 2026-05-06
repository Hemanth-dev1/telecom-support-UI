import { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { sendMessage } from "../../services/api";

export default function ChatInput() {
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);

  const {
    addMessage, messages, sessionId, setSessionId,
    resetSession, verifyPhone, setAccountData, updateDialogflowStat,
  } = useContext(ChatContext);

  const handleSend = async (textOverride) => {
    const text = (textOverride || input).trim();
    if (!text || loading) return;

    setLoading(true);
    setInput("");

    const isFirst          = messages.filter((m) => m.sender === "user").length === 0;
    const effectiveSession = isFirst ? null : sessionId;

    // Detect phone in user message for session badge only
    const phoneMatch = text.match(/\+?\d{10,13}/);
    if (phoneMatch) {
      const p = phoneMatch[0];
      verifyPhone(p.startsWith("+") ? p : "+" + p);
    }

    addMessage({ sender: "user", text });
    const typingId = `typing-${Date.now()}`;
    addMessage({ id: typingId, sender: "bot", text: "", isLoading: true });

    const t0 = Date.now();

    try {
      const result = await sendMessage(text, effectiveSession);
      updateDialogflowStat(`${Date.now() - t0}ms`);

      addMessage({ removeId: typingId });
      addMessage({ sender: "bot", text: result.reply, meta: ["FastAPI · Cloud Run"] });

      // Structured data from backend — no regex needed
      if (result.subscriber_data) {
        const sd = result.subscriber_data;
        if (sd.phone) verifyPhone(sd.phone);
        setAccountData({
          plan:      sd.plan          ?? null,
          renewal:   sd.renewal_date  ?? null,
          status:    sd.status        ?? null,
          dataUsed:  sd.data_used_gb  ?? null,
          dataTotal: sd.total_data_gb ?? null,
          name:      sd.name          ?? null,
        });
      }

      if (result.session_id && result.session_id !== sessionId) setSessionId(result.session_id);
      if (result.end_session) setTimeout(resetSession, 2500);

    } catch {
      updateDialogflowStat("err");
      addMessage({ removeId: typingId });
      addMessage({ sender: "bot", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (e) => handleSend(e.detail);
    window.addEventListener("chip-click", handler);
    return () => window.removeEventListener("chip-click", handler);
  }, [sessionId, loading]);

  return (
    <div
      className="flex items-center gap-3 flex-shrink-0"
      style={{
        padding: "13px 16px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <input
        style={{
          flex: 1,
          background: "#18181f",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: "11px 17px",
          color: "#e8e8f0",
          fontSize: 15,
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          transition: "border-color 0.15s",
        }}
        placeholder="Ask about your plan, renewals, or policies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
        onFocus={(e)  => (e.target.style.borderColor = "#7c6af7")}
        onBlur={(e)   => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
        disabled={loading}
      />
      <button
        onClick={() => handleSend()}
        disabled={loading}
        style={{
          padding: "11px 22px", borderRadius: 12,
          border: "none",
          background: loading ? "rgba(124,106,247,0.45)" : "#7c6af7",
          color: "#fff",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { if (!loading) e.target.style.background = "#a594ff"; }}
        onMouseLeave={(e) => { if (!loading) e.target.style.background = "#7c6af7"; }}
      >
        {loading ? "···" : "Send ↗"}
      </button>
    </div>
  );
}