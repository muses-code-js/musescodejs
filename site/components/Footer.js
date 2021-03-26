/** @jsxImportSource @emotion/react */
import React from 'react';

import { Button, ClipWrapper, Input, Flex } from '../primitives';
import { H2 } from '../primitives/Typography';
import { colors, gridSize, shadows } from '../theme';
import { mq } from '../helpers/media';

const Footer = ({ callToAction = true }) => {
  const paddingTop = (callToAction ? 48 : 16) * gridSize;

  return (
    <footer>
      {callToAction && (
        <section
          css={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <CallToAction>
            <H2>Stay up to date.</H2>
            <Flex content="center" direction="row">
              <Input />
              <Button background={colors.dark} href="/signup">
                Sign Up
              </Button>
            </Flex>
            <p
              css={{
                fontSize: '1.2em',
                fontWeight: 300,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi viverra dolor vitae sem
              gravida.
            </p>
          </CallToAction>
        </section>
      )}
      <ClipWrapper placement="bottom" color={colors.dark}>
        <div
          css={{
            color: colors.white,
            padding: `${gridSize * 8}px 0`,
            paddingTop,
            textAlign: 'center',
            fontWeight: 300,

            a: {
              color: colors.white,
              fontWeight: 600,
            },
          }}
        >
          <p
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.2em',
            }}
          >
            Muses is proudly backed by <img src="./tm_white.svg" css={{ padding: '0 10px' }} />{' '}
            Thinkmill.
          </p>
          <img src="./logo_muses-vertical.svg" />
          <p>
            Made by Muses Code JS, with thanks to{' '}
            <a href="https://www.keystonejs.com/" target="_blank" rel="noopener noreferrer">
              Keystone
            </a>
            . <br />
            Copyright © 2021 Muses Code JS. All rights reserved.{' '}
          </p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> |{' '}
            <a href="/code-conduct">Code of Conduct</a>
          </p>
          <a
            href="https://www.patreon.com/musescodejs"
            target="_blank"
            rel="noopener noreferrer"
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.2em',
            }}
          >
            <img src="./patreon_color.png" css={{ paddingRight: '10px' }} />
            Donate on Patreon
          </a>
        </div>
      </ClipWrapper>
    </footer>
  );
};

const CallToAction = (props) => {
  const paddingHorizontal = ['4rem', '8rem'];
  const paddingVertical = '4rem';

  return (
    <div
      css={mq({
        background: [null, colors.gradientCallAction],
        boxShadow: [null, shadows.lg],
        borderRadius: gridSize,
        boxSizing: 'border-box',
        color: colors.white,
        margin: '0 auto',
        width: '80%',
        maxWidth: 970,
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

export default Footer;
