/** @jsx jsx */
import { jsx } from '@emotion/core';
import Link from 'next/link';
import { H4, H5, Html } from '../../primitives';
import { colors, gridSize, shadows } from '../../theme';
import { formatPastDate } from '../../helpers';
import { mq } from '../../helpers/media';

const NewsItem = post => {
  const { id, title, slug, author, date, description } = post;

  const prettyDate = formatPastDate(date);

  return (
    <li css={mq({ width: ['100%', '50%', '50%', '33.33%'] })}>
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
        <div css={{ maxHeight: 250, overflow: 'hidden' }}>
          <Link href={`/post/[slug]`} as={`/post/${slug}`} passHref>
            <a
              css={{
                color: 'inherit',
                textDecoration: 'none',

                ':hover h4': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Mask />
              <H5 as="div" css={{ textTransform: 'uppercase' }}>
                {prettyDate}
              </H5>
              <H4
                size={4}
                css={{ wordWrap: 'break-word', lineHeight: '1.25', marginBottom: gridSize }}
              >
                {title}
              </H4>
              {author ? (
                <p css={{ alignItems: 'center', color: colors.greyMedium, display: 'flex' }}>
                  Posted by: {author}
                </p>
              ) : null}
              <Html
                markup={description}
                css={{
                  a: {
                    color: 'inherit',
                    pointerPosts: 'none',
                    textDecoration: 'none',
                  },
                }}
              />
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
};

// Styled Components
// ------------------------------

const Mask = props => (
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

export default NewsItem;
