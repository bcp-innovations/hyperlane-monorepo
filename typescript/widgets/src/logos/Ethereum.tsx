import React, { SVGProps, memo } from 'react';

function _EthereumLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="-150 0 1100 1277.4"
      {...props}
    >
      <g fillRule="nonzero">
        <path fill="#343434" d="m392.1 0-8.6 29.1v844.6l8.6 8.6 392-231.8z" />
        <path fill="#8C8C8C" d="M392.1 0 0 650.5l392.1 231.8v-410z" />
        <path
          fill="#3C3C3B"
          d="m392.1 956.5-4.9 5.9v300.9l4.9 14.1 392.3-552.5z"
        />
        <path fill="#8C8C8C" d="M392.1 1277.4V956.5L0 724.9z" />
        <path fill="#141414" d="m392.1 882.3 392-231.8-392-178.2z" />
        <path fill="#393939" d="m0 650.5 392.1 231.8v-410z" />
      </g>
    </svg>
  );
}

export const EthereumLogo = memo(_EthereumLogo);
