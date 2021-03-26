/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '../primitives';
import { H1 } from '../primitives/Typography';
import { colors, fontSizes } from '../theme';

export const Hero = ({
  align,
  backgroundColor,
  children,
  subTitle,
  superTitle,
  title,
  image,
  ...props
}) => {
  const horizontalMargin = align === 'center' ? 'auto' : null;

  return (
    <>
      <Wrapper align={align} {...props}>
        <Container textAlign="center" css={{ marginBottom: '8rem' }}>
          {superTitle && <Subtitle>{superTitle}</Subtitle>}
          <H1>{title}</H1>
          {image && <img src={image} alt="We code" width="602" height="180" />}
          {subTitle && <Subtitle>{subTitle}</Subtitle>}
          <Content horizontalMargin={horizontalMargin}>{children}</Content>
        </Container>
      </Wrapper>
    </>
  );
};

Hero.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node,
  image: PropTypes.string,
  subTitle: PropTypes.string,
  superTitle: PropTypes.string,
  title: PropTypes.string,
};
Hero.defaultProps = {
  align: 'center',
  backgroundColor: colors.purple,
};

// styled components
const Wrapper = ({ align, backgroundColor, foregroundColor, ...props }) => (
  <div
    css={{
      backgroundColor: 'transparent',
      color: foregroundColor,
      padding: '7rem 0',
      textAlign: align,
    }}
    {...props}
  />
);

const Content = ({ horizontalMargin, ...props }) => (
  <div
    css={{
      fontSize: [fontSizes.sm, fontSizes.md],
      marginLeft: horizontalMargin,
      marginRight: horizontalMargin,
      marginTop: 30,
      maxWidth: 720,

      a: {
        color: 'inherit',
      },
    }}
    {...props}
  />
);

const Subtitle = ({ horizontalMargin, ...props }) => (
  <div
    css={{
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }}
    {...props}
  />
);
