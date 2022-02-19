import { useEffect, useRef } from 'react';

type IntervalFunction = () => unknown | void;

const useInterval = (callback: IntervalFunction, delay: number): void => {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    const tick = (): void => {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);
    return (): any => clearInterval(id);
  }, [delay]);
};

export default useInterval;
