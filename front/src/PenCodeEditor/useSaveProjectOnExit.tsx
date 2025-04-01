import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useSaveProjectOnExit = (projectId: string, html: string, css: string, js: string): void => {
  const location = useLocation();

  useEffect(() => {
    const saveProject = async (): Promise<void> => {
      try {
        await fetch(`https://devsync-taek.onrender.com/api/projects/edit-content/${projectId}`, {
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

    // Call saveProject when the component unmounts or before the location changes.
    return () => {
      saveProject();
    };
  }, [location.pathname, projectId, html, css, js]);
};

export default useSaveProjectOnExit;
