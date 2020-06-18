/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { H3 } from '../../primitives';
import { Image } from 'cloudinary-react';
import { colors, gridSize, shadows } from '../../theme';
import { mq } from '../../helpers/media';

const SponsorCard = sponsor => {
  const {
    id,
    name,
    category,
    logo,
    ...props
  } = sponsor;
  


  return (
  
  <li {...props} ccss={mq({ width: ['100%', '50%', '50%', '33.33%'] })}>
    
    <div
        css={{
          display: 'flex',
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
     <Image cloudName="dnlhzvisl" publicId={logo.id} width="100" crop="scale" />

        
      </div>
    
  </li>

  );
};

export default SponsorCard;