/** @jsx jsx */
import { jsx } from '@emotion/core';

import SponsorsItem from './SponsorsItem'
import { gridSize } from '../../theme';

const SponsorsItems = ({ sponsors, ... props }) => {
  return(
    <ul
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: -gridSize,
        maringRight: -gridSize,
        padding: 0,
        listStyle: 'none',
      }}
      {... props}
    >
      {sponsors.map((sponsor) => (
        <SponsorsItem
          key={sponsor.id}
        {...sponsor}
        />
      ))}
    </ul>
  );
};

export default SponsorsItems;