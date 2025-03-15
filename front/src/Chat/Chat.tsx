import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Helper for conditional class names

interface ChatBubbleProps {
  message: string;
  time: string;
  isSentByUser: boolean;
  avatar?: string;
}

const ChatBubble = ({
  message,
  time,
  isSentByUser,
  avatar,
}: ChatBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-end space-x-2 w-300px h-600px",
        isSentByUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar for received messages */}
      {!isSentByUser && avatar && (
        <img src={avatar} alt="User" className="w-8 h-8 rounded-full" />
      )}

      <div
        className={cn(
          "p-3 max-w-xs sm:max-w-md text-sm rounded-xl shadow-md",
          isSentByUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-purple-600 text-white rounded-bl-none"
        )}
      >
        <p>{message}</p>
        {/* <span className="text-xs text-white/70 block text-right">{time}</span> */}
      </div>

      {/* Spacer for sent messages */}
      {isSentByUser && avatar && (
        <img src={avatar} alt="User" className="w-8 h-8 rounded-full" />
      )}
    </motion.div>
  );
};

export default ChatBubble;
