import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' }
];

export default function Navbar({ audioOn, onToggleAudio }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AppBar
      component={motion.div}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled
          ? `${palette.offWhite}EE`
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${palette.beige}` : '1px solid transparent',
        transition: 'all 0.6s ease',
        color: palette.deepBrown
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1.5, justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              letterSpacing: '0.08em',
              color: palette.softBrown
            }}
          >
            A &amp; A
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {links.map((l) => (
              <Button
                key={l.id}
                onClick={() => go(l.id)}
                sx={{
                  color: palette.deepBrown,
                  fontSize: 11,
                  letterSpacing: '0.32em',
                  px: 0,
                  minWidth: 0,
                  '&:hover': { color: palette.gold, background: 'transparent' }
                }}
              >
                {l.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={onToggleAudio}
            sx={{
              border: `1px solid ${palette.warmGray}77`,
              borderRadius: '50%',
              width: 38,
              height: 38,
              color: palette.softBrown,
              '&:hover': { borderColor: palette.gold, color: palette.gold }
            }}
            aria-label={audioOn ? 'Mute background nasheed' : 'Play background nasheed'}
          >
            {audioOn ? <VolumeUpIcon fontSize="small" /> : <VolumeOffIcon fontSize="small" />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
