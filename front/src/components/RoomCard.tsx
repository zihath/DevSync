import {
  Calendar,
  FileText,
  Trash2,
  Share2,
  Users,
  ArrowRightCircle,
  Clock,
  User,
} from "lucide-react";

type Room = {
  roomId: string;
  fileName: string;
  language: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type FileCardsProps = {
  rooms: Room[];
  joinRoom: (formData: { room_id: string }) => Promise<void>;
  deleteRoom: (formData: { delete_room_id: string }) => Promise<void>;
};

type FileCardProps = {
  room: Room;
  joinRoom: (formData: { room_id: string }) => Promise<void>;
  deleteRoom: (formData: { delete_room_id: string }) => Promise<void>;
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

const FileCard: React.FC<FileCardProps> = ({ room, joinRoom, deleteRoom }) => {
  const handleJoinRoom = async () => {
    await joinRoom({ room_id: room.roomId });
  };

  const handleDeleteRoom = async () => {
    await deleteRoom({ delete_room_id: room.roomId });
  };

  return (
    <div className="group relative p-5 rounded-xl border border-gray-700 bg-black shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:bg-zinc-900/80 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* File Preview Section */}
      <div className="h-28 flex items-center justify-center rounded-lg bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <FileText
          size={32}
          className="text-gray-400 group-hover:text-gray-200 transition"
        />
      </div>

      {/* File Info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-100 truncate">
          {room.fileName}
        </h3>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <User size={14} className="mr-1" />
          <span className="truncate">{room.createdBy}</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <Calendar size={14} className="mr-1" />
          <span>Created: {formatDate(room.createdAt)}</span>
        </div>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <Clock size={14} className="mr-1" />
          <span>Last Updated: {formatDate(room.updatedAt)}</span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-4 flex justify-between items-center">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 shadow-md">
          {room.language.toUpperCase()}
        </span>
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
            onClick={handleJoinRoom}
          >
            <ArrowRightCircle
              size={18}
              className="text-gray-300 hover:text-gray-100"
            />
          </button>
          <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition">
            <Users size={18} className="text-gray-300 hover:text-gray-100" />
          </button>
          <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition">
            <Share2 size={18} className="text-gray-300 hover:text-gray-100" />
          </button>

          <button
            className="p-2 rounded-md bg-red-800 hover:bg-red-700 transition"
            onClick={handleDeleteRoom}
          >
            <Trash2 size={18} className="text-gray-300 hover:text-gray-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FileCards: React.FC<FileCardsProps> = ({
  rooms,
  joinRoom,
  deleteRoom,
}) => {
  if (rooms.length === 0) {
    return (
      <div className="p-6 min-h-screen text-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">My Files</h2>
        <p className="text-gray-400">No files found</p>
      </div>
    );
  }
  // console.log("files", files);
  return (
    <div className="p-6 min-h-screen text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-100">My Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {rooms.map((room, index) => (
          <FileCard
            key={room?.roomId || index}
            room={room}
            joinRoom={joinRoom}
            deleteRoom={deleteRoom}
          />
        ))}
      </div>
    </div>
  );
};

export default FileCards;
