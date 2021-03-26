/** @jsxImportSource @emotion/react */
import React from 'react';

export const Polygon = () => {
  return (
    <svg
      css={{ height: '5vw', width: '100vw', marginBottom: '-0.3vw' }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon fill="white" points="0,0 100,100 0,100" />
    </svg>
  );
};
