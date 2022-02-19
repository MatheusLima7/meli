import { useLayoutEffect } from 'react';

// eslint-disable-next-line no-useless-escape
const allowedKeys = (key: string) => !!key.match(/[\d\.\,]+/g);

const specialAllowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', '-'];

const useKeyboardEvent = (obj: any, ref: any): any => {
  const reference = ref?.current;
  useLayoutEffect(() => {
    const handler = (event: any) => {
      if (obj[event.key]) {
        obj[event.key](event);
      } else if (
        !allowedKeys(event.key)
            && !specialAllowedKeys.includes(event.key)
      ) {
        event.preventDefault();
        obj.Reset(event);
      }
    };

    if (reference) {
      reference.addEventListener('keydown', handler);
    }

    return () => {
      if (reference) {
        reference.removeEventListener('keydown', handler);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, obj]);
};

export default useKeyboardEvent;
