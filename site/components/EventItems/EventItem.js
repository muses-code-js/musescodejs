/** @jsxImportSource @emotion/react */
import React from 'react';
import Link from 'next/link';

import Rsvp from '../../components/Rsvp';
import { H3, H5, Html, PinIcon } from '../../primitives';
import { colors, gridSize, shadows } from '../../theme';
import { isInFuture, formatPastDate, formatFutureDate } from '../../helpers';
import { mq } from '../../helpers/media';

const EventItem = (event) => {
  const {
    id,
    name,
    slug,
    startTime,
    description,
    talks,
    locationAddress,
    locationDescription,
    maxRsvps,
    ...props
  } = event;
  const prettyDate = isInFuture(startTime)
    ? formatFutureDate(startTime)
    : formatPastDate(startTime);

  return (
    <li {...props} css={mq({ width: ['100%', '50%', '50%', '33.33%'] })}>
      <div
        css={{
          backgroundColor: 'white',
          borderTop: `solid 8px ${colors.pink}`,
          boxShadow: shadows.sm,
          margin: gridSize,
          padding: `${gridSize * 3}px ${gridSize * 3}px 0`,
          position: 'relative',
          transition: 'all 0.1s',

          '&:hover': {
            boxShadow: shadows.md,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            boxShadow: shadows.sm,
            transform: 'none',
          },
        }}
      >
        <div css={{ maxHeight: 400, overflow: 'hidden' }}>
          <Link href={`/event/[slug]`} as={`/event/${slug}`} passHref>
            <a
              css={{
                color: 'inherit',
                textDecoration: 'none',

                ':hover h3': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Mask />
              <H5 as="div" css={{ textTransform: 'uppercase' }}>
                {prettyDate}
              </H5>
              <H3
                size={4}
                css={{ wordWrap: 'break-word', lineHeight: '1.25', marginBottom: gridSize }}
              >
                {name}
              </H3>
              {locationDescription ? (
                <p css={{ alignItems: 'center', color: colors.greyMedium, display: 'flex' }}>
                  <PinIcon css={{ marginRight: '0.5em' }} /> {locationDescription}
                </p>
              ) : null}
              <Html
                markup={description}
                css={{
                  a: {
                    color: 'inherit',
                    pointerEvents: 'none',
                    textDecoration: 'none',
                  },
                }}
              />
            </a>
          </Link>
          <Rsvp event={event} text="Attending?">
            {({ component }) => (component ? <RsvpPositioner>{component}</RsvpPositioner> : null)}
          </Rsvp>
        </div>
      </div>
    </li>
  );
};

// Styled Components
// ------------------------------

const Mask = (props) => (
  <div
    css={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      background: 'linear-gradient(rgba(255, 255, 255, 0), white 66%)',
      width: '100%',
      height: 100,
    }}
    {...props}
  />
);
const RsvpPositioner = (props) => (
  <div
    css={{
      background: 'white',
      boxShadow: '0 -1px 0 rgba(0, 0, 0, 0.1)',
      bottom: 0,
      boxSizing: 'border-box',
      left: 0,
      padding: `${gridSize * 2}px ${gridSize * 3}px`,
      position: 'absolute',
      right: 0,
      zIndex: 20,
    }}
    {...props}
  />
);

export default EventItem;
