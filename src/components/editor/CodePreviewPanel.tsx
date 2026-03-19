"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodePreviewPanelProps {
  code: string;
}

export function CodePreviewPanel({ code }: CodePreviewPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-card)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-light)]">
        <h3 className="text-sm font-bold">생성된 코드</h3>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-[var(--border-light)] text-[var(--text-3)] transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[var(--secondary)]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm font-code text-[var(--text-2)] whitespace-pre-wrap leading-relaxed">
          {code || "// 블록을 추가하면 여기에 코드가 나타납니다"}
        </pre>
      </div>
    </div>
  );
}
