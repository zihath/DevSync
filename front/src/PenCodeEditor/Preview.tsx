import React from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js }) => {
  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  return (
    <div className="flex-1 border-l-2 border-gray-800 m-2 rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-2 border-b border-gray-300 font-bold text-sm">Preview</div>
      <iframe
        className="w-full h-96 border-none bg-white"
        srcDoc={srcDoc}
        title="Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
