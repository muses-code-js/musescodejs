/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button } from '../primitives';
import { colors, gridSize, shadows } from '../theme';
import { getForegroundColor } from '../helpers';
import { mq } from '../helpers/media';

const Footer = ({ callToAction = true }) => {
  const marginTop = (callToAction ? 16 : 32) * gridSize;
  const slantHeight = callToAction ? 15 : 5;
  const button = {
    bg: colors.pink,
    fg: getForegroundColor(colors.pink),
  };

  return (
    <div css={{ marginTop }}>
      <div css={{ position: 'relative' }}>
        {callToAction && (
          <CallToAction>
            <h2>Join our meetup!</h2>
            <Button background={button.bg} foreground={button.fg} href="/signup">
              Join us now
            </Button>
          </CallToAction>
        )}
        <Slant height={slantHeight} />
      </div>
      <section
        css={{
          background: colors.purple,
          color: 'white',
          padding: `${gridSize * 8}px 0`,
          textAlign: 'center',

          a: {
            color: 'white',
            fontWeight: 600,
          },
        }}
      >
        <p>
          <a href="/code-conduct">Code of Conduct</a>
        </p>
        <p>
          Copyright © Muses Code JS, powered by{' '}
          <a href="https://v5.keystonejs.com" target="_blank" rel="noopener noreferrer">
            KeystoneJS
          </a>
          .
        </p>
      </section>
    </div>
  );
};

const CallToAction = (props) => {
  const paddingHorizontal = ['2rem', '6rem'];
  const paddingVertical = '2rem';

  return (
    <div
      css={mq({
        background: [null, 'white'],
        boxShadow: [null, shadows.lg],
        boxSizing: 'border-box',
        margin: '0 auto',
        maxWidth: 800,
        paddingBottom: paddingVertical,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop: paddingVertical,
        position: 'relative',
        textAlign: 'center',
        zIndex: 2,
      })}
      {...props}
    />
  );
};

const Slant = ({ height }) => (
  <svg
    css={{
      bottom: 0,
      display: 'block',
      height: `${height}vw`,
      position: 'absolute',
      width: '100vw',
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <polygon fill={colors.purple} points="0, 0 100, 100 0, 100" />
  </svg>
);

export default Footer;
