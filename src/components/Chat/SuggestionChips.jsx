const CHIPS = [
  { icon: "📋", label: "Check Plan",    text: "What plan am I on?" },
  { icon: "📊", label: "Data Balance",  text: "How much data do I have left?" },
  { icon: "🔄", label: "Renew",         text: "Renew my plan" },
  { icon: "⬆️", label: "Upgrade",       text: "Upgrade my plan" },
  { icon: "📄", label: "Refund Policy", text: "What is the refund policy?" },
];

export default function SuggestionChips({ onChipClick }) {
  return (
    <div
      className="flex flex-wrap gap-2 flex-shrink-0"
      style={{
        padding: "10px 16px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {CHIPS.map(({ icon, label, text }) => (
        <button
          key={label}
          onClick={() => onChipClick(text)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 14px",
            borderRadius: 20,
            background: "#18181f",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#9898aa",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#e8e8f0";
            e.currentTarget.style.borderColor = "#7c6af7";
            e.currentTarget.style.background = "rgba(124,106,247,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#9898aa";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.background = "#18181f";
          }}
        >
          <span style={{ fontSize: 11 }}>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
}