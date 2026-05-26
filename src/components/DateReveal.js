import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { palette } from '@/theme/theme';
import { WEDDING } from '@/config/wedding';
import { CornerOrnament, Divider, GeometricGrid } from './Ornaments';

const letterContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2
    }
  }
};

const letter = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }
  }
};

function AnimatedText({ text, sx }) {
  return (
    <Box
      component={motion.div}
      variants={letterContainer}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', ...sx }}
    >
      {text.split('').map((ch, i) => (
        <Box
          key={`${ch}-${i}`}
          component={motion.span}
          variants={letter}
          sx={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch}
        </Box>
      ))}
    </Box>
  );
}

export default function DateReveal({ onReveal }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-25% 0px -25% 0px' });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isInView && !revealed) {
      setRevealed(true);
      onReveal?.();
    }
  }, [isInView, revealed, onReveal]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        background: `linear-gradient(180deg, ${palette.ivory} 0%, ${palette.beige} 100%)`,
        overflow: 'hidden'
      }}
    >
      <GeometricGrid opacity={0.06} />
      <CornerOrnament position="top-left" opacity={0.4} />
      <CornerOrnament position="bottom-right" opacity={0.4} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h6" sx={{ color: palette.gold, mb: 2, fontSize: 11 }}>
            ✦ Save the date ✦
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={letterContainer}
          initial="hidden"
          animate={revealed ? 'show' : 'hidden'}
          sx={{ my: 4 }}
        >
          <AnimatedText
            text={WEDDING.dayMonthYear.month.toUpperCase()}
            sx={{
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.5em',
              fontSize: { xs: 14, md: 18 },
              color: palette.warmGray
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: { xs: 2, md: 5 },
              my: { xs: 2, md: 3 }
            }}
          >
            <Box
              component={motion.div}
              variants={letter}
              sx={{ textAlign: 'right' }}
            >
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: 60, md: 110 },
                  color: palette.warmGray,
                  letterSpacing: '0.04em',
                  fontWeight: 300,
                  lineHeight: 1
                }}
              >
                SAT
              </Typography>
            </Box>

            <Box
              component={motion.div}
              variants={letter}
              sx={{
                position: 'relative',
                px: { xs: 2, md: 4 },
                borderLeft: `1px solid ${palette.gold}66`,
                borderRight: `1px solid ${palette.gold}66`
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: 120, md: 220 },
                  color: palette.softBrown,
                  fontWeight: 400,
                  lineHeight: 1,
                  fontStyle: 'italic'
                }}
              >
                {WEDDING.dayMonthYear.day}
              </Typography>
            </Box>

            <Box
              component={motion.div}
              variants={letter}
              sx={{ textAlign: 'left' }}
            >
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: 60, md: 110 },
                  color: palette.warmGray,
                  letterSpacing: '0.04em',
                  fontWeight: 300,
                  lineHeight: 1
                }}
              >
                {WEDDING.dayMonthYear.year.slice(2)}
              </Typography>
            </Box>
          </Box>

          <AnimatedText
            text={WEDDING.time.toUpperCase()}
            sx={{
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.5em',
              fontSize: { xs: 12, md: 14 },
              color: palette.warmGray
            }}
          />
        </Box>

        <Divider />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <Typography
            className="arabic"
            sx={{
              fontSize: { xs: 22, md: 30 },
              color: palette.softBrown,
              mt: 3,
              lineHeight: 1.8
            }}
          >
            وَجَعَلَ بَيْنَكُم مَوَدَّةً وَرَحْمَةً
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              color: palette.warmGray,
              mt: 1.5,
              fontSize: { xs: 16, md: 19 }
            }}
          >
            “And He placed between you affection and mercy.”
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: palette.gold, mt: 1, fontSize: 10, letterSpacing: '0.4em' }}
          >
            Qur&apos;an 30:21
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
