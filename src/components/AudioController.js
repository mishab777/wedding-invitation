import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { palette } from '@/theme/theme';

const TARGET_VOLUME = 0.45;
const FADE_DURATION_MS = 2600;

const AudioController = forwardRef(function AudioController(
  { src = '/audio/nasheed.mp3', onStateChange },
  ref
) {
  const audioRef = useRef(null);
  const fadeFrame = useRef(null);
  const gestureUnlock = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState(null);

  const cancelFade = () => {
    if (fadeFrame.current) {
      cancelAnimationFrame(fadeFrame.current);
      fadeFrame.current = null;
    }
  };

  const fadeTo = (target, duration, onDone) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelFade();
    const start = performance.now();
    const from = Math.min(1, Math.max(0, Number.isFinite(audio.volume) ? audio.volume : 0));
    const clamp = (v) => Math.min(1, Math.max(0, v));
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t * (2 - t);
      const newVol = from + (target - from) * eased;
      audio.volume = clamp(newVol);
      if (t < 1) {
        fadeFrame.current = requestAnimationFrame(step);
      } else {
        // ensure exact final value within bounds
        audio.volume = clamp(target);
        fadeFrame.current = null;
        onDone?.();
      }
    };
    fadeFrame.current = requestAnimationFrame(step);
  };

  const disarmGestureUnlock = () => {
    gestureUnlock.current?.();
  };

  // Browsers only allow audio.play() inside a live user gesture. We listen for
  // the first interaction — including the touch that starts a scroll — and begin
  // playback from within that handler. On touch devices this means the nasheed
  // starts as soon as the user scrolls; on desktop, wheel/scroll alone are not
  // valid gestures, so it starts on the first click/keypress (or first scroll
  // once any interaction has occurred). Throttled so scroll/wheel don't hammer
  // play() before a gesture is available.
  const armGestureUnlock = () => {
    if (gestureUnlock.current) return;
    const events = ['scroll', 'wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown'];
    let lastTry = 0;
    const handler = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!audio.paused) {
        disarmGestureUnlock();
        return;
      }
      const now = performance.now();
      if (now - lastTry < 400) return;
      lastTry = now;
      const ok = await startPlayback();
      if (ok) disarmGestureUnlock();
    };
    events.forEach((ev) => window.addEventListener(ev, handler, { passive: true }));
    gestureUnlock.current = () => {
      events.forEach((ev) => window.removeEventListener(ev, handler));
      gestureUnlock.current = null;
    };
  };

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio || playing) return true;
    audio.volume = 0;
    try {
      await audio.play();
    } catch (e) {
      return false;
    }
    setPlaying(true);
    onStateChange?.(true);
    fadeTo(TARGET_VOLUME, FADE_DURATION_MS);
    setHint({
      title: 'A soft nasheed plays',
      body: 'Adjust or mute anytime in the top right.'
    });
    setTimeout(() => setHint(null), 5200);
    return true;
  };

  const play = async () => {
    const ok = await startPlayback();
    if (!ok) {
      setHint({
        title: 'Tap anywhere to begin',
        body: 'Your browser paused the nasheed until you interact.'
      });
      armGestureUnlock();
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    fadeTo(0, 900, () => {
      audio.pause();
      setPlaying(false);
      onStateChange?.(false);
    });
  };

  const toggle = () => (playing ? pause() : play());

  useImperativeHandle(ref, () => ({ play, pause, toggle, isPlaying: () => playing }), [playing]);

  useEffect(() => {
    armGestureUnlock();
    return () => {
      cancelFade();
      disarmGestureUnlock();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" loop />
      <AnimatePresence>
        {hint && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            sx={{
              position: 'fixed',
              bottom: { xs: 20, md: 32 },
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1400,
              px: 3,
              py: 2,
              background: `${palette.deepBrown}f0`,
              color: palette.offWhite,
              border: `1px solid ${palette.gold}55`,
              backdropFilter: 'blur(8px)',
              minWidth: 280,
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: 10, letterSpacing: '0.4em', color: palette.gold, mb: 0.5 }}
            >
              ✦  Nasheed  ✦
            </Typography>
            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 18 }}>
              {hint.title}
            </Typography>
            <Typography sx={{ fontSize: 12, mt: 0.5, opacity: 0.75 }}>{hint.body}</Typography>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
});

export default AudioController;
