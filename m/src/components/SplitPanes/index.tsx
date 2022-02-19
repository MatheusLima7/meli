import React, { useState, useEffect } from 'react';
import { Container, HorizontalBar } from './Styles';

export type TDimensions = { x: number; y: number; };
export interface ISplitPanes {
  handlerChange?: (size: TDimensions) => void,
  setVisibility: (state: boolean) => void,
  defaultHeight: number,
  maxHeight: number,
  minHeight: number,
  children: any,
  open: boolean,
}

const SplitPanes = ({
  setVisibility,
  defaultHeight,
  handlerChange,
  minHeight,
  maxHeight,
  children,
  open,
}: ISplitPanes) => {
  const [initialSize, setInitialSize] = useState({ x: 0, y: defaultHeight });
  const [size, setSize] = useState<TDimensions>();
  const [starTDimensions, setStarTDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (open && size && size.y <= minHeight) {
      setInitialSize({ x: 0, y: defaultHeight });
      setStarTDimensions({ x: 0, y: 0 });
      setSize({
        x: initialSize.x,
        y: defaultHeight,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handlerDrag = (e: any) => {
    if (e.clientX || e.clientY) {
      const obtainedValue = initialSize.y + (starTDimensions.y - e.clientY);
      let newYSize = obtainedValue;

      if (obtainedValue > maxHeight || obtainedValue < minHeight) {
        newYSize = obtainedValue > maxHeight ? maxHeight : minHeight;
      }

      setSize({
        x: initialSize.x,
        y: newYSize,
      });

      if (!open && newYSize > minHeight) {
        setVisibility(true);
        setInitialSize({
          x: initialSize.x,
          y: minHeight,
        });
      }
    }
  };

  const handlerDragEnd = () => {
    if (!size) return;
    setInitialSize(size);
    if (handlerChange) handlerChange(size);
    if (size.y <= minHeight) setVisibility(false);
  };

  const geTDimensions = (e: any): TDimensions => ({ x: e.clientX, y: e.clientY });

  return (
    <Container
      data-testid="split-panes-container"
      style={{
        width: size?.x || '100%',
        height: size?.y || defaultHeight,
      }}
    >
      <HorizontalBar
        data-testid="horizontal-bar"
        onDragStart={(e: any) => setStarTDimensions(geTDimensions(e))}
        onDragEnd={handlerDragEnd}
        onDrag={handlerDrag}
        draggable="true"
      />
      {children}
    </Container>
  );
};

export default SplitPanes;
