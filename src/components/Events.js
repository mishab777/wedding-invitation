import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { palette } from '@/theme/theme';
import { WEDDING } from '@/config/wedding';
import { Divider } from './Ornaments';

function EventCard({ event, index }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      sx={{
        position: 'relative',
        p: { xs: 4, md: 6 },
        background: palette.offWhite,
        border: `1px solid ${palette.beige}`,
        textAlign: 'center',
        height: '100%',
        transition: 'all 0.6s ease',
        '&:hover': {
          borderColor: palette.gold,
          transform: 'translateY(-6px)',
          boxShadow: `0 30px 60px -30px ${palette.warmGray}55`
        },
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: 18,
          height: 18,
          border: `1px solid ${palette.gold}`,
          opacity: 0.6
        },
        '&::before': { top: -1, left: -1, borderRight: 'none', borderBottom: 'none' },
        '&::after': { bottom: -1, right: -1, borderLeft: 'none', borderTop: 'none' }
      }}
    >
      <Typography className="arabic" sx={{ color: palette.gold, fontSize: 28, mb: 1 }}>
        {event.arabic}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          color: palette.softBrown,
          fontSize: { xs: 30, md: 38 }
        }}
      >
        {event.title}
      </Typography>
      <Box
        sx={{
          width: 50,
          height: '1px',
          background: palette.gold,
          mx: 'auto',
          my: 2.5,
          opacity: 0.7
        }}
      />
      <Typography variant="h6" sx={{ color: palette.warmGray, fontSize: 10, mb: 1 }}>
        {event.date}
      </Typography>
      <Typography sx={{ color: palette.softBrown, fontSize: 18, fontFamily: '"Cormorant Garamond", serif' }}>
        {event.time}
      </Typography>
      <Typography variant="h6" sx={{ color: palette.gold, fontSize: 10, mt: 2.5 }}>
        Venue
      </Typography>
      <Typography sx={{ color: palette.deepBrown, mt: 0.5, fontSize: 16 }}>
        {event.place}
      </Typography>
      <Typography
        sx={{
          color: palette.warmGray,
          mt: 3,
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: 16,
          lineHeight: 1.7
        }}
      >
        {event.description}
      </Typography>
    </Box>
  );
}

export default function Events() {
  return (
    <Box
      id="events"
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        background: `linear-gradient(180deg, ${palette.ivory} 0%, ${palette.offWhite} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography variant="h6" sx={{ color: palette.gold, fontSize: 11 }}>
            Wedding events
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
            Celebrate with us
          </Typography>
          <Typography
            sx={{
              color: palette.warmGray,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 18,
              maxWidth: 540,
              mx: 'auto',
              mt: 2
            }}
          >
            Two days, two sacred moments — your presence is the dearest blessing we could ask for.
          </Typography>
          <Divider />
        </Box>

        <Grid container spacing={{ xs: 4, md: 5 }} justifyContent="center">
          {WEDDING.events.map((e, i) => (
            <Grid item xs={12} md={6} key={e.title}>
              <EventCard event={e} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
