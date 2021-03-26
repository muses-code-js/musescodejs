/** @jsxImportSource @emotion/react */
import React from 'react';
import { borderRadius, colors } from '../theme';

export const Input = () => (
  <input
    css={{
      background: colors.white,
      borderRadius: borderRadius * 2,
      border: 'none',
      color: colors.dark,
      marginRight: '1rem',
      padding: '0 1.5rem',
      transition: 'background 0.2s ease',
      ':focus': {
        outline: 'none',
        background: colors.greyVeryLight,
      },
    }}
  />
);
