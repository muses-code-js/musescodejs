/** @jsx jsx */
import { jsx } from '@emotion/core';

import SponsorCard from './SponsorCard';
import { gridSize } from '../../theme';

const SponsorItems = ({ sponsors, offsetTop, ... props }) => {
    return(
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginLeft: -gridSize,
          maringRight: -gridSize,
          padding: `${gridSize * 3}px ${gridSize * 3}px ${gridSize * 3}px`,
          listStyle: 'none',
        }}
        {... props}
      >
        {sponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
          {...sponsor}
          />
        ))}
      </div>
    );
  };

export default SponsorItems;