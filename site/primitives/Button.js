/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { colors, borderRadius } from '../theme';
import NextLink from 'next/link';
import { getForegroundColor } from '../helpers';

const Link = ({ as, href, ...props }) => (
  <NextLink href={href} as={as} passHref>
    <a {...props} />
  </NextLink>
);
Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
};

const getTag = (props) => {
  let tag = 'button';
  if (props.href) {
    tag = /^https?:/.test(props.href) ? 'a' : Link;
  }

  return tag;
};

const SIZE_MAP = {
  small: '.6rem 1.33rem',
  medium: '.9rem 2rem',
};

export const Button = ({ background, outline, size, ...props }) => {
  const Tag = getTag(props);
  const foreground = background ? getForegroundColor(background) : colors.greyDark;

  const padding = SIZE_MAP[size];

  return (
    <Tag
      css={{
        alignItems: 'center',
        background: outline ? 'transparent' : background,
        border: `solid 2px ${outline ? 'rgba(0, 0, 0, 0.1)' : 'transparent'}`,
        borderRadius: borderRadius * 2,
        color: foreground,
        cursor: 'pointer',
        display: 'inline-flex',
        fontWeight: 600,
        lineHeight: 1.1,
        justifyContent: 'center',
        outline: 'none',
        padding: padding,
        textAlign: 'center',
        textDecoration: 'none',
      }}
      {...props}
    />
  );
};

Button.propTypes = {
  background: PropTypes.string,
  outline: PropTypes.bool,
  size: PropTypes.oneOf(['medium', 'small']),
};

Button.defaultProps = {
  background: colors.purple,
  outline: false,
  size: 'medium',
};
