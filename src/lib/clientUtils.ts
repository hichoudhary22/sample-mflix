import { RefObject, useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback(callback: Function, delay: number) {
  // preserving timerId across renders via useRef.
  const timerId = useRef<NodeJS.Timeout>();

  function preservedFunction(searchText: string) {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(later, delay);
    function later() {
      clearTimeout(timerId.current);
      callback(searchText);
    }
  }

  //  preserving the returned function acrosss renders via useCallback.
  return useCallback(preservedFunction, [callback, delay]);
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
