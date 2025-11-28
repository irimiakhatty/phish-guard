import { Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface ChatMessageProps {
  type: "user" | "bot";
  content: string | React.ReactNode;
  timestamp: string;
}

export function ChatMessage({ type, content, timestamp }: ChatMessageProps) {
  const isBot = type === "bot";

  return (
    <div className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      <Avatar className={`w-8 h-8 flex-shrink-0 ${isBot ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}>
        <AvatarFallback className={isBot ? "text-white" : "text-gray-600 dark:text-gray-300"}>
          {isBot ? <Shield className="w-4 h-4" /> : "Tu"}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col gap-1 max-w-[75%] ${!isBot && "items-end"}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${ 
            isBot
              ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
              : "bg-blue-500 dark:bg-blue-600 text-white"
          }`}
        >
          {typeof content === "string" ? (
            <p className="break-words">{content}</p>
          ) : (
            content
          )}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 px-2">{timestamp}</span>
      </div>
    </div>
  );
}