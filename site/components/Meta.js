/** @jsx jsx */

import { Children } from 'react';
import uniqBy from 'lodash.uniqby';
import getConfig from 'next/config';
import Head from 'next/head';
import { jsx } from '@emotion/core';

const {
  publicRuntimeConfig: { meetup },
} = getConfig();

export const makeMetaUrl = (path) => {
  const base = meetup.siteUrl;
  const url = base.endsWith('/') ? base.slice(0, base.length - 1) : base;
  return `${url}${path}`;
};

const logoPath = makeMetaUrl(meetup.logo.src);

const rootTags = [
  <meta key="og:url" property="og:url" content={meetup.siteUrl} />,
  <meta key="og:type" property="og:type" content="website" />,
  <meta key="og:locale" property="og:locale" content="en" />,
  <meta key="og:site_name" property="og:site_name" content={meetup.name} />,
  <meta key="og:image" property="og:image" content={logoPath} />,
  <meta key="og:image:width" property="og:image:width" content={meetup.logo.width} />,
  <meta key="og:image:height" property="og:image:height" content={meetup.logo.height} />,
  <meta key="twitter:site" name="twitter:site" content={meetup.twitterHandle} />,
  <meta key="twitter:card" name="twitter:card" content="summary" />,
  <meta key="twitter:image" name="twitter:image" content={logoPath} />,
];

const addKeys = (tags) => {
  return tags.map(({ type: Tag, key, props }, idx) => <Tag key={key || idx} {...props} />);
};

function getUniqueTags(children) {
  // NOTE: the concatenation order is important for the unique filter;
  // we want to give `children` precedence over root tags.
  const tags = Children.toArray(children.concat(rootTags));
  const uniqueTags = uniqBy(tags, (t) => t.props.name || t.props.property);
  return addKeys(uniqueTags);
}

export default function PageMeta({ children, description, title, titleExclusive }) {
  const titleContent = titleExclusive ? titleExclusive : title ? `${title} | ${meetup.name}` : null;
  const uniqueTags = children ? getUniqueTags(children) : addKeys(rootTags);

  return (
    <Head>
      {titleContent && <title>{titleContent}</title>}
      {description && <meta name="description" content={description} />}
      {uniqueTags}
    </Head>
  );
}
