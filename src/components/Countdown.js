import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { WEDDING } from '@/config/wedding';
import { Divider } from './Ornaments';

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Cell({ value, label }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      sx={{
        textAlign: 'center',
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 3 },
        border: `1px solid ${palette.gold}55`,
        position: 'relative',
        background: `${palette.offWhite}cc`,
        backdropFilter: 'blur(6px)',
        transition: 'transform 0.5s ease, border-color 0.5s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: palette.gold
        },
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 10,
          height: 10,
          border: `1px solid ${palette.gold}`,
          opacity: 0.5
        },
        '&::before': { top: -1, left: -1, borderRight: 'none', borderBottom: 'none' },
        '&::after': { bottom: -1, right: -1, borderLeft: 'none', borderTop: 'none' }
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: { xs: 44, md: 68 },
          fontWeight: 400,
          color: palette.softBrown,
          lineHeight: 1
        }}
      >
        {String(value).padStart(2, '0')}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: palette.warmGray,
          mt: 1.5,
          fontSize: 10,
          letterSpacing: '0.4em'
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function Countdown() {
  // Start null so server and first client render match; the real countdown
  // (which depends on the current clock) is filled in after mount to avoid a
  // hydration mismatch.
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(diff(WEDDING.date));
    const id = setInterval(() => setT(diff(WEDDING.date)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 10, md: 14 },
        background: palette.offWhite
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            Counting down to forever
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: palette.softBrown,
              fontStyle: 'italic',
              mt: 1.5,
              fontSize: { xs: 32, md: 48 }
            }}
          >
            Until our forever begins
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={6} sm={3}><Cell value={t ? t.days : '--'} label="Days" /></Grid>
          <Grid item xs={6} sm={3}><Cell value={t ? t.hours : '--'} label="Hours" /></Grid>
          <Grid item xs={6} sm={3}><Cell value={t ? t.minutes : '--'} label="Minutes" /></Grid>
          <Grid item xs={6} sm={3}><Cell value={t ? t.seconds : '--'} label="Seconds" /></Grid>
        </Grid>
      </Container>
    </Box>
  );
}
