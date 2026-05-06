const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_KEY  = import.meta.env.VITE_API_KEY  || "";

/**
 * Send a message to the backend /chat endpoint.
 *
 * Returns:
 *   {
 *     reply:           string,          // joined human-readable text
 *     session_id:      string,
 *     end_session:     boolean,
 *     intent:          string,          // e.g. "check.plan"
 *     confidence:      number,
 *     subscriber_data: object | null,   // structured account snapshot
 *   }
 */
export async function sendMessage(message, sessionId = null) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (API_KEY) headers["X-API-Key"] = API_KEY;

    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message, session_id: sessionId }),
    });

    // Surface HTTP errors with status code for better debugging
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${body.detail || response.statusText}`);
    }

    const data = await response.json();

    if (!data.reply || !Array.isArray(data.reply)) {
      throw new Error("Invalid response structure from server.");
    }

    const replyText =
      data.reply.length > 0
        ? data.reply.join("\n").trim()
        : "I'm sorry, I didn't get a response. Please try again.";

    return {
      reply:           replyText,
      session_id:      data.session_id      ?? sessionId,
      end_session:     data.end_session      ?? false,
      intent:          data.intent           ?? "",
      confidence:      data.confidence       ?? 0,
      subscriber_data: data.subscriber_data  ?? null,
    };

  } catch (err) {
    // Network failure (no connection, CORS, etc.)
    if (err instanceof TypeError) {
      return {
        reply:           "Network error. Is the backend running?",
        session_id:      sessionId,
        end_session:     false,
        intent:          "",
        confidence:      0,
        subscriber_data: null,
      };
    }

    // HTTP or parse errors
    const isTimeout = err.message.includes("504");
    return {
      reply:           isTimeout
        ? "The request timed out. Please try again."
        : `Server error: ${err.message}`,
      session_id:      sessionId,
      end_session:     false,
      intent:          "",
      confidence:      0,
      subscriber_data: null,
    };
  }
}

export const getAccountData = async () => {
  // TODO: Implement API call
};

export const getSystemStatus = async () => {
  // TODO: Implement API call
};
