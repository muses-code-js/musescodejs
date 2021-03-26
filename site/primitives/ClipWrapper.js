/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../theme';

export const ClipWrapper = ({ children, image, color, placement }) => {
  const POINTS_MAP = {
    top: '0 0, 100% 0, 100% 100%, 0 75%',
    middle: '0 0, 100% 25%, 100% 100%, 0 75%',
    bottom: '0 25%, 100% 0, 100% 100%, 0 100%',
  };

  const ClipWrapperImage = (
    <section
      css={{
        backgroundColor: color,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 20%',
        clipPath: `polygon(${POINTS_MAP[placement]})`,
        ':before, :after': {
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        },
        ':before': {
          zIndex: -2,
          opacity: '0.8',
          background: colors.gradientHorizontal,
        },
        ':after': {
          zIndex: -1,
          opacity: '0.3',
          background: colors.dark,
        },
      }}
    >
      {children}
    </section>
  );
  const ClipWrapperColor = (
    <section
      css={{
        background: color,
        clipPath: `polygon(${POINTS_MAP[placement]})`,
      }}
    >
      {children}
    </section>
  );

  return image ? ClipWrapperImage : ClipWrapperColor;
};

ClipWrapper.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  image: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

ClipWrapper.defaultProps = {
  color: colors.gradientVertical,
  placement: 'middle',
};
