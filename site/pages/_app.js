import React from 'react';
import Head from 'next/head';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from '../lib/authetication';
import StylesBase from '../primitives/StylesBase';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { useApollo } from '../lib/apollo-client';
import { ApolloProvider } from '@apollo/client';

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ToastProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
            />
          </Head>
          <StylesBase />
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
      <GoogleAnalytics />
    </ToastProvider>
  );
};

export default MyApp;
