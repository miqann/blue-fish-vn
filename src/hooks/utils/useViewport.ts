import { useEffect, useState } from "react";
import { debounce } from "lodash-es";

const useViewport = ({ dbTime = 800 }: { dbTime?: number }) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const resizeDebounce = debounce(handleResize, dbTime);

    window.addEventListener("resize", resizeDebounce);

    return () => window.removeEventListener("resize", resizeDebounce);
  }, [dbTime]);

  return {
    width: dimensions.width,
    height: dimensions.height,
    isDesktop: dimensions.width >= 1024,
  };
};

export default useViewport;
