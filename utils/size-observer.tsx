import React, { useCallback, useEffect, useState } from "react";

interface ScrollValue {
  innerWidth: number;
}

export const SizeContext = React.createContext<ScrollValue>({
  innerWidth: 0,
});

interface SizeObserverProps {
  children: React.ReactNode;
}

const SizeObserver: React.FC<SizeObserverProps> = ({ children }) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const handleResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [innerWidth]);

  return (
    <SizeContext.Provider value={{ innerWidth }}>
      {children}
    </SizeContext.Provider>
  );
};

export default SizeObserver;
