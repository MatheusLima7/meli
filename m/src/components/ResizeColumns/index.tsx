import React, { useState, useEffect } from 'react';
import { VerticalBar } from './Styles';

export type TDimensions = { x: number; y: number; };
export interface IResizeColumns {
  handlerChange: (size: number) => void;
  handlerSubmit?: (size: number) => void;
  defaultWidth: number;
  minWidth: number;
}

const SAMPLING_MARGIN = 15;

const ResizeColumns = ({
  handlerChange,
  handlerSubmit,
  defaultWidth,
  minWidth,
}: IResizeColumns) => {
  const [initialSize, setInitialSize] = useState(defaultWidth);
  const [size, setSize] = useState(defaultWidth);
  const [count, setCount] = useState(0);
  const [starTDimensions, setStarTDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (defaultWidth) {
      setSize(defaultWidth);
      setInitialSize(defaultWidth);
    }
  }, [defaultWidth]);

  useEffect(() => {
    if (size && size !== initialSize) {
      handlerChange(size);
    }
  }, [size, initialSize, handlerChange]);

  const handlerDrag = (e: any) => {
    if (count < 1) {
      return setCount(count + 1);
    }
    if (e.clientX) {
      const leftDistance = starTDimensions.x - initialSize;
      const obtainedValue = Math.floor(e.clientX - leftDistance);
      let newXSize = obtainedValue;

      if (Math.abs(newXSize - size) > SAMPLING_MARGIN) {
        if (obtainedValue < minWidth) {
          newXSize = minWidth;
        }
        setSize(newXSize);
      }
    }
    return null;
  };

  const handlerDragEnd = () => {
    if (handlerSubmit && size && size !== initialSize) {
      handlerSubmit(size);
      setInitialSize(size);
      setCount(0);
    }
  };

  const geTDimensions = (e: any): TDimensions => ({ x: e.clientX, y: 0 });

  return (
    <VerticalBar
      onDragStart={(e: any) => setStarTDimensions(geTDimensions(e))}
      data-testid="vertical-bar"
      onDragEnd={handlerDragEnd}
      onDrag={handlerDrag}
      draggable="true"
    />
  );
};

export default ResizeColumns;
