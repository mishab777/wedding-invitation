import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { WEDDING } from '@/config/wedding';

export default function Loader({ revealDelay = 1800, onOpen }) {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), revealDelay);
    return () => clearTimeout(t);
  }, [revealDelay]);

  // The click here is a real user gesture, so onOpen can reliably start audio
  // in every browser (including desktop Chrome) — no autoplay block.
  const handleOpen = () => {
    if (!visible) return;
    setVisible(false);
    onOpen?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1500,
            display: 'grid',
            placeItems: 'center',
            background: `radial-gradient(circle at center, ${palette.ivory} 0%, ${palette.offWhite} 60%, ${palette.beige} 130%)`
          }}
        >
          <Box sx={{ textAlign: 'center', px: 3 }}>
            <Box
              component={motion.div}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              sx={{ mb: 3 }}
            >
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                <g stroke={palette.gold} strokeWidth="0.8" fill="none">
                  <motion.circle
                    cx="42"
                    cy="42"
                    r="34"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    cx="42"
                    cy="42"
                    r="24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 0.2, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M42 8 L48 30 L70 30 L52 44 L60 66 L42 52 L24 66 L32 44 L14 30 L36 30 Z"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
                  />
                </g>
              </svg>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: palette.warmGray, letterSpacing: '0.6em', fontSize: 12 }}
              component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              In the name of Allah
            </Typography>
            <Typography
              variant="h4"
              sx={{ mt: 1.5, color: palette.softBrown, fontStyle: 'italic', fontWeight: 300 }}
              component={motion.div}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1 }}
            >
              {WEDDING.bride.name} &amp; {WEDDING.groom.name}
            </Typography>
            <Box
              component={motion.div}
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 1.1, duration: 0.9, ease: 'easeInOut' }}
              sx={{
                height: '1px',
                background: palette.gold,
                margin: '18px auto 0',
                opacity: 0.7
              }}
            />

            <AnimatePresence>
              {ready && (
                <Box
                  component={motion.button}
                  type="button"
                  onClick={handleOpen}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  sx={{
                    display: 'inline-block',
                    mt: 4,
                    px: 5,
                    py: 1.6,
                    background: 'transparent',
                    border: `1px solid ${palette.gold}`,
                    color: palette.softBrown,
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.4s ease, color 0.4s ease',
                    '&:hover': {
                      background: `${palette.gold}1f`,
                      color: palette.deepBrown
                    }
                  }}
                >
                  Open Invitation
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
