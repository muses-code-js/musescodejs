/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Image, cloudName } from 'cloudinary-react';
import { colors, gridSize, shadows } from '../../theme';
import { mq } from '../../helpers/media';
import ReactImageTooltip from 'react-image-tooltip'

const SponsorCard = sponsor => {
  const {
    id,
    name,
    category,
    website,
    logo,
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
  
      <ReactImageTooltip>
        <a href={website} target="_blank">
          <Image cloudName="dnlhzvisl" publicId={logo.id} width="100" crop="scale"alt={name}/>
        </a>
      </ReactImageTooltip>
      
    </div>
  </li>
  );
};

export default SponsorCard;