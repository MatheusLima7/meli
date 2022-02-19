import { RefObject } from 'react';

const setRefs = (
  currentRef: RefObject<HTMLInputElement>,
  refs: RefObject<HTMLInputElement>[],
) => {
  const arr = refs;
  arr.push(currentRef);
  return arr;
};

type TRefFocus = {
  focus: () => void;
  setValidation: (validation: any) => void;
  ticker: string;
  value: number;
}

const setRefFocus = (index: number, refs: TRefFocus[]) => {
  refs[index]?.focus();
};

const setRowValidation = (index: number, validation: any, sameSideRef: any, otherSideRef: any) => {
  sameSideRef[index]?.setValidation(validation);
  otherSideRef[index]?.setValidation(validation);
};

export default {
  setRowValidation,
  setRefFocus,
  setRefs,
};
