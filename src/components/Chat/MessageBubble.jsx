export default function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  if (message.isLoading) {
    return (
      <div className="flex justify-start mb-2 msg-animate">
        <div
          style={{
            background: "#1a1a24",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            borderBottomLeftRadius: 4,
            padding: "14px 16px",
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
        >
          <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9898aa", display: "inline-block" }} />
          <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9898aa", display: "inline-block" }} />
          <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9898aa", display: "inline-block" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-2 msg-animate ${isUser ? "justify-end" : "justify-start"}`}>
      <div>
        <div
          style={{
            maxWidth: "72%",
            minWidth: 40,
            display: "inline-block",
            padding: "11px 16px",
            borderRadius: 16,
            borderBottomRightRadius: isUser ? 4 : 16,
            borderBottomLeftRadius:  isUser ? 16 : 4,
            fontSize: 15,
            lineHeight: 1.6,
            wordBreak: "break-word",
            ...(isUser
              ? { background: "#7c6af7", color: "#fff" }
              : {
                  background: "#1a1a24",
                  color: "#e8e8f0",
                  border: "1px solid rgba(255,255,255,0.07)",
                }),
          }}
        >
          {message.text.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Meta tags row */}
        {message.meta && (
          <div
            className={`flex items-center gap-1 mt-1 font-mono-dm ${isUser ? "justify-end" : "justify-start"}`}
            style={{ fontSize: 10.5, color: "#6b6b80", paddingLeft: 4 }}
          >
            {message.meta.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: "1px 5px",
                  borderRadius: 4,
                  background: "#18181f",
                  border: "1px solid rgba(255,255,255,0.07)",
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}