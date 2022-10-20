import { useCallback, useRef } from 'react';

//node를 check하기 위해 콜백으로 선언
//observerRef를 node로 설정한 뒤, 관측시도
//observerRef로 설정한  node가 뷰포인트에 option만큼 나타나면 콜백함수 호출
function useInfiniteScroll(dataFetch: () => any) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const firstItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        ([entries]) => {
          if (entries.isIntersecting) {
            dataFetch();
          }
        },
        { threshold: 1 },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [dataFetch],
  );

  return {
    firstItemRef,
  };
}

export default useInfiniteScroll;
