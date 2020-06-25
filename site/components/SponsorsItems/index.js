/** @jsx jsx */
import { jsx } from '@emotion/core';
import SponsorCard from './SponsorCard'
import { gridSize, colors } from '../../theme';
import { H5 } from '../../primitives';

const SponsorItems = ({ sponsors, offsetTop, ... props }) => {

  const platinumSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Platinum";
  })

  const goldSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Gold";
  })

  const silverSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Silver";
  })

  const bronzeSponsors = sponsors.filter(function(sponsor) {
    return sponsor.category == "Bronze";
  })

  return(
    <div
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: `${gridSize * 2}px 0px ${gridSize * 3}px`,
        margin: gridSize,
        listStyle: 'none',
      }}
      {... props}
    >
      {platinumSponsors.length > 0 &&
        <div 
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}>
          <H5 >Platinum Sponsors</H5>
          <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: '0.5rem',
          }}
          >
            {platinumSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
            {...sponsor}
            />
          ))}
          </div>
        </div>
      }      

      {goldSponsors.length > 0 &&
        <div 
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          padding: `${gridSize * 3}px 0px 0px`
        }}>
          <H5>Gold Sponsors</H5>
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
      }      
      
      {silverSponsors.length > 0 &&
        <div 
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          padding: `${gridSize * 3}px 0px 0px`,
        }}>
          <H5>Silver Sponsors</H5>
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
      }

      {bronzeSponsors.length > 0 &&
        <div 
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          padding: `${gridSize * 3}px 0px 0px`,
        }}>
          <H5>Bronze Sponsors</H5>
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
      }
    </div>
    );
  };

export default SponsorItems;