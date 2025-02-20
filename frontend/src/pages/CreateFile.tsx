import { useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


const CreateFile: React.FC = () => {

  const navigate = useNavigate();
  const { user } = useUser(); // Get user details
  const { getToken } = useAuth(); // Get function to fetch the JWT
  const [formData, setFormData] = useState({
    name:"",
    content: "",
    language: "",
  });
  const [response, setResponse] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setResponse("User not authenticated");
      return;
    }

    try {
      // Get the JWT token from Clerk
      const token = await getToken();

      // Prepare the data to post
      const postData = {
        ownerId: user.id, // Clerk user ID
        ...formData,
      };

      // Send POST request with the token in the header
      const res = await axios.post("http://localhost:3000/api/files", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse(res.data.message);
    } catch (error: any) {
      setResponse("Error saving file");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Upload File</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <p className="text-gray-600">User: {user?.fullName || "Guest"}</p>


        <input
          type="text"
          name="name"
          placeholder="FileName"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="language"
          placeholder="Language (e.g., JavaScript, Python)"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="content"
          placeholder="Enter file content here..."
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {response && <p className="text-center text-green-600">{response}</p>}

      <button onClick={() => navigate(-1)}>🔙 Go Back</button>
    </div>
  );
};

export default CreateFile;
