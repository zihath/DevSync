interface OutputPanelProps {
  code: string;
}

export const OutputPanel = ({ code }: OutputPanelProps) => {
  // console.log("Code", code);
  return (
    <div className="w-full h-full bg-[#282A36] text-white p-4">
      <h2 className="text-lg font-semibold mb-2">Live Code Output</h2>
      <pre className="whitespace-pre-wrap break-words">{code}</pre>
    </div>
  );
};
