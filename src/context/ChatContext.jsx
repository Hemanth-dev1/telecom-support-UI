import { createContext, useContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const generateSessionId = () =>
  `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to Lumina Mobile. I'm your concierge — I can help with plans, renewals, data balance, and policy questions. What can I do for you today?",
      meta: ["WELCOME", "Dialogflow CX"],
    },
  ]);

  const [sessionId, setSessionIdState] = useState(
    () => localStorage.getItem("sessionId") || generateSessionId()
  );

  // Verified phone number (set when user shares their number)
  const [verifiedPhone, setVerifiedPhone] = useState(null);

  // Plan snapshot shown in AccountPanel
  const [accountData, setAccountData] = useState(null);

  const [systemStatus, setSystemStatus] = useState({
    gemini:     { label: "Gemini 1.5 Flash",    sub: "Reasoning & Synthesis",    state: "active", stat: "12ms"   },
    dialogflow: { label: "Dialogflow CX",        sub: "NLU Intent Routing",       state: "active", stat: "—"     },
    vertex:     { label: "Vertex AI Search",     sub: "Knowledge RAG",            state: "synced", stat: "Synced" },
    fastapi:    { label: "FastAPI · Cloud Run",  sub: "Subscriber Middleware",     state: "active", stat: "Stable" },
    firestore:  { label: "Firestore",            sub: "Subscriber Database",       state: "idle",   stat: "—"     },
  });

  useEffect(() => {
    if (sessionId) localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  const addMessage = (message) => {
    setMessages((prev) => {
      if (message.removeId) return prev.filter((m) => m.id !== message.removeId);
      return [...prev, message];
    });
  };

  const setSessionId = (id) => setSessionIdState(id);

  const resetSession = () => {
    const newId = generateSessionId();
    setSessionIdState(newId);
    localStorage.setItem("sessionId", newId);
    setVerifiedPhone(null);
    setAccountData(null);
    setMessages([
      {
        sender: "bot",
        text: "Welcome to Lumina Mobile. I'm your concierge — I can help with plans, renewals, data balance, and policy questions. What can I do for you today?",
        meta: ["WELCOME", "Dialogflow CX"],
      },
    ]);
    setSystemStatus((prev) => ({
      ...prev,
      dialogflow: { ...prev.dialogflow, stat: "—" },
      firestore:  { ...prev.firestore,  state: "idle", stat: "—" },
    }));
  };

  // Called when we detect a phone number or "Verified" in bot reply
  const verifyPhone = (phone) => {
    setVerifiedPhone(phone);
    setSystemStatus((prev) => ({
      ...prev,
      firestore: { ...prev.firestore, state: "active", stat: "Linked" },
    }));
  };

  const updateDialogflowStat = (ms) => {
    setSystemStatus((prev) => ({
      ...prev,
      dialogflow: { ...prev.dialogflow, stat: ms },
    }));
  };

  return (
    <ChatContext.Provider
      value={{
        messages, addMessage,
        sessionId, setSessionId,
        resetSession,
        verifiedPhone, verifyPhone,
        accountData, setAccountData,
        systemStatus, updateDialogflowStat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}