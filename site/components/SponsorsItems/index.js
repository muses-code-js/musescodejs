/** @jsx jsx */
import { jsx } from '@emotion/core';
import SponsorCard from './SponsorCard'
import { gridSize } from '../../theme';
import { H4 } from '../../primitives';

const SponsorItems = ({ sponsors, offsetTop, ... props }) => {

  const goldSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Gold";
  })

  const silverSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Silver";
  })

  const bronzeSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Bronze";
  })

  console.log(goldSponsors);

  return(
    <div
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        marginLeft: -gridSize,
        maringRight: -gridSize,
        padding: `${gridSize * 3}px ${gridSize * 3}px ${gridSize * 3}px`,
        listStyle: 'none',
      }}
      {... props}
    >
      <div 
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: `${gridSize * 3}px 0px 0px`
      }}>
        <H4>Gold Sponsors</H4>
        <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '0.5rem',
        }}
        >
          {goldSponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
          {...sponsor}
          />
        ))}
        </div>
      </div>
      <div 
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: `${gridSize * 3}px 0px 0px`,
      }}>
        <H4>Silver Sponsors</H4>
        <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '0.5rem',
        }}
        >
          {silverSponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
          {...sponsor}
          />
        ))}
        </div>
      </div>
      <div 
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: `${gridSize * 3}px 0px 0px`,
      }}>
        <H4>Bronze Sponsors</H4>
        <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '0.5rem'
        }}
        >
          {bronzeSponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
          {...sponsor}
          />
        ))}
        </div>
      </div>
    </div>
    );
  };

export default SponsorItems;