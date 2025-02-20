import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript"; // Add more languages as needed
import { Trash2 } from "lucide-react";

const FileDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const file = location.state?.file;

  const [content, setContent] = useState<string>(file?.content || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!file) {
    return <p className="text-center mt-4 text-red-500">No file data available</p>;
  }

  // Handle file update
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:3000/api/files/${file._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: file.name,
          content: content,
          language: file.language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Redirect back after successful update
      navigate("/DashBoard", { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{file.name}</h2>
      <p className="text-gray-500 mb-2">{file.language}</p>
      

      {/* CodeMirror Editor */}
      <CodeMirror
        value={content}
        extensions={[javascript(), EditorView.lineWrapping]}
        onChange={(value?: string) => setContent(value || "")}
        className="border p-2 rounded bg-gray-100"
      />

      <p className="text-sm text-gray-400 mt-2">
        Created At: {new Date(file.createdAt).toLocaleString()}
      </p>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">❌ {error}</p>}

      {/* Save Button */}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default FileDetails;
