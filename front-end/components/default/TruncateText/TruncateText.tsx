import { useState } from "react";

const TruncateText = ({ text, maxLength = 5 }: { text: string; maxLength?: number }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="relative group">
      <p
        className="truncate max-w-xs cursor-pointer hover:underline text-black"
        title={text}
        onClick={handleCopy}
      >
        {text.length > maxLength ? text.slice(0, maxLength) + "..." : text}
      </p>
      {isCopied && (
        <span className="absolute top-0 right-0 text-sm text-green-600">
          Copied!
        </span>
      )}
    </div>
  );
};

export default TruncateText;
