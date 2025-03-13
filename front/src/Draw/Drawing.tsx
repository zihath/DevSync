import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
const Drawing = () => {
  return (
    <div className="h-full w-full">
      <Excalidraw theme="dark" />
    </div>
  );
};

export default Drawing;
