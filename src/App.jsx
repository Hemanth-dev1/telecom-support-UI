import MainLayout from "./components/Layout/MainLayout";
import { ChatProvider } from "./context/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <MainLayout />
    </ChatProvider>
  );
}
