import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
  heightClass?: string; // optional prop for height styling
}

const Preview: React.FC<PreviewProps> = ({ html, css, js, heightClass = "h-full" }) => {
  const [loading, setLoading] = useState(true);

  const injectedCSS = `
    body {
      margin: 5;
      padding: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    * {
      box-sizing: border-box;
    }
  `;

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
        <style>${injectedCSS}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  useEffect(() => {
    // Simulate loading for smoothness
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [html, css, js]);

  return (
    <div className="w-full h-full bg-white overflow-hidden rounded-lg shadow-lg relative border-b">
      
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : null}
      
      <div className={`w-full ${heightClass}  border border-gray-600 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <iframe
          className="w-full h-full border-none bg-white"
          srcDoc={srcDoc}
          title="Preview"
          sandbox="allow-scripts"
          onLoad={() => setLoading(false)}
          style={{ overflow: 'hidden' }} // Hide scrollbar in the iframe
        />
      </div>
    </div>
  );
};

export default Preview;