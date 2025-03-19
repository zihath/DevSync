import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSaveProjectOnExit = (projectId: string, html: string, css: string, js: string): void => {
  const navigate = useNavigate();

  useEffect(() => {
    const saveProject = async (): Promise<void> => {
      try {
        await fetch(`http://localhost:3000/api/projects/edit-content/${projectId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ html, css, js })
        });
      } catch (error) {
        console.error("Error saving project: ", error);
      }
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "hidden") {
        saveProject();
      }
    };

    const handleBeforeUnload = (): void => {
      saveProject();
    };

    const handlePopState = (): void => {
      saveProject();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [projectId, html, css, js]);
};

export default useSaveProjectOnExit;
