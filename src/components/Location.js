import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { palette } from '@/theme/theme';
import { WEDDING } from '@/config/wedding';
import { Divider } from './Ornaments';

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${WEDDING.venue.mapsQuery}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${WEDDING.venue.mapsQuery}`;

  return (
    <Box
      id="location"
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        background: `linear-gradient(180deg, ${palette.offWhite} 0%, ${palette.ivory} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            The venue
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
            Find your way
          </Typography>
          <Typography
            sx={{
              color: palette.warmGray,
              mt: 1.5,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 18
            }}
          >
            {WEDDING.venue.name} — {WEDDING.venue.address}
          </Typography>
          <Divider />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          sx={{
            position: 'relative',
            border: `1px solid ${palette.gold}66`,
            p: { xs: 1, md: 1.5 },
            background: palette.offWhite,
            boxShadow: `0 30px 80px -40px ${palette.warmGray}55`,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 24,
              height: 24,
              border: `1px solid ${palette.gold}`
            },
            '&::before': { top: -1, left: -1, borderRight: 'none', borderBottom: 'none' },
            '&::after': { bottom: -1, right: -1, borderLeft: 'none', borderTop: 'none' }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: { xs: '4/5', md: '16/8' },
              width: '100%'
            }}
          >
            <Box
              component="iframe"
              src={mapSrc}
              title="Wedding venue map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
                filter: 'grayscale(0.4) sepia(0.15) contrast(0.95)'
              }}
            />
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LocationOnOutlinedIcon />}
            variant="outlined"
          >
            Get directions
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
