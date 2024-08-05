import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyAndPaste = (text: string) => {
    copyToClipboard(text);
    setCopied(true);

    const copy = setTimeout(() => {
      setCopied(false);
    }, 1000);

    clearTimeout(copy);
  };
  return {
    copied,
    setCopied,
    copyAndPaste,
  };
};
export default useCopyToClipboard;
