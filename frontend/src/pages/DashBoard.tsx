import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Component/ui/button"; // Updated path for consistency
import CreateFile from "./CreateFile";
import JoinAsCollaborator from "./JoinCollab";

const DashBoard: React.FC = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showJoinForm, setShowJoinForm] = useState(false);

  const fetchFiles = async () => {
    if (!user?.id) {
      setError("User not logged in or authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:3000/api/files?ownerId=${user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchFiles();
    }
  }, [user]);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md space-y-4">
      <Button onClick={() => navigate("/CreateFile")} className="w-full">
        Create New File
      </Button>

      <h2 className="text-lg font-semibold">User Files</h2>

      <Button onClick={fetchFiles} disabled={loading} variant="outline" className="w-full">
        {loading ? "Loading..." : "Fetch Files"}
      </Button>

      {error && <p className="text-red-600 text-sm">❌ {error}</p>}

      {data.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-2">
          {data.map((file) => (
            <Button
              key={file._id}
              variant="outline"
              onClick={() => navigate(`/file/${file._id}`, { state: { file } })}
              className="w-full justify-start text-left"
            >
              <span className="font-semibold">{file.name}</span> - <span className="text-blue-500">{file.language}</span>
            </Button>
          ))}
        </div>
      )}

      <Button onClick={() => setShowJoinForm(true)} variant="secondary" className="w-full">
        Join a Room
      </Button>

      {showJoinForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowJoinForm(false)}>
              ✖
            </button>
            <JoinAsCollaborator />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
