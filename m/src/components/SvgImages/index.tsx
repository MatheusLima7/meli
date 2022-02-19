/* istanbul ignore file */
import React from 'react';
import { Icon } from './Styles';

export const SVGDownload = ({ color }: { color: string }) => (
  <Icon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7553 11.5H12.9258V5.75H11.7061V11.5H9.87652L12.3159 14.0556L14.7553 11.5ZM14.1455 5.75V7.02139H17.8045V15.985H6.82727V7.02139H10.4864V5.75H6.82727C6.15644 5.75 5.60757 6.325 5.60757 7.02778V15.9722C5.60757 16.675 6.15644 17.25 6.82727 17.25H17.8045C18.4754 17.25 19.0242 16.675 19.0242 15.9722V7.02778C19.0242 6.325 18.4754 5.75 17.8045 5.75H14.1455Z"
        fill={color}
      />
    </svg>
  </Icon>
);
export default SVGDownload;
