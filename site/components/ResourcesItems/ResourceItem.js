/** @jsxImportSource @emotion/react */
import React from 'react';

import { colors, gridSize, borderRadius, shadows } from '../../theme';
import { H3 } from '../../primitives';

const ResourceItem = (list) => {
  const listItems = list.resources.map((item) => (
    <li css={{ position: 'relative' }} key={item.id}>
      <div
        css={{
          display: 'flex',
          backgroundColor: 'white',
          borderTop: `solid 8px ${colors.purple}`,
          borderRadius: `${borderRadius * 3}px`,
          boxShadow: shadows.sm,
          margin: gridSize,
          padding: `${borderRadius * 3}px`,
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
        <p css={{ width: '33%' }}>{item.title}</p>
        <p css={{ width: '33%' }}>{item.topic}</p>
        <p css={{ width: '33%' }}>{item.level}</p>
      </div>
      <a
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
        href={item.url}
      >
        Read more
      </a>
    </li>
  ));

  return (
    <ul css={{ listStyle: 'none' }}>
      <li css={{ marginLeft: gridSize, marginBottom: `${gridSize * 3}px`, display: 'flex' }}>
        <H3 css={{ width: '33%' }}>Title</H3>
        <H3 css={{ width: '33%' }}>Topic</H3>
        <H3 css={{ width: '33%' }}>Level</H3>
      </li>

      {listItems}
    </ul>
  );
};

export default ResourceItem;
