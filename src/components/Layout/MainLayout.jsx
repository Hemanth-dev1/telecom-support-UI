import Header from "./Header";
import ChatWindow from "../Chat/ChatWindow";
import AccountPanel from "../Dashboard/AccountPanel";
import SystemStatus from "../Dashboard/SystemStatus";

export default function MainLayout() {
  return (
    <div className="relative z-10 flex flex-col h-screen">
      <Header />
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* Chat — 8 cols */}
        <div className="col-span-8 flex flex-col overflow-hidden">
          <ChatWindow />
        </div>
        {/* Dashboard — 4 cols */}
        <div className="col-span-4 flex flex-col gap-3 overflow-y-auto">
          <AccountPanel />
          <SystemStatus />
        </div>
      </div>
    </div>
  );
}