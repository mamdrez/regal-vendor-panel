import { useEffect, useRef } from "react";

const useScrollToBottom = (dependencies: any[], behavior: any) => {
  const lastChatDataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastChatDataRef.current) {
      lastChatDataRef.current.scrollIntoView({ behavior: behavior });
    }
  }, dependencies);

  return lastChatDataRef;
};

export default useScrollToBottom;
