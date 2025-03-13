import {
  Code2,
  Trash2,
  MessageSquare,
  Sparkles,
  Users,
  Settings,
  Code,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  FileName: string;
  language: string;
  handleReset: () => void;
  isDrawingMode: boolean;
  toggleDrawingMode: () => void;
}

const LiveCodeHeader = ({
  FileName,
  language,
  handleReset,
  isDrawingMode,
  toggleDrawingMode,
}: HeaderProps) => {
  const icons = [
    { icon: <MessageSquare size={20} />, text: "Chat" },
    { icon: <Sparkles size={20} />, text: "Magic AI" },
    { icon: <Users size={20} />, text: "Collaborators" },
    { icon: <Settings size={20} />, text: "Settings" },
    {
      icon: isDrawingMode ? <Code size={20} /> : <PenTool size={20} />,
      text: isDrawingMode ? "Code Mode" : "Drawing Mode",
      onClick: toggleDrawingMode,
    },
  ];

  return (
    <div className="flex justify-between items-center p-2 mb-2 border-b border-white/10">
      {/* Left Section - File Name */}
      <div className="flex items-center space-x-3">
        <Code2 className="text-white/70" size={20} />
        <h1 className="text-white font-medium">{`${FileName}.${language}`}</h1>
      </div>

      {/* Center Section - Toolbar Icons */}
      <div className="flex space-x-4">
        {icons.map((item, index) => (
          <div key={index} className="relative group">
            {/* Icon Button */}
            <div
              className="p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
              onClick={toggleDrawingMode}
            >
              {item.icon}
            </div>
            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[10] z-10 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded-md px-2 py-1 transition-opacity">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Right Section - Reset Button */}
      <Button
        onClick={handleReset}
        variant="ghost"
        className="text-white/70 hover:text-white hover:bg-white/10"
      >
        <Trash2 size={18} className="mr-1" />
        Reset
      </Button>
    </div>
  );
};

export default LiveCodeHeader;
