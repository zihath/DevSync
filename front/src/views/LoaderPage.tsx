import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const LoaderPage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed bg-black inset-0 flex items-center justify-center z-50",
        className
      )}
    >
      <Loader className="size-10 text-white animate-spin object-cover" />
    </div>
  );
};

export default LoaderPage;
