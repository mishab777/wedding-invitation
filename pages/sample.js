import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { palette } from '@/theme/theme';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DateReveal from '@/components/DateReveal';
import Countdown from '@/components/Countdown';
import Events from '@/components/Events';
import Story from '@/components/Story';
import Gallery from '@/components/Gallery';
import Quotes from '@/components/Quotes';
import Location from '@/components/Location';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';

// /sample — the invitation exactly as it looks *after* "Open Invitation" is
// clicked, built for scroll-video capture tools:
//   • no Loader gate, so the page is scrollable the moment it loads
//   • no AudioController (capture tools are muted, and autoplay is blocked)
//   • the date card reveals itself — no scratch gesture is possible in a capture
//
// Query flags (see README):
//   ?instant=1   pre-plays every scroll-triggered animation, then returns to the
//                top, so a fast-scrolling capture never catches a section mid-fade
//   ?nav=0       hides the fixed navbar (it would otherwise sit in every frame)
//   ?confetti=0  skips the date-reveal confetti burst

const isOn = (v) => v === '1' || v === 'true' || v === 'on';
const isOff = (v) => v === '0' || v === 'false' || v === 'off';

// One pass down the page, a pause at the bottom, then back to the top. Every
// framer-motion `whileInView` here is `once: true`, so once a section has been
// seen and its animation has settled it stays settled for the real capture.
function usePrewarm(enabled, onDone) {
  // Held in a ref so a re-render can't cancel and restart the sweep midway.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    (async () => {
      const step = Math.max(240, window.innerHeight * 0.6);
      for (let y = 0; y <= maxScroll(); y += step) {
        if (cancelled) return;
        window.scrollTo(0, y);
        await wait(140);
      }
      if (cancelled) return;
      window.scrollTo(0, maxScroll());
      // Long enough for the slowest entrance (~1.1s) plus the confetti burst.
      await wait(1800);
      if (cancelled) return;
      window.scrollTo(0, 0);
      await wait(150);
      if (cancelled) return;
      onDoneRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled]);
}

export default function Sample() {
  const { query, isReady } = useRouter();
  const instant = isOn(query.instant);
  const showNav = !isOff(query.nav);
  const showConfetti = !isOff(query.confetti);

  const [prewarming, setPrewarming] = useState(false);

  // Start from the top no matter how the capture tool navigated here.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isReady && instant) setPrewarming(true);
  }, [isReady, instant]);

  usePrewarm(prewarming, () => setPrewarming(false));

  return (
    <>
      <Head>
        <title>Aisha &amp; Ahmed — Invitation Preview</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Box sx={{ position: 'relative' }}>
        {showNav && <Navbar audioOn={false} showAudio={false} />}

        <Hero />
        <DateReveal autoReveal autoRevealDelay={instant ? 0 : 900} confetti={showConfetti} />
        <Countdown />
        <Events />
        <Story />
        <Gallery />
        <Quotes />
        <Location />
        <RSVP />
        <Footer />

        {/* Hides the prewarm scroll sweep behind the page background, so a
            recorder that starts at t=0 sees a calm ivory frame, not a strobe. */}
        {prewarming && (
          <Box
            aria-hidden
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: palette.offWhite,
              pointerEvents: 'none'
            }}
          />
        )}
      </Box>
    </>
  );
}
