import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, ClipboardCheck, Share2 } from "lucide-react";
import { toast } from "sonner";

type ShareDialogProps = {
  roomId: string;
  language: string;
  fileName: string;
};

const ShareDialog: React.FC<ShareDialogProps> = ({
  roomId,
  language,
  fileName,
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `/live-code/${roomId}?lang=${language}&filename=${fileName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + shareUrl);
    setCopied(true);

    toast.success("Link copied to clipboard!", {
      description: "You can now share it with others.",
      duration: 2000, // Toast disappears after 2 seconds
    });

    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition">
          <Share2 size={18} className="text-gray-300 hover:text-gray-100" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share Room</AlertDialogTitle>
          <AlertDialogDescription>
            Copy the link below and share it with others.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            value={window.location.origin + shareUrl}
            readOnly
            className="flex-1"
          />
          <Button onClick={handleCopy} variant="secondary">
            {copied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Close</Button>
          </AlertDialogTrigger>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShareDialog;
