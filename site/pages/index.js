import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import EventItems from '../components/EventItems';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import { GET_CURRENT_EVENTS } from '../graphql/events';
import { GET_EVENT_RSVPS } from '../graphql/rsvps';
import { GET_ALL_SPONSORS } from '../graphql/sponsors';
import Link from 'next/link';

import Talks from '../components/Talks';
import Rsvp from '../components/Rsvp';
import {
  AvatarStack,
  Button,
  Container,
  ClipWrapper,
  Error,
  Hero,
  Html,
  Loading,
  MicrophoneIcon,
  PinIcon,
  UserIcon,
} from '../primitives';
import { H1, H2, H3 } from '../primitives/Typography';
import { colors, gridSize, fontSizes } from '../theme';
import { isInFuture, formatFutureDate, formatPastDate, pluralLabel } from '../helpers';
import { mq } from '../helpers/media';

// Featured Event
const FeaturedEvent = ({ isLoading, error, event }) => {
  const { description, id, locationAddress, maxRsvps, name, startTime, talks } = event || {};
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_EVENT_RSVPS, {
    variables: { event: id },
    skip: !event,
  });
  if (isLoading && !event) {
    return <Loading isCentered />;
  }
  if (error) {
    console.error('Failed to render the featured event', error);
    return null;
  }
  if (!isLoading && !event) {
    return null;
  }

  const prettyDate = isInFuture(startTime)
    ? formatFutureDate(startTime)
    : formatPastDate(startTime);

  const { allRsvps } = data || {};
  const attending = allRsvps ? `${allRsvps.length}${maxRsvps ? `/${maxRsvps}` : ''}` : undefined;
  return (
    <Container css={{ margin: '-7rem auto 0', position: 'relative' }}>
      <div css={{ boxShadow: '0px 4px 94px rgba(0, 0, 0, 0.15)' }}>
        <div
          css={{
            backgroundColor: 'white',
            color: 'black',
            display: 'block',
            padding: '2rem',
          }}
        >
          <div css={mq({ display: 'flex', flexDirection: ['column', 'row'] })}>
            <div
              css={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  css={{
                    textTransform: 'uppercase',
                    marginTop: 0,
                    fontWeight: 500,
                    marginBottom: gridSize,
                  }}
                >
                  {prettyDate}
                </p>
                <Link href={`/event/[id]`} as={`/event/${id}`} passHref>
                  <a
                    css={{
                      color: 'inherit',
                      textDecoration: 'none',
                      ':hover': { textDecoration: 'underline' },
                    }}
                  >
                    <H3>{name}</H3>
                  </a>
                </Link>
              </div>
              <p css={{ alignItems: 'center', display: 'flex', fontWeight: 300 }}>
                <PinIcon css={{ marginRight: '0.5em' }} />
                {locationAddress}
              </p>
            </div>
            <Html
              markup={description}
              css={mq({
                flex: 1,
                padding: [0, '0 2rem'],

                p: {
                  '&:first-of-type': { marginTop: 0 },
                  '&:last-of-type': { marginBottom: 0 },
                },
              })}
            />
          </div>
        </div>
        <div css={{ padding: '1.5rem', background: 'white' }}>
          <div
            css={mq({
              alignItems: 'center',
              display: 'flex',
              flexDirection: ['column', 'row'],
              justifyContent: 'space-between',
            })}
          >
            <Rsvp event={event}>{({ message, component }) => component || message}</Rsvp>
            <div
              css={{
                alignItems: 'center',
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <div
                css={{ alignItems: 'center', display: 'flex', fontWeight: 300, padding: '0 1rem' }}
              >
                <MicrophoneIcon color="#ccc" css={{ marginRight: '0.5em' }} />
                {pluralLabel(talks.length, 'talk', 'talks')}
              </div>
              {queryLoading && !data ? (
                <Loading />
              ) : queryError ? (
                <Error error={queryError} />
              ) : !allRsvps ? null : (
                <>
                  <div
                    css={{
                      alignItems: 'center',
                      display: 'flex',
                      fontWeight: 300,
                      padding: '0 1rem',
                    }}
                  >
                    <UserIcon color="#ccc" css={{ marginRight: '0.5em' }} />
                    {attending} {isInFuture(startTime) ? 'attending' : 'attended'}
                  </div>
                  <AvatarStack
                    users={allRsvps.filter((rsvp) => rsvp.user).map((rsvp) => rsvp.user)}
                    size="small"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Sponsors = () => {
  const { data: { allSponsors } = {}, loading, error } = useQuery(GET_ALL_SPONSORS);
  console.log('allSponsors', allSponsors);
  console.log('loading', loading);
  console.log('error', error);
  return (
    <>
      <H1>Our Partners</H1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ul
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {allSponsors.map((sponsor) => (
            <li key={sponsor.id} css={{ flex: 1, margin: 12 }}>
              <a href={sponsor.website} target="_blank" rel="noreferrer">
                {sponsor.logo ? (
                  <img
                    alt={sponsor.name}
                    css={{ maxWidth: '100%', maxHeight: 140 }}
                    src={sponsor.logo.publicUrl}
                  />
                ) : (
                  sponsor.name
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const processEventsData = (data) => {
  if (!data || !data.upcomingEvents || !data.previousEvents) {
    return {
      featuredEvent: null,
      moreEvents: [],
    };
  }

  const upcomingEvents = data.upcomingEvents.slice();
  const previousEvents = data.previousEvents.slice();

  const featuredEvent = upcomingEvents.length ? upcomingEvents.pop() : previousEvents.pop() || null;
  const moreEvents = [];

  for (let i = 0; i < 3; i++) {
    if (upcomingEvents.length) {
      moreEvents.push(upcomingEvents.pop());
    } else if (previousEvents.length) {
      moreEvents.push(previousEvents.pop());
    }
  }

  return {
    featuredEvent,
    moreEvents,
  };
};

const Home = ({ now }) => {
  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
  } = useQuery(GET_CURRENT_EVENTS, { variables: { now } });
  const { featuredEvent, moreEvents } = processEventsData(eventsData);

  return (
    <>
      <Meta
        titleExclusive="MusesCodeJS"
        description="Muses run JavaScript and Node.js workshops for women, non-binary and trans folk around Australia."
      />
      <ClipWrapper placement="top" image="./girls.jpg">
        <Navbar />
        <Hero image="./we_code.svg">
          <H2
            css={{
              textAlign: 'center',
              color: colors.white,
            }}
          >
            We run JavaScript and Node.js workshops for women, non-binary and trans folk around
            Australia.
          </H2>
          <Button
            background={colors.white}
            href="https://www.patreon.com/musescodejs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support us on <img src="./patreon_black.svg" css={{ margin: '0 0.5rem' }} />{' '}
            <strong>PATREON</strong>
          </Button>
        </Hero>
      </ClipWrapper>
      <main>
        <FeaturedEvent isLoading={eventsLoading} error={eventsError} event={featuredEvent} />
        <Container>
          {featuredEvent && featuredEvent.talks ? <Talks talks={featuredEvent.talks} /> : null}
        </Container>
        <ClipWrapper placement="middle" color={colors.gradientVertical}>
          <Container textAlign="center" color={colors.white} padding="8rem">
            <H1>About</H1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra dolor vitae sem
              gravida, sit amet rhoncus elit aliquam. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Morbi viverra dolor vitae sem gravida, sit amet rhoncus elit aliquam.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra dolor vitae sem
              gravida, sit amet rhoncus elit aliquam. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Morbi viverra dolor vitae sem gravida, sit amet rhoncus elit aliquam.{' '}
            </p>

            <p>
              Find out more about us and <a href="./about">meet the team here</a>
            </p>
          </Container>
        </ClipWrapper>
        <Section css={{ padding: '3rem 0' }}>
          <Container textAlign="center">
            <Sponsors />
          </Container>
        </Section>
        {moreEvents.length ? (
          <>
            <Section
              css={{
                backgroundColor: colors.greyLight,
                margin: '5rem 0',
                paddingTop: '5rem',
              }}
            >
              <Container>
                <H2 hasSeparator>More Meetups</H2>
                <EventItems events={moreEvents} offsetTop css={{ marginTop: '3rem' }} />
                <Link href="/events">
                  <a
                    css={{
                      color: 'black',
                      cursor: 'pointer',
                      fontSize: fontSizes.md,
                      marginTop: '1rem',

                      ':hover > span': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <span>View all</span> &rarr;
                  </a>
                </Link>
              </Container>
            </Section>
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

// styled components
const Section = (props) => (
  <section
    css={{
      position: 'relative',
    }}
    {...props}
  />
);

Home.getInitialProps = async () => {
  return {
    now: new Date().toISOString(),
  };
};

export default Home;
