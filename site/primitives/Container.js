/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { mq } from '../helpers/media';
import { colors } from '../theme';

export const CONTAINER_GUTTER = ['1rem', '2rem'];

export const Container = ({ width, textAlign, color, padding, ...props }) => {
  return (
    <div
      css={mq({
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: CONTAINER_GUTTER,
        paddingRight: CONTAINER_GUTTER,
        paddingTop: padding,
        paddingBottom: padding,
        maxWidth: width,
        background: 'transparent',
        textAlign,
        color,
      })}
      {...props}
    />
  );
};

Container.propTypes = {
  color: PropTypes.string,
  padding: PropTypes.string,
  textAlign: PropTypes.oneOf(['right', 'center', 'left']),
  width: PropTypes.number,
};
Container.defaultProps = {
  color: colors.dark,
  padding: '1rem',
  textAlign: 'left',
  width: 1000,
};
