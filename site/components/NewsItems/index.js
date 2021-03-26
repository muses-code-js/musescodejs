/** @jsxImportSource @emotion/react */
import React from 'react';

import NewsItem from './NewsItem';
import { gridSize } from '../../theme';
import { media } from '../../helpers/media';

const NewsItems = ({ posts, offsetTop, ...props }) => {
  return (
    <ul
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        // horizontal offset to counter for padding between items inside!
        marginLeft: -gridSize,
        marginRight: -gridSize,
        padding: 0,
        listStyle: 'none',
      }}
      {...props}
    >
      {posts.map((post, idx) => (
        <NewsItem
          key={post.id}
          css={
            offsetTop
              ? {
                  [media.lg]: {
                    marginTop: `${idx * 10}vh`,
                  },
                }
              : null
          }
          {...post}
        />
      ))}
    </ul>
  );
};

export default NewsItems;
