import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { Divider } from './Ornaments';

const tiles = [
  { gradient: `linear-gradient(135deg, ${palette.warmGray} 0%, ${palette.softBrown} 100%)`, label: 'Moments', image: '/images/album-1.jpg' },
  { gradient: `linear-gradient(160deg, ${palette.beige} 0%, ${palette.rose} 80%)`, label: 'Quiet days', image: '/images/album-2.jpg' },
  { gradient: `linear-gradient(135deg, ${palette.softBrown} 0%, ${palette.deepBrown} 100%)`, label: 'Promises', image: '/images/album-3.jpg' },
  { gradient: `linear-gradient(160deg, ${palette.ivory} 0%, ${palette.beige} 100%)`, label: 'Together', image: '/images/album-4.jpg' },
  { gradient: `linear-gradient(135deg, ${palette.warmGray} 0%, ${palette.rose} 100%)`, label: 'Family', image: '/images/album-5.jpg' },
  { gradient: `linear-gradient(135deg, ${palette.deepBrown} 0%, ${palette.softBrown} 80%)`, label: 'Du’a', image: '/images/album-6.jpg' }
];

function Tile({ tile, span = 4, height = 320, delay = 0 }) {
  return (
    <Grid item xs={12} sm={6} md={span}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] }}
        sx={{
          position: 'relative',
          width: '100%',
          height,
          overflow: 'hidden',
          cursor: 'pointer',
          border: `1px solid ${palette.beige}`,
          '&:hover .glow': { opacity: 1 },
          '&:hover .bg': { transform: 'scale(1.08)' },
          '&:hover .label': { letterSpacing: '0.5em' }
        }}
      >
        <Box
          className="bg"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: tile.image ? `url(${tile.image}), ${tile.gradient}` : tile.gradient,
            backgroundSize: 'cover, 100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'transform 1.4s ease',
            filter: 'saturate(0.85)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 30% 30%, ${palette.offWhite}22 1px, transparent 2px),
              radial-gradient(circle at 70% 70%, ${palette.offWhite}22 1px, transparent 2px)
            `,
            backgroundSize: '40px 40px, 60px 60px',
            opacity: 0.6
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 50%, ${palette.deepBrown}99 100%)`
          }}
        />
        <Box
          className="glow"
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${palette.gold}33, transparent 60%)`,
            opacity: 0,
            transition: 'opacity 0.6s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 14,
            border: `1px solid ${palette.offWhite}66`,
            pointerEvents: 'none'
          }}
        />
        <Typography
          className="label"
          variant="h6"
          sx={{
            position: 'absolute',
            bottom: 26,
            left: 26,
            right: 26,
            color: palette.offWhite,
            fontSize: 10,
            letterSpacing: '0.4em',
            transition: 'letter-spacing 0.6s ease'
          }}
        >
          {tile.label}
        </Typography>
      </Box>
    </Grid>
  );
}

export default function Gallery() {
  return (
    <Box
      id="gallery"
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        background: palette.offWhite
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            A glimpse
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontStyle: 'italic',
              color: palette.softBrown,
              fontSize: { xs: 44, md: 72 },
              mt: 1.5
            }}
          >
            Moments &amp; memories
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Tile tile={tiles[0]} span={6} height={420} delay={0} />
          <Tile tile={tiles[1]} span={6} height={420} delay={0.1} />
          <Tile tile={tiles[2]} span={4} height={300} delay={0.2} />
          <Tile tile={tiles[3]} span={4} height={300} delay={0.3} />
          <Tile tile={tiles[4]} span={4} height={300} delay={0.4} />
          <Tile tile={tiles[5]} span={12} height={360} delay={0.5} />
        </Grid>
      </Container>
    </Box>
  );
}
