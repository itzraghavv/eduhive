import { ChatBox } from "@/components/chat-box";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 ">Chat with AI</h1>
      </div>

      <div>
        <ChatBox></ChatBox>
      </div>
    </div>
  );
}
