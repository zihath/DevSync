import { useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/Component/ui/card";
import { Input } from "@/Component/ui/input";
import { Button } from "@/Component/ui/button";

const CreateFile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
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
      const token = await getToken();
      const postData = {
        ownerId: user.id,
        ...formData,
      };

      const res = await axios.post("http://localhost:3000/api/files", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error saving file");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center text-xl font-bold">
          Upload File
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">User: {user?.fullName || "Guest"}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="File Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              type="text"
              name="language"
              placeholder="Language (e.g., JavaScript, Python)"
              value={formData.language}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>

          {response && <p className="mt-3 text-center text-green-600">{response}</p>}

          <Button variant="outline" className="w-full mt-3" onClick={() => navigate(-1)}>
            🔙 Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFile;
