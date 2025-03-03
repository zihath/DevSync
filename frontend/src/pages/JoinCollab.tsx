import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Button } from "@/Component/ui/button";
import { Card, CardContent } from "@/Component/ui/card";
import { Input } from "@/Component/ui/input";
import { Label } from "@/Component/ui/label";

const JoinAsCollaborator = () => {
  const [fileId, setFileId] = useState<string>("");
  const { user } = useUser();
  const userId = user?.id;

  const { getToken } = useAuth();
  const [message, setMessage] = useState<string>("");

  const handleJoin = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(""); // Reset message

    if (!fileId || !userId) {
      setMessage("Please enter both File ID and User ID.");
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/files/join", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileId, userId }),
      });

      const data = await response.json();
      setMessage(response.ok ? data.message || "Joined successfully!" : data.message || "Failed to join.");
    } catch (error) {
      console.error("Error joining:", error);
      setMessage("An error occurred while joining.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Join as Collaborator</h2>
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardContent>
          <form onSubmit={handleJoin} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="fileId">File ID</Label>
              <Input
                id="fileId"
                type="text"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Join</Button>
          </form>
          {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinAsCollaborator;
