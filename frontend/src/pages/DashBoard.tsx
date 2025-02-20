import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import CreateFile from "./CreateFile";
import { useNavigate } from "react-router-dom";
import { Button } from "../Component/ui/button" // Import shadcn Button component

const DashBoard: React.FC = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  // Optional: automatically fetch files when the user becomes available
  useEffect(() => {
    if (user?.id) {
      fetchFiles();
    }
  }, [user]);

  return (

    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">

    <button
      onClick={() => navigate("/CreateFile")}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Create New File
    </button>

      <h2 className="text-lg font-semibold mb-4">User Files</h2>

      <button onClick={fetchFiles} disabled={loading}>
        {loading ? "Loading...." : "Fetch Files"}
      </button>

      {error && <p className="mt-4 text-red-600">❌ {error}</p>}

      {data.length > 0 && (
        <div className="mt-4 p=2 border-t">


          {data.map((file) => (
            <div key={file._id} className="flex flex-col gap-2"> {/* Vertical layout with gap */}
              <Button
                variant="outline" // Use shadcn's Button component with outline variant
                onClick={() => navigate(`/file/${file._id}`, { state: { file } })}
                className="w-full text-left" // Full width and left-aligned text
              >
                <span className="font-semibold">{file.name}</span> -{" "}
                <span className="text-blue-500">{file.language}</span>
              </Button>
            </div>
          ))}

        </div>
      )}

      {/* <CreateFile /> */}
    </div>
  );
};

export default DashBoard;
