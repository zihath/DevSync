import { Calendar, FileText } from "lucide-react";

type FileCardProps = {
  filename: string;
  fileType: string;
  createdAt: string;
};

type FileCardsProps = {
  files: FileCardProps[];
};

const languageConfig: Record<
  string,
  { color: string; bgColor: string; icon: string }
> = {
  html: { color: "text-orange-400", bgColor: "bg-orange-900/30", icon: "🌐" },
  css: { color: "text-blue-400", bgColor: "bg-blue-900/30", icon: "🎨" },
  javascript: {
    color: "text-yellow-300",
    bgColor: "bg-yellow-900/30",
    icon: "⚡",
  },
  python: { color: "text-blue-300", bgColor: "bg-blue-900/30", icon: "🐍" },
  docker: { color: "text-blue-300", bgColor: "bg-blue-900/30", icon: "🐳" },
  json: { color: "text-gray-300", bgColor: "bg-gray-800/50", icon: "📋" },
  typescript: { color: "text-blue-400", bgColor: "bg-blue-900/30", icon: "📘" },
  java: { color: "text-red-400", bgColor: "bg-red-900/30", icon: "☕" },
  cpp: { color: "text-purple-400", bgColor: "bg-purple-900/30", icon: "⚙️" },
  csharp: { color: "text-green-400", bgColor: "bg-green-900/30", icon: "🔷" },
  ruby: { color: "text-red-500", bgColor: "bg-red-900/30", icon: "💎" },
  php: { color: "text-indigo-400", bgColor: "bg-indigo-900/30", icon: "🐘" },
  go: { color: "text-cyan-400", bgColor: "bg-cyan-900/30", icon: "🐹" },
  rust: { color: "text-orange-500", bgColor: "bg-orange-900/30", icon: "🦀" },
  default: { color: "text-gray-300", bgColor: "bg-gray-800/50", icon: "📄" },
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const FileCard: React.FC<FileCardProps> = ({
  filename,
  fileType,
  createdAt,
}) => {
  const config = languageConfig[fileType] || languageConfig.default;

  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
      <div
        className={`h-40 flex items-center justify-center ${config.bgColor}`}
      >
        <div className="text-6xl">{config.icon}</div>
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-semibold ${config.color} mb-2 truncate`}>
          {filename}
        </h3>
        <div className="flex items-center text-gray-400 text-xs">
          <Calendar size={14} className="mr-1" />
          <span>Created: {formatDate(createdAt)}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
          >
            {fileType.toUpperCase()}
          </span>
          <button className="text-gray-400 hover:text-gray-200">
            <FileText size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FileCards: React.FC<FileCardsProps> = ({ files }) => {
  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">My Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {files.map((file, index) => (
          <FileCard key={index} {...file} />
        ))}
      </div>
    </div>
  );
};

export default FileCards;
