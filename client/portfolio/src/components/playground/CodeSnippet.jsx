import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CodeSnippet({ code = "", language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto shadow">
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
