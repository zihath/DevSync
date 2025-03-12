import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { Trash2, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface EditorProps {
  language: string;
}

const Editor: React.FC<EditorProps> = ({ language = 'python' }) => {
  const [code, setCode] = useState('');
  const [latestCode, setLatestCode] = useState('');
  const [text, setText] = useState('');
  const [latestText, setLatestText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // This would be where you initialize your actual editor (Monaco, CodeMirror, etc.)
    // For now, let's create a simple textarea as a placeholder
    const textarea = document.createElement('textarea');
    textarea.className = 'w-full h-full p-4 bg-editor-background text-white font-mono resize-none focus:outline-none border-none';
    textarea.placeholder = `// Write your ${language} code here...`;
    
    textarea.addEventListener('input', (e) => {
      const target = e.target as HTMLTextAreaElement;
      setCode(target.value);
    });
    
    ref.current.appendChild(textarea);
    
    return () => {
      if (ref.current?.contains(textarea)) {
        ref.current.removeChild(textarea);
      }
    };
  }, [language]);

  const handleReset = () => {
    if (ref.current?.firstChild instanceof HTMLTextAreaElement) {
      ref.current.firstChild.value = '';
      setCode('');
      setLatestCode('');
      setText('');
      setLatestText('');
      toast.success('Editor reset successfully');
    }
  };

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col p-2 bg-editor-background rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-2 mb-2 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Code2 className="text-white/70" size={20} />
          <h1 className="text-white font-medium">
            {language && language.toUpperCase()} Editor
          </h1>
        </div>
        <Button 
          onClick={handleReset} 
          variant="ghost" 
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <Trash2 size={18} className="mr-1" />
          Reset
        </Button>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel 
          minSize={30} 
          defaultSize={60} 
          className="transition-all duration-300 ease-in-out"
        >
          <div
            ref={ref}
            className="w-full h-full overflow-auto rounded-lg border border-white/10"
          ></div>
        </ResizablePanel>

        <ResizableHandle className="bg-editor-panelBg w-1.5 transition-all duration-300 hover:bg-editor-accent" />

        <ResizablePanel 
          minSize={30} 
          defaultSize={40}
          className="transition-all duration-300 ease-in-out"
        >
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel 
              defaultSize={showInput ? 50 : 100}
              className="transition-all duration-300 ease-in-out"
            >
              <OutputPanel
                stdin={latestText}
                code={code}
                language={language}
              />
            </ResizablePanel>

            {showInput && (
              <>
                <ResizableHandle className="bg-editor-panelBg h-1.5 transition-all duration-300 hover:bg-editor-accent" />
                <ResizablePanel 
                  defaultSize={50}
                  className="transition-all duration-300 ease-in-out"
                >
                  <InputPanel setText={setText} />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>

          <Button
            onClick={() => setShowInput(!showInput)}
            variant="ghost"
            size="sm"
            className="absolute bottom-4 right-4 bg-editor-accent/90 hover:bg-editor-accent text-white rounded-full h-10 w-10 p-0 flex items-center justify-center shadow-lg z-10"
          >
            {showInput ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;