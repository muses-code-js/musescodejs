/** @jsx jsx */
import { jsx } from '@emotion/core';
import { colors, gridSize, shadows } from '../../theme';
import { mq } from '../../helpers/media';

const SponsorCard = sponsor => {
  const {
    id,
    name,
    category,
    website,
    image,
    ...props
  } = sponsor;

  return (
  <li {...props} ccss={mq({ width: ['100%', '50%', '50%', '33.33%'] })}>
    
    <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white', 
          width: '150px',
          height: '150px',
          borderTop: `solid 8px ${colors[category.toLowerCase()]}`,
          boxShadow: shadows.sm,
          margin: gridSize,
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
        <a href={website} target="_blank">
           <img src={image.publicUrlTransformed}></img>
        </a>

    </div>
  </li>
  );
};

export default SponsorCard;