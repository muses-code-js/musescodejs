/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';

export const Flex = ({ children, content, direction }) => (
  <div
    css={{
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: direction,
      justifyContent: content,
      alignContent: 'center',
    }}
  >
    {children}
  </div>
);

Flex.propTypes = {
  children: PropTypes.node,
  content: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  direction: PropTypes.oneOf(['row', 'column']),
};

Flex.defaultProps = {
  content: 'center',
  direction: 'column',
};
