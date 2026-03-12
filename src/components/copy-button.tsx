"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  value: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

export function CopyButton({ value, label, className, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} הועתק!`);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 cursor-pointer transition-colors hover:text-primary ${className ?? ""}`}
      title={`העתק ${label}`}
    >
      {children}
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  );
}
