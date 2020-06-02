/** @jsx jsx */
import { jsx } from '@emotion/core';
import { H3 } from '../../primitives';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { colors, gridSize, shadows } from '../../theme';
import Link from 'next/link';
import { mq } from '../../helpers/media';

const SponsorsItem = sponsor => {
  const {
    id,
    name,
    website,
    logo,
    ...props
  } = sponsor;

  return (
    <li css={mq({ width: ['100%', '50%', '50%', '33.33%'] })}>
      
      <div 
        className="sponsor_card" 
        css={{
          backgroundColor: 'white',
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
          <div>
          <Image cloudName="demo" publicId="sample" width="300" crop="scale" />
          </div>
          <H3
            size={4}
            css={{ wordWrap: 'break-word', textAlign: 'center', lineHeight: '1.25', marginBottom: gridSize }}
          >
         
               {name}
            
          </H3>
       
        
        </div>
      </li>
  
  );
};


export default SponsorsItem;