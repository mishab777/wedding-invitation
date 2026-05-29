import { Box, Container, Grid, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { palette } from '@/theme/theme';
import PortraitCard from './PortraitCard';
import { CornerOrnament, Divider, GeometricGrid } from './Ornaments';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <Box
      id="home"
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${palette.offWhite} 0%, ${palette.ivory} 100%)`,
        overflow: 'hidden',
        pt: { xs: 14, md: 18 },
        pb: { xs: 8, md: 12 }
      }}
    >
      <GeometricGrid opacity={0.05} />
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />

      <Box
        component={motion.div}
        style={{ y: yBg }}
        sx={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 380, md: 620 },
          height: { xs: 380, md: 620 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.beige}80 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component={motion.div}
          style={{ y: yText, opacity }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11, mb: 2 }}>
              ✦  Wedding Invitation  ✦
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.04em' }}
            transition={{ duration: 1.6, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 56, sm: 84, md: 128 },
                lineHeight: 0.95,
                color: palette.softBrown,
                fontStyle: 'italic'
              }}
            >
              Aisha
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 36, md: 56 },
                color: palette.gold,
                my: { xs: 1, md: 1.5 },
                fontStyle: 'italic'
              }}
            >
              &amp;
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.04em' }}
            transition={{ duration: 1.6, delay: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 56, sm: 84, md: 128 },
                lineHeight: 0.95,
                color: palette.softBrown,
                fontStyle: 'italic'
              }}
            >
              Ahmed
            </Typography>
          </motion.div>

          <Divider sx={{ mt: 4 }} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <Typography
              className="arabic"
              sx={{
                fontSize: { xs: 18, md: 22 },
                color: palette.warmGray,
                mt: 1
              }}
            >
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </Typography>
            <Typography
              sx={{
                color: palette.warmGray,
                mt: 2,
                maxWidth: 520,
                mx: 'auto',
                fontStyle: 'italic',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 18, md: 22 }
              }}
            >
              Together, with the blessings of their families,
              <br />
              request the honour of your presence at their wedding celebration.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={{ xs: 6, md: 8 }} justifyContent="center" alignItems="flex-end">
          <Grid item xs={12} sm={6} md={5}>
            <PortraitCard
              name="Aisha"
              arabicName="عائشة"
              role="The Bride"
              side="left"
              image="/images/bride.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <PortraitCard
              name="Ahmed"
              arabicName="أحمد"
              role="The Groom"
              side="right"
              image="/images/groom.jpg"
            />
          </Grid>
        </Grid>

        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          sx={{
            textAlign: 'center',
            mt: { xs: 8, md: 12 },
            color: palette.warmGray
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 10, mb: 1 }}>
            scroll to begin
          </Typography>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" style={{ display: 'block', margin: '0 auto' }}>
              <rect x="1" y="1" width="12" height="20" rx="6" stroke={palette.warmGray} strokeWidth="0.8" />
              <circle cx="7" cy="7" r="1.4" fill={palette.warmGray} />
            </svg>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
