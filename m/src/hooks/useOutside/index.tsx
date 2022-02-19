import { useCallback } from 'react';

const useOutside = (ref: any, useRef?: boolean) => {
  const listen = useCallback(
    (func) => {
      function handleClickOutside(event: any) {
        if (func && ref.current && !ref.current.contains(event.target)) {
          func();
        }
      }

      if (useRef) {
        if (ref?.current) {
          ref.current.addEventListener('mousedown', handleClickOutside);
          ref.current.addEventListener('mouseup', handleClickOutside);
        }
      } else {
        window.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('mouseup', handleClickOutside);
      }
      return () => {
        (useRef ? ref.current : window).removeEventListener('mousedown', handleClickOutside);
        (useRef ? ref.current : window).removeEventListener('mouseup', handleClickOutside);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref],
  );

  return { listen };
};

export default useOutside;
