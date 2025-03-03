import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { Button } from "@/Component/ui/button";
import { Card, CardContent } from "@/Component/ui/card";
import { Input } from "@/Component/ui/input";
import { ClipboardCopy } from "lucide-react";

interface AddCollaboratorProps {
  fileId: string;
}

const AddCollaborator: React.FC<AddCollaboratorProps> = ({ fileId }) => {
  const [showFileId, setShowFileId] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileId);
    alert("File ID copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={() => setShowFileId(true)}>Add Collaborator</Button>

      {showFileId && (
        <Card className="w-full max-w-md p-4 flex flex-col items-center space-y-3 shadow-lg">
          <CardContent className="flex items-center space-x-2 w-full">
            <Input value={fileId} readOnly className="text-center" />
            <Button onClick={handleCopy} size="icon" variant="outline">
              <ClipboardCopy className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddCollaborator;
