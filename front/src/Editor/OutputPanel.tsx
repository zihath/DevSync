// import React, { useState } from "react";
// import axios from "axios";

// interface OutputPanelProps {
//   stdin?: string;
//   code?: string;
//   language?: string;
// }

// export const OutputPanel = ({ stdin, code, language }: OutputPanelProps) => {
//   const [output, setOutput] = useState<string>("");

//   const handleExecute = async () => {
//     // code = "print(1234)";
//     // console.log("code" , code);
//     // console.log("langua", language);
//     // console.log("Stdin", stdin);
//     const finalLanguage = language ?? "python";
//     try {
//       const response = await axios.post(
//         "https://emkc.org/api/v2/piston/execute",
//         {
//           language: finalLanguage,
//           version: "*",
//           files: [
//             {
//               name: finalLanguage === "main.txt", // Adjust for other languages as needed
//               content: code,
//             },
//           ],
//           stdin,
//         }
//       );
//       setOutput(response.data.run.output);
//       console.log(response.data);
//     } catch (error: any) {
//       console.error(
//         "Error executing code:",
//         error.response?.data || error.message
//       );
//       setOutput("Error executing code");
//     }
//   };

//   return (
//     <div className="relative p-4 bg-gray-800 border border-gray-700 rounded-lg">
//       <button
//         onClick={handleExecute}
//         className="absolute top-4 right-4 px-4 py-2 text-white font-semibold bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         Execute
//       </button>
//       <h2 className="mb-2 text-xl font-medium text-white">Output</h2>
//       <pre className="text-white whitespace-pre-wrap">{output}</pre>
//     </div>
//   );
// };

// export default OutputPanel;


// import React, { useState, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { cn } from '@/lib/utils';
// import { CheckCircle, XCircle, Copy, AlertTriangle, Play, LoaderCircle } from 'lucide-react';

// interface OutputPanelProps {
//   stdin: string;
//   code: string;
//   language: string;
//   className?: string;
// }

// interface ExecutionResult {
//   language: string;
//   version: string;
//   run: {
//     code: number;
//     output: string;
//     stderr: string;
//     stdout: string;
//     signal: null | string;
//   };
// }

// const OutputPanel: React.FC<OutputPanelProps> = ({ stdin, code, language, className }) => {
//   const [output, setOutput] = useState<string>('');
//   const [executing, setExecuting] = useState(false);
//   const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'warning'>('idle');
//   const outputRef = useRef<HTMLPreElement>(null);

//   const handleExecute = async () => {
//     if (!code.trim()) {
//       toast.error('Please enter some code to execute');
//       return;
//     }

//     setExecuting(true);
//     setStatus('idle');
//     setOutput('Executing...');

//     // Simulating API call for code execution
//     try {
//       // This is a mock implementation. In a real application, you would send a request to your backend
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock response data
//       const mockResult: ExecutionResult = {
//         language: language,
//         version: '3.10.0',
//         run: {
//           code: Math.random() > 0.7 ? 1 : 0, // Randomly simulate success/error
//           output: Math.random() > 0.7 ? 'Error: Something went wrong\n' : `${stdin}\n`,
//           stderr: Math.random() > 0.7 ? 'Traceback (most recent call last):\n  File "<stdin>", line 1\nSyntaxError: invalid syntax' : '',
//           stdout: Math.random() > 0.7 ? '' : `${stdin}\n`,
//           signal: null
//         }
//       };

//       handleExecutionResult(mockResult);
//     } catch (err) {
//       setOutput('Failed to execute code. Please try again.');
//       setStatus('error');
//       toast.error('Execution failed');
//     } finally {
//       setExecuting(false);
//     }
//   };

//   const handleExecutionResult = (result: ExecutionResult) => {
//     if (result.run.code !== 0 || result.run.stderr) {
//       setStatus(result.run.stderr.includes('SyntaxError') ? 'warning' : 'error');
//       setOutput(result.run.stderr || result.run.output || 'Execution failed');
//       toast.error('Code execution resulted in an error');
//     } else {
//       setStatus('success');
//       setOutput(result.run.stdout || result.run.output || 'No output');
//       toast.success('Code executed successfully');
//     }
//   };

//   const copyToClipboard = () => {
//     if (output && output !== 'Executing...') {
//       navigator.clipboard.writeText(output);
//       toast.success('Output copied to clipboard');
//     }
//   };

//   return (
//     <div className={cn("flex flex-col h-full", className)}>
//       <div className="flex items-center justify-between px-4 py-2 bg-editor-panelBg border-b border-white/10">
//         <div className="flex items-center space-x-2">
//           <h2 className="text-sm font-medium text-white/80">Output</h2>
//           {status === 'success' && <CheckCircle size={16} className="text-editor-success" />}
//           {status === 'error' && <XCircle size={16} className="text-editor-error" />}
//           {status === 'warning' && <AlertTriangle size={16} className="text-editor-warning" />}
//         </div>
//         <div className="flex space-x-2">
//           <Button 
//             onClick={copyToClipboard} 
//             size="sm" 
//             variant="ghost" 
//             className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
//             disabled={!output || executing || output === 'Executing...'}
//           >
//             <Copy size={16} />
//           </Button>
//           <Button
//             onClick={handleExecute}
//             size="sm"
//             className="h-8 bg-editor-accent hover:bg-editor-accent/90 text-white flex items-center space-x-1"
//             disabled={executing}
//           >
//             {executing ? (
//               <>
//                 <LoaderCircle size={16} className="animate-spin mr-1" />
//                 <span>Running</span>
//               </>
//             ) : (
//               <>
//                 <Play size={16} className="mr-1" />
//                 <span>Execute</span>
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//       <div className="flex-1 p-2 bg-editor-panelBg overflow-auto">
//         <pre 
//           ref={outputRef}
//           className={cn(
//             "p-3 rounded-md bg-editor-inputBg text-white/90 font-mono text-sm whitespace-pre-wrap border border-white/10 h-full overflow-auto",
//             status === 'success' && "border-l-4 border-l-editor-success",
//             status === 'error' && "border-l-4 border-l-editor-error",
//             status === 'warning' && "border-l-4 border-l-editor-warning"
//           )}
//         >
//           {output || 'Output will appear here...'}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default OutputPanel;

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Copy, AlertTriangle, Play, LoaderCircle } from 'lucide-react';

interface OutputPanelProps {
  stdin?: string;
  code?: string;
  language?: string;
  className?: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ stdin, code, language, className }) => {
  const [output, setOutput] = useState<string>('');
  const [executing, setExecuting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'warning'>('idle');
  const outputRef = useRef<HTMLPreElement>(null);

  const handleExecute = async () => {
    if (!code?.trim()) {
      toast.error('Please enter some code to execute');
      return;
    }

    setExecuting(true);
    setStatus('idle');
    setOutput('Executing...');

    const finalLanguage = language ?? 'python';
    try {
      const response = await axios.post(
        'https://emkc.org/api/v2/piston/execute',
        {
          language: finalLanguage,
          version: '*',
          files: [{ name: `main.${finalLanguage}`, content: code }],
          stdin,
        }
      );
      setOutput(response.data.run.output);
      setStatus(response.data.run.output ? 'success' : 'warning');
      toast.success('Code executed successfully');
    } catch (error: any) {
      console.error('Error executing code:', error.response?.data || error.message);
      setOutput('Error executing code');
      setStatus('error');
      toast.error('Execution failed');
    } finally {
      setExecuting(false);
    }
  };

  const copyToClipboard = () => {
    if (output && output !== 'Executing...') {
      navigator.clipboard.writeText(output);
      toast.success('Output copied to clipboard');
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <div className='flex items-center justify-between px-4 py-2 bg-editor-panelBg border-b border-white/10'>
        <div className='flex items-center space-x-2'>
          <h2 className='text-sm font-medium text-white/80'>Output</h2>
          {status === 'success' && <CheckCircle size={16} className='text-editor-success' />}
          {status === 'error' && <XCircle size={16} className='text-editor-error' />}
          {status === 'warning' && <AlertTriangle size={16} className='text-editor-warning' />}
        </div>
        <div className='flex space-x-2'>
          <Button 
            onClick={copyToClipboard} 
            size='sm' 
            variant='ghost' 
            className='h-8 px-2 text-white/70 hover:text-white hover:bg-white/10'
            disabled={!output || executing || output === 'Executing...'}
          >
            <Copy size={16} />
          </Button>
          <Button
            onClick={handleExecute}
            size='sm'
            className='h-8 bg-editor-accent hover:bg-editor-accent/90 text-white flex items-center space-x-1'
            disabled={executing}
          >
            {executing ? (
              <>
                <LoaderCircle size={16} className='animate-spin mr-1' />
                <span>Running</span>
              </>
            ) : (
              <>
                <Play size={16} className='mr-1' />
                <span>Execute</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className='flex-1 p-2 bg-editor-panelBg overflow-auto'>
        <pre 
          ref={outputRef}
          className={cn(
            'p-3 rounded-md bg-editor-inputBg text-white/90 font-mono text-sm whitespace-pre-wrap border border-white/10 h-full overflow-auto',
            status === 'success' && 'border-l-4 border-l-editor-success',
            status === 'error' && 'border-l-4 border-l-editor-error',
            status === 'warning' && 'border-l-4 border-l-editor-warning'
          )}
        >
          {output || 'Output will appear here...'}
        </pre>
      </div>
    </div>
  );
};

export default OutputPanel;
