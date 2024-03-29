import gql from 'graphql-tag';
import { USER_IMAGE } from './fragments';

export const EVENT_DATA = gql`
  fragment EventData on Event {
    id
    name
    slug
    startTime
    locationAddress
    locationDescription
    description
    maxRsvps
    talks {
      id
      isLightningTalk
      name
      description
      speakers {
        id
        name
        ...UserImage
      }
    }
  }
  ${USER_IMAGE}
`;

export const GET_CURRENT_EVENTS = gql`
  query GetCurrentEvents($now: DateTime!) {
    upcomingEvents: allEvents(
      where: { startTime_not: null, status: active, startTime_gte: $now }
      orderBy: "startTime_DESC"
    ) {
      ...EventData
    }
    previousEvents: allEvents(
      where: { startTime_not: null, status: active, startTime_lte: $now }
      orderBy: "startTime_ASC"
    ) {
      ...EventData
    }
  }
  ${EVENT_DATA}
`;

export const GET_ALL_EVENTS = gql`
  {
    allEvents(where: { startTime_not: null, status: active }, orderBy: "startTime_DESC") {
      ...EventData
    }
  }
  ${EVENT_DATA}
`;

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($eventSlug: String) {
    allEvents(where: { slug: $eventSlug }) {
      ...EventData
    }
    allRsvps(where: { event: { slug: $eventSlug }, user_is_null: false }) {
      id
      user {
        id
        name
        ...UserImage
      }
    }
  }
  ${EVENT_DATA}
  ${USER_IMAGE}
`;
