import { RefObject, useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback(callback: Function, delay: number) {
  const timerId = useRef<NodeJS.Timeout>();
  return useCallback(
    (searchText: string) => {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(later, delay);
      function later() {
        clearTimeout(timerId.current);
        callback(searchText);
      }
    },
    [callback, delay],
  );
}

export function useOutsideClickAlert(
  ref: RefObject<HTMLDivElement>,
  setShowOptionPanel: Function,
) {
  useEffect(() => {
    function checkClickPosition(e: MouseEvent) {
      if (
        // e.target instanceof HTMLElement &&
        ref?.current &&
        !ref?.current.contains(e.target as Node)
      ) {
        setShowOptionPanel(false);
      }
    }
    document.addEventListener("click", checkClickPosition);
    return () => {
      document.removeEventListener("click", checkClickPosition);
    };
  }, [ref, setShowOptionPanel]);
}
