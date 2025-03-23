import React from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
  heightClass?: string; // optional prop for height styling
}

const Preview: React.FC<PreviewProps> = ({ html, css, js, heightClass = "h-96" }) => {
  const injectedCSS = `
    body {
      margin: 0;
      overflow: hidden; /* Hide scrollbars */
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

  return (
    <div className="w-full overflow-hidden">
      <iframe
        className={`w-full ${heightClass} border-none`} // heightClass applied here
        srcDoc={srcDoc}
        title="Preview"
        sandbox="allow-scripts"
        scrolling="no" 
      />
    </div>
  );
};

export default Preview;
