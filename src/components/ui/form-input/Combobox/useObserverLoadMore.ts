import { useCallback, useRef } from "react";

interface Props {
  enableFetchNextPage?: boolean;
  fetchNextPage?: () => void;
}

export const useObserverLoadMore = ({
  fetchNextPage,
  enableFetchNextPage,
}: Props) => {
  const intObserver = useRef<IntersectionObserver | null>(null);

  const setObserverRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enableFetchNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && enableFetchNextPage) {
          fetchNextPage?.();
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [enableFetchNextPage, fetchNextPage]
  );

  return setObserverRef;
};
