import Chat from "./Chat";
import ChatSettings from "./ChatSettings";

function ChatScreen() {
  return (
    <div className="flex h-full w-full bg-white">
      <div className="w-full flex flex-col items-center">
        <Chat />
      </div>
      <div className="hidden lg:block w-[400px]">
        <ChatSettings />
      </div>
    </div>
  );
}

export default ChatScreen;
