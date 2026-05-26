import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme/theme';
import createEmotionCache from '@/theme/createEmotionCache';
import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Aisha & Ahmed — A Wedding Invitation</title>
        <meta name="description" content="A premium Islamic wedding invitation — Aisha & Ahmed." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
