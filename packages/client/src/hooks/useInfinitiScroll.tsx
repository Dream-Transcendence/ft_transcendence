import { useCallback, useRef } from 'react';

function useInfiniteScroll(fetchMore: () => any, fetchMore2?: () => any) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const firstItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        ([entries]) => {
          if (entries.isIntersecting) {
            // fetch를 하기위한 callback
            fetchMore();
            // fetchMore2();
          }
        },
        { threshold: 1 },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [fetchMore],
  );

  return {
    firstItemRef,
  };
}

export default useInfiniteScroll;
